/*!
 * OOjs UI v0.17.10
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2016 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2016-10-03T18:59:01Z
 */
( function ( OO ) {

'use strict';

/**
 * @class
 * @extends OO.ui.Theme
 *
 * @constructor
 */
OO.ui.MediaWikiTheme = function OoUiMediaWikiTheme() {
	// Parent constructor
	OO.ui.MediaWikiTheme.parent.call( this );
};

/* Setup */

OO.inheritClass( OO.ui.MediaWikiTheme, OO.ui.Theme );

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.MediaWikiTheme.prototype.getElementClasses = function ( element ) {
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
		classes = OO.ui.MediaWikiTheme.parent.prototype.getElementClasses.call( this, element );

	if ( element.supports( [ 'hasFlag' ] ) ) {
		isFramed = element.supports( [ 'isFramed' ] ) && element.isFramed();
		isActive = element.supports( [ 'isActive' ] ) && element.isActive();
		if ( isFramed && ( isActive || element.isDisabled() || element.hasFlag( 'primary' ) ) ) {
			// Button with a dark background, use white icon
			variants.invert = true;
		} else if ( !isFramed && element.isDisabled() ) {
			// Frameless disabled button, always use black icon regardless of flags
			variants.invert = false;
		} else if ( !element.isDisabled() ) {
			// Any other kind of button, use the right colored icon if available
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
OO.ui.MediaWikiTheme.prototype.getDialogTransitionDuration = function () {
	return 250;
};

/* Instantiation */

OO.ui.theme = new OO.ui.MediaWikiTheme();

}( OO ) );
