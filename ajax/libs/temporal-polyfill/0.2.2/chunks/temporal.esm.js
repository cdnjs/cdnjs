import { createGetterDescriptors, mapProps, createPropDescriptors, createStringTagDescriptors, createNameDescriptors, invalidCallingContext, hasAllPropsByName, invalidProtocol, invalidBag, RawDateTimeFormat, pluckProps, createLazyGenerator, invalidFormatType, createFormatPrepper, createFormatForPrep, mismatchingFormatTypes, plainYearMonthConfig, plainMonthDayConfig, plainDateConfig, plainDateTimeConfig, plainTimeConfig, instantConfig, zonedDateTimeConfig, requireStringOrUndefined, requireIntegerOrUndefined, requireInteger, requirePositiveInteger, requireBoolean, requireString, mapPropNames, getId, createPlainDateSlots, durationFieldNamesAsc, timeFieldNamesAsc, isoTimeFieldNamesAsc, getEpochSeconds, getEpochMilliseconds, getEpochMicroseconds, getEpochNanoseconds, createNativeStandardOps, forbiddenValueOf, bindArgs, excludePropsByName, PlainDateBranding, PlainYearMonthBranding, PlainMonthDayBranding, plainMonthDayWithFields, plainMonthDaysEqual, formatPlainMonthDayIso, plainMonthDayToPlainDate, constructPlainMonthDaySlots, copyOptions, isObjectLike, refineOverflowOptions, refinePlainMonthDayBag, parsePlainMonthDay, isoCalendarId, requireFunction, createInstantSlots, createPlainDateTimeSlots, validateTimeZoneOffset, queryNativeTimeZone, plainYearMonthWithFields, movePlainYearMonth, diffPlainYearMonth, plainYearMonthsEqual, formatPlainYearMonthIso, plainYearMonthToPlainDate, constructPlainYearMonthSlots, refinePlainYearMonthBag, parsePlainYearMonth, compareIsoDateFields, computeHoursInDay, formatOffsetNano, ZonedDateTimeBranding, zonedEpochSlotsToIso, zonedDateTimeWithFields, zonedDateTimeWithPlainTime, zonedDateTimeWithPlainDate, slotsWithTimeZone, slotsWithCalendar, moveZonedDateTime, createDurationSlots, diffZonedDateTimes, roundZonedDateTime, computeStartOfDay, zonedDateTimesEqual, formatZonedDateTimeIso, zonedDateTimeToInstant, zonedDateTimeToPlainDate, zonedDateTimeToPlainTime, zonedDateTimeToPlainDateTime, zonedDateTimeToPlainYearMonth, zonedDateTimeToPlainMonthDay, buildZonedIsoFields, constructZonedDateTimeSlots, refineZonedFieldOptions, refineZonedDateTimeBag, parseZonedDateTime, compareZonedDateTimes, moveInstant, diffInstants, roundInstant, instantsEqual, formatInstantIso, instantToZonedDateTime, requireObjectLike, constructInstantSlots, InstantBranding, parseInstant, numberToDayTimeNano, epochSecToInstant, epochMilliToInstant, epochMicroToInstant, epochNanoToInstant, compareInstants, nanoInMilli, epochNanoToIso, refineEpochDisambigOptions, getSingleInstantFor, isTimeZoneSlotsEqual, resolveTimeZoneId, parseTimeZoneId, plainTimeWithFields, movePlainTime, diffPlainTimes, roundPlainTime, plainTimesEqual, formatPlainTimeIso, plainTimeToZonedDateTime, plainTimeToPlainDateTime, constructPlainTimeSlots, PlainTimeBranding, PlainDateTimeBranding, createPlainTimeSlots, refinePlainTimeBag, parsePlainTime, compareIsoTimeFields, plainDateTimeWithFields, plainDateTimeWithPlainTime, plainDateTimeWithPlainDate, movePlainDateTime, diffPlainDateTimes, roundPlainDateTime, plainDateTimesEqual, formatPlainDateTimeIso, plainDateTimeToZonedDateTime, plainDateTimeToPlainYearMonth, plainDateTimeToPlainMonthDay, constructPlainDateTimeSlots, isoTimeFieldDefaults, refinePlainDateTimeBag, parsePlainDateTime, compareIsoDateTimeFields, plainDateWithFields, movePlainDate, diffPlainDates, plainDatesEqual, formatPlainDateIso, plainDateToZonedDateTime, plainDateToPlainDateTime, plainDateToPlainYearMonth, plainDateToPlainMonthDay, constructPlainDateSlots, refinePlainDateBag, parsePlainDate, unitNamesAsc, queryDurationBlank, queryDurationSign, constructDurationSlots, DurationBranding, durationWithFields, addDurations, negateDuration, absDuration, roundDuration, totalDuration, formatDurationIso, refineDurationBag, parseDuration, refineMaybeZonedDateTimeBag, parseZonedOrPlainDateTime, compareDurations, refineCalendarDiffOptions, dateFieldNamesAlpha, forbiddenField, excludeUndefinedProps, requireNonNullish, resolveCalendarId, parseCalendarId, getRequiredDateFields, getRequiredMonthDayFields, getRequiredYearMonthFields, getCurrentTimeZoneId, getCurrentEpochNanoseconds, createZonedDateTimeSlots, getCurrentIsoDateTime } from './internal.esm.js';

const slotsMap = new WeakMap();
// TODO: allow type-input, so caller doesn't need to cast so much
const getSlots = slotsMap.get.bind(slotsMap);
const setSlots = slotsMap.set.bind(slotsMap);
function createSlotClass(branding, construct, getters, methods, staticMethods) {
    function Class(...args) {
        if (this instanceof Class) {
            setSlots(this, construct(...args));
        }
        else {
            throw new TypeError(invalidCallingContext);
        }
    }
    Object.defineProperties(Class.prototype, {
        ...createGetterDescriptors(mapProps(bindMethod, getters)), // !!!
        ...createPropDescriptors(mapProps(bindMethod, methods)),
        ...createStringTagDescriptors('Temporal.' + branding),
    });
    Object.defineProperties(Class, {
        ...createPropDescriptors(staticMethods),
        ...createNameDescriptors(branding),
    });
    function bindMethod(method, methodName) {
        return Object.defineProperties(function (...args) {
            return method.call(this, getSpecificSlots(this), ...args);
        }, createNameDescriptors(methodName));
    }
    function getSpecificSlots(obj) {
        const slots = getSlots(obj);
        if (!slots || slots.branding !== branding) {
            throw new TypeError(invalidCallingContext);
        }
        return slots;
    }
    function createViaSlots(slots) {
        const instance = Object.create(Class.prototype);
        setSlots(instance, slots);
        return instance;
    }
    return [Class, createViaSlots, getSpecificSlots];
}
// Utils
// -----------------------------------------------------------------------------
// TODO: return type
function createProtocolValidator(propNames) {
    propNames = propNames.concat('id').sort();
    return (obj) => {
        if (!hasAllPropsByName(obj, propNames)) {
            throw new TypeError(invalidProtocol);
        }
        return obj;
    };
}
function rejectInvalidBag(bag) {
    if (getSlots(bag) ||
        bag.calendar !== undefined ||
        bag.timeZone !== undefined) {
        throw new TypeError(invalidBag);
    }
    return bag;
}

