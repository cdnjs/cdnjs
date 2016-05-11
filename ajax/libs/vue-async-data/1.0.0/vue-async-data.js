var asyncData = {
  created: function () {
    if (this.$options.asyncData) {
      this._defineMeta('$loadingAsyncData', true)
    }
  },
  compiled: function () {
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
        if (reason instanceof Error) {
          throw reason
        } else {
          console.warn('[vue] async data load failed: ' + reason)
        }
      }
      var res = load.call(this, resolve, reject)
      if (res && typeof res.then === 'function') {
        res.then(resolve, reject)
      }
    }
  }
}

var api = {
  mixin: asyncData,
  install: function (Vue, options) {
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
