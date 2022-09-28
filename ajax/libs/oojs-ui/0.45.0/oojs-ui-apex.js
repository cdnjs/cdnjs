/*!
 * OOUI v0.45.0
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2022 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2022-09-28T14:26:11Z
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
	OO.ui.ApexTheme.super.call( this );
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

//# sourceMappingURL=oojs-ui-apex.js.map.json