function createSlotClass(i, l, s, c, u) {
  function Class(...t) {
    if (!(this instanceof Class)) {
      throw new TypeError(a);
    }
    un(this, l(...t));
  }
  function bindMethod(t, e) {
    return Object.defineProperties((function(...e) {
      return t.call(this, getSpecificSlots(this), ...e);
    }), r(e));
  }
  function getSpecificSlots(t) {
    const e = cn(t);
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
    return un(e, t), e;
  }, getSpecificSlots ];
}

function rejectInvalidBag(t) {
  if (cn(t) || void 0 !== t.calendar || void 0 !== t.timeZone) {
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
    const {calendar: e} = cn(t) || {};
    if (!e) {
      throw new TypeError(c(t));
    }
    return e;
  }
  return (t => u(f(m(t))))(t);
}

function createCalendarGetters(t) {
  const e = {};
  for (const n in t) {
    e[n] = t => {
      const {calendar: e} = t;
      return C(e)[n](t);
    };
  }
  return e;
}

function neverValueOf() {
  throw new TypeError(b);
}

function refineTimeZoneArg(t) {
  if (s(t)) {
    const {timeZone: e} = cn(t) || {};
    if (!e) {
      throw new TypeError(F(t));
    }
    return e;
  }
  return (t => M(Z(m(t))))(t);
}

function toDurationSlots(t) {
  if (s(t)) {
    const e = cn(t);
    return e && e.branding === N ? e : q(t);
  }
  return R(t);
}

function refinePublicRelativeTo(t) {
  if (void 0 !== t) {
    if (s(t)) {
      const e = cn(t) || {};
      switch (e.branding) {
       case z:
       case G:
        return e;

       case x:
        return W(e);
      }
      const n = getCalendarIdFromBag(t);
      return {
        ...$(refineTimeZoneArg, L, C(n), t),
        calendar: n
      };
    }
    return H(t);
  }
}

function toPlainTimeSlots(t, e) {
  if (s(t)) {
    const n = cn(t) || {};
    switch (n.branding) {
     case ft:
      return mt(e), n;

     case x:
      return mt(e), St(n);

     case z:
      return mt(e), dt(L, n);
    }
    return Tt(t, e);
  }
  const n = ht(t);
  return mt(e), n;
}

function optionalToPlainTimeFields(t) {
  return void 0 === t ? void 0 : toPlainTimeSlots(t);
}

function toPlainDateTimeSlots(t, e) {
  if (s(t)) {
    const n = cn(t) || {};
    switch (n.branding) {
     case x:
      return mt(e), n;

     case G:
      return mt(e), jt({
        ...n,
        ...Nt
      });

     case z:
      return mt(e), yt(L, n);
    }
    return At(C(getCalendarIdFromBag(t)), t, e);
  }
  const n = Bt(t);
  return mt(e), n;
}

function toPlainMonthDaySlots(t, e) {
  if (s(t)) {
    const n = cn(t);
    if (n && n.branding === qt) {
      return mt(e), n;
    }
    const o = extractCalendarIdFromBag(t);
    return Rt(C(o || l), !o, t, e);
  }
  const n = xt(C, t);
  return mt(e), n;
}

function toPlainYearMonthSlots(t, e) {
  if (s(t)) {
    const n = cn(t);
    return n && n.branding === Ut ? (mt(e), n) : Xt(C(getCalendarIdFromBag(t)), t, e);
  }
  const n = _t(C, t);
  return mt(e), n;
}

function toPlainDateSlots(t, e) {
  if (s(t)) {
    const n = cn(t) || {};
    switch (n.branding) {
     case G:
      return mt(e), n;

     case x:
      return mt(e), W(n);

     case z:
      return mt(e), fe(L, n);
    }
    return me(C(getCalendarIdFromBag(t)), t, e);
  }
  const n = de(t);
  return mt(e), n;
}

function toZonedDateTimeSlots(t, e) {
  if (s(t)) {
    const n = cn(t);
    if (n && n.branding === z) {
      return je(e), n;
    }
    const o = getCalendarIdFromBag(t);
    return Ne(refineTimeZoneArg, L, C(o), o, t, e);
  }
  return Ae(t, e);
}

function adaptDateMethods(t) {
  return e((t => e => t(slotsToIso(e))), t);
}

function slotsToIso(t) {
  return he(t, L);
}

