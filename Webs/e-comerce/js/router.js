/**
 * EstudioPixelArte - Router v2.0 Mejorado
 * Sistema completo de navegación SPA con todas las páginas
 */

// Router principal con gestión de estado y navegación mejorada
const Router = {
    routes: {
        'home': 'renderHomePage',
        'catalog': 'renderCatalogPage', 
        'categories': 'renderCategoriesPage',
        'about': 'renderAboutPage',
        'blog': 'renderBlogPage',
        'contact': 'renderContactPage',
        'help': 'renderHelpPage',
        'faq': 'renderFaqPage',
        'shipping': 'renderShippingPage',
        'returns': 'renderReturnsPage',
        'terms': 'renderTermsPage',
        'privacy': 'renderPrivacyPage',
        'cookies': 'renderCookiesPage',
        'sitemap': 'renderSitemapPage',
        'tutorials': 'renderTutorialsPage',
        'inspiration': 'renderInspirationPage',
        'newsletter': 'renderNewsletterPage',
        'affiliate': 'renderAffiliatePage',
        'product': 'renderProductPage',
        'cart': 'renderCartPage',
        'checkout': 'renderCheckoutPage',
        'login': 'renderLoginPage',
        'register': 'renderRegisterPage',
        'dashboard': 'renderDashboardPage',
        'orders': 'renderOrdersPage',
        'downloads': 'renderDownloadsPage',
        'wishlist': 'renderWishlistPage',
        'profile': 'renderProfilePage',
        // Rutas de administración
        'admin-dashboard': 'renderAdminDashboardPage',
        'admin-products': 'renderAdminProductsPage',
        'admin-users': 'renderAdminUsersPage',
        'admin-analytics': 'renderAdminAnalyticsPage',
        '404': 'renderNotFoundPage'
    },

    navigate: function(page, param = null) {
        // Actualizar estado de navegación
        AppState.currentPage = page;
        AppState.currentParam = param;
        
        // Actualizar URL sin recargar
        const url = param ? `#${page}/${param}` : `#${page}`;
        window.history.pushState({page, param}, '', url);
        
        // Actualizar navegación activa
        this.updateActiveNavigation(page);
        
        // Mostrar loading
        this.showLoading();
        
        // Renderizar página
        setTimeout(() => {
            if (this.routes[page]) {
                if (param) {
                    this[this.routes[page]](param);
                } else {
                    this[this.routes[page]]();
                }
            } else {
                this.renderNotFoundPage();
            }
            this.hideLoading();
        }, 300);
    },

    updateActiveNavigation: function(page) {
        // Remover clase activa de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar clase activa al enlace correspondiente
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },

    showLoading: function() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="loading" id="page-loading">
                <div class="spinner"></div>
                <div class="loading-text">Cargando página...</div>
            </div>
        `;
    },

    hideLoading: function() {
        const loading = document.getElementById('page-loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 300);
        }
    }
};

// =============================================================================
// PÁGINA PRINCIPAL MEJORADA
// =============================================================================

Router.renderHomePage = function() {
    const mainContent = document.querySelector('.main-content');
    const featuredProducts = DataUtils.getFeaturedProducts().slice(0, 8);
    const categories = DataUtils.getActiveCategories();
    
    mainContent.innerHTML = `
        <!-- Hero Section Mejorada -->
        <section class="hero">
            <div class="hero-content page-container">
                <h1 class="hero-title">Arte Digital Bohemio</h1>
                <p class="hero-subtitle">
                    Descubre nuestra colección única de arte digital con estilo bohemio. 
                    Posters, mandalas, arte floral y diseños inspiradores para transformar tus espacios 
                    con descargas instantáneas de alta calidad.
                </p>
                <div class="hero-cta">
                    <button onclick="navigateTo('catalog')" class="btn btn-primary btn-large">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Explorar Catálogo
                    </button>
                    <button onclick="navigateTo('inspiration')" class="btn btn-outline btn-large">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Ver Inspiración
                    </button>
                </div>
            </div>
        </section>

        <!-- Estadísticas -->
        <section style="background: white; padding: 3rem 0; border-top: 1px solid var(--cream-200);">
            <div class="page-container">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
                    <div class="fade-in-up">
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--rose-500); margin-bottom: 0.5rem;">2,500+</div>
                        <div style="color: var(--earth-600); font-size: 1.1rem;">Descargas</div>
                    </div>
                    <div class="fade-in-up" style="animation-delay: 0.1s;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--sage-500); margin-bottom: 0.5rem;">150+</div>
                        <div style="color: var(--earth-600); font-size: 1.1rem;">Diseños Únicos</div>
                    </div>
                    <div class="fade-in-up" style="animation-delay: 0.2s;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--lavender-500); margin-bottom: 0.5rem;">4.9⭐</div>
                        <div style="color: var(--earth-600); font-size: 1.1rem;">Rating Promedio</div>
                    </div>
                    <div class="fade-in-up" style="animation-delay: 0.3s;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.5rem;">100%</div>
                        <div style="color: var(--earth-600); font-size: 1.1rem;">Satisfacción</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categorías Destacadas -->
        <section class="section">
            <div class="page-container">
                <div class="section-header">
                    <h2 class="section-title">Explora por Categorías</h2>
                    <p class="section-subtitle">Encuentra el estilo perfecto para tu espacio con nuestra amplia selección de arte digital bohemio</p>
                </div>
                
                <div class="category-grid">
                    ${categories.map((category, index) => `
                        <div class="category-card fade-in-up" style="animation-delay: ${index * 0.1}s;" onclick="navigateTo('catalog', '${category.slug}')">
                            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--${category.color || 'rose'}-400) 0%, var(--${category.color || 'rose'}-600) 100%); opacity: 0.9;"></div>
                            <div style="position: relative; z-index: 2; padding: 2rem; height: 100%; display: flex; flex-direction: column; justify-content: center; text-align: center; color: white;">
                                <div style="font-size: 2.5rem; margin-bottom: 1rem;">${category.icon || '🎨'}</div>
                                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">${category.name}</h3>
                                <p style="font-size: 0.9rem; opacity: 0.9;">${category.description || 'Diseños únicos y hermosos'}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Productos Destacados -->
        <section class="section" style="background: var(--gradient-warm);">
            <div class="page-container">
                <div class="section-header">
                    <h2 class="section-title">Productos Destacados</h2>
                    <p class="section-subtitle">Nuestra selección de los diseños más populares y mejor valorados</p>
                </div>
                
                <div class="product-grid">
                    ${featuredProducts.map((product, index) => {
                        const card = UIRenderer.renderProductCard(product);
                        return `<div class="fade-in-up" style="animation-delay: ${index * 0.1}s;">${card}</div>`;
                    }).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 3rem;">
                    <button onclick="navigateTo('catalog')" class="btn btn-primary btn-large">Ver Todos los Productos</button>
                </div>
            </div>
        </section>

        <!-- Newsletter -->
        <section style="background: var(--earth-800); color: white; padding: 4rem 0;">
            <div class="page-container text-center">
                <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 1rem;">Mantente Inspirado</h2>
                <p style="font-size: 1.2rem; color: var(--cream-200); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    Recibe las últimas tendencias en arte bohemio, tips de decoración y acceso exclusivo a nuevos diseños.
                </p>
                
                <form style="display: flex; gap: 1rem; max-width: 400px; margin: 0 auto; flex-wrap: wrap;" onsubmit="handleNewsletterSubscription(event)">
                    <input type="email" placeholder="Tu email aquí..." required style="flex: 1; padding: 1rem; border-radius: var(--border-radius-lg); border: none; min-width: 250px;">
                    <button type="submit" class="btn btn-primary">Suscribirme</button>
                </form>
                
                <p style="font-size: 0.9rem; color: var(--cream-300); margin-top: 1rem;">
                    No spam, solo inspiración. Cancela cuando quieras.
                </p>
            </div>
        </section>

        <!-- Testimonios -->
        <section class="section">
            <div class="page-container">
                <div class="section-header">
                    <h2 class="section-title">Lo que Dicen Nuestros Clientes</h2>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    ${this.renderTestimonials()}
                </div>
            </div>
        </section>
    `;
};

Router.renderTestimonials = function() {
    const testimonials = [
        {
            name: "María González",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
            text: "Los diseños son absolutamente hermosos. Transformaron completamente mi sala de estar con un estilo bohemio perfecto.",
            rating: 5
        },
        {
            name: "Ana Rodríguez", 
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            text: "Calidad excepcional y descarga instantánea. Exactamente lo que necesitaba para mi nueva oficina en casa.",
            rating: 5
        },
        {
            name: "Carmen López",
            image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=100&h=100&fit=crop&crop=face", 
            text: "El servicio al cliente es fantástico y los precios son muy justos. Definitivamente volveré a comprar.",
            rating: 5
        }
    ];

    return testimonials.map(testimonial => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <img src="${testimonial.image}" alt="${testimonial.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                <div>
                    <div style="font-weight: 600; color: var(--earth-800);">${testimonial.name}</div>
                    <div style="color: var(--accent-gold);">${'⭐'.repeat(testimonial.rating)}</div>
                </div>
            </div>
            <p style="color: var(--earth-700); font-style: italic; line-height: 1.6;">"${testimonial.text}"</p>
        </div>
    `).join('');
};

// =============================================================================
// PÁGINA DE CATEGORÍAS 
// =============================================================================

Router.renderCategoriesPage = function() {
    const mainContent = document.querySelector('.main-content');
    const categories = DataUtils.getActiveCategories();
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Todas las Categorías</h1>
                <p class="section-subtitle">Explora nuestra completa colección de arte digital organizada por estilos y temáticas</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                ${categories.map((category, index) => {
                    const productCount = DataUtils.getProductsByCategory(category.slug).length;
                    return `
                        <div class="fade-in-up" style="animation-delay: ${index * 0.1}s;">
                            <div style="background: white; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); transition: all 0.4s ease; cursor: pointer;" onclick="navigateTo('catalog', '${category.slug}')">
                                <div style="position: relative; height: 200px; background: linear-gradient(135deg, var(--${category.color || 'rose'}-400) 0%, var(--${category.color || 'rose'}-600) 100%);">
                                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 4rem;">
                                        ${category.icon || '🎨'}
                                    </div>
                                </div>
                                
                                <div style="padding: 2rem;">
                                    <h3 style="font-size: 1.5rem; font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem;">${category.name}</h3>
                                    <p style="color: var(--earth-600); margin-bottom: 1rem; line-height: 1.5;">${category.description || 'Diseños únicos y hermosos para decorar tus espacios'}</p>
                                    
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span style="color: var(--earth-500); font-size: 0.9rem;">${productCount} productos</span>
                                        <span style="color: var(--rose-500); font-weight: 600;">Explorar →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};

// =============================================================================
// PÁGINA SOBRE NOSOTROS 
// =============================================================================

Router.renderAboutPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <!-- Hero About -->
            <div style="text-align: center; margin-bottom: 4rem; padding: 3rem; background: var(--gradient-warm); border-radius: var(--border-radius-2xl);">
                <h1 style="font-family: var(--font-serif); font-size: clamp(2.5rem, 5vw, 4rem); color: var(--earth-900); margin-bottom: 1rem;">Nuestra Historia</h1>
                <p style="font-size: 1.3rem; color: var(--earth-700); max-width: 700px; margin: 0 auto; line-height: 1.6;">
                    Creamos arte digital con alma bohemia para inspirar espacios llenos de paz y creatividad
                </p>
            </div>

            <!-- Historia -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 4rem; align-items: center;">
                <div>
                    <h2 style="font-family: var(--font-serif); font-size: 2.5rem; color: var(--earth-800); margin-bottom: 1.5rem;">Una Pasión por el Arte</h2>
                    <p style="color: var(--earth-700); font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem;">
                        EstudioPixelArte nació de la pasión por crear espacios únicos y llenos de significado. Fundado en 2020 por un grupo de artistas digitales especializados en estilo bohemio, nuestro estudio se ha dedicado a crear piezas que no solo decoran, sino que inspiran.
                    </p>
                    <p style="color: var(--earth-700); font-size: 1.1rem; line-height: 1.7;">
                        Cada diseño es cuidadosamente elaborado a mano, combinando elementos tradicionales del arte bohemio con técnicas digitales modernas. Creemos que el arte debe ser accesible para todos, por eso ofrecemos descargas instantáneas de alta calidad.
                    </p>
                </div>
                <div style="position: relative;">
                    <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop" 
                         alt="Nuestro estudio" 
                         style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-medium);">
                </div>
            </div>

            <!-- Valores -->
            <div style="background: white; padding: 3rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); margin-bottom: 4rem;">
                <h2 style="font-family: var(--font-serif); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 3rem;">Nuestros Valores</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    <div style="text-align: center; padding: 1.5rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🌿</div>
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1rem;">Sostenibilidad</h3>
                        <p style="color: var(--earth-600); line-height: 1.6;">Arte digital que respeta el medio ambiente, sin materiales físicos y con impacto cero</p>
                    </div>
                    
                    <div style="text-align: center; padding: 1.5rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1rem;">Creatividad</h3>
                        <p style="color: var(--earth-600); line-height: 1.6;">Cada diseño es único y creado con amor para inspirar tu creatividad personal</p>
                    </div>
                    
                    <div style="text-align: center; padding: 1.5rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">💫</div>
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1rem;">Accesibilidad</h3>
                        <p style="color: var(--earth-600); line-height: 1.6;">Precios justos y descargas instantáneas para que todos puedan disfrutar del arte</p>
                    </div>
                </div>
            </div>

            <!-- Equipo -->
            <div>
                <h2 style="font-family: var(--font-serif); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 3rem;">Nuestro Equipo</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                    ${this.renderTeamMembers()}
                </div>
            </div>
        </div>
    `;
};

Router.renderTeamMembers = function() {
    const team = [
        {
            name: "Sofia Mendoza",
            role: "Fundadora & Artista Principal",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
            bio: "Especialista en arte bohemio con 8 años de experiencia. Creadora de más de 500 diseños únicos."
        },
        {
            name: "Luna Vásquez", 
            role: "Diseñadora Digital",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            bio: "Experta en mandalas y patrones geométricos. Su trabajo se caracteriza por la armonía y el equilibrio."
        },
        {
            name: "Diego Herrera",
            role: "Director Creativo",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            bio: "Visionario del color y la composición. Especializado en crear paletas que transmiten emociones."
        }
    ];

    return team.map(member => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); text-align: center; border: 1px solid var(--cream-200);">
            <img src="${member.image}" alt="${member.name}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; box-shadow: var(--shadow-medium);">
            <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 0.5rem;">${member.name}</h3>
            <p style="color: var(--rose-500); font-weight: 600; margin-bottom: 1rem;">${member.role}</p>
            <p style="color: var(--earth-600); line-height: 1.6;">${member.bio}</p>
        </div>
    `).join('');
};

