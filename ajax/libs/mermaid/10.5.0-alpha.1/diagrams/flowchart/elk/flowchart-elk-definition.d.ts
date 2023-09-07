import * as db from '../flowDb.js';
export declare const diagram: {
    db: typeof db;
    renderer: {
        getClasses: (text: any, diagObj: any) => Record<string, import("../../../diagram-api/types.js").DiagramStyleClassDef>;
        draw: (text: any, id: any, _version: any, diagObj: any) => Promise<void>;
    };
    parser: any;
    styles: (options: import("./styles.js").FlowChartStyleOptions) => string;
};