function toInstantSlots(t) {
  if (s(t)) {
    const e = cn(t);
    if (e) {
      switch (e.branding) {
       case Re:
        return e;

       case z:
        return xe(e.epochNanoseconds);
      }
    }
  }
  return We(t);
}

function toTemporalInstant() {
  const t = Date.prototype.valueOf.call(this);
  return Kn(xe(Ge(ze(t), Qe)));
}

function createDateTimeFormatClass() {
  function DateTimeFormatFunc(t, e) {
    return new DateTimeFormatNew(t, e);
  }
  function DateTimeFormatNew(t, e = Object.create(null)) {
    to.set(this, ((t, e) => {
      const n = new en(t, e), o = n.resolvedOptions(), r = o.locale, a = nn(Object.keys(e), o), i = on(createFormatPrepperForBranding), prepFormat = (t, ...e) => {
        if (t) {
          if (2 !== e.length) {
            throw new TypeError(ln);
          }
          for (const t of e) {
            if (void 0 === t) {
              throw new TypeError(ln);
            }
          }
        }
        t || void 0 !== e[0] || (e = []);
        const o = e.map((t => cn(t) || Number(t)));
        let l, s = 0;
        for (const t of o) {
          const e = "object" == typeof t ? t.branding : void 0;
          if (s++ && e !== l) {
            throw new TypeError(ln);
          }
          l = e;
        }
        return l ? i(l)(r, a, ...o) : [ n, ...o ];
      };
      return prepFormat.X = n, prepFormat;
    })(t, e));
  }
  const t = en.prototype, e = Object.getOwnPropertyDescriptors(t), n = Object.getOwnPropertyDescriptors(en);
  for (const t in e) {
    const n = e[t], o = t.startsWith("format") && createFormatMethod(t);
    "function" == typeof n.value ? n.value = "constructor" === t ? DateTimeFormatFunc : o || createProxiedMethod(t) : o && (n.get = function() {
      if (!to.has(this)) {
        throw new TypeError(a);
      }
      return (...t) => o.apply(this, t);
    }, Object.defineProperties(n.get, r(`get ${t}`)));
  }
  return n.prototype.value = DateTimeFormatNew.prototype = Object.create({}, e), Object.defineProperties(DateTimeFormatFunc, n), 
  DateTimeFormatFunc;
}

function createFormatMethod(t) {
  return Object.defineProperties((function(...e) {
    const n = to.get(this), [o, ...r] = n(t.includes("Range"), ...e);
    return o[t](...r);
  }), r(t));
}

function createProxiedMethod(t) {
  return Object.defineProperties((function(...e) {
    return to.get(this).X[t](...e);
  }), r(t));
}

function createFormatPrepperForBranding(t) {
  const e = Cn[t];
  if (!e) {
    throw new TypeError(rn(t));
  }
  return Q(e, on(an), 1);
}

