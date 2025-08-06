/**
 * ===================================
 * VetGestión - Gestor de Panel Lateral
 * Sistema de paneles deslizantes modernos
 * ===================================
 */

class SidePanelManager {
    constructor() {
        this.currentPanel = null;
        this.isOpen = false;
        this.initialize();
    }

    initialize() {
        this.createContainer();
    }

    createContainer() {
        if (!document.getElementById('side-panel-container')) {
            const container = document.createElement('div');
            container.id = 'side-panel-container';
            container.style.display = 'none';
            document.body.appendChild(container);
        }
    }

    show(config) {
        // Cerrar panel existente si hay uno
        if (this.isOpen) {
            this.close();
        }

        const panel = this.createElement(config);
        const container = document.getElementById('side-panel-container');
        
        if (!container) {
            console.error('Container not found');
            return;
        }
        
        container.innerHTML = '';
        container.appendChild(panel);
        container.style.display = 'block';
        
        // Activar animación
        setTimeout(() => {
            const overlay = document.getElementById('side-panel-overlay');
            const panelEl = document.getElementById('side-panel');
            if (overlay) overlay.classList.add('active');
            if (panelEl) panelEl.classList.add('active');
        }, 10);
        
        this.currentPanel = panel;
        this.isOpen = true;
        
        // Setup event listeners
        this.setupEventListeners(config.actions);
        
        // Focus en el primer input
        setTimeout(() => {
            const firstInput = panel.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 400);
    }

    close() {
        if (!this.isOpen) return;
        
        const overlay = document.getElementById('side-panel-overlay');
        const panel = document.getElementById('side-panel');
        
        if (overlay) overlay.classList.remove('active');
        if (panel) panel.classList.remove('active');
        
        setTimeout(() => {
            const container = document.getElementById('side-panel-container');
            if (container) {
                container.style.display = 'none';
                container.innerHTML = '';
            }
            this.currentPanel = null;
            this.isOpen = false;
        }, 400);
    }

    createElement(config) {
        const {
            title = '',
            subtitle = '',
            content = '',
            actions = [],
            icon = ''
        } = config;

        const panel = document.createElement('div');
        panel.innerHTML = `
            <div class="side-panel-overlay" id="side-panel-overlay"></div>
            <div class="side-panel" id="side-panel">
                <div class="side-panel-header">
                    <h2 class="side-panel-title">
                        ${icon ? `<span class="icon mr-2">${icon}</span>` : ''}
                        ${title}
                    </h2>
                    ${subtitle ? `<p class="side-panel-subtitle">${subtitle}</p>` : ''}
                    <button class="side-panel-close" data-panel-close>
                        ✕
                    </button>
                </div>
                <div class="side-panel-body">
                    <div class="side-panel-content">
                        ${content}
                    </div>
                </div>
                ${actions.length > 0 ? `
                    <div class="side-panel-footer">
                        ${actions.map((action, index) => `
                            <button 
                                class="${action.class || 'btn btn-secondary'}" 
                                ${action.action === 'close' ? 'data-panel-close' : `data-panel-action="${index}"`}
                                ${action.disabled ? 'disabled' : ''}
                                ${action.id ? `id="${action.id}"` : ''}
                            >
                                ${action.icon ? `<span class="icon mr-1">${action.icon}</span>` : ''}
                                ${action.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        return panel;
    }



    setupEventListeners(actions = []) {
        // Cerrar al hacer clic en overlay
        const overlay = document.getElementById('side-panel-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.close();
            });
        }

        // Cerrar con botones de cerrar
        const closeButtons = document.querySelectorAll('[data-panel-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.close();
            });
        });

        // Manejar botones de acción
        const actionButtons = document.querySelectorAll('[data-panel-action]');
        actionButtons.forEach(btn => {
            const actionIndex = parseInt(btn.getAttribute('data-panel-action'));
            const action = actions[actionIndex];
            if (action && typeof action.action === 'function') {
                btn.addEventListener('click', () => {
                    action.action();
                });
            }
        });

        // Cerrar con Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    showLoading() {
        if (!this.isOpen) return;
        
        const panel = document.getElementById('side-panel');
        const body = panel ? panel.querySelector('.side-panel-body') : null;
        if (body && !body.querySelector('.side-panel-loading')) {
            const loading = document.createElement('div');
            loading.className = 'side-panel-loading';
            loading.innerHTML = `
                <div class="flex flex-col items-center">
                    <div class="loading-spinner mb-4"></div>
                    <p class="text-neutral-600 dark:text-neutral-400">Guardando...</p>
                </div>
            `;
            body.appendChild(loading);
        }
    }

    hideLoading() {
        if (!this.isOpen) return;
        
        const loading = document.querySelector('.side-panel-loading');
        if (loading) {
            loading.remove();
        }
    }
}

// Crear instancia global
window.SidePanelManager = SidePanelManager;
window.sidePanelManager = new SidePanelManager();

Logger.info('🏁 SidePanelManager cargado'); 