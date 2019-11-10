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
    self.param = {}

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
      var p
      self.show = (!self.parent.found && (p = match(opts.path, self.parent.path)))
      self.param = p || {}
      if (self.show){
        self.parent.found = true

        if (opts.redirect) {
          if (/^http/.test(opts.redirect)) location.href = opts.redirect
          else location.hash = opts.redirect
        }
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

    this.emit()
  
});


})(typeof window != 'undefined' ? window : undefined)
/*!
 * ikki mixin
 */
;(function(window, mixin) {

  var mixinName = 'ikki'

  var riot = (!window || !window.riot) ? require('riot') : window.riot
  if (typeof exports === 'object') module.exports = mixin // CommonJS
  riot.mixin(mixinName, mixin) // Register mixin to Riot.js

})(typeof window != 'undefined' ? window : undefined,

  {
    init: function() {
      console.log('ggggg')
      var self = this
      var routeInfo = null
      var opts = {}, opts_replaced = {}

      // Replacing url params automatically
      // - route: #member/:id
      // - actual: #member/Tom
      // then, replace like below
      // <my-tag message="$name" /> -> <my-tag message="Tom" />
      function replaceParams(str){
        if (!routeInfo) return str
        var query = routeInfo.query
        var param = routeInfo.param
        Object.keys(query).map(function(key){
          str = str.replace(new RegExp('^\\\?' + key + '$'), query[key])
        })
        Object.keys(param).map(function(key){
          str = str.replace(new RegExp('^\\\$' + key + '$'), param[key])
        })
        return str
      }

      function extend(obj, from) {
        Object.keys(from).map(function(key) {
          obj[key] = from[key]
        })
      }

      self.on('update', function(){
        if (self.opts.listeners && self.opts.listeners.length) {
          self.opts.listeners.map(function(l) { self.on(l.key, l.callback) })
          self.opts.listeners = []
        }
        routeInfo = self.getRouteInfo()
        Object.keys(self.opts).map(function(key) {
          if ('opts' != key) {
            if (!opts[key] || opts_replaced[key] != self.opts[key])
              opts[key] = self.opts[key]
            self.opts[key] = replaceParams(opts[key])
            opts_replaced[key] = self.opts[key]
          }
        })
      })
      var target = self.opts.opts
      if ('object' == typeof target && !target.then) {
        console.log('1')
        // 1: object
        extend(self.opts, target)
      } else if ('object' == typeof target) {
        console.log('2')
        // 2: promise
        target.then(function(o) {
          extend(self.opts, o)
          self.update()
        })
      } else if (target && 'GeneratorFunction' == target.constructor.name) {
        console.log('3')
        // 3: generator
        function process(gen) {
          var prom = gen.next().value
          if (!prom) return
          prom.then(function(o) {
            extend(self.opts, o)
            self.update()
            setTimeout(function(){
              process(gen)
            }, 0)
          })
        }
        process(target())
      }
    },
    getRouteInfo: function() {
      tag = this
      while (tag && 'route' != tag.root.tagName.toLowerCase()) tag = tag.parent
      return !tag ? null
                  : {
                      path: tag.parent.path || '',
                      query: tag.parent.query || {},
                      param: tag.param || {}
                    }
    }
  }

)

/*!
 * Parent Scope mixin
 */
;(function(window, mixin) {

  var mixinName = 'parentScope'

  var riot = (!window || !window.riot) ? require('riot') : window.riot
  if (typeof exports === 'object') module.exports = mixin // CommonJS
  riot.mixin(mixinName, mixin) // Register mixin to Riot.js

})(typeof window != 'undefined' ? window : undefined,

  {
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
  }

)
