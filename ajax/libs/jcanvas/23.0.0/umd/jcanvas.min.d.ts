/**
 * @license jCanvas TypeScript Declarations
 * Copyright 2024 Caleb Evans
 * Released under the MIT license
 */
declare module "jcanvas";
declare module "jcanvas/dist/umd/jcanvas.min.js";
declare module "jcanvas/dist/umd/jcanvas-crescents.min.js";
declare module "jcanvas/dist/umd/jcanvas-donuts.min.js";
declare module "jcanvas/dist/umd/jcanvas-hearts.min.js";
declare module "jcanvas/dist/umd/jcanvas-handles.min.js";
declare module "jcanvas/dist/esm/jcanvas.min.js";
declare module "jcanvas/dist/esm/jcanvas-crescents.min.js";
declare module "jcanvas/dist/esm/jcanvas-donuts.min.js";
declare module "jcanvas/dist/esm/jcanvas-hearts.min.js";
declare module "jcanvas/dist/esm/jcanvas-handles.min.js";

interface JCanvasPluginParams<TProps extends object> {
	name: string;
	props?: TProps;
	type?: string;
	fn: (
		this: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		params: JCanvasObject & TProps
	) => void;
}

type JCanvasMouseEventName =
	| "click"
	| "dblclick"
	| "mousedown"
	| "mouseup"
	| "mousemove"
	| "mouseover"
	| "mouseout"
	| "contextmenu";

type JCanvasTouchEventName = "touchstart" | "touchmove" | "touchend";

type JCanvasPointerEventName = "pointerdown" | "pointermove" | "pointerup";

type JCanvasDragEventName = "dragstart" | "drag" | "dragstop" | "dragcancel";

type JCanvasInteractionEventName =
	| JCanvasMouseEventName
	| JCanvasTouchEventName
	| JCanvasPointerEventName
	| JCanvasDragEventName;

type JCanvasMechanicalEventName =
	| "add"
	| "remove"
	| "change"
	| "move"
	| "animatestart"
	| "animate"
	| "animateend"
	| "stop"
	| "delay";

type JCanvasImageEventName = "load";

type JCanvasEventName =
	| JCanvasInteractionEventName
	| JCanvasMechanicalEventName
	| JCanvasImageEventName;

interface JCanvasMaps {
	drawings: Record<string, string>;
	touchEvents: Partial<
		Record<JCanvasInteractionEventName, JCanvasTouchEventName>
	>;
	mouseEvents: Partial<
		Record<JCanvasInteractionEventName, JCanvasMouseEventName>
	>;
}

interface JCanvasCache {
	dataCache: {
		_canvas?: HTMLCanvasElement;
		_data?: JCanvasInternalData;
	};
	propCache: Partial<JCanvasObject>;
	imageCache: Record<string, HTMLImageElement>;
	pathCache: Record<string, Path2D>;
}

interface JCanvasBaseTransforms {
	rotate: number;
	scaleX: number;
	scaleY: number;
	translateX: number;
	translateY: number;
	masks: JCanvasObject[];
}

interface JCanvasCss {
	props: (keyof JCanvasObject)[];
	propsObj: Record<string, boolean>;
}

interface JCanvasPx {
	r: number;
	g: number;
	b: number;
	a: number;
}

type JCanvasLayerCallbackWithProps = (
	layer: JCanvasLayer,
	props?: Partial<JCanvasObject>
) => void;

type JCanvasEventHooks = Record<string, JCanvasLayerCallbackWithProps>;

interface JCanvas {
	defaults: JCanvasDefaults;
	events: Record<string, ($canvas: JQuery, data: JCanvasInternalData) => void>;
	eventHooks: JCanvasEventHooks;
	future: Record<string, any>;
	extend<TProps extends object>(plugin: JCanvasPluginParams<TProps>): void;
	clearCache(): void;
	transformShape(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		params: jCanvasObject,
		width?: number | null,
		height?: number | null
	): void;
	detectEvents(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		params: jCanvasObject
	): void;
	closePath(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		params: jCanvasObject
	): void;
}

interface JQueryEventWithFix extends JQuery.EventExtensions {
	fix: (event: Event) => Event;
}

type JCanvasLayerId = JCanvasLayer | string | number | RegExp | undefined;
type jCanvasLayerGroupId = JCanvasLayer[] | string | RegExp;
type JCanvasLayerCallback = (layer: JCanvasLayer) => void;
type JCanvasGetLayersCallback = (layer: JCanvasLayer) => any;
type JCanvasStyleFunction = (
	layer: JCanvasLayer
) => string | CanvasGradient | CanvasPattern;

type JCanvasObjectFunction = {
	new (this: JCanvasObject, args?: Partial<JCanvasObject>): JCanvasObject;
	(this: JCanvasObject, args?: Partial<JCanvasObject>): JCanvasObject;
};

type JCanvasLayerFunction = {
	new (
		this: JCanvasLayer,
		canvas: HTMLCanvasElement,
		params: JCanvasObject
	): JCanvasLayer;
	(
		this: JCanvasLayer,
		canvas: HTMLCanvasElement,
		params: JCanvasObject
	): JCanvasLayer;
};

