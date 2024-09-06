import type { Node } from '$root/rendering-util/types.d.ts';
export declare const createTrapezoidPathD: (x: number, y: number, width: number, height: number) => string;
export declare const trapezoid: (parent: SVGAElement, node: Node) => Promise<SVGAElement>;
