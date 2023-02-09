/**
 * This module houses all core/framework functionality and is required for
 * all charting components to work
 */
/**
 * Elements: core
 */
export { System, system } from "./.internal/core/System";
export { BaseObject, IBaseObjectEvents, BaseObjectEvents } from "./.internal/core/Base";
export { CalculatedValue, IComponentProperties, IComponentDataFields, IComponentEvents, IComponentAdapters, Component } from "./.internal/core/Component";
export { ContainerLayout, IContainerProperties, IContainerEvents, IContainerAdapters, Container, FontWeight, TextDecoration } from "./.internal/core/Container";
export { IValues, IDataItemEvents, IDataItemAdapters, DataItem } from "./.internal/core/DataItem";
export { ISpriteProperties, ISpriteAnimationOptions, ISpriteAdapters, Sprite } from "./.internal/core/Sprite";
export { SpriteEventDispatcher, SpritePointEvent, SpriteMouseTouchEvent, SpriteShiftEvent, ISpriteEvents } from "./.internal/core/SpriteEvents";
export { SpriteState } from "./.internal/core/SpriteState";
export { registry, Registry, IRegistryEvents, is } from "./.internal/core/Registry";
export { options, Options } from "./.internal/core/Options";
/**
 * Elements: data
 */
export { ICSVOptions, CSVParser } from "./.internal/core/data/CSVParser";
export { IDataLoaderAdapters, DataLoader, dataLoader } from "./.internal/core/data/DataLoader";
export { IDataParserOptions, DataParser } from "./.internal/core/data/DataParser";
export { IDataSourceEvents, IDataSourceAdapters, DataSource } from "./.internal/core/data/DataSource";
export { IJSONOptions, JSONParser } from "./.internal/core/data/JSONParser";
/**
 * Elements: defs
 */
export { Roles, AriaLive } from "./.internal/core/defs/Accessibility";
export { Align } from "./.internal/core/defs/Align";
export { HorizontalCenter } from "./.internal/core/defs/HorizontalCenter";
export { IGeoPoint } from "./.internal/core/defs/IGeoPoint";
export { IMorphable } from "./.internal/core/defs/IMorphable";
export { IPoint, IOrientationPoint } from "./.internal/core/defs/IPoint";
export { IRectangle } from "./.internal/core/defs/IRectangle";
export { IRange } from "./.internal/core/defs/IRange";
export { IStyleProperty } from "./.internal/core/defs/IStyleProperty";
export { ITimeInterval } from "./.internal/core/defs/ITimeInterval";
export { IWavedShape } from "./.internal/core/defs/IWavedShape";
export { Orientation } from "./.internal/core/defs/Orientation";
export { ShapeRendering } from "./.internal/core/defs/ShapeRendering";
export { SVGDefaults } from "./.internal/core/defs/SVGDefaults";
export { TextAlign } from "./.internal/core/defs/TextAlign";
export { TextValign } from "./.internal/core/defs/TextValign";
export { TimeUnit } from "./.internal/core/defs/TimeUnit";
export { VerticalAlign } from "./.internal/core/defs/VerticalAlign";
export { VerticalCenter } from "./.internal/core/defs/VerticalCenter";
/**
 * Elements: elements
 */
