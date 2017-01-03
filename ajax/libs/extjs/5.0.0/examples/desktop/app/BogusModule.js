/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

var windowIndex = 0;

Ext.define('Desktop.BogusModule', {
    extend: 'Ext.ux.desktop.Module',

    init : function(){
        this.launcher = {
            text: 'Window '+(++windowIndex),
            iconCls:'bogus',
            handler : this.createWindow,
            scope: this,
            windowId:windowIndex
        }
    },

    createWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bogus'+src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: 'bogus'+src.windowId,
                title:src.text,
                width:640,
                height:480,
                html : '<p>Something useful would be in here.</p>',
                iconCls: 'bogus',
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();
        return win;
    }
});