'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheEvalLoader = require('guide4you-builder/mustache-eval-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let path = require('path')
let baseDir = process.cwd()

mustacheEvalLoader.setTemplateVars({
  ajaxProxy: {
    prod: 'proxy/proxy.php?csurl={url}',
    dev: '/proxy/{url}'
  },
  languageFile: 'files/l10n.json',
  svgColor: 'rgba(255,255,255,1)',
  proxyAjaxFilters: 'true',
  proxyFilterDomain: 'true',
  proxyAjaxDebug: 'true',
  proxyValidRequests: [
    'a.tile.openstreetmap.org',
    'b.tile.openstreetmap.org',
    'c.tile.openstreetmap.org'
  ]
})

module.exports = {
  entry: {
    'g4u': [ path.join(baseDir, './conf/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build')
  },
  resolve: {
    alias: {
      'lessConfig': path.join(baseDir, './conf/clouds.less')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/guide4you/html/client.html',
      favicon: 'images/g4u-logo.png',
      inject: 'head',
      title: 'Generic button in g4u3'
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
      { from: 'node_modules/openlayers/dist/ol.js', to: 'js/ol.js' }
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'js/jquery.min.js',
        'js/ol.js'
      ],
      append: false
    })
  ]
}
