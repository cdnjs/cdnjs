/**
 * Swiper 6.7.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 1, 2021
 */

import Swiper from './esm/components/core/core-class';
export { default as Swiper, default } from './esm/components/core/core-class';
import Virtual from './esm/components/virtual/virtual';
import Keyboard from './esm/components/keyboard/keyboard';
import Mousewheel from './esm/components/mousewheel/mousewheel';
import Navigation from './esm/components/navigation/navigation';
import Pagination from './esm/components/pagination/pagination';
import Scrollbar from './esm/components/scrollbar/scrollbar';
import Parallax from './esm/components/parallax/parallax';
import Zoom from './esm/components/zoom/zoom';
import Lazy from './esm/components/lazy/lazy';
import Controller from './esm/components/controller/controller';
import A11y from './esm/components/a11y/a11y';
import History from './esm/components/history/history';
import HashNavigation from './esm/components/hash-navigation/hash-navigation';
import Autoplay from './esm/components/autoplay/autoplay';
import EffectFade from './esm/components/effect-fade/effect-fade';
import EffectCube from './esm/components/effect-cube/effect-cube';
import EffectFlip from './esm/components/effect-flip/effect-flip';
import EffectCoverflow from './esm/components/effect-coverflow/effect-coverflow';
import Thumbs from './esm/components/thumbs/thumbs';

// Swiper Class
var components = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs];
Swiper.use(components);
