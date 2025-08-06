/**
 * EstudioPixelArte - Datos del E-commerce
 * Migrado de Laravel a JavaScript para funcionalidad estática
 */

// Categorías de productos
const CATEGORIES = [
    {
        id: 1,
        name: 'Posters Bohemios',
        slug: 'posters-bohemios',
        description: 'Posters con estética bohemia y estilo vintage para decorar tus espacios con personalidad única',
        image: 'https://images.unsplash.com/photo-1446904982876-9b7c7e0ec5f5?w=400&h=300&fit=crop&crop=center',
        icon: '🌙',
        color: 'rose',
        isActive: true
    },
    {
        id: 2,
        name: 'Arte Floral',
        slug: 'arte-floral',
        description: 'Ilustraciones delicadas de flores, plantas y elementos naturales en acuarela minimalista',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&crop=center',
        icon: '🌸',
        color: 'sage',
        isActive: true
    },
    {
        id: 3,
        name: 'Mandalas y Patrones',
        slug: 'mandalas-patrones',
        description: 'Diseños sagrados, mandalas y patrones geométricos espirituales para meditación y armonía',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
        icon: '🕸️',
        color: 'lavender',
        isActive: true
    },
    {
        id: 4,
        name: 'Frases Inspiradoras',
        slug: 'frases-inspiradoras',
        description: 'Tipografías motivacionales y frases que elevan el espíritu para llenar tus espacios de energía positiva',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop&crop=center',
        icon: '✨',
        color: 'accent-gold',
        isActive: true
    },
    {
        id: 5,
        name: 'Plantillas Imprimibles',
        slug: 'plantillas-imprimibles',
        description: 'Agendas, calendarios y plantillas versátiles personalizables para organizar tu día a día con estilo',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&crop=center',
        icon: '📋',
        color: 'cream',
        isActive: true
    },
    {
        id: 6,
        name: 'Arte Abstracto',
        slug: 'arte-abstracto',
        description: 'Formas orgánicas y diseños contemporáneos en tonos naturales para espacios modernos y sofisticados',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        icon: '🎨',
        color: 'earth',
        isActive: true
    }
];

