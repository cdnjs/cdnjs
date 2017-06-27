/* Flot plugin for showing crosshairs when the mouse hovers over the plot.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin supports these options:

	crosshair: {
		mode: null or "x" or "y" or "xy"
		color: color
		lineWidth: number
	}

Set the mode to one of "x", "y" or "xy". The "x" mode enables a vertical
crosshair that lets you trace the values on the x axis, "y" enables a
horizontal crosshair and "xy" enables them both. "color" is the color of the
crosshair (default is "rgba(170, 0, 0, 0.80)"), "lineWidth" is the width of
the drawn lines (default is 1).

The plugin also adds four public methods:

  - setCrosshair( pos )

    Set the position of the crosshair. Note that this is cleared if the user
    moves the mouse. "pos" is in coordinates of the plot and should be on the
    form { x: xpos, y: ypos } (you can use x2/x3/... if you're using multiple
    axes), which is coincidentally the same format as what you get from a
    "plothover" event. If "pos" is null, the crosshair is cleared.

  - clearCrosshair()

    Clear the crosshair.

  - lockCrosshair(pos)

    Cause the crosshair to lock to the current location, no longer updating if
    the user moves the mouse. Optionally supply a position (passed on to
    setCrosshair()) to move it to.

    Example usage:

	var myFlot = $.plot( $("#graph"), ..., { crosshair: { mode: "x" } } };
	$("#graph").bind( "plothover", function ( evt, position, item ) {
		if ( item ) {
			// Lock the crosshair to the data point being hovered
			myFlot.lockCrosshair({
				x: item.datapoint[ 0 ],
				y: item.datapoint[ 1 ]
			});
		} else {
			// Return normal crosshair operation
			myFlot.unlockCrosshair();
		}
	});

  - unlockCrosshair()

    Free the crosshair to move again after locking it.
*/(function(e){function n(e){function n(n){if(t.locked)return;t.x!=-1&&(t.x=-1,e.triggerRedrawOverlay())}function r(n){if(t.locked)return;if(e.getSelection&&e.getSelection()){t.x=-1;return}var r=e.offset();t.x=Math.max(0,Math.min(n.pageX-r.left,e.width())),t.y=Math.max(0,Math.min(n.pageY-r.top,e.height())),e.triggerRedrawOverlay()}var t={x:-1,y:-1,locked:!1};e.setCrosshair=function(r){if(!r)t.x=-1;else{var i=e.p2c(r);t.x=Math.max(0,Math.min(i.left,e.width())),t.y=Math.max(0,Math.min(i.top,e.height()))}e.triggerRedrawOverlay()},e.clearCrosshair=e.setCrosshair,e.lockCrosshair=function(r){r&&e.setCrosshair(r),t.locked=!0},e.unlockCrosshair=function(){t.locked=!1},e.hooks.bindEvents.push(function(e,t){if(!e.getOptions().crosshair.mode)return;t.mouseout(n),t.mousemove(r)}),e.hooks.drawOverlay.push(function(e,n){var r=e.getOptions().crosshair;if(!r.mode)return;var i=e.getPlotOffset();n.save(),n.translate(i.left,i.top);if(t.x!=-1){var s=e.getOptions().crosshair.lineWidth%2===0?0:.5;n.strokeStyle=r.color,n.lineWidth=r.lineWidth,n.lineJoin="round",n.beginPath();if(r.mode.indexOf("x")!=-1){var o=Math.round(t.x)+s;n.moveTo(o,0),n.lineTo(o,e.height())}if(r.mode.indexOf("y")!=-1){var u=Math.round(t.y)+s;n.moveTo(0,u),n.lineTo(e.width(),u)}n.stroke()}n.restore()}),e.hooks.shutdown.push(function(e,t){t.unbind("mouseout",n),t.unbind("mousemove",r)})}var t={crosshair:{mode:null,color:"rgba(170, 0, 0, 0.80)",lineWidth:1}};e.plot.plugins.push({init:n,options:t,name:"crosshair",version:"1.0"})})(jQuery);