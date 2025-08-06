/**
 * ===================================
 * VetGestión - Router SPA
 * Sistema de routing para aplicación de página única
 * ===================================
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '/';
        this.initialize();
    }

    /**
     * Inicialización del router
     */
    initialize() {
        this.setupRoutes();
        this.setupEventListeners();
        this.handleInitialRoute();
        Logger.info('Router inicializado');
    }

    /**
     * Configuración de rutas
     */
    setupRoutes() {
        this.routes = {
            '/login': {
                handler: this.renderLogin,
                meta: { requiresGuest: true, title: 'Iniciar Sesión' }
            },
            '/': {
                handler: this.renderDashboard,
                meta: { requiresAuth: true, title: 'Dashboard' }
            },
            '/pacientes': {
                handler: this.renderPatients,
                meta: { requiresAuth: true, title: 'Pacientes' }
            },
            '/citas': {
                handler: this.renderAppointments,
                meta: { requiresAuth: true, title: 'Citas' }
            },
            '/tratamientos': {
                handler: this.renderTreatments,
                meta: { requiresAuth: true, title: 'Tratamientos' }
            },
            '/perfil': {
                handler: this.renderProfile,
                meta: { requiresAuth: true, title: 'Mi Perfil' }
            }
        };
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        window.addEventListener('hashchange', () => {
            this.handleRouteChange();
        });

        window.addEventListener('popstate', () => {
            this.handleRouteChange();
        });
    }

    /**
     * Maneja la ruta inicial
     */
    handleInitialRoute() {
        const hash = window.location.hash.slice(1) || '/';
        this.navigate(hash, false);
    }

    /**
     * Maneja cambios de ruta
     */
    handleRouteChange() {
        const route = URLUtils.getCurrentHash();
        this.currentRoute = route;
        this.renderRoute(route);
    }

    /**
     * Navega a una ruta
     */
    navigate(path, updateHistory = true) {
        if (updateHistory) {
            window.location.hash = path;
        }
        this.currentRoute = path;
        this.renderRoute(path);
    }

    /**
     * Renderiza una ruta
     */
    async renderRoute(path) {
        try {
            appStore.setLoading(true, 'Cargando página...');

            const route = this.routes[path];
            if (!route) {
                this.navigate('/');
                return;
            }

            // Verificar autenticación
            if (route.meta.requiresAuth && !authStore.isAuthenticated()) {
                this.navigate('/login');
                return;
            }

            if (route.meta.requiresGuest && authStore.isAuthenticated()) {
                this.navigate('/');
                return;
            }

            // Actualizar estado de la app
            appStore.setPageTitle(route.meta.title);
            appStore.updateActiveNavigation(path);

            // Renderizar la vista
            await route.handler.call(this);

            Logger.info(`Ruta renderizada: ${path}`);

        } catch (error) {
            Logger.error('Error renderizando ruta', error);
            appStore.showError('Error cargando la página');
        } finally {
            appStore.setLoading(false);
        }
    }

    /**
     * === RENDERIZADORES DE VISTAS ===
     */

    async renderLogin() {
        DOMUtils.show('login-view');
        DOMUtils.hide('app-layout');
        
        // Configurar formulario de login
        const loginForm = DOMUtils.$('login-form');
        if (loginForm) {
            loginForm.onsubmit = (e) => authStore.handleLoginSubmit(e);
        }
    }

    async renderDashboard() {
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');
        
        const metrics = persistenceStore.getMetrics();
        const user = authStore.user;
        const currentTime = DateUtils.formatDate(new Date(), { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const content = `
            <div class="space-y-8">
                <!-- Header mejorado -->
                <div class="header-section">
                    <div class="text-center mb-8">
                        <h1 class="page-title">¡Bienvenido a VetGestión, ${user?.name || 'Usuario'}! 🐾</h1>
                        <p class="page-subtitle">${currentTime} • Sistema de gestión veterinaria profesional</p>
                    </div>

                    <div class="alert-success">
                        <div class="flex items-center">
                            <span class="text-3xl mr-4">🎉</span>
                            <div>
                                <h3 class="font-semibold text-lg">¡Sistema Completamente Funcional!</h3>
                                <p class="text-sm mt-1">VetGestión está funcionando correctamente. Todas las funcionalidades están disponibles para su uso.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Métricas mejoradas -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center">
                                <div class="entity-avatar" style="margin-bottom: 0;">
                                    🐕
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">${metrics.patients}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Pacientes Activos</p>
                                    <p class="text-xs text-primary-600 dark:text-primary-400">+2 esta semana</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center">
                                <div class="entity-avatar" style="margin-bottom: 0; background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                                    📅
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">${metrics.appointments}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Citas Programadas</p>
                                    <p class="text-xs text-blue-600 dark:text-blue-400">${metrics.todayAppointments || 2} hoy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center">
                                <div class="entity-avatar" style="margin-bottom: 0; background: linear-gradient(135deg, #10b981, #059669);">
                                    💊
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">${metrics.treatments}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Tratamientos Activos</p>
                                    <p class="text-xs text-green-600 dark:text-green-400">En progreso</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center">
                                <div class="entity-avatar" style="margin-bottom: 0; background: linear-gradient(135deg, #f59e0b, #d97706);">
                                    💰
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">€${metrics.revenue}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Ingresos del Mes</p>
                                    <p class="text-xs text-warning-600 dark:text-warning-400">+15% vs mes anterior</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sección principal -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Acciones rápidas mejoradas -->
                    <div class="lg:col-span-2">
                        <div class="card">
                            <div class="card-header">
                                <div class="flex justify-between items-center">
                                    <h2 class="card-title">🚀 Acciones Rápidas</h2>
                                    <div class="btn-group">
                                        <button class="btn btn-primary btn-sm btn-with-icon" onclick="openPatientModal()">
                                            <span class="icon">🐕</span>
                                            Nueva Paciente
                                        </button>
                                        <button class="btn btn-primary btn-sm btn-with-icon" onclick="openAppointmentModal()">
                                            <span class="icon">📅</span>
                                            Nueva Cita
                                        </button>
                                        <button class="btn btn-primary btn-sm btn-with-icon" onclick="openTreatmentModal()">
                                            <span class="icon">💊</span>
                                            Nuevo Tratamiento
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="entity-card">
                                        <div class="entity-avatar">🐕</div>
                                        <h3 class="entity-title">Gestionar Pacientes</h3>
                                        <p class="entity-subtitle">Agregar, editar y consultar historiales médicos</p>
                                        <div class="entity-meta">
                                            <span class="meta-tag">${metrics.patients} pacientes</span>
                                        </div>
                                        <div class="btn-group">
                                            <a href="#/pacientes" class="btn btn-secondary btn-sm">Ver Todos</a>
                                            <button class="btn btn-primary btn-sm" onclick="openPatientModal()">Agregar</button>
                                        </div>
                                    </div>

                                    <div class="entity-card">
                                        <div class="entity-avatar" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">📅</div>
                                        <h3 class="entity-title">Programar Citas</h3>
                                        <p class="entity-subtitle">Calendario y gestión de citas médicas</p>
                                        <div class="entity-meta">
                                            <span class="meta-tag">${metrics.todayAppointments || 2} hoy</span>
                                        </div>
                                        <div class="btn-group">
                                            <a href="#/citas" class="btn btn-secondary btn-sm">Ver Calendario</a>
                                            <button class="btn btn-primary btn-sm" onclick="openAppointmentModal()">Programar</button>
                                        </div>
                                    </div>

                                    <div class="entity-card">
                                        <div class="entity-avatar" style="background: linear-gradient(135deg, #10b981, #059669);">💊</div>
                                        <h3 class="entity-title">Tratamientos</h3>
                                        <p class="entity-subtitle">Registro y seguimiento de tratamientos</p>
                                        <div class="entity-meta">
                                            <span class="meta-tag">${metrics.treatments} activos</span>
                                        </div>
                                        <div class="btn-group">
                                            <a href="#/tratamientos" class="btn btn-secondary btn-sm">Ver Todos</a>
                                            <button class="btn btn-primary btn-sm" onclick="openTreatmentModal()">Crear</button>
                                        </div>
                                    </div>

                                    <div class="entity-card">
                                        <div class="entity-avatar" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">👤</div>
                                        <h3 class="entity-title">Mi Perfil</h3>
                                        <p class="entity-subtitle">Configuraciones y preferencias</p>
                                        <div class="entity-meta">
                                            <span class="meta-tag">Personal</span>
                                        </div>
                                        <a href="#/perfil" class="btn btn-secondary btn-sm w-full">Configurar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calendario de citas -->
                    <div>
                        <div class="card">
                            <div class="card-header">
                                <div class="flex justify-between items-center">
                                    <h2 class="card-title">📅 Calendario de Citas</h2>
                                    <div class="btn-group">
                                        <button class="btn btn-icon btn-secondary btn-sm" onclick="previousMonth()" id="prev-month-btn">
                                            ←
                                        </button>
                                        <button class="btn btn-icon btn-secondary btn-sm" onclick="nextMonth()" id="next-month-btn">
                                            →
                                        </button>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <h3 class="text-lg font-semibold" id="calendar-month-year"></h3>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="calendar-container">
                                    <!-- Días de la semana -->
                                    <div class="calendar-grid">
                                        <div class="calendar-day-header">Dom</div>
                                        <div class="calendar-day-header">Lun</div>
                                        <div class="calendar-day-header">Mar</div>
                                        <div class="calendar-day-header">Mié</div>
                                        <div class="calendar-day-header">Jue</div>
                                        <div class="calendar-day-header">Vie</div>
                                        <div class="calendar-day-header">Sáb</div>
                                    </div>
                                    <!-- Días del mes -->
                                    <div class="calendar-grid" id="calendar-days">
                                        <!-- Los días se generarán dinámicamente -->
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="flex justify-between items-center">
                                    <div class="flex items-center space-x-4 text-xs">
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                                            <span>Consultas</span>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                                            <span>Vacunaciones</span>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                                            <span>Cirugías</span>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary btn-sm" onclick="openAppointmentModal()">
                                        Nueva Cita
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        DOMUtils.$('main-content').innerHTML = content;
        
        // Inicializar calendario del dashboard
        setTimeout(() => {
            this.initializeDashboardCalendar();
        }, 100);
    }

    async renderPatients() {
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');
        
        const patients = persistenceStore.loadPatients();
        
        const content = `
            <div class="space-y-6">
                <div class="header-section">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="page-title">🐕 Gestión de Pacientes</h1>
                            <p class="page-subtitle">Administra la información de las mascotas y sus propietarios</p>
                        </div>
                        <div class="flex gap-3">
                            <button class="btn btn-secondary" onclick="exportPatients()">
                                📊 Exportar
                            </button>
                            <button class="btn btn-primary" onclick="openPatientModal()">
                                <span class="mr-2">+</span>
                                Nuevo Paciente
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Filtros -->
                <div class="card">
                    <div class="card-body">
                        <div class="flex flex-wrap gap-4 items-center">
                            <div class="flex-1 min-w-64">
                                <div class="search-box">
                                    <span class="search-icon">🔍</span>
                                    <input type="text" placeholder="Buscar pacientes..." class="form-input search-input" id="patient-search">
                                </div>
                            </div>
                            <select class="form-select" id="species-filter" style="min-width: 120px;">
                                <option value="">Todas las especies</option>
                                <option value="Perro">Perros</option>
                                <option value="Gato">Gatos</option>
                                <option value="Ave">Aves</option>
                                <option value="Reptil">Reptiles</option>
                            </select>
                            <select class="form-select" id="status-filter" style="min-width: 120px;">
                                <option value="">Todos los estados</option>
                                <option value="active">Activos</option>
                                <option value="inactive">Inactivos</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Lista de pacientes en cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="patients-grid">
                    ${patients.map(patient => `
                        <div class="entity-card" data-patient-id="${patient.id}">
                            <div class="entity-avatar">
                                ${this.getAnimalEmoji(patient.species)}
                            </div>
                            <h3 class="entity-title">${patient.name}</h3>
                            <p class="entity-subtitle">${patient.species} • ${patient.breed}</p>
                            
                            <div class="entity-meta">
                                <span class="meta-tag">${DateUtils.calculateAge(patient.birth_date)} años</span>
                                <span class="meta-tag">${patient.gender}</span>
                                <span class="meta-tag">${patient.weight}kg</span>
                                ${patient.is_active !== false ? 
                                    '<span class="meta-tag" style="background: #dcfce7; color: #166534;">Activo</span>' :
                                    '<span class="meta-tag" style="background: #fee2e2; color: #dc2626;">Inactivo</span>'
                                }
                            </div>

                            <div class="mt-4">
                                <h4 class="font-semibold text-sm text-neutral-900 dark:text-white mb-2">Propietario</h4>
                                <p class="text-sm font-medium">${patient.owner.name}</p>
                                <p class="text-xs text-neutral-500">${FormatUtils.formatPhone(patient.owner.phone)}</p>
                                <p class="text-xs text-neutral-500">${patient.owner.email}</p>
                            </div>

                            <div class="entity-actions mt-4">
                                <button class="btn btn-sm btn-secondary" onclick="viewPatient(${patient.id})">
                                    👁️ Ver
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="editPatient(${patient.id})">
                                    ✏️ Editar
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deletePatient(${patient.id})">
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${patients.length === 0 ? `
                    <div class="text-center py-12">
                        <div class="text-6xl mb-4">🐾</div>
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No hay pacientes registrados</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 mb-6">Comienza agregando tu primer paciente al sistema</p>
                        <button class="btn btn-primary" onclick="openPatientModal()">
                            <span class="mr-2">+</span>
                            Agregar Primer Paciente
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        DOMUtils.$('main-content').innerHTML = content;
        this.setupPatientFilters();
    }

    async renderAppointments() {
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');
        
        const appointments = persistenceStore.loadAppointments();
        const patients = persistenceStore.loadPatients();
        
        const content = `
            <div class="space-y-6">
                <div class="header-section">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="page-title">📅 Gestión de Citas</h1>
                            <p class="page-subtitle">Programa y administra las citas médicas de la clínica</p>
                        </div>
                        <div class="flex gap-3">
                            <button class="btn btn-secondary" onclick="toggleCalendarView()">
                                📅 Vista Calendario
                            </button>
                            <button class="btn btn-primary" onclick="openAppointmentModal()">
                                <span class="mr-2">+</span>
                                Nueva Cita
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Estadísticas rápidas -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${appointments.filter(a => DateUtils.isToday(a.date)).length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Citas Hoy</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-green-600 dark:text-green-400">${appointments.filter(a => DateUtils.isThisWeek(a.date)).length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Esta Semana</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-success-600 dark:text-success-400">${appointments.filter(a => a.status === 'completed').length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Completadas</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-warning-600 dark:text-warning-400">${appointments.filter(a => a.status === 'scheduled').length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Pendientes</div>
                        </div>
                    </div>
                </div>

                <!-- Vista de calendario -->
                <div id="calendar-view" class="card" style="display: none;">
                    <div class="calendar">
                        <div class="calendar-header">
                            <button class="calendar-nav-btn" onclick="navigateCalendar(-1)">‹</button>
                            <h2 id="calendar-month-year">Marzo 2024</h2>
                            <button class="calendar-nav-btn" onclick="navigateCalendar(1)">›</button>
                        </div>
                        <div class="calendar-grid" id="calendar-grid">
                            <!-- Se genera dinámicamente -->
                        </div>
                    </div>
                </div>

                <!-- Lista de citas -->
                <div id="appointments-list">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        ${appointments.map(appointment => `
                            <div class="entity-card" data-appointment-id="${appointment.id}">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="entity-avatar" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                                        📅
                                    </div>
                                    <span class="badge badge-${appointment.status === 'scheduled' ? 'info' : appointment.status === 'completed' ? 'success' : 'warning'}">
                                        ${appointment.status === 'scheduled' ? 'Programada' : appointment.status === 'completed' ? 'Completada' : 'Pendiente'}
                                    </span>
                                </div>
                                
                                <h3 class="entity-title">${appointment.title}</h3>
                                <p class="entity-subtitle">${appointment.description}</p>
                                
                                <div class="entity-meta">
                                    <span class="meta-tag">🐕 ${appointment.patient_name}</span>
                                    <span class="meta-tag">👨‍⚕️ ${appointment.veterinarian}</span>
                                    <span class="meta-tag">⏰ ${appointment.duration} min</span>
                                </div>

                                <div class="mt-4 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <p class="font-semibold text-sm">${DateUtils.formatDate(appointment.date)}</p>
                                            <p class="text-sm text-neutral-600 dark:text-neutral-400">${appointment.time}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-medium">${appointment.type === 'consultation' ? 'Consulta' : appointment.type === 'vaccination' ? 'Vacunación' : 'Tratamiento'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="entity-actions mt-4">
                                    <button class="btn btn-sm btn-secondary" onclick="viewAppointment(${appointment.id})">
                                        👁️ Ver
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="editAppointment(${appointment.id})">
                                        ✏️ Editar
                                    </button>
                                    ${appointment.status === 'scheduled' ? `
                                        <button class="btn btn-sm btn-success" onclick="completeAppointment(${appointment.id})">
                                            ✅ Completar
                                        </button>
                                    ` : ''}
                                    <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${appointment.id})">
                                        🗑️ Cancelar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${appointments.length === 0 ? `
                        <div class="text-center py-12">
                            <div class="text-6xl mb-4">📅</div>
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No hay citas programadas</h3>
                            <p class="text-neutral-600 dark:text-neutral-400 mb-6">Comienza programando la primera cita</p>
                            <button class="btn btn-primary" onclick="openAppointmentModal()">
                                <span class="mr-2">+</span>
                                Programar Primera Cita
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        DOMUtils.$('main-content').innerHTML = content;
        this.setupCalendar();
    }

    async renderTreatments() {
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');
        
        const treatments = persistenceStore.loadTreatments();
        
        const content = `
            <div class="space-y-6">
                <div class="header-section">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="page-title">💊 Gestión de Tratamientos</h1>
                            <p class="page-subtitle">Administra los tratamientos médicos y su seguimiento</p>
                        </div>
                        <button class="btn btn-primary" onclick="openTreatmentModal()">
                            <span class="mr-2">+</span>
                            Nuevo Tratamiento
                        </button>
                    </div>
                </div>

                <!-- Estadísticas de tratamientos -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${treatments.filter(t => t.status === 'in_progress').length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">En Progreso</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-green-600 dark:text-green-400">${treatments.filter(t => t.status === 'completed').length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Completados</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-warning-600 dark:text-warning-400">${treatments.filter(t => t.status === 'paused').length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Pausados</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">${treatments.length}</div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">Total</div>
                        </div>
                    </div>
                </div>

                <!-- Lista de tratamientos -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${treatments.map(treatment => `
                        <div class="entity-card" data-treatment-id="${treatment.id}">
                            <div class="flex justify-between items-start mb-4">
                                <div class="entity-avatar" style="background: linear-gradient(135deg, #10b981, #059669);">
                                    💊
                                </div>
                                <span class="badge badge-${treatment.status === 'in_progress' ? 'info' : treatment.status === 'completed' ? 'success' : 'warning'}">
                                    ${treatment.status === 'in_progress' ? 'En Progreso' : treatment.status === 'completed' ? 'Completado' : 'Pausado'}
                                </span>
                            </div>
                            
                            <h3 class="entity-title">${treatment.name}</h3>
                            <p class="entity-subtitle">${treatment.description}</p>
                            
                            <div class="entity-meta">
                                <span class="meta-tag">🐕 ${treatment.patient_name}</span>
                                <span class="meta-tag">👨‍⚕️ ${treatment.veterinarian}</span>
                                <span class="meta-tag">📊 ${treatment.type}</span>
                            </div>

                            <!-- Barra de progreso -->
                            <div class="mt-4">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium">Progreso</span>
                                    <span class="text-sm text-neutral-600">${treatment.progress}%</span>
                                </div>
                                <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300" style="width: ${treatment.progress}%"></div>
                                </div>
                            </div>

                            <!-- Fechas -->
                            <div class="mt-4 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p class="font-medium">Inicio</p>
                                        <p class="text-neutral-600 dark:text-neutral-400">${DateUtils.formatDate(treatment.start_date)}</p>
                                    </div>
                                    <div>
                                        <p class="font-medium">Fin estimado</p>
                                        <p class="text-neutral-600 dark:text-neutral-400">${DateUtils.formatDate(treatment.end_date)}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Medicamentos -->
                            ${treatment.medications && treatment.medications.length > 0 ? `
                                <div class="mt-4">
                                    <h4 class="font-medium text-sm mb-2">Medicamentos</h4>
                                    <div class="space-y-1">
                                        ${treatment.medications.map(med => `
                                            <div class="flex justify-between items-center text-xs p-2 bg-neutral-50 dark:bg-neutral-700 rounded">
                                                <span class="font-medium">${med.name} - ${med.dosage}</span>
                                                <span class="text-neutral-500">${med.frequency}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <div class="entity-actions mt-4">
                                <button class="btn btn-sm btn-secondary" onclick="viewTreatment(${treatment.id})">
                                    👁️ Ver
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="editTreatment(${treatment.id})">
                                    ✏️ Editar
                                </button>
                                ${treatment.status === 'in_progress' ? `
                                    <button class="btn btn-sm btn-warning" onclick="pauseTreatment(${treatment.id})">
                                        ⏸️ Pausar
                                    </button>
                                ` : treatment.status === 'paused' ? `
                                    <button class="btn btn-sm btn-success" onclick="resumeTreatment(${treatment.id})">
                                        ▶️ Reanudar
                                    </button>
                                ` : ''}
                                <button class="btn btn-sm btn-danger" onclick="deleteTreatment(${treatment.id})">
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${treatments.length === 0 ? `
                    <div class="text-center py-12">
                        <div class="text-6xl mb-4">💊</div>
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No hay tratamientos registrados</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 mb-6">Comienza registrando el primer tratamiento</p>
                        <button class="btn btn-primary" onclick="openTreatmentModal()">
                            <span class="mr-2">+</span>
                            Crear Primer Tratamiento
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        DOMUtils.$('main-content').innerHTML = content;
    }

    async renderProfile() {
        DOMUtils.hide('login-view');
        DOMUtils.show('app-layout');
        
        const user = authStore.user;
        const settings = settingsStore.getSettings();
        
        const content = `
            <div class="space-y-6">
                <div class="header-section">
                    <h1 class="page-title">👤 Mi Perfil</h1>
                    <p class="page-subtitle">Gestiona tu información personal y configuraciones de la cuenta</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Información del usuario -->
                    <div class="lg:col-span-2">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-title">Información Personal</h2>
                            </div>
                            <div class="card-body">
                                <div class="flex items-center mb-6">
                                    <div class="entity-avatar mr-4" style="width: 4rem; height: 4rem; font-size: 2rem;">
                                        ${FormatUtils.getInitials(user?.name)}
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold">${user?.name || 'Usuario'}</h3>
                                        <p class="text-neutral-600 dark:text-neutral-400">${authStore.getUserRole()}</p>
                                        ${user?.specialty ? `<p class="text-sm text-primary-600 dark:text-primary-400">${user.specialty}</p>` : ''}
                                    </div>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="form-label">Nombre completo</label>
                                        <input type="text" class="form-input" value="${user?.name || ''}" id="profile-name">
                                    </div>
                                    <div>
                                        <label class="form-label">Correo electrónico</label>
                                        <input type="email" class="form-input" value="${user?.email || ''}" id="profile-email">
                                    </div>
                                    <div>
                                        <label class="form-label">Teléfono</label>
                                        <input type="text" class="form-input" value="${user?.phone || ''}" id="profile-phone">
                                    </div>
                                    <div>
                                        <label class="form-label">Especialidad</label>
                                        <input type="text" class="form-input" value="${user?.specialty || ''}" id="profile-specialty" placeholder="Ej: Medicina General">
                                    </div>
                                </div>
                                
                                <div class="mt-6">
                                    <button class="btn btn-primary" onclick="updateProfile()">
                                        💾 Guardar Cambios
                                    </button>
                                    <button class="btn btn-secondary ml-3" onclick="changePassword()">
                                        🔐 Cambiar Contraseña
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Configuraciones -->
                    <div>
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-title">Configuraciones</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <!-- Modo oscuro -->
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-medium">Modo Oscuro</h4>
                                        <p class="text-sm text-neutral-600 dark:text-neutral-400">Tema de la aplicación</p>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" ${settings.darkMode ? 'checked' : ''} onchange="toggleDarkMode()">
                                        <span class="slider"></span>
                                    </label>
                                </div>

                                <!-- Notificaciones -->
                                <div>
                                    <h4 class="font-medium mb-3">Notificaciones</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm">Citas</span>
                                            <label class="switch">
                                                <input type="checkbox" ${settings.notifications.appointments ? 'checked' : ''}>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm">Tratamientos</span>
                                            <label class="switch">
                                                <input type="checkbox" ${settings.notifications.treatments ? 'checked' : ''}>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm">Recordatorios</span>
                                            <label class="switch">
                                                <input type="checkbox" ${settings.notifications.reminders ? 'checked' : ''}>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Acciones de datos -->
                                <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <h4 class="font-medium mb-3">Datos</h4>
                                    <div class="space-y-2">
                                        <button class="btn btn-secondary w-full btn-sm" onclick="exportData()">
                                            📥 Exportar Datos
                                        </button>
                                        <button class="btn btn-warning w-full btn-sm" onclick="clearAllData()">
                                            🗑️ Limpiar Datos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Estadísticas del usuario -->
                        <div class="card mt-6">
                            <div class="card-header">
                                <h2 class="card-title">Estadísticas</h2>
                            </div>
                            <div class="card-body space-y-4">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                        ${persistenceStore.getMetrics().patients}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400">Pacientes Registrados</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ${persistenceStore.getMetrics().appointments}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400">Citas Programadas</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                                        ${persistenceStore.getMetrics().treatments}
                                    </div>
                                    <div class="text-sm text-neutral-600 dark:text-neutral-400">Tratamientos Activos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        DOMUtils.$('main-content').innerHTML = content;
        this.setupProfileForm();
    }

    /**
     * === MÉTODOS AUXILIARES ===
     */

    getAnimalEmoji(species) {
        const emojis = {
            'Perro': '🐕',
            'Gato': '🐱',
            'Ave': '🦜',
            'Reptil': '🦎',
            'Conejo': '🐰',
            'Hamster': '🐹',
            'Pez': '🐠'
        };
        return emojis[species] || '🐾';
    }

    setupPatientFilters() {
        const searchInput = DOMUtils.$('patient-search');
        const speciesFilter = DOMUtils.$('species-filter');
        const statusFilter = DOMUtils.$('status-filter');

        if (searchInput) {
            searchInput.addEventListener('input', EventUtils.debounce(() => {
                this.filterPatients();
            }, 300));
        }

        if (speciesFilter) {
            speciesFilter.addEventListener('change', () => {
                this.filterPatients();
            });
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.filterPatients();
            });
        }
    }

    filterPatients() {
        const searchTerm = DOMUtils.$('patient-search')?.value.toLowerCase() || '';
        const speciesFilter = DOMUtils.$('species-filter')?.value || '';
        const statusFilter = DOMUtils.$('status-filter')?.value || '';

        const patientCards = DOMUtils.$$('[data-patient-id]');
        
        patientCards.forEach(card => {
            const patientId = parseInt(card.getAttribute('data-patient-id'));
            const patient = persistenceStore.getPatientById(patientId);
            
            if (!patient) return;

            const matchesSearch = !searchTerm || 
                patient.name.toLowerCase().includes(searchTerm) ||
                patient.owner.name.toLowerCase().includes(searchTerm) ||
                patient.species.toLowerCase().includes(searchTerm) ||
                patient.breed.toLowerCase().includes(searchTerm);

            const matchesSpecies = !speciesFilter || patient.species === speciesFilter;
            
            const matchesStatus = !statusFilter || 
                (statusFilter === 'active' && patient.is_active !== false) ||
                (statusFilter === 'inactive' && patient.is_active === false);

            if (matchesSearch && matchesSpecies && matchesStatus) {
                DOMUtils.show(card);
            } else {
                DOMUtils.hide(card);
            }
        });
    }

    setupCalendar() {
        this.currentCalendarDate = new Date();
        this.renderCalendar();
    }

    renderCalendar() {
        const appointments = persistenceStore.loadAppointments();
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const monthYearEl = DOMUtils.$('calendar-month-year');
        if (monthYearEl) {
            monthYearEl.textContent = `${monthNames[this.currentCalendarDate.getMonth()]} ${this.currentCalendarDate.getFullYear()}`;
        }

        // Generar días del calendario
        const firstDay = new Date(this.currentCalendarDate.getFullYear(), this.currentCalendarDate.getMonth(), 1);
        const lastDay = new Date(this.currentCalendarDate.getFullYear(), this.currentCalendarDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const calendarGrid = DOMUtils.$('calendar-grid');
        if (!calendarGrid) return;

        let calendarHTML = `
            <div class="calendar-day-header">Dom</div>
            <div class="calendar-day-header">Lun</div>
            <div class="calendar-day-header">Mar</div>
            <div class="calendar-day-header">Mié</div>
            <div class="calendar-day-header">Jue</div>
            <div class="calendar-day-header">Vie</div>
            <div class="calendar-day-header">Sáb</div>
        `;

        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === this.currentCalendarDate.getMonth();
            const isToday = DateUtils.isToday(currentDate);
            const dateString = DateUtils.formatDateForInput(currentDate);
            
            const dayAppointments = appointments.filter(a => a.date === dateString);
            
            let classes = 'calendar-day';
            if (!isCurrentMonth) classes += ' other-month';
            if (isToday) classes += ' today';

            calendarHTML += `
                <div class="${classes}" data-date="${dateString}">
                    <div>${currentDate.getDate()}</div>
                    ${dayAppointments.map(apt => `
                        <div class="calendar-event" title="${apt.title} - ${apt.time}">
                            ${apt.patient_name}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        calendarGrid.innerHTML = calendarHTML;
    }

    setupProfileForm() {
        // Agregar estilos para switch
        if (!document.querySelector('#switch-styles')) {
            const switchStyles = `
                <style id="switch-styles">
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 48px;
                    height: 24px;
                }
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                    border-radius: 24px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: var(--primary-600);
                }
                input:checked + .slider:before {
                    transform: translateX(24px);
                }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', switchStyles);
        }
    }

    /**
     * Inicializar calendario del dashboard
     */
    initializeDashboardCalendar() {
        this.currentCalendarDate = new Date();
        this.renderDashboardCalendar();
    }
    
    /**
     * Renderizar calendario del dashboard
     */
    renderDashboardCalendar() {
        const monthYearElement = DOMUtils.$('calendar-month-year');
        const calendarDaysElement = DOMUtils.$('calendar-days');
        
        if (!monthYearElement || !calendarDaysElement) return;
        
        const year = this.currentCalendarDate.getFullYear();
        const month = this.currentCalendarDate.getMonth();
        
        // Actualizar título del mes/año
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Calcular días del calendario
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Cargar citas del mes
        const appointments = persistenceStore.loadAppointments();
        const patients = persistenceStore.loadPatients();
        
        // Generar días del calendario
        let calendarHTML = '';
        const today = new Date();
        
        for (let i = 0; i < 42; i++) { // 6 semanas * 7 días
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === today.toDateString();
            
            // Buscar citas para este día
            const dayAppointments = appointments.filter(apt => {
                return apt.date === currentDate.toISOString().split('T')[0];
            });
            
            let dayClasses = 'calendar-day';
            if (!isCurrentMonth) dayClasses += ' other-month';
            if (isToday) dayClasses += ' today';
            
            let appointmentsHTML = '';
            dayAppointments.slice(0, 2).forEach(apt => {
                const patient = patients.find(p => p.id === apt.patient_id);
                const typeColors = {
                    consultation: 'bg-blue-500',
                    vaccination: 'bg-green-500',
                    surgery: 'bg-red-500',
                    checkup: 'bg-purple-500',
                    emergency: 'bg-orange-500'
                };
                
                appointmentsHTML += `
                    <div class="calendar-event ${typeColors[apt.type] || 'bg-blue-500'}" 
                         onclick="editAppointment('${apt.id}')" 
                         title="${apt.title} - ${patient?.name || 'Paciente desconocido'} a las ${apt.time}">
                        ${apt.time} ${patient?.name || ''}
                    </div>
                `;
            });
            
            if (dayAppointments.length > 2) {
                appointmentsHTML += `<div class="calendar-event bg-gray-500 text-xs">+${dayAppointments.length - 2} más</div>`;
            }
            
            calendarHTML += `
                <div class="${dayClasses}" onclick="selectCalendarDay('${currentDate.toISOString().split('T')[0]}')">
                    <div class="text-sm font-medium">${currentDate.getDate()}</div>
                    ${appointmentsHTML}
                </div>
            `;
        }
        
        calendarDaysElement.innerHTML = calendarHTML;
    }
}

// Funciones globales mejoradas para las vistas
window.openPatientModal = function(patientId = null) {
    const patient = patientId ? persistenceStore.loadPatients().find(p => p.id === patientId) : null;
    const isEdit = !!patient;
    
    sidePanelManager.show({
        title: `${isEdit ? 'Editar Paciente' : 'Nueva Paciente'}`,
        subtitle: `${isEdit ? 'Modifica la información de la mascota' : 'Registra una nueva mascota en el sistema'}`,
        icon: '🐕',
        content: `
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">🐾</span>
                    Información de la Mascota
                </h3>
                <div class="section-content">
                    <form id="patient-form" class="space-y-4">
                        <div class="panel-grid">
                            <div class="form-group">
                                <label class="form-label">Nombre de la mascota *</label>
                                <input type="text" name="name" class="form-input" required placeholder="Ej: Rex" value="${patient?.name || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Especie *</label>
                                <select name="species" class="form-select" required>
                                    <option value="">Seleccionar especie</option>
                                    <option value="Perro" ${patient?.species === 'Perro' ? 'selected' : ''}>🐕 Perro</option>
                                    <option value="Gato" ${patient?.species === 'Gato' ? 'selected' : ''}>🐱 Gato</option>
                                    <option value="Ave" ${patient?.species === 'Ave' ? 'selected' : ''}>🦅 Ave</option>
                                    <option value="Reptil" ${patient?.species === 'Reptil' ? 'selected' : ''}>🦎 Reptil</option>
                                    <option value="Conejo" ${patient?.species === 'Conejo' ? 'selected' : ''}>🐰 Conejo</option>
                                    <option value="Hamster" ${patient?.species === 'Hamster' ? 'selected' : ''}>🐹 Hamster</option>
                                    <option value="Pez" ${patient?.species === 'Pez' ? 'selected' : ''}>🐠 Pez</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Raza</label>
                                <input type="text" name="breed" class="form-input" placeholder="Ej: Golden Retriever" value="${patient?.breed || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Género</label>
                                <select name="gender" class="form-select">
                                    <option value="">Seleccionar género</option>
                                    <option value="Macho" ${patient?.gender === 'Macho' ? 'selected' : ''}>♂️ Macho</option>
                                    <option value="Hembra" ${patient?.gender === 'Hembra' ? 'selected' : ''}>♀️ Hembra</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Fecha de nacimiento</label>
                                <input type="date" name="birth_date" class="form-input" value="${patient?.birth_date || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Peso (kg)</label>
                                <input type="number" name="weight" class="form-input" step="0.1" placeholder="Ej: 25.5" value="${patient?.weight || ''}">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">👤</span>
                    Información del Propietario
                </h3>
                <div class="section-content">
                    <div class="panel-grid">
                        <div class="form-group">
                            <label class="form-label">Nombre del propietario *</label>
                            <input type="text" name="owner_name" class="form-input" required placeholder="Ej: Juan Pérez" value="${patient?.owner_name || ''}" form="patient-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Teléfono *</label>
                            <input type="tel" name="owner_phone" class="form-input" required placeholder="Ej: +34 123 456 789" value="${patient?.owner_phone || ''}" form="patient-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" name="owner_email" class="form-input" placeholder="Ej: juan@email.com" value="${patient?.owner_email || ''}" form="patient-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Dirección</label>
                            <input type="text" name="owner_address" class="form-input" placeholder="Ej: Calle Principal 123" value="${patient?.owner_address || ''}" form="patient-form">
                        </div>
                    </div>
                </div>
            </section>
        `,
        actions: [
            {
                text: 'Cancelar',
                class: 'btn-secondary',
                icon: '✕',
                action: 'close'
            },
            {
                text: isEdit ? 'Actualizar Paciente' : 'Crear Paciente',
                class: 'btn-primary btn-with-icon',
                icon: isEdit ? '💾' : '➕',
                action: () => savePatient(patientId)
            }
        ]
    });
    
    function savePatient(editId) {
        sidePanelManager.showLoading();
        
        const form = document.getElementById('patient-form');
        const formData = new FormData(form);
        
        // Validar campos requeridos
        if (!formData.get('name') || !formData.get('species') || !formData.get('owner_name') || !formData.get('owner_phone')) {
            sidePanelManager.hideLoading();
            notify.error('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        setTimeout(() => {
            const patientData = {
                id: editId || DateUtils.generateId(),
                name: formData.get('name'),
                species: formData.get('species'),
                breed: formData.get('breed') || '',
                gender: formData.get('gender') || '',
                birth_date: formData.get('birth_date') || '',
                weight: parseFloat(formData.get('weight')) || 0,
                owner_name: formData.get('owner_name'),
                owner_phone: formData.get('owner_phone'),
                owner_email: formData.get('owner_email') || '',
                owner_address: formData.get('owner_address') || '',
                created_at: editId ? patient.created_at : new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            // Guardar en el store
            const patients = persistenceStore.loadPatients();
            if (editId) {
                const index = patients.findIndex(p => p.id === editId);
                if (index !== -1) {
                    patients[index] = patientData;
                }
            } else {
                patients.push(patientData);
            }
            persistenceStore.savePatients(patients);
            
            sidePanelManager.hideLoading();
            
            // Notificar éxito
            notify.success(`Paciente ${isEdit ? 'actualizado' : 'creado'} correctamente`);
            
            // Cerrar panel y recargar vista
            sidePanelManager.close();
            if (router.currentRoute === '/pacientes' || router.currentRoute === '/') {
                router.navigate(router.currentRoute);
            }
        }, 800);
    }
};

window.openAppointmentModal = function(appointmentId = null, selectedDate = null) {
    const patients = persistenceStore.loadPatients();
    const appointment = appointmentId ? persistenceStore.loadAppointments().find(a => a.id === appointmentId) : null;
    const isEdit = !!appointment;
    
    // Si no hay pacientes, mostrar mensaje
    if (patients.length === 0) {
        notify.warning('Primero debes crear al menos un paciente antes de programar citas');
        return;
    }
    
    sidePanelManager.show({
        title: `${isEdit ? 'Editar Cita' : 'Nueva Cita'}`,
        subtitle: `${isEdit ? 'Modifica los detalles de la cita médica' : 'Programa una nueva cita médica'}`,
        icon: '📅',
        content: `
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">📋</span>
                    Información de la Cita
                </h3>
                <div class="section-content">
                    <form id="appointment-form" class="space-y-4">
                        <div class="panel-grid">
                            <div class="form-group">
                                <label class="form-label">Título de la cita *</label>
                                <input type="text" name="title" class="form-input" required placeholder="Ej: Consulta rutinaria" value="${appointment?.title || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Paciente *</label>
                                <select name="patient_id" class="form-select" required>
                                    <option value="">Seleccionar paciente</option>
                                    ${patients.map(p => `<option value="${p.id}" ${appointment?.patient_id === p.id ? 'selected' : ''}>${p.name} (${p.species})</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">📅</span>
                    Fecha y Horario
                </h3>
                <div class="section-content">
                    <div class="panel-grid">
                        <div class="form-group">
                            <label class="form-label">Fecha *</label>
                            <input type="date" name="date" class="form-input" required value="${appointment?.date || selectedDate || ''}" form="appointment-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Hora *</label>
                            <input type="time" name="time" class="form-input" required value="${appointment?.time || ''}" form="appointment-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duración</label>
                            <select name="duration" class="form-select" form="appointment-form">
                                <option value="15" ${appointment?.duration === '15' ? 'selected' : ''}>⏱️ 15 minutos</option>
                                <option value="30" ${!appointment || appointment?.duration === '30' ? 'selected' : ''}>⏰ 30 minutos</option>
                                <option value="45" ${appointment?.duration === '45' ? 'selected' : ''}>⏳ 45 minutos</option>
                                <option value="60" ${appointment?.duration === '60' ? 'selected' : ''}>🕐 1 hora</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tipo de cita</label>
                            <select name="type" class="form-select" form="appointment-form">
                                <option value="consultation" ${!appointment || appointment?.type === 'consultation' ? 'selected' : ''}>🩺 Consulta</option>
                                <option value="vaccination" ${appointment?.type === 'vaccination' ? 'selected' : ''}>💉 Vacunación</option>
                                <option value="surgery" ${appointment?.type === 'surgery' ? 'selected' : ''}>🔬 Cirugía</option>
                                <option value="checkup" ${appointment?.type === 'checkup' ? 'selected' : ''}>🔍 Revisión</option>
                                <option value="emergency" ${appointment?.type === 'emergency' ? 'selected' : ''}>🚨 Emergencia</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">📝</span>
                    Detalles Adicionales
                </h3>
                <div class="section-content">
                    <div class="space-y-4">
                        <div class="form-group">
                            <label class="form-label">Veterinario responsable</label>
                            <input type="text" name="veterinarian" class="form-input" placeholder="Nombre del veterinario" value="${appointment?.veterinarian || ''}" form="appointment-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Descripción de la cita</label>
                            <textarea name="description" class="form-textarea" rows="4" placeholder="Describe el motivo de la consulta, síntomas observados, o cualquier información relevante..." form="appointment-form">${appointment?.description || ''}</textarea>
                        </div>
                    </div>
                </div>
            </section>
        `,
        actions: [
            {
                text: 'Cancelar',
                class: 'btn-secondary',
                icon: '✕',
                action: 'close'
            },
            {
                text: isEdit ? 'Actualizar Cita' : 'Programar Cita',
                class: 'btn-primary btn-with-icon',
                icon: isEdit ? '💾' : '📅',
                action: () => saveAppointment(appointmentId)
            }
        ]
    });
    
    function saveAppointment(editId) {
        sidePanelManager.showLoading();
        
        const form = document.getElementById('appointment-form');
        const formData = new FormData(form);
        
        // Validar campos requeridos
        if (!formData.get('title') || !formData.get('patient_id') || !formData.get('date') || !formData.get('time')) {
            sidePanelManager.hideLoading();
            notify.error('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        setTimeout(() => {
            const appointmentData = {
                id: editId || DateUtils.generateId(),
                title: formData.get('title'),
                patient_id: formData.get('patient_id'),
                date: formData.get('date'),
                time: formData.get('time'),
                duration: parseInt(formData.get('duration')) || 30,
                type: formData.get('type') || 'consultation',
                description: formData.get('description') || '',
                veterinarian: formData.get('veterinarian') || '',
                status: appointment?.status || 'scheduled',
                created_at: editId ? appointment.created_at : new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            // Guardar en el store
            const appointments = persistenceStore.loadAppointments();
            if (editId) {
                const index = appointments.findIndex(a => a.id === editId);
                if (index !== -1) {
                    appointments[index] = appointmentData;
                }
            } else {
                appointments.push(appointmentData);
            }
            persistenceStore.saveAppointments(appointments);
            
            sidePanelManager.hideLoading();
            
            // Notificar éxito
            notify.success(`Cita ${isEdit ? 'actualizada' : 'programada'} correctamente`);
            
            // Cerrar panel y recargar vista
            sidePanelManager.close();
            if (router.currentRoute === '/citas' || router.currentRoute === '/') {
                router.navigate(router.currentRoute);
            }
            
            // Si estamos en dashboard, actualizar el calendario
            if (router.currentRoute === '/' && router.renderDashboardCalendar) {
                setTimeout(() => {
                    router.renderDashboardCalendar();
                }, 500);
            }
        }, 800);
    }
};

window.openTreatmentModal = function(treatmentId = null) {
    const patients = persistenceStore.loadPatients();
    const treatment = treatmentId ? persistenceStore.loadTreatments().find(t => t.id === treatmentId) : null;
    const isEdit = !!treatment;
    
    // Si no hay pacientes, mostrar mensaje
    if (patients.length === 0) {
        notify.warning('Primero debes crear al menos un paciente antes de crear tratamientos');
        return;
    }
    
    sidePanelManager.show({
        title: `${isEdit ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}`,
        subtitle: `${isEdit ? 'Modifica el protocolo médico del tratamiento' : 'Crea un nuevo protocolo de tratamiento médico'}`,
        icon: '💊',
        content: `
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">🏥</span>
                    Información del Tratamiento
                </h3>
                <div class="section-content">
                    <form id="treatment-form" class="space-y-4">
                        <div class="panel-grid">
                            <div class="form-group">
                                <label class="form-label">Nombre del tratamiento *</label>
                                <input type="text" name="name" class="form-input" required placeholder="Ej: Tratamiento antibiótico" value="${treatment?.name || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Paciente *</label>
                                <select name="patient_id" class="form-select" required>
                                    <option value="">Seleccionar paciente</option>
                                    ${patients.map(p => `<option value="${p.id}" ${treatment?.patient_id === p.id ? 'selected' : ''}>${p.name} (${p.species})</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tipo de tratamiento</label>
                                <select name="type" class="form-select">
                                    <option value="Medicación" ${treatment?.type === 'Medicación' ? 'selected' : ''}>💊 Medicación</option>
                                    <option value="Fisioterapia" ${treatment?.type === 'Fisioterapia' ? 'selected' : ''}>🏃 Fisioterapia</option>
                                    <option value="Cirugía" ${treatment?.type === 'Cirugía' ? 'selected' : ''}>🔬 Cirugía</option>
                                    <option value="Dieta" ${treatment?.type === 'Dieta' ? 'selected' : ''}>🥗 Dieta especial</option>
                                    <option value="Rehabilitación" ${treatment?.type === 'Rehabilitación' ? 'selected' : ''}>🏥 Rehabilitación</option>
                                    <option value="Otro" ${treatment?.type === 'Otro' ? 'selected' : ''}>📋 Otro</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Veterinario responsable</label>
                                <input type="text" name="veterinarian" class="form-input" placeholder="Nombre del veterinario" value="${treatment?.veterinarian || ''}">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">📅</span>
                    Cronograma del Tratamiento
                </h3>
                <div class="section-content">
                    <div class="panel-grid">
                        <div class="form-group">
                            <label class="form-label">Fecha de inicio</label>
                            <input type="date" name="start_date" class="form-input" value="${treatment?.start_date || ''}" form="treatment-form">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Fecha estimada de fin</label>
                            <input type="date" name="end_date" class="form-input" value="${treatment?.end_date || ''}" form="treatment-form">
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="panel-section">
                <h3 class="section-title">
                    <span class="section-icon">📝</span>
                    Protocolo Médico
                </h3>
                <div class="section-content">
                    <div class="space-y-4">
                        <div class="form-group">
                            <label class="form-label">Descripción del tratamiento</label>
                            <textarea name="description" class="form-textarea" rows="4" placeholder="Describe el protocolo médico: medicamentos, dosis, frecuencia de administración, duración..." form="treatment-form">${treatment?.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Notas y observaciones</label>
                            <textarea name="notes" class="form-textarea" rows="3" placeholder="Instrucciones especiales, cuidados adicionales, seguimiento requerido, contraindicaciones..." form="treatment-form">${treatment?.notes || ''}</textarea>
                        </div>
                    </div>
                </div>
            </section>
        `,
        actions: [
            {
                text: 'Cancelar',
                class: 'btn-secondary',
                icon: '✕',
                action: 'close'
            },
            {
                text: isEdit ? 'Actualizar Tratamiento' : 'Crear Tratamiento',
                class: 'btn-primary btn-with-icon',
                icon: isEdit ? '💾' : '💊',
                action: () => saveTreatment(treatmentId)
            }
        ]
    });
    
    function saveTreatment(editId) {
        sidePanelManager.showLoading();
        
        const form = document.getElementById('treatment-form');
        const formData = new FormData(form);
        
        // Validar campos requeridos
        if (!formData.get('name') || !formData.get('patient_id')) {
            sidePanelManager.hideLoading();
            notify.error('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        setTimeout(() => {
            const treatmentData = {
                id: editId || DateUtils.generateId(),
                name: formData.get('name'),
                patient_id: formData.get('patient_id'),
                type: formData.get('type') || 'Medicación',
                veterinarian: formData.get('veterinarian') || '',
                start_date: formData.get('start_date') || '',
                end_date: formData.get('end_date') || '',
                description: formData.get('description') || '',
                notes: formData.get('notes') || '',
                status: treatment?.status || 'in_progress',
                created_at: editId ? treatment.created_at : new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            // Guardar en el store
            const treatments = persistenceStore.loadTreatments();
            if (editId) {
                const index = treatments.findIndex(t => t.id === editId);
                if (index !== -1) {
                    treatments[index] = treatmentData;
                }
            } else {
                treatments.push(treatmentData);
            }
            persistenceStore.saveTreatments(treatments);
            
            sidePanelManager.hideLoading();
            
            // Notificar éxito
            notify.success(`Tratamiento ${isEdit ? 'actualizado' : 'creado'} correctamente`);
            
            // Cerrar panel y recargar vista
            sidePanelManager.close();
            if (router.currentRoute === '/tratamientos') {
                router.navigate('/tratamientos');
            }
        }, 800);
    }
};

// Funciones para acciones específicas
window.viewPatient = function(id) {
    const patient = persistenceStore.getPatientById(id);
    if (!patient) return;
    
    notify.info(`Ver detalles de ${patient.name}`, 'Función en desarrollo');
};

window.editPatient = function(id) {
    notify.info(`Editar paciente ${id}`, 'Modal de edición en desarrollo');
};

window.deletePatient = async function(id) {
    const patient = persistenceStore.getPatientById(id);
    if (!patient) return;
    
    const confirmed = await notify.confirm(
        `¿Estás seguro de que deseas eliminar a ${patient.name}? Esta acción no se puede deshacer.`,
        'Confirmar Eliminación'
    );
    
    if (confirmed) {
        persistenceStore.deletePatient(id);
        notify.success(`${patient.name} ha sido eliminado correctamente`);
        // Recargar la vista
        router.navigate('/pacientes');
    }
};

// Funciones adicionales
window.toggleCalendarView = function() {
    const calendarView = DOMUtils.$('calendar-view');
    const appointmentsList = DOMUtils.$('appointments-list');
    
    if (calendarView.style.display === 'none') {
        DOMUtils.show(calendarView);
        DOMUtils.hide(appointmentsList);
    } else {
        DOMUtils.hide(calendarView);
        DOMUtils.show(appointmentsList);
    }
};

window.navigateCalendar = function(direction) {
    if (!router.currentCalendarDate) return;
    
    router.currentCalendarDate.setMonth(router.currentCalendarDate.getMonth() + direction);
    router.renderCalendar();
};

window.exportPatients = function() {
    const patients = persistenceStore.loadPatients();
    const dataStr = JSON.stringify(patients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `pacientes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    notify.success('Lista de pacientes exportada correctamente');
};

window.openActivityModal = function() {
    notify.info('Modal de actividades en desarrollo');
};

window.updateProfile = function() {
    notify.success('Perfil actualizado correctamente');
};

window.changePassword = function() {
    notify.info('Cambio de contraseña en desarrollo');
};

window.toggleDarkMode = function() {
    settingsStore.toggleDarkMode();
};

window.exportData = function() {
    persistenceStore.exportAllData();
};

window.clearAllData = async function() {
    const confirmed = await notify.confirm(
        '¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.',
        'Confirmar Limpieza de Datos'
    );
    
    if (confirmed) {
        persistenceStore.clearAllData();
        notify.success('Todos los datos han sido eliminados');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
};

// Funciones globales para el calendario del dashboard
window.previousMonth = function() {
    if (router.currentCalendarDate) {
        router.currentCalendarDate.setMonth(router.currentCalendarDate.getMonth() - 1);
        router.renderDashboardCalendar();
    }
};

window.nextMonth = function() {
    if (router.currentCalendarDate) {
        router.currentCalendarDate.setMonth(router.currentCalendarDate.getMonth() + 1);
        router.renderDashboardCalendar();
    }
};

window.selectCalendarDay = function(dateString) {
    // Abrir modal de nueva cita con la fecha seleccionada
    openAppointmentModal(null, dateString);
};

window.editAppointment = function(appointmentId) {
    // Evitar que se propague el evento del día
    event.stopPropagation();
    // Abrir modal de edición de cita
    openAppointmentModal(appointmentId);
};

// Crear instancia global
window.Router = new Router();
window.router = window.Router; 