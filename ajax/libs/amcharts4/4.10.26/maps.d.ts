/**
 * Duplicated
 */
export { LegendDataItem, LegendPosition, ILegendDataFields, ILegendProperties, ILegendEvents, ILegendAdapters, Legend, LegendSettings } from "./.internal/charts/Legend";
export { IHeatLegendProperties, IHeatLegendEvents, IHeatLegendAdapters, HeatLegend } from "./.internal/charts/elements/HeatLegend";
/**
 * Maps
 */
export { MapChartDataItem, IMapPolygonDataObject, MapLineType, IMapLineDataObject, IMapImageDataObject, IMapDataObject, IMapChartDataFields, IMapChartProperties, IMapChartEvents, IMapChartAdapters, MapChart } from "./.internal/charts/types/MapChart";
export { MapSeriesDataItem, GEOJSONGeometry, IMapSeriesDataFields, IMapSeriesProperties, IMapSeriesEvents, IMapSeriesAdapters, MapSeries } from "./.internal/charts/map/MapSeries";
export { IMapObjectProperties, IMapObjectEvents, IMapObjectAdapters, MapObject } from "./.internal/charts/map/MapObject";
export { IMapPolygonProperties, IMapPolygonEvents, IMapPolygonAdapters, MapPolygon } from "./.internal/charts/map/MapPolygon";
export { IMapImageProperties, IMapImageEvents, IMapImageAdapters, MapImage } from "./.internal/charts/map/MapImage";
export { IMapLineProperties, IMapLineEvents, IMapLineAdapters, MapLine } from "./.internal/charts/map/MapLine";
export { IMapLineObjectAdapters, IMapLineObjectEvents, IMapLineObjectProperties, MapLineObject } from "./.internal/charts/map/MapLineObject";
export { IMapSplineProperties, IMapSplineEvents, IMapSplineAdapters, MapSpline } from "./.internal/charts/map/MapSpline";
export { IMapArcProperties, IMapArcEvents, IMapArcAdapters, MapArc } from "./.internal/charts/map/MapArc";
export { IGraticuleProperties, IGraticuleEvents, IGraticuleAdapters, Graticule } from "./.internal/charts/map/Graticule";
export { MapPolygonSeriesDataItem, IMapPolygonSeriesDataFields, IMapPolygonSeriesProperties, IMapPolygonSeriesEvents, IMapPolygonSeriesAdapters, MapPolygonSeries } from "./.internal/charts/map/MapPolygonSeries";
export { MapLineSeriesDataItem, IMapLineSeriesDataFields, IMapLineSeriesProperties, IMapLineSeriesEvents, IMapLineSeriesAdapters, MapLineSeries } from "./.internal/charts/map/MapLineSeries";
export { MapSplineSeriesDataItem, IMapSplineSeriesDataFields, IMapSplineSeriesProperties, IMapSplineSeriesEvents, IMapSplineSeriesAdapters, MapSplineSeries } from "./.internal/charts/map/MapSplineSeries";
export { MapImageSeriesDataItem, IMapImageSeriesDataFields, IMapImageSeriesProperties, IMapImageSeriesEvents, IMapImageSeriesAdapters, MapImageSeries } from "./.internal/charts/map/MapImageSeries";
export { MapArcSeriesDataItem, IMapArcSeriesDataFields, IMapArcSeriesProperties, IMapArcSeriesEvents, IMapArcSeriesAdapters, MapArcSeries } from "./.internal/charts/map/MapArcSeries";
export { GraticuleSeriesDataItem, IGraticuleSeriesDataFields, IGraticuleSeriesProperties, IGraticuleSeriesEvents, IGraticuleSeriesAdapters, GraticuleSeries } from "./.internal/charts/map/GraticuleSeries";
export { multiPolygonToGeo, multiLineToGeo, multiPointToGeo, pointToGeo, multiGeoPolygonToMultipolygon, getBackground, multiGeoLineToMultiLine, multiGeoToPoint, getCircle } from "./.internal/charts/map/MapUtils";
export { IZoomControlProperties, IZoomControlEvents, IZoomControlAdapters, ZoomControl } from "./.internal/charts/map/ZoomControl";
export { ISmallMapProperties, ISmallMapEvents, ISmallMapAdapters, SmallMap } from "./.internal/charts/map/SmallMap";
/**
 * Elements: projections
 */
export { Projection } from "./.internal/charts/map/projections/Projection";
import * as projections from "./.internal/charts/map/projections";
export { projections };
import * as geo from "./.internal/charts/map/Geo";
export { geo };
import * as d3geo from "d3-geo";
export { d3geo };
