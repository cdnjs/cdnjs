export declare const diagram: {
    parser: any;
    db: {
        Cardinality: {
            ZERO_OR_ONE: string;
            ZERO_OR_MORE: string;
            ONE_OR_MORE: string;
            ONLY_ONE: string;
        };
        Identification: {
            NON_IDENTIFYING: string;
            IDENTIFYING: string;
        };
        parseDirective: (statement: any, context: any, type: any) => void;
        getConfig: () => import("../../config.type").ErDiagramConfig | undefined;
        addEntity: (name: any) => any;
        addAttributes: (entityName: any, attribs: any) => void;
        getEntities: () => {};
        addRelationship: (entA: any, rolA: any, entB: any, rSpec: any) => void;
        getRelationships: () => any[];
        clear: () => void;
        setAccTitle: (txt: string) => void;
        getAccTitle: () => string;
        setAccDescription: (txt: string) => void;
        getAccDescription: () => string;
        setDiagramTitle: (txt: string) => void;
        getDiagramTitle: () => string;
    };
    renderer: {
        setConf: (cnf: any) => void;
        draw: (text: any, id: any, _version: any, diagObj: any) => void;
    };
    styles: (options: any) => string;
};
