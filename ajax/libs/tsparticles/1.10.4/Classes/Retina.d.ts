import { Container } from "./Container";
export declare class Retina {
    isRetina: boolean;
    bubbleModeDistance: number;
    bubbleModeSize: number;
    connectModeDistance: number;
    connectModeRadius: number;
    grabModeDistance: number;
    repulseModeDistance: number;
    slowModeRadius: number;
    lineLinkedDistance: number;
    lineLinkedWidth: number;
    moveSpeed: number;
    sizeValue: number;
    sizeAnimationSpeed: number;
    polygonMaskMoveRadius: number;
    pxRatio: number;
    private readonly container;
    constructor(container: Container);
    init(): void;
    reset(): void;
}
