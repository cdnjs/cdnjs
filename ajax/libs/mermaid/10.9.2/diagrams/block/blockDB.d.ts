import type { DiagramDB } from '../../diagram-api/types.js';
import type { BlockConfig, Block, ClassDef } from './blockTypes.js';
/**
 * Called when the parser comes across a (style) class definition
 * @example classDef my-style fill:#f96;
 *
 * @param id - the id of this (style) class
 * @param styleAttributes - the string with 1 or more style attributes (each separated by a comma)
 */
export declare const addStyleClass: (id: string, styleAttributes?: string) => void;
/**
 * Called when the parser comes across a style definition
 * @example style my-block-id fill:#f96;
 *
 * @param id - the id of the block to style
 * @param styles - the string with 1 or more style attributes (each separated by a comma)
 */
export declare const addStyle2Node: (id: string, styles?: string) => void;
/**
 * Add a CSS/style class to the block with the given id.
 * If the block isn't already in the list of known blocks, add it.
 * Might be called by parser when a CSS/style class should be applied to a block
 *
 * @param itemIds - The id or a list of ids of the item(s) to apply the css class to
 * @param cssClassName - CSS class name
 */
export declare const setCssClass: (itemIds: string, cssClassName: string) => void;
export declare function typeStr2Type(typeStr: string): "circle" | "round" | "square" | "diamond" | "hexagon" | "rect_left_inv_arrow" | "lean_right" | "lean_left" | "trapezoid" | "inv_trapezoid" | "stadium" | "subroutine" | "cylinder" | "na" | "block_arrow" | "doublecircle";
export declare function edgeTypeStr2Type(typeStr: string): string;
export declare function edgeStrToEdgeData(typeStr: string): string;
export declare const generateId: () => string;
/**
 * Return all of the style classes
 */
export declare const getClasses: () => Record<string, ClassDef>;
declare const db: {
    readonly getConfig: () => BlockConfig | undefined;
    readonly typeStr2Type: typeof typeStr2Type;
    readonly edgeTypeStr2Type: typeof edgeTypeStr2Type;
    readonly edgeStrToEdgeData: typeof edgeStrToEdgeData;
    readonly getLogger: () => Console;
    readonly getBlocksFlat: () => Block[];
    readonly getBlocks: () => Block[];
    readonly getEdges: () => Block[];
    readonly setHierarchy: (block: Block[]) => void;
    readonly getBlock: (id: string) => Block;
    readonly setBlock: (block: Block) => void;
    readonly getColumns: (blockId: string) => number;
    readonly getClasses: () => Record<string, ClassDef>;
    readonly clear: () => void;
    readonly generateId: () => string;
};
export type BlockDB = typeof db & DiagramDB;
export default db;
