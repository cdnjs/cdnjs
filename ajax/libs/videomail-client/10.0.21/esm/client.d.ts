import { PartialVideomailClientOptions } from "./types/options";
import Videomail from "./types/Videomail";
import Despot from "./util/Despot";
export interface StartOverParams {
    keepHidden?: boolean | undefined;
}
export interface ShowParams {
    goBack?: boolean | undefined;
    playerOnly?: boolean | undefined;
}
declare class VideomailClient extends Despot {
    private container;
    static ENC_TYPE_APP_JSON: string;
    static ENC_TYPE_FORM: string;
    constructor(options?: PartialVideomailClientOptions);
    private validateOptions;
    build(): HTMLElement | null | undefined;
    show(params?: ShowParams): HTMLElement;
    startOver(params?: StartOverParams): void;
    unload(startingOver?: boolean): void;
    replay(videomail: Videomail, replayParentElementId?: string): HTMLVideoElement;
    hide(): void;
    getByAlias(alias: string): Promise<Videomail>;
    getByKey(key: string): Promise<Videomail>;
    isDirty(): boolean;
    isBuilt(): boolean;
    isRecording(): any;
    submit(): void;
    getLogLines(): string[] | undefined;
}
export default VideomailClient;
