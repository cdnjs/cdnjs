import type { Node } from '$root/rendering-util/types.d.ts';
import type { SVG } from '$root/diagram-api/types.js';
export declare const forkJoin: (parent: SVG, node: Node, dir: string) => import("d3-selection").Selection<SVGGElement, unknown, Element | null, unknown>;
