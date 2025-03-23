import type { Node, Edge } from '../../rendering-util/types.js';
import type { FlowVertex, FlowClass, FlowSubGraph, FlowText, FlowEdge, FlowLink, FlowVertexTypeParam } from './types.js';
/**
 * Function to lookup domId from id in the graph definition.
 *
 * @param id - id of the node
 */
export declare const lookUpDomId: (id: string) => string;
/**
 * Function called by parser when a node definition has been found
 */
export declare const addVertex: (id: string, textObj: FlowText, type: FlowVertexTypeParam, style: string[], classes: string[], dir: string, props: {} | undefined, shapeData: any) => void;
/**
 * Function called by parser when a link/edge definition has been found
 *
 */
export declare const addSingleLink: (_start: string, _end: string, type: any) => void;
export declare const addLink: (_start: string[], _end: string[], type: unknown) => void;
/**
 * Updates a link's line interpolation algorithm
 *
 */
export declare const updateLinkInterpolate: (positions: ('default' | number)[], interpolate: string) => void;
/**
 * Updates a link with a style
 *
 */
export declare const updateLink: (positions: ('default' | number)[], style: string[]) => void;
export declare const addClass: (ids: string, style: string[]) => void;
/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 *
 */
export declare const setDirection: (dir: string) => void;
/**
 * Called by parser when a special node is found, e.g. a clickable element.
 *
 * @param ids - Comma separated list of ids
 * @param className - Class to add
 */
export declare const setClass: (ids: string, className: string) => void;
/**
 * Called by parser when a link is found. Adds the URL to the vertex data.
 *
 * @param ids - Comma separated list of ids
 * @param linkStr - URL to create a link for
 * @param target - Target attribute for the link
 */
export declare const setLink: (ids: string, linkStr: string, target: string) => void;
export declare const getTooltip: (id: string) => string | undefined;
/**
 * Called by parser when a click definition is found. Registers an event handler.
 *
 * @param ids - Comma separated list of ids
 * @param functionName - Function to be called on click
 * @param functionArgs - Arguments to be passed to the function
 */
export declare const setClickEvent: (ids: string, functionName: string, functionArgs: string) => void;
export declare const bindFunctions: (element: Element) => void;
export declare const getDirection: () => string;
/**
 * Retrieval function for fetching the found nodes after parsing has completed.
 *
 */
export declare const getVertices: () => Map<string, FlowVertex>;
/**
 * Retrieval function for fetching the found links after parsing has completed.
 *
 */
export declare const getEdges: () => FlowEdge[] & {
    defaultInterpolate?: string | undefined;
    defaultStyle?: string[] | undefined;
};
/**
 * Retrieval function for fetching the found class definitions after parsing has completed.
 *
 */
export declare const getClasses: () => Map<string, FlowClass>;
/**
 * Clears the internal graph db so that a new graph can be parsed.
 *
 */
export declare const clear: (ver?: string) => void;
export declare const setGen: (ver: string) => void;
export declare const defaultStyle: () => string;
export declare const addSubGraph: (_id: {
    text: string;
}, list: string[], _title: {
    text: string;
    type: string;
}) => string;
export declare const getDepthFirstPos: (pos: number) => number;
export declare const indexNodes: () => void;
export declare const getSubGraphs: () => FlowSubGraph[];
export declare const firstGraph: () => boolean;
export declare const destructLink: (_str: string, _startStr: string) => FlowLink | {
    type: string;
    stroke: string;
    length: number;
};
export declare const lex: {
    firstGraph: () => boolean;
};
export declare const getData: () => {
    nodes: Node[];
    edges: Edge[];
    other: {};
    config: import("../../config.type.js").MermaidConfig;
};
declare const _default: {
    defaultConfig: () => import("../../config.type.js").FlowchartDiagramConfig | undefined;
    setAccTitle: (txt: string) => void;
    getAccTitle: () => string;
    getAccDescription: () => string;
    getData: () => {
        nodes: Node[];
        edges: Edge[];
        other: {};
        config: import("../../config.type.js").MermaidConfig;
    };
    setAccDescription: (txt: string) => void;
    addVertex: (id: string, textObj: FlowText, type: FlowVertexTypeParam, style: string[], classes: string[], dir: string, props: {} | undefined, shapeData: any) => void;
    lookUpDomId: (id: string) => string;
    addLink: (_start: string[], _end: string[], type: unknown) => void;
    updateLinkInterpolate: (positions: (number | "default")[], interpolate: string) => void;
    updateLink: (positions: (number | "default")[], style: string[]) => void;
    addClass: (ids: string, style: string[]) => void;
    setDirection: (dir: string) => void;
    setClass: (ids: string, className: string) => void;
    setTooltip: (ids: string, tooltip: string) => void;
    getTooltip: (id: string) => string | undefined;
    setClickEvent: (ids: string, functionName: string, functionArgs: string) => void;
    setLink: (ids: string, linkStr: string, target: string) => void;
    bindFunctions: (element: Element) => void;
    getDirection: () => string;
    getVertices: () => Map<string, FlowVertex>;
    getEdges: () => FlowEdge[] & {
        defaultInterpolate?: string | undefined;
        defaultStyle?: string[] | undefined;
    };
    getClasses: () => Map<string, FlowClass>;
    clear: (ver?: string) => void;
    setGen: (ver: string) => void;
    defaultStyle: () => string;
    addSubGraph: (_id: {
        text: string;
    }, list: string[], _title: {
        text: string;
        type: string;
    }) => string;
    getDepthFirstPos: (pos: number) => number;
    indexNodes: () => void;
    getSubGraphs: () => FlowSubGraph[];
    destructLink: (_str: string, _startStr: string) => FlowLink | {
        type: string;
        stroke: string;
        length: number;
    };
    lex: {
        firstGraph: () => boolean;
    };
    exists: (allSgs: FlowSubGraph[], _id: string) => boolean;
    makeUniq: (sg: FlowSubGraph, allSubgraphs: FlowSubGraph[]) => {
        nodes: string[];
    };
    setDiagramTitle: (txt: string) => void;
    getDiagramTitle: () => string;
};
export default _default;
