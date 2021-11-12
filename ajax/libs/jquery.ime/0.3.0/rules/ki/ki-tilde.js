( function ( $ ) {
	'use strict';

	var kiTilde = {
		id: 'ki-tilde',
		name: 'ki-tilde',
		description: 'Kikuyu input keyboard - tilde',
		date: '2019-01-22',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~I', 'Ĩ' ],
			[ '~i', 'ĩ' ],
			[ '~U', 'Ũ' ],
			[ '~u', 'ũ' ]
		]
	};

	$.ime.register( kiTilde );
}( jQuery ) );
