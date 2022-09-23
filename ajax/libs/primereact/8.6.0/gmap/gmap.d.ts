import * as React from 'react';

interface GMapEventParams {
    originalEvent: React.SyntheticEvent;
    overlay: any;
    map: any;
}

export interface GMapProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    options?: object;
    overlays?: any[];
    onMapReady?(map: any): void;
    onMapClick?(event: React.SyntheticEvent): void;
    onMapDragEnd?(): void;
    onZoomChanged?(): void;
    onOverlayDragStart?(event: React.SyntheticEvent): void;
    onOverlayDrag?(event: React.SyntheticEvent): void;
    onOverlayDragEnd?(event: React.SyntheticEvent): void;
    onOverlayClick?(e: GMapEventParams): void;
    children?: React.ReactNode;
}

export declare class GMap extends React.Component<GMapProps, any> {
    public getMap(): any;
    public getElement(): HTMLDivElement;
}
