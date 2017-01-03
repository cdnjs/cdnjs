Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.grid.TransformGrid'
]);

Ext.onReady(function(){
    var btn = Ext.get('create-grid');
    // Always enable the button, after a refresh some browsers 
    // will remember the disabled state for us
    btn.dom.disabled = false;
    
    btn.on('click', function(){
        btn.dom.disabled = true;

        // create the grid
        var grid = Ext.create('Ext.ux.grid.TransformGrid', 'the-table', {
            stripeRows: true,
            height: 130
        });
        grid.render(Ext.getBody());
    });
});

