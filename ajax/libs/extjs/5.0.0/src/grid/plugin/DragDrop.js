/**
 * This plugin provides drag and/or drop functionality for a {@link Ext.grid.View GridView}.
 *
 * It creates a specialized instance of {@link Ext.dd.DragZone DragZone} which knows how to drag out of a {@link
 * Ext.grid.View GridView} and loads the data object which is passed to a cooperating {@link Ext.dd.DragZone DragZone}'s
 * methods with the following properties:
 *
 * - `copy` : {@link Boolean}
 *
 *   The value of the {@link Ext.grid.View GridView}'s `copy` property, or `true` if the GridView was configured with `allowCopy: true` _and_
 *   the control key was pressed when the drag operation was begun.
 *
 * - `view` : {@link Ext.grid.View GridView}
 *
 *   The source GridView from which the drag originated.
 *
 * - `ddel` : HTMLElement
 *
 *   The drag proxy element which moves with the mouse
 *
 * - `item` : HTMLElement
 *
 *   The GridView node upon which the mousedown event was registered.
 *
 * - `records` : {@link Array}
 *
 *   An Array of {@link Ext.data.Model Model}s representing the selected data being dragged from the source {@link Ext.grid.View GridView}.
 *
 * It also creates a specialized instance of {@link Ext.dd.DropZone} which cooperates with other DropZones which are
 * members of the same ddGroup which processes such data objects.
 *
 * Adding this plugin to a view means that two new events may be fired from the client GridView, `{@link #beforedrop
 * beforedrop}` and `{@link #drop drop}`
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'simpsonsStore',
 *         fields:['name'],
 *         data: [["Lisa"], ["Bart"], ["Homer"], ["Marge"]],
 *         proxy: {
 *             type: 'memory',
 *             reader: 'array'
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         store: 'simpsonsStore',
 *         columns: [
 *             {header: 'Name',  dataIndex: 'name', flex: true}
 *         ],
 *         viewConfig: {
 *             plugins: {
 *                 ptype: 'gridviewdragdrop',
 *                 dragText: 'Drag and drop to reorganize'
 *             }
 *         },
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.grid.plugin.DragDrop', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.gridviewdragdrop',

    uses: [
        'Ext.view.DragZone',
        'Ext.grid.ViewDropZone'
    ],

    /**
     * @event beforedrop
     * **This event is fired through the GridView. Add listeners to the {@link Ext.grid.View GridView} object**
     *
     * Fired when a drop gesture has been triggered by a mouseup event in a valid drop position in the GridView.
     * 
     * Returning `false` to this event signals that the drop gesture was invalid, and if the drag proxy will animate
     * back to the point from which the drag began.
     * 
     * The dropHandlers parameter can be used to defer the processing of this event. For example to wait for the result of 
     * a message box confirmation or an asynchronous server call. See the details of this property for more information.
     *  
     *     @example
     *     view.on('beforedrop', function(node, data, overModel, dropPosition, dropHandlers) {
     *         // Defer the handling
     *         dropHandlers.wait = true;
     *         Ext.MessageBox.confirm('Drop', 'Are you sure', function(btn){
     *             if (btn === 'yes') {
     *                 dropHandlers.processDrop();
     *             } else {
     *                 dropHandlers.cancelDrop();
     *             }
     *         });
     *     });
     * 
     * Any other return value continues with the data transfer operation, unless the wait property is set.
     *
     * @param {HTMLElement} node The {@link Ext.grid.View GridView} node **if any** over which the mouse was positioned.
     *
     * Any other return value continues with the data transfer operation.
     *
     * @param {Object} data The data object gathered at mousedown time by the cooperating
     * {@link Ext.dd.DragZone DragZone}'s {@link Ext.dd.DragZone#getDragData getDragData} method it contains the following
     * properties:
     * @param {Boolean} data.copy The value of the GridView's `copy` property, or `true` if the GridView was configured with
     * `allowCopy: true` and the control key was pressed when the drag operation was begun
     * @param {Ext.grid.View} data.view The source GridView from which the drag originated.
     * @param {HTMLElement} data.ddel The drag proxy element which moves with the mouse
     * @param {HTMLElement} data.item The GridView node upon which the mousedown event was registered.
     * @param {Ext.data.Model[]} data.records An Array of {@link Ext.data.Model Model}s representing the selected data being
     * dragged from the source GridView.
     *
     * @param {Ext.data.Model} overModel The Model over which the drop gesture took place.
     *
     * @param {String} dropPosition `"before"` or `"after"` depending on whether the mouse is above or below the midline
     * of the node.
     *
     * @param {Object} dropHandlers
     * This parameter allows the developer to control when the drop action takes place. It is useful if any asynchronous
     * processing needs to be completed before performing the drop. This object has the following properties:
     * 
     * @param {Boolean} dropHandlers.wait Indicates whether the drop should be deferred. Set this property to true to defer the drop.
     * @param {Function} dropHandlers.processDrop A function to be called to complete the drop operation.
     * @param {Function} dropHandlers.cancelDrop A function to be called to cancel the drop operation.
     */

    /**
     * @event drop
     * **This event is fired through the GridView. Add listeners to the GridView object** Fired when a drop operation
     * has been completed and the data has been moved or copied.
     *
     * @param {HTMLElement} node The GridView node **if any** over which the mouse was positioned.
     *
     * @param {Object} data The data object gathered at mousedown time by the cooperating {@link Ext.dd.DragZone
     * DragZone}'s {@link Ext.dd.DragZone#getDragData getDragData} method it contains the following properties:
     *
     * - `copy` : {@link Boolean}
     *
     *   The value of the GridView's `copy` property, or `true` if the GridView was configured with `allowCopy: true` and
     *   the control key was pressed when the drag operation was begun
     *
     * - `view` : {@link Ext.grid.View GridView}
     *
     *   The source GridView from which the drag originated.
     *
     * - `ddel` : HTMLElement
     *
     *   The drag proxy element which moves with the mouse
     *
     * - `item` : HTMLElement
     *
     *   The {@link Ext.grid.View GridView}{@link Ext.grid.View GridView} node upon which the mousedown event was registered.
     *
     * - `records` : {@link Array}
     *
     *   An Array of {@link Ext.data.Model Model}s representing the selected data being dragged from the source GridView.
     *
     * @param {Ext.data.Model} overModel The Model over which the drop gesture took place.
     *
     * @param {String} dropPosition `"before"` or `"after"` depending on whether the mouse is above or below the midline
     * of the node.
     */
    //<locale>

    /**
     * @cfg
     * The text to show while dragging.
     *
     * Two placeholders can be used in the text:
     *
     * - `{0}` The number of selected items.
     * - `{1}` 's' when more than 1 items (only useful for English).
     */
    dragText : '{0} selected row{1}',
    //</locale>

    /**
     * @cfg {String} [ddGroup=gridDD]
     * A named drag drop group to which this object belongs. If a group is specified, then both the DragZones and
     * DropZone used by this plugin will only interact with other drag drop objects in the same group.
     */
    ddGroup : "GridDD",

    /**
     * @cfg {String} [dragGroup]
     * The {@link #ddGroup} to which the DragZone will belong.
     *
     * This defines which other DropZones the DragZone will interact with. Drag/DropZones only interact with other
     * Drag/DropZones which are members of the same {@link #ddGroup}.
     */

    /**
     * @cfg {String} [dropGroup]
     * The {@link #ddGroup} to which the DropZone will belong.
     *
     * This defines which other DragZones the DropZone will interact with. Drag/DropZones only interact with other
     * Drag/DropZones which are members of the same {@link #ddGroup}.
     */

    /**
     * @cfg {Boolean} enableDrop
     * `false` to disallow the View from accepting drop gestures.
     */
    enableDrop: true,

    /**
     * @cfg {Boolean} enableDrag
     * `false` to disallow dragging items from the View.
     */
    enableDrag: true,
    
    /**
     * `true` to register this container with the Scrollmanager for auto scrolling during drag operations.
     * A {@link Ext.dd.ScrollManager} configuration may also be passed.
     * @cfg {Object/Boolean} containerScroll
     */
    containerScroll: false,

    /**
     * @cfg {Object} [dragZone]
     * A config object to apply to the creation of the {@link #property-dragZone DragZone} which handles for drag start gestures.
     *
     * Template methods of the DragZone may be overridden using this config.
     */

    /**
     * @cfg {Object} [dropZone]
     * A config object to apply to the creation of the {@link #property-dropZone DropZone} which handles mouseover and drop gestures.
     *
     * Template methods of the DropZone may be overridden using this config.
     */

    /**
     * @property {Ext.view.DragZone} dragZone
     * An {@link Ext.view.DragZone DragZone} which handles mousedown and dragging of records from the grid.
     */

    /**
     * @property {Ext.grid.ViewDropZone} dropZone
     * An {@link Ext.grid.ViewDropZone DropZone} which handles mouseover and dropping records in any grid which shares the same {@link #dropGroup}.
     */

    init : function(view) {
        view.on('render', this.onViewRender, this, {single: true});
    },

    /**
     * @private
     * Component calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        Ext.destroy(this.dragZone, this.dropZone);
    },

    enable: function() {
        var me = this;
        if (me.dragZone) {
            me.dragZone.unlock();
        }
        if (me.dropZone) {
            me.dropZone.unlock();
        }
        me.callParent();
    },

    disable: function() {
        var me = this;
        if (me.dragZone) {
            me.dragZone.lock();
        }
        if (me.dropZone) {
            me.dropZone.lock();
        }
        me.callParent();
    },

    onViewRender : function(view) {
        var me = this,
            scrollEl;

        if (me.enableDrag) {
            if (me.containerScroll) {
                scrollEl = view.getEl();
            }

            me.dragZone = new Ext.view.DragZone(Ext.apply({
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                containerScroll: me.containerScroll,
                scrollEl: scrollEl
            }, me.dragZone));
        }

        if (me.enableDrop) {
            me.dropZone = new Ext.grid.ViewDropZone(Ext.apply({
                view: view,
                ddGroup: me.dropGroup || me.ddGroup
            }, me.dropZone));
        }
    }
});
