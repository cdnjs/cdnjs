"use strict";

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redux-saga-effects.prod.cjs.js')
} else {
  module.exports = require('./redux-saga-effects.dev.cjs.js')
}
