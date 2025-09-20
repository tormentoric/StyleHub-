import { Header } from '../components/Header.js'
import { getProductById } from '../data/products.js'

export class ProductPage {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search)
    const productId = window.location.hash.split('/')[2]
    this.product = getProductById(productId)
    
    if (!this.product) {
      window.location.hash = '/'
      return
    }
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-white dark:bg-gray-900'
    
    const header = new Header()
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'container section'
    main.innerHTML = `
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="#/" class="hover:text-gray-700">Home</a>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <a href="#/shop" class="hover:text-gray-700">Shop</a>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="text-gray-900 dark:text-white">${this.product.title}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Product Media -->
        <div class="space-y-6">
          <div class="aspect-square w-full bg-cover bg-center rounded-2xl overflow-hidden card" style='background-image: url("${this.product.image}")'>
            ${this.product.video ? `
              <video class="w-full h-full object-cover" controls poster="${this.product.image}">
                <source src="${this.product.video}" type="video/mp4">
              </video>
            ` : ''}
          </div>
          <div class="grid grid-cols-4 gap-3">
            <div class="aspect-square bg-cover bg-center rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer card" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer card" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer card" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer card" style='background-image: url("${this.product.image}")'></div>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="space-y-8">
          <!-- Header -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="badge badge-primary">${this.product.category}</span>
              ${!this.product.inStock ? '<span class="badge badge-error">Out of Stock</span>' : ''}
            </div>
            <h1 class="heading-2 mb-4">${this.product.title}</h1>
            
            <!-- Price -->
            <div class="flex items-baseline gap-4 mb-4">
              <span class="text-4xl font-bold text-orange-500">$${this.product.price.toFixed(2)}</span>
              <div class="text-sm text-gray-500">
                <div>Base price: $${this.product.price.toFixed(2)}</div>
                <div>Platform fee (5%): $${(this.product.price * 0.05).toFixed(2)}</div>
                <div class="font-medium text-gray-900 dark:text-white">Total: $${(this.product.price * 1.05).toFixed(2)}</div>
              </div>
            </div>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-6">
              <div class="flex items-center">
                ${Array.from({length: 5}, (_, i) => `
                  <span class="material-symbols-outlined text-sm ${i < Math.floor(this.product.rating) ? 'text-yellow-400' : 'text-gray-300'}">star</span>
                `).join('')}
              </div>
              <span class="text-sm font-medium">${this.product.rating}</span>
              <span class="text-sm text-gray-500">(${this.product.reviews} reviews)</span>
            </div>
            
            <p class="body mb-6">${this.product.description}</p>
          </div>

          <!-- Actions -->
          <div class="space-y-4">
            <div class="flex gap-4">
              <button class="btn btn-primary btn-large flex-1 ${!this.product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" id="add-to-cart" ${!this.product.inStock ? 'disabled' : ''}>
                <span class="material-symbols-outlined">shopping_cart</span>
                ${this.product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              ${this.product.inStock ? `
                <button class="btn btn-secondary btn-large flex-1" id="buy-now">
                  <span class="material-symbols-outlined">flash_on</span>
                  Buy Now
                </button>
              ` : ''}
            </div>
            
            <div class="flex gap-3">
              <button class="btn btn-ghost flex-1" id="like-button">
                <span class="material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : ''}">
                  ${this.product.isLiked ? 'favorite' : 'favorite_border'}
                </span>
                ${this.product.likes}
              </button>
              <button class="btn btn-ghost flex-1">
                <span class="material-symbols-outlined">share</span>
                Share
              </button>
              <button class="btn btn-ghost flex-1" data-route="/messages">
                <span class="material-symbols-outlined">chat</span>
                Message
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="card p-6">
            <h3 class="font-semibold mb-4">Product Details</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Condition</span>
                <p class="font-medium">${this.product.condition}</p>
              </div>
              <div>
                <span class="text-gray-500">Size</span>
                <p class="font-medium">${this.product.size}</p>
              </div>
              <div>
                <span class="text-gray-500">Brand</span>
                <p class="font-medium">${this.product.brand}</p>
              </div>
              <div>
                <span class="text-gray-500">Stock</span>
                <p class="font-medium">${this.product.inStock ? `${this.product.stockCount} available` : 'Out of stock'}</p>
              </div>
              <div>
                <span class="text-gray-500">Shipping</span>
                <p class="font-medium">${this.product.shippingTime}</p>
              </div>
              <div>
                <span class="text-gray-500">Returns</span>
                <p class="font-medium">${this.product.returnPolicy}</p>
              </div>
            </div>
          </div>

          <!-- Seller Info -->
          <div class="card p-6">
            <h3 class="font-semibold mb-4">Seller Information</h3>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span class="material-symbols-outlined text-white">person</span>
              </div>
              <div class="flex-1">
                <p class="font-medium">${this.product.seller}</p>
                <p class="text-sm text-gray-500">Active seller since 2023</p>
                <div class="flex items-center gap-1 mt-1">
                  <span class="material-symbols-outlined text-sm text-yellow-400">star</span>
                  <span class="text-sm">4.9 seller rating</span>
                </div>
              </div>
              <button class="btn btn-secondary" data-route="/messages">
                <span class="material-symbols-outlined">mail</span>
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div class="mt-12">
        <h3 class="font-semibold mb-4">Tags</h3>
        <div class="flex flex-wrap gap-2">
          ${this.product.tags.map(tag => `
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">#${tag}</span>
          `).join('')}
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="mt-12">
        <div class="flex items-center justify-between mb-6">
          <h3 class="heading-3">Reviews (${this.product.reviews})</h3>
          <button class="btn btn-ghost">
            <span class="material-symbols-outlined">rate_review</span>
            Write Review
          </button>
        </div>
        
        <div class="space-y-6">
          ${this.generateReviews().map(review => `
            <div class="card p-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-white text-sm">person</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-medium">${review.name}</span>
                    <div class="flex items-center">
                      ${Array.from({length: 5}, (_, i) => `
                        <span class="material-symbols-outlined text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}">star</span>
                      `).join('')}
                    </div>
                    <span class="text-sm text-gray-500">${review.date}</span>
                  </div>
                  <p class="text-sm">${review.comment}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  generateReviews() {
    return [
      {
        name: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely love this! Quality is amazing and shipping was super fast. Highly recommend!"
      },
      {
        name: "Mike R.",
        rating: 4,
        date: "1 week ago", 
        comment: "Great product, exactly as described. Only minor issue was packaging could be better."
      },
      {
        name: "Emma L.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Perfect! This seller is fantastic and the product exceeded my expectations."
      }
    ]
  }
          </div>

          <div class="flex gap-4">
            <button class="flex-1 btn btn-primary py-3 text-base" id="add-to-cart">
              <span class="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
            <button class="btn btn-ghost py-3 px-6" id="like-button">
              <span class="material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : ''}">
                ${this.product.isLiked ? 'favorite' : 'favorite_border'}
              </span>
            </button>
            <button class="btn btn-ghost py-3 px-6">
              <span class="material-symbols-outlined">share</span>
            </button>
          </div>

          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">Tags</h3>
            <div class="flex flex-wrap gap-2">
              ${this.product.tags.map(tag => `
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">#${tag}</span>
              `).join('')}
            </div>
          </div>

          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">Seller Information</h3>
            <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="w-12 h-12 bg-cover bg-center rounded-full" style='background-image: url("https://api.dicebear.com/7.x/avataaars/svg?seed=${this.product.seller}")'></div>
              <div class="flex-1">
                <p class="font-medium">${this.product.seller}</p>
                <p class="text-sm text-gray-500">Active seller since 2023</p>
              </div>
              <button class="btn btn-secondary" data-route="/messages">
                Message Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  setupEventListeners(page) {
    const addToCartBtn = page.querySelector('#add-to-cart')
    const buyNowBtn = page.querySelector('#buy-now')
    const likeBtn = page.querySelector('#like-button')

    if (addToCartBtn && !addToCartBtn.disabled) {
      addToCartBtn.addEventListener('click', () => {
        // Add to cart logic
        console.log('Added to cart:', this.product.title)
        
        // Show feedback
        addToCartBtn.innerHTML = `
          <span class="material-symbols-outlined">check</span>
          Added to Cart
        `
        addToCartBtn.classList.remove('btn-primary')
        addToCartBtn.classList.add('btn-secondary')
        
        setTimeout(() => {
          addToCartBtn.innerHTML = `
            <span class="material-symbols-outlined">shopping_cart</span>
            Add to Cart
          `
          addToCartBtn.classList.remove('btn-secondary')
          addToCartBtn.classList.add('btn-primary')
        }, 2000)
      })
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        // Add to cart and redirect to checkout
        console.log('Buy now:', this.product.title)
        window.location.hash = '/checkout'
      })
    }

    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        this.product.isLiked = !this.product.isLiked
        this.product.likes += this.product.isLiked ? 1 : -1
        
        const icon = likeBtn.querySelector('.material-symbols-outlined')
        const count = likeBtn.textContent.match(/\d+/)[0]
        
        icon.textContent = this.product.isLiked ? 'favorite' : 'favorite_border'
        icon.className = `material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : ''}`
        
        likeBtn.innerHTML = `
          <span class="material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : ''}">
            ${this.product.isLiked ? 'favorite' : 'favorite_border'}
          </span>
          ${this.product.likes}
        `
      })
    }
  }
}