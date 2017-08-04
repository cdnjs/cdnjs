'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = render;

var _reactCompat = require('./react-compat');

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders a react component into static HTML and provides a cheerio wrapper around it. This is
 * somewhat asymmetric with `mount` and `shallow`, which don't use any external libraries, but
 * Cheerio's API is pretty close to what we actually want and has a significant amount of utility
 * that would be recreating the wheel if we didn't use it.
 *
 * I think there are a lot of good use cases to use `render` instead of `shallow` or `mount`, and
 * thus I'd like to keep this API in here even though it's not really "ours".
 *
 * @param node
 * @returns {Cheerio}
 */
function render(node) {
  var html = (0, _reactCompat.renderToStaticMarkup)(node);
  return _cheerio2['default'].load(html).root();
}