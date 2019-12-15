( function ( $ ) {
	'use strict';

	// This is an implementation of NiDA standard Khmer Unicode keyboard v1.0,
	// with some key combinations to normalize or correct combining sequences
	var kmNIDA = {
		id: 'km-nidakyk',
		name: 'ក្តារ​ចុច​យូនីកូដ​ខ្មែរ (NiDA)',
		description: 'NiDA Standard Khmer Unicode Keyboard',
		date: '2016-07-07',
		URL: 'http://www.nida.gov.kh/files/documents/How_to_type_Khmer_Unicode_ver1_1km.pdf',
		author: 'Ang Iongchun',
		license: 'Public domain',
		version: '1.0',

		// previous input keys to memory, for contextual rules
		contextLength: 1, // default: 0

		// previous output to memory, for normalization of consonant
		// shifters
		// maxKeyLength: 7, // default: 1

		// Shift-Space has the same scan code with Space,
		// hence the rule here
		patterns_shift: [
			[ ' ', ' ' ] // normal space
		],

		patterns: [
			// NOTE: Contextual rules must appear before rules
			//       without context to avoid collisions.
			//       Make sure contextLength is large enough for
			//       these rules.

			// correction for two-part dependent vowels
			[ '\u17c1a', 'e', '\u17c4' ], // ​េ + ​ា -> ​ោ (o)
			[ '\u17b6e', 'a', '\u17c4' ], // ​ា + ​េ -> ​ោ (o)
			[ '\u17c1I', 'e', '\u17be' ], // ​េ  + ​ី -> ​ើ (;)
			[ '\u17b8e', 'I', '\u17be' ], // ​ី + ​េ -> ​ើ (;)

			// normalize common combination of dependent vowels and
			// modifiers
			[ '\u17c6a', 'M', '\u17b6\u17c6' ], // ​ាំ, Ma -> aM
			[ '\u17c6u', 'M', '\u17bb\u17c6' ], // ​ុំ, Mu -> uM
			[ '\u17c7e', 'H', '\u17c1\u17c7' ], // ​េះ, He -> eH
			[ '\u17c7u', 'H', '\u17bb\u17c7' ], // ​ុះ, Hu -> uH
			[ '\u17c7o', 'H', '\u17c4\u17c7' ], // ​ោះ, Ho -> oH

			// Unicode 4.0: normalize consonant shifter before
			// subscript consonants and their optional following
			// robats: (SR?)+Z?C -> Z?C(SR?)+
			/* XXX: Not compatible with Unicode 3.0, which places
			   consonant shifters after subscript consonants.
			   Make sure maxKeyLength is large enough for this rule.
			[ '((?:\u17d2.\u17cc?)+)((:?\u200c|\u200d)?)/', '$2\u17ca$1' ], // ៊
			[ '((?:\u17d2.\u17cc?)+)((:?\u200c|\u200d)?)\"', '$2\u17c9$1' ], // ​៉
			*/

			// consonants
			[ 'q', 'ឆ' ],
			[ 'r', 'រ' ],
			[ 't', 'ត' ],
			[ 'y', 'យ' ],
			[ 'p', 'ផ' ],
			[ 's', 'ស' ],
			[ 'd', 'ដ' ],
			[ 'f', 'ថ' ],
			[ 'g', 'ង' ],
			[ 'h', 'ហ' ],
			[ 'j', '\u17d2' ], // coeng
			[ 'k', 'ក' ],
			[ 'l', 'ល' ],
			[ 'z', 'ឋ' ],
			[ 'x', 'ខ' ],
			[ 'c', 'ច' ],
			[ 'v', 'វ' ],
			[ 'b', 'ប' ],
			[ 'n', 'ន' ],
			[ 'm', 'ម' ],
			[ 'Q', 'ឈ' ],
			[ 'T', 'ទ' ],
			[ 'P', 'ភ' ],
			[ 'D', 'ឌ' ],
			[ 'F', 'ធ' ],
			[ 'G', 'អ' ],
			[ 'J', 'ញ' ],
			[ 'K', 'គ' ],
			[ 'L', 'ឡ' ],
			[ 'Z', 'ឍ' ],
			[ 'X', 'ឃ' ],
			[ 'C', 'ជ' ],
			[ 'B', 'ព' ],
			[ 'N', 'ណ' ],

			// independent vowels
			[ '-', 'ឥ' ],
			[ '=', 'ឲ' ],
			[ '\\]', 'ឪ' ],
			[ '\\\\', 'ឮ' ],
			[ 'R', 'ឬ' ],
			[ '\\}', 'ឧ' ],
			[ '\\|', 'ឭ' ],

			// dependent vowels and modifiers
			[ 'w', '\u17b9' ], // ​ឹ
			[ 'e', '\u17c1' ], // ​េ
			[ 'u', '\u17bb' ], // ​ុ
			[ 'i', '\u17b7' ], // ​ិ
			[ 'o', '\u17c4' ], // ​ោ
			[ 'a', '\u17b6' ], // ​ា
			[ 'W', '\u17ba' ], // ​ឺ
			[ 'E', '\u17c2' ], // ​ែ
			[ 'Y', '\u17bd' ], // ​ួ
			[ 'U', '\u17bc' ], // ​ូ
			[ 'I', '\u17b8' ], // ​ី
			[ 'O', '\u17c5' ], // ​ៅ
			[ 'A', '\u17b6\u17c6' ], // ​ាំ
			[ 'S', '\u17c3' ], // ​ៃ
			[ 'H', '\u17c7' ], // ​ះ
			[ 'V', '\u17c1\u17c7' ], // ​េះ
			[ 'M', '\u17c6' ], // ​ំ
			[ '\\[', '\u17c0' ], // ​ៀ
			[ ';', '\u17be' ], // ​ើ
			[ '\'', '\u17cb' ], // ​់
			[ ',', '\u17bb\u17c6' ], // ​ុា
			[ '/', '\u17ca' ], // ​៊
			[ ':', '\u17c4\u17c7' ], // ​ោះ
			[ '\"', '\u17c9' ], // ​៉
			[ '<', '\u17bb\u17c7' ], // ​ុះ
			[ '\\^', '\u17cd' ], // ​៍
			[ '&', '\u17d0' ], // ​័
			[ '\\*', '\u17cf' ], // ​៏
			[ '_', '\u17cc' ], // ​៌
			[ '\\{', '\u17bf' ], // ​ឿ

			// digits
			[ '1', '១' ],
			[ '2', '២' ],
			[ '3', '៣' ],
			[ '4', '៤' ],
			[ '5', '៥' ],
			[ '6', '៦' ],
			[ '7', '៧' ],
			[ '8', '៨' ],
			[ '9', '៩' ],
			[ '0', '០' ],

			// spaces
			[ ' ', '\u200b' ], // ZWSP: zero-width space

			// symbols
			[ '`', '«' ],
			[ '\\.', '។' ],
			[ '>', '៕' ],
			[ '~', '»' ],
			[ '\\!', '!' ],
			[ '@', 'ៗ' ],
			[ '#', '\"' ],
			[ '\\$', '៛' ],
			[ '%', '%' ],
			[ '\\(', '(' ],
			[ '\\)', ')' ],
			[ '\\+', '=' ],
			[ '\\?', '?' ]
		],

		// AltGr patterns
		patterns_x: [
			// independent vowels
			[ 'e', 'ឯ' ],
			[ 'r', 'ឫ' ],
			[ 'i', 'ឦ' ],
			[ 'o', 'ឱ' ],
			[ 'p', 'ឰ' ],
			[ '\\[', 'ឩ' ],
			[ '\\]', 'ឳ' ],

			// modifiers
			[ '3', '\u17d1' ], // ​៑
			[ '=', '\u17ce' ], // ​៎
			[ '\'', '\u17c8' ], // ​ៈ

			// symbols
			[ '2', '@' ],
			[ '4', '$' ],
			[ '5', '€' ],
			[ '6', '៙' ],
			[ '7', '៚' ],
			[ '8', '*' ],
			[ '9', '{' ],
			[ '0', '}' ],
			[ '-', 'x' ],
			[ '\\\\', '\\' ],
			[ ';', '៖' ],
			[ ',', ',' ],
			[ '\\.', '.' ],
			[ '/', '/' ],

			// spaces
			[ ' ', '\u00a0' ], // NBSP: non-breakable space

			// joiners
			[ '`', '\u200d' ], // ZWJ: zero width joiner
			[ '1', '\u200c' ], // ZWNJ: zero width non-joiner

			// old Khmer, Sanskrit, Pali
			[ 'b', 'ឞ' ],
			[ 'k', 'ឝ' ],
			[ 't', 'ឨ' ],
			[ 'q', 'ៜ' ],
			[ 'w', '\u17dd' ], // ​៝

			// divination signs (digits)
			[ '\\!', '៱' ], // shift-1
			[ '@', '៲' ], // shift-2
			[ '#', '៳' ], // shift-3
			[ '\\$', '៴' ], // shift-4
			[ '%', '៵' ], // shift-5
			[ '\\^', '៶' ], // shift-6
			[ '&', '៷' ], // shift-7
			[ '\\*', '៸' ], // shift-8
			[ '\\(', '៹' ], // shift-9
			[ '\\)', '៰' ], // shift-0

			// lunar dates
			[ 'Q', '᧠' ], // shift-q
			[ 'W', '᧡' ], // shift-w
			[ 'E', '᧢' ], // shift-e
			[ 'R', '᧣' ], // shift-r
			[ 'T', '᧤' ], // shift-t
			[ 'Y', '᧥' ], // shift-y
			[ 'U', '᧦' ], // shift-u
			[ 'I', '᧧' ], // shift-i
			[ 'O', '᧨' ], // shift-o
			[ 'P', '᧩' ], // shift-p
			[ '\\{', '᧪' ], // shift-[
			[ '\\}', '᧫' ], // shift-]
			[ 'A', '᧬' ], // shift-a
			[ 'S', '᧭' ], // shift-s
			[ 'D', '᧮' ], // shift-d
			[ 'F', '᧯' ], // shift-f
			[ 'G', '᧰' ], // shift-g
			[ 'H', '᧱' ], // shift-h
			[ 'J', '᧲' ], // shift-j
			[ 'K', '᧳' ], // shift-k
			[ 'L', '᧴' ], // shift-l
			[ ':', '᧵' ], // shift-;
			[ '\"', '᧶' ], // shift-'
			[ 'Z', '᧷' ], // shift-z
			[ 'X', '᧸' ], // shift-x
			[ 'C', '᧹' ], // shift-c
			[ 'V', '᧺' ], // shift-v
			[ 'B', '᧻' ], // shift-b
			[ 'N', '᧼' ], // shift-n
			[ 'M', '᧽' ], // shift-m
			[ '<', '᧾' ], // shift-,
			[ '>', '᧿' ]  // shift-.
		]
	};

	$.ime.register( kmNIDA );
}( jQuery ) );
