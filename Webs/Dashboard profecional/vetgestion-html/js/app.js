/**
 * ===================================
 * VetGestión - Aplicación Principal
 * Punto de entrada y configuración global
 * ===================================
 */

class VetGestionApp {
    constructor() {
        this.initialized = false;
        this.version = '1.0.0';
    }

    /**
     * Inicialización principal de la aplicación
     */
    async initialize() {
        try {
            Logger.info('🚀 Iniciando VetGestión v' + this.version);
            
            // Mostrar loading inicial
            appStore.setLoading(true, 'Inicializando VetGestión...');
            
            // Simular carga inicial
            await LoadUtils.delay(1000);

            // 1. Verificar y configurar dependencias
            this.checkDependencies();
            
            // 2. Configurar theme inicial
            this.setupTheme();
            
            // 3. Configurar event listeners globales
            this.setupGlobalEventListeners();
            
            // 4. Inicializar componentes
            this.initializeComponents();
            
            // 5. Verificar autenticación inicial
            await this.checkInitialAuth();
            
            // 6. Finalizar inicialización
            this.finishInitialization();
            
            Logger.success('✅ VetGestión inicializado correctamente');
            
        } catch (error) {
            Logger.error('❌ Error inicializando la aplicación', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Verifica que todas las dependencias estén disponibles
     */
    checkDependencies() {
        const requiredGlobals = [
            'DateUtils', 'ValidationUtils', 'FormatUtils', 'DOMUtils',
            'StorageUtils', 'EventUtils', 'URLUtils', 'LoadUtils', 'Logger',
            'persistenceStore', 'authStore', 'appStore', 'settingsStore',
            'NotificationManager', 'router'
        ];

        const missing = requiredGlobals.filter(name => !window[name]);
        
        if (missing.length > 0) {
            throw new Error(`Dependencias faltantes: ${missing.join(', ')}`);
        }
        
        Logger.info('✅ Todas las dependencias están disponibles');
    }

    /**
     * Configura el tema inicial
     */
    setupTheme() {
        // El theme ya se configura automáticamente en SettingsStore
        // Solo verificamos que esté aplicado
        const isDark = settingsStore.isDarkMode;
        Logger.info(`Tema inicial: ${isDark ? 'oscuro' : 'claro'}`);
    }

    /**
     * Configura event listeners globales
     */
    setupGlobalEventListeners() {
        // Logout button
        const logoutBtn = DOMUtils.$('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                authStore.logout();
            });
        }

        // Prevenir navegación accidental
        window.addEventListener('beforeunload', (e) => {
            if (authStore.isAuthenticated()) {
                // En producción se podría agregar lógica para prevenir pérdida de datos
                // e.preventDefault();
                // e.returnValue = '';
            }
        });

        // Manejar cambios de conectividad
        window.addEventListener('online', () => {
            Logger.info('📡 Conexión restaurada');
        });

        window.addEventListener('offline', () => {
            Logger.warn('📡 Sin conexión a internet');
        });

        // Manejar errores globales
        window.addEventListener('error', (event) => {
            Logger.error('Error JavaScript global', {
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno
            });
        });

        // Manejar promesas rechazadas
        window.addEventListener('unhandledrejection', (event) => {
            Logger.error('Promesa no capturada', event.reason);
        });

        Logger.info('✅ Event listeners globales configurados');
    }

    /**
     * Inicializa componentes adicionales
     */
    initializeComponents() {
        // Los componentes principales ya se inicializan automáticamente
        // Aquí se pueden inicializar componentes adicionales
        
        // Configurar tooltips, dropdowns, etc.
        this.setupTooltips();
        this.setupKeyboardShortcuts();
        
        Logger.info('✅ Componentes inicializados');
    }

    /**
     * Configura tooltips básicos
     */
    setupTooltips() {
        // Implementación básica de tooltips
        const elementsWithTooltips = DOMUtils.$$('[title]');
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    /**
     * Configura atajos de teclado
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K para búsqueda rápida
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openQuickSearch();
            }
            
            // Ctrl/Cmd + / para mostrar atajos
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
            
            // Escape para cerrar modales
            if (e.key === 'Escape') {
                this.closeTopModal();
            }
        });
    }

    /**
     * Verifica autenticación inicial
     */
    async checkInitialAuth() {
        Logger.info('🔐 Verificando autenticación inicial...');
        
        if (authStore.token && authStore.user) {
            Logger.info('Usuario ya autenticado:', authStore.user.name);
            
            // Verificar que el token siga siendo válido
            // En una app real, aquí se haría una llamada al servidor
            await LoadUtils.delay(500);
            
            // Si hay usuario, mostrar la aplicación
            if (authStore.isAuthenticated()) {
                DOMUtils.hide('login-view');
                DOMUtils.show('app-layout');
            } else {
                // Token inválido, ir a login
                router.navigate('/login');
            }
        } else {
            // No hay autenticación, ir a login
            Logger.info('Usuario no autenticado, mostrando login');
            router.navigate('/login');
        }
    }

    /**
     * Finaliza la inicialización
     */
    finishInitialization() {
        // Ocultar loading screen
        appStore.setLoading(false);
        
        // Mostrar la aplicación
        DOMUtils.hide('loading-screen');
        DOMUtils.show('app');
        
        // Marcar como inicializado
        this.initialized = true;
        
        // Notificar éxito
        setTimeout(() => {
            notify.success('VetGestión cargado correctamente', 'Bienvenido', {
                duration: 3000
            });
        }, 500);
        
        // Dispatch evento de inicialización completa
        EventUtils.dispatch('app:initialized', {
            version: this.version,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Maneja errores de inicialización
     */
    handleInitializationError(error) {
        Logger.error('Error crítico en inicialización', error);
        
        appStore.setLoading(false);
        
        // Mostrar mensaje de error
        const errorHtml = `
            <div class="min-h-screen flex items-center justify-center bg-red-50">
                <div class="text-center p-8">
                    <div class="text-6xl mb-4">⚠️</div>
                    <h1 class="text-2xl font-bold text-red-900 mb-2">Error de Inicialización</h1>
                    <p class="text-red-700 mb-4">No se pudo cargar VetGestión correctamente</p>
                    <p class="text-red-600 text-sm mb-6">${error.message}</p>
                    <button onclick="window.location.reload()" class="btn-primary">
                        Reintentar
                    </button>
                </div>
            </div>
        `;
        
        document.body.innerHTML = errorHtml;
    }

    /**
     * === MÉTODOS DE UTILIDAD ===
     */

    showTooltip(event) {
        // Implementación básica de tooltip
        const element = event.target;
        const title = element.getAttribute('title');
        
        if (title) {
            element.setAttribute('data-original-title', title);
            element.removeAttribute('title');
            
            // Crear tooltip (implementación simplificada)
            console.log('Tooltip:', title);
        }
    }

    hideTooltip(event) {
        const element = event.target;
        const originalTitle = element.getAttribute('data-original-title');
        
        if (originalTitle) {
            element.setAttribute('title', originalTitle);
            element.removeAttribute('data-original-title');
        }
    }

    openQuickSearch() {
        notify.info('Búsqueda rápida - en desarrollo');
    }

    showKeyboardShortcuts() {
        const shortcuts = [
            'Ctrl/Cmd + K: Búsqueda rápida',
            'Ctrl/Cmd + /: Mostrar atajos',
            'Escape: Cerrar modales'
        ];
        
        notify.info(shortcuts.join('\n'), 'Atajos de Teclado');
    }

    closeTopModal() {
        // Cerrar modal superior si existe
        const modals = DOMUtils.$$('.modal-overlay');
        if (modals.length > 0) {
            const topModal = modals[modals.length - 1];
            const closeBtn = topModal.querySelector('[data-modal-close]') || 
                           topModal.querySelector('.modal-close') ||
                           topModal.querySelector('button');
            if (closeBtn) {
                closeBtn.click();
            }
        }
    }

    /**
     * === MÉTODOS PÚBLICOS ===
     */

    /**
     * Reinicia la aplicación
     */
    restart() {
        Logger.info('🔄 Reiniciando aplicación...');
        window.location.reload();
    }

    /**
     * Obtiene información de la aplicación
     */
    getInfo() {
        return {
            name: 'VetGestión',
            version: this.version,
            initialized: this.initialized,
            user: authStore.user,
            theme: settingsStore.isDarkMode ? 'dark' : 'light',
            route: router.currentRoute,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Exporta datos de la aplicación
     */
    exportData() {
        persistenceStore.exportAllData();
    }

    /**
     * Limpia datos de la aplicación
     */
    async clearData() {
        const confirmed = await notify.confirm(
            '¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.',
            'Confirmar Limpieza'
        );
        
        if (confirmed) {
            persistenceStore.clearAllData();
            authStore.logout();
            notify.success('Todos los datos han sido eliminados');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }
}

/**
 * Función de inicialización global
 */
async function initializeVetGestion() {
    // Crear instancia de la aplicación
    window.vetGestionApp = new VetGestionApp();
    
    // Inicializar
    await vetGestionApp.initialize();
}

/**
 * Inicializar cuando el DOM esté listo
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVetGestion);
} else {
    initializeVetGestion();
}

// Exponer funciones útiles globalmente para debug
window.VetGestion = {
    info: () => vetGestionApp?.getInfo(),
    restart: () => vetGestionApp?.restart(),
    exportData: () => vetGestionApp?.exportData(),
    clearData: () => vetGestionApp?.clearData(),
    version: '1.0.0'
};

Logger.info('🏁 VetGestión App.js cargado'); 