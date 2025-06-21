// Low-Level
const expectedInteger = (entityName, num) => `Non-integer ${entityName}: ${num}`;
const expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`;
const expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`;
const forbiddenBigIntToNumber = (entityName) => `Cannot convert bigint to ${entityName}`;
const invalidBigInt = (arg) => `Invalid bigint: ${arg}`;
const forbiddenSymbolToString = 'Cannot convert Symbol to string';
const forbiddenNullish = 'Cannot be null or undefined';
const expectedStringOrUndefined = 'Expected string or undefined';
const expectedIntegerOrUndefined = 'Expected integer or undefined';
const invalidObject = 'Invalid object';
const numberOutOfRange = (entityName, val, min, max) => `${entityName} ${val} must be between ${min}-${max}`;
// Entity/Fields/Bags
const invalidEntity = (fieldName, val) => `Invalid ${fieldName}: ${val}`;
const missingField = (fieldName) => `Missing ${fieldName}`;
const forbiddenField = (fieldName) => `Invalid field ${fieldName}`;
const duplicateFields = (fieldName) => `Duplicate field ${fieldName}`;
const noValidFields = 'No valid fields';
const invalidBag = 'Invalid bag';
// Class-related
const forbiddenValueOf = 'Cannot use valueOf';
const invalidCallingContext = 'Invalid calling context';
// Calendar Fields/Parts
const forbiddenEraParts = 'Forbidden era/eraYear';
const mismatchingEraParts = 'Mismatching era/eraYear';
const mismatchingYearAndEra = 'Mismatching year/eraYear';
const invalidEra = (era) => `Invalid era: ${era}`;
const missingYear = (allowEra) => `Missing year${allowEra ? '/era/eraYear' : ''}`;
const invalidMonthCode = (monthCode) => `Invalid monthCode: ${monthCode}`;
const mismatchingMonthAndCode = 'Mismatching month/monthCode';
const missingMonth = 'Missing month/monthCode';
const failedYearGuess = 'Cannot guess year';
const invalidLeapMonth = 'Invalid leap month';
// Calendar/TimeZone-PROTOCOL (very vague, I know, but rare)
const invalidProtocol = 'Invalid protocol';
const invalidProtocolResults = 'Invalid protocol results';
// Calendar/TimeZone
const invalidCalendar = (calendarId) => `Invalid Calendar: ${calendarId}`;
const mismatchingCalendars = 'Mismatching Calendars';
const mismatchingTimeZones = 'Mismatching TimeZones';
// TimeZone Offset
const outOfBoundsOffset = 'Out-of-bounds offset';
const invalidOffsetForTimeZone = 'Invalid offset for TimeZone';
const ambigOffset = 'Ambiguous offset';
// Date/Duration Math
const outOfBoundsDate = 'Out-of-bounds date';
const forbiddenDurationSigns = 'Cannot mix duration signs';
const missingRelativeTo = 'Missing relativeTo';
const invalidLargeUnits = 'Cannot use large units'; // for Instant math
// Options Refining
const missingSmallestLargestUnit = 'Required smallestUnit or largestUnit';
const flippedSmallestLargestUnit = 'smallestUnit > largestUnit';
// Parsing
const failedParse = (s) => `Cannot parse: ${s}`;
const invalidSubstring = (substring) => `Invalid substring: ${substring}`;
// Formatting
const invalidFormatType = (branding) => `Cannot format ${branding}`;
const mismatchingFormatTypes = 'Mismatching types for formatting';
const forbiddenFormatTimeZone = 'Forbidden timeZone';

// Validation
// -----------------------------------------------------------------------------
function clampEntity(entityName, num, min, max, overflow) {
    const clamped = clampNumber(num, min, max);
    if (overflow && num !== clamped) {
        throw new RangeError(numberOutOfRange(entityName, num, min, max));
    }
    return clamped;
}
function clampProp(props, propName, min, max, overflow) {
    return clampEntity(propName, getDefinedProp(props, propName), min, max, overflow);
}
function getDefinedProp(props, propName) {
    const propVal = props[propName];
    if (propVal === undefined) {
        throw new TypeError(missingField(propName));
    }
    return propVal;
}
function isObjectLike(arg) {
    return arg !== null && /object|function/.test(typeof arg);
}
// Cache
// -----------------------------------------------------------------------------
// interface MapInterface<K, V> {
//   has(key: K): boolean
//   get(key: K): V,
//   set(key: K, val: V): void
// }
function createLazyGenerator(generator, MapClass = Map) {
    const map = new MapClass();
    return (key, ...otherArgs) => {
        if (map.has(key)) {
            return map.get(key);
        }
        const val = generator(key, ...otherArgs);
        map.set(key, val);
        return val;
    };
}
// Descriptor
// -----------------------------------------------------------------------------
function createNameDescriptors(name) {
    return createPropDescriptors({ name }, true);
}
function createPropDescriptors(propVals, readonly) {
    return mapProps((value) => ({
        value,
        configurable: true,
        writable: !readonly,
    }), propVals);
}
function createGetterDescriptors(getters) {
    return mapProps((getter) => ({
        get: getter,
        configurable: true,
    }), getters);
}
function createStringTagDescriptors(value) {
    return {
        [Symbol.toStringTag]: {
            value,
            configurable: true,
        },
    };
}
function zipProps(propNamesRev, args) {
    const res = {};
    let i = propNamesRev.length;
    for (const arg of args) {
        res[propNamesRev[--i]] = arg;
    }
    return res;
}
/*
TODO: abandon this? See mapPropNames note.
*/
function mapProps(transformer, props, extraArg) {
    const res = {};
    for (const propName in props) {
        res[propName] = transformer(props[propName], propName, extraArg);
    }
    return res;
}
/*
TODO: audit uses of this contributing to HIGHER bundle size. Just inline? Often more readable.
See createAdapterCompoundOps/createAdapterOps. Bigger after using mapPropNames.
*/
function mapPropNames(generator, propNames, extraArg) {
    const props = {};
    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        props[propName] = generator(propName, i, extraArg);
    }
    return props;
}
const mapPropNamesToIndex = bindArgs(mapPropNames, (_propVal, i) => i);
const mapPropNamesToConstant = bindArgs(mapPropNames, (_propVal, _i, constant) => constant);
function remapProps(oldNames, newNames, oldProps) {
    const newProps = {};
    for (let i = 0; i < oldNames.length; i++) {
        newProps[newNames[i]] = oldProps[oldNames[i]];
    }
    return newProps;
}
function pluckProps(propNames, props) {
    const res = {};
    for (const propName of propNames) {
        res[propName] = props[propName];
    }
    return res;
}
function excludePropsByName(propNames, props) {
    const filteredProps = {};
    for (const propName in props) {
        if (!propNames.has(propName)) {
            filteredProps[propName] = props[propName];
        }
    }
    return filteredProps;
}
function excludeUndefinedProps(props) {
    props = { ...props };
    const propNames = Object.keys(props);
    for (const propName of propNames) {
        if (props[propName] === undefined) {
            delete props[propName];
        }
    }
    return props;
}
function hasAnyPropsByName(props, names) {
    for (const name of names) {
        if (name in props) {
            return true;
        }
    }
    return false;
}
function hasAllPropsByName(props, names) {
    for (const name of names) {
        if (!(name in props)) {
            return false;
        }
    }
    return true;
}
function allPropsEqual(propNames, props0, props1) {
    for (const propName of propNames) {
        if (props0[propName] !== props1[propName]) {
            return false;
        }
    }
    return true;
}
// Function
// -----------------------------------------------------------------------------
function bindArgs(f, ...boundArgs) {
    return (...dynamicArgs) => {
        return f(...boundArgs, ...dynamicArgs);
    };
}
function identity(arg) {
    return arg;
}
function noop() { }
// String / Formatting
// -----------------------------------------------------------------------------
function capitalize(s) {
    return s[0].toUpperCase() + s.substring(1);
}
/*
Easier to mark pure than calling .slice().sort() directly, which has 2 calls
*/
function sortStrings(strs) {
    return strs.slice().sort();
}
function padNumber(digits, num) {
    return String(num).padStart(digits, '0');
}
const padNumber2 = bindArgs(padNumber, 2);
/*
-1 if a comes before b
 0 if equal
 1 if a comes after b
*/
function compareNumbers(a, b) {
    return Math.sign(a - b);
}
/*
min/max are inclusive
*/
function clampNumber(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function divModFloor(num, divisor) {
    const quotient = Math.floor(num / divisor);
    const remainder = modFloor(num, divisor);
    return [quotient, remainder];
}
function modFloor(num, divisor) {
    return ((num % divisor) + divisor) % divisor;
}
function divModTrunc(num, divisor) {
    return [divTrunc(num, divisor), modTrunc(num, divisor)];
}
/*
FIX-FOR: using Math.trunc often results in -0
Only useful for Numbers. BigInts don't have this problem
NOTE: anywhere else Math.trunc is directly used, do ||0
*/
function divTrunc(num, divisor) {
    return Math.trunc(num / divisor) || 0;
}
/*
FIX-FOR: using % often results in -0
Only useful for Numbers. BigInts don't have this problem
NOTE: anywhere else % is directly used, do ||0
*/
function modTrunc(num, divisor) {
    return num % divisor || 0;
}
function roundExpand(num) {
    return num < 0 ? Math.floor(num) : Math.ceil(num);
}
/*
Similar to Math.round, but rounds negative half-numbers to floor (-1.5 => -2)
*/
function roundHalfExpand(num) {
    return Math.sign(num) * Math.round(Math.abs(num)) || 0; // prevent -0
}
function roundHalfFloor(num) {
    return hasHalf(num) ? Math.floor(num) : Math.round(num);
}
function roundHalfCeil(num) {
    return hasHalf(num) ? Math.ceil(num) : Math.round(num);
}
function roundHalfTrunc(num) {
    return hasHalf(num) ? Math.trunc(num) || 0 : Math.round(num);
}
function roundHalfEven(num) {
    return hasHalf(num)
        ? (num = Math.trunc(num) || 0) + (num % 2)
        : Math.round(num);
}
function hasHalf(num) {
    return Math.abs(num % 1) === 0.5;
}

// -----------------------------------------------------------------------------
const unitNameMap = {
    nanosecond: 0 /* Unit.Nanosecond */,
    microsecond: 1 /* Unit.Microsecond */,
    millisecond: 2 /* Unit.Millisecond */,
    second: 3 /* Unit.Second */,
    minute: 4 /* Unit.Minute */,
    hour: 5 /* Unit.Hour */,
    day: 6 /* Unit.Day */,
    week: 7 /* Unit.Week */,
    month: 8 /* Unit.Month */,
    year: 9 /* Unit.Year */,
};
const unitNamesAsc = Object.keys(unitNameMap);
// Nanoseconds
// -----------------------------------------------------------------------------
const secInDay = 86400;
const milliInDay = 86400000;
const milliInSec = 1000;
const nanoInMicro = 1000; // consolidate with other 1000 units
const nanoInMilli = 1000000;
const nanoInSec = 1000000000;
const nanoInMinute = 60000000000;
const nanoInHour = 3600000000000;
const nanoInUtcDay = 86400000000000;
const unitNanoMap = [
    1, // nano-in-nano
    nanoInMicro,
    nanoInMilli,
    nanoInSec,
    nanoInMinute,
    nanoInHour,
    nanoInUtcDay,
];
// Utils
// -----------------------------------------------------------------------------
/*
When largestUnit=hour, returned `Day` value is "days worth of hours"
*/
function givenFieldsToDayTimeNano(fields, largestUnit, fieldNames) {
    let timeNano = 0;
    let days = 0;
    for (let unit = 0 /* Unit.Nanosecond */; unit <= largestUnit; unit++) {
        const fieldVal = fields[fieldNames[unit]];
        const unitNano = unitNanoMap[unit];
        // absorb whole-days from current unit, to prevent overflow
        const unitInDay = nanoInUtcDay / unitNano;
        const [unitDays, leftoverUnits] = divModTrunc(fieldVal, unitInDay);
        timeNano += leftoverUnits * unitNano;
        days += unitDays;
    }
    // absorb whole-days from timeNano
    const [timeDays, leftoverNano] = divModTrunc(timeNano, nanoInUtcDay);
    return [days + timeDays, leftoverNano];
}
function nanoToGivenFields(nano, largestUnit, // stops populating at this unit
fieldNames) {
    const fields = {};
    for (let unit = largestUnit; unit >= 0 /* Unit.Nanosecond */; unit--) {
        const divisor = unitNanoMap[unit];
        fields[fieldNames[unit]] = divTrunc(nano, divisor);
        nano = modTrunc(nano, divisor);
    }
    return fields;
}

// Field Names
// -----------------------------------------------------------------------------
const timeFieldNamesAsc = unitNamesAsc.slice(0, 6 /* Unit.Day */);
const timeFieldNamesAlpha = sortStrings(timeFieldNamesAsc);
const offsetFieldNames = ['offset'];
const timeZoneFieldNames = ['timeZone'];
const timeAndOffsetFieldNames = [
    ...timeFieldNamesAsc,
    ...offsetFieldNames,
];
const timeAndZoneFieldNames = [
    ...timeAndOffsetFieldNames,
    ...timeZoneFieldNames,
];
// pre-sorted!!!...
const eraYearFieldNames = ['era', 'eraYear'];
const allYearFieldNames = [...eraYearFieldNames, 'year'];
const yearFieldNames = ['year'];
const monthCodeFieldNames = ['monthCode'];
const monthFieldNames = ['month', ...monthCodeFieldNames]; // month/monthCode
const dayFieldNames = ['day'];
// month/monthCode/year
const yearMonthFieldNames = [...monthFieldNames, ...yearFieldNames];
// monthCode/year
const yearMonthCodeFieldNames = [
    ...monthCodeFieldNames,
    ...yearFieldNames,
];
const dateFieldNamesAlpha = [...dayFieldNames, ...yearMonthFieldNames];
const monthDayFieldNames = [...dayFieldNames, ...monthFieldNames]; // day/month/monthCode
const monthCodeDayFieldNames = [...dayFieldNames, ...monthCodeFieldNames]; // day/monthCode
// Defaults
// -----------------------------------------------------------------------------
const timeFieldDefaults = mapPropNamesToConstant(timeFieldNamesAsc, 0);

const isoCalendarId = 'iso8601';
const gregoryCalendarId = 'gregory';
const japaneseCalendarId = 'japanese';
/*
for converting from [era,eraYear] -> year
if origin is >=0,
  year = origin + eraYear
if origin is <0, consider the era to be 'reverse' direction
  year = -origin - eraYear, same as...
  year = -(origin + eraYear)
*/
const eraOriginsByCalendarId = {
    [gregoryCalendarId]: {
        'bce': -1,
        'ce': 0,
    },
    [japaneseCalendarId]: {
        'bce': -1,
        'ce': 0,
        'meiji': 1867,
        'taisho': 1911,
        'showa': 1925,
        'heisei': 1988,
        'reiwa': 2018,
    },
    'ethioaa': {
        'era0': 0,
    },
    'ethiopic': {
        'era0': 0,
        'era1': 5500,
    },
    'coptic': {
        'era0': -1,
        'era1': 0,
    },
    'roc': {
        'beforeroc': -1,
        'minguo': 0,
    },
    'buddhist': {
        'be': 0,
    },
    'islamic': {
        'ah': 0,
    },
    'indian': {
        'saka': 0,
    },
    'persian': {
        'ap': 0,
    },
};
const eraRemaps = {
    'bc': 'bce',
    'ad': 'ce',
};
const leapMonthMetas = {
    'chinese': 13, // (positive) max possible leap month
    'dangi': 13, // "
    'hebrew': -6, // (negative) constant leap month
};
// only used by calendar
// ---------------------
function getRequiredYearMonthFields(calendarId) {
    return calendarId === isoCalendarId ? yearFieldNames : [];
}
function getRequiredMonthDayFields(calendarId) {
    return calendarId === isoCalendarId ? dayFieldNames : [];
}
function getRequiredDateFields(calendarId) {
    return calendarId === isoCalendarId ? ['year', 'day'] : [];
}

/*
does balancing
*/
function createDayTimeNano(days, timeNano) {
    let [extraDays, newTimeNano] = divModTrunc(timeNano, nanoInUtcDay);
    let newDays = days + extraDays;
    const newDaysSign = Math.sign(newDays);
    // ensure nonconflicting signs
    if (newDaysSign && newDaysSign === -Math.sign(newTimeNano)) {
        newDays -= newDaysSign;
        newTimeNano += newDaysSign * nanoInUtcDay;
    }
    return [newDays, newTimeNano];
}
// Math
// -----------------------------------------------------------------------------
function addDayTimeNanoAndNumber(a, b) {
    return createDayTimeNano(a[0], a[1] + b);
}
// TODO: converge with diffDayTimeNanos
function addDayTimeNanos(a, b, sign = 1) {
    return createDayTimeNano(a[0] + b[0] * sign, a[1] + b[1] * sign);
}
function diffDayTimeNanos(a, b) {
    return createDayTimeNano(b[0] - a[0], b[1] - a[1]);
}
// Compare
// -----------------------------------------------------------------------------
function compareDayTimeNanos(a, b) {
    return compareNumbers(a[0], b[0]) || compareNumbers(a[1], b[1]);
}
// Conversion
// -----------------------------------------------------------------------------
// other -> DayTimeNano
// (DayTimeNano needs trunc)
function bigIntToDayTimeNano(num, multiplierNano = 1) {
    const wholeInDay = BigInt(nanoInUtcDay / multiplierNano);
    const days = Number(num / wholeInDay); // does trunc
    const remainder = Number(num % wholeInDay); // does trunc
    return [days, remainder * multiplierNano]; // scaled. doesn't need balancing
}
function numberToDayTimeNano(num, multiplierNano = 1) {
    const wholeInDay = nanoInUtcDay / multiplierNano;
    const [days, remainder] = divModTrunc(num, wholeInDay);
    return [days, remainder * multiplierNano]; // scaled. doesn't need balancing
}
// DayTimeNano -> other
// (other units need floor)
// (divisorNano always a denominator of day-nanoseconds, always positive)
function dayTimeNanoToBigInt(dayTimeNano, divisorNano = 1) {
    const [days, timeNano] = dayTimeNano;
    const timeUnits = Math.floor(timeNano / divisorNano);
    const timeUnitsInDay = nanoInUtcDay / divisorNano;
    return BigInt(days) * BigInt(timeUnitsInDay) + BigInt(timeUnits);
}
function dayTimeNanoToNumber(dayTimeNano, divisorNano = 1, exact) {
    const [whole, remainder] = dayTimeNanoToNumberRemainder(dayTimeNano, divisorNano);
    return whole + (exact ? remainder / divisorNano : 0);
}
function dayTimeNanoToNumberRemainder(dayTimeNano, divisorNano) {
    const [days, timeNano] = dayTimeNano;
    const [whole, remainderNano] = divModFloor(timeNano, divisorNano);
    const wholeInDay = nanoInUtcDay / divisorNano;
    return [days * wholeInDay + whole, remainderNano];
}

// Field Names
// -----------------------------------------------------------------------------
const durationFieldNamesAsc = unitNamesAsc.map((unitName) => unitName + 's');
const durationFieldNamesAlpha = sortStrings(durationFieldNamesAsc);
const durationTimeFieldNamesAsc = durationFieldNamesAsc.slice(0, 6 /* Unit.Day */);
const durationDateFieldNamesAsc = durationFieldNamesAsc.slice(6 /* Unit.Day */);
const durationFieldIndexes = mapPropNamesToIndex(durationFieldNamesAsc);
// Field Defaults
// -----------------------------------------------------------------------------
const durationFieldDefaults = mapPropNamesToConstant(durationFieldNamesAsc, 0);
const durationTimeFieldDefaults = mapPropNamesToConstant(durationTimeFieldNamesAsc, 0);

// Property Names
// -----------------------------------------------------------------------------
const isoTimeFieldNamesAsc = [
    'isoNanosecond',
    'isoMicrosecond',
    'isoMillisecond',
    'isoSecond',
    'isoMinute',
    'isoHour',
];
const isoDateFieldNamesAsc = [
    'isoDay',
    'isoMonth',
    'isoYear',
];
const isoDateTimeFieldNamesAsc = [
    ...isoTimeFieldNamesAsc,
    ...isoDateFieldNamesAsc,
];
// alphabetical (for getISOFields)
const isoDateFieldNamesAlpha = sortStrings(isoDateFieldNamesAsc);
const isoTimeFieldNamesAlpha = sortStrings(isoTimeFieldNamesAsc);
const isoDateTimeFieldNamesAlpha = sortStrings(isoDateTimeFieldNamesAsc);
// Defaults
// -----------------------------------------------------------------------------
const isoTimeFieldDefaults = mapPropNamesToConstant(isoTimeFieldNamesAlpha, 0);

const RawDateTimeFormat = Intl.DateTimeFormat;
const standardLocaleId = 'en-GB'; // 24-hour clock, gregorian by default
function hashIntlFormatParts(intlFormat, epochMilliseconds) {
    const parts = intlFormat.formatToParts(epochMilliseconds);
    const hash = {};
    for (const part of parts) {
        hash[part.type] = part.value;
    }
    return hash;
}

const maxDays = 100000000;
const epochNanoMax = [maxDays, 0];
const epochNanoMin = [-maxDays, 0];
const isoYearMax = 275760; // optimization. isoYear at epochNanoMax
const isoYearMin = -271821; // optimization. isoYear at epochNanoMin
function checkIsoYearMonthInBounds(isoFields) {
    // TODO: just authenticate based on hardcoded min/max isoYear/Month/Day. for other types too
    clampProp(isoFields, 'isoYear', isoYearMin, isoYearMax, 1 /* Overflow.Reject */);
    if (isoFields.isoYear === isoYearMin) {
        clampProp(isoFields, 'isoMonth', 4, 12, 1 /* Overflow.Reject */);
    }
    else if (isoFields.isoYear === isoYearMax) {
        clampProp(isoFields, 'isoMonth', 1, 9, 1 /* Overflow.Reject */);
    }
    return isoFields;
}
function checkIsoDateInBounds(isoFields) {
    checkIsoDateTimeInBounds({
        ...isoFields,
        ...isoTimeFieldDefaults,
        isoHour: 12, // Noon avoids trouble at edges of DateTime range (excludes midnight) ?
    });
    return isoFields;
}
function checkIsoDateTimeInBounds(isoFields) {
    const isoYear = clampProp(isoFields, 'isoYear', isoYearMin, isoYearMax, 1 /* Overflow.Reject */);
    const nudge = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0;
    if (nudge) {
        // needs to be within 23:59:59.999 of min/max epochNano
        checkEpochNanoInBounds(isoToEpochNano({
            ...isoFields,
            isoDay: isoFields.isoDay + nudge,
            isoNanosecond: isoFields.isoNanosecond - nudge,
        }));
    }
    return isoFields;
}
function checkEpochNanoInBounds(epochNano) {
    if (!epochNano ||
        compareDayTimeNanos(epochNano, epochNanoMin) === -1 || // epochNano < epochNanoMin
        compareDayTimeNanos(epochNano, epochNanoMax) === 1 // epochNano > epochNanoMax
    ) {
        throw new RangeError(outOfBoundsDate);
    }
    return epochNano;
}
// Field <-> Nanosecond Conversion
// -----------------------------------------------------------------------------
function isoTimeFieldsToNano(isoTimeFields) {
    return givenFieldsToDayTimeNano(isoTimeFields, 5 /* Unit.Hour */, isoTimeFieldNamesAsc)[1];
}
function nanoToIsoTimeAndDay(nano) {
    const [dayDelta, timeNano] = divModFloor(nano, nanoInUtcDay);
    const isoTimeFields = nanoToGivenFields(timeNano, 5 /* Unit.Hour */, isoTimeFieldNamesAsc);
    return [isoTimeFields, dayDelta];
}
// Epoch Unit Conversion
// -----------------------------------------------------------------------------
// nano -> [micro/milli/sec]
function epochNanoToSec(epochNano) {
    return dayTimeNanoToNumber(epochNano, nanoInSec);
}
function epochNanoToSecRemainder(epochNano) {
    return dayTimeNanoToNumberRemainder(epochNano, nanoInSec);
}
function epochNanoToMilli(epochNano) {
    return dayTimeNanoToNumber(epochNano, nanoInMilli);
}
function epochNanoToMicro(epochNano) {
    return dayTimeNanoToBigInt(epochNano, nanoInMicro);
}
// [micro/milli/sec] -> nano
function epochMilliToNano(epochMilli) {
    return numberToDayTimeNano(epochMilli, nanoInMilli);
}
// ISO <-> Epoch Conversion
// -----------------------------------------------------------------------------
// ISO Fields -> Epoch
function isoToEpochSec(isoDateTimeFields) {
    // assume valid
    // TODO: nicer way to splice this (while still excluding subsec)
    const epochSec = isoArgsToEpochSec(isoDateTimeFields.isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond);
    const subsecNano = isoDateTimeFields.isoMillisecond * nanoInMilli +
        isoDateTimeFields.isoMicrosecond * nanoInMicro +
        isoDateTimeFields.isoNanosecond;
    return [epochSec, subsecNano];
}
/*
If out-of-bounds, returns undefined
*/
function isoToEpochMilli(isoDateTimeFields) {
    return isoArgsToEpochMilli(isoDateTimeFields.isoYear, isoDateTimeFields.isoMonth, isoDateTimeFields.isoDay, isoDateTimeFields.isoHour, isoDateTimeFields.isoMinute, isoDateTimeFields.isoSecond, isoDateTimeFields.isoMillisecond);
}
/*
For converting to fake epochNano values for math
If out-of-bounds, returns undefined
*/
function isoToEpochNano(isoFields) {
    const epochMilli = isoToEpochMilli(isoFields);
    if (epochMilli !== undefined) {
        const [days, milliRemainder] = divModTrunc(epochMilli, milliInDay);
        const timeNano = milliRemainder * nanoInMilli +
            (isoFields.isoMicrosecond || 0) * nanoInMicro +
            (isoFields.isoNanosecond || 0);
        return [days, timeNano];
    }
}
/*
For converting to proper epochNano values
Ensures in bounds
*/
function isoToEpochNanoWithOffset(isoFields, offsetNano) {
    const [newIsoTimeFields, dayDelta] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) - offsetNano);
    const epochNano = isoToEpochNano({
        ...isoFields,
        isoDay: isoFields.isoDay + dayDelta,
        ...newIsoTimeFields,
    });
    return checkEpochNanoInBounds(epochNano);
}
/*
Assumes in-bounds
*/
function isoArgsToEpochSec(...args) {
    return isoArgsToEpochMilli(...args) / milliInSec;
}
/*
If out-of-bounds, returns undefined
*/
function isoArgsToEpochMilli(...args) {
    const [legacyDate, nudge] = isoToLegacyDate(...args);
    const epochMilli = legacyDate.getTime();
    if (!isNaN(epochMilli)) {
        return epochMilli - nudge * milliInDay;
    }
}
function isoToLegacyDate(isoYear, isoMonth = 1, isoDay = 1, isoHour = 0, isoMinute = 0, isoSec = 0, isoMilli = 0) {
    // allows this function to accept values beyond valid Instants
    // (PlainDateTime allows values within 24hrs)
    const nudge = isoYear === isoYearMin ? 1 : isoYear === isoYearMax ? -1 : 0;
    // Note: Date.UTC() interprets one and two-digit years as being in the
    // 20th century, so don't use it
    const legacyDate = new Date(); // should throw out-of-range error here?
    legacyDate.setUTCHours(isoHour, isoMinute, isoSec, isoMilli);
    legacyDate.setUTCFullYear(isoYear, isoMonth - 1, isoDay + nudge);
    return [legacyDate, nudge];
}
// Epoch -> ISO Fields
function epochNanoToIso(epochNano, offsetNano) {
    let [days, timeNano] = addDayTimeNanoAndNumber(epochNano, offsetNano);
    // convert to start-of-day and time-of-day
    if (timeNano < 0) {
        timeNano += nanoInUtcDay;
        days -= 1;
    }
    const [timeMilli, nanoRemainder] = divModFloor(timeNano, nanoInMilli);
    const [isoMicrosecond, isoNanosecond] = divModFloor(nanoRemainder, nanoInMicro);
    const epochMilli = days * milliInDay + timeMilli;
    return {
        ...epochMilliToIso(epochMilli),
        isoMicrosecond,
        isoNanosecond,
    };
}
/*
Given epochMilli assumed to be within PlainDateTime's range
*/
function epochMilliToIso(epochMilli) {
    const nudge = epochMilli < -milliInDay * maxDays
        ? 1
        : epochMilli > milliInDay * maxDays
            ? -1
            : 0;
    const legacyDate = new Date(epochMilli + nudge * milliInDay);
    return zipProps(isoDateTimeFieldNamesAsc, [
        legacyDate.getUTCFullYear(),
        legacyDate.getUTCMonth() + 1,
        legacyDate.getUTCDate() - nudge,
        legacyDate.getUTCHours(),
        legacyDate.getUTCMinutes(),
        legacyDate.getUTCSeconds(),
        legacyDate.getUTCMilliseconds(),
    ]);
}

