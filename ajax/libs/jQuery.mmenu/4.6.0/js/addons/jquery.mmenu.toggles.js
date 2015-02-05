/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'toggles';


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


		//	Refactor toggle classes
		this.__refactorClass( $('input', $panels), this.conf.classNames[ _ADDON_ ].toggle, 'toggle' );
		this.__refactorClass( $('input', $panels), this.conf.classNames[ _ADDON_ ].check, 'check' );

		//	Add markup
		$('input.' + _c.toggle, $panels)
			.add( 'input.' + _c.check, $panels )
			.each(
				function()
				{
					var $inpt = $(this),
						$prnt = $inpt.closest( 'li' ),
						cl = $inpt.hasClass( _c.toggle ) ? 'toggle' : 'check',
						id = $inpt.attr( 'id' ) || that.__getUniqueId();
					
					if ( !$prnt.children( 'label[for="' + id + '"]' ).length )
					{
						$inpt.attr( 'id', id );
						$prnt.prepend( $inpt );

						$('<label for="' + id + '" class="' + _c[ cl ] + '"></label>')
							.insertBefore( $prnt.children( 'a, span' ).last() );
					}
				}
			);
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		toggle	: 'Toggle',
		check	: 'Check'
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

		_c.add( 'toggle check' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );