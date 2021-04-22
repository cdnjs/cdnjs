import { WiredBase, Point } from './wired-base';
import { TemplateResult, PropertyValues } from 'lit';
export declare class WiredCard extends WiredBase {
    elevation: number;
    fill?: string;
    private resizeObserver?;
    private windowResizeHandler?;
    private roAttached;
    constructor();
    static get styles(): import("lit").CSSResultGroup[];
    render(): TemplateResult;
    updated(changed: PropertyValues): void;
    disconnectedCallback(): void;
    private attachResizeListener;
    private detachResizeListener;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
}
