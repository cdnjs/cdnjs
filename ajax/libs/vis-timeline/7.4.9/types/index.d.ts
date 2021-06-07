// Type definitions for vis.js 4.21
// Project: https://github.com/almende/vis, http://visjs.org
// Definitions by: Michaël Bitard <https://github.com/MichaelBitard>
//                 MacLeod Broad <https://github.com/macleodbroad-wf>
//                 Adrian Caballero <https://github.com/adripanico>
//                 Severin <https://github.com/seveves>
//                 kaktus40 <https://github.com/kaktus40>
//                 Matthieu Maitre <https://github.com/mmaitre314>
//                 Adam Lewis <https://github.com/supercargo>
//                 Alex Soh <https://github.com/takato1314>
//                 Oleksii Kachura <https://github.com/alex-kachura>
//                 dcop <https://github.com/dcop>
//                 Avraham Essoudry <https://github.com/avrahamcool>
//                 Dmitriy Trifonov <https://github.com/divideby>
//                 Sam Welek <https://github.com/tiberiushunter>
//                 Slaven Tomac <https://github.com/slavede>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { DataInterface, DataSet, DataView } from 'vis-data';
export type DataInterfaceDataGroup = DataInterface<DataGroup, 'id'>;
export type DataInterfaceDataItem = DataInterface<DataItem, 'id'>;
export type DataSetDataGroup = DataSet<DataGroup, 'id'>;
export type DataSetDataItem = DataSet<DataItem, 'id'>;
export type DataViewDataGroup = DataView<DataGroup, 'id'>;
export type DataViewDataItem = DataView<DataItem, 'id'>;

import { MomentInput, MomentFormatSpecification, Moment } from 'moment';
import { IFilterXSSOptions } from 'xss';
export type MomentConstructor1 =
  (inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean) => Moment;
export type MomentConstructor2 =
  (inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean) => Moment;

export type MomentConstructor = MomentConstructor1 | MomentConstructor2;

export type IdType = string | number;
export type SubgroupType = IdType;
export type DateType = Date | number | string;
export type HeightWidthType = IdType;
export type TimelineItemType = 'box' | 'point' | 'range' | 'background';
export type TimelineAlignType = 'auto' | 'center' | 'left' | 'right';
export type TimelineTimeAxisScaleType = 'millisecond' | 'second' | 'minute' | 'hour' |
  'weekday' | 'day' | 'month' | 'year';
export type TimelineEventPropertiesResultWhatType = 'item' | 'background' | 'axis' |
  'group-label' | 'custom-time' | 'current-time';
export type TimelineEvents =
  'currentTimeTick' |
  'click' |
  'contextmenu' |
  'doubleClick' |
  'drop' |
  'mouseOver' |
  'mouseDown' |
  'mouseUp' |
  'mouseMove' |
  'groupDragged' |
  'changed' |
  'rangechange' |
  'rangechanged' |
  'select' |
  'itemover' |
  'itemout' |
  'timechange' |
  'timechanged';
export type Graph2dStyleType = 'line' | 'bar' | 'points';
export type Graph2dBarChartAlign = 'left' | 'center' | 'right';
export type Graph2dDrawPointsStyle = 'square' | 'circle';
export type LegendPositionType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type ParametrizationInterpolationType = 'centripetal' | 'chordal' | 'uniform' | 'disabled';
export type TopBottomEnumType = 'top' | 'bottom';
export type RightLeftEnumType = 'right' | 'left';

export interface LegendPositionOptions {
  visible?: boolean;
  position?: LegendPositionType;
}

export interface LegendOptions {
  enabled?: boolean;
  icons?: boolean;
  iconSize?: number;
  iconSpacing?: number;
  left?: LegendPositionOptions;
  right?: LegendPositionOptions;
}

export interface DataItem {
  className?: string;
  content: string;
  end?: DateType;
  group?: any;
  id?: IdType;
  start: DateType;
  style?: string;
  subgroup?: SubgroupType;
  title?: string;
  type?: string;
  editable?: TimelineItemEditableType;
  selectable?: boolean;
}

export interface SubGroupStackOptions {
  [name: string]: boolean;
}

export interface SubGroupVisibilityOptions {
  [name: string]: boolean;
}

export interface DataGroup {
  className?: string;
  content: string | HTMLElement;
  id: IdType;
  options?: DataGroupOptions;
  style?: string;
  subgroupOrder?: string | ((a: any, b: any) => number);
  title?: string;
  nestedGroups?: IdType[];
  subgroupStack?: SubGroupStackOptions | boolean;
  visible?: boolean;
  showNested?: boolean;
  subgroupVisibility?: SubGroupVisibilityOptions;
}

