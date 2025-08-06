/**
 * EstudioPixelArte - Aplicación Principal JavaScript
 * E-commerce de Arte Digital Bohemio - HTML5 Version
 */

// Estado global de la aplicación
const AppState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    currentPage: 'home',
    currentFilters: {
        category: null,
        minPrice: null,
        maxPrice: null,
        search: '',
        sort: 'latest'
    }
};

// Utilidades generales
const Utils = {
    // Formatear número como precio
    formatPrice(price) {
        return `$${price.toFixed(2)}`;
    },

    // Generar slug desde texto
    generateSlug(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'var(--sage-100)' : 'var(--rose-100)'};
            color: ${type === 'success' ? 'var(--sage-700)' : 'var(--rose-700)'};
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="background: ${type === 'success' ? 'var(--sage-500)' : 'var(--rose-500)'}; color: white; width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                    ${type === 'success' ? '✓' : '!'}
                </div>
                <div>${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    // Debounce para búsquedas
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Gestor del carrito de compras
const CartManager = {
    // Agregar producto al carrito
    addToCart(productId, quantity = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
            Utils.showNotification('Producto no encontrado', 'error');
            return false;
        }

        const existingItem = AppState.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            AppState.cart.push({
                productId: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartUI();
        Utils.showNotification(`${product.name} agregado al carrito`);
        return true;
    },

    // Remover producto del carrito
    removeFromCart(productId) {
        AppState.cart = AppState.cart.filter(item => item.productId !== productId);
        this.saveCart();
        this.updateCartUI();
        Utils.showNotification('Producto eliminado del carrito');
    },

    // Actualizar cantidad en el carrito
    updateQuantity(productId, quantity) {
        const item = AppState.cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    },

    // Limpiar carrito
    clearCart() {
        AppState.cart = [];
        this.saveCart();
        this.updateCartUI();
        Utils.showNotification('Carrito vaciado');
    },

    // Obtener productos del carrito con detalles
    getCartItems() {
        return AppState.cart.map(cartItem => {
            const product = PRODUCTS.find(p => p.id === cartItem.productId);
            return {
                ...cartItem,
                product: product,
                total: product ? product.price * cartItem.quantity : 0
            };
        }).filter(item => item.product);
    },

    // Calcular total del carrito
    getCartTotal() {
        return this.getCartItems().reduce((total, item) => total + item.total, 0);
    },

    // Obtener cantidad total de productos
    getCartCount() {
        return AppState.cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(AppState.cart));
    },

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();
        
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });

        // Actualizar página del carrito si está activa
        if (AppState.currentPage === 'cart') {
            this.renderCartPage();
        }
    }
};

// Gestor de autenticación simulada
const AuthManager = {
    // Credenciales de administrador
    adminCredentials: {
        email: 'benjaminroccoherrera@gmail.com',
        password: 'BenjaMarcePau',
        name: 'Rocco Benjamin Herrera'
    },

    // Iniciar sesión simulada
    login(email, password) {
        // Verificar credenciales de administrador
        if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
            const adminUser = {
                id: 1,
                name: this.adminCredentials.name,
                email: email,
                isAdmin: true,
                role: 'Administrador',
                loginAt: new Date().toISOString(),
                joinDate: '2024-01-01T00:00:00.000Z',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(this.adminCredentials.name)}&background=2d5a27&color=fff&size=200`
            };
            
            AppState.user = adminUser;
            localStorage.setItem('user', JSON.stringify(adminUser));
            this.updateAuthUI();
            Utils.showNotification(`🎉 ¡Bienvenido Administrador ${adminUser.name}!`, 'success');
            return true;
        }
        
        // Simulación de login para usuarios normales
        if (email && password) {
            const user = {
                id: Math.floor(Math.random() * 1000) + 2,
                name: email.split('@')[0],
                email: email,
                isAdmin: false,
                role: 'Usuario',
                loginAt: new Date().toISOString(),
                joinDate: new Date().toISOString(),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=d86b94&color=fff&size=200`
            };
            
            AppState.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateAuthUI();
            Utils.showNotification(`¡Bienvenido, ${user.name}!`);
            return true;
        }
        return false;
    },

    // Registrarse simulado
    register(name, email, password) {
        // Simulación de registro
        if (name && email && password) {
            const user = {
                id: Date.now(),
                name: name,
                email: email,
                registeredAt: new Date().toISOString()
            };
            
            AppState.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateAuthUI();
            Utils.showNotification(`¡Cuenta creada exitosamente! Bienvenido, ${user.name}!`);
            return true;
        }
        return false;
    },

    // Cerrar sesión
    logout() {
        AppState.user = null;
        localStorage.removeItem('user');
        this.updateAuthUI();
        Utils.showNotification('Sesión cerrada');
    },

    // Verificar si está logueado
    isLoggedIn() {
        return AppState.user !== null;
    },

    // Actualizar UI de autenticación mejorada
    updateAuthUI() {
        const authContainer = document.getElementById('auth-container');
        const authDropdown = document.getElementById('auth-dropdown');
        
        if (!authContainer || !authDropdown) return;

        if (this.isLoggedIn()) {
            // Usuario logueado - mostrar menú de usuario
            const authButton = authContainer.querySelector('.auth-button');
            if (authButton) {
                authButton.innerHTML = `
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>${AppState.user.name}</span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
            }

            // Mostrar menú diferente para administradores
            if (AppState.user.isAdmin) {
                authDropdown.innerHTML = `
                    <div style="padding: 0.75rem 1rem; background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%); color: white; font-weight: 600; border-radius: 0.5rem 0.5rem 0 0;">
                        🛡️ Panel de Administrador
                    </div>
                    <a href="#" class="dropdown-item" onclick="navigateTo('admin-dashboard')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Dashboard Admin
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('admin-products')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Gestión de Productos
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('admin-users')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.001 3.001 0 0 0 18 7h-4c-1.11 0-2 .89-2 2v7h2l2 6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v6h1.5v7h5z"/>
                        </svg>
                        Gestión de Usuarios
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('admin-analytics')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
                        </svg>
                        Estadísticas y Analytics
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item" onclick="navigateTo('dashboard')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        Mi Perfil Personal
                    </a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" onclick="AuthManager.logout()" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Cerrar Sesión
                    </button>
                `;
            } else {
                // Menú regular para usuarios normales
                authDropdown.innerHTML = `
                    <a href="#" class="dropdown-item" onclick="navigateTo('dashboard')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        Mi Dashboard
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('orders')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                        Mis Pedidos
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('downloads')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                        </svg>
                        Mis Descargas
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('wishlist')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                        </svg>
                        Lista de Deseos
                    </a>
                    <a href="#" class="dropdown-item" onclick="navigateTo('profile')" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        Mi Perfil
                    </a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" onclick="AuthManager.logout()" role="menuitem">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Cerrar Sesión
                    </button>
                `;
            }
        } else {
            // Usuario no logueado - mostrar opciones de login/registro
            const authButton = authContainer.querySelector('.auth-button');
            if (authButton) {
                authButton.innerHTML = `
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>Mi Cuenta</span>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
            }

            authDropdown.innerHTML = `
                <a href="#" class="dropdown-item" onclick="navigateTo('login')" role="menuitem">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                    </svg>
                    Iniciar Sesión
                </a>
                <a href="#" class="dropdown-item" onclick="navigateTo('register')" role="menuitem">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Crear Cuenta
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" onclick="navigateTo('help')" role="menuitem">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                    Centro de Ayuda
                </a>
            `;
        }
    },

    // Función para cargar estado inicial
    loadUserState() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                AppState.user = JSON.parse(savedUser);
                this.updateAuthUI();
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    }
};