// =============================================================================
// PÁGINA DE BLOG
// =============================================================================

Router.renderBlogPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Blog de Arte & Inspiración</h1>
                <p class="section-subtitle">Descubre tendencias, tips de decoración y las historias detrás de nuestros diseños</p>
            </div>
            
            <!-- Posts Destacados -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                ${this.renderBlogPosts()}
            </div>

            <!-- Newsletter del Blog -->
            <div style="background: var(--gradient-warm); padding: 3rem; border-radius: var(--border-radius-xl); margin-top: 4rem; text-align: center;">
                <h3 style="font-size: 2rem; color: var(--earth-800); margin-bottom: 1rem;">¿Te gusta nuestro contenido?</h3>
                <p style="color: var(--earth-600); margin-bottom: 2rem;">Suscríbete para recibir nuestros últimos posts directamente en tu email</p>
                <form style="display: flex; gap: 1rem; max-width: 400px; margin: 0 auto;" onsubmit="handleBlogSubscription(event)">
                    <input type="email" placeholder="Tu email..." required style="flex: 1; padding: 1rem; border-radius: var(--border-radius-lg); border: 1px solid var(--cream-300);">
                    <button type="submit" class="btn btn-primary">Suscribirse</button>
                </form>
            </div>
        </div>
    `;
};

Router.renderBlogPosts = function() {
    const posts = [
        {
            title: "10 Formas de Decorar con Arte Bohemio",
            excerpt: "Descubre cómo integrar el estilo bohemio en cualquier espacio de tu hogar con nuestros consejos expertos...",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
            date: "15 Nov 2024",
            category: "Decoración",
            readTime: "5 min"
        },
        {
            title: "La Psicología de los Colores en el Arte",
            excerpt: "Cómo los colores afectan nuestro estado de ánimo y por qué elegir la paleta correcta es crucial...",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop",
            date: "12 Nov 2024", 
            category: "Arte",
            readTime: "7 min"
        },
        {
            title: "Tendencias 2024: Minimalismo Bohemio",
            excerpt: "La fusión perfecta entre el minimalismo y el estilo bohemio está revolucionando el diseño de interiores...",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop",
            date: "8 Nov 2024",
            category: "Tendencias", 
            readTime: "6 min"
        },
        {
            title: "Cómo Crear un Rincón de Meditación",
            excerpt: "Transforma cualquier espacio en tu santuario personal con estos elementos esenciales del diseño bohemio...",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
            date: "5 Nov 2024",
            category: "Lifestyle",
            readTime: "4 min"
        },
        {
            title: "El Arte de Imprimir: Guía Completa",
            excerpt: "Todo lo que necesitas saber para obtener la mejor calidad al imprimir nuestros diseños digitales...",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
            date: "2 Nov 2024",
            category: "Tutorial",
            readTime: "8 min"
        },
        {
            title: "Mandalas: Significado y Simbolismo",
            excerpt: "Explora el profundo significado espiritual detrás de los mandalas y cómo pueden transformar tu espacio...",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
            date: "29 Oct 2024",
            category: "Arte",
            readTime: "6 min"
        }
    ];

    return posts.map((post, index) => `
        <article class="fade-in-up" style="animation-delay: ${index * 0.1}s;">
            <div style="background: white; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); transition: all 0.3s ease; cursor: pointer;" onclick="navigateTo('blog', '${post.title.toLowerCase().replace(/\s+/g, '-')}')">
                <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover;">
                
                <div style="padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 0.9rem; color: var(--earth-500);">
                        <span style="background: var(--rose-100); color: var(--rose-600); padding: 0.25rem 0.75rem; border-radius: var(--border-radius-md); font-weight: 600;">${post.category}</span>
                        <span>${post.date}</span>
                        <span>• ${post.readTime} lectura</span>
                    </div>
                    
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--earth-800); margin-bottom: 0.75rem; line-height: 1.3;">${post.title}</h3>
                    <p style="color: var(--earth-600); line-height: 1.6; margin-bottom: 1rem;">${post.excerpt}</p>
                    
                    <div style="color: var(--rose-500); font-weight: 600; font-size: 0.9rem;">Leer más →</div>
                </div>
            </div>
        </article>
    `).join('');
};

// =============================================================================
// PÁGINAS DE INFORMACIÓN Y SOPORTE
// =============================================================================

Router.renderContactPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Contáctanos</h1>
                <p class="section-subtitle">Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                <!-- Formulario -->
                <div>
                    <form onsubmit="handleContactForm(event)" style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1.5rem;">Envíanos un mensaje</h3>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Nombre *</label>
                            <input type="text" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: var(--border-radius-md);" placeholder="Tu nombre completo">
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Email *</label>
                            <input type="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: var(--border-radius-md);" placeholder="tu@email.com">
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Asunto *</label>
                            <select required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: var(--border-radius-md); background: white;">
                                <option value="">Selecciona un tema</option>
                                <option value="support">Soporte técnico</option>
                                <option value="order">Consulta sobre pedido</option>
                                <option value="custom">Diseño personalizado</option>
                                <option value="partnership">Colaboraciones</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Mensaje *</label>
                            <textarea required rows="5" style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: var(--border-radius-md); resize: vertical;" placeholder="Cuéntanos cómo podemos ayudarte..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar Mensaje</button>
                    </form>
                </div>
                
                <!-- Información de contacto -->
                <div>
                    <div style="background: var(--gradient-warm); padding: 2rem; border-radius: var(--border-radius-xl); margin-bottom: 2rem;">
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1.5rem;">Información de Contacto</h3>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                <div style="background: var(--rose-500); color: white; width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    📧
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--earth-800);">Email</div>
                                    <div style="color: var(--earth-600);">hola@estudiopixelarte.com</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                <div style="background: var(--sage-500); color: white; width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    🕒
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--earth-800);">Horario de Atención</div>
                                    <div style="color: var(--earth-600);">Lun - Vie: 9:00 - 18:00</div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                <div style="background: var(--lavender-500); color: white; width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    ⚡
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--earth-800);">Tiempo de Respuesta</div>
                                    <div style="color: var(--earth-600);">24-48 horas</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- FAQ Rápidas -->
                    <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                        <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1.5rem;">Preguntas Frecuentes</h3>
                        
                        <div style="margin-bottom: 1rem;">
                            <div style="font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem;">¿Cómo descargo mis compras?</div>
                            <p style="color: var(--earth-600); font-size: 0.9rem;">Recibirás un email inmediato con los enlaces de descarga después del pago.</p>
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <div style="font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem;">¿Qué formato tienen los archivos?</div>
                            <p style="color: var(--earth-600); font-size: 0.9rem;">Ofrecemos archivos en alta resolución JPG y PNG, perfectos para imprimir.</p>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem;">¿Hacen diseños personalizados?</div>
                            <p style="color: var(--earth-600); font-size: 0.9rem;">¡Sí! Contáctanos para proyectos personalizados y colaboraciones.</p>
                        </div>
                        
                        <button onclick="navigateTo('faq')" class="btn btn-outline" style="width: 100%; margin-top: 1rem;">Ver Todas las FAQ</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// =============================================================================
// FUNCIONES DE MANEJO DE EVENTOS MEJORADAS
// =============================================================================

// Extensiones del Router con todas las páginas
Router.renderCatalogPage = function() {
    const mainContent = document.querySelector('.main-content');
    const products = SearchManager.applyFilters();
    const categories = DataUtils.getActiveCategories();
    
    mainContent.innerHTML = `
        <div style="max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem;">
            <!-- Header del Catálogo -->
            <div style="text-align: center; margin-bottom: 3rem; padding: 2rem 0; background: linear-gradient(135deg, var(--lavender-50) 0%, var(--rose-50) 100%); border-radius: 1rem;">
                <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); margin-bottom: 1rem;">Catálogo de Arte Digital</h1>
                <p style="color: var(--earth-600); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                    Descubre nuestra colección completa de arte bohemio y minimalista. 
                    Cada diseño está cuidadosamente creado para inspirar y decorar tus espacios.
                </p>
            </div>

            <!-- Layout Principal -->
            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;">
                <!-- Sidebar Filtros -->
                <aside style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); position: sticky; top: 2rem;">
                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1rem; font-size: 1.1rem;">Categorías</h3>
                        ${categories.map(category => `
                            <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; cursor: pointer; transition: color 0.3s ease;">
                                <input type="checkbox" value="${category.slug}" onchange="handleCategoryFilter(this)" style="accent-color: var(--rose-500);">
                                <span>${category.name}</span>
                            </label>
                        `).join('')}
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1rem; font-size: 1.1rem;">Precio</h3>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <input type="number" id="min-price" placeholder="Min" style="width: 80px; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.25rem; font-size: 0.9rem;" min="0" step="0.01">
                            <span>-</span>
                            <input type="number" id="max-price" placeholder="Max" style="width: 80px; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.25rem; font-size: 0.9rem;" min="0" step="0.01">
                        </div>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <button onclick="applyPriceFilter()" class="btn btn-primary" style="width: 100%; margin-bottom: 0.5rem;">
                            Aplicar Filtros
                        </button>
                        <button onclick="clearAllFilters()" class="btn btn-outline" style="width: 100%;">
                            Limpiar Filtros
                        </button>
                    </div>
                </aside>

                <!-- Contenido Principal -->
                <main style="min-height: 600px;">
                    <!-- Toolbar -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid var(--cream-200);">
                        <div style="color: var(--earth-600); font-weight: 500;">
                            ${products.length} productos encontrados
                        </div>
                        
                        <select id="sort-select" onchange="handleSortChange(this)" style="padding: 0.5rem 1rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; background: white; color: var(--earth-800); cursor: pointer;">
                            <option value="latest">Más Recientes</option>
                            <option value="popular">Más Populares</option>
                            <option value="price_low">Precio: Menor a Mayor</option>
                            <option value="price_high">Precio: Mayor a Menor</option>
                            <option value="name">Nombre A-Z</option>
                        </select>
                    </div>

                    <!-- Grid de Productos -->
                    <div class="product-grid" id="products-container">
                        ${products.map(product => UIRenderer.renderProductCard(product)).join('')}
                    </div>
                </main>
            </div>
        </div>
    `;

    // Configurar eventos de filtros
    setTimeout(() => {
        document.getElementById('min-price').addEventListener('input', Utils.debounce(applyPriceFilter, 500));
        document.getElementById('max-price').addEventListener('input', Utils.debounce(applyPriceFilter, 500));
    }, 100);
};

Router.renderProductPage = function(slug) {
    const product = DataUtils.getProductBySlug(slug);
    
    if (!product) {
        this.renderNotFoundPage();
        return;
    }

    const mainContent = document.querySelector('.main-content');
    const category = CATEGORIES.find(cat => cat.id === product.categoryId);
    const relatedProducts = DataUtils.getProductsByCategory(category.slug).filter(p => p.id !== product.id).slice(0, 4);
    const discountPercent = DataUtils.getDiscountPercentage(product.originalPrice, product.price);

    mainContent.innerHTML = `
        <div class="container" style="padding: 2rem 1.5rem;">
            <!-- Breadcrumb -->
            <nav style="margin-bottom: 2rem;">
                <ol style="display: flex; align-items: center; gap: 0.5rem; list-style: none; color: var(--earth-600); font-size: 0.9rem;">
                    <li><a href="#" onclick="navigateTo('home')" style="color: var(--earth-600); text-decoration: none;">Inicio</a></li>
                    <li>></li>
                    <li><a href="#" onclick="navigateTo('catalog')" style="color: var(--earth-600); text-decoration: none;">Catálogo</a></li>
                    <li>></li>
                    <li><a href="#" onclick="navigateTo('catalog', '${category.slug}')" style="color: var(--earth-600); text-decoration: none;">${category.name}</a></li>
                    <li>></li>
                    <li style="color: var(--earth-800); font-weight: 500;">${product.name}</li>
                </ol>
            </nav>

            <!-- Producto Principal -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 4rem;">
                <!-- Galería -->
                <div>
                    <div style="position: relative; aspect-ratio: 4/3; margin-bottom: 1rem; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-medium);">
                        <img id="main-image" src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        ${discountPercent ? `<div style="position: absolute; top: 1rem; right: 1rem; background: var(--rose-500); color: white; padding: 0.5rem 1rem; border-radius: 1rem; font-weight: 600;">-${discountPercent}%</div>` : ''}
                    </div>
                    
                    ${product.gallery && product.gallery.length > 0 ? `
                    <div style="display: flex; gap: 0.5rem; overflow-x: auto;">
                        <img src="${product.image}" onclick="changeMainImage('${product.image}')" style="width: 80px; height: 60px; object-fit: cover; border-radius: 0.5rem; cursor: pointer; border: 2px solid var(--rose-500);">
                        ${product.gallery.map(img => `
                            <img src="${img}" onclick="changeMainImage('${img}')" style="width: 80px; height: 60px; object-fit: cover; border-radius: 0.5rem; cursor: pointer; border: 2px solid transparent; transition: border-color 0.3s ease;">
                        `).join('')}
                    </div>
                    ` : ''}
                </div>

                <!-- Información -->
                <div>
                    <div style="color: var(--earth-600); font-size: 0.9rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">${category.name}</div>
                    <h1 style="font-size: 2rem; font-weight: 700; color: var(--earth-800); margin-bottom: 1rem; line-height: 1.2;">${product.name}</h1>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span style="font-size: 2rem; font-weight: 700; color: var(--rose-500);">${Utils.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span style="font-size: 1.5rem; color: var(--earth-500); text-decoration: line-through;">${Utils.formatPrice(product.originalPrice)}</span>
                            <span style="background: var(--sage-100); color: var(--sage-700); padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 600;">${discountPercent}% OFF</span>
                        ` : ''}
                    </div>

                    <p style="color: var(--earth-700); line-height: 1.6; margin-bottom: 2rem; font-size: 1.1rem;">${product.description}</p>

                    <!-- Especificaciones -->
                    <div style="background: var(--cream-50); padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1rem;">Especificaciones</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <div style="text-align: center;">
                                    <div style="color: var(--earth-600); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">${key}</div>
                                    <div style="color: var(--earth-800); font-weight: 600;">${value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Stats -->
                    <div style="display: flex; gap: 2rem; margin-bottom: 2rem; padding: 1rem 0; border-top: 1px solid var(--cream-200); border-bottom: 1px solid var(--cream-200);">
                        <div style="text-align: center;">
                            <div style="color: var(--rose-500); font-weight: 700; font-size: 1.25rem;">${product.downloadCount}</div>
                            <div style="color: var(--earth-600); font-size: 0.8rem;">Descargas</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: var(--rose-500); font-weight: 700; font-size: 1.25rem;">${product.rating}</div>
                            <div style="color: var(--earth-600); font-size: 0.8rem;">Rating</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="color: var(--rose-500); font-weight: 700; font-size: 1.25rem;">${DataUtils.formatFileSize(product.fileSize)}</div>
                            <div style="color: var(--earth-600); font-size: 0.8rem;">Tamaño</div>
                        </div>
                    </div>

                    <!-- Botones de Acción -->
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="CartManager.addToCart(${product.id})" class="btn btn-primary" style="flex: 1; font-size: 1.1rem; padding: 1rem 2rem;">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.15.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                            Agregar al Carrito
                        </button>
                        <button class="btn btn-outline" style="padding: 1rem;">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Tags -->
                    <div style="margin-top: 1.5rem;">
                        <div style="color: var(--earth-600); font-size: 0.9rem; margin-bottom: 0.5rem;">Tags:</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${product.tags.map(tag => `
                                <span style="background: var(--sage-100); color: var(--sage-700); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem;">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Productos Relacionados -->
            ${relatedProducts.length > 0 ? `
            <section style="margin-top: 4rem;">
                <h2 style="font-family: var(--font-handwritten); font-size: 2rem; color: var(--earth-800); text-align: center; margin-bottom: 2rem;">Productos Relacionados</h2>
                <div class="product-grid">
                    ${relatedProducts.map(product => UIRenderer.renderProductCard(product)).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    `;

    // Incrementar contador de vistas (simulado)
    product.viewCount++;
};

Router.renderCartPage = function() {
    const mainContent = document.querySelector('.main-content');
    const cartItems = CartManager.getCartItems();
    const total = CartManager.getCartTotal();

    if (cartItems.length === 0) {
        mainContent.innerHTML = `
            <div class="container" style="padding: 4rem 1.5rem; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem; opacity: 0.5;">🛒</div>
                <h1 style="font-size: 2rem; color: var(--earth-800); margin-bottom: 1rem;">Tu carrito está vacío</h1>
                <p style="color: var(--earth-600); margin-bottom: 2rem;">¡Descubre nuestros hermosos diseños y comienza a llenar tu carrito!</p>
                <button onclick="navigateTo('catalog')" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                    Explorar Catálogo
                </button>
            </div>
        `;
        return;
    }

    mainContent.innerHTML = `
        <div class="container" style="padding: 2rem 1.5rem;">
            <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 3rem;">Mi Carrito</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 350px; gap: 3rem;">
                <!-- Productos en el carrito -->
                <div>
                    ${cartItems.map(item => `
                        <div style="display: flex; gap: 1.5rem; padding: 1.5rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-soft); margin-bottom: 1rem; border: 1px solid var(--cream-200);">
                            <img src="${item.product.image}" alt="${item.product.name}" style="width: 120px; height: 90px; object-fit: cover; border-radius: 0.5rem;">
                            
                            <div style="flex: 1;">
                                <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem; font-size: 1.1rem;">${item.product.name}</h3>
                                <p style="color: var(--earth-600); font-size: 0.9rem; margin-bottom: 1rem;">${item.product.shortDescription}</p>
                                
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <span style="color: var(--earth-600); font-size: 0.9rem;">Cantidad:</span>
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <button onclick="CartManager.updateQuantity(${item.productId}, ${item.quantity - 1})" style="background: var(--cream-100); border: 1px solid var(--cream-300); color: var(--earth-700); width: 2rem; height: 2rem; border-radius: 0.25rem; cursor: pointer;">-</button>
                                            <span style="min-width: 2rem; text-align: center; font-weight: 600;">${item.quantity}</span>
                                            <button onclick="CartManager.updateQuantity(${item.productId}, ${item.quantity + 1})" style="background: var(--cream-100); border: 1px solid var(--cream-300); color: var(--earth-700); width: 2rem; height: 2rem; border-radius: 0.25rem; cursor: pointer;">+</button>
                                        </div>
                                    </div>
                                    
                                    <div style="text-align: right;">
                                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--rose-500);">${Utils.formatPrice(item.total)}</div>
                                        <button onclick="CartManager.removeFromCart(${item.productId})" style="background: none; border: none; color: var(--earth-500); cursor: pointer; font-size: 0.8rem; text-decoration: underline;">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Resumen -->
                <div>
                    <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); position: sticky; top: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1.5rem; font-size: 1.2rem;">Resumen del Pedido</h3>
                        
                        <div style="border-bottom: 1px solid var(--cream-200); padding-bottom: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--earth-600);">Productos (${CartManager.getCartCount()})</span>
                                <span style="color: var(--earth-800); font-weight: 600;">${Utils.formatPrice(total)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; color: var(--earth-600); font-size: 0.9rem;">
                                <span>Envío</span>
                                <span>Digital - Gratis</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: var(--earth-800); margin-bottom: 2rem;">
                            <span>Total</span>
                            <span style="color: var(--rose-500);">${Utils.formatPrice(total)}</span>
                        </div>
                        
                        <button onclick="navigateTo('checkout')" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem; margin-bottom: 1rem;">
                            Proceder al Checkout
                        </button>
                        
                        <button onclick="navigateTo('catalog')" class="btn btn-outline" style="width: 100%;">
                            Continuar Comprando
                        </button>
                        
                        <button onclick="CartManager.clearCart()" style="background: none; border: none; color: var(--earth-500); cursor: pointer; font-size: 0.9rem; text-decoration: underline; width: 100%; margin-top: 1rem;">
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

Router.renderLoginPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="container" style="padding: 4rem 1.5rem;">
            <div style="max-width: 400px; margin: 0 auto; background: white; padding: 3rem; border-radius: 1rem; box-shadow: var(--shadow-medium); border: 1px solid var(--cream-200);">
                <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 0.5rem;">Iniciar Sesión</h1>
                <p style="text-align: center; color: var(--earth-600); margin-bottom: 2rem;">Accede a tu cuenta para continuar</p>
                
                <form onsubmit="handleLogin(event)">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Email</label>
                        <input type="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; font-size: 1rem;" placeholder="tu@email.com">
                    </div>
                    
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Contraseña</label>
                        <input type="password" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; font-size: 1rem;" placeholder="Tu contraseña">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem; margin-bottom: 1rem;">
                        Iniciar Sesión
                    </button>
                </form>
                
                <p style="text-align: center; color: var(--earth-600);">
                    ¿No tienes cuenta? 
                    <a href="#" onclick="navigateTo('register')" style="color: var(--rose-500); text-decoration: none; font-weight: 600;">Regístrate aquí</a>
                </p>
            </div>
        </div>
    `;
};

Router.renderRegisterPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="container" style="padding: 4rem 1.5rem;">
            <div style="max-width: 400px; margin: 0 auto; background: white; padding: 3rem; border-radius: 1rem; box-shadow: var(--shadow-medium); border: 1px solid var(--cream-200);">
                <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 0.5rem;">Crear Cuenta</h1>
                <p style="text-align: center; color: var(--earth-600); margin-bottom: 2rem;">Únete a nuestra comunidad artística</p>
                
                <form onsubmit="handleRegister(event)">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Nombre</label>
                        <input type="text" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; font-size: 1rem;" placeholder="Tu nombre completo">
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Email</label>
                        <input type="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; font-size: 1rem;" placeholder="tu@email.com">
                    </div>
                    
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Contraseña</label>
                        <input type="password" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; font-size: 1rem;" placeholder="Crea una contraseña segura">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem; margin-bottom: 1rem;">
                        Crear Cuenta
                    </button>
                </form>
                
                <p style="text-align: center; color: var(--earth-600);">
                    ¿Ya tienes cuenta? 
                    <a href="#" onclick="navigateTo('login')" style="color: var(--rose-500); text-decoration: none; font-weight: 600;">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    `;
};

