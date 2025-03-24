import { HSLColor } from 'd3-color';
import { GraphTypeBuilder } from './graph-types/types';
export type TGlobals = {
    COLORS: Array<HSLColor>;
    DEFAULT_WIDTH: number;
    DEFAULT_HEIGHT: number;
    DEFAULT_ITERATIONS: number;
    MAX_ITERATIONS: number;
    TIP_X_EPS: number;
    /**
     * graphTypes are the graph types registered in functionPlot,
     * to register a new graphType use `registerGraphType`
     */
    graphTypes: {
        [key: string]: GraphTypeBuilder;
    };
};
declare const Globals: TGlobals;
declare function registerGraphType(graphType: string, graphTypeBulder: GraphTypeBuilder): void;
export { registerGraphType };
export default Globals;
