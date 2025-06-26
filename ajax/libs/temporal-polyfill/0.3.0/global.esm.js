import { Temporal as Xn, DateTimeFormat as _n, toTemporalInstant as ja } from "./chunks/classApi.js";

import { createPropDescriptors as n } from "./chunks/internal.js";

Object.defineProperties(globalThis, n({
  Temporal: Xn
})), Object.defineProperties(Intl, n({
  DateTimeFormat: _n
})), Object.defineProperties(Date.prototype, n({
  toTemporalInstant: ja
}));
