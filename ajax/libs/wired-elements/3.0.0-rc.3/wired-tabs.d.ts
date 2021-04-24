import { TemplateResult, CSSResultArray, LitElement } from 'lit';
export declare class WiredTabs extends LitElement {
    selected?: string;
    private slotElement?;
    private pages;
    private pageMap;
    private current?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    private mapPages;
    firstUpdated(): void;
    updated(): void;
    private getElement;
    private selectPrevious;
    private selectNext;
}
