function clampProp(e, n, t, o, r) {
  return clampEntity(n, getDefinedProp(e, n), t, o, r);
}

function clampEntity(e, n, t, o, r, i) {
  const a = clampNumber(n, t, o);
  if (r && n !== a) {
    throw new RangeError(numberOutOfRange(e, n, t, o, i));
  }
  return a;
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

function memoize(e, n = Map) {
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

function givenFieldsToBigNano(e, n, t) {
  let o = 0, r = 0;
  for (let i = 0; i <= n; i++) {
    const n = e[t[i]], a = j[i], s = W / a, [c, u] = divModTrunc(n, s);
    o += u * a, r += c;
  }
  const [i, a] = divModTrunc(o, W);
  return [ r + i, a ];
}

function nanoToGivenFields(e, n, t) {
  const o = {};
  for (let r = n; r >= 0; r--) {
    const n = j[r];
    o[t[r]] = divTrunc(e, n), e = modTrunc(e, n);
  }
  return o;
}

function getRequiredYearMonthFields(e) {
  return e === ce ? Q : [];
}

function getRequiredMonthDayFields(e) {
  return e === ce ? ne : [];
}

function getRequiredDateFields(e) {
  return e === ce ? [ "year", "day" ] : [];
}

function createBigNano(e, n) {
  let [t, o] = divModTrunc(n, W), r = e + t;
  const i = Math.sign(r);
  return i && i === -Math.sign(o) && (r -= i, o += i * W), [ r, o ];
}

function addBigNanoAndNumber(e, n) {
  return createBigNano(e[0], e[1] + n);
}

function addBigNanos(e, n, t = 1) {
  return createBigNano(e[0] + n[0] * t, e[1] + n[1] * t);
}

function diffBigNanos(e, n) {
  return addBigNanos(n, e, -1);
}

function compareBigNanos(e, n) {
  return compareNumbers(e[0], n[0]) || compareNumbers(e[1], n[1]);
}

function bigIntToBigNano(e, n = 1) {
  const t = BigInt(W / n);
  return [ Number(e / t), Number(e % t) * n ];
}

function numberToBigNano(e, n = 1) {
  const t = W / n, [o, r] = divModTrunc(e, t);
  return [ o, r * n ];
}

function bigNanoToBigInt(e, n = 1) {
  const [t, o] = e, r = Math.floor(o / n), i = W / n;
  return BigInt(t) * BigInt(i) + BigInt(r);
}

function bigNanoToNumber(e, n = 1, t) {
  const [o, r] = e, [i, a] = divModTrunc(r, n);
  return o * (W / n) + (i + (t ? a / n : 0));
}

function divModBigNano(e, n, t = divModFloor) {
  const [o, r] = e, [i, a] = t(r, n);
  return [ o * (W / n) + i, a ];
}

function hashIntlFormatParts(e, n) {
  const t = e.formatToParts(n), o = {};
  for (const e of t) {
    o[e.type] = e.value;
  }
  return o;
}

function checkIsoYearMonthInBounds(e) {
  return clampProp(e, "isoYear", Ze, Re, 1), e.isoYear === Ze ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Re && clampProp(e, "isoMonth", 1, 9, 1), 
  e;
}

function checkIsoDateInBounds(e) {
  return checkIsoDateTimeInBounds({
    ...e,
    ...be,
    isoHour: 12
  }), e;
}

function checkIsoDateTimeInBounds(e) {
  const n = clampProp(e, "isoYear", Ze, Re, 1), t = n === Ze ? 1 : n === Re ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    isoNanosecond: e.isoNanosecond - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || -1 === compareBigNanos(e, Ce) || 1 === compareBigNanos(e, Ye)) {
    throw new RangeError(N);
  }
  return e;
}

function isoTimeFieldsToNano(e) {
  return givenFieldsToBigNano(e, 5, ye)[1];
}

function nanoToIsoTimeAndDay(e) {
  const [n, t] = divModFloor(e, W);
  return [ nanoToGivenFields(t, 5, ye), n ];
}

function epochNanoToSec(e) {
  return epochNanoToSecMod(e)[0];
}

function epochNanoToSecMod(e) {
  return divModBigNano(e, A);
}

function epochNanoToMilli(e) {
  return divModBigNano(e, q)[0];
}

function isoToEpochMilli(e) {
  return isoArgsToEpochMilli(e.isoYear, e.isoMonth, e.isoDay, e.isoHour, e.isoMinute, e.isoSecond, e.isoMillisecond);
}

function isoToEpochNano(e) {
  const n = isoToEpochMilli(e);
  if (void 0 !== n) {
    const [t, o] = divModTrunc(n, R);
    return [ t, o * q + (e.isoMicrosecond || 0) * z + (e.isoNanosecond || 0) ];
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
  return isoArgsToEpochMilli(...e) / Z;
}

function isoArgsToEpochMilli(...e) {
  const [n, t] = isoToLegacyDate(...e), o = n.getTime();
  if (!isNaN(o)) {
    return o - t * R;
  }
}

function isoToLegacyDate(e, n = 1, t = 1, o = 0, r = 0, i = 0, a = 0) {
  const s = e === Ze ? 1 : e === Re ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function epochNanoToIso(e, n) {
  let [t, o] = addBigNanoAndNumber(e, n);
  o < 0 && (o += W, t -= 1);
  const [r, i] = divModFloor(o, q), [a, s] = divModFloor(i, z);
  return {
    ...epochMilliToIso(t * R + r),
    isoMicrosecond: a,
    isoNanosecond: s
  };
}

function epochMilliToIso(e) {
  const n = Math.ceil(Math.max(0, Math.abs(e) - ke) / R) * Math.sign(e), t = new Date(e - n * R);
  return zipProps(Pe, [ t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate() + n, t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds() ]);
}

function computeIsoMonthsInYear() {
  return Ae;
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
  return diffEpochMilliByDay(isoToEpochMilli((e => ({
    ...e,
    isoMonth: 1,
    isoDay: 1,
    ...be
  }))(e)), isoToEpochMilli({
    ...e,
    ...be
  })) + 1;
}

function computeIsoDayOfWeek(e) {
  const [n, t] = isoToLegacyDate(e.isoYear, e.isoMonth, e.isoDay);
  return modFloor(n.getUTCDay() - t, 7) || 7;
}

function computeGregoryEraParts({isoYear: e}) {
  return e < 1 ? [ "bce", 1 - e ] : [ "ce", e ];
}

function computeJapaneseEraParts(e) {
  const n = isoToEpochMilli(e);
  if (n < Le) {
    return computeGregoryEraParts(e);
  }
  const t = hashIntlFormatParts(Kn(le), n), {era: o, eraYear: r} = parseIntlYear(t, le);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(ve, e, constrainIsoDateFields(e));
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
  return zipProps(ye, [ clampProp(e, "isoHour", 0, 23, n), clampProp(e, "isoMinute", 0, 59, n), clampProp(e, "isoSecond", 0, 59, n), clampProp(e, "isoMillisecond", 0, 999, n), clampProp(e, "isoMicrosecond", 0, 999, n), clampProp(e, "isoNanosecond", 0, 999, n) ]);
}

function requireStringOrUndefined(e) {
  if (void 0 !== e) {
    return We(e);
  }
}

function requirePositiveIntegerOrUndefined(e) {
  if (void 0 !== e) {
    return requirePositiveInteger(e);
  }
}

function requireIntegerOrUndefined(e) {
  if (void 0 !== e) {
    return requireInteger(e);
  }
}

function requirePositiveInteger(e) {
  return requireNumberIsPositive(requireInteger(e));
}

function requireInteger(e) {
  return requireNumberIsInteger($e(e));
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

function toString(n) {
  if ("symbol" == typeof n) {
    throw new TypeError(e);
  }
  return String(n);
}

function toStringViaPrimitive(e, n) {
  return isObjectLike(e) ? String(e) : We(e, n);
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
  return void 0 === e ? 0 : un(requireObjectLike(e));
}

function refineZonedFieldOptions(e, n = 0) {
  e = normalizeOptions(e);
  const t = ln(e), o = fn(e, n);
  return [ un(e), o, t ];
}

function refineEpochDisambigOptions(e) {
  return ln(normalizeOptions(e));
}

function refineCalendarDiffOptions(e) {
  return e = normalizeOptions(e), sn(e, 9, 6, 1);
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = sn(n, o, r), s = parseRoundingIncInteger(n), c = hn(n, i);
  const u = an(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeUnitNameOptions(e, He));
  const r = hn(e, 7);
  let i = an(e, n);
  return i = requirePropDefined(He, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return dn(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ hn(e, 4), ...refineSmallestUnitAndSubsecDigits(an(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ j[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[Ve];
  return void 0 === n ? 1 : toInteger(n, Ve);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? W : j[n + 1];
  if (r) {
    const t = j[n];
    if (r % ((e = clampEntity(Ve, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity(Ve, e));
    }
  } else {
    e = clampEntity(Ve, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[_e];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(_e, n));
    }
    n = clampEntity(_e, Math.floor(n), 0, 9, 1);
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
    overflow: Qe[n]
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
  if (void 0 === a && (a = Ie[i]), void 0 === a) {
    throw new RangeError(invalidChoice(e, i, Y));
  }
  return clampEntity(e, a, o, t, 1, C), a;
}

function refineChoiceOption(e, n, t, o = 0) {
  const r = t[e];
  if (void 0 === r) {
    return o;
  }
  const i = toString(r), a = n[i];
  if (void 0 === a) {
    throw new RangeError(invalidChoice(e, i, n));
  }
  return a;
}

function checkLargestSmallestUnit(e, n) {
  if (n > e) {
    throw new RangeError(F);
  }
}

function createInstantSlots(e) {
  return {
    branding: yn,
    epochNanoseconds: e
  };
}

function createZonedDateTimeSlots(e, n, t) {
  return {
    branding: Nn,
    calendar: t,
    timeZone: n,
    epochNanoseconds: e
  };
}

function createPlainDateTimeSlots(e, n = e.calendar) {
  return {
    branding: In,
    calendar: n,
    ...pluckProps(Fe, e)
  };
}

function createPlainDateSlots(e, n = e.calendar) {
  return {
    branding: Dn,
    calendar: n,
    ...pluckProps(Ee, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: Tn,
    calendar: n,
    ...pluckProps(Ee, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: gn,
    calendar: n,
    ...pluckProps(Ee, e)
  };
}

function createPlainTimeSlots(e) {
  return {
    branding: Mn,
    ...pluckProps(Se, e)
  };
}

function createDurationSlots(e) {
  return {
    branding: vn,
    sign: computeDurationSign(e),
    ...pluckProps(he, e)
  };
}

function getEpochSeconds(e) {
  return epochNanoToSec(e.epochNanoseconds);
}

function getEpochMilliseconds(e) {
  return epochNanoToMilli(e.epochNanoseconds);
}

function getEpochMicroseconds(e) {
  return bigNanoToBigInt(e.epochNanoseconds, z);
}

function getEpochNanoseconds(e) {
  return bigNanoToBigInt(e.epochNanoseconds);
}

function getId(e) {
  return "string" == typeof e ? e : We(e.id);
}

function isIdLikeEqual(e, n) {
  return e === n || getId(e) === getId(n);
}

function createRelativeSystem(e, n, t) {
  const o = e(t.calendar);
  return t.epochNanoseconds ? [ t, o, n(t.timeZone) ] : [ {
    ...t,
    ...be
  }, o ];
}

function relativeMarkerToEpochNano(e, n) {
  return n ? e.epochNanoseconds : isoToEpochNano(e);
}

function totalDuration(e, n, t, o, r) {
  const i = getLargestDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeUnitNameOptions(e, Ge))[Je]);
    let o = cn(e);
    return o = requirePropDefined(Ge, o), [ o, t ];
  })(r, e), c = Math.max(a, i);
  if (c < 6 || 6 === c && (!s || !s.epochNanoseconds)) {
    return ((e, n) => totalBigNano(durationFieldsToBigNano(e), n))(o, a);
  }
  if (!s) {
    throw new RangeError(P);
  }
  const u = createRelativeSystem(n, t, s);
  return ((e, n, t, o, r, i) => {
    const a = computeDurationSign(e), [s, c] = clampRelativeDuration(clearDurationFields(e, t - 1), t, a, o, r, i), u = computeEpochNanoFrac(s, c, n);
    return e[pe[t]] + u * a;
  })(...spanDuration(o, void 0, a, ...u), a, ...u);
}

function totalBigNano(e, n) {
  return bigNanoToNumber(e, j[n], 1);
}

function clampRelativeDuration(e, n, t, o, r, i) {
  const a = {
    ...Me,
    [pe[n]]: t
  }, s = moveRelativeMarker(e, o, r, i), c = moveRelativeMarker(a, s, r, i);
  return [ relativeMarkerToEpochNano(s, i), relativeMarkerToEpochNano(c, i) ];
}

function computeEpochNanoFrac(e, n, t) {
  const o = bigNanoToNumber(diffBigNanos(e, n));
  if (!o) {
    throw new RangeError(m);
  }
  return bigNanoToNumber(diffBigNanos(e, t)) / o;
}

function roundInstant(e, n) {
  const [t, o, r] = refineRoundOptions(n, 5, 1);
  return createInstantSlots(roundBigNano(e.epochNanoseconds, t, o, r, 1));
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
      const o = computeTimeInDay(n, e);
      return checkIsoDateTimeInBounds({
        ...moveByIsoDays(e, roundByInc(isoTimeFieldsToNano(e), o, t) / o),
        ...be
      });
    }
    return roundDateTimeToNano(e, W, t);
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
  return nanoToDurationDayTimeFields(roundBigNano(durationFieldsToBigNano(e), t, o, r), n);
}

function balanceDayTimeDurationByInc(e, n, t, o) {
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(e, n), t, o), n);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c) {
  const u = o > 6 ? nudgeRelativeDuration : c && o < 6 ? nudgeRelativeDurationTime : nudgeDurationDayTime;
  let [l, f, d] = u(e, n, t, o, r, i, a, s, c);
  return d && (l = ((e, n, t, o, r, i, a) => {
    const s = computeDurationSign(e);
    for (let c = o + 1; c <= t; c++) {
      if (7 === c && 7 !== t) {
        continue;
      }
      const o = clearDurationFields(e, c - 1);
      o[pe[c]] += s;
      const u = bigNanoToNumber(diffBigNanos(relativeMarkerToEpochNano(moveRelativeMarker(o, r, i, a), a), n));
      if (u && Math.sign(u) !== s) {
        break;
      }
      e = o;
    }
    return e;
  })(l, f, t, Math.max(6, o), a, s, c)), l;
}

function computeNanoInc(e, n) {
  return j[e] * n;
}

function roundByInc(e, n, t) {
  return ((e, n) => Pn[n](e))(e / n, t) * n;
}

function roundToMinute(e) {
  return roundByInc(e, L, 7);
}

function roundBigNano(e, n, t, o, r) {
  return 6 === n ? [ roundByInc(totalBigNano(e, 6), t, o), 0 ] : roundBigNanoByInc(e, computeNanoInc(n, t), o, r);
}

function roundBigNanoByInc(e, n, t, o) {
  let [r, i] = e;
  o && i < 0 && (i += W, r -= 1);
  const [a, s] = divModFloor(roundByInc(i, n, t), W);
  return createBigNano(r + a, s);
}

function nudgeDurationDayTime(e, n, t, o, r, i) {
  const a = computeDurationSign(e), s = durationFieldsToBigNano(e), c = roundBigNano(s, o, r, i), u = diffBigNanos(s, c), l = Math.sign(c[0] - s[0]) === a, f = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...f
  }, addBigNanos(n, u), l ];
}

function nudgeRelativeDurationTime(e, n, t, o, r, i, a, s, c) {
  const u = computeDurationSign(e);
  let [l, f] = givenFieldsToBigNano(e, 5, pe);
  const d = computeNanoInc(o, r);
  let m = roundByInc(f, d, i);
  const [p, h] = clampRelativeDuration({
    ...e,
    ...Ne
  }, 6, u, a, s, c), T = m - bigNanoToNumber(diffBigNanos(p, h));
  T && Math.sign(T) !== u ? n = addBigNanoAndNumber(p, m) : (l += u, m = roundByInc(T, d, i), 
  n = addBigNanoAndNumber(h, m));
  const g = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...g,
    days: e.days + l
  }, n, Boolean(l) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c) {
  const u = computeDurationSign(e), l = pe[o], f = clearDurationFields(e, o - 1), d = divTrunc(e[l], r) * r;
  f[l] = d;
  const [m, p] = clampRelativeDuration(f, o, r * u, a, s, c), h = d + computeEpochNanoFrac(m, p, n) * u * r, T = roundByInc(h, r, i), g = Math.sign(T - h) === u;
  return f[l] = T, [ f, g ? p : m, g ];
}

function formatInstantIso(e, n, t, o) {
  const [r, i, a, s] = (e => {
    const n = refineTimeDisplayTuple(e = normalizeOptions(e));
    return [ e.timeZone, ...n ];
  })(o), c = void 0 !== r;
  return ((e, n, t, o, r, i) => {
    t = roundBigNanoByInc(t, r, o, 1);
    const a = n.getOffsetNanosecondsFor(t);
    return formatIsoDateTimeFields(epochNanoToIso(t, a), i) + (e ? formatOffsetNano(roundToMinute(a)) : "Z");
  })(c, n(c ? e(r) : En), t.epochNanoseconds, i, a, s);
}

function formatZonedDateTimeIso(e, n, t) {
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundBigNanoByInc(o, c, s, 1);
    const l = e(t).getOffsetNanosecondsFor(o);
    return formatIsoDateTimeFields(epochNanoToIso(o, l), u) + formatOffsetNano(roundToMinute(l), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + getId(e) + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, ...(e => {
    e = normalizeOptions(e);
    const n = dn(e), t = refineSubsecDigits(e), o = pn(e), r = hn(e, 4), i = an(e, 4);
    return [ n, mn(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t));
}

function formatPlainDateTimeIso(e, n) {
  return ((e, n, t, o, r, i) => formatIsoDateTimeFields(roundDateTimeToNano(n, r, o), i) + formatCalendar(e, t))(e.calendar, e, ...(e => (e = normalizeOptions(e), 
  [ dn(e), ...refineTimeDisplayTuple(e) ]))(n));
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
    const {sign: t} = e, o = -1 === t ? negateDurationFields(e) : e, {hours: r, minutes: i} = o, [a, s] = divModBigNano(givenFieldsToBigNano(o, 3, pe), A, divModTrunc);
    checkDurationTimeUnit(a);
    const c = formatSubsecNano(s, n), u = n >= 0 || !t || c;
    return (t < 0 ? "-" : "") + "P" + formatDurationFragments({
      Y: formatDurationNumber(o.years),
      M: formatDurationNumber(o.months),
      W: formatDurationNumber(o.weeks),
      D: formatDurationNumber(o.days)
    }) + (r || i || a || u ? "T" + formatDurationFragments({
      H: formatDurationNumber(r),
      M: formatDurationNumber(i),
      S: formatDurationNumber(a, u) + c
    }) : "");
  })(e, r);
}

function formatDateLikeIso(e, n, t, o) {
  const r = getId(e), i = o > 1 || 0 === o && r !== ce;
  return 1 === o ? r === ce ? n(t) : formatIsoDateFields(t) : i ? formatIsoDateFields(t) + formatCalendarId(r, 2 === o) : n(t);
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
  return formatIsoYearMonthFields(e) + "-" + k(e.isoDay);
}

function formatIsoYearMonthFields(e) {
  const {isoYear: n} = e;
  return (n < 0 || n > 9999 ? getSignStr(n) + padNumber(6, Math.abs(n)) : padNumber(4, n)) + "-" + k(e.isoMonth);
}

function formatIsoMonthDayFields(e) {
  return k(e.isoMonth) + "-" + k(e.isoDay);
}

function formatIsoTimeFields(e, n) {
  const t = [ k(e.isoHour), k(e.isoMinute) ];
  return -1 !== n && t.push(k(e.isoSecond) + ((e, n, t, o) => formatSubsecNano(e * q + n * z + t, o))(e.isoMillisecond, e.isoMicrosecond, e.isoNanosecond, n)), 
  t.join(":");
}

function formatOffsetNano(e, n = 0) {
  if (1 === n) {
    return "";
  }
  const [t, o] = divModFloor(Math.abs(e), U), [r, i] = divModFloor(o, L), [a, s] = divModFloor(i, A);
  return getSignStr(e) + k(t) + ":" + k(r) + (a || s ? ":" + k(a) + formatSubsecNano(s) : "");
}

function formatCalendar(e, n) {
  if (1 !== n) {
    const t = getId(e);
    if (n > 1 || 0 === n && t !== ce) {
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
  return t = void 0 === n ? t.replace(On, "") : t.slice(0, n), t ? "." + t : "";
}

function getSignStr(e) {
  return e < 0 ? "-" : "+";
}

function formatDurationNumber(e, n) {
  return e || n ? e.toLocaleString("fullwide", {
    useGrouping: 0
  }) : "";
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
  const t = wn(n, e);
  return {
    calendar: n.calendar,
    ...pluckProps(Fe, t),
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
        let e = bigNanoToNumber(diffBigNanos(n, r));
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
    throw new RangeError(M);
  }
  if (o.length) {
    return o[3 === t ? 1 : 0];
  }
  const r = isoToEpochNano(n), i = ((e, n) => {
    const t = e.getOffsetNanosecondsFor(addBigNanoAndNumber(n, -W));
    return validateTimeZoneGap(e.getOffsetNanosecondsFor(addBigNanoAndNumber(n, W)) - t);
  })(e, r), a = i * (2 === t ? -1 : 1);
  return (o = e.getPossibleInstantsFor(epochNanoToIso(r, a)))[2 === t ? 0 : o.length - 1];
}

function computeStartOfDay(e, n) {
  let {epochNanoseconds: t, timeZone: o, calendar: r} = n;
  const i = e(o);
  return t = getMatchingInstantFor(i, {
    ...wn(n, i),
    ...be
  }, void 0, 0, 0, 1), createZonedDateTimeSlots(t, o, r);
}

function computeHoursInDay(e, n) {
  const t = e(n.timeZone);
  return computeTimeInDay(t, wn(n, t), U);
}

function computeTimeInDay(e, n, t) {
  n = {
    ...n,
    ...be
  };
  const o = bigNanoToNumber(diffBigNanos(getSingleInstantFor(e, {
    ...n,
    ...be
  }), getSingleInstantFor(e, {
    ...moveByIsoDays(n, 1),
    ...be
  })), t, 1);
  if (o <= 0) {
    throw new RangeError(m);
  }
  return o;
}

function validateTimeZoneOffset(e) {
  if (Math.abs(e) >= W) {
    throw new RangeError(g);
  }
  return e;
}

function validateTimeZoneGap(e) {
  if (e > W) {
    throw new RangeError(D);
  }
  return e;
}

function moveInstant(e, n, t) {
  return createInstantSlots(checkEpochNanoInBounds(addBigNanos(n.epochNanoseconds, (e => {
    if (durationHasDateParts(e)) {
      throw new RangeError(E);
    }
    return durationFieldsToBigNano(e, 5);
  })(e ? negateDurationFields(t) : t))));
}

function moveZonedDateTime(e, n, t, o, r, i = Object.create(null)) {
  const a = n(o.timeZone), s = moveZonedEpochSlots(e(o.calendar), a, o, t ? negateDurationFields(r) : r, i);
  return {
    ...o,
    epochNanoseconds: s
  };
}

function movePlainDateTime(e, n, t, o, r = Object.create(null)) {
  const {calendar: i} = t;
  return createPlainDateTimeSlots(moveDateTime(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function movePlainDate(e, n, t, o, r) {
  const {calendar: i} = t;
  return createPlainDateSlots(moveDateEfficient(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function movePlainYearMonth(e, n, t, o, r = Object.create(null)) {
  const i = t.calendar, a = e(i);
  let s = moveToMonthStart(a, t);
  n && (o = negateDuration(o)), o.sign < 0 && (s = a.dateAdd(s, {
    ...Me,
    months: 1
  }), s = moveByIsoDays(s, -1));
  const c = a.dateAdd(s, o, r);
  return createPlainYearMonthSlots(moveToMonthStart(a, c), i);
}

function movePlainTime(e, n, t) {
  return createPlainTimeSlots(moveTime(n, e ? negateDurationFields(t) : t)[0]);
}

function moveRelativeMarker(e, n, t, o) {
  return o ? {
    epochNanoseconds: moveZonedEpochSlots(t, o, n, e)
  } : moveDateTime(t, n, e);
}

function moveZonedEpochSlots(e, n, t, o, r) {
  const i = durationFieldsToBigNano(o, 5);
  let a = t.epochNanoseconds;
  if (durationHasDateParts(o)) {
    const s = wn(t, n);
    a = addBigNanos(getSingleInstantFor(n, {
      ...moveDateEfficient(e, s, {
        ...o,
        ...Ne
      }, r),
      ...pluckProps(ye, s),
      calendar: ce
    }), i);
  } else {
    a = addBigNanos(a, i), refineOverflowOptions(r);
  }
  return checkEpochNanoInBounds(a);
}

function moveDateTime(e, n, t, o) {
  const [r, i] = moveTime(n, t);
  return checkIsoDateTimeInBounds({
    ...moveDateEfficient(e, n, {
      ...t,
      ...Ne,
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
  const r = t.days + givenFieldsToBigNano(t, 5, pe)[0];
  return r ? checkIsoDateInBounds(moveByIsoDays(n, r)) : n;
}

function moveToMonthStart(e, n) {
  return moveByIsoDays(n, 1 - e.day(n));
}

function moveTime(e, n) {
  const [t, o] = givenFieldsToBigNano(n, 5, pe), [r, i] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) + o);
  return [ r, t + i ];
}

function moveByIsoDays(e, n) {
  return n && (e = epochMilliToIso(isoToEpochMilli(e) + n * R)), e;
}

function spanDuration(e, n, t, o, r, i) {
  let a = moveRelativeMarker(e, o, r, i);
  n && (a = moveRelativeMarker(n, a, r, i));
  const s = ((e, n, t, o, r) => r ? ((e, n, t, o, r) => {
    const i = compareBigNanos(o.epochNanoseconds, t.epochNanoseconds);
    return i ? r < 6 ? diffEpochNanoExact(t.epochNanoseconds, o.epochNanoseconds, r) : diffZonedEpochNanoViaCalendar(e, n, i, t, o, r, void 0) : Me;
  })(o, r, n, t, e) : ((e, n, t, o) => {
    const r = isoToEpochNano(n), i = isoToEpochNano(t), a = compareBigNanos(i, r);
    return a ? o <= 6 ? diffEpochNanoExact(r, i, o) : diffDateTimesViaCalendar(e, a, n, t, o, void 0) : Me;
  })(o, n, t, e))(t, o, a, r, i);
  return [ s, relativeMarkerToEpochNano(a, i) ];
}

function addDurations(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getLargestDurationUnit(r), getLargestDurationUnit(i));
  if (c < 6 || 6 === c && (!s || !s.epochNanoseconds)) {
    return createDurationSlots(checkDurationUnits(((e, n, t, o) => {
      const r = addBigNanos(durationFieldsToBigNano(e), durationFieldsToBigNano(n), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(N);
      }
      return {
        ...Me,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o)));
  }
  if (!s) {
    throw new RangeError(P);
  }
  return o && (i = negateDurationFields(i)), createDurationSlots(spanDuration(r, i, c, ...createRelativeSystem(n, t, s))[0]);
}

function roundDuration(e, n, t, o, r) {
  const i = getLargestDurationUnit(o), [a, s, c, u, l] = ((e, n, t) => {
    e = normalizeUnitNameOptions(e, He);
    let o = sn(e);
    const r = t(e[Je]);
    let i = parseRoundingIncInteger(e);
    const a = hn(e, 7);
    let s = an(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(S);
    }
    return null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), [ o, s, i, a, r ];
  })(r, i, e), f = Math.max(i, a);
  if (f < 6 || 6 === f && (!l || !l.epochNanoseconds)) {
    return createDurationSlots(checkDurationUnits(((e, n, t, o, r) => ({
      ...Me,
      ...balanceDayTimeDuration(e, n, t, o, r)
    }))(o, a, s, c, u)));
  }
  if (!l) {
    throw new RangeError(P);
  }
  const d = createRelativeSystem(n, t, l);
  let p = 0;
  o.weeks && 7 === s && (p = o.weeks, o = {
    ...o,
    weeks: 0
  });
  let [h, T] = spanDuration(o, void 0, a, ...d);
  const g = o.sign, D = computeDurationSign(h);
  if (g && D && g !== D) {
    throw new RangeError(m);
  }
  return !D || 0 === s && 1 === c || (h = roundRelativeDuration(h, T, a, s, c, u, ...d)), 
  h.weeks += p, createDurationSlots(h);
}

function absDuration(e) {
  return -1 === e.sign ? negateDuration(e) : e;
}

function negateDuration(e) {
  return createDurationSlots(negateDurationFields(e));
}

function negateDurationFields(e) {
  const n = {};
  for (const t of pe) {
    n[t] = -1 * e[t] || 0;
  }
  return n;
}

function getDurationBlank(e) {
  return !e.sign;
}

function computeDurationSign(e, n = pe) {
  let t = 0;
  for (const o of n) {
    const n = Math.sign(e[o]);
    if (n) {
      if (t && t !== n) {
        throw new RangeError(v);
      }
      t = n;
    }
  }
  return t;
}

function checkDurationUnits(e) {
  for (const n of De) {
    clampEntity(n, e[n], -Bn, Bn, 1);
  }
  return checkDurationTimeUnit(bigNanoToNumber(durationFieldsToBigNano(e), A)), e;
}

function checkDurationTimeUnit(e) {
  if (!Number.isSafeInteger(e)) {
    throw new RangeError(y);
  }
}

function durationFieldsToBigNano(e, n = 6) {
  return givenFieldsToBigNano(e, n, pe);
}

function nanoToDurationDayTimeFields(e, n = 6) {
  const [t, o] = e, r = nanoToGivenFields(o, n, pe);
  if (r[pe[n]] += t * (W / j[n]), !Number.isFinite(r[pe[n]])) {
    throw new RangeError(N);
  }
  return r;
}

function nanoToDurationTimeFields(e, n = 5) {
  return nanoToGivenFields(e, n, pe);
}

function clearDurationFields(e, n) {
  const t = {
    ...e
  };
  for (let e = 0; e <= n; e++) {
    t[pe[e]] = 0;
  }
  return t;
}

function durationHasDateParts(e) {
  return Boolean(computeDurationSign(e, ge));
}

function getLargestDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[pe[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / Sn) * Sn;
  return [ n, n + Sn ];
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

function parseRelativeToSlots(e) {
  const n = parseDateTimeLike(We(e));
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
  const t = parseDateTimeLike(We(e));
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
  const n = parseDateTimeLike(We(e));
  if (!n || n.o) {
    throw new RangeError(failedParse(e));
  }
  return createPlainDateTimeSlots(finalizeDateTime(n));
}

function parsePlainDate(e) {
  const n = parseDateTimeLike(We(e));
  if (!n || n.o) {
    throw new RangeError(failedParse(e));
  }
  return createPlainDateSlots(n.i ? finalizeDateTime(n) : finalizeDate(n));
}

function parsePlainYearMonth(e, n) {
  const t = parseYearMonthOnly(We(n));
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
  if (e.calendar !== ce) {
    throw new RangeError(invalidSubstring(e.calendar));
  }
}

function parsePlainMonthDay(e, n) {
  const t = parseMonthDayOnly(We(n));
  if (t) {
    return requireIsoCalendar(t), createPlainMonthDaySlots(checkIsoDateFields(t));
  }
  const o = parsePlainDate(n), {calendar: r} = o, i = e(r), [a, s, c] = i.u(o), [u, l] = i.l(a, s), [f, d] = i.m(u, l, c);
  return createPlainMonthDaySlots(i.p(f, d, c), r);
}

function parsePlainTime(e) {
  let n, t = (e => {
    const n = $n.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(We(e));
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
    const n = Gn.exec(e);
    return n ? (e => {
      function parseUnit(e, r, i) {
        let a = 0, s = 0;
        if (i && ([a, o] = divModFloor(o, j[i])), void 0 !== e) {
          if (t) {
            throw new RangeError(invalidSubstring(e));
          }
          s = (e => {
            const n = parseInt(e);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(e));
            }
            return n;
          })(e), n = 1, r && (o = parseSubsecNano(r) * (j[i] / A), t = 1);
        }
        return a + s;
      }
      let n = 0, t = 0, o = 0, r = {
        ...zipProps(pe, [ parseUnit(e[2]), parseUnit(e[3]), parseUnit(e[4]), parseUnit(e[5]), parseUnit(e[6], e[7], 5), parseUnit(e[8], e[9], 4), parseUnit(e[10], e[11], 3) ]),
        ...nanoToGivenFields(o, 2, pe)
      };
      if (!n) {
        throw new RangeError(noValidFields(pe));
      }
      return parseSign(e[1]) < 0 && (r = negateDurationFields(r)), r;
    })(n) : void 0;
  })(We(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  return createDurationSlots(checkDurationUnits(n));
}

function parseCalendarId(e) {
  const n = parseDateTimeLike(e) || parseYearMonthOnly(e) || parseMonthDayOnly(e);
  return n ? n.calendar : e;
}

function parseTimeZoneId(e) {
  const n = parseDateTimeLike(e);
  return n && (n.timeZone || n.o && En || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = resolveTimeZoneId(e.timeZone), i = kn(r);
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
  const n = jn.exec(e);
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
  const n = Un.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = Wn.exec(e);
  return n ? (e => ({
    isoYear: qe,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = xn.exec(e);
  return t ? ((e, n) => {
    const t = e[4] || e[5];
    if (n && t) {
      throw new RangeError(invalidSubstring(t));
    }
    return validateTimeZoneOffset((parseInt0(e[2]) * U + parseInt0(e[3]) * L + parseInt0(e[4]) * A + parseSubsecNano(e[5] || "")) * parseSign(e[1]));
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
  if (e.replace(Hn, ((e, r, i) => {
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
    calendar: o[0] || ce
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
  return "number" == typeof n ? formatOffsetNano(n) : n ? (e => {
    if (_n.test(e)) {
      throw new RangeError(T);
    }
    return e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e)))).join("/");
  })(e) : En;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : En;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== En ? Vn(e) : void 0;
}

function compareInstants(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function compareZonedDateTimes(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function compareDurations(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getLargestDurationUnit(o), getLargestDurationUnit(r));
  if (allPropsEqual(pe, o, r)) {
    return 0;
  }
  if (s < 6 || 6 === s && (!a || !a.epochNanoseconds)) {
    return compareBigNanos(givenFieldsToBigNano(o, 6, pe), givenFieldsToBigNano(r, 6, pe));
  }
  if (!a) {
    throw new RangeError(P);
  }
  const [c, u, l] = createRelativeSystem(n, t, a);
  return compareBigNanos(relativeMarkerToEpochNano(moveRelativeMarker(o, c, u, l), l), relativeMarkerToEpochNano(moveRelativeMarker(r, c, u, l), l));
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
  const a = getCommonCalendarSlot(o.calendar, r.calendar), s = copyOptions(i), [c, u, l, f] = refineDiffOptions(t, s, 5), d = o.epochNanoseconds, m = r.epochNanoseconds, p = compareBigNanos(m, d);
  let T;
  if (p) {
    if (c < 6) {
      T = diffEpochNano(d, m, c, u, l, f);
    } else {
      const t = n(((e, n) => {
        if (!isTimeZoneSlotsEqual(e, n)) {
          throw new RangeError(h);
        }
        return e;
      })(o.timeZone, r.timeZone)), i = e(a);
      T = diffZonedEpochNanoViaCalendar(i, t, p, o, r, c, s), !p || 0 === u && 1 === l || (T = roundRelativeDuration(T, m, c, u, l, f, o, i, t));
    }
  } else {
    T = Me;
  }
  return createDurationSlots(t ? negateDurationFields(T) : T);
}

function diffPlainDateTimes(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = copyOptions(r), [s, c, u, l] = refineDiffOptions(n, a, 6), f = isoToEpochNano(t), d = isoToEpochNano(o), m = compareBigNanos(d, f);
  let p;
  if (m) {
    if (s <= 6) {
      p = diffEpochNano(f, d, s, c, u, l);
    } else {
      const n = e(i);
      p = diffDateTimesViaCalendar(n, m, t, o, s, a), !m || 0 === c && 1 === u || (p = roundRelativeDuration(p, d, s, c, u, l, t, n));
    }
  } else {
    p = Me;
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
  if (compareBigNanos(l, u)) {
    let e;
    6 === r ? f = diffByDay(t, o) : (e = n(), f = e.dateUntil(t, o, r, c)), 6 === i && 1 === a || (e || (e = n()), 
    f = roundRelativeDuration(f, l, r, i, a, s, {
      ...t,
      ...be
    }, e));
  } else {
    f = Me;
  }
  return createDurationSlots(e ? negateDurationFields(f) : f);
}

function diffPlainTimes(e, n, t, o) {
  const r = copyOptions(o), [i, a, s, c] = refineDiffOptions(e, r, 5, 5), u = isoTimeFieldsToNano(n), l = roundByInc(isoTimeFieldsToNano(t) - u, computeNanoInc(a, s), c), f = {
    ...Me,
    ...nanoToDurationTimeFields(l, i)
  };
  return createDurationSlots(e ? negateDurationFields(f) : f);
}

function diffZonedEpochNanoViaCalendar(e, n, t, o, r, i, a) {
  const s = wn(o, n), c = pluckProps(ye, s), u = wn(r, n), l = r.epochNanoseconds, f = bindArgs(getSingleInstantFor, n);
  let d, p, h, T = 0;
  do {
    if (T > 2) {
      throw new RangeError(m);
    }
    d = {
      ...moveByIsoDays(u, T++ * -t),
      ...c
    }, p = f(d), h = compareBigNanos(l, p);
  } while (h === -t);
  return {
    ...6 === i ? diffByDay(s, d) : e.dateUntil(s, d, i, a),
    ...nanoToDurationTimeFields(bigNanoToNumber(diffBigNanos(p, l)))
  };
}

function diffDateTimesViaCalendar(e, n, t, o, r, i) {
  const a = isoTimeFieldsToNano(t);
  let s = isoTimeFieldsToNano(o) - a, c = t;
  return Math.sign(s) === -n && (c = moveByIsoDays(t, n), s += W * n), {
    ...e.dateUntil({
      ...c,
      ...be
    }, {
      ...o,
      ...be
    }, r, i),
    ...nanoToDurationTimeFields(s)
  };
}

function diffEpochNano(e, n, t, o, r, i) {
  return {
    ...Me,
    ...nanoToDurationDayTimeFields(roundBigNano(diffBigNanos(e, n), o, r, i), t)
  };
}

function diffEpochNanoExact(e, n, t) {
  return {
    ...Me,
    ...nanoToDurationDayTimeFields(diffBigNanos(e, n), t)
  };
}

function diffByDay(e, n) {
  return {
    ...Me,
    days: diffDays(e, n)
  };
}

function diffDays(e, n) {
  return diffEpochMilliByDay(isoToEpochMilli(e), isoToEpochMilli(n));
}

function diffEpochMilliByDay(e, n) {
  return Math.round((n - e) / R);
}

function getCommonCalendarSlot(e, n) {
  if (!isIdLikeEqual(e, n)) {
    throw new RangeError(p);
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
  const n = Kn(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    I: createIntlFieldCache(epochMilliToIntlFields),
    N: createIntlYearMonthCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return memoize((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearMonthCache(e) {
  const n = e(0).year - ze;
  return memoize((t => {
    let o, r = isoArgsToEpochMilli(t - n);
    const i = [], a = [];
    do {
      r += 400 * R;
    } while ((o = e(r)).year <= t);
    do {
      r += (1 - o.day) * R, o.year === t && (i.push(r), a.push(o.month)), r -= R;
    } while ((o = e(r)).year >= t);
    return {
      v: i.reverse(),
      P: w(a.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const a = fe[n];
    void 0 !== a && (i = (i = e.era).normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    t = de[i] || i, o = r, r = eraYearToYear(o, a[t] || 0));
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
  const {year: n, month: t, day: o} = this.I(e), {P: r} = this.N(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.N(e).v[n - 1] + (t - 1) * R;
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
  const {v: t} = this.N(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.N(e + 1).v), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.N(e).v.length;
}

function queryMonthStrs(e, n) {
  return Object.keys(e.N(n).P);
}

function resolveCalendarId(e) {
  if ((e = e.toLowerCase()) !== ce && e !== ue && computeCalendarIdBase(e) !== computeCalendarIdBase(Kn(e).resolvedOptions().calendar)) {
    throw new RangeError(invalidCalendar(e));
  }
  return e;
}

function computeCalendarIdBase(e) {
  return "islamicc" === e && (e = "islamic"), e.split("-")[0];
}

function computeNativeWeekOfYear(e) {
  return this.F(e)[0];
}

function computeNativeYearOfWeek(e) {
  return this.F(e)[1];
}

function parseMonthCode(e) {
  const n = Qn.exec(e);
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
  return fe[getCalendarIdBase(e)];
}

function getCalendarLeapMonthMeta(e) {
  return me[getCalendarIdBase(e)];
}

function getCalendarIdBase(e) {
  return computeCalendarIdBase(e.id || ce);
}

function refineMaybeZonedDateTimeBag(e, n, t, o) {
  const r = refineCalendarFields(t, o, re, [], _);
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
    ...be
  };
}

function refineZonedDateTimeBag(e, n, t, o, r, i) {
  const a = refineCalendarFields(t, r, re, G, _), s = e(a.timeZone), [c, u, l] = refineZonedFieldOptions(i), f = t.dateFromFields(a, overrideOverflowOptions(i, c)), d = refineTimeBag(a, c);
  return createZonedDateTimeSlots(getMatchingInstantFor(n(s), {
    ...f,
    ...d
  }, void 0 !== a.offset ? parseOffsetNano(a.offset) : void 0, u, l), s, o);
}

function refinePlainDateTimeBag(e, n, t) {
  const o = refineCalendarFields(e, n, re, [], $), r = refineOverflowOptions(t);
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds({
    ...e.dateFromFields(o, overrideOverflowOptions(t, r)),
    ...refineTimeBag(o, r)
  }));
}

function refinePlainDateBag(e, n, t, o = []) {
  const r = refineCalendarFields(e, n, re, o);
  return e.dateFromFields(r, t);
}

function refinePlainYearMonthBag(e, n, t, o) {
  const r = refineCalendarFields(e, n, te, o);
  return e.yearMonthFromFields(r, t);
}

function refinePlainMonthDayBag(e, n, t, o, r = []) {
  const i = refineCalendarFields(e, t, re, r);
  return n && void 0 !== i.month && void 0 === i.monthCode && void 0 === i.year && (i.year = qe), 
  e.monthDayFromFields(i, o);
}

function refinePlainTimeBag(e, n) {
  const t = refineOverflowOptions(n);
  return createPlainTimeSlots(refineTimeBag(refineFields(e, x, [], 1), t));
}

function refineDurationBag(e) {
  const n = refineFields(e, he);
  return createDurationSlots(checkDurationUnits({
    ...Me,
    ...n
  }));
}

function refineCalendarFields(e, n, t, o = [], r = []) {
  return refineFields(n, [ ...e.fields(t), ...r ].sort(), o);
}

function refineFields(e, n, t, o = !t) {
  const r = {};
  let i, a = 0;
  for (const o of n) {
    if (o === i) {
      throw new RangeError(duplicateFields(o));
    }
    if ("constructor" === o || "__proto__" === o) {
      throw new RangeError(forbiddenField(o));
    }
    let n = e[o];
    if (void 0 !== n) {
      a = 1, tt[o] && (n = tt[o](n, o)), r[o] = n;
    } else if (t) {
      if (t.includes(o)) {
        throw new TypeError(missingField(o));
      }
      r[o] = se[o];
    }
    i = o;
  }
  if (o && !a) {
    throw new TypeError(noValidFields(n));
  }
  return r;
}

function refineTimeBag(e, n) {
  return constrainIsoTimeFields(ot({
    ...se,
    ...e
  }), n);
}

function zonedDateTimeWithFields(e, n, t, o, r, i) {
  const a = copyOptions(i), {calendar: s, timeZone: c} = t;
  return createZonedDateTimeSlots(((e, n, t, o, r) => {
    const i = mergeCalendarFields(e, t, o, re, V, H), [a, s, c] = refineZonedFieldOptions(r, 2);
    return getMatchingInstantFor(n, {
      ...e.dateFromFields(i, overrideOverflowOptions(r, a)),
      ...refineTimeBag(i, a)
    }, parseOffsetNano(i.offset), s, c);
  })(e(s), n(c), o, r, a), c, s);
}

function plainDateTimeWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return createPlainDateTimeSlots(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, re, $), i = refineOverflowOptions(o);
    return checkIsoDateTimeInBounds({
      ...e.dateFromFields(r, overrideOverflowOptions(o, i)),
      ...refineTimeBag(r, i)
    });
  })(e(n.calendar), t, o, i));
}

function plainDateWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, re);
    return e.dateFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function plainYearMonthWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return createPlainYearMonthSlots(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, te);
    return e.yearMonthFromFields(r, o);
  })(e(n.calendar), t, o, i));
}

function plainMonthDayWithFields(e, n, t, o, r) {
  const i = copyOptions(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, re);
    return e.monthDayFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function plainTimeWithFields(e, n, t) {
  return createPlainTimeSlots(((e, n, t) => {
    const o = refineOverflowOptions(t);
    return refineTimeBag({
      ...pluckProps(x, e),
      ...refineFields(n, x)
    }, o);
  })(e, n, t));
}

function durationWithFields(e, n) {
  return createDurationSlots((t = e, o = n, checkDurationUnits({
    ...t,
    ...refineFields(o, he)
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
  const t = refineCalendarFields(e, n, ae);
  return e.monthDayFromFields(t);
}

function convertToPlainYearMonth(e, n, t) {
  const o = refineCalendarFields(e, n, oe);
  return e.yearMonthFromFields(o, t);
}

function convertToIso(e, n, t, o, r) {
  n = pluckProps(t = e.fields(t), n), o = refineFields(o, r = e.fields(r), []);
  let i = e.mergeFields(n, o);
  return i = refineFields(i, [ ...t, ...r ].sort(), []), e.dateFromFields(i);
}

function refineYear(e, n) {
  let {era: t, eraYear: o, year: r} = n;
  const c = getCalendarEraOrigins(e);
  if (void 0 !== t || void 0 !== o) {
    if (void 0 === t || void 0 === o) {
      throw new TypeError(a);
    }
    if (!c) {
      throw new RangeError(i);
    }
    const e = c[t];
    if (void 0 === e) {
      throw new RangeError(invalidEra(t));
    }
    const n = eraYearToYear(o, e);
    if (void 0 !== r && r !== n) {
      throw new RangeError(s);
    }
    r = n;
  } else if (void 0 === r) {
    throw new TypeError(missingYear(c));
  }
  return r;
}

function refineMonth(e, n, t, o) {
  let {month: r, monthCode: i} = n;
  if (void 0 !== i) {
    const n = ((e, n, t, o) => {
      const r = e.O(t), [i, a] = parseMonthCode(n);
      let s = monthCodeNumberToMonth(i, a, r);
      if (a) {
        const n = getCalendarLeapMonthMeta(e);
        if (void 0 === n) {
          throw new RangeError(f);
        }
        if (n > 0) {
          if (s > n) {
            throw new RangeError(f);
          }
          if (void 0 === r) {
            if (1 === o) {
              throw new RangeError(f);
            }
            s--;
          }
        } else {
          if (s !== -n) {
            throw new RangeError(f);
          }
          if (void 0 === r && 1 === o) {
            throw new RangeError(f);
          }
        }
      }
      return s;
    })(e, i, t, o);
    if (void 0 !== r && r !== n) {
      throw new RangeError(c);
    }
    r = n, o = 1;
  } else if (void 0 === r) {
    throw new TypeError(u);
  }
  return clampEntity("month", r, 1, e.B(t), o);
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

function constructInstantSlots(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function constructZonedDateTimeSlots(e, n, t, o, r = ce) {
  return createZonedDateTimeSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(t))), n(o), e(r));
}

function constructPlainDateTimeSlots(e, n, t, o, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0, l = ce) {
  return createPlainDateTimeSlots(checkIsoDateTimeInBounds(checkIsoDateTimeFields(mapProps(toInteger, zipProps(Pe, [ n, t, o, r, i, a, s, c, u ])))), e(l));
}

function constructPlainDateSlots(e, n, t, o, r = ce) {
  return createPlainDateSlots(checkIsoDateInBounds(checkIsoDateFields(mapProps(toInteger, {
    isoYear: n,
    isoMonth: t,
    isoDay: o
  }))), e(r));
}

function constructPlainYearMonthSlots(e, n, t, o = ce, r = 1) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: i,
    isoMonth: a,
    isoDay: toInteger(r)
  })), s);
}

function constructPlainMonthDaySlots(e, n, t, o = ce, r = qe) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(r),
    isoMonth: i,
    isoDay: a
  })), s);
}

function constructPlainTimeSlots(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0) {
  return createPlainTimeSlots(constrainIsoTimeFields(mapProps(toInteger, zipProps(ye, [ e, n, t, o, r, i ])), 1));
}

function constructDurationSlots(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0) {
  return createDurationSlots(checkDurationUnits(mapProps(toStrictInteger, zipProps(pe, [ e, n, t, o, r, i, a, s, c, u ]))));
}

function instantToZonedDateTime(e, n, t = ce) {
  return createZonedDateTimeSlots(e.epochNanoseconds, n, t);
}

function zonedDateTimeToInstant(e) {
  return createInstantSlots(e.epochNanoseconds);
}

function zonedDateTimeToPlainDateTime(e, n) {
  return createPlainDateTimeSlots(wn(n, e));
}

function zonedDateTimeToPlainDate(e, n) {
  return createPlainDateSlots(wn(n, e));
}

function zonedDateTimeToPlainYearMonth(e, n, t) {
  return convertToPlainYearMonth(e(n.calendar), t);
}

function zonedDateTimeToPlainMonthDay(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function zonedDateTimeToPlainTime(e, n) {
  return createPlainTimeSlots(wn(n, e));
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
  const i = e(r.timeZone), a = r.plainTime, s = void 0 !== a ? n(a) : be;
  return createZonedDateTimeSlots(getSingleInstantFor(t(i), {
    ...o,
    ...s
  }), i, o.calendar);
}

function plainDateToPlainDateTime(e, n = be) {
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
  return ((e, n, t) => convertToIso(e, n, oe, requireObjectLike(t), ne))(e(n.calendar), t, o);
}

function plainMonthDayToPlainDate(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, ae, requireObjectLike(t), Q))(e(n.calendar), t, o);
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
  return createInstantSlots(checkEpochNanoInBounds(numberToBigNano(e, A)));
}

function epochMilliToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(numberToBigNano(e, q)));
}

function epochMicroToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e), z)));
}

function epochNanoToInstant(e) {
  return createInstantSlots(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function zonedDateTimeWithPlainTime(e, n, t = be) {
  const o = n.timeZone, r = e(o), i = {
    ...wn(n, r),
    ...t
  };
  return createZonedDateTimeSlots(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, n.calendar);
}

function zonedDateTimeWithPlainDate(e, n, t) {
  const o = n.timeZone, r = e(o), i = {
    ...wn(n, r),
    ...t
  }, a = getPreferredCalendarSlot(n.calendar, t.calendar);
  return createZonedDateTimeSlots(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, a);
}

function plainDateTimeWithPlainTime(e, n = be) {
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
  if (t === o || t === ce) {
    return n;
  }
  if (o === ce) {
    return e;
  }
  throw new RangeError(p);
}

function createNativeOpsCreator(e, n) {
  return t => t === ce ? e : t === ue || t === le ? Object.assign(Object.create(e), {
    id: t
  }) : Object.assign(Object.create(n), Jn(t));
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
  return getSingleInstantFor(kn(n.timeZone), {
    ...be,
    isoHour: 12,
    ...e
  });
}

function extractEpochNano(e) {
  return e.epochNanoseconds;
}

function createFormatPrepper(e, n = createFormatForPrep) {
  const [t, , , o] = e;
  return (r, i = Rt, ...a) => {
    const s = n(o ? o(...a) : void 0, r, i, t), c = s.resolvedOptions();
    return [ s, ...toEpochMillis(e, c, ...a) ];
  };
}

function createFormatForPrep(e, n, t, o) {
  if (t = o(t), e) {
    if (void 0 !== t.timeZone) {
      throw new TypeError(O);
    }
    t.timeZone = e;
  }
  return new Oe(n, t);
}

function toEpochMillis(e, n, ...t) {
  const [, o, r] = e;
  return t.map((e => (e.calendar && ((e, n, t) => {
    if ((t || e !== ce) && e !== n) {
      throw new RangeError(p);
    }
  })(getId(e.calendar), n.calendar, r), epochNanoToMilli(o(e, n)))));
}

function getCurrentIsoDateTime(e) {
  const n = getCurrentEpochNano();
  return epochNanoToIso(n, e.getOffsetNanosecondsFor(n));
}

function getCurrentEpochNano() {
  return numberToBigNano(Date.now(), q);
}

function getCurrentTimeZoneId() {
  return Zt || (Zt = (new Oe).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, e = "Cannot convert Symbol to string", n = "Invalid object", numberOutOfRange = (e, n, t, o, r) => r ? numberOutOfRange(e, r[n], r[t], r[o]) : invalidEntity(e, n) + `; must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, forbiddenField = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, noValidFields = e => "No valid fields: " + e.join(), t = "Invalid bag", invalidChoice = (e, n, t) => invalidEntity(e, n) + "; must be " + Object.keys(t).join(), o = "Cannot use valueOf", r = "Invalid calling context", i = "Forbidden era/eraYear", a = "Mismatching era/eraYear", s = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, c = "Mismatching month/monthCode", u = "Missing month/monthCode", l = "Cannot guess year", f = "Invalid leap month", d = "Invalid protocol", m = "Invalid protocol results", p = "Mismatching Calendars", invalidCalendar = e => `Invalid Calendar: ${e}`, h = "Mismatching TimeZones", T = "Forbidden ICU TimeZone", g = "Out-of-bounds offset", D = "Out-of-bounds TimeZone gap", I = "Invalid TimeZone offset", M = "Ambiguous offset", N = "Out-of-bounds date", y = "Out-of-bounds duration", v = "Cannot mix duration signs", P = "Missing relativeTo", E = "Cannot use large units", S = "Required smallestUnit or largestUnit", F = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, invalidFormatType = e => `Cannot format ${e}`, b = "Mismatching types for formatting", O = "Cannot specify TimeZone", w = /*@__PURE__*/ bindArgs(mapPropNames, ((e, n) => n)), B = /*@__PURE__*/ bindArgs(mapPropNames, ((e, n, t) => t)), k = /*@__PURE__*/ bindArgs(padNumber, 2), Y = {
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
}, C = /*@__PURE__*/ Object.keys(Y), R = 864e5, Z = 1e3, z = 1e3, q = 1e6, A = 1e9, L = 6e10, U = 36e11, W = 864e11, j = [ 1, z, q, A, L, U, W ], $ = /*@__PURE__*/ C.slice(0, 6), x = /*@__PURE__*/ sortStrings($), H = [ "offset" ], G = [ "timeZone" ], V = /*@__PURE__*/ $.concat(H), _ = /*@__PURE__*/ V.concat(G), J = [ "era", "eraYear" ], K = /*@__PURE__*/ J.concat([ "year" ]), Q = [ "year" ], X = [ "monthCode" ], ee = /*@__PURE__*/ [ "month" ].concat(X), ne = [ "day" ], te = /*@__PURE__*/ ee.concat(Q), oe = /*@__PURE__*/ X.concat(Q), re = /*@__PURE__*/ ne.concat(te), ie = /*@__PURE__*/ ne.concat(ee), ae = /*@__PURE__*/ ne.concat(X), se = /*@__PURE__*/ B($, 0), ce = "iso8601", ue = "gregory", le = "japanese", fe = {
  [ue]: {
    bce: -1,
    ce: 0
  },
  [le]: {
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
}, de = {
  bc: "bce",
  ad: "ce"
}, me = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, pe = /*@__PURE__*/ C.map((e => e + "s")), he = /*@__PURE__*/ sortStrings(pe), Te = /*@__PURE__*/ pe.slice(0, 6), ge = /*@__PURE__*/ pe.slice(6), De = /*@__PURE__*/ ge.slice(1), Ie = /*@__PURE__*/ w(pe), Me = /*@__PURE__*/ B(pe, 0), Ne = /*@__PURE__*/ B(Te, 0), ye = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], ve = [ "isoDay", "isoMonth", "isoYear" ], Pe = /*@__PURE__*/ ye.concat(ve), Ee = /*@__PURE__*/ sortStrings(ve), Se = /*@__PURE__*/ sortStrings(ye), Fe = /*@__PURE__*/ sortStrings(Pe), be = /*@__PURE__*/ B(Se, 0), Oe = Intl.DateTimeFormat, we = "en-GB", Be = 1e8, ke = Be * R, Ye = [ Be, 0 ], Ce = [ -Be, 0 ], Re = 275760, Ze = -271821, ze = 1970, qe = 1972, Ae = 12, Le = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), Ue = /*@__PURE__*/ memoize(computeJapaneseEraParts, WeakMap), We = /*@__PURE__*/ bindArgs(requireType, "string"), je = /*@__PURE__*/ bindArgs(requireType, "boolean"), $e = /*@__PURE__*/ bindArgs(requireType, "number"), xe = /*@__PURE__*/ bindArgs(requireType, "function"), He = "smallestUnit", Ge = "unit", Ve = "roundingIncrement", _e = "fractionalSecondDigits", Je = "relativeTo", Ke = {
  constrain: 0,
  reject: 1
}, Qe = /*@__PURE__*/ Object.keys(Ke), Xe = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, en = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, nn = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, tn = {
  auto: 0,
  never: 1,
  critical: 2
}, on = {
  auto: 0,
  never: 1
}, rn = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, an = /*@__PURE__*/ bindArgs(refineUnitOption, He), sn = /*@__PURE__*/ bindArgs(refineUnitOption, "largestUnit"), cn = /*@__PURE__*/ bindArgs(refineUnitOption, Ge), un = /*@__PURE__*/ bindArgs(refineChoiceOption, "overflow", Ke), ln = /*@__PURE__*/ bindArgs(refineChoiceOption, "disambiguation", Xe), fn = /*@__PURE__*/ bindArgs(refineChoiceOption, "offset", en), dn = /*@__PURE__*/ bindArgs(refineChoiceOption, "calendarName", nn), mn = /*@__PURE__*/ bindArgs(refineChoiceOption, "timeZoneName", tn), pn = /*@__PURE__*/ bindArgs(refineChoiceOption, "offset", on), hn = /*@__PURE__*/ bindArgs(refineChoiceOption, "roundingMode", rn), Tn = "PlainYearMonth", gn = "PlainMonthDay", Dn = "PlainDate", In = "PlainDateTime", Mn = "PlainTime", Nn = "ZonedDateTime", yn = "Instant", vn = "Duration", Pn = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], En = "UTC", Sn = 5184e3, Fn = /*@__PURE__*/ isoArgsToEpochSec(1847), bn = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), On = /0+$/, wn = /*@__PURE__*/ memoize(_zonedEpochSlotsToIso, WeakMap), Bn = 2 ** 32 - 1, kn = /*@__PURE__*/ memoize((e => {
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
    this.R = (e => {
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
      const n = memoize(e), t = memoize(createSplitTuple);
      let o = Fn, r = bn;
      return {
        q(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        L: getOffsetSec,
        C(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = Sn * i, l = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
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
      const t = hashIntlFormatParts(e, n * Z);
      return isoArgsToEpochSec(parseIntlPartsYear(t), parseInt(t.month), parseInt(t.day), parseInt(t.hour), parseInt(t.minute), parseInt(t.second)) - n;
    })(e));
  }
  getOffsetNanosecondsFor(e) {
    return this.R.L(epochNanoToSec(e)) * A;
  }
  getPossibleInstantsFor(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.isoHour, o.isoMinute, o.isoSecond), o.isoMillisecond * q + o.isoMicrosecond * z + o.isoNanosecond ];
    var o;
    return this.R.q(n).map((e => checkEpochNanoInBounds(addBigNanoAndNumber(numberToBigNano(e, A), t))));
  }
  C(e, n) {
    const [t, o] = epochNanoToSecMod(e), r = this.R.C(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return numberToBigNano(r, A);
    }
  }
}

const Yn = "([+−-])", Cn = "(?:[.,](\\d{1,9}))?", Rn = `(?:(?:${Yn}(\\d{6}))|(\\d{4}))-?(\\d{2})`, Zn = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + Cn + ")?)?", zn = Yn + Zn, qn = Rn + "-?(\\d{2})(?:[T ]" + Zn + "(Z|" + zn + ")?)?", An = "\\[(!?)([^\\]]*)\\]", Ln = `((?:${An}){0,9})`, Un = /*@__PURE__*/ createRegExp(Rn + Ln), Wn = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + Ln), jn = /*@__PURE__*/ createRegExp(qn + Ln), $n = /*@__PURE__*/ createRegExp("T?" + Zn + "(?:" + zn + ")?" + Ln), xn = /*@__PURE__*/ createRegExp(zn), Hn = /*@__PURE__*/ new RegExp(An, "g"), Gn = /*@__PURE__*/ createRegExp(`${Yn}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${Cn}H)?(?:(\\d+)${Cn}M)?(?:(\\d+)${Cn}S)?)?`), Vn = /*@__PURE__*/ memoize((e => new Oe(we, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), _n = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, Jn = /*@__PURE__*/ memoize(createIntlCalendar), Kn = /*@__PURE__*/ memoize((e => new Oe(we, {
  calendar: e,
  timeZone: En,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), Qn = /^M(\d{2})(L?)$/, Xn = {
  era: toStringViaPrimitive,
  eraYear: toInteger,
  year: toInteger,
  month: toPositiveInteger,
  monthCode: toStringViaPrimitive,
  day: toPositiveInteger
}, et = /*@__PURE__*/ B($, toInteger), nt = /*@__PURE__*/ B(pe, toStrictInteger), tt = /*@__PURE__*/ Object.assign({}, Xn, et, nt, {
  offset: toStringViaPrimitive
}), ot = /*@__PURE__*/ bindArgs(remapProps, $, ye), rt = {
  dateAdd(e, n, t) {
    const o = refineOverflowOptions(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += givenFieldsToBigNano(n, 5, pe)[0], i || a) {
      let [n, t, s] = this.u(e);
      if (i) {
        const [e, r] = this.l(n, t);
        n += i, t = monthCodeNumberToMonth(e, r, this.O(n)), t = clampEntity("month", t, 1, this.B(n), o);
      }
      a && ([n, t] = this.U(n, t, a)), s = clampEntity("day", s, 1, this.k(n, t), o), 
      r = this.j(n, t, s);
    } else {
      if (!s && !c) {
        return e;
      }
      r = isoToEpochMilli(e);
    }
    return r += (7 * s + c) * R, checkIsoDateInBounds(epochMilliToIso(r));
  },
  dateUntil(e, n, t) {
    if (t <= 7) {
      let o = 0, r = diffDays(e, n);
      return 7 === t && ([o, r] = divModTrunc(r, 7)), {
        ...Me,
        weeks: o,
        days: r
      };
    }
    const o = this.u(e), r = this.u(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      let s = r - n, c = i - t, u = a - o;
      if (s || c) {
        const l = Math.sign(s || c);
        let f = e.k(r, i), d = 0;
        if (Math.sign(u) === -l) {
          const o = f;
          [r, i] = e.U(r, i, -l), s = r - n, c = i - t, f = e.k(r, i), d = l < 0 ? -o : f;
        }
        if (u = a - Math.min(o, f) + d, s) {
          const [o, a] = e.l(n, t), [u, f] = e.l(r, i);
          if (c = u - o || Number(f) - Number(a), Math.sign(c) === -l) {
            const t = l < 0 && -e.B(r);
            s = (r -= l) - n, c = i - monthCodeNumberToMonth(o, a, e.O(r)) + (t || e.B(r));
          }
        }
      }
      return [ s, c, u ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.$(i, o[0]), i = 0), {
      ...Me,
      years: i,
      months: a,
      days: s
    };
  },
  dateFromFields(e, n) {
    const t = refineOverflowOptions(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return createPlainDateSlots(checkIsoDateInBounds(this.p(o, r, i)), this.id || ce);
  },
  yearMonthFromFields(e, n) {
    const t = refineOverflowOptions(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.p(o, r, 1)), this.id || ce);
  },
  monthDayFromFields(e, n) {
    const t = refineOverflowOptions(n), o = !this.id, {monthCode: r, year: i, month: a} = e;
    let s, u, f, d, m;
    if (void 0 !== r) {
      [s, u] = parseMonthCode(r), m = getDefinedProp(e, "day");
      const n = this.m(s, u, m);
      if (!n) {
        throw new RangeError(l);
      }
      if ([f, d] = n, void 0 !== a && a !== d) {
        throw new RangeError(c);
      }
      o && (d = clampEntity("month", d, 1, Ae, 1), m = clampEntity("day", m, 1, computeIsoDaysInMonth(void 0 !== i ? i : f, d), t));
    } else {
      f = void 0 === i && o ? qe : refineYear(this, e), d = refineMonth(this, e, f, t), 
      m = refineDay(this, e, d, f, t);
      const n = this.O(f);
      u = d === n, s = monthToMonthCodeNumber(d, n);
      const r = this.m(s, u, m);
      if (!r) {
        throw new RangeError(l);
      }
      [f, d] = r;
    }
    return createPlainMonthDaySlots(this.p(f, d, m), this.id || ce);
  },
  fields(e) {
    return getCalendarEraOrigins(this) && e.includes("year") ? [ ...e, ...J ] : e;
  },
  mergeFields(e, n) {
    const t = Object.assign(Object.create(null), e);
    return spliceFields(t, n, ee), getCalendarEraOrigins(this) && (spliceFields(t, n, K), 
    this.id === le && spliceFields(t, n, ie, J)), t;
  },
  inLeapYear(e) {
    const [n] = this.u(e);
    return this.G(n);
  },
  monthsInYear(e) {
    const [n] = this.u(e);
    return this.B(n);
  },
  daysInMonth(e) {
    const [n, t] = this.u(e);
    return this.k(n, t);
  },
  daysInYear(e) {
    const [n] = this.u(e);
    return this.V(n);
  },
  era(e) {
    return this._(e)[0];
  },
  eraYear(e) {
    return this._(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.u(e), [o, r] = this.l(n, t);
    return ((e, n) => "M" + k(e) + (n ? "L" : ""))(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, it = {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  F(e) {
    function computeWeekShift(e) {
      return (7 - e < n ? 7 : 0) - e;
    }
    function computeWeeksInYear(e) {
      const n = computeIsoDaysInYear(u + e), t = e || 1;
      return (n + (computeWeekShift(modFloor(a + n * t, 7)) - s) * t) / 7;
    }
    const n = this.id ? 1 : 4, t = computeIsoDayOfWeek(e), o = computeIsoDayOfYear(e), r = modFloor(t - 1, 7), i = o - 1, a = modFloor(r - i, 7), s = computeWeekShift(a);
    let c = Math.floor((i - s) / 7) + 1, u = e.isoYear;
    return c ? c > computeWeeksInYear(0) && (c = 1, u++) : (c = computeWeeksInYear(-1), 
    u--), [ c, u ];
  }
}, at = {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  F() {
    return [];
  }
}, st = /*@__PURE__*/ createNativeOpsCreator(/*@__PURE__*/ Object.assign({}, rt, it, {
  u: e => [ e.isoYear, e.isoMonth, e.isoDay ],
  _(e) {
    return this.id === ue ? computeGregoryEraParts(e) : this.id === le ? Ue(e) : [];
  },
  l: (e, n) => [ n, 0 ],
  m(e, n) {
    if (!n) {
      return [ qe, e ];
    }
  },
  G: computeIsoInLeapYear,
  O() {},
  B: computeIsoMonthsInYear,
  $: e => e * Ae,
  k: computeIsoDaysInMonth,
  V: computeIsoDaysInYear,
  dayOfYear: computeIsoDayOfYear,
  p: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  j: isoArgsToEpochMilli,
  U: (e, n, t) => (e += divTrunc(t, Ae), (n += modTrunc(t, Ae)) < 1 ? (e--, n += Ae) : n > Ae && (e++, 
  n -= Ae), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), /*@__PURE__*/ Object.assign({}, rt, at, {
  u: computeIntlDateParts,
  _(e) {
    const n = this.I(e);
    return [ n.era, n.eraYear ];
  },
  l(e, n) {
    const t = computeIntlLeapMonth.call(this, e);
    return [ monthToMonthCodeNumber(n, t), t === n ];
  },
  m(e, n, t) {
    let [o, r, i] = computeIntlDateParts.call(this, {
      isoYear: qe,
      isoMonth: Ae,
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
  G(e) {
    const n = computeIntlDaysInYear.call(this, e);
    return n > computeIntlDaysInYear.call(this, e - 1) && n > computeIntlDaysInYear.call(this, e + 1);
  },
  O: computeIntlLeapMonth,
  B: computeIntlMonthsInYear,
  $(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  k: computeIntlDaysInMonth,
  V: computeIntlDaysInYear,
  dayOfYear(e) {
    const n = isoToEpochMilli({
      ...e,
      ...be
    }), {year: t} = this.I(e);
    return diffEpochMilliByDay(computeIntlEpochMilli.call(this, t), n) + 1;
  },
  p(e, n, t) {
    return checkIsoDateInBounds({
      ...epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t))
    });
  },
  j: computeIntlEpochMilli,
  U(e, n, t) {
    if (t) {
      if (n += t, !Number.isSafeInteger(n)) {
        throw new RangeError(N);
      }
      if (t < 0) {
        for (;n < 1; ) {
          n += computeIntlMonthsInYear.call(this, --e);
        }
      } else {
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
    const {year: n, month: t} = this.I(e), {P: o} = this.N(n);
    return o[t] + 1;
  },
  day(e) {
    return this.I(e).day;
  }
})), ct = "numeric", ut = [ "timeZoneName" ], lt = {
  month: ct,
  day: ct
}, ft = {
  year: ct,
  month: ct
}, dt = /*@__PURE__*/ Object.assign({}, ft, {
  day: ct
}), mt = {
  hour: ct,
  minute: ct,
  second: ct
}, pt = /*@__PURE__*/ Object.assign({}, dt, mt), ht = /*@__PURE__*/ Object.assign({}, pt, {
  timeZoneName: "short"
}), Tt = /*@__PURE__*/ Object.keys(lt), gt = /*@__PURE__*/ Object.keys(ft), Dt = /*@__PURE__*/ Object.keys(dt), It = /*@__PURE__*/ Object.keys(mt), Mt = /*@__PURE__*/ Dt.concat([ "weekday", "dateStyle" ]), Nt = /*@__PURE__*/ It.concat([ "dayPeriod", "timeStyle" ]), yt = /*@__PURE__*/ Mt.concat(Nt), vt = /*@__PURE__*/ yt.concat(ut), Pt = /*@__PURE__*/ ut.concat(Nt), Et = /*@__PURE__*/ ut.concat(Mt), St = /*@__PURE__*/ ut.concat([ "day", "weekday", "dateStyle" ], Nt), Ft = /*@__PURE__*/ createOptionsTransformer(Tt, lt, /*@__PURE__*/ ut.concat([ "year", "weekday", "dateStyle" ], Nt)), bt = [ /*@__PURE__*/ createOptionsTransformer(gt, ft, St), isoDateFieldsToEpochNano, 1 ], Ot = [ Ft, isoDateFieldsToEpochNano, 1 ], wt = [ /*@__PURE__*/ createOptionsTransformer(Mt, dt, Pt), isoDateFieldsToEpochNano ], Bt = [ /*@__PURE__*/ createOptionsTransformer(yt, pt, ut), isoDateFieldsToEpochNano ], kt = [ /*@__PURE__*/ createOptionsTransformer(Nt, mt, Et), (e, n) => getSingleInstantFor(kn(n.timeZone), {
  isoYear: ze,
  isoMonth: 1,
  isoDay: 1,
  ...e
}) ], Yt = [ /*@__PURE__*/ createOptionsTransformer(yt, pt), extractEpochNano ], Ct = [ /*@__PURE__*/ createOptionsTransformer(vt, ht), extractEpochNano, 0, (e, n) => {
  const t = getId(e.timeZone);
  if (n && getId(n.timeZone) !== t) {
    throw new RangeError(h);
  }
  return t;
} ], Rt = {};

let Zt;

export { vn as DurationBranding, yn as InstantBranding, Dn as PlainDateBranding, In as PlainDateTimeBranding, gn as PlainMonthDayBranding, Mn as PlainTimeBranding, Tn as PlainYearMonthBranding, Oe as RawDateTimeFormat, Nn as ZonedDateTimeBranding, absDuration, addDurations, bigNanoToNumber, bindArgs, buildZonedIsoFields, compareBigNanos, compareDurations, compareInstants, compareIsoDateFields, compareIsoDateTimeFields, compareIsoTimeFields, compareZonedDateTimes, computeHoursInDay, computeStartOfDay, constructDurationSlots, constructInstantSlots, constructPlainDateSlots, constructPlainDateTimeSlots, constructPlainMonthDaySlots, constructPlainTimeSlots, constructPlainYearMonthSlots, constructZonedDateTimeSlots, copyOptions, createDurationSlots, createFormatForPrep, createFormatPrepper, createGetterDescriptors, createInstantSlots, createNameDescriptors, st as createNativeStandardOps, createPlainDateSlots, createPlainDateTimeSlots, createPlainTimeSlots, createPropDescriptors, createStringTagDescriptors, createZonedDateTimeSlots, re as dateFieldNamesAlpha, diffBigNanos, diffInstants, diffPlainDateTimes, diffPlainDates, diffPlainTimes, diffPlainYearMonth, diffZonedDateTimes, pe as durationFieldNamesAsc, durationWithFields, epochMicroToInstant, epochMilliToInstant, epochNanoToInstant, epochNanoToIso, epochSecToInstant, excludePropsByName, excludeUndefinedProps, forbiddenField, o as forbiddenValueOf, formatDurationIso, formatInstantIso, formatOffsetNano, formatPlainDateIso, formatPlainDateTimeIso, formatPlainMonthDayIso, formatPlainTimeIso, formatPlainYearMonthIso, formatZonedDateTimeIso, getCurrentEpochNano, getCurrentIsoDateTime, getCurrentTimeZoneId, getDurationBlank, getEpochMicroseconds, getEpochMilliseconds, getEpochNanoseconds, getEpochSeconds, getId, getRequiredDateFields, getRequiredMonthDayFields, getRequiredYearMonthFields, getSingleInstantFor, hasAllPropsByName, Yt as instantConfig, instantToZonedDateTime, instantsEqual, t as invalidBag, r as invalidCallingContext, invalidFormatType, d as invalidProtocol, isObjectLike, isTimeZoneSlotsEqual, ce as isoCalendarId, be as isoTimeFieldDefaults, ye as isoTimeFieldNamesAsc, mapPropNames, mapProps, memoize, b as mismatchingFormatTypes, moveInstant, movePlainDate, movePlainDateTime, movePlainTime, movePlainYearMonth, moveZonedDateTime, q as nanoInMilli, negateDuration, numberToBigNano, parseCalendarId, parseDuration, parseInstant, parsePlainDate, parsePlainDateTime, parsePlainMonthDay, parsePlainTime, parsePlainYearMonth, parseRelativeToSlots, parseTimeZoneId, parseZonedDateTime, wt as plainDateConfig, Bt as plainDateTimeConfig, plainDateTimeToPlainMonthDay, plainDateTimeToPlainYearMonth, plainDateTimeToZonedDateTime, plainDateTimeWithFields, plainDateTimeWithPlainDate, plainDateTimeWithPlainTime, plainDateTimesEqual, plainDateToPlainDateTime, plainDateToPlainMonthDay, plainDateToPlainYearMonth, plainDateToZonedDateTime, plainDateWithFields, plainDatesEqual, Ot as plainMonthDayConfig, plainMonthDayToPlainDate, plainMonthDayWithFields, plainMonthDaysEqual, kt as plainTimeConfig, plainTimeToPlainDateTime, plainTimeToZonedDateTime, plainTimeWithFields, plainTimesEqual, bt as plainYearMonthConfig, plainYearMonthToPlainDate, plainYearMonthWithFields, plainYearMonthsEqual, pluckProps, kn as queryNativeTimeZone, refineCalendarDiffOptions, refineDurationBag, refineEpochDisambigOptions, refineMaybeZonedDateTimeBag, refineOverflowOptions, refinePlainDateBag, refinePlainDateTimeBag, refinePlainMonthDayBag, refinePlainTimeBag, refinePlainYearMonthBag, refineZonedDateTimeBag, refineZonedFieldOptions, je as requireBoolean, xe as requireFunction, requireInteger, requireIntegerOrUndefined, requireNonNullish, requireObjectLike, requirePositiveInteger, requirePositiveIntegerOrUndefined, We as requireString, requireStringOrUndefined, resolveCalendarId, resolveTimeZoneId, roundDuration, roundInstant, roundPlainDateTime, roundPlainTime, roundZonedDateTime, slotsWithCalendar, slotsWithTimeZone, $ as timeFieldNamesAsc, totalDuration, C as unitNamesAsc, validateTimeZoneGap, validateTimeZoneOffset, Ct as zonedDateTimeConfig, zonedDateTimeToInstant, zonedDateTimeToPlainDate, zonedDateTimeToPlainDateTime, zonedDateTimeToPlainMonthDay, zonedDateTimeToPlainTime, zonedDateTimeToPlainYearMonth, zonedDateTimeWithFields, zonedDateTimeWithPlainDate, zonedDateTimeWithPlainTime, zonedDateTimesEqual, wn as zonedEpochSlotsToIso };
