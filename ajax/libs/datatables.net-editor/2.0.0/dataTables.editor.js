/*! DataTables Editor
 *
 * ©SpryMedia Ltd, all rights reserved.
 * License: editor.datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';

var DataTable = $.fn.dataTable;


var Editor = function ( opts )
{
	console.warn('DataTables Editor temporary holding file.');
	console.info('If you are seeing this message, it is because Editor has been');
	console.info('installed using `npm install datatables.net-editor`, but the');
	console.info('licensed or trial files have not been installed in place of');
	console.info('the holding files.');
	console.info('');
	console.info('To install the files, please download Editor from');
	console.info('https://editor.datatables.net and replace the Javascript and');
	console.info('CSS files in `node_modules/datatables.net-editor` with those');
	console.info('from the downloaded package. An install script is available');
	console.info('in the package. Please see the Readme file for details.');
};


return Editor;
}));
