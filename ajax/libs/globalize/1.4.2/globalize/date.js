/**
 * Globalize v1.4.2
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-03-07T13:47Z
 */
/*!
 * Globalize v1.4.2 2019-03-07T13:47Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize",
			"./number",
			"cldr/event",
			"cldr/supplemental"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "../globalize" ) );
	} else {

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var createError = Globalize._createError,
	createErrorUnsupportedFeature = Globalize._createErrorUnsupportedFeature,
	formatMessage = Globalize._formatMessage,
	isPlainObject = Globalize._isPlainObject,
	looseMatching = Globalize._looseMatching,
	numberNumberingSystemDigitsMap = Globalize._numberNumberingSystemDigitsMap,
	numberSymbol = Globalize._numberSymbol,
	regexpEscape = Globalize._regexpEscape,
	removeLiteralQuotes = Globalize._removeLiteralQuotes,
	runtimeBind = Globalize._runtimeBind,
	stringPad = Globalize._stringPad,
	validate = Globalize._validate,
	validateCldr = Globalize._validateCldr,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType,
	validateParameterTypePlainObject = Globalize._validateParameterTypePlainObject,
	validateParameterTypeString = Globalize._validateParameterTypeString;


var validateParameterTypeDate = function( value, name ) {
	validateParameterType( value, name, value === undefined || value instanceof Date, "Date" );
};




var createErrorInvalidParameterValue = function( name, value ) {
	return createError( "E_INVALID_PAR_VALUE", "Invalid `{name}` value ({value}).", {
		name: name,
		value: value
	});
};




/**
 * Create a map between the skeleton fields and their positions, e.g.,
 * {
 *   G: 0
 *   y: 1
 *   ...
 * }
 */
var validateSkeletonFieldsPosMap = "GyYuUrQqMLlwWEecdDFghHKkmsSAzZOvVXx".split( "" ).reduce(function( memo, item, i ) {
	memo[ item ] = i;
	return memo;
}, {});




/**
 * validateSkeleton( skeleton )
 *
 * skeleton: Assume `j` has already been converted into a localized hour field.
 */
var validateSkeleton = function validateSkeleton( skeleton ) {
	var last,

		// Using easier to read variable.
		fieldsPosMap = validateSkeletonFieldsPosMap;

	// "The fields are from the Date Field Symbol Table in Date Format Patterns"
	// Ref: http://www.unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems
	// I.e., check for invalid characters.
	skeleton.replace( /[^GyYuUrQqMLlwWEecdDFghHKkmsSAzZOvVXx]/, function( field ) {
		throw createError(
			"E_INVALID_OPTIONS", "Invalid field `{invalidField}` of skeleton `{value}`",
			{
				invalidField: field,
				type: "skeleton",
				value: skeleton
			}
		);
	});

	// "The canonical order is from top to bottom in that table; that is, yM not My".
	// http://www.unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems
	// I.e., check for invalid order.
	skeleton.split( "" ).every(function( field ) {
		if ( fieldsPosMap[ field ] < last ) {
			throw createError(
				"E_INVALID_OPTIONS", "Invalid order `{invalidField}` of skeleton `{value}`",
				{
					invalidField: field,
					type: "skeleton",
					value: skeleton
				}
			);
		}
		last = fieldsPosMap[ field ];
		return true;
	});
};




/**
 * Returns a new object created by using `object`'s values as keys, and the keys as values.
 */
var objectInvert = function( object, fn ) {
	fn = fn || function( object, key, value ) {
		object[ value ] = key;
		return object;
	};
	return Object.keys( object ).reduce(function( newObject, key ) {
		return fn( newObject, key, object[ key ] );
	}, {});
};




// Invert key and values, e.g., {"e": "eEc"} ==> {"e": "e", "E": "e", "c": "e"}.
var dateExpandPatternSimilarFieldsMap = objectInvert({
	"e": "eEc",
	"L": "ML"
}, function( object, key, value ) {
	value.split( "" ).forEach(function( field ) {
		object[ field ] = key;
	});
	return object;
});




var dateExpandPatternNormalizePatternType = function( character ) {
	return dateExpandPatternSimilarFieldsMap[ character ] || character;
};




var datePatternRe = ( /([a-z])\1*|'([^']|'')+'|''|./ig );




var stringRepeat = function( str, count ) {
	var i, result = "";
	for ( i = 0; i < count; i++ ) {
		result = result + str;
	}
	return result;
};




function expandBestMatchFormat( skeletonWithoutFractionalSeconds, bestMatchFormat ) {
	var i, j, bestMatchFormatParts, matchedType, matchedLength, requestedType,
		requestedLength, requestedSkeletonParts,

		// Using an easier to read variable.
		normalizePatternType = dateExpandPatternNormalizePatternType;

	requestedSkeletonParts = skeletonWithoutFractionalSeconds.match( datePatternRe );
	bestMatchFormatParts = bestMatchFormat.match( datePatternRe );

	for ( i = 0; i < bestMatchFormatParts.length; i++ ) {
		matchedType = bestMatchFormatParts[i].charAt( 0 );
		matchedLength = bestMatchFormatParts[i].length;
		for ( j = 0; j < requestedSkeletonParts.length; j++ ) {
			requestedType = requestedSkeletonParts[j].charAt( 0 );
			requestedLength = requestedSkeletonParts[j].length;
			if ( normalizePatternType( matchedType ) === normalizePatternType( requestedType ) &&
				matchedLength < requestedLength
			) {
				bestMatchFormatParts[i] = stringRepeat( matchedType, requestedLength );
			}
		}
	}

	return bestMatchFormatParts.join( "" );
}

// See: http://www.unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
var dateExpandPatternAugmentFormat = function( requestedSkeleton, bestMatchFormat, decimalSeparator ) {
	var countOfFractionalSeconds, fractionalSecondMatch, lastSecondIdx,
		skeletonWithoutFractionalSeconds;

	fractionalSecondMatch = requestedSkeleton.match( /S/g );
	countOfFractionalSeconds = fractionalSecondMatch ? fractionalSecondMatch.length : 0;
	skeletonWithoutFractionalSeconds = requestedSkeleton.replace( /S/g, "" );

	bestMatchFormat = expandBestMatchFormat( skeletonWithoutFractionalSeconds, bestMatchFormat );

	lastSecondIdx = bestMatchFormat.lastIndexOf( "s" );
	if ( lastSecondIdx !== -1 && countOfFractionalSeconds !== 0 ) {
		bestMatchFormat =
			bestMatchFormat.slice( 0, lastSecondIdx + 1 ) +
			decimalSeparator +
			stringRepeat( "S", countOfFractionalSeconds ) +
			bestMatchFormat.slice( lastSecondIdx + 1 );
	}
	return bestMatchFormat;
};




var dateExpandPatternCompareFormats = function( formatA, formatB ) {
	var a, b, distance, lenA, lenB, typeA, typeB, i, j,

		// Using easier to read variables.
		normalizePatternType = dateExpandPatternNormalizePatternType;

	if ( formatA === formatB ) {
		return 0;
	}

	formatA = formatA.match( datePatternRe );
	formatB = formatB.match( datePatternRe );

	if ( formatA.length !== formatB.length ) {
		return -1;
	}

	distance = 1;
	for ( i = 0; i < formatA.length; i++ ) {
		a = formatA[ i ].charAt( 0 );
		typeA = normalizePatternType( a );
		typeB = null;
		for ( j = 0; j < formatB.length; j++ ) {
			b = formatB[ j ].charAt( 0 );
			typeB = normalizePatternType( b );
			if ( typeA === typeB ) {
				break;
			} else {
				typeB = null;
			}
		}
		if ( typeB === null ) {
			return -1;
		}
		lenA = formatA[ i ].length;
		lenB = formatB[ j ].length;
		distance = distance + Math.abs( lenA - lenB );

		// Most symbols have a small distance from each other, e.g., M ≅ L; E ≅ c; a ≅ b ≅ B;
		// H ≅ k ≅ h ≅ K; ...
		if ( a !== b ) {
			distance += 1;
		}

		// Numeric (l<3) and text fields (l>=3) are given a larger distance from each other.
		if ( ( lenA < 3 && lenB >= 3 ) || ( lenA >= 3 && lenB < 3 ) ) {
			distance += 20;
		}
	}
	return distance;
};




var dateExpandPatternGetBestMatchPattern = function( cldr, askedSkeleton ) {
	var availableFormats, decimalSeparator, pattern, ratedFormats, skeleton,
		path = "dates/calendars/gregorian/dateTimeFormats/availableFormats",

		// Using easier to read variables.
		augmentFormat = dateExpandPatternAugmentFormat,
		compareFormats = dateExpandPatternCompareFormats;

	pattern = cldr.main([ path, askedSkeleton ]);

	if ( askedSkeleton && !pattern ) {
		availableFormats = cldr.main([ path ]);
		ratedFormats = [];

		for ( skeleton in availableFormats ) {
			ratedFormats.push({
				skeleton: skeleton,
				pattern: availableFormats[ skeleton ],
				rate: compareFormats( askedSkeleton, skeleton )
			});
		}

		ratedFormats = ratedFormats
			.filter( function( format ) {
				return format.rate > -1;
			} )
			.sort( function( formatA, formatB ) {
				return formatA.rate - formatB.rate;
			});

		if ( ratedFormats.length ) {
			decimalSeparator = numberSymbol( "decimal", cldr );
			pattern = augmentFormat( askedSkeleton, ratedFormats[0].pattern, decimalSeparator );
		}
	}

	return pattern;
};




/**
 * expandPattern( options, cldr )
 *
 * @options [Object] if String, it's considered a skeleton. Object accepts:
 * - skeleton: [String] lookup availableFormat;
 * - date: [String] ( "full" | "long" | "medium" | "short" );
 * - time: [String] ( "full" | "long" | "medium" | "short" );
 * - datetime: [String] ( "full" | "long" | "medium" | "short" );
 * - raw: [String] For more info see datetime/format.js.
 *
 * @cldr [Cldr instance].
 *
 * Return the corresponding pattern.
 * Eg for "en":
 * - "GyMMMd" returns "MMM d, y G";
 * - { skeleton: "GyMMMd" } returns "MMM d, y G";
 * - { date: "full" } returns "EEEE, MMMM d, y";
 * - { time: "full" } returns "h:mm:ss a zzzz";
 * - { datetime: "full" } returns "EEEE, MMMM d, y 'at' h:mm:ss a zzzz";
 * - { raw: "dd/mm" } returns "dd/mm";
 */