// Productos
const PRODUCTS = [
    {
        id: 1,
        categoryId: 1,
        name: 'Luna Dorada Bohemia',
        slug: 'luna-dorada-bohemia',
        description: 'Un hermoso poster de luna en tonos dorados y crema, perfecto para crear un ambiente místico y bohemio en tu hogar. Diseño minimalista con elementos celestiales que aportan serenidad y magia a cualquier espacio.',
        shortDescription: 'Poster bohemio de luna dorada con estética minimalista',
        price: 15.99,
        originalPrice: 19.99,
        image: 'https://images.unsplash.com/photo-1446904982876-9b7c7e0ec5f5?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1446904982876-9b7c7e0ec5f5?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1611435175312-832c5da6dc7c?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/luna_dorada_bohemia.pdf',
        fileName: 'Luna Dorada Bohemia.PDF',
        fileSize: 2048000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '30x40 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Vertical'
        },
        tags: ['luna', 'bohemio', 'dorado', 'minimalista', 'celestial'],
        isFeatured: true,
        isActive: true,
        downloadCount: 108,
        viewCount: 474,
        createdAt: '2024-01-15',
        rating: 4.8,
        reviews: 23
    },
    {
        id: 2,
        categoryId: 1,
        name: 'Sol Radiante Vintage',
        slug: 'sol-radiante-vintage',
        description: 'Diseño vintage de sol radiante con rayos estilizados en tonos cálidos. Perfecto para espacios que buscan energía positiva y calidez. Un diseño que irradia vitalidad y optimismo.',
        shortDescription: 'Poster vintage de sol con rayos estilizados',
        price: 12.99,
        originalPrice: 16.99,
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/sol_radiante_vintage.pdf',
        fileName: 'Sol Radiante Vintage.PDF',
        fileSize: 1876000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '25x35 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Vertical'
        },
        tags: ['sol', 'vintage', 'radiante', 'cálido', 'energía'],
        isFeatured: true,
        isActive: true,
        downloadCount: 89,
        viewCount: 312,
        createdAt: '2024-01-20',
        rating: 4.6,
        reviews: 18
    },
    {
        id: 3,
        categoryId: 2,
        name: 'Ramo de Pampas Secas',
        slug: 'ramo-pampas-secas',
        description: 'Elegante ilustración de pampas secas en tonos neutros. Ideal para decoración moderna y minimalista con un toque natural. Perfecto para crear ambientes serenos y sofisticados.',
        shortDescription: 'Ilustración moderna de pampas secas',
        price: 18.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1519378058287-824d47f4c6a0?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/ramo_pampas_secas.pdf',
        fileName: 'Ramo de Pampas Secas.PDF',
        fileSize: 2304000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '40x50 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Vertical'
        },
        tags: ['pampas', 'natural', 'minimalista', 'neutro', 'moderno'],
        isFeatured: false,
        isActive: true,
        downloadCount: 156,
        viewCount: 628,
        createdAt: '2024-01-25',
        rating: 4.9,
        reviews: 31
    },
    {
        id: 4,
        categoryId: 3,
        name: 'Mandala Lunar Sagrado',
        slug: 'mandala-lunar-sagrado',
        description: 'Mandala intrincado con símbolos lunares y elementos sagrados. Diseño detallado perfecto para meditación y espacios espirituales. Una pieza que invita a la contemplación y el equilibrio interior.',
        shortDescription: 'Mandala lunar con símbolos sagrados',
        price: 22.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center'
        ],
        filePath: 'products/mandala_lunar_sagrado.pdf',
        fileName: 'Mandala Lunar Sagrado.PDF',
        fileSize: 3072000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '35x35 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Cuadrado'
        },
        tags: ['mandala', 'lunar', 'sagrado', 'meditación', 'espiritual'],
        isFeatured: true,
        isActive: true,
        downloadCount: 67,
        viewCount: 234,
        createdAt: '2024-02-01',
        rating: 4.7,
        reviews: 14
    },
    {
        id: 5,
        categoryId: 4,
        name: 'Breathe and Trust',
        slug: 'breathe-and-trust',
        description: 'Tipografía inspiracional con mensaje motivacional. Diseño manuscrito elegante que invita a la calma y la confianza. Perfecto para recordarte diariamente la importancia de respirar y confiar en el proceso.',
        shortDescription: 'Tipografía inspiracional manuscrita',
        price: 9.99,
        originalPrice: 12.99,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=600&h=400&fit=crop&crop=center'
        ],
        filePath: 'products/breathe_and_trust.pdf',
        fileName: 'Breathe and Trust.PDF',
        fileSize: 1280000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '30x20 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Horizontal'
        },
        tags: ['tipografía', 'inspiracional', 'motivacional', 'calma', 'manuscrito'],
        isFeatured: false,
        isActive: true,
        downloadCount: 203,
        viewCount: 789,
        createdAt: '2024-02-05',
        rating: 4.5,
        reviews: 42
    },
    {
        id: 6,
        categoryId: 2,
        name: 'Eucalipto Delicado',
        slug: 'eucalipto-delicado',
        description: 'Rama de eucalipto con hojas delicadas en acuarela. Perfecto para espacios que buscan serenidad y frescura natural. Un diseño que aporta paz y armonía con la naturaleza.',
        shortDescription: 'Rama de eucalipto en acuarela',
        price: 14.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1519378058287-824d47f4c6a0?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/eucalipto_delicado.pdf',
        fileName: 'Eucalipto Delicado.PDF',
        fileSize: 1792000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '25x40 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Vertical'
        },
        tags: ['eucalipto', 'acuarela', 'natural', 'delicado', 'serenidad'],
        isFeatured: false,
        isActive: true,
        downloadCount: 142,
        viewCount: 567,
        createdAt: '2024-02-10',
        rating: 4.8,
        reviews: 26
    },
    {
        id: 7,
        categoryId: 5,
        name: 'Agenda Bohemia 2024',
        slug: 'agenda-bohemia-2024',
        description: 'Plantilla de agenda mensual con diseño bohemio. Incluye páginas para planificación, notas y seguimiento de hábitos. Todo lo que necesitas para organizar tu año con estilo y creatividad.',
        shortDescription: 'Plantilla de agenda mensual bohemia',
        price: 24.99,
        originalPrice: 29.99,
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/agenda_bohemia_2024.pdf',
        fileName: 'Agenda Bohemia 2024.PDF',
        fileSize: 5120000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: 'A4 (21x29.7 cm)',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            pages: '24 páginas'
        },
        tags: ['agenda', 'planificador', 'bohemio', 'mensual', 'plantilla'],
        isFeatured: true,
        isActive: true,
        downloadCount: 78,
        viewCount: 298,
        createdAt: '2024-02-15',
        rating: 4.9,
        reviews: 19
    },
    {
        id: 8,
        categoryId: 6,
        name: 'Formas Orgánicas Pastel',
        slug: 'formas-organicas-pastel',
        description: 'Arte abstracto con formas orgánicas en tonos pastel. Diseño contemporáneo que aporta suavidad y modernidad a cualquier espacio. Perfecta armonía entre lo abstracto y lo natural.',
        shortDescription: 'Arte abstracto con formas orgánicas',
        price: 16.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=600&h=600&fit=crop&crop=center'
        ],
        filePath: 'products/formas_organicas_pastel.pdf',
        fileName: 'Formas Orgánicas Pastel.PDF',
        fileSize: 2560000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '40x40 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Cuadrado'
        },
        tags: ['abstracto', 'orgánico', 'pastel', 'contemporáneo', 'moderno'],
        isFeatured: false,
        isActive: true,
        downloadCount: 91,
        viewCount: 345,
        createdAt: '2024-02-20',
        rating: 4.6,
        reviews: 15
    },
    {
        id: 9,
        categoryId: 1,
        name: 'Atrapasueños Místico',
        slug: 'atrapasueños-mistico',
        description: 'Hermoso atrapasueños con elementos místicos y plumas delicadas. Diseño bohemio que protege tus sueños y decora con magia tus espacios más íntimos.',
        shortDescription: 'Atrapasueños bohemio con elementos místicos',
        price: 13.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1446904982876-9b7c7e0ec5f5?w=600&h=800&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1446904982876-9b7c7e0ec5f5?w=600&h=800&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&h=800&fit=crop&crop=center'
        ],
        filePath: 'products/atrapasueños_mistico.pdf',
        fileName: 'Atrapasueños Místico.PDF',
        fileSize: 1920000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '30x45 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Vertical'
        },
        tags: ['atrapasueños', 'místico', 'bohemio', 'protección', 'sueños'],
        isFeatured: false,
        isActive: true,
        downloadCount: 124,
        viewCount: 456,
        createdAt: '2024-02-25',
        rating: 4.7,
        reviews: 21
    },
    {
        id: 10,
        categoryId: 4,
        name: 'She Believed She Could',
        slug: 'she-believed-she-could',
        description: 'Frase empoderadora con tipografía elegante. Un recordatorio diario de tu fuerza interior y capacidad para lograr todo lo que te propongas. Diseño que inspira y motiva.',
        shortDescription: 'Frase empoderadora con tipografía elegante',
        price: 11.99,
        originalPrice: 14.99,
        image: 'https://images.unsplash.com/photo-1485988296818-9054099be122?w=600&h=400&fit=crop&crop=center',
        gallery: [
            'https://images.unsplash.com/photo-1485988296818-9054099be122?w=600&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=600&h=400&fit=crop&crop=center'
        ],
        filePath: 'products/she_believed_she_could.pdf',
        fileName: 'She Believed She Could.PDF',
        fileSize: 1344000,
        fileFormat: 'PDF',
        specifications: {
            dimensions: '30x20 cm',
            resolution: '300 DPI',
            format: 'PDF imprimible',
            orientacion: 'Horizontal'
        },
        tags: ['empoderamiento', 'motivacional', 'fuerza', 'inspiración', 'tipografía'],
        isFeatured: false,
        isActive: true,
        downloadCount: 187,
        viewCount: 623,
        createdAt: '2024-03-01',
        rating: 4.8,
        reviews: 34
    }
];

