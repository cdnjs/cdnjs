/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'toggles';

	var _c, _d, _e, glbl,
		addon_initiated = false;


	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{
		if ( !addon_initiated )
		{
			_initAddon();
		}

		this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
		this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );

		var that = this,
			opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ];


		//	Refactor toggle class
		this.__refactorClass( $('input', this.$menu), this.conf.classNames[ _ADDON_ ].toggle, 'toggle' );

		//	Add markup
		$('.' + _c.toggle, this.$menu)
			.each(
				function()
				{
					var $t = $(this),
						$p = $t.parent(),
						id = $t.attr( 'id' ) || that.__getUniqueId();

					$t.attr( 'id', id );
					$p.prepend( $t );
					
					$('<label for="' + id + '" class="' + _c.toggle + '"><div></div></label>')
						.insertBefore( $p.children().last() );
				}
			);
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		toggle	: 'Toggle'
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

		_c.add( 'toggle' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

})( jQuery );