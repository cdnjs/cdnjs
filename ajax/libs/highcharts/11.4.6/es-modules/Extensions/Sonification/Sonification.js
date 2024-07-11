/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Sonification module.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import D from '../../Core/Defaults.js';
const { defaultOptions, getOptions } = D;
import U from '../../Core/Utilities.js';
const { addEvent, extend, fireEvent, merge, pick } = U;
import H from '../../Core/Globals.js';
const { doc, win } = H;
import defaultSonificationOptions from './Options.js';
import SonificationInstrument from './SonificationInstrument.js';
import SonificationSpeaker from './SonificationSpeaker.js';
import SynthPatch from './SynthPatch.js';
import InstrumentPresets from './InstrumentPresets.js';
import timelineFromChart from './TimelineFromChart.js';
/**
 * The Sonification class. This class represents a chart's sonification
 * capabilities. A chart automatically gets an instance of this class when
 * applicable.
 *
 * @sample highcharts/sonification/chart-events
 *         Basic demo accessing some of the chart.sonification methods.
 * @sample highcharts/demo/sonification-navigation
 *         More advanced demo using more functionality.
 *
 * @requires modules/sonification
 *
 * @class
 * @name Highcharts.Sonification
 *
 * @param {Highcharts.Chart} chart The chart to tie the sonification to
 */