const DateTimeFormat = createDateTimeFormatClass();
const internalsMap = new WeakMap();
function createDateTimeFormatClass() {
    const members = RawDateTimeFormat.prototype;
    const memberDescriptors = Object.getOwnPropertyDescriptors(members);
    const classDescriptors = Object.getOwnPropertyDescriptors(RawDateTimeFormat);
    const DateTimeFormat = function (locales, options = {}) {
        // Constructor can be called without `new`
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#return_value
        if (!(this instanceof DateTimeFormat)) {
            return new DateTimeFormat(locales, options);
        }
        internalsMap.set(this, createDateTimeFormatInternals(locales, options));
    };
    for (const memberName in memberDescriptors) {
        const memberDescriptor = memberDescriptors[memberName];
        const formatLikeMethod = memberName.startsWith('format') && createFormatMethod(memberName);
        if (typeof memberDescriptor.value === 'function') {
            memberDescriptor.value =
                memberName === 'constructor'
                    ? DateTimeFormat
                    : formatLikeMethod || createProxiedMethod(memberName);
        }
        else if (formatLikeMethod) {
            // .format() is always bound to the instance. It's a getter
            // https://tc39.es/ecma402/#sec-intl.datetimeformat.prototype.format
            memberDescriptor.get = function () {
                return formatLikeMethod.bind(this);
            };
        }
    }
    classDescriptors.prototype.value = Object.create(members, memberDescriptors);
    Object.defineProperties(DateTimeFormat, classDescriptors);
    return DateTimeFormat;
}
function createFormatMethod(methodName) {
    return function (...formattables) {
        const prepFormat = internalsMap.get(this);
        const [format, ...rawFormattables] = prepFormat(...formattables);
        return format[methodName](...rawFormattables);
    };
}
function createProxiedMethod(methodName) {
    return function (...args) {
        const prepFormat = internalsMap.get(this);
        return prepFormat.rawFormat[methodName](...args);
    };
}
// Config
// -----------------------------------------------------------------------------
const classFormatConfigs = {
    PlainYearMonth: plainYearMonthConfig,
    PlainMonthDay: plainMonthDayConfig,
    PlainDate: plainDateConfig,
    PlainDateTime: plainDateTimeConfig,
    PlainTime: plainTimeConfig,
    Instant: instantConfig,
    // ZonedDateTime not allowed to be formatted by Intl.DateTimeFormat
};
function createDateTimeFormatInternals(locales, options = {}) {
    const rawFormat = new RawDateTimeFormat(locales, options);
    const resolveOptions = rawFormat.resolvedOptions();
    const resolvedLocale = resolveOptions.locale;
    const copiedOptions = pluckProps(Object.keys(options), resolveOptions);
    const queryFormatPrepperForBranding = createLazyGenerator(createFormatPrepperForBranding);
    const prepFormat = (...formattables) => {
        let branding;
        const slotsList = formattables.map((formattable, i) => {
            const slots = getSlots(formattable);
            const slotsBranding = (slots || {}).branding;
            if (i && branding && branding !== slotsBranding) {
                throw new TypeError(mismatchingFormatTypes);
            }
            branding = slotsBranding;
            return slots;
        });
        if (branding) {
            return queryFormatPrepperForBranding(branding)(resolvedLocale, copiedOptions, ...slotsList);
        }
        return [rawFormat, ...formattables];
    };
    prepFormat.rawFormat = rawFormat;
    return prepFormat;
}
function createFormatPrepperForBranding(branding) {
    const config = classFormatConfigs[branding];
    if (!config) {
        throw new TypeError(invalidFormatType(branding));
    }
    return createFormatPrepper(config, 
    // a generator that conveniently caches by the first arg: forcedTimeZoneId
    createLazyGenerator(createFormatForPrep));
}
// Format Prepping for each class' toLocaleString
// (best place for this?)
// -----------------------------------------------------------------------------
const prepPlainYearMonthFormat = createFormatPrepper(plainYearMonthConfig);
const prepPlainMonthDayFormat = createFormatPrepper(plainMonthDayConfig);
const prepPlainDateFormat = createFormatPrepper(plainDateConfig);
const prepPlainDateTimeFormat = createFormatPrepper(plainDateTimeConfig);
const prepPlainTimeFormat = createFormatPrepper(plainTimeConfig);
const prepInstantFormat = createFormatPrepper(instantConfig);
const prepZonedDateTimeFormat = createFormatPrepper(zonedDateTimeConfig);

const yearMonthOnlyRefiners = {
    era: requireStringOrUndefined,
    eraYear: requireIntegerOrUndefined,
    year: requireInteger,
    month: requirePositiveInteger,
    daysInMonth: requirePositiveInteger,
    daysInYear: requirePositiveInteger,
    inLeapYear: requireBoolean,
    monthsInYear: requirePositiveInteger,
};
const monthOnlyRefiners = {
    monthCode: requireString,
};
const dayOnlyRefiners = {
    day: requirePositiveInteger,
};
const dateOnlyRefiners = {
    dayOfWeek: requirePositiveInteger,
    dayOfYear: requirePositiveInteger,
    weekOfYear: requirePositiveInteger,
    yearOfWeek: requireInteger,
    daysInWeek: requirePositiveInteger,
};
const dateRefiners = {
    ...yearMonthOnlyRefiners,
    ...monthOnlyRefiners,
    ...dayOnlyRefiners,
    ...dateOnlyRefiners,
};

