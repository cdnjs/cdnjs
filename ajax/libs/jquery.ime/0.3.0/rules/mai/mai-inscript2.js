( function ( $ ) {
	'use strict';

	var hiInScript2, maithiliPatterns2, maithiliInScript2;

	hiInScript2 = $.ime.inputmethods[ 'hi-inscript2' ];
	maithiliPatterns2 = $.extend( hiInScript2.patterns,
		[ [ 'z', '\u02BC' ] ]
	); // apostrophe

	maithiliInScript2 = {
		id: 'mai-inscript2',
		name: 'इनस्क्रिप्ट २',
		description: 'InScript2 keyboard for Maithili',
		date: '2013-02-13',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 1,
		patterns: maithiliPatterns2,
		patterns_x: hiInScript2.patterns_x
	};

	$.ime.register( maithiliInScript2 );
}( jQuery ) );
