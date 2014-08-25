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
/*
 * This is a derivative of the similarly named class in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */


/**
 * DragDropManager is a singleton that tracks the element interaction for
 * all DragDrop items in the window.  Generally, you will not call
 * this class directly, but it does have helper methods that could
 * be useful in your DragDrop implementations.
 */
Ext.define('Ext.dd.DragDropManager', {
    singleton: true,

    requires: ['Ext.util.Region'],

    uses: ['Ext.tip.QuickTipManager'],

    // shorter ClassName, to save bytes and use internally
    alternateClassName: ['Ext.dd.DragDropMgr', 'Ext.dd.DDM'],

    /**
     * @property {String[]} ids
     * Two dimensional Array of registered DragDrop objects.  The first
     * dimension is the DragDrop item group, the second the DragDrop
     * object.
     * @private
     */
    ids: {},

    /**
     * @property {String[]} handleIds
     * Array of element ids defined as drag handles.  Used to determine
     * if the element that generated the mousedown event is actually the
     * handle and not the html element itself.
     * @private
     */
    handleIds: {},

    /**
     * @property {Ext.dd.DragDrop} dragCurrent
     * the DragDrop object that is currently being dragged
     * @private
     */
    dragCurrent: null,

    /**
     * @property {Ext.dd.DragDrop[]} dragOvers
     * the DragDrop object(s) that are being hovered over
     * @private
     */
    dragOvers: {},

    /**
     * @property {Number} deltaX
     * the X distance between the cursor and the object being dragged
     * @private
     */
    deltaX: 0,

    /**
     * @property {Number} deltaY
     * the Y distance between the cursor and the object being dragged
     * @private
     */
    deltaY: 0,

    /**
     * @property {Boolean} preventDefault
     * Flag to determine if we should prevent the default behavior of the
     * events we define. By default this is true, but this can be set to
     * false if you need the default behavior (not recommended)
     */
    preventDefault: true,

    /**
     * @property {Boolean} stopPropagation
     * Flag to determine if we should stop the propagation of the events
     * we generate. This is true by default but you may want to set it to
     * false if the html element contains other features that require the
     * mouse click.
     */
    stopPropagation: true,

    /**
     * Internal flag that is set to true when drag and drop has been
     * intialized
     * @property initialized
     * @private
     */
    initialized: false,

    /**
     * All drag and drop can be disabled.
     * @property locked
     * @private
     */
    locked: false,

    /**
     * Called the first time an element is registered.
     * @private
     */
    init: function() {
        this.initialized = true;
    },

    /**
     * @property {Number} POINT
     * In point mode, drag and drop interaction is defined by the
     * location of the cursor during the drag/drop
     */
    POINT: 0,

    /**
     * @property {Number} INTERSECT
     * In intersect mode, drag and drop interaction is defined by the
     * overlap of two or more drag and drop objects.
     */
    INTERSECT: 1,

    /**
     * @property {Number} mode
     * The current drag and drop mode.  Default: POINT
     */
    mode: 0,

    /**
     * @property {Boolean} [notifyOccluded=false]
     * This config is only provided to provide old, usually unwanted drag/drop behaviour.
     *
     * From ExtJS 4.1.0 onwards, when drop targets are contained in floating, absolutely positioned elements
     * such as in {@link Ext.window.Window Windows}, which may overlap each other, `over` and `drop` events
     * are only delivered to the topmost drop target at the mouse position.
     *
     * If all targets below that in zIndex order should also receive notifications, set
     * `notifyOccluded` to `true`.
     */
    notifyOccluded: false,

    /**
     * @property {String} dragCls
     * @readonly
     * Class to add to the {@link Ext.dd.DragDrop#getDragEl dragged element} of a DragDrop instance.
     */
    dragCls: Ext.baseCSSPrefix + 'dd-drag-current',

    /**
     * Runs method on all drag and drop objects
     * @private
     */
    _execOnAll: function(sMethod, args) {
        var i, j, oDD;
        for (i in this.ids) {
            for (j in this.ids[i]) {
                oDD = this.ids[i][j];
                if (! this.isTypeOfDD(oDD)) {
                    continue;
                }
                oDD[sMethod].apply(oDD, args);
            }
        }
    },

    /**
     * Drag and drop initialization.  Sets up the global event handlers
     * @private
     */
    _onLoad: function() {

        this.init();

        var Event = Ext.EventManager;
        Event.on(document, "mouseup",   this.handleMouseUp, this, true);
        Event.on(document, "mousemove", this.handleMouseMove, this, true);
        Event.on(window,   "unload",    this._onUnload, this, true);
        Event.on(window,   "resize",    this._onResize, this, true);
        // Event.on(window,   "mouseout",    this._test);

    },

    /**
     * Reset constraints on all drag and drop objs
     * @private
     */
    _onResize: function(e) {
        this._execOnAll("resetConstraints", []);
    },

    /**
     * Lock all drag and drop functionality
     */
    lock: function() { this.locked = true; },

    /**
     * Unlock all drag and drop functionality
     */
    unlock: function() { this.locked = false; },

    /**
     * Is drag and drop locked?
     * @return {Boolean} True if drag and drop is locked, false otherwise.
     */
    isLocked: function() { return this.locked; },

    /**
     * @property {Object} locationCache
     * Location cache that is set for all drag drop objects when a drag is
     * initiated, cleared when the drag is finished.
     * @private
     */
    locationCache: {},

    /**
     * @property {Boolean} useCache
     * Set useCache to false if you want to force object the lookup of each
     * drag and drop linked element constantly during a drag.
     */
    useCache: true,

    /**
     * @property {Number} clickPixelThresh
     * The number of pixels that the mouse needs to move after the
     * mousedown before the drag is initiated.  Default=3;
     */
    clickPixelThresh: 3,

    /**
     * @property {Number} clickTimeThresh
     * The number of milliseconds after the mousedown event to initiate the
     * drag if we don't get a mouseup event. Default=350
     */
    clickTimeThresh: 350,

    /**
     * @property {Boolean} dragThreshMet
     * Flag that indicates that either the drag pixel threshold or the
     * mousdown time threshold has been met
     * @private
     */
    dragThreshMet: false,

    /**
     * @property {Object} clickTimeout
     * Timeout used for the click time threshold
     * @private
     */
    clickTimeout: null,

    /**
     * @property {Number} startX
     * The X position of the mousedown event stored for later use when a
     * drag threshold is met.
     * @private
     */
    startX: 0,

    /**
     * @property {Number} startY
     * The Y position of the mousedown event stored for later use when a
     * drag threshold is met.
     * @private
     */
    startY: 0,

    /**
     * Each DragDrop instance must be registered with the DragDropManager.
     * This is executed in DragDrop.init()
     * @param {Ext.dd.DragDrop} oDD the DragDrop object to register
     * @param {String} sGroup the name of the group this element belongs to
     */
    regDragDrop: function(oDD, sGroup) {
        if (!this.initialized) { this.init(); }

        if (!this.ids[sGroup]) {
            this.ids[sGroup] = {};
        }
        this.ids[sGroup][oDD.id] = oDD;
    },

    /**
     * Removes the supplied dd instance from the supplied group. Executed
     * by DragDrop.removeFromGroup, so don't call this function directly.
     * @private
     */
    removeDDFromGroup: function(oDD, sGroup) {
        if (!this.ids[sGroup]) {
            this.ids[sGroup] = {};
        }

        var obj = this.ids[sGroup];
        if (obj && obj[oDD.id]) {
            delete obj[oDD.id];
        }
    },

    /**
     * Unregisters a drag and drop item.  This is executed in
     * DragDrop.unreg, use that method instead of calling this directly.
     * @private
     */
    _remove: function(oDD) {
        for (var g in oDD.groups) {
            if (g && this.ids[g] && this.ids[g][oDD.id]) {
                delete this.ids[g][oDD.id];
            }
        }
        delete this.handleIds[oDD.id];
    },

    /**
     * Each DragDrop handle element must be registered.  This is done
     * automatically when executing DragDrop.setHandleElId()
     * @param {String} sDDId the DragDrop id this element is a handle for
     * @param {String} sHandleId the id of the element that is the drag
     * handle
     */
    regHandle: function(sDDId, sHandleId) {
        if (!this.handleIds[sDDId]) {
            this.handleIds[sDDId] = {};
        }
        this.handleIds[sDDId][sHandleId] = sHandleId;
    },

    /**
     * Utility function to determine if a given element has been
     * registered as a drag drop item.
     * @param {String} id the element id to check
     * @return {Boolean} true if this element is a DragDrop item,
     * false otherwise
     */
    isDragDrop: function(id) {
        return ( this.getDDById(id) ) ? true : false;
    },

    /**
     * Returns the drag and drop instances that are in all groups the
     * passed in instance belongs to.
     * @param {Ext.dd.DragDrop} p_oDD the obj to get related data for
     * @param {Boolean} bTargetsOnly if true, only return targetable objs
     * @return {Ext.dd.DragDrop[]} the related instances
     */
    getRelated: function(p_oDD, bTargetsOnly) {
        var oDDs = [],
            i, j, dd;
        for (i in p_oDD.groups) {
            for (j in this.ids[i]) {
                dd = this.ids[i][j];
                if (! this.isTypeOfDD(dd)) {
                    continue;
                }
                if (!bTargetsOnly || dd.isTarget) {
                    oDDs[oDDs.length] = dd;
                }
            }
        }

        return oDDs;
    },

    /**
     * Returns true if the specified dd target is a legal target for
     * the specifice drag obj
     * @param {Ext.dd.DragDrop} oDD the drag obj
     * @param {Ext.dd.DragDrop} oTargetDD the target
     * @return {Boolean} true if the target is a legal target for the
     * dd obj
     */
    isLegalTarget: function (oDD, oTargetDD) {
        var targets = this.getRelated(oDD, true),
            i, len;
        for (i=0, len=targets.length;i<len;++i) {
            if (targets[i].id == oTargetDD.id) {
                return true;
            }
        }

        return false;
    },

    /**
     * My goal is to be able to transparently determine if an object is
     * typeof DragDrop, and the exact subclass of DragDrop.  typeof
     * returns "object", oDD.constructor.toString() always returns
     * "DragDrop" and not the name of the subclass.  So for now it just
     * evaluates a well-known variable in DragDrop.
     * @param {Object} the object to evaluate
     * @return {Boolean} true if typeof oDD = DragDrop
     */
    isTypeOfDD: function (oDD) {
        return (oDD && oDD.__ygDragDrop);
    },

    /**
     * Utility function to determine if a given element has been
     * registered as a drag drop handle for the given Drag Drop object.
     * @param {String} id the element id to check
     * @return {Boolean} true if this element is a DragDrop handle, false
     * otherwise
     */
    isHandle: function(sDDId, sHandleId) {
        return ( this.handleIds[sDDId] &&
                        this.handleIds[sDDId][sHandleId] );
    },

    /**
     * Returns the DragDrop instance for a given id
     * @param {String} id the id of the DragDrop object
     * @return {Ext.dd.DragDrop} the drag drop object, null if it is not found
     */
    getDDById: function(id) {
        var i, dd;
        for (i in this.ids) {
            dd = this.ids[i][id];
            if (dd instanceof Ext.dd.DDTarget) {
                return dd;
            }
        }
        return null;
    },

    /**
     * Fired after a registered DragDrop object gets the mousedown event.
     * Sets up the events required to track the object being dragged
     * @param {Event} e the event
     * @param {Ext.dd.DragDrop} oDD the DragDrop object being dragged
     * @private
     */
    handleMouseDown: function(e, oDD) {
        var me = this,
            el;

        if (Ext.quickTipsActive){
            Ext.tip.QuickTipManager.ddDisable();
        }
        if (me.dragCurrent){
            // the original browser mouseup wasn't handled (e.g. outside FF browser window)
            // so clean up first to avoid breaking the next drag
            me.handleMouseUp(e);
        }

        me.currentTarget = e.getTarget();
        me.dragCurrent = oDD;

        el = oDD.getEl();

        // We use this to handle an issue where a mouseup will not be detected 
        // if the mouseup event happens outside of the browser window. When the 
        // mouse comes back, any drag will still be active
        // http://msdn.microsoft.com/en-us/library/ms537630(VS.85).aspx
        if (Ext.isIE9m && el.setCapture) {
            el.setCapture();
        }

        // track start position
        me.startX = e.getPageX();
        me.startY = e.getPageY();

        me.deltaX = me.startX - el.offsetLeft;
        me.deltaY = me.startY - el.offsetTop;

        me.dragThreshMet = false;

        me.clickTimeout = setTimeout(
            function() {
                me.startDrag(me.startX, me.startY);
            },
            me.clickTimeThresh
        );
    },

    /**
     * Fired when either the drag pixel threshold or the mousedown hold
     * time threshold has been met.
     * @param {Number} x the X position of the original mousedown
     * @param {Number} y the Y position of the original mousedown
     */
    startDrag: function(x, y) {
        var me = this,
            current = me.dragCurrent,
            dragEl;

        clearTimeout(me.clickTimeout);
        if (current) {
            current.b4StartDrag(x, y);
            current.startDrag(x, y);
            dragEl = current.getDragEl();

            // Add current drag class to dragged element
            if (dragEl) {
                Ext.fly(dragEl).addCls(me.dragCls);
            }
        }
        me.dragThreshMet = true;
    },

    /**
     * Internal function to handle the mouseup event.  Will be invoked
     * from the context of the document.
     * @param {Event} e the event
     * @private
     */
    handleMouseUp: function(e) {
        var me = this;

        if (Ext.quickTipsActive){
            Ext.tip.QuickTipManager.ddEnable();
        }
        if (!me.dragCurrent) {
            return;
        }

        // See setCapture call in handleMouseDown
        if (Ext.isIE && document.releaseCapture) {
            document.releaseCapture();
        }

        clearTimeout(me.clickTimeout);

        if (me.dragThreshMet) {
            me.fireEvents(e, true);
        }

        me.stopDrag(e);

        me.stopEvent(e);
    },

    /**
     * Utility to stop event propagation and event default, if these
     * features are turned on.
     * @param {Event} e the event as returned by this.getEvent()
     */
    stopEvent: function(e) {
        if (this.stopPropagation) {
            e.stopPropagation();
        }

        if (this.preventDefault) {
            e.preventDefault();
        }
    },

    /**
     * Internal function to clean up event handlers after the drag
     * operation is complete
     * @param {Event} e the event
     * @private
     */
    stopDrag: function(e) {
        var me = this,
            current = me.dragCurrent,
            dragEl;

        // Fire the drag end event for the item that was dragged
        if (current) {
            if (me.dragThreshMet) {

                // Remove current drag class from dragged element
                dragEl = current.getDragEl();
                if (dragEl) {
                    Ext.fly(dragEl).removeCls(me.dragCls);
                }

                current.b4EndDrag(e);
                current.endDrag(e);
            }

            me.dragCurrent.onMouseUp(e);
        }

        me.dragCurrent = null;
        me.dragOvers = {};
    },

    /**
     * Internal function to handle the mousemove event.  Will be invoked
     * from the context of the html element.
     *
     * TODO: figure out what we can do about mouse events lost when the
     * user drags objects beyond the window boundary.  Currently we can
     * detect this in internet explorer by verifying that the mouse is
     * down during the mousemove event.  Firefox doesn't give us the
     * button state on the mousemove event.
     *
     * @param {Event} e the event
     * @private
     */
    handleMouseMove: function(e) {
        var me = this,
            current = me.dragCurrent,
            diffX,
            diffY;

        if (!current) {
            return true;
        }

        if (!me.dragThreshMet) {
            diffX = Math.abs(me.startX - e.getPageX());
            diffY = Math.abs(me.startY - e.getPageY());
            if (diffX > me.clickPixelThresh || diffY > me.clickPixelThresh) {
                me.startDrag(me.startX, me.startY);
            }
        }

        if (me.dragThreshMet) {
            current.b4Drag(e);
            current.onDrag(e);
            if (!current.moveOnly) {
                me.fireEvents(e, false);
            }
        }

        me.stopEvent(e);

        return true;
    },

    /**
     * Iterates over all of the DragDrop elements to find ones we are
     * hovering over or dropping on
     * @param {Event} e the event
     * @param {Boolean} isDrop is this a drop op or a mouseover op?
     * @private
     */
    fireEvents: function(e, isDrop) {
        var me = this,
            dragCurrent = me.dragCurrent,
            dragEl,
            oldDragElTop,
            mousePoint = e.getPoint(),
            overTarget,
            overTargetEl,
            allTargets = [],
            oldOvers  = [],  // cache the previous dragOver array
            outEvts   = [],
            overEvts  = [],
            dropEvts  = [],
            enterEvts = [],
            xy,
            needsSort,
            i,
            len,
            sGroup;

        // If the user did the mouse up outside of the window, we could
        // get here even though we have ended the drag.
        if (!dragCurrent || dragCurrent.isLocked()) {
            return;
        }

        // If we need to use the current mousemove target to find the over el,
        // but pointer-events is not supported, AND the delta position does not place the mouse outside of the dragEl,
        // temporarily move the dragEl away, and fake the mousemove target by using document.elementFromPoint
        // while it's out of the way.
        // The pointer events implementation is bugged in IE9/10 and opera, so fallback even if they report that they support it.
        // IE8m do not support it so they will auto fall back
        if (!me.notifyOccluded && (!Ext.supports.PointerEvents || Ext.isIE10m || Ext.isOpera) && !(dragCurrent.deltaX < 0 || dragCurrent.deltaY < 0)) {
            dragEl = dragCurrent.getDragEl();
            oldDragElTop = dragEl.style.top;
            dragEl.style.top = '-10000px';
            xy = e.getXY();
            e.target = document.elementFromPoint(xy[0], xy[1]);
            dragEl.style.top = oldDragElTop;
        }

        // Check to see if the object(s) we were hovering over is no longer
        // being hovered over so we can fire the onDragOut event
        for (i in me.dragOvers) {

            overTarget = me.dragOvers[i];

            if (!me.isTypeOfDD(overTarget)) {
                continue;
            }

            // If notifyOccluded set, we use mouse position
            if (me.notifyOccluded) {
                if (!this.isOverTarget(mousePoint, overTarget, me.mode)) {
                    outEvts.push(overTarget);
                }
            }
            // Otherwise we use event source of the mousemove event
            else {
                if (!e.within(overTarget.getEl())) {
                    outEvts.push(overTarget);
                }
            }

            oldOvers[i] = true;
            delete me.dragOvers[i];
        }

        // Collect all targets which are members of the same ddGoups that the dragCurrent is a member of, and which may recieve mouseover and drop notifications.
        // This is preparatory to seeing which one(s) we are currently over
        // Begin by iterating through the ddGroups of which the dragCurrent is a member
        for (sGroup in dragCurrent.groups) {

            if ("string" != typeof sGroup) {
                continue;
            }

            // Loop over the registered members of each group, testing each as a potential target
            for (i in me.ids[sGroup]) {
                overTarget = me.ids[sGroup][i];

                // The target is valid if it is a DD type
                // And it's got a DOM element
                // And it's configured to be a drop target
                // And it's not locked
                // And the DOM element is fully visible with no hidden ancestors
                // And it's either not the dragCurrent, or, if it is, tha dragCurrent is configured to not ignore itself.
                if (me.isTypeOfDD(overTarget) &&
                    (overTargetEl = overTarget.getEl()) &&
                    (overTarget.isTarget) &&
                    (!overTarget.isLocked()) &&
                    (Ext.fly(overTargetEl).isVisible(true)) &&
                    ((overTarget != dragCurrent) || (dragCurrent.ignoreSelf === false))) {

                    // If notifyOccluded set, we use mouse position
                    if (me.notifyOccluded) {

                        // Only sort by zIndex if there were some which had a floating zIndex value
                        if ((overTarget.zIndex = me.getZIndex(overTargetEl)) !== -1) {
                            needsSort = true;
                        }
                        allTargets.push(overTarget);
                    }
                    // Otherwise we use event source of the mousemove event
                    else {
                        if (e.within(overTarget.getEl())) {
                            allTargets.push(overTarget);
                            break;
                        }
                    }
                }
            }
        }

        // If there were floating targets, sort the highest zIndex to the top
        if (needsSort) {
            Ext.Array.sort(allTargets, me.byZIndex);
        }

        // Loop through possible targets, notifying the one(s) we are over.
        // Usually we only deliver events to the topmost.
        for (i = 0, len = allTargets.length; i < len; i++) {
            overTarget = allTargets[i];

            // If we are over the overTarget, queue it up to recieve an event of whatever type we are handling
            if (me.isOverTarget(mousePoint, overTarget, me.mode)) {
                // look for drop interactions
                if (isDrop) {
                    dropEvts.push( overTarget );
                // look for drag enter and drag over interactions
                } else {

                    // initial drag over: dragEnter fires
                    if (!oldOvers[overTarget.id]) {
                        enterEvts.push( overTarget );
                    // subsequent drag overs: dragOver fires
                    } else {
                        overEvts.push( overTarget );
                    }
                    me.dragOvers[overTarget.id] = overTarget;
                }

                // Unless this DragDropManager has been explicitly configured to deliver events to multiple targets, then we are done.
                if (!me.notifyOccluded) {
                    break;
                }
            }
        }

        if (me.mode) {
            if (outEvts.length) {
                dragCurrent.b4DragOut(e, outEvts);
                dragCurrent.onDragOut(e, outEvts);
            }

            if (enterEvts.length) {
                dragCurrent.onDragEnter(e, enterEvts);
            }

            if (overEvts.length) {
                dragCurrent.b4DragOver(e, overEvts);
                dragCurrent.onDragOver(e, overEvts);
            }

            if (dropEvts.length) {
                dragCurrent.b4DragDrop(e, dropEvts);
                dragCurrent.onDragDrop(e, dropEvts);
            }

        } else {
            // fire dragout events
            for (i=0, len=outEvts.length; i<len; ++i) {
                dragCurrent.b4DragOut(e, outEvts[i].id);
                dragCurrent.onDragOut(e, outEvts[i].id);
            }

            // fire enter events
            for (i=0,len=enterEvts.length; i<len; ++i) {
                // dc.b4DragEnter(e, oDD.id);
                dragCurrent.onDragEnter(e, enterEvts[i].id);
            }

            // fire over events
            for (i=0,len=overEvts.length; i<len; ++i) {
                dragCurrent.b4DragOver(e, overEvts[i].id);
                dragCurrent.onDragOver(e, overEvts[i].id);
            }

            // fire drop events
            for (i=0, len=dropEvts.length; i<len; ++i) {
                dragCurrent.b4DragDrop(e, dropEvts[i].id);
                dragCurrent.onDragDrop(e, dropEvts[i].id);
            }

        }

        // notify about a drop that did not find a target
        if (isDrop && !dropEvts.length) {
            dragCurrent.onInvalidDrop(e);
        }

    },

    /**
     * @private
     * Collects the z-index of the passed element, looking up the parentNode axis to find an absolutely positioned ancestor
     * which is able to yield a z-index. If found to be not absolutely positionedm returns -1.
     *
     * This is used when sorting potential drop targets into z-index order so that only the topmost receives `over` and `drop` events.
     *
     * @return {Number} The z-index of the element, or of its topmost absolutely positioned ancestor. Returns -1 if the element is not
     * absolutely positioned.
     */
    getZIndex: function(element) {
        var body = document.body,
            z,
            zIndex = -1;

        element = Ext.getDom(element);
        while (element !== body) {
            if (!isNaN(z = Number(Ext.fly(element).getStyle('zIndex')))) {
                zIndex = z;
            }
            element = element.parentNode;
        }
        return zIndex;
    },

    /**
     * @private
     * Utility method to pass to {@link Ext.Array#sort} when sorting potential drop targets by z-index.
     */
    byZIndex: function(d1, d2) {
        return d1.zIndex < d2.zIndex;
    },

    /**
     * Helper function for getting the best match from the list of drag
     * and drop objects returned by the drag and drop events when we are
     * in INTERSECT mode.  It returns either the first object that the
     * cursor is over, or the object that has the greatest overlap with
     * the dragged element.
     * @param  {Ext.dd.DragDrop[]} dds The array of drag and drop objects
     * targeted
     * @return {Ext.dd.DragDrop}       The best single match
     */
    getBestMatch: function(dds) {
        var winner = null,
            len = dds.length,
            i, dd;
        // Return null if the input is not what we expect
        //if (!dds || !dds.length || dds.length == 0) {
           // winner = null;
        // If there is only one item, it wins
        //} else if (dds.length == 1) {


        if (len == 1) {
            winner = dds[0];
        } else {
            // Loop through the targeted items
            for (i=0; i<len; ++i) {
                dd = dds[i];
                // If the cursor is over the object, it wins.  If the
                // cursor is over multiple matches, the first one we come
                // to wins.
                if (dd.cursorIsOver) {
                    winner = dd;
                    break;
                // Otherwise the object with the most overlap wins
                } else {
                    if (!winner ||
                        winner.overlap.getArea() < dd.overlap.getArea()) {
                        winner = dd;
                    }
                }
            }
        }

        return winner;
    },

    /**
     * Refreshes the cache of the top-left and bottom-right points of the
     * drag and drop objects in the specified group(s).  This is in the
     * format that is stored in the drag and drop instance, so typical
     * usage is:
     *
     *     Ext.dd.DragDropManager.refreshCache(ddinstance.groups);
     *
     * Alternatively:
     *
     *     Ext.dd.DragDropManager.refreshCache({group1:true, group2:true});
     *
     * TODO: this really should be an indexed array.  Alternatively this
     * method could accept both.
     *
     * @param {Object} groups an associative array of groups to refresh
     */
    refreshCache: function(groups) {
        var sGroup, i, oDD, loc;
        for (sGroup in groups) {
            if ("string" != typeof sGroup) {
                continue;
            }
            for (i in this.ids[sGroup]) {
                oDD = this.ids[sGroup][i];

                if (this.isTypeOfDD(oDD)) {
                // if (this.isTypeOfDD(oDD) && oDD.isTarget) {
                    loc = this.getLocation(oDD);
                    if (loc) {
                        this.locationCache[oDD.id] = loc;
                    } else {
                        delete this.locationCache[oDD.id];
                        // this will unregister the drag and drop object if
                        // the element is not in a usable state
                        // oDD.unreg();
                    }
                }
            }
        }
    },

    /**
     * This checks to make sure an element exists and is in the DOM.  The
     * main purpose is to handle cases where innerHTML is used to remove
     * drag and drop objects from the DOM.  IE provides an 'unspecified
     * error' when trying to access the offsetParent of such an element
     * @param {HTMLElement} el the element to check
     * @return {Boolean} true if the element looks usable
     */
    verifyEl: function(el) {
        if (el) {
            var parent;
            if(Ext.isIE){
                try{
                    parent = el.offsetParent;
                }catch(e){}
            }else{
                parent = el.offsetParent;
            }
            if (parent) {
                return true;
            }
        }

        return false;
    },

    /**
     * Returns a Region object containing the drag and drop element's position
     * and size, including the padding configured for it
     * @param {Ext.dd.DragDrop} oDD the drag and drop object to get the location for.
     * @return {Ext.util.Region} a Region object representing the total area
     * the element occupies, including any padding
     * the instance is configured for.
     */
    getLocation: function(oDD) {
        if (! this.isTypeOfDD(oDD)) {
            return null;
        }

        //delegate getLocation method to the
        //drag and drop target.
        if (oDD.getRegion) {
            return oDD.getRegion();
        }

        var el = oDD.getEl(), pos, x1, x2, y1, y2, t, r, b, l;

        try {
            pos= Ext.Element.getXY(el);
        } catch (e) { }

        if (!pos) {
            return null;
        }

        x1 = pos[0];
        x2 = x1 + el.offsetWidth;
        y1 = pos[1];
        y2 = y1 + el.offsetHeight;

        t = y1 - oDD.padding[0];
        r = x2 + oDD.padding[1];
        b = y2 + oDD.padding[2];
        l = x1 - oDD.padding[3];

        return new Ext.util.Region(t, r, b, l);
    },

    /**
     * Checks the cursor location to see if it over the target
     * @param {Ext.util.Point} pt The point to evaluate
     * @param {Ext.dd.DragDrop} oTarget the DragDrop object we are inspecting
     * @return {Boolean} true if the mouse is over the target
     * @private
     */
    isOverTarget: function(pt, oTarget, intersect) {
        // use cache if available
        var loc = this.locationCache[oTarget.id],
            dc,
            pos,
            el,
            curRegion,
            overlap;

        if (!loc || !this.useCache) {
            loc = this.getLocation(oTarget);
            this.locationCache[oTarget.id] = loc;
        }

        if (!loc) {
            return false;
        }

        oTarget.cursorIsOver = loc.contains( pt );

        // DragDrop is using this as a sanity check for the initial mousedown
        // in this case we are done.  In POINT mode, if the drag obj has no
        // contraints, we are also done. Otherwise we need to evaluate the
        // location of the target as related to the actual location of the
        // dragged element.
        dc = this.dragCurrent;
        if (!dc || !dc.getTargetCoord ||
                (!intersect && !dc.constrainX && !dc.constrainY)) {
            return oTarget.cursorIsOver;
        }

        oTarget.overlap = null;

        // Get the current location of the drag element, this is the
        // location of the mouse event less the delta that represents
        // where the original mousedown happened on the element.  We
        // need to consider constraints and ticks as well.
        pos = dc.getTargetCoord(pt.x, pt.y);

        el = dc.getDragEl();
        curRegion = new Ext.util.Region(pos.y,
            pos.x + el.offsetWidth,
            pos.y + el.offsetHeight,
            pos.x
        );

        overlap = curRegion.intersect(loc);

        if (overlap) {
            oTarget.overlap = overlap;
            return (intersect) ? true : oTarget.cursorIsOver;
        } else {
            return false;
        }
    },

    /**
     * unload event handler
     * @private
     */
    _onUnload: function(e, me) {
        Ext.dd.DragDropManager.unregAll();
    },

    /**
     * Cleans up the drag and drop events and objects.
     * @private
     */
    unregAll: function() {

        if (this.dragCurrent) {
            this.stopDrag();
            this.dragCurrent = null;
        }

        this._execOnAll("unreg", []);

        for (var i in this.elementCache) {
            delete this.elementCache[i];
        }

        this.elementCache = {};
        this.ids = {};
    },

    /**
     * @property {Object} elementCache
     * A cache of DOM elements
     * @private
     */
    elementCache: {},

    /**
     * Get the wrapper for the DOM element specified
     * @param {String} id the id of the element to get
     * @return {Ext.dd.DragDropManager.ElementWrapper} the wrapped element
     * @private
     * @deprecated This wrapper isn't that useful
     */
    getElWrapper: function(id) {
        var oWrapper = this.elementCache[id];
        if (!oWrapper || !oWrapper.el) {
            oWrapper = this.elementCache[id] =
                new this.ElementWrapper(Ext.getDom(id));
        }
        return oWrapper;
    },

    /**
     * Returns the actual DOM element
     * @param {String} id the id of the elment to get
     * @return {Object} The element
     * @deprecated use Ext.lib.Ext.getDom instead
     */
    getElement: function(id) {
        return Ext.getDom(id);
    },

    /**
     * Returns the style property for the DOM element (i.e.,
     * document.getElById(id).style)
     * @param {String} id the id of the elment to get
     * @return {Object} The style property of the element
     */
    getCss: function(id) {
        var el = Ext.getDom(id);
        return (el) ? el.style : null;
    },

    /**
     * @class Ext.dd.DragDropManager.ElementWrapper
     * Deprecated inner class for cached elements.
     * @private
     * @deprecated This wrapper isn't that useful
     */
    ElementWrapper: function(el) {
        /** The element */
        this.el = el || null;
        /** The element id */
        this.id = this.el && el.id;
        /** A reference to the style property */
        this.css = this.el && el.style;
    },

    // Continue class docs
    /** @class Ext.dd.DragDropElement */

    /**
     * Returns the X position of an html element
     * @param {HTMLElement} el the element for which to get the position
     * @return {Number} the X coordinate
     */
    getPosX: function(el) {
        return Ext.Element.getX(el);
    },

    /**
     * Returns the Y position of an html element
     * @param {HTMLElement} el the element for which to get the position
     * @return {Number} the Y coordinate
     */
    getPosY: function(el) {
        return Ext.Element.getY(el);
    },

    /**
     * Swap two nodes.  In IE, we use the native method, for others we
     * emulate the IE behavior
     * @param {HTMLElement} n1 the first node to swap
     * @param {HTMLElement} n2 the other node to swap
     */
    swapNode: function(n1, n2) {
        if (n1.swapNode) {
            n1.swapNode(n2);
        } else {
            var p = n2.parentNode,
                s = n2.nextSibling;

            if (s == n1) {
                p.insertBefore(n1, n2);
            } else if (n2 == n1.nextSibling) {
                p.insertBefore(n2, n1);
            } else {
                n1.parentNode.replaceChild(n2, n1);
                p.insertBefore(n1, s);
            }
        }
    },

    /**
     * Returns the current scroll position
     * @private
     */
    getScroll: function () {
        var doc   = window.document,
            docEl = doc.documentElement,
            body  = doc.body,
            top   = 0,
            left  = 0;

        if (Ext.isGecko4) {
            top  = window.scrollYOffset;
            left = window.scrollXOffset;
        } else {
            if (docEl && (docEl.scrollTop || docEl.scrollLeft)) {
                top  = docEl.scrollTop;
                left = docEl.scrollLeft;
            } else if (body) {
                top  = body.scrollTop;
                left = body.scrollLeft;
            }
        }
        return {
            top: top,
            left: left
        };
    },

    /**
     * Returns the specified element style property
     * @param {HTMLElement} el          the element
     * @param {String}      styleProp   the style property
     * @return {String} The value of the style property
     */
    getStyle: function(el, styleProp) {
        return Ext.fly(el).getStyle(styleProp);
    },

    /**
     * Gets the scrollTop
     * @return {Number} the document's scrollTop
     */
    getScrollTop: function () {
        return this.getScroll().top;
    },

    /**
     * Gets the scrollLeft
     * @return {Number} the document's scrollTop
     */
    getScrollLeft: function () {
        return this.getScroll().left;
    },

    /**
     * Sets the x/y position of an element to the location of the
     * target element.
     * @param {HTMLElement} moveEl      The element to move
     * @param {HTMLElement} targetEl    The position reference element
     */
    moveToEl: function (moveEl, targetEl) {
        var aCoord = Ext.Element.getXY(targetEl);
        Ext.Element.setXY(moveEl, aCoord);
    },

    /**
     * Numeric array sort function
     * @param {Number} a
     * @param {Number} b
     * @returns {Number} positive, negative or 0
     */
    numericSort: function(a, b) {
        return (a - b);
    },

    /**
     * @property {Number} _timeoutCount
     * Internal counter
     * @private
     */
    _timeoutCount: 0,

    /**
     * Trying to make the load order less important.  Without this we get
     * an error if this file is loaded before the Event Utility.
     * @private
     */
    _addListeners: function() {
        if ( document ) {
            this._onLoad();
        } else {
            if (this._timeoutCount <= 2000) {
                setTimeout(this._addListeners, 10);
                if (document && document.body) {
                    this._timeoutCount += 1;
                }
            }
        }
    },

    /**
     * Recursively searches the immediate parent and all child nodes for
     * the handle element in order to determine wheter or not it was
     * clicked.
     * @param {HTMLElement} node the html element to inspect
     */
    handleWasClicked: function(node, id) {
        if (this.isHandle(id, node.id)) {
            return true;
        } else {
            // check to see if this is a text node child of the one we want
            var p = node.parentNode;

            while (p) {
                if (this.isHandle(id, p.id)) {
                    return true;
                } else {
                    p = p.parentNode;
                }
            }
        }

        return false;
    }
}, function() {
    this._addListeners();
});
