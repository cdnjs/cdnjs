/**
 *
 * Version: 0.2.0-beta.2
 * Author: Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/

(function(doc, win) {
  'use strict'
  if (typeof doc.createEvent !== 'function') return false // no tap events here
  // helpers
  var useJquery = typeof jQuery !== 'undefined',
    msEventType = function(type) {
      var lo = type.toLowerCase(),
        ms = 'MS' + type
      return navigator.msPointerEnabled ? ms : lo
    },
    pointerEnabled = !!navigator.pointerEnabled || navigator.msPointerEnabled,
    isTouch = function() {
      return 'ontouchstart' in window ||
        window.DocumentTouch && document instanceof DocumentTouch ||
        pointerEnabled
    },
    isValid = function(e) {
      var _isTouch = isTouch(),
        isMouse = /mouse/.test(e.type)
      return !isMouse && _isTouch && /touch/.test(e.type) && !pointerEnabled ||
        !isMouse && _isTouch && !/touch/.test(e.type) && pointerEnabled ||
        isMouse && !_isTouch
    },
    touchevents = {
      touchstart: msEventType('PointerDown') + ' touchstart',
      touchend: msEventType('PointerUp') + ' touchend',
      touchmove: msEventType('PointerMove') + ' touchmove'
    },
    setListener = function(elm, events, callback) {
      var eventsArray = events.split(' '),
        i = eventsArray.length

      while (i--) {
        elm.addEventListener(eventsArray[i], callback, false)
      }
    },
    getPointerEvent = function(event) {
      return event.targetTouches ? event.targetTouches[0] : event
    },
    getTimestamp = function () {
      return new Date().getTime()
    },
    sendEvent = function(elm, eventName, originalEvent, data) {
      var customEvent = doc.createEvent('Event')
      customEvent.originalEvent = originalEvent
      data = data || {}
      data.x = currX
      data.y = currY
      data.distance = data.distance

      // jquery
      if (useJquery) {
        customEvent = $.Event(eventName, {originalEvent: originalEvent})
        jQuery(elm).trigger(customEvent, data)
      }

      // addEventListener
      if (customEvent.initEvent) {
        for (var key in data) {
          customEvent[key] = data[key]
        }
        customEvent.initEvent(eventName, true, true)
        elm.dispatchEvent(customEvent)
      }

      // inline
      if (elm['on' + eventName])
        elm['on' + eventName](customEvent)
    },

    onTouchStart = function(e) {
      if (!isValid(e)) return
      var pointer = getPointerEvent(e)

      // caching the current x
      cachedX = currX = pointer.pageX
      // caching the current y
      cachedY = currY = pointer.pageY

      longtapTimer = setTimeout(function() {
        sendEvent(e.target, 'longtap', e)
        target = e.target
      }, longtapThreshold)

      // we will use these variables on the touchend events
      timestamp = getTimestamp()
      tapNum++

    },
    onTouchEnd = function(e) {
      if (!isValid(e)) return
      var eventsArr = [],
        now = getTimestamp(),
        deltaY = cachedY - currY,
        deltaX = cachedX - currX

      // clear the previous timer in case it was set
      clearTimeout(dblTapTimer)
      clearTimeout(longtapTimer)

      if (deltaX <= -swipeThreshold)
        eventsArr.push('swiperight')

      if (deltaX >= swipeThreshold)
        eventsArr.push('swipeleft')

      if (deltaY <= -swipeThreshold)
        eventsArr.push('swipedown')

      if (deltaY >= swipeThreshold)
        eventsArr.push('swipeup')

      if (eventsArr.length) {
        for (var i = 0; i < eventsArr.length; i++) {
          var eventName = eventsArr[i]
          sendEvent(e.target, eventName, e, {
            distance: {
              x: Math.abs(deltaX),
              y: Math.abs(deltaY)
            }
          })
        }
      } else {

        if (
          cachedX >= currX - tapPrecision &&
          cachedX <= currX + tapPrecision &&
          cachedY >= currY - tapPrecision &&
          cachedY <= currY + tapPrecision
        ) {
          if (timestamp + tapThreshold - now >= 0)
          {
            // Here you get the Tap event
            sendEvent(e.target, tapNum === 2 && target === e.target ? 'dbltap' : 'tap', e)
            target= e.target
          }
        }

        // reset the tap counter
        dblTapTimer = setTimeout(function() {
          tapNum = 0
        }, dbltapThreshold)

      }
    },
    onTouchMove = function(e) {
      if (!isValid(e)) return
      var pointer = getPointerEvent(e)
      currX = pointer.pageX
      currY = pointer.pageY
    },
    swipeThreshold = win.SWIPE_THRESHOLD || 100,
    tapThreshold = win.TAP_THRESHOLD || 150, // range of time where a tap event could be detected
    dbltapThreshold = win.DBL_TAP_THRESHOLD || 200, // delay needed to detect a double tap
    longtapThreshold = win.LONG_TAP_THRESHOLD || 1000, // delay needed to detect a long tap
    tapPrecision = win.TAP_PRECISION / 2 || 60 / 2, // touch events boundaries ( 60px by default )
    justTouchEvents = win.JUST_ON_TOUCH_DEVICES,
    tapNum = 0,
    currX, currY, cachedX, cachedY, timestamp, target, dblTapTimer, longtapTimer

  //setting the events listeners
  setListener(doc, touchevents.touchstart + (justTouchEvents ? '' : ' mousedown'), onTouchStart)
  setListener(doc, touchevents.touchend + (justTouchEvents ? '' : ' mouseup'), onTouchEnd)
  setListener(doc, touchevents.touchmove + (justTouchEvents ? '' : ' mousemove'), onTouchMove)
}(document, window));
