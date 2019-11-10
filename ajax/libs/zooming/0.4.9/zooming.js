/**
 * zooming - Image zoom with pure JavaScript.
 * @version v0.4.9
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
      press = false,
      grab = false

  // style
  var originalStyles,
      openStyles,
      translate,
      scale

  var srcThumbnail,
      imgRect,
      pressTimer,
      pressDelay = 200,
      lastScrollPosition = null

  var options = {
    defaultZoomable: 'img[data-action="zoom"]',
    enableGrab: true,
    transitionDuration: '.4s',
    transitionTimingFunction: 'cubic-bezier(.4,0,0,1)',
    bgColor: '#fff',
    bgOpacity: 1,
    scaleBase: 1.0,
    scaleExtra: 0.5,
    scrollThreshold: 40,
    onOpen: null,
    onClose: null,
    onGrab: null,
    onRelease: null,
    onBeforeOpen: null,
    onBeforeClose: null,
    onBeforeGrab: null,
    onBeforeRelease: null
  }

  // compatibility stuff
  var trans = sniffTransition(),
      transitionProp = trans.transition,
      transformProp = trans.transform,
      transformCssProp = transformProp.replace(/(.*)Transform/, '-$1-transform'),
      transEndEvent = trans.transEnd

  // ---------------------------------------------------------------------------

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
      if (shown || lock || grab) return

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
        imgRect = target.getBoundingClientRect()

        // upgrade source if possible
        if (target.hasAttribute('data-original')) {
          srcThumbnail = target.getAttribute('src')

          setStyle(target, {
            width: imgRect.width + 'px',
            height: imgRect.height + 'px'
          })

          target.setAttribute('src', target.getAttribute('data-original'))
        }

        // force layout update
        target.offsetWidth

        openStyles = {
          position: 'relative',
          zIndex: 999,
          cursor: prefix + (options.enableGrab ? 'grab' : 'zoom-out'),
          transition: transformCssProp + ' ' +
            options.transitionDuration + ' ' +
            options.transitionTimingFunction,
          transform: calculateTransform()
        }

        // trigger transition
        originalStyles = setStyle(target, openStyles, true)
      }

      img.src = target.getAttribute('src')

      // insert overlay
      parent.appendChild(overlay)
      setTimeout(function() {
        overlay.style.opacity = options.bgOpacity
      }, 30)

      document.addEventListener('scroll', scrollHandler)
      document.addEventListener('keydown', keydownHandler)

      target.addEventListener(transEndEvent, function onEnd () {
        target.removeEventListener(transEndEvent, onEnd)

        if (options.enableGrab) {
          target.addEventListener('mousedown', mousedownHandler)
          target.addEventListener('mousemove', mousemoveHandler)
          target.addEventListener('mouseup', mouseupHandler)
          target.addEventListener('touchstart', touchstartHandler)
          target.addEventListener('touchmove', touchmoveHandler)
          target.addEventListener('touchend', touchendHandler)
        }

        lock = false
        cb = cb || options.onOpen
        if (cb) cb(target)
      })

      return this
    },

    close: function (cb) {
      if (!shown || lock || grab) return
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

        if (options.enableGrab) {
          target.removeEventListener('mousedown', mousedownHandler)
          target.removeEventListener('mousemove', mousemoveHandler)
          target.removeEventListener('mouseup', mouseupHandler)
          target.removeEventListener('touchstart', touchstartHandler)
          target.removeEventListener('touchmove', touchmoveHandler)
          target.removeEventListener('touchend', touchendHandler)
        }

        setStyle(target, originalStyles)
        parent.removeChild(overlay)
        shown = false
        lock = false
        grab = false

        // downgrade source if possible
        if (target.hasAttribute('data-original')) {
          target.setAttribute('src', srcThumbnail)
        }

        cb = typeof cb === 'function'
          ? cb
          : options.onClose
        if (cb) cb(target)
      })

      return this
    },

    grab: function(x, y, start, cb) {
      if (!shown || lock) return
      grab = true

      // onBeforeGrab event
      if (options.onBeforeGrab) options.onBeforeGrab(target)

      var dx = x - window.innerWidth / 2,
          dy = y - window.innerHeight / 2,
          oldTransform = target.style.transform,
          transform = oldTransform
            .replace(
              /translate3d\(.*?\)/i,
              'translate3d(' + (translate.x + dx) + 'px,' + (translate.y + dy) + 'px, 0)')
            .replace(
              /scale\([0-9|\.]*\)/i,
              'scale(' + (scale + options.scaleExtra) + ')')

      setStyle(target, {
        cursor: prefix + 'grabbing',
        transition: transformCssProp + ' ' + (
          start
          ? options.transitionDuration + ' ' + options.transitionTimingFunction
          : 'ease'
        ),
        transform: transform
      })

      target.addEventListener(transEndEvent, function onEnd () {
        target.removeEventListener(transEndEvent, onEnd)
        cb = cb || options.onGrab
        if (cb) cb(target)
      })
    },

    release: function(cb) {
      if (!shown || lock || !grab) return

      // onBeforeRelease event
      if (options.onBeforeRelease) options.onBeforeRelease(target)

      setStyle(target, openStyles)

      target.addEventListener(transEndEvent, function onEnd () {
        target.removeEventListener(transEndEvent, onEnd)
        grab = false

        cb = typeof cb === 'function'
          ? cb
          : options.onRelease
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
        e.preventDefault()

        if (shown) api.close()
        else api.open(el)
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
  document.addEventListener('DOMContentLoaded', api.listen(options.defaultZoomable))

  // helpers -------------------------------------------------------------------

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

  function calculateTransform () {
    var imgHalfWidth = imgRect.width / 2,
        imgHalfHeight = imgRect.height / 2,

        imgCenter = {
          x: imgRect.left + imgHalfWidth,
          y: imgRect.top + imgHalfHeight
        },

        windowCenter = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        },

        // The distance between image edge and window edge
        distFromImageEdgeToWindowEdge = {
          x: windowCenter.x - imgHalfWidth,
          y: windowCenter.y - imgHalfHeight
        },

        scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth,
        scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight

      // The vector to translate image to the window center
      translate = {
        x: windowCenter.x - imgCenter.x,
        y: windowCenter.y - imgCenter.y
      }

      // The additional scale is based on the smaller value of
      // scaling horizontally and scaling vertically
      scale = options.scaleBase + Math.min(scaleHorizontally, scaleVertically)

      var transform =
          'translate3d(' + translate.x + 'px,' + translate.y + 'px, 0) ' +
          'scale(' + scale + ')'

    return transform
  }

  // listeners -----------------------------------------------------------------

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
    var code = e.key || e.code
    if (code === 'Escape' || e.keyCode === 27) api.close()
  }

  function mousedownHandler (e) {
    e.preventDefault()

    pressTimer = setTimeout(function() {
      press = true
      api.grab(e.clientX, e.clientY, true)
    }, pressDelay)
  }

  function mousemoveHandler (e) {
    if (press) api.grab(e.clientX, e.clientY)
  }

  function mouseupHandler () {
    clearTimeout(pressTimer)
    press = false
    api.release()
  }

  function touchstartHandler (e) {
    e.preventDefault()

    pressTimer = setTimeout(function() {
      press = true
      var touch = e.touches[0]
      api.grab(touch.clientX, touch.clientY, true)
    }, pressDelay)
  }

  function touchmoveHandler (e) {
    if (press) {
      var touch = e.touches[0]
      api.grab(touch.clientX, touch.clientY)
    }
  }

  function touchendHandler () {
    clearTimeout(pressTimer)
    press = false
    if (grab) api.release()
    else api.close()
  }

  // umd expose ----------------------------------------------------------------

  /* eslint-disable no-undef */
  if (typeof exports == 'object') {
    module.exports = api
  } else if (typeof define == 'function' && define.amd) {
    define(function(){ return api })
  } else {
    this.Zooming = api
  }
  /* eslint-enable no-undef */
}()
