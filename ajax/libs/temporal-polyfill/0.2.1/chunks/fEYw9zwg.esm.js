function clampEntity(e, n, t, o, r) {
  const i = clampNumber(n, t, o);
  if (r && n !== i) {
    throw new RangeError(numberOutOfRange(e, n, t, o));
  }
  return i;
}

function clampProp(e, n, t, o, r) {
  return clampEntity(n, getDefinedProp(e, n), t, o, r);
}

function getDefinedProp(e, n) {
  const t = e[n];
  if (void 0 === t) {
    throw new TypeError(missingField(n));
  }
  return t;
}

function isObjectLike(e) {
  return null !== e && /object|function/.test(typeof e);
}

function createLazyGenerator(e, n = Map) {
  const t = new n;
  return (n, ...o) => {
    if (t.has(n)) {
      return t.get(n);
    }
    const r = e(n, ...o);
    return t.set(n, r), r;
  };
}

function createNameDescriptors(e) {
  return createPropDescriptors({
    name: e
  }, 1);
}

function createPropDescriptors(e, n) {
  return mapProps((e => ({
    value: e,
    configurable: 1,
    writable: !n
  })), e);
}

function createGetterDescriptors(e) {
  return mapProps((e => ({
    get: e,
    configurable: 1
  })), e);
}

function createStringTagDescriptors(e) {
  return {
    [Symbol.toStringTag]: {
      value: e,
      configurable: 1
    }
  };
}

function zipProps(e, n) {
  const t = {};
  let o = e.length;
  for (const r of n) {
    t[e[--o]] = r;
  }
  return t;
}

function mapProps(e, n, t) {
  const o = {};
  for (const r in n) {
    o[r] = e(n[r], r, t);
  }
  return o;
}

function mapPropNames(e, n, t) {
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    o[i] = e(i, r, t);
  }
  return o;
}

function remapProps(e, n, t) {
  const o = {};
  for (let r = 0; r < e.length; r++) {
    o[n[r]] = t[e[r]];
  }
  return o;
}

function pluckProps(e, n) {
  const t = {};
  for (const o of e) {
    t[o] = n[o];
  }
  return t;
}

function excludePropsByName(e, n) {
  const t = {};
  for (const o in n) {
    e.has(o) || (t[o] = n[o]);
  }
  return t;
}

function excludeUndefinedProps(e) {
  e = {
    ...e
  };
  const n = Object.keys(e);
  for (const t of n) {
    void 0 === e[t] && delete e[t];
  }
  return e;
}

function hasAllPropsByName(e, n) {
  for (const t of n) {
    if (!(t in e)) {
      return 0;
    }
  }
  return 1;
}

function allPropsEqual(e, n, t) {
  for (const o of e) {
    if (n[o] !== t[o]) {
      return 0;
    }
  }
  return 1;
}

function bindArgs(e, ...n) {
  return (...t) => e(...n, ...t);
}

function identity(e) {
  return e;
}

function capitalize(e) {
  return e[0].toUpperCase() + e.substring(1);
}

function sortStrings(e) {
  return e.slice().sort();
}

function padNumber(e, n) {
  return String(n).padStart(e, "0");
}

function compareNumbers(e, n) {
  return Math.sign(e - n);
}

function clampNumber(e, n, t) {
  return Math.min(Math.max(e, n), t);
}

function divModFloor(e, n) {
  return [ Math.floor(e / n), modFloor(e, n) ];
}

function modFloor(e, n) {
  return (e % n + n) % n;
}

function divModTrunc(e, n) {
  return [ divTrunc(e, n), modTrunc(e, n) ];
}

function divTrunc(e, n) {
  return Math.trunc(e / n) || 0;
}

function modTrunc(e, n) {
  return e % n || 0;
}

function hasHalf(e) {
  return .5 === Math.abs(e % 1);
}

function givenFieldsToDayTimeNano(e, n, t) {
  let o = 0, r = 0;
  for (let i = 0; i <= n; i++) {
    const n = e[t[i]], a = U[i], s = A / a, [c, u] = divModTrunc(n, s);
    o += u * a, r += c;
  }
  const [i, a] = divModTrunc(o, A);
  return [ r + i, a ];
}

function nanoToGivenFields(e, n, t) {
  const o = {};
  for (let r = n; r >= 0; r--) {
    const n = U[r];
    o[t[r]] = divTrunc(e, n), e = modTrunc(e, n);
  }
  return o;
}

function getRequiredYearMonthFields(e) {
  return e === ae ? J : [];
}

function getRequiredMonthDayFields(e) {
  return e === ae ? X : [];
}

function getRequiredDateFields(e) {
  return e === ae ? [ "year", "day" ] : [];
}

function createDayTimeNano(e, n) {
  let [t, o] = divModTrunc(n, A), r = e + t;
  const i = Math.sign(r);
  return i && i === -Math.sign(o) && (r -= i, o += i * A), [ r, o ];
}

function addDayTimeNanoAndNumber(e, n) {
  return createDayTimeNano(e[0], e[1] + n);
}

function addDayTimeNanos(e, n, t = 1) {
  return createDayTimeNano(e[0] + n[0] * t, e[1] + n[1] * t);
}

function diffDayTimeNanos(e, n) {
  return createDayTimeNano(n[0] - e[0], n[1] - e[1]);
}

function compareDayTimeNanos(e, n) {
  return compareNumbers(e[0], n[0]) || compareNumbers(e[1], n[1]);
}

function bigIntToDayTimeNano(e, n = 1) {
  const t = BigInt(A / n);
  return [ Number(e / t), Number(e % t) * n ];
}

function numberToDayTimeNano(e, n = 1) {
  const t = A / n, [o, r] = divModTrunc(e, t);
  return [ o, r * n ];
}

function dayTimeNanoToBigInt(e, n = 1) {
  const [t, o] = e, r = Math.floor(o / n), i = A / n;
  return BigInt(t) * BigInt(i) + BigInt(r);
}

function dayTimeNanoToNumber(e, n = 1, t) {
  const [o, r] = dayTimeNanoToNumberRemainder(e, n);
  return o + (t ? r / n : 0);
}

function dayTimeNanoToNumberRemainder(e, n) {
  const [t, o] = e, [r, i] = divModFloor(o, n);
  return [ t * (A / n) + r, i ];
}

function hashIntlFormatParts(e, n) {
  const t = e.formatToParts(n), o = {};
  for (const e of t) {
    o[e.type] = e.value;
  }
  return o;
}

function checkIsoYearMonthInBounds(e) {
  return clampProp(e, "isoYear", ke, Ye, 1), e.isoYear === ke ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Ye && clampProp(e, "isoMonth", 1, 9, 1), 
  e;
}

function checkIsoDateInBounds(e) {
  return checkIsoDateTimeInBounds({
    ...e,
    ...ve,
    isoHour: 12
  }), e;
}

function checkIsoDateTimeInBounds(e) {
  const n = clampProp(e, "isoYear", ke, Ye, 1), t = n === ke ? 1 : n === Ye ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    isoNanosecond: e.isoNanosecond - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || -1 === compareDayTimeNanos(e, Oe) || 1 === compareDayTimeNanos(e, we)) {
    throw new RangeError(y);
  }
  return e;
}

function isoTimeFieldsToNano(e) {
  return givenFieldsToDayTimeNano(e, 5, ge)[1];
}

function nanoToIsoTimeAndDay(e) {
  const [n, t] = divModFloor(e, A);
  return [ nanoToGivenFields(t, 5, ge), n ];
}

function epochNanoToSec(e) {
  return dayTimeNanoToNumber(e, z);
}

function epochNanoToMilli(e) {
  return dayTimeNanoToNumber(e, Z);
}

function isoToEpochMilli(e) {
  return isoArgsToEpochMilli(e.isoYear, e.isoMonth, e.isoDay, e.isoHour, e.isoMinute, e.isoSecond, e.isoMillisecond);
}

function isoToEpochNano(e) {
  const n = isoToEpochMilli(e);
  if (void 0 !== n) {
    const [t, o] = divModTrunc(n, C);
    return [ t, o * Z + (e.isoMicrosecond || 0) * R + (e.isoNanosecond || 0) ];
  }
}

function isoToEpochNanoWithOffset(e, n) {
  const [t, o] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) - n);
  return checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + o,
    ...t
  }));
}

function isoArgsToEpochSec(...e) {
  return isoArgsToEpochMilli(...e) / B;
}

function isoArgsToEpochMilli(...e) {
  const [n, t] = isoToLegacyDate(...e), o = n.getTime();
  if (!isNaN(o)) {
    return o - t * C;
  }
}

