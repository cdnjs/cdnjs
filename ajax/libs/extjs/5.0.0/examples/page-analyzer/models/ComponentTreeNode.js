Ext.define('PageAnalyzer.models.ComponentTreeNode', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'text', type: 'string' },
        { name: 'compId', type: 'string' },
        { name: 'refName', type: 'string' },
        { name: 'width', type: 'int'},
        { name: 'height', type: 'int'},
        { name: 'x', type: 'int'},
        { name: 'y', type: 'int'},
        { name: 'cssClass', type: 'string'},
        { name: 'xtype', type: 'string' },
        { name: 'rendered', type: 'boolean' },
        { name: 'hidden', type: 'boolean' },
        { name: 'isContainer', type: 'boolean' },
        { name: 'isElement', type: 'boolean' },
        { name: 'isComponent', type: 'boolean', defualtValue: false }
    ],

    jasmineTpl: [
        'expect(Ext.widget({cfg})).toHaveLayout({spec});'
    ],

    isSimpleType: function(val) {
//        var t = (typeof val);
//        return (t == 'number' || t == 'string' || t == 'boolean');
        return Ext.isPrimitive(val);
    },

    isArray: function(val) {
        var t = (typeof val);
        return (Ext.isArray(val) || t == 'Ext.util.Queue');
    },

    getComponentConfig: function(initCfg) {
        var me = this,
            cfg = {},
            arry;

        initCfg = (initCfg.isComponent)
            ? initCfg.initialConfig
            : initCfg;

        if (me.isSimpleType(initCfg)) {
            return initCfg;
        }

        Ext.Object.each(initCfg, function(name, val){
            if (val) {

                if (me.isSimpleType(val)) {
                    cfg[name] = val;
                } else if (val.isComponent) {
                    cfg[name] = me.getComponentConfig(val.initialConfig);
                    cfg['xtype'] = val.getXType();
                } else if (me.isArray(val)) {
                    arry = cfg[name] || (cfg[name] = []);
                    Ext.each(val, function(v) {
                        if (v) {
                           arry.push(me.getComponentConfig(v));
                        }
                    }, me);
                } else {
                    cfg[name] = me.getComponentConfig(val);
                }
            }
        });

        return cfg;
    },

    getTestSpec: function() {
        var data = this.data,
            spec = {},
            children = this.childNodes,
            len = children.length,
            specs = [],
            child, i, name;

        if (data.refName == 'items' || data.refName == 'dockedItems') {

            for (i = 0; i < len; i++) {
                child = children[i];
                if (!child.data.hidden) {
                    spec[i] = child.getTestSpec();
                }
            }
            return spec;

        } else if (data.isElement) {
            var dims = [];
            dims.push(data.x, data.y, data.width, data.height);
            return {
                xywh: dims.join(' ')
            };

        } else {

            for (i = 0; i < len; i++) {
                child = children[i];
                name = child.data.refName;
                if (!child.data.hidden) {
                    spec[name] = child.getTestSpec();
                }
            }

            return spec;
        }
    },

    getJasmineSpec: function(){
        var me = this,
            data = me.data,
            ctx = {
                spec: Ext.JSON.encodeValue(me.getTestSpec(), '\n')
            };


        return Ext.XTemplate.getTpl(me, 'jasmineTpl').apply(ctx);
    }
});
