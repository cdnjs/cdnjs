/**
 * Zenscroll 3.3.0
 * https://github.com/zengabor/zenscroll/
 *
 * Copyright 2015–2016 Gabor Lenard
 *
 * This is free and unencumbered software released into the public domain.
 * 
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org>
 *
 */

/*jshint devel:true, asi:true */

/*global define, module */


(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory())
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory()
	} else {
		root.zenscroll = factory()
	}
}(this, function () {
	"use strict"
	
	// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
	var isNativeSmoothScrollEnabledOn = function (elem) {
		return ("getComputedStyle" in window) &&
			window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
	}

	// Exit if it’s not a browser environment:
	if (typeof window === "undefined" || !("document" in window)) {
		return {}
	}

	var createScroller = function (scrollContainer, defaultDuration, edgeOffset) {

		defaultDuration = defaultDuration || 999 //ms
		if (!edgeOffset && edgeOffset !== 0) {
			// When scrolling, this amount of distance is kept from the edges of the scrollContainer:
			edgeOffset = 9 //px
		}

		var scrollTimeoutId
		var setScrollTimeoutId = function (newValue) {
			scrollTimeoutId = newValue
		}
		var docElem = document.documentElement
		
		var getScrollTop = function () {
			if (scrollContainer) {
				return scrollContainer.scrollTop
			} else {
				return window.scrollY || docElem.scrollTop
			}
		}

		var getViewHeight = function () {
			if (scrollContainer) {
				return Math.min(scrollContainer.offsetHeight, window.innerHeight)
			} else {
				return window.innerHeight || docElem.clientHeight
			}
		}

		var getRelativeTopOf = function (elem) {
			if (scrollContainer) {
				return elem.offsetTop
			} else {
				return elem.getBoundingClientRect().top + getScrollTop() - docElem.offsetTop
			}
		}

		/**
		 * Immediately stops the current smooth scroll operation
		 */
		var stopScroll = function () {
			clearTimeout(scrollTimeoutId)
			setScrollTimeoutId(0)
		}

		/**
		 * Scrolls to a specific vertical position in the document.
		 *
		 * @param {endY} The vertical position within the document.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        If 0 or not provided it is automatically calculated based on the 
		 *        distance and the default duration.
		 * @param {onDone} Callback function to be invoken once the scroll finishes.
		 */
		var scrollToY = function (endY, duration, onDone) {
			stopScroll()
			if (isNativeSmoothScrollEnabledOn(scrollContainer ? scrollContainer : document.body)) {
				(scrollContainer || window).scrollTo(0, endY)
				if (onDone) {
					onDone()
				}
			} else {
				var startY = getScrollTop()
				var distance = Math.max(endY,0) - startY
				duration = duration || Math.min(Math.abs(distance), defaultDuration)
				var startTime = new Date().getTime();
				(function loopScroll() {
					setScrollTimeoutId(setTimeout(function () {
						var p = Math.min((new Date().getTime() - startTime) / duration, 1) // percentage
						var y = Math.max(Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)), 0)
						if (scrollContainer) {
							scrollContainer.scrollTop = y
						} else {
							window.scrollTo(0, y)
						}
						if (p < 1 && (getViewHeight() + y) < (scrollContainer || docElem).scrollHeight) {
							loopScroll()
						} else {
							setTimeout(stopScroll, 99) // with cooldown time
							if (onDone) {
								onDone()
							}
						}
					}, 9))
				})()
			}
		}

		/**
		 * Scrolls to the top of a specific element.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        A value of 0 is ignored.
		 * @param {onDone} Callback function to be invoken once the scroll finishes.
		 * @returns {endY} The new vertical scoll position that will be valid once the scroll finishes.
		 */
		var scrollToElem = function (elem, duration, onDone) {
			var endY = getRelativeTopOf(elem) - edgeOffset
			scrollToY(endY, duration, onDone)
			return endY
		}

		/**
		 * Scrolls an element into view if necessary.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        A value of 0 is ignored.
		 * @param {onDone} Callback function to be invoken once the scroll finishes.
		 */
		var scrollIntoView = function (elem, duration, onDone) {
			var elemHeight = elem.getBoundingClientRect().height
			var elemTop = getRelativeTopOf(elem)
			var elemBottom = elemTop + elemHeight
			var containerHeight = getViewHeight()
			var containerTop = getScrollTop()
			var containerBottom = containerTop + containerHeight
			if ((elemTop - edgeOffset) < containerTop || (elemHeight + edgeOffset) > containerHeight) {
				// Element is clipped at top or is higher than screen.
				scrollToElem(elem, duration, onDone)
			} else if ((elemBottom + edgeOffset) > containerBottom) {
				// Element is clipped at the bottom.
				scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone)
			} else if (onDone) {
				onDone()
			}
		}

		/**
		 * Scrolls to the center of an element.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 * @param {offset} Optionally the offset of the top of the element from the center of the screen.
		 *        A value of 0 is ignored.
		 * @param {onDone} Callback function to be invoken once the scroll finishes.
		 */
		var scrollToCenterOf = function (elem, duration, offset, onDone) {
			scrollToY(
				Math.max(
					getRelativeTopOf(elem) - getViewHeight()/2 + (offset || elem.getBoundingClientRect().height/2), 
					0
				), 
				duration,
				onDone
			)
		}

		/**
		 * Changes default settings for this scroller.
		 *
		 * @param {newDefaultDuration} New value for default duration, used for each scroll method by default.
		 *        Ignored if 0 or falsy.
		 * @param {newEdgeOffset} New value for the edge offset, used by each scroll method by default.
		 */
		var setup = function (newDefaultDuration, newEdgeOffset) {
			if (newDefaultDuration) {
				defaultDuration = newDefaultDuration
			}
			if (newEdgeOffset === 0 || newEdgeOffset) {
				edgeOffset = newEdgeOffset
			}
		}

		return {
			setup: setup,
			to: scrollToElem,
			toY: scrollToY,
			intoView: scrollIntoView,
			center: scrollToCenterOf,
			stop: stopScroll,
			moving: function () { return !!scrollTimeoutId },
			getY: getScrollTop
		}

	}

	// Create a scroller for the browser window, omitting parameters:
	var defaultScroller = createScroller()

	// Create listeners for the documentElement only & exclude IE8-
	if ("addEventListener" in window && !(isNativeSmoothScrollEnabledOn(document.body) || window.noZensmooth)) {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual"
			window.addEventListener("popstate", function (event) {
				if (event.state && "scrollY" in event.state) {
					defaultScroller.toY(event.state.scrollY)
				}
			}, false)
		}
		var replaceUrl = function (hash, newY) {
			try {
				history.replaceState({scrollY:defaultScroller.getY()}, "") // remember the scroll position before scrolling
				history.pushState({scrollY:newY}, "", window.location.href.split("#")[0] + hash) // remember the new scroll position (which will be after scrolling)
			} catch (e) {
				// To avoid the Security exception in Chrome when the page was opened via the file protocol, e.g., file://index.html
			}
		}
		window.addEventListener("click", function (event) {
			var anchor = event.target
			while (anchor && anchor.tagName !== "A") {
				anchor = anchor.parentNode
			}
			// Only handle links that were clicked with the primary button, without modifier keys:
			if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
				return
			}
			var href = anchor.getAttribute("href") || ""
			if (href.indexOf("#") === 0) {
				if (href === "#") {
					event.preventDefault()
					defaultScroller.toY(0)
					replaceUrl("", 0)
				} else {
					var targetId = anchor.hash.substring(1)
					var targetElem = document.getElementById(targetId)
					if (targetElem) {
						event.preventDefault()
						replaceUrl("#" + targetId, defaultScroller.to(targetElem))
					}
				}
			}
		}, false)
	}

	return {
		// Expose the "constructor" that can create a new scroller:
		createScroller: createScroller,
		// Surface the methods of the default scroller:
		setup: defaultScroller.setup,
		to: defaultScroller.to,
		toY: defaultScroller.toY,
		intoView: defaultScroller.intoView,
		center: defaultScroller.center,
		stop: defaultScroller.stop,
		moving: defaultScroller.moving
	}

}));
