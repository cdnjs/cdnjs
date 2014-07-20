/**
 * A widget column is configured with a {@link #widget} config object which specifies an
 * {@link Ext.Component#cfg-xtype xtype} to indicate which type of Widget or Component belongs
 * in the cells of this column.
 *
 * When a widget cell is rendered, a {@link Ext.Widget Widget} or {@link Ext.Component Component} of the specified type
 * is rendered into that cell. Its {@link Ext.Component#defaultBindProperty defaultBindProperty} is set using this
 * column's {@link #dataIndex} field from the associated record.
 *
 * In the example below we are monitoring the throughput of electricity substations. The capacity being
 * used as a proportion of the maximum rated capacity is displayed as a progress bar. As new data arrives and the
 * instananeous usage value is updated, the `capacityUsed` field updates itself, and that is used as the {@link #dataIndex}
 * for the `WidgetColumn` which contains the progress bar. The progess Bar's
 * {@link Ext.ProgressBarWidget#defaultBindProperty defaultBindProperty} (which is "value") is set to the calculated `capacityUsed`.
 *
 *     @example
 *     var grid = new Ext.grid.Panel({
 *         title: 'Substation power monitor',
 *         width: 600,
 *         columns: [{
 *             text: 'Id',
 *             dataIndex: 'id',
 *             width: 120
 *         }, {
 *             text: 'Rating',
 *             dataIndex: 'maxCapacity',
 *             width: 80
 *         }, {
 *             text: 'Avg.',
 *             dataIndex: 'avg',
 *             width: 85,
 *             formatter: 'number("0.00")'
 *         }, {
 *             text: 'Max',
 *             dataIndex: 'max',
 *             width: 80
 *         }, {
 *             text: 'Instant',
 *             dataIndex: 'instant',
 *             width: 80
 *         }, {
 *             text: '%Capacity',
 *             width: 150,
 *
 *             // This is our Widget column
 *             xtype: 'widgetcolumn',
 *             dataIndex: 'capacityUsed',
 *
 *             // This is the widget definition for each cell.
 *             // Its "value" setting is taken from the column's dataIndex
 *             widget: {
 *             xtype: 'progressbarwidget',
 *                 textTpl: [
 *                     '{percent:number("0")}% capacity'
 *                 ]
 *             }
 *         }],
 *         renderTo: document.body,
 *         disableSelection: true,
 *         store: {
 *            fields: [{
 *                name: 'id',
 *                type: 'string'
 *            }, {
 *                name: 'maxCapacity',
 *                type: 'int'
 *            }, {
 *                name: 'avg',
 *                type: 'int',
 *                calculate: function(data) {
 *                    // Make this depend upon the instant field being set which sets the sampleCount and total.
 *                    // Use subscript format to access the other psuedo fields which are set by the instant field's converter
 *                    return data.instant && data['total'] / data['sampleCount'];
 *                }
 *            }, {
 *                name: 'max',
 *                type: 'int',
 *                calculate: function(data) {
 *                    // This will be seen to depend on the "instant" field.
 *                    // Use subscript format to access this field's current value to avoid circular dependency error.
 *                    return (data['max'] || 0) < data.instant ? data.instant : data['max'];
 *                }
 *            }, {
 *                name: 'instant',
 *                type: 'int',
 *
 *                // Upon every update of instananeous power throughput,
 *                // update the sample count and total so that the max field can calculate itself
 *                convert: function(value, rec) {
 *                    rec.data.sampleCount = (rec.data.sampleCount || 0) + 1;
 *                    rec.data.total = (rec.data.total || 0) + value;
 *                    return value;
 *                },
 *               depends: []
 *            }, {
 *                name: 'capacityUsed',
 *                calculate: function(data) {
 *                    return data.instant / data.maxCapacity;
 *                }
 *            }],
 *            data: [{
 *                id: 'Substation A',
 *                maxCapacity: 1000,
 *                avg: 770,
 *                max: 950,
 *                instant: 685
 *            }, {
 *                id: 'Substation B',
 *                maxCapacity: 1000,
 *                avg: 819,
 *                max: 992,
 *                instant: 749
 *            }, {
 *                id: 'Substation C',
 *                maxCapacity: 1000,
 *                avg: 588,
 *                  max: 936,
 *                instant: 833
 *            }, {
 *                id: 'Substation D',
 *                maxCapacity: 1000,
 *                avg: 639,
 *                max: 917,
 *                instant: 825
 *            }]
 *        }
 *     });
 *
 *     // Fake data updating...
 *     // Change one record per second to a random power value
 *     setInterval(function() {
 *         var recIdx = Ext.Number.randomInt(0, 3),
 *             newPowerReading = Ext.Number.randomInt(500, 1000);
 
 *         grid.store.getAt(recIdx).set('instant', newPowerReading);
 *     }, 1000);  
 *  
 * @since 5.0.0
 */
