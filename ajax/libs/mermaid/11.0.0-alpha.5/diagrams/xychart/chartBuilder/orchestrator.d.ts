import type { DrawableElem, XYChartConfig, XYChartData, XYChartThemeConfig } from './interfaces.js';
import type { Group } from '../../../diagram-api/types.js';
export declare class Orchestrator {
    private chartConfig;
    private chartData;
    private componentStore;
    constructor(chartConfig: XYChartConfig, chartData: XYChartData, chartThemeConfig: XYChartThemeConfig, tmpSVGGroup: Group);
    private calculateVerticalSpace;
    private calculateHorizonatalSpace;
    private calculateSpace;
    getDrawableElement(): DrawableElem[];
}
