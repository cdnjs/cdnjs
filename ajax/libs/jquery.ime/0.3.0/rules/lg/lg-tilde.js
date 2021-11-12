( function ( $ ) {
	'use strict';

	var lgTilde = {
		id: 'lg-tilde',
		name: 'lg-tilde',
		description: 'Luganda tilde keyboard',
		date: '2019-03-28',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ '~N', 'Ŋ' ],
			[ '~n', 'ŋ' ]
		]
	};

	$.ime.register( lgTilde );
}( jQuery ) );
