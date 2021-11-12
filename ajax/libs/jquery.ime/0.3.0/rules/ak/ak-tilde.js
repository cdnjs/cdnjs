( function ( $ ) {
	'use strict';

	var akTilde = {
		id: 'ak-tilde',
		name: 'Akan tilde',
		description: 'Akan tilde',
		date: '2019-05-06',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 2,
		patterns: [
			[ '~E', 'Ɛ' ],
			[ '~e', 'ɛ' ],
			[ '~O', 'Ɔ' ],
			[ '~o', 'ɔ' ]
		]
	};

	$.ime.register( akTilde );
}( jQuery ) );