// Funciones de utilidad para trabajar con los datos
const DataUtils = {
    // Obtener todos los productos activos
    getActiveProducts() {
        return PRODUCTS.filter(product => product.isActive);
    },

    // Obtener productos destacados
    getFeaturedProducts() {
        return PRODUCTS.filter(product => product.isFeatured && product.isActive);
    },

    // Obtener productos por categoría
    getProductsByCategory(categorySlug) {
        const category = CATEGORIES.find(cat => cat.slug === categorySlug);
        if (!category) return [];
        return PRODUCTS.filter(product => product.categoryId === category.id && product.isActive);
    },

    // Buscar productos
    searchProducts(query) {
        if (!query) return this.getActiveProducts();
        
        const lowercaseQuery = query.toLowerCase();
        return PRODUCTS.filter(product => {
            return product.isActive && (
                product.name.toLowerCase().includes(lowercaseQuery) ||
                product.description.toLowerCase().includes(lowercaseQuery) ||
                product.shortDescription.toLowerCase().includes(lowercaseQuery) ||
                product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
            );
        });
    },

    // Obtener producto por slug
    getProductBySlug(slug) {
        return PRODUCTS.find(product => product.slug === slug && product.isActive);
    },

    // Obtener categoría por slug
    getCategoryBySlug(slug) {
        return CATEGORIES.find(category => category.slug === slug && category.isActive);
    },

    // Obtener categorías activas
    getActiveCategories() {
        return CATEGORIES.filter(category => category.isActive);
    },

    // Formatear precio
    formatPrice(price) {
        return `$${price.toFixed(2)}`;
    },

    // Calcular descuento
    getDiscountPercentage(originalPrice, currentPrice) {
        if (!originalPrice || originalPrice <= currentPrice) return null;
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    },

    // Formatear tamaño de archivo
    formatFileSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    },

    // Obtener productos recientes
    getRecentProducts(limit = 6) {
        return PRODUCTS
            .filter(product => product.isActive)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    },

    // Filtrar productos por precio
    filterByPrice(products, minPrice, maxPrice) {
        return products.filter(product => {
            const price = product.price;
            return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
        });
    },

    // Ordenar productos
    sortProducts(products, sortBy) {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'price_low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'popular':
                return sorted.sort((a, b) => b.downloadCount - a.downloadCount);
            case 'latest':
            default:
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }
}; 