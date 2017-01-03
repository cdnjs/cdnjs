Ext.define('Ext.app.bindinspector.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.bindinspector-container',
    requires: [
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Ext.app.bindinspector.ComponentDetail',
        'Ext.app.bindinspector.ComponentList',
        'Ext.app.bindinspector.Environment',
        'Ext.app.bindinspector.Util',
        'Ext.app.bindinspector.ViewModelDetail',
        'Ext.app.bindinspector.noconflict.BaseModel'
    ],

    isBindInspector: true,
    referenceHolder: true,
    
    layout: 'border',
    
    cls: Ext.baseCSSPrefix + 'bindinspector-container',
    //pickerCls: Ext.baseCSSPrefix + 'bindinspector-target-menu',
    //pickerPreviewBindingsCls: Ext.baseCSSPrefix + 'bindinspector-preview-bind',
    //pickerOpenBindingsCls: Ext.baseCSSPrefix + 'bindinspector-open-bind',
    //pickerPreviewVMCls: Ext.baseCSSPrefix + 'bindinspector-preview-vm',
    //pickerOpenVMCls: Ext.baseCSSPrefix + 'bindinspector-open-vm',

    // the default view for the bindings preview tab for:
    // 1)  when a component hasn't been selected
    // 2)  when a component is clicked, but has no bindings
    componentPreviewDefault: {
        xtype: 'container',
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
            html: 'Select a component with bindings from the ComponentList to view the bindings details along with the component\'s inherited ViewModel'
        }]
    },

    initComponent: function() {
        var me = this;

        Ext.data.schema.Schema.get('Ext_app_bindinspector').clear();
        me.items = [{
            xtype: 'bindinspector-componentlist',
            reference: 'componentList',
            region: 'west',
            width: 400,
            split: true,
            collapsible: true,
            components: me.env.rootComponents,
            listeners: {
                scope: me,
                componentdblclick: me.onComponentDblclick,
                componentselect: me.onComponentSelect
            }
        }, {
            xtype: 'tabpanel',
            region: 'center',
            reference: 'tabs',
            items: [{
                title: 'Preview',
                reference: 'preview',
                layout: 'fit',
                items: [me.componentPreviewDefault]
            }],
            listeners: {
                add: function () {
                    this.getTabBar().setVisible(this.items.getCount() > 1);
                },
                remove: function () {
                    this.getTabBar().setVisible(this.items.getCount() > 1);
                }
            }
        }];
        me.callParent();

        me.on('vmSearchClick', me.onVMSearchClick, me);
    },

    // When the search icon in the ViewModelDetail is clicked sort the items in the ComponentList panel to show
    // 1)  The viewmodels that have the root data node for the row clicked
    // 2)  All components with bindings that will consume the selected data point
    onVMSearchClick: function (rec) {
        var componentList = this.lookupReference('componentList'),
            store = componentList.getStore(),
            ownerVMs = rec.get('ownerVMs'),
            sourceVMs = [],
            bindCount = rec.get('bindCount'),
            names = [],
            consumerNodes = [],
            query = [],
            source, descriptor;

        // THE INDICATING OF THE SOURCE VMS
        store.suspendEvents();
        componentList.clearVMSearchIndicators();
        Ext.Array.forEach(ownerVMs, function (vm) {
            source = store.getById(vm.view);
            source.set('isSrcVM', rec);
            sourceVMs.push(source);
        });
        store.resumeEvents();
        componentList.getView().refresh();

        // cache the list of source VMs for the given root data point
        // used by ComponentList.clearVMSearchIndicators() to clear the selected indicators when clearing search results
        componentList.indicatedVM = sourceVMs;

        // THE INDICATING OF THE CONSUMER COMPONENTS
        if (bindCount > 0) {
            // find the descriptor path for the selected row
            rec.bubble(function (node) {
                var nodeName = node.get('name');
                if (nodeName) {
                    names.push(nodeName);
                }
            });
            // and save as a '.' separated string of node values
            descriptor = names.reverse().join('.');

            // iterate over the component tree and find components whose bindings match the descriptor for the selected row
            componentList.getStore().getRootNode().cascadeBy(function (node) {
                if (node.get('hasBindings')) {
                    Ext.Array.forEach(node.get('bindData'), function (binding) {
                        var tokenStr = [];
                        if (binding.tokens) {
                            Ext.Array.forEach(binding.tokens, function (token) {
                                if (Ext.isArray(token)) {
                                    Ext.Array.forEach(token, function (t) {
                                        tokenStr.push(t);
                                    })
                                } else {
                                    tokenStr.push(token);
                                }
                            });
                        }
                        if (tokenStr.join('.') === descriptor) {
                            consumerNodes.push(node);
                        }
                    });
                }
            });
        }

        // collect into an array all consuming components and source VMs for use in the componentlist filter in the next step
        Ext.Array.forEach(consumerNodes.concat(sourceVMs), function (node) {
            query.push(node.getId());
        });
        
        // filter to find the matching binding consumer components and source VMs
        componentList.expand();
        componentList.filterComponentTree(null, query);

        // pull the filter styling off of any nodes that are VM sources, but not a binding match
        Ext.Array.forEach(sourceVMs, function (src) {
            if (!Ext.Array.contains(consumerNodes)) {
                src.set('filtervisible', false);
            }
        });
        componentList.down('#srcVMIndicator').show();   // show the indicator column used to show which VMs are source VMs
        componentList.down('#queryFieldTb').hide();     // hide the normal filter toolbar
        componentList.down('#vmQueryResultsTb').show(); // and show the one that indicates that it's filtered by VM search
    },

    // on component select review the component in the dedicated preview tab
    onComponentSelect: function (tree, rec, node) {
        var me = this,
            id = rec.getId(),
            preview = me.lookupReference('preview');

        if (preview.referringID !== id) {
            Ext.suspendLayouts();
            preview.removeAll();
            preview.add({
                xtype: 'bindinspector-componentdetail',
                env: me.env,
                component: me.env.getCmp(id)
            });
            Ext.resumeLayouts(true);
            preview.referringID = id;
        }

        preview.show();
    },

    // on component dblclick (or clicking the 'open in own tab button') open the component's bindings view in its own tab
    onComponentDblclick: function(tree, rec, node)  {
        var id = rec.id,
            tabId = 'bindtab-' + id,
            tabs = this.lookupReference('tabs'),
            tab = tabs.items.get(tabId),
            component, reference;
        
        if (!tab) {
            component = this.env.getCmp(id);
            reference = component.reference;
            tab = tabs.add({
                xtype: 'bindinspector-componentdetail',
                env: this.env,
                itemId: tabId,
                title: reference ? '[' + reference + '] ' + id : id,
                closable: true,
                component: component
            });
        }
        
        tabs.setActiveTab(tab);
    },

    // loop over the view models and build a reference that shows where each
    // data point originates
    buildVMDataMap: function (vm) {
        var env = this.env,
            currVM = vm,
            dataMap = vm.dataMap,
            viewModels = [],
            data, isDirect;

        // if the datamap has not yet been created for this view model build it
        if (!dataMap) {
            dataMap = vm.dataMap = {};

            // collect up all ancestor view models which this view model will inherit from
            while (currVM) {
                viewModels.push(currVM);
                currVM = env.getVM(currVM.parent);
            }

            // loop through and see if each data point is found on this view model or an ancestor
            // and catalog all viewmodels where this data point is found (to how overlapping keys)
            Ext.Array.forEach(viewModels, function (item) {
                var key;
                data = item.data;
                if (data && Ext.isObject(data)) {
                    for (key in data) {
                        isDirect = data.hasOwnProperty(key);
                        if (!dataMap[key]) {
                            dataMap[key] = {
                                isDirect: isDirect
                            };
                        }
                        dataMap[key].ownerVMs = dataMap[key].ownerVMs || [];
                        if (isDirect) {
                            dataMap[key].ownerVMs.push(item);
                        }
                    }
                }
            });
        }

        return vm;
    }
});
