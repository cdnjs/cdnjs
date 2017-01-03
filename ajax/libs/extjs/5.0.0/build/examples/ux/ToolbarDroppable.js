/**
 * Plugin which allows items to be dropped onto a toolbar and be turned into new Toolbar items.
 * To use the plugin, you just need to provide a createItem implementation that takes the drop
 * data as an argument and returns an object that can be placed onto the toolbar. Example:
 * <pre>
 * Ext.create('Ext.ux.ToolbarDroppable', {
 *   createItem: function(data) {
 *     return Ext.create('Ext.Button', {text: data.text});
 *   }
 * });
 * </pre>
 * The afterLayout function can also be overridden, and is called after a new item has been
 * created and inserted into the Toolbar. Use this for any logic that needs to be run after
 * the item has been created.
 */
 Ext.define('Ext.ux.ToolbarDroppable', {

    /**
     * Creates new ToolbarDroppable.
     * @param {Object} config Config options.
     */
    constructor: function(config) {
      Ext.apply(this, config);
    },

    /**
     * Initializes the plugin and saves a reference to the toolbar
     * @param {Ext.toolbar.Toolbar} toolbar The toolbar instance
     */
    init: function(toolbar) {
      /**
       * @property toolbar
       * @type Ext.toolbar.Toolbar
       * The toolbar instance that this plugin is tied to
       */
      this.toolbar = toolbar;

      this.toolbar.on({
          scope : this,
          render: this.createDropTarget
      });
    },

    /**
     * Creates a drop target on the toolbar
     */
    createDropTarget: function() {
        /**
         * @property dropTarget
         * @type Ext.dd.DropTarget
         * The drop target attached to the toolbar instance
         */
        this.dropTarget = Ext.create('Ext.dd.DropTarget', this.toolbar.getEl(), {
            notifyOver: Ext.Function.bind(this.notifyOver, this),
            notifyDrop: Ext.Function.bind(this.notifyDrop, this)
        });
    },

    /**
     * Adds the given DD Group to the drop target
     * @param {String} ddGroup The DD Group
     */
    addDDGroup: function(ddGroup) {
        this.dropTarget.addToGroup(ddGroup);
    },

    /**
     * Calculates the location on the toolbar to create the new sorter button based on the XY of the
     * drag event
     * @param {Ext.event.Event} e The event object
     * @return {Number} The index at which to insert the new button
     */    
    calculateEntryIndex: function(e) {
        var entryIndex = 0,
            toolbar = this.toolbar,
            items = toolbar.items.items,
            count = items.length,
            xHover = e.getXY()[0],
            index = 0,
            el, xTotal, width, midpoint;
 
        for (; index < count; index++) {
            el = items[index].getEl();
            xTotal = el.getXY()[0];
            width = el.getWidth();
            midpoint = xTotal + width / 2;
 
            if (xHover < midpoint) {
                entryIndex = index; 
                break;
            } else {
                entryIndex = index + 1;
            }
       }
       return entryIndex;
    },

    /**
     * Returns true if the drop is allowed on the drop target. This function can be overridden
     * and defaults to simply return true
     * @param {Object} data Arbitrary data from the drag source
     * @return {Boolean} True if the drop is allowed
     */
    canDrop: function(data) {
        return true;
    },

    /**
     * Custom notifyOver method which will be used in the plugin's internal DropTarget
     * @return {String} The CSS class to add
     */
    notifyOver: function(dragSource, event, data) {
        return this.canDrop.apply(this, arguments) ? this.dropTarget.dropAllowed : this.dropTarget.dropNotAllowed;
    },

    /**
     * Called when the drop has been made. Creates the new toolbar item, places it at the correct location
     * and calls the afterLayout callback.
     */
    notifyDrop: function(dragSource, event, data) {
        var canAdd = this.canDrop(dragSource, event, data),
            tbar   = this.toolbar;

        if (canAdd) {
            var entryIndex = this.calculateEntryIndex(event);

            tbar.insert(entryIndex, this.createItem(data));
            tbar.doLayout();

            this.afterLayout();
        }

        return canAdd;
    },

    /**
     * Creates the new toolbar item based on drop data. This method must be implemented by the plugin instance
     * @param {Object} data Arbitrary data from the drop
     * @return {Mixed} An item that can be added to a toolbar
     */
    createItem: function(data) {
        //<debug>
        Ext.Error.raise("The createItem method must be implemented in the ToolbarDroppable plugin");
        //</debug>
    },

    /**
     * Called after a new button has been created and added to the toolbar. Add any required cleanup logic here
     */
    afterLayout: Ext.emptyFn
});
