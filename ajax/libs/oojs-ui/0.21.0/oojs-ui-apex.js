/*!
 * OOjs UI v0.21.0
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2017 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2017-04-11T22:51:05Z
 */
( function ( OO ) {

'use strict';

/**
 * @class
 * @extends OO.ui.Theme
 *
 * @constructor
 */
OO.ui.ApexTheme = function OoUiApexTheme() {
	// Parent constructor
	OO.ui.ApexTheme.parent.call( this );
};

/* Setup */

OO.inheritClass( OO.ui.ApexTheme, OO.ui.Theme );

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ApexTheme.prototype.getDialogTransitionDuration = function () {
	return 250;
};

/* Instantiation */

OO.ui.theme = new OO.ui.ApexTheme();

}( OO ) );
