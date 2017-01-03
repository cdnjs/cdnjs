Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'rating', type: 'int'},
       {name: 'salary', type: 'float'},
       {name: 'name'},
       'rowHeight'
    ]
});

Ext.onReady(function(){
    /**
     * Returns an array of fake data
     * @param {Number} count The number of fake rows to create data for
     * @return {Array} The fake record data, suitable for usage with an ArrayReader
     */
    function createFakeData(count) {
        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
            lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'],
            ratings      = [1, 2, 3, 4, 5],
            salaries     = [100, 400, 900, 1500, 1000000];

        var data = [];
        for (var i = 0; i < (count || 25); i++) {
            var ratingId    = Math.floor(Math.random() * ratings.length),
                salaryId    = Math.floor(Math.random() * salaries.length),
                firstNameId = Math.floor(Math.random() * firstNames.length),
                lastNameId  = Math.floor(Math.random() * lastNames.length),

                rating      = ratings[ratingId],
                salary      = salaries[salaryId],
                name        = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);

            data.push({
                id: 'rec-' + i,
                rating: rating,
                salary: salary,
                name: name,
                rowHeight: (i == count - 1) ? 150 : Ext.Number.randomInt(21, 50)
            });
        }
        return data;
    }

    var data = createFakeData(49679),
        ln = data.length,
        records = [],
        i = 0,
        store;

    for (; i < ln; i++) {
        records.push(Ext.create('Employee', data[i]));
    }

    // create the Data Store
    store = Ext.create('Ext.data.BufferedStore', {
        id: 'store',
        pageSize: 50000,
        // never purge any data, we prefetch all up front
        purgePageCount: 0,
        model: 'Employee',
        proxy: {
            type: 'memory',
            data: records
        },
        autoLoad: true
    });

    Ext.create('Ext.grid.Panel', {
        border: true,
        width: 700,
        height: 500,
        title: 'Buffered Grid of 49,679 random records',
        store: store,
        loadMask: true,
        selModel: {
            pruneRemoved: false,
            selectionMode: 'MULTI'
        },
        viewConfig: {
            trackOver: false
        },
        // grid columns
        columns:[{
            xtype: 'rownumberer',
            width: 70,
            sortable: false,
            
            // Only this column causes unpredictable row heights.
            // Hide this column, and we can measure a row and used exact row height.
            variableRowHeight: true,
            xhooks: {
                defaultRenderer: function(v, meta, record) {
                    meta.tdStyle = 'vertical-align:center;height:' + record.data.rowHeight + 'px';
                    return this.callParent(arguments);
                }
            }
        },{
            text: 'Name',
            flex:1 ,
            sortable: true,
            dataIndex: 'name'
        },{
            text: 'Rating',
            width: 125,
            sortable: true,
            dataIndex: 'rating'
        },{
            text: 'Salary',
            width: 125,
            sortable: true,
            dataIndex: 'salary',
            align: 'right',
            renderer: Ext.util.Format.usMoney
        }],
        renderTo: Ext.getBody()
    });
});
