// ==========================================================================
// Animaciones Avanzadas - Portfolio Marcelo
// ==========================================================================

/**
 * Animaciones avanzadas y efectos visuales
 */
class AdvancedAnimations {
  constructor() {
    this.initialized = false;
    this.animationFrameId = null;
    this.particles = [];
    this.mousePosition = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    if (this.initialized) return;
    
    this.bindEvents();
    this.initParallaxElements();
    this.initMagneticElements();
    this.initTypingAnimations();
    this.initParticleSystem();
    
    this.initialized = true;
    console.log('Advanced animations initialized');
  }
  
  bindEvents() {
    // Mouse tracking para efectos interactivos
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.updateMagneticElements(e);
    });
    
    // Parallax en scroll
    window.addEventListener('scroll', () => {
      this.updateParallaxElements();
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  
  /**
   * Elementos con efecto parallax
   */
  initParallaxElements() {
    this.parallaxElements = document.querySelectorAll('[data-parallax]');
  }
  
  updateParallaxElements() {
    const scrollY = window.pageYOffset;
    
    this.parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  /**
   * Elementos magnéticos (siguen el cursor)
   */
  initMagneticElements() {
    this.magneticElements = document.querySelectorAll('[data-magnetic]');
  }
  
  updateMagneticElements(e) {
    this.magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const maxDistance = 100;
      const strength = Math.max(0, 1 - distance / maxDistance);
      
      if (strength > 0) {
        const moveX = deltaX * strength * 0.3;
        const moveY = deltaY * strength * 0.3;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = 'translate(0px, 0px)';
      }
    });
  }
  
  /**
   * Animaciones de tipeo
   */
  initTypingAnimations() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed) || 100;
      const delay = parseInt(element.dataset.typingDelay) || 0;
      
      element.textContent = '';
      element.style.borderRight = '2px solid var(--color-primary)';
      element.style.paddingRight = '4px';
      
      setTimeout(() => {
        this.typeText(element, text, speed);
      }, delay);
    });
  }
  
  typeText(element, text, speed) {
    let index = 0;
    
    const typeInterval = setInterval(() => {
      element.textContent += text[index];
      index++;
      
      if (index >= text.length) {
        clearInterval(typeInterval);
        // Remover cursor después de un tiempo
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 2000);
      }
    }, speed);
  }
  
  /**
   * Sistema de partículas interactivo
   */
  initParticleSystem() {
    const particleContainer = document.querySelector('.hero-section');
    if (!particleContainer) return;
    
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    particleContainer.style.position = 'relative';
    particleContainer.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.createParticles();
    this.animateParticles();
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }
  
  animateParticles() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Actualizar y dibujar partículas
    this.particles.forEach((particle, index) => {
      // Movimiento
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Rebote en bordes
      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.vy *= -1;
      }
      
      // Mantener dentro del canvas
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Interacción con el mouse
      const mouseDistance = Math.sqrt(
        (this.mousePosition.x - particle.x) ** 2 + 
        (this.mousePosition.y - particle.y) ** 2
      );
      
      if (mouseDistance < 100) {
        const force = (100 - mouseDistance) / 100;
        const angle = Math.atan2(
          particle.y - this.mousePosition.y,
          particle.x - this.mousePosition.x
        );
        particle.vx += Math.cos(angle) * force * 0.02;
        particle.vy += Math.sin(angle) * force * 0.02;
      }
      
      // Dibujar partícula
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
      this.ctx.fill();
      
      // Conectar partículas cercanas
      for (let j = index + 1; j < this.particles.length; j++) {
        const other = this.particles[j];
        const distance = Math.sqrt(
          (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
        );
        
        if (distance < 80) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance / 80)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });
    
    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }
  
  /**
   * Animaciones de elementos con scroll
   */
  static initScrollAnimations() {
    const elements = document.querySelectorAll('[data-scroll-animation]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.scrollAnimation;
          entry.target.classList.add(`animate-${animation}`);
          
          // Añadir delay si está especificado
          const delay = entry.target.dataset.animationDelay;
          if (delay) {
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
  }
  
  /**
   * Efecto de cursor personalizado
   */
  static initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);
    
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    
    // Animación suave para el outline
    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;
      
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Efectos hover
    const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }
  
  /**
   * Cleanup al destruir
   */
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    
    this.initialized = false;
  }
  
  /**
   * Handle resize
   */
  handleResize() {
    if (this.canvas) {
      this.resizeCanvas();
      this.createParticles();
    }
  }
}

/**
 * CSS para animaciones (se inyecta dinámicamente)
 */
const animationStyles = `
  .custom-cursor {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
  }
  
  .cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  .cursor-outline {
    width: 32px;
    height: 32px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  }
  
  .cursor-hover .cursor-dot {
    width: 16px;
    height: 16px;
  }
  
  .cursor-hover .cursor-outline {
    width: 48px;
    height: 48px;
    opacity: 0.3;
  }
  
  @keyframes animate-fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes animate-fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes animate-fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes animate-scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeInUp {
    animation: animate-fadeInUp 0.8s ease-out forwards;
  }
  
  .animate-fadeInLeft {
    animation: animate-fadeInLeft 0.8s ease-out forwards;
  }
  
  .animate-fadeInRight {
    animation: animate-fadeInRight 0.8s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: animate-scaleIn 0.8s ease-out forwards;
  }
  
  /* Desactivar cursor personalizado en móviles */
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar en desktop para mejor rendimiento
    if (window.innerWidth > 768) {
      window.advancedAnimations = new AdvancedAnimations();
      AdvancedAnimations.initCustomCursor();
    }
    
    AdvancedAnimations.initScrollAnimations();
  });
} else {
  if (window.innerWidth > 768) {
    window.advancedAnimations = new AdvancedAnimations();
    AdvancedAnimations.initCustomCursor();
  }
  
  AdvancedAnimations.initScrollAnimations();
}

// Cleanup en beforeunload
window.addEventListener('beforeunload', () => {
  if (window.advancedAnimations) {
    window.advancedAnimations.destroy();
  }
});

// Export para uso externo
window.AdvancedAnimations = AdvancedAnimations; 