Ext.define('Ext.grid.column.Widget', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.widgetcolumn',

    config: {
        /**
         * @cfg defaultCellUI {Object}
         * A map of xtype to {@link Ext.Component#ui} names to use when using Components in this column.
         *
         * Currently {@link Ext.Button Button} and all subclasses of {@link Ext.form.field.Text TextField} default
         * to using `ui: "default"` when in a WidgetColumn except for in the "classic" theme, when they use ui "grid-cell".
         */
        defaultWidgetUI: {
        }
    },

    /**
     * @inheritdoc
     */
    sortable: false,

    /**
     * @cfg {Object} renderer
     * @hide
     */

    /**
     * @cfg {Object} scope
     * @hide
     */

    /**
     * @cfg {Object} widget
     * A config object containing an {@link Ext.Component#cfg-xtype xtype}.
     *
     * This is used to create the widgets or components which are rendered into the cells of this column.
     *
     * This column's {@link #dataIndex} is used to update the widget/component's {@link Ext.Component#defaultBindProperty defaultBindProperty}.
     */
    
    /**
     * @cfg {Boolean} [stopSelection=true]
     * Prevent grid selection upon click on the widget.
     */
    stopSelection: true,
     
    preventUpdate: true,

    initComponent: function() {
        var me = this,
            widget;

        me.callParent(arguments);

        widget = me.widget;
        //<debug>
        if (!widget || widget.isComponent) {
            Ext.Error.raise('column.Widget requires a widget configuration.');
        }
        //</debug>

        // Apply the default UI for the xtype which is going to feature in this column.
        if (!widget.ui) {
            widget.ui = me.getDefaultWidgetUI()[widget.xtype] || 'default';
        }
        me.isFixedSize = Ext.isNumber(widget.width);
    },

    processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row) {
        var selector = view.innerSelector,
            target;
         
        if (this.stopSelection && type === 'click') {
            // Grab the target that matches the cell inner selector. If we have a target, then,
            // that means we either clicked on the inner part or the widget inside us. If 
            // target === e.target, then it was on the cell, so it's ok. Otherwise, inside so
            // prevent the selection from happening
            target = e.getTarget(selector);
            if (target && target !== e.target) {
                return false;
            }
        }
    },

    beforeRender: function() {
        var me = this,
            widget;

        me.liveWidgets = {};
        me.cachedStyles = {};
        me.freeWidgetStack = [];
        
        me.listenerScopeFn = function (defaultScope) {
            if (defaultScope === 'this') {
                return this;
            }
            return me.resolveListenerScope(defaultScope);
        };
        
        widget = me.getFreeWidget();
        me.tdCls = widget.getTdCls();
        me.setupViewListeners(me.getView());
        me.callParent(arguments);
    },

    afterRender: function() {
        var view = this.getView();

        this.callParent(arguments);
        // View already ready, means we were added later so go and set up our widgets
        if (view && view.viewReady) {
            this.onViewRefresh(view, view.getViewRange());
        }
    },

    // Cell must be left blank
    defaultRenderer: Ext.emptyFn, 

    updater: function(cell, value, record) {
        this.updateWidget(record);
    },

    onResize: function(newWidth) {
        var me = this,
            liveWidgets = me.liveWidgets,
            view = me.getView(),
            id, cell;

        if (!me.isFixedSize && me.rendered && view && view.viewReady) {
            cell = view.getEl().down(me.getCellInnerSelector());
            if (cell) {
                // Subtract innerCell padding width
                newWidth -= parseInt(me.getCachedStyle(cell, 'padding-left'), 10) + parseInt(me.getCachedStyle(cell, 'padding-right'), 10);

                for (id in liveWidgets) {
                    liveWidgets[id].setWidth(newWidth);
                }
            }
        }
    },

    onAdded: function() {
        var view;
        
        this.callParent(arguments);

        view = this.getView();

        // If we are being added to a rendered HeaderContainer
        if (view) {
            this.setupViewListeners(view);
        }
    },

    onRemoved: function(isDestroying) {
        var me = this,
            liveWidgets = me.liveWidgets,
            viewListeners = me.viewListeners,
            id, widget;

        if (me.rendered) {
            if (viewListeners) {
                viewListeners.destroy();
                this.viewListeners = null;
            }

            // If we are being removed, we have to move all widget elements into the detached body
            if (!isDestroying) {
                for (id in liveWidgets) {
                    widget = liveWidgets[id];
                    Ext.detachedBodyEl.dom.appendChild((widget.el || widget.element).dom);
                }
            }
        }
        me.callParent(arguments);
    },

    onDestroy: function() {
        var me = this,
            oldWidgetMap = me.liveWidgets,
            freeWidgetStack = me.freeWidgetStack,
            id, widget, i, len;

        if (me.rendered) {
            for (id in oldWidgetMap) {
                widget = oldWidgetMap[id];
                widget.$widgetRecord = widget.$widgetColumn = null;
                delete widget.getWidgetRecord;
                delete widget.getWidgetColumn;
                widget.destroy();
            }
        
            for (i = 0, len = freeWidgetStack.length; i < len; ++i) {
                freeWidgetStack[i].destroy();
            }
        }
        
        me.freeWidgetStack = me.liveWidgets = null;
        
        me.callParent();
    },

    getWidget: function(record) {
        var liveWidgets = this.liveWidgets,
            widget;

        if (record && liveWidgets) {
            widget = liveWidgets[record.internalId];
        }
        return widget || null;
    },

    privates: {
        getCachedStyle: function(el, style) {
            var cachedStyles = this.cachedStyles;
          return cachedStyles[style] || (cachedStyles[style] = Ext.fly(el).getStyle(style));
        },

        getFreeWidget: function() {
            var me = this,
                result = me.freeWidgetStack.pop();

            if (!result) {
                result = Ext.widget(me.widget);

                result.resolveListenerScope = me.listenerScopeFn;
                result.getWidgetRecord = me.widgetRecordDecorator;
                result.getWidgetColumn = me.widgetColumnDecorator;
                result.dataIndex = me.dataIndex;
                result.measurer = me;
            }
            return result;
        },

        onViewRefresh: function(view, records) {
            var me = this,
                rows = view.all,
                hasAttach = !!me.onWidgetAttach,
                oldWidgetMap = me.liveWidgets,
                dataIndex = me.dataIndex,
                isFixedSize = me.isFixedSize,
                cell, widget, el, width, recordId, 
                itemIndex, recordIndex, record, id;

            if (me.rendered && !me.hidden) {
                me.liveWidgets = {};
                Ext.suspendLayouts();
                for (itemIndex = rows.startIndex, recordIndex = 0; itemIndex <= rows.endIndex; itemIndex++, recordIndex++) {
                    record = records[recordIndex];
                    if (record.isNonData) {
                        continue;
                    }

                    recordId = record.internalId;
                    cell = view.getRow(rows.item(itemIndex)).cells[me.getVisibleIndex()].firstChild;

                    // Attempt to reuse the existing widget for this record.
                    widget = me.liveWidgets[recordId] = oldWidgetMap[recordId] || me.getFreeWidget();
                    delete oldWidgetMap[recordId];

                    if (!isFixedSize && width === undefined) {
                        width = me.lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
                    }

                    Ext.fly(cell).empty();
                    if (el = (widget.el || widget.element)) {
                        cell.appendChild(el.dom);
                        if (!isFixedSize) {
                            widget.setWidth(width);
                        }
                    } else {
                        if (!isFixedSize) {
                            widget.width = width;
                        }
                        widget.render(cell);
                    }
                    // Call the appropriate setter with this column's data field
                    if (widget.defaultBindProperty && dataIndex) {
                        widget.setConfig(widget.defaultBindProperty, records[recordIndex].get(dataIndex));
                    }
                    widget.$widgetRecord = record;
                    widget.$widgetColumn = me;
                    if (hasAttach) {
                        me.onWidgetAttach(widget, record);
                    }
                }

                Ext.resumeLayouts(true);

                // Free any unused widgets from the old live map.
                // Move them into detachedBody.
                for (id in oldWidgetMap) {
                    widget = oldWidgetMap[id];
                    widget.$widgetRecord = widget.$widgetColumn = null;
                    me.freeWidgetStack.unshift(widget);
                    Ext.detachedBodyEl.dom.appendChild((widget.el || widget.element).dom);
                }
            }
        },

        onItemUpdate: function(record, recordIndex, oldItemDom) {
            this.updateWidget(record);
        },

        onItemAdd: function(records, index, items) {
            var me = this,
                view = me.getView(),
                hasAttach = !!me.onWidgetAttach,
                dataIndex = me.dataIndex,
                isFixedSize = me.isFixedSize,
                len = records.length, i,
                record,
                row,
                cell,
                widget,
                el,
                width;

            // Loop through all records added, ensuring that our corresponding cell in each item
            // has a Widget of the correct type in it, and is updated with the correct value from the record.
            if (me.rendered && !me.hidden) {
                for (i = 0; i < len; i++) {
                    record = records[i];
                    if (record.isNonData) {
                        continue;
                    }

                    row = view.getRowFromItem(items[i]);

                    // May be a placeholder with no data row
                    if (row) {
                        cell = row.cells[me.getVisibleIndex()].firstChild;
                        if (!isFixedSize && !width) {
                            width = me.lastBox.width - parseInt(me.getCachedStyle(cell, 'padding-left'), 10) - parseInt(me.getCachedStyle(cell, 'padding-right'), 10);
                        }
                        widget = me.liveWidgets[record.internalId] = me.getFreeWidget();

                        // Render/move a widget into the new row
                        Ext.fly(cell).empty();
                        if (el = (widget.el || widget.element)) {
                            cell.appendChild(el.dom);
                            if (!isFixedSize) {
                                widget.setWidth(width);
                            }
                        } else {
                            if (!isFixedSize) {
                                widget.width = width;
                            }
                            widget.render(cell);
                        }
                        // Call the appropriate setter with this column's data field
                        if (widget.defaultBindProperty && me.dataIndex) {
                            widget.setConfig(widget.defaultBindProperty, record.get(me.dataIndex));
                        }
                        widget.$widgetColumn = me;
                        if (hasAttach) {
                            me.onWidgetAttach(widget, record);
                        }
                    }
                }
            }
        },

        onItemRemove: function(record, index, item) {
            var me = this,
                liveWidgets = me.liveWidgets,
                widget;

            // If there was a real record (collapsed placeholder will no longer be acessible)...
            // return ousted widget to free stack, and move its element to the detached body
            if (me.rendered && record && (widget = liveWidgets[record.internalId])) {
                delete liveWidgets[record.internalId];
                me.freeWidgetStack.unshift(widget);
                widget.$widgetRecord = widget.$widgetColumn = null;
                Ext.detachedBodyEl.dom.appendChild((widget.el || widget.element).dom);
            }
        },

        setupViewListeners: function(view) {
            var me = this;
            
            me.viewListeners = view.on({
                refresh: me.onViewRefresh,
                itemupdate: me.onItemUpdate,
                itemadd: me.onItemAdd,
                itemremove: me.onItemRemove,
                scope: me,
                destroyable: true
            });
        },

        updateWidget: function(record) {
            var dataIndex = this.dataIndex,
                widget;

            if (this.rendered) {
                widget = this.liveWidgets[record.internalId];
                // Call the appropriate setter with this column's data field
                if (widget && widget.defaultBindProperty && dataIndex) {
                    widget.setConfig(widget.defaultBindProperty, record.get(dataIndex));
                }
            }
        }, 
        
        widgetRecordDecorator: function() {
            return this.$widgetRecord;
        },
        
        widgetColumnDecorator: function() {
            return this.$widgetColumn;
        }
    }
});
