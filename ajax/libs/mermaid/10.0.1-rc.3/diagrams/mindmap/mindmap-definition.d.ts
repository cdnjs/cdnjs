import * as mindmapDb from './mindmapDb';
export declare const diagram: {
    db: typeof mindmapDb;
    renderer: {
        draw: (text: any, id: any, version: any, diagObj: any) => Promise<void>;
    };
    parser: any;
    styles: (options: any) => string;
};
