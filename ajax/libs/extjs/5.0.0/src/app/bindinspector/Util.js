/**
 * @private
 * @class Ext.app.bindinspector.Util
 */
Ext.define('Ext.app.bindinspector.Util', {
    singleton: true,
    
    getChildStub: function (name, parent) {
        var val, children;
        if (parent) {
            children = parent.children;
            if (children) {
                val = children[name];
            }
        }
        return val || null;
    },

    valueRenderer: function(v) {
        var s;
        
        if (v === undefined) {
            return 'undefined';
        } else if (v === null) {
            return 'null';
        } else if (Ext.isString(v)) {
            return v;
        } else if (Ext.isDate(v)) {
            return Ext.Date.format(v, 'c');
        } else if (v && v.isModel) {
            s = v.entityName;
            return Ext.String.format('Model({0}, {1})', s.replace('noconflict.', ''), v.getId());
        } else if (v && v.isStore) {
            s = v.entityName || 'Anonymous';
            return 'Store{' + s.replace('noconflict.', '') + '}';
        }
        return v;
    },

    buildBindData: function(bind) {
        var out = [],
            key, o;
        
        for (key in bind) {
            o = bind[key];
            out.push({
                key: key,
                descriptor: o.descriptor,
                tokens: o.tokens,
                value: o.value,
                binding: o
            });
        }
        return out;
    }
});