export { IButtonProperties, IButtonEvents, IButtonAdapters, Button } from "./.internal/core/elements/Button";
export { ICircleProperties, ICircleEvents, ICircleAdapters, Circle } from "./.internal/core/elements/Circle";
export { IEllipseProperties, IEllipseEvents, IEllipseAdapters, Ellipse } from "./.internal/core/elements/Ellipse";
export { IImageProperties, IImageEvents, IImageAdapters, Image } from "./.internal/core/elements/Image";
export { ITextLineInfo, ILabelProperties, ILabelEvents, ILabelAdapters, Label } from "./.internal/core/elements/Label";
export { ILineProperties, ILineEvents, ILineAdapters, Line } from "./.internal/core/elements/Line";
export { IPopupAdapters, Popup } from "./.internal/core/elements/Popup";
export { IModalAdapters, Modal } from "./.internal/core/elements/Modal";
export { IPointedRectangleProperties, IPointedRectangleEvents, IPointedRectangleAdapters, PointedRectangle } from "./.internal/core/elements/PointedRectangle";
export { IPointedShapeProperties, IPointedShapeEvents, IPointedShapeAdapters, PointedShape } from "./.internal/core/elements/PointedShape";
export { IPolyarcProperties, IPolyarcEvents, IPolyarcAdapters, Polyarc } from "./.internal/core/elements/Polyarc";
export { IPolygonProperties, IPolygonEvents, IPolygonAdapters, Polygon } from "./.internal/core/elements/Polygon";
export { IPolylineProperties, IPolylineEvents, IPolylineAdapters, Polyline } from "./.internal/core/elements/Polyline";
export { IPolysplineProperties, IPolysplineEvents, IPolysplineAdapters, Polyspline } from "./.internal/core/elements/Polyspline";
export { IPreloaderProperties, IPreloaderEvents, IPreloaderAdapters, Preloader } from "./.internal/core/elements/Preloader";
export { IRectangleProperties, IRectangleEvents, IRectangleAdapters, Rectangle } from "./.internal/core/elements/Rectangle";
export { IResizeButtonProperties, IResizeButtonEvents, IResizeButtonAdapters, ResizeButton } from "./.internal/core/elements/ResizeButton";
export { CloseButton, ICloseButtonAdapters, ICloseButtonEvents, ICloseButtonProperties } from "./.internal/core/elements/CloseButton";
export { ISwitchButtonAdapters, ISwitchButtonEvents, ISwitchButtonProperties, SwitchButton } from "./.internal/core/elements/SwitchButton";
export { IRoundedRectangleProperties, IRoundedRectangleEvents, IRoundedRectangleAdapters, RoundedRectangle } from "./.internal/core/elements/RoundedRectangle";
export { IScrollbarProperties, IScrollbarEvents, IScrollbarAdapters, Scrollbar } from "./.internal/core/elements/Scrollbar";
export { ISliderProperties, ISliderEvents, ISliderAdapters, Slider } from "./.internal/core/elements/Slider";
export { ISliceProperties, ISliceEvents, ISliceAdapters, Slice } from "./.internal/core/elements/Slice";
export { ITextLinkProperties, ITextLinkEvents, ITextLinkAdapters, TextLink } from "./.internal/core/elements/TextLink";
export { PointerOrientation, ITooltipProperties, ITooltipEvents, ITooltipAdapters, Tooltip } from "./.internal/core/elements/Tooltip";
export { ITrapezoidProperties, ITrapezoidEvents, ITrapezoidAdapters, Trapezoid } from "./.internal/core/elements/Trapezoid";
export { ITriangleProperties, ITriangleEvents, ITriangleAdapters, Triangle } from "./.internal/core/elements/Triangle";
export { IWavedCircleProperties, IWavedCircleEvents, IWavedCircleAdapters, WavedCircle } from "./.internal/core/elements/WavedCircle";
export { IWavedLineProperties, IWavedLineEvents, IWavedLineAdapters, WavedLine } from "./.internal/core/elements/WavedLine";
export { IWavedRectangleProperties, IWavedRectangleEvents, IWavedRectangleAdapters, WavedRectangle } from "./.internal/core/elements/WavedRectangle";
export { IZoomOutButtonProperties, IZoomOutButtonEvents, IZoomOutButtonAdapters, ZoomOutButton } from "./.internal/core/elements/ZoomOutButton";
export { IPlayButtonProperties, IPlayButtonEvents, IPlayButtonAdapters, PlayButton } from "./.internal/core/elements/PlayButton";
/**
 * Elements: 3d
 */
export { IConeProperties, IConeEvents, IConeAdapters, Cone } from "./.internal/core/elements/3d/Cone";
export { Rectangle3DProperties, Rectangle3DEvents, Rectangle3DAdapters, Rectangle3D } from "./.internal/core/elements/3d/Rectangle3D";
export { ISlice3DProperties, ISlice3DEvents, ISlice3DAdapters, Slice3D } from "./.internal/core/elements/3d/Slice3D";
/**
 * Elements: export
 */
