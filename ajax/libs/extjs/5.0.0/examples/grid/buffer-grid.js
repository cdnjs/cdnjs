Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'employeeNo'
    }, {
        name: 'rating',
        type: 'int'
    }, {
        name: 'salary',
        type: 'float'
    }, {
        name: 'name',
        convert: function (value, record) {
            return record.get('forename') + ' ' + record.get('surname');
        }
    }, {
        name: 'forename'
    }, {
        name: 'surname'
    }, {
        name: 'email'
    }, {
        name: 'department'
    }, {
        name: 'dob',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'joinDate',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'noticePeriod'
    }, {
        name: 'sickDays',
        type: 'int'
    }, {
        name: 'holidayDays',
        type: 'int'
    }, {
        name: 'holidayAllowance',
        type: 'int'
    }],
    idField: 'employeeNo'
});

Ext.onReady(function() {
    
    function random(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function getEmployeeNo() {
        var out = '',
            i = 0;
        for (; i < 6; ++i) {
            out += random(0, 7);
        }
        return out;
    }

    /**
     * Returns an array of fake data
     * @param {Number} count The number of fake rows to create data for
     * @return {Array} The fake record data, suitable for usage with an ArrayReader
     */
    function createFakeData(count, data) {
        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
            lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'],
            departments  = ['Engineering', 'Sales', 'Marketing', 'Managment', 'Support', 'Administration'],
            ratings      = [1, 2, 3, 4, 5],
            salaries     = [100, 400, 900, 1500, 1000000],
            noticePeriods= ['2 weeks', '1 month', '3 months'],
            i;

        for (i = 0; i < (count || 25); i++) {
            var firstName   = firstNames[random(0, firstNames.length - 1)],
                lastName    = lastNames[random(0, lastNames.length - 1)],
                name        = Ext.String.format("{0} {1}", firstName, lastName),
                email       = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@sentcha.com',
                rating      = ratings[(name === 'Nige White') ? 0 : random(0, ratings.length - 1)],
                salary      = salaries[(name === 'Nige White') ? 4 : random(0, salaries.length - 1)],
                department  = departments[random(0, departments.length - 1)],
                ageInYears  = random(23, 55),
                dob         = new Date(new Date().getFullYear() - ageInYears, random(0, 11), random(0, 31)),
                joinDate    = new Date(new Date() - random(60, 2000) * 1000 * 60 * 60 * 24),
                sickDays    = random(0, 10),
                holidayDays = random(0, 10),
                holidayAllowance = random(20, 40);

            data.push({
                employeeNo: getEmployeeNo(),
                rating: rating,
                salary: salary,
                forename: firstName,
                surname: lastName,
                email: email,
                department: department,
                dob: dob,
                joinDate: joinDate,
                sickDays: sickDays,
                holidayDays: holidayDays,
                holidayAllowance: holidayAllowance,
                noticePeriod: noticePeriods[random(0, noticePeriods.length - 1)]
            });
        }
    }

    // Create the Data Store.
    // Because it is buffered, the automatic load will be directed
    // through the prefetch mechanism, and be read through the page cache
    var store = Ext.create('Ext.data.Store', {
        groupField: 'department',
        model: 'Employee'
    });
    
    var jumpToRow = function(){
        var fld = grid.down('#gotoLine');
        if (fld.isValid()) {
            grid.view.bufferedRenderer.scrollTo(fld.getValue() - 1, true);
        }    
    };
    
    var data = [],
        perBatch = 1000,
        max = 5000;

    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        title: 'Buffered Grid of 5,000 random records',
        store: store,
        loadMask: true,
        selModel: {
            pruneRemoved: false
        },
        viewConfig: {
            trackOver: false
        },
        features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{columnName}: {name}',
            showSummaryRow: false
        }],
        // grid columns
        columns:[{
            xtype: 'rownumberer',
            width: 40,
            sortable: false
        }, {
            text: 'Id',
            sortable: true,
            dataIndex: 'employeeNo',
            groupable: false,
            width: 70
        }, {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            groupable: false,
            width: 120
        }, {
            text: 'Date of birth',
            dataIndex: 'dob',
            xtype: 'datecolumn',
            groupable: false
        }, {
            text: 'Join date',
            dataIndex: 'joinDate',
            xtype: 'datecolumn',
            groupable: false
        }, {
            text: 'Notice period',
            dataIndex: 'noticePeriod'
        }, {
            text: 'Email address',
            dataIndex: 'email',
            width: 200,
            groupable: false,
            renderer: function(v) {
                return '<a href="mailto:' + v + '">' + v + '</a>';
            }
        }, {
            text: 'Department',
            dataIndex: 'department',
            hidden: true
        }, {
            text: 'Absences',
            columns: [{
                text: 'Illness',
                dataIndex: 'sickDays',
                width: 60,
                groupable: false
            }, {
                text: 'Holidays',
                dataIndex: 'holidayDays',
                width: 70,
                groupable: false
            }, {
                text: 'Holiday Allowance',
                dataIndex: 'holidayAllowance',
                width: 125,
                groupable: false
            }]
        }, {
            text: 'Rating',
            width: 70,
            sortable: true,
            dataIndex: 'rating',
            groupable: false
        }, {
            text: 'Salary',
            width: 110,
            sortable: true,
            dataIndex: 'salary',
            align: 'right',
            renderer: Ext.util.Format.usMoney,
            groupable: false
        }],
        bbar: [{
            labelWidth: 80,
            fieldLabel: 'Jump to row',
            xtype: 'numberfield',
            minValue: 1,
            maxValue: max,
            allowDecimals: false,
            itemId: 'gotoLine',
            enableKeyEvents: true,
            listeners: {
                specialkey: function(field, e){
                    if (e.getKey() === e.ENTER) {
                        jumpToRow();
                    }
                }
            }
        }, {
            text: 'Go',
            handler: jumpToRow
        }],
        renderTo: Ext.getBody()
    });
    
    function makeData() {
        createFakeData(perBatch, data);
        if (data.length < max) {
            setTimeout(makeData, 10);
        } else {
            Ext.getBody().unmask();
            store.loadData(data);
        }
    }
    
    Ext.getBody().mask('Generating fake data...');
        
    // In old IE, the fake data loop can cause a slow script warning,
    // so kick this off in the "background" to load the data in chunks.
    makeData();
});
