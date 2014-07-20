/**
 * This class is used to bulk schedule a set of `Ext.util.Schedulable` items. The items
 * in the scheduler request time by calling their `schedule` method and when the time has
 * arrived its `react` method is called.
 *
 * The `react` methods are called in dependency order as determined by the sorting process.
 * The sorting process relies on each item to implement its own `sort` method.
 *
 * @private
 */
Ext.define('Ext.util.Scheduler', {
    mixins: [
        'Ext.mixin.Observable'
    ],

    requires: [
        'Ext.util.Collection'
    ],

    busyCounter: 0,
    lastBusyCounter: 0,

    destroyed: false,

    firing: null,

    notifyIndex: -1,

    nextId: 0,

    orderedItems: null,

    passes: 0,

    scheduledCount: 0,

    validIdRe: null,

    config: {
        /**
         * @cfg {Number} cycleLimit
         * The maximum number of iterations to make over the items in one `notify` call.
         * This is used to prevent run away logic from looping infinitely. If this limit
         * is exceeded, an error is thrown (in development builds).
         * @private
         */
        cycleLimit: 5,

        /**
         * @cfg {String/Function} preSort
         * If provided the `Schedulable` items will be pre-sorted by this function or
         * property value before the dependency sort.
         */
        preSort: null,

        /**
         * @cfg {Number} tickDelay
         * The number of milliseconds to delay notification after the first `schedule`
         * request.
         */
        tickDelay: 5
    },

    constructor: function (config) {
        //<debug>
        if (Ext.util.Scheduler.instances) {
            Ext.util.Scheduler.instances.push(this);
        } else {
            Ext.util.Scheduler.instances = [ this ];
        }
        this.id = Ext.util.Scheduler.count = (Ext.util.Scheduler.count || 0) + 1;
        //</debug>

        this.mixins.observable.constructor.call(this, config);

        this.items = new Ext.util.Collection();
    },

    destroy: function () {
        var me = this,
            timer = me.timer;

        if (timer) {
            window.clearTimeout(timer);
            me.timer = null;
        }

        me.destroyed = true;
        me.items = me.orderedItems = null;

        me.destroy = Ext.emptyFn;

        //<debug>
        Ext.Array.remove(Ext.util.Scheduler.instances, this);
        //</debug>
    },

    /**
     * Adds an item to the scheduler. This is called internally by the `constructor` of
     * `{@link Ext.util.Schedulable}`.
     *
     * @param {Object} item The item to add.
     * @private
     * @since 5.0.0
     */
    add: function (item) {
        var me = this,
            items = me.items;

        if (items === me.firing) {
            me.items = items = items.clone();
        }

        item.id = item.id || ++me.nextId;
        item.scheduler = me;
        
        items.add(item);

        if (!me.sortMap) {
            // If we are sorting we don't want to invalidate this... we will pick up the
            // new items just fine.
            me.orderedItems = null;
        }
    },

    /**
     * Removes an item to the scheduler. This is called internally by the `destroy` method
     * of `{@link Ext.util.Schedulable}`.
     *
     * @param {Object} item The item to remove.
     * @private
     * @since 5.0.0
     */
    remove: function (item) {
        var me = this,
            items = me.items;

        if (me.destroyed) {
            return;
        }

        //<debug>
        if (me.sortMap) {
            Ext.Error.raise('Items cannot be removed during sort');
        }
        //</debug>

        if (items === me.firing) {
            me.items = items = items.clone();
        }

        if (item.scheduled) {
            me.unscheduleItem(item);
            item.scheduled = false;
        }

        items.remove(item);

        me.orderedItems = null;
    },

    /**
     * This method is called internally as needed to sort or resort the items in their
     * proper dependency order.
     *
     * @private
     * @since 5.0.0
     */
    sort: function () {
        var me = this,
            items = me.items,
            sortMap = {},
            preSort = me.getPreSort(),
            i, item;

        me.orderedItems = [];
        me.sortMap = sortMap;

        //<debug>
        me.sortStack = [];
        //</debug>

        if (preSort) {
            items.sortItems(preSort);
        }

        items = items.items; // grab the items array

        // We reference items.length since items can be added during this loop
        for (i = 0; i < items.length; ++i) {
            item = items[i];
            if (!sortMap[item.id]) {
                me.sortItem(item);
            }
        }

        me.sortMap = null;

        //<debug>
        me.sortStack = null;
        //</debug>
    },

    /**
     * Adds one item to the sorted items array. This can be called by the `sort` method of
     * `{@link Ext.util.Sortable sortable}` objects to add an item on which it depends.
     *
     * @param {Object} item The item to add.
     * @return {Ext.util.Scheduler} This instance.
     * @since 5.0.0
     */
    sortItem: function (item) {
        var me = this,
            sortMap = me.sortMap,
            orderedItems = me.orderedItems,
            itemId;

        if (!item.scheduler) {
            me.add(item);
        }

        itemId = item.id;

        //<debug>
        if (item.scheduler !== me) {
            Ext.Error.raise('Item ' + itemId + ' belongs to another Scheduler');
        }

        me.sortStack.push(item);

        if (sortMap[itemId] === 0) {
            for (var cycle = [], i = 0; i < me.sortStack.length; ++i) {
                cycle[i] = me.sortStack[i].getFullName();
            }
            Ext.Error.raise('Dependency cycle detected: ' + cycle.join('\n --> '));
        }
        //</debug>

        if (!(itemId in sortMap)) {
            // In production builds the above "if" will kick out the items that have
            // already been added (which it must) but also those that are being added
            // and have created a cycle (by virtue of the setting to 0). This check
            // should not be needed if cycles were all detected and removed in dev but
            // this is better than infinite recursion.
            sortMap[itemId] = 0;

            if (!item.sort.$nullFn) {
                item.sort();
            }

            sortMap[itemId] = 1;

            item.order = me.orderedItems.length;
            orderedItems.push(item);
        }

        //<debug>
        me.sortStack.pop();
        //</debug>

        return me;
    },

    /**
     * Adds multiple items to the sorted items array. This can be called by the `sort`
     * method of `{@link Ext.util.Sortable sortable}` objects to add items on which it
     * depends.
     *
     * @param {Object/Object[]} items The items to add. If this is an object, the values
     * are considered the items and the keys are ignored.
     * @return {Ext.util.Scheduler} This instance.
     * @since 5.0.0
     */
    sortItems: function (items) {
        var me = this,
            sortItem = me.sortItem;

        if (items) {
            if (items instanceof Array) {
                Ext.each(items, sortItem, me);
            } else {
                Ext.Object.eachValue(items, sortItem, me);
            }
        }

        return me;
    },

    applyPreSort: function (preSort) {
        if (typeof preSort === 'function') {
            return preSort;
        }

        var parts = preSort.split(','),
            direction = [],
            length = parts.length,
            c, i, s;

        for (i = 0; i < length; ++i) {
            direction[i] = 1;
            s = parts[i];

            if ((c = s.charAt(0)) === '-') {
                direction[i] = -1;
            } else if (c !== '+') {
                c = 0;
            }

            if (c) {
                parts[i] = s.substring(1);
            }
        }

        return function (lhs, rhs) {
            var ret = 0,
                i, prop, v1, v2;

            for (i = 0; !ret && i < length; ++i) {
                prop = parts[i];
                v1 = lhs[prop];
                v2 = rhs[prop];
                ret = direction[i] * ((v1 < v2) ? -1 : ((v2 < v1) ? 1 : 0));
            }

            return ret;
        };
    },

    //-------------------------------------------------------------------------
    // Callback scheduling
    // <editor-fold>

    /**
     * This method can be called to force the delivery of any scheduled items. This is
     * called automatically on a timer when items request service.
     *
     * @since 5.0.0
     */
    notify: function () {
        var me = this,
            timer = me.timer,
            cyclesLeft = me.getCycleLimit(),
            busyCounter, i, item, len, queue;

        if (timer) {
            window.clearTimeout(timer);
            me.timer = null;
        }

        //<debug>
        if (me.firing) {
            Ext.Error.raise('Notify cannot be called recursively');
        }
        //</debug>

        while (me.scheduledCount) {
            if (cyclesLeft) {
                --cyclesLeft;
            } else {
                me.firing = null;
                //<debug>
                if (me.onCycleLimitExceeded) {
                    me.onCycleLimitExceeded();
                }
                //</debug>
                break;
            }

            ++me.passes;

            // We need to sort before we start firing because items can be added as we
            // loop.
            if (!(queue = me.orderedItems)) {
                me.sort();
                queue = me.orderedItems;
            }

            len = queue.length;
            if (len) {
                me.firing = me.items;

                for (i = 0; i < len; ++i) {
                    item = queue[i];

                    if (item.scheduled) {
                        item.scheduled = false;
                        --me.scheduledCount;
                        me.notifyIndex = i;

                        //Ext.log('React: ' + item.getFullName());
                        // This sequence allows the reaction to schedule items further
                        // down the queue without a second pass but also to schedule an
                        // item that is "upstream" or even itself.
                        item.react();

                        if (!me.scheduledCount) {
                            break;
                        }
                    }
                }
            }
        }

        me.firing = null;
        me.notifyIndex = -1;

        // The last thing we do is check for idle state transition (now that whatever
        // else that was queued up has been dispatched):
        if ((busyCounter = me.busyCounter) !== me.lastBusyCounter) {
            if (!(me.lastBusyCounter = busyCounter)) {
                // Since the counters are not equal, we were busy and are not anymore,
                // so we can fire the idle event:
                me.fireEvent('idle', me);
            }
        }
    },

    /**
     * The method called by the timer. This cleans up the state and calls `notify`.
     * @private
     * @since 5.0.0
     */
    onTick: function () {
        this.timer = null;
        this.notify();
    },

    /**
     * Called to indicate that an item needs to be scheduled. This should not be called
     * directly. Call the item's `{@link Ext.util.Schedulable#schedule schedule}` method
     * instead.
     * @param {Object} item
     * @private
     * @since 5.0.0
     */
    scheduleItem: function (item) {
        var me = this;

        ++me.scheduledCount;
        //Ext.log('Schedule: ' + item.getFullName());

        if (!me.timer && !me.firing) {
            me.scheduleTick();
        }
    },

    /**
     * This method starts the timer that will execute the next `notify`.
     * @param {Object} item
     * @private
     * @since 5.0.0
     */
    scheduleTick: function () {
        var me = this;

        if (!me.destroyed && !me.timer) {
            me.timer = Ext.Function.defer(me.onTick, me.getTickDelay(), me);
        }
    },

    /**
     * Called to indicate that an item needs to be removed from the schedule. This should
     * not be called directly. Call the item's `{@link Ext.util.Schedulable#unschedule unschedule}`
     * method instead.
     * @param {Object} item
     * @private
     * @since 5.0.0
     */
    unscheduleItem: function (item) {
        if (this.scheduledCount) {
            --this.scheduledCount;
        }
    },

    // </editor-fold>

    //-------------------------------------------------------------------------
    // Busy/Idle state tracking
    // <editor-fold>

    /**
     * This method should be called when items become busy or idle. These changes are
     * useful outside to do things like update modal masks or status indicators. The
     * changes are delivered as `busy` and `idle` events.
     *
     * @param {Number} adjustment Should be `1` or `-1` only to indicate transition to
     * busy state or from busy state, respectively.
     * @since 5.0.0
     */
    adjustBusy: function (adjustment) {
        var me = this,
            busyCounter = me.busyCounter + adjustment;

        me.busyCounter = busyCounter;

        if (busyCounter) {
            // If we are now busy but were not previously, fire the busy event immediately
            // and update lastBusyCounter.
            if (!me.lastBusyCounter) {
                me.lastBusyCounter = busyCounter;
                me.fireEvent('busy', me);
            }
        } else if (me.lastBusyCounter && !me.timer) {
            // If we are now not busy but were previously, defer this to make sure that
            // we don't quickly start with some other activity.
            me.scheduleTick();
        }
    },

    /**
     * Returns `true` if this object contains one or more busy items.
     * @return {Boolean}
     * @since 5.0.0
     */
    isBusy: function () {
        return !this.isIdle();
    },

    /**
     * Returns `true` if this object contains no busy items.
     * @return {Boolean}
     * @since 5.0.0
     */
    isIdle: function () {
        return !(this.busyCounter + this.lastBusyCounter);
    },

    // </editor-fold>

    debugHooks: {
        $enabled: false, // Disable by default

        onCycleLimitExceeded: function () {
            Ext.Error.raise('Exceeded cycleLimit ' + this.getCycleLimit());
        },

        scheduleItem: function (item) {
            if (!item) {
                Ext.Error.raise('scheduleItem: Invalid argument');
            }
            Ext.log('Schedule item: ' + item.getFullName() + ' - ' + (this.scheduledCount+1));
            if (item.order <= this.notifyIndex) {
                Ext.log.warn('Suboptimal order: ' + item.order + ' < ' + this.notifyIndex);
            }
            this.callParent([item]);
        },

        unscheduleItem: function (item) {
            if (!this.scheduledCount) {
                Ext.Error.raise('Invalid scheduleCount');
            }
            this.callParent([item]);
            Ext.log('Unschedule item: ' + item.getFullName() + ' - ' + this.scheduledCount);
        }
    }
});
