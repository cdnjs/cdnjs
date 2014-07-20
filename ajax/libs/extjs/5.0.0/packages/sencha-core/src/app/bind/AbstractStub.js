/**
 * This class manages bindings for a `Session` or `ViewModel`.
 * @private
 */
Ext.define('Ext.app.bind.AbstractStub', {
    extend: 'Ext.util.Schedulable',

    requires: [
        'Ext.app.bind.Binding'
    ],

    children: null,

    depth: 0,

    generation: 1,

    kind: 10,

    parent: null,

    constructor: function (owner, name) {
        var me = this;

        /**
         * @property {Ext.data.Session/Ext.app.ViewModel} owner
         * This property is set at creation of ths stub and should not be changed.
         * @readonly
         */
        me.owner = owner;
        me.name = name;

        me.callParent();
    },

    destroy: function () {
        var me = this,
            children = me.children,
            bindings = me.bindings,
            len, i, key;

        if (bindings) {
            for (i = 0, len = bindings.length; i < len; ++i) {
                bindings[i].destroy(true);
            }
        }

        for (key in children) {
            children[key].destroy();
        }
        me.callParent();
        me.bindings = me.children = me.owner = null;
    },

    add: function (child) {
        var me = this;

        (me.children || (me.children = {}))[child.name] = child;

        child.depth = me.depth + 1;
        child.parent = me;
    },

    getChild: function (path) {
        var pathArray = Ext.isString(path) ? path.split('.') : path;

        if (pathArray && pathArray.length) {
            return this.descend(pathArray, 0);
        }

        return this;
    },

    getFullName: function () {
        var me = this,
            name = me.fullName,
            parent = me.parent,
            s;

        if (!name) {
            name = me.name || me.id;
            if (parent && (s = parent.getFullName())) {
                name = ((s.charAt(s.length-1) !== ':') ? s + '.' : s) + name;
            }
            me.fullName = name;
        }

        return name;
    },

    getSession: function () {
        var owner = this.owner;

        return owner.isSession ? owner : owner.getSession();
    },

    bind: function (callback, scope, options) {
        var me = this,
            binding = new Ext.app.bind.Binding(me, callback, scope, options),
            bindings = (me.bindings || (me.bindings = []));

        binding.depth = me.depth;
        bindings.push(binding);

        return binding;
    },

    getValue: function () {
        return this.isLoading() ? null : this.getRawValue();
    },

    graft: function (replacement) {
        var me = this,
            bindings = me.bindings,
            name = me.name,
            i;

        // Clear these so that when we call destroy we won't damage anything:
        me.parent = me.bindings = null;
        me.destroy(); // we may be scheduled

        replacement.depth = me.depth;
        replacement.bindings = bindings;
        replacement.generation = me.generation + 1;
        replacement.name = name;
        replacement.id = me.id;
        replacement.path = me.path;

        // Now for the fun part...
        if (bindings) {
            for (i = bindings.length; i-- > 0; ) {
                bindings[i].stub = replacement;
            }
        } 

        return replacement;
    },

    isDescendantOf: function (item) {
        for (var parent = this; parent = parent.parent; ) {
            if (parent === item) {
                return true;
            }
        }
        return false;
    },

    onSchedule: function() {
        // When a stub changes, say "foo.bar.baz" we may need to notify bindings on our
        // parents "foo.bar" and "foo", This is true especially when these are targets of
        // links. To economize on this we require that bindings that want to be notified
        // of changes to sub-properties of their target set the "deep" property to true.
        for (var i, len, binding, bindings, p = this.parent; p; p = p.parent) {
            bindings = p.bindings;
            if (bindings) {
                for (i = 0, len = bindings.length; i < len; ++i) {
                    binding = bindings[i];
                    if (binding.deep && !binding.scheduled) {
                        binding.schedule();
                    }
                }
            }
        }
    },

    react: function () {
        var bindings = this.bindings,
            binding, i, len;
            
        if (bindings) {
            for (i = 0, len = bindings.length; i < len; ++i) {
                binding = bindings[i];
                if (!binding.scheduled) {
                    binding.schedule();
                }
            }
        }
    },

    unbind: function (binding) {
        var bindings = this.bindings;

        if (bindings && bindings.length) {
            Ext.Array.remove(bindings, binding);
        }
    },

    collect: function() {
        var children = this.children,
            bindings = this.bindings,
            totalCount = 0,
            count = 0,
            child,
            key;
        
        if (children) {
            for (key in children) {
                child = children[key];
                count = child.collect();
                if (count === 0) {
                    // The child (and any deep children) have no bindings,
                    // so we can consider it a dead node.
                    child.destroy();
                    delete children[key];
                }
                totalCount += count;
            }
        }
        
        if (bindings) {
            totalCount += bindings.length;
        }
        
        return totalCount;
    },

    privates: {
        getScheduler: function () {
            var owner = this.owner;
            return owner && owner.getScheduler();
        },
        
        sort: function () {
            var parent = this.parent;

            if (parent) {
                // We sort our parent first because if it is something like a link we need
                // it to determine the value of the root-level property before we can dot
                // our way into it. This is especially important for formulas that might
                // throw errors if the links have not published results before they run.
                this.scheduler.sortItem(parent);
            }

            // Schedulable#sort === emptyFn
            //me.callParent();
        }
    }
});
