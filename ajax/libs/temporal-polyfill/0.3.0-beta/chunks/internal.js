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

function en(e, n = Map) {
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

function P(e, n, t) {
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

function tn(e, n) {
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

function Dt(e, ...n) {
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
    const n = e[t[i]], a = zo[i], s = Zo / a, [c, u] = divModTrunc(n, s);
    o += u * a, r += c;
  }
  const [i, a] = divModTrunc(o, Zo);
  return [ r + i, a ];
}

function nanoToGivenFields(e, n, t) {
  const o = {};
  for (let r = n; r >= 0; r--) {
    const n = zo[r];
    o[t[r]] = divTrunc(e, n), e = modTrunc(e, n);
  }
  return o;
}

function m(e) {
  if (void 0 !== e) {
    return f(e);
  }
}

function h(e) {
  if (void 0 !== e) {
    return T(e);
  }
}

function d(e) {
  if (void 0 !== e) {
    return S(e);
  }
}

function T(e) {
  return requireNumberIsPositive(S(e));
}

function S(e) {
  return We(ar(e));
}

function requirePropDefined(e, n) {
  if (null == n) {
    throw new RangeError(missingField(e));
  }
  return n;
}

function requireObjectLike(e) {
  if (!s(e)) {
    throw new TypeError(no);
  }
  return e;
}

function requireType(e, n, t = e) {
  if (typeof n !== e) {
    throw new TypeError(invalidEntity(t, n));
  }
  return n;
}

function We(e, n = "number") {
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
    throw new TypeError(eo);
  }
  return String(e);
}

function toStringViaPrimitive(e, n) {
  return s(e) ? String(e) : f(e, n);
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
  return We(toNumber(e, n), n);
}

function toPositiveInteger(e, n) {
  return requireNumberIsPositive(toInteger(e, n), n);
}

function createBigNano(e, n) {
  let [t, o] = divModTrunc(n, Zo), r = e + t;
  const i = Math.sign(r);
  return i && i === -Math.sign(o) && (r -= i, o += i * Zo), [ r, o ];
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
  const t = BigInt(Zo / n);
  return [ Number(e / t), Number(e % t) * n ];
}

function xe(e, n = 1) {
  const t = Zo / n, [o, r] = divModTrunc(e, t);
  return [ o, r * n ];
}

function bigNanoToNumber(e, n = 1, t) {
  const [o, r] = e, [i, a] = divModTrunc(r, n);
  return o * (Zo / n) + (i + (t ? a / n : 0));
}

function divModBigNano(e, n, t = divModFloor) {
  const [o, r] = e, [i, a] = t(r, n);
  return [ o * (Zo / n) + i, a ];
}

function checkIsoYearMonthInBounds(e) {
  return clampProp(e, "isoYear", Sr, Er, 1), e.isoYear === Sr ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Er && clampProp(e, "isoMonth", 1, 9, 1), 
  e;
}

function checkIsoDateInBounds(e) {
  return checkIsoDateTimeInBounds({
    ...e,
    ...yt,
    u: 12
  }), e;
}

function checkIsoDateTimeInBounds(e) {
  const n = clampProp(e, "isoYear", Sr, Er, 1), t = n === Sr ? 1 : n === Er ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    l: e.l - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || bigNanoOutside(e, Pr, vr)) {
    throw new RangeError(Do);
  }
  return e;
}

function isoTimeFieldsToNano(e) {
  return givenFieldsToBigNano(e, 5, O)[1];
}

function nanoToIsoTimeAndDay(e) {
  const [n, t] = divModFloor(e, Zo);
  return [ nanoToGivenFields(t, 5, O), n ];
}

function epochNanoToSecMod(e) {
  return divModBigNano(e, Co);
}

function isoToEpochMilli(e) {
  return isoArgsToEpochMilli(e.isoYear, e.isoMonth, e.isoDay, e.u, e.m, e.p, e.h);
}

