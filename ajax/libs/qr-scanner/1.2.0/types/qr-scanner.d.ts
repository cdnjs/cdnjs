// Type definitions for qr-scanner
// Project: @nimiq/qr-scanner
// Definitions by: Nimiq <www.nimiq.com>

declare class QrScanner {
    static DEFAULT_CANVAS_SIZE: number;
    static NO_QR_CODE_FOUND: string;
    static WORKER_PATH: string;

    static hasCamera(): Promise<boolean>;

    constructor(
        video: HTMLVideoElement,
        onDecode: (result: string) => void,
        onDecodeError?: (error: string) => void,
        canvasSize?: number,
        preferredFacingMode?: 'environment' | 'user',
    );
    /** @deprecated */
    constructor(video: HTMLVideoElement, onDecode: (result: string) => void, canvasSize?: number);

    hasFlash(): Promise<boolean>;
    isFlashOn(): boolean;
    toggleFlash(): Promise<void>;
    turnFlashOff(): Promise<void>;
    turnFlashOn(): Promise<void>;
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
    static createQrEnginge(workerPath?: string): Promise<Worker | BarcodeDetector>;
}

// simplified from https://wicg.github.io/shape-detection-api/#barcode-detection-api
declare class BarcodeDetector {
    constructor(options?: { formats: string[] });
    static getSupportedFormats(): Promise<string[]>;
    detect(image: ImageBitmapSource): Promise<Array<{ rawValue: string }>>;
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
