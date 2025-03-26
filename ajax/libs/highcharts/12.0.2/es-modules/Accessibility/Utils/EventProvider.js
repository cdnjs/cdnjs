/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Class that can keep track of events added, and clean them up on destroy.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
import U from '../../Core/Utilities.js';
const { addEvent } = U;
/**
 * @private
 */
class EventProvider {
    /* *
     *
     *  Constructor
     *
     * */
    constructor() {
        this.eventRemovers = [];
    }
    /**
     * Add an event to an element and keep track of it for later removal.
     * Same args as Highcharts.addEvent.
     * @private
     */
    addEvent() {
        const remover = addEvent.apply(H, arguments);
        this.eventRemovers.push({
            element: arguments[0], // HTML element
            remover
        });
        return remover;
    }
    /**
     * Remove added event.
     * @private
     */
    removeEvent(event) {
        const pos = this.eventRemovers.map((e) => e.remover).indexOf(event);
        this.eventRemovers[pos].remover();
        this.eventRemovers.splice(pos, 1);
    }
    /**
     * Remove all added events.
     * @private
     */
    removeAddedEvents() {
        this.eventRemovers.map((e) => e.remover)
            .forEach((remover) => remover());
        this.eventRemovers = [];
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default EventProvider;
