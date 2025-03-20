export type MarkdownWordType = 'normal' | 'strong' | 'em';
import type { MermaidConfig } from '../config.type.js';
export interface MarkdownWord {
    content: string;
    type: MarkdownWordType;
}
export type MarkdownLine = MarkdownWord[];
/** Returns `true` if the line fits a constraint (e.g. it's under 𝑛 chars) */
export type CheckFitFunction = (text: MarkdownLine) => boolean;
export interface Node {
    id: string;
    label?: string;
    description?: string[];
    parentId?: string;
    position?: string;
    cssStyles?: string[];
    cssCompiledStyles?: string[];
    cssClasses?: string;
    labelStyle?: string;
    labelType?: string;
    domId?: string;
    dir?: string;
    haveCallback?: boolean;
    link?: string;
    linkTarget?: string;
    tooltip?: string;
    padding?: number;
    shape?: string;
    isGroup: boolean;
    width?: number;
    height?: number;
    intersect?: (point: any) => any;
    rx?: number;
    ry?: number;
    useHtmlLabels?: boolean;
    centerLabel?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    borderStyle?: string;
    borderWidth?: number;
    labelTextColor?: string;
    x?: number;
    y?: number;
    look?: string;
}
export interface Edge {
    id: string;
    label?: string;
    classes?: string;
    style?: string[];
    arrowhead?: string;
    arrowheadStyle?: string;
    arrowTypeEnd?: string;
    arrowTypeStart?: string;
    defaultInterpolate?: string;
    end?: string;
    interpolate?: string;
    labelType?: string;
    length?: number;
    start?: string;
    stroke?: string;
    text?: string;
    type: string;
    curve?: string;
    labelpos?: string;
    labelStyle?: string[];
    minlen?: number;
    pattern?: string;
    thickness?: 'normal' | 'thick' | 'invisible' | 'dotted';
    look?: string;
}
export interface RectOptions {
    rx: number;
    ry: number;
    labelPaddingX: number;
    labelPaddingY: number;
    classes: string;
}
export interface ClassDiagramNode extends Node {
    memberData: any;
}
export interface LayoutData {
    nodes: Node[];
    edges: Edge[];
    config: MermaidConfig;
    [key: string]: any;
}
export interface RenderData {
    items: (Node | Edge)[];
    [key: string]: any;
}
export type LayoutMethod = 'dagre' | 'dagre-wrapper' | 'elk' | 'neato' | 'dot' | 'circo' | 'fdp' | 'osage' | 'grid';
