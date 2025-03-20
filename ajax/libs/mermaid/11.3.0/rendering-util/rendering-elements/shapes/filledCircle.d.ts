import type { SVG } from '../../../diagram-api/types.js';
import type { Node, ShapeRenderOptions } from '../../types.d.ts';
export declare const filledCircle: (parent: SVG, node: Node, { config: { themeVariables } }: ShapeRenderOptions) => import("d3-selection").Selection<SVGGElement, unknown, Element | null, unknown>;
