var routes = []

const requireContext = require.context('.', false, /.(core.js)$/)
requireContext.keys().forEach(file => {
  const routesFile = requireContext(file)

  if ('default' in routesFile) {
    routes = routes.concat(routesFile.default)
  }
})

export default {routes}
