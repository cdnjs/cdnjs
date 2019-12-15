"use strict";

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redux-saga-core.prod.cjs.js')
} else {
  module.exports = require('./redux-saga-core.dev.cjs.js')
}
