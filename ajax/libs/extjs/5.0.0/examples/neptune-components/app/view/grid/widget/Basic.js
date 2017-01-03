Ext.define('Neptune.view.grid.widget.Basic', function() {
    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function change(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function pctChange(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    return {
        extend: 'Ext.grid.Panel',
        xtype: 'basicGrid',
        store: 'Company',
        title: 'Basic Grid',
        plugins: {
            ptype: 'cellediting'
        },
        columns: [
            { text: 'Company', flex: 1, dataIndex: 'company', editor: 'textfield' },
            { text: 'Price', width: 75, sortable: true, formatter: 'usMoney', dataIndex: 'price', editor: 'numberfield' },
            { text: 'Change', width: 75, sortable: true, renderer: change, dataIndex: 'change', editor: 'numberfield' },
            { text: '% Change', width: 75, sortable: true, renderer: pctChange, dataIndex: 'pctChange', editor: 'numberfield' },
            { text: 'Last Updated', width: 85, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange', editor: 'datefield' },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 24,
                items: [{
                    icon   : '../shared/icons/fam/delete.gif',
                    tooltip: 'Sell stock'
                }]
            }
        ]
    };
});
