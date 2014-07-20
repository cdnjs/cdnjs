/**
 * A toolbar that displays hierarchical data from a {@link Ext.data.TreeStore TreeStore}
 * as a trail of breadcrumb buttons.  Each button represents a node in the store.  A click
 * on a button will "select" that node in the tree.  Non-leaf nodes will display their
 * child nodes on a dropdown menu of the corresponding button in the breadcrumb trail,
 * and a click on an item in the menu will trigger selection of the corresponding child
 * node.
 *
 * The selection can be set programmatically  using {@link #setSelection}, or retrieved
 * using {@link #getSelection}.
 */
Ext.define('Ext.toolbar.Breadcrumb', {
    extend: 'Ext.Container',
    xtype: 'breadcrumb',
    requires: [
        'Ext.data.TreeStore',
        'Ext.button.Split'
    ],

    isBreadcrumb: true,
    baseCls: Ext.baseCSSPrefix + 'breadcrumb',

    layout: 'hbox',

    config: {
        /**
         * @cfg {String} [buttonUI='plain-toolbar']
         * Button UI to use for breadcrumb items.  Use {@link #extjs-breadcrumb-arrow} to
         * add special styling to the breadcrumb arrows
         */
        buttonUI: 'plain-toolbar',

        /**
         * @cfg {String} [displayFieldName=text]
         * The name of the field in the data model to display in the navigation items of
         * this breadcrumb toolbar
         */
        displayField: 'text',

        /**
         * @cfg {String} [overflowHandler=null]
         * The overflowHandler for this Breadcrumb:
         *
         * - `null` - hidden overflow
         * - `'scroller'` to render left/right scroller buttons on either side of the breadcrumb
         * - `'menu'` to render the overflowing buttons as items of an overflow menu.
         */
        overflowHandler: null,

        /**
         * @cfg {Boolean} [showIcons=null]
         *
         * Controls whether or not icons of tree nodes are displayed in the breadcrumb
         * buttons.  There are 3 possible values for this config:
         *
         * 1. unspecified (`null`) - the default value. In this mode only icons that are
         * specified in the tree data using ({@link Ext.data.NodeInterface#icon icon}
         * or {@link Ext.data.NodeInterface#iconCls iconCls} will be displayed, but the
         * default "folder" and "leaf" icons will not be displayed.
         *
         * 2. `true` - Icons specified in the tree data will be displayed, and the default
         * "folder" and "leaf" icons will be displayed for nodes that do not specify
         * an `icon` or `iconCls`.
         *
         * 3. `false` - No icons will be displayed in the breadcrumb buttons, only text.
         */
        showIcons: null,

        /**
         * @cfg {Ext.data.TreeStore} store
         * The TreeStore that this breadcrumb toolbar should use as its data source
         */
        store: null,

        /**
         * @cfg {Boolean} [useSplitButtons=true]
         * `false` to use regular {@link Ext.button.Button Button}s instead of {@link
         * Ext.button.Split Split Buttons}.  When `true`, a click on the body of a button
         * will navigate to the specified node, and a click on the arrow will show a menu
         * containing the the child nodes.  When `false`, the only mode of navigation is
         * the menu, since a click anywhere on the button will show the menu.
         */
        useSplitButtons: true
    },

    renderConfig: {
        /**
         * @cfg {Ext.data.TreeModel/String} selection
         * The selected node, or `"root"` to select the root node
         */
        selection: 'root'
    },

    _breadcrumbCls: Ext.baseCSSPrefix + 'breadcrumb',
    _btnCls: Ext.baseCSSPrefix + 'breadcrumb-btn',
    _folderIconCls: Ext.baseCSSPrefix + 'breadcrumb-icon-folder',
    _leafIconCls: Ext.baseCSSPrefix + 'breadcrumb-icon-leaf',

    initComponent: function() {
        var me = this,
            layout = this.layout,
            overflowHandler = me.getOverflowHandler();

        if (typeof layout === 'string') {
            layout = {
                type: layout
            };
        }

        if (overflowHandler) {
            layout.overflowHandler = overflowHandler;
        }

        this.layout = layout;

        // set defaultButtonUI for possible menu overflow handler.
        this.defaultButtonUI = this.getButtonUI();

        //<debug>
        if (!this.getStore()) {
            Ext.Error.raise('Ext.toolbar.Breadcrumb requires a store');
        }
        //</debug>

        /**
         * Internal cache of buttons that are re-purposed as the items of this container
         * as navigation occurs.
         * @property {Ext.button.Split[]} buttons
         * @private
         */
        me._buttons = [];

        me.addCls([me._breadcrumbCls, me._breadcrumbCls + '-' + me.ui]);

        me.callParent();
    },

    onDestroy: function() {
        this._buttons = Ext.destroy(this._buttons);
        this.callParent();
    },

    afterComponentLayout: function() {
        var me = this,
            overflowHandler = me.layout.overflowHandler;

        me.callParent(arguments);

        if (overflowHandler && me.tooNarrow && overflowHandler.scrollToItem) {
            overflowHandler.scrollToItem(me.getSelection().get('depth'));
        }
    },

    applySelection: function(node) {
        return (node === 'root') ? this.getStore().getRoot() : node;
    },

    updateSelection: function(node) {
        var me = this,
            buttons = me._buttons,
            items = [],
            itemCount = me.items.getCount(),
            needsSync = me._needsSync,
            displayField = me.getDisplayField(),
            showIcons, iconCls, icon, newItemCount, currentNode, text, button, id, depth, i;

        Ext.suspendLayouts();

        if (node) {
            currentNode = node;
            depth = node.get('depth');
            newItemCount = depth + 1;
            i = depth;

            while (currentNode) {
                id = currentNode.getId();

                button = buttons[i];

                if (!needsSync && button && button._breadcrumbNodeId === id) {
                    // reached a level in the hierarchy where we are already in sync.
                    break;
                }

                text = currentNode.get(displayField);

                if (button) {
                    // If we already have a button for this depth in the button cache reuse it
                    button.setText(text);
                } else {
                    // no button in the cache - make one and add it to the cache
                    button = buttons[i] = Ext.create({
                        xtype: me.getUseSplitButtons() ? 'splitbutton' : 'button',
                        ui: me.getButtonUI(),
                        cls: me._btnCls + ' ' + me._btnCls + '-' + me.ui,
                        text: text,
                        showEmptyMenu: true,
                        // begin with an empty menu - items are populated on beforeshow
                        menu: {
                            listeners: {
                                click: '_onMenuClick',
                                beforeshow: '_onMenuBeforeShow',
                                scope: this
                            }
                        },
                        handler: '_onButtonClick',
                        scope: me
                    });
                }

                showIcons = this.getShowIcons();

                if (showIcons !== false) {
                    icon = currentNode.get('icon');
                    iconCls = currentNode.get('iconCls');

                    if (icon) {
                        button.setIconCls(null);
                        button.setIcon(icon);
                    } else if (iconCls) {
                        button.setIcon(null);
                        button.setIconCls(iconCls);
                    } else if (showIcons) {
                        // only show default icons if showIcons === true
                        button.setIcon(null);
                        button.setIconCls(
                            (currentNode.isLeaf() ? me._leafIconCls : me._folderIconCls) + '-' + me.ui
                        );
                    } else {
                        // if showIcons is null do not show default icons
                        button.setIcon(null);
                        button.setIconCls(null);
                    }
                }

                button.setArrowVisible(currentNode.hasChildNodes());
                button._breadcrumbNodeId = currentNode.getId();

                currentNode = currentNode.parentNode;
                i--;
            }

            if (newItemCount > itemCount) {
                // new selection has more buttons than existing selection, add the new buttons
                items = buttons.slice(itemCount, depth + 1);
                me.add(items);
            } else {
                // new selection has fewer buttons, remove the extra ones from the items, but
                // do not destroy them, as they are returned to the cache and recycled.
                for (i = itemCount - 1; i >= newItemCount; i--) {
                    me.remove(me.items.items[i], false);
                }
            }

        } else {
            // null selection
            me.removeAll(false);
        }

        Ext.resumeLayouts(true);

        /**
         * @event selectionchange
         * Fires when the selected node changes
         * @param {Ext.toolbar.Breadcrumb} this
         * @param {Ext.data.TreeModel} node The selected node (or null if there is no selection)
         */
        me.fireEvent('selectionchange', me, node);

        me._needsSync = false;
    },

    applyUseSplitButtons: function(useSplitButtons, oldUseSplitButtons) {
        if (this.rendered && useSplitButtons !== oldUseSplitButtons) {
            Ext.Error.raise("Cannot reconfigure 'useSplitButtons' config of Ext.toolbar.Breadcrumb after initial render");
        }
        return useSplitButtons;
    },

    updateStore: function(store, oldStore) {
        this._needsSync = true;

        if (oldStore) {
            this.setSelection(store.getRoot());
        }
    },

    //<debug>
    updateOverflowHandler: function(overflowHandler) {
        if (overflowHandler === 'menu') {
            Ext.Error.raise("Using Menu overflow with breadcrumb is not currently supported.");
        }
    },
    //</debug>

    privates: {
        /**
         * Handles a click on a breadcrumb button
         * @private
         * @param {Ext.button.Split} button
         * @param {Ext.event.Event} e
         */
        _onButtonClick: function(button, e) {
            if (this.getUseSplitButtons()) {
                this.setSelection(this.getStore().getNodeById(button._breadcrumbNodeId));
            }
        },

        /**
         * Handles a click on a button menu
         * @private
         * @param {Ext.menu.Menu} menu
         * @param {Ext.menu.Item} item
         * @param {Ext.event.Event} e
         */
        _onMenuClick: function(menu, item, e) {
            this.setSelection(this.getStore().getNodeById(item._breadcrumbNodeId));
        },

        /**
         * Handles the `beforeshow` event of a button menu
         * @private
         * @param {Ext.menu.Menu} menu
         */
        _onMenuBeforeShow: function(menu) {
            var node = this.getStore().getNodeById(menu.ownerButton._breadcrumbNodeId),
                displayField = this.getDisplayField(),
                childNodes, childNode, items, i, ln;


            if (node.hasChildNodes()) {
                childNodes = node.childNodes;
                items = [];

                for (i = 0, ln = childNodes.length; i < ln; i++) {
                    childNode = childNodes[i];
                    items.push({
                        text: childNode.get(displayField),
                        _breadcrumbNodeId: childNode.getId()
                    });
                }

                menu.removeAll();
                menu.add(items);
            } else {
                // prevent menu from being shown for nodes with no children
                return false;
            }
        }
    }
});