function isoToEpochNano(e) {
  const n = isoToEpochMilli(e);
  if (void 0 !== n) {
    const [t, o] = divModTrunc(n, Oo);
    return [ t, o * He + (e.I || 0) * ko + (e.l || 0) ];
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
  return isoArgsToEpochMilli(...e) / Bo;
}

function isoArgsToEpochMilli(...e) {
  const [n, t] = isoToLegacyDate(...e), o = n.valueOf();
  if (!isNaN(o)) {
    return o - t * Oo;
  }
}

function isoToLegacyDate(e, n = 1, t = 1, o = 0, r = 0, i = 0, a = 0) {
  const s = e === Sr ? 1 : e === Er ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function epochNanoToIso(e, n) {
  let [t, o] = moveBigNano(e, n);
  o < 0 && (o += Zo, t -= 1);
  const [r, i] = divModFloor(o, He), [a, s] = divModFloor(i, ko);
  return epochMilliToIso(t * Oo + r, a, s);
}

function epochMilliToIso(e, n = 0, t = 0) {
  const o = Math.ceil(Math.max(0, Math.abs(e) - yr) / Oo) * Math.sign(e), r = new Date(e - o * Oo);
  return zipProps(gr, [ r.getUTCFullYear(), r.getUTCMonth() + 1, r.getUTCDate() + o, r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds(), n, t ]);
}

function hashIntlFormatParts(e, n) {
  if (n < -yr) {
    throw new RangeError("BAD!");
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
  return Or;
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
  return this.id === nr ? (({isoYear: e}) => e < 1 ? [ "gregory-inverse", 1 - e ] : [ "gregory", e ])(e) : this.id === tr ? kr(e) : [];
}

function computeJapaneseEraParts(e) {
  const n = isoToEpochMilli(e);
  if (n < Br) {
    const {isoYear: n} = e;
    return n < 1 ? [ "japanese-inverse", 1 - n ] : [ "japanese", n ];
  }
  const t = hashIntlFormatParts(Bi(tr), n), {era: o, eraYear: r} = parseIntlYear(t, tr);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(hr, e, constrainIsoDateFields(e));
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
  return zipProps(O, [ clampProp(e, "isoHour", 0, 23, n), clampProp(e, "isoMinute", 0, 59, n), clampProp(e, "isoSecond", 0, 59, n), clampProp(e, "isoMillisecond", 0, 999, n), clampProp(e, "isoMicrosecond", 0, 999, n), clampProp(e, "isoNanosecond", 0, 999, n) ]);
}

function ut(e) {
  return void 0 === e ? 0 : Kr(requireObjectLike(e));
}

function Ze(e, n = 0) {
  e = normalizeOptions(e);
  const t = Qr(e), o = Xr(e, n);
  return [ Kr(e), o, t ];
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = _r(n, o, r), s = parseRoundingIncInteger(n), c = oi(n, i);
  const u = Vr(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundingOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeOptionsOrString(e, Cr));
  const r = oi(e, 7);
  let i = Vr(e, n);
  return i = requirePropDefined(Cr, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return ei(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function be(e) {
  const n = normalizeOptionsOrString(e, Ar), t = refineChoiceOption(Ar, Gr, n, 0);
  if (!t) {
    throw new RangeError("BAD!");
  }
  return t;
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ oi(e, 4), ...refineSmallestUnitAndSubsecDigits(Vr(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ zo[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[Rr];
  return void 0 === n ? 1 : toInteger(n, Rr);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? Zo : zo[n + 1];
  if (r) {
    const t = zo[n];
    if (r % ((e = clampEntity(Rr, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity(Rr, e));
    }
  } else {
    e = clampEntity(Rr, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[Zr];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(Zr, n));
    }
    n = clampEntity(Zr, Math.floor(n), 0, 9, 1);
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
    overflow: qr[e]
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
  let a = wo[i];
  if (void 0 === a && (a = fr[i]), void 0 === a) {
    throw new RangeError(invalidChoice(e, i, wo));
  }
  return clampEntity(e, a, o, t, 1, bo), a;
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
    throw new RangeError(vo);
  }
}

function qe(e) {
  return {
    branding: ke,
    epochNanoseconds: e
  };
}

function Ue(e, n, t) {
  return {
    branding: W,
    calendar: t,
    timeZone: n,
    epochNanoseconds: e
  };
}

function Zt(e, n = e.calendar) {
  return {
    branding: q,
    calendar: n,
    ...tn(Ir, e)
  };
}

function R(e, n = e.calendar) {
  return {
    branding: x,
    calendar: n,
    ...tn(Dr, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: Kt,
    calendar: n,
    ...tn(Dr, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: Jt,
    calendar: n,
    ...tn(Dr, e)
  };
}

function mt(e) {
  return {
    branding: ct,
    ...tn(Tr, e)
  };
}

function ge(e) {
  return {
    branding: y,
    sign: computeDurationSign(e),
    ...tn(sr, e)
  };
}

function w(e) {
  return divModBigNano(e.epochNanoseconds, He)[0];
}

function I(e) {
  return ((e, n = 1) => {
    const [t, o] = e, r = Math.floor(o / n), i = Zo / n;
    return BigInt(t) * BigInt(i) + BigInt(r);
  })(e.epochNanoseconds);
}

function extractEpochNano(e) {
  return e.epochNanoseconds;
}

function L(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeOptionsOrString(e, Yr))[zr]);
    let o = Jr(e);
    return o = requirePropDefined(Yr, o), [ o, t ];
  })(r, e), c = Math.max(a, i);
  if (!s && isUniformUnit(c, s)) {
    return totalDayTimeDuration(o, a);
  }
  if (!s) {
    throw new RangeError(Mo);
  }
  if (!o.sign) {
    return 0;
  }
  const [u, l, f] = createMarkerSystem(n, t, s), d = createMarkerToEpochNano(f), m = createMoveMarker(f), p = createDiffMarkers(f), h = m(l, u, o);
  isZonedEpochSlots(s) || (checkIsoDateTimeInBounds(u), checkIsoDateTimeInBounds(h));
  const D = p(l, u, h, a);
  return isUniformUnit(a, s) ? totalDayTimeDuration(D, a) : ((e, n, t, o, r, i, a) => {
    const s = computeDurationSign(e), [c, u] = clampRelativeDuration(o, pr(t, e), t, s, r, i, a), l = computeEpochNanoFrac(n, c, u);
    return e[g[t]] + l * s;
  })(D, d(h), a, l, u, d, m);
}

function totalDayTimeDuration(e, n) {
  return bigNanoToNumber(durationFieldsToBigNano(e), zo[n], 1);
}

function clampRelativeDuration(e, n, t, o, r, i, a) {
  const s = g[t], c = {
    ...n,
    [s]: n[s] + o
  }, u = a(e, r, n), l = a(e, r, c);
  return [ i(u), i(l) ];
}

function computeEpochNanoFrac(e, n, t) {
  const o = bigNanoToNumber(diffBigNanos(n, t));
  if (!o) {
    throw new RangeError(co);
  }
  return bigNanoToNumber(diffBigNanos(n, e)) / o;
}

function Ye(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5, 1);
  return qe(roundBigNano(e.epochNanoseconds, t, o, r, 1));
}

function Oe(e, n, t) {
  let {epochNanoseconds: o, timeZone: r, calendar: i} = n;
  const [a, s, c] = refineRoundingOptions(t);
  if (0 === a && 1 === s) {
    return n;
  }
  const u = e(r);
  if (6 === a) {
    o = ((e, n, t, o) => {
      const r = Se(t, n), [i, a] = e(r), s = t.epochNanoseconds, c = getStartOfDayInstantFor(n, i), u = getStartOfDayInstantFor(n, a);
      if (bigNanoOutside(s, c, u)) {
        throw new RangeError(co);
      }
      return roundWithMode(computeEpochNanoFrac(s, c, u), o) ? u : c;
    })(computeDayInterval, u, n, c);
  } else {
    const e = u.N(o);
    o = getMatchingInstantFor(u, roundDateTime(epochNanoToIso(o, e), a, s, c), e, 2, 0, 1);
  }
  return Ue(o, r, i);
}

function wt(e, n) {
  return Zt(roundDateTime(e, ...refineRoundingOptions(n)), e.calendar);
}

function at(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5);
  var i;
  return mt((i = r, roundTimeToNano(e, computeNanoInc(t, o), i)[0]));
}

function de(e, n) {
  const t = e(n.timeZone), o = Se(n, t), [r, i] = computeDayInterval(o), a = bigNanoToNumber(diffBigNanos(getStartOfDayInstantFor(t, r), getStartOfDayInstantFor(t, i)), Ro, 1);
  if (a <= 0) {
    throw new RangeError(co);
  }
  return a;
}

function we(e, n) {
  const {timeZone: t, calendar: o} = n, r = ((e, n, t) => getStartOfDayInstantFor(n, e(Se(t, n))))(computeDayFloor, e(t), n);
  return Ue(r, t, o);
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
  return roundByInc(e, Yo, 7);
}

function computeNanoInc(e, n) {
  return zo[e] * n;
}

function computeDayInterval(e) {
  const n = computeDayFloor(e);
  return [ n, moveByDays(n, 1) ];
}

function computeDayFloor(e) {
  return Mr(6, e);
}

function roundDayTimeDurationByInc(e, n, t) {
  const o = Math.min(getMaxDurationUnit(e), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(e, o), n, t), o);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  if (0 === o && 1 === r) {
    return e;
  }
  const l = isUniformUnit(o, s) ? isZonedEpochSlots(s) && o < 6 && t >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [f, d, m] = l(e, n, t, o, r, i, a, s, c, u);
  return m && 7 !== o && (f = ((e, n, t, o, r, i, a, s) => {
    const c = computeDurationSign(e);
    for (let u = o + 1; u <= t; u++) {
      if (7 === u && 7 !== t) {
        continue;
      }
      const o = pr(u, e);
      o[g[u]] += c;
      const l = bigNanoToNumber(diffBigNanos(a(s(r, i, o)), n));
      if (l && Math.sign(l) !== c) {
        break;
      }
      e = o;
    }
    return e;
  })(f, d, t, Math.max(6, o), a, s, c, u)), f;
}

function roundBigNano(e, n, t, o, r) {
  if (6 === n) {
    const n = (e => e[0] + e[1] / Zo)(e);
    return [ roundByInc(n, t, o), 0 ];
  }
  return roundBigNanoByInc(e, computeNanoInc(n, t), o, r);
}

function roundBigNanoByInc(e, n, t, o) {
  let [r, i] = e;
  o && i < 0 && (i += Zo, r -= 1);
  const [a, s] = divModFloor(roundByInc(i, n, t), Zo);
  return createBigNano(r + a, s);
}

function roundByInc(e, n, t) {
  return roundWithMode(e / n, t) * n;
}

function roundWithMode(e, n) {
  return ri[n](e);
}

function nudgeDayTimeDuration(e, n, t, o, r, i) {
  const a = computeDurationSign(e), s = durationFieldsToBigNano(e), c = roundBigNano(s, o, r, i), u = diffBigNanos(s, c), l = Math.sign(c[0] - s[0]) === a, f = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...f
  }, addBigNanos(n, u), l ];
}

function nudgeZonedTimeDuration(e, n, t, o, r, i, a, s, c, u) {
  const l = computeDurationSign(e) || 1, f = bigNanoToNumber(durationFieldsToBigNano(e, 5)), d = computeNanoInc(o, r);
  let m = roundByInc(f, d, i);
  const [p, h] = clampRelativeDuration(a, {
    ...e,
    ...mr
  }, 6, l, s, c, u), g = m - bigNanoToNumber(diffBigNanos(p, h));
  let D = 0;
  g && Math.sign(g) !== l ? n = moveBigNano(p, m) : (D += l, m = roundByInc(g, d, i), 
  n = moveBigNano(h, m));
  const T = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...T,
    days: e.days + D
  }, n, Boolean(D) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  const l = computeDurationSign(e), f = g[o], d = pr(o, e);
  7 === o && (e = {
    ...e,
    weeks: e.weeks + Math.trunc(e.days / 7)
  });
  const m = divTrunc(e[f], r) * r;
  d[f] = m;
  const [p, h] = clampRelativeDuration(a, d, o, r * l, s, c, u), D = m + computeEpochNanoFrac(n, p, h) * l * r, T = roundByInc(D, r, i), I = Math.sign(T - D) === l;
  return d[f] = T, [ d, I ? h : p, I ];
}

function Ve(e, n, t, o) {
  const [r, i, a, s] = (e => {
    const n = refineTimeDisplayTuple(e = normalizeOptions(e));
    return [ e.timeZone, ...n ];
  })(o), c = void 0 !== r;
  return ((e, n, t, o, r, i) => {
    t = roundBigNanoByInc(t, r, o, 1);
    const a = n.N(t);
    return formatIsoDateTimeFields(epochNanoToIso(t, a), i) + (e ? me(roundToMinute(a)) : "Z");
  })(c, n(c ? e(r) : ii), t.epochNanoseconds, i, a, s);
}

function Ce(e, n, t) {
  const [o, r, i, a, s, c] = (e => {
    e = normalizeOptions(e);
    const n = ei(e), t = refineSubsecDigits(e), o = ti(e), r = oi(e, 4), i = Vr(e, 4);
    return [ n, ni(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t);
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundBigNanoByInc(o, c, s, 1);
    const l = e(t).N(o);
    return formatIsoDateTimeFields(epochNanoToIso(o, l), u) + me(roundToMinute(l), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + e + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, o, r, i, a, s, c);
}

function Ct(e, n) {
  const [t, o, r, i] = (e => (e = normalizeOptions(e), [ ei(e), ...refineTimeDisplayTuple(e) ]))(n);
  return a = e.calendar, s = t, c = i, formatIsoDateTimeFields(roundDateTimeToNano(e, r, o), c) + formatCalendar(a, s);
  var a, s, c;
}

function le(e, n) {
  return t = e.calendar, o = e, r = refineDateDisplayOptions(n), formatIsoDateFields(o) + formatCalendar(t, r);
  var t, o, r;
}

function $t(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoYearMonthFields, e, refineDateDisplayOptions(n));
}

function Lt(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoMonthDayFields, e, refineDateDisplayOptions(n));
}

function lt(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n);
  return i = r, formatIsoTimeFields(roundTimeToNano(e, o, t)[0], i);
  var i;
}

function V(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n, 3);
  return o > 1 && checkDurationUnits(e = {
    ...e,
    ...roundDayTimeDurationByInc(e, o, t)
  }), ((e, n) => {
    const {sign: t} = e, o = -1 === t ? negateDurationFields(e) : e, {hours: r, minutes: i} = o, [a, s] = divModBigNano(durationFieldsToBigNano(o, 3), Co, divModTrunc);
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
  return formatIsoYearMonthFields(e) + "-" + Fo(e.isoDay);
}

function formatIsoYearMonthFields(e) {
  const {isoYear: n} = e;
  return (n < 0 || n > 9999 ? getSignStr(n) + padNumber(6, Math.abs(n)) : padNumber(4, n)) + "-" + Fo(e.isoMonth);
}

function formatIsoMonthDayFields(e) {
  return Fo(e.isoMonth) + "-" + Fo(e.isoDay);
}

function formatIsoTimeFields(e, n) {
  const t = [ Fo(e.u), Fo(e.m) ];
  return -1 !== n && t.push(Fo(e.p) + ((e, n, t, o) => formatSubsecNano(e * He + n * ko + t, o))(e.h, e.I, e.l, n)), 
  t.join(":");
}

function me(e, n = 0) {
  if (1 === n) {
    return "";
  }
  const [t, o] = divModFloor(Math.abs(e), Ro), [r, i] = divModFloor(o, Yo), [a, s] = divModFloor(i, Co);
  return getSignStr(e) + Fo(t) + ":" + Fo(r) + (a || s ? ":" + Fo(a) + formatSubsecNano(s) : "");
}

function formatCalendar(e, n) {
  return 1 !== n && (n > 1 || 0 === n && e !== l) ? formatCalendarId(e, 2 === n) : "";
}

function formatCalendarId(e, n) {
  return "[" + (n ? "!" : "") + "u-ca=" + e + "]";
}

function formatSubsecNano(e, n) {
  let t = padNumber(9, e);
  return t = void 0 === n ? t.replace(ui, "") : t.slice(0, n), t ? "." + t : "";
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
  const {epochNanoseconds: t} = e, o = (n.N ? n : n(e.timeZone)).N(t), r = epochNanoToIso(t, o);
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
  const s = e.v(n);
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
      throw new RangeError(ho);
    }
  }
  return a ? isoToEpochNano(n) : getSingleInstantFor(e, n, r, s);
}

function getSingleInstantFor(e, n, t = 0, o = e.v(n)) {
  if (1 === o.length) {
    return o[0];
  }
  if (1 === t) {
    throw new RangeError(go);
  }
  if (o.length) {
    return o[3 === t ? 1 : 0];
  }
  const r = isoToEpochNano(n), i = ((e, n) => {
    const t = e.N(moveBigNano(n, -Zo));
    return (e => {
      if (e > Zo) {
        throw new RangeError(po);
      }
      return e;
    })(e.N(moveBigNano(n, Zo)) - t);
  })(e, r), a = i * (2 === t ? -1 : 1);
  return (o = e.v(epochNanoToIso(r, a)))[2 === t ? 0 : o.length - 1];
}

function getStartOfDayInstantFor(e, n) {
  const t = e.v(n);
  if (t.length) {
    return t[0];
  }
  const o = moveBigNano(isoToEpochNano(n), -Zo);
  return e.i(o, 1);
}

function Be(e, n, t) {
  return qe(checkEpochNanoInBounds(addBigNanos(n.epochNanoseconds, (e => {
    if (durationHasDateParts(e)) {
      throw new RangeError(No);
    }
    return durationFieldsToBigNano(e, 5);
  })(e ? negateDurationFields(t) : t))));
}

function Pe(e, n, t, o, r, i = Object.create(null)) {
  const a = n(o.timeZone), s = e(o.calendar);
  return {
    ...o,
    ...moveZonedEpochs(a, s, o, t ? negateDurationFields(r) : r, i)
  };
}

function pt(e, n, t, o, r = Object.create(null)) {
  const {calendar: i} = t;
  return Zt(moveDateTime(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function te(e, n, t, o, r) {
  const {calendar: i} = t;
  return R(moveDate(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function xt(e, n, t, o, r) {
  const i = t.calendar, a = e(i);
  let s = checkIsoDateInBounds(moveToDayOfMonthUnsafe(a, t));
  n && (o = A(o)), o.sign < 0 && (s = a.P(s, {
    ...dr,
    months: 1
  }), s = moveByDays(s, -1));
  const c = a.P(s, o, r);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(a, c), i);
}

function ot(e, n, t) {
  return mt(moveTime(n, e ? negateDurationFields(t) : t)[0]);
}

function moveZonedEpochs(e, n, t, o, r) {
  const i = durationFieldsToBigNano(o, 5);
  let a = t.epochNanoseconds;
  if (durationHasDateParts(o)) {
    const s = Se(t, e);
    a = addBigNanos(getSingleInstantFor(e, {
      ...moveDate(n, s, {
        ...o,
        ...mr
      }, r),
      ...tn(O, s)
    }), i);
  } else {
    a = addBigNanos(a, i), ut(r);
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
      ...mr,
      days: t.days + i
    }, o),
    ...r
  });
}

function moveDate(e, n, t, o) {
  if (t.years || t.months || t.weeks) {
    return e.P(n, t, o);
  }
  ut(o);
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
    ...epochMilliToIso(isoToEpochMilli(e) + n * Oo)
  } : e;
}

function createMarkerSystem(e, n, t) {
  const o = e(t.calendar);
  return isZonedEpochSlots(t) ? [ t, o, n(t.timeZone) ] : [ {
    ...t,
    ...yt
  }, o ];
}

function createMarkerToEpochNano(e) {
  return e ? extractEpochNano : isoToEpochNano;
}

function createMoveMarker(e) {
  return e ? Dt(moveZonedEpochs, e) : moveDateTime;
}

function createDiffMarkers(e) {
  return e ? Dt(diffZonedEpochsExact, e) : diffDateTimesExact;
}

function isZonedEpochSlots(e) {
  return e && e.epochNanoseconds;
}

function isUniformUnit(e, n) {
  return e <= 6 - (isZonedEpochSlots(n) ? 1 : 0);
}

function N(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getMaxDurationUnit(r), getMaxDurationUnit(i));
  if (isUniformUnit(c, s)) {
    return ge(checkDurationUnits(((e, n, t, o) => {
      const r = addBigNanos(durationFieldsToBigNano(e), durationFieldsToBigNano(n), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(Do);
      }
      return {
        ...dr,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o)));
  }
  if (!s) {
    throw new RangeError(Mo);
  }
  o && (i = negateDurationFields(i));
  const [u, l, f] = createMarkerSystem(n, t, s), d = createMoveMarker(f), m = createDiffMarkers(f), p = d(l, u, r);
  return ge(m(l, u, d(l, p, i), c));
}

function E(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s, c, u, l] = ((e, n, t) => {
    e = normalizeOptionsOrString(e, Cr);
    let o = _r(e);
    const r = t(e[zr]);
    let i = parseRoundingIncInteger(e);
    const a = oi(e, 7);
    let s = Vr(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(yo);
    }
    if (null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), i > 1 && s > 5 && o !== s) {
      throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
    }
    return [ o, s, i, a, r ];
  })(r, i, e), f = Math.max(i, a);
  if (!l && f <= 6) {
    return ge(checkDurationUnits(((e, n, t, o, r) => {
      const i = roundBigNano(durationFieldsToBigNano(e), t, o, r);
      return {
        ...dr,
        ...nanoToDurationDayTimeFields(i, n)
      };
    })(o, a, s, c, u)));
  }
  if (!isZonedEpochSlots(l) && !o.sign) {
    return o;
  }
  if (!l) {
    throw new RangeError(Mo);
  }
  const [d, m, p] = createMarkerSystem(n, t, l), h = createMarkerToEpochNano(p), g = createMoveMarker(p), D = createDiffMarkers(p), T = g(m, d, o);
  isZonedEpochSlots(l) || (checkIsoDateTimeInBounds(d), checkIsoDateTimeInBounds(T));
  let I = D(m, d, T, a);
  const M = o.sign, N = computeDurationSign(I);
  if (M && N && M !== N) {
    throw new RangeError(co);
  }
  return I = roundRelativeDuration(I, h(T), a, s, c, u, m, d, h, g), ge(I);
}

function B(e) {
  return -1 === e.sign ? A(e) : e;
}

function A(e) {
  return ge(negateDurationFields(e));
}

function negateDurationFields(e) {
  const n = {};
  for (const t of g) {
    n[t] = -1 * e[t] || 0;
  }
  return n;
}

function M(e) {
  return !e.sign;
}

function computeDurationSign(e, n = g) {
  let t = 0;
  for (const o of n) {
    const n = Math.sign(e[o]);
    if (n) {
      if (t && t !== n) {
        throw new RangeError(Io);
      }
      t = n;
    }
  }
  return t;
}

function checkDurationUnits(e) {
  for (const n of lr) {
    clampEntity(n, e[n], -li, li, 1);
  }
  return checkDurationTimeUnit(bigNanoToNumber(durationFieldsToBigNano(e), Co)), e;
}

function checkDurationTimeUnit(e) {
  if (!Number.isSafeInteger(e)) {
    throw new RangeError(To);
  }
}

function durationFieldsToBigNano(e, n = 6) {
  return givenFieldsToBigNano(e, n, g);
}

function nanoToDurationDayTimeFields(e, n = 6) {
  const [t, o] = e, r = nanoToGivenFields(o, n, g);
  if (r[g[n]] += t * (Zo / zo[n]), !Number.isFinite(r[g[n]])) {
    throw new RangeError(Do);
  }
  return r;
}

function nanoToDurationTimeFields(e, n = 5) {
  return nanoToGivenFields(e, n, g);
}

function durationHasDateParts(e) {
  return Boolean(computeDurationSign(e, ur));
}

function getMaxDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[g[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / ai) * ai;
  return [ n, n + ai ];
}

function Re(e) {
  const n = parseDateTimeLike(e = toStringViaPrimitive(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  let t;
  if (n.F) {
    t = 0;
  } else {
    if (!n.offset) {
      throw new RangeError(failedParse(e));
    }
    t = parseOffsetNano(n.offset);
  }
  return n.timeZone && parseOffsetNanoMaybe(n.timeZone, 1), qe(isoToEpochNanoWithOffset(checkIsoDateTimeFields(n), t));
}

function z(e) {
  const n = parseDateTimeLike(f(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  if (n.timeZone) {
    return finalizeZonedDateTime(n, n.offset ? parseOffsetNano(n.offset) : void 0);
  }
  if (n.F) {
    throw new RangeError(failedParse(e));
  }
  return finalizeDate(n);
}

function je(e, n) {
  const t = parseDateTimeLike(f(e));
  if (!t || !t.timeZone) {
    throw new RangeError(failedParse(e));
  }
  const {offset: o} = t, r = o ? parseOffsetNano(o) : void 0, [, i, a] = Ze(n);
  return finalizeZonedDateTime(t, r, i, a);
}

function parseOffsetNano(e) {
  const n = parseOffsetNanoMaybe(e);
  if (void 0 === n) {
    throw new RangeError(failedParse(e));
  }
  return n;
}

function At(e) {
  const n = parseDateTimeLike(f(e));
  if (!n || n.F) {
    throw new RangeError(failedParse(e));
  }
  return Zt(finalizeDateTime(n));
}

function fe(e, n, t) {
  let o = parseDateTimeLike(f(e));
  if (!o || o.F) {
    throw new RangeError(failedParse(e));
  }
  return n ? o.calendar === l && (o = -271821 === o.isoYear && 4 === o.isoMonth ? {
    ...o,
    isoDay: 20,
    ...yt
  } : {
    ...o,
    isoDay: 1,
    ...yt
  }) : t && o.calendar === l && (o = {
    ...o,
    isoYear: br
  }), R(o.O ? finalizeDateTime(o) : finalizeDate(o));
}

function Ut(e, n) {
  const t = parseYearMonthOnly(f(n));
  if (t) {
    return requireIsoCalendar(t), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(t)));
  }
  const o = fe(n, 1);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(e(o.calendar), o));
}

function requireIsoCalendar(e) {
  if (e.calendar !== l) {
    throw new RangeError(invalidSubstring(e.calendar));
  }
}

function qt(e, n) {
  const t = parseMonthDayOnly(f(n));
  if (t) {
    return requireIsoCalendar(t), createPlainMonthDaySlots(checkIsoDateFields(t));
  }
  const o = fe(n, 0, 1), {calendar: r} = o, i = e(r), [a, s, c] = i.B(o), [u, l] = i.k(a, s), [d, m] = i.C(u, l, c);
  return createPlainMonthDaySlots(checkIsoDateInBounds(i.R(d, m, c)), r);
}

function St(e) {
  let n, t = (e => {
    const n = yi.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(f(e));
  if (!t) {
    if (t = parseDateTimeLike(e), !t) {
      throw new RangeError(failedParse(e));
    }
    if (!t.O) {
      throw new RangeError(failedParse(e));
    }
    if (t.F) {
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
  return mt(constrainIsoTimeFields(t, 1));
}

function k(e) {
  const n = (e => {
    const n = Ei.exec(e);
    return n ? (e => {
      function parseUnit(e, r, i) {
        let a = 0, s = 0;
        if (i && ([a, o] = divModFloor(o, zo[i])), void 0 !== e) {
          if (t) {
            throw new RangeError(invalidSubstring(e));
          }
          s = (e => {
            const n = parseInt(e);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(e));
            }
            return n;
          })(e), n = 1, r && (o = parseSubsecNano(r) * (zo[i] / Co), t = 1);
        }
        return a + s;
      }
      let n = 0, t = 0, o = 0, r = {
        ...zipProps(g, [ parseUnit(e[2]), parseUnit(e[3]), parseUnit(e[4]), parseUnit(e[5]), parseUnit(e[6], e[7], 5), parseUnit(e[8], e[9], 4), parseUnit(e[10], e[11], 3) ]),
        ...nanoToGivenFields(o, 2, g)
      };
      if (!n) {
        throw new RangeError(noValidFields(g));
      }
      return parseSign(e[1]) < 0 && (r = negateDurationFields(r)), r;
    })(n) : void 0;
  })(f(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  return ge(checkDurationUnits(n));
}

function u(e) {
  const n = parseDateTimeLike(e) || parseYearMonthOnly(e) || parseMonthDayOnly(e);
  return n ? n.calendar : e;
}

function F(e) {
  const n = parseDateTimeLike(e);
  return n && (n.timeZone || n.F && ii || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = b(e.timeZone), i = Y(r);
  let a;
  return checkIsoDateTimeFields(e), a = e.O ? getMatchingInstantFor(i, e, n, t, o, !i.U, e.F) : getStartOfDayInstantFor(i, e), 
  Ue(a, r, c(e.calendar));
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
    calendar: c(e.calendar)
  };
}

function parseDateTimeLike(e) {
  const n = Ni.exec(e);
  return n ? (e => {
    const n = e[10], t = "Z" === (n || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(e),
      isoMonth: parseInt(e[4]),
      isoDay: parseInt(e[5]),
      ...organizeTimeParts(e.slice(5)),
      ...organizeAnnotationParts(e[16]),
      O: Boolean(e[6]),
      F: t,
      offset: t ? void 0 : n
    };
  })(n) : void 0;
}

function parseYearMonthOnly(e) {
  const n = Ii.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = Mi.exec(e);
  return n ? (e => ({
    isoYear: br,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = vi.exec(e);
  return t ? ((e, n) => {
    const t = e[4] || e[5];
    if (n && t) {
      throw new RangeError(invalidSubstring(t));
    }
    return (e => {
      if (Math.abs(e) >= Zo) {
        throw new RangeError(mo);
      }
      return e;
    })((parseInt0(e[2]) * Ro + parseInt0(e[3]) * Yo + parseInt0(e[4]) * Co + parseSubsecNano(e[5] || "")) * parseSign(e[1]));
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
    u: parseInt0(e[1]),
    m: parseInt0(e[2]),
    p: 60 === n ? 59 : n
  };
}

function organizeAnnotationParts(e) {
  let n, t;
  const o = [];
  if (e.replace(Pi, ((e, r, i) => {
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

function Fe(e) {
  return b(f(e));
}

function b(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? me(n) : n ? (e => {
    if (wi.test(e)) {
      throw new RangeError("BAD! " + e);
    }
    if (Fi.test(e)) {
      throw new RangeError(fo);
    }
    return e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e)))).join("/");
  })(e) : ii;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : ii;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== ii ? Si(e) : void 0;
}

function $e(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function Ae(e, n) {
  return compareBigNanos(e.epochNanoseconds, n.epochNanoseconds);
}

function $(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getMaxDurationUnit(o), getMaxDurationUnit(r));
  if (allPropsEqual(g, o, r)) {
    return 0;
  }
  if (isUniformUnit(s, a)) {
    return compareBigNanos(durationFieldsToBigNano(o), durationFieldsToBigNano(r));
  }
  if (!a) {
    throw new RangeError(Mo);
  }
  const [c, u, l] = createMarkerSystem(n, t, a), f = createMarkerToEpochNano(l), d = createMoveMarker(l);
  return compareBigNanos(f(d(u, c, o)), f(d(u, c, r)));
}

function Bt(e, n) {
  return Xt(e, n) || Tt(e, n);
}

function Xt(e, n) {
  return compareNumbers(isoToEpochMilli(e), isoToEpochMilli(n));
}

function Tt(e, n) {
  return compareNumbers(isoTimeFieldsToNano(e), isoTimeFieldsToNano(n));
}

function Ee(e, n) {
  return !$e(e, n);
}

function Ie(e, n) {
  return !Ae(e, n) && !!isTimeZoneIdsEqual(e.timeZone, n.timeZone) && e.calendar === n.calendar;
}

function It(e, n) {
  return !Bt(e, n) && e.calendar === n.calendar;
}

function ne(e, n) {
  return !Xt(e, n) && e.calendar === n.calendar;
}

function Gt(e, n) {
  return !Xt(e, n) && e.calendar === n.calendar;
}

function Yt(e, n) {
  return !Xt(e, n) && e.calendar === n.calendar;
}

function it(e, n) {
  return !Tt(e, n);
}

function isTimeZoneIdsEqual(e, n) {
  if (e === n) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(e) === getTimeZoneAtomic(n);
  } catch (e) {}
}

function Ne(e, n, t, o) {
  const r = refineDiffOptions(e, o, 3, 5), i = diffEpochNanos(n.epochNanoseconds, t.epochNanoseconds, ...r);
  return ge(e ? negateDurationFields(i) : i);
}

function pe(e, n, t, o, r, i) {
  const a = getCommonCalendarId(o.calendar, r.calendar), [s, c, u, l] = refineDiffOptions(t, i, 5), f = o.epochNanoseconds, d = r.epochNanoseconds, m = compareBigNanos(d, f);
  let p;
  if (m) {
    if (s < 6) {
      p = diffEpochNanos(f, d, s, c, u, l);
    } else {
      const t = n(((e, n) => {
        if (!isTimeZoneIdsEqual(e, n)) {
          throw new RangeError(lo);
        }
        return e;
      })(o.timeZone, r.timeZone)), f = e(a);
      p = diffZonedEpochsBig(f, t, o, r, m, s, i), p = roundRelativeDuration(p, d, s, c, u, l, f, o, extractEpochNano, Dt(moveZonedEpochs, t));
    }
  } else {
    p = dr;
  }
  return ge(t ? negateDurationFields(p) : p);
}

function Ot(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar), [a, s, c, u] = refineDiffOptions(n, r, 6), l = isoToEpochNano(t), f = isoToEpochNano(o), d = compareBigNanos(f, l);
  let m;
  if (d) {
    if (a <= 6) {
      m = diffEpochNanos(l, f, a, s, c, u);
    } else {
      const n = e(i);
      m = diffDateTimesBig(n, t, o, d, a, r), m = roundRelativeDuration(m, f, a, s, c, u, n, t, isoToEpochNano, moveDateTime);
    }
  } else {
    m = dr;
  }
  return ge(n ? negateDurationFields(m) : m);
}

function ee(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar);
  return diffDateLike(n, (() => e(i)), t, o, ...refineDiffOptions(n, r, 6, 9, 6));
}

function Wt(e, n, t, o, r) {
  const i = getCommonCalendarId(t.calendar, o.calendar), a = refineDiffOptions(n, r, 9, 9, 8), s = e(i), c = moveToDayOfMonthUnsafe(s, t), u = moveToDayOfMonthUnsafe(s, o);
  return c.isoYear === u.isoYear && c.isoMonth === u.isoMonth && c.isoDay === u.isoDay ? ge(dr) : diffDateLike(n, (() => s), checkIsoDateInBounds(c), checkIsoDateInBounds(u), ...a, 8);
}

function diffDateLike(e, n, t, o, r, i, a, s, c = 6) {
  const u = isoToEpochNano(t), l = isoToEpochNano(o);
  if (void 0 === u || void 0 === l) {
    throw new RangeError("BAD!");
  }
  let f;
  if (compareBigNanos(l, u)) {
    if (6 === r) {
      f = diffEpochNanos(u, l, r, i, a, s);
    } else {
      const e = n();
      f = e.q(t, o, r), i === c && 1 === a || (f = roundRelativeDuration(f, l, r, i, a, s, e, t, isoToEpochNano, moveDate));
    }
  } else {
    f = dr;
  }
  return ge(e ? negateDurationFields(f) : f);
}

function rt(e, n, t, o) {
  const [r, i, a, s] = refineDiffOptions(e, o, 5, 5), c = roundByInc(diffTimes(n, t), computeNanoInc(i, a), s), u = {
    ...dr,
    ...nanoToDurationTimeFields(c, r)
  };
  return ge(e ? negateDurationFields(u) : u);
}

function diffZonedEpochsExact(e, n, t, o, r, i) {
  const a = compareBigNanos(o.epochNanoseconds, t.epochNanoseconds);
  return a ? r < 6 ? diffEpochNanosExact(t.epochNanoseconds, o.epochNanoseconds, r) : diffZonedEpochsBig(n, e, t, o, a, r, i) : dr;
}

function diffDateTimesExact(e, n, t, o, r) {
  const i = isoToEpochNano(n), a = isoToEpochNano(t), s = compareBigNanos(a, i);
  return s ? o <= 6 ? diffEpochNanosExact(i, a, o) : diffDateTimesBig(e, n, t, s, o, r) : dr;
}

function diffZonedEpochsBig(e, n, t, o, r, i, a) {
  const [s, c, u] = ((e, n, t, o) => {
    function updateMid() {
      return l = {
        ...moveByDays(a, c++ * -o),
        ...i
      }, f = getSingleInstantFor(e, l), compareBigNanos(s, f) === -o;
    }
    const r = Se(n, e), i = tn(O, r), a = Se(t, e), s = t.epochNanoseconds;
    let c = 0;
    const u = diffTimes(r, a);
    let l, f;
    if (Math.sign(u) === -o && c++, updateMid() && (-1 === o || updateMid())) {
      throw new RangeError(co);
    }
    const d = bigNanoToNumber(diffBigNanos(f, s));
    return [ r, l, d ];
  })(n, t, o, r);
  var l, f;
  return {
    ...6 === i ? (l = s, f = c, {
      ...dr,
      days: diffDays(l, f)
    }) : e.q(s, c, i, a),
    ...nanoToDurationTimeFields(u)
  };
}

function diffDateTimesBig(e, n, t, o, r, i) {
  const [a, s, c] = ((e, n, t) => {
    let o = n, r = diffTimes(e, n);
    return Math.sign(r) === -t && (o = moveByDays(n, -t), r += Zo * t), [ e, o, r ];
  })(n, t, o);
  return {
    ...e.q(a, s, r, i),
    ...nanoToDurationTimeFields(c)
  };
}

function diffEpochNanos(e, n, t, o, r, i) {
  return {
    ...dr,
    ...nanoToDurationDayTimeFields(roundBigNano(diffBigNanos(e, n), o, r, i), t)
  };
}

function diffEpochNanosExact(e, n, t) {
  return {
    ...dr,
    ...nanoToDurationDayTimeFields(diffBigNanos(e, n), t)
  };
}

function diffDays(e, n) {
  return diffEpochMilliByDay(isoToEpochMilli(e), isoToEpochMilli(n));
}

function diffEpochMilliByDay(e, n) {
  return Math.trunc((n - e) / Oo);
}

function diffTimes(e, n) {
  return isoTimeFieldsToNano(n) - isoTimeFieldsToNano(e);
}

function getCommonCalendarId(e, n) {
  if (e !== n) {
    throw new RangeError(uo);
  }
  return e;
}

function computeNativeWeekOfYear(e) {
  return this.j(e)[0];
}

function computeNativeYearOfWeek(e) {
  return this.j(e)[1];
}

function computeNativeDayOfYear(e) {
  const [n] = this.B(e);
  return diffEpochMilliByDay(this.L(n), isoToEpochMilli(e)) + 1;
}

function parseMonthCode(e) {
  const n = bi.exec(e);
  if (!n) {
    throw new RangeError(invalidMonthCode(e));
  }
  return [ parseInt(n[1]), Boolean(n[2]) ];
}

function formatMonthCode(e, n) {
  return "M" + Fo(e) + (n ? "L" : "");
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
  return or[getCalendarIdBase(e)];
}

function getCalendarLeapMonthMeta(e) {
  return ir[getCalendarIdBase(e)];
}

function getCalendarIdBase(e) {
  return computeCalendarIdBase(e.id || l);
}

function createIntlCalendar(e) {
  function epochMilliToIntlFields(e) {
    return ((e, n) => ({
      ...parseIntlYear(e, n),
      $: e.month,
      day: parseInt(e.day)
    }))(hashIntlFormatParts(n, e), t);
  }
  const n = Bi(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    G: createIntlFieldCache(epochMilliToIntlFields),
    V: createIntlYearDataCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return en((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearDataCache(e) {
  const n = e(0).year - wr;
  return en((t => {
    let o, r = isoArgsToEpochMilli(t - n), i = 0;
    const a = [], s = [];
    do {
      r += 400 * Oo;
    } while ((o = e(r)).year <= t);
    do {
      if (r += (1 - o.day) * Oo, o.year === t && (a.push(r), s.push(o.$)), r -= Oo, ++i > 100 || r < -yr) {
        throw new RangeError("BAD!");
      }
    } while ((o = e(r)).year >= t);
    return {
      _: a.reverse(),
      J: Eo(s.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const i = or[n], a = rr[n] || {};
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
  const {year: n, $: t, day: o} = this.G(e), {J: r} = this.V(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.V(e)._[n - 1] + (t - 1) * Oo;
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
  const {_: t} = this.V(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.V(e + 1)._), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.V(e)._.length;
}

function computeIntlEraParts(e) {
  const n = this.G(e);
  return [ n.era, n.eraYear ];
}

function queryMonthStrings(e, n) {
  return Object.keys(e.V(n).J);
}

function bt(e) {
  return c(f(e));
}

function c(e) {
  if ((e = e.toLowerCase()) !== l && e !== nr && "islamic-rgsa" !== e) {
    const n = Bi(e).resolvedOptions().calendar;
    if (computeCalendarIdBase(e) !== computeCalendarIdBase(n)) {
      throw new RangeError(invalidCalendar(e));
    }
    return n;
  }
  return e;
}

function computeCalendarIdBase(e) {
  return "islamicc" === e && (e = "islamic"), e.split("-")[0];
}

function createNativeOpsCreator(e, n) {
  return t => t === l ? e : t === nr || t === tr ? Object.assign(Object.create(e), {
    id: t
  }) : Object.assign(Object.create(n), Oi(t));
}

function G(e, n, t, o) {
  const r = refineCalendarFields(t, o, Ko, [], jo);
  if (void 0 !== r.timeZone) {
    const o = t.K(r), i = refineTimeBag(r), a = e(r.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(n(a), {
        ...o,
        ...i
      }, void 0 !== r.offset ? parseOffsetNano(r.offset) : void 0),
      timeZone: a
    };
  }
  return {
    ...t.K(r),
    ...yt
  };
}

function ye(e, n, t, o, r, i) {
  const a = refineCalendarFields(t, r, Ko, qo, jo), s = e(a.timeZone), [c, u, l] = Ze(i), f = t.K(a, fabricateOverflowOptions(c)), d = refineTimeBag(a, c);
  return Ue(getMatchingInstantFor(n(s), {
    ...f,
    ...d
  }, void 0 !== a.offset ? parseOffsetNano(a.offset) : void 0, u, l), s, o);
}

function jt(e, n, t) {
  const o = refineCalendarFields(e, n, Ko, [], p), r = ut(t);
  return Zt(checkIsoDateTimeInBounds({
    ...e.K(o, fabricateOverflowOptions(r)),
    ...refineTimeBag(o, r)
  }));
}

function ue(e, n, t, o = []) {
  const r = refineCalendarFields(e, n, Ko, o);
  return e.K(r, t);
}

function Qt(e, n, t, o) {
  const r = refineCalendarFields(e, n, _o, o);
  return e.X(r, t);
}

function kt(e, n, t, o) {
  const r = refineCalendarFields(e, t, Ko, Vo);
  return n && void 0 !== r.month && void 0 === r.monthCode && void 0 === r.year && (r.year = br), 
  e.ee(r, o);
}

function dt(e, n) {
  return mt(refineTimeBag(refineFields(e, Ao, [], 1), ut(n)));
}

function J(e) {
  const n = refineFields(e, sr);
  return ge(checkDurationUnits({
    ...dr,
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
      a = 1, Wi[o] && (n = Wi[o](n, o)), r[o] = n;
    } else if (t) {
      if (t.includes(o)) {
        throw new TypeError(missingField(o));
      }
      r[o] = er[o];
    }
    i = o;
  }
  if (o && !a) {
    throw new TypeError(noValidFields(n));
  }
  return r;
}

function refineTimeBag(e, n) {
  return constrainIsoTimeFields(ji({
    ...er,
    ...e
  }), n);
}

function Te(e, n, t, o, r) {
  const {calendar: i, timeZone: a} = t, s = e(i), c = n(a), u = [ ...s.fields(Ko), ...Wo ].sort(), l = (e => {
    const n = Se(e, Y), t = me(n.offsetNanoseconds), o = qi(e.calendar), [r, i, a] = o.B(n), [s, c] = o.k(r, i), u = formatMonthCode(s, c);
    return {
      ...Li(n),
      year: r,
      monthCode: u,
      day: a,
      offset: t
    };
  })(t), f = refineFields(o, u), d = s.ne(l, f), m = {
    ...l,
    ...f
  }, [p, h, g] = Ze(r, 2);
  return Ue(getMatchingInstantFor(c, {
    ...s.K(d, fabricateOverflowOptions(p)),
    ...constrainIsoTimeFields(ji(m), p)
  }, parseOffsetNano(m.offset), h, g), a, i);
}

function ht(e, n, t, o) {
  const r = e(n.calendar), i = [ ...r.fields(Ko), ...p ].sort(), a = {
    ...computeDateEssentials(s = n),
    hour: s.u,
    minute: s.m,
    second: s.p,
    millisecond: s.h,
    microsecond: s.I,
    nanosecond: s.l
  };
  var s;
  const c = refineFields(t, i), u = ut(o), l = r.ne(a, c), f = {
    ...a,
    ...c
  };
  return Zt(checkIsoDateTimeInBounds({
    ...r.K(l, fabricateOverflowOptions(u)),
    ...constrainIsoTimeFields(ji(f), u)
  }));
}

function _t(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(Ko).sort(), a = computeDateEssentials(n), s = refineFields(t, i), c = r.ne(a, s);
  return r.K(c, o);
}

function Rt(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(_o).sort(), a = (e => {
    const n = qi(e.calendar), [t, o] = n.B(e), [r, i] = n.k(t, o);
    return {
      year: t,
      monthCode: formatMonthCode(r, i)
    };
  })(n), s = refineFields(t, i), c = r.ne(a, s);
  return r.X(c, o);
}

function Nt(e, n, t, o) {
  const r = e(n.calendar), i = r.fields(Ko).sort(), a = (e => {
    const n = qi(e.calendar), [t, o, r] = n.B(e), [i, a] = n.k(t, o);
    return {
      monthCode: formatMonthCode(i, a),
      day: r
    };
  })(n), s = refineFields(t, i), c = r.ne(a, s);
  return r.ee(c, o);
}

function nt(e, n, t) {
  return mt(((e, n, t) => refineTimeBag({
    ...tn(Ao, e),
    ...refineFields(n, Ao)
  }, ut(t)))(e, n, t));
}

function j(e, n) {
  return ge((t = e, o = n, checkDurationUnits({
    ...t,
    ...refineFields(o, sr)
  })));
  var t, o;
}

function convertToIso(e, n, t, o, r) {
  n = tn(t = e.fields(t), n), o = refineFields(o, r = e.fields(r), []);
  let i = e.ne(n, o);
  return i = refineFields(i, [ ...t, ...r ].sort(), []), e.K(i);
}

function refineYear(e, n) {
  const t = getCalendarEraOrigins(e), o = rr[e.id || ""] || {};
  let {era: r, eraYear: i, year: a} = n;
  if (void 0 !== r || void 0 !== i) {
    if (void 0 === r || void 0 === i) {
      throw new TypeError(oo);
    }
    if (!t) {
      throw new RangeError(to);
    }
    const e = t[o[r] || r];
    if (void 0 === e) {
      throw new RangeError(invalidEra(r));
    }
    const n = eraYearToYear(i, e);
    if (void 0 !== a && a !== n) {
      throw new RangeError(ro);
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
      const r = e.te(t), [i, a] = parseMonthCode(n);
      let s = monthCodeNumberToMonth(i, a, r);
      if (a) {
        const n = getCalendarLeapMonthMeta(e);
        if (void 0 === n) {
          throw new RangeError(so);
        }
        if (n > 0) {
          if (s > n) {
            throw new RangeError(so);
          }
          if (void 0 === r) {
            if (1 === o) {
              throw new RangeError(so);
            }
            s--;
          }
        } else {
          if (s !== -n) {
            throw new RangeError(so);
          }
          if (void 0 === r && 1 === o) {
            throw new RangeError(so);
          }
        }
      }
      return s;
    })(e, i, t, o);
    if (void 0 !== r && r !== n) {
      throw new RangeError(io);
    }
    r = n, o = 1;
  } else if (void 0 === r) {
    throw new TypeError(ao);
  }
  return clampEntity("month", r, 1, e.oe(t), o);
}

function refineDay(e, n, t, o, r) {
  return clampProp(n, "day", 1, e.re(o, t), r);
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
  const n = qi(e.calendar), [t, o, r] = n.B(e), [i, a] = n.k(t, o);
  return {
    year: t,
    monthCode: formatMonthCode(i, a),
    day: r
  };
}

function Je(e) {
  return qe(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function Me(e, n, t, o, r = l) {
  return Ue(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(t))), n(o), e(r));
}

function Ft(n, t, o, r, i = 0, a = 0, s = 0, c = 0, u = 0, f = 0, d = l) {
  return Zt(checkIsoDateTimeInBounds(checkIsoDateTimeFields(e(toInteger, zipProps(gr, [ t, o, r, i, a, s, c, u, f ])))), n(d));
}

function se(n, t, o, r, i = l) {
  return R(checkIsoDateInBounds(checkIsoDateFields(e(toInteger, {
    isoYear: t,
    isoMonth: o,
    isoDay: r
  }))), n(i));
}

function Ht(e, n, t, o = l, r = 1) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: i,
    isoMonth: a,
    isoDay: toInteger(r)
  })), s);
}

function Vt(e, n, t, o = l, r = br) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(r),
    isoMonth: i,
    isoDay: a
  })), s);
}

function st(n = 0, t = 0, o = 0, r = 0, i = 0, a = 0) {
  return mt(constrainIsoTimeFields(e(toInteger, zipProps(O, [ n, t, o, r, i, a ])), 1));
}

function Z(n = 0, t = 0, o = 0, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0, l = 0) {
  return ge(checkDurationUnits(e(toStrictInteger, zipProps(g, [ n, t, o, r, i, a, s, c, u, l ]))));
}

function Le(e, n, t = l) {
  return Ue(e.epochNanoseconds, n, t);
}

function ve(e) {
  return qe(e.epochNanoseconds);
}

function Mt(e, n) {
  return Zt(Se(n, e));
}

function ce(e, n) {
  return R(Se(n, e));
}

function ft(e, n) {
  return mt(Se(n, e));
}

function vt(e, n, t, o) {
  const r = ((e, n, t, o) => {
    const r = (e => Qr(normalizeOptions(e)))(o);
    return getSingleInstantFor(e(n), t, r);
  })(e, t, n, o);
  return Ue(checkEpochNanoInBounds(r), t, n.calendar);
}

function oe(e, n, t, o, r) {
  const i = e(r.timeZone), a = r.plainTime, s = void 0 !== a ? n(a) : void 0, c = t(i);
  let u;
  return u = s ? getSingleInstantFor(c, {
    ...o,
    ...s
  }) : getStartOfDayInstantFor(c, {
    ...o,
    ...yt
  }), Ue(u, i, o.calendar);
}

function re(e, n = yt) {
  return Zt(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function ae(e, n, t) {
  return ((e, n) => {
    const t = refineCalendarFields(e, n, Jo);
    return e.X(t, void 0);
  })(e(n.calendar), t);
}

function ie(e, n, t) {
  return ((e, n) => {
    const t = refineCalendarFields(e, n, Xo);
    return e.ee(t);
  })(e(n.calendar), t);
}

function zt(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, Jo, requireObjectLike(t), Vo))(e(n.calendar), t, o);
}

function Et(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, Xo, requireObjectLike(t), $o))(e(n.calendar), t, o);
}

function Ge(e) {
  return qe(checkEpochNanoInBounds(xe(toStrictInteger(e), He)));
}

function ze(e) {
  return qe(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
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
        throw new TypeError("BAD!");
      }
      r = {
        ...n,
        ...r
      };
    }
    return t && (r.timeZone = ii, [ "full", "long" ].includes(r.ie) && (r.ie = "medium")), 
    r;
  };
}

function H(e, n = on, t = 0) {
  const [o, , , r] = e;
  return (i, a = Ia, ...s) => {
    const c = n(r && r(...s), i, a, o, t), u = c.resolvedOptions();
    return [ c, ...toEpochMillis(e, u, s) ];
  };
}

function on(e, n, t, o, r) {
  if (t = o(t, r), e) {
    if (void 0 !== t.timeZone) {
      throw new TypeError(Po);
    }
    t.timeZone = e;
  }
  return new _e(n, t);
}

function toEpochMillis(e, n, t) {
  const [, o, r] = e;
  return t.map((e => (e.calendar && ((e, n, t) => {
    if ((t || e !== l) && e !== n) {
      throw new RangeError(uo);
    }
  })(e.calendar, n.calendar, r), o(e, n))));
}

function he(e, n, t) {
  const o = n.timeZone, r = e(o), i = {
    ...Se(n, r),
    ...t || yt
  };
  let a;
  return a = t ? getMatchingInstantFor(r, i, i.offsetNanoseconds, 2) : getStartOfDayInstantFor(r, i), 
  Ue(a, o, n.calendar);
}

function gt(e, n = yt) {
  return Zt(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function Pt(e, n) {
  return {
    ...e,
    calendar: n
  };
}

function De(e, n) {
  return {
    ...e,
    timeZone: n
  };
}

function Xe(e) {
  const n = Qe();
  return epochNanoToIso(n, e.N(n));
}

function Qe() {
  return xe(Date.now(), He);
}

function Ke() {
  return Na || (Na = (new _e).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, eo = "Cannot convert Symbol to string", no = "Invalid object", numberOutOfRange = (e, n, t, o, r) => r ? numberOutOfRange(e, r[n], r[t], r[o]) : invalidEntity(e, n) + `; must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, forbiddenField = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, noValidFields = e => "No valid fields: " + e.join(), i = "Invalid bag", invalidChoice = (e, n, t) => invalidEntity(e, n) + "; must be " + Object.keys(t).join(), C = "Cannot use valueOf", a = "Invalid calling context", to = "Forbidden era/eraYear", oo = "Mismatching era/eraYear", ro = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, io = "Mismatching month/monthCode", ao = "Missing month/monthCode", so = "Invalid leap month", co = "Invalid protocol results", uo = "Mismatching Calendars", invalidCalendar = e => `Invalid Calendar: ${e}`, lo = "Mismatching TimeZones", fo = "Forbidden ICU TimeZone", mo = "Out-of-bounds offset", po = "Out-of-bounds TimeZone gap", ho = "Invalid TimeZone offset", go = "Ambiguous offset", Do = "Out-of-bounds date", To = "Out-of-bounds duration", Io = "Cannot mix duration signs", Mo = "Missing relativeTo", No = "Cannot use large units", yo = "Required smallestUnit or largestUnit", vo = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, nn = e => `Cannot format ${e}`, rn = "Mismatching types for formatting", Po = "Cannot specify TimeZone", Eo = /*@__PURE__*/ Dt(P, ((e, n) => n)), So = /*@__PURE__*/ Dt(P, ((e, n, t) => t)), Fo = /*@__PURE__*/ Dt(padNumber, 2), wo = {
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
}, bo = /*@__PURE__*/ Object.keys(wo), Oo = 864e5, Bo = 1e3, ko = 1e3, He = 1e6, Co = 1e9, Yo = 6e10, Ro = 36e11, Zo = 864e11, zo = [ 1, ko, He, Co, Yo, Ro, Zo ], p = /*@__PURE__*/ bo.slice(0, 6), Ao = /*@__PURE__*/ sortStrings(p), Uo = [ "offset" ], qo = [ "timeZone" ], Wo = /*@__PURE__*/ p.concat(Uo), jo = /*@__PURE__*/ Wo.concat(qo), Lo = [ "era", "eraYear" ], xo = /*@__PURE__*/ Lo.concat([ "year" ]), $o = [ "year" ], Ho = [ "monthCode" ], Go = /*@__PURE__*/ [ "month" ].concat(Ho), Vo = [ "day" ], _o = /*@__PURE__*/ Go.concat($o), Jo = /*@__PURE__*/ Ho.concat($o), Ko = /*@__PURE__*/ Vo.concat(_o), Qo = /*@__PURE__*/ Vo.concat(Go), Xo = /*@__PURE__*/ Vo.concat(Ho), er = /*@__PURE__*/ So(p, 0), l = "iso8601", nr = "gregory", tr = "japanese", or = {
  [nr]: {
    "gregory-inverse": -1,
    gregory: 0
  },
  [tr]: {
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
}, rr = {
  [nr]: {
    bce: "gregory-inverse",
    ce: "gregory"
  },
  [tr]: {
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
}, ir = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, f = /*@__PURE__*/ Dt(requireType, "string"), D = /*@__PURE__*/ Dt(requireType, "boolean"), ar = /*@__PURE__*/ Dt(requireType, "number"), g = /*@__PURE__*/ bo.map((e => e + "s")), sr = /*@__PURE__*/ sortStrings(g), cr = /*@__PURE__*/ g.slice(0, 6), ur = /*@__PURE__*/ g.slice(6), lr = /*@__PURE__*/ ur.slice(1), fr = /*@__PURE__*/ Eo(g), dr = /*@__PURE__*/ So(g, 0), mr = /*@__PURE__*/ So(cr, 0), pr = /*@__PURE__*/ Dt(zeroOutProps, g), O = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], hr = [ "isoDay", "isoMonth", "isoYear" ], gr = /*@__PURE__*/ O.concat(hr), Dr = /*@__PURE__*/ sortStrings(hr), Tr = /*@__PURE__*/ sortStrings(O), Ir = /*@__PURE__*/ sortStrings(gr), yt = /*@__PURE__*/ So(Tr, 0), Mr = /*@__PURE__*/ Dt(zeroOutProps, gr), Nr = 1e8, yr = Nr * Oo, vr = [ Nr, 0 ], Pr = [ -Nr, 0 ], Er = 275760, Sr = -271821, _e = Intl.DateTimeFormat, Fr = "en-GB", wr = 1970, br = 1972, Or = 12, Br = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), kr = /*@__PURE__*/ en(computeJapaneseEraParts, WeakMap), Cr = "smallestUnit", Yr = "unit", Rr = "roundingIncrement", Zr = "fractionalSecondDigits", zr = "relativeTo", Ar = "direction", Ur = {
  constrain: 0,
  reject: 1
}, qr = /*@__PURE__*/ Object.keys(Ur), Wr = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, jr = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, Lr = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, xr = {
  auto: 0,
  never: 1,
  critical: 2
}, $r = {
  auto: 0,
  never: 1
}, Hr = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, Gr = {
  previous: -1,
  next: 1
}, Vr = /*@__PURE__*/ Dt(refineUnitOption, Cr), _r = /*@__PURE__*/ Dt(refineUnitOption, "largestUnit"), Jr = /*@__PURE__*/ Dt(refineUnitOption, Yr), Kr = /*@__PURE__*/ Dt(refineChoiceOption, "overflow", Ur), Qr = /*@__PURE__*/ Dt(refineChoiceOption, "disambiguation", Wr), Xr = /*@__PURE__*/ Dt(refineChoiceOption, "offset", jr), ei = /*@__PURE__*/ Dt(refineChoiceOption, "calendarName", Lr), ni = /*@__PURE__*/ Dt(refineChoiceOption, "timeZoneName", xr), ti = /*@__PURE__*/ Dt(refineChoiceOption, "offset", $r), oi = /*@__PURE__*/ Dt(refineChoiceOption, "roundingMode", Hr), Kt = "PlainYearMonth", Jt = "PlainMonthDay", x = "PlainDate", q = "PlainDateTime", ct = "PlainTime", W = "ZonedDateTime", ke = "Instant", y = "Duration", ri = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], ii = "UTC", ai = 5184e3, si = /*@__PURE__*/ isoArgsToEpochSec(1847), ci = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), ui = /0+$/, Se = /*@__PURE__*/ en(_zonedEpochSlotsToIso, WeakMap), li = 2 ** 32 - 1, Y = /*@__PURE__*/ en((e => {
  const n = getTimeZoneEssence(e);
  return "object" == typeof n ? new IntlTimeZone(n) : new FixedTimeZone(n || 0);
}));

class FixedTimeZone {
  constructor(e) {
    this.U = e;
  }
  N() {
    return this.U;
  }
  v(e) {
    return (e => {
      const n = isoToEpochNano({
        ...e,
        ...yt
      });
      if (!n || Math.abs(n[0]) > 1e8) {
        throw new RangeError("BAD!");
      }
    })(e), [ isoToEpochNanoWithOffset(e, this.U) ];
  }
  i() {}
}

class IntlTimeZone {
  constructor(e) {
    this.ae = (e => {
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
      const n = en(e), t = en(createSplitTuple);
      let o = si, r = ci;
      return {
        se(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        ue: getOffsetSec,
        i(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = ai * i, l = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
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
      const t = hashIntlFormatParts(e, n * Bo);
      return isoArgsToEpochSec(parseIntlPartsYear(t), parseInt(t.month), parseInt(t.day), parseInt(t.hour), parseInt(t.minute), parseInt(t.second)) - n;
    })(e));
  }
  N(e) {
    return this.ae.ue((e => epochNanoToSecMod(e)[0])(e)) * Co;
  }
  v(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.u, o.m, o.p), o.h * He + o.I * ko + o.l ];
    var o;
    return this.ae.se(n).map((e => checkEpochNanoInBounds(moveBigNano(xe(e, Co), t))));
  }
  i(e, n) {
    const [t, o] = epochNanoToSecMod(e), r = this.ae.i(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return xe(r, Co);
    }
  }
}

const fi = "([+-])", di = "(?:[.,](\\d{1,9}))?", mi = `(?:(?:${fi}(\\d{6}))|(\\d{4}))-?(\\d{2})`, pi = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + di + ")?)?", hi = fi + pi, gi = mi + "-?(\\d{2})(?:[T ]" + pi + "(Z|" + hi + ")?)?", Di = "\\[(!?)([^\\]]*)\\]", Ti = `((?:${Di}){0,9})`, Ii = /*@__PURE__*/ createRegExp(mi + Ti), Mi = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + Ti), Ni = /*@__PURE__*/ createRegExp(gi + Ti), yi = /*@__PURE__*/ createRegExp("T?" + pi + "(?:" + hi + ")?" + Ti), vi = /*@__PURE__*/ createRegExp(hi), Pi = /*@__PURE__*/ new RegExp(Di, "g"), Ei = /*@__PURE__*/ createRegExp(`${fi}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${di}H)?(?:(\\d+)${di}M)?(?:(\\d+)${di}S)?)?`), Si = /*@__PURE__*/ en((e => new _e(Fr, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), Fi = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, wi = /[^\w\/:+-]+/, bi = /^M(\d{2})(L?)$/, Oi = /*@__PURE__*/ en(createIntlCalendar), Bi = /*@__PURE__*/ en((e => new _e(Fr, {
  calendar: e,
  timeZone: ii,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), ki = {
  P(e, n, t) {
    const o = ut(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += durationFieldsToBigNano(n, 5)[0], i || a) {
      r = ((e, n, t, o, r) => {
        let [i, a, s] = e.B(n);
        if (t) {
          const [n, o] = e.k(i, a);
          i += t, a = monthCodeNumberToMonth(n, o, e.te(i)), a = clampEntity("month", a, 1, e.oe(i), r);
        }
        return o && ([i, a] = e.le(i, a, o)), s = clampEntity("day", s, 1, e.re(i, a), r), 
        e.L(i, a, s);
      })(this, e, i, a, o);
    } else {
      if (!s && !c) {
        return e;
      }
      r = isoToEpochMilli(e);
    }
    if (void 0 === r) {
      throw new RangeError("BAD!");
    }
    return r += (7 * s + c) * Oo, checkIsoDateInBounds(epochMilliToIso(r));
  },
  q(e, n, t) {
    if (t <= 7) {
      let o = 0, r = diffDays({
        ...e,
        ...yt
      }, {
        ...n,
        ...yt
      });
      return 7 === t && ([o, r] = divModTrunc(r, 7)), {
        ...dr,
        weeks: o,
        days: r
      };
    }
    const o = this.B(e), r = this.B(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      let s = r - n, c = i - t, u = a - o;
      if (s || c) {
        const l = Math.sign(s || c);
        let f = e.re(r, i), d = 0;
        if (Math.sign(u) === -l) {
          const o = f;
          [r, i] = e.le(r, i, -l), s = r - n, c = i - t, f = e.re(r, i), d = l < 0 ? -o : f;
        }
        if (u = a - Math.min(o, f) + d, s) {
          const [o, a] = e.k(n, t), [u, f] = e.k(r, i);
          if (c = u - o || Number(f) - Number(a), Math.sign(c) === -l) {
            const t = l < 0 && -e.oe(r);
            s = (r -= l) - n, c = i - monthCodeNumberToMonth(o, a, e.te(r)) + (t || e.oe(r));
          }
        }
      }
      return [ s, c, u ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.fe(i, o[0]), i = 0), {
      ...dr,
      years: i,
      months: a,
      days: s
    };
  },
  K(e, n) {
    const t = ut(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return R(checkIsoDateInBounds(this.R(o, r, i)), this.id || l);
  },
  X(e, n) {
    const t = ut(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.R(o, r, 1)), this.id || l);
  },
  ee(e, n) {
    const t = ut(n);
    let o, r, i, a = void 0 !== e.eraYear || void 0 !== e.year ? refineYear(this, e) : void 0;
    const s = !this.id;
    if (void 0 === a && s && (a = br), void 0 !== a) {
      const n = refineMonth(this, e, a, t);
      o = refineDay(this, e, n, a, t);
      const s = this.te(a);
      r = monthToMonthCodeNumber(n, s), i = n === s;
    } else {
      if (void 0 === e.monthCode) {
        throw new TypeError("BAD!");
      }
      if ([r, i] = parseMonthCode(e.monthCode), this.id && this.id !== nr && this.id !== tr) {
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
        o = refineDay(this, e, refineMonth(this, e, br, t), br, t);
      }
    }
    const c = this.C(r, i, o);
    if (!c) {
      throw new RangeError("Cannot guess year");
    }
    const [u, f] = c;
    return createPlainMonthDaySlots(checkIsoDateInBounds(this.R(u, f, o)), this.id || l);
  },
  fields(e) {
    return getCalendarEraOrigins(this) && e.includes("year") ? [ ...e, ...Lo ] : e;
  },
  ne(e, n) {
    const t = Object.assign(Object.create(null), e);
    return spliceFields(t, n, Go), getCalendarEraOrigins(this) && (spliceFields(t, n, xo), 
    this.id === tr && spliceFields(t, n, Qo, Lo)), t;
  },
  inLeapYear(e) {
    const [n] = this.B(e);
    return this.de(n);
  },
  monthsInYear(e) {
    const [n] = this.B(e);
    return this.oe(n);
  },
  daysInMonth(e) {
    const [n, t] = this.B(e);
    return this.re(n, t);
  },
  daysInYear(e) {
    const [n] = this.B(e);
    return this.me(n);
  },
  dayOfYear: computeNativeDayOfYear,
  era(e) {
    return this.pe(e)[0];
  },
  eraYear(e) {
    return this.pe(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.B(e), [o, r] = this.k(n, t);
    return formatMonthCode(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, Ci = {
  B: computeIsoDateParts,
  pe: computeIsoEraParts,
  k: computeIsoMonthCodeParts
}, Yi = {
  dayOfYear: computeNativeDayOfYear,
  B: computeIsoDateParts,
  L: isoArgsToEpochMilli
}, Ri = /*@__PURE__*/ Object.assign({}, Yi, {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  j(e) {
    function computeWeekShift(e) {
      return (7 - e < n ? 7 : 0) - e;
    }
    function computeWeeksInYear(e) {
      const n = computeIsoDaysInYear(l + e), t = e || 1, o = computeWeekShift(modFloor(a + n * t, 7));
      return c = (n + (o - s) * t) / 7;
    }
    const n = this.id ? 1 : 4, t = computeIsoDayOfWeek(e), o = this.dayOfYear(e), r = modFloor(t - 1, 7), i = o - 1, a = modFloor(r - i, 7), s = computeWeekShift(a);
    let c, u = Math.floor((i - s) / 7) + 1, l = e.isoYear;
    return u ? u > computeWeeksInYear(0) && (u = 1, l++) : (u = computeWeeksInYear(-1), 
    l--), [ u, l, c ];
  }
}), Zi = /*@__PURE__*/ Object.assign({}, ki, Ri, {
  B: computeIsoDateParts,
  pe: computeIsoEraParts,
  k: computeIsoMonthCodeParts,
  C(e, n) {
    if (!n) {
      return [ br, e ];
    }
  },
  de: computeIsoInLeapYear,
  te() {},
  oe: computeIsoMonthsInYear,
  fe: e => e * Or,
  re: computeIsoDaysInMonth,
  me: computeIsoDaysInYear,
  R: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  L: isoArgsToEpochMilli,
  le: (e, n, t) => (e += divTrunc(t, Or), (n += modTrunc(t, Or)) < 1 ? (e--, n += Or) : n > Or && (e++, 
  n -= Or), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), zi = {
  B: computeIntlDateParts,
  pe: computeIntlEraParts,
  k: computeIntlMonthCodeParts
}, Ai = {
  dayOfYear: computeNativeDayOfYear,
  B: computeIntlDateParts,
  L: computeIntlEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  j() {
    return [];
  }
}, Ui = /*@__PURE__*/ Object.assign({}, ki, Ai, {
  B: computeIntlDateParts,
  pe: computeIntlEraParts,
  k: computeIntlMonthCodeParts,
  C(e, n, t) {
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
    })(e, n, t) : br;
    let [r, i, a] = computeIntlDateParts.call(this, {
      isoYear: o,
      isoMonth: Or,
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
  de(e) {
    const n = computeIntlDaysInYear.call(this, e);
    return n > computeIntlDaysInYear.call(this, e - 1) && n > computeIntlDaysInYear.call(this, e + 1);
  },
  te: computeIntlLeapMonth,
  oe: computeIntlMonthsInYear,
  fe(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  re: computeIntlDaysInMonth,
  me: computeIntlDaysInYear,
  R(e, n, t) {
    return epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t));
  },
  L: computeIntlEpochMilli,
  le(e, n, t) {
    if (t) {
      if (n += t, !Number.isSafeInteger(n)) {
        throw new RangeError(Do);
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
    return this.G(e).year;
  },
  month(e) {
    const {year: n, $: t} = this.G(e), {J: o} = this.V(n);
    return o[t] + 1;
  },
  day(e) {
    return this.G(e).day;
  }
}), qi = /*@__PURE__*/ createNativeOpsCreator(Ci, zi), v = /*@__PURE__*/ createNativeOpsCreator(Zi, Ui), Wi = {
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
  .../*@__PURE__*/ So(p, toInteger),
  .../*@__PURE__*/ So(g, toStrictInteger),
  offset(e) {
    const n = toStringViaPrimitive(e);
    return parseOffsetNano(n), n;
  }
}, ji = /*@__PURE__*/ Dt(remapProps, p, O), Li = /*@__PURE__*/ Dt(remapProps, O, p), xi = "numeric", $i = [ "timeZoneName" ], Hi = {
  month: xi,
  day: xi
}, Gi = {
  year: xi,
  month: xi
}, Vi = /*@__PURE__*/ Object.assign({}, Gi, {
  day: xi
}), _i = {
  hour: xi,
  minute: xi,
  second: xi
}, Ji = /*@__PURE__*/ Object.assign({}, Vi, _i), Ki = /*@__PURE__*/ Object.assign({}, Ji, {
  timeZoneName: "short"
}), Qi = /*@__PURE__*/ Object.keys(Gi), Xi = /*@__PURE__*/ Object.keys(Hi), ea = /*@__PURE__*/ Object.keys(Vi), na = /*@__PURE__*/ Object.keys(_i), ta = [ "dateStyle" ], oa = /*@__PURE__*/ Qi.concat(ta), ra = /*@__PURE__*/ Xi.concat(ta), ia = /*@__PURE__*/ ea.concat(ta, [ "weekday" ]), aa = /*@__PURE__*/ na.concat([ "dayPeriod", "timeStyle", "fractionalSecondDigits" ]), sa = /*@__PURE__*/ ia.concat(aa), ca = /*@__PURE__*/ $i.concat(aa), ua = /*@__PURE__*/ $i.concat(ia), la = /*@__PURE__*/ $i.concat([ "day", "weekday" ], aa), fa = /*@__PURE__*/ $i.concat([ "year", "weekday" ], aa), da = /*@__PURE__*/ createOptionsTransformer(sa, Ji), ma = /*@__PURE__*/ createOptionsTransformer(sa, Ki), pa = /*@__PURE__*/ createOptionsTransformer(sa, Ji, $i), ha = /*@__PURE__*/ createOptionsTransformer(ia, Vi, ca), ga = /*@__PURE__*/ createOptionsTransformer(aa, _i, ua), Da = /*@__PURE__*/ createOptionsTransformer(oa, Gi, la), Ta = /*@__PURE__*/ createOptionsTransformer(ra, Hi, fa), Ia = {}, Ma = /*@__PURE__*/ new _e(void 0, {
  calendar: l
}).resolvedOptions().calendar === l, K = [ da, w ], et = [ ma, w, 0, (e, n) => {
  const t = e.timeZone;
  if (n && n.timeZone !== t) {
    throw new RangeError(lo);
  }
  return t;
} ], Q = [ pa, isoToEpochMilli ], U = [ ha, isoToEpochMilli ], X = [ ga, e => isoTimeFieldsToNano(e) / He ], _ = [ Da, isoToEpochMilli, Ma ], tt = [ Ta, isoToEpochMilli, Ma ];

let Na;

export { y as DurationBranding, ke as InstantBranding, x as PlainDateBranding, q as PlainDateTimeBranding, Jt as PlainMonthDayBranding, ct as PlainTimeBranding, Kt as PlainYearMonthBranding, _e as RawDateTimeFormat, W as ZonedDateTimeBranding, B as absDuration, N as addDurations, Dt as bindArgs, $ as compareDurations, $e as compareInstants, Xt as compareIsoDateFields, Bt as compareIsoDateTimeFields, Tt as compareIsoTimeFields, Ae as compareZonedDateTimes, de as computeZonedHoursInDay, we as computeZonedStartOfDay, Z as constructDurationSlots, Je as constructInstantSlots, se as constructPlainDateSlots, Ft as constructPlainDateTimeSlots, Vt as constructPlainMonthDaySlots, st as constructPlainTimeSlots, Ht as constructPlainYearMonthSlots, Me as constructZonedDateTimeSlots, ge as createDurationSlots, on as createFormatForPrep, H as createFormatPrepper, t as createGetterDescriptors, qe as createInstantSlots, r as createNameDescriptors, v as createNativeStandardOps, R as createPlainDateSlots, Zt as createPlainDateTimeSlots, mt as createPlainTimeSlots, n as createPropDescriptors, o as createStringTagDescriptors, Ue as createZonedDateTimeSlots, U as dateConfig, Q as dateTimeConfig, Ne as diffInstants, Ot as diffPlainDateTimes, ee as diffPlainDates, rt as diffPlainTimes, Wt as diffPlainYearMonth, pe as diffZonedDateTimes, g as durationFieldNamesAsc, j as durationWithFields, Ge as epochMilliToInstant, ze as epochNanoToInstant, C as forbiddenValueOf, V as formatDurationIso, Ve as formatInstantIso, me as formatOffsetNano, le as formatPlainDateIso, Ct as formatPlainDateTimeIso, Lt as formatPlainMonthDayIso, lt as formatPlainTimeIso, $t as formatPlainYearMonthIso, Ce as formatZonedDateTimeIso, Qe as getCurrentEpochNano, Xe as getCurrentIsoDateTime, Ke as getCurrentTimeZoneId, M as getDurationBlank, w as getEpochMilli, I as getEpochNano, K as instantConfig, Le as instantToZonedDateTime, Ee as instantsEqual, i as invalidBag, a as invalidCallingContext, nn as invalidFormatType, s as isObjectLike, l as isoCalendarId, yt as isoTimeFieldDefaults, O as isoTimeFieldNamesAsc, P as mapPropNames, e as mapProps, en as memoize, rn as mismatchingFormatTypes, tt as monthDayConfig, Be as moveInstant, te as movePlainDate, pt as movePlainDateTime, ot as movePlainTime, xt as movePlainYearMonth, Pe as moveZonedDateTime, He as nanoInMilli, A as negateDuration, xe as numberToBigNano, u as parseCalendarId, k as parseDuration, Re as parseInstant, fe as parsePlainDate, At as parsePlainDateTime, qt as parsePlainMonthDay, St as parsePlainTime, Ut as parsePlainYearMonth, z as parseRelativeToSlots, F as parseTimeZoneId, je as parseZonedDateTime, vt as plainDateTimeToZonedDateTime, ht as plainDateTimeWithFields, gt as plainDateTimeWithPlainTime, It as plainDateTimesEqual, re as plainDateToPlainDateTime, ie as plainDateToPlainMonthDay, ae as plainDateToPlainYearMonth, oe as plainDateToZonedDateTime, _t as plainDateWithFields, ne as plainDatesEqual, Et as plainMonthDayToPlainDate, Nt as plainMonthDayWithFields, Yt as plainMonthDaysEqual, nt as plainTimeWithFields, it as plainTimesEqual, zt as plainYearMonthToPlainDate, Rt as plainYearMonthWithFields, Gt as plainYearMonthsEqual, tn as pluckProps, Y as queryNativeTimeZone, bt as refineCalendarId, be as refineDirectionOptions, J as refineDurationBag, G as refineMaybeZonedDateTimeBag, ut as refineOverflowOptions, ue as refinePlainDateBag, jt as refinePlainDateTimeBag, kt as refinePlainMonthDayBag, dt as refinePlainTimeBag, Qt as refinePlainYearMonthBag, Fe as refineTimeZoneId, ye as refineZonedDateTimeBag, Ze as refineZonedFieldOptions, D as requireBoolean, S as requireInteger, d as requireIntegerOrUndefined, We as requireNumberIsInteger, T as requirePositiveInteger, h as requirePositiveIntegerOrUndefined, f as requireString, m as requireStringOrUndefined, c as resolveCalendarId, b as resolveTimeZoneId, E as roundDuration, Ye as roundInstant, wt as roundPlainDateTime, at as roundPlainTime, Oe as roundZonedDateTime, Pt as slotsWithCalendarId, De as slotsWithTimeZoneId, X as timeConfig, p as timeFieldNamesAsc, L as totalDuration, _ as yearMonthConfig, et as zonedConfig, ve as zonedDateTimeToInstant, ce as zonedDateTimeToPlainDate, Mt as zonedDateTimeToPlainDateTime, ft as zonedDateTimeToPlainTime, Te as zonedDateTimeWithFields, he as zonedDateTimeWithPlainTime, Ie as zonedDateTimesEqual, Se as zonedEpochSlotsToIso };
