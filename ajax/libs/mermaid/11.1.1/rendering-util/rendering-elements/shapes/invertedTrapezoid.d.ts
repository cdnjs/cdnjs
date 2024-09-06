import type { Node } from '$root/rendering-util/types.d.ts';
export declare const createInvertedTrapezoidPathD: (x: number, y: number, width: number, height: number) => string;
export declare const inv_trapezoid: (parent: SVGAElement, node: Node) => Promise<SVGAElement>;
