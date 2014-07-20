/**
 * @private
 * @class Ext.app.bindinspector.Environment
 */
Ext.define('Ext.app.bindinspector.Environment', {
    requires: [
        'Ext.util.Collection'
    ],
    
    /*
    ** Utility methods
     */
    getCmp: function(id) {
        return this.components.get(id);
    },
    
    getVM: function(id) {
        return this.viewModels.get(id);
    },
    
    getInheritedVM: function(comp) {
        var vm = comp.viewModel,
            parent = comp.parent;
        
        if (vm) {
            return vm;
        }
        
        if (parent) {
            return this.getInheritedVM(this.getCmp(parent));
        }
        
        return null;
    },
    
    
    /*
    ** Capture methods
     */
    
    captureSnapshot: function() {
        var all = Ext.ComponentManager.getAll(),
            len = all.length,
            components = [],
            i, comp;
        
        this.models = {};
        for (i = 0; i < len; ++i) {
            comp = all[i];
            // afterRender check is a hack for now
            if (comp.afterRender && this.isRootComponent(comp)) {
                components.push(this.buildComponent(comp));
            }
        }
        
        return {
            isBindData: true,
            version: Ext.getVersion().version,
            models: this.models,
            components: components
        };
    },
    
    serializeModel: function(Model) {
        var models = this.models,
            name = Model.entityName;
        
        if (!models[name]) {
            models[name] = Ext.Array.map(Model.getFields(), function(field) {
                return {
                    name: field.getName(),
                    type: field.getType()
                };
            });
        }
    },
    
    isRootComponent: function(c) {
        var owner = c.getRefOwner();
        if (owner || c.isBindInspector || c === Ext.MessageBox || c.is('quicktip')) {
            return false;
        }
        return true;
    },
    
    buildComponent: function(comp) {
        var childItems = comp.getRefItems ? comp.getRefItems() : null,
            viewModel = comp.getViewModel(),
            bind = comp.getBind(),
            id = comp.id,
            len, i, o,
            child;
        
        if (bind) {
            bind = this.buildBind(bind);
        }
        o = {
            id: id,
            xtype: comp.getXType(),
            publishes: comp.getPublishes(),
            viewModel: viewModel ? this.buildViewModel(viewModel, comp) : null,
            bindings: bind || null,
            reference: comp.reference || null,
            items: []
        };
        
        if (childItems) {
            for (i = 0, len = childItems.length; i < len; ++i) {
                if (childItems[i].afterRender) {
                    child = this.buildComponent(childItems[i]);
                    child.parent = id;
                    o.items.push(child);
                }
            }
        }        
        return o;
    },
    
    buildBind: function(bind) {
        var out = {},
            key, o, bindInfo, name, stub;
        
        for (key in bind) {
            o = bind[key];
            stub = o.stub;
            bindInfo = {
                id: o.id,
                value: this.serializeValue(o.getRawValue()),
                stub: stub ? {
                    id: stub.id,
                    name: stub.name
                } : null
            };
            if (o.isTemplateBinding) {
                bindInfo.isTemplateBinding = true;
                bindInfo.tokens = [];
                Ext.Array.forEach(o.tokens, function(token) {
                    bindInfo.tokens.push(token.split('.'));
                }, this);
                bindInfo.descriptor = o.tpl.text;
            } else if (o.isMultiBinding) {
                bindInfo.isMultiBinding = true;
                // TODO:
            } else {
                if (stub) {
                    name = this.buildStubName(stub);
                    bindInfo.tokens = name.split('.');
                    bindInfo.descriptor = '{' + name + '}';
                }
            }
            out[key] = bindInfo;
        }
        return out;
    },
    
    buildStubName: function(stub) {
        var parent = stub.parent,
            name = '';
        
        if (parent && !parent.isRootStub) {
            name = this.buildStubName(parent) + '.';
        }
        return name + stub.name;
    },
    
    buildViewModel: function(vm, comp) {
        var parent = vm.getParent();
        return {
            id: vm.getId(),
            view: comp.id,
            parent: parent ? parent.getId() : null,
            data: this.serializeValue(vm.getData(), true),
            rootStub: this.buildStub(vm.getRoot())
        };
    },
    
    buildStub: function(stub, isLinkChild) {
        var o = {},
            children = stub.children,
            isLink = stub.isLinkStub,
            outChildren = {},
            key, hasAny, child, sameTarget;
        
        if (!stub.isRootStub) {
            o.name = stub.name;
            o.parent = stub.parent ? stub.parent.id : null;
            o.isLoading = stub.isLoading();
            o.bindCount = (stub.bindings && stub.bindings.length) || 0;
            o.cumulativeBindCount = o.bindCount;
            o.value = this.serializeValue(stub.getRawValue());
            if (isLink) {
                sameTarget = stub.target === stub.owner;
                o.linkInfo = {
                    sameTarget: sameTarget,
                    descriptor: stub.linkDescriptor,
                    value: this.serializeValue(stub.binding.getValue())
                };
                isLinkChild = true;
            }
        } else {
            o.name = '';
            o.isLoading = false;
            o.bindCount = o.cumulativeBindCount = 0;
        }
        
        if (children) {
            for (key in children) {
                hasAny = true;
                child = this.buildStub(children[key], isLinkChild);
                outChildren[key] = child;
                o.cumulativeBindCount += child.cumulativeBindCount;
            }
        }
        
        if (hasAny) {
            o.children = outChildren;
        }     
        return o;
    },
    
    createModel: function(entityName, data) {
        var Model = Ext.app.bindinspector.noconflict[entityName];
        return new Model(data);
    },
    
    unpackSnapshot: function(data) {
        this.components = new Ext.util.Collection();
        this.viewModels = new Ext.util.Collection();
        
        Ext.Object.each(data.models, function(key, fields) {
            Ext.define('Ext.app.bindinspector.noconflict.' + key, {
                extend: 'Ext.app.bindinspector.noconflict.BaseModel',
                fields: fields
            });
        });
        
        Ext.Array.forEach(data.components, function(comp) {
            this.unpackComponent(comp, this.components, this.viewModels);
        }, this);
        this.rootComponents = data.components;
    },
    
    unpackComponent: function(comp, allComponents, allViewModels) {
        var vm = comp.viewModel,
            items = comp.items,
            bindings = comp.bindings,
            len, i,
            parentVM,
            parentData, data, key, binding;
        
        allComponents.add(comp);
        
        if (bindings) {
            for (key in bindings) {
                binding = bindings[key];
                binding.value = this.deserializeValue(binding.value);
            }
        }
        
        if (vm) {
            allViewModels.add(vm);
            parentVM = this.getVM(vm.parent);
            if (parentVM) {
                parentData = Ext.Object.chain(parentVM.data);
            }
            data = this.deserializeValue(vm.data);
            if (parentData) {
                data = Ext.apply(parentData, data);
            }
            vm.data = data;
            this.deserializeStub(vm.rootStub);
        }
        
        if (items) {
            for (i = 0, len = items.length; i < len; ++i) {
                this.unpackComponent(items[i], allComponents, allViewModels);
            }
        }
    },
    
    serializeValue: function(value, checkHasOwn) {
        var info = {},
            type, key, item, childInfo, model;
        
        if (value && value.constructor === Object) {
            type = 'object';
            info.value = {};
            for (key in value) {
                if (!(checkHasOwn && !value.hasOwnProperty(key))) {
                    childInfo = this.serializeValue(value[key], checkHasOwn);
                    item = {
                        type: childInfo.type,
                        value: childInfo.value
                    };
                    if (childInfo.entityName) {
                        item.entityName = childInfo.entityName;
                    }
                    info.value[key] = item;
                }
            }
        } else if (value && value.isModel) {
            type = 'model';
            info.entityName = value.entityName;
            this.serializeModel(value.self);
            info.value = this.serializeValue(value.data);
        } else if (value && value.isStore) {
            type = 'store';
            model = value.getModel();
            info.entityName = model.entityName;
            if (model.entityName) {
                this.serializeModel(model);
            }
        } else if (Ext.isDate(value)) {
            type = 'date';
            info.value = Ext.Date.format(value, 'c');
        } else if (Ext.isArray(value)) {
            type = 'array';
            info.value = [];
            Ext.Array.forEach(value, function(item) {
                info.value.push(this.serializeValue(item));
            }, this);
        } else {
            type = Ext.typeOf(value);
            info.value = value;
        }
        info.type = type;
        return info;
    },
    
    deserializeValue: function(info) {
        var type = info.type,
            raw = info.value,
            out, key;
        
        if (type === 'null') {
            out = null;
        } else if (type === 'undefined') {
            out = undefined;
        } else if (type === 'string' || type === 'boolean' || type === 'number') {
            out = raw;
        } else if (type === 'date') {
            out = Ext.Date.parse(raw, 'c');
        } else if (type === 'object') {
            out = {};
            for (key in raw) {
                out[key] = this.deserializeValue(raw[key]);
            }
        } else if (type === 'model') {
            out = this.createModel(info.entityName, this.deserializeValue(raw));
        } else if (type === 'store') {
            out = {
                isStore: true,
                entityName: info.entityName
            };
        } else if (type === 'array') {
            out = [];
            Ext.Array.forEach(raw, function(item) {
                out.push(this.deserializeValue(item));
            }, this);
        }
        return out;
    },
    
    deserializeStub: function(stub) {
        var children = stub.children,
            linkInfo = stub.linkInfo,
            key;
        
        if (stub.value) {
            stub.value = this.deserializeValue(stub.value);
        }
        
        if (linkInfo) {
            linkInfo.value = this.deserializeValue(linkInfo.value);
        }
        
        if (children) {
            for (key in children) {
                this.deserializeStub(children[key]);
            }
        }
    }
});