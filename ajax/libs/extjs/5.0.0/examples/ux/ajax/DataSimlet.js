/**
 * This base class is used to handle data preparation (e.g., sorting, filtering and
 * group summary).
 */
Ext.define('Ext.ux.ajax.DataSimlet', function () {

    function makeSortFn (def, cmp) {
        var order = def.direction,
            sign = (order && order.toUpperCase() === 'DESC') ? -1 : 1;

        return function (leftRec, rightRec) {
            var lhs = leftRec[def.property],
                rhs = rightRec[def.property],
                c = (lhs < rhs) ? -1 : ((rhs < lhs) ? 1 : 0);

            if (c || !cmp) {
                return c * sign;
            }

            return cmp(leftRec, rightRec);
        };
    }

    function makeSortFns (defs, cmp) {
        for (var sortFn = cmp, i = defs && defs.length; i; ) {
            sortFn = makeSortFn(defs[--i], sortFn);
        }
        return sortFn;
    }

    return {
        extend: 'Ext.ux.ajax.Simlet',

        buildNodes: function (node, path) {
            var me = this,
                nodeData = {
                    data: []
                },
                len = node.length,
                children, i, child, name;

            me.nodes[path] = nodeData;

            for (i = 0; i < len; ++i) {
                nodeData.data.push(child = node[i]);
                name = child.text || child.title;

                child.id = path ? path + '/' + name : name;
                children = child.children;

                if (!(child.leaf = !children)) {
                    delete child.children;

                    me.buildNodes(children, child.id);
                }
            }
        },

        fixTree: function (ctx, tree) {
            var me = this,
                node = ctx.params.node,
                nodes;

            if (!(nodes = me.nodes)) {
                me.nodes = nodes = {};
                me.buildNodes(tree, '');
            }

            node = nodes[node];
            if (node) {
                if (me.node) {
                    me.node.sortedData = me.sortedData;
                    me.node.currentOrder = me.currentOrder;
                }

                me.node = node;
                me.data = node.data;
                me.sortedData = node.sortedData;
                me.currentOrder = node.currentOrder;
            } else {
                me.data = null;
            }
        },

        getData: function (ctx) {
            var me = this,
                params = ctx.params,
                order = (params.filter||'')+(params.group||'')+'-'+(params.sort||'')+'-'+(params.dir||''),
                tree = me.tree,
                dynamicData,
                data, fields, sortFn;

            if (tree) {
                me.fixTree(ctx, tree);
            }

            data = me.data;
            if (typeof data === 'function') {
                dynamicData = true;
                data = data.call(this, ctx);
            }

            if (!order || !data) {
                return data || [];
            }

            if (!dynamicData && order == me.currentOrder) {
                return me.sortedData;
            }

            ctx.filterSpec = params.filter && Ext.decode(params.filter);
            ctx.groupSpec = params.group && Ext.decode(params.group);

            fields = params.sort;
            if (params.dir) {
                fields = [{ direction: params.dir, property: fields }];
            } else {
                fields = Ext.decode(params.sort);
            }

            if (ctx.filterSpec) {
                var filters = new Ext.util.FilterCollection();
                filters.add(this.processFilters(ctx.filterSpec));
                data = Ext.Array.filter(data, filters.getFilterFn());
            }

            sortFn = makeSortFns((ctx.sortSpec = fields));
            if (ctx.groupSpec) {
                sortFn = makeSortFns([ctx.groupSpec], sortFn);
            }

            // If a straight Ajax request, data may not be an array.
            // If an Array, preserve 'physical' order of raw data...
            data = Ext.isArray(data) ? data.slice(0) : data;
            if (sortFn) {
                Ext.Array.sort(data, sortFn);
            }

            me.sortedData = data;
            me.currentOrder = order;

            return data;
        },
        
        processFilters: Ext.identityFn,

        getPage: function (ctx, data) {
            var ret = data,
                length = data.length,
                start = ctx.params.start || 0,
                end = ctx.params.limit ? Math.min(length, start + ctx.params.limit) : length;

            if (start || end < length) {
                ret = ret.slice(start, end);
            }

            return ret;
        },

        getGroupSummary: function (groupField, rows, ctx) {
            return rows[0];
        },

        getSummary: function (ctx, data, page) {
            var me = this,
                groupField = ctx.groupSpec.property,
                accum,
                todo = {},
                summary = [],
                fieldValue,
                lastFieldValue;

            Ext.each(page, function (rec) {
                fieldValue = rec[groupField];
                todo[fieldValue] = true;
            });

            function flush () {
                if (accum) {
                    summary.push(me.getGroupSummary(groupField, accum, ctx));
                    accum = null;
                }
            }

            // data is ordered primarily by the groupField, so one pass can pick up all
            // the summaries one at a time.
            Ext.each(data, function (rec) {
                fieldValue = rec[groupField];

                if (lastFieldValue !== fieldValue) {
                    flush();
                    lastFieldValue = fieldValue;
                }

                if (!todo[fieldValue]) {
                    // if we have even 1 summary, we have summarized all that we need
                    // (again because data and page are ordered by groupField)
                    return !summary.length;
                }

                if (accum) {
                    accum.push(rec);
                } else {
                    accum = [rec];
                }

                return true;
            });

            flush(); // make sure that last pesky summary goes...

            return summary;
        }
    };
}());
