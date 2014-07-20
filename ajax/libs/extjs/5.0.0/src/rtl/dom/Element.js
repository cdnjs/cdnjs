Ext.define('Ext.rtl.dom.Element', {
    override: 'Ext.dom.Element',

    requires: [
        "Ext.CompositeElementLite"
    ],
    
    rtlXAnchors: {
        l: 'r',
        r: 'l'
    },

    _positionTopRight: ['position', 'top', 'right'],

    pxRe: /^\d+(?:\.\d*)?px$/i,
   
    statics: { 
        rtlParseBox: function(box){
            var box = Ext.Element.parseBox(box),
                temp;
               
            temp = box.left;
            box.left = box.right;
            box.right = temp;
            
            return box;
        },

        rtlUnitizeBox: function(box, units){
            var Element = Ext.Element,
                a = Element.addUnits,
                b = Element.parseBox(box);

            // Usual order is trbl, so reverse it
            // to return tlbr
            return a(b.top, units) + ' ' +
                   a(b.left, units) + ' ' +
                   a(b.bottom, units) + ' ' +
                   a(b.right, units);
        }
    },

    anchorAnimX: function(anchor) {
        if (Ext.rootInheritedState.rtl) {
            anchor = this.rtlXAnchors[anchor];
        }
        this.callParent(arguments);
    },

    getPositioning: function(autoPx){
        var xStyle = Ext.rootInheritedState.rtl ? 'right' : 'left',
            styles = this.getStyle([xStyle, 'top', 'position', 'z-index']),
            dom = this.dom;

        if(autoPx) {
            if(styles[xStyle] === 'auto') {
                styles[xStyle] = (xStyle === 'left') ? (dom.offsetLeft + 'px') :
                    (dom.offsetParent.offsetWidth - dom.offsetLeft - dom.offsetWidth);
            }
            if(styles.top === 'auto') {
                styles.top = dom.offsetTop + 'px';
            }
        }

        return styles;
    },

   getXY: function() {
        var doc = document,
            round = Math.round,
            dom = this.dom,
            x = 0,
            y = 0,
            box, scroll;

        if(dom !== doc && dom !== doc.body){
            // IE (including IE10) throws an error when getBoundingClientRect
            // is called on an element not attached to dom
            try {
                box = dom.getBoundingClientRect();
            } catch (ex) {
                box = { left: 0, top: 0 };
            }

            doc = Ext.fly(doc, '_internal');
            if (Ext.rootInheritedState.rtl) {
                scroll = doc.rtlGetScroll();
                x = Ext.Element.getViewportWidth() - box.right + scroll.left;
            } else {
                scroll = doc.getScroll();
                x = box.left + scroll.left;
            }
            x = round(x);
            y = round(box.top + scroll.top);
        }
        return [x, y];
    },

    rtlGetLocalX: function() {
        var me = this,
            offsetParent = me.dom.offsetParent,
            x = me.getStyle('right');

        if (!x || x === 'auto') {
            x = 0;
        } else if (me.pxRe.test(x)) {
            x = parseFloat(x);
        } else {
            x = me.getX();
            if (offsetParent) {
                x -= Ext.fly(offsetParent, '_internal').getX();
            }
        }

        return x;
    },

    rtlGetLocalXY: function() {
        var me = this,
            offsetParent = me.dom.offsetParent,
            style = me.getStyle(['right', 'top']),
            x = style.right,
            y = style.top;

        if (!x || x === 'auto') {
            x = 0;
        } else if (me.pxRe.test(x)) {
            x = parseFloat(x);
        } else {
            x = me.getX();
            if (offsetParent) {
                x -= Ext.fly(offsetParent, '_internal').getX();
            }
        }

        if (!y || y === 'auto') {
            y = 0;
        } else if (me.pxRe.test(y)) {
            y = parseFloat(y);
        } else {
            y = me.getY();
            if (offsetParent) {
                y -= Ext.fly(offsetParent, '_internal').getY();
            }
        }

        return [x, y];
    },

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

    rtlNormalizeScrollLeft: function(left){
        var dom = this.dom,
            flag = this._rtlScrollFlag;
            
        if (flag === 0) {
            left = -left;
        } else if (flag === 1) {
            left = dom.scrollWidth - left - dom.clientWidth;
        }
        return left;
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
        } else if (typeof deltaX !== 'number') { // or an object
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

    rtlScrollIntoView: function(container, hscroll, animate, highlight) {
        container = Ext.getDom(container) || Ext.getBody().dom;

        return this.doScrollIntoView(
            container,
            hscroll,
            animate,
            highlight,
            'rtlGetScrollLeft',
            'rtlScrollTo'
        );
    },

    rtlScrollTo: function(side, value, animate) {
        if (side === 'left') {
            value = this.rtlNormalizeScrollLeft(value);
        }

        return this.scrollTo(side, value, animate);
    },

    rtlSetLocalX: function(x) {
        var style = this.dom.style;

        // clear left style just in case it was previously set by setXY/setLocalXY
        style.left = 'auto';
        style.right = (x === null) ? 'auto' : x + 'px';
    },

    rtlSetLocalXY: function(x, y) {
        var style = this.dom.style;

        // clear left style just in case it was previously set by setXY/setLocalXY
        style.left = 'auto';

        if (x && x.length) {
            y = x[1];
            x = x[0];
        }

        if (x === null) {
            style.right = 'auto';
        } else if (x !== undefined) {
            style.right = x + 'px';
        }

        if (y === null) {
            style.top = 'auto';
        } else if (y !== undefined) {
            style.top = y + 'px';
        }
    },

    rtlSetScrollLeft: function(left){
        var me = this;

        me.dom.scrollLeft = me.rtlNormalizeScrollLeft(left);
        return me;
    },

    rtlTranslatePoints: function(x, y) {
        var pos = this.rtlTranslateXY(x, y);

        return {
            right: pos.x,
            top: pos.y
        };
    },

    rtlTranslateXY: function(x, y) {
        var me = this,
            styles = me.getStyle(me._positionTopRight),
            relative = (styles.position === 'relative'),
            right = parseFloat(styles.right),
            top = parseFloat(styles.top),
            xy = me.getXY(),
            dom = me.dom,
            doc, body, offsetParentWidth, offsetParent;

        if (x && x.length) {
             y = x[1];
             x = x[0];
        }
        if (isNaN(right)) {
            doc = document;
            body = doc.body;
            if (dom === body) {
                // translateXY can sometimes be called on the body element.
                // e.g. in Renderable#afterFirstLayout if the "container" is a viewport
                right = 0;
            } else {
                offsetParent = dom.offsetParent;
                offsetParentWidth = (offsetParent &&
                    offsetParent !== body && offsetParent !== doc.documentElement) ?
                        offsetParent.scrollWidth : Ext.Element.getViewportWidth();
                right = offsetParentWidth - dom.offsetLeft - me.getWidth();
            }
        }
        if (isNaN(top)) {
            top = relative ? 0 : me.dom.offsetTop;
        }
        right = (typeof x === 'number') ? x - xy[0] + right : undefined;
        top = (typeof y === 'number') ? y - xy[1] + top : undefined;
        return {
            x: right,
            y: top
        };
    },

    translatePoints: function(x, y) {
        return Ext.rootInheritedState.rtl ? this.rtlTranslatePoints(x, y) :
            this.callParent(arguments);
    },

    translateXY: function(x, y) {
        return Ext.rootInheritedState.rtl ? this.rtlTranslateXY(x, y) :
            this.callParent(arguments);
    },

    wrap: function() {
        var parent = this.parent(),
            rtlCls = Ext.baseCSSPrefix + 'rtl',
            ltrCls = Ext.baseCSSPrefix + 'ltr',
            wrapEl = this.callParent(arguments),
            cls;

        // if the parentNode of the element being wrapped has the "x-rtl" or "x-ltr" css
        // class, then add that class to the wrapper as well.  This ensures that descendant
        // and child selectors still apply e.g. ".x-rtl > .x-foo" or ".x-ltr .x-foo"
        if (parent.hasCls(rtlCls)) {
            cls = rtlCls;
        } else if (parent.hasCls(ltrCls)) {
            cls = ltrCls;
        }

        if (cls) {
            // superclass method may return dom, so use fly() to access the wrap el
            Ext.fly(wrapEl, '_internal').addCls(cls);
        }

        return wrapEl;
    }

}, function() {
    var Element = this;

    // ensure that any methods added by this override are also added to Ext.CompositeElementLite
    Ext.CompositeElementLite.importElementMethods();

    /*
     * Sets a _rtlScrollFlag property on the Element class prototype indicating how the
     * browser reports scrollLeft on overflowing rtl elements.  This method cannot be used
     * reliably on the documentElement or document.body because the behavior of these
     * elements can be different from other elements in some browsers.
     * 
     * 0: offset from right (negative number) - firefox
     * 1: offset from left (positive number) - Webkit
     * 2: offset from right (positive number) - IE8 - IE10
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

        el.destroy();
        Element.prototype._rtlScrollFlag = flag;
    }

    /*
     * scrollLeft on the document/body is reported differently from ordinary
     * overflowing elements in many browsers (see getRtlScrollFlag).There are 2
     * separate things we have to detect:
     * 1. The element that overflows - when the document overflows some browsers
     * set scrollLeft on the document body (webkit), while other browsers set scrollLeft
     * on the documentElement (all other supported browsers at the time of this writing).
     * 2. The scrollLeft of the overflowing document/body can be one of the
     * following:
     *    a. number of pixels offset from right expressed as a negative number
     *       (Webkit, Firefox)
     *    b. number of pixels offset from right expressed as a positive number
     *       (IE8 - IE10)
     *
     * The following logic feture detects the handling of scrollLeft and sets the 
     * _rtlDocScrollFlag property on this class' prototype as a bit flag which has 
     * the following values:
     * 
     * 0 - docEl, negative right
     * 1 - docEl, positive left
     * 2 - docEl, positive right
     * 4 - body, negative right
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
            ltrRight, rtlRight;

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
            flag = 1;
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
                    // documentElement (IE8 & IE9)
                    flag = 2;
                }
            }
        }

        el.destroy();
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

    Ext.onReady(function () {
        // This function attaches to onReady with a priority of 1000 so that we can
        // detect how the browser reports scrollLeft by manipulating the document/body
        // before any components have been rendered to the page.  
        cacheRtlDocScrollFlag();
        cacheRtlScrollFlag();
    });
});
