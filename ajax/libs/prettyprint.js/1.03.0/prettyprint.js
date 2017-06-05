/*
Copyright (c) 2009 James Padolsey.  All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

   1. Redistributions of source code must retain the above copyright
	  notice, this list of conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright
	  notice, this list of conditions and the following disclaimer in the
	  documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY James Padolsey ``AS IS'' AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL James Padolsey OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
SUCH DAMAGE.

The views and conclusions contained in the software and documentation are
those of the authors and should not be interpreted as representing official
policies, either expressed or implied, of James Padolsey.

 AUTHOR James Padolsey (http://james.padolsey.com)
 VERSION 1.03.0
 UPDATED 29-10-2011
 CONTRIBUTORS
	David Waller
    Benjamin Drucker

*/

var prettyPrint = (function(){
	
	/* These "util" functions are not part of the core
	   functionality but are  all necessary - mostly DOM helpers */
	
	var util = {
		
		el: function(type, attrs) {
			
			/* Create new element */
			var el = document.createElement(type), attr;
			
			/*Copy to single object */
			attrs = util.merge({}, attrs);
			
			/* Add attributes to el */
			if (attrs && attrs.style) {
				var styles = attrs.style;
				util.applyCSS( el, attrs.style );
				delete attrs.style;
			}
			for (attr in attrs) {
				if (attrs.hasOwnProperty(attr)) {
					el[attr] = attrs[attr];
				}
			}
			
			return el;
		
		},
		
		applyCSS: function(el, styles) {
			/* Applies CSS to a single element */
			for (var prop in styles) {
				if (styles.hasOwnProperty(prop)) {
					try{
						/* Yes, IE6 SUCKS! */
						el.style[prop] = styles[prop];
					}catch(e){}
				}
			}
		},
		
		txt: function(t) {
			/* Create text node */
			return document.createTextNode(t);
		},
		
		row: function(cells, type, cellType) {
			
			/* Creates new <tr> */
			cellType = cellType || 'td';
			
			/* colSpan is calculated by length of null items in array */
			var colSpan = util.count(cells, null) + 1,
				tr = util.el('tr'), td,
				attrs = {
					style: util.getStyles(cellType, type),
					colSpan: colSpan,
					onmouseover: function() {
						var tds = this.parentNode.childNodes;
						util.forEach(tds, function(cell){
							if (cell.nodeName.toLowerCase() !== 'td') { return; }
							util.applyCSS(cell, util.getStyles('td_hover', type));
						});
					},
					onmouseout: function() {
						var tds = this.parentNode.childNodes;
						util.forEach(tds, function(cell){
							if (cell.nodeName.toLowerCase() !== 'td') { return; }
							util.applyCSS(cell, util.getStyles('td', type));
						});
					}
				};
				
			util.forEach(cells, function(cell){
				
				if (cell === null) { return; }
				/* Default cell type is <td> */
				td = util.el(cellType, attrs);
				
				if (cell.nodeType) {
					/* IsDomElement */
					td.appendChild(cell);
				} else {
					/* IsString */
					td.innerHTML = util.shorten(cell.toString());
				}
				
				tr.appendChild(td);
			});
			
			return tr;
		},
		
		hRow: function(cells, type){
			/* Return new <th> */
			return util.row(cells, type, 'th');
		},
		
		table: function(headings, type){
			
			headings = headings || [];
			
			/* Creates new table: */
			var attrs = {
					thead: {
						style:util.getStyles('thead',type)
					},
					tbody: {
						style:util.getStyles('tbody',type)
					},
					table: {
						style:util.getStyles('table',type)
					}
				},
				tbl = util.el('table', attrs.table),
				thead = util.el('thead', attrs.thead),
				tbody = util.el('tbody', attrs.tbody);
				
			if (headings.length) {
				tbl.appendChild(thead);
				thead.appendChild( util.hRow(headings, type) );
			}
			tbl.appendChild(tbody);
			
			return {
				/* Facade for dealing with table/tbody
				   Actual table node is this.node: */
				node: tbl,
				tbody: tbody,
				thead: thead,
				appendChild: function(node) {
					this.tbody.appendChild(node);
				},
				addRow: function(cells, _type, cellType){
					this.appendChild(util.row.call(util, cells, (_type || type), cellType));
					return this;
				}
			};
		},
		
		shorten: function(str) {
			var max = 40;
			str = str.replace(/^\s\s*|\s\s*$|\n/g,'');
			return str.length > max ? (str.substring(0, max-1) + '...') : str;
		},
		
		htmlentities: function(str) {
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		},
		
		merge: function(target, source) {
			
			/* Merges two (or more) objects,
			   giving the last one precedence */
			
			if ( typeof target !== 'object' ) {
				target = {};
			}
			
			for (var property in source) {
				
				if ( source.hasOwnProperty(property) ) {
					
					var sourceProperty = source[ property ];
					
					if ( typeof sourceProperty === 'object' ) {
						target[ property ] = util.merge( target[ property ], sourceProperty );
						continue;
					}
					
					target[ property ] = sourceProperty;
					
				}
				
			}
			
			for (var a = 2, l = arguments.length; a < l; a++) {
				util.merge(target, arguments[a]);
			}
			
			return target;
		},
		
		count: function(arr, item) {
			var count = 0;
			for (var i = 0, l = arr.length; i< l; i++) {
				if (arr[i] === item) {
					count++;
				}
			}
			return count;
		},
		
		thead: function(tbl) {
			return tbl.getElementsByTagName('thead')[0];
		},
		
		forEach: function(arr, max, fn) {
			
			if (!fn) {
				fn = max;
			}

			/* Helper: iteration */
			var len = arr.length,
				index = -1;
			
			while (++index < len) {
				if(fn( arr[index], index, arr ) === false) {
					break;
				}
			}
			
			return true;
		},
		
		type: function(v){
			try {
				/* Returns type, e.g. "string", "number", "array" etc.
				   Note, this is only used for precise typing. */
				if (v === null) { return 'null'; }
				if (v === undefined) { return 'undefined'; }
				var oType = Object.prototype.toString.call(v).match(/\s(.+?)\]/)[1].toLowerCase();
				if (v.nodeType) {
					if (v.nodeType === 1) {
						return 'domelement';
					}
					return 'domnode';
				}
				if (/^(string|number|array|regexp|function|date|boolean)$/.test(oType)) {
					return oType;
				}
				if (typeof v === 'object') {
					return v.jquery && typeof v.jquery === 'string' ? 'jquery' : 'object';
				}
				if (v === window || v === document) {
					return 'object';
				}
				return 'default';
			} catch(e) {
				return 'default';
			}
		},
		
		within: function(ref) {
			/* Check existence of a val within an object
			   RETURNS KEY */
			return {
				is: function(o) {
					for (var i in ref) {
						if (ref[i] === o) {
							return i;
						}
					}
					return '';
				}
			};
		},
		
		common: {
			circRef: function(obj, key, settings) {
				return util.expander(
					'[POINTS BACK TO <strong>' + (key) + '</strong>]',
					'Click to show this item anyway',
					function() {
						this.parentNode.appendChild( prettyPrintThis(obj,{maxDepth:1}) );
					}
				);
			},
			depthReached: function(obj, settings) {
				return util.expander(
					'[DEPTH REACHED]',
					'Click to show this item anyway',
					function() {
						try {
							this.parentNode.appendChild( prettyPrintThis(obj,{maxDepth:1}) );
						} catch(e) {
							this.parentNode.appendChild(
								util.table(['ERROR OCCURED DURING OBJECT RETRIEVAL'],'error').addRow([e.message]).node   
							);
						}
					}
				);
			}
		},
		
		getStyles: function(el, type) {
			type = prettyPrintThis.settings.styles[type] || {};
			return util.merge(
				{}, prettyPrintThis.settings.styles['default'][el], type[el]
			);
		},
		
		expander: function(text, title, clickFn) {
			return util.el('a', {
				innerHTML:  util.shorten(text) + ' <b style="visibility:hidden;">[+]</b>',
				title: title,
				onmouseover: function() {
					this.getElementsByTagName('b')[0].style.visibility = 'visible';
				},
				onmouseout: function() {
					this.getElementsByTagName('b')[0].style.visibility = 'hidden';
				},
				onclick: function() {
					this.style.display = 'none';
					clickFn.call(this);
					return false;
				},
				style: {
					cursor: 'pointer'
				}
			});
		},
		
		stringify: function(obj) {
			
			/* Bit of an ugly duckling!
			   - This fn returns an ATTEMPT at converting an object/array/anyType
				 into a string, kinda like a JSON-deParser
			   - This is used for when |settings.expanded === false| */
			
			var type = util.type(obj),
				str, first = true;
			if ( type === 'array' ) {
				str = '[';
				util.forEach(obj, function(item,i){
					str += (i===0?'':', ') + util.stringify(item);
				});
				return str + ']';
			}
			if (typeof obj === 'object') {
				str = '{';
				for (var i in obj){
					if (obj.hasOwnProperty(i)) {
						str += (first?'':', ') + i + ':' + util.stringify(obj[i]);
						first = false;
					}
				}
				return str + '}';
			}
			if (type === 'regexp') {
				return '/' + obj.source + '/';
			}
			if (type === 'string') {
				return '"' + obj.replace(/"/g,'\\"') + '"';
			}
			return obj.toString();
		},
		
		headerGradient: (function(){
			
			var canvas = document.createElement('canvas');
			if (!canvas.getContext) { return ''; }
			var cx = canvas.getContext('2d');
			canvas.height = 30;
			canvas.width = 1;
			
			var linearGrad = cx.createLinearGradient(0,0,0,30);
			linearGrad.addColorStop(0,'rgba(0,0,0,0)');
			linearGrad.addColorStop(1,'rgba(0,0,0,0.25)');
			
			cx.fillStyle = linearGrad;
			cx.fillRect(0,0,1,30);
			
			var dataURL = canvas.toDataURL && canvas.toDataURL();
			return 'url(' + (dataURL || '') + ')';
		
		})()
		
	};
	
	// Main..
	var prettyPrintThis = function(obj, options) {
		
		 /*
		 *	  obj :: Object to be printed					
		 *  options :: Options (merged with config)
		 */
		
		options = options || {};
		
		var settings = util.merge( {}, prettyPrintThis.config, options ),
			container = util.el('div'),
			config = prettyPrintThis.config,
			currentDepth = 0,
			stack = {},
			hasRunOnce = false;
		
		/* Expose per-call settings.
		   Note: "config" is overwritten (where necessary) by options/"settings"
		   So, if you need to access/change *DEFAULT* settings then go via ".config" */
		prettyPrintThis.settings = settings;
		
		var typeDealer = {
			string : function(item){
				return util.txt('"' + util.shorten(item.replace(/"/g,'\\"')) + '"');
			},
			number : function(item) {
				return util.txt(item);
			},
			regexp : function(item) {
				
				var miniTable = util.table(['RegExp',null], 'regexp');
				var flags = util.table();
				var span = util.expander(
					'/' + item.source + '/',
					'Click to show more',
					function() {
						this.parentNode.appendChild(miniTable.node);
					}
				);
				
				flags
					.addRow(['g', item.global])
					.addRow(['i', item.ignoreCase])
					.addRow(['m', item.multiline]);
				
				miniTable
					.addRow(['source', '/' + item.source + '/'])
					.addRow(['flags', flags.node])
					.addRow(['lastIndex', item.lastIndex]);
					
				return settings.expanded ? miniTable.node : span;
			},
			domelement : function(element, depth) {
				
				var miniTable = util.table(['DOMElement',null], 'domelement'),
					props = ['id', 'className', 'innerHTML', 'src', 'href'], elname = element.nodeName || '';
				
				miniTable.addRow(['tag', '&lt;' + elname.toLowerCase() + '&gt;']);
					
				util.forEach(props, function(prop){
					if ( element[prop] ) {
						miniTable.addRow([ prop, util.htmlentities(element[prop]) ]);
					}
				});
				
				return settings.expanded ? miniTable.node : util.expander(
					'DOMElement (' + elname.toLowerCase() + ')',
					'Click to show more',
					function() {
						this.parentNode.appendChild(miniTable.node);
					}
				);
			},
			domnode : function(node){
				
				/* Deals with all DOMNodes that aren't elements (nodeType !== 1) */
				var miniTable = util.table(['DOMNode',null], 'domelement'),
					data =  util.htmlentities( (node.data || 'UNDEFINED').replace(/\n/g,'\\n') );
				miniTable
					.addRow(['nodeType', node.nodeType + ' (' + node.nodeName + ')'])
					.addRow(['data', data]);
				
				return settings.expanded ? miniTable.node : util.expander(
					'DOMNode',
					'Click to show more',
					function() {
						this.parentNode.appendChild(miniTable.node);
					}
				);
			},
			jquery : function(obj, depth, key) {
				return typeDealer['array'](obj, depth, key, true);
			},
			object : function(obj, depth, key) {
				
				/* Checking depth + circular refs */
				/* Note, check for circular refs before depth; just makes more sense */
				var stackKey = util.within(stack).is(obj);
				if ( stackKey ) {
					return util.common.circRef(obj, stackKey, settings);
				}
				stack[key||'TOP'] = obj;
				if (depth === settings.maxDepth) {
					return util.common.depthReached(obj, settings);
				}
				
				var table = util.table(['Object', null],'object'),
					isEmpty = true;
				
				for (var i in obj) {
					if (!obj.hasOwnProperty || obj.hasOwnProperty(i)) {
						var item = obj[i],
							type = util.type(item);
						isEmpty = false;
						try {
							table.addRow([i, typeDealer[ type ](item, depth+1, i)], type);
						} catch(e) {
							/* Security errors are thrown on certain Window/DOM properties */
							if (window.console && window.console.log) {
								console.log(e.message);
							}
						}
					}
				}
				
				if (isEmpty) {
					table.addRow(['<small>[empty]</small>']);
				} else {
					table.thead.appendChild(
						util.hRow(['key','value'], 'colHeader')
					);
				}
				
				var ret = (settings.expanded || hasRunOnce) ? table.node : util.expander(
					util.stringify(obj),
					'Click to show more',
					function() {
						this.parentNode.appendChild(table.node);
					}
				);
				
				hasRunOnce = true;
				
				return ret;
				
			},
			array : function(arr, depth, key, jquery) {
				
				/* Checking depth + circular refs */
				/* Note, check for circular refs before depth; just makes more sense */
				var stackKey = util.within(stack).is(arr);
				if ( stackKey ) {
					return util.common.circRef(arr, stackKey);
				}
				stack[key||'TOP'] = arr;
				if (depth === settings.maxDepth) {
					return util.common.depthReached(arr);
				}
				
				/* Accepts a table and modifies it */
				var me = jquery ? 'jQuery' : 'Array', table = util.table([me + '(' + arr.length + ')', null], jquery ? 'jquery' : me.toLowerCase()),
					isEmpty = true,
                    count = 0;
				
				if (jquery){
					table.addRow(['selector',arr.selector]);
				}

				util.forEach(arr, function(item,i){
                    if (settings.maxArray >= 0 && ++count > settings.maxArray) {
                        table.addRow([
                            i + '..' + (arr.length-1),
                            typeDealer[ util.type(item) ]('...', depth+1, i)
                        ]);
                        return false;
                    }
					isEmpty = false;
					table.addRow([i, typeDealer[ util.type(item) ](item, depth+1, i)]);
				});

				if (!jquery){
					if (isEmpty) {
						table.addRow(['<small>[empty]</small>']);
					} else {
						table.thead.appendChild( util.hRow(['index','value'], 'colHeader') );
					}
				}
				
				return settings.expanded ? table.node : util.expander(
					util.stringify(arr),
					'Click to show more',
					function() {
						this.parentNode.appendChild(table.node);
					}
				);
				
			},
			'function' : function(fn, depth, key) {
				
				/* Checking JUST circular refs */
				var stackKey = util.within(stack).is(fn);
				if ( stackKey ) { return util.common.circRef(fn, stackKey); }
				stack[key||'TOP'] = fn;
				
				var miniTable = util.table(['Function',null], 'function'),
					argsTable = util.table(['Arguments']),
					args = fn.toString().match(/\((.+?)\)/),
					body = fn.toString().match(/\(.*?\)\s+?\{?([\S\s]+)/)[1].replace(/\}?$/,'');
					
				miniTable
					.addRow(['arguments', args ? args[1].replace(/[^\w_,\s]/g,'') : '<small>[none/native]</small>'])
					.addRow(['body', body]);
					
				return settings.expanded ? miniTable.node : util.expander(
					'function(){...}',
					'Click to see more about this function.',
					function(){
						this.parentNode.appendChild(miniTable.node);
					}
				);
			},
			'date' : function(date) {
				
				var miniTable = util.table(['Date',null], 'date'),
					sDate = date.toString().split(/\s/);
				
				/* TODO: Make this work well in IE! */
				miniTable
					.addRow(['Time', sDate[4]])
					.addRow(['Date', sDate.slice(0,4).join('-')]);
					
				return settings.expanded ? miniTable.node : util.expander(
					'Date (timestamp): ' + (+date),
					'Click to see a little more info about this date',
					function() {
						this.parentNode.appendChild(miniTable.node);
					}
				);
				
			},
			'boolean' : function(bool) {
				return util.txt( bool.toString().toUpperCase() );
			},
			'undefined' : function() {
				return util.txt('UNDEFINED');
			},
			'null' : function() {
				return util.txt('NULL');
			},
			'default' : function() {
				/* When a type cannot be found */
				return util.txt('prettyPrint: TypeNotFound Error');
			}
		};
		
		container.appendChild( typeDealer[ (settings.forceObject) ? 'object' : util.type(obj) ](obj, currentDepth) );
		
		return container;
		
	};
	
	/* Configuration */
	
	/* All items can be overwridden by passing an
	   "options" object when calling prettyPrint */
	prettyPrintThis.config = {
		
		/* Try setting this to false to save space */
		expanded: true,
		
		forceObject: false,
		maxDepth: 3,
		maxArray: -1,  // default is unlimited
		styles: {
			array: {
				th: {
					backgroundColor: '#6DBD2A',
					color: 'white'
				}
			},
			'function': {
				th: {
					backgroundColor: '#D82525'
				}
			},
			regexp: {
				th: {
					backgroundColor: '#E2F3FB',
					color: '#000'
				}
			},
			object: {
				th: {
					backgroundColor: '#1F96CF'
				}
			},
			jquery : {
				th: {
					backgroundColor: '#FBF315'
				}
			},
			error: {
				th: {
					backgroundColor: 'red',
					color: 'yellow'
				}
			},
			domelement: {
				th: {
					backgroundColor: '#F3801E'
				}
			},
			date: {
				th: {
					backgroundColor: '#A725D8'
				}
			},
			colHeader: {
				th: {
					backgroundColor: '#EEE',
					color: '#000',
					textTransform: 'uppercase'
				}
			},
			'default': {
				table: {
					borderCollapse: 'collapse',
					width: '100%'
				},
				td: {
					padding: '5px',
					fontSize: '12px',
					backgroundColor: '#FFF',
					color: '#222',
					border: '1px solid #000',
					verticalAlign: 'top',
					fontFamily: '"Consolas","Lucida Console",Courier,mono',
					whiteSpace: 'nowrap'
				},
				td_hover: {
					/* Styles defined here will apply to all tr:hover > td,
						- Be aware that "inheritable" properties (e.g. fontWeight) WILL BE INHERITED */
				},
				th: {
					padding: '5px',
					fontSize: '12px',
					backgroundColor: '#222',
					color: '#EEE',
					textAlign: 'left',
					border: '1px solid #000',
					verticalAlign: 'top',
					fontFamily: '"Consolas","Lucida Console",Courier,mono',
					backgroundImage: util.headerGradient,
					backgroundRepeat: 'repeat-x'
				}
			}
		}
	};
	
	return prettyPrintThis;
	
})();
