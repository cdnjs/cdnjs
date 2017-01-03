/*
 * This is a derivative of the similarly named class in the YUI Library.
 * The original license:
 * Copyright (c) 2006, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 */


/**
 * A DragDrop implementation that does not move, but can be a drop
 * target.  You would get the same result by simply omitting implementation
 * for the event callbacks, but this way we reduce the processing cost of the
 * event listener and the callbacks.
 */
Ext.define('Ext.dd.DDTarget', {
    extend: 'Ext.dd.DragDrop',

    /**
     * Creates new DDTarget.
     * @param {String} id the id of the element that is a drop target
     * @param {String} sGroup the group of related DragDrop objects
     * @param {Object} config an object containing configurable attributes.
     * Valid properties for DDTarget in addition to those in DragDrop: none.
     */
    constructor: function(id, sGroup, config) {
        if (id) {
            this.initTarget(id, sGroup, config);
        }
    },

    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    getDragEl: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    isValidHandleChild: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    startDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    endDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDrag: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragDrop: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragEnter: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragOut: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onDragOver: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onInvalidDrop: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onMouseDown: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    onMouseUp: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setXConstraint: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setYConstraint: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    resetConstraints: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    clearConstraints: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    clearTicks: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setInitPosition: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setDragElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setHandleElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    setOuterHandleElId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleClass: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    addInvalidHandleType: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleClass: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleId: Ext.emptyFn,
    /**
     * Overridden and disabled. A DDTarget does not support being dragged.
     * @method
     */
    removeInvalidHandleType: Ext.emptyFn,

    toString: function() {
        return ("DDTarget " + this.id);
    }
});