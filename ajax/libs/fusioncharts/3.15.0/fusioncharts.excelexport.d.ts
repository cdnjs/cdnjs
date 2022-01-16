
import { FusionChartStatic } from 'fusioncharts';

declare namespace Excelexport {}
declare var Excelexport: (H: FusionChartStatic) => FusionChartStatic;
export = Excelexport;
export as namespace Excelexport;