Router.renderCheckoutPage = function() {
    if (!AuthManager.isLoggedIn()) {
        Utils.showNotification('Debes iniciar sesión para continuar', 'error');
        Router.navigate('login');
        return;
    }

    const cartItems = CartManager.getCartItems();
    const total = CartManager.getCartTotal();

    if (cartItems.length === 0) {
        Utils.showNotification('Tu carrito está vacío', 'error');
        Router.navigate('cart');
        return;
    }

    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="container" style="padding: 2rem 1.5rem;">
            <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); text-align: center; margin-bottom: 3rem;">Checkout</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 400px; gap: 3rem;">
                <!-- Información de Pago -->
                <div>
                    <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1.5rem; font-size: 1.2rem;">Información de Pago</h3>
                        
                        <form onsubmit="handleCheckout(event)">
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Email de confirmación</label>
                                <input type="email" value="${AppState.user.email}" style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; background: var(--neutral-100);" readonly>
                            </div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Número de tarjeta (Simulado)</label>
                                <input type="text" placeholder="1234 5678 9012 3456" style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;" required>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                                <div>
                                    <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">Fecha de vencimiento</label>
                                    <input type="text" placeholder="MM/AA" style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;" required>
                                </div>
                                <div>
                                    <label style="display: block; color: var(--earth-700); font-weight: 500; margin-bottom: 0.5rem;">CVV</label>
                                    <input type="text" placeholder="123" style="width: 100%; padding: 0.75rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;" required>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;">
                                Completar Compra ${Utils.formatPrice(total)}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Resumen del Pedido -->
                <div>
                    <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1.5rem; font-size: 1.2rem;">Resumen del Pedido</h3>
                        
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1.5rem;">
                            ${cartItems.map(item => `
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--cream-200);">
                                    <img src="${item.product.image}" alt="${item.product.name}" style="width: 60px; height: 45px; object-fit: cover; border-radius: 0.25rem;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; color: var(--earth-800); font-size: 0.9rem; margin-bottom: 0.25rem;">${item.product.name}</div>
                                        <div style="color: var(--earth-600); font-size: 0.8rem;">Cantidad: ${item.quantity}</div>
                                        <div style="color: var(--rose-500); font-weight: 600; font-size: 0.9rem;">${Utils.formatPrice(item.total)}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="border-top: 1px solid var(--cream-200); padding-top: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--earth-600);">Subtotal</span>
                                <span style="font-weight: 600;">${Utils.formatPrice(total)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                <span style="color: var(--earth-600);">Envío</span>
                                <span style="color: var(--sage-600);">Digital - Gratis</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: var(--earth-800);">
                                <span>Total</span>
                                <span style="color: var(--rose-500);">${Utils.formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

Router.renderNotFoundPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="container" style="padding: 4rem 1.5rem; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 2rem; opacity: 0.5;">🎨</div>
            <h1 style="font-size: 2.5rem; color: var(--earth-800); margin-bottom: 1rem;">Página no encontrada</h1>
            <p style="color: var(--earth-600); margin-bottom: 2rem; font-size: 1.1rem;">Lo sentimos, la página que buscas no existe.</p>
            <button onclick="navigateTo('home')" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">
                Volver al Inicio
            </button>
        </div>
    `;
};

// Funciones de manejo de eventos
function handleCategoryFilter(checkbox) {
    if (checkbox.checked) {
        AppState.currentFilters.category = checkbox.value;
    } else {
        AppState.currentFilters.category = null;
    }
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || null;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || null;
    
    AppState.currentFilters.minPrice = minPrice;
    AppState.currentFilters.maxPrice = maxPrice;
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function clearAllFilters() {
    SearchManager.clearFilters();
    
    // Limpiar campos del formulario
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-select').value = 'latest';
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function handleSortChange(select) {
    AppState.currentFilters.sort = select.value;
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function changeMainImage(src) {
    document.getElementById('main-image').src = src;
    
    // Actualizar bordes de las miniaturas
    const thumbnails = document.querySelectorAll('[onclick^="changeMainImage"]');
    thumbnails.forEach(thumb => {
        thumb.style.borderColor = thumb.onclick.toString().includes(src) ? 'var(--rose-500)' : 'transparent';
    });
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    if (AuthManager.login(email, password)) {
        navigateTo('home');
    } else {
        Utils.showNotification('Credenciales incorrectas', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    if (AuthManager.register(name, email, password)) {
        navigateTo('home');
    } else {
        Utils.showNotification('Error al crear la cuenta', 'error');
    }
}

function handleCheckout(event) {
    event.preventDefault();
    
    // Simular procesamiento de pago
    Utils.showNotification('Procesando pago...', 'success');
    
    setTimeout(() => {
        // Simular éxito del pago
        CartManager.clearCart();
        Utils.showNotification('¡Compra realizada con éxito! Revisa tu email para las descargas.', 'success');
        navigateTo('home');
    }, 2000);
} 

// Funciones de eventos de formularios
function handleNewsletterSubscription(event) {
    event.preventDefault();
    Utils.showNotification('¡Gracias por suscribirte! Recibirás contenido exclusivo pronto.', 'success');
    event.target.reset();
}

function handleBlogSubscription(event) {
    event.preventDefault();
    Utils.showNotification('¡Suscripción exitosa! Te mantendremos al día con nuestros últimos posts.', 'success');
    event.target.reset();
}

function handleContactForm(event) {
    event.preventDefault();
    Utils.showNotification('Mensaje enviado exitosamente. Te responderemos pronto.', 'success');
    event.target.reset();
}

// =============================================================================
// PÁGINAS FALTANTES - TODAS LAS NUEVAS FUNCIONALIDADES
// =============================================================================

Router.renderFaqPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Preguntas Frecuentes</h1>
                <p class="section-subtitle">Encuentra respuestas rápidas a las dudas más comunes sobre nuestros productos y servicios</p>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto;">
                ${this.renderFaqItems()}
            </div>
            
            <div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--gradient-warm); border-radius: var(--border-radius-xl);">
                <h3 style="font-size: 1.5rem; color: var(--earth-800); margin-bottom: 1rem;">¿No encontraste tu respuesta?</h3>
                <p style="color: var(--earth-600); margin-bottom: 1.5rem;">Nuestro equipo de soporte está aquí para ayudarte</p>
                <button onclick="navigateTo('contact')" class="btn btn-primary">Contactar Soporte</button>
            </div>
        </div>
    `;
};

Router.renderFaqItems = function() {
    const faqs = [
        {
            question: "¿Cómo funciona la descarga instantánea?",
            answer: "Después de completar tu compra, recibirás inmediatamente un email con enlaces de descarga seguros. Los archivos están disponibles por 30 días y puedes descargarlos las veces que necesites."
        },
        {
            question: "¿En qué formatos están disponibles los archivos?", 
            answer: "Todos nuestros diseños vienen en alta resolución (300 DPI) en formatos JPG y PNG. También incluimos versiones optimizadas para redes sociales y diferentes tamaños de impresión."
        },
        {
            question: "¿Puedo usar los diseños comercialmente?",
            answer: "Sí, todos nuestros diseños incluyen licencia comercial limitada. Puedes usarlos en tu negocio, pero no puedes revenderlos como productos digitales independientes."
        },
        {
            question: "¿Qué tamaños de impresión soportan?",
            answer: "Nuestros archivos están optimizados para imprimir desde tamaño postal hasta pósters grandes (hasta 24x36 pulgadas) manteniendo excelente calidad."
        },
        {
            question: "¿Hacen diseños personalizados?",
            answer: "¡Absolutamente! Ofrecemos servicios de diseño personalizado. Los precios varían según la complejidad. Contáctanos para una cotización."
        },
        {
            question: "¿Hay garantía de reembolso?",
            answer: "Ofrecemos garantía de satisfacción de 14 días. Si no estás completamente satisfecho con tu compra, te reembolsamos el 100%."
        },
        {
            question: "¿Cómo obtengo la mejor calidad de impresión?",
            answer: "Recomendamos usar papel fotográfico de calidad premium o lienzo. Asegúrate de que tu impresora esté configurada en 'alta calidad' y usa tintas originales."
        },
        {
            question: "¿Puedo cambiar los colores de los diseños?",
            answer: "Algunos de nuestros archivos incluyen versiones editables en formato PSD. Para personalizaciones específicas, ofrecemos servicios de modificación por un costo adicional."
        }
    ];

    return faqs.map((faq, index) => `
        <div class="faq-item" style="margin-bottom: 1rem;">
            <div style="background: white; border-radius: var(--border-radius-lg); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); overflow: hidden;">
                <button class="faq-question" onclick="toggleFaq(${index})" style="width: 100%; padding: 1.5rem; text-align: left; background: none; border: none; cursor: pointer; font-size: 1.1rem; font-weight: 600; color: var(--earth-800); display: flex; justify-content: space-between; align-items: center;">
                    ${faq.question}
                    <span class="faq-icon" id="faq-icon-${index}" style="font-size: 1.5rem; color: var(--rose-500); transition: transform 0.3s ease;">+</span>
                </button>
                <div class="faq-answer" id="faq-answer-${index}" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                    <div style="padding: 0 1.5rem 1.5rem 1.5rem; color: var(--earth-600); line-height: 1.6;">${faq.answer}</div>
                </div>
            </div>
        </div>
    `).join('');
};

Router.renderHelpPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Centro de Ayuda</h1>
                <p class="section-subtitle">Todo lo que necesitas saber para aprovechar al máximo nuestros productos</p>
            </div>
            
            <!-- Búsqueda de ayuda -->
            <div style="max-width: 600px; margin: 0 auto 3rem auto;">
                <form style="position: relative;">
                    <input type="text" placeholder="Buscar en la ayuda..." style="width: 100%; padding: 1rem 3rem 1rem 1rem; border: 2px solid var(--cream-300); border-radius: var(--border-radius-xl); font-size: 1.1rem; background: white;">
                    <button type="submit" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--earth-500); cursor: pointer;">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </form>
            </div>
            
            <!-- Categorías de ayuda -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                ${this.renderHelpCategories()}
            </div>
            
            <!-- Tutoriales populares -->
            <div style="background: white; padding: 3rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                <h3 style="font-size: 2rem; color: var(--earth-800); text-align: center; margin-bottom: 2rem;">Tutoriales Populares</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                    ${this.renderPopularTutorials()}
                </div>
            </div>
        </div>
    `;
};

Router.renderHelpCategories = function() {
    const categories = [
        {
            title: "Primeros Pasos",
            icon: "🚀",
            color: "rose",
            topics: ["Crear cuenta", "Realizar compra", "Descargar archivos", "Configurar impresora"]
        },
        {
            title: "Problemas Técnicos", 
            icon: "🔧",
            color: "sage",
            topics: ["Error de descarga", "Problemas de pago", "Calidad de impresión", "Soporte navegador"]
        },
        {
            title: "Licencias y Uso",
            icon: "📋",
            color: "lavender", 
            topics: ["Uso comercial", "Derechos de autor", "Modificaciones", "Reventa"]
        },
        {
            title: "Tips de Impresión",
            icon: "🖨️",
            color: "cream",
            topics: ["Mejor papel", "Configuración", "Tamaños", "Colores"]
        }
    ];

    return categories.map(category => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); transition: all 0.3s ease; cursor: pointer;" onclick="navigateTo('tutorials', '${category.title.toLowerCase().replace(/\s+/g, '-')}')">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${category.icon}</div>
                <h3 style="font-size: 1.5rem; color: var(--earth-800); font-weight: 600;">${category.title}</h3>
            </div>
            <ul style="list-style: none; padding: 0;">
                ${category.topics.map(topic => `
                    <li style="padding: 0.5rem 0; color: var(--earth-600); border-bottom: 1px solid var(--cream-200); display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--${category.color}-500);">•</span>
                        ${topic}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
};

Router.renderPopularTutorials = function() {
    const tutorials = [
        {title: "Cómo imprimir en casa", views: "2.1k", duration: "5 min"},
        {title: "Elegir el papel correcto", views: "1.8k", duration: "3 min"},
        {title: "Configurar Photoshop", views: "1.5k", duration: "8 min"},
        {title: "Crear un gallery wall", views: "1.2k", duration: "6 min"}
    ];

    return tutorials.map(tutorial => `
        <div style="padding: 1rem; border: 1px solid var(--cream-200); border-radius: var(--border-radius-lg); transition: all 0.3s ease; cursor: pointer;" onclick="navigateTo('tutorials', '${tutorial.title.toLowerCase().replace(/\s+/g, '-')}')">
            <h4 style="color: var(--earth-800); margin-bottom: 0.5rem; font-size: 1rem;">${tutorial.title}</h4>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--earth-500);">
                <span>${tutorial.views} vistas</span>
                <span>${tutorial.duration}</span>
            </div>
        </div>
    `).join('');
};

Router.renderTutorialsPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Tutoriales y Guías</h1>
                <p class="section-subtitle">Aprende tips y técnicas para aprovechar al máximo nuestros diseños</p>
            </div>
            
            <!-- Filtros de tutoriales -->
            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap;">
                <button class="tutorial-filter active" data-filter="all" onclick="filterTutorials('all')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--rose-500); background: var(--rose-500); color: white; border-radius: var(--border-radius-lg); cursor: pointer; transition: all 0.3s ease;">Todos</button>
                <button class="tutorial-filter" data-filter="printing" onclick="filterTutorials('printing')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--sage-500); background: white; color: var(--sage-500); border-radius: var(--border-radius-lg); cursor: pointer; transition: all 0.3s ease;">Impresión</button>
                <button class="tutorial-filter" data-filter="decoration" onclick="filterTutorials('decoration')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--lavender-500); background: white; color: var(--lavender-500); border-radius: var(--border-radius-lg); cursor: pointer; transition: all 0.3s ease;">Decoración</button>
                <button class="tutorial-filter" data-filter="editing" onclick="filterTutorials('editing')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--accent-gold); background: white; color: var(--accent-gold); border-radius: var(--border-radius-lg); cursor: pointer; transition: all 0.3s ease;">Edición</button>
            </div>
            
            <!-- Grid de tutoriales -->
            <div id="tutorials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                ${this.renderTutorialCards()}
            </div>
        </div>
    `;
};

Router.renderTutorialCards = function() {
    const tutorials = [
        {
            title: "Guía Completa de Impresión en Casa",
            description: "Todo lo que necesitas saber para obtener impresiones profesionales desde tu hogar",
            image: "https://images.unsplash.com/photo-1586281010293-47f848ce8a47?w=400&h=250&fit=crop",
            duration: "12 min",
            difficulty: "Principiante",
            category: "printing",
            views: "3.2k"
        },
        {
            title: "Cómo Crear un Gallery Wall Perfecto",
            description: "Técnicas de diseño para organizar múltiples piezas de arte en tu pared",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
            duration: "8 min", 
            difficulty: "Intermedio",
            category: "decoration",
            views: "2.8k"
        },
        {
            title: "Personalizar Colores en Photoshop",
            description: "Aprende a modificar los colores de nuestros diseños para que combinen perfectamente",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
            duration: "15 min",
            difficulty: "Avanzado", 
            category: "editing",
            views: "1.9k"
        },
        {
            title: "Elegir el Papel Correcto",
            description: "Guía detallada sobre tipos de papel y cuál usar para cada tipo de diseño",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
            duration: "6 min",
            difficulty: "Principiante",
            category: "printing", 
            views: "4.1k"
        },
        {
            title: "Iluminación para Fotografiar Arte",
            description: "Cómo fotografiar tus impresiones para mostrarlas en redes sociales",
            image: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?w=400&h=250&fit=crop",
            duration: "10 min",
            difficulty: "Intermedio",
            category: "decoration",
            views: "1.5k"
        },
        {
            title: "Crear Mockups Profesionales",
            description: "Usa herramientas gratuitas para mostrar cómo se verían nuestros diseños en tu espacio",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
            duration: "20 min",
            difficulty: "Avanzado",
            category: "editing",
            views: "2.3k"
        }
    ];

    return tutorials.map(tutorial => `
        <div class="tutorial-card" data-category="${tutorial.category}" style="background: white; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); transition: all 0.3s ease; cursor: pointer;">
            <div style="position: relative;">
                <img src="${tutorial.image}" alt="${tutorial.title}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.7); color: white; padding: 0.5rem; border-radius: var(--border-radius-md); font-size: 0.8rem;">${tutorial.duration}</div>
                <div style="position: absolute; bottom: 1rem; left: 1rem; background: var(--rose-500); color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">${tutorial.difficulty}</div>
            </div>
            
            <div style="padding: 1.5rem;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--earth-800); margin-bottom: 0.75rem; line-height: 1.3;">${tutorial.title}</h3>
                <p style="color: var(--earth-600); margin-bottom: 1rem; line-height: 1.5; font-size: 0.95rem;">${tutorial.description}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; color: var(--earth-500); font-size: 0.9rem;">
                    <span>${tutorial.views} vistas</span>
                    <span style="color: var(--rose-500); font-weight: 600;">Ver tutorial →</span>
                </div>
            </div>
        </div>
    `).join('');
};

Router.renderInspirationPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Galería de Inspiración</h1>
                <p class="section-subtitle">Descubre cómo nuestros clientes han usado nuestros diseños para transformar sus espacios</p>
            </div>
            
            <!-- Filtros de inspiración -->
            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap;">
                <button class="inspiration-filter active" data-filter="all" onclick="filterInspiration('all')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--rose-500); background: var(--rose-500); color: white; border-radius: var(--border-radius-lg); cursor: pointer;">Todos</button>
                <button class="inspiration-filter" data-filter="living" onclick="filterInspiration('living')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--sage-500); background: white; color: var(--sage-500); border-radius: var(--border-radius-lg); cursor: pointer;">Sala</button>
                <button class="inspiration-filter" data-filter="bedroom" onclick="filterInspiration('bedroom')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--lavender-500); background: white; color: var(--lavender-500); border-radius: var(--border-radius-lg); cursor: pointer;">Dormitorio</button>
                <button class="inspiration-filter" data-filter="office" onclick="filterInspiration('office')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--accent-gold); background: white; color: var(--accent-gold); border-radius: var(--border-radius-lg); cursor: pointer;">Oficina</button>
                <button class="inspiration-filter" data-filter="kids" onclick="filterInspiration('kids')" style="padding: 0.75rem 1.5rem; border: 2px solid var(--cream-600); background: white; color: var(--cream-600); border-radius: var(--border-radius-lg); cursor: pointer;">Infantil</button>
            </div>
            
            <!-- Grid masonry de inspiración -->
            <div id="inspiration-grid" style="columns: 3; column-gap: 2rem; break-inside: avoid-column;">
                ${this.renderInspirationItems()}
            </div>
            
            <!-- CTA para enviar fotos -->
            <div style="background: var(--gradient-warm); padding: 3rem; border-radius: var(--border-radius-xl); margin-top: 4rem; text-align: center;">
                <h3 style="font-size: 2rem; color: var(--earth-800); margin-bottom: 1rem;">¡Comparte tu Creación!</h3>
                <p style="color: var(--earth-600); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ¿Has usado nuestros diseños en tu hogar? ¡Nos encantaría verlo! Comparte tu foto y podrías aparecer en nuestra galería.
                </p>
                <button onclick="navigateTo('contact')" class="btn btn-primary btn-large">Enviar mi Foto</button>
            </div>
        </div>
    `;
};

Router.renderInspirationItems = function() {
    const inspirations = [
        {
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop",
            title: "Sala Bohemia Moderna",
            description: "Hermosa combinación de nuestros mandalas con plantas naturales",
            category: "living",
            likes: 127,
            customer: "María G."
        },
        {
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop", 
            title: "Rincón de Lectura",
            description: "Espacio acogedor con arte floral en tonos suaves",
            category: "living",
            likes: 89,
            customer: "Ana R."
        },
        {
            image: "https://images.unsplash.com/photo-1586281010293-47f848ce8a47?w=400&h=500&fit=crop",
            title: "Dormitorio Sereno", 
            description: "Nuestros diseños de luna y estrellas creando un ambiente relajante",
            category: "bedroom",
            likes: 156,
            customer: "Sofía L."
        },
        {
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=450&fit=crop",
            title: "Oficina Inspiradora",
            description: "Frases motivacionales que impulsan la creatividad diaria",
            category: "office", 
            likes: 203,
            customer: "Carlos M."
        },
        {
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=350&fit=crop",
            title: "Cuarto Infantil Mágico",
            description: "Diseños de animales del bosque creando un mundo fantástico",
            category: "kids",
            likes: 178,
            customer: "Luna V."
        },
        {
            image: "https://images.unsplash.com/photo-1493932484895-752d1471eab5?w=400&h=550&fit=crop",
            title: "Entrada Acogedora",
            description: "Gallery wall con mix de nuestros diseños más populares",
            category: "living",
            likes: 134,
            customer: "Elena D."
        }
    ];

    return inspirations.map(item => `
        <div class="inspiration-item" data-category="${item.category}" style="background: white; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); margin-bottom: 2rem; break-inside: avoid; transition: all 0.3s ease; cursor: pointer;">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto; display: block;">
            
            <div style="padding: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--earth-800); margin-bottom: 0.5rem;">${item.title}</h3>
                <p style="color: var(--earth-600); margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.5;">${item.description}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--earth-500); font-size: 0.9rem;">Por ${item.customer}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--rose-500);">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                        </svg>
                        <span style="font-size: 0.9rem; font-weight: 600;">${item.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// =============================================================================
// PÁGINAS DE SOPORTE Y LEGALES
// =============================================================================

Router.renderShippingPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Envíos y Descargas</h1>
                <p class="section-subtitle">Todo sobre cómo recibir tus productos digitales</p>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: var(--gradient-warm); padding: 2rem; border-radius: var(--border-radius-xl); margin-bottom: 3rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                    <h2 style="font-size: 2rem; color: var(--earth-800); margin-bottom: 1rem;">¡Descarga Instantánea!</h2>
                    <p style="color: var(--earth-600); font-size: 1.1rem;">
                        Todos nuestros productos son digitales. No hay envíos físicos, solo descargas instantáneas después del pago.
                    </p>
                </div>
                
                ${this.renderShippingInfo()}
            </div>
        </div>
    `;
};

Router.renderShippingInfo = function() {
    const sections = [
        {
            title: "Proceso de Descarga",
            icon: "📥",
            content: `
                <ol style="list-style: decimal; padding-left: 1.5rem; color: var(--earth-700); line-height: 1.8;">
                    <li><strong>Completa tu compra:</strong> Procesa el pago de forma segura</li>
                    <li><strong>Email instantáneo:</strong> Recibes los enlaces de descarga inmediatamente</li>
                    <li><strong>Descarga segura:</strong> Enlaces válidos por 30 días con múltiples descargas</li>
                    <li><strong>Guarda tus archivos:</strong> Recomendamos guardar copias de seguridad</li>
                </ol>
            `
        },
        {
            title: "Formatos Disponibles",
            icon: "📄",
            content: `
                <ul style="list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--cream-200);">
                        <span style="background: var(--rose-100); color: var(--rose-600); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">JPG</span>
                        <span style="color: var(--earth-700);">Alta resolución (300 DPI) - Perfecto para impresión</span>
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--cream-200);">
                        <span style="background: var(--sage-100); color: var(--sage-600); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">PNG</span>
                        <span style="color: var(--earth-700);">Fondo transparente - Ideal para diseños superpuestos</span>
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--cream-200);">
                        <span style="background: var(--lavender-100); color: var(--lavender-600); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">PDF</span>
                        <span style="color: var(--earth-700);">Múltiples tamaños incluidos - Listo para imprimir</span>
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0;">
                        <span style="background: var(--accent-gold); color: white; padding: 0.25rem 0.5rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">PSD</span>
                        <span style="color: var(--earth-700);">Archivos editables - Solo productos premium</span>
                    </li>
                </ul>
            `
        },
        {
            title: "Problemas de Descarga",
            icon: "🛠️",
            content: `
                <div style="color: var(--earth-700); line-height: 1.7;">
                    <p style="margin-bottom: 1rem;"><strong>Si no recibes el email:</strong></p>
                    <ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">
                        <li>Revisa tu carpeta de spam/promociones</li>
                        <li>Verifica que el email sea correcto</li>
                        <li>Espera hasta 10 minutos (raro, pero puede pasar)</li>
                    </ul>
                    
                    <p style="margin-bottom: 1rem;"><strong>Si los enlaces no funcionan:</strong></p>
                    <ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">
                        <li>Intenta desde otro navegador</li>
                        <li>Desactiva temporalmente tu VPN</li>
                        <li>Verifica tu conexión a internet</li>
                    </ul>
                    
                    <div style="background: var(--rose-50); padding: 1rem; border-radius: var(--border-radius-md); border-left: 4px solid var(--rose-500);">
                        <strong>¿Aún tienes problemas?</strong> Contáctanos con tu número de orden y te ayudaremos inmediatamente.
                    </div>
                </div>
            `
        }
    ];

    return sections.map(section => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="font-size: 2rem;">${section.icon}</div>
                <h3 style="font-size: 1.5rem; color: var(--earth-800); font-weight: 600;">${section.title}</h3>
            </div>
            ${section.content}
        </div>
    `).join('');
};

Router.renderTermsPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Términos de Uso</h1>
                <p class="section-subtitle">Última actualización: 15 de noviembre de 2024</p>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 3rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                ${this.renderTermsContent()}
            </div>
        </div>
    `;
};

Router.renderTermsContent = function() {
    return `
        <div style="color: var(--earth-700); line-height: 1.8;">
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">1. Aceptación de Términos</h2>
            <p style="margin-bottom: 2rem;">
                Al acceder y usar EstudioPixelArte, aceptas estar sujeto a estos términos de servicio y nuestra política de privacidad.
            </p>
            
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">2. Licencia de Uso</h2>
            <p style="margin-bottom: 1rem;">Al adquirir nuestros productos digitales, obtienes:</p>
            <ul style="list-style: disc; padding-left: 2rem; margin-bottom: 2rem;">
                <li>Derecho de uso personal y comercial limitado</li>
                <li>Permitido imprimir para uso personal o en tu negocio</li>
                <li>Permitido usar en productos físicos para venta (máximo 500 unidades por diseño)</li>
                <li>NO permitido revender como archivo digital</li>
                <li>NO permitido reclamar autoría del diseño</li>
                <li>NO permitido redistribuir gratuitamente</li>
            </ul>
            
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">3. Propiedad Intelectual</h2>
            <p style="margin-bottom: 2rem;">
                Todos los diseños son propiedad exclusiva de EstudioPixelArte. La compra otorga licencia de uso, no transferencia de derechos de autor.
            </p>
            
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">4. Política de Reembolsos</h2>
            <p style="margin-bottom: 1rem;">Ofrecemos reembolso completo dentro de 14 días si:</p>
            <ul style="list-style: disc; padding-left: 2rem; margin-bottom: 2rem;">
                <li>El archivo está dañado o corrupto</li>
                <li>El producto no coincide con la descripción</li>
                <li>No has podido descargar después de nuestra asistencia técnica</li>
            </ul>
            
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">5. Limitación de Responsabilidad</h2>
            <p style="margin-bottom: 2rem;">
                EstudioPixelArte no será responsable por daños indirectos o consecuenciales derivados del uso de nuestros productos.
            </p>
            
            <h2 style="color: var(--earth-800); margin-bottom: 1rem;">6. Modificaciones</h2>
            <p style="margin-bottom: 2rem;">
                Nos reservamos el derecho de modificar estos términos. Los cambios serán efectivos inmediatamente tras su publicación.
            </p>
            
            <div style="background: var(--cream-50); padding: 1.5rem; border-radius: var(--border-radius-lg); margin-top: 2rem;">
                <h3 style="color: var(--earth-800); margin-bottom: 1rem;">¿Preguntas sobre los términos?</h3>
                <p style="margin-bottom: 1rem;">Si tienes dudas sobre estos términos o necesitas permisos especiales, no dudes en contactarnos.</p>
                <button onclick="navigateTo('contact')" class="btn btn-primary">Contactar</button>
            </div>
        </div>
    `;
};

// =============================================================================
// PÁGINAS DE USUARIO AUTENTICADO
// =============================================================================

Router.renderDashboardPage = function() {
    if (!AuthManager.isLoggedIn()) {
        navigateTo('login');
        return;
    }
    
    const mainContent = document.querySelector('.main-content');
    const user = AppState.user;
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Mi Dashboard</h1>
                <p class="section-subtitle">Bienvenid@ de vuelta, ${user.name}</p>
            </div>
            
            <!-- Estadísticas del usuario -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                ${this.renderUserStats()}
            </div>
            
            <!-- Menú de opciones -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                ${this.renderDashboardOptions()}
            </div>
        </div>
    `;
};

