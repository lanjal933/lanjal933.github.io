// ==========================================================================
// Sistema de Autenticación - Portfolio Marcelo
// ==========================================================================

/**
 * Gestor de Autenticación
 * Nota: Esta es una implementación placeholder preparada para integración real
 */
class AuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.adminCredentials = {
      name: 'Benjamin Rocco',
      password: 'BenjaMarcePau',
      email: 'benjaminroccoherrera@gmail.com',
      role: 'admin'
    };
    
    this.init();
  }
  
  init() {
    this.loadStoredAuth();
    this.bindEvents();
    this.updateUI();
    console.log('Auth system initialized');
  }
  
  bindEvents() {
    // Botón de login/logout
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
      authBtn.addEventListener('click', () => {
        if (this.isAuthenticated) {
          this.showUserMenu();
        } else {
          this.showLoginModal();
        }
      });
    }
    
    // Botón para agregar testimonio
    const addTestimonialBtn = document.getElementById('add-testimonial-btn');
    if (addTestimonialBtn) {
      addTestimonialBtn.addEventListener('click', () => {
        if (this.isAuthenticated) {
          this.showTestimonialForm();
        } else {
          this.showLoginModal();
        }
      });
    }
  }
  
  /**
   * Cargar autenticación almacenada
   */
  loadStoredAuth() {
    try {
      const storedAuth = localStorage.getItem('portfolio-auth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        if (this.validateStoredAuth(authData)) {
          this.isAuthenticated = true;
          this.currentUser = authData.user;
        }
      }
    } catch (error) {
      console.warn('Error loading stored auth:', error);
      this.clearStoredAuth();
    }
  }
  
  /**
   * Validar autenticación almacenada
   */
  validateStoredAuth(authData) {
    if (!authData.user || !authData.timestamp) return false;
    
    // Verificar que no haya expirado (24 horas)
    const expirationTime = 24 * 60 * 60 * 1000; // 24 horas
    const isExpired = (Date.now() - authData.timestamp) > expirationTime;
    
    if (isExpired) {
      this.clearStoredAuth();
      return false;
    }
    
    return true;
  }
  
  /**
   * Guardar autenticación
   */
  saveAuth(user) {
    const authData = {
      user: user,
      timestamp: Date.now()
    };
    
    localStorage.setItem('portfolio-auth', JSON.stringify(authData));
    this.isAuthenticated = true;
    this.currentUser = user;
    this.updateUI();
  }
  
  /**
   * Limpiar autenticación
   */
  clearStoredAuth() {
    localStorage.removeItem('portfolio-auth');
    this.isAuthenticated = false;
    this.currentUser = null;
    this.updateUI();
  }
  
  /**
   * Mostrar modal de login
   */
  showLoginModal() {
    const modal = this.createLoginModal();
    document.body.appendChild(modal);
    
    // Mostrar modal
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Focus en primer campo
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }
  
  /**
   * Crear modal de login
   */
  createLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay auth-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Acceder a tu cuenta</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="auth-options">
            <div class="auth-section">
              <h4>Iniciar sesión con Google</h4>
              <button class="btn btn-primary google-auth-btn" disabled>
                <span class="btn-icon">🔐</span>
                Próximamente - Google OAuth
              </button>
              <p class="auth-note">La autenticación con Google será implementada próximamente</p>
            </div>
            
            <div class="auth-divider">
              <span>O accede como administrador</span>
            </div>
            
            <div class="auth-section">
              <form class="admin-login-form">
                <div class="form-group">
                  <label for="admin-email">Email del administrador</label>
                  <input 
                    type="email" 
                    id="admin-email" 
                    placeholder="benjaminroccoherrera@gmail.com"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="admin-password">Contraseña</label>
                  <input 
                    type="password" 
                    id="admin-password" 
                    placeholder="Contraseña del administrador"
                    required
                  >
                </div>
                
                <button type="submit" class="btn btn-primary">
                  <span class="btn-icon">👑</span>
                  Acceder como Admin
                </button>
              </form>
            </div>
            
            <div class="auth-section">
              <h4>Usuario Demo</h4>
              <button class="btn btn-secondary demo-user-btn">
                <span class="btn-icon">👤</span>
                Acceder como Usuario Demo
              </button>
              <p class="auth-note">Para probar la funcionalidad de testimonios</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Event listeners
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.closeModal(modal));
    
    const adminForm = modal.querySelector('.admin-login-form');
    adminForm.addEventListener('submit', (e) => this.handleAdminLogin(e, modal));
    
    const demoBtn = modal.querySelector('.demo-user-btn');
    demoBtn.addEventListener('click', () => this.loginAsDemoUser(modal));
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal(modal);
    });
    
    return modal;
  }
  
  /**
   * Manejar login de administrador
   */
  handleAdminLogin(event, modal) {
    event.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      const adminUser = {
        name: this.adminCredentials.name,
        email: this.adminCredentials.email,
        role: 'admin',
        avatar: '👑'
      };
      
      this.saveAuth(adminUser);
      this.closeModal(modal);
      this.showSuccessMessage('¡Bienvenido, Administrador!');
    } else {
      this.showErrorMessage('Credenciales de administrador incorrectas');
    }
  }
  
  /**
   * Login como usuario demo
   */
  loginAsDemoUser(modal) {
    const demoUser = {
      name: 'Usuario Demo',
      email: 'demo@portfolio.com',
      role: 'user',
      avatar: '👤'
    };
    
    this.saveAuth(demoUser);
    this.closeModal(modal);
    this.showSuccessMessage('¡Bienvenido! Ahora puedes dejar testimonios.');
  }
  
  /**
   * Mostrar menú de usuario
   */
  showUserMenu() {
    const menu = this.createUserMenu();
    document.body.appendChild(menu);
    
    setTimeout(() => menu.classList.add('active'), 10);
  }
  
  /**
   * Crear menú de usuario
   */
  createUserMenu() {
    const menu = document.createElement('div');
    menu.className = 'modal-overlay user-menu';
    menu.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Mi Cuenta</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-info">
            <div class="user-avatar">${this.currentUser.avatar}</div>
            <div class="user-details">
              <h4>${this.currentUser.name}</h4>
              <p>${this.currentUser.email}</p>
              <span class="user-role">${this.currentUser.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
          
          <div class="user-actions">
            ${this.currentUser.role === 'admin' ? `
              <button class="btn btn-primary admin-panel-btn">
                <span class="btn-icon">⚙️</span>
                Panel de Administración
              </button>
            ` : ''}
            
            <button class="btn btn-secondary profile-settings-btn">
              <span class="btn-icon">👤</span>
              Configurar Perfil
            </button>
            
            <button class="btn btn-outline logout-btn">
              <span class="btn-icon">🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Event listeners
    const closeBtn = menu.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.closeModal(menu));
    
    const logoutBtn = menu.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
      this.logout();
      this.closeModal(menu);
    });
    
    const adminPanelBtn = menu.querySelector('.admin-panel-btn');
    if (adminPanelBtn) {
      adminPanelBtn.addEventListener('click', () => {
        this.showAdminPanel();
        this.closeModal(menu);
      });
    }
    
    const profileBtn = menu.querySelector('.profile-settings-btn');
    profileBtn.addEventListener('click', () => {
      this.showProfileSettings();
      this.closeModal(menu);
    });
    
    menu.addEventListener('click', (e) => {
      if (e.target === menu) this.closeModal(menu);
    });
    
    return menu;
  }
  
  /**
   * Cerrar sesión
   */
  logout() {
    this.clearStoredAuth();
    this.showSuccessMessage('Sesión cerrada correctamente');
  }
  
  /**
   * Mostrar panel de administración
   */
  showAdminPanel() {
    if (this.currentUser?.role !== 'admin') {
      this.showErrorMessage('Acceso denegado: Se requieren permisos de administrador');
      return;
    }
    
    console.log('Showing admin panel...');
    this.showSuccessMessage('Panel de administración (En desarrollo)');
  }
  
  /**
   * Mostrar configuración de perfil
   */
  showProfileSettings() {
    console.log('Showing profile settings...');
    this.showSuccessMessage('Configuración de perfil (En desarrollo)');
  }
  
  /**
   * Mostrar formulario de testimonio
   */
  showTestimonialForm() {
    if (!this.isAuthenticated) {
      this.showLoginModal();
      return;
    }
    
    const form = this.createTestimonialForm();
    document.body.appendChild(form);
    
    setTimeout(() => form.classList.add('active'), 10);
  }
  
  /**
   * Crear formulario de testimonio
   */
  createTestimonialForm() {
    const form = document.createElement('div');
    form.className = 'modal-overlay testimonial-form';
    form.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Dejar un Testimonio</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form class="testimonial-form-content">
            <div class="form-group">
              <label for="testimonial-rating">Puntuación (1-5 estrellas)</label>
              <div class="rating-input">
                ${[1,2,3,4,5].map(i => `
                  <input type="radio" id="star-${i}" name="rating" value="${i}" ${i === 5 ? 'checked' : ''}>
                  <label for="star-${i}" class="star-label">⭐</label>
                `).join('')}
              </div>
            </div>
            
            <div class="form-group">
              <label for="testimonial-text">Tu testimonio</label>
              <textarea 
                id="testimonial-text" 
                placeholder="Comparte tu experiencia trabajando con Marcelo..."
                rows="4"
                maxlength="500"
                required
              ></textarea>
              <small class="char-counter">0/500 caracteres</small>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary cancel-btn">Cancelar</button>
              <button type="submit" class="btn btn-primary">
                <span class="btn-icon">💬</span>
                Publicar Testimonio
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    // Event listeners
    const closeBtn = form.querySelector('.modal-close');
    const cancelBtn = form.querySelector('.cancel-btn');
    const testimonialForm = form.querySelector('.testimonial-form-content');
    const textArea = form.querySelector('#testimonial-text');
    const charCounter = form.querySelector('.char-counter');
    
    closeBtn.addEventListener('click', () => this.closeModal(form));
    cancelBtn.addEventListener('click', () => this.closeModal(form));
    
    textArea.addEventListener('input', (e) => {
      charCounter.textContent = `${e.target.value.length}/500 caracteres`;
    });
    
    testimonialForm.addEventListener('submit', (e) => this.handleTestimonialSubmit(e, form));
    
    form.addEventListener('click', (e) => {
      if (e.target === form) this.closeModal(form);
    });
    
    return form;
  }
  
  /**
   * Manejar envío de testimonio
   */
  handleTestimonialSubmit(event, modal) {
    event.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const text = document.getElementById('testimonial-text').value;
    
    if (!text.trim()) {
      this.showErrorMessage('Por favor, escribe tu testimonio');
      return;
    }
    
    const testimonial = {
      id: Date.now(),
      user: this.currentUser,
      rating: parseInt(rating),
      text: text.trim(),
      timestamp: new Date().toISOString()
    };
    
    this.saveTestimonial(testimonial);
    this.closeModal(modal);
    this.showSuccessMessage('¡Gracias por tu testimonio!');
  }
  
  /**
   * Guardar testimonio
   */
  saveTestimonial(testimonial) {
    try {
      const testimonials = JSON.parse(localStorage.getItem('portfolio-testimonials') || '[]');
      testimonials.push(testimonial);
      localStorage.setItem('portfolio-testimonials', JSON.stringify(testimonials));
      
      // Actualizar la UI de testimonios
      this.updateTestimonialsDisplay();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      this.showErrorMessage('Error al guardar el testimonio');
    }
  }
  
  /**
   * Actualizar display de testimonios
   */
  updateTestimonialsDisplay() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;
    
    try {
      const testimonials = JSON.parse(localStorage.getItem('portfolio-testimonials') || '[]');
      
      if (testimonials.length === 0) return;
      
      // Remover placeholder
      const placeholder = testimonialsGrid.querySelector('.testimonial-placeholder');
      if (placeholder) placeholder.remove();
      
      // Mostrar testimonios
      testimonials.forEach(testimonial => {
        if (!document.querySelector(`[data-testimonial-id="${testimonial.id}"]`)) {
          const testimonialCard = this.createTestimonialCard(testimonial);
          testimonialsGrid.appendChild(testimonialCard);
        }
      });
    } catch (error) {
      console.error('Error updating testimonials display:', error);
    }
  }
  
  /**
   * Crear tarjeta de testimonio
   */
  createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('data-testimonial-id', testimonial.id);
    card.innerHTML = `
      <div class="testimonial-rating">
        ${[1,2,3,4,5].map(i => `
          <span class="star ${i <= testimonial.rating ? '' : 'empty'}">⭐</span>
        `).join('')}
      </div>
      <p class="testimonial-text">"${testimonial.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${testimonial.user.avatar}</div>
        <div class="author-info">
          <h4>${testimonial.user.name}</h4>
          <p>Cliente</p>
        </div>
        ${this.currentUser?.role === 'admin' ? `
          <button class="delete-testimonial-btn" data-testimonial-id="${testimonial.id}">
            🗑️
          </button>
        ` : ''}
      </div>
    `;
    
    // Event listener para eliminar (solo admin)
    const deleteBtn = card.querySelector('.delete-testimonial-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => this.deleteTestimonial(testimonial.id));
    }
    
    return card;
  }
  
  /**
   * Eliminar testimonio (solo admin)
   */
  deleteTestimonial(testimonialId) {
    if (this.currentUser?.role !== 'admin') {
      this.showErrorMessage('Solo los administradores pueden eliminar testimonios');
      return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar este testimonio?')) {
      try {
        const testimonials = JSON.parse(localStorage.getItem('portfolio-testimonials') || '[]');
        const filteredTestimonials = testimonials.filter(t => t.id !== testimonialId);
        localStorage.setItem('portfolio-testimonials', JSON.stringify(filteredTestimonials));
        
        // Remover de la UI
        const testimonialCard = document.querySelector(`[data-testimonial-id="${testimonialId}"]`);
        if (testimonialCard) {
          testimonialCard.remove();
        }
        
        this.showSuccessMessage('Testimonio eliminado');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        this.showErrorMessage('Error al eliminar el testimonio');
      }
    }
  }
  
  /**
   * Actualizar UI según estado de autenticación
   */
  updateUI() {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;
    
    const authText = authBtn.querySelector('.auth-text');
    const authIcon = authBtn.querySelector('.auth-icon');
    
    if (this.isAuthenticated && this.currentUser) {
      authText.textContent = this.currentUser.name;
      authIcon.textContent = this.currentUser.avatar;
      authBtn.classList.add('authenticated');
    } else {
      authText.textContent = 'Cuenta';
      authIcon.textContent = '👤';
      authBtn.classList.remove('authenticated');
    }
    
    // Cargar testimonios existentes
    this.updateTestimonialsDisplay();
  }
  
  /**
   * Cerrar modal
   */
  closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      if (modal.parentElement) {
        modal.parentElement.removeChild(modal);
      }
    }, 300);
  }
  
  /**
   * Mostrar mensaje de éxito
   */
  showSuccessMessage(message) {
    this.showToast(message, 'success');
  }
  
  /**
   * Mostrar mensaje de error
   */
  showErrorMessage(message) {
    this.showToast(message, 'error');
  }
  
  /**
   * Mostrar toast notification
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// CSS para componentes de autenticación
const authStyles = `
  .auth-modal .modal-content {
    max-width: 500px;
  }
  
  .auth-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }
  
  .auth-section {
    text-align: center;
  }
  
  .auth-section h4 {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }
  
  .auth-note {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-top: var(--spacing-sm);
  }
  
  .auth-divider {
    text-align: center;
    position: relative;
    margin: var(--spacing-lg) 0;
  }
  
  .auth-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border);
  }
  
  .auth-divider span {
    background: var(--color-bg-primary);
    padding: 0 var(--spacing-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  .form-group {
    margin-bottom: var(--spacing-lg);
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    font-size: var(--font-size-base);
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .rating-input {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
  }
  
  .rating-input input {
    display: none;
  }
  
  .star-label {
    font-size: var(--font-size-2xl);
    cursor: pointer;
    opacity: 0.3;
    transition: opacity var(--transition-fast);
  }
  
  .rating-input input:checked ~ .star-label,
  .rating-input input:checked + .star-label {
    opacity: 1;
  }
  
  .char-counter {
    display: block;
    text-align: right;
    margin-top: var(--spacing-xs);
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
  }
  
  .form-actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
    margin-top: var(--spacing-xl);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
  }
  
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius-full);
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-2xl);
  }
  
  .user-details h4 {
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-primary);
  }
  
  .user-details p {
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-secondary);
  }
  
  .user-role {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    padding: 2px var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
  }
  
  .user-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .delete-testimonial-btn {
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--transition-fast);
    margin-left: auto;
  }
  
  .delete-testimonial-btn:hover {
    opacity: 1;
  }
  
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius-md);
    color: var(--color-text-inverse);
    font-weight: var(--font-weight-medium);
    z-index: var(--z-toast);
    transform: translateX(100%);
    transition: transform var(--transition-normal);
  }
  
  .toast.show {
    transform: translateX(0);
  }
  
  .toast-success {
    background: var(--color-success);
  }
  
  .toast-error {
    background: var(--color-error);
  }
  
  .toast-info {
    background: var(--color-info);
  }
  
  .auth-btn.authenticated {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-color: var(--color-primary);
  }
  
  @media (max-width: 768px) {
    .auth-modal .modal-content {
      width: 95%;
      max-width: none;
    }
    
    .form-actions {
      flex-direction: column;
    }
    
    .user-info {
      flex-direction: column;
      text-align: center;
    }
  }
`;

// Inyectar estilos
const authStyleSheet = document.createElement('style');
authStyleSheet.textContent = authStyles;
document.head.appendChild(authStyleSheet);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
  });
} else {
  window.authManager = new AuthManager();
}

// Export para uso externo
window.AuthManager = AuthManager; 