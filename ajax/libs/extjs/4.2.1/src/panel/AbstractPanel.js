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
 * @class Ext.panel.AbstractPanel
 * @private
 *
 * A base class which provides methods common to Panel classes across the Sencha product range.
 *
 * Please refer to sub class's documentation
 */
Ext.define('Ext.panel.AbstractPanel', {

    /* Begin Definitions */

    extend: 'Ext.container.Container',

    mixins: {
        docking: 'Ext.container.DockingContainer'
    },

    requires: ['Ext.util.MixedCollection', 'Ext.Element', 'Ext.toolbar.Toolbar'],

    /* End Definitions */

    /**
     * @cfg {String} [baseCls=x-panel]
     * The base CSS class to apply to this panel's element.
     * @since 2.3.0
     */
    baseCls : Ext.baseCSSPrefix + 'panel',

    /**
     * @cfg {Number/String} bodyPadding
     * A shortcut for setting a padding style on the body element. The value can either be
     * a number to be applied to all sides, or a normal css string describing padding.
     * Defaults to <code>undefined</code>.
     */

    /**
     * @cfg {Boolean} bodyBorder
     * A shortcut to add or remove the border on the body of a panel. In the classic theme
     * this only applies to a panel which has the {@link #frame} configuration set to `true`.
     * @since 2.3.0
     */

    /**
     * @cfg {String/Object/Function} bodyStyle
     * Custom CSS styles to be applied to the panel's body element, which can be supplied as a valid CSS style string,
     * an object containing style property name/value pairs or a function that returns such a string or object.
     * For example, these two formats are interpreted to be equivalent:<pre><code>
bodyStyle: 'background:#ffc; padding:10px;'

bodyStyle: {
    background: '#ffc',
    padding: '10px'
}
     * </code></pre>
     *
     * @since 2.3.0
     */

    /**
     * @cfg {String/String[]} bodyCls
     * A CSS class, space-delimited string of classes, or array of classes to be applied to the panel's body element.
     * The following examples are all valid:<pre><code>
bodyCls: 'foo'
bodyCls: 'foo bar'
bodyCls: ['foo', 'bar']
     * </code></pre>
     */

    /**
     * @property {Boolean} isPanel
     * `true` in this class to identify an object as an instantiated Panel, or subclass thereof.
     */
    isPanel: true,
    
    /**
     * @property {Ext.dom.Element} body
     * The Panel's body {@link Ext.dom.Element Element} which may be used to contain HTML content.
     * The content may be specified in the {@link #html} config, or it may be loaded using the
     * {@link #loader} config. Read-only.
     *
     * If this is used to load visible HTML elements in either way, then
     * the Panel may not be used as a Layout for hosting nested Panels.
     *
     * If this Panel is intended to be used as the host of a Layout (See {@link #layout}
     * then the body Element must not be loaded or changed - it is under the control
     * of the Panel's Layout.
     *
     * @readonly
     */

    /**
     * @property {String} [contentPaddingProperty='bodyPadding']
     * @inheritdoc
     */ 
    contentPaddingProperty: 'bodyPadding',
    
    /**
     * @cfg {Boolean/Number} shrinkWrapDock
     * Allows for this panel to include the {@link #dockedItems} when trying to determine the overall
     * size of the panel. This option is only applicable when this panel is also shrink wrapping in the
     * same dimensions. See {@link Ext.AbstractComponent#shrinkWrap} for an explanation of the configuration options.
     */
    shrinkWrapDock: false,

    componentLayout: 'dock',

    childEls: [
        'body'
    ],

    renderTpl: [
        // If this Panel is framed, the framing template renders the docked items round the frame
        '{% this.renderDockedItems(out,values,0); %}',
        // This empty div solves an IE6/7/Quirks problem where the margin-top on the bodyEl
        // is ignored. Best we can figure, this is triggered by the previousSibling being
        // position absolute (a docked item). The goal is to use margins to position the
        // bodyEl rather than left/top since that allows us to avoid writing a height on the
        // panel and the body. This in turn allows CSS height to expand or contract the
        // panel during things like portlet dragging where we want to avoid running a ton
        // of layouts during the drag operation.
        // This empty div also has to be relatively positioned, otherwise it crashes IE6-9 Quirks
        // when panel is rendered in a table-based layout.
        (Ext.isIE7m || Ext.isIEQuirks) ? '<div style="position:relative"></div>' : '',
        '<div id="{id}-body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
            ' {baseCls}-body-{ui}<tpl if="uiCls">',
                '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
            '</tpl>{childElCls}"',
            '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '{%this.renderContainer(out,values);%}',
        '</div>',
        '{% this.renderDockedItems(out,values,1); %}'
    ],

    bodyPosProps: {
        x: 'x',
        y: 'y'
    },

    // TODO: Move code examples into product-specific files. The code snippet below is Touch only.
    /**
     * @cfg {Object/Object[]} dockedItems
     * A component or series of components to be added as docked items to this panel.
     * The docked items can be docked to either the top, right, left or bottom of a panel.
     * This is typically used for things like toolbars or tab bars:
     * <pre><code>
var panel = new Ext.panel.Panel({
    fullscreen: true,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Docked to the top'
        }]
    }]
});</code></pre>
     */

    // @since 2.3.0
    border: true,

    /**
     * @private
     */
    emptyArray: [],

    initComponent : function() {
        this.initBorderProps();
        this.callParent();
    },

    initBorderProps: function() {
        var me = this;

        if (me.frame && me.border && me.bodyBorder === undefined) {
            me.bodyBorder = false;
        }
        if (me.frame && me.border && (me.bodyBorder === false || me.bodyBorder === 0)) {
            me.manageBodyBorders = true;
        }
    },

    beforeDestroy: function(){
        this.destroyDockedItems();
        this.callParent();
    },

    // @private
    initItems : function() {
        this.callParent();
        this.initDockingItems();
    },

    /**
     * Initialized the renderData to be used when rendering the renderTpl.
     * @return {Object} Object with keys and values that are going to be applied to the renderTpl
     * @private
     */
    initRenderData: function() {
        var me = this,
            data = me.callParent();

        me.initBodyStyles();
        me.protoBody.writeTo(data);
        delete me.protoBody;

        return data;
    },

    /**
     * Attempts a default component lookup (see {@link Ext.container.Container#getComponent}). If the component is not found in the normal
     * items, the dockedItems are searched and the matched component (if any) returned (see {@link #getDockedComponent}). Note that docked
     * items will only be matched by component id or itemId -- if you pass a numeric index only non-docked child components will be searched.
     * @param {String/Number} comp The component id, itemId or position to find
     * @return {Ext.Component} The component (if found)
     * @since 2.3.0
     */
    getComponent: function(comp) {
        var component = this.callParent(arguments);
        if (component === undefined && !Ext.isNumber(comp)) {
            // If the arg is a numeric index skip docked items
            component = this.getDockedComponent(comp);
        }
        return component;
    },

    getProtoBody: function () {
        var me = this,
            body = me.protoBody;

        if (!body) {
            me.protoBody = body = new Ext.util.ProtoElement({
                cls: me.bodyCls,
                style: me.bodyStyle,
                clsProp: 'bodyCls',
                styleProp: 'bodyStyle',
                styleIsText: true
            });
        }

        return body;
    },

    /**
     * Parses the {@link #bodyStyle} config if available to create a style string that will be applied to the body element.
     * This also includes {@link #bodyPadding} and {@link #bodyBorder} if available.
     * @return {String} A CSS style string with body styles, padding and border.
     * @private
     */
    initBodyStyles: function() {
        var me = this,
            body = me.getProtoBody();

        if (me.bodyPadding !== undefined) {
            if (me.layout.managePadding) {
                // If the container layout manages padding, the layout will apply the 
                // padding to an inner element rather than the body element.  The
                // assumed intent is for the configured padding to override any padding
                // that is applied to the body element via stylesheet rules.  It is
                // therefore necessary to set the body element's padding to "0".
                body.setStyle('padding', 0);
            } else {
                body.setStyle('padding', this.unitizeBox((me.bodyPadding === true) ? 5 : me.bodyPadding));
            }
        }
        me.initBodyBorder();
    },

    initBodyBorder: function() {
        var me = this;

        if (me.frame && me.bodyBorder) {
            if (!Ext.isNumber(me.bodyBorder)) {
                me.bodyBorder = 1;
            }
            me.getProtoBody().setStyle('border-width', this.unitizeBox(me.bodyBorder));
        }
    },

    getCollapsedDockedItems: function () {
        var me = this;
        return me.header === false || me.collapseMode == 'placeholder' ? me.emptyArray : [ me.getReExpander() ];
    },

    /**
     * Sets the body style according to the passed parameters.
     * @param {Mixed} style A full style specification string, or object, or the name of a style property to set.
     * @param {String} value If the first param was a style property name, the style property value.
     * @return {Ext.panel.Panel} this
     */
    setBodyStyle: function(style, value) {
        var me = this,
            body = me.rendered ? me.body : me.getProtoBody();

        if (Ext.isFunction(style)) {
            style = style();
        }
        if (arguments.length == 1) {
            if (Ext.isString(style)) {
                style = Ext.Element.parseStyles(style);     
            }
            body.setStyle(style);
        } else {
            body.setStyle(style, value);
        }
        return me;
    },

    /**
     * Adds a CSS class to the body element. If not rendered, the class will
     * be added when the panel is rendered. 
     * @param {String} cls The class to add
     * @return {Ext.panel.Panel} this
     */
    addBodyCls: function(cls) {
        var me = this,
            body = me.rendered ? me.body : me.getProtoBody();

        body.addCls(cls);
        return me;
    },

    /**
     * Removes a CSS class from the body element.
     * @param {String} cls The class to remove
     * @return {Ext.panel.Panel} this
     */
    removeBodyCls: function(cls) {
        var me = this,
            body = me.rendered ? me.body : me.getProtoBody();

        body.removeCls(cls);
        return me;
    },

    // inherit docs
    addUIClsToElement: function(cls) {
        var me = this,
            result = me.callParent(arguments);

        me.addBodyCls([Ext.baseCSSPrefix + cls, me.baseCls + '-body-' + cls, me.baseCls + '-body-' + me.ui + '-' + cls]);
        return result;
    },

    // inherit docs
    removeUIClsFromElement: function(cls) {
        var me = this,
            result = me.callParent(arguments);

        me.removeBodyCls([Ext.baseCSSPrefix + cls, me.baseCls + '-body-' + cls, me.baseCls + '-body-' + me.ui + '-' + cls]);
        return result;
    },

    // inherit docs
    addUIToElement: function() {
        var me = this;

        me.callParent(arguments);
        me.addBodyCls(me.baseCls + '-body-' + me.ui);
    },

    // inherit docs
    removeUIFromElement: function() {
        var me = this;

        me.callParent(arguments);
        me.removeBodyCls(me.baseCls + '-body-' + me.ui);
    },

    // @private
    getTargetEl : function() {
        return this.body;
    },

    applyTargetCls: function(targetCls) {
        this.getProtoBody().addCls(targetCls);
    },

    getRefItems: function(deep) {
        var items = this.callParent(arguments);

        return this.getDockingRefItems(deep, items);
    },

    setupRenderTpl: function (renderTpl) {
        this.callParent(arguments);
        this.setupDockingRenderTpl(renderTpl);
    }
});
