/// <reference path="jcanvas.d.ts" />

interface JCanvasDefaults {
	handle: JCanvasLayer | null;
	guide: JCanvasLayer | null;
	aspectRatio: number | null;
	resizeFromCenter: boolean;
	constrainProportions: boolean;
	handlePlacement: "corners" | "sides" | "both";
	minWidth: number;
	minHeight: number;
	handlestart?: JCanvasLayerCallback;
	handlestop?: JCanvasLayerCallback;
	handlemove?: JCanvasLayerCallback;
	handlecancel?: JCanvasLayerCallback;
}
