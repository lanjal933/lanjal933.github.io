/**
 * ===================================
 * VetGestión - Store de Configuraciones
 * Manejo de configuraciones y preferencias del usuario
 * ===================================
 */

class SettingsStore {
    constructor() {
        this.darkMode = false;
        this.language = 'es';
        this.primaryColor = 'green';
        this.notifications = {
            appointments: true,
            treatments: true,
            reminders: true,
            marketing: false
        };
        this.appearance = {
            sidebarCollapsed: false,
            animationsEnabled: true,
            compactMode: false
        };
        
        this.initialize();
    }

    /**
     * Inicialización del store
     */
    initialize() {
        Logger.info('Inicializando SettingsStore');
        
        // Cargar configuraciones guardadas
        this.loadSettings();
        
        // Aplicar configuraciones
        this.applySettings();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        Logger.success('SettingsStore inicializado');
    }

    /**
     * Carga configuraciones desde localStorage
     */
    loadSettings() {
        const savedSettings = persistenceStore.loadSettings();
        
        if (savedSettings) {
            this.darkMode = savedSettings.darkMode || false;
            this.language = savedSettings.language || 'es';
            this.primaryColor = savedSettings.theme || 'green';
            this.notifications = { ...this.notifications, ...savedSettings.notifications };
            this.appearance = { ...this.appearance, ...savedSettings.appearance };
        }
        
        // Detectar preferencia del sistema para modo oscuro
        if (!savedSettings || savedSettings.darkMode === undefined) {
            this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        Logger.info('Configuraciones cargadas', this.getSettings());
    }

    /**
     * Guarda configuraciones en localStorage
     */
    saveSettings() {
        const settings = this.getSettings();
        persistenceStore.saveSettings(settings);
        Logger.info('Configuraciones guardadas');
        EventUtils.dispatch('settings:saved', { settings });
    }

    /**
     * Aplica todas las configuraciones actuales
     */
    applySettings() {
        this.applyTheme();
        this.applyPrimaryColor();
        this.applyLanguage();
        Logger.info('Configuraciones aplicadas');
    }

    /**
     * === MODO OSCURO ===
     */

    /**
     * Alterna el modo oscuro
     */
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.applyTheme();
        this.saveSettings();
        
        Logger.info(`Modo oscuro ${this.darkMode ? 'activado' : 'desactivado'}`);
        EventUtils.dispatch('settings:dark-mode-changed', { darkMode: this.darkMode });
    }

    /**
     * Establece el modo oscuro
     */
    setDarkMode(enabled) {
        this.darkMode = enabled;
        this.applyTheme();
        this.saveSettings();
        
        Logger.info(`Modo oscuro ${enabled ? 'activado' : 'desactivado'}`);
        EventUtils.dispatch('settings:dark-mode-changed', { darkMode: this.darkMode });
    }

    /**
     * Aplica el tema actual
     */
    applyTheme() {
        const body = document.body;
        const html = document.documentElement;
        
        if (this.darkMode) {
            DOMUtils.addClass(body, 'dark');
            DOMUtils.addClass(html, 'dark');
            html.setAttribute('data-theme', 'dark');
        } else {
            DOMUtils.removeClass(body, 'dark');
            DOMUtils.removeClass(html, 'dark');
            html.setAttribute('data-theme', 'light');
        }
        
        // Actualizar icono del botón de tema
        this.updateThemeIcon();
    }

    /**
     * Actualiza el icono del botón de tema
     */
    updateThemeIcon() {
        const themeIcon = DOMUtils.$('theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.darkMode ? '☀️' : '🌙';
        }
    }

    /**
     * === COLOR PRIMARIO ===
     */

    /**
     * Establece el color primario
     */
    setPrimaryColor(color) {
        this.primaryColor = color;
        this.applyPrimaryColor();
        this.saveSettings();
        
        Logger.info(`Color primario cambiado a: ${color}`);
        EventUtils.dispatch('settings:primary-color-changed', { color });
    }

    /**
     * Aplica el color primario
     */
    applyPrimaryColor() {
        document.documentElement.setAttribute('data-primary', this.primaryColor);
    }

    /**
     * === IDIOMA ===
     */

    /**
     * Establece el idioma
     */
    setLanguage(lang) {
        this.language = lang;
        this.applyLanguage();
        this.saveSettings();
        
        Logger.info(`Idioma cambiado a: ${lang}`);
        EventUtils.dispatch('settings:language-changed', { language: lang });
    }

