const path = require('path')
const webpack = require('webpack')
const mix = require('laravel-mix')
require('laravel-mix-transpile-node-modules')

mix.webpackConfig({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    })
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, './resources/assets/js')
    }
  }
})

mix
  .js('resources/assets/js/app.js', 'public/js')
  .version()
  .sass('resources/assets/sass/app.scss', 'public/css')
  .sourceMaps(true)
  .disableNotifications()

if (mix.inProduction()) {
  mix.extract(['vue'])
}

mix.transpileNodeModules()
