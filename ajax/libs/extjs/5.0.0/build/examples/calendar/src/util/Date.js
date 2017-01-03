Ext.define('Ext.calendar.util.Date', {
    
    singleton: true,
    
    diffDays: function(start, end) {
        var day = 1000 * 60 * 60 * 24,
            clear = Ext.Date.clearTime,
            diff = clear(end, true).getTime() - clear(start, true).getTime();
        
        return Math.ceil(diff / day);
    },

    copyTime: function(fromDt, toDt) {
        var dt = Ext.Date.clone(toDt);
        dt.setHours(
            fromDt.getHours(),
            fromDt.getMinutes(),
            fromDt.getSeconds(),
            fromDt.getMilliseconds());

        return dt;
    },

    compare: function(dt1, dt2, precise) {
        if (precise !== true) {
            dt1 = Ext.Date.clone(dt1);
            dt1.setMilliseconds(0);
            dt2 = Ext.Date.clone(dt2);
            dt2.setMilliseconds(0);
        }
        return dt2.getTime() - dt1.getTime();
    },
    
    isMidnight: function(dt) {
        return dt.getHours() === 0 &&
               dt.getMinutes() === 0 &&
               dt.getSeconds() === 0 && 
               dt.getMilliseconds() === 0;    
    },

    // private helper fn
    maxOrMin: function(max) {
        var dt = (max ? 0: Number.MAX_VALUE),
        i = 0,
        args = arguments[1],
        ln = args.length;
        for (; i < ln; i++) {
            dt = Math[max ? 'max': 'min'](dt, args[i].getTime());
        }
        return new Date(dt);
    },

    max: function() {
        return this.maxOrMin.apply(this, [true, arguments]);
    },

    min: function() {
        return this.maxOrMin.apply(this, [false, arguments]);
    },
    
    today: function() {
        return Ext.Date.clearTime(new Date());
    },
    
    /**
     * Adds time to the specified date and returns a new Date instance as the result (does not
     * alter the original date object). Time can be specified in any combination of milliseconds
     * to years, and the function automatically takes leap years and daylight savings into account.
     * Some syntax examples:<code><pre>
var now = new Date();

// Add 24 hours to the current date/time:
var tomorrow = Extensible.Date.add(now, { days: 1 });

// More complex, returning a date only with no time value:
var futureDate = Extensible.Date.add(now, {
    weeks: 1,
    days: 5,
    minutes: 30,
    clearTime: true
});
</pre></code>
     * @param {Date} dt The starting date to which to add time
     * @param {Object} o A config object that can contain one or more of the following
     * properties, each with an integer value:
     * 
     * - millis
     * - seconds
     * - minutes
     * - hours
     * - days
     * - weeks
     * - months
     * - years
     * 
     * You can also optionally include the property "clearTime: true" which will perform all of the
     * date addition first, then clear the time value of the final date before returning it.
     * @return {Date} A new date instance containing the resulting date/time value
     */
    add : function(dt, o) {
        if (!o) {
            return dt;
        }
        var ExtDate = Ext.Date,
            dateAdd = ExtDate.add,
            newDt = ExtDate.clone(dt);
        
        if (o.years) {
            newDt = dateAdd(newDt, ExtDate.YEAR, o.years);
        }
        if (o.months) {
            newDt = dateAdd(newDt, ExtDate.MONTH, o.months);
        }
        if (o.weeks) {
            o.days = (o.days || 0) + (o.weeks * 7);
        }
        if (o.days) {
            newDt = dateAdd(newDt, ExtDate.DAY, o.days);
        }
        if (o.hours) {
            newDt = dateAdd(newDt, ExtDate.HOUR, o.hours);
        }
        if (o.minutes) {
            newDt = dateAdd(newDt, ExtDate.MINUTE, o.minutes);
        }
        if (o.seconds) {
            newDt = dateAdd(newDt, ExtDate.SECOND, o.seconds);
        }
        if (o.millis) {
            newDt = dateAdd(newDt, ExtDate.MILLI, o.millis);
        }
         
        return o.clearTime ? ExtDate.clearTime(newDt) : newDt;
    }
});