class Sonification {
    constructor(chart) {
        this.chart = chart;
        this.retryContextCounter = 0;
        this.lastUpdate = 0;
        this.unbindKeydown = addEvent(doc, 'keydown', function (e) {
            if (chart && chart.sonification &&
                (e.key === 'Esc' || e.key === 'Escape')) {
                chart.sonification.cancel();
            }
        });
        try {
            this.audioContext = new win.AudioContext();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.audioContext.suspend();
            this.audioDestination = this.audioContext.destination;
        }
        catch (e) { /* Ignore */ }
    }
    /**
     * Set the audio destination node to something other than the default
     * output. This allows for inserting custom WebAudio chains after the
     * sonification.
     * @function Highcharts.Sonification#setAudioDestination
     * @param {AudioDestinationNode} audioDestination The destination node
     */
    setAudioDestination(audioDestination) {
        this.audioDestination = audioDestination;
        this.update();
    }
    /**
     * Check if sonification is playing currently
     * @function Highcharts.Sonification#isPlaying
     * @return {boolean} `true` if currently playing, `false` if not
     */
    isPlaying() {
        return !!this.timeline && this.timeline.isPlaying;
    }
    /**
     * Divide timeline into 100 parts of equal time, and play one of them.
     * Can be used for scrubbing navigation.
     * @function Highcharts.Sonification#playSegment
     *
     * @sample highcharts/sonification/scrubbing
     *         Scrubbing with slider
     *
     * @param {number} segment The segment to play, from 0 to 100
     * @param {Highcharts.SonificationChartEventCallback} [onEnd] Callback to call after play completed
     */
    playSegment(segment, onEnd) {
        if (!this.ready(this.playSegment.bind(this, segment, onEnd))) {
            return;
        }
        if (this.timeline) {
            this.timeline.playSegment(segment, onEnd);
        }
    }
    /**
     * Play point(s)/event(s) adjacent to current timeline cursor location.
     * @function Highcharts.Sonification#playAdjacent
     *
     * @sample highcharts/demo/sonification-navigation
     *         Sonification keyboard navigation
     *
     * @param {number} next Pass `true` to play next point, `false` for previous
     * @param {Highcharts.SonificationChartEventCallback} [onEnd]
     * Callback to call after play completed
     * @param {Highcharts.SonificationTimelineFilterCallback} [eventFilter]
     * Filter to apply to the events before finding adjacent to play
     */
    playAdjacent(next, onEnd, eventFilter) {
        if (!this.ready(this.playAdjacent.bind(this, next, onEnd, eventFilter))) {
            return;
        }
        if (this.timeline) {
            const opts = this.chart.options.sonification, onHit = opts && opts.events && opts.events.onBoundaryHit;
            if (!onHit) {
                this.initBoundaryInstrument();
            }
            this.timeline.playAdjacent(next, onEnd, onHit || (() => {
                this.defaultBoundaryHit();
            }), eventFilter);
        }
    }
    /**
     * Play next/previous series, picking the point closest to a prop value
     * from last played point. By default picks the point in the adjacent
     * series with the closest x value as the last played point.
     * @function Highcharts.Sonification#playAdjacentSeries
     *
     * @sample highcharts/demo/sonification-navigation
     *         Sonification keyboard navigation
     *
     * @param {number} next Pass `true` to play next series, `false` for previous
     * @param {string} [prop] Prop to find closest value of, defaults to `x`.
     * @param {Highcharts.SonificationChartEventCallback} [onEnd]
     * Callback to call after play completed
     *
     * @return {Highcharts.Series|null} The played series, or `null` if none found
     */
    playAdjacentSeries(next, prop = 'x', onEnd) {
        const lastPlayed = this.getLastPlayedPoint();
        if (lastPlayed) {
            const targetSeriesIx = lastPlayed.series.index + (next ? 1 : -1);
            this.playClosestToProp(prop, lastPlayed[prop], (e) => !!e.relatedPoint &&
                e.relatedPoint.series.index === targetSeriesIx, onEnd);
            return this.chart.series[targetSeriesIx] || null;
        }
        return null;
    }
    /**
     * Play point(s)/event(s) closest to a prop relative to a reference value.
     * @function Highcharts.Sonification#playClosestToProp
     *
     * @param {string} prop Prop to compare.
     * @param {number} targetValue Target value to find closest value of.
     * @param {Highcharts.SonificationTimelineFilterCallback} [targetFilter]
     * Filter to apply to the events before finding closest point(s)
     * @param {Highcharts.SonificationChartEventCallback} [onEnd]
     * Callback to call after play completed
     */
    playClosestToProp(prop, targetValue, targetFilter, onEnd) {
        if (!this.ready(this.playClosestToProp.bind(this, prop, targetValue, targetFilter, onEnd))) {
            return;
        }
        if (this.timeline) {
            const opts = this.chart.options.sonification, onHit = opts && opts.events && opts.events.onBoundaryHit;
            if (!onHit) {
                this.initBoundaryInstrument();
            }
            this.timeline.playClosestToPropValue(prop, targetValue, onEnd, onHit || (() => this.defaultBoundaryHit()), targetFilter);
        }
    }
    /**
     * Get last played point
     * @function Highcharts.Sonification#getLastPlayedPoint
     *
     * @sample highcharts/demo/sonification-navigation
     *         Sonification keyboard navigation
     *
     * @return {Highcharts.Point|null} The point, or null if none
     */
    getLastPlayedPoint() {
        if (this.timeline) {
            return this.timeline.getLastPlayedPoint();
        }
        return null;
    }
    /**
     * Play a note with a specific instrument, and optionally a time offset.
     * @function Highcharts.Sonification#playNote
     *
     * @sample highcharts/sonification/chart-events
     *         Custom notifications
     *
     * @param {Highcharts.SonificationSynthPreset|Highcharts.SynthPatchOptionsObject} instrument
     * The instrument to play. Can be either a string referencing the
     * instrument presets, or an actual SynthPatch configuration.
     * @param {Highcharts.SonificationInstrumentScheduledEventOptionsObject} options
     * Configuration for the instrument event to play.
     * @param {number} [delayMs]
     * Time offset from now, in milliseconds. Defaults to 0.
     */
    playNote(instrument, options, delayMs = 0) {
        if (!this.ready(this.playNote.bind(this, instrument, options))) {
            return;
        }
        const duration = options.noteDuration = options.noteDuration || 500;
        const instr = new SonificationInstrument(this.audioContext, this.audioDestination, {
            synthPatch: instrument,
            capabilities: {
                filters: true,
                tremolo: true,
                pan: true
            }
        });
        instr.scheduleEventAtTime(delayMs / 1000, options);
        setTimeout(() => instr && instr.destroy(), delayMs + duration + 500);
    }
    /**
     * Speak a text string, optionally with a custom speaker configuration
     * @function Highcharts.Sonification#speak
     *
     * @sample highcharts/sonification/chart-events
     *         Custom notifications
     *
     * @param {string} text Text to announce
     * @param {Highcharts.SonificationSpeakerOptionsObject} [speakerOptions]
     * Options for the announcement
     * @param {number} [delayMs]
     * Time offset from now, in milliseconds. Defaults to 0.
     */
    speak(text, speakerOptions, delayMs = 0) {
        const speaker = new SonificationSpeaker(merge({
            language: 'en-US',
            rate: 1.5,
            volume: 0.4
        }, speakerOptions || {}));
        speaker.sayAtTime(delayMs, text);
    }
    /**
     * Cancel current playing audio and reset the timeline.
     * @function Highcharts.Sonification#cancel
     */
    cancel() {
        if (this.timeline) {
            this.timeline.cancel();
        }
        fireEvent(this, 'cancel');
    }
    /**
     * Start download of a MIDI file export of the timeline.
     * @function Highcharts.Sonification#downloadMIDI
     */
    downloadMIDI() {
        if (!this.ready(this.downloadMIDI.bind(this))) {
            return;
        }
        if (this.timeline) {
            this.timeline.reset();
            this.timeline.downloadMIDI();
        }
    }
    /**
     * Implementation of chart.sonify
     * @private
     */
    sonifyChart(resetAfter, onEnd) {
        if (!this.ready(this.sonifyChart.bind(this, resetAfter, onEnd))) {
            return;
        }
        if (this.timeline) {
            this.timeline.reset();
            this.beforePlay();
            this.timeline.play(void 0, void 0, resetAfter, onEnd);
        }
    }
    /**
     * Implementation of series.sonify
     * @private
     */
    sonifySeries(series, resetAfter, onEnd) {
        if (!this.ready(this.sonifySeries.bind(this, series, resetAfter, onEnd))) {
            return;
        }
        if (this.timeline) {
            this.timeline.reset();
            this.beforePlay();
            this.timeline.play((e) => !!e.relatedPoint && e.relatedPoint.series === series, void 0, resetAfter, onEnd);
        }
    }
    /**
     * Implementation of point.sonify
     * @private
     */
    sonifyPoint(point, onEnd) {
        if (!this.ready(this.sonifyPoint.bind(this, point, onEnd))) {
            return;
        }
        if (this.timeline) {
            this.timeline.reset();
            this.beforePlay();
            this.timeline.anchorPlayMoment((e) => e.relatedPoint === point, onEnd);
        }
    }
    /**
     * Set the overall/master volume for the sonification.
     * Usually handled through chart update.
     * @private
     */
    setMasterVolume(vol) {
        if (this.timeline) {
            this.timeline.setMasterVolume(vol);
        }
    }
    /**
     * Destroy the sonification capabilities
     * @private
     */
    destroy() {
        this.unbindKeydown();
        if (this.timeline) {
            this.timeline.destroy();
            delete this.timeline;
        }
        if (this.boundaryInstrument) {
            this.boundaryInstrument.stop();
        }
        if (this.audioContext) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.audioContext.close();
            delete this.audioContext;
        }
    }
    /**
     * Update the timeline with latest chart changes. Usually handled
     * automatically. Note that the [sonification.updateInterval](https://api.highcharts.com/highcharts/sonification.updateInterval)
     * option can stop updates from happening in rapid succession, including
     * manual calls to this function.
     * @private
     */
    update() {
        const sOpts = this.chart.options && this.chart.options.sonification;
        if (!this.ready(this.update.bind(this)) || !sOpts) {
            return;
        }
        // Don't update too often, it gets performance intensive
        const now = Date.now(), updateInterval = sOpts.updateInterval;
        if (now - this.lastUpdate < updateInterval && !this.forceReady) {
            clearTimeout(this.scheduledUpdate);
            this.scheduledUpdate = setTimeout(this.update.bind(this), updateInterval / 2);
            return;
        }
        const events = sOpts.events || {};
        if (events.beforeUpdate) {
            events.beforeUpdate({ chart: this.chart, timeline: this.timeline });
        }
        this.lastUpdate = now;
        if (this.timeline) {
            this.timeline.destroy();
        }
        if (this.audioContext && this.audioDestination) {
            this.timeline = timelineFromChart(this.audioContext, this.audioDestination, this.chart);
            const sOpts = this.chart.options.sonification;
            this.timeline.setMasterVolume(pick(sOpts && sOpts.masterVolume, 1));
        }
        if (events.afterUpdate) {
            events.afterUpdate({ chart: this.chart, timeline: this.timeline });
        }
    }
    /**
     * Only continue if sonification enabled. If audioContext is
     * suspended, retry up to 20 times with a small delay.
     * @private
     */
    ready(whenReady) {
        if (!this.audioContext ||
            !this.audioDestination ||
            !this.chart.options ||
            this.chart.options.sonification &&
                this.chart.options.sonification.enabled === false) {
            return false;
        }
        if (this.audioContext.state === 'suspended' && !this.forceReady) {
            if (this.retryContextCounter++ < 20) {
                setTimeout(() => {
                    if (this.audioContext &&
                        this.audioContext.state === 'suspended') {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        this.audioContext.resume().then(whenReady);
                    }
                    else {
                        whenReady();
                    }
                }, 5);
            }
            return false;
        }
        this.retryContextCounter = 0;
        return true;
    }
    /**
     * Call beforePlay event handler if exists
     * @private
     */
    beforePlay() {
        const opts = this.chart.options.sonification, beforePlay = opts && opts.events && opts.events.beforePlay;
        if (beforePlay) {
            beforePlay({ chart: this.chart, timeline: this.timeline });
        }
    }
    /**
     * Initialize the builtin boundary hit instrument
     * @private
     */
    initBoundaryInstrument() {
        if (!this.boundaryInstrument) {
            this.boundaryInstrument = new SynthPatch(this.audioContext, merge(InstrumentPresets.chop, { masterVolume: 0.3 }));
            this.boundaryInstrument.startSilently();
            this.boundaryInstrument.connect(this.audioDestination);
        }
    }
    /**
     * The default boundary hit sound
     * @private
     */
    defaultBoundaryHit() {
        if (this.boundaryInstrument) {
            this.boundaryInstrument.playFreqAtTime(0.1, 1, 200);
            this.boundaryInstrument.playFreqAtTime(0.2, 1, 200);
        }
    }
}
(function (Sonification) {
    const composedClasses = [];
    /**
     * Update sonification object on chart.
     * @private
     */
    function updateSonificationEnabled() {
        const sonification = this.sonification, sOptions = this.options && this.options.sonification;
        if (sOptions && sOptions.enabled) {
            if (sonification) {
                sonification.update();
            }
            else {
                this.sonification = new Sonification(this);
                this.sonification.update();
            }
        }
        else if (sonification) {
            sonification.destroy();
            delete this.sonification;
        }
    }
    /**
     * Destroy with chart.
     * @private
     */
    function chartOnDestroy() {
        if (this && this.sonification) {
            this.sonification.destroy();
        }
    }
    /**
     * Update on render
     * @private
     */
    function chartOnRender() {
        if (this.updateSonificationEnabled) {
            this.updateSonificationEnabled();
        }
    }
    /**
     * Update
     * @private
     */
    function chartOnUpdate(e) {
        const newOptions = e.options.sonification;
        if (newOptions) {
            merge(true, this.options.sonification, newOptions);
            chartOnRender.call(this);
        }
    }
    /**
     * Compose
     * @private
     */
    function compose(ChartClass, SeriesClass, PointClass) {
        // Extend chart
        if (composedClasses.indexOf(ChartClass) === -1) {
            composedClasses.push(ChartClass);
            extend(ChartClass.prototype, {
                updateSonificationEnabled,
                sonify: function (onEnd) {
                    if (this.sonification) {
                        this.sonification.sonifyChart(false, onEnd);
                    }
                },
                toggleSonify: function (reset = true, onEnd) {
                    if (!this.sonification) {
                        return;
                    }
                    const timeline = this.sonification.timeline;
                    if (win.speechSynthesis) {
                        win.speechSynthesis.cancel();
                    }
                    if (timeline && this.sonification.isPlaying()) {
                        if (reset) {
                            this.sonification.cancel();
                        }
                        else {
                            timeline.pause();
                        }
                    }
                    else if (timeline && timeline.isPaused) {
                        timeline.resume();
                    }
                    else {
                        this.sonification.sonifyChart(reset, onEnd);
                    }
                }
            });
            addEvent(ChartClass, 'destroy', chartOnDestroy);
            addEvent(ChartClass, 'render', chartOnRender);
            addEvent(ChartClass, 'update', chartOnUpdate);
        }
        // Extend series
        if (composedClasses.indexOf(SeriesClass) === -1) {
            composedClasses.push(SeriesClass);
            SeriesClass.prototype.sonify = function (onEnd) {
                if (this.chart.sonification) {
                    this.chart.sonification.sonifySeries(this, false, onEnd);
                }
            };
        }
        // Extend points
        if (composedClasses.indexOf(PointClass) === -1) {
            composedClasses.push(PointClass);
            PointClass.prototype.sonify = function (onEnd) {
                if (this.series.chart.sonification) {
                    this.series.chart.sonification.sonifyPoint(this, onEnd);
                }
            };
        }
        // Add items to the exporting menu
        const exportingOptions = getOptions().exporting;
        if (exportingOptions &&
            exportingOptions.buttons &&
            exportingOptions.buttons.contextButton.menuItems) {
            exportingOptions.buttons.contextButton.menuItems.push('separator', 'downloadMIDI', 'playAsSound');
        }
    }
    Sonification.compose = compose;
})(Sonification || (Sonification = {}));
// Add default options
merge(true, defaultOptions, defaultSonificationOptions);
/* *
 *
 *  Default Export
 *
 * */
