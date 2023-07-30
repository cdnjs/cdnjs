import { XSound } from './main';
declare global {
    interface Window {
        XSound?: typeof XSound;
        X?: typeof XSound;
        webkitAudioContext: typeof AudioContext;
    }
}
export declare type ChannelNumber = -1 | 0 | 1;
//# sourceMappingURL=types.d.ts.map