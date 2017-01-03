/**
 * This plugin can be added to component instances to process a `responsiveConfig`. For
 * example:
 *
 *      Ext.create({
 *          xtype: 'viewport',
 *          layout: 'border',
 *
 *          items: [{
 *              title: 'Some Title',
 *              plugins: 'responsive',
 *
 *              responsiveConfig: {
 *                  'width < 800': {
 *                      region: 'north'
 *                  },
 *
 *                  'width >= 800': {
 *                      region: 'west'
 *                  }
 *              }
 *          }]
 *      });
 *
 * For details see `{@link Ext.mixin.Responsive#responsiveConfig responsiveConfig}`.
 */
Ext.define('Ext.plugin.Responsive', {
    extend: 'Ext.mixin.Responsive',

    alias: 'plugin.responsive',
    pluginId: 'responsive',

    isPlugin: true,

    constructor: function (config) {
        var me = this,
            cmp = config.cmp,
            c = Ext.apply({
                responsiveConfig: cmp.responsiveConfig
            }, config);

        delete c.cmp;

        me.cmp = cmp;
        //<debug>
        if (!cmp) {
            Ext.Error.raise('Responsive plugin must be constructed by Component');
        }
        //</debug>

        me.initConfig(c);

        // Push the evaluated responsiveConfig values back on to the component:
        if (me.transformed) {
            cmp.setConfig(me.transformed);
            me.transformed = null;
        }
    },

    init: Ext.emptyFn,

    privates: {
        transformInstanceConfig: function (config) {
            // Since the responsiveConfigs we manage are for the component and not for us,
            // we set them aside here to be picked up by the constructor.
            this.transformed = this.callParent([config]);

            var ret = Ext.apply({}, config);
            delete ret.responsiveConfig; // already processed
            return ret;
        },

        updateResponsiveState: function () {
            var config = this.getResponsiveState();
            // Push the dynamic stuff back on to our component:
            this.cmp.setConfig(config);
        }
    }
});
