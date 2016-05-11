/**
 * TinySort CharOrder: a TinySort plugin to sort non-latin characters.
 * @summary TinySort CharOrder
 * @version 2.3.6
 * @requires tinysort
 * @license MIT/GPL
 * @author Ron Valstar <ron@ronvalstar.nl>
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 * @namespace tinysort.charorder
 */
(function (root,factory) {
	'use strict';

	if (typeof define==='function'&&define.amd) {
		define(['tinysort'],factory);
	} else {
		factory(root.tinysort);
	}
}(this,function(tinysort) {
	'use strict';

	var fromCharCode = String.fromCharCode	// minify placeholder
		,mathmn = Math.min					// minify placeholder
		,nll = null							// minify placeholder
		,fnIndexOf = Array.prototype.indexOf// minify placeholder
		,plugin = tinysort.plugin
		,loop = plugin.loop
		//
		,charOrder							// equals the input oSettings.charOrder so we can test any changes
		,allCharsList = (function(a){		// all latin chars 32-255
				// using lowerCase instead of upperCase so _ will sort before
				for (var i=32,s=fromCharCode(i),len=255;i<len;i++,s=fromCharCode(i).toLowerCase()) {
					if (fnIndexOf.call(a,s)===-1) a.push(s);
				}
				return a.sort();
			})([])
		,orderedCharlist					// similar to sAllChars but with the changed char order
		,replacementIndex = 0x2500			// doubles are replaced with Unicode char starting at 0x2500
		,replacements = {}					// replacement object // todo: reset?
		,regexNonLatin = /[^a-zA-Z]/g
	;
	// add to namespace
	tinysort.defaults.charOrder = charOrder; // sets to undefined
	plugin(prepare,sort);

	/**
	 * Prepares the criterium within the tinysort sort function
	 * @memberof tinysort.charorder
	 * @private
	 * @param {criterium} criterium
	 */
	function prepare(criterium){
		// check charOrder (non latin chars)
		// charOrder only to check whether other vars are set
		// variables used on sort
		//		- oSettings.charOrder to test
		//		- replacements
		//		- orderedCharlist to order doubles
		//
		if (criterium.charOrder!==charOrder) {
			charOrder = criterium.charOrder;
			replacementIndex = 0x2500;
			replacements = {};
			orderedCharlist = nll;
			if (charOrder) {
				orderedCharlist = allCharsList.slice(0); // first set to entire 32-255 charlist
				// then loop through the charOrder rule
				for (var
					charListNotLatin = []
					,addReplacement = function(nonLatin,replacement){
							charListNotLatin.push(replacement);
							replacements[criterium.cases?nonLatin:nonLatin.toLowerCase()] = replacement;
						}
					,lastLatinChar = 'z' // if oSettings.charOrder has no [a-z] characters are appended to z
					,l = charOrder.length
					,j,m // init
				,i=0;i<l;i++) { // loop through chars to set 'sOrderChar'
					var  char = charOrder[i]
						,charCode = char.charCodeAt()
						,charIsLatin = charCode>96&&charCode<123; // 'a'.charCodeAt()===97 'z'.charCodeAt()===122
					if (!charIsLatin){
						if (char==='[') { // find replace chars: ë will sort similar to e
							var charsNotLatinNum = charListNotLatin.length
								,lastChar = charsNotLatinNum?charListNotLatin[charsNotLatinNum-1]:lastLatinChar
								,replaces = charOrder.substr(i+1).match(/[^\]]*/)[0]
								,doubles = replaces.match(/{[^}]*}/g); // find doubles: dž, ss, lj ...
							if (doubles) {
								for (j=0,m=doubles.length;j<m;j++) {
									var sCode = doubles[j];
									i += sCode.length; // increment i because of .replace(...
									replaces = replaces.replace(sCode,'');
									addReplacement(sCode.replace(/[{}]/g,''),lastChar);
								}
							}
							for (j=0,m=replaces.length;j<m;j++) {
								addReplacement(replaces[j],lastChar);
							}
							i += replaces.length+1;
						} else if (char==='{') { // find doubles: dž, ss, lj ...
							var doubleChars = charOrder.substr(i+1).match(/[^}]*/)[0];
							addReplacement(doubleChars,fromCharCode(replacementIndex++)); // replace the double with single Unicode 0x2500+
							i += doubleChars.length+1;
						} else {
							charListNotLatin.push(char);
						}
					}
					if (charListNotLatin.length&&(charIsLatin||i===l-1)) {
						// first remove non latin chars
						loop(charListNotLatin,function(s){
							orderedCharlist.splice(fnIndexOf.call(orderedCharlist,s),1);
						});
						// then append chars to latin char
						var charListNotLatinCopy = charListNotLatin.slice(0);
						charListNotLatinCopy.splice(0,0,fnIndexOf.call(orderedCharlist,lastLatinChar)+1,0);
						Array.prototype.splice.apply(orderedCharlist,charListNotLatinCopy);
						//
						charListNotLatin.length = 0;
					}
					if (charIsLatin) lastLatinChar = char;
				}
			}
		}
		//'a[àâ]c[ç]e[éèêë]i[ïî]o[ôœ]u[ûù]'
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
		if (a===b) {
			sortReturn = 0;
		} else if (!isNumeric&&criterium.charOrder) {
			// replace chars (todo? first replace doubles?)
			for (var replace in replacements) {
				var replacement = replacements[replace];
				a = a.replace(replace,replacement);
				b = b.replace(replace,replacement);
			}
			// then test if either word has non latin chars
			// we're using the slower string.match because strangely regex.test sometimes fails
			if (a.match(regexNonLatin)!==nll||b.match(regexNonLatin)!==nll) {
				for (var k=0,l=mathmn(a.length,b.length);k<l;k++) {
					var iAchr = fnIndexOf.call(orderedCharlist,a[k])
						,iBchr = fnIndexOf.call(orderedCharlist,b[k]);
					if (sortReturn=criterium.sortReturnNumber*(iAchr<iBchr?-1:(iAchr>iBchr?1:0))) break;
				}
			} else {
				sortReturn = a===b?0:a>b?1:-1;
			}
		}
		return sortReturn;
	}
}));