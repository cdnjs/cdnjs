/**
 * An internally used DataView for {@link Ext.form.field.ComboBox ComboBox}.
 */
Ext.define('Ext.view.BoundList', {
    extend: 'Ext.view.View',
    alias: 'widget.boundlist',
    alternateClassName: 'Ext.BoundList',
    requires: ['Ext.layout.component.BoundList', 'Ext.toolbar.Paging'],

    mixins: [
        'Ext.mixin.Queryable'
    ],

    /**
     * @cfg {Number} [pageSize=0]
     * If greater than `0`, a {@link Ext.toolbar.Paging} is displayed at the bottom of the list and store
     * queries will execute with page {@link Ext.data.operation.Read#start start} and
     * {@link Ext.data.operation.Read#limit limit} parameters.
     */
    pageSize: 0,

    /**
     * @cfg {String} [displayField=""]
     * The field from the store to show in the view.
     */

    /**
     * @property {Ext.toolbar.Paging} pagingToolbar
     * A reference to the PagingToolbar instance in this view. Only populated if {@link #pageSize} is greater
     * than zero and the BoundList has been rendered.
     */

    // private overrides
    baseCls: Ext.baseCSSPrefix + 'boundlist',
    itemCls: Ext.baseCSSPrefix + 'boundlist-item',
    listItemCls: '',
    shadow: false,
    trackOver: true,

    preserveScrollOnRefresh: true,

    componentLayout: 'boundlist',

    autoScroll: true,

    childEls: [
        'listWrap', 'listEl'
    ],

    renderTpl: [
        '<div id="{id}-listWrap" data-ref="listWrap" role="presentation" class="{baseCls}-list-ct ', Ext.dom.Element.unselectableCls, '">',
            '<ul id="{id}-listEl" data-ref="listEl" class="' + Ext.plainListCls + '">',
            '</ul>',
        '</div>',
        '{%',
            'var pagingToolbar=values.$comp.pagingToolbar;',
            'if (pagingToolbar) {',
                'Ext.DomHelper.generateMarkup(pagingToolbar.getRenderTree(), out);',
            '}',
        '%}',
        {
            disableFormats: true
        }
    ],

    /**
     * @cfg {String/Ext.XTemplate} tpl
     * A String or Ext.XTemplate instance to apply to inner template.
     *
     * {@link Ext.view.BoundList} is used for the dropdown list of {@link Ext.form.field.ComboBox}.
     * To customize the template you can do this:
     *
     *     Ext.create('Ext.form.field.ComboBox', {
     *         fieldLabel   : 'State',
     *         queryMode    : 'local',
     *         displayField : 'text',
     *         valueField   : 'abbr',
     *         store        : Ext.create('StateStore', {
     *             fields : ['abbr', 'text'],
     *             data   : [
     *                 {"abbr":"AL", "name":"Alabama"},
     *                 {"abbr":"AK", "name":"Alaska"},
     *                 {"abbr":"AZ", "name":"Arizona"}
     *                 //...
     *             ]
     *         }),
     *         listConfig : {
     *             tpl : '<tpl for="."><div class="x-boundlist-item">{abbr}</div></tpl>'
     *         }
     *     });
     *
     * Defaults to:
     *
     *     Ext.create('Ext.XTemplate',
     *         '<ul><tpl for=".">',
     *             '<li role="option" class="' + itemCls + '">' + me.getInnerTpl(me.displayField) + '</li>',
     *         '</tpl></ul>'
     *     );
     *
     */

    initComponent: function() {
        var me = this,
            baseCls = me.baseCls,
            itemCls = me.itemCls;

        me.selectedItemCls = baseCls + '-selected';
        if (me.trackOver) {
            me.overItemCls = baseCls + '-item-over';
        }
        me.itemSelector = "." + itemCls;
        me.scrollerSelector = 'ul.' + Ext.plainListCls;

        if (me.floating) {
            me.addCls(baseCls + '-floating');
        }

        if (!me.tpl) {
            // should be setting aria-posinset based on entire set of data
            // not filtered set
            me.tpl = new Ext.XTemplate(
                '<tpl for=".">',
                    '<li role="option" unselectable="on" class="' + itemCls + '">' + me.getInnerTpl(me.displayField) + '</li>',
                '</tpl>'
            );
        } else if (!me.tpl.isTemplate) {
            me.tpl = new Ext.XTemplate(me.tpl);
        }

        if (me.pageSize) {
            me.pagingToolbar = me.createPagingToolbar();
        }

        me.callParent();
    },

    getRefOwner: function() {
        return this.pickerField || this.callParent();
    },

    getRefItems: function() {
        var result = this.callParent(),
            toolbar = this.pagingToolbar;
        
        if (toolbar) {
            result.push(toolbar);
        }
        return result;
    },

    createPagingToolbar: function() {
        return Ext.widget('pagingtoolbar', {
            id: this.id + '-paging-toolbar',
            pageSize: this.pageSize,
            store: this.dataSource,
            border: false,
            ownerCt: this,
            ownerLayout: this.getComponentLayout()
        });
    },

    getNodeContainer: function() {
        return this.listEl;
    },

    refresh: function(){
        var me = this,
            tpl = me.tpl,
            toolbar = me.pagingToolbar,
            rendered = me.rendered;

        // Allow access to the context for XTemplate scriptlets
        tpl.field = me.pickerField;
        tpl.store = me.store;
        me.callParent();
        tpl.field =  tpl.store = null;

        // The view removes the targetEl from the DOM before updating the template
        // Ensure the toolbar goes to the end
        if (rendered && toolbar && toolbar.rendered && !me.preserveScrollOnRefresh) {
            me.el.appendChild(toolbar.el, true);
        }
    },

    bindStore : function(store, initial) {
        var toolbar = this.pagingToolbar;

        this.callParent(arguments);
        if (toolbar) {
            toolbar.bindStore(store, initial);
        }
    },

    /**
     * A method that returns the inner template for displaying items in the list.
     * This method is useful to override when using a more complex display value, for example
     * inserting an icon along with the text.
     *
     * The XTemplate is created with a reference to the owning form field in the `field` property to provide access
     * to context. For example to highlight the currently typed value, the getInnerTpl may be configured into a
     * ComboBox as part of the {@link Ext.form.field.ComboBox#listConfig listConfig}:
     *
     *    listConfig: {
     *        getInnerTpl: function() {
     *            return '{[values.name.replace(this.field.getRawValue(), "<b>" + this.field.getRawValue() + "</b>")]}';
     *        }
     *    }
     * @param {String} displayField The {@link #displayField} for the BoundList.
     * @return {String} The inner template
     */
    getInnerTpl: function(displayField) {
        return '{' + displayField + '}';
    },

    onDestroy: function() {
        this.callParent();
        Ext.destroyMembers(this, 'pagingToolbar', 'listWrap', 'listEl');
    },

    privates: {
        getTargetEl: function() {
            return this.listEl;
        },

        getOverflowEl: function() {
            return this.listWrap;
        },

        // Do the job of a container layout at this point even though we are not a Container.
        finishRenderChildren: function () {
            var toolbar = this.pagingToolbar;

            this.callParent(arguments);

            if (toolbar) {
                toolbar.finishRender();
            }
        }
    }
});
