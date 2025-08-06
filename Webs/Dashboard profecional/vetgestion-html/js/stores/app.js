/**
 * ===================================
 * VetGestión - Store de Aplicación
 * Manejo de estado general de la aplicación
 * ===================================
 */

class AppStore {
    constructor() {
        this.isLoading = false;
        this.loadingMessage = '';
        this.pageTitle = 'Dashboard';
        this.breadcrumbs = [];
        this.notifications = [];
        this.sidebarOpen = true;
        this.currentRoute = '/';
        
        // Configuración de la aplicación
        this.config = {
            name: 'VetGestión',
            version: '1.0.0',
            description: 'Sistema administrativo para veterinarias',
            features: {
                darkMode: true,
                notifications: true,
                realTimeUpdates: false
            }
        };

        this.initialize();
    }

    /**
     * Inicialización del store
     */
    initialize() {
        Logger.info('Inicializando AppStore');
        
        // Configurar tiempo actual
        this.startTimeUpdate();
        
        // Escuchar eventos de navegación
        this.setupEventListeners();
        
        Logger.success('AppStore inicializado');
    }

    /**
     * === GESTIÓN DE LOADING ===
     */

    /**
     * Establece el estado de carga
     */
    setLoading(loading, message = '') {
        this.isLoading = loading;
        this.loadingMessage = message;
        
        const loadingScreen = DOMUtils.$('loading-screen');
        if (loadingScreen) {
            if (loading) {
                DOMUtils.show(loadingScreen);
                // Actualizar mensaje si se proporciona
                if (message) {
                    const loadingText = loadingScreen.querySelector('p');
                    if (loadingText) loadingText.textContent = message;
                }
            } else {
                DOMUtils.hide(loadingScreen);
            }
        }
        
        Logger.info(`Loading: ${loading}`, message);
        EventUtils.dispatch('app:loading-changed', { loading, message });
    }

    /**
     * === GESTIÓN DE NAVEGACIÓN ===
     */

    /**
     * Establece el título de la página
     */
    setPageTitle(title) {
        this.pageTitle = title;
        
        // Actualizar título del documento
        document.title = `${title} - ${this.config.name}`;
        
        // Actualizar elemento del título en la UI
        const titleEl = DOMUtils.$('page-title');
        if (titleEl) {
            titleEl.textContent = title;
        }
        
        Logger.info(`Título actualizado: ${title}`);
        EventUtils.dispatch('app:title-changed', { title });
    }

    /**
     * Establece las breadcrumbs
     */
    setBreadcrumbs(crumbs) {
        this.breadcrumbs = crumbs || [];
        this.updateBreadcrumbsUI();
        
        Logger.info('Breadcrumbs actualizados', crumbs);
        EventUtils.dispatch('app:breadcrumbs-changed', { breadcrumbs: this.breadcrumbs });
    }

    /**
     * Actualiza las breadcrumbs en la UI
     */
    updateBreadcrumbsUI() {
        const breadcrumbsEl = DOMUtils.$('breadcrumbs');
        const breadcrumbsListEl = DOMUtils.$('breadcrumbs-list');
        
        if (!breadcrumbsEl || !breadcrumbsListEl) return;

        if (this.breadcrumbs.length === 0) {
            DOMUtils.hide(breadcrumbsEl);
            return;
        }

        // Limpiar breadcrumbs existentes
        DOMUtils.clearContent(breadcrumbsListEl);
        
        // Crear elementos de breadcrumbs
        this.breadcrumbs.forEach((crumb, index) => {
            const li = DOMUtils.createElement('li');
            const isLast = index === this.breadcrumbs.length - 1;
            
            if (isLast) {
                // Último elemento (actual)
                const span = DOMUtils.createElement('span', {
                    className: 'text-neutral-900 dark:text-white font-medium',
                    textContent: crumb.name
                });
                li.appendChild(span);
            } else {
                // Elementos navegables
                const link = DOMUtils.createElement('a', {
                    href: `#${crumb.path}`,
                    className: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
                    textContent: crumb.name
                });
                li.appendChild(link);
                
                // Separador
                const separator = DOMUtils.createElement('span', {
                    textContent: '›',
                    className: 'h-4 w-4 mx-2 text-neutral-400'
                });
                li.appendChild(separator);
            }
            
            breadcrumbsListEl.appendChild(li);
        });
        
        DOMUtils.show(breadcrumbsEl);
    }

