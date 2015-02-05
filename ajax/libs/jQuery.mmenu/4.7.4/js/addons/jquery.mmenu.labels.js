/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'labels';


	$[ _PLUGIN_ ].addons[ _ADDON_ ] = {
	
		//	_init: fired when (re)initiating the plugin
		_init: function( $panels )
		{
			var opts = this.opts[ _ADDON_ ];


			//	Refactor collapsed class
			this.__refactorClass( $('li', this.$menu), this.conf.classNames[ _ADDON_ ].collapsed, 'collapsed' );


			//	Toggle collapsed labels
			if ( opts.collapse )
			{
				$('.' + _c.label, $panels )
					.each(
						function()
						{
							var $l = $(this),
								$e = $l.nextUntil( '.' + _c.label, '.' + _c.collapsed );
	
							if ( $e.length )
							{
								if ( !$l.children( '.' + _c.subopen ).length )
								{
									$l.wrapInner( '<span />' );
									$l.prepend( '<a href="#" class="' + _c.subopen + ' ' + _c.fullsubopen + '" />' );
								}
							}
						}
					);
			}

		},

		//	_setup: fired once per menu
		_setup: function()
		{
			var opts = this.opts[ _ADDON_ ];


			//	Extend shortcut options
			if ( typeof opts == 'boolean' )
			{
				opts = {
					collapse: opts
				};
			}
			if ( typeof opts != 'object' )
			{
				opts = {};
			}
			opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], opts );
			
			
			this.opts[ _ADDON_ ] = opts;

		},

		//	_add: fired once per page load
		_add: function()
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
	
			_c.add( 'collapsed uncollapsed' );
	
			glbl = $[ _PLUGIN_ ].glbl;
		},

		//	_clickAnchor: prevents default behavior when clicking an anchor
		_clickAnchor: function( $a, inMenu )
		{
			if ( inMenu )
			{
				var $l = $a.parent();
				if ( $l.is( '.' + _c.label ) )
				{
					var $e = $l.nextUntil( '.' + _c.label, '.' + _c.collapsed );
			
					$l.toggleClass( _c.opened );
					$e[ $l.hasClass( _c.opened ) ? 'addClass' : 'removeClass' ]( _c.uncollapsed );
					
					return true;
				}
			}
			return false;
		}
	};


	//	Default options and configuration
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		collapse: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		collapsed: 'Collapsed'
	};


	var _c, _d, _e, glbl;

})( jQuery );