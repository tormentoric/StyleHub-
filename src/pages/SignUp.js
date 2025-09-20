import { Header } from '../components/Header.js'

export class SignUpPage {
  constructor() {
    this.isLoading = false
  }

  render() {
    const page = document.createElement('div')
    page.className = 'bg-orange-50 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-200'
    
    const header = new Header('signup')
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'
    main.innerHTML = `
      <div class="w-full max-w-md space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <a class="font-medium text-orange-500 hover:text-orange-400 transition-colors" href="#" data-route="/signin">
              Sign in
            </a>
          </p>
        </div>
        <form class="mt-8 space-y-6" id="signup-form">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="sr-only" for="username">Username</label>
              <input class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-t-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" id="username" name="username" placeholder="Username" required type="text"/>
            </div>
            <div>
              <label class="sr-only" for="email-address">Email address</label>
              <input autocomplete="email" class="appearance-none rounded-none relative block w-full px-3 py-3 border-t-0 border-b border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" id="email-address" name="email" placeholder="Email address" required type="email"/>
            </div>
            <div>
              <label class="sr-only" for="password">Password</label>
              <input autocomplete="new-password" class="appearance-none rounded-none relative block w-full px-3 py-3 border-t-0 border-b border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" id="password" name="password" placeholder="Password" required type="password"/>
            </div>
            <div>
              <label class="sr-only" for="confirm-password">Confirm Password</label>
              <input autocomplete="new-password" class="appearance-none rounded-none relative block w-full px-3 py-3 border-t-0 border-b border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-b-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required type="password"/>
            </div>
          </div>
          <div>
            <button class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" type="submit" id="submit-button">
              <span class="signup-text">Sign up</span>
              <span class="loading-text hidden">
                <span class="spinner mr-2"></span>
                Creating account...
              </span>
            </button>
          </div>
        </form>
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-orange-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button class="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors" type="button">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"></path>
            </svg>
            Google
          </button>
          <button class="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors" type="button">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10S17.52 2.04 12 2.04zm2.84 10.37h-2.13v5.45h-2.9v-5.45H8.19V10.1h1.62V8.62c0-1.31.65-3.31 3.31-3.31l2.28.02v2.29h-1.63c-.45 0-.71.22-.71.72v1.76h2.36l-.32 2.27z"></path>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  setupEventListeners(page) {
    const form = page.querySelector('#signup-form')
    const submitButton = page.querySelector('#submit-button')
    const signupText = page.querySelector('.signup-text')
    const loadingText = page.querySelector('.loading-text')

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      if (this.isLoading) return

      const formData = new FormData(form)
      const username = formData.get('username')
      const email = formData.get('email')
      const password = formData.get('password')
      const confirmPassword = formData.get('confirm-password')

      // Validation
      if (password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters')
        return
      }

      this.isLoading = true
      submitButton.disabled = true
      signupText.classList.add('hidden')
      loadingText.classList.remove('hidden')

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Success - redirect to feed
        window.location.hash = '/feed'
      } catch (error) {
        alert('Error creating account. Please try again.')
      } finally {
        this.isLoading = false
        submitButton.disabled = false
        signupText.classList.remove('hidden')
        loadingText.classList.add('hidden')
      }
    })
  }
}