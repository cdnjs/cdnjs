/**
 * Malayalam language functions
 *
 * @author Santhosh Thottingal
 */

( function ( $ ) {
	'use strict';

	$.i18n.languages.ml = $.extend( {}, $.i18n.languages['default'], {
		convertGrammar: function ( word, form ) {
			form = form.toLowerCase();
			switch ( form ) {
				case 'ഉദ്ദേശിക':
				case 'dative':
					if ( word.substr( -1 ) === 'ു'
						|| word.substr( -1 ) === 'ൂ'
						|| word.substr( -1 ) === 'ൗ'
						|| word.substr( -1 ) === 'ൌ' ) {
						word += 'വിന്';
					} else if ( word.substr( -1 ) === 'ം' ) {
						word = word.substr( 0, word.length - 1 ) + 'ത്തിന്';
					} else if ( word.substr( -1 ) === 'ൻ' ) {
						// Atomic chillu n. അവൻ -> അവന്
						word = word.substr( 0, word.length - 1 ) + 'ന്';
					} else if ( word.substr( -3 ) === 'ന്‍' ) {
						// chillu n. അവൻ -> അവന്
						word = word.substr( 0, word.length - 1 );
					} else if ( word.substr( -1 ) === 'ൾ' || word.substr( -3 ) === 'ള്‍' ) {
						word += 'ക്ക്';
					} else if ( word.substr( -1 ) === 'ർ' || word.substr( -3 ) === 'ര്‍' ) {
						word += 'ക്ക്';
					} else if ( word.substr( -1 ) === 'ൽ' ) {
						// Atomic chillu ൽ , ഫയൽ -> ഫയലിന്
						word = word.substr( 0, word.length - 1 ) + 'ലിന്';
					} else if ( word.substr( -3 ) === 'ല്‍' ) {
						// chillu ല്‍ , ഫയല്‍ -> ഫയലിന്
						word = word.substr( 0, word.length - 2 ) + 'ിന്';
					} else if ( word.substr( -2 ) === 'ു്' ) {
						word = word.substr( 0, word.length - 2 ) + 'ിന്';
					} else if ( word.substr( -1 ) === '്' ) {
						word = word.substr( 0, word.length - 1 ) + 'ിന്';
					} else {
						// കാവ്യ -> കാവ്യയ്ക്ക്, ഹരി -> ഹരിയ്ക്ക്, മല -> മലയ്ക്ക്
						word += 'യ്ക്ക്';
					}
					break;
				case 'സംബന്ധിക':
				case 'genitive':
					if ( word.substr( -1 ) === 'ം' ) {
						word = word.substr( 0, word.length - 1 ) + 'ത്തിന്റെ';
					} else if ( word.substr( -2 ) === 'ു്' ) {
						word = word.substr( 0, word.length - 2 ) + 'ിന്റെ';
					} else if ( word.substr( -1 ) === '്' ) {
						word = word.substr( 0, word.length - 1 ) + 'ിന്റെ';
					} else if (  word.substr( -1 ) === 'ു'
						|| word.substr( -1 ) === 'ൂ'
						|| word.substr( -1 ) === 'ൗ'
						|| word.substr( -1 ) === 'ൌ'  ) {
						word += 'വിന്റെ';
					} else if ( word.substr( -1 ) === 'ൻ' ) {
						// Atomic chillu n. അവൻ -> അവന്റെ
						word = word.substr( 0, word.length - 1 ) + 'ന്റെ';
					} else if ( word.substr( -3 ) === 'ന്‍' ) {
						// chillu n. അവൻ -> അവന്റെ
						word = word.substr( 0, word.length -1 ) + 'റെ';
					} else if ( word.substr( -3 ) === 'ള്‍' ) {
						// chillu n. അവൾ -> അവളുടെ
						word = word.substr( 0, word.length - 2 ) + 'ുടെ';
					} else if ( word.substr( -1 ) === 'ൾ' ) {
						// Atomic chillu n. അവള്‍ -> അവളുടെ
						word = word.substr( 0, word.length - 1 ) + 'ളുടെ';
					} else if ( word.substr( -1 ) === 'ൽ' ) {
						// Atomic l. മുയല്‍ -> മുയലിന്റെ
						word = word.substr( 0, word.length - 1 ) + 'ലിന്റെ';
					} else if ( word.substr( -3 ) === 'ല്‍' ) {
						// chillu l. മുയല്‍ -> അവളുടെ
						word = word.substr( 0, word.length - 2 ) + 'ിന്റെ';
					} else if ( word.substr( -3 ) === 'ര്‍' ) {
						// chillu r. അവര്‍ -> അവരുടെ
						word = word.substr( 0, word.length - 2 ) + 'ുടെ';
					} else if ( word.substr( -1 ) === 'ർ' ) {
						// Atomic chillu r. അവർ -> അവരുടെ
						word = word.substr( 0, word.length - 1 ) + 'രുടെ';
					} else {
						word += 'യുടെ';
					}
					break;
			}
			return word;
		}
	} );
}( jQuery ) );
