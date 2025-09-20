import { Header } from '../components/Header.js'
import { ProductCard } from '../components/ProductCard.js'
import { getProducts } from '../data/products.js'

export class SearchPage {
  constructor() {
    this.filters = {
      search: new URLSearchParams(window.location.search).get('q') || 'Vintage',
      category: 'All',
      seller: '',
      sort: 'popular',
      minPrice: 0,
      maxPrice: 500
    }
    this.activeTab = 'products'
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200'
    
    const header = new Header('marketplace')
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    main.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-8">
        <aside class="w-full lg:w-1/4 space-y-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Filters</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" for="category">Category</label>
                <select class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:border-orange-500 focus:ring-orange-500" id="category">
                  <option value="All">All</option>
                  <option value="Jackets">Jackets</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Scarves">Scarves</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Dresses">Dresses</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" for="price-range">Price Range</label>
                <input class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" id="price-range" type="range" min="0" max="500" value="500"/>
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>$0</span>
                  <span id="price-display">$500+</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" for="seller">Seller</label>
                <input class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:border-orange-500 focus:ring-orange-500" id="seller" placeholder="e.g., @fashionista_lisa" type="text"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" for="sort">Sort by</label>
                <select class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:border-orange-500 focus:ring-orange-500" id="sort">
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </aside>
        <div class="flex-1">
          <div class="relative w-full mb-6">
            <span class="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
            <input class="w-full rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 pl-12 pr-4 text-base focus:border-orange-500 focus:ring-orange-500" type="search" id="main-search" value="${this.filters.search}"/>
          </div>
          <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav aria-label="Tabs" class="-mb-px flex space-x-8">
              <button class="tab-button border-orange-500 text-orange-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="products">
                Products
                <span class="bg-gray-200 dark:bg-gray-700 text-xs font-semibold ml-2 py-0.5 px-2 rounded-full" id="products-count">0</span>
              </button>
              <button class="tab-button border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="shopshots">
                Shopshots
                <span class="bg-gray-200 dark:bg-gray-700 text-xs font-semibold ml-2 py-0.5 px-2 rounded-full">1</span>
              </button>
            </nav>
          </div>
          <div id="results-container">
          </div>
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    this.renderResults(page)
    return page
  }

  renderResults(page) {
    const container = page.querySelector('#results-container')
    const productsCount = page.querySelector('#products-count')
    
    if (this.activeTab === 'products') {
      const products = this.getFilteredProducts()
      productsCount.textContent = products.length

      container.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${products.map(product => `
            <div class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover-lift cursor-pointer" data-product-id="${product.id}">
              <div class="aspect-square w-full bg-cover bg-center" style='background-image: url("${product.image}")'></div>
              <div class="p-4">
                <h2 class="text-base font-semibold truncate">${product.title}</h2>
                <p class="text-lg font-bold mt-1 text-orange-500">$${product.price.toFixed(2)}</p>
                <p class="text-sm text-gray-500 mt-1">by ${product.seller}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `

      // Add click handlers for product cards
      container.querySelectorAll('[data-product-id]').forEach(card => {
        card.addEventListener('click', () => {
          const productId = card.getAttribute('data-product-id')
          window.location.hash = `/product/${productId}`
        })
      })

      if (products.length === 0) {
        container.innerHTML = `
          <div class="text-center py-12">
            <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
            <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400">No products found</h3>
            <p class="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
          </div>
        `
      }
    } else {
      container.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">video_library</span>
          <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400">Shopshots coming soon</h3>
          <p class="text-gray-500 dark:text-gray-500">Video content feature is in development</p>
        </div>
      `
    }
  }

  getFilteredProducts() {
    return getProducts(this.filters)
  }

  setupEventListeners(page) {
    // Search input
    const searchInput = page.querySelector('#main-search')
    searchInput.addEventListener('input', (e) => {
      this.filters.search = e.target.value
      this.renderResults(page)
    })

    // Category filter
    const categorySelect = page.querySelector('#category')
    categorySelect.value = this.filters.category
    categorySelect.addEventListener('change', (e) => {
      this.filters.category = e.target.value
      this.renderResults(page)
    })

    // Price range
    const priceRange = page.querySelector('#price-range')
    const priceDisplay = page.querySelector('#price-display')
    priceRange.addEventListener('input', (e) => {
      const value = parseInt(e.target.value)
      this.filters.maxPrice = value
      priceDisplay.textContent = value >= 500 ? '$500+' : `$${value}`
      this.renderResults(page)
    })

    // Seller filter
    const sellerInput = page.querySelector('#seller')
    sellerInput.addEventListener('input', (e) => {
      this.filters.seller = e.target.value
      this.renderResults(page)
    })

    // Sort
    const sortSelect = page.querySelector('#sort')
    sortSelect.value = this.filters.sort
    sortSelect.addEventListener('change', (e) => {
      this.filters.sort = e.target.value
      this.renderResults(page)
    })

    // Tab switching
    const tabButtons = page.querySelectorAll('.tab-button')
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab')
        this.activeTab = tab
        
        // Update tab styles
        tabButtons.forEach(btn => {
          btn.className = 'tab-button border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
        })
        button.className = 'tab-button border-orange-500 text-orange-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
        
        this.renderResults(page)
      })
    })
  }
}