export interface DataGroupOptions {
  drawPoints?: Graph2dDrawPointsOption | (() => void); // TODO
  excludeFromLegend?: boolean;
  interpolation?: boolean | InterpolationOptions;
  shaded?: Graph2dShadedOption;
  style?: string;
  yAxisOrientation?: RightLeftEnumType;
}

export interface InterpolationOptions {
  parametrization: ParametrizationInterpolationType;
}

export interface TimelineEditableOption {
  add?: boolean;
  remove?: boolean;
  updateGroup?: boolean;
  updateTime?: boolean;
  overrideItems?: boolean;
}

export type TimelineFormatLabelsFunction = (date: Date, scale: string, step: number) => string;

export interface TimelineFormatLabelsOption {
  millisecond?: string;
  second?: string;
  minute?: string;
  hour?: string;
  weekday?: string;
  day?: string;
  week?: string;
  month?: string;
  year?: string;
}

export interface TimelineFormatOption {
  minorLabels?: TimelineFormatLabelsOption | TimelineFormatLabelsFunction;
  majorLabels?: TimelineFormatLabelsOption | TimelineFormatLabelsFunction;
}

export interface TimelineGroupEditableOption {
  add?: boolean;
  remove?: boolean;
  order?: boolean;
}

export interface TimelineHiddenDateOption {
  start: DateType;
  end: DateType;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface TimelineItemsAlwaysDraggableOption {
  item?: boolean;
  range?: boolean;
}

export interface TimelineMarginItem {
  horizontal?: number;
  vertical?: number;
}

export type TimelineMarginItemType = number | TimelineMarginItem;

export interface TimelineMarginOption {
  axis?: number;
  item?: TimelineMarginItemType;
}

export interface TimelineOrientationOption {
  axis?: string;
  item?: string;
}

export interface TimelineTimeAxisOption {
  scale?: TimelineTimeAxisScaleType;
  step?: number;
}

export interface TimelineRollingModeOption {
  follow?: boolean;
  offset?: number;
}

export interface TimelineTooltipOption {
  followMouse?: boolean;
  overflowMethod?: 'cap' | 'flip' | 'none';
  delay?: number;
  template?: (item: TimelineItem, editedData?: TimelineItem) => string;
}

export interface TimelineXSSProtectionOption {
  disabled: boolean;
  filterOptions?: IFilterXSSOptions;
}

export type TimelineOptionsConfigureFunction = (option: string, path: string[]) => boolean;
export type TimelineOptionsConfigureType = boolean | TimelineOptionsConfigureFunction;
export type TimelineOptionsDataAttributesType = boolean | string | string[];
export type TimelineOptionsEditableType = boolean | TimelineEditableOption;
export type TimelineOptionsItemCallbackFunction = (item: TimelineItem, callback: (item: TimelineItem | null) => void) => void;
export type TimelineOptionsGroupCallbackFunction = (group: TimelineGroup, callback: (group: TimelineGroup | null) => void) => void;
export type TimelineOptionsGroupEditableType = boolean | TimelineGroupEditableOption;
export type TimelineOptionsGroupOrderType = string | TimelineOptionsComparisonFunction;
export type TimelineOptionsGroupOrderSwapFunction = (fromGroup: any, toGroup: any, groups: DataInterfaceDataGroup) => void;
export type TimelineOptionsHiddenDatesType = TimelineHiddenDateOption | TimelineHiddenDateOption[];
export type TimelineOptionsItemsAlwaysDraggableType = boolean | TimelineItemsAlwaysDraggableOption;
export type TimelineOptionsMarginType = number | TimelineMarginOption;
export type TimelineOptionsOrientationType = string | TimelineOrientationOption;
export type TimelineOptionsSnapFunction = (date: Date, scale: string, step: number) => Date | number;
export type TimelineOptionsSnapType = null | TimelineOptionsSnapFunction;
export type TimelineOptionsTemplateFunction = (item?: any, element?: any, data?: any) => string | HTMLElement;
export type TimelineOptionsComparisonFunction = (a: any, b: any) => number;
export type TimelineOptionsGroupHeightModeType = 'auto' | 'fixed' | 'fitItems';
export type TimelineOptionsClusterCriteriaFunction = (firstItem: TimelineItem, secondItem: TimelineItem) => boolean;
export type TimelineOptionsCluster = {
  titleTemplate?: string;
  maxItems?: number;
  clusterCriteria?: TimelineOptionsClusterCriteriaFunction;
  showStipes?: boolean;
  fitOnDoubleClick?: boolean;
};
export type TimelineOptionsEventType = 'box' | 'point' | 'range' | 'background';
export type TimelineOptionsZoomKey = '' | 'altKey' | 'ctrlKey' | 'shiftKey' | 'metaKey';

export interface TimelineOptions {
  align?: TimelineAlignType;
  autoResize?: boolean;
  clickToUse?: boolean;
  cluster?: TimelineOptionsCluster;
  configure?: TimelineOptionsConfigureType;
  dataAttributes?: TimelineOptionsDataAttributesType;
  editable?: TimelineOptionsEditableType;
  end?: DateType;
  format?: TimelineFormatOption;
  groupEditable?: TimelineOptionsGroupEditableType;
  groupHeightMode?: TimelineOptionsGroupHeightModeType;
  groupOrder?: TimelineOptionsGroupOrderType;
  groupOrderSwap?: TimelineOptionsGroupOrderSwapFunction;
  groupTemplate?: TimelineOptionsTemplateFunction;
  height?: HeightWidthType;
  hiddenDates?: TimelineOptionsHiddenDatesType;
  horizontalScroll?: boolean;
  itemsAlwaysDraggable?: TimelineOptionsItemsAlwaysDraggableType;
  locale?: string;
  locales?: any; // TODO
  longSelectPressTime?: number,
  moment?: MomentConstructor;
  margin?: TimelineOptionsMarginType;
  max?: DateType;
  maxHeight?: HeightWidthType;
  maxMinorChars?: number;
  min?: DateType;
  minHeight?: HeightWidthType;
  moveable?: boolean;
  multiselect?: boolean;
  multiselectPerGroup?: boolean;
  onAdd?: TimelineOptionsItemCallbackFunction;
  onAddGroup?: TimelineOptionsGroupCallbackFunction;
  onDropObjectOnItem?: any; // TODO
  onInitialDrawComplete?: () => void;
  onUpdate?: TimelineOptionsItemCallbackFunction;
  onMove?: TimelineOptionsItemCallbackFunction;
  onMoveGroup?: TimelineOptionsGroupCallbackFunction;
  onMoving?: TimelineOptionsItemCallbackFunction;
  onRemove?: TimelineOptionsItemCallbackFunction;
  onRemoveGroup?: TimelineOptionsGroupCallbackFunction;
  order?: TimelineOptionsComparisonFunction;
  orientation?: TimelineOptionsOrientationType;
  preferZoom?: boolean;
  rollingMode?: TimelineRollingModeOption;
  rtl?: boolean;
  selectable?: boolean;
  sequentialSelection?: boolean;
  showCurrentTime?: boolean;
  showMajorLabels?: boolean;
  showMinorLabels?: boolean;
  showWeekScale?: boolean;
  showTooltips?: boolean;
  stack?: boolean;
  stackSubgroups?: boolean;
  snap?: TimelineOptionsSnapType;
  start?: DateType;
  template?: TimelineOptionsTemplateFunction;
  visibleFrameTemplate?: TimelineOptionsTemplateFunction;
  timeAxis?: TimelineTimeAxisOption;
  type?: TimelineOptionsEventType;
  tooltip?: TimelineTooltipOption;
  tooltipOnItemUpdateTime?: boolean | { template(item: any): any };
  verticalScroll?: boolean;
  width?: HeightWidthType;
  zoomable?: boolean;
  zoomKey?: TimelineOptionsZoomKey;
  zoomFriction?: number;
  zoomMax?: number;
  zoomMin?: number;
  xss?: TimelineXSSProtectionOption;
}

/**
 * If true (default) or an Object, the range is animated smoothly to the new window.
 * An object can be provided to specify duration and easing function.
 * Default duration is 500 ms, and default easing function is 'easeInOutQuad'.
 */
export type TimelineAnimationType = boolean | AnimationOptions;

export interface TimelineAnimationOptions {
  animation?: Partial<TimelineAnimationType>;
  zoom?: boolean;
}

export interface TimelineEventPropertiesResult {
  /**
   *  The id of the clicked group
   */
  group?: number | null;

