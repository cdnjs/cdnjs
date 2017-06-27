/*	
 * jQuery mmenu {ADDON} addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = '{ADDON}';


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


		//	...


	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		//	...
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		//	...
	};


	function extendOptions( o )
	{
		//	...Extend shortcut options
		//	...Throw deprecated warnings
		return o;
	}

	function extendConfiguration( c )
	{
		//	...Extend shortcut configuration
		//	...Throw deprecated warnings
		return c;
	}
	
	function _initAddon()
	{
		addon_initiated = true;

		_c = $[ _PLUGIN_ ]._c;
		_d = $[ _PLUGIN_ ]._d;
		_e = $[ _PLUGIN_ ]._e;

		//	...Add classnames, data and events

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;

})( jQuery );