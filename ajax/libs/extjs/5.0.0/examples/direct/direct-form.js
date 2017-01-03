Ext.require([
    'Ext.direct.*',
    'Ext.form.*',
    'Ext.tip.QuickTipManager',
    'Ext.layout.container.Accordion'
]);

Ext.onReady(function(){    
    /*
     * Notice that Direct requests will batch together if they occur
     * within the enableBuffer delay period (in milliseconds).
     * Slow the buffering down from the default of 10ms to 100ms
     */
    Ext.app.REMOTING_API.enableBuffer = 100;
    Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
    
    // provide feedback for any errors
    Ext.tip.QuickTipManager.init();
    
    var basicInfo = Ext.create('Ext.form.Panel', {
        // configs for FormPanel
        title: 'Basic Information',
        border: false,
        bodyPadding: 10,
        // configs for BasicForm
        api: {
            // The server-side method to call for load() requests
            load: 'Profile.getBasicInfo',
            // The server-side must mark the submit handler as a 'formHandler'
            submit: 'Profile.updateBasicInfo'
        },
        // specify the order for the passed params
        paramOrder: ['uid', 'foo'],
        dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            ui: 'footer',
            style: 'margin: 0 5px 5px 0;',
            items: ['->', {
                text: 'Submit',
                handler: function(){
                    basicInfo.getForm().submit({
                        params: {
                            foo: 'bar',
                            uid: 34
                        }
                    });
                }      
            }]
        }],
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Name',
            name: 'name'
        },{
            fieldLabel: 'Email',
            msgTarget: 'side',
            vtype:'email',
            name: 'email'
        },{
            fieldLabel: 'Company',
            name: 'company'
        }]
    });
    
    var phoneInfo = Ext.create('Ext.form.Panel', {
        title: 'Phone Numbers',
        border: false,
        api: {
            load: Profile.getPhoneInfo
        },
        bodyPadding: 10,
        paramOrder: ['uid'],
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Office',
            name: 'office'
        },{
            fieldLabel: 'Cell',
            name: 'cell'
        },{
            fieldLabel: 'Home',
            name: 'home'
        }]
    });
    
    var locationInfo = Ext.create('Ext.form.Panel', {
        title: 'Location Information',
        border: false,
        bodyPadding: 10,
        api: {
            load: Profile.getLocationInfo
        },
        paramOrder: ['uid'],
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Street',
            name: 'street'
        },{
            fieldLabel: 'City',
            name: 'city'
        },{
            fieldLabel: 'State',
            name: 'state'
        },{
            fieldLabel: 'Zip',
            name: 'zip'
        }]
    });

    //Adjust Panel dimensions for different themes
    var themeWidth = 300,
        themeHeight = 230;

    switch(Ext.themeName ){
        case 'neptune':{
            themeWidth = 350;
            themeHeight = 300;
            break;
        }
        case 'crisp':
        case 'neptune-touch':{
            themeWidth = 350;
            themeHeight = 380;
            break;
        }
    }

    var accordion = Ext.create('Ext.panel.Panel', {
        layout: 'accordion',
        renderTo: Ext.getBody(),
        title: 'My Profile',
        width: themeWidth,
        height: themeHeight,
        items: [basicInfo, phoneInfo, locationInfo]
    });
    
    // load the forms (notice the load requests will get batched together)
    basicInfo.getForm().load({
        // pass 2 arguments to server side getBasicInfo method (len=2)
        params: {
            foo: 'bar',
            uid: 34
        }
    });

    phoneInfo.getForm().load({
        params: {
            uid: 5
        }
    });

    // defer this request just to simulate the request not getting batched
    // since it exceeds to configured buffer
    Ext.Function.defer(function(){
        locationInfo.getForm().load({
            params: {
                uid: 5
            }
        });
    }, 200);

    // rpc call
    TestAction.doEcho('sample');
});
