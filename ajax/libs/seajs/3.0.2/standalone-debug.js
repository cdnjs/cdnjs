var define
var require
(function(global, undefined) {

  function isType(type) {
    return function(obj) {
      return {}.toString.call(obj) == "[object " + type + "]"
    }
  }

  var isFunction = isType("Function")

  var cachedMods = {}

  function Module() {
  }

  Module.prototype.exec = function () {
    var mod = this

    if (this.execed) {
      return mod.exports
    }
    this.execed = true

    function require(id) {
      return Module.get(id).exec()
    }

    var factory = mod.factory

    var exports = isFunction(factory) ?
      factory(require, mod.exports = {}, mod) :
      factory

    if (exports === undefined) {
      exports = mod.exports
    }

    // Reduce memory leak
    delete mod.factory

    mod.exports = exports

    return exports
  }

  define = function (id, deps, factory) {
    var meta = {
      id: id,
      deps: deps,
      factory: factory
    }

    Module.save(meta)
  }

  Module.save = function(meta) {
    var mod = Module.get(meta.id)

    mod.id = meta.id
    mod.dependencies = meta.deps
    mod.factory = meta.factory
  }

  Module.get = function(id) {
    return cachedMods[id] || (cachedMods[id] = new Module())
  }

  require = function(id) {
    var mod = Module.get(id)
    if(!mod.execed) {
      mod.exec()
    }
    return mod.exports
  }

})(this)
