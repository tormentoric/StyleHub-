import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({ role: 'buyer', id: 1 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Mock data
  const shopshots = [
    {
      id: 1,
      productId: 101,
      videoUrl: 'https://placehold.co/400x700/ff6b6b/ffffff?text=Designer+Handbag',
      productName: 'Luxury Leather Handbag',
      seller: 'Fashionista Studio',
      price: 299.99
    },
    {
      id: 2,
      productId: 102,
      videoUrl: 'https://placehold.co/400x700/4ecdc4/ffffff?text=Sneakers',
      productName: 'Limited Edition Sneakers',
      seller: 'Urban Kicks',
      price: 189.99
    },
    {
      id: 3,
      productId: 103,
      videoUrl: 'https://placehold.co/400x700/45b7d1/ffffff?text=Watch',
      productName: 'Minimalist Watch',
      seller: 'TimeCraft',
      price: 159.99
    }
  ];

  const products = [
    {
      id: 101,
      name: 'Luxury Leather Handbag',
      images: [
        'https://placehold.co/600x600/ff6b6b/ffffff?text=Handbag+1',
        'https://placehold.co/600x600/f7f7f7/333333?text=Handbag+2',
        'https://placehold.co/600x600/e3e3e3/333333?text=Handbag+3'
      ],
      description: 'Handcrafted luxury leather handbag with gold hardware and spacious interior. Perfect for everyday use or special occasions.',
      price: 299.99,
      sellerId: 1,
      reviews: [
        { id: 1, rating: 5, comment: 'Absolutely love this bag! Worth every penny.', user: 'Sarah M.' },
        { id: 2, rating: 4, comment: 'Great quality, arrived quickly.', user: 'James T.' }
      ]
    },
    {
      id: 102,
      name: 'Limited Edition Sneakers',
      images: [
        'https://placehold.co/600x600/4ecdc4/ffffff?text=Sneakers+1',
        'https://placehold.co/600x600/3caea3/ffffff?text=Sneakers+2',
        'https://placehold.co/600x600/2a9d8f/ffffff?text=Sneakers+3'
      ],
      description: 'Limited edition sneakers with premium materials and unique design. Only 100 pairs available worldwide.',
      price: 189.99,
      sellerId: 2,
      reviews: [
        { id: 1, rating: 5, comment: 'These sneakers are fire! So comfortable and stylish.', user: 'Mike R.' },
        { id: 2, rating: 5, comment: 'Got compliments everywhere I went.', user: 'Lisa K.' }
      ]
    }
  ];

  const sellers = [
    {
      id: 1,
      name: 'Fashionista Studio',
      banner: 'https://placehold.co/1200x300/ff6b6b/ffffff?text=Fashionista+Studio',
      bio: 'We create luxury accessories for the modern woman. Handcrafted with love and attention to detail.',
      products: [101, 103]
    },
    {
      id: 2,
      name: 'Urban Kicks',
      banner: 'https://placehold.co/1200x300/4ecdc4/ffffff?text=Urban+Kicks',
      bio: 'Streetwear and sneaker culture enthusiasts. Bringing you the hottest limited edition kicks.',
      products: [102]
    }
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const platformFee = getTotalPrice() * 0.05;
  const totalPrice = getTotalPrice() + platformFee;

  // Navigation component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">StyleHub</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('shopshots')} 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Shopshots
            </button>
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Discover
            </button>
            <button 
              onClick={() => setCurrentView('cart')} 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentView('profile')} 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Discover unique products</span>
                  <span className="block text-indigo-600">through immersive video</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  StyleHub connects you with creators and their one-of-a-kind products through engaging video content. 
                  Shop what inspires you.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => setCurrentView('shopshots')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Shopping
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => setCurrentView('sellers')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Sell on StyleHub
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://placehold.co/800x600/f8f9fa/6c757d?text=StyleHub+Hero"
            alt="StyleHub Hero"
          />
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Featured Collections</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover handpicked products from our top sellers
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {['Editor\'s Picks', 'Community Favorites', 'Daily Deals'].map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    className="h-48 w-full object-cover"
                    src={`https://placehold.co/400x300/6366f1/ffffff?text=${category.replace(' ', '+')}`}
                    alt={category}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                    <p className="mt-2 text-gray-600">Explore our curated selection of trending products</p>
                    <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-500">
                      View Collection →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Shopshots Feed
  const ShopshotsFeed = () => {
    const handleNextVideo = () => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === shopshots.length - 1 ? 0 : prevIndex + 1
      );
    };

    const handlePrevVideo = () => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === 0 ? shopshots.length - 1 : prevIndex - 1
      );
    };

    const currentShopshot = shopshots[currentVideoIndex];

    return (
      <div className="bg-black min-h-screen relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 relative">
            <img 
              src={currentShopshot.videoUrl} 
              alt={currentShopshot.productName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">{currentShopshot.productName}</h3>
                <p className="text-gray-300 mb-4">by {currentShopshot.seller}</p>
                <button 
                  onClick={() => setCurrentView(`product-${currentShopshot.productId}`)}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Buy This Product - ${currentShopshot.price}
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button 
              onClick={handlePrevVideo}
              className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button 
              onClick={handleNextVideo}
              className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentVideoIndex + 1} / {shopshots.length}
          </div>
        </div>
      </div>
    );
  };

  // Product Detail Page
  const ProductDetail = ({ productId }) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return <div>Product not found</div>;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-md overflow-hidden ${
                        currentImageIndex === index ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-24 object-cover cursor-pointer hover:opacity-75 transition"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main image */}
              <div className="w-full">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
              
              <div className="mt-3">
                <h2 className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</h2>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div className="mt-2">
                  <p className="text-base text-gray-700">{product.description}</p>
                </div>
              </div>

              {/* Transaction Fee Breakdown */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Fee Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee (5%)</span>
                    <span className="font-medium">${(product.price * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Price</span>
                    <span>${(product.price * 1.05).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setCurrentView('checkout')}
                    className="flex-1 bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
                <div className="mt-4 space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{review.user}</h4>
                        <div className="ml-4 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setCurrentView(`seller-${product.sellerId}`)}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Visit Seller's Shop →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Seller Shop Page
  const SellerShop = ({ sellerId }) => {
    const seller = sellers.find(s => s.id === parseInt(sellerId));
    if (!seller) return <div>Seller not found</div>;

    const sellerProducts = products.filter(p => seller.products.includes(p.id));

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <img
                src={seller.banner}
                alt={seller.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                <p className="mt-2 text-gray-600">{seller.bio}</p>
                <div className="mt-4">
                  <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-indigo-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                  {currentUser.role === 'seller' && currentUser.id === seller.id ? (
                    <button
                      onClick={() => setCurrentView(`create-shopshot-${product.id}`)}
                      className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                      Create Shopshot of this Product
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentView(`product-${product.id}`)}
                      className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Shopping Cart
  const ShoppingCart = () => {
    if (cartItems.length === 0) {
      return (
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Looks like you haven't added any items to your cart yet.</p>
            <div className="mt-6">
              <button
                onClick={() => setCurrentView('shopshots')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                    <div className="mt-4 flex items-center">
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                      <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-600 hover:text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (5%)</span>
                  <span className="font-medium">${platformFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentView('checkout')}
                className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User Profile
  const UserProfile = () => {
    const [activeSection, setActiveSection] = useState('account');

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Settings</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account settings and preferences</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200">
                  <nav className="flex flex-col p-4 space-y-2">
                    <button
                      onClick={() => setActiveSection('account')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === 'account'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Account Information
                    </button>
                    <button
                      onClick={() => setActiveSection('orders')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === 'orders'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Order History
                    </button>
                    <button
                      onClick={() => setActiveSection('payment')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === 'payment'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Payment Methods
                    </button>
                    <button
                      onClick={() => setActiveSection('notifications')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === 'notifications'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Notifications
                    </button>
                    <button
                      onClick={() => setActiveSection('privacy')}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === 'privacy'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Privacy Settings
                    </button>
                  </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                  {activeSection === 'account' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Account Information</h4>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'orders' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Order History</h4>
                      <div className="bg-gray-50 rounded-md p-4">
                        <p className="text-gray-600">No orders found.</p>
                      </div>
                    </div>
                  )}

                  {activeSection === 'payment' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-md p-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Visa ending in 1234</p>
                              <p className="text-sm text-gray-500">Expires 12/25</p>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                              Remove
                            </button>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'notifications' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">New Messages</span>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                            <span className="sr-only">Enable notifications</span>
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Order Updates</span>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                            <span className="sr-only">Enable notifications</span>
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Product Interest Alerts</span>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="sr-only">Enable notifications</span>
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Promotional Content</span>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="sr-only">Enable notifications</span>
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'privacy' && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="privacy-1"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="privacy-1" className="font-medium text-gray-700">
                              Make my profile public
                            </label>
                            <p className="text-gray-500">Allow other users to see your profile and activity</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="privacy-2"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="privacy-2" className="font-medium text-gray-700">
                              Share purchase history with sellers
                            </label>
                            <p className="text-gray-500">Allow sellers to see what you've purchased from them</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="privacy-3"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="privacy-3" className="font-medium text-gray-700">
                              Opt-in to data collection for personalized recommendations
                            </label>
                            <p className="text-gray-500">Help us improve your shopping experience</p>
                          </div>
                        </div>
                        <div>
                          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Privacy Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current view
  const renderCurrentView = () => {
    if (currentView === 'home') {
      return <HomePage />;
    } else if (currentView === 'shopshots') {
      return <ShopshotsFeed />;
    } else if (currentView.startsWith('product-')) {
      const productId = currentView.split('-')[1];
      return <ProductDetail productId={productId} />;
    } else if (currentView.startsWith('seller-')) {
      const sellerId = currentView.split('-')[1];
      return <SellerShop sellerId={sellerId} />;
    } else if (currentView === 'cart') {
      return <ShoppingCart />;
    } else if (currentView === 'profile') {
      return <UserProfile />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {renderCurrentView()}
    </div>
  );
};

export default App;
