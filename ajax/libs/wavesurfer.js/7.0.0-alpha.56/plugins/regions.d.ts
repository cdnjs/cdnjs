/**
 * Regions are visual overlays on the waveform that can be used to mark segments of audio.
 * Regions can be clicked on, dragged and resized.
 * You can set the color and content of each region, as well as their HTML content.
 */
import BasePlugin from '../base-plugin.js';
import EventEmitter from '../event-emitter.js';
export type RegionsPluginOptions = undefined;
export type RegionsPluginEvents = {
    'region-created': [region: Region];
    'region-updated': [region: Region];
    'region-clicked': [region: Region, e: MouseEvent];
};
export type RegionEvents = {
    remove: [];
    update: [];
    'update-end': [];
    play: [];
    click: [event: MouseEvent];
    dblclick: [event: MouseEvent];
    over: [event: MouseEvent];
    leave: [event: MouseEvent];
};
export type RegionParams = {
    id?: string;
    start: number;
    end?: number;
    drag?: boolean;
    resize?: boolean;
    color?: string;
    content?: string | HTMLElement;
};
export declare class Region extends EventEmitter<RegionEvents> {
    private totalDuration;
    element: HTMLElement;
    id: string;
    start: number;
    end: number;
    drag: boolean;
    resize: boolean;
    color: string;
    content?: HTMLElement;
    constructor(params: RegionParams, totalDuration: number);
    private initElement;
    private renderPosition;
    private initMouseEvents;
    private onStartMoving;
    private onEndMoving;
    private onUpdate;
    private onMove;
    private onResize;
    private onEndResizing;
    _setTotalDuration(totalDuration: number): void;
    /** Play the region from start to end */
    play(): void;
    /** Update the region's options */
    setOptions(options: {
        color?: string;
        drag?: boolean;
        resize?: boolean;
        start?: number;
        end?: number;
    }): void;
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