var dateExpandPattern = function( options, cldr ) {
	var dateSkeleton, result, skeleton, timeSkeleton, type,

		// Using easier to read variables.
		getBestMatchPattern = dateExpandPatternGetBestMatchPattern;

	function combineDateTime( type, datePattern, timePattern ) {
		return formatMessage(
			cldr.main([
				"dates/calendars/gregorian/dateTimeFormats",
				type
			]),
			[ timePattern, datePattern ]
		);
	}

	switch ( true ) {
		case "skeleton" in options:
			skeleton = options.skeleton;

			// Preferred hour (j).
			skeleton = skeleton.replace( /j/g, function() {
				return cldr.supplemental.timeData.preferred();
			});

			validateSkeleton( skeleton );

			// Try direct map (note that getBestMatchPattern handles it).
			// ... or, try to "best match" the whole skeleton.
			result = getBestMatchPattern(
				cldr,
				skeleton
			);
			if ( result ) {
				break;
			}

			// ... or, try to "best match" the date and time parts individually.
			timeSkeleton = skeleton.split( /[^hHKkmsSAzZOvVXx]/ ).slice( -1 )[ 0 ];
			dateSkeleton = skeleton.split( /[^GyYuUrQqMLlwWdDFgEec]/ )[ 0 ];
			dateSkeleton = getBestMatchPattern(
				cldr,
				dateSkeleton
			);
			timeSkeleton = getBestMatchPattern(
				cldr,
				timeSkeleton
			);

			if ( /(MMMM|LLLL).*[Ec]/.test( dateSkeleton ) ) {
				type = "full";
			} else if ( /MMMM|LLLL/.test( dateSkeleton ) ) {
				type = "long";
			} else if ( /MMM|LLL/.test( dateSkeleton ) ) {
				type = "medium";
			} else {
				type = "short";
			}

			if ( dateSkeleton && timeSkeleton ) {
				result = combineDateTime( type, dateSkeleton, timeSkeleton );
			} else {
				result = dateSkeleton || timeSkeleton;
			}

			break;

		case "date" in options:
		case "time" in options:
			result = cldr.main([
				"dates/calendars/gregorian",
				"date" in options ? "dateFormats" : "timeFormats",
				( options.date || options.time )
			]);
			break;

		case "datetime" in options:
			result = combineDateTime( options.datetime,
				cldr.main([ "dates/calendars/gregorian/dateFormats", options.datetime ]),
				cldr.main([ "dates/calendars/gregorian/timeFormats", options.datetime ])
			);
			break;

		case "raw" in options:
			result = options.raw;
			break;

		default:
			throw createErrorInvalidParameterValue({
				name: "options",
				value: options
			});
	}

	return result;
};




var dateWeekDays = [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ];




/**
 * firstDayOfWeek
 */
var dateFirstDayOfWeek = function( cldr ) {
	return dateWeekDays.indexOf( cldr.supplemental.weekData.firstDay() );
};




/**
 * getTimeZoneName( length, type )
 */
var dateGetTimeZoneName = function( length, type, timeZone, cldr ) {
	var metaZone, result;

	if ( !timeZone ) {
		return;
	}

	result = cldr.main([
		"dates/timeZoneNames/zone",
		timeZone,
		length < 4 ? "short" : "long",
		type
	]);

	if ( result ) {
		return result;
	}

	// The latest metazone data of the metazone array.
	// TODO expand to support the historic metazones based on the given date.
	metaZone = cldr.supplemental([
		"metaZones/metazoneInfo/timezone", timeZone, 0,
		"usesMetazone/_mzone"
	]);

	return cldr.main([
		"dates/timeZoneNames/metazone",
		metaZone,
		length < 4 ? "short" : "long",
		type
	]);
};




/**
 * timezoneHourFormatShortH( hourFormat )
 *
 * @hourFormat [String]
 *
 * Unofficial deduction of the short hourFormat given time zone `hourFormat` element.
 * Official spec is pending resolution: http://unicode.org/cldr/trac/ticket/8293
 *
 * Example:
 * - "+HH.mm;-HH.mm" => "+H;-H"
 * - "+HH:mm;-HH:mm" => "+H;-H"
 * - "+HH:mm;−HH:mm" => "+H;−H" (Note MINUS SIGN \u2212)
 * - "+HHmm;-HHmm" => "+H:-H"
 */
var dateTimezoneHourFormatH = function( hourFormat ) {
	return hourFormat
		.split( ";" )
		.map(function( format ) {
			return format.slice( 0, format.indexOf( "H" ) + 1 );
		})
		.join( ";" );
};




/**
 * timezoneHourFormatLongHm( hourFormat )
 *
 * @hourFormat [String]
 *
 * Unofficial deduction of the short hourFormat given time zone `hourFormat` element.
 * Official spec is pending resolution: http://unicode.org/cldr/trac/ticket/8293
 *
 * Example (hFormat === "H"): (used for short Hm)
 * - "+HH.mm;-HH.mm" => "+H.mm;-H.mm"
 * - "+HH:mm;-HH:mm" => "+H:mm;-H:mm"
 * - "+HH:mm;−HH:mm" => "+H:mm;−H:mm" (Note MINUS SIGN \u2212)
 * - "+HHmm;-HHmm" => "+Hmm:-Hmm"
 *
 * Example (hFormat === "HH": (used for long Hm)
 * - "+HH.mm;-HH.mm" => "+HH.mm;-HH.mm"
 * - "+HH:mm;-HH:mm" => "+HH:mm;-HH:mm"
 * - "+H:mm;-H:mm"   => "+HH:mm;-HH:mm"
 * - "+HH:mm;−HH:mm" => "+HH:mm;−HH:mm" (Note MINUS SIGN \u2212)
 * - "+HHmm;-HHmm" => "+HHmm:-HHmm"
 */
var dateTimezoneHourFormatHm = function( hourFormat, hFormat ) {
	return hourFormat
		.split( ";" )
		.map(function( format ) {
			var parts = format.split( /H+/ );
			parts.splice( 1, 0, hFormat );
			return parts.join( "" );
		})
		.join( ";" );
};




var runtimeCacheDataBind = function( key, data ) {
	var fn = function() {
		return data;
	};
	fn.dataCacheKey = key;
	return fn;
};




/**
 * properties( pattern, cldr )
 *
 * @pattern [String] raw pattern.
 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
 *
 * @cldr [Cldr instance].
 *
 * Return the properties given the pattern and cldr.
 *
 * TODO Support other calendar types.
 */
