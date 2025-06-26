function clampProp(e, n, t, o, r) {
  return clampEntity(n, ((e, n) => {
    const t = e[n];
    if (void 0 === t) {
      throw new TypeError(missingField(n));
    }
    return t;
  })(e, n), t, o, r);
}

function clampEntity(e, n, t, o, r, i) {
  const a = clampNumber(n, t, o);
  if (r && n !== a) {
    throw new RangeError(numberOutOfRange(e, n, t, o, i));
  }
  return a;
}

function s(e) {
  return null !== e && /object|function/.test(typeof e);
}

function on(e, n = Map) {
  const t = new n;
  return (n, ...o) => {
    if (t.has(n)) {
      return t.get(n);
    }
    const r = e(n, ...o);
    return t.set(n, r), r;
  };
}

function r(e) {
  return n({
    name: e
  }, 1);
}

function n(n, t) {
  return e((e => ({
    value: e,
    configurable: 1,
    writable: !t
  })), n);
}

function t(n) {
  return e((e => ({
    get: e,
    configurable: 1
  })), n);
}

function o(e) {
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

function e(e, n, t) {
  const o = {};
  for (const r in n) {
    o[r] = e(n[r], r, t);
  }
  return o;
}

function g(e, n, t) {
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

function nn(e, n) {
  const t = Object.create(null);
  for (const o of e) {
    t[o] = n[o];
  }
  return t;
}

function hasAnyPropsByName(e, n) {
  for (const t of n) {
    if (t in e) {
      return 1;
    }
  }
  return 0;
}

function allPropsEqual(e, n, t) {
  for (const o of e) {
    if (n[o] !== t[o]) {
      return 0;
    }
  }
  return 1;
}

function zeroOutProps(e, n, t) {
  const o = {
    ...t
  };
  for (let t = 0; t < n; t++) {
    o[e[t]] = 0;
  }
  return o;
}

function Pt(e, ...n) {
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
    const n = e[t[i]], a = Ao[i], s = Uo / a, [c, u] = divModTrunc(n, s);
    o += u * a, r += c;
  }
  const [i, a] = divModTrunc(o, Uo);
  return [ r + i, a ];
}

function nanoToGivenFields(e, n, t) {
  const o = {};
  for (let r = n; r >= 0; r--) {
    const n = Ao[r];
    o[t[r]] = divTrunc(e, n), e = modTrunc(e, n);
  }
  return o;
}

function d(e) {
  if (void 0 !== e) {
    return m(e);
  }
}

function P(e) {
  if (void 0 !== e) {
    return h(e);
  }
}

function S(e) {
  if (void 0 !== e) {
    return T(e);
  }
}

function h(e) {
  return requireNumberIsPositive(T(e));
}

function T(e) {
  return ze(cr(e));
}

function requirePropDefined(e, n) {
  if (null == n) {
    throw new RangeError(missingField(e));
  }
  return n;
}

function requireObjectLike(e) {
  if (!s(e)) {
    throw new TypeError(oo);
  }
  return e;
}

function requireType(e, n, t = e) {
  if (typeof n !== e) {
    throw new TypeError(invalidEntity(t, n));
  }
  return n;
}

function ze(e, n = "number") {
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

function toString(e) {
  if ("symbol" == typeof e) {
    throw new TypeError(no);
  }
  return String(e);
}

function toStringViaPrimitive(e, n) {
  return s(e) ? String(e) : m(e, n);
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
  return ze(toNumber(e, n), n);
}

function toPositiveInteger(e, n) {
  return requireNumberIsPositive(toInteger(e, n), n);
}

function createBigNano(e, n) {
  let [t, o] = divModTrunc(n, Uo), r = e + t;
  const i = Math.sign(r);
  return i && i === -Math.sign(o) && (r -= i, o += i * Uo), [ r, o ];
}

function addBigNanos(e, n, t = 1) {
  return createBigNano(e[0] + n[0] * t, e[1] + n[1] * t);
}

function moveBigNano(e, n) {
  return createBigNano(e[0], e[1] + n);
}

function diffBigNanos(e, n) {
  return addBigNanos(n, e, -1);
}

function compareBigNanos(e, n) {
  return compareNumbers(e[0], n[0]) || compareNumbers(e[1], n[1]);
}

function bigNanoOutside(e, n, t) {
  return -1 === compareBigNanos(e, n) || 1 === compareBigNanos(e, t);
}

function bigIntToBigNano(e, n = 1) {
  const t = BigInt(Uo / n);
  return [ Number(e / t), Number(e % t) * n ];
}

function Ge(e, n = 1) {
  const t = Uo / n, [o, r] = divModTrunc(e, t);
  return [ o, r * n ];
}

function bigNanoToNumber(e, n = 1, t) {
  const [o, r] = e, [i, a] = divModTrunc(r, n);
  return o * (Uo / n) + (i + (t ? a / n : 0));
}

function divModBigNano(e, n, t = divModFloor) {
  const [o, r] = e, [i, a] = t(r, n);
  return [ o * (Uo / n) + i, a ];
}

function checkIsoYearMonthInBounds(e) {
  return clampProp(e, "isoYear", wr, Fr, 1), e.isoYear === wr ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Fr && clampProp(e, "isoMonth", 1, 9, 1), 
  e;
}

function checkIsoDateInBounds(e) {
  return checkIsoDateTimeInBounds({
    ...e,
    ...Nt,
    isoHour: 12
  }), e;
}

function checkIsoDateTimeInBounds(e) {
  const n = clampProp(e, "isoYear", wr, Fr, 1), t = n === wr ? 1 : n === Fr ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    isoNanosecond: e.isoNanosecond - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || bigNanoOutside(e, Sr, Er)) {
    throw new RangeError(Io);
  }
  return e;
}

function isoTimeFieldsToNano(e) {
  return givenFieldsToBigNano(e, 5, w)[1];
}

function nanoToIsoTimeAndDay(e) {
  const [n, t] = divModFloor(e, Uo);
  return [ nanoToGivenFields(t, 5, w), n ];
}

function epochNanoToSecMod(e) {
  return divModBigNano(e, Ro);
}

function isoToEpochMilli(e) {
  return isoArgsToEpochMilli(e.isoYear, e.isoMonth, e.isoDay, e.isoHour, e.isoMinute, e.isoSecond, e.isoMillisecond);
}

function isoToEpochNano(e) {
  const n = isoToEpochMilli(e);
  if (void 0 !== n) {
    const [t, o] = divModTrunc(n, ko);
    return [ t, o * Qe + (e.isoMicrosecond || 0) * Yo + (e.isoNanosecond || 0) ];
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
  return isoArgsToEpochMilli(...e) / Co;
}

function isoArgsToEpochMilli(...e) {
  const [n, t] = isoToLegacyDate(...e), o = n.valueOf();
  if (!isNaN(o)) {
    return o - t * ko;
  }
}

function isoToLegacyDate(e, n = 1, t = 1, o = 0, r = 0, i = 0, a = 0) {
  const s = e === wr ? 1 : e === Fr ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function epochNanoToIso(e, n) {
  let [t, o] = moveBigNano(e, n);
  o < 0 && (o += Uo, t -= 1);
  const [r, i] = divModFloor(o, Qe), [a, s] = divModFloor(i, Yo);
  return epochMilliToIso(t * ko + r, a, s);
}

function epochMilliToIso(e, n = 0, t = 0) {
  const o = Math.ceil(Math.max(0, Math.abs(e) - Pr) / ko) * Math.sign(e), r = new Date(e - o * ko);
  return zipProps(Tr, [ r.getUTCFullYear(), r.getUTCMonth() + 1, r.getUTCDate() + o, r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds(), n, t ]);
}

function hashIntlFormatParts(e, n) {
  if (n < -Pr) {
    throw new RangeError(Io);
  }
  const t = e.formatToParts(n), o = {};
  for (const e of t) {
    o[e.type] = e.value;
  }
  return o;
}

function computeIsoDateParts(e) {
  return [ e.isoYear, e.isoMonth, e.isoDay ];
}

function computeIsoMonthCodeParts(e, n) {
  return [ n, 0 ];
}

function computeIsoMonthsInYear() {
  return kr;
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

function computeIsoDayOfWeek(e) {
  const [n, t] = isoToLegacyDate(e.isoYear, e.isoMonth, e.isoDay);
  return modFloor(n.getUTCDay() - t, 7) || 7;
}

function computeIsoEraParts(e) {
  return this.id === or ? (({isoYear: e}) => e < 1 ? [ "gregory-inverse", 1 - e ] : [ "gregory", e ])(e) : this.id === rr ? Yr(e) : [];
}

function computeJapaneseEraParts(e) {
  const n = isoToEpochMilli(e);
  if (n < Cr) {
    const {isoYear: n} = e;
    return n < 1 ? [ "japanese-inverse", 1 - n ] : [ "japanese", n ];
  }
  const t = hashIntlFormatParts(Ci(rr), n), {era: o, eraYear: r} = parseIntlYear(t, rr);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(Dr, e, constrainIsoDateFields(e));
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
  return zipProps(w, [ clampProp(e, "isoHour", 0, 23, n), clampProp(e, "isoMinute", 0, 59, n), clampProp(e, "isoSecond", 0, 59, n), clampProp(e, "isoMillisecond", 0, 999, n), clampProp(e, "isoMicrosecond", 0, 999, n), clampProp(e, "isoNanosecond", 0, 999, n) ]);
}

function mt(e) {
  return void 0 === e ? 0 : Xr(requireObjectLike(e));
}

function je(e, n = 0) {
  e = normalizeOptions(e);
  const t = ei(e), o = ni(e, n);
  return [ Xr(e), o, t ];
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = Kr(n, o, r), s = parseRoundingIncInteger(n), c = ii(n, i);
  const u = Jr(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundingOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeOptionsOrString(e, Rr));
  const r = ii(e, 7);
  let i = Jr(e, n);
  return i = requirePropDefined(Rr, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return ti(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function Me(e) {
  const n = normalizeOptionsOrString(e, qr), t = refineChoiceOption(qr, _r, n, 0);
  if (!t) {
    throw new RangeError(invalidEntity(qr, t));
  }
  return t;
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ ii(e, 4), ...refineSmallestUnitAndSubsecDigits(Jr(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ Ao[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[zr];
  return void 0 === n ? 1 : toInteger(n, zr);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? Uo : Ao[n + 1];
  if (r) {
    const t = Ao[n];
    if (r % ((e = clampEntity(zr, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity(zr, e));
    }
  } else {
    e = clampEntity(zr, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[Ur];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(Ur, n));
    }
    n = clampEntity(Ur, Math.floor(n), 0, 9, 1);
  }
  return n;
}

function normalizeOptions(e) {
  return void 0 === e ? {} : requireObjectLike(e);
}

function normalizeOptionsOrString(e, n) {
  return "string" == typeof e ? {
    [n]: e
  } : requireObjectLike(e);
}

function fabricateOverflowOptions(e) {
  return {
    overflow: jr[e]
  };
}

function refineUnitOption(e, n, t = 9, o = 0, r) {
  let i = n[e];
  if (void 0 === i) {
    return r ? o : void 0;
  }
  if (i = toString(i), "auto" === i) {
    return r ? o : null;
  }
  let a = Oo[i];
  if (void 0 === a && (a = mr[i]), void 0 === a) {
    throw new RangeError(invalidChoice(e, i, Oo));
  }
  return clampEntity(e, a, o, t, 1, Bo), a;
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
    throw new RangeError(Eo);
  }
}

function xe(e) {
  return {
    branding: Re,
    epochNanoseconds: e
  };
}

function _e(e, n, t) {
  return {
    branding: z,
    calendar: t,
    timeZone: n,
    epochNanoseconds: e
  };
}

function jt(e, n = e.calendar) {
  return {
    branding: x,
    calendar: n,
    ...nn(Nr, e)
  };
}

function W(e, n = e.calendar) {
  return {
    branding: G,
    calendar: n,
    ...nn(Ir, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: Ut,
    calendar: n,
    ...nn(Ir, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: qt,
    calendar: n,
    ...nn(Ir, e)
  };
}

function St(e) {
  return {
    branding: ft,
    ...nn(Mr, e)
  };
}

function Oe(e) {
  return {
    branding: N,
    sign: computeDurationSign(e),
    ...nn(ur, e)
  };
}

function I(e) {
  return divModBigNano(e.epochNanoseconds, Qe)[0];
}

function v(e) {
  return ((e, n = 1) => {
    const [t, o] = e, r = Math.floor(o / n), i = Uo / n;
    return BigInt(t) * BigInt(i) + BigInt(r);
  })(e.epochNanoseconds);
}

function extractEpochNano(e) {
  return e.epochNanoseconds;
}

function J(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeOptionsOrString(e, Zr))[Ar]);
    let o = Qr(e);
    return o = requirePropDefined(Zr, o), [ o, t ];
  })(r, e), c = Math.max(a, i);
  if (!s && isUniformUnit(c, s)) {
    return totalDayTimeDuration(o, a);
  }
  if (!s) {
    throw new RangeError(yo);
  }
  if (!o.sign) {
    return 0;
  }
  const [u, f, l] = createMarkerSystem(n, t, s), d = createMarkerToEpochNano(l), m = createMoveMarker(l), h = createDiffMarkers(l), g = m(f, u, o);
  isZonedEpochSlots(s) || (checkIsoDateTimeInBounds(u), checkIsoDateTimeInBounds(g));
  const D = h(f, u, g, a);
  return isUniformUnit(a, s) ? totalDayTimeDuration(D, a) : ((e, n, t, o, r, i, a) => {
    const s = computeDurationSign(e), [c, u] = clampRelativeDuration(o, gr(t, e), t, s, r, i, a), f = computeEpochNanoFrac(n, c, u);
    return e[p[t]] + f * s;
  })(D, d(g), a, f, u, d, m);
}

function totalDayTimeDuration(e, n) {
  return bigNanoToNumber(durationFieldsToBigNano(e), Ao[n], 1);
}

function clampRelativeDuration(e, n, t, o, r, i, a) {
  const s = p[t], c = {
    ...n,
    [s]: n[s] + o
  }, u = a(e, r, n), f = a(e, r, c);
  return [ i(u), i(f) ];
}

function computeEpochNanoFrac(e, n, t) {
  const o = bigNanoToNumber(diffBigNanos(n, t));
  if (!o) {
    throw new RangeError(fo);
  }
  return bigNanoToNumber(diffBigNanos(n, e)) / o;
}

function Le(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5, 1);
  return xe(roundBigNano(e.epochNanoseconds, t, o, r, 1));
}

function Ie(e, n, t) {
  let {epochNanoseconds: o, timeZone: r, calendar: i} = n;
  const [a, s, c] = refineRoundingOptions(t);
  if (0 === a && 1 === s) {
    return n;
  }
  const u = e(r);
  if (6 === a) {
    o = ((e, n, t, o) => {
      const r = he(t, n), [i, a] = e(r), s = t.epochNanoseconds, c = getStartOfDayInstantFor(n, i), u = getStartOfDayInstantFor(n, a);
      if (bigNanoOutside(s, c, u)) {
        throw new RangeError(fo);
      }
      return roundWithMode(computeEpochNanoFrac(s, c, u), o) ? u : c;
    })(computeDayInterval, u, n, c);
  } else {
    const e = u.R(o);
    o = getMatchingInstantFor(u, roundDateTime(epochNanoToIso(o, e), a, s, c), e, 2, 0, 1);
  }
  return _e(o, r, i);
}

function vt(e, n) {
  return jt(roundDateTime(e, ...refineRoundingOptions(n)), e.calendar);
}

function lt(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5);
  var i;
  return St((i = r, roundTimeToNano(e, computeNanoInc(t, o), i)[0]));
}

function Te(e, n) {
  const t = e(n.timeZone), o = he(n, t), [r, i] = computeDayInterval(o), a = bigNanoToNumber(diffBigNanos(getStartOfDayInstantFor(t, r), getStartOfDayInstantFor(t, i)), zo, 1);
  if (a <= 0) {
    throw new RangeError(fo);
  }
  return a;
}

function ve(e, n) {
  const {timeZone: t, calendar: o} = n, r = ((e, n, t) => getStartOfDayInstantFor(n, e(he(t, n))))(computeDayFloor, e(t), n);
  return _e(r, t, o);
}

function roundDateTime(e, n, t, o) {
  return roundDateTimeToNano(e, computeNanoInc(n, t), o);
}

function roundDateTimeToNano(e, n, t) {
  const [o, r] = roundTimeToNano(e, n, t);
  return checkIsoDateTimeInBounds({
    ...moveByDays(e, r),
    ...o
  });
}

function roundTimeToNano(e, n, t) {
  return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(e), n, t));
}

function roundToMinute(e) {
  return roundByInc(e, Zo, 7);
}

function computeNanoInc(e, n) {
  return Ao[e] * n;
}

function computeDayInterval(e) {
  const n = computeDayFloor(e);
  return [ n, moveByDays(n, 1) ];
}

function computeDayFloor(e) {
  return yr(6, e);
}

function roundDayTimeDurationByInc(e, n, t) {
  const o = Math.min(getMaxDurationUnit(e), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(e, o), n, t), o);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  if (0 === o && 1 === r) {
    return e;
  }
  const f = isUniformUnit(o, s) ? isZonedEpochSlots(s) && o < 6 && t >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [l, d, m] = f(e, n, t, o, r, i, a, s, c, u);
  return m && 7 !== o && (l = ((e, n, t, o, r, i, a, s) => {
    const c = computeDurationSign(e);
    for (let u = o + 1; u <= t; u++) {
      if (7 === u && 7 !== t) {
        continue;
      }
      const o = gr(u, e);
      o[p[u]] += c;
      const f = bigNanoToNumber(diffBigNanos(a(s(r, i, o)), n));
      if (f && Math.sign(f) !== c) {
        break;
      }
      e = o;
    }
    return e;
  })(l, d, t, Math.max(6, o), a, s, c, u)), l;
}

function roundBigNano(e, n, t, o, r) {
  if (6 === n) {
    const n = (e => e[0] + e[1] / Uo)(e);
    return [ roundByInc(n, t, o), 0 ];
  }
  return roundBigNanoByInc(e, computeNanoInc(n, t), o, r);
}

function roundBigNanoByInc(e, n, t, o) {
  let [r, i] = e;
  o && i < 0 && (i += Uo, r -= 1);
  const [a, s] = divModFloor(roundByInc(i, n, t), Uo);
  return createBigNano(r + a, s);
}

function roundByInc(e, n, t) {
  return roundWithMode(e / n, t) * n;
}

function roundWithMode(e, n) {
  return ai[n](e);
}

function nudgeDayTimeDuration(e, n, t, o, r, i) {
  const a = computeDurationSign(e), s = durationFieldsToBigNano(e), c = roundBigNano(s, o, r, i), u = diffBigNanos(s, c), f = Math.sign(c[0] - s[0]) === a, l = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...l
  }, addBigNanos(n, u), f ];
}

function nudgeZonedTimeDuration(e, n, t, o, r, i, a, s, c, u) {
  const f = computeDurationSign(e) || 1, l = bigNanoToNumber(durationFieldsToBigNano(e, 5)), d = computeNanoInc(o, r);
  let m = roundByInc(l, d, i);
  const [p, h] = clampRelativeDuration(a, {
    ...e,
    ...hr
  }, 6, f, s, c, u), g = m - bigNanoToNumber(diffBigNanos(p, h));
  let D = 0;
  g && Math.sign(g) !== f ? n = moveBigNano(p, m) : (D += f, m = roundByInc(g, d, i), 
  n = moveBigNano(h, m));
  const T = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...T,
    days: e.days + D
  }, n, Boolean(D) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  const f = computeDurationSign(e), l = p[o], d = gr(o, e);
  7 === o && (e = {
    ...e,
    weeks: e.weeks + Math.trunc(e.days / 7)
  });
  const m = divTrunc(e[l], r) * r;
  d[l] = m;
  const [h, g] = clampRelativeDuration(a, d, o, r * f, s, c, u), D = m + computeEpochNanoFrac(n, h, g) * f * r, T = roundByInc(D, r, i), I = Math.sign(T - D) === f;
  return d[l] = T, [ d, I ? g : h, I ];
}

