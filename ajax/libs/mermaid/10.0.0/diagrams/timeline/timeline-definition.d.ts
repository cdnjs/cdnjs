import * as db from './timelineDb';
export declare const diagram: {
    db: typeof db;
    renderer: {
        setConf: (cnf: any) => void;
        draw: (text: any, id: any, version: any, diagObj: any) => void;
    };
    parser: any;
    styles: (options: any) => string;
};
