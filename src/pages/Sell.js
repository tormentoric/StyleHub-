import { Header } from '../components/Header.js'

export class SellPage {
  constructor() {
    this.currentStep = 1
    this.productData = {}
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
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="heading-1 mb-4">Start Selling on StyleHub</h1>
          <p class="body-large text-gray-600 dark:text-gray-400">Create engaging Shopshots and reach thousands of buyers</p>
        </div>

        <!-- Progress Steps -->
        <div class="flex items-center justify-center mb-12">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">1</div>
              <span class="text-sm font-medium ${this.currentStep >= 1 ? 'text-orange-500' : 'text-gray-500'}">Product Info</span>
            </div>
            <div class="w-8 h-px bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">2</div>
              <span class="text-sm font-medium ${this.currentStep >= 2 ? 'text-orange-500' : 'text-gray-500'}">Create Shopshot</span>
            </div>
            <div class="w-8 h-px bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">3</div>
              <span class="text-sm font-medium ${this.currentStep >= 3 ? 'text-orange-500' : 'text-gray-500'}">Publish</span>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <div id="step-content">
          ${this.renderStepContent()}
        </div>
      </div>
    `

    page.appendChild(main)
    this.setupEventListeners(page)
    return page
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1:
        return this.renderProductInfoStep()
      case 2:
        return this.renderShopshotStep()
      case 3:
        return this.renderPublishStep()
      default:
        return this.renderProductInfoStep()
    }
  }

  renderProductInfoStep() {
    return `
      <div class="card p-8">
        <h2 class="heading-3 mb-6">Product Information</h2>
        <form id="product-form" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Title</label>
              <input type="text" name="title" class="input" placeholder="e.g., Vintage Leather Jacket" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
              <input type="number" name="price" class="input" placeholder="0.00" step="0.01" min="0" required>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea name="description" class="input min-h-[120px]" placeholder="Describe your product in detail..." required></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select name="category" class="input" required>
                <option value="">Select category</option>
                <option value="Jackets">Jackets</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Dresses">Dresses</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
              <select name="condition" class="input" required>
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size</label>
              <input type="text" name="size" class="input" placeholder="e.g., M, L, XL">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <input type="text" name="tags" class="input" placeholder="vintage, leather, fashion (comma separated)">
            <p class="text-xs text-gray-500 mt-1">Add tags to help buyers find your product</p>
          </div>

          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary btn-large">
              Continue to Shopshot
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    `
  }

  renderShopshotStep() {
    return `
      <div class="card p-8">
        <h2 class="heading-3 mb-6">Create Your Shopshot</h2>
        <p class="body mb-8 text-gray-600 dark:text-gray-400">Upload a video showcasing your product. Great Shopshots get more views and sales!</p>
        
        <div class="space-y-8">
          <!-- Video Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Upload Video</label>
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center">
              <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">video_camera_back</span>
              <h3 class="font-semibold mb-2">Upload your Shopshot video</h3>
              <p class="text-sm text-gray-500 mb-4">MP4, MOV up to 100MB. Recommended: 9:16 aspect ratio, 15-60 seconds</p>
              <button type="button" class="btn btn-primary" id="upload-video">
                <span class="material-symbols-outlined">upload</span>
                Choose Video File
              </button>
              <input type="file" id="video-input" accept="video/*" class="hidden">
            </div>
          </div>

          <!-- Video Preview -->
          <div id="video-preview" class="hidden">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</label>
            <div class="aspect-[9/16] max-w-sm mx-auto bg-black rounded-2xl overflow-hidden">
              <video id="preview-video" class="w-full h-full object-cover" controls></video>
            </div>
          </div>

          <!-- Tips -->
          <div class="card p-6 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-orange-500">lightbulb</span>
              Tips for Great Shopshots
            </h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-xs text-orange-500 mt-0.5">check_circle</span>
                Show the product in action or being worn
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-xs text-orange-500 mt-0.5">check_circle</span>
                Use good lighting and clear audio
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-xs text-orange-500 mt-0.5">check_circle</span>
                Keep it engaging and under 60 seconds
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-xs text-orange-500 mt-0.5">check_circle</span>
                Highlight unique features and benefits
              </li>
            </ul>
          </div>

          <div class="flex justify-between">
            <button type="button" class="btn btn-ghost btn-large" id="back-btn">
              <span class="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button type="button" class="btn btn-primary btn-large" id="continue-btn" disabled>
              Continue to Publish
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `
  }

  renderPublishStep() {
    return `
      <div class="card p-8">
        <h2 class="heading-3 mb-6">Ready to Publish</h2>
        <p class="body mb-8 text-gray-600 dark:text-gray-400">Review your product and Shopshot before publishing to the marketplace.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Product Preview -->
          <div>
            <h3 class="font-semibold mb-4">Product Details</h3>
            <div class="card p-6">
              <h4 class="font-semibold text-lg mb-2">${this.productData.title || 'Product Title'}</h4>
              <p class="text-2xl font-bold text-orange-500 mb-3">$${this.productData.price || '0.00'}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${this.productData.description || 'Product description...'}</p>
              <div class="flex flex-wrap gap-2">
                <span class="badge badge-primary">${this.productData.category || 'Category'}</span>
                <span class="badge badge-secondary">${this.productData.condition || 'Condition'}</span>
              </div>
            </div>
          </div>

          <!-- Shopshot Preview -->
          <div>
            <h3 class="font-semibold mb-4">Shopshot Preview</h3>
            <div class="aspect-[9/16] bg-black rounded-2xl overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-white">
                <div class="text-center">
                  <span class="material-symbols-outlined text-4xl mb-2">play_circle</span>
                  <p class="text-sm">Your Shopshot Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Publishing Options -->
        <div class="space-y-6 mb-8">
          <div class="card p-6">
            <h3 class="font-semibold mb-4">Publishing Options</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Publish immediately</p>
                  <p class="text-sm text-gray-500">Your product will be live right away</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="radio" name="publish-option" value="immediate" class="sr-only peer" checked>
                  <div class="w-4 h-4 border-2 border-orange-500 rounded-full peer-checked:bg-orange-500"></div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Schedule for later</p>
                  <p class="text-sm text-gray-500">Choose when to publish your product</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="radio" name="publish-option" value="scheduled" class="sr-only peer">
                  <div class="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-semibold mb-4">Seller Agreement</h3>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>By publishing this product, you agree to:</p>
              <ul class="space-y-1 ml-4">
                <li>• StyleHub's 5% platform fee on all sales</li>
                <li>• Provide accurate product descriptions</li>
                <li>• Ship items within 2-3 business days</li>
                <li>• Follow our community guidelines</li>
              </ul>
              <label class="flex items-start gap-3 mt-4">
                <input type="checkbox" class="mt-1" required>
                <span>I agree to the <a href="#" class="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" class="text-orange-500 hover:underline">Seller Agreement</a></span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" class="btn btn-ghost btn-large" id="back-btn">
            <span class="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button type="button" class="btn btn-primary btn-large" id="publish-btn">
            <span class="material-symbols-outlined">publish</span>
            Publish Product
          </button>
        </div>
      </div>
    `
  }

  setupEventListeners(page) {
    // Product form submission
    const productForm = page.querySelector('#product-form')
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(productForm)
        
        // Store product data
        this.productData = {
          title: formData.get('title'),
          price: formData.get('price'),
          description: formData.get('description'),
          category: formData.get('category'),
          condition: formData.get('condition'),
          size: formData.get('size'),
          tags: formData.get('tags')
        }
        
        this.nextStep(page)
      })
    }

    // Video upload
    const uploadBtn = page.querySelector('#upload-video')
    const videoInput = page.querySelector('#video-input')
    const continueBtn = page.querySelector('#continue-btn')
    
    if (uploadBtn && videoInput) {
      uploadBtn.addEventListener('click', () => {
        videoInput.click()
      })
      
      videoInput.addEventListener('change', (e) => {
        const file = e.target.files[0]
        if (file) {
          const preview = page.querySelector('#video-preview')
          const video = page.querySelector('#preview-video')
          
          const url = URL.createObjectURL(file)
          video.src = url
          preview.classList.remove('hidden')
          
          if (continueBtn) {
            continueBtn.disabled = false
            continueBtn.classList.remove('opacity-50', 'cursor-not-allowed')
          }
        }
      })
    }

    // Navigation buttons
    const backBtn = page.querySelector('#back-btn')
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.previousStep(page)
      })
    }

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.nextStep(page)
      })
    }

    // Publish button
    const publishBtn = page.querySelector('#publish-btn')
    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        this.publishProduct(page)
      })
    }
  }

  nextStep(page) {
    if (this.currentStep < 3) {
      this.currentStep++
      this.updateStepContent(page)
    }
  }

  previousStep(page) {
    if (this.currentStep > 1) {
      this.currentStep--
      this.updateStepContent(page)
    }
  }

  updateStepContent(page) {
    const content = page.querySelector('#step-content')
    content.innerHTML = this.renderStepContent()
    this.setupEventListeners(page)
    
    // Update progress indicators
    const main = page.querySelector('main')
    main.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="heading-1 mb-4">Start Selling on StyleHub</h1>
          <p class="body-large text-gray-600 dark:text-gray-400">Create engaging Shopshots and reach thousands of buyers</p>
        </div>

        <!-- Progress Steps -->
        <div class="flex items-center justify-center mb-12">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">1</div>
              <span class="text-sm font-medium ${this.currentStep >= 1 ? 'text-orange-500' : 'text-gray-500'}">Product Info</span>
            </div>
            <div class="w-8 h-px bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">2</div>
              <span class="text-sm font-medium ${this.currentStep >= 2 ? 'text-orange-500' : 'text-gray-500'}">Create Shopshot</span>
            </div>
            <div class="w-8 h-px bg-gray-300"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full ${this.currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm font-medium">3</div>
              <span class="text-sm font-medium ${this.currentStep >= 3 ? 'text-orange-500' : 'text-gray-500'}">Publish</span>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <div id="step-content">
          ${this.renderStepContent()}
        </div>
      </div>
    `
    this.setupEventListeners(page)
  }

  publishProduct(page) {
    // Simulate publishing
    const publishBtn = page.querySelector('#publish-btn')
    publishBtn.innerHTML = `
      <span class="spinner mr-2"></span>
      Publishing...
    `
    publishBtn.disabled = true

    setTimeout(() => {
      // Show success message
      const content = page.querySelector('#step-content')
      content.innerHTML = `
        <div class="text-center py-16">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-outlined text-3xl text-green-600">check_circle</span>
          </div>
          <h2 class="heading-2 mb-4">Product Published Successfully!</h2>
          <p class="body mb-8 text-gray-600 dark:text-gray-400">Your Shopshot is now live and ready for buyers to discover.</p>
          <div class="flex gap-4 justify-center">
            <button class="btn btn-primary btn-large" data-route="/shopshots">
              <span class="material-symbols-outlined">play_circle</span>
              View in Shopshots
            </button>
            <button class="btn btn-secondary btn-large" data-route="/sell">
              <span class="material-symbols-outlined">add</span>
              Create Another
            </button>
          </div>
        </div>
      `
    }, 2000)
  }
}