export default [
  // Authenticated routes.
  ...middleware('auth', [
    {path: '/', name: 'home', component: require('~/pages/home').default},
  ]),

  // Guest routes.
  ...middleware('guest', [
    {path: '/login', name: 'login', component: require('~/pages/login').default}
  ]),

  {path: '*', component: require('~/pages/404.vue').default}
]

/**
 * @param  {String|Function} middleware
 * @param  {Array} routes
 * @return {Array}
 */
function middleware(middleware, routes) {
  routes.forEach(route =>
    (route.middleware || (route.middleware = [])).unshift(middleware)
  )

  return routes
}
