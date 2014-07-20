/**
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * Produces a standalone `<label />` element which can be inserted into a form and be associated with a field
 * in that form using the {@link #forId} property.
 * 
 * **NOTE:** in most cases it will be more appropriate to use the {@link Ext.form.Labelable#fieldLabel fieldLabel}
 * and associated config properties ({@link Ext.form.Labelable#labelAlign}, {@link Ext.form.Labelable#labelWidth},
 * etc.) in field components themselves, as that allows labels to be uniformly sized throughout the form.
 * Ext.form.Label should only be used when your layout can not be achieved with the standard
 * {@link Ext.form.Labelable field layout}.
 * 
 * You will likely be associating the label with a field component that extends {@link Ext.form.field.Base}, so
 * you should make sure the {@link #forId} is set to the same value as the {@link Ext.form.field.Base#inputId inputId}
 * of that field.
 * 
 * The label's text can be set using either the {@link #text} or {@link #html} configuration properties; the
 * difference between the two is that the former will automatically escape HTML characters when rendering, while
 * the latter will not.
 *
 * # Example
 * 
 * This example creates a Label after its associated Text field, an arrangement that cannot currently
 * be achieved using the standard Field layout's labelAlign.
 * 
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Field with Label',
 *         width: 400,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         layout: {
 *             type: 'hbox',
 *             align: 'middle'
 *         },
 *         items: [{
 *             xtype: 'textfield',
 *             hideLabel: true,
 *             flex: 1
 *         }, {
 *             xtype: 'label',
 *             forId: 'myFieldId',
 *             text: 'My Awesome Field',
 *             margin: '0 0 0 10'
 *         }]
 *     });
 */
Ext.define('Ext.form.Label', {
    extend:'Ext.Component',
    alias: 'widget.label',
    requires: ['Ext.util.Format'],

    autoEl: 'label',

    /**
     * @cfg {String} [text='']
     * The plain text to display within the label. If you need to include HTML
     * tags within the label's innerHTML, use the {@link #html} config instead.
     */
    /**
     * @cfg {String} forId
     * The id of the input element to which this label will be bound via the standard HTML 'for'
     * attribute. If not specified, the attribute will not be added to the label. In most cases you will be
     * associating the label with a {@link Ext.form.field.Base} component, so you should make sure this matches
     * the {@link Ext.form.field.Base#inputId inputId} of that field.
     */
    /**
     * @cfg {String} [html='']
     * An HTML fragment that will be used as the label's innerHTML.
     * Note that if {@link #text} is specified it will take precedence and this value will be ignored.
     */
    
    maskOnDisable: false,

    getElConfig: function(){
        var me = this;

        me.html = me.text ? Ext.util.Format.htmlEncode(me.text) : (me.html || '');
        return Ext.apply(me.callParent(), {
            htmlFor: me.forId || ''
        });
    },

    /**
     * Updates the label's innerHTML with the specified string.
     * @param {String} text The new label text
     * @param {Boolean} [encode=true] False to skip HTML-encoding the text when rendering it
     * to the label. This might be useful if you want to include tags in the label's innerHTML rather
     * than rendering them as string literals per the default logic.
     * @return {Ext.form.Label} this
     */
    setText : function(text, encode){
        var me = this;
        
        encode = encode !== false;
        if(encode) {
            me.text = text;
            delete me.html;
        } else {
            me.html = text;
            delete me.text;
        }
        
        if(me.rendered){
            me.el.dom.innerHTML = encode !== false ? Ext.util.Format.htmlEncode(text) : text;
            me.updateLayout();
        }
        return me;
    }
});

