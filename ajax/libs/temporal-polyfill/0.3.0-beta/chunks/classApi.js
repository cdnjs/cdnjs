function createSlotClass(i, l, s, c, u) {
  function Class(...t) {
    if (!(this instanceof Class)) {
      throw new TypeError(a);
    }
    sn(this, l(...t));
  }
  function bindMethod(t, e) {
    return Object.defineProperties((function(...e) {
      return t.call(this, getSpecificSlots(this), ...e);
    }), r(e));
  }
  function getSpecificSlots(t) {
    const e = ln(t);
    if (!e || e.branding !== i) {
      throw new TypeError(a);
    }
    return e;
  }
  return Object.defineProperties(Class.prototype, {
    ...t(e(bindMethod, s)),
    ...n(e(bindMethod, c)),
    ...o("Temporal." + i)
  }), Object.defineProperties(Class, {
    ...n(u),
    ...r(i)
  }), [ Class, t => {
    const e = Object.create(Class.prototype);
    return sn(e, t), e;
  }, getSpecificSlots ];
}

function rejectInvalidBag(t) {
  if (ln(t) || void 0 !== t.calendar || void 0 !== t.timeZone) {
    throw new TypeError(i);
  }
  return t;
}

function getCalendarIdFromBag(t) {
  return extractCalendarIdFromBag(t) || l;
}

function extractCalendarIdFromBag(t) {
  const {calendar: e} = t;
  if (void 0 !== e) {
    return refineCalendarArg(e);
  }
}

function refineCalendarArg(t) {
  if (s(t)) {
    const {calendar: e} = ln(t) || {};
    if (!e) {
      throw new TypeError("BAD!");
    }
    return e;
  }
  return (t => c(u(f(t))))(t);
}

function createCalendarGetters(t) {
  const e = {};
  for (const n in t) {
    e[n] = t => {
      const {calendar: e} = t;
      return v(e)[n](t);
    };
  }
  return e;
}

function neverValueOf() {
  throw new TypeError(C);
}

function refineTimeZoneArg(t) {
  if (s(t)) {
    const {timeZone: e} = ln(t) || {};
    if (!e) {
      throw new TypeError("BAD!");
    }
    return e;
  }
  return (t => b(F(f(t))))(t);
}

function toDurationSlots(t) {
  if (s(t)) {
    const e = ln(t);
    return e && e.branding === y ? e : J(t);
  }
  return k(t);
}

function refinePublicRelativeTo(t) {
  if (void 0 !== t) {
    if (s(t)) {
      const e = ln(t) || {};
      switch (e.branding) {
       case W:
       case x:
        return e;

       case q:
        return R(e);
      }
      const n = getCalendarIdFromBag(t);
      return {
        ...G(refineTimeZoneArg, Y, v(n), t),
        calendar: n
      };
    }
    return z(t);
  }
}

function toPlainTimeSlots(t, e) {
  if (s(t)) {
    const n = ln(t) || {};
    switch (n.branding) {
     case ct:
      return ut(e), n;

     case q:
      return ut(e), mt(n);

     case W:
      return ut(e), ft(Y, n);
    }
    return dt(t, e);
  }
  const n = St(t);
  return ut(e), n;
}

function optionalToPlainTimeFields(t) {
  return void 0 === t ? void 0 : toPlainTimeSlots(t);
}

function toPlainDateTimeSlots(t, e) {
  if (s(t)) {
    const n = ln(t) || {};
    switch (n.branding) {
     case q:
      return ut(e), n;

     case x:
      return ut(e), Zt({
        ...n,
        ...yt
      });

     case W:
      return ut(e), Mt(Y, n);
    }
    return jt(v(getCalendarIdFromBag(t)), t, e);
  }
  const n = At(t);
  return ut(e), n;
}

function toPlainMonthDaySlots(t, e) {
  if (s(t)) {
    const n = ln(t);
    if (n && n.branding === Jt) {
      return ut(e), n;
    }
    const o = extractCalendarIdFromBag(t);
    return kt(v(o || l), !o, t, e);
  }
  const n = qt(v, t);
  return ut(e), n;
}

function toPlainYearMonthSlots(t, e) {
  if (s(t)) {
    const n = ln(t);
    return n && n.branding === Kt ? (ut(e), n) : Qt(v(getCalendarIdFromBag(t)), t, e);
  }
  const n = Ut(v, t);
  return ut(e), n;
}

