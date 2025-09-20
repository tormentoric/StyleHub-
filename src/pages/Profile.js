import { Header } from '../components/Header.js'

export class ProfilePage {
  constructor() {
    this.user = {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      joinDate: "January 2023",
      totalOrders: 24,
      totalSpent: 1250.00,
      favoriteItems: 18
    }
    
    this.activeTab = 'account'
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-white dark:bg-gray-900'
    
    const header = new Header()
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'container section'
    main.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <!-- Profile Header -->
        <div class="card p-8 mb-8">
          <div class="flex items-center gap-6">
            <div class="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-4xl">person</span>
            </div>
            <div class="flex-1">
              <h1 class="heading-2 mb-2">${this.user.name}</h1>
              <p class="body text-gray-600 dark:text-gray-400 mb-4">${this.user.email}</p>
              <div class="flex items-center gap-6 text-sm text-gray-500">
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">calendar_today</span>
                  <span>Joined ${this.user.joinDate}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">shopping_bag</span>
                  <span>${this.user.totalOrders} orders</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">favorite</span>
                  <span>${this.user.favoriteItems} favorites</span>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary">
              <span class="material-symbols-outlined">edit</span>
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav class="flex space-x-8">
            <button class="tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors ${this.activeTab === 'account' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}" data-tab="account">
              Account Information
            </button>
            <button class="tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors ${this.activeTab === 'orders' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}" data-tab="orders">
              Order History
            </button>
            <button class="tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors ${this.activeTab === 'payments' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}" data-tab="payments">
              Payment Methods
            </button>
            <button class="tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors ${this.activeTab === 'settings' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}" data-tab="settings">
              Settings
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div id="tab-content">
          ${this.renderTabContent()}
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'account':
        return this.renderAccountTab()
      case 'orders':
        return this.renderOrdersTab()
      case 'payments':
        return this.renderPaymentsTab()
      case 'settings':
        return this.renderSettingsTab()
      default:
        return this.renderAccountTab()
    }
  }

  renderAccountTab() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Personal Information</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" class="input" value="${this.user.name}">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" class="input" value="${this.user.email}">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input type="tel" class="input" placeholder="+1 (555) 123-4567">
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Shipping Address</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
              <input type="text" class="input" placeholder="123 Main Street">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input type="text" class="input" placeholder="New York">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                <input type="text" class="input" placeholder="NY">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
              <input type="text" class="input" placeholder="10001">
            </div>
            <button class="btn btn-primary">Save Address</button>
          </div>
        </div>
      </div>
    `
  }

  renderOrdersTab() {
    const orders = [
      {
        id: "ORD-001",
        date: "Dec 15, 2024",
        total: 145.00,
        status: "Delivered",
        items: 2
      },
      {
        id: "ORD-002", 
        date: "Dec 10, 2024",
        total: 85.00,
        status: "Shipped",
        items: 1
      },
      {
        id: "ORD-003",
        date: "Dec 5, 2024", 
        total: 220.00,
        status: "Processing",
        items: 3
      }
    ]

    return `
      <div class="space-y-4">
        ${orders.map(order => `
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-semibold">${order.id}</h3>
                <p class="text-sm text-gray-500">${order.date} • ${order.items} items</p>
              </div>
              <div class="text-right">
                <p class="font-bold">$${order.total.toFixed(2)}</p>
                <span class="badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Shipped' ? 'badge-primary' : 'badge-warning'}">${order.status}</span>
              </div>
            </div>
            <div class="flex gap-3">
              <button class="btn btn-ghost btn-small">View Details</button>
              <button class="btn btn-ghost btn-small">Track Order</button>
              ${order.status === 'Delivered' ? '<button class="btn btn-ghost btn-small">Reorder</button>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `
  }

  renderPaymentsTab() {
    return `
      <div class="space-y-6">
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">Payment Methods</h3>
            <button class="btn btn-primary btn-small">
              <span class="material-symbols-outlined text-sm">add</span>
              Add Card
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <span class="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p class="font-medium">•••• •••• •••• 4242</p>
                  <p class="text-sm text-gray-500">Expires 12/26</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge badge-primary">Default</span>
                <button class="btn btn-ghost btn-small">Edit</button>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-6 bg-gradient-to-r from-red-600 to-red-800 rounded flex items-center justify-center">
                  <span class="text-white text-xs font-bold">MC</span>
                </div>
                <div>
                  <p class="font-medium">•••• •••• •••• 8888</p>
                  <p class="text-sm text-gray-500">Expires 08/27</p>
                </div>
              </div>
              <button class="btn btn-ghost btn-small">Edit</button>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Billing Address</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Same as shipping address</p>
          <button class="btn btn-ghost btn-small">Change Billing Address</button>
        </div>
      </div>
    `
  }

  renderSettingsTab() {
    return `
      <div class="space-y-6">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Order Updates</p>
                <p class="text-sm text-gray-500">Get notified about your order status</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">New Messages</p>
                <p class="text-sm text-gray-500">Get notified when sellers message you</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Promotions</p>
                <p class="text-sm text-gray-500">Receive deals and special offers</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Privacy</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Profile Visibility</p>
                <p class="text-sm text-gray-500">Make your profile visible to other users</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4 text-red-600">Danger Zone</h3>
          <div class="space-y-4">
            <button class="btn bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
              <span class="material-symbols-outlined">delete</span>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    `
  }

  setupEventListeners(page) {
    // Tab switching
    const tabButtons = page.querySelectorAll('.tab-btn')
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab')
        this.activeTab = tab
        
        // Update tab styles
        tabButtons.forEach(btn => {
          btn.className = 'tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors border-transparent text-gray-500 hover:text-gray-700'
        })
        button.className = 'tab-btn py-4 px-1 border-b-2 font-medium text-sm transition-colors border-orange-500 text-orange-600'
        
        // Update content
        const content = page.querySelector('#tab-content')
        content.innerHTML = this.renderTabContent()
      })
    })
  }
}