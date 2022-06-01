import { Level, Source } from '../interfaces';
import Native from './native';
declare class DashMedia extends Native {
    #private;
    constructor(element: HTMLMediaElement, mediaSource: Source, options?: unknown);
    canPlayType(mimeType: string): boolean;
    load(): void;
    destroy(): void;
    set src(media: Source);
    get levels(): Level[];
    set level(level: number);
    get level(): number;
    private _assign;
    private _preparePlayer;
}
export default DashMedia;