var dateFormatProperties = function( pattern, cldr, timeZone ) {
	var properties = {
			numberFormatters: {},
			pattern: pattern,
			timeSeparator: numberSymbol( "timeSeparator", cldr )
		},
		widths = [ "abbreviated", "wide", "narrow" ];

	function setNumberFormatterPattern( pad ) {
		properties.numberFormatters[ pad ] = stringPad( "", pad );
	}

	if ( timeZone ) {
		properties.timeZoneData = runtimeCacheDataBind( "iana/" + timeZone, {
			offsets: cldr.get([ "globalize-iana/zoneData", timeZone, "offsets" ]),
			untils: cldr.get([ "globalize-iana/zoneData", timeZone, "untils" ]),
			isdsts: cldr.get([ "globalize-iana/zoneData", timeZone, "isdsts" ])
		});
	}

	pattern.replace( datePatternRe, function( current ) {
		var aux, chr, daylightTzName, formatNumber, genericTzName, length, standardTzName;

		chr = current.charAt( 0 );
		length = current.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			properties.preferredTime = chr = cldr.supplemental.timeData.preferred();
		}

		// ZZZZ: same as "OOOO".
		if ( chr === "Z" && length === 4 ) {
			chr = "O";
			length = 4;
		}

		// z...zzz: "{shortRegion}", eg. "PST" or "PDT".
		// zzzz: "{regionName} {Standard Time}" or "{regionName} {Daylight Time}",
		//       e.g., "Pacific Standard Time" or "Pacific Daylight Time".
		// http://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
		if ( chr === "z" ) {
			standardTzName = dateGetTimeZoneName( length, "standard", timeZone, cldr );
			daylightTzName = dateGetTimeZoneName( length, "daylight", timeZone, cldr );
			if ( standardTzName ) {
				properties.standardTzName = standardTzName;
			}
			if ( daylightTzName ) {
				properties.daylightTzName = daylightTzName;
			}

			// Fall through the "O" format in case one name is missing.
			if ( !standardTzName || !daylightTzName ) {
				chr = "O";
				if ( length < 4 ) {
					length = 1;
				}
			}
		}

		// v...vvv: "{shortRegion}", eg. "PT".
		// vvvv: "{regionName} {Time}" or "{regionName} {Time}",
		// e.g., "Pacific Time"
		// http://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
		if ( chr === "v" ) {
			genericTzName = dateGetTimeZoneName( length, "generic", timeZone, cldr );

			// Fall back to "V" format.
			if ( !genericTzName ) {
				chr = "V";
				length = 4;
			}
		}

		switch ( chr ) {

			// Era
			case "G":
				properties.eras = cldr.main([
					"dates/calendars/gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "y":

				// Plain year.
				formatNumber = true;
				break;

			case "Y":

				// Year in "Week of Year"
				properties.firstDay = dateFirstDayOfWeek( cldr );
				properties.minDays = cldr.supplemental.weekData.minDays();
				formatNumber = true;
				break;

			case "u": // Extended year. Need to be implemented.
			case "U": // Cyclic year name. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "year pattern `" + chr + "`"
				});

			// Quarter
			case "Q":
			case "q":
				if ( length > 2 ) {
					if ( !properties.quarters ) {
						properties.quarters = {};
					}
					if ( !properties.quarters[ chr ] ) {
						properties.quarters[ chr ] = {};
					}
					properties.quarters[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/quarters",
						chr === "Q" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				} else {
					formatNumber = true;
				}
				break;

			// Month
			case "M":
			case "L":
				if ( length > 2 ) {
					if ( !properties.months ) {
						properties.months = {};
					}
					if ( !properties.months[ chr ] ) {
						properties.months[ chr ] = {};
					}
					properties.months[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/months",
						chr === "M" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				} else {
					formatNumber = true;
				}
				break;

			// Week - Week of Year (w) or Week of Month (W).
			case "w":
			case "W":
				properties.firstDay = dateFirstDayOfWeek( cldr );
				properties.minDays = cldr.supplemental.weekData.minDays();
				formatNumber = true;
				break;

			// Day
			case "d":
			case "D":
			case "F":
				formatNumber = true;
				break;

			case "g":

				// Modified Julian day. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "Julian day pattern `g`"
				});

			// Week day
			case "e":
			case "c":
				if ( length <= 2 ) {
					properties.firstDay = dateFirstDayOfWeek( cldr );
					formatNumber = true;
					break;
				}

			/* falls through */
			case "E":
				if ( !properties.days ) {
					properties.days = {};
				}
				if ( !properties.days[ chr ] ) {
					properties.days[ chr ] = {};
				}
				if ( length === 6 ) {

					// If short day names are not explicitly specified, abbreviated day names are
					// used instead.
					// http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
					// http://unicode.org/cldr/trac/ticket/6790
					properties.days[ chr ][ length ] = cldr.main([
							"dates/calendars/gregorian/days",
							chr === "c" ? "stand-alone" : "format",
							"short"
						]) || cldr.main([
							"dates/calendars/gregorian/days",
							chr === "c" ? "stand-alone" : "format",
							"abbreviated"
						]);
				} else {
					properties.days[ chr ][ length ] = cldr.main([
						"dates/calendars/gregorian/days",
						chr === "c" ? "stand-alone" : "format",
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				properties.dayPeriods = {
					am: cldr.main(
						"dates/calendars/gregorian/dayPeriods/format/wide/am"
					),
					pm: cldr.main(
						"dates/calendars/gregorian/dayPeriods/format/wide/pm"
					)
				};
				break;

			// Hour
			case "h": // 1-12
			case "H": // 0-23
			case "K": // 0-11
			case "k": // 1-24

			// Minute
			case "m":

			// Second
			case "s":
			case "S":
			case "A":
				formatNumber = true;
				break;

			// Zone
			case "v":
				if ( length !== 1 && length !== 4 ) {
					throw createErrorUnsupportedFeature({
						feature: "timezone pattern `" + pattern + "`"
					});
				}
				properties.genericTzName = genericTzName;
				break;

			case "V":

				if ( length === 1 ) {
					throw createErrorUnsupportedFeature({
						feature: "timezone pattern `" + pattern + "`"
					});
				}

				if ( timeZone ) {
					if ( length === 2 ) {
						properties.timeZoneName = timeZone;
						break;
					}

					var timeZoneName,
						exemplarCity = cldr.main([
							"dates/timeZoneNames/zone", timeZone, "exemplarCity"
						]);

					if ( length === 3 ) {
						if ( !exemplarCity ) {
							exemplarCity = cldr.main([
								"dates/timeZoneNames/zone/Etc/Unknown/exemplarCity"
							]);
						}
						timeZoneName = exemplarCity;
					}

					if ( exemplarCity && length === 4 ) {
						timeZoneName = formatMessage(
							cldr.main(
								"dates/timeZoneNames/regionFormat"
							),
							[ exemplarCity ]
						);
					}

					if ( timeZoneName ) {
						properties.timeZoneName = timeZoneName;
						break;
					}
				}

				if ( current === "v" ) {
					length = 1;
				}

			/* falls through */
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				properties.gmtFormat = cldr.main( "dates/timeZoneNames/gmtFormat" );
				properties.gmtZeroFormat = cldr.main( "dates/timeZoneNames/gmtZeroFormat" );

				// Unofficial deduction of the hourFormat variations.
				// Official spec is pending resolution: http://unicode.org/cldr/trac/ticket/8293
				aux = cldr.main( "dates/timeZoneNames/hourFormat" );
				properties.hourFormat = length < 4 ?
					[ dateTimezoneHourFormatH( aux ), dateTimezoneHourFormatHm( aux, "H" ) ] :
					dateTimezoneHourFormatHm( aux, "HH" );

			/* falls through */
			case "Z":
			case "X":
			case "x":
				setNumberFormatterPattern( 1 );
				setNumberFormatterPattern( 2 );
				break;
		}

		if ( formatNumber ) {
			setNumberFormatterPattern( length );
		}
	});

	return properties;
};




var dateFormatterFn = function( dateToPartsFormatter ) {
	return function dateFormatter( value ) {
		return dateToPartsFormatter( value ).map( function( part ) {
			return part.value;
		}).join( "" );
	};
};




/**
 * parseProperties( cldr )
 *
 * @cldr [Cldr instance].
 *
 * @timeZone [String] FIXME.
 *
 * Return parser properties.
 */
var dateParseProperties = function( cldr, timeZone ) {
	var properties = {
		preferredTimeData: cldr.supplemental.timeData.preferred()
	};

	if ( timeZone ) {
		properties.timeZoneData = runtimeCacheDataBind( "iana/" + timeZone, {
			offsets: cldr.get([ "globalize-iana/zoneData", timeZone, "offsets" ]),
			untils: cldr.get([ "globalize-iana/zoneData", timeZone, "untils" ]),
			isdsts: cldr.get([ "globalize-iana/zoneData", timeZone, "isdsts" ])
		});
	}

	return properties;
};


var ZonedDateTime = (function() {
function definePrivateProperty(object, property, value) {
  Object.defineProperty(object, property, {
    value: value
  });
}

function getUntilsIndex(original, untils) {
  var index = 0;
  var originalTime = original.getTime();

  // TODO Should we do binary search for improved performance?
  while (index < untils.length - 1 && originalTime >= untils[index]) {
    index++;
  }
  return index;
}

function setWrap(fn) {
  var offset1 = this.getTimezoneOffset();
  var ret = fn();
  this.original.setTime(new Date(this.getTime()));
  var offset2 = this.getTimezoneOffset();
  if (offset2 - offset1) {
    this.original.setMinutes(this.original.getMinutes() + offset2 - offset1);
  }
  return ret;
}

var ZonedDateTime = function(date, timeZoneData) {
  definePrivateProperty(this, "original", new Date(date.getTime()));
  definePrivateProperty(this, "local", new Date(date.getTime()));
  definePrivateProperty(this, "timeZoneData", timeZoneData);
  definePrivateProperty(this, "setWrap", setWrap);
  if (!(timeZoneData.untils && timeZoneData.offsets && timeZoneData.isdsts)) {
    throw new Error("Invalid IANA data");
  }
  this.setTime(this.local.getTime() - this.getTimezoneOffset() * 60 * 1000);
};

ZonedDateTime.prototype.clone = function() {
  return new ZonedDateTime(this.original, this.timeZoneData);
};

// Date field getters.
["getFullYear", "getMonth", "getDate", "getDay", "getHours", "getMinutes",
"getSeconds", "getMilliseconds"].forEach(function(method) {
  // Corresponding UTC method, e.g., "getUTCFullYear" if method === "getFullYear".
  var utcMethod = "getUTC" + method.substr(3);
  ZonedDateTime.prototype[method] = function() {
    return this.local[utcMethod]();
  };
});

// Note: Define .valueOf = .getTime for arithmetic operations like date1 - date2.
ZonedDateTime.prototype.valueOf =
ZonedDateTime.prototype.getTime = function() {
  return this.local.getTime() + this.getTimezoneOffset() * 60 * 1000;
};

ZonedDateTime.prototype.getTimezoneOffset = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  return this.timeZoneData.offsets[index];
};

// Date field setters.
["setFullYear", "setMonth", "setDate", "setHours", "setMinutes", "setSeconds", "setMilliseconds"].forEach(function(method) {
  // Corresponding UTC method, e.g., "setUTCFullYear" if method === "setFullYear".
  var utcMethod = "setUTC" + method.substr(3);
  ZonedDateTime.prototype[method] = function(value) {
    var local = this.local;
    // Note setWrap is needed for seconds and milliseconds just because
    // abs(value) could be >= a minute.
    return this.setWrap(function() {
      return local[utcMethod](value);
    });
  };
});

ZonedDateTime.prototype.setTime = function(time) {
  return this.local.setTime(time);
};

ZonedDateTime.prototype.isDST = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  return Boolean(this.timeZoneData.isdsts[index]);
};

ZonedDateTime.prototype.inspect = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  var abbrs = this.timeZoneData.abbrs;
  return this.local.toISOString().replace(/Z$/, "") + " " +
    (abbrs && abbrs[index] + " " || (this.getTimezoneOffset() * -1) + " ") +
    (this.isDST() ? "(daylight savings)" : "");
};

ZonedDateTime.prototype.toDate = function() {
  return new Date(this.getTime());
};

// Type cast getters.
["toISOString", "toJSON", "toUTCString"].forEach(function(method) {
  ZonedDateTime.prototype[method] = function() {
    return this.toDate()[method]();
  };
});

return ZonedDateTime;
}());


/**
 * isLeapYear( year )
 *
 * @year [Number]
 *
 * Returns an indication whether the specified year is a leap year.
 */
var dateIsLeapYear = function( year ) {
	return new Date( year, 1, 29 ).getMonth() === 1;
};




/**
 * lastDayOfMonth( date )
 *
 * @date [Date]
 *
 * Return the last day of the given date's month
 */
var dateLastDayOfMonth = function( date ) {
	return new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();
};




/**
 * startOf changes the input to the beginning of the given unit.
 *
 * For example, starting at the start of a day, resets hours, minutes
 * seconds and milliseconds to 0. Starting at the month does the same, but
 * also sets the date to 1.
 *
 * Returns the modified date
 */
