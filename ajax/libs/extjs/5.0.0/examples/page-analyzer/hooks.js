var _hooking = 3,
    _layoutRuns = [],
    _syncStatusCheck = function () {
        _hooking--;
    };

Ext.require([
        'Ext.perf.Monitor',
        'Ext.perf.Accumulator'
    ],
    function(){
        if (typeof _accumulatorCfg != 'undefined') {
            Ext.Perf.setup(_accumulatorCfg);
        }
        _syncStatusCheck();
    }
);

Ext.define('PageAnalyzer.hook.Context', function () {

    function compareTriggers (a, b) {
        if (a.value === undefined) {
            if (b.value !== undefined) {
                return -1;
            }
        } else if (b.value === undefined) {
            return 1;
        }

        return a.name < b.name ? -1 : (b.name < a.name ? 1 : 0);
    }

    function getLayoutName (layout) {
        return layout.owner.id + '<' + layout.type + '>';
    }

    function getLayoutResults (me, layout, reported, orphan) {
        var owner = layout.owner,
            ownerContext = me.getCmp(owner),
            sizeModel = ownerContext.sizeModel,
            stats = me.layoutsById[layout.id],
            results = {
                allDone: layout.done,
                done: layout.done,
                id: layout.id,
                type: layout.type,
                name: getLayoutName(layout),
                blocks: [],
                boxParent: ownerContext.boxParent ? ownerContext.boxParent.id : null,
                isBoxParent: ownerContext.isBoxParent,
                triggers: [],
                orphan: !!orphan,
                heightModel: ownerContext.heightModel.name,
                widthModel: ownerContext.widthModel.name,
                children: [],
                duration: stats ? stats.duration : 0,
                totalTime: stats ? stats.duration : 0,
                count: stats ? stats.count : 1
            },
            order = [false, true],
            child, i;

        reported[layout.id] = true;

        if (results.heightModel != sizeModel.height.name) {
            results.heightModel += ' (' + sizeModel.height.name + ')';
        }
        if (results.widthModel != sizeModel.width.name) {
            results.widthModel += ' (' + sizeModel.width.name + ')';
        }

        Ext.Object.each(layout.blockedBy, function (t) {
            results.blocks.push(t);
        });

        Ext.Object.each(me.triggersByLayoutId[layout.id], function (name, info) {
            var item = info.item,
                dirty = item.dirty || false,
                prop = info.name,
                value = item.props[prop];

            results.triggers.push({
                name: name,
                prop: prop,
                value: value,
                dirty: dirty && (prop in dirty),
                missing: value === undefined,
                setBy: (item.setBy && item.setBy[prop]) || '??'
            });
        });

        results.blocks.sort();
        results.triggers.sort(compareTriggers);

        for (i = 0; i < 2; ++i) {
            Ext.Object.each(me.layouts, function (id, childLayout) {
                if (childLayout.done === order[i] && childLayout.owner.ownerLayout === layout) {
                    child = getLayoutResults(me, childLayout, reported);
                    if (!child.allDone) {
                        results.allDone = false;
                    }
                    results.totalTime += child.totalTime;
                    results.children.push(child);
                }
            });
        }

        return results;
    }

    function beforeRun (me) {
        me.calcsByType = {};
        me.numByType = {};
        me.timesByType = {};
        me.triggersByLayoutId = {};
        me.layoutsById = {};
        me.layoutsByType = {};
        me.flushLayoutStats = {};

        return {
            startTime: Ext.perf.getTimestamp()
        };
    }

    function afterRun (me, before, ok) {
        var t2 = new Date(),
            reported = {};

        var data = {
            duration: Ext.perf.getTimestamp() - before.startTime,
            time: t2,
            success: ok,
            cycleCount: me.cycleCount,
            flushCount: me.flushCount,
            calcCount: me.calcCount,
            orphans: 0,
            layouts: [],
            statsById: me.layoutsById,
            statsByType: me.layoutsByType,
            flushTime: me.flushTime,
            flushInvalidateTime: me.flushInvalidateTime,
            flushCount: me.flushCount,
            flushInvalidateCount: me.flushInvalidateCount,
            flushLayoutStats: me.flushLayoutStats
        };

        data.totalTime = data.duration;

        Ext.Object.each(me.layouts, function (id, layout) {
            if (me.items[layout.owner.el.id].isTopLevel) {
                data.layouts.push(getLayoutResults(me, layout, reported));
            }
        });

        Ext.Object.each(me.layouts, function (id, layout) {
            if (!reported[layout.id]) {
                ++data.orphans;
                data.layouts.push(getLayoutResults(me, layout, reported, true));
            }
        });

        _layoutRuns.push(Ext.encode(data));
    }

    function beforeRunLayout (me) {
        return {
            startTime: Ext.perf.getTimestamp()
        };
    }

    function afterRunLayout (me, layout, before) {
        var id = layout.id,
            type = layout.type,
            duration =  Ext.perf.getTimestamp() - before.startTime,
            typeMapping = me.layoutsByType[type] || (me.layoutsByType[type] = {
                duration: 0,
                layoutCount: 0,
                count: 0
            }),
            idMapping = me.layoutsById[id];

        if(!idMapping) {
            typeMapping.layoutCount++;
            idMapping = me.layoutsById[id] = {
                duration: 0,
                count: 0
            };
        }

        idMapping.duration += duration;
        typeMapping.duration +=  duration;
        idMapping.count++;
        typeMapping.count++;

    }

    return {
        override: 'Ext.layout.Context',

        flushInvalidateTime: 0,
        flushInvalidateCount: 0,
        flushTime: 0,
        flushCount: 0,

        flush: function() {
            var start = Ext.perf.getTimestamp();
            this.callParent(arguments);
            this.flushTime += Ext.perf.getTimestamp() - start;
            this.flushCount++;
        },

        flushInvalidates: function() {
            var start = Ext.perf.getTimestamp();
            this.callParent(arguments);
            this.flushInvalidateTime += Ext.perf.getTimestamp() - start;
            this.flushInvalidateCount++;
        },

        flushLayouts: function (queueName, methodName, dontClear) {
            var start = Ext.perf.getTimestamp(),
                stats = this.flushLayoutStats[methodName] ||
                    (this.flushLayoutStats[methodName] = {
                        count: 0,
                        time: 0
                    });

            this.callParent(arguments);
            stats.time += Ext.perf.getTimestamp() - start;
            stats.count++;
        },

        run: function () {
            var me = this,
                before = beforeRun(me),
                ok = me.callParent(arguments);

            afterRun(me, before, ok);
            return ok;
        },

        runLayout: function (layout) {
            var me = this,
                before = beforeRunLayout(me);
            me.callParent(arguments);
            afterRunLayout(me, layout, before);
        },
        
        handleFailure: function() {
            var me = this;
            
            me.pageAnalyzerMode = true;
            
            return me.callParent();
        }

    };
}(), _syncStatusCheck);


