import React, { Children, Fragment } from 'react';
export function intersperse(children, separator = ', ') {
  const items = Children.toArray(children);
  const count = items.length;

  // Short-circuit if no separators needed or separator is falsy (and not a function)
  // Note: undefined check won't trigger due to default parameter, but null and false will
  if (count <= 1 || separator === null || separator === false) {
    return items;
  }
  const result = [];
  for (const [index, child] of items.entries()) {
    result.push(child);

    // Early return on last item
    if (index === count - 1) {
      return result;
    }
    const separatorNode = typeof separator === 'function' ? separator(index, count) : separator;
    if (separatorNode === undefined || separatorNode === null || separatorNode === false) {
      continue;
    }
    result.push(/*#__PURE__*/React.createElement(Fragment, {
      key: `__react_extras_separator_${index}`
    }, separatorNode));
  }
  return result;
}
export function Join({
  separator,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, intersperse(children, separator));
}