interface JQueryStatic {
	jCanvas: JCanvas;
	jCanvasObject: JCanvasObjectFunction;
}

interface JQuery {
	getEventHooks(): JCanvasEventHooks;
	setEventHooks(eventHooks: JCanvasEventHooks): JQuery;
	getLayers(callback?: JCanvasGetLayersCallback): JCanvasLayer[];
	getLayer(layerId: JCanvasLayerId): JCanvasLayer | undefined;
	getLayerGroup(groupId: jCanvasLayerGroupId): JCanvasLayer[] | undefined;
	getLayerIndex(layerId: JCanvasLayerId): number;
	setLayer(layerId: JCanvasLayerId, props: Partial<JCanvasObject>): JQuery;
	setLayers(
		props: Partial<JCanvasLayer>,
		callback: JCanvasGetLayersCallback
	): JQuery;
	setLayerGroup(
		groupId: jCanvasLayerGroupId,
		props: Partial<JCanvasLayer>
	): JQuery;
	moveLayer(layerId: JCanvasLayerId, index: number): JQuery;
	removeLayer(layerId: JCanvasLayerId): JQuery;
	removeLayers(callback?: JCanvasLayerCallback): JQuery;
	removeLayerGroup(groupId: jCanvasLayerGroupId): JQuery;
	addLayerToGroup(layerId: JCanvasLayerId, groupName: string): JQuery;
	removeLayerFromGroup(layerId: JCanvasLayerId, groupName: string): JQuery;
	triggerLayerEvent(layerId: JCanvasLayerId, eventType: string): JQuery;
	drawLayer(layerId: JCanvasLayerId, groupName: string): JQuery;
	drawLayers(args?: {
		clear?: boolean;
		resetFire?: boolean;
		index?: number;
		complete?: () => void;
	}): JQuery;
	addLayer(args: Partial<JCanvasObject>): JQuery;
	animateLayer(
		layerId: JCanvasLayerId,
		props: Partial<JCanvasAnimatableProps>,
		...args: any[]
	): JQuery;
	animateLayerGroup(
		groupId: jCanvasLayerGroupId,
		props: Partial<JCanvasObject>,
		...args: any[]
	): JQuery;
	delayLayer(layerId: JCanvasLayerId, duration: number): JQuery;
	delayLayerGroup(groupId: jCanvasLayerGroupId, duration: number): JQuery;
	stopLayer(layerId: JCanvasLayerId, clearQueue?: boolean): JQuery;
	stopLayerGroup(groupId: jCanvasLayerGroupId, clearQueue?: boolean): JQuery;
	draw(args: Partial<JCanvasObject>): JQuery;
	clearCanvas(args?: Partial<JCanvasObject>): JQuery;
	saveCanvas(args?: Partial<JCanvasObject>): JQuery;
	restoreCanvas(args?: Partial<JCanvasObject>): JQuery;
	rotateCanvas(args?: Partial<JCanvasObject>): JQuery;
	scaleCanvas(args?: Partial<JCanvasObject>): JQuery;
	translateCanvas(args?: Partial<JCanvasObject>): JQuery;
	drawRect(args: Partial<JCanvasObject>): JQuery;
	drawArc(args: Partial<JCanvasObject>): JQuery;
	drawEllipse(args: Partial<JCanvasObject>): JQuery;
	drawPolygon(args: Partial<JCanvasObject>): JQuery;
	drawSlice(args: Partial<JCanvasObject>): JQuery;
	drawLine(args: Partial<JCanvasObject>): JQuery;
	drawQuadratic(args: Partial<JCanvasObject>): JQuery;
	drawBezier(args: Partial<JCanvasObject>): JQuery;
	drawVector(args: Partial<JCanvasObject>): JQuery;
	drawPath(args: Partial<JCanvasObject>): JQuery;
	drawText(args: Partial<JCanvasObject>): JQuery;
	measureText(args: JCanvasLayerId): JCanvasObject;
	drawImage(args: Partial<JCanvasObject>): JQuery;
	createPattern(args: Partial<JCanvasObject>): CanvasPattern | null;
	createGradient(args: Partial<JCanvasObject>): CanvasGradient | null;
	setPixels(args: Partial<JCanvasObject>): JQuery;
	getCanvasImage(type: string, quality?: number): string | null;
	detectPixelRatio(callback?: (ratio: number) => void): JQuery;
}

