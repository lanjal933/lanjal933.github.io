/**
 * ===================================
 * VetGestión - Store de Autenticación
 * Manejo de usuarios y sesiones
 * ===================================
 */

class AuthStore {
    constructor() {
        this.user = null;
        this.token = null;
        this.isLoading = false;
        this.initialize();
    }

    /**
     * Inicialización del store
     */
    initialize() {
        Logger.info('Inicializando AuthStore');
        
        // Cargar token desde localStorage
        this.token = localStorage.getItem('vetgestion_token');
        
        // Cargar usuario desde localStorage
        this.user = persistenceStore.loadUser();

        // Verificar autenticación si hay token
        if (this.token && this.user) {
            Logger.info('Token y usuario encontrados en localStorage');
            this.checkAuthState();
        }

        Logger.success('AuthStore inicializado');
    }

    /**
     * Verifica el estado de autenticación
     */
    checkAuthState() {
        try {
            // En una app real, aquí se verificaría el token con el servidor
            // Por ahora, solo verificamos que el usuario esté completo
            if (this.user && this.user.email && this.user.name) {
                this.updateUIAfterLogin();
                Logger.success('Estado de autenticación válido');
            } else {
                this.logout();
            }
        } catch (error) {
            Logger.error('Error verificando autenticación', error);
            this.logout();
        }
    }

    /**
     * === MÉTODOS DE AUTENTICACIÓN ===
     */

    /**
     * Iniciar sesión
     */
    async login(credentials) {
        this.isLoading = true;
        this.updateLoginUI(true);

        try {
            Logger.info('Intentando iniciar sesión', { email: credentials.email });

            // Simular delay de red
            await LoadUtils.delay(1500);

            // Simular validación (en app real sería llamada al API)
            const result = this.validateCredentials(credentials);
            
            if (result.success) {
                // Establecer token simulado
                this.token = this.generateToken();
                localStorage.setItem('vetgestion_token', this.token);

                // Establecer usuario
                this.user = result.user;
                persistenceStore.saveUser(this.user);

                // Actualizar UI
                this.updateUIAfterLogin();

                // Mostrar notificación de éxito
                NotificationManager.success(`¡Bienvenido/a ${this.user.name}!`);

                Logger.success('Inicio de sesión exitoso', { user: this.user.name });
                EventUtils.dispatch('auth:login', { user: this.user });

                return { success: true, user: this.user };
            } else {
                this.showLoginError(result.message);
                return { success: false, message: result.message };
            }

        } catch (error) {
            Logger.error('Error en inicio de sesión', error);
            this.showLoginError('Error inesperado al iniciar sesión');
            return { success: false, message: 'Error inesperado' };
        } finally {
            this.isLoading = false;
            this.updateLoginUI(false);
        }
    }

    /**
     * Cerrar sesión
     */
    async logout() {
        try {
            Logger.info('Cerrando sesión');

            // Limpiar datos de autenticación
            this.user = null;
            this.token = null;
            localStorage.removeItem('vetgestion_token');
            persistenceStore.clearUser();

            // Actualizar UI
            this.updateUIAfterLogout();

            // Navegar a login
            router.navigate('/login');

            // Mostrar notificación
            NotificationManager.info('Sesión cerrada correctamente');

            Logger.success('Sesión cerrada');
            EventUtils.dispatch('auth:logout');

        } catch (error) {
            Logger.error('Error cerrando sesión', error);
            // Forzar logout incluso si hay error
            this.forceLogout();
        }
    }

