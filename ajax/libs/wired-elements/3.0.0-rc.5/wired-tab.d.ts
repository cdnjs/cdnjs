import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
import './wired-item.js';
export declare class WiredTab extends WiredBase {
    name: string;
    label: string;
    private resizeObserver?;
    private windowResizeHandler?;
    constructor();
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    updated(): void;
    disconnectedCallback(): void;
    private attachResizeListener;
    private detachResizeListener;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, s: Point): void;
}
