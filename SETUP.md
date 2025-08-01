# 🚀 Guía de Configuración Rápida

Esta guía te ayudará a personalizar el portfolio en menos de 10 minutos.

## ⚡ Configuración Básica (5 minutos)

### 1. Información Personal

#### `index.html` - Líneas a editar:
```html
<!-- Línea 8: Título del sitio -->
<title>TU NOMBRE - Desarrollador Web Full Stack | Portfolio</title>

<!-- Línea 9: Descripción -->
<meta name="description" content="TU DESCRIPCIÓN PERSONAL">

<!-- Línea 75: Logo en navegación -->
<span class="logo-text">TU NOMBRE</span>

<!-- Línea 125: Nombre en hero -->
Hola, soy <span class="text-gradient">TU NOMBRE</span>

<!-- Línea 127: Tu título/rol -->
<p class="hero-subtitle">TU TÍTULO PROFESIONAL</p>

<!-- Línea 128: Tu descripción principal -->
<p class="hero-description">TU DESCRIPCIÓN PERSONAL</p>
```

### 2. Información de Contacto

#### `index.html` - Sección de contacto (líneas 520-550):
```html
<!-- Email -->
<a href="mailto:TU-EMAIL@example.com">TU-EMAIL@example.com</a>

<!-- WhatsApp -->
<a href="https://wa.me/TU-NUMERO">+XX XXX XXX XXX</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/TU-PERFIL">LinkedIn</a>

<!-- GitHub -->
<a href="https://github.com/TU-USUARIO">GitHub</a>

<!-- Fiverr -->
<a href="https://fiverr.com/TU-PERFIL">Fiverr</a>
```

### 3. Credenciales de Administrador

#### `js/auth.js` - Líneas 12-17:
```javascript
this.adminCredentials = {
  name: 'TU NOMBRE COMPLETO',
  password: 'TU-PASSWORD-SEGURO',
  email: 'TU-EMAIL@example.com',
  role: 'admin'
};
```

## 🎨 Personalización Visual (3 minutos)

### 1. Colores del Tema

#### `styles/main.css` - Líneas 20-30:
```css
:root {
  /* Cambia estos colores por los tuyos */
  --color-primary: #2563eb;        /* Color principal (azul) */
  --color-primary-dark: #1d4ed8;   /* Color hover */
  --color-accent: #06b6d4;         /* Color de acento (cyan) */
}
```

#### Colores recomendados:
- **Azul profesional**: `#2563eb`
- **Verde tech**: `#10b981`
- **Púrpura creativo**: `#8b5cf6`
- **Naranja energético**: `#f59e0b`
- **Rosa moderno**: `#ec4899`

### 2. Tipografía (Opcional)

#### `styles/main.css` - Líneas 40-45:
```css
:root {
  --font-family-primary: 'TU-FUENTE', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## 📝 Contenido Personal (5 minutos)

### 1. Sección "Sobre mí"

#### `index.html` - Líneas 180-200:
```html
<p>
  TU DESCRIPCIÓN PERSONAL DETALLADA
</p>
<p>
  TU ENFOQUE Y METODOLOGÍA DE TRABAJO
</p>
```

### 2. Habilidades Técnicas

#### `index.html` - Líneas 210-250:
```html
<!-- Frontend -->
<span class="skill-tag">TUS TECNOLOGÍAS FRONTEND</span>

<!-- Backend -->
<span class="skill-tag">TUS TECNOLOGÍAS BACKEND</span>

<!-- Soft Skills -->
<span class="skill-tag">TUS HABILIDADES BLANDAS</span>
```

### 3. Estadísticas

#### `index.html` - Líneas 270-290:
```html
<!-- Proyectos completados -->
<span class="stat-number" data-count="TU-NUMERO">0</span>

<!-- Años de experiencia -->
<span class="stat-number" data-count="TU-NUMERO">0</span>

