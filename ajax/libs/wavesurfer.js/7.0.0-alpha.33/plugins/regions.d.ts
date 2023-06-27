import BasePlugin from '../base-plugin.js';
import EventEmitter from '../event-emitter.js';
import type { WaveSurferPluginParams } from '../wavesurfer.js';
export type RegionsPluginOptions = undefined;
export type RegionsPluginEvents = {
    'region-created': {
        region: Region;
    };
    'region-updated': {
        region: Region;
    };
    'region-clicked': {
        region: Region;
    };
};
export type RegionEvents = {
    remove: void;
    update: void;
    'update-end': void;
    play: void;
    click: {
        event: MouseEvent;
    };
    dblclick: {
        event: MouseEvent;
    };
    over: {
        event: MouseEvent;
    };
    leave: {
        event: MouseEvent;
    };
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
declare class Region extends EventEmitter<RegionEvents> {
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
    play(): void;
    setTotalDuration(totalDuration: number): void;
    remove(): void;
}
declare class RegionsPlugin extends BasePlugin<RegionsPluginEvents, RegionsPluginOptions> {
    private regions;
    private regionsContainer;
    /** Create an instance of RegionsPlugin */
    constructor(options?: RegionsPluginOptions);
    static create(options?: RegionsPluginOptions): RegionsPlugin;
    init(params: WaveSurferPluginParams): void;
    private initRegionsContainer;
    getRegions(): Region[];
    private avoidOverlapping;
    private saveRegion;
    addRegion(options: RegionParams): Region;
    add(start: number, end: number, content?: string, color?: string): Region;
    enableDragSelection(options: RegionParams): void;
    clearRegions(): void;
    destroy(): void;
}
export default RegionsPlugin;
