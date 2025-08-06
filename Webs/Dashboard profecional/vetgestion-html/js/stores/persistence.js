/**
 * ===================================
 * VetGestión - Store de Persistencia
 * Manejo de localStorage y datos persistentes
 * ===================================
 */

class PersistenceStore {
    constructor() {
        this.prefix = 'vetgestion_';
        this.initialize();
    }

    /**
     * Inicialización del store
     */
    initialize() {
        Logger.info('Inicializando PersistenceStore');
        this.loadInitialData();
        Logger.success('PersistenceStore inicializado');
    }

    /**
     * Carga datos iniciales si no existen
     */
    loadInitialData() {
        // Verificar si es la primera vez que se ejecuta la app
        if (!this.getItem('app_initialized')) {
            this.initializeDefaults();
            this.setItem('app_initialized', true);
            Logger.info('Datos iniciales creados');
        }
    }

    /**
     * Inicializa datos por defecto
     */
    initializeDefaults() {
        // Pacientes de ejemplo
        const defaultPatients = [
            {
                id: 1,
                name: 'Rex',
                species: 'Perro',
                breed: 'Golden Retriever',
                birth_date: '2020-03-15',
                weight: 30,
                gender: 'Macho',
                color: 'Dorado',
                microchip: '123456789012345',
                is_active: true,
                owner: {
                    name: 'Carlos García',
                    phone: '+34 123 456 789',
                    email: 'carlos@email.com',
                    address: 'Calle Principal 123, Madrid'
                },
                medical_history: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Luna',
                species: 'Gato',
                breed: 'Siamés',
                birth_date: '2021-07-08',
                weight: 4,
                gender: 'Hembra',
                color: 'Gris y blanco',
                microchip: '987654321098765',
                is_active: true,
                owner: {
                    name: 'Ana Martínez',
                    phone: '+34 987 654 321',
                    email: 'ana@email.com',
                    address: 'Avenida Libertad 456, Barcelona'
                },
                medical_history: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Rocky',
                species: 'Perro',
                breed: 'Pastor Alemán',
                birth_date: '2019-11-22',
                weight: 35,
                gender: 'Macho',
                color: 'Negro y marrón',
                microchip: '456789123456789',
                is_active: true,
                owner: {
                    name: 'Miguel Torres',
                    phone: '+34 555 123 456',
                    email: 'miguel@email.com',
                    address: 'Plaza Central 789, Valencia'
                },
                medical_history: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        // Citas de ejemplo
        const defaultAppointments = [
            {
                id: 1,
                patient_id: 1,
                patient_name: 'Rex',
                title: 'Consulta rutinaria',
                description: 'Revisión general y vacunas',
                date: DateUtils.formatDateForInput(new Date()),
                time: '10:00',
                duration: 30,
                type: 'consultation',
                status: 'scheduled',
                veterinarian: 'Dr. Laura Fernández',
                notes: '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                patient_id: 2,
                patient_name: 'Luna',
                title: 'Vacunación',
                description: 'Vacuna anual obligatoria',
                date: DateUtils.formatDateForInput(new Date(Date.now() + 86400000)), // Mañana
                time: '11:30',
                duration: 15,
                type: 'vaccination',
                status: 'scheduled',
                veterinarian: 'Dr. Carlos Ruiz',
                notes: '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        // Tratamientos de ejemplo
        const defaultTreatments = [
            {
                id: 1,
                patient_id: 1,
                patient_name: 'Rex',
                name: 'Tratamiento dermatológico',
                type: 'Medicación',
                description: 'Tratamiento para dermatitis alérgica',
                veterinarian: 'Dr. Laura Fernández',
                start_date: DateUtils.formatDateForInput(new Date()),
                end_date: DateUtils.formatDateForInput(new Date(Date.now() + 7 * 86400000)), // 7 días
                status: 'in_progress',
                progress: 30,
                medications: [
                    {
                        name: 'Prednisona',
                        dosage: '5mg',
                        frequency: 'Cada 12 horas',
                        instructions: 'Administrar con comida'
                    }
                ],
                notes: 'Paciente responde bien al tratamiento',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                patient_id: 3,
                patient_name: 'Rocky',
                name: 'Rehabilitación articular',
                type: 'Fisioterapia',
                description: 'Fisioterapia post-cirugía de cadera',
                veterinarian: 'Dr. Carlos Ruiz',
                start_date: DateUtils.formatDateForInput(new Date(Date.now() - 14 * 86400000)), // Hace 14 días
                end_date: DateUtils.formatDateForInput(new Date(Date.now() + 21 * 86400000)), // 21 días más
                status: 'in_progress',
                progress: 60,
                medications: [],
                notes: 'Evolución favorable, continuar con ejercicios',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        // Guardar datos por defecto
        this.savePatients(defaultPatients);
        this.saveAppointments(defaultAppointments);
        this.saveTreatments(defaultTreatments);
    }

    /**
     * Métodos generales de localStorage
     */
    setItem(key, value) {
        return StorageUtils.setItem(this.prefix + key, value);
    }

    getItem(key, defaultValue = null) {
        return StorageUtils.getItem(this.prefix + key, defaultValue);
    }

    removeItem(key) {
        return StorageUtils.removeItem(this.prefix + key);
    }

    clearAllData() {
        try {
            const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
            keys.forEach(key => localStorage.removeItem(key));
            Logger.info('Todos los datos eliminados');
            return true;
        } catch (error) {
            Logger.error('Error limpiando datos', error);
            return false;
        }
    }

    /**
     * === PACIENTES ===
     */
    savePatients(patients) {
        const success = this.setItem('patients', patients);
        if (success) {
            Logger.info(`${patients.length} pacientes guardados`);
            EventUtils.dispatch('patients:updated', { patients });
        }
        return success;
    }

    loadPatients() {
        const patients = this.getItem('patients', []);
        Logger.info(`${patients.length} pacientes cargados`);
        return patients;
    }

    addPatient(patient) {
        const patients = this.loadPatients();
        const newId = Math.max(...patients.map(p => p.id || 0)) + 1;
        
        const newPatient = {
            ...patient,
            id: newId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        patients.push(newPatient);
        this.savePatients(patients);
        
        Logger.success(`Paciente ${newPatient.name} agregado con ID ${newId}`);
        return newPatient;
    }

    updatePatient(id, updatedData) {
        const patients = this.loadPatients();
        const index = patients.findIndex(p => p.id === id);
        
        if (index === -1) {
            Logger.error(`Paciente con ID ${id} no encontrado`);
            return null;
        }

        patients[index] = {
            ...patients[index],
            ...updatedData,
            id, // Mantener ID original
            updated_at: new Date().toISOString()
        };

        this.savePatients(patients);
        Logger.success(`Paciente ${patients[index].name} actualizado`);
        return patients[index];
    }

    deletePatient(id) {
        const patients = this.loadPatients();
        const index = patients.findIndex(p => p.id === id);
        
        if (index === -1) {
            Logger.error(`Paciente con ID ${id} no encontrado`);
            return false;
        }

        const deletedPatient = patients.splice(index, 1)[0];
        this.savePatients(patients);
        
        Logger.success(`Paciente ${deletedPatient.name} eliminado`);
        return true;
    }

    getPatientById(id) {
        const patients = this.loadPatients();
        return patients.find(p => p.id === id) || null;
    }

    /**
     * === CITAS ===
     */
    saveAppointments(appointments) {
        const success = this.setItem('appointments', appointments);
        if (success) {
            Logger.info(`${appointments.length} citas guardadas`);
            EventUtils.dispatch('appointments:updated', { appointments });
        }
        return success;
    }

    loadAppointments() {
        const appointments = this.getItem('appointments', []);
        Logger.info(`${appointments.length} citas cargadas`);
        return appointments;
    }

    addAppointment(appointment) {
        const appointments = this.loadAppointments();
        const newId = Math.max(...appointments.map(a => a.id || 0)) + 1;
        
        const newAppointment = {
            ...appointment,
            id: newId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        appointments.push(newAppointment);
        this.saveAppointments(appointments);
        
        Logger.success(`Cita ${newAppointment.title} agregada con ID ${newId}`);
        return newAppointment;
    }

    updateAppointment(id, updatedData) {
        const appointments = this.loadAppointments();
        const index = appointments.findIndex(a => a.id === id);
        
        if (index === -1) {
            Logger.error(`Cita con ID ${id} no encontrada`);
            return null;
        }

        appointments[index] = {
            ...appointments[index],
            ...updatedData,
            id,
            updated_at: new Date().toISOString()
        };

        this.saveAppointments(appointments);
        Logger.success(`Cita ${appointments[index].title} actualizada`);
        return appointments[index];
    }

    deleteAppointment(id) {
        const appointments = this.loadAppointments();
        const index = appointments.findIndex(a => a.id === id);
        
        if (index === -1) {
            Logger.error(`Cita con ID ${id} no encontrada`);
            return false;
        }

        const deletedAppointment = appointments.splice(index, 1)[0];
        this.saveAppointments(appointments);
        
        Logger.success(`Cita ${deletedAppointment.title} eliminada`);
        return true;
    }

    /**
     * === TRATAMIENTOS ===
     */
    saveTreatments(treatments) {
        const success = this.setItem('treatments', treatments);
        if (success) {
            Logger.info(`${treatments.length} tratamientos guardados`);
            EventUtils.dispatch('treatments:updated', { treatments });
        }
        return success;
    }

    loadTreatments() {
        const treatments = this.getItem('treatments', []);
        Logger.info(`${treatments.length} tratamientos cargados`);
        return treatments;
    }

    addTreatment(treatment) {
        const treatments = this.loadTreatments();
        const newId = Math.max(...treatments.map(t => t.id || 0)) + 1;
        
        const newTreatment = {
            ...treatment,
            id: newId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        treatments.push(newTreatment);
        this.saveTreatments(treatments);
        
        Logger.success(`Tratamiento ${newTreatment.name} agregado con ID ${newId}`);
        return newTreatment;
    }

    updateTreatment(id, updatedData) {
        const treatments = this.loadTreatments();
        const index = treatments.findIndex(t => t.id === id);
        
        if (index === -1) {
            Logger.error(`Tratamiento con ID ${id} no encontrado`);
            return null;
        }

        treatments[index] = {
            ...treatments[index],
            ...updatedData,
            id,
            updated_at: new Date().toISOString()
        };

        this.saveTreatments(treatments);
        Logger.success(`Tratamiento ${treatments[index].name} actualizado`);
        return treatments[index];
    }

    deleteTreatment(id) {
        const treatments = this.loadTreatments();
        const index = treatments.findIndex(t => t.id === id);
        
        if (index === -1) {
            Logger.error(`Tratamiento con ID ${id} no encontrado`);
            return false;
        }

        const deletedTreatment = treatments.splice(index, 1)[0];
        this.saveTreatments(treatments);
        
        Logger.success(`Tratamiento ${deletedTreatment.name} eliminado`);
        return true;
    }

    /**
     * === CONFIGURACIONES ===
     */
    saveSettings(settings) {
        const success = this.setItem('settings', settings);
        if (success) {
            Logger.info('Configuraciones guardadas');
            EventUtils.dispatch('settings:updated', { settings });
        }
        return success;
    }

    loadSettings() {
        return this.getItem('settings', {
            darkMode: false,
            language: 'es',
            notifications: {
                appointments: true,
                treatments: true,
                reminders: true
            },
            theme: 'green'
        });
    }

    /**
     * === USUARIOS ===
     */
    saveUser(user) {
        const success = this.setItem('user', user);
        if (success) {
            Logger.info(`Usuario ${user.name} guardado`);
            EventUtils.dispatch('user:updated', { user });
        }
        return success;
    }

    loadUser() {
        return this.getItem('user', null);
    }

    clearUser() {
        this.removeItem('user');
        Logger.info('Usuario eliminado');
        EventUtils.dispatch('user:cleared');
    }

    /**
     * === MÉTRICAS Y ESTADÍSTICAS ===
     */
    getMetrics() {
        const patients = this.loadPatients();
        const appointments = this.loadAppointments();
        const treatments = this.loadTreatments();

        const activePatients = patients.filter(p => p.is_active !== false).length;
        const scheduledAppointments = appointments.filter(a => a.status === 'scheduled').length;
        const activeTreatments = treatments.filter(t => t.status === 'in_progress').length;

        // Métricas de tiempo
        const todayAppointments = appointments.filter(a => DateUtils.isToday(a.date)).length;
        const weekAppointments = appointments.filter(a => DateUtils.isThisWeek(a.date)).length;
        const completedAppointments = appointments.filter(a => a.status === 'completed').length;

        return {
            patients: activePatients,
            appointments: scheduledAppointments,
            treatments: activeTreatments,
            revenue: '3,250', // Valor simulado
            todayAppointments,
            weekAppointments,
            completedAppointments
        };
    }

    /**
     * === EXPORTACIÓN/IMPORTACIÓN ===
     */
    exportAllData() {
        const data = {
            patients: this.loadPatients(),
            appointments: this.loadAppointments(),
            treatments: this.loadTreatments(),
            settings: this.loadSettings(),
            exported_at: new Date().toISOString(),
            version: '1.0.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `vetgestion-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Logger.success('Datos exportados correctamente');
    }

    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.patients) this.savePatients(data.patients);
            if (data.appointments) this.saveAppointments(data.appointments);
            if (data.treatments) this.saveTreatments(data.treatments);
            if (data.settings) this.saveSettings(data.settings);

            Logger.success('Datos importados correctamente');
            return true;
        } catch (error) {
            Logger.error('Error importando datos', error);
            return false;
        }
    }
}

// Crear instancia global
window.PersistenceStore = new PersistenceStore();

// Exponer métodos principales globalmente para facilitar el acceso
window.persistenceStore = window.PersistenceStore; 