function toPlainDateSlots(t, e) {
  if (s(t)) {
    const n = ln(t) || {};
    switch (n.branding) {
     case x:
      return ut(e), n;

     case q:
      return ut(e), R(n);

     case W:
      return ut(e), ce(Y, n);
    }
    return ue(v(getCalendarIdFromBag(t)), t, e);
  }
  const n = fe(t);
  return ut(e), n;
}

function toZonedDateTimeSlots(t, e) {
  if (s(t)) {
    const n = ln(t);
    if (n && n.branding === W) {
      return Ze(e), n;
    }
    const o = getCalendarIdFromBag(t);
    return ye(refineTimeZoneArg, Y, v(o), o, t, e);
  }
  return je(t, e);
}

function adaptDateMethods(t) {
  return e((t => e => t(slotsToIso(e))), t);
}

function slotsToIso(t) {
  return Se(t, Y);
}

function toInstantSlots(t) {
  if (s(t)) {
    const e = ln(t);
    if (e) {
      switch (e.branding) {
       case ke:
        return e;

       case W:
        return qe(e.epochNanoseconds);
      }
    }
  }
  return Re(t);
}

function toTemporalInstant() {
  const t = Date.prototype.valueOf.call(this);
  return $n(qe(xe(We(t), He)));
}

function createDateTimeFormatClass() {
  function DateTimeFormatFunc(t, e) {
    return new DateTimeFormatNew(t, e);
  }
  function DateTimeFormatNew(t, e = Object.create(null)) {
    Xn.set(this, ((t, e) => {
      const n = new _e(t, e), o = n.resolvedOptions(), r = o.locale, a = tn(Object.keys(e), o), i = en(createFormatPrepperForBranding), prepFormat = (t, ...e) => {
        if (t) {
          if (2 !== e.length) {
            throw new TypeError("BAD!");
          }
          for (const t of e) {
            if (void 0 === t) {
              throw new TypeError("BAD!");
            }
          }
        }
        t || void 0 !== e[0] || (e = []);
        const o = e.map((t => ln(t) || Number(t)));
        let l, s = 0;
        for (const t of o) {
          const e = "object" == typeof t ? t.branding : void 0;
          if (s++ && e !== l) {
            throw new TypeError(rn);
          }
          l = e;
        }
        return l ? i(l)(r, a, ...o) : [ n, ...o ];
      };
      return prepFormat.o = n, prepFormat;
    })(t, e));
  }
  const t = _e.prototype, e = Object.getOwnPropertyDescriptors(t), n = Object.getOwnPropertyDescriptors(_e);
  for (const t in e) {
    const n = e[t], o = t.startsWith("format") && createFormatMethod(t);
    "function" == typeof n.value ? n.value = "constructor" === t ? DateTimeFormatFunc : o || createProxiedMethod(t) : o && (n.get = function() {
      if (!Xn.has(this)) {
        throw new TypeError("BAD!");
      }
      return (...t) => o.apply(this, t);
    }, Object.defineProperties(n.get, r(`get ${t}`)));
  }
  return n.prototype.value = DateTimeFormatNew.prototype = Object.create({}, e), Object.defineProperties(DateTimeFormatFunc, n), 
  DateTimeFormatFunc;
}

function createFormatMethod(t) {
  return Object.defineProperties((function(...e) {
    const n = Xn.get(this), [o, ...r] = n(t.includes("Range"), ...e);
    return o[t](...r);
  }), r(t));
}

function createProxiedMethod(t) {
  return Object.defineProperties((function(...e) {
    return Xn.get(this).o[t](...e);
  }), r(t));
}

function createFormatPrepperForBranding(t) {
  const e = In[t];
  if (!e) {
    throw new TypeError(nn(t));
  }
  return H(e, en(on), 1);
}

