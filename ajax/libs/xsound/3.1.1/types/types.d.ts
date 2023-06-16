import { XSound } from './main';
declare global {
    interface Window {
        XSound?: typeof XSound;
        X?: typeof XSound;
        webkitAudioContext: typeof AudioContext;
    }
}
export declare type BufferSize = 0 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384;
export declare type ChannelNumber = -1 | 0 | 1;
export declare type MMLScheduleWorkerEventType = 'schedule' | 'next' | 'stop';
export declare type MMLScheduleWorkerEventData = {
    type: MMLScheduleWorkerEventType;
    duration?: number;
};
//# sourceMappingURL=types.d.ts.map