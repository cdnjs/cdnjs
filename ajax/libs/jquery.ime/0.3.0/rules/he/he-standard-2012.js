( function ( $ ) {
	'use strict';

	var heStandard = {
		id: 'he-standard-2012',
		name: 'Hebrew 2012 (from English)',
		description: 'Hebrew keyboard according to Israeli Standard 1452',
		date: '2012-10-15',
		URL: 'http://www.lingnu.com/he/howto/78-si1452.html',
		author: 'Amir E. Aharoni (אָמִיר אֱלִישָׁע אַהֲרוֹנִי, [[User:Amire80]])',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 0,
		patterns: [
			[ 'q', '/' ],
			[ 'w', '\'' ],
			[ 'e', 'ק' ],
			[ 'r', 'ר' ],
			[ 't', 'א' ],
			[ 'y', 'ט' ],
			[ 'u', 'ו' ],
			[ 'i', 'ן' ],
			[ 'o', 'ם' ],
			[ 'p', 'פ' ],

			[ 'a', 'ש' ],
			[ 's', 'ד' ],
			[ 'd', 'ג' ],
			[ 'f', 'כ' ],
			[ 'g', 'ע' ],
			[ 'h', 'י' ],
			[ 'j', 'ח' ],
			[ 'k', 'ל' ],
			[ 'l', 'ך' ],
			[ ';', 'ף' ],
			[ '\'', ',' ],

			[ 'z', 'ז' ],
			[ 'x', 'ס' ],
			[ 'c', 'ב' ],
			[ 'v', 'ה' ],
			[ 'b', 'נ' ],
			[ 'n', 'מ' ],
			[ 'm', 'צ' ],
			[ ',', 'ת' ],
			[ '\\.', 'ץ' ],
			[ '/', '.' ],

			[ '`', ';' ],

			// These characters are mirrored in RTL languages
			[ '\\(', ')' ],
			[ '\\)', '(' ],
			[ '\\[', ']' ],
			[ '\\]', '[' ],
			[ '{', '}' ],
			[ '}', '{' ],
			[ '<', '>' ],
			[ '>', '<' ]
		],

		// Your text editor may show the resulting characters in
		// the next lines as empty. These are diacritics.
		patterns_x: [
			[ 'a', 'ְ' ], // Sheva

			[ 'e', 'ָ' ], // Qamats
			[ 'r', 'ֳ' ], // Hataf qamats
			[ 'p', 'ַ' ], // Patah
			[ '\\[', 'ֲ' ], // Hataf patah

			[ 'm', 'ֵ' ], // Tsere
			[ 'x', 'ֶ' ], // Segol
			[ 'c', 'ֱ' ], // Hataf segol

			[ 'j', 'ִ' ], // Hiriq

			[ 'u', 'ֹ' ], // Holam

			[ '\\\\', 'ֻ' ], // Qubuts

			[ 's', 'ּ' ], // Dagesh

			[ 'q', 'ׂ' ], // Sin dot
			[ 'w', 'ׁ' ], // Shin dot

			[ '-', '־' ], // Maqaf
			[ '=', '–' ], // Qav mafrid - en dash
			[ '\\]', 'ֿ' ], // Rafe
			[ '1', 'ֽ' ], // Meteg
			[ '3', '€' ], // Euro sign
			[ '4', '₪' ], // Sheqel sign
			[ '5', '°' ], // Degree
			[ '6', '֫' ], // Ole
			[ '8', '×' ], // Multiplication
			[ '9', '\u200e' ], // LRM
			[ '0', '\u200f' ], // RLM
			[ '/', '÷' ], // Division

			[ 'y', 'װ' ], // Double vav
			[ 'h', 'ײ' ], // Double yod
			[ 'H', 'ײַ' ], // Yod yod patah
			[ 'g', 'ױ' ], // Vav-yod

			[ '`', '׳' ], // Geresh
			[ '\'', '״' ], // Gershayim
			[ ';', '„' ], // Opening double quote
			[ 'l', '”' ], // Closing double quote
			[ '\\.', '‚' ], // Opening single quote
			[ ',', '’' ] // Closing single quote
		]
	};

	$.ime.register( heStandard );

}( jQuery ) );
