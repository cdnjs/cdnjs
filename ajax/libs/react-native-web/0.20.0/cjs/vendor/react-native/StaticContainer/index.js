/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */

'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   const someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticContainer>
 *       <MyComponent value={someValue} />
 *     </StaticContainer>
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */

class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }
  render() {
    var child = this.props.children;
    return child === null || child === false ? null : React.Children.only(child);
  }
}
var _default = exports.default = StaticContainer;
module.exports = exports.default;