/* *
 *
 *  (c) 2009-2022 Øystein Moseng
 *
 *  Class representing a TimelineChannel with sonification events to play.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/**
 * Represents a channel of TimelineEvents for an engine (either an instrument
 * or a speaker).
 * @private
 */
class TimelineChannel {
    constructor(type, engine, showPlayMarker = false, events, muted) {
        this.type = type;
        this.engine = engine;
        this.showPlayMarker = showPlayMarker;
        this.muted = muted;
        this.events = events || [];
    }
    addEvent(event) {
        const lastEvent = this.events[this.events.length - 1];
        if (lastEvent && event.time < lastEvent.time) {
            // Ensure we are sorted by time, so insert at the right place
            let i = this.events.length;
            while (i-- && this.events[i].time > event.time) { /* */ }
            this.events.splice(i + 1, 0, event);
        }
        else {
            this.events.push(event);
        }
        return event;
    }
    mute() {
        this.muted = true;
    }
    unmute() {
        this.muted = false;
    }
    cancel() {
        this.engine.cancel();
    }
    destroy() {
        this.engine.destroy();
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TimelineChannel;
/* *
 *
 *  API declarations
 *
 * */
/**
 * A TimelineEvent object represents a scheduled audio event to play for a
 * SonificationTimeline.
 * @requires modules/sonification
 * @interface Highcharts.SonificationTimelineEvent
 */ /**
* Time is given in milliseconds, where 0 is now.
* @name Highcharts.SonificationTimelineEvent#time
* @type {number}
*/ /**
* A reference to a data point related to the TimelineEvent. Populated when
* sonifying points.
* @name Highcharts.SonificationTimelineEvent#relatedPoint
* @type {Highcharts.Point|undefined}
*/ /**
* Options for an instrument event to be played.
* @name Highcharts.SonificationTimelineEvent#instrumentEventOptions
* @type {Highcharts.SonificationInstrumentScheduledEventOptionsObject|undefined}
*/ /**
* Options for a speech event to be played.
* @name Highcharts.SonificationTimelineEvent#speechOptions
* @type {Highcharts.SonificationSpeakerOptionsObject|undefined}
*/ /**
* The message to speak for speech events.
* @name Highcharts.SonificationTimelineEvent#message
* @type {string|undefined}
*/ /**
* Callback to call when playing the event.
* @name Highcharts.SonificationTimelineEvent#callback
* @type {Function|undefined}
*/
(''); // Keep above doclets in JS file
