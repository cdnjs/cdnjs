( function ( $ ) {
	'use strict';

	var ffTilde = {
		id: 'ff-tilde',
		name: 'Fulfulde tilde',
		description: 'Fulfulde tilde',
		date: '2019-05-07',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~b', 'ɓ' ],
			[ '~B', 'Ɓ' ],
			[ '~d', 'ɗ' ],
			[ '~D', 'Ɗ' ],
			[ '~g', 'ɠ' ],
			[ '~G', 'Ɠ' ],
			[ '~q', 'ŋ' ],
			[ '~Q', 'Ŋ' ],
			[ '~j', 'ɲ' ],
			[ '~J', 'Ɲ' ],
			[ '~n', 'ñ' ],
			[ '~N', 'Ñ' ],
			[ '~y', 'ƴ' ],
			[ '~Y', 'Ƴ' ]
		]
	};

	$.ime.register( ffTilde );
}( jQuery ) );
