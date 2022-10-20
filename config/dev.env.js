'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://192.168.1.8:8080/"'
  BASE_API: '"https://www.tzgkczp.com/admin/"'

})