  /**
   * The id of the clicked item.
   */
  item?: IdType | null;

  /**
   * Absolute horizontal position of the click event.
   */
  pageX: number;

  /**
   * Absolute vertical position of the click event.
   */
  pageY: number;

  /**
   * Relative horizontal position of the click event.
   */
  x: number;

  /**
   * Relative vertical position of the click event.
   */
  y: number;

  /**
   *  Date of the clicked event.
   */
  time: Date;

  /**
   * Date of the clicked event, snapped to a nice value.
   */
  snappedTime: Date;

  /**
   * Name of the clicked thing.
   */
  what?: TimelineEventPropertiesResultWhatType;

  /**
   * The original click event.
   */
  event: Event;

  /**
   * If the event is clustered.
   */
  isCluster: boolean;
}

export type DataItemCollectionType = DataItem[] | DataInterfaceDataItem;
export type DataGroupCollectionType = DataGroup[] | DataInterfaceDataGroup;

export interface TitleOption {
  text?: string;
  style?: string;
}

export interface RangeType {
  min: IdType;
  max: IdType;
}

export interface DataAxisSideOption {
  range?: RangeType;
  format?(): string;
  title?: TitleOption;
}

export interface Graph2dBarChartOption {
  width?: number;
  minWidth?: number;
  sideBySide?: boolean;
  align?: Graph2dBarChartAlign;
}

export interface Graph2dDataAxisOption {
  orientation?: TimelineOptionsOrientationType;
  showMinorLabels?: boolean;
  showMajorLabels?: boolean;
  showWeekScale?: boolean;
  majorLinesOffset?: number;
  minorLinesOffset?: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
  iconWidth?: number;
  width?: string;
  icons?: boolean;
  visible?: boolean;
  alignZeros?: boolean;
  left?: DataAxisSideOption;
  right?: DataAxisSideOption;
}

export interface Graph2dDrawPointsOption {
  enabled?: boolean;
  onRender?(): boolean; // TODO
  size?: number;
  style: Graph2dDrawPointsStyle;
}

export interface Graph2dShadedOption {
  orientation?: TopBottomEnumType;
  groupid?: IdType;
}

export type Graph2dOptionBarChart = number | Graph2dBarChartOption;
export type Graph2dOptionDataAxis = boolean | Graph2dDataAxisOption;
export type Graph2dOptionDrawPoints = boolean | Graph2dDrawPointsOption;
export type Graph2dLegendOption = boolean | LegendOptions;

export interface Graph2dOptions {
  autoResize?: boolean;
  barChart?: Graph2dOptionBarChart;
  clickToUse?: boolean;
  configure?: TimelineOptionsConfigureType;
  dataAxis?: Graph2dOptionDataAxis;
  defaultGroup?: string;
  drawPoints?: Graph2dOptionDrawPoints;
  end?: DateType;
  format?: any; // TODO
  graphHeight?: HeightWidthType;
  height?: HeightWidthType;
  hiddenDates?: any; // TODO
  legend?: Graph2dLegendOption;
  locale?: string;
  locales?: any; // TODO
  moment?: MomentConstructor;
  max?: DateType;
  maxHeight?: HeightWidthType;
  maxMinorChars?: number;
  min?: DateType;
  minHeight?: HeightWidthType;
  moveable?: boolean;
  multiselect?: boolean;
  orientation?: string;
  sampling?: boolean;
  showCurrentTime?: boolean;
  showMajorLabels?: boolean;
  showMinorLabels?: boolean;
  showWeekScale?: boolean;
  sort?: boolean;
  stack?: boolean;
  start?: DateType;
  style?: Graph2dStyleType;
  throttleRedraw?: number;
  timeAxis?: TimelineTimeAxisOption;
  width?: HeightWidthType;
  yAxisOrientation?: RightLeftEnumType;
  zoomable?: boolean;
  zoomKey?: string;
  zoomMax?: number;
  zoomMin?: number;
  zIndex?: number;
}

export class Graph2d {
  constructor(
    container: HTMLElement,
    items: DataItemCollectionType,
    groups: DataGroupCollectionType,
    options?: Graph2dOptions
  );
  constructor(
    container: HTMLElement,
    items: DataItemCollectionType,
    options?: Graph2dOptions
  );

