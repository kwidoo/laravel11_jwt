import Vue from 'vue'
import routes from './routes/index'
import Router from 'vue-router'
import store from '~/store'
Vue.use(Router)

const routeMiddleware = resolveMiddleware(
  require.context('./middleware', false, /.*\.js$/)
)

const router = make()

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function make () {
  const router = new Router({
    scrollBehavior,
    mode: 'history',
    routes: routes.routes.map(beforeEnter)
  })

  // Register before guard.
  router.beforeEach(async (to, from, next) => {
    if (!store.getters['auth/check'] && store.getters['auth/token']) {
      try {
        await store.dispatch('auth/fetchUser')
      } catch (e) { }
    }

    setLayout(router, to)
    next()
  })

  return router
}

/**
 * Add beforeEnter guard to the route.
 *
 * @param {Object} route
 * @param {Object}
 */
function beforeEnter (route) {
  if (route.children) {
    route.children.forEach(beforeEnter)
  }

  if (!route.middleware) {
    return route
  }

  route.beforeEnter = (...args) => {
    if (!Array.isArray(route.middleware)) {
      route.middleware = [route.middleware]
    }

    route.middleware.forEach(middleware => {
      if (typeof middleware === 'function') {
        middleware(...args)
      } else if (routeMiddleware[middleware]) {
        routeMiddleware[middleware](...args)
      } else {
        throw Error(`Undefined middleware [${middleware}]`)
      }
    })
  }

  return route
}

/**
 * Set the application layout from the matched page component.
 *
 * @param {Router} router
 * @param {Route} to
 */
function setLayout (router, to) {
  // Get the first matched component.
  const [component] = router.getMatchedComponents({ ...to })

  if (component) {
    if (router.app) {
      router.app.$nextTick(() => {
        // Set application layout.
        router.app.setLayout(component.layout || '')
      })
    }
  }
}

/**
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return { selector: to.hash }
  }

  const [route] = to.matched.slice(-1)
  if (route && route.components.default.scrollToTop === false) {
    return {}
  }

  return { x: 0, y: 0 }
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware (requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}
