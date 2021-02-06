/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import StyleSheet from '../StyleSheet';
import View from '../View';
import React, { createContext } from 'react';
var RootTagContext = createContext(null);
export default function AppContainer(props) {
  var children = props.children,
      WrapperComponent = props.WrapperComponent;
  var innerView = React.createElement(View, {
    children: children,
    key: 1,
    pointerEvents: "box-none",
    style: styles.appContainer
  });

  if (WrapperComponent) {
    innerView = React.createElement(WrapperComponent, null, innerView);
  }

  return React.createElement(RootTagContext.Provider, {
    value: props.rootTag
  }, React.createElement(View, {
    pointerEvents: "box-none",
    style: styles.appContainer
  }, innerView));
}
var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});