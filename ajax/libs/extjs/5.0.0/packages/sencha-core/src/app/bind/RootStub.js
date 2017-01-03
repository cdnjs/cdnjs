/**
 * This class is the root stub for managing a `Session`.
 * @private
 */
Ext.define('Ext.app.bind.RootStub', {
    extend: 'Ext.app.bind.AbstractStub',
    requires: [
        'Ext.app.bind.LinkStub',
        'Ext.app.bind.Stub'
    ],

    isRootStub: true,
    
    depth: 0,

    createRootChild: function (name, direct) {
        var me = this,
            owner = me.owner,
            ownerData = owner.getData(),
            children = me.children,
            previous = children && children[name],
            parentStub = previous ? null : me,
            parentVM, stub;

        if (direct || ownerData.hasOwnProperty(name) || !(parentVM = owner.getParent())) {
            stub = new Ext.app.bind.Stub(owner, name, parentStub);
        } else {
            stub = new Ext.app.bind.LinkStub(owner, name, previous ? null : parentStub);
            stub.link('{' + name + '}', parentVM);
        }

        if (previous) {
            previous.graft(stub);
        }

        return stub;
    },
    
    createStubChild: function(name) {
        return this.createRootChild(name, true);
    },

    descend: function (path, index) {
        var me = this,
            children = me.children,
            pos = index || 0,
            name = path[pos++],
            ret = (children && children[name]) || me.createRootChild(name);

        if (pos < path.length) {
            ret = ret.descend(path, pos);
        }

        return ret;
    },

    getFullName: function () {
        return this.fullName || (this.fullName = this.owner.id + ':');
    },

    // The root Stub is associated with the owner's "data" object

    getDataObject: function () {
        return this.owner.data;
    },

    getRawValue: function () {
        return this.owner.data;
    },

    getValue: function () {
        return this.owner.data;
    },

    isDescendantOf: function () {
        return false;
    },

    isLoading: function () {
        return false;
    },

    set: function (value) {
        //<debug>
        if (!value || value.constructor !== Object) {
            Ext.Error.raise('Only an object can be set at the root');
        }
        //</debug>

        var me = this,
            children = me.children || (me.children = {}),
            owner = me.owner,
            data = owner.data,
            parentVM = owner.getParent(),
            linkStub, stub, v, key;

        for (key in value) {
            //<debug>
            if (key.indexOf('.') >= 0) {
                Ext.Error.raise('Value names cannot contain dots');
            }
            //</debug>

            if ((v = value[key]) !== undefined) {
                if (!(stub = children[key])) {
                    stub = new Ext.app.bind.Stub(owner, key, me);
                } else if (stub.isLinkStub) {
                    // Pass parent=null since we will graft in this new stub to replace us:
                    linkStub = stub;
                    stub = new Ext.app.bind.Stub(owner, key);
                    linkStub.graft(stub);
                }

                stub.set(v);
            } else if (data.hasOwnProperty(key)) {
                delete data[key];

                stub = children[key];
                if (stub && !stub.isLinkStub && parentVM) {
                    stub = me.createRootChild(key);
                }

                stub.invalidate(true);
            }
        }
    },

    schedule: Ext.emptyFn,
    
    unschedule: Ext.emptyFn
});
