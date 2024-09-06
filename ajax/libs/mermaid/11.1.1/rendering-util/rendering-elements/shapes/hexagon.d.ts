import type { Node } from '$root/rendering-util/types.d.ts';
export declare const createHexagonPathD: (x: number, y: number, width: number, height: number, m: number) => string;
export declare const hexagon: (parent: SVGAElement, node: Node) => Promise<SVGAElement>;
