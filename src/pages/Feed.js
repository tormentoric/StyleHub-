import { Header } from '../components/Header.js'
import { ProductCard } from '../components/ProductCard.js'
import { getProducts } from '../data/products.js'

export class FeedPage {
  constructor() {
    this.products = getProducts()
    this.filters = {
      search: '',
      sort: 'newest'
    }
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-orange-50 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-200'
    
    const header = new Header()
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8'
    main.innerHTML = `
      <div class="w-full max-w-2xl space-y-8">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold tracking-tight">Your Feed</h1>
          <div class="flex items-center gap-4">
            <div class="relative flex-1">
              <span class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/50">search</span>
              <input class="w-full rounded-lg border-transparent bg-gray-100 dark:bg-gray-800 py-3 pl-10 pr-4 text-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Search products and users" type="search" id="search-input"/>
            </div>
            <div class="relative">
              <select class="w-full appearance-none rounded-lg border-transparent bg-gray-100 dark:bg-gray-800 py-3 pl-4 pr-10 text-sm font-medium focus:border-orange-500 focus:ring-orange-500" id="sort-select">
                <option value="newest">New Arrivals</option>
                <option value="popular">Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <span class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-orange-500/50">expand_more</span>
            </div>
          </div>
        </div>
        <div class="space-y-8" id="products-container">
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    this.renderProducts(page)
    return page
  }

  renderProducts(page) {
    const container = page.querySelector('#products-container')
    container.innerHTML = ''

    const filteredProducts = this.getFilteredProducts()
    
    filteredProducts.forEach(product => {
      const productCard = new ProductCard(product, 'feed')
      container.appendChild(productCard.render())
    })

    if (filteredProducts.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
          <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400">No products found</h3>
          <p class="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
        </div>
      `
    }
  }

  getFilteredProducts() {
    return getProducts(this.filters)
  }

  setupEventListeners(page) {
    const searchInput = page.querySelector('#search-input')
    const sortSelect = page.querySelector('#sort-select')

    searchInput.addEventListener('input', (e) => {
      this.filters.search = e.target.value
      this.renderProducts(page)
    })

    sortSelect.addEventListener('change', (e) => {
      this.filters.sort = e.target.value
      this.renderProducts(page)
    })
  }
}