export { ExportOperation, imageFormats, IExportImageOptions, IExportSVGOptions, pageSizes, IExportPDFOptions, IExportCSVOptions, IExportJSONOptions, IExportExcelOptions, IExportPrintOptions, IExportRemovedObject, IExportOptions, ExportOptions, IExportEvents, Keys, IExportAdapters, Export, IFont, IFile } from "./.internal/core/export/Export";
export { IExportMenuItem, IExportMenuEvents, IExportMenuAdapters, ExportMenu } from "./.internal/core/export/ExportMenu";
/**
 * Elements: formatters
 */
export { DateFormatInfo, DateFormatter } from "./.internal/core/formatters/DateFormatter";
export { DurationFormatter } from "./.internal/core/formatters/DurationFormatter";
export { NumberFormatter } from "./.internal/core/formatters/NumberFormatter";
export { ITextChunk, ITextFormatterAdapters, TextFormatter, getTextFormatter } from "./.internal/core/formatters/TextFormatter";
/**
 * Elements: interaction
 */
export { InertiaTypes, Inertia } from "./.internal/core/interaction/Inertia";
export { IInteractionEvents, Interaction, getInteraction } from "./.internal/core/interaction/Interaction";
export { InteractionKeyboardObject } from "./.internal/core/interaction/InteractionKeyboardObject";
export { InteractionObject } from "./.internal/core/interaction/InteractionObject";
export { PointEvent, PointerEvent, ShiftEvent, AngleEvent, ScaleEvent, CenterEvent, MouseTouchEvent, SimulatedKeyboardEvent, IInteractionObjectEvents, InteractionObjectEventDispatcher } from "./.internal/core/interaction/InteractionObjectEvents";
export { IInertiaOptions, IHitOptions, ISwipeOptions, ICursorOptions, IKeyboardOptions } from "./.internal/core/interaction/InteractionOptions";
export { MouseCursorStyle } from "./.internal/core/interaction/Mouse";
export { IPointer, IBreadcrumb } from "./.internal/core/interaction/Pointer";
/**
 * Elements: rendering
 */
export { SVGAttribute, ISVGAttribute, AMElement } from "./.internal/core/rendering/AMElement";
export { Group } from "./.internal/core/rendering/Group";
export { SVGElementNames, Paper } from "./.internal/core/rendering/Paper";
export { ISmoothing, Tension, Basis } from "./.internal/core/rendering/Smoothing";
export { SVGContainer } from "./.internal/core/rendering/SVGContainer";
/**
 * Elements: fills
 */
export { ColorModifier } from "./.internal/core/rendering/fills/ColorModifier";
export { IGradientStop, LinearGradient } from "./.internal/core/rendering/fills/LinearGradient";
export { LinearGradientModifier } from "./.internal/core/rendering/fills/LinearGradientModifier";
export { RadialGradientModifier } from "./.internal/core/rendering/fills/RadialGradientModifier";
export { LinePattern } from "./.internal/core/rendering/fills/LinePattern";
export { CirclePattern } from "./.internal/core/rendering/fills/CirclePattern";
export { PatternUnits, PatternProperties, Pattern } from "./.internal/core/rendering/fills/Pattern";
export { RadialGradient } from "./.internal/core/rendering/fills/RadialGradient";
export { RectPatternProperties, RectPattern } from "./.internal/core/rendering/fills/RectPattern";
/**
 * Elements: filters
 */
export { ColorizeFilterProperties, ColorizeFilter } from "./.internal/core/rendering/filters/ColorizeFilter";
export { DesaturateFilterProperties, DesaturateFilter } from "./.internal/core/rendering/filters/DesaturateFilter";
export { DropShadowFilterProperties, DropShadowFilter } from "./.internal/core/rendering/filters/DropShadowFilter";
export { BlurFilterProperties, BlurFilter } from "./.internal/core/rendering/filters/BlurFilter";
export { FilterProperties, Filter } from "./.internal/core/rendering/filters/Filter";
export { FocusFilterProperties, FocusFilter } from "./.internal/core/rendering/filters/FocusFilter";
export { LightenFilterProperties, LightenFilter } from "./.internal/core/rendering/filters/LightenFilter";
/**
 * Elements: utils
 */
