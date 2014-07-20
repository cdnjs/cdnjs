/**
 * This is a layout that will render form Fields, one under the other all stretched to the Container width.
 *
 *     @example
 *     Ext.create('Ext.Panel', {
 *         width: 500,
 *         height: 300,
 *         title: "FormLayout Panel",
 *         layout: 'form',
 *         renderTo: Ext.getBody(),
 *         bodyPadding: 5,
 *         defaultType: 'textfield',
 *         items: [{
 *            fieldLabel: 'First Name',
 *             name: 'first',
 *             allowBlank:false
 *         },{
 *             fieldLabel: 'Last Name',
 *             name: 'last'
 *         },{
 *             fieldLabel: 'Company',
 *             name: 'company'
 *         }, {
 *             fieldLabel: 'Email',
 *             name: 'email',
 *             vtype:'email'
 *         }, {
 *             fieldLabel: 'DOB',
 *             name: 'dob',
 *             xtype: 'datefield'
 *         }, {
 *             fieldLabel: 'Age',
 *             name: 'age',
 *             xtype: 'numberfield',
 *             minValue: 0,
 *             maxValue: 100
 *         }, {
 *             xtype: 'timefield',
 *             fieldLabel: 'Time',
 *             name: 'time',
 *             minValue: '8:00am',
 *             maxValue: '6:00pm'
 *         }]
 *     });
 */
Ext.define('Ext.layout.container.Form', {
    extend: 'Ext.layout.container.Auto',
    alternateClassName: 'Ext.layout.FormLayout',
    alias: 'layout.form',
    type: 'form',

    formWrapCls: Ext.baseCSSPrefix + 'form-layout-wrap',
    formWrapAutoLabelCls: Ext.baseCSSPrefix + 'form-layout-auto-label',
    formWrapSizedLabelCls: Ext.baseCSSPrefix + 'form-layout-sized-label',
    formColGroupCls: Ext.baseCSSPrefix + 'form-layout-colgroup',
    formColumnCls: Ext.baseCSSPrefix + 'form-layout-column',
    formLabelColumnCls: Ext.baseCSSPrefix + 'form-layout-label-column',

    /**
     * @cfg {Number} itemSpacing
     * The amount of space, in pixels, to use between the items. Defaults to the value
     * inherited from the theme's stylesheet as configured by
     * {@link Ext.form.Labelable#$form-item-margin-bottom $form-item-margin-bottom}.
     */

    /**
     * @cfg {Number/String} labelWidth
     * The width of the labels. This can be either a number in pixels, or a valid CSS
     * "width" style, e.g. `'100px'`, or `'30%'`.  When configured, all labels will assume
     * this width, and any {@link Ext.form.Labelable#labelWidth labelWidth} specified
     * on the items will be ignored.
     *
     * The default behavior of this layout when no no labelWidth is specified is to size
     * the labels to the text-width of the label with the longest text.
     */

    childEls: ['formWrap', 'labelColumn'],

    beforeBodyTpl:
        '<div id="{ownerId}-formWrap" data-ref="formWrap" class="{formWrapCls}"' +
            '<tpl if="itemSpacing"> style="border-spacing:{itemSpacing}px"</tpl>>' +
            '<div class="{formColGroupCls}">' +
                '<div id="{ownerId}-labelColumn" data-ref="labelColumn" class="{formColumnCls} {formLabelColumnCls}"' +
                    '<tpl if="labelWidth"> style="width:{labelWidth}"</tpl>>' +
                '</div>' +
                '<div class="{formColumnCls}"></div>' +
            '</div>',

    afterBodyTpl: '</div>',

    getRenderData: function() {
        var me = this,
            labelWidth = me.labelWidth,
            formWrapCls = me.formWrapCls,
            data = me.callParent();

        if (labelWidth) {
            if (typeof labelWidth === 'number') {
                labelWidth += 'px';
            }
            data.labelWidth = labelWidth;
            formWrapCls += ' ' + me.formWrapSizedLabelCls;
        } else {
            formWrapCls += ' ' + me.formWrapAutoLabelCls;
        }

        data.formWrapCls = formWrapCls;
        data.formColGroupCls = me.formColGroupCls;
        data.formColumnCls = me.formColumnCls;
        data.formLabelColumnCls = me.formLabelColumnCls;

        return data;
    },

    getRenderTarget: function() {
        return this.formWrap;
    }
});
