/**
 * TinySort Charorder: a TinySort plugin to sort non-latin characters.
 * @summary A nodeElement sorting script.
 * @version 2.0.97 beta
 * @requires tinysort v2.0.81 beta
 * @license MIT/GPL
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort.charorder
 * @example
 * tinysort(document.querySelector('ul#danish>li'),{charOrder:'æøå[{Aa}]'});
 */
;(function() {
	'use strict';

	var sVersion = '2.0.81'
		//
		,frCrCd = String.fromCharCode		// minify placeholder
		,mathmn = Math.min					// minify placeholder
		,nll = null							// minify placeholder
		,plugin = window.tinysort.plugin
		,fnIndexOf = plugin.indexOf
		,loop = plugin.loop
		//
		,sCharOrder							// equals the input oSettings.charOrder so we can test any changes
		,aAllChars = (function(a){			// all latin chars 32-255
				// using lowerCase instead of upperCase so _ will sort before
				for (var i=32,s=frCrCd(i),len=255;i<len;i++,s=frCrCd(i).toLowerCase()) {
					if (fnIndexOf.call(a,s)===-1) a.push(s);
				}
				return a.sort();
			})([])
		,aOrderChar							// similar to sAllChars but with the changed char order
		,bDoubles							// boolean indicating double-non-latin chars, ie: lj, dž, Aa, ch, ss etc...
		,iReplace = 0x2500					// doubles are replaced with Unicode char starting at 0x2500
		,oReplace = {}						// replacement object
		,rxNotLatin							// regular expression to test for non-latin chars
	;
	// add to namespace
	tinysort.charorder = {version:sVersion};
	tinysort.defaults.charOrder = sCharOrder; // sets to undefined
	plugin(prepare,sort);
	//

	/**
	 * Prepares the criterium within the tinysort sort function
	 * @memberof tinysort.charorder
	 * @private
	 * @param {criterium} criterium
	 */
	function prepare(criterium){
		// check charOrder (non latin chars)
		// sCharOrder only to check wether other vars are set
		// variables used on sort
		//		- oSettings.charOrder to test
		//		- bDoubles to test
		//		- oReplace for doubles
		//		- rxNotLatin to test
		//		- aOrderChar to order
		//
		if (criterium.charOrder!=sCharOrder) {
			sCharOrder = criterium.charOrder;
			if (!criterium.charOrder) {
				bDoubles = false;
				iReplace = 0x2500;
				oReplace = {};
				rxNotLatin = aOrderChar = nll;
			} else {
				aOrderChar = aAllChars.slice(0); // first set to entire 32-255 charlist
				bDoubles = false;
				// then loop through the sCharOrder rule
				for (var
					 aCharNotLatin = []
					,fnAddNonLatinChar = function(key,nonLatin){
							aCharNotLatin.push(nonLatin);
							oReplace[criterium.cases?key:key.toLowerCase()] = nonLatin;
						}
					,sAllCharNotLatin = ''
					,sCharLatin = 'z' // if oSettings.charOrder has no [a-z] characters are appended to z
					,l = sCharOrder.length
					,j,m // init
				,i=0;i<l;i++) { // loop through chars to set 'rxNotLatin' and 'sOrderChar'
					var  sChar = sCharOrder[i]
						,iChar = sChar.charCodeAt()
						,bIsLatin = iChar>96&&iChar<123; // 'a'.charCodeAt()===97 'z'.charCodeAt()===122
					if (!bIsLatin){
						if (sChar=='[') { // find replace chars: ë will sort similar to e
							var iCharNotLatin = aCharNotLatin.length
								,sLastChar = iCharNotLatin?aCharNotLatin[iCharNotLatin-1]:sCharLatin
								,sReplaces = sCharOrder.substr(i+1).match(/[^\]]*/)[0]
								,aDoubles = sReplaces.match(/{[^}]*}/g); // find doubles: dž, ss, lj ...
							if (aDoubles) {
								for (j=0,m=aDoubles.length;j<m;j++) {
									var sCode = aDoubles[j];
									i += sCode.length; // increment i because of .replace(...
									sReplaces = sReplaces.replace(sCode,'');
									fnAddNonLatinChar(sCode.replace(/[{}]/g,''),sLastChar);
									bDoubles = true;
								}
							}
							for (j=0,m=sReplaces.length;j<m;j++) fnAddNonLatinChar(sReplaces[j],sLastChar);
//							for (j=0,m=sReplaces.length;j<m;j++) fnAddNonLatinChar(sLastChar,sReplaces[j]);
							i += sReplaces.length+1;
						} else if (sChar=='{') { // find doubles: dž, ss, lj ...
							var sDouble = sCharOrder.substr(i+1).match(/[^}]*/)[0];
							fnAddNonLatinChar(sDouble,frCrCd(iReplace++)); // replace the double with single Unicode 0x2500+
							i += sDouble.length+1;
							bDoubles = true;
						} else {
							aCharNotLatin.push(sChar);
						}
					}
					if (aCharNotLatin.length&&(bIsLatin||i===l-1)) {
						var sCharNotLatin = aCharNotLatin.join('');
						sAllCharNotLatin += sCharNotLatin;
						// first remove non latin chars
						loop(sCharNotLatin.split(''),function(s){
							aOrderChar.splice(fnIndexOf.call(aOrderChar,s),1);
						});
						// then append chars to latin char
						var aParse = aCharNotLatin.slice(0);
						aParse.splice(0,0,fnIndexOf.call(aOrderChar,sCharLatin)+1,0);
						Array.prototype.splice.apply(aOrderChar,aParse);
						//
						aCharNotLatin.length = 0;
					}
					if (i+1===l) rxNotLatin = new RegExp('['+sAllCharNotLatin+']','gi'); // make regex to test for chars
					else if (bIsLatin) sCharLatin = sChar;
				}
			}
		}
		//'a[àâ]c[ç]e[éèêë]i[ïî]o[ôœ]u[ûù]'
