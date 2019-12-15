( function ( $ ) {
	'use strict';

	var hiInScript, maithiliPatterns, maithiliInScript;
	hiInScript = $.ime.inputmethods[ 'hi-inscript' ];
	maithiliPatterns = $.extend( hiInScript.patterns, [ [ 'z', '\u02BC' ] ] ); // apostrophe

	maithiliInScript = {
		id: 'mai-inscript',
		name: 'इनस्क्रिप्ट',
		description: 'InScript keyboard for Maithili',
		date: '2011-02-26',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 1,
		patterns: maithiliPatterns,
		patterns_x: hiInScript.patterns_x
	};

	$.ime.register( maithiliInScript );
}( jQuery ) );
