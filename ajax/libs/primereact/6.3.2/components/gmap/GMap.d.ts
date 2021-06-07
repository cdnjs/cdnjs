import * as React from 'react';

interface GMapEventParams {
    originalEvent: React.SyntheticEvent;
    overlay: any;
    map: any;
}

export interface GMapProps {
    options?: object;
    overlays?: any[];
    style?: object;
    className?: string;
    onMapReady?(map: any): void;
    onMapClick?(event: React.SyntheticEvent): void;
    onMapDragEnd?(): void;
    onZoomChanged?(): void;
    onOverlayDragStart?(event: React.SyntheticEvent): void;
    onOverlayDrag?(event: React.SyntheticEvent): void;
    onOverlayDragEnd?(event: React.SyntheticEvent): void;
    onOverlayClick?(e: GMapEventParams): void;
}

export declare class GMap extends React.Component<GMapProps, any> { }
