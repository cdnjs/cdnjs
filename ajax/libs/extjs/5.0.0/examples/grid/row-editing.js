Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.onReady(function(){
    // Define our data model
    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            'name',
            'email',
            { name: 'start', type: 'date', dateFormat: 'n/j/Y' },
            { name: 'salary', type: 'float' },
            { name: 'active', type: 'bool' }
        ]
    });

    // Generate mock employee data
    var data = (function() {
        var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
            firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
            lastLen = lasts.length,
            firstLen = firsts.length,
            usedNames = {},
            data = [],
            eDate = Ext.Date,
            now = new Date(),
            s = new Date(now.getFullYear() - 4, 0, 1),
            end = Ext.Date.subtract(now, Ext.Date.MONTH, 1),
            getRandomInt = Ext.Number.randomInt,

            generateName = function() {
                var name = firsts[getRandomInt(0, firstLen - 1)] + ' ' + lasts[getRandomInt(0, lastLen - 1)];
                if (usedNames[name]) {
                    return generateName();
                }
                usedNames[name] = true;
                return name;
            };

        while (s.getTime() < end) {
            var ecount = getRandomInt(0, 3);
            for (var i = 0; i < ecount; i++) {
                var name = generateName();
                data.push({
                    start : eDate.add(eDate.clearTime(s, true), eDate.DAY, getRandomInt(0, 27)),
                    name : name,
                    email: name.toLowerCase().replace(' ', '.') + '@sencha-test.com',
                    active: getRandomInt(0, 1),
                    salary: Math.floor(getRandomInt(35000, 85000) / 1000) * 1000
                });
            }
            s = eDate.add(s, eDate.MONTH, 1);
        }

        return data;
    })();

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Employee',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'DESC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
        }, {
            header: 'Email',
            dataIndex: 'email',
            width: 160,
            editor: {
                allowBlank: false,
                vtype: 'email'
            }
        }, {
            xtype: 'datecolumn',
            header: 'Start Date',
            dataIndex: 'start',
            width: 135,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'm/d/Y',
                minValue: '01/01/2006',
                minText: 'Cannot have a start date before the company existed!',
                maxValue: Ext.Date.format(new Date(), 'm/d/Y')
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Salary',
            dataIndex: 'salary',
            format: '$0,0',
            width: 130,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1,
                maxValue: 150000
            }
        }, {
            xtype: 'checkcolumn',
            header: 'Active?',
            dataIndex: 'active',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }],
        renderTo: 'editor-grid',
        width: 700,
        height: 400,
        title: 'Employee Salaries',
        frame: true,
        tbar: [{
            text: 'Add Employee',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('Employee', {
                    name: 'New Guy',
                    email: 'new@sencha-test.com',
                    start: Ext.Date.clearTime(new Date()),
                    salary: 50000,
                    active: true
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeEmployee',
            text: 'Remove Employee',
            iconCls: 'employee-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeEmployee').setDisabled(!records.length);
            }
        }
    });
});