const isoEpochOriginYear = 1970;
const isoEpochFirstLeapYear = 1972;
const isoMonthsInYear = 12;
const isoDaysInWeek = 7;
function computeIsoYear(isoFields) {
    return isoFields.isoYear;
}
function computeIsoMonth(isoFields) {
    return isoFields.isoMonth;
}
function computeIsoDay(isoFields) {
    return isoFields.isoDay;
}
function computeIsoDateParts(isoFields) {
    return [isoFields.isoYear, isoFields.isoMonth, isoFields.isoDay];
}
function computeIsoMonthCodeParts(_isoYear, isoMonth) {
    return [isoMonth, false];
}
function computeIsoYearMonthForMonthDay(monthCodeNumber, isLeapMonth, _day) {
    if (!isLeapMonth) {
        return [isoEpochFirstLeapYear, monthCodeNumber];
    }
}
function computeIsoFieldsFromParts(year, month, day) {
    return { isoYear: year, isoMonth: month, isoDay: day };
}
function computeIsoDaysInWeek(_isoDateFields) {
    return isoDaysInWeek;
}
function computeIsoMonthsInYear(_isoYear) {
    // for methods
    return isoMonthsInYear;
}
function computeIsoDaysInMonth(isoYear, isoMonth) {
    switch (isoMonth) {
        case 2:
            return computeIsoInLeapYear(isoYear) ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
    }
    return 31;
}
function computeIsoDaysInYear(isoYear) {
    return computeIsoInLeapYear(isoYear) ? 366 : 365;
}
function computeIsoInLeapYear(isoYear) {
    // % is dangerous, but comparing 0 with -0 is fine
    return isoYear % 4 === 0 && (isoYear % 100 !== 0 || isoYear % 400 === 0);
}
function computeIsoDayOfYear(isoDateFields) {
    return (diffEpochMilliByDay(isoToEpochMilli(isoDateYearStart(isoDateFields)), isoToEpochMilli({ ...isoDateFields, ...isoTimeFieldDefaults })) + 1);
}
function computeIsoDayOfWeek(isoDateFields) {
    const [legacyDate, nudge] = isoToLegacyDate(isoDateFields.isoYear, isoDateFields.isoMonth, isoDateFields.isoDay);
    return modFloor(legacyDate.getUTCDay() - nudge, 7) || 7;
}
function computeIsoYearOfWeek(isoDateFields) {
    return computeIsoWeekParts(isoDateFields)[0];
}
function computeIsoWeekOfYear(isoDateFields) {
    return computeIsoWeekParts(isoDateFields)[1];
}
function computeIsoWeekParts(isoDateFields) {
    const doy = computeIsoDayOfYear(isoDateFields);
    const dow = computeIsoDayOfWeek(isoDateFields);
    const doj = computeIsoDayOfWeek(isoDateYearStart(isoDateFields));
    const isoWeek = Math.floor((doy - dow + 10) / isoDaysInWeek);
    const { isoYear } = isoDateFields;
    if (isoWeek < 1) {
        return [
            isoYear - 1,
            doj === 5 || (doj === 6 && computeIsoInLeapYear(isoYear - 1)) ? 53 : 52,
        ];
    }
    if (isoWeek === 53) {
        if (computeIsoDaysInYear(isoYear) - doy < 4 - dow) {
            return [isoYear + 1, 1];
        }
    }
    return [isoYear, isoWeek];
}
function isoDateYearStart(isoDateFields) {
    return {
        ...isoDateFields,
        isoMonth: 1,
        isoDay: 1,
        ...isoTimeFieldDefaults,
    };
}
// Era (complicated stuff)
// -----------------------------------------------------------------------------
const primaryJapaneseEraMilli = isoArgsToEpochMilli(1868, 9, 8);
const queryJapaneseEraParts = createLazyGenerator(computeJapaneseEraParts, WeakMap);
function computeIsoEraParts(isoFields) {
    if (this.id === gregoryCalendarId) {
        return computeGregoryEraParts(isoFields);
    }
    if (this.id === japaneseCalendarId) {
        return queryJapaneseEraParts(isoFields);
    }
    return [undefined, undefined]; // iso
}
function computeGregoryEraParts({ isoYear }) {
    if (isoYear < 1) {
        return ['bce', -isoYear + 1];
    }
    return ['ce', isoYear];
}
function computeJapaneseEraParts(isoFields) {
    const epochMilli = isoToEpochMilli(isoFields);
    if (epochMilli < primaryJapaneseEraMilli) {
        return computeGregoryEraParts(isoFields);
    }
    const intlParts = hashIntlFormatParts(queryCalendarIntlFormat(japaneseCalendarId), epochMilli);
    const { era, eraYear } = parseIntlYear(intlParts, japaneseCalendarId);
    return [era, eraYear];
}
// Checking Fields
// -----------------------------------------------------------------------------
function checkIsoDateTimeFields(isoDateTimeFields) {
    checkIsoDateFields(isoDateTimeFields);
    constrainIsoTimeFields(isoDateTimeFields, 1 /* Overflow.Reject */);
    return isoDateTimeFields;
}
function checkIsoDateFields(isoInternals) {
    constrainIsoDateFields(isoInternals, 1 /* Overflow.Reject */);
    return isoInternals;
}
function isIsoDateFieldsValid(isoFields) {
    return allPropsEqual(isoDateFieldNamesAsc, isoFields, constrainIsoDateFields(isoFields));
}
// Constraining
// -----------------------------------------------------------------------------
function constrainIsoDateFields(isoFields, overflow) {
    const { isoYear } = isoFields;
    const isoMonth = clampProp(isoFields, 'isoMonth', 1, computeIsoMonthsInYear(), overflow);
    const isoDay = clampProp(isoFields, 'isoDay', 1, computeIsoDaysInMonth(isoYear, isoMonth), overflow);
    return { isoYear, isoMonth, isoDay };
}
function constrainIsoTimeFields(isoTimeFields, overflow) {
    return zipProps(isoTimeFieldNamesAsc, [
        clampProp(isoTimeFields, 'isoHour', 0, 23, overflow),
        clampProp(isoTimeFields, 'isoMinute', 0, 59, overflow),
        clampProp(isoTimeFields, 'isoSecond', 0, 59, overflow),
        clampProp(isoTimeFields, 'isoMillisecond', 0, 999, overflow),
        clampProp(isoTimeFields, 'isoMicrosecond', 0, 999, overflow),
        clampProp(isoTimeFields, 'isoNanosecond', 0, 999, overflow),
    ]);
}

// Require
// -----------------------------------------------------------------------------
function requireObjectLike(arg) {
    if (!isObjectLike(arg)) {
        throw new TypeError(invalidObject);
    }
    return arg;
}
function requireType(typeName, arg, entityName = typeName) {
    // biome-ignore lint/suspicious/useValidTypeof: dynamic by design
    if (typeof arg !== typeName) {
        throw new TypeError(invalidEntity(entityName, arg));
    }
    return arg;
}
const requireString = bindArgs((requireType), 'string');
const requireBoolean = bindArgs((requireType), 'boolean');
const requireNumber = bindArgs((requireType), 'number');
const requireFunction = bindArgs((requireType), 'function');
function requireStringOrUndefined(input) {
    if (input !== undefined && typeof input !== 'string') {
        throw new TypeError(expectedStringOrUndefined);
    }
    return input;
}
function requireIntegerOrUndefined(input) {
    if (typeof input === 'number') {
        requireNumberIsInteger(input);
    }
    else if (input !== undefined) {
        throw new TypeError(expectedIntegerOrUndefined);
    }
    return input;
}
function requireInteger(arg) {
    return requireNumberIsInteger(requireNumber(arg));
}
function requirePositiveInteger(arg) {
    return requireNumberIsPositive(requireInteger(arg));
}
/*
Also, responsible for ensuring not -0
Other top-level funcs handle this themselves
*/
function requireNumberIsInteger(num, entityName = 'number') {
    if (!Number.isInteger(num)) {
        throw new RangeError(expectedInteger(entityName, num));
    }
    return num || 0; // ensure no -0
}
function requireNumberIsPositive(num, entityName = 'number') {
    if (num <= 0) {
        throw new RangeError(expectedPositive(entityName, num));
    }
    return num;
}
function requireNonNullish(o) {
    if (o == null) {
        throw new TypeError(forbiddenNullish);
    }
    return o;
}
/*
Disallows undefined/null. Does RangeError
*/
function requirePropDefined(optionName, optionVal) {
    if (optionVal == null) {
        throw new RangeError(missingField(optionName));
    }
    return optionVal;
}
// Casting
// -----------------------------------------------------------------------------
function toString(arg) {
    if (typeof arg === 'symbol') {
        throw new TypeError(forbiddenSymbolToString);
    }
    return String(arg);
}
/*
see ToPrimitiveAndRequireString
*/
function toStringViaPrimitive(arg, entityName) {
    if (isObjectLike(arg)) {
        return String(arg);
    }
    return requireString(arg, entityName);
}
function toBigInt(bi) {
    if (typeof bi === 'string') {
        return BigInt(bi);
    }
    if (typeof bi !== 'bigint') {
        throw new TypeError(invalidBigInt(bi));
    }
    return bi;
}
function toNumber(arg, entityName = 'number') {
    if (typeof arg === 'bigint') {
        throw new TypeError(forbiddenBigIntToNumber(entityName));
    }
    arg = Number(arg);
    if (!Number.isFinite(arg)) {
        throw new RangeError(expectedFinite(entityName, arg));
    }
    return arg;
}
function toInteger(arg, entityName) {
    return Math.trunc(toNumber(arg, entityName)) || 0; // ensure no -0
}
function toStrictInteger(arg, entityName) {
    return requireNumberIsInteger(toNumber(arg, entityName), entityName);
}
function toPositiveInteger(arg, entityName) {
    return requireNumberIsPositive(toInteger(arg, entityName), entityName);
}

// Config
// -----------------------------------------------------------------------------
// TODO: rename to 'label'?
const smallestUnitStr = 'smallestUnit';
const largestUnitStr = 'largestUnit';
const totalUnitStr = 'unit';
const roundingIncName = 'roundingIncrement';
const subsecDigitsName = 'fractionalSecondDigits';
const relativeToName = 'relativeTo';
const overflowMap = {
    constrain: 0 /* Overflow.Constrain */,
    reject: 1 /* Overflow.Reject */,
};
const overflowMapNames = Object.keys(overflowMap);
const epochDisambigMap = {
    compatible: 0 /* EpochDisambig.Compat */,
    reject: 1 /* EpochDisambig.Reject */,
    earlier: 2 /* EpochDisambig.Earlier */,
    later: 3 /* EpochDisambig.Later */,
};
const offsetDisambigMap = {
    reject: 0 /* OffsetDisambig.Reject */,
    use: 1 /* OffsetDisambig.Use */,
    prefer: 2 /* OffsetDisambig.Prefer */,
    ignore: 3 /* OffsetDisambig.Ignore */,
};
const calendarDisplayMap = {
    auto: 0 /* CalendarDisplay.Auto */,
    never: 1 /* CalendarDisplay.Never */,
    critical: 2 /* CalendarDisplay.Critical */,
    always: 3 /* CalendarDisplay.Always */,
};
const timeZoneDisplayMap = {
    auto: 0 /* TimeZoneDisplay.Auto */,
    never: 1 /* TimeZoneDisplay.Never */,
    critical: 2 /* TimeZoneDisplay.Critical */,
};
const offsetDisplayMap = {
    auto: 0 /* OffsetDisplay.Auto */,
    never: 1 /* OffsetDisplay.Never */,
};
const roundingModeMap = {
    floor: 0 /* RoundingMode.Floor */,
    halfFloor: 1 /* RoundingMode.HalfFloor */,
    ceil: 2 /* RoundingMode.Ceil */,
    halfCeil: 3 /* RoundingMode.HalfCeil */,
    trunc: 4 /* RoundingMode.Trunc */,
    halfTrunc: 5 /* RoundingMode.HalfTrunc */,
    expand: 6 /* RoundingMode.Expand */,
    halfExpand: 7 /* RoundingMode.HalfExpand */,
    halfEven: 8 /* RoundingMode.HalfEven */,
};
// Compound Options
// -----------------------------------------------------------------------------
function refineOverflowOptions(options) {
    return options === undefined
        ? 0 /* Overflow.Constrain */
        : refineOverflow(requireObjectLike(options));
}
function refineZonedFieldOptions(options, defaultOffsetDisambig = 0 /* OffsetDisambig.Reject */) {
    options = normalizeOptions(options);
    // alphabetical
    const epochDisambig = refineEpochDisambig(options); // "disambig"
    const offsetDisambig = refineOffsetDisambig(options, defaultOffsetDisambig); // "offset"
    const overflow = refineOverflow(options); // "overflow"
    return [overflow, offsetDisambig, epochDisambig];
}
function refineEpochDisambigOptions(options) {
    return refineEpochDisambig(normalizeOptions(options));
}
/*
For simple Calendar class diffing (only y/m/w/d units)
*/
function refineCalendarDiffOptions(options) {
    // TODO: only year/month/week/day?
    options = normalizeOptions(options);
    return refineLargestUnit(options, 9 /* Unit.Year */, 6 /* Unit.Day */, true);
}
function refineDiffOptions(roundingModeInvert, options, defaultLargestUnit, maxUnit = 9 /* Unit.Year */, minUnit = 0 /* Unit.Nanosecond */, defaultRoundingMode = 4 /* RoundingMode.Trunc */) {
    options = normalizeOptions(options);
    let largestUnit = refineLargestUnit(options, maxUnit, minUnit);
    let roundingInc = parseRoundingIncInteger(options);
    let roundingMode = refineRoundingMode(options, defaultRoundingMode);
    const smallestUnit = refineSmallestUnit(options, maxUnit, minUnit, true);
    if (largestUnit == null) {
        largestUnit = Math.max(defaultLargestUnit, smallestUnit);
    }
    else {
        checkLargestSmallestUnit(largestUnit, smallestUnit);
    }
    roundingInc = refineRoundingInc(roundingInc, smallestUnit, true);
    if (roundingModeInvert) {
        roundingMode = invertRoundingMode(roundingMode);
    }
    return [largestUnit, smallestUnit, roundingInc, roundingMode];
}
function refineDurationRoundOptions(options, defaultLargestUnit, refineRelativeTo) {
    options = normalizeUnitNameOptions(options, smallestUnitStr);
    // alphabetcal
    let largestUnit = refineLargestUnit(options);
    const relativeToInternals = refineRelativeTo(options[relativeToName]);
    let roundingInc = parseRoundingIncInteger(options);
    const roundingMode = refineRoundingMode(options, 7 /* RoundingMode.HalfExpand */);
    let smallestUnit = refineSmallestUnit(options);
    if (largestUnit === undefined && smallestUnit === undefined) {
        throw new RangeError(missingSmallestLargestUnit);
    }
    if (smallestUnit == null) {
        smallestUnit = 0 /* Unit.Nanosecond */;
    }
    if (largestUnit == null) {
        largestUnit = Math.max(smallestUnit, defaultLargestUnit);
    }
    checkLargestSmallestUnit(largestUnit, smallestUnit);
    roundingInc = refineRoundingInc(roundingInc, smallestUnit, true);
    return [
        largestUnit,
        smallestUnit,
        roundingInc,
        roundingMode,
        relativeToInternals,
    ];
}
/*
Always related to time
*/
function refineRoundOptions(options, maxUnit = 6 /* Unit.Day */, solarMode) {
    options = normalizeUnitNameOptions(options, smallestUnitStr);
    // alphabetical
    let roundingInc = parseRoundingIncInteger(options);
    const roundingMode = refineRoundingMode(options, 7 /* RoundingMode.HalfExpand */);
    let smallestUnit = refineSmallestUnit(options, maxUnit);
    smallestUnit = requirePropDefined(smallestUnitStr, smallestUnit);
    roundingInc = refineRoundingInc(roundingInc, smallestUnit, undefined, solarMode);
    return [smallestUnit, roundingInc, roundingMode];
}
function refineTotalOptions(options, refineRelativeTo) {
    options = normalizeUnitNameOptions(options, totalUnitStr);
    // alphabetical
    const relativeToInternals = refineRelativeTo(options[relativeToName]);
    let totalUnit = refineTotalUnit(options);
    totalUnit = requirePropDefined(totalUnitStr, totalUnit);
    return [
        totalUnit, // required
        relativeToInternals,
    ];
}
function refineDateTimeDisplayOptions(options) {
    options = normalizeOptions(options);
    return [refineCalendarDisplay(options), ...refineTimeDisplayTuple(options)];
}
function refineDateDisplayOptions(options) {
    return refineCalendarDisplay(normalizeOptions(options));
}
function refineTimeDisplayOptions(options, maxSmallestUnit) {
    return refineTimeDisplayTuple(normalizeOptions(options), maxSmallestUnit);
}
function refineZonedDateTimeDisplayOptions(options) {
    options = normalizeOptions(options);
    // alphabetical
    const calendarDisplay = refineCalendarDisplay(options);
    const subsecDigits = refineSubsecDigits(options); // "fractionalSecondDigits". rename in our code?
    const offsetDisplay = refineOffsetDisplay(options);
    const roundingMode = refineRoundingMode(options, 4 /* RoundingMode.Trunc */);
    const smallestUnit = refineSmallestUnit(options, 4 /* Unit.Minute */);
    const timeZoneDisplay = refineTimeZoneDisplay(options);
    return [
        calendarDisplay,
        timeZoneDisplay,
        offsetDisplay,
        roundingMode,
        ...refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits),
    ];
}
function refineInstantDisplayOptions(options) {
    options = normalizeOptions(options);
    // alphabetical
    const timeDisplayTuple = refineTimeDisplayTuple(options);
    const timeZoneArg = options.timeZone;
    return [timeZoneArg, ...timeDisplayTuple];
}
// Utils for compound options
// -----------------------------------------------------------------------------
function refineTimeDisplayTuple(options, maxSmallestUnit = 4 /* Unit.Minute */) {
    // alphabetical
    const subsecDigits = refineSubsecDigits(options); // "fractionalSecondDigits". rename in our code?
    const roundingMode = refineRoundingMode(options, 4 /* RoundingMode.Trunc */);
    const smallestUnit = refineSmallestUnit(options, maxSmallestUnit);
    return [
        roundingMode,
        ...refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits),
    ];
}
function refineSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) {
    if (smallestUnit != null) {
        return [
            unitNanoMap[smallestUnit],
            smallestUnit < 4 /* Unit.Minute */
                ? (9 - smallestUnit * 3)
                : -1, // hide seconds (not relevant when maxSmallestUnit is smaller then minute)
        ];
    }
    return [
        subsecDigits === undefined ? 1 : 10 ** (9 - subsecDigits),
        subsecDigits,
    ];
}
// Individual Refining (simple)
// -----------------------------------------------------------------------------
const refineSmallestUnit = bindArgs((refineUnitOption), smallestUnitStr);
const refineLargestUnit = bindArgs((refineUnitOption), largestUnitStr);
const refineTotalUnit = bindArgs((refineUnitOption), totalUnitStr);
const refineOverflow = bindArgs((refineChoiceOption), 'overflow', overflowMap);
const refineEpochDisambig = bindArgs((refineChoiceOption), 'disambiguation', epochDisambigMap);
const refineOffsetDisambig = bindArgs((refineChoiceOption), 'offset', offsetDisambigMap);
const refineCalendarDisplay = bindArgs((refineChoiceOption), 'calendarName', calendarDisplayMap);
const refineTimeZoneDisplay = bindArgs((refineChoiceOption), 'timeZoneName', timeZoneDisplayMap);
const refineOffsetDisplay = bindArgs((refineChoiceOption), 'offset', offsetDisplayMap);
// Caller should always supply default
const refineRoundingMode = bindArgs((refineChoiceOption), 'roundingMode', roundingModeMap);
// Individual Refining (custom logic)
// -----------------------------------------------------------------------------
function parseRoundingIncInteger(options) {
    const roundingInc = options[roundingIncName];
    if (roundingInc === undefined) {
        return 1;
    }
    return toInteger(roundingInc, roundingIncName);
}
function refineRoundingInc(roundingInc, // results from parseRoundingIncInteger
smallestUnit, allowManyLargeUnits, solarMode) {
    const upUnitNano = solarMode ? nanoInUtcDay : unitNanoMap[smallestUnit + 1];
    if (upUnitNano) {
        const unitNano = unitNanoMap[smallestUnit];
        const maxRoundingInc = upUnitNano / unitNano;
        roundingInc = clampEntity(roundingIncName, roundingInc, 1, maxRoundingInc - (solarMode ? 0 : 1), 1 /* Overflow.Reject */);
        // % is dangerous, but -0 will be falsy just like 0
        if (upUnitNano % (roundingInc * unitNano)) {
            throw new RangeError(invalidEntity(roundingIncName, roundingInc));
        }
    }
    else {
        roundingInc = clampEntity(roundingIncName, roundingInc, 1, allowManyLargeUnits ? 10 ** 9 : 1, 1 /* Overflow.Reject */);
    }
    return roundingInc;
}
function refineSubsecDigits(options) {
    let subsecDigits = options[subsecDigitsName];
    if (subsecDigits !== undefined) {
        if (typeof subsecDigits !== 'number') {
            if (toString(subsecDigits) === 'auto') {
                return;
            }
            throw new RangeError(invalidEntity(subsecDigitsName, subsecDigits));
        }
        subsecDigits = clampEntity(subsecDigitsName, Math.floor(subsecDigits), 0, 9, 1 /* Overflow.Reject */);
    }
    return subsecDigits;
}
// Normalization of whole options object
// -----------------------------------------------------------------------------
/*
For ensuring options is an object
*/
function normalizeOptions(options) {
    if (options === undefined) {
        return {};
    }
    return requireObjectLike(options);
}
function normalizeUnitNameOptions(options, optionName) {
    if (typeof options === 'string') {
        return { [optionName]: options };
    }
    return requireObjectLike(options);
}
/*
For validating and copying. If undefined, leave as undefined
Used for to* and diff* and `with` functions
*/
function copyOptions(options) {
    if (options === undefined) {
        return undefined;
    }
    if (isObjectLike(options)) {
        return Object.assign(Object.create(null), options);
    }
    throw new TypeError(invalidObject);
}
function overrideOverflowOptions(options, overflow) {
    return (options &&
        Object.assign(Object.create(null), options, {
            overflow: overflowMapNames[overflow],
        }));
}
// Utils
// -----------------------------------------------------------------------------
function invertRoundingMode(roundingMode) {
    if (roundingMode < 4) {
        return (roundingMode + 2) % 4;
    }
    return roundingMode;
}
/*
`null` means 'auto'
TODO: create better type where if ensureDefined, then return-type is non null/defined
*/
function refineUnitOption(optionName, options, maxUnit = 9 /* Unit.Year */, minUnit = 0 /* Unit.Nanosecond */, // used less frequently than maxUnit
ensureDefined) {
    let unitStr = options[optionName];
    if (unitStr === undefined) {
        return ensureDefined ? minUnit : undefined;
    }
    unitStr = toString(unitStr);
    if (unitStr === 'auto') {
        return ensureDefined ? minUnit : null;
    }
    let unit = unitNameMap[unitStr];
    if (unit === undefined) {
        unit = durationFieldIndexes[unitStr];
    }
    if (unit === undefined) {
        throw new RangeError(invalidEntity(optionName, unitStr));
    }
    clampEntity(optionName, unit, minUnit, maxUnit, 1 /* Overflow.Reject */);
    return unit;
}
function refineChoiceOption(optionName, enumNameMap, options, defaultChoice = 0) {
    const enumArg = options[optionName];
    if (enumArg === undefined) {
        return defaultChoice;
    }
    const enumStr = toString(enumArg);
    const enumNum = enumNameMap[enumStr];
    if (enumNum === undefined) {
        throw new RangeError(invalidEntity(optionName, enumStr));
    }
    return enumNum;
}
function checkLargestSmallestUnit(largestUnit, smallestUnit) {
    if (smallestUnit > largestUnit) {
        throw new RangeError(flippedSmallestLargestUnit);
    }
}

const PlainYearMonthBranding = 'PlainYearMonth';
const PlainMonthDayBranding = 'PlainMonthDay';
const PlainDateBranding = 'PlainDate';
const PlainDateTimeBranding = 'PlainDateTime';
const PlainTimeBranding = 'PlainTime';
const ZonedDateTimeBranding = 'ZonedDateTime';
const InstantBranding = 'Instant';
const DurationBranding = 'Duration';
// Slot-creation helpers
// -----------------------------------------------------------------------------
function createInstantSlots(epochNano) {
    return {
        branding: InstantBranding,
        epochNanoseconds: epochNano,
    };
}
function createZonedDateTimeSlots(epochNano, timeZone, calendar) {
    return {
        branding: ZonedDateTimeBranding,
        calendar,
        timeZone,
        epochNanoseconds: epochNano,
    };
}
function createPlainDateTimeSlots(isoFields, calendar = isoFields.calendar) {
    return {
        branding: PlainDateTimeBranding,
        calendar: calendar,
        ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields),
    };
}
function createPlainDateSlots(isoFields, calendar = isoFields.calendar) {
    return {
        branding: PlainDateBranding,
        calendar: calendar,
        ...pluckProps(isoDateFieldNamesAlpha, isoFields),
    };
}
function createPlainYearMonthSlots(isoFields, calendar = isoFields.calendar) {
    return {
        branding: PlainYearMonthBranding,
        calendar: calendar,
        ...pluckProps(isoDateFieldNamesAlpha, isoFields),
    };
}
function createPlainMonthDaySlots(isoFields, calendar = isoFields.calendar) {
    return {
        branding: PlainMonthDayBranding,
        calendar: calendar,
        ...pluckProps(isoDateFieldNamesAlpha, isoFields),
    };
}
function createPlainTimeSlots(isoFields) {
    return {
        branding: PlainTimeBranding,
        ...pluckProps(isoTimeFieldNamesAlpha, isoFields),
    };
}
function createDurationSlots(durationFields) {
    return {
        branding: DurationBranding,
        ...pluckProps(durationFieldNamesAlpha, durationFields),
    };
}
// Epoch Slot Getters
// -----------------------------------------------------------------------------
function getEpochSeconds(slots) {
    return epochNanoToSec(slots.epochNanoseconds);
}
function getEpochMilliseconds(slots) {
    return epochNanoToMilli(slots.epochNanoseconds);
}
function getEpochMicroseconds(slots) {
    return epochNanoToMicro(slots.epochNanoseconds);
}
function getEpochNanoseconds(slots) {
    return dayTimeNanoToBigInt(slots.epochNanoseconds);
}
function getId(idLike) {
    return typeof idLike === 'string' ? idLike : requireString(idLike.id);
}
function isIdLikeEqual(idLike0, idLike1) {
    return idLike0 === idLike1 || getId(idLike0) === getId(idLike1);
}

