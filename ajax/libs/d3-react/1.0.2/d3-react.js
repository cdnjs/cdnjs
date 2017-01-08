(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'd3', 'react'], factory)
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('d3'), require('react'))
  } else {
    // Browser globals
    factory(null, root.d3, root.React)
  }
}(this, function (exports, d3, React) {
  function getProps (el) {
    if (typeof el._reactProps === 'undefined') {
      el._reactProps = {}
    }

    return el._reactProps
  }

  function d3_selection_prop (name, value) {
    // For prop(string, null), remove the prop with the specified name.
    function removeProp () {
      delete getProps(this)[name]
    }

    // For prop(string, string), set the prop with the specified name.
    function setPropValue () {
      getProps(this)[name] = value
    }

    // For prop(string, function), evaluate the function for each element, and set
    // or remove the prop as appropriate.
    function setPropFunction () {
      var x = value.apply(this, arguments)
      if (x == null) removeProp()
      else getProps(this)[name] = x
    }

    return value == null
      ? removeProp : (typeof value === 'function'
        ? setPropFunction
        : setPropValue)
  }

  function d3_selection_toReact (node) {
    var elName = node.nodeName.toLowerCase()
    var children = Array.prototype.slice.call(node.childNodes)
    var props = getProps(node)

    if (node.nodeType === 3) {
      return node.textContent
    } else if (children.length === 0) {
      return React.createElement(elName, props)
    } else {
      return React.createElement(elName, props, children.map(d3_selection_toReact))
    }
  }

  // Modified version of d3.selection.prototype.attr
  d3.selection.prototype.prop = function (name, value) {
    var node = this.node()

    if (arguments.length < 2) {

      // For prop(string), return the prop value for the first node.
      if (typeof name === 'string') {
        return getProps(node)[name]
      }

      // For prop(object), the object specifies the names and values of the getProps
      // to set or remove. The values may be functions that are evaluated for
      // each element.
      for (value in name) this.each(d3_selection_prop(value, name[value]))
      return this
    }

    return this.each(d3_selection_prop(name, value))
  }

  d3.selection.prototype.toReact = function () {
    return d3_selection_toReact(this.node())
  }
}))
