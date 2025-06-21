function createSlotClass(e, t, n, o, a) {
  function Class(...e) {
    if (!(this instanceof Class)) {
      throw new TypeError(r);
    }
    za(this, t(...e));
  }
  function bindMethod(e, t) {
    return Object.defineProperties((function(...t) {
      return e.call(this, getSpecificSlots(this), ...t);
    }), Lt(t));
  }
  function getSpecificSlots(t) {
    const n = Ua(t);
    if (!n || n.branding !== e) {
      throw new TypeError(r);
    }
    return n;
  }
  return Object.defineProperties(Class.prototype, {
    ...At(Vt(bindMethod, n)),
    ...zt(Vt(bindMethod, o)),
    ...Jt("Temporal." + e)
  }), Object.defineProperties(Class, {
    ...zt(a),
    ...Lt(e)
  }), [ Class, e => {
    const t = Object.create(Class.prototype);
    return za(t, e), t;
  }, getSpecificSlots ];
}

function createProtocolValidator(e) {
  return e = e.concat("id").sort(), t => {
    if (!Wt(t, e)) {
      throw new TypeError(d);
    }
    return t;
  };
}

function rejectInvalidBag(e) {
  if (Ua(e) || void 0 !== e.calendar || void 0 !== e.timeZone) {
    throw new TypeError(t);
  }
  return e;
}

function createDateTimeFormatClass() {
  const e = Oe.prototype, t = Object.getOwnPropertyDescriptors(e), n = Object.getOwnPropertyDescriptors(Oe), DateTimeFormat = function(e, t = {}) {
    if (!(this instanceof DateTimeFormat)) {
      return new DateTimeFormat(e, t);
    }
    Ha.set(this, ((e, t = {}) => {
      const n = new Oe(e, t), o = n.resolvedOptions(), r = o.locale, a = Gt(Object.keys(t), o), i = Ut(createFormatPrepperForBranding), prepFormat = (...e) => {
        let t;
        const o = e.map(((e, n) => {
          const o = Ua(e), r = (o || {}).branding;
          if (n && t && t !== r) {
            throw new TypeError(b);
          }
          return t = r, o;
        }));
        return t ? i(t)(r, a, ...o) : [ n, ...e ];
      };
      return prepFormat.J = n, prepFormat;
    })(e, t));
  };
  for (const e in t) {
    const n = t[e], o = e.startsWith("format") && createFormatMethod(e);
    "function" == typeof n.value ? n.value = "constructor" === e ? DateTimeFormat : o || createProxiedMethod(e) : o && (n.get = function() {
      return o.bind(this);
    });
  }
  return n.prototype.value = Object.create(e, t), Object.defineProperties(DateTimeFormat, n), 
  DateTimeFormat;
}

function createFormatMethod(e) {
  return function(...t) {
    const n = Ha.get(this), [o, ...r] = n(...t);
    return o[e](...r);
  };
}

function createProxiedMethod(e) {
  return function(...t) {
    return Ha.get(this).J[e](...t);
  };
}

function createFormatPrepperForBranding(e) {
  const t = Ka[e];
  if (!t) {
    throw new TypeError(Ht(e));
  }
  return Kt(t, Ut(Qt));
}

function createCalendarFieldMethods(e, t) {
  const n = {};
  for (const o in e) {
    n[o] = ({K: e}, n) => {
      const r = Ua(n) || {}, {branding: a} = r, i = a === Dn || t.includes(a) ? r : toPlainDateSlots(n);
      return e[o](i);
    };
  }
  return n;
}

function createCalendarGetters(e) {
  const t = {};
  for (const n in e) {
    t[n] = e => {
      const {calendar: t} = e;
      return (o = t, "string" == typeof o ? st(o) : (r = o, Object.assign(Object.create(mi), {
        X: r
      })))[n](e);
      var o, r;
    };
  }
  return t;
}

function neverValueOf() {
  throw new TypeError(o);
}

function createCalendarFromSlots({calendar: e}) {
  return "string" == typeof e ? new ds(e) : e;
}

function toPlainMonthDaySlots(e, t) {
  if (t = po(t), ho(e)) {
    const n = Ua(e);
    if (n && n.branding === gn) {
      return Po(t), n;
    }
    const o = extractCalendarSlotFromBag(e);
    return Do(_i(o || ce), !o, e, t);
  }
  const n = Co(st, e);
  return Po(t), n;
}

function getOffsetNanosecondsForAdapter(e, t, n) {
  return o = t.call(e, bi(go(n))), wo(_t(o));
  var o;
}

function createAdapterOps(e, t = Ci) {
  const n = Object.keys(t).sort(), o = {};
  for (const r of n) {
    o[r] = co(t[r], e, xe(e[r]));
  }
  return o;
}

function createTimeZoneOps(e, t) {
  return "string" == typeof e ? kn(e) : createAdapterOps(e, t);
}

