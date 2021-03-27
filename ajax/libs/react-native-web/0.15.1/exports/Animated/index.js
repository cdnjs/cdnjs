function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import AnimatedImplementation from '../../vendor/react-native/Animated/AnimatedImplementation';
import FlatList from '../FlatList';
import Image from '../Image';
import SectionList from '../SectionList';
import ScrollView from '../ScrollView';
import Text from '../Text';
import View from '../View';

var Animated = _objectSpread(_objectSpread({}, AnimatedImplementation), {}, {
  FlatList: AnimatedImplementation.createAnimatedComponent(FlatList, {
    scrollEventThrottle: 0.0001
  }),
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView, {
    scrollEventThrottle: 0.0001
  }),
  SectionList: AnimatedImplementation.createAnimatedComponent(SectionList, {
    scrollEventThrottle: 0.0001
  }),
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text)
});

export default Animated;