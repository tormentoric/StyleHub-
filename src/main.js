import './style.css'
import { Router } from './router.js'
import { AuthManager } from './auth.js'
import { CartManager } from './cart.js'

class StyleHubApp {
  constructor() {
    this.router = new Router()
    this.auth = new AuthManager()
    this.cart = new CartManager()
    this.init()
  }

  init() {
    this.setupRoutes()
    this.setupEventListeners()
    this.router.init()
  }

  setupRoutes() {
    this.router.addRoute('/', () => import('./pages/Home.js').then(m => new m.HomePage()))
    this.router.addRoute('/signup', () => import('./pages/SignUp.js').then(m => new m.SignUpPage()))
    this.router.addRoute('/feed', () => import('./pages/Feed.js').then(m => new m.FeedPage()))
    this.router.addRoute('/search', () => import('./pages/Search.js').then(m => new m.SearchPage()))
    this.router.addRoute('/messages', () => import('./pages/Messages.js').then(m => new m.MessagesPage()))
    this.router.addRoute('/product/:id', () => import('./pages/Product.js').then(m => new m.ProductPage()))
  }

  setupEventListeners() {
    // Global click handler for navigation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]')
      if (link) {
        e.preventDefault()
        const route = link.getAttribute('data-route')
        this.router.navigate(route)
      }
    })

    // Theme toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-theme-toggle]')) {
        document.documentElement.classList.toggle('dark')
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
      }
    })
  }
}

// Initialize app
new StyleHubApp()