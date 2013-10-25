// Turn off AJAX for local file browsing
if ( location.protocol.substr(0,4)  === 'file' ||
     location.protocol.substr(0,11) === '*-extension' ||
     location.protocol.substr(0,6)  === 'widget' ) {

	// Start with links with only the trailing slash and that aren't external links
	var fixLinks = function() {
		$( "a[href$='/'], a[href='.'], a[href='..']" ).not( "[rel='external']" ).each( function() {
			if( !$( this ).attr( "href" ).match("http") ){
				this.href = $( this ).attr( "href" ).replace( /\/$/, "" ) + "/index.html";
			}
		});
	};

	// Fix the links for the initial page
	$( fixLinks );

	// Fix the links for subsequent ajax page loads
	$( document ).on( 'pagecreate', fixLinks );

	// Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
	$.ajax({
		url: '.',
		async: false,
		isLocal: true
	}).error(function() {
		// Ajax doesn't work so turn it off
		$( document ).on( "mobileinit", function() {
			$.mobile.ajaxEnabled = false;
			
			var message = $( '<div>' , {
				'class': "jqm-content jqm-fullwidth ui-bar-f",
				style: "border:none; padding: 10px 15px; overflow: auto;",
				'data-ajax-warning': true
			});
			
			message
			.append( "<h3 style='margin:0 0 .3em; padding:0; font-size:1em; font-weight: bold; color:#fff;'>Note: Navigation may not work if viewed locally</h3>" )
			.append( "<p style='margin:0; font-size:.9em; color:#fff;'>The AJAX-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, try a different browser or <a href='https://github.com/jquery/jquery-mobile/wiki/Downloadable-Docs-Help' style='color:white'>view help</a>.</p>" );
			
			$( document ).on( "pagecreate", function( event ) {
				$( event.target ).append( message );
			});
		});
	});
}


// display the version of jQM
$( document ).on( "pageinit", function() {
	var version = $.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = words[1] || "",
		text = ver;

	if ( str.indexOf( "rc" ) == -1 ) {
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace( ".", "" );
	}

	if ( $.mobile.version && str ) {
		text += " " + str;
	}

	$( ".jqm-version" ).html( "Version " + text );
	$( ".jqm-version-number" ).html( text );
});


$( document ).on( "pageinit", ".jqm-demos", function() {
	var page = $( this );

	// global navmenu panel
	$( ".jqm-navmenu-link" ).on( "click", function() {
		page.find( ".jqm-navmenu-panel" ).panel( "open" );
	});

	// global search
	$( this ).find( ".jqm-search ul.jqm-list" ).listview({
		globalNav: "demos",
		inset: true,
		theme: "d",
		dividerTheme: "d",
		icon: false,
		filter: true,
		filterReveal: true,
		filterPlaceholder: "Search...",
		autodividers: true,
		autodividersSelector: function ( li ) {
    		return "";
  		},
  		arrowKeyNav: true,
  		enterToNav: true,
  		highlight: true,
  		submitTo: "search-results.php"
	});
	
	$( this ).find( ".jqm-header .jqm-search-link" ).on( "click", function() {
		$( this ).parent( ".jqm-header" ).toggleClass( "jqm-search-toggle" );
		
		var type = $( this ).parent( ".jqm-header" ).hasClass( "jqm-search-toggle" ) ? "searchshow" : "searchhide";
		
		$( this ).parent( ".jqm-header" ).find( ".jqm-search" ).trigger( type );
	});
	
	$( this ).find( ".jqm-header .jqm-search" )
		.on( "searchshow searchhide", function( event ) {
			if ( event.type === "searchshow" ) {
				$( this ).find( ".ui-input-text" ).focus();
			} else {
				$( this )
					.find( ".ui-input-clear" ).trigger( "click" )
					.end()
					.find( ".ui-input-text" ).blur();
			}
		});
		
	$( this ).on( "pagehide", function() {
		$( this ).find( ".jqm-search .ui-input-clear" ).trigger( "click" );
	});

	$( this ).find( ".jqm-content ul.jqm-list " ).listview({
		globalNav: "demos",
		inset: true,
		theme: "d",
		dividerTheme: "d",
		icon: false,
		filter: true,
		filterReveal: true,
		filterPlaceholder: "Search...",
  		arrowKeyNav: true,
  		enterToNav: true,
  		highlight: true
	});

	$( this ).find( ".jqm-search-results-list li, .jqm-search li" ).each(function() {
		var text = $( this ).attr( "data-filtertext" );
		$( this ).find( "a" ).append( "<span class='jqm-search-results-keywords ui-li-desc'><span class='jqm-keyword-hash'>//</span> " + text + "</span>" );
	});
});

$( document ).on( "pageshow",  ".jqm-demos", function() {
	$( this ).find( ".jqm-search input" ).attr( "autocomplete", "off" ).attr( "autocorrect", "off" );
});

$( document ).on( "pageshow", ".jqm-demos-search-results", function() {
	var search = $.mobile.path.parseUrl( window.location.href ).search.split( "=" )[1], self = this;
	setTimeout(function() {
		e = $.Event( "keyup" );
		e.which = 65;
		$( self ).find( ".jqm-content .jqm-search-results-wrap input" ).val( search ).trigger(e).trigger( "change" );
	}, 0 );
});

