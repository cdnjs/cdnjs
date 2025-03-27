import Despot from "../../../util/Despot";
import Visuals from "../../visuals";
import { VideomailClientOptions } from "../../../types/options";
declare class RecorderInsides extends Despot {
    private recordNote;
    private recordTimer;
    private countdown?;
    private facingMode?;
    private pausedNote?;
    private built;
    constructor(visuals: Visuals, options: VideomailClientOptions);
    private startRecording;
    private resumeRecording;
    private stopRecording;
    private pauseRecording;
    private onResetting;
    private initEvents;
    build(): void;
    unload(): void;
    showPause(): void;
    hidePause(): void;
    hideCountdown(): void;
    startCountdown(cb: any): void;
    resumeCountdown(): void;
    isCountingDown(): boolean | undefined;
    checkTimer(elapsedTime: number): void;
}
export default RecorderInsides;
