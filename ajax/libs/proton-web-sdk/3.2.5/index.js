
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./web-sdk.cjs.production.min.js')
} else {
  module.exports = require('./web-sdk.cjs.development.js')
}
