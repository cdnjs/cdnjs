/**
 * @author mr.doob / http://mrdoob.com/
 */

var Stats = function () {

	var _container, _bar, _mode = 0, _modes = 2,
	_frames = 0, _time = Date.now(), _timeLastFrame = _time, _timeLastSecond = _time,
	_fps = 0, _fpsMin = 1000, _fpsMax = 0, _fpsDiv, _fpsText, _fpsGraph,
	_fpsColors = [ [ 16, 16, 48 ], [ 0, 255, 255 ] ],
	_ms = 0, _msMin = 1000, _msMax = 0, _msDiv, _msText, _msGraph,
	_msColors = [ [ 16, 48, 16 ], [ 0, 255, 0 ] ];

	_container = document.createElement( 'div' );
	_container.style.cursor = 'pointer';
	_container.style.width = '80px';
	_container.style.opacity = '0.9';
	_container.style.zIndex = '10001';
	_container.addEventListener( 'mousedown', function ( event ) {

		event.preventDefault();

		_mode = ( _mode + 1 ) % _modes;

		if ( _mode == 0 ) {

			_fpsDiv.style.display = 'block';
			_msDiv.style.display = 'none';

		} else {

			_fpsDiv.style.display = 'none';
			_msDiv.style.display = 'block';

		}

	}, false );

	// fps

	_fpsDiv = document.createElement( 'div' );
	_fpsDiv.style.textAlign = 'left';
	_fpsDiv.style.lineHeight = '1.2em';
	_fpsDiv.style.backgroundColor = 'rgb(' + Math.floor( _fpsColors[ 0 ][ 0 ] / 2 ) + ',' + Math.floor( _fpsColors[ 0 ][ 1 ] / 2 ) + ',' + Math.floor( _fpsColors[ 0 ][ 2 ] / 2 ) + ')';
	_fpsDiv.style.padding = '0 0 3px 3px';
	_container.appendChild( _fpsDiv );

	_fpsText = document.createElement( 'div' );
	_fpsText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_fpsText.style.fontSize = '9px';
	_fpsText.style.color = 'rgb(' + _fpsColors[ 1 ][ 0 ] + ',' + _fpsColors[ 1 ][ 1 ] + ',' + _fpsColors[ 1 ][ 2 ] + ')';
	_fpsText.style.fontWeight = 'bold';
	_fpsText.innerHTML = 'FPS';
	_fpsDiv.appendChild( _fpsText );

	_fpsGraph = document.createElement( 'div' );
	_fpsGraph.style.position = 'relative';
	_fpsGraph.style.width = '74px';
	_fpsGraph.style.height = '30px';
	_fpsGraph.style.backgroundColor = 'rgb(' + _fpsColors[ 1 ][ 0 ] + ',' + _fpsColors[ 1 ][ 1 ] + ',' + _fpsColors[ 1 ][ 2 ] + ')';
	_fpsDiv.appendChild( _fpsGraph );

	while ( _fpsGraph.children.length < 74 ) {

		_bar = document.createElement( 'span' );
		_bar.style.width = '1px';
		_bar.style.height = '30px';
		_bar.style.cssFloat = 'left';
		_bar.style.backgroundColor = 'rgb(' + _fpsColors[ 0 ][ 0 ] + ',' + _fpsColors[ 0 ][ 1 ] + ',' + _fpsColors[ 0 ][ 2 ] + ')';
		_fpsGraph.appendChild( _bar );

	}

	// ms

	_msDiv = document.createElement( 'div' );
	_msDiv.style.textAlign = 'left';
	_msDiv.style.lineHeight = '1.2em';
	_msDiv.style.backgroundColor = 'rgb(' + Math.floor( _msColors[ 0 ][ 0 ] / 2 ) + ',' + Math.floor( _msColors[ 0 ][ 1 ] / 2 ) + ',' + Math.floor( _msColors[ 0 ][ 2 ] / 2 ) + ')';
	_msDiv.style.padding = '0 0 3px 3px';
	_msDiv.style.display = 'none';
	_container.appendChild( _msDiv );

	_msText = document.createElement( 'div' );
	_msText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_msText.style.fontSize = '9px';
	_msText.style.color = 'rgb(' + _msColors[ 1 ][ 0 ] + ',' + _msColors[ 1 ][ 1 ] + ',' + _msColors[ 1 ][ 2 ] + ')';
	_msText.style.fontWeight = 'bold';
	_msText.innerHTML = 'MS';
	_msDiv.appendChild( _msText );

	_msGraph = document.createElement( 'div' );
	_msGraph.style.position = 'relative';
	_msGraph.style.width = '74px';
	_msGraph.style.height = '30px';
	_msGraph.style.backgroundColor = 'rgb(' + _msColors[ 1 ][ 0 ] + ',' + _msColors[ 1 ][ 1 ] + ',' + _msColors[ 1 ][ 2 ] + ')';
	_msDiv.appendChild( _msGraph );

	while ( _msGraph.children.length < 74 ) {

		_bar = document.createElement( 'span' );
		_bar.style.width = '1px';
		_bar.style.height = Math.random() * 30 + 'px';
		_bar.style.cssFloat = 'left';
		_bar.style.backgroundColor = 'rgb(' + _msColors[ 0 ][ 0 ] + ',' + _msColors[ 0 ][ 1 ] + ',' + _msColors[ 0 ][ 2 ] + ')';
		_msGraph.appendChild( _bar );

	}

	var _updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	}

	return {

		getDomElement: function () {

			return _container;

		},

		getFps: function () {

			return _fps;

		},

		getFpsMin: function () {

			return _fpsMin;

		},

		getFpsMax: function () {

			return _fpsMax;

		},

		getMs: function () {

			return _ms;

		},

		getMsMin: function () {

			return _msMin;

		},

		getMsMax: function () {

			return _msMax;

		},

		update: function () {

			_time = Date.now();

			_ms = _time - _timeLastFrame;
			_msMin = Math.min( _msMin, _ms );
			_msMax = Math.max( _msMax, _ms );

			_msText.textContent = _ms + ' MS (' + _msMin + '-' + _msMax + ')';
			_updateGraph( _msGraph, Math.min( 30, 30 - ( _ms / 200 ) * 30 ) );

			_timeLastFrame = _time;

			_frames ++;

			if ( _time > _timeLastSecond + 1000 ) {

				_fps = Math.round( ( _frames * 1000 ) / ( _time - _timeLastSecond ) );
				_fpsMin = Math.min( _fpsMin, _fps );
				_fpsMax = Math.max( _fpsMax, _fps );

				_fpsText.textContent = _fps + ' FPS (' + _fpsMin + '-' + _fpsMax + ')';
				_updateGraph( _fpsGraph, Math.min( 30, 30 - ( _fps / 100 ) * 30 ) );

				_timeLastSecond = _time;
				_frames = 0;

			}

		}

	};

};
