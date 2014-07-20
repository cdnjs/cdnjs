/**
 * Demonstrates usage of a card layout.
 */
Ext.define('KitchenSink.view.layout.Card', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card'
    ],
    xtype: 'layout-card',
    //<example>
    exampleTitle: 'Card Layout',
    //</example>
    layout: 'card',
    width: 500,
    height: 400,

    bodyPadding: 15,
    
    defaults: {
        border:false
    },

    defaultListenerScope: true,

    bbar: ['->',
        {
            itemId: 'card-prev',
            text: '&laquo; Previous',
            handler: 'showPrevious',
            disabled: true
        },
        {
            itemId: 'card-next',
            text: 'Next &raquo;',
            handler: 'showNext'
        }
    ],

    items: [
        {
            id: 'card-0',
            html: '<h2>Welcome to the Demo Wizard!</h2><p>Step 1 of 3</p><p>Please click the "Next" button to continue...</p>'
        },
        {
            id: 'card-1',
            html: '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
        },
        {
            id: 'card-2',
            html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
        }
    ],

    showNext: function () {
        this.doCardNavigation(1);
    },

    showPrevious: function (btn) {
        this.doCardNavigation(-1);
    },

    doCardNavigation: function (incr) {
        var me = this;
        var l = me.getLayout();
        var i = l.activeItem.id.split('card-')[1];
        var next = parseInt(i, 10) + incr;
        l.setActiveItem(next);

        me.down('#card-prev').setDisabled(next===0);
        me.down('#card-next').setDisabled(next===2);
    }

});