function isoToLegacyDate(e, n = 1, t = 1, o = 0, r = 0, i = 0, a = 0) {
  const s = e === ke ? 1 : e === Ye ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function epochNanoToIso(e, n) {
  let [t, o] = addDayTimeNanoAndNumber(e, n);
  o < 0 && (o += A, t -= 1);
  const [r, i] = divModFloor(o, Z), [a, s] = divModFloor(i, R);
  return {
    ...epochMilliToIso(t * C + r),
    isoMicrosecond: a,
    isoNanosecond: s
  };
}

function epochMilliToIso(e) {
  const n = e < -C * Se ? 1 : e > C * Se ? -1 : 0, t = new Date(e + n * C);
  return zipProps(Ne, [ t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate() - n, t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds() ]);
}

function computeIsoMonthsInYear() {
  return Re;
}

function computeIsoDaysInMonth(e, n) {
  switch (n) {
   case 2:
    return computeIsoInLeapYear(e) ? 29 : 28;

   case 4:
   case 6:
   case 9:
   case 11:
    return 30;
  }
  return 31;
}

function computeIsoDaysInYear(e) {
  return computeIsoInLeapYear(e) ? 366 : 365;
}

function computeIsoInLeapYear(e) {
  return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}

function computeIsoDayOfYear(e) {
  return diffEpochMilliByDay(isoToEpochMilli(isoDateYearStart(e)), isoToEpochMilli({
    ...e,
    ...ve
  })) + 1;
}

function computeIsoDayOfWeek(e) {
  const [n, t] = isoToLegacyDate(e.isoYear, e.isoMonth, e.isoDay);
  return modFloor(n.getUTCDay() - t, 7) || 7;
}

function computeIsoWeekParts(e) {
  const n = computeIsoDayOfYear(e), t = computeIsoDayOfWeek(e), o = computeIsoDayOfWeek(isoDateYearStart(e)), r = Math.floor((n - t + 10) / Ze), {isoYear: i} = e;
  return r < 1 ? [ i - 1, 5 === o || 6 === o && computeIsoInLeapYear(i - 1) ? 53 : 52 ] : 53 === r && computeIsoDaysInYear(i) - n < 4 - t ? [ i + 1, 1 ] : [ i, r ];
}

function isoDateYearStart(e) {
  return {
    ...e,
    isoMonth: 1,
    isoDay: 1,
    ...ve
  };
}

function computeGregoryEraParts({isoYear: e}) {
  return e < 1 ? [ "bce", 1 - e ] : [ "ce", e ];
}

function computeJapaneseEraParts(e) {
  const n = isoToEpochMilli(e);
  if (n < ze) {
    return computeGregoryEraParts(e);
  }
  const t = hashIntlFormatParts(Hn(ce), n), {era: o, eraYear: r} = parseIntlYear(t, ce);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(ye, e, constrainIsoDateFields(e));
}

function constrainIsoDateFields(e, n) {
  const {isoYear: t} = e, o = clampProp(e, "isoMonth", 1, computeIsoMonthsInYear(), n);
  return {
    isoYear: t,
    isoMonth: o,
    isoDay: clampProp(e, "isoDay", 1, computeIsoDaysInMonth(t, o), n)
  };
}

function constrainIsoTimeFields(e, n) {
  return zipProps(ge, [ clampProp(e, "isoHour", 0, 23, n), clampProp(e, "isoMinute", 0, 59, n), clampProp(e, "isoSecond", 0, 59, n), clampProp(e, "isoMillisecond", 0, 999, n), clampProp(e, "isoMicrosecond", 0, 999, n), clampProp(e, "isoNanosecond", 0, 999, n) ]);
}

function requireObjectLike(e) {
  if (!isObjectLike(e)) {
    throw new TypeError(n);
  }
  return e;
}

function requireType(e, n, t = e) {
  if (typeof n !== e) {
    throw new TypeError(invalidEntity(t, n));
  }
  return n;
}

function requireStringOrUndefined(e) {
  if (void 0 !== e && "string" != typeof e) {
    throw new TypeError("Expected string or undefined");
  }
  return e;
}

function requireIntegerOrUndefined(e) {
  if ("number" == typeof e) {
    requireNumberIsInteger(e);
  } else if (void 0 !== e) {
    throw new TypeError("Expected integer or undefined");
  }
  return e;
}

function requireInteger(e) {
  return requireNumberIsInteger(Ue(e));
}

function requirePositiveInteger(e) {
  return requireNumberIsPositive(requireInteger(e));
}

function requireNumberIsInteger(e, n = "number") {
  if (!Number.isInteger(e)) {
    throw new RangeError(expectedInteger(n, e));
  }
  return e || 0;
}

function requireNumberIsPositive(e, n = "number") {
  if (e <= 0) {
    throw new RangeError(expectedPositive(n, e));
  }
  return e;
}

function requireNonNullish(e) {
  if (null == e) {
    throw new TypeError("Cannot be null or undefined");
  }
  return e;
}

function requirePropDefined(e, n) {
  if (null == n) {
    throw new RangeError(missingField(e));
  }
  return n;
}

function toString(n) {
  if ("symbol" == typeof n) {
    throw new TypeError(e);
  }
  return String(n);
}

function toStringViaPrimitive(e, n) {
  return isObjectLike(e) ? String(e) : Le(e, n);
}

function toBigInt(e) {
  if ("string" == typeof e) {
    return BigInt(e);
  }
  if ("bigint" != typeof e) {
    throw new TypeError(invalidBigInt(e));
  }
  return e;
}

function toNumber(e, n = "number") {
  if ("bigint" == typeof e) {
    throw new TypeError(forbiddenBigIntToNumber(n));
  }
  if (e = Number(e), !Number.isFinite(e)) {
    throw new RangeError(expectedFinite(n, e));
  }
  return e;
}

function toInteger(e, n) {
  return Math.trunc(toNumber(e, n)) || 0;
}

function toStrictInteger(e, n) {
  return requireNumberIsInteger(toNumber(e, n), n);
}

function toPositiveInteger(e, n) {
  return requireNumberIsPositive(toInteger(e, n), n);
}

function refineOverflowOptions(e) {
  return void 0 === e ? 0 : an(requireObjectLike(e));
}

function refineZonedFieldOptions(e, n = 0) {
  e = normalizeOptions(e);
  const t = sn(e), o = cn(e, n);
  return [ an(e), o, t ];
}

function refineEpochDisambigOptions(e) {
  return sn(normalizeOptions(e));
}

function refineCalendarDiffOptions(e) {
  return e = normalizeOptions(e), on(e, 9, 6, 1);
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = on(n, o, r), s = parseRoundingIncInteger(n), c = dn(n, i);
  const u = tn(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeUnitNameOptions(e, We));
  const r = dn(e, 7);
  let i = tn(e, n);
  return i = requirePropDefined(We, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return un(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ dn(e, 4), ...refineSmallestUnitAndSubsecDigits(tn(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ U[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[$e];
  return void 0 === n ? 1 : toInteger(n, $e);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? A : U[n + 1];
  if (r) {
    const t = U[n];
    if (r % ((e = clampEntity($e, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity($e, e));
    }
  } else {
    e = clampEntity($e, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[Ge];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(Ge, n));
    }
    n = clampEntity(Ge, Math.floor(n), 0, 9, 1);
  }
  return n;
}

function normalizeOptions(e) {
  return void 0 === e ? {} : requireObjectLike(e);
}

function normalizeUnitNameOptions(e, n) {
  return "string" == typeof e ? {
    [n]: e
  } : requireObjectLike(e);
}

function copyOptions(e) {
  if (void 0 !== e) {
    if (isObjectLike(e)) {
      return Object.assign(Object.create(null), e);
    }
    throw new TypeError(n);
  }
}

function overrideOverflowOptions(e, n) {
  return e && Object.assign(Object.create(null), e, {
    overflow: _e[n]
  });
}

function refineUnitOption(e, n, t = 9, o = 0, r) {
  let i = n[e];
  if (void 0 === i) {
    return r ? o : void 0;
  }
  if (i = toString(i), "auto" === i) {
    return r ? o : null;
  }
  let a = Y[i];
  if (void 0 === a && (a = Te[i]), void 0 === a) {
    throw new RangeError(invalidEntity(e, i));
  }
  return clampEntity(e, a, o, t, 1), a;
}

function refineChoiceOption(e, n, t, o = 0) {
  const r = t[e];
  if (void 0 === r) {
    return o;
  }
  const i = toString(r), a = n[i];
  if (void 0 === a) {
    throw new RangeError(invalidEntity(e, i));
  }
  return a;
}

function checkLargestSmallestUnit(e, n) {
  if (n > e) {
    throw new RangeError(v);
  }
}

function createInstantSlots(e) {
  return {
    branding: gn,
    epochNanoseconds: e
  };
}

function createZonedDateTimeSlots(e, n, t) {
  return {
    branding: In,
    calendar: t,
    timeZone: n,
    epochNanoseconds: e
  };
}

function createPlainDateTimeSlots(e, n = e.calendar) {
  return {
    branding: Tn,
    calendar: n,
    ...pluckProps(Ee, e)
  };
}

function createPlainDateSlots(e, n = e.calendar) {
  return {
    branding: hn,
    calendar: n,
    ...pluckProps(Me, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: mn,
    calendar: n,
    ...pluckProps(Me, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: pn,
    calendar: n,
    ...pluckProps(Me, e)
  };
}

function createPlainTimeSlots(e) {
  return {
    branding: Dn,
    ...pluckProps(Pe, e)
  };
}

function createDurationSlots(e) {
  return {
    branding: yn,
    ...pluckProps(me, e)
  };
}

function getEpochSeconds(e) {
  return epochNanoToSec(e.epochNanoseconds);
}

function getEpochMilliseconds(e) {
  return epochNanoToMilli(e.epochNanoseconds);
}

function getEpochMicroseconds(e) {
  return dayTimeNanoToBigInt(e.epochNanoseconds, R);
}

function getEpochNanoseconds(e) {
  return dayTimeNanoToBigInt(e.epochNanoseconds);
}

function getId(e) {
  return "string" == typeof e ? e : Le(e.id);
}

function isIdLikeEqual(e, n) {
  return e === n || getId(e) === getId(n);
}

function totalDuration(e, n, t, o, r) {
  const i = getLargestDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeUnitNameOptions(e, xe))[He]);
    let o = rn(e);
    return o = requirePropDefined(xe, o), [ o, t ];
  })(r, e), c = Math.max(a, i);
  if (c < 6 || 6 === c && (!s || !s.epochNanoseconds)) {
    return ((e, n) => totalDayTimeNano(durationFieldsToDayTimeNano(e, 6), n))(o, a);
  }
  if (!s) {
    throw new RangeError(M);
  }
  const u = createMarkerSystem(n, t, s);
  return ((e, n, t, o, r, i) => {
    const a = Sn(e), [s, c] = clampRelativeDuration(clearDurationFields(e, t - 1), t, a, o, r, i), u = computeEpochNanoFrac(s, c, n);
    return e[de[t]] + u * a;
  })(...spanDuration(o, void 0, a, ...u), a, ...u);
}

function totalDayTimeNano(e, n) {
  return dayTimeNanoToNumber(e, U[n], 1);
}

function clampRelativeDuration(e, n, t, o, r, i) {
  const a = {
    ...De,
    [de[n]]: t
  }, s = i(o, e), c = i(s, a);
  return [ r(s), r(c) ];
}

function computeEpochNanoFrac(e, n, t) {
  const o = dayTimeNanoToNumber(diffDayTimeNanos(e, n));
  if (!o) {
    throw new RangeError(p);
  }
  return dayTimeNanoToNumber(diffDayTimeNanos(e, t)) / o;
}

function roundInstant(e, n) {
  const [t, o, r] = refineRoundOptions(n, 5, 1);
  return createInstantSlots(roundDayTimeNano(e.epochNanoseconds, t, o, r, 1));
}

function roundZonedDateTime(e, n, t) {
  let {epochNanoseconds: o, timeZone: r, calendar: i} = n;
  const [a, s, c] = refineRoundOptions(t);
  if (0 === a && 1 === s) {
    return n;
  }
  const u = e(r), l = u.getOffsetNanosecondsFor(o);
  let f = {
    ...epochNanoToIso(o, l),
    calendar: i
  };
  return f = {
    calendar: i,
    ...roundDateTime(f, a, s, c, u)
  }, o = getMatchingInstantFor(u, f, l, 2, 0, 1), createZonedDateTimeSlots(o, r, i);
}

function roundPlainDateTime(e, n) {
  return createPlainDateTimeSlots(roundDateTime(e, ...refineRoundOptions(n)), e.calendar);
}

function roundPlainTime(e, n) {
  return createPlainTimeSlots(((e, n, t, o) => roundTimeToNano(e, computeNanoInc(n, t), o)[0])(e, ...refineRoundOptions(n, 5)));
}

function roundDateTime(e, n, t, o, r) {
  return 6 === n ? ((e, n, t) => {
    if (n) {
      const o = computeNanosecondsInDay(n, e);
      return checkIsoDateTimeInBounds({
        ...moveByIsoDays(e, roundByInc(isoTimeFieldsToNano(e), o, t) / o),
        ...ve
      });
    }
    return roundDateTimeToNano(e, A, t);
  })(e, r, o) : roundDateTimeToNano(e, computeNanoInc(n, t), o);
}

function roundDateTimeToNano(e, n, t) {
  const [o, r] = roundTimeToNano(e, n, t);
  return checkIsoDateTimeInBounds({
    ...moveByIsoDays(e, r),
    ...o
  });
}

function roundTimeToNano(e, n, t) {
  return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(e), n, t));
}

function balanceDayTimeDuration(e, n, t, o, r) {
  return nanoToDurationDayTimeFields(roundDayTimeNano(durationFieldsToDayTimeNano(e, 6), t, o, r), n);
}

function balanceDayTimeDurationByInc(e, n, t, o) {
  return nanoToDurationDayTimeFields(roundDayTimeNanoByInc(durationFieldsToDayTimeNano(e, n), t, o), n);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c) {
  const u = s === identity ? o > 6 ? nudgeRelativeDuration : 6 === o ? nudgeDurationDayTime : nudgeRelativeDurationTime : o > 6 ? nudgeRelativeDuration : nudgeDurationDayTime;
  let [l, f, d] = u(e, n, t, o, r, i, a, s, c);
  return d && (l = ((e, n, t, o, r, i, a) => {
    const s = Sn(e);
    for (let c = o + 1; c <= t; c++) {
      if (7 === c && 7 !== t) {
        continue;
      }
      const o = clearDurationFields(e, c - 1);
      o[de[c]] += s;
      const u = dayTimeNanoToNumber(diffDayTimeNanos(i(a(r, o)), n));
      if (u && Math.sign(u) !== s) {
        break;
      }
      e = o;
    }
    return e;
  })(l, f, t, Math.max(6, o), a, s, c)), l;
}

function computeNanoInc(e, n) {
  return U[e] * n;
}

function roundByInc(e, n, t) {
  return ((e, n) => Nn[n](e))(e / n, t) * n;
}

function roundToMinute(e) {
  return roundByInc(e, q, 7);
}

function roundDayTimeNano(e, n, t, o, r) {
  return 6 === n ? [ roundByInc(totalDayTimeNano(e, 6), t, o), 0 ] : roundDayTimeNanoByInc(e, computeNanoInc(n, t), o, r);
}

function roundDayTimeNanoByInc(e, n, t, o) {
  let [r, i] = e;
  o && i < 0 && (i += A, r -= 1);
  const [a, s] = divModFloor(roundByInc(i, n, t), A);
  return createDayTimeNano(r + a, s);
}

function nudgeDurationDayTime(e, n, t, o, r, i) {
  const a = Sn(e), s = durationFieldsToDayTimeNano(e, 6), c = roundDayTimeNano(s, o, r, i), u = diffDayTimeNanos(s, c), l = Math.sign(c[0] - s[0]) === a, f = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...f
  }, addDayTimeNanos(n, u), l ];
}

function nudgeRelativeDurationTime(e, n, t, o, r, i, a, s, c) {
  const u = Sn(e);
  let [l, f] = givenFieldsToDayTimeNano(e, 5, de);
  const d = computeNanoInc(o, r);
  let m = roundByInc(f, d, i);
  const [p, h] = clampRelativeDuration({
    ...e,
    ...Ie
  }, 6, u, a, s, c), T = m - dayTimeNanoToNumber(diffDayTimeNanos(p, h));
  T && Math.sign(T) !== u ? n = addDayTimeNanoAndNumber(p, m) : (l += u, m = roundByInc(T, d, i), 
  n = addDayTimeNanoAndNumber(h, m));
  const D = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...D,
    days: e.days + l
  }, n, Boolean(l) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c) {
  const u = Sn(e), l = de[o], f = clearDurationFields(e, o - 1), d = divTrunc(e[l], r) * r;
  f[l] = d;
  const [m, p] = clampRelativeDuration(f, o, r * u, a, s, c), h = d + computeEpochNanoFrac(m, p, n) * u * r, T = roundByInc(h, r, i), D = Math.sign(T - h) === u;
  return f[l] = T, [ f, D ? p : m, D ];
}

function formatInstantIso(e, n, t, o) {
  const [r, i, a, s] = (e => {
    const n = refineTimeDisplayTuple(e = normalizeOptions(e));
    return [ e.timeZone, ...n ];
  })(o), c = void 0 !== r;
  return ((e, n, t, o, r, i) => {
    t = roundDayTimeNanoByInc(t, r, o, 1);
    const a = n.getOffsetNanosecondsFor(t);
    return formatIsoDateTimeFields(epochNanoToIso(t, a), i) + (e ? formatOffsetNano(roundToMinute(a)) : "Z");
  })(c, n(c ? e(r) : Mn), t.epochNanoseconds, i, a, s);
}

