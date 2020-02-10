// enable standard Yandex map controls/behaviors in fullscreen
// Notes:
// - markers and other overlays are not visible in this mode
// - valid apikey required for correct work of all functions
//   https://tech.yandex.com/maps/jsapi/doc/2.1/quick-start/index-docpage/

L.Yandex.addInitHook('on', 'load', function () {
	var ymap = this._yandex;
	var behaviors = ['drag','dblClickZoom', 'scrollZoom', L.Browser.mobile ? 'multiTouch' : 'rightMouseButtonMagnifier'];
	ymap.container.events
		.add('fullscreenenter',function () {
			ymap.controls
				.add('mediumMapDefaultSet')
				.add('routeButtonControl');
			ymap.controls.get('fullscreenControl').state.set('selected',true);
			ymap.controls.get('searchControl').options.set('size','small');
			ymap.controls.get('typeSelector').options.set('size','small');
			//ymap.controls.get('zoomControl').options.set('size','small');
			ymap.behaviors.enable(behaviors);
			ymap.options.set('balloonAutoPan',true);
		})
		.add('fullscreenexit',function () {
			ymap.controls
				.remove('mediumMapDefaultSet')
				.remove('routeButtonControl');
			ymap.behaviors.disable(behaviors);
			ymap.options.set('balloonAutoPan',false);
			this._resyncView();
		},this);
});
