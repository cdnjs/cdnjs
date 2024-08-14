/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Class representing a Synth Patch, used by Instruments in the
 *  sonification.js module.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
const { clamp, defined, pick } = U;
/**
 * Get the multiplier value from a pitch tracked multiplier. The parameter
 * specifies the multiplier at ca 3200Hz. It is 1 at ca 50Hz. In between
 * it is mapped logarithmically.
 * @private
 * @param {number} multiplier The multiplier to track.
 * @param {number} freq The current frequency.
 */
function getPitchTrackedMultiplierVal(multiplier, freq) {
    const a = 0.2414 * multiplier - 0.2414, b = (3.5 - 1.7 * multiplier) / 1.8;
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
function scheduleGainEnvelope(envelope, type, time, gainNode, volumeMultiplier = 1) {
    const isAtk = type === 'attack', gain = gainNode.gain;
    gain.cancelScheduledValues(time);
    if (!envelope.length) {
        miniRampToVolAtTime(gainNode, time, isAtk ? volumeMultiplier : 0);
        return;
    }
    if (envelope[0].t > 1) {
        envelope.unshift({ t: 0, vol: isAtk ? 0 : 1 });
    }
    envelope.forEach((ep, ix) => {
        const prev = envelope[ix - 1], delta = prev ? (ep.t - prev.t) / 1000 : 0, startTime = time + (prev ? prev.t / 1000 + SynthPatch.stopRampTime : 0);
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
class PulseOscNode {
    constructor(context, options) {
        this.pulseWidth = Math.min(Math.max(0, options.pulseWidth || 0.5));
        const makeOsc = () => new OscillatorNode(context, {
            type: 'sawtooth',
            detune: options.detune,
            frequency: Math.max(1, options.frequency || 350)
        });
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
    connect(destination) {
        this.masterGain.connect(destination);
    }
    // Polymorph with normal osc.frequency API
    getFrequencyFacade() {
        const pulse = this;
        return {
            cancelScheduledValues(fromTime) {
                pulse.sawOscA.frequency.cancelScheduledValues(fromTime);
                pulse.sawOscB.frequency.cancelScheduledValues(fromTime);
                pulse.delayNode.delayTime.cancelScheduledValues(fromTime);
                return pulse.sawOscA.frequency;
            },
            setValueAtTime(frequency, time) {
                this.cancelScheduledValues(time);
                pulse.sawOscA.frequency.setValueAtTime(frequency, time);
                pulse.sawOscB.frequency.setValueAtTime(frequency, time);
                pulse.delayNode.delayTime.setValueAtTime(Math.round(10000 * pulse.pulseWidth / frequency) / 10000, time);
                return pulse.sawOscA.frequency;
            },
            setTargetAtTime(frequency, time, timeConstant) {
                this.cancelScheduledValues(time);
                pulse.sawOscA.frequency
                    .setTargetAtTime(frequency, time, timeConstant);
                pulse.sawOscB.frequency
                    .setTargetAtTime(frequency, time, timeConstant);
                pulse.delayNode.delayTime.setTargetAtTime(Math.round(10000 * pulse.pulseWidth / frequency) / 10000, time, timeConstant);
                return pulse.sawOscA.frequency;
            }
        };
    }
    getPWMTarget() {
        return this.delayNode.delayTime;
    }
    start() {
        this.sawOscA.start();
        this.sawOscB.start();
    }
    stop(time) {
        this.sawOscA.stop(time);
        this.sawOscB.stop(time);
    }
}
/**
 * Internal class used by SynthPatch
 * @class
 * @private
 */
class Oscillator {
    constructor(audioContext, options, destination) {
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
    connect(destination) {
        [
            this.lowpassNode,
            this.highpassNode,
            this.volTrackingNode,
            this.vmNode,
            this.gainNode,
            this.whiteNoise,
            this.pulseNode,
            this.oscNode
        ].reduce((prev, cur) => (cur ?
            (cur.connect(prev), cur) :
            prev), destination);
    }
    start() {
        if (this.oscNode) {
            this.oscNode.start();
        }
        if (this.whiteNoise) {
            this.whiteNoise.start();
        }
        if (this.pulseNode) {
            this.pulseNode.start();
        }
    }
    stopAtTime(time) {
        if (this.oscNode) {
            this.oscNode.stop(time);
        }
        if (this.whiteNoise) {
            this.whiteNoise.stop(time);
        }
        if (this.pulseNode) {
            this.pulseNode.stop(time);
        }
    }
    setFreqAtTime(time, frequency, glideDuration = 0) {
        const opts = this.options, f = clamp(pick(opts.fixedFrequency, frequency) *
            (opts.freqMultiplier || 1), 0, 21000), oscTarget = this.getOscTarget(), timeConstant = glideDuration / 5000;
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
    }
    // Get target for FM synthesis if another oscillator wants to modulate.
    // Pulse nodes don't do FM, but do PWM instead.
    getFMTarget() {
        return this.oscNode && this.oscNode.detune ||
            this.whiteNoise && this.whiteNoise.detune ||
            this.pulseNode && this.pulseNode.getPWMTarget();
    }
    // Get target for volume modulation if another oscillator wants to modulate.
    getVMTarget() {
        return this.vmNode && this.vmNode.gain;
    }
    // Schedule one of the oscillator envelopes at a specified time in
    // seconds (in AudioContext timespace).
    runEnvelopeAtTime(type, time) {
        if (!this.gainNode) {
            return;
        }
        const env = (type === 'attack' ? this.options.attackEnvelope :
            this.options.releaseEnvelope) || [];
        scheduleGainEnvelope(env, type, time, this.gainNode, this.options.volume);
    }
    // Cancel any envelopes or frequency changes currently scheduled
    cancelScheduled() {
        if (this.gainNode) {
            this.gainNode.gain
                .cancelScheduledValues(this.audioContext.currentTime);
        }
        const oscTarget = this.getOscTarget();
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
    }
    // Set the pitch dependent volume to fit some frequency at some time
    scheduleVolTrackingChange(frequency, time, glideDuration) {
        if (this.volTrackingNode) {
            const v = getPitchTrackedMultiplierVal(this.options.volumePitchTrackingMultiplier || 1, frequency), rampTime = glideDuration ? glideDuration / 1000 :
                SynthPatch.stopRampTime;
            this.volTrackingNode.gain.cancelScheduledValues(time);
            this.volTrackingNode.gain.setTargetAtTime(v, time, rampTime / 5);
            this.volTrackingNode.gain.setValueAtTime(v, time + rampTime);
        }
    }
    // Set the pitch dependent filter frequency to fit frequency at some time
    scheduleFilterTrackingChange(frequency, time, glideDuration) {
        const opts = this.options, rampTime = glideDuration ? glideDuration / 1000 :
            SynthPatch.stopRampTime, scheduleFilterTarget = (filterNode, filterOptions) => {
            const multiplier = getPitchTrackedMultiplierVal(filterOptions.frequencyPitchTrackingMultiplier || 1, frequency), f = clamp((filterOptions.frequency || 1000) * multiplier, 0, 21000);
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
    }
    createGain() {
        const opts = this.options, needsGainNode = defined(opts.volume) ||
            opts.attackEnvelope && opts.attackEnvelope.length ||
            opts.releaseEnvelope && opts.releaseEnvelope.length;
        if (needsGainNode) {
            this.gainNode = new GainNode(this.audioContext, {
                gain: pick(opts.volume, 1)
            });
        }
        // We always need VM gain, so make that
        this.vmNode = new GainNode(this.audioContext);
    }
    // Create the oscillator or audio buffer acting as the sound source
    createSoundSource() {
        const opts = this.options, ctx = this.audioContext, frequency = (opts.fixedFrequency || 0) *
            (opts.freqMultiplier || 1);
        if (opts.type === 'whitenoise') {
            const bSize = ctx.sampleRate * 2, buffer = ctx.createBuffer(1, bSize, ctx.sampleRate), data = buffer.getChannelData(0);
            for (let i = 0; i < bSize; ++i) {
                // More pleasant "white" noise with less variance than -1 to +1
                data[i] = Math.random() * 1.2 - 0.6;
            }
            const wn = this.whiteNoise = ctx.createBufferSource();
            wn.buffer = buffer;
            wn.loop = true;
        }
        else if (opts.type === 'pulse') {
            this.pulseNode = new PulseOscNode(ctx, {
                detune: opts.detune,
                pulseWidth: opts.pulseWidth,
                frequency
            });
        }
        else {
            this.oscNode = new OscillatorNode(ctx, {
                type: opts.type || 'sine',
                detune: opts.detune,
                frequency
            });
        }
    }
    // Lowpass/Highpass filters
    createFilters() {
        const opts = this.options;
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
    }
    // Gain node used for frequency dependent volume tracking
    createVolTracking() {
        const opts = this.options;
        if (opts.volumePitchTrackingMultiplier &&
            opts.volumePitchTrackingMultiplier !== 1) {
            this.volTrackingNode = new GainNode(this.audioContext, {
                gain: 1
            });
        }
    }
    // Get the oscillator frequency target
    getOscTarget() {
        return this.oscNode ? this.oscNode.frequency :
            this.pulseNode && this.pulseNode.getFrequencyFacade();
    }
}
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
class SynthPatch {
    constructor(audioContext, options) {
        this.audioContext = audioContext;
        this.options = options;
        this.eqNodes = [];
        this.midiInstrument = options.midiInstrument || 1;
        this.outputNode = new GainNode(audioContext, { gain: 0 });
        this.createEqChain(this.outputNode);
        const inputNode = this.eqNodes.length ?
            this.eqNodes[0] : this.outputNode;
        this.oscillators = (this.options.oscillators || []).map((oscOpts) => new Oscillator(audioContext, oscOpts, defined(oscOpts.fmOscillator) || defined(oscOpts.vmOscillator) ?
            void 0 : inputNode));
        // Now that we have all oscillators, connect the ones
        // that are used for modulation.
        this.oscillators.forEach((osc) => {
            const connectTarget = (targetFunc, targetOsc) => {
                if (targetOsc) {
                    const target = targetOsc[targetFunc]();
                    if (target) {
                        osc.connect(target);
                    }
                }
            };
            if (defined(osc.fmOscillatorIx)) {
                connectTarget('getFMTarget', this.oscillators[osc.fmOscillatorIx]);
            }
            if (defined(osc.vmOscillatorIx)) {
                connectTarget('getVMTarget', this.oscillators[osc.vmOscillatorIx]);
            }
        });
    }
    /**
     * Start the oscillators, but don't output sound.
     * @function Highcharts.SynthPatch#startSilently
     */
    startSilently() {
        this.outputNode.gain.value = 0;
        this.oscillators.forEach((o) => o.start());
    }
    /**
     * Stop the synth. It can't be started again.
     * @function Highcharts.SynthPatch#stop
     */
    stop() {
        const curTime = this.audioContext.currentTime, endTime = curTime + SynthPatch.stopRampTime;
        miniRampToVolAtTime(this.outputNode, curTime, 0);
        this.oscillators.forEach((o) => o.stopAtTime(endTime));
        this.outputNode.disconnect();
    }
    /**
     * Mute sound at time (in seconds).
     * Will still run release envelope. Note: If scheduled multiple times in
     * succession, the release envelope will run, and that could make sound.
     * @function Highcharts.SynthPatch#silenceAtTime
     * @param {number} time Time offset from now, in seconds
     */
    silenceAtTime(time) {
        if (!time && this.outputNode.gain.value < 0.01) {
            this.outputNode.gain.value = 0;
            return; // Skip if not needed
        }
        this.releaseAtTime((time || 0) + this.audioContext.currentTime);
    }
    /**
     * Mute sound immediately.
     * @function Highcharts.SynthPatch#mute
     */
    mute() {
        this.cancelScheduled();
        miniRampToVolAtTime(this.outputNode, this.audioContext.currentTime, 0);
    }
    /**
     * Play a frequency at time (in seconds).
     * Time denotes when the attack ramp starts. Note duration is given in
     * milliseconds. If note duration is not given, the note plays indefinitely.
     * @function Highcharts.SynthPatch#silenceAtTime
     * @param {number} time Time offset from now, in seconds
     * @param {number} frequency The frequency to play at
     * @param {number|undefined} noteDuration Duration to play, in milliseconds
     */
    playFreqAtTime(time, frequency, noteDuration) {
        const t = (time || 0) + this.audioContext.currentTime, opts = this.options;
        this.oscillators.forEach((o) => {
            o.setFreqAtTime(t, frequency, opts.noteGlideDuration);
            o.runEnvelopeAtTime('attack', t);
        });
        scheduleGainEnvelope(opts.masterAttackEnvelope || [], 'attack', t, this.outputNode, opts.masterVolume);
        if (noteDuration) {
            this.releaseAtTime(t + noteDuration / 1000);
        }
    }
    /**
     * Cancel any scheduled actions
     * @function Highcharts.SynthPatch#cancelScheduled
     */
    cancelScheduled() {
        this.outputNode.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.oscillators.forEach((o) => o.cancelScheduled());
    }
    /**
     * Connect the SynthPatch output to an audio node / destination.
     * @function Highcharts.SynthPatch#connect
     * @param {AudioNode} destinationNode The node to connect to.
     * @return {AudioNode} The destination node, to allow chaining.
     */
    connect(destinationNode) {
        return this.outputNode.connect(destinationNode);
    }
    /**
     * Create nodes for master EQ
     * @private
     */
    createEqChain(outputNode) {
        this.eqNodes = (this.options.eq || []).map((eqDef) => new BiquadFilterNode(this.audioContext, {
            type: 'peaking',
            ...eqDef
        }));
        // Connect nodes
        this.eqNodes.reduceRight((chain, node) => {
            node.connect(chain);
            return node;
        }, outputNode);
    }
    /**
     * Fade by release envelopes at time
     * @private
     */
    releaseAtTime(time) {
        let maxReleaseDuration = 0;
        this.oscillators.forEach((o) => {
            const env = o.options.releaseEnvelope;
            if (env && env.length) {
                maxReleaseDuration = Math.max(maxReleaseDuration, env[env.length - 1].t);
                o.runEnvelopeAtTime('release', time);
            }
        });
        const masterEnv = this.options.masterReleaseEnvelope || [];
        if (masterEnv.length) {
            scheduleGainEnvelope(masterEnv, 'release', time, this.outputNode, this.options.masterVolume);
            maxReleaseDuration = Math.max(maxReleaseDuration, masterEnv[masterEnv.length - 1].t);
        }
        miniRampToVolAtTime(this.outputNode, time + maxReleaseDuration / 1000, 0);
    }
}
SynthPatch.stopRampTime = 0.012; // Ramp time to 0 when stopping sound
/* *
 *
 *  Default Export
 *
 * */
export default SynthPatch;
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
