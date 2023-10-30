/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * Sonification module
 *
 * (c) 2010-2022 Highsoft AS
 * Author: Øystein Moseng
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/sonification', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Extensions/Sonification/Options.js', [], function () {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Default options for sonification.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var Options = {
                /**
                 * Options for configuring sonification and audio charts. Requires the
                 * [sonification module](https://code.highcharts.com/modules/sonification.js)
                 * to be loaded.
                 *
                 * @sample  highcharts/demo/all-instruments
                 *          All predefined instruments
                 * @sample  highcharts/demo/audio-boxplot
                 *          Audio boxplots
                 * @sample  highcharts/demo/plotline-context
                 *          Context tracks
                 * @sample  highcharts/demo/sonification-music
                 *          Musical chart
                 *
                 * @since 11.0.0
                 * @requires     modules/sonification
                 * @optionparent sonification
                 */
                sonification: {
                    /**
                     * Global tracks to add to every series.
                     *
                     * Defined as an array of either instrument or speech tracks,
                     * or a combination.
                     *
                     * @type {Array<*>}
                     * @extends sonification.defaultSpeechOptions
                     * @extends sonification.defaultInstrumentOptions
                     * @apioption sonification.globalTracks
                     */
                    /**
                     * Rate mapping for speech tracks.
                     * @extends sonification.defaultSpeechOptions.mapping.rate
                     * @apioption sonification.globalTracks.mapping.rate
                     */
                    /**
                     * Text mapping for speech tracks.
                     * @extends sonification.defaultSpeechOptions.mapping.text
                     * @apioption sonification.globalTracks.mapping.text
                     */
                    /**
                     * Context tracks to add globally, an array of either instrument
                     * tracks, speech tracks, or a mix.
                     *
                     * Context tracks are not tied to data points, but play at a set
                     * interval - either based on time or on prop values.
                     *
                     * @sample  highcharts/demo/plotline-context
                     *          Using contexts
                     * @type {Array<*>}
                     * @extends sonification.globalTracks
                     * @apioption sonification.globalContextTracks
                     */
                    /**
                     * Set a context track to play periodically every `timeInterval`
                     * milliseconds while the sonification is playing.
                     *
                     * @sample  highcharts/demo/plotline-context
                     *          Using contexts
                     * @type {number}
                     * @apioption sonification.globalContextTracks.timeInterval
                     */
                    /**
                     * Set a context track to play periodically every `valueInterval`
                     * units of a data property `valueProp` while the sonification is
                     * playing.
                     *
                     * For example, setting `valueProp` to `x` and `valueInterval` to 5
                     * will play the context track for every 5th X value.
                     *
                     * The context audio events will be mapped to time according to the
                     * prop value relative to the min/max values for that prop.
                     *
                     * @sample  highcharts/demo/plotline-context
                     *          Using contexts
                     * @type {number}
                     * @apioption sonification.globalContextTracks.valueInterval
                     */
                    /**
                     * The point property to play context for when using `valueInterval`.
                     * @type {string}
                     * @default "x"
                     * @apioption sonification.globalContextTracks.valueProp
                     */
                    /**
                     * How to map context events to time when using the `valueInterval`
                     * option.
                     * @type {"linear"|"logarithmic"}
                     * @default "linear"
                     * @apioption sonification.globalContextTracks.valueMapFunction
                     */
                    /**
                     * Set up event handlers for the sonification
                     * @apioption sonification.events
                     */
                    /**
                     * Called on play.
                     *
                     * A context object is passed to the function, with properties `chart`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onPlay
                     */
                    /**
                     * Called on pause, cancel, or if play is completed.
                     *
                     * A context object is passed to the function, with properties `chart`,
                     * `timeline` and `pointsPlayed`. `pointsPlayed` is an array of `Point`
                     * objects, referencing data points that were related to the audio
                     * events played.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onStop
                     */
                    /**
                     * Called when play is completed.
                     *
                     * A context object is passed to the function, with properties `chart`,
                     * `timeline` and `pointsPlayed`. `pointsPlayed` is an array of `Point`
                     * objects, referencing data points that were related to the audio
                     * events played.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onEnd
                     */
                    /**
                     * Called immediately when a play is requested.
                     *
                     * A context object is passed to the function, with properties `chart`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.beforePlay
                     */
                    /**
                     * Called before updating the sonification.
                     *
                     * A context object is passed to the function, with properties `chart`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.beforeUpdate
                     */
                    /**
                     * Called after updating the sonification.
                     *
                     * A context object is passed to the function, with properties `chart`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.afterUpdate
                     */
                    /**
                     * Called on the beginning of playing a series.
                     *
                     * A context object is passed to the function, with properties `series`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onSeriesStart
                     */
                    /**
                     * Called when finished playing a series.
                     *
                     * A context object is passed to the function, with properties `series`
                     * and `timeline`.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onSeriesEnd
                     */
                    /**
                     * Called when attempting to play an adjacent point or series, and
                     * there is none.
                     *
                     * By default a percussive sound is played.
                     *
                     * A context object is passed to the function, with properties `chart`,
                     * `timeline`, and `attemptedNext`. `attemptedNext` is a boolean
                     * property that is `true` if the boundary hit was from trying to play
                     * the next series/point, and `false` if it was from trying to play the
                     * previous.
                     *
                     * @type {Function}
                     * @apioption sonification.events.onBoundaryHit
                     */
                    /**
                     * Enable sonification functionality for the chart.
                     */
                    enabled: true,
                    /**
                     * The total duration of the sonification, in milliseconds.
                     */
                    duration: 6000,
                    /**
                     * The time to wait in milliseconds after each data series when playing
                     * the series one after the other.
                     * @see [order](#sonification.order)
                     * @sample  highcharts/sonification/chart-earcon
                     *          Notification after series
                     */
                    afterSeriesWait: 700,
                    /**
                     * How long to wait between each recomputation of the sonification, if
                     * the chart updates rapidly. This avoids slowing down processes like
                     * panning. Given in milliseconds.
                     */
                    updateInterval: 200,
                    /**
                     * Overall/master volume for the sonification, from 0 to 1.
                     */
                    masterVolume: 0.7,
                    /**
                     * What order to play the data series in, either `sequential` where
                     * the series play individually one after the other, or `simultaneous`
                     * where the series play all at once.
                     * @sample  highcharts/sonification/chart-simultaneous
                     *          Simultaneous sonification
                     * @type  {"sequential"|"simultaneous"}
                     */
                    order: 'sequential',
                    /**
                     * Show tooltip as the chart plays.
                     *
                     * Note that if multiple tracks that play at different times try to
                     * show the tooltip, it can be glitchy, so it is recommended in
                     * those cases to turn this on/off for individual tracks using the
                     * [showPlayMarker](#plotOptions.series.sonification.tracks.showPlayMarker)
                     * option.
                     *
                     * @see [showCrosshair](#sonification.showCrosshair)
                     */
                    showTooltip: true,
                    /**
                     * Show X and Y axis crosshairs (if they exist) as the chart plays.
                     *
                     * Note that if multiple tracks that play at different times try to
                     * show the crosshairs, it can be glitchy, so it is recommended in
                     * those cases to turn this on/off for individual tracks using the
                     * [showPlayMarker](#plotOptions.series.sonification.tracks.showPlayMarker)
                     * option.
                     *
                     * @see [showTooltip](#sonification.showTooltip)
                     * @see [crosshair](#xAxis.crosshair)
                     */
                    showCrosshair: true,
                    /**
                     * Options for grouping data points together when sonifying. This
                     * allows for the visual presentation to contain more points than what
                     * is being played. If not enabled, all visible / uncropped points are
                     * played.
                     *
                     * @see [series.cropThreshold](#plotOptions.series.cropThreshold)
                     */
                    pointGrouping: {
                        /**
                         * Whether or not to group points
                         */
                        enabled: true,
                        /**
                         * The size of each group in milliseconds. Audio events closer than
                         * this are grouped together.
                         */
                        groupTimespan: 15,
                        /**
                         * The grouping algorithm, deciding which points to keep when
                         * grouping a set of points together. By default `"minmax"` is
                         * used, which keeps both the minimum and maximum points.
                         *
                         * The other algorithms will either keep the first point in the
                         * group (time wise), last point, middle point, or both the first
                         * and the last point.
                         *
                         * The timing of the resulting point(s) is then adjusted to play
                         * evenly, regardless of its original position within the group.
                         *
                         * @type {"minmax"|"first"|"last"|"middle"|"firstlast"}
                         */
                        algorithm: 'minmax',
                        /**
                         * The data property for each point to compare when deciding which
                         * points to keep in the group.
                         *
                         * By default it is "y", which means that if the `"minmax"`
                         * algorithm is used, the two points the group with the lowest and
                         * highest `y` value will be kept, and the others not played.
                         */
                        prop: 'y'
                    },
                    /**
                     * Default sonification options for all instrument tracks.
                     *
                     * If specific options are also set on individual tracks or per
                     * series, those will override these options.
                     *
                     * @sample  highcharts/sonification/point-sonify
                     *          Sonify points on click
                     */
                    defaultInstrumentOptions: {
                        /**
                         * Round pitch mapping to musical notes.
                         *
                         * If `false`, will play the exact mapped note, even if it is out
                         * of tune compared to the musical notes as defined by 440Hz
                         * standard tuning.
                         */
                        roundToMusicalNotes: true,
                        /**
                         * Type of track. Always `"instrument"` for instrument tracks, and
                         * `"speech"` for speech tracks.
                         *
                         * @declare    Highcharts.SonifcationTypeValue
                         * @type       {string}
                         * @default    instrument
                         * @validvalue ["instrument","speech"]
                         * @apioption  sonification.defaultInstrumentOptions.type
                         */
                        /**
                         * Show play marker (tooltip and/or crosshair) for a track.
                         * @type {boolean}
                         * @default true
                         * @apioption sonification.defaultInstrumentOptions.showPlayMarker
                         */
                        /**
                         * Name to use for a track when exporting to MIDI.
                         * By default it uses the series name if the track is related to
                         * a series.
                         * @type {string}
                         * @apioption sonification.defaultInstrumentOptions.midiName
                         */
                        /**
                         * Options for point grouping, specifically for instrument tracks.
                         * @extends sonification.pointGrouping
                         * @apioption sonification.defaultInstrumentOptions.pointGrouping
                         */
                        /**
                         * Define a condition for when a track should be active and not.
                         *
                         * Can either be a function callback or a configuration object.
                         *
                         * If a function is used, it should return a `boolean` for whether
                         * or not the track should be active. The function is called for
                         * each audio event, and receives a parameter object with `time`,
                         * and potentially `point` and `value` properties depending on the
                         * track. `point` is available if the audio event is related to a
                         * data point. `value` is available if the track is used as a
                         * context track, and `valueInterval` is used.
                         *
                         * @sample  highcharts/sonification/mapping-zones
                         *          Mapping zones
                         * @type {Function|object}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen
                         */
                        /**
                         * Track is only active when `prop` is above or at this value.
                         * @type {number}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen.min
                         */
                        /**
                         * Track is only active when `prop` is below or at this value.
                         * @type {number}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen.max
                         */
                        /**
                         * Track is only active when `prop` was below, and is now at or
                         * above this value.
                         *
                         * If both `crossingUp` and `crossingDown` are defined, the track
                         * is active if either condition is met.
                         * @type {number}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen.crossingUp
                         */
                        /**
                         * Track is only active when `prop` was above, and is now at or
                         * below this value.
                         *
                         * If both `crossingUp` and `crossingDown` are defined, the track
                         * is active if either condition is met.
                         * @type {number}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen.crossingDown
                         */
                        /**
                         * The point property to compare, for example `y` or `x`.
                         * @type {string}
                         * @apioption sonification.defaultInstrumentOptions.activeWhen.prop
                         */
                        /**
                         * Instrument to use for playing.
                         *
                         * Can either be a string referencing a synth preset, or it can be
                         * a synth configuration object.
                         *
                         * @sample  highcharts/demo/all-instruments
                         *          Overview of available presets
                         * @sample  highcharts/sonification/custom-instrument
                         *          Custom instrument
                         *
                         * @type {string|Highcharts.SynthPatchOptionsObject}
                         */
                        instrument: 'piano',
                        /**
                         * Mapping options for the audio parameters.
                         *
                         * All parameters can be either:
                         *  - A string, referencing a point property to map to.
                         *  - A number, setting the value of the audio parameter directly.
                         *  - A callback function, returning the value programmatically.
                         *  - An object defining detailed configuration of the mapping.
                         *
                         * If a function is used, it should return the desired value for
                         * the audio parameter. The function is called for each audio event
                         * to be played, and receives a context object parameter with
                         * `time`, and potentially `point` and `value` depending on the
                         * track. `point` is available if the audio event is related to a
                         * data point, and `value` is available if the track is used for a
                         * context track using `valueInterval`.
                         *
                         * @sample  highcharts/sonification/mapping-overview
                         *          Overview of common mapping parameters
                         * @sample  highcharts/sonification/pitch-mapping
                         *          Various types of mapping used
                         * @sample  highcharts/sonification/polarity-invert
                         *          Inverted mapping to property
                         * @sample  highcharts/sonification/log-mapping
                         *          Logarithmic mapping to property
                         */
                        mapping: {
                            /**
                             * The volume of notes, from 0 to 1.
                             * @default 1
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.volume
                             */
                            /**
                             * Frequency in Hertz of notes. Overrides pitch mapping if set.
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.frequency
                             */
                            /**
                             * Milliseconds to wait before playing, comes in addition to
                             * the time determined by the `time` mapping.
                             *
                             * Can also be negative to play before the mapped time.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.playDelay
                             */
                            /**
                             * Mapping options for tremolo effects.
                             *
                             * Tremolo is repeated changes of volume over time.
                             *
                             * @apioption sonification.defaultInstrumentOptions.mapping.tremolo
                             */
                            /**
                             * Map to tremolo depth, from 0 to 1.
                             *
                             * This determines the intensity of the tremolo effect, how
                             * much the volume changes.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.tremolo.depth
                             */
                            /**
                             * Map to tremolo speed, from 0 to 1.
                             *
                             * This determines the speed of the tremolo effect, how fast
                             * the volume changes.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.tremolo.speed
                             */
                            /**
                             * Mapping options for the lowpass filter.
                             *
                             * A lowpass filter lets low frequencies through, but stops high
                             * frequencies, making the sound more dull.
                             *
                             * @apioption sonification.defaultInstrumentOptions.mapping.lowpass
                             */
                            /**
                             * Map to filter frequency in Hertz from 1 to 20,000Hz.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.lowpass.frequency
                             */
                            /**
                             * Map to filter resonance in dB. Can be negative to cause a
                             * dip, or positive to cause a bump.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultInstrumentOptions.mapping.lowpass.resonance
                             */
                            /**
                             * Mapping options for the highpass filter.
                             *
                             * A highpass filter lets high frequencies through, but stops
                             * low frequencies, making the sound thinner.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.lowpass
                             * @apioption sonification.defaultInstrumentOptions.mapping.highpass
                             */
                            /**
                             * Time mapping determines what time each point plays. It is
                             * defined as an offset in milliseconds, where 0 means it
                             * plays immediately when the chart is sonified.
                             *
                             * By default time is mapped to `x`, meaning points with the
                             * lowest `x` value plays first, and points with the highest
                             * `x` value plays last.
                             *
                             * Can be set to a fixed value, a prop to map to, a function,
                             * or a mapping object.
                             *
                             * @sample  highcharts/sonification/point-play-time
                             *          Play points in order of Y value
                             * @default "x"
                             * @type {string|number|Function|object}
                             */
                            time: 'x',
                            /**
                             * A point property to map the mapping parameter to.
                             *
                             * A negative sign `-` can be placed before the property name
                             * to make mapping inverted.
                             *
                             * @sample  highcharts/sonification/polarity-invert
                             *          Inverted mapping to property
                             * @type {string}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.mapTo
                             */
                            /**
                             * The minimum value for the audio parameter. This is the
                             * lowest value the audio parameter will be mapped to.
                             * @type {number}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.min
                             */
                            /**
                             * The maximum value for the audio parameter. This is the
                             * highest value the audio parameter will be mapped to.
                             * @type {number}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.max
                             */
                            /**
                             * What data values to map the parameter within.
                             *
                             * Mapping within `"series"` will make the lowest value point
                             * in the series map to the min audio parameter value, and the
                             * highest value will map to the max audio parameter.
                             *
                             * Mapping within `"chart"` will make the lowest value point in
                             * the whole chart map to the min audio parameter value, and
                             * the highest value in the whole chart will map to the max
                             * audio parameter.
                             *
                             * You can also map within the X or Y axis of each series.
                             *
                             * @sample  highcharts/sonification/mapping-within
                             *          Mapping within demonstrated
                             * @type {"chart"|"series"|"xAxis"|"yAxis"}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.within
                             */
                            /**
                             * How to perform the mapping.
                             * @sample  highcharts/sonification/log-mapping
                             *          Logarithmic mapping to property
                             * @type {"linear"|"logarithmic"}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.mapFunction
                             */
                            /**
                             * A fixed value to use for the prop when mapping.
                             *
                             * For example, if mapping to `y`, setting value to `4` will
                             * map as if all points had a y value of 4.
                             *
                             * @sample  highcharts/demo/plotline-context
                             *          Map to fixed y value
                             * @type {number}
                             * @apioption sonification.defaultInstrumentOptions.mapping.time.value
                             */
                            /**
                             * Pan refers to the stereo panning position of the sound.
                             * It is defined from -1 (left) to 1 (right).
                             *
                             * By default it is mapped to `x`, making the sound move from
                             * left to right as the chart plays.
                             *
                             * Can be set to a fixed value, a prop to map to, a function,
                             * or a mapping object.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @default "x"
                             */
                            pan: 'x',
                            /**
                             * Note duration determines for how long a note plays, in
                             * milliseconds.
                             *
                             * It only affects instruments that are able to play
                             * continuous sustained notes. Examples of these instruments
                             * from the presets include `flute`, `saxophone`, `trumpet`,
                             * `sawsynth`, `wobble`, `basic1`, `basic2`, `sine`,
                             * `sineGlide`, `triangle`, `square`, `sawtooth`, `noise`,
                             * `filteredNoise`, and `wind`.
                             *
                             * Can be set to a fixed value, a prop to map to, a function,
                             * or a mapping object.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @default 200
                             */
                            noteDuration: 200,
                            /**
                             * Musical pitch refers to how high or low notes are played.
                             *
                             * By default it is mapped to `y` so low `y` values are played
                             * with a lower pitch, and high values are played with a higher
                             * pitch.
                             *
                             * Pitch mapping has a few extra features compared to other
                             * audio parameters.
                             *
                             * Firstly, it accepts not only number values, but also string
                             * values denoting note names. These are given in the form
                             * `<note><octave>`, for example `"c6"` or `"F#2"`.
                             *
                             * Secondly, it is possible to map pitch to an array of notes.
                             * In this case, the `[gapBetweenNotes](#sonification.defaultInstrumentOptions.mapping.gapBetweenNotes)`
                             * mapping determines the delay between these notes.
                             *
                             * Thirdly, it is possible to define a musical scale to follow
                             * when mapping.
                             *
                             * Can be set to a fixed value, an array, a prop to map to, a
                             * function, or a mapping object.
                             *
                             * @sample  highcharts/sonification/pitch-mapping
                             *          Various types of mapping used
                             * @sample  highcharts/sonification/polarity-invert
                             *          Inverted mapping to property
                             * @sample  highcharts/sonification/log-mapping
                             *          Logarithmic mapping to property
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @type {string|number|Function|object|Array<string|number>}
                             */
                            pitch: {
                                mapTo: 'y',
                                min: 'c2',
                                max: 'c6',
                                within: 'yAxis'
                            },
                            /**
                             * Map pitches to a musical scale. The scale is defined as an
                             * array of semitone offsets from the root note.
                             *
                             * @sample  highcharts/sonification/all-scales
                             *          Predefined scale presets
                             * @type {Array<number>}
                             * @apioption sonification.defaultInstrumentOptions.mapping.pitch.scale
                             */
                            /**
                             * Gap in milliseconds between notes if pitch is mapped to an
                             * array of notes.
                             *
                             * Can be set to a fixed value, a prop to map to, a function,
                             * or a mapping object.
                             *
                             * @sample  maps/demo/audio-map
                             *          Mapping to gap between notes
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @default 100
                             */
                            gapBetweenNotes: 100
                        }
                    },
                    /**
                     * Default sonification options for all speech tracks.
                     *
                     * If specific options are also set on individual tracks or per
                     * series, those will override these options.
                     *
                     * @sample  highcharts/sonification/speak-values
                     *          Speak values
                     * @extends sonification.defaultInstrumentOptions
                     * @excluding roundToMusicalNotes, midiName, instrument
                     */
                    defaultSpeechOptions: {
                        /**
                         * Type of track. Always `"instrument"` for instrument tracks, and
                         * `"speech"` for speech tracks.
                         *
                         * @declare    Highcharts.SonifcationTypeValue
                         * @type       {string}
                         * @default    speech
                         * @validvalue ["instrument","speech"]
                         * @apioption  sonification.defaultSpeechOptions.type
                         */
                        /**
                         * Name of the voice synthesis to prefer for speech tracks.
                         *
                         * If not available, falls back to the default voice for the
                         * selected language.
                         *
                         * Different platforms provide different voices for web speech
                         * synthesis.
                         *
                         * @type {string}
                         * @apioption sonification.defaultSpeechOptions.preferredVoice
                         */
                        /**
                         * The language to speak in for speech tracks, as an IETF BCP 47
                         * language tag.
                         *
                         * @sample  maps/demo/audio-map
                         *          French language speech
                         */
                        language: 'en-US',
                        /**
                         * Mapping configuration for the speech/audio parameters.
                         *
                         * All parameters except `text` can be either:
                         *  - A string, referencing a point property to map to.
                         *  - A number, setting the value of the speech parameter directly.
                         *  - A callback function, returning the value programmatically.
                         *  - An object defining detailed configuration of the mapping.
                         *
                         * If a function is used, it should return the desired value for
                         * the speech parameter. The function is called for each speech
                         * event to be played, and receives a context object parameter with
                         * `time`, and potentially `point` and `value` depending on the
                         * track. `point` is available if the audio event is related to a
                         * data point, and `value` is available if the track is used for a
                         * context track using `valueInterval`.
                         *
                         * @extends sonification.defaultInstrumentOptions.mapping
                         * @excluding frequency, gapBetweenNotes, highpass, lowpass, tremolo,
                         *  noteDuration, pan
                         * @apioption sonification.defaultSpeechOptions.mapping
                         */
                        mapping: {
                            /**
                             * Milliseconds to wait before playing, comes in addition to
                             * the time determined by the `time` mapping.
                             *
                             * Can also be negative to play before the mapped time.
                             *
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @apioption sonification.defaultSpeechOptions.mapping.playDelay
                             */
                            /**
                             * Speech pitch (how high/low the voice is) multiplier.
                             * @sample  highcharts/sonification/speak-values
                             *          Speak values
                             * @default 1
                             * @type {string|number|Function|object}
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @excluding scale
                             * @apioption sonification.defaultSpeechOptions.mapping.pitch
                             */
                            /**
                             * @default undefined
                             * @apioption sonification.defaultSpeechOptions.mapping.pitch.mapTo
                             */
                            /**
                             * @default undefined
                             * @apioption sonification.defaultSpeechOptions.mapping.pitch.min
                             */
                            /**
                             * @default undefined
                             * @apioption sonification.defaultSpeechOptions.mapping.pitch.max
                             */
                            /**
                             * @default undefined
                             * @apioption sonification.defaultSpeechOptions.mapping.pitch.within
                             */
                            /**
                             * The text to announce for speech tracks. Can either be a
                             * format string or a function.
                             *
                             * If it is a function, it should return the format string to
                             * announce. The function is called for each audio event, and
                             * receives a parameter object with `time`, and potentially
                             * `point` and `value` properties depending on the track.
                             * `point` is available if the audio event is related to a data
                             * point. `value` is available if the track is used as a
                             * context track, and `valueInterval` is used.
                             *
                             * If it is a format string, in addition to normal string
                             * content, format values can be accessed using bracket
                             * notation. For example `"Value is {point.y}%"`.
                             *
                             * `time`, `point` and `value` are available to the format
                             * strings similarly to with functions. Nested properties can
                             * be accessed with dot notation, for example
                             * `"Density: {point.options.custom.density}"`
                             *
                             * @sample  highcharts/sonification/speak-values
                             *          Speak values
                             * @type {string|Function}
                             * @apioption sonification.defaultSpeechOptions.mapping.text
                             */
                            /**
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @default "x"
                             */
                            time: 'x',
                            /**
                             * Speech rate (speed) multiplier.
                             * @extends sonification.defaultInstrumentOptions.mapping.time
                             * @default 1.3
                             */
                            rate: 1.3,
                            /**
                             * Volume of the speech announcement.
                             * @extends sonification.defaultInstrumentOptions.mapping.volume
                             * @default 0.4
                             */
                            volume: 0.4
                        },
                        pointGrouping: {
                            algorithm: 'last'
                        }
                    }
                },
                exporting: {
                    menuItemDefinitions: {
                        downloadMIDI: {
                            textKey: 'downloadMIDI',
                            onclick: function () {
                                if (this.sonification) {
                                    this.sonification.downloadMIDI();
                            }
                        }
                    },
                    playAsSound: {
                        textKey: 'playAsSound',
                        onclick: function () {
                            var s = this.sonification;
                            if (s && s.isPlaying()) {
                                s.cancel();
                            }
                            else {
                                this.sonify();
                            }
                        }
                    }
                }
            },
            /**
             * @optionparent lang
             * @private
             */
            lang: {
                /**
                 * The text for the MIDI download menu item in the export menu.
                 * @requires modules/sonification
                 * @since 11.0.0
                 */
                downloadMIDI: 'Download MIDI',
                /**
                 * The text for the Play as sound menu item in the export menu.
                 * @requires modules/sonification
                 * @since 11.0.0
                 */
                playAsSound: 'Play as sound'
            }
        };
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * Sonification/audio chart options for a series.
         *
         * @since 11.0.0
         * @requires   modules/sonification
         * @apioption  plotOptions.series.sonification
         */
        /**
         * Whether or not sonification is enabled for this series.
         * @type {boolean}
         * @default true
         * @apioption  plotOptions.series.sonification.enabled
         */
        /**
         * Context tracks for this series. Context tracks are tracks that are not
         * tied to data points.
         *
         * Given as an array of instrument tracks, speech tracks, or a mix of both.
         *
         * @type {Array<*>}
         * @extends sonification.globalContextTracks
         * @apioption  plotOptions.series.sonification.contextTracks
         */
        /**
         * Tracks for this series.
         *
         * Given as an array of instrument tracks, speech tracks, or a mix of both.
         *
         * @type {Array<*>}
         * @extends sonification.globalTracks
         * @apioption  plotOptions.series.sonification.tracks
         */
        /**
         * Default options for all this series' instrument tracks.
         *
         * @extends sonification.defaultInstrumentOptions
         * @apioption  plotOptions.series.sonification.defaultInstrumentOptions
         */
        /**
         * Default options for all this series' speech tracks.
         *
         * @extends sonification.defaultSpeechOptions
         * @apioption  plotOptions.series.sonification.defaultSpeechOptions
         */
        /**
         * Sonification point grouping options for this series.
         *
         * @extends sonification.pointGrouping
         * @apioption  plotOptions.series.sonification.pointGrouping
         */
        /**
         * Event context object sent to sonification chart events.
         * @requires modules/sonification
         * @interface Highcharts.SonificationChartEventCallbackContext
         */ /**
        * The relevant chart
        * @name Highcharts.SonificationChartEventCallbackContext#chart
        * @type {Highcharts.Chart|undefined}
        */ /**
        * The points that were played, if any
        * @name Highcharts.SonificationChartEventCallbackContext#pointsPlayed
        * @type {Array<Highcharts.Point>|undefined}
        */ /**
        * The playing timeline object with advanced and internal content
        * @name Highcharts.SonificationChartEventCallbackContext#timeline
        * @type {object|undefined}
        */
        /**
         * Event context object sent to sonification series events.
         * @requires modules/sonification
         * @interface Highcharts.SonificationSeriesEventCallbackContext
         */ /**
        * The relevant series
        * @name Highcharts.SonificationSeriesEventCallbackContext#series
        * @type {Highcharts.Series|undefined}
        */ /**
        * The playing timeline object with advanced and internal content
        * @name Highcharts.SonificationSeriesEventCallbackContext#timeline
        * @type {object|undefined}
        */
        /**
         * Callback function for sonification events on chart.
         * @callback Highcharts.SonificationChartEventCallback
         * @param {Highcharts.SonificationChartEventCallbackContext} e Sonification chart event context
         */
        /**
         * Callback function for sonification events on series.
         * @callback Highcharts.SonificationSeriesEventCallback
         * @param {Highcharts.SonificationSeriesEventCallbackContext} e Sonification series event context
         */
        (''); // Keep above doclets in JS file

        return Options;
    });
    _registerModule(_modules, 'Extensions/Sonification/SynthPatch.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Class representing a Synth Patch, used by Instruments in the
         *  sonification.js module.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __assign = (this && this.__assign) || function () {
                __assign = Object.assign || function(t) {
                    for (var s,
            i = 1,
            n = arguments.length; i < n; i++) {
                        s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var clamp = U.clamp,
            defined = U.defined,
            pick = U.pick;
        /**
         * Get the multipler value from a pitch tracked multiplier. The parameter
         * specifies the multiplier at ca 3200Hz. It is 1 at ca 50Hz. In between
         * it is mapped logarithmically.
         * @private
         * @param {number} multiplier The multipler to track.
         * @param {number} freq The current frequency.
         */
        function getPitchTrackedMultiplierVal(multiplier, freq) {
            var a = 0.2414 * multiplier - 0.2414,
                b = (3.5 - 1.7 * multiplier) / 1.8;
            return a * Math.log(freq) + b;
        }
        /**
         * Schedule a mini ramp to volume at time - avoid clicks/pops.
         * @private
         * @param {Object} gainNode The gain node to schedule for.
         * @param {number} time The time in seconds to start ramp.
         * @param {number} vol The volume to ramp to.
         */
        function miniRampToVolAtTime(gainNode, time, vol) {
            gainNode.gain.cancelScheduledValues(time);
            gainNode.gain.setTargetAtTime(vol, time, SynthPatch.stopRampTime / 4);
            gainNode.gain.setValueAtTime(vol, time + SynthPatch.stopRampTime);
        }
        /**
         * Schedule a gain envelope for a gain node.
         * @private
         * @param {Array<Object>} envelope The envelope to schedule.
         * @param {string} type Type of envelope, attack or release.
         * @param {number} time At what time (in seconds) to start envelope.
         * @param {Object} gainNode The gain node to schedule on.
         * @param {number} [volumeMultiplier] Volume multiplier for the envelope.
         */
        function scheduleGainEnvelope(envelope, type, time, gainNode, volumeMultiplier) {
            if (volumeMultiplier === void 0) { volumeMultiplier = 1; }
            var isAtk = type === 'attack',
                gain = gainNode.gain;
            gain.cancelScheduledValues(time);
            if (!envelope.length) {
                miniRampToVolAtTime(gainNode, time, isAtk ? volumeMultiplier : 0);
                return;
            }
            if (envelope[0].t > 1) {
                envelope.unshift({ t: 0, vol: isAtk ? 0 : 1 });
            }
            envelope.forEach(function (ep, ix) {
                var prev = envelope[ix - 1], delta = prev ? (ep.t - prev.t) / 1000 : 0, startTime = time + (prev ? prev.t / 1000 + SynthPatch.stopRampTime : 0);
                gain.setTargetAtTime(ep.vol * volumeMultiplier, startTime, Math.max(delta, SynthPatch.stopRampTime) / 2);
            });
        }
        /**
         * Internal class used by Oscillator, representing a Pulse Oscillator node.
         * Combines two sawtooth oscillators to create a pulse by phase inverting and
         * delaying one of them.
         * @class
         * @private
         */
        var PulseOscNode = /** @class */ (function () {
                function PulseOscNode(context, options) {
                    this.pulseWidth = Math.min(Math.max(0, options.pulseWidth || 0.5));
                var makeOsc = function () { return new OscillatorNode(context, {
                        type: 'sawtooth',
                        detune: options.detune,
                        frequency: Math.max(1,
                    options.frequency || 350)
                    }); };
                this.sawOscA = makeOsc();
                this.sawOscB = makeOsc();
                this.phaseInverter = new GainNode(context, { gain: -1 });
                this.masterGain = new GainNode(context);
                this.delayNode = new DelayNode(context, {
                    delayTime: this.pulseWidth / this.sawOscA.frequency.value
                });
                this.sawOscA.connect(this.masterGain);
                this.sawOscB.connect(this.phaseInverter);
                this.phaseInverter.connect(this.delayNode);
                this.delayNode.connect(this.masterGain);
            }
            PulseOscNode.prototype.connect = function (destination) {
                this.masterGain.connect(destination);
            };
            // Polymorph with normal osc.frequency API
            PulseOscNode.prototype.getFrequencyFacade = function () {
                var pulse = this;
                return {
                    cancelScheduledValues: function (fromTime) {
                        pulse.sawOscA.frequency.cancelScheduledValues(fromTime);
                        pulse.sawOscB.frequency.cancelScheduledValues(fromTime);
                        pulse.delayNode.delayTime.cancelScheduledValues(fromTime);
                        return pulse.sawOscA.frequency;
                    },
                    setValueAtTime: function (frequency, time) {
                        this.cancelScheduledValues(time);
                        pulse.sawOscA.frequency.setValueAtTime(frequency, time);
                        pulse.sawOscB.frequency.setValueAtTime(frequency, time);
                        pulse.delayNode.delayTime.setValueAtTime(Math.round(10000 * pulse.pulseWidth / frequency) / 10000, time);
                        return pulse.sawOscA.frequency;
                    },
                    setTargetAtTime: function (frequency, time, timeConstant) {
                        this.cancelScheduledValues(time);
                        pulse.sawOscA.frequency
                            .setTargetAtTime(frequency, time, timeConstant);
                        pulse.sawOscB.frequency
                            .setTargetAtTime(frequency, time, timeConstant);
                        pulse.delayNode.delayTime.setTargetAtTime(Math.round(10000 * pulse.pulseWidth / frequency) / 10000, time, timeConstant);
                        return pulse.sawOscA.frequency;
                    }
                };
            };
            PulseOscNode.prototype.getPWMTarget = function () {
                return this.delayNode.delayTime;
            };
            PulseOscNode.prototype.start = function () {
                this.sawOscA.start();
                this.sawOscB.start();
            };
            PulseOscNode.prototype.stop = function (time) {
                this.sawOscA.stop(time);
                this.sawOscB.stop(time);
            };
            return PulseOscNode;
        }());
        /**
         * Internal class used by SynthPatch
         * @class
         * @private
         */
        var Oscillator = /** @class */ (function () {
                function Oscillator(audioContext, options, destination) {
                    this.audioContext = audioContext;
                this.options = options;
                this.fmOscillatorIx = options.fmOscillator;
                this.vmOscillatorIx = options.vmOscillator;
                this.createSoundSource();
                this.createGain();
                this.createFilters();
                this.createVolTracking();
                if (destination) {
                    this.connect(destination);
                }
            }
            // Connect the node tree from destination down to oscillator,
            // depending on which nodes exist. Done automatically unless
            // no destination was passed to constructor.
            Oscillator.prototype.connect = function (destination) {
                [
                    this.lowpassNode,
                    this.highpassNode,
                    this.volTrackingNode,
                    this.vmNode,
                    this.gainNode,
                    this.whiteNoise,
                    this.pulseNode,
                    this.oscNode
                ].reduce(function (prev, cur) {
                    return (cur ?
                        (cur.connect(prev), cur) :
                        prev);
                }, destination);
            };
            Oscillator.prototype.start = function () {
                if (this.oscNode) {
                    this.oscNode.start();
                }
                if (this.whiteNoise) {
                    this.whiteNoise.start();
                }
                if (this.pulseNode) {
                    this.pulseNode.start();
                }
            };
            Oscillator.prototype.stopAtTime = function (time) {
                if (this.oscNode) {
                    this.oscNode.stop(time);
                }
                if (this.whiteNoise) {
                    this.whiteNoise.stop(time);
                }
                if (this.pulseNode) {
                    this.pulseNode.stop(time);
                }
            };
            Oscillator.prototype.setFreqAtTime = function (time, frequency, glideDuration) {
                if (glideDuration === void 0) { glideDuration = 0; }
                var opts = this.options,
                    f = clamp(pick(opts.fixedFrequency,
                    frequency) *
                        (opts.freqMultiplier || 1), 0, 21000),
                    oscTarget = this.getOscTarget(),
                    timeConstant = glideDuration / 5000;
                if (oscTarget) {
                    oscTarget.cancelScheduledValues(time);
                    if (glideDuration && time - (this.lastUpdateTime || -1) > 0.01) {
                        oscTarget.setTargetAtTime(f, time, timeConstant);
                        oscTarget.setValueAtTime(f, time + timeConstant);
                    }
                    else {
                        oscTarget.setValueAtTime(f, time);
                    }
                }
                this.scheduleVolTrackingChange(f, time, glideDuration);
                this.scheduleFilterTrackingChange(f, time, glideDuration);
                this.lastUpdateTime = time;
            };
            // Get target for FM synthesis if another oscillator wants to modulate.
            // Pulse nodes don't do FM, but do PWM instead.
            Oscillator.prototype.getFMTarget = function () {
                return this.oscNode && this.oscNode.detune ||
                    this.whiteNoise && this.whiteNoise.detune ||
                    this.pulseNode && this.pulseNode.getPWMTarget();
            };
            // Get target for volume modulation if another oscillator wants to modulate.
            Oscillator.prototype.getVMTarget = function () {
                return this.vmNode && this.vmNode.gain;
            };
            // Schedule one of the osciallator envelopes at a specified time in
            // seconds (in AudioContext timespace).
            Oscillator.prototype.runEnvelopeAtTime = function (type, time) {
                if (!this.gainNode) {
                    return;
                }
                var env = (type === 'attack' ? this.options.attackEnvelope :
                        this.options.releaseEnvelope) || [];
                scheduleGainEnvelope(env, type, time, this.gainNode, this.options.volume);
            };
            // Cancel any envelopes or frequency changes currently scheduled
            Oscillator.prototype.cancelScheduled = function () {
                if (this.gainNode) {
                    this.gainNode.gain
                        .cancelScheduledValues(this.audioContext.currentTime);
                }
                var oscTarget = this.getOscTarget();
                if (oscTarget) {
                    oscTarget.cancelScheduledValues(0);
                }
                if (this.lowpassNode) {
                    this.lowpassNode.frequency.cancelScheduledValues(0);
                }
                if (this.highpassNode) {
                    this.highpassNode.frequency.cancelScheduledValues(0);
                }
                if (this.volTrackingNode) {
                    this.volTrackingNode.gain.cancelScheduledValues(0);
                }
            };
            // Set the pitch dependent volume to fit some frequency at some time
            Oscillator.prototype.scheduleVolTrackingChange = function (frequency, time, glideDuration) {
                if (this.volTrackingNode) {
                    var v = getPitchTrackedMultiplierVal(this.options.volumePitchTrackingMultiplier || 1,
                        frequency),
                        rampTime = glideDuration ? glideDuration / 1000 :
                            SynthPatch.stopRampTime;
                    this.volTrackingNode.gain.cancelScheduledValues(time);
                    this.volTrackingNode.gain.setTargetAtTime(v, time, rampTime / 5);
                    this.volTrackingNode.gain.setValueAtTime(v, time + rampTime);
                }
            };
            // Set the pitch dependent filter frequency to fit frequency at some time
            Oscillator.prototype.scheduleFilterTrackingChange = function (frequency, time, glideDuration) {
                var opts = this.options,
                    rampTime = glideDuration ? glideDuration / 1000 :
                        SynthPatch.stopRampTime,
                    scheduleFilterTarget = function (filterNode,
                    filterOptions) {
                        var multiplier = getPitchTrackedMultiplierVal(filterOptions.frequencyPitchTrackingMultiplier || 1,
                    frequency),
                    f = clamp((filterOptions.frequency || 1000) * multiplier, 0, 21000);
                    filterNode.frequency.cancelScheduledValues(time);
                    filterNode.frequency.setTargetAtTime(f, time, rampTime / 5);
                    filterNode.frequency.setValueAtTime(f, time + rampTime);
                };
                if (this.lowpassNode && opts.lowpass) {
                    scheduleFilterTarget(this.lowpassNode, opts.lowpass);
                }
                if (this.highpassNode && opts.highpass) {
                    scheduleFilterTarget(this.highpassNode, opts.highpass);
                }
            };
            Oscillator.prototype.createGain = function () {
                var opts = this.options,
                    needsGainNode = defined(opts.volume) ||
                        opts.attackEnvelope && opts.attackEnvelope.length ||
                        opts.releaseEnvelope && opts.releaseEnvelope.length;
                if (needsGainNode) {
                    this.gainNode = new GainNode(this.audioContext, {
                        gain: pick(opts.volume, 1)
                    });
                }
                // We always need VM gain, so make that
                this.vmNode = new GainNode(this.audioContext);
            };
            // Create the oscillator or audio buffer acting as the sound source
            Oscillator.prototype.createSoundSource = function () {
                var opts = this.options,
                    ctx = this.audioContext,
                    frequency = (opts.fixedFrequency || 0) *
                        (opts.freqMultiplier || 1);
                if (opts.type === 'whitenoise') {
                    var bSize = ctx.sampleRate * 2,
                        buffer = ctx.createBuffer(1,
                        bSize,
                        ctx.sampleRate),
                        data = buffer.getChannelData(0);
                    for (var i = 0; i < bSize; ++i) {
                        // More pleasant "white" noise with less variance than -1 to +1
                        data[i] = Math.random() * 1.2 - 0.6;
                    }
                    var wn = this.whiteNoise = ctx.createBufferSource();
                    wn.buffer = buffer;
                    wn.loop = true;
                }
                else if (opts.type === 'pulse') {
                    this.pulseNode = new PulseOscNode(ctx, {
                        detune: opts.detune,
                        pulseWidth: opts.pulseWidth,
                        frequency: frequency
                    });
                }
                else {
                    this.oscNode = new OscillatorNode(ctx, {
                        type: opts.type || 'sine',
                        detune: opts.detune,
                        frequency: frequency
                    });
                }
            };
            // Lowpass/Highpass filters
            Oscillator.prototype.createFilters = function () {
                var opts = this.options;
                if (opts.lowpass && opts.lowpass.frequency) {
                    this.lowpassNode = new BiquadFilterNode(this.audioContext, {
                        type: 'lowpass',
                        Q: opts.lowpass.Q || 1,
                        frequency: opts.lowpass.frequency
                    });
                }
                if (opts.highpass && opts.highpass.frequency) {
                    this.highpassNode = new BiquadFilterNode(this.audioContext, {
                        type: 'highpass',
                        Q: opts.highpass.Q || 1,
                        frequency: opts.highpass.frequency
                    });
                }
            };
            // Gain node used for frequency dependent volume tracking
            Oscillator.prototype.createVolTracking = function () {
                var opts = this.options;
                if (opts.volumePitchTrackingMultiplier &&
                    opts.volumePitchTrackingMultiplier !== 1) {
                    this.volTrackingNode = new GainNode(this.audioContext, {
                        gain: 1
                    });
                }
            };
            // Get the oscillator frequency target
            Oscillator.prototype.getOscTarget = function () {
                return this.oscNode ? this.oscNode.frequency :
                    this.pulseNode && this.pulseNode.getFrequencyFacade();
            };
            return Oscillator;
        }());
        /**
         * The SynthPatch class. This class represents an instance and configuration
         * of the built-in Highcharts synthesizer. It can be used to play various
         * generated sounds.
         *
         * @sample highcharts/sonification/manual-using-synth
         *         Using Synth directly to sonify manually
         * @sample highcharts/sonification/custom-instrument
         *         Using custom Synth options with chart
         *
         * @requires modules/sonification
         *
         * @class
         * @name Highcharts.SynthPatch
         *
         * @param {AudioContext} audioContext
         *        The AudioContext to use.
         * @param {Highcharts.SynthPatchOptionsObject} options
         *        Configuration for the synth.
         */
        var SynthPatch = /** @class */ (function () {
                function SynthPatch(audioContext, options) {
                    var _this = this;
                this.audioContext = audioContext;
                this.options = options;
                this.eqNodes = [];
                this.midiInstrument = options.midiInstrument || 1;
                this.outputNode = new GainNode(audioContext, { gain: 0 });
                this.createEqChain(this.outputNode);
                var inputNode = this.eqNodes.length ?
                        this.eqNodes[0] : this.outputNode;
                this.oscillators = (this.options.oscillators || []).map(function (oscOpts) { return new Oscillator(audioContext, oscOpts, defined(oscOpts.fmOscillator) || defined(oscOpts.vmOscillator) ?
                    void 0 : inputNode); });
                // Now that we have all oscillators, connect the ones
                // that are used for modulation.
                this.oscillators.forEach(function (osc) {
                    var connectTarget = function (targetFunc,
                        targetOsc) {
                            if (targetOsc) {
                                var target = targetOsc[targetFunc]();
                            if (target) {
                                osc.connect(target);
                            }
                        }
                    };
                    if (defined(osc.fmOscillatorIx)) {
                        connectTarget('getFMTarget', _this.oscillators[osc.fmOscillatorIx]);
                    }
                    if (defined(osc.vmOscillatorIx)) {
                        connectTarget('getVMTarget', _this.oscillators[osc.vmOscillatorIx]);
                    }
                });
            }
            /**
             * Start the oscillators, but don't output sound.
             * @function Highcharts.SynthPatch#startSilently
             */
            SynthPatch.prototype.startSilently = function () {
                this.outputNode.gain.value = 0;
                this.oscillators.forEach(function (o) { return o.start(); });
            };
            /**
             * Stop the synth. It can't be started again.
             * @function Highcharts.SynthPatch#stop
             */
            SynthPatch.prototype.stop = function () {
                var curTime = this.audioContext.currentTime,
                    endTime = curTime + SynthPatch.stopRampTime;
                miniRampToVolAtTime(this.outputNode, curTime, 0);
                this.oscillators.forEach(function (o) { return o.stopAtTime(endTime); });
                this.outputNode.disconnect();
            };
            /**
             * Mute sound at time (in seconds).
             * Will still run release envelope. Note: If scheduled multiple times in
             * succession, the release envelope will run, and that could make sound.
             * @function Highcharts.SynthPatch#silenceAtTime
             * @param {number} time Time offset from now, in seconds
             */
            SynthPatch.prototype.silenceAtTime = function (time) {
                if (!time && this.outputNode.gain.value < 0.01) {
                    this.outputNode.gain.value = 0;
                    return; // Skip if not needed
                }
                this.releaseAtTime((time || 0) + this.audioContext.currentTime);
            };
            /**
             * Mute sound immediately.
             * @function Highcharts.SynthPatch#mute
             */
            SynthPatch.prototype.mute = function () {
                this.cancelScheduled();
                miniRampToVolAtTime(this.outputNode, this.audioContext.currentTime, 0);
            };
            /**
             * Play a frequency at time (in seconds).
             * Time denotes when the attack ramp starts. Note duration is given in
             * milliseconds. If note duration is not given, the note plays indefinitely.
             * @function Highcharts.SynthPatch#silenceAtTime
             * @param {number} time Time offset from now, in seconds
             * @param {number} frequency The frequency to play at
             * @param {number|undefined} noteDuration Duration to play, in milliseconds
             */
            SynthPatch.prototype.playFreqAtTime = function (time, frequency, noteDuration) {
                var t = (time || 0) + this.audioContext.currentTime,
                    opts = this.options;
                this.oscillators.forEach(function (o) {
                    o.setFreqAtTime(t, frequency, opts.noteGlideDuration);
                    o.runEnvelopeAtTime('attack', t);
                });
                scheduleGainEnvelope(opts.masterAttackEnvelope || [], 'attack', t, this.outputNode, opts.masterVolume);
                if (noteDuration) {
                    this.releaseAtTime(t + noteDuration / 1000);
                }
            };
            /**
             * Cancel any scheduled actions
             * @function Highcharts.SynthPatch#cancelScheduled
             */
            SynthPatch.prototype.cancelScheduled = function () {
                this.outputNode.gain.cancelScheduledValues(this.audioContext.currentTime);
                this.oscillators.forEach(function (o) { return o.cancelScheduled(); });
            };
            /**
             * Connect the SynthPatch output to an audio node / destination.
             * @function Highcharts.SynthPatch#connect
             * @param {AudioNode} destinationNode The node to connect to.
             * @return {AudioNode} The destination node, to allow chaining.
             */
            SynthPatch.prototype.connect = function (destinationNode) {
                return this.outputNode.connect(destinationNode);
            };
            /**
             * Create nodes for master EQ
             * @private
             */
            SynthPatch.prototype.createEqChain = function (outputNode) {
                var _this = this;
                this.eqNodes = (this.options.eq || []).map(function (eqDef) {
                    return new BiquadFilterNode(_this.audioContext, __assign({ type: 'peaking' }, eqDef));
                });
                // Connect nodes
                this.eqNodes.reduceRight(function (chain, node) {
                    node.connect(chain);
                    return node;
                }, outputNode);
            };
            /**
             * Fade by release envelopes at time
             * @private
             */
            SynthPatch.prototype.releaseAtTime = function (time) {
                var maxReleaseDuration = 0;
                this.oscillators.forEach(function (o) {
                    var env = o.options.releaseEnvelope;
                    if (env && env.length) {
                        maxReleaseDuration = Math.max(maxReleaseDuration, env[env.length - 1].t);
                        o.runEnvelopeAtTime('release', time);
                    }
                });
                var masterEnv = this.options.masterReleaseEnvelope || [];
                if (masterEnv.length) {
                    scheduleGainEnvelope(masterEnv, 'release', time, this.outputNode, this.options.masterVolume);
                    maxReleaseDuration = Math.max(maxReleaseDuration, masterEnv[masterEnv.length - 1].t);
                }
                miniRampToVolAtTime(this.outputNode, time + maxReleaseDuration / 1000, 0);
            };
            SynthPatch.stopRampTime = 0.012; // Ramp time to 0 when stopping sound
            return SynthPatch;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * An EQ filter definition for a low/highpass filter.
         * @requires modules/sonification
         * @interface Highcharts.SynthPatchPassFilter
         */ /**
        * Filter frequency.
        * @name Highcharts.SynthPatchPassFilter#frequency
        * @type {number|undefined}
        */ /**
        * A pitch tracking multiplier similarly to the one for oscillator volume.
        * Affects the filter frequency.
        * @name Highcharts.SynthPatchPassFilter#frequencyPitchTrackingMultiplier
        * @type {number|undefined}
        */ /**
        * Filter resonance bump/dip in dB. Defaults to 0.
        * @name Highcharts.SynthPatchPassFilter#Q
        * @type {number|undefined}
        */
        /**
         * @typedef {Highcharts.Record<"t"|"vol",number>} Highcharts.SynthEnvelopePoint
         * @requires modules/sonification
         */
        /**
         * @typedef {Array<Highcharts.SynthEnvelopePoint>} Highcharts.SynthEnvelope
         * @requires modules/sonification
         */
        /**
         * @typedef {"sine"|"square"|"sawtooth"|"triangle"|"whitenoise"|"pulse"} Highcharts.SynthPatchOscillatorType
         * @requires modules/sonification
         */
        /**
         * Configuration for an oscillator for the synth.
         * @requires modules/sonification
         * @interface Highcharts.SynthPatchOscillatorOptionsObject
         */ /**
        * The type of oscillator. This describes the waveform of the oscillator.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#type
        * @type {Highcharts.SynthPatchOscillatorType|undefined}
        */ /**
        * A volume modifier for the oscillator. Defaults to 1.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#volume
        * @type {number|undefined}
        */ /**
        * A multiplier for the input frequency of the oscillator. Defaults to 1. If
        * this is for example set to 4, an input frequency of 220Hz will cause the
        * oscillator to play at 880Hz.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#freqMultiplier
        * @type {number|undefined}
        */ /**
        * Play a fixed frequency for the oscillator - ignoring input frequency. The
        * frequency multiplier is still applied.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#fixedFrequency
        * @type {number|undefined}
        */ /**
        * Applies a detuning of all frequencies. Set in cents. Defaults to 0.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#detune
        * @type {number|undefined}
        */ /**
        * Width of the pulse waveform. Only applies to "pulse" type oscillators. A
        * width of 0.5 is roughly equal to a square wave. This is the default.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#pulseWidth
        * @type {number|undefined}
        */ /**
        * Index of another oscillator to use as carrier, with this oscillator being
        * used as a volume modulator. The first oscillator in the array has index 0,
        * and so on. This option can be used to produce tremolo effects.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#vmOscillator
        * @type {number|undefined}
        */ /**
        * Index of another oscillator to use as carrier, with this oscillator being
        * used as a frequency modulator. Note: If the carrier is a pulse oscillator,
        * the modulation will be on pulse width instead of frequency, allowing for
        * PWM effects.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#fmOscillator
        * @type {number|undefined}
        */ /**
        * A tracking multiplier used for frequency dependent behavior. For example, by
        * setting the volume tracking multiplier to 0.01, the volume will be lower at
        * higher notes. The multiplier is a logarithmic function, where 1 is at ca
        * 50Hz, and you define the output multiplier for an input frequency around
        * 3.2kHz.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#volumePitchTrackingMultiplier
        * @type {number|undefined}
        */ /**
        * Volume envelope for note attack, specific to this oscillator.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#attackEnvelope
        * @type {Highcharts.SynthEnvelope|undefined}
        */ /**
        * Volume envelope for note release, specific to this oscillator.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#releaseEnvelope
        * @type {Highcharts.SynthEnvelope|undefined}
        */ /**
        * Highpass filter options for the oscillator.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#highpass
        * @type {Highcharts.SynthPatchPassFilter|undefined}
        */ /**
        * Lowpass filter options for the oscillator.
        * @name Highcharts.SynthPatchOscillatorOptionsObject#lowpass
        * @type {Highcharts.SynthPatchPassFilter|undefined}
        */
        /**
         * An EQ filter definition for a bell filter.
         * @requires modules/sonification
         * @interface Highcharts.SynthPatchEQFilter
         */ /**
        * Filter frequency.
        * @name Highcharts.SynthPatchEQFilter#frequency
        * @type {number|undefined}
        */ /**
        * Filter gain. Defaults to 0.
        * @name Highcharts.SynthPatchEQFilter#gain
        * @type {number|undefined}
        */ /**
        * Filter Q. Defaults to 1. Lower numbers mean a wider bell.
        * @name Highcharts.SynthPatchEQFilter#Q
        * @type {number|undefined}
        */
        /**
         * A set of options for the SynthPatch class.
         *
         * @requires modules/sonification
         *
         * @interface Highcharts.SynthPatchOptionsObject
         */ /**
        * Global volume modifier for the synth. Defaults to 1. Note that if the total
        * volume of all oscillators is too high, the browser's audio engine can
        * distort.
        * @name Highcharts.SynthPatchOptionsObject#masterVolume
        * @type {number|undefined}
        */ /**
        * Time in milliseconds to glide between notes. Causes a glissando effect.
        * @name Highcharts.SynthPatchOptionsObject#noteGlideDuration
        * @type {number|undefined}
        */ /**
        * MIDI instrument ID for the synth. Used with MIDI export of Timelines to have
        * tracks open with a similar instrument loaded when imported into other
        * applications. Defaults to 1, "Acoustic Grand Piano".
        * @name Highcharts.SynthPatchOptionsObject#midiInstrument
        * @type {number|undefined}
        */ /**
        * Volume envelope for the overall attack of a note - what happens to the
        * volume when a note first plays. If the volume goes to 0 in the attack
        * envelope, the synth will not be able to play the note continuously/
        * sustained, and the notes will be staccato.
        * @name Highcharts.SynthPatchOptionsObject#masterAttackEnvelope
        * @type {Highcharts.SynthEnvelope|undefined}
        */ /**
        * Volume envelope for the overall release of a note - what happens to the
        * volume when a note stops playing. If the release envelope starts at a higher
        * volume than the attack envelope ends, the volume will first rise to that
        * volume before falling when releasing a note. If the note is released while
        * the attack envelope is still in effect, the attack envelope is interrupted,
        * and the release envelope plays instead.
        * @name Highcharts.SynthPatchOptionsObject#masterReleaseEnvelope
        * @type {Highcharts.SynthEnvelope|undefined}
        */ /**
        * Master EQ filters for the synth, affecting the overall sound.
        * @name Highcharts.SynthPatchOptionsObject#eq
        * @type {Array<Highcharts.SynthPatchEQFilter>|undefined}
        */ /**
        * Array of oscillators to add to the synth.
        * @name Highcharts.SynthPatchOptionsObject#oscillators
        * @type {Array<Highcharts.SynthPatchOscillatorOptionsObject>|undefined}
        */
        (''); // Keep above doclets in JS file

        return SynthPatch;
    });
    _registerModule(_modules, 'Extensions/Sonification/InstrumentPresets.js', [], function () {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Presets for SynthPatch.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var InstrumentPresets = {
                // PIANO ----------------------------
                piano: {
                    masterVolume: 0.45,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.71 },
                        { t: 40,
            vol: 0.79 },
                        { t: 82,
            vol: 0.64 },
                        { t: 147,
            vol: 0.29 },
                        { t: 260,
            vol: 0.15 },
                        { t: 417,
            vol: 0.05 },
                        { t: 589,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            Q: 0.7,
            gain: 6 },
                        { frequency: 450,
            gain: 6 },
                        { frequency: 1300,
            gain: 2 },
                        { frequency: 2600,
            Q: 0.8,
            gain: 8 },
                        { frequency: 3500,
            Q: 0.8,
            gain: 6 },
                        { frequency: 6200,
            Q: 0.8,
            gain: 10 },
                        { frequency: 8000,
            gain: -23 },
                        { frequency: 10000,
            Q: 0.4,
            gain: -12 }
                    ],
                    oscillators: [{
                            type: 'pulse',
                            volume: 0.5,
                            pulseWidth: 0.55,
                            volumePitchTrackingMultiplier: 0.1,
                            lowpass: {
                                frequency: 4.5,
                                frequencyPitchTrackingMultiplier: 900,
                                Q: -2
                            },
                            highpass: { frequency: 270 },
                            attackEnvelope: [{ t: 1,
            vol: 1 }],
                            releaseEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 282,
            vol: 0.64 },
                                { t: 597,
            vol: 0 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 0.8,
                            lowpass: { frequency: 400 },
                            highpass: { frequency: 300 },
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 19,
            vol: 0 }
                            ]
                        }]
                },
                // PLUCKED --------------------------
                plucked: {
                    masterVolume: 0.5,
                    midiInstrument: 25,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.71 },
                        { t: 4,
            vol: 0.71 },
                        { t: 31,
            vol: 0.4 },
                        { t: 109,
            vol: 0.12 },
                        { t: 234,
            vol: 0.04 },
                        { t: 442,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 800,
            gain: -8 },
                        { frequency: 1400,
            Q: 4,
            gain: 4 },
                        { frequency: 1600,
            gain: -14 },
                        { frequency: 2200,
            gain: -8 },
                        { frequency: 3600,
            gain: -2 },
                        { frequency: 6400,
            Q: 2,
            gain: -6 }
                    ],
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.9,
                            volumePitchTrackingMultiplier: 0.6,
                            highpass: { frequency: 100 },
                            lowpass: { frequency: 8000 },
                            releaseEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 315,
            vol: 0.56 },
                                { t: 550,
            vol: 0 }
                            ]
                        }]
                },
                // FLUTE ----------------------------
                flute: {
                    masterVolume: 1.1,
                    midiInstrument: 74,
                    noteGlideDuration: 30,
                    masterAttackEnvelope: [
                        { t: 0,
            vol: 0 },
                        { t: 29,
            vol: 1 },
                        { t: 76,
            vol: 0.48 },
                        { t: 600,
            vol: 0.36 }
                    ],
                    masterReleaseEnvelope: [
                        { t: 1,
            vol: 0.36 },
                        { t: 24,
            vol: 0.15 },
                        { t: 119,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 150,
            Q: 0.6,
            gain: -10 },
                        { frequency: 500,
            gain: 4 },
                        { frequency: 1100,
            gain: -4 },
                        { frequency: 2200,
            gain: -14 },
                        { frequency: 5000,
            gain: 8 },
                        { frequency: 6400,
            gain: 10 },
                        { frequency: 8000,
            gain: 12 },
                        { frequency: 10800,
            gain: 8 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            volume: 1,
                            volumePitchTrackingMultiplier: 0.4,
                            lowpass: {
                                frequency: 12,
                                frequencyPitchTrackingMultiplier: 100
                            },
                            highpass: {
                                frequency: 200
                            }
                        }, {
                            type: 'sine',
                            fixedFrequency: 5,
                            volume: 0.2,
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 48,
            vol: 0 },
                                { t: 225,
            vol: 0.05 },
                                { t: 600,
            vol: 0.77 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 0.13,
                            lowpass: {
                                frequency: 9000,
                                Q: 3
                            },
                            highpass: {
                                frequency: 6000,
                                Q: 3
                            },
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 0,
            vol: 0 },
                                { t: 26,
            vol: 1 },
                                { t: 93,
            vol: 0.8 }
                            ]
                        }]
                },
                // LEAD -----------------------------
                lead: {
                    masterVolume: 1,
                    midiInstrument: 20,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.81 },
                        { t: 98,
            vol: 0.5 },
                        { t: 201,
            vol: 0.18 },
                        { t: 377,
            vol: 0.04 },
                        { t: 586,
            vol: 0 },
                        { t: 586,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            gain: -6 },
                        { frequency: 400,
            gain: -8 },
                        { frequency: 800,
            Q: 0.5,
            gain: -10 },
                        { frequency: 1200,
            gain: 4 },
                        { frequency: 3600,
            gain: -4 },
                        { frequency: 4200,
            gain: -12 },
                        { frequency: 7400,
            gain: -14 },
                        { frequency: 10000,
            gain: 2 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            volume: 1.1,
                            volumePitchTrackingMultiplier: 0.6,
                            lowpass: { frequency: 5000 },
                            highpass: { frequency: 100 }
                        }, {
                            type: 'sawtooth',
                            volume: 0.4,
                            lowpass: { frequency: 7000 },
                            highpass: { frequency: 800,
            Q: 6 },
                            releaseEnvelope: [
                                { t: 0,
            vol: 0.99 },
                                { t: 200,
            vol: 0.83 },
                                { t: 495,
            vol: 0 }
                            ]
                        }]
                },
                // VIBRAPHONE -----------------------
                vibraphone: {
                    masterVolume: 1,
                    midiInstrument: 12,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0 },
                        { t: 10,
            vol: 0.63 },
                        { t: 82,
            vol: 0.64 },
                        { t: 149,
            vol: 0.26 },
                        { t: 600,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            Q: 0.8,
            gain: -12 },
                        { frequency: 400,
            gain: -4 },
                        { frequency: 1600,
            Q: 0.5,
            gain: 6 },
                        { frequency: 2200,
            Q: 0.5,
            gain: 6 },
                        { frequency: 6400,
            gain: 4 },
                        { frequency: 12800,
            gain: 4 }
                    ],
                    oscillators: [{
                            type: 'sine',
                            volume: 1.5,
                            volumePitchTrackingMultiplier: 0.0000001,
                            attackEnvelope: [{ t: 1,
            vol: 1 }],
                            releaseEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 146,
            vol: 0.39 },
                                { t: 597,
            vol: 0 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 0.03,
                            volumePitchTrackingMultiplier: 0.0001,
                            lowpass: {
                                frequency: 900
                            },
                            highpass: {
                                frequency: 800
                            },
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 9,
            vol: 0 }
                            ]
                        }, {
                            type: 'sine',
                            freqMultiplier: 4,
                            volume: 0.15,
                            volumePitchTrackingMultiplier: 0.0001
                        }, {
                            type: 'sine',
                            fixedFrequency: 3,
                            volume: 6,
                            fmOscillator: 0,
                            releaseEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 190,
            vol: 0.41 },
                                { t: 600,
            vol: 0 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 6,
                            volume: 3,
                            fmOscillator: 2
                        }, {
                            type: 'sine',
                            freqMultiplier: 9,
                            volume: 0.0005,
                            volumePitchTrackingMultiplier: 0.0001,
                            releaseEnvelope: [
                                { t: 1,
            vol: 0.97 },
                                { t: 530,
            vol: 0 }
                            ]
                        }]
                },
                // SAXOPHONE ------------------------
                saxophone: {
                    masterVolume: 1,
                    midiInstrument: 67,
                    noteGlideDuration: 10,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.57 },
                        { t: 35,
            vol: 1 },
                        { t: 87,
            vol: 0.84 },
                        { t: 111,
            vol: 0.6 },
                        { t: 296,
            vol: 0.49 },
                        { t: 600,
            vol: 0.58 }
                    ],
                    masterReleaseEnvelope: [
                        { t: 1,
            vol: 0.58 },
                        { t: 47,
            vol: 0.16 },
                        { t: 119,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            gain: -2 },
                        { frequency: 600,
            gain: 2 },
                        { frequency: 800,
            gain: -10 },
                        { frequency: 1100,
            gain: -2 },
                        { frequency: 2200,
            gain: -2 },
                        { frequency: 3500,
            gain: 10 },
                        { frequency: 12800,
            gain: 4 }
                    ],
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.45,
                            volumePitchTrackingMultiplier: 0.06,
                            lowpass: {
                                frequency: 18,
                                frequencyPitchTrackingMultiplier: 200
                            },
                            highpass: {
                                frequency: 300
                            }
                        }, {
                            type: 'whitenoise',
                            fixedFrequency: 1,
                            volume: 0.4,
                            highpass: {
                                frequency: 7000
                            },
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 51,
            vol: 1 },
                                { t: 86,
            vol: 0.84 },
                                { t: 500,
            vol: 0.78 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 4,
                            volume: 2,
                            fmOscillator: 0,
                            attackEnvelope: [
                                { t: 0,
            vol: 0 },
                                { t: 15,
            vol: 0.94 },
                                { t: 79,
            vol: 1 },
                                { t: 172,
            vol: 0.47 },
                                { t: 500,
            vol: 0.26 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 7,
                            volume: 6,
                            fmOscillator: 0,
                            attackEnvelope: [
                                { t: 0,
            vol: 0 },
                                { t: 25,
            vol: 0.99 },
                                { t: 85,
            vol: 0 },
                                { t: 85,
            vol: 0 },
                                { t: 387,
            vol: 0.02 },
                                { t: 511,
            vol: 0.43 },
                                { t: 600,
            vol: 0 }
                            ]
                        }]
                },
                // TRUMPET ------------------------
                trumpet: {
                    masterVolume: 0.3,
                    midiInstrument: 57,
                    noteGlideDuration: 40,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0 },
                        { t: 17,
            vol: 1 },
                        { t: 42,
            vol: 0.85 },
                        { t: 76,
            vol: 1 },
                        { t: 202,
            vol: 0.65 },
                        { t: 226,
            vol: 0.86 },
                        { t: 282,
            vol: 0.63 }
                    ],
                    masterReleaseEnvelope: [
                        { t: 1,
            vol: 0.62 },
                        { t: 34,
            vol: 0.14 },
                        { t: 63,
            vol: 0.21 },
                        { t: 96,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            Q: 0.6,
            gain: 10 },
                        { frequency: 600,
            Q: 0.5,
            gain: 6 },
                        { frequency: 1500,
            Q: 0.7,
            gain: 14 },
                        { frequency: 3200,
            Q: 2,
            gain: 8 },
                        { frequency: 3800,
            Q: 0.8,
            gain: 10 },
                        { frequency: 6200,
            gain: 12 },
                        { frequency: 8400,
            gain: -20 },
                        { frequency: 12800,
            Q: 0.5,
            gain: -18 }
                    ],
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.15,
                            pulseWidth: 0.5,
                            volumePitchTrackingMultiplier: 0.5,
                            lowpass: { frequency: 1900,
            Q: 3 }
                        }, {
                            type: 'sine',
                            fixedFrequency: 6,
                            volume: 0.2,
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 102,
            vol: 0.13 },
                                { t: 556,
            vol: 0.24 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 0.45,
                            highpass: { frequency: 7000,
            Q: 9 },
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 89,
            vol: 0.51 },
                                { t: 577,
            vol: 0.29 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 5.7,
                            volume: 20,
                            fmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 89,
            vol: 1 },
                                { t: 137,
            vol: 0.46 },
                                { t: 283,
            vol: 0.15 },
                                { t: 600,
            vol: 0.28 }
                            ]
                        }]
                },
                // SAWSYNTH --------------------------
                sawsynth: {
                    masterVolume: 0.3,
                    midiInstrument: 51,
                    noteGlideDuration: 40,
                    masterAttackEnvelope: [
                        { t: 0,
            vol: 0.6 },
                        { t: 9,
            vol: 1 },
                        { t: 102,
            vol: 0.48 }
                    ],
                    eq: [{ frequency: 200,
            gain: -6 }],
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.4,
                            volumePitchTrackingMultiplier: 0.3
                        }, {
                            type: 'sawtooth',
                            volume: 0.4,
                            detune: 11,
                            volumePitchTrackingMultiplier: 0.3
                        }, {
                            type: 'sawtooth',
                            volume: 0.4,
                            detune: -11,
                            volumePitchTrackingMultiplier: 0.3
                        }]
                },
                // BASIC1 ---------------------------
                basic1: {
                    masterVolume: 1,
                    noteGlideDuration: 0,
                    masterReleaseEnvelope: [
                        { t: 1,
            vol: 0.36 },
                        { t: 24,
            vol: 0.15 },
                        { t: 119,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 150,
            Q: 0.6,
            gain: -12 },
                        { frequency: 1100,
            gain: -2 },
                        { frequency: 2200,
            gain: -16 },
                        { frequency: 5000,
            gain: 8 },
                        { frequency: 6400,
            gain: 10 },
                        { frequency: 8000,
            gain: 12 },
                        { frequency: 10800,
            gain: 8 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            volume: 1,
                            volumePitchTrackingMultiplier: 0.05,
                            lowpass: { frequency: 17,
            frequencyPitchTrackingMultiplier: 100 },
                            highpass: { frequency: 200 }
                        }, {
                            type: 'whitenoise',
                            volume: 0.04,
                            lowpass: { frequency: 9000,
            Q: 3 },
                            highpass: { frequency: 6000,
            Q: 3 },
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 0,
            vol: 0 },
                                { t: 26,
            vol: 1 },
                                { t: 71,
            vol: 0.73 }
                            ]
                        }]
                },
                // BASIC2 ---------------------------
                basic2: {
                    masterVolume: 0.3,
                    eq: [
                        { frequency: 200,
            Q: 0.7,
            gain: 6 },
                        { frequency: 450,
            gain: 2 },
                        { frequency: 1300,
            gain: -2 },
                        { frequency: 2600,
            Q: 0.8,
            gain: 6 },
                        { frequency: 3500,
            Q: 0.8,
            gain: 6 },
                        { frequency: 6200,
            Q: 0.8,
            gain: 10 },
                        { frequency: 8000,
            gain: -18 },
                        { frequency: 10000,
            Q: 0.4,
            gain: -12 }
                    ],
                    oscillators: [{
                            type: 'pulse',
                            volume: 0.4,
                            pulseWidth: 0.55,
                            volumePitchTrackingMultiplier: 0.1,
                            lowpass: {
                                frequency: 4.5,
                                frequencyPitchTrackingMultiplier: 900,
                                Q: -2
                            },
                            highpass: { frequency: 270 }
                        }]
                },
                // CHORD -------------------------------
                chord: {
                    masterVolume: 1,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.79 },
                        { t: 27,
            vol: 0.86 },
                        { t: 62,
            vol: 0.81 },
                        { t: 150,
            vol: 0.35 },
                        { t: 408,
            vol: 0.04 },
                        { t: 600,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 200,
            gain: -8 },
                        { frequency: 600,
            Q: 2,
            gain: 4 },
                        { frequency: 800,
            gain: -10 },
                        { frequency: 1600,
            gain: -2 },
                        { frequency: 2200,
            gain: -6 },
                        { frequency: 3600,
            Q: 0.7,
            gain: -2 },
                        { frequency: 6400,
            gain: 6 },
                        { frequency: 12800,
            gain: 6 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            volume: 1.1,
                            volumePitchTrackingMultiplier: 0.05,
                            lowpass: { frequency: 8000 },
                            highpass: { frequency: 100 },
                            releaseEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 315,
            vol: 0.56 },
                                { t: 540,
            vol: 0 }
                            ]
                        }, {
                            type: 'triangle',
                            freqMultiplier: 1.17,
                            volume: 0.4,
                            volumePitchTrackingMultiplier: 0.07,
                            lowpass: { frequency: 5000 },
                            highpass: { frequency: 100 },
                            releaseEnvelope: [
                                { t: 0,
            vol: 1 },
                                { t: 476,
            vol: 0 }
                            ]
                        }, {
                            type: 'triangle',
                            freqMultiplier: 1.58333,
                            volume: 0.7,
                            volumePitchTrackingMultiplier: 0.02,
                            highpass: { frequency: 200 },
                            releaseEnvelope: [
                                { t: 0,
            vol: 1 },
                                { t: 422,
            vol: 0.56 },
                                { t: 577,
            vol: 0 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 10,
                            volume: 4,
                            fmOscillator: 0,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 157,
            vol: 0.65 }
                            ]
                        }, {
                            type: 'sine',
                            fixedFrequency: 5,
                            volume: 0.3,
                            vmOscillator: 2,
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 155,
            vol: 0.91 },
                                { t: 289,
            vol: 0.78 }
                            ]
                        }]
                },
                // WOBBLE ---------------------------
                wobble: {
                    masterVolume: 0.9,
                    masterReleaseEnvelope: [
                        { t: 1,
            vol: 0.36 },
                        { t: 24,
            vol: 0.15 },
                        { t: 119,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 150,
            Q: 0.6,
            gain: -12 },
                        { frequency: 1100,
            gain: -2 },
                        { frequency: 2200,
            gain: -16 },
                        { frequency: 5000,
            gain: 8 },
                        { frequency: 6400,
            gain: 10 },
                        { frequency: 8000,
            gain: 12 },
                        { frequency: 10800,
            gain: 8 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            volume: 0.9,
                            volumePitchTrackingMultiplier: 0.1,
                            lowpass: { frequency: 17,
            frequencyPitchTrackingMultiplier: 100 },
                            highpass: { frequency: 200 }
                        }, {
                            type: 'whitenoise',
                            volume: 0.04,
                            lowpass: { frequency: 9000,
            Q: 3 },
                            highpass: { frequency: 6000,
            Q: 3 },
                            vmOscillator: 0,
                            attackEnvelope: [
                                { t: 0,
            vol: 0 },
                                { t: 26,
            vol: 1 },
                                { t: 71,
            vol: 0.73 }
                            ]
                        }, {
                            type: 'sine',
                            freqMultiplier: 0.011,
                            volume: 30,
                            fmOscillator: 0
                        }]
                },
                // SINE -----------------------------
                sine: {
                    masterVolume: 1,
                    oscillators: [{
                            type: 'sine',
                            volumePitchTrackingMultiplier: 0.07
                        }]
                },
                // SINE GLIDE -----------------------
                sineGlide: {
                    masterVolume: 1,
                    noteGlideDuration: 100,
                    oscillators: [{
                            type: 'sine',
                            volumePitchTrackingMultiplier: 0.07
                        }]
                },
                // TRIANGLE -------------------------
                triangle: {
                    masterVolume: 0.5,
                    oscillators: [{
                            type: 'triangle',
                            volume: 1,
                            volumePitchTrackingMultiplier: 0.07
                        }]
                },
                // SAWTOOTH -------------------------
                sawtooth: {
                    masterVolume: 0.25,
                    midiInstrument: 82,
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.3,
                            volumePitchTrackingMultiplier: 0.07
                        }]
                },
                // SQUARE ---------------------------
                square: {
                    masterVolume: 0.3,
                    midiInstrument: 81,
                    oscillators: [{
                            type: 'square',
                            volume: 0.2,
                            volumePitchTrackingMultiplier: 0.07
                        }]
                },
                // PERCUSSION INSTRUMENTS ----------
                chop: {
                    masterVolume: 1,
                    midiInstrument: 116,
                    masterAttackEnvelope: [{ t: 1,
            vol: 1 }, { t: 44,
            vol: 0 }],
                    oscillators: [{
                            type: 'whitenoise',
                            volume: 1,
                            lowpass: { frequency: 600 },
                            highpass: { frequency: 200 }
                        }]
                },
                shaker: {
                    masterVolume: 0.4,
                    midiInstrument: 116,
                    masterAttackEnvelope: [{ t: 1,
            vol: 1 }, { t: 44,
            vol: 0 }],
                    oscillators: [{
                            type: 'whitenoise',
                            volume: 1,
                            lowpass: { frequency: 6500 },
                            highpass: { frequency: 5000 }
                        }]
                },
                step: {
                    masterVolume: 1,
                    midiInstrument: 116,
                    masterAttackEnvelope: [{ t: 1,
            vol: 1 }, { t: 44,
            vol: 0 }],
                    eq: [
                        { frequency: 200,
            gain: -1 },
                        { frequency: 400,
            gain: -14 },
                        { frequency: 800,
            gain: 8 },
                        { frequency: 1000,
            Q: 5,
            gain: -24 },
                        { frequency: 1600,
            gain: 8 },
                        { frequency: 2200,
            gain: -10 },
                        { frequency: 5400,
            gain: 4 },
                        { frequency: 12800,
            gain: -36 }
                    ],
                    oscillators: [{
                            type: 'whitenoise',
                            volume: 1.5,
                            lowpass: { frequency: 300 },
                            highpass: { frequency: 100,
            Q: 6 }
                        }]
                },
                kick: {
                    masterVolume: 0.55,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 0.8 },
                        { t: 15,
            vol: 1 },
                        { t: 45,
            vol: 0.35 },
                        { t: 121,
            vol: 0.11 },
                        { t: 242,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 50,
            gain: 6 },
                        { frequency: 400,
            gain: -18 },
                        { frequency: 1600,
            gain: 18 }
                    ],
                    oscillators: [{
                            type: 'triangle',
                            fixedFrequency: 90,
                            volume: 1,
                            lowpass: { frequency: 300 },
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 6,
            vol: 1 },
                                { t: 45,
            vol: 0.01 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 0.4,
                            lowpass: { frequency: 200 },
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 30,
            vol: 0 }
                            ]
                        }, {
                            type: 'triangle',
                            freqMultiplier: 0.1,
                            volume: 1,
                            lowpass: { frequency: 200 }
                        }]
                },
                shortnote: {
                    masterVolume: 0.8,
                    midiInstrument: 116,
                    masterAttackEnvelope: [
                        { t: 1,
            vol: 1 },
                        { t: 15,
            vol: 0 }
                    ],
                    eq: [
                        { frequency: 400,
            gain: -4 },
                        { frequency: 800,
            gain: -12 },
                        { frequency: 2400,
            gain: 4 },
                        { frequency: 7200,
            gain: -20 },
                        { frequency: 1000,
            Q: 5,
            gain: -12 },
                        { frequency: 5400,
            gain: -32 },
                        { frequency: 12800,
            gain: -14 }
                    ],
                    oscillators: [{
                            type: 'sawtooth',
                            volume: 0.6,
                            lowpass: { frequency: 1000 }
                        }, {
                            type: 'whitenoise',
                            volume: 0.2,
                            lowpass: { frequency: 10000 },
                            highpass: { frequency: 7000 },
                            attackEnvelope: [
                                { t: 1,
            vol: 1 },
                                { t: 10,
            vol: 0 }
                            ]
                        }, {
                            type: 'whitenoise',
                            volume: 1.3,
                            lowpass: { frequency: 700,
            Q: 4 },
                            highpass: { frequency: 250 }
                        }]
                },
                // NOISE ----------------------------
                noise: {
                    masterVolume: 0.3,
                    midiInstrument: 122,
                    oscillators: [{
                            type: 'whitenoise'
                        }]
                },
                // FILTERED NOISE -------------------
                filteredNoise: {
                    masterVolume: 0.3,
                    midiInstrument: 122,
                    eq: [
                        { frequency: 1600,
            gain: -8 },
                        { frequency: 2200,
            gain: -4 }
                    ],
                    oscillators: [{
                            type: 'whitenoise',
                            lowpass: {
                                frequency: 5,
                                frequencyPitchTrackingMultiplier: 1300,
                                Q: 6
                            },
                            highpass: {
                                frequency: 5,
                                frequencyPitchTrackingMultiplier: 300,
                                Q: 6
                            }
                        }]
                },
                // WIND -------------------------------
                wind: {
                    masterVolume: 0.75,
                    midiInstrument: 122,
                    noteGlideDuration: 150,
                    masterReleaseEnvelope: [
                        { t: 0,
            vol: 1 },
                        { t: 124,
            vol: 0.24 },
                        { t: 281,
            vol: 0 }
                    ],
                    oscillators: [{
                            type: 'whitenoise',
                            volume: 1,
                            lowpass: {
                                frequency: 100,
                                frequencyPitchTrackingMultiplier: 6,
                                Q: 23
                            },
                            highpass: {
                                frequency: 170,
                                frequencyPitchTrackingMultiplier: 6
                            }
                        }, {
                            type: 'sine',
                            freqMultiplier: 0.016,
                            volume: 1000,
                            fmOscillator: 0
                        }]
                }
            };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * @typedef {"piano"|"plucked"|"flute"|"lead"|"vibraphone"|"saxophone"|"trumpet"|"sawsynth"|"basic1"|"basic2"|"chord"|"wobble"|"sine"|"sineGlide"|"triangle"|"sawtooth"|"square"|"chop"|"shaker"|"step"|"kick"|"shortnote"|"noise"|"filteredNoise"|"wind"} Highcharts.SonificationSynthPreset
         * @requires modules/sonification
         */
        (''); // Keep above doclets in JS file

        return InstrumentPresets;
    });
    _registerModule(_modules, 'Extensions/Sonification/SonificationInstrument.js', [_modules['Extensions/Sonification/SynthPatch.js'], _modules['Extensions/Sonification/InstrumentPresets.js'], _modules['Core/Utilities.js']], function (SynthPatch, InstrumentPresets, U) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Class representing an Instrument with mappable parameters for sonification.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined,
            extend = U.extend;
        /**
         * The SonificationInstrument class. This class represents an instrument with
         * mapping capabilities. The instrument wraps a SynthPatch object, and extends
         * it with functionality such as panning, tremolo, and global low/highpass
         * filters.
         *
         * @sample highcharts/sonification/instrument-raw
         *         Using SonificationInstrument directly, with no chart.
         *
         * @requires modules/sonification
         *
         * @class
         * @name Highcharts.SonificationInstrument
         *
         * @param {AudioContext} audioContext
         *        The AudioContext to use.
         * @param {AudioNode} outputNode
         *        The destination node to connect to.
         * @param {Highcharts.SonificationInstrumentOptionsObject} options
         *        Configuration for the instrument.
         */
        var SonificationInstrument = /** @class */ (function () {
                function SonificationInstrument(audioContext, outputNode, options) {
                    this.audioContext = audioContext;
                this.curParams = {};
                this.midiTrackName = options.midiTrackName;
                this.masterVolNode = new GainNode(audioContext);
                this.masterVolNode.connect(outputNode);
                this.volumeNode = new GainNode(audioContext);
                this.createNodesFromCapabilities(extend({
                    pan: true
                }, options.capabilities || {}));
                this.connectCapabilityNodes(this.volumeNode, this.masterVolNode);
                this.synthPatch = new SynthPatch(audioContext, typeof options.synthPatch === 'string' ?
                    InstrumentPresets[options.synthPatch] : options.synthPatch);
                this.midiInstrument = this.synthPatch.midiInstrument || 1;
                this.synthPatch.startSilently();
                this.synthPatch.connect(this.volumeNode);
            }
            /**
             * Set the overall volume.
             * @function Highcharts.SonificationInstrument#setMasterVolume
             * @param {number} volume The volume to set, from 0 to 1.
             */
            SonificationInstrument.prototype.setMasterVolume = function (volume) {
                this.masterVolNode.gain.setTargetAtTime(volume, 0, SonificationInstrument.rampTime);
            };
            /**
             * Schedule an instrument event at a given time offset, whether it is
             * playing a note or changing the parameters of the instrument.
             * @function Highcharts.SonificationInstrument#scheduleEventAtTime
             * @param {number} time Time is given in seconds, where 0 is now.
             * @param {Highcharts.SonificationInstrumentScheduledEventOptionsObject} params
             * Parameters for the instrument event.
             */
            SonificationInstrument.prototype.scheduleEventAtTime = function (time, params) {
                var mergedParams = extend(this.curParams,
                    params),
                    freq = defined(params.frequency) ?
                        params.frequency : defined(params.note) ?
                        SonificationInstrument.musicalNoteToFrequency(params.note) :
                        220;
                if (defined(freq)) {
                    this.synthPatch.playFreqAtTime(time, freq, mergedParams.noteDuration);
                }
                if (defined(mergedParams.tremoloDepth) ||
                    defined(mergedParams.tremoloSpeed)) {
                    this.setTremoloAtTime(time, mergedParams.tremoloDepth, mergedParams.tremoloSpeed);
                }
                if (defined(mergedParams.pan)) {
                    this.setPanAtTime(time, mergedParams.pan);
                }
                if (defined(mergedParams.volume)) {
                    this.setVolumeAtTime(time, mergedParams.volume);
                }
                if (defined(mergedParams.lowpassFreq) ||
                    defined(mergedParams.lowpassResonance)) {
                    this.setFilterAtTime('lowpass', time, mergedParams.lowpassFreq, mergedParams.lowpassResonance);
                }
                if (defined(mergedParams.highpassFreq) ||
                    defined(mergedParams.highpassResonance)) {
                    this.setFilterAtTime('highpass', time, mergedParams.highpassFreq, mergedParams.highpassResonance);
                }
            };
            /**
             * Schedule silencing the instrument at a given time offset.
             * @function Highcharts.SonificationInstrument#silenceAtTime
             * @param {number} time Time is given in seconds, where 0 is now.
             */
            SonificationInstrument.prototype.silenceAtTime = function (time) {
                this.synthPatch.silenceAtTime(time);
            };
            /**
             * Cancel currently playing sounds and any scheduled actions.
             * @function Highcharts.SonificationInstrument#cancel
             */
            SonificationInstrument.prototype.cancel = function () {
                this.synthPatch.mute();
                [
                    this.tremoloDepth && this.tremoloDepth.gain,
                    this.tremoloOsc && this.tremoloOsc.frequency,
                    this.lowpassNode && this.lowpassNode.frequency,
                    this.lowpassNode && this.lowpassNode.Q,
                    this.highpassNode && this.highpassNode.frequency,
                    this.highpassNode && this.highpassNode.Q,
                    this.panNode && this.panNode.pan,
                    this.volumeNode.gain
                ].forEach(function (p) { return (p && p.cancelScheduledValues(0)); });
            };
            /**
             * Stop instrument and destroy it, cleaning up used resources.
             * @function Highcharts.SonificationInstrument#destroy
             */
            SonificationInstrument.prototype.destroy = function () {
                this.cancel();
                this.synthPatch.stop();
                if (this.tremoloOsc) {
                    this.tremoloOsc.stop();
                }
                [
                    this.tremoloDepth, this.tremoloOsc, this.lowpassNode,
                    this.highpassNode, this.panNode, this.volumeNode,
                    this.masterVolNode
                ].forEach((function (n) { return n && n.disconnect(); }));
            };
            /**
             * Schedule a pan value at a given time offset.
             * @private
             */
            SonificationInstrument.prototype.setPanAtTime = function (time, pan) {
                if (this.panNode) {
                    this.panNode.pan.setTargetAtTime(pan, time + this.audioContext.currentTime, SonificationInstrument.rampTime);
                }
            };
            /**
             * Schedule a filter configuration at a given time offset.
             * @private
             */
            SonificationInstrument.prototype.setFilterAtTime = function (filter, time, frequency, resonance) {
                var node = this[filter + 'Node'],
                    audioTime = this.audioContext.currentTime + time;
                if (node) {
                    if (defined(resonance)) {
                        node.Q.setTargetAtTime(resonance, audioTime, SonificationInstrument.rampTime);
                    }
                    if (defined(frequency)) {
                        node.frequency.setTargetAtTime(frequency, audioTime, SonificationInstrument.rampTime);
                    }
                }
            };
            /**
             * Schedule a volume value at a given time offset.
             * @private
             */
            SonificationInstrument.prototype.setVolumeAtTime = function (time, volume) {
                if (this.volumeNode) {
                    this.volumeNode.gain.setTargetAtTime(volume, time + this.audioContext.currentTime, SonificationInstrument.rampTime);
                }
            };
            /**
             * Schedule a tremolo configuration at a given time offset.
             * @private
             */
            SonificationInstrument.prototype.setTremoloAtTime = function (time, depth, speed) {
                var audioTime = this.audioContext.currentTime + time;
                if (this.tremoloDepth && defined(depth)) {
                    this.tremoloDepth.gain.setTargetAtTime(depth, audioTime, SonificationInstrument.rampTime);
                }
                if (this.tremoloOsc && defined(speed)) {
                    this.tremoloOsc.frequency.setTargetAtTime(15 * speed, audioTime, SonificationInstrument.rampTime);
                }
            };
            /**
             * Create audio nodes according to instrument capabilities
             * @private
             */
            SonificationInstrument.prototype.createNodesFromCapabilities = function (capabilities) {
                var ctx = this.audioContext;
                if (capabilities.pan) {
                    this.panNode = new StereoPannerNode(ctx);
                }
                if (capabilities.tremolo) {
                    this.tremoloOsc = new OscillatorNode(ctx, {
                        type: 'sine',
                        frequency: 3
                    });
                    this.tremoloDepth = new GainNode(ctx);
                    this.tremoloOsc.connect(this.tremoloDepth);
                    this.tremoloDepth.connect(this.masterVolNode.gain);
                    this.tremoloOsc.start();
                }
                if (capabilities.filters) {
                    this.lowpassNode = new BiquadFilterNode(ctx, {
                        type: 'lowpass',
                        frequency: 20000
                    });
                    this.highpassNode = new BiquadFilterNode(ctx, {
                        type: 'highpass',
                        frequency: 0
                    });
                }
            };
            /**
             * Connect audio node chain from output down to input, depending on which
             * nodes exist.
             * @private
             */
            SonificationInstrument.prototype.connectCapabilityNodes = function (input, output) {
                [
                    this.panNode,
                    this.lowpassNode,
                    this.highpassNode,
                    input
                ].reduce(function (prev, cur) {
                    return (cur ?
                        (cur.connect(prev), cur) :
                        prev);
                }, output);
            };
            /**
             * Get number of notes from C0 from a string like "F#4"
             * @static
             * @private
             */
            SonificationInstrument.noteStringToC0Distance = function (note) {
                // eslint-disable-next-line require-unicode-regexp
                var match = note.match(/^([a-g][#b]?)([0-8])$/i), semitone = match ? match[1] : 'a', wholetone = semitone[0].toLowerCase(), accidental = semitone[1], octave = match ? parseInt(match[2], 10) : 4, accidentalOffset = accidental === '#' ?
                        1 : accidental === 'b' ? -1 : 0;
                return ({
                    c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11
                }[wholetone] || 0) + accidentalOffset + octave * 12;
            };
            /**
             * Convert a note value to a frequency.
             * @static
             * @function Highcharts.SonificationInstrument#musicalNoteToFrequency
             * @param {string|number} note
             * Note to convert. Can be a string 'c0' to 'b8' or a number of semitones
             * from c0.
             * @return {number} The converted frequency
             */
            SonificationInstrument.musicalNoteToFrequency = function (note) {
                var notesFromC0 = typeof note === 'string' ?
                        this.noteStringToC0Distance(note) : note;
                return 16.3516 * Math.pow(2, Math.min(notesFromC0, 107) / 12);
            };
            SonificationInstrument.rampTime = SynthPatch.stopRampTime / 4;
            return SonificationInstrument;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API definitions
         *
         * */
        /**
         * Capabilities configuration for a SonificationInstrument.
         * @requires modules/sonification
         * @interface Highcharts.SonificationInstrumentCapabilitiesOptionsObject
         */ /**
        * Whether or not instrument should be able to pan. Defaults to `true`.
        * @name Highcharts.SonificationInstrumentCapabilitiesOptionsObject#pan
        * @type {boolean|undefined}
        */ /**
        * Whether or not instrument should be able to use tremolo effects. Defaults
        * to `false`.
        * @name Highcharts.SonificationInstrumentCapabilitiesOptionsObject#tremolo
        * @type {boolean|undefined}
        */ /**
        * Whether or not instrument should be able to use filter effects. Defaults
        * to `false`.
        * @name Highcharts.SonificationInstrumentCapabilitiesOptionsObject#filters
        * @type {boolean|undefined}
        */
        /**
         * Configuration for a SonificationInstrument.
         * @requires modules/sonification
         * @interface Highcharts.SonificationInstrumentOptionsObject
         */ /**
        * The synth configuration for the instrument. Can be either a string,
        * referencing the instrument presets, or an actual SynthPatch configuration.
        * @name Highcharts.SonificationInstrumentOptionsObject#synthPatch
        * @type {Highcharts.SonificationSynthPreset|Highcharts.SynthPatchOptionsObject}
        * @sample highcharts/demo/all-instruments
        *      All instrument presets
        * @sample highcharts/sonification/custom-instrument
        *      Custom instrument preset
        */ /**
        * Define additional capabilities for the instrument, such as panning, filters,
        * and tremolo effects.
        * @name Highcharts.SonificationInstrumentOptionsObject#capabilities
        * @type {Highcharts.SonificationInstrumentCapabilitiesOptionsObject|undefined}
        */ /**
        * A track name to use for this instrument in MIDI export.
        * @name Highcharts.SonificationInstrumentOptionsObject#midiTrackName
        * @type {string|undefined}
        */
        /**
         * Options for a scheduled event for a SonificationInstrument
         * @requires modules/sonification
         * @interface Highcharts.SonificationInstrumentScheduledEventOptionsObject
         */ /**
        * Number of semitones from c0, or a note string - such as "c4" or "F#6".
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#note
        * @type {number|string|undefined}
        */ /**
        * Note frequency in Hertz. Overrides note, if both are given.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#frequency
        * @type {number|undefined}
        */ /**
        * Duration to play the note in milliseconds. If not given, the note keeps
        * playing indefinitely
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#noteDuration
        * @type {number|undefined}
        */ /**
        * Depth/intensity of the tremolo effect - which is a periodic change in
        * volume. From 0 to 1.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#tremoloDepth
        * @type {number|undefined}
        */ /**
        * Speed of the tremolo effect, from 0 to 1.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#tremoloSpeed
        * @type {number|undefined}
        */ /**
        * Stereo panning value, from -1 (left) to 1 (right).
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#pan
        * @type {number|undefined}
        */ /**
        * Volume of the instrument, from 0 to 1. Can be set independent of the
        * master/overall volume.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#volume
        * @type {number|undefined}
        */ /**
        * Frequency of the lowpass filter, in Hertz.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#lowpassFreq
        * @type {number|undefined}
        */ /**
        * Resonance of the lowpass filter, in dB. Can be negative for a dip, or
        * positive for a bump.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#lowpassResonance
        * @type {number|undefined}
        */ /**
        * Frequency of the highpass filter, in Hertz.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#highpassFreq
        * @type {number|undefined}
        */ /**
        * Resonance of the highpass filter, in dB. Can be negative for a dip, or
        * positive for a bump.
        * @name Highcharts.SonificationInstrumentScheduledEventOptionsObject#highpassResonance
        * @type {number|undefined}
        */
        (''); // Keep above doclets in JS file

        return SonificationInstrument;
    });
    _registerModule(_modules, 'Extensions/Sonification/SonificationSpeaker.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Class representing a speech synthesis voice.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var pick = U.pick;
        /**
         * The SonificationSpeaker class. This class represents an announcer using
         * speech synthesis. It allows for scheduling speech announcements, as well
         * as speech parameter changes - including rate, volume and pitch.
         *
         * @sample highcharts/demo/sonification-navigation
         *         Demo using SonificationSpeaker directly for some announcements
         *
         * @requires modules/sonification
         *
         * @class
         * @name Highcharts.SonificationSpeaker
         *
         * @param {Highcharts.SonificationSpeakerOptionsObject} options
         *        Configuration for the speaker
         */
        var SonificationSpeaker = /** @class */ (function () {
                function SonificationSpeaker(options) {
                    this.options = options;
                this.masterVolume = 1;
                this.synthesis = window.speechSynthesis;
                if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
                    speechSynthesis.onvoiceschanged = this.setVoice.bind(this);
                }
                this.setVoice();
                this.scheduled = [];
            }
            /**
             * Say a message using the speaker voice. Interrupts other currently
             * speaking announcements from this speaker.
             * @function Highcharts.SonificationSpeaker#say
             * @param {string} message The message to speak.
             * @param {SonificationSpeakerOptionsObject} [options]
             * Optionally override spaker configuration.
             */
            SonificationSpeaker.prototype.say = function (message, options) {
                if (this.synthesis) {
                    this.synthesis.cancel();
                    var utterance = new SpeechSynthesisUtterance(message);
                    if (this.voice) {
                        utterance.voice = this.voice;
                    }
                    utterance.rate = options && options.rate || this.options.rate || 1;
                    utterance.pitch = options && options.pitch ||
                        this.options.pitch || 1;
                    utterance.volume = pick(options && options.volume, this.options.volume, 1) * this.masterVolume;
                    this.synthesis.speak(utterance);
                }
            };
            /**
             * Schedule a message using the speaker voice.
             * @function Highcharts.SonificationSpeaker#sayAtTime
             * @param {number} time
             * The time offset to speak at, in milliseconds from now.
             * @param {string} message
             * The message to speak.
             * @param {SonificationSpeakerOptionsObject} [options]
             * Optionally override spaker configuration.
             */
            SonificationSpeaker.prototype.sayAtTime = function (time, message, options) {
                this.scheduled.push(setTimeout(this.say.bind(this, message, options), time));
            };
            /**
             * Clear scheduled announcements, and stop current speech.
             * @function Highcharts.SonificationSpeaker#cancel
             */
            SonificationSpeaker.prototype.cancel = function () {
                this.scheduled.forEach(clearTimeout);
                this.scheduled = [];
                this.synthesis.cancel();
            };
            /**
             * Stop speech and release any used resources
             * @private
             */
            SonificationSpeaker.prototype.destroy = function () {
                // Ran on TimelineChannel.destroy
                // (polymorphism with SonificationInstrument).
                // Currently all we need to do is cancel.
                this.cancel();
            };
            /**
             * Set speaker overall/master volume modifier. This affects all
             * announcements, and applies in addition to the individual announcement
             * volume.
             * @function Highcharts.SonificationSpeaker#setMasterVolume
             * @param {number} vol Volume from 0 to 1.
             */
            SonificationSpeaker.prototype.setMasterVolume = function (vol) {
                this.masterVolume = vol;
            };
            /**
             * Set the active synthesis voice for the speaker.
             * @private
             */
            SonificationSpeaker.prototype.setVoice = function () {
                if (this.synthesis) {
                    var name_1 = this.options.name,
                        lang = this.options.language || 'en-US',
                        voices = this.synthesis.getVoices(),
                        len = voices.length;
                    var langFallback = void 0;
                    for (var i = 0; i < len; ++i) {
                        if (name_1 && voices[i].name === name_1) {
                            this.voice = voices[i];
                            return;
                        }
                        if (!langFallback && voices[i].lang === lang) {
                            langFallback = voices[i];
                            if (!name_1) {
                                break;
                            }
                        }
                    }
                    this.voice = langFallback;
                }
            };
            return SonificationSpeaker;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * Configuration for a SonificationSpeaker.
         * @requires modules/sonification
         * @interface Highcharts.SonificationSpeakerOptionsObject
         */ /**
        * Name of the voice synthesis to use. If not found, reverts to the default
        * voice for the language chosen.
        * @name Highcharts.SonificationSpeakerOptionsObject#name
        * @type {string|undefined}
        */ /**
        * The language of the voice synthesis. Defaults to `"en-US"`.
        * @name Highcharts.SonificationSpeakerOptionsObject#language
        * @type {string|undefined}
        */ /**
        * The pitch modifier of the voice. Defaults to `1`. Set higher for a higher
        * voice pitch.
        * @name Highcharts.SonificationSpeakerOptionsObject#pitch
        * @type {number|undefined}
        */ /**
        * The speech rate modifier. Defaults to `1`.
        * @name Highcharts.SonificationSpeakerOptionsObject#rate
        * @type {number|undefined}
        */ /**
        * The speech volume, from 0 to 1. Defaults to `1`.
        * @name Highcharts.SonificationSpeakerOptionsObject#volume
        * @type {number|undefined}
        */
        (''); // Keep above doclets in JS file

        return SonificationSpeaker;
    });
    _registerModule(_modules, 'Extensions/Sonification/TimelineChannel.js', [], function () {
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
        /**
         * Represents a channel of TimelineEvents for an engine (either an instrument
         * or a speaker).
         * @private
         */
        var TimelineChannel = /** @class */ (function () {
                function TimelineChannel(type, engine, showPlayMarker, events, muted) {
                    if (showPlayMarker === void 0) { showPlayMarker = false; }
                    this.type = type;
                this.engine = engine;
                this.showPlayMarker = showPlayMarker;
                this.muted = muted;
                this.events = events || [];
            }
            TimelineChannel.prototype.addEvent = function (event) {
                var lastEvent = this.events[this.events.length - 1];
                if (lastEvent && event.time < lastEvent.time) {
                    // Ensure we are sorted by time, so insert at the right place
                    var i = this.events.length;
                    while (i-- && this.events[i].time > event.time) { /* */ }
                    this.events.splice(i + 1, 0, event);
                }
                else {
                    this.events.push(event);
                }
                return event;
            };
            TimelineChannel.prototype.mute = function () {
                this.muted = true;
            };
            TimelineChannel.prototype.unmute = function () {
                this.muted = false;
            };
            TimelineChannel.prototype.cancel = function () {
                this.engine.cancel();
            };
            TimelineChannel.prototype.destroy = function () {
                this.engine.destroy();
            };
            return TimelineChannel;
        }());
        /* *
         *
         *  Default Export
         *
         * */
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

        return TimelineChannel;
    });
    _registerModule(_modules, 'Extensions/Sonification/MIDI.js', [_modules['Extensions/Sonification/SonificationInstrument.js'], _modules['Core/Utilities.js']], function (SonificationInstrument, U) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Small MIDI file writer for sonification export.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-multi-spaces */
        var pick = U.pick;
        var freqToNote = function (f) { return Math.round(12 * Math.log(f) / Math.LN2 - 48.37632); }, b = function (byte, n) { return n >>> 8 * byte & 0xFF; }, getHeader = function (nTracks) { return [
                0x4D, 0x54, 0x68, 0x64,
                0, 0, 0, 6,
                0, nTracks > 1 ? 1 : 0,
                b(1, nTracks), b(0, nTracks),
                // SMTPE: 0xE7 0x28
                // -25/40 time div gives us millisecond SMTPE, but not widely supported.
                1, 0xF4 // HD_TIMEDIV, 500 ticks per beat = millisecond at 120bpm
            ]; }, timeInfo = [0, 0xFF, 0x51, 0x03, 0x07, 0xA1, 0x20], // META_TEMPO
            varLenEnc = function (n) {
                var buf = n & 0x7F;
            var res = [];
            while (n >>= 7) { // eslint-disable-line no-cond-assign
                buf <<= 8;
                buf |= (n & 0x7F) | 0x80;
            }
            while (true) { // eslint-disable-line no-constant-condition
                res.push(buf & 0xFF);
                if (buf & 0x80) {
                    buf >>= 8;
                }
                else {
                    break;
                }
            }
            return res;
        }, toMIDIEvents = function (events) {
            var cachedVel,
                cachedDur;
            var res = [],
                add = function (el) {
                    var ix = res.length;
                while (ix-- && res[ix].timeMS > el.timeMS) { /* */ }
                res.splice(ix + 1, 0, el);
            };
            events.forEach(function (e) {
                var o = e.instrumentEventOptions || {},
                    t = e.time,
                    dur = cachedDur = pick(o.noteDuration,
                    cachedDur),
                    tNOF = dur && e.time + dur,
                    ctrl = [{
                            valMap: function (n) { return 64 + 63 * n & 0x7F; },
                            data: {
                                0x0A: o.pan,
                                0x5C: o.tremoloDepth,
                                0x5D: o.tremoloSpeed
                            }
                        }, {
                            valMap: function (n) { return 127 * n / 20000 & 0x7F; },
                            data: {
                                0x4A: o.lowpassFreq,
                                0x4B: o.highpassFreq
                            }
                        }, {
                            valMap: function (n) {
                                return 63 * Math.min(18,
                    Math.max(-18,
                    n)) / 18 + 63 & 0x7F;
                        },
                        data: {
                            0x47: o.lowpassResonance,
                            0x4C: o.highpassResonance
                        }
                    }], v = cachedVel = o.volume === void 0 ?
                    pick(cachedVel, 127) : 127 * o.volume & 0x7F, freq = o.frequency, note = o.note || 0, noteVal = 12 + (freq ? freqToNote(freq) : // MIDI note #0 is C-1
                    typeof note === 'string' ? SonificationInstrument
                        .noteStringToC0Distance(note) : note) & 0x7F;
                // CTRL_CHANGE events
                ctrl.forEach(function (ctrlDef) { return Object.keys(ctrlDef.data)
                    .forEach(function (ctrlSignal) {
                    var val = ctrlDef.data[ctrlSignal];
                    if (val !== void 0) {
                        add({
                            timeMS: t,
                            type: 'CTRL_CHG',
                            data: [0xB0, parseInt(ctrlSignal, 10),
                                ctrlDef.valMap(val)]
                        });
                    }
                }); });
                // NON/NOF
                if (tNOF) {
                    add({ timeMS: t, type: 'NON', data: [0x90, noteVal, v] });
                    add({ timeMS: tNOF, type: 'NOF', data: [0x80, noteVal, v] });
                }
            });
            return res;
        }, getMetaEvents = function (midiTrackName, midiInstrument) {
            var events = [];
            if (midiInstrument) {
                // Program Change MIDI event
                events.push(0, 0xC0, midiInstrument & 0x7F);
            }
            if (midiTrackName) {
                // Track name meta event
                var textArr = [];
                for (var i = 0; i < midiTrackName.length; ++i) {
                    var code = midiTrackName.charCodeAt(i);
                    if (code < 128) { // Keep ASCII only
                        textArr.push(code);
                    }
                }
                return events.concat([0, 0xFF, 0x03], varLenEnc(textArr.length), textArr);
            }
            return events;
        }, getTrackChunk = function (events, addTimeInfo, midiTrackName, midiInstrument) {
            var prevTime = 0;
            var metaEvents = getMetaEvents(midiTrackName,
                midiInstrument),
                trackEvents = toMIDIEvents(events).reduce(function (data,
                e) {
                    var t = varLenEnc(e.timeMS - prevTime);
                prevTime = e.timeMS;
                return data.concat(t, e.data);
            }, []);
            var trackEnd = [0, 0xFF, 0x2F, 0],
                size = (addTimeInfo ? timeInfo.length : 0) +
                    metaEvents.length +
                    trackEvents.length + trackEnd.length;
            return [
                0x4D, 0x54, 0x72, 0x6B,
                b(3, size), b(2, size),
                b(1, size), b(0, size)
            ].concat(addTimeInfo ? timeInfo : [], metaEvents, trackEvents, trackEnd // SYSEX_TRACK_END
            );
        };
        /**
         * Get MIDI data from a set of Timeline instrument channels.
         *
         * Outputs multi-track MIDI for Timelines with multiple channels.
         *
         * @private
         */
        function toMIDI(channels) {
            var channelsToAdd = channels.filter(function (c) { return !!c.events.length; }),
                numCh = channelsToAdd.length,
                multiCh = numCh > 1;
            return new Uint8Array(getHeader(multiCh ? numCh + 1 : numCh).concat(multiCh ? getTrackChunk([], true) : [], // Time info only
            channelsToAdd.reduce(function (chunks, channel) {
                var engine = channel.engine;
                return chunks.concat(getTrackChunk(channel.events, !multiCh, engine.midiTrackName, engine.midiInstrument));
            }, [])));
        }

        return toMIDI;
    });
    _registerModule(_modules, 'Extensions/DownloadURL.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2015-2023 Oystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Mixin for downloading content in the browser
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        var isSafari = H.isSafari,
            win = H.win,
            doc = H.win.document;
        /* *
         *
         *  Constants
         *
         * */
        var domurl = win.URL || win.webkitURL || win;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Convert base64 dataURL to Blob if supported, otherwise returns undefined.
         * @private
         * @function Highcharts.dataURLtoBlob
         * @param {string} dataURL
         *        URL to convert
         * @return {string|undefined}
         *         Blob
         */
        function dataURLtoBlob(dataURL) {
            var parts = dataURL
                    .replace(/filename=.*;/, '')
                    .match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);
            if (parts &&
                parts.length > 3 &&
                (win.atob) &&
                win.ArrayBuffer &&
                win.Uint8Array &&
                win.Blob &&
                (domurl.createObjectURL)) {
                // Try to convert data URL to Blob
                var binStr = win.atob(parts[3]),
                    buf = new win.ArrayBuffer(binStr.length),
                    binary = new win.Uint8Array(buf);
                for (var i = 0; i < binary.length; ++i) {
                    binary[i] = binStr.charCodeAt(i);
                }
                return domurl
                    .createObjectURL(new win.Blob([binary], { 'type': parts[1] }));
            }
        }
        /**
         * Download a data URL in the browser. Can also take a blob as first param.
         *
         * @private
         * @function Highcharts.downloadURL
         * @param {string|global.URL} dataURL
         *        The dataURL/Blob to download
         * @param {string} filename
         *        The name of the resulting file (w/extension)
         * @return {void}
         */
        function downloadURL(dataURL, filename) {
            var nav = win.navigator,
                a = doc.createElement('a');
            // IE specific blob implementation
            // Don't use for normal dataURLs
            if (typeof dataURL !== 'string' &&
                !(dataURL instanceof String) &&
                nav.msSaveOrOpenBlob) {
                nav.msSaveOrOpenBlob(dataURL, filename);
                return;
            }
            dataURL = '' + dataURL;
            var // Some browsers have limitations for data URL lengths. Try to convert
                // to Blob or fall back. Edge always needs that blob.
                isOldEdgeBrowser = /Edge\/\d+/.test(nav.userAgent), 
                // Safari on iOS needs Blob in order to download PDF
                safariBlob = (isSafari &&
                    typeof dataURL === 'string' &&
                    dataURL.indexOf('data:application/pdf') === 0);
            if (safariBlob || isOldEdgeBrowser || dataURL.length > 2000000) {
                dataURL = dataURLtoBlob(dataURL) || '';
                if (!dataURL) {
                    throw new Error('Failed to convert to blob');
                }
            }
            // Try HTML5 download attr if supported
            if (typeof a.download !== 'undefined') {
                a.href = dataURL;
                a.download = filename; // HTML5 download attribute
                doc.body.appendChild(a);
                a.click();
                doc.body.removeChild(a);
            }
            else {
                // No download attr, just opening data URI
                try {
                    if (!win.open(dataURL, 'chart')) {
                        throw new Error('Failed to open window');
                    }
                }
                catch (_a) {
                    // If window.open failed, try location.href
                    win.location.href = dataURL;
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        var DownloadURL = {
                dataURLtoBlob: dataURLtoBlob,
                downloadURL: downloadURL
            };

        return DownloadURL;
    });
    _registerModule(_modules, 'Extensions/Sonification/SonificationTimeline.js', [_modules['Extensions/Sonification/TimelineChannel.js'], _modules['Extensions/Sonification/MIDI.js'], _modules['Extensions/DownloadURL.js'], _modules['Core/Utilities.js']], function (TimelineChannel, toMIDI, DU, U) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Class representing a Timeline with sonification events to play.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var downloadURL = DU.downloadURL;
        var defined = U.defined,
            find = U.find,
            merge = U.merge;
        /**
         * Get filtered channels. Timestamps are compensated, so that the first
         * event starts immediately.
         * @private
         */
        function filterChannels(filter, channels) {
            var filtered = channels.map(function (channel) {
                    channel.cancel();
                return {
                    channel: channel,
                    filteredEvents: channel.muted ?
                        [] : channel.events.filter(filter)
                };
            }), minTime = filtered.reduce(function (acc, cur) {
                return Math.min(acc, cur.filteredEvents.length ?
                    cur.filteredEvents[0].time : Infinity);
            }, Infinity);
            return filtered.map(function (c) { return (new TimelineChannel(c.channel.type, c.channel.engine, c.channel.showPlayMarker, c.filteredEvents.map(function (e) {
                return merge(e, { time: e.time - minTime });
            }), c.channel.muted)); });
        }
        /**
         * The SonificationTimeline class. This class represents a timeline of
         * audio events scheduled to play. It provides functionality for manipulating
         * and navigating the timeline.
         * @private
         */
        var SonificationTimeline = /** @class */ (function () {
                function SonificationTimeline(options, chart) {
                    this.chart = chart;
                this.isPaused = false;
                this.isPlaying = false;
                this.channels = [];
                this.scheduledCallbacks = [];
                this.playTimestamp = 0;
                this.resumeFromTime = 0;
                this.options = options || {};
            }
            // Add a channel, optionally with events, to be played.
            // Note: Only one speech channel is supported at a time.
            SonificationTimeline.prototype.addChannel = function (type, engine, showPlayMarker, events) {
                if (showPlayMarker === void 0) { showPlayMarker = false; }
                if (type === 'instrument' &&
                    !engine.scheduleEventAtTime ||
                    type === 'speech' &&
                        !engine.sayAtTime) {
                    throw new Error('Highcharts Sonification: Invalid channel engine.');
                }
                var channel = new TimelineChannel(type,
                    engine,
                    showPlayMarker,
                    events);
                this.channels.push(channel);
                return channel;
            };
            // Play timeline, optionally filtering out only some of the events to play.
            // Note that if not all instrument parameters are updated on each event,
            // parameters may update differently depending on the events filtered out,
            // since some of the events that update parameters can be filtered out too.
            // The filterPersists argument determines whether or not the filter persists
            // after e.g. pausing and resuming. Usually this should be true.
            SonificationTimeline.prototype.play = function (filter, filterPersists, resetAfter, onEnd) {
                var _this = this;
                if (filterPersists === void 0) { filterPersists = true; }
                if (resetAfter === void 0) { resetAfter = true; }
                if (this.isPlaying) {
                    this.cancel();
                }
                else {
                    this.clearScheduledCallbacks();
                }
                this.onEndArgument = onEnd;
                this.playTimestamp = Date.now();
                this.resumeFromTime = 0;
                this.isPaused = false;
                this.isPlaying = true;
                var skipThreshold = this.options.skipThreshold || 2,
                    onPlay = this.options.onPlay,
                    showTooltip = this.options.showTooltip,
                    showCrosshair = this.options.showCrosshair,
                    channels = filter ?
                        filterChannels(filter,
                    this.playingChannels || this.channels) :
                        this.channels,
                    getEventKeysSignature = function (e) {
                        return Object.keys(e.speechOptions || {})
                            .concat(Object.keys(e.instrumentEventOptions || {}))
                            .join();
                }, pointsPlayed = [];
                if (filterPersists) {
                    this.playingChannels = channels;
                }
                if (onPlay) {
                    onPlay({ chart: this.chart, timeline: this });
                }
                var maxTime = 0;
                channels.forEach(function (channel) {
                    if (channel.muted) {
                        return;
                    }
                    var numEvents = channel.events.length;
                    var lastCallbackTime = -Infinity,
                        lastEventTime = -Infinity,
                        lastEventKeys = '';
                    maxTime = Math.max(channel.events[numEvents - 1] &&
                        channel.events[numEvents - 1].time || 0, maxTime);
                    var _loop_1 = function (i) {
                            var e = channel.events[i],
                        keysSig = getEventKeysSignature(e);
                        // Optimize by skipping extremely close events (<2ms apart by
                        // default), as long as they don't introduce new event options
                        if (keysSig === lastEventKeys &&
                            e.time - lastEventTime < skipThreshold) {
                            return "continue";
                        }
                        lastEventKeys = keysSig;
                        lastEventTime = e.time;
                        if (channel.type === 'instrument') {
                            channel.engine
                                .scheduleEventAtTime(e.time / 1000, e.instrumentEventOptions || {});
                        }
                        else {
                            channel.engine.sayAtTime(e.time, e.message || '', e.speechOptions || {});
                        }
                        var point = e.relatedPoint,
                            chart = point && point.series && point.series.chart,
                            needsCallback = e.callback ||
                                point && (showTooltip || showCrosshair) &&
                                    channel.showPlayMarker !== false &&
                                    (e.time - lastCallbackTime > 50 || i === numEvents - 1);
                        if (point) {
                            pointsPlayed.push(point);
                        }
                        if (needsCallback) {
                            _this.scheduledCallbacks.push(setTimeout(function () {
                                if (e.callback) {
                                    e.callback();
                                }
                                if (point) {
                                    if (showCrosshair) {
                                        var s = point.series;
                                        if (s && s.xAxis && s.xAxis.crosshair) {
                                            s.xAxis.drawCrosshair(void 0, point);
                                        }
                                        if (s && s.yAxis && s.yAxis.crosshair) {
                                            s.yAxis.drawCrosshair(void 0, point);
                                        }
                                    }
                                    if (showTooltip && !(
                                    // Don't re-hover if shared tooltip
                                    chart && chart.hoverPoints &&
                                        chart.hoverPoints.length > 1 &&
                                        find(chart.hoverPoints, function (p) { return p === point; }) &&
                                        // Stock issue w/Navigator
                                        point.onMouseOver)) {
                                        point.onMouseOver();
                                    }
                                }
                            }, e.time));
                            lastCallbackTime = e.time;
                        }
                    };
                    for (var i = 0; i < numEvents; ++i) {
                        _loop_1(i);
                    }
                });
                var onEndOpt = this.options.onEnd,
                    onStop = this.options.onStop;
                this.scheduledCallbacks.push(setTimeout(function () {
                    var chart = _this.chart,
                        context = { chart: chart,
                        timeline: _this,
                        pointsPlayed: pointsPlayed };
                    _this.isPlaying = false;
                    if (resetAfter) {
                        _this.resetPlayState();
                    }
                    if (onStop) {
                        onStop(context);
                    }
                    if (onEndOpt) {
                        onEndOpt(context);
                    }
                    if (onEnd) {
                        onEnd(context);
                    }
                    if (chart) {
                        if (chart.tooltip) {
                            chart.tooltip.hide(0);
                        }
                        if (chart.hoverSeries) {
                            chart.hoverSeries.onMouseOut();
                        }
                        chart.axes.forEach(function (a) { return a.hideCrosshair(); });
                    }
                }, maxTime + 250));
                this.resumeFromTime = filterPersists ? maxTime : this.getLength();
            };
            // Pause for later resuming. Returns current timestamp to resume from.
            SonificationTimeline.prototype.pause = function () {
                this.isPaused = true;
                this.cancel();
                this.resumeFromTime = Date.now() - this.playTimestamp - 10;
                return this.resumeFromTime;
            };
            // Get current time
            SonificationTimeline.prototype.getCurrentTime = function () {
                return this.isPlaying ?
                    Date.now() - this.playTimestamp :
                    this.resumeFromTime;
            };
            // Get length of timeline in milliseconds
            SonificationTimeline.prototype.getLength = function () {
                return this.channels.reduce(function (maxTime, channel) {
                    var lastEvent = channel.events[channel.events.length - 1];
                    return lastEvent ? Math.max(lastEvent.time, maxTime) : maxTime;
                }, 0);
            };
            // Resume from paused
            SonificationTimeline.prototype.resume = function () {
                if (this.playingChannels) {
                    var resumeFrom_1 = this.resumeFromTime - 50;
                    this.play(function (e) { return e.time > resumeFrom_1; }, false, false, this.onEndArgument);
                    this.playTimestamp -= resumeFrom_1;
                }
                else {
                    this.play(void 0, false, false, this.onEndArgument);
                }
            };
            // Play a short moment, then pause, setting the cursor to the final
            // event's time.
            SonificationTimeline.prototype.anchorPlayMoment = function (eventFilter, onEnd) {
                if (this.isPlaying) {
                    this.pause();
                }
                var finalEventTime = 0;
                this.play(function (e, ix, arr) {
                    // We have to keep track of final event time ourselves, since
                    // play() messes with the time internally upon filtering.
                    var res = eventFilter(e,
                        ix,
                        arr);
                    if (res && e.time > finalEventTime) {
                        finalEventTime = e.time;
                    }
                    return res;
                }, false, false, onEnd);
                this.playingChannels = this.playingChannels || this.channels;
                this.isPaused = true;
                this.isPlaying = false;
                this.resumeFromTime = finalEventTime;
            };
            // Play event(s) occurring next/prev from paused state.
            SonificationTimeline.prototype.playAdjacent = function (next, onEnd, onBoundaryHit, eventFilter) {
                if (this.isPlaying) {
                    this.pause();
                }
                var fromTime = this.resumeFromTime,
                    closestTime = this.channels.reduce(function (time,
                    channel) {
                        // Adapted binary search since events are sorted by time
                        var events = eventFilter ?
                            channel.events.filter(eventFilter) : channel.events;
                    var s = 0,
                        e = events.length,
                        lastValidTime = time;
                    while (s < e) {
                        var mid = (s + e) >> 1,
                            t = events[mid].time,
                            cmp = t - fromTime;
                        if (cmp > 0) { // ahead
                            if (next && t < lastValidTime) {
                                lastValidTime = t;
                            }
                            e = mid;
                        }
                        else if (cmp < 0) { // behind
                            if (!next && t > lastValidTime) {
                                lastValidTime = t;
                            }
                            s = mid + 1;
                        }
                        else { // same as from time
                            if (next) {
                                s = mid + 1;
                            }
                            else {
                                e = mid;
                            }
                        }
                    }
                    return lastValidTime;
                }, next ? Infinity : -Infinity), margin = 0.02;
                if (closestTime === Infinity || closestTime === -Infinity) {
                    if (onBoundaryHit) {
                        onBoundaryHit({
                            chart: this.chart, timeline: this, attemptedNext: next
                        });
                    }
                    return;
                }
                this.anchorPlayMoment(function (e, ix, arr) {
                    var withinTime = next ?
                            e.time > fromTime && e.time <= closestTime + margin :
                            e.time < fromTime && e.time >= closestTime - margin;
                    return eventFilter ? withinTime && eventFilter(e, ix, arr) :
                        withinTime;
                }, onEnd);
            };
            // Play event with related point, where the value of a prop on the
            // related point is closest to a target value.
            // Note: not very efficient.
            SonificationTimeline.prototype.playClosestToPropValue = function (prop, targetVal, onEnd, onBoundaryHit, eventFilter) {
                var filter = function (e,
                    ix,
                    arr) { return !!(eventFilter ?
                        eventFilter(e,
                    ix,
                    arr) && e.relatedPoint :
                        e.relatedPoint); };
                var closestValDiff = Infinity,
                    closestEvent = null;
                (this.playingChannels || this.channels).forEach(function (channel) {
                    var events = channel.events;
                    var i = events.length;
                    while (i--) {
                        if (!filter(events[i], i, events)) {
                            continue;
                        }
                        var val = events[i].relatedPoint[prop],
                            diff = defined(val) && Math.abs(targetVal - val);
                        if (diff !== false && diff < closestValDiff) {
                            closestValDiff = diff;
                            closestEvent = events[i];
                        }
                    }
                });
                if (closestEvent) {
                    this.play(function (e) { return !!(closestEvent &&
                        e.time < closestEvent.time + 1 &&
                        e.time > closestEvent.time - 1 &&
                        e.relatedPoint === closestEvent.relatedPoint); }, false, false, onEnd);
                    this.playingChannels = this.playingChannels || this.channels;
                    this.isPaused = true;
                    this.isPlaying = false;
                    this.resumeFromTime = closestEvent.time;
                }
                else if (onBoundaryHit) {
                    onBoundaryHit({ chart: this.chart, timeline: this });
                }
            };
            // Get timeline events that are related to a certain point.
            // Note: Point grouping may cause some points not to have a
            //  related point in the timeline.
            SonificationTimeline.prototype.getEventsForPoint = function (point) {
                return this.channels.reduce(function (events, channel) {
                    var pointEvents = channel.events
                            .filter(function (e) { return e.relatedPoint === point; });
                    return events.concat(pointEvents);
                }, []);
            };
            // Divide timeline into 100 parts of equal time, and play one of them.
            // Used for scrubbing.
            // Note: Should be optimized?
            SonificationTimeline.prototype.playSegment = function (segment, onEnd) {
                var numSegments = 100;
                var eventTimes = {
                        first: Infinity,
                        last: -Infinity
                    };
                this.channels.forEach(function (c) {
                    if (c.events.length) {
                        eventTimes.first = Math.min(c.events[0].time, eventTimes.first);
                        eventTimes.last = Math.max(c.events[c.events.length - 1].time, eventTimes.last);
                    }
                });
                if (eventTimes.first < Infinity) {
                    var segmentSize = (eventTimes.last - eventTimes.first) / numSegments,
                        fromTime_1 = eventTimes.first + segment * segmentSize,
                        toTime_1 = fromTime_1 + segmentSize;
                    // Binary search, do we have any events within time range?
                    if (!this.channels.some(function (c) {
                        var events = c.events;
                        var s = 0,
                            e = events.length;
                        while (s < e) {
                            var mid = (s + e) >> 1,
                                t = events[mid].time;
                            if (t < fromTime_1) { // behind
                                s = mid + 1;
                            }
                            else if (t > toTime_1) { // ahead
                                e = mid;
                            }
                            else {
                                return true;
                            }
                        }
                        return false;
                    })) {
                        return; // If not, don't play - avoid cancelling current play
                    }
                    this.play(function (e) { return e.time >= fromTime_1 && e.time <= toTime_1; }, false, false, onEnd);
                    this.playingChannels = this.playingChannels || this.channels;
                    this.isPaused = true;
                    this.isPlaying = false;
                    this.resumeFromTime = toTime_1;
                }
            };
            // Get last played / current point
            // Since events are scheduled we can't just store points as we play them
            SonificationTimeline.prototype.getLastPlayedPoint = function (filter) {
                var curTime = this.getCurrentTime(),
                    channels = this.playingChannels || this.channels;
                var closestDiff = Infinity,
                    closestPoint = null;
                channels.forEach(function (c) {
                    var events = c.events.filter(function (e,
                        ix,
                        arr) { return !!(e.relatedPoint && e.time <= curTime &&
                            (!filter || filter(e,
                        ix,
                        arr))); }),
                        closestEvent = events[events.length - 1];
                    if (closestEvent) {
                        var closestTime = closestEvent.time,
                            diff = Math.abs(closestTime - curTime);
                        if (diff < closestDiff) {
                            closestDiff = diff;
                            closestPoint = closestEvent.relatedPoint;
                        }
                    }
                });
                return closestPoint;
            };
            // Reset play/pause state so that a later call to resume() will start over
            SonificationTimeline.prototype.reset = function () {
                if (this.isPlaying) {
                    this.cancel();
                }
                this.resetPlayState();
            };
            SonificationTimeline.prototype.cancel = function () {
                var onStop = this.options.onStop;
                if (onStop) {
                    onStop({ chart: this.chart, timeline: this });
                }
                this.isPlaying = false;
                this.channels.forEach(function (c) { return c.cancel(); });
                if (this.playingChannels && this.playingChannels !== this.channels) {
                    this.playingChannels.forEach(function (c) { return c.cancel(); });
                }
                this.clearScheduledCallbacks();
                this.resumeFromTime = 0;
            };
            SonificationTimeline.prototype.destroy = function () {
                this.cancel();
                if (this.playingChannels && this.playingChannels !== this.channels) {
                    this.playingChannels.forEach(function (c) { return c.destroy(); });
                }
                this.channels.forEach(function (c) { return c.destroy(); });
            };
            SonificationTimeline.prototype.setMasterVolume = function (vol) {
                this.channels.forEach(function (c) { return c.engine.setMasterVolume(vol); });
            };
            SonificationTimeline.prototype.getMIDIData = function () {
                return toMIDI(this.channels.filter(function (c) { return c.type === 'instrument'; }));
            };
            SonificationTimeline.prototype.downloadMIDI = function (filename) {
                var data = this.getMIDIData(), name = (filename ||
                        this.chart &&
                            this.chart.options.title &&
                            this.chart.options.title.text ||
                        'chart') + '.mid', blob = new Blob([data], { type: 'application/octet-stream' }), url = window.URL.createObjectURL(blob);
                downloadURL(url, name);
                window.URL.revokeObjectURL(url);
            };
            SonificationTimeline.prototype.resetPlayState = function () {
                delete this.playingChannels;
                delete this.onEndArgument;
                this.playTimestamp = this.resumeFromTime = 0;
                this.isPaused = false;
            };
            SonificationTimeline.prototype.clearScheduledCallbacks = function () {
                this.scheduledCallbacks.forEach(clearTimeout);
                this.scheduledCallbacks = [];
            };
            return SonificationTimeline;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * Filter callback for filtering timeline events on a SonificationTimeline.
         *
         * @callback Highcharts.SonificationTimelineFilterCallback
         *
         * @param {Highcharts.SonificationTimelineEvent} e TimelineEvent being filtered
         *
         * @param {number} ix Index of TimelineEvent in current event array
         *
         * @param {Array<Highcharts.SonificationTimelineEvent>} arr The current event array
         *
         * @return {boolean}
         * The function should return true if the TimelineEvent should be included,
         * false otherwise.
         */
        (''); // Keep above doclets in JS file

        return SonificationTimeline;
    });
    _registerModule(_modules, 'Extensions/Sonification/TimelineFromChart.js', [_modules['Extensions/Sonification/SonificationTimeline.js'], _modules['Extensions/Sonification/SonificationInstrument.js'], _modules['Extensions/Sonification/SonificationSpeaker.js'], _modules['Core/Utilities.js'], _modules['Core/Templating.js']], function (SonificationTimeline, SonificationInstrument, SonificationSpeaker, U, T) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Build a timeline from a chart.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __assign = (this && this.__assign) || function () {
                __assign = Object.assign || function(t) {
                    for (var s,
            i = 1,
            n = arguments.length; i < n; i++) {
                        s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var clamp = U.clamp,
            defined = U.defined,
            extend = U.extend,
            getNestedProperty = U.getNestedProperty,
            merge = U.merge,
            pick = U.pick;
        var format = T.format;
        var isNoteDefinition = function (str) {
                // eslint-disable-next-line require-unicode-regexp
                return (/^([a-g][#b]?)[0-8]$/i).test(str);
        };
        /**
         * Get the value of a point property from string.
         * @private
         */
        function getPointPropValue(point, prop) {
            var ret;
            if (prop) {
                ret = point[prop];
                if (typeof ret === 'number') {
                    return ret;
                }
                ret = getNestedProperty(prop, point);
            }
            return typeof ret === 'number' ? ret : void 0;
        }
        /**
         * Get chart wide min/max for a set of props, as well as per
         * series min/max for selected props.
         * @private
         */
        function getChartExtremesForProps(chart, props, perSeriesProps) {
            var series = chart.series,
                numProps = props.length,
                numSeriesProps = perSeriesProps.length,
                initCache = function (propList) {
                    return propList.reduce(function (cache,
                prop) {
                        ((cache[prop] = { min: Infinity,
                max: -Infinity }),
                cache);
                    return cache;
                }, {});
            }, updateCache = function (cache, point, prop) {
                var val = point[prop];
                if (val === void 0) {
                    val = getNestedProperty(prop, point);
                }
                if (typeof val === 'number') {
                    cache[prop].min = Math.min(cache[prop].min, val);
                    cache[prop].max = Math.max(cache[prop].max, val);
                }
            }, globalExtremes = initCache(props);
            var i = series.length;
            var allSeriesExtremes = new Array(i);
            while (i--) {
                var seriesExtremes = initCache(perSeriesProps);
                var opts = series[i].options;
                if (!series[i].visible ||
                    opts && opts.sonification && opts.sonification.enabled === false) {
                    continue;
                }
                var points = series[i].points || [];
                var j = points.length;
                while (j--) {
                    var k = numProps;
                    while (k--) {
                        updateCache(globalExtremes, points[j], props[k]);
                    }
                    k = numSeriesProps;
                    while (k--) {
                        updateCache(seriesExtremes, points[j], perSeriesProps[k]);
                    }
                }
                allSeriesExtremes[i] = seriesExtremes;
            }
            return {
                globalExtremes: globalExtremes,
                seriesExtremes: allSeriesExtremes
            };
        }
        /**
         * Build a cache of prop extremes for the chart. Goes through
         * options to find out which props are needed.
         * @private
         */
        function getPropMetrics(chart) {
            var globalOpts = chart.options.sonification ||
                    {}, defaultInstrMapping = (globalOpts.defaultInstrumentOptions || {})
                    .mapping || { time: 'x', pitch: 'y' }, defaultSpeechMapping = globalOpts.defaultSpeechOptions &&
                    globalOpts.defaultSpeechOptions.mapping || {}, seriesTimeProps = [], commonTimeProps = {}, addTimeProp = function (prop, seriesIx) {
                    if (seriesIx !== null) {
                        seriesTimeProps[seriesIx] =
                            seriesTimeProps[seriesIx] || {};
                    seriesTimeProps[seriesIx][prop] = true;
                }
                else {
                    commonTimeProps[prop] = true;
                }
            }, props = {}, perSeriesProps = {}, addPropFromMappingParam = function (param, val, seriesIx) {
                var removeInvertedFlag = function (s) { return (s.charAt(0) === '-' ? s.slice(1) : s); };
                if (typeof val === 'string' && param !== 'text') {
                    if (param === 'pitch' && isNoteDefinition(val)) {
                        return;
                    }
                    if (param === 'time') {
                        perSeriesProps[val] = true;
                        addTimeProp(val, seriesIx);
                    }
                    props[removeInvertedFlag(val)] = true;
                    return;
                }
                var paramOpts = val;
                if (paramOpts && paramOpts.mapTo &&
                    typeof paramOpts.mapTo === 'string') {
                    var mapTo = removeInvertedFlag(paramOpts.mapTo);
                    if (param === 'time') {
                        addTimeProp(mapTo, seriesIx);
                    }
                    if (param === 'time' || paramOpts.within === 'series') {
                        perSeriesProps[mapTo] = true;
                    }
                    props[mapTo] = true;
                    return;
                }
                if (['tremolo', 'lowpass', 'highpass'].indexOf(param) > -1 &&
                    typeof val === 'object') {
                    Object.keys(val).forEach(function (subParam) {
                        return addPropFromMappingParam(subParam, val[subParam], seriesIx);
                    });
                }
            }, addPropsFromMappingOptions = function (mapping, seriesIx) {
                (Object.keys(mapping)).forEach(function (param) {
                    return addPropFromMappingParam(param, mapping[param], seriesIx);
                });
            }, addPropsFromContextTracks = function (tracks) { return tracks.forEach(function (track) {
                props[track.valueProp || 'x'] =
                    perSeriesProps[track.valueProp || 'x'] = true;
            }); };
            addPropsFromMappingOptions(defaultInstrMapping, null);
            addPropsFromMappingOptions(defaultSpeechMapping, null);
            addPropsFromContextTracks(globalOpts.globalContextTracks || []);
            var hasCommonTimeProps = Object.keys(commonTimeProps).length;
            chart.series.forEach(function (series) {
                var sOpts = series.options.sonification;
                if (series.visible && !(sOpts && sOpts.enabled === false)) {
                    if (hasCommonTimeProps) {
                        seriesTimeProps[series.index] = merge(commonTimeProps);
                    }
                    if (sOpts) {
                        var defaultInstrMapping_1 = (sOpts.defaultInstrumentOptions || {}).mapping,
                            defaultSpeechMapping_1 = (sOpts.defaultSpeechOptions || {}).mapping;
                        if (defaultInstrMapping_1) {
                            addPropsFromMappingOptions(defaultInstrMapping_1, series.index);
                        }
                        if (defaultSpeechMapping_1) {
                            addPropsFromMappingOptions(defaultSpeechMapping_1, series.index);
                        }
                        addPropsFromContextTracks(sOpts.contextTracks || []);
                        (sOpts.tracks || [])
                            .concat(sOpts.contextTracks || [])
                            .forEach(function (trackOpts) {
                            if (trackOpts.mapping) {
                                addPropsFromMappingOptions(trackOpts.mapping, series.index);
                            }
                        });
                    }
                }
            });
            return __assign({ seriesTimeProps: seriesTimeProps }, getChartExtremesForProps(chart, Object.keys(props), Object.keys(perSeriesProps)));
        }
        /**
         * Map a relative value onto a virtual axis.
         * @private
         */
        function mapToVirtualAxis(value, valueExtremes, virtualAxisExtremes, invert, logarithmic // Virtual axis is logarithmic
        ) {
            var lenValueAxis = valueExtremes.max - valueExtremes.min;
            if (lenValueAxis <= 0) {
                return virtualAxisExtremes.min;
            }
            var lenVirtualAxis = virtualAxisExtremes.max - virtualAxisExtremes.min,
                valueDelta = value - valueExtremes.min;
            var virtualValueDelta = lenVirtualAxis * valueDelta / lenValueAxis;
            if (logarithmic) {
                var log = valueExtremes.min > 0 ?
                        // Normal log formula
                        function (x) { return Math.log(x) / Math.LOG10E; } :
                        // Negative logarithmic support needed
                        function (x) {
                            var adjustedNum = Math.abs(x);
                        if (adjustedNum < 10) {
                            adjustedNum += (10 - adjustedNum) / 10;
                        }
                        var res = Math.log(adjustedNum) / Math.LN10;
                        return x < 0 ? -res : res;
                    };
                var logValMin = log(valueExtremes.min);
                virtualValueDelta = lenVirtualAxis *
                    (log(value) - logValMin) /
                    (log(valueExtremes.max) - logValMin);
            }
            var val = invert ?
                    virtualAxisExtremes.max - virtualValueDelta :
                    virtualAxisExtremes.min + virtualValueDelta;
            return clamp(val, virtualAxisExtremes.min, virtualAxisExtremes.max);
        }
        /**
         * Get the value of a mapped parameter for a point.
         * @private
         */
        function getMappingParameterValue(context, propMetrics, useSeriesExtremes, defaultMapping, mappingOptions, contextValueProp) {
            if (typeof mappingOptions === 'number') {
                return mappingOptions;
            }
            if (typeof mappingOptions === 'function') {
                return mappingOptions(extend({ time: 0 }, context));
            }
            var mapTo = mappingOptions,
                mapFunc = defaultMapping.mapFunction,
                min = defaultMapping.min,
                max = defaultMapping.max,
                within = defaultMapping.within,
                scale;
            if (typeof mappingOptions === 'object') {
                mapTo = mappingOptions.mapTo;
                mapFunc = mappingOptions.mapFunction || mapFunc;
                min = pick(mappingOptions.min, min);
                max = pick(mappingOptions.max, max);
                within = mappingOptions.within || defaultMapping.within;
                scale = mappingOptions.scale;
            }
            if (!mapTo) {
                return null;
            }
            var isInverted = mapTo.charAt(0) === '-';
            if (isInverted) {
                mapTo = mapTo.slice(1);
            }
            var value = context.value;
            var useContextValue = mapTo === 'value' && value !== void 0 &&
                    contextValueProp;
            if (!useContextValue) {
                var fixedValue = mappingOptions.value;
                if (fixedValue !== void 0) {
                    value = fixedValue;
                }
                else {
                    if (!context.point) {
                        return null;
                    }
                    value = context.point[mapTo];
                }
                if (value === void 0) {
                    value = getNestedProperty(mapTo, context.point);
                }
            }
            if (typeof value !== 'number' || value === null) {
                return null;
            }
            // Figure out extremes for this mapping
            var extremes = null;
            if (context.point) {
                if (within === 'xAxis' || within === 'yAxis') {
                    var axis = context.point.series[within];
                    if (axis && defined(axis.dataMin) && defined(axis.dataMax)) {
                        extremes = {
                            min: axis.dataMin,
                            max: axis.dataMax
                        };
                    }
                }
                else if ((within === 'series' || useSeriesExtremes) &&
                    context.point.series) {
                    extremes = propMetrics.seriesExtremes[context.point.series.index][useContextValue ? contextValueProp : mapTo];
                }
            }
            if (!extremes) { // Chart extremes
                extremes = propMetrics.globalExtremes[useContextValue ? contextValueProp : mapTo];
            }
            if (scale) {
                // Build a musical scale from array
                var scaleAxis = [], minOctave = Math.floor(min / 12), maxOctave = Math.ceil(max / 12) + 1, lenScale = scale.length;
                for (var octave = minOctave; octave < maxOctave; ++octave) {
                    for (var scaleIx = 0; scaleIx < lenScale; ++scaleIx) {
                        var note = 12 * octave + scale[scaleIx];
                        if (note >= min && note <= max) {
                            scaleAxis.push(note);
                        }
                    }
                }
                // Map to the scale
                var noteNum = mapToVirtualAxis(value,
                    extremes, { min: 0,
                    max: scaleAxis.length - 1 },
                    isInverted,
                    mapFunc === 'logarithmic');
                return scaleAxis[Math.round(noteNum)];
            }
            return mapToVirtualAxis(value, extremes, { min: min, max: max }, isInverted, mapFunc === 'logarithmic');
        }
        /**
         * Get mapping parameter value with defined fallback and defaults.
         * @private
         */
        function getParamValWithDefault(context, propMetrics, useSeriesExtremes, mappingParamOptions, fallback, defaults, contextValueProp) {
            return pick(getMappingParameterValue(context, propMetrics, useSeriesExtremes, extend({
                min: 0, max: 1, mapTo: 'y', mapFunction: 'linear', within: 'chart'
            }, (defaults || {})), mappingParamOptions, contextValueProp), fallback);
        }
        /**
         * Get time value for a point event.
         * @private
         */
        function getPointTime(point, startTime, duration, timeMappingOptions, propMetrics, useSeriesExtremes) {
            var time = getParamValWithDefault({ point: point,
                time: 0 },
                propMetrics,
                useSeriesExtremes,
                timeMappingOptions, 0, { min: 0,
                max: duration,
                mapTo: 'x' });
            return time + startTime;
        }
        /**
         * Get duration for a series
         * @private
         */
        function getAvailableDurationForSeries(series, totalDuration, propMetrics, afterSeriesWait) {
            var timeProp,
                seriesDuration;
            var availableDuration = totalDuration -
                    (series.chart.series.length - 1) * afterSeriesWait,
                hasGlobalTimeProp = propMetrics.seriesTimeProps.every(function (timeProps) {
                    var props = Object.keys(timeProps);
                if (props.length > 1) {
                    return false;
                }
                if (!timeProp) {
                    timeProp = props[0];
                }
                return timeProp === props[0];
            });
            if (hasGlobalTimeProp) {
                // Chart-wide single time prop, use time prop extremes
                var seriesExtremes = propMetrics
                        .seriesExtremes[series.index][timeProp],
                    seriesTimeLen = seriesExtremes.max - seriesExtremes.min,
                    totalTimeLen = propMetrics.seriesExtremes.reduce(function (sum,
                    s) { return (s[timeProp] ?
                        sum + s[timeProp].max - s[timeProp].min :
                        sum); }, 0);
                seriesDuration = Math.round(seriesTimeLen / totalTimeLen * availableDuration);
            }
            else {
                // No common time prop, so use percent of total points
                var totalPoints = series.chart.series.reduce(function (sum,
                    s) { return sum + s.points.length; }, 0);
                seriesDuration = Math.round((series.points || []).length / totalPoints * availableDuration);
            }
            return Math.max(50, seriesDuration);
        }
        /**
         * Build and add a track to the timeline.
         * @private
         */
        function addTimelineChannelFromTrack(timeline, audioContext, destinationNode, options) {
            var speechOpts = options,
                instrMappingOpts = (options.mapping || {}),
                engine = options.type === 'speech' ?
                    new SonificationSpeaker({
                        language: speechOpts.language,
                        name: speechOpts.preferredVoice
                    }) :
                    new SonificationInstrument(audioContext,
                destinationNode, {
                        capabilities: {
                            pan: !!instrMappingOpts.pan,
                            tremolo: !!instrMappingOpts.tremolo,
                            filters: !!(instrMappingOpts.highpass ||
                                instrMappingOpts.lowpass)
                        },
                        synthPatch: options.instrument,
                        midiTrackName: options.midiName
                    });
            return timeline.addChannel(options.type || 'instrument', engine, pick(options.showPlayMarker, true));
        }
        /**
         * Add event from a point to a mapped instrument track.
         * @private
         */
        function addMappedInstrumentEvent(context, channel, mappingOptions, propMetrics, roundToMusicalNotes, contextValueProp) {
            var getParam = function (param,
                fallback,
                defaults,
                parent) { return getParamValWithDefault(context,
                propMetrics,
                false, (parent || mappingOptions)[param],
                fallback,
                defaults,
                contextValueProp); };
            var eventsAdded = [],
                eventOpts = {
                    noteDuration: getParam('noteDuration', 200, { min: 40,
                max: 1000 }),
                    pan: getParam('pan', 0, { min: -1,
                max: 1 }),
                    volume: getParam('volume', 1, { min: 0.1,
                max: 1 })
                };
            if (mappingOptions.frequency) {
                eventOpts.frequency = getParam('frequency', 440, { min: 50, max: 6000 });
            }
            if (mappingOptions.lowpass) {
                eventOpts.lowpassFreq = getParam('frequency', 20000, { min: 0, max: 20000 }, mappingOptions.lowpass);
                eventOpts.lowpassResonance = getParam('resonance', 0, { min: -6, max: 12 }, mappingOptions.lowpass);
            }
            if (mappingOptions.highpass) {
                eventOpts.highpassFreq = getParam('frequency', 20000, { min: 0, max: 20000 }, mappingOptions.highpass);
                eventOpts.highpassResonance = getParam('resonance', 0, { min: -6, max: 12 }, mappingOptions.highpass);
            }
            if (mappingOptions.tremolo) {
                eventOpts.tremoloDepth = getParam('depth', 0, { min: 0, max: 0.8 }, mappingOptions.tremolo);
                eventOpts.tremoloSpeed = getParam('speed', 0, { min: 0, max: 0.8 }, mappingOptions.tremolo);
            }
            var gapBetweenNotes = getParam('gapBetweenNotes', 150, { min: 50, max: 1000 }), playDelay = getParam('playDelay', 0, { max: 200 });
            var addNoteEvent = function (noteDef,
                ix) {
                    if (ix === void 0) { ix = 0; }
                    var opts = noteDef;
                if (noteDef.mapTo) {
                    // Transform the pitch mapping options to normal mapping options
                    if (typeof noteDef.min === 'string') {
                        opts.min = SonificationInstrument
                            .noteStringToC0Distance(noteDef.min);
                    }
                    if (typeof noteDef.max === 'string') {
                        opts.max = SonificationInstrument
                            .noteStringToC0Distance(noteDef.max);
                    }
                }
                else if (typeof noteDef === 'string' && isNoteDefinition(noteDef)) {
                    opts = SonificationInstrument.noteStringToC0Distance(noteDef);
                }
                eventOpts.note = getParamValWithDefault(context, propMetrics, false, opts, -1, { min: 0, max: 107 }, contextValueProp);
                if (eventOpts.note > -1) {
                    if (roundToMusicalNotes) {
                        eventOpts.note = Math.round(eventOpts.note);
                    }
                    eventsAdded.push(channel.addEvent({
                        time: context.time + playDelay + gapBetweenNotes * ix,
                        relatedPoint: context.point,
                        instrumentEventOptions: ix !== void 0 ?
                            extend({}, eventOpts) : eventOpts
                    }));
                }
            };
            if (mappingOptions.pitch &&
                mappingOptions.pitch.constructor === Array) {
                mappingOptions.pitch.forEach(addNoteEvent);
            }
            else if (mappingOptions.pitch) {
                addNoteEvent(mappingOptions.pitch);
            }
            else if (mappingOptions.frequency) {
                eventsAdded.push(channel.addEvent({
                    time: context.time + playDelay,
                    relatedPoint: context.point,
                    instrumentEventOptions: eventOpts
                }));
            }
            return eventsAdded;
        }
        /**
         * Get the message value to speak for a point.
         * @private
         */
        function getSpeechMessageValue(context, messageParam) {
            return format(typeof messageParam === 'function' ?
                messageParam(context) :
                messageParam, context, context.point && context.point.series.chart);
        }
        /**
         * Add an event from a point to a mapped speech track.
         * @private
         */
        function addMappedSpeechEvent(context, channel, mappingOptions, propMetrics, contextValueProp) {
            var getParam = function (param,
                fallback,
                defaults) { return getParamValWithDefault(context,
                propMetrics,
                false,
                mappingOptions[param],
                fallback,
                defaults,
                contextValueProp); };
            var playDelay = getParam('playDelay', 0, { max: 200 }), pitch = getParam('pitch', 1, { min: 0.3, max: 2 }), rate = getParam('rate', 1, { min: 0.4, max: 4 }), volume = getParam('volume', 1, { min: 0.1 }), message = getSpeechMessageValue(context, mappingOptions.text);
            if (message) {
                return channel.addEvent({
                    time: context.time + playDelay,
                    relatedPoint: context.point,
                    speechOptions: {
                        pitch: pitch,
                        rate: rate,
                        volume: volume
                    },
                    message: message
                });
            }
        }
        /**
         * Add events to a channel for a point&track combo.
         * @private
         */
        function addMappedEventForPoint(context, channel, trackOptions, propMetrics) {
            var eventsAdded = [];
            if (trackOptions.type === 'speech' && trackOptions.mapping) {
                var eventAdded = addMappedSpeechEvent(context,
                    channel,
                    trackOptions.mapping,
                    propMetrics);
                if (eventAdded) {
                    eventsAdded = [eventAdded];
                }
            }
            else if (trackOptions.mapping) {
                eventsAdded = addMappedInstrumentEvent(context, channel, trackOptions.mapping, propMetrics, pick(trackOptions
                    .roundToMusicalNotes, true));
            }
            return eventsAdded;
        }
        /**
         * Get a reduced set of points from a list, depending on grouping opts.
         * @private
         */
        function getGroupedPoints(pointGroupOpts, points) {
            var alg = pointGroupOpts.algorithm || 'minmax',
                r = function (ix) { return (points[ix] ? [points[ix].point] : []); };
            if (alg === 'first') {
                return r(0);
            }
            if (alg === 'last') {
                return r(points.length - 1);
            }
            if (alg === 'middle') {
                return r(points.length >> 1);
            }
            if (alg === 'firstlast') {
                return r(0).concat(r(points.length - 1));
            }
            if (alg === 'minmax') {
                var prop_1 = pointGroupOpts.prop || 'y';
                var min_1,
                    max_1,
                    minVal_1,
                    maxVal_1;
                points.forEach(function (p) {
                    var val = getPointPropValue(p.point,
                        prop_1);
                    if (val === void 0) {
                        return;
                    }
                    if (!min_1 || val < minVal_1) {
                        min_1 = p;
                        minVal_1 = val;
                    }
                    if (!max_1 || val > maxVal_1) {
                        max_1 = p;
                        maxVal_1 = val;
                    }
                });
                if (min_1 && max_1) {
                    if (min_1.point === max_1.point) {
                        return [min_1.point];
                    }
                    return min_1.time > max_1.time ?
                        [max_1.point, min_1.point] :
                        [min_1.point, max_1.point];
                }
            }
            return [];
        }
        /**
         * Should a track be active for this event?
         * @private
         */
        function isActive(context, activeWhen, lastPropValue) {
            if (typeof activeWhen === 'function') {
                return activeWhen(context);
            }
            if (typeof activeWhen === 'object') {
                var prop = activeWhen.prop,
                    val = pick(context.value,
                    context.point && getPointPropValue(context.point,
                    prop));
                if (typeof val !== 'number') {
                    return false;
                }
                var crossingOk = true;
                var crossingUp = activeWhen.crossingUp,
                    crossingDown = activeWhen.crossingDown,
                    hasLastValue = typeof lastPropValue === 'number';
                if (crossingUp && crossingDown) {
                    crossingOk = hasLastValue && (lastPropValue < crossingUp && val >= crossingUp ||
                        lastPropValue > crossingDown && val <= crossingDown);
                }
                else {
                    crossingOk = (crossingUp === void 0 ||
                        hasLastValue && lastPropValue < crossingUp &&
                            val >= crossingUp) && (crossingDown === void 0 ||
                        hasLastValue && lastPropValue > crossingDown &&
                            val <= crossingDown);
                }
                var max = pick(activeWhen.max,
                    Infinity),
                    min = pick(activeWhen.min, -Infinity);
                return val <= max && val >= min && crossingOk;
            }
            return true;
        }
        /**
         * Build a new timeline object from a chart.
         * @private
         */
        function timelineFromChart(audioContext, destinationNode, chart) {
            var options = chart.options.sonification ||
                    {},
                defaultInstrOpts = options.defaultInstrumentOptions,
                defaultSpeechOpts = options.defaultSpeechOptions,
                defaultPointGroupOpts = merge({
                    enabled: true,
                    groupTimespan: 15,
                    algorithm: 'minmax',
                    prop: 'y'
                },
                options.pointGrouping),
                globalTracks = options.globalTracks || [],
                globalContextTracks = options.globalContextTracks || [],
                isSequential = options.order === 'sequential', 
                // Slight margin for note end
                totalDuration = Math.max(50,
                options.duration - 300),
                afterSeriesWait = options.afterSeriesWait,
                eventOptions = options.events || {},
                propMetrics = getPropMetrics(chart),
                timeline = new SonificationTimeline({
                    onPlay: eventOptions.onPlay,
                    onEnd: eventOptions.onEnd,
                    onStop: eventOptions.onStop,
                    showCrosshair: options.showCrosshair,
                    showTooltip: options.showTooltip
                },
                chart);
            // Expose PropMetrics for tests
            if (chart.sonification) {
                chart.sonification.propMetrics = propMetrics;
            }
            var startTime = 0;
            chart.series.forEach(function (series, seriesIx) {
                var sOptions = series.options.sonification ||
                        {};
                if (series.visible && sOptions.enabled !== false) {
                    var seriesDuration_1 = isSequential ? getAvailableDurationForSeries(series,
                        totalDuration,
                        propMetrics,
                        afterSeriesWait) : totalDuration,
                        seriesDefaultInstrOpts_1 = merge(defaultInstrOpts,
                        sOptions.defaultInstrumentOptions),
                        seriesDefaultSpeechOpts_1 = merge(defaultSpeechOpts,
                        sOptions.defaultSpeechOptions),
                        seriesPointGroupOpts_1 = merge(defaultPointGroupOpts,
                        sOptions.pointGrouping),
                        mainTracks = (sOptions.tracks || [seriesDefaultInstrOpts_1])
                            .concat(globalTracks),
                        hasAddedSeries = !!timeline.channels.length,
                        contextTracks = hasAddedSeries && !isSequential ?
                            sOptions.contextTracks || [] :
                            (sOptions.contextTracks || []).concat(globalContextTracks),
                        eventsAdded_1 = [];
                    // For crossing threshold notifications
                    var lastPropValue_1;
                    // Add events for the mapped tracks
                    mainTracks.forEach(function (trackOpts) {
                        var mergedOpts = merge({
                                pointGrouping: seriesPointGroupOpts_1,
                                midiName: trackOpts.midiName || series.name
                            },
                            trackOpts.type === 'speech' ?
                                seriesDefaultSpeechOpts_1 : seriesDefaultInstrOpts_1,
                            trackOpts),
                            pointGroupOpts = mergedOpts.pointGrouping,
                            activeWhen = mergedOpts.activeWhen,
                            updateLastPropValue = function (point) {
                                if (typeof activeWhen === 'object' &&
                                    activeWhen.prop) {
                                    lastPropValue_1 = getPointPropValue(point,
                            activeWhen.prop);
                            }
                        };
                        var channel = addTimelineChannelFromTrack(timeline,
                            audioContext,
                            destinationNode,
                            mergedOpts),
                            add = function (c) { return eventsAdded_1.push.apply(eventsAdded_1,
                            addMappedEventForPoint(c,
                            channel,
                            mergedOpts,
                            propMetrics)); };
                        // Go through the points and add events to channel
                        var pointGroup = [],
                            pointGroupTime = 0;
                        var addCurrentPointGroup = function (groupSpanTime) {
                                if (pointGroup.length === 1) {
                                    add({
                                        point: pointGroup[0].point,
                                        time: pointGroupTime + groupSpanTime / 2
                                    });
                            }
                            else {
                                var points = getGroupedPoints(pointGroupOpts,
                                    pointGroup),
                                    t_1 = groupSpanTime / points.length;
                                points.forEach(function (p, ix) { return add({
                                    point: p,
                                    time: pointGroupTime + t_1 / 2 + t_1 * ix
                                }); });
                            }
                            pointGroup = [];
                        };
                        (series.points || []).forEach(function (point, pointIx) {
                            var isLastPoint = pointIx === series.points.length - 1;
                            var time = getPointTime(point,
                                startTime,
                                seriesDuration_1,
                                mergedOpts.mapping && mergedOpts.mapping.time || 0,
                                propMetrics,
                                isSequential);
                            var context = { point: point,
                                time: time };
                            // Is this point active?
                            if (!mergedOpts.mapping ||
                                !isActive(context, activeWhen, lastPropValue_1)) {
                                updateLastPropValue(point);
                                // Remaining points in group
                                if (isLastPoint && pointGroup.length) {
                                    addCurrentPointGroup(pointGroup[pointGroup.length - 1].time -
                                        pointGroup[0].time);
                                }
                                return;
                            }
                            updateLastPropValue(point);
                            // Add the events
                            if (!pointGroupOpts.enabled) {
                                add(context);
                            }
                            else {
                                var dT = time - pointGroupTime,
                                    groupSpan = pointGroupOpts.groupTimespan,
                                    spanTime = isLastPoint &&
                                        dT <= groupSpan ? dT : groupSpan;
                                if (isLastPoint || dT > groupSpan) {
                                    if (dT <= groupSpan) {
                                        // Only happens if last point is within group
                                        pointGroup.push(context);
                                    }
                                    addCurrentPointGroup(spanTime);
                                    pointGroupTime = Math.floor(time / groupSpan) *
                                        groupSpan;
                                    if (isLastPoint && dT > groupSpan) {
                                        add({
                                            point: context.point,
                                            time: pointGroupTime + spanTime / 2
                                        });
                                    }
                                    else {
                                        pointGroup = [context];
                                    }
                                }
                                else {
                                    pointGroup.push(context);
                                }
                            }
                        });
                    });
                    // Add callbacks to first/last events
                    var firstEvent = eventsAdded_1.reduce(function (first,
                        e) { return (e.time < first.time ? e : first); }, { time: Infinity });
                    var lastEvent = eventsAdded_1.reduce(function (last,
                        e) { return (e.time > last.time ? e : last); }, { time: -Infinity });
                    firstEvent.callback = eventOptions.onSeriesStart ?
                        eventOptions.onSeriesStart.bind(null, { series: series, timeline: timeline }) :
                        void 0;
                    lastEvent.callback = eventOptions.onSeriesEnd ?
                        eventOptions.onSeriesEnd.bind(null, { series: series, timeline: timeline }) :
                        void 0;
                    // Add the context tracks that are not related to points
                    contextTracks.forEach(function (trackOpts) {
                        var mergedOpts = trackOpts.type === 'speech' ?
                                merge(defaultSpeechOpts,
                            trackOpts) :
                                merge(defaultInstrOpts, {
                                    mapping: { pitch: { mapTo: 'value' } }
                                },
                            trackOpts);
                        var contextChannel = addTimelineChannelFromTrack(timeline,
                            audioContext,
                            destinationNode,
                            mergedOpts);
                        lastPropValue_1 = void 0;
                        var timeInterval = mergedOpts.timeInterval,
                            valueInterval = mergedOpts.valueInterval,
                            valueProp = mergedOpts.valueProp || 'x',
                            activeWhen = mergedOpts.activeWhen,
                            contextExtremes = propMetrics
                                .seriesExtremes[seriesIx][valueProp],
                            addContextEvent = function (time,
                            value) {
                                if (!mergedOpts.mapping ||
                                    !isActive({ time: time,
                            value: value },
                            typeof activeWhen === 'object' ?
                                        extend({ prop: valueProp },
                            activeWhen) :
                                        activeWhen,
                            lastPropValue_1)) {
                                    lastPropValue_1 = value;
                                return;
                            }
                            lastPropValue_1 = value;
                            if (mergedOpts.type === 'speech') {
                                addMappedSpeechEvent({ time: time, value: value }, contextChannel, mergedOpts.mapping, propMetrics, valueProp);
                            }
                            else {
                                addMappedInstrumentEvent({ time: time, value: value }, contextChannel, mergedOpts.mapping, propMetrics, pick(mergedOpts.roundToMusicalNotes, true), valueProp);
                            }
                        };
                        if (timeInterval) {
                            var time = 0;
                            while (time <= seriesDuration_1) {
                                var val = mapToVirtualAxis(time, { min: 0,
                                    max: seriesDuration_1 },
                                    contextExtremes);
                                addContextEvent(time + startTime, val);
                                time += timeInterval;
                            }
                        }
                        if (valueInterval) {
                            var val = contextExtremes.min;
                            while (val <= contextExtremes.max) {
                                var time = mapToVirtualAxis(val,
                                    contextExtremes, { min: 0,
                                    max: seriesDuration_1 },
                                    false,
                                    mergedOpts.valueMapFunction === 'logarithmic');
                                addContextEvent(time + startTime, val);
                                val += valueInterval;
                            }
                        }
                    });
                    if (isSequential) {
                        startTime += seriesDuration_1 + afterSeriesWait;
                    }
                }
            });
            return timeline;
        }
        /* *
         *
         *  Default Export
         *
         * */

        return timelineFromChart;
    });
    _registerModule(_modules, 'Extensions/Sonification/Sonification.js', [_modules['Core/Defaults.js'], _modules['Core/Utilities.js'], _modules['Core/Globals.js'], _modules['Extensions/Sonification/Options.js'], _modules['Extensions/Sonification/SonificationInstrument.js'], _modules['Extensions/Sonification/SonificationSpeaker.js'], _modules['Extensions/Sonification/SynthPatch.js'], _modules['Extensions/Sonification/InstrumentPresets.js'], _modules['Extensions/Sonification/TimelineFromChart.js']], function (D, U, H, defaultSonificationOptions, SonificationInstrument, SonificationSpeaker, SynthPatch, InstrumentPresets, timelineFromChart) {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Sonification module.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        var defaultOptions = D.defaultOptions,
            getOptions = D.getOptions;
        var addEvent = U.addEvent,
            extend = U.extend,
            fireEvent = U.fireEvent,
            merge = U.merge,
            pick = U.pick;
        var doc = H.doc,
            win = H.win;
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
        var Sonification = /** @class */ (function () {
                function Sonification(chart) {
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
                catch (e) { /* ignore */ }
            }
            /**
             * Set the audio destination node to something other than the default
             * output. This allows for inserting custom WebAudio chains after the
             * sonification.
             * @function Highcharts.Sonification#setAudioDestination
             * @param {AudioDestinationNode} audioDestination The destination node
             */
            Sonification.prototype.setAudioDestination = function (audioDestination) {
                this.audioDestination = audioDestination;
                this.update();
            };
            /**
             * Check if sonification is playing currently
             * @function Highcharts.Sonification#isPlaying
             * @return {boolean} `true` if currently playing, `false` if not
             */
            Sonification.prototype.isPlaying = function () {
                return !!this.timeline && this.timeline.isPlaying;
            };
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
            Sonification.prototype.playSegment = function (segment, onEnd) {
                if (!this.ready(this.playSegment.bind(this, segment, onEnd))) {
                    return;
                }
                if (this.timeline) {
                    this.timeline.playSegment(segment, onEnd);
                }
            };
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
            Sonification.prototype.playAdjacent = function (next, onEnd, eventFilter) {
                var _this = this;
                if (!this.ready(this.playAdjacent.bind(this, next, onEnd, eventFilter))) {
                    return;
                }
                if (this.timeline) {
                    var opts = this.chart.options.sonification,
                        onHit = opts && opts.events && opts.events.onBoundaryHit;
                    if (!onHit) {
                        this.initBoundaryInstrument();
                    }
                    this.timeline.playAdjacent(next, onEnd, onHit || (function () {
                        _this.defaultBoundaryHit();
                    }), eventFilter);
                }
            };
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
            Sonification.prototype.playAdjacentSeries = function (next, prop, onEnd) {
                if (prop === void 0) { prop = 'x'; }
                var lastPlayed = this.getLastPlayedPoint();
                if (lastPlayed) {
                    var targetSeriesIx_1 = lastPlayed.series.index + (next ? 1 : -1);
                    this.playClosestToProp(prop, lastPlayed[prop], function (e) { return !!e.relatedPoint &&
                        e.relatedPoint.series.index === targetSeriesIx_1; }, onEnd);
                    return this.chart.series[targetSeriesIx_1] || null;
                }
                return null;
            };
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
            Sonification.prototype.playClosestToProp = function (prop, targetValue, targetFilter, onEnd) {
                var _this = this;
                if (!this.ready(this.playClosestToProp.bind(this, prop, targetValue, targetFilter, onEnd))) {
                    return;
                }
                if (this.timeline) {
                    var opts = this.chart.options.sonification,
                        onHit = opts && opts.events && opts.events.onBoundaryHit;
                    if (!onHit) {
                        this.initBoundaryInstrument();
                    }
                    this.timeline.playClosestToPropValue(prop, targetValue, onEnd, onHit || (function () {
                        return _this.defaultBoundaryHit();
                    }), targetFilter);
                }
            };
            /**
             * Get last played point
             * @function Highcharts.Sonification#getLastPlayedPoint
             *
             * @sample highcharts/demo/sonification-navigation
             *         Sonification keyboard navigation
             *
             * @return {Highcharts.Point|null} The point, or null if none
             */
            Sonification.prototype.getLastPlayedPoint = function () {
                if (this.timeline) {
                    return this.timeline.getLastPlayedPoint();
                }
                return null;
            };
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
            Sonification.prototype.playNote = function (instrument, options, delayMs) {
                if (delayMs === void 0) { delayMs = 0; }
                if (!this.ready(this.playNote.bind(this, instrument, options))) {
                    return;
                }
                var duration = options.noteDuration = options.noteDuration || 500;
                var instr = new SonificationInstrument(this.audioContext,
                    this.audioDestination, {
                        synthPatch: instrument,
                        capabilities: {
                            filters: true,
                            tremolo: true,
                            pan: true
                        }
                    });
                instr.scheduleEventAtTime(delayMs / 1000, options);
                setTimeout(function () { return instr && instr.destroy(); }, delayMs + duration + 500);
            };
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
            Sonification.prototype.speak = function (text, speakerOptions, delayMs) {
                if (delayMs === void 0) { delayMs = 0; }
                var speaker = new SonificationSpeaker(merge({
                        language: 'en-US',
                        rate: 1.5,
                        volume: 0.4
                    },
                    speakerOptions || {}));
                speaker.sayAtTime(delayMs, text);
            };
            /**
             * Cancel current playing audio and reset the timeline.
             * @function Highcharts.Sonification#cancel
             */
            Sonification.prototype.cancel = function () {
                if (this.timeline) {
                    this.timeline.cancel();
                }
                fireEvent(this, 'cancel');
            };
            /**
             * Start download of a MIDI file export of the timeline.
             * @function Highcharts.Sonification#downloadMIDI
             */
            Sonification.prototype.downloadMIDI = function () {
                if (!this.ready(this.downloadMIDI.bind(this))) {
                    return;
                }
                if (this.timeline) {
                    this.timeline.reset();
                    this.timeline.downloadMIDI();
                }
            };
            /**
             * Implementation of chart.sonify
             * @private
             */
            Sonification.prototype.sonifyChart = function (resetAfter, onEnd) {
                if (!this.ready(this.sonifyChart.bind(this, resetAfter, onEnd))) {
                    return;
                }
                if (this.timeline) {
                    this.timeline.reset();
                    this.beforePlay();
                    this.timeline.play(void 0, void 0, resetAfter, onEnd);
                }
            };
            /**
             * Implementation of series.sonify
             * @private
             */
            Sonification.prototype.sonifySeries = function (series, resetAfter, onEnd) {
                if (!this.ready(this.sonifySeries.bind(this, series, resetAfter, onEnd))) {
                    return;
                }
                if (this.timeline) {
                    this.timeline.reset();
                    this.beforePlay();
                    this.timeline.play(function (e) {
                        return !!e.relatedPoint && e.relatedPoint.series === series;
                    }, void 0, resetAfter, onEnd);
                }
            };
            /**
             * Implementation of point.sonify
             * @private
             */
            Sonification.prototype.sonifyPoint = function (point, onEnd) {
                if (!this.ready(this.sonifyPoint.bind(this, point, onEnd))) {
                    return;
                }
                if (this.timeline) {
                    this.timeline.reset();
                    this.beforePlay();
                    this.timeline.anchorPlayMoment(function (e) { return e.relatedPoint === point; }, onEnd);
                }
            };
            /**
             * Set the overall/master volume for the sonification.
             * Usually handled through chart update.
             * @private
             */
            Sonification.prototype.setMasterVolume = function (vol) {
                if (this.timeline) {
                    this.timeline.setMasterVolume(vol);
                }
            };
            /**
             * Destroy the sonification capabilities
             * @private
             */
            Sonification.prototype.destroy = function () {
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
            };
            /**
             * Update the timeline with latest chart changes. Usually handled
             * automatically. Note that the [sonification.updateInterval](https://api.highcharts.com/highcharts/sonification.updateInterval)
             * option can stop updates from happening in rapid succession, including
             * manual calls to this function.
             * @private
             */
            Sonification.prototype.update = function () {
                var sOpts = this.chart.options && this.chart.options.sonification;
                if (!this.ready(this.update.bind(this)) || !sOpts) {
                    return;
                }
                // Don't update too often, it gets performance intensive
                var now = Date.now(),
                    updateInterval = sOpts.updateInterval;
                if (now - this.lastUpdate < updateInterval && !this.forceReady) {
                    clearTimeout(this.scheduledUpdate);
                    this.scheduledUpdate = setTimeout(this.update.bind(this), updateInterval / 2);
                    return;
                }
                var events = sOpts.events || {};
                if (events.beforeUpdate) {
                    events.beforeUpdate({ chart: this.chart, timeline: this.timeline });
                }
                this.lastUpdate = now;
                if (this.timeline) {
                    this.timeline.destroy();
                }
                if (this.audioContext && this.audioDestination) {
                    this.timeline = timelineFromChart(this.audioContext, this.audioDestination, this.chart);
                    var sOpts_1 = this.chart.options.sonification;
                    this.timeline.setMasterVolume(pick(sOpts_1 && sOpts_1.masterVolume, 1));
                }
                if (events.afterUpdate) {
                    events.afterUpdate({ chart: this.chart, timeline: this.timeline });
                }
            };
            /**
             * Only continue if sonification enabled. If audioContext is
             * suspended, retry up to 20 times with a small delay.
             * @private
             */
            Sonification.prototype.ready = function (whenReady) {
                var _this = this;
                if (!this.audioContext ||
                    !this.audioDestination ||
                    !this.chart.options ||
                    this.chart.options.sonification &&
                        this.chart.options.sonification.enabled === false) {
                    return false;
                }
                if (this.audioContext.state === 'suspended' && !this.forceReady) {
                    if (this.retryContextCounter++ < 20) {
                        setTimeout(function () {
                            if (_this.audioContext &&
                                _this.audioContext.state === 'suspended') {
                                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                _this.audioContext.resume().then(whenReady);
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
            };
            /**
             * Call beforePlay event handler if exists
             * @private
             */
            Sonification.prototype.beforePlay = function () {
                var opts = this.chart.options.sonification,
                    beforePlay = opts && opts.events && opts.events.beforePlay;
                if (beforePlay) {
                    beforePlay({ chart: this.chart, timeline: this.timeline });
                }
            };
            /**
             * Initialize the builtin boundary hit instrument
             * @private
             */
            Sonification.prototype.initBoundaryInstrument = function () {
                if (!this.boundaryInstrument) {
                    this.boundaryInstrument = new SynthPatch(this.audioContext, merge(InstrumentPresets.chop, { masterVolume: 0.3 }));
                    this.boundaryInstrument.startSilently();
                    this.boundaryInstrument.connect(this.audioDestination);
                }
            };
            /**
             * The default boundary hit sound
             * @private
             */
            Sonification.prototype.defaultBoundaryHit = function () {
                if (this.boundaryInstrument) {
                    this.boundaryInstrument.playFreqAtTime(0.1, 1, 200);
                    this.boundaryInstrument.playFreqAtTime(0.2, 1, 200);
                }
            };
            return Sonification;
        }());
        (function (Sonification) {
            var composedClasses = [];
            /**
             * Update sonification object on chart.
             * @private
             */
            function updateSonificationEnabled() {
                var sonification = this.sonification,
                    sOptions = this.options && this.options.sonification;
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
                var newOptions = e.options.sonification;
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
                        updateSonificationEnabled: updateSonificationEnabled,
                        sonify: function (onEnd) {
                            if (this.sonification) {
                                this.sonification.sonifyChart(false, onEnd);
                            }
                        },
                        toggleSonify: function (reset, onEnd) {
                            if (reset === void 0) { reset = true; }
                            if (!this.sonification) {
                                return;
                            }
                            var timeline = this.sonification.timeline;
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
                var exportingOptions = getOptions().exporting;
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

        return Sonification;
    });
    _registerModule(_modules, 'Extensions/Sonification/Scales.js', [], function () {
        /* *
         *
         *  (c) 2009-2022 Øystein Moseng
         *
         *  Musical scales for sonification.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var Scales = {
                minor: [0, 2, 3, 5, 7, 8, 10],
                dorian: [0, 2, 3, 5, 7, 9, 10],
                harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
                phrygian: [0, 1, 3, 5, 7, 8, 11],
                major: [0, 2, 4, 5, 7, 9, 11],
                lydian: [0, 2, 4, 6, 7, 9, 11],
                mixolydian: [0, 2, 4, 5, 7, 9, 10],
                majorPentatonic: [0, 2, 4, 7, 9],
                minorPentatonic: [0, 3, 5, 7, 10]
            };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API declarations
         *
         * */
        /**
         * Preset scales for pitch mapping.
         * @requires modules/sonification
         * @interface Highcharts.SonificationScalePresetsObject
         */ /**
        * Minor scale (aeolian)
        * @name Highcharts.SonificationScalePresetsObject#minor
        * @type {Array<number>}
        */ /**
        * Dorian scale
        * @name Highcharts.SonificationScalePresetsObject#dorian
        * @type {Array<number>}
        */ /**
        * Harmonic minor scale
        * @name Highcharts.SonificationScalePresetsObject#harmonicMinor
        * @type {Array<number>}
        */ /**
        * Phrygian scale
        * @name Highcharts.SonificationScalePresetsObject#phrygian
        * @type {Array<number>}
        */ /**
        * Major (ionian) scale
        * @name Highcharts.SonificationScalePresetsObject#major
        * @type {Array<number>}
        */ /**
        * Lydian scale
        * @name Highcharts.SonificationScalePresetsObject#lydian
        * @type {Array<number>}
        */ /**
        * Mixolydian scale
        * @name Highcharts.SonificationScalePresetsObject#mixolydian
        * @type {Array<number>}
        */ /**
        * Major pentatonic scale
        * @name Highcharts.SonificationScalePresetsObject#majorPentatonic
        * @type {Array<number>}
        */ /**
        * Minor pentatonic scale
        * @name Highcharts.SonificationScalePresetsObject#minorPentatonic
        * @type {Array<number>}
        */
        (''); // Keep above doclets in JS file

        return Scales;
    });
    _registerModule(_modules, 'masters/modules/sonification.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Sonification/Sonification.js'], _modules['Extensions/Sonification/SynthPatch.js'], _modules['Extensions/Sonification/InstrumentPresets.js'], _modules['Extensions/Sonification/Scales.js'], _modules['Extensions/Sonification/SonificationInstrument.js'], _modules['Extensions/Sonification/SonificationSpeaker.js'], _modules['Extensions/Sonification/SonificationTimeline.js']], function (Highcharts, Sonification, SynthPatch, InstrumentPresets, Scales, SonificationInstrument, SonificationSpeaker, SonificationTimeline) {

        var G = Highcharts;
        // Global objects
        G.sonification = {
            InstrumentPresets: InstrumentPresets,
            Scales: Scales,
            SynthPatch: SynthPatch,
            SonificationInstrument: SonificationInstrument,
            SonificationSpeaker: SonificationSpeaker,
            SonificationTimeline: SonificationTimeline,
            Sonification: Sonification
        };
        Sonification.compose(G.Chart, G.Series, G.Point);

    });
}));