function formatZonedDateTimeIso(e, n, t) {
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundDayTimeNanoByInc(o, c, s, 1);
    const l = e(t).getOffsetNanosecondsFor(o);
    return formatIsoDateTimeFields(epochNanoToIso(o, l), u) + formatOffsetNano(roundToMinute(l), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + getId(e) + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, ...(e => {
    e = normalizeOptions(e);
    const n = un(e), t = refineSubsecDigits(e), o = fn(e), r = dn(e, 4), i = tn(e, 4);
    return [ n, ln(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t));
}

function formatPlainDateTimeIso(e, n) {
  return ((e, n, t, o, r, i) => formatIsoDateTimeFields(roundDateTimeToNano(n, r, o), i) + formatCalendar(e, t))(e.calendar, e, ...(e => (e = normalizeOptions(e), 
  [ un(e), ...refineTimeDisplayTuple(e) ]))(n));
}

function formatPlainDateIso(e, n) {
  return t = e.calendar, o = e, r = refineDateDisplayOptions(n), formatIsoDateFields(o) + formatCalendar(t, r);
  var t, o, r;
}

function formatPlainYearMonthIso(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoYearMonthFields, e, refineDateDisplayOptions(n));
}

function formatPlainMonthDayIso(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoMonthDayFields, e, refineDateDisplayOptions(n));
}

function formatPlainTimeIso(e, n) {
  return ((e, n, t, o) => formatIsoTimeFields(roundTimeToNano(e, t, n)[0], o))(e, ...refineTimeDisplayOptions(n));
}

function formatDurationIso(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n, 3);
  return o > 1 && (e = {
    ...e,
    ...balanceDayTimeDurationByInc(e, Math.min(getLargestDurationUnit(e), 6), o, t)
  }), ((e, n) => {
    const t = Sn(e), o = -1 === t ? negateDurationFields(e) : e, {hours: r, minutes: i} = o, [a, s] = dayTimeNanoToNumberRemainder(givenFieldsToDayTimeNano(o, 3, de), z), c = formatSubsecNano(s, n), u = n >= 0 || !t || c;
    return (t < 0 ? "-" : "") + "P" + formatDurationFragments({
      Y: formatNumberUnscientific(o.years),
      M: formatNumberUnscientific(o.months),
      W: formatNumberUnscientific(o.weeks),
      D: formatNumberUnscientific(o.days)
    }) + (r || i || a || u ? "T" + formatDurationFragments({
      H: formatNumberUnscientific(r),
      M: formatNumberUnscientific(i),
      S: formatNumberUnscientific(a, u) + c
    }) : "");
  })(e, r);
}

function formatDateLikeIso(e, n, t, o) {
  const r = getId(e), i = o > 1 || 0 === o && r !== ae;
  return 1 === o ? r === ae ? n(t) : formatIsoDateFields(t) : i ? formatIsoDateFields(t) + formatCalendarId(r, 2 === o) : n(t);
}

function formatDurationFragments(e) {
  const n = [];
  for (const t in e) {
    const o = e[t];
    o && n.push(o, t);
  }
  return n.join("");
}

function formatIsoDateTimeFields(e, n) {
  return formatIsoDateFields(e) + "T" + formatIsoTimeFields(e, n);
}

function formatIsoDateFields(e) {
  return formatIsoYearMonthFields(e) + "-" + O(e.isoDay);
}

function formatIsoYearMonthFields(e) {
  const {isoYear: n} = e;
  return (n < 0 || n > 9999 ? getSignStr(n) + padNumber(6, Math.abs(n)) : padNumber(4, n)) + "-" + O(e.isoMonth);
}

function formatIsoMonthDayFields(e) {
  return O(e.isoMonth) + "-" + O(e.isoDay);
}

function formatIsoTimeFields(e, n) {
  const t = [ O(e.isoHour), O(e.isoMinute) ];
  return -1 !== n && t.push(O(e.isoSecond) + ((e, n, t, o) => formatSubsecNano(e * Z + n * R + t, o))(e.isoMillisecond, e.isoMicrosecond, e.isoNanosecond, n)), 
  t.join(":");
}

function formatOffsetNano(e, n = 0) {
  if (1 === n) {
    return "";
  }
  const [t, o] = divModFloor(Math.abs(e), L), [r, i] = divModFloor(o, q), [a, s] = divModFloor(i, z);
  return getSignStr(e) + O(t) + ":" + O(r) + (a || s ? ":" + O(a) + formatSubsecNano(s) : "");
}

function formatCalendar(e, n) {
  if (1 !== n) {
    const t = getId(e);
    if (n > 1 || 0 === n && t !== ae) {
      return formatCalendarId(t, 2 === n);
    }
  }
  return "";
}

function formatCalendarId(e, n) {
  return "[" + (n ? "!" : "") + "u-ca=" + e + "]";
}

function formatSubsecNano(e, n) {
  let t = padNumber(9, e);
  return t = void 0 === n ? t.replace(Fn, "") : t.slice(0, n), t ? "." + t : "";
}

function getSignStr(e) {
  return e < 0 ? "-" : "+";
}

function formatNumberUnscientific(e, n) {
  return e || n ? e.toLocaleString("fullwide", {
    useGrouping: 0
  }) : "";
}

function zonedEpochNanoToIso(e, n) {
  return epochNanoToIso(n, e.getOffsetNanosecondsFor(n));
}

function _zonedEpochSlotsToIso(e, n) {
  const {epochNanoseconds: t} = e, o = (n.getOffsetNanosecondsFor ? n : n(e.timeZone)).getOffsetNanosecondsFor(t), r = epochNanoToIso(t, o);
  return {
    calendar: e.calendar,
    ...r,
    offsetNanoseconds: o
  };
}

function buildZonedIsoFields(e, n) {
  const t = bn(n, e);
  return {
    calendar: n.calendar,
    ...pluckProps(Ee, t),
    offset: formatOffsetNano(t.offsetNanoseconds),
    timeZone: n.timeZone
  };
}

function getMatchingInstantFor(e, n, t, o = 0, r = 0, i, a) {
  if (void 0 !== t && 1 === o && (1 === o || a)) {
    return isoToEpochNanoWithOffset(n, t);
  }
  const s = e.getPossibleInstantsFor(n);
  if (void 0 !== t && 3 !== o) {
    const e = ((e, n, t, o) => {
      const r = isoToEpochNano(n);
      o && (t = roundToMinute(t));
      for (const n of e) {
        let e = dayTimeNanoToNumber(diffDayTimeNanos(n, r));
        if (o && (e = roundToMinute(e)), e === t) {
          return n;
        }
      }
    })(s, n, t, i);
    if (void 0 !== e) {
      return e;
    }
    if (0 === o) {
      throw new RangeError(I);
    }
  }
  return a ? isoToEpochNano(n) : getSingleInstantFor(e, n, r, s);
}

function getSingleInstantFor(e, n, t = 0, o = e.getPossibleInstantsFor(n)) {
  if (1 === o.length) {
    return o[0];
  }
  if (1 === t) {
    throw new RangeError(g);
  }
  if (o.length) {
    return o[3 === t ? 1 : 0];
  }
  const r = isoToEpochNano(n), i = ((e, n) => {
    const t = e.getOffsetNanosecondsFor(addDayTimeNanoAndNumber(n, -A));
    return e.getOffsetNanosecondsFor(addDayTimeNanoAndNumber(n, A)) - t;
  })(e, r), a = i * (2 === t ? -1 : 1);
  return (o = e.getPossibleInstantsFor(epochNanoToIso(r, a)))[2 === t ? 0 : o.length - 1];
}

function computeStartOfDay(e, n) {
  let {epochNanoseconds: t, timeZone: o, calendar: r} = n;
  const i = e(o);
  return t = getMatchingInstantFor(i, {
    ...bn(n, i),
    ...ve
  }, void 0, 0, 0, 1), createZonedDateTimeSlots(t, o, r);
}

function computeHoursInDay(e, n) {
  const t = e(n.timeZone);
  return computeNanosecondsInDay(t, bn(n, t)) / L;
}

function computeNanosecondsInDay(e, n) {
  n = {
    ...n,
    ...ve
  };
  const t = dayTimeNanoToNumber(diffDayTimeNanos(getSingleInstantFor(e, {
    ...n,
    ...ve
  }), getSingleInstantFor(e, {
    ...moveByIsoDays(n, 1),
    ...ve
  })));
  if (t <= 0) {
    throw new RangeError(p);
  }
  return t;
}

function validateTimeZoneOffset(e) {
  if (Math.abs(e) >= A) {
    throw new RangeError(D);
  }
  return e;
}

function moveInstant(e, n, t) {
  return createInstantSlots(checkEpochNanoInBounds(addDayTimeNanos(n.epochNanoseconds, (e => {
    if (durationHasDateParts(e)) {
      throw new RangeError(P);
    }
    return durationFieldsToDayTimeNano(e, 5);
  })(e ? negateDurationFields(t) : t))));
}

function moveZonedDateTime(e, n, t, o, r, i = Object.create(null)) {
  const a = n(o.timeZone), s = moveZonedEpochNano(e(o.calendar), a, o.epochNanoseconds, t ? negateDurationFields(r) : r, i);
  return {
    ...o,
    epochNanoseconds: s
  };
}

function movePlainDateTime(e, n, t, o, r = Object.create(null)) {
  return createPlainDateTimeSlots({
    ...t,
    ...moveDateTime(e(t.calendar), t, n ? negateDurationFields(o) : o, r)
  });
}

function movePlainDate(e, n, t, o, r) {
  return {
    ...t,
    ...moveDateEfficient(e(t.calendar), t, n ? negateDurationFields(o) : o, r)
  };
}

function movePlainYearMonth(e, n, t, o, r = Object.create(null)) {
  const i = t.calendar, a = e(i);
  let s = moveToMonthStart(a, t);
  n && (o = negateDuration(o)), Sn(o) < 0 && (s = a.dateAdd(s, {
    ...De,
    months: 1
  }), s = moveByIsoDays(s, -1));
  const c = a.dateAdd(s, o, r);
  return createPlainYearMonthSlots(moveToMonthStart(a, c), i);
}

function movePlainTime(e, n, t) {
  return createPlainTimeSlots(moveTime(n, e ? negateDurationFields(t) : t)[0]);
}

function moveZonedEpochNano(e, n, t, o, r) {
  const i = durationFieldsToDayTimeNano(o, 5);
  if (durationHasDateParts(o)) {
    const a = zonedEpochNanoToIso(n, t);
    t = addDayTimeNanos(getSingleInstantFor(n, {
      ...moveDateEfficient(e, a, {
        ...o,
        ...Ie
      }, r),
      ...pluckProps(ge, a),
      calendar: ae
    }), i);
  } else {
    t = addDayTimeNanos(t, i), refineOverflowOptions(r);
  }
  return checkEpochNanoInBounds(t);
}

function moveDateTime(e, n, t, o) {
  const [r, i] = moveTime(n, t);
  return checkIsoDateTimeInBounds({
    ...moveDateEfficient(e, n, {
      ...t,
      ...Ie,
      days: t.days + i
    }, o),
    ...r
  });
}

function moveDateEfficient(e, n, t, o) {
  if (t.years || t.months || t.weeks) {
    return e.dateAdd(n, t, o);
  }
  refineOverflowOptions(o);
  const r = t.days + givenFieldsToDayTimeNano(t, 5, de)[0];
  return r ? checkIsoDateInBounds(moveByIsoDays(n, r)) : n;
}

function moveToMonthStart(e, n) {
  return moveByIsoDays(n, 1 - e.day(n));
}

function moveTime(e, n) {
  const [t, o] = givenFieldsToDayTimeNano(n, 5, de), [r, i] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) + o);
  return [ r, t + i ];
}

function moveByIsoDays(e, n) {
  return n && (e = epochMilliToIso(isoToEpochMilli(e) + n * C)), e;
}

function createMarkerSystem(e, n, t) {
  const {calendar: o, timeZone: r, epochNanoseconds: i} = t, a = e(o);
  if (i) {
    const e = n(r);
    return [ i, identity, bindArgs(moveZonedEpochNano, a, e), bindArgs(diffZonedEpochNanoExact, a, e) ];
  }
  return [ {
    ...t,
    ...ve
  }, isoToEpochNano, bindArgs(moveDateTime, a), bindArgs(diffDateTimesExact, a) ];
}

function spanDuration(e, n, t, o, r, i, a) {
  let s = i(o, e);
  return n && (s = i(s, n)), [ a(o, s, t), r(s) ];
}

