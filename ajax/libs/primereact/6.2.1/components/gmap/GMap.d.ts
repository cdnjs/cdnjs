import * as React from 'react';

interface GMapProps {
    options?: object;
    overlays?: any[];
    style?: object;
    className?: string;
    onMapReady?(map: any): void;
    onMapClick?(event: Event): void;
    onMapDragEnd?(): void;
    onZoomChanged?(): void;
    onOverlayDragStart?(event: Event): void;
    onOverlayDrag?(event: Event): void;
    onOverlayDragEnd?(event: Event): void;
    onOverlayClick?(e: {originalEvent: Event, overlay: any, map: any}): void;
}

export class GMap extends React.Component<GMapProps,any> {}
