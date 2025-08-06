/**
 * ===================================
 * VetGestión - Store de Pacientes
 * ===================================
 */

class PatientsStore {
    constructor() {
        this.patients = [];
        this.initialize();
    }

    initialize() {
        this.patients = persistenceStore.loadPatients();
        Logger.info('PatientsStore inicializado');
    }

    getAll() {
        return this.patients;
    }

    getById(id) {
        return this.patients.find(p => p.id === id);
    }

    create(patientData) {
        return persistenceStore.addPatient(patientData);
    }

    update(id, data) {
        return persistenceStore.updatePatient(id, data);
    }

    delete(id) {
        return persistenceStore.deletePatient(id);
    }

    search(query) {
        return this.patients.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.owner.name.toLowerCase().includes(query.toLowerCase())
        );
    }
}

window.PatientsStore = new PatientsStore();
window.patientsStore = window.PatientsStore; 