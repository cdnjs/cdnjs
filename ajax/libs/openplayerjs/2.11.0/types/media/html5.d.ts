import { Level, Source } from '../interfaces';
import Native from './native';
declare class HTML5Media extends Native {
    #private;
    constructor(element: HTMLMediaElement, mediaFile: Source);
    canPlayType(mimeType: string): boolean;
    load(): void;
    destroy(): HTML5Media;
    get levels(): Level[];
    set level(level: string);
    get level(): string;
    set src(media: Source);
    private _isDvrEnabled;
    private _readMediadataInfo;
    private _setTimeout;
    private _clearTimeout;
    private _dispatchError;
}
export default HTML5Media;
