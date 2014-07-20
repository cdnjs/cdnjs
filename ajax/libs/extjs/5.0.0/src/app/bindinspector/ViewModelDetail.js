Ext.define('Ext.app.bindinspector.ViewModelDetail', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.bindinspector-viewmodeldetail',
    
    rootVisible: false,
    cls: Ext.baseCSSPrefix + 'bindinspector-viewmodeldetail',

    inheritedCls: Ext.baseCSSPrefix + 'bindinspector-inherited',
    notInheritedCls: Ext.baseCSSPrefix + 'bindinspector-not-inherited',
    highlightedCls: Ext.baseCSSPrefix + 'bindinspector-highlighted',
    unhighlightedCls: Ext.baseCSSPrefix + 'bindinspector-unhighlighted',
    lastItemCls: Ext.baseCSSPrefix + 'bindinspector-last-item',

    initComponent: function() {
        var me = this,
            vm = me.vm,
            title = 'VM &nbsp;&nbsp;&nbsp;⇒ &nbsp;&nbsp;&nbsp;',
            env = me.up('bindinspector-container').env,
            comp = env.getCmp(vm.view);
        
        // add the component's reference to the title if it has a reference
        if (comp.reference) {
            title += '[' + comp.reference + '] &bull; ';
        }

        me.title = title += comp.id;

        me.viewConfig = {
            getRowClass: function (record, index, rowParams, store) {
                var data = record.get('hasData'),
                    stub = record.get('hasStub'),
                    cls = [],
                    highlighted = record.get('highlighted');

                // indicate whether the root data property is inherited or belongs to this VM
                if (record.get('inherited')) {
                    cls.push(me.inheritedCls);
                } else {
                    cls.push(me.notInheritedCls);
                }

                // indicate whether the the data corresponds to the selected binding from
                // ComponentDetail.onSelectionChange()
                if (highlighted === true) {
                    cls.push(me.highlightedCls);
                } else if (highlighted === -1) {
                    cls.push(me.unhighlightedCls);
                }

                // decoration for the last item in the tree (adds a shadow for modern browsers)
                if (index === store.getCount() - 1) {
                    cls.push(me.lastItemCls);
                }

                // indicate if the data point is present, but there is no component binding to it
                if (data && (!stub || record.get('cumulativeBindCount') === 0)) {
                    cls.push(me.dataOnlyCls);
                }

                return cls.join(' ');
            }
        };
        
        me.store = {
            model: me.Model,
            root: {
                text: 'Root',
                expanded: true,
                children: me.setupData(vm, vm.data, vm.rootStub)
            }
        };
        me.columns = [{
            width: 40,
            tdCls: Ext.baseCSSPrefix + 'bindinspector-indicator-col',
            align: 'center',
            scope: me,
            renderer: me.renderIndicator
        }, {
            flex: 1,
            xtype: 'treecolumn',
            dataIndex: 'name',
            text: 'Name',
            scope: me,
            renderer: me.renderName
        }, {
            flex: 1,
            dataIndex: 'value',
            text: 'Value',
            scope: me,
            renderer: Ext.app.bindinspector.Util.valueRenderer
        }, {
            text: 'Bind #',
            width: 64,
            align: 'center',
            renderer: me.renderBindCount,
            scope: me
        }, {
            width: 40,
            isSearch: true,
            renderer: me.dataSrcConsumerRenderer,
            scope: me
        }];
        me.callParent();

        me.on('cellclick', me.onSearchCellClick, me);
    },
    
    dataOnlyNode: 'This item contains data but has nothing requesting the value',
    stubOnlyNode: 'This item has the value requested but no data backing it',
    dataPointLoading: 'Data point is loading (at the time the app snapshot was captured)',

    dataPointLoadingCls: Ext.baseCSSPrefix + 'bindinspector-isloading',
    zeroBindingCls: Ext.baseCSSPrefix + 'bi-zero-bind-count',
    dataOnlyCls: Ext.baseCSSPrefix + 'bindinspector-data-only',
    stubOnlyCls: Ext.baseCSSPrefix + 'bindinspector-stub-only',

    // handler for when the icon in the search column (has config isSearch: true) is clicked // upwardly handled by Container
    onSearchCellClick: function (view, td, cellIndex, rec, tr, rowIndex, e) {
        if (view.getHeaderCt().getHeaderAtIndex(cellIndex).isSearch) {
            this.up('bindinspector-container').fireEvent('vmSearchClick', rec);
        }
    },

    // helper method to find the root data node from any passed node in the hierarchy
    getFirstTierRec: function (rec) {
        var isFirstTier = rec.parentNode.isRoot(),
            firstTier;

        if (!isFirstTier) {
            rec.bubble(function (ni) {
                if (ni.parentNode.isRoot()) {
                    firstTier = ni;
                    return false;
                }
            });
        }

        return isFirstTier ? rec : firstTier;
    },

    // renderer for the search icon column - shows a search icon and the root data node that will be searched for in all parent VMs when clicked
    dataSrcConsumerRenderer: function (v, meta, rec) {
        var firstTier = this.getFirstTierRec(rec),
            firstTierName = firstTier.get('name');

        meta.tdCls = Ext.baseCSSPrefix + 'bindinspector-data-search-cell';
        meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="Click to indicate within the Component List all ViewModels with a data property of &nbsp;<b>' + firstTierName + '</b>"';
    },

    // renderer for the indicator column - shows whether the data point originates from this VM, an ancestor VM, or in both this and some ancestor VM
    renderIndicator: function (v, meta, rec) {
        var ownerVMs = rec.get('ownerVMs'),
            len = ownerVMs.length,
            direct = false,
            inherited = false,
            val = '',
            firstTier = this.getFirstTierRec(rec),
            isFirstTier = firstTier === rec,
            firstTierName = firstTier.get('name'),
            vmPlural;

        Ext.Array.forEach(ownerVMs, function (vm) {
            if (vm.id === vm.thisVM) {
                direct = true;
            }
            if (vm.id !== vm.thisVM) {
                inherited = true;
            }
        });

        if (direct && inherited) {
            val = Ext.util.Format.format('<span style="color:#DB7851;">{0}</span>', isFirstTier ? '◓' : '-');
            vmPlural = len > 1 ? 'VMs' : 'VM';
            meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + firstTierName + '</b>&nbsp; provided by this VM and ' + (len - 1) + ' ancestor ' + vmPlural + '"';
        } else if (direct) {
            val = isFirstTier ? '●' : '';
            meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + firstTierName + '</b>&nbsp; is provided by this VM"';
        } else if (inherited) {
            val = isFirstTier ? '○' : '';
            vmPlural = len > 1 ? 'VMs' : 'VM';
            meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="<b>' + firstTierName + '</b>&nbsp; is provided by ' + len + ' ancestor ' + vmPlural + '"';
        }

        return val;
    },

    // renderer for the bind count column
    renderBindCount: function (v, meta, rec) {
        var len = rec.get('children').length,
            bindCount = rec.get('bindCount') || 0,
            total, bindingsText;

        v = bindCount;

        if (v === 0) {
            v = '<span class="' + this.zeroBindingCls + '">' + v + '</span>';
        }

        if (len) {
            total = rec.get('cumulativeBindCount') || '?';
            if (total === 0 || total === '?') {
                v += ' / <span class="' + this.zeroBindingCls + '">' + total + '</span>';
            } else {
                v += ' / ' + total;
            }
        }

        bindingsText = 'Bindings Count = <b>' + bindCount + '</b>';
        if (total && total !== 0 && total !== '?') {
            bindingsText += '<br>Cumulative Bindings Count = <b>' + total + '</b>';
        }

        meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="' + bindingsText + '"';
        return v;
    },
    
    // renderer for the main tree column
    renderName: function(v, meta, rec) {
        var me = this,
            data = rec.get('hasData'),
            stub = rec.get('hasStub'),
            tip = '';

        if (rec.get('isLoading')) {
            meta.tdCls = me.dataPointLoadingCls;
            tip += me.dataPointLoading;
        } else if (data && (!stub || rec.get('cumulativeBindCount') === 0)) {
            tip += me.dataOnlyNode;
        } else if (stub && !data) {
            meta.tdCls = me.stubOnlyCls;
            tip += me.stubOnlyNode;
        }

        if (tip !== '') {
            meta.tdAttr = 'data-qclass="' + Ext.baseCSSPrefix + 'componentlist-tip" data-qtip="' + tip + '"';
        }
        
        return v;
    },
    
    // build method to construct the nodes displayed in the ViewModelDetail tree
    setupData: function(vm, data, stub, inherited, ownerVMs) {
        var merged = {},
            out = [],
            dataMap = vm.dataMap,
            dm = [],
            item, children, stubChild, key, stopDigging, linkInfo;
        
        if (data && Ext.isObject(data)) {
            if (data.isModel) {
                data = data.data;
                // prevent looping any deeper over the model
                stopDigging = true;
            } else if (data.isStore) {
                stopDigging = true;
                data = null;
            }
            if (data) {
                for (key in data) {
                    if (!ownerVMs) {
                        dm = dataMap[key] ? dataMap[key].ownerVMs : [];
                    }
                    item = {
                        name: key,
                        value: data[key],
                        inherited: Ext.isDefined(inherited) ? inherited : !data.hasOwnProperty(key),
                        ownerVMs: Ext.isDefined(ownerVMs) ? ownerVMs : [],
                        hasData: true
                    };
                    Ext.Array.forEach(dm, function (v) {
                        item.ownerVMs.push({
                            id: v.id,
                            view: v.view,
                            thisVM: vm.id
                        });
                    });
                    stubChild = Ext.app.bindinspector.Util.getChildStub(key, stub);
                    if (stubChild) {
                        item.hasStub = true;
                        item.isLoading = stubChild.isLoading;
                        item.iconCls = stubChild.isLoading ? this.dataPointLoadingCls : '';
                        item.bindCount = stubChild.bindCount;
                        item.cumulativeBindCount = stubChild.cumulativeBindCount;
                        item.stub = stubChild;
                    }
                    merged[key] = item;
                }
            }
        }

        if (stub) {
            children = stub.children;
            for (key in children) {
                stubChild = children[key];
                item = merged[key];
                if (!item) {
                    item = {
                        name: key,
                        value: stubChild.value || undefined,
                        inherited: inherited || false,
                        ownerVMs: ownerVMs || [],
                        hasData: false,
                        hasStub: true,
                        isLoading: stubChild.isLoading,
                        iconCls: stubChild.isLoading ? this.dataPointLoadingCls : '',
                        bindCount: stubChild.bindCount,
                        cumulativeBindCount: stubChild.cumulativeBindCount,
                        stub: stubChild
                    };
                    linkInfo = stubChild.linkInfo;
                    if (linkInfo && linkInfo.sameTarget) {
                        item.value = linkInfo.value;
                        // Fudge having data, since we don't want to show an icon
                        // for all links
                        item.hasData = item.value !== undefined;
                    }
                    merged[key] = item;
                }
            }
        }

        for (key in merged) {
            item = merged[key];
            //if (!stopDigging) { // was missing nested model data with stopDigging
                item.children = this.setupData(vm, item.value, item.stub, item.inherited, item.ownerVMs);
            //}
            delete item.stub;
            if (item.children && item.children.length) {
                item.expanded = true;
                item.leaf = false;
            } else {
                item.leaf = true;
            }
            out.push(merged[key]);
        }
        
        return out;
    }
}, function() {
    this.prototype.Model = Ext.define(null, {
        extend: 'Ext.data.TreeModel',
        fields: ['name', 'value', 'inherited', 'hasData', 'hasStub', 'isLoading', 'bindCount', 'cumulativeBindCount', 'highlighted']
    });
});