const roundingModeFuncs = [
    Math.floor,
    roundHalfFloor,
    Math.ceil,
    roundHalfCeil,
    Math.trunc,
    roundHalfTrunc,
    roundExpand,
    roundHalfExpand,
    roundHalfEven,
];
/*
common SubsecDigits addons:
  -1 means hide seconds
  undefined means 'auto' (display all digits but no trailing zeros)
*/

function totalDuration(refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) {
    const durationLargestUnit = getLargestDurationUnit(slots);
    const [totalUnit, markerSlots] = refineTotalOptions(options, refineRelativeTo);
    const maxLargestUnit = Math.max(totalUnit, durationLargestUnit);
    if (maxLargestUnit < 6 /* Unit.Day */ ||
        (maxLargestUnit === 6 /* Unit.Day */ &&
            !(markerSlots && markerSlots.epochNanoseconds)) // has uniform days?
    ) {
        return totalDayTimeDuration(slots, totalUnit);
    }
    if (!markerSlots) {
        throw new RangeError(missingRelativeTo);
    }
    const markerSystem = createMarkerSystem(getCalendarOps, getTimeZoneOps, markerSlots);
    return totalRelativeDuration(...spanDuration(slots, undefined, totalUnit, ...markerSystem), totalUnit, ...markerSystem);
}
function totalRelativeDuration(durationFields, endEpochNano, totalUnit, 
// marker system...
marker, markerToEpochNano, moveMarker, _diffMarkers) {
    const sign = queryDurationSign(durationFields);
    const [epochNano0, epochNano1] = clampRelativeDuration(clearDurationFields(durationFields, totalUnit - 1), totalUnit, sign, 
    // marker system...
    marker, markerToEpochNano, moveMarker);
    const frac = computeEpochNanoFrac(epochNano0, epochNano1, endEpochNano);
    return durationFields[durationFieldNamesAsc[totalUnit]] + frac * sign;
}
function totalDayTimeDuration(durationFields, totalUnit) {
    return totalDayTimeNano(durationFieldsToDayTimeNano(durationFields, 6 /* Unit.Day */), totalUnit);
}
// Utils for points-within-intervals
// -----------------------------------------------------------------------------
function totalDayTimeNano(dayTimeNano, totalUnit) {
    return dayTimeNanoToNumber(dayTimeNano, unitNanoMap[totalUnit], true); // exact
}
function clampRelativeDuration(durationFields, clampUnit, clampDistance, 
// marker system...
marker, markerToEpochNano, moveMarker) {
    const clampDurationFields = {
        ...durationFieldDefaults,
        [durationFieldNamesAsc[clampUnit]]: clampDistance,
    };
    const marker0 = moveMarker(marker, durationFields);
    const marker1 = moveMarker(marker0, clampDurationFields);
    const epochNano0 = markerToEpochNano(marker0);
    const epochNano1 = markerToEpochNano(marker1);
    return [epochNano0, epochNano1];
}
function computeEpochNanoFrac(epochNano0, epochNano1, epochNanoProgress) {
    const denom = dayTimeNanoToNumber(diffDayTimeNanos(epochNano0, epochNano1));
    if (!denom) {
        throw new RangeError(invalidProtocolResults);
    }
    const numer = dayTimeNanoToNumber(diffDayTimeNanos(epochNano0, epochNanoProgress));
    return numer / denom;
}

// High-Level
// -----------------------------------------------------------------------------
function roundInstant(instantSlots, options) {
    const [smallestUnit, roundingInc, roundingMode] = refineRoundOptions(
    // TODO: inline this
    options, 5 /* Unit.Hour */, true);
    return createInstantSlots(roundDayTimeNano(instantSlots.epochNanoseconds, smallestUnit, roundingInc, roundingMode, true));
}
function roundZonedDateTime(getTimeZoneOps, zonedDateTimeSlots, options) {
    let { epochNanoseconds, timeZone, calendar } = zonedDateTimeSlots;
    const [smallestUnit, roundingInc, roundingMode] = refineRoundOptions(options);
    // short circuit (elsewhere? consolidate somehow?)
    if (smallestUnit === 0 /* Unit.Nanosecond */ && roundingInc === 1) {
        return zonedDateTimeSlots;
    }
    const timeZoneOps = getTimeZoneOps(timeZone);
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNanoseconds);
    let isoDateTimeFields = {
        ...epochNanoToIso(epochNanoseconds, offsetNano),
        calendar, // repeat below?
    };
    isoDateTimeFields = {
        calendar,
        ...roundDateTime(isoDateTimeFields, smallestUnit, roundingInc, roundingMode, timeZoneOps),
    };
    epochNanoseconds = getMatchingInstantFor(timeZoneOps, isoDateTimeFields, offsetNano, 2 /* OffsetDisambig.Prefer */, // keep old offsetNano if possible
    0 /* EpochDisambig.Compat */, true);
    return createZonedDateTimeSlots(epochNanoseconds, timeZone, calendar);
}
function roundPlainDateTime(plainDateTimeSlots, options) {
    const roundedIsoFields = roundDateTime(plainDateTimeSlots, ...refineRoundOptions(options));
    return createPlainDateTimeSlots(roundedIsoFields, plainDateTimeSlots.calendar);
}
function roundPlainTime(slots, options) {
    return createPlainTimeSlots(roundTime(slots, ...refineRoundOptions(options, 5 /* Unit.Hour */)));
}
// Low-Level
// -----------------------------------------------------------------------------
function roundDateTime(isoFields, smallestUnit, roundingInc, roundingMode, timeZoneOps) {
    if (smallestUnit === 6 /* Unit.Day */) {
        return roundDateTimeToDay(isoFields, timeZoneOps, roundingMode);
    }
    return roundDateTimeToNano(isoFields, computeNanoInc(smallestUnit, roundingInc), roundingMode);
}
function roundDateTimeToDay(isoFields, timeZoneOps, roundingMode) {
    if (timeZoneOps) {
        const nanoInDay = computeNanosecondsInDay(timeZoneOps, isoFields);
        const roundedTimeNano = roundByInc(isoTimeFieldsToNano(isoFields), nanoInDay, roundingMode);
        const dayDelta = roundedTimeNano / nanoInDay;
        return checkIsoDateTimeInBounds({
            ...moveByIsoDays(isoFields, dayDelta),
            ...isoTimeFieldDefaults,
        });
    }
    return roundDateTimeToNano(isoFields, nanoInUtcDay, roundingMode);
}
function roundDateTimeToNano(isoFields, nanoInc, roundingMode) {
    const [roundedIsoFields, dayDelta] = roundTimeToNano(isoFields, nanoInc, roundingMode);
    return checkIsoDateTimeInBounds({
        ...moveByIsoDays(isoFields, dayDelta),
        ...roundedIsoFields,
    });
}
function roundTime(isoFields, smallestUnit, roundingInc, roundingMode) {
    return roundTimeToNano(isoFields, computeNanoInc(smallestUnit, roundingInc), roundingMode)[0];
}
function roundTimeToNano(isoFields, nanoInc, roundingMode) {
    return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(isoFields), nanoInc, roundingMode));
}
// Duration (w/o marker system)
// -----------------------------------------------------------------------------
function roundDayTimeDuration(durationFields, largestUnit, smallestUnit, roundingInc, roundingMode) {
    return {
        ...durationFieldDefaults,
        ...balanceDayTimeDuration(durationFields, largestUnit, smallestUnit, roundingInc, roundingMode),
    };
}
function balanceDayTimeDuration(durationFields, largestUnit, smallestUnit, roundingInc, roundingMode) {
    const dayTimeNano = durationFieldsToDayTimeNano(durationFields, 6 /* Unit.Day */);
    const roundedLargeNano = roundDayTimeNano(dayTimeNano, smallestUnit, roundingInc, roundingMode);
    return nanoToDurationDayTimeFields(roundedLargeNano, largestUnit);
}
function balanceDayTimeDurationByInc(durationFields, largestUnit, nanoInc, // REQUIRED: not larger than a day
roundingMode) {
    const dayTimeNano = durationFieldsToDayTimeNano(durationFields, largestUnit);
    const roundedLargeNano = roundDayTimeNanoByInc(dayTimeNano, nanoInc, roundingMode);
    return nanoToDurationDayTimeFields(roundedLargeNano, largestUnit);
}
/*
TODO: caller should short-circuit if
  !sign || (smallestUnit === Unit.Nanosecond && roundingInc === 1)
*/
function roundRelativeDuration(durationFields, // must be balanced & top-heavy in day or larger (so, small time-fields)
// ^has sign
endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, 
// marker system...
marker, markerToEpochNano, moveMarker, _diffMarkers) {
    const nudgeFunc = (markerToEpochNano === identity // is zoned?
        ? smallestUnit > 6 /* Unit.Day */
            ? nudgeRelativeDuration
            : smallestUnit === 6 /* Unit.Day */
                ? nudgeDurationDayTime // doesn't worry about DST
                : nudgeRelativeDurationTime // handles DST
        : smallestUnit > 6 /* Unit.Day */
            ? nudgeRelativeDuration
            : nudgeDurationDayTime); // doesn't worry about DST // accepts all units
    let [roundedDurationFields, roundedEpochNano, grewBigUnit] = nudgeFunc(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, 
    // marker system only needed for nudgeRelativeDuration...
    marker, markerToEpochNano, moveMarker);
    // grew a day/week/month/year?
    if (grewBigUnit) {
        roundedDurationFields = bubbleRelativeDuration(roundedDurationFields, roundedEpochNano, largestUnit, Math.max(6 /* Unit.Day */, smallestUnit), 
        // marker system...
        marker, markerToEpochNano, moveMarker);
    }
    return roundedDurationFields;
}
// Rounding Numbers
// -----------------------------------------------------------------------------
function computeNanoInc(smallestUnit, roundingInc) {
    return unitNanoMap[smallestUnit] * roundingInc;
}
function roundByInc(num, inc, roundingMode) {
    return roundWithMode(num / inc, roundingMode) * inc;
}
function roundToMinute(offsetNano) {
    return roundByInc(offsetNano, nanoInMinute, 7 /* RoundingMode.HalfExpand */);
}
function roundDayTimeNano(dayTimeNano, smallestUnit, roundingInc, roundingMode, useDayOrigin) {
    if (smallestUnit === 6 /* Unit.Day */) {
        return [
            roundByInc(totalDayTimeNano(dayTimeNano, 6 /* Unit.Day */), roundingInc, roundingMode),
            0,
        ];
    }
    return roundDayTimeNanoByInc(dayTimeNano, computeNanoInc(smallestUnit, roundingInc), roundingMode, useDayOrigin);
}
function roundDayTimeNanoByInc(dayTimeNano, nanoInc, // REQUIRED: not larger than a day
roundingMode, useDayOrigin) {
    let [days, timeNano] = dayTimeNano;
    if (useDayOrigin && timeNano < 0) {
        timeNano += nanoInUtcDay;
        days -= 1;
    }
    const [dayDelta, roundedTimeNano] = divModFloor(roundByInc(timeNano, nanoInc, roundingMode), nanoInUtcDay);
    return createDayTimeNano(days + dayDelta, roundedTimeNano);
}
function roundWithMode(num, roundingMode) {
    return roundingModeFuncs[roundingMode](num);
}
// Nudge
// -----------------------------------------------------------------------------
/*
These functions actually do the heavy-lifting of rounding to a higher/lower marker,
and return the (day) delta. Also return the (potentially) unbalanced new duration.
*/
function nudgeDurationDayTime(durationFields, // must be balanced & top-heavy in day or larger (so, small time-fields)
endEpochNano, // NOT NEEDED, just for adding result to
largestUnit, smallestUnit, // always <=Day
roundingInc, roundingMode) {
    const sign = queryDurationSign(durationFields);
    const dayTimeNano = durationFieldsToDayTimeNano(durationFields, 6 /* Unit.Day */);
    const roundedDayTimeNano = roundDayTimeNano(dayTimeNano, smallestUnit, roundingInc, roundingMode);
    const nanoDiff = diffDayTimeNanos(dayTimeNano, roundedDayTimeNano);
    const expandedBigUnit = Math.sign(roundedDayTimeNano[0] - dayTimeNano[0]) === sign;
    const roundedDayTimeFields = nanoToDurationDayTimeFields(roundedDayTimeNano, Math.min(largestUnit, 6 /* Unit.Day */));
    const nudgedDurationFields = {
        ...durationFields,
        ...roundedDayTimeFields,
    };
    return [
        nudgedDurationFields,
        addDayTimeNanos(endEpochNano, nanoDiff),
        expandedBigUnit,
    ];
}
/*
Handles crazy DST edge case
Time ONLY. Days must use full-on marker moving
*/
function nudgeRelativeDurationTime(durationFields, // must be balanced & top-heavy in day or larger (so, small time-fields)
endEpochNano, // NOT NEEDED, just for conformance
_largestUnit, smallestUnit, // always <Day
roundingInc, roundingMode, 
// marker system...
marker, markerToEpochNano, moveMarker) {
    const sign = queryDurationSign(durationFields);
    let [dayDelta, timeNano] = givenFieldsToDayTimeNano(durationFields, 5 /* Unit.Hour */, durationFieldNamesAsc);
    const nanoInc = computeNanoInc(smallestUnit, roundingInc);
    let roundedTimeNano = roundByInc(timeNano, nanoInc, roundingMode);
    const [dayEpochNano0, dayEpochNano1] = clampRelativeDuration({ ...durationFields, ...durationTimeFieldDefaults }, 6 /* Unit.Day */, sign, 
    // marker system...
    marker, markerToEpochNano, moveMarker);
    const daySpanEpochNanoseconds = dayTimeNanoToNumber(diffDayTimeNanos(dayEpochNano0, dayEpochNano1));
    const beyondDay = roundedTimeNano - daySpanEpochNanoseconds;
    // TODO: document. somthing to do with rounding a zdt to the next day
    if (!beyondDay || Math.sign(beyondDay) === sign) {
        dayDelta += sign;
        roundedTimeNano = roundByInc(beyondDay, nanoInc, roundingMode);
        endEpochNano = addDayTimeNanoAndNumber(dayEpochNano1, roundedTimeNano);
    }
    else {
        endEpochNano = addDayTimeNanoAndNumber(dayEpochNano0, roundedTimeNano);
    }
    const durationTimeFields = nanoToDurationTimeFields(roundedTimeNano);
    const nudgedDurationFields = {
        ...durationFields,
        ...durationTimeFields,
        days: durationFields.days + dayDelta,
    };
    return [nudgedDurationFields, endEpochNano, Boolean(dayDelta)];
}
function nudgeRelativeDuration(durationFields, // must be balanced & top-heavy in day or larger (so, small time-fields)
endEpochNano, _largestUnit, smallestUnit, // always >Day
roundingInc, roundingMode, 
// marker system...
marker, markerToEpochNano, moveMarker) {
    const sign = queryDurationSign(durationFields);
    const smallestUnitFieldName = durationFieldNamesAsc[smallestUnit];
    const baseDurationFields = clearDurationFields(durationFields, smallestUnit - 1);
    const truncedVal = divTrunc(durationFields[smallestUnitFieldName], roundingInc) * roundingInc;
    baseDurationFields[smallestUnitFieldName] = truncedVal;
    const [epochNano0, epochNano1] = clampRelativeDuration(baseDurationFields, smallestUnit, roundingInc * sign, 
    // marker system...
    marker, markerToEpochNano, moveMarker);
    // usually between 0-1, however can be higher when weeks aren't bounded by months
    const frac = computeEpochNanoFrac(epochNano0, epochNano1, endEpochNano);
    const exactVal = truncedVal + frac * sign * roundingInc;
    const roundedVal = roundByInc(exactVal, roundingInc, roundingMode);
    const expanded = Math.sign(roundedVal - exactVal) === sign;
    baseDurationFields[smallestUnitFieldName] = roundedVal;
    return [
        baseDurationFields,
        expanded ? epochNano1 : epochNano0,
        expanded, // guaranteed to be a big unit because of big smallestUnit
    ];
}
// Bubbling
// (for when larger units might bubble up)
// -----------------------------------------------------------------------------
function bubbleRelativeDuration(durationFields, // must be balanced & top-heavy in day or larger (so, small time-fields)
endEpochNano, largestUnit, smallestUnit, // guaranteed Day/Week/Month/Year
// marker system...
marker, markerToEpochNano, moveMarker) {
    const sign = queryDurationSign(durationFields);
    for (let currentUnit = smallestUnit + 1; currentUnit <= largestUnit; currentUnit++) {
        // if balancing day->month->year, skip weeks
        if (currentUnit === 7 /* Unit.Week */ && largestUnit !== 7 /* Unit.Week */) {
            continue;
        }
        const baseDurationFields = clearDurationFields(durationFields, currentUnit - 1);
        baseDurationFields[durationFieldNamesAsc[currentUnit]] += sign;
        const thresholdEpochNano = markerToEpochNano(moveMarker(marker, baseDurationFields));
        const beyondThreshold = dayTimeNanoToNumber(diffDayTimeNanos(thresholdEpochNano, endEpochNano));
        if (!beyondThreshold || Math.sign(beyondThreshold) === sign) {
            durationFields = baseDurationFields;
        }
        else {
            break;
        }
    }
    return durationFields;
}

const utcTimeZoneId = 'UTC';
const periodDur = secInDay * 60;
const minPossibleTransition = isoArgsToEpochSec(1847);
const maxPossibleTransition = isoArgsToEpochSec(getCurrentYearPlus10());
function getCurrentYearPlus10() {
    const currentDate = /*@__PURE__*/ new Date();
    const currentYear = /*@__PURE__*/ currentDate.getUTCFullYear();
    return currentYear + 10;
}

// High-level
// -----------------------------------------------------------------------------
function formatInstantIso(refineTimeZoneArg, getTimeZoneOps, instantSlots, options) {
    const [timeZoneArg, roundingMode, nanoInc, subsecDigits] = refineInstantDisplayOptions(options);
    const providedTimeZone = timeZoneArg !== undefined;
    const timeZoneOps = getTimeZoneOps(providedTimeZone ? refineTimeZoneArg(timeZoneArg) : utcTimeZoneId);
    return formatEpochNanoIso(providedTimeZone, timeZoneOps, instantSlots.epochNanoseconds, roundingMode, nanoInc, subsecDigits);
}
function formatZonedDateTimeIso(getTimeZoneOps, zonedDateTimeSlots0, options) {
    return formatZonedEpochNanoIso(getTimeZoneOps, zonedDateTimeSlots0.calendar, zonedDateTimeSlots0.timeZone, zonedDateTimeSlots0.epochNanoseconds, ...refineZonedDateTimeDisplayOptions(options));
}
function formatPlainDateTimeIso(plainDateTimeSlots0, options) {
    return formatDateTimeIso(plainDateTimeSlots0.calendar, plainDateTimeSlots0, ...refineDateTimeDisplayOptions(options));
}
function formatPlainDateIso(plainDateSlots, options) {
    return formatDateIso(plainDateSlots.calendar, plainDateSlots, refineDateDisplayOptions(options));
}
function formatPlainYearMonthIso(plainYearMonthSlots, options) {
    return formatDateLikeIso(plainYearMonthSlots.calendar, formatIsoYearMonthFields, plainYearMonthSlots, refineDateDisplayOptions(options));
}
function formatPlainMonthDayIso(plainMonthDaySlots, options) {
    return formatDateLikeIso(plainMonthDaySlots.calendar, formatIsoMonthDayFields, plainMonthDaySlots, refineDateDisplayOptions(options));
}
function formatPlainTimeIso(slots, options) {
    return formatTimeIso(slots, ...refineTimeDisplayOptions(options));
}
function formatDurationIso(slots, options) {
    const [roundingMode, nanoInc, subsecDigits] = refineTimeDisplayOptions(options, 3 /* Unit.Second */);
    // for performance AND for not losing precision when no rounding
    if (nanoInc > 1) {
        slots = {
            ...slots,
            ...balanceDayTimeDurationByInc(slots, Math.min(getLargestDurationUnit(slots), 6 /* Unit.Day */), nanoInc, roundingMode),
        };
    }
    return formatDurationFields(slots, subsecDigits);
}
// Medium-Level (receives refined options, also for formatDateLikeIso meta)
// -----------------------------------------------------------------------------
function formatEpochNanoIso(providedTimeZone, timeZoneOps, epochNano, roundingMode, nanoInc, subsecDigits) {
    epochNano = roundDayTimeNanoByInc(epochNano, nanoInc, roundingMode, true);
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNano);
    const isoFields = epochNanoToIso(epochNano, offsetNano);
    return (formatIsoDateTimeFields(isoFields, subsecDigits) +
        (providedTimeZone ? formatOffsetNano(roundToMinute(offsetNano)) : 'Z'));
}
function formatZonedEpochNanoIso(getTimeZoneOps, calendarSlot, timeZoneSlot, epochNano, calendarDisplay, timeZoneDisplay, offsetDisplay, roundingMode, nanoInc, subsecDigits) {
    epochNano = roundDayTimeNanoByInc(epochNano, nanoInc, roundingMode, true);
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNano);
    const isoFields = epochNanoToIso(epochNano, offsetNano);
    return (formatIsoDateTimeFields(isoFields, subsecDigits) +
        formatOffsetNano(roundToMinute(offsetNano), offsetDisplay) +
        formatTimeZone(timeZoneSlot, timeZoneDisplay) +
        formatCalendar(calendarSlot, calendarDisplay));
}
function formatDateTimeIso(calendarIdLike, isoFields, calendarDisplay, roundingMode, nanoInc, subsecDigits) {
    const roundedIsoFields = roundDateTimeToNano(isoFields, nanoInc, roundingMode);
    return (formatIsoDateTimeFields(roundedIsoFields, subsecDigits) +
        formatCalendar(calendarIdLike, calendarDisplay));
}
function formatDateIso(calendarIdLike, isoFields, calendarDisplay) {
    return (formatIsoDateFields(isoFields) +
        formatCalendar(calendarIdLike, calendarDisplay));
}
function formatDateLikeIso(calendarIdLike, formatSimple, isoFields, calendarDisplay) {
    const calendarId = getId(calendarIdLike);
    const showCalendar = calendarDisplay > 1 /* CalendarDisplay.Never */ || // critical or always
        (calendarDisplay === 0 /* CalendarDisplay.Auto */ && calendarId !== isoCalendarId);
    if (calendarDisplay === 1 /* CalendarDisplay.Never */) {
        if (calendarId === isoCalendarId) {
            return formatSimple(isoFields);
        }
        return formatIsoDateFields(isoFields);
    }
    if (showCalendar) {
        return (formatIsoDateFields(isoFields) +
            formatCalendarId(calendarId, calendarDisplay === 2 /* CalendarDisplay.Critical */));
    }
    return formatSimple(isoFields);
}
function formatTimeIso(fields, roundingMode, nanoInc, subsecDigits) {
    return formatIsoTimeFields(roundTimeToNano(fields, nanoInc, roundingMode)[0], subsecDigits);
}
function formatDurationFields(durationFields, // already balanced
subsecDigits) {
    const sign = queryDurationSign(durationFields);
    const abs = sign === -1 ? negateDurationFields(durationFields) : durationFields;
    const { hours, minutes } = abs;
    const [wholeSeconds, subsecNano] = dayTimeNanoToNumberRemainder(givenFieldsToDayTimeNano(abs, 3 /* Unit.Second */, durationFieldNamesAsc), nanoInSec);
    const subsecNanoString = formatSubsecNano(subsecNano, subsecDigits);
    const forceSeconds = 
    // a numeric subsecDigits specified?
    // allow `undefined` in comparison - will evaluate to false
    subsecDigits >= 0 ||
        // completely empty? display 'PT0S'
        !sign ||
        subsecNanoString;
    return ((sign < 0 ? '-' : '') +
        'P' +
        formatDurationFragments({
            'Y': formatNumberUnscientific(abs.years),
            'M': formatNumberUnscientific(abs.months),
            'W': formatNumberUnscientific(abs.weeks),
            'D': formatNumberUnscientific(abs.days),
        }) +
        (hours || minutes || wholeSeconds || forceSeconds
            ? 'T' +
                formatDurationFragments({
                    'H': formatNumberUnscientific(hours),
                    'M': formatNumberUnscientific(minutes),
                    'S': formatNumberUnscientific(wholeSeconds, forceSeconds) +
                        subsecNanoString,
                })
            : ''));
}
/*
Values are guaranteed to be non-negative
*/
function formatDurationFragments(fragObj) {
    const parts = [];
    for (const fragName in fragObj) {
        const fragVal = fragObj[fragName];
        if (fragVal) {
            parts.push(fragVal, fragName);
        }
    }
    return parts.join('');
}
// Low-Level (Rounding already happened. Just fields)
// -----------------------------------------------------------------------------
function formatIsoDateTimeFields(isoDateTimeFields, subsecDigits) {
    return (formatIsoDateFields(isoDateTimeFields) +
        'T' +
        formatIsoTimeFields(isoDateTimeFields, subsecDigits));
}
function formatIsoDateFields(isoDateFields) {
    return (formatIsoYearMonthFields(isoDateFields) +
        '-' +
        padNumber2(isoDateFields.isoDay));
}
function formatIsoYearMonthFields(isoDateFields) {
    const { isoYear } = isoDateFields;
    return ((isoYear < 0 || isoYear > 9999
        ? getSignStr(isoYear) + padNumber(6, Math.abs(isoYear))
        : padNumber(4, isoYear)) +
        '-' +
        padNumber2(isoDateFields.isoMonth));
}
function formatIsoMonthDayFields(isoDateFields) {
    return (padNumber2(isoDateFields.isoMonth) + '-' + padNumber2(isoDateFields.isoDay));
}
function formatIsoTimeFields(isoTimeFields, subsecDigits) {
    const parts = [
        padNumber2(isoTimeFields.isoHour),
        padNumber2(isoTimeFields.isoMinute),
    ];
    if (subsecDigits !== -1) {
        // show seconds?
        parts.push(padNumber2(isoTimeFields.isoSecond) +
            formatSubsec(isoTimeFields.isoMillisecond, isoTimeFields.isoMicrosecond, isoTimeFields.isoNanosecond, subsecDigits));
    }
    return parts.join(':');
}
function formatOffsetNano(offsetNano, offsetDisplay = 0 /* OffsetDisplay.Auto */) {
    if (offsetDisplay === 1 /* OffsetDisplay.Never */) {
        return '';
    }
    const [hour, nanoRemainder0] = divModFloor(Math.abs(offsetNano), nanoInHour);
    const [minute, nanoRemainder1] = divModFloor(nanoRemainder0, nanoInMinute);
    const [second, nanoRemainder2] = divModFloor(nanoRemainder1, nanoInSec);
    return (getSignStr(offsetNano) +
        padNumber2(hour) +
        ':' +
        padNumber2(minute) +
        (second || nanoRemainder2
            ? ':' + padNumber2(second) + formatSubsecNano(nanoRemainder2)
            : ''));
}
// TimeZone / Calendar
// -----------------------------------------------------------------------------
function formatTimeZone(timeZoneNative, timeZoneDisplay) {
    if (timeZoneDisplay !== 1 /* TimeZoneDisplay.Never */) {
        return ('[' +
            (timeZoneDisplay === 2 /* TimeZoneDisplay.Critical */ ? '!' : '') +
            getId(timeZoneNative) +
            ']');
    }
    return '';
}
function formatCalendar(calendarIdLike, calendarDisplay) {
    if (calendarDisplay !== 1 /* CalendarDisplay.Never */) {
        const calendarId = getId(calendarIdLike);
        if (calendarDisplay > 1 /* CalendarDisplay.Never */ || // critical or always
            (calendarDisplay === 0 /* CalendarDisplay.Auto */ && calendarId !== isoCalendarId)) {
            return formatCalendarId(calendarId, calendarDisplay === 2 /* CalendarDisplay.Critical */);
        }
    }
    return '';
}
function formatCalendarId(calendarId, isCritical) {
    return '[' + (isCritical ? '!' : '') + 'u-ca=' + calendarId + ']';
}
// Utils
// -----------------------------------------------------------------------------
function formatSubsec(isoMillisecond, isoMicrosecond, isoNanosecond, subsecDigits) {
    return formatSubsecNano(isoMillisecond * nanoInMilli + isoMicrosecond * nanoInMicro + isoNanosecond, subsecDigits);
}
const trailingZerosRE = /0+$/;
function formatSubsecNano(totalNano, subsecDigits) {
    let s = padNumber(9, totalNano);
    s =
        subsecDigits === undefined
            ? s.replace(trailingZerosRE, '')
            : s.slice(0, subsecDigits);
    return s ? '.' + s : '';
}
function getSignStr(num) {
    return num < 0 ? '-' : '+';
}
/*
Only good at non-negative numbers, because of HACK
*/
function formatNumberUnscientific(n, force) {
    if (!n && !force) {
        return ''; // TODO: rename this whole func
    }
    // avoid outputting scientific notation
    // https://stackoverflow.com/a/50978675/96342
    return n.toLocaleString('fullwide', { useGrouping: false });
}

