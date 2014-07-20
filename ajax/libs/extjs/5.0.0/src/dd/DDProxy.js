/*
 * This is a derivative of the similarly named class in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */

/**
 * A DragDrop implementation that inserts an empty, bordered div into
 * the document that follows the cursor during drag operations.  At the time of
 * the click, the frame div is resized to the dimensions of the linked html
 * element, and moved to the exact location of the linked element.
 *
 * References to the "frame" element refer to the single proxy element that
 * was created to be dragged in place of all DDProxy elements on the
 * page.
 */
Ext.define('Ext.dd.DDProxy', {
    extend: 'Ext.dd.DD',

    statics: {
        /**
         * The default drag frame div id
         * @static
         */
        dragElId: "ygddfdiv"
    },

    /**
     * Creates new DDProxy.
     * @param {String} id the id of the linked html element
     * @param {String} sGroup the group of related DragDrop objects
     * @param {Object} config an object containing configurable attributes.
     * Valid properties for DDProxy in addition to those in DragDrop:
     * 
     * - resizeFrame
     * - centerFrame
     * - dragElId
     */
    constructor: function(id, sGroup, config) {
        if (id) {
            this.init(id, sGroup, config);
            this.initFrame();
        }
    },

    /**
     * @property {Boolean} resizeFrame
     * By default we resize the drag frame to be the same size as the element
     * we want to drag (this is to get the frame effect).  We can turn it off
     * if we want a different behavior.
     */
    resizeFrame: true,

    /**
     * @property {Boolean} centerFrame
     * By default the frame is positioned exactly where the drag element is, so
     * we use the cursor offset provided by Ext.dd.DD.  Another option that works only if
     * you do not have constraints on the obj is to have the drag frame centered
     * around the cursor.  Set centerFrame to true for this effect.
     */
    centerFrame: false,

    /**
     * Creates the proxy element if it does not yet exist
     */
    createFrame: function() {
        var self = this,
            body = document.body,
            div,
            s;

        if (!body || !body.firstChild) {
            setTimeout( function() { self.createFrame(); }, 50 );
            return;
        }

        div = this.getDragEl();

        if (!div) {
            div    = document.createElement("div");
            div.id = this.dragElId;
            div.setAttribute('role', 'presentation');
            s  = div.style;

            s.position   = "absolute";
            s.visibility = "hidden";
            s.cursor     = "move";
            s.border     = "2px solid #aaa";
            s.zIndex     = 999;

            // appendChild can blow up IE if invoked prior to the window load event
            // while rendering a table.  It is possible there are other scenarios
            // that would cause this to happen as well.
            body.insertBefore(div, body.firstChild);
        }
    },

    /**
     * Initialization for the drag frame element.  Must be called in the
     * constructor of all subclasses
     */
    initFrame: function() {
        this.createFrame();
    },

    applyConfig: function() {
        this.callParent();

        this.resizeFrame = (this.config.resizeFrame !== false);
        this.centerFrame = (this.config.centerFrame);
        this.setDragElId(this.config.dragElId || Ext.dd.DDProxy.dragElId);
    },

    /**
     * Resizes the drag frame to the dimensions of the clicked object, positions
     * it over the object, and finally displays it
     * @param {Number} iPageX X click position
     * @param {Number} iPageY Y click position
     * @private
     */
    showFrame: function(iPageX, iPageY) {
        var el = this.getEl(),
            dragEl = this.getDragEl(),
            s = dragEl.style;

        this._resizeProxy();

        if (this.centerFrame) {
            this.setDelta( Math.round(parseInt(s.width,  10)/2),
                           Math.round(parseInt(s.height, 10)/2) );
        }

        this.setDragElPos(iPageX, iPageY);

        Ext.fly(dragEl).show();
    },

    /**
     * The proxy is automatically resized to the dimensions of the linked
     * element when a drag is initiated, unless resizeFrame is set to false
     * @private
     */
    _resizeProxy: function() {
        if (this.resizeFrame) {
            var el = this.getEl();
            Ext.fly(this.getDragEl()).setSize(el.offsetWidth, el.offsetHeight);
        }
    },

    // overrides Ext.dd.DragDrop
    b4MouseDown: function(e) {
        var xy = e.getXY(),
            x = xy[0],
            y = xy[1];

        this.autoOffset(x, y);
        this.setDragElPos(x, y);
    },

    // overrides Ext.dd.DragDrop
    b4StartDrag: function(x, y) {
        // show the drag frame
        this.showFrame(x, y);
    },

    // overrides Ext.dd.DragDrop
    b4EndDrag: function(e) {
        Ext.fly(this.getDragEl()).hide();
    },

    // overrides Ext.dd.DragDrop
    // By default we try to move the element to the last location of the frame.
    // This is so that the default behavior mirrors that of Ext.dd.DD.
    endDrag: function(e) {

        var lel = this.getEl(),
            del = this.getDragEl();

        // Show the drag frame briefly so we can get its position
        del.style.visibility = "";

        this.beforeMove();
        // Hide the linked element before the move to get around a Safari
        // rendering bug.
        lel.style.visibility = "hidden";
        Ext.dd.DDM.moveToEl(lel, del);
        del.style.visibility = "hidden";
        lel.style.visibility = "";

        this.afterDrag();
    },

    beforeMove : function(){

    },

    afterDrag : function(){

    },

    toString: function() {
        return ("DDProxy " + this.id);
    }

});
