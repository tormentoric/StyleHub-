import { Header } from '../components/Header.js'

export class CartPage {
  constructor() {
    this.cartItems = this.loadCartItems()
  }

  loadCartItems() {
    // Mock cart items - in real app, this would come from cart manager
    return [
      {
        id: 1,
        title: "Vintage Leather Jacket",
        price: 120.00,
        seller: "@fashionista_lisa",
        image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
        quantity: 1,
        size: "M"
      },
      {
        id: 3,
        title: "Sustainable Cotton T-Shirt",
        price: 25.00,
        seller: "@eco_chic",
        image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800",
        quantity: 2,
        size: "L"
      }
    ]
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-white dark:bg-gray-900'
    
    const header = new Header()
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'container section'
    
    if (this.cartItems.length === 0) {
      main.innerHTML = this.renderEmptyCart()
    } else {
      main.innerHTML = this.renderCartWithItems()
    }

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  renderEmptyCart() {
    return `
      <div class="text-center py-16">
        <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">shopping_cart</span>
        <h2 class="heading-3 mb-4">Your cart is empty</h2>
        <p class="body mb-8">Looks like you haven't added anything to your cart yet</p>
        <button class="btn btn-primary btn-large" data-route="/shop">
          <span class="material-symbols-outlined">storefront</span>
          Continue Shopping
        </button>
      </div>
    `
  }

  renderCartWithItems() {
    const subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const platformFee = subtotal * 0.05
    const total = subtotal + platformFee

    return `
      <div class="max-w-4xl mx-auto">
        <h1 class="heading-2 mb-8">Shopping Cart (${this.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            ${this.cartItems.map(item => `
              <div class="card p-6">
                <div class="flex gap-4">
                  <div class="w-24 h-24 bg-cover bg-center rounded-xl flex-shrink-0" style="background-image: url('${item.image}')"></div>
                  <div class="flex-1">
                    <h3 class="font-semibold mb-1">${item.title}</h3>
                    <p class="text-sm text-gray-500 mb-2">${item.seller}</p>
                    <p class="text-sm text-gray-500 mb-3">Size: ${item.size}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <button class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors" data-action="decrease" data-id="${item.id}">
                          <span class="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span class="font-medium w-8 text-center">${item.quantity}</span>
                        <button class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors" data-action="increase" data-id="${item.id}">
                          <span class="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="text-sm text-red-500 hover:text-red-700 transition-colors" data-action="remove" data-id="${item.id}">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-24">
              <h3 class="font-semibold mb-4">Order Summary</h3>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>Platform fee (5%)</span>
                  <span>$${platformFee.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr>
                <div class="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button class="btn btn-primary w-full btn-large mb-3" id="checkout-btn">
                <span class="material-symbols-outlined">payment</span>
                Proceed to Checkout
              </button>
              
              <button class="btn btn-ghost w-full" data-route="/shop">
                <span class="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  setupEventListeners(page) {
    page.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]')?.getAttribute('data-action')
      const itemId = e.target.closest('[data-id]')?.getAttribute('data-id')
      
      if (action && itemId) {
        this.handleCartAction(action, parseInt(itemId), page)
      }
    })

    const checkoutBtn = page.querySelector('#checkout-btn')
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        window.location.hash = '/checkout'
      })
    }
  }

  handleCartAction(action, itemId, page) {
    const item = this.cartItems.find(item => item.id === itemId)
    if (!item) return

    switch (action) {
      case 'increase':
        item.quantity += 1
        break
      case 'decrease':
        if (item.quantity > 1) {
          item.quantity -= 1
        }
        break
      case 'remove':
        this.cartItems = this.cartItems.filter(item => item.id !== itemId)
        break
    }

    // Re-render the page
    const main = page.querySelector('main')
    if (this.cartItems.length === 0) {
      main.innerHTML = this.renderEmptyCart()
    } else {
      main.innerHTML = this.renderCartWithItems()
    }
    
    this.setupEventListeners(page)
  }
}