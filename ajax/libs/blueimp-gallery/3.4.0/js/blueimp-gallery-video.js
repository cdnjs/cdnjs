/*
 * blueimp Gallery Video Factory JS
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
    // The class for video content elements:
    videoContentClass: 'video-content',
    // The class for video when it is loading:
    videoLoadingClass: 'video-loading',
    // The class for video when it is playing:
    videoPlayingClass: 'video-playing',
    // The class for video content displayed in an iframe:
    videoIframeClass: 'video-iframe',
    // The class for the video cover element:
    videoCoverClass: 'video-cover',
    // The class for the video play control:
    videoPlayClass: 'video-play',
    // Play videos inline by default:
    videoPlaysInline: true,
    // The list object property (or data attribute) for video preload:
    videoPreloadProperty: 'preload',
    // The list object property (or data attribute) for the video poster URL:
    videoPosterProperty: 'poster'
  })

  var handleSlide = galleryPrototype.handleSlide

  $.extend(galleryPrototype, {
    handleSlide: function (oldIndex, newIndex) {
      handleSlide.call(this, oldIndex, newIndex)
      this.setTimeout(function () {
        if (this.activeVideo) {
          this.activeVideo.pause()
        }
      })
    },

    videoFactory: function (obj, callback, videoInterface) {
      var that = this
      var options = this.options
      var videoContainerNode = this.elementPrototype.cloneNode(false)
      var videoContainer = $(videoContainerNode)
      var errorArgs = [
        {
          type: 'error',
          target: videoContainerNode
        }
      ]
      var video = videoInterface || document.createElement('video')
      var coverElement = this.elementPrototype.cloneNode(false)
      var playElement = document.createElement('a')
      var url = this.getItemProperty(obj, options.urlProperty)
      var sources = this.getItemProperty(obj, options.sourcesProperty)
      var title = this.getItemProperty(obj, options.titleProperty)
      var posterUrl = this.getItemProperty(obj, options.videoPosterProperty)
      var playControls = [playElement]
      var hasGalleryControls
      var isLoading
      var i
      videoContainer.addClass(options.videoContentClass)
      $(playElement).addClass(options.videoPlayClass)
      if (
        !$(coverElement)
          .addClass(options.videoCoverClass)
          .hasClass(options.toggleClass)
      ) {
        playControls.push(coverElement)
      }
      coverElement.draggable = false
      if (title) {
        videoContainerNode.title = title
        playElement.setAttribute('aria-label', title)
      }
      if (posterUrl) {
        // Set as background image instead of as poster video element property:
        // - Is accessible for browsers that do not support the video element
        // - Is accessible for both video element and iframe video players
        // - Avoids visual artifacts in IE with the poster property set
        coverElement.style.backgroundImage = 'url("' + posterUrl + '")'
      }
      if (video.setAttribute) {
        if (options.videoPlaysInline) video.setAttribute('playsinline', '')
      } else {
        videoContainer.addClass(options.videoIframeClass)
      }
      video.preload =
        this.getItemProperty(obj, options.videoPreloadProperty) || 'none'
      if (this.support.source && sources) {
        for (i = 0; i < sources.length; i += 1) {
          video.appendChild(
            $.extend(this.sourcePrototype.cloneNode(false), sources[i])
          )
        }
      }
      if (url) video.src = url
      playElement.href = url || (sources && sources.length && sources[0].src)
      if (video.play && video.pause) {
        ;(videoInterface || $(video))
          .on('error', function () {
            that.setTimeout(callback, errorArgs)
          })
          .on('pause', function () {
            if (video.seeking) return
            isLoading = false
            videoContainer
              .removeClass(that.options.videoLoadingClass)
              .removeClass(that.options.videoPlayingClass)
            if (hasGalleryControls) {
              that.container.addClass(that.options.controlsClass)
            }
            video.controls = false
            if (video === that.activeVideo) delete that.activeVideo
            if (that.interval) {
              // Continue slideshow interval
              that.play()
            }
          })
          .on('playing', function () {
            isLoading = false
            coverElement.removeAttribute('style')
            videoContainer
              .removeClass(that.options.videoLoadingClass)
              .addClass(that.options.videoPlayingClass)
          })
          .on('play', function () {
            // Clear slideshow timeout:
            window.clearTimeout(that.timeout)
            isLoading = true
            videoContainer.addClass(that.options.videoLoadingClass)
            if (that.container.hasClass(that.options.controlsClass)) {
              hasGalleryControls = true
              that.container.removeClass(that.options.controlsClass)
            } else {
              hasGalleryControls = false
            }
            video.controls = true
            that.activeVideo = video
          })
        $(playControls).on('click', function (event) {
          that.preventDefault(event)
          that.activeVideo = video
          if (isLoading) {
            video.pause()
          } else {
            video.play()
          }
        })
        videoContainerNode.appendChild(
          (videoInterface && videoInterface.element) || video
        )
      }
      videoContainerNode.appendChild(coverElement)
      videoContainerNode.appendChild(playElement)
      this.setTimeout(callback, [
        {
          type: 'load',
          target: videoContainerNode
        }
      ])
      return videoContainerNode
    }
  })

  return Gallery
})
