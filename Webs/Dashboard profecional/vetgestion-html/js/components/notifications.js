/**
 * ===================================
 * VetGestión - Sistema de Notificaciones
 * Manejo de notificaciones toast y alertas
 * ===================================
 */

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.initialize();
    }

    /**
     * Inicialización del manager
     */
    initialize() {
        this.createContainer();
        Logger.info('NotificationManager inicializado');
    }

    /**
     * Crea el contenedor de notificaciones
     */
    createContainer() {
        this.container = DOMUtils.$('notifications');
        if (!this.container) {
            this.container = DOMUtils.createElement('div', {
                id: 'notifications',
                className: 'fixed top-4 right-4 z-50 space-y-2'
            });
            document.body.appendChild(this.container);
        }
    }

    /**
     * === MÉTODOS PRINCIPALES ===
     */

    /**
     * Muestra una notificación
     */
    show(notification) {
        const config = {
            id: Date.now() + Math.random(),
            type: 'info',
            title: '',
            message: '',
            duration: this.defaultDuration,
            actions: [],
            persistent: false,
            ...notification
        };

        // Limitar número de notificaciones
        if (this.notifications.length >= this.maxNotifications) {
            this.removeOldest();
        }

        // Crear elemento de notificación
        const element = this.createElement(config);
        
        // Agregar al contenedor
        this.container.appendChild(element);
        this.notifications.push({ ...config, element });

        // Mostrar con animación
        setTimeout(() => {
            DOMUtils.addClass(element, 'fade-in');
        }, 10);

        // Auto-remover si no es persistente
        if (!config.persistent && config.duration > 0) {
            setTimeout(() => {
                this.remove(config.id);
            }, config.duration);
        }

        Logger.info('Notificación mostrada', config);
        EventUtils.dispatch('notification:shown', { notification: config });

        return config.id;
    }

    /**
     * Métodos de conveniencia para diferentes tipos
     */
    success(message, title = 'Éxito', options = {}) {
        return this.show({
            type: 'success',
            title,
            message,
            duration: 4000,
            ...options
        });
    }

    error(message, title = 'Error', options = {}) {
        return this.show({
            type: 'error',
            title,
            message,
            duration: 7000,
            ...options
        });
    }

    warning(message, title = 'Advertencia', options = {}) {
        return this.show({
            type: 'warning',
            title,
            message,
            duration: 6000,
            ...options
        });
    }

    info(message, title = 'Información', options = {}) {
        return this.show({
            type: 'info',
            title,
            message,
            duration: 5000,
            ...options
        });
    }

    /**
     * Remueve una notificación por ID
     */
    remove(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            const notification = this.notifications[index];
            
            // Animar salida
            DOMUtils.addClass(notification.element, 'animate-out');
            
            setTimeout(() => {
                if (notification.element.parentNode) {
                    notification.element.parentNode.removeChild(notification.element);
                }
                this.notifications.splice(index, 1);
                
                Logger.info('Notificación removida', { id });
                EventUtils.dispatch('notification:removed', { id });
            }, 300);
            
            return true;
        }
        return false;
    }

    /**
     * Remueve la notificación más antigua
     */
    removeOldest() {
        if (this.notifications.length > 0) {
            const oldest = this.notifications[0];
            this.remove(oldest.id);
        }
    }

    /**
     * Remueve todas las notificaciones
     */
    removeAll() {
        const ids = this.notifications.map(n => n.id);
        ids.forEach(id => this.remove(id));
    }

    /**
     * === CREACIÓN DE ELEMENTOS ===
     */

    /**
     * Crea el elemento HTML de la notificación
     */
    createElement(config) {
        const notification = DOMUtils.createElement('div', {
            className: `notification notification-${config.type}`
        });

        // Header con icono y título
        const header = DOMUtils.createElement('div', {
            className: 'flex items-center justify-between mb-2'
        });

        const headerContent = DOMUtils.createElement('div', {
            className: 'flex items-center'
        });

        // Icono
        const icon = DOMUtils.createElement('span', {
            className: 'mr-2 text-lg',
            textContent: this.getIcon(config.type)
        });

        // Título
        const title = DOMUtils.createElement('h4', {
            className: 'font-semibold text-sm',
            textContent: config.title
        });

        headerContent.appendChild(icon);
        headerContent.appendChild(title);

        // Botón de cerrar
        const closeBtn = DOMUtils.createElement('button', {
            className: 'text-neutral-400 hover:text-neutral-600 ml-2',
            innerHTML: '×',
            style: 'font-size: 20px; line-height: 1;'
        });

        closeBtn.addEventListener('click', () => {
            this.remove(config.id);
        });

        header.appendChild(headerContent);
        header.appendChild(closeBtn);

        // Mensaje
        const message = DOMUtils.createElement('p', {
            className: 'text-sm text-neutral-600 dark:text-neutral-300',
            textContent: config.message
        });

        // Acciones (si las hay)
        let actionsDiv = null;
        if (config.actions && config.actions.length > 0) {
            actionsDiv = DOMUtils.createElement('div', {
                className: 'flex gap-2 mt-3'
            });

            config.actions.forEach(action => {
                const btn = DOMUtils.createElement('button', {
                    className: `btn btn-sm ${action.style || 'btn-secondary'}`,
                    textContent: action.label
                });

                btn.addEventListener('click', () => {
                    if (action.handler) {
                        action.handler();
                    }
                    if (action.autoClose !== false) {
                        this.remove(config.id);
                    }
                });

                actionsDiv.appendChild(btn);
            });
        }

        // Barra de progreso para duración
        let progressBar = null;
        if (!config.persistent && config.duration > 0) {
            progressBar = DOMUtils.createElement('div', {
                className: 'notification-progress'
            });

            const progressFill = DOMUtils.createElement('div', {
                className: 'notification-progress-fill',
                style: `animation: progress-countdown ${config.duration}ms linear`
            });

            progressBar.appendChild(progressFill);
        }

        // Ensamblar notificación
        notification.appendChild(header);
        notification.appendChild(message);
        if (actionsDiv) notification.appendChild(actionsDiv);
        if (progressBar) notification.appendChild(progressBar);

        return notification;
    }

    /**
     * Obtiene el icono para cada tipo de notificación
     */
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * === NOTIFICACIONES ESPECIALES ===
     */

    /**
     * Muestra notificación de confirmación
     */
    confirm(message, title = 'Confirmar', options = {}) {
        return new Promise((resolve) => {
            this.show({
                type: 'warning',
                title,
                message,
                persistent: true,
                actions: [
                    {
                        label: options.cancelText || 'Cancelar',
                        style: 'btn-secondary',
                        handler: () => resolve(false)
                    },
                    {
                        label: options.confirmText || 'Confirmar',
                        style: 'btn-primary',
                        handler: () => resolve(true)
                    }
                ],
                ...options
            });
        });
    }

    /**
     * Muestra notificación de loading
     */
    loading(message, title = 'Cargando...') {
        const id = this.show({
            type: 'info',
            title,
            message,
            persistent: true
        });

        // Agregar spinner
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            const spinner = DOMUtils.createElement('div', {
                className: 'loading-spinner-sm mt-2'
            });
            notification.element.appendChild(spinner);
        }

        return id;
    }

    /**
     * Actualiza una notificación existente
     */
    update(id, updates) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            // Actualizar configuración
            Object.assign(notification, updates);

            // Actualizar elementos
            if (updates.title) {
                const titleEl = notification.element.querySelector('h4');
                if (titleEl) titleEl.textContent = updates.title;
            }

            if (updates.message) {
                const messageEl = notification.element.querySelector('p');
                if (messageEl) messageEl.textContent = updates.message;
            }

            if (updates.type) {
                notification.element.className = `notification notification-${updates.type}`;
            }

            Logger.info('Notificación actualizada', { id, updates });
            return true;
        }
        return false;
    }

    /**
     * === UTILIDADES ===
     */

    /**
     * Obtiene todas las notificaciones activas
     */
    getAll() {
        return [...this.notifications];
    }

    /**
     * Cuenta notificaciones por tipo
     */
    countByType(type) {
        return this.notifications.filter(n => n.type === type).length;
    }

    /**
     * Verifica si hay notificaciones activas
     */
    hasActiveNotifications() {
        return this.notifications.length > 0;
    }
}

// CSS adicional para las notificaciones (se inyecta dinámicamente)
const notificationStyles = `
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification.animate-out {
        animation: slideOutRight 0.3s ease-in;
    }
    
    .notification-progress {
        height: 2px;
        background-color: rgba(255, 255, 255, 0.2);
        margin-top: 8px;
        border-radius: 1px;
        overflow: hidden;
    }
    
    .notification-progress-fill {
        height: 100%;
        background-color: currentColor;
        width: 100%;
        transform-origin: left;
    }
    
    @keyframes progress-countdown {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Inyectar estilos
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = notificationStyles;
    document.head.appendChild(style);
}

// Crear instancia global
window.NotificationManager = new NotificationManager();

// Alias para acceso más fácil
window.notify = {
    success: (message, title, options) => NotificationManager.success(message, title, options),
    error: (message, title, options) => NotificationManager.error(message, title, options),
    warning: (message, title, options) => NotificationManager.warning(message, title, options),
    info: (message, title, options) => NotificationManager.info(message, title, options),
    confirm: (message, title, options) => NotificationManager.confirm(message, title, options),
    loading: (message, title) => NotificationManager.loading(message, title),
    remove: (id) => NotificationManager.remove(id),
    removeAll: () => NotificationManager.removeAll()
}; 