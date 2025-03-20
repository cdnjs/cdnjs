import type { SVG } from '../../../diagram-api/types.js';
import type { Node, ShapeRenderOptions } from '../../types.js';
export declare const stateStart: (parent: SVG, node: Node, { config: { themeVariables } }: ShapeRenderOptions) => import("d3-selection").Selection<SVGGElement, unknown, Element | null, unknown>;