var dateStartOf = function( date, unit ) {
	date = date instanceof ZonedDateTime ? date.clone() : new Date( date.getTime() );
	switch ( unit ) {
		case "year":
			date.setMonth( 0 );
		/* falls through */
		case "month":
			date.setDate( 1 );
		/* falls through */
		case "day":
			date.setHours( 0 );
		/* falls through */
		case "hour":
			date.setMinutes( 0 );
		/* falls through */
		case "minute":
			date.setSeconds( 0 );
		/* falls through */
		case "second":
			date.setMilliseconds( 0 );
	}
	return date;
};




/**
 * Differently from native date.setDate(), this function returns a date whose
 * day remains inside the month boundaries. For example:
 *
 * setDate( FebDate, 31 ): a "Feb 28" date.
 * setDate( SepDate, 31 ): a "Sep 30" date.
 */
var dateSetDate = function( date, day ) {
	var lastDay = new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();

	date.setDate( day < 1 ? 1 : day < lastDay ? day : lastDay );
};




/**
 * Differently from native date.setMonth(), this function adjusts date if
 * needed, so final month is always the one set.
 *
 * setMonth( Jan31Date, 1 ): a "Feb 28" date.
 * setDate( Jan31Date, 8 ): a "Sep 30" date.
 */
var dateSetMonth = function( date, month ) {
	var originalDate = date.getDate();

	date.setDate( 1 );
	date.setMonth( month );
	dateSetDate( date, originalDate );
};




var outOfRange = function( value, low, high ) {
	return value < low || value > high;
};




/**
 * parse( value, tokens, properties )
 *
 * @value [String] string date.
 *
 * @tokens [Object] tokens returned by date/tokenizer.
 *
 * @properties [Object] output returned by date/tokenizer-properties.
 *
 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
 */
var dateParse = function( value, tokens, properties ) {
	var amPm, day, daysOfYear, month, era, hour, hour12, timezoneOffset, valid,
		YEAR = 0,
		MONTH = 1,
		DAY = 2,
		HOUR = 3,
		MINUTE = 4,
		SECOND = 5,
		MILLISECONDS = 6,
		date = new Date(),
		truncateAt = [],
		units = [ "year", "month", "day", "hour", "minute", "second", "milliseconds" ];

	// Create globalize date with given timezone data.
	if ( properties.timeZoneData ) {
		date = new ZonedDateTime( date, properties.timeZoneData() );
	}

	if ( !tokens.length ) {
		return null;
	}

	valid = tokens.every(function( token ) {
		var century, chr, value, length;

		if ( token.type === "literal" ) {

			// continue
			return true;
		}

		chr = token.type.charAt( 0 );
		length = token.type.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			chr = properties.preferredTimeData;
		}

		switch ( chr ) {

			// Era
			case "G":
				truncateAt.push( YEAR );
				era = +token.value;
				break;

			// Year
			case "y":
				value = token.value;
				if ( length === 2 ) {
					if ( outOfRange( value, 0, 99 ) ) {
						return false;
					}

					// mimic dojo/date/locale: choose century to apply, according to a sliding
					// window of 80 years before and 20 years after present year.
					century = Math.floor( date.getFullYear() / 100 ) * 100;
					value += century;
					if ( value > date.getFullYear() + 20 ) {
						value -= 100;
					}
				}
				date.setFullYear( value );
				truncateAt.push( YEAR );
				break;

			case "Y": // Year in "Week of Year"
				throw createErrorUnsupportedFeature({
					feature: "year pattern `" + chr + "`"
				});

			// Quarter (skip)
			case "Q":
			case "q":
				break;

			// Month
			case "M":
			case "L":
				if ( length <= 2 ) {
					value = token.value;
				} else {
					value = +token.value;
				}
				if ( outOfRange( value, 1, 12 ) ) {
					return false;
				}

				// Setting the month later so that we have the correct year and can determine
				// the correct last day of February in case of leap year.
				month = value;
				truncateAt.push( MONTH );
				break;

			// Week (skip)
			case "w": // Week of Year.
			case "W": // Week of Month.
				break;

			// Day
			case "d":
				day = token.value;
				truncateAt.push( DAY );
				break;

			case "D":
				daysOfYear = token.value;
				truncateAt.push( DAY );
				break;

			case "F":

				// Day of Week in month. eg. 2nd Wed in July.
				// Skip
				break;

			// Week day
			case "e":
			case "c":
			case "E":

				// Skip.
				// value = arrayIndexOf( dateWeekDays, token.value );
				break;

			// Period (AM or PM)
			case "a":
				amPm = token.value;
				break;

			// Hour
			case "h": // 1-12
				value = token.value;
				if ( outOfRange( value, 1, 12 ) ) {
					return false;
				}
				hour = hour12 = true;
				date.setHours( value === 12 ? 0 : value );
				truncateAt.push( HOUR );
				break;

			case "K": // 0-11
				value = token.value;
				if ( outOfRange( value, 0, 11 ) ) {
					return false;
				}
				hour = hour12 = true;
				date.setHours( value );
				truncateAt.push( HOUR );
				break;

			case "k": // 1-24
				value = token.value;
				if ( outOfRange( value, 1, 24 ) ) {
					return false;
				}
				hour = true;
				date.setHours( value === 24 ? 0 : value );
				truncateAt.push( HOUR );
				break;

			case "H": // 0-23
				value = token.value;
				if ( outOfRange( value, 0, 23 ) ) {
					return false;
				}
				hour = true;
				date.setHours( value );
				truncateAt.push( HOUR );
				break;

			// Minute
			case "m":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				date.setMinutes( value );
				truncateAt.push( MINUTE );
				break;

			// Second
			case "s":
				value = token.value;
				if ( outOfRange( value, 0, 59 ) ) {
					return false;
				}
				date.setSeconds( value );
				truncateAt.push( SECOND );
				break;

			case "A":
				date.setHours( 0 );
				date.setMinutes( 0 );
				date.setSeconds( 0 );

			/* falls through */
			case "S":
				value = Math.round( token.value * Math.pow( 10, 3 - length ) );
				date.setMilliseconds( value );
				truncateAt.push( MILLISECONDS );
				break;

			// Zone
			case "z":
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x":
				if ( typeof token.value === "number" ) {
					timezoneOffset = token.value;
				}
				break;
		}

		return true;
	});

	if ( !valid ) {
		return null;
	}

	// 12-hour format needs AM or PM, 24-hour format doesn't, ie. return null
	// if amPm && !hour12 || !amPm && hour12.
	if ( hour && !( !amPm ^ hour12 ) ) {
		return null;
	}

	if ( era === 0 ) {

		// 1 BC = year 0
		date.setFullYear( date.getFullYear() * -1 + 1 );
	}

	if ( month !== undefined ) {
		dateSetMonth( date, month - 1 );
	}

	if ( day !== undefined ) {
		if ( outOfRange( day, 1, dateLastDayOfMonth( date ) ) ) {
			return null;
		}
		date.setDate( day );
	} else if ( daysOfYear !== undefined ) {
		if ( outOfRange( daysOfYear, 1, dateIsLeapYear( date.getFullYear() ) ? 366 : 365 ) ) {
			return null;
		}
		date.setMonth( 0 );
		date.setDate( daysOfYear );
	}

	if ( hour12 && amPm === "pm" ) {
		date.setHours( date.getHours() + 12 );
	}

	if ( timezoneOffset !== undefined ) {
		date.setMinutes( date.getMinutes() + timezoneOffset - date.getTimezoneOffset() );
	}

	// Truncate date at the most precise unit defined. Eg.
	// If value is "12/31", and pattern is "MM/dd":
	// => new Date( <current Year>, 12, 31, 0, 0, 0, 0 );
	truncateAt = Math.max.apply( null, truncateAt );
	date = dateStartOf( date, units[ truncateAt ] );

	// Get date back from globalize date.
	if ( date instanceof ZonedDateTime ) {
		date = date.toDate();
	}

	return date;
};




/**
 * tokenizer( value, numberParser, properties )
 *
 * @value [String] string date.
 *
 * @numberParser [Function]
 *
 * @properties [Object] output returned by date/tokenizer-properties.
 *
 * Returns an Array of tokens, eg. value "5 o'clock PM", pattern "h 'o''clock' a":
 * [{
 *   type: "h",
 *   lexeme: "5"
 * }, {
 *   type: "literal",
 *   lexeme: " "
 * }, {
 *   type: "literal",
 *   lexeme: "o'clock"
 * }, {
 *   type: "literal",
 *   lexeme: " "
 * }, {
 *   type: "a",
 *   lexeme: "PM",
 *   value: "pm"
 * }]
 *
 * OBS: lexeme's are always String and may return invalid ranges depending of the token type.
 * Eg. "99" for month number.
 *
 * Return an empty Array when not successfully parsed.
 */
