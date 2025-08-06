/**
 * ===================================
 * VetGestión - Utilidades JavaScript
 * Helpers y funciones comunes
 * ===================================
 */

/**
 * Utilidades de fecha y tiempo
 */
const DateUtils = {
    /**
     * Formatea una fecha a string legible en español
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Date(date).toLocaleDateString('es-ES', { ...defaultOptions, ...options });
    },

    /**
     * Formatea una fecha para inputs de tipo date
     */
    formatDateForInput(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Obtiene la hora actual formateada
     */
    getCurrentTime() {
        return new Date().toLocaleTimeString('es-ES');
    },

    /**
     * Calcula la edad en años
     */
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    },

    /**
     * Verifica si una fecha es hoy
     */
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return checkDate.toDateString() === today.toDateString();
    },

    /**
     * Verifica si una fecha está en esta semana
     */
    isThisWeek(date) {
        const today = new Date();
        const checkDate = new Date(date);
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        
        return checkDate >= startOfWeek && checkDate <= endOfWeek;
    }
};

/**
 * Utilidades de validación
 */
const ValidationUtils = {
    /**
     * Valida un email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Valida un teléfono (formato español)
     */
    isValidPhone(phone) {
        const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    /**
     * Valida que un campo no esté vacío
     */
    isRequired(value) {
        return value !== null && value !== undefined && String(value).trim() !== '';
    },

    /**
     * Valida longitud mínima
     */
    minLength(value, min) {
        return String(value).length >= min;
    },

    /**
     * Valida longitud máxima
     */
    maxLength(value, max) {
        return String(value).length <= max;
    },

    /**
     * Valida que sea un número
     */
    isNumber(value) {
        return !isNaN(value) && isFinite(value);
    },

    /**
     * Valida que sea un número positivo
     */
    isPositiveNumber(value) {
        return this.isNumber(value) && Number(value) > 0;
    }
};

/**
 * Utilidades de formato
 */
const FormatUtils = {
    /**
     * Capitaliza la primera letra
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    /**
     * Obtiene las iniciales de un nombre
     */
    getInitials(name) {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    },

    /**
     * Formatea un número como moneda
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },

    /**
     * Formatea un teléfono
     */
    formatPhone(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 9) {
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        }
        return phone;
    },

    /**
     * Trunca un texto con puntos suspensivos
     */
    truncate(text, maxLength = 50) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
};

/**
 * Utilidades DOM
 */
const DOMUtils = {
    /**
     * Encuentra un elemento por ID
     */
    $(id) {
        return document.getElementById(id);
    },

    /**
     * Encuentra elementos por selector
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Crea un elemento HTML
     */
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Establecer atributos
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Agregar hijos
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },

    /**
     * Muestra/oculta elementos
     */
    show(element) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.style.display = '';
    },

    hide(element) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.style.display = 'none';
    },

    /**
     * Agrega/quita clases
     */
    addClass(element, className) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.add(className);
    },

    removeClass(element, className) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.remove(className);
    },

    /**
     * Toggle de clases
     */
    toggleClass(element, className) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.toggle(className);
    },

    /**
     * Limpia el contenido de un elemento
     */
    clearContent(element) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.innerHTML = '';
    }
};

/**
 * Utilidades de almacenamiento
 */
const StorageUtils = {
    /**
     * Guarda datos en localStorage con manejo de errores
     */
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    },

    /**
     * Obtiene datos de localStorage con manejo de errores
     */
    getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Elimina un elemento de localStorage
     */
    removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    },

    /**
     * Limpia todo el localStorage de la app
     */
    clearAppData() {
        try {
            const keys = Object.keys(localStorage).filter(key => key.startsWith('vetgestion_'));
            keys.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
            return false;
        }
    }
};

/**
 * Utilidades de eventos
 */
const EventUtils = {
    /**
     * Debounce de funciones
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle de funciones
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Dispatch de eventos customizados
     */
    dispatch(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    },

    /**
     * Listener de eventos customizados
     */
    listen(eventName, callback) {
        document.addEventListener(eventName, callback);
        return () => document.removeEventListener(eventName, callback);
    }
};

/**
 * Utilidades de URL y navegación
 */
const URLUtils = {
    /**
     * Obtiene parámetros de la URL
     */
    getURLParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },

    /**
     * Obtiene el hash actual
     */
    getCurrentHash() {
        return window.location.hash.slice(1) || '/';
    },

    /**
     * Navega a una ruta
     */
    navigateTo(path) {
        window.location.hash = path;
    },

    /**
     * Actualiza la URL sin navegar
     */
    updateURL(path) {
        history.replaceState(null, null, `#${path}`);
    }
};

/**
 * Utilidades de carga y performance
 */
const LoadUtils = {
    /**
     * Simula delay para testing
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Carga una imagen de forma async
     */
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },

    /**
     * Verifica si el usuario está online
     */
    isOnline() {
        return navigator.onLine;
    },

    /**
     * Detecta dispositivo móvil
     */
    isMobile() {
        return window.innerWidth <= 768;
    }
};

/**
 * Utilidades de logging
 */
const Logger = {
    /**
     * Log con timestamp y emoji
     */
    log(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`🟢 [${timestamp}] ${message}`, data || '');
    },

    error(message, error = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.error(`🔴 [${timestamp}] ${message}`, error || '');
    },

    warn(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.warn(`🟡 [${timestamp}] ${message}`, data || '');
    },

    info(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.info(`🔵 [${timestamp}] ${message}`, data || '');
    },

    success(message, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`✅ [${timestamp}] ${message}`, data || '');
    }
};

// Exponer utilidades globalmente
window.DateUtils = DateUtils;
window.ValidationUtils = ValidationUtils;
window.FormatUtils = FormatUtils;
window.DOMUtils = DOMUtils;
window.StorageUtils = StorageUtils;
window.EventUtils = EventUtils;
window.URLUtils = URLUtils;
window.LoadUtils = LoadUtils;
window.Logger = Logger;

Logger.success('Utilidades VetGestión cargadas correctamente'); 