import { Header } from '../components/Header.js'
import { getProducts } from '../data/products.js'

export class ShopshotsPage {
  constructor() {
    this.products = getProducts()
    this.currentIndex = 0
    this.isPlaying = false
  }

  render() {
    const page = document.createElement('div')
    page.className = 'h-screen bg-black overflow-hidden relative'
    
    const header = new Header('minimal')
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'shopshots-feed'
    main.innerHTML = `
      <div class="relative h-full" id="shopshots-container">
        ${this.products.map((product, index) => this.createShopshotItem(product, index)).join('')}
      </div>
      
      <!-- Navigation Dots -->
      <div class="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2" id="navigation-dots">
        ${this.products.map((_, index) => `
          <button class="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors ${index === 0 ? 'bg-white' : ''}" data-index="${index}"></button>
        `).join('')}
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    this.initializePlayer(page)
    return page
  }

  createShopshotItem(product, index) {
    return `
      <div class="shopshot-item ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="video-player">
          <video 
            class="w-full h-full object-cover" 
            loop 
            muted 
            preload="metadata"
            data-src="${product.video || product.image}"
            ${index === 0 ? 'autoplay' : ''}
          >
            <source src="${product.video || product.image}" type="video/mp4">
          </video>
          
          <!-- Video Overlay -->
          <div class="video-overlay">
            <div class="flex-1"></div>
            
            <!-- Product Info -->
            <div class="space-y-4">
              <div>
                <h2 class="text-xl font-bold mb-2">${product.title}</h2>
                <p class="text-sm opacity-90 line-clamp-2">${product.description}</p>
                <p class="text-xs opacity-75 mt-1">${product.seller}</p>
              </div>
              
              <!-- Actions -->
              <div class="flex items-center gap-4">
                <button class="btn btn-primary btn-large flex-1" data-product-id="${product.id}">
                  <span class="material-symbols-outlined">shopping_bag</span>
                  Buy This Product - $${product.price.toFixed(2)}
                </button>
                <button class="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors" data-action="like" data-product-id="${product.id}">
                  <span class="material-symbols-outlined ${product.isLiked ? 'text-red-400' : 'text-white'}">${product.isLiked ? 'favorite' : 'favorite_border'}</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Play/Pause Button -->
          <div class="video-controls">
            <button class="p-4 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors" data-action="toggle-play">
              <span class="material-symbols-outlined text-4xl play-icon">play_arrow</span>
              <span class="material-symbols-outlined text-4xl pause-icon hidden">pause</span>
            </button>
          </div>
        </div>
        
        <!-- Side Actions -->
        <div class="absolute right-4 bottom-32 flex flex-col gap-4 z-30">
          <div class="text-center">
            <button class="p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-action="like" data-product-id="${product.id}">
              <span class="material-symbols-outlined ${product.isLiked ? 'text-red-400' : 'text-white'}">${product.isLiked ? 'favorite' : 'favorite_border'}</span>
            </button>
            <p class="text-xs text-white/80 mt-1">${product.likes}</p>
          </div>
          
          <div class="text-center">
            <button class="p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-action="comment">
              <span class="material-symbols-outlined">chat_bubble</span>
            </button>
            <p class="text-xs text-white/80 mt-1">${product.comments}</p>
          </div>
          
          <div class="text-center">
            <button class="p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-action="share">
              <span class="material-symbols-outlined">share</span>
            </button>
          </div>
          
          <div class="text-center">
            <button class="p-3 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors" data-product-id="${product.id}">
              <span class="material-symbols-outlined">info</span>
            </button>
          </div>
        </div>
      </div>
    `
  }

  initializePlayer(page) {
    const container = page.querySelector('#shopshots-container')
    const videos = container.querySelectorAll('video')
    
    // Initialize first video
    if (videos[0]) {
      videos[0].play()
      this.isPlaying = true
    }
  }

  setupEventListeners(page) {
    const container = page.querySelector('#shopshots-container')
    const dots = page.querySelectorAll('[data-index]')
    
    // Scroll navigation
    let isScrolling = false
    container.addEventListener('wheel', (e) => {
      if (isScrolling) return
      
      isScrolling = true
      setTimeout(() => isScrolling = false, 500)
      
      if (e.deltaY > 0 && this.currentIndex < this.products.length - 1) {
        this.navigateToIndex(this.currentIndex + 1, page)
      } else if (e.deltaY < 0 && this.currentIndex > 0) {
        this.navigateToIndex(this.currentIndex - 1, page)
      }
    })
    
    // Touch navigation
    let startY = 0
    container.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY
    })
    
    container.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY
      const diff = startY - endY
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && this.currentIndex < this.products.length - 1) {
          this.navigateToIndex(this.currentIndex + 1, page)
        } else if (diff < 0 && this.currentIndex > 0) {
          this.navigateToIndex(this.currentIndex - 1, page)
        }
      }
    })
    
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'))
        this.navigateToIndex(index, page)
      })
    })
    
    // Action buttons
    page.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.getAttribute('data-action')
      const productId = e.target.closest('[data-product-id]')?.getAttribute('data-product-id')
      
      if (action === 'toggle-play') {
        this.togglePlay(page)
      } else if (action === 'like' && productId) {
        this.toggleLike(productId, page)
      } else if (action === 'comment') {
        this.openComments()
      } else if (action === 'share') {
        this.shareProduct()
      } else if (productId && !action) {
        window.location.hash = `/product/${productId}`
      }
    })
    
    // Buy button
    page.addEventListener('click', (e) => {
      if (e.target.closest('[data-product-id]')?.textContent.includes('Buy This Product')) {
        const productId = e.target.closest('[data-product-id]').getAttribute('data-product-id')
        window.location.hash = `/product/${productId}`
      }
    })
  }

  navigateToIndex(index, page) {
    if (index === this.currentIndex) return
    
    const items = page.querySelectorAll('.shopshot-item')
    const dots = page.querySelectorAll('[data-index]')
    const videos = page.querySelectorAll('video')
    
    // Stop current video
    if (videos[this.currentIndex]) {
      videos[this.currentIndex].pause()
    }
    
    // Update active states
    items[this.currentIndex]?.classList.remove('active')
    dots[this.currentIndex]?.classList.remove('bg-white')
    dots[this.currentIndex]?.classList.add('bg-white/50')
    
    items[index]?.classList.add('active')
    dots[index]?.classList.remove('bg-white/50')
    dots[index]?.classList.add('bg-white')
    
    // Scroll to new item
    items[index]?.scrollIntoView({ behavior: 'smooth' })
    
    // Play new video
    setTimeout(() => {
      if (videos[index]) {
        videos[index].play()
        this.isPlaying = true
      }
    }, 300)
    
    this.currentIndex = index
  }

  togglePlay(page) {
    const video = page.querySelectorAll('video')[this.currentIndex]
    const playIcon = page.querySelector('.shopshot-item.active .play-icon')
    const pauseIcon = page.querySelector('.shopshot-item.active .pause-icon')
    
    if (this.isPlaying) {
      video.pause()
      playIcon.classList.remove('hidden')
      pauseIcon.classList.add('hidden')
      this.isPlaying = false
    } else {
      video.play()
      playIcon.classList.add('hidden')
      pauseIcon.classList.remove('hidden')
      this.isPlaying = true
    }
  }

  toggleLike(productId, page) {
    const product = this.products.find(p => p.id === parseInt(productId))
    if (product) {
      product.isLiked = !product.isLiked
      product.likes += product.isLiked ? 1 : -1
      
      // Update UI
      const likeButtons = page.querySelectorAll(`[data-product-id="${productId}"][data-action="like"]`)
      likeButtons.forEach(button => {
        const icon = button.querySelector('.material-symbols-outlined')
        icon.textContent = product.isLiked ? 'favorite' : 'favorite_border'
        icon.className = `material-symbols-outlined ${product.isLiked ? 'text-red-400' : 'text-white'}`
      })
      
      // Update like count
      const likeCount = page.querySelector('.shopshot-item.active .text-xs')
      if (likeCount) {
        likeCount.textContent = product.likes
      }
    }
  }

  openComments() {
    // Implement comments modal
    console.log('Opening comments...')
  }

  shareProduct() {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product on StyleHub',
        url: window.location.href
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      console.log('Link copied to clipboard')
    }
  }
}