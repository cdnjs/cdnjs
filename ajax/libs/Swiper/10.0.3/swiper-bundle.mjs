/**
 * Swiper 10.0.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 3, 2023
 */

import { S as Swiper } from './shared/swiper-core.mjs';
import Virtual from './modules/virtual.mjs';
import Keyboard from './modules/keyboard.mjs';
import Mousewheel from './modules/mousewheel.mjs';
import Navigation from './modules/navigation.mjs';
import Pagination from './modules/pagination.mjs';
import Scrollbar from './modules/scrollbar.mjs';
import Parallax from './modules/parallax.mjs';
import Zoom from './modules/zoom.mjs';
import Controller from './modules/controller.mjs';
import A11y from './modules/a11y.mjs';
import History from './modules/history.mjs';
import HashNavigation from './modules/hash-navigation.mjs';
import Autoplay from './modules/autoplay.mjs';
import Thumb from './modules/thumbs.mjs';
import freeMode from './modules/free-mode.mjs';
import Grid from './modules/grid.mjs';
import Manipulation from './modules/manipulation.mjs';
import EffectFade from './modules/effect-fade.mjs';
import EffectCube from './modules/effect-cube.mjs';
import EffectFlip from './modules/effect-flip.mjs';
import EffectCoverflow from './modules/effect-coverflow.mjs';
import EffectCreative from './modules/effect-creative.mjs';
import EffectCards from './modules/effect-cards.mjs';

// Swiper Class
const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
Swiper.use(modules);

export { Swiper, Swiper as default };
