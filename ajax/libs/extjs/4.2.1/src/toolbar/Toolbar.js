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
/**
 * Basic Toolbar class. Although the {@link Ext.container.Container#defaultType defaultType} for
 * Toolbar is {@link Ext.button.Button button}, Toolbar elements (child items for the Toolbar container)
 * may be virtually any type of Component. Toolbar elements can be created explicitly via their
 * constructors, or implicitly via their xtypes, and can be {@link #method-add}ed dynamically.
 *
 * ## Some items have shortcut strings for creation:
 *
 * | Shortcut | xtype         | Class                         | Description
 * |:---------|:--------------|:------------------------------|:---------------------------------------------------
 * | '->'     | `tbfill`      | {@link Ext.toolbar.Fill}      | begin using the right-justified button container
 * | '-'      | `tbseparator` | {@link Ext.toolbar.Separator} | add a vertical separator bar between toolbar items
 * | ' '      | `tbspacer`    | {@link Ext.toolbar.Spacer}    | add horizontal space between elements
 *
 *     @example
 *     Ext.create('Ext.toolbar.Toolbar', {
 *         renderTo: document.body,
 *         width   : 500,
 *         items: [
 *             {
 *                 // xtype: 'button', // default for Toolbars
 *                 text: 'Button'
 *             },
 *             {
 *                 xtype: 'splitbutton',
 *                 text : 'Split Button'
 *             },
 *             // begin using the right-justified button container
 *             '->', // same as { xtype: 'tbfill' }
 *             {
 *                 xtype    : 'textfield',
 *                 name     : 'field1',
 *                 emptyText: 'enter search term'
 *             },
 *             // add a vertical separator bar between toolbar items
 *             '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
 *             'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
 *             { xtype: 'tbspacer' },// same as ' ' to create Ext.toolbar.Spacer
 *             'text 2',
 *             { xtype: 'tbspacer', width: 50 }, // add a 50px space
 *             'text 3'
 *         ]
 *     });
 *
 * Toolbars have {@link #method-enable} and {@link #method-disable} methods which when called, will
 * enable/disable all items within your toolbar.
 *
 *     @example
 *     Ext.create('Ext.toolbar.Toolbar', {
 *         renderTo: document.body,
 *         width   : 400,
 *         items: [
 *             {
 *                 text: 'Button'
 *             },
 *             {
 *                 xtype: 'splitbutton',
 *                 text : 'Split Button'
 *             },
 *             '->',
 *             {
 *                 xtype    : 'textfield',
 *                 name     : 'field1',
 *                 emptyText: 'enter search term'
 *             }
 *         ]
 *     });
 *
 * Example
 *
 *     @example
 *     var enableBtn = Ext.create('Ext.button.Button', {
 *         text    : 'Enable All Items',
 *         disabled: true,
 *         scope   : this,
 *         handler : function() {
 *             //disable the enable button and enable the disable button
 *             enableBtn.disable();
 *             disableBtn.enable();
 *
 *             //enable the toolbar
 *             toolbar.enable();
 *         }
 *     });
 *
 *     var disableBtn = Ext.create('Ext.button.Button', {
 *         text    : 'Disable All Items',
 *         scope   : this,
 *         handler : function() {
 *             //enable the enable button and disable button
 *             disableBtn.disable();
 *             enableBtn.enable();
 *
 *             //disable the toolbar
 *             toolbar.disable();
 *         }
 *     });
 *
 *     var toolbar = Ext.create('Ext.toolbar.Toolbar', {
 *         renderTo: document.body,
 *         width   : 400,
 *         margin  : '5 0 0 0',
 *         items   : [enableBtn, disableBtn]
 *     });
 *
 * Adding items to and removing items from a toolbar is as simple as calling the {@link #method-add}
 * and {@link #method-remove} methods. There is also a {@link #removeAll} method
 * which remove all items within the toolbar.
 *
 *     @example
 *     var toolbar = Ext.create('Ext.toolbar.Toolbar', {
 *         renderTo: document.body,
 *         width   : 700,
 *         items: [
 *             {
 *                 text: 'Example Button'
 *             }
 *         ]
 *     });
 *
 *     var addedItems = [];
 *
 *     Ext.create('Ext.toolbar.Toolbar', {
 *         renderTo: document.body,
 *         width   : 700,
 *         margin  : '5 0 0 0',
 *         items   : [
 *             {
 *                 text   : 'Add a button',
 *                 scope  : this,
 *                 handler: function() {
 *                     var text = prompt('Please enter the text for your button:');
 *                     addedItems.push(toolbar.add({
 *                         text: text
 *                     }));
 *                 }
 *             },
 *             {
 *                 text   : 'Add a text item',
 *                 scope  : this,
 *                 handler: function() {
 *                     var text = prompt('Please enter the text for your item:');
 *                     addedItems.push(toolbar.add(text));
 *                 }
 *             },
 *             {
 *                 text   : 'Add a toolbar separator',
 *                 scope  : this,
 *                 handler: function() {
 *                     addedItems.push(toolbar.add('-'));
 *                 }
 *             },
 *             {
 *                 text   : 'Add a toolbar spacer',
 *                 scope  : this,
 *                 handler: function() {
 *                     addedItems.push(toolbar.add('->'));
 *                 }
 *             },
 *             '->',
 *             {
 *                 text   : 'Remove last inserted item',
 *                 scope  : this,
 *                 handler: function() {
 *                     if (addedItems.length) {
 *                         toolbar.remove(addedItems.pop());
 *                     } else if (toolbar.items.length) {
 *                         toolbar.remove(toolbar.items.last());
 *                     } else {
 *                         alert('No items in the toolbar');
 *                     }
 *                 }
 *             },
 *             {
 *                 text   : 'Remove all items',
 *                 scope  : this,
 *                 handler: function() {
 *                     toolbar.removeAll();
 *                 }
 *             }
 *         ]
 *     });
 *
 * @constructor
 * Creates a new Toolbar
 * @param {Object/Object[]} config A config object or an array of buttons to {@link #method-add}
 * @docauthor Robert Dougan <rob@sencha.com>
 */