<!-- Porcentaje de satisfacción -->
<span class="stat-number" data-count="TU-NUMERO">0</span>
```

## 💼 Proyectos del Portfolio (10 minutos)

### Estructura de un Proyecto

#### `index.html` - Copia y personaliza:
```html
<article class="portfolio-item" data-category="CATEGORIA" data-reveal="fade-up" data-delay="0.1">
  <div class="portfolio-image">
    <div class="project-placeholder">
      <span class="placeholder-icon">EMOJI</span>
      <p>NOMBRE DEL PROYECTO</p>
    </div>
    <div class="portfolio-overlay">
      <div class="portfolio-actions">
        <a href="TU-DEMO-URL" class="btn btn-small btn-primary">
          <span class="btn-icon">👁️</span>
          Demo
        </a>
        <a href="TU-GITHUB-URL" class="btn btn-small btn-secondary">
          <span class="btn-icon">💻</span>
          Código
        </a>
      </div>
    </div>
  </div>
  <div class="portfolio-content">
    <h3 class="portfolio-title">TÍTULO DEL PROYECTO</h3>
    <p class="portfolio-description">DESCRIPCIÓN DEL PROYECTO</p>
    <div class="portfolio-tech">
      <span class="tech-tag">TECNOLOGÍA-1</span>
      <span class="tech-tag">TECNOLOGÍA-2</span>
    </div>
    <div class="portfolio-learnings">
      <h4>Lecciones aprendidas:</h4>
      <ul>
        <li>LECCIÓN 1</li>
        <li>LECCIÓN 2</li>
      </ul>
    </div>
  </div>
</article>
```

### Categorías Disponibles:
- `web` - Aplicaciones web
- `mobile` - Apps móviles
- `ui` - Diseño UI/UX
- `all` - Todas las categorías

## 📱 Configuración PWA (2 minutos)

### `manifest.json` - Líneas a personalizar:
```json
{
  "name": "Portfolio TU NOMBRE - Desarrollador Web",
  "short_name": "Portfolio TU NOMBRE",
  "description": "TU DESCRIPCIÓN"
}
```

## 🎯 Stack Tecnológico (3 minutos)

### 1. Tecnologías en Producción

#### `index.html` - Líneas 420-480:
```html
<div class="tech-item">
  <div class="tech-icon">EMOJI</div>
  <div class="tech-info">
    <h4>TECNOLOGÍA</h4>
    <p>DESCRIPCIÓN DE USO</p>
  </div>
</div>
```

### 2. Tecnologías en Aprendizaje

#### `index.html` - Líneas 485-520:
```html
<div class="tech-item">
  <div class="tech-icon">EMOJI</div>
  <div class="tech-info">
    <h4>TECNOLOGÍA</h4>
    <p>DESCRIPCIÓN DE APRENDIZAJE</p>
  </div>
</div>
```

## 📝 Blog Personal (5 minutos)

### `blog.html` - Personaliza los artículos:

1. **Reemplaza el contenido** con tus propios artículos
2. **Cambia las fechas** y metadatos
3. **Añade tu experiencia personal** en lugar de "Marcelo"

#### Estructura de un artículo:
```html
<article class="article">
  <header class="article-header">
    <h2 class="article-title">TU TÍTULO</h2>
    <div class="article-meta">
      <span>👨‍💻 Por TU NOMBRE</span>
      <span>📖 X min lectura</span>
    </div>
  </header>
  <div class="article-content">
    TU CONTENIDO AQUÍ
  </div>
</article>
```

## ✅ Lista de Verificación Final

### Antes de Desplegar:
- [ ] ✅ Información personal actualizada
- [ ] ✅ Colores personalizados
- [ ] ✅ Proyectos del portfolio añadidos
- [ ] ✅ Información de contacto correcta
- [ ] ✅ Credenciales de admin configuradas
- [ ] ✅ Links sociales actualizados
- [ ] ✅ Stack tecnológico personalizado
- [ ] ✅ Blog con contenido propio
- [ ] ✅ Manifest PWA configurado
- [ ] ✅ Pruebas en diferentes dispositivos

### Testing Rápido:
1. **Desktop**: Funcionalidad completa
2. **Mobile**: Responsive design
3. **Modo oscuro**: Toggle funcional
4. **Navegación**: Scroll suave
5. **PWA**: Installable
6. **Autenticación**: Login/logout
7. **Testimonios**: Crear y eliminar
8. **Performance**: < 3s carga

## 🚀 Despliegue Rápido

### Netlify (Recomendado):
1. Arrastra la carpeta a [netlify.com](https://netlify.com)
2. ¡Listo! Tu portfolio está online

### Vercel:
1. Conecta tu GitHub en [vercel.com](https://vercel.com)
2. Deploy automático

### GitHub Pages:
1. Sube a GitHub
2. Settings > Pages > Deploy from branch

---

¿Necesitas ayuda? Revisa el [README.md](README.md) completo o abre un issue en GitHub. 