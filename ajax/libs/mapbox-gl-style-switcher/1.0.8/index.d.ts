import { IControl, Map as MapboxMap } from "mapbox-gl";
export declare type MapboxStyleDefinition = {
    title: string;
    uri: string;
};
export declare class MapboxStyleSwitcherControl implements IControl {
    private static readonly DEFAULT_STYLE;
    private static readonly DEFAULT_STYLES;
    private controlContainer;
    private map?;
    private mapStyleContainer;
    private styleButton;
    private styles;
    constructor(styles?: MapboxStyleDefinition[]);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
    private onDocumentClick;
}
