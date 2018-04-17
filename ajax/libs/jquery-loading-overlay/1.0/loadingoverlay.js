/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
	Author			: Gaspare Sganga
	Version			: 1.0
	License			: MIT
	Documentation	: http://gasparesganga.com/labs/jquery-loading-overlay
****************************************************************************************************/
(function($, undefined){	
	var _defaults = {
		color			: "rgba(255, 255, 255, 0.8)",
		image			: "loading.gif",
		maxSize			: "100px",
		minSize			: "20px",
		resizeInterval	: 0,
		size			: "50%"
	};
	
	$.LoadingOverlaySetup = function(settings){
		$.extend(true, _defaults, settings);
	};
	
	$.LoadingOverlay = function(action, options){
		switch (action.toLowerCase()) {
			case "show":
				var settings = $.extend(true, {}, _defaults, options);
				_Show("body", settings, true);
				break;
				
			case "hide":
				_Hide("body", options);
				break;
		}
	};
	
	$.fn.LoadingOverlay = function(action, options){
		switch (action.toLowerCase()) {
			case "show":
				var settings = $.extend(true, {}, _defaults, options);
				return this.each(function(){
					_Show(this, settings, false);
				});
				
			case "hide":
				return this.each(function(){
					_Hide(this, options);
				});
		}
	};
	
	
	function _Show(container, settings, fixed){
		container = $(container);
		var count = container.data("LoadingOverlayCount");
		if (count === undefined) count = 0;
		if (count == 0) {
			var overlay = $("<div>", {
				class	: "loadingoverlay",
				css 	: {
					"background-color"		: settings.color,
					"background-image"		: (settings.image ? "url("+settings.image+")" : "none"),
					"background-position"	: "center center",
					"background-repeat"		: "no-repeat"
				}
			});
			if (fixed) {
				overlay.css({
					"position"	: "fixed",
					"top"		: 0,
					"left"		: 0,
					"width"		: "100%",
					"height"	: "100%"
				});
			} else {
				overlay.css({
					"position"	: "absolute",
					"top"		: 0,
					"left"		: 0
				});
				_CalculateSize(container, overlay, settings);
				if (container.css("position") == "static") {
					overlay.css({
						"top"	: container.position().top  + parseInt(container.css("margin-top"))  + parseInt(container.css("border-top-width")),
						"left"	: container.position().left + parseInt(container.css("margin-left")) + parseInt(container.css("border-left-width"))
					});
				}
				if (settings.resizeInterval > 0) {
					var resizeIntervalId = setInterval(function(){
						_CalculateSize(container, overlay, settings);
					}, settings.resizeInterval);
					container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
				}
			}
			overlay.appendTo(container);
		}
		count++;
		container.data("LoadingOverlayCount", count);
	}
	
	function _Hide(container, force){
		container = $(container);
		var count	= container.data("LoadingOverlayCount");
		if (count === undefined) return;
		count--;
		if (force || count <= 0) {
			var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
			if (resizeIntervalId) clearInterval(resizeIntervalId);
			container.removeData("LoadingOverlayCount").removeData("LoadingOverlayResizeIntervalId");
			container.children(".loadingoverlay").remove();
		} else {
			container.data("LoadingOverlayCount", count);
		}
	}
	
	function _CalculateSize(container, overlay, settings){
		var size = "auto";
		if (settings.size && settings.size != "auto") {
			var size = Math.min(container.innerWidth(), container.innerHeight()) * parseFloat(settings.size) / 100; 
			if (settings.maxSize && size > parseInt(settings.maxSize)) size = parseInt(settings.maxSize)+"px";
			if (settings.minSize && size < parseInt(settings.minSize)) size = parseInt(settings.minSize)+"px";
		}
		$(overlay).css({
			"width"				: container.innerWidth(),
			"height"			: container.innerHeight(),
			"background-size"	: size
		});
	}
	
}(jQuery));