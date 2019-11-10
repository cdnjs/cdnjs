/*!
 * OOjs UI v0.2.2
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2014 OOjs Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2014-11-25T01:13:13Z
 */
/**
 * @class
 * @extends OO.ui.Theme
 *
 * @constructor
 */
OO.ui.MediaWikiTheme = function OoUiMediaWikiTheme() {
	// Parent constructor
	OO.ui.MediaWikiTheme.super.call( this );
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
			invert: false,
			primary: false,
			constructive: false,
			destructive: false
		},
		// Parent method
		classes = OO.ui.MediaWikiTheme.super.prototype.getElementClasses.call( this, element );

	if ( element.supports( [ 'isFramed', 'isDisabled', 'hasFlag' ] ) ) {
		if ( element.isFramed() && !element.isDisabled() ) {
			if (
				element.hasFlag( 'primary' ) ||
				element.hasFlag( 'constructive' ) ||
				element.hasFlag( 'destructive' )
			) {
				variants.invert = true;
			}
		} else {
			variants.primary = element.hasFlag( 'primary' );
			variants.constructive = element.hasFlag( 'constructive' );
			variants.destructive = element.hasFlag( 'destructive' );
		}
	}

	for ( variant in variants ) {
		classes[variants[variant] ? 'on' : 'off'].push( 'oo-ui-image-' + variant );
	}

	return classes;
};

/* Instantiation */

OO.ui.theme = new OO.ui.MediaWikiTheme();
