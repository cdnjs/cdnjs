(function () {
  var vue // lazy bind

  var asyncData = {
    created: function () {
      if (!vue) {
        console.warn('[vue-async-data] not installed!')
        return
      }
      if (this.$options.asyncData) {
        if (this._defineMeta) {
          // 0.12 compat
          this._defineMeta('$loadingAsyncData', true)
        } else {
          // ^1.0.0-alpha
          vue.util.defineReactive(this, '$loadingAsyncData', true)
        }
      }
    },
    compiled: function () {
      this.reloadAsyncData()
    },
    methods: {
      reloadAsyncData: function () {
        var load = this.$options.asyncData
        if (load) {
          var self = this
          var resolve = function (data) {
            if (data) {
              for (var key in data) {
                self.$set(key, data[key])
              }
            }
            self.$loadingAsyncData = false
            self.$emit('async-data')
          }
          var reject = function (reason) {
            var msg = '[vue] async data load failed'
            if (reason instanceof Error) {
              console.warn(msg)
              throw reason
            } else {
              console.warn(msg + ': ' + reason)
            }
          }
          this.$loadingAsyncData = true
          var res = load.call(this, resolve, reject)
          if (res && typeof res.then === 'function') {
            res.then(resolve, reject)
          }
        }
      }
    }
  }

  var api = {
    mixin: asyncData,
    install: function (Vue, options) {
      vue = Vue
      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
    }
  }

  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = api
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return api })
  } else if (typeof window !== 'undefined') {
    window.VueAsyncData = api
  }
})()
