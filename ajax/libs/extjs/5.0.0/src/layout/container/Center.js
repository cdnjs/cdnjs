/**
 * This layout manager is used to center contents within a container. As a subclass of
 * {@link Ext.layout.container.Fit fit layout}, CenterLayout expects to have one child
 * item; multiple items will be placed overlapping. The layout does not require any config
 * options. Items in the container can use percentage width or height rather than be fit
 * to the full size of the container.
 *
 * Example usage:
 *
 *      // The content panel is centered in the container
 *
 *      var p = Ext.create('Ext.Panel', {
 *          title: 'Center Layout',
 *          layout: 'center',
 *          items: [{
 *              title: 'Centered Content',
 *              width: '75%',  // assign 75% of the container width to the item
 *              html: 'Some content'
 *          }]
 *      });
 *
 * If you leave the title blank and specify no border you can create a non-visual, structural
 * container just for centering the contents.
 *
 *      var p = Ext.create('Ext.Container', {
 *          layout: 'center',
 *          items: [{
 *              title: 'Centered Content',
 *              width: 300,
 *              height: '90%', // assign 90% of the container height to the item
 *              html: 'Some content'
 *          }]
 *      });
 */
Ext.define('Ext.layout.container.Center', {
    extend: 'Ext.layout.container.Fit',
    alias: [ 
        'layout.center',
        'layout.ux.center'
    ],

    alternateClassName: 'Ext.ux.layout.Center',
    
    percentRe: /^\d+(?:\.\d+)?\%$/,

    itemCls: Ext.baseCSSPrefix + 'center-layout-item',
    targetCls: Ext.baseCSSPrefix + 'center-layout',

    getItemSizePolicy: function (item, ownerSizeModel) {
        var me = this,
            sizeModel = ownerSizeModel || me.owner.getSizeModel(),
            percentRe = me.percentRe,
            mode = ((sizeModel.width.shrinkWrap || !percentRe.test(item.width)) ? 0 : 1) |
                ((sizeModel.height.shrinkWrap || !percentRe.test(item.height)) ? 0 : 2);

        return me.sizePolicies[mode];
    },

    getPos: function (itemContext, info, dimension) {
        var size = itemContext.props[dimension] + info.margins[dimension],
            pos = Math.round((info.targetSize[dimension] - size) / 2);

        if (isNaN(pos)) {
            this.done = false;
        }
        return Math.max(pos, 0);
    },

    positionItemX: function (itemContext, info) {
        var left = this.getPos(itemContext, info, 'width');

        itemContext.setProp('x', left);
    },

    positionItemY: function (itemContext, info) {
        var top = this.getPos(itemContext, info, 'height');


        itemContext.setProp('y', top);
    },

    setItemHeight: function (itemContext, info) {
        var ratio = parseFloat(itemContext.target.height) / 100;
        itemContext.setHeight(Math.round((info.targetSize.height - info.margins.height) * ratio));
    },

    setItemWidth: function (itemContext, info) {
        var ratio = parseFloat(itemContext.target.width) / 100;
        itemContext.setWidth(Math.round((info.targetSize.width - info.margins.width) * ratio));
    }
});
