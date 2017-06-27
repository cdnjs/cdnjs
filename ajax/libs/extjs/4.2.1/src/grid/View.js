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
 * The grid View class provides extra {@link Ext.grid.Panel} specific functionality to the
 * {@link Ext.view.Table}. In general, this class is not instanced directly, instead a viewConfig
 * option is passed to the grid:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             stripeRows: false
 *         }
 *     });
 *
 * ## Drag Drop
 *
 * Drag and drop functionality can be achieved in the grid by attaching a {@link Ext.grid.plugin.DragDrop} plugin
 * when creating the view.
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             plugins: {
 *                 ddGroup: 'people-group',
 *                 ptype: 'gridviewdragdrop',
 *                 enableDrop: false
 *             }
 *         }
 *     });
 */
Ext.define('Ext.grid.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.gridview',

    /**
     * @cfg {Boolean}
     * True to stripe the rows.
     *
     * This causes the CSS class **`x-grid-row-alt`** to be added to alternate rows of the grid. A default CSS rule is
     * provided which sets a background color, but you can override this with a rule which either overrides the
     * **background-color** style using the `!important` modifier, or which uses a CSS selector of higher specificity.
     */
    stripeRows: true,

    autoScroll: true
});
