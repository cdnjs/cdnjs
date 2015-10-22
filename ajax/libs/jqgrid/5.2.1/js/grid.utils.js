/*global jQuery, define, URL */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {

	// AMD. Register as an anonymous module.
		define([
			"jquery"
		], factory );
	} else {

	// Browser globals
		factory();
	}
}(function() {
"use strict";
//module begin
$.extend($.jgrid,{
//window.jqGridUtils = {
	stringify : function(obj) {
		return JSON.stringify(obj,function(key, value){
            return (typeof value === 'function' ) ? value.toString() : value;
        });
	},
	parseFunc : function(str) {
		return JSON.parse(str,function(key, value){
			if(typeof value === "string" && value.indexOf("function") !== -1) {
				var sv = value.split(" ");
				if(sv[0].trim() === 'function' && value.trim().slice(-1) === "}") {
					return  eval('('+value+')');
				} else {
					return value;
				}
			}
			return value;
		});
	},
	encode : function ( text ) { // repeated, but should not depend on grid
		return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
	},
	jsonToXML : function ( tree, options ) {
		var o = $.extend( {
			xmlDecl : '<?xml version="1.0" encoding="UTF-8" ?>\n',
			attr_prefix : '-',
			encode : true
		}, options || {}),
		that = this,
		scalarToxml = function ( name, text ) {
			if ( name === "#text" ) {
				return (o.encode ? that.encode(text) : text);
			} else if(typeof(text) ==='function') {
				return "<"+name+"><![CDATA["+ text +"]]></"+name+">\n";
			} if(text === "") {
				return "<"+name+">__EMPTY_STRING_</"+name+">\n";
			} else {
				return "<"+name+">"+(o.encode ? that.encode(text) : text )+"</"+name+">\n";
			}
		},
		arrayToxml = function ( name, array ) {
			var out = [];
		    for( var i=0; i<array.length; i++ ) {
				var val = array[i];
		        if ( typeof(val) === "undefined" || val == null ) {
					out[out.length] = "<"+name+" />";
				} else if ( typeof(val) === "object" && val.constructor == Array ) {
					out[out.length] = arrayToxml( name, val );
				} else if ( typeof(val) === "object" ) {
					out[out.length] = hashToxml( name, val );
				} else {
					out[out.length] = scalarToxml( name, val );
				}
			}
			if(!out.length) {
				out[0] = "<"+ name+">__EMPTY_ARRAY_</"+name+">\n";
			}
			return out.join("");
		},
		hashToxml = function ( name, tree ) {
			var elem = [];
		    var attr = [];
		    for( var key in tree ) {
				if ( ! tree.hasOwnProperty(key) ) continue;
				var val = tree[key];
				if ( key.charAt(0) !==  o.attr_prefix ) {
					if ( val == null ) { // null or undefined
		               elem[elem.length] = "<"+key+" />";
					} else if ( typeof(val) === "object" && val.constructor === Array ) {
		                elem[elem.length] = arrayToxml( key, val );
		            } else if ( typeof(val) === "object" ) {
						elem[elem.length] = hashToxml( key, val );
					} else {
						elem[elem.length] = scalarToxml( key, val );
					}
				} else {
					attr[attr.length] = " "+(key.substring(1))+'="'+(o.encode ? that.encode( val ) : val)+'"';
				}
			}
			var jattr = attr.join("");
			var jelem = elem.join("");
			if ( name == null ) { // null or undefined
				// no tag
			} else if ( elem.length > 0 ) {
				if ( jelem.match( /\n/ )) {
					jelem = "<"+name+jattr+">\n"+jelem+"</"+name+">\n";
				} else {
					jelem = "<"+name+jattr+">"  +jelem+"</"+name+">\n";
				}
			} else {
				jelem = "<"+name+jattr+" />\n";
			}
			return jelem;
		};

		var xml = hashToxml( null, tree );
		return o.xmlDecl + xml;
	},
	xmlToJSON : function ( root, options ) {
		var o = $.extend ( {
			force_array : [], //[ "rdf:li", "item", "-xmlns" ];
			attr_prefix : '-'
		}, options || {} );
		
		if(!root) { return; }
		
	    var __force_array = {};
		if ( o.force_array ) {
			for( var i=0; i< o.force_array.length; i++ ) {
				__force_array[o.force_array[i]] = 1;
			}
		}
		
		if(typeof root === 'string') {
			root = $.parseXML(root);
		} 
		if(root.documentElement) {
			root = root.documentElement;
		}
		var addNode = function ( hash, key, cnts, val ) {
			if(typeof val === 'string') {
				if( val.indexOf('function') !== -1) {
					val =  eval( '(' + val +')'); // we need this in our implement
				} else {
					switch(val) {
						case '__EMPTY_ARRAY_' :
							val = [];
							break;
						case '__EMPTY_STRING_':
							val = "";
							break;
						case "false" :
							val = false;
							break;
						case "true":
							val = true;
							break;
					}
				}
			} 
			if ( __force_array[key] ) {
				if ( cnts === 1 ) {
					hash[key] = [];
				}
				hash[key][hash[key].length] = val;      // push
			} else if ( cnts === 1 ) {                   // 1st sibling
				hash[key] = val;
			} else if ( cnts === 2 ) {                   // 2nd sibling
				hash[key] = [ hash[key], val ];
			} else {                                    // 3rd sibling and more
				hash[key][hash[key].length] = val;
			}
		},
		parseElement = function ( elem ) {
			//  COMMENT_NODE
			if ( elem.nodeType === 7 ) {
				return;
			}

			//  TEXT_NODE CDATA_SECTION_NODE
			if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
				var bool = elem.nodeValue.match( /[^\x00-\x20]/ );
				if ( bool == null ) return;     // ignore white spaces
				return elem.nodeValue;
			}
			
			var retval,	cnt = {}, i, key, val;

			//  parse attributes
			if ( elem.attributes && elem.attributes.length ) {
				retval = {};
				for ( i=0; i<elem.attributes.length; i++ ) {
					key = elem.attributes[i].nodeName;
					if ( typeof(key) !== "string" )  {
						continue;
					}
					val = elem.attributes[i].nodeValue;
					if ( ! val ) {
						continue;
					}
					key = o.attr_prefix + key;
					if ( typeof(cnt[key]) === "undefined" ) {
						cnt[key] = 0;
					}
					cnt[key] ++;
					addNode( retval, key, cnt[key], val );
				}
			}

			//  parse child nodes (recursive)
			if ( elem.childNodes && elem.childNodes.length ) {
				var textonly = true;
				if ( retval ) {
					textonly = false;
				}        // some attributes exists
				for ( i=0; i<elem.childNodes.length && textonly; i++ ) {
					var ntype = elem.childNodes[i].nodeType;
					if ( ntype === 3 || ntype === 4 ) {
						continue;
					}
					textonly = false;
				}
				if ( textonly ) {
					if ( ! retval ) {
						retval = "";
					}
					for ( i=0; i<elem.childNodes.length; i++ ) {
						retval += elem.childNodes[i].nodeValue;
					}
				} else {
					if ( ! retval ) {
						retval = {};
					}
					for ( i=0; i<elem.childNodes.length; i++ ) {
						key = elem.childNodes[i].nodeName;
						if ( typeof(key) !== "string" ) {
							continue;
						}
						val = parseElement( elem.childNodes[i] );
						if ( !val ) {
							continue;
						}
						if ( typeof(cnt[key]) === "undefined" ) {
							cnt[key] = 0;
						}
						cnt[key] ++;
						addNode( retval, key, cnt[key], val );
					}
				}
			}
			return retval;
		};
		
	    var json = parseElement( root );   // parse root node
		if ( __force_array[root.nodeName] ) {
			json = [ json ];
		}
		if ( root.nodeType !== 11 ) {            // DOCUMENT_FRAGMENT_NODE
			var tmp = {};
			tmp[root.nodeName] = json;          // root nodeName
			json = tmp;
		}
		return json;
	},
	saveAs : function (data, fname, opts) {
		opts = $.extend(true,{
			type : 'plain/text;charset=utf-8'
		}, opts || {});

		var file, url, tmp = []; 

		fname = fname == null || fname === '' ? 'jqGridFile.txt' : fname;

		if(!$.isArray(data) ) {
			tmp[0]= data ;
		} else {
			tmp = data;	
		}
		try {
			file = new File(tmp, fname, opts);
		} catch (e) {
			file = new Blob(tmp, opts);
		}
		if ( window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob( file , fname );
		} else {
			url = URL.createObjectURL(file);
			var a = document.createElement("a");
			a.href = url;
			a.download = fname;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
});
//module end
//return window.jqGridUtils;
}));