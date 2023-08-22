import { XSound } from '/src/main';
declare global {
    interface Window {
        XSound?: typeof XSound;
        X?: typeof XSound;
        webkitAudioContext: typeof AudioContext;
    }
}
export type ChannelNumber = -1 | 0 | 1;
//# sourceMappingURL=types.d.ts.map