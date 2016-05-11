/*!
	PURE Unobtrusive Rendering Engine for HTML

	Licensed under the MIT licenses.
	More information at: http://www.opensource.org

	Copyright (c) 2013 Michael Cvilic - BeeBole.com

	Thanks to Rog Peppe for the functional JS jump
	revision: 2.83
*/

var $p = function(){
	var args = arguments,
		sel = args[0],
		ctxt = false;

	if(typeof sel === 'string'){
		ctxt = args[1] || false;
	}else if(sel && !sel[0] && !sel.length){
		sel = [sel];
	}
	return $p.core(sel, ctxt);
},
pure = $p;


$p.core = function(sel, ctxt, plugins){
	//get an instance of the plugins
	var templates = [], i, ii,
		// set the signature string that will be replaced at render time
		Sig = '_s' + Math.floor( Math.random() * 1000000 ) + '_',
		// another signature to prepend to attributes and avoid checks: style, height, on[events]...
		attPfx = '_a' + Math.floor( Math.random() * 1000000 ) + '_',
		// rx to parse selectors, e.g. "+tr.foo[class]"
		selRx = /^(\+)?([^\@\+]+)?\@?([^\+]+)?(\+)?$/,
		// set automatically attributes for some tags
		autoAttr = {
			IMG:'src',
			INPUT:'value'
		},
		// check if the argument is an array - thanks salty-horse (Ori Avtalion)
		isArray = Array.isArray ?
			function(o) {
				return Array.isArray(o);
			} :
			function(o) {
				return Object.prototype.toString.call(o) === "[object Array]";
			};

	plugins = plugins || getPlugins();

	//search for the template node(s)
	switch(typeof sel){
		case 'string':
			templates = plugins.find(ctxt || document, sel);
			if(templates.length === 0) {
				error('The template "' + sel + '" was not found');
			}
		break;
		case 'undefined':
			error('The root of the template is undefined, check your selector');
		break;
		default:
			templates = sel;
	}

	for( i = 0, ii = templates.length; i < ii; i++){
		plugins[i] = templates[i];
	}
	plugins.length = ii;

	/* * * * * * * * * * * * * * * * * * * * * * * * * *
		core functions
	 * * * * * * * * * * * * * * * * * * * * * * * * * */


	// error utility
	function error(e){
		if(typeof console !== 'undefined'){
			console.log(e);
			//debugger;
		}
		throw('pure error: ' + e);
	}

	//return a new instance of plugins
	function getPlugins(){
		var plugins = $p.plugins,
			f = function(){};
		f.prototype = plugins;

		// do not overwrite functions if external definition
		f.prototype.compile    = plugins.compile || compile;
		f.prototype.render     = plugins.render || render;
		f.prototype.autoRender = plugins.autoRender || autoRender;
		f.prototype.find       = plugins.find || find;

		// give the compiler and the error handling to the plugin context
		f.prototype._compiler  = compiler;
		f.prototype._error     = error;

		return new f();
	}

	// returns the outer HTML of a node
	function outerHTML(node){
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (
			function(n){
			var div = document.createElement('div'), h;
			div.appendChild( n.cloneNode(true) );
				h = div.innerHTML;
				div = null;
				return h;
			}(node));
	}

	// returns the string generator function
	function wrapquote(qfn, f){
		return function(ctxt){
			return qfn( String( f.call(ctxt.item || ctxt.context, ctxt) ) ) ;
		};
	}

	// default find using querySelector when available on the browser
	function find(n, sel){
		if(typeof n === 'string'){
			sel = n;
			n = false;
		}
		return (n||document).querySelectorAll( sel );
	}

	// create a function that concatenates constant string
	// sections (given in parts) and the results of called
	// functions to fill in the gaps between parts (fns).
	// fns[n] fills in the gap between parts[n-1] and parts[n];
	// fns[0] is unused.
	// this is the inner template evaluation loop.
	function concatenator(parts, fns){
		return function(ctxt){
			var strs = [ parts[ 0 ] ],
				n = parts.length,
				fnVal, pVal, attLine, pos, i;
			try{
				for(i = 1; i < n; i++){
					fnVal = fns[i].call( this, ctxt );
					pVal = parts[i];

					// if the value is empty and attribute, remove it
					if(fnVal === ''){
						attLine = strs[ strs.length - 1 ];
						if( ( pos = attLine.search( /[^\s]+=\"?$/ ) ) > -1){
							strs[ strs.length - 1 ] = attLine.substring( 0, pos );
							pVal = pVal.substr( 1 );
						}
					}

					strs[ strs.length ] = fnVal;
					strs[ strs.length ] = pVal;
				}
				return strs.join('');
			}catch(e){
				if(console && console.log){
					console.log( 
						e.stack || 
						e.message + ' (' + e.type + ( e['arguments'] ? ', ' + e['arguments'].join('-') : '' ) + '). Use Firefox or Chromium/Chrome to get a full stack of the error. ' );
				}
				return '';
			}
		};
	}

	// parse and check the loop directive
	function parseloopspec(p){
		var m = p.match( /^(\w+)\s*<-\s*(\S+)?$/ );
		if(m === null){
			error('bad loop spec: "' + p + '"');
		}
		if(m[1] === 'item'){
			error('"item<-..." is a reserved word for the current running iteration.\n\nPlease choose another name for your loop.');
		}
		if( !m[2] || m[2].toLowerCase() === 'context' ){ //undefined or space(IE)
			m[2] = function(ctxt){return ctxt.context;};
		}else if( (m[2] && m[2].indexOf('context') === 0 ) ){ //undefined or space(IE)
			m[2] = dataselectfn( m[2].replace(/^context\.?/, '') );
		}
		return {name: m[1], sel: m[2]};
	}

	// parse a data selector and return a function that
	// can traverse the data accordingly, given a context.
	function dataselectfn (sel){
		if( typeof(sel) === 'function' ){
			//handle false values in function directive
			return function ( ctxt ){
				var r = sel.call( ctxt.item || ctxt.context || ctxt, ctxt ); 
				return !r && r !== 0 ? '' : r;
			};
		}
		//check for a valid js variable name with hyphen(for properties only), $, _ and :
		var m = sel.match(/^[\da-zA-Z\$_\@\#][\w\$:\-\#]*(\.[\w\$:\-\#]*[^\.])*$/),
			found = false, s = sel, parts = [], pfns = [], i = 0, retStr;

		if(m === null){
			// check if literal
			if(/\'|\"/.test( s.charAt(0) )){
				if(/\'|\"/.test( s.charAt(s.length-1) )){
					retStr = s.substring(1, s.length-1);
					return function(){ return retStr; };
				}
			}else{
				// check if literal + #{var}
				while((m = s.match(/#\{([^{}]+)\}/)) !== null){
					found = true;
					parts[i++] = s.slice(0, m.index);
					pfns[i] = dataselectfn(m[1]);
					s = s.slice(m.index + m[0].length, s.length);
				}
			}
			if(!found){ //constant, return it
				return function(){ return sel; };
			}
			parts[i] = s;
			return concatenator(parts, pfns);
		}
		m = sel.split('.');
		return function(ctxt){
			var data = ctxt.context || ctxt,
				v = ctxt[m[0]],
				i = 0,
				n,
				dm;

			if(v && typeof v.item !== 'undefined'){
				i += 1;
				if(m[i] === 'pos'){
					//allow pos to be kept by string. Tx to Adam Freidin
					return v.pos;
				}
				data = v.item;
			}
			n = m.length;
				
			while( i < n ){
				if(!data){break;}
				dm = data[ m[i] ];
				//if it is a function call it
				data = typeof dm === 'function' ? dm.call( data ) : dm;
				i++;
			}
			
			return (!data && data !== 0) ? '':data;
		};
	}

	// wrap in an object the target node/attr and their properties
	function gettarget(dom, sel, isloop){
		var osel, prepend, selector, attr, append, target = [], m,
			setstr, getstr, quotefn, isStyle, isClass, attName, setfn;
		if( typeof sel === 'string' ){
			osel = sel;
			m = sel.match(selRx);
			if( !m ){
				error( 'bad selector syntax: ' + sel );
			}

			prepend = m[1];
			selector = m[2];
			attr = m[3];
			append = m[4];

			if(selector === '.' || ( !selector && attr ) ){
				target[0] = dom;
			}else{
				target = plugins.find(dom, selector);
			}
			if(!target || target.length === 0){
				return error('The node "' + sel + '" was not found in the template:\n' + outerHTML(dom).replace(/\t/g,'  '));
			}
		}else{
			// autoRender node
			prepend = sel.prepend;
			attr = sel.attr;
			append = sel.append;
			target = [dom];
		}

		if( prepend || append ){
			if( prepend && append ){
				error('append/prepend cannot take place at the same time');
			}else if( isloop ){
				error('no append/prepend/replace modifiers allowed for loop target');
			}else if( append && isloop ){
				error('cannot append with loop (sel: ' + osel + ')');
			}
		}
		
		if(attr){
			isStyle = (/^style$/i).test(attr);
			isClass = (/^class$/i).test(attr);
			attName = isClass ? 'className' : attr;
			setstr = function(node, s) {
				node.setAttribute(attPfx + attr, s);
				if ( node[attName] && !isStyle) {
					try{node[attName] = '';}catch(e){} //FF4 gives an error sometimes
				}
				if (node.nodeType === 1) {
					node.removeAttribute(attr);
					if(isClass){
						node.removeAttribute(attName);
					}
				}
			};
			if (isStyle || isClass) {//IE no quotes special care
				if(isStyle){
					getstr = function(n){ return n.style.cssText; };
				}else{
					getstr = function(n){ return n.className;	};
				}
			}else {
				getstr = function(n){ return n.getAttribute(attr); };
			}
			quotefn = function(s){ return s.replace(/\"/g, '&quot;'); };
			if(prepend){
				setfn = function(node, s){ setstr( node, s + getstr( node )); };
			}else if(append){
				setfn = function(node, s){ setstr( node, getstr( node ) + s); };
			}else{
				setfn = function(node, s){ setstr( node, s ); };
			}
		}else{
			if (isloop) {
				setfn = function(node, s) {
					var pn = node.parentNode;
					if (pn) {
						//replace node with s
						pn.insertBefore(document.createTextNode(s), node.nextSibling);
						pn.removeChild(node);
					}else{
						error('The template root, can\'t be looped.');
					}
				};
			} else {
				if (prepend) {
					setfn = function(node, s) { node.insertBefore(document.createTextNode(s), node.firstChild);	};
				} else if (append) {
					setfn = function(node, s) { node.appendChild(document.createTextNode(s));};
				} else {
					setfn = function(node, s) {
						while (node.firstChild) { node.removeChild(node.firstChild); }
						node.appendChild(document.createTextNode(s));
					};
				}
			}
			quotefn = function(s) { return s; };
		}
		return { attr: attr, nodes: target, set: setfn, sel: osel, quotefn: quotefn };
	}

	function setsig(target, n){
		var sig = Sig + n + ':', i;
		for(i = 0; i < target.nodes.length; i++){
			// could check for overlapping targets here.
			target.set( target.nodes[i], sig );
		}
	}

	// read de loop data, and pass it to the inner rendering function
	function loopfn(name, dselect, inner, sorter, filter){
		return function(ctxt){
			var a = dselect(ctxt),
				old = ctxt[name],
				temp = { items : a },
				filtered = 0,
				length,
				strs = [],
				buildArg = function(idx, temp, ftr, len){
					//keep the current loop. Tx to Adam Freidin
					var save_pos = ctxt.pos,
						save_item = ctxt.item,
						save_items = ctxt.items;
					ctxt.pos = temp.pos = idx;
					ctxt.item = temp.item = a[ idx ];
					ctxt.items = a;
					//if array, set a length property - filtered items
					if(typeof len !== 'undefined'){ (ctxt.length = len); }
					//if filter directive
					if(typeof ftr === 'function' && ftr.call(ctxt.item, ctxt) === false){
						filtered++;
						return;
					}
					strs.push( inner.call(ctxt.item, ctxt ) );
					//restore the current loop
					ctxt.pos = save_pos;
					ctxt.item = save_item;
					ctxt.items = save_items;
				},
				prop, i, ii;
			ctxt[name] = temp;
			if( isArray(a) ){
				length = a.length || 0;
				// if sort directive
				if(typeof sorter === 'function'){
					a.sort(function(a, b){
						return sorter.call(ctxt, a, b);
					});
				}
				//loop on array
				for(i = 0, ii = length; i < ii; i++){
					buildArg(i, temp, filter, length - filtered);
				}
			}else{
				if(a && typeof sorter !== 'undefined'){
					error('sort is only available on arrays, not objects');
				}
				//loop on collections
				for( prop in a ){
					if( a.hasOwnProperty( prop ) ){
						buildArg(prop, temp, filter);
					}
				}
			}

			if( typeof old !== 'undefined'){
				ctxt[name] = old;
			}else{
				delete ctxt[name];
			}
			return strs.join('');
		};
	}
	// generate the template for a loop node
	function loopgen(dom, sel, loop, fns){
		var already = false, ls, sorter, filter, prop, dsel, spec, itersel, target, nodes, node, inner;
		for(prop in loop){
			if(loop.hasOwnProperty(prop)){
				if(prop === 'sort'){
					sorter = loop.sort;
				}else if(prop === 'filter'){
					filter = loop.filter;
				}else if(already){
					error('cannot have more than one loop on a target');
				}else{
					ls = prop;
					already = true;
				}
			}
		}
		if(!ls){
			error('Error in the selector: ' + sel + '\nA directive action must be a string, a function or a loop(<-)');
		}
		dsel = loop[ls];
		// if it's a simple data selector then we default to contents, not replacement.
		if(typeof(dsel) === 'string' || typeof(dsel) === 'function'){
			loop = {};
			loop[ls] = {root: dsel};
			return loopgen(dom, sel, loop, fns);
		}
		
		spec = parseloopspec(ls);
		itersel = dataselectfn(spec.sel);
		target = gettarget(dom, sel, true);
		nodes = target.nodes;

		for(i = 0; i < nodes.length; i++){
			node = nodes[i];
			inner = compiler(node, dsel);
			fns[fns.length] = wrapquote(target.quotefn, loopfn(spec.name, itersel, inner, sorter, filter));
			target.nodes = [node];		// N.B. side effect on target.
			setsig(target, fns.length - 1);
		}
		return target;
	}

	function getAutoNodes(n, data){
		var ns = n.getElementsByTagName('*'),
			an = [],
			openLoops = {a:[],l:{}},
			cspec,
			isNodeValue,
			i, ii, j, jj, ni, cs, cj;
		//for each node found in the template
		for(i = -1, ii = ns.length; i < ii; i++){
			ni = i > -1 ?ns[i]:n;
			if(ni.nodeType === 1 && ni.className !== ''){
				//when a className is found
				cs = ni.className.split(' ');
				// for each className
				for(j = 0, jj=cs.length;j<jj;j++){
					cj = cs[j];
					// check if it is related to a context property
					cspec = checkClass(cj, ni.tagName);
					// if so, store the node, plus the type of data
					if(cspec !== false){
						isNodeValue = (/nodevalue/i).test(cspec.attr);
						if(cspec.sel.indexOf('@') > -1 || isNodeValue){
							ni.className = ni.className.replace('@'+cspec.attr, '');
							if(isNodeValue){
								cspec.attr = false;
							}
						}
						an.push({n:ni, cspec:cspec});
					}
				}
			}
		}

		function checkClass(c, tagName){
			// read the class
			var ca = c.match(selRx),
				attr = ca[3] || autoAttr[tagName],
				cspec = {prepend:!!ca[1], prop:ca[2], attr:attr, append:!!ca[4], sel:c},
				i, ii, loopi, loopil, val;
			// check in existing open loops
			for(i = openLoops.a.length-1; i >= 0; i--){
				loopi = openLoops.a[i];
				loopil = loopi.l[0];
				val = loopil && loopil[cspec.prop];
				if(typeof val !== 'undefined'){
					cspec.prop = loopi.p + '.' + cspec.prop;
					if(openLoops.l[cspec.prop] === true){
						val = val[0];
					}
					break;
				}
			}
			// not found check first level of data
			if(typeof val === 'undefined'){
				val = dataselectfn(cspec.prop)(isArray(data) ? data[0] : data);
				// nothing found return
				if(val === ''){
					return false;
				}
			}
			// set the spec for autoNode
			if(isArray(val)){
				openLoops.a.push( {l:val, p:cspec.prop} );
				openLoops.l[cspec.prop] = true;
				cspec.t = 'loop';
			}else{
				cspec.t = 'str';
			}
			return cspec;
		}

		return an;

	}

	// returns a function that, given a context argument,
	// will render the template defined by dom and directive.
	function compiler(dom, directive, data, ans){
		var fns = [], j, jj, cspec, n, target, nodes, itersel, node, inner, dsel, sels, sel, sl, i, h, parts,  pfns = [], p;
		// autoRendering nodes parsing -> auto-nodes
		ans = ans || (data && getAutoNodes(dom, data));
		if(data){
			// for each auto-nodes
			while(ans.length > 0){
				cspec = ans[0].cspec;
				n = ans[0].n;
				ans.splice(0, 1);
				if(cspec.t === 'str'){
					// if the target is a value
					target = gettarget(n, cspec, false);
					setsig(target, fns.length);
					fns[fns.length] = wrapquote(target.quotefn, dataselectfn(cspec.prop));
				}else{
					// if the target is a loop
					itersel = dataselectfn(cspec.sel);
					target = gettarget(n, cspec, true);
					nodes = target.nodes;
					for(j = 0, jj = nodes.length; j < jj; j++){
						node = nodes[j];
						inner = compiler(node, false, data, ans);
						fns[fns.length] = wrapquote(target.quotefn, loopfn(cspec.sel, itersel, inner));
						target.nodes = [node];
						setsig(target, fns.length - 1);
					}
				}
			}
		}
		// read directives
		for(sel in directive){
			if(directive.hasOwnProperty(sel)){
				i = 0;
				dsel = directive[sel];
				sels = sel.split(/\s*,\s*/); //allow selector separation by quotes
				sl = sels.length;
				do{
					if(typeof(dsel) === 'function' || typeof(dsel) === 'string'){
						// set the value for the node/attr
						sel = sels[i];
						target = gettarget(dom, sel, false);
						setsig(target, fns.length);
						fns[fns.length] = wrapquote(target.quotefn, dataselectfn(dsel));
					}else{
						// loop on node
						loopgen(dom, sel, dsel, fns);
					}
				}while(++i < sl);
			}
		}
		// convert node to a string
		h = outerHTML(dom);
			// IE adds an unremovable "selected, value" attribute
			// hard replace while waiting for a better solution
		h = h.replace(/<([^>]+)\s(value\=""|selected)\s?([^>]*)>/ig, "<$1 $3>");

		// remove attribute prefix
		h = h.split(attPfx).join('');

		// slice the html string at "Sig"
		parts = h.split( Sig );
		// for each slice add the return string of
		for(i = 1; i < parts.length; i++){
			p = parts[i];
			// part is of the form "fn-number:..." as placed there by setsig.
			pfns[i] = fns[ parseInt(p, 10) ];
			parts[i] = p.substring( p.indexOf(':') + 1 );
		}
		return concatenator(parts, pfns);
	}
	// compile the template with directive
	// if a context is passed, the autoRendering is triggered automatically
	// return a function waiting the data as argument
	function compile(directive, ctxt, template){
		var rfn = compiler( ( template || this[0] ).cloneNode(true), directive, ctxt);
		return function(context){
			return rfn({context:context});
		};
	}
	//compile with the directive as argument
	// run the template function on the context argument
	// return an HTML string
	// should replace the template and return this
	function render(ctxt, directive){
		var fn = typeof directive === 'function' && directive, i, ii;
		for(i = 0, ii = this.length; i < ii; i++){
			this[i] = replaceWith( this[i], (fn || plugins.compile( directive, false, this[i] ))( ctxt, false ));
		}
		return this;
	}

	// compile the template with autoRender
	// run the template function on the context argument
	// return an HTML string
	function autoRender(ctxt, directive){
		var fn = plugins.compile( directive, ctxt, this[0] ), i, ii;
		for(i = 0, ii = this.length; i < ii; i++){
			this[i] = replaceWith( this[i], fn( ctxt, false));
		}
		return this;
	}

	function replaceWith(elm, html) {
		var ne,
			ep = elm.parentNode,
			depth = 0,
			tmp;
		if(!ep){ //if no parents
			ep = document.createElement('DIV');
			ep.appendChild(elm);
		}
		switch (elm.tagName) {
			case 'BODY': //thanks to milan.adamovsky@gmail.com
				ep.removeChild(elm);
				ep.innerHTML += html;
				return ep.getElementsByTagName('BODY')[0];
			case 'TBODY': case 'THEAD': case 'TFOOT':
				html = '<TABLE>' + html + '</TABLE>';
				depth = 1;
			break;
			case 'TR':
				html = '<TABLE><TBODY>' + html + '</TBODY></TABLE>';
				depth = 2;
			break;
			case 'TD': case 'TH':
				html = '<TABLE><TBODY><TR>' + html + '</TR></TBODY></TABLE>';
				depth = 3;
			break;
			case 'OPTGROUP': case 'OPTION':
				html = '<SELECT>' + html + '</SELECT>';
				depth = 1;
			break;
		}
		tmp = document.createElement('SPAN');
		tmp.style.display = 'none';
		document.body.appendChild(tmp);
		tmp.innerHTML = html;
		ne = tmp.firstChild;
		while (depth--) {
			ne = ne.firstChild;
		}
		ep.insertBefore(ne, elm);
		ep.removeChild(elm);
		document.body.removeChild(tmp);
		elm = ne;

		ne = ep = null;
		return elm;
	}

	return plugins;
};

$p.plugins = {};

$p.libs = {
	dojo:function(){
		return function(n, sel){
			return dojo.query(sel, n);
		};
	},
	domassistant:function(){
		DOMAssistant.attach({
			publicMethods : [ 'compile', 'render', 'autoRender'],
			compile:function(directive, ctxt){
				return $p([this]).compile(directive, ctxt);
			},
			render:function(ctxt, directive){
				return $( $p([this]).render(ctxt, directive) )[0];
			},
			autoRender:function(ctxt, directive){
				return $( $p([this]).autoRender(ctxt, directive) )[0];
			}
		});
		return function(n, sel){
			return $(n).cssSelect(sel);
		};
	},
	ext:function(){//Thanks to Greg Steirer
		return function(n, sel){
			return Ext.query(sel, n);
		};
	},
	jquery:function(){
		jQuery.fn.extend({
			directives:function(directive){
				this._pure_d = directive; return this;
			},
			compile:function(directive, ctxt){
				return $p(this).compile(this._pure_d || directive, ctxt);
			},
			render:function(ctxt, directive){
				return jQuery( $p( this ).render( ctxt, this._pure_d || directive ) );
			},
			autoRender:function(ctxt, directive){
				return jQuery( $p( this ).autoRender( ctxt, this._pure_d || directive ) );
			}
		});
		return function(n, sel){
			return jQuery(n).find(sel);
		};
	},
	mootools:function(){
		Element.implement({
			compile:function(directive, ctxt){
				return $p(this).compile(directive, ctxt);
			},
			render:function(ctxt, directive){
				return $p([this]).render(ctxt, directive);
			},
			autoRender:function(ctxt, directive){
				return $p([this]).autoRender(ctxt, directive);
			}
		});
		return function(n, sel){
			return $(n).getElements(sel);
		};
	},
	prototype:function(){
		Element.addMethods({
			compile:function(element, directive, ctxt){
				return $p([element]).compile(directive, ctxt);
			},
			render:function(element, ctxt, directive){
				return $p([element]).render(ctxt, directive);
			},
			autoRender:function(element, ctxt, directive){
				return $p([element]).autoRender(ctxt, directive);
			}
		});
		return function(n, sel){
			n = n === document ? n.body : n;
			return typeof n === 'string' ? $$(n) : $(n).select(sel);
		};
	},
	sizzle:function(){
		return function(n, sel){
			return Sizzle(sel, n);
		};
	},
	sly:function(){
		return function(n, sel){
			return Sly(sel, n);
		};
	},
	yui:function(){ //Thanks to https://github.com/soljin
		if(typeof document.querySelector === 'undefined'){
			YUI().use("node",function(Y){
				$p.plugins.find = function(n, sel){
					return Y.NodeList.getDOMNodes(Y.one(n).all(sel));
				};
			});
		}
		YUI.add("pure-yui",function(Y){
			Y.Node.prototype.directives = function(directive){
				this._pure_d = directive; return this;
			};
			Y.Node.prototype.compile = function(directive, ctxt){
				return $p([this._node]).compile(this._pure_d || directive, ctxt);
			};
			Y.Node.prototype.render = function(ctxt, directive){
				return Y.one($p([this._node]).render(ctxt, this._pure_d || directive));
			};
			Y.Node.prototype.autoRender = function(ctxt, directive){
				return Y.one($p([this._node]).autoRender(ctxt, this._pure_d || directive));
			};
		},"0.1",{requires:["node"]});

		return true;
	}
};

// get lib specifics if available
(function(){
	var libSel,
		libkey =
			(typeof dojo         !== 'undefined' && 'dojo') ||
			(typeof DOMAssistant !== 'undefined' && 'domassistant') ||
			(typeof Ext          !== 'undefined' && 'ext') ||
			(typeof jQuery       !== 'undefined' && 'jquery') ||
			(typeof MooTools     !== 'undefined' && 'mootools') ||
			(typeof Prototype    !== 'undefined' && 'prototype') ||
			(typeof Sizzle       !== 'undefined' && 'sizzle') ||
			(typeof Sly          !== 'undefined' && 'sly') ||
			(typeof YUI          !== 'undefined' && 'yui');
	
	//add library methods
	if(libkey){
		libSel = $p.libs[libkey]();
	}
	
	//if no native selector available
	if( typeof document.querySelector === 'undefined' ){
		//take it from the JS lib
		if( typeof libSel === 'function' ){
			$p.plugins.find = libSel;
		//if nothing throw an error
		}else if( !libSel ){
			throw('you need a JS library with a CSS selector engine');
		}
	}

	//for node.js
	if(typeof exports !== 'undefined'){
		exports.$p = $p;
	}
}());