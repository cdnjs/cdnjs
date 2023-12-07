const $__value = Symbol("$__value");
const $__href = Symbol("$__href");

export const cons = (href, value) => ({
  [$__href]: href,
  [$__value]: value
});

export const isReference = (ref) => ref && ref[$__href] !== undefined;
export const href = (ref) => ref[$__href];
export const value = (ref) => ref[$__value];
