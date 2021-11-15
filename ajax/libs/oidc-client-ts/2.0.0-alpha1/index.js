
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./oidc-client-ts.cjs.production.min.js')
} else {
  module.exports = require('./oidc-client-ts.cjs.development.js')
}