  addCustomTime(time: DateType, id?: IdType): IdType;
  destroy(): void;
  fit(options?: TimelineAnimationOptions): void;
  focus(ids: IdType | IdType[], options?: TimelineAnimationOptions): void;
  getCurrentTime(): Date;
  getCustomTime(id?: IdType): Date;
  getEventProperties(event: Event): TimelineEventPropertiesResult;
  getItemRange(): any; // TODO
  getSelection(): IdType[];
  getVisibleItems(): IdType[];
  getWindow(): { start: Date, end: Date };
  moveTo(time: DateType, options?: TimelineAnimationOptions): void;
  on(event: TimelineEvents, callback: () => void): void;
  off(event: TimelineEvents, callback: () => void): void;
  redraw(): void;
  removeCustomTime(id: IdType): void;
  setCurrentTime(time: DateType): void;
  setCustomTime(time: DateType, id?: IdType): void;
  setCustomTimeTitle(title: string, id?: IdType): void;
  setData(data: { groups?: DataGroupCollectionType; items?: DataItemCollectionType }): void;
  setGroups(groups?: DataGroupCollectionType): void;
  setItems(items: DataItemCollectionType): void;
  setOptions(options: TimelineOptions): void;
  setSelection(ids: IdType | IdType[]): void;
  setWindow(start: DateType, end: DateType, options?: TimelineAnimationOptions): void;
}

export interface Graph2d {
  setGroups(groups?: TimelineGroup[]): void;
  setItems(items?: TimelineItem[]): void;
  getLegend(): TimelineWindow;
  getWindow(): TimelineWindow;
  setWindow(start: any, date: any): void;
  focus(selection: any): void;
  on(event?: string, callback?: (properties: any) => void): void;
}

export class Timeline {
  constructor(
    container: HTMLElement,
    items: DataItemCollectionType,
    groups: DataGroupCollectionType,
    options?: TimelineOptions
  );