// ISO <-> Epoch conversions (on passed-in instances)
// -----------------------------------------------------------------------------
function zonedEpochNanoToIso(timeZoneOps, epochNano) {
    const offsetNano = timeZoneOps.getOffsetNanosecondsFor(epochNano);
    return epochNanoToIso(epochNano, offsetNano);
}
const zonedEpochSlotsToIso = createLazyGenerator(_zonedEpochSlotsToIso, WeakMap);
function _zonedEpochSlotsToIso(slots, // goes first because key
getTimeZoneOps) {
    const { epochNanoseconds } = slots;
    const timeZoneOps = isTimeZoneOffsetOps(getTimeZoneOps)
        ? getTimeZoneOps
        : getTimeZoneOps(slots.timeZone);
    const offsetNanoseconds = timeZoneOps.getOffsetNanosecondsFor(epochNanoseconds);
    const isoDateTimeFields = epochNanoToIso(epochNanoseconds, offsetNanoseconds);
    return {
        calendar: slots.calendar,
        ...isoDateTimeFields,
        offsetNanoseconds,
    };
}
function buildZonedIsoFields(getTimeZoneOps, zonedDateTimeSlots) {
    const isoFields = zonedEpochSlotsToIso(zonedDateTimeSlots, getTimeZoneOps);
    return {
        calendar: zonedDateTimeSlots.calendar,
        ...pluckProps(isoDateTimeFieldNamesAlpha, isoFields),
        offset: formatOffsetNano(isoFields.offsetNanoseconds),
        timeZone: zonedDateTimeSlots.timeZone,
    };
}
function getMatchingInstantFor(timeZoneOps, isoFields, offsetNano, offsetDisambig = 0 /* OffsetDisambig.Reject */, epochDisambig = 0 /* EpochDisambig.Compat */, epochFuzzy, hasZ) {
    if (offsetNano !== undefined && offsetDisambig === 1 /* OffsetDisambig.Use */) {
        // we ALWAYS use Z as a zero offset
        if (offsetDisambig === 1 /* OffsetDisambig.Use */ || hasZ) {
            return isoToEpochNanoWithOffset(isoFields, offsetNano);
        }
    }
    const possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields);
    if (offsetNano !== undefined && offsetDisambig !== 3 /* OffsetDisambig.Ignore */) {
        const matchingEpochNano = findMatchingEpochNano(possibleEpochNanos, isoFields, offsetNano, epochFuzzy);
        if (matchingEpochNano !== undefined) {
            return matchingEpochNano;
        }
        if (offsetDisambig === 0 /* OffsetDisambig.Reject */) {
            throw new RangeError(invalidOffsetForTimeZone);
        }
        // else (offsetDisambig === 'prefer') ...
    }
    if (hasZ) {
        return isoToEpochNano(isoFields);
    }
    return getSingleInstantFor(timeZoneOps, isoFields, epochDisambig, possibleEpochNanos);
}
function getSingleInstantFor(timeZoneOps, isoFields, disambig = 0 /* EpochDisambig.Compat */, possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(isoFields)) {
    if (possibleEpochNanos.length === 1) {
        return possibleEpochNanos[0];
    }
    if (disambig === 1 /* EpochDisambig.Reject */) {
        throw new RangeError(ambigOffset);
    }
    // within a transition that jumps back
    // ('compatible' means 'earlier')
    if (possibleEpochNanos.length) {
        return possibleEpochNanos[disambig === 3 /* EpochDisambig.Later */ ? 1 : 0 // 'earlier' and 'compatible'
        ];
    }
    // within a transition that jumps forward...
    // ('compatible' means 'later')
    const zonedEpochNano = isoToEpochNano(isoFields);
    const gapNano = computeGapNear(timeZoneOps, zonedEpochNano);
    const shiftNano = gapNano * (disambig === 2 /* EpochDisambig.Earlier */ ? -1 : 1); // 'later' or 'compatible'
    possibleEpochNanos = timeZoneOps.getPossibleInstantsFor(epochNanoToIso(zonedEpochNano, shiftNano));
    return possibleEpochNanos[disambig === 2 /* EpochDisambig.Earlier */ ? 0 : possibleEpochNanos.length - 1 // 'later' or 'compatible'
    ];
}
function findMatchingEpochNano(possibleEpochNanos, isoDateTimeFields, offsetNano, fuzzy) {
    const zonedEpochNano = isoToEpochNano(isoDateTimeFields);
    if (fuzzy) {
        offsetNano = roundToMinute(offsetNano);
    }
    for (const possibleEpochNano of possibleEpochNanos) {
        let possibleOffsetNano = dayTimeNanoToNumber(diffDayTimeNanos(possibleEpochNano, zonedEpochNano));
        if (fuzzy) {
            possibleOffsetNano = roundToMinute(possibleOffsetNano);
        }
        if (possibleOffsetNano === offsetNano) {
            return possibleEpochNano;
        }
    }
}
function computeGapNear(timeZoneOps, zonedEpochNano) {
    const startOffsetNano = timeZoneOps.getOffsetNanosecondsFor(addDayTimeNanoAndNumber(zonedEpochNano, -nanoInUtcDay));
    const endOffsetNano = timeZoneOps.getOffsetNanosecondsFor(addDayTimeNanoAndNumber(zonedEpochNano, nanoInUtcDay));
    return endOffsetNano - startOffsetNano;
}
// Computations (on passed-in instances)
// -----------------------------------------------------------------------------
function computeStartOfDay(getTimeZoneOps, zonedDateTimeSlots) {
    let { epochNanoseconds, timeZone, calendar } = zonedDateTimeSlots;
    const timeZoneOps = getTimeZoneOps(timeZone);
    const isoFields = {
        ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
        ...isoTimeFieldDefaults,
    };
    epochNanoseconds = getMatchingInstantFor(timeZoneOps, isoFields, undefined, // offsetNanoseconds
    0 /* OffsetDisambig.Reject */, 0 /* EpochDisambig.Compat */, true);
    return createZonedDateTimeSlots(epochNanoseconds, timeZone, calendar);
}
function computeHoursInDay(getTimeZoneOps, zonedDateTimeSlots) {
    const timeZoneOps = getTimeZoneOps(zonedDateTimeSlots.timeZone);
    return (computeNanosecondsInDay(timeZoneOps, zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps)) / nanoInHour);
}
function computeNanosecondsInDay(timeZoneOps, isoFields) {
    isoFields = { ...isoFields, ...isoTimeFieldDefaults };
    // TODO: have getSingleInstantFor accept IsoDateFields?
    const epochNano0 = getSingleInstantFor(timeZoneOps, {
        ...isoFields,
        ...isoTimeFieldDefaults,
    });
    const epochNano1 = getSingleInstantFor(timeZoneOps, {
        ...moveByIsoDays(isoFields, 1),
        ...isoTimeFieldDefaults,
    });
    const nanoInDay = dayTimeNanoToNumber(diffDayTimeNanos(epochNano0, epochNano1));
    if (nanoInDay <= 0) {
        throw new RangeError(invalidProtocolResults); // 'Bad nanoseconds in day'
    }
    return nanoInDay;
}
// Utils
// -----------------------------------------------------------------------------
function validateTimeZoneOffset(offsetNano) {
    if (Math.abs(offsetNano) >= nanoInUtcDay) {
        throw new RangeError(outOfBoundsOffset);
    }
    return offsetNano;
}
function isTimeZoneOffsetOps(input) {
    return input.getOffsetNanosecondsFor;
}

// High-Level
// -----------------------------------------------------------------------------
function moveInstant(doSubtract, instantSlots, durationSlots) {
    return createInstantSlots(moveEpochNano(instantSlots.epochNanoseconds, doSubtract ? negateDurationFields(durationSlots) : durationSlots));
}
function moveZonedDateTime(getCalendarOps, getTimeZoneOps, doSubtract, zonedDateTimeSlots, durationSlots, options = Object.create(null)) {
    // correct calling order. switch moveZonedEpochNano arg order?
    const timeZoneOps = getTimeZoneOps(zonedDateTimeSlots.timeZone);
    const calendarOps = getCalendarOps(zonedDateTimeSlots.calendar);
    const movedEpochNanoseconds = moveZonedEpochNano(calendarOps, timeZoneOps, zonedDateTimeSlots.epochNanoseconds, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options);
    return {
        ...zonedDateTimeSlots,
        epochNanoseconds: movedEpochNanoseconds,
    };
}
function movePlainDateTime(getCalendarOps, doSubtract, plainDateTimeSlots, durationSlots, options = Object.create(null)) {
    return createPlainDateTimeSlots({
        ...plainDateTimeSlots,
        ...moveDateTime(getCalendarOps(plainDateTimeSlots.calendar), plainDateTimeSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options),
    });
}
function movePlainDate(getCalendarOps, doSubtract, plainDateSlots, durationSlots, options) {
    return {
        ...plainDateSlots,
        ...moveDateEfficient(getCalendarOps(plainDateSlots.calendar), plainDateSlots, doSubtract ? negateDurationFields(durationSlots) : durationSlots, options),
    };
}
function movePlainYearMonth(getCalendarOps, doSubtract, plainYearMonthSlots, durationFields, options = Object.create(null)) {
    const calendarSlot = plainYearMonthSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    let isoDateFields = moveToMonthStart(calendarOps, plainYearMonthSlots);
    if (doSubtract) {
        durationFields = negateDuration(durationFields);
    }
    // if moving backwards in time, set to last day of month
    if (queryDurationSign(durationFields) < 0) {
        isoDateFields = calendarOps.dateAdd(isoDateFields, {
            ...durationFieldDefaults,
            months: 1,
        });
        isoDateFields = moveByIsoDays(isoDateFields, -1);
    }
    const movedIsoDateFields = calendarOps.dateAdd(isoDateFields, durationFields, options);
    return createPlainYearMonthSlots(moveToMonthStart(calendarOps, movedIsoDateFields), calendarSlot);
}
function movePlainTime(doSubtract, slots, durationSlots) {
    return createPlainTimeSlots(moveTime(slots, doSubtract ? negateDurationFields(durationSlots) : durationSlots)[0]);
}
// Low-Level
// -----------------------------------------------------------------------------
function moveEpochNano(epochNano, durationFields) {
    return checkEpochNanoInBounds(addDayTimeNanos(epochNano, durationTimeFieldsToLargeNanoStrict(durationFields)));
}
function moveZonedEpochNano(calendarOps, timeZoneOps, epochNano, durationFields, options) {
    const dayTimeNano = durationFieldsToDayTimeNano(durationFields, 5 /* Unit.Hour */); // better name: timed nano
    if (!durationHasDateParts(durationFields)) {
        epochNano = addDayTimeNanos(epochNano, dayTimeNano);
        refineOverflowOptions(options); // for validation only
    }
    else {
        const isoDateTimeFields = zonedEpochNanoToIso(timeZoneOps, epochNano);
        const movedIsoDateFields = moveDateEfficient(calendarOps, isoDateTimeFields, {
            ...durationFields, // date parts
            ...durationTimeFieldDefaults, // time parts
        }, options);
        const movedIsoDateTimeFields = {
            ...movedIsoDateFields, // date parts (could be a superset)
            ...pluckProps(isoTimeFieldNamesAsc, isoDateTimeFields), // time parts
            calendar: isoCalendarId, // NOT USED but whatever
        };
        epochNano = addDayTimeNanos(getSingleInstantFor(timeZoneOps, movedIsoDateTimeFields), dayTimeNano);
    }
    return checkEpochNanoInBounds(epochNano);
}
function moveDateTime(calendarOps, isoDateTimeFields, durationFields, options) {
    // could have over 24 hours in certain zones
    const [movedIsoTimeFields, dayDelta] = moveTime(isoDateTimeFields, durationFields);
    const movedIsoDateFields = moveDateEfficient(calendarOps, isoDateTimeFields, // only date parts will be used
    {
        ...durationFields, // date parts
        ...durationTimeFieldDefaults, // time parts (zero-out so no balancing-up to days)
        days: durationFields.days + dayDelta,
    }, options);
    return checkIsoDateTimeInBounds({
        ...movedIsoDateFields,
        ...movedIsoTimeFields,
    });
}
/*
Skips calendar if moving days only
*/
function moveDateEfficient(calendarOps, isoDateFields, durationFields, options) {
    if (durationFields.years || durationFields.months || durationFields.weeks) {
        return calendarOps.dateAdd(isoDateFields, durationFields, options);
    }
    refineOverflowOptions(options); // for validation only
    const days = durationFields.days +
        givenFieldsToDayTimeNano(durationFields, 5 /* Unit.Hour */, durationFieldNamesAsc)[0];
    if (days) {
        return checkIsoDateInBounds(moveByIsoDays(isoDateFields, days));
    }
    return isoDateFields;
}
function moveToMonthStart(calendarOps, isoFields) {
    return moveByIsoDays(isoFields, 1 - calendarOps.day(isoFields));
}
function moveTime(isoFields, durationFields) {
    const [durDays, durTimeNano] = givenFieldsToDayTimeNano(durationFields, 5 /* Unit.Hour */, durationFieldNamesAsc);
    const [newIsoFields, overflowDays] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(isoFields) + durTimeNano);
    return [newIsoFields, durDays + overflowDays];
}
// Native
// -----------------------------------------------------------------------------
function nativeDateAdd(isoDateFields, durationFields, options) {
    const overflow = refineOverflowOptions(options);
    let { years, months, weeks, days } = durationFields;
    let epochMilli;
    // convert time fields to days
    days += givenFieldsToDayTimeNano(durationFields, 5 /* Unit.Hour */, durationFieldNamesAsc)[0];
    if (years || months) {
        let [year, month, day] = this.dateParts(isoDateFields);
        if (years) {
            const [monthCodeNumber, isLeapMonth] = this.monthCodeParts(year, month);
            year += years;
            month = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, this.leapMonth(year));
            month = clampEntity('month', month, 1, this.monthsInYearPart(year), overflow);
        }
        if (months) {
            [year, month] = this.monthAdd(year, month, months);
        }
        day = clampEntity('day', day, 1, this.daysInMonthParts(year, month), overflow);
        epochMilli = this.epochMilli(year, month, day);
    }
    else if (weeks || days) {
        epochMilli = isoToEpochMilli(isoDateFields);
    }
    else {
        return isoDateFields;
    }
    epochMilli += (weeks * isoDaysInWeek + days) * milliInDay;
    return checkIsoDateInBounds(epochMilliToIso(epochMilli));
}
// ISO / Intl Utils
// -----------------------------------------------------------------------------
function isoMonthAdd(year, month, monthDelta) {
    year += divTrunc(monthDelta, isoMonthsInYear);
    month += modTrunc(monthDelta, isoMonthsInYear);
    if (month < 1) {
        year--;
        month += isoMonthsInYear;
    }
    else if (month > isoMonthsInYear) {
        year++;
        month -= isoMonthsInYear;
    }
    return [year, month];
}
function intlMonthAdd(year, month, monthDelta) {
    if (monthDelta) {
        month += monthDelta;
        if (monthDelta < 0) {
            if (month < Number.MIN_SAFE_INTEGER) {
                throw new RangeError(outOfBoundsDate);
            }
            while (month < 1) {
                month += computeIntlMonthsInYear.call(this, --year);
            }
        }
        else {
            if (month > Number.MAX_SAFE_INTEGER) {
                throw new RangeError(outOfBoundsDate);
            }
            let monthsInYear;
            while (month > (monthsInYear = computeIntlMonthsInYear.call(this, year))) {
                month -= monthsInYear;
                year++;
            }
        }
    }
    return [year, month];
}
function moveByIsoDays(isoDateFields, days) {
    if (days) {
        isoDateFields = epochMilliToIso(isoToEpochMilli(isoDateFields) + days * milliInDay);
    }
    return isoDateFields;
}

function createMarkerSystem(getCalendarOps, getTimeZoneOps, markerSlots) {
    const { calendar, timeZone, epochNanoseconds } = markerSlots;
    const calendarOps = getCalendarOps(calendar);
    if (epochNanoseconds) {
        const timeZoneOps = getTimeZoneOps(timeZone);
        return [
            epochNanoseconds,
            identity,
            bindArgs(moveZonedEpochNano, calendarOps, timeZoneOps),
            bindArgs(diffZonedEpochNanoExact, calendarOps, timeZoneOps),
        ];
    }
    return [
        { ...markerSlots, ...isoTimeFieldDefaults },
        isoToEpochNano,
        bindArgs(moveDateTime, calendarOps),
        bindArgs(diffDateTimesExact, calendarOps),
    ];
}
/*
Rebalances duration(s)
*/
function spanDuration(durationFields0, durationFields1, // HACKy
largestUnit, // TODO: more descrimination?
// marker system...
marker, markerToEpochNano, moveMarker, diffMarkers) {
    let endMarker = moveMarker(marker, durationFields0);
    // better way to do this?
    if (durationFields1) {
        endMarker = moveMarker(endMarker, durationFields1);
    }
    const balancedDuration = diffMarkers(marker, endMarker, largestUnit);
    return [balancedDuration, markerToEpochNano(endMarker)];
}
// Adding
// -----------------------------------------------------------------------------
function addDurations(refineRelativeTo, getCalendarOps, getTimeZoneOps, doSubtract, slots, otherSlots, options) {
    const normalOptions = normalizeOptions(options);
    const markerSlots = refineRelativeTo(normalOptions.relativeTo);
    const largestUnit = Math.max(getLargestDurationUnit(slots), getLargestDurationUnit(otherSlots));
    if (largestUnit < 6 /* Unit.Day */ ||
        (largestUnit === 6 /* Unit.Day */ &&
            // has uniform days?
            !(markerSlots && markerSlots.epochNanoseconds))) {
        return createDurationSlots(addDayTimeDurations(slots, otherSlots, largestUnit, doSubtract));
    }
    if (!markerSlots) {
        throw new RangeError(missingRelativeTo);
    }
    if (doSubtract) {
        otherSlots = negateDurationFields(otherSlots); // !!!
    }
    const markerSystem = createMarkerSystem(getCalendarOps, getTimeZoneOps, markerSlots);
    return createDurationSlots(spanDuration(slots, otherSlots, largestUnit, ...markerSystem)[0]);
}
function addDayTimeDurations(a, b, largestUnit, doSubtract) {
    const dayTimeNano0 = durationFieldsToDayTimeNano(a, 6 /* Unit.Day */);
    const dayTimeNano1 = durationFieldsToDayTimeNano(b, 6 /* Unit.Day */);
    const combined = addDayTimeNanos(dayTimeNano0, dayTimeNano1, doSubtract ? -1 : 1);
    if (!Number.isFinite(combined[0])) {
        throw new RangeError(outOfBoundsDate);
    }
    return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(combined, largestUnit),
    };
}
// Rounding (with marker system)
// -----------------------------------------------------------------------------
function roundDuration(refineRelativeTo, getCalendarOps, getTimeZoneOps, slots, options) {
    const durationLargestUnit = getLargestDurationUnit(slots);
    const [largestUnit, smallestUnit, roundingInc, roundingMode, markerSlots] = refineDurationRoundOptions(options, durationLargestUnit, refineRelativeTo);
    const maxLargestUnit = Math.max(durationLargestUnit, largestUnit);
    if (maxLargestUnit < 6 /* Unit.Day */ ||
        (maxLargestUnit === 6 /* Unit.Day */ &&
            // has uniform days?
            !(markerSlots && markerSlots.epochNanoseconds))) {
        return createDurationSlots(roundDayTimeDuration(slots, largestUnit, // guaranteed <= maxLargestUnit <= Unit.Day
        smallestUnit, roundingInc, roundingMode));
    }
    if (!markerSlots) {
        throw new RangeError(missingRelativeTo);
    }
    const markerSystem = createMarkerSystem(getCalendarOps, getTimeZoneOps, markerSlots);
    let transplantedWeeks = 0;
    if (slots.weeks && smallestUnit === 7 /* Unit.Week */) {
        transplantedWeeks = slots.weeks;
        slots = { ...slots, weeks: 0 };
    }
    let [balancedDuration, endEpochNano] = spanDuration(slots, undefined, largestUnit, ...markerSystem);
    const origSign = queryDurationSign(slots);
    const balancedSign = queryDurationSign(balancedDuration);
    if (origSign && balancedSign && origSign !== balancedSign) {
        throw new RangeError(invalidProtocolResults);
    }
    if (balancedSign &&
        !(smallestUnit === 0 /* Unit.Nanosecond */ && roundingInc === 1)) {
        balancedDuration = roundRelativeDuration(balancedDuration, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, ...markerSystem);
    }
    balancedDuration.weeks += transplantedWeeks; // HACK (mutating)
    return createDurationSlots(balancedDuration);
}
// Sign / Abs / Blank
// -----------------------------------------------------------------------------
function negateDuration(slots) {
    return createDurationSlots(negateDurationFields(slots));
}
function negateDurationFields(fields) {
    const res = {};
    for (const fieldName of durationFieldNamesAsc) {
        res[fieldName] = fields[fieldName] * -1 || 0;
    }
    return res;
}
function absDuration(slots) {
    return createDurationSlots(absDurationFields(slots));
}
function absDurationFields(fields) {
    if (queryDurationSign(fields) === -1) {
        return negateDurationFields(fields);
    }
    return fields;
}
function queryDurationBlank(durationFields) {
    return !queryDurationSign(durationFields);
}
const queryDurationSign = createLazyGenerator(computeDurationSign, WeakMap);
function computeDurationSign(fields, fieldNames = durationFieldNamesAsc) {
    let sign = 0;
    for (const fieldName of fieldNames) {
        const fieldSign = Math.sign(fields[fieldName]);
        if (fieldSign) {
            if (sign && sign !== fieldSign) {
                throw new RangeError(forbiddenDurationSigns);
            }
            sign = fieldSign;
        }
    }
    return sign;
}
function checkDurationFields(fields) {
    queryDurationSign(fields); // check and prime cache
    return fields;
}
// Field <-> Nanosecond Conversion
// -----------------------------------------------------------------------------
function durationTimeFieldsToLargeNanoStrict(fields) {
    if (durationHasDateParts(fields)) {
        throw new RangeError(invalidLargeUnits);
    }
    return durationFieldsToDayTimeNano(fields, 5 /* Unit.Hour */);
}
function durationFieldsToDayTimeNano(fields, largestUnit) {
    return givenFieldsToDayTimeNano(fields, largestUnit, durationFieldNamesAsc);
}
function nanoToDurationDayTimeFields(dayTimeNano, largestUnit = 6 /* Unit.Day */) {
    const [days, timeNano] = dayTimeNano;
    const dayTimeFields = nanoToGivenFields(timeNano, largestUnit, durationFieldNamesAsc);
    dayTimeFields[durationFieldNamesAsc[largestUnit]] +=
        days * (nanoInUtcDay / unitNanoMap[largestUnit]);
    if (!Number.isFinite(dayTimeFields[durationFieldNamesAsc[largestUnit]])) {
        throw new RangeError(outOfBoundsDate);
    }
    return dayTimeFields;
}
function nanoToDurationTimeFields(nano, largestUnit = 5 /* Unit.Hour */) {
    return nanoToGivenFields(nano, largestUnit, durationFieldNamesAsc);
}
/*
Returns all units
*/
function clearDurationFields(durationFields, largestUnitToClear) {
    const copy = { ...durationFields };
    for (let unit = 0 /* Unit.Nanosecond */; unit <= largestUnitToClear; unit++) {
        copy[durationFieldNamesAsc[unit]] = 0;
    }
    return copy;
}
// Utils
// -----------------------------------------------------------------------------
function durationHasDateParts(fields) {
    return Boolean(computeDurationSign(fields, durationDateFieldNamesAsc));
}
function getLargestDurationUnit(fields) {
    let unit = 9 /* Unit.Year */;
    for (; unit > 0 /* Unit.Nanosecond */; unit--) {
        if (fields[durationFieldNamesAsc[unit]]) {
            break;
        }
    }
    return unit;
}

