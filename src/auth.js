export class AuthManager {
  constructor() {
    this.user = this.loadUser()
    this.listeners = []
  }

  loadUser() {
    const userData = localStorage.getItem('stylehub_user')
    return userData ? JSON.parse(userData) : null
  }

  saveUser(user) {
    localStorage.setItem('stylehub_user', JSON.stringify(user))
    this.user = user
    this.notifyListeners()
  }

  signUp(userData) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Date.now(),
          username: userData.username,
          email: userData.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
          createdAt: new Date().toISOString()
        }
        this.saveUser(user)
        resolve(user)
      }, 1000)
    })
  }

  signIn(credentials) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          const user = {
            id: Date.now(),
            username: credentials.email.split('@')[0],
            email: credentials.email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
            createdAt: new Date().toISOString()
          }
          this.saveUser(user)
          resolve(user)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  signOut() {
    localStorage.removeItem('stylehub_user')
    this.user = null
    this.notifyListeners()
  }

  isAuthenticated() {
    return !!this.user
  }

  getUser() {
    return this.user
  }

  onAuthChange(callback) {
    this.listeners.push(callback)
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.user))
  }
}