export { GlobalAdapter, globalAdapter, Adapter } from "./.internal/core/utils/Adapter";
export { IAnimationObject, IAnimatable, IAnimationOptions, IPercentAnimationOptions, IColorAnimationOptions, IAnimationEvents, Animation, animate } from "./.internal/core/utils/Animation";
export { SortResult } from "./.internal/core/utils/Array";
export { Listener, nextFrame, readFrame, writeFrame, whenIdle, triggerIdle } from "./.internal/core/utils/AsyncPending";
export { Cache, cache } from "./.internal/core/utils/Cache";
export { IClone } from "./.internal/core/utils/Clone";
export { Color, iRGB, iHSL, iHSV, color, isColor, castColor } from "./.internal/core/utils/Color";
export { IColorSetStepOptions, ColorSet } from "./.internal/core/utils/ColorSet";
export { PatternSet } from "./.internal/core/utils/PatternSet";
export { IColorPurpose, InterfaceColorSet } from "./.internal/core/utils/InterfaceColorSet";
export { Constructor } from "./.internal/core/utils/Constructor";
export { IDictionaryEvents, DictionaryLike, DictionaryDisposer, Dictionary, DictionaryTemplate } from "./.internal/core/utils/Dictionary";
export { IDisposer, Disposer, MultiDisposer, MutableValueDisposer, CounterDisposer } from "./.internal/core/utils/Disposer";
export { StyleRule, StyleClass, getElement, addClass, removeClass, blur, focus, outerHTML, isElement, copyAttributes, fixPixelPerfect, ready } from "./.internal/core/utils/DOM";
export { AMEvent, EventListener, EventDispatcher, TargetedEventDispatcher } from "./.internal/core/utils/EventDispatcher";
export { Iterator, Iterable, ListIterator, min, max, join } from "./.internal/core/utils/Iterator";
export { KeyboardKeys, Keyboard, keyboard } from "./.internal/core/utils/Keyboard";
export { ILanguageEvents, ILanguageAdapters, Language } from "./.internal/core/utils/Language";
export { IndexedIterable, IListEvents, ListGrouper, ListLike, ListDisposer, List, ListTemplate } from "./.internal/core/utils/List";
export { Morpher } from "./.internal/core/utils/Morpher";
export { INetLoadResult } from "./.internal/core/utils/Net";
export { Ordering, reverse, or } from "./.internal/core/utils/Order";
export { Percent, percent, isPercent } from "./.internal/core/utils/Percent";
export { Plugin, IPlugin } from "./.internal/core/utils/Plugin";
export { IResponsiveRule, IResponsiveEvents, IResponsiveAdapters, Responsive, ResponsiveBreakpoints, defaultRules } from "./.internal/core/utils/Responsive";
export { ISortedListEvents, OrderedList, SortedList, OrderedListTemplate, SortedListTemplate } from "./.internal/core/utils/SortedList";
export { PX, STRING, NUMBER, DATE, DURATION, PLACEHOLDER, PLACEHOLDER2 } from "./.internal/core/utils/Strings";
export { Public, Optional, isNaN, checkString, checkBoolean, checkNumber, checkObject, castString, castNumber, isString, isNumber, isObject, isArray } from "./.internal/core/utils/Type";
export { Validatable } from "./.internal/core/utils/Validatable";
/**
 * Functions: rendering
 */
import * as path from "./.internal/core/rendering/Path";
export { path };
/**
 * Functions: utils
 */
import * as colors from "./.internal/core/utils/Colors";
export { colors };
import * as ease from "./.internal/core/utils/Ease";
export { ease };
import * as math from "./.internal/core/utils/Math";
export { math };
import * as array from "./.internal/core/utils/Array";
export { array };
import * as number from "./.internal/core/utils/Number";
export { number };
import * as object from "./.internal/core/utils/Object";
export { object };
import * as string from "./.internal/core/utils/String";
export { string };
import * as time from "./.internal/core/utils/Time";
export { time };
import * as utils from "./.internal/core/utils/Utils";
export { utils };
import * as iter from "./.internal/core/utils/Iterator";
export { iter };
import * as type from "./.internal/core/utils/Type";
export { type };
import * as net from "./.internal/core/utils/Net";
export { net };
export { ITheme } from "./.internal/themes/ITheme";
export { create, createFromConfig, createDeferred, disposeAllCharts, viewPortHandler } from "./.internal/core/utils/Instance";
export { useTheme, unuseTheme, unuseAllThemes, addLicense } from "./.internal/core/utils/Instance";