Ext.define('Ext.toolbar.Toolbar', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.toolbar.Fill',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],
    uses: [
        'Ext.toolbar.Separator'
    ],
    alias: 'widget.toolbar',
    alternateClassName: 'Ext.Toolbar',

    /**
     * @property {Boolean} isToolbar
     * `true` in this class to identify an object as an instantiated Toolbar, or subclass thereof.
     */
    isToolbar: true,
    baseCls  : Ext.baseCSSPrefix + 'toolbar',
    ariaRole : 'toolbar',

    defaultType: 'button',

    /**
     * @cfg {Boolean} vertical
     * Set to `true` to make the toolbar vertical. The layout will become a `vbox`.
     */
    vertical: false,

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * This class assigns a default layout (`layout: 'hbox'`).
     * Developers _may_ override this configuration option if another layout
     * is required (the constructor must be passed a configuration object in this
     * case instead of an array).
     * See {@link Ext.container.Container#layout} for additional information.
     */

    /**
     * @cfg {Boolean} enableOverflow
     * Configure true to make the toolbar provide a button which activates a dropdown Menu to show
     * items which overflow the Toolbar's width.
     */
    enableOverflow: false,

    /**
     * @cfg {String} menuTriggerCls
     * Configure the icon class of the overflow button.
     */
    menuTriggerCls: Ext.baseCSSPrefix + 'toolbar-more-icon',

    /**
     * @cfg {String} defaultButtonUI
     * A default {@link Ext.Component#ui ui} to use for {@link Ext.button.Button Button} items
     */
    
    // @private
    trackMenus: true,

    itemCls: Ext.baseCSSPrefix + 'toolbar-item',

    statics: {
        shortcuts: {
            '-' : 'tbseparator',
            ' ' : 'tbspacer'
        },

        shortcutsHV: {
            // horizontal
            0: {
                '->': { xtype: 'tbfill', height: 0 }
            },
            // vertical
            1: {
                '->': { xtype: 'tbfill', width: 0 }
            }
        }
    },

    initComponent: function() {
        var me = this;

        // check for simplified (old-style) overflow config:
        if (!me.layout && me.enableOverflow) {
            me.layout = { overflowHandler: 'Menu' };
        }

        if (me.dock === 'right' || me.dock === 'left') {
            me.vertical = true;
        }

        me.layout = Ext.applyIf(Ext.isString(me.layout) ? {
            type: me.layout
        } : me.layout || {}, {
            type: me.vertical ? 'vbox' : 'hbox',
            align: me.vertical ? 'stretchmax' : 'middle'
        });

        if (me.vertical) {
            me.addClsWithUI('vertical');
        }

        // @TODO: remove this hack and implement a more general solution
        if (me.ui === 'footer') {
            me.ignoreBorderManagement = true;
        }

        me.callParent();

        /**
         * @event overflowchange
         * Fires after the overflow state has changed.
         * @param {Number} lastHiddenCount The number of overflowing items that used to be hidden.
         * @param {Number} hiddenCount The number of overflowing items that are hidden now.
         * @param {Array} The hidden items
         */
        me.addEvents('overflowchange');
    },

    getRefItems: function(deep) {
        var me = this,
            items = me.callParent(arguments),
            layout = me.layout,
            handler;

        if (deep && me.enableOverflow) {
            handler = layout.overflowHandler;
            if (handler && handler.menu) {
                items = items.concat(handler.menu.getRefItems(deep));
            }
        }
        return items;
    },

    /**
     * Adds element(s) to the toolbar -- this function takes a variable number of
     * arguments of mixed type and adds them to the toolbar.
     *
     * **Note**: See the notes within {@link Ext.container.Container#method-add}.
     *
     * @param {Ext.Component.../Object.../String.../HTMLElement...} args The following types of arguments are all valid:
     *
     *  - `{@link Ext.button.Button config}`: A valid button config object
     *  - `HtmlElement`: Any standard HTML element
     *  - `Field`: Any form field
     *  - `Item`: Any subclass of {@link Ext.toolbar.Item}
     *  - `String`: Any generic string (gets wrapped in a {@link Ext.toolbar.TextItem}).
     *
     *    Note that there are a few special strings that are treated differently as explained next:
     *
     *      - `'-'`: Creates a separator element
     *      - `' '`: Creates a spacer element
     *      - `'->'`: Creates a fill element
     *
     * @return {Ext.Component[]/Ext.Component} The Components that were added.
     *
     * @method add
     */
    
    /**
     * Inserts a Component into this Container at a specified index.
     *
     * @param {Number} index The index at which the Component will be inserted.
     * @param {Ext.Component/Object/String/HTMLElement} component
     * See {@link #method-add} method for overview of possible values.
     * @return {Ext.Component} The component that was inserted.
     * @method insert
     */

    // @private
    lookupComponent: function(c) {
        var args = arguments;
        if (typeof c == 'string') {
            var T = Ext.toolbar.Toolbar,
                shortcut = T.shortcutsHV[this.vertical ? 1 : 0][c] || T.shortcuts[c];

            if (typeof shortcut == 'string') {
                c = {
                    xtype: shortcut
                };
            } else if (shortcut) {
                c = Ext.apply({}, shortcut);
            } else {
                c = {
                    xtype: 'tbtext',
                    text: c
                };
            }

            this.applyDefaults(c);
            
            // See: EXTJSIV-7578
            args = [c];
        }

        return this.callParent(args);
    },

    // @private
    applyDefaults: function(c) {
        if (!Ext.isString(c)) {
            c = this.callParent(arguments);
        }
        return c;
    },

    // @private
    trackMenu: function(item, remove) {
        if (this.trackMenus && item.menu) {
            var method = remove ? 'mun' : 'mon',
                me = this;

            me[method](item, 'mouseover', me.onButtonOver, me);
            me[method](item, 'menushow', me.onButtonMenuShow, me);
            me[method](item, 'menuhide', me.onButtonMenuHide, me);
        }
    },

    // @private
    onBeforeAdd: function(component) {
        var me = this,
            isButton = component.isButton;

        if (isButton && me.defaultButtonUI && component.ui === 'default' &&
            !component.hasOwnProperty('ui')) {
            component.ui = me.defaultButtonUI;
        } else if ((isButton || component.isFormField) && me.ui !== 'footer') {
            component.ui = component.ui + '-toolbar';
            component.addCls(component.baseCls + '-toolbar');
        }

        // Any separators needs to know if is vertical or not
        if (component instanceof Ext.toolbar.Separator) {
            component.setUI((me.vertical) ? 'vertical' : 'horizontal');
        }

        me.callParent(arguments);
    },

    // @private
    onAdd: function(component) {
        this.callParent(arguments);
        this.trackMenu(component);
    },
    
    // @private
    onRemove: function(c) {
        this.callParent(arguments);
        this.trackMenu(c, true);
    },
    
    getChildItemsToDisable: function() {
        return this.items.getRange();   
    },

    // @private
    onButtonOver: function(btn){
        if (this.activeMenuBtn && this.activeMenuBtn != btn) {
            this.activeMenuBtn.hideMenu();
            btn.showMenu();
            this.activeMenuBtn = btn;
        }
    },

    // @private
    onButtonMenuShow: function(btn) {
        this.activeMenuBtn = btn;
    },

    // @private
    onButtonMenuHide: function(btn) {
        delete this.activeMenuBtn;
    }
});