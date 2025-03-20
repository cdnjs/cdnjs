export declare const diagram: {
    parser: any;
    db: {
        Cardinality: {
            ZERO_OR_ONE: string;
            ZERO_OR_MORE: string;
            ONE_OR_MORE: string;
            ONLY_ONE: string;
            MD_PARENT: string;
        };
        Identification: {
            NON_IDENTIFYING: string;
            IDENTIFYING: string;
        };
        getConfig: () => import("../../config.type.js").ErDiagramConfig | undefined;
        addEntity: (name: string, alias?: string | undefined) => any;
        addAttributes: (entityName: any, attribs: any) => void;
        getEntities: () => Map<any, any>;
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
