/*! Tablesaw - v3.0.5 - 2017-10-30
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2017 Filament Group; Licensed MIT */
(function(win) {
	"use strict";
	var $;
	if ("shoestring" in win) {
		$ = win.shoestring;
	} else if ("jQuery" in win) {
		$ = win.jQuery;
	} else {
		throw new Error("tablesaw: DOM library not found.");
	}

	// DOM-ready auto-init of plugins.
	// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
	// Use raw DOMContentLoaded instead of shoestring (may have issues in Android 2.3, exhibited by stack table)
	if ("addEventListener" in document) {
		document.addEventListener("DOMContentLoaded", function() {
			$(document).trigger("enhance.tablesaw");
		});
	}
})(typeof window !== "undefined" ? window : this);
