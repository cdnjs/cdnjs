Ext.define('Aria.view.Toolbar', {
    extend:'Ext.container.Container',
    alias:'widget.mysimpletoolbar',
    title:'Toolbar',

    requires: [
        'Ext.menu.DatePicker',
        'Ext.menu.ColorPicker',
        'Ext.container.ButtonGroup'
    ],
    
    initComponent: function() {
        // functions to display feedback
        function onButtonClick(btn){
            Aria.app.msg('Button Click','You clicked the "{0}" button.', btn.displayText || btn.text);
        }

        function onItemClick(item){
            Aria.app.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
        }

        function onItemCheck(item, checked){
            Aria.app.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
        }

        function onItemToggle(item, pressed){
            Aria.app.msg('Button Toggled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
        }

        var dateMenu = Ext.create('Ext.menu.DatePicker', {
            handler: function(dp, date){
                Aria.app.msg('Date Selected', 'You choose {0}.', Ext.Date.format(date, 'M j, Y'));

            }
        });

        var colorMenu = Ext.create('Ext.menu.ColorPicker', {
            handler: function(cm, color){
                Aria.app.msg('Color Selected', '<span style="color:#' + color + ';">You choose {0}.</span>', color);
            }
        });

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: ['abbr', 'state', 'desc'],
            data : [
                ['AL', 'Alabama', 'The Heart of Dixie'],
                ['AK', 'Alaska', 'The Land of the Midnight Sun'],
                ['AZ', 'Arizona', 'The Grand Canyon State'],
                ['AR', 'Arkansas', 'The Natural State'],
                ['CA', 'California', 'The Golden State'],
                ['CO', 'Colorado', 'The Mountain State'],
                ['CT', 'Connecticut', 'The Constitution State'],
                ['DE', 'Delaware', 'The First State'],
                ['DC', 'District of Columbia', "The Nation's Capital"],
                ['FL', 'Florida', 'The Sunshine State'],
                ['GA', 'Georgia', 'The Peach State'],
                ['HI', 'Hawaii', 'The Aloha State'],
                ['ID', 'Idaho', 'Famous Potatoes'],
                ['IL', 'Illinois', 'The Prairie State'],
                ['IN', 'Indiana', 'The Hospitality State'],
                ['IA', 'Iowa', 'The Corn State'],
                ['KS', 'Kansas', 'The Sunflower State'],
                ['KY', 'Kentucky', 'The Bluegrass State'],
                ['LA', 'Louisiana', 'The Bayou State'],
                ['ME', 'Maine', 'The Pine Tree State'],
                ['MD', 'Maryland', 'Chesapeake State'],
                ['MA', 'Massachusetts', 'The Spirit of America'],
                ['MI', 'Michigan', 'Great Lakes State'],
                ['MN', 'Minnesota', 'North Star State'],
                ['MS', 'Mississippi', 'Magnolia State'],
                ['MO', 'Missouri', 'Show Me State'],
                ['MT', 'Montana', 'Big Sky Country'],
                ['NE', 'Nebraska', 'Beef State'],
                ['NV', 'Nevada', 'Silver State'],
                ['NH', 'New Hampshire', 'Granite State'],
                ['NJ', 'New Jersey', 'Garden State'],
                ['NM', 'New Mexico', 'Land of Enchantment'],
                ['NY', 'New York', 'Empire State'],
                ['NC', 'North Carolina', 'First in Freedom'],
                ['ND', 'North Dakota', 'Peace Garden State'],
                ['OH', 'Ohio', 'The Heart of it All'],
                ['OK', 'Oklahoma', 'Oklahoma is OK'],
                ['OR', 'Oregon', 'Pacific Wonderland'],
                ['PA', 'Pennsylvania', 'Keystone State'],
                ['RI', 'Rhode Island', 'Ocean State'],
                ['SC', 'South Carolina', 'Nothing Could be Finer'],
                ['SD', 'South Dakota', 'Great Faces, Great Places'],
                ['TN', 'Tennessee', 'Volunteer State'],
                ['TX', 'Texas', 'Lone Star State'],
                ['UT', 'Utah', 'Salt Lake State'],
                ['VT', 'Vermont', 'Green Mountain State'],
                ['VA', 'Virginia', 'Mother of States'],
                ['WA', 'Washington', 'Green Tree State'],
                ['WV', 'West Virginia', 'Mountain State'],
                ['WI', 'Wisconsin', "America's Dairyland"],
                ['WY', 'Wyoming', 'Like No Place on Earth']
            ]
        });

        var combo = Ext.create('Ext.form.field.ComboBox', {
            hideLabel: true,
            store: store,
            displayField: 'state',
            typeAhead: false,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a state...',
            editable: false,
            width: 135,
            iconCls: 'no-icon'
        });

        var menu = Ext.create('Ext.menu.Menu', {
            id: 'mainMenu',
//             style: {
//                 overflow: 'visible'     // For the Combo popup
//             },
            items: [
//                 combo,                  // A Field in a Menu
                {
                    text: 'I like Ext',
                    checked: true,       // when checked has a boolean value, it is assumed to be a CheckItem
                    checkHandler: onItemCheck
                }, '-', {
                    text: 'Radio Options',
                    menu: {        // <-- submenu by nested config object
                        items: [
                            // stick any markup in a menu
                            '<b class="menu-title">Choose a Theme</b>',
                            {
                                text: 'Aero Glass',
                                checked: true,
                                group: 'theme',
                                checkHandler: onItemCheck
                            }, {
                                text: 'Vista Black',
                                checked: false,
                                group: 'theme',
                                checkHandler: onItemCheck
                            }, {
                                text: 'Gray Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: onItemCheck
                            }, {
                                text: 'Default Theme',
                                checked: false,
                                group: 'theme',
                                checkHandler: onItemCheck
                            }
                        ]
                    }
                },{
                    text: 'Choose a Date',
                    iconCls: 'calendar',
                    menu: dateMenu // <-- submenu by reference
                },{
                    text: 'Choose a Color',
                    menu: colorMenu // <-- submenu by reference
                }
            ]
        });

        var tb = Ext.create('Ext.toolbar.Toolbar');
        var tb1 = Ext.create('Ext.toolbar.Toolbar');

        tb.add({
                text:'Button w/ Menu',
                iconCls: 'bmenu',  // <-- icon
                menu: menu  // assign menu by instance
            }, {
                text: 'Users',
                menu: {
                    xtype: 'menu',
                    plain: true,
                    items: {
                        xtype: 'buttongroup',
                        title: 'User options',
                        columns: 2,
                        defaults: {
                            xtype: 'button',
                            scale: 'large',
                            iconAlign: 'left',
                            handler: onButtonClick
                        },
                        items: [{
                            text: 'User<br/>manager',
                            width: 90,
                            displayText: 'User manager'
                        },{
                            tooltip: 'Add user',
                            width: 100,
                            text: 'Add user'
                        },{
                            colspan: 2,
                            text: 'Import',
                            scale: 'small',
                            width: 130
                        },{
                            colspan: 2,
                            text: 'Who is online?',
                            scale: 'small',
                            width: 130
                        }]
                    }
                }
            },
            '-', {
                text: 'Toggle Me',
                enableToggle: true,
                toggleHandler: onItemToggle,
                pressed: true
            });

        menu.add(' ');

        // Menus have a rich api for
        // adding and removing elements dynamically
        var item = menu.add({
            text: 'Dynamically added Item'
        });
        // items support full Observable API
        item.on('click', onItemClick);

        // items can easily be looked up
        menu.add({
            text: 'Disabled Item',
            id: 'disableMe'  // <-- Items can also have an id for easy lookup
            // disabled: true   <-- allowed but for sake of example we use long way below
        });
        // access items by id or index
        menu.items.get('disableMe').disable();


        var scrollMenu = Ext.create('Ext.menu.Menu');
        for (var i = 0; i < 50; ++i){
            scrollMenu.add({
                text: 'Item ' + (i + 1),
                handler: onItemClick
            });
        }
        
        tb1.add({
            text: 'Link',
            url: 'http://www.google.com/search',
            baseParams: {
                q: 'html+anchor+tag'
            },
            tooltip: 'This is a link. You can right click. You can see where it will take you'
        });

        // scrollable menu
        tb1.add({
            cls: 'x-btn-text-icon',
            text: 'Scrolling Menu',
            menu: scrollMenu
        });

        this.items = [
            {
                xtype: 'panel',
                bodyPadding:12,
                width:700,
                height:250,
                header:true,
                title:'Toolbar Example',
                dockedItems:{
                    dock: 'top',
                    items: [tb, tb1]
                }
            }
        ];

        this.callParent(arguments);
    }
});