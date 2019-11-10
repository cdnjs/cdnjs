/**
 * zooming - Image zooming with pure JavaScript.
 * @version v0.2.0
 * @link https://github.com/kingdido999/zooming
 * @license MIT
 */

+function() { 'use strict'

  function Zooming() {
    this._scaleBase = 1.0
    this._target = null // Zoomable target
    this._body = document.body
    this._lastScrollPosition = null
    this._scrollThreshold = 40

    this._handleClick = this._handleClick.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  Zooming.prototype = {
    init: function() {
      this._body.addEventListener('click', this._handleClick)

      var zoomableImages = document.querySelectorAll('img[data-action="zoom"]')
      for (var i = 0; i < zoomableImages.length; i++) {
        setCursorStyle(zoomableImages[i], 'zoom-in')
      }
    },

    _handleClick: function(event) {
      var target = event.target

      if (!target) return

      if (target.tagName !== 'IMG') this._close()

      if (!target.hasAttribute('data-action')) return

      switch (target.getAttribute('data-action')) {
        case 'zoom':
          this._zoom(target)
          break
        case 'close':
          this._close()
          break
        default:
          break
      }
    },

    _handleKeyDown: function(event) {
      if (event.keyCode === 27) this._close() // Esc
    },

    _handleScroll: function() {
      var scrollTop = window.pageYOffset ||
      (document.documentElement || this._body.parentNode || this._body).scrollTop

      if (this._lastScrollPosition === null) this._lastScrollPosition = scrollTop

      var deltaY = this._lastScrollPosition - scrollTop

      if (Math.abs(deltaY) >= this._scrollThreshold) {
        this._lastScrollPosition = null
        this._close()
      }
    },

    _zoom: function(target) {
      // Avoid zooming multiple times
      if (this._target) return

      this._target = new Zoomable(target)
      this._target.zoomIn()

      document.addEventListener('keydown', this._handleKeyDown)
      document.addEventListener('scroll', this._handleScroll)
    },

    _close: function() {
      if (!this._target) return

      this._target.zoomOut()
      this._target = null

      document.removeEventListener('keydown', this._handleKeyDown)
      document.removeEventListener('scroll', this._handleScroll)
    }
  }

  /**
   * The zoomable image.
   */
  function Zoomable(img) {
    this._scaleBase = 1.0
    this._image = img
    this._src = img.getAttribute('src')
    this._dataOriginal = img.getAttribute('data-original')
    this._overlay = null // An overlay that whites out the body
    this._body = document.body
    this._zoomImage = this._zoomImage.bind(this)
    this._handleTransitionEnd = this._handleTransitionEnd.bind(this)

    this._styles = {
      image: {
        width: '',
        height: '',
        transform: '',
        zoomIn: {
          'position': 'relative',
          'z-index': 666,
          '-webkit-transition': 'all 300ms',
               '-o-transition': 'all 300ms',
                  'transition': 'all 300ms'
        },
        zoomOut: {
          'position': '',
          'z-index': '',
          '-webkit-transition': '',
               '-o-transition': '',
                  'transition': ''
        }
      },
      overlay: {
        'z-index': 233,
        'background': '#fff',
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        'filter': 'alpha(opacity=0)',
        'opacity': 0,
        '-webkit-transition': 'opacity 300ms',
             '-o-transition': 'opacity 300ms',
                'transition': 'opacity 300ms'
      }
    }
  }

  Zoomable.prototype = {
    zoomIn: function() {
      var img = new Image()

      img.onload = (function() {
        // If data-orginal is present, set image css width and height explicitly
        // so the transformed source image is correctly displayed
        if (this._dataOriginal) {
          // Save the original image width and height styles if present
          this._styles.image.width = this._image.style.width
          this._styles.image.height = this._image.style.height

          var rect = this._image.getBoundingClientRect()

          setStyles(this._image, {
            'width': rect.width + 'px',
            'height': rect.height + 'px'
          })

          // Use data-original as image src
          this._image.setAttribute('src', this._dataOriginal)
        }

        this._calculateZoom()
        this._zoomImage()
      }).bind(this)

      img.src = this._src
    },

    _calculateZoom: function() {
      var rect = this._image.getBoundingClientRect()

      var windowCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }

      var imgHalfWidth = rect.width / 2
      var imgHalfHeight = rect.height / 2

      var imgCenter = {
        x: rect.left + imgHalfWidth,
        y: rect.top + imgHalfHeight
      }

      // The vector to translate image to the window center
      var translate = {
        x: windowCenter.x - imgCenter.x,
        y: windowCenter.y - imgCenter.y
      }

      // The distance between image edge and window edge
      var distFromImageEdgeToWindowEdge = {
        x: windowCenter.x - imgHalfWidth,
        y: windowCenter.y - imgHalfHeight
      }

      // The additional scale is based on the smaller value of
      // scaling horizontally and scaling vertically
      var scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth
      var scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight
      var scale = this._scaleBase + Math.min(scaleHorizontally, scaleVertically)

      // Translate the image to window center, then scale the image
      this._styles.image.transform =
        'translate(' + translate.x + 'px,' + translate.y + 'px) ' +
        'scale(' + scale + ',' + scale + ')'
    },

    _zoomImage: function() {
      // Repaint before animating, fix Safari image flickring issue
      this._image.offsetWidth

      setStyles(this._image, this._styles.image.zoomIn)
      this._image.addEventListener('transitionend', this._handleTransitionEnd)

      // Create an overlay, it does not white out at this point
      this._overlay = document.createElement('div')
      setStyles(this._overlay, this._styles.overlay)
      this._body.appendChild(this._overlay)

      // Use setTimeout to apply correct overlay opacity transition when
      // zooming in, otherwise the transition effect won't trigger.
      window.setTimeout((function() {
        // Now whites out the overlay
        setStyles(this._overlay, {
          'filter': "alpha(opacity=100)",
          'opacity': 1
        })
      }).bind(this), 30)

      this._transform()
    },

    zoomOut: function() {
      this._image.addEventListener('transitionend', this._handleTransitionEnd)

      // Remove the overlay
      setStyles(this._overlay, {
        'filter': "alpha(opacity=0)",
        'opacity': 0
      })

      this._styles.image.transform = ''
      this._transform()
    },

    _transform: function() {
      setStyles(this._image, {
        '-webkit-transform': this._styles.image.transform,
        '-ms-transform': this._styles.image.transform,
        'transform': this._styles.image.transform,
      })
    },

    _handleTransitionEnd: function(event) {
      switch (this._image.getAttribute('data-action')) {
        case 'close':
          if (this._dataOriginal) {
            setStyles(this._image, {
              'width': this._styles.width,
              'height': this._styles.height
            })

            // Restore the old image src
            this._image.setAttribute('src', this._src)
          }
          this._body.removeChild(this._overlay)
          setStyles(this._image, this._styles.image.zoomOut)
          setCursorStyle(this._image, 'zoom-in')
          this._image.setAttribute('data-action', 'zoom')
          break
        case 'zoom':
          setCursorStyle(this._image, 'zoom-out')
          this._image.setAttribute('data-action', 'close')
          break
        default:
          break
      }
      this._image.removeEventListener('transitionend', this._handleTransitionEnd)
    }
  }

  function setStyles(element, styles) {
    for (var prop in styles) {
      element.style[prop] = styles[prop]
    }
  }

  function setCursorStyle(element, style) {
    element.style.cursor = style
    element.style.cursor = '-webkit-' + style
    element.style.cursor = '-moz-' + style
  }

  document.addEventListener('DOMContentLoaded', function() {
    new Zooming().init()
  })
}()
