(function( $, undefined ) {	
	$( document ).on( "mobileinit", function(){
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
				globalNav: false
			},
			_create: function(){
				this._super();
				if ( this.options.globalNav ){
					this._globalnav();
				}
			},
			_globalnav: function(){
				var base = $( "base" ).attr( "href" ).split('demos')[0],
					base = base.split('index.html')[0] + this.options.globalNav + "/";
					
				this.element.find( "a" ).each(function() {
					var href = base + $( this ).attr( "href" );
					$( this ).attr( "href", href );
				});
			}
		});
	});
})( jQuery );