function ke(e, n, t, o) {
  const [r, i, a, s] = (e => {
    const n = refineTimeDisplayTuple(e = normalizeOptions(e));
    return [ e.timeZone, ...n ];
  })(o), c = void 0 !== r;
  return ((e, n, t, o, r, i) => {
    t = roundBigNanoByInc(t, r, o, 1);
    const a = n.R(t);
    return formatIsoDateTimeFields(epochNanoToIso(t, a), i) + (e ? Se(roundToMinute(a)) : "Z");
  })(c, n(c ? e(r) : si), t.epochNanoseconds, i, a, s);
}

function Fe(e, n, t) {
  const [o, r, i, a, s, c] = (e => {
    e = normalizeOptions(e);
    const n = ti(e), t = refineSubsecDigits(e), o = ri(e), r = ii(e, 4), i = Jr(e, 4);
    return [ n, oi(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t);
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundBigNanoByInc(o, c, s, 1);
    const f = e(t).R(o);
    return formatIsoDateTimeFields(epochNanoToIso(o, f), u) + Se(roundToMinute(f), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + e + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, o, r, i, a, s, c);
}

function Ft(e, n) {
  const [t, o, r, i] = (e => (e = normalizeOptions(e), [ ti(e), ...refineTimeDisplayTuple(e) ]))(n);
  return a = e.calendar, s = t, c = i, formatIsoDateTimeFields(roundDateTimeToNano(e, r, o), c) + formatCalendar(a, s);
  var a, s, c;
}

function ce(e, n) {
  return t = e.calendar, o = e, r = refineDateDisplayOptions(n), formatIsoDateFields(o) + formatCalendar(t, r);
  var t, o, r;
}

function Kt(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoYearMonthFields, e, refineDateDisplayOptions(n));
}

function Jt(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoMonthDayFields, e, refineDateDisplayOptions(n));
}

function ct(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n);
  return i = r, formatIsoTimeFields(roundTimeToNano(e, o, t)[0], i);
  var i;
}

