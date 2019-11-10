( function ( $ ) {
	'use strict';

	var heStandardExtOnly = {
		id: 'he-standard-2012-extonly',
		name: 'Hebrew 2012',
		description: 'Hebrew keyboard according to Israeli Standard 1452',
		date: '2012-10-15',
		URL: 'http://www.lingnu.com/he/howto/78-si1452.html',
		author: 'Amir E. Aharoni (אָמִיר אֱלִישָׁע אַהֲרוֹנִי, [[User:Amire80]])',
		license: 'GPLv3',
		version: '1.0',
		patterns: [], // Empty, because the assumption is that the user is using a Hebrew keyboard already
		patterns_x: [
			[ '\u05E9', 'ְ' ],       // Sheva, ש

			[ '\u05E7', 'ָ' ],       // Qamats, ק
			[ '\u05E8', 'ֳ' ],       // Hataf qamats, ר
			[ '\u05E4', 'ַ' ],       // Patah, פ
			[ '\\]', 'ֲ' ],          // Hataf patah, ]

			[ '\u05E6', 'ֵ' ],       // Tsere, צ
			[ '\u05E1', 'ֶ' ],       // Segol, ס
			[ '\u05D1', 'ֱ' ],       // Hataf segol, ב

			[ '\u05D7', 'ִ' ],       // Hiriq, ח

			[ '\u05D5', 'ֹ' ],       // Holam, ו

			[ '\\\\', 'ֻ' ],         // Qubuts, \

			[ '\u05D3', 'ּ' ],       // Dagesh, ד

			[ '/', 'ׂ' ],            // Sin dot
			[ '\'', 'ׁ' ],           // Shin dot

			[ '-', '\u05BE' ],      // Maqaf
			[ '=', '–' ],           // Qav mafrid - en dash
			[ '\\[', 'ֿ' ],          // Rafe
			[ '1', 'ֽ' ],            // Meteg
			[ '3', '€' ],           // Euro sign
			[ '4', '₪' ],           // Sheqel sign
			[ '5', '°' ],           // Degree
			[ '6', '֫' ],           // Ole
			[ '8', '×' ],           // Multiplication
			[ '9', '\u200e' ],      // LRM
			[ '0', '\u200f' ],      // RLM
			[ '\\.', '÷' ],         // Division

			[ '\u05D8', 'װ' ],      // Double vav, ט
			[ '\u05D9', 'ײ' ],      // Double yod, י
			[ '\u05E2', 'ױ' ],      // Vav-yod, ע

			// Some source code editors may show the next two lines
			// in a weird way because of auto-directionality.
			[ ';', '׳' ],      // Geresh, ';'
			[ ',', '״' ],      // Gershayim, ','
			[ '\u05E3', '„' ],      // Opening double quote, ף
			[ '\u05DA', '”' ],      // Closing double quote, ך
			[ '\u05E5', '‚' ],      // Opening single quote, ץ
			[ '\u05EA', '’' ]       // Closing single quote, ת
		]
	};

	$.ime.register( heStandardExtOnly );
}( jQuery ) );
