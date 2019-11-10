/*
Plugin Name: amCharts Export
Description: Adds export capabilities to amCharts products
Author: Benjamin Maertz, amCharts
Version: 1.3.7
Author URI: http://www.amcharts.com/

Copyright 2015 amCharts

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Please note that the above license covers only this plugin. It by all means does
not apply to any other amCharts products that are covered by different licenses.
*/

/*
 ** Polyfill translation
 */
if ( !AmCharts.translations[ "export" ] ) {
	AmCharts.translations[ "export" ] = {}
}
if ( !AmCharts.translations[ "export" ][ "en" ] ) {
	AmCharts.translations[ "export" ][ "en" ] = {
		"fallback.save.text": "CTRL + C to copy the data into the clipboard.",
		"fallback.save.image": "Rightclick -> Save picture as... to save the image.",

		"capturing.delayed.menu.label": "{{duration}}",
		"capturing.delayed.menu.title": "Click to cancel",

		"menu.label.print": "Print",
		"menu.label.undo": "Undo",
		"menu.label.redo": "Redo",
		"menu.label.cancel": "Cancel",

		"menu.label.save.image": "Download as ...",
		"menu.label.save.data": "Save as ...",

		"menu.label.draw": "Annotate ...",
		"menu.label.draw.change": "Change ...",
		"menu.label.draw.add": "Add ...",
		"menu.label.draw.shapes": "Shape ...",
		"menu.label.draw.colors": "Color ...",
		"menu.label.draw.widths": "Size ...",
		"menu.label.draw.opacities": "Opacity ...",
		"menu.label.draw.text": "Text",

		"menu.label.draw.modes": "Mode ...",
		"menu.label.draw.modes.pencil": "Pencil",
		"menu.label.draw.modes.line": "Line",
		"menu.label.draw.modes.arrow": "Arrow"
	}
}

/*
 ** Polyfill export class
 */
