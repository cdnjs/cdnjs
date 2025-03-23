import type { MermaidConfig } from '../../config.type.js';
export declare const diagram: {
    parser: any;
    db: {
        defaultConfig: () => import("../../config.type.js").FlowchartDiagramConfig | undefined;
        setAccTitle: (txt: string) => void;
        getAccTitle: () => string;
        getAccDescription: () => string;
        getData: () => {
            nodes: import("../../rendering-util/types.js").Node[];
            edges: import("../../rendering-util/types.js").Edge[];
            other: {};
            config: MermaidConfig;
        };
        setAccDescription: (txt: string) => void;
        addVertex: (id: string, textObj: import("./types.js").FlowText, type: import("./types.js").FlowVertexTypeParam, style: string[], classes: string[], dir: string, props: {} | undefined, shapeData: any) => void;
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
        getVertices: () => Map<string, import("./types.js").FlowVertex>;
        getEdges: () => import("./types.js").FlowEdge[] & {
            defaultInterpolate?: string | undefined;
            defaultStyle?: string[] | undefined;
        };
        getClasses: () => Map<string, import("./types.js").FlowClass>;
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
        getSubGraphs: () => import("./types.js").FlowSubGraph[];
        destructLink: (_str: string, _startStr: string) => import("./types.js").FlowLink | {
            type: string;
            stroke: string;
            length: number;
        };
        lex: {
            firstGraph: () => boolean;
        };
        exists: (allSgs: import("./types.js").FlowSubGraph[], _id: string) => boolean;
        makeUniq: (sg: import("./types.js").FlowSubGraph, allSubgraphs: import("./types.js").FlowSubGraph[]) => {
            nodes: string[];
        };
        setDiagramTitle: (txt: string) => void;
        getDiagramTitle: () => string;
    };
    renderer: {
        getClasses: (text: string, diagramObj: any) => Map<string, import("../../diagram-api/types.js").DiagramStyleClassDef>;
        draw: (text: string, id: string, _version: string, diag: any) => Promise<void>;
    };
    styles: (options: import("./styles.js").FlowChartStyleOptions) => string;
    init: (cnf: MermaidConfig) => void;
};
