import { LitElement, PropertyValues } from 'lit';
export declare type Point = [number, number];
export declare const BaseCSS: import("lit").CSSResultGroup;
export declare abstract class WiredBase extends LitElement {
    protected svg?: SVGSVGElement;
    protected lastSize: Point;
    protected seed: number;
    updated(_changed?: PropertyValues): void;
    wiredRender(force?: boolean): void;
    fire(name: string, detail?: any): void;
    protected abstract canvasSize(): Point;
    protected abstract draw(svg: SVGSVGElement, size: Point): void;
}
export declare function randomSeed(): number;
export declare function fireEvent(e: HTMLElement, name: string, detail?: any): void;
