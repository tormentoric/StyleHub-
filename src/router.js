export class Router {
  constructor() {
    this.routes = new Map()
    this.currentRoute = null
    this.app = document.getElementById('app')
  }

  addRoute(path, handler) {
    this.routes.set(path, handler)
  }

  async navigate(path, pushState = true) {
    if (pushState) {
      history.pushState(null, '', path)
    }

    const route = this.findRoute(path)
    if (route) {
      try {
        this.app.innerHTML = '<div class="flex items-center justify-center min-h-screen"><div class="spinner"></div></div>'
        const pageInstance = await route.handler()
        this.app.innerHTML = ''
        this.app.appendChild(pageInstance.render())
        this.currentRoute = route
        
        // Scroll to top
        window.scrollTo(0, 0)
      } catch (error) {
        console.error('Error loading route:', error)
        this.app.innerHTML = '<div class="flex items-center justify-center min-h-screen text-red-500">Error loading page</div>'
      }
    } else {
      this.navigate('/', false)
    }
  }

  findRoute(path) {
    // Exact match first
    if (this.routes.has(path)) {
      return { path, handler: this.routes.get(path), params: {} }
    }

    // Pattern matching for dynamic routes
    for (const [routePath, handler] of this.routes) {
      const params = this.matchRoute(routePath, path)
      if (params !== null) {
        return { path: routePath, handler, params }
      }
    }

    return null
  }

  matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/')
    const actualParts = actualPath.split('/')

    if (routeParts.length !== actualParts.length) {
      return null
    }

    const params = {}
    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i]
      const actualPart = actualParts[i]

      if (routePart.startsWith(':')) {
        params[routePart.slice(1)] = actualPart
      } else if (routePart !== actualPart) {
        return null
      }
    }

    return params
  }

  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.navigate(location.pathname, false)
    })

    // Navigate to current path
    this.navigate(location.pathname, false)
  }
}