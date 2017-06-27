/**
 * Scroll to content
 * @module Ink.UI.SmoothScroller_1
 * @version 1
 */
Ink.createModule('Ink.UI.SmoothScroller', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1','Ink.Dom.Css_1'], function(Common, Event, InkElement, Selector, Css) {
    'use strict';

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        function (cb) { return setTimeout(cb, 10); };

    var cancelAnimationFrame =
        window.cancelAnimationFrame ||
        function (id) { clearTimeout(id); };

    /**
     * @namespace SmoothScroller
     * @version 1
     * @static
     *
     * SmoothScroller is a component which replaces the default scroll-to behaviour of `<a>` tags which refer to IDs on the page.
     *
     * For example, when you have this:
     *
     *          <a href="#todo">Todo</a>
     *              [...]
     *          <section id="todo">
     *              [...]
     *
     * You can click the `<a>` and the page will scroll until the section you pointed to.
     *
     * When you use SmoothScroller, instead of immediately scrolling to the element, you get a smooth motion.
     *
     * Also, you can define the data-margin option if you have a `position:fixed` top menu ruining the behaviour.
     *
     * @example
     *
     *      <a href="#part1" class="ink-smooth-scroll" data-margin="10">go to Part 1</a>
     *
     *      [lots and lots of content...]
     *
     *      <h1 id="part1">Part 1</h1>
     *
     *      <script>
     *          // ...Although you don't need to do this if you have autoload.js
     *          Ink.requireModules(['Ink.UI.SmoothScroller_1'], function (SmoothScroller) {
     *              SmoothScroller.init('.ink-smooth-scroll');
     *          })
     *      </script>
     */
    var SmoothScroller = {

        /**
         * The default scrolling speed. Higher is slower. Defaults to 10.
         *
         * @property speed
         * @type {Number}
         * @default 10
         * @static
         */
        speed: 10,

        /**
         * Change the URL hash (location.hash) when done scrolling? Defaults to true.
         *
         * @property changeHash
         * @default true
         * @type {Boolean}
         * @static
         */
        changeHash: true,

        /**
         * The default top margin.
         * Use this when you want the scroll motion to stop before it reaches its destination, for example when you want to add some breathing space or have a position:fixed top bar in front of your content.
         *
         * @property margin
         * @default 0
         * @type {Number}
         * @static
         */
        margin: 0,


        /**
         * Moves the scrollbar to the target element. This is the function
         * which animates the scroll position bit by bit. It calls itself in
         * the end through requestAnimationFrame
         *
         * @method scroll
         * @param  {Number} d Y coordinate value to stop
         * @private
         * @static
         */
        scroll: function(d, options) {
            var a = Math.round(InkElement.scrollHeight());

            var endPos = Math.round(d - options.margin);

            if (endPos > a) {
                a += Math.ceil((endPos - a) / options.speed);
            } else {
                a = a + (endPos - a) / options.speed;
            }

            cancelAnimationFrame(SmoothScroller.interval);

            if (!((a) === endPos || SmoothScroller.offsetTop === a)) {
                SmoothScroller.interval = requestAnimationFrame(
                    Ink.bindMethod(SmoothScroller, 'scroll', d, options), document.body);
            } else {
                SmoothScroller.onDone(options);
            }

            window.scrollTo(0, a);
            SmoothScroller.offsetTop = a;
        },


        /**
         * Has smooth scrolling applied to relevant elements upon page load.
         *
         * Listens to the click event on the document.
         *
         * Anything which matches the selector will be considered a "link" by SmoothScroller and handled as such.
         *
         * When a link is clicked, it is checked for several options:
         *
         * - `data-margin="0"` - A margin in pixels -- useful when you have a position:fixed top bar.
         * - `data-speed="10"` - Inverse speed of the scrolling motion. Smaller is faster.
         * - `data-change-hash="true"` - Change the URL hash (location.hash) when done scrolling.
         *
         * @method init
         * @param [selector='a.scrollableLink,a.ink-smooth-scroll'] {String} Selector string for finding links with smooth scrolling enabled.
         * @static
         */
        init: function(selector) {
            Event.on(document, 'click', selector, SmoothScroller.onClick);
        },

        // Deprecated. Kept around just in case someone is still calling this.
        render: function() {},

        /**
         * Handles clicks on link elements
         *
         * @method onClick
         * @private
         * @static
         */
        onClick: function(event) {
            var link = event.currentTarget;

            var thisDocument =    (location + '').replace(/#.*?$/, '');
            var linkedDocument = (link.href + '').replace(/#.*?$/, '');

            if (linkedDocument !== thisDocument) {
                return; // It's an external link.
            }

            var hash = link.getAttribute('data-hash') || (link.getAttribute('href') || '')
                .replace(/^.*?#/, '');

            if(hash) {
                event.preventDefault();
                var activeLiSelector = 'ul > li.active > ' + selector;

                var selector = 'a[name="' + hash + '"],#' + hash;
                var elm = Ink.s(selector);
                var activeLi = Ink.s(activeLiSelector);
                activeLi = activeLi && activeLi.parentNode;

                if (elm) {
                    if (!Css.hasClassName(link.parentNode, 'active')) {
                        if (activeLi) {
                            Css.removeClassName(activeLi, 'active');
                        }
                        Css.addClassName(link.parentNode, 'active');
                    }

                    var options = Common.options('SmoothScroller link options', {
                        margin: ['Number', SmoothScroller.margin],
                        speed: ['Number', SmoothScroller.speed],
                        changeHash: ['Boolean', SmoothScroller.changeHash]
                    }, {}, link);

                    SmoothScroller.hash = hash;
                    
                    SmoothScroller.scroll(InkElement.offsetTop(elm), options);
                }
            }
        },

        /**
         * Called when the scroll movement is done. Updates browser address.
         *
         * @method onDone
         * @param {Object} options Options object from the element.
         * @private
         */
        onDone: function (options) {
            if (options.changeHash === true) {
                window.location.hash = SmoothScroller.hash;
            }

            SmoothScroller.hash = SmoothScroller.offsetTop = null;
        }
    };

    return SmoothScroller;

});