function addDurations(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getLargestDurationUnit(r), getLargestDurationUnit(i));
  if (c < 6 || 6 === c && (!s || !s.epochNanoseconds)) {
    return createDurationSlots(((e, n, t, o) => {
      const r = addDayTimeNanos(durationFieldsToDayTimeNano(e, 6), durationFieldsToDayTimeNano(n, 6), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(y);
      }
      return {
        ...De,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o));
  }
  if (!s) {
    throw new RangeError(M);
  }
  return o && (i = negateDurationFields(i)), createDurationSlots(spanDuration(r, i, c, ...createMarkerSystem(n, t, s))[0]);
}

function roundDuration(e, n, t, o, r) {
  const i = getLargestDurationUnit(o), [a, s, c, u, l] = ((e, n, t) => {
    e = normalizeUnitNameOptions(e, We);
    let o = on(e);
    const r = t(e[He]);
    let i = parseRoundingIncInteger(e);
    const a = dn(e, 7);
    let s = tn(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(E);
    }
    return null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), [ o, s, i, a, r ];
  })(r, i, e), f = Math.max(i, a);
  if (f < 6 || 6 === f && (!l || !l.epochNanoseconds)) {
    return createDurationSlots(((e, n, t, o, r) => ({
      ...De,
      ...balanceDayTimeDuration(e, n, t, o, r)
    }))(o, a, s, c, u));
  }
  if (!l) {
    throw new RangeError(M);
  }
  const d = createMarkerSystem(n, t, l);
  let m = 0;
  o.weeks && 7 === s && (m = o.weeks, o = {
    ...o,
    weeks: 0
  });
  let [h, T] = spanDuration(o, void 0, a, ...d);
  const D = Sn(o), I = Sn(h);
  if (D && I && D !== I) {
    throw new RangeError(p);
  }
  return !I || 0 === s && 1 === c || (h = roundRelativeDuration(h, T, a, s, c, u, ...d)), 
  h.weeks += m, createDurationSlots(h);
}

function negateDuration(e) {
  return createDurationSlots(negateDurationFields(e));
}

function negateDurationFields(e) {
  const n = {};
  for (const t of de) {
    n[t] = -1 * e[t] || 0;
  }
  return n;
}

function absDuration(e) {
  return createDurationSlots(-1 === Sn(n = e) ? negateDurationFields(n) : n);
  var n;
}

function queryDurationBlank(e) {
  return !Sn(e);
}

function computeDurationSign(e, n = de) {
  let t = 0;
  for (const o of n) {
    const n = Math.sign(e[o]);
    if (n) {
      if (t && t !== n) {
        throw new RangeError(N);
      }
      t = n;
    }
  }
  return t;
}

function checkDurationFields(e) {
  return Sn(e), e;
}

function durationFieldsToDayTimeNano(e, n) {
  return givenFieldsToDayTimeNano(e, n, de);
}

function nanoToDurationDayTimeFields(e, n = 6) {
  const [t, o] = e, r = nanoToGivenFields(o, n, de);
  if (r[de[n]] += t * (A / U[n]), !Number.isFinite(r[de[n]])) {
    throw new RangeError(y);
  }
  return r;
}

function nanoToDurationTimeFields(e, n = 5) {
  return nanoToGivenFields(e, n, de);
}

function clearDurationFields(e, n) {
  const t = {
    ...e
  };
  for (let e = 0; e <= n; e++) {
    t[de[e]] = 0;
  }
  return t;
}

function durationHasDateParts(e) {
  return Boolean(computeDurationSign(e, he));
}

function getLargestDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[de[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / Pn) * Pn;
  return [ n, n + Pn ];
}

