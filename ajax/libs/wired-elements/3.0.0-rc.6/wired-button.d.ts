import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredButton extends WiredBase {
    elevation: number;
    disabled: boolean;
    private button?;
    private ro?;
    private roAttached;
    constructor();
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    focus(): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    updated(): void;
    disconnectedCallback(): void;
    private attachResizeListener;
    private detachResizeListener;
}
