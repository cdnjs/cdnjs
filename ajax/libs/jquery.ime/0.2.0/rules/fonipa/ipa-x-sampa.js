( function ( $ ) {
	'use strict';

	var ipaSil = {
		id: 'ipa-x-sampa',
		name: 'International Phonetic Alphabet - X-SAMPA',
		description: 'International Phonetic Alphabet - X-SAMPA',
		date: '2012-11-26',
		URL: 'http://www.phon.ucl.ac.uk/home/sampa/x-sampa.htm',
		author: 'mapping by John C. Wells; implementation by Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 4,
		patterns: [
			// Tones
			[ '_/',         '\u030C' ], // Combining caron
			[ '_\\\\',      '\u0302' ], // Combining circumflex accent
			[ '_ɥ_T',       '\u1dc4' ], // _H_T - Combining macron-acute
			[ '_β_L',       '\u1dc5' ], // _B_L - Combining grave-macron
			[ '_ʁ_F',       '\u1dc8' ], // _R_F - Combining grave-acute-grave

			[ 'β\\\\',      'ʙ' ],
			[ 'p\\\\',      'ɸ' ],
			[ 'B',          'β' ],

			[ 'F',          'ɱ' ],
			// ⱱ is not in X-SAMPA
			[ 'P',          'ʋ' ],
			[ 'v\\\\',      'ʋ' ],

			[ 'T',          'θ' ],
			[ 'D',          'ð' ],

			[ '4',          'ɾ' ],
			[ 'K',          'ɬ' ],
			[ 'ɬ\\\\',      'ɮ' ],
			[ 'r\\\\',      'ɹ' ],

			[ 'S',          'ʃ' ],
			[ 'Z',          'ʒ' ],

			[ 't`',         'ʈ' ],
			[ 'd`',         'ɖ' ],
			[ 'n`',         'ɳ' ],
			[ 'r`',         'ɽ' ],
			[ 's`',         'ʂ' ],
			[ 'z`',         'ʐ' ],
			[ 'ɹ`',         'ɻ' ],
			[ 'l`',         'ɭ' ],

			[ 'ɲ\\\\',      'ɟ' ],
			[ 'J',          'ɲ' ],
			[ 'C',          'ç' ],
			[ 'j\\\\',      'ʝ' ],
			[ 'L',          'ʎ' ],

			[ 'g',          'ɡ' ],
			[ '_N',         '\u033c' ], // Combining seagull below
			[ 'N',          'ŋ' ],
			[ '_G',         'ˠ' ],
			[ 'G',          'ɣ' ],
			[ 'ɯ\\\\',      'ɰ' ],
			[ 'ʎ\\\\',      'ʟ' ],

			[ 'ɣ\\\\',      'ɢ' ],
			[ 'ŋ\\\\',      'ɴ' ],
			[ 'ʁ\\\\',      'ʀ' ],
			[ '_X',         '\u0306' ], // Combining breve
			[ 'X',          'χ' ],
			[ 'R',          'ʁ' ],

			[ 'χ\\\\',      'ħ' ],
			[ '_ʔ\\\\',     'ˤ' ],
			[ 'ʔ\\\\',      'ʕ' ],

			[ '\\?',        'ʔ' ],
			[ 'h\\\\',      'ɦ' ],

			[ 'ɔ\\\\',      'ʘ' ],
			[ 'ǀ\\|\\\\',   'ǁ' ],
			[ '\\|\\\\',    'ǀ' ],
			[ 'ꜜ\\\\',      'ǃ' ], // !\ -> Retroflex (postalveolar) click
			[ '_?=',        '\u0329' ], // Combining vertical line below
			[ '\u0329\\\\', 'ǂ' ],

			[ 'b_<',        'ɓ' ],
			[ 'd_<',        'ɗ' ],
			[ 'ɟ_<',        'ʄ' ],
			[ 'ɡ_<',        'ɠ' ],
			[ 'ɢ_<',        'ʛ' ],

			[ 'W',          'ʍ' ],
			[ 'H',          'ɥ' ],
			[ 'ɥ\\\\',      'ʜ' ],
			[ '<\\\\',      'ʢ' ],
			[ '>\\\\',      'ʡ' ],

			[ 's\\\\',      'ɕ' ],
			[ 'z\\\\',      'ʑ' ],
			[ 'l\\\\',      'ɺ' ],
			[ 'x\\\\',      'ɧ' ],

			[ 'I',          'ɪ' ],
			[ 'E',          'ɛ' ],
			[ '\\{',        'æ' ],

			[ 'Y',          'ʏ' ],
			[ '2',          'ø' ],
			[ '9',          'œ' ],
			[ '&',          'ɶ' ],

			[ '1',          'ɨ' ],
			[ 'ə\\\\',      'ɘ' ],
			[ '@',          'ə' ],
			[ 'ɜ\\\\',      'ɞ' ],
			[ '3',          'ɜ' ],
			[ '6',          'ɐ' ],
			[ '_\\}',       '\u031a' ],
			[ '\\}',        'ʉ' ],
			[ '8',          'ɵ' ],

			[ 'M',          'ɯ' ],
			[ '7',          'ɤ' ],
			[ 'V',          'ʌ' ],
			[ '_A',         '\u0318' ], // Combining right tack below
			[ 'A',          'ɑ' ],
			[ 'U',          'ʊ' ],
			[ '_O',         '\u0339' ], // ++++  // Combining right half ring below
			[ 'O',          'ɔ' ],
			[ 'Q',          'ɒ' ],

			[ '%',          'ˌ' ],
			[ '_"',         '\u0308' ], // Combining diaeresis
			[ '"',          'ˈ' ],
			[ 'ː\\\\',      'ˑ' ],
			[ ':',          'ː' ],
			[ '\\.<',       '|' ],
			[ '\\|\\|',     '‖' ],
			[ '-\\\\',      '‿' ],

			[ '<ʁ>',        '↗' ], // <R>
			[ '<ɱ>',        '↘' ], // <F>
			[ '!',          'ꜜ' ],
			[ '_\\^',       '\u032f' ], // Combining inverted breve below
			[ '\\^',        'ꜛ' ],

			// Diacritics and suprasegmentals
			[ '_h',         'ʰ' ],
			[ '_w',         'ʷ' ],
			[ '_j',         'ʲ' ],
			// see above for ˠ
			// see above for ˤ
			[ '_n',         'ⁿ' ],
			[ '_l',         'ˡ' ],

			[ '`',          '˞' ],
			[ '_>',         'ʼ' ],
			// See above for No audible release
			// See above for Syllabic
			// See above for Non-syllabic
			[ '_k',         '\u0330' ], // Combining tilde below

			[ '([ɱɮɳɖʐɻɽɭɲɟʝjŋɡɣɰ])_0', '$1\u030a' ], // Combining ring above
			[ '(.)_0',      '$1\u0325' ], // Combining ring below
			[ '_v',         '\u032c' ], // Combining caron below
			[ '_t',         '\u0324' ], // Combining diaeresis below
			[ '_d',         '\u032a' ], // Combining bridge below
			[ '_a',         '\u033a' ], // Combining inverted bridge below
			[ '_m',         '\u033b' ], // Combining square below
			// See above for linguolabial
			[ '_?~',        '\u0303' ], // Combining tilde
			[ '_e',         '\u0334' ], // Combining tilde overlay
			// See above for centralised
			[ '_x',         '\u033d' ], // Combining x above
			// See above for extra short
			[ '_\\+',       '\u031f' ], // Combining plus sign below
			[ '_-',         '\u0320' ], // Combining minus sign below
			[ '_r',         '\u031d' ], // Combining up tack below
			[ '_o',         '\u031e' ], // Combining down tack below
			// See above for advanced tongue root
			[ '_q',         '\u0319' ], // Combining left tack below
			// See above for more rounded
			[ '_c',         '\u031c' ]
		]
	};

	$.ime.register( ipaSil );
}( jQuery ) );
