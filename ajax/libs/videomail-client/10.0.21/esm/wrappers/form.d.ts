import Despot from "../util/Despot";
import Container from "./container";
import { VideomailClientOptions } from "../types/options";
import Videomail from "../types/Videomail";
export type FormInputs = Record<string, string>;
export declare enum FormMethod {
    POST = "post",
    PUT = "put",
    GET = "get"
}
declare class Form extends Despot {
    private container;
    private formElement;
    private keyInput?;
    private readonly FORM_FIELDS;
    constructor(container: Container, formElement: HTMLFormElement, options: VideomailClientOptions);
    private getData;
    transformFormData(formInputs: FormInputs): import("../types/DeepPartial").DeepPartial<Videomail>;
    getRecipients(): import("../types/DeepPartial").DeepPartial<Videomail>;
    loadVideomail(videomail: Videomail): void;
    private setDisabled;
    private hideAll;
    private isRegisteredFormField;
    private getRegisteredFormElements;
    disable(buttonsToo: boolean): void;
    enable(buttonsToo: boolean): void;
    build(): void;
    private removeAllInputListeners;
    private hideSubmitButton;
    unload(): void;
    private resetForm;
    private startListeningToSubmitEvents;
    private stopListeningToSubmitEvents;
    doTheSubmit(e?: any): Promise<boolean>;
    getInvalidElement(): Element | null;
    findSubmitButton(): Element | null;
    hide(): void;
    show(): void;
}
export default Form;
