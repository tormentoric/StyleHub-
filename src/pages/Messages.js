import { Header } from '../components/Header.js'

export class MessagesPage {
  constructor() {
    this.conversations = [
      {
        id: 1,
        name: "Ceramic Creations",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ceramic",
        lastMessage: "Hi there! I'm interested in your handmade...",
        timestamp: "2d ago",
        isActive: true,
        isOnline: true
      },
      {
        id: 2,
        name: "Retro Threads",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=retro",
        lastMessage: "Your vintage clothing collection is amazing!",
        timestamp: "1w ago",
        isActive: false,
        isOnline: false
      },
      {
        id: 3,
        name: "Artisan Jewelry",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jewelry",
        lastMessage: "I received the package today, and the jewelry...",
        timestamp: "2w ago",
        isActive: false,
        isOnline: false
      },
      {
        id: 4,
        name: "Creative Canvas",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=canvas",
        lastMessage: "I'm looking for a unique gift for my friend...",
        timestamp: "1mo ago",
        isActive: false,
        isOnline: false
      },
      {
        id: 5,
        name: "Candlelight Crafts",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=candle",
        lastMessage: "I'm interested in your handmade candles.",
        timestamp: "2mo ago",
        isActive: false,
        isOnline: false
      }
    ]
  }

  render() {
    const page = document.createElement('div')
    page.className = 'flex flex-col min-h-screen bg-orange-50 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-200'
    
    const header = document.createElement('header')
    header.className = 'flex items-center justify-between px-6 py-4 border-b border-orange-500/20 dark:border-orange-500/30'
    header.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 text-orange-500">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold">StyleHub</h1>
      </div>
      <div class="flex items-center gap-4">
        <button class="p-2 rounded-full hover:bg-orange-500/10 dark:hover:bg-orange-500/20 transition-colors">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <div class="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer" style='background-image: url("https://api.dicebear.com/7.x/avataaars/svg?seed=user")' data-route="/profile"></div>
      </div>
    `

    const main = document.createElement('main')
    main.className = 'flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    main.innerHTML = `
      <div class="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 class="text-3xl font-bold mb-4 md:mb-0">Messages</h2>
        <button class="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors">
          <span class="material-symbols-outlined">add</span>
          <span>New Chat</span>
        </button>
      </div>
      <div class="mb-8">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/50">search</span>
          <input class="w-full pl-10 pr-4 py-3 bg-orange-500/10 dark:bg-orange-500/20 border-2 border-transparent focus:border-orange-500 focus:ring-0 rounded-lg placeholder:text-orange-500/50" placeholder="Search conversations..." type="text" id="search-input"/>
        </div>
      </div>
      <div class="space-y-2" id="conversations-container">
      </div>
    `

    page.appendChild(header)
    page.appendChild(main)
    
    this.renderConversations(page)
    this.setupEventListeners(page)
    return page
  }

  renderConversations(page) {
    const container = page.querySelector('#conversations-container')
    
    container.innerHTML = this.conversations.map(conv => `
      <div class="flex items-center gap-4 p-3 rounded-lg cursor-pointer ${conv.isActive ? 'bg-orange-500/10 dark:bg-orange-500/20 ring-2 ring-orange-500' : 'hover:bg-orange-500/10 dark:hover:bg-orange-500/20'} transition-colors" data-conversation-id="${conv.id}">
        <div class="relative">
          <div class="w-14 h-14 bg-center bg-no-repeat bg-cover rounded-full" style='background-image: url("${conv.avatar}")'></div>
          ${conv.isOnline ? '<span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-orange-500 ring-2 ring-orange-50 dark:ring-gray-900"></span>' : ''}
        </div>
        <div class="flex-grow">
          <div class="flex items-center justify-between">
            <p class="font-bold">${conv.name}</p>
            <p class="text-xs text-orange-500/80">${conv.timestamp}</p>
          </div>
          <p class="text-sm text-orange-500/80 line-clamp-1 ${conv.isActive ? 'font-medium' : ''}">${conv.lastMessage}</p>
        </div>
      </div>
    `).join('')

    // Add click handlers
    container.querySelectorAll('[data-conversation-id]').forEach(item => {
      item.addEventListener('click', () => {
        const convId = item.getAttribute('data-conversation-id')
        this.selectConversation(convId, page)
      })
    })
  }

  selectConversation(convId, page) {
    // Update active state
    this.conversations.forEach(conv => {
      conv.isActive = conv.id === parseInt(convId)
    })
    
    // Re-render conversations
    this.renderConversations(page)
    
    // Here you would typically load the conversation messages
    console.log('Selected conversation:', convId)
  }

  setupEventListeners(page) {
    const searchInput = page.querySelector('#search-input')
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase()
      const filtered = this.conversations.filter(conv => 
        conv.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
      )
      
      // Update display (simplified for demo)
      console.log('Filtered conversations:', filtered)
    })
  }
}