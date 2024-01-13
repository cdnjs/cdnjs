import { Source } from '../interfaces';
export declare function getExtension(url: string): string;
export declare function isHlsSource(media: Source): boolean;
export declare function isM3USource(media: Source): boolean;
export declare function isDashSource(media: Source): boolean;
export declare function isFlvSource(media: Source): boolean;
export declare function predictMimeType(url: string, element: HTMLMediaElement): string;
export declare function isAutoplaySupported(media: HTMLMediaElement, defaultVol: number, autoplay: (playing: boolean) => void, muted: (playing: boolean) => void, callback: () => void): void;