function createTimeZoneOffsetOps(e) {
  return createTimeZoneOps(e, gi);
}

function toInstantSlots(e) {
  if (ho(e)) {
    const t = Ua(e);
    if (t) {
      switch (t.branding) {
       case yn:
        return t;

       case Nn:
        return go(t.epochNanoseconds);
      }
    }
  }
  return Vo(e);
}

function xt() {
  return bi(go(Jo(this.valueOf(), q)));
}

function getImplTransition(e, t, n) {
  const o = t.C(toInstantSlots(n).epochNanoseconds, e);
  return o ? bi(go(o)) : null;
}

function refineTimeZoneSlot(e) {
  return ho(e) ? (Ua(e) || {}).timeZone || wi(e) : (e => Ko(Qo(We(e))))(e);
}

function toPlainTimeSlots(e, t) {
  if (ho(e)) {
    const n = Ua(e) || {};
    switch (n.branding) {
     case Mn:
      return Po(t), n;

     case In:
      return Po(t), sr(n);

     case Nn:
      return Po(t), ir(createTimeZoneOffsetOps, n);
    }
    return lr(e, t);
  }
  return Po(t), cr(e);
}

function optionalToPlainTimeFields(e) {
  return void 0 === e ? void 0 : toPlainTimeSlots(e);
}

function toPlainYearMonthSlots(e, t) {
  if (t = po(t), ho(e)) {
    const n = Ua(e);
    return n && n.branding === Tn ? (Po(t), n) : hr(Xi(getCalendarSlotFromBag(e)), e, t);
  }
  const n = Pr(st, e);
  return Po(t), n;
}

function toPlainDateTimeSlots(e, t) {
  if (t = po(t), ho(e)) {
    const n = Ua(e) || {};
    switch (n.branding) {
     case In:
      return Po(t), n;

     case Dn:
      return Po(t), Zo({
        ...n,
        ...be
      });

     case Nn:
      return Po(t), Yr(createTimeZoneOffsetOps, n);
    }
    return Ar($i(getCalendarSlotFromBag(e)), e, t);
  }
  const n = Er(e);
  return Po(t), n;
}

function toPlainDateSlots(e, t) {
  if (t = po(t), ho(e)) {
    const n = Ua(e) || {};
    switch (n.branding) {
     case Dn:
      return Po(t), n;

     case In:
      return Po(t), ro(n);

     case Nn:
      return Po(t), Hr(createTimeZoneOffsetOps, n);
    }
    return Kr($i(getCalendarSlotFromBag(e)), e, t);
  }
  const n = Qr(e);
  return Po(t), n;
}

function dayAdapter(e, t, n) {
  return eo(t.call(e, Vi(ro(n, e))));
}

function createCompoundOpsCreator(e) {
  return t => "string" == typeof t ? st(t) : ((e, t) => {
    const n = Object.keys(t).sort(), o = {};
    for (const r of n) {
      o[r] = co(t[r], e, e[r]);
    }
    return o;
  })(t, e);
}

function toDurationSlots(e) {
  if (ho(e)) {
    const t = Ua(e);
    return t && t.branding === vn ? t : sa(e);
  }
  return la(e);
}

function refinePublicRelativeTo(e) {
  if (void 0 !== e) {
    if (ho(e)) {
      const t = Ua(e) || {};
      switch (t.branding) {
       case Nn:
       case Dn:
        return t;

       case In:
        return ro(t);
      }
      const n = getCalendarSlotFromBag(e);
      return {
        ...ca(refineTimeZoneSlot, createTimeZoneOps, $i(n), e),
        calendar: n
      };
    }
    return ua(e);
  }
}

function getCalendarSlotFromBag(e) {
  return extractCalendarSlotFromBag(e) || ce;
}

function extractCalendarSlotFromBag(e) {
  const {calendar: t} = e;
  if (void 0 !== t) {
    return refineCalendarSlot(t);
  }
}

function refineCalendarSlot(e) {
  return ho(e) ? (Ua(e) || {}).calendar || fs(e) : (e => Ta(pa(We(e))))(e);
}

function toZonedDateTimeSlots(e, t) {
  if (t = po(t), ho(e)) {
    const n = Ua(e);
    if (n && n.branding === Nn) {
      return Va(t), n;
    }
    const o = getCalendarSlotFromBag(e);
    return Ja(refineTimeZoneSlot, createTimeZoneOps, $i(o), o, e, t);
  }
  return La(e, t);
}

function slotsToIso(e) {
  return wn(e, createTimeZoneOffsetOps);
}

function adaptDateMethods(e) {
  return Vt((e => t => e(slotsToIso(t))), e);
}

