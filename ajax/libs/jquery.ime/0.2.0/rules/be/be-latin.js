( function ( $ ) {
	'use strict';

	var beLatin = {
		id: 'be-latin',
		name: 'Belarusian Łacinka',
		description: 'Belarusian Latin alphabet input method',
		date: '2012-11-06',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Pavel Selitskas',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: [
			[ '=S', 'Š' ],
			[ '=U', 'Ŭ' ],
			[ '-S', 'Ś' ],
			[ '-L', 'Ł' ],
			[ '-Z', 'Ź' ],
			[ '=Z', 'Ž' ],
			[ '-C', 'Ć' ],
			[ '=C', 'Č' ],
			[ '-N', 'Ń' ],
			[ '=s', 'š' ],
			[ '=u', 'ŭ' ],
			[ '-s', 'ś' ],
			[ '-l', 'ł' ],
			[ '-z', 'ź' ],
			[ '=z', 'ž' ],
			[ '-c', 'ć' ],
			[ '=c', 'č' ],
			[ '-n', 'ń' ]
		]
	};

	$.ime.register( beLatin );
}( jQuery ) );
