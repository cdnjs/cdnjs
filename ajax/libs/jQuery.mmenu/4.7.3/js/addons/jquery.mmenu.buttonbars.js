/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'buttonbars';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{
			var that = this,
				opts = this.opts[ _ADDON_ ],
				conf = this.conf[ _ADDON_ ];


			//	Refactor buttonbar class
			this.__refactorClass( $('div', $panels), this.conf.classNames[ _ADDON_ ].buttonbar, 'buttonbar' );


			//	Add markup
			$('.' + _c.buttonbar, $panels)
				.each(
					function()
					{
						var $bbar = $(this),
							$btns = $bbar.children().not( 'input' ),
							$inpt = $bbar.children().filter( 'input' );

						$bbar.addClass( _c.buttonbar + '-' + $btns.length );
						
						$inpt
							.each(
								function()
								{
									var $inp = $(this),
										$lbl = $btns.filter( 'label[for="' + $inp.attr( 'id' ) + '"]' );
	
									if ( $lbl.length )
									{
										$inp.insertBefore( $lbl );
									}
								}
							);
					}
				);
		},

		//	_setup: fired once per menu
		_setup: function() {},

		//	_add: fired once per page load
		_add: function()
		{			
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'buttonbar' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		buttonbar: 'Buttonbar'
	};


	var _c, _d, _e, glbl;

})( jQuery );