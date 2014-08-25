/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @override Ext.rtl.dom.Layer
 * This override adds RTL positioning methods to Ext.dom.Layer.
 */
Ext.define('Ext.rtl.dom.Layer', {
    override: 'Ext.dom.Layer',

    rtlLocalXYNames: {
        get: 'rtlGetLocalXY',
        set: 'rtlSetLocalXY'
    },

    rtlSetLocalX: function() {
        this.callParent(arguments);
        return this.sync();
    },

    rtlSetLocalXY: function() {
        this.callParent(arguments);
        return this.sync();
    },

    rtlSetLocalY: function() {
        this.callParent(arguments);
        return this.sync();
    },

    rtlSetXY: function(xy, animate, duration, callback, easing) {
        var me = this;
        
        // Callback will restore shadow state and call the passed callback
        callback = me.createCB(callback);

        me.fixDisplay();
        me.beforeAction();
        me.callParent([xy, animate, duration, callback, easing]);
        if (!animate) {
            callback();
        }
        return me;
    },
    
    setRtl: function(rtl) {
        var me = this,
            shadow = me.shadow;
            
        me.localXYNames = rtl ? me.rtlLocalXYNames : Ext.dom.Layer.prototype.localXYNames;
        
        if (shadow) {
            shadow.localXYNames = me.localXYNames;
        }
    }

});
