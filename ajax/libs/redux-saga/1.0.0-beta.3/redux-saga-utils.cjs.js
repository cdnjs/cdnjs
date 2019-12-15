"use strict";

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redux-saga-utils.prod.cjs.js')
} else {
  module.exports = require('./redux-saga-utils.dev.cjs.js')
}
