import { Header } from '../components/Header.js'
import { ProductCard } from '../components/ProductCard.js'
import { getProducts } from '../data/products.js'

export class HomePage {
  constructor() {
    this.products = getProducts().slice(0, 4) // Show first 4 products
  }

  render() {
    const page = document.createElement('div')
    page.className = 'min-h-screen bg-orange-50 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-200'
    
    const header = new Header('marketplace')
    page.appendChild(header.render())

    const main = document.createElement('main')
    main.className = 'flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8'
    main.innerHTML = `
      <div class="w-full max-w-2xl space-y-10">
        <h1 class="text-3xl font-bold font-sans tracking-tight text-center">Curated For You</h1>
        <div class="space-y-8" id="products-container">
        </div>
      </div>
    `

    const productsContainer = main.querySelector('#products-container')
    this.products.forEach(product => {
      const productCard = new ProductCard(product, 'feed')
      productsContainer.appendChild(productCard.render())
    })

    page.appendChild(main)
    return page
  }
}