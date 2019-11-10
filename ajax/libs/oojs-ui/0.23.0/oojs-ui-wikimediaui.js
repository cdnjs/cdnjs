/*!
 * OOjs UI v0.23.0
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2017 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2017-09-05T21:23:58Z
 */
( function ( OO ) {

'use strict';

/**
 * @class
 * @extends OO.ui.Theme
 *
 * @constructor
 */
OO.ui.WikimediaUITheme = function OoUiWikimediaUITheme() {
	// Parent constructor
	OO.ui.WikimediaUITheme.parent.call( this );
};

/* Setup */

OO.inheritClass( OO.ui.WikimediaUITheme, OO.ui.Theme );

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.WikimediaUITheme.prototype.getElementClasses = function ( element ) {
	// Parent method
	var variant, isFramed, isActive,
		variants = {
			warning: false,
			invert: false,
			progressive: false,
			constructive: false,
			destructive: false
		},
		// Parent method
		classes = OO.ui.WikimediaUITheme.parent.prototype.getElementClasses.call( this, element );

	if ( element.supports( [ 'hasFlag' ] ) ) {
		isFramed = element.supports( [ 'isFramed' ] ) && element.isFramed();
		isActive = element.supports( [ 'isActive' ] ) && element.isActive();
		if (
			// Button with a dark background
			isFramed && ( isActive || element.isDisabled() || element.hasFlag( 'primary' ) ) ||
			// Toolbar with a dark background
			OO.ui.ToolGroup && element instanceof OO.ui.ToolGroup && ( isActive || element.hasFlag( 'primary' ) )
		) {
			// … use white icon / indicator, regardless of other flags
			variants.invert = true;
		} else if ( !isFramed && element.isDisabled() ) {
			// Frameless disabled button, always use black icon / indicator regardless of other flags
			variants.invert = false;
		} else if ( !element.isDisabled() ) {
			// Any other kind of button, use the right colored icon / indicator if available
			variants.progressive = element.hasFlag( 'progressive' );
			variants.constructive = element.hasFlag( 'constructive' );
			variants.destructive = element.hasFlag( 'destructive' );
			variants.warning = element.hasFlag( 'warning' );
		}
	}

	for ( variant in variants ) {
		classes[ variants[ variant ] ? 'on' : 'off' ].push( 'oo-ui-image-' + variant );
	}

	return classes;
};

/**
 * @inheritdoc
 */
OO.ui.WikimediaUITheme.prototype.getDialogTransitionDuration = function () {
	return 250;
};

/* Instantiation */

OO.ui.theme = new OO.ui.WikimediaUITheme();

}( OO ) );

//# sourceMappingURL=oojs-ui-wikimediaui.js.map