export default Sonification;
/* *
 *
 *  API declarations
 *
 * */
/**
 * Play a sonification of a chart.
 *
 * @function Highcharts.Chart#sonify
 * @param {Highcharts.SonificationChartEventCallback} [onEnd]
 * Callback to call after play completed
 *
 * @requires modules/sonification
 */
/**
 * Play/pause sonification of a chart.
 *
 * @function Highcharts.Chart#toggleSonify
 *
 * @param {boolean} [reset]
 * Reset the playing cursor after play completed. Defaults to `true`.
 * @param {Highcharts.SonificationChartEventCallback} [onEnd]
 * Callback to call after play completed
 *
 * @requires modules/sonification
 */
/**
 * Play a sonification of a series.
 *
 * @function Highcharts.Series#sonify
 * @param {Highcharts.SonificationChartEventCallback} [onEnd]
 * Callback to call after play completed
 *
 * @requires modules/sonification
 */
/**
 * Play a sonification of a point.
 *
 * @function Highcharts.Point#sonify
 * @param {Highcharts.SonificationChartEventCallback} [onEnd]
 * Callback to call after play completed
 *
 * @requires modules/sonification
 */
/**
 * Sonification capabilities for the chart.
 *
 * @name Highcharts.Chart#sonification
 * @type {Highcharts.Sonification|undefined}
 *
 * @requires modules/sonification
 */