  constructor(
    container: HTMLElement,
    items: DataItemCollectionType,
    options?: TimelineOptions
  );

  /**
   * Add new vertical bar representing a custom time that can be dragged by the user.
   * Parameter time can be a Date, Number, or String, and is new Date() by default.
   * Parameter id can be Number or String and is undefined by default.
   * The id is added as CSS class name of the custom time bar, allowing to style multiple time bars differently.
   * The method returns id of the created bar.
   */
  addCustomTime(time: DateType, id?: IdType): IdType;

  /**
   * Destroy the Timeline. The timeline is removed from memory. all DOM elements and event listeners are cleaned up.
   */
  destroy(): void;

  /**
   * Adjust the visible window such that it fits all items. See also focus(id).
   */
  fit(options?: TimelineAnimationOptions): void;

  /**
   * Adjust the visible window such that the selected item (or multiple items) are centered on screen. See also function fit()
   */
  focus(ids: IdType | IdType[], options?: TimelineAnimationOptions): void;

  /**
   * Get the current time. Only applicable when option showCurrentTime is true.
   */
  getCurrentTime(): Date;

  /**
   * Retrieve the custom time from the custom time bar with given id.
   * @param id Id is undefined by default.
   */
  getCustomTime(id?: IdType): Date;

  getEventProperties(event: Event): TimelineEventPropertiesResult;

  /**
   * Get the range of all the items as an object containing min date and max date
   */
  getItemRange(): { min: Date, max: Date };

  /**
   * Get an array with the ids of the currently selected items
   */
  getSelection(): IdType[];

  /**
   * Get an array with the ids of the currently visible items.
   */
  getVisibleItems(): IdType[];

  /**
   * Get the current visible window.
   */
  getWindow(): TimelineWindow;

  /**
   * Move the window such that given time is centered on screen.
   */
  moveTo(time: DateType, options?: TimelineAnimationOptions, callback?: (properties?: any) => void): void;

  /**
   * Create an event listener. The callback function is invoked every time the event is triggered.
   */
  on(event: TimelineEvents, callback?: (properties?: any) => void): void;

  /**
   * Remove an event listener created before via function on(event[, callback]).
   */
  off(event: TimelineEvents, callback?: (properties?: any) => void): void;

  /**
   * Force a redraw of the Timeline. The size of all items will be recalculated.
   * Can be useful to manually redraw when option autoResize=false and the window has been resized, or when the items CSS has been changed.
   */
  redraw(): void;

  /**
   * Remove vertical bars previously added to the timeline via addCustomTime method.
   * @param id ID of the custom vertical bar returned by addCustomTime method.
   */
  removeCustomTime(id: IdType): void;

  /**
   * Set a current time. This can be used for example to ensure that a client's time is synchronized with a shared server time.
   * Only applicable when option showCurrentTime is true.
   */
  setCurrentTime(time: DateType): void;

