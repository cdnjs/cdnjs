import toregex from 'path-to-regexp';

const is = val => arg => typeof arg === val;

// PageX
// A minimal engine for loading only page-specific code with regex or paths
export default (reg, ...args) => {
  if (typeof reg === 'string') {
    reg = toregex(reg === '*' ? '(.*)' : reg);
  }
  const negate = args.find(is('boolean')) || false;
  const callback = args.find(is('function')) || ((...args) => args);
  const url = args.find(is('string')) || window.location.pathname;

  // Check whether we are in the correct page or not
  if (reg.test(url) === negate) return false;

  const matched = url.match(reg) || [{}];
  return callback(...matched.slice(1));
};