var dateTokenizer = function( value, numberParser, properties ) {
	var digitsRe, valid,
		tokens = [],
		widths = [ "abbreviated", "wide", "narrow" ];

	digitsRe = properties.digitsRe;
	value = looseMatching( value );

	valid = properties.pattern.match( datePatternRe ).every(function( current ) {
		var aux, chr, length, numeric, tokenRe,
			token = {};

		function hourFormatParse( tokenRe, numberParser ) {
			var aux, isPositive,
				match = value.match( tokenRe );
			numberParser = numberParser || function( value ) {
				return +value;
			};

			if ( !match ) {
				return false;
			}

			isPositive = match[ 1 ];

			// hourFormat containing H only, e.g., `+H;-H`
			if ( match.length < 6 ) {
				aux = isPositive ? 1 : 3;
				token.value = numberParser( match[ aux ] ) * 60;

			// hourFormat containing H and m, e.g., `+HHmm;-HHmm`
			} else if ( match.length < 10 ) {
				aux = isPositive ? [ 1, 3 ] : [ 5, 7 ];
				token.value = numberParser( match[ aux[ 0 ] ] ) * 60 +
					numberParser( match[ aux[ 1 ] ] );

			// hourFormat containing H, m, and s e.g., `+HHmmss;-HHmmss`
			} else {
				aux = isPositive ? [ 1, 3, 5 ] : [ 7, 9, 11 ];
				token.value = numberParser( match[ aux[ 0 ] ] ) * 60 +
					numberParser( match[ aux[ 1 ] ] ) +
					numberParser( match[ aux[ 2 ] ] ) / 60;
			}

			if ( isPositive ) {
				token.value *= -1;
			}

			return true;
		}

		function oneDigitIfLengthOne() {
			if ( length === 1 ) {

				// Unicode equivalent to /\d/
				numeric = true;
				return tokenRe = digitsRe;
			}
		}

		function oneOrTwoDigitsIfLengthOne() {
			if ( length === 1 ) {

				// Unicode equivalent to /\d\d?/
				numeric = true;
				return tokenRe = new RegExp( "^(" + digitsRe.source + "){1,2}" );
			}
		}

		function oneOrTwoDigitsIfLengthOneOrTwo() {
			if ( length === 1 || length === 2 ) {

				// Unicode equivalent to /\d\d?/
				numeric = true;
				return tokenRe = new RegExp( "^(" + digitsRe.source + "){1,2}" );
			}
		}

		function twoDigitsIfLengthTwo() {
			if ( length === 2 ) {

				// Unicode equivalent to /\d\d/
				numeric = true;
				return tokenRe = new RegExp( "^(" + digitsRe.source + "){2}" );
			}
		}

		// Brute-force test every locale entry in an attempt to match the given value.
		// Return the first found one (and set token accordingly), or null.
		function lookup( path ) {
			var array = properties[ path.join( "/" ) ];

			if ( !array ) {
				return null;
			}

			// array of pairs [key, value] sorted by desc value length.
			array.some(function( item ) {
				var valueRe = item[ 1 ];
				if ( valueRe.test( value ) ) {
					token.value = item[ 0 ];
					tokenRe = item[ 1 ];
					return true;
				}
			});
			return null;
		}

		token.type = current;
		chr = current.charAt( 0 );
		length = current.length;

		if ( chr === "Z" ) {

			// Z..ZZZ: same as "xxxx".
			if ( length < 4 ) {
				chr = "x";
				length = 4;

			// ZZZZ: same as "OOOO".
			} else if ( length < 5 ) {
				chr = "O";
				length = 4;

			// ZZZZZ: same as "XXXXX"
			} else {
				chr = "X";
				length = 5;
			}
		}

		if ( chr === "z" ) {
			if ( properties.standardOrDaylightTzName ) {
				token.value = null;
				tokenRe = properties.standardOrDaylightTzName;
			}
		}

		// v...vvv: "{shortRegion}", eg. "PT".
		// vvvv: "{regionName} {Time}" or "{regionName} {Time}",
		// e.g., "Pacific Time"
		// http://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
		if ( chr === "v" ) {
			if ( properties.genericTzName ) {
				token.value = null;
				tokenRe = properties.genericTzName;

			// Fall back to "V" format.
			} else {
				chr = "V";
				length = 4;
			}
		}

		if ( chr === "V" && properties.timeZoneName ) {
			token.value = length === 2 ? properties.timeZoneName : null;
			tokenRe = properties.timeZoneNameRe;
		}

		switch ( chr ) {

			// Era
			case "G":
				lookup([
					"gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "y":
			case "Y":
				numeric = true;

				// number l=1:+, l=2:{2}, l=3:{3,}, l=4:{4,}, ...
				if ( length === 1 ) {

					// Unicode equivalent to /\d+/.
					tokenRe = new RegExp( "^(" + digitsRe.source + ")+" );
				} else if ( length === 2 ) {

					// Lenient parsing: there's no year pattern to indicate non-zero-padded 2-digits
					// year, so parser accepts both zero-padded and non-zero-padded for `yy`.
					//
					// Unicode equivalent to /\d\d?/
					tokenRe = new RegExp( "^(" + digitsRe.source + "){1,2}" );
				} else {

					// Unicode equivalent to /\d{length,}/
					tokenRe = new RegExp( "^(" + digitsRe.source + "){" + length + ",}" );
				}
				break;

			// Quarter
			case "Q":
			case "q":

				// number l=1:{1}, l=2:{2}.
				// lookup l=3...
				oneDigitIfLengthOne() || twoDigitsIfLengthTwo() ||
					lookup([
						"gregorian/quarters",
						chr === "Q" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				break;

			// Month
			case "M":
			case "L":

				// number l=1:{1,2}, l=2:{2}.
				// lookup l=3...
				//
				// Lenient parsing: skeleton "yMd" (i.e., one M) may include MM for the pattern,
				// therefore parser accepts both zero-padded and non-zero-padded for M and MM.
				// Similar for L.
				oneOrTwoDigitsIfLengthOneOrTwo() || lookup([
					"gregorian/months",
					chr === "M" ? "format" : "stand-alone",
					widths[ length - 3 ]
				]);
				break;

			// Day
			case "D":

				// number {l,3}.
				if ( length <= 3 ) {

					// Equivalent to /\d{length,3}/
					numeric = true;
					tokenRe = new RegExp( "^(" + digitsRe.source + "){" + length + ",3}" );
				}
				break;

			case "W":
			case "F":

				// number l=1:{1}.
				oneDigitIfLengthOne();
				break;

			// Week day
			case "e":
			case "c":

				// number l=1:{1}, l=2:{2}.
				// lookup for length >=3.
				if ( length <= 2 ) {
					oneDigitIfLengthOne() || twoDigitsIfLengthTwo();
					break;
				}

			/* falls through */
			case "E":
				if ( length === 6 ) {

					// Note: if short day names are not explicitly specified, abbreviated day
					// names are used instead http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
					lookup([
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"short"
					]) || lookup([
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"abbreviated"
					]);
				} else {
					lookup([
						"gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				lookup([
					"gregorian/dayPeriods/format/wide"
				]);
				break;

			// Week
			case "w":

				// number l1:{1,2}, l2:{2}.
				oneOrTwoDigitsIfLengthOne() || twoDigitsIfLengthTwo();
				break;

			// Day, Hour, Minute, or Second
			case "d":
			case "h":
			case "H":
			case "K":
			case "k":
			case "j":
			case "m":
			case "s":

				// number l1:{1,2}, l2:{2}.
				//
				// Lenient parsing:
				// - skeleton "hms" (i.e., one m) always includes mm for the pattern, i.e., it's
				//   impossible to use a different skeleton to parse non-zero-padded minutes,
				//   therefore parser accepts both zero-padded and non-zero-padded for m. Similar
				//   for seconds s.
				// - skeleton "hms" (i.e., one h) may include h or hh for the pattern, i.e., it's
				//   impossible to use a different skeleton to parser non-zero-padded hours for some
				//   locales, therefore parser accepts both zero-padded and non-zero-padded for h.
				//   Similar for d (in skeleton yMd).
				oneOrTwoDigitsIfLengthOneOrTwo();
				break;

			case "S":

				// number {l}.

				// Unicode equivalent to /\d{length}/
				numeric = true;
				tokenRe = new RegExp( "^(" + digitsRe.source + "){" + length + "}" );
				break;

			case "A":

				// number {l+5}.

				// Unicode equivalent to /\d{length+5}/
				numeric = true;
				tokenRe = new RegExp( "^(" + digitsRe.source + "){" + ( length + 5 ) + "}" );
				break;

			// Zone
			case "v":
			case "V":
			case "z":
				if ( tokenRe && tokenRe.test( value ) ) {
					break;
				}
				if ( chr === "V" && length === 2 ) {
					break;
				}

			/* falls through */
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				if ( value === properties[ "timeZoneNames/gmtZeroFormat" ] ) {
					token.value = 0;
					tokenRe = properties[ "timeZoneNames/gmtZeroFormatRe" ];
				} else {
					aux = properties[ "timeZoneNames/hourFormat" ].some(function( hourFormatRe ) {
						if ( hourFormatParse( hourFormatRe, numberParser ) ) {
							tokenRe = hourFormatRe;
							return true;
						}
					});
					if ( !aux ) {
						return null;
					}
				}
				break;

			case "X":

				// Same as x*, except it uses "Z" for zero offset.
				if ( value === "Z" ) {
					token.value = 0;
					tokenRe = /^Z/;
					break;
				}

			/* falls through */
			case "x":

				// x: hourFormat("+HH[mm];-HH[mm]")
				// xx: hourFormat("+HHmm;-HHmm")
				// xxx: hourFormat("+HH:mm;-HH:mm")
				// xxxx: hourFormat("+HHmm[ss];-HHmm[ss]")
				// xxxxx: hourFormat("+HH:mm[:ss];-HH:mm[:ss]")
				aux = properties.x.some(function( hourFormatRe ) {
					if ( hourFormatParse( hourFormatRe ) ) {
						tokenRe = hourFormatRe;
						return true;
					}
				});
				if ( !aux ) {
					return null;
				}
				break;

			case "'":
				token.type = "literal";
				tokenRe = new RegExp( "^" + regexpEscape( removeLiteralQuotes( current ) ) );
				break;

			default:
				token.type = "literal";
				tokenRe = new RegExp( "^" + regexpEscape( current ) );
		}

		if ( !tokenRe ) {
			return false;
		}

		// Get lexeme and consume it.
		value = value.replace( tokenRe, function( lexeme ) {
			token.lexeme = lexeme;
			if ( numeric ) {
				token.value = numberParser( lexeme );
			}
			return "";
		});

		if ( !token.lexeme ) {
			return false;
		}

		if ( numeric && isNaN( token.value ) ) {
			return false;
		}

		tokens.push( token );
		return true;
	});

	if ( value !== "" ) {
		valid = false;
	}

	return valid ? tokens : [];
};




var dateParserFn = function( numberParser, parseProperties, tokenizerProperties ) {
	return function dateParser( value ) {
		var tokens;

		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		tokens = dateTokenizer( value, numberParser, tokenizerProperties );
		return dateParse( value, tokens, parseProperties ) || null;
	};
};




var objectFilter = function( object, testRe ) {
	var key,
		copy = {};

	for ( key in object ) {
		if ( testRe.test( key ) ) {
			copy[ key ] = object[ key ];
		}
	}

	return copy;
};




/**
 * tokenizerProperties( pattern, cldr )
 *
 * @pattern [String] raw pattern.
 *
 * @cldr [Cldr instance].
 *
 * Return Object with data that will be used by tokenizer.
 */
var dateTokenizerProperties = function( pattern, cldr, timeZone ) {
	var digitsReSource,
		properties = {
			pattern: looseMatching( pattern )
		},
		timeSeparator = numberSymbol( "timeSeparator", cldr ),
		widths = [ "abbreviated", "wide", "narrow" ];

	digitsReSource = numberNumberingSystemDigitsMap( cldr );
	digitsReSource = digitsReSource ? "[" + digitsReSource + "]" : "\\d";
	properties.digitsRe = new RegExp( digitsReSource );

	// Transform:
	// - "+H;-H" -> /\+(\d\d?)|-(\d\d?)/
	// - "+HH;-HH" -> /\+(\d\d)|-(\d\d)/
	// - "+HHmm;-HHmm" -> /\+(\d\d)(\d\d)|-(\d\d)(\d\d)/
	// - "+HH:mm;-HH:mm" -> /\+(\d\d):(\d\d)|-(\d\d):(\d\d)/
	//
	// If gmtFormat is GMT{0}, the regexp must fill {0} in each side, e.g.:
	// - "+H;-H" -> /GMT\+(\d\d?)|GMT-(\d\d?)/
	function hourFormatRe( hourFormat, gmtFormat, digitsReSource, timeSeparator ) {
		var re;

		if ( !digitsReSource ) {
			digitsReSource = "\\d";
		}
		if ( !gmtFormat ) {
			gmtFormat = "{0}";
		}

		re = hourFormat
			.replace( "+", "\\+" )

			// Unicode equivalent to (\\d\\d)
			.replace( /HH|mm|ss/g, "((" + digitsReSource + "){2})" )

			// Unicode equivalent to (\\d\\d?)
			.replace( /H|m/g, "((" + digitsReSource + "){1,2})" );

		if ( timeSeparator ) {
			re = re.replace( /:/g, timeSeparator );
		}

		re = re.split( ";" ).map(function( part ) {
			return gmtFormat.replace( "{0}", part );
		}).join( "|" );

		return new RegExp( "^" + re );
	}

	function populateProperties( path, value ) {

		// Skip
		var skipRe = /(timeZoneNames\/zone|supplemental\/metaZones|timeZoneNames\/metazone|timeZoneNames\/regionFormat|timeZoneNames\/gmtFormat)/;
		if ( skipRe.test( path ) ) {
			return;
		}

		if ( !value ) {
			return;
		}

		// The `dates` and `calendars` trim's purpose is to reduce properties' key size only.
		path = path.replace( /^.*\/dates\//, "" ).replace( /calendars\//, "" );

		// Specific filter for "gregorian/dayPeriods/format/wide".
		if ( path === "gregorian/dayPeriods/format/wide" ) {
			value = objectFilter( value, /^am|^pm/ );
		}

		// Transform object into array of pairs [key, /value/], sort by desc value length.
		if ( isPlainObject( value ) ) {
			value = Object.keys( value ).map(function( key ) {
				return [ key, new RegExp( "^" + regexpEscape( looseMatching( value[ key ] ) ) ) ];
			}).sort(function( a, b ) {
				return b[ 1 ].source.length - a[ 1 ].source.length;
			});

		// If typeof value === "string".
		} else {
			value = looseMatching( value );
		}
		properties[ path ] = value;
	}

	function regexpSourceSomeTerm( terms ) {
		return "(" + terms.filter(function( item ) {
			return item;
		}).reduce(function( memo, item ) {
			return memo + "|" + item;
		}) + ")";
	}

	cldr.on( "get", populateProperties );

	pattern.match( datePatternRe ).forEach(function( current ) {
		var aux, chr, daylightTzName, gmtFormat, length, standardTzName;

		chr = current.charAt( 0 );
		length = current.length;

		if ( chr === "Z" ) {
			if ( length < 5 ) {
				chr = "O";
				length = 4;
			} else {
				chr = "X";
				length = 5;
			}
		}

		// z...zzz: "{shortRegion}", eg. "PST" or "PDT".
		// zzzz: "{regionName} {Standard Time}" or "{regionName} {Daylight Time}",
		//       e.g., "Pacific Standard Time" or "Pacific Daylight Time".
		// http://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
		if ( chr === "z" ) {
			standardTzName = dateGetTimeZoneName( length, "standard", timeZone, cldr );
			daylightTzName = dateGetTimeZoneName( length, "daylight", timeZone, cldr );
			if ( standardTzName ) {
				standardTzName = regexpEscape( looseMatching( standardTzName ) );
			}
			if ( daylightTzName ) {
				daylightTzName = regexpEscape( looseMatching( daylightTzName ) );
			}
			if ( standardTzName || daylightTzName ) {
				properties.standardOrDaylightTzName = new RegExp(
					"^" + regexpSourceSomeTerm([ standardTzName, daylightTzName ])
				);
			}

			// Fall through the "O" format in case one name is missing.
			if ( !standardTzName || !daylightTzName ) {
				chr = "O";
				if ( length < 4 ) {
					length = 1;
				}
			}
		}

		// v...vvv: "{shortRegion}", eg. "PT".
		// vvvv: "{regionName} {Time}" or "{regionName} {Time}",
		// e.g., "Pacific Time"
		// http://unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
		if ( chr === "v" ) {
			if ( length !== 1 && length !== 4 ) {
				throw createErrorUnsupportedFeature({
					feature: "timezone pattern `" + pattern + "`"
				});
			}
			var genericTzName = dateGetTimeZoneName( length, "generic", timeZone, cldr );
			if ( genericTzName ) {
				properties.genericTzName = new RegExp(
					"^" + regexpEscape( looseMatching( genericTzName ) )
				);
				chr = "O";

			// Fall back to "V" format.
			} else {
				chr = "V";
				length = 4;
			}
		}

		switch ( chr ) {

			// Era
			case "G":
				cldr.main([
					"dates/calendars/gregorian/eras",
					length <= 3 ? "eraAbbr" : ( length === 4 ? "eraNames" : "eraNarrow" )
				]);
				break;

			// Year
			case "u": // Extended year. Need to be implemented.
			case "U": // Cyclic year name. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "year pattern `" + chr + "`"
				});

			// Quarter
			case "Q":
			case "q":
				if ( length > 2 ) {
					cldr.main([
						"dates/calendars/gregorian/quarters",
						chr === "Q" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				}
				break;

			// Month
			case "M":
			case "L":

				// number l=1:{1,2}, l=2:{2}.
				// lookup l=3...
				if ( length > 2 ) {
					cldr.main([
						"dates/calendars/gregorian/months",
						chr === "M" ? "format" : "stand-alone",
						widths[ length - 3 ]
					]);
				}
				break;

			// Day
			case "g":

				// Modified Julian day. Need to be implemented.
				throw createErrorUnsupportedFeature({
					feature: "Julian day pattern `g`"
				});

			// Week day
			case "e":
			case "c":

				// lookup for length >=3.
				if ( length <= 2 ) {
					break;
				}

			/* falls through */
			case "E":
				if ( length === 6 ) {

					// Note: if short day names are not explicitly specified, abbreviated day
					// names are used instead http://www.unicode.org/reports/tr35/tr35-dates.html#months_days_quarters_eras
					cldr.main([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"short"
					]) || cldr.main([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						"abbreviated"
					]);
				} else {
					cldr.main([
						"dates/calendars/gregorian/days",
						[ chr === "c" ? "stand-alone" : "format" ],
						widths[ length < 3 ? 0 : length - 3 ]
					]);
				}
				break;

			// Period (AM or PM)
			case "a":
				cldr.main(
					"dates/calendars/gregorian/dayPeriods/format/wide"
				);
				break;

			// Zone
			case "V":

				if ( length === 1 ) {
					throw createErrorUnsupportedFeature({
						feature: "timezone pattern `" + pattern + "`"
					});
				}

				if ( timeZone ) {
					if ( length === 2 ) {

						// Skip looseMatching processing since timeZone is a canonical posix value.
						properties.timeZoneName = timeZone;
						properties.timeZoneNameRe = new RegExp( "^" + regexpEscape( timeZone ) );
						break;
					}

					var timeZoneName,
						exemplarCity = cldr.main([
							"dates/timeZoneNames/zone", timeZone, "exemplarCity"
						]);

					if ( length === 3 ) {
						if ( !exemplarCity ) {
							exemplarCity = cldr.main([
								"dates/timeZoneNames/zone/Etc/Unknown/exemplarCity"
							]);
						}
						timeZoneName = exemplarCity;
					}

					if ( exemplarCity && length === 4 ) {
						timeZoneName = formatMessage(
							cldr.main(
								"dates/timeZoneNames/regionFormat"
							),
							[ exemplarCity ]
						);
					}

					if ( timeZoneName ) {
						timeZoneName = looseMatching( timeZoneName );
						properties.timeZoneName = timeZoneName;
						properties.timeZoneNameRe = new RegExp(
							"^" + regexpEscape( timeZoneName )
						);
					}
				}

				if ( current === "v" ) {
					length = 1;
				}

			/* falls through */
			case "z":
			case "O":
				gmtFormat = cldr.main( "dates/timeZoneNames/gmtFormat" );
				cldr.main( "dates/timeZoneNames/gmtZeroFormat" );
				cldr.main( "dates/timeZoneNames/hourFormat" );
				properties[ "timeZoneNames/gmtZeroFormatRe" ] =
					new RegExp( "^" + regexpEscape( properties[ "timeZoneNames/gmtZeroFormat" ] ) );
				aux = properties[ "timeZoneNames/hourFormat" ];
				properties[ "timeZoneNames/hourFormat" ] = (
					length < 4 ?
						[ dateTimezoneHourFormatHm( aux, "H" ), dateTimezoneHourFormatH( aux ) ] :
						[ dateTimezoneHourFormatHm( aux, "HH" ) ]
				).map(function( hourFormat ) {
					return hourFormatRe(
						hourFormat,
						gmtFormat,
						digitsReSource,
						timeSeparator
					);
				});

			/* falls through */
			case "X":
			case "x":

				// x: hourFormat("+HH[mm];-HH[mm]")
				// xx: hourFormat("+HHmm;-HHmm")
				// xxx: hourFormat("+HH:mm;-HH:mm")
				// xxxx: hourFormat("+HHmm[ss];-HHmm[ss]")
				// xxxxx: hourFormat("+HH:mm[:ss];-HH:mm[:ss]")
				properties.x = [
					[ "+HHmm;-HHmm", "+HH;-HH" ],
					[ "+HHmm;-HHmm" ],
					[ "+HH:mm;-HH:mm" ],
					[ "+HHmmss;-HHmmss", "+HHmm;-HHmm" ],
					[ "+HH:mm:ss;-HH:mm:ss", "+HH:mm;-HH:mm" ]
				][ length - 1 ].map(function( hourFormat ) {
					return hourFormatRe( hourFormat );
				});
		}
	});

	cldr.off( "get", populateProperties );

	return properties;
};




/**
 * dayOfWeek( date, firstDay )
 *
 * @date
 *
 * @firstDay the result of `dateFirstDayOfWeek( cldr )`
 *
 * Return the day of the week normalized by the territory's firstDay [0-6].
 * Eg for "mon":
 * - return 0 if territory is GB, or BR, or DE, or FR (week starts on "mon");
 * - return 1 if territory is US (week starts on "sun");
 * - return 2 if territory is EG (week starts on "sat");
 */
var dateDayOfWeek = function( date, firstDay ) {
	return ( date.getDay() - firstDay + 7 ) % 7;
};




/**
 * distanceInDays( from, to )
 *
 * Return the distance in days between from and to Dates.
 */
var dateDistanceInDays = function( from, to ) {
	var inDays = 864e5;
	return ( to.getTime() - from.getTime() ) / inDays;
};




/**
 * dayOfYear
 *
 * Return the distance in days of the date to the begin of the year [0-d].
 */
var dateDayOfYear = function( date ) {
	return Math.floor( dateDistanceInDays( dateStartOf( date, "year" ), date ) );
};




// Invert key and values, e.g., {"year": "yY"} ==> {"y": "year", "Y": "year"}
var dateFieldsMap = objectInvert({
	"era": "G",
	"year": "yY",
	"quarter": "qQ",
	"month": "ML",
	"week": "wW",
	"day": "dDF",
	"weekday": "ecE",
	"dayperiod": "a",
	"hour": "hHkK",
	"minute": "m",
	"second": "sSA",
	"zone": "zvVOxX"
}, function( object, key, value ) {
	value.split( "" ).forEach(function( symbol ) {
		object[ symbol ] = key;
	});
	return object;
});




/**
 * millisecondsInDay
 */
var dateMillisecondsInDay = function( date ) {

	// TODO Handle daylight savings discontinuities
	return date - dateStartOf( date, "day" );
};




/**
 * hourFormat( date, format, timeSeparator, formatNumber )
 *
 * Return date's timezone offset according to the format passed.
 * Eg for format when timezone offset is 180:
 * - "+H;-H": -3
 * - "+HHmm;-HHmm": -0300
 * - "+HH:mm;-HH:mm": -03:00
 * - "+HH:mm:ss;-HH:mm:ss": -03:00:00
 */
var dateTimezoneHourFormat = function( date, format, timeSeparator, formatNumber ) {
	var absOffset,
		offset = date.getTimezoneOffset();

	absOffset = Math.abs( offset );
	formatNumber = formatNumber || {
		1: function( value ) {
			return stringPad( value, 1 );
		},
		2: function( value ) {
			return stringPad( value, 2 );
		}
	};

	return format

		// Pick the correct sign side (+ or -).
		.split( ";" )[ offset > 0 ? 1 : 0 ]

		// Localize time separator
		.replace( ":", timeSeparator )

		// Update hours offset.
		.replace( /HH?/, function( match ) {
			return formatNumber[ match.length ]( Math.floor( absOffset / 60 ) );
		})

		// Update minutes offset and return.
		.replace( /mm/, function() {
			return formatNumber[ 2 ]( Math.floor( absOffset % 60 ) );
		})

		// Update minutes offset and return.
		.replace( /ss/, function() {
			return formatNumber[ 2 ]( Math.floor( absOffset % 1 * 60 ) );
		});
};




/**
 * format( date, properties )
 *
 * @date [Date instance].
 *
 * @properties
 *
 * TODO Support other calendar types.
 *
 * Disclosure: this function borrows excerpts of dojo/date/locale.
 */
var dateFormat = function( date, numberFormatters, properties ) {
	var parts = [];

	var timeSeparator = properties.timeSeparator;

	// create globalize date with given timezone data
	if ( properties.timeZoneData ) {
		date = new ZonedDateTime( date, properties.timeZoneData() );
	}

	properties.pattern.replace( datePatternRe, function( current ) {
		var aux, dateField, type, value,
			chr = current.charAt( 0 ),
			length = current.length;

		if ( chr === "j" ) {

			// Locale preferred hHKk.
			// http://www.unicode.org/reports/tr35/tr35-dates.html#Time_Data
			chr = properties.preferredTime;
		}

		if ( chr === "Z" ) {

			// Z..ZZZ: same as "xxxx".
			if ( length < 4 ) {
				chr = "x";
				length = 4;

			// ZZZZ: same as "OOOO".
			} else if ( length < 5 ) {
				chr = "O";
				length = 4;

			// ZZZZZ: same as "XXXXX"
			} else {
				chr = "X";
				length = 5;
			}
		}

		// z...zzz: "{shortRegion}", e.g., "PST" or "PDT".
		// zzzz: "{regionName} {Standard Time}" or "{regionName} {Daylight Time}",
		//       e.g., "Pacific Standard Time" or "Pacific Daylight Time".
		if ( chr === "z" ) {
			if ( date.isDST ) {
				value = date.isDST() ? properties.daylightTzName : properties.standardTzName;
			}

			// Fall back to "O" format.
			if ( !value ) {
				chr = "O";
				if ( length < 4 ) {
					length = 1;
				}
			}
		}

		switch ( chr ) {

			// Era
			case "G":
				value = properties.eras[ date.getFullYear() < 0 ? 0 : 1 ];
				break;

			// Year
			case "y":

				// Plain year.
				// The length specifies the padding, but for two letters it also specifies the
				// maximum length.
				value = date.getFullYear();
				if ( length === 2 ) {
					value = String( value );
					value = +value.substr( value.length - 2 );
				}
				break;

			case "Y":

				// Year in "Week of Year"
				// The length specifies the padding, but for two letters it also specifies the
				// maximum length.
				// yearInWeekofYear = date + DaysInAWeek - (dayOfWeek - firstDay) - minDays
				value = new Date( date.getTime() );
				value.setDate(
					value.getDate() + 7 -
					dateDayOfWeek( date, properties.firstDay ) -
					properties.firstDay -
					properties.minDays
				);
				value = value.getFullYear();
				if ( length === 2 ) {
					value = String( value );
					value = +value.substr( value.length - 2 );
				}
				break;

			// Quarter
			case "Q":
			case "q":
				value = Math.ceil( ( date.getMonth() + 1 ) / 3 );
				if ( length > 2 ) {
					value = properties.quarters[ chr ][ length ][ value ];
				}
				break;

			// Month
			case "M":
			case "L":
				value = date.getMonth() + 1;
				if ( length > 2 ) {
					value = properties.months[ chr ][ length ][ value ];
				}
				break;

			// Week
			case "w":

				// Week of Year.
				// woy = ceil( ( doy + dow of 1/1 ) / 7 ) - minDaysStuff ? 1 : 0.
				// TODO should pad on ww? Not documented, but I guess so.
				value = dateDayOfWeek( dateStartOf( date, "year" ), properties.firstDay );
				value = Math.ceil( ( dateDayOfYear( date ) + value ) / 7 ) -
					( 7 - value >= properties.minDays ? 0 : 1 );
				break;

			case "W":

				// Week of Month.
				// wom = ceil( ( dom + dow of `1/month` ) / 7 ) - minDaysStuff ? 1 : 0.
				value = dateDayOfWeek( dateStartOf( date, "month" ), properties.firstDay );
				value = Math.ceil( ( date.getDate() + value ) / 7 ) -
					( 7 - value >= properties.minDays ? 0 : 1 );
				break;

			// Day
			case "d":
				value = date.getDate();
				break;

			case "D":
				value = dateDayOfYear( date ) + 1;
				break;

			case "F":

				// Day of Week in month. eg. 2nd Wed in July.
				value = Math.floor( date.getDate() / 7 ) + 1;
				break;

			// Week day
			case "e":
			case "c":
				if ( length <= 2 ) {

					// Range is [1-7] (deduced by example provided on documentation)
					// TODO Should pad with zeros (not specified in the docs)?
					value = dateDayOfWeek( date, properties.firstDay ) + 1;
					break;
				}

			/* falls through */
			case "E":
				value = dateWeekDays[ date.getDay() ];
				value = properties.days[ chr ][ length ][ value ];
				break;

			// Period (AM or PM)
			case "a":
				value = properties.dayPeriods[ date.getHours() < 12 ? "am" : "pm" ];
				break;

			// Hour
			case "h": // 1-12
				value = ( date.getHours() % 12 ) || 12;
				break;

			case "H": // 0-23
				value = date.getHours();
				break;

			case "K": // 0-11
				value = date.getHours() % 12;
				break;

			case "k": // 1-24
				value = date.getHours() || 24;
				break;

			// Minute
			case "m":
				value = date.getMinutes();
				break;

			// Second
			case "s":
				value = date.getSeconds();
				break;

			case "S":
				value = Math.round( date.getMilliseconds() * Math.pow( 10, length - 3 ) );
				break;

			case "A":
				value = Math.round( dateMillisecondsInDay( date ) * Math.pow( 10, length - 3 ) );
				break;

			// Zone
			case "z":
				break;

			case "v":

				// v...vvv: "{shortRegion}", eg. "PT".
				// vvvv: "{regionName} {Time}",
				//       e.g., "Pacific Time".
				if ( properties.genericTzName ) {
					value = properties.genericTzName;
					break;
				}

			/* falls through */
			case "V":

				//VVVV: "{explarCity} {Time}", e.g., "Los Angeles Time"
				if ( properties.timeZoneName ) {
					value = properties.timeZoneName;
					break;
				}

				if ( current === "v" ) {
					length = 1;
				}

			/* falls through */
			case "O":

				// O: "{gmtFormat}+H;{gmtFormat}-H" or "{gmtZeroFormat}", eg. "GMT-8" or "GMT".
				// OOOO: "{gmtFormat}{hourFormat}" or "{gmtZeroFormat}", eg. "GMT-08:00" or "GMT".
				if ( date.getTimezoneOffset() === 0 ) {
					value = properties.gmtZeroFormat;
				} else {

					// If O..OOO and timezone offset has non-zero minutes, show minutes.
					if ( length < 4 ) {
						aux = date.getTimezoneOffset();
						aux = properties.hourFormat[ aux % 60 - aux % 1 === 0 ? 0 : 1 ];
					} else {
						aux = properties.hourFormat;
					}

					value = dateTimezoneHourFormat(
						date,
						aux,
						timeSeparator,
						numberFormatters
					);
					value = properties.gmtFormat.replace( /\{0\}/, value );
				}
				break;

			case "X":

				// Same as x*, except it uses "Z" for zero offset.
				if ( date.getTimezoneOffset() === 0 ) {
					value = "Z";
					break;
				}

			/* falls through */
			case "x":

				// x: hourFormat("+HH[mm];-HH[mm]")
				// xx: hourFormat("+HHmm;-HHmm")
				// xxx: hourFormat("+HH:mm;-HH:mm")
				// xxxx: hourFormat("+HHmm[ss];-HHmm[ss]")
				// xxxxx: hourFormat("+HH:mm[:ss];-HH:mm[:ss]")
				aux = date.getTimezoneOffset();

				// If x and timezone offset has non-zero minutes, use xx (i.e., show minutes).
				if ( length === 1 && aux % 60 - aux % 1 !== 0 ) {
					length += 1;
				}

				// If (xxxx or xxxxx) and timezone offset has zero seconds, use xx or xxx
				// respectively (i.e., don't show optional seconds).
				if ( ( length === 4 || length === 5 ) && aux % 1 === 0 ) {
					length -= 2;
				}

				value = [
					"+HH;-HH",
					"+HHmm;-HHmm",
					"+HH:mm;-HH:mm",
					"+HHmmss;-HHmmss",
					"+HH:mm:ss;-HH:mm:ss"
				][ length - 1 ];

				value = dateTimezoneHourFormat( date, value, ":" );
				break;

			// timeSeparator
			case ":":
				value = timeSeparator;
				break;

			// ' literals.
			case "'":
				value = removeLiteralQuotes( current );
				break;

			// Anything else is considered a literal, including [ ,:/.@#], chinese, japonese, and
			// arabic characters.
			default:
				value = current;

		}
		if ( typeof value === "number" ) {
			value = numberFormatters[ length ]( value );
		}

		dateField = dateFieldsMap[ chr ];
		type = dateField ? dateField : "literal";

		// Concat two consecutive literals
		if ( type === "literal" && parts.length && parts[ parts.length - 1 ].type === "literal" ) {
			parts[ parts.length - 1 ].value += value;
			return;
		}

		parts.push( { type: type, value: value } );

	});

	return parts;

};




var dateToPartsFormatterFn = function( numberFormatters, properties ) {
	return function dateToPartsFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeDate( value, "value" );

		return dateFormat( value, numberFormatters, properties );
	};

};




function optionsHasStyle( options ) {
	return options.skeleton !== undefined ||
		options.date !== undefined ||
		options.time !== undefined ||
		options.datetime !== undefined ||
		options.raw !== undefined;
}

function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [
			/dates\/calendars\/gregorian\/dateTimeFormats\/availableFormats/,
			/dates\/calendars\/gregorian\/days\/.*\/short/,
			/dates\/timeZoneNames\/zone/,
			/dates\/timeZoneNames\/metazone/,
			/globalize-iana/,
			/supplemental\/metaZones/,
			/supplemental\/timeData\/(?!001)/,
			/supplemental\/weekData\/(?!001)/
		]
	});
}

function validateOptionsPreset( options ) {
	validateOptionsPresetEach( "date", options );
	validateOptionsPresetEach( "time", options );
	validateOptionsPresetEach( "datetime", options );
}

function validateOptionsPresetEach( type, options ) {
	var value = options[ type ];
	validate(
		"E_INVALID_OPTIONS",
		"Invalid `{{type}: \"{value}\"}`.",
		value === undefined || [ "short", "medium", "long", "full" ].indexOf( value ) !== -1,
		{ type: type, value: value }
	);
}

function validateOptionsSkeleton( pattern, skeleton ) {
	validate(
		"E_INVALID_OPTIONS",
		"Invalid `{skeleton: \"{value}\"}` based on provided CLDR.",
		skeleton === undefined || ( typeof pattern === "string" && pattern ),
		{ type: "skeleton", value: skeleton }
	);
}

function validateRequiredIana( timeZone ) {
	return function( path, value ) {

		if ( !/globalize-iana/.test( path ) ) {
			return;
		}

		validate(
			"E_MISSING_IANA_TZ",
			"Missing required IANA timezone content for `{timeZone}`: `{path}`.",
			value,
			{
				path: path.replace( /globalize-iana\//, "" ),
				timeZone: timeZone
			}
		);
	};
}

/**
 * .loadTimeZone( json )
 *
 * @json [JSON]
 *
 * Load IANA timezone data.
 */
Globalize.loadTimeZone = function( json ) {
	var customData = {
			"globalize-iana": json
		};

	validateParameterPresence( json, "json" );
	validateParameterTypePlainObject( json, "json" );

	Cldr.load( customData );
};

/**
 * .dateFormatter( options )
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a date formatter function (of the form below) according to the given options and the
 * default/instance locale.
 *
 * fn( value )
 *
 * @value [Date]
 *
 * Return a function that formats a date according to the given `format` and the default/instance
 * locale.
 */
Globalize.dateFormatter =
Globalize.prototype.dateFormatter = function( options ) {
	var args, dateToPartsFormatter, returnFn;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}
	args = [ options ];

	dateToPartsFormatter = this.dateToPartsFormatter( options );
	returnFn = dateFormatterFn( dateToPartsFormatter );
	runtimeBind( args, this.cldr, returnFn, [ dateToPartsFormatter ] );

	return returnFn;
};

/**
 * .dateToPartsFormatter( options )
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a date formatter function (of the form below) according to the given options and the
 * default/instance locale.
 *
 * fn( value )
 *
 * @value [Date]
 *
 * Return a function that formats a date to parts according to the given `format`
 * and the default/instance
 * locale.
 */
Globalize.dateToPartsFormatter =
Globalize.prototype.dateToPartsFormatter = function( options ) {
	var args, cldr, numberFormatters, pad, pattern, properties, returnFn,
		timeZone, ianaListener;

	validateParameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}

	validateOptionsPreset( options );
	validateDefaultLocale( cldr );

	timeZone = options.timeZone;
	validateParameterTypeString( timeZone, "options.timeZone" );

	args = [ options ];

	cldr.on( "get", validateRequiredCldr );
	if ( timeZone ) {
		ianaListener = validateRequiredIana( timeZone );
		cldr.on( "get", ianaListener );
	}
	pattern = dateExpandPattern( options, cldr );
	validateOptionsSkeleton( pattern, options.skeleton );
	properties = dateFormatProperties( pattern, cldr, timeZone );
	cldr.off( "get", validateRequiredCldr );
	if ( ianaListener ) {
		cldr.off( "get", ianaListener );
	}

	// Create needed number formatters.
	numberFormatters = properties.numberFormatters;
	delete properties.numberFormatters;
	for ( pad in numberFormatters ) {
		numberFormatters[ pad ] = this.numberFormatter({
			raw: numberFormatters[ pad ]
		});
	}

	returnFn = dateToPartsFormatterFn( numberFormatters, properties );

	runtimeBind( args, cldr, returnFn, [ numberFormatters, properties ] );

	return returnFn;
};

/**
 * .dateParser( options )
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a function that parses a string date according to the given `formats` and the
 * default/instance locale.
 */
Globalize.dateParser =
Globalize.prototype.dateParser = function( options ) {
	var args, cldr, numberParser, parseProperties, pattern, returnFn, timeZone,
		tokenizerProperties;

	validateParameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}

	validateOptionsPreset( options );
	validateDefaultLocale( cldr );

	timeZone = options.timeZone;
	validateParameterTypeString( timeZone, "options.timeZone" );

	args = [ options ];

	cldr.on( "get", validateRequiredCldr );
	if ( timeZone ) {
		cldr.on( "get", validateRequiredIana( timeZone ) );
	}
	pattern = dateExpandPattern( options, cldr );
	validateOptionsSkeleton( pattern, options.skeleton );
	tokenizerProperties = dateTokenizerProperties( pattern, cldr, timeZone );
	parseProperties = dateParseProperties( cldr, timeZone );
	cldr.off( "get", validateRequiredCldr );
	if ( timeZone ) {
		cldr.off( "get", validateRequiredIana( timeZone ) );
	}

	numberParser = this.numberParser({ raw: "0" });

	returnFn = dateParserFn( numberParser, parseProperties, tokenizerProperties );

	runtimeBind( args, cldr, returnFn, [ numberParser, parseProperties, tokenizerProperties ] );

	return returnFn;
};

/**
 * .formatDate( value, options )
 *
 * @value [Date]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Formats a date or number according to the given options string and the default/instance locale.
 */
Globalize.formatDate =
Globalize.prototype.formatDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateFormatter( options )( value );
};

/**
 * .formatDateToParts( value, options )
 *
 * @value [Date]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Formats a date or number to parts according to the given options and the default/instance locale.
 */
Globalize.formatDateToParts =
Globalize.prototype.formatDateToParts = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateToPartsFormatter( options )( value );
};

/**
 * .parseDate( value, options )
 *
 * @value [String]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.dateParser( options )( value );
};

return Globalize;




}));
