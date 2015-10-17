/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'counters';

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


		//	Refactor counter class
		this.__refactorClass( $('em', this.$menu), this.conf.classNames[ _ADDON_ ].counter, 'counter' );


		//	Add the counters
		if ( opts.add )
		{
			$('.' + _c.panel, this.$menu)
				.each(
					function()
					{
						var $t = $(this),
							$p = $t.data( _d.parent );
		
						if ( $p )
						{
							var $c = $( '<em class="' + _c.counter + '" />' ),
								$a = $p.find( '> a.' + _c.subopen );
	
							if ( !$a.parent().find( 'em.' + _c.counter ).length )
							{
								$a.before( $c );
							}
						}
					}
			);
		}


		//	Bind custom events
		if ( opts.update )
		{
			var $counters = $('em.' + _c.counter, this.$menu);

			$counters
				.each(
					function()
					{
						var $counter = $(this),
							$sublist = $($counter.next().attr( 'href' ), that.$menu);
	
						if ( !$sublist.is( '.' + _c.list ) )
						{
							$sublist = $sublist.find( '> .' + _c.list );
						}
	
						if ( $sublist.length )
						{
							var updateCounter = function()
							{
								var $lis = $sublist.children()
									.not( '.' + _c.label )
									.not( '.' + _c.subtitle )
									.not( '.' + _c.hidden )
									.not( '.' + _c.search )
									.not( '.' + _c.noresults );

								$counter.html( $lis.length );
							};
							updateCounter();

							that._update( updateCounter );
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
		add		: false,
		update	: false
	};
	$[ _PLUGIN_ ].configuration.classNames[ _ADDON_ ] = {
		counter: 'Counter'
	};


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				add		: o,
				update	: o
			};
		}
		if ( typeof o != 'object' )
		{
			o = {};
		}
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], o );


		//	DEPRECATED
		if ( o.count )
		{
			$[ _PLUGIN_ ].deprecated( 'the option "count" for counters', 'the option "update"' );
			o.update = o.count;
		}
		//	/DEPRECATED


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

		_c.add( 'counter noresults' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

})( jQuery );