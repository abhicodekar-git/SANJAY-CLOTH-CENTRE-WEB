// ============================================
// SANJAY CLOTH CENTRE - ULTRA PREMIUM FASHION
// Enhanced JavaScript with Modal & Multi-variant Support
// ============================================

class UltraPremiumCatalog {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.currentProduct = null;
        this.selectedColor = '';
        this.selectedSize = '';
        this.currentImageIndex = 0;
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.renderCategorySections();
        this.hideLoading();
    }

    // Enhanced product loading with support for multiple variants
    async loadProducts() {
        try {
            // Try to load from CSV first
            const response = await fetch('data/products.csv');
            if (response.ok) {
                const csvData = await response.text();
                this.products = this.parseEnhancedCSV(csvData);
            } else {
                // Fallback to JSON
                const jsonResponse = await fetch('data/products.json');
                const jsonData = await jsonResponse.json();
                this.products = jsonData.products || [];
            }
            
            this.filteredProducts = [...this.products];
            console.log('Ultra Premium Products loaded:', this.products.length);
        } catch (error) {
            console.error('Error loading products:', error);
            this.loadSampleData();
        }
    }

    // Enhanced CSV parser for multi-variant support
    parseEnhancedCSV(csvData) {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
        const products = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            const product = {};

            headers.forEach((header, index) => {
                let value = values[index] || '';
                
                // Handle special parsing for complex fields
                if (header === 'colors') {
                    product[header] = this.parseColors(value);
                } else if (header === 'sizes') {
                    product[header] = this.parseSizes(value);
                } else if (header === 'images') {
                    product[header] = this.parseImages(value);
                } else {
                    product[header] = value;
                }
            });

            if (product.name && product.category && product.price) {
                products.push(product);
            }
        }

        return products;
    }

    // Parse CSV line handling quoted fields
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    // Parse colors from JSON string format
    parseColors(value) {
        if (!value || value === '') return [];
        try {
            return JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
            return [];
        }
    }

    // Parse sizes from array format
    parseSizes(value) {
        if (!value || value === '') return [];
        try {
            return JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
            return value.split('|').map(s => s.trim());
        }
    }

    // Parse images from array format
    parseImages(value) {
        if (!value || value === '') return [];
        try {
            return JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
            return value.split('|').map(s => s.trim());
        }
    }

    // Load sample premium data
    loadSampleData() {
        this.products = [
            {
                id: '1',
                name: 'Royal Silk Kurta',
                category: 'mens',
                price: '₹4,999',
                description: 'Exquisite handwoven silk kurta with gold thread embroidery. A masterpiece of traditional craftsmanship.',
                colors: [
                    { name: 'Crimson', value: '#DC143C', images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', 'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400'] },
                    { name: 'Navy', value: '#000080', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'] },
                    { name: 'Emerald', value: '#50C878', images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'] }
                ],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                availability: 'In Stock',
                whatsapp_message: 'Hi! I\'m interested in the Royal Silk Kurta (₹4,999). Please share details about {color} in size {size}.'
            },
            {
                id: '2',
                name: 'Premium Business Suit',
                category: 'mens',
                price: '₹15,999',
                description: 'Italian wool business suit tailored to perfection. Complete with jacket and trousers for the distinguished gentleman.',
                colors: [
                    { name: 'Charcoal', value: '#36454F', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'] },
                    { name: 'Navy', value: '#000080', images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400'] },
                    { name: 'Black', value: '#000000', images: ['https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400'] }
                ],
                sizes: ['36', '38', '40', '42', '44', '46'],
                availability: 'Made to Order',
                whatsapp_message: 'Hi! I\'m interested in the Premium Business Suit (₹15,999) in {color}, size {size}.'
            },
            {
                id: '3',
                name: 'Kids Coat Pant Set',
                category: 'kids',
                price: '₹2,499',
                description: 'Adorable formal wear for little gentlemen. Premium fabric with comfortable fit for special occasions.',
                colors: [
                    { name: 'Navy', value: '#000080', images: ['images/coat-pant-set-kids.jpg'] },
                    { name: 'Charcoal', value: '#36454F', images: ['https://images.unsplash.com/photo-1600195077907-c7435b1f1d35?w=400'] }
                ],
                sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
                availability: 'In Stock',
                whatsapp_message: 'Hi! I\'m interested in the Kids Coat Pant Set (₹2,499) in {color}, size {size}.'
            }
        ];
        this.filteredProducts = [...this.products];
        console.log('Sample premium data loaded');
    }

    // Enhanced event listeners
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterProducts(category);
                this.updateActiveFilter(e.target);
            });
        });

        // Category section clicks
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = card.dataset.category;
                this.filterProducts(category);
                // Scroll to catalog section
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Smooth scrolling
        const navLinks = document.querySelectorAll('.nav-link, .cta-button');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        // Modal event listeners
        this.setupModalEventListeners();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Setup modal specific event listeners
    setupModalEventListeners() {
        const modal = document.getElementById('productModal');
        const modalClose = document.getElementById('modalClose');
        
        // Close modal events
        [modalClose, modal].forEach(element => {
            if (element) {
                element.addEventListener('click', (e) => {
                    if (e.target === element) {
                        this.closeModal();
                    }
                });
            }
        });

        // Image navigation
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousImage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());

        // WhatsApp button in modal
        const whatsappBtn = document.getElementById('whatsappModalBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => this.handleModalWhatsApp());
        }
    }

    // Render category sections on homepage
    renderCategorySections() {
        const categoryContainer = document.getElementById('categoryGrid');
        if (!categoryContainer) return;

        const categories = [
            {
                id: 'mens',
                name: 'Mens Collection',
                description: 'Sophisticated attire for the modern gentleman',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                subcategories: ['Shirts', 'Suits', 'Trousers', 'Accessories']
            },
            {
                id: 'women',
                name: 'Womens Collection',
                description: 'Elegant fashion for the discerning lady',
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                subcategories: ['Sarees', 'Kurtis', 'Dresses', 'Shawls']
            },
            {
                id: 'kids',
                name: 'Kids Collection',
                description: 'Premium fashion for little ones',
                image: 'https://images.unsplash.com/photo-1600195077907-c7435b1f1d35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                subcategories: ['Formal Wear', 'Party Dresses', 'Shirts', 'Sets']
            }
        ];

        categoryContainer.innerHTML = categories.map(category => `
            <div class="category-card" data-category="${category.id}">
                <div class="category-image">
                    <img src="${category.image}" alt="${category.name}" loading="lazy">
                    <div class="category-overlay">
                        <button class="view-collection-btn">
                            View Collection
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="category-info">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <div class="subcategories">
                        ${category.subcategories.map(sub => `<span class="subcategory-tag">${sub}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter products by category
    filterProducts(category) {
        this.currentFilter = category;
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
        }
        this.renderProducts();
        this.updateActiveFilter();
    }

    // Update active filter button
    updateActiveFilter(activeButton = null) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === this.currentFilter) {
                btn.classList.add('active');
            }
        });
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    // Enhanced product rendering with hover effects
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (this.filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No Products Found</h3>
                    <p>No items match your current selection.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = this.filteredProducts.map(product => {
            const mainImage = this.getMainProductImage(product);
            const colorDots = this.renderColorDots(product.colors || []);
            
            return `
                <div class="product-card" onclick="catalog.openModal('${product.id}')">
                    <div class="product-image-container">
                        <img src="${mainImage}" 
                             alt="${product.name}" 
                             class="product-image"
                             loading="lazy"
                             onerror="this.src='https://via.placeholder.com/350x300?text=Product+Image'">
                        
                        <div class="product-overlay">
                            <button class="quick-view-btn" onclick="event.stopPropagation(); catalog.openModal('${product.id}')">
                                Quick View
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        
                        ${colorDots ? `<div class="product-colors">${colorDots}</div>` : ''}
                        
                        <a href="#" class="whatsapp-btn" onclick="event.stopPropagation(); catalog.handleWhatsApp('${product.id}')">
                            <i class="fab fa-whatsapp"></i>
                            <span>Inquire on WhatsApp</span>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        // Animate products in
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 50);
    }

    // Get main product image
    getMainProductImage(product) {
        if (product.colors && product.colors.length > 0 && product.colors[0].images) {
            return product.colors[0].images[0];
        }
        return product.image || 'https://via.placeholder.com/350x300?text=Product+Image';
    }

    // Render color dots for product cards
    renderColorDots(colors) {
        if (!colors || colors.length === 0) return '';
        
        return colors.slice(0, 4).map(color => 
            `<div class="color-dot" style="background-color: ${color.value}"></div>`
        ).join('');
    }

    // Open product modal
    openModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProduct = product;
        this.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0].name : '';
        this.selectedSize = '';
        this.currentImageIndex = 0;

        this.populateModal(product);
        
        const modal = document.getElementById('productModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close product modal
    closeModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        this.currentProduct = null;
        this.selectedColor = '';
        this.selectedSize = '';
        this.currentImageIndex = 0;
    }

    // Populate modal with product data
    populateModal(product) {
        // Basic product info
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = product.price;
        document.getElementById('modalProductDescription').textContent = product.description;

        // Main image
        const mainImage = document.getElementById('modalMainImage');
        const initialImage = this.getCurrentProductImages()[0] || this.getMainProductImage(product);
        mainImage.src = initialImage;
        mainImage.alt = product.name;

        // Populate color options
        this.populateColorOptions(product.colors || []);
        
        // Populate size options
        this.populateSizeOptions(product.sizes || []);
        
        // Update thumbnails
        this.updateThumbnails();
        
        // Availability status
        this.updateAvailabilityStatus(product.availability);
    }

    // Populate color options
    populateColorOptions(colors) {
        const colorSelection = document.getElementById('colorSelection');
        const colorOptions = document.getElementById('colorOptions');
        
        if (colors.length === 0) {
            colorSelection.style.display = 'none';
            return;
        }
        
        colorSelection.style.display = 'block';
        colorOptions.innerHTML = colors.map((color, index) => `
            <div class="color-option">
                <input type="radio" id="color-${index}" name="color" value="${color.name}" ${index === 0 ? 'checked' : ''}>
                <label for="color-${index}" style="background-color: ${color.value}" title="${color.name}"></label>
            </div>
        `).join('');

        // Add event listeners for color changes
        colorOptions.querySelectorAll('input[name="color"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.selectedColor = e.target.value;
                this.currentImageIndex = 0;
                this.updateMainImage();
                this.updateThumbnails();
            });
        });
    }

    // Populate size options
    populateSizeOptions(sizes) {
        const sizeSelection = document.getElementById('sizeSelection');
        const sizeOptions = document.getElementById('sizeOptions');
        
        if (sizes.length === 0) {
            sizeSelection.style.display = 'none';
            return;
        }
        
        sizeSelection.style.display = 'block';
        sizeOptions.innerHTML = sizes.map((size, index) => `
            <div class="size-option">
                <input type="radio" id="size-${index}" name="size" value="${size}">
                <label for="size-${index}">${size}</label>
            </div>
        `).join('');

        // Add event listeners for size changes
        sizeOptions.querySelectorAll('input[name="size"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.selectedSize = e.target.value;
            });
        });
    }

    // Get current product images based on selected color
    getCurrentProductImages() {
        if (!this.currentProduct || !this.currentProduct.colors) return [];
        
        const selectedColorObj = this.currentProduct.colors.find(c => c.name === this.selectedColor);
        return selectedColorObj ? selectedColorObj.images : [];
    }

    // Update main image in modal
    updateMainImage() {
        const images = this.getCurrentProductImages();
        if (images.length > 0 && images[this.currentImageIndex]) {
            const mainImage = document.getElementById('modalMainImage');
            mainImage.src = images[this.currentImageIndex];
        }
    }

    // Update thumbnail images
    updateThumbnails() {
        const thumbnailContainer = document.getElementById('thumbnailImages');
        const images = this.getCurrentProductImages();
        
        if (images.length <= 1) {
            thumbnailContainer.style.display = 'none';
            return;
        }
        
        thumbnailContainer.style.display = 'flex';
        thumbnailContainer.innerHTML = images.map((image, index) => `
            <img src="${image}" 
                 alt="Product image ${index + 1}" 
                 class="thumbnail-img ${index === this.currentImageIndex ? 'active' : ''}"
                 onclick="catalog.setImageIndex(${index})">
        `).join('');
    }

    // Set current image index
    setImageIndex(index) {
        this.currentImageIndex = index;
        this.updateMainImage();
        this.updateThumbnails();
    }

    // Navigate to previous image
    previousImage() {
        const images = this.getCurrentProductImages();
        if (images.length > 1) {
            this.currentImageIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : images.length - 1;
            this.updateMainImage();
            this.updateThumbnails();
        }
    }

    // Navigate to next image
    nextImage() {
        const images = this.getCurrentProductImages();
        if (images.length > 1) {
            this.currentImageIndex = this.currentImageIndex < images.length - 1 ? this.currentImageIndex + 1 : 0;
            this.updateMainImage();
            this.updateThumbnails();
        }
    }

    // Update availability status
    updateAvailabilityStatus(availability) {
        const statusElement = document.getElementById('availabilityStatus');
        statusElement.textContent = availability;
        statusElement.className = 'availability-status ' + 
            (availability.toLowerCase().includes('stock') ? 'in-stock' : 'made-to-order');
    }

    // Handle WhatsApp inquiry from modal
    handleModalWhatsApp() {
        if (!this.currentProduct) return;
        
        let message = this.currentProduct.whatsapp_message || 
            `Hi! I'm interested in the ${this.currentProduct.name} (${this.currentProduct.price}).`;
        
        // Replace placeholders with selected options
        if (this.selectedColor) {
            message = message.replace('{color}', this.selectedColor);
        }
        if (this.selectedSize) {
            message = message.replace('{size}', this.selectedSize);
        }
        
        // Clean up any remaining placeholders
        message = message.replace(/\{[^}]+\}/g, '');
        
        const whatsappUrl = `https://wa.me/918972714744?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Handle WhatsApp inquiry from product card
    handleWhatsApp(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const message = `Hi! I'm interested in the ${product.name} (${product.price}). Please share more details.`;
        const whatsappUrl = `https://wa.me/918972714744?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Hide loading spinner
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize the catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new UltraPremiumCatalog();
});

// Smooth scroll animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll effects for header
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});