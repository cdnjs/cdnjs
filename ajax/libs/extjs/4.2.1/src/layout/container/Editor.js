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
 * Component layout for editors
 * @private
 */
Ext.define('Ext.layout.container.Editor', {

    /* Begin Definitions */

    alias: 'layout.editor',

    extend: 'Ext.layout.container.Container',

    /* End Definitions */

    autoSizeDefault: {
        width: 'field',
        height: 'field'    
    },

    sizePolicies: {
        // indexed by autoSize.width
        $: {
            // indexed by autoSize.height
            $: {
                readsWidth: 1,
                readsHeight: 1,
                setsWidth: 0,
                setsHeight: 0
            },
            boundEl: {
                readsWidth: 1,
                readsHeight: 0,
                setsWidth: 0,
                setsHeight: 1
            }
        },

        boundEl: {
            // indexed by autoSize.height
            $: {
                readsWidth: 0,
                readsHeight: 1,
                setsWidth: 1,
                setsHeight: 0
            },
            boundEl: {
                readsWidth: 0,
                readsHeight: 0,
                setsWidth: 1,
                setsHeight: 1
            }
        }
    },

    getItemSizePolicy: function (item) {
        var me = this,
            autoSize = me.owner.autoSize,
            key = autoSize && autoSize.width,
            policy = me.sizePolicies;

        policy = policy[key] || policy.$;

        key = autoSize && autoSize.height;
        policy = policy[key] || policy.$;

        return policy;
    },

    calculate: function(ownerContext) {
        var me = this,
            owner = me.owner,
            autoSize = owner.autoSize,
            fieldWidth,
            fieldHeight;
            
        if (autoSize === true) {
            autoSize = me.autoSizeDefault;
        }

        // Calculate size of both Editor, and its owned Field
        if (autoSize) {
            fieldWidth  = me.getDimension(owner, autoSize.width,  'getWidth',  owner.width);
            fieldHeight = me.getDimension(owner, autoSize.height, 'getHeight', owner.height);
        }

        // Set Field size
        ownerContext.childItems[0].setSize(fieldWidth, fieldHeight);

        // Bypass validity checking. Container layouts should not usually set their owner's size.
        ownerContext.setWidth(fieldWidth);
        ownerContext.setHeight(fieldHeight);

        // This is a Container layout, so publish content size
        ownerContext.setContentSize(fieldWidth || owner.field.getWidth(),
                                    fieldHeight || owner.field.getHeight());
    },

    getDimension: function(owner, type, getMethod, ownerSize){
        switch (type) {
            // Size to boundEl's dimension
            case 'boundEl':
                return owner.boundEl[getMethod]();

            // Auto size (shrink wrap the Field's size
            case 'field':
                return undefined;

            // Size to the Editor's configured size
            default:
                return ownerSize;
        }
    }
});