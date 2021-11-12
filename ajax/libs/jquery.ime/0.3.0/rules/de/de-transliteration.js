( function ( $ ) {
	'use strict';

	var de = {
		id: 'de-transliteration',
		name: 'Deutsch Tilde',
		description: 'German input method',
		date: '2012-11-20',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Erik Moeller',
		license: 'Public domain',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: [
			[ '~A', 'Ä' ],
			[ '~O', 'Ö' ],
			[ '~U', 'Ü' ],
			[ '~a', 'ä' ],
			[ '~o', 'ö' ],
			[ '~u', 'ü' ],
			[ '~s', 'ß' ],
			[ '~S', 'ß' ] ]
	};

	$.ime.register( de );
}( jQuery ) );
