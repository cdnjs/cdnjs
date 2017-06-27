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
Ext.define('Ext.grid.plugin.DivRenderer', {
    alias: 'plugin.divrenderer',
    extend: 'Ext.AbstractPlugin',

    tableTpl: [
        '<div id="{view.id}-table" class="' + Ext.baseCSSPrefix + '{view.id}-table ' + Ext.baseCSSPrefix + 'grid-table" style="{tableStyle}">',
            '{%',
                'values.view.renderRows(values.rows, values.viewStartIndex, out);',
            '%}',
        '</div>',
        {
            priority: 0
        }
    ],

    rowTpl: [
        '{%',
            'var dataRowCls = values.recordIndex === -1 ? "" : " ' + Ext.baseCSSPrefix + 'grid-data-row";',
        '%}',
        '<dl {[values.rowId ? ("id=\\"" + values.rowId + "\\"") : ""]} ',
            'data-boundView="{view.id}" ',
            'data-recordId="{record.internalId}" ',
            'data-recordIndex="{recordIndex}" ',
            'class="{[values.itemClasses.join(" ")]} {[values.rowClasses.join(" ")]}{[dataRowCls]}" ',
            'style="position:relative" ',
            '{rowAttr:attributes}>',
            '<tpl for="columns">' +
                '{%',
                    'parent.view.renderCell(values, parent.record, parent.recordIndex, xindex - 1, out, parent)',
                 '%}',
            '</tpl>',
        '</dl>',
        {
            priority: 0
        }
    ],

    cellTpl: [
        '<dt class="{tdCls}" {tdAttr} data-cellIndex="{cellIndex}">',
            '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner"',
                'style="text-align:{align};<tpl if="style">{style}</tpl>">{value}</div>',
        '</dt>', {
            priority: 0
        }
    ],

    selectors: {
        // Outer table
        bodySelector: 'div',

        // Element which contains rows
        nodeContainerSelector: 'div',

        // view item (may be a wrapper)
        itemSelector: 'dl.' + Ext.baseCSSPrefix + 'grid-row',

        // row which contains cells as opposed to wrapping rows
        dataRowSelector: 'dl.' + Ext.baseCSSPrefix + 'grid-data-row',

        // cell
        cellSelector: 'dt.' + Ext.baseCSSPrefix + 'grid-cell',

        innerSelector: 'div.' + Ext.baseCSSPrefix + 'grid-cell-inner',

        getNodeContainerSelector: function() {
            return this.getBodySelector();
        },

        getNodeContainer: function() {
            return this.el.getById(this.id + '-table', true);
        }
    },

    init: function(grid) {
        var view = grid.getView();
        view.tableTpl = Ext.XTemplate.getTpl(this, 'tableTpl');
        view.rowTpl   = Ext.XTemplate.getTpl(this, 'rowTpl');
        view.cellTpl  = Ext.XTemplate.getTpl(this, 'cellTpl');
        Ext.apply(view, this.selectors);
    }
});