function k(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n, 3);
  return o > 1 && checkDurationUnits(e = {
    ...e,
    ...roundDayTimeDurationByInc(e, o, t)
  }), ((e, n) => {
    const {sign: t} = e, o = -1 === t ? negateDurationFields(e) : e, {hours: r, minutes: i} = o, [a, s] = divModBigNano(durationFieldsToBigNano(o, 3), Ro, divModTrunc);
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
  const r = o > 1 || 0 === o && e !== l;
  return 1 === o ? e === l ? n(t) : formatIsoDateFields(t) : r ? formatIsoDateFields(t) + formatCalendarId(e, 2 === o) : n(t);
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
  return formatIsoYearMonthFields(e) + "-" + bo(e.isoDay);
}

function formatIsoYearMonthFields(e) {
  const {isoYear: n} = e;
  return (n < 0 || n > 9999 ? getSignStr(n) + padNumber(6, Math.abs(n)) : padNumber(4, n)) + "-" + bo(e.isoMonth);
}

function formatIsoMonthDayFields(e) {
  return bo(e.isoMonth) + "-" + bo(e.isoDay);
}

function formatIsoTimeFields(e, n) {
  const t = [ bo(e.isoHour), bo(e.isoMinute) ];
  return -1 !== n && t.push(bo(e.isoSecond) + ((e, n, t, o) => formatSubsecNano(e * Qe + n * Yo + t, o))(e.isoMillisecond, e.isoMicrosecond, e.isoNanosecond, n)), 
  t.join(":");
}

function Se(e, n = 0) {
  if (1 === n) {
    return "";
  }
  const [t, o] = divModFloor(Math.abs(e), zo), [r, i] = divModFloor(o, Zo), [a, s] = divModFloor(i, Ro);
  return getSignStr(e) + bo(t) + ":" + bo(r) + (a || s ? ":" + bo(a) + formatSubsecNano(s) : "");
}

function formatCalendar(e, n) {
  return 1 !== n && (n > 1 || 0 === n && e !== l) ? formatCalendarId(e, 2 === n) : "";
}

function formatCalendarId(e, n) {
  return "[" + (n ? "!" : "") + "u-ca=" + e + "]";
}

function formatSubsecNano(e, n) {
  let t = padNumber(9, e);
  return t = void 0 === n ? t.replace(li, "") : t.slice(0, n), t ? "." + t : "";
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
  const {epochNanoseconds: t} = e, o = (n.R ? n : n(e.timeZone)).R(t), r = epochNanoToIso(t, o);
  return {
    calendar: e.calendar,
    ...r,
    offsetNanoseconds: o
  };
}

function getMatchingInstantFor(e, n, t, o = 0, r = 0, i, a) {
  if (void 0 !== t && 1 === o && (1 === o || a)) {
    return isoToEpochNanoWithOffset(n, t);
  }
  const s = e.I(n);
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
      throw new RangeError(Do);
    }
  }
  return a ? isoToEpochNano(n) : getSingleInstantFor(e, n, r, s);
}

function getSingleInstantFor(e, n, t = 0, o = e.I(n)) {
  if (1 === o.length) {
    return o[0];
  }
  if (1 === t) {
    throw new RangeError(To);
  }
  if (o.length) {
    return o[3 === t ? 1 : 0];
  }
  const r = isoToEpochNano(n), i = ((e, n) => {
    const t = e.R(moveBigNano(n, -Uo));
    return (e => {
      if (e > Uo) {
        throw new RangeError(go);
      }
      return e;
    })(e.R(moveBigNano(n, Uo)) - t);
  })(e, r), a = i * (2 === t ? -1 : 1);
  return (o = e.I(epochNanoToIso(r, a)))[2 === t ? 0 : o.length - 1];
}

function getStartOfDayInstantFor(e, n) {
  const t = e.I(n);
  if (t.length) {
    return t[0];
  }
  const o = moveBigNano(isoToEpochNano(n), -Uo);
  return e.O(o, 1);
}

function Ye(e, n, t) {
  return xe(checkEpochNanoInBounds(addBigNanos(n.epochNanoseconds, (e => {
    if (durationHasDateParts(e)) {
      throw new RangeError(vo);
    }
    return durationFieldsToBigNano(e, 5);
  })(e ? negateDurationFields(t) : t))));
}

function pe(e, n, t, o, r, i = Object.create(null)) {
  const a = n(o.timeZone), s = e(o.calendar);
  return {
    ...o,
    ...moveZonedEpochs(a, s, o, t ? negateDurationFields(r) : r, i)
  };
}

