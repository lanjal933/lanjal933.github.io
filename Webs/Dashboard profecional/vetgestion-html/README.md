# VetGestión - HTML5/CSS/JavaScript

Sistema de gestión veterinaria desarrollado en **HTML5, CSS3 y JavaScript vanilla**. Migrado desde Vue.js manteniendo todas las funcionalidades y estética originales.

## 🚀 Características

- ✅ **Dashboard completo** con métricas en tiempo real
- ✅ **Gestión de pacientes** (CRUD completo)
- ✅ **Gestión de citas** médicas
- ✅ **Gestión de tratamientos**
- ✅ **Perfil de usuario** personalizable
- ✅ **Modo oscuro/claro** automático
- ✅ **Autenticación** simulada con roles
- ✅ **Persistencia** en localStorage
- ✅ **Diseño responsive** móvil-first
- ✅ **Notificaciones toast** elegantes
- ✅ **Routing SPA** sin dependencias

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos (equivalente a Tailwind)
- **JavaScript ES6+** - Lógica vanilla sin frameworks
- **LocalStorage** - Persistencia de datos
- **SPA Router** - Navegación sin recarga

## 📁 Estructura del Proyecto

```
vetgestion-html/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos base (equivalente a Tailwind)
│   ├── components.css      # Componentes específicos
│   └── themes.css          # Temas y modo oscuro
├── js/
│   ├── utils/
│   │   └── helpers.js      # Utilidades generales
│   ├── stores/
│   │   ├── persistence.js  # Manejo de localStorage
│   │   ├── auth.js         # Autenticación
│   │   ├── app.js          # Estado de la aplicación
│   │   ├── settings.js     # Configuraciones
│   │   └── patients.js     # Gestión de pacientes
│   ├── components/
│   │   ├── notifications.js # Sistema de notificaciones
│   │   └── modal.js        # Sistema de modales
│   ├── router.js           # Sistema de routing SPA
│   └── app.js              # Aplicación principal
└── README.md               # Este archivo
```

## 🎯 Cómo usar

### 1. Abrir la aplicación
Simplemente abre `index.html` en tu navegador web.

### 2. Credenciales de prueba
- **Veterinario:** vet@vetgestion.com / password123
- **Recepcionista:** admin@vetgestion.com / password123
- **Demo:** demo@vetgestion.com / demo123

### 3. Funcionalidades principales

#### Dashboard
- Métricas de pacientes, citas y tratamientos
- Acciones rápidas
- Resumen de actividad

#### Gestión de Pacientes
- Lista completa de pacientes
- Información detallada (nombre, especie, propietario)
- Acciones de edición y eliminación

#### Gestión de Citas
- Calendario de citas médicas
- Estados de citas (programada, completada)
- Información de paciente y veterinario

#### Perfil
- Información personal del usuario
- Configuraciones de la cuenta

#### Modo Oscuro
- Botón de alternancia en la barra superior
- Detección automática de preferencias del sistema
- Persistencia de configuración

## 🔧 Características Técnicas

### Sistema de Stores
- **PersistenceStore**: Manejo de localStorage con datos de ejemplo
- **AuthStore**: Autenticación simulada con validación
- **AppStore**: Estado global de la aplicación
- **SettingsStore**: Configuraciones y temas

### Router SPA
- Navegación con hash routing
- Protección de rutas autenticadas
- Gestión de títulos y breadcrumbs

### Sistema de Notificaciones
- Toast notifications con diferentes tipos
- Animaciones suaves de entrada/salida
- Auto-dismiss configurable

### Responsive Design
- Mobile-first approach
- Breakpoints: móvil (768px), tablet, desktop
- Sidebar adaptativo

## 💾 Datos de Ejemplo

La aplicación incluye datos de prueba:
- 3 pacientes con información completa
- 2 citas programadas
- 2 tratamientos en curso
- Configuraciones predeterminadas

## 🎨 Temas y Estilos

### Paleta de Colores
- **Primario**: Verde menta (#14b8a6)
- **Secundario**: Azul (#3b82f6)
- **Éxito**: Verde (#16a34a)
- **Advertencia**: Naranja (#ea580c)
- **Error**: Rojo (#ef4444)

### Modo Oscuro
- Activación automática según preferencias del sistema
- Toggle manual en la interfaz
- Todos los componentes adaptados

## 🔗 Migración desde Vue.js

Esta aplicación es una migración completa desde Vue.js a tecnologías web nativas:

### Equivalencias
- **Pinia Stores** → JavaScript Classes
- **Vue Router** → Hash-based SPA Router
- **Vue Components** → JavaScript Functions
- **Tailwind CSS** → CSS vanilla equivalente
- **vue-toastification** → NotificationManager custom

### Funcionalidades Mantenidas
- ✅ Toda la lógica de negocio
- ✅ Diseño y UX idénticos
- ✅ Funcionalidades de autenticación
- ✅ Sistema de persistencia
- ✅ Configuraciones y temas

## 🚀 Extensión y Desarrollo

### Agregar nuevas vistas
1. Crear función renderizadora en `router.js`
2. Agregar ruta en `setupRoutes()`
3. Implementar lógica específica

### Agregar nuevos stores
1. Crear clase en `js/stores/`
2. Inicializar en `app.js`
3. Exponer globalmente

### Personalizar estilos
1. Modificar variables CSS en `styles.css`
2. Agregar componentes en `components.css`
3. Extender temas en `themes.css`

## 📱 Compatibilidad

- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Mobile browsers
- ✅ Funciona offline

## 🎯 Rendimiento

- **Carga inicial**: ~100KB total
- **Sin dependencias** externas
- **Carga instantánea** después del primer acceso
- **Responsive** desde 320px hasta 4K

---

**VetGestión v1.0.0** - Sistema profesional de gestión veterinaria
Desarrollado con ❤️ usando tecnologías web nativas 