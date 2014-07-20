/**
 * This example shows how to create a property grid from an object. It also demonstrates
 * updating the grid with new values and also a whole new dataset.
 */
Ext.define('KitchenSink.view.grid.PropertyGrid', {
    extend: 'Ext.container.Container',
    
    //<example>
    requires: [
        'Ext.button.Button',
        'Ext.grid.property.*',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox',
        'Ext.form.field.ComboBox'
    ],
    xtype: 'property-grid',
    exampleTitle: 'Property Grid Example',
    //</example>

    width: 350,
    
    initComponent: function(){
        Ext.apply(this, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                defaultType: 'button',
                items: [{
                    text: 'Update source',
                    scope: this,
                    handler: this.onUpdateSourceClick
                }, {
                    text: 'New data source',
                    margin: '0 0 0 10',
                    scope: this,
                    handler: this.onNewSourceClick
                }]
            }, {
                xtype: 'propertygrid',
                nameColumnWidth: 165,
                source: {
                    '(name)': 'Properties Grid',
                    grouping: false,
                    autoFitColumns: true,
                    productionQuality: false,
                    created: Ext.Date.parse('10/15/2006', 'm/d/Y'),
                    tested: false,
                    version: 0.01,
                    borderWidth: 1
                },
                sourceConfig: {
                    borderWidth: {
                        displayName: 'Border Width'
                    },
                    tested: {
                        displayName: 'QA'
                    }
                }
            }]
        });
        this.callParent();
    },
    
    onUpdateSourceClick: function(){
        var grid = this.down('propertygrid');
        
        grid.setSource(this.source);    
    },
    
    onNewSourceClick: function(){
        var grid = this.down('propertygrid');
        
        grid.setSource.apply(grid, this.alternateSource);
    }
}, function() {
    this.prototype.source = {
        '(name)': 'Property Grid',
        grouping: false,
        autoFitColumns: true,
        productionQuality: true,
        created: new Date(),
        tested: false,
        version: 0.8,
        borderWidth: 2
    };
    
    this.prototype.alternateSource = [{
        firstName: 'Mike',
        lastName: 'Bray',
        dob: new Date(1986, 3, 15),
        color: 'Red',
        score: null
    }, {
        firstName: {
            displayName: 'First Name'
        },
        lastName: {
            displayName: 'Last Name'
        },
        dob: {
            displayName: 'D.O.B'
        },
        color: {
            displayName: 'Color',
            editor: {
                xtype: 'combobox',
                store: ['Red', 'Green', 'Blue'],
                forceSelection: true
            },
            renderer: function(v){
                var lower = v.toLowerCase();
                return Ext.String.format('<span style="color: {0};">{1}</span>', lower, v);
            }
        }, 
        score: {
            displayName: 'Score',
            type: 'number'
        }
    }];
});