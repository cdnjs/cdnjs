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
 * Adds a separator bar to a menu, used to divide logical groups of menu items. Generally you will
 * add one of these by using "-" in your call to add() or in your items config rather than creating one directly.
 *
 *     @example
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         height: 100,
 *         floating: false,  // usually you want this set to True (default)
 *         renderTo: Ext.getBody(),  // usually rendered by it's containing component
 *         items: [{
 *             text: 'icon item',
 *             iconCls: 'add16'
 *         },{
 *             xtype: 'menuseparator'
 *         },{
 *            text: 'separator above'
 *         },{
 *            text: 'regular item'
 *         }]
 *     });
 */
Ext.define('Ext.menu.Separator', {
    extend: 'Ext.menu.Item',
    alias: 'widget.menuseparator',

    /**
     * @cfg {String} activeCls
     * @private
     */

    /**
     * @cfg {Boolean} canActivate
     * @private
     */
    canActivate: false,

    /**
     * @cfg {Boolean} clickHideDelay
     * @private
     */

    /**
     * @cfg {Boolean} destroyMenu
     * @private
     */

    /**
     * @cfg {Boolean} disabledCls
     * @private
     */

    focusable: false,

    /**
     * @cfg {String} href
     * @private
     */

    /**
     * @cfg {String} hrefTarget
     * @private
     */

    /**
     * @cfg {Boolean} hideOnClick
     * @private
     */
    hideOnClick: false,

    /**
     * @cfg {String} icon
     * @private
     */

    /**
     * @cfg {String} iconCls
     * @private
     */

    /**
     * @cfg {Object} menu
     * @private
     */

    /**
     * @cfg {String} menuAlign
     * @private
     */

    /**
     * @cfg {Number} menuExpandDelay
     * @private
     */

    /**
     * @cfg {Number} menuHideDelay
     * @private
     */

    /**
     * @cfg {Boolean} plain
     * @private
     */
    plain: true,

    /**
     * @cfg {String} separatorCls
     * The CSS class used by the separator item to show the incised line.
     */
    separatorCls: Ext.baseCSSPrefix + 'menu-item-separator',

    /**
     * @cfg {String} text
     * @private
     */
    text: '&#160;',

    beforeRender: function(ct, pos) {
        var me = this;

        me.callParent();

        me.addCls(me.separatorCls);
    }
});