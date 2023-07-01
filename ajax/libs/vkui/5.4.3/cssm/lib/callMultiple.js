export const callMultiple = (...fns)=>(...args)=>fns.filter((f)=>typeof f === 'function').forEach((f)=>f(...args));

//# sourceMappingURL=callMultiple.js.map