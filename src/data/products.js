export const products = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 120.00,
    seller: "@fashionista_lisa",
    description: "A classic leather jacket in excellent condition. Perfect for a timeless, rugged look that elevates any outfit.",
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Jackets",
    likes: 234,
    comments: 56,
    isLiked: false,
    tags: ["vintage", "leather", "jacket", "fashion"],
    condition: "Excellent",
    size: "M",
    brand: "Vintage Collection"
  },
  {
    id: 2,
    title: "Handmade Knit Scarf",
    price: 45.00,
    seller: "@urban_threads",
    description: "Cozy and warm, this handmade scarf is perfect for the winter season, crafted with premium, soft yarn.",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Scarves",
    likes: 189,
    comments: 32,
    isLiked: false,
    tags: ["handmade", "knit", "scarf", "winter"],
    condition: "New",
    size: "One Size",
    brand: "Urban Threads"
  },
  {
    id: 3,
    title: "Sustainable Cotton T-Shirt",
    price: 25.00,
    seller: "@eco_chic",
    description: "Made from 100% organic cotton, this t-shirt is both stylish and eco-friendly. A wardrobe essential.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "T-Shirts",
    likes: 312,
    comments: 78,
    isLiked: false,
    tags: ["sustainable", "cotton", "eco-friendly", "basic"],
    condition: "New",
    size: "L",
    brand: "EcoChic"
  },
  {
    id: 4,
    title: "Limited Edition Sneakers",
    price: 250.00,
    seller: "@street_style_sam",
    description: "Rare sneakers in mint condition. A must-have for any collector, featuring unique design details.",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Sneakers",
    likes: 456,
    comments: 102,
    isLiked: true,
    tags: ["limited", "sneakers", "collector", "streetwear"],
    condition: "Mint",
    size: "10",
    brand: "StreetStyle"
  },
  {
    id: 5,
    title: "Bohemian Maxi Dress",
    price: 85.00,
    seller: "@boho_vibes",
    description: "Flowing maxi dress with intricate patterns. Perfect for summer festivals and beach days.",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Dresses",
    likes: 278,
    comments: 45,
    isLiked: false,
    tags: ["bohemian", "maxi", "dress", "summer"],
    condition: "Good",
    size: "S",
    brand: "Boho Vibes"
  },
  {
    id: 6,
    title: "Classic Denim Jacket",
    price: 65.00,
    seller: "@denim_dreams",
    description: "Timeless denim jacket that goes with everything. Slightly distressed for that perfect worn-in look.",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Jackets",
    likes: 195,
    comments: 28,
    isLiked: false,
    tags: ["denim", "jacket", "classic", "versatile"],
    condition: "Good",
    size: "M",
    brand: "Denim Dreams"
  }
]

export const getProducts = (filters = {}) => {
  let filtered = [...products]

  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some(tag => tag.toLowerCase().includes(search))
    )
  }

  if (filters.seller) {
    filtered = filtered.filter(p => p.seller.toLowerCase().includes(filters.seller.toLowerCase()))
  }

  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= filters.minPrice)
  }

  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice)
  }

  // Sort
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
    }
  }

  return filtered
}

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id))
}