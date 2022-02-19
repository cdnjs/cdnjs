import { Level, Source } from '../interfaces';
import Native from './native';
declare class HlsMedia extends Native {
    #private;
    constructor(element: HTMLMediaElement, mediaSource: Source, autoplay?: boolean, options?: unknown);
    canPlayType(mimeType: string): boolean;
    load(): void;
    destroy(): void;
    set src(media: Source);
    get levels(): Level[];
    set level(level: number);
    get level(): number;
    private _create;
    private _assign;
    private _play;
    private _pause;
}
export default HlsMedia;
