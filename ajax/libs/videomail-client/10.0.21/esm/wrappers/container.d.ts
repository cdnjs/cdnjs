import Despot from "../util/Despot";
import { FormInputs, FormMethod } from "./form";
import "./../styles/main.styl";
import { VideomailClientOptions } from "../types/options";
import { ShowParams, StartOverParams } from "../client";
import Videomail from "../types/Videomail";
interface BuildOptions {
    playerOnly?: boolean;
    replayParentElementId?: string | undefined;
    replayParentElement?: HTMLElement | undefined;
}
export interface UnloadParams {
    startingOver?: boolean;
    e?: Event;
}
export interface FormReadyParams {
    paused?: boolean | undefined;
}
declare class Container extends Despot {
    private readonly visibility;
    private readonly htmlElement;
    private readonly visuals;
    private readonly buttons;
    private readonly resource;
    private form;
    private hasError;
    private submitted;
    private lastValidation;
    private containerElement?;
    private built;
    constructor(options: VideomailClientOptions);
    private buildChildren;
    build(buildOptions?: BuildOptions): HTMLElement | null | undefined;
    private findParentFormElement;
    private getFormElement;
    buildForm(): void;
    private processError;
    private initEvents;
    private correctDimensions;
    private removeDimensions;
    private unloadChildren;
    private hideMySelf;
    private submitVideomail;
    limitWidth(width?: number): number | undefined;
    limitHeight(height: number): number;
    private areVisualsHidden;
    hasElement(): boolean;
    getSubmitButton(): HTMLButtonElement | undefined;
    querySelector(selector: string): HTMLElement | null | undefined;
    beginWaiting(): void;
    endWaiting(): void;
    appendChild(child: any): void;
    insertBefore(child: any, reference: any): void;
    unload(params?: UnloadParams): void;
    show(params?: ShowParams): HTMLElement;
    hide(): void;
    startOver(params?: StartOverParams): void;
    showReplayOnly(): void;
    isNotifying(): boolean | null | undefined;
    isPaused(): boolean | undefined;
    pause(params?: {
        event: MouseEvent;
    }): void;
    validate(event?: any, force?: boolean): boolean;
    disableForm(buttonsToo: boolean): void;
    enableForm(buttonsToo: boolean): void;
    hasForm(): boolean;
    private buttonsAreReady;
    submitAll(formData: FormInputs, method: FormMethod, url: string): Promise<void>;
    isBuilt(): boolean;
    isReplayShown(): boolean;
    isDirty(): boolean;
    getReplay(): import("./visuals/replay").default;
    isOutsideElementOf(element: HTMLElement): boolean;
    loadForm(videomail: Videomail): void;
    enableAudio(): void;
    disableAudio(): void;
    submit(): Promise<boolean | undefined>;
    isCountingDown(): boolean | undefined;
    isRecording(): any;
    record(): void;
    resume(): void;
    stop(): void;
    recordAgain(): void;
}
export default Container;
