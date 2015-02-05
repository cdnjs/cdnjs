/**
 * Scroll to content
 * @module Ink.UI.SmoothScroller_1
 * @version 1
 */
Ink.createModule('Ink.UI.SmoothScroller', '1', ['Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1','Ink.Dom.Loaded_1'], function(Event, InkElement, Selector, Loaded) {
    'use strict';

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        function (cb) { return setTimeout(cb, 10); };

    var cancelAnimationFrame =
        window.cancelAnimationFrame ||
        function (id) { clearTimeout(id); };

    /**
     * @namespace Ink.UI.SmoothScroller
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
         * Sets the speed of the scrolling
         *
         * @property speed
         * @type {Number}
         * @readOnly
         * @static
         */
        speed: 10,

        /**
         * Returns the Y position of an element, relative to the document
         *
         * @method getTop
         * @param  {DOMElement} d DOMElement to get the Y position from
         * @return {Number}   Y position of div 'd'
         * @public
         * @static
         */
        getTop: function(d) {
            return Math.round(
                SmoothScroller.scrollTop() + d.getBoundingClientRect().top);
        },


        /**
         * Returns the current scroll position
         *
         * @method scrollTop
         * @return {Number}  Current scroll position
         * @public
         * @static
         */
        scrollTop: function() {
            var body = document.body,
                d = document.documentElement;
            if (body && body.scrollTop){
                return body.scrollTop;
            }
            if (d && d.scrollTop){
                return d.scrollTop;
            }
            if (window.pageYOffset){
                return window.pageYOffset;
            }
            return 0;
        },

        /**
         * Attaches an event for an element
         *
         * @method add
         * @param  {DOMElement} el DOMElement to make the listening of the event
         * @param  {String} event Event name to be listened
         * @param  {DOMElement} fn Callback function to run when the event is triggered.
         * @public
         * @static
         */
        add: function(el, event, fn) {
            Event.observe(el,event,fn);
        },


        /**
         * Kill an event of an element
         *
         * @method end
         * @param  {String} e Event to be killed/stopped
         * @public
         * @static
         */
        // kill an event of an element
        end: function(e) {
            Event.stopDefault(e);
        },


        /**
         * Moves the scrollbar to the target element. This is the function
         * which animates the scroll position bit by bit. It calls itself in
         * the end through requestAnimationFrame
         *
         * @method scroll
         * @param  {Number} d Y coordinate value to stop
         * @public
         * @static
         */
        scroll: function(d, options) {
            var a = SmoothScroller.scrollTop();
            var margin = options.margin || 0;

            var endPos = d - margin;

            if (endPos > a) {
                a += Math.ceil((endPos - a) / SmoothScroller.speed);
            } else {
                a = a + (endPos - a) / SmoothScroller.speed;
            }

            cancelAnimationFrame(SmoothScroller.interval);

            if (!((a) === endPos || SmoothScroller.offsetTop === a)) {
                SmoothScroller.interval = requestAnimationFrame(
                    Ink.bindMethod(SmoothScroller, 'scroll', d, options), document.body);
            } else {
                SmoothScroller.onDone();
            }

            window.scrollTo(0, a);
            SmoothScroller.offsetTop = a;
        },


        /**
         * Has smooth scrolling applied to relevant elements upon page load.
         *
         * @method init
         * @param [selector='a.scrollableLink,a.ink-smooth-scroll'] Selector string for finding links with smooth scrolling enabled.
         * @public
         * @static
         */
        init: function(selector) {
            Loaded.run(Ink.bindMethod(SmoothScroller, 'render', selector));
        },

        /**
         * This method extracts all the anchors and validates them as # and attaches the events
         *
         * @method render
         * @public
         * @static
         */
        render: function(selector) {
            var a = Selector.select(selector || 'a.scrollableLink,a.ink-smooth-scroll');

            for (var i = 0; i < a.length; i++) {
                var _elm = a[i];
                if (_elm.href && _elm.href.indexOf('#') !== -1 && ((_elm.pathname === location.pathname) || ('/' + _elm.pathname === location.pathname))) {
                    Event.observe(_elm,'click', Ink.bindEvent(SmoothScroller.onClick, this, _elm));
                }
            }
        },


        /**
         * Click handler
         *
         * @method onClick
         * @public
         * @static
         */
        onClick: function(event, _elm) {
            SmoothScroller.end(event);
            if(_elm != null && _elm.getAttribute('href') !== null) {
                var hashIndex = _elm.href.indexOf('#');
                if (hashIndex === -1) {
                    return;
                }

                var data = InkElement.data(_elm);
                var hash = _elm.href.substr((hashIndex + 1));
                var activeLiSelector = 'ul > li.active > ' + selector;

                var selector = 'a[name="' + hash + '"],#' + hash;
                var elm = Selector.select(selector)[0];
                var activeLi = Selector.select(activeLiSelector)[0];
                activeLi = activeLi && activeLi.parentNode;

                if (typeof(elm) !== 'undefined') {
                    if (_elm.parentNode.className.indexOf('active') === -1) {
                        if (activeLi) {
                            activeLi.className = activeLi.className.replace(/(^|\s+)active($|\s+)/g, '');
                        }
                        _elm.parentNode.className += " active";
                    }
                    SmoothScroller.hash = hash;
                    var options = {};
                    if (parseFloat(data.margin)) {
                        options.margin = parseFloat(data.margin);
                    }
                    SmoothScroller.scroll(SmoothScroller.getTop(elm), options);
                }
            }
        },

        /**
         * Called when the scroll movement is done. Updates browser address.
         */
        onDone: function () {
            window.location.hash = SmoothScroller.hash;
        }
    };

    return SmoothScroller;

});
