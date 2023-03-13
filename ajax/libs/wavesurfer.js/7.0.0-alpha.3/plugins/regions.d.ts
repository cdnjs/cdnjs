import BasePlugin from '../base-plugin.js';
import { WaveSurferPluginParams } from '../index.js';
type Region = {
    startTime: number;
    endTime: number;
    title: string;
    start: number;
    end: number;
    element: HTMLElement;
};
type RegionsPluginEvents = {
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
declare class RegionsPlugin extends BasePlugin<RegionsPluginEvents> {
    private dragStart;
    private container;
    private regions;
    private createdRegion;
    private modifiedRegion;
    private isResizingLeft;
    private isMoving;
    /** Create an instance of RegionsPlugin */
    constructor(params: WaveSurferPluginParams);
    /** Unmounts the regions */
    destroy(): void;
    private initContainer;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private createRegionElement;
    private createRegion;
    private addRegion;
    private updateRegion;
    private moveRegion;
    /** Create a region at a given start and end time, with an optional title */
    addRegionAtTime(startTime: number, endTime: number, title?: string): Region;
    /** Set the background color of a region */
    setRegionColor(region: Region, color: string): void;
}
export default RegionsPlugin;
