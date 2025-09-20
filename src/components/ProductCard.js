export class ProductCard {
  constructor(product, variant = 'grid') {
    this.product = product
    this.variant = variant
  }

  render() {
    const card = document.createElement('div')
    
    if (this.variant === 'feed') {
      card.className = 'overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover-lift'
      card.innerHTML = `
        <div class="aspect-video w-full bg-cover bg-center relative" style='background-image: url("${this.product.image}")'>
          ${this.product.isLive ? `
            <div class="absolute top-3 right-3 flex items-center gap-2 rounded-md bg-red-500/90 px-2 py-1 text-xs font-bold text-white">
              <div class="h-2 w-2 rounded-full bg-white"></div>
              <span>LIVE</span>
            </div>
          ` : ''}
        </div>
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h2 class="text-lg font-bold">${this.product.title}</h2>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">${this.product.description}</p>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-500">Posted by ${this.product.seller}</p>
            </div>
            <button class="ml-4 btn btn-primary shrink-0" data-product-id="${this.product.id}">
              View Product
            </button>
          </div>
          <div class="mt-4 flex items-center gap-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <button class="group like-button" data-product-id="${this.product.id}">
                <span class="material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'} transition-colors">
                  ${this.product.isLiked ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              <span>${this.product.likes}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <button class="group">
                <span class="material-symbols-outlined text-gray-400 group-hover:text-orange-500 transition-colors">chat_bubble_outline</span>
              </button>
              <span>${this.product.comments}</span>
            </div>
          </div>
        </div>
      `
    } else {
      card.className = 'overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover-lift cursor-pointer'
      card.innerHTML = `
        <div class="aspect-square w-full bg-cover bg-center" style='background-image: url("${this.product.image}")'></div>
        <div class="p-4">
          <h2 class="text-base font-semibold truncate">${this.product.title}</h2>
          <p class="text-lg font-bold mt-1 text-orange-500">$${this.product.price.toFixed(2)}</p>
          <p class="text-sm text-gray-500 mt-1">by ${this.product.seller}</p>
        </div>
      `
    }

    this.setupEventListeners(card)
    return card
  }

  setupEventListeners(card) {
    // Like button
    const likeButton = card.querySelector('.like-button')
    if (likeButton) {
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        this.toggleLike()
      })
    }

    // View product button
    const viewButton = card.querySelector('[data-product-id]')
    if (viewButton) {
      viewButton.addEventListener('click', (e) => {
        e.stopPropagation()
        window.location.hash = `/product/${this.product.id}`
      })
    }

    // Card click (for grid variant)
    if (this.variant === 'grid') {
      card.addEventListener('click', () => {
        window.location.hash = `/product/${this.product.id}`
      })
    }
  }

  toggleLike() {
    this.product.isLiked = !this.product.isLiked
    this.product.likes += this.product.isLiked ? 1 : -1
    
    const likeButton = document.querySelector(`.like-button[data-product-id="${this.product.id}"]`)
    const icon = likeButton.querySelector('.material-symbols-outlined')
    const count = likeButton.parentElement.querySelector('span:last-child')
    
    icon.textContent = this.product.isLiked ? 'favorite' : 'favorite_border'
    icon.className = `material-symbols-outlined ${this.product.isLiked ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'} transition-colors`
    count.textContent = this.product.likes
  }
}