/*
 * blueimp Gallery Indicator JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

;(function (factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./blueimp-helper', './blueimp-gallery'], factory)
  } else {
    // Browser globals:
    factory(window.blueimp.helper || window.jQuery, window.blueimp.Gallery)
  }
})(function ($, Gallery) {
  'use strict'

  var galleryPrototype = Gallery.prototype

  $.extend(galleryPrototype.options, {
    // The tag name, Id, element or querySelector of the indicator container:
    indicatorContainer: 'ol',
    // The class for the active indicator:
    activeIndicatorClass: 'active',
    // The list object property (or data attribute) with the thumbnail URL,
    // used as alternative to a thumbnail child element:
    thumbnailProperty: 'thumbnail',
    // Defines if the gallery indicators should display a thumbnail:
    thumbnailIndicators: true
  })

  var initSlides = galleryPrototype.initSlides
  var addSlide = galleryPrototype.addSlide
  var resetSlides = galleryPrototype.resetSlides
  var handleClick = galleryPrototype.handleClick
  var handleSlide = galleryPrototype.handleSlide
  var handleClose = galleryPrototype.handleClose

  $.extend(galleryPrototype, {
    createIndicator: function (obj) {
      var indicator = this.indicatorPrototype.cloneNode(false)
      var title = this.getItemProperty(obj, this.options.titleProperty)
      var thumbnailProperty = this.options.thumbnailProperty
      var thumbnailUrl
      var thumbnail
      if (this.options.thumbnailIndicators) {
        if (thumbnailProperty) {
          thumbnailUrl = this.getItemProperty(obj, thumbnailProperty)
        }
        if (thumbnailUrl === undefined) {
          thumbnail = obj.getElementsByTagName && $(obj).find('img')[0]
          if (thumbnail) {
            thumbnailUrl = thumbnail.src
          }
        }
        if (thumbnailUrl) {
          indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")'
        }
      }
      if (title) {
        indicator.title = title
      }
      indicator.setAttribute('role', 'link')
      return indicator
    },

    addIndicator: function (index) {
      if (this.indicatorContainer.length) {
        var indicator = this.createIndicator(this.list[index])
        indicator.setAttribute('data-index', index)
        this.indicatorContainer[0].appendChild(indicator)
        this.indicators.push(indicator)
      }
    },

    setActiveIndicator: function (index) {
      if (this.indicators) {
        if (this.activeIndicator) {
          this.activeIndicator.removeClass(this.options.activeIndicatorClass)
        }
        this.activeIndicator = $(this.indicators[index])
        this.activeIndicator.addClass(this.options.activeIndicatorClass)
      }
    },

    initSlides: function (reload) {
      if (!reload) {
        this.indicatorContainer = this.container.find(
          this.options.indicatorContainer
        )
        if (this.indicatorContainer.length) {
          this.indicatorPrototype = document.createElement('li')
          this.indicators = this.indicatorContainer[0].children
        }
      }
      initSlides.call(this, reload)
    },

    addSlide: function (index) {
      addSlide.call(this, index)
      this.addIndicator(index)
    },

    resetSlides: function () {
      resetSlides.call(this)
      this.indicatorContainer.empty()
      this.indicators = []
    },

    handleClick: function (event) {
      var target = event.target || event.srcElement
      var parent = target.parentNode
      if (parent === this.indicatorContainer[0]) {
        // Click on indicator element
        this.preventDefault(event)
        this.slide(this.getNodeIndex(target))
      } else if (parent.parentNode === this.indicatorContainer[0]) {
        // Click on indicator child element
        this.preventDefault(event)
        this.slide(this.getNodeIndex(parent))
      } else {
        return handleClick.call(this, event)
      }
    },

    handleSlide: function (oldIndex, newIndex) {
      handleSlide.call(this, oldIndex, newIndex)
      this.setActiveIndicator(newIndex)
    },

    handleClose: function () {
      if (this.activeIndicator) {
        this.activeIndicator.removeClass(this.options.activeIndicatorClass)
      }
      handleClose.call(this)
    }
  })

  return Gallery
})
