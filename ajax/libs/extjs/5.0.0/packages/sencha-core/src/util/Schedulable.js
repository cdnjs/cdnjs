/**
 * This is a base class for objects that can be managed by `Ext.util.Scheduler`.
 * @private
 */
Ext.define('Ext.util.Schedulable', {
    'abstract': true,

    isSchedulable: true,

    scheduled: false,

    constructor: function () {
        this.getScheduler().add(this);
    },

    destroy: function () {
        var me = this,
            scheduler = me.getScheduler();

        if (scheduler) {
            scheduler.remove(me);
        }

        me.destroyed = true;
        me.scheduler = null;

        me.schedule = me.destroy = me.react = Ext.emptyFn;
    },

    getFullName: function () {
        return this.name || this.id;
    },

    privates: {
        /**
         * This method returns the `Scheduler` for this item.
         * @return {Ext.util.Scheduler}
         */
        getScheduler: function () {
            return this.scheduler;
        },

        /**
         * Schedules this item with the associated `Ext.util.Scheduler`.
         */
        schedule: function () {
            var me = this,
                scheduler;

            if (!me.scheduled) {
                scheduler = me.getScheduler();

                if (scheduler) {
                    me.scheduled = true;

                    if (me.onSchedule) {
                        me.onSchedule();
                    }

                    scheduler.scheduleItem(me);
                }
            }
        },
        
        /**
         * Unschedules this item with the associated `Ext.util.Scheduler`.
         */
        unschedule: function () {
            var me = this,
                scheduler;

            if (me.scheduled) {
                scheduler = me.getScheduler();
                if (scheduler) {
                    scheduler.unscheduleItem(me);
                }

                me.scheduled = false;
            }
        },
        
        /**
         * @method sort
         * This method should be overridden by items that have dependencies to insert. The
         * standard form would be:
         *
         *      sort: function () {
         *          this.getScheduler().sortItems(this.dependencies);
         *      }
         *
         * This example assumes the item has a "dependencies" array to pass to the scheduler.
         */
         // Can't use Ext.emptyFn here to avoid setting $private: true on it
        sort: function() {}
    }
});