Router.renderUserStats = function() {
    const stats = [
        {icon: "🛒", label: "Compras Totales", value: "5", color: "rose"},
        {icon: "📥", label: "Descargas", value: "12", color: "sage"}, 
        {icon: "❤️", label: "Favoritos", value: "8", color: "lavender"},
        {icon: "🎨", label: "Colección", value: "15", color: "accent-gold"}
    ];

    return stats.map(stat => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">${stat.icon}</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--${stat.color}); margin-bottom: 0.5rem;">${stat.value}</div>
            <div style="color: var(--earth-600); font-size: 0.9rem;">${stat.label}</div>
        </div>
    `).join('');
};

Router.renderDashboardOptions = function() {
    const options = [
        {
            title: "Mis Pedidos",
            description: "Ver historial de compras y descargar archivos",
            icon: "📋",
            action: "navigateTo('orders')",
            color: "rose"
        },
        {
            title: "Mis Descargas",
            description: "Accede a todos tus archivos descargados",
            icon: "📁", 
            action: "navigateTo('downloads')",
            color: "sage"
        },
        {
            title: "Lista de Deseos",
            description: "Guarda tus diseños favoritos para después",
            icon: "💝",
            action: "navigateTo('wishlist')",
            color: "lavender"
        },
        {
            title: "Mi Perfil",
            description: "Actualiza tu información personal",
            icon: "👤",
            action: "navigateTo('profile')",
            color: "accent-gold"
        }
    ];

    return options.map(option => `
        <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); cursor: pointer; transition: all 0.3s ease;" onclick="${option.action}">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: var(--${option.color}); color: white; width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    ${option.icon}
                </div>
                <h3 style="font-size: 1.25rem; color: var(--earth-800); font-weight: 600;">${option.title}</h3>
            </div>
            <p style="color: var(--earth-600); line-height: 1.5;">${option.description}</p>
            <div style="margin-top: 1rem; color: var(--${option.color}); font-weight: 600;">Ir →</div>
        </div>
    `).join('');
};

// Función global para navegación
function navigateTo(page, param = null) {
    Router.navigate(page, param);
}

// =============================================================================
// PÁGINAS RESTANTES Y FUNCIONES DE INTERACTIVIDAD
// =============================================================================

// Resto de páginas de usuario
Router.renderOrdersPage = function() {
    if (!AuthManager.isLoggedIn()) {
        navigateTo('login');
        return;
    }
    
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Mis Pedidos</h1>
                <p class="section-subtitle">Historial completo de tus compras</p>
            </div>
            
            ${this.renderUserOrders()}
        </div>
    `;
};

