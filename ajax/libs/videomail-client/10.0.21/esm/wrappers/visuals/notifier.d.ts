import Despot from "../../util/Despot";
import Visuals from "../visuals";
import { VideomailClientOptions } from "../../types/options";
import VideomailError from "../../util/error/VideomailError";
interface MessageOptions {
    problem?: boolean;
}
interface NotifyOptions extends MessageOptions {
    stillWait?: boolean;
    entertain?: boolean;
    blocking?: boolean;
    classList?: string[] | undefined;
    removeDimensions?: boolean;
}
declare class Notifier extends Despot {
    private visuals;
    private notifyElement?;
    private messageElement?;
    private explanationElement?;
    private entertainTimeoutId?;
    private entertaining;
    private built;
    constructor(visuals: Visuals, options: VideomailClientOptions);
    private onStopping;
    private onConnecting;
    private onLoadingUserMedia;
    private onProgress;
    private onBeginVideoEncoding;
    private initEvents;
    private correctNotifierDimensions;
    private show;
    private runEntertainment;
    private cancelEntertainment;
    error(err: VideomailError): void;
    private getMessageElement;
    private setMessage;
    private setExplanation;
    build(): void;
    private hideMessage;
    private hideExplanation;
    hide(): void;
    isVisible(): boolean | null | undefined;
    isBuilt(): boolean;
    notify(message: string, explanation?: string, notifyOptions?: NotifyOptions): void;
}
export default Notifier;
