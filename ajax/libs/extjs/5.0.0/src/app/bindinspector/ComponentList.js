Ext.define('Ext.app.bindinspector.ComponentList', {
    alias: 'widget.bindinspector-componentlist',
    extend: 'Ext.tree.Panel',

    requires: [
        'Ext.form.field.Text'
    ],
    
    rootVisible: false,
    title: 'Component Tree',
    hideHeaders: true,

    bindingsIconCls: Ext.baseCSSPrefix + 'bindings-icon',
    vmIconCls: Ext.baseCSSPrefix + 'vm-icon',
    missingDataCls: Ext.baseCSSPrefix + 'bindinspector-missing-data',
    filterVisibleCls: Ext.baseCSSPrefix + 'bindinspector-filter-visible',
    lastItemCls: Ext.baseCSSPrefix + 'bindinspector-last-item',

    bindingsIcon: '☍',
    vmIcon: '☶',
    
    initComponent: function() {
        var me = this,
            nodes = [];

        me.viewConfig = {
            toggleOnDblClick: false,
            getRowClass: function (record, index, rowParams, store) {
                var cls = [];
                // decoration for items found when filtering
                if (record.get('filtervisible')) {
                    cls.push(me.filterVisibleCls);
                }
                // decoration for items with no associated data
                if (record.get('sansData')) {
                    cls.push(me.missingDataCls);
                }
                // decoration for the last item in the tree (adds a shadow for modern browsers)
                if (index === store.getCount() - 1) {
                    cls.push(me.lastItemCls);
                }
                return cls.join(' ');
            }
        };

        // build the component node hierarchy
        Ext.Array.forEach(me.components, function(comp) {
            nodes.push(me.buildNode(comp));
        }, me);

        me.store = {
            model: me.Model,
            root: {
                expanded: true,
                children: nodes
            }
        };

        me.columns = [{
            // used by the Container.onVMSearchClick() method when showing the source VMs for a given data point
            itemId: 'srcVMIndicator',
            width: 40,
            hidden: true,
            renderer: me.srcVMIndicator,
            scope: me
        }, {
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }];

        me.dockedItems = [{
            // the toolbar for searching within the component list
            xtype: 'toolbar',
            itemId: 'queryFieldTb',
            dock: 'top',
            items: [{
                xtype: 'textfield',
                reference: 'queryField',
                itemId: 'queryField',
                emptyText: 'simple search by reference / ID or use a component query...',
                flex: 1,
                triggers: {
                    clear: {
                        cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                        handler: function(field) {
                            var tree = field.up('treepanel'),
                                store = tree.store;

                            field.reset();
                            tree.clearComponentFilter();
                            field.focus();
                        }
                    }
                },
                listeners: {
                    change: {
                        fn: me.filterComponentTree,
                        buffer: 250,
                        scope: me
                    },
                    afterrender: {
                        fn: function (field) {
                            var tbEl = field.up('toolbar').getEl();

                            // set up the toolip for the component list filter field
                            field.mon(tbEl, 'mouseenter', function () {
                                var tip = me.bindingsTip,
                                    showAt, x, y;

                                tip.stopAnimation();
                                tip.update('<b>Simple Search</b><br>Enter the string matching the reference or ID of the target component<hr><b>Component Query</b><br>Enter a component query string to find any items matching the query');
                                tip.setTarget(tbEl);
                                tip.show();
                                x = tip.getX();
                                y = tip.getY();
                                showAt = tip.getAlignToXY(tbEl, 'l-r');
                                tip.animate({
                                    from: {
                                        opacity: 0,
                                        x: showAt[0] + 20,
                                        y: showAt[1]
                                    },
                                    to: {
                                        opacity: 1,
                                        x: showAt[0] + 10,
                                        y: showAt[1]
                                    }
                                });
                            });
                        },
                        scope: me
                    }
                }
            }]
        }, {
            // toolbar used by Container.onVMSearchClick()
            // is shown when the results in the Component List are filtered by the ViewModelDetail's searched data point
            xtype: 'toolbar',
            cls: Ext.baseCSSPrefix + 'vm-results-tb',
            itemId: 'vmQueryResultsTb',
            hidden: true,
            dock: 'top',
            defaultButtonUI: 'default',
            items: ['->', {
                text: 'Clear VM Filter',
                // restores the original filter toolbar
                handler: function () {
                    console.log(this.up('#vmQueryResultsTb'));
                    var tb = this.up('#vmQueryResultsTb'),
                        componentList = tb.up('bindinspector-componentlist'),
                        queryTb = componentList.down('#queryFieldTb'),
                        queryField = queryTb.down('#queryField');

                    tb.hide();
                    queryTb.show();
                    componentList.clearVMSearchIndicators();
                    queryField.setValue(queryField.lastValue);
                    componentList.filterComponentTree(null, queryField.lastValue);
                }
            }]
        }];

        me.callParent();
        me.getView().on('itemdblclick', me.onItemDblclick, me);
        me.on('select', me.onItemSelect, me);

        // a quick-view tip to show the bindings for a given component
        me.bindingsTip = Ext.create('Ext.tip.ToolTip', {
            renderTo: document.body,
            anchor: 'left',
            cls: Ext.baseCSSPrefix + 'componentlist-tip',
            bodyPadding: 12
        });

        // manually show the bindings tip on itemmouseenter
        me.getView().on('itemmouseenter', me.showBindingsTip, me);
    },

    // the source VM indicators column which is shown during the Container.onVMSearchClick() call is then hidden
    // between VM drill down searches
    clearVMSearchIndicators: function () {
        var indicatedVM = this.indicatedVM;

        Ext.suspendLayouts();
        if (indicatedVM) {
            Ext.Array.forEach(indicatedVM, function (rec) {
                rec.set('isSrcVM', false);
            });
        }
        this.down('#srcVMIndicator').hide();
        Ext.resumeLayouts(true);

        this.indicatedVM = null;
    },

    // renderer for the source VM indicator column
    srcVMIndicator: function (v, meta, rec) {
        var refVM = rec.get('isSrcVM'),
            tip = '',
            vmDetail, firstTierRec, firstTierName, targetRec;

        if (refVM) {
            vmDetail = this.up('bindinspector-container').down('bindinspector-viewmodeldetail');
            firstTierRec = vmDetail.getFirstTierRec(refVM);
            firstTierName = firstTierRec.get('name');
            if (firstTierRec !== refVM) {
                tip += 'Root data node: &nbsp;<span class=\'' + Ext.baseCSSPrefix + 'binding-tip-descriptor\'>' + firstTierName + '</span><hr>';
            }

            targetRec = firstTierRec === refVM ? firstTierRec : refVM;
            tip += targetRec.get('name') + ':';
            tip += '<br>&nbsp;&nbsp;&nbsp;&nbsp;';
            tip += '<span class=\'' + Ext.baseCSSPrefix + 'binding-tip-value\'>' + Ext.app.bindinspector.Util.valueRenderer(targetRec.get('value')) + '</span>';
            meta.tdCls = Ext.baseCSSPrefix + 'bindindicator-vm-src';
            meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="' + tip + '"';
        }
    },

    // when the ComponentList is destroyed the stand-alone QuickTip needs to also be destroyed
    onDestroy: function () {
        this.bindingsTip.destroy();
        this.callParent();
    },

    // when a nodeInterface / row is moused over show the bindings tooltip which will detail the specs > output value from the bindings on the component
    showBindingsTip: function (view, record, item, index, e) {
        var me = this,
            tip = me.bindingsTip,
            sansData = record.get('sansData'),
            bindings, bindingText;

        tip.stopAnimation();
        if (record.get('hasBindings')) {
            bindings = me.ownerCt.env.getCmp(record.get('id')).bindings;
            bindingText = [];

            // build the bindings markup for the tip
            Ext.Object.each(bindings, function (key, val, o) {
                var kv = key + ': ' + '<span class="' + Ext.baseCSSPrefix + 'binding-tip-descriptor">' + val.descriptor + '</span><br>',
                    bindValue = val.value,
                    v;

                if (Ext.isString(bindValue)) {
                    v = bindValue;
                } else if (Ext.isObject(bindValue)) {
                    if (bindValue.isStore === true) {
                        v = 'Store {' + bindValue.entityName + '}';
                    } else if (bindValue.isModel === true) {
                        v = 'Model {' + bindValue.entityName + '}';
                    }
                }
                kv += '<span class="' + Ext.baseCSSPrefix + 'binding-tip-value">' + v + '</span>';
                bindingText.push(kv);
            });

            bindingText = bindingText.join('<hr>');
            if (sansData) {
                bindingText += '<hr>';
                Ext.Array.forEach(sansData, function (missing) {
                    bindingText += '<div class="' + Ext.baseCSSPrefix + 'binding-missing-data">Missing data: ' + missing + '</div>';
                });
            }
            tip.update(bindingText);
            tip.setTarget(item);
            tip.show();
            tip.alignTo(item, 'l-r', [20, 0]);
            tip.animate({
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1,
                    x: tip.getX() - 10
                }
            });
        }
    },

    // filter for the component list (tree)
    filterComponentTree: function (field, val) {
        var tree = this,
            field = tree.down('#queryField'),
            newVal = val || field.getValue(),
            store = tree.store,
            queryRe = /[\s>\[\]=()^'"~$@*:+#,]/g,
            valIsArray = Ext.isArray(newVal),
            ids = valIsArray ? newVal : [],
            components = [],
            isQuery, len, i;

        if (Ext.isString(newVal)) {
            isQuery = queryRe.test(Ext.String.trim(newVal));
        }

        if (newVal.length > 0) {
            tree.filteredComponents = [];

            // if newVal matches the queryRe regex attempt the lookup using Ext.ComponentQuery
            if (isQuery) {
                try
                {
                    components = Ext.ComponentQuery.query(newVal);
                } catch (e) {}
                
                len = components.length;

                for (i = 0; i < len; i++) {
                    ids.push(components[i].id);
                }
            }
            
            store.suspendEvents();
            store.filter({
                filterFn: function (node) {
                    var children = node.childNodes,
                        length = children && children.length,
                        visible = false,
                        prop, j;

                    if (isQuery || valIsArray) {
                        visible = Ext.Array.contains(ids, node.get('id'));
                    } else {
                        visible = node.get('text').indexOf(newVal) > -1;
                    }
                    node.set('filtervisible', visible);

                    if (visible) {
                        tree.filteredComponents.push(node);
                    }

                    // check the child nodes to see if they are 'visible' and if so then show the parent node, too
                    for (j = 0; j < length; j++) {
                        if (children[j].get('visible')) {
                            visible = true;
                        }
                    }
                    return visible;
                },
                id: 'queryFilter'
            });
            store.resumeEvents();
            tree.getView().refresh();
        } else {
            tree.clearComponentFilter();
        }
    },

    // method to clear the filter from the component list (tree)
    clearComponentFilter: function () {
        var tree = this,
            store = tree.store,
            filtered = tree.filteredComponents || [],
            len = filtered.length,
            i = 0;

        for (; i < len; i++) {
            filtered[i].set('filtervisible', false);
        }
        store.clearFilter();
    },
    
    // constructs the tree node for the given component
    buildNode: function(comp) {
        var me = this,
            ownerCt = me.getRefOwner(),
            childItems = comp.items,
            viewModel = comp.viewModel,
            bindings = comp.bindings,
            hasBindings = !!comp.bindings,
            suffix = [],
            sansData = [],
            missing = {},
            binding, len, i, o, child, ref, key, bindData;

        if (viewModel) {
            suffix.push('<span class="' + me.vmIconCls + '">' + me.vmIcon + '</span>');
            ownerCt.buildVMDataMap(viewModel);
        }
        if (hasBindings) {
            suffix.push('<span class="' + me.bindingsIconCls + '">' + me.bindingsIcon + '</span>');

            for (key in bindings) {
                binding = bindings[key];
                if (binding.descriptor && Ext.isEmpty(binding.value)) {
                    sansData.push(missing[key] = binding.descriptor);
                }
            }

            bindData = comp.bindData = Ext.app.bindinspector.Util.buildBindData(bindings);
        }

        if (sansData.length === 0) {
            sansData = undefined;
        }
        
        ref = comp.reference ? '<b>[' + comp.reference + ']</b> &bull; ' : '';

        o = {
            id: comp.id,
            text: ref + comp.id + (suffix.length ? (' ' + suffix.join(' ')) : ''),
            hasViewModel: !!viewModel,
            hasBindings: hasBindings,
            hasDeepBindings: hasBindings,
            reference: comp.reference,
            sansData: sansData,
            bindData: bindData,
            children: []
        };
        
        if (childItems) {
            for (i = 0, len = childItems.length; i < len; ++i) {
                child = me.buildNode(childItems[i]);
                o.hasDeepBindings = o.hasDeepBindings || child.hasDeepBindings;
                if (child.hasDeepBindings) {
                    o.children.push(child);
                }
            }
        }
        
        if (o.children.length) {
            o.expanded = true;
            o.leaf = false;
        } else {
            o.leaf = true;
        }
        
        return o;
    },
    
    // on item dblclick fire the 'componentdblclick' event for the bindinspector-container to listen for
    onItemDblclick: function(view, rec) {
        this.fireEvent('componentdblclick', this, rec);
    },

    // on item select fire the 'componentselect' event for the bindinspector-container to listen for
    onItemSelect: function (selModel, rec) {
        var node = this.getView().getNode(rec);
        this.fireEvent('componentselect', this, rec, node);
    }
}, function() {
    this.prototype.Model = Ext.define(null, {
        extend: 'Ext.data.TreeModel',
        fields: ['hasViewModel', 'hasBindings', 'reference', 'hasDeepBindings', 'reference', 'sansData', 'bindData', 'isSrcVM']
    });
});