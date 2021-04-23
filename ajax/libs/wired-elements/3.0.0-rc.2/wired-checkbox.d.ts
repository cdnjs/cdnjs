import { WiredBase, Point } from './wired-base';
import { TemplateResult } from 'lit';
export declare class WiredCheckbox extends WiredBase {
    checked: boolean;
    disabled: boolean;
    private focused;
    private input?;
    private svgCheck?;
    static get styles(): import("lit").CSSResultGroup[];
    focus(): void;
    wiredRender(force?: boolean): void;
    render(): TemplateResult;
    private onChange;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refreshCheckVisibility;
}
