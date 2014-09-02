/*! TinySort CharOrder 1.1.2
* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
* License:
*     MIT: http://www.opensource.org/licenses/mit-license.php
*     GPL: http://www.gnu.org/licenses/gpl.html
*//*
* Description:
*   A TinySort plugin to sort non-latin characters.
*
* Usage:
*   $('ul#danish>li').tsort({charOrder:'æøå[{Aa}]'});
*
*/
;(function($,tinysort) {
	'use strict';
	// private vars
	var sCharOrder							// equals the input oSettings.charOrder so we can test any changes
		,aAllChars = []						// all latin chars 32-255
		,aOrderChar							// similar to sAllChars but with the changed char order
		,bDoubles							// boolean indicating double-non-latin chars, ie: lj, dž, Aa, ch, ss etc...
		,iReplace = 0x2500					// doubles are replaced with Unicode char starting at 0x2500
		,oReplace = {}						// replacement object
		,rxNotLatin							// regular expression to test for non-latin chars

		,frCrCd = String.fromCharCode		// minify placeholder
		,mathmn = Math.min					// minify placeholder
		,nll = null							// minify placeholder

		,fnIndexOf = tinysort.plugin.indexOf

		,oSettings
		,iAsc
	;
	// create basic latin string chars 32-255
	for (var i=32,s=frCrCd(i),len=255;i<len;i++,s=frCrCd(i).toLowerCase()) { // using lowerCase instead of upperCase so _ will sort before
		if (fnIndexOf.call(aAllChars,s)===-1) aAllChars.push(s);
	}
	aAllChars.sort();
	tinysort.charorder = {
		 id: 'TinySort CharOrder'
		,version: '1.1.2'
		,requires: 'TinySort 1.4'
		,copyright: 'Copyright (c) 2008-2013 Ron Valstar'
		,uri: 'http://tinysort.sjeiti.com/'
		,licensed: {
			MIT: 'http://www.opensource.org/licenses/mit-license.php'
			,GPL: 'http://www.gnu.org/licenses/gpl.html'
		}
	};
	// add charOrder to defaults
	tinysort.defaults.charOrder = sCharOrder; // todo: check this
	//
	tinysort.plugin(
		function(settings){
			oSettings = settings;
			iAsc = oSettings.order=='asc'?1:-1;
			// check charOrder (non latin chars)
			// sCharOrder only to check wether other vars are set
			// variables used on sort
			//		- oSettings.charOrder to test
			//		- bDoubles to test
			//		- oReplace for doubles
			//		- rxNotLatin to test
			//		- aOrderChar to order
			//
			if (oSettings.charOrder!=sCharOrder) {
				sCharOrder = oSettings.charOrder;
				if (!oSettings.charOrder) {
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
								oReplace[oSettings.cases?key:key.toLowerCase()] = nonLatin;
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
								for (j=0,m=sReplaces.length;j<m;j++) fnAddNonLatinChar(sLastChar,sReplaces[j]);
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
							$.each(sCharNotLatin.split(''),function(j,s){
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

		}
		,function(bNumeric,sA,sB,iReturn){
			if (!bNumeric&&oSettings.charOrder) {
				if (bDoubles) { // first replace doubles
					$.each(oReplace,function(s,o){
						sA = sA.replace(s,o);
						sB = sB.replace(s,o);
					});
				}
				// then test if either word has non latin chars
				// we're using the slower string.match because strangely regex.test sometimes fails
				if (sA.match(rxNotLatin)!==nll||sB.match(rxNotLatin)!==nll) {
					for (var k=0,l=mathmn(sA.length,sB.length);k<l;k++) {
						var iAchr = fnIndexOf.call(aOrderChar,sA[k])
							,iBchr = fnIndexOf.call(aOrderChar,sB[k]);
						if (iReturn=iAsc*(iAchr<iBchr?-1:(iAchr>iBchr?1:0))) break;
					}
				}
			}
			return iReturn;
		}
	);
})(jQuery,jQuery.tinysort);
