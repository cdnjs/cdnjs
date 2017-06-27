/**
 * @module Ink.UI.Animate_1
 * @author inkdev AT sapo.pt
 * @version 1
 */

Ink.createModule('Ink.UI.Animate', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1'], function (Common, InkEvent, Css) {
    'use strict';

    var animationPrefix = (function (el) {
        return ('animationName' in el.style) ? 'animation' :
               ('oAnimationName' in el.style) ? 'oAnimation' :
               ('msAnimationName' in el.style) ? 'msAnimation' :
               ('webkitAnimationName' in el.style) ? 'webkitAnimation' : null;
    }(document.createElement('div')));

    var animationEndEventName = {
        animation: 'animationend',
        oAnimation: 'oanimationend',
        msAnimation: 'MSAnimationEnd',
        webkitAnimation: 'webkitAnimationEnd'
    }[animationPrefix];

    /**
     * @class Ink.UI.Animate_1
     * @constructor
     *
     * @param element {DOMElement} animated element
     * @param options {Object} options object
     * @param options.animation {String} animation name
     * @param [options.duration=medium] {String|Number} duration name (fast|medium|slow) or duration in ms
     * @param [options.removeClass=true] {Boolean} Whether to remove the `animation` class when finished animating
     * @param [options.onEnd=null] {Function} callback for animation end
     *
     * @example
     *
     *     <button id="animate-me" class="ink-button">Animate me!</button>
     *     <span class="ink-label info ink-animate"
     *         id="animated"
     *         data-trigger="#animate-me"
     *         data-animation="fadeOut"
     *         data-removeClass="false">Hi!</span>    
     *
     *     <script type="text/javascript">
     *         // Note: this step is not necessary if you are using autoload.js
     *         Ink.requireModules(['Ink.UI.Animate_1'], function (Animate) {
     *             new Animate('#animated');
     *         });
     *     </script>
     *
     **/
    function Animate(elOrSelector, options) {
        this._element = Common.elOrSelector(elOrSelector);
        this._options = Common.options({
            trigger: ['Element', null],
            duration: ['String', 'slow'],  // Actually a string with a duration name, or a number of ms
            animation: ['String'],
            removeClass: ['Boolean', true],
            onEnd: ['Function', function () {}]
        }, options || {}, this._element);

        if (!isNaN(parseInt(this._options.duration, 10))) {
            this._options.duration = parseInt(this._options.duration, 10);
        }

        if (this._options.trigger) {
            InkEvent.observe(this._options.trigger, 'click', Ink.bind(function () {
                this.animate();
            }, this));  // later
        } else {
            this.animate();
        }
    }

    Animate.prototype.animate = function () {
        Animate.animate(this._element, this._options.animation, this._options);
    };

    Ink.extendObj(Animate, {
        /**
         * Prefix for CSS animation-related properties in this browser.
         *
         * @property _animationPrefix
         * @private
         **/
        _animationPrefix: animationPrefix,

        /**
         * Whether CSS3 animation is supported in this browser.
         *
         * @property {Boolean} animationSupported
         **/
        animationSupported: !!animationPrefix,

        /**
         * The correct event for the animationend event in this browser, with the correct prefix
         *
         * @property {String} animationEndEventName
         **/
        animationEndEventName: animationEndEventName,

        /**
         * Animate a div using one of the animate.css classes
         *
         * **Note: This is a utility method inside the `Animate` class, which you can access through `Animate.animate()`. Do not mix these up.**
         *
         * @example
         *
         *      Animate.animate(myDiv, 'shake', {
         *          onEnd: function () {
         *              alert('Finished shaking!');
         *          }
         *      });
         *
         * @static
         * @method animate
         * @param element {DOMElement} animated element
         * @param animation {String} animation name
         * @param [options] {Object}
         *     @param [options.onEnd=null] {Function} callback for animation end
         *     @param [options.removeClass=false] {Boolean} whether to remove the Css class when finished
         *     @param [options.duration=medium] {String|Number} duration name (fast|medium|slow) or duration in ms
         **/
        animate: function (element, animation, options) {
            element = Common.elOrSelector(element);

            if (typeof options === 'number' || typeof options === 'string') {
                options = { duration: options };
            }

            if (typeof arguments[3] === 'function') {
                options.onEnd = arguments[3];
            }

            if (typeof options.duration !== 'number' && typeof options.duration !== 'string') {
                options.duration = 400;
            }

            if (!Animate.animationSupported) {
                if (options.onEnd) {
                    setTimeout(function () {
                        options.onEnd(null);
                    }, 0);
                }
                return;
            }

            if (typeof options.duration === 'number') {
                element.style[animationPrefix + 'Duration'] = options.duration + 'ms';
            } else if (typeof options.duration === 'string') {
                Css.addClassName(element, options.duration);
            }

            Css.addClassName(element, ['animated', animation]);

            function onAnimationEnd(event) {
                if (event.target !== element) { return; }
                if (event.animationName !== animation) { return; }
                if (options.onEnd) { options.onEnd(event); }
                if (options.removeClass) {
                    Css.removeClassName(element, animation);
                }
                if (typeof options.duration === 'string') {
                    Css.removeClassName(element, options.duration);
                }
                element.removeEventListener(animationEndEventName, onAnimationEnd, false);
            }

            element.addEventListener(animationEndEventName, onAnimationEnd, false);
        }
    });

    return Animate;
});