// Gestor de búsqueda y filtros
const SearchManager = {
    // Realizar búsqueda
    search(query = '') {
        AppState.currentFilters.search = query;
        const results = DataUtils.searchProducts(query);
        return this.applyFilters(results);
    },

    // Aplicar filtros
    applyFilters(products = null) {
        let filtered = products || DataUtils.getActiveProducts();
        
        // Filtro por categoría
        if (AppState.currentFilters.category) {
            filtered = DataUtils.getProductsByCategory(AppState.currentFilters.category);
        }
        
        // Filtro por precio
        if (AppState.currentFilters.minPrice || AppState.currentFilters.maxPrice) {
            filtered = DataUtils.filterByPrice(
                filtered, 
                AppState.currentFilters.minPrice, 
                AppState.currentFilters.maxPrice
            );
        }
        
        // Búsqueda por texto
        if (AppState.currentFilters.search) {
            const query = AppState.currentFilters.search.toLowerCase();
            filtered = filtered.filter(product => {
                return product.name.toLowerCase().includes(query) ||
                       product.description.toLowerCase().includes(query) ||
                       product.tags.some(tag => tag.toLowerCase().includes(query));
            });
        }
        
        // Ordenar
        filtered = DataUtils.sortProducts(filtered, AppState.currentFilters.sort);
        
        return filtered;
    },

    // Limpiar filtros
    clearFilters() {
        AppState.currentFilters = {
            category: null,
            minPrice: null,
            maxPrice: null,
            search: '',
            sort: 'latest'
        };
    }
};

// Renderizadores de UI
const UIRenderer = {
    // Renderizar tarjeta de producto
    renderProductCard(product) {
        const discountPercent = DataUtils.getDiscountPercentage(product.originalPrice, product.price);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image" onclick="navigateTo('product', '${product.slug}')">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${discountPercent ? `<div class="product-badge">-${discountPercent}%</div>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.categoryId)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="price-current">${Utils.formatPrice(product.price)}</span>
                        ${product.originalPrice ? `
                            <span class="price-original">${Utils.formatPrice(product.originalPrice)}</span>
                            <span class="price-discount">${discountPercent}% OFF</span>
                        ` : ''}
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" onclick="CartManager.addToCart(${product.id})">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
    },

    // Obtener nombre de categoría por ID
    getCategoryName(categoryId) {
        const category = CATEGORIES.find(cat => cat.id === categoryId);
        return category ? category.name : 'Sin categoría';
    },

    // Renderizar lista de productos
    renderProductGrid(products, containerId = 'products-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products text-center" style="grid-column: 1 / -1; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">🎨</div>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta ajustar los filtros para encontrar lo que buscas.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.renderProductCard(product)).join('');
    },

    // Renderizar filtros de categorías
    renderCategoryFilters() {
        const categories = DataUtils.getActiveCategories();
        return categories.map(category => `
            <label class="filter-checkbox">
                <input type="checkbox" value="${category.slug}" onchange="handleCategoryFilter(this)">
                <span>${category.name}</span>
            </label>
        `).join('');
    }
};

// Funciones de eventos globales (el Router principal está en router.js)
function navigateTo(page, param = null) {
    // Si es categoría en el catálogo
    if (page === 'catalog' && param) {
        AppState.currentFilters.category = param;
    } else {
        SearchManager.clearFilters();
    }
    
    Router.navigate(page, param);
}

function toggleAuthMenu() {
    const dropdown = document.getElementById('auth-dropdown');
    const button = document.querySelector('.auth-button');
    
    if (dropdown && button) {
        dropdown.classList.toggle('show');
        const isExpanded = dropdown.classList.contains('show');
        button.setAttribute('aria-expanded', isExpanded.toString());
    }
}

function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicialización optimizada de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estado del usuario al inicializar
    AuthManager.loadUserState();
    
    // Actualizar UI inicial
    CartManager.updateCartUI();
    AuthManager.updateAuthUI();
    
    // Configurar búsqueda con debounce optimizado
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', Utils.debounce((e) => {
            const query = e.target.value;
            if (AppState.currentPage === 'catalog' && query.length > 2) {
                AppState.currentFilters.search = query;
                const results = SearchManager.applyFilters();
                UIRenderer.renderProductGrid(results);
            }
        }, 400));
    }
    
    // Configurar formulario de búsqueda
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value;
            AppState.currentFilters.search = query;
            navigateTo('catalog');
        });
    }
    
    // Navegar a la página inicial
    Router.navigate('home');
    
    console.log('EstudioPixelArte v2.0 - ¡Carga optimizada completada!');
}); 