import { createGetterDescriptors as t, mapProps as e, createPropDescriptors as n, createStringTagDescriptors as o, createNameDescriptors as r, invalidCallingContext as a, invalidBag as i, isoCalendarId as l, isObjectLike as s, invalidCalendar as c, resolveCalendarId as u, parseCalendarId as f, requireString as m, requireStringOrUndefined as d, requireIntegerOrUndefined as S, requireInteger as T, requirePositiveInteger as h, requireBoolean as D, requirePositiveIntegerOrUndefined as P, mapPropNames as g, durationFieldNamesAsc as p, timeFieldNamesAsc as O, isoTimeFieldNamesAsc as w, getEpochMilli as I, getEpochNano as v, createNativeStandardOps as C, forbiddenValueOf as b, invalidTimeZone as F, resolveTimeZoneId as M, parseTimeZoneId as Z, getDurationBlank as y, constructDurationSlots as j, DurationBranding as N, durationWithFields as A, negateDuration as B, absDuration as Y, addDurations as E, queryNativeTimeZone as L, roundDuration as V, totalDuration as J, formatDurationIso as k, refineDurationBag as q, parseDuration as R, PlainDateTimeBranding as x, createPlainDateSlots as W, PlainDateBranding as G, ZonedDateTimeBranding as z, refineMaybeZonedDateTimeBag as $, parseRelativeToSlots as H, compareDurations as K, createFormatPrepper as Q, instantConfig as U, dateTimeConfig as X, dateConfig as _, timeConfig as tt, yearMonthConfig as et, monthDayConfig as nt, zonedConfig as ot, plainTimeWithFields as rt, movePlainTime as at, diffPlainTimes as it, roundPlainTime as lt, plainTimesEqual as st, formatPlainTimeIso as ct, constructPlainTimeSlots as ut, PlainTimeBranding as ft, refineOverflowOptions as mt, zonedDateTimeToPlainTime as dt, createPlainTimeSlots as St, refinePlainTimeBag as Tt, parsePlainTime as ht, compareIsoTimeFields as Dt, bindArgs as Pt, plainDateTimeWithFields as gt, slotsWithCalendarId as pt, plainDateTimeWithPlainTime as Ot, movePlainDateTime as wt, diffPlainDateTimes as It, roundPlainDateTime as vt, plainDateTimesEqual as Ct, plainDateTimeToZonedDateTime as bt, formatPlainDateTimeIso as Ft, refineCalendarId as Mt, constructPlainDateTimeSlots as Zt, zonedDateTimeToPlainDateTime as yt, createPlainDateTimeSlots as jt, isoTimeFieldDefaults as Nt, refinePlainDateTimeBag as At, parsePlainDateTime as Bt, compareIsoDateTimeFields as Yt, plainMonthDayWithFields as Et, plainMonthDaysEqual as Lt, plainMonthDayToPlainDate as Vt, formatPlainMonthDayIso as Jt, constructPlainMonthDaySlots as kt, PlainMonthDayBranding as qt, refinePlainMonthDayBag as Rt, parsePlainMonthDay as xt, plainYearMonthWithFields as Wt, movePlainYearMonth as Gt, diffPlainYearMonth as zt, plainYearMonthsEqual as $t, plainYearMonthToPlainDate as Ht, formatPlainYearMonthIso as Kt, constructPlainYearMonthSlots as Qt, PlainYearMonthBranding as Ut, refinePlainYearMonthBag as Xt, parsePlainYearMonth as _t, compareIsoDateFields as te, plainDateWithFields as ee, movePlainDate as ne, diffPlainDates as oe, plainDatesEqual as re, plainDateToZonedDateTime as ae, plainDateToPlainDateTime as ie, plainDateToPlainYearMonth as le, plainDateToPlainMonthDay as se, formatPlainDateIso as ce, constructPlainDateSlots as ue, zonedDateTimeToPlainDate as fe, refinePlainDateBag as me, parsePlainDate as de, formatOffsetNano as Se, computeZonedHoursInDay as Te, zonedEpochSlotsToIso as he, zonedDateTimeWithFields as De, slotsWithTimeZoneId as Pe, zonedDateTimeWithPlainTime as ge, moveZonedDateTime as pe, createDurationSlots as Oe, diffZonedDateTimes as we, roundZonedDateTime as Ie, computeZonedStartOfDay as ve, zonedDateTimesEqual as Ce, zonedDateTimeToInstant as be, formatZonedDateTimeIso as Fe, refineDirectionOptions as Me, refineTimeZoneId as Ze, constructZonedDateTimeSlots as ye, refineZonedFieldOptions as je, refineZonedDateTimeBag as Ne, parseZonedDateTime as Ae, compareZonedDateTimes as Be, moveInstant as Ye, diffInstants as Ee, roundInstant as Le, instantsEqual as Ve, instantToZonedDateTime as Je, formatInstantIso as ke, constructInstantSlots as qe, InstantBranding as Re, createInstantSlots as xe, parseInstant as We, numberToBigNano as Ge, requireNumberIsInteger as ze, epochMilliToInstant as $e, epochNanoToInstant as He, compareInstants as Ke, nanoInMilli as Qe, getCurrentTimeZoneId as Ue, getCurrentEpochNano as Xe, createZonedDateTimeSlots as _e, getCurrentIsoDateTime as tn, RawDateTimeFormat as en, pluckProps as nn, memoize as on, invalidFormatType as rn, createFormatForPrep as an, mismatchingFormatTypes as ln } from "./internal.js";

