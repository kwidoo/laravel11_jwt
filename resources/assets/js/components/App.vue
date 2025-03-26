<template>
  <div id="app">
    <transition mode="out-in" name="page">
      <component :is="layout" v-if="layout"></component>
    </transition>
  </div>
</template>

<script>
  // Load layout components dynamically.
  const requireContext = require.context('../layouts', false, /.*\.vue$/)

  const layouts = requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
    )
    .reduce((components, [name, component]) => {
      components[name] = component.default || component
      return components
    }, {})

  export default {
    el: '#app',

    components: {
    },

    data: () => ({
      layout: null,
      defaultLayout: 'app',
      errors: {}
    }),

    mounted() {
      this.$loading = this.$refs.loading
    },

    methods: {
      /**
       * Set the application layout.
       *
       * @param {String} layout
       */
      setLayout(layout) {
        if (!layout || !layouts[layout]) {
          layout = this.defaultLayout
        }

        this.layout = layouts[layout]
      }
    }
  }
</script>
