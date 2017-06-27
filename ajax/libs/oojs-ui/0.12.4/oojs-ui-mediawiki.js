/*!
 * OOjs UI v0.12.4
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2015 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2015-08-13T21:01:04Z
 */
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
	var variant,
		variants = {
			warning: false,
			invert: false,
			progressive: false,
			constructive: false,
			destructive: false
		},
		// Parent method
		classes = OO.ui.MediaWikiTheme.parent.prototype.getElementClasses.call( this, element ),
		isFramed;

	if ( element.supports( [ 'hasFlag' ] ) ) {
		isFramed = element.supports( [ 'isFramed' ] ) && element.isFramed();
		if (
			( isFramed && ( element.isDisabled() || element.hasFlag( 'primary' ) ) ) ||
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
