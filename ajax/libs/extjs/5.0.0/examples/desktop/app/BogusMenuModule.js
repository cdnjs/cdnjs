/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('Desktop.BogusMenuModule', {
    extend: 'Desktop.BogusModule',

    init : function() {

        this.launcher = {
            text: 'More items',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: []
            }
        };

        for (var i = 0; i < 5; ++i) {
            this.launcher.menu.items.push({
                text: 'Window '+(++windowIndex),
                iconCls:'bogus',
                handler : this.createWindow,
                scope: this,
                windowId: windowIndex
            });
        }
    }
});