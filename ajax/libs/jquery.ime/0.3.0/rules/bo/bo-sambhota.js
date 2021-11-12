( function ( $ ) {
	'use strict';

	var stackingState, boSAMBHOTA;

	function changeStackingState( newState ) {
		stackingState = newState;
	}

	function reinit() {
		changeStackingState( 0 );
	}

	reinit();

	// isOneChar is true for composed sanskrit characters (ex གྷ)
	function normalOrSub( normal, sub, alwaysStacked, isOneChar ) {
		switch ( stackingState ) {
			case 0:
				return normal;
			case 1:
				if ( !isOneChar ) {
					changeStackingState( 2 );
				}

				return normal;
			case 2:
				if ( !isOneChar ) {
					changeStackingState( 3 );
				}

				return sub;
			default:
				if ( alwaysStacked ) {
					return sub;
				}

				changeStackingState( 0 );

				return normal;
		}
	}

	function switchStacking() {
		if ( !stackingState ) {
			changeStackingState( 1 );
		} else {
			changeStackingState( 0 );
		}
	}

	boSAMBHOTA = {
		id: 'bo-sambhota',
		name: 'Tibetan Sambhota',
		description: 'Tibetan Sambhota Input Method.',
		date: '2015-08-04',
		URL: 'https://github.com/tibetan-nlp/ttt/blob/master/source/Sambhota_keymap_one.rtf',
		author: 'Elie Roux <elie.roux@telecom-bretagne.eu>',
		license: 'GPLv3',
		version: '1.0',
		maxKeyLength: 5,
		patterns: [
			/* eslint-disable max-statements-per-line */
			[ ' ', function () { reinit(); return '་'; } ],
			[ '\\.', function () { reinit(); return ' '; } ],
			[ ',', function () { reinit(); return '།'; } ],
			[ ';', function () { reinit(); return '༔'; } ],
			[ 'f', function () { switchStacking(); return ''; } ],
			[ 'a', function () { reinit(); return ''; } ],
			[ 'k', function () { return normalOrSub( 'ཀ', 'ྐ' ); } ],
			[ 'K', function () { return normalOrSub( 'ཁ', 'ྑ' ); } ],
			[ 'g', function () { return normalOrSub( 'ག', 'ྒ' ); } ],
			[ 'G', function () { return normalOrSub( 'ང', 'ྔ' ); } ],
			[ 'c', function () { return normalOrSub( 'ཅ', 'ྕ' ); } ],
			[ 'C', function () { return normalOrSub( 'ཆ', 'ྖ' ); } ],
			[ 'j', function () { return normalOrSub( 'ཇ', 'ྗ' ); } ],
			[ 'N', function () { return normalOrSub( 'ཉ', 'ྙ' ); } ],
			[ 'q', function () { return normalOrSub( 'ཊ', 'ྚ' ); } ],
			[ 'Q', function () { return normalOrSub( 'ཋ', 'ྛ' ); } ],
			[ 'v', function () { return normalOrSub( 'ཌ', 'ྜ' ); } ],
			[ 'V', function () { return normalOrSub( 'ཎ', 'ྞ' ); } ],
			[ 't', function () { return normalOrSub( 'ཏ', 'ྟ' ); } ],
			[ 'T', function () { return normalOrSub( 'ཐ', 'ྠ' ); } ],
			[ 'd', function () { return normalOrSub( 'ད', 'ྡ' ); } ],
			[ 'གྷn', function () { return normalOrSub( 'གྷན', 'གྷྣ' ); } ],
			[ 'n', function () { return normalOrSub( 'ན', 'ྣ' ); } ],
			[ 'p', function () { return normalOrSub( 'པ', 'ྤ' ); } ],
			[ 'P', function () { return normalOrSub( 'ཕ', 'ྥ' ); } ],
			[ 'b', function () { return normalOrSub( 'བ', 'ྦ' ); } ],
			[ 'རྨm', function () { return normalOrSub( 'རྨམ', 'རྨྨ', true ); } ],
			[ 'm', function () { return normalOrSub( 'མ', 'ྨ' ); } ],
			[ 'x', function () { return normalOrSub( 'ཙ', 'ྩ' ); } ],
			[ 'X', function () { return normalOrSub( 'ཚ', 'ྪ' ); } ],
			[ 'D', function () { return normalOrSub( 'ཛ', 'ྫ' ); } ],
			[ 'ྭw', function () { return normalOrSub( 'ྭཝ', 'ྭྭ' ); } ],
			[ 'w', function () { return normalOrSub( 'ཝ', 'ྭ', true ); } ],
			[ 'W', function () { return normalOrSub( 'ཝ', 'ྺ' ); } ],
			[ 'Z', function () { return normalOrSub( 'ཞ', 'ྮ' ); } ],
			[ 'z', function () { return normalOrSub( 'ཟ', 'ྯ' ); } ],
			[ 'ཱ\'', function () { return normalOrSub( 'ཱ\'འ', 'ཱཱ' ); } ],
			[ '\'', function () { return normalOrSub( 'འ', 'ཱ', true ); } ],
			[ 'ྱy', function () { return normalOrSub( 'ྱཡ', 'ྱྱ' ); } ],
			[ 'y', function () { return normalOrSub( 'ཡ', 'ྱ', true ); } ],
			[ 'l', function () { return normalOrSub( 'ལ', 'ླ' ); } ],
			[ 'i', function () { reinit(); return 'ི'; } ],
			[ 'u', function () { reinit(); return 'ུ'; } ],
			[ 'e', function () { reinit(); return 'ེ'; } ],
			[ 'o', function () { reinit(); return 'ོ'; } ],
			[ 'ལ([ྐ-ྷ]+)r', function ( _, capture ) { reinit(); return 'ལ' + capture + 'ར'; } ],
			[ 'ྐr', function () { return normalOrSub( 'ྐར', 'ྐྲ', true ); } ],
			[ 'ྒr', function () { return normalOrSub( 'ྒར', 'ྒྲ', true ); } ],
			[ 'ྣr', function () { return normalOrSub( 'ྣར', 'ྣྲ', true ); } ],
			[ 'ྤr', function () { return normalOrSub( 'ྤར', 'ྤྲ', true ); } ],
			[ 'ྦr', function () { return normalOrSub( 'ྦར', 'ྦྲ', true ); } ],
			[ 'ྨr', function () { return normalOrSub( 'ྨར', 'ྨྲ', true ); } ],
			[ 'སྡr', function () { reinit(); return 'སྡར'; } ],
			[ 'ྡr', function () { return normalOrSub( 'ྡར', 'ྡྲ', true ); } ],
			[ 'ྦྷr', function () { return normalOrSub( 'ྦྷར', 'ྦྷྲ', true ); } ],
			[ 'ྡྷr', function () { return normalOrSub( 'ྡྷར', 'ྡྷྲ', true ); } ],
			[ 'ྒྷr', function () { return normalOrSub( 'ྒྷར', 'ྒྷྲ', true ); } ],
			[ 'ྜྷr', function () { return normalOrSub( 'ྜྷར', 'ྜྷྲ', true ); } ],
			[ 'ྟr', function () { return normalOrSub( 'ྟར', 'ྟྲ', true ); } ],
			[ 'r', function () { return normalOrSub( 'ར', 'ྲ' ); } ],
			[ 'S', function () { return normalOrSub( 'ཤ', 'ྴ' ); } ],
			[ 'ཀB', function () { return normalOrSub( 'ཀཥ', 'ཀྵ', true, true ); } ],
			[ 'ྐB', function () { return normalOrSub( 'ྐཥ', 'ྐྵ', true, true ); } ],
			[ 'B', function () { return normalOrSub( 'ཥ', 'ྵ' ); } ],
			[ 's', function () { return normalOrSub( 'ས', 'ྶ' ); } ],
			[ 'གh', function () { return normalOrSub( 'གཧ', 'གྷ', true, true ); } ],
			[ 'ཌh', function () { return normalOrSub( 'ཌཧ', 'ཌྷ', true, true ); } ],
			[ 'དh', function () { return normalOrSub( 'དཧ', 'དྷ', true, true ); } ],
			[ 'བh', function () { return normalOrSub( 'བཧ', 'བྷ', true, true ); } ],
			[ 'ཛh', function () { return normalOrSub( 'ཛཧ', 'ཛྷ', true, true ); } ],
			[ 'ྒh', function () { return normalOrSub( 'ྒཧ', 'ྒྷ', true, true ); } ],
			[ 'ྜh', function () { return normalOrSub( 'ྜཧ', 'ྜྷ', true, true ); } ],
			[ 'ྡh', function () { return normalOrSub( 'ྡཧ', 'ྡྷ', true, true ); } ],
			[ 'ྦh', function () { return normalOrSub( 'ྦཧ', 'ྦྷ', true, true ); } ],
			[ 'ྫh', function () { return normalOrSub( 'ྫཧ', 'ྫྷ', true, true ); } ],
			[ 'ྷh', function () { return normalOrSub( 'ྷཧ', 'ྷྷ' ); } ],
			[ 'h', function () { return normalOrSub( 'ཧ', 'ྷ', true ); } ],
			[ 'A', function () { return normalOrSub( 'ཨ', 'ྸ' ); } ],
			[ 'R', function () { return normalOrSub( 'ཪ', 'ྼ' ); } ],
			[ 'Y', 'ྻ' ],
			[ 'ྲI', function () { reinit(); return 'ྲྀ'; } ],
			[ 'ླI', function () { reinit(); return 'ླྀ'; } ],
			[ 'I', function () { reinit(); return 'ྀ'; } ],
			[ 'E', function () { reinit(); return 'ཻ'; } ],
			[ 'O', function () { reinit(); return 'ཽ'; } ],
			[ 'J', function () { reinit(); return 'ིཾ'; } ],
			[ 'U', function () { reinit(); return 'ྀཾ'; } ],
			[ 'F', function () { reinit(); return 'ེཾ'; } ],
			[ 'L', function () { reinit(); return 'ོཾ'; } ],
			[ '`', function () { reinit(); return 'ཽཾ'; } ],
			[ '~', function () { reinit(); return 'ཻཾ'; } ],
			[ '\\^', function () { reinit(); return '྄'; } ],
			[ '\\!', function () { reinit(); return '༄༅༅'; } ],
			[ '\\#', function () { reinit(); return '༁ྃ'; } ],
			[ '\\%', function () { reinit(); return 'ྃ'; } ],
			[ '\\+', function () { reinit(); return 'ྂ'; } ],
			[ '\\&', function () { reinit(); return 'ཾ'; } ],
			[ '\\<', function () { reinit(); return 'ༀ'; } ],
			[ '\\=', function () { reinit(); return 'ཨཱཿ'; } ],
			[ '\\>', function () { reinit(); return 'ཧཱུྃ'; } ],
			[ '\\:', function () { reinit(); return 'ཿ'; } ],
			[ '"', function () { reinit(); return '༄༅'; } ],
			[ '@', function () { reinit(); return '༄'; } ],
			[ '\\$', function () { reinit(); return '༅'; } ],
			[ '\\/', function () { reinit(); return '༴'; } ],
			[ '\\?', function () { reinit(); return '༈'; } ],
			[ '\\|', function () { reinit(); return '྅'; } ],
			[ '-', function () { reinit(); return '༑'; } ],
			[ '\\(', function () { reinit(); return '༼'; } ],
			[ '\\)', function () { reinit(); return '༽'; } ],
			// numbers
			[ '0', function () { reinit(); return '༠'; } ],
			[ '1', function () { reinit(); return '༡'; } ],
			[ '2', function () { reinit(); return '༢'; } ],
			[ '3', function () { reinit(); return '༣'; } ],
			[ '4', function () { reinit(); return '༤'; } ],
			[ '5', function () { reinit(); return '༥'; } ],
			[ '6', function () { reinit(); return '༦'; } ],
			[ '7', function () { reinit(); return '༧'; } ],
			[ '8', function () { reinit(); return '༨'; } ],
			[ '9', function () { reinit(); return '༩'; } ]
			/* eslint-enable max-statements-per-line */
		]
	};

	$.ime.register( boSAMBHOTA );
}( jQuery ) );
