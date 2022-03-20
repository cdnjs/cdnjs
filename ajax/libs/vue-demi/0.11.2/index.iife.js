;(function (window) {
  if (window.VueDemi) {
    return
  }
  var VueDemi = {}
  var Vue = window.Vue
  if (Vue) {
    if (Vue.version.slice(0, 2) === '2.') {
      var VueCompositionAPI = window.VueCompositionAPI
      if (VueCompositionAPI) {
        for (var key in VueCompositionAPI) {
          VueDemi[key] = VueCompositionAPI[key]
        }
        VueDemi.isVue2 = true
        VueDemi.isVue3 = false
        VueDemi.install = function (){}
        VueDemi.Vue = Vue
        VueDemi.Vue2 = Vue
        VueDemi.version = Vue.version
      } else {
        console.error(
          '[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.'
        )
      }
    } else if (Vue.version.slice(0, 2) === '3.') {
      for (var key in Vue) {
        VueDemi[key] = Vue[key]
      }
      VueDemi.isVue2 = false
      VueDemi.isVue3 = true
      VueDemi.install = function (){}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = undefined
      VueDemi.version = Vue.version
      VueDemi.set = function(target, key, val) {
        if (Array.isArray(target)) {
          target.length = Math.max(target.length, key)
          target.splice(key, 1, val)
          return val
        }
        target[key] = val
        return val
      }
      VueDemi.del = function(target, key) {
        if (Array.isArray(target)) {
          target.splice(key, 1)
          return
        }
        delete target[key]
      }
    } else {
      console.error('[vue-demi] Vue version ' + Vue.version + ' is unsupported.')
    }
  } else {
    console.error(
      '[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.'
    )
  }
  window.VueDemi = VueDemi
})(window)
