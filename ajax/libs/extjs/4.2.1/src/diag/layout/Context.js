/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// This override adds diagnostics to the Ext.layout.Context class.

/**
 */
Ext.define('Ext.diag.layout.Context', {
    override: 'Ext.layout.Context',

    requires: [
        'Ext.perf.Monitor'
    ],

    logOn: {
        //boxParent: true,
        //calculate: true,
        //cancelComponent: true,
        //cancelLayout: true,
        //doInvalidate: true,
        //flush: true,
        //flushInvalidate: true,
        //invalidate: true,
        //initItem: true,
        //layoutDone: true,
        //queueLayout: true,
        //resetLayout: true,
        //runCycle: true,
        //setProp: true,
        0:0
    },

    //profileLayoutsByType: true,

    //reportOnSuccess: true,

    cancelComponent: function (comp) {
        if (this.logOn.cancelComponent) {
            Ext.log('cancelCmp: ', comp.id);
        }
        this.callParent(arguments);
    },

    cancelLayout: function (layout) {
        if (this.logOn.cancelLayout) {
            Ext.log('cancelLayout: ', this.getLayoutName(layout));
        }
        this.callParent(arguments);
    },

    callLayout: function (layout, methodName) {
        var accum = this.accumByType[layout.type],
            frame = accum && accum.enter();

        this.callParent(arguments);

        if (accum) {
            frame.leave();
        }
    },

    checkRemainingLayouts: function () {
        var me       = this,
            expected = 0,
            key, layout;

        for (key in me.layouts) {
            layout = me.layouts[key];

            if (me.layouts.hasOwnProperty(key) && layout.running) {
                ++expected;
            }
        }

        if (me.remainingLayouts != expected) {
            Ext.Error.raise({
                msg: 'Bookkeeping error me.remainingLayouts'
            });
        }
    },

    flush: function () {
        if (this.logOn.flush) {
            var items = this.flushQueue;
            Ext.log('--- Flush ', items && items.getCount());
        }

        return this.callParent(arguments);
    },

    flushInvalidates: function () {
        if (this.logOn.flushInvalidate) {
            Ext.log('>> flushInvalidates');
        }

        var ret = this.callParent(arguments);

        if (this.logOn.flushInvalidate) {
            Ext.log('<< flushInvalidates');
        }

        return ret;
    },

    getCmp: function (target) {
        var ret = this.callParent(arguments);
        if (!ret.wrapsComponent) {
            Ext.Error.raise({
                msg: target.id + ' is not a component'
            });
        }
        return ret;
    },

    getEl: function (parent, target) {
        var ret = this.callParent(arguments);
        if (ret && ret.wrapsComponent) {
            Ext.Error.raise({
                msg: parent.id + '/' + target.id + ' is a component (expected element)'
            });
        }
        return ret;
    },

    getLayoutName: function (layout) {
        return layout.owner.id + '<' + layout.type + '>';
    },

    layoutDone: function (layout) {
        var me = this,
            name = me.getLayoutName(layout);

        if (me.logOn.layoutDone) {
            Ext.log('layoutDone: ', name, ' ( ', me.remainingLayouts, ' running)');
        }

        if (!layout.running) {
            Ext.Error.raise({
                msg: name + ' is already done'
            });
        }
        if (!me.remainingLayouts) {
            Ext.Error.raise({
                msg: name + ' finished but no layouts are running'
            });
        }

        me.callParent(arguments);
    },

    layoutTreeHasFailures: function (layout, reported) {
        var me = this;

        function hasFailure (lo) {
            var failure = !lo.done,
                key, childLayout;

            if (lo.done) {
                for (key in me.layouts) {
                    if (me.layouts.hasOwnProperty(key)) {
                        childLayout = me.layouts[key];

                        if (childLayout.owner.ownerLayout === lo) {
                            if (hasFailure(childLayout)) {
                                failure = true;
                            }
                        }
                    }
                }
            }

            return failure;
        }

        if (hasFailure(layout)) {
            return true;
        }

        function markReported (lo) {
            var key, childLayout;

            reported[lo.id] = 1;

            for (key in me.layouts) {
                if (me.layouts.hasOwnProperty(key)) {
                    childLayout = me.layouts[key];

                    if (childLayout.owner.ownerLayout === lo) {
                        markReported(childLayout);
                    }
                }
            }
        }

        markReported(layout);
        return false;
    },

    queueLayout: function (layout) {
        if (layout.done || layout.blockCount || layout.pending) {
            Ext.Error.raise({
                msg: this.getLayoutName(layout) + ' should not be queued for layout'
            });
        }
        if (this.logOn.queueLayout) {
            Ext.log('Queue ', this.getLayoutName(layout));
        }
        return this.callParent(arguments);
    },

    reportLayoutResult: function (layout, reported) {
        var me           = this,
            owner        = layout.owner,
            ownerContext = me.getCmp(owner),
            blockedBy    = [],
            triggeredBy  = [],
            key, value, i, length, childLayout,
            item, setBy, info;

        reported[layout.id] = 1;

        for (key in layout.blockedBy) {
            if (layout.blockedBy.hasOwnProperty(key)) {
                blockedBy.push(layout.blockedBy[key]);
            }
        }
        blockedBy.sort();

        for (key in me.triggersByLayoutId[layout.id]) {
            if (me.triggersByLayoutId[layout.id].hasOwnProperty(key)) {
                value = me.triggersByLayoutId[layout.id][key];
                triggeredBy.push({ name: key, info: value });
            }
        }
        triggeredBy.sort(function (a, b) {
            return a.name < b.name ? -1 : (b.name < a.name ? 1 : 0);
        });

        Ext.log({indent: 1}, (layout.done ? '++' : '--'), me.getLayoutName(layout),
            (ownerContext.isBoxParent ? ' [isBoxParent]' : ''),
            (ownerContext.boxChildren ? ' - boxChildren: ' + ownerContext.state.boxesMeasured + '/' + ownerContext.boxChildren.length : ''),
            ownerContext.boxParent ? (' - boxParent: ' + ownerContext.boxParent.id) : '',
            ' - size: ', ownerContext.widthModel.name, '/', ownerContext.heightModel.name);

        if (!layout.done || me.reportOnSuccess) {
            if (blockedBy.length) {
                ++Ext.log.indent;
                Ext.log({indent: 1}, 'blockedBy:  count=',layout.blockCount);

                length = blockedBy.length;
                for (i = 0; i < length; i++) {
                    Ext.log(blockedBy[i]);
                }

                Ext.log.indent -= 2;
            }
            if (triggeredBy.length) {
                ++Ext.log.indent;
                Ext.log({indent: 1}, 'triggeredBy: count='+layout.triggerCount);

                length = triggeredBy.length;
                for (i = 0; i < length; i++) {
                    info = value.info || value;
                    item  = info.item;
                    setBy = (item.setBy && item.setBy[info.name]) || '?';

                    value = triggeredBy[i];

                    Ext.log(
                        value.name,
                        ' (',
                        item.props[info.name],
                        ') dirty: ',
                        (item.dirty ? !!item.dirty[info.name] : false),
                        ', setBy: ',
                        setBy
                    );
                }

                Ext.log.indent -= 2;
            }
        }

        for (key in me.layouts) {
            if (me.layouts.hasOwnProperty(key)) {
                childLayout = me.layouts[key];

                if (!childLayout.done && childLayout.owner.ownerLayout === layout) {
                    me.reportLayoutResult(childLayout, reported);
                }
            }
        }

        for (key in me.layouts) {
            if (me.layouts.hasOwnProperty(key)) {
                childLayout = me.layouts[key];

                if (childLayout.done && childLayout.owner.ownerLayout === layout) {
                    me.reportLayoutResult(childLayout, reported);
                }
            }
        }

        --Ext.log.indent;
    },

    resetLayout: function (layout) {
        var me = this,
            type = layout.type,
            name = me.getLayoutName(layout),
            accum = me.accumByType[type],
            frame;

        if (me.logOn.resetLayout) {
            Ext.log('resetLayout: ', name, ' ( ', me.remainingLayouts, ' running)');
        }

        if (!me.state) { // if (first time ... before run)
            if (!accum && me.profileLayoutsByType) {
                me.accumByType[type] = accum = Ext.Perf.get('layout_' + layout.type);
            }
            me.numByType[type] = (me.numByType[type] || 0) + 1;
        }

        frame = accum && accum.enter();
        me.callParent(arguments);
        if (accum) {
            frame.leave();
        }

        me.checkRemainingLayouts();
    },

    round: function (t) {
        return Math.round(t * 1000) / 1000;
    },

    run: function () {
        var me = this,
            ret, time, key, value, i, layout,
            boxParent, children, n,
            reported, unreported,
            calcs, total,
            calcsLength, calc;

        me.accumByType = {};
        me.calcsByType = {};
        me.numByType = {};
        me.timesByType = {};
        me.triggersByLayoutId = {};

        Ext.log.indentSize = 3;
        Ext.log('==================== LAYOUT ====================');

        time = Ext.perf.getTimestamp();
        ret = me.callParent(arguments);
        time = Ext.perf.getTimestamp() - time;

        if (me.logOn.boxParent && me.boxParents) {
            for (key in me.boxParents) {
                if (me.boxParents.hasOwnProperty(key)) {
                    boxParent = me.boxParents[key];
                    children  = boxParent.boxChildren;
                    n         = children.length;

                    Ext.log('boxParent: ', boxParent.id);
                    for (i = 0; i < n; ++i) {
                        Ext.log(' --> ', children[i].id);
                    }
                }
            }
        }

        if (ret) {
            Ext.log('----------------- SUCCESS -----------------');
        } else {
            Ext.log(
                {level: 'error' },
                '----------------- FAILURE -----------------'
            );
        }

        for (key in me.layouts) {
            if (me.layouts.hasOwnProperty(key)) {
                layout = me.layouts[key];

                if (layout.running) {
                    Ext.log.error('Layout left running: ', me.getLayoutName(layout));
                }
                if (layout.ownerContext) {
                    Ext.log.error('Layout left connected: ', me.getLayoutName(layout));
                }
            }
        }

        if (!ret || me.reportOnSuccess) {
            reported = {};
            unreported = 0;

            for (key in me.layouts) {
                if (me.layouts.hasOwnProperty(key)) {
                    layout = me.layouts[key];

                    if (me.items[layout.owner.el.id].isTopLevel) {
                        if (me.reportOnSuccess || me.layoutTreeHasFailures(layout, reported)) {
                            me.reportLayoutResult(layout, reported);
                        }
                    }
                }
            }

            // Just in case we missed any layouts...
            for (key in me.layouts) {
                if (me.layouts.hasOwnProperty(key)) {
                    layout = me.layouts[key];

                    if (!reported[layout.id]) {
                        if (!unreported) {
                            Ext.log('----- Unreported!! -----');
                        }
                        ++unreported;
                        me.reportLayoutResult(layout, reported);
                    }
                }
            }
        }

        Ext.log('Cycles: ', me.cycleCount, ', Flushes: ', me.flushCount,
            ', Calculates: ', me.calcCount, ' in ', me.round(time), ' msec');

        Ext.log('Calculates by type:');
        /*Ext.Object.each(me.numByType, function (type, total) {
            Ext.log(type, ': ', total, ' in ', me.calcsByType[type], ' tries (',
                Math.round(me.calcsByType[type] / total * 10) / 10, 'x) at ',
                me.round(me.timesByType[type]), ' msec (avg ',
                me.round(me.timesByType[type] / me.calcsByType[type]), ' msec)');
        });*/
        calcs = [];
        for (key in me.numByType) {
            if (me.numByType.hasOwnProperty(key)) {
                total = me.numByType[key];

                calcs.push({
                        type       : key,
                        total      : total,
                        calcs      : me.calcsByType[key],
                        multiple   : Math.round(me.calcsByType[key] / total * 10) / 10,
                        calcTime   : me.round(me.timesByType[key]),
                        avgCalcTime: me.round(me.timesByType[key] / me.calcsByType[key])
                    });
            }
        }


        calcs.sort(function (a,b) {
            return b.calcTime - a.calcTime;
        });

        calcsLength = calcs.length;
        for (i=0; i<calcsLength; i++) {
            calc = calcs[i];

            Ext.log(
                calc.type,
                ': ',
                calc.total,
                ' in ',
                calc.calcs,
                ' tries (',
                calc.multiple,
                'x) at ',
                calc.calcTime,
                ' msec (avg ',
                calc.avgCalcTime,
                ' msec)'
            );
        }

        return ret;
    },

    runCycle: function () {
        if (this.logOn.runCycle) {
            Ext.log('>>> Cycle ', this.cycleCount, ' (queue length: ', this.layoutQueue.length, ')');
        }

        return this.callParent(arguments);
    },

    runLayout: function (layout) {
        var me = this,
            type = layout.type,
            accum = me.accumByType[type],
            frame, ret, time;

        if (me.logOn.calculate) {
            Ext.log('-- calculate ', this.getLayoutName(layout));
        }

        frame = accum && accum.enter();

        time = Ext.perf.getTimestamp();
        ret = me.callParent(arguments);
        time = Ext.perf.getTimestamp() - time;
        if (accum) {
            frame.leave();
        }

        me.calcsByType[type] = (me.calcsByType[type] || 0) + 1;
        me.timesByType[type] = (me.timesByType[type] || 0) + time;

        /*  add a / to the front of this line to enable layout completion logging
        if (layout.done) {
            var ownerContext = me.getCmp(layout.owner),
                props = ownerContext.props;

            if (layout.isComponentLayout) {
                Ext.log('complete ', layout.owner.id, ':', type, ' w=',props.width, ' h=', props.height);
            } else {
                Ext.log('complete ', layout.owner.id, ':', type, ' cw=',props.contentWidth, ' ch=', props.contentHeight);
            }
        }**/

        return ret;
    }
});
