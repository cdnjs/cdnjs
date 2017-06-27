/*!
 * OOjs UI v0.16.1
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2016 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2016-03-01T21:50:12Z
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
		if (
			( isFramed && ( isActive || element.isDisabled() || element.hasFlag( 'primary' ) ) ) ||
			( !isFramed && element.hasFlag( 'primary' ) )
		) {
			variants.invert = true;
		} else {
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

/* Instantiation */

OO.ui.theme = new OO.ui.MediaWikiTheme();

}( OO ) );
