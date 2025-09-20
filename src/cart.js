export class CartManager {
  constructor() {
    this.items = this.loadCart()
    this.listeners = []
  }

  loadCart() {
    const cartData = localStorage.getItem('stylehub_cart')
    return cartData ? JSON.parse(cartData) : []
  }

  saveCart() {
    localStorage.setItem('stylehub_cart', JSON.stringify(this.items))
    this.notifyListeners()
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({
        ...product,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
    
    this.saveCart()
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId)
    this.saveCart()
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveCart()
      }
    }
  }

  getItems() {
    return this.items
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  clear() {
    this.items = []
    this.saveCart()
  }

  onCartChange(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items))
  }
}