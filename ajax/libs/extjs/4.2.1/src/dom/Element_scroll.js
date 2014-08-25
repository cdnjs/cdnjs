/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
/**
 */
Ext.define('Ext.dom.Element_scroll', {
    override: 'Ext.dom.Element',

    /**
     * Returns true if this element is scrollable.
     * @return {Boolean}
     */
    isScrollable: function() {
        var dom = this.dom;
        return dom.scrollHeight > dom.clientHeight || dom.scrollWidth > dom.clientWidth;
    },

    /**
     * Returns the current scroll position of the element.
     * @return {Object} An object containing the scroll position in the format
     * `{left: (scrollLeft), top: (scrollTop)}`
     */
    getScroll: function() {
        var me = this,
            dom = me.dom,
            doc = document,
            body = doc.body,
            docElement = doc.documentElement,
            left, top;

        if (dom === doc || dom === body) {
            // the scrollLeft/scrollTop may be either on the body or documentElement,
            // depending on browser. It is possible to use window.pageXOffset/pageYOffset
            // in most modern browsers but this complicates things when in rtl mode because
            // pageXOffset does not always behave the same as scrollLeft when direction is
            // rtl. (e.g. pageXOffset can be an offset from the right, while scrollLeft
            // is offset from the left, one can be positive and the other negative, etc.)
            // To avoid adding an extra layer of feature detection in rtl mode to deal with
            // these differences, it's best just to always use scrollLeft/scrollTop
            left = docElement.scrollLeft || (body ? body.scrollLeft : 0);
            top = docElement.scrollTop || (body ? body.scrollTop : 0);
        } else {
            left = dom.scrollLeft;
            top = dom.scrollTop;
        }

        return {
            left: left,
            top: top
        };
    },
    
    /**
     * Gets the left scroll position
     * @return {Number} The left scroll position
     */
    getScrollLeft: function() {
        var dom = this.dom,
            doc = document;
            
        if (dom === doc || dom === doc.body) {
            return this.getScroll().left;
        } else {
            return dom.scrollLeft;
        }
    },
    
    /**
     * Gets the top scroll position
     * @return {Number} The top scroll position
     */
    getScrollTop: function(){
        var dom = this.dom,
            doc = document;
            
        if (dom === doc || dom === doc.body) {
            return this.getScroll().top;
        } else {
            return dom.scrollTop;
        }
    },
    
    /**
     * Sets the left scroll position
     * @param {Number} left The left scroll position
     * @return {Ext.dom.Element} this
     */
    setScrollLeft: function(left){
        this.dom.scrollLeft = left;
        return this;
    },
    
    /**
     * Sets the top scroll position
     * @param {Number} top The top scroll position
     * @return {Ext.dom.Element} this
     */
    setScrollTop: function(top) {
        this.dom.scrollTop = top;
        return this;
    },

    /**
     * Scrolls this element by the passed delta values, optionally animating.
     * 
     * All of the following are equivalent:
     *
     *      el.scrollBy(10, 10, true);
     *      el.scrollBy([10, 10], true);
     *      el.scrollBy({ x: 10, y: 10 }, true);
     * 
     * @param {Number/Number[]/Object} deltaX Either the x delta, an Array specifying x and y deltas or
     * an object with "x" and "y" properties.
     * @param {Number/Boolean/Object} deltaY Either the y delta, or an animate flag or config object.
     * @param {Boolean/Object} animate Animate flag/config object if the delta values were passed separately.
     * @return {Ext.Element} this
     */
    scrollBy: function(deltaX, deltaY, animate) {
        var me = this,
            dom = me.dom;

        // Extract args if deltas were passed as an Array.
        if (deltaX.length) {
            animate = deltaY;
            deltaY = deltaX[1];
            deltaX = deltaX[0];
        } else if (typeof deltaX != 'number') { // or an object
            animate = deltaY;
            deltaY = deltaX.y;
            deltaX = deltaX.x;
        }

        if (deltaX) {
            me.scrollTo('left', me.constrainScrollLeft(dom.scrollLeft + deltaX), animate);
        }
        if (deltaY) {
            me.scrollTo('top', me.constrainScrollTop(dom.scrollTop + deltaY), animate);
        }

        return me;
    },

    /**
     * Scrolls this element the specified scroll point. It does NOT do bounds checking so
     * if you scroll to a weird value it will try to do it. For auto bounds checking, use #scroll.
     * @param {String} side Either "left" for scrollLeft values or "top" for scrollTop values.
     * @param {Number} value The new scroll value
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * animation config object
     * @return {Ext.Element} this
     */
    scrollTo: function(side, value, animate) {
        //check if we're scrolling top or left
        var top = /top/i.test(side),
            me = this,
            prop = top ? 'scrollTop' : 'scrollLeft',
            dom = me.dom,
            animCfg;

        if (!animate || !me.anim) {
            // just setting the value, so grab the direction
            dom[prop] = value;
            // corrects IE, other browsers will ignore
            dom[prop] = value;
        }
        else {
            animCfg = {
                to: {}
            };
            animCfg.to[prop] = value;
            if (Ext.isObject(animate)) {
                Ext.applyIf(animCfg, animate);
            }
            me.animate(animCfg);
        }
        return me;
    },

    /**
     * Scrolls this element into view within the passed container.
     * @param {String/HTMLElement/Ext.Element} [container=document.body] The container element
     * to scroll.  Should be a string (id), dom node, or Ext.Element.
     * @param {Boolean} [hscroll=true] False to disable horizontal scroll.
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * @param {Boolean} [highlight=false] true to {@link #highlight} the element when it is in view.
     * animation config object
     * @return {Ext.dom.Element} this
     */
    scrollIntoView: function(container, hscroll, animate, highlight) {
        var me = this,
            dom = me.dom,
            offsets = me.getOffsetsTo(container = Ext.getDom(container) || Ext.getBody().dom),
        // el's box
            left = offsets[0] + container.scrollLeft,
            top = offsets[1] + container.scrollTop,
            bottom = top + dom.offsetHeight,
            right = left + dom.offsetWidth,
        // ct's box
            ctClientHeight = container.clientHeight,
            ctScrollTop = parseInt(container.scrollTop, 10),
            ctScrollLeft = parseInt(container.scrollLeft, 10),
            ctBottom = ctScrollTop + ctClientHeight,
            ctRight = ctScrollLeft + container.clientWidth,
            newPos;

        // Highlight upon end of scroll
        if (highlight) {
            if (animate) {
                animate = Ext.apply({
                    listeners: {
                        afteranimate: function() {
                            me.scrollChildFly.attach(dom).highlight();
                        }
                    }
                }, animate);
            } else {
                me.scrollChildFly.attach(dom).highlight();
            }
        }

        if (dom.offsetHeight > ctClientHeight || top < ctScrollTop) {
            newPos = top;
        } else if (bottom > ctBottom) {
            newPos = bottom - ctClientHeight;
        }
        if (newPos != null) {
            me.scrollChildFly.attach(container).scrollTo('top', newPos, animate);
        }

        if (hscroll !== false) {
            newPos = null;
            if (dom.offsetWidth > container.clientWidth || left < ctScrollLeft) {
                newPos = left;
            } else if (right > ctRight) {
                newPos = right - container.clientWidth;
            }
            if (newPos != null) {
                me.scrollChildFly.attach(container).scrollTo('left', newPos, animate);
            }
        }
        return me;
    },

    // @private
    scrollChildIntoView: function(child, hscroll) {
        this.scrollChildFly.attach(Ext.getDom(child)).scrollIntoView(this, hscroll);
    },

    /**
     * Scrolls this element the specified direction. Does bounds checking to make sure the scroll is
     * within this element's scrollable range.
     * @param {String} direction Possible values are:
     *
     * - `"l"` (or `"left"`)
     * - `"r"` (or `"right"`)
     * - `"t"` (or `"top"`, or `"up"`)
     * - `"b"` (or `"bottom"`, or `"down"`)
     *
     * @param {Number} distance How far to scroll the element in pixels
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * animation config object
     * @return {Boolean} Returns true if a scroll was triggered or false if the element
     * was scrolled as far as it could go.
     */
    scroll: function(direction, distance, animate) {
        if (!this.isScrollable()) {
            return false;
        }
        var me = this,
            dom = me.dom,
            side = direction === 'r' || direction === 'l' ? 'left' : 'top',
            scrolled = false,
            currentScroll, constrainedScroll;

        if (direction === 'r') {
            distance = -distance;
        }

        if (side === 'left') {
            currentScroll = dom.scrollLeft;
            constrainedScroll = me.constrainScrollLeft(currentScroll + distance);
        } else {
            currentScroll = dom.scrollTop;
            constrainedScroll = me.constrainScrollTop(currentScroll + distance);
        }

        if (constrainedScroll !== currentScroll) {
            this.scrollTo(side, constrainedScroll, animate);
            scrolled = true;
        }

        return scrolled;
    },

    constrainScrollLeft: function(left) {
        var dom = this.dom;
        return Math.max(Math.min(left, dom.scrollWidth - dom.clientWidth), 0);
    },

    constrainScrollTop: function(top) {
        var dom = this.dom;
        return Math.max(Math.min(top, dom.scrollHeight - dom.clientHeight), 0);
    }
}, function() {
    this.prototype.scrollChildFly = new this.Fly();
    this.prototype.scrolltoFly = new this.Fly();
});
