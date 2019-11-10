( function ( $ ) {
	'use strict';

	var yoAlt = {
		id: 'yo-alt',
		name: 'Yorùbá Alt',
		description: 'Yorùbá Alt',
		date: '2015-11-14',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns_x: [
			// Combining dot below
			[ '\\.', '\u0323' ],
			// Combining grave tone mark
			[ '\\\\', '\u0340' ],
			// Combining acute tone mark
			[ '/', '\u0341' ]
		]
	};

	$.ime.register( yoAlt );
}( jQuery ) );
