/**
 * @module Ink.UI.SmoothScroller_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.SmoothScroller', '1', ['Ink.Dom.Event_1','Ink.Dom.Selector_1','Ink.Dom.Loaded_1'], function(Event, Selector, Loaded ) {
    'use strict';

    /**
     * @class Ink.UI.SmoothScroller
     * @version 1
     * @static
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
         * Returns the Y position of the div
         *
         * @method gy
         * @param  {DOMElement} d DOMElement to get the Y position from
         * @return {Number}   Y position of div 'd'
         * @public
         * @static
         */
        gy: function(d) {
            var gy;
            gy = d.offsetTop;
            if (d.offsetParent){
                while ( (d = d.offsetParent) ){
                    gy += d.offsetTop;
                }
            }
            return gy;
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
            var
                body = document.body,
                d = document.documentElement
            ;
            if (body && body.scrollTop){
                return body.scrollTop;
            }
            if (d && d.scrollTop){
                return d.scrollTop;
            }
            if (window.pageYOffset)
            {
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
            return;
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
            if (window.event) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
                return;
            }
            Event.stop(e);
        },


        /**
         * Moves the scrollbar to the target element
         *
         * @method scroll
         * @param  {Number} d Y coordinate value to stop
         * @public
         * @static
         */
        scroll: function(d) {
            var a = Ink.UI.SmoothScroller.scrollTop();
            if (d > a) {
                a += Math.ceil((d - a) / Ink.UI.SmoothScroller.speed);
            } else {
                a = a + (d - a) / Ink.UI.SmoothScroller.speed;
            }

            window.scrollTo(0, a);
            if ((a) === d || Ink.UI.SmoothScroller.offsetTop === a)
            {
                clearInterval(Ink.UI.SmoothScroller.interval);
            }
            Ink.UI.SmoothScroller.offsetTop = a;
        },


        /**
         * Initializer that adds the rendered to run when the page is ready
         *
         * @method init
         * @public
         * @static
         */
        // initializer that adds the renderer to the onload function of the window
        init: function() {
            Loaded.run(Ink.UI.SmoothScroller.render);
        },

        /**
         * This method extracts all the anchors and validates thenm as # and attaches the events
         *
         * @method render
         * @public
         * @static
         */
        render: function() {
            var a = Selector.select('a.scrollableLink');

            Ink.UI.SmoothScroller.end(this);

            for (var i = 0; i < a.length; i++) {
                var _elm = a[i];
                if (_elm.href && _elm.href.indexOf('#') !== -1 && ((_elm.pathname === location.pathname) || ('/' + _elm.pathname === location.pathname))) {
                    Ink.UI.SmoothScroller.add(_elm, 'click', Ink.UI.SmoothScroller.end);
                    Event.observe(_elm,'click', Ink.bindEvent(Ink.UI.SmoothScroller.clickScroll, this, _elm));
                }
            }
        },


        /**
         * Click handler
         *
         * @method clickScroll
         * @public
         * @static
         */
        clickScroll: function(event, _elm) {
            /*
            Ink.UI.SmoothScroller.end(this);
            var hash = this.hash.substr(1);
            var elm = Selector.select('a[name="' + hash + '"],#' + hash);

            if (typeof(elm[0]) !== 'undefined') {

                if (this.parentNode.className.indexOf('active') === -1) {
                    var ul = this.parentNode.parentNode,
                        li = ul.firstChild;
                    do {
                        if ((typeof(li.tagName) !== 'undefined') && (li.tagName.toUpperCase() === 'LI') && (li.className.indexOf('active') !== -1)) {
                            li.className = li.className.replace('active', '');
                            break;
                        }
                    } while ((li = li.nextSibling));
                    this.parentNode.className += " active";
                }
                clearInterval(Ink.UI.SmoothScroller.interval);
                Ink.UI.SmoothScroller.interval = setInterval('Ink.UI.SmoothScroller.scroll(' + Ink.UI.SmoothScroller.gy(elm[0]) + ')', 10);

            }
            */
            Ink.UI.SmoothScroller.end(_elm);
            if(_elm !== null && _elm.getAttribute('href') !== null) {
                var hashIndex = _elm.href.indexOf('#');
                if(hashIndex === -1) {
                    return;
                }
                var hash = _elm.href.substr((hashIndex + 1));
                var elm = Selector.select('a[name="' + hash + '"],#' + hash);

                if (typeof(elm[0]) !== 'undefined') {

                    if (_elm.parentNode.className.indexOf('active') === -1) {
                        var ul = _elm.parentNode.parentNode,
                            li = ul.firstChild;
                        do {
                            if ((typeof(li.tagName) !== 'undefined') && (li.tagName.toUpperCase() === 'LI') && (li.className.indexOf('active') !== -1)) {
                                li.className = li.className.replace('active', '');
                                break;
                            }
                        } while ((li = li.nextSibling));
                        _elm.parentNode.className += " active";
                    }
                    clearInterval(Ink.UI.SmoothScroller.interval);
                    Ink.UI.SmoothScroller.interval = setInterval('Ink.UI.SmoothScroller.scroll(' + Ink.UI.SmoothScroller.gy(elm[0]) + ')', 10);

                }
            }

        }
    };

    return SmoothScroller;

});
