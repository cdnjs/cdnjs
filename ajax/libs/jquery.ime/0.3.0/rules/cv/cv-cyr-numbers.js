// This Chuvash keyboard layout is designed by Ikăruk
// http://ru.wikipedia.org/wiki/Чувашские_раскладки_клавиатуры#Раскладка_«Chuvash_Cyrillic»
// This uses the number row of the keyboard
// as it is in Sakha keyboard layout, in Bashkir, Slovak and many more
// Some other keys are added which are often used in wikipedia editing
// all letters are from the Cyrillic subset of Unicode

( function ( $ ) {
	'use strict';

	var cv = {
		id: 'cv-cyr-numbers',
		name: 'Чăвашла (Цифрили)',
		description: 'Икăрук туса хунă, цифрисене усă куракан сарăм',
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
			[ '1', '?' ], // 1
			[ '2', '\'' ], // 2
			[ '@', '"' ], // 2
			[ '3', 'ҫ' ], // 3
			[ '#|№', 'Ҫ' ], // 3
			[ '4', '|' ], // 4
			[ '\\$', ';' ], // 4
			[ '5', 'ӳ' ], // 5
			[ '%', 'Ӳ' ], // 5
			[ '6', '—' ], // 6
			[ '\\^', ':' ], // 6
			[ '7', 'ӗ' ], // 7
			[ '&|\\?', 'Ӗ' ], // 7
			[ '8', 'ӑ' ], // 8
			[ '\\*', 'Ӑ' ], // 8
			[ '9', '[' ], // 9
			[ '0', ']' ] // 0
		]
	};

	$.ime.register( cv );
}( jQuery ) );
