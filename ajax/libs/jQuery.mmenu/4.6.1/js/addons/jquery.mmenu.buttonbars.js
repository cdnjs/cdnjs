/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'buttonbars';


	$[ _PLUGIN_ ].prototype[ '_init_' + _ADDON_ ] = function( $panels )
	{
		if ( !addon_initiated )
		{
			_initAddon();
		}

		var addon_added = this.vars[ _ADDON_ + '_added' ];
		this.vars[ _ADDON_ + '_added' ] = true;

		if ( !addon_added )
		{
			this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
			this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );
		}

		var that = this,
			opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ];


		//	Refactor counter class
		this.__refactorClass( $('div', $panels), this.conf.classNames[ _ADDON_ ].buttonbar, 'buttonbar' );


		//	Add markup
		$('div.' + _c.buttonbar, $panels)
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

	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		buttonbar: 'Buttonbar'
	};


	function extendOptions( o )
	{
		return o;
	}

	function extendConfiguration( c )
	{
		return c;
	}
	
	function _initAddon()
	{
		addon_initiated = true;

		_c = $[ _PLUGIN_ ]._c;
		_d = $[ _PLUGIN_ ]._d;
		_e = $[ _PLUGIN_ ]._e;

		_c.add( 'buttonbar' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );