/**
 * zooming - Image zoom with pure JavaScript.
 * @version v0.3.4
 * @link https://github.com/kingdido999/zooming
 * @license MIT
 */

+function() {

  // webkit prefix helper
  var prefix = 'WebkitAppearance' in document.documentElement.style ? '-webkit-' : ''

  // elements
  var body = document.body,
      overlay = document.createElement('div'),
      target,
      parent

  // state
  var shown = false,
      lock  = false,
      originalStyles,
      thumbnail,
      lastScrollPosition = null

  var options = {
    transitionDuration: '.4s',
    transitionTimingFunction: 'cubic-bezier(.4,0,0,1)',
    bgColor: '#fff',
    bgOpacity: 1,
    scaleBase: 1.0,
    scrollThreshold: 40,
    onOpen: null,
    onClose: null,
    onBeforeClose: null,
    onBeforeOpen: null
  }

  // compatibility stuff
  var trans = sniffTransition(),
      transitionProp = trans.transition,
      transformProp = trans.transform,
      transformCssProp = transformProp.replace(/(.*)Transform/, '-$1-transform'),
      transEndEvent = trans.transEnd

  var api = {

    config: function (opts) {
      if (!opts) return options

      for (var key in opts) {
        options[key] = opts[key]
      }

      setStyle(overlay, {
        backgroundColor: options.bgColor,
        transition: 'opacity ' +
          options.transitionDuration + ' ' +
          options.transitionTimingFunction
      })

      return this
    },

    open: function (el, cb) {
      if (shown || lock) return

      target = typeof el === 'string'
        ? document.querySelector(el)
        : el

      if (target.tagName !== 'IMG') return

      // onBeforeOpen event
      if (options.onBeforeOpen) options.onBeforeOpen(target)

      shown = true
      lock = true
      parent = target.parentNode

      var img = new Image()

      img.onload = function() {
        var rect = target.getBoundingClientRect()

        // upgrade source if possible
        if (target.hasAttribute('data-original')) {
          thumbnail = target.getAttribute('src')

          setStyle(target, {
            width: rect.width + 'px',
            height: rect.height + 'px'
          })

          target.setAttribute('src', target.getAttribute('data-original'))
        }

        // force layout update
        target.offsetWidth

        // trigger transition
        originalStyles = setStyle(target, {
          position: 'relative',
          zIndex: 999,
          cursor: prefix + 'zoom-out',
          transition: transformCssProp + ' ' +
            options.transitionDuration + ' ' +
            options.transitionTimingFunction,
          transform: calculateTransform(rect)
        }, true)
      }

      img.src = target.getAttribute('src')

      // insert overlay
      parent.appendChild(overlay)
      window.setTimeout(function() {
        overlay.style.opacity = options.bgOpacity
      }, 30)

      document.addEventListener('scroll', scrollHandler)
      document.addEventListener('keydown', keydownHandler)

      target.addEventListener(transEndEvent, function onEnd () {
        target.removeEventListener(transEndEvent, onEnd)
        lock = false
        cb = cb || options.onOpen
        if (cb) cb(target)
      })

      return this
    },

    close: function (cb) {
      if (!shown || lock) return
      lock = true

      // onBeforeClose event
      if (options.onBeforeClose) options.onBeforeClose(target)

      // remove overlay
      overlay.style.opacity = 0

      target.style.transform = ''

      document.removeEventListener('scroll', scrollHandler)
      document.removeEventListener('keydown', keydownHandler)

      target.addEventListener(transEndEvent, function onEnd () {
        target.removeEventListener(transEndEvent, onEnd)
        setStyle(target, originalStyles)
        parent.removeChild(overlay)
        shown = false
        lock = false

        // downgrade source if possible
        if (target.hasAttribute('data-original')) {
          target.setAttribute('src', thumbnail)
        }

        cb = typeof cb === 'function'
          ? cb
          : options.onClose
        if (cb) cb(target)
      })

      return this
    },

    listen: function (el) {
      if (typeof el === 'string') {
        var els = document.querySelectorAll(el),
            i = els.length
        while (i--) {
          this.listen(els[i])
        }
        return this
      }

      el.style.cursor = prefix + 'zoom-in'

      el.addEventListener('click', function(e) {
        e.stopPropagation()

        if (shown) {
          api.close()
        } else {
          api.open(el)
        }
      })

      return this
    }
  }

  setStyle(overlay, {
    zIndex: 998,
    background: options.bgColor,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transition: 'opacity ' +
      options.transitionDuration + ' ' +
      options.transitionTimingFunction
  })

  overlay.addEventListener('click', api.close)
  document.addEventListener('DOMContentLoaded', api.listen('img[data-action="zoom"]'))


  function setStyle (el, styles, remember) {
    checkTrans(styles)
    var s = el.style,
        original = {}

    for (var key in styles) {
      if (remember) original[key] = s[key] || ''
      s[key] = styles[key]
    }

    return original
  }

  function sniffTransition () {
    var ret   = {},
        trans = ['webkitTransition', 'transition', 'mozTransition'],
        tform = ['webkitTransform', 'transform', 'mozTransform'],
        end   = {
            'transition'       : 'transitionend',
            'mozTransition'    : 'transitionend',
            'webkitTransition' : 'webkitTransitionEnd'
        }

    trans.some(function (prop) {
      if (overlay.style[prop] !== undefined) {
        ret.transition = prop
        ret.transEnd = end[prop]
        return true
      }
    })

    tform.some(function (prop) {
      if (overlay.style[prop] !== undefined) {
        ret.transform = prop
        return true
      }
    })
    return ret
  }

  function checkTrans (styles) {
    var value
    if (styles.transition) {
      value = styles.transition
      delete styles.transition
      styles[transitionProp] = value
    }
    if (styles.transform) {
      value = styles.transform
      delete styles.transform
      styles[transformProp] = value
    }
  }

  function calculateTransform (rect) {
    var imgHalfWidth = rect.width / 2,
        imgHalfHeight = rect.height / 2,

        windowCenter = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        },

        imgCenter = {
          x: rect.left + imgHalfWidth,
          y: rect.top + imgHalfHeight
        },

        // The vector to translate image to the window center
        translate = {
          x: windowCenter.x - imgCenter.x,
          y: windowCenter.y - imgCenter.y
        },

        // The distance between image edge and window edge
        distFromImageEdgeToWindowEdge = {
          x: windowCenter.x - imgHalfWidth,
          y: windowCenter.y - imgHalfHeight
        },

        scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth,
        scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight,
        
        // The additional scale is based on the smaller value of
        // scaling horizontally and scaling vertically
        scale = options.scaleBase + Math.min(scaleHorizontally, scaleVertically),

        transform =
          'translate(' + translate.x + 'px,' + translate.y + 'px) ' +
          'scale(' + scale + ',' + scale + ')'

    return transform
  }

  function scrollHandler () {
    var scrollTop = window.pageYOffset ||
      (document.documentElement || body.parentNode || body).scrollTop

    if (lastScrollPosition === null) lastScrollPosition = scrollTop

    var deltaY = lastScrollPosition - scrollTop

    if (Math.abs(deltaY) >= options.scrollThreshold) {
      lastScrollPosition = null
      api.close()
    }
  }

  function keydownHandler (e) {
    if (e.keyCode === 27) api.close() // Esc
  }

  // umd expose
  if (typeof exports == "object") {
    module.exports = api
  } else if (typeof define == "function" && define.amd) {
    define(function(){ return api })
  } else {
    this.Zooming = api
  }
}()
