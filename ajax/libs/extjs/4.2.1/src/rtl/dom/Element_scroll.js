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
Ext.define('Ext.rtl.dom.Element_scroll', {
    override: 'Ext.dom.Element',

    rtlGetScroll: function() {
        var me = this,
            dom = me.dom,
            doc = document,
            body = doc.body,
            scroll = me.getScroll(),
            // The left value returned from getScroll() may be a negative number.  In rtl
            // mode left should always be reported as a positive number of pixels from the
            // right, so use the absolute value of left.
            left = Math.abs(scroll.left),
            isDocOrBody = (dom === doc || dom === body);

        if (isDocOrBody ? (3 & me._rtlDocScrollFlag) : (me._rtlScrollFlag === 1)) {
            // If the browser reports scrollLeft as the number of pixels from left
            // (same as ltr) we need to convert it to a rtl position by subtracting it
            // from scrollWidth
            if (isDocOrBody) {
                dom = body;
            }
            
            left = dom.scrollWidth - left -
                (isDocOrBody ? Ext.Element.getViewportWidth() : dom.clientWidth);
        }
        scroll.left = left;

        return scroll;
    },
    
    rtlGetScrollLeft: function() {
        return this.rtlGetScroll().left;
    },
    
    rtlSetScrollLeft: function(left){
        var me = this;

        me.dom.scrollLeft = me.rtlNormalizeScrollLeft(left);
        return me;
    },

    rtlScrollTo: function(side, value, animate) {
        if (side === 'left') {
            value = this.rtlNormalizeScrollLeft(value);
        }

        return this.scrollTo(side, value, animate);
    },

    rtlScrollBy: function(deltaX, deltaY, animate) {
        var me = this,
            dom = me.dom,
            left, maxScroll;

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
            left = me.rtlNormalizeScrollLeft(
                me.constrainScrollLeft(me.rtlGetScrollLeft() + deltaX)
            ); 
 
            me.scrollTo('left', left, animate);
        }
        if (deltaY) {
            me.scrollTo('top', me.constrainScrollTop(dom.scrollTop + deltaY), animate);
        }

        return me;
    },

    rtlScroll: function(direction, distance, animate) {
        if (!this.isScrollable()) {
            return false;
        }
        var me = this,
            side = direction === 'r' || direction === 'l' ? 'left' : 'top',
            scrolled = false,
            currentScroll, constrainedScroll;

        if (direction === 'r') {
            distance = -distance;
        }

        if (side === 'left') {
            currentScroll = me.rtlGetScrollLeft();
            constrainedScroll = me.constrainScrollLeft(currentScroll + distance);
        } else {
            currentScroll = me.dom.scrollTop;
            constrainedScroll = me.constrainScrollTop(currentScroll + distance);
        }

        if (constrainedScroll !== currentScroll) {
            this.rtlScrollTo(side, constrainedScroll, animate);
            scrolled = true;
        }

        return scrolled;
    },

    rtlNormalizeScrollLeft: function(left){
        var dom = this.dom,
            flag = this._rtlScrollFlag;
            
        if (flag === 0) {
            left = -left;
        } else if (flag === 1) {
            left = dom.scrollWidth - left - dom.clientWidth;
        }
        return left;
    }
    
}, function() {
    var Element = this;

    /*
     * Sets a _rtlScrollFlag property on the Element class prototype indicating how the
     * browser reports scrollLeft on overflowing rtl elements.  This method cannot be used
     * reliably on the documentElement or document.body because the behavior of these
     * elements can be different from other elements in some browsers.
     * 
     * 0: offset from right (negative number) - firefox
     * 1: offset from left (positive number) - IE6, IE7, IE6 - IE9 quirks, and Webkit
     * 2: offset from right (positive number) - IE8 - IE10 & IE10 quirks
     */
    function cacheRtlScrollFlag() {
        var el = Ext.getBody().createChild({
            tag: 'div',
            style: 'direction:rtl;position:absolute;overflow:auto;height:100px;width:100px;',
            children: [{
                tag: 'div',
                style: 'height:30px;width:150px;'
            }]
        }),
        dom = el.dom,
        flag = 2;

        if (dom.scrollLeft === 50) {
            flag = 1;
        } else {
            dom.scrollLeft = -1;
            if (dom.scrollLeft) {
                flag = 0;
            }
        }

        el.remove();
        Element.prototype._rtlScrollFlag = flag;
    }

    /*
     * scrollLeft on the document/body is reported differently from ordinary
     * overflowing elements in many browsers (see getRtlScrollFlag).There are 2
     * separate things we have to detect:
     * 1. The element that overflows - when the document overflows some browsers
     * set scrollLeft on the document body (webkit and IE quirks), while other
     * browsers set scrollLeft on the documentElement (all other supported browsers
     * at the time of this writing).
     * 2. The scrollLeft of the overflowing document/body can be one of the
     * following:
     *    a. number of pixels offset from right expressed as a negative number
     *       (Webkit, Firefox)
     *    b. number of pixels offset from right expressed as a positive number
     *       (IE8 - IE10 strict mode, and IE10 quirks mode.
     *    c. number of pixels offset from left expressed as a positive number
     *       (IE6 - IE9 quirks mode, and IE6/IE7 strict mode.
     *
     * The following logic feture detects the handling of scrollLeft and sets the 
     * _rtlDocScrollFlag property on this class' prototype as a bit flag which has 
     * the following values:
     * 
     * 0 - docEl, negative right
     * 1 - docEl, positive left
     * 2 - docEl, positive right
     * 4 - body, negative right
     * 5 - body, positive left
     */
    function cacheRtlDocScrollFlag() {
        var doc = document,
            docEl = doc.documentElement,
            body = doc.body,
            // flag defaults to body, negative right (webkit) so no detection needed
            // is needed for this scenario
            flag = 4,
            bodyStyle = body.style,
            // save the direction property so we can set it back when we are done.
            direction = bodyStyle.direction,
            el = Ext.getBody().createChild(
                '<div style="height:20000px;width:20000px;"></div>'
            ), 
            dom = el.dom,
            ltrRight, rtlRight

        bodyStyle.direction = 'ltr';
        ltrRight = dom.getBoundingClientRect().right;

        bodyStyle.direction = 'rtl';
        rtlRight = dom.getBoundingClientRect().right;
        
        // when the body has vertical overflow some browser continue to show the
        // vertical scrollbar on the right side of the page even in rtl mode.
        Element.prototype._rtlBodyScrollbarOnRight = (ltrRight === rtlRight);

        // First, check if scrollLeft is a non-zero value on the documentElement or
        // body. This means scrollLeft is a positive number offset from the left.
        if (docEl.scrollLeft > 0) {
            // IE6/7 strict
            flag = 1;
        } else if (body.scrollLeft > 0) {
            // IE6 - IE9 quirks
            flag = 5;
        } else {
            // The next step is to attempt to set scrollLeft values, This allows us to
            // test for non-zero values to see if the value was valid (scrollLeft
            // resets to 0 when a non-valid value is set).
            // attempt to set the documentElement's scrollLeft to a negative number
            docEl.scrollLeft = -1;
            if (docEl.scrollLeft) {
                // it worked! we were able to set a negative scroll left on the
                // documentElement (firefox)
                flag = 0;
            } else {
                // attempt to set the documentElement's scrollLeft to a positive number
                docEl.scrollLeft = 1;
                if (docEl.scrollLeft) {
                    // success setting scroll left to a positive number on
                    // documentElement (IE8 strict, IE9 strict, and IE10 quirks)
                    flag = 2;
                }
            }
        }

        el.remove();
        if (!direction) {
            // if direction is an empty string, we set it back to "ltr", because once
            // the direction style on the body element is changed to "rtl" in webkit,
            // it becomes permanent, even after it is set back to "", unless it is first
            // explicitly set back to "ltr"
            bodyStyle.direction = 'ltr';
            // read the scroll width before setting the direction back to "".
            // This forces webkit to update its computed direction style to ltr
            body.scrollWidth;
        }
        // set direction back to its original value
        bodyStyle.direction = direction;
        Element.prototype._rtlDocScrollFlag = flag;
    }

    Ext.on({
        ready: function() {
            // This function attaches to onReady with a priority of 1000 so that we can
            // detect how the browser reports scrollLeft by manipulating the document/body
            // before any components have been rendered to the page.  
            cacheRtlDocScrollFlag();
            cacheRtlScrollFlag();
        },
        single: true,
        priority: 1001
    });
});
