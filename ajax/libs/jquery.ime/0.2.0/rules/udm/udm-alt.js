( function ( $ ) {
	'use strict';

	var udmAlt = {
		id: 'udm-alt',
		name: 'Удмурт ALT',
		description: 'Удмурт ALT',
		date: '2013-03-17',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Amir (Алексей) Aharoni',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ц', 'ӵ' ],
			[ 'Ц', 'Ӵ' ],
			[ 'щ', 'ӥ' ],
			[ 'Щ', 'Ӥ' ],
			[ 'х', 'ӟ' ],
			[ 'Х', 'Ӟ' ],
			[ 'ф', 'ӝ' ],
			[ 'Ф', 'Ӝ' ]
		],
		patterns_x: [
			[ 'ё', 'ӧ' ],
			[ 'Ё', 'Ӧ' ],

			// Allow typing the Russian letters using Alt
			[ 'ц', 'ц' ],
			[ 'Ц', 'Ц' ],
			[ 'щ', 'щ' ],
			[ 'Щ', 'Щ' ],
			[ 'х', 'х' ],
			[ 'Х', 'Х' ],
			[ 'ф', 'ф' ],
			[ 'Ф', 'Ф' ]
		]
	};

	$.ime.register( udmAlt );
}( jQuery ) );
