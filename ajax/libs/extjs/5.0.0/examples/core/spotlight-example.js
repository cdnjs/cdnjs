Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.layout.container.Table',
    'Ext.ux.Spotlight'
]);

//Create a DemoPanel which is the base for each panel in the example
Ext.define('DemoPanel', {
    extend: 'Ext.panel.Panel',

    title: 'Demo Panel',
    frame: true,
    width: 200,
    height: 150,
    html: 'Some panel content goes here!',
    bodyPadding: 5,

    /**
     * Custom method which toggles a Ext.Button for the current panel on/off depending on the only argument
     */
    toggle: function(on) {
        var btns = this.dockedItems.last(),
            btn = btns.items.first();

        if (btn) {
            btn.setDisabled(!on);
        }
    }
});

Ext.onReady(function() {
    //Create the spotlight component
    var spot = Ext.create('Ext.ux.Spotlight', {
        easing: 'easeOut',
        duration: 300
    });

    var p1, p2, p3;

    /**
     * Method which changes the spotlight to be active on a spefied panel
     */
    var updateSpot = function(id) {
        if (typeof id == 'string') {
            spot.show(id);
        } else if (!id && spot.active) {
            spot.hide();
        }

        p1.toggle(id == p1.id);
        p2.toggle(id == p2.id);
        p3.toggle(id == p3.id);
    };

    Ext.widget('container', {
        renderTo: Ext.getBody(),
        id: 'demo-ct',
        border: false,

        layout: {
            type: 'table',
            columns: 3
        },

        items: [
        p1 = Ext.create('DemoPanel', {
            id: 'panel1',
            buttons: [{
                text: 'Next Panel',
                disabled: true,
                handler: function() {
                    updateSpot('panel2');
                }
            }]
        }), p2 = Ext.create('DemoPanel', {
            id: 'panel2',
            buttons: [{
                text: 'Next Panel',
                disabled: true,
                handler: function() {
                    updateSpot('panel3');
                }
            }]
        }), p3 = Ext.create('DemoPanel', {
            id: 'panel3',
            buttons: [{
                text: 'Done',
                disabled: true,
                handler: function() {
                    updateSpot(false);
                }
            }]
        })]
    });

    //The start button, which starts everything
    Ext.create('Ext.button.Button', {
        text: 'Start',
        renderTo: 'start-ct',
        handler: function() {
            updateSpot('panel1');
        }
    });
});
