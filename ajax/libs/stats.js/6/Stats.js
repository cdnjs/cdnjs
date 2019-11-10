/*
 * stats.js r6
 * http://github.com/mrdoob/stats.js
 *
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * How to use:
 *
 *  var stats = new Stats();
 *  parentElement.appendChild( stats.domElement );
 *
 *  setInterval(function () {
 *
 *  	stats.update();
 *
 *  }, 1000/60);
 *
 */

var Stats = function () {

	var _mode = 0, _modesCount = 2, _container,
	_frames = 0, _time = new Date().getTime(), _timeLastFrame = _time, _timeLastSecond = _time,
	_fps = 0, _fpsMin = 1000, _fpsMax = 0, _fpsDiv, _fpsText, _fpsCanvas, _fpsContext, _fpsImageData,
	_ms = 0, _msMin = 1000, _msMax = 0, _msDiv, _msText, _msCanvas, _msContext, _msImageData,
	_mb = 0, _mbMin = 1000, _mbMax = 0, _mbDiv, _mbText, _mbCanvas, _mbContext, _mbImageData,
	_colors = {
		fps: {
			bg: { r: 16, g: 16, b: 48 },
			fg: { r: 0, g: 255, b: 255 }
		},
		ms: {
			bg: { r: 16, g: 48, b: 16 },
			fg: { r: 0, g: 255, b: 0 }
		},
		mb: {
			bg: { r: 48, g: 16, b: 26 },
			fg: { r: 255, g: 0, b: 128 }
		}
	};

	_container = document.createElement( 'div' );
	_container.style.cursor = 'pointer';
	_container.style.width = '80px';
	_container.style.opacity = '0.9';
	_container.style.zIndex = '10001';
	_container.addEventListener( 'click', swapMode, false );

	// fps

	_fpsDiv = document.createElement( 'div' );
	_fpsDiv.style.backgroundColor = 'rgb(' + Math.floor( _colors.fps.bg.r / 2 ) + ',' + Math.floor( _colors.fps.bg.g / 2 ) + ',' + Math.floor( _colors.fps.bg.b / 2 ) + ')';
	_fpsDiv.style.padding = '2px 0px 3px 0px';
	_container.appendChild( _fpsDiv );

	_fpsText = document.createElement( 'div' );
	_fpsText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_fpsText.style.textAlign = 'left';
	_fpsText.style.fontSize = '9px';
	_fpsText.style.color = 'rgb(' + _colors.fps.fg.r + ',' + _colors.fps.fg.g + ',' + _colors.fps.fg.b + ')';
	_fpsText.style.margin = '0px 0px 1px 3px';
	_fpsText.innerHTML = '<span style="font-weight:bold">FPS</span>';
	_fpsDiv.appendChild( _fpsText );

	_fpsCanvas = document.createElement( 'canvas' );
	_fpsCanvas.width = 74;
	_fpsCanvas.height = 30;
	_fpsCanvas.style.display = 'block';
	_fpsCanvas.style.marginLeft = '3px';
	_fpsDiv.appendChild( _fpsCanvas );

	_fpsContext = _fpsCanvas.getContext( '2d' );
	_fpsContext.fillStyle = 'rgb(' + _colors.fps.bg.r + ',' + _colors.fps.bg.g + ',' + _colors.fps.bg.b + ')';
	_fpsContext.fillRect( 0, 0, _fpsCanvas.width, _fpsCanvas.height );

	_fpsImageData = _fpsContext.getImageData( 0, 0, _fpsCanvas.width, _fpsCanvas.height );

	// ms

	_msDiv = document.createElement( 'div' );
	_msDiv.style.backgroundColor = 'rgb(' + Math.floor( _colors.ms.bg.r / 2 ) + ',' + Math.floor( _colors.ms.bg.g / 2 ) + ',' + Math.floor( _colors.ms.bg.b / 2 ) + ')';
	_msDiv.style.padding = '2px 0px 3px 0px';
	_msDiv.style.display = 'none';
	_container.appendChild( _msDiv );

	_msText = document.createElement( 'div' );
	_msText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_msText.style.textAlign = 'left';
	_msText.style.fontSize = '9px';
	_msText.style.color = 'rgb(' + _colors.ms.fg.r + ',' + _colors.ms.fg.g + ',' + _colors.ms.fg.b + ')';
	_msText.style.margin = '0px 0px 1px 3px';
	_msText.innerHTML = '<span style="font-weight:bold">MS</span>';
	_msDiv.appendChild( _msText );

	_msCanvas = document.createElement( 'canvas' );
	_msCanvas.width = 74;
	_msCanvas.height = 30;
	_msCanvas.style.display = 'block';
	_msCanvas.style.marginLeft = '3px';
	_msDiv.appendChild( _msCanvas );

	_msContext = _msCanvas.getContext( '2d' );
	_msContext.fillStyle = 'rgb(' + _colors.ms.bg.r + ',' + _colors.ms.bg.g + ',' + _colors.ms.bg.b + ')';
	_msContext.fillRect( 0, 0, _msCanvas.width, _msCanvas.height );

	_msImageData = _msContext.getImageData( 0, 0, _msCanvas.width, _msCanvas.height );

	// mb

	try { 

		if ( performance && performance.memory && performance.memory.totalJSHeapSize ) {

			_modesCount = 3;

		}

	} catch ( error ) { };

	_mbDiv = document.createElement( 'div' );
	_mbDiv.style.backgroundColor = 'rgb(' + Math.floor( _colors.mb.bg.r / 2 ) + ',' + Math.floor( _colors.mb.bg.g / 2 ) + ',' + Math.floor( _colors.mb.bg.b / 2 ) + ')';
	_mbDiv.style.padding = '2px 0px 3px 0px';
	_mbDiv.style.display = 'none';
	_container.appendChild( _mbDiv );

	_mbText = document.createElement( 'div' );
	_mbText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_mbText.style.textAlign = 'left';
	_mbText.style.fontSize = '9px';
	_mbText.style.color = 'rgb(' + _colors.mb.fg.r + ',' + _colors.mb.fg.g + ',' + _colors.mb.fg.b + ')';
	_mbText.style.margin = '0px 0px 1px 3px';
	_mbText.innerHTML = '<span style="font-weight:bold">MB</span>';
	_mbDiv.appendChild( _mbText );

	_mbCanvas = document.createElement( 'canvas' );
	_mbCanvas.width = 74;
	_mbCanvas.height = 30;
	_mbCanvas.style.display = 'block';
	_mbCanvas.style.marginLeft = '3px';
	_mbDiv.appendChild( _mbCanvas );

	_mbContext = _mbCanvas.getContext( '2d' );
	_mbContext.fillStyle = '#301010';
	_mbContext.fillRect( 0, 0, _mbCanvas.width, _mbCanvas.height );

	_mbImageData = _mbContext.getImageData( 0, 0, _mbCanvas.width, _mbCanvas.height );

	function updateGraph( data, value, color ) {

		var x, y, index;

		for ( y = 0; y < 30; y++ ) {

			for ( x = 0; x < 73; x++ ) {

				index = (x + y * 74) * 4;

				data[ index ] = data[ index + 4 ];
				data[ index + 1 ] = data[ index + 5 ];
				data[ index + 2 ] = data[ index + 6 ];

			}

		}

		for ( y = 0; y < 30; y++ ) {

			index = (73 + y * 74) * 4;

			if ( y < value ) {

				data[ index ] = _colors[ color ].bg.r;
				data[ index + 1 ] = _colors[ color ].bg.g;
				data[ index + 2 ] = _colors[ color ].bg.b;

			} else {

				data[ index ] = _colors[ color ].fg.r;
				data[ index + 1 ] = _colors[ color ].fg.g;
				data[ index + 2 ] = _colors[ color ].fg.b;

			}

		}

	}

	function swapMode() {

		_mode ++;
		_mode == _modesCount ? _mode = 0 : _mode;

		_fpsDiv.style.display = 'none';
		_msDiv.style.display = 'none';
		_mbDiv.style.display = 'none';

		switch( _mode ) {

			case 0:

				_fpsDiv.style.display = 'block';

				break;

			case 1:

				_msDiv.style.display = 'block';

				break;

			case 2:

				_mbDiv.style.display = 'block';

				break;
		}

	}

	return {

		domElement: _container,

		update: function () {

			_frames ++;

			_time = new Date().getTime();

			_ms = _time - _timeLastFrame;
			_msMin = Math.min( _msMin, _ms );
			_msMax = Math.max( _msMax, _ms );

			updateGraph( _msImageData.data, Math.min( 30, 30 - ( _ms / 200 ) * 30 ), 'ms' );

			_msText.innerHTML = '<span style="font-weight:bold">' + _ms + ' MS</span> (' + _msMin + '-' + _msMax + ')';
			_msContext.putImageData( _msImageData, 0, 0 );

			_timeLastFrame = _time;

			if ( _time > _timeLastSecond + 1000 ) {

				_fps = Math.round( ( _frames * 1000) / ( _time - _timeLastSecond ) );
				_fpsMin = Math.min( _fpsMin, _fps );
				_fpsMax = Math.max( _fpsMax, _fps );

				updateGraph( _fpsImageData.data, Math.min( 30, 30 - ( _fps / 100 ) * 30 ), 'fps' );

				_fpsText.innerHTML = '<span style="font-weight:bold">' + _fps + ' FPS</span> (' + _fpsMin + '-' + _fpsMax + ')';
				_fpsContext.putImageData( _fpsImageData, 0, 0 );

				if ( _modesCount == 3 ) {

					_mb = performance.memory.usedJSHeapSize * 0.000000954;
					_mbMin = Math.min( _mbMin, _mb );
					_mbMax = Math.max( _mbMax, _mb );

					updateGraph( _mbImageData.data, Math.min( 30, 30 - ( _mb / 2 ) ), 'mb' );

					_mbText.innerHTML = '<span style="font-weight:bold">' + Math.round( _mb ) + ' MB</span> (' + Math.round( _mbMin ) + '-' + Math.round( _mbMax ) + ')';
					_mbContext.putImageData( _mbImageData, 0, 0 );

				}

				_timeLastSecond = _time;
				_frames = 0;

			}

		}

	};

};
