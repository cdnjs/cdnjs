import { Point } from 'roughjs/bin/geometry.js';
declare type Params = {
    [name: string]: string;
};
export declare function svgNode(tagName: string, attributes?: Params): SVGElement;
export declare function rectangle(parent: SVGElement, x: number, y: number, width: number, height: number, seed: number): SVGElement;
export declare function line(parent: SVGElement, x1: number, y1: number, x2: number, y2: number, seed: number): SVGElement;
export declare function polygon(parent: SVGElement, vertices: Point[], seed: number): SVGElement;
export declare function ellipse(parent: SVGElement, x: number, y: number, width: number, height: number, seed: number): SVGElement;
export declare function hachureFill(points: Point[], seed: number): SVGElement;
export declare function hachureEllipseFill(cx: number, cy: number, width: number, height: number, seed: number): SVGElement;
export {};
