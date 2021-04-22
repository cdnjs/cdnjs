import { TemplateResult, LitElement } from 'lit';
export declare class WiredDialog extends LitElement {
    elevation: number;
    open: boolean;
    private card?;
    static get styles(): import("lit").CSSResultGroup;
    render(): TemplateResult;
    updated(): void;
}
