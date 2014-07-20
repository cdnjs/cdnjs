Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager',
    'Ext.data.*',
    'Ext.grid.*'
]);
Ext.onReady(function() {

    var data = [{
        "name": "Cheesecake Factory",
        "cuisine": "American"
    }, {
        "name": "Creamery",
        "cuisine": "American"
    }, {
        "name": "Crepevine",
        "cuisine": "American"
    }, {
        "name": "Gordon Biersch",
        "cuisine": "American"
    }, {
        "name": "MacArthur Park",
        "cuisine": "American"
    }, {
        "name": "Old Pro",
        "cuisine": "American"
    }, {
        "name": "Shokolaat",
        "cuisine": "American"
    }, {
        "name": "Slider Bar",
        "cuisine": "American"
    }, {
        "name": "University Cafe",
        "cuisine": "American"
    }, {
        "name": "Madame Tam",
        "cuisine": "Asian"
    }, {
        "name": "House of Bagels",
        "cuisine": "Bagels"
    }, {
        "name": "Nola's",
        "cuisine": "Cajun"
    }, {
        "name": "St Michael's Alley",
        "cuisine": "Californian"
    }, {
        "name": "Coconuts Caribbean Restaurant & Bar",
        "cuisine": "Caribbean"
    }, {
        "name": "Mango Caribbean Cafe",
        "cuisine": "Caribbean"
    }, {
        "name": "Jing Jing",
        "cuisine": "Chinese"
    }, {
        "name": "Mandarin Gourmet",
        "cuisine": "Chinese"
    }, {
        "name": "Tai Pan",
        "cuisine": "Chinese"
    }, {
        "name": "Coupa Cafe",
        "cuisine": "Coffee"
    }, {
        "name": "Lytton Coffee Company",
        "cuisine": "Coffee"
    }, {
        "name": "Peet's Coffee",
        "cuisine": "Coffee"
    }, {
        "name": "Starbucks",
        "cuisine": "Coffee"
    }, {
        "name": "Rose & Crown",
        "cuisine": "English"
    }, {
        "name": "Bistro Maxine",
        "cuisine": "French"
    }, {
        "name": "Cafe Epi",
        "cuisine": "French"
    }, {
        "name": "Darbar Indian Cuisine",
        "cuisine": "Indian"
    }, {
        "name": "Hyderabad House",
        "cuisine": "Indian"
    }, {
        "name": "Janta",
        "cuisine": "Indian"
    }, {
        "name": "Junoon",
        "cuisine": "Indian"
    }, {
        "name": "Mantra",
        "cuisine": "Indian"
    }, {
        "name": "Buca di Beppo",
        "cuisine": "Italian"
    }, {
        "name": "Cafe Renzo",
        "cuisine": "Italian"
    }, {
        "name": "Cafe Renzo",
        "cuisine": "Italian"
    }, {
        "name": "Il Fornaio",
        "cuisine": "Italian"
    }, {
        "name": "La Strada",
        "cuisine": "Italian"
    }, {
        "name": "Osteria",
        "cuisine": "Italian"
    }, {
        "name": "Pasta?",
        "cuisine": "Italian"
    }, {
        "name": "Vero",
        "cuisine": "Italian"
    }, {
        "name": "Baklava",
        "cuisine": "Mediterranean"
    }, {
        "name": "Cafe 220",
        "cuisine": "Mediterranean"
    }, {
        "name": "Cafe Renaissance",
        "cuisine": "Mediterranean"
    }, {
        "name": "Evvia Estiatorio",
        "cuisine": "Mediterranean"
    }, {
        "name": "Gyros-Gyros",
        "cuisine": "Mediterranean"
    }, {
        "name": "Kan Zeman",
        "cuisine": "Mediterranean"
    }, {
        "name": "Lavanda",
        "cuisine": "Mediterranean"
    }, {
        "name": "Reposado",
        "cuisine": "Mexican"
    }, {
        "name": "Sancho's Taquira",
        "cuisine": "Mexican"
    }, {
        "name": "California Pizza Kitchen",
        "cuisine": "Pizza"
    }, {
        "name": "New York Pizza",
        "cuisine": "Pizza"
    }, {
        "name": "Patxi's Pizza",
        "cuisine": "Pizza"
    }, {
        "name": "Pizza My Heart",
        "cuisine": "Pizza"
    }, {
        "name": "Round Table",
        "cuisine": "Pizza"
    }, {
        "name": "Pluto's",
        "cuisine": "Salad"
    }, {
        "name": "Sprout Cafe",
        "cuisine": "Salad"
    }, {
        "name": "The Prolific Oven",
        "cuisine": "Sandwiches"
    }, {
        "name": "Kanpai",
        "cuisine": "Sushi"
    }, {
        "name": "Miyake",
        "cuisine": "Sushi"
    }, {
        "name": "Sushi Tomo",
        "cuisine": "Sushi"
    }, {
        "name": "Joya",
        "cuisine": "Tapas"
    }, {
        "name": "Bangkok Cuisine",
        "cuisine": "Thai"
    }, {
        "name": "Krung Siam",
        "cuisine": "Thai"
    }, {
        "name": "Siam Royal",
        "cuisine": "Thai"
    }, {
        "name": "Thaiphoon",
        "cuisine": "Thai"
    }, {
        "name": "Garden Fresh",
        "cuisine": "Vegan"
    }, {
        "name": "Loving Hut",
        "cuisine": "Vegan"
    }, {
        "name": "Tamarine",
        "cuisine": "Vietnamese"
    }, {
        "name": "Three Seasons",
        "cuisine": "Vietnamese"
    }];

    // wrapped in closure to prevent global vars.
    Ext.define('Restaurant', {
        extend: 'Ext.data.Model',
        fields: ['name', 'cuisine']
    });

    Ext.ux.ajax.SimManager.init({
        delay: 30,
        defaultSimlet: null
    }).register({
        'readRestaurants': {
            data: data,
            stype: 'json',
            getData: Ext.Function.createInterceptor(Ext.ux.ajax.JsonSimlet.prototype.getData, function() {
                delete this.currentOrder;
            }),
            
            // JsonSimlet respects limit param. We want to return ALL the data
            getPage: function(ctx, data) {
                return data;
            }
        }
    }).register({
        'createRestaurant': {
            stype: 'json',
            getData: function(ctx) {
                var recData = Ext.JSON.decode(ctx.xhr.body);
                delete recData.id;
                data.push(recData);
                return [recData]
            }
        }
    });

    var restaurants = Ext.create('Ext.data.Store', {
        storeId: 'restaraunts',
        model: 'Restaurant',
        groupField: 'cuisine',
        remoteGroup: true,
        sorters: ['name'],
        proxy: {
            api: {
                create: 'createRestaurant',
                read: 'readRestaurants'
            },
            actionMethods: {
                create : 'GET',
                read   : 'GET'
            },
            noCache: false,
            type: 'ajax',
            reader: 'json',
            writer: 'json'
        },
        autoLoad: true,
        autoSync: true,
        listeners: {
            // Clear grouping button only valid if the store is grouped
            groupchange: function() {
                grid.down('[text=Clear Grouping]').setDisabled(!restaurants.isGrouped());
            },

            // Upon successful add of a new restaurant, invoke the server to sort and group
            write: function(s, operation) {
                if (operation.action === 'create' && operation.success === true) {
                    restaurants.sort();
                }
            }
        }
    });
    
    var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Cuisine: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true
    });

    var grid = Ext.create('Ext.grid.Panel', {
        renderTo: Ext.getBody(),
        collapsible: true,
        iconCls: 'icon-grid',
        frame: true,
        store: restaurants,
        width: 600,
        height: 400,
        title: 'Restaurants',
        resizable: true,
        features: [groupingFeature],
        columns: [{
            text: 'Name',
            flex: 1,
            dataIndex: 'name'
        },{
            text: 'Cuisine',
            flex: 1,
            dataIndex: 'cuisine'
        }],
        fbar  : [{
            text: 'New Restaurant',
            handler: function() {
                newRestaurantDialog.show();
            }
        },
            '->', {
            text:'Clear Grouping',
            iconCls: 'icon-clear-group',
            handler : function(b) {
                groupingFeature.disable();
            }
        }]
    });
    
    var newRestaurantDialog = Ext.create('Ext.window.Window', {
        closeAction: 'hide',
        title: 'Add a new restaurant',

        // Make the Window out of a <form> el so that the <button type="submit"> will invoke its handler upon CR
        autoEl: 'form',
        width: 400,
        bodyPadding: 5,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        defaultFocus: '[name=name]',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Cuisine',
            name: 'cuisine'
        }],
        buttons: [{
            text: 'Add',
            type: 'submit',
            handler: function() {
                var newRec = new Restaurant({
                    name: newRestaurantDialog.down('[name=name]').getValue(), 
                    cuisine: newRestaurantDialog.down('[name=cuisine]').getValue()
                });
                restaurants.add(newRec);
                newRestaurantDialog.hide();
                newRestaurantDialog.getEl().dom.reset();
            }
        }, {
            text: 'Cancel',
            handler: function() {
                newRestaurantDialog.hide();
            }
        }]
    });
});
