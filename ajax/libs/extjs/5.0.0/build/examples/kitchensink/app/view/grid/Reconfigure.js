/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('KitchenSink.view.grid.Reconfigure', {
    extend: 'Ext.container.Container',
   
    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'KitchenSink.model.grid.Office',
        'KitchenSink.model.grid.Employee'
    ], 
    xtype: 'reconfigure-grid',
    
    //<example>
    exampleTitle: 'Grid Reconfigure',
    themes: {
        classic: {
            employeeWidth: 100    
        },
        neptune: {
            employeeWidth: 130
        }
    },
    //</example>
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    width: 500,
    height: 330,
    
    lastNames: ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
    firstNames: ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    departments: ['Development', 'QA', 'Marketing', 'Accounting', 'Sales'],
    
    initComponent: function(){
        Ext.apply(this, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                defaultType: 'button',
                items: [{
                    itemId: 'showOffices',
                    text: 'Show Offices',
                    scope: this,
                    handler: this.onShowOfficesClick
                }, {
                    itemId: 'showEmployees',
                    margin: '0 0 0 10',
                    text: 'Show Employees',
                    scope: this,
                    handler: this.onShowEmployeesClick
                }]
            }, {
                margin: '10 0 0 0',
                xtype: 'grid',
                flex: 1,
                columns: [],
                viewConfig: {
                    emptyText: 'Click a button to show a dataset',
                    deferEmptyText: false
                }
            }]    
        });
        this.callParent();
    },
    
    onShowOfficesClick: function(){
        var grid = this.down('grid');
        
        Ext.suspendLayouts();
        grid.setTitle('Offices');
        grid.reconfigure(this.createOfficeStore(), [{
            flex: 1,
            text: 'City',
            dataIndex: 'city'
        }, {
            text: 'Total Employees',
            dataIndex: 'totalEmployees',
            width: 140
        }, {
            text: 'Manager',
            dataIndex: 'manager',
            width: 120
        }]);
        this.down('#showEmployees').enable();
        this.down('#showOffices').disable();
        Ext.resumeLayouts(true);  
    },
    
    onShowEmployeesClick: function(){
        var grid = this.down('grid');
        
        Ext.suspendLayouts();
        grid.setTitle('Employees');
        grid.reconfigure(this.createEmployeeStore(), [{
            text: 'First Name',
            dataIndex: 'forename'
        }, {
            text: 'Last Name',
            dataIndex: 'surname'
        }, {
            width: this.themeInfo.employeeWidth,
            text: 'Employee No.',
            dataIndex: 'employeeNo'
        }, {
            flex: 1,
            text: 'Department',
            dataIndex: 'department'
        }]);
        this.down('#showOffices').enable();
        this.down('#showEmployees').disable();
        Ext.resumeLayouts(true);
    },
    
    createEmployeeStore: function(){
        var data = [],
            i = 0,
            usedNames = {},
            name;
                
        for (; i < 20; ++i) {
            name = this.getUniqueName(usedNames);
            data.push({
                forename: name[0],
                surname: name[1],
                employeeNo: this.getEmployeeNo(),
                department: this.getDepartment()
            });
        }
        return new Ext.data.Store({
            model: KitchenSink.model.grid.Employee,
            data: data
        });
    },
    
    createOfficeStore: function(){
        var data = [],
            i = 0,
            usedNames = {},
            usedCities = {};
                
        for (; i < 7; ++i) {
            data.push({
                city: this.getUniqueCity(usedCities),
                manager: this.getUniqueName(usedNames).join(' '),
                totalEmployees: Ext.Number.randomInt(10, 25)
            });
        }
        return new Ext.data.Store({
            model: KitchenSink.model.grid.Office,
            data: data
        });
    },
    
    // Fake data generation functions
    generateName: function(){
        var lasts = this.lastNames,
            firsts = this.firstNames,
            lastLen = lasts.length,
            firstLen = firsts.length,
            getRandomInt = Ext.Number.randomInt,
            first = firsts[getRandomInt(0, firstLen - 1)],
            last = lasts[getRandomInt(0, lastLen - 1)];
        
        return [first, last];
    },
    
    getUniqueName: function(used) {
        var name = this.generateName(),
            key = name[0] + name[1];
            
        if (used[key]) {
            return this.getUniqueName(used);
        }
    
        used[key] = true;
        return name;
    },
    
    getCity: function(){
        var cities = this.cities,
            len = cities.length;
        
        return cities[Ext.Number.randomInt(0, len - 1)];
    },
    
    getUniqueCity: function(used){
        var city = this.getCity();
        if (used[city]) {
            return this.getUniqueCity(used);
        }
    
        used[city] = true;
        return city;
    },
    
    getEmployeeNo: function() {
        var out = '',
            i = 0;
        for (; i < 6; ++i) {
            out += Ext.Number.randomInt(0, 7);
        }
        return out;
    },
    
    getDepartment: function() {
        var departments = this.departments,
            len = departments.length;
        
        return departments[Ext.Number.randomInt(0, len - 1)];
    }
});