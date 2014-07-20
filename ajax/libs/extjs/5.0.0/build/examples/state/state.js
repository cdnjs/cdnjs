Ext.require([
    'Ext.grid.*',
    'Ext.window.Window',
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'Ext.state.*',
    'Ext.data.*'
]);

Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: ['first', 'last', 'review', {
        name: 'age',
        type: 'int'
    }]
});

Ext.onReady(function(){

    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'border',
            padding: '5'
        },
        items: [{
            region: 'north',
            height: 170,
            bodyPadding: 5,
            split: true,
            html: [
                'Between refreshes, the grid below will remember',
                '<ul>',
                    '<li>The hidden state of the columns</li>',
                    '<li>The width of the columns</li>',
                    '<li>The order of the columns</li>',
                    '<li>The sort state of the grid</li>',
                '</ul>'
            ].join(''),
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: 'Show window',
                    handler: function(btn){
                        Ext.create('Ext.window.Window', {
                            width: 300,
                            height: 300,
                            x: 5,
                            y: 5,
                            title: 'State Window',
                            maximizable: true,
                            stateId: 'stateWindowExample',
                            stateful: true,
                            bodyPadding: 5,
                            html: [
                                'Between refreshes, this window will remember:',
                                '<ul>',
                                    '<li>The width and height</li>',
                                    '<li>The x and y position</li>',
                                    '<li>The maximized and restore states</li>',
                                '</ul>'
                            ].join(''),
                            listeners: {
                                destroy: function(){
                                    btn.enable();
                                }
                            }
                        }).show();
                        btn.disable();
                    }
                }]
            }]
        }, {
            bodyPadding: 5,
            region: 'west',
            title: 'Collapse/Width Panel',
            width: 240,
            stateId: 'statePanelExample',
            stateful: true,
            split: true,
            collapsible: true,
            html: [
                'Between refreshes, this panel will remember:',
                '<ul>',
                    '<li>The collapsed state</li>',
                    '<li>The width</li>',
                '</ul>'
            ].join('')
        }, {
            region: 'center',
            stateful: true,
            stateId: 'stateGridExample',
            xtype: 'grid',
            store: Ext.create('Ext.data.Store', {
                model: 'Person',
                data: [{
                    first: 'John',
                    last: 'Smith',
                    age: 32,
                    review: 'Solid performance, needs to comment code more!'
                }, {
                    first: 'Jane',
                    last: 'Brown',
                    age: 56,
                    review: 'Excellent worker, has written over 100000 lines of code in 3 months. Deserves promotion.'
                }, {
                    first: 'Kevin',
                    last: 'Jones',
                    age: 25,
                    review: 'Insists on using one letter variable names for everything, lots of bugs introduced.'
                }, {
                    first: 'Will',
                    last: 'Zhang',
                    age: 41,
                    review: 'Average. Works at the pace of a snail but always produces reliable results.'
                }, {
                    first: 'Sarah',
                    last: 'Carter',
                    age: 23,
                    review: 'Only a junior, but showing a lot of promise. Coded a Javascript parser in Assembler, very neat.'
                }]
            }),
            columns: [{
                text: 'First Name',
                width:110,
                dataIndex: 'first'
            }, {
                text: 'Last Name',
                width:110,
                dataIndex: 'last'
            }, {
                text: 'Age',
                width:60,
                dataIndex: 'age'
            }, {
                flex: 1,
                text: 'Review',
                dataIndex: 'review'
            }]
        }]
    });
});