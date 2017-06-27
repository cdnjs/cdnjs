/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'fixedElements';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{
			if ( !this.opts.offCanvas )
			{
				return;
			}


			//	Refactor fixed classes
			var $elms = $('div, span, a', glbl.$page),
				$tops = this.__refactorClass( $elms, this.conf.classNames[ _ADDON_ ].fixedTop, 'fixed-top' ),
				$bots = this.__refactorClass( $elms, this.conf.classNames[ _ADDON_ ].fixedBottom, 'fixed-bottom' );

			$tops.add( $bots )
				.appendTo( glbl.$body )
				.addClass( _c.slideout );
		},

		//	_setup: fired once per menu
		_setup: function() {},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'fixed-top fixed-bottom' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		fixedTop 	: 'FixedTop',
		fixedBottom	: 'FixedBottom'
	};


	var _c, _d, _e, glbl;

})( jQuery );