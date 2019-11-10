( function ( $ ) {
	'use strict';

	var defs = {
		id: 'se-normforms',
		name: 'Davvisámegiella',
		description: 'Northern Sami input method',
		date: '2012-12-04',
		URL: 'http://giellatekno.uit.no/doc/infra/samihtml.html',
		author: 'John Erling Blad',
		license: 'GPLv3',
		version: '1.0',
		// contextLength: 1,
		maxKeyLength: 3,
		patterns: [
			// Uses "~" as "approximatly similar to"
			[ '\'a', 'á' ], // The simple ~a does not work as there is a "ã"
			[ '\'A', 'Á' ], // The simple ~A does not work as there is a "Ã"
			[ '~c', 'č' ],
			[ '~C', 'Č' ],
			[ '~d', 'đ' ],
			[ '~D', 'Đ' ],
			// [ '~ng', 'ŋ' ], // The simple ~n does not work as there is a "ñ"
			// [ '~NG', 'Ŋ' ], // The simple ~N does not work as there is a "Ñ"
			[ '~g', 'ŋ' ],
			[ '~G', 'Ŋ' ],
			[ '~s', 'š' ],
			[ '~S', 'Š' ],
			[ '~t', 'ŧ' ],
			[ '~T', 'Ŧ' ],
			[ '~z', 'ž' ],
			[ '~Z', 'Ž' ]
			// historically similar forms
		]
	};

	$.ime.register( defs );
}( jQuery ) );
