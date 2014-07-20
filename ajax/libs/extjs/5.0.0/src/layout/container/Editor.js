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