interface JCanvasDefaults {
	align: CanvasRenderingContext2D["textAlign"];
	arrowAngle: number;
	arrowRadius: number;
	autosave: boolean;
	baseline: CanvasRenderingContext2D["textBaseline"];
	bringToFront: boolean;
	canvas: HTMLCanvasElement | null;
	ccw: boolean;
	closed: boolean;
	compositing: CanvasRenderingContext2D["globalCompositeOperation"];
	concavity: number;
	cornerRadius: number;
	count: number;
	cropFromCenter: boolean;
	crossOrigin: HTMLImageElement["crossOrigin"];
	cursors: Record<string, string> | null;
	disableEvents: boolean;
	draggable: boolean;
	dragging: boolean;
	dragGroups: string[] | null;
	groups: string[] | null;
	d: string | null;
	data: object | null;
	dx: number;
	dy: number;
	end: number;
	endArrow: boolean;
	eventX: number | null;
	eventY: number | null;
	fillRule: CanvasFillRule;
	fillStyle: string | CanvasGradient | CanvasPattern | JCanvasStyleFunction;
	flipArcText: boolean;
	fontStyle: string;
	fontSize: string;
	fontFamily: string;
	fromCenter: boolean;
	height: number | null;
	imageSmoothing: boolean;
	inDegrees: boolean;
	intangible: boolean;
	index: number | null;
	intersects: boolean;
	letterSpacing: number | null;
	lineHeight: number;
	layer: boolean;
	mask: boolean;
	maxWidth: number | null;
	method: keyof JQuery | null;
	miterLimit: number;
	name: string | null;
	opacity: number;
	r1: number | null;
	r2: number | null;
	radius: number;
	repeat: Parameters<CanvasRenderingContext2D["createPattern"]>[1];
	respectAlign: boolean;
	restrictDragToAxis: "x" | "y" | null;
	rotate: number;
	rounded: boolean;
	scale: number;
	scaleX: number;
	scaleY: number;
	shadowBlur: number;
	shadowColor: string;
	shadowStroke: boolean;
	shadowX: number;
	shadowY: number;
	sHeight: number | null;
	sides: number;
	source: string | HTMLImageElement | HTMLCanvasElement;
	spread: number;
	start: number;
	startArrow: boolean;
	strokeCap: CanvasRenderingContext2D["lineCap"];
	strokeDash: number[] | null;
	strokeDashOffset: CanvasRenderingContext2D["lineDashOffset"];
	strokeJoin: CanvasRenderingContext2D["lineJoin"];
	strokeStyle: string | CanvasGradient | CanvasPattern | JCanvasStyleFunction;
	strokeWidth: number;
	style: Record<string, boolean>;
	sWidth: number | null;
	sx: number | null;
	sy: number | null;
	text: string;
	translate: number;
	translateX: number;
	translateY: number;
	type: string | null;
	visible: boolean;
	width: number | null;
	willReadFrequently: boolean;
	x: number;
	y: number;
	each?: (
		this: HTMLCanvasElement,
		px: JCanvasPx,
		params: JCanvasObject
	) => void;
	load?: (
		this: HTMLCanvasElement,
		arg: JCanvasObject | CanvasPattern | null
	) => void;
	fn?: (
		this: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		params: JCanvasObject
	) => void;
	click?: JCanvasLayerCallback;
	dblclick?: JCanvasLayerCallback;
	mousedown?: JCanvasLayerCallback;
	mouseup?: JCanvasLayerCallback;
	mousemove?: JCanvasLayerCallback;
	mouseover?: JCanvasLayerCallback;
	mouseout?: JCanvasLayerCallback;
	touchstart?: JCanvasLayerCallback;
	touchend?: JCanvasLayerCallback;
	touchmove?: JCanvasLayerCallback;
	dragstart?: JCanvasLayerCallback;
	dragstop?: JCanvasLayerCallback;
	drag?: JCanvasLayerCallback;
	dragcancel?: JCanvasLayerCallback;
	updateDragX?: (layer: JCanvasLayer, newX: number) => number;
	updateDragY?: (layer: JCanvasLayer, newY: number) => number;
	pointerdown?: JCanvasLayerCallback;
	pointerup?: JCanvasLayerCallback;
	pointermove?: JCanvasLayerCallback;
	contextmenu?: JCanvasLayerCallback;
	add?: JCanvasLayerCallback;
	remove?: JCanvasLayerCallback;
	change?: JCanvasLayerCallbackWithProps;
	move?: JCanvasLayerCallback;
	animatestart?: JCanvasLayerCallback;
	animate?: (layer: JCanvasLayer, fx: JQuery.Tween) => void;
	animateend?: JCanvasLayerCallback;
	stop?: JCanvasLayerCallback;
	delay?: JCanvasLayerCallback;
	[key: `x${number}`]: number;
	[key: `y${number}`]: number;
	[key: `cx${number}`]: number;
	[key: `cy${number}`]: number;
	[key: `a${number}`]: number;
	[key: `l${number}`]: number;
	[key: `p${number}`]: number;
	[key: `_${string}`]: any;
}

interface JCanvasObject extends JCanvasDefaults {}

interface JCanvasLayer extends JCanvasObject {
	canvas: NonNullable<JCanvasObject["canvas"]>;
	_layer?: true;
}

interface JCanvasPropHooks {
	[key: string]: JQuery.PropHook<JCanvasLayer>;
}

type JCanvasNumberParams = {
	[K in keyof JCanvasObject]: JCanvasObject[K] extends number ? K : never;
};

type JCanvasAnimatableProps = {
	[K in keyof JCanvasNumberParams]: NumberProperties[K] | number | string;
};
