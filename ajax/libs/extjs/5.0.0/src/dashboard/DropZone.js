/**
 * Internal class that manages drag/drop for the `Dashboard`.
 * @private
 */
Ext.define('Ext.dashboard.DropZone', {
    extend: 'Ext.dd.DropTarget',

    ddScrollConfig: {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },

    // This causes overflow to go hidden during the drag so that we don't cause panels to
    // wrap by triggering overflow.
    overClass: 'x-dashboard-dd-over',

    constructor: function (dashboard, cfg) {
        this.dashboard = dashboard;
        Ext.dd.ScrollManager.register(dashboard.body);

        this.callParent([dashboard.body, cfg]);

        dashboard.body.ddScrollConfig = this.ddScrollConfig;
    },

    getOverEvent: function (dd, e, data) {
        var dashboard = this.dashboard,
            items = dashboard.items.items,
            bodyBox = dashboard.body.getBox(),
            count = items.length,
            xy = e.getXY(),
            x = xy[0] - bodyBox.x,
            y = xy[1] - bodyBox.y,
            over = {
                columnIndex: 0,
                column: items[0],
                dashboard: dashboard,
                above: null,
                extensible : ((items.length + 1) / 2 < (dashboard.maxColumns || 1)),
                beforeAfter : 0,
                data: data,
                panel: data.panel,
                rawEvent: e,
                source: dd,
                status: this.dropAllowed
            },
            t, ht, i, k, item, w, childCount, childItems, childItem;

        //DragZone is left of container bounds
        if (x < 0 && over.extensible) {
            //console.log('left of everything: x=' + x, 'extensible:', over.extensible);
            over.beforeAfter = -1;

        //DragZone is right of container bounds
        } else if (x > bodyBox.width) {
            //console.log('right of everything: x=' + x, 'extensible:', over.extensible);
            over.beforeAfter = over.extensible ? 1 : 0;
            over.columnIndex = count - 1;
        } else {

        //DragZone is intra-column
            for (i = 0; i < count; i += 2) {
                item = items[i];
                w = item.lastBox.width;
                if (items[i+1]) {
                    w += items[i+1].lastBox.width;
                }

                if (x < w) {
                    over.columnIndex = i;
                    over.column = item;

                    childItems = item.items.items;
                    t = Math.min(80, w * 0.2);
                    over.beforeAfter = t = (over.extensible && ((x < t) ? -1 : ((x > w - t) ? 1 : 0)));

                    if (!t || !over.extensible) {
                        // if we are not on an edge OR reached maxColumns (which means "insert the panel in
                        // between the columns"), we need to dig one more level down
                        //console.log('inside of column ' + i + ': x=' + x + ', y=' + y);
                        for (k = 0, childCount = childItems.length; k < childCount; ++k) {
                            childItem = childItems[k];
                            ht = childItem.el.getHeight();
                            //console.log(childItem.id + '.ht = ' + ht);
                            if (y < ht / 2) {
                                //console.log('above child ' + k);
                                // if mouse is above the current child's top, Y coord, it
                                // is considered as "above" the previous child
                                over.above = childItem;
                                break;
                            }
                            //console.log('below child ' + k);
                            y -= ht;
                        }

                    }

                    break;
                }

                x -= w;
            }
        }

        return over;
    },

    notifyOver: function (dd, e, data) {
        var me = this,
            dashboard = me.dashboard,
            over = me.getOverEvent(dd, e, data),
            colEl = over.column.el,
            proxy = dd.proxy,
            proxyProxy,
            aboveItem = over.above,
            colWidth, width;

        data.lastOver = over;

        if (dashboard.fireEvent('validatedrop', over) !== false &&
            dashboard.fireEvent('beforedragover', over) !== false) {
            proxyProxy = dd.panelProxy.getProxy();

            // make sure proxy width is fluid in different width columns
            proxy.getProxy().setWidth('auto');

            if (over.beforeAfter ) {

                dd.panelProxy.moveProxy(colEl.dom, colEl.dom.firstChild);

                colWidth = colEl.getWidth();
                width = colWidth / 2;
                proxyProxy.setWidth(width);

            } else {
                if (aboveItem) {
                    dd.panelProxy.moveProxy(aboveItem.el.dom.parentNode, aboveItem.el.dom);
                } else {
                    dd.panelProxy.moveProxy(colEl.dom, null);
                }
                proxyProxy.setWidth('auto');
            }

            if (over.beforeAfter > 0) {
                proxyProxy.setStyle('margin-left', (colWidth - width - colEl.getPadding('lr')) + 'px');
            } else {
                proxyProxy.setStyle('margin-left', '');
            }

            this.scrollPos = dashboard.body.getScroll();

            dashboard.fireEvent('dragover', over);
        }

        return over.status;
    },

    notifyDrop: function (dd, e, data) {
        this.callParent(arguments);

        var dashboard = this.dashboard,
            over = data.lastOver,
            panel = over.panel,
            side = over.beforeAfter,
            fromCt = panel.ownerCt,
            toCt = over.column,
            currentIndex = fromCt.items.indexOf(panel),
            newIndex = over.above ? toCt.items.indexOf(over.above) : toCt.items.getCount(),
            colIndex, newCol;

//        console.log('DROP: ' + panel.id + '@' + currentIndex +
//                // ' from ' + fromCt.id +
//                (side ? ((side < 0) ? ' BEFORE ' : ' AFTER ')
//                      : (' AT ' + newIndex + ' IN ')) + toCt.id +
//                (over.above ? ' ABOVE ' + over.above.id : ' AT END'));

        //Same column tests
        if (fromCt === toCt) {
            if (fromCt.items.getCount() === 1) {
                //console.log('Null op');
                return;
            }
            if (!side) {
                if (currentIndex < newIndex) {
                    --newIndex;
                    //console.log('Adjusted newIndex=' + newIndex);
                }
                if (currentIndex === newIndex) {
                    //console.log('No change');
                    return;
                }
            }
        }

        if (dashboard.fireEvent('validatedrop', over) === false ||
            dashboard.fireEvent('beforedrop', over) === false) {
            return;
        }

        Ext.suspendLayouts();

        panel.isMoving = true;
        if (side) {
            colIndex = dashboard.items.indexOf(toCt);
            if (side > 0) {
                ++colIndex;
            }
            newCol = dashboard.createColumn();
            newCol.columnWidth = toCt.columnWidth = toCt.columnWidth / 2;
            toCt = dashboard.insert(colIndex, newCol);
            newIndex = 0;
        }

        // make sure panel is visible prior to inserting so the layout doesn't ignore it
        panel.el.dom.style.display = '';

        toCt.insert(newIndex, panel);
        if (fromCt.items.getCount() === 0) {
            toCt.columnWidth += fromCt.columnWidth;
        }

        panel.isMoving = false;

        panel.updateLayout();
        Ext.resumeLayouts(true);

        dashboard.fireEvent('drop', over);
    },

    // unregister the dropzone from ScrollManager
    unreg: function() {
        Ext.dd.ScrollManager.unregister(this.dashboard.body);
        this.callParent();
    }
});
