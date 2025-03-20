import type { Node } from '../../types.d.ts';
export declare const createCylinderPathD: (x: number, y: number, width: number, height: number, rx: number, ry: number) => string;
export declare const createOuterCylinderPathD: (x: number, y: number, width: number, height: number, rx: number, ry: number) => string;
export declare const createInnerCylinderPathD: (x: number, y: number, width: number, height: number, rx: number, ry: number) => string;
export declare const tiltedCylinder: (parent: SVGAElement, node: Node) => Promise<any>;