function parseInstant(e) {
  const n = parseDateTimeLike(e = toStringViaPrimitive(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  let t;
  if (n.o) {
    t = 0;
  } else {
    if (!n.offset) {
      throw new RangeError(failedParse(e));
    }
    t = parseOffsetNano(n.offset);
  }
  return n.timeZone && parseOffsetNanoMaybe(n.timeZone, 1), createInstantSlots(isoToEpochNanoWithOffset(checkIsoDateTimeFields(n), t));
}

function parseZonedOrPlainDateTime(e) {
  const n = parseDateTimeLike(Le(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  if (n.timeZone) {
    return finalizeZonedDateTime(n, n.offset ? parseOffsetNano(n.offset) : void 0);
  }
  if (n.o) {
    throw new RangeError(failedParse(e));
  }
  return finalizeDate(n);
}

function parseZonedDateTime(e, n) {
  const t = parseDateTimeLike(Le(e));
  if (!t || !t.timeZone) {
    throw new RangeError(failedParse(e));
  }
  const {offset: o} = t, r = o ? parseOffsetNano(o) : void 0, [, i, a] = refineZonedFieldOptions(n);
  return finalizeZonedDateTime(t, r, i, a);
}

function parseOffsetNano(e) {
  const n = parseOffsetNanoMaybe(e);
  if (void 0 === n) {
    throw new RangeError(failedParse(e));
  }
  return n;
}

function parsePlainDateTime(e) {
  const n = parseDateTimeLike(Le(e));
  if (!n || n.o) {
    throw new RangeError(failedParse(e));
  }
  return createPlainDateTimeSlots(finalizeDateTime(n));
}

function parsePlainDate(e) {
  const n = parseDateTimeLike(Le(e));
  if (!n || n.o) {
    throw new RangeError(failedParse(e));
  }
  return createPlainDateSlots(n.i ? finalizeDateTime(n) : finalizeDate(n));
}

function parsePlainYearMonth(e, n) {
  const t = parseYearMonthOnly(Le(n));
  if (t) {
    return requireIsoCalendar(t), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(t)));
  }
  const o = parsePlainDate(n), r = moveToMonthStart(e(o.calendar), o);
  return createPlainYearMonthSlots({
    ...o,
    ...r
  });
}

function requireIsoCalendar(e) {
  if (e.calendar !== ae) {
    throw new RangeError(invalidSubstring(e.calendar));
  }
}

function parsePlainMonthDay(e, n) {
  const t = parseMonthDayOnly(Le(n));
  if (t) {
    return requireIsoCalendar(t), createPlainMonthDaySlots(checkIsoDateFields(t));
  }
  const o = parsePlainDate(n), {calendar: r} = o, i = e(r), [a, s, c] = i.u(o), [u, l] = i.l(a, s), [f, d] = i.m(u, l, c);
  return createPlainMonthDaySlots(i.p(f, d, c), r);
}

function parsePlainTime(e) {
  let n, t = (e => {
    const n = Un.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(Le(e));
  if (!t) {
    if (t = parseDateTimeLike(e), !t) {
      throw new RangeError(failedParse(e));
    }
    if (!t.i) {
      throw new RangeError(failedParse(e));
    }
    if (t.o) {
      throw new RangeError(invalidSubstring("Z"));
    }
    requireIsoCalendar(t);
  }
  if ((n = parseYearMonthOnly(e)) && isIsoDateFieldsValid(n)) {
    throw new RangeError(failedParse(e));
  }
  if ((n = parseMonthDayOnly(e)) && isIsoDateFieldsValid(n)) {
    throw new RangeError(failedParse(e));
  }
  return createPlainTimeSlots(constrainIsoTimeFields(t, 1));
}

function parseDuration(e) {
  const n = (e => {
    const n = xn.exec(e);
    return n ? (e => {
      function parseUnit(e, t, i) {
        let a = 0, s = 0;
        if (i && ([a, r] = divModFloor(r, U[i])), void 0 !== e) {
          if (o) {
            throw new RangeError(invalidSubstring(e));
          }
          s = (e => {
            const n = parseInt(e);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(e));
            }
            return n;
          })(e), n = 1, t && (r = parseSubsecNano(t) * (U[i] / z), o = 1);
        }
        return a + s;
      }
      let n = 0, o = 0, r = 0, i = {
        ...zipProps(de, [ parseUnit(e[2]), parseUnit(e[3]), parseUnit(e[4]), parseUnit(e[5]), parseUnit(e[6], e[7], 5), parseUnit(e[8], e[9], 4), parseUnit(e[10], e[11], 3) ]),
        ...nanoToGivenFields(r, 2, de)
      };
      if (!n) {
        throw new RangeError(t);
      }
      return parseSign(e[1]) < 0 && (i = negateDurationFields(i)), i;
    })(n) : void 0;
  })(Le(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  return createDurationSlots(n);
}

function parseCalendarId(e) {
  const n = parseDateTimeLike(e) || parseYearMonthOnly(e) || parseMonthDayOnly(e);
  return n ? n.calendar : e;
}

function parseTimeZoneId(e) {
  const n = parseDateTimeLike(e);
  return n && (n.timeZone || n.o && Mn || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = resolveTimeZoneId(e.timeZone), i = wn(r);
  return createZonedDateTimeSlots(getMatchingInstantFor(i, checkIsoDateTimeFields(e), n, t, o, !i.h, e.o), r, resolveCalendarId(e.calendar));
}

function finalizeDateTime(e) {
  return resolveSlotsCalendar(checkIsoDateTimeInBounds(checkIsoDateTimeFields(e)));
}

function finalizeDate(e) {
  return resolveSlotsCalendar(checkIsoDateInBounds(checkIsoDateFields(e)));
}

function resolveSlotsCalendar(e) {
  return {
    ...e,
    calendar: resolveCalendarId(e.calendar)
  };
}

function parseDateTimeLike(e) {
  const n = An.exec(e);
  return n ? (e => {
    const n = e[10], t = "Z" === (n || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(e),
      isoMonth: parseInt(e[4]),
      isoDay: parseInt(e[5]),
      ...organizeTimeParts(e.slice(5)),
      ...organizeAnnotationParts(e[16]),
      i: Boolean(e[6]),
      o: t,
      offset: t ? void 0 : n
    };
  })(n) : void 0;
}

function parseYearMonthOnly(e) {
  const n = qn.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = Ln.exec(e);
  return n ? (e => ({
    isoYear: Be,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = jn.exec(e);
  return t ? ((e, n) => {
    const t = e[4] || e[5];
    if (n && t) {
      throw new RangeError(invalidSubstring(t));
    }
    return validateTimeZoneOffset((parseInt0(e[2]) * L + parseInt0(e[3]) * q + parseInt0(e[4]) * z + parseSubsecNano(e[5] || "")) * parseSign(e[1]));
  })(t, n) : void 0;
}

function organizeIsoYearParts(e) {
  const n = parseSign(e[1]), t = parseInt(e[2] || e[3]);
  if (n < 0 && !t) {
    throw new RangeError(invalidSubstring(-0));
  }
  return n * t;
}

function organizeTimeParts(e) {
  const n = parseInt0(e[3]);
  return {
    ...nanoToIsoTimeAndDay(parseSubsecNano(e[4] || ""))[0],
    isoHour: parseInt0(e[1]),
    isoMinute: parseInt0(e[2]),
    isoSecond: 60 === n ? 59 : n
  };
}

function organizeAnnotationParts(e) {
  let n, t;
  const o = [];
  if (e.replace(Wn, ((e, r, i) => {
    const a = Boolean(r), [s, c] = i.split("=").reverse();
    if (c) {
      if ("u-ca" === c) {
        o.push(s), n || (n = a);
      } else if (a) {
        throw new RangeError(invalidSubstring(e));
      }
    } else {
      if (t) {
        throw new RangeError(invalidSubstring(e));
      }
      t = s;
    }
    return "";
  })), o.length > 1 && n) {
    throw new RangeError(invalidSubstring(e));
  }
  return {
    timeZone: t,
    calendar: o[0] || ae
  };
}

function parseSubsecNano(e) {
  return parseInt(e.padEnd(9, "0"));
}

function createRegExp(e) {
  return new RegExp(`^${e}$`, "i");
}

function parseSign(e) {
  return e && "+" !== e ? -1 : 1;
}

function parseInt0(e) {
  return void 0 === e ? 0 : parseInt(e);
}

function resolveTimeZoneId(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? formatOffsetNano(n) : n ? (e => e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e)))).join("/"))(e) : Mn;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : Mn;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== Mn ? $n(e) : void 0;
}

function compareInstants(e, n) {
  return compareDayTimeNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function compareZonedDateTimes(e, n) {
  return compareDayTimeNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function compareDurations(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getLargestDurationUnit(o), getLargestDurationUnit(r));
  if (allPropsEqual(de, o, r)) {
    return 0;
  }
  if (s < 6 || 6 === s && (!a || !a.epochNanoseconds)) {
    return compareDayTimeNanos(givenFieldsToDayTimeNano(o, 6, de), givenFieldsToDayTimeNano(r, 6, de));
  }
  if (!a) {
    throw new RangeError(M);
  }
  const [c, u, l] = createMarkerSystem(n, t, a);
  return compareDayTimeNanos(u(l(c, o)), u(l(c, r)));
}

function compareIsoDateTimeFields(e, n) {
  return compareIsoDateFields(e, n) || compareIsoTimeFields(e, n);
}

function compareIsoDateFields(e, n) {
  return compareNumbers(isoToEpochMilli(e), isoToEpochMilli(n));
}

function compareIsoTimeFields(e, n) {
  return compareNumbers(isoTimeFieldsToNano(e), isoTimeFieldsToNano(n));
}

function instantsEqual(e, n) {
  return !compareInstants(e, n);
}

function zonedDateTimesEqual(e, n) {
  return !compareZonedDateTimes(e, n) && !!isTimeZoneSlotsEqual(e.timeZone, n.timeZone) && isIdLikeEqual(e.calendar, n.calendar);
}

function plainDateTimesEqual(e, n) {
  return !compareIsoDateTimeFields(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function plainDatesEqual(e, n) {
  return !compareIsoDateFields(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function plainYearMonthsEqual(e, n) {
  return !compareIsoDateFields(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function plainMonthDaysEqual(e, n) {
  return !compareIsoDateFields(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function plainTimesEqual(e, n) {
  return !compareIsoTimeFields(e, n);
}

function isTimeZoneSlotsEqual(e, n) {
  if (e === n) {
    return 1;
  }
  const t = getId(e), o = getId(n);
  if (t === o) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(t) === getTimeZoneAtomic(o);
  } catch (e) {}
}

function diffInstants(e, n, t, o) {
  const r = refineDiffOptions(e, copyOptions(o), 3, 5), i = diffEpochNano(n.epochNanoseconds, t.epochNanoseconds, ...r);
  return createDurationSlots(e ? negateDurationFields(i) : i);
}

function diffZonedDateTimes(e, n, t, o, r, i) {
  const a = getCommonCalendarSlot(o.calendar, r.calendar), s = copyOptions(i), [c, u, l, f] = refineDiffOptions(t, s, 5), d = o.epochNanoseconds, m = r.epochNanoseconds, p = compareDayTimeNanos(m, d);
  let h;
  if (p) {
    if (c < 6) {
      h = diffEpochNano(d, m, c, u, l, f);
    } else {
      const t = n(((e, n) => {
        if (!isTimeZoneSlotsEqual(e, n)) {
          throw new RangeError(T);
        }
        return e;
      })(o.timeZone, r.timeZone)), i = e(a);
      h = diffZonedEpochNanoViaCalendar(i, t, p, d, m, c, s), !p || 0 === u && 1 === l || (h = roundRelativeDuration(h, m, c, u, l, f, d, identity, bindArgs(moveZonedEpochNano, i, t)));
    }
  } else {
    h = De;
  }
  return createDurationSlots(t ? negateDurationFields(h) : h);
}

function diffPlainDateTimes(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = copyOptions(r), [s, c, u, l] = refineDiffOptions(n, a, 6), f = isoToEpochNano(t), d = isoToEpochNano(o), m = compareDayTimeNanos(d, f);
  let p;
  if (m) {
    if (s <= 6) {
      p = diffEpochNano(f, d, s, c, u, l);
    } else {
      const n = e(i);
      p = diffDateTimesViaCalendar(n, m, t, o, s, a), !m || 0 === c && 1 === u || (p = roundRelativeDuration(p, d, s, c, u, l, t, isoToEpochNano, bindArgs(moveDateTime, n)));
    }
  } else {
    p = De;
  }
  return createDurationSlots(n ? negateDurationFields(p) : p);
}

function diffPlainDates(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = copyOptions(r);
  return diffDateLike(n || 0, (() => e(i)), t, o, ...refineDiffOptions(n, a, 6, 9, 6), a);
}

function diffPlainYearMonth(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = copyOptions(r), s = refineDiffOptions(n, a, 9, 9, 8), c = e(i);
  return diffDateLike(n || 0, (() => c), moveToMonthStart(c, t), moveToMonthStart(c, o), ...s, a);
}

function diffDateLike(e, n, t, o, r, i, a, s, c) {
  const u = isoToEpochNano(t), l = isoToEpochNano(o);
  let f;
  if (compareDayTimeNanos(l, u)) {
    let e;
    6 === r ? f = diffByDay(t, o) : (e = n(), f = e.dateUntil(t, o, r, c)), 6 === i && 1 === a || (e || (e = n()), 
    f = roundRelativeDuration(f, l, r, i, a, s, t, isoToEpochNano, ((n, t) => e.dateAdd(n, t))));
  } else {
    f = De;
  }
  return createDurationSlots(e ? negateDurationFields(f) : f);
}

function diffPlainTimes(e, n, t, o) {
  const r = copyOptions(o), [i, a, s, c] = refineDiffOptions(e, r, 5, 5), u = isoTimeFieldsToNano(n), l = roundByInc(isoTimeFieldsToNano(t) - u, computeNanoInc(a, s), c), f = {
    ...De,
    ...nanoToDurationTimeFields(l, i)
  };
  return createDurationSlots(e ? negateDurationFields(f) : f);
}

function diffZonedEpochNanoExact(e, n, t, o, r, i) {
  const a = compareDayTimeNanos(o, t);
  return a ? r < 6 ? diffEpochNanoExact(t, o, r) : diffZonedEpochNanoViaCalendar(e, n, a, t, o, r, i) : De;
}

function diffDateTimesExact(e, n, t, o, r) {
  const i = isoToEpochNano(n), a = isoToEpochNano(t), s = compareDayTimeNanos(a, i);
  return s ? o <= 6 ? diffEpochNanoExact(i, a, o) : diffDateTimesViaCalendar(e, s, n, t, o, r) : De;
}

function diffZonedEpochNanoViaCalendar(e, n, t, o, r, i, a) {
  const s = zonedEpochNanoToIso(n, o), c = pluckProps(ge, s), u = zonedEpochNanoToIso(n, r), l = bindArgs(getSingleInstantFor, n);
  let f, d, m, h = 0;
  do {
    if (h > 2) {
      throw new RangeError(p);
    }
    f = {
      ...moveByIsoDays(u, h++ * -t),
      ...c
    }, d = l(f), m = compareDayTimeNanos(r, d);
  } while (m === -t);
  return {
    ...6 === i ? diffByDay(s, f) : e.dateUntil(s, f, i, a),
    ...nanoToDurationTimeFields(dayTimeNanoToNumber(diffDayTimeNanos(d, r)))
  };
}

function diffDateTimesViaCalendar(e, n, t, o, r, i) {
  const a = isoTimeFieldsToNano(t);
  let s = isoTimeFieldsToNano(o) - a, c = t;
  return Math.sign(s) === -n && (c = moveByIsoDays(t, n), s += A * n), {
    ...e.dateUntil({
      ...c,
      ...ve
    }, {
      ...o,
      ...ve
    }, r, i),
    ...nanoToDurationTimeFields(s)
  };
}

function diffEpochNano(e, n, t, o, r, i) {
  return {
    ...De,
    ...nanoToDurationDayTimeFields(roundDayTimeNano(diffDayTimeNanos(e, n), o, r, i), t)
  };
}

function diffEpochNanoExact(e, n, t) {
  return {
    ...De,
    ...nanoToDurationDayTimeFields(diffDayTimeNanos(e, n), t)
  };
}

function diffByDay(e, n) {
  return {
    ...De,
    days: diffDays(e, n)
  };
}

function diffDays(e, n) {
  return diffEpochMilliByDay(isoToEpochMilli(e), isoToEpochMilli(n));
}

function diffEpochMilliByDay(e, n) {
  return Math.round((n - e) / C);
}

function getCommonCalendarSlot(e, n) {
  if (!isIdLikeEqual(e, n)) {
    throw new RangeError(h);
  }
  return e;
}

function createIntlCalendar(e) {
  function epochMilliToIntlFields(e) {
    return ((e, n) => ({
      ...parseIntlYear(e, n),
      month: e.month,
      day: parseInt(e.day)
    }))(hashIntlFormatParts(n, e), t);
  }
  const n = Hn(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    I: createIntlFieldCache(epochMilliToIntlFields),
    N: createIntlYearMonthCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return createLazyGenerator((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearMonthCache(e) {
  const n = e(0).year - Ce;
  return createLazyGenerator((t => {
    let o, r = isoArgsToEpochMilli(t - n);
    const i = [], a = [];
    do {
      r += 400 * C;
    } while ((o = e(r)).year <= t);
    do {
      r += (1 - o.day) * C, o.year === t && (i.push(r), a.push(o.month)), r -= C;
    } while ((o = e(r)).year >= t);
    return {
      P: i.reverse(),
      v: S(a.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const a = ue[n];
    void 0 !== a && (i = (i = e.era).normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    t = le[i] || i, o = r, r = eraYearToYear(o, a[t] || 0));
  }
  var i;
  return {
    era: t,
    eraYear: o,
    year: r
  };
}

function parseIntlPartsYear(e) {
  return parseInt(e.relatedYear || e.year);
}

function computeIntlDateParts(e) {
  const {year: n, month: t, day: o} = this.I(e), {v: r} = this.N(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.N(e).P[n - 1] + (t - 1) * C;
}

function computeIntlLeapMonth(e) {
  const n = queryMonthStrs(this, e), t = queryMonthStrs(this, e - 1), o = n.length;
  if (o > t.length) {
    const e = getCalendarLeapMonthMeta(this);
    if (e < 0) {
      return -e;
    }
    for (let e = 0; e < o; e++) {
      if (n[e] !== t[e]) {
        return e + 1;
      }
    }
  }
}

function computeIntlDaysInYear(e) {
  return diffEpochMilliByDay(computeIntlEpochMilli.call(this, e), computeIntlEpochMilli.call(this, e + 1));
}

function computeIntlDaysInMonth(e, n) {
  const {P: t} = this.N(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.N(e + 1).P), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.N(e).P.length;
}

function queryMonthStrs(e, n) {
  return Object.keys(e.N(n).v);
}

function resolveCalendarId(e) {
  if ((e = (e => ("islamicc" === (e = e.toLowerCase()) && (e = "islamic-civil"), e))(e)) !== ae && e !== se && computeCalendarIdBase(e) !== computeCalendarIdBase(Hn(e).resolvedOptions().calendar)) {
    throw new RangeError(invalidCalendar(e));
  }
  return e;
}

function computeCalendarIdBase(e) {
  return e.split("-")[0];
}

function parseMonthCode(e) {
  const n = _n.exec(e);
  if (!n) {
    throw new RangeError(invalidMonthCode(e));
  }
  return [ parseInt(n[1]), Boolean(n[2]) ];
}

function monthCodeNumberToMonth(e, n, t) {
  return e + (n || t && e >= t ? 1 : 0);
}

function monthToMonthCodeNumber(e, n) {
  return e - (n && e >= n ? 1 : 0);
}

function eraYearToYear(e, n) {
  return (n + e) * (Math.sign(n) || 1) || 0;
}

function getCalendarEraOrigins(e) {
  return ue[getCalendarIdBase(e)];
}

function getCalendarLeapMonthMeta(e) {
  return fe[getCalendarIdBase(e)];
}

function getCalendarIdBase(e) {
  return computeCalendarIdBase(e.id || ae);
}

function refineMaybeZonedDateTimeBag(e, n, t, o) {
  const r = refineCalendarFields(t, o, te, [], H);
  if (void 0 !== r.timeZone) {
    const o = t.dateFromFields(r), i = refineTimeBag(r), a = e(r.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(n(a), {
        ...o,
        ...i
      }, void 0 !== r.offset ? parseOffsetNano(r.offset) : void 0),
      timeZone: a
    };
  }
  return {
    ...t.dateFromFields(r),
    ...ve
  };
}

function refineZonedDateTimeBag(e, n, t, o, r, i) {
  const a = refineCalendarFields(t, r, te, $, H), s = e(a.timeZone), [c, u, l] = refineZonedFieldOptions(i), f = t.dateFromFields(a, overrideOverflowOptions(i, c)), d = refineTimeBag(a, c);
  return createZonedDateTimeSlots(getMatchingInstantFor(n(s), {
    ...f,
    ...d
  }, void 0 !== a.offset ? parseOffsetNano(a.offset) : void 0, u, l), s, o);
}

function refinePlainDateTimeBag(e, n, t) {
  const o = refineCalendarFields(e, n, te, [], j), r = refineOverflowOptions(t);
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...e.dateFromFields(o, overrideOverflowOptions(t, r)),
    ...refineTimeBag(o, r)
  }));
}

function refinePlainDateBag(e, n, t, o = []) {
  const r = refineCalendarFields(e, n, te, o);
  return e.dateFromFields(r, t);
}

function refinePlainYearMonthBag(e, n, t, o) {
  const r = refineCalendarFields(e, n, ee, o);
  return e.yearMonthFromFields(r, t);
}

function refinePlainMonthDayBag(e, n, t, o, r = []) {
  const i = refineCalendarFields(e, t, te, r);
  return n && void 0 !== i.month && void 0 === i.monthCode && void 0 === i.year && (i.year = Be), 
  e.monthDayFromFields(i, o);
}

function refinePlainTimeBag(e, n) {
  const t = refineOverflowOptions(n);
  return createPlainTimeSlots(refineTimeBag(refineFields(e, W, [], 1), t));
}

function refineDurationBag(e) {
  const n = refineFields(e, me);
  return createDurationSlots(checkDurationFields({
    ...De,
    ...n
  }));
}

function refineCalendarFields(e, n, t, o = [], r = []) {
  return refineFields(n, [ ...e.fields(t), ...r ].sort(), o);
}

function refineFields(e, n, o, r = !o) {
  const i = {};
  let a, s = 0;
  for (const t of n) {
    if (t === a) {
      throw new RangeError(duplicateFields(t));
    }
    if ("constructor" === t || "__proto__" === t) {
      throw new RangeError(forbiddenField(t));
    }
    let n = e[t];
    if (void 0 !== n) {
      s = 1, Xn[t] && (n = Xn[t](n, t)), i[t] = n;
    } else if (o) {
      if (o.includes(t)) {
        throw new TypeError(missingField(t));
      }
      i[t] = ie[t];
    }
    a = t;
  }
  if (r && !s) {
    throw new TypeError(t);
  }
  return i;
}

function refineTimeBag(e, n) {
  return constrainIsoTimeFields(et({
    ...ie,
    ...e
  }), n);
}

function zonedDateTimeWithFields(e, n, t, o, r, i) {
  const a = copyOptions(i), {calendar: s, timeZone: c} = t;
  return createZonedDateTimeSlots(((e, n, t, o, r) => {
    const i = mergeCalendarFields(e, t, o, te, G, x), [a, s, c] = refineZonedFieldOptions(r, 2);
    return getMatchingInstantFor(n, {
      ...e.dateFromFields(i, overrideOverflowOptions(r, a)),
      ...refineTimeBag(i, a)
    }, parseOffsetNano(i.offset), s, c);
  })(e(s), n(c), o, r, a), c, s);
}

function plainDateTimeWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return createPlainDateTimeSlots(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, te, j), i = refineOverflowOptions(o);
    return checkIsoDateTimeInBounds({
      ...e.dateFromFields(r, overrideOverflowOptions(o, i)),
      ...refineTimeBag(r, i)
    });
  })(e(n.calendar), t, o, i));
}

function plainDateWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, te);
    return e.dateFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function plainYearMonthWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return createPlainYearMonthSlots(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, ee);
    return e.yearMonthFromFields(r, o);
  })(e(n.calendar), t, o, i));
}

function plainMonthDayWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, te);
    return e.monthDayFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function plainTimeWithFields(e, n, t) {
  return createPlainTimeSlots(((e, n, t) => {
    const o = refineOverflowOptions(t);
    return refineTimeBag({
      ...pluckProps(W, e),
      ...refineFields(n, W)
    }, o);
  })(e, n, t));
}

function durationWithFields(e, n) {
  return createDurationSlots((t = e, o = n, checkDurationFields({
    ...t,
    ...refineFields(o, me)
  })));
  var t, o;
}

function mergeCalendarFields(e, n, t, o, r = [], i = []) {
  const a = [ ...e.fields(o), ...r ].sort();
  let s = refineFields(n, a, i);
  const c = refineFields(t, a);
  return s = e.mergeFields(s, c), refineFields(s, a, []);
}

function convertToPlainMonthDay(e, n) {
  const t = refineCalendarFields(e, n, re);
  return e.monthDayFromFields(t);
}

function convertToPlainYearMonth(e, n, t) {
  const o = refineCalendarFields(e, n, ne);
  return e.yearMonthFromFields(o, t);
}

function convertToIso(e, n, t, o, r) {
  n = pluckProps(t = e.fields(t), n), o = refineFields(o, r = e.fields(r), []);
  let i = e.mergeFields(n, o);
  return i = refineFields(i, [ ...t, ...r ].sort(), []), e.dateFromFields(i);
}

function refineYear(e, n) {
  let {era: t, eraYear: o, year: r} = n;
  const i = getCalendarEraOrigins(e);
  if (void 0 !== t || void 0 !== o) {
    if (void 0 === t || void 0 === o) {
      throw new TypeError(s);
    }
    if (!i) {
      throw new RangeError(a);
    }
    const e = i[t];
    if (void 0 === e) {
      throw new RangeError(invalidEra(t));
    }
    const n = eraYearToYear(o, e);
    if (void 0 !== r && r !== n) {
      throw new RangeError(c);
    }
    r = n;
  } else if (void 0 === r) {
    throw new TypeError(missingYear(i));
  }
  return r;
}

function refineMonth(e, n, t, o) {
  let {month: r, monthCode: i} = n;
  if (void 0 !== i) {
    const n = ((e, n, t, o) => {
      const r = e.F(t), [i, a] = parseMonthCode(n);
      let s = monthCodeNumberToMonth(i, a, r);
      if (a) {
        const n = getCalendarLeapMonthMeta(e);
        if (void 0 === n) {
          throw new RangeError(d);
        }
        if (n > 0) {
          if (s > n) {
            throw new RangeError(d);
          }
          if (void 0 === r) {
            if (1 === o) {
              throw new RangeError(d);
            }
            s--;
          }
        } else {
          if (s !== -n) {
            throw new RangeError(d);
          }
          if (void 0 === r && 1 === o) {
            throw new RangeError(d);
          }
        }
      }
      return s;
    })(e, i, t, o);
    if (void 0 !== r && r !== n) {
      throw new RangeError(u);
    }
    r = n, o = 1;
  } else if (void 0 === r) {
    throw new TypeError(l);
  }
  return clampEntity("month", r, 1, e.O(t), o);
}

function refineDay(e, n, t, o, r) {
  return clampProp(n, "day", 1, e.k(o, t), r);
}

function spliceFields(e, n, t, o) {
  let r = 0;
  const i = [];
  for (const e of t) {
    void 0 !== n[e] ? r = 1 : i.push(e);
  }
  if (Object.assign(e, n), r) {
    for (const n of o || i) {
      delete e[n];
    }
  }
}

function createNativeOpsCreator(e, n) {
  return t => t === ae ? e : t === se || t === ce ? Object.assign(Object.create(e), {
    id: t
  }) : Object.assign(Object.create(n), Gn(t));
}

function constructInstantSlots(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(e))));
}

function constructZonedDateTimeSlots(e, n, t, o, r = ae) {
  return createZonedDateTimeSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(t))), n(o), e(r));
}

function constructPlainDateTimeSlots(e, n, t, o, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0, l = ae) {
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds(checkIsoDateTimeFields(mapProps(toInteger, zipProps(Ne, [ n, t, o, r, i, a, s, c, u ])))), e(l));
}

function constructPlainDateSlots(e, n, t, o, r = ae) {
  return createPlainDateSlots(checkIsoDateInBounds(checkIsoDateFields(mapProps(toInteger, {
    isoYear: n,
    isoMonth: t,
    isoDay: o
  }))), e(r));
}

function constructPlainYearMonthSlots(e, n, t, o = ae, r = 1) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: i,
    isoMonth: a,
    isoDay: toInteger(r)
  })), s);
}

