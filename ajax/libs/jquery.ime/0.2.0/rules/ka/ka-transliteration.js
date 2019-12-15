( function ( $ ) {
	'use strict';

	var kaTransliteration = {
		id: 'ka-transliteration',
		name: 'ტრანსლიტერაცია',
		description: 'Georgian transliteration',
		date: '2012-10-14',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Ioseb Dzmanashvili (http://www.code.ge), [[User:Hooman]], Srikanth L',
		license: 'MIT',
		version: '1.0',
		contextLength: 3,
		maxKeyLength: 1,
		patterns: [
			[ '\\\\([A-Za-z|\\~|\\`])', '\\\\', '$1' ],
			[ '`', '„' ],
			[ '~', '“' ],
			[ 'q', 'ქ' ],
			[ 'w', 'წ' ],
			[ 'e', 'ე' ],
			[ 'r', 'რ' ],
			[ 't', 'ტ' ],
			[ 'y', 'ყ' ],
			[ 'u', 'უ' ],
			[ 'i', 'ი' ],
			[ 'o', 'ო' ],
			[ 'p', 'პ' ],

			[ 'a', 'ა' ],
			[ 's', 'ს' ],
			[ 'd', 'დ' ],
			[ 'f', 'ფ' ],
			[ 'g', 'გ' ],
			[ 'h', 'ჰ' ],
			[ 'j', 'ჯ' ],
			[ 'k', 'კ' ],
			[ 'l', 'ლ' ],

			[ 'z', 'ზ' ],
			[ 'x', 'ხ' ],
			[ 'c', 'ც' ],
			[ 'v', 'ვ' ],
			[ 'b', 'ბ' ],
			[ 'n', 'ნ' ],
			[ 'm', 'მ' ],

			[ 'W', 'ჭ' ],
			[ 'R', 'ღ' ],
			[ 'T', 'თ' ],
			[ 'S', 'შ' ],
			[ 'J', 'ჟ' ],
			[ 'Z', 'ძ' ],
			[ 'C', 'ჩ' ] ]
	};

	$.ime.register( kaTransliteration );
}( jQuery ) );
