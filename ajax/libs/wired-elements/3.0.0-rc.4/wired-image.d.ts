import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredImage extends WiredBase {
    elevation: number;
    src: string;
    private resizeObserver?;
    private windowResizeHandler?;
    private roAttached;
    constructor();
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    updated(): void;
    disconnectedCallback(): void;
    private attachResizeListener;
    private detachResizeListener;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
}
