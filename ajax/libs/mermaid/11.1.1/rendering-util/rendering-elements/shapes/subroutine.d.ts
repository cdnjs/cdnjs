import type { Node } from '$root/rendering-util/types.d.ts';
export declare const createSubroutinePathD: (x: number, y: number, width: number, height: number) => string;
export declare const subroutine: (parent: SVGAElement, node: Node) => Promise<any>;
export default subroutine;
