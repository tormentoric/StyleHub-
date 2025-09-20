export class Header {
  constructor(variant = 'default') {
    this.variant = variant
  }

  render() {
    const header = document.createElement('header')
    
    if (this.variant === 'signup') {
      header.className = 'w-full px-4 sm:px-6 lg:px-8'
      header.innerHTML = `
        <div class="container mx-auto flex items-center justify-between py-4 border-b border-orange-500/20 dark:border-orange-500/30">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 text-orange-500">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">StyleHub</h1>
          </div>
          <nav class="hidden md:flex items-center gap-8">
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/">Shop</a>
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/feed">Explore</a>
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/sell">Sell</a>
          </nav>
          <div class="flex items-center gap-4">
            <a class="px-4 py-2 text-sm font-bold rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-colors text-orange-500" href="#" data-route="/signin">
              Sign in
            </a>
          </div>
        </div>
      `
    } else if (this.variant === 'marketplace') {
      header.className = 'sticky top-0 z-50 w-full whitespace-nowrap border-b border-gray-200/60 dark:border-gray-700/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 ease-in-out'
      header.innerHTML = `
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="material-symbols-outlined text-3xl">storefront</span>
              <h2 class="text-xl font-bold font-sans">StyleHub</h2>
            </div>
            <nav class="hidden md:flex items-center gap-6">
              <a class="text-sm font-medium font-sans text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#" data-route="/">Home</a>
              <a class="text-sm font-medium font-sans text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#" data-route="/search">Shop</a>
            </nav>
          </div>
          <div class="flex flex-1 items-center justify-end gap-4">
            <div class="relative w-full max-w-xs hidden sm:block">
              <span class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input class="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm font-sans focus:border-orange-500 focus:ring-orange-500" placeholder="Search products..." type="search" id="header-search"/>
            </div>
            <div class="flex items-center gap-2">
              <button class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" data-route="/messages">
                <span class="material-symbols-outlined text-gray-500">mail_outline</span>
              </button>
              <button class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative" id="cart-button">
                <span class="material-symbols-outlined text-gray-500">shopping_bag</span>
                <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" id="cart-count">0</span>
              </button>
              <div class="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat ring-2 ring-gray-300 cursor-pointer" style='background-image: url("https://api.dicebear.com/7.x/avataaars/svg?seed=user")' data-route="/profile"></div>
            </div>
          </div>
        </div>
      `
    } else {
      header.className = 'flex items-center justify-between whitespace-nowrap border-b border-orange-500/20 px-10 py-3'
      header.innerHTML = `
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3 text-orange-500">
            <span class="material-symbols-outlined text-3xl">local_mall</span>
            <h2 class="text-xl font-bold">StyleHub</h2>
          </div>
          <nav class="flex items-center gap-6">
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/">Home</a>
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/feed">Explore</a>
            <a class="text-sm font-medium hover:text-orange-500 transition-colors" href="#" data-route="/create">Create</a>
          </nav>
        </div>
        <div class="flex flex-1 items-center justify-end gap-4">
          <div class="flex gap-2">
            <button class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-500/20 dark:bg-gray-800 dark:hover:bg-orange-500/30 transition-colors">
              <span class="material-symbols-outlined text-orange-500">favorite_border</span>
            </button>
            <button class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-500/20 dark:bg-gray-800 dark:hover:bg-orange-500/30 transition-colors relative" id="cart-button">
              <span class="material-symbols-outlined text-orange-500">shopping_bag</span>
              <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" id="cart-count">0</span>
            </button>
          </div>
          <div class="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat ring-2 ring-orange-500/50 cursor-pointer" style='background-image: url("https://api.dicebear.com/7.x/avataaars/svg?seed=user")' data-route="/profile"></div>
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
        // Show cart modal or navigate to cart page
        console.log('Cart clicked')
      })
    }
  }
}