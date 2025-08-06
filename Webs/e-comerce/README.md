# EstudioPixelArte - E-commerce HTML5

**Arte Digital Bohemio - Versión HTML5 Migrada**

Un e-commerce de arte digital con estilo bohemio completamente funcional, migrado exitosamente de Laravel a HTML5, CSS y JavaScript puro.

## 🎨 Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Navegación completa con 10 productos de arte digital
- **Sistema de Filtros**: Por categoría, precio y búsqueda en tiempo real
- **Carrito de Compras**: Funcional con localStorage, agregar/eliminar/modificar cantidades
- **Autenticación Simulada**: Login/registro con persistencia en localStorage
- **Checkout Completo**: Proceso de compra simulado con validaciones
- **Responsive Design**: Adaptado para móviles, tablets y escritorio
- **SPA (Single Page Application)**: Navegación sin recargas de página

### 🎯 Diseño y Estilo
- **Paleta Bohemia**: Tonos pasteles, tierra, salvia, lavanda y rose
- **Tipografías**: Dancing Script (títulos) y Poppins (texto)
- **Componentes Modernos**: Cards, botones con gradientes, sombras suaves
- **Animaciones CSS**: Transiciones fluidas y hover effects
- **Iconografía SVG**: Iconos integrados sin dependencias externas

## 📁 Estructura del Proyecto

```
/
├── index.html          # Página principal (SPA base)
├── css/
│   └── styles.css     # Estilos principales con variables CSS
├── js/
│   ├── data.js        # Datos de productos y categorías
│   ├── app.js         # Lógica principal de la aplicación
│   └── router.js      # Sistema de rutas y páginas
└── README.md          # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Servidor Local Simple
```bash
# Usar Python (recomendado)
python -m http.server 8000

# O usar Node.js con http-server
npx http-server .

# O usar PHP
php -S localhost:8000
```

### Opción 2: Abrir Directamente
Simplemente abre `index.html` en tu navegador, aunque algunas funciones pueden estar limitadas por las políticas CORS.

### Acceso
- Navega a: `http://localhost:8000`
- La aplicación se cargará automáticamente

## 🛍️ Funcionalidades del E-commerce

### 🏠 Página Principal
- Hero section con gradientes bohemios
- Productos destacados (4 productos)
- Grid de categorías (6 categorías)
- Productos recientes
- Estadísticas del sitio

### 📦 Catálogo de Productos
- **10 productos de ejemplo** con datos completos
- **Filtros funcionales**:
  - Por categoría (checkboxes)
  - Por rango de precios
  - Búsqueda por texto
  - Ordenamiento (recientes, populares, precio, nombre)
- **Paginación** (preparada para futuras implementaciones)
- **Sidebar pegajoso** con filtros

### 🛒 Sistema de Carrito
- **LocalStorage persistente**
- Agregar productos desde cualquier página
- Modificar cantidades (+/-)
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculo automático de totales
- Notificaciones visuales

### 👤 Autenticación
- **Login simulado** (cualquier email/password válido)
- **Registro simulado** 
- **Persistencia en localStorage**
- **UI dinámica** (cambia según estado de sesión)
- **Protección de rutas** (checkout requiere login)

### 💳 Proceso de Checkout
- **Validación de autenticación**
- **Validación de carrito no vacío**
- **Formulario de pago simulado**
- **Resumen detallado del pedido**
- **Procesamiento simulado** con feedback

### 📱 Páginas Adicionales
- **Detalle de Producto**: Galería, especificaciones, productos relacionados
- **404 Personalizada**: Para rutas no encontradas
- **Login/Registro**: Formularios completos

## 🎨 Categorías y Productos

### Categorías Disponibles:
1. **Posters Bohemios** - Diseños vintage y místicos
2. **Arte Floral** - Ilustraciones naturales y acuarelas
3. **Mandalas y Patrones** - Diseños sagrados y geométricos
4. **Frases Inspiradoras** - Tipografías motivacionales
5. **Plantillas Imprimibles** - Agendas y calendarios
6. **Arte Abstracto** - Formas orgánicas y contemporáneas