    /**
     * Logout forzado en caso de error
     */
    forceLogout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('vetgestion_token');
        persistenceStore.clearUser();
        window.location.hash = '#/login';
        window.location.reload();
    }

    /**
     * === VALIDACIÓN DE CREDENCIALES ===
     */
    
    validateCredentials(credentials) {
        const { email, password, rememberMe } = credentials;

        // Usuarios de prueba
        const testUsers = [
            {
                email: 'vet@vetgestion.com',
                password: 'password123',
                name: 'Dr. Laura Fernández',
                role: 'veterinario',
                specialty: 'Medicina General',
                phone: '+34 123 456 789',
                avatar: null
            },
            {
                email: 'admin@vetgestion.com',
                password: 'password123',
                name: 'Ana Martínez',
                role: 'recepcionista',
                specialty: null,
                phone: '+34 987 654 321',
                avatar: null
            },
            {
                email: 'demo@vetgestion.com',
                password: 'demo123',
                name: 'Usuario Demo',
                role: 'veterinario',
                specialty: 'Cirugía',
                phone: '+34 555 555 555',
                avatar: null
            }
        ];

        const user = testUsers.find(u => u.email === email && u.password === password);

        if (user) {
            // Crear copia sin password
            const { password: _, ...userWithoutPassword } = user;
            
            return {
                success: true,
                user: {
                    ...userWithoutPassword,
                    id: Date.now(), // ID simulado
                    login_at: new Date().toISOString(),
                    remember_me: rememberMe || false
                }
            };
        } else {
            // Verificar qué error específico mostrar
            const userExists = testUsers.some(u => u.email === email);
            
            if (!userExists) {
                return {
                    success: false,
                    message: 'El correo electrónico no está registrado',
                    field: 'email'
                };
            } else {
                return {
                    success: false,
                    message: 'La contraseña es incorrecta',
                    field: 'password'
                };
            }
        }
    }

    /**
     * === UTILIDADES ===
     */

    /**
     * Genera un token simulado
     */
    generateToken() {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated() {
        return !!(this.token && this.user);
    }

    /**
     * Verifica si el usuario es veterinario
     */
    isVeterinarian() {
        return this.user?.role === 'veterinario';
    }

    /**
     * Verifica si el usuario es recepcionista
     */
    isReceptionist() {
        return this.user?.role === 'recepcionista';
    }

    /**
     * Obtiene las iniciales del usuario
     */
    getUserInitials() {
        return FormatUtils.getInitials(this.user?.name);
    }

    /**
     * Obtiene el rol formateado del usuario
     */
    getUserRole() {
        if (!this.user?.role) return 'Usuario';
        return this.user.role === 'veterinario' ? 'Veterinario/a' : 'Recepcionista';
    }

    /**
     * === ACTUALIZACIÓN DE UI ===
     */

    /**
     * Actualiza la UI durante el login
     */
    updateLoginUI(loading) {
        const loginBtn = DOMUtils.$('login-btn');
        const loginBtnText = DOMUtils.$('login-btn-text');
        const loginBtnLoading = DOMUtils.$('login-btn-loading');

        if (loading) {
            loginBtn.disabled = true;
            DOMUtils.hide(loginBtnText);
            DOMUtils.show(loginBtnLoading);
        } else {
            loginBtn.disabled = false;
            DOMUtils.show(loginBtnText);
            DOMUtils.hide(loginBtnLoading);
        }
    }

    /**
     * Actualiza la UI después del login exitoso
     */
    updateUIAfterLogin() {
        // Actualizar información del usuario en la UI
        const userNameEl = DOMUtils.$('user-name');
        const userRoleEl = DOMUtils.$('user-role');
        const userInitialsEl = DOMUtils.$('user-initials');

        if (userNameEl) userNameEl.textContent = this.user.name || 'Usuario';
        if (userRoleEl) userRoleEl.textContent = this.getUserRole();
        if (userInitialsEl) userInitialsEl.textContent = this.getUserInitials();

        // Ocultar vista de login y mostrar app
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');

        // Navegar al dashboard
        router.navigate('/');
    }

    /**
     * Actualiza la UI después del logout
     */
    updateUIAfterLogout() {
        // Limpiar información del usuario
        const userNameEl = DOMUtils.$('user-name');
        const userRoleEl = DOMUtils.$('user-role');
        const userInitialsEl = DOMUtils.$('user-initials');

        if (userNameEl) userNameEl.textContent = 'Usuario';
        if (userRoleEl) userRoleEl.textContent = 'Usuario';
        if (userInitialsEl) userInitialsEl.textContent = 'U';

        // Mostrar vista de login y ocultar app
        DOMUtils.show('login-view');
        DOMUtils.hide('app-layout');
    }

    /**
     * Muestra errores de login
     */
    showLoginError(message, field = null) {
        // Limpiar errores previos
        this.clearLoginErrors();

        // Mostrar notificación general
        NotificationManager.error(message);

        // Mostrar error específico en el campo si se especifica
        if (field) {
            const errorEl = DOMUtils.$(field + '-error');
            const inputEl = DOMUtils.$(field);
            
            if (errorEl) {
                errorEl.textContent = message;
                DOMUtils.show(errorEl);
            }
            
            if (inputEl) {
                DOMUtils.addClass(inputEl, 'form-input-error');
            }
        }
    }

    /**
     * Limpia errores de login
     */
    clearLoginErrors() {
        const errorFields = ['email', 'password'];
        errorFields.forEach(field => {
            const errorEl = DOMUtils.$(field + '-error');
            const inputEl = DOMUtils.$(field);
            
            if (errorEl) {
                errorEl.textContent = '';
                DOMUtils.hide(errorEl);
            }
            
            if (inputEl) {
                DOMUtils.removeClass(inputEl, 'form-input-error');
            }
        });
    }

    /**
     * === EVENTOS DE FORMULARIO ===
     */

    /**
     * Maneja el envío del formulario de login
     */
    handleLoginSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password'),
            rememberMe: formData.get('remember-me') === 'on'
        };

        // Validación básica
        if (!credentials.email || !credentials.password) {
            this.showLoginError('Por favor, completa todos los campos');
            return;
        }

        if (!ValidationUtils.isValidEmail(credentials.email)) {
            this.showLoginError('El formato del email no es válido', 'email');
            return;
        }

        // Limpiar errores y proceder con login
        this.clearLoginErrors();
        this.login(credentials);
    }

    /**
     * === MÉTODOS PÚBLICOS ===
     */

    /**
     * Actualizar perfil de usuario
     */
    updateProfile(profileData) {
        if (!this.user) return false;

        this.user = {
            ...this.user,
            ...profileData,
            updated_at: new Date().toISOString()
        };

        persistenceStore.saveUser(this.user);
        this.updateUIAfterLogin(); // Refrescar UI con nuevos datos

        Logger.success('Perfil de usuario actualizado');
        EventUtils.dispatch('auth:profile-updated', { user: this.user });

        return true;
    }

    /**
     * Cambiar contraseña (simulado)
     */
    async changePassword(currentPassword, newPassword) {
        try {
            // En una app real, esto sería una llamada al API
            await LoadUtils.delay(1000);

            // Simulación de cambio exitoso
            Logger.success('Contraseña cambiada correctamente');
            NotificationManager.success('Contraseña actualizada correctamente');
            
            return { success: true };
        } catch (error) {
            Logger.error('Error cambiando contraseña', error);
            return { success: false, message: 'Error al cambiar la contraseña' };
        }
    }

    /**
     * Verificar sesión (para uso en router)
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            Logger.warn('Acceso denegado - usuario no autenticado');
            router.navigate('/login');
            return false;
        }
        return true;
    }

    /**
     * Verificar que el usuario NO esté autenticado (para páginas de login)
     */
    requireGuest() {
        if (this.isAuthenticated()) {
            Logger.info('Usuario ya autenticado, redirigiendo a dashboard');
            router.navigate('/');
            return false;
        }
        return true;
    }
}

// Crear instancia global
window.AuthStore = new AuthStore();
window.authStore = window.AuthStore; 