import { createGetterDescriptors as At, mapProps as Vt, createPropDescriptors as zt, createStringTagDescriptors as Jt, createNameDescriptors as Lt, invalidCallingContext as r, hasAllPropsByName as Wt, invalidProtocol as d, invalidBag as t, RawDateTimeFormat as Oe, pluckProps as Gt, memoize as Ut, invalidFormatType as Ht, createFormatPrepper as Kt, createFormatForPrep as Qt, mismatchingFormatTypes as b, plainYearMonthConfig as bt, plainMonthDayConfig as Ot, plainDateConfig as wt, plainDateTimeConfig as Bt, plainTimeConfig as kt, instantConfig as Yt, zonedDateTimeConfig as Ct, requireStringOrUndefined as Xt, requireIntegerOrUndefined as $t, requireInteger as _t, requirePositiveInteger as eo, requireBoolean as je, requireString as We, requirePositiveIntegerOrUndefined as to, mapPropNames as no, durationFieldNamesAsc as pe, getId as oo, createPlainDateSlots as ro, timeFieldNamesAsc as $, isoTimeFieldNamesAsc as ye, getEpochSeconds as ao, getEpochMilliseconds as io, getEpochMicroseconds as so, getEpochNanoseconds as lo, createNativeStandardOps as st, forbiddenValueOf as o, bindArgs as co, excludePropsByName as uo, PlainDateBranding as Dn, PlainYearMonthBranding as Tn, PlainMonthDayBranding as gn, plainMonthDayWithFields as fo, plainMonthDaysEqual as mo, formatPlainMonthDayIso as So, plainMonthDayToPlainDate as Oo, constructPlainMonthDaySlots as To, copyOptions as po, isObjectLike as ho, refineOverflowOptions as Po, refinePlainMonthDayBag as Do, parsePlainMonthDay as Co, isoCalendarId as ce, requireFunction as xe, createInstantSlots as go, createPlainDateTimeSlots as Zo, compareBigNanos as bo, validateTimeZoneGap as Fo, bigNanoToNumber as Io, diffBigNanos as vo, validateTimeZoneOffset as wo, queryNativeTimeZone as kn, moveInstant as jo, diffInstants as Mo, roundInstant as yo, instantsEqual as No, formatInstantIso as Bo, instantToZonedDateTime as Yo, requireObjectLike as Ao, constructInstantSlots as Eo, InstantBranding as yn, ZonedDateTimeBranding as Nn, parseInstant as Vo, numberToBigNano as Jo, epochSecToInstant as Lo, epochMilliToInstant as qo, epochMicroToInstant as ko, epochNanoToInstant as xo, compareInstants as Ro, nanoInMilli as q, formatOffsetNano as Wo, epochNanoToIso as Go, refineEpochDisambigOptions as Uo, getSingleInstantFor as zo, isTimeZoneSlotsEqual as Ho, resolveTimeZoneId as Ko, parseTimeZoneId as Qo, plainTimeWithFields as Xo, movePlainTime as $o, diffPlainTimes as _o, roundPlainTime as er, plainTimesEqual as tr, formatPlainTimeIso as nr, plainTimeToZonedDateTime as or, plainTimeToPlainDateTime as rr, constructPlainTimeSlots as ar, PlainTimeBranding as Mn, zonedDateTimeToPlainTime as ir, PlainDateTimeBranding as In, createPlainTimeSlots as sr, refinePlainTimeBag as lr, parsePlainTime as cr, compareIsoTimeFields as ur, plainYearMonthWithFields as dr, movePlainYearMonth as fr, diffPlainYearMonth as mr, plainYearMonthsEqual as Sr, formatPlainYearMonthIso as Or, plainYearMonthToPlainDate as Tr, constructPlainYearMonthSlots as pr, refinePlainYearMonthBag as hr, parsePlainYearMonth as Pr, compareIsoDateFields as Dr, plainDateTimeWithFields as Cr, plainDateTimeWithPlainTime as gr, plainDateTimeWithPlainDate as Zr, slotsWithCalendar as br, movePlainDateTime as Fr, diffPlainDateTimes as Ir, roundPlainDateTime as vr, plainDateTimesEqual as wr, formatPlainDateTimeIso as jr, plainDateTimeToZonedDateTime as Mr, plainDateTimeToPlainYearMonth as yr, plainDateTimeToPlainMonthDay as Nr, constructPlainDateTimeSlots as Br, zonedDateTimeToPlainDateTime as Yr, isoTimeFieldDefaults as be, refinePlainDateTimeBag as Ar, parsePlainDateTime as Er, compareIsoDateTimeFields as Vr, plainDateWithFields as Jr, movePlainDate as Lr, diffPlainDates as qr, plainDatesEqual as kr, formatPlainDateIso as xr, plainDateToZonedDateTime as Rr, plainDateToPlainDateTime as Wr, plainDateToPlainYearMonth as Gr, plainDateToPlainMonthDay as Ur, constructPlainDateSlots as zr, zonedDateTimeToPlainDate as Hr, refinePlainDateBag as Kr, parsePlainDate as Qr, unitNamesAsc as C, createDurationSlots as Xr, getDurationBlank as $r, constructDurationSlots as _r, DurationBranding as vn, durationWithFields as ea, addDurations as ta, negateDuration as na, absDuration as oa, roundDuration as ra, totalDuration as aa, formatDurationIso as ia, refineDurationBag as sa, parseDuration as la, refineMaybeZonedDateTimeBag as ca, parseRelativeToSlots as ua, compareDurations as da, refineCalendarDiffOptions as fa, dateFieldNamesAlpha as re, forbiddenField as ma, excludeUndefinedProps as Sa, requireNonNullish as Oa, resolveCalendarId as Ta, parseCalendarId as pa, getRequiredDateFields as ha, getRequiredMonthDayFields as Pa, getRequiredYearMonthFields as Da, computeHoursInDay as Ca, zonedEpochSlotsToIso as wn, zonedDateTimeWithFields as ga, zonedDateTimeWithPlainTime as Za, zonedDateTimeWithPlainDate as ba, slotsWithTimeZone as Fa, moveZonedDateTime as Ia, diffZonedDateTimes as va, roundZonedDateTime as wa, computeStartOfDay as ja, zonedDateTimesEqual as Ma, formatZonedDateTimeIso as ya, zonedDateTimeToInstant as Na, zonedDateTimeToPlainYearMonth as Ba, zonedDateTimeToPlainMonthDay as Ya, buildZonedIsoFields as Aa, constructZonedDateTimeSlots as Ea, refineZonedFieldOptions as Va, refineZonedDateTimeBag as Ja, parseZonedDateTime as La, compareZonedDateTimes as qa, getCurrentTimeZoneId as ka, getCurrentEpochNano as xa, createZonedDateTimeSlots as Ra, getCurrentIsoDateTime as Wa } from "./hSIG78sM.esm.js";

