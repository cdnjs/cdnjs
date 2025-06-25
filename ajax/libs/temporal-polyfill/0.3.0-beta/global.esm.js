import { Temporal as Qn, DateTimeFormat as Un, toTemporalInstant as ja } from "./chunks/classApi.js";

import { createPropDescriptors as n } from "./chunks/internal.js";

Object.defineProperties(globalThis, n({
  Temporal: Qn
})), Object.defineProperties(Intl, n({
  DateTimeFormat: Un
})), Object.defineProperties(Date.prototype, n({
  toTemporalInstant: ja
}));
