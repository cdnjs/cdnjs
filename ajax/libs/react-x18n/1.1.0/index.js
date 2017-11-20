'use strict'

let React = require('react')
let X18N = require('x18n')

let X18NSpanElement = React.createClass({
  getDefaultProps: function () {
    return {isPlural: false, _args: []}
  },

  _update: function () {
    this.forceUpdate()
  },

  componentWillMount: function () {
    X18N.on(['lang:change', 'dict:change'], this._update)
  },

  componentWillUnmount: function () {
    X18N.off(['lang:change', 'dict:change'], this._update)
  },

  render: function () {
    let result = 'error'

    if (this.props.isPlural === true) {
      let args = Array.prototype.slice.call(this.props._args)
      let key = args.shift()

      result = X18N.t(key).plural.apply(null, args)
    } else {
      result = X18N.t.apply(null, this.props._args)
    }

    return React.createElement('span', '', result)
  }
})

let react_x18n_t = function () {
  return React.createElement(X18NSpanElement, {isPlural: false, _args: arguments}, '')
}

react_x18n_t.plural = function () {
  return React.createElement(X18NSpanElement, {isPlural: true, _args: arguments}, '')
}

let react_x18n = {
  x18n: X18N,
  t: react_x18n_t
}

module.exports = react_x18n
