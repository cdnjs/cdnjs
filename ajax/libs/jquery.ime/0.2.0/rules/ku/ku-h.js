( function ( $ ) {
	'use strict';

	var kuH = {
		id: 'ku-h',
		name: 'Kurdî-h',
		description: 'writing Kurdish-letters adding h\'s',
		date: '2013-06-26',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Ghybu',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		patterns: [
			[ 'çh', 'h', 'ch' ],
			[ 'şh', 'h', 'sh' ],
			[ 'ḧh', 'h', 'hh' ],
			[ 'ẍh', 'h', 'xh' ],
			[ 'êe', 'e', 'ee' ],
			[ 'îi', 'i', 'ii' ],
			[ 'ûu', 'u', 'uu' ],
			[ 'Ç(H|h)', '(H|h)', 'C$1' ],
			[ 'Ş(H|h)', '(H|h)', 'S$1' ],
			[ 'Ḧ(H|h)', '(H|h)', 'H$1' ],
			[ 'Ẍ(H|h)', '(H|h)', 'X$1' ],
			[ 'Ê(E|e)', '(E|e)', 'E$1' ],
			[ 'Î(I|i)', '(I|i)', 'I$1' ],
			[ 'Û(U|u)', '(U|u)', 'U$1' ],

			[ 'ch', 'ç' ],
			[ 'sh', 'ş' ],
			[ 'hh', 'ḧ' ],
			[ 'xh', 'ẍ' ],
			[ 'ee', 'ê' ],
			[ 'ii', 'î' ],
			[ 'uu', 'û' ],
			[ 'C(H|h)', 'Ç' ],
			[ 'S(H|h)', 'Ş' ],
			[ 'H(H|h)', 'Ḧ' ],
			[ 'X(H|h)', 'Ẍ' ],
			[ 'E(E|e)', 'Ê' ],
			[ 'I(I|i)', 'Î' ],
			[ 'U(U|u)', 'Û' ] ]
	};

	$.ime.register( kuH );
}( jQuery ) );
