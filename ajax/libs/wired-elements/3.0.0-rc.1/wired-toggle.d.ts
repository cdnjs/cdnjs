import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredToggle extends WiredBase {
    checked: boolean;
    disabled: boolean;
    private input?;
    private knob?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    focus(): void;
    wiredRender(force?: boolean): void;
    private onChange;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refreshKnob;
}
