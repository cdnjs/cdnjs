/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'labels';

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


		//	Toggle collapsed labels
		if ( opts.collapse )
		{

			//	Refactor collapsed class
			this.__refactorClass( $('li', this.$menu), this.conf.classNames[ _ADDON_ ].collapsed, 'collapsed' );

			$('.' + _c.label, this.$menu)
				.each(
					function()
					{
						var $label = $(this),
							$expan = $label.nextUntil( '.' + _c.label, ( opts.collapse == 'all' ) ? null : '.' + _c.collapsed );

						if ( opts.collapse == 'all' )
						{
							$label.addClass( _c.opened );
							$expan.removeClass( _c.collapsed );
						}

						if ( $expan.length )
						{
							$label.wrapInner( '<span />' );

							$('<a href="#" class="' + _c.subopen + ' ' + _c.fullsubopen + '" />')
								.prependTo( $label )
								.on(
									_e.click,
									function( e )
									{
										e.preventDefault();
		
										$label.toggleClass( _c.opened );
										$expan[ $label.hasClass( _c.opened ) ? 'removeClass' : 'addClass' ]( _c.collapsed );
									}
								);
						}
					}
				);
		}

	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		collapse: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		collapsed: 'Collapsed'
	};


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				collapse: o
			};
		}
		if ( typeof o != 'object' )
		{
			o = {};
		}
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], o );

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

		_c.add( 'collapsed' );

		glbl = $[ _PLUGIN_ ].glbl;
	}


})( jQuery );