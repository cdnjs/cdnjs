/*
 * This is a derivative of the similarly named class in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */


/**
 * A DragDrop implementation where the linked element follows the
 * mouse cursor during a drag.
 */
Ext.define('Ext.dd.DD', {
    extend: 'Ext.dd.DragDrop',
    requires: ['Ext.dd.DragDropManager'],

    /**
     * Creates new DD instance.
     * @param {String} id the id of the linked element
     * @param {String} sGroup the group of related DragDrop items
     * @param {Object} config an object containing configurable attributes.
     * Valid properties for DD: scroll
     */
    constructor: function(id, sGroup, config) {
        if (id) {
            this.init(id, sGroup, config);
        }
    },

    /**
     * @property {Boolean} scroll
     * When set to true, the utility automatically tries to scroll the browser
     * window when a drag and drop element is dragged near the viewport boundary.
     */
    scroll: true,

    /**
     * Sets the pointer offset to the distance between the linked element's top
     * left corner and the location the element was clicked.
     * @param {Number} iPageX the X coordinate of the click
     * @param {Number} iPageY the Y coordinate of the click
     */
    autoOffset: function(iPageX, iPageY) {
        var x = iPageX - this.startPageX,
            y = iPageY - this.startPageY;
        this.setDelta(x, y);
    },

    /**
     * Sets the pointer offset.  You can call this directly to force the
     * offset to be in a particular location (e.g., pass in 0,0 to set it
     * to the center of the object)
     * @param {Number} iDeltaX the distance from the left
     * @param {Number} iDeltaY the distance from the top
     */
    setDelta: function(iDeltaX, iDeltaY) {
        this.deltaX = iDeltaX;
        this.deltaY = iDeltaY;
    },

    /**
     * Sets the drag element to the location of the mousedown or click event,
     * maintaining the cursor location relative to the location on the element
     * that was clicked.  Override this if you want to place the element in a
     * location other than where the cursor is.
     * @param {Number} iPageX the X coordinate of the mousedown or drag event
     * @param {Number} iPageY the Y coordinate of the mousedown or drag event
     */
    setDragElPos: function(iPageX, iPageY) {
        // the first time we do this, we are going to check to make sure
        // the element has css positioning

        var el = this.getDragEl();
        this.alignElWithMouse(el, iPageX, iPageY);
    },

    /**
     * Sets the element to the location of the mousedown or click event,
     * maintaining the cursor location relative to the location on the element
     * that was clicked.  Override this if you want to place the element in a
     * location other than where the cursor is.
     * @param {HTMLElement} el the element to move
     * @param {Number} iPageX the X coordinate of the mousedown or drag event
     * @param {Number} iPageY the Y coordinate of the mousedown or drag event
     */
    alignElWithMouse: function(el, iPageX, iPageY) {
        var oCoord = this.getTargetCoord(iPageX, iPageY),
            fly = el.dom ? el : Ext.fly(el, '_dd'),
            elSize = fly.getSize(),
            EL = Ext.Element,
            vpSize,
            aCoord,
            newLeft,
            newTop;

        if (!this.deltaSetXY) {
            vpSize = this.cachedViewportSize = { width: EL.getDocumentWidth(), height: EL.getDocumentHeight() };
            aCoord = [
                Math.max(0, Math.min(oCoord.x, vpSize.width - elSize.width)),
                Math.max(0, Math.min(oCoord.y, vpSize.height - elSize.height))
            ];
            fly.setXY(aCoord);
            newLeft = this.getLocalX(fly);
            newTop  = fly.getLocalY();
            this.deltaSetXY = [newLeft - oCoord.x, newTop - oCoord.y];
        } else {
            vpSize = this.cachedViewportSize;
            this.setLocalXY(
                fly,
                Math.max(0, Math.min(oCoord.x + this.deltaSetXY[0], vpSize.width - elSize.width)),
                Math.max(0, Math.min(oCoord.y + this.deltaSetXY[1], vpSize.height - elSize.height))
            );
        }

        this.cachePosition(oCoord.x, oCoord.y);
        this.autoScroll(oCoord.x, oCoord.y, el.offsetHeight, el.offsetWidth);
        return oCoord;
    },

    /**
     * Saves the most recent position so that we can reset the constraints and
     * tick marks on-demand.  We need to know this so that we can calculate the
     * number of pixels the element is offset from its original position.
     *
     * @param {Number} [iPageX] the current x position (this just makes it so we
     * don't have to look it up again)
     * @param {Number} [iPageY] the current y position (this just makes it so we
     * don't have to look it up again)
     */
    cachePosition: function(iPageX, iPageY) {
        if (iPageX) {
            this.lastPageX = iPageX;
            this.lastPageY = iPageY;
        } else {
            var aCoord = Ext.fly(this.getEl()).getXY();
            this.lastPageX = aCoord[0];
            this.lastPageY = aCoord[1];
        }
    },

    /**
     * Auto-scroll the window if the dragged object has been moved beyond the
     * visible window boundary.
     * @param {Number} x the drag element's x position
     * @param {Number} y the drag element's y position
     * @param {Number} h the height of the drag element
     * @param {Number} w the width of the drag element
     * @private
     */
    autoScroll: function(x, y, h, w) {

        if (this.scroll) {
            // The client height
            var clientH = Ext.Element.getViewportHeight(),
                // The client width
                clientW = Ext.Element.getViewportWidth(),
                // The amt scrolled down
                st = this.DDMInstance.getScrollTop(),
                // The amt scrolled right
                sl = this.DDMInstance.getScrollLeft(),
                // Location of the bottom of the element
                bot = h + y,
                // Location of the right of the element
                right = w + x,
                // The distance from the cursor to the bottom of the visible area,
                // adjusted so that we don't scroll if the cursor is beyond the
                // element drag constraints
                toBot = (clientH + st - y - this.deltaY),
                // The distance from the cursor to the right of the visible area
                toRight = (clientW + sl - x - this.deltaX),
                // How close to the edge the cursor must be before we scroll
                // var thresh = (document.all) ? 100 : 40;
                thresh = 40,
                // How many pixels to scroll per autoscroll op.  This helps to reduce
                // clunky scrolling. IE is more sensitive about this ... it needs this
                // value to be higher.
                scrAmt = (document.all) ? 80 : 30;

            // Scroll down if we are near the bottom of the visible page and the
            // obj extends below the crease
            if ( bot > clientH && toBot < thresh ) {
                window.scrollTo(sl, st + scrAmt);
            }

            // Scroll up if the window is scrolled down and the top of the object
            // goes above the top border
            if ( y < st && st > 0 && y - st < thresh ) {
                window.scrollTo(sl, st - scrAmt);
            }

            // Scroll right if the obj is beyond the right border and the cursor is
            // near the border.
            if ( right > clientW && toRight < thresh ) {
                window.scrollTo(sl + scrAmt, st);
            }

            // Scroll left if the window has been scrolled to the right and the obj
            // extends past the left border
            if ( x < sl && sl > 0 && x - sl < thresh ) {
                window.scrollTo(sl - scrAmt, st);
            }
        }
    },

    /**
     * Finds the location the element should be placed if we want to move
     * it to where the mouse location less the click offset would place us.
     * @param {Number} iPageX the X coordinate of the click
     * @param {Number} iPageY the Y coordinate of the click
     * @return {Object} An object that contains the coordinates (Object.x and Object.y)
     * @return {Number} return.x
     * @return {Number} return.y
     * @private
     */
    getTargetCoord: function(iPageX, iPageY) {
        var x = iPageX - this.deltaX,
            y = iPageY - this.deltaY;

        if (this.constrainX) {
            if (x < this.minX) {
                x = this.minX;
            }
            if (x > this.maxX) {
                x = this.maxX;
            }
        }

        if (this.constrainY) {
            if (y < this.minY) {
                y = this.minY;
            }
            if (y > this.maxY) {
                y = this.maxY;
            }
        }

        x = this.getTick(x, this.xTicks);
        y = this.getTick(y, this.yTicks);


        return {x: x, y: y};
    },

    /**
     * Sets up config options specific to this class. Overrides
     * Ext.dd.DragDrop, but all versions of this method through the
     * inheritance chain are called
     */
    applyConfig: function() {
        this.callParent();
        this.scroll = (this.config.scroll !== false);
    },

    /**
     * Event that fires prior to the onMouseDown event.  Overrides
     * Ext.dd.DragDrop.
     */
    b4MouseDown: function(e) {
        // this.resetConstraints();
        var xy = e.getXY();
        this.autoOffset(xy[0], xy[1]);
    },

    /**
     * Event that fires prior to the onDrag event.  Overrides
     * Ext.dd.DragDrop.
     */
    b4Drag: function(e) {
        var xy = e.getXY();
        this.setDragElPos(xy[0], xy[1]);
    },

    toString: function() {
        return ("DD " + this.id);
    },
    
    getLocalX: function(el) {
        return el.getLocalX();
    },

    setLocalXY: function(el, x, y) {
        el.setLocalXY(x, y);
    }

    //////////////////////////////////////////////////////////////////////////
    // Debugging ygDragDrop events that can be overridden
    //////////////////////////////////////////////////////////////////////////
    /*
    startDrag: function(x, y) {
    },

    onDrag: function(e) {
    },

    onDragEnter: function(e, id) {
    },

    onDragOver: function(e, id) {
    },

    onDragOut: function(e, id) {
    },

    onDragDrop: function(e, id) {
    },

    endDrag: function(e) {
    }

    */

});
