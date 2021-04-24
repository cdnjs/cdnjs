import { TemplateResult, PropertyValues, LitElement } from 'lit';
import './wired-card';
import './wired-item';
interface ComboValue {
    value: string;
    text: string;
}
export declare class WiredCombo extends LitElement {
    value?: ComboValue;
    selected?: string;
    disabled: boolean;
    private svg?;
    private card?;
    private seed;
    private cardShowing;
    private itemNodes;
    private lastSelectedItem?;
    static get styles(): import("lit").CSSResultGroup;
    render(): TemplateResult;
    private refreshDisabledState;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    private refreshSelection;
    private setCardShowing;
    private onItemClick;
    private fireSelected;
    private selectPrevious;
    private selectNext;
    private onCombo;
}
export {};
