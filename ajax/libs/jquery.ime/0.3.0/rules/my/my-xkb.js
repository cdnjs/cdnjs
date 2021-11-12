( function ( $ ) {
	'use strict';

	var myXkb = {
		id: 'my-xkb',
		name: 'မြန်မာဘာသာ xkb',
		description: 'Myanmar xkb keyboard layout',
		date: '2013-02-12',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.01',
		patterns: [
			[ '`', '\u1050' ], // ၐ SHA
			[ '\\~', '\u100e' ], // ဎ DDHA
			[ '1', '\u1041' ], // ၁ DIGIT ONE
			[ '\\!', '\u100D' ], // ဍ DDA
			[ '2', '\u1042' ], // ၂ DIGIT TWO
			[ '\\@', '\u1052' ], // VOCALIC R
			[ '3', '\u1043' ], // ၃ DIGIT THREE
			[ '\\#', '\u100B' ], // TTA
			[ '4', '\u1044' ], // ၄ DIGIT FOUR
			[ '\\$', '\u1053' ], // VOCALIC RR
			[ '5', '\u1045' ], // ၅ DIGIT FIVE
			[ '\\%', '\u1054' ], // VOCALIC L
			[ '6', '\u1046' ], // ၆ DIGIT SIX
			[ '\\^', '\u1055' ], // ၕ VOL
			[ '7', '\u1047' ], // ၇ DIGIT SEVEN
			[ '\\&', '\u101B' ], // ရ RA
			[ '8', '\u1048' ], // ၇ DIGIT EIGHT
			[ '9', '\u1049' ], // ၉ DIGIT NINE
			[ '0', '\u1040' ], // ၀ DIGIT ZERO

			[ 'q', '\u1006' ], // ဆ CHA
			[ 'Q', '\u1008' ], // ဈ JHA
			[ 'w', '\u1010' ], // တ TA
			[ 'W', '\u101D' ], // ဝ WA
			[ 'e', '\u1014' ], // န NA
			[ 'E', '\u1023' ], // ဣ I
			[ 'r', '\u1019' ], // မ MA
			[ 'R', '\u104E' ], // ၎ AFOREMENTIONED
			[ 't', '\u1021' ], // အ A
			[ 'T', '\u1024' ], // ဤ II
			[ 'y', '\u1015' ], // ပ PA
			[ 'Y', '\u104C' ], // ၌ LOCATIVE
			[ 'u', '\u1000' ], // က KA
			[ 'U', '\u1025' ], // ဥ U
			[ 'i', '\u1004' ], // င NGA
			[ 'I', '\u104D' ], // ၍ COMPLETED
			[ 'o', '\u101E' ], // သ SA
			[ 'O', '\u103F' ], // ဿ GREAT SA
			[ 'p', '\u1005' ], // စ CA
			[ 'P', '\u100F' ], // ဏ NNA
			[ '\\[', '\u101F' ], // ဟ HA
			[ '\\{', '\u1027' ], // ဧ E
			[ '\\]', '\u1029' ], // ဩ O
			[ '\\}', '\u102A' ], // ဪ AU

			[ '\\\\', '\u104F' ], // ၏ GENITIVE
			[ '\\|', '\u1051' ], // ၑ SSA

			[ 'a', '\u1031' ], // ေSIGN E
			[ 'A', '\u1017' ], // ဗ BA
			[ 's', '\u103B' ], // ျ SIGN MEDIAL YA
			[ 'S', '\u103E' ], // ှ SIGN MEDIAL HA
			[ 'd', '\u102D' ], // ိ SIGN I
			[ 'D', '\u102E' ], // ီ SIGN II
			[ 'f', '\u103A' ], // ် ASAT
			[ 'F', '\u1039' ], // ္ VIRAMA
			[ 'g', '\u102B' ], // ါ SIGN TALL A
			[ 'G', '\u103D' ], // ွ SIGN MEDIAL WA
			[ 'h', '\u1037' ], // ့ SIGN DOT BELOW
			[ 'H', '\u1036' ], // ံ ANUSVARA
			[ 'j', '\u103C' ], // ြ MEDIAL RA
			[ 'J', '\u1032' ], // ဲ SIGN AI
			[ 'k', '\u102F' ], // ု SIGN U
			[ 'K', '\u1012' ], // ဒ DA
			[ 'l', '\u1030' ], // ူ SIGN UU
			[ 'L', '\u1013' ], // ဓ DHA

			[ ';', '\u1038' ], // း VISARGA
			[ ':', '\u1002' ], // ဂ GA

			[ 'z', '\u1016' ], // ဖ PHA
			[ 'Z', '\u1007' ], // ဇ JA
			[ 'x', '\u1011' ], // ထ THA
			[ 'X', '\u100C' ], // ဌ TTHA
			[ 'c', '\u1001' ], // ခ KHA
			[ 'C', '\u1003' ], // ဃ GHA
			[ 'v', '\u101C' ], // လ LA
			[ 'V', '\u1020' ], // ဠ LLA
			[ 'b', '\u1018' ], // ဘ BHA
			[ 'B', '\u101A' ], // ယ YA
			[ 'n', '\u100A' ], // ည NNYA
			[ 'N', '\u1009' ], // ဉ NYA
			[ 'm', '\u102C' ], // ာ SIGN AA
			[ 'M', '\u1026' ], // ဦ UU

			[ '\\<', '\u104A' ], // ၊ SIGN LITTLE SECTION
			[ '\\>', '\u104B' ], // ။ SIGN SECTION
		]
	};

	$.ime.register( myXkb );
}( jQuery ) );