jQuery.fn.highlight = function( pat ) {
	function innerHighlight( node, pat ) {
		var skip = 0;
		if ( node.nodeType == 3 ) {
			var pos = node.data.toUpperCase().indexOf( pat );
			if ( pos >= 0 ) {
				var spannode = document.createElement( "span" );
				spannode.className = "jqm-search-results-highlight";
				var middlebit = node.splitText( pos );
				var endbit = middlebit.splitText( pat.length );
				var middleclone = middlebit.cloneNode( true );
				spannode.appendChild( middleclone );
				middlebit.parentNode.replaceChild( spannode, middlebit );
				skip = 1;
			}
		} else if ( node.nodeType == 1 && node.childNodes && !/(script|style)/i.test( node.tagName ) ) {
			for ( var i = 0; i < node.childNodes.length; ++i ) {
				i += innerHighlight( node.childNodes[i], pat );
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each(function() {
		innerHighlight( this, pat.toUpperCase() );
	}) : this;
};

jQuery.fn.removeHighlight = function() {
	return this.find( "span.jqm-search-results-highlight" ).each(function() {
		this.parentNode.firstChild.nodeName;
		with ( this.parentNode ) {
			replaceChild( this.firstChild, this );
			normalize();
		}
	}).end();
};

$( document ).on( "mobileinit", function() {
	(function( $, undefined ) {

	$.widget( "mobile.listview", $.mobile.listview, {
		options: {
			theme: null,
			countTheme: "c",
			headerTheme: "b",
			dividerTheme: "b",
			icon: "arrow-r",
			splitIcon: "arrow-r",
			splitTheme: "b",
			corners: true,
			shadow: true,
			inset: false,
			initSelector: ":jqmData(role='listview')",
			arrowKeyNav: false,
			enterToNav: false,
			highlight: false,
			submitTo: false
		},
		_create: function() {
			this._super();
			
			if ( this.options.arrowKeyNav ) {
				this._on( document, { "pageshow": "arrowKeyNav" });
			}
			
			if ( this.options.enterToNav ) {
				this._on( document, { "pageshow": "enterToNav" });
			}
			
		},
		submitTo: function() {
			var form = this.element.parent().find( "form" );
			
			form.attr( "method", "get" )
				.attr( "action", this.options.submitTo );
				
			var base = $( "base" ).attr( "href" ).split( "demos" )[0];
				base = base.split( "index.html" )[0] + "demos" + "/";
				url = base + this.options.submitTo + "?search=" + this.element.parent().find( "input" ).val();
			
			$.mobile.changePage( url ); 
		},
		enterToNav: function() {
			var form = this.element.parent().find( "form" );
			
			form.append( "<button type='submit' data-icon='arrow-r' data-inline='true' class='ui-hidden-accessible' data-iconpos='notext'>Submit</button>" )
				.parent()
				.trigger( "create" );
			
			this.element.parent().find( "form" ).children( ".ui-btn" ).addClass( "ui-hidden-accessible" );
			
			this._on( form, {
				"submit": "submitHandler"
			});
		},
		enhanced: false,
		arrowKeyNav: function() {
			var input = this.element.parent().find( "input" );
			
			if ( !this.enhanced ) {
				this._on( input, {
					"keyup": "handleKeyUp"
				});
				
				this.enhanced = true;
			}
		},
		handleKeyUp: function( e ) {
			var input = this.element.parent().find( "input" );
			
			if ( e.which === $.mobile.keyCode.DOWN ) {
				if ( this.element.find( "li.ui-btn-active" ).length == 0 ) {
					this.element.find( "li:first" ).toggleClass( "ui-btn-active" );
				} else {
					this.element.find( "li.ui-btn-active" ).toggleClass( "ui-btn-active" ).next().toggleClass( "ui-btn-active" );
				}
				
				this.highlightDown();
			} else if ( e.which === $.mobile.keyCode.UP ) {
				if ( this.element.find( "li.ui-btn-active" ).length !== 0 ) {
					this.element.find( "li.ui-btn-active" ).toggleClass( "ui-btn-active" ).prev().toggleClass( "ui-btn-active" );
					
					this.highlightUp()
				} else {
					this.element.find( "li:last" ).toggleClass( "ui-btn-up-d" ).toggleClass( "ui-btn-active" );
				}
			} else if ( typeof e.which !== "undefined" ) {
				this.element.find( "li.ui-btn-active" ).removeClass( "ui-btn-active" );
				
				if ( this.options.highlight ) {
					var search = input.val();
					
					this.element.find( "li" ).each(function() {
						$( this ).removeHighlight();
						$( this ).highlight( search );
					});
				}
			}
		},
		submitHandler: function() {
			if ( this.element.find( "li.ui-btn-active" ).length !== 0 ) {
				var href = this.element.find( "li.ui-btn-active a" ).attr( "href" );
				
				$.mobile.changePage( href );
				return false;
			}
			
			if ( this.options.submitTo ) {
				this.submitTo();
			}
		},
		highlightDown: function() {
			if ( this.element.find( "li.ui-btn-active" ).hasClass( "ui-screen-hidden" ) ) {
				this.element.find( "li.ui-btn-active" ).toggleClass( "ui-btn-active" ).next().toggleClass( "ui-btn-active" );
				
				this.highlightDown();
			}
			return;
		},
		highlightUp: function() {
			if ( this.element.find( "li.ui-btn-active" ).hasClass( "ui-screen-hidden" ) ) {
				this.element.find( "li.ui-btn-active" ).toggleClass( "ui-btn-active" ).prev().toggleClass( "ui-btn-active" );
				
				this.highlightUp();
			}
			return;
		}
	});
})( jQuery );

});
