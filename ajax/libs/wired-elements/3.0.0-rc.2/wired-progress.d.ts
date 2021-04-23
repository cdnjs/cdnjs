import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredProgress extends WiredBase {
    value: number;
    min: number;
    max: number;
    percentage: boolean;
    private progBox?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    private getProgressLabel;
    wiredRender(force?: boolean): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
    private refreshProgressFill;
}
