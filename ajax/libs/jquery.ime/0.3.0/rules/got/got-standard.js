( function ( $ ) {
	'use strict';

	var gotStandard = {
		id: 'got-standard',
		name: '𐌲𐌿𐍄𐌹𐍃𐌺𐌰 𐍂𐌰𐌶𐌳𐌰',
		description: 'Gothic keyboard layout',
		date: '2016-06-27',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Bokareis',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'a', '𐌰' ],
			[ 'b', '𐌱' ],
			[ 'g', '𐌲' ],
			[ 'd', '𐌳' ],
			[ 'e', '𐌴' ],
			[ 'q', '𐌵' ],
			[ 'z', '𐌶' ],
			[ 'h', '𐌷' ],
			[ 'T', '𐌸' ],
			[ 'i', '𐌹' ],
			[ 'k', '𐌺' ],
			[ 'l', '𐌻' ],
			[ 'm', '𐌼' ],
			[ 'n', '𐌽' ],
			[ 'j', '𐌾' ],
			[ 'u', '𐌿' ],
			[ 'p', '𐍀' ],
			[ 'c', '𐍁' ],
			[ 'r', '𐍂' ],
			[ 's', '𐍃' ],
			[ 't', '𐍄' ],
			[ 'w', '𐍅' ],
			[ 'f', '𐍆' ],
			[ 'x', '𐍇' ],
			[ 'v', '𐍈' ],
			[ 'o', '𐍉' ],
			[ 'y', '𐍊' ]
		]
	};

	$.ime.register( gotStandard );
}( jQuery ) );
