$.mobile.document.on( "pageshow", "#demo-page", function() {
	var head = $( ".ui-page-active [data-role='header']" ),
		foot = $( ".ui-page-active [data-role='footer']" ),
		headerheight = head.outerHeight();
		
	$.mobile.window.on( "throttledresize", function() {
		$( "#sorter" ).height( $.mobile.window.height() - headerheight - 20 ).css( "top", headerheight + 18 );
	});
	
	$( "#sorter" ).height( $.mobile.window.height() - headerheight - 20 ).css( "top", headerheight + 18 );
	
	$.mobile.window.scroll( function( e ) {
		var headTop = $(window).scrollTop();
		
		if( headTop < headerheight && headTop > 0 ) {
			$( "#sorter" ).css({
				"top": headerheight + 15 - headTop,
				"height": $.mobile.window.height() - headerheight - 20
			});
		} else if ( headTop >= headerheight && headTop > 0 && parseInt( headTop + $.mobile.window.height( )) < parseInt( foot.offset().top ) ) {
			$( "#sorter" ).css({
				"top": "15px",
				"height": $.mobile.window.height()
			});
			$("#sorter li").height( "3.7%" );
		} else if ( parseInt( headTop + $.mobile.window.height() ) >= parseInt( foot.offset().top ) && parseInt( headTop + $.mobile.window.height() ) <= parseInt( foot.offset().top ) + foot.height() ) {
			$( "#sorter" ).css({
				"top": "15px",
				"height": $.mobile.window.height() - ( parseInt( headTop + $.mobile.window.height() ) - parseInt( foot.offset().top ) + 8 )
			});
		} else if( parseInt( headTop + $.mobile.window.height() ) >= parseInt( foot.offset().top ) ) {
			$( "#sorter" ).css({
				"top": "15px"
			});
		} else {
			$( "#sorter" ).css( "top", headerheight + 15 );
		}
	});

	$( "#sorter li" ).click( function() {
		var top,
			letter = $( this ).text(),
			divider = $( "#sortedList" ).find( "li.ui-li-divider:contains(" + letter + ")" );
			
		if ( divider.length > 0 ) {
			top = divider.offset().top;
			$.mobile.silentScroll( top );
		} else {
			return false;
		}
	});
	
	$( "#sorter li" ).hover(function() {
		$( this ).addClass( "ui-btn-up-b" ).removeClass( "ui-btn-up-c" );
	}, function() {
		$( this ).removeClass( "ui-btn-up-b" ).addClass( "ui-btn-up-c" );
	});
});
