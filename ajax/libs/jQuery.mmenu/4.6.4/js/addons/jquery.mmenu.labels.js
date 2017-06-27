/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'labels';


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


		//	Toggle collapsed labels
		if ( opts.collapse )
		{

			//	Refactor collapsed class
			this.__refactorClass( $('li', this.$menu), this.conf.classNames[ _ADDON_ ].collapsed, 'collapsed' );

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

			if ( !addon_added )
			{
				glbl.$body
					.on( _e.click,
						'.' + _c.label + ' .' + _c.subopen,
						function( e )
						{
							e.stopPropagation();
							e.preventDefault();

							var $l = $(this).parent(),
								$e = $l.nextUntil( '.' + _c.label, '.' + _c.collapsed );
	
							$l.toggleClass( _c.opened );
							$e[ $l.hasClass( _c.opened ) ? 'addClass' : 'removeClass' ]( _c.uncollapsed );
						}
					);
			}
		}

	};


	//	Add to plugin
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

		_c.add( 'collapsed uncollapsed' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	var _c, _d, _e, glbl,
		addon_initiated = false;


})( jQuery );