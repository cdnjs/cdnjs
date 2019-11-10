/* eslint-env node, es6 */

const EmbedBoxBase = require("./app/embed-box-base").default
const pages = require("./app/components/pages")

module.exports = function EmbedBox(spec = {}, ...args) {
  spec.pages = spec.pages || []

  spec.pages.push(
    pages.wordpress,
    pages.drupal,
    pages.joomla,
    pages.generic)

  return new EmbedBoxBase(spec, ...args)
}