//		console.log('aCharNotLatin',aCharNotLatin); // log
//		console.log('oReplace',oReplace); // log
//		console.log('aOrderChar',aOrderChar); // log
	}

	/**
	 * The plugin sort function called from the tinysort sort function
	 * @memberof tinysort.charorder
	 * @private
	 * @param {criterium} criterium
	 * @param {Boolean} isNumeric
	 * @param {String|Number} a
	 * @param {String|Number} b
	 * @param {Number} sortReturn
	 * @returns {Number} A sorting number -1, 0 or 1
	 */
	function sort(criterium,isNumeric,a,b,sortReturn){
//		console.log('a,b',a,b,criterium.charOrder,oReplace,bDoubles); // log
		if (!isNumeric&&criterium.charOrder) {
//			if (bDoubles) { // first replace doubles
				for (var s in oReplace) {
					var o = oReplace[s];
					a = a.replace(s,o);
					b = b.replace(s,o);
				}
//			}
			// then test if either word has non latin chars
			// we're using the slower string.match because strangely regex.test sometimes fails
			if (a.match(rxNotLatin)!==nll||b.match(rxNotLatin)!==nll) {
				for (var k=0,l=mathmn(a.length,b.length);k<l;k++) {
					var iAchr = fnIndexOf.call(aOrderChar,a[k])
						,iBchr = fnIndexOf.call(aOrderChar,b[k]);
//					console.log('iAchr',iAchr,a[k],'\tiBchr',iBchr,b[k]); // log
					if (sortReturn=criterium.iAsc*(iAchr<iBchr?-1:(iAchr>iBchr?1:0))) break;
				}
			}
		}
		return sortReturn;
	}

	/*function getSortBy(elementObject,criterium,subject){
		return subject;
	}*/
})();
