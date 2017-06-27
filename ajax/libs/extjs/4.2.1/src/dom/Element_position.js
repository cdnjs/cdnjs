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
Ext.define('Ext.dom.Element_position', {
    override: 'Ext.dom.Element'
},
function() {

var flyInstance,
    Element = this,
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
    POSITION = "position",
    STATIC = "static",
    RELATIVE = "relative",
    ZINDEX = "z-index",
    BODY = 'BODY',

    PADDING = 'padding',
    BORDER = 'border',
    SLEFT = '-left',
    SRIGHT = '-right',
    STOP = '-top',
    SBOTTOM = '-bottom',
    SWIDTH = '-width',
    // special markup used throughout Ext when box wrapping elements
    borders = {l: BORDER + SLEFT + SWIDTH, r: BORDER + SRIGHT + SWIDTH, t: BORDER + STOP + SWIDTH, b: BORDER + SBOTTOM + SWIDTH},
    paddings = {l: PADDING + SLEFT, r: PADDING + SRIGHT, t: PADDING + STOP, b: PADDING + SBOTTOM},
    paddingsTLRB = [paddings.l, paddings.r, paddings.t, paddings.b],
    bordersTLRB = [borders.l,  borders.r,  borders.t,  borders.b],
    round = Math.round,
    doc = document,
    fly = function (el) {
        if (!flyInstance) {
            flyInstance = new Ext.Element.Fly();
        }
        flyInstance.attach(el);
        return flyInstance;
    };

    Element.override({

        pxRe: /^\d+(?:\.\d*)?px$/i,

        inheritableStatics: {
            getX: function(el) {
                return Element.getXY(el)[0];
            },

            getXY: function(el) {
                var bd = doc.body,
                    docEl = doc.documentElement,
                    leftBorder = 0,
                    topBorder = 0,
                    ret = [0,0],
                    box,
                    scroll;

                el = Ext.getDom(el);

                if(el != doc && el != bd){
                    // IE has the potential to throw when getBoundingClientRect
                    // is called on an element not attached to dom
                    if (Ext.isIE) {
                        try {
                            box = el.getBoundingClientRect();
                            // In some versions of IE, the documentElement (HTML element)
                            // will have a 2px border that gets included, so subtract it off
                            topBorder = docEl.clientTop || bd.clientTop;
                            leftBorder = docEl.clientLeft || bd.clientLeft;
                        } catch (ex) {
                            box = { left: 0, top: 0 };
                        }
                    } else {
                        box = el.getBoundingClientRect();
                    }

                    scroll = fly(doc).getScroll();
                    ret = [
                        round(box.left + scroll.left - leftBorder),
                        round(box.top + scroll.top - topBorder)
                    ];
                }
                return ret;
            },

            getY: function(el) {
                return Element.getXY(el)[1];
            },

            setX: function(el, x) {
                Element.setXY(el, [x, false]);
            },

            setXY: function(el, xy) {
                (el = Ext.fly(el, '_setXY')).position();

                var pts = el.translatePoints(xy),
                    style = el.dom.style,
                    pos;

                // right position may have been previously set by rtlSetXY or
                // rtlSetLocalXY so clear it here just in case.
                style.right = 'auto';
                for (pos in pts) {
                    if (!isNaN(pts[pos])) {
                        style[pos] = pts[pos] + "px";
                    }
                }
            },

            setY: function(el, y) {
                Element.setXY(el, [false, y]);
            }
        },

        /**
         * Centers the Element in either the viewport, or another Element.
         * @param {String/HTMLElement/Ext.dom.Element} centerIn element in
         * which to center the element.
         */
        center: function(centerIn){
            return this.alignTo(centerIn || doc, 'c-c');
        },

        /**
         * Clears positioning back to the default when the document was loaded.
         * @param {String} [value=''] The value to use for the left, right, top, bottom.
         * You could use 'auto'.
         * @return {Ext.dom.Element} this
         */
        clearPositioning: function(value) {
            value = value || '';
            return this.setStyle({
                left : value,
                right : value,
                top : value,
                bottom : value,
                'z-index' : '',
                position : STATIC
            });
        },

        getAnchorToXY: function(el, anchor, local, mySize) {
            return el.getAnchorXY(anchor, local, mySize);
        },

        /**
         * Gets the bottom Y coordinate of the element (element Y position + element height)
         * @param {Boolean} local True to get the local css position instead of page
         * coordinate
         * @return {Number}
         * @deprecated
         */
        getBottom: function(local) {
            return (local ? this.getLocalY() : this.getY()) + this.getHeight();
        },

        getBorderPadding: function() {
            var paddingWidth = this.getStyle(paddingsTLRB),
                bordersWidth = this.getStyle(bordersTLRB);

            return {
                beforeX: (parseFloat(bordersWidth[borders.l]) || 0) + (parseFloat(paddingWidth[paddings.l]) || 0),
                afterX: (parseFloat(bordersWidth[borders.r]) || 0) + (parseFloat(paddingWidth[paddings.r]) || 0),
                beforeY: (parseFloat(bordersWidth[borders.t]) || 0) + (parseFloat(paddingWidth[paddings.t]) || 0),
                afterY: (parseFloat(bordersWidth[borders.b]) || 0) + (parseFloat(paddingWidth[paddings.b]) || 0)
            };
        },

        /**
         * Calculates the x, y to center this element on the screen
         * @return {Number[]} The x, y values [x, y]
         * @deprecated
         */
        getCenterXY: function(){
            return this.getAlignToXY(doc, 'c-c');
        },

        /**
         * Gets the left X coordinate
         * @param {Boolean} local True to get the local css position instead of
         * page coordinate
         * @return {Number}
         * @deprecated Use {@link #getX} or {@link #getLocalX}
         */
        getLeft: function(local) {
            return local ? this.getLocalX() : this.getX();
        },

        /**
         * Gets the local CSS X position for the element
         *
         * @return {Number}
         */
        getLocalX: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                x = me.getStyle('left');

            if (!x || x === 'auto') {
                x = 0;
            } else if (me.pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();
                if (offsetParent) {
                    x -= Element.getX(offsetParent);
                }
            }

            return x;
        },

        /**
         * Gets the local CSS X and Y position for the element
         *
         * @return {Array} [x, y]
         */
        getLocalXY: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                style = me.getStyle(['left', 'top']),
                x = style.left,
                y = style.top;

            if (!x || x === 'auto') {
                x = 0;
            } else if (me.pxRe.test(x)) {
                x = parseFloat(x);
            } else {
                x = me.getX();
                if (offsetParent) {
                    x -= Element.getX(offsetParent);
                }
            }

            if (!y || y === 'auto') {
                y = 0;
            } else if (me.pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();
                if (offsetParent) {
                    y -= Element.getY(offsetParent);
                }
            }

            return [x, y];
        },

        /**
         * Gets the local CSS Y position for the element
         *
         * @return {Number}
         */
        getLocalY: function() {
            var me = this,
                offsetParent = me.dom.offsetParent,
                y = me.getStyle('top');

            if (!y || y === 'auto') {
                y = 0;
            } else if (me.pxRe.test(y)) {
                y = parseFloat(y);
            } else {
                y = me.getY();
                if (offsetParent) {
                    y -= Element.getY(offsetParent);
                }
            }

            return y;
        },

        /**
         * Returns an object defining the area of this Element which can be passed to
         * {@link Ext.util.Positionable#setBox} to set another Element's size/location to match this element.
         *
         * @param {Boolean} [asRegion] If true an Ext.util.Region will be returned
         * @return {Object/Ext.util.Region} box An object in the following format:
         *
         *     {
         *         left: <Element's X position>,
         *         top: <Element's Y position>,
         *         width: <Element's width>,
         *         height: <Element's height>,
         *         bottom: <Element's lower bound>,
         *         right: <Element's rightmost bound>
         *     }
         *
         * The returned object may also be addressed as an Array where index 0 contains
         * the X position and index 1 contains the Y position. So the result may also be
         * used for {@link #setXY}
         * @deprecated use {@link Ext.util.Positionable#getBox} to get a box object, and
         * {@link Ext.util.Positionable#getRegion} to get a {@link Ext.util.Region Region}.
         */
        getPageBox: function(getRegion) {
            var me = this,
                dom = me.dom,
                isDoc = dom.nodeName == BODY,
                w = isDoc ? Ext.Element.getViewWidth() : dom.offsetWidth,
                h = isDoc ? Ext.Element.getViewHeight() : dom.offsetHeight,
                xy = me.getXY(),
                t = xy[1],
                r = xy[0] + w,
                b = xy[1] + h,
                l = xy[0];

            if (getRegion) {
                return new Ext.util.Region(t, r, b, l);
            }
            else {
                return {
                    left: l,
                    top: t,
                    width: w,
                    height: h,
                    right: r,
                    bottom: b
                };
            }
        },

        /**
         * Gets an object with all CSS positioning properties. Useful along with
         * #setPostioning to get snapshot before performing an update and then restoring
         * the element.
         * @param {Boolean} [autoPx=false] true to return pixel values for "auto" styles.
         * @return {Object}
         */
        getPositioning: function(autoPx){
            var styles = this.getStyle(['left', 'top', 'position', 'z-index']),
                dom = this.dom;

            if(autoPx) {
                if(styles.left === 'auto') {
                    styles.left = dom.offsetLeft + 'px';
                }
                if(styles.top === 'auto') {
                    styles.top = dom.offsetTop + 'px';
                }
            }

            return styles;
        },

        /**
         * Gets the right X coordinate of the element (element X position + element width)
         * @param {Boolean} local True to get the local css position instead of page
         * coordinates
         * @return {Number}
         * @deprecated
         */
        getRight: function(local) {
            return (local ? this.getLocalX() : this.getX()) + this.getWidth();
        },

        /**
         * Gets the top Y coordinate
         * @param {Boolean} local True to get the local css position instead of page
         * coordinates
         * @return {Number}
         * @deprecated Use {@link #getY} or {@link #getLocalY}
         */
        getTop: function(local) {
            return local ? this.getLocalY() : this.getY();
        },

        /**
         * Gets element X position in page coordinates
         *
         * @return {Number}
         */
        getX: function() {
            return Element.getX(this.dom);
        },

        /**
         * Gets element X and Y positions in page coordinates
         *
         * @return {Array} [x, y]
         */
        getXY: function() {
            return Element.getXY(this.dom);
        },

        /**
         * Gets element Y position in page coordinates
         *
         * @return {Number}
         */
        getY: function() {
            return Element.getY(this.dom);
        },

        /**
         * Sets the position of the element in page coordinates.
         * @param {Number} x X value for new position (coordinates are page-based)
         * @param {Number} y Y value for new position (coordinates are page-based)
         * @param {Boolean/Object} [animate] True for the default animation, or a standard
         * Element animation config object
         * @return {Ext.dom.Element} this
         * @deprecated Use {@link #setXY} instead.
         */
        moveTo: function(x, y, animate) {
            return this.setXY([x, y], animate);
        },

        /**
         * Initializes positioning on this element. If a desired position is not passed,
         * it will make the the element positioned relative IF it is not already positioned.
         * @param {String} [pos] Positioning to use "relative", "absolute" or "fixed"
         * @param {Number} [zIndex] The zIndex to apply
         * @param {Number} [x] Set the page X position
         * @param {Number} [y] Set the page Y position
         */
        position: function(pos, zIndex, x, y) {
            var me = this;

            if (!pos && me.isStyle(POSITION, STATIC)) {
                me.setStyle(POSITION, RELATIVE);
            } else if (pos) {
                me.setStyle(POSITION, pos);
            }
            if (zIndex) {
                me.setStyle(ZINDEX, zIndex);
            }
            if (x || y) {
                me.setXY([x || false, y || false]);
            }
        },

        /**
         * Sets the element's CSS bottom style.
         * @param {Number/String} bottom Number of pixels or CSS string value to set as
         * the bottom CSS property value
         * @return {Ext.dom.Element} this
         * @deprecated
         */
        setBottom: function(bottom) {
            this.dom.style[BOTTOM] = this.addUnits(bottom);
            return this;
        },

        /**
         * Sets the element's position and size in one shot. If animation is true then
         * width, height, x and y will be animated concurrently.
         *
         * @param {Number} x X value for new position (coordinates are page-based)
         * @param {Number} y Y value for new position (coordinates are page-based)
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in this Element's
         * {@link #defaultUnit}s (by default, pixels)
         * - A String used to set the CSS width style. Animation may **not** be used.
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in this Element's
         * {@link #defaultUnit}s (by default, pixels)
         * - A String used to set the CSS height style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or
         * a standard Element animation config object
         *
         * @return {Ext.dom.Element} this
         * @deprecated Use {@link Ext.util.Positionable#setBox} instead.
         */
        setBounds: function(x, y, width, height, animate) {
            return this.setBox({
                x: x,
                y: y,
                width: width,
                height: height
            }, animate);
        },

        /**
         * Sets the element's left position directly using CSS style
         * (instead of {@link #setX}).
         * @param {Number/String} left Number of pixels or CSS string value to
         * set as the left CSS property value
         * @return {Ext.dom.Element} this
         * @deprecated
         */
        setLeft: function(left) {
            this.dom.style[LEFT] = this.addUnits(left); 
            return this;
        },

        /**
         * Sets the element's left and top positions directly using CSS style
         * @param {Number/String} left Number of pixels or CSS string value to
         * set as the left CSS property value
         * @param {Number/String} top Number of pixels or CSS string value to
         * set as the top CSS property value
         * @return {Ext.dom.Element} this
         * @deprecated
         */
        setLeftTop: function(left, top) {
            var me = this,
                style = me.dom.style;

            style.left = me.addUnits(left);
            style.top = me.addUnits(top);

            return me;
        },

        setLocalX: function(x) {
            var style = this.dom.style;

            // clear right style just in case it was previously set by rtlSetXY/rtlSetLocalXY
            style.right = 'auto';
            style.left = (x === null) ? 'auto' : x + 'px';
        },

        setLocalXY: function(x, y) {
            var style = this.dom.style;

            // clear right style just in case it was previously set by rtlSetXY/rtlSetLocalXY
            style.right = 'auto';

            if (x && x.length) {
                y = x[1];
                x = x[0];
            }

            if (x === null) {
                style.left = 'auto';
            } else if (x !== undefined) {
                style.left = x + 'px';
            }

            if (y === null) {
                style.top = 'auto';
            } else if (y !== undefined) {
                style.top = y + 'px';
            }
        },

        setLocalY: function(y) {
            this.dom.style.top = (y === null) ? 'auto' : y + 'px';
        },

        /**
         * Sets the position of the element in page coordinates.
         * @param {Number} x X value for new position
         * @param {Number} y Y value for new position
         * @param {Boolean/Object} [animate] True for the default animation, or a standard
         * Element animation config object
         * @return {Ext.dom.Element} this
         * @deprecated Use {@link #setXY} instead.
         */
        setLocation: function(x, y, animate) {
            return this.setXY([x, y], animate);
        },

        /**
         * Set positioning with an object returned by #getPositioning.
         * @param {Object} posCfg
         * @return {Ext.dom.Element} this
         */
        setPositioning: function(pc) {
            return this.setStyle(pc);
        },

        /**
         * Sets the element's CSS right style.
         * @param {Number/String} right Number of pixels or CSS string value to
         * set as the right CSS property value
         * @return {Ext.dom.Element} this
         * @deprecated
         */
        setRight: function(right) {
            this.dom.style[RIGHT] = this.addUnits(right);
            return this;
        },

        /**
         * Sets the element's top position directly using CSS style
         * (instead of {@link #setY}).
         * @param {Number/String} top Number of pixels or CSS string value to
         * set as the top CSS property value
         * @return {Ext.dom.Element} this
         * @deprecated
         */
        setTop: function(top) {
            this.dom.style[TOP] = this.addUnits(top);
            return this;
        },

        setX: function(x, animate) {
            return this.setXY([x, this.getY()], animate);
        },

        setXY: function(xy, animate) {
            var me = this;

            if (!animate || !me.anim) {
                Element.setXY(me.dom, xy);
            } else {
                if (!Ext.isObject(animate)) {
                    animate = {};
                }
                me.animate(Ext.applyIf({ to: { x: xy[0], y: xy[1] } }, animate));
            }
            return this;
        },

        setY: function(y, animate) {
            return this.setXY([this.getX(), y], animate);
        }
    });

    /**
     * @private
     * Returns the `X,Y` position of the passed element in browser document space without regard
     * to any RTL direction settings.
     */
    Element.getTrueXY = Element.getXY;

});
