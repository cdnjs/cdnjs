( function ( $ ) {
	'use strict';

	var jvTransliteration = {
		id: 'jv-transliteration',
		name: 'Javanese',
		description: 'Javanese transliteration',
		date: '2013-08-10',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Bennylin',
		license: 'GPLv3',
		version: '1.1',
		contextLength: 1,
		maxKeyLength: 2,
		patterns: [
			[ '\\\\([A-Za-z\\>_~\\.0-9])', '\\\\', '$1' ],
			[ 'ꦝ꧀q', '','ꦞ꧀' ], // Dha murda
			[ 'ꦚ꧀q', '','ꦘ꧀' ], // Nya murda
			[ 'ꦧ꧀q', '','ꦨ꧀' ], // Ba murda
			[ 'ꦕ꧀q', '','ꦖ꧀' ], // Ca murda(?)
			[ 'ꦒ꧀q', '','ꦓ꧀' ], // Ga murda
			[ 'ꦗ꧀q', '','ꦙ꧀' ], // Ja Mahaprana
			[ 'ꦏ꧀q', '','ꦑ꧀' ], // Ka murda
			[ 'ꦤ꧀q', '','ꦟ꧀' ], // Na murda
			[ 'ꦥ꧀q', '','ꦦ꧀' ], // Pa murda
			[ 'ꦱ꧀q', '','ꦯ꧀' ], // Sa murda
			[ 'ꦠ꧀q', '','ꦡ꧀' ], // Ta murda

			// VII. Vocal ended with special pasangan followed by vocal = back to normal
			[ 'ꦃa', '','ꦲ' ], // vocal ended with -h followed by a
			[ 'ꦃe', '','ꦲꦺ' ], // vocal ended with -h followed by e
			[ 'ꦃi', '','ꦲꦶ' ], // vocal ended with -h followed by i
			[ 'ꦃo', '','ꦲꦺꦴ' ], // vocal ended with -h followed by o
			[ 'ꦃu', '','ꦲꦸ' ], // vocal ended with -h followed by u

			[ 'ꦂa', '','ꦫ' ], // vocal ended with -r followed by a
			[ 'ꦂe', '','ꦫꦺ' ], // vocal ended with -r followed by e
			[ 'ꦂi', '','ꦫꦶ' ], // vocal ended with -r followed by i
			[ 'ꦂo', '','ꦫꦺꦴ' ], // vocal ended with -r followed by o
			[ 'ꦂu', '','ꦫꦸ' ], // vocal ended with -r followed by u
			[ 'ꦂy', '','ꦫꦾ' ], // vocal ended with -r followed by y (Special)

			[ 'ꦁa', '','ꦔ' ], // vocal ended with -ng followed by a
			[ 'ꦁe', '','ꦔꦺ' ], // vocal ended with -ng followed by e
			[ 'ꦁi', '','ꦔꦶ' ], // vocal ended with -ng followed by i
			[ 'ꦁo', '','ꦔꦺꦴ' ], // vocal ended with -ng followed by o
			[ 'ꦁu', '','ꦔꦸ' ], // vocal ended with -ng followed by u

			// VI. Vocal (lowercase, uppercase, extended) ended with h/r/ng = special pasangan (-h, -r, -ng)
			[ '꧀​h', '','꧀ꦲ꧀' ],
			// vocal a ended with h/r/ng
			[ '(ꦲ|ꦤ|ꦕ|ꦫ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦘ|ꦿ|ꦾ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ|꦳)(h|H)', '','$1ꦃ' ], // hanacaraka + h = -h
			[ '(ꦲ|ꦤ|ꦕ|ꦫ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦘ|ꦿ|ꦾ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ|꦳)(r|R)', '','$1ꦂ' ], // hanacaraka + r = -r
			[ '(ꦲ|ꦤ|ꦕ|ꦫ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦘ|ꦿ|ꦾ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ|꦳)(ꦤ|ꦟ)꧀(g|G)', '','$1ꦁ' ], // hanacaraka + ng = -ng
			// other vocals ended with h/r/ng
			[ '(ꦴ|ꦻ|ꦍ|ꦺ|ꦼ|ꦶ|ꦷ|ꦸ|ꦹ|ꦄ|ꦌ|ꦆ|ꦎ|ꦈ)(h|H)', '','$1ꦃ' ], // other vocal ended with -h
			[ '(ꦴ|ꦻ|ꦍ|ꦺ|ꦼ|ꦶ|ꦷ|ꦸ|ꦹ|ꦄ|ꦌ|ꦆ|ꦎ|ꦈ)(r|R)', '','$1ꦂ' ], // other vocal ended with -r
			[ '(ꦴ|ꦻ|ꦍ|ꦺ|ꦼ|ꦶ|ꦷ|ꦸ|ꦹ|ꦄ|ꦌ|ꦆ|ꦎ|ꦈ)(ꦤ|ꦟ)꧀(g|G)', '','$1ꦁ' ], // other vocal ended with -ng

			// V. Lower case consonant followed by lower case consonant: Basic
			// Note: not all of these combination are valid in Javanese language, for example -hn-,
			// so they are here only for logical reason, practically they should never be used.
			// Obvious removal are noted (such as -yy-). th, dh, ny, ng, c, h, r, w, y are special cases:

			// pasangan 'ha'(ꦲ/ꦃ) is considered final, exception: about 60 words can be found of "ha" followed by consonant y/r/l/w
			// pasangan 'ra'(ꦫ/ꦂ) is considered final, exception: 5 words can be found of "ra" followed by consonant y/w
			// pasangan bigraf nga(ꦔ/ꦁ) is considered final, exception: "nga" can only be found followed by consonant y/r/l/w
			// (some problem may occur - see http://jv.wikipedia.org/wiki/Dhiskusi_Panganggo:Bennylin/Narayam#Ng)
			// pasangan bigraf nya can only be found followed by consonant r/l/w, and
			// although not found in Latin, it also found in Javanese script representation of nasal sounds ñ (see nyc and nyj)
			// pasangan bigraf dha can only be found followed by consonant y/r/ w
			// pasangan bigraf tha can only be found followed by consonant r
			// the letter 'w' can only be found followed by consonant y/r/l/w (nasal for 'u')
			// the letter 'c' can only be found followed by consonant r/l, and ch
			// the letter 'y' can only be found followed by consonant w (nasal for 'i')

			[ '꧀a', '','' ], // default vowel is a, so, remove the pangkon
			[ '꧀A', '','ꦄ' ], // A
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀b', '','$1꧀ꦧ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀B', '','$1꧀ꦨ꧀' ], // pasangan Ba murda
			[ 'ꦤ꧀​(c|C)', '','ꦚ꧀ꦕ꧀' ], // n+zero-width-space+c
			[ 'ꦤ꧀(c|C)', '','ꦚ꧀ꦕ꧀' ], // n followed by c became nasalized (nasal sound 'ny' + c)(REF:nyc)
			[ '(ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀c', '','$1꧀ꦕ꧀' ],
			[ '(ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀C', '','$1꧀ꦖ꧀' ], // pasangan Ca murda(?)
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀d', '','$1꧀ꦢ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀D', '','$1꧀ꦣ꧀' ],
			[ '꧀e', '','ꦺ' ], // é|è
			[ '꧀E', '','ꦌ' ], // É|È
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(f|v|F|V)', '','$1꧀ꦥ꦳꧀' ],
			[ '(ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀g', '','$1꧀ꦒ꧀' ], // can't be started with n, reserved for bigraf ng
			[ '(ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀G', '','$1꧀ꦓ꧀' ], // pasangan Ga murda (can't be started with n - see II. 2.)
			[ '(ꦤ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(h|H)', '','$1꧀ꦲ꧀' ], // can't be started with k/d/t/g, reserved for bigraf kh/dh/th/gh
			[ '꧀i', '','ꦶ' ], // i
			[ '꧀I', '','ꦆ' ], // I
			[ 'ꦤ꧀​(j|J)', '','ꦤ꧀ꦗ꧀' ], // n+zero-width-space+j
			[ 'ꦤ꧀(j|J)', '','ꦚ꧀ꦗ꧀' ], // n followed by j became nasalized (nasal sound 'ny' + j)(REF:nyj)
			[ '(ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(j|J)', '','$1꧀ꦗ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀k', '','$1꧀ꦏ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀K', '','$1꧀ꦑ꧀' ], // pasangan Ka murda
			[ '(ꦲ|ꦃ|ꦤ|ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦗ|ꦚ|ꦩ|ꦒ|ꦧ|ꦔ|ꦁ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(l|L)', '','$1꧀ꦭ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(m|M)', '','$1꧀ꦩ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀n', '','$1꧀ꦤ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀N', '','$1꧀ꦟ꧀' ], // pasangan Na murda
			[ '꧀o', '','ꦺꦴ' ], // o
			[ '꧀O', '','ꦎ' ], // O
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀p', '','$1꧀ꦥ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀P', '','$1꧀ꦦ꧀' ], // pasangan Pa murda
			// q
			[ '(ꦲ|ꦃ|ꦤ|ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦁ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀​r', '','$1꧀ꦫ꧀' ], // consonant+zero-width-space+(r|R) doesn't make special biconsonant -ra
			[ '(ꦲ|ꦃ|ꦤ|ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦁ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀​R', '','$1꧀ꦬ꧀' ], // consonant+zero-width-space+(r|R) doesn't make special biconsonant -ra
			[ '(ꦲ|ꦃ|ꦤ|ꦕ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦁ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(r|R)', '','$1ꦿ' ], // special biconsonant -ra
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀s', '','$1꧀ꦱ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀S', '','$1꧀ꦯ꧀' ], // pasangan Sa murda
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀t', '','$1꧀ꦠ꧀' ],
			[ '(ꦤ|ꦏ|ꦢ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀T', '','$1꧀ꦡ꧀' ], // pasangan Ta murda
			[ '꧀u', '','ꦸ' ], // u
			[ '꧀U', '','ꦈ' ], // U
			// v = f
			[ '(ꦲ|ꦃ|ꦤ|ꦫ|ꦂ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦔ|ꦁ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(w|W)꧀', '','$1꧀ꦮ' ],
			[ '(ꦲ|ꦃ|ꦫ|ꦂ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦩ|ꦒ|ꦧ|ꦔ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀​(y|Y)', '','$1꧀ꦪ꧀' ], // consonant+zero-width-space+(y|Y) doesn't make special biconsonant -ya

			[ '(ꦲ|ꦃ|ꦫ|ꦂ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦩ|ꦒ|ꦧ|ꦔ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦦ|ꦯ|ꦡ)꧀(y|Y)', '','$1ꦾ' ], // special biconsonant -ya,
			// can't be started with n or y, reserved for bigraf ny (REF:-yy-)
			[ '(ꦤ|ꦏ|ꦠ|ꦱ|ꦭ|ꦥ|ꦗ|ꦩ|ꦒ|ꦧ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ)꧀(z|Z)', '','$1ꦾꦗ꦳꧀' ], // can't be started with d, reserved for bigraf dz

			// IV. 1. Special consonant
			[ '(ꦾ|ꦿ)a', '','$1' ],
			[ 'ꦿx', '','ꦽ' ], // special biconsonant -rê
			[ 'ꦊq', '','ꦋ' ], // special character lê Raswadi
			[ 'ꦭ꧀x', '','ꦊ' ], // special character lê
			[ 'ꦫ꧀x', '','ꦉ' ], // special character rê
			[ 'ꦌx', '','ꦄꦼ' ], // Ê
			[ '꧀x', '','ꦼ' ], // x is another way to write ê
			[ '꧀X', '','ꦄꦼ' ], // X is another way to write Ê

			// IV. 3. Extended vowel
			// long a (aa) - see II.
			[ '(ꦲ|ꦤ|ꦕ|ꦫ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ|꦳)i', '','$1ꦻ' ], // hanacaraka + i = -ai
			[ '(ꦲ|ꦤ|ꦕ|ꦫ|ꦏ|ꦢ|ꦠ|ꦱ|ꦮ|ꦭ|ꦥ|ꦝ|ꦗ|ꦪ|ꦚ|ꦩ|ꦒ|ꦧ|ꦛ|ꦔ|ꦘ|ꦨ|ꦖ|ꦓ|ꦑ|ꦟ|ꦦ|ꦯ|ꦡ|꦳)u', '','$1ꦻꦴ' ], // hanacaraka + u = -au
			[ 'ꦄi', '','ꦍ' ], // Ai
			[ 'ꦄu', '','ꦎꦴ' ], // Au
			[ 'ꦶi', '','ꦷ' ], // long i (ii)
			[ 'ꦆi', '','ꦇ' ], // long i (Ii)
			[ 'ꦸu', '','ꦹ' ], // long u (uu)
			[ 'ꦈu', '','ꦈꦴ' ], // long u (Uu)
			[ 'ꦺꦴo', '','ꦵ' ], // Sundanese -o

			// IV. 2. Extended consonant
			[ 'ꦱ꧀​(s|h)', '','ꦰ꧀' ], // s_s (with zero-width-space)
			[ 'ꦏ꧀​h', '','ꦏ꧀ꦲ꧀' ], // k_h (with zero-width-space)
			[ 'ꦒ꧀​h', '','ꦒ꧀ꦲ꧀' ], // g_h (with zero-width-space)
			[ 'ꦢ꧀​z', '','ꦢ꧀ꦗ꦳꧀' ], // d_z (with zero-width-space)
			[ 'ꦗ꧀​h', '','ꦙ' ], // j_h (with zero-width-space)
			[ 'ꦱ꧀(s|h)', '','ꦰ꧀' ], // ss/sh
			[ 'ꦏ꧀h', '','ꦏ꦳' ], // kh
			[ 'ꦒ꧀h', '','ꦒ꦳' ], // gh
			[ 'ꦢ꧀z', '','ꦢ꦳' ], // dz
			[ 'ꦗ꧀h', '','ꦙ' ], // jh/Ja mahaprana

			// III. Non-words
			// q and Q are special characters for choosing less used characters by pressing q/Q multiple times (rotating back)
			[ ' ', '','​' ], // zero-width-space, since javanese have no space
			[ '꧅q', '','꧁' ], // rêrênggan kiwa
			[ '꧄q', '','꧅' ], // pada luhur
			[ '꧃q', '','꧄' ], // pada madya
			[ '꧂q', '', '꧃' ],// pada andhap
			[ '꧁q', '','꧂' ], // rêrênggan têngên
			[ 'Q', '','꧁' ], // rêrênggan kiwa
			[ '꧟[Q|q]', '','꧀' ], // pangkon
			[ '꧞[Q|q]', '','꧟' ], // pada isen-isen
			[ '꧆[Q|q]', '','꧞' ], // pada tirta tumetes
			[ 'ꦀ[Q|q]', '', '꧆' ],// pada windu
			[ '꦳[Q|q]', '','ꦀ' ], // panyangga
			[ '꧀[Q|q]', '','꦳' ], // cecak telu
			[ 'q', '','꧀' ], // pangkon - to cut off the default -a vowel

			[ 'ꦫq', '','ꦿ' ], // another way to write -ra
			[ 'ꦪq', '','ꦾ' ], // another way to write -ya

			// II. 1. Alphabetical ha-na-ca-ra-ka
			[ 'ꦠ꧀​h', '','ꦠ꧀ꦲ꧀' ], // t_h (with zero-width-space)
			[ 'ꦢ꧀​h', '','ꦢ꧀ꦲ꧀' ], // d_h (with zero-width-space)
			[ 'ꦤ꧀​y', '','ꦚ꧀ꦪ꧀' ], // n_y (with zero-width-space)
			[ 'ꦤ꧀​g', '','ꦔ꧀ꦒ꧀' ], // n_g (with zero-width-space)
			[ 'ꦠ꧀h', '','ꦛ꧀' ], // th
			[ 'ꦢ꧀h', '','ꦝ꧀' ], // dh
			[ 'ꦤ꧀y', '','ꦚ꧀' ], // ny
			[ 'ꦤ꧀g', '','ꦁ' ], // ng
			[ 'a', '','ꦲ' ],
			[ 'b', '','ꦧ꧀' ],
			[ 'c', '','ꦕ꧀' ],
			[ 'd', '','ꦢ꧀' ],
			[ 'e', '','ꦲꦺ' ], // é|è
			[ '(f|v)', '','ꦥ꦳꧀' ],
			[ 'g', '','ꦒ꧀' ],
			[ 'h', '','ꦲ꧀' ],
			[ 'i', '','ꦲꦶ' ],
			[ 'j', '','ꦗ꧀' ],
			[ 'k', '','ꦏ꧀' ],
			[ 'l', '','ꦭ꧀' ],
			[ 'm', '','ꦩ꧀' ],
			[ 'n', '','ꦤ꧀' ],
			[ 'o', '','ꦲꦺꦴ' ],
			[ 'p', '','ꦥ꧀' ],
			// q = special letters, see III.
			[ 'r', '','ꦫ꧀' ],
			[ 's', '','ꦱ꧀' ],
			[ 't', '','ꦠ꧀' ],
			[ 'u', '','ꦲꦸ' ],
			// v = f
			[ 'w', '','ꦮ꧀' ],
			[ 'x', '','ꦲꦼ' ], // ê
			[ 'y', '','ꦪ꧀' ],
			[ 'z', '','ꦗ꦳꧀' ],

			// II. Basic Letters:
			// II. 2. Capital Ha-Na-Ca-Ra-Ka (Aksara Murda)
			[ '(ꦠ|ꦡ)꧀(h|H)', '','ꦛ꧀' ],
			[ 'ꦣ꧀h', '','ꦞ꧀' ], // Dha murda
			[ '(ꦢ|ꦣ)꧀H', '','ꦞ꧀' ], // Dha murda
			[ 'ꦟ꧀y', '','ꦘ꧀' ], // Nya murda
			[ '(ꦤ|ꦟ)꧀Y', '','ꦘ꧀' ], // NYA murda
			[ '(ꦤ|ꦟ)꧀(g|G)', '','ꦔ꧀' ],// nga
			[ 'A', '','ꦄ' ], // A
			[ 'B', '','ꦨ꧀' ], // Ba murda
			[ 'C', '','ꦖ꧀' ], // Ca murda(?)
			[ 'D', '','ꦣ꧀' ],
			[ 'E', '','ꦌ' ], // É|È
			[ '(F|V)', '','ꦥ꦳꧀' ],
			[ 'G', '','ꦓ꧀' ], // Ga murda
			[ 'H', '','ꦲ꧀' ],
			[ 'I', '','ꦆ' ], // I
			[ 'J', '','ꦙ꧀' ],// Ja Mahaprana
			[ 'K', '','ꦑ꧀' ], // Ka murda
			[ 'L', '','ꦭ꧀' ],
			[ 'M', '','ꦩ꧀' ],
			[ 'N', '','ꦟ꧀' ], // Na murda
			[ 'O', '','ꦎ' ], // O
			[ 'P', '','ꦦ꧀' ], // Pa murda
			// Q = special letters, see III.
			[ 'R', '','ꦬ꧀' ],
			[ 'S', '','ꦯ꧀' ], // Sa murda
			[ 'T', '','ꦡ꧀' ], // Ta murda
			[ 'U', '','ꦈ' ], // U
			// V = F
			[ 'W', '','ꦮ꧀' ],
			[ 'X', '','ꦄꦼ' ], // X is another way to write Ê
			[ 'Y', '','ꦪ꧀' ],
			[ 'Z', '','ꦗ꦳꧀' ],

			// I. Number
			[ '0', '','꧐' ],
			[ '1', '','꧑' ],
			[ '2', '','꧒' ],
			[ '3', '','꧓' ],
			[ '4', '','꧔' ],
			[ '5', '','꧕' ],
			[ '6', '','꧖' ],
			[ '7', '','꧗' ],
			[ '8', '','꧘' ],
			[ '9', '','꧙' ],
			[ ':', '','꧇' ], // 'enclose Javanese numbers, e.g. ":1:"'
			[ ',', '','꧈' ], // 'comma'
			[ '\\.', '','꧉' ], // 'period'
			[ '꧊\\|', '','꧋' ], // 'opening paragraph character'
			[ '\\|', '','꧊' ], // 'poem character'
			[ '\\(', '','꧌' ], // 'Javanese opening bracket'
			[ '\\)', '','꧍' ] // 'Javanese closing bracket'
		]
	};

	$.ime.register( jvTransliteration );
}( jQuery ) );
