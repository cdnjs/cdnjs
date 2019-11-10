;(function( $ ){
	$.fn.keyend = function( fn ){
		return this[ fn ? "bind" : "trigger" ]( "keyend", fn );
	};
	var keyend = $.event.special.keyend = {
		delay: 400,
		setup: function( data ){
			$( this ).bind("keypress",{ delay: data.delay }, keyend.handler );
		},
		teardown: function(){
			$( this ).unbind("keypress", keyend.handler );
		},
		handler: function( event ){
			clearTimeout( event.data.timer );
			event.data.timer = setTimeout(function(){
				$( event.currentTarget ).keyend();
			}, event.data.delay || keyend.delay );
		}
	};
})( jQuery );