/*global pluralRuleParser */
( function ( $ ) {
	'use strict';

	var language = {

		// CLDR plural rules generated using
		// http://i18ndata.appspot.com/cldr/tags/unconfirmed/supplemental/plurals?action=browse&depth=-1
		// and compressed
		pluralRules: {
			gv: {
				one: 'n mod 10 in 1..2 or n mod 20 is 0'
			},
			gu: {
				one: 'n is 1'
			},
			rof: {
				one: 'n is 1'
			},
			ga: {
				few: 'n in 3..6',
				many: 'n in 7..10',
				two: 'n is 2',
				one: 'n is 1'
			},
			gl: {
				one: 'n is 1'
			},
			lg: {
				one: 'n is 1'
			},
			lb: {
				one: 'n is 1'
			},
			xog: {
				one: 'n is 1'
			},
			ln: {
				one: 'n in 0..1'
			},
			lo: '',
			brx: {
				one: 'n is 1'
			},
			tr: '',
			ts: {
				one: 'n is 1'
			},
			tn: {
				one: 'n is 1'
			},
			to: '',
			lt: {
				few: 'n mod 10 in 2..9 and n mod 100 not in 11..19',
				one: 'n mod 10 is 1 and n mod 100 not in 11..19'
			},
			tk: {
				one: 'n is 1'
			},
			th: '',
			ksb: {
				one: 'n is 1'
			},
			te: {
				one: 'n is 1'
			},
			ksh: {
				zero: 'n is 0',
				one: 'n is 1'
			},
			fil: {
				one: 'n in 0..1'
			},
			haw: {
				one: 'n is 1'
			},
			kcg: {
				one: 'n is 1'
			},
			ssy: {
				one: 'n is 1'
			},
			yo: '',
			de: {
				one: 'n is 1'
			},
			ko: '',
			da: {
				one: 'n is 1'
			},
			dz: '',
			dv: {
				one: 'n is 1'
			},
			guw: {
				one: 'n in 0..1'
			},
			shi: {
				few: 'n in 2..10',
				one: 'n within 0..1'
			},
			el: {
				one: 'n is 1'
			},
			eo: {
				one: 'n is 1'
			},
			en: {
				one: 'n is 1'
			},
			ses: '',
			teo: {
				one: 'n is 1'
			},
			ee: {
				one: 'n is 1'
			},
			kde: '',
			fr: {
				one: 'n within 0..2 and n is not 2'
			},
			eu: {
				one: 'n is 1'
			},
			et: {
				one: 'n is 1'
			},
			es: {
				one: 'n is 1'
			},
			seh: {
				one: 'n is 1'
			},
			ru: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			kl: {
				one: 'n is 1'
			},
			sms: {
				two: 'n is 2',
				one: 'n is 1'
			},
			smn: {
				two: 'n is 2',
				one: 'n is 1'
			},
			smj: {
				two: 'n is 2',
				one: 'n is 1'
			},
			smi: {
				two: 'n is 2',
				one: 'n is 1'
			},
			fy: {
				one: 'n is 1'
			},
			rm: {
				one: 'n is 1'
			},
			ro: {
				few: 'n is 0 OR n is not 1 AND n mod 100 in 1..19',
				one: 'n is 1'
			},
			bn: {
				one: 'n is 1'
			},
			sma: {
				two: 'n is 2',
				one: 'n is 1'
			},
			be: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			bg: {
				one: 'n is 1'
			},
			ms: '',
			wa: {
				one: 'n in 0..1'
			},
			ps: {
				one: 'n is 1'
			},
			wo: '',
			bm: '',
			jv: '',
			bo: '',
			bh: {
				one: 'n in 0..1'
			},
			kea: '',
			asa: {
				one: 'n is 1'
			},
			cgg: {
				one: 'n is 1'
			},
			br: {
				few: 'n mod 10 in 3..4,9 and n mod 100 not in 10..19,70..79,90..99',
				many: 'n mod 1000000 is 0 and n is not 0',
				two: 'n mod 10 is 2 and n mod 100 not in 12,72,92',
				one: 'n mod 10 is 1 and n mod 100 not in 11,71,91'
			},
			bs: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			ja: '',
			om: {
				one: 'n is 1'
			},
			fa: '',
			vun: {
				one: 'n is 1'
			},
			or: {
				one: 'n is 1'
			},
			xh: {
				one: 'n is 1'
			},
			nso: {
				one: 'n in 0..1'
			},
			ca: {
				one: 'n is 1'
			},
			cy: {
				few: 'n is 3',
				zero: 'n is 0',
				many: 'n is 6',
				two: 'n is 2',
				one: 'n is 1'
			},
			cs: {
				few: 'n in 2..4',
				one: 'n is 1'
			},
			zh: '',
			lv: {
				zero: 'n is 0',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			pt: {
				one: 'n is 1'
			},
			wae: {
				one: 'n is 1'
			},
			tl: {
				one: 'n in 0..1'
			},
			chr: {
				one: 'n is 1'
			},
			pa: {
				one: 'n is 1'
			},
			ak: {
				one: 'n in 0..1'
			},
			pl: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n is not 1 and n mod 10 in 0..1 or n mod 10 in 5..9 or n mod 100 in 12..14',
				one: 'n is 1'
			},
			hr: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			am: {
				one: 'n in 0..1'
			},
			ti: {
				one: 'n in 0..1'
			},
			hu: '',
			hi: {
				one: 'n in 0..1'
			},
			jmc: {
				one: 'n is 1'
			},
			ha: {
				one: 'n is 1'
			},
			he: {
				one: 'n is 1'
			},
			mg: {
				one: 'n in 0..1'
			},
			fur: {
				one: 'n is 1'
			},
			bem: {
				one: 'n is 1'
			},
			ml: {
				one: 'n is 1'
			},
			mo: {
				few: 'n is 0 OR n is not 1 AND n mod 100 in 1..19',
				one: 'n is 1'
			},
			mn: {
				one: 'n is 1'
			},
			mk: {
				one: 'n mod 10 is 1 and n is not 11'
			},
			ur: {
				one: 'n is 1'
			},
			bez: {
				one: 'n is 1'
			},
			mt: {
				few: 'n is 0 or n mod 100 in 2..10',
				many: 'n mod 100 in 11..19',
				one: 'n is 1'
			},
			uk: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			mr: {
				one: 'n is 1'
			},
			ta: {
				one: 'n is 1'
			},
			my: '',
			sah: '',
			ve: {
				one: 'n is 1'
			},
			af: {
				one: 'n is 1'
			},
			vi: '',
			is: {
				one: 'n is 1'
			},
			iu: {
				two: 'n is 2',
				one: 'n is 1'
			},
			it: {
				one: 'n is 1'
			},
			kn: '',
			ii: '',
			ar: {
				few: 'n mod 100 in 3..10',
				zero: 'n is 0',
				many: 'n mod 100 in 11..99',
				two: 'n is 2',
				one: 'n is 1'
			},
			zu: {
				one: 'n is 1'
			},
			saq: {
				one: 'n is 1'
			},
			az: '',
			tzm: {
				one: 'n in 0..1 or n in 11..99'
			},
			id: '',
			ig: '',
			pap: {
				one: 'n is 1'
			},
			nl: {
				one: 'n is 1'
			},
			nn: {
				one: 'n is 1'
			},
			no: {
				one: 'n is 1'
			},
			nah: {
				one: 'n is 1'
			},
			nd: {
				one: 'n is 1'
			},
			ne: {
				one: 'n is 1'
			},
			ny: {
				one: 'n is 1'
			},
			naq: {
				two: 'n is 2',
				one: 'n is 1'
			},
			nyn: {
				one: 'n is 1'
			},
			kw: {
				two: 'n is 2',
				one: 'n is 1'
			},
			nr: {
				one: 'n is 1'
			},
			tig: {
				one: 'n is 1'
			},
			kab: {
				one: 'n within 0..2 and n is not 2'
			},
			mas: {
				one: 'n is 1'
			},
			rwk: {
				one: 'n is 1'
			},
			kaj: {
				one: 'n is 1'
			},
			lag: {
				zero: 'n is 0',
				one: 'n within 0..2 and n is not 0 and n is not 2'
			},
			syr: {
				one: 'n is 1'
			},
			kk: {
				one: 'n is 1'
			},
			ff: {
				one: 'n within 0..2 and n is not 2'
			},
			fi: {
				one: 'n is 1'
			},
			fo: {
				one: 'n is 1'
			},
			ka: '',
			gsw: {
				one: 'n is 1'
			},
			ckb: {
				one: 'n is 1'
			},
			ss: {
				one: 'n is 1'
			},
			sr: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			sq: {
				one: 'n is 1'
			},
			sw: {
				one: 'n is 1'
			},
			sv: {
				one: 'n is 1'
			},
			km: '',
			st: {
				one: 'n is 1'
			},
			sk: {
				few: 'n in 2..4',
				one: 'n is 1'
			},
			sh: {
				few: 'n mod 10 in 2..4 and n mod 100 not in 12..14',
				many: 'n mod 10 is 0 or n mod 10 in 5..9 or n mod 100 in 11..14',
				one: 'n mod 10 is 1 and n mod 100 is not 11'
			},
			so: {
				one: 'n is 1'
			},
			sn: {
				one: 'n is 1'
			},
			ku: {
				one: 'n is 1'
			},
			sl: {
				few: 'n mod 100 in 3..4',
				two: 'n mod 100 is 2',
				one: 'n mod 100 is 1'
			},
			sg: '',
			nb: {
				one: 'n is 1'
			},
			se: {
				two: 'n is 2',
				one: 'n is 1'
			}
		},

		/**
		 * Plural form transformations, needed for some languages.
		 *
		 * @param count
		 *            integer Non-localized quantifier
		 * @param forms
		 *            array List of plural forms
		 * @return string Correct form for quantifier in this language
		 */
		convertPlural: function ( count, forms ) {
			var pluralRules, pluralFormIndex;

			if ( !forms || forms.length === 0 ) {
				return '';
			}

			pluralRules = this.pluralRules[$.i18n().locale];

			if ( !pluralRules ) {
				// default fallback.
				return ( count === 1 ) ? forms[0] : forms[1];
			}

			pluralFormIndex = this.getPluralForm( count, pluralRules );
			pluralFormIndex = Math.min( pluralFormIndex, forms.length - 1 );

			return forms[pluralFormIndex];
		},

		/**
		 * For the number, get the plural for index
		 *
		 * @param number
		 * @param pluralRules
		 * @return plural form index
		 */
		getPluralForm: function ( number, pluralRules ) {
			var i,
				pluralForms = [ 'zero', 'one', 'two', 'few', 'many', 'other' ],
				pluralFormIndex = 0;

			for ( i = 0; i < pluralForms.length; i++ ) {
				if ( pluralRules[pluralForms[i]] ) {
					if ( pluralRuleParser( pluralRules[pluralForms[i]], number ) ) {
						return pluralFormIndex;
					}

					pluralFormIndex++;
				}
			}

			return pluralFormIndex;
		},

		/**
		 * Converts a number using digitTransformTable.
		 *
		 * @param {number} num Value to be converted
		 * @param {boolean} integer Convert the return value to an integer
		 */
		'convertNumber': function ( num, integer ) {
			var tmp, item, i,
				transformTable, numberString, convertedNumber;

			// Set the target Transform table:
			transformTable = this.digitTransformTable( $.i18n().locale );
			numberString = '' + num;
			convertedNumber = '';

			if ( !transformTable ) {
				return num;
			}

			// Check if the restore to Latin number flag is set:
			if ( integer ) {
				if ( parseFloat( num, 10 ) === num ) {
					return num;
				}

				tmp = [];

				for ( item in transformTable ) {
					tmp[transformTable[item]] = item;
				}

				transformTable = tmp;
			}

			for ( i = 0; i < numberString.length; i++ ) {
				if ( transformTable[numberString[i]] ) {
					convertedNumber += transformTable[numberString[i]];
				} else {
					convertedNumber += numberString[i];
				}
			}

			return integer ? parseFloat( convertedNumber, 10 ) : convertedNumber;
		},

		/**
		 * Grammatical transformations, needed for inflected languages.
		 * Invoked by putting {{grammar:form|word}} in a message.
		 * Override this method for languages that need special grammar rules
		 * applied dynamically.
		 *
		 * @param word {String}
		 * @param form {String}
		 * @return {String}
		 */
		convertGrammar: function ( word, form ) {
			return word;
		},

		/**
		 * Provides an alternative text depending on specified gender. Usage
		 * {{gender:[gender|user object]|masculine|feminine|neutral}}. If second
		 * or third parameter are not specified, masculine is used.
		 *
		 * These details may be overriden per language.
		 *
		 * @param gender
		 *      string male, female, or anything else for neutral.
		 * @param forms
		 *      array List of gender forms
		 *
		 * @return string
		 */
		'gender': function ( gender, forms ) {
			if ( !forms || forms.length === 0 ) {
				return '';
			}

			while ( forms.length < 2 ) {
				forms.push( forms[forms.length - 1] );
			}

			if ( gender === 'male' ) {
				return forms[0];
			}

			if ( gender === 'female' ) {
				return forms[1];
			}

			return ( forms.length === 3 ) ? forms[2] : forms[0];
		},

		/**
		 * Get the digit transform table for the given language
		 * See http://cldr.unicode.org/translation/numbering-systems
		 * @param language
		 * @returns {Array|boolean} List of digits in the passed language or false
		 * representation, or boolean false if there is no information.
		 */
		digitTransformTable: function ( language ) {
			var tables = {
				ar: '٠١٢٣٤٥٦٧٨٩',
				fa: '۰۱۲۳۴۵۶۷۸۹',
				ml: '൦൧൨൩൪൫൬൭൮൯',
				kn: '೦೧೨೩೪೫೬೭೮೯',
				lo: '໐໑໒໓໔໕໖໗໘໙',
				or: '୦୧୨୩୪୫୬୭୮୯',
				kh: '០១២៣៤៥៦៧៨៩',
				pa: '੦੧੨੩੪੫੬੭੮੯',
				gu: '૦૧૨૩૪૫૬૭૮૯',
				hi: '०१२३४५६७८९',
				my: '၀၁၂၃၄၅၆၇၈၉',
				ta: '௦௧௨௩௪௫௬௭௮௯',
				te: '౦౧౨౩౪౫౬౭౮౯',
				th: '๐๑๒๓๔๕๖๗๘๙', //FIXME use iso 639 codes
				bo: '༠༡༢༣༤༥༦༧༨༩' //FIXME use iso 639 codes
			};

			if ( !tables[language] ) {
				return false;
			}

			return tables[language].split( '' );
		}
	};

	$.extend( $.i18n.languages, {
		'default': language
	} );
}( jQuery ) );
