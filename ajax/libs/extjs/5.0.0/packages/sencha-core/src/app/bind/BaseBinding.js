/**
 * This class is the base for `Binding` and `MultiBinding`.
 * @private
 */
Ext.define('Ext.app.bind.BaseBinding', {
    extend: 'Ext.util.Schedulable',

    calls: 0,

    kind: 20,

    defaultOptions: {},

    lastValue: undefined,

    /**
     * @cfg {Boolean} [single=false]
     * This option instructs the binding to call its `destroy` method immediately after
     * delivering the initial value.
     * @since 5.0.0
     */

    constructor: function (owner, callback, scope, options) {
        var me = this;

        me.options = options;
        me.owner = owner;
        me.scope = scope;
        me.callback = callback;

        //<debug>
        if (!callback) {
            Ext.Error.raise('Callback is required');
        }
        //</debug>

        // If given a string callback name, preserve the late binding:
        me.lateBound = Ext.isString(callback);
        if (options && options.deep) {
            me.deep = true;
        }

        me.callParent();
    },

    destroy: function () {
        var me = this;
        me.callParent();
        me.scope = me.callback = me.owner = null;
    },

    privates: {
        getScheduler: function () {
            var owner = this.owner;
            return owner && owner.getScheduler();
        },

        getSession: function () {
            var owner = this.owner;
            return owner.isSession ? owner : owner.getSession();
        },

        notify: function (value) {
            var me = this,
                options = me.options || me.defaultOptions,
                previous = me.lastValue;

            // We want to deliver if:
            // 1) We've never been called
            // 2) We're a deep binding, which means that our object reference may not have changed,
            //    but something under us has changed. For example a link stub or a model field binding
            // 3) If the value has changed
            // 4) If the value is an array. It's difficult to tell if the underlying data changed
            if (!me.calls || me.deep || previous !== value || Ext.isArray(value)) {
                ++me.calls;
                me.lastValue = value;

                if (me.lateBound) {
                    // Interestingly, lateBound-ness may be more efficient since it does
                    // not use the "call" method.
                    me.scope[me.callback](value, previous, me);
                } else {
                    me.callback.call(me.scope, value, previous, me);
                }

                if (options.single) {
                    me.destroy();
                }
            }
        }
    }
});
