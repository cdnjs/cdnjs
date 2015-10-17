/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 */


(function( $ ) {

	var _PLUGIN_ = 'mmenu',
		_ADDON_  = 'dragOpen';

	var _c, _d, _e, glbl,
		addon_initiated = false;


	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{
		if ( !$.fn.hammer )
		{
			return;
		}
		if ( !addon_initiated )
		{
			_initAddon();
		}

		this.opts[ _ADDON_ ] = extendOptions( this.opts[ _ADDON_ ] );
		this.conf[ _ADDON_ ] = extendConfiguration( this.conf[ _ADDON_ ] );

		var that = this,
			opts = this.opts[ _ADDON_ ],
			conf = this.conf[ _ADDON_ ];


		if ( opts.open )
		{
			var _stage 			= 0,
				_direction 		= false,
				_distance 		= 0,
				_maxDistance 	= 0,
				_dimension		= 'width';

			switch( this.opts.offCanvas.position )
			{
				case 'left':
				case 'right':
					_dimension = 'width';
					break;
				default:
					_dimension = 'height';
					break;
			}

			//	Set up variables
			switch( this.opts.offCanvas.position )
			{
				case 'left':
					var drag = {
						events 		: _e.dragleft + ' ' + _e.dragright,
						open_dir 	: 'right',
						close_dir 	: 'left',
						delta		: 'deltaX',
						page		: 'pageX',
						negative 	: false
					};
					break;

				case 'right':
					var drag = {
						events 		: _e.dragleft + ' ' + _e.dragright,
						open_dir 	: 'left',
						close_dir 	: 'right',
						delta		: 'deltaX',
						page		: 'pageX',
						negative 	: true
					};
					break;

				case 'top':
					var drag = {
						events		: _e.dragup + ' ' + _e.dragdown,
						open_dir 	: 'down',
						close_dir 	: 'up',
						delta		: 'deltaY',
						page		: 'pageY',
						negative 	: false
					};
					break;

				case 'bottom':
					var drag = {
						events 		: _e.dragup + ' ' + _e.dragdown,
						open_dir 	: 'up',
						close_dir 	: 'down',
						delta		: 'deltaY',
						page		: 'pageY',
						negative 	: true
					};
					break;
			}

			var $dragNode = this.__valueOrFn( opts.pageNode, this.$menu, glbl.$page );
			if ( typeof $dragNode == 'string' )
			{
				$dragNode = $($dragNode);
			}

			var $fixed = glbl.$page.find( '.' + _c.mm( 'fixed-top' ) + ', .' + _c.mm( 'fixed-bottom' ) ),
				$dragg = glbl.$page;

			switch ( this.opts.offCanvas.zposition )
			{
				case 'back':
					$dragg = $dragg.add( $fixed );
					break;

				case 'front':
					$dragg = this.$menu;
					break;

				case 'next':
					$dragg = $dragg.add( this.$menu ).add( $fixed );
					break;
			};

			//	Bind events
			$dragNode
				.hammer()
				.on( _e.touchstart + ' ' + _e.mousedown,
					function( e )
					{
						if ( e.type == 'touchstart' )
						{
							var tch = e.originalEvent.touches[ 0 ] || e.originalEvent.changedTouches[ 0 ],
								pos = tch[ drag.page ];
						}
						else if ( e.type == 'mousedown' )
						{
							var pos = e[ drag.page ];
						}

						switch( that.opts.offCanvas.position )
						{
							case 'right':
							case 'bottom':
								if ( pos >= glbl.$wndw[ _dimension ]() - opts.maxStartPos )
								{
									_stage = 1;
								}
								break;

							default:
								if ( pos <= opts.maxStartPos )
								{
									_stage = 1;
								}
								break;
						}
					}
				)
				.on( drag.events + ' ' + _e.dragend,
					function( e )
					{
						if ( _stage > 0 )
						{
							e.gesture.preventDefault();
					        e.stopPropagation();
						}
					}
				)
				.on( drag.events,
					function( e )
					{
						var new_distance = drag.negative
							? -e.gesture[ drag.delta ]
							: e.gesture[ drag.delta ];

						_direction = ( new_distance > _distance )
							? drag.open_dir
							: drag.close_dir;

						_distance = new_distance;

						if ( _distance > opts.threshold )
						{
							if ( _stage == 1 )
							{								
								if ( glbl.$html.hasClass( _c.opened ) )
								{
									return;
								}
								_stage = 2;
								that._openSetup();
								that.vars.opened = true;
								glbl.$html.addClass( _c.dragging );

								_maxDistance = minMax( 
									glbl.$wndw[ _dimension ]() * conf[ _dimension ].perc, 
									conf[ _dimension ].min, 
									conf[ _dimension ].max
								);
							}
						}
						if ( _stage == 2 )
						{
							$dragg.css( that.opts.offCanvas.position, minMax( _distance, 10, _maxDistance ) - ( that.opts.offCanvas.zposition == 'front' ? _maxDistance : 0 ) );
						}
					}
				)
				.on( _e.dragend,
					function( e )
					{
						if ( _stage == 2 )
						{
							glbl.$html.removeClass( _c.dragging );
							$dragg.css( that.opts.offCanvas.position, '' );

							if ( _direction == drag.open_dir )
							{
						        that._openFinish();
							}
							else
							{
								that.close();
							}
						}
			        	_stage = 0;
				    }
				);
		}
	};


	//	Add to plugin
	$[ _PLUGIN_ ].addons = $[ _PLUGIN_ ].addons || [];
	$[ _PLUGIN_ ].addons.push( _ADDON_ );


	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		open		: false,
//		pageNode	: null,
		maxStartPos	: 100,
		threshold	: 50
	};
	$[ _PLUGIN_ ].configuration[ _ADDON_ ] = {
		width	: {
			perc	: 0.8,
			min		: 140,
			max		: 440
		},
		height	: {
			perc	: 0.8,
			min		: 140,
			max		: 880
		}
	};


	function extendOptions( o )
	{
		if ( typeof o == 'boolean' )
		{
			o = {
				open: o
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

		_c.add( 'dragging' );
		_e.add( 'dragleft dragright dragup dragdown dragend' );

		glbl = $[ _PLUGIN_ ].glbl;
	}

	function minMax( val, min, max )
	{
		if ( val < min )
		{
			val = min;
		}
		if ( val > max )
		{
			val = max;
		}
		return val;
	}

})( jQuery );