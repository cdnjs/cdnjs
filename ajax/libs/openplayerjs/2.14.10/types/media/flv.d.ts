import { Level, Source } from '../interfaces';
import Native from './native';
declare class FlvMedia extends Native {
    #private;
    constructor(element: HTMLMediaElement, mediaSource: Source, options?: unknown);
    canPlayType(mimeType: string): boolean;
    load(): void;
    destroy(): void;
    set src(media: Source);
    get levels(): Level[];
    set level(level: string);
    get level(): string;
    private _create;
    private _assign;
}
export default FlvMedia;
