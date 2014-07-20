Ext.define('Ext.overrides.Widget', {
    override: 'Ext.Widget',

    $configStrict: false,

    isComponent: true,

    liquidLayout: true,

    // in Ext JS the rendered flag is set as soon as a component has its element.  Since
    // widgets always have an element when constructed, they are always considered to be
    // "rendered"
    rendered: true,

    rendering: true,

    cachedConfig: {
        baseCls: Ext.baseCSSPrefix + 'widget'
    },

    constructor: function(config) {
        this.callParent([config]);

        // initialize the component layout
        this.getComponentLayout();
    },

    addCls: function(cls) {
        this.el.addCls(cls);
    },

    addClsWithUI: function(cls) {
        this.el.addCls(cls);
    },

    afterComponentLayout: Ext.emptyFn,

    finishRender: function () {
        this.rendering = false;
        this.initBindable();
    },

    getComponentLayout: function() {
        var me = this,
            layout = me.componentLayout;

        if (!layout) {
            layout = me.componentLayout = new Ext.layout.component.Auto();
            layout.setOwner(me);
        }

        return layout;
    },

    /**
     * @private
     * Needed for when widget is rendered into a grid cell. The class to add to the cell element.
     */
    getTdCls: function() {
        return Ext.baseCSSPrefix + this.getTdType() + '-' + (this.ui || 'default') + '-cell';
    },

    /**
     * @private
     * Partner method to {@link #getTdCls}.
     *
     * Returns the base type for the component. Defaults to return `this.xtype`, but
     * All derived classes of {@link Ext.form.field.Text TextField} can return the type 'textfield',
     * and all derived classes of {@link Ext.button.Button Button} can return the type 'button'
     */
    getTdType: function() {
        return this.xtype;
    },

    /**
     * Returns the value of {@link #itemId} assigned to this component, or when that
     * is not set, returns the value of {@link #id}.
     * @return {String}
     */
    getItemId: function() {
        return this.itemId || this.id;
    },

    getSizeModel: function() {
        return Ext.Component.prototype.getSizeModel.apply(this, arguments);
    },

    onAdded: function (container, pos, instanced) {
        var me = this,
            inheritedState = me.inheritedState;

        me.ownerCt = container;

        // The container constructed us, so it's not possible for our
        // inheritedState to be invalid, so we only need to clear it
        // if we've been added as an instance
        if (inheritedState && instanced) {
            me.invalidateInheritedState();
        }

        if (me.reference) {
            me.fixReference();
        }
    },

    onRemoved: function(destroying) {
        var me = this,
            refHolder;

        if (me.reference) {
            refHolder = me.lookupReferenceHolder();
            if (refHolder) {
                refHolder.clearReference(me);
            }
        }

        if (!destroying) {
            me.removeBindings();
        }

        if (me.inheritedState && !destroying) {
            me.invalidateInheritedState();
        }

        me.ownerCt = me.ownerLayout = null;
    },

    parseBox: function(box) {
        return Ext.Element.parseBox(box);
    },

    render: function(container, position) {
        var element = this.element,
            nextSibling;

        if (position) {
            nextSibiling = container.childNodes[position];
            if (nextSibling) {
                container.insertBefore(element, nextSibling);
                return;
            }
        }

        container.appendChild(element);
    },

    setPosition: function(x, y) {
        this.el.setLocalXY(x, y);
    }

}, function() {
    var prototype;

    if (Ext.isIE8) {
        prototype = Ext.Widget.prototype;
        // Since IE8 does not support Object.defineProperty we can't add the reference
        // node on demand, so we just fall back to adding all references up front.
        prototype.addElementReferenceOnDemand = prototype.addElementReference;
    }
});
