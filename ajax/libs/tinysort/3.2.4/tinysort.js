/*global define, module*/
/**
 * TinySort is a small script that sorts HTML elements. It sorts by text- or attribute value, or by that of one of it's children.
 * @summary A nodeElement sorting script.
 * @version 3.1.4
 * @license MIT
 * @author Ron Valstar (http://www.ronvalstar.nl/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort
 */
(function(root,tinysort){
  typeof define==='function'&&define.amd?define('tinysort',()=>tinysort):(root.tinysort = tinysort)
}(window||module||{},(_undef=>{
  const fls = !1
    ,undef = _undef
    ,nll = null
    ,win = window
    ,doc = win.document
    ,parsefloat = parseFloat
    ,regexLastNr = /(-?\d+\.?\d*)\s*$/g    // regex for testing strings ending on numbers
    ,regexLastNrNoDash = /(\d+\.?\d*)\s*$/g  // regex for testing strings ending on numbers ignoring dashes
    ,plugins = []
    ,largeChar = String.fromCharCode(0xFFF)
    ,/**{options}*/defaults = {        // default settings
      selector: nll      // CSS selector to select the element to sort to
      ,order: 'asc'      // order: asc, desc or rand
      ,attr: nll         // order by attribute value
      ,data: nll         // use the data attribute for sorting
      ,useVal: fls       // use element value instead of text
      ,place: 'org'      // place ordered elements at position: start, end, org (original position), first, last
      ,returns: fls      // return all elements or only the sorted ones (true/false)
      ,cases: fls        // a case sensitive sort orders [aB,aa,ab,bb]
      ,natural: fls      // use natural sort order
      ,forceStrings:fls  // if false the string '2' will sort with the value 2, not the string '2'
      ,ignoreDashes:fls  // ignores dashes when looking for numerals
      ,sortFunction: nll // override the default sort function
      ,useFlex:fls
      ,emptyEnd:fls
      ,console
    }
  let numCriteria = 0
    ,criteriumIndex = 0

  /**
   * Options object
   * @typedef {object} options
   * @property {string} [selector] A CSS selector to select the element to sort to.
   * @property {string} [order='asc'] The order of the sorting method. Possible values are 'asc', 'desc' and 'rand'.
   * @property {string} [attr=null] Order by attribute value (ie title, href, class)
   * @property {string} [data=null] Use the data attribute for sorting.
   * @property {string} [place='org'] Determines the placement of the ordered elements in respect to the unordered elements. Possible values 'start', 'end', 'first', 'last' or 'org'.
   * @property {boolean} [useVal=false] Use element value instead of text.
   * @property {boolean} [cases=false] A case sensitive sort (orders [aB,aa,ab,bb])
   * @property {boolean} [natural=false] Use natural sort order.
   * @property {boolean} [forceStrings=false] If false the string '2' will sort with the value 2, not the string '2'.
   * @property {boolean} [ignoreDashes=false] Ignores dashes when looking for numerals.
   * @property {function} [sortFunction=null] Override the default sort function. The parameters are of a type {elementObject}.
   * @property {boolean} [useFlex=true] If one parent and display flex, ordering is done by CSS (instead of DOM)
   * @property {boolean} [emptyEnd=true] Sort empty values to the end instead of the start
   * @property {object|boolean} [console] - an optional console implementation to prevent output to console
   */

  /**
   * TinySort is a small and simple script that will sort any nodeElement by it's text- or attribute value, or by that of one of it's children.
   * @memberof tinysort
   * @public
   * @param {NodeList|HTMLElement[]|String} nodeList The nodelist or array of elements to be sorted. If a string is passed it should be a valid CSS selector.
   * @param {options} [options] A list of options.
   * @returns {HTMLElement[]}
   */
  function tinysort(nodeList,options){
    isString(nodeList) && (nodeList = doc.querySelectorAll(nodeList))

    const {console} = Object.assign({},defaults,options||{})
    nodeList.length===0 && console && console.warn && console.warn('No elements to sort')

    const fragment = doc.createDocumentFragment()
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
      ,elmObjsSortedInitial = []
      /** @type {criteriumIndex[]} */
      ,criteria = []
    let /** @type {HTMLElement} */parentNode
      ,isSameParent = true
      ,firstParent = nodeList.length&&nodeList[0].parentNode
      ,isFragment = firstParent.rootNode!==document
      ,isFlex = nodeList.length&&(options===undef||options.useFlex!==false)&&!isFragment&&getComputedStyle(firstParent,null).display.indexOf('flex')!==-1

    initCriteria.apply(nll,Array.prototype.slice.call(arguments,1))
    initSortList()
    elmObjsSorted.sort(options&&options.sortFunction||sortFunction)
    applyToDOM()

    /**
     * Create criteria list
     */
    function initCriteria(){
      if (arguments.length===0) {
        addCriterium({}) // have at least one criterium
      } else {
        loop(arguments,param=>addCriterium(isString(param)?{selector:param}:param))
      }
      numCriteria = criteria.length
    }

    /**
     * A criterium is a combination of the selector, the options and the default options
     * @typedef {Object} criterium
     * @property {String} selector - a valid CSS selector
     * @property {String} order - order: asc, desc or rand
     * @property {String} attr - order by attribute value
     * @property {String} data - use the data attribute for sorting
     * @property {boolean} useVal - use element value instead of text
     * @property {String} place - place ordered elements at position: start, end, org (original position), first
     * @property {boolean} returns - return all elements or only the sorted ones (true/false)
     * @property {boolean} cases - a case sensitive sort orders [aB,aa,ab,bb]
     * @property {boolean} natural - use natural sort order
     * @property {boolean} forceStrings - if false the string '2' will sort with the value 2, not the string '2'
     * @property {boolean} ignoreDashes - ignores dashes when looking for numerals
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
      const hasSelector = !!options.selector
        ,hasFilter = hasSelector&&options.selector[0]===':'
        ,allOptions = extend(options||{},defaults)
      criteria.push(extend({
        // has find, attr or data
        hasSelector
        ,hasAttr: !(allOptions.attr===nll||allOptions.attr==='')
        ,hasData: allOptions.data!==nll
        // filter
        ,hasFilter
        ,sortReturnNumber: allOptions.order==='asc'?1:-1
      },allOptions))
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
      loop(nodeList,(elm,i)=>{
        if (!parentNode) parentNode = elm.parentNode
        else if (parentNode!==elm.parentNode) isSameParent = false
        const {hasFilter,selector} = criteria[0]
          ,isPartial = !selector||(hasFilter&&elm.matches(selector))||(selector&&elm.querySelector(selector))
          ,listPartial = isPartial?elmObjsSorted:elmObjsUnsorted
          ,elementObject = {
            elm: elm
            ,pos: i
            ,posn: listPartial.length
          }
        elmObjsAll.push(elementObject)
        listPartial.push(elementObject)
      })
      elmObjsSortedInitial.splice(0,Number.MAX_SAFE_INTEGER,...elmObjsSorted)
    }

    /**
     * Compare strings using natural sort order
     * http://web.archive.org/web/20130826203933/http://my.opera.com/GreyWyvern/blog/show.dml/1671288
     */
    function naturalCompare(a, b, chunkify) {
      const aa = chunkify(a.toString())
        ,bb = chunkify(b.toString())
      for (let x = 0; aa[x] && bb[x]; x++) {
        if (aa[x]!==bb[x]) {
          const c = Number(aa[x])
            ,d = Number(bb[x])
          if (c == aa[x] && d == bb[x]) {
            return c - d
          } else return aa[x]>bb[x]?1:-1
        }
      }
      return aa.length - bb.length
    }

    /**
     * Split a string into an array by type: numeral or string
     * @memberof tinysort
     * @private
     * @param {string} t
     * @returns {Array}
     */
    function chunkify(t) {
      const tz = []
      let x = 0, y = -1, n = 0, i, j
      while (i = (j = t.charAt(x++)).charCodeAt(0)) { // eslint-disable-line no-cond-assign
        const m = (i === 46 || (i >=48 && i <= 57))
        if (m !== n) {
          tz[++y] = ''
          n = m
        }
        tz[y] += j
      }
      return tz
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
      let sortReturnNumber = 0
      if (criteriumIndex!==0) criteriumIndex = 0
      while (sortReturnNumber===0&&criteriumIndex<numCriteria) {
        /** @type {criterium} */
        const criterium = criteria[criteriumIndex]
          ,regexLast = criterium.ignoreDashes?regexLastNrNoDash:regexLastNr
        //
        loop(plugins,plugin=>plugin.prepare && plugin.prepare(criterium))
        //
        let isNumeric = fls
          // prepare sort elements
          ,valueA = getSortBy(a,criterium)
          ,valueB = getSortBy(b,criterium)
        if (criterium.sortFunction) { // custom sort
          sortReturnNumber = criterium.sortFunction(a,b)
        } else if (criterium.order==='rand') { // random sort
          sortReturnNumber = Math.random()<0.5?1:-1
        } else { // regular sort
          const noA = valueA===''||valueA===undef
            ,noB = valueB===''||valueB===undef
          if (valueA===valueB) {
            sortReturnNumber = 0
          } else if (criterium.emptyEnd&&(noA||noB)) {
            sortReturnNumber = noA&&noB?0:noA?1:-1
          } else {
            if (!criterium.forceStrings) {
              // cast to float if both strings are numeral (or end numeral)
              let valuesA = isString(valueA)?valueA&&valueA.match(regexLast):fls// todo: isString superfluous because getSortBy returns string|undefined
                ,valuesB = isString(valueB)?valueB&&valueB.match(regexLast):fls

              if (valuesA&&valuesB) {
                const previousA = valueA.substr(0,valueA.length-valuesA[0].length)
                  ,previousB = valueB.substr(0,valueB.length-valuesB[0].length)
                if (previousA==previousB) {
                  isNumeric = !fls
                  valueA = parsefloat(valuesA[0])
                  valueB = parsefloat(valuesB[0])
                }
              }
            }
            if (valueA===undef||valueB===undef) {
              sortReturnNumber = 0
            } else {
              // todo: check here
              if (!criterium.natural||(!isNaN(valueA)&&!isNaN(valueB))) {
                sortReturnNumber = valueA<valueB?-1:(valueA>valueB?1:0)
              } else {
                sortReturnNumber = naturalCompare(valueA, valueB, chunkify)
              }
            }
          }
        }
        loop(plugins,({sort})=>sort && (sortReturnNumber = sort(criterium,isNumeric,valueA,valueB,sortReturnNumber)))
        sortReturnNumber *= criterium.sortReturnNumber // lastly assign asc/desc
        sortReturnNumber===0 && criteriumIndex++
      }
      sortReturnNumber===0 && (sortReturnNumber = a.pos>b.pos?1:-1)
      return sortReturnNumber
    }

    /**
     * Applies the sorted list to the DOM
     * @memberof tinysort
     * @private
     */
    function applyToDOM(){
      const hasSortedAll = elmObjsSorted.length===elmObjsAll.length
      const {place,console} = criteria[0]
      if (isSameParent&&hasSortedAll) {
        if (isFlex) {
          elmObjsSorted.forEach((elmObj,i)=>elmObj.elm.style.order = i)
        } else {
          if (parentNode) parentNode.appendChild(sortedIntoFragment())
          else console && console.warn && console.warn('parentNode has been removed')
        }
      } else {
        const isPlaceOrg = place==='org'
          ,isPlaceStart = place==='start'
          ,isPlaceEnd = place==='end'
          ,isPlaceFirst = place==='first'
          ,isPlaceLast = place==='last'

        if (isPlaceOrg) {
          elmObjsSorted.forEach(addGhost)
          elmObjsSorted.forEach((elmObj,i)=>replaceGhost(elmObjsSortedInitial[i],elmObj.elm))
        } else if (isPlaceStart||isPlaceEnd) {
          let startElmObj = elmObjsSortedInitial[isPlaceStart?0:elmObjsSortedInitial.length-1]
            ,startParent = startElmObj&&startElmObj.elm.parentNode
            ,startElm = startParent&&(isPlaceStart&&startParent.firstChild||startParent.lastChild)
          if (startElm) {
            startElm!==startElmObj.elm && (startElmObj = {elm:startElm})
            addGhost(startElmObj)
            isPlaceEnd&&startParent.appendChild(startElmObj.ghost)
            replaceGhost(startElmObj,sortedIntoFragment())
          }
        } else if (isPlaceFirst||isPlaceLast) {
          const firstElmObj = elmObjsSortedInitial[isPlaceFirst?0:elmObjsSortedInitial.length-1]
          replaceGhost(addGhost(firstElmObj),sortedIntoFragment())
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
      elmObjsSorted.forEach(elmObj=>fragment.appendChild(elmObj.elm))
      return fragment
    }

    /**
     * Adds a temporary element before an element before reordering.
     * @memberof tinysort
     * @private
     * @param {elementObject} elmObj
     * @returns {elementObject}
     */
    function addGhost(elmObj){
      const element = elmObj.elm
        ,ghost = doc.createElement('div')
      elmObj.ghost = ghost
      element.parentNode.insertBefore(ghost,element)
      return elmObj
    }

    /**
     * Inserts an element before a ghost element and removes the ghost.
     * @memberof tinysort
     * @private
     * @param {elementObject} elmObjGhost
     * @param {HTMLElement} elm
     */
    function replaceGhost(elmObjGhost,elm){
      const ghost = elmObjGhost.ghost
        ,ghostParent = ghost.parentNode
      ghostParent.insertBefore(elm,ghost)
      ghostParent.removeChild(ghost)
      delete elmObjGhost.ghost
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
      let sortBy
          ,element = elementObject.elm
          ,{selector} = criterium
      // element
      if (selector) {
        if (criterium.hasFilter) {
          if (!element.matches(selector)) element = nll
        } else {
          element = element.querySelector(selector)
        }
      }
      // value
      if (criterium.hasAttr) sortBy = element.getAttribute(criterium.attr)
      else if (criterium.useVal) sortBy = element.value||element.getAttribute('value')
      else if (criterium.hasData) sortBy = element.getAttribute('data-'+criterium.data)
      else if (element) sortBy = element.textContent
      // strings should be ordered in lowercase (unless specified)
      if (isString(sortBy)) {
        if (!criterium.cases) sortBy = sortBy.toLowerCase()
        sortBy = sortBy.replace(/\s+/g,' ') // spaces/newlines
      }
      if (sortBy===null) sortBy = largeChar
      return sortBy
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
      return typeof o==='string'
    }

    return elmObjsSorted.map(o=>o.elm)
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
    const l = array.length
    let i = l
      ,j
    while (i--) {
      j = l-i-1
      func(array[j],j)
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
    for (let s in fns) {
      if (overwrite||obj[s]===undef) {
        obj[s] = fns[s]
      }
    }
    return obj
  }

  function plugin(prepare,sort,sortBy){
    plugins.push({prepare,sort,sortBy})
  }

  // Element.prototype.matches IE
  win.Element&&(elementPrototype=>elementPrototype.matches = elementPrototype.matches||elementPrototype.msMatchesSelector)(Element.prototype)

  // extend the plugin to expose stuff
  extend(plugin,{loop})

  return extend(tinysort,{plugin,defaults})
})()))