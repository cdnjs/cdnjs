( function ( $ ) {
	'use strict';

	var paTransliteration = {
		id: 'pa-transliteration',
		name: 'Punjabi Transliteration',
		description: 'Punjabi transliteration',
		date: '2012-10-16',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni, inputs from Saurabh Choudhary and Surinder Wadhawan',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 2,
		maxKeyLength: 4,
		/* Semi-automatically created from the Hindi transliteration mapping using
		 * the following Perl substitution:
		 * s{(?<deva_letter>[ऀ-ॿ])}{chr(ord($+{deva_letter}) + 0x100)}xmsge;
		 */
		patterns: [
			[ 'ਕ੍h', 'c', 'ਚ੍' ],
			[ '\\\\([A-Za-z\\>_~\\.0-9])', '\\\\', '$1' ],

			// ਕ-ਹ is the main range of Indic letters.
			// ੜ is an additional unique Gurmukhi letter.
			[ '([ਕ-ਹੜ]਼?)੍a', '$1' ], // Short [a] after a consonant with virama removes the virama
			[ '([ਕ-ਹੜ]਼?)੍A', '$1ਾ' ], // Long [a] after a consonant with virama removes the virama and adds long [a]
			[ '([ਕ-ਹੜ]਼?)a', '$1ਾ' ], // 'aa' gives long [a] - short [a] after a consonant without virama adds long [a]
			[ '([ਕ-ਹੜ]਼?)੍i', '$1ਿ' ],
			[ '([ਕ-ਹੜ]਼?)(ਿi|੍I|ੇe)', '$1ੀ' ], // 'ii', 'I' and 'ee' give long [i].
			[ '([ਕ-ਹੜ]਼?)੍u', '$1ੁ' ],
			[ '([ਕ-ਹੜ]਼?)(ੁu|੍U|ੋo)', '$1ੂ' ], // 'uu', 'U' and 'oo' give long [u].
			[ '([ਕ-ਹੜ]਼?)੍e', '$1ੇ' ],
			[ '([ਕ-ਹੜ]਼?)(i|੍E)', '$1ੈ' ], // 'i' after a consonant without virama or 'E' after a consonant with Virama gives "ai"
			[ '([ਕ-ਹੜ]਼?)੍[oO]', '$1ੋ' ],
			[ '([ਕ-ਹੜ]਼?)u', '$1ੌ' ], // 'u' after a consonant without virama gives "au"
			[ '([ਕ-ਹੜ])੍\\`', '$1਼੍' ], // '`' (backtick) after a consonant with virama adds a nukta before the virama

			[ 'ਅa', 'ਆ' ], // aa
			[ '(ਓo|ਉu)', 'ਊ' ], // oo, uu
			[ 'ਅi', 'ਐ' ], // ai
			[ 'ਅ\\^', 'ੲ' ], // a^ (iri - base for vowels)
			[ 'ਉ\\^', 'ੳ' ], // u^ (ura - base for vowels)
			[ '(ਏe|ਇi)', 'ਈ' ], // ee, ii
			[ 'ਅu', 'ਔ' ], // au
			[ 'ਂ[Mm^]', 'ਁ' ], // bindi + 'm', 'M', or '^' -> Adak bindi
			[ 'ਣ੍N', 'ੰ' ], // Tippi - nasalization

			[ 'ਕ੍h', 'ਖ੍' ], // kh
			[ 'ਗ੍h', 'ਘ੍' ], // gh
			[ 'ਨ੍g', 'ਙ੍' ], // ng
			[ 'ਚ੍h', 'ਛ੍' ], // ch
			[ 'ਜ੍h', 'ਝ੍' ], // jh
			[ 'ਨ੍j', 'ਞ੍' ], // nj
			[ 'ਟ੍h', 'ਠ੍' ], // Th
			[ 'ਡ੍h', 'ਢ੍' ], // Dh
			[ 'ਤ੍h', 'ਥ੍' ], // th
			[ 'ਦ੍h', 'ਧ੍' ], // dh
			[ 'ਪ੍h', 'ਫ੍' ], // ph
			[ 'ਬ੍h', 'ਭ੍' ], // bh

			[ 'ਸ੍h', 'ਸ਼੍' ], // sh
			[ 'ਕ਼੍h', 'ਖ਼੍' ], // k + nukta + h

			[ 'a', 'ਅ' ],
			[ 'b', 'ਬ੍' ],
			[ 'c', 'ਚ੍' ],
			[ 'd', 'ਦ੍' ],
			[ 'e', 'ਏ' ],
			[ 'f', 'ਫ੍' ],
			[ 'F', 'ਫ਼੍' ], // With nukta
			[ 'g', 'ਗ੍' ],
			[ 'h', 'ਹ੍' ],
			[ 'i', 'ਇ' ],
			[ 'j', 'ਜ੍' ],
			[ 'k', 'ਕ੍' ],
			[ 'l', 'ਲ੍' ],
			[ 'm', 'ਮ੍' ],
			[ 'n', 'ਨ੍' ],
			[ 'o', 'ਓ' ],
			[ 'p', 'ਪ੍' ],
			[ 'q', 'ੑ' ], // Udaat
			[ 'r', 'ਰ੍' ],
			[ 's', 'ਸ੍' ],
			[ 't', 'ਤ੍' ],
			[ 'u', 'ਉ' ],
			[ '(v|w)', 'ਵ੍' ],
			[ 'y', 'ਯ੍' ],
			[ 'z', 'ੱ' ], // Addak - gemination
			[ 'A', 'ਆ' ],
			[ 'D', 'ਡ੍' ],
			[ 'H', 'ਃ' ], // Visarga
			[ 'I', 'ਈ' ],
			[ 'M', 'ਂ' ], // Bindi
			[ 'N', 'ਣ੍' ],
			[ 'R', 'ੜ੍' ], // Rra
			[ 'S', 'ਸ਼੍' ],
			[ 'T', 'ਟ੍' ],
			[ 'U', 'ਊ' ],
			[ 'X', 'ੴ' ], // Ek onkar
			[ 'Y', 'ੵ' ], // Yakash
			[ '0', '੦' ],
			[ '1', '੧' ],
			[ '2', '੨' ],
			[ '3', '੩' ],
			[ '4', '੪' ],
			[ '5', '੫' ],
			[ '6', '੬' ],
			[ '7', '੭' ],
			[ '8', '੮' ],
			[ '9', '੯' ],
			[ '~', '੍' ], // Virama
			[ '\\`', '਼' ], // Nukta

			[ '।\\.', '॥' ], // Double danda, must be before single danda
			[ '\\.', '।' ] ] // Danda
	};

	$.ime.register( paTransliteration );
}( jQuery ) );
