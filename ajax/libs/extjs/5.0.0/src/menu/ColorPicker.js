/**
 * A menu containing a Ext.picker.Color Component.
 *
 * Notes:
 *
 *   - Although not listed here, the **constructor** for this class accepts all of the
 *     configuration options of {@link Ext.picker.Color}.
 *   - If subclassing ColorMenu, any configuration options for the ColorPicker must be
 *     applied to the **initialConfig** property of the ColorMenu. Applying
 *     {@link Ext.picker.Color ColorPicker} configuration settings to `this` will **not**
 *     affect the ColorPicker's configuration.
 *
 * Example:
 *
 *     @example
 *     var colorPicker = Ext.create('Ext.menu.ColorPicker', {
 *         value: '000000'
 *     });
 *
 *     Ext.create('Ext.menu.Menu', {
 *         items: [{
 *             text: 'Choose a color',
 *             menu: colorPicker
 *         },{
 *             iconCls: 'add16',
 *             text: 'Icon item'
 *         },{
 *             text: 'Regular item'
 *         }]
 *     }).showAt([5, 5]);
 */
 Ext.define('Ext.menu.ColorPicker', {
     extend: 'Ext.menu.Menu',

     alias: 'widget.colormenu',

     requires: [
        'Ext.picker.Color'
     ],

    /**
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a color is selected.
     */
    hideOnClick : true,

    /**
     * @cfg {String} pickerId
     * An id to assign to the underlying color picker.
     */
    pickerId : null,

    /**
     * @cfg {Number} maxHeight
     * @private
     */

    /**
     * @property {Ext.picker.Color} picker
     * The {@link Ext.picker.Color} instance for this ColorMenu
     */

    /**
     * @event click
     * @private
     */

    initComponent : function(){
        var me = this,
            cfg = Ext.apply({}, me.initialConfig);

        // Ensure we don't get duplicate listeners
        delete cfg.listeners;
        Ext.apply(me, {
            plain: true,
            showSeparator: false,
            bodyPadding: 0,
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-color-item',
                margin: 0,
                id: me.pickerId,
                xtype: 'colorpicker'
            }, cfg)
        });

        me.callParent(arguments);

        me.picker = me.down('colorpicker');

        /**
         * @event select
         * @inheritdoc Ext.picker.Color#select
         */
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },

    /**
     * Hides picker on select if hideOnClick is true
     * @private
     */
    hidePickerOnSelect: function() {
        Ext.menu.Manager.hideAll();
    }
 });