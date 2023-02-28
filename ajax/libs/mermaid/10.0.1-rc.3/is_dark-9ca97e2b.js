import { L as c, _ as r } from "./config-d3eb77a7.js";
const e = (n) => {
  const { r: t, g: o, b: a } = c.parse(n), s = 0.2126 * r.channel.toLinear(t) + 0.7152 * r.channel.toLinear(o) + 0.0722 * r.channel.toLinear(a);
  return r.lang.round(s);
}, i = e, l = (n) => i(n) >= 0.5, u = l, L = (n) => !u(n), m = L;
export {
  m as i
};
//# sourceMappingURL=is_dark-9ca97e2b.js.map