function constructPlainMonthDaySlots(e, n, t, o = ae, r = Be) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(r),
    isoMonth: i,
    isoDay: a
  })), s);
}

function constructPlainTimeSlots(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0) {
  return createPlainTimeSlots(constrainIsoTimeFields(mapProps(toInteger, zipProps(ge, [ e, n, t, o, r, i ])), 1));
}

function constructDurationSlots(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0) {
  return createDurationSlots(checkDurationFields(mapProps(toStrictInteger, zipProps(de, [ e, n, t, o, r, i, a, s, c, u ]))));
}

function instantToZonedDateTime(e, n, t = ae) {
  return createZonedDateTimeSlots(e.epochNanoseconds, n, t);
}

function zonedDateTimeToInstant(e) {
  return createInstantSlots(e.epochNanoseconds);
}

function zonedDateTimeToPlainDateTime(e, n) {
  return createPlainDateTimeSlots(bn(n, e));
}

function zonedDateTimeToPlainDate(e, n) {
  return createPlainDateSlots(bn(n, e));
}

function zonedDateTimeToPlainYearMonth(e, n, t) {
  return convertToPlainYearMonth(e(n.calendar), t);
}

function zonedDateTimeToPlainMonthDay(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function zonedDateTimeToPlainTime(e, n) {
  return createPlainTimeSlots(bn(n, e));
}

function plainDateTimeToZonedDateTime(e, n, t, o) {
  return createZonedDateTimeSlots(((e, n, t, o) => {
    const r = refineEpochDisambigOptions(o);
    return checkEpochNanoInBounds(getSingleInstantFor(e(n), t, r));
  })(e, t, n, o), t, n.calendar);
}

function plainDateTimeToPlainYearMonth(e, n, t) {
  const o = e(n.calendar);
  return createPlainYearMonthSlots({
    ...n,
    ...convertToPlainYearMonth(o, t)
  });
}

function plainDateTimeToPlainMonthDay(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function plainDateToZonedDateTime(e, n, t, o, r) {
  const i = e(r.timeZone), a = r.plainTime, s = void 0 !== a ? n(a) : ve;
  return createZonedDateTimeSlots(getSingleInstantFor(t(i), {
    ...o,
    ...s
  }), i, o.calendar);
}

function plainDateToPlainDateTime(e, n = ve) {
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function plainDateToPlainYearMonth(e, n, t) {
  return convertToPlainYearMonth(e(n.calendar), t);
}

function plainDateToPlainMonthDay(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function plainYearMonthToPlainDate(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, ne, requireObjectLike(t), X))(e(n.calendar), t, o);
}

function plainMonthDayToPlainDate(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, re, requireObjectLike(t), J))(e(n.calendar), t, o);
}

function plainTimeToZonedDateTime(e, n, t, o, r) {
  const i = requireObjectLike(r), a = n(i.plainDate), s = e(i.timeZone);
  return createZonedDateTimeSlots(getSingleInstantFor(t(s), {
    ...a,
    ...o
  }), s, a.calendar);
}

function plainTimeToPlainDateTime(e, n) {
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function epochSecToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(numberToDayTimeNano(e, z)));
}

function epochMilliToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(numberToDayTimeNano(e, Z)));
}

function epochMicroToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(e), R)));
}

function epochNanoToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToDayTimeNano(toBigInt(e))));
}

function zonedDateTimeWithPlainTime(e, n, t = ve) {
  const o = n.timeZone, r = e(o), i = {
    ...bn(n, r),
    ...t
  };
  return createZonedDateTimeSlots(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, n.calendar);
}

function zonedDateTimeWithPlainDate(e, n, t) {
  const o = n.timeZone, r = e(o), i = {
    ...bn(n, r),
    ...t
  }, a = getPreferredCalendarSlot(n.calendar, t.calendar);
  return createZonedDateTimeSlots(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, a);
}

function plainDateTimeWithPlainTime(e, n = ve) {
  return createPlainDateTimeSlots({
    ...e,
    ...n
  });
}

function plainDateTimeWithPlainDate(e, n) {
  return createPlainDateTimeSlots({
    ...e,
    ...n
  }, getPreferredCalendarSlot(e.calendar, n.calendar));
}

function slotsWithCalendar(e, n) {
  return {
    ...e,
    calendar: n
  };
}

function slotsWithTimeZone(e, n) {
  return {
    ...e,
    timeZone: n
  };
}

function getPreferredCalendarSlot(e, n) {
  if (e === n) {
    return e;
  }
  const t = getId(e), o = getId(n);
  if (t === o || t === ae) {
    return n;
  }
  if (o === ae) {
    return e;
  }
  throw new RangeError(h);
}

function createOptionsTransformer(e, n, t = []) {
  const o = new Set(t);
  return t => (((e, n) => {
    for (const t of n) {
      if (t in e) {
        return 1;
      }
    }
    return 0;
  })(t = excludePropsByName(o, t), e) || Object.assign(t, n), t);
}

function isoDateFieldsToEpochNano(e, n) {
  return getSingleInstantFor(wn(n.timeZone), {
    ...ve,
    isoHour: 12,
    ...e
  });
}

function extractEpochNano(e) {
  return e.epochNanoseconds;
}

function createFormatPrepper(e, n = createFormatForPrep) {
  const [t, , , o] = e;
  return (r, i = wt, ...a) => {
    const s = n(o ? o(...a) : void 0, r, i, t), c = s.resolvedOptions();
    return [ s, ...toEpochMillis(e, c, ...a) ];
  };
}

function createFormatForPrep(e, n, t, o) {
  if (t = o(t), e) {
    if (void 0 !== t.timeZone) {
      throw new TypeError(b);
    }
    t.timeZone = e;
  }
  return new Fe(n, t);
}

function toEpochMillis(e, n, ...t) {
  const [, o, r] = e;
  return t.map((e => (e.calendar && ((e, n, t) => {
    if ((t || e !== ae) && e !== n) {
      throw new RangeError(h);
    }
  })(getId(e.calendar), n.calendar, r), epochNanoToMilli(o(e, n)))));
}

function getCurrentIsoDateTime(e) {
  const n = zonedEpochNanoToIso(e, getCurrentEpochNanoseconds());
  return pluckProps(Ne, n);
}

function getCurrentEpochNanoseconds() {
  return numberToDayTimeNano(Date.now(), Z);
}

