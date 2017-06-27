/**
 * TinySort is a small script that sorts HTML elements. It sorts by text- or attribute value, or by that of one of it's children.
 * @summary A nodeElement sorting script.
 * @version 2.2.2
 * @license MIT/GPL
 * @author Ron Valstar <ron@ronvalstar.nl>
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort
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
		,regexLastNr = /(-?\d+\.?\d*)\s*$/g		// regex for testing strings ending on numbers
		,regexLastNrNoDash = /(\d+\.?\d*)\s*$/g	// regex for testing strings ending on numbers ignoring dashes
		,plugins = []
		,numCriteria = 0
		,criteriumIndex = 0
		,defaults = {				// default settings

			selector: nll			// order: asc, desc or rand

			,order: 'asc'			// order: asc, desc or rand

			,attr: nll				// order by attribute value
			,data: nll				// use the data attribute for sorting
			,useVal: fls			// use element value instead of text

			,place: 'org'			// place ordered elements at position: start, end, org (original position), first, last
			,returns: fls			// return all elements or only the sorted ones (true/false)

			,cases: fls				// a case sensitive sort orders [aB,aa,ab,bb]
			,forceStrings:fls		// if false the string '2' will sort with the value 2, not the string '2'

			,ignoreDashes:fls		// ignores dashes when looking for numerals

			,sortFunction: nll		// override the default sort function

			,useFlex:fls
			,emptyEnd:fls
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
	 * @param {String} [options.place='org'] Determines the placement of the ordered elements in respect to the unordered elements. Possible values 'start', 'end', 'first', 'last' or 'org'.
	 * @param {Boolean} [options.useVal=false] Use element value instead of text.
	 * @param {Boolean} [options.cases=false] A case sensitive sort (orders [aB,aa,ab,bb])
	 * @param {Boolean} [options.forceStrings=false] If false the string '2' will sort with the value 2, not the string '2'.
	 * @param {Boolean} [options.ignoreDashes=false] Ignores dashes when looking for numerals.
	 * @param {Function} [options.sortFunction=null] Override the default sort function. The parameters are of a type {elementObject}.
	 * @param {Boolean} [options.useFlex=true] If one parent and display flex, ordering is done by CSS (instead of DOM)
	 * @param {Boolean} [options.emptyEnd=true] Sort empty values to the end instead of the start
	 * @returns {HTMLElement[]}
	 */
	function tinysort(nodeList,options){
		if (isString(nodeList)) nodeList = doc.querySelectorAll(nodeList);
		if (nodeList.length===0) {
			console.warn('No elements to sort');
		}

		var fragment = doc.createDocumentFragment()
			/** both sorted and unsorted elements
			 * @type {elementObject[]} */
			,elmObjsAll = []
			/** sorted elements
			 * @type {elementObject[]} */
			,elmObjsSorted = []
			/** unsorted elements
			 * @type {elementObject[]} */
			,elmObjsUnsorted = []
			/** sorted elements before sort
			 * @type {elementObject[]} */
			,elmObjsSortedInitial
			/** @type {criteriumIndex[]} */
			,criteria = []
			/** @type {HTMLElement} */
			,parentNode
			,isSameParent = true
			,isFlex = nodeList.length&&(options===undef||options.useFlex!==false)&&getComputedStyle(nodeList[0].parentNode,null).display.indexOf('flex')!==-1
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
			numCriteria = criteria.length;
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
		 * @property {boolean} hasSelector - options has a selector
		 * @property {boolean} hasFilter - options has a filter
		 * @property {boolean} hasAttr - options has an attribute selector
		 * @property {boolean} hasData - options has a data selector
		 * @property {number} sortReturnNumber - the sort function return number determined by options.order
		 */

		/**
		 * Adds a criterium
		 * @memberof tinysort
		 * @private
		 * @param {Object} [options]
		 */
		function addCriterium(options){
			var hasSelector = !!options.selector
				,hasFilter = hasSelector&&options.selector[0]===':'
				,allOptions = extend(options||{},defaults)
			;
			criteria.push(extend({
				// has find, attr or data
				hasSelector: hasSelector
				,hasAttr: !(allOptions.attr===nll||allOptions.attr==='')
				,hasData: allOptions.data!==nll
				// filter
				,hasFilter: hasFilter
				,sortReturnNumber: allOptions.order==='asc'?1:-1
			},allOptions));
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
				if (!parentNode) parentNode = elm.parentNode;
				else if (parentNode!==elm.parentNode) isSameParent = false;
				var criterium = criteria[0]
					,hasFilter = criterium.hasFilter
					,selector = criterium.selector
					,isPartial = !selector||(hasFilter&&elm.matchesSelector(selector))||(selector&&elm.querySelector(selector))
					,listPartial = isPartial?elmObjsSorted:elmObjsUnsorted
					,elementObject = {
						elm: elm
						,pos: i
						,posn: listPartial.length
					}
				;
				elmObjsAll.push(elementObject);
				listPartial.push(elementObject);
			});
			elmObjsSortedInitial = elmObjsSorted.slice(0);
		}

		/**
		 * Sorts the sortList
		 */
		function sort(){
			elmObjsSorted.sort(sortFunction);
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
			var sortReturnNumber = 0;
			if (criteriumIndex!==0) criteriumIndex = 0;
			while (sortReturnNumber===0&&criteriumIndex<numCriteria) {
				/** @type {criterium} */
				var criterium = criteria[criteriumIndex]
					,regexLast = criterium.ignoreDashes?regexLastNrNoDash:regexLastNr;
				//
				loop(plugins,function(plugin){
					var pluginPrepare = plugin.prepare;
					if (pluginPrepare) pluginPrepare(criterium);
				});
				//
				if (criterium.sortFunction) { // custom sort
					sortReturnNumber = criterium.sortFunction(a,b);
				} else if (criterium.order=='rand') { // random sort
					sortReturnNumber = Math.random()<0.5?1:-1;
				} else { // regular sort
					var isNumeric = fls
						// prepare sort elements
						,valueA = getSortBy(a,criterium)
						,valueB = getSortBy(b,criterium)
						,noA = valueA===''||valueA===undef
						,noB = valueB===''||valueB===undef
					;
					if (valueA===valueB) {
						sortReturnNumber = 0;
					} else if (criterium.emptyEnd&&(noA||noB)) {
						sortReturnNumber = noA&&noB?0:noA?1:-1;
					} else {
						if (!criterium.forceStrings) {
							// cast to float if both strings are numeral (or end numeral)
							var  valuesA = isString(valueA)?valueA&&valueA.match(regexLast):fls// todo: isString superfluous because getSortBy returns string|undefined
								,valuesB = isString(valueB)?valueB&&valueB.match(regexLast):fls
							;
							if (valuesA&&valuesB) {
								var  previousA = valueA.substr(0,valueA.length-valuesA[0].length)
									,previousB = valueB.substr(0,valueB.length-valuesB[0].length);
								if (previousA==previousB) {
									isNumeric = !fls;
									valueA = parsefloat(valuesA[0]);
									valueB = parsefloat(valuesB[0]);
								}
							}
						}
						if (valueA===undef||valueB===undef) {
							sortReturnNumber = 0;
						} else {
							sortReturnNumber = valueA<valueB?-1:(valueA>valueB?1:0);
						}
					}
				}
				loop(plugins,function(o){
					var pluginSort = o.sort;
					if (pluginSort) sortReturnNumber = pluginSort(criterium,isNumeric,valueA,valueB,sortReturnNumber);
				});
				sortReturnNumber *= criterium.sortReturnNumber; // lastly assign asc/desc
				if (sortReturnNumber===0) criteriumIndex++;
			}
			if (sortReturnNumber===0) sortReturnNumber = a.pos>b.pos?1:-1;
			return sortReturnNumber;
		}

		/**
		 * Applies the sorted list to the DOM
		 * @memberof tinysort
		 * @private
		 */
		function applyToDOM(){
			var hasSortedAll = elmObjsSorted.length===elmObjsAll.length;
			if (isSameParent&&hasSortedAll) {
				if (isFlex) {
					elmObjsSorted.forEach(function(elmObj,i){
						elmObj.elm.style.order = i;
					});
				} else {
					parentNode.appendChild(sortedIntoFragment());
				}
			} else {
				var criterium = criteria[0]
					,place = criterium.place
					,placeOrg = place==='org'
					,placeStart = place==='start'
					,placeEnd = place==='end'
					,placeFirst = place==='first'
					,placeLast = place==='last'
				;
				if (placeOrg) {
					elmObjsSorted.forEach(addGhost);
					elmObjsSorted.forEach(function(elmObj,i) {
						replaceGhost(elmObjsSortedInitial[i],elmObj.elm);
					});
				} else if (placeStart||placeEnd) {
					var startElmObj = elmObjsSortedInitial[placeStart?0:elmObjsSortedInitial.length-1]
						,startParent = startElmObj.elm.parentNode
						,startElm = placeStart?startParent.firstChild:startParent.lastChild;
					if (startElm!==startElmObj.elm) startElmObj = {elm:startElm};
					addGhost(startElmObj);
					placeEnd&&startParent.appendChild(startElmObj.ghost);
					replaceGhost(startElmObj,sortedIntoFragment());
				} else if (placeFirst||placeLast) {
					var firstElmObj = elmObjsSortedInitial[placeFirst?0:elmObjsSortedInitial.length-1];
					replaceGhost(addGhost(firstElmObj),sortedIntoFragment());
				}
			}
		}

		/**
		 * Adds all sorted elements to the document fragment and returns it.
		 * @memberof tinysort
		 * @private
		 * @returns {DocumentFragment}
		 */
		function sortedIntoFragment(){
			elmObjsSorted.forEach(function(elmObj){
				fragment.appendChild(elmObj.elm);
			});
			return fragment;
		}

		/**
		 * Adds a temporary element before an element before reordering.
		 * @memberof tinysort
		 * @private
		 * @param {elementObject} elmObj
		 * @returns {elementObject}
		 */
		function addGhost(elmObj){
			var element = elmObj.elm
				,ghost = doc.createElement('div')
			;
			elmObj.ghost = ghost;
			element.parentNode.insertBefore(ghost,element);
			return elmObj;
		}

		/**
		 * Inserts an element before a ghost element and removes the ghost.
		 * @memberof tinysort
		 * @private
		 * @param {elementObject} elmObjGhost
		 * @param {HTMLElement} elm
		 */
		function replaceGhost(elmObjGhost,elm){
			var ghost = elmObjGhost.ghost
				,ghostParent = ghost.parentNode;
			ghostParent.insertBefore(elm,ghost);
			ghostParent.removeChild(ghost);
			delete elmObjGhost.ghost;
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
			var sortBy
				,element = elementObject.elm;
			// element
			if (criterium.selector) {
				if (criterium.hasFilter) {
					if (!element.matchesSelector(criterium.selector)) element = nll;
				} else {
					element = element.querySelector(criterium.selector);
				}
			}
			// value
			if (criterium.hasAttr) sortBy = element.getAttribute(criterium.attr);
			else if (criterium.useVal) sortBy = element.value||element.getAttribute('value');
			else if (criterium.hasData) sortBy = element.getAttribute('data-'+criterium.data);
			else if (element) sortBy = element.textContent;
			// strings should be ordered in lowercase (unless specified)
			if (isString(sortBy)) {
				if (!criterium.cases) sortBy = sortBy.toLowerCase();
				sortBy = sortBy.replace(/\s+/g,' '); // spaces/newlines
			}
			return sortBy;
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

		return elmObjsSorted.map(function(o) {
			return o.elm;
		});
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
		plugins.push({prepare:prepare,sort:sort,sortBy:sortBy});
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
		loop: loop
	});

	return extend(tinysort,{
		plugin: plugin
		,defaults: defaults
	});
})()));