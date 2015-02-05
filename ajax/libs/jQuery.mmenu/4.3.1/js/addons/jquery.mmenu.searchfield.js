/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'searchfield';

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


		//	Add the field
		if ( opts.add )
		{
			switch( opts.addTo )
			{
				case 'menu':
					var $wrapper = this.$menu;
					break;

				case 'panels':
					var $wrapper = $('.' + _c.panel, this.$menu);
					break;

				default:
					var $wrapper = $(opts.addTo, this.$menu).filter( '.' + _c.panel );
					break;
			}
			if ( $wrapper.length )
			{
				$wrapper.each(
					function()
					{
						var $panel	= $(this),
							_node	= $panel.is( '.' + _c.list ) ? 'li' : 'div',
							$node	= $panel.children().first();

						var insert = ( $node.is( '.' + _c.subtitle ) )
							? 'After'
							: 'Before';

						var $node = $( '<' + _node + ' class="' + _c.search + '" />' )
							.append( '<input placeholder="' + opts.placeholder + '" type="text" autocomplete="off" />' )
							[ 'insert' + insert ]( $node );

						if ( opts.noResults )
						{
							$( '<' + _node + ' class="' + _c.noresults + '" />' )
								.html( opts.noResults )
								.insertAfter( $node );
						}
					}
				);
			}
		}

		if ( this.$menu.children( 'div.' + _c.search ).length )
		{
			this.$menu.addClass( _c.hassearch );
		}

		//	Bind custom events
		if ( opts.search )
		{
			var $search = $('.' + _c.search, this.$menu);
			if ( $search.length )
			{
				$search.each(
					function()
					{
						var $t = $(this);

						if ( opts.addTo == 'menu' )
						{
							var $panels = $('.' + _c.panel, that.$menu);
						}
						else
						{
							var $panels = $t.closest( '.' + _c.panel );
						}
						var $lists	= $panels.add( $panels.children( '.' + _c.list ) ),
							$input	= $t.find( 'input' ),
							$alllis	= $('> li', $lists),
							$labels = $alllis.filter( '.' + _c.label ),
							$items 	= $alllis
								.not( '.' + _c.subtitle )
								.not( '.' + _c.label )
								.not( '.' + _c.search )
								.not( '.' + _c.noresults );

						var _searchText = '> a';
						if ( !opts.showLinksOnly )
						{
							_searchText += ', > span';
						}

						$input
							.off( _e.keyup + ' ' + _e.change )
							.on( _e.keyup,
								function( e )
								{
									if ( !preventKeypressSearch( e.keyCode ) )
									{
										$t.trigger( _e.search );
									}
								}
							)
							.on( _e.change,
								function( e )
								{
									$t.trigger( _e.search );
								}
							);
		
						$t.off( _e.reset + ' ' + _e.search )
							.on( _e.reset + ' ' + _e.search,
								function( e )
								{
									e.stopPropagation();
								}
							)
							.on( _e.reset,
								function( e )
								{
									$t.trigger( _e.search, [ '' ] );
								}
							)
							.on( _e.search,
								function( e, query )
								{
									if ( typeof query == 'string' )
									{
										$input.val( query );
									}
									else
									{
										query = $input.val();
									}
									query = query.toLowerCase();

									//	Scroll to top
									$panels.scrollTop( 0 );
		
									//	Search through items
									$items
										.add( $labels )
										.addClass( _c.hidden );

									$items
										.each(
											function()
											{
												var $t = $(this);
												if ( $(_searchText, $t).text().toLowerCase().indexOf( query ) > -1 )
												{
													$t.add( $t.prevAll( '.' + _c.label ).first() ).removeClass( _c.hidden );
												}
											}
										);

									//	Update parent for submenus
									$( $panels.get().reverse() ).each(
										function()
										{
											var $t = $(this),
												$p = $t.data( _d.parent );
				
											if ( $p )
											{
												var $i = $t.add( $t.find( '> .' + _c.list ) ).find( '> li' )
													.not( '.' + _c.subtitle )
													.not( '.' + _c.search )
													.not( '.' + _c.noresults )
													.not( '.' + _c.label )
													.not( '.' + _c.hidden );
		
												if ( $i.length )
												{
													$p.removeClass( _c.hidden )
														.removeClass( _c.nosubresults )
														.prevAll( '.' + _c.label ).first().removeClass( _c.hidden );
												}
												else if ( opts.addTo == 'menu' )
												{
													if ( $t.hasClass( _c.current ) )
													{
														$p.trigger( _e.open );
													}
													$p.addClass( _c.nosubresults );
												}
											}
										}
									);

									//	Show/hide no results message
									that.$menu[ $items.not( '.' + _c.hidden ).length ? 'removeClass' : 'addClass' ]( _c.noresults );
		
									//	Update for other addons
									that._update();
								}
							);
					}
				);
			}
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add				: false,
		addTo			: 'menu',
		search			: false,
//		showLinksOnly	: true,
		placeholder		: 'Search',
		noResults		: 'No results found.'
	};


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				add		: o,
				search	: o
			};
		}
		if ( typeof o != 'object' )
		{
			o = {};
		}
		o = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], o );

		if ( typeof o.showLinksOnly != 'boolean' )
		{
			o.showLinksOnly = ( o.addTo == 'menu' );
		}
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

		_c.add( 'search hassearch noresults nosubresults counter' );
		_e.add( 'search reset change' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	function preventKeypressSearch( c )
	{
		switch( c )
		{
			case 9:		//	tab
			case 16:	//	shift
			case 17:	//	control
			case 18:	//	alt
			case 37:	//	left
			case 38:	//	top
			case 39:	//	right
			case 40:	//	bottom
				return true;
		}
		return false;
	}

})( jQuery );