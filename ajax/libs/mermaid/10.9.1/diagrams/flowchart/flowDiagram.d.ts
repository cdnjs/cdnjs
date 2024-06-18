import type { MermaidConfig } from '../../config.type.js';
export declare const diagram: {
    parser: any;
    db: {
        defaultConfig: () => import("../../config.type.js").FlowchartDiagramConfig | undefined;
        setAccTitle: (txt: string) => void;
        getAccTitle: () => string;
        getAccDescription: () => string;
        setAccDescription: (txt: string) => void;
        addVertex: (_id: any, textObj: any, type: any, style: any, classes: any, dir: any, props?: {}) => void;
        lookUpDomId: (id: any) => any;
        addLink: (_start: any, _end: any, type: any) => void;
        updateLinkInterpolate: (positions: any, interp: any) => void;
        updateLink: (positions: any, style: any) => void;
        addClass: (ids: any, style: any) => void;
        setDirection: (dir: any) => void;
        setClass: (ids: any, className: any) => void;
        setTooltip: (ids: any, tooltip: any) => void;
        getTooltip: (id: any) => any;
        setClickEvent: (ids: any, functionName: any, functionArgs: any) => void;
        setLink: (ids: any, linkStr: any, target: any) => void;
        bindFunctions: (element: any) => void;
        getDirection: () => any;
        getVertices: () => any;
        getEdges: () => any;
        getClasses: () => any;
        clear: (ver?: string) => void;
        setGen: (ver: any) => void;
        defaultStyle: () => string;
        addSubGraph: (_id: any, list: any, _title: any) => any;
        getDepthFirstPos: (pos: any) => any;
        indexNodes: () => void;
        getSubGraphs: () => any[];
        destructLink: (_str: any, _startStr: any) => {
            type: string;
            stroke: string;
        };
        lex: {
            firstGraph: () => boolean;
        };
        exists: (allSgs: any, _id: any) => boolean;
        makeUniq: (sg: any, allSubgraphs: any) => {
            nodes: any[];
        };
        setDiagramTitle: (txt: string) => void;
        getDiagramTitle: () => string;
    };
    renderer: {
        setConf: (cnf: any) => void;
        addVertices: (vert: any, g: any, svgId: any, root: any, doc: any, diagObj: any) => Promise<void>;
        addEdges: (edges: object, g: object, diagObj: any) => Promise<void>;
        getClasses: (text: any, diagObj: any) => Record<string, import("../../diagram-api/types.js").DiagramStyleClassDef>;
        draw: (text: any, id: any, _version: any, diagObj: any) => Promise<void>;
    };
    styles: (options: import("./styles.js").FlowChartStyleOptions) => string;
    init: (cnf: MermaidConfig) => void;
};