import { createGetterDescriptors as t, mapProps as e, createPropDescriptors as n, createStringTagDescriptors as o, createNameDescriptors as r, invalidCallingContext as a, invalidBag as i, isoCalendarId as l, isObjectLike as s, resolveCalendarId as c, parseCalendarId as u, requireString as f, requireStringOrUndefined as m, requireIntegerOrUndefined as d, requireInteger as S, requirePositiveInteger as T, requireBoolean as D, requirePositiveIntegerOrUndefined as h, mapPropNames as P, durationFieldNamesAsc as g, timeFieldNamesAsc as p, isoTimeFieldNamesAsc as O, getEpochMilli as w, getEpochNano as I, createNativeStandardOps as v, forbiddenValueOf as C, resolveTimeZoneId as b, parseTimeZoneId as F, getDurationBlank as M, constructDurationSlots as Z, DurationBranding as y, durationWithFields as j, negateDuration as A, absDuration as B, addDurations as N, queryNativeTimeZone as Y, roundDuration as E, totalDuration as L, formatDurationIso as V, refineDurationBag as J, parseDuration as k, PlainDateTimeBranding as q, createPlainDateSlots as R, PlainDateBranding as x, ZonedDateTimeBranding as W, refineMaybeZonedDateTimeBag as G, parseRelativeToSlots as z, compareDurations as $, createFormatPrepper as H, instantConfig as K, dateTimeConfig as Q, dateConfig as U, timeConfig as X, yearMonthConfig as _, monthDayConfig as tt, zonedConfig as et, plainTimeWithFields as nt, movePlainTime as ot, diffPlainTimes as rt, roundPlainTime as at, plainTimesEqual as it, formatPlainTimeIso as lt, constructPlainTimeSlots as st, PlainTimeBranding as ct, refineOverflowOptions as ut, zonedDateTimeToPlainTime as ft, createPlainTimeSlots as mt, refinePlainTimeBag as dt, parsePlainTime as St, compareIsoTimeFields as Tt, bindArgs as Dt, plainDateTimeWithFields as ht, slotsWithCalendarId as Pt, plainDateTimeWithPlainTime as gt, movePlainDateTime as pt, diffPlainDateTimes as Ot, roundPlainDateTime as wt, plainDateTimesEqual as It, plainDateTimeToZonedDateTime as vt, formatPlainDateTimeIso as Ct, refineCalendarId as bt, constructPlainDateTimeSlots as Ft, zonedDateTimeToPlainDateTime as Mt, createPlainDateTimeSlots as Zt, isoTimeFieldDefaults as yt, refinePlainDateTimeBag as jt, parsePlainDateTime as At, compareIsoDateTimeFields as Bt, plainMonthDayWithFields as Nt, plainMonthDaysEqual as Yt, plainMonthDayToPlainDate as Et, formatPlainMonthDayIso as Lt, constructPlainMonthDaySlots as Vt, PlainMonthDayBranding as Jt, refinePlainMonthDayBag as kt, parsePlainMonthDay as qt, plainYearMonthWithFields as Rt, movePlainYearMonth as xt, diffPlainYearMonth as Wt, plainYearMonthsEqual as Gt, plainYearMonthToPlainDate as zt, formatPlainYearMonthIso as $t, constructPlainYearMonthSlots as Ht, PlainYearMonthBranding as Kt, refinePlainYearMonthBag as Qt, parsePlainYearMonth as Ut, compareIsoDateFields as Xt, plainDateWithFields as _t, movePlainDate as te, diffPlainDates as ee, plainDatesEqual as ne, plainDateToZonedDateTime as oe, plainDateToPlainDateTime as re, plainDateToPlainYearMonth as ae, plainDateToPlainMonthDay as ie, formatPlainDateIso as le, constructPlainDateSlots as se, zonedDateTimeToPlainDate as ce, refinePlainDateBag as ue, parsePlainDate as fe, formatOffsetNano as me, computeZonedHoursInDay as de, zonedEpochSlotsToIso as Se, zonedDateTimeWithFields as Te, slotsWithTimeZoneId as De, zonedDateTimeWithPlainTime as he, moveZonedDateTime as Pe, createDurationSlots as ge, diffZonedDateTimes as pe, roundZonedDateTime as Oe, computeZonedStartOfDay as we, zonedDateTimesEqual as Ie, zonedDateTimeToInstant as ve, formatZonedDateTimeIso as Ce, refineDirectionOptions as be, refineTimeZoneId as Fe, constructZonedDateTimeSlots as Me, refineZonedFieldOptions as Ze, refineZonedDateTimeBag as ye, parseZonedDateTime as je, compareZonedDateTimes as Ae, moveInstant as Be, diffInstants as Ne, roundInstant as Ye, instantsEqual as Ee, instantToZonedDateTime as Le, formatInstantIso as Ve, constructInstantSlots as Je, InstantBranding as ke, createInstantSlots as qe, parseInstant as Re, numberToBigNano as xe, requireNumberIsInteger as We, epochMilliToInstant as Ge, epochNanoToInstant as ze, compareInstants as $e, nanoInMilli as He, getCurrentTimeZoneId as Ke, getCurrentEpochNano as Qe, createZonedDateTimeSlots as Ue, getCurrentIsoDateTime as Xe, RawDateTimeFormat as _e, pluckProps as tn, memoize as en, invalidFormatType as nn, createFormatForPrep as on, mismatchingFormatTypes as rn } from "./internal.js";

