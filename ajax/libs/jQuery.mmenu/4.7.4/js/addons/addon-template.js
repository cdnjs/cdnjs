/*	
 * jQuery mmenu {ADDON} addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = '{ADDON}';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{			
//			var that = this,
//				opts = this.opts[ _ADDON_ ],
//				conf = this.conf[ _ADDON_ ];
	
			//	...

		},

		//	_setup: fired once per menu
		_setup: function()
		{
			//	Extend shortcut options
			//	Extend shortcut configuration
			//	...
		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			//	...Add classnames, data and events
	
			glbl = $[ _PLUGIN_ ].glbl;
		},
		
		//	_clickAnchor: prevents default behavior when clicking an anchor
		_clickAnchor: function( $a, inMenu )
		{
//			if ( $a.is( '.CLASSNAME' ) )
//			{
//				return true;
//			}
//			return false;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		//	...
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		//	...
	};


	var _c, _d, _e, glbl;

})( jQuery );