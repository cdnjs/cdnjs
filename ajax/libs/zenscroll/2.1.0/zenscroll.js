/**
 * Zenscroll 2.0.0
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


(function (win, doc) {
	"use strict"

	win.Zenscroll = function Zenscroll(scrollContainer, defaultDuration, edgeOffset) {

		defaultDuration = defaultDuration || 999 //ms
		if (!edgeOffset || edgeOffset !== 0) {
			// When scrolling this amount of distance is kept from the edges of the scrollContainer
			edgeOffset = 9 //px
		}

		var scrollTimeoutId
		var docElem = doc.documentElement

		var getScrollTop = function () { 
			return scrollContainer ? scrollContainer.scrollTop : win.scrollY || docElem.scrollTop 
		}

		var getViewHeight = function () { 
			return scrollContainer ? 
				Math.min(scrollContainer.offsetHeight, win.innerHeight) : 
				win.innerHeight || docElem.clientHeight
		}

		var getRelativeTopOf = function (elem) {
			if (scrollContainer) {
				return elem.offsetTop - scrollContainer.offsetTop
			} else {
				return elem.getBoundingClientRect().top + getScrollTop() - docElem.offsetTop
			}
		}

		/**
		 * Immediately stops the current smooth scroll operation
		 */
		var stopScroll = function stopScroll() {
			clearTimeout(scrollTimeoutId)
			scrollTimeoutId = 0
		}

		/**
		 * Scrolls to a specific vertical position in the document.
		 *
		 * @param {endY} The vertical position within the document.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        If 0 or not provided it is automatically calculated based on the 
		 *        distance and the default duration.
		 */
		var scrollToY = function (endY, duration) {
			stopScroll()
			var startY = getScrollTop()
			var distance = Math.max(endY,0) - startY
			duration = duration || Math.min(Math.abs(distance), defaultDuration)
			var startTime = new Date().getTime();
			(function loopScroll() {
				scrollTimeoutId = setTimeout(function () {
					var p = Math.min((new Date().getTime() - startTime) / duration, 1) // percentage
					var y = Math.max(Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)), 0)
					if (scrollContainer) {
						scrollContainer.scrollTop = y
					} else {
						win.scrollTo(0, y)
					}
					if (p < 1 && (getViewHeight() + y) < (scrollContainer || docElem).scrollHeight) {
						loopScroll()
					} else {
						setTimeout(stopScroll, 99) // with cooldown time
					}
				}, 9)
			})()
		}

		/**
		 * Scrolls to the top of a specific element.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        A value of 0 is ignored.
		 */
		var scrollToElem = function scrollToElem(elem, duration) {
			scrollToY(getRelativeTopOf(elem) - edgeOffset, duration)
		}

		/**
		 * Scrolls an element into view if necessary.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        A value of 0 is ignored.
		 */
		var scrollIntoView = function scrollIntoView(elem, duration) {
			var elemScrollHeight = elem.getBoundingClientRect().height + 2*edgeOffset
			var vHeight = getViewHeight()
			var elemTop = getRelativeTopOf(elem)
			var elemBottom = elemTop + elemScrollHeight
			var scrollTop = getScrollTop()
			if ((elemTop - scrollTop) < edgeOffset || elemScrollHeight > vHeight) {
				// Element is clipped at top or is higher than screen.
				scrollToElem(elem, duration)
			} else if ((scrollTop + vHeight - elemBottom) < edgeOffset) {
				// Element is clipped at the bottom.
				scrollToY(elemBottom - vHeight, duration)
			}
		}

		/**
		 * Scrolls to the center of an element.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 * @param {offset} Optionally the offset of the top of the element from the center of the screen.
		 *        A value of 0 is ignored.
		 */
		var scrollToCenterOf = function scrollToCenterOf(elem, duration, offset) {
			scrollToY(
				Math.max(
					getRelativeTopOf(elem) - getViewHeight()/2 + (offset || elem.getBoundingClientRect().height/2), 
					0
				), 
				duration
			)
		}

		var replaceUrl = function replaceUrl(hash) {
			try {
				history.replaceState({}, "", win.location.href.split("#")[0] + (hash ? "#" + hash : ""))
			} catch (e) {
				// To avoid the Security exception in Chrome when the page was opened via the file protocol, e.g., file://index.html
			}
		} 
		var internalLinkHandler = function internalLinkHandler(event) {
			var anchor = event.target
			while (anchor && anchor.tagName !== "A") {
				anchor = anchor.parentNode
			}
			if (anchor) {
				var href = anchor.getAttribute("href") || ""
				if (href.indexOf("#") === 0) {
					if (href === "#") {
						event.preventDefault()
						win.zenscroll.toY(0)
						replaceUrl("")
					} else {
						var targetId = anchor.hash.substring(1)
						var targetElem = document.getElementById(targetId)
						if (targetElem) {
							event.preventDefault()
							win.zenscroll.to(targetElem)
							replaceUrl(targetId)
						}
					}
				}
			}
		}

		// create listeners for the documentElement only & exclude IE8-
		if (!scrollContainer && "addEventListener" in win && !win.noZensmooth) {
			win.addEventListener("click", internalLinkHandler, false)
		}

		/**
		 * Changes default settings for this scroller.
		 *
		 * @param {newDefaultDuration} New value for default duration, used for each scroll method by default.
		 *        Ignored if 0 or falsy.
		 * @param {newEdgeOffset} New value for the edge offset, used by each scroll method by default.
		 */
		var setup = function setup(newDefaultDuration, newEdgeOffset) {
			if (newDefaultDuration) {
				defaultDuration = newDefaultDuration
			}
			if (newEdgeOffset !== null) {
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
			moving: function () { return !!scrollTimeoutId }
		}

	}


	win.zenscroll = new win.Zenscroll()


})(this, document);


