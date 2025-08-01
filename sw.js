// Service Worker para Portfolio Marcelo
// Versión del cache - incrementar cuando actualices archivos
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-marcelo-${CACHE_VERSION}`;

// Archivos críticos para cachear
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/sections.css',
  '/js/main.js',
  '/js/animations.js',
  '/js/auth.js',
  '/manifest.json'
];

// Archivos adicionales para cachear
const ADDITIONAL_ASSETS = [
  '/blog.html',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/apple-touch-icon.png'
];

// Todos los archivos a cachear
const ALL_ASSETS = [...CRITICAL_ASSETS, ...ADDITIONAL_ASSETS];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('SW: Installing Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        console.log('SW: Critical assets cached');
        // Cachear assets adicionales sin bloquear la instalación
        return caches.open(CACHE_NAME);
      })
      .then((cache) => {
        console.log('SW: Caching additional assets');
        return Promise.allSettled(
          ADDITIONAL_ASSETS.map(asset => 
            cache.add(asset).catch(err => 
              console.warn(`SW: Failed to cache ${asset}:`, err)
            )
          )
        );
      })
      .then(() => {
        console.log('SW: Service Worker installed successfully');
        // Activar inmediatamente el nuevo SW
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SW: Installation failed:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('SW: Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar control de todas las pestañas
      self.clients.claim()
    ]).then(() => {
      console.log('SW: Service Worker activated successfully');
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo interceptar peticiones del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estrategia Cache First para assets críticos
  if (shouldUseCacheFirst(request)) {
    event.respondWith(cacheFirst(request));
  }
  // Estrategia Network First para páginas HTML
  else if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
  }
  // Estrategia Network First por defecto
  else {
    event.respondWith(networkFirst(request));
  }
});

// Determinar si usar Cache First
function shouldUseCacheFirst(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'image' ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.ttf')
  );
}

// Estrategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cachear la respuesta si es exitosa
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SW: Cache first failed:', error);
    
    // Si todo falla, intentar servir una página de fallback
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Estrategia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cachear la respuesta si es exitosa
    if (networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si es una página HTML y no está en cache, servir la página principal
    if (request.destination === 'document') {
      const indexPage = await caches.match('/index.html');
      if (indexPage) {
        return indexPage;
      }
    }
    
    // Si es una imagen y no está disponible, servir una imagen placeholder
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f1f5f9"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#64748b">Imagen no disponible</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

// Manejar notificaciones push (para futuras características)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nueva actualización disponible',
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/icon-72x72.png',
      tag: 'portfolio-update',
      renotify: true,
      requireInteraction: false,
      actions: [
        {
          action: 'view',
          title: 'Ver',
          icon: '/assets/icons/icon-72x72.png'
        },
        {
          action: 'dismiss',
          title: 'Cerrar',
          icon: '/assets/icons/icon-72x72.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Portfolio Marcelo', options)
    );
  }
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronización en segundo plano (para futuras características)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí se pueden manejar tareas pendientes cuando se recupere la conexión
      console.log('SW: Background sync triggered')
    );
  }
});

// Logging para debugging
console.log('SW: Service Worker loaded', {
  version: CACHE_VERSION,
  scope: self.registration?.scope
}); 