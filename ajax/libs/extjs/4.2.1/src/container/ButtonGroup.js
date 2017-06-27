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
 * Provides a container for arranging a group of related Buttons in a tabular manner.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Panel with ButtonGroup',
 *         width: 300,
 *         height:200,
 *         renderTo: document.body,
 *         bodyPadding: 10,
 *         html: 'HTML Panel Content',
 *         tbar: [{
 *             xtype: 'buttongroup',
 *             columns: 3,
 *             title: 'Clipboard',
 *             items: [{
 *                 text: 'Paste',
 *                 scale: 'large',
 *                 rowspan: 3,
 *                 iconCls: 'add',
 *                 iconAlign: 'top',
 *                 cls: 'btn-as-arrow'
 *             },{
 *                 xtype:'splitbutton',
 *                 text: 'Menu Button',
 *                 scale: 'large',
 *                 rowspan: 3,
 *                 iconCls: 'add',
 *                 iconAlign: 'top',
 *                 arrowAlign:'bottom',
 *                 menu: [{ text: 'Menu Item 1' }]
 *             },{
 *                 xtype:'splitbutton', text: 'Cut', iconCls: 'add16', menu: [{text: 'Cut Menu Item'}]
 *             },{
 *                 text: 'Copy', iconCls: 'add16'
 *             },{
 *                 text: 'Format', iconCls: 'add16'
 *             }]
 *         }]
 *     });
 *
 */
Ext.define('Ext.container.ButtonGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.buttongroup',
    alternateClassName: 'Ext.ButtonGroup',

    requires: ['Ext.layout.container.Table'],

    /**
     * @cfg {Number} columns
     * The `columns` configuration property passed to the {@link #layout configured layout manager}.
     * See {@link Ext.layout.container.Table#columns}.
     */

    /**
     * @cfg {String} baseCls
     * @inheritdoc
     */
    baseCls: Ext.baseCSSPrefix + 'btn-group',

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * @inheritdoc
     */
    layout: {
        type: 'table'
    },

    defaultType: 'button',

    /**
     * @cfg {Boolean} frame
     * @inheritdoc
     */
    frame: true,

    /**
     * @cfg {String} defaultButtonUI
     * A default {@link Ext.Component#ui ui} to use for {@link Ext.button.Button Button} items
     */

    frameHeader: false,

    titleAlign: 'center',

    noTitleCls: 'notitle',

    initComponent : function() {
        // Copy the component's columns config to the layout if specified
        var me = this,
            cols = me.columns;

        if (cols) {
            me.layout = Ext.apply({}, {columns: cols}, me.layout);
        }

        if (!me.title) {
            me.addClsWithUI(me.noTitleCls);
        }
        me.callParent(arguments);
    },

    // private
    onBeforeAdd: function(component) {
        if (component.isButton) {
            if (this.defaultButtonUI && component.ui === 'default' &&
                !component.hasOwnProperty('ui')) {
                component.ui = this.defaultButtonUI;
            } else {
                component.ui = component.ui + '-toolbar';
            }
        }
        this.callParent(arguments);
    },

    //private
    applyDefaults: function(c) {
        if (!Ext.isString(c)) {
            c = this.callParent(arguments);
        }
        return c;
    }

    /**
     * @cfg {Array} tools
     * @private
     */
    /**
     * @cfg {Boolean} collapsible
     * @private
     */
    /**
     * @cfg {Boolean} collapseMode
     * @private
     */
    /**
     * @cfg {Boolean} animCollapse
     * @private
     */
    /**
     * @cfg {Boolean} closable
     * @private
     */
});
