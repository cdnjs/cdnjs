/// <reference types="offscreencanvas" />
declare class QrScanner {
    static readonly DEFAULT_CANVAS_SIZE = 400;
    static readonly NO_QR_CODE_FOUND = "No QR code found";
    private static _disableBarcodeDetector;
    private static _workerMessageId;
    /** @deprecated */
    static set WORKER_PATH(workerPath: string);
    static hasCamera(): Promise<boolean>;
    static listCameras(requestLabels?: boolean): Promise<Array<QrScanner.Camera>>;
    readonly $video: HTMLVideoElement;
    readonly $canvas: HTMLCanvasElement;
    readonly $overlay?: HTMLDivElement;
    private readonly $codeOutlineHighlight?;
    private readonly _onDecode?;
    private readonly _legacyOnDecode?;
    private readonly _legacyCanvasSize;
    private _preferredCamera;
    private readonly _maxScansPerSecond;
    private _lastScanTimestamp;
    private _scanRegion;
    private _codeOutlineHighlightRemovalTimeout?;
    private _qrEnginePromise;
    private _active;
    private _paused;
    private _flashOn;
    private _destroyed;
    constructor(video: HTMLVideoElement, onDecode: (result: QrScanner.ScanResult) => void, options: {
        onDecodeError?: (error: Error | string) => void;
        calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion;
        preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId;
        maxScansPerSecond?: number;
        highlightScanRegion?: boolean;
        highlightCodeOutline?: boolean;
        overlay?: HTMLDivElement;
        /** just a temporary flag until we switch entirely to the new api */
        returnDetailedScanResult?: true;
    });
    /** @deprecated */
    constructor(video: HTMLVideoElement, onDecode: (result: string) => void, onDecodeError?: (error: Error | string) => void, calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion, preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId);
    /** @deprecated */
    constructor(video: HTMLVideoElement, onDecode: (result: string) => void, onDecodeError?: (error: Error | string) => void, canvasSize?: number, preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId);
    /** @deprecated */
    constructor(video: HTMLVideoElement, onDecode: (result: string) => void, canvasSize?: number);
    hasFlash(): Promise<boolean>;
    isFlashOn(): boolean;
    toggleFlash(): Promise<void>;
    turnFlashOn(): Promise<void>;
    turnFlashOff(): Promise<void>;
    destroy(): void;
    start(): Promise<void>;
    stop(): void;
    pause(stopStreamImmediately?: boolean): Promise<boolean>;
    setCamera(facingModeOrDeviceId: QrScanner.FacingMode | QrScanner.DeviceId): Promise<void>;
    static scanImage(imageOrFileOrBlobOrUrl: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap | SVGImageElement | File | Blob | URL | String, options: {
        scanRegion?: QrScanner.ScanRegion | null;
        qrEngine?: Worker | BarcodeDetector | Promise<Worker | BarcodeDetector> | null;
        canvas?: HTMLCanvasElement | null;
        disallowCanvasResizing?: boolean;
        alsoTryWithoutScanRegion?: boolean;
        /** just a temporary flag until we switch entirely to the new api */
        returnDetailedScanResult?: true;
    }): Promise<QrScanner.ScanResult>;
    /** @deprecated */
    static scanImage(imageOrFileOrBlobOrUrl: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap | SVGImageElement | File | Blob | URL | String, scanRegion?: QrScanner.ScanRegion | null, qrEngine?: Worker | BarcodeDetector | Promise<Worker | BarcodeDetector> | null, canvas?: HTMLCanvasElement | null, disallowCanvasResizing?: boolean, alsoTryWithoutScanRegion?: boolean): Promise<string>;
    setGrayscaleWeights(red: number, green: number, blue: number, useIntegerApproximation?: boolean): void;
    setInversionMode(inversionMode: QrScanner.InversionMode): void;
    static createQrEngine(): Promise<Worker | BarcodeDetector>;
    /** @deprecated */
    static createQrEngine(workerPath: string): Promise<Worker | BarcodeDetector>;
    private _onPlay;
    private _onLoadedMetaData;
    private _onVisibilityChange;
    private _calculateScanRegion;
    private _updateOverlay;
    private static _convertPoints;
    private _scanFrame;
    private _onDecodeError;
    private _getCameraStream;
    private _restartVideoStream;
    private static _stopVideoStream;
    private _setVideoMirror;
    private _getFacingMode;
    private static _drawToCanvas;
    private static _loadImage;
    private static _awaitImageLoad;
    private static _postWorkerMessage;
    private static _postWorkerMessageSync;
}
declare namespace QrScanner {
    interface ScanRegion {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        downScaledWidth?: number;
        downScaledHeight?: number;
    }
    type FacingMode = 'environment' | 'user';
    type DeviceId = string;
    interface Camera {
        id: DeviceId;
        label: string;
    }
    type InversionMode = 'original' | 'invert' | 'both';
    interface Point {
        x: number;
        y: number;
    }
    interface ScanResult {
        data: string;
        cornerPoints: QrScanner.Point[];
    }
}
declare class BarcodeDetector {
    constructor(options?: {
        formats: string[];
    });
    static getSupportedFormats(): Promise<string[]>;
    detect(image: ImageBitmapSource): Promise<Array<{
        rawValue: string;
        cornerPoints: QrScanner.Point[];
    }>>;
}
declare global {
    interface Navigator {
        readonly userAgentData?: {
            readonly platform: string;
            readonly brands: Array<{
                readonly brand: string;
                readonly version: string;
            }>;
            getHighEntropyValues(hints: string[]): Promise<{
                readonly architecture?: string;
                readonly platformVersion?: string;
            }>;
        };
    }
}
export default QrScanner;
