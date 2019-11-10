/*! Tablesaw - v3.0.0 - 2017-02-14
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2017 Filament Group; Licensed MIT */
// UMD module definition
// From: https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js

(function (factory) {
	if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if ( typeof window !== 'undefined' ) {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";

	var win = typeof window !== "undefined" ? window : this;

var Tablesaw = {
	i18n: {
		modes: [ 'Stack', 'Swipe', 'Toggle' ],
		columns: 'Col<span class=\"a11y-sm\">umn</span>s',
		columnBtnText: 'Columns',
		columnsDialogError: 'No eligible columns.',
		sort: 'Sort'
	},
	// cut the mustard
	mustard: ( 'head' in document ) && // IE9+, Firefox 4+, Safari 5.1+, Mobile Safari 4.1+, Opera 11.5+, Android 2.3+
		( !window.blackberry || window.WebKitPoint ) && // only WebKit Blackberry (OS 6+)
		!window.operamini
};

if( Tablesaw.mustard ) {
	$( document.documentElement ).addClass( 'tablesaw-enhanced' );
}

(function() {
	var pluginName = "tablesaw",
		classes = {
			toolbar: "tablesaw-bar"
		},
		events = {
			create: "tablesawcreate",
			destroy: "tablesawdestroy",
			refresh: "tablesawrefresh"
		},
		defaultMode = "stack",
		initSelector = "table[data-tablesaw-mode],table[data-tablesaw-sortable]";

	var Table = function( element ) {
		if( !element ) {
			throw new Error( "Tablesaw requires an element." );
		}

		this.table = element;
		this.$table = $( element );

		this.mode = this.$table.attr( "data-tablesaw-mode" ) || defaultMode;

		this.init();
	};

	Table.prototype.init = function() {
		// assign an id if there is none
		if ( !this.$table.attr( "id" ) ) {
			this.$table.attr( "id", pluginName + "-" + Math.round( Math.random() * 10000 ) );
		}

		this.createToolbar();

		// TODO this is used inside stack table init for some reason? what does it do?
		this._initCells();

		this.$table.trigger( events.create, [ this ] );
	};

	Table.prototype._getPrimaryHeaders = function() {
		return this.$table.find( "thead" ).children().filter( "tr" ).eq( 0 ).find( "th" );
	};

	Table.prototype._findHeadersForCell = function( cell ) {
		var $headers = this._getPrimaryHeaders();
		var results = [];

		for( var rowNumber = 1; rowNumber < this.headerMapping.length; rowNumber++ ) {
			for( var colNumber = 0; colNumber < this.headerMapping[ rowNumber ].length; colNumber++ ) {
				if( this.headerMapping[ rowNumber ][ colNumber ] === cell ) {
					results.push( $headers[ colNumber ] );
				}
			}
		}
		return results;
	};

	Table.prototype._initCells = function() {
		var colstart = 0;
		var $rows = this.$table.find( "tr" );
		var columnLookup = [];

		$rows.each(function( rowNumber ) {
			columnLookup[ rowNumber ] = [];
		});

		$rows.each(function( rowNumber ) {
			var coltally = 0;
			var $t = $( this );
			var children = $t.children();
			// var isInHeader = $t.closest( "thead" ).length;

			children.each(function() {
				var colspan = parseInt( this.getAttribute( "colspan" ), 10 );
				var rowspan = parseInt( this.getAttribute( "rowspan" ), 10 );

				// set in a previous rowspan
				while( columnLookup[ rowNumber ][ coltally ] ) {
					coltally++;
				}

				columnLookup[ rowNumber ][ coltally ] = this;
				colstart = coltally + 1;

				// TODO both colspan and rowspan
				if( colspan ) {
					for( var k = 0; k < colspan - 1; k++ ){
						coltally++;
						columnLookup[ rowNumber ][ coltally ] = this;
					}
				}
				if( rowspan ) {
					for( var j = 1; j < rowspan; j++ ){
						columnLookup[ rowNumber + j ][ coltally ] = this;
					}
				}

				coltally++;
			});
		});

		for( var colNumber = 0; colNumber < columnLookup[ 0 ].length; colNumber++ ) {
			var headerCol = columnLookup[ 0 ][ colNumber ];
			var rowNumber = 0;
			var rowCell;

			if( !headerCol.cells ) {
				headerCol.cells = [];
			}

			while( rowNumber < columnLookup.length ) {
				rowCell = columnLookup[ rowNumber ][ colNumber ];

				if( headerCol !== rowCell ) {
					headerCol.cells.push( rowCell );
				}

				rowNumber++;
			}
		}

		this.headerMapping = columnLookup;
	};

	Table.prototype.refresh = function() {
		this._initCells();

		this.$table.trigger( events.refresh );
	};

	Table.prototype.createToolbar = function() {
		// Insert the toolbar
		// TODO move this into a separate component
		var $toolbar = this.$table.prev().filter( '.' + classes.toolbar );
		if( !$toolbar.length ) {
			$toolbar = $( '<div>' )
				.addClass( classes.toolbar )
				.insertBefore( this.$table );
		}
		this.$toolbar = $toolbar;

		if( this.mode ) {
			this.$toolbar.addClass( 'tablesaw-mode-' + this.mode );
		}
	};

	Table.prototype.destroy = function() {
		// Don’t remove the toolbar. Some of the table features are not yet destroy-friendly.
		this.$table.prev().filter( '.' + classes.toolbar ).each(function() {
			this.className = this.className.replace( /\btablesaw-mode\-\w*\b/gi, '' );
		});

		var tableId = this.$table.attr( 'id' );
		$( document ).off( "." + tableId );
		$( window ).off( "." + tableId );

		// other plugins
		this.$table.trigger( events.destroy, [ this ] );

		this.$table.removeData( pluginName );
	};

	// Collection method.
	$.fn[ pluginName ] = function() {
		return this.each( function() {
			var $t = $( this );

			if( $t.data( pluginName ) ){
				return;
			}

			var table = new Table( this );
			$t.data( pluginName, table );
		});
	};

	$( document ).on( "enhance.tablesaw", function( e ) {
		// Cut the mustard
		if( Tablesaw.mustard ) {
			$( e.target ).find( initSelector )[ pluginName ]();
		}
	});

}());

(function(){

	var classes = {
		stackTable: 'tablesaw-stack',
		cellLabels: 'tablesaw-cell-label',
		cellContentLabels: 'tablesaw-cell-content'
	};

	var data = {
		obj: 'tablesaw-stack'
	};

	var attrs = {
		labelless: 'data-tablesaw-no-labels',
		hideempty: 'data-tablesaw-hide-empty'
	};

	var Stack = function( element, tablesaw ) {

		this.tablesaw = tablesaw;
		this.$table = $( element );

		this.labelless = this.$table.is( '[' + attrs.labelless + ']' );
		this.hideempty = this.$table.is( '[' + attrs.hideempty + ']' );

		this.$table.data( data.obj, this );
	};

	// Stack.prototype.init = function( colstart ) {
	Stack.prototype.init = function() {
		this.$table.addClass( classes.stackTable );

		if( this.labelless ) {
			return;
		}

		var self = this;

		this.$table.find( "th, td" ).filter(function() {
			return !$( this ).closest( "thead" ).length;
		}).filter(function() {
			return !$( this ).closest( "tr" ).is( "[" + attrs.labelless + "]" ) &&
				( !self.hideempty || !!$( this ).html() );
		}).each(function() {
			var html = [];
			var $cell = $( this );

			// headers
			$( self.tablesaw._findHeadersForCell( this ) ).each(function() {
				var $t = $( this );
				// TODO decouple from sortable better
				var $sortableButton = $t.find( ".tablesaw-sortable-btn" );
				html.push( $sortableButton.length ? $sortableButton.html() : $t.html() );
			});

			$cell.wrapInner( "<span class='" + classes.cellContentLabels + "'></span>" );
			$cell.prepend( "<b class='" + classes.cellLabels + "'>" + html.join( ", " ) + "</b>"  );
		});
	};

	Stack.prototype.destroy = function() {
		this.$table.removeClass( classes.stackTable );
		this.$table.find( '.' + classes.cellLabels ).remove();
		this.$table.find( '.' + classes.cellContentLabels ).each(function() {
			$( this ).replaceWith( this.childNodes );
		});
	};

	// on tablecreate, init
	$( document ).on( "tablesawcreate", function( e, tablesaw ){
		if( tablesaw.mode === 'stack' ){
			var table = new Stack( tablesaw.table, tablesaw );
			table.init();
		}
	});

	$( document ).on( "tablesawdestroy", function( e, tablesaw ){
		if( tablesaw.mode === 'stack' ){
			$( tablesaw.table ).data( data.obj ).destroy();
		}
	});

}());
}));
