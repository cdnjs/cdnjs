Ext.define('KitchenSink.view.tab.AdvancedTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.advanced-tabs',

    counter: 3,
    positions: [ 'top', 'right', 'bottom', 'left' ],
    rotations: [ 'default', 0, 1, 2 ],
    position: 0,
    rotation: 0,

    onAddTabClick: function() {
        var tabPanel = this.lookupReference('tabpanel'),
            counter = ++this.counter,
            html = counter % 2 ? KitchenSink.DummyText.longText :
                KitchenSink.DummyText.extraLongText,
            tab = tabPanel.add({
                title: 'Tab ' + counter,
                html: html
            });

        tabPanel.setActiveTab(tab);
    },

    onAutoCycleToggle: function(button, pressed) {
        var me = this;

        if (pressed) {
            me.cycleInterval = setInterval(function() {
                me.doCycle()
            }, 500);
            me.doCycle()
        } else {
            clearInterval(me.cycleInterval);
        }
    },

    doCycle: function() {
        var rotation = this.rotation = (++this.rotation % 4),
            position = this.position;

        if (rotation === 0) {
            position = this.position = (++position % 4);
        }

        Ext.suspendLayouts();
        this.lookupReference('positionBtn').setValue(this.positions[position]);
        this.lookupReference('rotationBtn').setValue(this.rotations[rotation]);
        Ext.resumeLayouts(true);
    },
    
    destroy: function() {
        clearInterval(this.cycleInterval);
        this.callParent(arguments);
    }
});
