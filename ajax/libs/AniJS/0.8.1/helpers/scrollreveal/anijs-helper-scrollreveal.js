/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * AniJS ScrollReview Helper
 */
(function() {

    //Obtaining  the default helper
    var AniJSDefaultHelper = AniJS.getHelper();

    /**
     * Creating a testing scroll before function
     * @method scrollReveal
     * @param {} e
     * @param {} animationContext
     * @return
     */
    AniJSDefaultHelper.scrollReveal = function(e, animationContext, params) {
        var viewportRatio = params[0] || 0.33;
        //Current elements that will be animated
        animationContextBehaviorTargetList = animationContext.behaviorTargetList;

        //We put in this only the nodes that will be animated
        visibleBehaviorTargetList = [];

        for (var i = 0; i < animationContextBehaviorTargetList.length; i++) {
            element = animationContextBehaviorTargetList[i];

            //Check if the element is visible
            if (ScrollRevealHelper.isElementInViewport(element, viewportRatio)) {

                //The element is not animated again if it's visible
                if (!element.isRevealed) {
                    visibleBehaviorTargetList.push(element);
                    element.isRevealed = 1;
                }

            } else {
                element.isRevealed = 0;
            }
        }

        //Overwrite the behaviorTargetList of the animation
        animationContext.behaviorTargetList = visibleBehaviorTargetList;

        //Run the animation
        animationContext.run();
    };

    /**
     * Helper the custom EventTarget
     * ! scrollReveal.js v0.1.2 (c) 2014 Julian Lloyd
     * MIT License
     * https://github.com/julianlloyd/scrollReveal.js
     * @class ScrollRevealHelper
     */
    var ScrollRevealHelper = {

        //ATTRS

        //TODO: This attrs should be customizable
        viewportFactor: 1,
        docElem: window.document.documentElement,

        /**
         * Return true if the element if visible in a viewport zone
         * @method isElementInViewport
         * @param {} el
         * @param {} h
         * @return LogicalExpression
         */
        isElementInViewport: function(el, h) {
            var scrolled = window.pageYOffset,
                viewed = scrolled + this._getViewportH(),
                elH = el.offsetHeight,
                elTop = this._getOffset(el).top,
                elBottom = elTop + elH,
                h = h || 0;

            return (elTop + elH * h) <= viewed && (elBottom) >= scrolled || (el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)).position == 'fixed';
        },

        /**
         * Obtaining the viewport height
         * @method _getViewportH
         * @return ConditionalExpression
         */
        _getViewportH: function() {
            var client = this.docElem.clientHeight,
                inner = window.innerHeight;

            return (client < inner) ? inner : client;
        },

        /**
         * The offset of the element
         * @method _getOffset
         * @param {} el
         * @return ObjectExpression
         */
        _getOffset: function(el) {
            var offsetTop = 0,
                offsetLeft = 0;

            do {
                if (!isNaN(el.offsetTop)) {
                    offsetTop += el.offsetTop;
                }
                if (!isNaN(el.offsetLeft)) {
                    offsetLeft += el.offsetLeft;
                }
            } while (el = el.offsetParent)

            return {
                top: offsetTop,
                left: offsetLeft
            }
        }
    };


}(window));
