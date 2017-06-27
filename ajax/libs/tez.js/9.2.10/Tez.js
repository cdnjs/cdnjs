(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tez = global.Tez || {})));
}(this, (function (exports) { 'use strict';

if ( !String.prototype.includes ) {
	String.prototype.includes = function (find) {
		return this.indexOf(find) > -1;
	};
}

if (!Array.from) {
	var slice = [].slice;
	Array.from = function from(arrayLike) {
		return slice.call(arrayLike);
	};
}

function attrs(a) {
	if ( !(a && a.attributes) )
		{ return '{}'; }
	var _a = {};
	var attributes = a.attributes;
	for ( var i = 0, atr = (void 0), len = attributes.length; i < len; i++ ) {
		atr = attributes[ i ];
		if (atr.value) {
		_a[ atr.name ] = atr.value;
		}
	}
	return JSON.stringify( _a );
}

var ROOT = typeof(window) !== "undefined" ? window : typeof(global) !== "undefined" ? global : {};
var ARRAY_SLICE = [].slice;

var document$1 = ROOT.document;

var _tmpDiv = document$1 !== undefined ? document$1.createElement( "div" ) : false;
function _parseString (str) {
	if ( !str || !_tmpDiv ) {
		return [];
	}
	_tmpDiv.innerHTML = str;
	return ARRAY_SLICE.call( _tmpDiv.children );
}

function extend(a, b) {
	if ( a === void 0 ) a = {};
	if ( b === void 0 ) b = {};

	for (var p in b) {
		if (a[p] === undefined && b[p] !== undefined) {
			a[p] = b[p];
		}
	}
	return a;
}

function _getItem( item, parent ) {
	if ( item.isEqualNode( parent ) ) {
		return item;
	}
	var childs = ARRAY_SLICE.call( parent.children );
	var i = 0;
	var _match;
	var _parentWhile;
	var _matchInsideWhile;
	if ( childs.length ) {
		while ( i < childs.length ) {
			if ( childs[ i ] && childs[ i ].isEqualNode( item ) ) {
				_match = childs[ i ];
				_parentWhile = parent;
				break;
			} else if ( _matchInsideWhile = _getItem( item, _parentWhile = childs[ i ] ) ) {
				_match = _matchInsideWhile;
				break;
			}
			i++;
		}
	} else if ( item.isEqualNode( parent ) ) {
		_match = parent;
	}
	if ( _match ) {
		return {
			matched: _match
			, matchParent: _parentWhile
		}
	}
	return null;
}

var HTMLSyntaxTags = new RegExp("&lt;|&gt;|/>|<|>", "g");

function replaceChildrenByDiff(_attrs, _vattrs, _childs, _childs2, _store) {
	if ( _childs === void 0 ) _childs = [];
	if ( _childs2 === void 0 ) _childs2 = [];
	if ( _store === void 0 ) _store = [];

	if ( !_attrs || !_vattrs) {
		return null;
	}
	var _attrs1 = attrs(_attrs);
	var _attrs2 = attrs(_vattrs);
	var i = 0;
	var _max = Math.max(_childs.length, _childs2.length);
	var _attrTag = _attrs.tagName,
	_vattrTag = _vattrs.tagName;
	var _isNT = _attrs.nodeType,
		_isVNT = _vattrs.nodeType,
		_isTN = _isNT === 3,
		_isVTN = _isVNT === 3;
	var _attrCSS = _attrs && _attrs.style && _attrs.style.cssText,
	_vattrCSS = _vattrs && _vattrs.style && _vattrs.style.cssText;
	var _attrHTML = _attrs.innerHTML,
	_vattrHTML = _vattrs.innerHTML;
	var _isEqualHTML = _attrHTML === _vattrHTML;
	var _isEqualCSS = _attrCSS === _vattrCSS;
	var _isEqualTag = _attrTag === _vattrTag;
	var _isEqualTag8CSS = _isEqualCSS && _isEqualTag;
	var _isEqualTextNode = _isTN === true && (_isTN === _isVTN);
	var _isEqualAttr = _attrs === _attrs2;
	var item;
	var pi;
	var ni;
	var _tmp;
	var len;
	var itemReal, itemVirtual;
	if (_max) {
		while (i < _max) {
			itemVirtual = _childs[i];
			itemReal = _childs2[i];
			if (itemVirtual && !itemReal) {
				_store.push({
					index: i,
					diff: false,
					virtual: itemVirtual,
					real: 'append'
				});
			} else if (itemReal && !_childs[i]) {
				_store.push({
					index: i,
					diff: false,
					virtual: 'append',
					real: itemReal
				});
			} else if (itemVirtual && itemVirtual.isEqualNode(itemReal) === false) {
				_store.push({
					index: i,
					diff: true,
					virtual: itemVirtual,
					real: itemReal
				});
			}
			i++;
		}
	}
	if (_store.length) {
		var a = 0;
		var _tmp$1;
		while (item = _store.shift()) {
			i = item.index;
			var pi$1 = i - 1;
			var ni$1 = i + 1;
			var vr = item.virtual;
			var rr = item.real;
			if (!item.diff && rr === 'append') {
				_tmp$1 = _childs2[ni$1];
				if (_tmp$1) {
					_attrs.insertBefore(vr, _tmp$1);
				} else {
					_attrs.appendChild(vr);
				}
			} else if (!item.diff && vr === 'append') {
				if (rr.remove !== undefined) {
					rr.remove();
				} else {
					_attrs.removeChild(rr);
				}
			} else if (item.diff) {
				if (rr.tagName === undefined || vr.tagName === undefined || rr.tagName !== vr.tagName) {
				_attrs.replaceChild(vr, rr);
				} else {
				replaceChildrenByDiff(rr, vr, vr.childNodes, rr.childNodes);
				}
			}
		}
	} else if (_isEqualTextNode && _attrs.value !== _vattrs.value) {
		_attrs.value = _vattrs.value;
	} else if (!_isEqualTag && _attrs.parentNode !== null && _vattrs && _vattrs.nodeType) {
		_attrs.parentNode.replaceChild(_vattrs, _attrs);
	} else if (!_isEqualAttr && _isEqualTag8CSS && _isEqualHTML) {
		var _diff = extend(JSON.parse(_attrs2), JSON.parse(_attrs1));
		for (var p in _diff) {
			if (p === "style") {
				continue;
			}
			_attrs.setAttribute(p, _diff[p]);
		}
	} else if (HTMLSyntaxTags.test(_vattrHTML) && _attrHTML !== _vattrHTML) {
		if (_attrs.childNodes && _attrs.childNodes.length) {
			replaceChildrenByDiff(_attrs, _vattrs, _vattrs.childNodes, _attrs.childNodes);
		} else if (_attrs.isEqualNode(_vattrs)) {
			_attrs.innerHTML = _vattrs.innerHTML;
		} else {
			_attrs.parentNode.replaceChild(_vattrs, _attrs);
		}
		// maybe later...
	} else {
		if (_attrs.textContent) {
			_attrs.textContent = _vattrs.textContent;
		} else {
			_attrs.innerText = _vattrs.innerText;
		}
	}
	return _attrs;
}

//Code adapted from https://gist.github.com/Dynalon/a8790a1fa66bfd2c26e1
// Then improved by @dalisoft for tez.js
var createElement$1 = function (tagName, attributes) {
    var children = [], len = arguments.length - 2;
    while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];


    if (!tagName || typeof tagName !== 'string')
        { throw new Error("tagName has to be defined, non-empty string"); }

	children = children || [];
	attributes = attributes || [];

    var element = document.createElement(tagName);
	var attrKeys = Object.keys(attributes);

	attrKeys.map(function (attribute_key) {
        var attribute_value = attributes[attribute_key];
        element.setAttribute(attribute_key, attribute_value);
    });

	children.map(function (child) {
        if (child instanceof HTMLElement)
            { element.appendChild(child); }
        else if (typeof child === 'string' || typeof child === 'number')
            { element.appendChild(document.createTextNode(child)); }
    });

    return element;
};

var domClass = function domClass( node, vars ) {
	if ( vars === void 0 ) vars = {};

	this._vars = vars;
	if ( vars.quickRender === undefined ) {
		vars.quickRender = true;
	}
	this._opt = {};
	this._node = typeof( node ) === 'string' ? document.querySelector( node ) : node.length && node[ 0 ].nodeType ? node[ 0 ] : node;
	this._vnode = this._node.cloneNode( true );
	this._quickRender = vars.quickRender;
	this._disableSafeParse = vars.disableSafeParse;
	this._appendStore = [];
	this.props = {};
	this._listOfNodes = [];
	if ( vars.styling === undefined ) {
		vars.styling = this._vnode.style.cssText;
	}
	if ( vars.attrs === undefined ) {
		vars.attrs = attrs( this._vnode );
	}
	if ( vars.content === undefined ) {
		vars.content = this._vnode.innerHTML;
	}
	return this.render();
};
domClass.getComponentRendered = function getComponentRendered (get, param, that) {
	var _params = Object.assign({}, that ? that.props : {}, param);
	if (that) {
		that.props = _params;
	}
	if (typeof get === "string" || typeof get === "number") {
		return get;
	} else if (get === undefined || get === null) {
		return '';
	} else if ( typeof get === "function" || typeof get === "object" ) {
		
		var oldGet = get;
		get = typeof(get) === "function" ? that && !get.initted ? new get(that) : get(that) : get;
		get.props = _params;
		if (!(get.Render || get.render)) {
			get = oldGet;
		}
	if (that) {
		get.super = that;
	}
	if (get && !get.initted && typeof get.init === "function") {
		get.init();
		get.initted = true;
	}
	var viewMethod = get.Render ? "Render" : "render";
		var compileComponent2Node = get && ( get.Render || get.render );
	return compileComponent2Node && get[ viewMethod ] ? get[ viewMethod ]() : false;
	}
	return '';
};
domClass.parseComponent = function parseComponent ( get, multi, param, that ) {
	var finalNode;
	if ( get && get.nodeType ) {
		finalNode = get;
	} else if ( typeof get === "string" ) {
		var compileStr2Node = get.includes( "</" ) || get.includes( "/>" );
		if ( compileStr2Node ) {
			finalNode = _parseString( get );
		} else {
			finalNode = [document.createElement( get )];
		}
	} else if ( typeof get === "function" || typeof get === "object" ) {
		var compileComponent2Node = domClass.getComponentRendered(get, param, that);
		if ( compileComponent2Node ) {
			finalNode = _parseString( compileComponent2Node );
		} else {
			finalNode = [_makeNode( typeof get === "function" ? get() : get )];
		}
	}
	return multi ? finalNode : finalNode[0];
};
domClass.prototype.createElement = function createElement$$1 ( opts ) {
	var item;
	var appendStore = this._appendStore;
	var len = appendStore.length;
	appendStore[ len ] = {
		real: 'append'
		, virtual: ( item = _makeNode( opts ) )
		, diff: false
		, index: len
	};
	return item;
};
domClass.prototype.sync = function sync ( ref ) {
		var props = ref.props;
		var content = ref.content;
		var styling = ref.styling;
		var attrs$$1 = ref.attrs;

	if ( props ) {
		this.props = props;
	}
	if ( content ) {
		this.vars.content = content;
	}
	if ( styling ) {
		this.vars.styling = styling;
	}
	if ( attrs$$1 ) {
		this.vars.attrs = attrs$$1;
	}

	return this;
};
domClass.prototype.setProps = function setProps ( props ) {
		var this$1 = this;

	for ( var p in props ) {
		this$1.props[ p ] = props[ p ];
	}
	return this._quickRender ? this.render() : this;
};
domClass.prototype.setEvent = function setEvent ( find, eventName, eventFunc ) {
	var __self__ = this;
	var ref = this;
		var _node = ref._node;

	if ( eventFunc === undefined && typeof eventName === "function" ) {
		eventFunc = eventName;
		eventName = find;
		find = null;
	}

	var __eventFunc__ = function( e ) {
		eventFunc.call( __self__, this, e );
	};
	if ( eventFunc && find === null ) {
		_node.addEventListener( eventName, __eventFunc__ );
	} else if ( eventFunc ) {
		find = _node.querySelector( find );
		find.addEventListener( eventName, __eventFunc__ );
	}
	return this._quickRender ? this.render() : this;
};
domClass.prototype.createFunction = function createFunction ( fn ) {
	fn.call( this );
	return this._quickRender ? this.render() : this;
};
domClass.prototype.render = function render () {
	var ref = this;
		var _vars = ref._vars;
		var _node = ref._node;
		var _vnode = ref._vnode;
		var _appendStore = ref._appendStore;
		var _listOfNodes = ref._listOfNodes;
		var _disableSafeParse = ref._disableSafeParse;
	var _vattrs = _vars.attrs;
	var _attrs = attrs( _node );
	var _diff, _diff2;
	if ( _attrs !== _vattrs ) {
		_diff = JSON.parse( _vattrs );
		_diff2 = JSON.parse( _attrs );
		for ( var p in _diff ) {
			_node.setAttribute( p, _diff[ p ] );
		}
		for ( var p$1 in _diff2 ) {
			if ( _diff[ p$1 ] === undefined ) {
				_node.removeAttribute( p$1 );
			}
		}
		_vars.attrs = attrs( _vnode );
	}
	_vattrs = _vars.styling;
	_attrs = _node.style.cssText;
	if ( _vattrs !== _attrs ) {
		this._node.style.cssText = _vattrs;
		_vars.styling = _node.style.cssText;
	}
	_vattrs = _vars.content;
	_attrs = _node.innerHTML;
	if ( !_disableSafeParse ) {
		_vattrs = _vattrs.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	for ( var i = 0, idx = (void 0), len = _listOfNodes.length; i < len; i++ ) {
		idx = _appendStore.length;
		_appendStore[ idx ] = {
			virtual: _listOfNodes[ i ]
			, real: 'append'
			, diff: false
			, index: idx
		};
	}
	if ( _appendStore.length || _attrs !== _vattrs ) {
		_vnode.innerHTML = _vattrs;
		replaceChildrenByDiff( _node, _vnode, _vnode.childNodes, _node.childNodes, _appendStore );
		_vars.content = _vnode.innerHTML;
	}
	return this;
};
domClass.prototype.setNode = function setNode ( node ) {
	this._listOfNodes.push( node );
	return this._quickRender ? this.render() : this;
};
domClass.prototype.setAttrs = function setAttrs ( _attrs ) {
	var attr;
	var nattr = {};
	var _attr = JSON.parse( this._vars.attrs );
	for ( var p in _attr ) {
		if ( _attr[ p ] !== undefined ) {
			nattr[ p ] = _attr[ p ];
		}
	}
	for ( var p in _attrs ) {
		if ( _attrs[ p ] !== undefined ) {
			nattr[ p ] = _attrs[ p ];
		}
	}
	this._vars.attrs = JSON.stringify( nattr );
	return this._quickRender ? this.render() : this;
};
domClass.prototype.setStyling = function setStyling ( cssText ) {
	var styling = this._vars.styling;
	var style = this._vnode.style;
	style.cssText = styling;
	for ( var p in cssText ) {
		style[ p ] = cssText[ p ];
	}
	this._vars.styling = style.cssText;
	return this._quickRender ? this.render() : this;
};
domClass.prototype.setView = function setView ( get, param ) {
	var finalNode = domClass.parseComponent( get, false, param, this );
	if ( finalNode && finalNode.nodeType ) {
		this._vars.content = finalNode.innerHTML;
		this._vars.styling = finalNode.style.cssText;
		this._vars.attrs = attrs( finalNode );
	}
	return this._quickRender ? this.render() : this;
};
domClass.prototype.setContent = function setContent ( contents, param ) {
	var content = this._vars.content;
	if ( !contents ) {
		return this._quickRender ? this.render() : this;
	}
	contents = domClass.getComponentRendered(typeof( contents ) === "string" ? contents : contents.nodeType ? contents.outerHTML : contents, param, this);
	contents = contents.nodeType ? contents.outerHTML : contents;
	var rel = contents.includes( "=" ) ? contents.charAt( 0 ) === "+" ? 1 : contents.charAt( 0 ) === "-" ? -1 : 0 : 0;

	if ( rel === 0 ) {
		content = contents;
	} else if ( rel === 1 ) {
		content += contents.substr( 2 );
	} else if ( rel === -1 ) {
		var _getParsed = _parseString( contents.substr( 2 ) )[ 0 ];
		var _find = _getItem( _getParsed, this._node );
		if ( _find && _find.matched ) {
			this._appendStore.push( {
				virtual: _find.matched
				, real: 'append'
				, remove: true
			} );
		}
	}

	this._vars.content = content;
	return this._quickRender ? this.render() : this;
};

var Tez = Object.assign(domClass, { createElement: createElement$1 });

exports.Tez = Tez;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tez.js.map
