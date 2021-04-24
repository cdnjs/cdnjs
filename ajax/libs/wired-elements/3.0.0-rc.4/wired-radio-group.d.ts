import { TemplateResult, LitElement } from 'lit';
export declare class WiredRadioGroup extends LitElement {
    selected?: string;
    private radioNodes;
    private checkListener;
    static get styles(): import("lit").CSSResultGroup;
    render(): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleChecked;
    slotChange(): void;
    firstUpdated(): void;
    updated(): void;
    private selectPrevious;
    private selectNext;
    private fireSelected;
}
