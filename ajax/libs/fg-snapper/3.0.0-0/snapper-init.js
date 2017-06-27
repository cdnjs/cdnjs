/* snapper css snap points carousel */
;(function( w, $ ){
	// auto-init on enhance
	$( document ).bind( "enhance", function( e ){
		$( ".snapper", e.target ).add( e.target ).filter( ".snapper" ).snapper();
	});
}( this, jQuery ));