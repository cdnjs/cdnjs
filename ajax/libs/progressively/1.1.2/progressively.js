/*!
 * progressively 1.1.2
 * https://github.com/thinker3197/progressively
 * @license MIT licensed
 *
 * Copyright (C) 2016-17 Ashish
 */

;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory(root)
    })
  } else if (typeof exports === 'object') {
    module.exports = factory
  } else {
    root.progressively = factory(root)
  }
})(this, function (root) {
  'use strict'

  var progressively = {}

  var defaults, poll, onLoad, inodes

  onLoad = function () {}

  function extend (primaryObject, secondaryObject) {
    var o = {}
    for (var prop in primaryObject) {
      o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop]
    }
    return o
  };

  function isHidden (el) {
    return (el.offsetParent === null)
  };

  function inView (el) {
    if (isHidden(el)) {
      return false
    }

    var box = el.getBoundingClientRect()
    var top = box.top
    var height = box.height

    el = el.parentNode

    do {
      box = el.getBoundingClientRect()

      if (top <= box.bottom === false) {
        return false
      }
      if ((top + height) <= box.top) {
        return false
      }

      el = el.parentNode
    } while (el !== document.body)

    return top <= document.documentElement.clientHeight
  };

  function loadImage (el) {
    setTimeout(function () {
      var img = new Image()

      img.onload = function () {
        el.classList.remove('progressive--not-loaded')
        el.classList.add('progressive--is-loaded')
        el.src = this.src

        onLoad(el)
      }

      img.src = el.dataset.progressive
    }, defaults.delay)
  };

  function listen () {
    if (poll) {
      return
    }
    clearTimeout(poll)
    poll = setTimeout(function () {
      progressively.check()
      progressively.render()
      poll = null
    }, defaults.throttle)
  }
    /*
     * default settings
     */

  defaults = {
    throttle: 300, // appropriate value, don't change unless intended
    delay: 100,
    onLoadComplete: function () {},
    onLoad: function () {}
  }

  progressively.init = function (options) {
    options = options || {}

    defaults = extend(defaults, options)

    onLoad = defaults.onLoad || onLoad

    inodes = [].slice.call(document.querySelectorAll('.progressive__img'))

    progressively.render()

    if (document.addEventListener) {
      root.addEventListener('scroll', listen, false)
      root.addEventListener('load', listen, false)
    } else {
      root.attachEvent('onscroll', listen)
      root.attachEvent('onload', listen)
    }
  }

  progressively.render = function () {
    var elem

    for (var i = inodes.length - 1; i >= 0; --i) {
      elem = inodes[i]

      if (inView(elem) && elem.classList.contains('progressive--not-loaded')) {
        loadImage(elem)
        inodes.splice(i, 1)
      }
    }

    this.check()
  }

  progressively.check = function () {
    if (!inodes.length) {
      defaults.onLoadComplete()
      this.drop()
    }
  }

  progressively.drop = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', listen)
    } else {
      root.detachEvent('onscroll', listen)
    }
    clearTimeout(poll)
  }

  return progressively
})