const an = /*@__PURE__*/ new WeakMap, ln = /*@__PURE__*/ an.get.bind(an), sn = /*@__PURE__*/ an.set.bind(an), cn = {
  era: m,
  eraYear: d,
  year: S,
  month: T,
  daysInMonth: T,
  daysInYear: T,
  inLeapYear: D,
  monthsInYear: T
}, un = {
  monthCode: f
}, fn = {
  day: T
}, mn = {
  dayOfWeek: T,
  dayOfYear: T,
  weekOfYear: h,
  yearOfWeek: d,
  daysInWeek: T
}, dn = /*@__PURE__*/ createCalendarGetters(/*@__PURE__*/ Object.assign({}, cn, un, fn, mn)), Sn = /*@__PURE__*/ createCalendarGetters({
  ...cn,
  ...un
}), Tn = /*@__PURE__*/ createCalendarGetters({
  ...un,
  ...fn
}), Dn = {
  calendarId: t => t.calendar
}, hn = /*@__PURE__*/ P((t => e => e[t]), g.concat("sign")), Pn = /*@__PURE__*/ P(((t, e) => t => t[O[e]]), p), gn = {
  epochMilliseconds: w,
  epochNanoseconds: I
}, [pn, On, wn] = createSlotClass(y, Z, {
  ...hn,
  blank: M
}, {
  with: (t, e) => On(j(t, e)),
  negated: t => On(A(t)),
  abs: t => On(B(t)),
  add: (t, e, n) => On(N(refinePublicRelativeTo, v, Y, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => On(N(refinePublicRelativeTo, v, Y, 1, t, toDurationSlots(e), n)),
  round: (t, e) => On(E(refinePublicRelativeTo, v, Y, t, e)),
  total: (t, e) => L(refinePublicRelativeTo, v, Y, t, e),
  toLocaleString(t, e, n) {
    return Intl.DurationFormat ? new Intl.DurationFormat(e, n).format(this) : V(t);
  },
  toString: V,
  toJSON: t => V(t),
  valueOf: neverValueOf
}, {
  from: t => On(toDurationSlots(t)),
  compare: (t, e, n) => $(refinePublicRelativeTo, v, Y, toDurationSlots(t), toDurationSlots(e), n)
}), In = {
  Instant: K,
  PlainDateTime: Q,
  PlainDate: U,
  PlainTime: X,
  PlainYearMonth: _,
  PlainMonthDay: tt
}, vn = /*@__PURE__*/ H(K), Cn = /*@__PURE__*/ H(et), bn = /*@__PURE__*/ H(Q), Fn = /*@__PURE__*/ H(U), Mn = /*@__PURE__*/ H(X), Zn = /*@__PURE__*/ H(_), yn = /*@__PURE__*/ H(tt), [jn, An] = createSlotClass(ct, st, Pn, {
  with(t, e, n) {
    return An(nt(this, rejectInvalidBag(e), n));
  },
  add: (t, e) => An(ot(0, t, toDurationSlots(e))),
  subtract: (t, e) => An(ot(1, t, toDurationSlots(e))),
  until: (t, e, n) => On(rt(0, t, toPlainTimeSlots(e), n)),
  since: (t, e, n) => On(rt(1, t, toPlainTimeSlots(e), n)),
  round: (t, e) => An(at(t, e)),
  equals: (t, e) => it(t, toPlainTimeSlots(e)),
  toLocaleString(t, e, n) {
    const [o, r] = Mn(e, n, t);
    return o.format(r);
  },
  toString: lt,
  toJSON: t => lt(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => An(toPlainTimeSlots(t, e)),
  compare: (t, e) => Tt(toPlainTimeSlots(t), toPlainTimeSlots(e))
}), [Bn, Nn] = createSlotClass(q, Dt(Ft, bt), {
  ...Dn,
  ...dn,
  ...Pn
}, {
  with: (t, e, n) => Nn(ht(v, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => Nn(Pt(t, refineCalendarArg(e))),
  withPlainTime: (t, e) => Nn(gt(t, optionalToPlainTimeFields(e))),
  add: (t, e, n) => Nn(pt(v, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => Nn(pt(v, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => On(Ot(v, 0, t, toPlainDateTimeSlots(e), n)),
  since: (t, e, n) => On(Ot(v, 1, t, toPlainDateTimeSlots(e), n)),
  round: (t, e) => Nn(wt(t, e)),
  equals: (t, e) => It(t, toPlainDateTimeSlots(e)),
  toZonedDateTime: (t, e, n) => Gn(vt(Y, t, refineTimeZoneArg(e), n)),
  toPlainDate: t => Rn(R(t)),
  toPlainTime: t => An(mt(t)),
  toLocaleString(t, e, n) {
    const [o, r] = bn(e, n, t);
    return o.format(r);
  },
  toString: Ct,
  toJSON: t => Ct(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Nn(toPlainDateTimeSlots(t, e)),
  compare: (t, e) => Bt(toPlainDateTimeSlots(t), toPlainDateTimeSlots(e))
}), [Yn, En, Ln] = createSlotClass(Jt, Dt(Vt, bt), {
  ...Dn,
  ...Tn
}, {
  with: (t, e, n) => En(Nt(v, t, rejectInvalidBag(e), n)),
  equals: (t, e) => Yt(t, toPlainMonthDaySlots(e)),
  toPlainDate(t, e) {
    return Rn(Et(v, t, this, e));
  },
  toLocaleString(t, e, n) {
    const [o, r] = yn(e, n, t);
    return o.format(r);
  },
  toString: Lt,
  toJSON: t => Lt(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => En(toPlainMonthDaySlots(t, e))
}), [Vn, Jn, kn] = createSlotClass(Kt, Dt(Ht, bt), {
  ...Dn,
  ...Sn
}, {
  with: (t, e, n) => Jn(Rt(v, t, rejectInvalidBag(e), n)),
  add: (t, e, n) => Jn(xt(v, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => Jn(xt(v, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => On(Wt(v, 0, t, toPlainYearMonthSlots(e), n)),
  since: (t, e, n) => On(Wt(v, 1, t, toPlainYearMonthSlots(e), n)),
  equals: (t, e) => Gt(t, toPlainYearMonthSlots(e)),
  toPlainDate(t, e) {
    return Rn(zt(v, t, this, e));
  },
  toLocaleString(t, e, n) {
    const [o, r] = Zn(e, n, t);
    return o.format(r);
  },
  toString: $t,
  toJSON: t => $t(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Jn(toPlainYearMonthSlots(t, e)),
  compare: (t, e) => Xt(toPlainYearMonthSlots(t), toPlainYearMonthSlots(e))
}), [qn, Rn, xn] = createSlotClass(x, Dt(se, bt), {
  ...Dn,
  ...dn
}, {
  with: (t, e, n) => Rn(_t(v, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => Rn(Pt(t, refineCalendarArg(e))),
  add: (t, e, n) => Rn(te(v, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => Rn(te(v, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => On(ee(v, 0, t, toPlainDateSlots(e), n)),
  since: (t, e, n) => On(ee(v, 1, t, toPlainDateSlots(e), n)),
  equals: (t, e) => ne(t, toPlainDateSlots(e)),
  toZonedDateTime(t, e) {
    const n = s(e) ? e : {
      timeZone: e
    };
    return Gn(oe(refineTimeZoneArg, toPlainTimeSlots, Y, t, n));
  },
  toPlainDateTime: (t, e) => Nn(re(t, optionalToPlainTimeFields(e))),
  toPlainYearMonth(t) {
    return Jn(ae(v, t, this));
  },
  toPlainMonthDay(t) {
    return En(ie(v, t, this));
  },
  toLocaleString(t, e, n) {
    const [o, r] = Fn(e, n, t);
    return o.format(r);
  },
  toString: le,
  toJSON: t => le(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Rn(toPlainDateSlots(t, e)),
  compare: (t, e) => Xt(toPlainDateSlots(t), toPlainDateSlots(e))
}), [Wn, Gn] = createSlotClass(W, Dt(Me, bt, Fe), {
  ...gn,
  ...Dn,
  ...adaptDateMethods(dn),
  ...adaptDateMethods(Pn),
  offset: t => me(slotsToIso(t).offsetNanoseconds),
  offsetNanoseconds: t => slotsToIso(t).offsetNanoseconds,
  timeZoneId: t => t.timeZone,
  hoursInDay: t => de(Y, t)
}, {
  with: (t, e, n) => Gn(Te(v, Y, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => Gn(Pt(t, refineCalendarArg(e))),
  withTimeZone: (t, e) => Gn(De(t, refineTimeZoneArg(e))),
  withPlainTime: (t, e) => Gn(he(Y, t, optionalToPlainTimeFields(e))),
  add: (t, e, n) => Gn(Pe(v, Y, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => Gn(Pe(v, Y, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => On(ge(pe(v, Y, 0, t, toZonedDateTimeSlots(e), n))),
  since: (t, e, n) => On(ge(pe(v, Y, 1, t, toZonedDateTimeSlots(e), n))),
  round: (t, e) => Gn(Oe(Y, t, e)),
  startOfDay: t => Gn(we(Y, t)),
  equals: (t, e) => Ie(t, toZonedDateTimeSlots(e)),
  toInstant: t => $n(ve(t)),
  toPlainDateTime: t => Nn(Mt(Y, t)),
  toPlainDate: t => Rn(ce(Y, t)),
  toPlainTime: t => An(ft(Y, t)),
  toLocaleString(t, e, n = {}) {
    const [o, r] = Cn(e, n, t);
    return o.format(r);
  },
  toString: (t, e) => Ce(Y, t, e),
  toJSON: t => Ce(Y, t),
  valueOf: neverValueOf,
  getTimeZoneTransition(t, e) {
    const {timeZone: n, epochNanoseconds: o} = t, r = be(e), a = Y(n).i(o, r);
    return a ? Gn({
      ...t,
      epochNanoseconds: a
    }) : null;
  }
}, {
  from: (t, e) => Gn(toZonedDateTimeSlots(t, e)),
  compare: (t, e) => Ae(toZonedDateTimeSlots(t), toZonedDateTimeSlots(e))
}), [zn, $n, Hn] = createSlotClass(ke, Je, gn, {
  add: (t, e) => $n(Be(0, t, toDurationSlots(e))),
  subtract: (t, e) => $n(Be(1, t, toDurationSlots(e))),
  until: (t, e, n) => On(Ne(0, t, toInstantSlots(e), n)),
  since: (t, e, n) => On(Ne(1, t, toInstantSlots(e), n)),
  round: (t, e) => $n(Ye(t, e)),
  equals: (t, e) => Ee(t, toInstantSlots(e)),
  toZonedDateTimeISO: (t, e) => Gn(Le(t, refineTimeZoneArg(e))),
  toLocaleString(t, e, n) {
    const [o, r] = vn(e, n, t);
    return o.format(r);
  },
  toString: (t, e) => Ve(refineTimeZoneArg, Y, t, e),
  toJSON: t => Ve(refineTimeZoneArg, Y, t),
  valueOf: neverValueOf
}, {
  from: t => $n(toInstantSlots(t)),
  fromEpochMilliseconds: t => $n(Ge(t)),
  fromEpochNanoseconds: t => $n(ze(t)),
  compare: (t, e) => $e(toInstantSlots(t), toInstantSlots(e))
}), Kn = /*@__PURE__*/ Object.defineProperties({}, {
  ...o("Temporal.Now"),
  ...n({
    timeZoneId: () => Ke(),
    instant: () => $n(qe(Qe())),
    zonedDateTimeISO: (t = Ke()) => Gn(Ue(Qe(), refineTimeZoneArg(t), l)),
    plainDateTimeISO: (t = Ke()) => Nn(Zt(Xe(Y(refineTimeZoneArg(t))), l)),
    plainDateISO: (t = Ke()) => Rn(R(Xe(Y(refineTimeZoneArg(t))), l)),
    plainTimeISO: (t = Ke()) => An(mt(Xe(Y(refineTimeZoneArg(t)))))
  })
}), Qn = /*@__PURE__*/ Object.defineProperties({}, {
  ...o("Temporal"),
  ...n({
    PlainYearMonth: Vn,
    PlainMonthDay: Yn,
    PlainDate: qn,
    PlainTime: jn,
    PlainDateTime: Bn,
    ZonedDateTime: Wn,
    Instant: zn,
    Duration: pn,
    Now: Kn
  })
}), Un = /*@__PURE__*/ createDateTimeFormatClass(), Xn = /*@__PURE__*/ new WeakMap, _n = /*@__PURE__*/ Object.defineProperties(Object.create(Intl), n({
  DateTimeFormat: Un
}));

export { Un as DateTimeFormat, _n as IntlExtended, Qn as Temporal, toTemporalInstant };
