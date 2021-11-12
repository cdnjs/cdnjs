( function ( $ ) {
	'use strict';

	var eoQ = {
		id: 'eo-q',
		name: 'Espernto q',
		description: 'writing Esperanto-letters adding q\'s.',
		date: '2013-02-09',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ĉq', 'cq' ],
			[ 'ĝq', 'gq' ],
			[ 'ĥq', 'hq' ],
			[ 'ĵq', 'jq' ],
			[ 'ŝq', 'sq' ],
			[ 'ŭq', 'uq' ],
			[ 'Ĉq', 'Cq' ],
			[ 'Ĝq', 'Gq' ],
			[ 'Ĥq', 'Hq' ],
			[ 'Ĵq', 'Jq' ],
			[ 'Ŝq', 'Sq' ],
			[ 'Ŭq', 'Uq' ],
			[ 'ĈQ', 'CQ' ],
			[ 'ĜQ', 'GQ' ],
			[ 'ĤQ', 'HQ' ],
			[ 'ĴQ', 'JQ' ],
			[ 'ŜQ', 'SQ' ],
			[ 'ŬQ', 'UQ' ],

			[ 'cq', 'ĉ' ],
			[ 'gq', 'ĝ' ],
			[ 'hq', 'ĥ' ],
			[ 'jq', 'ĵ' ],
			[ 'sq', 'ŝ' ],
			[ 'uq', 'ŭ' ],
			[ 'Cq', 'Ĉ' ],
			[ 'Gq', 'Ĝ' ],
			[ 'Hq', 'Ĥ' ],
			[ 'Jq', 'Ĵ' ],
			[ 'Sq', 'Ŝ' ],
			[ 'Uq', 'Ŭ' ],
			[ 'CQ', 'Ĉ' ],
			[ 'GQ', 'Ĝ' ],
			[ 'HQ', 'Ĥ' ],
			[ 'JQ', 'Ĵ' ],
			[ 'SQ', 'Ŝ' ],
			[ 'UQ', 'Ŭ' ] ]

	};

	$.ime.register( eoQ );
}( jQuery ) );