Router.renderUserOrders = function() {
    const orders = [
        {
            id: "#ORD-001",
            date: "2024-11-15",
            items: ["Mandala Lunar", "Poster Bohemio"],
            total: "$24.99",
            status: "completed",
            downloads: 3
        },
        {
            id: "#ORD-002", 
            date: "2024-11-10",
            items: ["Set Floral Vintage"],
            total: "$15.99",
            status: "completed",
            downloads: 5
        }
    ];

    return `
        <div style="max-width: 900px; margin: 0 auto;">
            ${orders.map(order => `
                <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                        <div>
                            <h3 style="font-size: 1.25rem; color: var(--earth-800); margin-bottom: 0.5rem;">${order.id}</h3>
                            <p style="color: var(--earth-600);">Fecha: ${order.date}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--rose-500); margin-bottom: 0.5rem;">${order.total}</div>
                            <span style="background: var(--sage-100); color: var(--sage-700); padding: 0.25rem 0.75rem; border-radius: var(--border-radius-md); font-size: 0.8rem; font-weight: 600;">Completado</span>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--cream-200); padding-top: 1.5rem;">
                        <h4 style="color: var(--earth-800); margin-bottom: 1rem;">Productos:</h4>
                        <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
                            ${order.items.map(item => `
                                <li style="padding: 0.5rem 0; color: var(--earth-700);">• ${item}</li>
                            `).join('')}
                        </ul>
                        
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <button class="btn btn-primary">Descargar Archivos</button>
                            <span style="color: var(--earth-500); font-size: 0.9rem;">${order.downloads} descargas realizadas</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

