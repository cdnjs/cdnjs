import { Selection } from 'd3-selection';
import { FunctionPlotTip } from './types';
export default function mouseTip(config: FunctionPlotTip): {
    (selection: Selection<any, any, any, any>): void;
    move(coordinates: {
        x: number;
        y: number;
    }): void;
    show(): void;
    hide(): void;
};
