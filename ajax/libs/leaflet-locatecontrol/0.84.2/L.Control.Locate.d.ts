import { Control, Layer, Map, ControlOptions, PathOptions, MarkerOptions, LocationEvent, LatLngBounds, LocateOptions as LeafletLocateOptions } from "leaflet";

export type SetView = false | "once" | "always" | "untilPan" | "untilPanOrZoom";
export type ClickBehavior = "stop" | "setView";

export interface StringsOptions {
  title?: string | undefined;
  metersUnit?: string | undefined;
  feetUnit?: string | undefined;
  popup?: string | undefined;
  outsideMapBoundsMsg?: string | undefined;
}

export interface ClickBehaviorOptions {
  inView?: ClickBehavior | undefined;
  outOfView?: ClickBehavior | undefined;
  inViewNotFollowing?: ClickBehavior | "inView" | undefined;
}

export interface LocateOptions extends ControlOptions {
  layer?: Layer | undefined;
  setView?: SetView | undefined;
  keepCurrentZoomLevel?: boolean | undefined;
  initialZoomLevel?: number | boolean | undefined;
  getLocationBounds?: ((locationEvent: LocationEvent) => LatLngBounds) | undefined;
  flyTo?: boolean | undefined;
  clickBehavior?: ClickBehaviorOptions | undefined;
  returnToPrevBounds?: boolean | undefined;
  cacheLocation?: boolean | undefined;
  drawCircle?: boolean | undefined;
  drawMarker?: boolean | undefined;
  showCompass?: boolean | undefined;
  markerClass?: any;
  compassClass?: any;
  circleStyle?: PathOptions | undefined;
  markerStyle?: PathOptions | MarkerOptions | undefined;
  compassStyle?: PathOptions | undefined;
  followCircleStyle?: PathOptions | undefined;
  followMarkerStyle?: PathOptions | undefined;
  icon?: string | undefined;
  iconLoading?: string | undefined;
  iconElementTag?: string | undefined;
  textElementTag?: string | undefined;
  circlePadding?: number[] | undefined;
  metric?: boolean | undefined;
  createButtonCallback?: ((container: HTMLDivElement, options: LocateOptions) => { link: HTMLAnchorElement; icon: HTMLElement }) | undefined;
  onLocationError?: ((event: ErrorEvent, control: LocateControl) => void) | undefined;
  onLocationOutsideMapBounds?: ((control: LocateControl) => void) | undefined;
  showPopup?: boolean | undefined;
  strings?: StringsOptions | undefined;
  locateOptions?: LeafletLocateOptions | undefined;
}

export class LocateControl extends Control {
  constructor(locateOptions?: LocateOptions);

  onAdd(map: Map): HTMLElement;

  start(): void;

  stop(): void;

  stopFollowing(): void;

  setView(): void;
}
