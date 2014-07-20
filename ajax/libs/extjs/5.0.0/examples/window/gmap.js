Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.window.*',
    'Ext.ux.GMapPanel'
]);

Ext.onReady(function(){
    var mapwin;
    Ext.get('show-btn').on('click', function() {
        // create the window on the first click and reuse on subsequent clicks
        if(mapwin) {
            mapwin.show();
        } else {
            mapwin = Ext.create('Ext.window.Window', {
                autoShow: true,
                layout: 'fit',
                title: 'GMap Window',
                closeAction: 'hide',
                width:450,
                height:450,
                border: false,
                x: 40,
                y: 60,
                items: {
                    xtype: 'gmappanel',
                    center: {
                        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                        marker: {title: 'Fenway Park'}
                    },
                    markers: [{
                        lat: 42.339641,
                        lng: -71.094224,
                        title: 'Boston Museum of Fine Arts',
                        listeners: {
                            click: function(e){
                                Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                            }
                        }
                    },{
                        lat: 42.339419,
                        lng: -71.09077,
                        title: 'Northeastern University'
                    }]
                }
            });
            
        }        
    });
 });