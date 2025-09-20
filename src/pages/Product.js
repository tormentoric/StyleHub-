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
    page.className = 'min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200'
    
    const header = new Header('marketplace')
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    main.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-4">
          <div class="aspect-square w-full bg-cover bg-center rounded-xl" style='background-image: url("${this.product.image}")'></div>
          <div class="grid grid-cols-4 gap-2">
            <div class="aspect-square bg-cover bg-center rounded-lg opacity-60" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-lg opacity-60" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-lg opacity-60" style='background-image: url("${this.product.image}")'></div>
            <div class="aspect-square bg-cover bg-center rounded-lg opacity-60" style='background-image: url("${this.product.image}")'></div>
          </div>
        </div>
        
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold mb-2">${this.product.title}</h1>
            <p class="text-2xl font-bold text-orange-500 mb-4">$${this.product.price.toFixed(2)}</p>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${this.product.description}</p>
            
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-cover bg-center rounded-full" style='background-image: url("https://api.dicebear.com/7.x/avataaars/svg?seed=${this.product.seller}")'></div>
                <span class="text-sm font-medium">${this.product.seller}</span>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-red-500">favorite</span>
                  <span>${this.product.likes}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined">chat_bubble_outline</span>
                  <span>${this.product.comments}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <span class="text-sm text-gray-500">Condition</span>
              <p class="font-medium">${this.product.condition}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Size</span>
              <p class="font-medium">${this.product.size}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Brand</span>
              <p class="font-medium">${this.product.brand}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Category</span>
              <p class="font-medium">${this.product.category}</p>
            </div>
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
    const likeBtn = page.querySelector('#like-button')

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
          <span class="material-symbols-outlined">shopping_bag</span>
          Add to Cart
        `
        addToCartBtn.classList.remove('btn-secondary')
        addToCartBtn.classList.add('btn-primary')
      }, 2000)
    })

    likeBtn.addEventListener('click', () => {
      this.product.isLiked = !this.product.isLiked
      this.product.likes += this.product.isLiked ? 1 : -1
      
      const icon = likeBtn.querySelector('.material-symbols-outlined')
      icon.textContent = this.product.isLiked ? 'favorite' : 'favorite_border'
      icon.className = `material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : ''}`
    })
  }
}