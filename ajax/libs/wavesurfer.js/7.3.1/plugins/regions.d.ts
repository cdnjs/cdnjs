/**
 * Regions are visual overlays on the waveform that can be used to mark segments of audio.
 * Regions can be clicked on, dragged and resized.
 * You can set the color and content of each region, as well as their HTML content.
 */
import BasePlugin, { type BasePluginEvents } from '../base-plugin.js';
import EventEmitter from '../event-emitter.js';
export type RegionsPluginOptions = undefined;
export type RegionsPluginEvents = BasePluginEvents & {
    'region-created': [region: Region];
    'region-updated': [region: Region];
    'region-clicked': [region: Region, e: MouseEvent];
    'region-double-clicked': [region: Region, e: MouseEvent];
    'region-in': [region: Region];
    'region-out': [region: Region];
};
export type RegionEvents = {
    /** Before the region is removed */
    remove: [];
    /** When the region's parameters are being updated */
    update: [];
    /** When dragging or resizing is finished */
    'update-end': [];
    /** On play */
    play: [];
    /** On mouse click */
    click: [event: MouseEvent];
    /** Double click */
    dblclick: [event: MouseEvent];
    /** Mouse over */
    over: [event: MouseEvent];
    /** Mouse leave */
    leave: [event: MouseEvent];
};
export type RegionParams = {
    /** The id of the region, any string */
    id?: string;
    /** The start position of the region (in seconds) */
    start: number;
    /** The end position of the region (in seconds) */
    end?: number;
    /** Allow/dissallow dragging the region */
    drag?: boolean;
    /** Allow/dissallow resizing the region */
    resize?: boolean;
    /** The color of the region (CSS color) */
    color?: string;
    /** Content string or HTML element */
    content?: string | HTMLElement;
    /** Min length when resizing (in seconds) */
    minLength?: number;
    /** Max length when resizing (in seconds) */
    maxLength?: number;
};
declare class SingleRegion extends EventEmitter<RegionEvents> {
    private totalDuration;
    element: HTMLElement;
    id: string;
    start: number;
    end: number;
    drag: boolean;
    resize: boolean;
    color: string;
    content?: HTMLElement;
    minLength: number;
    maxLength: number;
    constructor(params: RegionParams, totalDuration: number);
    private setPart;
    private initElement;
    private renderPosition;
    private initMouseEvents;
    private onStartMoving;
    private onEndMoving;
    _onUpdate(dx: number, side?: 'start' | 'end'): void;
    private onMove;
    private onResize;
    private onEndResizing;
    _setTotalDuration(totalDuration: number): void;
    /** Play the region from the start */
    play(): void;
    /** Set the HTML content of the region */
    setContent(content: RegionParams['content']): void;
    /** Update the region's options */
    setOptions(options: Omit<RegionParams, 'minLength' | 'maxLength'>): void;
    /** Remove the region */
    remove(): void;
}
declare class RegionsPlugin extends BasePlugin<RegionsPluginEvents, RegionsPluginOptions> {
    private regions;
    private regionsContainer;
    /** Create an instance of RegionsPlugin */
    constructor(options?: RegionsPluginOptions);
    /** Create an instance of RegionsPlugin */
    static create(options?: RegionsPluginOptions): RegionsPlugin;
    /** Called by wavesurfer, don't call manually */
    onInit(): void;
    private initRegionsContainer;
    /** Get all created regions */
    getRegions(): Region[];
    private avoidOverlapping;
    private saveRegion;
    /** Create a region with given parameters */
    addRegion(options: RegionParams): Region;
    /**
     * Enable creation of regions by dragging on an empty space on the waveform.
     * Returns a function to disable the drag selection.
     */
    enableDragSelection(options: Omit<RegionParams, 'start' | 'end'>): () => void;
    /** Remove all regions */
    clearRegions(): void;
    /** Destroy the plugin and clean up */
    destroy(): void;
}
export default RegionsPlugin;
export type Region = SingleRegion;
