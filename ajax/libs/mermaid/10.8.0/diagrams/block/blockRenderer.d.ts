import type { Diagram } from '../../Diagram.js';
/**
 * Returns the all the styles from classDef statements in the graph definition.
 *
 * @param text - The text with the classes
 * @param diagObj - The diagram object
 * @returns ClassDef - The styles
 */
export declare const getClasses: (text: any, diagObj: any) => any;
export declare const draw: (text: string, id: string, _version: string, diagObj: Diagram) => Promise<void>;
declare const _default: {
    draw: (text: string, id: string, _version: string, diagObj: Diagram) => Promise<void>;
    getClasses: (text: any, diagObj: any) => any;
};
export default _default;
