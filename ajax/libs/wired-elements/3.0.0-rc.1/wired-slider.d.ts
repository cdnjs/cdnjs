import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredSlider extends WiredBase {
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    private input?;
    private knob?;
    private canvasWidth;
    private pendingValue?;
    static get styles(): CSSResultArray;
    get value(): number;
    set value(v: number);
    firstUpdated(): void;
    render(): TemplateResult;
    focus(): void;
    private onInput;
    wiredRender(force?: boolean): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private updateThumbPosition;
}
