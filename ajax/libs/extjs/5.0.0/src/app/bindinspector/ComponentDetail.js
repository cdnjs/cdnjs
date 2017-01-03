Ext.define('Ext.app.bindinspector.ComponentDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bindinspector-componentdetail',
    
    requires: [
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.layout.container.VBox',
        'Ext.form.field.Checkbox',
        'Ext.app.bindinspector.Util'
    ],
    
    layout: 'border',
    //borderRegionSwapMin: 1000, // see onCtResize

    activeCls: Ext.baseCSSPrefix + 'bindinspector-stub-active',
    descriptorCls: Ext.baseCSSPrefix + 'bindinspector-descriptor',
    multipleCls: Ext.baseCSSPrefix + 'bindinspector-mult-val',
    directCls: Ext.baseCSSPrefix + 'bindinspector-direct-val',
    inheritedCls: Ext.baseCSSPrefix + 'bindinspector-inherited-val',
    componentKeyCls: Ext.baseCSSPrefix + 'bindinspector-comp-key',
    componentDescCls: Ext.baseCSSPrefix + 'bindinspector-comp-desc',
    componentValCls: Ext.baseCSSPrefix + 'bindinspector-comp-val',
    lastItemCls: Ext.baseCSSPrefix + 'bindinspector-last-item',

    // the default view for the view model preview tab for when a component is clicked, but has no viewModel
    vmPreviewDefault: {
        xtype: 'container',
        region: 'east',
        split: true,
        width: '50%',
        cls: Ext.baseCSSPrefix + 'bindinspector-prev-default',
        padding: 20,
        layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'center'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'Select a component with a ViewModel (or inherited ViewModel) from the ComponentList to view the ViewModel details'
        }]
    },
    
    initComponent: function() {
        var me = this,
            parentCt = me.up('bindinspector-container'),
            comp = me.component || {},
            env = me.env,
            publishes = comp.publishes,
            bindings = comp.bindings,
            title = 'Bindings &nbsp;&nbsp;&nbsp;⇒ &nbsp;&nbsp;&nbsp;',
            vm = env.getInheritedVM(comp),
            bindData, publishesTbar;

        // the default view for the bindings preview tab for when a component is clicked, but has no bindings
        me.bindingsPreviewDefault = {
            xtype: 'panel',
            border: false,
            region: 'center',
            cls: Ext.baseCSSPrefix + 'bindinspector-prev-default',
            bodyPadding: 20,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [{
                xtype: 'component',
                flex: 1,
                html: 'Select a component with bindings from the ComponentList to view the bindings details along with the component\'s inherited ViewModel'
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                defaultButtonUI: 'default',
                items: ['->', {
                    text: 'Open in dedicated tab',
                    handler: function (btn) {
                        btn.up('bindinspector-container').onComponentDblclick(null, comp);
                    }
                }]
            }]
        };

        // add the component's reference to the title if it has a reference
        if (comp.reference) {
            title += '[' + comp.reference + '] &bull; ';
        }
        
        // build the bindings supporting data if the component has bindings and does not already have its bindData
        bindData = comp.bindData || Ext.app.bindinspector.Util.buildBindData(bindings);

        // add any publishes info the the top of the Component Detail grid
        if (publishes) {
            publishesTbar = [{
                xtype: 'component',
                html: 'Publishes: &nbsp;&nbsp;<span style="color: #5C5C5C;font-size: 14px;line-height: 14px;">' + Ext.Object.getKeys(publishes).join(' &bull; ') + '</span>'
            }];
        }

        // the config for the bindings grid itself (shown when a component with bindings is selected from the ComponentList tree)
        me.bindingsGrid = {
            xtype: 'gridpanel',
            title: title += comp.id,
            header: {
                items: [{
                    xtype: 'button',
                    text: 'Open in dedicated tab',
                    ui: 'default-toolbar',
                    handler: function (btn) {
                        btn.up('bindinspector-container').onComponentDblclick(null, comp);
                    }
                }]
            },
            region: 'center',
            cls: Ext.baseCSSPrefix + 'bindinspector-compdetail-grid',
            flex: 1,
            hideHeaders: true,
            store: {
                model: me.BindingModel,
                data: bindData
            },
            columns: [{
                flex: 1,
                scope: me,
                renderer: me.bindingRenderer
            }],
            tbar: publishesTbar,
            bbar: [{
                xtype: 'checkboxfield',
                itemId: 'highlightToggle',
                boxLabel: 'Highlight VM target nodes on binding selection',
                checked: true,
                listeners: {
                    scope: me,
                    change: me.onHighlightChange
                }
            }],
            viewConfig: {
                stripeRows: false,
                trackOver: false,
                getRowClass: function (record, index, rowParams, store) {
                    var cls = [];

                    if (index === store.getCount() - 1) {
                        cls.push(me.lastItemCls);
                    }

                    return cls.join(' ');
                }
            },
            listeners: {
                scope: me,
                cellclick: me.onCellClick,
                selectionchange: me.onSelectionChange
            }
        };

        // the ViewModelDetail tree (shown when a component with a View Model is selected from the ComponentList tree)
        me.viewModelTree = {
            xtype: 'bindinspector-viewmodeldetail',
            itemId: 'vm-' + vm.id,
            vm: vm,
            region: 'east',
            split: true,
            width: '50%',
            height: '50%'
        };

        me.items = [];
        me.items.push(bindings ? me.bindingsGrid : me.bindingsPreviewDefault);
        me.items.push(vm ? me.viewModelTree : me.vmPreviewDefault);

        me.callParent(arguments);
    },

    // renderer for the bindings colum to show the bindings key, descriptor, and value
    bindingRenderer: function (v, meta, rec) {
        var me = this,
            binding = rec.get('binding'),
            key = rec.get('key'),
            descriptor = me.descriptorRenderer(rec.get('descriptor'), meta, rec),
            value = Ext.app.bindinspector.Util.valueRenderer(rec.get('value')),
            src = '',
            bindingType = 'Direct';

        // provide a default output for empty / null bindings values
        if (Ext.isEmpty(value) || value === 'null') {
            value = '<i>No value found</i>';
        }

        key = '<span class="' + me.componentKeyCls + '">' + key + ': </span>';
        descriptor = '<span class="' + me.componentDescCls + '">' + descriptor + '</span>';
        value = '<span class="' + me.componentValCls + '">' + value + '</span>';

        if (binding.isTemplateBinding) {
            bindingType = 'Template';
        } else if (binding.isMultiBinding) {
            bindingType = 'Multi'
        }
        bindingType = Ext.util.Format.format('<div data-qtip="Binding Type" data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" class="' + Ext.baseCSSPrefix + 'bindinspector-bind-type">{0}</div>', bindingType);

        return key + descriptor + '<br>' + value + bindingType;
    },

    // handler for the highlight or don't highlight checkbox in the component detail grid
    // selecting a binding detail node will highlight the source from the view model if the
    // checkbox is checked
    onHighlightChange: function (field) {
        var vmDetail = this.down('bindinspector-viewmodeldetail'),
            compDetail = this.down('gridpanel'),
            selModel = compDetail.getSelectionModel();

        // if the checkbox is not checked then remove the highlighting from the view model detail view
        if (!field.checked) {
            this.onSelectionChange(selModel, null, true)
        } else { // else re-apply the highlighting
            this.onSelectionChange(selModel, selModel.getSelection());
        }
    },
    
    // when the component detail node is selected highlight (if allowed by the highlight checkbox)
    // the root data node from the view model detail tree
    onSelectionChange: function (selModel, selected, clear) {
        var vmDetail = this.down('bindinspector-viewmodeldetail'),
            store = vmDetail.getStore(),
            tokens, binding, highlight, store, root, targets, highlighted;

        if ((selected && selected.length === 0) || clear === true) {
            store.suspendEvents();
            vmDetail.getStore().getRootNode().cascadeBy({
                before: function (node) {
                    node.set('highlighted', false);
                }
            });
            store.resumeEvents();
            vmDetail.getView().refresh();
            return;
        }

        selected = selected[0];
        tokens = selected.get('tokens');
        binding = selected.get('binding');
        highlight = this.down('#highlightToggle').checked;
        store = vmDetail.getStore();
        root = store.getRootNode();
        targets = [];
        
        // get the node or nodes from which the bindings are bound
        if (tokens && highlight) {
            if (binding.isTemplateBinding) {
                Ext.Array.forEach(tokens, function(token) {
                    targets.push(root.findChild('name', token[0]));
                }, this);
            } else if (binding.isMultiBinding) {
                // TODO
            } else {
                targets.push(root.findChild('name', tokens[0]));
            }
        }

        store.suspendEvents();
        root.cascadeBy({
            before: function (node) {
                highlighted = targets.length === 0;
                Ext.Array.forEach(targets, function (target) {
                    if (node === target || node.isAncestor(target)) {
                        highlighted = true;
                    }
                });

                // this is set so that the view model detail panel's getRowClass
                // can apply the styling depending on whether the node is bound to this
                // particular binding (-1 highlights / fades since false means undecorated)
                node.set('highlighted', highlighted || -1);
            }
        });
        store.resumeEvents();
        vmDetail.getView().refresh();
        // select / focus the first targetable view model tree node
        vmDetail.getSelectionModel().select(targets[0]);
    },

    // if the cell click is on a descriptor token focus on its data node in the
    // view model tree
    onCellClick: function(view, cell, colIdx, record, row, rowIdx, e) {
        var target = e.getTarget('.' + this.activeCls),
            path;
        
        if (target) {
            path = target.getAttribute('data-path');
            this.showPath(path);
        }
    },
    
    showPath: function(path) {
        this.selectPath(this.down('bindinspector-viewmodeldetail'), path);
    },

    // select the view model tree's node using the passed path
    // which is furnished by the onCellClick -> showPath method
    selectPath: function(tab, path) {
        var node = tab.getRootNode(),
            parts = path.split('.'),
            len = parts.length,
            i;
        
        for (i = 0; node && i < len; ++i) {
            node = this.getChildByKey(node, parts[i]);
        }
        
        if (node) {
            tab.getSelectionModel().select(node);
        }
    },
    
    getChildByKey: function(node, key) {
        var childNodes = node.childNodes;
        if (childNodes) {
            return Ext.Array.findBy(childNodes, function(child) {
                return child.get('name') === key;
            });
        }
        return null;
    },
    
    // extracts the descriptor markup for the component detail grid
    descriptorRenderer: function(v, meta, rec) {
        var binding = rec.get('binding'),
            descriptor = rec.get('descriptor'),
            tokens = rec.get('tokens');

        v = v || '';
        
        if (binding.isTemplateBinding) {
            Ext.Array.forEach(tokens, function(token) {
                var tokenRe = new RegExp('{' + token.join('\\.') + '}', 'g');
                v = v.replace(tokenRe, this.parseTokens(token));
            }, this);
        } else if (binding.isMultiBinding) {
            // TODO
        } else {
            return v.replace(descriptor, this.parseTokens(tokens));
        }
        return Ext.String.htmlEncode(v);
    },
    
    // decorates the descriptor markup using the descriptor tokens from the binding
    parseTokens: function(tokens) {
        var me = this,
            out = [],
            vm = me.env.getInheritedVM(me.component),
            currPath = '',
            currParent = vm.rootStub,
            direct = false,
            inherited = false,
            addlCls = '',
            tip = '',
            baseToken = '',
            ownerVms, len, vmPlural;

        tokens = tokens || [];
        
        Ext.Array.forEach(tokens, function(token) {
            var stub = Ext.app.bindinspector.Util.getChildStub(token, currParent),
                cls = '',
                value;
                
            if (stub) {
                value = stub.value;
                if (value !== undefined) {
                    cls = me.activeCls;
                }
            } else {
                // TODO Never here...
            }
            out.push('<span data-path="' + currPath + token + '" class="stub ' + cls + '">' + token + '</span>');
            currPath += token + '.';
            currParent = stub;
        }, me);

        // determine whether a binding's source can be found on the nearest view model, is
        // inherited from some ancestor view model, or is on both this view model and an ancestor
        if (tokens[0]) {
            baseToken = tokens[0];
            ownerVMs = vm.dataMap[tokens[0]].ownerVMs;
            len = ownerVMs.length;
            Ext.Array.forEach(ownerVMs, function (v) {
                if (v.id === vm.id) {
                    direct = true;
                }
                if (v.id !== vm.id) {
                    inherited = true;
                }
            });
        }

        // set the class for the descriptor markup depending on whether the date source
        // is direct, inherited, or direct, but with ancestor view models also posessing the data
        if (direct && inherited) {
            addlCls += ' ' + me.multipleCls;
            vmPlural = len > 1 ? 'VMs' : 'VM';
            tip = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + baseToken + '</b>&nbsp; provided by this VM and ' + (len - 1) + ' ancestor ' + vmPlural + '"';
        } else if (direct) {
            addlCls += ' ' + me.directCls;
            tip = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + baseToken + '</b>&nbsp; is provided by this VM"';
        } else if (inherited) {
            addlCls += ' ' + me.inheritedCls;
            vmPlural = len > 1 ? 'VMs' : 'VM';
            tip = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + baseToken + '</b>&nbsp; is provided by ' + len + ' ancestor ' + vmPlural + '"';
        }

        return '<span ' + tip + 'class="' + me.descriptorCls + addlCls + '">{' + out.join('.') + '}</span>';
    }
}, function() {
    this.prototype.BindingModel = Ext.define(null, {
        extend: 'Ext.data.Model',
        
        fields: ['key', 'descriptor', 'tokens', 'value', 'binding']
    });
});