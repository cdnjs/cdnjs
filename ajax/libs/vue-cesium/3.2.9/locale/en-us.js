/*! VueCesium v3.2.9 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueCesiumLocaleEnus = {}));
})(this, (function (exports) { 'use strict';

  var enUs = {
    name: "en-us",
    nativeName: "English (US)",
    vc: {
      loadError: "needs to be child of VcViewer",
      navigation: {
        compass: {
          outerTip: "Drag outer ring: rotate view. Double-click: reset view.",
          innerTip: "Drag inner gyroscope: free orbit. TIP: You can also free orbit by holding the CTRL key and dragging the map.",
          title: "Click and drag to rotate the camera."
        },
        zoomCotrol: {
          zoomInTip: "Zoom in",
          zoomResetTip: "Reset zoom",
          zoomOutTip: "Zoom out"
        },
        print: {
          printTip: "Viewer screenshot/print",
          printViewTitle: "VueCesium Print View",
          credit: "Map Credits",
          screenshot: "Screenshot"
        },
        myLocation: {
          myLocationTip: "Centre map at your current location",
          positioning: "Positioning...",
          fail: "Positioning failed",
          centreMap: "My Location",
          lat: "Lat",
          lng: "Lng",
          address: "Address"
        },
        statusBar: {
          lat: "Lat",
          lng: "Lng",
          zone: "ZONE",
          e: "E",
          n: "N",
          elev: "Elev",
          level: "Level",
          heading: "H",
          pitch: "P",
          roll: "R",
          cameraHeight: "CameraH",
          tip: "Click to switch the mouse display coordinates to UTM projection coordinates"
        }
      },
      navigationSm: {
        compass: {
          outerTip: "Drag outer ring: rotate view. Double-click: reset view."
        },
        zoomCotrol: {
          zoomInTip: "Zoom in",
          zoomBarTip: "Drag the bar up to zoom in, and down to zoom out.",
          zoomOutTip: "Zoom out"
        }
      },
      measurement: {
        expand: "Expand",
        collapse: "Collapse",
        editor: {
          move: "Move the point",
          insert: "Insert a point",
          remove: "Remove the point",
          removeAll: "Remove all the points"
        },
        distance: {
          tip: "Distance",
          drawingTipStart: "Click the left button to draw the starting point of the distance measurement.",
          drawingTipEnd: "Click the left mouse button to draw the end point of the distance measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        "component-distance": {
          tip: "Component Distance",
          drawingTipStart: "Click the left mouse button to draw the starting point of component distance measurement.",
          drawingTipEnd: "Click the left mouse button to draw the end point of the component distance measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        polyline: {
          tip: "Polyline Distance",
          drawingTipStart: "Click the left button to draw the first point.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        horizontal: {
          tip: "Horizontal Distance",
          drawingTipStart: "Click the left button to draw the first point.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        vertical: {
          tip: "Vertical Distance",
          drawingTipStart: "Click the left button to draw the starting point of the vertical distance measurement.",
          drawingTipEnd: "Click the left button to draw the end point of the vertical distance measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        height: {
          tip: "Height ",
          drawingTipStart: "Click the left button to draw the height measurement point.",
          drawingTipEnd: "Click the left button to draw the height measurement point.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        area: {
          tip: "Area",
          drawingTipStart: "Click the left button to draw the first point.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        point: {
          tip: "Point Coordinate",
          drawingTipStart: "Click the left button to draw the point coordinate measurement.",
          drawingTipEnd: "Click the left button to draw the point coordinate measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification.",
          lng: "lng:",
          lat: "lat:",
          height: "height:",
          slope: "slope:"
        },
        rectangle: {
          tip: "Rectangle",
          drawingTipStart: "Click the left button to draw the rectangle measurement.",
          drawingTipEnd: "Click the left button to draw the rectangle measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        regular: {
          tip: "Regular",
          drawingTipStart: "Click the left button to draw the regular measurement.",
          drawingTipEnd: "Click the left button to draw the regular measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        circle: {
          tip: "Circle",
          drawingTipStart: "Click the left button to draw the circle measurement.",
          drawingTipEnd: "Click the left button to draw the circle measurement.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        clear: {
          tip: "Clear measurement results"
        }
      },
      drawing: {
        expand: "Expand",
        collapse: "Collapse",
        editor: {
          move: "Move the point",
          insert: "Insert a point",
          remove: "Remove the point",
          removeAll: "Remove all the points"
        },
        pin: {
          tip: "Drawing pin",
          drawingTipStart: "Click the left button to draw a pin.",
          drawingTipEnd: "Click the left button to draw a pin.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        point: {
          tip: "Drawing point",
          drawingTipStart: "Click the left button to draw a point.",
          drawingTipEnd: "Click the left button to draw a point.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        polyline: {
          tip: "Drawing polyline",
          drawingTipStart: "Click the left button to draw the first point.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the drawing.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        polygon: {
          tip: "Drawing polygon",
          drawingTipStart: "Click the left button to draw the first point.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the drawing.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        rectangle: {
          tip: "Drawing rectangle",
          drawingTipStart: "Click the left button to draw the starting point of the rectangle.",
          drawingTipEnd: "Click the left button to draw the end point of the rectangle.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        circle: {
          tip: "Drawing circle",
          drawingTipStart: "Click the left button to draw the starting point of the circle.",
          drawingTipEnd: "Click the left button to draw the end point of the circle.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        regular: {
          tip: "Drawing regular",
          drawingTipStart: "Click the left button to draw the starting point of the regular.",
          drawingTipEnd: "Click the left button to draw the end point of the circle.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        clear: {
          tip: "Clear drawing results"
        }
      },
      analysis: {
        expand: "Expand",
        collapse: "Collapse",
        editor: {
          move: "Move the point",
          insert: "Insert a point",
          remove: "Remove the point",
          removeAll: "Remove all the points"
        },
        sightline: {
          tip: "Sightline",
          drawingTipStart: "Click the left button to draw the view point of the sightline analysis.",
          drawingTipEnd: "Click the left button to draw the next point, and double-click the left button to end the sightline analysis.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        viewshed: {
          tip: "Viewshed",
          drawingTipStart: "Click the left button to draw the view point of the viewshed analysis.",
          drawingTipEnd: "Click the left button to draw the end point of the viewshed analysis.",
          drawingTipEditing: "Move the mouse to modify the node, click the left button to confirm the modification,\nand click the right button to discard the modification."
        },
        clear: {
          tip: "Clear analysis results"
        }
      },
      overview: {
        show: "Show",
        hidden: "Hidden"
      },
      typhoon: {
        warn: "Failed to play typhoon, reason: no typhoon data with corresponding number found."
      }
    }
  };

  exports["default"] = enUs;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