const queryNativeTimeZone = createLazyGenerator((slotId) => {
    const essence = getTimeZoneEssence(slotId);
    return typeof essence === 'object'
        ? new IntlTimeZone(essence)
        : new FixedTimeZone(essence || 0);
});
// Fixed
// -----------------------------------------------------------------------------
class FixedTimeZone {
    constructor(offsetNano) {
        this.offsetNano = offsetNano;
    }
    getOffsetNanosecondsFor() {
        return this.offsetNano;
    }
    getPossibleInstantsFor(isoDateTimeFields) {
        return [isoToEpochNanoWithOffset(isoDateTimeFields, this.offsetNano)];
    }
    getTransition() {
        return undefined; // hopefully minifier will remove
    }
}
class IntlTimeZone {
    constructor(format) {
        this.tzStore = createIntlTimeZoneStore(createComputeOffsetSec(format));
    }
    getOffsetNanosecondsFor(epochNano) {
        return this.tzStore.getOffsetSec(epochNanoToSec(epochNano)) * nanoInSec;
    }
    getPossibleInstantsFor(isoFields) {
        const [zonedEpochSec, subsecNano] = isoToEpochSec(isoFields);
        return this.tzStore.getPossibleEpochSec(zonedEpochSec).map((epochSec) => {
            return checkEpochNanoInBounds(addDayTimeNanoAndNumber(numberToDayTimeNano(epochSec, nanoInSec), subsecNano));
        });
    }
    /*
    exclusive for both directions
    */
    getTransition(epochNano, direction) {
        const [epochSec, subsecNano] = epochNanoToSecRemainder(epochNano);
        const resEpochSec = this.tzStore.getTransition(epochSec + (direction > 0 || subsecNano ? 1 : 0), direction);
        if (resEpochSec !== undefined) {
            return numberToDayTimeNano(resEpochSec, nanoInSec);
        }
    }
}
function createIntlTimeZoneStore(computeOffsetSec) {
    // always given startEpochSec/endEpochSec
    const getSample = createLazyGenerator(computeOffsetSec);
    const getSplit = createLazyGenerator(createSplitTuple);
    let minTransition = minPossibleTransition;
    let maxTransition = maxPossibleTransition;
    function getPossibleEpochSec(zonedEpochSec) {
        const wideOffsetSec0 = getOffsetSec(zonedEpochSec - secInDay);
        const wideOffsetSec1 = getOffsetSec(zonedEpochSec + secInDay);
        const wideUtcEpochSec0 = zonedEpochSec - wideOffsetSec0;
        const wideUtcEpochSec1 = zonedEpochSec - wideOffsetSec1; // could move below
        if (wideOffsetSec0 === wideOffsetSec1) {
            return [wideUtcEpochSec0];
        }
        const narrowOffsetSec0 = getOffsetSec(wideUtcEpochSec0);
        const narrowOffsetSec1 = getOffsetSec(wideUtcEpochSec1);
        if (narrowOffsetSec0 === narrowOffsetSec1) {
            return [zonedEpochSec - narrowOffsetSec0];
        }
        // narrow could be too narrow
        if (wideOffsetSec0 > wideOffsetSec1) {
            return [wideUtcEpochSec0, wideUtcEpochSec1];
        }
        return [];
    }
    function getOffsetSec(epochSec) {
        const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition);
        const [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec);
        const startOffsetSec = getSample(startEpochSec);
        const endOffsetSec = getSample(endEpochSec);
        if (startOffsetSec === endOffsetSec) {
            return startOffsetSec;
        }
        const split = getSplit(startEpochSec, endEpochSec);
        return pinch(split, startOffsetSec, endOffsetSec, epochSec);
    }
    /*
    inclusive for positive direction, exclusive for negative
    */
    function getTransition(epochSec, direction) {
        const clampedEpochSec = clampNumber(epochSec, minTransition, maxTransition);
        let [startEpochSec, endEpochSec] = computePeriod(clampedEpochSec);
        const inc = periodDur * direction;
        const inBounds = direction < 0
            ? () => endEpochSec > minTransition ||
                ((minTransition = clampedEpochSec), false)
            : () => startEpochSec < maxTransition ||
                ((maxTransition = clampedEpochSec), false);
        while (inBounds()) {
            const startOffsetSec = getSample(startEpochSec);
            const endOffsetSec = getSample(endEpochSec);
            if (startOffsetSec !== endOffsetSec) {
                const split = getSplit(startEpochSec, endEpochSec);
                pinch(split, startOffsetSec, endOffsetSec);
                const transitionEpochSec = split[0];
                if ((compareNumbers(transitionEpochSec, epochSec) || 1) === direction) {
                    return transitionEpochSec;
                }
            }
            startEpochSec += inc;
            endEpochSec += inc;
        }
    }
    function pinch(split, startOffsetSec, endOffsetSec, forEpochSec) {
        let offsetSec;
        let splitDurSec;
        while ((forEpochSec === undefined ||
            (offsetSec =
                forEpochSec < split[0]
                    ? startOffsetSec
                    : forEpochSec >= split[1]
                        ? endOffsetSec
                        : undefined) === undefined) &&
            (splitDurSec = split[1] - split[0])) {
            const middleEpochSec = split[0] + Math.floor(splitDurSec / 2);
            const middleOffsetSec = computeOffsetSec(middleEpochSec);
            if (middleOffsetSec === endOffsetSec) {
                split[1] = middleEpochSec;
            }
            else {
                // middleOffsetSec === startOffsetSec
                split[0] = middleEpochSec + 1;
            }
        }
        return offsetSec;
    }
    return { getPossibleEpochSec, getOffsetSec, getTransition };
}
function createSplitTuple(startEpochSec, endEpochSec) {
    return [startEpochSec, endEpochSec];
}
function computePeriod(epochSec) {
    const startEpochSec = Math.floor(epochSec / periodDur) * periodDur;
    const endEpochSec = startEpochSec + periodDur;
    return [startEpochSec, endEpochSec];
}
function createComputeOffsetSec(format) {
    return (epochSec) => {
        const intlParts = hashIntlFormatParts(format, epochSec * milliInSec);
        const zonedEpochSec = isoArgsToEpochSec(parseIntlPartsYear(intlParts), parseInt(intlParts.month), parseInt(intlParts.day), parseInt(intlParts.hour), parseInt(intlParts.minute), parseInt(intlParts.second));
        return zonedEpochSec - epochSec;
    };
}

// High-level
// -----------------------------------------------------------------------------
function parseInstant(s) {
    // instead of 'requiring' like other types,
    // coerce, because there's no fromFields, so no need to differentiate param type
    s = toStringViaPrimitive(s);
    const organized = parseDateTimeLike(s);
    if (!organized) {
        throw new RangeError(failedParse(s));
    }
    let offsetNano;
    if (organized.hasZ) {
        offsetNano = 0;
    }
    else if (organized.offset) {
        offsetNano = parseOffsetNano(organized.offset);
    }
    else {
        throw new RangeError(failedParse(s));
    }
    // validate timezone
    if (organized.timeZone) {
        parseOffsetNanoMaybe(organized.timeZone, true); // onlyHourMinute=true
    }
    const epochNanoseconds = isoToEpochNanoWithOffset(checkIsoDateTimeFields(organized), offsetNano);
    return createInstantSlots(epochNanoseconds);
}
function parseZonedOrPlainDateTime(s) {
    const organized = parseDateTimeLike(requireString(s));
    if (!organized) {
        throw new RangeError(failedParse(s));
    }
    if (organized.timeZone) {
        return finalizeZonedDateTime(organized, organized.offset ? parseOffsetNano(organized.offset) : undefined);
    }
    if (organized.hasZ) {
        // PlainDate doesn't support Z
        throw new RangeError(failedParse(s));
    }
    return finalizeDate(organized);
}
function parseZonedDateTime(s, options) {
    const organized = parseDateTimeLike(requireString(s));
    if (!organized || !organized.timeZone) {
        throw new RangeError(failedParse(s));
    }
    const { offset } = organized;
    const offsetNano = offset ? parseOffsetNano(offset) : undefined;
    const [, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
    return finalizeZonedDateTime(organized, offsetNano, // HACK
    offsetDisambig, epochDisambig);
}
/*
`s` already validated as a string
*/
function parseOffsetNano(s) {
    const offsetNano = parseOffsetNanoMaybe(s);
    if (offsetNano === undefined) {
        throw new RangeError(failedParse(s)); // Invalid offset string
    }
    return offsetNano;
}
function parsePlainDateTime(s) {
    const organized = parseDateTimeLike(requireString(s));
    if (!organized || organized.hasZ) {
        throw new RangeError(failedParse(s));
    }
    return createPlainDateTimeSlots(finalizeDateTime(organized));
}
function parsePlainDate(s) {
    const organized = parseDateTimeLike(requireString(s));
    if (!organized || organized.hasZ) {
        throw new RangeError(failedParse(s));
    }
    return createPlainDateSlots(organized.hasTime ? finalizeDateTime(organized) : finalizeDate(organized));
}
function parsePlainYearMonth(getCalendarOps, s) {
    const organized = parseYearMonthOnly(requireString(s));
    if (organized) {
        requireIsoCalendar(organized);
        return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(organized)));
    }
    const isoFields = parsePlainDate(s);
    const calendarOps = getCalendarOps(isoFields.calendar);
    const movedIsoFields = moveToMonthStart(calendarOps, isoFields);
    return createPlainYearMonthSlots({
        ...isoFields, // has calendar
        ...movedIsoFields,
    });
}
function requireIsoCalendar(organized) {
    if (organized.calendar !== isoCalendarId) {
        throw new RangeError(invalidSubstring(organized.calendar));
    }
}
function parsePlainMonthDay(getCalendarOps, s) {
    const organized = parseMonthDayOnly(requireString(s));
    if (organized) {
        requireIsoCalendar(organized);
        return createPlainMonthDaySlots(checkIsoDateFields(organized));
    }
    const dateSlots = parsePlainDate(s);
    const { calendar } = dateSlots;
    const calendarOps = getCalendarOps(calendar);
    // normalize year&month to be as close as possible to epoch
    const [origYear, origMonth, day] = calendarOps.dateParts(dateSlots);
    const [monthCodeNumber, isLeapMonth] = calendarOps.monthCodeParts(origYear, origMonth);
    const [year, month] = calendarOps.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, day); // !HACK
    const isoFields = calendarOps.isoFields(year, month, day);
    return createPlainMonthDaySlots(isoFields, calendar);
}
function parsePlainTime(s) {
    let organized = parseTimeOnly(requireString(s));
    if (!organized) {
        organized = parseDateTimeLike(s);
        if (organized) {
            if (!organized.hasTime) {
                throw new RangeError(failedParse(s)); // Must have time for PlainTime
            }
            if (organized.hasZ) {
                throw new RangeError(invalidSubstring('Z')); // Cannot have Z for PlainTime
            }
            requireIsoCalendar(organized);
        }
        else {
            throw new RangeError(failedParse(s));
        }
    }
    let altParsed;
    if ((altParsed = parseYearMonthOnly(s)) && isIsoDateFieldsValid(altParsed)) {
        throw new RangeError(failedParse(s));
    }
    if ((altParsed = parseMonthDayOnly(s)) && isIsoDateFieldsValid(altParsed)) {
        throw new RangeError(failedParse(s));
    }
    return createPlainTimeSlots(constrainIsoTimeFields(organized, 1 /* Overflow.Reject */));
}
function parseDuration(s) {
    const parsed = parseDurationFields(requireString(s));
    if (!parsed) {
        throw new RangeError(failedParse(s));
    }
    return createDurationSlots(parsed);
}
function parseCalendarId(s) {
    const res = parseDateTimeLike(s) || parseYearMonthOnly(s) || parseMonthDayOnly(s);
    return res ? res.calendar : s;
}
function parseTimeZoneId(s) {
    const parsed = parseDateTimeLike(s);
    return ((parsed &&
        (parsed.timeZone || (parsed.hasZ && utcTimeZoneId) || parsed.offset)) ||
        s);
}
// Finalizing 'organized' structs to slots
// -----------------------------------------------------------------------------
/*
Unlike others, return slots
*/
function finalizeZonedDateTime(organized, offsetNano, offsetDisambig = 0 /* OffsetDisambig.Reject */, epochDisambig = 0 /* EpochDisambig.Compat */) {
    const slotId = resolveTimeZoneId(organized.timeZone);
    const timeZoneImpl = queryNativeTimeZone(slotId);
    const epochNanoseconds = getMatchingInstantFor(timeZoneImpl, checkIsoDateTimeFields(organized), offsetNano, offsetDisambig, epochDisambig, !timeZoneImpl.offsetNano, // not fixed? epochFuzzy
    organized.hasZ);
    return createZonedDateTimeSlots(epochNanoseconds, slotId, resolveCalendarId(organized.calendar));
}
function finalizeDateTime(organized) {
    return resolveSlotsCalendar(checkIsoDateTimeInBounds(checkIsoDateTimeFields(organized)));
}
function finalizeDate(organized) {
    return resolveSlotsCalendar(checkIsoDateInBounds(checkIsoDateFields(organized)));
}
function resolveSlotsCalendar(organized) {
    return {
        ...organized,
        calendar: resolveCalendarId(organized.calendar),
    };
}
// RegExp
// -----------------------------------------------------------------------------
const signRegExpStr = '([+\u2212-])'; // outer captures
const fractionRegExpStr = '(?:[.,](\\d{1,9}))?'; // only afterDecimal captures
const yearMonthRegExpStr = `(?:(?:${signRegExpStr}(\\d{6}))|(\\d{4}))` + // 1:yearSign, 2:yearDigits6, 3:yearDigits4
    '-?(\\d{2})'; // 4:month
const dateRegExpStr = yearMonthRegExpStr + // 1:yearSign, 2:yearDigits6, 3:yearDigits4, 4:month
    '-?(\\d{2})'; // 5:day
const monthDayRegExpStr = '(?:--)?(\\d{2})' + // 1:month
    '-?(\\d{2})'; // 2:day
const timeRegExpStr = '(\\d{2})' + // 1:hour
    '(?::?(\\d{2})' + // 2:minute
    '(?::?(\\d{2})' + // 3:second
    fractionRegExpStr + // 4:afterDecimal
    ')?' +
    ')?';
const offsetRegExpStr = signRegExpStr + // 1:offsetSign
    timeRegExpStr; // 2:hour, 3:minute, 4:second, 5:afterDecimal
const dateTimeRegExpStr = dateRegExpStr + // // 1:yearSign, 2:yearDigits6, 3:yearDigits4, 4:month, 5:day
    '(?:[T ]' +
    timeRegExpStr + // 6:hour, 7:minute, 8:second, 9:afterDecimal
    '(Z|' + // 10:zOrOffset
    offsetRegExpStr + // 11:offsetSign, 12:hour, 13:minute, 14:second, 15:afterDecimal
    ')?' +
    ')?';
// Would _normally_ need to modify to prevent reDoS attack,
// (like https://github.com/moment/moment/pull/6015#issuecomment-1152961973)
// BUT, this regexp is only used directly by annotationRegExp,
// which only ever runs on strings already parsed by annotationsRegExpStr
const annotationRegExpStr = '\\[(!?)([^\\]]*)\\]'; // critical:1, annotation:2
// Limit the number of annotations (maximum 9) to prevet reDoS attack
const annotationsRegExpStr = `((?:${annotationRegExpStr}){0,9})`; // multiple
const yearMonthRegExp = createRegExp(yearMonthRegExpStr + annotationsRegExpStr);
const monthDayRegExp = createRegExp(monthDayRegExpStr + annotationsRegExpStr);
const dateTimeRegExp = createRegExp(dateTimeRegExpStr + annotationsRegExpStr);
const timeRegExp = createRegExp('T?' +
    timeRegExpStr + // 1-4
    '(?:' +
    offsetRegExpStr +
    ')?' + // 5-9
    annotationsRegExpStr);
const offsetRegExp = createRegExp(offsetRegExpStr);
const annotationRegExp = new RegExp(annotationRegExpStr, 'g');
const durationRegExp = createRegExp(`${signRegExpStr}?P` + // 1:sign
    '(\\d+Y)?' + // 2:years
    '(\\d+M)?' + // 3:months
    '(\\d+W)?' + // 4:weeks
    '(\\d+D)?' + // 5:days
    '(?:T' +
    `(?:(\\d+)${fractionRegExpStr}H)?` + // 6:hours, 7:partialHour
    `(?:(\\d+)${fractionRegExpStr}M)?` + // 8:minutes, 9:partialMinute
    `(?:(\\d+)${fractionRegExpStr}S)?` + // 10:seconds, 11:partialSecond
    ')?');
// NOTE: when modifying regexps, check for reDoS vulnerabilities:
// https://devina.io/redos-checker
/*
;[
  yearMonthRegExp,
  monthDayRegExp,
  dateTimeRegExp,
  timeRegExp,
  offsetRegExp,
  // annotationRegExp, // no need to check. see note above
  durationRegExp,
].forEach((re) => console.log(re.source))
*/
// Maybe-parsing
// -----------------------------------------------------------------------------
function parseDateTimeLike(s) {
    const parts = dateTimeRegExp.exec(s);
    return parts ? organizeDateTimeLikeParts(parts) : undefined;
}
function parseYearMonthOnly(s) {
    const parts = yearMonthRegExp.exec(s);
    return parts ? organizeYearMonthParts(parts) : undefined;
}
function parseMonthDayOnly(s) {
    const parts = monthDayRegExp.exec(s);
    return parts ? organizeMonthDayParts(parts) : undefined;
}
function parseTimeOnly(s) {
    const parts = timeRegExp.exec(s);
    return parts
        ? (organizeAnnotationParts(parts[10]), organizeTimeParts(parts)) // validate annotations
        : undefined;
}
function parseDurationFields(s) {
    const parts = durationRegExp.exec(s);
    return parts ? organizeDurationParts(parts) : undefined;
}
function parseOffsetNanoMaybe(s, onlyHourMinute) {
    const parts = offsetRegExp.exec(s);
    return parts ? organizeOffsetParts(parts, onlyHourMinute) : undefined;
}
function organizeDateTimeLikeParts(parts) {
    const zOrOffset = parts[10];
    const hasZ = (zOrOffset || '').toUpperCase() === 'Z';
    return {
        isoYear: organizeIsoYearParts(parts),
        isoMonth: parseInt(parts[4]),
        isoDay: parseInt(parts[5]),
        ...organizeTimeParts(parts.slice(5)), // slice one index before, to similate 0 being whole-match
        ...organizeAnnotationParts(parts[16]),
        hasTime: Boolean(parts[6]),
        hasZ,
        // TODO: figure out a way to pre-process into a number
        // (problems with TimeZone needing the full string?)
        offset: hasZ ? undefined : zOrOffset,
    };
}
/*
Result assumed to be ISO
*/
function organizeYearMonthParts(parts) {
    return {
        isoYear: organizeIsoYearParts(parts),
        isoMonth: parseInt(parts[4]),
        isoDay: 1,
        ...organizeAnnotationParts(parts[5]),
    };
}
function organizeMonthDayParts(parts) {
    return {
        isoYear: isoEpochFirstLeapYear,
        isoMonth: parseInt(parts[1]),
        isoDay: parseInt(parts[2]),
        ...organizeAnnotationParts(parts[3]),
    };
}
function organizeIsoYearParts(parts) {
    const yearSign = parseSign(parts[1]);
    const year = parseInt(parts[2] || parts[3]);
    if (yearSign < 0 && !year) {
        throw new RangeError(invalidSubstring(-0));
    }
    return yearSign * year;
}
function organizeTimeParts(parts) {
    const isoSecond = parseInt0(parts[3]);
    return {
        ...nanoToIsoTimeAndDay(parseSubsecNano(parts[4] || ''))[0],
        isoHour: parseInt0(parts[1]),
        isoMinute: parseInt0(parts[2]),
        isoSecond: isoSecond === 60 ? 59 : isoSecond, // massage leap-second
    };
}
function organizeOffsetParts(parts, onlyHourMinute) {
    const firstSubMinutePart = parts[4] || parts[5];
    if (onlyHourMinute && firstSubMinutePart) {
        throw new RangeError(invalidSubstring(firstSubMinutePart));
    }
    const offsetNanoPos = parseInt0(parts[2]) * nanoInHour +
        parseInt0(parts[3]) * nanoInMinute +
        parseInt0(parts[4]) * nanoInSec +
        parseSubsecNano(parts[5] || '');
    return validateTimeZoneOffset(offsetNanoPos * parseSign(parts[1]));
}
function organizeDurationParts(parts) {
    let hasAny = false;
    let hasAnyFrac = false;
    let leftoverNano = 0;
    let durationFields = {
        ...zipProps(durationFieldNamesAsc, [
            parseUnit(parts[2]),
            parseUnit(parts[3]),
            parseUnit(parts[4]),
            parseUnit(parts[5]),
            parseUnit(parts[6], parts[7], 5 /* Unit.Hour */),
            parseUnit(parts[8], parts[9], 4 /* Unit.Minute */),
            parseUnit(parts[10], parts[11], 3 /* Unit.Second */),
        ]),
        ...nanoToGivenFields(leftoverNano, 2 /* Unit.Millisecond */, durationFieldNamesAsc),
    };
    if (!hasAny) {
        throw new RangeError(noValidFields);
    }
    if (parseSign(parts[1]) < 0) {
        durationFields = negateDurationFields(durationFields);
    }
    return durationFields;
    function parseUnit(wholeStr, fracStr, timeUnit) {
        let leftoverUnits = 0; // from previous round
        let wholeUnits = 0;
        if (timeUnit) {
            [leftoverUnits, leftoverNano] = divModFloor(leftoverNano, unitNanoMap[timeUnit]);
        }
        if (wholeStr !== undefined) {
            if (hasAnyFrac) {
                throw new RangeError(invalidSubstring(wholeStr)); // Fraction must be last one
            }
            wholeUnits = parseIntSafe(wholeStr);
            hasAny = true;
            if (fracStr) {
                // convert seconds to other units
                // more precise version of `frac / nanoInSec * nanoInUnit`
                leftoverNano =
                    parseSubsecNano(fracStr) * (unitNanoMap[timeUnit] / nanoInSec);
                hasAnyFrac = true;
            }
        }
        return leftoverUnits + wholeUnits;
    }
}
function organizeAnnotationParts(s) {
    let calendarIsCritical;
    let timeZoneId;
    const calendarIds = [];
    // iterate through matches
    s.replace(annotationRegExp, (whole, criticalStr, mainStr) => {
        const isCritical = Boolean(criticalStr);
        const [val, name] = mainStr.split('=').reverse();
        if (!name) {
            if (timeZoneId) {
                throw new RangeError(invalidSubstring(whole)); // Cannot specify timeZone multiple times
            }
            timeZoneId = val;
        }
        else if (name === 'u-ca') {
            calendarIds.push(val);
            calendarIsCritical || (calendarIsCritical = isCritical);
        }
        else if (isCritical) {
            throw new RangeError(invalidSubstring(whole)); // Critical annotation not used
        }
        return '';
    });
    if (calendarIds.length > 1 && calendarIsCritical) {
        throw new RangeError(invalidSubstring(s)); // Multiple calendars when one is critical
    }
    return {
        timeZone: timeZoneId,
        calendar: calendarIds[0] || isoCalendarId,
    };
}
// Utils
// -----------------------------------------------------------------------------
function parseSubsecNano(fracStr) {
    return parseInt(fracStr.padEnd(9, '0'));
}
function createRegExp(meat) {
    return new RegExp(`^${meat}$`, 'i');
}
function parseSign(s) {
    return !s || s === '+' ? 1 : -1;
}
function parseInt0(s) {
    return s === undefined ? 0 : parseInt(s);
}
/*
Guaranteed to be non-Infinity (which can happen if number beyond maxint I think)
Only needs to be called when we know RegExp allows infinite repeating character
*/
function parseIntSafe(s) {
    const n = parseInt(s);
    if (!Number.isFinite(n)) {
        throw new RangeError(invalidSubstring(s));
    }
    return n;
}

function resolveTimeZoneId(id) {
    const essence = getTimeZoneEssence(id);
    return typeof essence === 'number'
        ? formatOffsetNano(essence)
        : essence
            ? normalizeNamedTimeZoneId(id)
            : utcTimeZoneId;
}
function getTimeZoneAtomic(id) {
    const essence = getTimeZoneEssence(id);
    return typeof essence === 'number'
        ? essence
        : essence
            ? essence.resolvedOptions().timeZone
            : utcTimeZoneId;
}
/**
 * @returns Undefined means `utcTimeZoneId`
 */
function getTimeZoneEssence(id) {
    id = id.toUpperCase();
    const offsetNano = parseOffsetNanoMaybe(id, true); // onlyHourMinute=true
    if (offsetNano !== undefined) {
        return offsetNano;
    }
    if (id !== utcTimeZoneId) {
        return queryTimeZoneIntlFormat(id);
    }
}
/**
 * @param id Expects uppercase
 */
const queryTimeZoneIntlFormat = createLazyGenerator((id) => new RawDateTimeFormat(standardLocaleId, {
    timeZone: id,
    era: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}));
function normalizeNamedTimeZoneId(id) {
    return id
        .toLowerCase()
        .split('/')
        .map((part, partI) => {
        // abbreviation-like (big parts, like 'ACT' in 'Australia/ACT')
        // OR numeric-offset-like
        // OR Pacific/YAP
        if ((part.length <= 3 || /\d/.test(part)) && !/etc|yap/.test(part)) {
            return part.toUpperCase();
        }
        return part.replace(/baja|dumont|[a-z]+/g, (a, i) => {
            // abbreviation-like (small parts)
            // - starts with 1-or-2-letters?
            // - Knox_IN, NZ-CHAT
            if ((a.length <= 2 && !partI) || a === 'in' || a === 'chat') {
                return a.toUpperCase();
            }
            // word-like
            if (a.length > 2 || !i) {
                return capitalize(a).replace(/island|noronha|murdo|rivadavia|urville/, capitalize);
            }
            // lowercase (au/of/es)
            return a;
        });
    })
        .join('/');
}

