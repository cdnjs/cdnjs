/**
 * This class is created to manage a direct bind. Both `Ext.data.Session`
 * and `Ext.app.ViewModel` return these objects from their `bind` method.
 */
Ext.define('Ext.app.bind.Binding', {
    extend: 'Ext.app.bind.BaseBinding',

    /**
     * @cfg {Boolean} [deep=false]
     * Normally a binding is only notified of changes to its bound property, but if that
     * property is an object it is sometimes helpful to be notified of changes to its
     * properties. To receive notifications of changes to all properties of a bound object,
     * set this to `true`.
     * @since 5.0.0
     */

    constructor: function (stub, callback, scope, options) {
        var me = this;

        me.callParent([ stub.owner, callback, scope, options ]);

        me.stub = stub;
        me.depth = stub.depth;

        // We need to announce the current value, so if the stub is not loading (which
        // will generate its own announcement to all bindings) then we need to schedule
        // ourselves.
        if (!stub.isLoading() && !stub.scheduled) {
            me.schedule();
        }
    },

    /**
     * Destroys this binding. No further calls will be made to the callback method. No
     * methods should be called on this binding after calling this method.
     * @since 5.0.0
     */
    destroy: function (/* private */ fromParent) {
        var me = this,
            stub = me.stub;

        if (stub && !fromParent) {
            stub.unbind(me);
            me.stub = null;
        }

        me.callParent();
    },

    /**
     * Binds to the `validation` association for the bound property. For example, when a
     * binding is bound to something like this:
     *
     *      var binding = viewModel.bind('{theUser.name}', ...);
     *
     * The validation status for the "name" property can be requested like so:
     *
     *      var validationBinding = binding.bindValidation(fn, scope);
     *
     * Calling this method in the above example would be equivalent to the following bind:
     *
     *      var validationBinding = viewModel.bind('{theUser.validation.name}', fn, scope);
     *
     * The primary reason to use this method is in cases where the original bind expression
     * is not known.
     *
     * For example, this method is used by `Ext.form.field.Base` when given the
     * `{@link Ext.Component#modelValidation modelValidation}` config is set. As such it
     * not common for users to need to call this method.
     *
     * @param {Function} callback The function to call when the validation changes.
     * @param {Object} [scope] The scope on which to call the `callback`.
     * @return {Ext.app.bind.Binding} A binding to the validation of the bound property.
     * @since 5.0.0
     */
    bindValidation: function (callback, scope) {
        var stub = this.stub;
        return stub && stub.bindValidation(callback, scope);
    },

    /**
     * Returns the diagnostic name for this binding.
     * @return {String}
     * @since 5.0.0
     */
    getFullName: function () {
        return this.fullName || (this.fullName = '@(' + this.stub.getFullName() + ')');
    },

    /**
     * Returns the current value of the bound property. If this binding `isLoading` this
     * value will be `undefined`.
     * @return {Mixed} The value of the bound property.
     * @since 5.0.0
     */
    getValue: function () {
        var me = this,
            stub = me.stub,
            ret = stub && stub.getValue();

        if (me.transform) {
            ret = me.transform(ret);
        }

        return ret;
    },

    /**
     * Returns `true` if the bound property is loading. In the general case this means
     * that the value is just not available yet. In specific cases, when the bound property
     * is an `Ext.data.Model` it means that a request to the server is in progress to get
     * the record. For an `Ext.data.Store` it means that `{@link Ext.data.Store#load load}`
     * has been called on the store but it is still in progress.
     * @return {Boolean}
     * @since 5.0.0
     */
    isLoading: function () {
        var stub = this.stub;
        return stub && stub.isLoading();
    },

    /**
     * This method returns `true` if this binding can only be read. If this method returns
     * `false` then the binding can be set using `setValue` (meaning this binding can be
     * a two-way binding).
     * @return {boolean}
     * @since 5.0.0
     */
    isReadOnly: function () {
        var stub = this.stub,
            options = this.options,
            formula;

        // Not all Stubs can be set
        if (stub && stub.set && !(options && options.twoWay === false)) {
            formula = stub.formula;
            // Having a normal formula means readOnly, but if that formula defines a
            // "set" method than we are good.
            if (!formula || formula.set) {
                return false; // not readOnly so can be two-way
            }
        }

        return true; // readOnly so just one-way
    },

    /**
     * Tells the bound property to refresh itself. This has meaning when the bound property
     * is something like an `Ext.data.Model` and an `Ext.data.Store` but does nothing in
     * most cases.
     * @since 5.0.0
     */
    refresh: function () {
        //TODO - maybe nothing to do here but entities/stores would have work to do
    },

    /**
     * Sets the value of the bound property. This will throw an error in debug mode if
     * this binding `isReadOnly`.
     * @param {Mixed} value The new value.
     * @since 5.0.0
     */
    setValue: function (value) {
        //<debug>
        if (this.isReadOnly()) {
            Ext.Error.raise('Cannot setValue on a readonly binding');
        }
        //</debug>

        var stub = this.stub,
            formula = stub.formula;

        if (formula) {
            // Formulas receive the ViewModel as their this pointer
            formula.set.call(stub.owner, value);
        } else {
            stub.set(value);
        }
    },

    privates: {
        getDataObject: function () {
            var stub = this.stub;
            return stub && stub.getDataObject();
        },

        getRawValue: function () {
            var me = this,
                stub = me.stub,
                ret = stub && stub.getRawValue();

            if (me.transform) {
                ret = me.transform(ret);
            }

            return ret;
        },

        isDescendantOf: function (item) {
            var stub = this.stub;

            return stub ? (item === stub) || stub.isDescendantOf(item) : false;
        },

        react: function () {
            this.notify(this.getValue());
        },

        schedule: function() {
            // If the parent stub is already scheduled, then we will be
            // called when the stub hits the next tick.
            if (!this.stub.scheduled) {
                this.callParent();
            }
        },
        
        sort: function () {
            var stub = this.stub;

            stub.scheduler.sortItem(stub);

            // Schedulable#sort === emptyFn
            //me.callParent();
        }
    }
});
