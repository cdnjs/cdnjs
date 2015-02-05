/**
 * TinySort is a small and simple script that will sort any nodeElment by it's text- or attribute value, or by that of one of it's children.
 * @summary A nodeElement sorting script.
 * @version 2.1.1
 * @license MIT/GPL
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort
 * @todo check place option
 */
(function (root,tinysort) {
	'use strict';

	if (typeof define==='function'&&define.amd) {
		define('tinysort',singleton);
	} else {
		root.tinysort = tinysort;
	}
	function singleton(){
		return tinysort;
	}
}(this,(function() {
	'use strict';

	var fls = !1
		,undef
		,nll = null
		,win = window
		,doc = win.document
		,parsefloat = parseFloat
		,fnIndexOf = Array.prototype.indexOf
		//,getSortByMem = memoize(getSortBy)
		,rxLastNr = /(-?\d+\.?\d*)$/g		// regex for testing strings ending on numbers
		,rxLastNrNoDash = /(\d+\.?\d*)$/g	// regex for testing strings ending on numbers ignoring dashes
		,aPlugins = []
		,iCriteria = 0
		,iCriterium = 0
		,sVersion = '2.1.0'
		,defaults = { // default settings

			selector: nll			// order: asc, desc or rand

			,order: 'asc'			// order: asc, desc or rand

			,attr: nll				// order by attribute value
			,data: nll				// use the data attribute for sorting
			,useVal: fls			// use element value instead of text

			,place: 'start'			// place ordered elements at position: start, end, org (original position), first
			,returns: fls			// return all elements or only the sorted ones (true/false)

			,cases: fls				// a case sensitive sort orders [aB,aa,ab,bb]
			,forceStrings:fls		// if false the string '2' will sort with the value 2, not the string '2'

			,ignoreDashes:fls		// ignores dashes when looking for numerals

			,sortFunction: nll		// override the default sort function
		}
	;undef;

	/**
	 * TinySort is a small and simple script that will sort any nodeElment by it's text- or attribute value, or by that of one of it's children.
	 * @memberof tinysort
	 * @public
	 * @param {NodeList|HTMLElement[]|String} nodeList The nodelist or array of elements to be sorted. If a string is passed it should be a valid CSS selector.
	 * @param {Object} [options] A list of options.
	 * @param {String} [options.selector] A CSS selector to select the element to sort to.
	 * @param {String} [options.order='asc'] The order of the sorting method. Possible values are 'asc', 'desc' and 'rand'.
	 * @param {String} [options.attr=null] Order by attribute value (ie title, href, class)
	 * @param {String} [options.data=null] Use the data attribute for sorting.
	 * @param {String} [options.place='org'] Determines the placement of the ordered elements in respect to the unordered elements. Possible values 'start', 'end', 'first' or 'org'.
	 * @param {Boolean} [options.useVal=false] Use element value instead of text.
	 * @param {Boolean} [options.cases=false] A case sensitive sort (orders [aB,aa,ab,bb])
	 * @param {Boolean} [options.forceStrings=false] If false the string '2' will sort with the value 2, not the string '2'.
	 * @param {Boolean} [options.ignoreDashes=false] Ignores dashes when looking for numerals.
	 * @param {Function} [options.sortFunction=null] Override the default sort function. The parameters are of a type {elementObject}.
	 * @returns {HTMLElement[]}
	 */
	function tinysort(nodeList){
		if (isString(nodeList)) nodeList = doc.querySelectorAll(nodeList);
		if (nodeList.length===0) {
			console.warn('No elements to sort');
		}

		var mFragment = doc.createDocumentFragment()
			/** both sorted and unsorted elements
			 * @type {elementObject[]} */
			,aoFull = []
			/** sorted elements
			 * @type {elementObject[]} */
			,aoSort = []
			/** unsorted elements
			 * @type {elementObject[]} */
			,aoNot = []
			/** sorted elements before sort
			 * @type {elementObject[]} */
			,aoSortBeforeSort
			/** @type {criterium[]} */
			,aCriteria = []
			/** @type {HTMLElement} */
			,mParent
			,bSameParent = true
		;

		initCriteria.apply(nll,Array.prototype.slice.call(arguments,1));
		initSortList();
		sort();
		applyToDOM();

		/**
		 * Create criteria list
		 */
		function initCriteria(){
			if (arguments.length===0) {
				addCriterium({}); // have at least one criterium
			} else {
				loop(arguments,function(param){
					addCriterium(isString(param)?{selector:param}:param);
				});
			}
			iCriteria = aCriteria.length;
		}

		/**
		 * A criterium is a combination of the selector, the options and the default options
		 * @typedef {Object} criterium
		 * @property {String} selector - a valid CSS selector
		 * @property {String} order - order: asc, desc or rand
		 * @property {String} attr - order by attribute value
		 * @property {String} data - use the data attribute for sorting
		 * @property {Boolean} useVal - use element value instead of text
		 * @property {String} place - place ordered elements at position: start, end, org (original position), first
		 * @property {Boolean} returns - return all elements or only the sorted ones (true/false)
		 * @property {Boolean} cases - a case sensitive sort orders [aB,aa,ab,bb]
		 * @property {Boolean} forceStrings - if false the string '2' will sort with the value 2, not the string '2'
		 * @property {Boolean} ignoreDashes - ignores dashes when looking for numerals
		 * @property {Function} sortFunction - override the default sort function
		 */

		/**
		 * Adds a criterium
		 * @memberof tinysort
		 * @private
		 * @param {String} [selector]
		 * @param {Object} [options]
		 */
		function addCriterium(options){
			var bFind = !!options.selector
				,bFilter = bFind&&options.selector[0]===':'
				,oOptions = extend(options||{},defaults)
			;
			aCriteria.push(extend({ // todo: only used locally, find a way to minify properties
				// has find, attr or data
				bFind: bFind
				,bAttr: !(oOptions.attr===nll||oOptions.attr==='')
				,bData: oOptions.data!==nll
				// filter
				,bFilter: bFilter
				,mFilter: nll//bFilter?oThis.filter(select):oThis
				,fnSort: oOptions.sortFunction
				,iAsc: oOptions.order==='asc'?1:-1
			},oOptions));
		}

		/**
		 * The element object.
		 * @typedef {Object} elementObject
		 * @property {HTMLElement} elm - The element
		 * @property {number} pos - original position
		 * @property {number} posn - original position on the partial list
		 */

		/**
		 * Creates an elementObject and adds to lists.
		 * Also checks if has one or more parents.
		 * @memberof tinysort
		 * @private
		 */
		function initSortList(){
			loop(nodeList,function(elm,i){
				if (!mParent) mParent = elm.parentNode;
				else if (mParent!==elm.parentNode) bSameParent = false;
				var criterium = aCriteria[0]
					,bFilter = criterium.bFilter
					,sSelector = criterium.selector
					,idd = !sSelector||(bFilter&&elm.matchesSelector(sSelector))||(sSelector&&elm.querySelector(sSelector))
					,aListPartial = idd?aoSort:aoNot
				;
				var oElementObject = {
					elm: elm
					,pos: i
					,posn: aListPartial.length
				};
				aoFull.push(oElementObject);
				aListPartial.push(oElementObject);
			});
			aoSortBeforeSort = aoSort.slice(0);
		}

		/**
		 * Sorts the sortList
		 */
		function sort(){
			aoSort.sort(sortFunction);
		}

		/**
		 * Sort all the things
		 * @memberof tinysort
		 * @private
		 * @param {elementObject} a
		 * @param {elementObject} b
		 * @returns {number}
		 */
		function sortFunction(a,b){
			var iReturn = 0;
			if (iCriterium!==0) iCriterium = 0;
			while (iReturn===0&&iCriterium<iCriteria) {
				/** @type {criterium} */
				var oCriterium = aCriteria[iCriterium]
					,rxLast = oCriterium.ignoreDashes?rxLastNrNoDash:rxLastNr;
				//
				loop(aPlugins,function(o){
					var pluginPrepare = o.prepare;
					if (pluginPrepare) pluginPrepare(oCriterium);
				});
				//
				if (oCriterium.sortFunction) { // custom sort
					iReturn = oCriterium.sortFunction(a,b);
				} else if (oCriterium.order=='rand') { // random sort
					iReturn = Math.random()<0.5?1:-1;
				} else { // regular sort
					var bNumeric = fls
						// prepare sort elements
						,sA = getSortBy(a,oCriterium)
						,sB = getSortBy(b,oCriterium)
					;
					if (!oCriterium.forceStrings) {
						// cast to float if both strings are numeral (or end numeral)
						var  aAnum = isString(sA)?sA&&sA.match(rxLast):fls// todo: isString superfluous because getSortBy returns string|undefined
							,aBnum = isString(sB)?sB&&sB.match(rxLast):fls;
						if (aAnum&&aBnum) {
							var  sAprv = sA.substr(0,sA.length-aAnum[0].length)
								,sBprv = sB.substr(0,sB.length-aBnum[0].length);
							if (sAprv==sBprv) {
								bNumeric = !fls;
								sA = parsefloat(aAnum[0]);
								sB = parsefloat(aBnum[0]);
							}
						}
					}
					if (sA===undef||sB===undef) {
						iReturn = 0;
					} else {
						iReturn = oCriterium.iAsc*(sA<sB?-1:(sA>sB?1:0));
					}
				}
				loop(aPlugins,function(o){
					var pluginSort = o.sort;
					if (pluginSort) iReturn = pluginSort(oCriterium,bNumeric,sA,sB,iReturn);
				});
				if (iReturn===0) iCriterium++;
			}
			if (iReturn===0) iReturn = a.pos>b.pos?1:-1;
			return iReturn;
		}

		/**
		 * Applies the sorted list to the DOM
		 * @memberof tinysort
		 * @private
		 */
		function applyToDOM(){
			var bAllSorted = aoSort.length===aoFull.length;
			if (bSameParent&&bAllSorted) {
				aoSort.forEach(function(elmObj){
					mFragment.appendChild(elmObj.elm);
				});
				mParent.appendChild(mFragment);
			} else {
				aoSort.forEach(function(elmObj) {
					var mElm = elmObj.elm
						,mGhost = doc.createElement('div')
					;
					elmObj.ghost = mGhost;
					mElm.parentNode.insertBefore(mGhost,mElm);
				});
				aoSort.forEach(function(elmObj,i) {
					var mGhost = aoSortBeforeSort[i].ghost;
					mGhost.parentNode.insertBefore(elmObj.elm,mGhost);
					mGhost.parentNode.removeChild(mGhost);
				});
			}
		}

		return aoSort.map(function(o) {
			return o.elm;
		});
	}

	/**
	 * Get the string/number to be sorted by checking the elementObject with the criterium.
	 * @memberof tinysort
	 * @private
	 * @param {elementObject} elementObject
	 * @param {criterium} criterium
	 * @returns {String}
	 * @todo memoize
	 */
	function getSortBy(elementObject,criterium){
		var sReturn
			,mElement = elementObject.elm;
		// element
		if (criterium.selector) {
			if (criterium.bFilter) {
				if (!mElement.matchesSelector(criterium.selector)) mElement = nll;
			} else {
				mElement = mElement.querySelector(criterium.selector);
			}
		}
		// value
		if (criterium.bAttr) sReturn = mElement.getAttribute(criterium.attr);
		else if (criterium.useVal) sReturn = mElement.value ;
		else if (criterium.bData) sReturn = mElement.getAttribute('data-'+criterium.data);
		else if (mElement) sReturn = mElement.textContent;
		// strings should be ordered in lowercase (unless specified)
		if (isString(sReturn)) {
			if (!criterium.cases) sReturn = sReturn.toLowerCase();
			sReturn = sReturn.replace(/\s+/g,' '); // spaces/newlines
		}
		//
		return sReturn;
	}


	/*function memoize(fnc) {
		var oCache = {}
			, sKeySuffix = 0;
		return function () {
			var sKey = sKeySuffix + JSON.stringify(arguments); // todo: circular dependency on Nodes
			return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
		};
	}*/

	/**
	 * Test if an object is a string
	 * @memberOf tinysort
	 * @method
	 * @private
	 * @param o
	 * @returns {boolean}
	 */
	function isString(o){
		return typeof o==='string';
	}

	/**
	 * Traverse an array, or array-like object
	 * @memberOf tinysort
	 * @method
	 * @private
	 * @param {Array} array The object or array
	 * @param {Function} func Callback function with the parameters value and key.
	 */
	function loop(array,func){
		var l = array.length
			,i = l
			,j;
		while (i--) {
			j = l-i-1;
			func(array[j],j);
		}
	}

	/**
	 * Extend an object
	 * @memberOf tinysort
	 * @method
	 * @private
	 * @param {Object} obj Subject.
	 * @param {Object} fns Property object.
	 * @param {boolean} [overwrite=false]  Overwrite properties.
	 * @returns {Object} Subject.
	 */
	function extend(obj,fns,overwrite){
		for (var s in fns) {
			if (overwrite||obj[s]===undef) {
				obj[s] = fns[s];
			}
		}
		return obj;
	}

	function plugin(prepare,sort,sortBy){
		aPlugins.push({prepare:prepare,sort:sort,sortBy:sortBy});
	}

	// matchesSelector shim
	win.Element && function(ElementPrototype) {
		ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
		ElementPrototype.mozMatchesSelector ||
		ElementPrototype.msMatchesSelector ||
		ElementPrototype.oMatchesSelector ||
		ElementPrototype.webkitMatchesSelector ||
		function (selector) {
			var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
			while (nodes[++i] && nodes[i] != node);
			return !!nodes[i];
		};
	}(Element.prototype);

	// extend the plugin to expose stuff
	extend(plugin,{
		indexOf: fnIndexOf
		,loop: loop
	});

	return extend(tinysort,{
		plugin: plugin
		,version: sVersion
		,defaults: defaults
	});
})()));