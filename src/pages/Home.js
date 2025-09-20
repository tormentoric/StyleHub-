import { Header } from '../components/Header.js'
import { ProductCard } from '../components/ProductCard.js'
import { getProducts } from '../data/products.js'

export class HomePage {
  constructor() {
    this.editorsPicks = getProducts().slice(0, 3)
    this.communityFavorites = getProducts().sort((a, b) => b.likes - a.likes).slice(0, 4)
    this.dailyDeals = getProducts().filter(p => p.price < 100).slice(0, 3)
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-white dark:bg-gray-900'
    
    const header = new Header()
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.innerHTML = `
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div class="container section">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="heading-1 mb-6 text-balance">
              Shop Creatively. <br>
              <span class="text-orange-500">Sell Boldly.</span>
            </h1>
            <p class="body-large mb-8 text-balance max-w-2xl mx-auto">
              Discover unique products through immersive video experiences. Connect with creators and find exactly what you're looking for.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn btn-primary btn-large" data-route="/shopshots">
                <span class="material-symbols-outlined">play_circle</span>
                Watch Shopshots
              </button>
              <button class="btn btn-secondary btn-large" data-route="/shop">
                <span class="material-symbols-outlined">storefront</span>
                Browse Shop
              </button>
            </div>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </section>

      <!-- Editor's Picks -->
      <section class="section">
        <div class="container">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="heading-3 mb-2">Editor's Picks</h2>
              <p class="body text-gray-600 dark:text-gray-400">Curated by our team</p>
            </div>
            <button class="btn btn-ghost" data-route="/shop?featured=editors">
              View All
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="editors-picks">
          </div>
        </div>
      </section>

      <!-- Community Favorites -->
      <section class="section bg-gray-50 dark:bg-gray-800/50">
        <div class="container">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="heading-3 mb-2">Community Favorites</h2>
              <p class="body text-gray-600 dark:text-gray-400">Most loved by our community</p>
            </div>
            <button class="btn btn-ghost" data-route="/shop?featured=popular">
              View All
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div class="carousel" id="community-favorites">
          </div>
        </div>
      </section>

      <!-- Daily Deals -->
      <section class="section">
        <div class="container">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="heading-3 mb-2">Daily Deals</h2>
              <p class="body text-gray-600 dark:text-gray-400">Limited time offers</p>
            </div>
            <button class="btn btn-ghost" data-route="/shop?deals=true">
              View All
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="daily-deals">
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div class="container text-center">
          <h2 class="heading-2 mb-4">Ready to Start Selling?</h2>
          <p class="body-large mb-8 opacity-90">Join thousands of creators showcasing their products</p>
          <button class="btn bg-white text-orange-600 hover:bg-gray-100 btn-large" data-route="/sell">
            <span class="material-symbols-outlined">add_business</span>
            Start Selling Today
          </button>
        </div>
      </section>
    `

    page.appendChild(main)
    this.renderProducts(page)
    this.setupEventListeners(page)
    return page
  }

  renderProducts(page) {
    // Render Editor's Picks
    const editorsContainer = page.querySelector('#editors-picks')
    this.editorsPicks.forEach(product => {
      const card = this.createFeaturedCard(product)
      editorsContainer.appendChild(card)
    })

    // Render Community Favorites
    const communityContainer = page.querySelector('#community-favorites')
    this.communityFavorites.forEach(product => {
      const card = this.createCarouselCard(product)
      communityContainer.appendChild(card)
    })

    // Render Daily Deals
    const dealsContainer = page.querySelector('#daily-deals')
    this.dailyDeals.forEach(product => {
      const card = this.createDealCard(product)
      dealsContainer.appendChild(card)
    })
  }

  createFeaturedCard(product) {
    const card = document.createElement('div')
    card.className = 'card card-hover cursor-pointer overflow-hidden'
    card.innerHTML = `
      <div class="aspect-[4/3] bg-cover bg-center" style="background-image: url('${product.image}')"></div>
      <div class="p-6">
        <h3 class="font-semibold text-lg mb-2 line-clamp-1">${product.title}</h3>
        <p class="body-small mb-3 line-clamp-2">${product.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-orange-500">$${product.price.toFixed(2)}</span>
          <div class="flex items-center gap-1 text-sm text-gray-500">
            <span class="material-symbols-outlined text-sm">favorite</span>
            <span>${product.likes}</span>
          </div>
        </div>
      </div>
    `
    
    card.addEventListener('click', () => {
      window.location.hash = `/product/${product.id}`
    })
    
    return card
  }

  createCarouselCard(product) {
    const card = document.createElement('div')
    card.className = 'carousel-item card card-hover cursor-pointer overflow-hidden'
    card.innerHTML = `
      <div class="aspect-square bg-cover bg-center" style="background-image: url('${product.image}')"></div>
      <div class="p-4">
        <h3 class="font-medium mb-1 line-clamp-1">${product.title}</h3>
        <p class="text-sm text-gray-500 mb-2">${product.seller}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-orange-500">$${product.price.toFixed(2)}</span>
          <div class="flex items-center gap-1 text-xs text-gray-500">
            <span class="material-symbols-outlined text-xs">favorite</span>
            <span>${product.likes}</span>
          </div>
        </div>
      </div>
    `
    
    card.addEventListener('click', () => {
      window.location.hash = `/product/${product.id}`
    })
    
    return card
  }

  createDealCard(product) {
    const card = document.createElement('div')
    card.className = 'card card-hover cursor-pointer overflow-hidden relative'
    card.innerHTML = `
      <div class="absolute top-4 left-4 z-10">
        <span class="badge badge-error">Deal</span>
      </div>
      <div class="aspect-[4/3] bg-cover bg-center" style="background-image: url('${product.image}')"></div>
      <div class="p-6">
        <h3 class="font-semibold text-lg mb-2 line-clamp-1">${product.title}</h3>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl font-bold text-orange-500">$${product.price.toFixed(2)}</span>
          <span class="text-sm text-gray-500 line-through">$${(product.price * 1.3).toFixed(2)}</span>
        </div>
        <button class="btn btn-primary w-full">
          <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
          Add to Cart
        </button>
      </div>
    `
    
    card.addEventListener('click', () => {
      window.location.hash = `/product/${product.id}`
    })
    
    return card
  }

  setupEventListeners(page) {
    // Add any additional event listeners here
  }
}