import * as React from 'react';

declare namespace GMap {

    interface EventParams {
        originalEvent: React.SyntheticEvent;
        overlay: any;
        map: any;
    }

    interface GMapProps {
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
        onOverlayClick?(e: EventParams): void;
    }
}

export declare class GMap extends React.Component<GMap.GMapProps, any> { }
