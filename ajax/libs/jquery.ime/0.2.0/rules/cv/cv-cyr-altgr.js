// This Chuvash keyboard layout is the "official" layout
// in chuvash.org
// This implementation is based on ru-jcuken ime rule
// which supports both transliteration mode and the native jcuken
// Along them there are four Chuvash letters ă ĕ ç ÿ
// The keyboard layout is an agreement
// of the Chuvash Language  Committee 2009-03-12
// http://comissi.chv.su/node/23
// This layout differs from the agreement in that matter
// that all letters are from the Cyrillic subset of Unicode

( function ( $ ) {
	'use strict';

	var cv = {
		id: 'cv-cyr-altgr',
		name: 'Чăвашла (AltGr)',
		description: 'AltGr пускăчлă чăваш сарăмĕ',
		date: '2013-03-24',
		URL: 'http://comissi.chv.su/',
		author: 'Anatoly Mironov, @mirontoli',
		license: 'MIT',
		version: '1.0',
		patterns: [
			[ 'Q', 'Й' ],
			[ 'W', 'Ц' ],
			[ 'E', 'У' ],
			[ 'R', 'К' ],
			[ 'T', 'Е' ],
			[ 'Y', 'Н' ],
			[ 'U', 'Г' ],
			[ 'I', 'Ш' ],
			[ 'O', 'Щ' ],
			[ 'P', 'З' ],
			[ '{', 'Х' ],
			[ '}', 'Ъ' ],
			[ 'A', 'Ф' ],
			[ 'S', 'Ы' ],
			[ 'D', 'В' ],
			[ 'F', 'А' ],
			[ 'G', 'П' ],
			[ 'H', 'Р' ],
			[ 'J', 'О' ],
			[ 'K', 'Л' ],
			[ 'L', 'Д' ],
			[ ':', 'Ж' ],
			[ '"', 'Э' ],
			[ 'Z', 'Я' ],
			[ 'X', 'Ч' ],
			[ 'C', 'С' ],
			[ 'V', 'М' ],
			[ 'B', 'И' ],
			[ 'N', 'Т' ],
			[ 'M', 'Ь' ],
			[ '<', 'Б' ],
			[ '>', 'Ю' ],
			[ '\\?', ',' ],

			[ 'q', 'й' ],
			[ 'w', 'ц' ],
			[ 'e', 'у' ],
			[ 'r', 'к' ],
			[ 't', 'е' ],
			[ 'y', 'н' ],
			[ 'u', 'г' ],
			[ 'i', 'ш' ],
			[ 'o', 'щ' ],
			[ 'p', 'з' ],
			[ '\\[', 'х' ],
			[ '\\]', 'ъ' ],
			[ 'a', 'ф' ],
			[ 's', 'ы' ],
			[ 'd', 'в' ],
			[ 'f', 'а' ],
			[ 'g', 'п' ],
			[ 'h', 'р' ],
			[ 'j', 'о' ],
			[ 'k', 'л' ],
			[ 'l', 'д' ],
			[ ';', 'ж' ],
			[ '\'', 'э' ],
			[ 'z', 'я' ],
			[ 'x', 'ч' ],
			[ 'c', 'с' ],
			[ 'v', 'м' ],
			[ 'b', 'и' ],
			[ 'n', 'т' ],
			[ 'm', 'ь' ],
			[ ',', 'б' ],
			[ '\\.', 'ю' ],
			[ '/', '.' ],

			[ '`', 'ё' ],
			[ '~', 'Ё' ],

			// ! is the same // 1
			[ '@', '"' ], // 2
			[ '#', '№' ], // 3
			[ '\\$', ';' ], // 4
			// '%' is the same // 5
			[ '^', ':' ], // 6
			[ '&', '?' ] // 7
			// '*', '(' and ')' are the same    // 8, 9, 0
			],
		// support both qwerty and jcuken keyboards
		patterns_x: [
			[ 'f|а', 'ӑ' ],
			[ 'F|А', 'Ӑ' ],
			[ 't|е', 'ӗ' ],
			[ 'T|Е', 'Ӗ' ],
			[ 'c|с', 'ҫ' ],
			[ 'C|С', 'Ҫ' ],
			[ 'e|у', 'ӳ' ],
			[ 'E|У', 'Ӳ' ]
		]
	};

	$.ime.register( cv );

}( jQuery ) );
