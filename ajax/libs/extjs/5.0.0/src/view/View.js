/**
 * A mechanism for displaying data using custom layout templates and formatting.
 *
 * The View uses an {@link Ext.XTemplate} as its internal templating mechanism, and is bound to an
 * {@link Ext.data.Store} so that as the data in the store changes the view is automatically updated
 * to reflect the changes. The view also provides built-in behavior for many common events that can
 * occur for its contained items including click, doubleclick, mouseover, mouseout, etc. as well as a
 * built-in selection model. **In order to use these features, an {@link #itemSelector} config must
 * be provided for the View to determine what nodes it will be working with.**
 *
 * The example below binds a View to a {@link Ext.data.Store} and renders it into an {@link Ext.panel.Panel}.
 *
 *     @example
 *     Ext.define('Image', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name:'src', type:'string' },
 *             { name:'caption', type:'string' }
 *         ]
 *     });
 *
 *     Ext.create('Ext.data.Store', {
 *         id:'imagesStore',
 *         model: 'Image',
 *         data: [
 *             { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
 *             { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
 *             { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
 *             { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
 *         ]
 *     });
 *
 *     var imageTpl = new Ext.XTemplate(
 *         '<tpl for=".">',
 *             '<div style="margin-bottom: 10px;" class="thumb-wrap">',
 *               '<img src="{src}" />',
 *               '<br/><span>{caption}</span>',
 *             '</div>',
 *         '</tpl>'
 *     );
 *
 *     Ext.create('Ext.view.View', {
 *         store: Ext.data.StoreManager.lookup('imagesStore'),
 *         tpl: imageTpl,
 *         itemSelector: 'div.thumb-wrap',
 *         emptyText: 'No images available',
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.view.View', {
    extend: 'Ext.view.AbstractView',
    alternateClassName: 'Ext.DataView',
    alias: 'widget.dataview',

    inputTagRe: /^textarea$|^input$/i,

    inheritableStatics: {
        EventMap: {
            longpress: 'LongPress',
            mousedown: 'MouseDown',
            mouseup: 'MouseUp',
            click: 'Click',
            dblclick: 'DblClick',
            contextmenu: 'ContextMenu',
            mouseover: 'MouseOver',
            mouseout: 'MouseOut',
            mouseenter: 'MouseEnter',
            mouseleave: 'MouseLeave',
            keydown: 'KeyDown',
            focus: 'Focus'
        },
        TouchEventMap: {
            touchstart: 'mousedown',
            touchend: 'mouseup',
            tap: 'click',
            doubletap: 'dblclick'
        }
    },

    /**
     * @event beforeitemmousedown
     * Fires before the mousedown event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemmouseup
     * Fires before the mouseup event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemmouseenter
     * Fires before the mouseenter event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemmouseleave
     * Fires before the mouseleave event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemclick
     * Fires before the click event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemdblclick
     * Fires before the dblclick event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemcontextmenu
     * Fires before the contextmenu event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforeitemkeydown
     * Fires before the keydown event on an item is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object. Use {@link Ext.event.Event#getKey getKey()} to retrieve the key that was pressed.
     */

    /**
     * @event itemmousedown
     * Fires when there is a mouse down on an item
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemmouseup
     * Fires when there is a mouse up on an item
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemmouseenter
     * Fires when the mouse enters an item.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemmouseleave
     * Fires when the mouse leaves an item.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemclick
     * Fires when an item is clicked.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemdblclick
     * Fires when an item is double clicked.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemcontextmenu
     * Fires when an item is right clicked.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event itemkeydown
     * Fires when a key is pressed while an item is currently selected.
     * @param {Ext.view.View} this
     * @param {Ext.data.Model} record The record that belongs to the item
     * @param {HTMLElement} item The item's element
     * @param {Number} index The item's index
     * @param {Ext.event.Event} e The raw event object. Use {@link Ext.event.Event#getKey getKey()} to retrieve the key that was pressed.
     */

    /**
     * @event beforecontainermousedown
     * Fires before the mousedown event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainermouseup
     * Fires before the mouseup event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainermouseover
     * Fires before the mouseover event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainermouseout
     * Fires before the mouseout event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainerclick
     * Fires before the click event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainerdblclick
     * Fires before the dblclick event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainercontextmenu
     * Fires before the contextmenu event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event beforecontainerkeydown
     * Fires before the keydown event on the container is processed. Returns false to cancel the default action.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object. Use {@link Ext.event.Event#getKey getKey()} to retrieve the key that was pressed.
     */

    /**
     * @event containermousedown
     * Fires when there is a mousedown on the container
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containermouseup
     * Fires when there is a mouseup on the container
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containermouseover
     * Fires when you move the mouse over the container.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containermouseout
     * Fires when you move the mouse out of the container.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containerclick
     * Fires when the container is clicked.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containerdblclick
     * Fires when the container is double clicked.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containercontextmenu
     * Fires when the container is right clicked.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object
     */

    /**
     * @event containerkeydown
     * Fires when a key is pressed while the container is focused, and no item is currently selected.
     * @param {Ext.view.View} this
     * @param {Ext.event.Event} e The raw event object. Use {@link Ext.event.Event#getKey getKey()} to retrieve the key that was pressed.
     */

    /**
     * @event selectionchange
     * @inheritdoc Ext.selection.DataViewModel#selectionchange
     */

    /**
     * @event beforeselect
     * @inheritdoc Ext.selection.DataViewModel#beforeselect
     */

    /**
     * @event beforedeselect
     * @inheritdoc Ext.selection.DataViewModel#beforedeselect
     */

    /**
     * @event select
     * @inheritdoc Ext.selection.DataViewModel#select
     */

    /**
     * @event deselect
     * @inheritdoc Ext.selection.DataViewModel#deselect
     */

    /**
     * @event focuschange
     * @inheritdoc Ext.selection.DataViewModel#focuschange
     */

    /**
     * @event highlightitem
     * Fires when a node is highlighted using keyboard navigation, or mouseover.
     * @param {Ext.view.View} view This View Component.
     * @param {Ext.dom.Element} node The highlighted node.
     */

    /**
     * @event unhighlightitem
     * Fires when a node is unhighlighted using keyboard navigation, or mouseout.
     * @param {Ext.view.View} view This View Component.
     * @param {Ext.dom.Element} node The previously highlighted node.
     */

    afterRender: function() {
        var me = this;

        me.callParent();
        me.mon(me.el, {
            scope: me,
            click: me.handleEvent,
            longpress: me.handleEvent,
            mousedown: me.handleEvent,
            mouseup: me.handleEvent,
            dblclick: me.handleEvent,
            contextmenu: me.handleEvent,
            keydown: me.handleEvent,
            mouseover: me.handleMouseOver,
            mouseout: me.handleMouseOut
        });
    },

    // Can be overridden by features or anything that needs to use a specific selector as a target.
    getTargetSelector: function () {
        return this.dataRowSelector || this.itemSelector;
    },

    handleMouseOver: function(e) {
        var me = this,
        // this.getTargetSelector() can be used as a template method, e.g., in features.
            itemSelector = me.getTargetSelector(),
            item = e.getTarget(itemSelector);

        // If mouseover/out handling is buffered, view might have been destyroyed during buffer time.
        if (!me.isDestroyed) {
            if (item) {
                if (me.mouseOverItem !== item && me.el.contains(item)) {
                    me.mouseOverItem = e.item = item;
                    e.newType = 'mouseenter';
                    me.handleEvent(e);
                }
            } else {
                // We're not over an item, so handle a container event.
                me.handleEvent(e);
            }
        }
    },

    handleMouseOut: function (e) {
        var itemSelector = this.getTargetSelector(),
            item = e.getTarget(itemSelector),
            computedRelatedTarget = e.getRelatedTarget(itemSelector),
            sourceView;

        // We can only exit early when mousing within the same row, but we can't simply do an equality check
        // since it's valid for both item and computedRelatedTarget to be null!
        if ((item === computedRelatedTarget) && !(item === null && computedRelatedTarget === null)) {
            return;
        }

        // Note that a mouseout event can trigger either an item event or a container event.
        // If mouseover/out handling is buffered, view might have been destroyed during buffer time.
        if (!this.isDestroyed) {
            // Yes, this is an assignment.
            if (item && (sourceView = this.self.getBoundView(item))) {
                e.item = item;
                e.newType = 'mouseleave';
                sourceView.handleEvent(e);
                sourceView.mouseOverItem = null;
            } else {
                // We're not over an item, so handle a container event.
                this.handleEvent(e);
            }
        }
    },

    handleEvent: function(e) {
        var me = this,
            isKeydown = e.type === 'keydown',
            key = isKeydown && e.getKey(),
            sm;

        if (!e.item) {
            e.item = e.getTarget(me.itemSelector);
        }

        if (e.item) {
            e.record = me.getRecord(e.item);
        }
        // For keydown events, try to get either the last focused item or the selected item.
        // If we have not focused an item, we'll just fire a container keydown event.
        else if (isKeydown) {
            sm = me.getSelectionModel();
            e.record = sm.lastFocused || sm.getLastSelected();
            if (e.record) {
                e.item = me.getNode(e.record);
            }
        }

        if (me.processUIEvent(e) !== false) {
            me.processSpecialEvent(e);
        }

        // After all listeners have processed the event, then unless the user is typing into an input field,
        // prevent browser's default action on SPACE which is to focus the event's target element.
        // Focusing causes the browser to attempt to scroll the element into view.
        if (key === e.SPACE) {
            if (!me.inputTagRe.test(e.getTarget().tagName)) {
                e.stopEvent();
            }
        }
        e.item = e.record = e.newType = null;
    },

    // Private template method
    processItemEvent: Ext.emptyFn,
    processContainerEvent: Ext.emptyFn,
    processSpecialEvent: Ext.emptyFn,

    processUIEvent: function(e) {

        // If the target event has been removed from the body (data update causing view DOM to be updated),
        // do not process. isAncestor uses native methods to check.
        if (!Ext.getBody().isAncestor(e.target)) {
            return;
        }

        var me = this,
            item = e.item,
            self = me.self,
            map = self.EventMap,
            touchMap = self.TouchEventMap,
            index,
            record = e.record,
            type = e.type,
            newType = type;

        // If the event is a mouseover/mouseout event converted to a mouseenter/mouseleave,
        // use that event type.
        if (e.newType) {
            newType = e.newType;
        }

        if (item) {
            newType = touchMap[newType] || newType;
            index = me.indexInStore ? me.indexInStore(record) : me.indexOf(item);

            // It is possible for an event to arrive for which there is no record... this
            // can happen with dblclick where the clicks are on removal actions (think a
            // grid w/"delete row" action column) or if the record was in a page that was
            // pruned by a buffered store.
            if (!record || me.processItemEvent(record, item, index, e) === false) {
                return false;
            }

            if (
                (me['onBeforeItem' + map[newType]](record, item, index, e) === false) ||
                (me.fireEvent('beforeitem' + newType, me, record, item, index, e) === false) ||
                (me['onItem' + map[newType]](record, item, index, e) === false)
            ) {
                return false;
            }

            me.fireEvent('item' + newType, me, record, item, index, e);
        }
        else {
            type = touchMap[type] || type;
            if (
                (me.processContainerEvent(e) === false) ||
                (me['onBeforeContainer' + map[type]](e) === false) ||
                (me.fireEvent('beforecontainer' + type, me, e) === false) ||
                (me['onContainer' + map[type]](e) === false)
            ) {
                return false;
            }

            me.fireEvent('container' + type, me, e);
        }

        return true;
    },

    // @private
    onItemMouseEnter: function(record, item, index, e) {
        if (this.trackOver) {
            this.highlightItem(item);
        }
    },

    // @private
    onItemMouseLeave : function(record, item, index, e) {
        if (this.trackOver) {
            this.clearHighlight();
        }
    },

    // private, template methods
    onItemMouseDown: Ext.emptyFn,
    onItemLongPress: Ext.emptyFn,
    onItemMouseUp: Ext.emptyFn,
    onItemFocus: Ext.emptyFn,
    onItemClick: Ext.emptyFn,
    onItemDblClick: Ext.emptyFn,
    onItemContextMenu: Ext.emptyFn,
    onItemKeyDown: Ext.emptyFn,
    onBeforeItemLongPress: Ext.emptyFn,
    onBeforeItemMouseDown: Ext.emptyFn,
    onBeforeItemMouseUp: Ext.emptyFn,
    onBeforeItemFocus: Ext.emptyFn,
    onBeforeItemMouseEnter: Ext.emptyFn,
    onBeforeItemMouseLeave: Ext.emptyFn,
    onBeforeItemClick: Ext.emptyFn,
    onBeforeItemDblClick: Ext.emptyFn,
    onBeforeItemContextMenu: Ext.emptyFn,
    onBeforeItemKeyDown: Ext.emptyFn,

    // private, template methods
    onContainerMouseDown: Ext.emptyFn,
    onContainerLongPress: Ext.emptyFn,
    onContainerMouseUp: Ext.emptyFn,
    onContainerMouseOver: Ext.emptyFn,
    onContainerMouseOut: Ext.emptyFn,
    onContainerClick: Ext.emptyFn,
    onContainerDblClick: Ext.emptyFn,
    onContainerContextMenu: Ext.emptyFn,
    onContainerKeyDown: Ext.emptyFn,
    onBeforeContainerMouseDown: Ext.emptyFn,
    onBeforeContainerLongPress: Ext.emptyFn,
    onBeforeContainerMouseUp: Ext.emptyFn,
    onBeforeContainerMouseOver: Ext.emptyFn,
    onBeforeContainerMouseOut: Ext.emptyFn,
    onBeforeContainerClick: Ext.emptyFn,
    onBeforeContainerDblClick: Ext.emptyFn,
    onBeforeContainerContextMenu: Ext.emptyFn,
    onBeforeContainerKeyDown: Ext.emptyFn,

    // @private
    
    setHighlightedItem: function(item){
        var me = this,
            highlighted = me.highlightedItem,
            overItemCls = me.overItemCls;

        if (highlighted !== item){
            if (highlighted) {
                Ext.fly(highlighted).removeCls(overItemCls);
                //<feature legacyBrowser>
                // Work around for an issue in IE8 where the focus/over/selected borders do not
                // get updated where applied using adjacent sibling selectors.
                if (Ext.isIE8) {
                    me.repaintBorder(highlighted);
                    me.repaintBorder(highlighted.nextSibling);
                }
                //</feature>
                if (me.hasListeners.unhighlightitem) {
                    me.fireEvent('unhighlightitem', me, highlighted);
                }
            }

            me.highlightedItem = item;

            if (item) {
                Ext.fly(item).addCls(me.overItemCls);
                //<feature legacyBrowser>
                // Work around for an issue in IE8 where the focus/over/selected borders do not
                // get updated where applied using adjacent sibling selectors.
                if (Ext.isIE8) {
                    me.repaintBorder(item.nextSibling);
                }
                //</feature>
                if (me.hasListeners.highlightitem) {
                    me.fireEvent('highlightitem', me, item);
                }
            }
        }
    },

    /**
     * Highlights a given item in the View. This is called by the mouseover handler if {@link #overItemCls}
     * and {@link #trackOver} are configured, but can also be called manually by other code, for instance to
     * handle stepping through the list via keyboard navigation.
     * @param {HTMLElement} item The item to highlight
     */
    highlightItem: function(item) {
        this.setHighlightedItem(item);
    },

    /**
     * Un-highlights the currently highlighted item, if any.
     */
    clearHighlight: function() {
        this.setHighlightedItem(undefined);
    },

    handleUpdate: function(store, record){
        var me = this,
            node,
            newNode,
            highlighted;

        if (me.viewReady) {
            node = me.getNode(record);
            newNode = me.callParent(arguments);
            highlighted = me.highlightedItem;

            if (highlighted && highlighted === node) {
                delete me.highlightedItem;
                if (newNode) {
                    me.highlightItem(newNode);
                }
            }
        }
    },

    refresh: function() {
        this.clearHighlight();
        this.callParent(arguments);
    },

    /**
     * Focuses a node in the view.
     * @param {Ext.data.Model} rec The record associated to the node that is to be focused.
     */
    focusNode: function(rec){
        var me          = this,
            node        = me.getNode(rec),
            el          = me.el,
            adjustmentY = 0,
            adjustmentX = 0,
            elRegion    = el.getRegion(),
            nodeRegion;

        // Viewable region must not include scrollbars, so use
        // DOM client dimensions
        elRegion.bottom = elRegion.top + el.dom.clientHeight;
        elRegion.right = elRegion.left + el.dom.clientWidth;
        if (node) {
            nodeRegion = Ext.fly(node).getRegion();
            // node is above
            if (nodeRegion.top < elRegion.top) {
                adjustmentY = nodeRegion.top - elRegion.top;
            // node is below
            } else if (nodeRegion.bottom > elRegion.bottom) {
                adjustmentY = nodeRegion.bottom - elRegion.bottom;
            }

            // node is left
            if (nodeRegion.left < elRegion.left) {
                adjustmentX = nodeRegion.left - elRegion.left;
            // node is right
            } else if (nodeRegion.right > elRegion.right) {
                adjustmentX = nodeRegion.right - elRegion.right;
            }

            if (adjustmentX || adjustmentY) {
                me.scrollBy(adjustmentX, adjustmentY, false);
            }

            // Poke on a tabIndex to make the node focusable.
            Ext.fly(node).set({
                tabIndex: -1
            });

            node.focus();
        }
    },

    bindStore: function (store, initial, propertyName) {
        // There could be different data sources (store or dataSource), so figure that out here.
        var dataSource = this[propertyName];

        if (dataSource && dataSource.isFeatureStore) {
            // Feature stores will call their own implementation of .bindStore().
            //
            // The passed 'store' function arg will be one of two types depending on the caller.
            //    1. regular data store
            //    2. grid feature store (data store is bound to it in featureStore.store).
            if (store.isFeatureStore) {
                // The store listeners need to be bound to the feature store.
                this.bindStoreListeners(store);
                // Pass in the regular data store.
                dataSource.bindStore(dataSource.store);
            } else {
                dataSource.bindStore(store);
            }
        } else {
            this.callParent(arguments);
        }
    },

    privates: {
        //<feature legacyBrowser>
        // Work around for an issue in IE8 where the focus/over/selected borders do not
        // get updated where applied using adjacent sibling selectors.
        repaintBorder: function(rowIdx) {
            var node = this.getNode(rowIdx);

            if (node) {
                node.className = node.className;
            }
        },
        //</feature>

        getFocusEl: function() {
            return this.getTargetEl();
        }
    }
});
