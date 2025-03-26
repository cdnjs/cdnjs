// src/rxjs.ts
import { subscribe as r } from "exome";
import { Observable as n } from "rxjs";
function b(e) {
  return new n((o) => {
    r(e, (m) => o.next(m)), o.next(e);
  });
}
export {
  b as observableFromExome
};
