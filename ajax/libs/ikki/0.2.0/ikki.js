/*!
 * ikki (http://cognitom.github.io/ikki/)
 * Copyright 2015 Tsutomu Kawamura.
 * Licensed under MIT
 */
;(function(window) {

var riot = (!window || !window.riot) ? require('riot') : window.riot;

riot.tag('route', ' <section if="{ show }"><yield ></yield></section>', function(opts) {
    var self = this
    self.show = false

    function match(route, actual) {
      route = route.replace(/^\//, '')
      if ('*' == route) return {}
      var vs = []
      var re = route.replace(/(^|\/):([^\/]+)/g, function(_, b, p) {
        vs.push(p)
        return b + '([^/]+)'
      })
      var ms = actual.match(new RegExp('^' + re + '$'))
      if (!ms) return null

      var param = {}
      vs.map(function(v, i) { param[v] = ms[i+1] })
      return param
    }

    self.on('update', function() {
      var path = self.parent.path
      var query = self.parent.query
      var param
      self.show = !self.parent.found &&
                  (param = match(opts.path, path)) !== null
      param = param || {}

      if (!self.show) return

      if (opts.redirect) {

        if (/^http/.test(opts.redirect)) location.href = opts.redirect
        else location.hash = opts.redirect
      } else {

        self.trigger('urlchanged', { path: path, query: query, param: param})
        self.parent.found = true
      }
    })
  
});

riot.tag('router', ' <yield ></yield>', function(opts) {
    var self = this
    var win = window
    var evt = 'hashchange'
    self.path = ''
    self.query = {}
    self.found = false

    this.emit = function(e) {
      var raw = location.href.split('#')[1] || ''
      var path = raw.split('?')[0].replace(/^\/|\/$/g, '')
      var query = {}
      raw.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { query[k] = v })

      self.path = path
      self.query = query
      self.found = false

      if (e) self.update()
    }.bind(this);

    self.on('mount', function() {
      win.addEventListener
        ? win.addEventListener(evt, self.emit, false)
        : win.attachEvent('on' + evt, self.emit)
    })

    self.on('unmount', function() {
      win.removeEventListener
        ? win.removeEventListener(evt, self.emit, false)
        : win.detachEvent('on' + evt, self.emit)
    })

    self.emit()
  
});

/*!
 * ikki mixin
 */

// Replacing url query/param automatically
// - route: #member/:id
// - actual: #member/Tom
// then, replace like below
// <my-tag message="$name" /> -> <my-tag message="Tom" />
function replaceRouteVar(str, route) {
  if (!route) return str
  Object.keys(route.query).map(function(key){
    str = str.replace(new RegExp('^\\\?' + key + '$'), route.query[key])
  })
  Object.keys(route.param).map(function(key){
    str = str.replace(new RegExp('^\\\$' + key + '$'), route.param[key])
  })
  return str
}

riot.mixin('ikki', {
  $$version: 0,

  // initialize mixin
  init: function() {
    var self = this
    var rt = self.$$findAncestor('route')

    if (rt){
      // with routing
      rt.on('urlchanged', function(route){
        self.$$loadOpts(self.opts.opts, route)
        self.one('update', function(){
          Object.keys(self.opts).map(function(key) {
            if ('string' == typeof self.opts[key])
              self.opts[key] = replaceRouteVar(self.opts[key], route)
          })
        })
      })
    } else {
      //without routing
      self.$$loadOpts(self.opts.opts)
    }
  },

  $$findAncestor: function(tagName) {
    tag = this
    while (tag && tagName != tag.root.tagName.toLowerCase())
      tag = tag.parent
    return tag || null
  },

  $$loadOpts: function(opts, route) {
    if (!opts) return

    var self = this
    var version = ++self.$$version

    if ('object' == typeof opts && !opts.then) {

      // 1: object
      self.$$extendOpts(opts)

    } else if ('object' == typeof opts) {

      // 2: promise
      opts.then(function(o) { self.$$extendOpts(o) && self.update() })

    } else if (opts && 'GeneratorFunction' == opts.constructor.name) {

      // 3: generator
      function process(gen) {
        var prom = gen.next().value
        function setAndGo(o) {
          if (version < self.$$version) return
          self.$$extendOpts(o) && self.update()
          setTimeout(function(){ process(gen) }, 0)
        }
        if (!prom) return // end of chain
        if (!prom.then) setAndGo(prom)
        else prom.then(setAndGo)
      }
      process(route ? opts(route) : opts())
    }
  },

  $$extendOpts: function(opts) {
    var self = this
    if (opts.listeners){
      opts.listeners.map(function(l) { self.on(l.key, l.callback) })
      delete opts.listeners
    }
    var keys = Object.keys(opts)
    keys.map(function(key) { self.opts[key] = opts[key] })
    return keys.length > 0
  }
})

/*!
 * Parent Scope mixin
 */
riot.mixin('parentScope', {
  // initialize mixin
  init: function() {
    this._ownPropKeys = []
    this._ownOptsKeys = []
    for (var k in this) this._ownPropKeys[k] = true
    for (var k in this.opts) this._ownOptsKeys[k] = true

    this.on('update', function() {
      for (var k in this.parent)
        if (!this._ownPropKeys[k]) this[k] = this.parent[k]
      for (var k in this.parent.opts)
        if (!this._ownOptsKeys[k]) this.opts[k] = this.parent.opts[k]
    })
  },

  // update the tag object who calls me
  updateCaller: function(f) {
    var keys = []
    for (var k in this.parent._ownPropKeys || this.parent) keys.push(k)
    for (var i = 0; i < keys.length; i++)
      if (this.parent[keys[i]] === f) {
        this.parent.update()
        return
      }
    if (this.parent.updateCaller) this.parent.updateCaller(f)
  }
})


})(typeof window != 'undefined' ? window : undefined)