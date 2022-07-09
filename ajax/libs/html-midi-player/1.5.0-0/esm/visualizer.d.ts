import * as mm from '@magenta/music/esm/core.js';
import { NoteSequence, INoteSequence } from '@magenta/music/esm/protobuf.js';
declare const VISUALIZER_TYPES: readonly ["piano-roll", "waterfall", "staff"];
declare type VisualizerType = typeof VISUALIZER_TYPES[number];
declare type Visualizer = mm.PianoRollSVGVisualizer | mm.WaterfallSVGVisualizer | mm.StaffSVGVisualizer;
/**
 * MIDI visualizer element.
 *
 * The visualizer is implemented via SVG elements which support styling as described
 * [here](https://magenta.github.io/magenta-js/music/demos/visualizer.html).
 *
 * See also the
 * [`@magenta/music/core/visualizer` docs](https://magenta.github.io/magenta-js/music/modules/_core_visualizer_.html).
 *
 * @prop src - MIDI file URL
 * @prop type - Visualizer type
 * @prop noteSequence - Magenta note sequence object representing the currently displayed content
 * @prop config - Magenta visualizer config object
 */
export declare class VisualizerElement extends HTMLElement {
    private domInitialized;
    private initTimeout;
    protected wrapper: HTMLDivElement;
    protected visualizer: Visualizer;
    protected ns: INoteSequence;
    protected _config: mm.VisualizerConfig;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string, _newValue: string): void;
    protected initVisualizer(): void;
    protected initVisualizerNow(): Promise<void>;
    reload(): void;
    redraw(activeNote?: NoteSequence.INote): void;
    clearActiveNotes(): void;
    get noteSequence(): INoteSequence | null;
    set noteSequence(value: INoteSequence | null);
    get src(): string | null;
    set src(value: string | null);
    get type(): VisualizerType;
    set type(value: VisualizerType);
    get config(): mm.VisualizerConfig;
    set config(value: mm.VisualizerConfig);
    protected setOrRemoveAttribute(name: string, value: string): void;
}
export {};
