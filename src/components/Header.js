export class Header {
  constructor(variant = 'default') {
    this.variant = variant
  }

  render() {
    const header = document.createElement('header')
    
    if (this.variant === 'minimal') {
      // Minimal header for Shopshots feed
      header.className = 'fixed top-0 left-0 right-0 z-50 p-4 bg-transparent'
      header.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-white">
            <span class="material-symbols-outlined text-2xl">shopping_bag</span>
            <h1 class="text-xl font-bold">StyleHub</h1>
          </div>
          <div class="flex items-center gap-3">
            <button class="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-route="/search">
              <span class="material-symbols-outlined">search</span>
            </button>
            <button class="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-route="/profile">
              <span class="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      `
    } else {
      // Main header for other pages
      header.className = 'sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
      header.innerHTML = `
        <div class="container">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-2 cursor-pointer" data-route="/">
                <span class="material-symbols-outlined text-2xl text-orange-500">shopping_bag</span>
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">StyleHub</h1>
              </div>
              <nav class="hidden md:flex items-center gap-6">
                <a class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#" data-route="/shopshots">Shopshots</a>
                <a class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#" data-route="/shop">Shop</a>
                <a class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#" data-route="/sell">Sell</a>
              </nav>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="relative hidden sm:block">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                <input 
                  class="w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-white dark:focus:bg-gray-700 transition-colors" 
                  placeholder="Search products..." 
                  type="search" 
                  id="header-search"
                />
              </div>
              
              <div class="flex items-center gap-2">
                <button class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-route="/messages">
                  <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">mail</span>
                </button>
                
                <button class="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" id="cart-button">
                  <span class="material-symbols-outlined text-gray-600 dark:text-gray-400">shopping_cart</span>
                  <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium" id="cart-count">0</span>
                </button>
                
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center cursor-pointer" data-route="/profile">
                  <span class="material-symbols-outlined text-white text-sm">person</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }

    this.setupEventListeners(header)
    return header
  }

  setupEventListeners(header) {
    // Search functionality
    const searchInput = header.querySelector('#header-search')
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = e.target.value.trim()
          if (query) {
            window.location.hash = `/search?q=${encodeURIComponent(query)}`
          }
        }
      })
    }

    // Cart button
    const cartButton = header.querySelector('#cart-button')
    if (cartButton) {
      cartButton.addEventListener('click', () => {
        window.location.hash = '/cart'
      })
    }
  }
}