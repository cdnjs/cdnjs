// Type definitions for qr-scanner
// Project: @nimiq/qr-scanner
// Definitions by: Nimiq <www.nimiq.com>

declare class QrScanner {
    static DEFAULT_CANVAS_SIZE: number;
    static WORKER_PATH: string;

    static hasCamera(): Promise<boolean>;

    constructor(video: HTMLVideoElement, onDecode: Function, canvasSize?: number);

    destroy(): void;
    start(): Promise<void>;
    stop(): void;
    pause(): void;
    setGrayscaleWeights(red: number, green: number, blue: number, useIntegerApproximation?: boolean): void;
    setInversionMode(inversionMode: QrScanner.InversionMode): void;
    static scanImage(
        imageOrFileOrUrl: HTMLCanvasElement | HTMLVideoElement | ImageBitmap | HTMLImageElement | File | URL | String,
        sourceRect?: QrScanner.SourceRect | null,
        worker?: Worker | null,
        canvas?: HTMLCanvasElement | null,
        fixedCanvasSize?: boolean,
        alsoTryWithoutSourceRect?: boolean
    ): Promise<string>;
}

// exported types
declare namespace QrScanner {
    export interface SourceRect {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }

    export type InversionMode = 'original' | 'invert' | 'both';
}

export default QrScanner;
