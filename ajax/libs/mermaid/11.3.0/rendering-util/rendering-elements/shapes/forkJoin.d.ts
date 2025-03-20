import type { SVG } from '../../../diagram-api/types.js';
import type { Node, ShapeRenderOptions } from '../../types.js';
export declare const forkJoin: (parent: SVG, node: Node, { dir, config: { state, themeVariables } }: ShapeRenderOptions) => import("d3-selection").Selection<SVGGElement, unknown, Element | null, unknown>;
