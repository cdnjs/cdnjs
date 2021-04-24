import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredRadio extends WiredBase {
    checked: boolean;
    disabled: boolean;
    name?: string;
    private focused;
    private input?;
    private svgCheck?;
    static get styles(): CSSResultArray;
    focus(): void;
    wiredRender(force?: boolean): void;
    render(): TemplateResult;
    private onChange;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refreshCheckVisibility;
}