// High-Level Compare
// -----------------------------------------------------------------------------
function compareInstants(instantSlots0, instantSlots1) {
    return compareDayTimeNanos(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds);
}
function compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) {
    return compareDayTimeNanos(zonedDateTimeSlots0.epochNanoseconds, zonedDateTimeSlots1.epochNanoseconds);
}
function compareDurations(refineRelativeTo, getCalendarOps, getTimeZoneOps, durationSlots0, durationSlots1, options) {
    const normalOptions = normalizeOptions(options);
    const markerSlots = refineRelativeTo(normalOptions.relativeTo);
    const largestUnit = Math.max(getLargestDurationUnit(durationSlots0), getLargestDurationUnit(durationSlots1));
    // fast-path if fields identical
    if (allPropsEqual(durationFieldNamesAsc, durationSlots0, durationSlots1)) {
        return 0;
    }
    if (largestUnit < 6 /* Unit.Day */ ||
        (largestUnit === 6 /* Unit.Day */ &&
            // has uniform days?
            !(markerSlots && markerSlots.epochNanoseconds))) {
        return compareDayTimeNanos(givenFieldsToDayTimeNano(durationSlots0, 6 /* Unit.Day */, durationFieldNamesAsc), givenFieldsToDayTimeNano(durationSlots1, 6 /* Unit.Day */, durationFieldNamesAsc));
    }
    if (!markerSlots) {
        throw new RangeError(missingRelativeTo);
    }
    const [marker, markerToEpochNano, moveMarker] = createMarkerSystem(getCalendarOps, getTimeZoneOps, markerSlots);
    return compareDayTimeNanos(markerToEpochNano(moveMarker(marker, durationSlots0)), markerToEpochNano(moveMarker(marker, durationSlots1)));
}
// Low-Level Compare
// -----------------------------------------------------------------------------
function compareIsoDateTimeFields(isoFields0, isoFields1) {
    return (compareIsoDateFields(isoFields0, isoFields1) ||
        compareIsoTimeFields(isoFields0, isoFields1));
}
function compareIsoDateFields(isoFields0, isoFields1) {
    return compareNumbers(isoToEpochMilli(isoFields0), isoToEpochMilli(isoFields1));
}
function compareIsoTimeFields(isoFields0, isoFields1) {
    return compareNumbers(isoTimeFieldsToNano(isoFields0), isoTimeFieldsToNano(isoFields1));
}
// Is-equal
// -----------------------------------------------------------------------------
function instantsEqual(instantSlots0, instantSlots1) {
    return !compareInstants(instantSlots0, instantSlots1);
}
function zonedDateTimesEqual(zonedDateTimeSlots0, zonedDateTimeSlots1) {
    return (!compareZonedDateTimes(zonedDateTimeSlots0, zonedDateTimeSlots1) &&
        !!isTimeZoneSlotsEqual(zonedDateTimeSlots0.timeZone, zonedDateTimeSlots1.timeZone) &&
        isIdLikeEqual(zonedDateTimeSlots0.calendar, zonedDateTimeSlots1.calendar));
}
function plainDateTimesEqual(plainDateTimeSlots0, plainDateTimeSlots1) {
    return (!compareIsoDateTimeFields(plainDateTimeSlots0, plainDateTimeSlots1) &&
        isIdLikeEqual(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar));
}
function plainDatesEqual(plainDateSlots0, plainDateSlots1) {
    return (!compareIsoDateFields(plainDateSlots0, plainDateSlots1) &&
        isIdLikeEqual(plainDateSlots0.calendar, plainDateSlots1.calendar));
}
function plainYearMonthsEqual(plainYearMonthSlots0, plainYearMonthSlots1) {
    return (!compareIsoDateFields(plainYearMonthSlots0, plainYearMonthSlots1) &&
        isIdLikeEqual(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar));
}
function plainMonthDaysEqual(plainMonthDaySlots0, plainMonthDaySlots1) {
    return (!compareIsoDateFields(plainMonthDaySlots0, plainMonthDaySlots1) &&
        isIdLikeEqual(plainMonthDaySlots0.calendar, plainMonthDaySlots1.calendar));
}
function plainTimesEqual(plainTimeSlots0, plainTimeSlots1) {
    return !compareIsoTimeFields(plainTimeSlots0, plainTimeSlots1);
}
// TimeZone
// -----------------------------------------------------------------------------
/*
NOTE: our minifier converts true/false to 1/0, which impares this function's
ability to return true/false literals. So, resign to returning loose truthy values
and make the caller responsible for casting to a boolean.
*/
function isTimeZoneSlotsEqual(a, b) {
    if (a === b) {
        return 1;
    }
    const aId = getId(a);
    const bId = getId(b);
    if (aId === bId) {
        return 1;
    }
    // If either is an unresolvable, return false
    // Unfortunately, can only be detected with try/catch because `new Intl.DateTimeFormat` throws
    try {
        return getTimeZoneAtomic(aId) === getTimeZoneAtomic(bId);
    }
    catch (_a) { }
    // If reaching here, there was an error, so NOT equal
}

// High-level
// -----------------------------------------------------------------------------
function diffInstants(invert, instantSlots0, instantSlots1, options) {
    const optionsCopy = copyOptions(options);
    const optionsTuple = refineDiffOptions(invert, optionsCopy, 3 /* Unit.Second */, 5 /* Unit.Hour */);
    const durationFields = diffEpochNano(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds, ...optionsTuple);
    return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
function diffZonedDateTimes(getCalendarOps, getTimeZoneOps, invert, zonedDateTimeSlots0, zonedDateTimeSlots1, options) {
    const calendarSlot = getCommonCalendarSlot(zonedDateTimeSlots0.calendar, zonedDateTimeSlots1.calendar);
    const optionsCopy = copyOptions(options);
    const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 5 /* Unit.Hour */);
    const startEpochNano = zonedDateTimeSlots0.epochNanoseconds;
    const endEpochNano = zonedDateTimeSlots1.epochNanoseconds;
    const sign = compareDayTimeNanos(endEpochNano, startEpochNano);
    let durationFields;
    if (!sign) {
        durationFields = durationFieldDefaults;
    }
    else if (largestUnit < 6 /* Unit.Day */) {
        durationFields = diffEpochNano(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    }
    else {
        const timeZoneSlot = getCommonTimeZoneSlot(zonedDateTimeSlots0.timeZone, zonedDateTimeSlots1.timeZone);
        const timeZoneOps = getTimeZoneOps(timeZoneSlot);
        const calendarOps = getCalendarOps(calendarSlot);
        durationFields = diffZonedEpochNanoViaCalendar(calendarOps, timeZoneOps, sign, startEpochNano, endEpochNano, largestUnit, optionsCopy);
        if (sign && !(smallestUnit === 0 /* Unit.Nanosecond */ && roundingInc === 1)) {
            durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, startEpochNano, // marker
            identity, // markerToEpochNano
            bindArgs(moveZonedEpochNano, calendarOps, timeZoneOps));
        }
    }
    return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
function diffPlainDateTimes(getCalendarOps, invert, plainDateTimeSlots0, plainDateTimeSlots1, options) {
    const calendarSlot = getCommonCalendarSlot(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar);
    const optionsCopy = copyOptions(options);
    const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 6 /* Unit.Day */);
    const startEpochNano = isoToEpochNano(plainDateTimeSlots0);
    const endEpochNano = isoToEpochNano(plainDateTimeSlots1);
    const sign = compareDayTimeNanos(endEpochNano, startEpochNano);
    let durationFields;
    if (!sign) {
        durationFields = durationFieldDefaults;
    }
    else if (largestUnit <= 6 /* Unit.Day */) {
        durationFields = diffEpochNano(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode);
    }
    else {
        const calendarOps = getCalendarOps(calendarSlot);
        durationFields = diffDateTimesViaCalendar(calendarOps, sign, plainDateTimeSlots0, plainDateTimeSlots1, largestUnit, optionsCopy);
        if (sign && !(smallestUnit === 0 /* Unit.Nanosecond */ && roundingInc === 1)) {
            durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, plainDateTimeSlots0, // marker
            isoToEpochNano, // markerToEpochNano
            bindArgs(moveDateTime, calendarOps));
        }
    }
    return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
function diffPlainDates(getCalendarOps, invert, plainDateSlots0, plainDateSlots1, options) {
    const calendarSlot = getCommonCalendarSlot(plainDateSlots0.calendar, plainDateSlots1.calendar);
    const optionsCopy = copyOptions(options);
    const optionsTuple = refineDiffOptions(invert, optionsCopy, 6 /* Unit.Day */, 9 /* Unit.Year */, 6 /* Unit.Day */);
    return diffDateLike(invert || false, () => getCalendarOps(calendarSlot), plainDateSlots0, plainDateSlots1, ...optionsTuple, optionsCopy);
}
function diffPlainYearMonth(getCalendarOps, invert, plainYearMonthSlots0, plainYearMonthSlots1, options) {
    const calendarSlot = getCommonCalendarSlot(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar);
    const optionsCopy = copyOptions(options);
    const optionsTuple = refineDiffOptions(invert, optionsCopy, 9 /* Unit.Year */, 9 /* Unit.Year */, 8 /* Unit.Month */);
    const calendarOps = getCalendarOps(calendarSlot);
    return diffDateLike(invert || false, () => calendarOps, moveToMonthStart(calendarOps, plainYearMonthSlots0), moveToMonthStart(calendarOps, plainYearMonthSlots1), ...optionsTuple, optionsCopy);
}
function diffDateLike(invert, getCalendarOps, startIsoFields, endIsoFields, largestUnit, // TODO: large field
smallestUnit, // TODO: large field
roundingInc, roundingMode, origOptions) {
    const startEpochNano = isoToEpochNano(startIsoFields);
    const endEpochNano = isoToEpochNano(endIsoFields);
    const sign = compareDayTimeNanos(endEpochNano, startEpochNano);
    let durationFields;
    if (!sign) {
        durationFields = durationFieldDefaults;
    }
    else {
        let calendarOps;
        if (largestUnit === 6 /* Unit.Day */) {
            durationFields = diffByDay(startIsoFields, endIsoFields);
        }
        else {
            calendarOps = getCalendarOps();
            durationFields = calendarOps.dateUntil(startIsoFields, endIsoFields, largestUnit, origOptions);
        }
        if (!(smallestUnit === 6 /* Unit.Day */ && roundingInc === 1)) {
            calendarOps || (calendarOps = getCalendarOps());
            durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, startIsoFields, // marker
            isoToEpochNano, // markerToEpochNano
            (m, d) => calendarOps.dateAdd(m, d));
        }
    }
    return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
function diffPlainTimes(invert, plainTimeSlots0, plainTimeSlots1, options) {
    const optionsCopy = copyOptions(options);
    const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, optionsCopy, 5 /* Unit.Hour */, 5 /* Unit.Hour */);
    const startTimeNano = isoTimeFieldsToNano(plainTimeSlots0);
    const endTimeNano = isoTimeFieldsToNano(plainTimeSlots1);
    const nanoInc = computeNanoInc(smallestUnit, roundingInc);
    const timeNano = roundByInc(endTimeNano - startTimeNano, nanoInc, roundingMode);
    const durationFields = {
        ...durationFieldDefaults,
        ...nanoToDurationTimeFields(timeNano, largestUnit),
    };
    return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
// Exact Diffing
// -----------------------------------------------------------------------------
function diffZonedEpochNanoExact(calendarOps, timeZoneOps, startEpochNano, endEpochNano, largestUnit, origOptions) {
    const sign = compareDayTimeNanos(endEpochNano, startEpochNano);
    if (!sign) {
        return durationFieldDefaults;
    }
    if (largestUnit < 6 /* Unit.Day */) {
        return diffEpochNanoExact(startEpochNano, endEpochNano, largestUnit);
    }
    return diffZonedEpochNanoViaCalendar(calendarOps, timeZoneOps, sign, startEpochNano, endEpochNano, largestUnit, origOptions);
}
function diffDateTimesExact(calendarOps, startIsoFields, endIsoFields, largestUnit, origOptions) {
    const startEpochNano = isoToEpochNano(startIsoFields);
    const endEpochNano = isoToEpochNano(endIsoFields);
    const sign = compareDayTimeNanos(endEpochNano, startEpochNano);
    if (!sign) {
        return durationFieldDefaults;
    }
    if (largestUnit <= 6 /* Unit.Day */) {
        return diffEpochNanoExact(startEpochNano, endEpochNano, largestUnit);
    }
    return diffDateTimesViaCalendar(calendarOps, sign, startIsoFields, endIsoFields, largestUnit, origOptions);
}
// Diffing Via Calendar
// -----------------------------------------------------------------------------
function diffZonedEpochNanoViaCalendar(calendarOps, timeZoneOps, sign, startEpochNano, endEpochNano, largestUnit, origOptions) {
    const startIsoFields = zonedEpochNanoToIso(timeZoneOps, startEpochNano);
    const startIsoTimeFields = pluckProps(isoTimeFieldNamesAsc, startIsoFields);
    const endIsoFields = zonedEpochNanoToIso(timeZoneOps, endEpochNano);
    const isoToZonedEpochNano = bindArgs(getSingleInstantFor, timeZoneOps);
    let midIsoFields;
    let midEpochNano;
    let midSign;
    let cnt = 0;
    // Might need multiple backoffs: one for simple time overage, other for end being in DST gap
    do {
        if (cnt > 2) {
            throw new RangeError(invalidProtocolResults);
        }
        midIsoFields = {
            ...moveByIsoDays(endIsoFields, cnt++ * -sign),
            ...startIsoTimeFields,
        };
        midEpochNano = isoToZonedEpochNano(midIsoFields);
        midSign = compareDayTimeNanos(endEpochNano, midEpochNano);
    } while (midSign === -sign);
    const dateDiff = largestUnit === 6 /* Unit.Day */
        ? diffByDay(startIsoFields, midIsoFields)
        : calendarOps.dateUntil(startIsoFields, midIsoFields, largestUnit, origOptions);
    const timeDiffNano = dayTimeNanoToNumber(diffDayTimeNanos(midEpochNano, endEpochNano)); // could be over 24 hour, so we need to consider day too
    const timeDiff = nanoToDurationTimeFields(timeDiffNano);
    const dateTimeDiff = { ...dateDiff, ...timeDiff };
    return dateTimeDiff;
}
function diffDateTimesViaCalendar(calendarOps, sign, startIsoFields, endIsoFields, largestUnit, origOptions) {
    const startTimeNano = isoTimeFieldsToNano(startIsoFields);
    const endTimeNano = isoTimeFieldsToNano(endIsoFields);
    let timeNano = endTimeNano - startTimeNano;
    const timeSign = Math.sign(timeNano);
    // simulate startDate plus time fields (because that happens before adding date)
    let midIsoFields = startIsoFields;
    // move start-fields forward so time-diff-sign matches date-diff-sign
    if (timeSign === -sign) {
        midIsoFields = moveByIsoDays(startIsoFields, sign);
        timeNano += nanoInUtcDay * sign;
    }
    const dateDiff = calendarOps.dateUntil({ ...midIsoFields, ...isoTimeFieldDefaults }, { ...endIsoFields, ...isoTimeFieldDefaults }, largestUnit, origOptions);
    const timeDiff = nanoToDurationTimeFields(timeNano);
    const dateTimeDiff = { ...dateDiff, ...timeDiff };
    return dateTimeDiff;
}
// Diffing Via Epoch Nanoseconds
// -----------------------------------------------------------------------------
function diffEpochNano(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
    return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(roundDayTimeNano(diffDayTimeNanos(startEpochNano, endEpochNano), smallestUnit, roundingInc, roundingMode), largestUnit),
    };
}
function diffEpochNanoExact(startEpochNano, endEpochNano, largestUnit) {
    return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(diffDayTimeNanos(startEpochNano, endEpochNano), largestUnit),
    };
}
function diffByDay(startIsoFields, endIsoFields) {
    return {
        ...durationFieldDefaults,
        days: diffDays(startIsoFields, endIsoFields),
    };
}
function diffDays(startIsoFields, endIsoFields) {
    return diffEpochMilliByDay(isoToEpochMilli(startIsoFields), isoToEpochMilli(endIsoFields));
}
/*
Must always be given start-of-day
*/
function diffEpochMilliByDay(epochMilli0, epochMilli1) {
    return Math.round((epochMilli1 - epochMilli0) / milliInDay);
}
// Native
// -----------------------------------------------------------------------------
function nativeDateUntil(startIsoFields, endIsoFields, largestUnit) {
    if (largestUnit <= 7 /* Unit.Week */) {
        let weeks = 0;
        let days = diffDays(startIsoFields, endIsoFields);
        if (largestUnit === 7 /* Unit.Week */) {
            [weeks, days] = divModTrunc(days, isoDaysInWeek);
        }
        return { ...durationFieldDefaults, weeks, days };
    }
    const yearMonthDayStart = this.dateParts(startIsoFields);
    const yearMonthDayEnd = this.dateParts(endIsoFields);
    let [years, months, days] = diffYearMonthDay(this, ...yearMonthDayStart, ...yearMonthDayEnd);
    if (largestUnit === 8 /* Unit.Month */) {
        months += this.monthsInYearSpan(years, yearMonthDayStart[0]);
        years = 0;
    }
    return { ...durationFieldDefaults, years, months, days };
}
function diffYearMonthDay(calendarNative, year0, month0, day0, year1, month1, day1) {
    let yearDiff;
    let monthsInYear1;
    let monthDiff;
    let daysInMonth1;
    let dayDiff;
    function updateYearMonth() {
        const [monthCodeNumber0, isLeapYear0] = calendarNative.monthCodeParts(year0, month0);
        const [monthCodeNumber1, isLeapYear1] = calendarNative.monthCodeParts(year1, month1);
        yearDiff = year1 - year0;
        monthsInYear1 = calendarNative.monthsInYearPart(year1);
        monthDiff = yearDiff
            ? // crossing years
                monthCodeNumber1 - monthCodeNumber0 ||
                    Number(isLeapYear1) - Number(isLeapYear0)
            : // same year
                month1 - Math.min(month0, monthsInYear1);
    }
    function updateYearMonthDay() {
        updateYearMonth();
        daysInMonth1 = calendarNative.daysInMonthParts(year1, month1);
        dayDiff = day1 - Math.min(day0, daysInMonth1);
    }
    updateYearMonthDay();
    const daySign = Math.sign(dayDiff);
    const sign = (Math.sign(yearDiff) ||
        Math.sign(monthDiff) ||
        daySign);
    if (sign) {
        // overshooting day? correct by moving to penultimate month
        if (daySign === -sign) {
            const oldDaysInMonth1 = daysInMonth1;
            [year1, month1] = calendarNative.monthAdd(year1, month1, -sign);
            updateYearMonthDay();
            dayDiff +=
                sign < 0 // correct with days-in-month further in past
                    ? -oldDaysInMonth1 // correcting from past -> future
                    : daysInMonth1; // correcting from future -> past
        }
        // overshooting month? correct by moving to penultimate year
        const monthSign = Math.sign(monthDiff);
        if (monthSign === -sign) {
            const oldMonthsInYear1 = monthsInYear1;
            year1 -= sign;
            updateYearMonth();
            monthDiff +=
                sign < 0 // correct with months-in-year further in past
                    ? -oldMonthsInYear1 // correcting from past -> future
                    : monthsInYear1; // correcting from future -> past
        }
    }
    return [yearDiff, monthDiff, dayDiff];
}
// Month Span for ISO/Intl
// -----------------------------------------------------------------------------
function computeIsoMonthsInYearSpan(yearDelta) {
    return yearDelta * isoMonthsInYear;
}
function computeIntlMonthsInYearSpan(yearDelta, yearStart) {
    const yearEnd = yearStart + yearDelta;
    const yearSign = Math.sign(yearDelta);
    const yearCorrection = yearSign < 0 ? -1 : 0;
    let months = 0;
    for (let year = yearStart; year !== yearEnd; year += yearSign) {
        months += computeIntlMonthsInYear.call(this, year + yearCorrection);
    }
    return months;
}
// -----------------------------------------------------------------------------
function getCommonCalendarSlot(a, b) {
    if (!isIdLikeEqual(a, b)) {
        throw new RangeError(mismatchingCalendars);
    }
    return a;
}
function getCommonTimeZoneSlot(a, b) {
    if (!isTimeZoneSlotsEqual(a, b)) {
        throw new RangeError(mismatchingTimeZones);
    }
    return a;
}

// -----------------------------------------------------------------------------
/*
Expects an already-normalized calendarId
*/
const queryIntlCalendar = createLazyGenerator(createIntlCalendar);
function createIntlCalendar(calendarId) {
    const intlFormat = queryCalendarIntlFormat(calendarId);
    const calendarIdBase = computeCalendarIdBase(calendarId);
    function epochMilliToIntlFields(epochMilli) {
        const intlParts = hashIntlFormatParts(intlFormat, epochMilli);
        return parseIntlDateFields(intlParts, calendarIdBase);
    }
    return {
        id: calendarId,
        queryFields: createIntlFieldCache(epochMilliToIntlFields),
        queryYearMonths: createIntlYearMonthCache(epochMilliToIntlFields),
    };
}
// Caches
// -----------------------------------------------------------------------------
function createIntlFieldCache(epochMilliToIntlFields) {
    return createLazyGenerator((isoDateFields) => {
        const epochMilli = isoToEpochMilli(isoDateFields);
        return epochMilliToIntlFields(epochMilli);
    }, WeakMap);
}
function createIntlYearMonthCache(epochMilliToIntlFields) {
    const yearAtEpoch = epochMilliToIntlFields(0).year;
    const yearCorrection = yearAtEpoch - isoEpochOriginYear;
    function buildYear(year) {
        let epochMilli = isoArgsToEpochMilli(year - yearCorrection);
        let intlFields;
        const milliReversed = [];
        const monthStrsReversed = [];
        // move beyond current year
        do {
            epochMilli += 400 * milliInDay;
        } while ((intlFields = epochMilliToIntlFields(epochMilli)).year <= year);
        do {
            // move to start-of-month
            epochMilli += (1 - intlFields.day) * milliInDay;
            // only record the epochMilli if current year
            if (intlFields.year === year) {
                milliReversed.push(epochMilli);
                monthStrsReversed.push(intlFields.month);
            }
            // move to last day of previous month
            epochMilli -= milliInDay;
        } while ((intlFields = epochMilliToIntlFields(epochMilli)).year >= year);
        return {
            monthEpochMilli: milliReversed.reverse(),
            monthStrToIndex: mapPropNamesToIndex(monthStrsReversed.reverse()),
        };
    }
    return createLazyGenerator(buildYear);
}
// DateTimeFormat Utils
// -----------------------------------------------------------------------------
function parseIntlDateFields(intlParts, calendarIdBase) {
    return {
        ...parseIntlYear(intlParts, calendarIdBase),
        month: intlParts.month, // a short month string
        day: parseInt(intlParts.day),
    };
}
function parseIntlYear(intlParts, calendarIdBase) {
    let year = parseIntlPartsYear(intlParts);
    let era;
    let eraYear;
    if (intlParts.era) {
        const eraOrigins = eraOriginsByCalendarId[calendarIdBase];
        if (eraOrigins !== undefined) {
            era = normalizeShortEra(intlParts.era);
            eraYear = year; // TODO: will this get optimized to next line?
            year = eraYearToYear(eraYear, eraOrigins[era] || 0);
        }
    }
    return { era, eraYear, year };
}
function parseIntlPartsYear(intlParts) {
    return parseInt(intlParts.relatedYear || intlParts.year);
}
/**
 * @param id Expects already-normalized
 */
const queryCalendarIntlFormat = createLazyGenerator((id) => new RawDateTimeFormat(standardLocaleId, {
    calendar: id,
    timeZone: utcTimeZoneId,
    era: 'short', // 'narrow' is too terse for japanese months
    year: 'numeric',
    month: 'short', // easier to identify monthCodes
    day: 'numeric',
}));
function normalizeShortEra(formattedEra) {
    formattedEra = formattedEra
        .normalize('NFD') // 'Shōwa' -> 'Showa'
        .toLowerCase() // 'Before R.O.C.' -> 'before r.o.c.'
        .replace(/[^a-z0-9]/g, ''); // 'before r.o.c.' -> 'beforeroc'
    return eraRemaps[formattedEra] || formattedEra;
}
// Intl-Calendar methods
// -----------------------------------------------------------------------------
function computeIntlYear(isoFields) {
    return this.queryFields(isoFields).year;
}
function computeIntlMonth(isoFields) {
    const { year, month } = this.queryFields(isoFields);
    const { monthStrToIndex } = this.queryYearMonths(year);
    return monthStrToIndex[month] + 1;
}
function computeIntlDay(isoFields) {
    return this.queryFields(isoFields).day;
}
function computeIntlDateParts(isoFields) {
    const { year, month, day } = this.queryFields(isoFields);
    const { monthStrToIndex } = this.queryYearMonths(year);
    return [year, monthStrToIndex[month] + 1, day];
}
function computeIsoFieldsFromIntlParts(year, month, day) {
    // check might be redundant if happens in epochMilliToIso/queryDateStart
    // TODO: i don't like that this is happening here
    return checkIsoDateInBounds({
        ...epochMilliToIso(computeIntlEpochMilli.call(this, year, month, day)),
    });
}
function computeIntlEpochMilli(year, month = 1, day = 1) {
    return (this.queryYearMonths(year).monthEpochMilli[month - 1] +
        (day - 1) * milliInDay);
}
function computeIntlMonthCodeParts(year, month) {
    const leapMonth = computeIntlLeapMonth.call(this, year);
    const monthCodeNumber = monthToMonthCodeNumber(month, leapMonth);
    const isLeapMonth = leapMonth === month;
    return [monthCodeNumber, isLeapMonth];
}
function computeIntlLeapMonth(year) {
    const currentMonthStrs = queryMonthStrs(this, year);
    const prevMonthStrs = queryMonthStrs(this, year - 1);
    const currentLength = currentMonthStrs.length;
    if (currentLength > prevMonthStrs.length) {
        // hardcoded leap month. usually means complex month-code schemes
        const leapMonthMeta = getCalendarLeapMonthMeta(this); // hack for <0
        if (leapMonthMeta < 0) {
            return -leapMonthMeta;
        }
        for (let i = 0; i < currentLength; i++) {
            if (currentMonthStrs[i] !== prevMonthStrs[i]) {
                return i + 1; // convert to 1-based
            }
        }
    }
}
function computeIntlInLeapYear(year) {
    const days = computeIntlDaysInYear.call(this, year);
    return (days > computeIntlDaysInYear.call(this, year - 1) &&
        days > computeIntlDaysInYear.call(this, year + 1));
}
function computeIntlDaysInYear(year) {
    const milli = computeIntlEpochMilli.call(this, year);
    const milliNext = computeIntlEpochMilli.call(this, year + 1);
    return diffEpochMilliByDay(milli, milliNext);
}
function computeIntlDaysInMonth(year, month) {
    const { monthEpochMilli } = this.queryYearMonths(year);
    let nextMonth = month + 1;
    let nextMonthEpochMilli = monthEpochMilli;
    if (nextMonth > monthEpochMilli.length) {
        nextMonth = 1;
        nextMonthEpochMilli = this.queryYearMonths(year + 1).monthEpochMilli;
    }
    return diffEpochMilliByDay(monthEpochMilli[month - 1], nextMonthEpochMilli[nextMonth - 1]);
}
function computeIntlDayOfYear(isoFields) {
    const dayEpochMilli = isoToEpochMilli({
        ...isoFields,
        ...isoTimeFieldDefaults,
    });
    const { year } = this.queryFields(isoFields);
    const yearStartEpochMilli = computeIntlEpochMilli.call(this, year);
    return diffEpochMilliByDay(yearStartEpochMilli, dayEpochMilli);
}
function computeIntlMonthsInYear(year) {
    return this.queryYearMonths(year).monthEpochMilli.length;
}
function computeIntlEraParts(isoFields) {
    const intlFields = this.queryFields(isoFields);
    return [intlFields.era, intlFields.eraYear];
}
function computeIntlYearMonthForMonthDay(monthCodeNumber, isLeapMonth, day) {
    let [startYear, startMonth, startDay] = computeIntlDateParts.call(this, {
        isoYear: isoEpochFirstLeapYear,
        isoMonth: isoMonthsInYear,
        isoDay: 31,
    });
    const startYearLeapMonth = computeIntlLeapMonth.call(this, startYear);
    const startMonthCodeNumber = monthToMonthCodeNumber(startMonth, startYearLeapMonth);
    const startMonthIsLeap = startMonth === startYearLeapMonth;
    // If startYear doesn't span isoEpochFirstLeapYear, walk backwards
    // TODO: smaller way to do this with epochMilli comparison?
    if ((compareNumbers(monthCodeNumber, startMonthCodeNumber) ||
        compareNumbers(Number(isLeapMonth), Number(startMonthIsLeap)) ||
        compareNumbers(day, startDay)) === 1) {
        startYear--;
    }
    // Walk backwards until finding a year with monthCode/day
    for (let yearMove = 0; yearMove < 100; yearMove++) {
        const tryYear = startYear - yearMove;
        const tryLeapMonth = computeIntlLeapMonth.call(this, tryYear);
        const tryMonth = monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, tryLeapMonth);
        const tryMonthIsLeap = tryMonth === tryLeapMonth;
        if (isLeapMonth === tryMonthIsLeap &&
            day <= computeIntlDaysInMonth.call(this, tryYear, tryMonth)) {
            return [tryYear, tryMonth];
        }
    }
}
// -----------------------------------------------------------------------------
function queryMonthStrs(intlCalendar, year) {
    return Object.keys(intlCalendar.queryYearMonths(year).monthStrToIndex);
}

