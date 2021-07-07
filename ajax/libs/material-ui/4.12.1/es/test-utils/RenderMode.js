import * as React from 'react';
import * as PropTypes from 'prop-types';
const Context = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'RenderContext';
}
/**
 * @ignore - internal component.
 */


export function RenderContext({
  children
}) {
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: "render"
  }, children);
}
process.env.NODE_ENV !== "production" ? RenderContext.propTypes = {
  children: PropTypes.node.isRequired
} : void 0;
export function useIsSsr() {
  return React.useContext(Context) === 'render';
}