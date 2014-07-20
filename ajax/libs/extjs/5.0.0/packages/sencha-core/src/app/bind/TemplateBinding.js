/**
 * This class is created to manage a template against a `ViewModel`. A binding of this
 * type uses `{@link Ext.app.bind.Template}` to process the template text so see that
 * class for details on template syntax.
 *
 * The bindings to provide the data needed by the template are managed here.
 */
Ext.define('Ext.app.bind.TemplateBinding', {
    extend: 'Ext.app.bind.BaseBinding',

    requires: [
        'Ext.app.bind.Multi',
        'Ext.app.bind.Template'
    ],

    isTemplateBinding: true,

    lastValue: undefined,

    value: undefined,

    constructor: function (template, owner, callback, scope, options) {
        var me = this,
            tpl = new Ext.app.bind.Template(template),
            tokens = tpl.getTokens();

        me.callParent([ owner, callback, scope, options ]);

        me.tpl = tpl;
        me.tokens = tokens;
        tokens.$literal = true;

        // If we don't have any tokens, then we've just got a static string.
        if (tokens.length) {
            me.multiBinding = new Ext.app.bind.Multi(tokens, owner, me.onBindData, me);
        } else {
            me.isStatic = true;
            me.onData(tpl.text);
        }
    },
    
    destroy: function() {
        var me = this;
        Ext.destroy(me.multiBinding);
        me.tpl = me.multiBinding = null;
        me.callParent();
    },

    getFullName: function () {
        var multi = this.multiBinding;
        return this.fullName || (this.fullName = '$' + (multi ? multi.getFullName() : this.callParent()));
    },

    getRawValue: function () {
        return this.value;
    },

    getTemplateScope: function () {
        return null;
    },

    isDescendantOf: function () {
        return false;
    },

    isLoading: function () {
        var multi = this.multiBinding;
        return multi ? multi.isLoading() : false;
    },
    
    onBindData: function(data) {
        this.onData(this.tpl.apply(data, this.getTemplateScope()));
    },

    onData: function (value) {
        var me = this,
            lastValue = me.value;

        if (lastValue !== (me.value = value)) {
            me.lastValue = lastValue;
            me.schedule();
        }
    },

    react: function () {
        this.notify(this.value);
    },

    refresh: function () {
        var multi = this.multiBinding;
        if (multi) {
            multi.refresh();
        }
    },

    privates: {
        sort: function () {
            var multi = this.multiBinding;
            if (multi) {
                this.scheduler.sortItem(multi);
            }

            // Schedulable#sort === emptyFn
            //me.callParent();
        }
    }
});
