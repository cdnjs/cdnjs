import { Temporal as jt, DateTimeFormat as kt, toTemporalInstant as qt } from "./impl.esm.js";

import { createPropDescriptors as xt } from "./chunks/fEYw9zwg.esm.js";

Object.defineProperties(globalThis, xt({
  Temporal: jt
})), Object.defineProperties(Intl, xt({
  DateTimeFormat: kt
})), Object.defineProperties(Date.prototype, xt({
  toTemporalInstant: qt
}));
