/**
 * zooming - Image zooming with pure JavaScript.
 * @version v0.1.0
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
    },

    _zoom: function(target) {
      // Avoid zooming multiple times
      if (this._target) return

      // Make the target image zoomable
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
    this._styles = {
      width: '',
      height: '',
      transform: ''
    }
    this._body = document.body

    this._handleTransitionEnd = this._handleTransitionEnd.bind(this)
    this._zoomOriginal = this._zoomOriginal.bind(this)
  }

  Zoomable.prototype = {
    zoomIn: function() {
      var img = new Image()

      img.onload = (function() {
        // If data-orginal is present, set image css width and height explicitly
        // so the transformed source image is correctly displayed
        if (this._dataOriginal) {
          // Save the original image width and height styles if present
          this._styles.width = this._image.style.width
          this._styles.height = this._image.style.height

          var rect = this._image.getBoundingClientRect()

          setStyles(this._image, {
            'width': rect.width + 'px',
            'height': rect.height + 'px'
          })

          // Use data-original as image src
          this._image.setAttribute('src', this._dataOriginal)
        }

        this._calculateZoom()
        this._zoomOriginal()
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
      this._styles.transform =
        'translate(' + translate.x + 'px,' + translate.y + 'px) ' +
        'scale(' + scale + ',' + scale + ')'
    },

    _zoomOriginal: function() {
      // Repaint before animating, fix Safari image flickring issue
      this._image.offsetWidth

      this._image.classList.add('image-zoom-img')
      this._image.addEventListener('transitionend', this._handleTransitionEnd)

      // Create an overlay, it does not white out at this point
      this._overlay = document.createElement('div')
      this._overlay.classList.add('image-zoom-overlay')
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

      this._styles.transform = ''
      this._transform()
    },

    _transform: function() {
      setStyles(this._image, {
        '-webkit-transform': this._styles.transform,
        '-ms-transform': this._styles.transform,
        'transform': this._styles.transform,
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
          this._image.classList.remove('image-zoom-img')
          this._image.setAttribute('data-action', 'zoom')
          break
        case 'zoom':
          this._image.setAttribute('data-action', 'close')
          break
        default:
          break
      }
      this._image.removeEventListener('transitionend', this._handleTransitionEnd)
    }
  }

  /**
   * Set css styles.
   */
  function setStyles(element, styles) {
    for (var prop in styles) {
      element.style[prop] = styles[prop]
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    new Zooming().init()
  })
}()
