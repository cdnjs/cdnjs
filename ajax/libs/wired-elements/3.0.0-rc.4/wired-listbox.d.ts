import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
interface ListboxValue {
    value: string;
    text: string;
}
export declare class WiredListbox extends WiredBase {
    value?: ListboxValue;
    selected?: string;
    horizontal: boolean;
    private itemNodes;
    private lastSelectedItem?;
    private itemClickHandler;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    firstUpdated(): void;
    updated(): void;
    private onItemClick;
    private refreshSelection;
    private fireSelected;
    private selectPrevious;
    private selectNext;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
}
export {};