function wt(e, n, t, o, r = Object.create(null)) {
  const {calendar: i} = t;
  return jt(moveDateTime(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function ne(e, n, t, o, r) {
  const {calendar: i} = t;
  return W(moveDate(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function Gt(e, n, t, o, r) {
  const i = t.calendar, a = e(i);
  let s = checkIsoDateInBounds(moveToDayOfMonthUnsafe(a, t));
  n && (o = B(o)), o.sign < 0 && (s = a.P(s, {
    ...pr,
    months: 1
  }), s = moveByDays(s, -1));
  const c = a.P(s, o, r);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(a, c), i);
}

function at(e, n, t) {
  return St(moveTime(n, e ? negateDurationFields(t) : t)[0]);
}

function moveZonedEpochs(e, n, t, o, r) {
  const i = durationFieldsToBigNano(o, 5);
  let a = t.epochNanoseconds;
  if (durationHasDateParts(o)) {
    const s = he(t, e);
    a = addBigNanos(getSingleInstantFor(e, {
      ...moveDate(n, s, {
        ...o,
        ...hr
      }, r),
      ...nn(w, s)
    }), i);
  } else {
    a = addBigNanos(a, i), mt(r);
  }
  return {
    epochNanoseconds: checkEpochNanoInBounds(a)
  };
}

function moveDateTime(e, n, t, o) {
  const [r, i] = moveTime(n, t);
  return checkIsoDateTimeInBounds({
    ...moveDate(e, n, {
      ...t,
      ...hr,
      days: t.days + i
    }, o),
    ...r
  });
}

function moveDate(e, n, t, o) {
  if (t.years || t.months || t.weeks) {
    return e.P(n, t, o);
  }
  mt(o);
  const r = t.days + durationFieldsToBigNano(t, 5)[0];
  return r ? checkIsoDateInBounds(moveByDays(n, r)) : n;
}

function moveToDayOfMonthUnsafe(e, n, t = 1) {
  return moveByDays(n, t - e.day(n));
}

function moveTime(e, n) {
  const [t, o] = durationFieldsToBigNano(n, 5), [r, i] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) + o);
  return [ r, t + i ];
}

function moveByDays(e, n) {
  return n ? {
    ...e,
    ...epochMilliToIso(isoToEpochMilli(e) + n * ko)
  } : e;
}

function createMarkerSystem(e, n, t) {
  const o = e(t.calendar);
  return isZonedEpochSlots(t) ? [ t, o, n(t.timeZone) ] : [ {
    ...t,
    ...Nt
  }, o ];
}

function createMarkerToEpochNano(e) {
  return e ? extractEpochNano : isoToEpochNano;
}

function createMoveMarker(e) {
  return e ? Pt(moveZonedEpochs, e) : moveDateTime;
}

function createDiffMarkers(e) {
  return e ? Pt(diffZonedEpochsExact, e) : diffDateTimesExact;
}

function isZonedEpochSlots(e) {
  return e && e.epochNanoseconds;
}

function isUniformUnit(e, n) {
  return e <= 6 - (isZonedEpochSlots(n) ? 1 : 0);
}

function E(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getMaxDurationUnit(r), getMaxDurationUnit(i));
  if (isUniformUnit(c, s)) {
    return Oe(checkDurationUnits(((e, n, t, o) => {
      const r = addBigNanos(durationFieldsToBigNano(e), durationFieldsToBigNano(n), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(Io);
      }
      return {
        ...pr,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o)));
  }
  if (!s) {
    throw new RangeError(yo);
  }
  o && (i = negateDurationFields(i));
  const [u, f, l] = createMarkerSystem(n, t, s), d = createMoveMarker(l), m = createDiffMarkers(l), p = d(f, u, r);
  return Oe(m(f, u, d(f, p, i), c));
}

function V(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s, c, u, f] = ((e, n, t) => {
    e = normalizeOptionsOrString(e, Rr);
    let o = Kr(e);
    const r = t(e[Ar]);
    let i = parseRoundingIncInteger(e);
    const a = ii(e, 7);
    let s = Jr(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(Po);
    }
    if (null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), i > 1 && s > 5 && o !== s) {
      throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
    }
    return [ o, s, i, a, r ];
  })(r, i, e), l = Math.max(i, a);
  if (!f && l <= 6) {
    return Oe(checkDurationUnits(((e, n, t, o, r) => {
      const i = roundBigNano(durationFieldsToBigNano(e), t, o, r);
      return {
        ...pr,
        ...nanoToDurationDayTimeFields(i, n)
      };
    })(o, a, s, c, u)));
  }
  if (!isZonedEpochSlots(f) && !o.sign) {
    return o;
  }
  if (!f) {
    throw new RangeError(yo);
  }
  const [d, m, p] = createMarkerSystem(n, t, f), h = createMarkerToEpochNano(p), g = createMoveMarker(p), D = createDiffMarkers(p), T = g(m, d, o);
  isZonedEpochSlots(f) || (checkIsoDateTimeInBounds(d), checkIsoDateTimeInBounds(T));
  let I = D(m, d, T, a);
  const M = o.sign, N = computeDurationSign(I);
  if (M && N && M !== N) {
    throw new RangeError(fo);
  }
  return I = roundRelativeDuration(I, h(T), a, s, c, u, m, d, h, g), Oe(I);
}

function Y(e) {
  return -1 === e.sign ? B(e) : e;
}

function B(e) {
  return Oe(negateDurationFields(e));
}

function negateDurationFields(e) {
  const n = {};
  for (const t of p) {
    n[t] = -1 * e[t] || 0;
  }
  return n;
}

function y(e) {
  return !e.sign;
}

function computeDurationSign(e, n = p) {
  let t = 0;
  for (const o of n) {
    const n = Math.sign(e[o]);
    if (n) {
      if (t && t !== n) {
        throw new RangeError(No);
      }
      t = n;
    }
  }
  return t;
}

function checkDurationUnits(e) {
  for (const n of dr) {
    clampEntity(n, e[n], -di, di, 1);
  }
  return checkDurationTimeUnit(bigNanoToNumber(durationFieldsToBigNano(e), Ro)), e;
}

function checkDurationTimeUnit(e) {
  if (!Number.isSafeInteger(e)) {
    throw new RangeError(Mo);
  }
}

function durationFieldsToBigNano(e, n = 6) {
  return givenFieldsToBigNano(e, n, p);
}

function nanoToDurationDayTimeFields(e, n = 6) {
  const [t, o] = e, r = nanoToGivenFields(o, n, p);
  if (r[p[n]] += t * (Uo / Ao[n]), !Number.isFinite(r[p[n]])) {
    throw new RangeError(Io);
  }
  return r;
}

function nanoToDurationTimeFields(e, n = 5) {
  return nanoToGivenFields(e, n, p);
}

function durationHasDateParts(e) {
  return Boolean(computeDurationSign(e, lr));
}

function getMaxDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[p[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / ci) * ci;
  return [ n, n + ci ];
}

function We(e) {
  const n = parseDateTimeLike(e = toStringViaPrimitive(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  let t;
  if (n.j) {
    t = 0;
  } else {
    if (!n.offset) {
      throw new RangeError(failedParse(e));
    }
    t = parseOffsetNano(n.offset);
  }
  return n.timeZone && parseOffsetNanoMaybe(n.timeZone, 1), xe(isoToEpochNanoWithOffset(checkIsoDateTimeFields(n), t));
}

function H(e) {
  const n = parseDateTimeLike(m(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  if (n.timeZone) {
    return finalizeZonedDateTime(n, n.offset ? parseOffsetNano(n.offset) : void 0);
  }
  if (n.j) {
    throw new RangeError(failedParse(e));
  }
  return finalizeDate(n);
}

function Ae(e, n) {
  const t = parseDateTimeLike(m(e));
  if (!t || !t.timeZone) {
    throw new RangeError(failedParse(e));
  }
  const {offset: o} = t, r = o ? parseOffsetNano(o) : void 0, [, i, a] = je(n);
  return finalizeZonedDateTime(t, r, i, a);
}

function parseOffsetNano(e) {
  const n = parseOffsetNanoMaybe(e);
  if (void 0 === n) {
    throw new RangeError(failedParse(e));
  }
  return n;
}

function Bt(e) {
  const n = parseDateTimeLike(m(e));
  if (!n || n.j) {
    throw new RangeError(failedParse(e));
  }
  return jt(finalizeDateTime(n));
}

function de(e, n, t) {
  let o = parseDateTimeLike(m(e));
  if (!o || o.j) {
    throw new RangeError(failedParse(e));
  }
  return n ? o.calendar === l && (o = -271821 === o.isoYear && 4 === o.isoMonth ? {
    ...o,
    isoDay: 20,
    ...Nt
  } : {
    ...o,
    isoDay: 1,
    ...Nt
  }) : t && o.calendar === l && (o = {
    ...o,
    isoYear: Br
  }), W(o.C ? finalizeDateTime(o) : finalizeDate(o));
}

function _t(e, n) {
  const t = parseYearMonthOnly(m(n));
  if (t) {
    return requireIsoCalendar(t), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(t)));
  }
  const o = de(n, 1);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(e(o.calendar), o));
}

function requireIsoCalendar(e) {
  if (e.calendar !== l) {
    throw new RangeError(invalidSubstring(e.calendar));
  }
}

function xt(e, n) {
  const t = parseMonthDayOnly(m(n));
  if (t) {
    return requireIsoCalendar(t), createPlainMonthDaySlots(checkIsoDateFields(t));
  }
  const o = de(n, 0, 1), {calendar: r} = o, i = e(r), [a, s, c] = i.v(o), [u, f] = i.q(a, s), [l, d] = i.G(u, f, c);
  return createPlainMonthDaySlots(checkIsoDateInBounds(i.V(l, d, c)), r);
}

function ht(e) {
  let n, t = (e => {
    const n = Pi.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(m(e));
  if (!t) {
    if (t = parseDateTimeLike(e), !t) {
      throw new RangeError(failedParse(e));
    }
    if (!t.C) {
      throw new RangeError(failedParse(e));
    }
    if (t.j) {
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
  return St(constrainIsoTimeFields(t, 1));
}

function R(e) {
  const n = (e => {
    const n = Fi.exec(e);
    return n ? (e => {
      function parseUnit(e, r, i) {
        let a = 0, s = 0;
        if (i && ([a, o] = divModFloor(o, Ao[i])), void 0 !== e) {
          if (t) {
            throw new RangeError(invalidSubstring(e));
          }
          s = (e => {
            const n = parseInt(e);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(e));
            }
            return n;
          })(e), n = 1, r && (o = parseSubsecNano(r) * (Ao[i] / Ro), t = 1);
        }
        return a + s;
      }
      let n = 0, t = 0, o = 0, r = {
        ...zipProps(p, [ parseUnit(e[2]), parseUnit(e[3]), parseUnit(e[4]), parseUnit(e[5]), parseUnit(e[6], e[7], 5), parseUnit(e[8], e[9], 4), parseUnit(e[10], e[11], 3) ]),
        ...nanoToGivenFields(o, 2, p)
      };
      if (!n) {
        throw new RangeError(noValidFields(p));
      }
      return parseSign(e[1]) < 0 && (r = negateDurationFields(r)), r;
    })(n) : void 0;
  })(m(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  return Oe(checkDurationUnits(n));
}

function f(e) {
  const n = parseDateTimeLike(e) || parseYearMonthOnly(e) || parseMonthDayOnly(e);
  return n ? n.calendar : e;
}

function Z(e) {
  const n = parseDateTimeLike(e);
  return n && (n.timeZone || n.j && si || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = M(e.timeZone), i = L(r);
  let a;
  return checkIsoDateTimeFields(e), a = e.C ? getMatchingInstantFor(i, e, n, t, o, !i.$, e.j) : getStartOfDayInstantFor(i, e), 
  _e(a, r, u(e.calendar));
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
    calendar: u(e.calendar)
  };
}

function parseDateTimeLike(e) {
  const n = vi.exec(e);
  return n ? (e => {
    const n = e[10], t = "Z" === (n || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(e),
      isoMonth: parseInt(e[4]),
      isoDay: parseInt(e[5]),
      ...organizeTimeParts(e.slice(5)),
      ...organizeAnnotationParts(e[16]),
      C: Boolean(e[6]),
      j: t,
      offset: t ? void 0 : n
    };
  })(n) : void 0;
}

function parseYearMonthOnly(e) {
  const n = Ni.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = yi.exec(e);
  return n ? (e => ({
    isoYear: Br,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = Ei.exec(e);
  return t ? ((e, n) => {
    const t = e[4] || e[5];
    if (n && t) {
      throw new RangeError(invalidSubstring(t));
    }
    return (e => {
      if (Math.abs(e) >= Uo) {
        throw new RangeError(ho);
      }
      return e;
    })((parseInt0(e[2]) * zo + parseInt0(e[3]) * Zo + parseInt0(e[4]) * Ro + parseSubsecNano(e[5] || "")) * parseSign(e[1]));
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
  if (e.replace(Si, ((e, r, i) => {
    const a = Boolean(r), [s, c] = i.split("=").reverse();
    if (c) {
      if ("u-ca" === c) {
        o.push(s), n || (n = a);
      } else if (a || /[A-Z]/.test(c)) {
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
    calendar: o[0] || l
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

function Ze(e) {
  return M(m(e));
}

function M(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? Se(n) : n ? (e => {
    if (Oi.test(e)) {
      throw new RangeError(F(e));
    }
    if (bi.test(e)) {
      throw new RangeError(po);
    }
    return e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e)))).join("/");
  })(e) : si;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : si;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== si ? wi(e) : void 0;
}

function Ke(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function Be(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function K(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getMaxDurationUnit(o), getMaxDurationUnit(r));
  if (allPropsEqual(p, o, r)) {
    return 0;
  }
  if (isUniformUnit(s, a)) {
    return compareBigNanos(durationFieldsToBigNano(o), durationFieldsToBigNano(r));
  }
  if (!a) {
    throw new RangeError(yo);
  }
  const [c, u, f] = createMarkerSystem(n, t, a), l = createMarkerToEpochNano(f), d = createMoveMarker(f);
  return compareBigNanos(l(d(u, c, o)), l(d(u, c, r)));
}

function Yt(e, n) {
  return te(e, n) || Dt(e, n);
}

function te(e, n) {
  return compareNumbers(isoToEpochMilli(e), isoToEpochMilli(n));
}

function Dt(e, n) {
  return compareNumbers(isoTimeFieldsToNano(e), isoTimeFieldsToNano(n));
}

function Ve(e, n) {
  return !Ke(e, n);
}

function Ce(e, n) {
  return !Be(e, n) && !!isTimeZoneIdsEqual(e.timeZone, n.timeZone) && e.calendar === n.calendar;
}

function Ct(e, n) {
  return !Yt(e, n) && e.calendar === n.calendar;
}

function re(e, n) {
  return !te(e, n) && e.calendar === n.calendar;
}

function $t(e, n) {
  return !te(e, n) && e.calendar === n.calendar;
}

function Lt(e, n) {
  return !te(e, n) && e.calendar === n.calendar;
}

function st(e, n) {
  return !Dt(e, n);
}

function isTimeZoneIdsEqual(e, n) {
  if (e === n) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(e) === getTimeZoneAtomic(n);
  } catch (e) {}
}

function Ee(e, n, t, o) {
  const r = refineDiffOptions(e, o, 3, 5), i = diffEpochNanos(n.epochNanoseconds, t.epochNanoseconds, ...r);
  return Oe(e ? negateDurationFields(i) : i);
}

function we(e, n, t, o, r, i) {
  const a = getCommonCalendarId(o.calendar, r.calendar), [s, c, u, f] = refineDiffOptions(t, i, 5), l = o.epochNanoseconds, d = r.epochNanoseconds, m = compareBigNanos(d, l);
  let p;
  if (m) {
    if (s < 6) {
      p = diffEpochNanos(l, d, s, c, u, f);
    } else {
      const t = n(((e, n) => {
        if (!isTimeZoneIdsEqual(e, n)) {
          throw new RangeError(mo);
        }
        return e;
      })(o.timeZone, r.timeZone)), l = e(a);
      p = diffZonedEpochsBig(l, t, o, r, m, s, i), p = roundRelativeDuration(p, d, s, c, u, f, l, o, extractEpochNano, Pt(moveZonedEpochs, t));
    }
  } else {
    p = pr;
  }
  return Oe(t ? negateDurationFields(p) : p);
}

function It(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar), [a, s, c, u] = refineDiffOptions(n, r, 6), f = isoToEpochNano(t), l = isoToEpochNano(o), d = compareBigNanos(l, f);
  let m;
  if (d) {
    if (a <= 6) {
      m = diffEpochNanos(f, l, a, s, c, u);
    } else {
      const n = e(i);
      m = diffDateTimesBig(n, t, o, d, a, r), m = roundRelativeDuration(m, l, a, s, c, u, n, t, isoToEpochNano, moveDateTime);
    }
  } else {
    m = pr;
  }
  return Oe(n ? negateDurationFields(m) : m);
}

function oe(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar);
  return diffDateLike(n, (() => e(i)), t, o, ...refineDiffOptions(n, r, 6, 9, 6));
}

function zt(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar), a = refineDiffOptions(n, r, 9, 9, 8), s = e(i), c = moveToDayOfMonthUnsafe(s, t), u = moveToDayOfMonthUnsafe(s, o);
  return c.isoYear === u.isoYear && c.isoMonth === u.isoMonth && c.isoDay === u.isoDay ? Oe(pr) : diffDateLike(n, (() => s), checkIsoDateInBounds(c), checkIsoDateInBounds(u), ...a, 8);
}

function diffDateLike(e, n, t, o, r, i, a, s, c = 6) {
  const u = isoToEpochNano(t), f = isoToEpochNano(o);
  if (void 0 === u || void 0 === f) {
    throw new RangeError(Io);
  }
  let l;
  if (compareBigNanos(f, u)) {
    if (6 === r) {
      l = diffEpochNanos(u, f, r, i, a, s);
    } else {
      const e = n();
      l = e.N(t, o, r), i === c && 1 === a || (l = roundRelativeDuration(l, f, r, i, a, s, e, t, isoToEpochNano, moveDate));
    }
  } else {
    l = pr;
  }
  return Oe(e ? negateDurationFields(l) : l);
}

function it(e, n, t, o) {
  const [r, i, a, s] = refineDiffOptions(e, o, 5, 5), c = roundByInc(diffTimes(n, t), computeNanoInc(i, a), s), u = {
    ...pr,
    ...nanoToDurationTimeFields(c, r)
  };
  return Oe(e ? negateDurationFields(u) : u);
}

function diffZonedEpochsExact(e, n, t, o, r, i) {
  const a = compareBigNanos(o.epochNanoseconds, t.epochNanoseconds);
  return a ? r < 6 ? diffEpochNanosExact(t.epochNanoseconds, o.epochNanoseconds, r) : diffZonedEpochsBig(n, e, t, o, a, r, i) : pr;
}

function diffDateTimesExact(e, n, t, o, r) {
  const i = isoToEpochNano(n), a = isoToEpochNano(t), s = compareBigNanos(a, i);
  return s ? o <= 6 ? diffEpochNanosExact(i, a, o) : diffDateTimesBig(e, n, t, s, o, r) : pr;
}

function diffZonedEpochsBig(e, n, t, o, r, i, a) {
  const [s, c, u] = ((e, n, t, o) => {
    function updateMid() {
      return f = {
        ...moveByDays(a, c++ * -o),
        ...i
      }, l = getSingleInstantFor(e, f), compareBigNanos(s, l) === -o;
    }
    const r = he(n, e), i = nn(w, r), a = he(t, e), s = t.epochNanoseconds;
    let c = 0;
    const u = diffTimes(r, a);
    let f, l;
    if (Math.sign(u) === -o && c++, updateMid() && (-1 === o || updateMid())) {
      throw new RangeError(fo);
    }
    const d = bigNanoToNumber(diffBigNanos(l, s));
    return [ r, f, d ];
  })(n, t, o, r);
  var f, l;
  return {
    ...6 === i ? (f = s, l = c, {
      ...pr,
      days: diffDays(f, l)
    }) : e.N(s, c, i, a),
    ...nanoToDurationTimeFields(u)
  };
}

function diffDateTimesBig(e, n, t, o, r, i) {
  const [a, s, c] = ((e, n, t) => {
    let o = n, r = diffTimes(e, n);
    return Math.sign(r) === -t && (o = moveByDays(n, -t), r += Uo * t), [ e, o, r ];
  })(n, t, o);
  return {
    ...e.N(a, s, r, i),
    ...nanoToDurationTimeFields(c)
  };
}

function diffEpochNanos(e, n, t, o, r, i) {
  return {
    ...pr,
    ...nanoToDurationDayTimeFields(roundBigNano(diffBigNanos(e, n), o, r, i), t)
  };
}

function diffEpochNanosExact(e, n, t) {
  return {
    ...pr,
    ...nanoToDurationDayTimeFields(diffBigNanos(e, n), t)
  };
}

function diffDays(e, n) {
  return diffEpochMilliByDay(isoToEpochMilli(e), isoToEpochMilli(n));
}

function diffEpochMilliByDay(e, n) {
  return Math.trunc((n - e) / ko);
}

function diffTimes(e, n) {
  return isoTimeFieldsToNano(n) - isoTimeFieldsToNano(e);
}

function getCommonCalendarId(e, n) {
  if (e !== n) {
    throw new RangeError(lo);
  }
  return e;
}

function computeNativeWeekOfYear(e) {
  return this.m(e)[0];
}

function computeNativeYearOfWeek(e) {
  return this.m(e)[1];
}

function computeNativeDayOfYear(e) {
  const [n] = this.v(e);
  return diffEpochMilliByDay(this.p(n), isoToEpochMilli(e)) + 1;
}

function parseMonthCode(e) {
  const n = Bi.exec(e);
  if (!n) {
    throw new RangeError(invalidMonthCode(e));
  }
  return [ parseInt(n[1]), Boolean(n[2]) ];
}

function formatMonthCode(e, n) {
  return "M" + bo(e) + (n ? "L" : "");
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
  return ir[getCalendarIdBase(e)];
}

function getCalendarLeapMonthMeta(e) {
  return sr[getCalendarIdBase(e)];
}

function getCalendarIdBase(e) {
  return computeCalendarIdBase(e.id || l);
}

function createIntlCalendar(e) {
  function epochMilliToIntlFields(e) {
    return ((e, n) => ({
      ...parseIntlYear(e, n),
      o: e.month,
      day: parseInt(e.day)
    }))(hashIntlFormatParts(n, e), t);
  }
  const n = Ci(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    h: createIntlFieldCache(epochMilliToIntlFields),
    l: createIntlYearDataCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return on((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearDataCache(e) {
  const n = e(0).year - Or;
  return on((t => {
    let o, r = isoArgsToEpochMilli(t - n), i = 0;
    const a = [], s = [];
    do {
      r += 400 * ko;
    } while ((o = e(r)).year <= t);
    do {
      if (r += (1 - o.day) * ko, o.year === t && (a.push(r), s.push(o.o)), r -= ko, ++i > 100 || r < -Pr) {
        throw new RangeError(fo);
      }
    } while ((o = e(r)).year >= t);
    return {
      i: a.reverse(),
      u: Fo(s.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const i = ir[n], a = ar[n] || {};
    void 0 !== i && (t = "islamic" === n ? "ah" : e.era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    "bc" === t || "b" === t ? t = "bce" : "ad" === t || "a" === t ? t = "ce" : "beforeroc" === t && (t = "broc"), 
    t = a[t] || t, o = r, r = eraYearToYear(o, i[t] || 0));
  }
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
  const {year: n, o: t, day: o} = this.h(e), {u: r} = this.l(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.l(e).i[n - 1] + (t - 1) * ko;
}

function computeIntlMonthCodeParts(e, n) {
  const t = computeIntlLeapMonth.call(this, e);
  return [ monthToMonthCodeNumber(n, t), t === n ];
}

function computeIntlLeapMonth(e) {
  const n = queryMonthStrings(this, e), t = queryMonthStrings(this, e - 1), o = n.length;
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
  const {i: t} = this.l(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.l(e + 1).i), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.l(e).i.length;
}

function computeIntlEraParts(e) {
  const n = this.h(e);
  return [ n.era, n.eraYear ];
}

function queryMonthStrings(e, n) {
  return Object.keys(e.l(n).u);
}

function Mt(e) {
  return u(m(e));
}

function u(e) {
  if ((e = e.toLowerCase()) !== l && e !== or) {
    const n = Ci(e).resolvedOptions().calendar;
    if (computeCalendarIdBase(e) !== computeCalendarIdBase(n)) {
      throw new RangeError(c(e));
    }
    return n;
  }
  return e;
}

function computeCalendarIdBase(e) {
  return "islamicc" === e && (e = "islamic"), e.split("-")[0];
}

function createNativeOpsCreator(e, n) {
  return t => t === l ? e : t === or || t === rr ? Object.assign(Object.create(e), {
    id: t
  }) : Object.assign(Object.create(n), ki(t));
}

function $(e, n, t, o) {
  const r = refineCalendarFields(t, o, Xo, [], xo);
  if (void 0 !== r.timeZone) {
    const o = t.F(r), i = refineTimeBag(r), a = e(r.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(n(a), {
        ...o,
        ...i
      }, void 0 !== r.offset ? parseOffsetNano(r.offset) : void 0),
      timeZone: a
    };
  }
  return {
    ...t.F(r),
    ...Nt
  };
}

function Ne(e, n, t, o, r, i) {
  const a = refineCalendarFields(t, r, Xo, jo, xo), s = e(a.timeZone), [c, u, f] = je(i), l = t.F(a, fabricateOverflowOptions(c)), d = refineTimeBag(a, c);
  return _e(getMatchingInstantFor(n(s), {
    ...l,
    ...d
  }, void 0 !== a.offset ? parseOffsetNano(a.offset) : void 0, u, f), s, o);
}

function At(e, n, t) {
  const o = refineCalendarFields(e, n, Xo, [], O), r = mt(t);
  return jt(checkIsoDateTimeInBounds({
    ...e.F(o, fabricateOverflowOptions(r)),
    ...refineTimeBag(o, r)
  }));
}

function me(e, n, t, o = []) {
  const r = refineCalendarFields(e, n, Xo, o);
  return e.F(r, t);
}

function Xt(e, n, t, o) {
  const r = refineCalendarFields(e, n, Ko, o);
  return e.K(r, t);
}

function Rt(e, n, t, o) {
  const r = refineCalendarFields(e, t, Xo, Jo);
  return n && void 0 !== r.month && void 0 === r.monthCode && void 0 === r.year && (r.year = Br), 
  e._(r, o);
}

function Tt(e, n) {
  return St(refineTimeBag(refineFields(e, qo, [], 1), mt(n)));
}

function q(e) {
  const n = refineFields(e, ur);
  return Oe(checkDurationUnits({
    ...pr,
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
      a = 1, Li[o] && (n = Li[o](n, o)), r[o] = n;
    } else if (t) {
      if (t.includes(o)) {
        throw new TypeError(missingField(o));
      }
      r[o] = tr[o];
    }
    i = o;
  }
  if (o && !a) {
    throw new TypeError(noValidFields(n));
  }
  return r;
}

function refineTimeBag(e, n) {
  return constrainIsoTimeFields(xi({
    ...tr,
    ...e
  }), n);
}

function De(e, n, t, o, r) {
  const {calendar: i, timeZone: a} = t, s = e(i), c = n(a), u = [ ...s.fields(Xo), ...Lo ].sort(), f = (e => {
    const n = he(e, L), t = Se(n.offsetNanoseconds), o = ji(e.calendar), [r, i, a] = o.v(n), [s, c] = o.q(r, i), u = formatMonthCode(s, c);
    return {
      ...$i(n),
      year: r,
      monthCode: u,
      day: a,
      offset: t
    };
  })(t), l = refineFields(o, u), d = s.k(f, l), m = {
    ...f,
    ...l
  }, [p, h, g] = je(r, 2);
  return _e(getMatchingInstantFor(c, {
    ...s.F(d, fabricateOverflowOptions(p)),
    ...constrainIsoTimeFields(xi(m), p)
  }, parseOffsetNano(m.offset), h, g), a, i);
}

function gt(e, n, t, o) {
  const r = e(n.calendar), i = [ ...r.fields(Xo), ...O ].sort(), a = {
    ...computeDateEssentials(s = n),
    hour: s.isoHour,
    minute: s.isoMinute,
    second: s.isoSecond,
    millisecond: s.isoMillisecond,
    microsecond: s.isoMicrosecond,
    nanosecond: s.isoNanosecond
  };
  var s;
  const c = refineFields(t, i), u = mt(o), f = r.k(a, c), l = {
    ...a,
    ...c
  };
  return jt(checkIsoDateTimeInBounds({
    ...r.F(f, fabricateOverflowOptions(u)),
    ...constrainIsoTimeFields(xi(l), u)
  }));
}

function ee(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(Xo).sort(), a = computeDateEssentials(n), s = refineFields(t, i), c = r.k(a, s);
  return r.F(c, o);
}

function Wt(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(Ko).sort(), a = (e => {
    const n = ji(e.calendar), [t, o] = n.v(e), [r, i] = n.q(t, o);
    return {
      year: t,
      monthCode: formatMonthCode(r, i)
    };
  })(n), s = refineFields(t, i), c = r.k(a, s);
  return r.K(c, o);
}

function Et(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(Xo).sort(), a = (e => {
    const n = ji(e.calendar), [t, o, r] = n.v(e), [i, a] = n.q(t, o);
    return {
      monthCode: formatMonthCode(i, a),
      day: r
    };
  })(n), s = refineFields(t, i), c = r.k(a, s);
  return r._(c, o);
}

function rt(e, n, t) {
  return St(((e, n, t) => refineTimeBag({
    ...nn(qo, e),
    ...refineFields(n, qo)
  }, mt(t)))(e, n, t));
}

function A(e, n) {
  return Oe((t = e, o = n, checkDurationUnits({
    ...t,
    ...refineFields(o, ur)
  })));
  var t, o;
}

function convertToIso(e, n, t, o, r) {
  n = nn(t = e.fields(t), n), o = refineFields(o, r = e.fields(r), []);
  let i = e.k(n, o);
  return i = refineFields(i, [ ...t, ...r ].sort(), []), e.F(i);
}

function refineYear(e, n) {
  const t = getCalendarEraOrigins(e), o = ar[e.id || ""] || {};
  let {era: r, eraYear: i, year: a} = n;
  if (void 0 !== r || void 0 !== i) {
    if (void 0 === r || void 0 === i) {
      throw new TypeError(io);
    }
    if (!t) {
      throw new RangeError(ro);
    }
    const e = t[o[r] || r];
    if (void 0 === e) {
      throw new RangeError(invalidEra(r));
    }
    const n = eraYearToYear(i, e);
    if (void 0 !== a && a !== n) {
      throw new RangeError(ao);
    }
    a = n;
  } else if (void 0 === a) {
    throw new TypeError(missingYear(t));
  }
  return a;
}

function refineMonth(e, n, t, o) {
  let {month: r, monthCode: i} = n;
  if (void 0 !== i) {
    const n = ((e, n, t, o) => {
      const r = e.L(t), [i, a] = parseMonthCode(n);
      let s = monthCodeNumberToMonth(i, a, r);
      if (a) {
        const n = getCalendarLeapMonthMeta(e);
        if (void 0 === n) {
          throw new RangeError(uo);
        }
        if (n > 0) {
          if (s > n) {
            throw new RangeError(uo);
          }
          if (void 0 === r) {
            if (1 === o) {
              throw new RangeError(uo);
            }
            s--;
          }
        } else {
          if (s !== -n) {
            throw new RangeError(uo);
          }
          if (void 0 === r && 1 === o) {
            throw new RangeError(uo);
          }
        }
      }
      return s;
    })(e, i, t, o);
    if (void 0 !== r && r !== n) {
      throw new RangeError(so);
    }
    r = n, o = 1;
  } else if (void 0 === r) {
    throw new TypeError(co);
  }
  return clampEntity("month", r, 1, e.B(t), o);
}

function refineDay(e, n, t, o, r) {
  return clampProp(n, "day", 1, e.U(o, t), r);
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

function computeDateEssentials(e) {
  const n = ji(e.calendar), [t, o, r] = n.v(e), [i, a] = n.q(t, o);
  return {
    year: t,
    monthCode: formatMonthCode(i, a),
    day: r
  };
}

function qe(e) {
  return xe(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function ye(e, n, t, o, r = l) {
  return _e(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(t))), n(o), e(r));
}

function Zt(n, t, o, r, i = 0, a = 0, s = 0, c = 0, u = 0, f = 0, d = l) {
  return jt(checkIsoDateTimeInBounds(checkIsoDateTimeFields(e(toInteger, zipProps(Tr, [ t, o, r, i, a, s, c, u, f ])))), n(d));
}

function ue(n, t, o, r, i = l) {
  return W(checkIsoDateInBounds(checkIsoDateFields(e(toInteger, {
    isoYear: t,
    isoMonth: o,
    isoDay: r
  }))), n(i));
}

function Qt(e, n, t, o = l, r = 1) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: i,
    isoMonth: a,
    isoDay: toInteger(r)
  })), s);
}

function kt(e, n, t, o = l, r = Br) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(r),
    isoMonth: i,
    isoDay: a
  })), s);
}

function ut(n = 0, t = 0, o = 0, r = 0, i = 0, a = 0) {
  return St(constrainIsoTimeFields(e(toInteger, zipProps(w, [ n, t, o, r, i, a ])), 1));
}

function j(n = 0, t = 0, o = 0, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0, f = 0) {
  return Oe(checkDurationUnits(e(toStrictInteger, zipProps(p, [ n, t, o, r, i, a, s, c, u, f ]))));
}

function Je(e, n, t = l) {
  return _e(e.epochNanoseconds, n, t);
}

function be(e) {
  return xe(e.epochNanoseconds);
}

function yt(e, n) {
  return jt(he(n, e));
}

function fe(e, n) {
  return W(he(n, e));
}

function dt(e, n) {
  return St(he(n, e));
}

function bt(e, n, t, o) {
  const r = ((e, n, t, o) => {
    const r = (e => ei(normalizeOptions(e)))(o);
    return getSingleInstantFor(e(n), t, r);
  })(e, t, n, o);
  return _e(checkEpochNanoInBounds(r), t, n.calendar);
}

function ae(e, n, t, o, r) {
  const i = e(r.timeZone), a = r.plainTime, s = void 0 !== a ? n(a) : void 0, c = t(i);
  let u;
  return u = s ? getSingleInstantFor(c, {
    ...o,
    ...s
  }) : getStartOfDayInstantFor(c, {
    ...o,
    ...Nt
  }), _e(u, i, o.calendar);
}

function ie(e, n = Nt) {
  return jt(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function le(e, n, t) {
  return ((e, n) => {
    const t = refineCalendarFields(e, n, Qo);
    return e.K(t, void 0);
  })(e(n.calendar), t);
}

function se(e, n, t) {
  return ((e, n) => {
    const t = refineCalendarFields(e, n, nr);
    return e._(t);
  })(e(n.calendar), t);
}

function Ht(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, Qo, requireObjectLike(t), Jo))(e(n.calendar), t, o);
}

function Vt(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, nr, requireObjectLike(t), Go))(e(n.calendar), t, o);
}

function $e(e) {
  return xe(checkEpochNanoInBounds(Ge(toStrictInteger(e), Qe)));
}

function He(e) {
  return xe(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function createOptionsTransformer(e, n, t) {
  const o = new Set(t);
  return (r, i) => {
    const a = t && hasAnyPropsByName(r, t);
    if (!hasAnyPropsByName(r = ((e, n) => {
      const t = {};
      for (const o in n) {
        e.has(o) || (t[o] = n[o]);
      }
      return t;
    })(o, r), e)) {
      if (i && a) {
        throw new TypeError("Invalid formatting options");
      }
      r = {
        ...n,
        ...r
      };
    }
    return t && (r.timeZone = si, [ "full", "long" ].includes(r.J) && (r.J = "medium")), 
    r;
  };
}

function Q(e, n = an, t = 0) {
  const [o, , , r] = e;
  return (i, a = Na, ...s) => {
    const c = n(r && r(...s), i, a, o, t), u = c.resolvedOptions();
    return [ c, ...toEpochMillis(e, u, s) ];
  };
}

function an(e, n, t, o, r) {
  if (t = o(t, r), e) {
    if (void 0 !== t.timeZone) {
      throw new TypeError(So);
    }
    t.timeZone = e;
  }
  return new en(n, t);
}

function toEpochMillis(e, n, t) {
  const [, o, r] = e;
  return t.map((e => (e.calendar && ((e, n, t) => {
    if ((t || e !== l) && e !== n) {
      throw new RangeError(lo);
    }
  })(e.calendar, n.calendar, r), o(e, n))));
}

function ge(e, n, t) {
  const o = n.timeZone, r = e(o), i = {
    ...he(n, r),
    ...t || Nt
  };
  let a;
  return a = t ? getMatchingInstantFor(r, i, i.offsetNanoseconds, 2) : getStartOfDayInstantFor(r, i), 
  _e(a, o, n.calendar);
}

function Ot(e, n = Nt) {
  return jt(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function pt(e, n) {
  return {
    ...e,
    calendar: n
  };
}

function Pe(e, n) {
  return {
    ...e,
    timeZone: n
  };
}

function tn(e) {
  const n = Xe();
  return epochNanoToIso(n, e.R(n));
}

function Xe() {
  return Ge(Date.now(), Qe);
}

function Ue() {
  return va || (va = (new en).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, no = "Cannot convert Symbol to string", oo = "Invalid object", numberOutOfRange = (e, n, t, o, r) => r ? numberOutOfRange(e, r[n], r[t], r[o]) : invalidEntity(e, n) + `; must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, forbiddenField = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, noValidFields = e => "No valid fields: " + e.join(), i = "Invalid bag", invalidChoice = (e, n, t) => invalidEntity(e, n) + "; must be " + Object.keys(t).join(), b = "Cannot use valueOf", a = "Invalid calling context", ro = "Forbidden era/eraYear", io = "Mismatching era/eraYear", ao = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, so = "Mismatching month/monthCode", co = "Missing month/monthCode", uo = "Invalid leap month", fo = "Invalid protocol results", c = e => invalidEntity("Calendar", e), lo = "Mismatching Calendars", F = e => invalidEntity("TimeZone", e), mo = "Mismatching TimeZones", po = "Forbidden ICU TimeZone", ho = "Out-of-bounds offset", go = "Out-of-bounds TimeZone gap", Do = "Invalid TimeZone offset", To = "Ambiguous offset", Io = "Out-of-bounds date", Mo = "Out-of-bounds duration", No = "Cannot mix duration signs", yo = "Missing relativeTo", vo = "Cannot use large units", Po = "Required smallestUnit or largestUnit", Eo = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, rn = e => `Cannot format ${e}`, ln = "Mismatching types for formatting", So = "Cannot specify TimeZone", Fo = /*@__PURE__*/ Pt(g, ((e, n) => n)), wo = /*@__PURE__*/ Pt(g, ((e, n, t) => t)), bo = /*@__PURE__*/ Pt(padNumber, 2), Oo = {
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
}, Bo = /*@__PURE__*/ Object.keys(Oo), ko = 864e5, Co = 1e3, Yo = 1e3, Qe = 1e6, Ro = 1e9, Zo = 6e10, zo = 36e11, Uo = 864e11, Ao = [ 1, Yo, Qe, Ro, Zo, zo, Uo ], O = /*@__PURE__*/ Bo.slice(0, 6), qo = /*@__PURE__*/ sortStrings(O), Wo = [ "offset" ], jo = [ "timeZone" ], Lo = /*@__PURE__*/ O.concat(Wo), xo = /*@__PURE__*/ Lo.concat(jo), $o = [ "era", "eraYear" ], Ho = /*@__PURE__*/ $o.concat([ "year" ]), Go = [ "year" ], Vo = [ "monthCode" ], _o = /*@__PURE__*/ [ "month" ].concat(Vo), Jo = [ "day" ], Ko = /*@__PURE__*/ _o.concat(Go), Qo = /*@__PURE__*/ Vo.concat(Go), Xo = /*@__PURE__*/ Jo.concat(Ko), er = /*@__PURE__*/ Jo.concat(_o), nr = /*@__PURE__*/ Jo.concat(Vo), tr = /*@__PURE__*/ wo(O, 0), l = "iso8601", or = "gregory", rr = "japanese", ir = {
  [or]: {
    "gregory-inverse": -1,
    gregory: 0
  },
  [rr]: {
    "japanese-inverse": -1,
    japanese: 0,
    meiji: 1867,
    taisho: 1911,
    showa: 1925,
    heisei: 1988,
    reiwa: 2018
  },
  ethiopic: {
    ethioaa: 0,
    ethiopic: 5500
  },
  coptic: {
    "coptic-inverse": -1,
    coptic: 0
  },
  roc: {
    "roc-inverse": -1,
    roc: 0
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
}, ar = {
  [or]: {
    bce: "gregory-inverse",
    ce: "gregory"
  },
  [rr]: {
    bce: "japanese-inverse",
    ce: "japanese"
  },
  ethiopic: {
    era0: "ethioaa",
    era1: "ethiopic"
  },
  coptic: {
    era0: "coptic-inverse",
    era1: "coptic"
  },
  roc: {
    broc: "roc-inverse",
    minguo: "roc"
  }
}, sr = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, m = /*@__PURE__*/ Pt(requireType, "string"), D = /*@__PURE__*/ Pt(requireType, "boolean"), cr = /*@__PURE__*/ Pt(requireType, "number"), p = /*@__PURE__*/ Bo.map((e => e + "s")), ur = /*@__PURE__*/ sortStrings(p), fr = /*@__PURE__*/ p.slice(0, 6), lr = /*@__PURE__*/ p.slice(6), dr = /*@__PURE__*/ lr.slice(1), mr = /*@__PURE__*/ Fo(p), pr = /*@__PURE__*/ wo(p, 0), hr = /*@__PURE__*/ wo(fr, 0), gr = /*@__PURE__*/ Pt(zeroOutProps, p), w = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], Dr = [ "isoDay", "isoMonth", "isoYear" ], Tr = /*@__PURE__*/ w.concat(Dr), Ir = /*@__PURE__*/ sortStrings(Dr), Mr = /*@__PURE__*/ sortStrings(w), Nr = /*@__PURE__*/ sortStrings(Tr), Nt = /*@__PURE__*/ wo(Mr, 0), yr = /*@__PURE__*/ Pt(zeroOutProps, Tr), vr = 1e8, Pr = vr * ko, Er = [ vr, 0 ], Sr = [ -vr, 0 ], Fr = 275760, wr = -271821, en = Intl.DateTimeFormat, br = "en-GB", Or = 1970, Br = 1972, kr = 12, Cr = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), Yr = /*@__PURE__*/ on(computeJapaneseEraParts, WeakMap), Rr = "smallestUnit", Zr = "unit", zr = "roundingIncrement", Ur = "fractionalSecondDigits", Ar = "relativeTo", qr = "direction", Wr = {
  constrain: 0,
  reject: 1
}, jr = /*@__PURE__*/ Object.keys(Wr), Lr = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, xr = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, $r = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, Hr = {
  auto: 0,
  never: 1,
  critical: 2
}, Gr = {
  auto: 0,
  never: 1
}, Vr = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, _r = {
  previous: -1,
  next: 1
}, Jr = /*@__PURE__*/ Pt(refineUnitOption, Rr), Kr = /*@__PURE__*/ Pt(refineUnitOption, "largestUnit"), Qr = /*@__PURE__*/ Pt(refineUnitOption, Zr), Xr = /*@__PURE__*/ Pt(refineChoiceOption, "overflow", Wr), ei = /*@__PURE__*/ Pt(refineChoiceOption, "disambiguation", Lr), ni = /*@__PURE__*/ Pt(refineChoiceOption, "offset", xr), ti = /*@__PURE__*/ Pt(refineChoiceOption, "calendarName", $r), oi = /*@__PURE__*/ Pt(refineChoiceOption, "timeZoneName", Hr), ri = /*@__PURE__*/ Pt(refineChoiceOption, "offset", Gr), ii = /*@__PURE__*/ Pt(refineChoiceOption, "roundingMode", Vr), Ut = "PlainYearMonth", qt = "PlainMonthDay", G = "PlainDate", x = "PlainDateTime", ft = "PlainTime", z = "ZonedDateTime", Re = "Instant", N = "Duration", ai = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], si = "UTC", ci = 5184e3, ui = /*@__PURE__*/ isoArgsToEpochSec(1847), fi = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), li = /0+$/, he = /*@__PURE__*/ on(_zonedEpochSlotsToIso, WeakMap), di = 2 ** 32 - 1, L = /*@__PURE__*/ on((e => {
  const n = getTimeZoneEssence(e);
  return "object" == typeof n ? new IntlTimeZone(n) : new FixedTimeZone(n || 0);
}));

class FixedTimeZone {
  constructor(e) {
    this.$ = e;
  }
  R() {
    return this.$;
  }
  I(e) {
    return (e => {
      const n = isoToEpochNano({
        ...e,
        ...Nt
      });
      if (!n || Math.abs(n[0]) > 1e8) {
        throw new RangeError(Io);
      }
    })(e), [ isoToEpochNanoWithOffset(e, this.$) ];
  }
  O() {}
}

class IntlTimeZone {
  constructor(e) {
    this.nn = (e => {
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
      const n = on(e), t = on(createSplitTuple);
      let o = ui, r = fi;
      return {
        tn(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        rn: getOffsetSec,
        O(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = ci * i, f = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
          0);
          for (;f(); ) {
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
      const t = hashIntlFormatParts(e, n * Co);
      return isoArgsToEpochSec(parseIntlPartsYear(t), parseInt(t.month), parseInt(t.day), parseInt(t.hour), parseInt(t.minute), parseInt(t.second)) - n;
    })(e));
  }
  R(e) {
    return this.nn.rn((e => epochNanoToSecMod(e)[0])(e)) * Ro;
  }
  I(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.isoHour, o.isoMinute, o.isoSecond), o.isoMillisecond * Qe + o.isoMicrosecond * Yo + o.isoNanosecond ];
    var o;
    return this.nn.tn(n).map((e => checkEpochNanoInBounds(moveBigNano(Ge(e, Ro), t))));
  }
  O(e, n) {
    const [t, o] = epochNanoToSecMod(e), r = this.nn.O(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return Ge(r, Ro);
    }
  }
}

const mi = "([+-])", pi = "(?:[.,](\\d{1,9}))?", hi = `(?:(?:${mi}(\\d{6}))|(\\d{4}))-?(\\d{2})`, gi = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + pi + ")?)?", Di = mi + gi, Ti = hi + "-?(\\d{2})(?:[T ]" + gi + "(Z|" + Di + ")?)?", Ii = "\\[(!?)([^\\]]*)\\]", Mi = `((?:${Ii}){0,9})`, Ni = /*@__PURE__*/ createRegExp(hi + Mi), yi = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + Mi), vi = /*@__PURE__*/ createRegExp(Ti + Mi), Pi = /*@__PURE__*/ createRegExp("T?" + gi + "(?:" + Di + ")?" + Mi), Ei = /*@__PURE__*/ createRegExp(Di), Si = /*@__PURE__*/ new RegExp(Ii, "g"), Fi = /*@__PURE__*/ createRegExp(`${mi}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${pi}H)?(?:(\\d+)${pi}M)?(?:(\\d+)${pi}S)?)?`), wi = /*@__PURE__*/ on((e => new en(br, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), bi = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, Oi = /[^\w\/:+-]+/, Bi = /^M(\d{2})(L?)$/, ki = /*@__PURE__*/ on(createIntlCalendar), Ci = /*@__PURE__*/ on((e => new en(br, {
  calendar: e,
  timeZone: si,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), Yi = {
  P(e, n, t) {
    const o = mt(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += durationFieldsToBigNano(n, 5)[0], i || a) {
      r = ((e, n, t, o, r) => {
        let [i, a, s] = e.v(n);
        if (t) {
          const [n, o] = e.q(i, a);
          i += t, a = monthCodeNumberToMonth(n, o, e.L(i)), a = clampEntity("month", a, 1, e.B(i), r);
        }
        return o && ([i, a] = e.un(i, a, o)), s = clampEntity("day", s, 1, e.U(i, a), r), 
        e.p(i, a, s);
      })(this, e, i, a, o);
    } else {
      if (!s && !c) {
        return e;
      }
      r = isoToEpochMilli(e);
    }
    if (void 0 === r) {
      throw new RangeError(Io);
    }
    return r += (7 * s + c) * ko, checkIsoDateInBounds(epochMilliToIso(r));
  },
  N(e, n, t) {
    if (t <= 7) {
      let o = 0, r = diffDays({
        ...e,
        ...Nt
      }, {
        ...n,
        ...Nt
      });
      return 7 === t && ([o, r] = divModTrunc(r, 7)), {
        ...pr,
        weeks: o,
        days: r
      };
    }
    const o = this.v(e), r = this.v(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      let s = r - n, c = i - t, u = a - o;
      if (s || c) {
        const f = Math.sign(s || c);
        let l = e.U(r, i), d = 0;
        if (Math.sign(u) === -f) {
          const o = l;
          [r, i] = e.un(r, i, -f), s = r - n, c = i - t, l = e.U(r, i), d = f < 0 ? -o : l;
        }
        if (u = a - Math.min(o, l) + d, s) {
          const [o, a] = e.q(n, t), [u, l] = e.q(r, i);
          if (c = u - o || Number(l) - Number(a), Math.sign(c) === -f) {
            const t = f < 0 && -e.B(r);
            s = (r -= f) - n, c = i - monthCodeNumberToMonth(o, a, e.L(r)) + (t || e.B(r));
          }
        }
      }
      return [ s, c, u ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.cn(i, o[0]), i = 0), {
      ...pr,
      years: i,
      months: a,
      days: s
    };
  },
  F(e, n) {
    const t = mt(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return W(checkIsoDateInBounds(this.V(o, r, i)), this.id || l);
  },
  K(e, n) {
    const t = mt(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.V(o, r, 1)), this.id || l);
  },
  _(e, n) {
    const t = mt(n);
    let o, r, i, a = void 0 !== e.eraYear || void 0 !== e.year ? refineYear(this, e) : void 0;
    const s = !this.id;
    if (void 0 === a && s && (a = Br), void 0 !== a) {
      const n = refineMonth(this, e, a, t);
      o = refineDay(this, e, n, a, t);
      const s = this.L(a);
      r = monthToMonthCodeNumber(n, s), i = n === s;
    } else {
      if (void 0 === e.monthCode) {
        throw new TypeError(co);
      }
      if ([r, i] = parseMonthCode(e.monthCode), this.id && this.id !== or && this.id !== rr) {
        if (this.id && "coptic" === computeCalendarIdBase(this.id) && 0 === t) {
          const n = i || 13 !== r ? 30 : 6;
          o = e.day, o = clampNumber(o, 1, n);
        } else if (this.id && "chinese" === computeCalendarIdBase(this.id) && 0 === t) {
          const n = !i || 1 !== r && 9 !== r && 10 !== r && 11 !== r && 12 !== r ? 30 : 29;
          o = e.day, o = clampNumber(o, 1, n);
        } else {
          o = e.day;
        }
      } else {
        o = refineDay(this, e, refineMonth(this, e, Br, t), Br, t);
      }
    }
    const c = this.G(r, i, o);
    if (!c) {
      throw new RangeError("Cannot guess year");
    }
    const [u, f] = c;
    return createPlainMonthDaySlots(checkIsoDateInBounds(this.V(u, f, o)), this.id || l);
  },
  fields(e) {
    return getCalendarEraOrigins(this) && e.includes("year") ? [ ...e, ...$o ] : e;
  },
  k(e, n) {
    const t = Object.assign(Object.create(null), e);
    return spliceFields(t, n, _o), getCalendarEraOrigins(this) && (spliceFields(t, n, Ho), 
    this.id === rr && spliceFields(t, n, er, $o)), t;
  },
  inLeapYear(e) {
    const [n] = this.v(e);
    return this.sn(n);
  },
  monthsInYear(e) {
    const [n] = this.v(e);
    return this.B(n);
  },
  daysInMonth(e) {
    const [n, t] = this.v(e);
    return this.U(n, t);
  },
  daysInYear(e) {
    const [n] = this.v(e);
    return this.fn(n);
  },
  dayOfYear: computeNativeDayOfYear,
  era(e) {
    return this.hn(e)[0];
  },
  eraYear(e) {
    return this.hn(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.v(e), [o, r] = this.q(n, t);
    return formatMonthCode(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, Ri = {
  v: computeIsoDateParts,
  hn: computeIsoEraParts,
  q: computeIsoMonthCodeParts
}, Zi = {
  dayOfYear: computeNativeDayOfYear,
  v: computeIsoDateParts,
  p: isoArgsToEpochMilli
}, zi = /*@__PURE__*/ Object.assign({}, Zi, {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  m(e) {
    function computeWeekShift(e) {
      return (7 - e < n ? 7 : 0) - e;
    }
    function computeWeeksInYear(e) {
      const n = computeIsoDaysInYear(f + e), t = e || 1, o = computeWeekShift(modFloor(a + n * t, 7));
      return c = (n + (o - s) * t) / 7;
    }
    const n = this.id ? 1 : 4, t = computeIsoDayOfWeek(e), o = this.dayOfYear(e), r = modFloor(t - 1, 7), i = o - 1, a = modFloor(r - i, 7), s = computeWeekShift(a);
    let c, u = Math.floor((i - s) / 7) + 1, f = e.isoYear;
    return u ? u > computeWeeksInYear(0) && (u = 1, f++) : (u = computeWeeksInYear(-1), 
    f--), [ u, f, c ];
  }
}), Ui = /*@__PURE__*/ Object.assign({}, Yi, zi, {
  v: computeIsoDateParts,
  hn: computeIsoEraParts,
  q: computeIsoMonthCodeParts,
  G(e, n) {
    if (!n) {
      return [ Br, e ];
    }
  },
  sn: computeIsoInLeapYear,
  L() {},
  B: computeIsoMonthsInYear,
  cn: e => e * kr,
  U: computeIsoDaysInMonth,
  fn: computeIsoDaysInYear,
  V: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  p: isoArgsToEpochMilli,
  un: (e, n, t) => (e += divTrunc(t, kr), (n += modTrunc(t, kr)) < 1 ? (e--, n += kr) : n > kr && (e++, 
  n -= kr), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), Ai = {
  v: computeIntlDateParts,
  hn: computeIntlEraParts,
  q: computeIntlMonthCodeParts
}, qi = {
  dayOfYear: computeNativeDayOfYear,
  v: computeIntlDateParts,
  p: computeIntlEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  m() {
    return [];
  }
}, Wi = /*@__PURE__*/ Object.assign({}, Yi, qi, {
  v: computeIntlDateParts,
  hn: computeIntlEraParts,
  q: computeIntlMonthCodeParts,
  G(e, n, t) {
    const o = this.id && "chinese" === computeCalendarIdBase(this.id) ? ((e, n, t) => {
      if (n) {
        switch (e) {
         case 1:
          return 1651;

         case 2:
          return t < 30 ? 1947 : 1765;

         case 3:
          return t < 30 ? 1966 : 1955;

         case 4:
          return t < 30 ? 1963 : 1944;

         case 5:
          return t < 30 ? 1971 : 1952;

         case 6:
          return t < 30 ? 1960 : 1941;

         case 7:
          return t < 30 ? 1968 : 1938;

         case 8:
          return t < 30 ? 1957 : 1718;

         case 9:
          return 1832;

         case 10:
          return 1870;

         case 11:
          return 1814;

         case 12:
          return 1890;
        }
      }
      return 1972;
    })(e, n, t) : Br;
    let [r, i, a] = computeIntlDateParts.call(this, {
      isoYear: o,
      isoMonth: kr,
      isoDay: 31
    });
    const s = computeIntlLeapMonth.call(this, r), c = i === s;
    1 === (compareNumbers(e, monthToMonthCodeNumber(i, s)) || compareNumbers(Number(n), Number(c)) || compareNumbers(t, a)) && r--;
    for (let o = 0; o < 100; o++) {
      const i = r - o, a = computeIntlLeapMonth.call(this, i), s = monthCodeNumberToMonth(e, n, a);
      if (n === (s === a) && t <= computeIntlDaysInMonth.call(this, i, s)) {
        return [ i, s ];
      }
    }
  },
  sn(e) {
    const n = computeIntlDaysInYear.call(this, e);
    return n > computeIntlDaysInYear.call(this, e - 1) && n > computeIntlDaysInYear.call(this, e + 1);
  },
  L: computeIntlLeapMonth,
  B: computeIntlMonthsInYear,
  cn(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  U: computeIntlDaysInMonth,
  fn: computeIntlDaysInYear,
  V(e, n, t) {
    return epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t));
  },
  p: computeIntlEpochMilli,
  un(e, n, t) {
    if (t) {
      if (n += t, !Number.isSafeInteger(n)) {
        throw new RangeError(Io);
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
    return this.h(e).year;
  },
  month(e) {
    const {year: n, o: t} = this.h(e), {u: o} = this.l(n);
    return o[t] + 1;
  },
  day(e) {
    return this.h(e).day;
  }
}), ji = /*@__PURE__*/ createNativeOpsCreator(Ri, Ai), C = /*@__PURE__*/ createNativeOpsCreator(Ui, Wi), Li = {
  ...{
    era: toStringViaPrimitive,
    eraYear: toInteger,
    year: toInteger,
    month: toPositiveInteger,
    monthCode(e) {
      const n = toStringViaPrimitive(e);
      return parseMonthCode(n), n;
    },
    day: toPositiveInteger
  },
  .../*@__PURE__*/ wo(O, toInteger),
  .../*@__PURE__*/ wo(p, toStrictInteger),
  offset(e) {
    const n = toStringViaPrimitive(e);
    return parseOffsetNano(n), n;
  }
}, xi = /*@__PURE__*/ Pt(remapProps, O, w), $i = /*@__PURE__*/ Pt(remapProps, w, O), Hi = "numeric", Gi = [ "timeZoneName" ], Vi = {
  month: Hi,
  day: Hi
}, _i = {
  year: Hi,
  month: Hi
}, Ji = /*@__PURE__*/ Object.assign({}, _i, {
  day: Hi
}), Ki = {
  hour: Hi,
  minute: Hi,
  second: Hi
}, Qi = /*@__PURE__*/ Object.assign({}, Ji, Ki), Xi = /*@__PURE__*/ Object.assign({}, Qi, {
  timeZoneName: "short"
}), ea = /*@__PURE__*/ Object.keys(_i), na = /*@__PURE__*/ Object.keys(Vi), ta = /*@__PURE__*/ Object.keys(Ji), oa = /*@__PURE__*/ Object.keys(Ki), ra = [ "dateStyle" ], ia = /*@__PURE__*/ ea.concat(ra), aa = /*@__PURE__*/ na.concat(ra), sa = /*@__PURE__*/ ta.concat(ra, [ "weekday" ]), ca = /*@__PURE__*/ oa.concat([ "dayPeriod", "timeStyle", "fractionalSecondDigits" ]), ua = /*@__PURE__*/ sa.concat(ca), fa = /*@__PURE__*/ Gi.concat(ca), la = /*@__PURE__*/ Gi.concat(sa), da = /*@__PURE__*/ Gi.concat([ "day", "weekday" ], ca), ma = /*@__PURE__*/ Gi.concat([ "year", "weekday" ], ca), pa = /*@__PURE__*/ createOptionsTransformer(ua, Qi), ha = /*@__PURE__*/ createOptionsTransformer(ua, Xi), ga = /*@__PURE__*/ createOptionsTransformer(ua, Qi, Gi), Da = /*@__PURE__*/ createOptionsTransformer(sa, Ji, fa), Ta = /*@__PURE__*/ createOptionsTransformer(ca, Ki, la), Ia = /*@__PURE__*/ createOptionsTransformer(ia, _i, da), Ma = /*@__PURE__*/ createOptionsTransformer(aa, Vi, ma), Na = {}, ya = /*@__PURE__*/ new en(void 0, {
  calendar: l
}).resolvedOptions().calendar === l, U = [ pa, I ], ot = [ ha, I, 0, (e, n) => {
  const t = e.timeZone;
  if (n && n.timeZone !== t) {
    throw new RangeError(mo);
  }
  return t;
} ], X = [ ga, isoToEpochMilli ], _ = [ Da, isoToEpochMilli ], tt = [ Ta, e => isoTimeFieldsToNano(e) / Qe ], et = [ Ia, isoToEpochMilli, ya ], nt = [ Ma, isoToEpochMilli, ya ];

let va;

export { N as DurationBranding, Re as InstantBranding, G as PlainDateBranding, x as PlainDateTimeBranding, qt as PlainMonthDayBranding, ft as PlainTimeBranding, Ut as PlainYearMonthBranding, en as RawDateTimeFormat, z as ZonedDateTimeBranding, Y as absDuration, E as addDurations, Pt as bindArgs, K as compareDurations, Ke as compareInstants, te as compareIsoDateFields, Yt as compareIsoDateTimeFields, Dt as compareIsoTimeFields, Be as compareZonedDateTimes, Te as computeZonedHoursInDay, ve as computeZonedStartOfDay, j as constructDurationSlots, qe as constructInstantSlots, ue as constructPlainDateSlots, Zt as constructPlainDateTimeSlots, kt as constructPlainMonthDaySlots, ut as constructPlainTimeSlots, Qt as constructPlainYearMonthSlots, ye as constructZonedDateTimeSlots, Oe as createDurationSlots, an as createFormatForPrep, Q as createFormatPrepper, t as createGetterDescriptors, xe as createInstantSlots, r as createNameDescriptors, C as createNativeStandardOps, W as createPlainDateSlots, jt as createPlainDateTimeSlots, St as createPlainTimeSlots, n as createPropDescriptors, o as createStringTagDescriptors, _e as createZonedDateTimeSlots, _ as dateConfig, X as dateTimeConfig, Ee as diffInstants, It as diffPlainDateTimes, oe as diffPlainDates, it as diffPlainTimes, zt as diffPlainYearMonth, we as diffZonedDateTimes, p as durationFieldNamesAsc, A as durationWithFields, $e as epochMilliToInstant, He as epochNanoToInstant, b as forbiddenValueOf, k as formatDurationIso, ke as formatInstantIso, Se as formatOffsetNano, ce as formatPlainDateIso, Ft as formatPlainDateTimeIso, Jt as formatPlainMonthDayIso, ct as formatPlainTimeIso, Kt as formatPlainYearMonthIso, Fe as formatZonedDateTimeIso, Xe as getCurrentEpochNano, tn as getCurrentIsoDateTime, Ue as getCurrentTimeZoneId, y as getDurationBlank, I as getEpochMilli, v as getEpochNano, U as instantConfig, Je as instantToZonedDateTime, Ve as instantsEqual, i as invalidBag, c as invalidCalendar, a as invalidCallingContext, rn as invalidFormatType, F as invalidTimeZone, s as isObjectLike, l as isoCalendarId, Nt as isoTimeFieldDefaults, w as isoTimeFieldNamesAsc, g as mapPropNames, e as mapProps, on as memoize, ln as mismatchingFormatTypes, nt as monthDayConfig, Ye as moveInstant, ne as movePlainDate, wt as movePlainDateTime, at as movePlainTime, Gt as movePlainYearMonth, pe as moveZonedDateTime, Qe as nanoInMilli, B as negateDuration, Ge as numberToBigNano, f as parseCalendarId, R as parseDuration, We as parseInstant, de as parsePlainDate, Bt as parsePlainDateTime, xt as parsePlainMonthDay, ht as parsePlainTime, _t as parsePlainYearMonth, H as parseRelativeToSlots, Z as parseTimeZoneId, Ae as parseZonedDateTime, bt as plainDateTimeToZonedDateTime, gt as plainDateTimeWithFields, Ot as plainDateTimeWithPlainTime, Ct as plainDateTimesEqual, ie as plainDateToPlainDateTime, se as plainDateToPlainMonthDay, le as plainDateToPlainYearMonth, ae as plainDateToZonedDateTime, ee as plainDateWithFields, re as plainDatesEqual, Vt as plainMonthDayToPlainDate, Et as plainMonthDayWithFields, Lt as plainMonthDaysEqual, rt as plainTimeWithFields, st as plainTimesEqual, Ht as plainYearMonthToPlainDate, Wt as plainYearMonthWithFields, $t as plainYearMonthsEqual, nn as pluckProps, L as queryNativeTimeZone, Mt as refineCalendarId, Me as refineDirectionOptions, q as refineDurationBag, $ as refineMaybeZonedDateTimeBag, mt as refineOverflowOptions, me as refinePlainDateBag, At as refinePlainDateTimeBag, Rt as refinePlainMonthDayBag, Tt as refinePlainTimeBag, Xt as refinePlainYearMonthBag, Ze as refineTimeZoneId, Ne as refineZonedDateTimeBag, je as refineZonedFieldOptions, D as requireBoolean, T as requireInteger, S as requireIntegerOrUndefined, ze as requireNumberIsInteger, h as requirePositiveInteger, P as requirePositiveIntegerOrUndefined, m as requireString, d as requireStringOrUndefined, u as resolveCalendarId, M as resolveTimeZoneId, V as roundDuration, Le as roundInstant, vt as roundPlainDateTime, lt as roundPlainTime, Ie as roundZonedDateTime, pt as slotsWithCalendarId, Pe as slotsWithTimeZoneId, tt as timeConfig, O as timeFieldNamesAsc, J as totalDuration, et as yearMonthConfig, ot as zonedConfig, be as zonedDateTimeToInstant, fe as zonedDateTimeToPlainDate, yt as zonedDateTimeToPlainDateTime, dt as zonedDateTimeToPlainTime, De as zonedDateTimeWithFields, ge as zonedDateTimeWithPlainTime, Ce as zonedDateTimesEqual, he as zonedEpochSlotsToIso };