### Productos Destacados:
- Luna Dorada Bohemia ($15.99)
- Sol Radiante Vintage ($12.99)
- Mandala Lunar Sagrado ($22.99)
- Agenda Bohemia 2024 ($24.99)

## 🔧 Arquitectura Técnica

### JavaScript Modular
- **AppState**: Estado global de la aplicación
- **CartManager**: Gestión completa del carrito
- **AuthManager**: Sistema de autenticación
- **SearchManager**: Filtros y búsquedas
- **Router**: Sistema de rutas SPA
- **UIRenderer**: Renderizado de componentes

### CSS Avanzado
- **Variables CSS** para toda la paleta de colores
- **Grid y Flexbox** para layouts responsive
- **Animaciones CSS** sin JavaScript
- **Mobile-first approach**
- **Componentes reutilizables**

### LocalStorage
- Carrito persistente
- Sesión de usuario
- Preferencias (futuras implementaciones)

## 🎯 Funcionalidades Técnicas

### Sistema de Filtros
```javascript
// Filtros combinables
AppState.currentFilters = {
    category: 'posters-bohemios',
    minPrice: 10.00,
    maxPrice: 25.00,
    search: 'luna',
    sort: 'price_low'
}
```

### Gestión del Carrito
```javascript
// API simple y potente
CartManager.addToCart(productId, quantity)
CartManager.updateQuantity(productId, newQuantity)
CartManager.removeFromCart(productId)
CartManager.getCartTotal()
```

### Navegación SPA
```javascript
// Navegación sin recargas
navigateTo('catalog')
navigateTo('product', 'luna-dorada-bohemia')
navigateTo('catalog', 'arte-floral') // Con filtro de categoría
```

## 📊 Datos del Proyecto

- **10 productos** con datos completos
- **6 categorías** temáticas
- **Especificaciones detalladas** (dimensiones, formato, peso)
- **Precios variados** ($9.99 - $24.99)
- **Descargas simuladas** y ratings
- **Tags para búsqueda**

## 🌟 Mejoras Implementadas

### Respecto al Original Laravel:
1. **Carga instantánea** - Sin servidor backend
2. **Navegación fluida** - SPA sin recargas
3. **Filtros en tiempo real** - Sin esperas
4. **Persistencia local** - Carrito no se pierde
5. **SEO friendly** - URLs limpias
6. **Mobile optimized** - Mejor experiencia móvil

### Funcionalidades Añadidas:
1. **Notificaciones visuales** - Feedback inmediato
2. **Breadcrumbs** - Navegación clara
3. **Productos relacionados** - Mejor descubrimiento
4. **Galería de imágenes** - Vista detallada
5. **Validaciones completas** - UX mejorada

## 🚀 Posibles Extensiones

### Inmediatas:
- Wishlist/Favoritos
- Comparador de productos
- Reviews y calificaciones
- Modo oscuro
- Múltiples idiomas

### Avanzadas:
- API REST backend
- Pagos reales (Stripe/PayPal)
- Panel de administración
- Analytics y tracking
- PWA (Progressive Web App)

## 🎨 Créditos de Diseño

- **Paleta de colores**: Inspirada en arte bohemio y minimalismo
- **Tipografías**: Google Fonts (Dancing Script + Poppins)
- **Iconografía**: Material Design Icons (SVG)
- **Imágenes**: Placeholders generados proceduralmente

## 📝 Notas de Migración

### ✅ Migrado Exitosamente:
- Estructura completa de Laravel
- Todos los estilos y componentes
- Funcionalidad del carrito
- Sistema de autenticación
- Filtros y búsqueda
- Responsive design

### 🔄 Adaptaciones Realizadas:
- Blade templates → JavaScript templating
- Eloquent queries → Filtros en memoria
- Laravel routes → Router SPA
- Session storage → LocalStorage
- Backend validation → Frontend validation

## 🏆 Resultado Final

Un e-commerce completamente funcional que mantiene toda la belleza visual y experiencia de usuario del original Laravel, pero con las ventajas de una aplicación frontend moderna: carga instantánea, navegación fluida y funcionamiento offline.

**¡Perfecto para portfolios, demostraciones o como base para proyectos reales!** 