  /**
   * Adjust the time of a custom time bar.
   * @param time The time the custom time bar should point to
   * @param id Id of the custom time bar, and is undefined by default.
   */
  setCustomTime(time: DateType, id?: IdType): void;

  /**
   * Adjust the title attribute of a custom time bar.
   * @param title The title shown when hover over time bar
   * @param id Id of the custom time bar, and is undefined by default.
   */
  setCustomTimeTitle(title: string, id?: IdType): void;

  /**
   * Set both groups and items at once. Both properties are optional.
   * This is a convenience method for individually calling both setItems(items) and setGroups(groups).
   * Both items and groups can be an Array with Objects, a DataSet (offering 2 way data binding), or a DataView (offering 1 way data binding).
   */
  setData(data: { groups?: DataGroupCollectionType; items?: DataItemCollectionType }): void;

  /**
   * Set a data set with groups for the Timeline.
   */
  setGroups(groups?: DataGroupCollectionType): void;

  /**
   * Set a data set with items for the Timeline.
   */
  setItems(items: DataItemCollectionType): void;

  /**
   * Set or update options. It is possible to change any option of the timeline at any time.
   * You can for example switch orientation on the fly.
   */
  setOptions(options: TimelineOptions): void;

  /**
   * Select one or multiple items by their id. The currently selected items will be unselected.
   * To unselect all selected items, call `setSelection([])`.
   */
  setSelection(ids: IdType | IdType[], options?: { focus: boolean, animation: TimelineAnimationOptions }): void;

  /**
   * Set the current visible window.
   * @param start If the parameter value of start is null, the parameter will be left unchanged.
   * @param end If the parameter value of end is null, the parameter will be left unchanged.
   * @param options Timeline animation options. See {@link TimelineAnimationOptions}
   * @param callback The callback function
   */
  setWindow(start: DateType, end: DateType, options?: TimelineAnimationOptions, callback?: () => void): void;

  /**
   * Toggle rollingMode.
   */
  toggleRollingMode(): void;

  /**
   * Zoom in the current visible window.
   * @param percentage A number and must be between 0 and 1. If null, the window will be left unchanged.
   * @param options Timeline animation options. See {@link TimelineAnimationOptions}
   * @param callback The callback function
   */
  zoomIn(percentage: number, options?: TimelineAnimationOptions, callback?: () => void): void;

  /**
   * Zoom out the current visible window.
   * @param percentage A number and must be between 0 and 1. If null, the window will be left unchanged.
   * @param options Timeline animation options. See {@link TimelineAnimationOptions}
   * @param callback The callback function
   */
  zoomOut(percentage: number, options?: TimelineAnimationOptions, callback?: () => void): void;
}

export interface Timeline {
  setGroups(groups?: TimelineGroup[]): void;
  setItems(items?: TimelineItem[]): void;
  getWindow(): TimelineWindow;
  setWindow(start: any, date: any): void;
  focus(selection: any): void;
  on(event?: string, callback?: (properties: any) => void): void;
  off(event: string, callback?: (properties?: any) => void): void;
}

export interface TimelineWindow {
  start: Date;
  end: Date;
}

export interface TimelineItemEditableOption {
  remove?: boolean;
  updateGroup?: boolean;
  updateTime?: boolean;
}

export type TimelineItemEditableType = boolean | TimelineItemEditableOption;

export interface TimelineItem {
  className?: string;
  align?: TimelineAlignType;
  content: string;
  end?: DateType;
  group?: IdType;
  id: IdType;
  start: DateType;
  style?: string;
  subgroup?: IdType;
  title?: string;
  type?: TimelineItemType;
  editable?: TimelineItemEditableType;
  selectable?: boolean;
}

export interface TimelineGroup {
  className?: string;
  content: string | HTMLElement;
  id: IdType;
  style?: string;
  order?: number;
  subgroupOrder?: TimelineOptionsGroupOrderType;
  title?: string;
  visible?: boolean;
  nestedGroups?: IdType[];
  showNested?: boolean;
  subgroupVisibility?: SubGroupVisibilityOptions;
}

/**
 * Animation options interface.
 */
export interface AnimationOptions {
  /**
   * The duration (in milliseconds).
   */
  duration: number;
  /**
   * The easing function.
   *
   * Available are:
   * linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic,
   * easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart,
   * easeInQuint, easeOutQuint, easeInOutQuint.
   */
  easingFunction: EasingFunction;
}

export type EasingFunction =
  'linear' |
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint';