    /**
     * === GESTIÓN DE NOTIFICACIONES ===
     */

    /**
     * Agrega una notificación
     */
    addNotification(notification) {
        const newNotification = {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            read: false,
            temporary: true,
            ...notification
        };
        
        this.notifications.unshift(newNotification);
        
        // Mostrar notificación si es temporal
        if (newNotification.temporary) {
            NotificationManager.show(newNotification);
        }
        
        // Auto-remover después de 30 segundos si es temporal
        if (newNotification.temporary) {
            setTimeout(() => {
                this.removeNotification(newNotification.id);
            }, 30000);
        }
        
        Logger.info('Notificación agregada', newNotification);
        EventUtils.dispatch('app:notification-added', { notification: newNotification });
        
        return newNotification.id;
    }

    /**
     * Remueve una notificación
     */
    removeNotification(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            const removed = this.notifications.splice(index, 1)[0];
            Logger.info('Notificación removida', removed);
            EventUtils.dispatch('app:notification-removed', { id });
            return true;
        }
        return false;
    }

    /**
     * Marca una notificación como leída
     */
    markNotificationAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            Logger.info('Notificación marcada como leída', notification);
            EventUtils.dispatch('app:notification-read', { id });
            return true;
        }
        return false;
    }

    /**
     * Obtiene el conteo de notificaciones no leídas
     */
    getUnreadNotificationsCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    /**
     * === GESTIÓN DE SIDEBAR ===
     */

    /**
     * Toggle del sidebar
     */
    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.updateSidebarUI();
        
        Logger.info(`Sidebar ${this.sidebarOpen ? 'abierto' : 'cerrado'}`);
        EventUtils.dispatch('app:sidebar-toggled', { open: this.sidebarOpen });
    }

    /**
     * Establece el estado del sidebar
     */
    setSidebarOpen(open) {
        this.sidebarOpen = open;
        this.updateSidebarUI();
        
        Logger.info(`Sidebar ${open ? 'abierto' : 'cerrado'}`);
        EventUtils.dispatch('app:sidebar-changed', { open });
    }

    /**
     * Actualiza la UI del sidebar
     */
    updateSidebarUI() {
        const sidebar = DOMUtils.$('sidebar');
        if (sidebar) {
            if (this.sidebarOpen) {
                DOMUtils.removeClass(sidebar, 'closed');
                DOMUtils.addClass(sidebar, 'open');
            } else {
                DOMUtils.removeClass(sidebar, 'open');
                DOMUtils.addClass(sidebar, 'closed');
            }
        }
    }

    /**
     * === GESTIÓN DE TIEMPO ===
     */

    /**
     * Inicia la actualización del tiempo
     */
    startTimeUpdate() {
        this.updateCurrentTime();
        this.timeInterval = setInterval(() => {
            this.updateCurrentTime();
        }, 1000);
    }

    /**
     * Actualiza el tiempo actual en la UI
     */
    updateCurrentTime() {
        const timeEl = DOMUtils.$('current-time');
        if (timeEl) {
            timeEl.textContent = DateUtils.getCurrentTime();
        }
    }

    /**
     * Detiene la actualización del tiempo
     */
    stopTimeUpdate() {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        }
    }

    /**
     * === GESTIÓN DE NAVEGACIÓN ===
     */

    /**
     * Actualiza la navegación activa
     */
    updateActiveNavigation(route) {
        this.currentRoute = route;
        
        const navItems = DOMUtils.$$('.nav-item');
        navItems.forEach(item => {
            const itemRoute = item.getAttribute('data-route');
            DOMUtils.removeClass(item, 'active');
            
            if (itemRoute === route || (route !== '/' && itemRoute !== '/' && route.startsWith(itemRoute))) {
                DOMUtils.addClass(item, 'active');
            }
        });
        
        Logger.info(`Navegación activa: ${route}`);
    }

    /**
     * === UTILIDADES GLOBALES ===
     */

    /**
     * Muestra un mensaje de éxito
     */
    showSuccess(message, title = 'Éxito') {
        this.addNotification({
            type: 'success',
            title,
            message,
            duration: 5000
        });
    }

    /**
     * Muestra un mensaje de error
     */
    showError(message, title = 'Error') {
        this.addNotification({
            type: 'error',
            title,
            message,
            duration: 7000,
            temporary: true
        });
    }

    /**
     * Muestra un mensaje de advertencia
     */
    showWarning(message, title = 'Advertencia') {
        this.addNotification({
            type: 'warning',
            title,
            message,
            duration: 6000
        });
    }

    /**
     * Muestra un mensaje informativo
     */
    showInfo(message, title = 'Información') {
        this.addNotification({
            type: 'info',
            title,
            message,
            duration: 5000
        });
    }

    /**
     * === GESTIÓN DE ERRORES ===
     */

    /**
     * Maneja errores globales de la aplicación
     */
    handleError(error, context = 'Aplicación') {
        Logger.error(`Error en ${context}`, error);
        
        let message = 'Ha ocurrido un error inesperado';
        
        if (error.message) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }
        
        this.showError(message, `Error en ${context}`);
        
        // En un entorno de producción, aquí se enviarían los errores a un servicio de logging
        EventUtils.dispatch('app:error', { error, context });
    }

    /**
     * === CONFIGURACIÓN DE EVENTOS ===
     */

    setupEventListeners() {
        // Escuchar cambios de hash para actualizar navegación
        window.addEventListener('hashchange', () => {
            const route = URLUtils.getCurrentHash();
            this.updateActiveNavigation(route);
        });

        // Escuchar errores globales
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'JavaScript');
        });

        // Escuchar errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Promise');
        });

        // Escuchar cambios de conectividad
        window.addEventListener('online', () => {
            this.showSuccess('Conexión a internet restaurada');
        });

        window.addEventListener('offline', () => {
            this.showWarning('Sin conexión a internet');
        });
    }

    /**
     * === MÉTODOS DE LIMPIEZA ===
     */

    /**
     * Limpia recursos del store
     */
    cleanup() {
        this.stopTimeUpdate();
        this.notifications = [];
        Logger.info('AppStore limpiado');
    }

    /**
     * === MÉTODOS PÚBLICOS DE CONVENIENCIA ===
     */

    /**
     * Obtiene información del estado actual
     */
    getState() {
        return {
            isLoading: this.isLoading,
            loadingMessage: this.loadingMessage,
            pageTitle: this.pageTitle,
            breadcrumbs: this.breadcrumbs,
            currentRoute: this.currentRoute,
            sidebarOpen: this.sidebarOpen,
            notificationsCount: this.notifications.length,
            unreadNotificationsCount: this.getUnreadNotificationsCount()
        };
    }

    /**
     * Resetea el estado de la aplicación
     */
    reset() {
        this.isLoading = false;
        this.loadingMessage = '';
        this.pageTitle = 'Dashboard';
        this.breadcrumbs = [];
        this.notifications = [];
        this.currentRoute = '/';
        
        // Actualizar UI
        this.setPageTitle('Dashboard');
        this.setBreadcrumbs([]);
        this.setLoading(false);
        
        Logger.info('Estado de la aplicación reseteado');
        EventUtils.dispatch('app:reset');
    }
}

// Crear instancia global
window.AppStore = new AppStore();
window.appStore = window.AppStore; 