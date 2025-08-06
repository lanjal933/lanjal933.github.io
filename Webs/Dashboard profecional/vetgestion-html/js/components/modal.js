/**
 * ===================================
 * VetGestión - Sistema de Modales
 * ===================================
 */

class ModalManager {
    constructor() {
        this.activeModals = [];
        this.container = null;
        this.initialize();
    }

    initialize() {
        this.container = DOMUtils.$('modal-container') || this.createContainer();
        Logger.info('ModalManager inicializado');
    }

    createContainer() {
        const container = DOMUtils.createElement('div', {
            id: 'modal-container',
            style: 'display: none;'
        });
        document.body.appendChild(container);
        return container;
    }

    show(config) {
        const modal = this.createElement(config);
        this.container.appendChild(modal);
        this.activeModals.push(modal);
        
        // Mostrar
        DOMUtils.show(this.container);
        setTimeout(() => DOMUtils.addClass(modal, 'fade-in'), 10);
        
        return modal;
    }

    close(modal) {
        const index = this.activeModals.indexOf(modal);
        if (index !== -1) {
            this.activeModals.splice(index, 1);
            modal.remove();
            
            if (this.activeModals.length === 0) {
                DOMUtils.hide(this.container);
            }
        }
    }

    createElement(config) {
        const overlay = DOMUtils.createElement('div', {
            className: 'modal-overlay'
        });

        const container = DOMUtils.createElement('div', {
            className: 'modal-container',
            innerHTML: `
                <div class="modal-header">
                    <h3 class="modal-title">${config.title || 'Modal'}</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${config.content || ''}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-cancel">Cancelar</button>
                    <button class="btn btn-primary modal-confirm">Confirmar</button>
                </div>
            `
        });

        overlay.appendChild(container);

        // Event listeners
        overlay.querySelector('.modal-close').onclick = () => this.close(overlay);
        overlay.querySelector('.modal-cancel').onclick = () => this.close(overlay);
        overlay.onclick = (e) => {
            if (e.target === overlay) this.close(overlay);
        };

        return overlay;
    }
}

window.ModalManager = new ModalManager(); 