function resolveCalendarId(id) {
    id = normalizeCalendarId(id);
    if (id !== isoCalendarId && id !== gregoryCalendarId) {
        if (computeCalendarIdBase(id) !==
            computeCalendarIdBase(queryCalendarIntlFormat(id).resolvedOptions().calendar)) {
            throw new RangeError(invalidCalendar(id));
        }
    }
    return id;
}
function normalizeCalendarId(id) {
    id = id.toLowerCase();
    if (id === 'islamicc') {
        id = 'islamic-civil';
    }
    return id;
}
function computeCalendarIdBase(id) {
    return id.split('-')[0];
}

// Base
const nativeYearMonthRefineBase = {
    yearMonthFromFields: nativeYearMonthFromFields,
    fields: nativeFieldsMethod,
};
const nativeDateRefineBase = {
    dateFromFields: nativeDateFromFields,
    fields: nativeFieldsMethod,
};
const nativeMonthDayRefineBase = {
    monthDayFromFields: nativeMonthDayFromFields,
    fields: nativeFieldsMethod,
};
// Base
const nativeMoveBase = {
    dateAdd: nativeDateAdd,
};
const nativeDiffBase = {
    dateAdd: nativeDateAdd,
    dateUntil: nativeDateUntil,
};
const nativeStandardBase = {
    dateAdd: nativeDateAdd,
    dateUntil: nativeDateUntil,
    dateFromFields: nativeDateFromFields,
    yearMonthFromFields: nativeYearMonthFromFields,
    monthDayFromFields: nativeMonthDayFromFields,
    fields: nativeFieldsMethod,
    mergeFields: nativeMergeFields,
    inLeapYear: computeNativeInLeapYear,
    monthsInYear: computeNativeMonthsInYear,
    daysInMonth: computeNativeDaysInMonth,
    daysInYear: computeNativeDaysInYear,
    era: computeNativeEra,
    eraYear: computeNativeEraYear,
    monthCode: computeNativeMonthCode,
    dayOfWeek: computeIsoDayOfWeek,
    weekOfYear: computeIsoWeekOfYear,
    yearOfWeek: computeIsoYearOfWeek,
    daysInWeek: computeIsoDaysInWeek,
};
// 'Super' methods that all native implementations use
// -----------------------------------------------------------------------------
function computeNativeInLeapYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.inLeapYearPart(year);
}
function computeNativeMonthsInYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.monthsInYearPart(year);
}
function computeNativeDaysInMonth(isoFields) {
    const [year, month] = this.dateParts(isoFields);
    return this.daysInMonthParts(year, month);
}
function computeNativeDaysInYear(isoFields) {
    const [year] = this.dateParts(isoFields);
    return this.daysInYearPart(year);
}
function computeNativeEra(isoFields) {
    return this.eraParts(isoFields)[0];
}
function computeNativeEraYear(isoFields) {
    return this.eraParts(isoFields)[1];
}
function computeNativeMonthCode(isoFields) {
    const [year, month] = this.dateParts(isoFields);
    const [monthCodeNumber, isLeapMonth] = this.monthCodeParts(year, month);
    return formatMonthCode(monthCodeNumber, isLeapMonth);
}
// Month Code Utils
// -----------------------------------------------------------------------------
const monthCodeRegExp = /^M(\d{2})(L?)$/;
function parseMonthCode(monthCode) {
    const m = monthCodeRegExp.exec(monthCode);
    if (!m) {
        throw new RangeError(invalidMonthCode(monthCode));
    }
    return [
        parseInt(m[1]), // monthCodeNumber
        Boolean(m[2]),
    ];
}
function formatMonthCode(monthCodeNumber, isLeapMonth) {
    return 'M' + padNumber2(monthCodeNumber) + (isLeapMonth ? 'L' : '');
}
function monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, leapMonth) {
    return (monthCodeNumber +
        (isLeapMonth || (leapMonth && monthCodeNumber >= leapMonth) ? 1 : 0));
}
function monthToMonthCodeNumber(month, leapMonth) {
    return month - (leapMonth && month >= leapMonth ? 1 : 0);
}
// Era Utils
// -----------------------------------------------------------------------------
function eraYearToYear(eraYear, eraOrigin) {
    // see the origin format in calendarConfig
    // ||0 protects against -0
    return (eraOrigin + eraYear) * (Math.sign(eraOrigin) || 1) || 0;
}
// -----------------------------------------------------------------------------
function getCalendarEraOrigins(native) {
    return eraOriginsByCalendarId[getCalendarIdBase(native)];
}
function getCalendarLeapMonthMeta(native) {
    return leapMonthMetas[getCalendarIdBase(native)];
}
function getCalendarIdBase(native) {
    return computeCalendarIdBase(native.id || isoCalendarId);
}

// Config
// -----------------------------------------------------------------------------
const dateFieldRefiners = {
    era: toStringViaPrimitive,
    eraYear: toInteger,
    year: toInteger,
    month: toPositiveInteger,
    monthCode: toStringViaPrimitive,
    day: toPositiveInteger,
};
const timeFieldRefiners = mapPropNamesToConstant(timeFieldNamesAsc, toInteger);
const durationFieldRefiners = mapPropNamesToConstant(durationFieldNamesAsc, toStrictInteger);
const builtinRefiners = {
    ...dateFieldRefiners,
    ...timeFieldRefiners,
    ...durationFieldRefiners,
    offset: toStringViaPrimitive,
};
// High-Level Refining
// -----------------------------------------------------------------------------
function refineMaybeZonedDateTimeBag(refineTimeZoneArg, getTimeZoneOps, calendarOps, bag) {
    const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, // validFieldNames
    [], // requireFields
    timeAndZoneFieldNames);
    if (fields.timeZone !== undefined) {
        const isoDateFields = calendarOps.dateFromFields(fields);
        const isoTimeFields = refineTimeBag(fields);
        // must happen after datetime fields
        const timeZoneSlot = refineTimeZoneArg(fields.timeZone);
        const timeZoneOps = getTimeZoneOps(timeZoneSlot);
        const epochNanoseconds = getMatchingInstantFor(timeZoneOps, { ...isoDateFields, ...isoTimeFields }, fields.offset !== undefined ? parseOffsetNano(fields.offset) : undefined);
        return { epochNanoseconds, timeZone: timeZoneSlot };
    }
    const isoDateInternals = calendarOps.dateFromFields(fields);
    return { ...isoDateInternals, ...isoTimeFieldDefaults };
}
function refineZonedDateTimeBag(refineTimeZoneArg, getTimeZoneOps, calendarOps, calendarSlot, bag, options) {
    const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, // validFieldNames
    timeZoneFieldNames, // requireFields
    timeAndZoneFieldNames);
    // guaranteed via refineCalendarFields
    const timeZoneSlot = refineTimeZoneArg(fields.timeZone);
    const [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
    const isoDateFields = calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow));
    const isoTimeFields = refineTimeBag(fields, overflow);
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    const epochNanoseconds = getMatchingInstantFor(timeZoneOps, { ...isoDateFields, ...isoTimeFields }, fields.offset !== undefined ? parseOffsetNano(fields.offset) : undefined, offsetDisambig, epochDisambig);
    return createZonedDateTimeSlots(epochNanoseconds, timeZoneSlot, calendarSlot);
}
function refinePlainDateTimeBag(calendarOps, bag, options) {
    const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, [], // requiredFields
    timeFieldNamesAsc);
    const overflow = refineOverflowOptions(options);
    const isoDateInternals = calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow));
    const isoTimeFields = refineTimeBag(fields, overflow);
    const isoFields = checkIsoDateTimeInBounds({
        ...isoDateInternals,
        ...isoTimeFields,
    });
    return createPlainDateTimeSlots(isoFields);
}
function refinePlainDateBag(calendarOps, bag, options, requireFields = []) {
    const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, requireFields);
    return calendarOps.dateFromFields(fields, options);
}
function refinePlainYearMonthBag(calendarOps, bag, options, requireFields) {
    const fields = refineCalendarFields(calendarOps, bag, yearMonthFieldNames, requireFields);
    return calendarOps.yearMonthFromFields(fields, options);
}
function refinePlainMonthDayBag(calendarOps, calendarAbsent, bag, options, requireFields = []) {
    const fields = refineCalendarFields(calendarOps, bag, dateFieldNamesAlpha, requireFields);
    // Callers who omit the calendar are not writing calendar-independent
    // code. In that case, `monthCode`/`year` can be omitted; `month` and
    // `day` are sufficient. Add a `year` to satisfy calendar validation.
    if (calendarAbsent &&
        fields.month !== undefined &&
        fields.monthCode === undefined &&
        fields.year === undefined) {
        fields.year = isoEpochFirstLeapYear;
    }
    return calendarOps.monthDayFromFields(fields, options);
}
function refinePlainTimeBag(bag, options) {
    // spec says overflow parsed first
    const overflow = refineOverflowOptions(options);
    // disallowEmpty
    const fields = refineFields(bag, timeFieldNamesAlpha, [], true);
    return createPlainTimeSlots(refineTimeBag(fields, overflow));
}
function refineDurationBag(bag) {
    // refine in 'partial' mode
    const durationFields = refineFields(bag, durationFieldNamesAlpha);
    return createDurationSlots(checkDurationFields({
        ...durationFieldDefaults,
        ...durationFields,
    }));
}
// Low-level Refining
// -----------------------------------------------------------------------------
function refineCalendarFields(calendarOps, bag, validFieldNames, // does NOT need to be alphabetized
requiredFieldNames = [], // a subset of validFieldNames
forcedValidFieldNames = []) {
    const fieldNames = [
        ...calendarOps.fields(validFieldNames),
        ...forcedValidFieldNames,
    ].sort();
    return refineFields(bag, fieldNames, requiredFieldNames);
}
/*
If `requiredFieldNames` is undefined, assume 'partial' mode where defaults
don't apply
*/
function refineFields(bag, validFieldNames, // must be alphabetized!!!
requiredFieldNames, disallowEmpty = !requiredFieldNames) {
    const res = {};
    let anyMatching = false;
    let prevFieldName;
    for (const fieldName of validFieldNames) {
        if (fieldName === prevFieldName) {
            throw new RangeError(duplicateFields(fieldName));
        }
        if (fieldName === 'constructor' || fieldName === '__proto__') {
            throw new RangeError(forbiddenField(fieldName));
        }
        let fieldVal = bag[fieldName];
        if (fieldVal !== undefined) {
            anyMatching = true;
            if (builtinRefiners[fieldName]) {
                fieldVal = builtinRefiners[fieldName](fieldVal, fieldName);
            }
            res[fieldName] = fieldVal;
        }
        else if (requiredFieldNames) {
            if (requiredFieldNames.includes(fieldName)) {
                // TODO: have caller use a Set
                throw new TypeError(missingField(fieldName));
            }
            res[fieldName] =
                timeFieldDefaults[fieldName];
        }
        prevFieldName = fieldName;
    }
    // only check zero fields during .with() calls
    // for .from() calls, empty-bag-checking will happen within the CalendarImpl
    if (disallowEmpty && !anyMatching) {
        throw new TypeError(noValidFields);
    }
    return res;
}
function refineTimeBag(fields, overflow) {
    return constrainIsoTimeFields(timeFieldsToIso({ ...timeFieldDefaults, ...fields }), overflow);
}
const timeFieldsToIso = bindArgs((remapProps), timeFieldNamesAsc, isoTimeFieldNamesAsc);
// High-Level Mod
// -----------------------------------------------------------------------------
function zonedDateTimeWithFields(getCalendarOps, getTimeZoneOps, zonedDateTimeSlots, initialFields, modFields, options) {
    const optionsCopy = copyOptions(options);
    const { calendar, timeZone } = zonedDateTimeSlots;
    const calendarOps = getCalendarOps(calendar);
    const timeZoneOps = getTimeZoneOps(timeZone);
    return createZonedDateTimeSlots(mergeZonedDateTimeBag(calendarOps, timeZoneOps, initialFields, modFields, optionsCopy), timeZone, calendar);
}
function plainDateTimeWithFields(getCalendarOps, plainDateTimeSlots, initialFields, modFields, options) {
    const optionsCopy = copyOptions(options);
    const calendarSlot = plainDateTimeSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return createPlainDateTimeSlots(mergePlainDateTimeBag(calendarOps, initialFields, modFields, optionsCopy));
}
function plainDateWithFields(getCalendarOps, plainDateSlots, initialFields, modFields, options) {
    const optionsCopy = copyOptions(options);
    const calendarSlot = plainDateSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return mergePlainDateBag(calendarOps, initialFields, modFields, optionsCopy);
}
function plainYearMonthWithFields(getCalendarOps, plainYearMonthSlots, initialFields, modFields, options) {
    const optionsCopy = copyOptions(options);
    const calendarSlot = plainYearMonthSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return createPlainYearMonthSlots(mergePlainYearMonthBag(calendarOps, initialFields, modFields, optionsCopy));
}
function plainMonthDayWithFields(getCalendarOps, plainMonthDaySlots, initialFields, modFields, options) {
    const optionsCopy = copyOptions(options);
    const calendarSlot = plainMonthDaySlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return mergePlainMonthDayBag(calendarOps, initialFields, modFields, optionsCopy);
}
function plainTimeWithFields(initialFields, mod, options) {
    return createPlainTimeSlots(mergePlainTimeBag(initialFields, mod, options));
}
function durationWithFields(slots, fields) {
    return createDurationSlots(mergeDurationBag(slots, fields));
}
// Low-Level Mod ("merging")
// -----------------------------------------------------------------------------
function mergeZonedDateTimeBag(calendarOps, timeZoneOps, zonedDateTime, mod, // TODO: allow offset. correct base type tho?
options) {
    const fields = mergeCalendarFields(calendarOps, zonedDateTime, mod, dateFieldNamesAlpha, // validFieldNames
    timeAndOffsetFieldNames, // forcedValidFieldNames
    offsetFieldNames);
    const [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options, 2 /* OffsetDisambig.Prefer */);
    const isoDateFields = calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow));
    const isoTimeFields = refineTimeBag(fields, overflow);
    return getMatchingInstantFor(timeZoneOps, { ...isoDateFields, ...isoTimeFields }, parseOffsetNano(fields.offset), // guaranteed via mergeCalendarFields
    offsetDisambig, epochDisambig);
}
function mergePlainDateTimeBag(calendarOps, plainDateTime, mod, options) {
    const fields = mergeCalendarFields(calendarOps, plainDateTime, mod, dateFieldNamesAlpha, // validFieldNames
    timeFieldNamesAsc);
    const overflow = refineOverflowOptions(options);
    const isoDateInternals = calendarOps.dateFromFields(fields, overrideOverflowOptions(options, overflow));
    const isoTimeFields = refineTimeBag(fields, overflow);
    return checkIsoDateTimeInBounds({
        ...isoDateInternals,
        ...isoTimeFields,
    });
}
function mergePlainDateBag(calendarOps, plainDate, mod, options) {
    const fields = mergeCalendarFields(calendarOps, plainDate, mod, dateFieldNamesAlpha);
    return calendarOps.dateFromFields(fields, options);
}
function mergePlainYearMonthBag(calendarOps, plainYearMonth, bag, options) {
    const fields = mergeCalendarFields(calendarOps, plainYearMonth, bag, yearMonthFieldNames);
    return calendarOps.yearMonthFromFields(fields, options);
}
function mergePlainMonthDayBag(calendarOps, plainMonthDay, bag, options) {
    const fields = mergeCalendarFields(calendarOps, plainMonthDay, bag, dateFieldNamesAlpha);
    return calendarOps.monthDayFromFields(fields, options);
}
function mergePlainTimeBag(plainTime, bag, options) {
    const overflow = refineOverflowOptions(options); // spec says overflow parsed first
    const origFields = pluckProps(timeFieldNamesAlpha, plainTime);
    const newFields = refineFields(bag, timeFieldNamesAlpha);
    const mergedFields = { ...origFields, ...newFields };
    return refineTimeBag(mergedFields, overflow);
}
function mergeDurationBag(durationFields, bag) {
    const newFields = refineFields(bag, durationFieldNamesAlpha);
    const mergedFields = { ...durationFields, ...newFields };
    return checkDurationFields(mergedFields);
}
function mergeCalendarFields(calendarOps, obj, bag, validFieldNames, // does NOT need to be alphabetized
forcedValidFieldNames = [], requiredObjFieldNames = []) {
    const fieldNames = [
        ...calendarOps.fields(validFieldNames),
        ...forcedValidFieldNames,
    ].sort();
    let fields = refineFields(obj, fieldNames, requiredObjFieldNames);
    const partialFields = refineFields(bag, fieldNames);
    fields = calendarOps.mergeFields(fields, partialFields);
    // guard against ridiculous .mergeField results
    return refineFields(fields, fieldNames, []);
}
// Conversion that involves bags
// -----------------------------------------------------------------------------
function convertToPlainMonthDay(calendarOps, input) {
    const fields = refineCalendarFields(calendarOps, input, monthCodeDayFieldNames);
    return calendarOps.monthDayFromFields(fields);
}
function convertToPlainYearMonth(calendarOps, input, options) {
    const fields = refineCalendarFields(calendarOps, input, yearMonthCodeFieldNames);
    return calendarOps.yearMonthFromFields(fields, options);
}
/*
Responsible for ensuring bag is an object. Best place?
*/
function convertPlainMonthDayToDate(calendarOps, plainMonthDay, bag) {
    return convertToIso(calendarOps, plainMonthDay, // input
    monthCodeDayFieldNames, // inputFieldNames
    requireObjectLike(bag), // extra
    yearFieldNames);
}
/*
Responsible for ensuring bag is an object. Best place?
*/
function convertPlainYearMonthToDate(calendarOps, plainYearMonth, bag) {
    return convertToIso(calendarOps, plainYearMonth, // input
    yearMonthCodeFieldNames, // inputFieldNames
    requireObjectLike(bag), // extra
    dayFieldNames);
}
function convertToIso(calendarOps, input, inputFieldNames, // must be alphabetized!!!
extra, extraFieldNames) {
    inputFieldNames = calendarOps.fields(inputFieldNames);
    input = pluckProps(inputFieldNames, input);
    extraFieldNames = calendarOps.fields(extraFieldNames);
    extra = refineFields(extra, extraFieldNames, []);
    let mergedFields = calendarOps.mergeFields(input, extra);
    mergedFields = refineFields(mergedFields, [...inputFieldNames, ...extraFieldNames].sort(), []);
    return calendarOps.dateFromFields(mergedFields);
}
// Native *-from-fields
// -----------------------------------------------------------------------------
function nativeDateFromFields(fields, options) {
    const overflow = refineOverflowOptions(options);
    const year = refineYear(this, fields);
    const month = refineMonth(this, fields, year, overflow);
    const day = refineDay(this, fields, month, year, overflow);
    const isoFields = this.isoFields(year, month, day);
    return createPlainDateSlots(checkIsoDateInBounds(isoFields), this.id || isoCalendarId);
}
function nativeYearMonthFromFields(fields, options) {
    const overflow = refineOverflowOptions(options);
    const year = refineYear(this, fields);
    const month = refineMonth(this, fields, year, overflow);
    const isoFields = this.isoFields(year, month, 1);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(isoFields), this.id || isoCalendarId);
}
function nativeMonthDayFromFields(fields, options) {
    const overflow = refineOverflowOptions(options);
    const isIso = !this.id;
    const { monthCode, year, month } = fields;
    let monthCodeNumber;
    let isLeapMonth;
    let normalYear;
    let normalMonth;
    let normalDay;
    if (monthCode !== undefined) {
        [monthCodeNumber, isLeapMonth] = parseMonthCode(monthCode);
        normalDay = getDefinedProp(fields, 'day');
        // query calendar for year/month
        const res = this.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, normalDay);
        if (!res) {
            throw new RangeError(failedYearGuess);
        }
        [normalYear, normalMonth] = res;
        // monthCode conflicts with month?
        if (month !== undefined && month !== normalMonth) {
            throw new RangeError(mismatchingMonthAndCode);
        }
        // constrain (what refineMonth/refineDay would normally do)
        if (isIso) {
            normalMonth = clampEntity('month', normalMonth, 1, isoMonthsInYear, 1 /* Overflow.Reject */); // reject because never leap months
            normalDay = clampEntity('day', normalDay, 1, computeIsoDaysInMonth(year !== undefined ? year : normalYear, normalMonth), overflow);
        }
    }
    else {
        // refine year/month/day
        normalYear =
            year === undefined && isIso
                ? isoEpochFirstLeapYear
                : refineYear(this, fields);
        normalMonth = refineMonth(this, fields, normalYear, overflow);
        normalDay = refineDay(this, fields, normalMonth, normalYear, overflow);
        // compute monthCode
        const leapMonth = this.leapMonth(normalYear);
        isLeapMonth = normalMonth === leapMonth;
        monthCodeNumber = monthToMonthCodeNumber(normalMonth, leapMonth);
        // query calendar for normalized year/month
        const res = this.yearMonthForMonthDay(monthCodeNumber, isLeapMonth, normalDay);
        if (!res) {
            throw new RangeError(failedYearGuess);
        }
        [normalYear, normalMonth] = res;
    }
    return createPlainMonthDaySlots(this.isoFields(normalYear, normalMonth, normalDay), this.id || isoCalendarId);
}
function nativeFieldsMethod(fieldNames) {
    if (getCalendarEraOrigins(this) && fieldNames.includes('year')) {
        return [...fieldNames, ...eraYearFieldNames];
    }
    return fieldNames;
}
function nativeMergeFields(baseFields, additionalFields) {
    const merged = Object.assign(Object.create(null), baseFields);
    spliceFields(merged, additionalFields, monthFieldNames);
    if (getCalendarEraOrigins(this)) {
        spliceFields(merged, additionalFields, allYearFieldNames);
        // eras begin mid-year?
        if (this.id === japaneseCalendarId) {
            spliceFields(merged, additionalFields, monthDayFieldNames, // any found?
            eraYearFieldNames);
        }
    }
    return merged;
}
// Low-level Native Utils
// -----------------------------------------------------------------------------
function refineYear(calendarNative, fields) {
    let { era, eraYear, year } = fields;
    const eraOrigins = getCalendarEraOrigins(calendarNative);
    if (era !== undefined || eraYear !== undefined) {
        if (era === undefined || eraYear === undefined) {
            throw new TypeError(mismatchingEraParts);
        }
        if (!eraOrigins) {
            throw new RangeError(forbiddenEraParts);
        }
        const eraOrigin = eraOrigins[era];
        if (eraOrigin === undefined) {
            throw new RangeError(invalidEra(era));
        }
        const yearByEra = eraYearToYear(eraYear, eraOrigin);
        if (year !== undefined && year !== yearByEra) {
            throw new RangeError(mismatchingYearAndEra);
        }
        year = yearByEra;
    }
    else if (year === undefined) {
        throw new TypeError(missingYear(eraOrigins));
    }
    return year;
}
function refineMonth(calendarNative, fields, year, overflow) {
    let { month, monthCode } = fields;
    if (monthCode !== undefined) {
        const monthByCode = refineMonthCode(calendarNative, monthCode, year, overflow);
        if (month !== undefined && month !== monthByCode) {
            throw new RangeError(mismatchingMonthAndCode);
        }
        month = monthByCode;
        overflow = 1 /* Overflow.Reject */; // monthCode parsing doesn't constrain
    }
    else if (month === undefined) {
        throw new TypeError(missingMonth);
    }
    return clampEntity('month', month, 1, calendarNative.monthsInYearPart(year), overflow);
}
function refineMonthCode(calendarNative, monthCode, year, overflow) {
    const leapMonth = calendarNative.leapMonth(year);
    const [monthCodeNumber, wantsLeapMonth] = parseMonthCode(monthCode);
    let month = monthCodeNumberToMonth(monthCodeNumber, wantsLeapMonth, leapMonth);
    if (wantsLeapMonth) {
        const leapMonthMeta = getCalendarLeapMonthMeta(calendarNative);
        // calendar does not support leap years
        if (leapMonthMeta === undefined) {
            throw new RangeError(invalidLeapMonth);
        }
        // leap year has a maximum
        if (leapMonthMeta > 0) {
            if (month > leapMonthMeta) {
                throw new RangeError(invalidLeapMonth);
            }
            if (leapMonth === undefined) {
                if (overflow === 1 /* Overflow.Reject */) {
                    throw new RangeError(invalidLeapMonth);
                }
                month--; // M05L -> M05
            }
        }
        else {
            // leap year is constant
            if (month !== -leapMonthMeta) {
                throw new RangeError(invalidLeapMonth);
            }
            if (leapMonth === undefined) {
                if (overflow === 1 /* Overflow.Reject */) {
                    throw new RangeError(invalidLeapMonth);
                }
                // else, ex: M05L -> M06
            }
        }
    }
    return month;
}
function refineDay(calendarNative, fields, month, year, overflow) {
    return clampProp(fields, 'day', 1, calendarNative.daysInMonthParts(year, month), overflow);
}
function spliceFields(dest, additional, allPropNames, deletablePropNames) {
    let anyMatching = false;
    const nonMatchingPropNames = [];
    for (const propName of allPropNames) {
        if (additional[propName] !== undefined) {
            anyMatching = true;
        }
        else {
            nonMatchingPropNames.push(propName);
        }
    }
    Object.assign(dest, additional);
    if (anyMatching) {
        for (const deletablePropName of deletablePropNames ||
            nonMatchingPropNames) {
            delete dest[deletablePropName];
        }
    }
}