    /**
     * Aplica el idioma actual
     */
    applyLanguage() {
        document.documentElement.setAttribute('lang', this.language);
    }

    /**
     * === NOTIFICACIONES ===
     */

    /**
     * Actualiza configuración de notificaciones
     */
    updateNotificationSettings(type, enabled) {
        if (this.notifications.hasOwnProperty(type)) {
            this.notifications[type] = enabled;
            this.saveSettings();
            
            Logger.info(`Notificaciones ${type}: ${enabled ? 'activadas' : 'desactivadas'}`);
            EventUtils.dispatch('settings:notifications-changed', { 
                type, 
                enabled, 
                notifications: this.notifications 
            });
        }
    }

    /**
     * === APARIENCIA ===
     */

    /**
     * Actualiza configuración de apariencia
     */
    updateAppearanceSettings(setting, value) {
        if (this.appearance.hasOwnProperty(setting)) {
            this.appearance[setting] = value;
            this.saveSettings();
            
            Logger.info(`Apariencia ${setting}: ${value}`);
            EventUtils.dispatch('settings:appearance-changed', { 
                setting, 
                value, 
                appearance: this.appearance 
            });
        }
    }

    /**
     * === UTILIDADES ===
     */

    /**
     * Obtiene todas las configuraciones
     */
    getSettings() {
        return {
            darkMode: this.darkMode,
            language: this.language,
            theme: this.primaryColor,
            notifications: { ...this.notifications },
            appearance: { ...this.appearance }
        };
    }

    /**
     * Resetea configuraciones a valores por defecto
     */
    resetToDefaults() {
        this.darkMode = false;
        this.language = 'es';
        this.primaryColor = 'green';
        this.notifications = {
            appointments: true,
            treatments: true,
            reminders: true,
            marketing: false
        };
        this.appearance = {
            sidebarCollapsed: false,
            animationsEnabled: true,
            compactMode: false
        };
        
        this.applySettings();
        this.saveSettings();
        
        Logger.info('Configuraciones reseteadas a valores por defecto');
        EventUtils.dispatch('settings:reset');
    }

    /**
     * === EVENTOS ===
     */

    setupEventListeners() {
        // Escuchar cambios en la preferencia del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Solo aplicar si no hay configuración manual guardada
            const savedSettings = persistenceStore.loadSettings();
            if (!savedSettings || savedSettings.darkMode === undefined) {
                this.setDarkMode(e.matches);
            }
        });

        // Configurar botón de modo oscuro
        const darkModeToggle = DOMUtils.$('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    /**
     * === PROPIEDADES CALCULADAS ===
     */

    get isDarkMode() {
        return this.darkMode;
    }

    get currentLanguage() {
        const languages = {
            'es': 'Español',
            'en': 'English',
            'fr': 'Français'
        };
        return languages[this.language] || 'Español';
    }

    get notificationCount() {
        return Object.values(this.notifications).filter(Boolean).length;
    }

    get themeClass() {
        return this.darkMode ? 'dark' : 'light';
    }

    get primaryColorClass() {
        return `theme-${this.primaryColor}`;
    }

    /**
     * === MÉTODOS DE IMPORTACIÓN/EXPORTACIÓN ===
     */

    /**
     * Exporta configuraciones
     */
    exportSettings() {
        const settings = this.getSettings();
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'vetgestion-settings.json';
        link.click();
        
        Logger.success('Configuraciones exportadas');
    }

    /**
     * Importa configuraciones
     */
    importSettings(settingsData) {
        try {
            const settings = typeof settingsData === 'string' 
                ? JSON.parse(settingsData) 
                : settingsData;
            
            if (settings.darkMode !== undefined) this.darkMode = settings.darkMode;
            if (settings.language) this.language = settings.language;
            if (settings.theme) this.primaryColor = settings.theme;
            if (settings.notifications) this.notifications = { ...this.notifications, ...settings.notifications };
            if (settings.appearance) this.appearance = { ...this.appearance, ...settings.appearance };
            
            this.applySettings();
            this.saveSettings();
            
            Logger.success('Configuraciones importadas correctamente');
            EventUtils.dispatch('settings:imported', { settings });
            
            return true;
        } catch (error) {
            Logger.error('Error importando configuraciones', error);
            return false;
        }
    }
}

// Crear instancia global
window.SettingsStore = new SettingsStore();
window.settingsStore = window.SettingsStore; 