function getCurrentTimeZoneId() {
  return Ot || (Ot = (new Fe).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, e = "Cannot convert Symbol to string", n = "Invalid object", numberOutOfRange = (e, n, t, o) => `${e} ${n} must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, forbiddenField = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, t = "No valid fields", o = "Invalid bag", r = "Cannot use valueOf", i = "Invalid calling context", a = "Forbidden era/eraYear", s = "Mismatching era/eraYear", c = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, u = "Mismatching month/monthCode", l = "Missing month/monthCode", f = "Cannot guess year", d = "Invalid leap month", m = "Invalid protocol", p = "Invalid protocol results", invalidCalendar = e => `Invalid Calendar: ${e}`, h = "Mismatching Calendars", T = "Mismatching TimeZones", D = "Out-of-bounds offset", I = "Invalid offset for TimeZone", g = "Ambiguous offset", y = "Out-of-bounds date", N = "Cannot mix duration signs", M = "Missing relativeTo", P = "Cannot use large units", E = "Required smallestUnit or largestUnit", v = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, invalidFormatType = e => `Cannot format ${e}`, F = "Mismatching types for formatting", b = "Forbidden timeZone", S = /*@__PURE__*/ bindArgs(mapPropNames, ((e, n) => n)), w = /*@__PURE__*/ bindArgs(mapPropNames, ((e, n, t) => t)), O = /*@__PURE__*/ bindArgs(padNumber, 2), Y = {
  nanosecond: 0,
  microsecond: 1,
  millisecond: 2,
  second: 3,
  minute: 4,
  hour: 5,
  day: 6,
  week: 7,
  month: 8,
  year: 9
}, k = /*@__PURE__*/ Object.keys(Y), C = 864e5, B = 1e3, R = 1e3, Z = 1e6, z = 1e9, q = 6e10, L = 36e11, A = 864e11, U = [ 1, R, Z, z, q, L, A ], j = /*@__PURE__*/ k.slice(0, 6), W = /*@__PURE__*/ sortStrings(j), x = [ "offset" ], $ = [ "timeZone" ], G = /*@__PURE__*/ j.concat(x), H = /*@__PURE__*/ G.concat($), V = [ "era", "eraYear" ], _ = /*@__PURE__*/ V.concat([ "year" ]), J = [ "year" ], K = [ "monthCode" ], Q = /*@__PURE__*/ [ "month" ].concat(K), X = [ "day" ], ee = /*@__PURE__*/ Q.concat(J), ne = /*@__PURE__*/ K.concat(J), te = /*@__PURE__*/ X.concat(ee), oe = /*@__PURE__*/ X.concat(Q), re = /*@__PURE__*/ X.concat(K), ie = /*@__PURE__*/ w(j, 0), ae = "iso8601", se = "gregory", ce = "japanese", ue = {
  [se]: {
    bce: -1,
    ce: 0
  },
  [ce]: {
    bce: -1,
    ce: 0,
    meiji: 1867,
    taisho: 1911,
    showa: 1925,
    heisei: 1988,
    reiwa: 2018
  },
  ethioaa: {
    era0: 0
  },
  ethiopic: {
    era0: 0,
    era1: 5500
  },
  coptic: {
    era0: -1,
    era1: 0
  },
  roc: {
    beforeroc: -1,
    minguo: 0
  },
  buddhist: {
    be: 0
  },
  islamic: {
    ah: 0
  },
  indian: {
    saka: 0
  },
  persian: {
    ap: 0
  }
}, le = {
  bc: "bce",
  ad: "ce"
}, fe = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, de = /*@__PURE__*/ k.map((e => e + "s")), me = /*@__PURE__*/ sortStrings(de), pe = /*@__PURE__*/ de.slice(0, 6), he = /*@__PURE__*/ de.slice(6), Te = /*@__PURE__*/ S(de), De = /*@__PURE__*/ w(de, 0), Ie = /*@__PURE__*/ w(pe, 0), ge = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], ye = [ "isoDay", "isoMonth", "isoYear" ], Ne = /*@__PURE__*/ ge.concat(ye), Me = /*@__PURE__*/ sortStrings(ye), Pe = /*@__PURE__*/ sortStrings(ge), Ee = /*@__PURE__*/ sortStrings(Ne), ve = /*@__PURE__*/ w(Pe, 0), Fe = Intl.DateTimeFormat, be = "en-GB", Se = 1e8, we = [ Se, 0 ], Oe = [ -Se, 0 ], Ye = 275760, ke = -271821, Ce = 1970, Be = 1972, Re = 12, Ze = 7, ze = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), qe = /*@__PURE__*/ createLazyGenerator(computeJapaneseEraParts, WeakMap), Le = /*@__PURE__*/ bindArgs(requireType, "string"), Ae = /*@__PURE__*/ bindArgs(requireType, "boolean"), Ue = /*@__PURE__*/ bindArgs(requireType, "number"), je = /*@__PURE__*/ bindArgs(requireType, "function"), We = "smallestUnit", xe = "unit", $e = "roundingIncrement", Ge = "fractionalSecondDigits", He = "relativeTo", Ve = {
  constrain: 0,
  reject: 1
}, _e = /*@__PURE__*/ Object.keys(Ve), Je = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, Ke = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, Qe = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, Xe = {
  auto: 0,
  never: 1,
  critical: 2
}, en = {
  auto: 0,
  never: 1
}, nn = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, tn = /*@__PURE__*/ bindArgs(refineUnitOption, We), on = /*@__PURE__*/ bindArgs(refineUnitOption, "largestUnit"), rn = /*@__PURE__*/ bindArgs(refineUnitOption, xe), an = /*@__PURE__*/ bindArgs(refineChoiceOption, "overflow", Ve), sn = /*@__PURE__*/ bindArgs(refineChoiceOption, "disambiguation", Je), cn = /*@__PURE__*/ bindArgs(refineChoiceOption, "offset", Ke), un = /*@__PURE__*/ bindArgs(refineChoiceOption, "calendarName", Qe), ln = /*@__PURE__*/ bindArgs(refineChoiceOption, "timeZoneName", Xe), fn = /*@__PURE__*/ bindArgs(refineChoiceOption, "offset", en), dn = /*@__PURE__*/ bindArgs(refineChoiceOption, "roundingMode", nn), mn = "PlainYearMonth", pn = "PlainMonthDay", hn = "PlainDate", Tn = "PlainDateTime", Dn = "PlainTime", In = "ZonedDateTime", gn = "Instant", yn = "Duration", Nn = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], Mn = "UTC", Pn = 5184e3, En = /*@__PURE__*/ isoArgsToEpochSec(1847), vn = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), Fn = /0+$/, bn = /*@__PURE__*/ createLazyGenerator(_zonedEpochSlotsToIso, WeakMap), Sn = /*@__PURE__*/ createLazyGenerator(computeDurationSign, WeakMap), wn = /*@__PURE__*/ createLazyGenerator((e => {
  const n = getTimeZoneEssence(e);
  return "object" == typeof n ? new IntlTimeZone(n) : new FixedTimeZone(n || 0);
}));

class FixedTimeZone {
  constructor(e) {
    this.h = e;
  }
  getOffsetNanosecondsFor() {
    return this.h;
  }
  getPossibleInstantsFor(e) {
    return [ isoToEpochNanoWithOffset(e, this.h) ];
  }
  C() {}
}

class IntlTimeZone {
  constructor(e) {
    this.B = (e => {
      function getOffsetSec(e) {
        const i = clampNumber(e, o, r), [a, s] = computePeriod(i), c = n(a), u = n(s);
        return c === u ? c : pinch(t(a, s), c, u, e);
      }
      function pinch(n, t, o, r) {
        let i, a;
        for (;(void 0 === r || void 0 === (i = r < n[0] ? t : r >= n[1] ? o : void 0)) && (a = n[1] - n[0]); ) {
          const t = n[0] + Math.floor(a / 2);
          e(t) === o ? n[1] = t : n[0] = t + 1;
        }
        return i;
      }
      const n = createLazyGenerator(e), t = createLazyGenerator(createSplitTuple);
      let o = En, r = vn;
      return {
        R(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        q: getOffsetSec,
        C(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = Pn * i, l = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
          0);
          for (;l(); ) {
            const o = n(s), r = n(c);
            if (o !== r) {
              const n = t(s, c);
              pinch(n, o, r);
              const a = n[0];
              if ((compareNumbers(a, e) || 1) === i) {
                return a;
              }
            }
            s += u, c += u;
          }
        }
      };
    })((e => n => {
      const t = hashIntlFormatParts(e, n * B);
      return isoArgsToEpochSec(parseIntlPartsYear(t), parseInt(t.month), parseInt(t.day), parseInt(t.hour), parseInt(t.minute), parseInt(t.second)) - n;
    })(e));
  }
  getOffsetNanosecondsFor(e) {
    return this.B.q(epochNanoToSec(e)) * z;
  }
  getPossibleInstantsFor(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.isoHour, o.isoMinute, o.isoSecond), o.isoMillisecond * Z + o.isoMicrosecond * R + o.isoNanosecond ];
    var o;
    return this.B.R(n).map((e => checkEpochNanoInBounds(addDayTimeNanoAndNumber(numberToDayTimeNano(e, z), t))));
  }
  C(e, n) {
    const [t, o] = (e => dayTimeNanoToNumberRemainder(e, z))(e), r = this.B.C(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return numberToDayTimeNano(r, z);
    }
  }
}

const On = "([+−-])", Yn = "(?:[.,](\\d{1,9}))?", kn = `(?:(?:${On}(\\d{6}))|(\\d{4}))-?(\\d{2})`, Cn = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + Yn + ")?)?", Bn = On + Cn, Rn = kn + "-?(\\d{2})(?:[T ]" + Cn + "(Z|" + Bn + ")?)?", Zn = "\\[(!?)([^\\]]*)\\]", zn = `((?:${Zn})*)`, qn = /*@__PURE__*/ createRegExp(kn + zn), Ln = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + zn), An = /*@__PURE__*/ createRegExp(Rn + zn), Un = /*@__PURE__*/ createRegExp("T?" + Cn + "(?:" + Bn + ")?" + zn), jn = /*@__PURE__*/ createRegExp(Bn), Wn = /*@__PURE__*/ new RegExp(Zn, "g"), xn = /*@__PURE__*/ createRegExp(`${On}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${Yn}H)?(?:(\\d+)${Yn}M)?(?:(\\d+)${Yn}S)?)?`), $n = /*@__PURE__*/ createLazyGenerator((e => new Fe(be, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), Gn = /*@__PURE__*/ createLazyGenerator(createIntlCalendar), Hn = /*@__PURE__*/ createLazyGenerator((e => new Fe(be, {
  calendar: e,
  timeZone: Mn,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), Vn = {
  dateAdd(e, n, t) {
    const o = refineOverflowOptions(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += givenFieldsToDayTimeNano(n, 5, de)[0], i || a) {
      let [n, t, s] = this.u(e);
      if (i) {
        const [e, r] = this.l(n, t);
        n += i, t = monthCodeNumberToMonth(e, r, this.F(n)), t = clampEntity("month", t, 1, this.O(n), o);
      }
      a && ([n, t] = this.L(n, t, a)), s = clampEntity("day", s, 1, this.k(n, t), o), 
      r = this.U(n, t, s);
    } else {
      if (!s && !c) {
        return e;
      }
      r = isoToEpochMilli(e);
    }
    return r += (s * Ze + c) * C, checkIsoDateInBounds(epochMilliToIso(r));
  },
  dateUntil(e, n, t) {
    if (t <= 7) {
      let o = 0, r = diffDays(e, n);
      return 7 === t && ([o, r] = divModTrunc(r, Ze)), {
        ...De,
        weeks: o,
        days: r
      };
    }
    const o = this.u(e), r = this.u(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      function updateYearMonth() {
        const [o, a] = e.l(n, t), [l, f] = e.l(r, i);
        s = r - n, c = e.O(r), u = s ? l - o || Number(f) - Number(a) : i - Math.min(t, c);
      }
      function updateYearMonthDay() {
        updateYearMonth(), l = e.k(r, i), f = a - Math.min(o, l);
      }
      let s, c, u, l, f;
      updateYearMonthDay();
      const d = Math.sign(f), m = Math.sign(s) || Math.sign(u) || d;
      if (m) {
        if (d === -m) {
          const n = l;
          [r, i] = e.L(r, i, -m), updateYearMonthDay(), f += m < 0 ? -n : l;
        }
        if (Math.sign(u) === -m) {
          const e = c;
          r -= m, updateYearMonth(), u += m < 0 ? -e : c;
        }
      }
      return [ s, u, f ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.j(i, o[0]), i = 0), {
      ...De,
      years: i,
      months: a,
      days: s
    };
  },
  dateFromFields(e, n) {
    const t = refineOverflowOptions(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return createPlainDateSlots(checkIsoDateInBounds(this.p(o, r, i)), this.id || ae);
  },
  yearMonthFromFields(e, n) {
    const t = refineOverflowOptions(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.p(o, r, 1)), this.id || ae);
  },
  monthDayFromFields(e, n) {
    const t = refineOverflowOptions(n), o = !this.id, {monthCode: r, year: i, month: a} = e;
    let s, c, l, d, m;
    if (void 0 !== r) {
      [s, c] = parseMonthCode(r), m = getDefinedProp(e, "day");
      const n = this.m(s, c, m);
      if (!n) {
        throw new RangeError(f);
      }
      if ([l, d] = n, void 0 !== a && a !== d) {
        throw new RangeError(u);
      }
      o && (d = clampEntity("month", d, 1, Re, 1), m = clampEntity("day", m, 1, computeIsoDaysInMonth(void 0 !== i ? i : l, d), t));
    } else {
      l = void 0 === i && o ? Be : refineYear(this, e), d = refineMonth(this, e, l, t), 
      m = refineDay(this, e, d, l, t);
      const n = this.F(l);
      c = d === n, s = monthToMonthCodeNumber(d, n);
      const r = this.m(s, c, m);
      if (!r) {
        throw new RangeError(f);
      }
      [l, d] = r;
    }
    return createPlainMonthDaySlots(this.p(l, d, m), this.id || ae);
  },
  fields(e) {
    return getCalendarEraOrigins(this) && e.includes("year") ? [ ...e, ...V ] : e;
  },
  mergeFields(e, n) {
    const t = Object.assign(Object.create(null), e);
    return spliceFields(t, n, Q), getCalendarEraOrigins(this) && (spliceFields(t, n, _), 
    this.id === ce && spliceFields(t, n, oe, V)), t;
  },
  inLeapYear(e) {
    const [n] = this.u(e);
    return this.$(n);
  },
  monthsInYear(e) {
    const [n] = this.u(e);
    return this.O(n);
  },
  daysInMonth(e) {
    const [n, t] = this.u(e);
    return this.k(n, t);
  },
  daysInYear(e) {
    const [n] = this.u(e);
    return this.G(n);
  },
  era(e) {
    return this.V(e)[0];
  },
  eraYear(e) {
    return this.V(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.u(e), [o, r] = this.l(n, t);
    return ((e, n) => "M" + O(e) + (n ? "L" : ""))(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  weekOfYear(e) {
    return computeIsoWeekParts(e)[1];
  },
  yearOfWeek(e) {
    return computeIsoWeekParts(e)[0];
  },
  daysInWeek() {
    return Ze;
  }
}, _n = /^M(\d{2})(L?)$/, Jn = {
  era: toStringViaPrimitive,
  eraYear: toInteger,
  year: toInteger,
  month: toPositiveInteger,
  monthCode: toStringViaPrimitive,
  day: toPositiveInteger
}, Kn = /*@__PURE__*/ w(j, toInteger), Qn = /*@__PURE__*/ w(de, toStrictInteger), Xn = /*@__PURE__*/ Object.assign({}, Jn, Kn, Qn, {
  offset: toStringViaPrimitive
}), et = /*@__PURE__*/ bindArgs(remapProps, j, ge), nt = /*@__PURE__*/ createNativeOpsCreator(/*@__PURE__*/ Object.assign({}, Vn, {
  u: e => [ e.isoYear, e.isoMonth, e.isoDay ],
  V(e) {
    return this.id === se ? computeGregoryEraParts(e) : this.id === ce ? qe(e) : [ void 0, void 0 ];
  },
  l: (e, n) => [ n, 0 ],
  m(e, n) {
    if (!n) {
      return [ Be, e ];
    }
  },
  $: computeIsoInLeapYear,
  F() {},
  O: computeIsoMonthsInYear,
  j: e => e * Re,
  k: computeIsoDaysInMonth,
  G: computeIsoDaysInYear,
  dayOfYear: computeIsoDayOfYear,
  p: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  U: isoArgsToEpochMilli,
  L: (e, n, t) => (e += divTrunc(t, Re), (n += modTrunc(t, Re)) < 1 ? (e--, n += Re) : n > Re && (e++, 
  n -= Re), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), /*@__PURE__*/ Object.assign({}, Vn, {
  u: computeIntlDateParts,
  V(e) {
    const n = this.I(e);
    return [ n.era, n.eraYear ];
  },
  l(e, n) {
    const t = computeIntlLeapMonth.call(this, e);
    return [ monthToMonthCodeNumber(n, t), t === n ];
  },
  m(e, n, t) {
    let [o, r, i] = computeIntlDateParts.call(this, {
      isoYear: Be,
      isoMonth: Re,
      isoDay: 31
    });
    const a = computeIntlLeapMonth.call(this, o), s = r === a;
    1 === (compareNumbers(e, monthToMonthCodeNumber(r, a)) || compareNumbers(Number(n), Number(s)) || compareNumbers(t, i)) && o--;
    for (let r = 0; r < 100; r++) {
      const i = o - r, a = computeIntlLeapMonth.call(this, i), s = monthCodeNumberToMonth(e, n, a);
      if (n === (s === a) && t <= computeIntlDaysInMonth.call(this, i, s)) {
        return [ i, s ];
      }
    }
  },
  $(e) {
    const n = computeIntlDaysInYear.call(this, e);
    return n > computeIntlDaysInYear.call(this, e - 1) && n > computeIntlDaysInYear.call(this, e + 1);
  },
  F: computeIntlLeapMonth,
  O: computeIntlMonthsInYear,
  j(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  k: computeIntlDaysInMonth,
  G: computeIntlDaysInYear,
  dayOfYear(e) {
    const n = isoToEpochMilli({
      ...e,
      ...ve
    }), {year: t} = this.I(e);
    return diffEpochMilliByDay(computeIntlEpochMilli.call(this, t), n);
  },
  p(e, n, t) {
    return checkIsoDateInBounds({
      ...epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t))
    });
  },
  U: computeIntlEpochMilli,
  L(e, n, t) {
    if (t) {
      if (n += t, t < 0) {
        if (n < Number.MIN_SAFE_INTEGER) {
          throw new RangeError(y);
        }
        for (;n < 1; ) {
          n += computeIntlMonthsInYear.call(this, --e);
        }
      } else {
        if (n > Number.MAX_SAFE_INTEGER) {
          throw new RangeError(y);
        }
        let t;
        for (;n > (t = computeIntlMonthsInYear.call(this, e)); ) {
          n -= t, e++;
        }
      }
    }
    return [ e, n ];
  },
  year(e) {
    return this.I(e).year;
  },
  month(e) {
    const {year: n, month: t} = this.I(e), {v: o} = this.N(n);
    return o[t] + 1;
  },
  day(e) {
    return this.I(e).day;
  }
})), tt = "numeric", ot = [ "timeZoneName" ], rt = {
  month: tt,
  day: tt
}, it = {
  year: tt,
  month: tt
}, at = /*@__PURE__*/ Object.assign({}, it, {
  day: tt
}), st = {
  hour: tt,
  minute: tt,
  second: tt
}, ct = /*@__PURE__*/ Object.assign({}, at, st), ut = /*@__PURE__*/ Object.assign({}, ct, {
  timeZoneName: "short"
}), lt = /*@__PURE__*/ Object.keys(rt), ft = /*@__PURE__*/ Object.keys(it), dt = /*@__PURE__*/ Object.keys(at), mt = /*@__PURE__*/ Object.keys(st), pt = /*@__PURE__*/ dt.concat([ "weekday", "dateStyle" ]), ht = /*@__PURE__*/ mt.concat([ "dayPeriod", "timeStyle" ]), Tt = /*@__PURE__*/ pt.concat(ht), Dt = /*@__PURE__*/ Tt.concat(ot), It = /*@__PURE__*/ ot.concat(ht), gt = /*@__PURE__*/ ot.concat(pt), yt = /*@__PURE__*/ ot.concat([ "day", "weekday", "dateStyle" ], ht), Nt = /*@__PURE__*/ createOptionsTransformer(lt, rt, /*@__PURE__*/ ot.concat([ "year", "weekday", "dateStyle" ], ht)), Mt = [ /*@__PURE__*/ createOptionsTransformer(ft, it, yt), isoDateFieldsToEpochNano, 1 ], Pt = [ Nt, isoDateFieldsToEpochNano, 1 ], Et = [ /*@__PURE__*/ createOptionsTransformer(pt, at, It), isoDateFieldsToEpochNano ], vt = [ /*@__PURE__*/ createOptionsTransformer(Tt, ct, ot), isoDateFieldsToEpochNano ], Ft = [ /*@__PURE__*/ createOptionsTransformer(ht, st, gt), (e, n) => getSingleInstantFor(wn(n.timeZone), {
  isoYear: Ce,
  isoMonth: 1,
  isoDay: 1,
  ...e
}) ], bt = [ /*@__PURE__*/ createOptionsTransformer(Tt, ct), extractEpochNano ], St = [ /*@__PURE__*/ createOptionsTransformer(Dt, ut), extractEpochNano, 0, (e, n) => {
  const t = getId(e.timeZone);
  if (n && getId(n.timeZone) !== t) {
    throw new RangeError(T);
  }
  return t;
} ], wt = {};

let Ot;

export { yn as DurationBranding, gn as InstantBranding, hn as PlainDateBranding, Tn as PlainDateTimeBranding, pn as PlainMonthDayBranding, Dn as PlainTimeBranding, mn as PlainYearMonthBranding, Fe as RawDateTimeFormat, In as ZonedDateTimeBranding, absDuration, addDurations, bindArgs, buildZonedIsoFields, compareDurations, compareInstants, compareIsoDateFields, compareIsoDateTimeFields, compareIsoTimeFields, compareZonedDateTimes, computeHoursInDay, computeStartOfDay, constructDurationSlots, constructInstantSlots, constructPlainDateSlots, constructPlainDateTimeSlots, constructPlainMonthDaySlots, constructPlainTimeSlots, constructPlainYearMonthSlots, constructZonedDateTimeSlots, copyOptions, createDurationSlots, createFormatForPrep, createFormatPrepper, createGetterDescriptors, createInstantSlots, createLazyGenerator, createNameDescriptors, nt as createNativeStandardOps, createPlainDateSlots, createPlainDateTimeSlots, createPlainTimeSlots, createPropDescriptors, createStringTagDescriptors, createZonedDateTimeSlots, te as dateFieldNamesAlpha, diffInstants, diffPlainDateTimes, diffPlainDates, diffPlainTimes, diffPlainYearMonth, diffZonedDateTimes, de as durationFieldNamesAsc, durationWithFields, epochMicroToInstant, epochMilliToInstant, epochNanoToInstant, epochNanoToIso, epochSecToInstant, excludePropsByName, excludeUndefinedProps, forbiddenField, r as forbiddenValueOf, formatDurationIso, formatInstantIso, formatOffsetNano, formatPlainDateIso, formatPlainDateTimeIso, formatPlainMonthDayIso, formatPlainTimeIso, formatPlainYearMonthIso, formatZonedDateTimeIso, getCurrentEpochNanoseconds, getCurrentIsoDateTime, getCurrentTimeZoneId, getEpochMicroseconds, getEpochMilliseconds, getEpochNanoseconds, getEpochSeconds, getId, getRequiredDateFields, getRequiredMonthDayFields, getRequiredYearMonthFields, getSingleInstantFor, hasAllPropsByName, bt as instantConfig, instantToZonedDateTime, instantsEqual, o as invalidBag, i as invalidCallingContext, invalidFormatType, m as invalidProtocol, isObjectLike, isTimeZoneSlotsEqual, ae as isoCalendarId, ve as isoTimeFieldDefaults, ge as isoTimeFieldNamesAsc, mapPropNames, mapProps, F as mismatchingFormatTypes, moveInstant, movePlainDate, movePlainDateTime, movePlainTime, movePlainYearMonth, moveZonedDateTime, Z as nanoInMilli, negateDuration, numberToDayTimeNano, parseCalendarId, parseDuration, parseInstant, parsePlainDate, parsePlainDateTime, parsePlainMonthDay, parsePlainTime, parsePlainYearMonth, parseTimeZoneId, parseZonedDateTime, parseZonedOrPlainDateTime, Et as plainDateConfig, vt as plainDateTimeConfig, plainDateTimeToPlainMonthDay, plainDateTimeToPlainYearMonth, plainDateTimeToZonedDateTime, plainDateTimeWithFields, plainDateTimeWithPlainDate, plainDateTimeWithPlainTime, plainDateTimesEqual, plainDateToPlainDateTime, plainDateToPlainMonthDay, plainDateToPlainYearMonth, plainDateToZonedDateTime, plainDateWithFields, plainDatesEqual, Pt as plainMonthDayConfig, plainMonthDayToPlainDate, plainMonthDayWithFields, plainMonthDaysEqual, Ft as plainTimeConfig, plainTimeToPlainDateTime, plainTimeToZonedDateTime, plainTimeWithFields, plainTimesEqual, Mt as plainYearMonthConfig, plainYearMonthToPlainDate, plainYearMonthWithFields, plainYearMonthsEqual, pluckProps, queryDurationBlank, Sn as queryDurationSign, wn as queryNativeTimeZone, refineCalendarDiffOptions, refineDurationBag, refineEpochDisambigOptions, refineMaybeZonedDateTimeBag, refineOverflowOptions, refinePlainDateBag, refinePlainDateTimeBag, refinePlainMonthDayBag, refinePlainTimeBag, refinePlainYearMonthBag, refineZonedDateTimeBag, refineZonedFieldOptions, Ae as requireBoolean, je as requireFunction, requireInteger, requireIntegerOrUndefined, requireNonNullish, requireObjectLike, requirePositiveInteger, Le as requireString, requireStringOrUndefined, resolveCalendarId, resolveTimeZoneId, roundDuration, roundInstant, roundPlainDateTime, roundPlainTime, roundZonedDateTime, slotsWithCalendar, slotsWithTimeZone, j as timeFieldNamesAsc, totalDuration, k as unitNamesAsc, validateTimeZoneOffset, St as zonedDateTimeConfig, zonedDateTimeToInstant, zonedDateTimeToPlainDate, zonedDateTimeToPlainDateTime, zonedDateTimeToPlainMonthDay, zonedDateTimeToPlainTime, zonedDateTimeToPlainYearMonth, zonedDateTimeWithFields, zonedDateTimeWithPlainDate, zonedDateTimeWithPlainTime, zonedDateTimesEqual, bn as zonedEpochSlotsToIso };
