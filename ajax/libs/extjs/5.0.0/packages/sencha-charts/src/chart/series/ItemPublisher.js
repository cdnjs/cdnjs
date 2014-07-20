/**
 * @private
 */
Ext.define('Ext.chart.series.ItemPublisher', {
    extend: 'Ext.event.publisher.Publisher',

    targetType: 'series',

    handledEvents: [
    /**
     * @event itemmousemove
     * Fires when the mouse is moved on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemmousemove',
    /**
     * @event itemmouseup
     * Fires when a mouseup event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemmouseup',
    /**
     * @event itemmousedown
     * Fires when a mousedown event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemmousedown',
    /**
     * @event itemmouseover
     * Fires when the mouse enters a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemmouseover',
    /**
     * @event itemmouseout
     * Fires when the mouse exits a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemmouseout',
    /**
     * @event itemclick
     * Fires when a click event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemclick',
    /**
     * @event itemdoubleclick
     * Fires when a doubleclick event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemdoubleclick',
    /**
     * @event itemtap
     * Fires when a tap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtap',
    /**
     * @event itemtapstart
     * Fires when a tapstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtapstart',
    /**
     * @event itemtapend
     * Fires when a tapend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtapend',
    /**
     * @event itemtapcancel
     * Fires when a tapcancel event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtapcancel',
    /**
     * @event itemtaphold
     * Fires when a taphold event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtaphold',
    /**
     * @event itemdoubletap
     * Fires when a doubletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemdoubletap',
    /**
     * @event itemsingletap
     * Fires when a singletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemsingletap',
    /**
     * @event itemtouchstart
     * Fires when a touchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtouchstart',
    /**
     * @event itemtouchmove
     * Fires when a touchmove event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtouchmove',
    /**
     * @event itemtouchend
     * Fires when a touchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemtouchend',
    /**
     * @event itemdragstart
     * Fires when a dragstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemdragstart',
    /**
     * @event itemdrag
     * Fires when a drag event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemdrag',
    /**
     * @event itemdragend
     * Fires when a dragend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemdragend',
    /**
     * @event itempinchstart
     * Fires when a pinchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itempinchstart',
    /**
     * @event itempinch
     * Fires when a pinch event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itempinch',
    /**
     * @event itempinchend
     * Fires when a pinchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itempinchend',
    /**
     * @event itemswipe
     * Fires when a swipe event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
        'itemswipe'
    ],

    delegationRegex: /^item([a-z]+)$/i,

    getSubscribers: function (chartId) {
        var subscribers = this.subscribers;

        if (!subscribers.hasOwnProperty(chartId)) {
            subscribers[chartId] = {};
        }

        return subscribers[chartId];
    },

    subscribe: function (target, eventName) {
        var match = target.match(this.idSelectorRegex),
            dispatcher = this.dispatcher,
            targetType = this.targetType,
            series, id;

        if (!match) {
            return false;
        }

        id = match[1];
        series = Ext.ComponentManager.get(id);
        if (!series) {
            return false;
        }

        if (!series.getChart()) {
            dispatcher.addListener(targetType, target, 'chartattached', 'attachChart', this, [series, eventName], 'before');
        } else {
            this.attachChart(series.getChart(), [series, eventName]);
        }

        return true;
    },

    attachChart: function (chart, args) {
        var dispatcher = this.dispatcher,
            targetType = this.targetType,
            series = args[0],
            eventName = args[1],
            subscribers = this.getSubscribers(chart.getId()),
            match = eventName.match(this.delegationRegex);
        if (match) {
            var chartEventName = match[1];
            if (!subscribers.hasOwnProperty(eventName)) {
                subscribers[eventName] = [];
                dispatcher.addListener(targetType, '#' + series.getId(), 'chartdetached', 'detachChart', this, [series, eventName, subscribers], 'after');
                chart.element.on(chartEventName, "relayMethod", this, [chart, eventName]);
            }
            subscribers[eventName].push(series);
            return true;
        } else {
            return false;
        }
    },

    unsubscribe: function (target, eventName) {
        var match = target.match(this.idSelectorRegex),
            dispatcher = this.dispatcher,
            targetType = this.targetType,
            series, id;

        if (!match) {
            return false;
        }

        id = match[1];
        series = Ext.ComponentManager.get(id);
        if (!series) {
            return false;
        }

        dispatcher.removeListener(targetType, target, 'chartattached', 'attachChart', this, 'before');
        if (series.getChart()) {
            this.detachChart(series.getChart(), [series, eventName]);
        }
        return true;
    },

    detachChart: function (chart, args) {
        var dispatcher = this.dispatcher,
            targetType = this.targetType,
            series = args[0],
            eventName = args[1],
            subscribers = this.getSubscribers(chart.getId()),
            match = eventName.match(this.delegationRegex),
            index, seriesArray;
        if (match) {
            var chartEventName = match[1];
            if (subscribers.hasOwnProperty(eventName)) {
                seriesArray = subscribers[eventName];
                index = Ext.Array.indexOf(seriesArray, series);
                if (index > -1) {
                    seriesArray.splice(index, 1);
                }
                if (seriesArray.length === 0) {
                    chart.element.un(chartEventName, "relayMethod", this, [chart, eventName]);
                    dispatcher.removeListener(targetType, '#' + series.getId(), 'chartdetached', 'detachChart', this, 'after');
                    delete subscribers[eventName];
                }
            }
        }
    },

    relayMethod: function (e, sender, args) {
        var chart = args[0],
            eventName = args[1],
            dispatcher = this.dispatcher,
            targetType = this.targetType,
            chartXY = chart.getEventXY(e),
            x = chartXY[0],
            y = chartXY[1],
            subscriber = this.getSubscribers(chart.getId())[eventName],
            i, ln;
        if (subscriber) {
            for (i = 0, ln = subscriber.length; i < ln; i++) {
                var series = subscriber[i],
                    item = series.getItemForPoint(x, y);
                if (item) {
                    // TODO: Don't stop at the first item.
                    // Depending on the selectionTolerance, there might be an item in another
                    // series that's closer to the event location. See test case 3943c.
                    dispatcher.doDispatchEvent(targetType, '#' + series.getId(), eventName, [series, item, e]);
                    return;
                }
            }
        }
    }

}, function () {

});