const Ga = /*@__PURE__*/ new WeakMap, Ua = /*@__PURE__*/ Ga.get.bind(Ga), za = /*@__PURE__*/ Ga.set.bind(Ga), qt = /*@__PURE__*/ createDateTimeFormatClass(), Ha = /*@__PURE__*/ new WeakMap, Ka = {
  PlainYearMonth: bt,
  PlainMonthDay: Ot,
  PlainDate: wt,
  PlainDateTime: Bt,
  PlainTime: kt,
  Instant: Yt
}, Qa = /*@__PURE__*/ Kt(bt), Xa = /*@__PURE__*/ Kt(Ot), $a = /*@__PURE__*/ Kt(wt), _a = /*@__PURE__*/ Kt(Bt), ei = /*@__PURE__*/ Kt(kt), ti = /*@__PURE__*/ Kt(Yt), ni = /*@__PURE__*/ Kt(Ct), oi = {
  era: Xt,
  eraYear: $t,
  year: _t,
  month: eo,
  daysInMonth: eo,
  daysInYear: eo,
  inLeapYear: je,
  monthsInYear: eo
}, ri = {
  monthCode: We
}, ai = {
  day: eo
}, ii = {
  dayOfWeek: eo,
  dayOfYear: eo,
  weekOfYear: to,
  yearOfWeek: $t,
  daysInWeek: eo
}, si = /*@__PURE__*/ Object.assign({}, oi, ri, ai, ii), li = {
  ...createCalendarFieldMethods(oi, [ Tn ]),
  ...createCalendarFieldMethods(ii, []),
  ...createCalendarFieldMethods(ri, [ Tn, gn ]),
  ...createCalendarFieldMethods(ai, [ gn ])
}, ci = /*@__PURE__*/ createCalendarGetters(si), ui = /*@__PURE__*/ createCalendarGetters({
  ...oi,
  ...ri
}), di = /*@__PURE__*/ createCalendarGetters({
  ...ri,
  ...ai
}), fi = {
  calendarId: e => oo(e.calendar)
}, mi = /*@__PURE__*/ Vt(((e, t) => function(n) {
  const {X: o} = this;
  return e(o[t](Vi(ro(n, o))));
}), si), Si = /*@__PURE__*/ no((e => t => t[e]), pe.concat("sign")), Oi = /*@__PURE__*/ no(((e, t) => e => e[ye[t]]), $), Ti = {
  epochSeconds: ao,
  epochMilliseconds: io,
  epochMicroseconds: so,
  epochNanoseconds: lo
}, pi = /*@__PURE__*/ co(uo, new Set([ "branding" ])), [hi, Pi, Di] = createSlotClass(gn, co(To, refineCalendarSlot), {
  ...fi,
  ...di
}, {
  with(e, t, n) {
    return Pi(fo(ns, e, this, rejectInvalidBag(t), n));
  },
  equals: (e, t) => mo(e, toPlainMonthDaySlots(t)),
  toString: So,
  toJSON: e => So(e),
  toLocaleString(e, t, n) {
    const [o, r] = Xa(t, n, e);
    return o.format(r);
  },
  toPlainDate(e, t) {
    return Vi(Oo(ts, e, this, t));
  },
  getISOFields: pi,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => Pi(toPlainMonthDaySlots(e, t))
}), Ci = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
  getPossibleInstantsFor(e, t, n) {
    const o = [ ...t.call(e, Ai(Zo(n, ce))) ].map((e => Fi(e).epochNanoseconds)), r = o.length;
    return r > 1 && (o.sort(bo), Fo(Io(vo(o[0], o[r - 1])))), o;
  }
}, gi = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter
}, [Zi, bi, Fi] = createSlotClass(yn, Eo, Ti, {
  add: (e, t) => bi(jo(0, e, toDurationSlots(t))),
  subtract: (e, t) => bi(jo(1, e, toDurationSlots(t))),
  until: (e, t, n) => ls(Mo(0, e, toInstantSlots(t), n)),
  since: (e, t, n) => ls(Mo(1, e, toInstantSlots(t), n)),
  round: (e, t) => bi(yo(e, t)),
  equals: (e, t) => No(e, toInstantSlots(t)),
  toString: (e, t) => Bo(refineTimeZoneSlot, createTimeZoneOffsetOps, e, t),
  toJSON: e => Bo(refineTimeZoneSlot, createTimeZoneOffsetOps, e),
  toLocaleString(e, t, n) {
    const [o, r] = ti(t, n, e);
    return o.format(r);
  },
  toZonedDateTimeISO: (e, t) => Ss(Yo(e, refineTimeZoneSlot(t))),
  toZonedDateTime(e, t) {
    const n = Ao(t);
    return Ss(Yo(e, refineTimeZoneSlot(n.timeZone), refineCalendarSlot(n.calendar)));
  },
  valueOf: neverValueOf
}, {
  from: e => bi(toInstantSlots(e)),
  fromEpochSeconds: e => bi(Lo(e)),
  fromEpochMilliseconds: e => bi(qo(e)),
  fromEpochMicroseconds: e => bi(ko(e)),
  fromEpochNanoseconds: e => bi(xo(e)),
  compare: (e, t) => Ro(toInstantSlots(e), toInstantSlots(t))
}), [Ii, vi] = createSlotClass("TimeZone", (e => {
  const t = Ko(e);
  return {
    branding: "TimeZone",
    id: t,
    K: kn(t)
  };
}), {
  id: e => e.id
}, {
  toString: e => e.id,
  toJSON: e => e.id,
  getPossibleInstantsFor: ({K: e}, t) => e.getPossibleInstantsFor(toPlainDateTimeSlots(t)).map((e => bi(go(e)))),
  getOffsetNanosecondsFor: ({K: e}, t) => e.getOffsetNanosecondsFor(toInstantSlots(t).epochNanoseconds),
  getOffsetStringFor(e, t) {
    const n = toInstantSlots(t).epochNanoseconds, o = createAdapterOps(this, gi).getOffsetNanosecondsFor(n);
    return Wo(o);
  },
  getPlainDateTimeFor(e, t, n = ce) {
    const o = toInstantSlots(t).epochNanoseconds, r = createAdapterOps(this, gi).getOffsetNanosecondsFor(o);
    return Ai(Zo(Go(o, r), refineCalendarSlot(n)));
  },
  getInstantFor(e, t, n) {
    const o = toPlainDateTimeSlots(t), r = Uo(n), a = createAdapterOps(this);
    return bi(go(zo(a, o, r)));
  },
  getNextTransition: ({K: e}, t) => getImplTransition(1, e, t),
  getPreviousTransition: ({K: e}, t) => getImplTransition(-1, e, t),
  equals(e, t) {
    return !!Ho(this, refineTimeZoneSlot(t));
  }
}, {
  from(e) {
    const t = refineTimeZoneSlot(e);
    return "string" == typeof t ? new Ii(t) : t;
  }
}), wi = /*@__PURE__*/ createProtocolValidator(Object.keys(Ci)), [ji, Mi] = createSlotClass(Mn, ar, Oi, {
  with(e, t, n) {
    return Mi(Xo(this, rejectInvalidBag(t), n));
  },
  add: (e, t) => Mi($o(0, e, toDurationSlots(t))),
  subtract: (e, t) => Mi($o(1, e, toDurationSlots(t))),
  until: (e, t, n) => ls(_o(0, e, toPlainTimeSlots(t), n)),
  since: (e, t, n) => ls(_o(1, e, toPlainTimeSlots(t), n)),
  round: (e, t) => Mi(er(e, t)),
  equals: (e, t) => tr(e, toPlainTimeSlots(t)),
  toString: nr,
  toJSON: e => nr(e),
  toLocaleString(e, t, n) {
    const [o, r] = ei(t, n, e);
    return o.format(r);
  },
  toZonedDateTime: (e, t) => Ss(or(refineTimeZoneSlot, toPlainDateSlots, createTimeZoneOps, e, t)),
  toPlainDateTime: (e, t) => Ai(rr(e, toPlainDateSlots(t))),
  getISOFields: pi,
  valueOf: neverValueOf
}, {
  from: (e, t) => Mi(toPlainTimeSlots(e, t)),
  compare: (e, t) => ur(toPlainTimeSlots(e), toPlainTimeSlots(t))
}), [yi, Ni, Bi] = createSlotClass(Tn, co(pr, refineCalendarSlot), {
  ...fi,
  ...ui
}, {
  with(e, t, n) {
    return Ni(dr(es, e, this, rejectInvalidBag(t), n));
  },
  add: (e, t, n) => Ni(fr(as, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Ni(fr(as, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ls(mr(is, 0, e, toPlainYearMonthSlots(t), n)),
  since: (e, t, n) => ls(mr(is, 1, e, toPlainYearMonthSlots(t), n)),
  equals: (e, t) => Sr(e, toPlainYearMonthSlots(t)),
  toString: Or,
  toJSON: e => Or(e),
  toLocaleString(e, t, n) {
    const [o, r] = Qa(t, n, e);
    return o.format(r);
  },
  toPlainDate(e, t) {
    return Vi(Tr(ts, e, this, t));
  },
  getISOFields: pi,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => Ni(toPlainYearMonthSlots(e, t)),
  compare: (e, t) => Dr(toPlainYearMonthSlots(e), toPlainYearMonthSlots(t))
}), [Yi, Ai] = createSlotClass(In, co(Br, refineCalendarSlot), {
  ...fi,
  ...ci,
  ...Oi
}, {
  with(e, t, n) {
    return Ai(Cr(ts, e, this, rejectInvalidBag(t), n));
  },
  withPlainTime: (e, t) => Ai(gr(e, optionalToPlainTimeFields(t))),
  withPlainDate: (e, t) => Ai(Zr(e, toPlainDateSlots(t))),
  withCalendar: (e, t) => Ai(br(e, refineCalendarSlot(t))),
  add: (e, t, n) => Ai(Fr(os, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Ai(Fr(os, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ls(Ir(rs, 0, e, toPlainDateTimeSlots(t), n)),
  since: (e, t, n) => ls(Ir(rs, 1, e, toPlainDateTimeSlots(t), n)),
  round: (e, t) => Ai(vr(e, t)),
  equals: (e, t) => wr(e, toPlainDateTimeSlots(t)),
  toString: (e, t) => jr(e, t),
  toJSON: e => jr(e),
  toLocaleString(e, t, n) {
    const [o, r] = _a(t, n, e);
    return o.format(r);
  },
  toZonedDateTime: (e, t, n) => Ss(Mr(createTimeZoneOps, e, refineTimeZoneSlot(t), n)),
  toPlainDate: e => Vi(ro(e)),
  toPlainYearMonth(e) {
    return Ni(yr(Xi, e, this));
  },
  toPlainMonthDay(e) {
    return Pi(Nr(_i, e, this));
  },
  toPlainTime: e => Mi(sr(e)),
  getISOFields: pi,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => Ai(toPlainDateTimeSlots(e, t)),
  compare: (e, t) => Vr(toPlainDateTimeSlots(e), toPlainDateTimeSlots(t))
}), [Ei, Vi, Ji] = createSlotClass(Dn, co(zr, refineCalendarSlot), {
  ...fi,
  ...ci
}, {
  with(e, t, n) {
    return Vi(Jr(ts, e, this, rejectInvalidBag(t), n));
  },
  withCalendar: (e, t) => Vi(br(e, refineCalendarSlot(t))),
  add: (e, t, n) => Vi(Lr(os, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Vi(Lr(os, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ls(qr(rs, 0, e, toPlainDateSlots(t), n)),
  since: (e, t, n) => ls(qr(rs, 1, e, toPlainDateSlots(t), n)),
  equals: (e, t) => kr(e, toPlainDateSlots(t)),
  toString: xr,
  toJSON: e => xr(e),
  toLocaleString(e, t, n) {
    const [o, r] = $a(t, n, e);
    return o.format(r);
  },
  toZonedDateTime(e, t) {
    const n = !ho(t) || t instanceof Ii ? {
      timeZone: t
    } : t;
    return Ss(Rr(refineTimeZoneSlot, toPlainTimeSlots, createTimeZoneOps, e, n));
  },
  toPlainDateTime: (e, t) => Ai(Wr(e, optionalToPlainTimeFields(t))),
  toPlainYearMonth(e) {
    return Ni(Gr(Xi, e, this));
  },
  toPlainMonthDay(e) {
    return Pi(Ur(_i, e, this));
  },
  getISOFields: pi,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => Vi(toPlainDateSlots(e, t)),
  compare: (e, t) => Dr(toPlainDateSlots(e), toPlainDateSlots(t))
}), Li = {
  fields(e, t, n) {
    return [ ...t.call(e, n) ];
  }
}, qi = /*@__PURE__*/ Object.assign({
  dateFromFields(e, t, n, o) {
    return Ji(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Li), ki = /*@__PURE__*/ Object.assign({
  yearMonthFromFields(e, t, n, o) {
    return Bi(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Li), xi = /*@__PURE__*/ Object.assign({
  monthDayFromFields(e, t, n, o) {
    return Di(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Li), Ri = {
  mergeFields(e, t, n, o) {
    return Ao(t.call(e, Object.assign(Object.create(null), n), Object.assign(Object.create(null), o)));
  }
}, Wi = /*@__PURE__*/ Object.assign({}, qi, Ri), Gi = /*@__PURE__*/ Object.assign({}, ki, Ri), Ui = /*@__PURE__*/ Object.assign({}, xi, Ri), zi = {
  dateAdd(e, t, n, o, r) {
    return Ji(t.call(e, Vi(ro(n, e)), ls(Xr(o)), r));
  }
}, Hi = /*@__PURE__*/ Object.assign({}, zi, {
  dateUntil(e, t, n, o, r, a) {
    return cs(t.call(e, Vi(ro(n, e)), Vi(ro(o, e)), Object.assign(Object.create(null), a, {
      largestUnit: C[r]
    })));
  }
}), Ki = /*@__PURE__*/ Object.assign({}, zi, {
  day: dayAdapter
}), Qi = /*@__PURE__*/ Object.assign({}, Hi, {
  day: dayAdapter
}), Xi = /*@__PURE__*/ createCompoundOpsCreator(ki), $i = /*@__PURE__*/ createCompoundOpsCreator(qi), _i = /*@__PURE__*/ createCompoundOpsCreator(xi), es = /*@__PURE__*/ createCompoundOpsCreator(Gi), ts = /*@__PURE__*/ createCompoundOpsCreator(Wi), ns = /*@__PURE__*/ createCompoundOpsCreator(Ui), os = /*@__PURE__*/ createCompoundOpsCreator(zi), rs = /*@__PURE__*/ createCompoundOpsCreator(Hi), as = /*@__PURE__*/ createCompoundOpsCreator(Ki), is = /*@__PURE__*/ createCompoundOpsCreator(Qi), [ss, ls, cs] = createSlotClass(vn, _r, {
  ...Si,
  blank: $r
}, {
  with: (e, t) => ls(ea(e, t)),
  add: (e, t, n) => ls(ta(refinePublicRelativeTo, rs, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => ls(ta(refinePublicRelativeTo, rs, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  negated: e => ls(na(e)),
  abs: e => ls(oa(e)),
  round: (e, t) => ls(ra(refinePublicRelativeTo, rs, createTimeZoneOps, e, t)),
  total: (e, t) => aa(refinePublicRelativeTo, rs, createTimeZoneOps, e, t),
  toString: ia,
  toLocaleString(e, t, n) {
    return Intl.DurationFormat ? new Intl.DurationFormat(t, n).format(this) : ia(e);
  },
  toJSON: e => ia(e),
  valueOf: neverValueOf
}, {
  from: e => ls(toDurationSlots(e)),
  compare: (e, t, n) => da(refinePublicRelativeTo, os, createTimeZoneOps, toDurationSlots(e), toDurationSlots(t), n)
}), us = {
  toString: e => e.id,
  toJSON: e => e.id,
  ...li,
  dateAdd: ({id: e, K: t}, n, o, r) => Vi(ro(t.dateAdd(toPlainDateSlots(n), toDurationSlots(o), r), e)),
  dateUntil: ({K: e}, t, n, o) => ls(Xr(e.dateUntil(toPlainDateSlots(t), toPlainDateSlots(n), fa(o)))),
  dateFromFields: ({id: e, K: t}, n, o) => Vi(Kr(t, n, o, ha(e))),
  yearMonthFromFields: ({id: e, K: t}, n, o) => Ni(hr(t, n, o, Da(e))),
  monthDayFromFields: ({id: e, K: t}, n, o) => Pi(Do(t, 0, n, o, Pa(e))),
  fields({K: e}, t) {
    const n = new Set(re), o = [];
    for (const e of t) {
      if (We(e), !n.has(e)) {
        throw new RangeError(ma(e));
      }
      n.delete(e), o.push(e);
    }
    return e.fields(o);
  },
  mergeFields: ({K: e}, t, n) => e.mergeFields(Sa(Oa(t)), Sa(Oa(n)))
}, [ds] = createSlotClass("Calendar", (e => {
  const t = Ta(We(e));
  return {
    branding: "Calendar",
    id: t,
    K: st(t)
  };
}), {
  id: e => e.id
}, us, {
  from(e) {
    const t = refineCalendarSlot(e);
    return "string" == typeof t ? new ds(t) : t;
  }
}), fs = /*@__PURE__*/ createProtocolValidator(Object.keys(us).slice(4)), [ms, Ss] = createSlotClass(Nn, co(Ea, refineCalendarSlot, refineTimeZoneSlot), {
  ...Ti,
  ...fi,
  ...adaptDateMethods(ci),
  ...adaptDateMethods(Oi),
  hoursInDay: e => Ca(createTimeZoneOps, e),
  offsetNanoseconds: e => slotsToIso(e).offsetNanoseconds,
  offset: e => Wo(slotsToIso(e).offsetNanoseconds),
  timeZoneId: e => oo(e.timeZone)
}, {
  with(e, t, n) {
    return Ss(ga(ts, createTimeZoneOps, e, this, rejectInvalidBag(t), n));
  },
  withPlainTime: (e, t) => Ss(Za(createTimeZoneOps, e, optionalToPlainTimeFields(t))),
  withPlainDate: (e, t) => Ss(ba(createTimeZoneOps, e, toPlainDateSlots(t))),
  withTimeZone: (e, t) => Ss(Fa(e, refineTimeZoneSlot(t))),
  withCalendar: (e, t) => Ss(br(e, refineCalendarSlot(t))),
  add: (e, t, n) => Ss(Ia(os, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Ss(Ia(os, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ls(Xr(va(rs, createTimeZoneOps, 0, e, toZonedDateTimeSlots(t), n))),
  since: (e, t, n) => ls(Xr(va(rs, createTimeZoneOps, 1, e, toZonedDateTimeSlots(t), n))),
  round: (e, t) => Ss(wa(createTimeZoneOps, e, t)),
  startOfDay: e => Ss(ja(createTimeZoneOps, e)),
  equals: (e, t) => Ma(e, toZonedDateTimeSlots(t)),
  toString: (e, t) => ya(createTimeZoneOffsetOps, e, t),
  toJSON: e => ya(createTimeZoneOffsetOps, e),
  toLocaleString(e, t, n = {}) {
    const [o, r] = ni(t, n, e);
    return o.format(r);
  },
  toInstant: e => bi(Na(e)),
  toPlainDate: e => Vi(Hr(createTimeZoneOffsetOps, e)),
  toPlainTime: e => Mi(ir(createTimeZoneOffsetOps, e)),
  toPlainDateTime: e => Ai(Yr(createTimeZoneOffsetOps, e)),
  toPlainYearMonth(e) {
    return Ni(Ba(Xi, e, this));
  },
  toPlainMonthDay(e) {
    return Pi(Ya(_i, e, this));
  },
  getISOFields: e => Aa(createTimeZoneOffsetOps, e),
  getCalendar: createCalendarFromSlots,
  getTimeZone: ({timeZone: e}) => "string" == typeof e ? new Ii(e) : e,
  valueOf: neverValueOf
}, {
  from: (e, t) => Ss(toZonedDateTimeSlots(e, t)),
  compare: (e, t) => qa(toZonedDateTimeSlots(e), toZonedDateTimeSlots(t))
}), Os = /*@__PURE__*/ Object.defineProperties({}, {
  ...Jt("Temporal.Now"),
  ...zt({
    timeZoneId: () => ka(),
    instant: () => bi(go(xa())),
    zonedDateTime: (e, t = ka()) => Ss(Ra(xa(), refineTimeZoneSlot(t), refineCalendarSlot(e))),
    zonedDateTimeISO: (e = ka()) => Ss(Ra(xa(), refineTimeZoneSlot(e), ce)),
    plainDateTime: (e, t = ka()) => Ai(Zo(Wa(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateTimeISO: (e = ka()) => Ai(Zo(Wa(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), ce)),
    plainDate: (e, t = ka()) => Vi(ro(Wa(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateISO: (e = ka()) => Vi(ro(Wa(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), ce)),
    plainTimeISO: (e = ka()) => Mi(sr(Wa(createTimeZoneOffsetOps(refineTimeZoneSlot(e)))))
  })
}), jt = /*@__PURE__*/ Object.defineProperties({}, {
  ...Jt("Temporal"),
  ...zt({
    PlainYearMonth: yi,
    PlainMonthDay: hi,
    PlainDate: Ei,
    PlainTime: ji,
    PlainDateTime: Yi,
    ZonedDateTime: ms,
    Instant: Zi,
    Calendar: ds,
    TimeZone: Ii,
    Duration: ss,
    Now: Os
  })
});

export { qt as DateTimeFormat, jt as Temporal, xt as toTemporalInstant };