//-----------------------------------------------------------------------------

Ext.define('PageAnalyzer.hook.ContextItem', function () {
    function getLayoutName (layout) {
        return layout.owner.id + '<' + layout.type + '>';
    }

    return {
        override: 'Ext.layout.ContextItem',

        addBlock: function (name, layout, propName) {
            //Ext.log(this.id,'.',propName,' ',name,': ',getLayoutName(layout));
            (layout.blockedBy || (layout.blockedBy = {}))[
                this.id+'.'+propName+(name.substring(0,3)=='dom' ? ':dom' : '')] = 1;

            return this.callParent(arguments);
        },

        addBoxChild: function (boxChildItem) {
            var ret = this.callParent(arguments),
                boxChildren = this.boxChildren,
                boxParents;

            if (boxChildren && boxChildren.length == 1) {
                // the boxParent collection is created by the run override found in
                // Ext.diag.layout.Context, but IE sometimes does not load that override, so
                // we work around it for now
                boxParents = this.context.boxParents ||
                            (this.context.boxParents = new Ext.util.MixedCollection());
                boxParents.add(this);
            }

            return ret;
        },

        addTrigger: function (propName, inDom) {
            var layout = this.context.currentLayout,
                triggers;

            this.callParent(arguments);
            //Ext.log(this.id,'.',propName,' ',name = inDom ? ':dom' : '',' ',getLayoutName(layout));

            triggers = this.context.triggersByLayoutId;
            (triggers[layout.id] || (triggers[layout.id] = {}))[
                this.id+'.'+propName+(inDom ? ':dom' : '')] = {
                    item: this,
                    name: propName
                };
        },

        clearBlocks: function (name, propName) {
            var collection = this[name],
                blockedLayouts = collection && collection[propName],
                key = this.id+'.'+propName+(name.substring(0,3)=='dom' ? ':dom' : ''),
                layout, layoutId;

            if (blockedLayouts) {
                for (layoutId in blockedLayouts) {
                    layout = blockedLayouts[layoutId];
                    delete layout.blockedBy[key];
                }
            }
            return this.callParent(arguments);
        },

        setProp: function (propName, value, dirty) {
            var me = this,
                layout = me.context.currentLayout,
                setBy = getLayoutName(layout),
                //fullName = me.id + '.' + propName,
                setByProps;

            if (value !== null) {
                setByProps = me.setBy || (me.setBy = {});
                if (!setByProps[propName]) {
                    setByProps[propName] = setBy;
                } else if (setByProps[propName] != setBy) {
                    //Ext.log({level: 'warn'}, 'BAD! ', fullName, ' set by ', setByProps[propName], ' and ', setBy);
                }
            }

            if (typeof value != 'undefined' && !isNaN(value) && me.props[propName] !== value) {
                //Ext.log('set ', fullName, ' = ', value, ' (', dirty, ')');
            }

            return this.callParent(arguments);
        }
    };
}(), _syncStatusCheck);
