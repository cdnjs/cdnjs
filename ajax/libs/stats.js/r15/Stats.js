/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var mode = 0;

	var container = document.createElement( 'div' );
	container.style.cssText = 'opacity:0.9;cursor:pointer';
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();

		showPanel( ++ mode % container.children.length );

	}, false );

	//

	function addPanel( panel ) {

		container.appendChild( panel.dom );
		return panel;

	}

	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			container.children[ i ].style.display = i === id ? 'block' : 'none';

		}

	}

	//

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );

	if ( self.performance && self.performance.memory ) {

		var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );

	}

	showPanel( 0 );

	return {

		REVISION: 15,

		domElement: container,

		addPanel: addPanel,
		showPanel: showPanel,

		setMode: showPanel, // backwards compatibility

		begin: function () {

			beginTime = ( performance || Date ).now();

		},

		end: function () {

			frames ++;

			var time = ( performance || Date ).now();

			msPanel.update( time - beginTime, 200 );

			if ( time > prevTime + 1000 ) {

				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

				prevTime = time;
				frames = 0;

				if ( memPanel !== undefined ) {

					var memory = performance.memory;
					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );

				}

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		}

	};

};

Stats.Panel = function ( name, fg, bg ) {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 80;
	canvas.height = 48;

	var context = canvas.getContext( '2d' );

	context.fillStyle = bg;
	context.fillRect( 0, 0, 80, 48 );

	context.font = 'bold 9px Helvetica,Arial,sans-serif';
	context.fillStyle = fg;
	context.fillText( name, 3, 10 );
	context.fillRect( 3, 15, 74, 30 );

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect( 3, 15, 74, 30 );

	var min = Infinity, max = 0;

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.globalAlpha = 1;
			context.fillStyle = bg;
			context.fillRect( 0, 0, 80, 15 );
			context.fillStyle = fg;
			context.fillText( ( value | 0 ) + ' ' + name + ' (' + ( min | 0 ) + '-' + ( max | 0 ) + ')', 3, 10 );

			context.drawImage( canvas, 4, 15, 74, 30, 3, 15, 74, 30 );

			context.fillRect( 76, 15, 1, 30 );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( 76, 15, 1, 30 - ( ( value / maxValue ) * 30 ) | 0 );

		}

	};

};

if ( typeof module === 'object' ) {

	module.exports = Stats;

}
