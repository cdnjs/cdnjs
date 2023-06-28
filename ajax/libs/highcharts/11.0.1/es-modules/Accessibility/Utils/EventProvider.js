/* *
 *
 *  (c) 2009-2021 Øystein Moseng
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
/* *
 *
 *  Class
 *
 * */
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
        this.eventRemovers.push(remover);
        return remover;
    }
    /**
     * Remove all added events.
     * @private
     */
    removeAddedEvents() {
        this.eventRemovers.forEach((remover) => remover());
        this.eventRemovers = [];
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default EventProvider;