// For Calendar
// -----------------------------------------------------------------------------
// Always assumes underlying Native calendar `ops`
function createCalendarFieldMethods(methodNameMap, alsoAccept) {
    const methods = {};
    for (const methodName in methodNameMap) {
        methods[methodName] = function ({ native }, dateArg) {
            const argSlots = (getSlots(dateArg) || {});
            const { branding } = argSlots;
            const refinedSlots = branding === PlainDateBranding || alsoAccept.includes(branding)
                ? argSlots
                : toPlainDateSlots(dateArg);
            return native[methodName](refinedSlots);
        };
    }
    return methods;
}
const calendarFieldMethods = {
    ...createCalendarFieldMethods(yearMonthOnlyRefiners, [
        PlainYearMonthBranding,
    ]),
    ...createCalendarFieldMethods(dateOnlyRefiners, []),
    ...createCalendarFieldMethods(monthOnlyRefiners, [
        PlainYearMonthBranding,
        PlainMonthDayBranding,
    ]),
    ...createCalendarFieldMethods(dayOnlyRefiners, [PlainMonthDayBranding]),
};
// For PlainDate/etc
// -----------------------------------------------------------------------------
// Assumes general calendar (native/adapter)
function createCalendarGetters(methodNameMap) {
    const methods = {};
    for (const methodName in methodNameMap) {
        methods[methodName] = function (slots) {
            const { calendar } = slots;
            const simpleOps = createSimpleOps(calendar);
            return simpleOps[methodName](slots);
        };
    }
    return methods;
}
const dateGetters = createCalendarGetters(dateRefiners);
const yearMonthGetters = createCalendarGetters({
    ...yearMonthOnlyRefiners,
    ...monthOnlyRefiners,
});
const monthDayGetters = createCalendarGetters({
    ...monthOnlyRefiners,
    ...dayOnlyRefiners,
});
const calendarIdGetters = {
    calendarId(slots) {
        return getId(slots.calendar);
    },
};
const adapterSimpleOps = mapProps((refiner, methodName) => {
    return function (isoFields) {
        const { calendarProtocol } = this;
        return refiner(calendarProtocol[methodName](createPlainDate(createPlainDateSlots(isoFields, calendarProtocol))));
    };
}, dateRefiners);
function createAdapterSimpleOps(calendarProtocol) {
    return Object.assign(Object.create(adapterSimpleOps), {
        calendarProtocol,
    });
}
function createSimpleOps(calendarSlot) {
    if (typeof calendarSlot === 'string') {
        return createNativeStandardOps(calendarSlot); // has everything
    }
    return createAdapterSimpleOps(calendarSlot);
}
// Duration
// -----------------------------------------------------------------------------
const durationGetters = mapPropNames((propName) => {
    return function (slots) {
        return slots[propName];
    };
}, durationFieldNamesAsc);
// Time
// -----------------------------------------------------------------------------
const timeGetters = mapPropNames((_name, i) => {
    return function (slots) {
        return slots[isoTimeFieldNamesAsc[i]];
    };
}, timeFieldNamesAsc);
// Epoch
// -----------------------------------------------------------------------------
const epochGetters = {
    epochSeconds: getEpochSeconds,
    epochMilliseconds: getEpochMilliseconds,
    epochMicroseconds: getEpochMicroseconds,
    epochNanoseconds: getEpochNanoseconds,
};
// Misc
// -----------------------------------------------------------------------------
function neverValueOf() {
    throw new TypeError(forbiddenValueOf);
}
function createCalendarFromSlots({ calendar, }) {
    return typeof calendar === 'string' ? new Calendar(calendar) : calendar;
}
// for getISOFields
const removeBranding = bindArgs(excludePropsByName, new Set([/*@__KEY__*/ 'branding']));