Router.renderWishlistPage = function() {
    if (!AuthManager.isLoggedIn()) {
        navigateTo('login');
        return;
    }
    
    const mainContent = document.querySelector('.main-content');
    const wishlistProducts = DataUtils.getFeaturedProducts().slice(0, 4); // Simulamos wishlist
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Mi Lista de Deseos</h1>
                <p class="section-subtitle">Guarda tus diseños favoritos para comprarlos después</p>
            </div>
            
            <div class="product-grid">
                ${wishlistProducts.map(product => UIRenderer.renderProductCard(product)).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 3rem;">
                <button onclick="navigateTo('catalog')" class="btn btn-outline btn-large">Seguir Explorando</button>
            </div>
        </div>
    `;
};

Router.renderPrivacyPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Política de Privacidad</h1>
                <p class="section-subtitle">Última actualización: 15 de noviembre de 2024</p>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 3rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                <div style="color: var(--earth-700); line-height: 1.8;">
                    <h2 style="color: var(--earth-800); margin-bottom: 1rem;">Información que Recopilamos</h2>
                    <p style="margin-bottom: 2rem;">
                        Recopilamos información que nos proporcionas directamente, como tu nombre, email, y detalles de pago cuando realizas una compra.
                    </p>
                    
                    <h2 style="color: var(--earth-800); margin-bottom: 1rem;">Cómo Usamos tu Información</h2>
                    <ul style="list-style: disc; padding-left: 2rem; margin-bottom: 2rem;">
                        <li>Procesar tus pedidos y enviar descargas</li>
                        <li>Comunicarnos contigo sobre tu cuenta</li>
                        <li>Mejorar nuestros productos y servicios</li>
                        <li>Enviar actualizaciones y ofertas (con tu consentimiento)</li>
                    </ul>
                    
                    <h2 style="color: var(--earth-800); margin-bottom: 1rem;">Protección de Datos</h2>
                    <p style="margin-bottom: 2rem;">
                        Utilizamos encriptación SSL y almacenamos tus datos en servidores seguros. No vendemos ni compartimos tu información personal con terceros.
                    </p>
                    
                    <div style="background: var(--cream-50); padding: 1.5rem; border-radius: var(--border-radius-lg);">
                        <h3 style="color: var(--earth-800); margin-bottom: 1rem;">Tus Derechos</h3>
                        <p style="margin-bottom: 1rem;">Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier momento.</p>
                        <button onclick="navigateTo('contact')" class="btn btn-primary">Contactar sobre Privacidad</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

Router.renderNewsletterPage = function() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="section-header">
                <h1 class="section-title">Newsletter Exclusivo</h1>
                <p class="section-subtitle">Únete a nuestra comunidad y recibe contenido exclusivo</p>
            </div>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--gradient-warm); padding: 3rem; border-radius: var(--border-radius-xl); text-align: center; margin-bottom: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">💌</div>
                    <h2 style="font-size: 2rem; color: var(--earth-800); margin-bottom: 1rem;">¡Mantente Inspirado!</h2>
                    <p style="color: var(--earth-600); margin-bottom: 2rem; line-height: 1.6;">
                        Suscríbete y recibe las últimas tendencias en decoración bohemia, nuevos diseños exclusivos y ofertas especiales directamente en tu email.
                    </p>
                    
                    <form onsubmit="handleNewsletterSubscription(event)" style="margin-bottom: 1.5rem;">
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                            <input type="email" placeholder="Tu email aquí..." required style="flex: 1; padding: 1rem; border-radius: var(--border-radius-lg); border: 1px solid var(--cream-300);">
                            <button type="submit" class="btn btn-primary">Suscribirse</button>
                        </div>
                    </form>
                    
                    <p style="font-size: 0.9rem; color: var(--earth-500);">
                        Sin spam, solo inspiración. Puedes cancelar cuando quieras.
                    </p>
                </div>
                
                <div style="background: white; padding: 2rem; border-radius: var(--border-radius-xl); box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200);">
                    <h3 style="color: var(--earth-800); margin-bottom: 1.5rem; text-align: center;">¿Qué Recibirás?</h3>
                    
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="background: var(--rose-100); color: var(--rose-600); width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">🎨</div>
                            <div>
                                <h4 style="color: var(--earth-800); margin-bottom: 0.25rem;">Nuevos Diseños</h4>
                                <p style="color: var(--earth-600); font-size: 0.9rem;">Acceso temprano a nuestras últimas creaciones</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="background: var(--sage-100); color: var(--sage-600); width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">💡</div>
                            <div>
                                <h4 style="color: var(--earth-800); margin-bottom: 0.25rem;">Tips de Decoración</h4>
                                <p style="color: var(--earth-600); font-size: 0.9rem;">Consejos expertos para usar nuestros diseños</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="background: var(--lavender-100); color: var(--lavender-600); width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">🎁</div>
                            <div>
                                <h4 style="color: var(--earth-800); margin-bottom: 0.25rem;">Ofertas Exclusivas</h4>
                                <p style="color: var(--earth-600); font-size: 0.9rem;">Descuentos especiales solo para suscriptores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// =============================================================================
// FUNCIONES DE INTERACTIVIDAD
// =============================================================================

// FAQ Toggle
function toggleFaq(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = '0px';
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Filtros de tutoriales
function filterTutorials(category) {
    const cards = document.querySelectorAll('.tutorial-card');
    const filters = document.querySelectorAll('.tutorial-filter');
    
    // Actualizar botones
    filters.forEach(filter => {
        filter.classList.remove('active');
        filter.style.background = 'white';
        filter.style.color = filter.style.borderColor;
    });
    
    const activeFilter = document.querySelector(`[data-filter="${category}"]`);
    if (activeFilter) {
        activeFilter.classList.add('active');
        const color = activeFilter.style.borderColor;
        activeFilter.style.background = color;
        activeFilter.style.color = 'white';
    }
    
    // Filtrar cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filtros de inspiración  
function filterInspiration(category) {
    const items = document.querySelectorAll('.inspiration-item');
    const filters = document.querySelectorAll('.inspiration-filter');
    
    // Actualizar botones
    filters.forEach(filter => {
        filter.classList.remove('active');
        filter.style.background = 'white';
        filter.style.color = filter.style.borderColor;
    });
    
    const activeFilter = document.querySelector(`[data-filter="${category}"]`);
    if (activeFilter) {
        activeFilter.classList.add('active');
        const color = activeFilter.style.borderColor;
        activeFilter.style.background = color;
        activeFilter.style.color = 'white';
    }
    
    // Filtrar items
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Continuar con las funciones originales del router...
Router.renderCatalogPage = function() {
    const mainContent = document.querySelector('.main-content');
    const products = SearchManager.applyFilters();
    const categories = DataUtils.getActiveCategories();
    
    mainContent.innerHTML = `
        <div style="max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem;">
            <!-- Header del Catálogo -->
            <div style="text-align: center; margin-bottom: 3rem; padding: 2rem 0; background: linear-gradient(135deg, var(--lavender-50) 0%, var(--rose-50) 100%); border-radius: 1rem;">
                <h1 style="font-family: var(--font-handwritten); font-size: 2.5rem; color: var(--earth-800); margin-bottom: 1rem;">Catálogo de Arte Digital</h1>
                <p style="color: var(--earth-600); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
                    Descubre nuestra colección completa de arte bohemio y minimalista. 
                    Cada diseño está cuidadosamente creado para inspirar y decorar tus espacios.
                </p>
            </div>

            <!-- Layout Principal -->
            <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;">
                <!-- Sidebar Filtros -->
                <aside style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: var(--shadow-soft); border: 1px solid var(--cream-200); position: sticky; top: 2rem;">
                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1rem; font-size: 1.1rem;">Categorías</h3>
                        ${categories.map(category => `
                            <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; cursor: pointer; transition: color 0.3s ease;">
                                <input type="checkbox" value="${category.slug}" onchange="handleCategoryFilter(this)" style="accent-color: var(--rose-500);">
                                <span>${category.name}</span>
                            </label>
                        `).join('')}
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="font-weight: 600; color: var(--earth-800); margin-bottom: 1rem; font-size: 1.1rem;">Precio</h3>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <input type="number" id="min-price" placeholder="Min" style="width: 80px; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.25rem; font-size: 0.9rem;" min="0" step="0.01">
                            <span>-</span>
                            <input type="number" id="max-price" placeholder="Max" style="width: 80px; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.25rem; font-size: 0.9rem;" min="0" step="0.01">
                        </div>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <button onclick="applyPriceFilter()" class="btn btn-primary" style="width: 100%; margin-bottom: 0.5rem;">
                            Aplicar Filtros
                        </button>
                        <button onclick="clearAllFilters()" class="btn btn-outline" style="width: 100%;">
                            Limpiar Filtros
                        </button>
                    </div>
                </aside>

                <!-- Contenido Principal -->
                <main style="min-height: 600px;">
                    <!-- Toolbar -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid var(--cream-200);">
                        <div style="color: var(--earth-600); font-weight: 500;">
                            ${products.length} productos encontrados
                        </div>
                        
                        <select id="sort-select" onchange="handleSortChange(this)" style="padding: 0.5rem 1rem; border: 1px solid var(--cream-300); border-radius: 0.5rem; background: white; color: var(--earth-800); cursor: pointer;">
                            <option value="latest">Más Recientes</option>
                            <option value="popular">Más Populares</option>
                            <option value="price_low">Precio: Menor a Mayor</option>
                            <option value="price_high">Precio: Mayor a Menor</option>
                            <option value="name">Nombre A-Z</option>
                        </select>
                    </div>

                    <!-- Grid de Productos -->
                    <div class="product-grid" id="products-container">
                        ${products.map(product => UIRenderer.renderProductCard(product)).join('')}
                    </div>
                </main>
            </div>
        </div>
    `;

    // Configurar eventos de filtros
    setTimeout(() => {
        document.getElementById('min-price').addEventListener('input', Utils.debounce(applyPriceFilter, 500));
        document.getElementById('max-price').addEventListener('input', Utils.debounce(applyPriceFilter, 500));
    }, 100);
};

// Mantener todas las funciones originales...
function handleCategoryFilter(checkbox) {
    if (checkbox.checked) {
        AppState.currentFilters.category = checkbox.value;
    } else {
        AppState.currentFilters.category = null;
    }
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || null;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || null;
    
    AppState.currentFilters.minPrice = minPrice;
    AppState.currentFilters.maxPrice = maxPrice;
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function clearAllFilters() {
    SearchManager.clearFilters();
    
    // Limpiar campos del formulario
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-select').value = 'latest';
    
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function handleSortChange(select) {
    AppState.currentFilters.sort = select.value;
    const products = SearchManager.applyFilters();
    UIRenderer.renderProductGrid(products);
}

function changeMainImage(src) {
    document.getElementById('main-image').src = src;
    
    // Actualizar bordes de las miniaturas
    const thumbnails = document.querySelectorAll('[onclick^="changeMainImage"]');
    thumbnails.forEach(thumb => {
        thumb.style.borderColor = thumb.onclick.toString().includes(src) ? 'var(--rose-500)' : 'transparent';
    });
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    if (AuthManager.login(email, password)) {
        navigateTo('dashboard');
    } else {
        Utils.showNotification('Credenciales incorrectas', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    if (AuthManager.register(name, email, password)) {
        navigateTo('dashboard');
    } else {
        Utils.showNotification('Error al crear la cuenta', 'error');
    }
}

function handleCheckout(event) {
    event.preventDefault();
    
    // Simular procesamiento de pago
    Utils.showNotification('Procesando pago...', 'success');
    
    setTimeout(() => {
        // Simular éxito del pago
        CartManager.clearCart();
        Utils.showNotification('¡Compra realizada con éxito! Revisa tu email para las descargas.', 'success');
        navigateTo('home');
    }, 2000);
}

// =============================================================================
// PÁGINAS DE ADMINISTRACIÓN
// =============================================================================

Router.renderAdminDashboardPage = function() {
    // Verificar si es administrador
    if (!AppState.user || !AppState.user.isAdmin) {
        this.renderNotFoundPage();
        Utils.showNotification('Acceso denegado - Solo administradores', 'error');
        return;
    }

    const mainContent = document.querySelector('.main-content');
    const totalProducts = PRODUCTS.length;
    const totalCategories = CATEGORIES.filter(cat => cat.isActive).length;
    const totalUsers = 1247; // Simulado
    const monthlyRevenue = 15640; // Simulado

    mainContent.innerHTML = `
        <div class="page-container section">
            <div class="admin-header" style="background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); color: white; padding: 2rem; border-radius: 1rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        🛡️
                    </div>
                    <div>
                        <h1 style="margin: 0; font-size: 2rem;">Panel de Administración</h1>
                        <p style="margin: 0; opacity: 0.9;">Bienvenido, ${AppState.user.name}</p>
                    </div>
                </div>
            </div>

            <!-- Estadísticas Principales -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                <div class="admin-stat-card" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 3rem; color: var(--rose-500); margin-bottom: 1rem;">📦</div>
                    <h3 style="font-size: 2rem; color: var(--rose-500); margin-bottom: 0.5rem;">${totalProducts}</h3>
                    <p style="color: var(--earth-600); margin: 0;">Productos Totales</p>
                </div>
                <div class="admin-stat-card" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 3rem; color: var(--sage-500); margin-bottom: 1rem;">🗂️</div>
                    <h3 style="font-size: 2rem; color: var(--sage-500); margin-bottom: 0.5rem;">${totalCategories}</h3>
                    <p style="color: var(--earth-600); margin: 0;">Categorías Activas</p>
                </div>
                <div class="admin-stat-card" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 3rem; color: var(--lavender-500); margin-bottom: 1rem;">👥</div>
                    <h3 style="font-size: 2rem; color: var(--lavender-500); margin-bottom: 0.5rem;">${totalUsers}</h3>
                    <p style="color: var(--earth-600); margin: 0;">Usuarios Registrados</p>
                </div>
                <div class="admin-stat-card" style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 3rem; color: var(--gold-500); margin-bottom: 1rem;">💰</div>
                    <h3 style="font-size: 2rem; color: var(--gold-500); margin-bottom: 0.5rem;">$${monthlyRevenue.toLocaleString()}</h3>
                    <p style="color: var(--earth-600); margin: 0;">Ingresos del Mes</p>
                </div>
            </div>

            <!-- Acciones Rápidas -->
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); margin-bottom: 2rem;">
                <h2 style="margin-bottom: 2rem; color: var(--earth-800);">Acciones Rápidas</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <button onclick="navigateTo('admin-products')" class="btn btn-primary" style="padding: 1rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Gestionar Productos
                    </button>
                    <button onclick="navigateTo('admin-users')" class="btn btn-secondary" style="padding: 1rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.001 3.001 0 0 0 18 7h-4c-1.11 0-2 .89-2 2v7h2l2 6z"/>
                        </svg>
                        Gestionar Usuarios
                    </button>
                    <button onclick="navigateTo('admin-analytics')" class="btn btn-outline" style="padding: 1rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
                        </svg>
                        Ver Analytics
                    </button>
                    <button onclick="navigateTo('catalog')" class="btn btn-outline" style="padding: 1rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        Ver Tienda
                    </button>
                </div>
            </div>

            <!-- Actividad Reciente -->
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                <h2 style="margin-bottom: 2rem; color: var(--earth-800);">Actividad Reciente</h2>
                <div style="space-y: 1rem;">
                    <div style="padding: 1rem; border-left: 4px solid var(--rose-500); background: var(--rose-50); margin-bottom: 1rem;">
                        <strong>Nueva venta:</strong> Mandala Bohemio Serenidad - $12.99
                        <div style="font-size: 0.875rem; color: var(--earth-600); margin-top: 0.25rem;">Hace 2 horas</div>
                    </div>
                    <div style="padding: 1rem; border-left: 4px solid var(--sage-500); background: var(--sage-50); margin-bottom: 1rem;">
                        <strong>Nuevo usuario registrado:</strong> maria.rodriguez@email.com
                        <div style="font-size: 0.875rem; color: var(--earth-600); margin-top: 0.25rem;">Hace 4 horas</div>
                    </div>
                    <div style="padding: 1rem; border-left: 4px solid var(--lavender-500); background: var(--lavender-50); margin-bottom: 1rem;">
                        <strong>Producto más vendido:</strong> Luna Boho Vintage
                        <div style="font-size: 0.875rem; color: var(--earth-600); margin-top: 0.25rem;">23 ventas esta semana</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

Router.renderAdminProductsPage = function() {
    if (!AppState.user || !AppState.user.isAdmin) {
        this.renderNotFoundPage();
        return;
    }

    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-container section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: var(--earth-800);">Gestión de Productos</h1>
                <button class="btn btn-primary" onclick="openAddProductModal()">
                    ➕ Nuevo Producto
                </button>
            </div>

            <!-- Filtros de admin -->
            <div style="background: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-soft);">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Buscar Producto</label>
                        <input type="text" placeholder="Nombre del producto..." style="width: 100%; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Categoría</label>
                        <select style="width: 100%; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;">
                            <option value="">Todas las categorías</option>
                            ${CATEGORIES.map(cat => `<option value="${cat.slug}">${cat.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Estado</label>
                        <select style="width: 100%; padding: 0.5rem; border: 1px solid var(--cream-300); border-radius: 0.5rem;">
                            <option value="">Todos</option>
                            <option value="active">Activos</option>
                            <option value="inactive">Inactivos</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary">Filtrar</button>
                </div>
            </div>

            <!-- Tabla de productos -->
            <div style="background: white; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-soft);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--earth-100);">
                        <tr>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Producto</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Categoría</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Precio</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Ventas</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Estado</th>
                            <th style="padding: 1rem; text-align: center; font-weight: 600;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${PRODUCTS.slice(0, 10).map(product => {
                            const category = CATEGORIES.find(cat => cat.id === product.categoryId);
                            const sales = Math.floor(Math.random() * 100) + 10;
                            return `
                                <tr style="border-bottom: 1px solid var(--cream-200);">
                                    <td style="padding: 1rem;">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.5rem;">
                                            <div>
                                                <div style="font-weight: 500;">${product.name}</div>
                                                <div style="font-size: 0.875rem; color: var(--earth-600);">ID: ${product.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="padding: 1rem;">${category ? category.name : 'Sin categoría'}</td>
                                    <td style="padding: 1rem; font-weight: 600; color: var(--rose-500);">$${product.price}</td>
                                    <td style="padding: 1rem;">${sales} ventas</td>
                                    <td style="padding: 1rem;">
                                        <span style="padding: 0.25rem 0.75rem; background: ${product.isActive ? 'var(--sage-100)' : 'var(--earth-100)'}; color: ${product.isActive ? 'var(--sage-800)' : 'var(--earth-600)'}; border-radius: 1rem; font-size: 0.75rem; font-weight: 500;">
                                            ${product.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td style="padding: 1rem; text-align: center;">
                                        <button onclick="editProduct(${product.id})" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: var(--lavender-100); color: var(--lavender-800); border: none; border-radius: 0.25rem; cursor: pointer;">
                                            ✏️ Editar
                                        </button>
                                        <button onclick="deleteProduct(${product.id})" style="padding: 0.25rem 0.5rem; background: var(--rose-100); color: var(--rose-800); border: none; border-radius: 0.25rem; cursor: pointer;">
                                            🗑️ Eliminar
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--earth-600);">Mostrando 10 de ${PRODUCTS.length} productos</p>
            </div>
        </div>
    `;
};

Router.renderAdminUsersPage = function() {
    if (!AppState.user || !AppState.user.isAdmin) {
        this.renderNotFoundPage();
        return;
    }

    const mainContent = document.querySelector('.main-content');
    // Simular datos de usuarios
    const mockUsers = [
        { id: 1, name: 'María García', email: 'maria.garcia@email.com', joinDate: '2024-01-15', orders: 5, status: 'active' },
        { id: 2, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', joinDate: '2024-02-03', orders: 12, status: 'active' },
        { id: 3, name: 'Ana López', email: 'ana.lopez@email.com', joinDate: '2024-01-28', orders: 3, status: 'inactive' },
        { id: 4, name: 'Luis Martínez', email: 'luis.martinez@email.com', joinDate: '2024-03-10', orders: 8, status: 'active' },
        { id: 5, name: 'Sofia Hernández', email: 'sofia.hernandez@email.com', joinDate: '2024-02-20', orders: 15, status: 'active' }
    ];

    mainContent.innerHTML = `
        <div class="page-container section">
            <h1 style="margin-bottom: 2rem; color: var(--earth-800);">Gestión de Usuarios</h1>

            <!-- Estadísticas de usuarios -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 2rem; color: var(--sage-500); margin-bottom: 0.5rem;">👥</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--sage-500);">1,247</div>
                    <div style="color: var(--earth-600); font-size: 0.9rem;">Total Usuarios</div>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 2rem; color: var(--rose-500); margin-bottom: 0.5rem;">✅</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--rose-500);">1,156</div>
                    <div style="color: var(--earth-600); font-size: 0.9rem;">Usuarios Activos</div>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 2rem; color: var(--lavender-500); margin-bottom: 0.5rem;">🆕</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--lavender-500);">42</div>
                    <div style="color: var(--earth-600); font-size: 0.9rem;">Nuevos (30 días)</div>
                </div>
                <div style="background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: var(--shadow-soft); text-align: center;">
                    <div style="font-size: 2rem; color: var(--gold-500); margin-bottom: 0.5rem;">⭐</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--gold-500);">234</div>
                    <div style="color: var(--earth-600); font-size: 0.9rem;">Clientes VIP</div>
                </div>
            </div>

            <!-- Tabla de usuarios -->
            <div style="background: white; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-soft);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--earth-100);">
                        <tr>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Usuario</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Email</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Fecha Registro</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Pedidos</th>
                            <th style="padding: 1rem; text-align: left; font-weight: 600;">Estado</th>
                            <th style="padding: 1rem; text-align: center; font-weight: 600;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockUsers.map(user => `
                            <tr style="border-bottom: 1px solid var(--cream-200);">
                                <td style="padding: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <div style="width: 40px; height: 40px; background: var(--sage-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--sage-800);">
                                            ${user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style="font-weight: 500;">${user.name}</div>
                                            <div style="font-size: 0.875rem; color: var(--earth-600);">ID: ${user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 1rem;">${user.email}</td>
                                <td style="padding: 1rem;">${new Date(user.joinDate).toLocaleDateString('es-ES')}</td>
                                <td style="padding: 1rem; font-weight: 600;">${user.orders} pedidos</td>
                                <td style="padding: 1rem;">
                                    <span style="padding: 0.25rem 0.75rem; background: ${user.status === 'active' ? 'var(--sage-100)' : 'var(--earth-100)'}; color: ${user.status === 'active' ? 'var(--sage-800)' : 'var(--earth-600)'}; border-radius: 1rem; font-size: 0.75rem; font-weight: 500;">
                                        ${user.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style="padding: 1rem; text-align: center;">
                                    <button onclick="viewUserDetails(${user.id})" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: var(--lavender-100); color: var(--lavender-800); border: none; border-radius: 0.25rem; cursor: pointer;">
                                        👁️ Ver
                                    </button>
                                    <button onclick="editUser(${user.id})" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: var(--sage-100); color: var(--sage-800); border: none; border-radius: 0.25rem; cursor: pointer;">
                                        ✏️ Editar
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

Router.renderAdminAnalyticsPage = function() {
    if (!AppState.user || !AppState.user.isAdmin) {
        this.renderNotFoundPage();
        return;
    }

    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="page-container section">
            <h1 style="margin-bottom: 2rem; color: var(--earth-800);">Estadísticas y Analytics</h1>

            <!-- Métricas principales -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                <div style="background: linear-gradient(135deg, var(--rose-500) 0%, var(--rose-600) 100%); color: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Ingresos Totales</div>
                            <div style="font-size: 2.5rem; font-weight: 700;">$23,450</div>
                        </div>
                        <div style="font-size: 2rem;">💰</div>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">+12% vs mes anterior</div>
                </div>

                <div style="background: linear-gradient(135deg, var(--sage-500) 0%, var(--sage-600) 100%); color: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Ventas Totales</div>
                            <div style="font-size: 2.5rem; font-weight: 700;">1,847</div>
                        </div>
                        <div style="font-size: 2rem;">📦</div>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">+8% vs mes anterior</div>
                </div>

                <div style="background: linear-gradient(135deg, var(--lavender-500) 0%, var(--lavender-600) 100%); color: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Visitantes Únicos</div>
                            <div style="font-size: 2.5rem; font-weight: 700;">12,460</div>
                        </div>
                        <div style="font-size: 2rem;">👥</div>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">+15% vs mes anterior</div>
                </div>

                <div style="background: linear-gradient(135deg, var(--gold-500) 0%, var(--gold-600) 100%); color: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Tasa Conversión</div>
                            <div style="font-size: 2.5rem; font-weight: 700;">3.2%</div>
                        </div>
                        <div style="font-size: 2rem;">📈</div>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">+0.5% vs mes anterior</div>
                </div>
            </div>

            <!-- Productos más vendidos -->
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft); margin-bottom: 2rem;">
                <h2 style="margin-bottom: 2rem; color: var(--earth-800);">🏆 Productos Más Vendidos</h2>
                <div style="space-y: 1rem;">
                    ${PRODUCTS.slice(0, 5).map((product, index) => {
                        const sales = Math.floor(Math.random() * 200) + 50;
                        return `
                            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--cream-50); border-radius: 0.5rem; margin-bottom: 1rem;">
                                <div style="width: 30px; height: 30px; background: var(--rose-500); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem;">
                                    ${index + 1}
                                </div>
                                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.5rem;">
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--earth-800);">${product.name}</div>
                                    <div style="font-size: 0.9rem; color: var(--earth-600);">${sales} ventas • $${(product.price * sales).toLocaleString()} ingresos</div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-weight: 700; color: var(--rose-500);">$${product.price}</div>
                                    <div style="font-size: 0.8rem; color: var(--earth-600);">por unidad</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Categorías performance -->
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: var(--shadow-soft);">
                <h2 style="margin-bottom: 2rem; color: var(--earth-800);">📊 Performance por Categorías</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                    ${CATEGORIES.map(category => {
                        const categoryProducts = PRODUCTS.filter(p => p.categoryId === category.id);
                        const totalSales = Math.floor(Math.random() * 500) + 100;
                        const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length || 0;
                        
                        return `
                            <div style="padding: 1.5rem; border: 1px solid var(--cream-200); border-radius: 0.5rem;">
                                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                    <div style="font-size: 1.5rem;">${category.icon}</div>
                                    <div>
                                        <div style="font-weight: 600; color: var(--earth-800);">${category.name}</div>
                                        <div style="font-size: 0.8rem; color: var(--earth-600);">${categoryProducts.length} productos</div>
                                    </div>
                                </div>
                                <div style="margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.25rem;">
                                        <span>Ventas</span>
                                        <span style="font-weight: 600;">${totalSales}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                                        <span>Precio Prom.</span>
                                        <span style="font-weight: 600; color: var(--rose-500);">$${avgPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div style="width: 100%; height: 0.5rem; background: var(--cream-200); border-radius: 0.25rem; overflow: hidden;">
                                    <div style="width: ${Math.min((totalSales / 500) * 100, 100)}%; height: 100%; background: var(--${category.color}-500);"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};

// Funciones auxiliares para las páginas de admin
function openAddProductModal() {
    Utils.showNotification('Modal de agregar producto - Funcionalidad por implementar', 'info');
}

function editProduct(productId) {
    Utils.showNotification(`Editando producto ID: ${productId}`, 'info');
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        Utils.showNotification(`Producto ID: ${productId} eliminado`, 'success');
    }
}

function viewUserDetails(userId) {
    Utils.showNotification(`Viendo detalles del usuario ID: ${userId}`, 'info');
}

function editUser(userId) {
    Utils.showNotification(`Editando usuario ID: ${userId}`, 'info');
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de navegación con historial del navegador
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            Router.navigate(event.state.page, event.state.param);
        } else {
            Router.navigate('home');
        }
    });
    
    // Navegación inicial
    const hash = window.location.hash.slice(1);
    if (hash) {
        const [page, param] = hash.split('/');
        Router.navigate(page, param);
    } else {
        Router.navigate('home');
    }
    
    // Ocultar loading inicial
    setTimeout(() => {
        const initialLoading = document.getElementById('initial-loading');
        if (initialLoading) {
            initialLoading.style.opacity = '0';
            setTimeout(() => initialLoading.remove(), 300);
        }
    }, 1000);
}); 