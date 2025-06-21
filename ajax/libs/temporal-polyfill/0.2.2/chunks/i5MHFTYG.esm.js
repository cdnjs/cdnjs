function createSlotClass(e, t, n, o, r) {
  function Class(...e) {
    if (!(this instanceof Class)) {
      throw new TypeError(i);
    }
    Ea(this, t(...e));
  }
  function bindMethod(e, t) {
    return Object.defineProperties((function(...t) {
      return e.call(this, getSpecificSlots(this), ...t);
    }), Yt(t));
  }
  function getSpecificSlots(t) {
    const n = Aa(t);
    if (!n || n.branding !== e) {
      throw new TypeError(i);
    }
    return n;
  }
  return Object.defineProperties(Class.prototype, {
    ...Ct(Zt(bindMethod, n)),
    ...xt(Zt(bindMethod, o)),
    ...Bt("Temporal." + e)
  }), Object.defineProperties(Class, {
    ...xt(r),
    ...Yt(e)
  }), [ Class, e => {
    const t = Object.create(Class.prototype);
    return Ea(t, e), t;
  }, getSpecificSlots ];
}

function createProtocolValidator(e) {
  return e = e.concat("id").sort(), t => {
    if (!At(t, e)) {
      throw new TypeError(m);
    }
    return t;
  };
}

function rejectInvalidBag(e) {
  if (Aa(e) || void 0 !== e.calendar || void 0 !== e.timeZone) {
    throw new TypeError(o);
  }
  return e;
}