const sn = /*@__PURE__*/ new WeakMap, cn = /*@__PURE__*/ sn.get.bind(sn), un = /*@__PURE__*/ sn.set.bind(sn), fn = {
  era: d,
  eraYear: S,
  year: T,
  month: h,
  daysInMonth: h,
  daysInYear: h,
  inLeapYear: D,
  monthsInYear: h
}, mn = {
  monthCode: m
}, dn = {
  day: h
}, Sn = {
  dayOfWeek: h,
  dayOfYear: h,
  weekOfYear: P,
  yearOfWeek: S,
  daysInWeek: h
}, Tn = /*@__PURE__*/ createCalendarGetters(/*@__PURE__*/ Object.assign({}, fn, mn, dn, Sn)), hn = /*@__PURE__*/ createCalendarGetters({
  ...fn,
  ...mn
}), Dn = /*@__PURE__*/ createCalendarGetters({
  ...mn,
  ...dn
}), Pn = {
  calendarId: t => t.calendar
}, gn = /*@__PURE__*/ g((t => e => e[t]), p.concat("sign")), pn = /*@__PURE__*/ g(((t, e) => t => t[w[e]]), O), On = {
  epochMilliseconds: I,
  epochNanoseconds: v
}, [wn, In, vn] = createSlotClass(N, j, {
  ...gn,
  blank: y
}, {
  with: (t, e) => In(A(t, e)),
  negated: t => In(B(t)),
  abs: t => In(Y(t)),
  add: (t, e, n) => In(E(refinePublicRelativeTo, C, L, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => In(E(refinePublicRelativeTo, C, L, 1, t, toDurationSlots(e), n)),
  round: (t, e) => In(V(refinePublicRelativeTo, C, L, t, e)),
  total: (t, e) => J(refinePublicRelativeTo, C, L, t, e),
  toLocaleString(t, e, n) {
    return Intl.DurationFormat ? new Intl.DurationFormat(e, n).format(this) : k(t);
  },
  toString: k,
  toJSON: t => k(t),
  valueOf: neverValueOf
}, {
  from: t => In(toDurationSlots(t)),
  compare: (t, e, n) => K(refinePublicRelativeTo, C, L, toDurationSlots(t), toDurationSlots(e), n)
}), Cn = {
  Instant: U,
  PlainDateTime: X,
  PlainDate: _,
  PlainTime: tt,
  PlainYearMonth: et,
  PlainMonthDay: nt
}, bn = /*@__PURE__*/ Q(U), Fn = /*@__PURE__*/ Q(ot), Mn = /*@__PURE__*/ Q(X), Zn = /*@__PURE__*/ Q(_), yn = /*@__PURE__*/ Q(tt), jn = /*@__PURE__*/ Q(et), Nn = /*@__PURE__*/ Q(nt), [An, Bn] = createSlotClass(ft, ut, pn, {
  with(t, e, n) {
    return Bn(rt(this, rejectInvalidBag(e), n));
  },
  add: (t, e) => Bn(at(0, t, toDurationSlots(e))),
  subtract: (t, e) => Bn(at(1, t, toDurationSlots(e))),
  until: (t, e, n) => In(it(0, t, toPlainTimeSlots(e), n)),
  since: (t, e, n) => In(it(1, t, toPlainTimeSlots(e), n)),
  round: (t, e) => Bn(lt(t, e)),
  equals: (t, e) => st(t, toPlainTimeSlots(e)),
  toLocaleString(t, e, n) {
    const [o, r] = yn(e, n, t);
    return o.format(r);
  },
  toString: ct,
  toJSON: t => ct(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Bn(toPlainTimeSlots(t, e)),
  compare: (t, e) => Dt(toPlainTimeSlots(t), toPlainTimeSlots(e))
}), [Yn, En] = createSlotClass(x, Pt(Zt, Mt), {
  ...Pn,
  ...Tn,
  ...pn
}, {
  with: (t, e, n) => En(gt(C, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => En(pt(t, refineCalendarArg(e))),
  withPlainTime: (t, e) => En(Ot(t, optionalToPlainTimeFields(e))),
  add: (t, e, n) => En(wt(C, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => En(wt(C, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => In(It(C, 0, t, toPlainDateTimeSlots(e), n)),
  since: (t, e, n) => In(It(C, 1, t, toPlainDateTimeSlots(e), n)),
  round: (t, e) => En(vt(t, e)),
  equals: (t, e) => Ct(t, toPlainDateTimeSlots(e)),
  toZonedDateTime: (t, e, n) => $n(bt(L, t, refineTimeZoneArg(e), n)),
  toPlainDate: t => Wn(W(t)),
  toPlainTime: t => Bn(St(t)),
  toLocaleString(t, e, n) {
    const [o, r] = Mn(e, n, t);
    return o.format(r);
  },
  toString: Ft,
  toJSON: t => Ft(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => En(toPlainDateTimeSlots(t, e)),
  compare: (t, e) => Yt(toPlainDateTimeSlots(t), toPlainDateTimeSlots(e))
}), [Ln, Vn, Jn] = createSlotClass(qt, Pt(kt, Mt), {
  ...Pn,
  ...Dn
}, {
  with: (t, e, n) => Vn(Et(C, t, rejectInvalidBag(e), n)),
  equals: (t, e) => Lt(t, toPlainMonthDaySlots(e)),
  toPlainDate(t, e) {
    return Wn(Vt(C, t, this, e));
  },
  toLocaleString(t, e, n) {
    const [o, r] = Nn(e, n, t);
    return o.format(r);
  },
  toString: Jt,
  toJSON: t => Jt(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Vn(toPlainMonthDaySlots(t, e))
}), [kn, qn, Rn] = createSlotClass(Ut, Pt(Qt, Mt), {
  ...Pn,
  ...hn
}, {
  with: (t, e, n) => qn(Wt(C, t, rejectInvalidBag(e), n)),
  add: (t, e, n) => qn(Gt(C, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => qn(Gt(C, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => In(zt(C, 0, t, toPlainYearMonthSlots(e), n)),
  since: (t, e, n) => In(zt(C, 1, t, toPlainYearMonthSlots(e), n)),
  equals: (t, e) => $t(t, toPlainYearMonthSlots(e)),
  toPlainDate(t, e) {
    return Wn(Ht(C, t, this, e));
  },
  toLocaleString(t, e, n) {
    const [o, r] = jn(e, n, t);
    return o.format(r);
  },
  toString: Kt,
  toJSON: t => Kt(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => qn(toPlainYearMonthSlots(t, e)),
  compare: (t, e) => te(toPlainYearMonthSlots(t), toPlainYearMonthSlots(e))
}), [xn, Wn, Gn] = createSlotClass(G, Pt(ue, Mt), {
  ...Pn,
  ...Tn
}, {
  with: (t, e, n) => Wn(ee(C, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => Wn(pt(t, refineCalendarArg(e))),
  add: (t, e, n) => Wn(ne(C, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => Wn(ne(C, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => In(oe(C, 0, t, toPlainDateSlots(e), n)),
  since: (t, e, n) => In(oe(C, 1, t, toPlainDateSlots(e), n)),
  equals: (t, e) => re(t, toPlainDateSlots(e)),
  toZonedDateTime(t, e) {
    const n = s(e) ? e : {
      timeZone: e
    };
    return $n(ae(refineTimeZoneArg, toPlainTimeSlots, L, t, n));
  },
  toPlainDateTime: (t, e) => En(ie(t, optionalToPlainTimeFields(e))),
  toPlainYearMonth(t) {
    return qn(le(C, t, this));
  },
  toPlainMonthDay(t) {
    return Vn(se(C, t, this));
  },
  toLocaleString(t, e, n) {
    const [o, r] = Zn(e, n, t);
    return o.format(r);
  },
  toString: ce,
  toJSON: t => ce(t),
  valueOf: neverValueOf
}, {
  from: (t, e) => Wn(toPlainDateSlots(t, e)),
  compare: (t, e) => te(toPlainDateSlots(t), toPlainDateSlots(e))
}), [zn, $n] = createSlotClass(z, Pt(ye, Mt, Ze), {
  ...On,
  ...Pn,
  ...adaptDateMethods(Tn),
  ...adaptDateMethods(pn),
  offset: t => Se(slotsToIso(t).offsetNanoseconds),
  offsetNanoseconds: t => slotsToIso(t).offsetNanoseconds,
  timeZoneId: t => t.timeZone,
  hoursInDay: t => Te(L, t)
}, {
  with: (t, e, n) => $n(De(C, L, t, rejectInvalidBag(e), n)),
  withCalendar: (t, e) => $n(pt(t, refineCalendarArg(e))),
  withTimeZone: (t, e) => $n(Pe(t, refineTimeZoneArg(e))),
  withPlainTime: (t, e) => $n(ge(L, t, optionalToPlainTimeFields(e))),
  add: (t, e, n) => $n(pe(C, L, 0, t, toDurationSlots(e), n)),
  subtract: (t, e, n) => $n(pe(C, L, 1, t, toDurationSlots(e), n)),
  until: (t, e, n) => In(Oe(we(C, L, 0, t, toZonedDateTimeSlots(e), n))),
  since: (t, e, n) => In(Oe(we(C, L, 1, t, toZonedDateTimeSlots(e), n))),
  round: (t, e) => $n(Ie(L, t, e)),
  startOfDay: t => $n(ve(L, t)),
  equals: (t, e) => Ce(t, toZonedDateTimeSlots(e)),
  toInstant: t => Kn(be(t)),
  toPlainDateTime: t => En(yt(L, t)),
  toPlainDate: t => Wn(fe(L, t)),
  toPlainTime: t => Bn(dt(L, t)),
  toLocaleString(t, e, n = {}) {
    const [o, r] = Fn(e, n, t);
    return o.format(r);
  },
  toString: (t, e) => Fe(L, t, e),
  toJSON: t => Fe(L, t),
  valueOf: neverValueOf,
  getTimeZoneTransition(t, e) {
    const {timeZone: n, epochNanoseconds: o} = t, r = Me(e), a = L(n).O(o, r);
    return a ? $n({
      ...t,
      epochNanoseconds: a
    }) : null;
  }
}, {
  from: (t, e) => $n(toZonedDateTimeSlots(t, e)),
  compare: (t, e) => Be(toZonedDateTimeSlots(t), toZonedDateTimeSlots(e))
}), [Hn, Kn, Qn] = createSlotClass(Re, qe, On, {
  add: (t, e) => Kn(Ye(0, t, toDurationSlots(e))),
  subtract: (t, e) => Kn(Ye(1, t, toDurationSlots(e))),
  until: (t, e, n) => In(Ee(0, t, toInstantSlots(e), n)),
  since: (t, e, n) => In(Ee(1, t, toInstantSlots(e), n)),
  round: (t, e) => Kn(Le(t, e)),
  equals: (t, e) => Ve(t, toInstantSlots(e)),
  toZonedDateTimeISO: (t, e) => $n(Je(t, refineTimeZoneArg(e))),
  toLocaleString(t, e, n) {
    const [o, r] = bn(e, n, t);
    return o.format(r);
  },
  toString: (t, e) => ke(refineTimeZoneArg, L, t, e),
  toJSON: t => ke(refineTimeZoneArg, L, t),
  valueOf: neverValueOf
}, {
  from: t => Kn(toInstantSlots(t)),
  fromEpochMilliseconds: t => Kn($e(t)),
  fromEpochNanoseconds: t => Kn(He(t)),
  compare: (t, e) => Ke(toInstantSlots(t), toInstantSlots(e))
}), Un = /*@__PURE__*/ Object.defineProperties({}, {
  ...o("Temporal.Now"),
  ...n({
    timeZoneId: () => Ue(),
    instant: () => Kn(xe(Xe())),
    zonedDateTimeISO: (t = Ue()) => $n(_e(Xe(), refineTimeZoneArg(t), l)),
    plainDateTimeISO: (t = Ue()) => En(jt(tn(L(refineTimeZoneArg(t))), l)),
    plainDateISO: (t = Ue()) => Wn(W(tn(L(refineTimeZoneArg(t))), l)),
    plainTimeISO: (t = Ue()) => Bn(St(tn(L(refineTimeZoneArg(t)))))
  })
}), Xn = /*@__PURE__*/ Object.defineProperties({}, {
  ...o("Temporal"),
  ...n({
    PlainYearMonth: kn,
    PlainMonthDay: Ln,
    PlainDate: xn,
    PlainTime: An,
    PlainDateTime: Yn,
    ZonedDateTime: zn,
    Instant: Hn,
    Duration: wn,
    Now: Un
  })
}), _n = /*@__PURE__*/ createDateTimeFormatClass(), to = /*@__PURE__*/ new WeakMap, eo = /*@__PURE__*/ Object.defineProperties(Object.create(Intl), n({
  DateTimeFormat: _n
}));

export { _n as DateTimeFormat, eo as IntlExtended, Xn as Temporal, toTemporalInstant };