const [PlainMonthDay, createPlainMonthDay, getPlainMonthDaySlots] = createSlotClass(PlainMonthDayBranding, bindArgs(constructPlainMonthDaySlots, refineCalendarSlot), {
    ...calendarIdGetters,
    ...monthDayGetters,
}, {
    with(slots, mod, options) {
        return createPlainMonthDay(plainMonthDayWithFields(createMonthDayModOps, slots, this, rejectInvalidBag(mod), options));
    },
    equals(slots, otherArg) {
        return plainMonthDaysEqual(slots, toPlainMonthDaySlots(otherArg));
    },
    toString: formatPlainMonthDayIso,
    toJSON(slots) {
        return formatPlainMonthDayIso(slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepPlainMonthDayFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toPlainDate(slots, bag) {
        return createPlainDate(plainMonthDayToPlainDate(createDateModOps, slots, this, bag));
    },
    getISOFields: removeBranding,
    getCalendar: createCalendarFromSlots,
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createPlainMonthDay(toPlainMonthDaySlots(arg, options));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toPlainMonthDaySlots(arg, options) {
    options = copyOptions(options);
    if (isObjectLike(arg)) {
        const slots = getSlots(arg);
        if (slots && slots.branding === PlainMonthDayBranding) {
            refineOverflowOptions(options); // parse unused options
            return slots;
        }
        const calendarMaybe = extractCalendarSlotFromBag(arg);
        const calendar = calendarMaybe || isoCalendarId;
        return refinePlainMonthDayBag(createMonthDayRefineOps(calendar), !calendarMaybe, arg, options);
    }
    const res = parsePlainMonthDay(createNativeStandardOps, arg);
    refineOverflowOptions(options); // parse unused options
    return res;
}

// Individual Adapters
// -----------------------------------------------------------------------------
function getOffsetNanosecondsForAdapter(timeZoneProtocol, getOffsetNanosecondsFor, epochNano) {
    return validateTimeZoneOffsetRes(getOffsetNanosecondsFor.call(timeZoneProtocol, createInstant(createInstantSlots(epochNano))));
}
function getPossibleInstantsForAdapter(timeZoneProtocol, getPossibleInstantsFor, isoFields) {
    return [
        ...getPossibleInstantsFor.call(timeZoneProtocol, createPlainDateTime(createPlainDateTimeSlots(isoFields, isoCalendarId))),
    ].map((instant) => {
        return getInstantSlots(instant).epochNanoseconds;
    });
}
function validateTimeZoneOffsetRes(offsetNano) {
    return validateTimeZoneOffset(requireInteger(offsetNano));
}
// Adapter Sets
// -----------------------------------------------------------------------------
const timeZoneAdapters = {
    getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
    getPossibleInstantsFor: getPossibleInstantsForAdapter,
};
// TODO: rename to be about 'offset'
const simpleTimeZoneAdapters = {
    getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
};
function createAdapterOps(timeZoneProtocol, adapterFuncs = timeZoneAdapters) {
    const keys = Object.keys(adapterFuncs).sort();
    const boundFuncs = {};
    for (const key of keys) {
        boundFuncs[key] = bindArgs(adapterFuncs[key], timeZoneProtocol, requireFunction(timeZoneProtocol[key]));
    }
    return boundFuncs;
}

function createTimeZoneOps(timeZoneSlot, adapterFuncs) {
    if (typeof timeZoneSlot === 'string') {
        return queryNativeTimeZone(timeZoneSlot);
    }
    return createAdapterOps(timeZoneSlot, adapterFuncs);
}
function createTimeZoneOffsetOps(timeZoneSlot) {
    return createTimeZoneOps(timeZoneSlot, simpleTimeZoneAdapters);
}

const [PlainYearMonth, createPlainYearMonth, getPlainYearMonthSlots] = createSlotClass(PlainYearMonthBranding, bindArgs(constructPlainYearMonthSlots, refineCalendarSlot), {
    ...calendarIdGetters,
    ...yearMonthGetters,
}, {
    with(slots, mod, options) {
        return createPlainYearMonth(plainYearMonthWithFields(createYearMonthModOps, slots, this, rejectInvalidBag(mod), options));
    },
    add(slots, durationArg, options) {
        return createPlainYearMonth(movePlainYearMonth(createYearMonthMoveOps, false, slots, toDurationSlots(durationArg), options));
    },
    subtract(slots, durationArg, options) {
        return createPlainYearMonth(movePlainYearMonth(createYearMonthMoveOps, true, slots, toDurationSlots(durationArg), options));
    },
    until(slots, otherArg, options) {
        return createDuration(diffPlainYearMonth(createYearMonthDiffOps, false, slots, toPlainYearMonthSlots(otherArg), options));
    },
    since(slots, otherArg, options) {
        return createDuration(diffPlainYearMonth(createYearMonthDiffOps, true, slots, toPlainYearMonthSlots(otherArg), options));
    },
    equals(slots, otherArg) {
        return plainYearMonthsEqual(slots, toPlainYearMonthSlots(otherArg));
    },
    toString: formatPlainYearMonthIso,
    toJSON(slots) {
        return formatPlainYearMonthIso(slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepPlainYearMonthFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toPlainDate(slots, bag) {
        return createPlainDate(plainYearMonthToPlainDate(createDateModOps, slots, this, bag));
    },
    getISOFields: removeBranding,
    getCalendar: createCalendarFromSlots,
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createPlainYearMonth(toPlainYearMonthSlots(arg, options));
    },
    compare(arg0, arg1) {
        return compareIsoDateFields(toPlainYearMonthSlots(arg0), toPlainYearMonthSlots(arg1));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toPlainYearMonthSlots(arg, options) {
    options = copyOptions(options);
    if (isObjectLike(arg)) {
        const slots = getSlots(arg);
        if (slots && slots.branding === PlainYearMonthBranding) {
            refineOverflowOptions(options); // parse unused options
            return slots;
        }
        return refinePlainYearMonthBag(createYearMonthRefineOps(getCalendarSlotFromBag(arg)), // !!!
        arg, // !!!
        options);
    }
    const res = parsePlainYearMonth(createNativeStandardOps, arg);
    refineOverflowOptions(options); // parse unused options
    return res;
}

const [ZonedDateTime, createZonedDateTime] = createSlotClass(ZonedDateTimeBranding, bindArgs(constructZonedDateTimeSlots, refineCalendarSlot, refineTimeZoneSlot), {
    ...epochGetters,
    ...calendarIdGetters,
    ...adaptDateMethods(dateGetters),
    ...adaptDateMethods(timeGetters),
    hoursInDay(slots) {
        return computeHoursInDay(createTimeZoneOps, slots);
    },
    offsetNanoseconds(slots) {
        return slotsToIso(slots).offsetNanoseconds;
    },
    offset(slots) {
        return formatOffsetNano(slotsToIso(slots).offsetNanoseconds);
    },
    timeZoneId(slots) {
        return getId(slots.timeZone);
    },
}, {
    with(slots, mod, options) {
        return createZonedDateTime(zonedDateTimeWithFields(createDateModOps, createTimeZoneOps, slots, this, rejectInvalidBag(mod), options));
    },
    withPlainTime(slots, plainTimeArg) {
        return createZonedDateTime(zonedDateTimeWithPlainTime(createTimeZoneOps, slots, optionalToPlainTimeFields(plainTimeArg)));
    },
    withPlainDate(slots, plainDateArg) {
        return createZonedDateTime(zonedDateTimeWithPlainDate(createTimeZoneOps, slots, toPlainDateSlots(plainDateArg)));
    },
    withTimeZone(slots, timeZoneArg) {
        return createZonedDateTime(slotsWithTimeZone(slots, refineTimeZoneSlot(timeZoneArg)));
    },
    withCalendar(slots, calendarArg) {
        return createZonedDateTime(slotsWithCalendar(slots, refineCalendarSlot(calendarArg)));
    },
    add(slots, durationArg, options) {
        return createZonedDateTime(moveZonedDateTime(createMoveOps, createTimeZoneOps, false, slots, toDurationSlots(durationArg), options));
    },
    subtract(slots, durationArg, options) {
        return createZonedDateTime(moveZonedDateTime(createMoveOps, createTimeZoneOps, true, slots, toDurationSlots(durationArg), options));
    },
    until(slots, otherArg, options) {
        return createDuration(createDurationSlots(diffZonedDateTimes(createDiffOps, createTimeZoneOps, false, slots, toZonedDateTimeSlots(otherArg), options)));
    },
    since(slots, otherArg, options) {
        return createDuration(createDurationSlots(diffZonedDateTimes(createDiffOps, createTimeZoneOps, true, slots, toZonedDateTimeSlots(otherArg), options)));
    },
    round(slots, options) {
        return createZonedDateTime(roundZonedDateTime(createTimeZoneOps, slots, options));
    },
    startOfDay(slots) {
        return createZonedDateTime(computeStartOfDay(createTimeZoneOps, slots));
    },
    equals(slots, otherArg) {
        return zonedDateTimesEqual(slots, toZonedDateTimeSlots(otherArg));
    },
    toString(slots, options) {
        return formatZonedDateTimeIso(createTimeZoneOffsetOps, slots, options);
    },
    toJSON(slots) {
        return formatZonedDateTimeIso(createTimeZoneOffsetOps, slots);
    },
    toLocaleString(slots, locales, options = {}) {
        const [format, epochMilli] = prepZonedDateTimeFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toInstant(slots) {
        return createInstant(zonedDateTimeToInstant(slots));
    },
    toPlainDate(slots) {
        return createPlainDate(zonedDateTimeToPlainDate(createTimeZoneOffsetOps, slots));
    },
    toPlainTime(slots) {
        return createPlainTime(zonedDateTimeToPlainTime(createTimeZoneOffsetOps, slots));
    },
    toPlainDateTime(slots) {
        return createPlainDateTime(zonedDateTimeToPlainDateTime(createTimeZoneOffsetOps, slots));
    },
    toPlainYearMonth(slots) {
        return createPlainYearMonth(zonedDateTimeToPlainYearMonth(createYearMonthRefineOps, slots, this));
    },
    toPlainMonthDay(slots) {
        return createPlainMonthDay(zonedDateTimeToPlainMonthDay(createMonthDayRefineOps, slots, this));
    },
    getISOFields(slots) {
        return buildZonedIsoFields(createTimeZoneOffsetOps, slots);
    },
    getCalendar: createCalendarFromSlots,
    getTimeZone({ timeZone, }) {
        return typeof timeZone === 'string' ? new TimeZone(timeZone) : timeZone;
    },
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createZonedDateTime(toZonedDateTimeSlots(arg, options));
    },
    compare(arg0, arg1) {
        return compareZonedDateTimes(toZonedDateTimeSlots(arg0), toZonedDateTimeSlots(arg1));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toZonedDateTimeSlots(arg, options) {
    options = copyOptions(options);
    if (isObjectLike(arg)) {
        const slots = getSlots(arg);
        if (slots && slots.branding === ZonedDateTimeBranding) {
            refineZonedFieldOptions(options); // parse unused options
            return slots;
        }
        const calendarSlot = getCalendarSlotFromBag(arg);
        return refineZonedDateTimeBag(refineTimeZoneSlot, createTimeZoneOps, createDateRefineOps(calendarSlot), calendarSlot, arg, // !!!
        options);
    }
    return parseZonedDateTime(arg, options);
}
function slotsToIso(slots) {
    return zonedEpochSlotsToIso(slots, createTimeZoneOffsetOps);
}
function adaptDateMethods(methods) {
    return mapProps((method) => {
        return (slots) => {
            return method(slotsToIso(slots));
        };
    }, methods);
}

const [Instant, createInstant, getInstantSlots] = createSlotClass(InstantBranding, constructInstantSlots, epochGetters, {
    add(slots, durationArg) {
        return createInstant(moveInstant(false, slots, toDurationSlots(durationArg)));
    },
    subtract(slots, durationArg) {
        return createInstant(moveInstant(true, slots, toDurationSlots(durationArg)));
    },
    until(slots, otherArg, options) {
        return createDuration(diffInstants(false, slots, toInstantSlots(otherArg), options));
    },
    since(slots, otherArg, options) {
        return createDuration(diffInstants(true, slots, toInstantSlots(otherArg), options));
    },
    round(slots, options) {
        return createInstant(roundInstant(slots, options));
    },
    equals(slots, otherArg) {
        return instantsEqual(slots, toInstantSlots(otherArg));
    },
    toString(slots, options) {
        return formatInstantIso(refineTimeZoneSlot, createTimeZoneOffsetOps, slots, options);
    },
    toJSON(slots) {
        return formatInstantIso(refineTimeZoneSlot, createTimeZoneOffsetOps, slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepInstantFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toZonedDateTimeISO(slots, timeZoneArg) {
        return createZonedDateTime(instantToZonedDateTime(slots, refineTimeZoneSlot(timeZoneArg)));
    },
    toZonedDateTime(slots, options) {
        const refinedObj = requireObjectLike(options);
        return createZonedDateTime(instantToZonedDateTime(slots, refineTimeZoneSlot(refinedObj.timeZone), refineCalendarSlot(refinedObj.calendar)));
    },
    valueOf: neverValueOf,
}, {
    from(arg) {
        return createInstant(toInstantSlots(arg));
    },
    fromEpochSeconds(epochSec) {
        return createInstant(epochSecToInstant(epochSec));
    },
    fromEpochMilliseconds(epochMilli) {
        return createInstant(epochMilliToInstant(epochMilli));
    },
    fromEpochMicroseconds(epochMicro) {
        return createInstant(epochMicroToInstant(epochMicro));
    },
    fromEpochNanoseconds(epochNano) {
        return createInstant(epochNanoToInstant(epochNano));
    },
    compare(a, b) {
        return compareInstants(toInstantSlots(a), toInstantSlots(b));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toInstantSlots(arg) {
    if (isObjectLike(arg)) {
        const slots = getSlots(arg);
        if (slots) {
            switch (slots.branding) {
                case InstantBranding:
                    return slots;
                case ZonedDateTimeBranding:
                    return createInstantSlots(slots
                        .epochNanoseconds);
            }
        }
    }
    return parseInstant(arg);
}
// Legacy Date
// -----------------------------------------------------------------------------
function toTemporalInstant() {
    return createInstant(createInstantSlots(numberToDayTimeNano(this.valueOf(), nanoInMilli)));
}

const [TimeZone, createTimeZone] = createSlotClass('TimeZone', (id) => {
    const slotId = resolveTimeZoneId(id);
    const timeZoneNative = queryNativeTimeZone(slotId);
    return {
        branding: 'TimeZone',
        id: slotId,
        native: timeZoneNative,
    };
}, {
    id(slots) {
        return slots.id;
    },
}, {
    toString(slots) {
        return slots.id;
    },
    toJSON(slots) {
        return slots.id;
    },
    getPossibleInstantsFor({ native }, plainDateTimeArg) {
        return native
            .getPossibleInstantsFor(toPlainDateTimeSlots(plainDateTimeArg))
            .map((epochNano) => {
            return createInstant(createInstantSlots(epochNano));
        });
    },
    getOffsetNanosecondsFor({ native }, instantArg) {
        return native.getOffsetNanosecondsFor(toInstantSlots(instantArg).epochNanoseconds);
    },
    getOffsetStringFor(_slots, instantArg) {
        const epochNano = toInstantSlots(instantArg).epochNanoseconds;
        const calendarOps = createAdapterOps(this, simpleTimeZoneAdapters); // for accessing own methods
        const offsetNano = calendarOps.getOffsetNanosecondsFor(epochNano);
        return formatOffsetNano(offsetNano);
    },
    getPlainDateTimeFor(_slots, instantArg, calendarArg = isoCalendarId) {
        const epochNano = toInstantSlots(instantArg).epochNanoseconds;
        const calendarOps = createAdapterOps(this, simpleTimeZoneAdapters); // for accessing own methods
        const offsetNano = calendarOps.getOffsetNanosecondsFor(epochNano);
        return createPlainDateTime(createPlainDateTimeSlots(epochNanoToIso(epochNano, offsetNano), refineCalendarSlot(calendarArg)));
    },
    getInstantFor(_slots, plainDateTimeArg, options) {
        const isoFields = toPlainDateTimeSlots(plainDateTimeArg);
        const epochDisambig = refineEpochDisambigOptions(options);
        const calendarOps = createAdapterOps(this); // for accessing own methods
        return createInstant(createInstantSlots(getSingleInstantFor(calendarOps, isoFields, epochDisambig)));
    },
    getNextTransition({ native }, instantArg) {
        return getImplTransition(1, native, instantArg);
    },
    getPreviousTransition({ native }, instantArg) {
        return getImplTransition(-1, native, instantArg);
    },
    equals(_slots, otherArg) {
        return !!isTimeZoneSlotsEqual(this, refineTimeZoneSlot(otherArg));
    },
}, {
    from(arg) {
        const timeZoneSlot = refineTimeZoneSlot(arg);
        return typeof timeZoneSlot === 'string'
            ? new TimeZone(timeZoneSlot)
            : timeZoneSlot;
    },
});
// Utils
// -----------------------------------------------------------------------------
function getImplTransition(direction, impl, instantArg) {
    const epochNano = impl.getTransition(toInstantSlots(instantArg).epochNanoseconds, direction);
    return epochNano ? createInstant(createInstantSlots(epochNano)) : null;
}
function refineTimeZoneSlot(arg) {
    if (isObjectLike(arg)) {
        return ((getSlots(arg) || {}).timeZone ||
            validateTimeZoneProtocol(arg));
    }
    return refineTimeZoneSlotString(arg);
}
function refineTimeZoneSlotString(arg) {
    return resolveTimeZoneId(parseTimeZoneId(requireString(arg)));
}
const validateTimeZoneProtocol = createProtocolValidator(Object.keys(timeZoneAdapters));

const [PlainTime, createPlainTime] = createSlotClass(PlainTimeBranding, constructPlainTimeSlots, timeGetters, {
    with(_slots, mod, options) {
        return createPlainTime(plainTimeWithFields(this, rejectInvalidBag(mod), options));
    },
    add(slots, durationArg) {
        return createPlainTime(movePlainTime(false, slots, toDurationSlots(durationArg)));
    },
    subtract(slots, durationArg) {
        return createPlainTime(movePlainTime(true, slots, toDurationSlots(durationArg)));
    },
    until(slots, otherArg, options) {
        return createDuration(diffPlainTimes(false, slots, toPlainTimeSlots(otherArg), options));
    },
    since(slots, otherArg, options) {
        return createDuration(diffPlainTimes(true, slots, toPlainTimeSlots(otherArg), options));
    },
    round(slots, options) {
        return createPlainTime(roundPlainTime(slots, options));
    },
    equals(slots, other) {
        return plainTimesEqual(slots, toPlainTimeSlots(other));
    },
    toString: formatPlainTimeIso,
    toJSON(slots) {
        return formatPlainTimeIso(slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepPlainTimeFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toZonedDateTime(slots, options) {
        return createZonedDateTime(plainTimeToZonedDateTime(refineTimeZoneSlot, toPlainDateSlots, createTimeZoneOps, slots, options));
    },
    toPlainDateTime(slots, plainDateArg) {
        return createPlainDateTime(plainTimeToPlainDateTime(slots, toPlainDateSlots(plainDateArg)));
    },
    getISOFields: removeBranding,
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createPlainTime(toPlainTimeSlots(arg, options));
    },
    compare(arg0, arg1) {
        return compareIsoTimeFields(toPlainTimeSlots(arg0), toPlainTimeSlots(arg1));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toPlainTimeSlots(arg, options) {
    if (isObjectLike(arg)) {
        const slots = (getSlots(arg) || {});
        switch (slots.branding) {
            case PlainTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return slots;
            case PlainDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return createPlainTimeSlots(slots);
            case ZonedDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return zonedDateTimeToPlainTime(createTimeZoneOffsetOps, slots);
        }
        return refinePlainTimeBag(arg, options);
    }
    refineOverflowOptions(options); // parse unused options
    return parsePlainTime(arg);
}
function optionalToPlainTimeFields(timeArg) {
    return timeArg === undefined ? undefined : toPlainTimeSlots(timeArg);
}

const [PlainDateTime, createPlainDateTime] = createSlotClass(PlainDateTimeBranding, bindArgs(constructPlainDateTimeSlots, refineCalendarSlot), {
    ...calendarIdGetters,
    ...dateGetters,
    ...timeGetters,
}, {
    with(slots, mod, options) {
        return createPlainDateTime(plainDateTimeWithFields(createDateModOps, slots, this, rejectInvalidBag(mod), options));
    },
    withPlainTime(slots, plainTimeArg) {
        return createPlainDateTime(plainDateTimeWithPlainTime(slots, optionalToPlainTimeFields(plainTimeArg)));
    },
    withPlainDate(slots, plainDateArg) {
        return createPlainDateTime(plainDateTimeWithPlainDate(slots, toPlainDateSlots(plainDateArg)));
    },
    withCalendar(slots, calendarArg) {
        return createPlainDateTime(slotsWithCalendar(slots, refineCalendarSlot(calendarArg)));
    },
    add(slots, durationArg, options) {
        return createPlainDateTime(movePlainDateTime(createMoveOps, false, slots, toDurationSlots(durationArg), options));
    },
    subtract(slots, durationArg, options) {
        return createPlainDateTime(movePlainDateTime(createMoveOps, true, slots, toDurationSlots(durationArg), options));
    },
    until(slots, otherArg, options) {
        return createDuration(diffPlainDateTimes(createDiffOps, false, slots, toPlainDateTimeSlots(otherArg), options));
    },
    since(slots, otherArg, options) {
        return createDuration(diffPlainDateTimes(createDiffOps, true, slots, toPlainDateTimeSlots(otherArg), options));
    },
    round(slots, options) {
        return createPlainDateTime(roundPlainDateTime(slots, options));
    },
    equals(slots, otherArg) {
        return plainDateTimesEqual(slots, toPlainDateTimeSlots(otherArg));
    },
    toString(slots, options) {
        return formatPlainDateTimeIso(slots, options);
    },
    toJSON(slots) {
        return formatPlainDateTimeIso(slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepPlainDateTimeFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toZonedDateTime(slots, timeZoneArg, options) {
        return createZonedDateTime(plainDateTimeToZonedDateTime(createTimeZoneOps, slots, refineTimeZoneSlot(timeZoneArg), options));
    },
    toPlainDate(slots) {
        return createPlainDate(createPlainDateSlots(slots));
    },
    toPlainYearMonth(slots) {
        return createPlainYearMonth(plainDateTimeToPlainYearMonth(createYearMonthRefineOps, slots, this));
    },
    toPlainMonthDay(slots) {
        return createPlainMonthDay(plainDateTimeToPlainMonthDay(createMonthDayRefineOps, slots, this));
    },
    toPlainTime(slots) {
        return createPlainTime(createPlainTimeSlots(slots));
    },
    getISOFields: removeBranding,
    getCalendar: createCalendarFromSlots,
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createPlainDateTime(toPlainDateTimeSlots(arg, options));
    },
    compare(arg0, arg1) {
        return compareIsoDateTimeFields(toPlainDateTimeSlots(arg0), toPlainDateTimeSlots(arg1));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toPlainDateTimeSlots(arg, options) {
    options = copyOptions(options);
    if (isObjectLike(arg)) {
        const slots = (getSlots(arg) || {});
        switch (slots.branding) {
            case PlainDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return slots;
            case PlainDateBranding:
                refineOverflowOptions(options); // parse unused options
                return createPlainDateTimeSlots({
                    ...slots,
                    ...isoTimeFieldDefaults,
                });
            case ZonedDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return zonedDateTimeToPlainDateTime(createTimeZoneOffsetOps, slots);
        }
        return refinePlainDateTimeBag(createDateRefineOps(getCalendarSlotFromBag(arg)), arg, options);
    }
    const res = parsePlainDateTime(arg);
    refineOverflowOptions(options); // parse unused options
    return res;
}

// TODO: give `this` a type
const [PlainDate, createPlainDate, getPlainDateSlots] = createSlotClass(PlainDateBranding, bindArgs(constructPlainDateSlots, refineCalendarSlot), {
    ...calendarIdGetters,
    ...dateGetters,
}, {
    with(slots, mod, options) {
        return createPlainDate(plainDateWithFields(createDateModOps, slots, this, rejectInvalidBag(mod), options));
    },
    withCalendar(slots, calendarArg) {
        return createPlainDate(slotsWithCalendar(slots, refineCalendarSlot(calendarArg)));
    },
    add(slots, durationArg, options) {
        return createPlainDate(movePlainDate(createMoveOps, false, slots, toDurationSlots(durationArg), options));
    },
    subtract(slots, durationArg, options) {
        return createPlainDate(movePlainDate(createMoveOps, true, slots, toDurationSlots(durationArg), options));
    },
    until(slots, otherArg, options) {
        return createDuration(diffPlainDates(createDiffOps, false, slots, toPlainDateSlots(otherArg), options));
    },
    since(slots, otherArg, options) {
        return createDuration(diffPlainDates(createDiffOps, true, slots, toPlainDateSlots(otherArg), options));
    },
    equals(slots, otherArg) {
        return plainDatesEqual(slots, toPlainDateSlots(otherArg));
    },
    toString: formatPlainDateIso,
    toJSON(slots) {
        return formatPlainDateIso(slots);
    },
    toLocaleString(slots, locales, options) {
        const [format, epochMilli] = prepPlainDateFormat(locales, options, slots);
        return format.format(epochMilli);
    },
    toZonedDateTime(slots, options) {
        const optionsObj = !isObjectLike(options) || options instanceof TimeZone
            ? { timeZone: options }
            : options;
        return createZonedDateTime(plainDateToZonedDateTime(refineTimeZoneSlot, toPlainTimeSlots, createTimeZoneOps, slots, optionsObj));
    },
    toPlainDateTime(slots, plainTimeArg) {
        return createPlainDateTime(plainDateToPlainDateTime(slots, optionalToPlainTimeFields(plainTimeArg)));
    },
    toPlainYearMonth(slots) {
        return createPlainYearMonth(plainDateToPlainYearMonth(createYearMonthRefineOps, slots, this));
    },
    toPlainMonthDay(slots) {
        return createPlainMonthDay(plainDateToPlainMonthDay(createMonthDayRefineOps, slots, this));
    },
    getISOFields: removeBranding,
    getCalendar: createCalendarFromSlots,
    valueOf: neverValueOf,
}, {
    from(arg, options) {
        return createPlainDate(toPlainDateSlots(arg, options));
    },
    compare(arg0, arg1) {
        return compareIsoDateFields(toPlainDateSlots(arg0), toPlainDateSlots(arg1));
    },
});
// Utils
// -----------------------------------------------------------------------------
function toPlainDateSlots(arg, options) {
    options = copyOptions(options);
    if (isObjectLike(arg)) {
        const slots = (getSlots(arg) || {});
        switch (slots.branding) {
            case PlainDateBranding:
                refineOverflowOptions(options); // parse unused options
                return slots;
            case PlainDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return createPlainDateSlots(slots);
            case ZonedDateTimeBranding:
                refineOverflowOptions(options); // parse unused options
                return zonedDateTimeToPlainDate(createTimeZoneOffsetOps, slots);
        }
        return refinePlainDateBag(createDateRefineOps(getCalendarSlotFromBag(arg)), arg, options);
    }
    const res = parsePlainDate(arg);
    refineOverflowOptions(options); // parse unused options
    return res;
}

// Compound Adapter Functions
// -----------------------------------------------------------------------------
function fieldsAdapter(calendarProtocol, fieldsMethod, fieldNames) {
    return [...fieldsMethod.call(calendarProtocol, fieldNames)];
}
function mergeFieldsAdapter(calendarProtocol, mergeFields, fields, additionalFields) {
    return requireObjectLike(mergeFields.call(calendarProtocol, Object.assign(Object.create(null), fields), Object.assign(Object.create(null), additionalFields)));
}
function dateFromFieldsAdapter(calendarProtocol, dateFromFields, fields, options) {
    return getPlainDateSlots(dateFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
}
function yearMonthFromFieldsAdapter(calendarProtocol, yearMonthFromFields, fields, options) {
    return getPlainYearMonthSlots(yearMonthFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
}
function monthDayFromFieldsAdapter(calendarProtocol, monthDayFromFields, fields, options) {
    return getPlainMonthDaySlots(monthDayFromFields.call(calendarProtocol, Object.assign(Object.create(null), fields), options));
}
function dateAddAdapter(calendarProtocol, dateAdd, isoFields, durationFields, options) {
    return getPlainDateSlots(dateAdd.call(calendarProtocol, createPlainDate(createPlainDateSlots(isoFields, calendarProtocol)), createDuration(createDurationSlots(durationFields)), options));
}
function dateUntilAdapter(calendarProtocol, dateUntil, isoFields0, isoFields1, largestUnit, origOptions) {
    return getDurationSlots(dateUntil.call(calendarProtocol, createPlainDate(createPlainDateSlots(isoFields0, calendarProtocol)), createPlainDate(createPlainDateSlots(isoFields1, calendarProtocol)), Object.assign(Object.create(null), origOptions, {
        largestUnit: unitNamesAsc[largestUnit],
    })));
}
function dayAdapter(calendarProtocol, dayMethod, isoFields) {
    return requirePositiveInteger(dayMethod.call(calendarProtocol, createPlainDate(createPlainDateSlots(isoFields, calendarProtocol))));
}
// Compound Adapter Sets
// -----------------------------------------------------------------------------
const refineAdapters = { fields: fieldsAdapter };
const dateRefineAdapters = {
    dateFromFields: dateFromFieldsAdapter,
    ...refineAdapters,
};
const yearMonthRefineAdapters = {
    yearMonthFromFields: yearMonthFromFieldsAdapter,
    ...refineAdapters,
};
const monthDayRefineAdapters = {
    monthDayFromFields: monthDayFromFieldsAdapter,
    ...refineAdapters,
};
const modAdapters = { mergeFields: mergeFieldsAdapter };
const dateModAdapters = { ...dateRefineAdapters, ...modAdapters };
const yearMonthModAdapters = {
    ...yearMonthRefineAdapters,
    ...modAdapters,
};
const monthDayModAdapters = { ...monthDayRefineAdapters, ...modAdapters };
const moveAdapters = { dateAdd: dateAddAdapter };
const diffAdapters = { ...moveAdapters, dateUntil: dateUntilAdapter };
const yearMonthMoveAdapters = { ...moveAdapters, day: dayAdapter };
const yearMonthDiffAdapters = { ...diffAdapters, day: dayAdapter };
function createAdapterCompoundOps(calendarProtocol, adapterFuncs) {
    const keys = Object.keys(adapterFuncs).sort();
    const boundFuncs = {};
    for (const key of keys) {
        boundFuncs[key] = bindArgs(adapterFuncs[key], calendarProtocol, calendarProtocol[key]);
    }
    return boundFuncs;
}

// Refine
const createYearMonthRefineOps = createCompoundOpsCreator(yearMonthRefineAdapters);
const createDateRefineOps = createCompoundOpsCreator(dateRefineAdapters);
const createMonthDayRefineOps = createCompoundOpsCreator(monthDayRefineAdapters);
// Mod
const createYearMonthModOps = createCompoundOpsCreator(yearMonthModAdapters);
const createDateModOps = createCompoundOpsCreator(dateModAdapters);
const createMonthDayModOps = createCompoundOpsCreator(monthDayModAdapters);
// Math
const createMoveOps = createCompoundOpsCreator(moveAdapters);
const createDiffOps = createCompoundOpsCreator(diffAdapters);
const createYearMonthMoveOps = createCompoundOpsCreator(yearMonthMoveAdapters);
const createYearMonthDiffOps = createCompoundOpsCreator(yearMonthDiffAdapters);
// -----------------------------------------------------------------------------
function createCompoundOpsCreator(adapterFuncs) {
    return (calendarSlot) => {
        if (typeof calendarSlot === 'string') {
            return createNativeStandardOps(calendarSlot); // has everything
        }
        return createAdapterCompoundOps(calendarSlot, adapterFuncs);
    };
}

const [Duration, createDuration, getDurationSlots] = createSlotClass(DurationBranding, constructDurationSlots, {
    ...durationGetters,
    blank(slots) {
        return queryDurationBlank(slots);
    },
    sign(slots) {
        return queryDurationSign(slots);
    },
}, {
    with(slots, mod) {
        return createDuration(durationWithFields(slots, mod));
    },
    add(slots, otherArg, options) {
        return createDuration(addDurations(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, false, slots, toDurationSlots(otherArg), options));
    },
    subtract(slots, otherArg, options) {
        return createDuration(addDurations(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, true, slots, toDurationSlots(otherArg), options));
    },
    negated(slots) {
        return createDuration(negateDuration(slots));
    },
    abs(slots) {
        return createDuration(absDuration(slots));
    },
    round(slots, options) {
        return createDuration(roundDuration(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, slots, options));
    },
    total(slots, options) {
        return totalDuration(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, slots, options);
    },
    toString: formatDurationIso,
    toLocaleString(slots, locales, options) {
        return Intl.DurationFormat
            ? new Intl.DurationFormat(locales, options).format(this)
            : formatDurationIso(slots);
    },
    toJSON(slots) {
        return formatDurationIso(slots);
    },
    valueOf: neverValueOf,
}, {
    from(arg) {
        return createDuration(toDurationSlots(arg));
    },
    compare(durationArg0, durationArg1, options) {
        return compareDurations(refinePublicRelativeTo, createDiffOps, createTimeZoneOps, toDurationSlots(durationArg0), toDurationSlots(durationArg1), options);
    },
});
// Utils
// -----------------------------------------------------------------------------
function toDurationSlots(arg) {
    if (isObjectLike(arg)) {
        const slots = getSlots(arg);
        if (slots && slots.branding === DurationBranding) {
            return slots;
        }
        return refineDurationBag(arg);
    }
    return parseDuration(arg);
}
function refinePublicRelativeTo(relativeTo) {
    if (relativeTo !== undefined) {
        if (isObjectLike(relativeTo)) {
            const slots = (getSlots(relativeTo) || {});
            switch (slots.branding) {
                case ZonedDateTimeBranding:
                case PlainDateBranding:
                    return slots;
                case PlainDateTimeBranding:
                    return createPlainDateSlots(slots);
            }
            const calendar = getCalendarSlotFromBag(relativeTo); // !!!
            const res = refineMaybeZonedDateTimeBag(refineTimeZoneSlot, createTimeZoneOps, createDateRefineOps(calendar), relativeTo);
            return { ...res, calendar };
        }
        return parseZonedOrPlainDateTime(relativeTo);
    }
}

// Order matters. See call to createProtocolChecker
const calendarMethods = {
    toString(slots) {
        return slots.id;
    },
    toJSON(slots) {
        return slots.id;
    },
    ...calendarFieldMethods,
    dateAdd({ id, native }, plainDateArg, durationArg, options) {
        return createPlainDate(createPlainDateSlots(native.dateAdd(toPlainDateSlots(plainDateArg), toDurationSlots(durationArg), options), id));
    },
    dateUntil({ native }, plainDateArg0, plainDateArg1, options) {
        return createDuration(createDurationSlots(native.dateUntil(toPlainDateSlots(plainDateArg0), toPlainDateSlots(plainDateArg1), refineCalendarDiffOptions(options))));
    },
    dateFromFields({ id, native }, fields, options) {
        return createPlainDate(refinePlainDateBag(native, fields, options, getRequiredDateFields(id)));
    },
    yearMonthFromFields({ id, native }, fields, options) {
        return createPlainYearMonth(refinePlainYearMonthBag(native, fields, options, getRequiredYearMonthFields(id)));
    },
    monthDayFromFields({ id, native }, fields, options) {
        return createPlainMonthDay(refinePlainMonthDayBag(native, false, fields, options, getRequiredMonthDayFields(id)));
    },
    fields({ native }, fieldNames) {
        /*
        Bespoke logic for converting Iterable to string[], while doing some validation
        */
        const allowed = new Set(dateFieldNamesAlpha);
        const fieldNamesArray = [];
        for (const fieldName of fieldNames) {
            requireString(fieldName);
            if (!allowed.has(fieldName)) {
                throw new RangeError(forbiddenField(fieldName));
            }
            allowed.delete(fieldName); // prevents duplicates! can this be done somewhere else?
            fieldNamesArray.push(fieldName);
        }
        return native.fields(fieldNamesArray);
    },
    mergeFields({ native }, fields0, fields1) {
        return native.mergeFields(excludeUndefinedProps(requireNonNullish(fields0)), excludeUndefinedProps(requireNonNullish(fields1)));
    },
};
const [Calendar] = createSlotClass('Calendar', (id) => {
    const slotId = resolveCalendarId(requireString(id));
    const calendarNative = createNativeStandardOps(slotId);
    return {
        branding: 'Calendar',
        id: slotId,
        native: calendarNative,
    };
}, {
    id(slots) {
        return slots.id;
    },
}, calendarMethods, {
    from(arg) {
        const calendarSlot = refineCalendarSlot(arg); // either string or CalendarProtocol
        return typeof calendarSlot === 'string'
            ? new Calendar(calendarSlot)
            : calendarSlot;
    },
});
function getCalendarSlotFromBag(bag) {
    return extractCalendarSlotFromBag(bag) || isoCalendarId;
}
function extractCalendarSlotFromBag(bag) {
    const { calendar } = bag;
    if (calendar !== undefined) {
        return refineCalendarSlot(calendar);
    }
}
function refineCalendarSlot(arg) {
    if (isObjectLike(arg)) {
        return ((getSlots(arg) || {}).calendar ||
            validateCalendarProtocol(arg));
    }
    return refineCalendarSlotString(arg);
}
function refineCalendarSlotString(arg) {
    return resolveCalendarId(parseCalendarId(requireString(arg)));
}
const validateCalendarProtocol = createProtocolValidator(
// remove toString/toJSON/era/eraYear
Object.keys(calendarMethods).slice(4));

const Now = Object.defineProperties({}, {
    ...createStringTagDescriptors('Temporal.Now'),
    ...createPropDescriptors({
        timeZoneId() {
            return getCurrentTimeZoneId(); // we call separately to return function.name
        },
        instant() {
            return createInstant(createInstantSlots(getCurrentEpochNanoseconds()));
        },
        zonedDateTime(calendar, timeZone = getCurrentTimeZoneId()) {
            return createZonedDateTime(createZonedDateTimeSlots(getCurrentEpochNanoseconds(), refineTimeZoneSlot(timeZone), refineCalendarSlot(calendar)));
        },
        zonedDateTimeISO(timeZone = getCurrentTimeZoneId()) {
            return createZonedDateTime(createZonedDateTimeSlots(getCurrentEpochNanoseconds(), refineTimeZoneSlot(timeZone), isoCalendarId));
        },
        plainDateTime(calendar, timeZone = getCurrentTimeZoneId()) {
            return createPlainDateTime(createPlainDateTimeSlots(getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), refineCalendarSlot(calendar)));
        },
        plainDateTimeISO(timeZone = getCurrentTimeZoneId()) {
            return createPlainDateTime(createPlainDateTimeSlots(getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), isoCalendarId));
        },
        plainDate(calendar, timeZone = getCurrentTimeZoneId()) {
            return createPlainDate(createPlainDateSlots(getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), refineCalendarSlot(calendar)));
        },
        plainDateISO(timeZone = getCurrentTimeZoneId()) {
            return createPlainDate(createPlainDateSlots(getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone))), isoCalendarId));
        },
        plainTimeISO(timeZone = getCurrentTimeZoneId()) {
            return createPlainTime(createPlainTimeSlots(getCurrentIsoDateTime(createTimeZoneOffsetOps(refineTimeZoneSlot(timeZone)))));
        },
    }),
});

const Temporal = Object.defineProperties({}, {
    ...createStringTagDescriptors('Temporal'),
    ...createPropDescriptors({
        PlainYearMonth,
        PlainMonthDay,
        PlainDate,
        PlainTime,
        PlainDateTime,
        ZonedDateTime,
        Instant,
        Calendar,
        TimeZone,
        Duration,
        Now,
    }),
}); // !!! (for tests)

export { DateTimeFormat, Temporal, toTemporalInstant };