/**
 * Collection of Sonification classes and objects.
 * @requires modules/sonification
 * @interface Highcharts.SonificationGlobalObject
 */ /**
* SynthPatch presets
* @name Highcharts.SonificationGlobalObject#InstrumentPresets
* @type {Record<Highcharts.SonificationSynthPreset,Highcharts.SynthPatchOptionsObject>|undefined}
*/ /**
* Musical scale presets
* @name Highcharts.SonificationGlobalObject#Scales
* @type {Highcharts.SonificationScalePresetsObject|undefined}
*/ /**
* SynthPatch class
* @name Highcharts.SonificationGlobalObject#SynthPatch
* @type {Highcharts.SynthPatch|undefined}
*/ /**
* SonificationInstrument class
* @name Highcharts.SonificationGlobalObject#SonificationInstrument
* @type {Highcharts.SonificationInstrument|undefined}
*/ /**
* SonificationSpeaker class
* @name Highcharts.SonificationGlobalObject#SonificationSpeaker
* @type {Highcharts.SonificationSpeaker|undefined}
*/
/**
 * Global Sonification classes and objects.
 *
 * @name Highcharts.sonification
 * @type {Highcharts.SonificationGlobalObject}
 *
 * @requires modules/sonification
 */
(''); // Keep above doclets in JS file
