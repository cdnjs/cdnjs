import { VideomailClientOptions } from "../../../../types/options";
import Visuals from "../../../visuals";
declare class Countdown {
    private visuals;
    private options;
    private countdownElement?;
    private intervalId?;
    private countdown?;
    private paused;
    constructor(visuals: Visuals, options: VideomailClientOptions);
    private fire;
    private countBackward;
    start(cb: any): void;
    pause(): void;
    resume(): void;
    build(): void;
    show(): void;
    isCountingDown(): boolean;
    unload(): void;
    hide(): void;
}
export default Countdown;
