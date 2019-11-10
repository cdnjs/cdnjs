/*! Tablesaw - v0.1.1 - 2014-03-28
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2014 Filament Group; Licensed MIT */
;(function( $ ) {
	var div = document.createElement('div'),
		all = div.getElementsByTagName('i'),
		$doc = $( document.documentElement );

	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	if( all[ 0 ] ) {
		$doc.addClass( 'ie-lte8' );
	}

	// Cut the mustard
	if( !( 'querySelector' in document ) || ( window.blackberry && !window.WebKitPoint ) || window.operamini ) {
		return;
	} else {
		$doc.addClass( 'tablesaw-enhanced' );

		// DOM-ready auto-init of plugins.
		// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
		$( function(){
			$( document ).trigger( "enhance.tablesaw" );
		});
	}

})( jQuery );
;(function( $ ) {
	var o = {
		pluginName : "table",
		classes : {
			toolbar: "tablesaw-bar"
		},
		events: {
			create: "tablesawcreate",
			destroy: "tablesawdestroy"
		},
		mode: "stack",
		initSelector: "table[data-mode],table[data-sortable]"
	},
	methods = {
		_create: function() {
			var self = this,
				$table = $(this);

			// override the mode if defined (this could be broader if needed)
			if( $(this).is( "[data-mode]" ) ){
				o.mode = $(this).attr( "data-mode" );
			}

			// Insert the toolbar
			// TODO move this into a separate component
			var $toolbar = $table.prev( '.' + o.classes.toolbar );
			if( !$toolbar.length ) {
				$toolbar = $( '<div>' )
					.addClass( o.classes.toolbar )
					.insertBefore( $table );
			}

			if( o.mode ) {
				$toolbar.addClass( 'mode-' + o.mode );
			}

			// Add header cells
			var colstart,
				thrs = this.querySelectorAll( "thead tr" );
			$( thrs ).each( function(){
				var coltally = 0;

				$( this ).children().each( function(){
					var span = parseInt( this.getAttribute( "colspan" ), 10 ),
						sel = ":nth-child(" + ( coltally + 1 ) + ")";

					colstart = coltally + 1;

					if( span ){
						for( var k = 0; k < span - 1; k++ ){
							coltally++;
							sel += ", :nth-child(" + ( coltally + 1 ) + ")";
						}
					}

					// Store "cells" data on header as a reference to all cells in the same column as this TH
					this.cells = $( self ).find("tr").not($( thrs ).eq(0)).not(this).children(sel);
					coltally++;

				});
			});

			$table.trigger( o.events.create, [ o.mode, colstart ] );
		},

		destroy: function() {
			var $t = $( this );
			$t.removeAttr( 'data-mode' );

			// Don’t remove the toolbar. Some of the table features are not yet destroy-friendly.
			$t.prev( '.' + o.classes.toolbar ).each(function() {
				this.className = this.className.replace( /\bmode\-\w*\b/gi, '' );
			});

			$( window ).off( 'resize.' + $t.attr( 'id' ) );

			// other plugins
			$t.trigger( o.events.destroy, [ o.mode ] );

			$t.removeData( o.pluginName + 'active' );
		}
	};

	// Collection method.
	$.fn[ o.pluginName ] = function( arrg, a, b, c ) {
		return this.each(function() {

			// if it's a method
			if( arrg && typeof( arrg ) === "string" ){
				return $.fn[ o.pluginName ].prototype[ arrg ].call( this, a, b, c );
			}

			// don't re-init
			if( $( this ).data( o.pluginName + "active" ) ){
				return $( this );
			}

			// otherwise, init
			$( this ).data( o.pluginName + "active", true );
			$.fn[ o.pluginName ].prototype._create.call( this );
		});
	};

	// add methods
	$.extend( $.fn[ o.pluginName ].prototype, methods );

	$( document ).on( "enhance.tablesaw", function( e ) {
		$( e.target ).find( o.initSelector )[ o.pluginName ]();
	});

}( jQuery ));

;(function( win, $, undefined ){

	var Stack = function( element ) {

		this.$table = $( element );

		this.classes = {
			stackTable: "tablesaw-stack",
			cellLabels: "tablesaw-cell-label"
		};

		// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
		this.allHeaders = this.$table.find( "th" );

		this.$table.data( 'tablesaw-stack', this );
	};

	Stack.prototype.init = function( colstart ) {
		this.$table.addClass( this.classes.stackTable );

		// get headers in reverse order so that top-level headers are appended last

		var reverseHeaders = $( this.allHeaders );

		// create the hide/show toggles
		var self = this;

		reverseHeaders.each(function(){
			var $cells = $( this.cells ),
				hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " tablesaw-cell-label-top",
				text = $(this).text();

			if( text !== ""  ){

				if( hierarchyClass ){
					var iteration = parseInt( $( this ).attr( "colspan" ), 10 ),
						filter = "";

					if( iteration ){
						filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
					}
					$cells.filter( filter ).prepend( "<b class='" + self.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
				}
				else {
					$cells.prepend( "<b class='" + self.classes.cellLabels + "'>" + text + "</b>"  );
				}
			}
		});
	};

	Stack.prototype.destroy = function() {
		this.$table.removeClass( this.classes.stackTable );
		this.$table.find( '.' + this.classes.cellLabels ).remove();
	};

	// on tablecreate, init
	$( document ).on( "tablesawcreate", "table", function( e, mode, colstart ){
		if( mode === 'stack' ){
			var table = new Stack( this );
			table.init( colstart );
		}

	} );

	$( document ).on( "tablesawdestroy", "table", function( e, mode ){

		if( mode === 'stack' ){
			$( this ).data( 'tablesaw-stack' ).destroy();
		}

	} );

}( this, jQuery ));