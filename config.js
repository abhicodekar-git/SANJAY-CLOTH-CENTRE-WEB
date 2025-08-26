// ============================================
// ULTRA PREMIUM WEBSITE CONFIGURATION FILE
// Enhanced for Sanjay Cloth Centre - Premium Features
// ============================================

const PREMIUM_WEBSITE_CONFIG = {
    // Business Information
    business: {
        name: "Sanjay Cloth Centre",
        tagline: "Ultra Premium Fashion Since 1985",
        description: "Since 1985, Sanjay Cloth Centre has been the epitome of luxury fashion and uncompromising quality. We curate only the finest fabrics and employ master craftsmen to create clothing that transcends trends and defines sophistication.",
        
        // Contact Details
        phone: "+91-8972714744",
        whatsappNumber: "918972714744", // Without + and spaces
        email: "info@sanjayclothcentre.com",
        address: "Old Hasimara, opposite of taxi stand, jaigaon road, alipur, west bengal 735215",
        
        // Store Hours
        storeHours: {
            regular: "Mon-Sun: 8:30AM-9:30PM",
            special: "Thu: 9AM-7PM"
        },
        
        // Social Media Links
        socialMedia: {
            instagram: "",
            facebook: "",
            twitter: "",
            linkedin: ""
        }
    },

    // Website Settings
    website: {
        title: "Sanjay Cloth Centre - Ultra Premium Fashion",
        heroTitle: "Ultra Premium Fashion Redefined",
        heroSubtitle: "Discover the finest collection of luxury clothing crafted with exceptional artistry and timeless elegance since 1985. Each piece represents the pinnacle of sophisticated craftsmanship.",
        ctaButtonText: "Explore Exclusive Collection",
        
        // Navigation Menu
        navigation: [
            { text: "Home", href: "#home" },
            { text: "Our Collection", href: "#catalog" },
            { text: "Heritage", href: "#about" },
            { text: "Contact", href: "#contact" }
        ],
        
        // Product Categories - Updated for premium segments
        categories: [
            { id: "all", name: "Our Collection", active: true },
            { id: "mens", name: "Mens", active: true },
            { id: "women", name: "Women", active: true },
            { id: "kids", name: "Kids", active: true }
        ]
    },

    // Enhanced Data Sources
    data: {
        // Primary data source (Enhanced CSV with multi-variant support)
        primary: "data/products.csv",
        
        // Backup data source
        backup: "data/products.json",
        
        // Google Sheets Integration (optional)
        googleSheets: {
            enabled: false,
            sheetId: "", // Your Google Sheet ID
            apiKey: "", // Your Google API Key
            range: "Products!A1:Z1000"
        },
        
        // Image optimization settings
        imageSettings: {
            quality: 85,
            format: "webp",
            fallbackFormat: "jpg",
            lazyLoading: true,
            placeholder: "https://via.placeholder.com/350x300?text=Premium+Product"
        }
    },

    // WhatsApp Configuration
    whatsapp: {
        // Enhanced message templates with personalization
        templates: {
            default: "Hi! I'm interested in {productName} ({price}). Please share more details about availability, sizes, and colors.",
            withColor: "Hi! I'm interested in the {productName} ({price}) in {color}. Please share more details.",
            withColorAndSize: "Hi! I'm interested in the {productName} ({price}) in {color}, size {size}. Please share availability and pricing details.",
            inquiry: "Hi! I'm interested in your ultra-premium clothing collection. Please share your exclusive catalog."
        },
        
        // Global inquiry message
        globalMessage: "Hi! I'm interested in your ultra-premium clothing collection. Please share details about your exclusive pieces.",
        
        // WhatsApp float button settings
        floatButton: {
            enabled: true,
            position: "bottom-right", // bottom-right, bottom-left
            message: "Hi! I'm interested in your ultra-premium clothing collection."
        }
    },

    // Premium Color Palette
    colors: {
        // Primary red palette
        primary: {
            red: "#8B0000",        // Deep crimson
            darkRed: "#7F1D1D",    // Dark red
            lightRed: "#FEE2E2"    // Light red background
        },
        
        // Secondary colors
        secondary: {
            gold: "#D4AF37",       // Luxury gold
            cream: "#FEFBF8",      // Warm cream
            charcoal: "#1A1A1A"    // Premium charcoal
        },
        
        // Neutral palette
        neutral: {
            white: "#FFFFFF",
            lightGray: "#F3F4F6",
            mediumGray: "#6B7280",
            darkGray: "#2D2D2D"
        },
        
        // Status colors
        status: {
            success: "#10B981",    // Green for in stock
            warning: "#F59E0B",    // Orange for made to order
            error: "#EF4444"       // Red for out of stock
        }
    },

    // Typography Settings
    typography: {
        fonts: {
            display: "'Playfair Display', serif", // For headings and luxury text
            body: "'Inter', sans-serif"           // For body text and UI
        },
        
        weights: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        }
    },

    // Enhanced Features
    features: {
        // Product modal with multiple images
        productModal: {
            enabled: true,
            imageGallery: true,
            colorSelection: true,
            sizeSelection: true,
            zoomOnHover: true
        },
        
        // Enhanced search and filtering
        search: {
            enabled: true,
            placeholder: "Search exclusive pieces...",
            categories: true,
            priceRange: true
        },
        
        // Advanced filtering options
        filtering: {
            enabled: true,
            animation: true,
            sortOptions: ["price-low", "price-high", "newest", "popular"]
        },
        
        // Image optimization
        imageOptimization: {
            lazyLoading: true,
            responsiveImages: true,
            webpSupport: true,
            placeholders: true
        },
        
        // Animations and transitions
        animations: {
            pageTransitions: true,
            hoverEffects: true,
            scrollAnimations: true,
            loadingAnimations: true
        }
    },

    // Premium Product Structure
    productSchema: {
        // Required fields
        required: ["id", "name", "category", "price", "description"],
        
        // Optional fields for premium features
        optional: [
            "colors",        // Array of color objects with name, value, images
            "sizes",         // Array of available sizes
            "images",        // Array of product images
            "materials",     // Array of materials used
            "careInstructions", // Care and maintenance instructions
            "customization", // Customization options available
            "delivery",      // Delivery timeframe
            "warranty"       // Warranty information
        ],
        
        // Color object structure
        colorStructure: {
            name: "String",     // Color name (e.g., "Crimson Red")
            value: "String",    // Hex color value (e.g., "#DC143C")
            images: "Array"     // Array of image URLs for this color
        }
    },

    // Analytics Configuration
    analytics: {
        // Google Analytics 4
        googleAnalytics: {
            enabled: false,
            measurementId: "", // GA4 Measurement ID (G-XXXXXXXXXX)
            events: {
                productView: true,
                categoryFilter: true,
                whatsappClick: true
            }
        },
        
        // Facebook Pixel
        facebookPixel: {
            enabled: false,
            pixelId: ""
        },
        
        // Custom event tracking
        customEvents: {
            modalOpen: true,
            colorSelection: true,
            sizeSelection: true,
            imageGalleryNavigation: true
        }
    },

    // SEO Settings
    seo: {
        metaDescription: "Discover ultra-premium clothing collection at Sanjay Cloth Centre. Luxury fashion crafted with exceptional artistry since 1985. Exclusive mens, womens, and kids collections.",
        keywords: "ultra premium clothing, luxury fashion, bespoke tailoring, premium mens wear, luxury womens fashion, kids formal wear, Sanjay Cloth Centre, West Bengal fashion",
        ogTitle: "Sanjay Cloth Centre - Ultra Premium Fashion Since 1985",
        ogDescription: "Experience the finest in luxury clothing. Each piece represents the pinnacle of sophisticated craftsmanship and timeless elegance.",
        ogImage: "", // Open Graph image URL
        twitterCard: "summary_large_image",
        structuredData: {
            organization: true,
            products: true,
            localBusiness: true
        }
    },

    // Performance Settings
    performance: {
        // Image loading
        images: {
            lazy: true,
            placeholder: true,
            compression: 85,
            formats: ["webp", "jpg"]
        },
        
        // Code splitting
        codeSplitting: {
            enabled: true,
            chunkSize: "moderate"
        },
        
        // Caching
        caching: {
            staticAssets: "1y",
            products: "1h",
            images: "30d"
        }
    },

    // Accessibility Settings
    accessibility: {
        highContrast: {
            enabled: true,
            toggle: false // Hidden for now, can be enabled later
        },
        
        keyboardNavigation: true,
        screenReaderSupport: true,
        altTextGeneration: true,
        focusManagement: true
    },

    // Development Settings
    development: {
        debugMode: false,
        consoleLogging: true,
        errorReporting: true,
        performanceMetrics: false
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PREMIUM_WEBSITE_CONFIG;
}

// Make available globally
window.PREMIUM_WEBSITE_CONFIG = PREMIUM_WEBSITE_CONFIG;

// Backward compatibility
window.WEBSITE_CONFIG = PREMIUM_WEBSITE_CONFIG;