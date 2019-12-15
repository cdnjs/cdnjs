/*! Tablesaw - v0.1.0 - 2013-12-13
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2013 Zach Leatherman; Licensed MIT */
;(function( $ ) {
	var TS = {
		regex: {
			dir: /tablesaw(\.min)?\.js/i
		}
	};

	TS.dir = (function() {
		var dir;

		$( 'script' ).each(function() {
			var attr = $( this ).attr( 'data-dist-dir' );
			if( attr ) {
				dir = attr;
				return false;
			} else if ( this.src && this.src.match( TS.regex.dir ) ) {
				dir = this.src.replace( TS.regex.dir, '' );
				return false;
			}
		});

		return dir;
	})();

	window.TableSaw = TS;

	// Cut the mustard
	if( !( 'querySelector' in document ) || ( window.blackberry && window.WebKitPoint ) || window.operamini ) {
		return;
	} else {
		$( document.documentElement ).addClass( 'enhanced' );

		// DOM-ready auto-init of plugins.
		// Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
		$( function(){
			$( document ).trigger( "enhance.tablesaw" );
		});
	}

})( jQuery );
;(function( $ ) {

	// grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license.
	function grunticon( css ) {
		// expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
		if( !css || css.length !== 3 ){
			return;
		}

		// Thanks Modernizr & Erik Dahlstrom
		var w = window,
			svg = !!w.document.createElementNS && !!w.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),

			loadCSS = function( data ){
				var link = w.document.createElement( "link" ),
					ref = w.document.getElementsByTagName( "script" )[ 0 ];

				link.rel = "stylesheet";
				link.href = css[ data && svg ? 0 : data ? 1 : 2 ];
				ref.parentNode.insertBefore( link, ref );
			},

			// Thanks Modernizr
			img = new w.Image();

		img.onerror = function(){
			loadCSS( false );
		};

		img.onload = function(){
			loadCSS( img.width === 1 && img.height === 1 );
		};

		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	}

	$(function() {
			grunticon( [ TableSaw.dir + "icons/icons.data.svg.css",
				TableSaw.dir + "icons/icons.data.png.css",
				TableSaw.dir + "icons/icons.fallback.css" ] );
	});

})( jQuery );
(function( $ ) {
	var o = {
		pluginName : "table",
		classes : {
			reflowTable: "ui-table-reflow",
			cellLabels: "ui-table-cell-label",
			popup: "ui-table-columntoggle-popup",
			columnBtnContain: "ui-table-columntoggle-btnwrap table-advance",
			columnBtn: "ui-table-columntoggle-btn ui-table-nav-btn",
			priorityPrefix: "ui-table-priority-",
			columnToggleTable: "ui-table-columntoggle",
			collapsibleCell: "ui-table-cell-collapsible",
			collapsibleRow: "ui-table-row-collapsible",
			dialogClass: "",
			toolbar: "ui-table-bar"
		},
		events: {
			create: "tablecreate",
			destroy: "tabledestroy"
		},
		columnBtnText: "Columns",
		mode: "reflow",
		initSelector : "table",
		columnBtnSide: "right"
	},
	methods = {
		_create: function() {
			var self = this,
				$table = $(this);

			if( $(this).is( "[data-exclude]" ) ) {
				return;
			}

			// override the mode if defined (this could be broader if needed)
			if( $(this).is( "[data-mode]" ) ){
				o.mode = $(this).attr( "data-mode" );
			}

			if( $table.is( "[data-column-btn-side]" ) ){
				o.columnBtnSide = $table.attr( "data-column-btn-side" );
			}

			if( $table.is( "[data-dialog-class]" ) ){
				o.classes.dialogClass = $table.attr( "data-dialog-class" );
			}

			var thrs = this.querySelectorAll( "thead tr" ),
				trs = this.querySelectorAll( "tbody tr" );

			// Insert the toolbar
			var $toolbar = $table.prev( '.' + o.classes.toolbar );
			if( !$toolbar.length ) {
				$toolbar = $( '<div>' )
					.addClass( o.classes.toolbar )
					.insertBefore( $table );
			}

			if( o.mode ) {
				$toolbar.addClass( 'mode-' + o.mode );
			}

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			this.headers = $table.find( "tr:first > th" );
			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			this.allHeaders = this.querySelectorAll( "th" );

			$( thrs ).each( function(){
				var coltally = 0;

				$( this ).children().each( function(){
					var span = parseInt( this.getAttribute( "colspan" ), 10 ),
						sel = ":nth-child(" + ( coltally + 1 ) + ")";

					self.colstart = coltally + 1;

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

			$( trs ).each( function(){
				var row = $( this );
				if( row.is( "[data-collapsible-row]" ) ){

					row.addClass( o.classes.collapsibleRow );
					row.on( "click" , _handleCollapse );

					row.children().each( function(){
						var cell = $( this );
						if( cell.is( "[data-collapsible-cell]" ) ){
							cell.addClass( o.classes.collapsibleCell );
						}
					});
				}
			});

			if( o.mode === "reflow" ){
				$table[ o.pluginName ]( "reflow", self );
			}
			else if ( o.mode === "columntoggle" ){
				$table[ o.pluginName ]( "columntoggle", self );
			}
			$table.trigger( o.events.create, [ o.mode ] );
		},

		destroy: function() {
			var $t = $( this );
			$t.removeAttr( 'data-mode' );

			// reflow
			$t.removeClass( o.classes.reflowTable );
			$t.find( '.' + o.classes.cellLabels ).remove();

			// columntoggle
			$t.removeClass( o.classes.columnToggleTable );
			$t.find( 'th, td' ).each(function() {
				var $cell = $( this );
				$cell.removeClass( 'ui-table-cell-hidden' )
					.removeClass( 'ui-table-cell-visible' );

				this.className = this.className.replace( /\bui\-table\-priority\-\d\b/g, '' );
			});

			// Don’t remove the toolbar. Some of the table features are not yet destroy-friendly.
			$t.prev( '.' + o.classes.toolbar ).each(function() {
				this.className = this.className.replace( /\bmode\-\w*\b/gi, '' );
			});

			$( window ).off( 'resize.' + $t.attr( 'id' ) );

			// other plugins
			$t.trigger( o.events.destroy );

			$t.removeData( o.pluginName + 'active' );
		},

		reflow: function( self ) {
			var table = this,
				setClass = this.getAttribute( "class" ) + " " + o.classes.reflowTable;

			// If it's not reflow mode, return here.
			if( o.mode !== "reflow" ){
				return;
			}

			table.setAttribute( "class", setClass );

			// get headers in reverse order so that top-level headers are appended last

			var reverseHeaders = $( this.allHeaders );

			// create the hide/show toggles
			reverseHeaders.each(function(){
				var $cells = $( this.cells ),
					colstart = self.colstart,
					hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
					text = $(this).text();

				if( text !== ""  ){

					if( hierarchyClass ){
						var iteration = parseInt( $( this ).attr( "colspan" ), 10 ),
							filter = "";

						if( iteration ){
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}
						$cells.filter( filter ).prepend( "<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
					}
					else {
						$cells.prepend( "<b class='" + o.classes.cellLabels + "'>" + text + "</b>"  );
					}
				}
			});
		},

		columntoggle: function(){


			var tableId,
				id,
				$menuButton,
				$popup,
				$menu,
				$btnContain,
				$table = $( this ),
				self = this,
				menuInputChange = function(e) {
					var checked = e.target.checked;

					$( e.target ).data( "cells" )
						.toggleClass( "ui-table-cell-hidden", !checked )
						.toggleClass( "ui-table-cell-visible", checked );

					$table.trigger( 'tablecolumns' );
				};

			// assign an id if there is none
			if ( !$table.attr( "id" ) ) {
				$table.attr( "id", o.pluginName + "-" + Math.round( Math.random() * 10000 ) );
			}

			$table.addClass( o.classes.columnToggleTable );

			tableId = $table.attr( "id" );
			id = tableId + "-popup";
			$btnContain = $( "<div class='" + o.classes.columnBtnContain + " " + o.columnBtnSide + " " + o.classes.dialogClass + "'></div>" );
			$menuButton = $( "<a href='#" + id + "' class='btn btn-micro " + o.classes.columnBtn +"' data-popup-link>" +
											"<span>" + o.columnBtnText + "</span></a>" );
			$popup = $( "<div class='dialog-table-coltoggle " + o.classes.popup + "' id='" + id + "'></div>" );
			$menu = $( "<div class='btn-group'></div>" );

			$(this.headers).not( "td" ).each( function() {
				var $this = $( this ),
					priority = $this.attr("data-priority"),
					$cells = $this.add( this.cells );

				if( priority && priority !== "persist" ) {
					$cells.addClass( o.classes.priorityPrefix + priority );

					$("<label class='btn btn-check btn-checkbox btn-selected theme-simple'><input type='checkbox' checked>" + $this.text() + "</label>" )
						.appendTo( $menu )
						.trigger('enhance')
						.children( 0 )
						.data( "cells", $cells );
				}
			});

			$menu.find( '.btn' ).btn();
			$menu.appendTo( $popup );

			// bind change event listeners to inputs - TODO: move to a private method?
			$menu.on( "change", menuInputChange );

			$menuButton.appendTo( $btnContain );

			$btnContain.appendTo( $table.prev( '.' + o.classes.toolbar ) );

			$popup
				.appendTo( $btnContain )
				.dialog( true );


			// refresh method

			$(window).on( "resize." + tableId, function(){
				$table[ o.pluginName ]( "refreshToggle", self );
			} );

			$.extend( this, {
				_menu: $menu,
				_menuInputChange: menuInputChange
			});

			$(this)[ o.pluginName ]( "refreshToggle", self );
		},

		refreshPriority: function(){
			$(this.headers).not( "td" ).each( function() {
				var $this = $( this ),
					priority = $this.attr("data-priority"),
					$cells = $this.add( this.cells );

				if( priority && priority !== "persist" ) {
					$cells.addClass( o.classes.priorityPrefix + priority );
				} else {
					$cells.each(function() {
						// remove all priority classes.
						this.className = this.className.replace( /\bui\-table\-priority\-\d\b/g, '' );
					});
				}
			});
		},

		refreshToggle: function(){
			this._menu.find( "input" ).each( function() {
				var $this = $( this );

				this.checked = $this.data( "cells" ).eq( 0 ).css( "display" ) === "table-cell";

				$this.parent()[ this.checked ? "addClass" : "removeClass" ]( "btn-selected" );
			});
		}

	},
	_handleCollapse = function(){
		var row = $( this );
		row.toggleClass( "open" );
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

(function( $ ) {
	var pluginName = "btn",
		initSelector = "." + pluginName,
		activeClass = "btn-selected",
		methods = {
			_create: function(){
				return $( this ).each(function() {
					$( this )
						.trigger( "beforecreate." + pluginName )
						[ pluginName ]( "_init" )
						.trigger( "create." + pluginName );
				});
			},
			_init: function(){
				var oEl = $( this ),
					disabled = this.disabled !== undefined && this.disabled !== false,
					input = this.getElementsByTagName( "input" )[ 0 ],
					sel = this.getElementsByTagName( "select" )[ 0 ];

				if( input ) {
					$( this )
						.addClass( "btn-" + input.type )
						[ pluginName ]( "_formbtn", input );
				}
				if( sel ) {
					$( this )
						.addClass( "btn-select" )
						[ pluginName ]( "_select", sel );
				}
				if( disabled ) {
					oEl.addClass( "ui-disabled" );
				}
				return oEl;
			},
			_formbtn: function( input ) {
				var active = function( el, input ) {
					if( input.type === "radio" && input.checked ) {
						var group = input.getAttribute( "name" );

						$( "[name='" + group + "']" ).each(function() {
							$( this ).parent().removeClass( activeClass );
						});
						el[ input.checked ? "addClass" : "removeClass" ]( activeClass );
					} else if ( input.type === "checkbox" ) {
						el[ input.checked ? "addClass" : "removeClass" ]( activeClass );
					}
				};

				active( $( this ), input );
				$( this ).bind("click", function() {
					active( $( this ), input );
				});
			},
			_select: function( sel ) {
				var update = function( oEl, sel ) {
					var opts = $( sel ).find( "option" ),
						label, el, children;

					opts.each(function() {
						var opt = this;
						if( opt.selected ) {
							label = document.createTextNode( opt.text );
						}
					});

					children = oEl.childNodes;
					if( opts.length > 0 ){
						for( var i = 0, l = children.length; i < l; i++ ) {
							el = children[ i ];

							if( el && el.nodeType === 3 ) {
								oEl.replaceChild( label, el );
							}
						}
					}
				};

				update( this, sel );
console.log( this );
				$( this ).bind( "change refresh", function( e ) {
console.log( e.type );
					update( this, sel );
				});
			}
		};

	// Collection method.
	$.fn[ pluginName ] = function( arrg, a, b, c ) {
		return this.each(function() {

		// if it's a method
		if( arrg && typeof( arrg ) === "string" ){
			return $.fn[ pluginName ].prototype[ arrg ].call( this, a, b, c );
		}

		// don't re-init
		if( $( this ).data( pluginName + "active" ) ){
			return $( this );
		}

		// otherwise, init

		$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this );
		});
	};

	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	// Kick it off when `enhance` event is fired.
	$( document ).on( "enhance", function( e ) {
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery ));
(function( win, $, undefined ){


	function createSwipeTable( $table ){

		var $btns = $( "<div class='table-advance'></div>" ),
			$prevBtn = $( "<a href='#' class='ui-table-nav-btn btn btn-micro left' title='Previous Column'></a>" ).appendTo( $btns ),
			$nextBtn = $( "<a href='#' class='ui-table-nav-btn btn btn-micro right' title='Next Column'></a>" ).appendTo( $btns ),
			hideBtn = 'disabled',
			persistWidths = 'table-fix-persist',
			$headerCells = $table.find( "thead th" ),
			$headerCellsNoPersist = $headerCells.not( '[data-priority="persist"]' ),
			headerWidths = [],
			$head = $( document.head || 'head' ),
			tableId = $table.attr( 'id' );

		// Calculate initial widths
		$table.css('width', 'auto');
		$headerCells.each(function() {
			headerWidths.push( $( this ).outerWidth() );
		});
		$table.css( 'width', '' );

		$btns.appendTo( $table.prev( '.ui-table-bar' ) );

		$table.addClass( "table-coltoggle-swipe" );

		if( !tableId ) {
			tableId = 'tableswipe-' + Math.round( Math.random() * 10000 );
			$table.attr( 'id', tableId );
		}

		function $getCells( headerCell ) {
			return $( headerCell.cells ).add( headerCell );
		}

		function showColumn( headerCell ) {
			$getCells( headerCell ).removeClass( 'ui-table-cell-hidden' );
		}

		function hideColumn( headerCell ) {
			$getCells( headerCell ).addClass( 'ui-table-cell-hidden' );
		}

		function persistColumn( headerCell ) {
			$getCells( headerCell ).addClass( 'ui-table-cell-persist' );
		}

		function isPersistent( headerCell ) {
			return $( headerCell ).is( '[data-priority="persist"]' );
		}

		function unmaintainWidths() {
			$table.removeClass( persistWidths );
			$( '#' + tableId + '-persist' ).remove();
		}

		function maintainWidths() {
			var prefix = '#' + tableId + ' ',
				styles = [],
				tableWidth = $table.width();

			$headerCells.each(function( index ) {
				var width;
				if( isPersistent( this ) ) {
					width = $( this ).width();

					// Don’t persist greedy columns (take up more than 75% of table width)
					if( width < tableWidth * 0.75 ) {
						styles.push( prefix + ' .ui-table-cell-persist:nth-child(' + ( index + 1 ) + ') { width: ' + width + 'px; }' );
					}
				}
			});

			unmaintainWidths();
			$table.addClass( persistWidths );
			$head.append( $( '<style>' ).attr( 'id', tableId + '-persist' ).html( styles.join( "\n" ) ) );
		}

		function getNext(){
			var next = [],
				checkFound;

			$headerCellsNoPersist.each(function( i ) {
				var $t = $( this ),
					isHidden = $t.css( "display" ) === "none";

				if( !isHidden && !checkFound ) {
					checkFound = true;
					next[ 0 ] = i;
				} else if( isHidden && checkFound && !next[ 1 ] ) {
					next[ 1 ] = i;
				}
			});

			return next;
		}

		function getPrev(){
			var next = getNext();
			return [ next[ 1 ] - 1 , next[ 0 ] - 1 ];
		}

		function nextpair( fwd ){
			return fwd ? getNext() : getPrev();
		}

		function canAdvance( pair ){
			return pair[ 1 ] > -1 && pair[ 1 ] < $headerCellsNoPersist.length;
		}

		function fakeBreakpoints() {
			var extraPaddingPixels = 20,
				containerWidth = $table.parent().width(),
				sum = 0;

			$headerCells.each(function( index ) {
				var $t = $( this ),
					isPersist = $t.is( '[data-priority="persist"]' );
				sum += headerWidths[ index ] + ( isPersist ? 0 : extraPaddingPixels );

				if( isPersist ) {
					// for visual box-shadow
					persistColumn( this );
					return;
				}

				if( sum > containerWidth ) {
					hideColumn( this );
				} else {
					showColumn( this );
				}

			});

			unmaintainWidths();
			$table.trigger( 'tablecolumns' );
		}

		function advance( fwd ){
			var pair = nextpair( fwd );
			if( canAdvance( pair ) ){
				if( isNaN( pair[ 0 ] ) ){
					if( fwd ){
						pair[0] = 0;
					}
					else {
						pair[0] = $headerCellsNoPersist.length - 1;
					}
				}

				maintainWidths();

				hideColumn( $headerCellsNoPersist.get( pair[ 0 ] ) );
				showColumn( $headerCellsNoPersist.get( pair[ 1 ] ) );

				$table.trigger( 'tablecolumns' );
			}
		}

		$prevBtn.add( $nextBtn ).click(function( e ){
			advance( !!$( e.target ).closest( $nextBtn ).length );
			e.preventDefault();
		});

		$table
			.bind( "touchstart.swipetoggle", function( e ){
				var origin = ( e.touches || e.originalEvent.touches )[ 0 ].pageX,
					x,
					drag;

				$table.addClass( "table-noanimate" );

				$( this )
					.bind( "touchmove", function( e ){
						x = ( e.touches || e.originalEvent.touches )[ 0 ].pageX;
						drag = x - origin;
						if( drag < -30 ){
							drag = -30;
						}
						if( drag > 30 ){
							drag = 30;
						}

						//$table.css( { "position": "relative", "left": drag + "px" } );
					})
					.bind( "touchend.swipetoggle", function(){
						if( x - origin < 15 ){
							advance( true );
						}
						if( x - origin > -15 ){
							advance( false );
						}

						$( this ).unbind( "touchmove touchend" );
						$table.removeClass( "table-noanimate" );
						//$table.css( "left", "0" );

					});

			})
			.bind( "tablecolumns.swipetoggle", function(){
				$prevBtn[ canAdvance( getPrev() ) ? "removeClass" : "addClass" ]( hideBtn );
				$nextBtn[ canAdvance( getNext() ) ? "removeClass" : "addClass" ]( hideBtn );
			})
			.bind( "tablenext.swipetoggle", function(){
				advance( true );
			} )
			.bind( "tableprev.swipetoggle", function(){
				advance( false );
			} )
			.bind( "tabledestroy.swipetoggle", function(){
				var $t = $( this );

				$t.removeClass( 'table-coltoggle-swipe' );
				$t.prev( '.ui-table-bar' ).find( '.table-advance' ).remove();
				$( win ).off( "resize", fakeBreakpoints );

				$t.unbind( ".swipetoggle" );
			});

		fakeBreakpoints();
		$( win ).on( "resize", fakeBreakpoints );
	}



	// on tablecreate, init
	$( document ).on( "tablecreate", "table", function( e, mode ){

		var $table = $( this );
		if( mode === 'swipe' ){
			createSwipeTable( $table );
		}

	} );

}( this, jQuery ));

(function( $ ) {
	function getSortValue( cell ) {
		return $.map( cell.childNodes, function( el ) {
				var $el = $( el );
				if( $el.is( 'input, select' ) ) {
					return $el.val();
				} else if( $el.hasClass( 'ui-table-cell-label' ) ) {
					return;
				}
				return $.trim( $el.text() );
			}).join( '' );
	}

	var pluginName = "sortable",
		initSelector = "table[data-" + pluginName + "]",
		sortableSwitchSelector = "[data-" + pluginName + "-switch]",
		classes = {
			head: pluginName + "-head",
			ascend: pluginName + "-ascending",
			descend: pluginName + "-descending",
			enhanced: pluginName + "-enhanced",
			switcher: pluginName + "-switch",
			tableToolbar: 'ui-table-toolbar'
		},
		i18n = {
			sort: 'Sort'
		},
		methods = {
			_create: function( o ){
				return $( this ).each(function() {
					var init = $( this ).data( "init" + pluginName );
					if( init ) {
						return false;
					}
					$( this )
						.data( "init"+ pluginName, true )
						.trigger( "beforecreate." + pluginName )
						.addClass( classes.enhanced )
						[ pluginName ]( "_init" , o )
						.trigger( "create." + pluginName );
				});
			},
			_init: function(){
				var el = $( this ),
					heads,
					$switcher;

				var addClassToTable = function(){
						el.addClass( pluginName );
					},
					addClassToHeads = function( h ){
						$.each( h , function( i , v ){
							$( v ).addClass( classes.head );
						});
					},
					makeHeadsActionable = function( h , fn ){
						$.each( h , function( i , v ){
							var b = $( "<button />" );
							b.bind( "click" , { col: v } , fn );
							$( v ).wrapInner( b );
						});
					},
					clearOthers = function( sibs ){
						$.each( sibs , function( i , v ){
							var col = $( v );
							col.removeAttr( "data-sortable-default-col" );
							col.removeClass( classes.ascend );
							col.removeClass( classes.descend );
						});
					},
					headsOnAction = function( e ){
						if( $( e.target ).is( 'a[href]' ) ) {
							return;
						}

						e.stopPropagation();
						var head = $( this ).parent(),
							v = e.data.col;
						clearOthers( head.siblings() );
						if( head.hasClass( classes.descend ) ){
							el[ pluginName ]( "sortBy" , v , true);
						} else {
							el[ pluginName ]( "sortBy" , v );
						}
						if( $switcher ) {
							$switcher.find( 'select' ).val( heads.index( head ) ).trigger( 'refresh' );
						}

						e.preventDefault();
					},
					handleDefault = function( heads ){
						$.each( heads , function( idx , el ){
							var $el = $( el );
							if( $el.is( "[data-sortable-default-col]" ) ){
								if( !$el.hasClass( classes.descend ) ) {
									$el.addClass( classes.ascend );
								}
							}
						});
					},
					addSwitcher = function( heads ){
						$switcher = $( '<div>' ).addClass( classes.switcher ).addClass( classes.tableToolbar ).html(function() {
							var html = [ '<label>' + i18n.sort + ':' ];

							html.push( '<span class="btn btn-small">&#160;<select>' );
							heads.each(function( j ) {
								var $t = $( this ),
									isDefaultCol = $t.is( '[data-sortable-default-col]' ),
									isDescending = $t.hasClass( classes.descend ),
									isNumeric = false;

								// Check only the first three rows to see if the column is numbers.
								$( this.cells ).slice( 0, 3 ).each(function() {
									if( !isNaN( parseInt( getSortValue( this ), 10 ) ) ) {
										isNumeric = true;
										return false;
									}
								});

								html.push( '<option' + ( isDefaultCol && !isDescending ? ' selected' : '' ) + ' value="' + j + '_asc">' + $t.text() + ' ' + ( isNumeric ? '↑' : '(A-Z)' ) + '</option>' );
								html.push( '<option' + ( isDefaultCol && isDescending ? ' selected' : '' ) + ' value="' + j + '_desc">' + $t.text() + ' ' + ( isNumeric ? '↓' : '(Z-A)' ) + '</option>' );
							});
							html.push( '</select></span></label>' );

							return html.join('');
						});

						var $toolbar = el.prev( '.ui-table-bar' ),
							$firstChild = $toolbar.children().eq( 0 );

						if( $firstChild.length ) {
							$switcher.insertBefore( $firstChild );
						} else {
							$switcher.appendTo( $toolbar );
						}
						$switcher.find( '.btn' ).btn();
						$switcher.find( 'select' ).on( 'change', function() {
							var val = $( this ).val().split( '_' ),
								head = heads.eq( val[ 0 ] );

							clearOthers( head.siblings() );
							el.sortable( 'sortBy', head.get( 0 ), val[ 1 ] === 'asc' );
						});
					};

					addClassToTable();
					heads = el.find( "thead th[data-" + pluginName + "-col]" );
					addClassToHeads( heads );
					makeHeadsActionable( heads , headsOnAction );
					handleDefault( heads );

					if( el.is( sortableSwitchSelector ) ) {
						addSwitcher( heads, el.find('tbody tr:nth-child(-n+3)') );
					}
			},
			getColumnNumber: function( col ){
				return $( col ).prevAll().length;
			},
			getTableRows: function(){
				return $( this ).find( "tbody tr" );
			},
			sortRows: function( rows , colNum , ascending ){
				var cells, fn, sorted;
				var getCells = function( rows ){
						var cells = [];
						$.each( rows , function( i , r ){
							cells.push({
								cell: getSortValue( r.childNodes[ 2*colNum + 1 ] ),
								rowNum: i
							});
						});
						return cells;
					},
					getSortFxn = function( ascending ){
						var fn;
						if( ascending ){
							fn = function( a , b ){
								if( parseInt( a.cell , 10 )){
									return parseInt( a.cell , 10 ) - parseInt( b.cell, 10 );
								} else {
									return a.cell > b.cell ? 1 : -1;
								}
							};
						} else {
							fn = function( a , b ){
								if( parseInt( a.cell , 10 )){
									return parseInt( b.cell , 10 ) - parseInt( a.cell, 10 );
								} else {
									return a.cell < b.cell ? 1 : -1;
								}
							};
						}
						return fn;
					},
					applyToRows = function( sorted , rows ){
						var newRows = [], i, l, cur;
						for( i = 0, l = sorted.length ; i < l ; i++ ){
							cur = sorted[ i ].rowNum;
							newRows.push( rows[cur] );
						}
						return newRows;
					};

				cells = getCells( rows );
				fn = getSortFxn( ascending );
				sorted = cells.sort( fn );
				rows = applyToRows( sorted , rows );
				return rows;
			},
			replaceTableRows: function( rows ){
				var el = $( this ),
					body = el.find( "tbody" );
				body.html( rows );
			},
			makeColDefault: function( col , a ){
				var c = $( col );
				c.attr( "data-sortable-default-col" , "true" );
				if( a ){
					c.removeClass( classes.descend );
					c.addClass( classes.ascend );
				} else {
					c.removeClass( classes.ascend );
					c.addClass( classes.descend );
				}
			},
			notify: function(){
				//TODO
			},
			sortBy: function( col , ascending ){
				var el = $( this ), colNum, rows;

				colNum = el[ pluginName ]( "getColumnNumber" , col );
				rows = el[ pluginName ]( "getTableRows" );
				rows = el[ pluginName ]( "sortRows" , rows , colNum , ascending );
				el[ pluginName ]( "replaceTableRows" , rows );
				el[ pluginName ]( "makeColDefault" , col , ascending );
				el[ pluginName ]( "notify" );
			}
		};

	// Collection method.
	$.fn[ pluginName ] = function( arrg ) {
		var args = Array.prototype.slice.call( arguments , 1),
			returnVal;

		// if it's a method
		if( arrg && typeof( arrg ) === "string" ){
			returnVal = $.fn[ pluginName ].prototype[ arrg ].apply( this[0], args );
			return (typeof returnVal !== "undefined")? returnVal:$(this);
		}
		// check init
		if( !$( this ).data( pluginName + "data" ) ){
			$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this , arrg );
		}
		return $(this);
	};
	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	$( document ).on( "tablecreate", "table", function() {
		if( $( this ).is( initSelector ) ) {
			$( this )[ pluginName ]();
		}
	});

}( jQuery ));

(function( win, $, undefined ){

	var MM = {
		attr: {
			init: 'data-minimap'
		}
	};

	function createMiniMap( $table ){

		var $btns = $( '<div class="table-advance minimap">' ),
			$dotNav = $( '<ul class="table-advance-dots">' ).appendTo( $btns ),
			hideDot = 'table-advance-dots-hide',
			$headerCells = $table.find( 'thead th' );

		// populate dots
		$headerCells.each(function(){
			$dotNav.append( '<li><i></i></li>' );
		});

		$btns.appendTo( $table.prev( '.ui-table-bar' ) );

		function showMinimap( $table ) {
			var mq = $table.attr( MM.attr.init );
			return !mq || win.matchMedia && win.matchMedia( mq ).matches;
		}

		function showHideNav(){
			if( !showMinimap( $table ) ) {
				$btns.hide();
				return;
			}
			$btns.show();

			// show/hide dots
			var dots = $dotNav.find( "li" ).removeClass( hideDot );
			$table.find( "thead th" ).each(function(i){
				if( $( this ).css( "display" ) === "none" ){
					dots.eq( i ).addClass( hideDot );
				}
			});
		}

		// run on init and resize
		showHideNav();
		$( win ).on( "resize", showHideNav );


		$table
			.bind( "tablecolumns.minimap", function(){
				showHideNav();
			})
			.bind( "tabledestroy.minimap", function(){
				var $t = $( this );

				$t.prev( '.ui-table-bar' ).find( '.table-advance' ).remove();
				$( win ).off( "resize", showHideNav );

				$t.unbind( ".minimap" );
			});
	}



	// on tablecreate, init
	$( document ).on( "tablecreate", "table", function( e, mode ){

		var $table = $( this );
		if( ( mode === 'swipe' || mode === 'columntoggle' ) && $table.is( '[ ' + MM.attr.init + ']' ) ){
			createMiniMap( $table );
		}

	} );

}( this, jQuery ));

;(function( win, $ ) {

	var S = {
		selectors: {
			init: 'table[data-mode-switch]'
		},
		attributes: {
			excludeMode: 'data-mode-exclude'
		},
		classes: {
			main: 'ui-table-modeswitch',
			toolbar: 'ui-table-toolbar'
		},
		modes: [ 'reflow', 'swipe', 'columntoggle' ],
		i18n: {
			modes: [ 'Stack', 'Swipe', 'Toggle' ],
			columns: 'Col<span class="a11y-sm">umn</span>s'
		},
		init: function( table ) {
			var $table = $( table ),
				ignoreMode = $table.attr( S.attributes.excludeMode ),
				$toolbar = $table.prev( '.ui-table-bar' ),
				modeVal = '',
				$switcher = $( '<div>' ).addClass( S.classes.main + ' ' + S.classes.toolbar ).html(function() {
					var html = [ '<label>' + S.i18n.columns + ':' ],
						dataMode = $table.attr( 'data-mode' ),
						isSelected;

					html.push( '<span class="btn btn-small">&#160;<select>' );
					for( var j=0, k = S.modes.length; j<k; j++ ) {
						if( ignoreMode && ignoreMode.toLowerCase() === S.modes[ j ] ) {
							continue;
						}

						isSelected = dataMode === S.modes[ j ];

						if( isSelected ) {
							modeVal = S.modes[ j ];
						}

						html.push( '<option' +
							( isSelected ? ' selected' : '' ) +
							' value="' + S.modes[ j ] + '">' + S.i18n.modes[ j ] + '</option>' );
					}
					html.push( '</select></span></label>' );

					return html.join('');
				});

			var $otherToolbarItems = $toolbar.find( '.table-advance' ).eq( 0 );
			if( $otherToolbarItems.length ) {
				$switcher.insertBefore( $otherToolbarItems );
			} else {
				$switcher.appendTo( $toolbar );
			}

			$switcher.find( '.btn' ).btn();
			$switcher.find( 'select' ).bind( 'change', S.onModeChange );
		},
		onModeChange: function() {
			var $t = $( this ),
				$switcher = $t.closest( '.' + S.classes.main ),
				$table = $t.closest( '.ui-table-bar' ).nextUntil( $table ).eq( 0 ),
				val = $t.val();

			$switcher.remove();
			$table.table( 'destroy' );

			$table.attr( 'data-mode', val );
			$table.table();
		}
	};

	$( win.document ).on( "tablecreate", "table", function() {
		if( $( this ).is( S.selectors.init ) ) {
			S.init( this );
		}
	});

})( this, jQuery );