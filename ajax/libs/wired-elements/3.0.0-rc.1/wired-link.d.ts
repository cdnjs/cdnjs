import { WiredBase, Point } from './wired-base';
import { TemplateResult, CSSResultArray } from 'lit';
export declare class WiredLink extends WiredBase {
    elevation: number;
    href?: string;
    target?: string;
    private anchor?;
    static get styles(): CSSResultArray;
    render(): TemplateResult;
    focus(): void;
    protected canvasSize(): Point;
    protected draw(svg: SVGSVGElement, size: Point): void;
}
