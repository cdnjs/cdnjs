/*! TinySort 1.5.6
* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
* License:
*     MIT: http://www.opensource.org/licenses/mit-license.php
*     GPL: http://www.gnu.org/licenses/gpl.html
*//*
* Description:
*   A jQuery plugin to sort child nodes by (sub) contents or attributes.
*
* Contributors:
*	brian.gibson@gmail.com
*	michael.thornberry@gmail.com
*
* Usage:
*   $("ul#people>li").tsort();
*   $("ul#people>li").tsort("span.surname");
*   $("ul#people>li").tsort("span.surname",{order:"desc"});
*   $("ul#people>li").tsort({place:"end"});
*   $("ul#people>li").tsort("span.surname",{order:"desc"},span.name");
*
* Change default like so:
*   $.tinysort.defaults.order = "desc";
*
*/
;(function($,undefined) {
	'use strict';
	// private vars
	var fls = !1							// minify placeholder
		,nll = null							// minify placeholder
		,prsflt = parseFloat				// minify placeholder
		,mathmn = Math.min					// minify placeholder
		,rxLastNr = /(-?\d+\.?\d*)$/g		// regex for testing strings ending on numbers
		,rxLastNrNoDash = /(\d+\.?\d*)$/g	// regex for testing strings ending on numbers ignoring dashes
		,aPluginPrepare = []
		,aPluginSort = []
		,isString = function(o){return typeof o=='string';}
		,loop = function(array,func){
            var l = array.length
                ,i = l
                ,j;
            while (i--) {
                j = l-i-1;
                func(array[j],j);
            }
		}
		// Array.prototype.indexOf for IE (issue #26) (local variable to prevent unwanted prototype pollution)
		,fnIndexOf = Array.prototype.indexOf||function(elm) {
			var len = this.length
				,from = Number(arguments[1])||0;
			from = from<0?Math.ceil(from):Math.floor(from);
			if (from<0) from += len;
			for (;from<len;from++){
				if (from in this && this[from]===elm) return from;
			}
			return -1;
		}
	;
	//
	// init plugin
	$.tinysort = {
		 id: 'TinySort'
		,version: '1.5.6'
		,copyright: 'Copyright (c) 2008-2013 Ron Valstar'
		,uri: 'http://tinysort.sjeiti.com/'
		,licensed: {
			MIT: 'http://www.opensource.org/licenses/mit-license.php'
			,GPL: 'http://www.gnu.org/licenses/gpl.html'
		}
		,plugin: (function(){
			var fn = function(prepare,sort){
				aPluginPrepare.push(prepare);	// function(settings){doStuff();}
				aPluginSort.push(sort);			// function(valuesAreNumeric,sA,sB,iReturn){doStuff();return iReturn;}
			};
			// expose stuff to plugins
			fn.indexOf = fnIndexOf;
			return fn;
		})()
		,defaults: { // default settings

			 order: 'asc'			// order: asc, desc or rand

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
	};
	$.fn.extend({
		tinysort: function() {
			var i,j,l
				,oThis = this
				,aNewOrder = []
				// sortable- and non-sortable list per parent
				,aElements = []
				,aElementsParent = [] // index reference for parent to aElements
				// multiple sort criteria (sort===0?iCriteria++:iCriteria=0)
				,aCriteria = []
				,iCriteria = 0
				,iCriteriaMax
				//
				,aFind = []
				,aSettings = []
				//
				,fnPluginPrepare = function(_settings){
					loop(aPluginPrepare,function(fn){
						fn.call(fn,_settings);
					});
				}
				//
				,fnPrepareSortElement = function(settings,element){
					if (typeof element=='string') {
						// if !settings.cases
						if (!settings.cases) element = toLowerCase(element);
						element = element.replace(/^\s*(.*?)\s*$/i, '$1');
					}
					return element;
				}
				//
				,fnSort = function(a,b) {
					var iReturn = 0;
					if (iCriteria!==0) iCriteria = 0;
					while (iReturn===0&&iCriteria<iCriteriaMax) {
						var oPoint = aCriteria[iCriteria]
							,oSett = oPoint.oSettings
							,rxLast = oSett.ignoreDashes?rxLastNrNoDash:rxLastNr
						;
						//
						fnPluginPrepare(oSett);
						//
						if (oSett.sortFunction) { // custom sort
							iReturn = oSett.sortFunction(a,b);
						} else if (oSett.order=='rand') { // random sort
							iReturn = Math.random()<0.5?1:-1;
						} else { // regular sort
							var bNumeric = fls
								// prepare sort elements
								,sA = fnPrepareSortElement(oSett,a.s[iCriteria])
								,sB = fnPrepareSortElement(oSett,b.s[iCriteria])
							;
							// maybe force Strings
							if (!oSett.forceStrings) {
								// maybe mixed
								var  aAnum = isString(sA)?sA&&sA.match(rxLast):fls
									,aBnum = isString(sB)?sB&&sB.match(rxLast):fls;
								if (aAnum&&aBnum) {
									var  sAprv = sA.substr(0,sA.length-aAnum[0].length)
										,sBprv = sB.substr(0,sB.length-aBnum[0].length);
									if (sAprv==sBprv) {
										bNumeric = !fls;
										sA = prsflt(aAnum[0]);
										sB = prsflt(aBnum[0]);
									}
								}
							}
							iReturn = oPoint.iAsc*(sA<sB?-1:(sA>sB?1:0));
						}

						loop(aPluginSort,function(fn){
							iReturn = fn.call(fn,bNumeric,sA,sB,iReturn);
						});

						if (iReturn===0) iCriteria++;
					}

					return iReturn;
				}
			;
			// fill aFind and aSettings but keep length pairing up
			for (i=0,l=arguments.length;i<l;i++){
				var o = arguments[i];
				if (isString(o))	{
					if (aFind.push(o)-1>aSettings.length) aSettings.length = aFind.length-1;
				} else {
					if (aSettings.push(o)>aFind.length) aFind.length = aSettings.length;
				}
			}
			if (aFind.length>aSettings.length) aSettings.length = aFind.length; // todo: and other way around?

			// fill aFind and aSettings for arguments.length===0
			iCriteriaMax = aFind.length;
			if (iCriteriaMax===0) {
				iCriteriaMax = aFind.length = 1;
				aSettings.push({});
			}

			for (i=0,l=iCriteriaMax;i<l;i++) {
				var sFind = aFind[i]
					,oSettings = $.extend({}, $.tinysort.defaults, aSettings[i])
					// has find, attr or data
					,bFind = !(!sFind||sFind==='')
					// since jQuery's filter within each works on array index and not actual index we have to create the filter in advance
					,bFilter = bFind&&sFind[0]===':'
				;
				aCriteria.push({ // todo: only used locally, find a way to minify properties
					 sFind: sFind
					,oSettings: oSettings
					// has find, attr or data
					,bFind: bFind
					,bAttr: !(oSettings.attr===nll||oSettings.attr==='')
					,bData: oSettings.data!==nll
					// filter
					,bFilter: bFilter
					,$Filter: bFilter?oThis.filter(sFind):oThis
					,fnSort: oSettings.sortFunction
					,iAsc: oSettings.order=='asc'?1:-1
				});
			}
			//
			// prepare oElements for sorting
			oThis.each(function(i,el) {
				var $Elm = $(el)
					,mParent = $Elm.parent().get(0)
					,mFirstElmOrSub // we still need to distinguish between sortable and non-sortable elements (might have unexpected results for multiple criteria)
					,aSort = []
				;
				for (j=0;j<iCriteriaMax;j++) {
					var oPoint = aCriteria[j]
						// element or sub selection
						,mElmOrSub = oPoint.bFind?(oPoint.bFilter?oPoint.$Filter.filter(el):$Elm.find(oPoint.sFind)):$Elm;
					// text or attribute value
					aSort.push(oPoint.bData?mElmOrSub.data(oPoint.oSettings.data):(oPoint.bAttr?mElmOrSub.attr(oPoint.oSettings.attr):(oPoint.oSettings.useVal?mElmOrSub.val():mElmOrSub.text())));
					if (mFirstElmOrSub===undefined) mFirstElmOrSub = mElmOrSub;
				}
				// to sort or not to sort
				var iElmIndex = fnIndexOf.call(aElementsParent,mParent);
				if (iElmIndex<0) {
					iElmIndex = aElementsParent.push(mParent) - 1;
					aElements[iElmIndex] = {s:[],n:[]};	// s: sort, n: not sort
				}
				if (mFirstElmOrSub.length>0)	aElements[iElmIndex].s.push({s:aSort,e:$Elm,n:i}); // s:string/pointer, e:element, n:number
				else							aElements[iElmIndex].n.push({e:$Elm,n:i});
			});
			//
			// sort
			loop(aElements, function(oParent) { oParent.s.sort(fnSort); });
			//
			// order elements and fill new order
			loop(aElements, function(oParent) {
				var aSorted = oParent.s
                    ,aUnsorted = oParent.n
                    ,iSorted = aSorted.length
                    ,iUnsorted = aUnsorted.length
                    ,iNumElm = iSorted+iUnsorted
					,aOriginal = [] // list for original position
					,iLow = iNumElm
					,aCount = [0,0] // count how much we've sorted for retrieval from either the sort list or the non-sort list (oParent.s/oParent.n)
				;
				switch (oSettings.place) {
					case 'first':	loop(aSorted,function(obj) { iLow = mathmn(iLow,obj.n); }); break;
					case 'org':		loop(aSorted,function(obj) { aOriginal.push(obj.n); }); break;
					case 'end':		iLow = iUnsorted; break;
					default:		iLow = 0;
				}
				for (i=0;i<iNumElm;i++) {
					var bFromSortList = contains(aOriginal,i)?!fls:i>=iLow&&i<iLow+iSorted
                        ,iCountIndex = bFromSortList?0:1
						,mEl = (bFromSortList?aSorted:aUnsorted)[aCount[iCountIndex]].e;
					mEl.parent().append(mEl);
					if (bFromSortList||!oSettings.returns) aNewOrder.push(mEl.get(0));
					aCount[iCountIndex]++;
				}
			});
			oThis.length = 0;
			Array.prototype.push.apply(oThis,aNewOrder);
			return oThis;
		}
	});
	// toLowerCase // todo: dismantle, used only once
	function toLowerCase(s) {
		return s&&s.toLowerCase?s.toLowerCase():s;
	}
	// array contains
	function contains(a,n) {
		for (var i=0,l=a.length;i<l;i++) if (a[i]==n) return !fls;
		return fls;
	}
	// set functions
	$.fn.TinySort = $.fn.Tinysort = $.fn.tsort = $.fn.tinysort;
})(jQuery);