( function() {
	AmCharts[ "export" ] = function( chart, config ) {
		var _this = {
			name: "export",
			version: "1.3.7",
			libs: {
				async: true,
				autoLoad: true,
				reload: false,
				resources: [ {
					"pdfmake/pdfmake.js": [ "pdfmake/vfs_fonts.js" ],
					"jszip/jszip.js": [ "xlsx/xlsx.js" ]
				}, "fabric.js/fabric.js", "FileSaver.js/FileSaver.js" ]
			},
			config: {},
			setup: {
				chart: chart,
				hasBlob: false
			},
			drawing: {
				enabled: false,
				undos: [],
				redos: [],
				buffer: {
					position: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 0,
						xD: 0,
						yD: 0
					}
				},
				handler: {
					undo: function( options, skipped ) {
						var item = _this.drawing.undos.pop();
						if ( item ) {
							item.selectable = true;
							_this.drawing.redos.push( item );

							if ( item.action == "added" ) {
								_this.setup.fabric.remove( item.target );
							}

							var state = JSON.parse( item.state );
							item.target.set( state );

							if ( item.target instanceof fabric.Group ) {
								_this.drawing.handler.change( {
									color: state.cfg.color,
									width: state.cfg.width,
									opacity: state.cfg.opacity
								}, true, item.target );
							}

							_this.setup.fabric.renderAll();

							// RECALL
							if ( item.state == item.target.recentState && !skipped ) {
								_this.drawing.handler.undo( item, true );
							}
						}
					},
					redo: function( options, skipped ) {
						var item = _this.drawing.redos.pop();
						if ( item ) {
							item.selectable = true;
							_this.drawing.undos.push( item );

							if ( item.action == "added" ) {
								_this.setup.fabric.add( item.target );
							}

							var state = JSON.parse( item.state );
							item.target.recentState = item.state;
							item.target.set( state );

							if ( item.target instanceof fabric.Group ) {
								_this.drawing.handler.change( {
									color: state.cfg.color,
									width: state.cfg.width,
									opacity: state.cfg.opacity
								}, true, item.target );
							}

							_this.setup.fabric.renderAll();

							// RECALL
							if ( item.action == "addified" ) {
								_this.drawing.handler.redo();
							}
						}
					},
					done: function( options ) {
						_this.drawing.buffer.enabled = false;
						_this.drawing.undos = [];
						_this.drawing.redos = [];
						_this.createMenu( _this.config.menu );
						_this.setup.fabric.deactivateAll();
						_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas" );
						_this.setup.wrapper.style.display = "none";
					},
					add: function( options ) {
						var cfg = _this.deepMerge( {
							top: _this.setup.fabric.height / 2,
							left: _this.setup.fabric.width / 2
						}, options || {} );
						var method = cfg.url.indexOf( ".svg" ) != -1 ? fabric.loadSVGFromURL : fabric.Image.fromURL;

						method( cfg.url, function( objects, options ) {
							var group = options !== undefined ? fabric.util.groupSVGElements( objects, options ) : objects;
							var ratio = false;

							// RESCALE ONLY IF IT EXCEEDS THE CANVAS
							if ( group.height > _this.setup.fabric.height || group.width > _this.setup.fabric.width ) {
								ratio = ( _this.setup.fabric.height / 2 ) / group.height;
							}

							if ( cfg.top > _this.setup.fabric.height ) {
								cfg.top = _this.setup.fabric.height / 2;
							}

							if ( cfg.left > _this.setup.fabric.width ) {
								cfg.left = _this.setup.fabric.width / 2;
							}

							group.set( {
								originX: "center",
								originY: "center",
								top: cfg.top,
								left: cfg.left,
								width: ratio ? group.width * ratio : group.width,
								height: ratio ? group.height * ratio : group.height,
								fill: _this.drawing.color
							} );
							_this.setup.fabric.add( group );
						} );
					},
					change: function( options, skipped, target ) {
						var cfg = _this.deepMerge( {}, options || {} );
						var state, i1, rgba;
						var current = target || _this.drawing.buffer.target;
						var objects = current ? current._objects ? current._objects : [ current ] : null;

						// UPDATE DRAWING OBJECT
						if ( cfg.mode ) {
							_this.drawing.mode = cfg.mode;
						}
						if ( cfg.width ) {
							_this.drawing.width = cfg.width;
							_this.drawing.fontSize = cfg.width * 3;
						}
						if ( cfg.fontSize ) {
							_this.drawing.fontSize = cfg.fontSize;
						}
						if ( cfg.color ) {
							_this.drawing.color = cfg.color;
						}
						if ( cfg.opacity ) {
							_this.drawing.opacity = cfg.opacity;
						}

						// APPLY OPACITY ON CURRENT COLOR
						rgba = new fabric.Color( _this.drawing.color ).getSource();
						rgba.pop();
						rgba.push( _this.drawing.opacity );
						_this.drawing.color = "rgba(" + rgba.join() + ")";
						_this.setup.fabric.freeDrawingBrush.color = _this.drawing.color;
						_this.setup.fabric.freeDrawingBrush.width = _this.drawing.width;

						// UPDATE CURRENT SELECTION
						if ( current ) {
							state = JSON.parse( current.recentState ).cfg;

							// UPDATE GIVE OPTIONS ONLY
							if ( state ) {
								cfg.color = cfg.color || state.color;
								cfg.width = cfg.width || state.width;
								cfg.opacity = cfg.opacity || state.opacity;
								cfg.fontSize = cfg.fontSize || cfg.width * 3;

								rgba = new fabric.Color( cfg.color ).getSource();
								rgba.pop();
								rgba.push( cfg.opacity );
								cfg.color = "rgba(" + rgba.join() + ")";
							}

							// UPDATE OBJECTS
							for ( i1 = 0; i1 < objects.length; i1++ ) {
								if (
									objects[ i1 ] instanceof fabric.Text ||
									objects[ i1 ] instanceof fabric.PathGroup ||
									objects[ i1 ] instanceof fabric.Triangle
								) {
									if ( cfg.color || cfg.opacity ) {
										objects[ i1 ].set( {
											fill: cfg.color
										} );
									}
									if ( cfg.fontSize ) {
										objects[ i1 ].set( {
											fontSize: cfg.fontSize
										} );
									}
								} else if (
									objects[ i1 ] instanceof fabric.Path ||
									objects[ i1 ] instanceof fabric.Line
								) {
									if ( current instanceof fabric.Group ) {
										if ( cfg.color || cfg.opacity ) {
											objects[ i1 ].set( {
												stroke: cfg.color
											} );
										}
									} else {
										if ( cfg.color || cfg.opacity ) {
											objects[ i1 ].set( {
												stroke: cfg.color
											} );
										}
										if ( cfg.width ) {
											objects[ i1 ].set( {
												strokeWidth: cfg.width
											} );
										}
									}
								}
							}

							// ADD UNDO
							if ( !skipped ) {
								state = JSON.stringify( _this.deepMerge( current.saveState().originalState, {
									cfg: {
										color: cfg.color,
										width: cfg.width,
										opacity: cfg.opacity
									}
								} ) );
								current.recentState = state;
								_this.drawing.redos = [];
								_this.drawing.undos.push( {
									action: "modified",
									target: current,
									state: state
								} );
							}

							_this.setup.fabric.renderAll();
						}
					},
					text: function( options ) {
						var cfg = _this.deepMerge( {
							text: _this.i18l( "menu.label.draw.text" ),
							top: _this.setup.fabric.height / 2,
							left: _this.setup.fabric.width / 2,
							fontSize: _this.drawing.fontSize,
							fontFamily: _this.setup.chart.fontFamily || "Verdana",
							fill: _this.drawing.color
						}, options || {} );

						cfg.click = function() {};

						var text = new fabric.IText( cfg.text, cfg );

						_this.setup.fabric.add( text );
						_this.setup.fabric.setActiveObject( text );

						text.selectAll();
						text.enterEditing();

						return text;
					},
					line: function( options ) {
						var cfg = _this.deepMerge( {
							x1: ( _this.setup.fabric.width / 2 ) - ( _this.setup.fabric.width / 10 ),
							x2: ( _this.setup.fabric.width / 2 ) + ( _this.setup.fabric.width / 10 ),
							y1: ( _this.setup.fabric.height / 2 ),
							y2: ( _this.setup.fabric.height / 2 ),
							angle: 90,
							strokeLineCap: _this.drawing.lineCap,
							arrow: _this.drawing.arrow,
							color: _this.drawing.color,
							width: _this.drawing.width,
							group: [],
						}, options || {} );
						var i1, arrow, arrowTop, arrowLeft;
						var line = new fabric.Line( [ cfg.x1, cfg.y1, cfg.x2, cfg.y2 ], {
							stroke: cfg.color,
							strokeWidth: cfg.width,
							strokeLineCap: cfg.strokeLineCap
						} );

						cfg.group.push( line );

						if ( cfg.arrow ) {
							cfg.angle = cfg.angle ? cfg.angle : _this.getAngle( cfg.x1, cfg.y1, cfg.x2, cfg.y2 );

							if ( cfg.arrow == "start" ) {
								arrowTop = cfg.y1 + ( cfg.width / 2 );
								arrowLeft = cfg.x1 + ( cfg.width / 2 );
							} else if ( cfg.arrow == "middle" ) {
								arrowTop = cfg.y2 + ( cfg.width / 2 ) - ( ( cfg.y2 - cfg.y1 ) / 2 );
								arrowLeft = cfg.x2 + ( cfg.width / 2 ) - ( ( cfg.x2 - cfg.x1 ) / 2 );
							} else { // arrow: end
								arrowTop = cfg.y2 + ( cfg.width / 2 );
								arrowLeft = cfg.x2 + ( cfg.width / 2 );
							}

							arrow = new fabric.Triangle( {
								top: arrowTop,
								left: arrowLeft,
								fill: cfg.color,
								height: cfg.width * 7,
								width: cfg.width * 7,
								angle: cfg.angle,
								originX: "center",
								originY: "bottom"
							} );
							cfg.group.push( arrow );
						}

						if ( cfg.action != "config" ) {
							if ( cfg.arrow ) {
								var group = new fabric.Group( cfg.group );
								group.set( {
									cfg: cfg,
									fill: cfg.color,
									action: cfg.action,
									selectable: true,
									known: cfg.action == "change"
								} );
								if ( cfg.action == "change" ) {
									_this.setup.fabric.setActiveObject( group );
								}
								_this.setup.fabric.add( group );
								return group;
							} else {
								_this.setup.fabric.add( line );
								return line;
							}
						} else {
							for ( i1 = 0; i1 < cfg.group.length; i1++ ) {
								cfg.group[ i1 ].noUndo = true;
								_this.setup.fabric.add( cfg.group[ i1 ] );
							}
						}
						return cfg;
					}
				}
			},
			defaults: {
				position: "top-right",
				fileName: "amCharts",
				action: "download",
				path: ( ( chart.path || "" ) + "plugins/export/" ),
				formats: {
					JPG: {
						mimeType: "image/jpg",
						extension: "jpg",
						capture: true
					},
					PNG: {
						mimeType: "image/png",
						extension: "png",
						capture: true
					},
					SVG: {
						mimeType: "text/xml",
						extension: "svg",
						capture: true
					},
					PDF: {
						mimeType: "application/pdf",
						extension: "pdf",
						capture: true
					},
					CSV: {
						mimeType: "text/plain",
						extension: "csv"
					},
					JSON: {
						mimeType: "text/plain",
						extension: "json"
					},
					XLSX: {
						mimeType: "application/octet-stream",
						extension: "xlsx"
					}
				},
				fabric: {
					backgroundColor: "#FFFFFF",
					removeImages: true,
					selection: false,
					drawing: {
						enabled: true,
						arrow: "end",
						lineCap: "butt",
						mode: "pencil",
						modes: [ "pencil", "line", "arrow" ],
						color: "#000000",
						colors: [ "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF" ],
						shapes: [ "11.svg", "14.svg", "16.svg", "17.svg", "20.svg", "27.svg" ],
						width: 1,
						fontSize: 11,
						widths: [ 1, 5, 10, 15 ],
						opacity: 1,
						opacities: [ 1, 0.8, 0.6, 0.4, 0.2 ],
						menu: undefined,
						autoClose: true
					}
				},
				pdfMake: {
					pageSize: "A4",
					pageOrientation: "portrait",
					images: {},
					content: [ "Saved from:", window.location.href, {
						image: "reference",
						fit: [ 523.28, 769.89 ]
					} ]
				},
				menu: undefined,
				divId: null,
				menuReviver: null,
				menuWalker: null,
				fallback: true,
				keyListener: true,
				fileListener: true
			},

			/**
			 * Returns translated message, takes english as default
			 */
			i18l: function( key, language ) {
				var lang = language ? langugage : _this.setup.chart.language ? _this.setup.chart.language : "en";
				var catalog = AmCharts.translations[ _this.name ][ lang ] || AmCharts.translations[ _this.name ][ "en" ];

				return catalog[ key ] || key;
			},

			/**
			 * Generates download file; if unsupported offers fallback to save manually
			 */
			download: function( data, type, filename ) {
				// SAVE
				if ( window.saveAs && _this.setup.hasBlob ) {
					var blob = _this.toBlob( {
						data: data,
						type: type
					}, function( data ) {
						saveAs( data, filename );
					} );

					// FALLBACK TEXTAREA
				} else if ( _this.config.fallback && type == "text/plain" ) {
					var div = document.createElement( "div" );
					var msg = document.createElement( "div" );
					var textarea = document.createElement( "textarea" );

					msg.innerHTML = _this.i18l( "fallback.save.text" );

					div.appendChild( msg );
					div.appendChild( textarea );
					msg.setAttribute( "class", "amcharts-export-fallback-message" );
					div.setAttribute( "class", "amcharts-export-fallback" );
					_this.setup.chart.containerDiv.appendChild( div );

					// FULFILL TEXTAREA AND PRESELECT
					textarea.setAttribute( "readonly", "" );
					textarea.value = data;
					textarea.focus();
					textarea.select();

					// UPDATE MENU
					_this.createMenu( [ {
						"class": "export-main export-close",
						label: "Done",
						click: function() {
							_this.createMenu( _this.config.menu );
							_this.setup.chart.containerDiv.removeChild( div );
						}
					} ] );

					// FALLBACK IMAGE
				} else if ( _this.config.fallback && type.split( "/" )[ 0 ] == "image" ) {
					var div = document.createElement( "div" );
					var msg = document.createElement( "div" );
					var img = _this.toImage( {
						data: data
					} );

					msg.innerHTML = _this.i18l( "fallback.save.image" );

					// FULFILL TEXTAREA AND PRESELECT
					div.appendChild( msg );
					div.appendChild( img );
					msg.setAttribute( "class", "amcharts-export-fallback-message" );
					div.setAttribute( "class", "amcharts-export-fallback" );
					_this.setup.chart.containerDiv.appendChild( div );

					// UPDATE MENU
					_this.createMenu( [ {
						"class": "export-main export-close",
						label: "Done",
						click: function() {
							_this.createMenu( _this.config.menu );
							_this.setup.chart.containerDiv.removeChild( div );
						}
					} ] );

					// ERROR
				} else {
					throw new Error( "Unable to create file. Ensure saveAs (FileSaver.js) is supported." );
				}
				return data;
			},

			/**
			 * Generates script, links tags and places them into the document's head
			 * In case of reload it replaces the node to force the download
			 */
			loadResource: function( src, addons ) {
				var i1, exist, node, item, check, type;
				var url = src.indexOf( "//" ) != -1 ? src : [ _this.libs.path, src ].join( "" );

				function callback() {
					if ( addons ) {
						for ( i1 = 0; i1 < addons.length; i1++ ) {
							_this.loadResource( addons[ i1 ] );
						}
					}
				}

				if ( src.indexOf( ".js" ) != -1 ) {
					node = document.createElement( "script" );
					node.setAttribute( "type", "text/javascript" );
					node.setAttribute( "src", url );
					if ( _this.libs.async ) {
						node.setAttribute( "async", "" );
					}

				} else if ( src.indexOf( ".css" ) != -1 ) {
					node = document.createElement( "link" );
					node.setAttribute( "type", "text/css" );
					node.setAttribute( "rel", "stylesheet" );
					node.setAttribute( "href", url );
				}

				for ( i1 = 0; i1 < document.head.childNodes.length; i1++ ) {
					item = document.head.childNodes[ i1 ];
					check = item ? ( item.src || item.href ) : false;
					type = item ? item.tagName : false;

					if ( item && check && check.indexOf( src ) != -1 ) {
						if ( _this.libs.reload ) {
							document.head.removeChild( item );
						}
						exist = true;
						break;
					}
				}

				if ( !exist || _this.libs.reload ) {
					node.addEventListener( "load", callback );
					document.head.appendChild( node );
				}

			},

			/**
			 * Walker to generate the script,link tags
			 */
			loadDependencies: function() {
				var i1, i2;
				if ( _this.libs.autoLoad ) {
					for ( i1 = 0; i1 < _this.libs.resources.length; i1++ ) {
						if ( _this.libs.resources[ i1 ] instanceof Object ) {
							for ( i2 in _this.libs.resources[ i1 ] ) {
								_this.loadResource( i2, _this.libs.resources[ i1 ][ i2 ] );
							}
						} else {
							_this.loadResource( _this.libs.resources[ i1 ] );
						}
					}
				}
			},

			/**
			 * Converts string to number
			 */
			pxToNumber: function( attr, returnUndefined ) {
				if ( !attr && returnUndefined ) {
					return undefined;
				}
				return Number( String( attr ).replace( "px", "" ) ) || 0;
			},

			/**
			 * Converts number to string
			 */
			numberToPx: function( attr ) {
				return String( attr ) + "px";
			},

			/**
			 * Recursive method to merge the given objects together
			 * Overwrite flag replaces the value instead to crawl through
			 */
			deepMerge: function( a, b, overwrite ) {
				var i1, v, type = b instanceof Array ? "array" : "object";

				for ( i1 in b ) {
					// PREVENT METHODS
					if ( type == "array" && isNaN( i1 ) ) {
						continue;
					}

					v = b[ i1 ];

					// NEW
					if ( a[ i1 ] == undefined || overwrite ) {
						if ( v instanceof Array ) {
							a[ i1 ] = new Array();
						} else if ( v instanceof Function ) {
							a[ i1 ] = new Function();
						} else if ( v instanceof Date ) {
							a[ i1 ] = new Date();
						} else if ( v instanceof Object ) {
							a[ i1 ] = new Object();
						} else if ( v instanceof Number ) {
							a[ i1 ] = new Number();
						} else if ( v instanceof String ) {
							a[ i1 ] = new String();
						}
					}

					if (
						( a instanceof Object || a instanceof Array ) &&
						( v instanceof Object || v instanceof Array ) &&
						!( v instanceof Function || v instanceof Date || _this.isElement( v ) ) &&
						i1 != "chart"
					) {
						_this.deepMerge( a[ i1 ], v, overwrite );
					} else {
						if ( a instanceof Array && !overwrite ) {
							a.push( v );
						} else {
							a[ i1 ] = v;
						}
					}
				}
				return a;
			},

			/**
			 * Checks if given argument is a valid node
			 */
			isElement: function( thingy ) {
				return thingy instanceof Object && thingy && thingy.nodeType === 1;
			},

			/**
			 * Checks if given event has been thrown with pressed click / touch
			 */
			isPressed: function( event ) {
				// IE EXCEPTION
				if ( event.type == "mousemove" && event.which === 1 ) {
					// IGNORE

					// OTHERS
				} else if (
					event.type == "touchmove" ||
					event.buttons === 1 ||
					event.button === 1 ||
					event.which === 1
				) {
					_this.drawing.buffer.isPressed = true;
				} else {
					_this.drawing.buffer.isPressed = false;
				}
				return _this.drawing.buffer.isPressed;
			},

			/**
			 * Checks if given source is within the current origin
			 */
			isTainted: function( source ) {
				var origin = String( window.location.origin || window.location.protocol + "//" + window.location.hostname + ( window.location.port ? ':' + window.location.port : '' ) );

				// CHECK IF TAINTED
				if (
					source &&
					source.indexOf( "//" ) != -1 &&
					source.indexOf( origin.replace( /.*:/, "" ) ) == -1
				) {
					return true;
				}
				return false;
			},

			/*
			 ** Checks several indicators for acceptance;
			 */
			isSupported: function() {
				// CHECK CONFIG
				if ( !_this.config.enabled ) {
					return false;
				}

				// CHECK IE; ATTEMPT TO ACCESS HEAD ELEMENT
				if ( AmCharts.isIE && AmCharts.IEversion <= 9 ) {
					if ( !Array.prototype.indexOf || !document.head || _this.config.fallback === false ) {
						return false;
					}
				}
				return true;
			},


			getAngle: function( x1, y1, x2, y2 ) {
				var x = x2 - x1;
				var y = y2 - y1;
				var angle;
				if ( x == 0 ) {
					if ( y == 0 ) {
						angle = 0;
					} else if ( y > 0 ) {
						angle = Math.PI / 2;
					} else {
						angle = Math.PI * 3 / 2;
					}
				} else if ( y == 0 ) {
					if ( x > 0 ) {
						angle = 0;
					} else {
						angle = Math.PI;
					}
				} else {
					if ( x < 0 ) {
						angle = Math.atan( y / x ) + Math.PI;
					} else if ( y < 0 ) {
						angle = Math.atan( y / x ) + ( 2 * Math.PI );
					} else {
						angle = Math.atan( y / x );
					}
				}
				return angle * 180 / Math.PI;
			},

			/**
			 * Recursive method which crawls upwards to gather the requested attribute
			 */
			gatherAttribute: function( elm, attr, limit, lvl ) {
				var value, lvl = lvl ? lvl : 0,
					limit = limit ? limit : 3;
				if ( elm ) {
					value = elm.getAttribute( attr );

					if ( !value && lvl < limit ) {
						return _this.gatherAttribute( elm.parentNode, attr, limit, lvl + 1 );
					}
				}
				return value;
			},

			/**
			 * Recursive method which crawls upwards to gather the requested classname
			 */
			gatherClassName: function( elm, className, limit, lvl ) {
				var value, lvl = lvl ? lvl : 0,
					limit = limit ? limit : 3;

				if ( _this.isElement(elm) ) {
					value = ( elm.getAttribute( "class" ) || "" ).split( " " ).indexOf( className ) != -1;

					if ( !value && lvl < limit ) {
						return _this.gatherClassName( elm.parentNode, className, limit, lvl + 1 );
					} else if ( value ) {
						value = elm;
					}
				}
				return value;
			},

			/**
			 * Collects the clip-paths and patterns
			 */
			gatherElements: function( group, cfg, images ) {
				var i1, i2;
				for ( i1 = 0; i1 < group.children.length; i1++ ) {
					var childNode = group.children[ i1 ];

					// CLIPPATH
					if ( childNode.tagName == "clipPath" ) {
						for ( i2 = 0; i2 < childNode.childNodes.length; i2++ ) {
							childNode.childNodes[ i2 ].setAttribute( "fill", "transparent" );
						}
						group.clippings[ childNode.id ] = childNode;

						// PATTERN
					} else if ( childNode.tagName == "pattern" ) {
						var props = {
							node: childNode,
							source: childNode.getAttribute( "xlink:href" ),
							width: Number( childNode.getAttribute( "width" ) ),
							height: Number( childNode.getAttribute( "height" ) ),
							repeat: "repeat"
						}

						// GATHER BACKGROUND COLOR
						for ( i2 = 0; i2 < childNode.childNodes.length; i2++ ) {
							if ( childNode.childNodes[ i2 ].tagName == "rect" ) {
								props.fill = childNode.childNodes[ i2 ].getAttribute( "fill" );
							}
						}

						// TAINTED
						if ( cfg.removeImages && _this.isTainted( props.source ) ) {
							group.patterns[ childNode.id ] = props.fill ? props.fill : "transparent";
						} else {
							images.included++;

							// LOAD IMAGE MANUALLY; TO RERENDER THE CANVAS
							fabric.Image.fromURL( props.source, ( function( props ) {
								return function( img ) {
									images.loaded++;

									var patternSourceCanvas = new fabric.StaticCanvas( undefined, {
										backgroundColor: props.fill
									} );
									patternSourceCanvas.add( img );

									var pattern = new fabric.Pattern( {
										source: function() {
											patternSourceCanvas.setDimensions( {
												width: props.width,
												height: props.height
											} );
											return patternSourceCanvas.getElement();
										},
										repeat: 'repeat'
									} );

									group.patterns[ props.node.id ] = pattern;
								}
							} )( props ) );
						}

						// IMAGES
					} else if ( childNode.tagName == "image" ) {
						images.included++;

						// LOAD IMAGE MANUALLY; TO RERENDER THE CANVAS
						fabric.Image.fromURL( childNode.getAttribute( "xlink:href" ), function( img ) {
							images.loaded++;
						} );
					}
				}
				return group;
			},

			/*
			 ** GATHER MOUSE POSITION;
			 */
			gatherPosition: function( event, type ) {
				var ref = _this.drawing.buffer.position;
				var ivt = fabric.util.invertTransform( _this.setup.fabric.viewportTransform );
				var pos;

				if ( event.type == "touchmove" ) {
					if ( "touches" in event ) {
						event = event.touches[ 0 ];
					} else if ( "changedTouches" in event ) {
						event = event.changedTouches[ 0 ];
					}
				}

				pos = fabric.util.transformPoint( _this.setup.fabric.getPointer( event, true ), ivt );

				if ( type == 1 ) {
					ref.x1 = pos.x;
					ref.y1 = pos.y;
				}

				ref.x2 = pos.x;
				ref.y2 = pos.y;
				ref.xD = ( ref.x1 - ref.x2 ) < 0 ? ( ref.x1 - ref.x2 ) * -1 : ( ref.x1 - ref.x2 );
				ref.yD = ( ref.y1 - ref.y2 ) < 0 ? ( ref.y1 - ref.y2 ) * -1 : ( ref.y1 - ref.y2 );

				return ref;
			},

			/**
			 * Method to capture the current state of the chart
			 */
			capture: function( options, callback ) {
				var i1;
				var cfg = _this.deepMerge( _this.deepMerge( {}, _this.config.fabric ), options || {} );
				var groups = [];
				var offset = {
					x: 0,
					y: 0,
					pX: 0,
					pY: 0,
					width: _this.setup.chart.divRealWidth,
					height: _this.setup.chart.divRealHeight
				};
				var images = {
					loaded: 0,
					included: 0
				}

				// GATHER SVGS
				var svgs = _this.setup.chart.containerDiv.getElementsByTagName( "svg" );
				for ( i1 = 0; i1 < svgs.length; i1++ ) {
					var group = {
						svg: svgs[ i1 ],
						parent: svgs[ i1 ].parentNode,
						children: svgs[ i1 ].getElementsByTagName( "*" ),
						offset: {
							x: 0,
							y: 0
						},
						patterns: {},
						clippings: {}
					}

					// GATHER ELEMENTS
					group = _this.gatherElements( group, cfg, images );

					// APPEND GROUP
					groups.push( group );
				}

				// GATHER EXTERNAL LEGEND
				if ( _this.config.legend && _this.setup.chart.legend && _this.setup.chart.legend.position == "outside" ) {
					var group = {
						svg: _this.setup.chart.legend.container.container,
						parent: _this.setup.chart.legend.container.container.parentNode,
						children: _this.setup.chart.legend.container.container.getElementsByTagName( "*" ),
						offset: {
							x: 0,
							y: 0
						},
						legend: {
							type: [ "top", "left" ].indexOf( _this.config.legend.position ) != -1 ? "unshift" : "push",
							position: _this.config.legend.position,
							width: _this.config.legend.width ? _this.config.legend.width : _this.setup.chart.legend.container.width,
							height: _this.config.legend.height ? _this.config.legend.height : _this.setup.chart.legend.container.height
						},
						patterns: {},
						clippings: {}
					}

					// ADAPT CANVAS DIMENSIONS
					if ( [ "left", "right" ].indexOf( group.legend.position ) != -1 ) {
						offset.width += group.legend.width;
						offset.height = group.legend.height > offset.height ? group.legend.height : offset.height;
					} else if ( [ "top", "bottom" ].indexOf( group.legend.position ) != -1 ) {
						offset.height += group.legend.height;
					}

					// GATHER ELEMENTS
					group = _this.gatherElements( group, cfg, images );

					// PRE/APPEND SVG
					groups[ group.legend.type ]( group );
				}

				// CLEAR IF EXIST
				_this.drawing.buffer.enabled = cfg.action == "draw";

				if ( !_this.setup.wrapper ) {
					_this.setup.wrapper = document.createElement( "div" );
					_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas" );
					_this.setup.chart.containerDiv.appendChild( _this.setup.wrapper );
				} else {
					_this.setup.wrapper.innerHTML = "";
				}

				// STOCK CHART; SELECTOR OFFSET
				if ( _this.setup.chart.type == "stock" ) {
					var padding = {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}
					if ( _this.setup.chart.leftContainer ) {
						offset.width -= _this.setup.chart.leftContainer.offsetWidth;
						padding.left = _this.setup.chart.leftContainer.offsetWidth + ( _this.setup.chart.panelsSettings.panelSpacing * 2 );
					}
					if ( _this.setup.chart.rightContainer ) {
						offset.width -= _this.setup.chart.rightContainer.offsetWidth;
						padding.right = _this.setup.chart.rightContainer.offsetWidth + ( _this.setup.chart.panelsSettings.panelSpacing * 2 );
					}
					if ( _this.setup.chart.periodSelector && [ "top", "bottom" ].indexOf( _this.setup.chart.periodSelector.position ) != -1 ) {
						offset.height -= _this.setup.chart.periodSelector.offsetHeight + _this.setup.chart.panelsSettings.panelSpacing;
						padding[ _this.setup.chart.periodSelector.position ] += _this.setup.chart.periodSelector.offsetHeight + _this.setup.chart.panelsSettings.panelSpacing;
					}
					if ( _this.setup.chart.dataSetSelector && [ "top", "bottom" ].indexOf( _this.setup.chart.dataSetSelector.position ) != -1 ) {
						offset.height -= _this.setup.chart.dataSetSelector.offsetHeight;
						padding[ _this.setup.chart.dataSetSelector.position ] += _this.setup.chart.dataSetSelector.offsetHeight;
					}

					// APPLY OFFSET ON WRAPPER
					_this.setup.wrapper.style.paddingTop = _this.numberToPx( padding.top );
					_this.setup.wrapper.style.paddingRight = _this.numberToPx( padding.right );
					_this.setup.wrapper.style.paddingBottom = _this.numberToPx( padding.bottom );
					_this.setup.wrapper.style.paddingLeft = _this.numberToPx( padding.left );
				}

				// CREATE CANVAS
				_this.setup.canvas = document.createElement( "canvas" );
				_this.setup.wrapper.appendChild( _this.setup.canvas );
				_this.setup.fabric = new fabric.Canvas( _this.setup.canvas, _this.deepMerge( {
					width: offset.width,
					height: offset.height,
					isDrawingMode: true
				}, cfg ) );

				// REAPPLY FOR SOME REASON
				_this.deepMerge( _this.setup.fabric, cfg );
				_this.deepMerge( _this.setup.fabric.freeDrawingBrush, cfg.drawing );

				// RELIABLE VARIABLES; UPDATE DRAWING
				_this.deepMerge( _this.drawing, cfg.drawing );
				_this.drawing.handler.change( cfg.drawing );

				// OBSERVE MOUSE EVENTS
				_this.setup.fabric.on( "mouse:down", function( e ) {
					var p = _this.gatherPosition( e.e, 1 );
					_this.drawing.buffer.pressedTS = Number( new Date() );
					_this.isPressed( e.e );
				} );
				_this.setup.fabric.on( "mouse:move", function( e ) {
					var p = _this.gatherPosition( e.e, 2 );
					_this.isPressed( e.e );

					// CREATE INITIAL LINE / ARROW; JUST ON LEFT CLICK
					if ( _this.drawing.buffer.isPressed && !_this.drawing.buffer.line ) {
						if ( !_this.drawing.buffer.isSelected && _this.drawing.mode != "pencil" && ( p.xD > 5 || p.xD > 5 ) ) {
							_this.drawing.buffer.hasLine = true;
							_this.setup.fabric.isDrawingMode = false;
							_this.setup.fabric._onMouseUpInDrawingMode( e );
							_this.drawing.buffer.line = _this.drawing.handler.line( {
								x1: p.x1,
								y1: p.y1,
								x2: p.x2,
								y2: p.y2,
								arrow: _this.drawing.mode == "line" ? false : _this.drawing.arrow,
								action: "config"
							} );
						}
					}

					// UPDATE LINE / ARROW
					if ( _this.drawing.buffer.line ) {
						var obj, top, left;
						var l = _this.drawing.buffer.line;

						l.x2 = p.x2;
						l.y2 = p.y2;

						for ( i1 = 0; i1 < l.group.length; i1++ ) {
							obj = l.group[ i1 ];

							if ( obj instanceof fabric.Line ) {
								obj.set( {
									x2: l.x2,
									y2: l.y2
								} );
							} else if ( obj instanceof fabric.Triangle ) {
								l.angle = ( _this.getAngle( l.x1, l.y1, l.x2, l.y2 ) + 90 );

								if ( l.arrow == "start" ) {
									top = l.y1 + ( l.width / 2 );
									left = l.x1 + ( l.width / 2 );
								} else if ( l.arrow == "middle" ) {
									top = l.y2 + ( l.width / 2 ) - ( ( l.y2 - l.y1 ) / 2 );
									left = l.x2 + ( l.width / 2 ) - ( ( l.x2 - l.x1 ) / 2 );
								} else { // arrow: end
									top = l.y2 + ( l.width / 2 );
									left = l.x2 + ( l.width / 2 );
								}

								obj.set( {
									top: top,
									left: left,
									angle: l.angle
								} );
							}
						}
						_this.setup.fabric.renderAll();
					}
				} );
				_this.setup.fabric.on( "mouse:up", function( e ) {
					// SELECT TARGET
					if ( Number( new Date() ) - _this.drawing.buffer.pressedTS < 200 ) {
						var target = _this.setup.fabric.findTarget( e.e );
						if ( target && target.selectable ) {
							_this.setup.fabric.setActiveObject( target );
						}
					}

					// UPDATE LINE / ARROW
					if ( _this.drawing.buffer.line ) {
						for ( i1 = 0; i1 < _this.drawing.buffer.line.group.length; i1++ ) {
							_this.drawing.buffer.line.group[ i1 ].remove();
						}
						delete _this.drawing.buffer.line.action;
						delete _this.drawing.buffer.line.group;
						_this.drawing.handler.line( _this.drawing.buffer.line );
					}
					_this.drawing.buffer.line = false;
					_this.drawing.buffer.hasLine = false;
					_this.drawing.buffer.isPressed = false;
				} );

				// OBSERVE OBJECT SELECTION
				_this.setup.fabric.on( "object:selected", function( e ) {
					_this.drawing.buffer.isSelected = true;
					_this.drawing.buffer.target = e.target;
					_this.setup.fabric.isDrawingMode = false;
				} );
				_this.setup.fabric.on( "selection:cleared", function( e ) {
					_this.drawing.buffer.onMouseDown = _this.setup.fabric.freeDrawingBrush.onMouseDown;
					_this.drawing.buffer.target = false;

					// FREEHAND WORKAROUND
					if ( _this.drawing.buffer.isSelected ) {
						_this.setup.fabric._isCurrentlyDrawing = false;
						_this.setup.fabric.freeDrawingBrush.onMouseDown = function() {};
					}

					// DELAYED DESELECTION TO PREVENT DRAWING
					setTimeout( function() {
						_this.drawing.buffer.isSelected = false;
						_this.setup.fabric.isDrawingMode = true;
						_this.setup.fabric.freeDrawingBrush.onMouseDown = _this.drawing.buffer.onMouseDown;
					}, 10 );
				} );
				_this.setup.fabric.on( "path:created", function( e ) {
					var item = e.path;
					if ( Number( new Date() ) - _this.drawing.buffer.pressedTS < 200 || _this.drawing.buffer.hasLine ) {
						_this.setup.fabric.remove( item );
						_this.setup.fabric.renderAll();
						return;
					}
				} );

				// OBSERVE OBJECT MODIFICATIONS
				_this.setup.fabric.on( "object:added", function( e ) {
					var item = e.target;
					var state = _this.deepMerge( item.saveState().originalState, {
						cfg: {
							color: _this.drawing.color,
							width: _this.drawing.width,
							opacity: _this.drawing.opacity,
							fontSize: _this.drawing.fontSize
						}
					} );

					if ( Number( new Date() ) - _this.drawing.buffer.pressedTS < 200 && !item.noUndo ) {
						_this.setup.fabric.remove( item );
						_this.setup.fabric.renderAll();
						return;
					}

					state = JSON.stringify( state );
					item.recentState = state;

					if ( item.selectable && !item.known && !item.noUndo ) {
						_this.drawing.undos.push( {
							action: "added",
							target: item,
							state: state
						} );
						_this.drawing.undos.push( {
							action: "addified",
							target: item,
							state: state
						} );
						_this.drawing.redos = [];
					}

					item.known = true;
					_this.setup.fabric.isDrawingMode = true;
				} );
				_this.setup.fabric.on( "object:modified", function( e ) {
					var item = e.target;
					var recentState = JSON.parse( item.recentState );
					var state = _this.deepMerge( item.saveState().originalState, {
						cfg: recentState.cfg
					} );

					state = JSON.stringify( state );
					item.recentState = state;

					_this.drawing.undos.push( {
						action: "modified",
						target: item,
						state: state
					} );

					_this.drawing.redos = [];
				} );
				_this.setup.fabric.on( "text:changed", function( e ) {
					var item = e.target;
					clearTimeout( item.timer );
					item.timer = setTimeout( function() {
						var state = JSON.stringify( item.saveState().originalState );

						item.recentState = state;

						_this.drawing.redos = [];
						_this.drawing.undos.push( {
							action: "modified",
							target: item,
							state: state
						} );
					}, 250 );
				} );

				// DRAWING
				if ( _this.drawing.buffer.enabled ) {
					_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas active" );
					_this.setup.wrapper.style.backgroundColor = cfg.backgroundColor;
					_this.setup.wrapper.style.display = "block";

				} else {
					_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas" );
					_this.setup.wrapper.style.display = "none";
				}

				for ( i1 = 0; i1 < groups.length; i1++ ) {
					var group = groups[ i1 ];
					var isLegend = _this.gatherClassName( group.parent, _this.setup.chart.classNamePrefix + "-legend-div", 1 );
					var isPanel = _this.gatherClassName( group.parent, _this.setup.chart.classNamePrefix + "-stock-panel-div" );
					var isScrollbar = _this.gatherClassName( group.parent, _this.setup.chart.classNamePrefix + "-scrollbar-chart-div" );

					// STOCK CHART; SVG OFFSET;; SVG OFFSET
					if ( _this.setup.chart.type == "stock" && _this.setup.chart.legendSettings.position ) {

						// TOP / BOTTOM
						if ( [ "top", "bottom" ].indexOf( _this.setup.chart.legendSettings.position ) != -1 ) {

							// POSITION; ABSOLUTE
							if ( group.parent.style.top && group.parent.style.left ) {
								group.offset.y = _this.pxToNumber( group.parent.style.top );
								group.offset.x = _this.pxToNumber( group.parent.style.left );

								// POSITION; RELATIVE
							} else {
								group.offset.x = offset.x;
								group.offset.y = offset.y;
								offset.y += _this.pxToNumber( group.parent.style.height );

								// LEGEND; OFFSET
								if ( isPanel ) {
									offset.pY = _this.pxToNumber( isPanel.style.marginTop );
									group.offset.y += offset.pY;

									// SCROLLBAR; OFFSET
								} else if ( isScrollbar ) {
									group.offset.y += offset.pY;
								}
							}

							// LEFT / RIGHT
						} else if ( [ "left", "right" ].indexOf( _this.setup.chart.legendSettings.position ) != -1 ) {
							group.offset.y = _this.pxToNumber( group.parent.style.top ) + offset.pY;
							group.offset.x = _this.pxToNumber( group.parent.style.left ) + offset.pX;

							// LEGEND; OFFSET
							if ( isLegend ) {
								offset.pY += _this.pxToNumber( isPanel.style.height ) + _this.setup.chart.panelsSettings.panelSpacing;

								// SCROLLBAR; OFFSET
							} else if ( isScrollbar ) {
								group.offset.y -= _this.setup.chart.panelsSettings.panelSpacing;
							}
						}

						// REGULAR CHARTS; SVG OFFSET
					} else {
						// POSITION; ABSOLUTE
						if ( group.parent.style.position == "absolute"  ) {
							group.offset.absolute = true;
							group.offset.top = _this.pxToNumber(group.parent.style.top);
							group.offset.right = _this.pxToNumber(group.parent.style.right,true);
							group.offset.bottom = _this.pxToNumber(group.parent.style.bottom,true);
							group.offset.left = _this.pxToNumber(group.parent.style.left);
							group.offset.width = _this.pxToNumber(group.parent.style.width);
							group.offset.height = _this.pxToNumber(group.parent.style.height);

						// POSITION; RELATIVE
						} else if ( group.parent.style.top && group.parent.style.left ) {
							group.offset.y = _this.pxToNumber( group.parent.style.top );
							group.offset.x = _this.pxToNumber( group.parent.style.left );

							// POSITION; GENERIC
						} else {

							// EXTERNAL LEGEND
							if ( group.legend ) {
								if ( group.legend.position == "left" ) {
									offset.x += group.legend.width;
								} else if ( group.legend.position == "right" ) {
									group.offset.x += offset.width - group.legend.width;
								} else if ( group.legend.position == "top" ) {
									offset.y += group.legend.height;
								} else if ( group.legend.position == "bottom" ) {
									group.offset.y += offset.height - group.legend.height; // OFFSET.Y
								}

								// NORMAL
							} else {
								group.offset.x = offset.x;
								group.offset.y = offset.y + offset.pY;
								offset.y += _this.pxToNumber( group.parent.style.height );
							}
						}

						// PANEL
						if ( isLegend && isPanel && isPanel.style.marginTop ) {
							offset.y += _this.pxToNumber( isPanel.style.marginTop );
							group.offset.y += _this.pxToNumber( isPanel.style.marginTop );
						}
					}

					// BEFORE CAPTURING
					_this.handleCallback( cfg.beforeCapture, cfg );

					// ADD TO CANVAS
					fabric.parseSVGDocument( group.svg, ( function( group ) {
						return function( objects, options ) {
							var i1;
							var g = fabric.util.groupSVGElements( objects, options );
							var tmp = {
								selectable: false
							};

							if ( group.offset.absolute ) {
								if ( group.offset.bottom !== undefined ) {
									tmp.top = offset.height - group.offset.height - group.offset.bottom;
								} else {
									tmp.top = group.offset.top;
								}

								if ( group.offset.right !== undefined ) {
									tmp.left = offset.width - group.offset.width - group.offset.right;
								} else {
									tmp.left = group.offset.left;
								}

							} else {
								tmp.top = group.offset.y;
								tmp.left = group.offset.x;
							}

							for ( i1 = 0; i1 < g.paths.length; i1++ ) {

								// OPACITY; TODO: DISTINGUISH OPACITY TYPES
								if ( g.paths[ i1 ] ) {

									// CHECK ORIGIN; REMOVE TAINTED
									if ( cfg.removeImages && _this.isTainted( g.paths[ i1 ][ "xlink:href" ] ) ) {
										g.paths.splice( i1, 1 );
										continue;
									}

									// SET OPACITY
									if ( g.paths[ i1 ].fill instanceof Object ) {

										// MISINTERPRETATION OF FABRIC
										if ( g.paths[ i1 ].fill.type == "radial" ) {
											g.paths[ i1 ].fill.coords.r2 = g.paths[ i1 ].fill.coords.r1 * -1;
											g.paths[ i1 ].fill.coords.r1 = 0;
										}

										g.paths[ i1 ].set( {
											opacity: g.paths[ i1 ].fillOpacity
										} );

										// PATTERN; TODO: DISTINGUISH OPACITY TYPES
									} else if ( String( g.paths[ i1 ].fill ).slice( 0, 3 ) == "url" ) {
										var PID = g.paths[ i1 ].fill.slice( 5, -1 );
										if ( group.patterns && group.patterns[ PID ] ) {
											g.paths[ i1 ].set( {
												fill: group.patterns[ PID ],
												opacity: g.paths[ i1 ].fillOpacity
											} );
										}
									}

									// CLIPPATH;
									if ( String( g.paths[ i1 ].clipPath ).slice( 0, 3 ) == "url" ) {
										var PID = g.paths[ i1 ].clipPath.slice( 5, -1 );

										if ( group.clippings[ PID ] ) {
											var mask = group.clippings[ PID ].childNodes[ 0 ];
											var transform = g.paths[ i1 ].svg.getAttribute( "transform" ) || "translate(0,0)";

											transform = transform.slice( 10, -1 ).split( "," );

											g.paths[ i1 ].set( {
												clipTo: ( function( mask, transform ) {
													return function( ctx ) {
														var width = Number( mask.getAttribute( "width" ) || "0" );
														var height = Number( mask.getAttribute( "height" ) || "0" );
														var x = Number( mask.getAttribute( "x" ) || "0" );
														var y = Number( mask.getAttribute( "y" ) || "0" );

														ctx.rect( Number( transform[ 0 ] ) * -1 + x, Number( transform[ 1 ] ) * -1 + y, width, height );
													}
												} )( mask, transform )
											} );
										}
									}

									// TODO; WAIT FOR TSPAN SUPPORT FROM FABRICJS SIDE
									if ( g.paths[ i1 ].originalBBox ) {
										var bb = g.paths[ i1 ].originalBBox;
										if ( g.paths[ i1 ].textAlign == "left" ) {
											g.paths[ i1 ].set( {
												left: bb.left + ( g.paths[ i1 ].width / 2 )
											} );
										} else {
											g.paths[ i1 ].set( {
												left: bb.left - ( g.paths[ i1 ].width / 2 )
											} );
										}
									}
								}
							}

							g.set( tmp );

							_this.setup.fabric.add( g );

							// ADD BALLOONS
							if ( group.svg.parentNode && group.svg.parentNode.getElementsByTagName ) {
								var balloons = group.svg.parentNode.getElementsByClassName( _this.setup.chart.classNamePrefix + "-balloon-div" );
								for ( i1 = 0; i1 < balloons.length; i1++ ) {
									if ( cfg.balloonFunction instanceof Function ) {
										cfg.balloonFunction.apply( _this, [ balloons[ i1 ], group ] );
									} else {
										var parent = balloons[ i1 ];
										var text = parent.childNodes[ 0 ];
										var label = new fabric.Text( text.innerText || text.innerHTML, {
											fontSize: _this.pxToNumber( text.style.fontSize ),
											fontFamily: text.style.fontFamily,
											fill: text.style.color,
											top: _this.pxToNumber( parent.style.top ) + group.offset.y,
											left: _this.pxToNumber( parent.style.left ) + group.offset.x,
											selectable: false
										} );

										_this.setup.fabric.add( label );
									}
								}
							}
							if ( group.svg.nextSibling && group.svg.nextSibling.tagName == "A" ) {
								var label = new fabric.Text( group.svg.nextSibling.innerText || group.svg.nextSibling.innerHTML, {
									fontSize: _this.pxToNumber( group.svg.nextSibling.style.fontSize ),
									fontFamily: group.svg.nextSibling.style.fontFamily,
									fill: group.svg.nextSibling.style.color,
									top: _this.pxToNumber( group.svg.nextSibling.style.top ) + group.offset.y,
									left: _this.pxToNumber( group.svg.nextSibling.style.left ) + group.offset.x,
									selectable: false
								} );
								_this.setup.fabric.add( label );
							}

							groups.pop();

							// TRIGGER CALLBACK WITH SAFETY DELAY
							if ( !groups.length ) {
								var timer = setInterval( function() {
									if ( images.loaded == images.included ) {
										clearTimeout( timer );
										_this.handleCallback( cfg.afterCapture, cfg );
										_this.setup.fabric.renderAll();
										_this.handleCallback( callback, cfg );
									}
								}, AmCharts.updateRate );
							}
						}

						// IDENTIFY ELEMENTS THROUGH CLASSNAMES
					} )( group ), function( svg, obj ) {
						var i1;
						var className = _this.gatherAttribute( svg, "class" );
						var visibility = _this.gatherAttribute( svg, "visibility" );
						var clipPath = _this.gatherAttribute( svg, "clip-path" );

						obj.className = String( className );
						obj.classList = String( className ).split( " " );
						obj.clipPath = clipPath;
						obj.svg = svg;

						// TODO; WAIT FOR TSPAN SUPPORT FROM FABRICJS SIDE
						if ( svg.tagName == "text" && svg.childNodes.length > 1 ) {
							var lines = [];
							var textAnchor = svg.getAttribute( "text-anchor" ) || "left";
							var anchorMap = {
								"start": "left",
								"middle": "center",
								"end": "right"
							}

							for ( i1 = 0; i1 < svg.childNodes.length; i1++ ) {
								lines.push( svg.childNodes[ i1 ].textContent );
							}

							if ( textAnchor != "middle" ) {
								obj.originalBBox = obj.getBoundingRect();
							}
							obj.set( {
								lineHeight: 1.05,
								top: obj.top + obj.height - ( obj.fontSize * ( 0.18 + obj._fontSizeFraction ) / 2 ),
								text: lines.join( "\n" ),
								textAlign: anchorMap[ textAnchor ],
								selectable: false
							} );
						}

						// HIDE HIDDEN ELEMENTS; TODO: FIND A BETTER WAY TO HANDLE THAT
						if ( visibility == "hidden" ) {
							obj.opacity = 0;

							// WALKTHROUGH ELEMENTS
						} else {

							// TRANSPORT FILL/STROKE OPACITY
							var attrs = [ "fill", "stroke" ];
							for ( i1 = 0; i1 < attrs.length; i1++ ) {
								var attr = attrs[ i1 ]
								var attrVal = String( svg.getAttribute( attr ) || "" );
								var attrOpacity = Number( svg.getAttribute( attr + "-opacity" ) || "1" );
								var attrRGBA = fabric.Color.fromHex( attrVal ).getSource();

								// EXCEPTION
								if ( obj.classList.indexOf( _this.setup.chart.classNamePrefix + "-guide-fill" ) != -1 && !attrVal ) {
									attrOpacity = 0;
									attrRGBA = fabric.Color.fromHex( "#000000" ).getSource();
								}

								if ( attrRGBA ) {
									attrRGBA.pop();
									attrRGBA.push( attrOpacity )
									obj[ attr ] = "rgba(" + attrRGBA.join() + ")";
									obj[ attr + _this.capitalize( "opacity" ) ] = attrOpacity;
								}
							}
						}

						// REVIVER
						_this.handleCallback( cfg.reviver, obj, svg );
					} );
				}
			},

			/**
			 * Returns the current canvas
			 */
			toCanvas: function( options, callback ) {
				var cfg = _this.deepMerge( {
					// NUFFIN
				}, options || {} );
				var data = _this.setup.canvas;

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Returns an image; by default PNG
			 */
			toImage: function( options, callback ) {
				var cfg = _this.deepMerge( {
					format: "png",
					quality: 1,
					multiplier: 1
				}, options || {} );
				var data = cfg.data;
				var img = document.createElement( "img" );

				if ( !cfg.data ) {
					if ( cfg.lossless || cfg.format == "svg" ) {
						data = _this.toSVG( _this.deepMerge( cfg, {
							getBase64: true
						} ) );
					} else {
						data = _this.setup.fabric.toDataURL( cfg );
					}
				}

				img.setAttribute( "src", data );

				_this.handleCallback( callback, img );

				return img;
			},

			/**
			 * Generates a blob instance image; returns base64 datastring
			 */
			toBlob: function( options, callback ) {
				var cfg = _this.deepMerge( {
					data: "empty",
					type: "text/plain"
				}, options || {} );
				var data;
				var isBase64 = /^data:.+;base64,(.*)$/.exec( cfg.data );

				// GATHER BODY
				if ( isBase64 ) {
					cfg.data = isBase64[ 0 ];
					cfg.type = cfg.data.slice( 5, cfg.data.indexOf( "," ) - 7 );
					cfg.data = _this.toByteArray( {
						data: cfg.data.slice( cfg.data.indexOf( "," ) + 1, cfg.data.length )
					} );
				}

				if ( cfg.getByteArray ) {
					data = cfg.data;
				} else {
					data = new Blob( [ cfg.data ], {
						type: cfg.type
					} );
				}

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates JPG image; returns base64 datastring
			 */
			toJPG: function( options, callback ) {
				var cfg = _this.deepMerge( {
					format: "jpeg",
					quality: 1,
					multiplier: 1
				}, options || {} );
				cfg.format = cfg.format.toLowerCase();
				var data = _this.setup.fabric.toDataURL( cfg );

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates PNG image; returns base64 datastring
			 */
			toPNG: function( options, callback ) {
				var cfg = _this.deepMerge( {
					format: "png",
					quality: 1,
					multiplier: 1
				}, options || {} );
				var data = _this.setup.fabric.toDataURL( cfg );

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates SVG image; returns base64 datastring
			 */
			toSVG: function( options, callback ) {
				var cfg = _this.deepMerge( {
					reviver: function( string ) {
						var matcher = new RegExp( /\bstyle=(['"])(.*?)\1/ );
						var match = matcher.exec( string )[ 0 ].slice( 7, -1 );
						var styles = match.split( ";" );
						var replacement = [];

						for ( i1 = 0; i1 < styles.length; i1++ ) {
							if ( styles[ i1 ] ) {
								var pair = styles[ i1 ].replace( /\s/g, "" ).split( ":" );
								var key = pair[ 0 ];
								var value = pair[ 1 ];

								if ( [ "fill", "stroke" ].indexOf( key ) != -1 ) {
									value = fabric.Color.fromRgba( value );
									if ( value && value._source ) {
										var color = "#" + value.toHex();
										var opacity = value._source[ 3 ];

										replacement.push( [ key, color ].join( ":" ) );
										replacement.push( [ key + "-opacity", opacity ].join( ":" ) );
									} else {
										replacement.push( styles[ i1 ] );
									}
								} else if ( key != "opactiy" ) {
									replacement.push( styles[ i1 ] );
								}
							}
						}

						return string.replace( match, replacement.join( ";" ) );
					}
				}, options || {} );
				var data = _this.setup.fabric.toSVG( cfg, cfg.reviver );

				if ( cfg.getBase64 ) {
					data = "data:image/svg+xml;base64," + btoa( data );
				}

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates PDF; returns base64 datastring
			 */
			toPDF: function( options, callback ) {
				var cfg = _this.deepMerge( _this.deepMerge( {
					multiplier: 2
				}, _this.config.pdfMake ), options || {}, true );
				cfg.images.reference = _this.toPNG( cfg );
				var data = new pdfMake.createPdf( cfg );

				if ( callback ) {
					data.getDataUrl( ( function( callback ) {
						return function() {
							callback.apply( _this, arguments );
						}
					} )( callback ) );
				}

				return data;
			},

			/**
			 * Generates an image; hides all elements on page to trigger native print method
			 */
			toPRINT: function( options, callback ) {
				var i1;
				var cfg = _this.deepMerge( {
					delay: 1,
					lossless: false
				}, options || {} );
				var data = _this.toImage( cfg );
				var states = [];
				var items = document.body.childNodes;

				data.setAttribute( "style", "width: 100%; max-height: 100%;" );

				for ( i1 = 0; i1 < items.length; i1++ ) {
					if ( _this.isElement( items[ i1 ] ) ) {
						states[ i1 ] = items[ i1 ].style.display;
						items[ i1 ].style.display = "none";
					}
				}

				document.body.appendChild( data );
				window.print();

				setTimeout( function() {
					for ( i1 = 0; i1 < items.length; i1++ ) {
						if ( _this.isElement( items[ i1 ] ) ) {
							items[ i1 ].style.display = states[ i1 ];
						}
					}
					document.body.removeChild( data );
					_this.handleCallback( callback, data );
				}, cfg.delay );

				return data;
			},

			/**
			 * Generates JSON string
			 */
			toJSON: function( options, callback ) {
				var cfg = _this.deepMerge( {
					dateFormat: _this.config.dateFormat || "dateObject",
				}, options || {}, true );
				cfg.data = cfg.data ? cfg.data : _this.getChartData( cfg );
				var data = JSON.stringify( cfg.data, undefined, "\t" );

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates CSV string
			 */
			toCSV: function( options, callback ) {
				var row, col;
				var cfg = _this.deepMerge( {
					data: _this.getChartData( options ),
					delimiter: ",",
					quotes: true,
					escape: true
				}, options || {}, true );
				var data = "";
				var cols = [];
				var buffer = [];

				function enchant( value, column ) {

					// STRING
					if ( typeof value === "string" ) {
						value = value;
					}

					// WRAP IN QUOTES				
					if ( typeof value === "string" ) {
						if ( cfg.escape ) {
							value = value.replace( '"', '""' );
						}
						if ( cfg.quotes ) {
							value = [ '"', value, '"' ].join( "" );
						}
					}

					return value;
				}

				// HEADER
				for ( value in cfg.data[ 0 ] ) {
					buffer.push( enchant( value ) );
					cols.push( value );
				}
				data += buffer.join( cfg.delimiter ) + "\n";

				// BODY
				for ( row in cfg.data ) {
					buffer = [];
					if ( !isNaN( row ) ) {
						for ( col in cols ) {
							if ( !isNaN( col ) ) {
								var column = cols[ col ];
								var value = cfg.data[ row ][ column ];

								buffer.push( enchant( value, column ) );
							}
						}
						data += buffer.join( cfg.delimiter ) + "\n";
					}
				}

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates excel sheet; returns base64 datastring
			 */
			toXLSX: function( options, callback ) {
				var cfg = _this.deepMerge( {
					name: "amCharts",
					dateFormat: _this.config.dateFormat || "dateObject",
					withHeader: true,
					stringify: false
				}, options || {}, true );
				var data = "";
				var wb = {
					SheetNames: [],
					Sheets: {}
				}

				cfg.data = cfg.data ? cfg.data : _this.getChartData( cfg );

				function datenum( v, date1904 ) {
					if ( date1904 ) v += 1462;
					var epoch = Date.parse( v );
					return ( epoch - new Date( Date.UTC( 1899, 11, 30 ) ) ) / ( 24 * 60 * 60 * 1000 );
				}

				function sheet_from_array_of_arrays( data, opts ) {
					var ws = {};
					var range = {
						s: {
							c: 10000000,
							r: 10000000
						},
						e: {
							c: 0,
							r: 0
						}
					};
					for ( var R = 0; R != data.length; ++R ) {
						for ( var C = 0; C != data[ R ].length; ++C ) {
							if ( range.s.r > R ) range.s.r = R;
							if ( range.s.c > C ) range.s.c = C;
							if ( range.e.r < R ) range.e.r = R;
							if ( range.e.c < C ) range.e.c = C;
							var cell = {
								v: data[ R ][ C ]
							};
							if ( cell.v == null ) continue;
							var cell_ref = XLSX.utils.encode_cell( {
								c: C,
								r: R
							} );

							if ( typeof cell.v === "number" ) cell.t = "n";
							else if ( typeof cell.v === "boolean" ) cell.t = "b";
							else if ( cell.v instanceof Date ) {
								cell.t = "n";
								cell.z = XLSX.SSF._table[ 14 ];
								cell.v = datenum( cell.v );
							} else cell.t = "s";

							ws[ cell_ref ] = cell;
						}
					}
					if ( range.s.c < 10000000 ) ws[ "!ref" ] = XLSX.utils.encode_range( range );
					return ws;
				}

				wb.SheetNames.push( cfg.name );
				wb.Sheets[ cfg.name ] = sheet_from_array_of_arrays( _this.toArray( cfg ) );

				data = XLSX.write( wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "base64"
				} );

				data = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + data;

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates an array of arrays
			 */
			toArray: function( options, callback ) {
				var row, col;
				var cfg = _this.deepMerge( {
					data: _this.getChartData( options ),
					withHeader: false,
					stringify: true
				}, options || {}, true );
				var data = [];
				var cols = [];

				// HEADER
				for ( col in cfg.data[ 0 ] ) {
					cols.push( col );
				}
				if ( cfg.withHeader ) {
					data.push( cols );
				}

				// BODY
				for ( row in cfg.data ) {
					var buffer = [];
					if ( !isNaN( row ) ) {
						for ( col in cols ) {
							if ( !isNaN( col ) ) {
								var col = cols[ col ];
								var value = cfg.data[ row ][ col ] || "";

								if ( cfg.stringify ) {
									value = String( value );
								} else {
									value = value;
								}
								buffer.push( value );
							}
						}
						data.push( buffer );
					}
				}

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Generates byte array with given base64 datastring; returns byte array
			 */
			toByteArray: function( options, callback ) {
				var cfg = _this.deepMerge( {
					// NUFFIN
				}, options || {} );
				var Arr = ( typeof Uint8Array !== 'undefined' ) ? Uint8Array : Array
				var PLUS = '+'.charCodeAt( 0 )
				var SLASH = '/'.charCodeAt( 0 )
				var NUMBER = '0'.charCodeAt( 0 )
				var LOWER = 'a'.charCodeAt( 0 )
				var UPPER = 'A'.charCodeAt( 0 )
				var data = b64ToByteArray( cfg.data );

				function decode( elt ) {
					var code = elt.charCodeAt( 0 )
					if ( code === PLUS )
						return 62 // '+'
					if ( code === SLASH )
						return 63 // '/'
					if ( code < NUMBER )
						return -1 //no match
					if ( code < NUMBER + 10 )
						return code - NUMBER + 26 + 26
					if ( code < UPPER + 26 )
						return code - UPPER
					if ( code < LOWER + 26 )
						return code - LOWER + 26
				}

				function b64ToByteArray( b64 ) {
					var i, j, l, tmp, placeHolders, arr

					if ( b64.length % 4 > 0 ) {
						throw new Error( 'Invalid string. Length must be a multiple of 4' )
					}

					// THE NUMBER OF EQUAL SIGNS (PLACE HOLDERS)
					// IF THERE ARE TWO PLACEHOLDERS, THAN THE TWO CHARACTERS BEFORE IT
					// REPRESENT ONE BYTE
					// IF THERE IS ONLY ONE, THEN THE THREE CHARACTERS BEFORE IT REPRESENT 2 BYTES
					// THIS IS JUST A CHEAP HACK TO NOT DO INDEXOF TWICE
					var len = b64.length
					placeHolders = '=' === b64.charAt( len - 2 ) ? 2 : '=' === b64.charAt( len - 1 ) ? 1 : 0

					// BASE64 IS 4/3 + UP TO TWO CHARACTERS OF THE ORIGINAL DATA
					arr = new Arr( b64.length * 3 / 4 - placeHolders )

					// IF THERE ARE PLACEHOLDERS, ONLY GET UP TO THE LAST COMPLETE 4 CHARS
					l = placeHolders > 0 ? b64.length - 4 : b64.length

					var L = 0

					function push( v ) {
						arr[ L++ ] = v
					}

					for ( i = 0, j = 0; i < l; i += 4, j += 3 ) {
						tmp = ( decode( b64.charAt( i ) ) << 18 ) | ( decode( b64.charAt( i + 1 ) ) << 12 ) | ( decode( b64.charAt( i + 2 ) ) << 6 ) | decode( b64.charAt( i + 3 ) )
						push( ( tmp & 0xFF0000 ) >> 16 )
						push( ( tmp & 0xFF00 ) >> 8 )
						push( tmp & 0xFF )
					}

					if ( placeHolders === 2 ) {
						tmp = ( decode( b64.charAt( i ) ) << 2 ) | ( decode( b64.charAt( i + 1 ) ) >> 4 )
						push( tmp & 0xFF )
					} else if ( placeHolders === 1 ) {
						tmp = ( decode( b64.charAt( i ) ) << 10 ) | ( decode( b64.charAt( i + 1 ) ) << 4 ) | ( decode( b64.charAt( i + 2 ) ) >> 2 )
						push( ( tmp >> 8 ) & 0xFF )
						push( tmp & 0xFF )
					}

					return arr
				}

				_this.handleCallback( callback, data );

				return data;
			},

			/**
			 * Callback handler; injects additional arguments to callback
			 */
			handleCallback: function( callback ) {
				var i1, data = Array();
				if ( callback && callback instanceof Function ) {
					for ( i1 = 0; i1 < arguments.length; i1++ ) {
						if ( i1 > 0 ) {
							data.push( arguments[ i1 ] );
						}
					}
					callback.apply( _this, data );
				}
			},

			/**
			 * Handles drag/drop events; loads given imagery
			 */
			handleDropbox: function( e ) {
				if ( _this.drawing.buffer.enabled ) {
					e.preventDefault();
					e.stopPropagation();

					// DRAG OVER
					if ( e.type == "dragover" ) {
						_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas active dropbox" );

						// DRAGLEAVE; DROP
					} else {
						_this.setup.wrapper.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-canvas active" );

						if ( e.type == "drop" && e.dataTransfer.files.length ) {
							for ( var i1 = 0; i1 < e.dataTransfer.files.length; i1++ ) {
								var reader = new FileReader();
								reader.onloadend = ( function( index ) {
									return function() {
										_this.drawing.handler.add( {
											url: reader.result,
											top: e.layerY - ( index * 10 ),
											left: e.layerX - ( index * 10 )
										} );
									}
								} )( i1 );
								reader.readAsDataURL( e.dataTransfer.files[ i1 ] );
							}
						}
					}
				}
			},

			/**
			 * Gathers chart data according to its type
			 */
			getChartData: function( options ) {
				var cfg = _this.deepMerge( {
					data: [],
					titles: {},
					dateFields: [],
					dataFields: [],
					dataFieldsMap: {},
					exportTitles: _this.config.exportTitles,
					exportSelection: _this.config.exportSelection,
					columnNames: _this.config.columnNames
				}, options || {}, true );
				var uid, i1, i2, i3;
				var lookupFields = [ "valueField", "openField", "closeField", "highField", "lowField", "xField", "yField" ];

				// HANDLE FIELDS
				function addField( field, title, type ) {

					function checkExistance( field, type ) {
						if ( cfg.dataFields.indexOf( field ) != -1 ) {
							return checkExistance( [ field, ".", type ].join( "" ) );
						}
						return field;
					}

					if ( field && cfg.exportTitles && _this.setup.chart.type != "gantt" ) {
						uid = checkExistance( field, type );
						cfg.dataFieldsMap[ uid ] = field;
						cfg.dataFields.push( uid );
						cfg.titles[ uid ] = title || uid;
					}
				}

				if ( cfg.data.length == 0 ) {
					// STOCK DATA; GATHER COMPARED GRAPHS
					if ( _this.setup.chart.type == "stock" ) {
						cfg.data = _this.setup.chart.mainDataSet.dataProvider;

						// CATEGORY AXIS
						addField( _this.setup.chart.mainDataSet.categoryField );
						cfg.dateFields.push( _this.setup.chart.mainDataSet.categoryField );

						// WALKTHROUGH GRAPHS
						for ( i1 = 0; i1 < _this.setup.chart.mainDataSet.fieldMappings.length; i1++ ) {
							var fieldMap = _this.setup.chart.mainDataSet.fieldMappings[ i1 ];
							for ( i2 = 0; i2 < _this.setup.chart.panels.length; i2++ ) {
								var panel = _this.setup.chart.panels[ i2 ]
								for ( i3 = 0; i3 < panel.stockGraphs.length; i3++ ) {
									var graph = panel.stockGraphs[ i3 ];

									for ( i4 = 0; i4 < lookupFields.length; i4++ ) {
										if ( graph[ lookupFields[ i4 ] ] == fieldMap.toField ) {
											addField( fieldMap.fromField, graph.title, lookupFields[ i4 ] );
										}
									}
								}
							}
						}

						// WALKTHROUGH COMPARISON AND MERGE IT'S DATA
						for ( i1 = 0; i1 < _this.setup.chart.comparedGraphs.length; i1++ ) {
							var graph = _this.setup.chart.comparedGraphs[ i1 ];
							for ( i2 = 0; i2 < graph.dataSet.dataProvider.length; i2++ ) {
								for ( i3 = 0; i3 < graph.dataSet.fieldMappings.length; i3++ ) {
									var fieldMap = graph.dataSet.fieldMappings[ i3 ];
									var uid = graph.dataSet.id + "_" + fieldMap.toField;

									if ( i2 < cfg.data.length ) {
										cfg.data[ i2 ][ uid ] = graph.dataSet.dataProvider[ i2 ][ fieldMap.fromField ];

										if ( !cfg.titles[ uid ] ) {
											addField( uid, graph.dataSet.title )
										}
									}
								}
							}
						}

						// GANTT DATA; FLATTEN SEGMENTS
					} else if ( _this.setup.chart.type == "gantt" ) {
						// CATEGORY AXIS
						addField( _this.setup.chart.categoryField );
						cfg.dateFields.push( _this.setup.chart.categoryField );

						var field = _this.setup.chart.segmentsField;
						for ( i1 = 0; i1 < _this.setup.chart.dataProvider.length; i1++ ) {
							var dataItem = _this.setup.chart.dataProvider[ i1 ];
							if ( dataItem[ field ] ) {
								for ( i2 = 0; i2 < dataItem[ field ].length; i2++ ) {
									dataItem[ field ][ i2 ][ _this.setup.chart.categoryField ] = dataItem[ _this.setup.chart.categoryField ];
									cfg.data.push( dataItem[ field ][ i2 ] );
								}
							}
						}

						// GRAPHS
						for ( i1 = 0; i1 < _this.setup.chart.graphs.length; i1++ ) {
							var graph = _this.setup.chart.graphs[ i1 ];

							for ( i2 = 0; i2 < lookupFields.length; i2++ ) {
								var dataField = lookupFields[ i2 ];
								var graphField = graph[ dataField ];
								var title = graph.title;

								addField( graphField, graph.title, dataField );
							}
						}

						// PIE/FUNNEL DATA;
					} else if ( [ "pie", "funnel" ].indexOf( _this.setup.chart.type ) != -1 ) {
						cfg.data = _this.setup.chart.dataProvider;

						// CATEGORY AXIS
						addField( _this.setup.chart.titleField );
						cfg.dateFields.push( _this.setup.chart.titleField );

						// VALUE
						addField( _this.setup.chart.valueField );

						// DEFAULT DATA;
					} else if ( _this.setup.chart.type != "map" ) {
						cfg.data = _this.setup.chart.dataProvider;

						// CATEGORY AXIS
						if ( _this.setup.chart.categoryAxis ) {
							addField( _this.setup.chart.categoryField, _this.setup.chart.categoryAxis.title );
							if ( _this.setup.chart.categoryAxis.parseDates !== false ) {
								cfg.dateFields.push( _this.setup.chart.categoryField );
							}
						}

						// GRAPHS
						for ( i1 = 0; i1 < _this.setup.chart.graphs.length; i1++ ) {
							var graph = _this.setup.chart.graphs[ i1 ];

							for ( i2 = 0; i2 < lookupFields.length; i2++ ) {
								var dataField = lookupFields[ i2 ];
								var graphField = graph[ dataField ];

								addField( graphField, graph.title, dataField );
							}
						}
					}
				}
				return _this.processData( cfg );
			},

			/**
			 * Walkthrough data to format dates and titles
			 */
			processData: function( options ) {
				var cfg = _this.deepMerge( {
					data: [],
					titles: {},
					dateFields: [],
					dataFields: [],
					dataFieldsMap: {},
					dataDateFormat: _this.setup.chart.dataDateFormat,
					dateFormat: _this.config.dateFormat || _this.setup.chart.dataDateFormat || "YYYY-MM-DD",
					exportTitles: _this.config.exportTitles,
					exportSelection: _this.config.exportSelection,
					columnNames: _this.config.columnNames
				}, options || {}, true );
				var i1, i2;

				if ( cfg.data.length ) {
					// GATHER MISSING FIELDS
					for ( i1 = 0; i1 < cfg.data.length; i1++ ) {
						for ( i2 in cfg.data[ i1 ] ) {
							if ( cfg.dataFields.indexOf( i2 ) == -1 ) {
								cfg.dataFields.push( i2 );
								cfg.dataFieldsMap[ i2 ] = i2;
							}
						}
					}

					// REBUILD DATA
					var buffer = [];
					for ( i1 = 0; i1 < cfg.data.length; i1++ ) {
						var tmp = {};
						var skip = false;
						for ( i2 = 0; i2 < cfg.dataFields.length; i2++ ) {
							var uniqueField = cfg.dataFields[ i2 ];
							var dataField = cfg.dataFieldsMap[ uniqueField ];
							var title = ( cfg.columnNames && cfg.columnNames[ uniqueField ] ) || cfg.titles[ uniqueField ] || uniqueField;
							var value = cfg.data[ i1 ][ dataField ] || undefined;

							// TITLEFY
							if ( cfg.exportTitles && _this.setup.chart.type != "gantt" ) {
								if ( title in tmp ) {
									title += [ "( ", uniqueField, " )" ].join( "" );
								}
							}

							// PROCESS CATEGORY
							if ( cfg.dateFields.indexOf( dataField ) != -1 ) {

								// CONVERT DATESTRING TO DATE OBJECT
								if ( cfg.dataDateFormat && ( value instanceof String || typeof value == "string" ) ) {
									value = AmCharts.stringToDate( value, cfg.dataDateFormat );

								// CONVERT TIMESTAMP TO DATE OBJECT
								} else if ( cfg.dateFormat && ( value instanceof Number || typeof value == "number" ) ) {
									value = new Date(value);
								}

								// CATEGORY RANGE
								if ( cfg.exportSelection ) {
									if ( value instanceof Date ) {
										if ( value < chart.startDate || value > chart.endDate ) {
											skip = true;
										}

									} else if ( i1 < chart.startIndex || i1 > chart.endIndex ) {
										skip = true;
									}
								}

								// CATEGORY FORMAT
								if ( cfg.dateFormat && cfg.dateFormat != "dateObject" && value instanceof Date ) {
									value = AmCharts.formatDate( value, cfg.dateFormat );
								}
							}

							tmp[ title ] = value;
						}
						if ( !skip ) {
							buffer.push( tmp );
						}
					}
					cfg.data = buffer;
				}
				return cfg.data;
			},

			/**
			 * Prettifies string
			 */
			capitalize: function( string ) {
				return string.charAt( 0 ).toUpperCase() + string.slice( 1 ).toLowerCase();
			},

			/**
			 * Generates export menu; returns UL node
			 */
			createMenu: function( list, container ) {
				var div;

				function buildList( list, container ) {
					var i1, i2, ul = document.createElement( "ul" );
					for ( i1 = 0; i1 < list.length; i1++ ) {
						var item = typeof list[ i1 ] === "string" ? {
							format: list[ i1 ]
						} : list[ i1 ];
						var li = document.createElement( "li" );
						var a = document.createElement( "a" );
						var img = document.createElement( "img" );
						var span = document.createElement( "span" );
						var action = String( item.action ? item.action : item.format ).toLowerCase();

						item.format = String( item.format ).toUpperCase();

						// MERGE WITH GIVEN FORMAT
						if ( _this.config.formats[ item.format ] ) {
							item = _this.deepMerge( {
								label: item.icon ? "" : item.format,
								format: item.format,
								mimeType: _this.config.formats[ item.format ].mimeType,
								extension: _this.config.formats[ item.format ].extension,
								capture: _this.config.formats[ item.format ].capture,
								action: _this.config.action,
								fileName: _this.config.fileName
							}, item );
						} else if ( !item.label ) {
							item.label = item.label ? item.label : _this.i18l( "menu.label." + action );
						}

						// FILTER; TOGGLE FLAG
						if ( [ "CSV", "JSON", "XLSX" ].indexOf( item.format ) != -1 && [ "map", "gauge" ].indexOf( _this.setup.chart.type ) != -1 ) {
							continue;

							// BLOB EXCEPTION
						} else if ( !_this.setup.hasBlob && item.format != "UNDEFINED" ) {
							if ( item.mimeType && item.mimeType.split( "/" )[ 0 ] != "image" && item.mimeType != "text/plain" ) {
								continue;
							}
						}

						// DRAWING
						if ( item.action == "draw" ) {
							if ( _this.config.fabric.drawing.enabled ) {
								item.menu = item.menu ? item.menu : _this.config.fabric.drawing.menu;
								item.click = ( function( item ) {
									return function() {
										this.capture( item, function() {
											this.createMenu( item.menu );
										} );
									}
								} )( item );
							} else {
								item.menu = [];
							}

							// DRAWING CHOICES
						} else if ( !item.populated && item.action && item.action.indexOf( "draw." ) != -1 ) {
							var type = item.action.split( "." )[ 1 ];
							var items = item[ type ] || _this.config.fabric.drawing[ type ] || [];

							item.menu = [];
							item.populated = true;

							for ( i2 = 0; i2 < items.length; i2++ ) {
								var tmp = {
									"label": items[ i2 ]
								}

								if ( type == "shapes" ) {
									var io = items[ i2 ].indexOf( "//" ) == -1;
									var url = ( io ? _this.config.path + "shapes/" : "" ) + items[ i2 ];

									tmp.action = "add";
									tmp.url = url;
									tmp.icon = url;
									tmp.ignore = io;
									tmp[ "class" ] = "export-drawing-shape";

								} else if ( type == "colors" ) {
									tmp.style = "background-color: " + items[ i2 ];
									tmp.action = "change";
									tmp.color = items[ i2 ];
									tmp[ "class" ] = "export-drawing-color";

								} else if ( type == "widths" ) {
									tmp.action = "change";
									tmp.width = items[ i2 ];
									tmp.label = document.createElement( "span" );

									tmp.label.style.width = _this.numberToPx( items[ i2 ] );
									tmp.label.style.height = _this.numberToPx( items[ i2 ] );
									tmp[ "class" ] = "export-drawing-width";
								} else if ( type == "opacities" ) {
									tmp.style = "opacity: " + items[ i2 ];
									tmp.action = "change";
									tmp.opacity = items[ i2 ];
									tmp.label = ( items[ i2 ] * 100 ) + "%";
									tmp[ "class" ] = "export-drawing-opacity";
								} else if ( type == "modes" ) {
									tmp.label = _this.i18l( "menu.label.draw.modes." + items[ i2 ] );
									tmp.click = ( function( mode ) {
										return function() {
											_this.drawing.mode = mode;
										}
									} )( items[ i2 ] );
									tmp[ "class" ] = "export-drawing-mode";
								}

								item.menu.push( tmp );
							}

							// ADD CLICK HANDLER
						} else if ( !item.click && !item.menu && !item.items ) {
							// DRAWING METHODS
							if ( _this.drawing.handler[ action ] instanceof Function ) {
								item.action = action;
								item.click = ( function( item ) {
									return function() {
										this.drawing.handler[ item.action ]( item );
									}
								} )( item );

								// DRAWING
							} else if ( _this.drawing.buffer.enabled ) {
								item.click = ( function( item ) {
									return function() {
										if ( this.config.drawing.autoClose ) {
											this.drawing.handler.done();
										}
										this[ "to" + item.format ]( item, function( data ) {
											if ( item.action == "download" ) {
												this.download( data, item.mimeType, [ item.fileName, item.extension ].join( "." ) );
											}
										} );
									}
								} )( item );

								// REGULAR
							} else if ( item.format != "UNDEFINED" ) {
								item.click = ( function( item ) {
									return function() {
										if ( item.capture || item.action == "print" || item.format == "PRINT" ) {
											this.capture( item, function() {
												if ( this.config.drawing.autoClose ) {
													this.drawing.handler.done();
												}
												this[ "to" + item.format ]( item, function( data ) {
													if ( item.action == "download" ) {
														this.download( data, item.mimeType, [ item.fileName, item.extension ].join( "." ) );
													}
												} );
											} )

										} else if ( this[ "to" + item.format ] ) {
											this[ "to" + item.format ]( item, function( data ) {
												this.download( data, item.mimeType, [ item.fileName, item.extension ].join( "." ) );
											} );
										} else {
											throw new Error( 'Invalid format. Could not determine output type.' );
										}
									}
								} )( item );
							}
						}

						// HIDE EMPTY ONES
						if ( item.menu !== undefined && !item.menu.length ) {
							continue;
						}

						// ADD LINK ATTR
						a.setAttribute( "href", "#" );
						a.addEventListener( "click", ( function( callback, item ) {
							return function( e ) {
								e.preventDefault();
								var args = [ e, item ];

								// DELAYED
								if ( ( item.action == "draw" || item.format == "PRINT" || ( item.format != "UNDEFINED" && item.capture ) ) && !_this.drawing.enabled ) {
									item.delay = item.delay ? item.delay : _this.config.delay;
									if ( item.delay ) {
										_this.delay( item, callback );
										return;
									}
								}

								callback.apply( _this, args );
							}
						} )( item.click || function( e ) {
							e.preventDefault();
						}, item ) );
						li.appendChild( a );

						// ADD LABEL
						if ( _this.isElement( item.label ) ) {
							span.appendChild( item.label );
						} else {
							span.innerHTML = item.label;
						}

						// APPEND ITEMS
						if ( item[ "class" ] ) {
							li.className = item[ "class" ];
						}

						if ( item.style ) {
							li.setAttribute( "style", item.style );
						}

						if ( item.icon ) {
							img.setAttribute( "src", ( !item.ignore && item.icon.slice( 0, 10 ).indexOf( "//" ) == -1 ? chart.pathToImages : "" ) + item.icon );
							a.appendChild( img );
						}
						if ( item.label ) {
							a.appendChild( span );
						}
						if ( item.title ) {
							a.setAttribute( "title", item.title );
						}

						// CALLBACK; REVIVER FOR MENU ITEMS
						if ( _this.config.menuReviver ) {
							li = _this.config.menuReviver.apply( _this, [ item, li ] );
						}

						// ADD ELEMENTS FOR EASY ACCESS
						item.elements = {
							li: li,
							a: a,
							img: img,
							span: span
						}

						// ADD SUBLIST; JUST WITH ENTRIES
						if ( ( item.menu || item.items ) && item.action != "draw" ) {
							if ( buildList( item.menu || item.items, li ).childNodes.length ) {
								ul.appendChild( li );
							}
						} else {
							ul.appendChild( li );
						}
					}

					// JUST ADD THOSE WITH ENTRIES
					if ( ul.childNodes.length ) {
						container.appendChild( ul );
					}

					return ul;
				}

				// DETERMINE CONTAINER
				if ( !container ) {
					if ( typeof _this.config.divId == "string" ) {
						_this.config.divId = container = document.getElementById( _this.config.divId );
					} else if ( _this.isElement( _this.config.divId ) ) {
						container = _this.config.divId;
					} else {
						container = _this.setup.chart.containerDiv;
					}
				}

				// CREATE / RESET MENU CONTAINER
				if ( _this.isElement( _this.setup.menu ) ) {
					_this.setup.menu.innerHTML = "";
				} else {
					_this.setup.menu = document.createElement( "div" );
				}
				_this.setup.menu.setAttribute( "class", _this.setup.chart.classNamePrefix + "-export-menu " + _this.setup.chart.classNamePrefix + "-export-menu-" + _this.config.position + " amExportButton" );

				// CALLBACK; REPLACES THE MENU WALKER
				if ( _this.config.menuWalker ) {
					buildList = _this.config.menuWalker;
				}
				buildList.apply( this, [ list, _this.setup.menu ] );

				// JUST ADD THOSE WITH ENTRIES
				if ( _this.setup.menu.childNodes.length ) {
					container.appendChild( _this.setup.menu );
				}

				return _this.setup.menu;
			},

			/**
			 * Method to trigger the callback delayed
			 */
			delay: function( options, callback ) {
				var cfg = _this.deepMerge( {
					delay: 3,
					precision: 2
				}, options || {} );
				var t1, t2, start = Number( new Date() );
				var menu = _this.createMenu( [ {
					label: _this.i18l( "capturing.delayed.menu.label" ).replace( "{{duration}}", AmCharts.toFixed( cfg.delay, cfg.precision ) ),
					title: _this.i18l( "capturing.delayed.menu.title" ),
					"class": "export-delayed-capturing",
					click: function() {
						clearTimeout( t1 );
						clearTimeout( t2 );
						_this.createMenu( _this.config.menu );
					}
				} ] );
				var label = menu.getElementsByTagName( "a" )[ 0 ];

				// MENU UPDATE
				t1 = setInterval( function() {
					var diff = cfg.delay - ( Number( new Date() ) - start ) / 1000;
					if ( diff <= 0 ) {
						clearTimeout( t1 );
						if ( cfg.action != "draw" ) {
							_this.createMenu( _this.config.menu );
						}
					} else if ( label ) {
						label.innerHTML = _this.i18l( "capturing.delayed.menu.label" ).replace( "{{duration}}", AmCharts.toFixed( diff, 2 ) );
					}
				}, 10 );

				// CALLBACK
				t2 = setTimeout( function() {
					callback.apply( _this, arguments );
				}, cfg.delay * 1000 );
			},

			/**
			 * Migration method to support old export setup
			 */
			migrateSetup: function( setup ) {
				var cfg = {
					enabled: true,
					migrated: true,
					libs: {
						autoLoad: true
					},
					menu: []
				};

				function crawler( object ) {
					var key;
					for ( key in object ) {
						var value = object[ key ];

						if ( key.slice( 0, 6 ) == "export" && value ) {
							cfg.menu.push( key.slice( 6 ) );
						} else if ( key == "userCFG" ) {
							crawler( value );
						} else if ( key == "menuItems" ) {
							cfg.menu = value;
						} else if ( key == "libs" ) {
							cfg.libs = value;
						} else if ( typeof key == "string" ) {
							cfg[ key ] = value;
						}
					}
				}

				crawler( setup );

				return cfg;
			},

			/*
			 ** Add event listener
			 */
			loadListeners: function() {
				function handleClone( clone ) {
					if ( clone ) {
						clone.set( {
							top: clone.top + 10,
							left: clone.left + 10
						} );
						_this.setup.fabric.add( clone );
					}
				}

				// OBSERVE; KEY LISTENER; DRAWING FEATURES
				if ( _this.config.keyListener && _this.config.keyListener != "attached" ) {
					_this.config.keyListener = "attached";
					document.addEventListener( "keydown", function( e ) {
						var current = _this.drawing.buffer.target;

						// REMOVE; key: BACKSPACE / DELETE
						if ( ( e.keyCode == 8 || e.keyCode == 46 ) && current ) {
							e.preventDefault();
							_this.setup.fabric.remove( current );

							// ESCAPE DRAWIN MODE; key: escape
						} else if ( e.keyCode == 27 && _this.drawing.enabled ) {
							e.preventDefault();
							_this.drawing.handler.done();

							// COPY; key: C
						} else if ( e.keyCode == 67 && ( e.metaKey || e.ctrlKey ) && current ) {
							_this.drawing.buffer.copy = current;

							// CUT; key: X
						} else if ( e.keyCode == 88 && ( e.metaKey || e.ctrlKey ) && current ) {
							_this.drawing.buffer.copy = current;
							_this.setup.fabric.remove( current );

							// PASTE; key: V
						} else if ( e.keyCode == 86 && ( e.metaKey || e.ctrlKey ) ) {
							if ( _this.drawing.buffer.copy ) {
								handleClone( _this.drawing.buffer.copy.clone( handleClone ) )
							}

							// UNDO / REDO; key: Z
						} else if ( e.keyCode == 90 && ( e.metaKey || e.ctrlKey ) ) {
							e.preventDefault();
							if ( e.shiftKey ) {
								_this.drawing.handler.redo();
							} else {
								_this.drawing.handler.undo();
							}
						}
					} );
				}

				// OBSERVE; DRAG AND DROP LISTENER; DRAWING FEATURE
				if ( _this.config.fileListener ) {
					_this.setup.chart.containerDiv.addEventListener( "dragover", _this.handleDropbox );
					_this.setup.chart.containerDiv.addEventListener( "dragleave", _this.handleDropbox );
					_this.setup.chart.containerDiv.addEventListener( "drop", _this.handleDropbox );
				}
			},

			/**
			 * Initiate export menu; waits for chart container to place menu
			 */
			init: function() {
				clearTimeout( _this.timer );
				_this.timer = setInterval( function() {
					if ( _this.setup.chart.containerDiv ) {
						clearTimeout( _this.timer );

						if ( _this.config.enabled ) {
							// CREATE REFERENCE
							_this.setup.chart.AmExport = _this;

							// OVERWRITE PARENT OVERVIEW
							_this.setup.chart.div.style.overflow = "visible";

							// ATTACH EVENTS
							_this.loadListeners();

							// CREATE MENU
							_this.createMenu( _this.config.menu );
						}
					}
				}, AmCharts.updateRate );

			},

			/**
			 * Initiates export instance; merges given config; attaches event listener
			 */
			construct: function() {
				// ANNOTATION; MAP "DONE"
				_this.drawing.handler.cancel = _this.drawing.handler.done;

				// CHECK BLOB CONSTRUCTOR
				try {
					_this.setup.hasBlob = !!new Blob;
				} catch ( e ) {}

				// WORK AROUND TO BYPASS FILESAVER CHECK TRYING TO OPEN THE BLOB URL IN SAFARI BROWSER
				window.safari = window.safari ? window.safari : {};

				// OVERTAKE CHART FONTSIZE IF GIVEN
				_this.defaults.fabric.drawing.fontSize = _this.setup.chart.fontSize || 11;

				// MERGE SETTINGS
				_this.config.drawing = _this.deepMerge( _this.defaults.fabric.drawing, _this.config.drawing || {}, true );
				_this.deepMerge( _this.defaults.fabric, _this.config, true );
				_this.deepMerge( _this.defaults.fabric, _this.config.fabric || {}, true );
				_this.deepMerge( _this.defaults.pdfMake, _this.config, true );
				_this.deepMerge( _this.defaults.pdfMake, _this.config.pdfMake || {}, true );
				_this.deepMerge( _this.libs, _this.config.libs || {}, true );

				// UPDATE CONFIG
				_this.config.drawing = _this.defaults.fabric.drawing;
				_this.config.fabric = _this.defaults.fabric;
				_this.config.pdfMake = _this.defaults.pdfMake;
				_this.config = _this.deepMerge( _this.defaults, _this.config, true );

				// MERGE; SETUP DRAWING MENU
				if ( _this.config.fabric.drawing.enabled ) {
					if ( _this.config.fabric.drawing.menu === undefined ) {
						_this.config.fabric.drawing.menu = [];
						_this.deepMerge( _this.config.fabric.drawing.menu, [ {
							"class": "export-drawing",
							menu: [ {
								label: _this.i18l( "menu.label.draw.add" ),
								menu: [ {
									label: _this.i18l( "menu.label.draw.shapes" ),
									action: "draw.shapes"
								}, {
									label: _this.i18l( "menu.label.draw.text" ),
									action: "text"
								} ]
							}, {
								label: _this.i18l( "menu.label.draw.change" ),
								menu: [ {
									label: _this.i18l( "menu.label.draw.modes" ),
									action: "draw.modes"
								}, {
									label: _this.i18l( "menu.label.draw.colors" ),
									action: "draw.colors"
								}, {
									label: _this.i18l( "menu.label.draw.widths" ),
									action: "draw.widths"
								}, {
									label: _this.i18l( "menu.label.draw.opacities" ),
									action: "draw.opacities"
								}, "UNDO", "REDO" ]
							}, {
								label: _this.i18l( "menu.label.save.image" ),
								menu: [ "PNG", "JPG", "SVG", "PDF" ]
							}, "PRINT", "CANCEL" ]
						} ] );
					}
				}

				// MERGE; SETUP MAIN MENU
				if ( _this.config.menu === undefined ) {
					_this.config.menu = [];
					// PARENT MENU
					_this.deepMerge( _this.config, {
						menu: [ {
							"class": "export-main",
							menu: [ {
								label: _this.i18l( "menu.label.save.image" ),
								menu: [ "PNG", "JPG", "SVG", "PDF" ]
							}, {
								label: _this.i18l( "menu.label.save.data" ),
								menu: [ "CSV", "XLSX", "JSON" ]
							}, {
								label: _this.i18l( "menu.label.draw" ),
								action: "draw",
								menu: _this.config.fabric.drawing.menu
							}, {
								format: "PRINT",
								label: _this.i18l( "menu.label.print" )
							} ]
						} ]
					} );
				}

				// ADD MISSING PATH
				if ( !_this.libs.path ) {
					_this.libs.path = _this.config.path + "libs/";
				}

				// CHECK ACCEPTANCE
				if ( _this.isSupported() ) {
					// LOAD DEPENDENCIES
					_this.loadDependencies( _this.libs.resources, _this.libs.reload );
					// ADD CLASSNAMES
					_this.setup.chart.addClassNames = true;
					// REFERENCE
					_this.setup.chart[ _this.name ] = _this;
					// INIT MENU; WAIT FOR CHART INSTANCE
					_this.init();
				}
			}
		}

		// USE GIVEN CONFIG
		if ( config ) {
			_this.config = config;

			// USE CHART EXPORT CONFIG
		} else if ( _this.setup.chart[ _this.name ] ) {
			_this.config = _this.setup.chart[ _this.name ];

			// MIGRATE OLD EXPORT CHART CONFIG
		} else if ( _this.setup.chart.amExport || _this.setup.chart.exportConfig ) {
			_this.config = _this.migrateSetup( _this.setup.chart.amExport || _this.setup.chart.exportConfig );

			// EXIT; NO CONFIG
		} else {
			return;
		}

		// CONSTRUCT INSTANCE
		_this.construct();

		// EXPORT SCOPE
		return _this.deepMerge( this, _this );
	}
} )();

/**
 * Set init handler
 */
AmCharts.addInitHandler( function( chart ) {
	new AmCharts["export"]( chart );

}, [ "pie", "serial", "xy", "funnel", "radar", "gauge", "stock", "map", "gantt" ] );