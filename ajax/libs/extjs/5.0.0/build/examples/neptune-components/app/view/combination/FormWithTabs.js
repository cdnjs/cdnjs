Ext.define('Neptune.view.combination.FormWithTabs', {
    extend: 'Ext.container.Container',
    xtype: 'formWithTabs',
    id: 'formWithTabs',
    items: [{
        xtype: 'form',
        title: 'Form with Inner Tabs',
        collapsible: true,
        bodyPadding: 5,
        width: 600,
        fieldDefaults: {
            labelAlign: 'top',
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },

        items: [{
            xtype: 'container',
            layout:'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'First Name',
                    allowBlank: false,
                    name: 'first',
                    anchor:'95%'
                }, {
                    fieldLabel: 'Company',
                    name: 'company',
                    anchor:'95%'
                }]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Last Name',
                    allowBlank: false,
                    name: 'last',
                    anchor:'95%'
                },{
                    fieldLabel: 'Email',
                    allowBlank: false,
                    name: 'email',
                    vtype:'email',
                    anchor:'95%'
                }]
            }]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:235,
            defaults:{
                bodyPadding: 10
            },
            items:[{
                title:'Personal Details',
                defaults: {
                    width: 230
                },
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'First Name',
                    name: 'first',
                    value: 'Jamie'
                },{
                    fieldLabel: 'Last Name',
                    name: 'last',
                    value: 'Avins'
                },{
                    fieldLabel: 'Company',
                    name: 'company',
                    value: 'Ext JS'
                }, {
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype:'email'
                }]
            },{
                title:'Phone Numbers',
                defaults: {
                    width: 230
                },
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'Home',
                    name: 'home',
                    value: '(888) 555-1212'
                },{
                    fieldLabel: 'Business',
                    name: 'business'
                },{
                    fieldLabel: 'Mobile',
                    name: 'mobile'
                },{
                    fieldLabel: 'Fax',
                    name: 'fax'
                }]
            },{
                cls: 'x-plain',
                title: 'Biography',
                layout: 'fit',
                items: {
                    xtype: 'htmleditor',
                    name: 'bio2',
                    fieldLabel: 'Biography'
                }
            }]
        }],

        buttons: [
            { text: 'Save' },
            { text: 'Cancel' }
        ]
    }]
});