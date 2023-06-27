import BasePlugin from '../base-plugin.js';
import type { WaveSurferPluginParams } from '../wavesurfer.js';
export type RegionsPluginOptions = {
    dragSelection?: boolean;
    draggable?: boolean;
    resizable?: boolean;
};
export type Region = {
    startTime: number;
    endTime: number;
    title: string;
    start: number;
    end: number;
    element: HTMLElement;
};
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
declare class RegionsPlugin extends BasePlugin<RegionsPluginEvents, RegionsPluginOptions> {
    private dragStart;
    private regionsContainer;
    private regions;
    private createdRegion;
    private modifiedRegion;
    private isResizingLeft;
    private isMoving;
    private wasInteractive;
    /** Create an instance of RegionsPlugin */
    constructor(options?: RegionsPluginOptions);
    static create(options?: RegionsPluginOptions): RegionsPlugin;
    init(params: WaveSurferPluginParams): void;
    /** Unmount */
    destroy(): void;
    private initRegionsContainer;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private createRegionElement;
    private createRegion;
    private addRegion;
    private updateRegion;
    private moveRegion;
    /** Create a region at a given start and end time, with an optional title */
    add(startTime: number, endTime: number, title?: string, color?: string): Region;
    /** Set the background color of a region */
    setRegionColor(region: Region, color: string): void;
}
export default RegionsPlugin;
