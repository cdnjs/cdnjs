/**
 * @private
 */
Ext.define('Ext.event.ListenerStack', {

    currentOrder: 'current',

    length: 0,

    constructor: function() {
        this.listeners = {
            before: [],
            current: [],
            after: []
        };

        this.lateBindingMap = {};

        return this;
    },

    add: function(fn, scope, options, order, observable) {
        var lateBindingMap = this.lateBindingMap,
            listeners = this.getAll(order),
            i = listeners.length,
            isMethodName = typeof fn === 'string',
            bindingMap, listener, id;

        if (isMethodName && scope && scope.isIdentifiable) {
            id = scope.getId();

            bindingMap = lateBindingMap[id];

            if (bindingMap) {
                if (bindingMap[fn]) {
                    return false;
                }
                else {
                    bindingMap[fn] = true;
                }
            }
            else {
                lateBindingMap[id] = bindingMap = {};
                bindingMap[fn] = true;
            }
        }
        else {
            if (i > 0) {
                while (i--) {
                    listener = listeners[i];

                    if (listener.fn === fn && listener.scope === scope) {
                        listener.options = options;
                        return false;
                    }
                }
            }
        }

        listener = this.create(fn, scope, options, order, observable);

        // Allow for {foo: 'onFoo', scope: 'this/controller'}
        if (isMethodName && (!scope || scope === 'this' || scope === 'controller')) {
            listener.boundFn = this.bindDynamicScope(observable, fn, scope);
            listener.isLateBinding = false;
        }

        if (options && options.prepend) {
            delete options.prepend;
            listeners.unshift(listener);
        }
        else {
            listeners.push(listener);
        }

        this.length++;

        return true;
    },

    bindDynamicScope: function (observable, funcName, passedScope) {
        return function () {
            var scope = observable.resolveListenerScope(passedScope);
            //<debug>
            if (typeof scope[funcName] !== 'function') {
                Ext.Error.raise('No such method ' + funcName + ' on ' + scope.$className);
            }
            //</debug>
            return scope[funcName].apply(scope, arguments);
        };
    },

    getAt: function (index, order) {
        return this.getAll(order)[index];
    },

    getAll: function (order) {
        return this.listeners[order || this.currentOrder];
    },

    count: function (order) {
        return this.getAll(order).length;
    },

    create: function (fn, scope, options, order, observable) {
        options = options || {};
        return {
            stack: this,
            fn: fn,
            firingFn: false,
            boundFn: false,
            isLateBinding: typeof fn === 'string',
            scope: scope,
            options: options,
            order: order,
            observable: observable,
            type: options.type
        };
    },

    remove: function (fn, scope, order) {
        var listeners = this.getAll(order),
            i = listeners.length,
            isRemoved = false,
            lateBindingMap = this.lateBindingMap,
            listener, id;

        if (i > 0) {
            // Start from the end index, faster than looping from the
            // beginning for "single" listeners,
            // which are normally LIFO
            while (i--) {
                listener = listeners[i];

                if (listener.fn === fn && listener.scope === scope) {
                    listeners.splice(i, 1);
                    isRemoved = true;
                    this.length--;

                    if (scope && scope.isIdentifiable && typeof fn === 'string') {
                        id = scope.getId();

                        if (lateBindingMap[id] && lateBindingMap[id][fn]) {
                            delete lateBindingMap[id][fn];
                        }
                    }
                    break;
                }
            }
        }

        return isRemoved;
    }
});
