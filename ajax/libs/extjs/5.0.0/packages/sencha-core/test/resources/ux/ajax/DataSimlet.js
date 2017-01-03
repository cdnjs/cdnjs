/**
 * This base class is used to handle data preparation (e.g., sorting, filtering and
 * group summary).
 */
Ext.define('Ext.ux.ajax.DataSimlet', function () {

    function makeSortFn (def, cmp) {
        var order = def.direction,
            sign = (order && order.toUpperCase() == 'DESC') ? -1 : 1;

        return function (leftRec, rightRec) {
            var lhs = leftRec[def.property],
                rhs = rightRec[def.property],
                c = (lhs < rhs) ? -1 : ((rhs < lhs) ? 1 : 0);

            if (c || !cmp) {
                return c * sign;
            }

            return cmp(leftRec, rightRec);
        }
    }

    function makeSortFns (defs, cmp) {
        for (var sortFn = cmp, i = defs && defs.length; i; ) {
            sortFn = makeSortFn(defs[--i], sortFn);
        }
        return sortFn;
    }

    return {
        extend: 'Ext.ux.ajax.Simlet',

        getData: function (ctx) {
            var me = this,
                data = me.data,
                params = ctx.params,
                order = (params.group||'')+'-'+(params.sort||'')+'-'+(params.dir||''),
                fields,
                sortFn;

            if (!order) {
                return data;
            }

            ctx.groupSpec = params.group && Ext.decode(params.group);
            if (order == me.currentOrder) {
                return me.sortedData;
            }

            fields = params.sort;
            if (params.dir) {
                fields = [{ direction: params.dir, property: fields }];
            } else {
                fields = Ext.decode(params.sort);
            }

            sortFn = makeSortFns((ctx.sortSpec = fields));
            sortFn = makeSortFns(ctx.groupSpec, sortFn);

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
                groupField = ctx.groupSpec[0].property,
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
