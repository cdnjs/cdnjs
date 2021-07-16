import React from 'react';

type OverlayServiceActionType = 'overlay-click';

interface OverlayServiceParams {
    originalEvent: React.SyntheticEvent;
    target: HTMLElement;
}

export interface OverlayServiceOptions {
    on(action: OverlayServiceActionType, fn: any): void;
    emit(action: OverlayServiceActionType, params?: OverlayServiceParams): void;
    off(action: OverlayServiceActionType, fn: any): void;
}

export declare const OverlayService: OverlayServiceOptions;