function createDateTimeFormatClass() {
  const e = Fe.prototype, t = Object.getOwnPropertyDescriptors(e), n = Object.getOwnPropertyDescriptors(Fe), DateTimeFormat = function(e, t = {}) {
    if (!(this instanceof DateTimeFormat)) {
      return new DateTimeFormat(e, t);
    }
    Va.set(this, ((e, t = {}) => {
      const n = new Fe(e, t), o = n.resolvedOptions(), r = o.locale, a = Vt(Object.keys(t), o), i = Jt(createFormatPrepperForBranding), prepFormat = (...e) => {
        let t;
        const o = e.map(((e, n) => {
          const o = Aa(e), r = (o || {}).branding;
          if (n && t && t !== r) {
            throw new TypeError(F);
          }
          return t = r, o;
        }));
        return t ? i(t)(r, a, ...o) : [ n, ...e ];
      };
      return prepFormat.F = n, prepFormat;
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
    const n = Va.get(this), [o, ...r] = n(...t);
    return o[e](...r);
  };
}

function createProxiedMethod(e) {
  return function(...t) {
    return Va.get(this).F[e](...t);
  };
}

function createFormatPrepperForBranding(e) {
  const t = Ja[e];
  if (!t) {
    throw new TypeError(Lt(e));
  }
  return Rt(t, Jt(Wt));
}

function createCalendarFieldMethods(e, t) {
  const n = {};
  for (const o in e) {
    n[o] = ({C: e}, n) => {
      const r = Aa(n) || {}, {branding: a} = r, i = a === hn || t.includes(a) ? r : toPlainDateSlots(n);
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
      return (o = t, "string" == typeof o ? nt(o) : (r = o, Object.assign(Object.create(ni), {
        $: r
      })))[n](e);
      var o, r;
    };
  }
  return t;
}

function neverValueOf() {
  throw new TypeError(r);
}

function createCalendarFromSlots({calendar: e}) {
  return "string" == typeof e ? new ns(e) : e;
}

function toPlainMonthDaySlots(e, t) {
  if (t = co(t), uo(e)) {
    const n = Aa(e);
    if (n && n.branding === pn) {
      return fo(t), n;
    }
    const o = extractCalendarSlotFromBag(e);
    return mo(Wi(o || ae), !o, e, t);
  }
  const n = So(nt, e);
  return fo(t), n;
}

function getOffsetNanosecondsForAdapter(e, t, n) {
  return o = t.call(e, hi(Oo(n))), po(zt(o));
  var o;
}

function createAdapterOps(e, t = ui) {
  const n = Object.keys(t).sort(), o = {};
  for (const r of n) {
    o[r] = no(t[r], e, je(e[r]));
  }
  return o;
}

function createTimeZoneOps(e, t) {
  return "string" == typeof e ? wn(e) : createAdapterOps(e, t);
}

function createTimeZoneOffsetOps(e) {
  return createTimeZoneOps(e, di);
}

function toPlainYearMonthSlots(e, t) {
  if (t = co(t), uo(e)) {
    const n = Aa(e);
    return n && n.branding === mn ? (fo(t), n) : Fo(xi(getCalendarSlotFromBag(e)), e, t);
  }
  const n = Io(nt, e);
  return fo(t), n;
}

function toZonedDateTimeSlots(e, t) {
  if (t = co(t), uo(e)) {
    const n = Aa(e);
    if (n && n.branding === In) {
      return Qo(t), n;
    }
    const o = getCalendarSlotFromBag(e);
    return Xo(refineTimeZoneSlot, createTimeZoneOps, Ri(o), o, e, t);
  }
  return $o(e, t);
}

function slotsToIso(e) {
  return bn(e, createTimeZoneOffsetOps);
}

function adaptDateMethods(e) {
  return Zt((e => t => e(slotsToIso(t))), e);
}

function toInstantSlots(e) {
  if (uo(e)) {
    const t = Aa(e);
    if (t) {
      switch (t.branding) {
       case gn:
        return t;

       case In:
        return Oo(t.epochNanoseconds);
      }
    }
  }
  return lr(e);
}

function qt() {
  return hi(Oo(cr(this.valueOf(), Z)));
}

function getImplTransition(e, t, n) {
  const o = t.q(toInstantSlots(n).epochNanoseconds, e);
  return o ? hi(Oo(o)) : null;
}

function refineTimeZoneSlot(e) {
  return uo(e) ? (Aa(e) || {}).timeZone || gi(e) : (e => Pr(Dr(Le(e))))(e);
}

function toPlainTimeSlots(e, t) {
  if (uo(e)) {
    const n = Aa(e) || {};
    switch (n.branding) {
     case Dn:
      return fo(t), n;

     case Tn:
      return fo(t), Mr(n);

     case In:
      return fo(t), Wo(createTimeZoneOffsetOps, n);
    }
    return yr(e, t);
  }
  return fo(t), Nr(e);
}

function optionalToPlainTimeFields(e) {
  return void 0 === e ? void 0 : toPlainTimeSlots(e);
}

function toPlainDateTimeSlots(e, t) {
  if (t = co(t), uo(e)) {
    const n = Aa(e) || {};
    switch (n.branding) {
     case Tn:
      return fo(t), n;

     case hn:
      return fo(t), To({
        ...n,
        ...ve
      });

     case In:
      return fo(t), Go(createTimeZoneOffsetOps, n);
    }
    return Ur(Ri(getCalendarSlotFromBag(e)), e, t);
  }
  const n = zr(e);
  return fo(t), n;
}

function toPlainDateSlots(e, t) {
  if (t = co(t), uo(e)) {
    const n = Aa(e) || {};
    switch (n.branding) {
     case hn:
      return fo(t), n;

     case Tn:
      return fo(t), Xt(n);

     case In:
      return fo(t), Ro(createTimeZoneOffsetOps, n);
    }
    return aa(Ri(getCalendarSlotFromBag(e)), e, t);
  }
  const n = ia(e);
  return fo(t), n;
}

function dayAdapter(e, t, n) {
  return Ht(t.call(e, wi(Xt(n, e))));
}

function createCompoundOpsCreator(e) {
  return t => "string" == typeof t ? nt(t) : ((e, t) => {
    const n = Object.keys(t).sort(), o = {};
    for (const r of n) {
      o[r] = no(t[r], e, e[r]);
    }
    return o;
  })(t, e);
}

function toDurationSlots(e) {
  if (uo(e)) {
    const t = Aa(e);
    return t && t.branding === yn ? t : Ta(e);
  }
  return pa(e);
}

function refinePublicRelativeTo(e) {
  if (void 0 !== e) {
    if (uo(e)) {
      const t = Aa(e) || {};
      switch (t.branding) {
       case In:
       case hn:
        return t;

       case Tn:
        return Xt(t);
      }
      const n = getCalendarSlotFromBag(e);
      return {
        ...ha(refineTimeZoneSlot, createTimeZoneOps, Ri(n), e),
        calendar: n
      };
    }
    return Pa(e);
  }
}

function getCalendarSlotFromBag(e) {
  return extractCalendarSlotFromBag(e) || ae;
}

function extractCalendarSlotFromBag(e) {
  const {calendar: t} = e;
  if (void 0 !== t) {
    return refineCalendarSlot(t);
  }
}

function refineCalendarSlot(e) {
  return uo(e) ? (Aa(e) || {}).calendar || os(e) : (e => Fa(Ia(Le(e))))(e);
}

import { createGetterDescriptors as Ct, mapProps as Zt, createPropDescriptors as xt, createStringTagDescriptors as Bt, createNameDescriptors as Yt, invalidCallingContext as i, hasAllPropsByName as At, invalidProtocol as m, invalidBag as o, RawDateTimeFormat as Fe, pluckProps as Vt, createLazyGenerator as Jt, invalidFormatType as Lt, createFormatPrepper as Rt, createFormatForPrep as Wt, mismatchingFormatTypes as F, plainYearMonthConfig as Mt, plainMonthDayConfig as Pt, plainDateConfig as Et, plainDateTimeConfig as vt, plainTimeConfig as Ft, instantConfig as bt, zonedDateTimeConfig as St, requireStringOrUndefined as Gt, requireIntegerOrUndefined as Ut, requireInteger as zt, requirePositiveInteger as Ht, requireBoolean as Ae, requireString as Le, mapPropNames as Kt, getId as Qt, createPlainDateSlots as Xt, durationFieldNamesAsc as de, timeFieldNamesAsc as j, isoTimeFieldNamesAsc as ge, getEpochSeconds as $t, getEpochMilliseconds as _t, getEpochMicroseconds as eo, getEpochNanoseconds as to, createNativeStandardOps as nt, forbiddenValueOf as r, bindArgs as no, excludePropsByName as oo, PlainDateBranding as hn, PlainYearMonthBranding as mn, PlainMonthDayBranding as pn, plainMonthDayWithFields as ro, plainMonthDaysEqual as ao, formatPlainMonthDayIso as io, plainMonthDayToPlainDate as so, constructPlainMonthDaySlots as lo, copyOptions as co, isObjectLike as uo, refineOverflowOptions as fo, refinePlainMonthDayBag as mo, parsePlainMonthDay as So, isoCalendarId as ae, requireFunction as je, createInstantSlots as Oo, createPlainDateTimeSlots as To, validateTimeZoneOffset as po, queryNativeTimeZone as wn, plainYearMonthWithFields as ho, movePlainYearMonth as Po, diffPlainYearMonth as Do, plainYearMonthsEqual as Co, formatPlainYearMonthIso as go, plainYearMonthToPlainDate as Zo, constructPlainYearMonthSlots as bo, refinePlainYearMonthBag as Fo, parsePlainYearMonth as Io, compareIsoDateFields as vo, computeHoursInDay as wo, formatOffsetNano as jo, ZonedDateTimeBranding as In, zonedEpochSlotsToIso as bn, zonedDateTimeWithFields as Mo, zonedDateTimeWithPlainTime as yo, zonedDateTimeWithPlainDate as No, slotsWithTimeZone as Bo, slotsWithCalendar as Yo, moveZonedDateTime as Ao, createDurationSlots as Eo, diffZonedDateTimes as Vo, roundZonedDateTime as Jo, computeStartOfDay as Lo, zonedDateTimesEqual as qo, formatZonedDateTimeIso as ko, zonedDateTimeToInstant as xo, zonedDateTimeToPlainDate as Ro, zonedDateTimeToPlainTime as Wo, zonedDateTimeToPlainDateTime as Go, zonedDateTimeToPlainYearMonth as Uo, zonedDateTimeToPlainMonthDay as zo, buildZonedIsoFields as Ho, constructZonedDateTimeSlots as Ko, refineZonedFieldOptions as Qo, refineZonedDateTimeBag as Xo, parseZonedDateTime as $o, compareZonedDateTimes as _o, moveInstant as er, diffInstants as tr, roundInstant as nr, instantsEqual as or, formatInstantIso as rr, instantToZonedDateTime as ar, requireObjectLike as ir, constructInstantSlots as sr, InstantBranding as gn, parseInstant as lr, numberToDayTimeNano as cr, epochSecToInstant as ur, epochMilliToInstant as dr, epochMicroToInstant as fr, epochNanoToInstant as mr, compareInstants as Sr, nanoInMilli as Z, epochNanoToIso as Or, refineEpochDisambigOptions as Tr, getSingleInstantFor as pr, isTimeZoneSlotsEqual as hr, resolveTimeZoneId as Pr, parseTimeZoneId as Dr, plainTimeWithFields as Cr, movePlainTime as gr, diffPlainTimes as Zr, roundPlainTime as br, plainTimesEqual as Fr, formatPlainTimeIso as Ir, plainTimeToZonedDateTime as vr, plainTimeToPlainDateTime as wr, constructPlainTimeSlots as jr, PlainTimeBranding as Dn, PlainDateTimeBranding as Tn, createPlainTimeSlots as Mr, refinePlainTimeBag as yr, parsePlainTime as Nr, compareIsoTimeFields as Br, plainDateTimeWithFields as Yr, plainDateTimeWithPlainTime as Ar, plainDateTimeWithPlainDate as Er, movePlainDateTime as Vr, diffPlainDateTimes as Jr, roundPlainDateTime as Lr, plainDateTimesEqual as qr, formatPlainDateTimeIso as kr, plainDateTimeToZonedDateTime as xr, plainDateTimeToPlainYearMonth as Rr, plainDateTimeToPlainMonthDay as Wr, constructPlainDateTimeSlots as Gr, isoTimeFieldDefaults as ve, refinePlainDateTimeBag as Ur, parsePlainDateTime as zr, compareIsoDateTimeFields as Hr, plainDateWithFields as Kr, movePlainDate as Qr, diffPlainDates as Xr, plainDatesEqual as $r, formatPlainDateIso as _r, plainDateToZonedDateTime as ea, plainDateToPlainDateTime as ta, plainDateToPlainYearMonth as na, plainDateToPlainMonthDay as oa, constructPlainDateSlots as ra, refinePlainDateBag as aa, parsePlainDate as ia, unitNamesAsc as k, queryDurationBlank as sa, queryDurationSign as Sn, constructDurationSlots as la, DurationBranding as yn, durationWithFields as ca, addDurations as ua, negateDuration as da, absDuration as fa, roundDuration as ma, totalDuration as Sa, formatDurationIso as Oa, refineDurationBag as Ta, parseDuration as pa, refineMaybeZonedDateTimeBag as ha, parseZonedOrPlainDateTime as Pa, compareDurations as Da, refineCalendarDiffOptions as Ca, dateFieldNamesAlpha as te, forbiddenField as ga, excludeUndefinedProps as Za, requireNonNullish as ba, resolveCalendarId as Fa, parseCalendarId as Ia, getRequiredDateFields as va, getRequiredMonthDayFields as wa, getRequiredYearMonthFields as ja, getCurrentTimeZoneId as Ma, getCurrentEpochNanoseconds as ya, createZonedDateTimeSlots as Na, getCurrentIsoDateTime as Ba } from "./vVnp2l5L.esm.js";

const Ya = /*@__PURE__*/ new WeakMap, Aa = /*@__PURE__*/ Ya.get.bind(Ya), Ea = /*@__PURE__*/ Ya.set.bind(Ya), kt = /*@__PURE__*/ createDateTimeFormatClass(), Va = /*@__PURE__*/ new WeakMap, Ja = {
  PlainYearMonth: Mt,
  PlainMonthDay: Pt,
  PlainDate: Et,
  PlainDateTime: vt,
  PlainTime: Ft,
  Instant: bt
}, La = /*@__PURE__*/ Rt(Mt), qa = /*@__PURE__*/ Rt(Pt), ka = /*@__PURE__*/ Rt(Et), xa = /*@__PURE__*/ Rt(vt), Ra = /*@__PURE__*/ Rt(Ft), Wa = /*@__PURE__*/ Rt(bt), Ga = /*@__PURE__*/ Rt(St), Ua = {
  era: Gt,
  eraYear: Ut,
  year: zt,
  month: Ht,
  daysInMonth: Ht,
  daysInYear: Ht,
  inLeapYear: Ae,
  monthsInYear: Ht
}, za = {
  monthCode: Le
}, Ha = {
  day: Ht
}, Ka = {
  dayOfWeek: Ht,
  dayOfYear: Ht,
  weekOfYear: Ht,
  yearOfWeek: zt,
  daysInWeek: Ht
}, Qa = /*@__PURE__*/ Object.assign({}, Ua, za, Ha, Ka), Xa = {
  ...createCalendarFieldMethods(Ua, [ mn ]),
  ...createCalendarFieldMethods(Ka, []),
  ...createCalendarFieldMethods(za, [ mn, pn ]),
  ...createCalendarFieldMethods(Ha, [ pn ])
}, $a = /*@__PURE__*/ createCalendarGetters(Qa), _a = /*@__PURE__*/ createCalendarGetters({
  ...Ua,
  ...za
}), ei = /*@__PURE__*/ createCalendarGetters({
  ...za,
  ...Ha
}), ti = {
  calendarId: e => Qt(e.calendar)
}, ni = /*@__PURE__*/ Zt(((e, t) => function(n) {
  const {$: o} = this;
  return e(o[t](wi(Xt(n, o))));
}), Qa), oi = /*@__PURE__*/ Kt((e => t => t[e]), de), ri = /*@__PURE__*/ Kt(((e, t) => e => e[ge[t]]), j), ai = {
  epochSeconds: $t,
  epochMilliseconds: _t,
  epochMicroseconds: eo,
  epochNanoseconds: to
}, ii = /*@__PURE__*/ no(oo, new Set([ "branding" ])), [si, li, ci] = createSlotClass(pn, no(lo, refineCalendarSlot), {
  ...ti,
  ...ei
}, {
  with(e, t, n) {
    return li(ro(zi, e, this, rejectInvalidBag(t), n));
  },
  equals: (e, t) => ao(e, toPlainMonthDaySlots(t)),
  toString: io,
  toJSON: e => io(e),
  toLocaleString(e, t, n) {
    const [o, r] = qa(t, n, e);
    return o.format(r);
  },
  toPlainDate(e, t) {
    return wi(so(Ui, e, this, t));
  },
  getISOFields: ii,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => li(toPlainMonthDaySlots(e, t))
}), ui = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
  getPossibleInstantsFor(e, t, n) {
    return [ ...t.call(e, Ii(To(n, ae))) ].map((e => Pi(e).epochNanoseconds));
  }
}, di = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter
}, [fi, mi, Si] = createSlotClass(mn, no(bo, refineCalendarSlot), {
  ...ti,
  ..._a
}, {
  with(e, t, n) {
    return mi(ho(Gi, e, this, rejectInvalidBag(t), n));
  },
  add: (e, t, n) => mi(Po(Qi, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => mi(Po(Qi, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => _i(Do(Xi, 0, e, toPlainYearMonthSlots(t), n)),
  since: (e, t, n) => _i(Do(Xi, 1, e, toPlainYearMonthSlots(t), n)),
  equals: (e, t) => Co(e, toPlainYearMonthSlots(t)),
  toString: go,
  toJSON: e => go(e),
  toLocaleString(e, t, n) {
    const [o, r] = La(t, n, e);
    return o.format(r);
  },
  toPlainDate(e, t) {
    return wi(Zo(Ui, e, this, t));
  },
  getISOFields: ii,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => mi(toPlainYearMonthSlots(e, t)),
  compare: (e, t) => vo(toPlainYearMonthSlots(e), toPlainYearMonthSlots(t))
}), [Oi, Ti] = createSlotClass(In, no(Ko, refineCalendarSlot, refineTimeZoneSlot), {
  ...ai,
  ...ti,
  ...adaptDateMethods($a),
  ...adaptDateMethods(ri),
  hoursInDay: e => wo(createTimeZoneOps, e),
  offsetNanoseconds: e => slotsToIso(e).offsetNanoseconds,
  offset: e => jo(slotsToIso(e).offsetNanoseconds),
  timeZoneId: e => Qt(e.timeZone)
}, {
  with(e, t, n) {
    return Ti(Mo(Ui, createTimeZoneOps, e, this, rejectInvalidBag(t), n));
  },
  withPlainTime: (e, t) => Ti(yo(createTimeZoneOps, e, optionalToPlainTimeFields(t))),
  withPlainDate: (e, t) => Ti(No(createTimeZoneOps, e, toPlainDateSlots(t))),
  withTimeZone: (e, t) => Ti(Bo(e, refineTimeZoneSlot(t))),
  withCalendar: (e, t) => Ti(Yo(e, refineCalendarSlot(t))),
  add: (e, t, n) => Ti(Ao(Hi, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Ti(Ao(Hi, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => _i(Eo(Vo(Ki, createTimeZoneOps, 0, e, toZonedDateTimeSlots(t), n))),
  since: (e, t, n) => _i(Eo(Vo(Ki, createTimeZoneOps, 1, e, toZonedDateTimeSlots(t), n))),
  round: (e, t) => Ti(Jo(createTimeZoneOps, e, t)),
  startOfDay: e => Ti(Lo(createTimeZoneOps, e)),
  equals: (e, t) => qo(e, toZonedDateTimeSlots(t)),
  toString: (e, t) => ko(createTimeZoneOffsetOps, e, t),
  toJSON: e => ko(createTimeZoneOffsetOps, e),
  toLocaleString(e, t, n = {}) {
    const [o, r] = Ga(t, n, e);
    return o.format(r);
  },
  toInstant: e => hi(xo(e)),
  toPlainDate: e => wi(Ro(createTimeZoneOffsetOps, e)),
  toPlainTime: e => bi(Wo(createTimeZoneOffsetOps, e)),
  toPlainDateTime: e => Ii(Go(createTimeZoneOffsetOps, e)),
  toPlainYearMonth(e) {
    return mi(Uo(xi, e, this));
  },
  toPlainMonthDay(e) {
    return li(zo(Wi, e, this));
  },
  getISOFields: e => Ho(createTimeZoneOffsetOps, e),
  getCalendar: createCalendarFromSlots,
  getTimeZone: ({timeZone: e}) => "string" == typeof e ? new Di(e) : e,
  valueOf: neverValueOf
}, {
  from: (e, t) => Ti(toZonedDateTimeSlots(e, t)),
  compare: (e, t) => _o(toZonedDateTimeSlots(e), toZonedDateTimeSlots(t))
}), [pi, hi, Pi] = createSlotClass(gn, sr, ai, {
  add: (e, t) => hi(er(0, e, toDurationSlots(t))),
  subtract: (e, t) => hi(er(1, e, toDurationSlots(t))),
  until: (e, t, n) => _i(tr(0, e, toInstantSlots(t), n)),
  since: (e, t, n) => _i(tr(1, e, toInstantSlots(t), n)),
  round: (e, t) => hi(nr(e, t)),
  equals: (e, t) => or(e, toInstantSlots(t)),
  toString: (e, t) => rr(refineTimeZoneSlot, createTimeZoneOffsetOps, e, t),
  toJSON: e => rr(refineTimeZoneSlot, createTimeZoneOffsetOps, e),
  toLocaleString(e, t, n) {
    const [o, r] = Wa(t, n, e);
    return o.format(r);
  },
  toZonedDateTimeISO: (e, t) => Ti(ar(e, refineTimeZoneSlot(t))),
  toZonedDateTime(e, t) {
    const n = ir(t);
    return Ti(ar(e, refineTimeZoneSlot(n.timeZone), refineCalendarSlot(n.calendar)));
  },
  valueOf: neverValueOf
}, {
  from: e => hi(toInstantSlots(e)),
  fromEpochSeconds: e => hi(ur(e)),
  fromEpochMilliseconds: e => hi(dr(e)),
  fromEpochMicroseconds: e => hi(fr(e)),
  fromEpochNanoseconds: e => hi(mr(e)),
  compare: (e, t) => Sr(toInstantSlots(e), toInstantSlots(t))
}), [Di, Ci] = createSlotClass("TimeZone", (e => {
  const t = Pr(e);
  return {
    branding: "TimeZone",
    id: t,
    C: wn(t)
  };
}), {
  id: e => e.id
}, {
  toString: e => e.id,
  toJSON: e => e.id,
  getPossibleInstantsFor: ({C: e}, t) => e.getPossibleInstantsFor(toPlainDateTimeSlots(t)).map((e => hi(Oo(e)))),
  getOffsetNanosecondsFor: ({C: e}, t) => e.getOffsetNanosecondsFor(toInstantSlots(t).epochNanoseconds),
  getOffsetStringFor(e, t) {
    const n = toInstantSlots(t).epochNanoseconds, o = createAdapterOps(this, di).getOffsetNanosecondsFor(n);
    return jo(o);
  },
  getPlainDateTimeFor(e, t, n = ae) {
    const o = toInstantSlots(t).epochNanoseconds, r = createAdapterOps(this, di).getOffsetNanosecondsFor(o);
    return Ii(To(Or(o, r), refineCalendarSlot(n)));
  },
  getInstantFor(e, t, n) {
    const o = toPlainDateTimeSlots(t), r = Tr(n), a = createAdapterOps(this);
    return hi(Oo(pr(a, o, r)));
  },
  getNextTransition: ({C: e}, t) => getImplTransition(1, e, t),
  getPreviousTransition: ({C: e}, t) => getImplTransition(-1, e, t),
  equals(e, t) {
    return !!hr(this, refineTimeZoneSlot(t));
  }
}, {
  from(e) {
    const t = refineTimeZoneSlot(e);
    return "string" == typeof t ? new Di(t) : t;
  }
}), gi = /*@__PURE__*/ createProtocolValidator(Object.keys(ui)), [Zi, bi] = createSlotClass(Dn, jr, ri, {
  with(e, t, n) {
    return bi(Cr(this, rejectInvalidBag(t), n));
  },
  add: (e, t) => bi(gr(0, e, toDurationSlots(t))),
  subtract: (e, t) => bi(gr(1, e, toDurationSlots(t))),
  until: (e, t, n) => _i(Zr(0, e, toPlainTimeSlots(t), n)),
  since: (e, t, n) => _i(Zr(1, e, toPlainTimeSlots(t), n)),
  round: (e, t) => bi(br(e, t)),
  equals: (e, t) => Fr(e, toPlainTimeSlots(t)),
  toString: Ir,
  toJSON: e => Ir(e),
  toLocaleString(e, t, n) {
    const [o, r] = Ra(t, n, e);
    return o.format(r);
  },
  toZonedDateTime: (e, t) => Ti(vr(refineTimeZoneSlot, toPlainDateSlots, createTimeZoneOps, e, t)),
  toPlainDateTime: (e, t) => Ii(wr(e, toPlainDateSlots(t))),
  getISOFields: ii,
  valueOf: neverValueOf
}, {
  from: (e, t) => bi(toPlainTimeSlots(e, t)),
  compare: (e, t) => Br(toPlainTimeSlots(e), toPlainTimeSlots(t))
}), [Fi, Ii] = createSlotClass(Tn, no(Gr, refineCalendarSlot), {
  ...ti,
  ...$a,
  ...ri
}, {
  with(e, t, n) {
    return Ii(Yr(Ui, e, this, rejectInvalidBag(t), n));
  },
  withPlainTime: (e, t) => Ii(Ar(e, optionalToPlainTimeFields(t))),
  withPlainDate: (e, t) => Ii(Er(e, toPlainDateSlots(t))),
  withCalendar: (e, t) => Ii(Yo(e, refineCalendarSlot(t))),
  add: (e, t, n) => Ii(Vr(Hi, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Ii(Vr(Hi, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => _i(Jr(Ki, 0, e, toPlainDateTimeSlots(t), n)),
  since: (e, t, n) => _i(Jr(Ki, 1, e, toPlainDateTimeSlots(t), n)),
  round: (e, t) => Ii(Lr(e, t)),
  equals: (e, t) => qr(e, toPlainDateTimeSlots(t)),
  toString: (e, t) => kr(e, t),
  toJSON: e => kr(e),
  toLocaleString(e, t, n) {
    const [o, r] = xa(t, n, e);
    return o.format(r);
  },
  toZonedDateTime: (e, t, n) => Ti(xr(createTimeZoneOps, e, refineTimeZoneSlot(t), n)),
  toPlainDate: e => wi(Xt(e)),
  toPlainYearMonth(e) {
    return mi(Rr(xi, e, this));
  },
  toPlainMonthDay(e) {
    return li(Wr(Wi, e, this));
  },
  toPlainTime: e => bi(Mr(e)),
  getISOFields: ii,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => Ii(toPlainDateTimeSlots(e, t)),
  compare: (e, t) => Hr(toPlainDateTimeSlots(e), toPlainDateTimeSlots(t))
}), [vi, wi, ji] = createSlotClass(hn, no(ra, refineCalendarSlot), {
  ...ti,
  ...$a
}, {
  with(e, t, n) {
    return wi(Kr(Ui, e, this, rejectInvalidBag(t), n));
  },
  withCalendar: (e, t) => wi(Yo(e, refineCalendarSlot(t))),
  add: (e, t, n) => wi(Qr(Hi, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => wi(Qr(Hi, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => _i(Xr(Ki, 0, e, toPlainDateSlots(t), n)),
  since: (e, t, n) => _i(Xr(Ki, 1, e, toPlainDateSlots(t), n)),
  equals: (e, t) => $r(e, toPlainDateSlots(t)),
  toString: _r,
  toJSON: e => _r(e),
  toLocaleString(e, t, n) {
    const [o, r] = ka(t, n, e);
    return o.format(r);
  },
  toZonedDateTime(e, t) {
    const n = !uo(t) || t instanceof Di ? {
      timeZone: t
    } : t;
    return Ti(ea(refineTimeZoneSlot, toPlainTimeSlots, createTimeZoneOps, e, n));
  },
  toPlainDateTime: (e, t) => Ii(ta(e, optionalToPlainTimeFields(t))),
  toPlainYearMonth(e) {
    return mi(na(xi, e, this));
  },
  toPlainMonthDay(e) {
    return li(oa(Wi, e, this));
  },
  getISOFields: ii,
  getCalendar: createCalendarFromSlots,
  valueOf: neverValueOf
}, {
  from: (e, t) => wi(toPlainDateSlots(e, t)),
  compare: (e, t) => vo(toPlainDateSlots(e), toPlainDateSlots(t))
}), Mi = {
  fields(e, t, n) {
    return [ ...t.call(e, n) ];
  }
}, yi = /*@__PURE__*/ Object.assign({
  dateFromFields(e, t, n, o) {
    return ji(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Mi), Ni = /*@__PURE__*/ Object.assign({
  yearMonthFromFields(e, t, n, o) {
    return Si(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Mi), Bi = /*@__PURE__*/ Object.assign({
  monthDayFromFields(e, t, n, o) {
    return ci(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Mi), Yi = {
  mergeFields(e, t, n, o) {
    return ir(t.call(e, Object.assign(Object.create(null), n), Object.assign(Object.create(null), o)));
  }
}, Ai = /*@__PURE__*/ Object.assign({}, yi, Yi), Ei = /*@__PURE__*/ Object.assign({}, Ni, Yi), Vi = /*@__PURE__*/ Object.assign({}, Bi, Yi), Ji = {
  dateAdd(e, t, n, o, r) {
    return ji(t.call(e, wi(Xt(n, e)), _i(Eo(o)), r));
  }
}, Li = /*@__PURE__*/ Object.assign({}, Ji, {
  dateUntil(e, t, n, o, r, a) {
    return es(t.call(e, wi(Xt(n, e)), wi(Xt(o, e)), Object.assign(Object.create(null), a, {
      largestUnit: k[r]
    })));
  }
}), qi = /*@__PURE__*/ Object.assign({}, Ji, {
  day: dayAdapter
}), ki = /*@__PURE__*/ Object.assign({}, Li, {
  day: dayAdapter
}), xi = /*@__PURE__*/ createCompoundOpsCreator(Ni), Ri = /*@__PURE__*/ createCompoundOpsCreator(yi), Wi = /*@__PURE__*/ createCompoundOpsCreator(Bi), Gi = /*@__PURE__*/ createCompoundOpsCreator(Ei), Ui = /*@__PURE__*/ createCompoundOpsCreator(Ai), zi = /*@__PURE__*/ createCompoundOpsCreator(Vi), Hi = /*@__PURE__*/ createCompoundOpsCreator(Ji), Ki = /*@__PURE__*/ createCompoundOpsCreator(Li), Qi = /*@__PURE__*/ createCompoundOpsCreator(qi), Xi = /*@__PURE__*/ createCompoundOpsCreator(ki), [$i, _i, es] = createSlotClass(yn, la, {
  ...oi,
  blank: e => sa(e),
  sign: e => Sn(e)
}, {
  with: (e, t) => _i(ca(e, t)),
  add: (e, t, n) => _i(ua(refinePublicRelativeTo, Ki, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => _i(ua(refinePublicRelativeTo, Ki, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  negated: e => _i(da(e)),
  abs: e => _i(fa(e)),
  round: (e, t) => _i(ma(refinePublicRelativeTo, Ki, createTimeZoneOps, e, t)),
  total: (e, t) => Sa(refinePublicRelativeTo, Ki, createTimeZoneOps, e, t),
  toString: Oa,
  toLocaleString(e, t, n) {
    return Intl.DurationFormat ? new Intl.DurationFormat(t, n).format(this) : Oa(e);
  },
  toJSON: e => Oa(e),
  valueOf: neverValueOf
}, {
  from: e => _i(toDurationSlots(e)),
  compare: (e, t, n) => Da(refinePublicRelativeTo, Ki, createTimeZoneOps, toDurationSlots(e), toDurationSlots(t), n)
}), ts = {
  toString: e => e.id,
  toJSON: e => e.id,
  ...Xa,
  dateAdd: ({id: e, C: t}, n, o, r) => wi(Xt(t.dateAdd(toPlainDateSlots(n), toDurationSlots(o), r), e)),
  dateUntil: ({C: e}, t, n, o) => _i(Eo(e.dateUntil(toPlainDateSlots(t), toPlainDateSlots(n), Ca(o)))),
  dateFromFields: ({id: e, C: t}, n, o) => wi(aa(t, n, o, va(e))),
  yearMonthFromFields: ({id: e, C: t}, n, o) => mi(Fo(t, n, o, ja(e))),
  monthDayFromFields: ({id: e, C: t}, n, o) => li(mo(t, 0, n, o, wa(e))),
  fields({C: e}, t) {
    const n = new Set(te), o = [];
    for (const e of t) {
      if (Le(e), !n.has(e)) {
        throw new RangeError(ga(e));
      }
      n.delete(e), o.push(e);
    }
    return e.fields(o);
  },
  mergeFields: ({C: e}, t, n) => e.mergeFields(Za(ba(t)), Za(ba(n)))
}, [ns] = createSlotClass("Calendar", (e => {
  const t = Fa(Le(e));
  return {
    branding: "Calendar",
    id: t,
    C: nt(t)
  };
}), {
  id: e => e.id
}, ts, {
  from(e) {
    const t = refineCalendarSlot(e);
    return "string" == typeof t ? new ns(t) : t;
  }
}), os = /*@__PURE__*/ createProtocolValidator(Object.keys(ts).slice(4)), rs = /*@__PURE__*/ Object.defineProperties({}, {
  ...Bt("Temporal.Now"),
  ...xt({
    timeZoneId: () => Ma(),
    instant: () => hi(Oo(ya())),
    zonedDateTime: (e, t = Ma()) => Ti(Na(ya(), refineTimeZoneSlot(t), refineCalendarSlot(e))),
    zonedDateTimeISO: (e = Ma()) => Ti(Na(ya(), refineTimeZoneSlot(e), ae)),
    plainDateTime: (e, t = Ma()) => Ii(To(Ba(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateTimeISO: (e = Ma()) => Ii(To(Ba(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), ae)),
    plainDate: (e, t = Ma()) => wi(Xt(Ba(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateISO: (e = Ma()) => wi(Xt(Ba(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), ae)),
    plainTimeISO: (e = Ma()) => bi(Mr(Ba(createTimeZoneOffsetOps(refineTimeZoneSlot(e)))))
  })
}), jt = /*@__PURE__*/ Object.defineProperties({}, {
  ...Bt("Temporal"),
  ...xt({
    PlainYearMonth: fi,
    PlainMonthDay: si,
    PlainDate: vi,
    PlainTime: Zi,
    PlainDateTime: Fi,
    ZonedDateTime: Oi,
    Instant: pi,
    Calendar: ns,
    TimeZone: Di,
    Duration: $i,
    Now: rs
  })
});

export { kt as DateTimeFormat, jt as Temporal, qt as toTemporalInstant };
