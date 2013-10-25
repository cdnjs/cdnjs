// popup examples
$( document ).on( "pageinit", function() {

	$( ".photopopup" ).on({
		popupbeforeposition: function() {
			var maxHeight = $( window ).height() - 60 + "px";
			$( ".photopopup img" ).css( "max-height", maxHeight );
		}
	});

	function scale( width, height, padding, border ) {
		var scrWidth = $( window ).width() - 30,
			scrHeight = $( window ).height() - 30,
			ifrPadding = 2 * padding,
			ifrBorder = 2 * border,
			ifrWidth = width + ifrPadding + ifrBorder,
			ifrHeight = height + ifrPadding + ifrBorder,
			h, w;

		if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
			w = ifrWidth;
			h = ifrHeight;
		} else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
			w = scrWidth;
			h = ( scrWidth / ifrWidth ) * ifrHeight;
		} else {
			h = scrHeight;
			w = ( scrHeight / ifrHeight ) * ifrWidth;
		}
		
		return {
			'width': w - ( ifrPadding + ifrBorder ),
			'height': h - ( ifrPadding + ifrBorder )
		};
	};

	$( ".ui-popup iframe" )
		.attr( "width", 0 )
		.attr( "height", "auto" );
	 
	$( "#popupVideo" ).on({
		popupbeforeposition: function() {
			// call our custom function scale() to get the width and height 
			var size = scale( 497, 298, 15, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupVideo iframe" )
				.attr( "width", w )
				.attr( "height", h );
		},
		popupafterclose: function() {
			$( "#popupVideo iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );	
		}
	});

	$( "#popupMap iframe" ).contents().find( "#map_canvas" )
		.css( { "width" : 0, "height" : 0 } );
	 		 
	$( "#popupMap" ).on({
		popupbeforeposition: function() {
			var size = scale( 480, 320, 0, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupMap iframe" )
				.attr( "width", w )
				.attr( "height", h );
					 
			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": w, "height" : h } );
		},
		popupafterclose: function() {
			$( "#popupMap iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );
					 
			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": 0, "height" : 0 } );
		}
	});
      
	$( "#popupPanel" ).on({
		popupbeforeposition: function() {
			var h = $( window ).height();
			
			$( "#popupPanel" )
				.css( "height", h );
		}
	});
		 
	$( "#popupPanel button" ).on( "click", function() {	
		$( "#popupPanel" ).popup('close');
	});

});