( function ( $ ) {
	'use strict';

	var ipaSil = {
		id: 'ipa-sil',
		name: 'International Phonetic Alphabet - SIL',
		description: 'International Phonetic Alphabet - SIL',
		date: '2012-11-23',
		URL: 'http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=UniIPAKeyboard',
		author: 'mapping by Martin Hosken and Lorna A. Priest; implementation by Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 0,
		maxKeyLength: 2,
		patterns: [
			[ 'B=', 'ʙ' ],
			[ 'f=', 'ɸ' ],
			[ 'b=', 'β' ],

			[ 'm>', 'ɱ' ],
			[ 'v<', 'ⱱ' ],
			[ 'v=', 'ʋ' ],

			[ 't=', 'θ' ],
			[ 'd=', 'ð' ],

			[ 'r>', 'ɾ' ],
			[ 'l=', 'ɬ' ],
			[ 'l>', 'ɮ' ],
			[ 'r=', 'ɹ' ],

			[ 's=', 'ʃ' ],
			[ 'z=', 'ʒ' ],

			[ 't<', 'ʈ' ],
			[ 'd<', 'ɖ' ],
			[ 'n<', 'ɳ' ],
			[ 'r<', 'ɽ' ],
			[ 's<', 'ʂ' ],
			[ 'z<', 'ʐ' ],
			[ 'R<', 'ɻ' ],
			[ 'l<', 'ɭ' ],

			[ 'j=', 'ɟ' ],
			[ 'n=', 'ɲ' ],
			[ 'c=', 'ç' ],
			[ 'j<', 'ʝ' ],
			[ 'L<', 'ʎ' ],

			[ 'g<', 'ɡ' ],
			[ 'n>', 'ŋ' ],
			[ 'g=', 'ɣ' ],
			[ 'w>', 'ɰ' ],
			[ 'L=', 'ʟ' ],

			[ 'G=', 'ɢ' ],
			[ 'N=', 'ɴ' ],
			[ 'R=', 'ʀ' ],
			[ 'x=', 'χ' ],
			[ 'R>', 'ʁ' ],

			[ 'h>', 'ħ' ],
			[ '\\?<', 'ʕ' ],

			[ '\\?=', 'ʔ' ],
			[ 'h<', 'ɦ' ],

			[ 'p=', 'ʘ' ],
			[ 'ǃ<', 'ǀ' ], // This is not an exclamation mark
			[ '!',  'ǃ' ],
			[ 'ǃ=', 'ǂ' ], // This is not an exclamation mark
			[ 'ǃ>', 'ǁ' ], // This is not an exclamation mark

			[ 'b>', 'ɓ' ],
			[ 'd>', 'ɗ' ],
			[ 'j>', 'ʄ' ],
			[ 'g>', 'ɠ' ],
			[ 'G>', 'ʛ' ],

			[ 'w=', 'ʍ' ],
			[ 'y<', 'ɥ' ],
			[ 'h=', 'ɥ' ],
			[ 'H=', 'ʜ' ],
			[ 'Q<', 'ʢ' ],
			[ 'Q=', 'ʡ' ],
			// TODO non-IPA retroflex hooks

			[ 'c<', 'ɕ' ],
			[ 'z>', 'ʑ' ],
			[ 'L>', 'ɺ' ],
			[ 'H<', 'ɧ' ],

			[ 'i=', 'ɪ' ],
			[ 'e<', 'ɛ' ],
			[ 'a<', 'æ' ],

			[ 'y=', 'ʏ' ],
			[ 'o>', 'ø' ],
			[ 'E<', 'œ' ],
			[ 'E>', 'ɶ' ],

			[ 'I=', 'ɨ' ],
			[ 'E=', 'ɘ' ],
			[ 'e=', 'ə' ],
			[ 'e>', 'ɜ' ],
			[ 'a>', 'ɐ' ],
			[ 'U=', 'ʉ' ],
			[ 'O=', 'ɵ' ],
			[ 'O<', 'ɞ' ],

			[ 'u=', 'ɯ' ],
			[ 'O>', 'ɤ' ],
			[ 'u>', 'ʌ' ],
			[ 'a=', 'ɑ' ],
			[ 'u',  'u' ],
			[ 'u<', 'ʊ' ],
			[ 'o<', 'ɔ' ],
			[ 'o=', 'ɒ' ],

			[ 'ˈ}',        'ˌ' ], // }}
			[ '}',         'ˈ' ],
			[ 'ː:',        'ˑ' ], // ::
			[ 'ˑ:',        'ːː' ], // ::: // Not IPA sanctioned
			[ ':',         'ː' ],
			[ '\\*\\*\\*', '\u0306' ], // Combining breve
			[ '\\.<',      '|' ],
			[ '\\.=',      '‖' ],
			[ '#=',        '‿' ],

			// Tones
			[ '([˥-˩])4', '$1˥' ],
			[ '([˥-˩])3', '$1˦' ],
			[ '([˥-˩])2', '$1˧' ],
			[ '([˥-˩])1', '$1˨' ],
			[ '([˥-˩])0', '$1˩' ],
			[ '#4', '˥' ],
			[ '#3', '˦' ],
			[ '#2', '˧' ],
			[ '#1', '˨' ],
			[ '#0', '˩' ],
			[ '(?:\u0300)3', '\u030C' ], // @13  - Combining caron
			[ '(?:\u0301)1', '\u0302' ], // @31  - Combining circumflex accent
			[ '(?:\u0304)3', '\u1dc4' ], // @23  - Combining macron-acute
			[ '(?:\u0300)2', '\u1dc5' ], // @12  - Combining grave-macron
			[ '(?:\u030C)1', '\u1dc8' ], // @131 - Combining grave-acute-grave
			[ '(?:\u0304)1', '\u1dc6' ], // @21  - Combining macron-grave // Not IPA sanctioned
			[ '(?:\u0301)2', '\u1dc7' ], // @32  - Combining acute-macron // Not IPA sanctioned
			[ '(?:\u0302)3', '\u1dc9' ], // @313 - Combining acute-grave-acute // Not IPA sanctioned
			[ '(?:\u030a)4', '\u030b' ], // Combining double acute accent
			[ '(?:\u030a)3', '\u0301' ], // Combining acute accent
			[ '(?:\u030a)2', '\u0304' ], // Combining macron
			[ '(?:\u030a)1', '\u0300' ], // Combining grave accent
			[ '(?:\u030a)0', '\u030f' ], // Combining double grave accent

			// Tone numbers (non-IPA)
			[ '\\^0', '⁰' ], // Not IPA sanctioned
			[ '\\^1', '¹' ], // Not IPA sanctioned
			[ '\\^2', '²' ], // Not IPA sanctioned
			[ '\\^3', '³' ], // Not IPA sanctioned
			[ '\\^4', '⁴' ], // Not IPA sanctioned
			[ '\\^5', '⁵' ], // Not IPA sanctioned
			[ '\\^6', '⁶' ], // Not IPA sanctioned
			[ '\\^7', '⁷' ], // Not IPA sanctioned
			[ '\\^8', '⁸' ], // Not IPA sanctioned
			[ '\\^9', '⁹' ], // Not IPA sanctioned
			// This character is called "Superscript hyphen" in the layout document,
			// and "Superscript minus" in Unicode
			[ '\\^-', '⁻' ], // Not IPA sanctioned

			[ 'ꜛ>', '↗' ], // #>>
			[ 'ꜜ<', '↘' ], // #<<
			[ '#<', 'ꜜ' ],
			[ '#>', 'ꜛ' ],

			// Diacritics and suprasegmentals
			[ 'h\\^', 'ʰ' ],
			[ 'w\\^', 'ʷ' ],
			[ 'j\\^', 'ʲ' ],
			[ 'ɣ\\^', 'ˠ' ], // g=
			[ 'ʕ\\^', 'ˤ' ], // ?<
			[ 'n\\^', 'ⁿ' ],
			[ 'l\\^', 'ˡ' ],
			// TODO non-IPA superscripts

			[ 'ʽ\\[',          '˞' ],      // [[[
			[ '\\[\\[',        'ʽ' ],      // [[ // Not IPA sanctioned
			[ '(?:\u031a)\\]', '‘' ],      // ]]]] // Not IPA sanctioned
			[ 'ʼ\\]',          '\u031a' ], // ]]]  // Combining left angle above
			[ '\\]\\]',        'ʼ' ],      // ]]

			[ '(?:\u032f)\\$', '\u0330' ], // $$$ // Combining tilde below
			[ '(?:\u0329)\\$', '\u032f' ], // $$  // Combining inverted breve below
			[ '\\$',           '\u0329' ], // $   // Combining vertical line below

			// TODO non-IPA retroflex hooks

			[ '(?:\u032c)%',   '\u0324' ], // %%% // Combining diaeresis below
			[ '(?:\u0325)%',   '\u032c' ], // %%  // Combining caron below
			[ '%', '\u0325' ],             // %   // Combining ring below

			// TODO non-IPA palatal hooks

			[ '@', '\u030a' ], // Combining ring above

			[ '(?:\u033c)\\{',   '\u0323' ], // {{{{{ // Combining dot below
			[ '(?:\u033b)\\{',   '\u033c' ], // {{{{  // Combining seagull below
			[ '(?:\u033a)\\{',   '\u033b' ], // {{{   // Combining square below
			[ '(?:\u032a)\\{',   '\u033a' ], // {{    // Combining inverted bridge below
			[ '\\{', '\u032a' ],             // {     // Combining bridge below

			[ '(?:\u0303)~',   '\u0334' ], // ~~    // Combining tilde overlay
			[ '~',             '\u0303' ], // ~     // Combining tilde

			[ '(?:\u0306)\\*', '\u0307' ], // ****  // Combining dot above
			[ '(?:\u033d)\\*', '\u0306' ], // ***   // Combining breve
			[ '(?:\u0308)\\*', '\u033d' ], // **    // Combining x above
			[ '\\*',           '\u0308' ], // *     // Combining diaeresis

			// TODO Find out what the m with the five asterisks is.

			[ '#&',            '\u0361' ], //          Combining double inverted breve
			[ '(?:\u030a)&',   '\u035c' ], // @&    // Combining double breve below

			[ '(?:\u0318)\\+', '\u0339' ], // ++++  // Combining right half ring below
			[ '(?:\u0319)_',   '\u031c' ], // ____  // Combining left half ring below
			[ '(?:\u031d)\\+', '\u0318' ], // +++   // Combining left tack below
			[ '(?:\u031e)_',   '\u0319' ], // ___   // Combining right tack below
			[ '(?:\u031f)\\+', '\u031d' ], // ++    // Combining up tack below
			[ '(?:\u0320)_',   '\u031e' ], // __    // Combining down tack below
			[ '\\+',           '\u031f' ], // +     // Combining plus sign below
			[ '_',             '\u0320' ], // _     // Combining minus sign below

			[ '=>', '→' ], // Not IPA sanctioned
			[ 's>', 'σ' ], // Not IPA sanctioned
			[ '=<', '\u200d' ] // Combining Grapheme Joiner
		]
	};

	$.ime.register( ipaSil );
}( jQuery ) );
