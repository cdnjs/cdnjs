Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
    '*',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

Ext.define('BigDataSimlet', {
    extend: 'Ext.ux.ajax.JsonSimlet',

    data: [],
    numFields: 10,
    numRecords: 50*1000,
    groupSize: 1,

    getData: function (ctx) {
        var me = this,
            data = me.data,
            groupSize = ctx.params.groupSize || 1,
            group;

        if (data.length != me.numRecords || me.lastNumColumns != me.numFields || groupSize !== me.groupSize) {
            me.currentOrder = null;
            me.lastNumColumns = me.numFields;
            me.groupSize = groupSize;

            data.length = 0;
            for (var r = 0, k = me.numRecords; r < k; r++) {
                group = Math.floor((r + groupSize) / groupSize);
                var rec = {
                    id: 'rec-' + r
                };
                for (var i = 0; i < me.numFields; i++) {
                    if (groupSize > 1 && i === 0) {
                        rec['field' + i] = group;
                    } else {
                        rec['field' + i] = r;
                    }
                }
                data.push(rec);
            }
        }

        return this.callParent(arguments);
    }
});

Ext.onReady(function() {
    
    Ext.define('StoreInfo', {
        override: 'Ext.data.BufferedStore',
        prefetch: function(options){
            var page = options.page;
        
            if (!this.pageCached(page) && !this.pagePending(page)) {
                logPanel.log('Prefetch rows ' + options.start + '-' + (options.start + options.limit));
            }
            this.callParent(arguments);
        },
    
        onProxyPrefetch: function(operation) {
            this.callParent(arguments);
            logPanel.log('Prefetch returned ' + operation.start + '-' + (operation.start + operation.limit));
        }
    });

    Ext.define('CacheInfo', {
        override: 'Ext.util.LruCache',
    
        prune: function(){
            this.callParent(arguments);
            logPanel.log('Page cache contains pages ' + this.getKeys().join(',') + '<br>&#160;&#160;&#160;&#160;' + this.getCount() + ' records in cache');
        }
    });

    Ext.define('BufferInfo', {
        override: 'Ext.grid.plugin.BufferedRenderer',
    
        setBodyTop: function(bodyTop) {
            this.callParent(arguments);
            logPanel.log('Table moved to top: ' + bodyTop);
        }
    });

    var simlet = new BigDataSimlet(),
        center,
        storeCount = 0,
        summaryTypes = ['count', 'min', 'max', 'sum', 'average'],
        summaryTypeNames = ['count', 'min', 'max', 'sum', 'avg'];

    Ext.ux.ajax.SimManager.init({
        delay: 300
    }).register({
        localAjaxSimulator: simlet
    });

    function createStore (numFields, buffered, groupSize) {
        var fields = [],
            i, storeConfig;

        for (i = 0; i < numFields; ++i) {
            fields.push('field' + i);
        }

        simlet.numFields = numFields;
        storeConfig = {
            storeId: 'infinite-scroll-store-' + (storeCount++),
            remoteSort: buffered,
            
            fields: fields,
            proxy: {
                // Simulating Ajax.
                type: 'ajax',
                url: 'localAjaxSimulator?groupSize=' + groupSize,
                reader: {
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                }
            }
        };
        if (groupSize) {
            storeConfig.remoteGroup = buffered;
            storeConfig.groupField = 'field0';
        }
        return Ext.create(buffered ? 'Ext.data.BufferedStore' : 'Ext.data.Store', storeConfig);
    }

    function createGrid(extraCfg) {
        var gridConfig = Ext.apply({
            title: 'Random data (' + simlet.numRecords + ' records)',
            border: false,
            loadMask: true,
            selModel: {
                pruneRemoved: false
            },
            columnLines: true,
            multiSelect: true,
            columns: [{
                xtype: 'rownumberer',
                width: 50,
                sortable: false
            }]
        }, extraCfg);

        if (store.groupField) {
            gridConfig.features = [
                Ext.create('Ext.grid.feature.Grouping', {
                    showSummaryRow: true,
                    groupHeaderTpl: [
                        '{columnName}: {name:this.groupName}',
                        '<tpl if="rows.length">',
                            ' ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                        '</tpl>',
                        {
                            groupName: function(group) {
                                var rowIdx = (group - 1) * simlet.groupSize;
                                return groupColumnRenderer(rowIdx, null, null, rowIdx, 1);
                        }
                    }],
                    id: 'field0Grouping'
                })
            ];
        }

        return Ext.create('Ext.grid.Panel', gridConfig);
    }

    var store = createStore(10),
        grid = createGrid({
            store: store
        });

    function makeLabel (ns, cls, name) {
        var docs = '../..';
        //docs = '../../../.build/sdk'; // for development/testing
        return '<a href="'+docs+'/docs/#!/api/'+ns+'.'+cls+'-cfg-'+name+'" target="docs" tabIndex="-1">' + cls + ' ' + name + '</a>';
    }

    var logPanel = new Ext.Panel({
        title: 'Log',
        region: 'center',
        autoScroll: true,
        log: function(m) {
            if (!this.disabled) {
                logPanel.body.createChild({
                    html: m
                });
                logPanel.body.dom.scrollTop = 1000000;
            }
        },
        tbar: [{
            text: 'Logging on',
            pressed: true,
            enableToggle: true,
            toggleHandler: function(btn, pressed) {
                if (pressed) {
                    btn.setText('Logging on');
                    logPanel.disabled = false;
                } else {
                    btn.setText('Logging off');
                    logPanel.disabled = true;
                }
            }
        },
        {
            text: 'Clear',
            handler: function() {
                logPanel.body.update('');
            }
        }]
    });

    var controls = Ext.create('Ext.form.Panel', {
        region: 'north',
        split: true,
        bodyPadding: 5,
        layout: 'form',
        height: 375,
        defaults: {
            labelWidth: 205
        },
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Ajax latency (ms)',
            itemId: 'latency',
            value: 1000,
            minValue: 0,
            maxValue: 5000
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Dataset row count',
            itemId: 'rowCount',
            value: 50000,
            minValue: 200
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.grid', 'BufferedRenderer', 'trailingBufferZone'),
            itemId: 'scrollerTrailingBufferZone',
            value: Ext.grid.plugin.BufferedRenderer.prototype.trailingBufferZone,
            maxValue: 100
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.grid', 'BufferedRenderer', 'leadingBufferZone'),
            itemId: 'scrollerLeadingBufferZone',
            value: Ext.grid.plugin.BufferedRenderer.prototype.leadingBufferZone,
            maxValue: 100,
            listeners: {
                change: function(fld, newVal, oldVal) {
                    var nfeField = controls.down('#scrollerNumFromEdge');
                    nfeField.maxValue = newVal - 1;
                    if (nfeField.getValue() >= newVal) {
                        nfeField.setValue(newVal - 1);
                    }
                },
                buffer: 500
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.grid', 'BufferedRenderer', 'numFromEdge'),
            itemId: 'scrollerNumFromEdge',
            value: Ext.grid.plugin.BufferedRenderer.prototype.numFromEdge,
            maxValue: Ext.data.Store.prototype.leadingBufferZone - 1
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Num columns',
            itemId: 'numFields',
            value: 10,
            minValue: 1
        }, {
            xtype: 'checkboxfield',
            fieldLabel: makeLabel('Ext.data', 'Store', 'buffered'),
            itemId: 'buffered',
            value: 150,
            listeners: {
                change: function(cb, checked) {
                    var pageSize = controls.down('#pageSize'),
                        storeTrailingBufferZone = controls.down('#storeTrailingBufferZone'),
                        storeLeadingBufferZone = controls.down('#storeLeadingBufferZone'),
                        purgePageCount = controls.down('#purgePageCount'),
                        scrollToLoadBuffer = controls.down('#scrollToLoadBuffer');

                    if (checked) {
                        pageSize.enable();
                        storeTrailingBufferZone.enable();
                        storeLeadingBufferZone.enable();
                        purgePageCount.enable();
                        scrollToLoadBuffer.enable();
                    } else {
                        pageSize.disable();
                        storeTrailingBufferZone.disable();
                        storeLeadingBufferZone.disable();
                        purgePageCount.disable();
                        scrollToLoadBuffer.disable();
                    }
                }
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.data', 'Store', 'pageSize'),
            itemId: 'pageSize',
            value: 150,
            disabled: true
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.data', 'Store', 'trailingBufferZone'),
            itemId: 'storeTrailingBufferZone',
            value: Ext.data.Store.prototype.trailingBufferZone,
            disabled: true
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.data', 'Store', 'leadingBufferZone'),
            itemId: 'storeLeadingBufferZone',
            value: Ext.data.Store.prototype.leadingBufferZone,
            disabled: true
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.data', 'Store', 'purgePageCount'),
            itemId: 'purgePageCount',
            value: Ext.data.Store.prototype.purgePageCount,
            minValue: 0,
            disabled: true
        }, {
            xtype: 'numberfield',
            fieldLabel: makeLabel('Ext.grid', 'BufferedRenderer', 'scrollToLoadBuffer'),
            itemId: 'scrollToLoadBuffer',
            value: Ext.grid.plugin.BufferedRenderer.prototype.scrollToLoadBuffer,
            minValue: 0,
            maxValue: 1000,
            listeners: {
                change: function(f, newVal, oldVal) {
                    grid.verticalScroller.scrollToLoadBuffer = newVal;
                }
            },
            disabled: true
        }],
        tbar: [{
            text: 'Reload',
            handler: initializeGrid
        }],
        listeners: {
            boxready: function(panel, width, height) {
                panel.minHeight = height;
            }
        }
    });

    function columnRenderer(v, metadata, record, rowIdx, colIdx, store, view) {
        return 'col' + colIdx + ', row ' + v + '0.00';
    }

    function groupColumnRenderer(v, metadata, record, rowIdx, colIdx, store, view) {
        var groupSize = simlet.groupSize,
            group = Math.floor((rowIdx + groupSize) / groupSize),
            groupStart = (group - 1) * groupSize + 1,
            groupEnd = groupStart + (groupSize - 1);
            
            return 'rows ' + groupStart + ' to ' + groupEnd;
    }

    function scrollTopToBottom(b, maxScroll) {
        var view = grid.view,
            el = view.el,
            br = view.bufferedRenderer,
            oldSynchronousRender = br.oldSynchronousRender,
            scrollQuantum = 30,
            start = new Date().getTime(),
            nextScroll = function() {
                el.dom.scrollTop += scrollQuantum;
                var newPos = el.dom.scrollTop;

                // At max scroll - we're done
                if (newPos >= maxScroll) {
                    delete br.handleViewScroll;
                    logPanel.disabled = false;
                    br.synchronousRender = oldSynchronousRender;
                    logPanel.log('Scroll took ' + (new Date().getTime() - start) + ' ms');
                    b.setText(b.initialConfig.text);
                }
            };

        // Set up the onRange fetched to immediately scroll more
        logPanel.disabled = true;
        br.synchronousRender = true;
        br.handleViewScroll = Ext.Function.createSequence(br.handleViewScroll, nextScroll);
        nextScroll();
    }

    function scrollBottomToTop(b) {
        var view = grid.view,
            el = view.el,
            br = view.bufferedRenderer,
            oldSynchronousRender = br.oldSynchronousRender,
            scrollQuantum = 30,
            start = new Date().getTime(),
            nextScroll = function() {
                var newPos = el.dom.scrollTop - scrollQuantum;
                el.dom.scrollTop = newPos;

                // At min scroll - we're done
                if (newPos <= 0) {
                    delete br.handleViewScroll;
                    logPanel.disabled = false;
                    br.synchronousRender = oldSynchronousRender;
                    logPanel.log('Scroll took ' + (new Date().getTime() - start) + ' ms');
                    b.setText(b.initialConfig.text);
                }
            };

        // Set up the onRange fetched to immediately scroll more
        logPanel.disabled = true;
        br.synchronousRender = true;
        br.handleViewScroll = Ext.Function.createSequence(br.handleViewScroll, nextScroll);
        nextScroll();
    }

    function initializeGrid () {
        var numFields = controls.down('#numFields').getValue(),
            columns = [{
                xtype: 'rownumberer',
                width: 50,
                sortable: false
            }],
            i,
            rowCount = controls.down('#rowCount').getValue(),
            groupSize = grid.ownerCt.down('#groupSize').getValue()||0,
            buffered = controls.down('#buffered').getValue(),
            columnSpec;

        Ext.suspendLayouts();
        store.removeAll();
        grid.destroy();
        store.destroy();
        logPanel.body.update('');

        for (i = 0; i < numFields; ++i) {
            columnSpec = {
                text: 'Field ' + (i+1),
                dataIndex: 'field' + i,
                renderer: columnRenderer,
                summaryType: summaryTypes[i % 5],
                align: 'right',
                summaryRenderer: function(value, cellValues, record, recordIndex, colIdx, store, view) {
                    cellValues.style = 'text-align:right';
                    return summaryTypeNames[(colIdx - 1) % 5] + ': ' + Ext.util.Format.number(value, '0.00');
                }
            };
            if (i === 0 && groupSize > 1) {
                delete columnSpec.summaryType;
                delete columnSpec.summaryRenderer;
                columnSpec.width = 150;
                columnSpec.renderer = groupColumnRenderer;
            }
            columns.push(columnSpec);
        }

        simlet.numRecords = rowCount;
        store = createStore(numFields, buffered, groupSize);

        store.pageSize = controls.down('#pageSize').getValue();
        store.trailingBufferZone = controls.down('#storeTrailingBufferZone').getValue();
        store.leadingBufferZone = controls.down('#storeLeadingBufferZone').getValue();
        store.data.maxSize = store.purgePageCount = controls.down('#purgePageCount').getValue();

        grid = createGrid({
            title: 'Random data (' + simlet.numRecords + ' records)',
            store: store,
            columns: columns,
            numFromEdge: controls.down('#scrollerNumFromEdge').getValue(),
            trailingBufferZone: controls.down('#scrollerTrailingBufferZone').getValue(),
            leadingBufferZone: controls.down('#scrollerLeadingBufferZone').getValue()
        });

        Ext.ux.ajax.SimManager.delay = controls.down('#latency').getValue();

        center.add(grid);

        if (buffered) {
            // Load the first page. It will be diverted through the prefetch buffer.
            store.loadPage(1);
        } else {
            store.load({
                limit: rowCount
            });
        }
        Ext.resumeLayouts(true);
    }

    new Ext.Viewport({
        layout: {
            type: 'border',
            padding: 5
        },
        items: [{
            border: false,
            listeners: {
                render: {
                    fn: function(p) {
                        Ext.on('idle', function() {
                            p.header.removeCls('x-docked-noborder-left x-docked-noborder-right x-docked-noborder-top');
                            p.updateLayout({isRoot:true});
                        }, null, {single: true});
                    },
                    single: true
                },
                collapse: function() {
                    logPanel.wasDisabled = logPanel.disabled;
                    logPanel.disabled = true;
                },
                expand: function() {
                    logPanel.disabled = logPanel.wasDisabled;
                }
            },
            title: 'Configuration',
            collapsible: true,
            layout: 'border',
            region: 'west',
            bodyBorder: false,
            width: 290,
            split: true,
            minWidth: 290,
            items: [ controls, logPanel ]
        }, center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            items: grid,
            bbar: [{
                text: 'Scroll top to bottom',
                handler: function(scrollButton) {
                    var v = grid.view,
                        el = v.el;

                    if (v.bufferedRenderer.hasOwnProperty('handleViewScroll')) {
                        delete v.bufferedRenderer.handleViewScroll;
                        scrollButton.setText(scrollButton.initialConfig.text);
                    } else {
                        scrollButton.setText('Stop scroll');
                        v.el.dom.scrollTop = 0;
                        Ext.defer(scrollTopToBottom, controls.down('#latency').getValue() + 200, null, [scrollButton, el.dom.scrollHeight - el.dom.clientHeight]);
                    }
                },
                tooltip: 'Time a full scroll of the grid from top to bottom'
            }, {
                text: 'Scroll bottom to top',
                handler: function(scrollButton) {
                    var v = grid.view,
                        el = v.el;

                    if (v.bufferedRenderer.hasOwnProperty('handleViewScroll')) {
                        delete v.bufferedRenderer.handleViewScroll;
                        scrollButton.setText(scrollButton.initialConfig.text);
                    } else {
                        scrollButton.setText('Stop scroll');
                        v.el.dom.scrollTop = el.dom.scrollHeight;
                        Ext.defer(scrollBottomToTop, controls.down('#latency').getValue() + 200, null, [scrollButton, el.dom.scrollHeight - el.dom.clientHeight]);
                    }
                },
                tooltip: 'Time a full scroll of the grid bottom to top'
            }, {
                xtype: 'numberfield',
                itemId: 'groupSize',
                fieldLabel: 'Group size',
                minValue: 0,
                maxValue: 10000,
                width: 140,
                labelWidth: 70
            }]
        })]
    })
});