// ISO
// -----------------------------------------------------------------------------
// Refine
// ------
const isoYearMonthRefineDeps = {
    leapMonth: noop,
    monthsInYearPart: computeIsoMonthsInYear,
    isoFields: computeIsoFieldsFromParts,
};
const isoDateRefineDeps = {
    ...isoYearMonthRefineDeps,
    daysInMonthParts: computeIsoDaysInMonth,
};
const isoMonthDayRefineDeps = {
    ...isoDateRefineDeps,
    yearMonthForMonthDay: computeIsoYearMonthForMonthDay,
};
const isoYearMonthRefineOps = {
    ...nativeYearMonthRefineBase,
    ...isoYearMonthRefineDeps,
};
const isoDateRefineOps = {
    ...nativeDateRefineBase,
    ...isoMonthDayRefineDeps,
};
const isoMonthDayRefineOps = {
    ...nativeMonthDayRefineBase,
    ...isoMonthDayRefineDeps,
};
// Mod
// ---
({
    ...isoYearMonthRefineOps,
    mergeFields: nativeMergeFields,
});
({
    ...isoDateRefineOps,
    mergeFields: nativeMergeFields,
});
({
    ...isoMonthDayRefineOps,
    mergeFields: nativeMergeFields,
});
// Math
// ----
const isoMoveOpsOnly = {
    dateParts: computeIsoDateParts,
    monthCodeParts: computeIsoMonthCodeParts,
    monthsInYearPart: computeIsoMonthsInYear,
    daysInMonthParts: computeIsoDaysInMonth,
    monthAdd: isoMonthAdd,
    leapMonth: noop,
    epochMilli: isoArgsToEpochMilli,
};
const isoMoveOps = {
    ...nativeMoveBase,
    ...isoMoveOpsOnly,
};
const isoDiffOps = {
    ...nativeDiffBase,
    ...isoMoveOps,
    monthsInYearSpan: computeIsoMonthsInYearSpan,
};
({
    ...isoMoveOps,
    day: computeIsoDay,
});
({
    ...isoDiffOps,
    day: computeIsoDay,
});
// Standard
// --------
const isoStandardOps = {
    ...nativeStandardBase,
    dateParts: computeIsoDateParts,
    eraParts: computeIsoEraParts,
    monthCodeParts: computeIsoMonthCodeParts,
    yearMonthForMonthDay: computeIsoYearMonthForMonthDay,
    inLeapYearPart: computeIsoInLeapYear,
    leapMonth: noop,
    monthsInYearPart: computeIsoMonthsInYear,
    monthsInYearSpan: computeIsoMonthsInYearSpan,
    daysInMonthParts: computeIsoDaysInMonth,
    daysInYearPart: computeIsoDaysInYear,
    dayOfYear: computeIsoDayOfYear,
    isoFields: computeIsoFieldsFromParts,
    epochMilli: isoArgsToEpochMilli,
    monthAdd: isoMonthAdd,
    year: computeIsoYear,
    month: computeIsoMonth,
    day: computeIsoDay,
};
// Standard
// --------
const intlStandardOps = {
    ...nativeStandardBase,
    dateParts: computeIntlDateParts,
    eraParts: computeIntlEraParts,
    monthCodeParts: computeIntlMonthCodeParts,
    yearMonthForMonthDay: computeIntlYearMonthForMonthDay,
    inLeapYearPart: computeIntlInLeapYear,
    leapMonth: computeIntlLeapMonth,
    monthsInYearPart: computeIntlMonthsInYear,
    monthsInYearSpan: computeIntlMonthsInYearSpan,
    daysInMonthParts: computeIntlDaysInMonth,
    daysInYearPart: computeIntlDaysInYear,
    dayOfYear: computeIntlDayOfYear,
    isoFields: computeIsoFieldsFromIntlParts,
    epochMilli: computeIntlEpochMilli,
    monthAdd: intlMonthAdd,
    year: computeIntlYear,
    month: computeIntlMonth,
    day: computeIntlDay,
};
// Standard
const createNativeStandardOps = createNativeOpsCreator(isoStandardOps, intlStandardOps);
function createNativeOpsCreator(isoOps, intlOps) {
    return (calendarId) => {
        if (calendarId === isoCalendarId) {
            return isoOps;
        }
        if (calendarId === gregoryCalendarId || calendarId === japaneseCalendarId) {
            return Object.assign(Object.create(isoOps), { id: calendarId });
        }
        return Object.assign(Object.create(intlOps), queryIntlCalendar(calendarId));
    };
}

function constructInstantSlots(epochNano) {
    return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(epochNano))));
}
function constructZonedDateTimeSlots(refineCalendarArg, refineTimeZoneArg, epochNano, timeZoneArg, calendarArg = isoCalendarId) {
    return createZonedDateTimeSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(epochNano))), refineTimeZoneArg(timeZoneArg), refineCalendarArg(calendarArg));
}
function constructPlainDateTimeSlots(refineCalendarArg, isoYear, isoMonth, isoDay, isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0, calendarArg = isoCalendarId) {
    const isoFields = zipProps(isoDateTimeFieldNamesAsc, [
        isoYear,
        isoMonth,
        isoDay,
        isoHour,
        isoMinute,
        isoSecond,
        isoMillisecond,
        isoMicrosecond,
        isoNanosecond,
    ]);
    return createPlainDateTimeSlots(checkIsoDateTimeInBounds(checkIsoDateTimeFields(mapProps(toInteger, isoFields))), refineCalendarArg(calendarArg));
}
function constructPlainDateSlots(refineCalendarArg, isoYear, isoMonth, isoDay, calendarArg = isoCalendarId) {
    return createPlainDateSlots(checkIsoDateInBounds(checkIsoDateFields(mapProps(toInteger, {
        isoYear,
        isoMonth,
        isoDay,
    }))), refineCalendarArg(calendarArg));
}
function constructPlainYearMonthSlots(refineCalendarArg, isoYear, isoMonth, calendar = isoCalendarId, referenceIsoDay = 1) {
    const isoYearInt = toInteger(isoYear);
    const isoMonthInt = toInteger(isoMonth);
    const calendarSlot = refineCalendarArg(calendar);
    const isoDayInt = toInteger(referenceIsoDay);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
        isoYear: isoYearInt,
        isoMonth: isoMonthInt,
        isoDay: isoDayInt,
    })), calendarSlot);
}
function constructPlainMonthDaySlots(refineCalendarArg, isoMonth, isoDay, calendar = isoCalendarId, referenceIsoYear = isoEpochFirstLeapYear) {
    const isoMonthInt = toInteger(isoMonth);
    const isoDayInt = toInteger(isoDay);
    const calendarSlot = refineCalendarArg(calendar);
    const isoYearInt = toInteger(referenceIsoYear);
    return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
        isoYear: isoYearInt,
        isoMonth: isoMonthInt,
        isoDay: isoDayInt,
    })), calendarSlot);
}
function constructPlainTimeSlots(isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) {
    const isoFields = zipProps(isoTimeFieldNamesAsc, [
        isoHour,
        isoMinute,
        isoSecond,
        isoMillisecond,
        isoMicrosecond,
        isoNanosecond,
    ]);
    return createPlainTimeSlots(constrainIsoTimeFields(mapProps(toInteger, isoFields), 1 /* Overflow.Reject */));
}
function constructDurationSlots(years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0) {
    const durationFields = zipProps(durationFieldNamesAsc, [
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
    ]);
    return createDurationSlots(checkDurationFields(mapProps(toStrictInteger, durationFields)));
}

// Instant -> *
// -----------------------------------------------------------------------------
function instantToZonedDateTime(instantSlots, timeZoneSlot, calendarSlot = isoCalendarId) {
    return createZonedDateTimeSlots(instantSlots.epochNanoseconds, timeZoneSlot, calendarSlot);
}
// ZonedDateTime -> *
// -----------------------------------------------------------------------------
function zonedDateTimeToInstant(zonedDateTimeSlots0) {
    return createInstantSlots(zonedDateTimeSlots0.epochNanoseconds);
}
function zonedDateTimeToPlainDateTime(getTimeZoneOps, zonedDateTimeSlots0) {
    return createPlainDateTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps));
}
function zonedDateTimeToPlainDate(getTimeZoneOps, zonedDateTimeSlots0) {
    return createPlainDateSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps));
}
function zonedDateTimeToPlainYearMonth(getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) {
    const calendarSlot = zonedDateTimeSlots0.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertToPlainYearMonth(calendarOps, zonedDateTimeFields);
}
function zonedDateTimeToPlainMonthDay(getCalendarOps, zonedDateTimeSlots0, zonedDateTimeFields) {
    const calendarSlot = zonedDateTimeSlots0.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertToPlainMonthDay(calendarOps, zonedDateTimeFields);
}
function zonedDateTimeToPlainTime(getTimeZoneOps, zonedDateTimeSlots0) {
    return createPlainTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0, getTimeZoneOps));
}
// PlainDateTime -> *
// -----------------------------------------------------------------------------
function plainDateTimeToZonedDateTime(getTimeZoneOps, plainDateTimeSlots, timeZoneSlot, options) {
    return createZonedDateTimeSlots(dateToEpochNano(getTimeZoneOps, timeZoneSlot, plainDateTimeSlots, options), timeZoneSlot, plainDateTimeSlots.calendar);
}
function plainDateTimeToPlainYearMonth(getCalendarOps, plainDateTimeSlots, plainDateFields) {
    const calendarOps = getCalendarOps(plainDateTimeSlots.calendar);
    return createPlainYearMonthSlots({
        ...plainDateTimeSlots, // isoTimeFields and calendar
        ...convertToPlainYearMonth(calendarOps, plainDateFields),
    });
}
function plainDateTimeToPlainMonthDay(getCalendarOps, plainDateTimeSlots, plainDateFields) {
    const calendarOps = getCalendarOps(plainDateTimeSlots.calendar);
    return convertToPlainMonthDay(calendarOps, plainDateFields);
}
function dateToEpochNano(getTimeZoneOps, timeZoneSlot, isoFields, options) {
    const epochDisambig = refineEpochDisambigOptions(options);
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    return checkEpochNanoInBounds(getSingleInstantFor(timeZoneOps, isoFields, epochDisambig));
}
// PlainDate -> *
// -----------------------------------------------------------------------------
function plainDateToZonedDateTime(refineTimeZoneArg, refinePlainTimeArg, getTimeZoneOps, plainDateSlots, options) {
    const timeZoneSlot = refineTimeZoneArg(options.timeZone);
    const plainTimeArg = options.plainTime;
    const isoTimeFields = plainTimeArg !== undefined
        ? refinePlainTimeArg(plainTimeArg)
        : isoTimeFieldDefaults;
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    return createZonedDateTimeSlots(getSingleInstantFor(timeZoneOps, { ...plainDateSlots, ...isoTimeFields }), timeZoneSlot, plainDateSlots.calendar);
}
function plainDateToPlainDateTime(plainDateSlots, plainTimeFields = isoTimeFieldDefaults) {
    return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
        ...plainDateSlots,
        ...plainTimeFields,
    }));
}
function plainDateToPlainYearMonth(getCalendarOps, plainDateSlots, plainDateFields) {
    const calendarSlot = plainDateSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertToPlainYearMonth(calendarOps, plainDateFields);
}
function plainDateToPlainMonthDay(getCalendarOps, plainDateSlots, plainDateFields) {
    const calendarSlot = plainDateSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertToPlainMonthDay(calendarOps, plainDateFields);
}
// PlainYearMonth -> *
// -----------------------------------------------------------------------------
function plainYearMonthToPlainDate(getCalendarOps, plainYearMonthSlots, plainYearMonthFields, bag) {
    const calendarSlot = plainYearMonthSlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertPlainYearMonthToDate(calendarOps, plainYearMonthFields, bag);
}
// PlainMonthDay -> *
// -----------------------------------------------------------------------------
function plainMonthDayToPlainDate(getCalendarOps, plainMonthDaySlots, plainMonthDayFields, bag) {
    const calendarSlot = plainMonthDaySlots.calendar;
    const calendarOps = getCalendarOps(calendarSlot);
    return convertPlainMonthDayToDate(calendarOps, plainMonthDayFields, bag);
}
// PlainTime -> *
// -----------------------------------------------------------------------------
function plainTimeToZonedDateTime(refineTimeZoneArg, refinePlainDateArg, getTimeZoneOps, slots, options) {
    const refinedOptions = requireObjectLike(options);
    const plainDateSlots = refinePlainDateArg(refinedOptions.plainDate);
    const timeZoneSlot = refineTimeZoneArg(refinedOptions.timeZone);
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    return createZonedDateTimeSlots(getSingleInstantFor(timeZoneOps, { ...plainDateSlots, ...slots }), timeZoneSlot, plainDateSlots.calendar);
}
function plainTimeToPlainDateTime(plainTimeSlots0, plainDateSlots1) {
    return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
        ...plainTimeSlots0,
        ...plainDateSlots1,
    }));
}
// Epoch-* -> Instant
// -----------------------------------------------------------------------------
function epochSecToInstant(epochSec) {
    return createInstantSlots(checkEpochNanoInBounds(numberToDayTimeNano(epochSec, nanoInSec)));
}
function epochMilliToInstant(epochMilli) {
    return createInstantSlots(checkEpochNanoInBounds(numberToDayTimeNano(epochMilli, nanoInMilli)));
}
function epochMicroToInstant(epochMicro) {
    return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(epochMicro), nanoInMicro)));
}
function epochNanoToInstant(epochNano) {
    return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(epochNano))));
}

// ZonedDateTime with *
// -----------------------------------------------------------------------------
function zonedDateTimeWithPlainTime(getTimeZoneOps, zonedDateTimeSlots, plainTimeSlots = isoTimeFieldDefaults) {
    const timeZoneSlot = zonedDateTimeSlots.timeZone;
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    const isoFields = {
        ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
        ...plainTimeSlots,
    };
    const epochNano = getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2 /* OffsetDisambig.Prefer */);
    return createZonedDateTimeSlots(epochNano, timeZoneSlot, zonedDateTimeSlots.calendar);
}
function zonedDateTimeWithPlainDate(getTimeZoneOps, zonedDateTimeSlots, plainDateSlots) {
    const timeZoneSlot = zonedDateTimeSlots.timeZone;
    const timeZoneOps = getTimeZoneOps(timeZoneSlot);
    const isoFields = {
        ...zonedEpochSlotsToIso(zonedDateTimeSlots, timeZoneOps),
        ...plainDateSlots,
    };
    const calendar = getPreferredCalendarSlot(zonedDateTimeSlots.calendar, plainDateSlots.calendar);
    const epochNano = getMatchingInstantFor(timeZoneOps, isoFields, isoFields.offsetNanoseconds, 2 /* OffsetDisambig.Prefer */);
    return createZonedDateTimeSlots(epochNano, timeZoneSlot, calendar);
}
// PlainDateTime with *
// -----------------------------------------------------------------------------
function plainDateTimeWithPlainTime(plainDateTimeSlots, plainTimeSlots = isoTimeFieldDefaults) {
    return createPlainDateTimeSlots({
        ...plainDateTimeSlots,
        ...plainTimeSlots,
    });
}
function plainDateTimeWithPlainDate(plainDateTimeSlots, plainDateSlots) {
    return createPlainDateTimeSlots({
        ...plainDateTimeSlots,
        ...plainDateSlots,
    }, getPreferredCalendarSlot(plainDateTimeSlots.calendar, plainDateSlots.calendar));
}
// Anything with calendar/timeZone
// -----------------------------------------------------------------------------
function slotsWithCalendar(slots, calendarSlot) {
    return { ...slots, calendar: calendarSlot };
}
function slotsWithTimeZone(slots, timeZoneSlot) {
    return { ...slots, timeZone: timeZoneSlot };
}
// -----------------------------------------------------------------------------
function getPreferredCalendarSlot(a, b) {
    if (a === b) {
        return a;
    }
    const aId = getId(a);
    const bId = getId(b);
    if (aId === bId || aId === isoCalendarId) {
        return b;
    }
    if (bId === isoCalendarId) {
        return a;
    }
    throw new RangeError(mismatchingCalendars);
}

/*
RULES:
DateTimeFormat always determines calendar and timeZone. If given date object conflicts, throw error.
However, for ZonedDateTimeFormat::toLocaleString, timeZone is forced by obj and can't be provided.
*/
// Options Transformers
// -----------------------------------------------------------------------------
const numericStr = 'numeric';
const timeZoneNameStrs = ['timeZoneName'];
// Fallbacks
// ---------
const monthDayFallbacks = {
    month: numericStr,
    day: numericStr,
};
const yearMonthFallbacks = {
    year: numericStr,
    month: numericStr,
};
const dateFallbacks = {
    ...yearMonthFallbacks,
    day: numericStr,
};
const timeFallbacks = {
    hour: numericStr,
    minute: numericStr,
    second: numericStr,
};
const dateTimeFallbacks = {
    ...dateFallbacks,
    ...timeFallbacks,
};
const zonedFallbacks = {
    ...dateTimeFallbacks,
    timeZoneName: 'short',
};
// Valid Names
// -----------
// TODO: rename to 'standard'. sounds like others are invalid
const monthDayValidNames = Object.keys(monthDayFallbacks);
const yearMonthValidNames = Object.keys(yearMonthFallbacks);
const dateFallbackNames = Object.keys(dateFallbacks);
const timeFallbackNames = Object.keys(timeFallbacks);
const dateValidNames = [
    ...dateFallbackNames,
    'weekday',
    'dateStyle',
];
const timeValidNames = [
    ...timeFallbackNames,
    'dayPeriod',
    'timeStyle',
];
const dateTimeValidNames = [...dateValidNames, ...timeValidNames];
const zonedValidNames = [
    ...dateTimeValidNames,
    ...timeZoneNameStrs,
];
// Exclusions
// ----------
const dateExclusions = [...timeZoneNameStrs, ...timeValidNames];
const timeExclusions = [...timeZoneNameStrs, ...dateValidNames];
const yearMonthExclusions = [
    ...timeZoneNameStrs,
    'day',
    'weekday',
    'dateStyle',
    ...timeValidNames,
];
const monthDayExclusions = [
    ...timeZoneNameStrs,
    'year',
    'weekday',
    'dateStyle',
    ...timeValidNames,
];
function createOptionsTransformer(validNames, fallbacks, excludedNames = []) {
    const excludedNameSet = new Set(excludedNames);
    return (options) => {
        options = excludePropsByName(excludedNameSet, options);
        if (!hasAnyPropsByName(options, validNames)) {
            Object.assign(options, fallbacks);
        }
        return options;
    };
}
const transformMonthDayOptions = createOptionsTransformer(monthDayValidNames, monthDayFallbacks, monthDayExclusions);
const transformYearMonthOptions = createOptionsTransformer(yearMonthValidNames, yearMonthFallbacks, yearMonthExclusions);
const transformDateOptions = createOptionsTransformer(dateValidNames, dateFallbacks, dateExclusions);
const transformDateTimeOptions = createOptionsTransformer(dateTimeValidNames, dateTimeFallbacks, timeZoneNameStrs);
const transformTimeOptions = createOptionsTransformer(timeValidNames, timeFallbacks, timeExclusions);
// TOOD: rename to 'instant'?
const transformEpochOptions = createOptionsTransformer(dateTimeValidNames, dateTimeFallbacks);
const transformZonedEpochOptions = createOptionsTransformer(zonedValidNames, zonedFallbacks);
// Specific Epoch Nano Converters
// -----------------------------------------------------------------------------
function isoDateFieldsToEpochNano(isoFields, resolvedOptions) {
    const timeZoneNative = queryNativeTimeZone(resolvedOptions.timeZone);
    return getSingleInstantFor(timeZoneNative, {
        ...isoTimeFieldDefaults,
        isoHour: 12, // for whole-day dates, will not dst-shift into prev/next day
        ...isoFields,
    });
}
function isoTimeFieldsToEpochNano(internals, resolvedOptions) {
    const timeZoneNative = queryNativeTimeZone(resolvedOptions.timeZone);
    return getSingleInstantFor(timeZoneNative, {
        isoYear: isoEpochOriginYear,
        isoMonth: 1,
        isoDay: 1,
        ...internals,
    });
}
function extractEpochNano(slots) {
    return slots.epochNanoseconds;
}
const plainYearMonthConfig = [
    transformYearMonthOptions,
    isoDateFieldsToEpochNano,
    true,
];
const plainMonthDayConfig = [
    transformMonthDayOptions,
    isoDateFieldsToEpochNano,
    true,
];
const plainDateConfig = [
    transformDateOptions,
    isoDateFieldsToEpochNano,
];
const plainDateTimeConfig = [
    transformDateTimeOptions,
    isoDateFieldsToEpochNano,
];
const plainTimeConfig = [
    transformTimeOptions,
    isoTimeFieldsToEpochNano,
];
const instantConfig = [
    transformEpochOptions,
    extractEpochNano,
];
const zonedDateTimeConfig = [
    transformZonedEpochOptions,
    extractEpochNano,
    false,
    getCommonTimeZoneId,
];
const emptyOptions = {}; // constant reference for caching
function createFormatPrepper(config, queryFormat = createFormatForPrep) {
    const [transformOptions, , , getForcedTimeZoneId] = config;
    return (locales, options = emptyOptions, ...slotsList) => {
        const subformat = queryFormat(getForcedTimeZoneId ? getForcedTimeZoneId(...slotsList) : undefined, locales, options, transformOptions);
        const resolvedOptions = subformat.resolvedOptions();
        return [subformat, ...toEpochMillis(config, resolvedOptions, ...slotsList)];
    };
}
function createFormatForPrep(forcedTimeZoneId, locales, options, transformOptions) {
    options = transformOptions(options);
    if (forcedTimeZoneId) {
        if (options.timeZone !== undefined) {
            throw new TypeError(forbiddenFormatTimeZone);
        }
        options.timeZone = forcedTimeZoneId;
    }
    return new RawDateTimeFormat(locales, options);
}
// General Epoch Conversion
// -----------------------------------------------------------------------------
function toEpochMillis(config, resolvedOptions, ...slotsList) {
    const [, slotsToEpochNano, strictCalendarCheck] = config;
    return slotsList.map((slots) => {
        if (slots.calendar) {
            checkCalendarsCompatible(getId(slots.calendar), resolvedOptions.calendar, strictCalendarCheck);
        }
        const epochNano = slotsToEpochNano(slots, resolvedOptions);
        return epochNanoToMilli(epochNano);
    });
}
function checkCalendarsCompatible(internalCalendarId, resolvedCalendarId, strictCalendarCheck) {
    if ((strictCalendarCheck || internalCalendarId !== isoCalendarId) &&
        internalCalendarId !== resolvedCalendarId) {
        throw new RangeError(mismatchingCalendars);
    }
}
// -----------------------------------------------------------------------------
// specifically for formatting... rename
function getCommonTimeZoneId(slots0, // actually needed
slots1) {
    const timeZoneId = getId(slots0.timeZone);
    if (slots1 && getId(slots1.timeZone) !== timeZoneId) {
        throw new RangeError(mismatchingTimeZones);
    }
    return timeZoneId;
}

function getCurrentIsoDateTime(timeZoneOps) {
    const isoFields = zonedEpochNanoToIso(timeZoneOps, getCurrentEpochNanoseconds());
    return pluckProps(isoDateTimeFieldNamesAsc, isoFields);
}
function getCurrentEpochNanoseconds() {
    return epochMilliToNano(Date.now());
}
// -----------------------------------------------------------------------------
let currentTimeZoneId;
function getCurrentTimeZoneId() {
    return currentTimeZoneId || (currentTimeZoneId = computeCurrentTimeZoneId());
}
function computeCurrentTimeZoneId() {
    return new RawDateTimeFormat().resolvedOptions().timeZone;
}

export { DurationBranding, InstantBranding, PlainDateBranding, PlainDateTimeBranding, PlainMonthDayBranding, PlainTimeBranding, PlainYearMonthBranding, RawDateTimeFormat, ZonedDateTimeBranding, absDuration, addDurations, bindArgs, buildZonedIsoFields, compareDurations, compareInstants, compareIsoDateFields, compareIsoDateTimeFields, compareIsoTimeFields, compareZonedDateTimes, computeHoursInDay, computeStartOfDay, constructDurationSlots, constructInstantSlots, constructPlainDateSlots, constructPlainDateTimeSlots, constructPlainMonthDaySlots, constructPlainTimeSlots, constructPlainYearMonthSlots, constructZonedDateTimeSlots, copyOptions, createDurationSlots, createFormatForPrep, createFormatPrepper, createGetterDescriptors, createInstantSlots, createLazyGenerator, createNameDescriptors, createNativeStandardOps, createPlainDateSlots, createPlainDateTimeSlots, createPlainTimeSlots, createPropDescriptors, createStringTagDescriptors, createZonedDateTimeSlots, dateFieldNamesAlpha, diffInstants, diffPlainDateTimes, diffPlainDates, diffPlainTimes, diffPlainYearMonth, diffZonedDateTimes, durationFieldNamesAsc, durationWithFields, epochMicroToInstant, epochMilliToInstant, epochNanoToInstant, epochNanoToIso, epochSecToInstant, excludePropsByName, excludeUndefinedProps, forbiddenField, forbiddenValueOf, formatDurationIso, formatInstantIso, formatOffsetNano, formatPlainDateIso, formatPlainDateTimeIso, formatPlainMonthDayIso, formatPlainTimeIso, formatPlainYearMonthIso, formatZonedDateTimeIso, getCurrentEpochNanoseconds, getCurrentIsoDateTime, getCurrentTimeZoneId, getEpochMicroseconds, getEpochMilliseconds, getEpochNanoseconds, getEpochSeconds, getId, getRequiredDateFields, getRequiredMonthDayFields, getRequiredYearMonthFields, getSingleInstantFor, hasAllPropsByName, instantConfig, instantToZonedDateTime, instantsEqual, invalidBag, invalidCallingContext, invalidFormatType, invalidProtocol, isObjectLike, isTimeZoneSlotsEqual, isoCalendarId, isoTimeFieldDefaults, isoTimeFieldNamesAsc, mapPropNames, mapProps, mismatchingFormatTypes, moveInstant, movePlainDate, movePlainDateTime, movePlainTime, movePlainYearMonth, moveZonedDateTime, nanoInMilli, negateDuration, numberToDayTimeNano, parseCalendarId, parseDuration, parseInstant, parsePlainDate, parsePlainDateTime, parsePlainMonthDay, parsePlainTime, parsePlainYearMonth, parseTimeZoneId, parseZonedDateTime, parseZonedOrPlainDateTime, plainDateConfig, plainDateTimeConfig, plainDateTimeToPlainMonthDay, plainDateTimeToPlainYearMonth, plainDateTimeToZonedDateTime, plainDateTimeWithFields, plainDateTimeWithPlainDate, plainDateTimeWithPlainTime, plainDateTimesEqual, plainDateToPlainDateTime, plainDateToPlainMonthDay, plainDateToPlainYearMonth, plainDateToZonedDateTime, plainDateWithFields, plainDatesEqual, plainMonthDayConfig, plainMonthDayToPlainDate, plainMonthDayWithFields, plainMonthDaysEqual, plainTimeConfig, plainTimeToPlainDateTime, plainTimeToZonedDateTime, plainTimeWithFields, plainTimesEqual, plainYearMonthConfig, plainYearMonthToPlainDate, plainYearMonthWithFields, plainYearMonthsEqual, pluckProps, queryDurationBlank, queryDurationSign, queryNativeTimeZone, refineCalendarDiffOptions, refineDurationBag, refineEpochDisambigOptions, refineMaybeZonedDateTimeBag, refineOverflowOptions, refinePlainDateBag, refinePlainDateTimeBag, refinePlainMonthDayBag, refinePlainTimeBag, refinePlainYearMonthBag, refineZonedDateTimeBag, refineZonedFieldOptions, requireBoolean, requireFunction, requireInteger, requireIntegerOrUndefined, requireNonNullish, requireObjectLike, requirePositiveInteger, requireString, requireStringOrUndefined, resolveCalendarId, resolveTimeZoneId, roundDuration, roundInstant, roundPlainDateTime, roundPlainTime, roundZonedDateTime, slotsWithCalendar, slotsWithTimeZone, timeFieldNamesAsc, totalDuration, unitNamesAsc, validateTimeZoneOffset, zonedDateTimeConfig, zonedDateTimeToInstant, zonedDateTimeToPlainDate, zonedDateTimeToPlainDateTime, zonedDateTimeToPlainMonthDay, zonedDateTimeToPlainTime, zonedDateTimeToPlainYearMonth, zonedDateTimeWithFields, zonedDateTimeWithPlainDate, zonedDateTimeWithPlainTime, zonedDateTimesEqual, zonedEpochSlotsToIso };
