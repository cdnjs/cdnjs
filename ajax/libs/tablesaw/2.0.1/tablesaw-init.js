/*! Tablesaw - v2.0.1 - 2015-10-09
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2015 Filament Group; Licensed MIT */
;(function( $ ) {

	// DOM-ready auto-init of plugins.
	// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
	$( function(){
		$( document ).trigger( "enhance.tablesaw" );
	});

})( jQuery );