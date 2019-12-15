/*!
 Material Components for the Web
 Copyright (c) 2019 Google Inc.
 License: MIT
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mdc=e():t.mdc=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=81)}([function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}();e.MDCFoundation=r,e.default=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s},i=this&&this.__spread||function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(r(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=function(){function t(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];this.root_=t,this.initialize.apply(this,i(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new o.MDCFoundation({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e){this.root_.addEventListener(t,e)},t.prototype.unlisten=function(t,e){this.root_.removeEventListener(t,e)},t.prototype.emit=function(t,e,n){void 0===n&&(n=!1);var r;"function"==typeof CustomEvent?r=new CustomEvent(t,{bubbles:n,detail:e}):(r=document.createEvent("CustomEvent"),r.initCustomEvent(t,n,!1,e)),this.root_.dispatchEvent(r)},t}();e.MDCComponent=s,e.default=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var i=r(n(11));e.ponyfill=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(12));e.util=o,r(n(4)),r(n(13))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(2),a=n(13),c=i(n(12)),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.disabled=!1,e}return r(e,t),e.attachTo=function(t,n){void 0===n&&(n={isUnbounded:void 0});var r=new e(t);return void 0!==n.isUnbounded&&(r.unbounded=n.isUnbounded),r},e.createAdapter=function(t){return{addClass:function(e){return t.root_.classList.add(e)},browserSupportsCssVars:function(){return c.supportsCssVariables(window)},computeBoundingRect:function(){return t.root_.getBoundingClientRect()},containsEventTarget:function(e){return t.root_.contains(e)},deregisterDocumentInteractionHandler:function(t,e){return document.documentElement.removeEventListener(t,e,c.applyPassive())},deregisterInteractionHandler:function(e,n){return t.root_.removeEventListener(e,n,c.applyPassive())},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}},isSurfaceActive:function(){return s.ponyfill.matches(t.root_,":active")},isSurfaceDisabled:function(){return Boolean(t.disabled)},isUnbounded:function(){return Boolean(t.unbounded)},registerDocumentInteractionHandler:function(t,e){return document.documentElement.addEventListener(t,e,c.applyPassive())},registerInteractionHandler:function(e,n){return t.root_.addEventListener(e,n,c.applyPassive())},registerResizeHandler:function(t){return window.addEventListener("resize",t)},removeClass:function(e){return t.root_.classList.remove(e)},updateCssVariable:function(e,n){return t.root_.style.setProperty(e,n)}}},Object.defineProperty(e.prototype,"unbounded",{get:function(){return Boolean(this.unbounded_)},set:function(t){this.unbounded_=Boolean(t),this.setUnbounded_()},enumerable:!0,configurable:!0}),e.prototype.activate=function(){this.foundation_.activate()},e.prototype.deactivate=function(){this.foundation_.deactivate()},e.prototype.layout=function(){this.foundation_.layout()},e.prototype.getDefaultFoundation=function(){return new a.MDCRippleFoundation(e.createAdapter(this))},e.prototype.initialSyncWithDOM=function(){var t=this.root_;this.unbounded="mdcRippleIsUnbounded"in t.dataset},e.prototype.setUnbounded_=function(){this.foundation_.setUnbounded(Boolean(this.unbounded_))},e}(o.MDCComponent);e.MDCRipple=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"};e.cssClasses=r;var i={CLOSED_EVENT:"MDCMenuSurface:closed",OPENED_EVENT:"MDCMenuSurface:opened",FOCUSABLE_ELEMENTS:["button:not(:disabled)",'[href]:not([aria-disabled="true"])',"input:not(:disabled)","select:not(:disabled)","textarea:not(:disabled)",'[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")};e.strings=i;var o={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67};e.numbers=o;var s;!function(t){t[t.BOTTOM=1]="BOTTOM",t[t.CENTER=2]="CENTER",t[t.RIGHT=4]="RIGHT",t[t.FLIP_RTL=8]="FLIP_RTL"}(s||(s={})),e.CornerBit=s;var a;!function(t){t[t.TOP_LEFT=0]="TOP_LEFT",t[t.TOP_RIGHT=4]="TOP_RIGHT",t[t.BOTTOM_LEFT=1]="BOTTOM_LEFT",t[t.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",t[t.TOP_START=8]="TOP_START",t[t.TOP_END=12]="TOP_END",t[t.BOTTOM_START=9]="BOTTOM_START",t[t.BOTTOM_END=13]="BOTTOM_END"}(a||(a={})),e.Corner=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={FIXED_CLASS:"mdc-top-app-bar--fixed",FIXED_SCROLLED_CLASS:"mdc-top-app-bar--fixed-scrolled",SHORT_CLASS:"mdc-top-app-bar--short",SHORT_COLLAPSED_CLASS:"mdc-top-app-bar--short-collapsed",SHORT_HAS_ACTION_ITEM_CLASS:"mdc-top-app-bar--short-has-action-item"};e.cssClasses=r;var i={DEBOUNCE_THROTTLE_RESIZE_TIME_MS:100,MAX_TOP_APP_BAR_HEIGHT:128};e.numbers=i;var o={ACTION_ITEM_SELECTOR:".mdc-top-app-bar__action-item",NAVIGATION_EVENT:"MDCTopAppBar:nav",NAVIGATION_ICON_SELECTOR:".mdc-top-app-bar__navigation-icon",ROOT_SELECTOR:".mdc-top-app-bar",TITLE_SELECTOR:".mdc-top-app-bar__title"};e.strings=o},function(t,e,n){"use strict";function r(t){return t instanceof Array}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var i=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__assign||function(){return o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},o.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),a=n(34),c=["input","button","textarea","select"],u=function(t){function e(n){var r=t.call(this,o({},e.defaultAdapter,n))||this;return r.wrapFocus_=!1,r.isVertical_=!0,r.isSingleSelectionList_=!1,r.selectedIndex_=-1,r.focusedItemIndex_=-1,r.useActivatedClass_=!1,r.isCheckboxList_=!1,r.isRadioList_=!1,r}return i(e,t),Object.defineProperty(e,"strings",{get:function(){return a.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return a.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClassForElementIndex:function(){},focusItemAtIndex:function(){},getFocusedElementIndex:function(){return 0},getListItemCount:function(){return 0},hasCheckboxAtIndex:function(){return!1},hasRadioAtIndex:function(){return!1},isCheckboxCheckedAtIndex:function(){return!1},isFocusInsideList:function(){return!1},notifyAction:function(){},removeClassForElementIndex:function(){},setAttributeForElementIndex:function(){},setCheckedCheckboxOrRadioAtIndex:function(){},setTabIndexForListItemChildren:function(){}}},enumerable:!0,configurable:!0}),e.prototype.layout=function(){0!==this.adapter_.getListItemCount()&&(this.adapter_.hasCheckboxAtIndex(0)?this.isCheckboxList_=!0:this.adapter_.hasRadioAtIndex(0)&&(this.isRadioList_=!0))},e.prototype.setWrapFocus=function(t){this.wrapFocus_=t},e.prototype.setVerticalOrientation=function(t){this.isVertical_=t},e.prototype.setSingleSelection=function(t){this.isSingleSelectionList_=t},e.prototype.setUseActivatedClass=function(t){this.useActivatedClass_=t},e.prototype.getSelectedIndex=function(){return this.selectedIndex_},e.prototype.setSelectedIndex=function(t){this.isIndexValid_(t)&&(this.isCheckboxList_?this.setCheckboxAtIndex_(t):this.isRadioList_?this.setRadioAtIndex_(t):this.setSingleSelectionAtIndex_(t))},e.prototype.handleFocusIn=function(t,e){e>=0&&this.adapter_.setTabIndexForListItemChildren(e,"0")},e.prototype.handleFocusOut=function(t,e){var n=this;e>=0&&this.adapter_.setTabIndexForListItemChildren(e,"-1"),setTimeout(function(){n.adapter_.isFocusInsideList()||n.setTabindexToFirstSelectedItem_()},0)},e.prototype.handleKeydown=function(t,e,n){var r="ArrowLeft"===t.key||37===t.keyCode,i="ArrowUp"===t.key||38===t.keyCode,o="ArrowRight"===t.key||39===t.keyCode,s="ArrowDown"===t.key||40===t.keyCode,a="Home"===t.key||36===t.keyCode,c="End"===t.key||35===t.keyCode,u="Enter"===t.key||13===t.keyCode,l="Space"===t.key||32===t.keyCode,d=this.adapter_.getFocusedElementIndex(),f=-1;if(!(-1===d&&(d=n)<0)){if(this.isVertical_&&s||!this.isVertical_&&o)this.preventDefaultEvent_(t),f=this.focusNextElement(d);else if(this.isVertical_&&i||!this.isVertical_&&r)this.preventDefaultEvent_(t),f=this.focusPrevElement(d);else if(a)this.preventDefaultEvent_(t),f=this.focusFirstElement();else if(c)this.preventDefaultEvent_(t),f=this.focusLastElement();else if((u||l)&&e){var p=t.target;if(p&&"A"===p.tagName&&u)return;this.preventDefaultEvent_(t),this.isSelectableList_()&&this.setSelectedIndexOnAction_(d),this.adapter_.notifyAction(d)}this.focusedItemIndex_=d,f>=0&&(this.setTabindexAtIndex_(f),this.focusedItemIndex_=f)}},e.prototype.handleClick=function(t,e){-1!==t&&(this.isSelectableList_()&&this.setSelectedIndexOnAction_(t,e),this.adapter_.notifyAction(t),this.setTabindexAtIndex_(t),this.focusedItemIndex_=t)},e.prototype.focusNextElement=function(t){var e=this.adapter_.getListItemCount(),n=t+1;if(n>=e){if(!this.wrapFocus_)return t;n=0}return this.adapter_.focusItemAtIndex(n),n},e.prototype.focusPrevElement=function(t){var e=t-1;if(e<0){if(!this.wrapFocus_)return t;e=this.adapter_.getListItemCount()-1}return this.adapter_.focusItemAtIndex(e),e},e.prototype.focusFirstElement=function(){return this.adapter_.focusItemAtIndex(0),0},e.prototype.focusLastElement=function(){var t=this.adapter_.getListItemCount()-1;return this.adapter_.focusItemAtIndex(t),t},e.prototype.preventDefaultEvent_=function(t){var e=t.target,n=(""+e.tagName).toLowerCase();-1===c.indexOf(n)&&t.preventDefault()},e.prototype.setSingleSelectionAtIndex_=function(t){var e=a.cssClasses.LIST_ITEM_SELECTED_CLASS;this.useActivatedClass_&&(e=a.cssClasses.LIST_ITEM_ACTIVATED_CLASS),this.selectedIndex_>=0&&this.selectedIndex_!==t&&(this.adapter_.removeClassForElementIndex(this.selectedIndex_,e),this.adapter_.setAttributeForElementIndex(this.selectedIndex_,a.strings.ARIA_SELECTED,"false")),this.adapter_.addClassForElementIndex(t,e),this.adapter_.setAttributeForElementIndex(t,a.strings.ARIA_SELECTED,"true"),this.selectedIndex_=t},e.prototype.setRadioAtIndex_=function(t){this.adapter_.setCheckedCheckboxOrRadioAtIndex(t,!0),this.selectedIndex_>=0&&this.adapter_.setAttributeForElementIndex(this.selectedIndex_,a.strings.ARIA_CHECKED,"false"),this.adapter_.setAttributeForElementIndex(t,a.strings.ARIA_CHECKED,"true"),this.selectedIndex_=t},e.prototype.setCheckboxAtIndex_=function(t){for(var e=0;e<this.adapter_.getListItemCount();e++){var n=!1;t.indexOf(e)>=0&&(n=!0),this.adapter_.setCheckedCheckboxOrRadioAtIndex(e,n),this.adapter_.setAttributeForElementIndex(e,a.strings.ARIA_CHECKED,n?"true":"false")}this.selectedIndex_=t},e.prototype.setTabindexAtIndex_=function(t){-1===this.focusedItemIndex_&&0!==t?this.adapter_.setAttributeForElementIndex(0,"tabindex","-1"):this.focusedItemIndex_>=0&&this.focusedItemIndex_!==t&&this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_,"tabindex","-1"),this.adapter_.setAttributeForElementIndex(t,"tabindex","0")},e.prototype.isSelectableList_=function(){return this.isSingleSelectionList_||this.isCheckboxList_||this.isRadioList_},e.prototype.setTabindexToFirstSelectedItem_=function(){var t=0;this.isSelectableList_()&&("number"==typeof this.selectedIndex_&&-1!==this.selectedIndex_?t=this.selectedIndex_:r(this.selectedIndex_)&&this.selectedIndex_.length>0&&(t=this.selectedIndex_.reduce(function(t,e){return Math.min(t,e)}))),this.setTabindexAtIndex_(t)},e.prototype.isIndexValid_=function(t){var e=this;if(t instanceof Array){if(!this.isCheckboxList_)throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");return 0===t.length||t.some(function(t){return e.isIndexInRange_(t)})}if("number"==typeof t){if(this.isCheckboxList_)throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+t);return this.isIndexInRange_(t)}return!1},e.prototype.isIndexInRange_=function(t){var e=this.adapter_.getListItemCount();return t>=0&&t<e},e.prototype.setSelectedIndexOnAction_=function(t,e){void 0===e&&(e=!0),this.isCheckboxList_?this.toggleCheckboxAtIndex_(t,e):this.setSelectedIndex(t)},e.prototype.toggleCheckboxAtIndex_=function(t,e){var n=this.adapter_.isCheckboxCheckedAtIndex(t);e&&(n=!n,this.adapter_.setCheckedCheckboxOrRadioAtIndex(t,n)),this.adapter_.setAttributeForElementIndex(t,a.strings.ARIA_CHECKED,n?"true":"false");var r=-1===this.selectedIndex_?[]:this.selectedIndex_.slice();n?r.push(t):r=r.filter(function(e){return e!==t}),this.selectedIndex_=r},e}(s.MDCFoundation);e.MDCListFoundation=u,e.default=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)},o=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),a=n(5),c=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.isOpen_=!1,r.isQuickOpen_=!1,r.isHoistedElement_=!1,r.isFixedPosition_=!1,r.openAnimationEndTimerId_=0,r.closeAnimationEndTimerId_=0,r.animationRequestId_=0,r.anchorCorner_=a.Corner.TOP_START,r.anchorMargin_={top:0,right:0,bottom:0,left:0},r.position_={x:0,y:0},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return a.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return a.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return a.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"Corner",{get:function(){return a.Corner},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isFirstElementFocused:function(){return!1},isLastElementFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},focusFirstElement:function(){},focusLastElement:function(){},notifyClose:function(){},notifyOpen:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=e.cssClasses,n=t.ROOT,r=t.OPEN;if(!this.adapter_.hasClass(n))throw new Error(n+" class required in root element.");this.adapter_.hasClass(r)&&(this.isOpen_=!0)},e.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId_),clearTimeout(this.closeAnimationEndTimerId_),cancelAnimationFrame(this.animationRequestId_)},e.prototype.setAnchorCorner=function(t){this.anchorCorner_=t},e.prototype.setAnchorMargin=function(t){this.anchorMargin_.top=t.top||0,this.anchorMargin_.right=t.right||0,this.anchorMargin_.bottom=t.bottom||0,this.anchorMargin_.left=t.left||0},e.prototype.setIsHoisted=function(t){this.isHoistedElement_=t},e.prototype.setFixedPosition=function(t){this.isFixedPosition_=t},e.prototype.setAbsolutePosition=function(t,e){this.position_.x=this.isFinite_(t)?t:0,this.position_.y=this.isFinite_(e)?e:0},e.prototype.setQuickOpen=function(t){this.isQuickOpen_=t},e.prototype.isOpen=function(){return this.isOpen_},e.prototype.open=function(){var t=this;this.adapter_.saveFocus(),this.isQuickOpen_||this.adapter_.addClass(e.cssClasses.ANIMATING_OPEN),this.animationRequestId_=requestAnimationFrame(function(){t.adapter_.addClass(e.cssClasses.OPEN),t.dimensions_=t.adapter_.getInnerDimensions(),t.autoPosition_(),t.isQuickOpen_?t.adapter_.notifyOpen():t.openAnimationEndTimerId_=setTimeout(function(){t.openAnimationEndTimerId_=0,t.adapter_.removeClass(e.cssClasses.ANIMATING_OPEN),t.adapter_.notifyOpen()},a.numbers.TRANSITION_OPEN_DURATION)}),this.isOpen_=!0},e.prototype.close=function(){var t=this;this.isQuickOpen_||this.adapter_.addClass(e.cssClasses.ANIMATING_CLOSED),requestAnimationFrame(function(){t.adapter_.removeClass(e.cssClasses.OPEN),t.isQuickOpen_?t.adapter_.notifyClose():t.closeAnimationEndTimerId_=setTimeout(function(){t.closeAnimationEndTimerId_=0,t.adapter_.removeClass(e.cssClasses.ANIMATING_CLOSED),t.adapter_.notifyClose()},a.numbers.TRANSITION_CLOSE_DURATION)}),this.isOpen_=!1,this.maybeRestoreFocus_()},e.prototype.handleBodyClick=function(t){var e=t.target;this.adapter_.isElementInContainer(e)||this.close()},e.prototype.handleKeydown=function(t){var e=t.keyCode,n=t.key,r=t.shiftKey,i="Escape"===n||27===e,o="Tab"===n||9===e;i?this.close():o&&(this.adapter_.isLastElementFocused()&&!r?(this.adapter_.focusFirstElement(),t.preventDefault()):this.adapter_.isFirstElementFocused()&&r&&(this.adapter_.focusLastElement(),t.preventDefault()))},e.prototype.autoPosition_=function(){var t;this.measurements_=this.getAutoLayoutMeasurements_();var e=this.getOriginCorner_(),n=this.getMenuSurfaceMaxHeight_(e),r=this.hasBit_(e,a.CornerBit.BOTTOM)?"bottom":"top",i=this.hasBit_(e,a.CornerBit.RIGHT)?"right":"left",o=this.getHorizontalOriginOffset_(e),s=this.getVerticalOriginOffset_(e),c=this.measurements_,u=c.anchorSize,l=c.surfaceSize,d=(t={},t[i]=o,t[r]=s,t);u.width/l.width>a.numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(i="center"),(this.isHoistedElement_||this.isFixedPosition_)&&this.adjustPositionForHoistedElement_(d),this.adapter_.setTransformOrigin(i+" "+r),this.adapter_.setPosition(d),this.adapter_.setMaxHeight(n?n+"px":"")},e.prototype.getAutoLayoutMeasurements_=function(){var t=this.adapter_.getAnchorDimensions(),e=this.adapter_.getBodyDimensions(),n=this.adapter_.getWindowDimensions(),r=this.adapter_.getWindowScroll();return t||(t={top:this.position_.y,right:this.position_.x,bottom:this.position_.y,left:this.position_.x,width:0,height:0}),{anchorSize:t,bodySize:e,surfaceSize:this.dimensions_,viewportDistance:{top:t.top,right:n.width-t.right,bottom:n.height-t.bottom,left:t.left},viewportSize:n,windowScroll:r}},e.prototype.getOriginCorner_=function(){var t=a.Corner.TOP_LEFT,e=this.measurements_,n=e.viewportDistance,r=e.anchorSize,i=e.surfaceSize,o=this.hasBit_(this.anchorCorner_,a.CornerBit.BOTTOM),s=o?n.top+r.height+this.anchorMargin_.bottom:n.top+this.anchorMargin_.top,c=o?n.bottom-this.anchorMargin_.bottom:n.bottom+r.height-this.anchorMargin_.top,u=i.height-s,l=i.height-c;l>0&&u<l&&(t=this.setBit_(t,a.CornerBit.BOTTOM));var d=this.adapter_.isRtl(),f=this.hasBit_(this.anchorCorner_,a.CornerBit.FLIP_RTL),p=this.hasBit_(this.anchorCorner_,a.CornerBit.RIGHT),_=p&&!d||!p&&f&&d,h=_?n.left+r.width+this.anchorMargin_.right:n.left+this.anchorMargin_.left,y=_?n.right-this.anchorMargin_.right:n.right+r.width-this.anchorMargin_.left,C=i.width-h,v=i.width-y;return(C<0&&_&&d||p&&!_&&C<0||v>0&&C<v)&&(t=this.setBit_(t,a.CornerBit.RIGHT)),t},e.prototype.getMenuSurfaceMaxHeight_=function(t){var n=this.measurements_.viewportDistance,r=0,i=this.hasBit_(t,a.CornerBit.BOTTOM),o=this.hasBit_(this.anchorCorner_,a.CornerBit.BOTTOM),s=e.numbers.MARGIN_TO_EDGE;return i?(r=n.top+this.anchorMargin_.top-s,o||(r+=this.measurements_.anchorSize.height)):(r=n.bottom-this.anchorMargin_.bottom+this.measurements_.anchorSize.height-s,o&&(r-=this.measurements_.anchorSize.height)),r},e.prototype.getHorizontalOriginOffset_=function(t){var e=this.measurements_.anchorSize,n=this.hasBit_(t,a.CornerBit.RIGHT),r=this.hasBit_(this.anchorCorner_,a.CornerBit.RIGHT);if(n){var i=r?e.width-this.anchorMargin_.left:this.anchorMargin_.right;return this.isHoistedElement_||this.isFixedPosition_?i-(this.measurements_.viewportSize.width-this.measurements_.bodySize.width):i}return r?e.width-this.anchorMargin_.right:this.anchorMargin_.left},e.prototype.getVerticalOriginOffset_=function(t){var e=this.measurements_.anchorSize,n=this.hasBit_(t,a.CornerBit.BOTTOM),r=this.hasBit_(this.anchorCorner_,a.CornerBit.BOTTOM);return n?r?e.height-this.anchorMargin_.top:-this.anchorMargin_.bottom:r?e.height+this.anchorMargin_.bottom:this.anchorMargin_.top},e.prototype.adjustPositionForHoistedElement_=function(t){var e,n,r=this.measurements_,i=r.windowScroll,s=r.viewportDistance,a=Object.keys(t);try{for(var c=o(a),u=c.next();!u.done;u=c.next()){var l=u.value,d=t[l]||0;d+=s[l],this.isFixedPosition_||("top"===l?d+=i.y:"bottom"===l?d-=i.y:"left"===l?d+=i.x:d-=i.x),t[l]=d}}catch(t){e={error:t}}finally{try{u&&!u.done&&(n=c.return)&&n.call(c)}finally{if(e)throw e.error}}},e.prototype.maybeRestoreFocus_=function(){var t=this.adapter_.isFocused(),e=document.activeElement&&this.adapter_.isElementInContainer(document.activeElement);(t||e)&&this.adapter_.restoreFocus()},e.prototype.hasBit_=function(t,e){return Boolean(t&e)},e.prototype.setBit_=function(t,e){return t|e},e.prototype.isFinite_=function(t){return"number"==typeof t&&isFinite(t)},e}(s.MDCFoundation);e.MDCMenuSurfaceFoundation=c,e.default=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(147),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){}}},enumerable:!0,configurable:!0}),e.prototype.computeContentClientRect=function(){return this.adapter_.computeContentClientRect()},e}(o.MDCFoundation);e.MDCTabIndicatorFoundation=a,e.default=a},function(t,e,n){"use strict";function r(t){return Boolean(t.document)&&"function"==typeof t.document.createElement}function i(t,e){if(r(t)&&e in s){var n=t.document.createElement("div"),i=s[e],o=i.standard,a=i.prefixed;return o in n.style?o:a}return e}function o(t,e){if(r(t)&&e in a){var n=t.document.createElement("div"),i=a[e],o=i.standard,s=i.prefixed;return i.cssProperty in n.style?o:s}return e}/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var s={animation:{prefixed:"-webkit-animation",standard:"animation"},transform:{prefixed:"-webkit-transform",standard:"transform"},transition:{prefixed:"-webkit-transition",standard:"transition"}},a={animationend:{cssProperty:"animation",prefixed:"webkitAnimationEnd",standard:"animationend"},animationiteration:{cssProperty:"animation",prefixed:"webkitAnimationIteration",standard:"animationiteration"},animationstart:{cssProperty:"animation",prefixed:"webkitAnimationStart",standard:"animationstart"},transitionend:{cssProperty:"transition",prefixed:"webkitTransitionEnd",standard:"transitionend"}};e.getCorrectPropertyName=i,e.getCorrectEventName=o},function(t,e,n){"use strict";function r(t,e){if(t.closest)return t.closest(e);for(var n=t;n;){if(i(n,e))return n;n=n.parentElement}return null}function i(t,e){return(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e)}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.closest=r,e.matches=i},function(t,e,n){"use strict";function r(t){var e=t.document,n=e.createElement("div");n.className="mdc-ripple-surface--test-edge-var-bug",e.body.appendChild(n);var r=t.getComputedStyle(n),i=null!==r&&"solid"===r.borderTopStyle;return n.remove(),i}function i(t,e){void 0===e&&(e=!1);var n=t.CSS,i=a;if("boolean"==typeof a&&!e)return a;if(!n||"function"!=typeof n.supports)return!1;var o=n.supports("--css-vars","yes"),s=n.supports("(--css-vars: yes)")&&n.supports("color","#00000000");return i=!(!o&&!s)&&!r(t),e||(a=i),i}function o(t,e){if(void 0===t&&(t=window),void 0===e&&(e=!1),void 0===c||e){var n=!1;try{t.document.addEventListener("test",function(){},{get passive(){return n=!0}})}catch(t){}c=n}return!!c&&{passive:!0}}function s(t,e,n){if(!t)return{x:0,y:0};var r,i,o=e.x,s=e.y,a=o+n.left,c=s+n.top;if("touchstart"===t.type){var u=t;r=u.changedTouches[0].pageX-a,i=u.changedTouches[0].pageY-c}else{var l=t;r=l.pageX-a,i=l.pageY-c}return{x:r,y:i}}Object.defineProperty(e,"__esModule",{value:!0});var a,c;e.supportsCssVariables=i,e.applyPassive=o,e.getNormalizedEventCoords=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(86),a=n(12),c=["touchstart","pointerdown","mousedown","keydown"],u=["touchend","pointerup","mouseup","contextmenu"],l=[],d=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.activationAnimationHasEnded_=!1,r.activationTimer_=0,r.fgDeactivationRemovalTimer_=0,r.fgScale_="0",r.frame_={width:0,height:0},r.initialSize_=0,r.layoutFrame_=0,r.maxRadius_=0,r.unboundedCoords_={left:0,top:0},r.activationState_=r.defaultActivationState_(),r.activationTimerCallback_=function(){r.activationAnimationHasEnded_=!0,r.runDeactivationUXLogicIfReady_()},r.activateHandler_=function(t){return r.activate_(t)},r.deactivateHandler_=function(){return r.deactivate_()},r.focusHandler_=function(){return r.handleFocus()},r.blurHandler_=function(){return r.handleBlur()},r.resizeHandler_=function(){return r.layout()},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this,n=this.supportsPressRipple_();if(this.registerRootHandlers_(n),n){var r=e.cssClasses,i=r.ROOT,o=r.UNBOUNDED;requestAnimationFrame(function(){t.adapter_.addClass(i),t.adapter_.isUnbounded()&&(t.adapter_.addClass(o),t.layoutInternal_())})}},e.prototype.destroy=function(){var t=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter_.removeClass(e.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter_.removeClass(e.cssClasses.FG_DEACTIVATION));var n=e.cssClasses,r=n.ROOT,i=n.UNBOUNDED;requestAnimationFrame(function(){t.adapter_.removeClass(r),t.adapter_.removeClass(i),t.removeCssVars_()})}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},e.prototype.activate=function(t){this.activate_(t)},e.prototype.deactivate=function(){this.deactivate_()},e.prototype.layout=function(){var t=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){t.layoutInternal_(),t.layoutFrame_=0})},e.prototype.setUnbounded=function(t){var n=e.cssClasses.UNBOUNDED;t?this.adapter_.addClass(n):this.adapter_.removeClass(n)},e.prototype.handleFocus=function(){var t=this;requestAnimationFrame(function(){return t.adapter_.addClass(e.cssClasses.BG_FOCUSED)})},e.prototype.handleBlur=function(){var t=this;requestAnimationFrame(function(){return t.adapter_.removeClass(e.cssClasses.BG_FOCUSED)})},e.prototype.supportsPressRipple_=function(){return this.adapter_.browserSupportsCssVars()},e.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},e.prototype.registerRootHandlers_=function(t){var e=this;t&&(c.forEach(function(t){e.adapter_.registerInteractionHandler(t,e.activateHandler_)}),this.adapter_.isUnbounded()&&this.adapter_.registerResizeHandler(this.resizeHandler_)),this.adapter_.registerInteractionHandler("focus",this.focusHandler_),this.adapter_.registerInteractionHandler("blur",this.blurHandler_)},e.prototype.registerDeactivationHandlers_=function(t){var e=this;"keydown"===t.type?this.adapter_.registerInteractionHandler("keyup",this.deactivateHandler_):u.forEach(function(t){e.adapter_.registerDocumentInteractionHandler(t,e.deactivateHandler_)})},e.prototype.deregisterRootHandlers_=function(){var t=this;c.forEach(function(e){t.adapter_.deregisterInteractionHandler(e,t.activateHandler_)}),this.adapter_.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter_.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter_.isUnbounded()&&this.adapter_.deregisterResizeHandler(this.resizeHandler_)},e.prototype.deregisterDeactivationHandlers_=function(){var t=this;this.adapter_.deregisterInteractionHandler("keyup",this.deactivateHandler_),u.forEach(function(e){t.adapter_.deregisterDocumentInteractionHandler(e,t.deactivateHandler_)})},e.prototype.removeCssVars_=function(){var t=this,n=e.strings;Object.keys(n).forEach(function(e){0===e.indexOf("VAR_")&&t.adapter_.updateCssVariable(n[e],null)})},e.prototype.activate_=function(t){var e=this;if(!this.adapter_.isSurfaceDisabled()){var n=this.activationState_;if(!n.isActivated){var r=this.previousActivationEvent_;if(!(r&&void 0!==t&&r.type!==t.type)){n.isActivated=!0,n.isProgrammatic=void 0===t,n.activationEvent=t,n.wasActivatedByPointer=!n.isProgrammatic&&(void 0!==t&&("mousedown"===t.type||"touchstart"===t.type||"pointerdown"===t.type));if(void 0!==t&&l.length>0&&l.some(function(t){return e.adapter_.containsEventTarget(t)}))return void this.resetActivationState_();void 0!==t&&(l.push(t.target),this.registerDeactivationHandlers_(t)),n.wasElementMadeActive=this.checkElementMadeActive_(t),n.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame(function(){l=[],n.wasElementMadeActive||void 0===t||" "!==t.key&&32!==t.keyCode||(n.wasElementMadeActive=e.checkElementMadeActive_(t),n.wasElementMadeActive&&e.animateActivation_()),n.wasElementMadeActive||(e.activationState_=e.defaultActivationState_())})}}}},e.prototype.checkElementMadeActive_=function(t){return void 0===t||"keydown"!==t.type||this.adapter_.isSurfaceActive()},e.prototype.animateActivation_=function(){var t=this,n=e.strings,r=n.VAR_FG_TRANSLATE_START,i=n.VAR_FG_TRANSLATE_END,o=e.cssClasses,s=o.FG_DEACTIVATION,a=o.FG_ACTIVATION,c=e.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var u="",l="";if(!this.adapter_.isUnbounded()){var d=this.getFgTranslationCoordinates_(),f=d.startPoint,p=d.endPoint;u=f.x+"px, "+f.y+"px",l=p.x+"px, "+p.y+"px"}this.adapter_.updateCssVariable(r,u),this.adapter_.updateCssVariable(i,l),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter_.removeClass(s),this.adapter_.computeBoundingRect(),this.adapter_.addClass(a),this.activationTimer_=setTimeout(function(){return t.activationTimerCallback_()},c)},e.prototype.getFgTranslationCoordinates_=function(){var t,e=this.activationState_,n=e.activationEvent,r=e.wasActivatedByPointer;return t=r?a.getNormalizedEventCoords(n,this.adapter_.getWindowPageOffset(),this.adapter_.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2},t={x:t.x-this.initialSize_/2,y:t.y-this.initialSize_/2},{startPoint:t,endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},e.prototype.runDeactivationUXLogicIfReady_=function(){var t=this,n=e.cssClasses.FG_DEACTIVATION,r=this.activationState_,i=r.hasDeactivationUXRun,o=r.isActivated;(i||!o)&&this.activationAnimationHasEnded_&&(this.rmBoundedActivationClasses_(),this.adapter_.addClass(n),this.fgDeactivationRemovalTimer_=setTimeout(function(){t.adapter_.removeClass(n)},s.numbers.FG_DEACTIVATION_MS))},e.prototype.rmBoundedActivationClasses_=function(){var t=e.cssClasses.FG_ACTIVATION;this.adapter_.removeClass(t),this.activationAnimationHasEnded_=!1,this.adapter_.computeBoundingRect()},e.prototype.resetActivationState_=function(){var t=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout(function(){return t.previousActivationEvent_=void 0},e.numbers.TAP_DELAY_MS)},e.prototype.deactivate_=function(){var t=this,e=this.activationState_;if(e.isActivated){var n=i({},e);e.isProgrammatic?(requestAnimationFrame(function(){return t.animateDeactivation_(n)}),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame(function(){t.activationState_.hasDeactivationUXRun=!0,t.animateDeactivation_(n),t.resetActivationState_()}))}},e.prototype.animateDeactivation_=function(t){var e=t.wasActivatedByPointer,n=t.wasElementMadeActive;(e||n)&&this.runDeactivationUXLogicIfReady_()},e.prototype.layoutInternal_=function(){var t=this;this.frame_=this.adapter_.computeBoundingRect();var n=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter_.isUnbounded()?n:function(){return Math.sqrt(Math.pow(t.frame_.width,2)+Math.pow(t.frame_.height,2))+e.numbers.PADDING}(),this.initialSize_=Math.floor(n*e.numbers.INITIAL_ORIGIN_SCALE),this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},e.prototype.updateLayoutCssVars_=function(){var t=e.strings,n=t.VAR_FG_SIZE,r=t.VAR_LEFT,i=t.VAR_TOP,o=t.VAR_FG_SCALE;this.adapter_.updateCssVariable(n,this.initialSize_+"px"),this.adapter_.updateCssVariable(o,this.fgScale_),this.adapter_.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter_.updateCssVariable(r,this.unboundedCoords_.left+"px"),this.adapter_.updateCssVariable(i,this.unboundedCoords_.top+"px"))},e}(o.MDCFoundation);e.MDCRippleFoundation=d,e.default=d},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(103),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.animationFrame_=0,r.animationTimer_=0,r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},elementHasClass:function(){return!1},notifyClose:function(){},notifyOpen:function(){},saveFocus:function(){},restoreFocus:function(){},focusActiveNavigationItem:function(){},trapFocus:function(){},releaseFocus:function(){}}},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.animationFrame_&&cancelAnimationFrame(this.animationFrame_),this.animationTimer_&&clearTimeout(this.animationTimer_)},e.prototype.open=function(){var t=this;this.isOpen()||this.isOpening()||this.isClosing()||(this.adapter_.addClass(s.cssClasses.OPEN),this.adapter_.addClass(s.cssClasses.ANIMATE),this.runNextAnimationFrame_(function(){t.adapter_.addClass(s.cssClasses.OPENING)}),this.adapter_.saveFocus())},e.prototype.close=function(){!this.isOpen()||this.isOpening()||this.isClosing()||this.adapter_.addClass(s.cssClasses.CLOSING)},e.prototype.isOpen=function(){return this.adapter_.hasClass(s.cssClasses.OPEN)},e.prototype.isOpening=function(){return this.adapter_.hasClass(s.cssClasses.OPENING)||this.adapter_.hasClass(s.cssClasses.ANIMATE)},e.prototype.isClosing=function(){return this.adapter_.hasClass(s.cssClasses.CLOSING)},e.prototype.handleKeydown=function(t){var e=t.keyCode;("Escape"===t.key||27===e)&&this.close()},e.prototype.handleTransitionEnd=function(t){var e=s.cssClasses.OPENING,n=s.cssClasses.CLOSING,r=s.cssClasses.OPEN,i=s.cssClasses.ANIMATE,o=s.cssClasses.ROOT;this.isElement_(t.target)&&this.adapter_.elementHasClass(t.target,o)&&(this.isClosing()?(this.adapter_.removeClass(r),this.closed_(),this.adapter_.restoreFocus(),this.adapter_.notifyClose()):(this.adapter_.focusActiveNavigationItem(),this.opened_(),this.adapter_.notifyOpen()),this.adapter_.removeClass(i),this.adapter_.removeClass(e),this.adapter_.removeClass(n))},e.prototype.opened_=function(){},e.prototype.closed_=function(){},e.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},e.prototype.isElement_=function(t){return Boolean(t.classList)},e}(o.MDCFoundation);e.MDCDismissibleDrawerFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(104)),r(n(16))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(105),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.shakeAnimationEndHandler_=function(){return r.handleShakeAnimationEnd_()},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.adapter_.registerInteractionHandler("animationend",this.shakeAnimationEndHandler_)},e.prototype.destroy=function(){this.adapter_.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler_)},e.prototype.getWidth=function(){return this.adapter_.getWidth()},e.prototype.shake=function(t){var n=e.cssClasses.LABEL_SHAKE;t?this.adapter_.addClass(n):this.adapter_.removeClass(n)},e.prototype.float=function(t){var n=e.cssClasses,r=n.LABEL_FLOAT_ABOVE,i=n.LABEL_SHAKE;t?this.adapter_.addClass(r):(this.adapter_.removeClass(r),this.adapter_.removeClass(i))},e.prototype.handleShakeAnimationEnd_=function(){var t=e.cssClasses.LABEL_SHAKE;this.adapter_.removeClass(t)},e}(o.MDCFoundation);e.MDCFloatingLabelFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(115)),r(n(39))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={MENU_SELECTED_LIST_ITEM:"mdc-menu-item--selected",MENU_SELECTION_GROUP:"mdc-menu__selection-group",ROOT:"mdc-menu"};e.cssClasses=r;var i={ARIA_SELECTED_ATTR:"aria-selected",CHECKBOX_SELECTOR:'input[type="checkbox"]',LIST_SELECTOR:".mdc-list",SELECTED_EVENT:"MDCMenu:selected"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(122)),r(n(47))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={CLOSING:"mdc-snackbar--closing",OPEN:"mdc-snackbar--open",OPENING:"mdc-snackbar--opening"};e.cssClasses=r;var i={ACTION_SELECTOR:".mdc-snackbar__action",ARIA_LIVE_LABEL_TEXT_ATTR:"data-mdc-snackbar-label-text",CLOSED_EVENT:"MDCSnackbar:closed",CLOSING_EVENT:"MDCSnackbar:closing",DISMISS_SELECTOR:".mdc-snackbar__dismiss",LABEL_SELECTOR:".mdc-snackbar__label",OPENED_EVENT:"MDCSnackbar:opened",OPENING_EVENT:"MDCSnackbar:opening",REASON_ACTION:"action",REASON_DISMISS:"dismiss",SURFACE_SELECTOR:".mdc-snackbar__surface"};e.strings=i;var o={DEFAULT_AUTO_DISMISS_TIMEOUT_MS:5e3,MAX_AUTO_DISMISS_TIMEOUT_MS:1e4,MIN_AUTO_DISMISS_TIMEOUT_MS:4e3,SNACKBAR_ANIMATION_CLOSE_TIME_MS:75,SNACKBAR_ANIMATION_OPEN_TIME_MS:150,ARIA_LIVE_DELAY_MS:1e3};e.numbers=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.adapter_=t}return t}();e.MDCTabScrollerRTL=r,e.default=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(6),o=n(23),s=0,a=function(t){function e(e){var n=t.call(this,e)||this;return n.wasDocked_=!0,n.isDockedShowing_=!0,n.currentAppBarOffsetTop_=0,n.isCurrentlyBeingResized_=!1,n.resizeThrottleId_=s,n.resizeDebounceId_=s,n.lastScrollPosition_=n.adapter_.getViewportScrollY(),n.topAppBarHeight_=n.adapter_.getTopAppBarHeight(),n.scrollHandler_=function(){return n.topAppBarScrollHandler_()},n.resizeHandler_=function(){return n.topAppBarResizeHandler_()},n}return r(e,t),e.prototype.destroy=function(){t.prototype.destroy.call(this),this.adapter_.setStyle("top","")},e.prototype.checkForUpdate_=function(){var t=-this.topAppBarHeight_,e=this.currentAppBarOffsetTop_<0,n=this.currentAppBarOffsetTop_>t,r=e&&n;if(r)this.wasDocked_=!1;else{if(!this.wasDocked_)return this.wasDocked_=!0,!0;if(this.isDockedShowing_!==n)return this.isDockedShowing_=n,!0}return r},e.prototype.moveTopAppBar_=function(){if(this.checkForUpdate_()){var t=this.currentAppBarOffsetTop_;Math.abs(t)>=this.topAppBarHeight_&&(t=-i.numbers.MAX_TOP_APP_BAR_HEIGHT),this.adapter_.setStyle("top",t+"px")}},e.prototype.topAppBarScrollHandler_=function(){var t=Math.max(this.adapter_.getViewportScrollY(),0),e=t-this.lastScrollPosition_;this.lastScrollPosition_=t,this.isCurrentlyBeingResized_||(this.currentAppBarOffsetTop_-=e,this.currentAppBarOffsetTop_>0?this.currentAppBarOffsetTop_=0:Math.abs(this.currentAppBarOffsetTop_)>this.topAppBarHeight_&&(this.currentAppBarOffsetTop_=-this.topAppBarHeight_),this.moveTopAppBar_())},e.prototype.topAppBarResizeHandler_=function(){var t=this;this.resizeThrottleId_||(this.resizeThrottleId_=setTimeout(function(){t.resizeThrottleId_=s,t.throttledResizeHandler_()},i.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),this.isCurrentlyBeingResized_=!0,this.resizeDebounceId_&&clearTimeout(this.resizeDebounceId_),this.resizeDebounceId_=setTimeout(function(){t.topAppBarScrollHandler_(),t.isCurrentlyBeingResized_=!1,t.resizeDebounceId_=s},i.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)},e.prototype.throttledResizeHandler_=function(){var t=this.adapter_.getTopAppBarHeight();this.topAppBarHeight_!==t&&(this.wasDocked_=!1,this.currentAppBarOffsetTop_-=this.topAppBarHeight_-t,this.topAppBarHeight_=t),this.topAppBarScrollHandler_()},e}(o.MDCTopAppBarBaseFoundation);e.MDCTopAppBarFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(6),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.navClickHandler_=function(){return r.adapter_.notifyNavigationIconClicked()},r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},getTopAppBarHeight:function(){return 0},registerNavigationIconInteractionHandler:function(){},deregisterNavigationIconInteractionHandler:function(){},notifyNavigationIconClicked:function(){},registerScrollHandler:function(){},deregisterScrollHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},getViewportScrollY:function(){return 0},getTotalActionItems:function(){return 0}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.initScrollHandler(),this.initResizeHandler_(),this.adapter_.registerNavigationIconInteractionHandler("click",this.navClickHandler_)},e.prototype.destroy=function(){this.destroyScrollHandler(),this.destroyResizeHandler_(),this.adapter_.deregisterNavigationIconInteractionHandler("click",this.navClickHandler_)},e.prototype.initScrollHandler=function(){this.scrollHandler_&&this.adapter_.registerScrollHandler(this.scrollHandler_)},e.prototype.destroyScrollHandler=function(){this.scrollHandler_&&this.adapter_.deregisterScrollHandler(this.scrollHandler_)},e.prototype.initResizeHandler_=function(){this.resizeHandler_&&this.adapter_.registerResizeHandler(this.resizeHandler_)},e.prototype.destroyResizeHandler_=function(){this.resizeHandler_&&this.adapter_.deregisterResizeHandler(this.resizeHandler_)},e}(o.MDCFoundation);e.MDCTopAppBarBaseFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(87),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.currentCheckState_=s.strings.TRANSITION_STATE_INIT,r.currentAnimationClass_="",r.animEndLatchTimer_=0,r.enableAnimationEndHandler_=!1,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},forceLayout:function(){},hasNativeControl:function(){return!1},isAttachedToDOM:function(){return!1},isChecked:function(){return!1},isIndeterminate:function(){return!1},removeClass:function(){},removeNativeControlAttr:function(){},setNativeControlAttr:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.currentCheckState_=this.determineCheckState_(),this.updateAriaChecked_(),this.adapter_.addClass(s.cssClasses.UPGRADED)},e.prototype.destroy=function(){clearTimeout(this.animEndLatchTimer_)},e.prototype.setDisabled=function(t){this.adapter_.setNativeControlDisabled(t),t?this.adapter_.addClass(s.cssClasses.DISABLED):this.adapter_.removeClass(s.cssClasses.DISABLED)},e.prototype.handleAnimationEnd=function(){var t=this;this.enableAnimationEndHandler_&&(clearTimeout(this.animEndLatchTimer_),this.animEndLatchTimer_=setTimeout(function(){t.adapter_.removeClass(t.currentAnimationClass_),t.enableAnimationEndHandler_=!1},s.numbers.ANIM_END_LATCH_MS))},e.prototype.handleChange=function(){this.transitionCheckState_()},e.prototype.transitionCheckState_=function(){if(this.adapter_.hasNativeControl()){var t=this.currentCheckState_,e=this.determineCheckState_();t!==e&&(this.updateAriaChecked_(),this.currentAnimationClass_.length>0&&(clearTimeout(this.animEndLatchTimer_),this.adapter_.forceLayout(),this.adapter_.removeClass(this.currentAnimationClass_)),this.currentAnimationClass_=this.getTransitionAnimationClass_(t,e),this.currentCheckState_=e,this.adapter_.isAttachedToDOM()&&this.currentAnimationClass_.length>0&&(this.adapter_.addClass(this.currentAnimationClass_),this.enableAnimationEndHandler_=!0))}},e.prototype.determineCheckState_=function(){var t=s.strings.TRANSITION_STATE_INDETERMINATE,e=s.strings.TRANSITION_STATE_CHECKED,n=s.strings.TRANSITION_STATE_UNCHECKED;return this.adapter_.isIndeterminate()?t:this.adapter_.isChecked()?e:n},e.prototype.getTransitionAnimationClass_=function(t,n){var r=s.strings.TRANSITION_STATE_INIT,i=s.strings.TRANSITION_STATE_CHECKED,o=s.strings.TRANSITION_STATE_UNCHECKED,a=e.cssClasses,c=a.ANIM_UNCHECKED_CHECKED,u=a.ANIM_UNCHECKED_INDETERMINATE,l=a.ANIM_CHECKED_UNCHECKED,d=a.ANIM_CHECKED_INDETERMINATE,f=a.ANIM_INDETERMINATE_CHECKED,p=a.ANIM_INDETERMINATE_UNCHECKED;switch(t){case r:return n===o?"":n===i?f:p;case o:return n===i?c:u;case i:return n===o?l:d;default:return n===i?f:p}},e.prototype.updateAriaChecked_=function(){this.adapter_.isIndeterminate()?this.adapter_.setNativeControlAttr(s.strings.ARIA_CHECKED_ATTR,s.strings.ARIA_CHECKED_INDETERMINATE_VALUE):this.adapter_.removeNativeControlAttr(s.strings.ARIA_CHECKED_ATTR)},e}(o.MDCFoundation);e.MDCCheckboxFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(89)),r(n(27))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.strings={CHECKMARK_SELECTOR:".mdc-chip__checkmark",ENTRY_ANIMATION_NAME:"mdc-chip-entry",INTERACTION_EVENT:"MDCChip:interaction",LEADING_ICON_SELECTOR:".mdc-chip__icon--leading",REMOVAL_EVENT:"MDCChip:removal",SELECTION_EVENT:"MDCChip:selection",TRAILING_ICON_INTERACTION_EVENT:"MDCChip:trailingIconInteraction",TRAILING_ICON_SELECTOR:".mdc-chip__icon--trailing"},e.cssClasses={CHECKMARK:"mdc-chip__checkmark",CHIP_EXIT:"mdc-chip--exit",HIDDEN_LEADING_ICON:"mdc-chip__icon--leading-hidden",LEADING_ICON:"mdc-chip__icon--leading",SELECTED:"mdc-chip--selected",TRAILING_ICON:"mdc-chip__icon--trailing"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(26),a={bottom:0,height:0,left:0,right:0,top:0,width:0},c=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.shouldRemoveOnTrailingIconClick_=!0,r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},addClassToLeadingIcon:function(){},eventTargetHasClass:function(){return!1},getCheckmarkBoundingClientRect:function(){return a},getComputedStyleValue:function(){return""},getRootBoundingClientRect:function(){return a},hasClass:function(){return!1},hasLeadingIcon:function(){return!1},notifyInteraction:function(){},notifyRemoval:function(){},notifySelection:function(){},notifyTrailingIconInteraction:function(){},removeClass:function(){},removeClassFromLeadingIcon:function(){},setStyleProperty:function(){}}},enumerable:!0,configurable:!0}),e.prototype.isSelected=function(){return this.adapter_.hasClass(s.cssClasses.SELECTED)},e.prototype.setSelected=function(t){t?this.adapter_.addClass(s.cssClasses.SELECTED):this.adapter_.removeClass(s.cssClasses.SELECTED),this.adapter_.notifySelection(t)},e.prototype.getShouldRemoveOnTrailingIconClick=function(){return this.shouldRemoveOnTrailingIconClick_},e.prototype.setShouldRemoveOnTrailingIconClick=function(t){this.shouldRemoveOnTrailingIconClick_=t},e.prototype.getDimensions=function(){var t=this,e=function(){return t.adapter_.getRootBoundingClientRect()};if(!this.adapter_.hasLeadingIcon()){var n=function(){return t.adapter_.getCheckmarkBoundingClientRect()}();if(n){var r=e(),o=r.height,s=n.height,a=r.width+s;return i({},r,{width:a,height:o})}}return e()},e.prototype.beginExit=function(){this.adapter_.addClass(s.cssClasses.CHIP_EXIT)},e.prototype.handleInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;("click"===t.type||e)&&this.adapter_.notifyInteraction()},e.prototype.handleTransitionEnd=function(t){var e=this;if(this.adapter_.eventTargetHasClass(t.target,s.cssClasses.CHIP_EXIT)){if("width"===t.propertyName)this.adapter_.notifyRemoval();else if("opacity"===t.propertyName){var n=this.adapter_.getComputedStyleValue("width");requestAnimationFrame(function(){e.adapter_.setStyleProperty("width",n),e.adapter_.setStyleProperty("padding","0"),e.adapter_.setStyleProperty("margin","0"),requestAnimationFrame(function(){e.adapter_.setStyleProperty("width","0")})})}}else"opacity"===t.propertyName&&(this.adapter_.eventTargetHasClass(t.target,s.cssClasses.LEADING_ICON)&&this.adapter_.hasClass(s.cssClasses.SELECTED)?this.adapter_.addClassToLeadingIcon(s.cssClasses.HIDDEN_LEADING_ICON):this.adapter_.eventTargetHasClass(t.target,s.cssClasses.CHECKMARK)&&!this.adapter_.hasClass(s.cssClasses.SELECTED)&&this.adapter_.removeClassFromLeadingIcon(s.cssClasses.HIDDEN_LEADING_ICON))},e.prototype.handleTrailingIconInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;t.stopPropagation(),("click"===t.type||e)&&(this.adapter_.notifyTrailingIconInteraction(),this.shouldRemoveOnTrailingIconClick_&&this.beginExit())},e}(o.MDCFoundation);e.MDCChipFoundation=c,e.default=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(92),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.selectedChipIds_=[],r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{hasClass:function(){return!1},removeChip:function(){},setSelected:function(){}}},enumerable:!0,configurable:!0}),e.prototype.getSelectedChipIds=function(){return this.selectedChipIds_.slice()},e.prototype.select=function(t){if(!(this.selectedChipIds_.indexOf(t)>=0)){if(this.adapter_.hasClass(s.cssClasses.CHOICE)&&this.selectedChipIds_.length>0){var e=this.selectedChipIds_[0];this.selectedChipIds_.length=0,this.adapter_.setSelected(e,!1)}this.selectedChipIds_.push(t),this.adapter_.setSelected(t,!0)}},e.prototype.handleChipInteraction=function(t){(this.adapter_.hasClass(s.cssClasses.CHOICE)||this.adapter_.hasClass(s.cssClasses.FILTER))&&this.toggleSelect_(t)},e.prototype.handleChipSelection=function(t,e){var n=this.selectedChipIds_.indexOf(t)>=0;e&&!n?this.select(t):!e&&n&&this.deselect_(t)},e.prototype.handleChipRemoval=function(t){this.deselect_(t),this.adapter_.removeChip(t)},e.prototype.deselect_=function(t){var e=this.selectedChipIds_.indexOf(t);e>=0&&(this.selectedChipIds_.splice(e,1),this.adapter_.setSelected(t,!1))},e.prototype.toggleSelect_=function(t){this.selectedChipIds_.indexOf(t)>=0?this.deselect_(t):this.select(t)},e}(o.MDCFoundation);e.MDCChipSetFoundation=a,e.default=a},function(t,e,n){"use strict";function r(t,e,n){return void 0===e&&(e=a.default),e(t,{clickOutsideDeactivates:!0,escapeDeactivates:!1,initialFocus:n})}function i(t){return!!t&&t.scrollHeight>t.offsetHeight}function o(t){var e=new Set;return[].forEach.call(t,function(t){return e.add(t.offsetTop)}),e.size>1}/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=s(n(94));e.createFocusTrapInstance=r,e.isScrollable=i,e.areTopsMisaligned=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(98),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.isOpen_=!1,r.animationFrame_=0,r.animationTimer_=0,r.layoutFrame_=0,r.escapeKeyAction_=s.strings.CLOSE_ACTION,r.scrimClickAction_=s.strings.CLOSE_ACTION,r.autoStackButtons_=!0,r.areButtonsStacked_=!1,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addBodyClass:function(){},addClass:function(){},areButtonsStacked:function(){return!1},clickDefaultButton:function(){},eventTargetMatches:function(){return!1},getActionFromEvent:function(){return""},hasClass:function(){return!1},isContentScrollable:function(){return!1},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},releaseFocus:function(){},removeBodyClass:function(){},removeClass:function(){},reverseButtons:function(){},trapFocus:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.adapter_.hasClass(s.cssClasses.STACKED)&&this.setAutoStackButtons(!1)},e.prototype.destroy=function(){this.isOpen_&&this.close(s.strings.DESTROY_ACTION),this.animationTimer_&&(clearTimeout(this.animationTimer_),this.handleAnimationTimerEnd_()),this.layoutFrame_&&(cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=0)},e.prototype.open=function(){var t=this;this.isOpen_=!0,this.adapter_.notifyOpening(),this.adapter_.addClass(s.cssClasses.OPENING),this.runNextAnimationFrame_(function(){t.adapter_.addClass(s.cssClasses.OPEN),t.adapter_.addBodyClass(s.cssClasses.SCROLL_LOCK),t.layout(),t.animationTimer_=setTimeout(function(){t.handleAnimationTimerEnd_(),t.adapter_.trapFocus(),t.adapter_.notifyOpened()},s.numbers.DIALOG_ANIMATION_OPEN_TIME_MS)})},e.prototype.close=function(t){var e=this;void 0===t&&(t=""),this.isOpen_&&(this.isOpen_=!1,this.adapter_.notifyClosing(t),this.adapter_.addClass(s.cssClasses.CLOSING),this.adapter_.removeClass(s.cssClasses.OPEN),this.adapter_.removeBodyClass(s.cssClasses.SCROLL_LOCK),cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,clearTimeout(this.animationTimer_),this.animationTimer_=setTimeout(function(){e.adapter_.releaseFocus(),e.handleAnimationTimerEnd_(),e.adapter_.notifyClosed(t)},s.numbers.DIALOG_ANIMATION_CLOSE_TIME_MS))},e.prototype.isOpen=function(){return this.isOpen_},e.prototype.getEscapeKeyAction=function(){return this.escapeKeyAction_},e.prototype.setEscapeKeyAction=function(t){this.escapeKeyAction_=t},e.prototype.getScrimClickAction=function(){return this.scrimClickAction_},e.prototype.setScrimClickAction=function(t){this.scrimClickAction_=t},e.prototype.getAutoStackButtons=function(){return this.autoStackButtons_},e.prototype.setAutoStackButtons=function(t){this.autoStackButtons_=t},e.prototype.layout=function(){var t=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){t.layoutInternal_(),t.layoutFrame_=0})},e.prototype.handleInteraction=function(t){var e="click"===t.type,n="Enter"===t.key||13===t.keyCode,r="Space"===t.key||32===t.keyCode,i=this.adapter_.eventTargetMatches(t.target,s.strings.SCRIM_SELECTOR),o=!this.adapter_.eventTargetMatches(t.target,s.strings.SUPPRESS_DEFAULT_PRESS_SELECTOR);if(e&&i&&""!==this.scrimClickAction_)this.close(this.scrimClickAction_);else if(e||r||n){var a=this.adapter_.getActionFromEvent(t);a?this.close(a):n&&o&&this.adapter_.clickDefaultButton()}},e.prototype.handleDocumentKeydown=function(t){("Escape"===t.key||27===t.keyCode)&&""!==this.escapeKeyAction_&&this.close(this.escapeKeyAction_)},e.prototype.layoutInternal_=function(){this.autoStackButtons_&&this.detectStackedButtons_(),this.detectScrollableContent_()},e.prototype.handleAnimationTimerEnd_=function(){this.animationTimer_=0,this.adapter_.removeClass(s.cssClasses.OPENING),this.adapter_.removeClass(s.cssClasses.CLOSING)},e.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},e.prototype.detectStackedButtons_=function(){this.adapter_.removeClass(s.cssClasses.STACKED);var t=this.adapter_.areButtonsStacked();t&&this.adapter_.addClass(s.cssClasses.STACKED),t!==this.areButtonsStacked_&&(this.adapter_.reverseButtons(),this.areButtonsStacked_=t)},e.prototype.detectScrollableContent_=function(){this.adapter_.removeClass(s.cssClasses.SCROLLABLE),this.adapter_.isContentScrollable()&&this.adapter_.addClass(s.cssClasses.SCROLLABLE)},e}(o.MDCFoundation);e.MDCDialogFoundation=a,e.default=a},function(t,e,n){"use strict";function r(t,e){return void 0===e&&(e=o.default),e(t,{clickOutsideDeactivates:!0,escapeDeactivates:!1,initialFocus:void 0,returnFocusOnDeactivate:!1})}/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(32));e.createFocusTrapInstance=r},function(t,e,n){function r(t,e){function n(t){if(!S.active){b(),S.active=!0,S.paused=!1,S.nodeFocusedBeforeActivation=T.activeElement;var e=t&&t.onActivate?t.onActivate:I.onActivate;return e&&e(),p(),L}}function r(t){if(S.active){_(),S.active=!1,S.paused=!1,l.deactivateTrap(L);var e=t&&void 0!==t.onDeactivate?t.onDeactivate:I.onDeactivate;e&&e();return(t&&void 0!==t.returnFocus?t.returnFocus:I.returnFocusOnDeactivate)&&a(function(){O(S.nodeFocusedBeforeActivation)}),L}}function d(){!S.paused&&S.active&&(S.paused=!0,_())}function f(){S.paused&&S.active&&(S.paused=!1,p())}function p(){if(S.active)return l.activateTrap(L),b(),a(function(){O(y())}),T.addEventListener("focusin",v,!0),T.addEventListener("mousedown",C,!0),T.addEventListener("touchstart",C,!0),T.addEventListener("click",E,!0),T.addEventListener("keydown",m,!0),L}function _(){if(S.active)return T.removeEventListener("focusin",v,!0),T.removeEventListener("mousedown",C,!0),T.removeEventListener("touchstart",C,!0),T.removeEventListener("click",E,!0),T.removeEventListener("keydown",m,!0),L}function h(t){var e=I[t],n=e;if(!e)return null;if("string"==typeof e&&!(n=T.querySelector(e)))throw new Error("`"+t+"` refers to no known node");if("function"==typeof e&&!(n=e()))throw new Error("`"+t+"` did not return a node");return n}function y(){var t;if(!(t=null!==h("initialFocus")?h("initialFocus"):A.contains(T.activeElement)?T.activeElement:S.firstTabbableNode||h("fallbackFocus")))throw new Error("You can't have a focus-trap without at least one focusable element");return t}function C(t){A.contains(t.target)||(I.clickOutsideDeactivates?r({returnFocus:!c.isFocusable(t.target)}):t.preventDefault())}function v(t){A.contains(t.target)||t.target instanceof Document||(t.stopImmediatePropagation(),O(S.mostRecentlyFocusedNode||y()))}function m(t){return!1!==I.escapeDeactivates&&o(t)?(t.preventDefault(),void r()):s(t)?void g(t):void 0}function g(t){return b(),t.shiftKey&&t.target===S.firstTabbableNode?(t.preventDefault(),void O(S.lastTabbableNode)):t.shiftKey||t.target!==S.lastTabbableNode?void 0:(t.preventDefault(),void O(S.firstTabbableNode))}function E(t){I.clickOutsideDeactivates||A.contains(t.target)||(t.preventDefault(),t.stopImmediatePropagation())}function b(){var t=c(A);S.firstTabbableNode=t[0]||y(),S.lastTabbableNode=t[t.length-1]||y()}function O(t){if(t!==T.activeElement){if(!t||!t.focus)return void O(y());t.focus(),S.mostRecentlyFocusedNode=t,i(t)&&t.select()}}var T=document,A="string"==typeof t?T.querySelector(t):t,I=u({returnFocusOnDeactivate:!0,escapeDeactivates:!0},e),S={firstTabbableNode:null,lastTabbableNode:null,nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1},L={activate:n,deactivate:r,pause:d,unpause:f};return L}function i(t){return t.tagName&&"input"===t.tagName.toLowerCase()&&"function"==typeof t.select}function o(t){return"Escape"===t.key||"Esc"===t.key||27===t.keyCode}function s(t){return"Tab"===t.key||9===t.keyCode}function a(t){return setTimeout(t,0)}var c=n(100),u=n(101),l=function(){var t=[];return{activateTrap:function(e){if(t.length>0){var n=t[t.length-1];n!==e&&n.pause()}var r=t.indexOf(e);-1===r?t.push(e):(t.splice(r,1),t.push(e))},deactivateTrap:function(e){var n=t.indexOf(e);-1!==n&&t.splice(n,1),t.length>0&&t[t.length-1].unpause()}}}();t.exports=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(2),s=n(34),a=n(7),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),Object.defineProperty(e.prototype,"vertical",{set:function(t){this.foundation_.setVerticalOrientation(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"listElements",{get:function(){return[].slice.call(this.root_.querySelectorAll(s.strings.ENABLED_ITEMS_SELECTOR))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"wrapFocus",{set:function(t){this.foundation_.setWrapFocus(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"singleSelection",{set:function(t){this.foundation_.setSingleSelection(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selectedIndex",{get:function(){return this.foundation_.getSelectedIndex()},set:function(t){this.foundation_.setSelectedIndex(t)},enumerable:!0,configurable:!0}),e.attachTo=function(t){return new e(t)},e.prototype.initialSyncWithDOM=function(){this.handleClick_=this.handleClickEvent_.bind(this),this.handleKeydown_=this.handleKeydownEvent_.bind(this),this.focusInEventListener_=this.handleFocusInEvent_.bind(this),this.focusOutEventListener_=this.handleFocusOutEvent_.bind(this),this.listen("keydown",this.handleKeydown_),this.listen("click",this.handleClick_),this.listen("focusin",this.focusInEventListener_),this.listen("focusout",this.focusOutEventListener_),this.layout(),this.initializeListType()},e.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown_),this.unlisten("click",this.handleClick_),this.unlisten("focusin",this.focusInEventListener_),this.unlisten("focusout",this.focusOutEventListener_)},e.prototype.layout=function(){var t=this.root_.getAttribute(s.strings.ARIA_ORIENTATION);this.vertical=t!==s.strings.ARIA_ORIENTATION_HORIZONTAL,[].slice.call(this.root_.querySelectorAll(".mdc-list-item:not([tabindex])")).forEach(function(t){t.setAttribute("tabindex","-1")}),[].slice.call(this.root_.querySelectorAll(s.strings.FOCUSABLE_CHILD_ELEMENTS)).forEach(function(t){return t.setAttribute("tabindex","-1")}),this.foundation_.layout()},e.prototype.initializeListType=function(){var t=this,e=this.root_.querySelectorAll(s.strings.ARIA_ROLE_CHECKBOX_SELECTOR),n=this.root_.querySelector("\n      ."+s.cssClasses.LIST_ITEM_ACTIVATED_CLASS+",\n      ."+s.cssClasses.LIST_ITEM_SELECTED_CLASS+"\n    "),r=this.root_.querySelector(s.strings.ARIA_CHECKED_RADIO_SELECTOR);if(e.length){var i=this.root_.querySelectorAll(s.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);this.selectedIndex=[].map.call(i,function(e){return t.listElements.indexOf(e)})}else n?(n.classList.contains(s.cssClasses.LIST_ITEM_ACTIVATED_CLASS)&&this.foundation_.setUseActivatedClass(!0),this.singleSelection=!0,this.selectedIndex=this.listElements.indexOf(n)):r&&(this.selectedIndex=this.listElements.indexOf(r))},e.prototype.getDefaultFoundation=function(){var t=this,e={addClassForElementIndex:function(e,n){var r=t.listElements[e];r&&r.classList.add(n)},focusItemAtIndex:function(e){var n=t.listElements[e];n&&n.focus()},getFocusedElementIndex:function(){return t.listElements.indexOf(document.activeElement)},getListItemCount:function(){return t.listElements.length},hasCheckboxAtIndex:function(e){return!!t.listElements[e].querySelector(s.strings.CHECKBOX_SELECTOR)},hasRadioAtIndex:function(e){return!!t.listElements[e].querySelector(s.strings.RADIO_SELECTOR)},isCheckboxCheckedAtIndex:function(e){return t.listElements[e].querySelector(s.strings.CHECKBOX_SELECTOR).checked},isFocusInsideList:function(){return t.root_.contains(document.activeElement)},notifyAction:function(e){t.emit(s.strings.ACTION_EVENT,{index:e},!0)},removeClassForElementIndex:function(e,n){var r=t.listElements[e];r&&r.classList.remove(n)},setAttributeForElementIndex:function(e,n,r){var i=t.listElements[e];i&&i.setAttribute(n,r)},setCheckedCheckboxOrRadioAtIndex:function(e,n){var r=t.listElements[e],i=r.querySelector(s.strings.CHECKBOX_RADIO_SELECTOR);i.checked=n;var o=document.createEvent("Event");o.initEvent("change",!0,!0),i.dispatchEvent(o)},setTabIndexForListItemChildren:function(e,n){var r=t.listElements[e];[].slice.call(r.querySelectorAll(s.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX)).forEach(function(t){return t.setAttribute("tabindex",n)})}};return new a.MDCListFoundation(e)},e.prototype.getListItemIndex_=function(t){var e=t.target,n=o.ponyfill.closest(e,"."+s.cssClasses.LIST_ITEM_CLASS+", ."+s.cssClasses.ROOT);return n&&o.ponyfill.matches(n,"."+s.cssClasses.LIST_ITEM_CLASS)?this.listElements.indexOf(n):-1},e.prototype.handleFocusInEvent_=function(t){var e=this.getListItemIndex_(t);this.foundation_.handleFocusIn(t,e)},e.prototype.handleFocusOutEvent_=function(t){var e=this.getListItemIndex_(t);this.foundation_.handleFocusOut(t,e)},e.prototype.handleKeydownEvent_=function(t){var e=this.getListItemIndex_(t),n=t.target;e>=0&&this.foundation_.handleKeydown(t,n.classList.contains(s.cssClasses.LIST_ITEM_CLASS),e)},e.prototype.handleClickEvent_=function(t){var e=this.getListItemIndex_(t),n=t.target,r=!o.ponyfill.matches(n,s.strings.CHECKBOX_RADIO_SELECTOR);this.foundation_.handleClick(e,r)},e}(i.MDCComponent);e.MDCList=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={LIST_ITEM_ACTIVATED_CLASS:"mdc-list-item--activated",LIST_ITEM_CLASS:"mdc-list-item",LIST_ITEM_SELECTED_CLASS:"mdc-list-item--selected",ROOT:"mdc-list"};e.cssClasses=r;var i={ACTION_EVENT:"MDCList:action",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',CHECKBOX_SELECTOR:'input[type="checkbox"]:not(:disabled)',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    ."+r.LIST_ITEM_CLASS+" button:not(:disabled),\n    ."+r.LIST_ITEM_CLASS+" a\n  ",ENABLED_ITEMS_SELECTOR:".mdc-list-item:not(.mdc-list-item--disabled)",FOCUSABLE_CHILD_ELEMENTS:"\n    ."+r.LIST_ITEM_CLASS+" button:not(:disabled),\n    ."+r.LIST_ITEM_CLASS+" a,\n    ."+r.LIST_ITEM_CLASS+' input[type="radio"]:not(:disabled),\n    .'+r.LIST_ITEM_CLASS+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]:not(:disabled)'};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(14),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.handleScrimClick=function(){this.close()},e.prototype.opened_=function(){this.adapter_.trapFocus()},e.prototype.closed_=function(){this.adapter_.releaseFocus()},e}(i.MDCDismissibleDrawerFoundation);e.MDCModalDrawerFoundation=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(108),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.clickHandler_=function(){return r.handleClick_()},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{activateInputRipple:function(){},deactivateInputRipple:function(){},deregisterInteractionHandler:function(){},registerInteractionHandler:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.adapter_.registerInteractionHandler("click",this.clickHandler_)},e.prototype.destroy=function(){this.adapter_.deregisterInteractionHandler("click",this.clickHandler_)},e.prototype.handleClick_=function(){var t=this;this.adapter_.activateInputRipple(),requestAnimationFrame(function(){return t.adapter_.deactivateInputRipple()})},e}(o.MDCFoundation);e.MDCFormFieldFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(111),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.resizeFrame_=0,r.resizeHandler_=r.alignCenter.bind(r),r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{deregisterResizeHandler:function(){},getNumberOfTiles:function(){return 0},getOffsetWidth:function(){return 0},getOffsetWidthForTileAtIndex:function(){return 0},registerResizeHandler:function(){},setStyleForTilesElement:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.alignCenter(),this.adapter_.registerResizeHandler(this.resizeHandler_)},e.prototype.destroy=function(){this.adapter_.deregisterResizeHandler(this.resizeHandler_)},e.prototype.alignCenter=function(){var t=this;cancelAnimationFrame(this.resizeFrame_),this.resizeFrame_=requestAnimationFrame(function(){t.alignCenter_(),t.resizeFrame_=0})},e.prototype.alignCenter_=function(){if(0!==this.adapter_.getNumberOfTiles()){var t=this.adapter_.getOffsetWidth(),e=this.adapter_.getOffsetWidthForTileAtIndex(0),n=e*Math.floor(t/e);this.adapter_.setStyleForTilesElement("width",n+"px")}},e}(o.MDCFoundation);e.MDCGridListFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(114),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},hasClass:function(){return!1},notifyChange:function(){},removeClass:function(){},setAttr:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.adapter_.setAttr(s.strings.ARIA_PRESSED,""+this.isOn())},e.prototype.handleClick=function(){this.toggle(),this.adapter_.notifyChange({isOn:this.isOn()})},e.prototype.isOn=function(){return this.adapter_.hasClass(s.cssClasses.ICON_BUTTON_ON)},e.prototype.toggle=function(t){void 0===t&&(t=!this.isOn()),t?this.adapter_.addClass(s.cssClasses.ICON_BUTTON_ON):this.adapter_.removeClass(s.cssClasses.ICON_BUTTON_ON),this.adapter_.setAttr(s.strings.ARIA_PRESSED,""+t)},e}(o.MDCFoundation);e.MDCIconButtonToggleFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(116),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.transitionEndHandler_=function(t){return r.handleTransitionEnd(t)},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.adapter_.registerEventHandler("transitionend",this.transitionEndHandler_)},e.prototype.destroy=function(){this.adapter_.deregisterEventHandler("transitionend",this.transitionEndHandler_)},e.prototype.activate=function(){this.adapter_.removeClass(s.cssClasses.LINE_RIPPLE_DEACTIVATING),this.adapter_.addClass(s.cssClasses.LINE_RIPPLE_ACTIVE)},e.prototype.setRippleCenter=function(t){this.adapter_.setStyle("transform-origin",t+"px center")},e.prototype.deactivate=function(){this.adapter_.addClass(s.cssClasses.LINE_RIPPLE_DEACTIVATING)},e.prototype.handleTransitionEnd=function(t){var e=this.adapter_.hasClass(s.cssClasses.LINE_RIPPLE_DEACTIVATING);"opacity"===t.propertyName&&e&&(this.adapter_.removeClass(s.cssClasses.LINE_RIPPLE_ACTIVE),this.adapter_.removeClass(s.cssClasses.LINE_RIPPLE_DEACTIVATING))},e}(o.MDCFoundation);e.MDCLineRippleFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(10),s=n(0),a=n(119),c=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return a.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return a.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},getBuffer:function(){return null},getPrimaryBar:function(){return null},hasClass:function(){return!1},removeClass:function(){},setStyle:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){this.isDeterminate_=!this.adapter_.hasClass(a.cssClasses.INDETERMINATE_CLASS),this.isReversed_=this.adapter_.hasClass(a.cssClasses.REVERSED_CLASS),this.progress_=0},e.prototype.setDeterminate=function(t){this.isDeterminate_=t,this.isDeterminate_?(this.adapter_.removeClass(a.cssClasses.INDETERMINATE_CLASS),this.setScale_(this.adapter_.getPrimaryBar(),this.progress_)):(this.adapter_.addClass(a.cssClasses.INDETERMINATE_CLASS),this.setScale_(this.adapter_.getPrimaryBar(),1),this.setScale_(this.adapter_.getBuffer(),1))},e.prototype.setProgress=function(t){this.progress_=t,this.isDeterminate_&&this.setScale_(this.adapter_.getPrimaryBar(),t)},e.prototype.setBuffer=function(t){this.isDeterminate_&&this.setScale_(this.adapter_.getBuffer(),t)},e.prototype.setReverse=function(t){this.isReversed_=t,this.isReversed_?this.adapter_.addClass(a.cssClasses.REVERSED_CLASS):this.adapter_.removeClass(a.cssClasses.REVERSED_CLASS)},e.prototype.open=function(){this.adapter_.removeClass(a.cssClasses.CLOSED_CLASS)},e.prototype.close=function(){this.adapter_.addClass(a.cssClasses.CLOSED_CLASS)},e.prototype.setScale_=function(t,e){if(t){var n="scaleX("+e+")";this.adapter_.setStyle(t,o.getCorrectPropertyName(window,"transform"),n)}},e}(s.MDCFoundation);e.MDCLinearProgressFoundation=c,e.default=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(33)),r(n(7))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(43));e.util=o;var s=n(5);e.Corner=s.Corner,e.CornerBit=s.CornerBit,r(n(120)),r(n(8))},function(t,e,n){"use strict";function r(t,e){if(void 0===e&&(e=!1),void 0===i||e){var n=t.document.createElement("div");i="transform"in n.style?"transform":"webkitTransform"}return i}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var i;e.getTransformPropertyName=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0});var i=n(5);e.Corner=i.Corner,r(n(121)),r(n(45))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(7),a=n(8),c=n(18),u=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.closeAnimationEndTimerId_=0,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClassToElementAtIndex:function(){},removeClassFromElementAtIndex:function(){},addAttributeToElementAtIndex:function(){},removeAttributeFromElementAtIndex:function(){},elementContainsClass:function(){return!1},closeSurface:function(){},getElementIndex:function(){return-1},getParentElement:function(){return null},getSelectedElementIndex:function(){return-1},notifySelected:function(){}}},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.closeAnimationEndTimerId_&&clearTimeout(this.closeAnimationEndTimerId_),this.adapter_.closeSurface()},e.prototype.handleKeydown=function(t){var e=t.key,n=t.keyCode;("Tab"===e||9===n)&&this.adapter_.closeSurface()},e.prototype.handleItemAction=function(t){var e=this,n=this.adapter_.getElementIndex(t);n<0||(this.adapter_.notifySelected({index:n}),this.adapter_.closeSurface(),this.closeAnimationEndTimerId_=setTimeout(function(){var r=e.getSelectionGroup_(t);r&&e.handleSelectionGroup_(r,n)},a.MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION))},e.prototype.handleSelectionGroup_=function(t,e){var n=this.adapter_.getSelectedElementIndex(t);n>=0&&(this.adapter_.removeAttributeFromElementAtIndex(n,c.strings.ARIA_SELECTED_ATTR),this.adapter_.removeClassFromElementAtIndex(n,c.cssClasses.MENU_SELECTED_LIST_ITEM)),this.adapter_.addClassToElementAtIndex(e,c.cssClasses.MENU_SELECTED_LIST_ITEM),this.adapter_.addAttributeToElementAtIndex(e,c.strings.ARIA_SELECTED_ATTR,"true")},e.prototype.getSelectionGroup_=function(t){var e=this.adapter_.getParentElement(t);if(!e)return null;for(var n=this.adapter_.elementContainsClass(e,c.cssClasses.MENU_SELECTION_GROUP);!n&&e&&!this.adapter_.elementContainsClass(e,s.MDCListFoundation.cssClasses.ROOT);)e=this.adapter_.getParentElement(e),n=!!e&&this.adapter_.elementContainsClass(e,c.cssClasses.MENU_SELECTION_GROUP);return n?e:null},e}(o.MDCFoundation);e.MDCMenuFoundation=u,e.default=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={NOTCH_ELEMENT_SELECTOR:".mdc-notched-outline__notch"};e.strings=r;var i={NOTCH_ELEMENT_PADDING:8};e.numbers=i;var o={NO_LABEL:"mdc-notched-outline--no-label",OUTLINE_NOTCHED:"mdc-notched-outline--notched",OUTLINE_UPGRADED:"mdc-notched-outline--upgraded"};e.cssClasses=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(46),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNotchWidthProperty:function(){},removeNotchWidthProperty:function(){}}},enumerable:!0,configurable:!0}),e.prototype.notch=function(t){var n=e.cssClasses.OUTLINE_NOTCHED;t>0&&(t+=s.numbers.NOTCH_ELEMENT_PADDING),this.adapter_.setNotchWidthProperty(t),this.adapter_.addClass(n)},e.prototype.closeNotch=function(){var t=e.cssClasses.OUTLINE_NOTCHED;this.adapter_.removeClass(t),this.adapter_.removeNotchWidthProperty()},e}(o.MDCFoundation);e.MDCNotchedOutlineFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(125),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setDisabled=function(t){var n=e.cssClasses.DISABLED;this.adapter_.setNativeControlDisabled(t),t?this.adapter_.addClass(n):this.adapter_.removeClass(n)},e}(o.MDCFoundation);e.MDCRadioFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={DISABLED:"mdc-select--disabled",FOCUSED:"mdc-select--focused",INVALID:"mdc-select--invalid",OUTLINED:"mdc-select--outlined",REQUIRED:"mdc-select--required",ROOT:"mdc-select",SELECTED_ITEM_CLASS:"mdc-list-item--selected",WITH_LEADING_ICON:"mdc-select--with-leading-icon"};e.cssClasses=r;var i={ARIA_CONTROLS:"aria-controls",ARIA_SELECTED_ATTR:"aria-selected",CHANGE_EVENT:"MDCSelect:change",ENHANCED_VALUE_ATTR:"data-value",HIDDEN_INPUT_SELECTOR:'input[type="hidden"]',LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-select__icon",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",MENU_SELECTOR:".mdc-select__menu",NATIVE_CONTROL_SELECTOR:".mdc-select__native-control",OUTLINE_SELECTOR:".mdc-notched-outline",SELECTED_ITEM_SELECTOR:"."+r.SELECTED_ITEM_CLASS,SELECTED_TEXT_SELECTOR:".mdc-select__selected-text"};e.strings=i;var o={LABEL_SCALE:.75};e.numbers=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(49),a=function(t){function e(n,r){void 0===r&&(r={});var o=t.call(this,i({},e.defaultAdapter,n))||this;return o.leadingIcon_=r.leadingIcon,o.helperText_=r.helperText,o}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},activateBottomLine:function(){},deactivateBottomLine:function(){},setValue:function(){},getValue:function(){return""},floatLabel:function(){},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){},openMenu:function(){},closeMenu:function(){},isMenuOpen:function(){return!1},setSelectedIndex:function(){},setDisabled:function(){},setRippleCenter:function(){},notifyChange:function(){},checkValidity:function(){return!1},setValid:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setSelectedIndex=function(t){this.adapter_.setSelectedIndex(t),this.adapter_.closeMenu();this.handleChange(!0)},e.prototype.setValue=function(t){this.adapter_.setValue(t);this.handleChange(!0)},e.prototype.getValue=function(){return this.adapter_.getValue()},e.prototype.setDisabled=function(t){t?this.adapter_.addClass(s.cssClasses.DISABLED):this.adapter_.removeClass(s.cssClasses.DISABLED),this.adapter_.setDisabled(t),this.adapter_.closeMenu(),this.leadingIcon_&&this.leadingIcon_.setDisabled(t)},e.prototype.setHelperTextContent=function(t){this.helperText_&&this.helperText_.setContent(t)},e.prototype.layout=function(){var t=this.getValue().length>0;this.notchOutline(t)},e.prototype.handleChange=function(t){void 0===t&&(t=!0);var e=this.getValue(),n=e.length>0,r=this.adapter_.hasClass(s.cssClasses.REQUIRED);this.notchOutline(n),this.adapter_.hasClass(s.cssClasses.FOCUSED)||this.adapter_.floatLabel(n),t&&(this.adapter_.notifyChange(e),r&&(this.setValid(this.isValid()),this.helperText_&&this.helperText_.setValidity(this.isValid())))},e.prototype.handleFocus=function(){this.adapter_.addClass(s.cssClasses.FOCUSED),this.adapter_.floatLabel(!0),this.notchOutline(!0),this.adapter_.activateBottomLine(),this.helperText_&&this.helperText_.showToScreenReader()},e.prototype.handleBlur=function(){if(!this.adapter_.isMenuOpen()){this.adapter_.removeClass(s.cssClasses.FOCUSED),this.handleChange(!1),this.adapter_.deactivateBottomLine();this.adapter_.hasClass(s.cssClasses.REQUIRED)&&(this.setValid(this.isValid()),this.helperText_&&this.helperText_.setValidity(this.isValid()))}},e.prototype.handleClick=function(t){this.adapter_.isMenuOpen()||(this.adapter_.setRippleCenter(t),this.adapter_.openMenu())},e.prototype.handleKeydown=function(t){if(!this.adapter_.isMenuOpen()){var e="Enter"===t.key||13===t.keyCode,n="Space"===t.key||32===t.keyCode,r="ArrowUp"===t.key||38===t.keyCode,i="ArrowDown"===t.key||40===t.keyCode;this.adapter_.hasClass(s.cssClasses.FOCUSED)&&(e||n||r||i)&&(this.adapter_.openMenu(),t.preventDefault())}},e.prototype.notchOutline=function(t){if(this.adapter_.hasOutline()){var e=this.adapter_.hasClass(s.cssClasses.FOCUSED);if(t){var n=s.numbers.LABEL_SCALE,r=this.adapter_.getLabelWidth()*n;this.adapter_.notchOutline(r)}else e||this.adapter_.closeOutline()}},e.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon_&&this.leadingIcon_.setAriaLabel(t)},e.prototype.setLeadingIconContent=function(t){this.leadingIcon_&&this.leadingIcon_.setContent(t)},e.prototype.setValid=function(t){this.adapter_.setValid(t)},e.prototype.isValid=function(){return this.adapter_.checkValidity()},e}(o.MDCFoundation);e.MDCSelectFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(128)),r(n(52))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(129),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},removeAttr:function(){},setContent:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setContent=function(t){this.adapter_.setContent(t)},e.prototype.setPersistent=function(t){t?this.adapter_.addClass(s.cssClasses.HELPER_TEXT_PERSISTENT):this.adapter_.removeClass(s.cssClasses.HELPER_TEXT_PERSISTENT)},e.prototype.setValidation=function(t){t?this.adapter_.addClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG):this.adapter_.removeClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG)},e.prototype.showToScreenReader=function(){this.adapter_.removeAttr(s.strings.ARIA_HIDDEN)},e.prototype.setValidity=function(t){var e=this.adapter_.hasClass(s.cssClasses.HELPER_TEXT_PERSISTENT),n=this.adapter_.hasClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG),r=n&&!t;r?this.adapter_.setAttr(s.strings.ROLE,"alert"):this.adapter_.removeAttr(s.strings.ROLE),e||r||this.hide_()},e.prototype.hide_=function(){this.adapter_.setAttr(s.strings.ARIA_HIDDEN,"true")},e}(o.MDCFoundation);e.MDCSelectHelperTextFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(130)),r(n(54))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(131),a=["click","keydown"],c=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.savedTabIndex_=null,r.interactionHandler_=function(t){return r.handleInteraction(t)},r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{getAttr:function(){return null},setAttr:function(){},removeAttr:function(){},setContent:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},notifyIconAction:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this;this.savedTabIndex_=this.adapter_.getAttr("tabindex"),a.forEach(function(e){t.adapter_.registerInteractionHandler(e,t.interactionHandler_)})},e.prototype.destroy=function(){var t=this;a.forEach(function(e){t.adapter_.deregisterInteractionHandler(e,t.interactionHandler_)})},e.prototype.setDisabled=function(t){this.savedTabIndex_&&(t?(this.adapter_.setAttr("tabindex","-1"),this.adapter_.removeAttr("role")):(this.adapter_.setAttr("tabindex",this.savedTabIndex_),this.adapter_.setAttr("role",s.strings.ICON_ROLE)))},e.prototype.setAriaLabel=function(t){this.adapter_.setAttr("aria-label",t)},e.prototype.setContent=function(t){this.adapter_.setContent(t)},e.prototype.handleInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;("click"===t.type||e)&&this.adapter_.notifyIconAction()},e}(o.MDCFoundation);e.MDCSelectIconFoundation=c,e.default=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ACTIVE:"mdc-slider--active",DISABLED:"mdc-slider--disabled",DISCRETE:"mdc-slider--discrete",FOCUS:"mdc-slider--focus",HAS_TRACK_MARKER:"mdc-slider--display-markers",IN_TRANSIT:"mdc-slider--in-transit",IS_DISCRETE:"mdc-slider--discrete"};e.cssClasses=r;var i={ARIA_DISABLED:"aria-disabled",ARIA_VALUEMAX:"aria-valuemax",ARIA_VALUEMIN:"aria-valuemin",ARIA_VALUENOW:"aria-valuenow",CHANGE_EVENT:"MDCSlider:change",INPUT_EVENT:"MDCSlider:input",LAST_TRACK_MARKER_SELECTOR:".mdc-slider__track-marker:last-child",PIN_VALUE_MARKER_SELECTOR:".mdc-slider__pin-value-marker",STEP_DATA_ATTR:"data-step",THUMB_CONTAINER_SELECTOR:".mdc-slider__thumb-container",TRACK_MARKER_CONTAINER_SELECTOR:".mdc-slider__track-marker-container",TRACK_SELECTOR:".mdc-slider__track"};e.strings=i;var o={PAGE_FACTOR:4};e.numbers=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(10),s=n(0),a=n(55),c=["mousedown","pointerdown","touchstart"],u=["mouseup","pointerup","touchend"],l={mousedown:"mousemove",pointerdown:"pointermove",touchstart:"touchmove"},d={ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight",ARROW_UP:"ArrowUp",END:"End",HOME:"Home",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp"},f=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.savedTabIndex_=NaN,r.active_=!1,r.inTransit_=!1,r.isDiscrete_=!1,r.hasTrackMarker_=!1,r.handlingThumbTargetEvt_=!1,r.min_=0,r.max_=100,r.step_=0,r.value_=0,r.disabled_=!1,r.preventFocusState_=!1,r.thumbContainerPointerHandler_=function(){return r.handlingThumbTargetEvt_=!0},r.interactionStartHandler_=function(t){return r.handleDown_(t)},r.keydownHandler_=function(t){return r.handleKeydown_(t)},r.focusHandler_=function(){return r.handleFocus_()},r.blurHandler_=function(){return r.handleBlur_()},r.resizeHandler_=function(){return r.layout()},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return a.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return a.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return a.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{hasClass:function(){return!1},addClass:function(){},removeClass:function(){},getAttribute:function(){return null},setAttribute:function(){},removeAttribute:function(){},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabIndex:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerThumbContainerInteractionHandler:function(){},deregisterThumbContainerInteractionHandler:function(){},registerBodyInteractionHandler:function(){},deregisterBodyInteractionHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},notifyInput:function(){},notifyChange:function(){},setThumbContainerStyleProperty:function(){},setTrackStyleProperty:function(){},setMarkerValue:function(){},appendTrackMarkers:function(){},removeTrackMarkers:function(){},setLastTrackMarkersStyleProperty:function(){},isRTL:function(){return!1}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this;this.isDiscrete_=this.adapter_.hasClass(a.cssClasses.IS_DISCRETE),this.hasTrackMarker_=this.adapter_.hasClass(a.cssClasses.HAS_TRACK_MARKER),c.forEach(function(e){t.adapter_.registerInteractionHandler(e,t.interactionStartHandler_),t.adapter_.registerThumbContainerInteractionHandler(e,t.thumbContainerPointerHandler_)}),this.adapter_.registerInteractionHandler("keydown",this.keydownHandler_),this.adapter_.registerInteractionHandler("focus",this.focusHandler_),this.adapter_.registerInteractionHandler("blur",this.blurHandler_),this.adapter_.registerResizeHandler(this.resizeHandler_),this.layout(),this.isDiscrete_&&0===this.getStep()&&(this.step_=1)},e.prototype.destroy=function(){var t=this;c.forEach(function(e){t.adapter_.deregisterInteractionHandler(e,t.interactionStartHandler_),t.adapter_.deregisterThumbContainerInteractionHandler(e,t.thumbContainerPointerHandler_)}),this.adapter_.deregisterInteractionHandler("keydown",this.keydownHandler_),this.adapter_.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter_.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter_.deregisterResizeHandler(this.resizeHandler_)},e.prototype.setupTrackMarker=function(){if(this.isDiscrete_&&this.hasTrackMarker_&&0!==this.getStep()){var t=this.getMin(),e=this.getMax(),n=this.getStep(),r=(e-t)/n,i=Math.ceil(r)!==r;if(i&&(r=Math.ceil(r)),this.adapter_.removeTrackMarkers(),this.adapter_.appendTrackMarkers(r),i){var o=(e-r*n)/n+1;this.adapter_.setLastTrackMarkersStyleProperty("flex-grow",String(o))}}},e.prototype.layout=function(){this.rect_=this.adapter_.computeBoundingRect(),this.updateUIForCurrentValue_()},e.prototype.getValue=function(){return this.value_},e.prototype.setValue=function(t){this.setValue_(t,!1)},e.prototype.getMax=function(){return this.max_},e.prototype.setMax=function(t){if(t<this.min_)throw new Error("Cannot set max to be less than the slider's minimum value");this.max_=t,this.setValue_(this.value_,!1,!0),this.adapter_.setAttribute(a.strings.ARIA_VALUEMAX,String(this.max_)),this.setupTrackMarker()},e.prototype.getMin=function(){return this.min_},e.prototype.setMin=function(t){if(t>this.max_)throw new Error("Cannot set min to be greater than the slider's maximum value");this.min_=t,this.setValue_(this.value_,!1,!0),this.adapter_.setAttribute(a.strings.ARIA_VALUEMIN,String(this.min_)),this.setupTrackMarker()},e.prototype.getStep=function(){return this.step_},e.prototype.setStep=function(t){if(t<0)throw new Error("Step cannot be set to a negative number");this.isDiscrete_&&("number"!=typeof t||t<1)&&(t=1),this.step_=t,this.setValue_(this.value_,!1,!0),this.setupTrackMarker()},e.prototype.isDisabled=function(){return this.disabled_},e.prototype.setDisabled=function(t){this.disabled_=t,this.toggleClass_(a.cssClasses.DISABLED,this.disabled_),this.disabled_?(this.savedTabIndex_=this.adapter_.getTabIndex(),this.adapter_.setAttribute(a.strings.ARIA_DISABLED,"true"),this.adapter_.removeAttribute("tabindex")):(this.adapter_.removeAttribute(a.strings.ARIA_DISABLED),isNaN(this.savedTabIndex_)||this.adapter_.setAttribute("tabindex",String(this.savedTabIndex_)))},e.prototype.handleDown_=function(t){var e=this;if(!this.disabled_){this.preventFocusState_=!0,this.setInTransit_(!this.handlingThumbTargetEvt_),this.handlingThumbTargetEvt_=!1,this.setActive_(!0);var n=function(t){e.handleMove_(t)},r=l[t.type],i=function t(){e.handleUp_(),e.adapter_.deregisterBodyInteractionHandler(r,n),u.forEach(function(n){return e.adapter_.deregisterBodyInteractionHandler(n,t)})};this.adapter_.registerBodyInteractionHandler(r,n),u.forEach(function(t){return e.adapter_.registerBodyInteractionHandler(t,i)}),this.setValueFromEvt_(t)}},e.prototype.handleMove_=function(t){t.preventDefault(),this.setValueFromEvt_(t)},e.prototype.handleUp_=function(){this.setActive_(!1),this.adapter_.notifyChange()},e.prototype.getPageX_=function(t){return t.targetTouches&&t.targetTouches.length>0?t.targetTouches[0].pageX:t.pageX},e.prototype.setValueFromEvt_=function(t){var e=this.getPageX_(t),n=this.computeValueFromPageX_(e);this.setValue_(n,!0)},e.prototype.computeValueFromPageX_=function(t){var e=this,n=e.max_,r=e.min_,i=t-this.rect_.left,o=i/this.rect_.width;return this.adapter_.isRTL()&&(o=1-o),r+o*(n-r)},e.prototype.handleKeydown_=function(t){var e=this.getKeyId_(t),n=this.getValueForKeyId_(e);isNaN(n)||(t.preventDefault(),this.adapter_.addClass(a.cssClasses.FOCUS),this.setValue_(n,!0),this.adapter_.notifyChange())},e.prototype.getKeyId_=function(t){return t.key===d.ARROW_LEFT||37===t.keyCode?d.ARROW_LEFT:t.key===d.ARROW_RIGHT||39===t.keyCode?d.ARROW_RIGHT:t.key===d.ARROW_UP||38===t.keyCode?d.ARROW_UP:t.key===d.ARROW_DOWN||40===t.keyCode?d.ARROW_DOWN:t.key===d.HOME||36===t.keyCode?d.HOME:t.key===d.END||35===t.keyCode?d.END:t.key===d.PAGE_UP||33===t.keyCode?d.PAGE_UP:t.key===d.PAGE_DOWN||34===t.keyCode?d.PAGE_DOWN:""},e.prototype.getValueForKeyId_=function(t){var e=this,n=e.max_,r=e.min_,i=e.step_,o=i||(n-r)/100;switch(this.adapter_.isRTL()&&(t===d.ARROW_LEFT||t===d.ARROW_RIGHT)&&(o=-o),t){case d.ARROW_LEFT:case d.ARROW_DOWN:return this.value_-o;case d.ARROW_RIGHT:case d.ARROW_UP:return this.value_+o;case d.HOME:return this.min_;case d.END:return this.max_;case d.PAGE_UP:return this.value_+o*a.numbers.PAGE_FACTOR;case d.PAGE_DOWN:return this.value_-o*a.numbers.PAGE_FACTOR;default:return NaN}},e.prototype.handleFocus_=function(){this.preventFocusState_||this.adapter_.addClass(a.cssClasses.FOCUS)},e.prototype.handleBlur_=function(){this.preventFocusState_=!1,this.adapter_.removeClass(a.cssClasses.FOCUS)},e.prototype.setValue_=function(t,e,n){if(void 0===n&&(n=!1),t!==this.value_||n){var r=this,i=r.min_,o=r.max_,s=t===i||t===o;this.step_&&!s&&(t=this.quantize_(t)),t<i?t=i:t>o&&(t=o),this.value_=t,this.adapter_.setAttribute(a.strings.ARIA_VALUENOW,String(this.value_)),this.updateUIForCurrentValue_(),e&&(this.adapter_.notifyInput(),this.isDiscrete_&&this.adapter_.setMarkerValue(t))}},e.prototype.quantize_=function(t){return Math.round(t/this.step_)*this.step_},e.prototype.updateUIForCurrentValue_=function(){var t=this,e=this,n=e.max_,r=e.min_,i=e.value_,s=(i-r)/(n-r),a=s*this.rect_.width;this.adapter_.isRTL()&&(a=this.rect_.width-a);var c=o.getCorrectPropertyName(window,"transform"),u=o.getCorrectEventName(window,"transitionend");if(this.inTransit_){var l=function e(){t.setInTransit_(!1),t.adapter_.deregisterThumbContainerInteractionHandler(u,e)};this.adapter_.registerThumbContainerInteractionHandler(u,l)}requestAnimationFrame(function(){t.adapter_.setThumbContainerStyleProperty(c,"translateX("+a+"px) translateX(-50%)"),t.adapter_.setTrackStyleProperty(c,"scaleX("+s+")")})},e.prototype.setActive_=function(t){this.active_=t,this.toggleClass_(a.cssClasses.ACTIVE,this.active_)},e.prototype.setInTransit_=function(t){this.inTransit_=t,this.toggleClass_(a.cssClasses.IN_TRANSIT,this.inTransit_)},e.prototype.toggleClass_=function(t,e){e?this.adapter_.addClass(t):this.adapter_.removeClass(t)},e}(s.MDCFoundation);e.MDCSliderFoundation=f,e.default=f},function(t,e,n){"use strict";function r(t,e){void 0===e&&(e=t);var n=t.getAttribute("aria-live"),r=e.textContent.trim();r&&n&&(t.setAttribute("aria-live","off"),e.textContent="",e.innerHTML='<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>',e.setAttribute(s,r),setTimeout(function(){t.setAttribute("aria-live",n),e.removeAttribute(s),e.textContent=r},o))}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var i=n(20),o=i.numbers.ARIA_LIVE_DELAY_MS,s=i.strings.ARIA_LIVE_LABEL_TEXT_ATTR;e.announce=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(20),a=s.cssClasses.OPENING,c=s.cssClasses.OPEN,u=s.cssClasses.CLOSING,l=s.strings.REASON_ACTION,d=s.strings.REASON_DISMISS,f=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.isOpen_=!1,r.animationFrame_=0,r.animationTimer_=0,r.autoDismissTimer_=0,r.autoDismissTimeoutMs_=s.numbers.DEFAULT_AUTO_DISMISS_TIMEOUT_MS,r.closeOnEscape_=!0,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},announce:function(){},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},removeClass:function(){}}},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.clearAutoDismissTimer_(),cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,clearTimeout(this.animationTimer_),this.animationTimer_=0,this.adapter_.removeClass(a),this.adapter_.removeClass(c),this.adapter_.removeClass(u)},e.prototype.open=function(){var t=this;this.clearAutoDismissTimer_(),this.isOpen_=!0,this.adapter_.notifyOpening(),this.adapter_.removeClass(u),this.adapter_.addClass(a),this.adapter_.announce(),this.runNextAnimationFrame_(function(){t.adapter_.addClass(c),t.animationTimer_=setTimeout(function(){t.handleAnimationTimerEnd_(),t.adapter_.notifyOpened(),t.autoDismissTimer_=setTimeout(function(){t.close(d)},t.getTimeoutMs())},s.numbers.SNACKBAR_ANIMATION_OPEN_TIME_MS)})},e.prototype.close=function(t){var e=this;void 0===t&&(t=""),this.isOpen_&&(cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,this.clearAutoDismissTimer_(),this.isOpen_=!1,this.adapter_.notifyClosing(t),this.adapter_.addClass(s.cssClasses.CLOSING),this.adapter_.removeClass(s.cssClasses.OPEN),this.adapter_.removeClass(s.cssClasses.OPENING),clearTimeout(this.animationTimer_),this.animationTimer_=setTimeout(function(){e.handleAnimationTimerEnd_(),e.adapter_.notifyClosed(t)},s.numbers.SNACKBAR_ANIMATION_CLOSE_TIME_MS))},e.prototype.isOpen=function(){return this.isOpen_},e.prototype.getTimeoutMs=function(){return this.autoDismissTimeoutMs_},e.prototype.setTimeoutMs=function(t){var e=s.numbers.MIN_AUTO_DISMISS_TIMEOUT_MS,n=s.numbers.MAX_AUTO_DISMISS_TIMEOUT_MS;if(!(t<=n&&t>=e))throw new Error("timeoutMs must be an integer in the range "+e+"–"+n+", but got '"+t+"'");this.autoDismissTimeoutMs_=t},e.prototype.getCloseOnEscape=function(){return this.closeOnEscape_},e.prototype.setCloseOnEscape=function(t){this.closeOnEscape_=t},e.prototype.handleKeyDown=function(t){("Escape"===t.key||27===t.keyCode)&&this.getCloseOnEscape()&&this.close(d)},e.prototype.handleActionButtonClick=function(t){this.close(l)},e.prototype.handleActionIconClick=function(t){this.close(d)},e.prototype.clearAutoDismissTimer_=function(){clearTimeout(this.autoDismissTimer_),this.autoDismissTimer_=0},e.prototype.handleAnimationTimerEnd_=function(){this.animationTimer_=0,this.adapter_.removeClass(s.cssClasses.OPENING),this.adapter_.removeClass(s.cssClasses.CLOSING)},e.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},e}(o.MDCFoundation);e.MDCSnackbarFoundation=f,e.default=f},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(138),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNativeControlChecked:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setChecked=function(t){this.adapter_.setNativeControlChecked(t),this.updateCheckedStyling_(t)},e.prototype.setDisabled=function(t){this.adapter_.setNativeControlDisabled(t),t?this.adapter_.addClass(s.cssClasses.DISABLED):this.adapter_.removeClass(s.cssClasses.DISABLED)},e.prototype.handleChange=function(t){var e=t.target;this.updateCheckedStyling_(e.checked)},e.prototype.updateCheckedStyling_=function(t){t?this.adapter_.addClass(s.cssClasses.CHECKED):this.adapter_.removeClass(s.cssClasses.CHECKED)},e}(o.MDCFoundation);e.MDCSwitchFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(61));e.util=o,r(n(141)),r(n(63))},function(t,e,n){"use strict";function r(t,e){if(void 0===e&&(e=!0),e&&void 0!==i)return i;var n=t.createElement("div");n.classList.add(o.cssClasses.SCROLL_TEST),t.body.appendChild(n);var r=n.offsetHeight-n.clientHeight;return t.body.removeChild(n),e&&(i=r),r}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var i,o=n(62);e.computeHorizontalScrollbarHeight=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"};e.cssClasses=r;var i={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)},o=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),a=n(62),c=n(142),u=n(143),l=n(144),d=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.isAnimating_=!1,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return a.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return a.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this.adapter_.computeHorizontalScrollbarHeight();this.adapter_.setScrollAreaStyleProperty("margin-bottom",-t+"px"),this.adapter_.addScrollAreaClass(e.cssClasses.SCROLL_AREA_SCROLL)},e.prototype.getScrollPosition=function(){if(this.isRTL_())return this.computeCurrentScrollPositionRTL_();var t=this.calculateCurrentTranslateX_();return this.adapter_.getScrollAreaScrollLeft()-t},e.prototype.handleInteraction=function(){this.isAnimating_&&this.stopScrollAnimation_()},e.prototype.handleTransitionEnd=function(t){var n=t.target;this.isAnimating_&&this.adapter_.eventTargetMatchesSelector(n,e.strings.CONTENT_SELECTOR)&&(this.isAnimating_=!1,this.adapter_.removeClass(e.cssClasses.ANIMATING))},e.prototype.incrementScroll=function(t){if(0!==t)return this.isRTL_()?this.incrementScrollRTL_(t):void this.incrementScroll_(t)},e.prototype.scrollTo=function(t){if(this.isRTL_())return this.scrollToRTL_(t);this.scrollTo_(t)},e.prototype.getRTLScroller=function(){return this.rtlScrollerInstance_||(this.rtlScrollerInstance_=this.rtlScrollerFactory_()),this.rtlScrollerInstance_},e.prototype.calculateCurrentTranslateX_=function(){var t=this.adapter_.getScrollContentStyleValue("transform");if("none"===t)return 0;var e=/\((.+?)\)/.exec(t);if(!e)return 0;var n=e[1],r=o(n.split(","),6),i=(r[0],r[1],r[2],r[3],r[4]);r[5];return parseFloat(i)},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},e.prototype.computeCurrentScrollPositionRTL_=function(){var t=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(t)},e.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth()}},e.prototype.scrollTo_=function(t){var e=this.getScrollPosition(),n=this.clampScrollValue_(t),r=n-e;this.animate_({finalScrollPosition:n,scrollDelta:r})},e.prototype.scrollToRTL_=function(t){var e=this.getRTLScroller().scrollToRTL(t);this.animate_(e)},e.prototype.incrementScroll_=function(t){var e=this.getScrollPosition(),n=t+e,r=this.clampScrollValue_(n),i=r-e;this.animate_({finalScrollPosition:r,scrollDelta:i})},e.prototype.incrementScrollRTL_=function(t){var e=this.getRTLScroller().incrementScrollRTL(t);this.animate_(e)},e.prototype.animate_=function(t){var n=this;0!==t.scrollDelta&&(this.stopScrollAnimation_(),this.adapter_.setScrollAreaScrollLeft(t.finalScrollPosition),this.adapter_.setScrollContentStyleProperty("transform","translateX("+t.scrollDelta+"px)"),this.adapter_.computeScrollAreaClientRect(),requestAnimationFrame(function(){n.adapter_.addClass(e.cssClasses.ANIMATING),n.adapter_.setScrollContentStyleProperty("transform","none")}),this.isAnimating_=!0)},e.prototype.stopScrollAnimation_=function(){this.isAnimating_=!1;var t=this.getAnimatingScrollPosition_();this.adapter_.removeClass(e.cssClasses.ANIMATING),this.adapter_.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter_.setScrollAreaScrollLeft(t)},e.prototype.getAnimatingScrollPosition_=function(){var t=this.calculateCurrentTranslateX_(),e=this.adapter_.getScrollAreaScrollLeft();return this.isRTL_()?this.getRTLScroller().getAnimatingScrollPosition(e,t):e-t},e.prototype.rtlScrollerFactory_=function(){var t=this.adapter_.getScrollAreaScrollLeft();this.adapter_.setScrollAreaScrollLeft(t-1);var e=this.adapter_.getScrollAreaScrollLeft();if(e<0)return this.adapter_.setScrollAreaScrollLeft(t),new u.MDCTabScrollerRTLNegative(this.adapter_);var n=this.adapter_.computeScrollAreaClientRect(),r=this.adapter_.computeScrollContentClientRect(),i=Math.round(r.right-n.right);return this.adapter_.setScrollAreaScrollLeft(t),i===e?new l.MDCTabScrollerRTLReverse(this.adapter_):new c.MDCTabScrollerRTLDefault(this.adapter_)},e.prototype.isRTL_=function(){return"rtl"===this.adapter_.getScrollContentStyleValue("direction")},e}(s.MDCFoundation);e.MDCTabScrollerFoundation=d,e.default=d},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(145)),r(n(68))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(146)),r(n(9)),r(n(66)),r(n(67))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.activate=function(){this.adapter_.addClass(i.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},e.prototype.deactivate=function(){this.adapter_.removeClass(i.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},e}(i.MDCTabIndicatorFoundation);e.MDCFadingTabIndicatorFoundation=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.activate=function(t){if(!t)return void this.adapter_.addClass(i.MDCTabIndicatorFoundation.cssClasses.ACTIVE);var e=this.computeContentClientRect(),n=t.width/e.width,r=t.left-e.left;this.adapter_.addClass(i.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION),this.adapter_.setContentStyleProperty("transform","translateX("+r+"px) scaleX("+n+")"),this.computeContentClientRect(),this.adapter_.removeClass(i.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION),this.adapter_.addClass(i.MDCTabIndicatorFoundation.cssClasses.ACTIVE),this.adapter_.setContentStyleProperty("transform","")},e.prototype.deactivate=function(){this.adapter_.removeClass(i.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},e}(i.MDCTabIndicatorFoundation);e.MDCSlidingTabIndicatorFoundation=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(148),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.focusOnActivate_=!0,r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},activateIndicator:function(){},deactivateIndicator:function(){},notifyInteracted:function(){},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){}}},enumerable:!0,configurable:!0}),e.prototype.handleClick=function(){this.adapter_.notifyInteracted()},e.prototype.isActive=function(){return this.adapter_.hasClass(s.cssClasses.ACTIVE)},e.prototype.setFocusOnActivate=function(t){this.focusOnActivate_=t},e.prototype.activate=function(t){this.adapter_.addClass(s.cssClasses.ACTIVE),this.adapter_.setAttr(s.strings.ARIA_SELECTED,"true"),this.adapter_.setAttr(s.strings.TABINDEX,"0"),this.adapter_.activateIndicator(t),this.focusOnActivate_&&this.adapter_.focus()},e.prototype.deactivate=function(){this.isActive()&&(this.adapter_.removeClass(s.cssClasses.ACTIVE),this.adapter_.setAttr(s.strings.ARIA_SELECTED,"false"),this.adapter_.setAttr(s.strings.TABINDEX,"-1"),this.adapter_.deactivateIndicator())},e.prototype.computeDimensions=function(){var t=this.adapter_.getOffsetWidth(),e=this.adapter_.getOffsetLeft(),n=this.adapter_.getContentOffsetWidth(),r=this.adapter_.getContentOffsetLeft();return{contentLeft:e+r,contentRight:e+r+n,rootLeft:e,rootRight:e+t}},e}(o.MDCFoundation);e.MDCTabFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(149),a=new Set;a.add(s.strings.ARROW_LEFT_KEY),a.add(s.strings.ARROW_RIGHT_KEY),a.add(s.strings.END_KEY),a.add(s.strings.HOME_KEY),a.add(s.strings.ENTER_KEY),a.add(s.strings.SPACE_KEY);var c=new Map;c.set(s.numbers.ARROW_LEFT_KEYCODE,s.strings.ARROW_LEFT_KEY),c.set(s.numbers.ARROW_RIGHT_KEYCODE,s.strings.ARROW_RIGHT_KEY),c.set(s.numbers.END_KEYCODE,s.strings.END_KEY),c.set(s.numbers.HOME_KEYCODE,s.strings.HOME_KEY),c.set(s.numbers.ENTER_KEYCODE,s.strings.ENTER_KEY),c.set(s.numbers.SPACE_KEYCODE,s.strings.SPACE_KEY);var u=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.useAutomaticActivation_=!1,r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setUseAutomaticActivation=function(t){this.useAutomaticActivation_=t},e.prototype.activateTab=function(t){var e=this.adapter_.getPreviousActiveTabIndex();this.indexIsInRange_(t)&&t!==e&&(this.adapter_.deactivateTabAtIndex(e),this.adapter_.activateTabAtIndex(t,this.adapter_.getTabIndicatorClientRectAtIndex(e)),this.scrollIntoView(t),this.adapter_.notifyTabActivated(t))},e.prototype.handleKeyDown=function(t){var e=this.getKeyFromEvent_(t);if(void 0!==e)if(this.isActivationKey_(e)||t.preventDefault(),this.useAutomaticActivation_){if(this.isActivationKey_(e))return;var n=this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(),e);this.adapter_.setActiveTab(n),this.scrollIntoView(n)}else{var r=this.adapter_.getFocusedTabIndex();if(this.isActivationKey_(e))this.adapter_.setActiveTab(r);else{var n=this.determineTargetFromKey_(r,e);this.adapter_.focusTabAtIndex(n),this.scrollIntoView(n)}}},e.prototype.handleTabInteraction=function(t){this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(t.detail.tabId))},e.prototype.scrollIntoView=function(t){if(this.indexIsInRange_(t))return 0===t?this.adapter_.scrollTo(0):t===this.adapter_.getTabListLength()-1?this.adapter_.scrollTo(this.adapter_.getScrollContentWidth()):this.isRTL_()?this.scrollIntoViewRTL_(t):void this.scrollIntoView_(t)},e.prototype.determineTargetFromKey_=function(t,e){var n=this.isRTL_(),r=this.adapter_.getTabListLength()-1,i=e===s.strings.END_KEY,o=e===s.strings.ARROW_LEFT_KEY&&!n||e===s.strings.ARROW_RIGHT_KEY&&n,a=e===s.strings.ARROW_RIGHT_KEY&&!n||e===s.strings.ARROW_LEFT_KEY&&n,c=t;return i?c=r:o?c-=1:a?c+=1:c=0,c<0?c=r:c>r&&(c=0),c},e.prototype.calculateScrollIncrement_=function(t,e,n,r){var i=this.adapter_.getTabDimensionsAtIndex(e),o=i.contentLeft-n-r,a=i.contentRight-n,c=a-s.numbers.EXTRA_SCROLL_AMOUNT,u=o+s.numbers.EXTRA_SCROLL_AMOUNT;return e<t?Math.min(c,0):Math.max(u,0)},e.prototype.calculateScrollIncrementRTL_=function(t,e,n,r,i){var o=this.adapter_.getTabDimensionsAtIndex(e),a=i-o.contentLeft-n,c=i-o.contentRight-n-r,u=c+s.numbers.EXTRA_SCROLL_AMOUNT,l=a-s.numbers.EXTRA_SCROLL_AMOUNT;return e>t?Math.max(u,0):Math.min(l,0)},e.prototype.findAdjacentTabIndexClosestToEdge_=function(t,e,n,r){var i=e.rootLeft-n,o=e.rootRight-n-r,s=i+o,a=i<0||s<0,c=o>0||s>0;return a?t-1:c?t+1:-1},e.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(t,e,n,r,i){var o=i-e.rootLeft-r-n,s=i-e.rootRight-n,a=o+s,c=o>0||a>0,u=s<0||a<0;return c?t+1:u?t-1:-1},e.prototype.getKeyFromEvent_=function(t){return a.has(t.key)?t.key:c.get(t.keyCode)},e.prototype.isActivationKey_=function(t){return t===s.strings.SPACE_KEY||t===s.strings.ENTER_KEY},e.prototype.indexIsInRange_=function(t){return t>=0&&t<this.adapter_.getTabListLength()},e.prototype.isRTL_=function(){return this.adapter_.isRTL()},e.prototype.scrollIntoView_=function(t){var e=this.adapter_.getScrollPosition(),n=this.adapter_.getOffsetWidth(),r=this.adapter_.getTabDimensionsAtIndex(t),i=this.findAdjacentTabIndexClosestToEdge_(t,r,e,n);if(this.indexIsInRange_(i)){var o=this.calculateScrollIncrement_(t,i,e,n);this.adapter_.incrementScroll(o)}},e.prototype.scrollIntoViewRTL_=function(t){var e=this.adapter_.getScrollPosition(),n=this.adapter_.getOffsetWidth(),r=this.adapter_.getTabDimensionsAtIndex(t),i=this.adapter_.getScrollContentWidth(),o=this.findAdjacentTabIndexClosestToEdgeRTL_(t,r,e,n,i);if(this.indexIsInRange_(o)){var s=this.calculateScrollIncrementRTL_(t,o,e,n,i);this.adapter_.incrementScroll(s)}},e}(o.MDCFoundation);e.MDCTabBarFoundation=u,e.default=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(152)),r(n(71))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(153),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{setContent:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setCounterValue=function(t,e){t=Math.min(t,e),this.adapter_.setContent(t+" / "+e)},e}(o.MDCFoundation);e.MDCTextFieldCharacterCounterFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ARIA_CONTROLS:"aria-controls",ICON_SELECTOR:".mdc-text-field__icon",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline"};e.strings=r;var i={DENSE:"mdc-text-field--dense",DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon"};e.cssClasses=i;var o={DENSE_LABEL_SCALE:.923,LABEL_SCALE:.75};e.numbers=o;var s=["pattern","min","max","required","step","minlength","maxlength"];e.VALIDATION_ATTR_WHITELIST=s;var a=["color","date","datetime-local","month","range","time","week"];e.ALWAYS_FLOAT_TYPES=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(72),a=["mousedown","touchstart"],c=["click","keydown"],u=function(t){function e(n,r){void 0===r&&(r={});var o=t.call(this,i({},e.defaultAdapter,n))||this;return o.isFocused_=!1,o.receivedUserInput_=!1,o.isValid_=!0,o.useNativeValidation_=!0,o.helperText_=r.helperText,o.characterCounter_=r.characterCounter,o.leadingIcon_=r.leadingIcon,o.trailingIcon_=r.trailingIcon,o.inputFocusHandler_=function(){return o.activateFocus()},o.inputBlurHandler_=function(){return o.deactivateFocus()},o.inputInputHandler_=function(){return o.handleInput()},o.setPointerXOffset_=function(t){return o.setTransformOrigin(t)},o.textFieldInteractionHandler_=function(){return o.handleTextFieldInteraction()},o.validationAttributeChangeHandler_=function(t){return o.handleValidationAttributeChange(t)},o}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shouldAlwaysFloat_",{get:function(){var t=this.getNativeInput_().type;return s.ALWAYS_FLOAT_TYPES.indexOf(t)>=0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat_||this.isFocused_||Boolean(this.getValue())||this.isBadInput_()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shouldShake",{get:function(){return!this.isFocused_&&!this.isValid()&&Boolean(this.getValue())},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver(function(){})},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this;this.adapter_.isFocused()?this.inputFocusHandler_():this.adapter_.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter_.floatLabel(!0)),this.adapter_.registerInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter_.registerInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter_.registerInputInteractionHandler("input",this.inputInputHandler_),a.forEach(function(e){t.adapter_.registerInputInteractionHandler(e,t.setPointerXOffset_)}),c.forEach(function(e){t.adapter_.registerTextFieldInteractionHandler(e,t.textFieldInteractionHandler_)}),this.validationObserver_=this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_),this.setCharacterCounter_(this.getValue().length)},e.prototype.destroy=function(){var t=this;this.adapter_.deregisterInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter_.deregisterInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter_.deregisterInputInteractionHandler("input",this.inputInputHandler_),a.forEach(function(e){t.adapter_.deregisterInputInteractionHandler(e,t.setPointerXOffset_)}),c.forEach(function(e){t.adapter_.deregisterTextFieldInteractionHandler(e,t.textFieldInteractionHandler_)}),this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_)},e.prototype.handleTextFieldInteraction=function(){var t=this.adapter_.getNativeInput();t&&t.disabled||(this.receivedUserInput_=!0)},e.prototype.handleValidationAttributeChange=function(t){var e=this;t.some(function(t){return s.VALIDATION_ATTR_WHITELIST.indexOf(t)>-1&&(e.styleValidity_(!0),!0)}),t.indexOf("maxlength")>-1&&this.setCharacterCounter_(this.getValue().length)},e.prototype.notchOutline=function(t){if(this.adapter_.hasOutline())if(t){var e=this.adapter_.hasClass(s.cssClasses.DENSE),n=e?s.numbers.DENSE_LABEL_SCALE:s.numbers.LABEL_SCALE,r=this.adapter_.getLabelWidth()*n;this.adapter_.notchOutline(r)}else this.adapter_.closeOutline()},e.prototype.activateFocus=function(){this.isFocused_=!0,this.styleFocused_(this.isFocused_),this.adapter_.activateLineRipple(),this.adapter_.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter_.floatLabel(this.shouldFloat),this.adapter_.shakeLabel(this.shouldShake)),this.helperText_&&this.helperText_.showToScreenReader()},e.prototype.setTransformOrigin=function(t){var e=t.touches,n=e?e[0]:t,r=n.target.getBoundingClientRect(),i=n.clientX-r.left;this.adapter_.setLineRippleTransformOrigin(i)},e.prototype.handleInput=function(){this.autoCompleteFocus(),this.setCharacterCounter_(this.getValue().length)},e.prototype.autoCompleteFocus=function(){this.receivedUserInput_||this.activateFocus()},e.prototype.deactivateFocus=function(){this.isFocused_=!1,this.adapter_.deactivateLineRipple();var t=this.isValid();this.styleValidity_(t),this.styleFocused_(this.isFocused_),this.adapter_.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter_.floatLabel(this.shouldFloat),this.adapter_.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput_=!1)},e.prototype.getValue=function(){return this.getNativeInput_().value},e.prototype.setValue=function(t){this.getValue()!==t&&(this.getNativeInput_().value=t);var e=this.isValid();this.styleValidity_(e),this.adapter_.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter_.floatLabel(this.shouldFloat),this.adapter_.shakeLabel(this.shouldShake))},e.prototype.isValid=function(){return this.useNativeValidation_?this.isNativeInputValid_():this.isValid_},e.prototype.setValid=function(t){this.isValid_=t,this.styleValidity_(t);var e=!t&&!this.isFocused_;this.adapter_.hasLabel()&&this.adapter_.shakeLabel(e)},e.prototype.setUseNativeValidation=function(t){this.useNativeValidation_=t},e.prototype.isDisabled=function(){return this.getNativeInput_().disabled},e.prototype.setDisabled=function(t){this.getNativeInput_().disabled=t,this.styleDisabled_(t)},e.prototype.setHelperTextContent=function(t){this.helperText_&&this.helperText_.setContent(t)},e.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon_&&this.leadingIcon_.setAriaLabel(t)},e.prototype.setLeadingIconContent=function(t){this.leadingIcon_&&this.leadingIcon_.setContent(t)},e.prototype.setTrailingIconAriaLabel=function(t){this.trailingIcon_&&this.trailingIcon_.setAriaLabel(t)},e.prototype.setTrailingIconContent=function(t){this.trailingIcon_&&this.trailingIcon_.setContent(t)},e.prototype.setCharacterCounter_=function(t){if(this.characterCounter_){var e=this.getNativeInput_().maxLength;if(-1===e)throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter_.setCounterValue(t,e)}},e.prototype.isBadInput_=function(){return this.getNativeInput_().validity.badInput||!1},e.prototype.isNativeInputValid_=function(){return this.getNativeInput_().validity.valid},e.prototype.styleValidity_=function(t){var n=e.cssClasses.INVALID;t?this.adapter_.removeClass(n):this.adapter_.addClass(n),this.helperText_&&this.helperText_.setValidity(t)},e.prototype.styleFocused_=function(t){var n=e.cssClasses.FOCUSED;t?this.adapter_.addClass(n):this.adapter_.removeClass(n)},e.prototype.styleDisabled_=function(t){var n=e.cssClasses,r=n.DISABLED,i=n.INVALID;t?(this.adapter_.addClass(r),this.adapter_.removeClass(i)):this.adapter_.removeClass(r),this.leadingIcon_&&this.leadingIcon_.setDisabled(t),this.trailingIcon_&&this.trailingIcon_.setDisabled(t)},e.prototype.getNativeInput_=function(){return(this.adapter_?this.adapter_.getNativeInput():null)||{disabled:!1,maxLength:-1,type:"input",validity:{badInput:!1,valid:!0},value:""}},e}(o.MDCFoundation);e.MDCTextFieldFoundation=u,e.default=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(154)),r(n(75))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(155),a=function(t){function e(n){return t.call(this,i({},e.defaultAdapter,n))||this}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},removeAttr:function(){},setContent:function(){}}},enumerable:!0,configurable:!0}),e.prototype.setContent=function(t){this.adapter_.setContent(t)},e.prototype.setPersistent=function(t){t?this.adapter_.addClass(s.cssClasses.HELPER_TEXT_PERSISTENT):this.adapter_.removeClass(s.cssClasses.HELPER_TEXT_PERSISTENT)},e.prototype.setValidation=function(t){t?this.adapter_.addClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG):this.adapter_.removeClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG)},e.prototype.showToScreenReader=function(){this.adapter_.removeAttr(s.strings.ARIA_HIDDEN)},e.prototype.setValidity=function(t){var e=this.adapter_.hasClass(s.cssClasses.HELPER_TEXT_PERSISTENT),n=this.adapter_.hasClass(s.cssClasses.HELPER_TEXT_VALIDATION_MSG),r=n&&!t;r?this.adapter_.setAttr(s.strings.ROLE,"alert"):this.adapter_.removeAttr(s.strings.ROLE),e||r||this.hide_()},e.prototype.hide_=function(){this.adapter_.setAttr(s.strings.ARIA_HIDDEN,"true")},e}(o.MDCFoundation);e.MDCTextFieldHelperTextFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(156)),r(n(77))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(157),a=["click","keydown"],c=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.savedTabIndex_=null,r.interactionHandler_=function(t){return r.handleInteraction(t)},r}return r(e,t),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{getAttr:function(){return null},setAttr:function(){},removeAttr:function(){},setContent:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},notifyIconAction:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this;this.savedTabIndex_=this.adapter_.getAttr("tabindex"),a.forEach(function(e){t.adapter_.registerInteractionHandler(e,t.interactionHandler_)})},e.prototype.destroy=function(){var t=this;a.forEach(function(e){t.adapter_.deregisterInteractionHandler(e,t.interactionHandler_)})},e.prototype.setDisabled=function(t){this.savedTabIndex_&&(t?(this.adapter_.setAttr("tabindex","-1"),this.adapter_.removeAttr("role")):(this.adapter_.setAttr("tabindex",this.savedTabIndex_),this.adapter_.setAttr("role",s.strings.ICON_ROLE)))},e.prototype.setAriaLabel=function(t){this.adapter_.setAttr("aria-label",t)},e.prototype.setContent=function(t){this.adapter_.setContent(t)},e.prototype.handleInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;("click"===t.type||e)&&this.adapter_.notifyIconAction()},e}(o.MDCFoundation);e.MDCTextFieldIconFoundation=c,e.default=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=n(160),a=function(t){function e(n){var r=t.call(this,i({},e.defaultAdapter,n))||this;return r.checkRowHeightFrame_=0,r.scrollFrame_=0,r.executedLastChange_=!1,r.isFixed_=!1,r.isFixedLastRow_=!1,r.hasFlexibleFirstRow_=!1,r.useFlexDefaultBehavior_=!1,r.calculations_={flexibleExpansionHeight:0,flexibleExpansionRatio:0,maxTranslateYDistance:0,maxTranslateYRatio:0,scrollThreshold:0,scrollThresholdRatio:0,toolbarHeight:0,toolbarRatio:0,toolbarRowHeight:0},r}return r(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return s.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return s.strings},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return s.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{hasClass:function(){return!1},addClass:function(){},removeClass:function(){},registerScrollHandler:function(){},deregisterScrollHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},getViewportWidth:function(){return 0},getViewportScrollY:function(){return 0},getOffsetHeight:function(){return 0},getFirstRowElementOffsetHeight:function(){return 0},notifyChange:function(){},setStyle:function(){},setStyleForTitleElement:function(){},setStyleForFlexibleRowElement:function(){},setStyleForFixedAdjustElement:function(){}}},enumerable:!0,configurable:!0}),e.prototype.init=function(){var t=this;this.isFixed_=this.adapter_.hasClass(s.cssClasses.FIXED),this.isFixedLastRow_=this.adapter_.hasClass(s.cssClasses.FIXED_LASTROW)&&this.isFixed_,this.hasFlexibleFirstRow_=this.adapter_.hasClass(s.cssClasses.TOOLBAR_ROW_FLEXIBLE),this.hasFlexibleFirstRow_&&(this.useFlexDefaultBehavior_=this.adapter_.hasClass(s.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR)),this.resizeHandler_=function(){return t.checkRowHeight_()},this.scrollHandler_=function(){return t.updateToolbarStyles_()},this.adapter_.registerResizeHandler(this.resizeHandler_),this.adapter_.registerScrollHandler(this.scrollHandler_),this.initKeyRatio_(),this.setKeyHeights_()},e.prototype.destroy=function(){this.adapter_.deregisterResizeHandler(this.resizeHandler_),this.adapter_.deregisterScrollHandler(this.scrollHandler_)},e.prototype.updateAdjustElementStyles=function(){this.isFixed_&&this.adapter_.setStyleForFixedAdjustElement("margin-top",this.calculations_.toolbarHeight+"px")},e.prototype.getFlexibleExpansionRatio_=function(t){return Math.max(0,1-t/(this.calculations_.flexibleExpansionHeight+1e-4))},e.prototype.checkRowHeight_=function(){var t=this;cancelAnimationFrame(this.checkRowHeightFrame_),this.checkRowHeightFrame_=requestAnimationFrame(function(){return t.setKeyHeights_()})},e.prototype.setKeyHeights_=function(){var t=this.getRowHeight_();t!==this.calculations_.toolbarRowHeight&&(this.calculations_.toolbarRowHeight=t,this.calculations_.toolbarHeight=this.calculations_.toolbarRatio*this.calculations_.toolbarRowHeight,this.calculations_.flexibleExpansionHeight=this.calculations_.flexibleExpansionRatio*this.calculations_.toolbarRowHeight,this.calculations_.maxTranslateYDistance=this.calculations_.maxTranslateYRatio*this.calculations_.toolbarRowHeight,this.calculations_.scrollThreshold=this.calculations_.scrollThresholdRatio*this.calculations_.toolbarRowHeight,this.updateAdjustElementStyles(),this.updateToolbarStyles_())},e.prototype.updateToolbarStyles_=function(){var t=this;cancelAnimationFrame(this.scrollFrame_),this.scrollFrame_=requestAnimationFrame(function(){var e=t.adapter_.getViewportScrollY(),n=t.scrolledOutOfThreshold_(e);if(!n||!t.executedLastChange_){var r=t.getFlexibleExpansionRatio_(e);t.updateToolbarFlexibleState_(r),t.isFixedLastRow_&&t.updateToolbarFixedState_(e),t.hasFlexibleFirstRow_&&t.updateFlexibleRowElementStyles_(r),t.executedLastChange_=n,t.adapter_.notifyChange({flexibleExpansionRatio:r})}})},e.prototype.scrolledOutOfThreshold_=function(t){return t>this.calculations_.scrollThreshold},e.prototype.initKeyRatio_=function(){var t=this.getRowHeight_(),e=this.adapter_.getFirstRowElementOffsetHeight()/t;this.calculations_.toolbarRatio=this.adapter_.getOffsetHeight()/t,this.calculations_.flexibleExpansionRatio=e-1,this.calculations_.maxTranslateYRatio=this.isFixedLastRow_?this.calculations_.toolbarRatio-e:0,this.calculations_.scrollThresholdRatio=(this.isFixedLastRow_?this.calculations_.toolbarRatio:e)-1},e.prototype.getRowHeight_=function(){var t=s.numbers.TOOLBAR_MOBILE_BREAKPOINT;return this.adapter_.getViewportWidth()<t?s.numbers.TOOLBAR_ROW_MOBILE_HEIGHT:s.numbers.TOOLBAR_ROW_HEIGHT},e.prototype.updateToolbarFlexibleState_=function(t){this.adapter_.removeClass(s.cssClasses.FLEXIBLE_MAX),this.adapter_.removeClass(s.cssClasses.FLEXIBLE_MIN),1===t?this.adapter_.addClass(s.cssClasses.FLEXIBLE_MAX):0===t&&this.adapter_.addClass(s.cssClasses.FLEXIBLE_MIN)},e.prototype.updateToolbarFixedState_=function(t){var e=Math.max(0,Math.min(t-this.calculations_.flexibleExpansionHeight,this.calculations_.maxTranslateYDistance));this.adapter_.setStyle("transform","translateY("+-e+"px)"),e===this.calculations_.maxTranslateYDistance?this.adapter_.addClass(s.cssClasses.FIXED_AT_LAST_ROW):this.adapter_.removeClass(s.cssClasses.FIXED_AT_LAST_ROW)},e.prototype.updateFlexibleRowElementStyles_=function(t){if(this.isFixed_){var e=this.calculations_.flexibleExpansionHeight*t;this.adapter_.setStyleForFlexibleRowElement("height",e+this.calculations_.toolbarRowHeight+"px")}this.useFlexDefaultBehavior_&&this.updateElementStylesDefaultBehavior_(t)},e.prototype.updateElementStylesDefaultBehavior_=function(t){var e=s.numbers.MAX_TITLE_SIZE,n=s.numbers.MIN_TITLE_SIZE,r=(e-n)*t+n;this.adapter_.setStyleForTitleElement("font-size",r+"rem")},e}(o.MDCFoundation);e.MDCToolbarFoundation=a,e.default=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(6),o=n(22),s=function(t){function e(e){var n=t.call(this,e)||this;return n.wasScrolled_=!1,n.scrollHandler_=function(){return n.fixedScrollHandler_()},n}return r(e,t),e.prototype.fixedScrollHandler_=function(){this.adapter_.getViewportScrollY()<=0?this.wasScrolled_&&(this.adapter_.removeClass(i.cssClasses.FIXED_SCROLLED_CLASS),this.wasScrolled_=!1):this.wasScrolled_||(this.adapter_.addClass(i.cssClasses.FIXED_SCROLLED_CLASS),this.wasScrolled_=!0)},e}(o.MDCTopAppBarFoundation);e.MDCFixedTopAppBarFoundation=s,e.default=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(6),o=n(23),s=function(t){function e(e){var n=t.call(this,e)||this;return n.isCollapsed_=!1,n}return r(e,t),Object.defineProperty(e.prototype,"isCollapsed",{get:function(){return this.isCollapsed_},enumerable:!0,configurable:!0}),e.prototype.init=function(){var e=this;t.prototype.init.call(this),this.adapter_.getTotalActionItems()>0&&this.adapter_.addClass(i.cssClasses.SHORT_HAS_ACTION_ITEM_CLASS),this.adapter_.hasClass(i.cssClasses.SHORT_COLLAPSED_CLASS)||(this.scrollHandler_=function(){return e.shortAppBarScrollHandler_()},this.adapter_.registerScrollHandler(this.scrollHandler_),this.shortAppBarScrollHandler_())},e.prototype.destroy=function(){t.prototype.destroy.call(this)},e.prototype.shortAppBarScrollHandler_=function(){this.adapter_.getViewportScrollY()<=0?this.isCollapsed_&&(this.adapter_.removeClass(i.cssClasses.SHORT_COLLAPSED_CLASS),this.isCollapsed_=!1):this.isCollapsed_||(this.adapter_.addClass(i.cssClasses.SHORT_COLLAPSED_CLASS),this.isCollapsed_=!0)},e}(o.MDCTopAppBarBaseFoundation);e.MDCShortTopAppBarFoundation=s,e.default=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(82));e.autoInit=o.default;var s=i(n(83));e.base=s;var a=i(n(84));e.checkbox=a;var c=i(n(88));e.chips=c;var u=i(n(93));e.dialog=u;var l=i(n(2));e.dom=l;var d=i(n(99));e.drawer=d;var f=i(n(15));e.floatingLabel=f;var p=i(n(106));e.formField=p;var _=i(n(109));e.gridList=_;var h=i(n(112));e.iconButton=h;var y=i(n(17));e.lineRipple=y;var C=i(n(117));e.linearProgress=C;var v=i(n(41));e.list=v;var m=i(n(42));e.menuSurface=m;var g=i(n(44));e.menu=g;var E=i(n(19));e.notchedOutline=E;var b=i(n(123));e.radio=b;var O=i(n(3));e.ripple=O;var T=i(n(126));e.select=T;var A=i(n(132));e.slider=A;var I=i(n(134));e.snackbar=I;var S=i(n(136));e.switchControl=S;var L=i(n(139));e.tabBar=L;var D=i(n(65));e.tabIndicator=D;var R=i(n(60));e.tabScroller=R;var M=i(n(64));e.tab=M;var P=i(n(150));e.textField=P;var N=i(n(158));e.toolbar=N;var w=i(n(161));e.topAppBar=w,o.default.register("MDCCheckbox",a.MDCCheckbox),o.default.register("MDCChip",c.MDCChip),o.default.register("MDCChipSet",c.MDCChipSet),o.default.register("MDCDialog",u.MDCDialog),o.default.register("MDCDrawer",d.MDCDrawer),o.default.register("MDCFloatingLabel",f.MDCFloatingLabel),o.default.register("MDCFormField",p.MDCFormField),o.default.register("MDCGridList",_.MDCGridList),o.default.register("MDCIconButtonToggle",h.MDCIconButtonToggle),o.default.register("MDCLineRipple",y.MDCLineRipple),o.default.register("MDCLinearProgress",C.MDCLinearProgress),o.default.register("MDCList",v.MDCList),o.default.register("MDCMenu",g.MDCMenu),o.default.register("MDCMenuSurface",m.MDCMenuSurface),o.default.register("MDCNotchedOutline",E.MDCNotchedOutline),o.default.register("MDCRadio",b.MDCRadio),o.default.register("MDCRipple",O.MDCRipple),o.default.register("MDCSelect",T.MDCSelect),o.default.register("MDCSlider",A.MDCSlider),o.default.register("MDCSnackbar",I.MDCSnackbar),o.default.register("MDCSwitch",S.MDCSwitch),o.default.register("MDCTabBar",L.MDCTabBar),o.default.register("MDCTextField",P.MDCTextField),o.default.register("MDCToolbar",N.MDCToolbar),o.default.register("MDCTopAppBar",w.MDCTopAppBar)},function(t,e,n){"use strict";function r(t,e,n){void 0===n&&(n=!1);var r;"function"==typeof CustomEvent?r=new CustomEvent(t,{bubbles:n,detail:e}):(r=document.createEvent("CustomEvent"),r.initCustomEvent(t,n,!1,e)),document.dispatchEvent(r)}function i(t,e){void 0===t&&(t=document),void 0===e&&(e=a);var n,i,c=[],u=[].slice.call(t.querySelectorAll("[data-mdc-auto-init]"));try{for(var l=o(u),d=l.next();!d.done;d=l.next()){var f=d.value,p=f.getAttribute("data-mdc-auto-init");if(!p)throw new Error("(mdc-auto-init) Constructor name must be given.");var _=s[p];if("function"!=typeof _)throw new Error("(mdc-auto-init) Could not find constructor in registry for "+p);if(Object.getOwnPropertyDescriptor(f,p))e("(mdc-auto-init) Component already initialized for "+f+". Skipping...");else{var h=_.attachTo(f);Object.defineProperty(f,p,{configurable:!0,enumerable:!1,value:h,writable:!1}),c.push(h)}}}catch(t){n={error:t}}finally{try{d&&!d.done&&(i=l.return)&&i.call(l)}finally{if(n)throw n.error}}return r("MDCAutoInit:End",{}),c}/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var o=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var s={},a=console.warn.bind(console);e.mdcAutoInit=i,i.register=function(t,e,n){if(void 0===n&&(n=a),"function"!=typeof e)throw new Error("(mdc-auto-init) Invalid Constructor value: "+e+". Expected function.");var r=s[t];r&&n("(mdc-auto-init) Overriding registration for "+t+" with "+e+". Was: "+r),s[t]=e},i.deregister=function(t){delete s[t]},i.deregisterAll=function(){Object.keys(s).forEach(this.deregister,this)},e.default=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(1)),r(n(0))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(85)),r(n(24))},function(t,e,n){"use strict";function r(t){return!!t&&"function"==typeof t.set}/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var i=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__assign||function(){return o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},o.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s=n(10),a=n(1),c=n(2),u=n(3),l=n(24),d=["checked","indeterminate"],f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ripple_=e.createRipple_(),e}return i(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.nativeControl_.checked=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"indeterminate",{get:function(){return this.nativeControl_.indeterminate},set:function(t){this.nativeControl_.indeterminate=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this.nativeControl_.value},set:function(t){this.nativeControl_.value=t},enumerable:!0,configurable:!0}),e.prototype.initialSyncWithDOM=function(){var t=this;this.handleChange_=function(){return t.foundation_.handleChange()},this.handleAnimationEnd_=function(){return t.foundation_.handleAnimationEnd()},this.nativeControl_.addEventListener("change",this.handleChange_),this.listen(s.getCorrectEventName(window,"animationend"),this.handleAnimationEnd_),this.installPropertyChangeHooks_()},e.prototype.destroy=function(){this.ripple_.destroy(),this.nativeControl_.removeEventListener("change",this.handleChange_),this.unlisten(s.getCorrectEventName(window,"animationend"),this.handleAnimationEnd_),this.uninstallPropertyChangeHooks_(),t.prototype.destroy.call(this)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},forceLayout:function(){return t.root_.offsetWidth},hasNativeControl:function(){return!!t.nativeControl_},isAttachedToDOM:function(){return Boolean(t.root_.parentNode)},isChecked:function(){return t.checked},isIndeterminate:function(){return t.indeterminate},removeClass:function(e){return t.root_.classList.remove(e)},removeNativeControlAttr:function(e){return t.nativeControl_.removeAttribute(e)},setNativeControlAttr:function(e,n){return t.nativeControl_.setAttribute(e,n)},setNativeControlDisabled:function(e){return t.nativeControl_.disabled=e}};return new l.MDCCheckboxFoundation(e)},e.prototype.createRipple_=function(){var t=this,e=o({},u.MDCRipple.createAdapter(this),{deregisterInteractionHandler:function(e,n){return t.nativeControl_.removeEventListener(e,n)},isSurfaceActive:function(){return c.ponyfill.matches(t.nativeControl_,":active")},isUnbounded:function(){return!0},registerInteractionHandler:function(e,n){return t.nativeControl_.addEventListener(e,n)}});return new u.MDCRipple(this.root_,new u.MDCRippleFoundation(e))},e.prototype.installPropertyChangeHooks_=function(){var t=this,e=this.nativeControl_,n=Object.getPrototypeOf(e);d.forEach(function(i){var o=Object.getOwnPropertyDescriptor(n,i);if(r(o)){var s=o.get,a={configurable:o.configurable,enumerable:o.enumerable,get:s,set:function(n){o.set.call(e,n),t.foundation_.handleChange()}};Object.defineProperty(e,i,a)}})},e.prototype.uninstallPropertyChangeHooks_=function(){var t=this.nativeControl_,e=Object.getPrototypeOf(t);d.forEach(function(n){var i=Object.getOwnPropertyDescriptor(e,n);r(i)&&Object.defineProperty(t,n,i)})},Object.defineProperty(e.prototype,"nativeControl_",{get:function(){var t=l.MDCCheckboxFoundation.strings.NATIVE_CONTROL_SELECTOR,e=this.root_.querySelector(t);if(!e)throw new Error("Checkbox component requires a "+t+" element");return e},enumerable:!0,configurable:!0}),e}(a.MDCComponent);e.MDCCheckbox=f},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},e.strings={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},e.numbers={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ANIM_CHECKED_INDETERMINATE:"mdc-checkbox--anim-checked-indeterminate",ANIM_CHECKED_UNCHECKED:"mdc-checkbox--anim-checked-unchecked",ANIM_INDETERMINATE_CHECKED:"mdc-checkbox--anim-indeterminate-checked",ANIM_INDETERMINATE_UNCHECKED:"mdc-checkbox--anim-indeterminate-unchecked",ANIM_UNCHECKED_CHECKED:"mdc-checkbox--anim-unchecked-checked",ANIM_UNCHECKED_INDETERMINATE:"mdc-checkbox--anim-unchecked-indeterminate",CHECKED:"mdc-checkbox--checked",DISABLED:"mdc-checkbox--disabled",INDETERMINATE:"mdc-checkbox--indeterminate",UPGRADED:"mdc-checkbox--upgraded"},e.strings={ARIA_CHECKED_ATTR:"aria-checked",ARIA_CHECKED_INDETERMINATE_VALUE:"mixed",NATIVE_CONTROL_SELECTOR:".mdc-checkbox__native-control",TRANSITION_STATE_CHECKED:"checked",TRANSITION_STATE_INDETERMINATE:"indeterminate",TRANSITION_STATE_INIT:"init",TRANSITION_STATE_UNCHECKED:"unchecked"},e.numbers={ANIM_END_LATCH_MS:250}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(25)),r(n(90))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(3),a=n(26),c=n(27),u=["click","keydown"],l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),Object.defineProperty(e.prototype,"selected",{get:function(){return this.foundation_.isSelected()},set:function(t){this.foundation_.setSelected(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shouldRemoveOnTrailingIconClick",{get:function(){return this.foundation_.getShouldRemoveOnTrailingIconClick()},set:function(t){this.foundation_.setShouldRemoveOnTrailingIconClick(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"id",{get:function(){return this.root_.id},enumerable:!0,configurable:!0}),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){var e=this;void 0===t&&(t=function(t,e){return new s.MDCRipple(t,e)}),this.leadingIcon_=this.root_.querySelector(a.strings.LEADING_ICON_SELECTOR),this.trailingIcon_=this.root_.querySelector(a.strings.TRAILING_ICON_SELECTOR),this.checkmark_=this.root_.querySelector(a.strings.CHECKMARK_SELECTOR);var n=i({},s.MDCRipple.createAdapter(this),{computeBoundingRect:function(){return e.foundation_.getDimensions()}});this.ripple_=t(this.root_,new s.MDCRippleFoundation(n))},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleInteraction_=function(e){return t.foundation_.handleInteraction(e)},this.handleTransitionEnd_=function(e){return t.foundation_.handleTransitionEnd(e)},this.handleTrailingIconInteraction_=function(e){return t.foundation_.handleTrailingIconInteraction(e)},u.forEach(function(e){t.listen(e,t.handleInteraction_)}),this.listen("transitionend",this.handleTransitionEnd_),this.trailingIcon_&&u.forEach(function(e){t.trailingIcon_.addEventListener(e,t.handleTrailingIconInteraction_)})},e.prototype.destroy=function(){var e=this;this.ripple_.destroy(),u.forEach(function(t){e.unlisten(t,e.handleInteraction_)}),this.unlisten("transitionend",this.handleTransitionEnd_),this.trailingIcon_&&u.forEach(function(t){e.trailingIcon_.removeEventListener(t,e.handleTrailingIconInteraction_)}),t.prototype.destroy.call(this)},e.prototype.beginExit=function(){this.foundation_.beginExit()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},addClassToLeadingIcon:function(e){t.leadingIcon_&&t.leadingIcon_.classList.add(e)},eventTargetHasClass:function(t,e){return!!t&&t.classList.contains(e)},getCheckmarkBoundingClientRect:function(){return t.checkmark_?t.checkmark_.getBoundingClientRect():null},getComputedStyleValue:function(e){return window.getComputedStyle(t.root_).getPropertyValue(e)},getRootBoundingClientRect:function(){return t.root_.getBoundingClientRect()},hasClass:function(e){return t.root_.classList.contains(e)},hasLeadingIcon:function(){return!!t.leadingIcon_},notifyInteraction:function(){return t.emit(a.strings.INTERACTION_EVENT,{chipId:t.id},!0)},notifyRemoval:function(){return t.emit(a.strings.REMOVAL_EVENT,{chipId:t.id,root:t.root_},!0)},notifySelection:function(e){return t.emit(a.strings.SELECTION_EVENT,{chipId:t.id,selected:e},!0)},notifyTrailingIconInteraction:function(){return t.emit(a.strings.TRAILING_ICON_INTERACTION_EVENT,{chipId:t.id},!0)},removeClass:function(e){return t.root_.classList.remove(e)},removeClassFromLeadingIcon:function(e){t.leadingIcon_&&t.leadingIcon_.classList.remove(e)},setStyleProperty:function(e,n){return t.root_.style.setProperty(e,n)}};return new c.MDCChipFoundation(e)},e}(o.MDCComponent);e.MDCChip=l},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(91)),r(n(28))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(25),s=n(28),a=o.MDCChipFoundation.strings,c=a.INTERACTION_EVENT,u=a.SELECTION_EVENT,l=a.REMOVAL_EVENT,d=s.MDCChipSetFoundation.strings.CHIP_SELECTOR,f=0,p=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"chips",{get:function(){return this.chips_.slice()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selectedChipIds",{get:function(){return this.foundation_.getSelectedChipIds()},enumerable:!0,configurable:!0}),e.prototype.initialize=function(t){void 0===t&&(t=function(t){return new o.MDCChip(t)}),this.chipFactory_=t,this.chips_=this.instantiateChips_(this.chipFactory_)},e.prototype.initialSyncWithDOM=function(){var t=this;this.chips_.forEach(function(e){e.id&&e.selected&&t.foundation_.select(e.id)}),this.handleChipInteraction_=function(e){return t.foundation_.handleChipInteraction(e.detail.chipId)},this.handleChipSelection_=function(e){return t.foundation_.handleChipSelection(e.detail.chipId,e.detail.selected)},this.handleChipRemoval_=function(e){return t.foundation_.handleChipRemoval(e.detail.chipId)},this.listen(c,this.handleChipInteraction_),this.listen(u,this.handleChipSelection_),this.listen(l,this.handleChipRemoval_)},e.prototype.destroy=function(){this.chips_.forEach(function(t){t.destroy()}),this.unlisten(c,this.handleChipInteraction_),this.unlisten(u,this.handleChipSelection_),this.unlisten(l,this.handleChipRemoval_),t.prototype.destroy.call(this)},e.prototype.addChip=function(t){t.id=t.id||"mdc-chip-"+ ++f,this.chips_.push(this.chipFactory_(t))},e.prototype.getDefaultFoundation=function(){var t=this,e={hasClass:function(e){return t.root_.classList.contains(e)},removeChip:function(e){var n=t.findChipIndex_(e);n>=0&&(t.chips_[n].destroy(),t.chips_.splice(n,1))},setSelected:function(e,n){var r=t.findChipIndex_(e);r>=0&&(t.chips_[r].selected=n)}};return new s.MDCChipSetFoundation(e)},e.prototype.instantiateChips_=function(t){return[].slice.call(this.root_.querySelectorAll(d)).map(function(e){return e.id=e.id||"mdc-chip-"+ ++f,t(e)})},e.prototype.findChipIndex_=function(t){for(var e=0;e<this.chips_.length;e++)if(this.chips_[e].id===t)return e;return-1},e}(i.MDCComponent);e.MDCChipSet=p},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.strings={CHIP_SELECTOR:".mdc-chip"},e.cssClasses={CHOICE:"mdc-chip-set--choice",FILTER:"mdc-chip-set--filter"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(29));e.util=o,r(n(97)),r(n(30))},function(t,e,n){function r(t,e){function n(t){if(!S.active){b(),S.active=!0,S.paused=!1,S.nodeFocusedBeforeActivation=T.activeElement;var e=t&&t.onActivate?t.onActivate:I.onActivate;return e&&e(),p(),L}}function r(t){if(S.active){_(),S.active=!1,S.paused=!1,l.deactivateTrap(L);var e=t&&void 0!==t.onDeactivate?t.onDeactivate:I.onDeactivate;e&&e();return(t&&void 0!==t.returnFocus?t.returnFocus:I.returnFocusOnDeactivate)&&a(function(){O(S.nodeFocusedBeforeActivation)}),L}}function d(){!S.paused&&S.active&&(S.paused=!0,_())}function f(){S.paused&&S.active&&(S.paused=!1,p())}function p(){if(S.active)return l.activateTrap(L),b(),a(function(){O(y())}),T.addEventListener("focusin",v,!0),T.addEventListener("mousedown",C,!0),T.addEventListener("touchstart",C,!0),T.addEventListener("click",E,!0),T.addEventListener("keydown",m,!0),L}function _(){if(S.active)return T.removeEventListener("focusin",v,!0),T.removeEventListener("mousedown",C,!0),T.removeEventListener("touchstart",C,!0),T.removeEventListener("click",E,!0),T.removeEventListener("keydown",m,!0),L}function h(t){var e=I[t],n=e;if(!e)return null;if("string"==typeof e&&!(n=T.querySelector(e)))throw new Error("`"+t+"` refers to no known node");if("function"==typeof e&&!(n=e()))throw new Error("`"+t+"` did not return a node");return n}function y(){var t;if(!(t=null!==h("initialFocus")?h("initialFocus"):A.contains(T.activeElement)?T.activeElement:S.firstTabbableNode||h("fallbackFocus")))throw new Error("You can't have a focus-trap without at least one focusable element");return t}function C(t){A.contains(t.target)||(I.clickOutsideDeactivates?r({returnFocus:!c.isFocusable(t.target)}):t.preventDefault())}function v(t){A.contains(t.target)||t.target instanceof Document||(t.stopImmediatePropagation(),O(S.mostRecentlyFocusedNode||y()))}function m(t){return!1!==I.escapeDeactivates&&o(t)?(t.preventDefault(),void r()):s(t)?void g(t):void 0}function g(t){return b(),t.shiftKey&&t.target===S.firstTabbableNode?(t.preventDefault(),void O(S.lastTabbableNode)):t.shiftKey||t.target!==S.lastTabbableNode?void 0:(t.preventDefault(),void O(S.firstTabbableNode))}function E(t){I.clickOutsideDeactivates||A.contains(t.target)||(t.preventDefault(),t.stopImmediatePropagation())}function b(){var t=c(A);S.firstTabbableNode=t[0]||y(),S.lastTabbableNode=t[t.length-1]||y()}function O(t){if(t!==T.activeElement){if(!t||!t.focus)return void O(y());t.focus(),S.mostRecentlyFocusedNode=t,i(t)&&t.select()}}var T=document,A="string"==typeof t?T.querySelector(t):t,I=u({returnFocusOnDeactivate:!0,escapeDeactivates:!0},e),S={firstTabbableNode:null,lastTabbableNode:null,nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1},L={activate:n,deactivate:r,pause:d,unpause:f};return L}function i(t){return t.tagName&&"input"===t.tagName.toLowerCase()&&"function"==typeof t.select}function o(t){return"Escape"===t.key||"Esc"===t.key||27===t.keyCode}function s(t){return"Tab"===t.key||9===t.keyCode}function a(t){return setTimeout(t,0)}var c=n(95),u=n(96),l=function(){var t=[];return{activateTrap:function(e){if(t.length>0){var n=t[t.length-1];n!==e&&n.pause()}var r=t.indexOf(e);-1===r?t.push(e):(t.splice(r,1),t.push(e))},deactivateTrap:function(e){var n=t.indexOf(e);-1!==n&&t.splice(n,1),t.length>0&&t[t.length-1].unpause()}}}();t.exports=r},function(t,e){function n(t,e){e=e||{};var n=t.ownerDocument||t,i=[],o=[],s=new C(n),u=t.querySelectorAll(m);e.includeContainer&&g.call(t,m)&&(u=Array.prototype.slice.apply(u),u.unshift(t));var l,d,f;for(l=0;l<u.length;l++)d=u[l],r(d,s)&&(f=a(d),0===f?i.push(d):o.push({documentOrder:l,tabIndex:f,node:d}));return o.sort(c).map(function(t){return t.node}).concat(i)}function r(t,e){return!(!o(t,e)||_(t)||a(t)<0)}function i(t,e){if(!t)throw new Error("No node provided");return!1!==g.call(t,m)&&r(t,e)}function o(t,e){return e=e||new C(t.ownerDocument||t),!(t.disabled||f(t)||e.isUntouchable(t))}function s(t,e){if(!t)throw new Error("No node provided");return!1!==g.call(t,E)&&o(t,e)}function a(t){var e=parseInt(t.getAttribute("tabindex"),10);return isNaN(e)?l(t)?0:t.tabIndex:e}function c(t,e){return t.tabIndex===e.tabIndex?t.documentOrder-e.documentOrder:t.tabIndex-e.tabIndex}function u(t,e){for(var n=0,r=t.length;n<r;n++)if(e(t[n]))return t[n]}function l(t){return"true"===t.contentEditable}function d(t){return"INPUT"===t.tagName}function f(t){return d(t)&&"hidden"===t.type}function p(t){return d(t)&&"radio"===t.type}function _(t){return p(t)&&!y(t)}function h(t){for(var e=0;e<t.length;e++)if(t[e].checked)return t[e]}function y(t){if(!t.name)return!0;var e=t.ownerDocument.querySelectorAll('input[type="radio"][name="'+t.name+'"]'),n=h(e);return!n||n===t}function C(t){this.doc=t,this.cache=[]}var v=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'],m=v.join(","),g="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;n.isTabbable=i,n.isFocusable=s;var E=v.concat("iframe").join(",");C.prototype.hasDisplayNone=function(t,e){if(t.nodeType!==Node.ELEMENT_NODE)return!1;var n=u(this.cache,function(e){return e===t});if(n)return n[1];e=e||this.doc.defaultView.getComputedStyle(t);var r=!1;return"none"===e.display?r=!0:t.parentNode&&(r=this.hasDisplayNone(t.parentNode)),this.cache.push([t,r]),r},C.prototype.isUntouchable=function(t){if(t===this.doc.documentElement)return!1;var e=this.doc.defaultView.getComputedStyle(t);return!!this.hasDisplayNone(t,e)||"hidden"===e.visibility},t.exports=n},function(t,e){function n(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var i in n)r.call(n,i)&&(t[i]=n[i])}return t}t.exports=n;var r=Object.prototype.hasOwnProperty},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=n(11),c=n(4),u=n(30),l=o(n(29)),d=u.MDCDialogFoundation.strings,f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),Object.defineProperty(e.prototype,"isOpen",{get:function(){return this.foundation_.isOpen()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"escapeKeyAction",{get:function(){return this.foundation_.getEscapeKeyAction()},set:function(t){this.foundation_.setEscapeKeyAction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scrimClickAction",{get:function(){return this.foundation_.getScrimClickAction()},set:function(t){this.foundation_.setScrimClickAction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"autoStackButtons",{get:function(){return this.foundation_.getAutoStackButtons()},set:function(t){this.foundation_.setAutoStackButtons(t)},enumerable:!0,configurable:!0}),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e){var n,r,o=this.root_.querySelector(d.CONTAINER_SELECTOR);if(!o)throw new Error("Dialog component requires a "+d.CONTAINER_SELECTOR+" container element");this.container_=o,this.content_=this.root_.querySelector(d.CONTENT_SELECTOR),this.buttons_=[].slice.call(this.root_.querySelectorAll(d.BUTTON_SELECTOR)),this.defaultButton_=this.root_.querySelector(d.DEFAULT_BUTTON_SELECTOR),this.focusTrapFactory_=t,this.initialFocusEl_=e,this.buttonRipples_=[];try{for(var s=i(this.buttons_),a=s.next();!a.done;a=s.next()){var u=a.value;this.buttonRipples_.push(new c.MDCRipple(u))}}catch(t){n={error:t}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}},e.prototype.initialSyncWithDOM=function(){var t=this;this.focusTrap_=l.createFocusTrapInstance(this.container_,this.focusTrapFactory_,this.initialFocusEl_),this.handleInteraction_=this.foundation_.handleInteraction.bind(this.foundation_),this.handleDocumentKeydown_=this.foundation_.handleDocumentKeydown.bind(this.foundation_),this.handleLayout_=this.layout.bind(this);var e=["resize","orientationchange"];this.handleOpening_=function(){e.forEach(function(e){return window.addEventListener(e,t.handleLayout_)}),document.addEventListener("keydown",t.handleDocumentKeydown_)},this.handleClosing_=function(){e.forEach(function(e){return window.removeEventListener(e,t.handleLayout_)}),document.removeEventListener("keydown",t.handleDocumentKeydown_)},this.listen("click",this.handleInteraction_),this.listen("keydown",this.handleInteraction_),this.listen(d.OPENING_EVENT,this.handleOpening_),this.listen(d.CLOSING_EVENT,this.handleClosing_)},e.prototype.destroy=function(){this.unlisten("click",this.handleInteraction_),this.unlisten("keydown",this.handleInteraction_),this.unlisten(d.OPENING_EVENT,this.handleOpening_),this.unlisten(d.CLOSING_EVENT,this.handleClosing_),this.handleClosing_(),this.buttonRipples_.forEach(function(t){return t.destroy()}),t.prototype.destroy.call(this)},e.prototype.layout=function(){this.foundation_.layout()},e.prototype.open=function(){this.foundation_.open()},e.prototype.close=function(t){void 0===t&&(t=""),this.foundation_.close(t)},e.prototype.getDefaultFoundation=function(){var t=this,e={addBodyClass:function(t){return document.body.classList.add(t)},addClass:function(e){return t.root_.classList.add(e)},areButtonsStacked:function(){return l.areTopsMisaligned(t.buttons_)},clickDefaultButton:function(){return t.defaultButton_&&t.defaultButton_.click()},eventTargetMatches:function(t,e){return!!t&&a.matches(t,e)},getActionFromEvent:function(t){if(!t.target)return"";var e=a.closest(t.target,"["+d.ACTION_ATTRIBUTE+"]");return e&&e.getAttribute(d.ACTION_ATTRIBUTE)},hasClass:function(e){return t.root_.classList.contains(e)},isContentScrollable:function(){return l.isScrollable(t.content_)},notifyClosed:function(e){return t.emit(d.CLOSED_EVENT,e?{action:e}:{})},notifyClosing:function(e){return t.emit(d.CLOSING_EVENT,e?{action:e}:{})},notifyOpened:function(){return t.emit(d.OPENED_EVENT,{})},notifyOpening:function(){return t.emit(d.OPENING_EVENT,{})},releaseFocus:function(){return t.focusTrap_.deactivate()},removeBodyClass:function(t){return document.body.classList.remove(t)},removeClass:function(e){return t.root_.classList.remove(e)},reverseButtons:function(){t.buttons_.reverse(),t.buttons_.forEach(function(t){t.parentElement.appendChild(t)})},trapFocus:function(){return t.focusTrap_.activate()}};return new u.MDCDialogFoundation(e)},e}(s.MDCComponent);e.MDCDialog=f},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={CLOSING:"mdc-dialog--closing",OPEN:"mdc-dialog--open",OPENING:"mdc-dialog--opening",SCROLLABLE:"mdc-dialog--scrollable",SCROLL_LOCK:"mdc-dialog-scroll-lock",STACKED:"mdc-dialog--stacked"},e.strings={ACTION_ATTRIBUTE:"data-mdc-dialog-action",BUTTON_SELECTOR:".mdc-dialog__button",CLOSED_EVENT:"MDCDialog:closed",CLOSE_ACTION:"close",CLOSING_EVENT:"MDCDialog:closing",CONTAINER_SELECTOR:".mdc-dialog__container",CONTENT_SELECTOR:".mdc-dialog__content",DEFAULT_BUTTON_SELECTOR:".mdc-dialog__button--default",DESTROY_ACTION:"destroy",OPENED_EVENT:"MDCDialog:opened",OPENING_EVENT:"MDCDialog:opening",SCRIM_SELECTOR:".mdc-dialog__scrim",SUPPRESS_DEFAULT_PRESS_SELECTOR:["textarea",".mdc-menu .mdc-list-item"].join(", "),SURFACE_SELECTOR:".mdc-dialog__surface"},e.numbers={DIALOG_ANIMATION_CLOSE_TIME_MS:75,DIALOG_ANIMATION_OPEN_TIME_MS:150}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(31));e.util=o,r(n(102)),r(n(14)),r(n(35))},function(t,e){function n(t,e){e=e||{};var n=t.ownerDocument||t,i=[],o=[],s=new C(n),u=t.querySelectorAll(m);e.includeContainer&&g.call(t,m)&&(u=Array.prototype.slice.apply(u),u.unshift(t));var l,d,f;for(l=0;l<u.length;l++)d=u[l],r(d,s)&&(f=a(d),0===f?i.push(d):o.push({documentOrder:l,tabIndex:f,node:d}));return o.sort(c).map(function(t){return t.node}).concat(i)}function r(t,e){return!(!o(t,e)||_(t)||a(t)<0)}function i(t,e){if(!t)throw new Error("No node provided");return!1!==g.call(t,m)&&r(t,e)}function o(t,e){return e=e||new C(t.ownerDocument||t),!(t.disabled||f(t)||e.isUntouchable(t))}function s(t,e){if(!t)throw new Error("No node provided");return!1!==g.call(t,E)&&o(t,e)}function a(t){var e=parseInt(t.getAttribute("tabindex"),10);return isNaN(e)?l(t)?0:t.tabIndex:e}function c(t,e){return t.tabIndex===e.tabIndex?t.documentOrder-e.documentOrder:t.tabIndex-e.tabIndex}function u(t,e){for(var n=0,r=t.length;n<r;n++)if(e(t[n]))return t[n]}function l(t){return"true"===t.contentEditable}function d(t){return"INPUT"===t.tagName}function f(t){return d(t)&&"hidden"===t.type}function p(t){return d(t)&&"radio"===t.type}function _(t){return p(t)&&!y(t)}function h(t){for(var e=0;e<t.length;e++)if(t[e].checked)return t[e]}function y(t){if(!t.name)return!0;var e=t.ownerDocument.querySelectorAll('input[type="radio"][name="'+t.name+'"]'),n=h(e);return!n||n===t}function C(t){this.doc=t,this.cache=[]}var v=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'],m=v.join(","),g="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;n.isTabbable=i,n.isFocusable=s;var E=v.concat("iframe").join(",");C.prototype.hasDisplayNone=function(t,e){if(t.nodeType!==Node.ELEMENT_NODE)return!1;var n=u(this.cache,function(e){return e===t});if(n)return n[1];e=e||this.doc.defaultView.getComputedStyle(t);var r=!1;return"none"===e.display?r=!0:t.parentNode&&(r=this.hasDisplayNone(t.parentNode)),this.cache.push([t,r]),r},C.prototype.isUntouchable=function(t){if(t===this.doc.documentElement)return!1;var e=this.doc.defaultView.getComputedStyle(t);return!!this.hasDisplayNone(t,e)||"hidden"===e.visibility},t.exports=n},function(t,e){function n(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var i in n)r.call(n,i)&&(t[i]=n[i])}return t}t.exports=n;var r=Object.prototype.hasOwnProperty},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=n(33),c=n(7),u=i(n(32)),l=n(14),d=n(35),f=o(n(31)),p=l.MDCDismissibleDrawerFoundation.cssClasses,_=l.MDCDismissibleDrawerFoundation.strings,h=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"open",{get:function(){return this.foundation_.isOpen()},set:function(t){t?this.foundation_.open():this.foundation_.close()},enumerable:!0,configurable:!0}),e.prototype.initialize=function(t,e){void 0===t&&(t=u.default),void 0===e&&(e=function(t){return new a.MDCList(t)});var n=this.root_.querySelector("."+c.MDCListFoundation.cssClasses.ROOT);n&&(this.list_=e(n),this.list_.wrapFocus=!0),this.focusTrapFactory_=t},e.prototype.initialSyncWithDOM=function(){var t=this,e=p.MODAL,n=_.SCRIM_SELECTOR;this.scrim_=this.root_.parentNode.querySelector(n),this.scrim_&&this.root_.classList.contains(e)&&(this.handleScrimClick_=function(){return t.foundation_.handleScrimClick()},this.scrim_.addEventListener("click",this.handleScrimClick_),this.focusTrap_=f.createFocusTrapInstance(this.root_,this.focusTrapFactory_)),this.handleKeydown_=function(e){return t.foundation_.handleKeydown(e)},this.handleTransitionEnd_=function(e){return t.foundation_.handleTransitionEnd(e)},this.listen("keydown",this.handleKeydown_),this.listen("transitionend",this.handleTransitionEnd_)},e.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown_),this.unlisten("transitionend",this.handleTransitionEnd_),this.list_&&this.list_.destroy();var t=p.MODAL;this.scrim_&&this.handleScrimClick_&&this.root_.classList.contains(t)&&(this.scrim_.removeEventListener("click",this.handleScrimClick_),this.open=!1)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},elementHasClass:function(t,e){return t.classList.contains(e)},saveFocus:function(){return t.previousFocus_=document.activeElement},restoreFocus:function(){var e=t.previousFocus_;e&&e.focus&&t.root_.contains(document.activeElement)&&e.focus()},focusActiveNavigationItem:function(){var e=t.root_.querySelector("."+c.MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS);e&&e.focus()},notifyClose:function(){return t.emit(_.CLOSE_EVENT,{},!0)},notifyOpen:function(){return t.emit(_.OPEN_EVENT,{},!0)},trapFocus:function(){return t.focusTrap_.activate()},releaseFocus:function(){return t.focusTrap_.deactivate()}},n=p.DISMISSIBLE,r=p.MODAL;if(this.root_.classList.contains(n))return new l.MDCDismissibleDrawerFoundation(e);if(this.root_.classList.contains(r))return new d.MDCModalDrawerFoundation(e);throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are "+n+" and "+r+".")},e}(s.MDCComponent);e.MDCDrawer=h},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ANIMATE:"mdc-drawer--animate",CLOSING:"mdc-drawer--closing",DISMISSIBLE:"mdc-drawer--dismissible",MODAL:"mdc-drawer--modal",OPEN:"mdc-drawer--open",OPENING:"mdc-drawer--opening",ROOT:"mdc-drawer"};e.cssClasses=r;var i={APP_CONTENT_SELECTOR:".mdc-drawer-app-content",CLOSE_EVENT:"MDCDrawer:closed",OPEN_EVENT:"MDCDrawer:opened",SCRIM_SELECTOR:".mdc-drawer-scrim"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(16),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.shake=function(t){this.foundation_.shake(t)},e.prototype.float=function(t){this.foundation_.float(t)},e.prototype.getWidth=function(){return this.foundation_.getWidth()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},getWidth:function(){return t.root_.scrollWidth},registerInteractionHandler:function(e,n){return t.listen(e,n)},deregisterInteractionHandler:function(e,n){return t.unlisten(e,n)}};return new o.MDCFloatingLabelFoundation(e)},e}(i.MDCComponent);e.MDCFloatingLabel=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(107)),r(n(36))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(36),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"input",{get:function(){return this.input_},set:function(t){this.input_=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"label_",{get:function(){var t=o.MDCFormFieldFoundation.strings.LABEL_SELECTOR;return this.root_.querySelector(t)},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={activateInputRipple:function(){t.input_&&t.input_.ripple&&t.input_.ripple.activate()},deactivateInputRipple:function(){t.input_&&t.input_.ripple&&t.input_.ripple.deactivate()},deregisterInteractionHandler:function(e,n){t.label_&&t.label_.removeEventListener(e,n)},registerInteractionHandler:function(e,n){t.label_&&t.label_.addEventListener(e,n)}};return new o.MDCFormFieldFoundation(e)},e}(i.MDCComponent);e.MDCFormField=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ROOT:"mdc-form-field"},e.strings={LABEL_SELECTOR:".mdc-form-field > label"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(110)),r(n(37))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(37),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.getDefaultFoundation=function(){var t=this,e={deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getNumberOfTiles:function(){return t.root_.querySelectorAll(o.MDCGridListFoundation.strings.TILE_SELECTOR).length},getOffsetWidth:function(){return t.root_.offsetWidth},getOffsetWidthForTileAtIndex:function(e){return t.root_.querySelectorAll(o.MDCGridListFoundation.strings.TILE_SELECTOR)[e].offsetWidth},registerResizeHandler:function(t){return window.addEventListener("resize",t)},setStyleForTilesElement:function(e,n){t.root_.querySelector(o.MDCGridListFoundation.strings.TILES_SELECTOR).style[e]=n}};return new o.MDCGridListFoundation(e)},e}(i.MDCComponent);e.MDCGridList=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.strings={TILES_SELECTOR:".mdc-grid-list__tiles",TILE_SELECTOR:".mdc-grid-tile"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(113)),r(n(38))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(4),s=n(38),a=s.MDCIconButtonToggleFoundation.strings,c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ripple_=e.createRipple_(),e}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick_=function(){return t.foundation_.handleClick()},this.listen("click",this.handleClick_)},e.prototype.destroy=function(){this.unlisten("click",this.handleClick_),this.ripple_.destroy(),t.prototype.destroy.call(this)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},hasClass:function(e){return t.root_.classList.contains(e)},notifyChange:function(e){return t.emit(a.CHANGE_EVENT,e)},removeClass:function(e){return t.root_.classList.remove(e)},setAttr:function(e,n){return t.root_.setAttribute(e,n)}};return new s.MDCIconButtonToggleFoundation(e)},Object.defineProperty(e.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"on",{get:function(){return this.foundation_.isOn()},set:function(t){this.foundation_.toggle(t)},enumerable:!0,configurable:!0}),e.prototype.createRipple_=function(){var t=new o.MDCRipple(this.root_);return t.unbounded=!0,t},e}(i.MDCComponent);e.MDCIconButtonToggle=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ICON_BUTTON_ON:"mdc-icon-button--on",ROOT:"mdc-icon-button"},e.strings={ARIA_PRESSED:"aria-pressed",CHANGE_EVENT:"MDCIconButtonToggle:change"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(39),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.activate=function(){this.foundation_.activate()},e.prototype.deactivate=function(){this.foundation_.deactivate()},e.prototype.setRippleCenter=function(t){this.foundation_.setRippleCenter(t)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},setStyle:function(e,n){return t.root_.style.setProperty(e,n)},registerEventHandler:function(e,n){return t.listen(e,n)},deregisterEventHandler:function(e,n){return t.unlisten(e,n)}};return new o.MDCLineRippleFoundation(e)},e}(i.MDCComponent);e.MDCLineRipple=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"};e.cssClasses=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(118)),r(n(40))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(40),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"determinate",{set:function(t){this.foundation_.setDeterminate(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"progress",{set:function(t){this.foundation_.setProgress(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{set:function(t){this.foundation_.setBuffer(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reverse",{set:function(t){this.foundation_.setReverse(t)},enumerable:!0,configurable:!0}),e.prototype.open=function(){this.foundation_.open()},e.prototype.close=function(){this.foundation_.close()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},getBuffer:function(){return t.root_.querySelector(o.MDCLinearProgressFoundation.strings.BUFFER_SELECTOR)},getPrimaryBar:function(){return t.root_.querySelector(o.MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR)},hasClass:function(e){return t.root_.classList.contains(e)},removeClass:function(e){return t.root_.classList.remove(e)},setStyle:function(t,e,n){return t.style.setProperty(e,n)}};return new o.MDCLinearProgressFoundation(e)},e}(i.MDCComponent);e.MDCLinearProgress=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={CLOSED_CLASS:"mdc-linear-progress--closed",INDETERMINATE_CLASS:"mdc-linear-progress--indeterminate",REVERSED_CLASS:"mdc-linear-progress--reversed"},e.strings={BUFFER_SELECTOR:".mdc-linear-progress__buffer",PRIMARY_BAR_SELECTOR:".mdc-linear-progress__primary-bar"}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(5),a=n(8),c=i(n(43)),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialSyncWithDOM=function(){var t=this,e=this.root_.parentElement;this.anchorElement=e&&e.classList.contains(s.cssClasses.ANCHOR)?e:null,this.root_.classList.contains(s.cssClasses.FIXED)&&this.setFixedPosition(!0),this.handleKeydown_=function(e){return t.foundation_.handleKeydown(e)},this.handleBodyClick_=function(e){return t.foundation_.handleBodyClick(e)},this.registerBodyClickListener_=function(){return document.body.addEventListener("click",t.handleBodyClick_)},this.deregisterBodyClickListener_=function(){return document.body.removeEventListener("click",t.handleBodyClick_)},this.listen("keydown",this.handleKeydown_),this.listen(s.strings.OPENED_EVENT,this.registerBodyClickListener_),this.listen(s.strings.CLOSED_EVENT,this.deregisterBodyClickListener_)},e.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown_),this.unlisten(s.strings.OPENED_EVENT,this.registerBodyClickListener_),this.unlisten(s.strings.CLOSED_EVENT,this.deregisterBodyClickListener_),t.prototype.destroy.call(this)},Object.defineProperty(e.prototype,"open",{get:function(){return this.foundation_.isOpen()},set:function(t){if(t){var e=this.root_.querySelectorAll(s.strings.FOCUSABLE_ELEMENTS);this.firstFocusableElement_=e[0],this.lastFocusableElement_=e[e.length-1],this.foundation_.open()}else this.foundation_.close()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"quickOpen",{set:function(t){this.foundation_.setQuickOpen(t)},enumerable:!0,configurable:!0}),e.prototype.hoistMenuToBody=function(){document.body.appendChild(this.root_),this.setIsHoisted(!0)},e.prototype.setIsHoisted=function(t){this.foundation_.setIsHoisted(t)},e.prototype.setMenuSurfaceAnchorElement=function(t){this.anchorElement=t},e.prototype.setFixedPosition=function(t){t?this.root_.classList.add(s.cssClasses.FIXED):this.root_.classList.remove(s.cssClasses.FIXED),this.foundation_.setFixedPosition(t)},e.prototype.setAbsolutePosition=function(t,e){this.foundation_.setAbsolutePosition(t,e),this.setIsHoisted(!0)},e.prototype.setAnchorCorner=function(t){this.foundation_.setAnchorCorner(t)},e.prototype.setAnchorMargin=function(t){this.foundation_.setAnchorMargin(t)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},hasAnchor:function(){return!!t.anchorElement},notifyClose:function(){return t.emit(a.MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,{})},notifyOpen:function(){return t.emit(a.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,{})},isElementInContainer:function(e){return t.root_.contains(e)},isRtl:function(){return"rtl"===getComputedStyle(t.root_).getPropertyValue("direction")},setTransformOrigin:function(e){var n=c.getTransformPropertyName(window)+"-origin";t.root_.style.setProperty(n,e)},isFocused:function(){return document.activeElement===t.root_},saveFocus:function(){t.previousFocus_=document.activeElement},restoreFocus:function(){t.root_.contains(document.activeElement)&&t.previousFocus_&&t.previousFocus_.focus&&t.previousFocus_.focus()},isFirstElementFocused:function(){return!!t.firstFocusableElement_&&t.firstFocusableElement_===document.activeElement},isLastElementFocused:function(){return!!t.lastFocusableElement_&&t.lastFocusableElement_===document.activeElement},focusFirstElement:function(){return t.firstFocusableElement_&&t.firstFocusableElement_.focus&&t.firstFocusableElement_.focus()},focusLastElement:function(){return t.lastFocusableElement_&&t.lastFocusableElement_.focus&&t.lastFocusableElement_.focus()},getInnerDimensions:function(){return{width:t.root_.offsetWidth,height:t.root_.offsetHeight}},getAnchorDimensions:function(){return t.anchorElement?t.anchorElement.getBoundingClientRect():null},getWindowDimensions:function(){return{width:window.innerWidth,height:window.innerHeight}},getBodyDimensions:function(){return{width:document.body.clientWidth,height:document.body.clientHeight}},getWindowScroll:function(){return{x:window.pageXOffset,y:window.pageYOffset}},setPosition:function(e){t.root_.style.left="left"in e?e.left+"px":"",t.root_.style.right="right"in e?e.right+"px":"",t.root_.style.top="top"in e?e.top+"px":"",t.root_.style.bottom="bottom"in e?e.bottom+"px":""},setMaxHeight:function(e){t.root_.style.maxHeight=e}};return new a.MDCMenuSurfaceFoundation(e)},e}(o.MDCComponent);e.MDCMenuSurface=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(41),s=n(8),a=n(42),c=n(18),u=n(45),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new a.MDCMenuSurface(t)}),void 0===e&&(e=function(t){return new o.MDCList(t)}),this.menuSurfaceFactory_=t,this.listFactory_=e},e.prototype.initialSyncWithDOM=function(){var t=this;this.menuSurface_=this.menuSurfaceFactory_(this.root_);var e=this.root_.querySelector(c.strings.LIST_SELECTOR);e?(this.list_=this.listFactory_(e),this.list_.wrapFocus=!0):this.list_=null,this.handleKeydown_=function(e){return t.foundation_.handleKeydown(e)},this.handleItemAction_=function(e){return t.foundation_.handleItemAction(t.items[e.detail.index])},this.afterOpenedCallback_=function(){return t.handleAfterOpened_()},this.menuSurface_.listen(s.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,this.afterOpenedCallback_),this.listen("keydown",this.handleKeydown_),this.listen(o.MDCListFoundation.strings.ACTION_EVENT,this.handleItemAction_)},e.prototype.destroy=function(){this.list_&&this.list_.destroy(),this.menuSurface_.destroy(),this.menuSurface_.unlisten(s.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,this.afterOpenedCallback_),this.unlisten("keydown",this.handleKeydown_),this.unlisten(o.MDCListFoundation.strings.ACTION_EVENT,this.handleItemAction_),t.prototype.destroy.call(this)},Object.defineProperty(e.prototype,"open",{get:function(){return this.menuSurface_.open},set:function(t){this.menuSurface_.open=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"wrapFocus",{get:function(){return!!this.list_&&this.list_.wrapFocus},set:function(t){this.list_&&(this.list_.wrapFocus=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){return this.list_?this.list_.listElements:[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"quickOpen",{set:function(t){this.menuSurface_.quickOpen=t},enumerable:!0,configurable:!0}),e.prototype.setAnchorCorner=function(t){this.menuSurface_.setAnchorCorner(t)},e.prototype.setAnchorMargin=function(t){this.menuSurface_.setAnchorMargin(t)},e.prototype.getOptionByIndex=function(t){return t<this.items.length?this.items[t]:null},e.prototype.setFixedPosition=function(t){this.menuSurface_.setFixedPosition(t)},e.prototype.hoistMenuToBody=function(){this.menuSurface_.hoistMenuToBody()},e.prototype.setIsHoisted=function(t){this.menuSurface_.setIsHoisted(t)},e.prototype.setAbsolutePosition=function(t,e){this.menuSurface_.setAbsolutePosition(t,e)},e.prototype.setAnchorElement=function(t){this.menuSurface_.anchorElement=t},e.prototype.getDefaultFoundation=function(){var t=this,e={addClassToElementAtIndex:function(e,n){t.items[e].classList.add(n)},removeClassFromElementAtIndex:function(e,n){t.items[e].classList.remove(n)},addAttributeToElementAtIndex:function(e,n,r){t.items[e].setAttribute(n,r)},removeAttributeFromElementAtIndex:function(e,n){t.items[e].removeAttribute(n)},elementContainsClass:function(t,e){return t.classList.contains(e)},closeSurface:function(){return t.open=!1},getElementIndex:function(e){return t.items.indexOf(e)},getParentElement:function(t){return t.parentElement},getSelectedElementIndex:function(e){var n=e.querySelector("."+c.cssClasses.MENU_SELECTED_LIST_ITEM);return n?t.items.indexOf(n):-1},notifySelected:function(e){return t.emit(c.strings.SELECTED_EVENT,{index:e.index,item:t.items[e.index]})}};return new u.MDCMenuFoundation(e)},e.prototype.handleAfterOpened_=function(){var t=this.items;t.length>0&&t[0].focus()},e}(i.MDCComponent);e.MDCMenu=l},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(16),s=n(46),a=n(47),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialSyncWithDOM=function(){this.notchElement_=this.root_.querySelector(s.strings.NOTCH_ELEMENT_SELECTOR);var t=this.root_.querySelector("."+o.MDCFloatingLabelFoundation.cssClasses.ROOT);t?(t.style.transitionDuration="0s",this.root_.classList.add(s.cssClasses.OUTLINE_UPGRADED),requestAnimationFrame(function(){t.style.transitionDuration=""})):this.root_.classList.add(s.cssClasses.NO_LABEL)},e.prototype.notch=function(t){this.foundation_.notch(t)},e.prototype.closeNotch=function(){this.foundation_.closeNotch()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},setNotchWidthProperty:function(e){return t.notchElement_.style.setProperty("width",e+"px")},removeNotchWidthProperty:function(){return t.notchElement_.style.removeProperty("width")}};return new a.MDCNotchedOutlineFoundation(e)},e}(i.MDCComponent);e.MDCNotchedOutline=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(124)),r(n(48))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(3),a=n(48),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ripple_=e.createRipple_(),e}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.nativeControl_.checked=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this.nativeControl_.value},set:function(t){this.nativeControl_.value=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.ripple_.destroy(),t.prototype.destroy.call(this)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},setNativeControlDisabled:function(e){return t.nativeControl_.disabled=e}};return new a.MDCRadioFoundation(e)},e.prototype.createRipple_=function(){var t=this,e=i({},s.MDCRipple.createAdapter(this),{registerInteractionHandler:function(e,n){return t.nativeControl_.addEventListener(e,n)},deregisterInteractionHandler:function(e,n){return t.nativeControl_.removeEventListener(e,n)},isSurfaceActive:function(){return!1},isUnbounded:function(){return!0}});return new s.MDCRipple(this.root_,new s.MDCRippleFoundation(e))},Object.defineProperty(e.prototype,"nativeControl_",{get:function(){var t=a.MDCRadioFoundation.strings.NATIVE_CONTROL_SELECTOR,e=this.root_.querySelector(t);if(!e)throw new Error("Radio component requires a "+t+" element");return e},enumerable:!0,configurable:!0}),e}(o.MDCComponent);e.MDCRadio=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={NATIVE_CONTROL_SELECTOR:".mdc-radio__native-control"};e.strings=r;var i={DISABLED:"mdc-radio--disabled",ROOT:"mdc-radio"};e.cssClasses=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(127)),r(n(50)),r(n(51)),r(n(53))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)},o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=n(15),c=n(17),u=o(n(5)),l=o(n(18)),d=n(44),f=n(19),p=n(3),_=n(49),h=n(50),y=n(51),C=n(53),v=["mousedown","touchstart"],m=["required","aria-required"],g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e,n,r,i,o){void 0===t&&(t=function(t){return new a.MDCFloatingLabel(t)}),void 0===e&&(e=function(t){return new c.MDCLineRipple(t)}),void 0===n&&(n=function(t){return new f.MDCNotchedOutline(t)}),void 0===r&&(r=function(t){return new d.MDCMenu(t)}),void 0===i&&(i=function(t){return new C.MDCSelectIcon(t)}),void 0===o&&(o=function(t){return new y.MDCSelectHelperText(t)}),this.isMenuOpen_=!1,this.nativeControl_=this.root_.querySelector(_.strings.NATIVE_CONTROL_SELECTOR),this.selectedText_=this.root_.querySelector(_.strings.SELECTED_TEXT_SELECTOR);var s=this.nativeControl_||this.selectedText_;if(!s)throw new Error("MDCSelect: Missing required element: Exactly one of the following selectors must be present: '"+_.strings.NATIVE_CONTROL_SELECTOR+"' or '"+_.strings.SELECTED_TEXT_SELECTOR+"'");if(this.targetElement_=s,this.targetElement_.hasAttribute(_.strings.ARIA_CONTROLS)){var u=document.getElementById(this.targetElement_.getAttribute(_.strings.ARIA_CONTROLS));u&&(this.helperText_=o(u))}this.selectedText_&&this.enhancedSelectSetup_(r);var l=this.root_.querySelector(_.strings.LABEL_SELECTOR);this.label_=l?t(l):null;var p=this.root_.querySelector(_.strings.LINE_RIPPLE_SELECTOR);this.lineRipple_=p?e(p):null;var h=this.root_.querySelector(_.strings.OUTLINE_SELECTOR);this.outline_=h?n(h):null;var v=this.root_.querySelector(_.strings.LEADING_ICON_SELECTOR);v&&(this.root_.classList.add(_.cssClasses.WITH_LEADING_ICON),this.leadingIcon_=i(v),this.menuElement_&&this.menuElement_.classList.add(_.cssClasses.WITH_LEADING_ICON)),this.root_.classList.contains(_.cssClasses.OUTLINED)||(this.ripple=this.createRipple_()),this.initialSyncRequiredState_(),this.addMutationObserverForRequired_()},e.prototype.initialSyncWithDOM=function(){var t=this;if(this.handleChange_=function(){return t.foundation_.handleChange(!0)},this.handleFocus_=function(){return t.foundation_.handleFocus()},this.handleBlur_=function(){return t.foundation_.handleBlur()},this.handleClick_=function(e){t.selectedText_&&t.selectedText_.focus(),t.foundation_.handleClick(t.getNormalizedXCoordinate_(e))},this.handleKeydown_=function(e){return t.foundation_.handleKeydown(e)},this.handleMenuSelected_=function(e){return t.selectedIndex=e.detail.index},this.handleMenuOpened_=function(){if(t.selectedIndex>=0){t.menu_.items[t.selectedIndex].focus()}},this.handleMenuClosed_=function(){t.isMenuOpen_=!1,t.selectedText_.removeAttribute("aria-expanded"),document.activeElement!==t.selectedText_&&t.foundation_.handleBlur()},this.targetElement_.addEventListener("change",this.handleChange_),this.targetElement_.addEventListener("focus",this.handleFocus_),this.targetElement_.addEventListener("blur",this.handleBlur_),v.forEach(function(e){t.targetElement_.addEventListener(e,t.handleClick_)}),this.menuElement_)if(this.selectedText_.addEventListener("keydown",this.handleKeydown_),this.menu_.listen(u.strings.CLOSED_EVENT,this.handleMenuClosed_),this.menu_.listen(u.strings.OPENED_EVENT,this.handleMenuOpened_),this.menu_.listen(l.strings.SELECTED_EVENT,this.handleMenuSelected_),this.hiddenInput_&&this.hiddenInput_.value){var e=this.getEnhancedSelectAdapterMethods_();e.setValue(this.hiddenInput_.value)}else if(this.menuElement_.querySelector(_.strings.SELECTED_ITEM_SELECTOR)){var e=this.getEnhancedSelectAdapterMethods_();e.setValue(e.getValue())}this.foundation_.handleChange(!1),(this.root_.classList.contains(_.cssClasses.DISABLED)||this.nativeControl_&&this.nativeControl_.disabled)&&(this.disabled=!0)},e.prototype.destroy=function(){var e=this;this.targetElement_.removeEventListener("change",this.handleChange_),this.targetElement_.removeEventListener("focus",this.handleFocus_),this.targetElement_.removeEventListener("blur",this.handleBlur_),this.targetElement_.removeEventListener("keydown",this.handleKeydown_),v.forEach(function(t){e.targetElement_.removeEventListener(t,e.handleClick_)}),this.menu_&&(this.menu_.unlisten(u.strings.CLOSED_EVENT,this.handleMenuClosed_),this.menu_.unlisten(u.strings.OPENED_EVENT,this.handleMenuOpened_),this.menu_.unlisten(l.strings.SELECTED_EVENT,this.handleMenuSelected_),this.menu_.destroy()),this.ripple&&this.ripple.destroy(),this.outline_&&this.outline_.destroy(),this.leadingIcon_&&this.leadingIcon_.destroy(),this.helperText_&&this.helperText_.destroy(),this.validationObserver_&&this.validationObserver_.disconnect(),t.prototype.destroy.call(this)},Object.defineProperty(e.prototype,"value",{get:function(){return this.foundation_.getValue()},set:function(t){this.foundation_.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selectedIndex",{get:function(){var t=-1;if(this.menuElement_&&this.menu_){var e=this.menuElement_.querySelector(_.strings.SELECTED_ITEM_SELECTOR);t=this.menu_.items.indexOf(e)}else this.nativeControl_&&(t=this.nativeControl_.selectedIndex);return t},set:function(t){this.foundation_.setSelectedIndex(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.root_.classList.contains(_.cssClasses.DISABLED)||!!this.nativeControl_&&this.nativeControl_.disabled},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"leadingIconAriaLabel",{set:function(t){this.foundation_.setLeadingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"leadingIconContent",{set:function(t){this.foundation_.setLeadingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"helperTextContent",{set:function(t){this.foundation_.setHelperTextContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valid",{get:function(){return this.foundation_.isValid()},set:function(t){this.foundation_.setValid(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"required",{get:function(){return this.nativeControl_?this.nativeControl_.required:"true"===this.selectedText_.getAttribute("aria-required")},set:function(t){this.nativeControl_?this.nativeControl_.required=t:t?this.selectedText_.setAttribute("aria-required",t.toString()):this.selectedText_.removeAttribute("aria-required")},enumerable:!0,configurable:!0}),e.prototype.layout=function(){this.foundation_.layout()},e.prototype.getDefaultFoundation=function(){var t=i({},this.nativeControl_?this.getNativeSelectAdapterMethods_():this.getEnhancedSelectAdapterMethods_(),this.getCommonAdapterMethods_(),this.getOutlineAdapterMethods_(),this.getLabelAdapterMethods_());return new h.MDCSelectFoundation(t,this.getFoundationMap_())},e.prototype.enhancedSelectSetup_=function(t){var e=this.root_.classList.contains(_.cssClasses.DISABLED);this.selectedText_.setAttribute("tabindex",e?"-1":"0"),this.hiddenInput_=this.root_.querySelector(_.strings.HIDDEN_INPUT_SELECTOR),this.menuElement_=this.root_.querySelector(_.strings.MENU_SELECTOR),this.menu_=t(this.menuElement_),this.menu_.hoistMenuToBody(),this.menu_.setAnchorElement(this.root_),this.menu_.setAnchorCorner(u.Corner.BOTTOM_START),this.menu_.wrapFocus=!1},e.prototype.createRipple_=function(){var t=this,e=i({},p.MDCRipple.createAdapter(this),{registerInteractionHandler:function(e,n){return t.targetElement_.addEventListener(e,n)},deregisterInteractionHandler:function(e,n){return t.targetElement_.removeEventListener(e,n)}});return new p.MDCRipple(this.root_,new p.MDCRippleFoundation(e))},e.prototype.getNativeSelectAdapterMethods_=function(){var t=this;return{getValue:function(){return t.nativeControl_.value},setValue:function(e){t.nativeControl_.value=e},openMenu:function(){},closeMenu:function(){},isMenuOpen:function(){return!1},setSelectedIndex:function(e){t.nativeControl_.selectedIndex=e},setDisabled:function(e){t.nativeControl_.disabled=e},setValid:function(e){e?t.root_.classList.remove(_.cssClasses.INVALID):t.root_.classList.add(_.cssClasses.INVALID)},checkValidity:function(){return t.nativeControl_.checkValidity()}}},e.prototype.getEnhancedSelectAdapterMethods_=function(){var t=this;return{getValue:function(){var e=t.menuElement_.querySelector(_.strings.SELECTED_ITEM_SELECTOR);return e&&e.hasAttribute(_.strings.ENHANCED_VALUE_ATTR)?e.getAttribute(_.strings.ENHANCED_VALUE_ATTR)||"":""},setValue:function(e){var n=t.menuElement_.querySelector("["+_.strings.ENHANCED_VALUE_ATTR+'="'+e+'"]');t.setEnhancedSelectedIndex_(n?t.menu_.items.indexOf(n):-1)},openMenu:function(){t.menu_&&!t.menu_.open&&(t.menu_.open=!0,t.isMenuOpen_=!0,t.selectedText_.setAttribute("aria-expanded","true"))},closeMenu:function(){t.menu_&&t.menu_.open&&(t.menu_.open=!1)},isMenuOpen:function(){return Boolean(t.menu_)&&t.isMenuOpen_},setSelectedIndex:function(e){return t.setEnhancedSelectedIndex_(e)},setDisabled:function(e){t.selectedText_.setAttribute("tabindex",e?"-1":"0"),t.selectedText_.setAttribute("aria-disabled",e.toString()),t.hiddenInput_&&(t.hiddenInput_.disabled=e)},checkValidity:function(){var e=t.root_.classList;return!(e.contains(_.cssClasses.REQUIRED)&&!e.contains(_.cssClasses.DISABLED))||-1!==t.selectedIndex&&(0!==t.selectedIndex||Boolean(t.value))},setValid:function(e){t.selectedText_.setAttribute("aria-invalid",(!e).toString()),e?t.root_.classList.remove(_.cssClasses.INVALID):t.root_.classList.add(_.cssClasses.INVALID)}}},e.prototype.getCommonAdapterMethods_=function(){var t=this;return{addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},setRippleCenter:function(e){return t.lineRipple_&&t.lineRipple_.setRippleCenter(e)},activateBottomLine:function(){return t.lineRipple_&&t.lineRipple_.activate()},deactivateBottomLine:function(){return t.lineRipple_&&t.lineRipple_.deactivate()},notifyChange:function(e){var n=t.selectedIndex;t.emit(_.strings.CHANGE_EVENT,{value:e,index:n},!0)}}},e.prototype.getOutlineAdapterMethods_=function(){var t=this;return{hasOutline:function(){return Boolean(t.outline_)},notchOutline:function(e){return t.outline_&&t.outline_.notch(e)},closeOutline:function(){return t.outline_&&t.outline_.closeNotch()}}},e.prototype.getLabelAdapterMethods_=function(){var t=this;return{floatLabel:function(e){return t.label_&&t.label_.float(e)},getLabelWidth:function(){return t.label_?t.label_.getWidth():0}}},e.prototype.getNormalizedXCoordinate_=function(t){var e=t.target.getBoundingClientRect();return(this.isTouchEvent_(t)?t.touches[0].clientX:t.clientX)-e.left},e.prototype.isTouchEvent_=function(t){return Boolean(t.touches)},e.prototype.getFoundationMap_=function(){return{helperText:this.helperText_?this.helperText_.foundation:void 0,leadingIcon:this.leadingIcon_?this.leadingIcon_.foundation:void 0}},e.prototype.setEnhancedSelectedIndex_=function(t){var e=this.menu_.items[t];this.selectedText_.textContent=e?e.textContent.trim():"";var n=this.menuElement_.querySelector(_.strings.SELECTED_ITEM_SELECTOR);n&&(n.classList.remove(_.cssClasses.SELECTED_ITEM_CLASS),n.removeAttribute(_.strings.ARIA_SELECTED_ATTR)),e&&(e.classList.add(_.cssClasses.SELECTED_ITEM_CLASS),e.setAttribute(_.strings.ARIA_SELECTED_ATTR,"true")),this.hiddenInput_&&(this.hiddenInput_.value=e?e.getAttribute(_.strings.ENHANCED_VALUE_ATTR)||"":""),this.layout()},e.prototype.initialSyncRequiredState_=function(){(this.targetElement_.required||"true"===this.targetElement_.getAttribute("aria-required")||this.root_.classList.contains(_.cssClasses.REQUIRED))&&(this.nativeControl_?this.nativeControl_.required=!0:this.selectedText_.setAttribute("aria-required","true"),this.root_.classList.add(_.cssClasses.REQUIRED))},e.prototype.addMutationObserverForRequired_=function(){var t=this,e=function(e){e.some(function(e){return-1!==m.indexOf(e)&&(t.selectedText_?"true"===t.selectedText_.getAttribute("aria-required")?t.root_.classList.add(_.cssClasses.REQUIRED):t.root_.classList.remove(_.cssClasses.REQUIRED):t.nativeControl_.required?t.root_.classList.add(_.cssClasses.REQUIRED):t.root_.classList.remove(_.cssClasses.REQUIRED),!0)})},n=function(t){return t.map(function(t){return t.attributeName}).filter(function(t){return t})},r=new MutationObserver(function(t){return e(n(t))});r.observe(this.targetElement_,{attributes:!0}),this.validationObserver_=r},e}(s.MDCComponent);e.MDCSelect=g},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(52),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"foundation",{get:function(){return this.foundation_},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},setAttr:function(e,n){return t.root_.setAttribute(e,n)},removeAttr:function(e){return t.root_.removeAttribute(e)},setContent:function(e){t.root_.textContent=e}};return new o.MDCSelectHelperTextFoundation(e)},e}(i.MDCComponent);e.MDCSelectHelperText=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ARIA_HIDDEN:"aria-hidden",ROLE:"role"};e.strings=r;var i={HELPER_TEXT_PERSISTENT:"mdc-select-helper-text--persistent",HELPER_TEXT_VALIDATION_MSG:"mdc-select-helper-text--validation-msg"};e.cssClasses=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(54),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"foundation",{get:function(){return this.foundation_},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={getAttr:function(e){return t.root_.getAttribute(e)},setAttr:function(e,n){return t.root_.setAttribute(e,n)},removeAttr:function(e){return t.root_.removeAttribute(e)},setContent:function(e){t.root_.textContent=e},registerInteractionHandler:function(e,n){return t.listen(e,n)},deregisterInteractionHandler:function(e,n){return t.unlisten(e,n)},notifyIconAction:function(){return t.emit(o.MDCSelectIconFoundation.strings.ICON_EVENT,{},!0)}};return new o.MDCSelectIconFoundation(e)},e}(i.MDCComponent);e.MDCSelectIcon=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ICON_EVENT:"MDCSelect:icon",ICON_ROLE:"button"};e.strings=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(133)),r(n(56))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(55),s=n(56),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"value",{get:function(){return this.foundation_.getValue()},set:function(t){this.foundation_.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"min",{get:function(){return this.foundation_.getMin()},set:function(t){this.foundation_.setMin(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"max",{get:function(){return this.foundation_.getMax()},set:function(t){this.foundation_.setMax(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"step",{get:function(){return this.foundation_.getStep()},set:function(t){this.foundation_.setStep(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.foundation_.isDisabled()},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),e.prototype.initialize=function(){this.thumbContainer_=this.root_.querySelector(o.strings.THUMB_CONTAINER_SELECTOR),this.track_=this.root_.querySelector(o.strings.TRACK_SELECTOR),this.pinValueMarker_=this.root_.querySelector(o.strings.PIN_VALUE_MARKER_SELECTOR),this.trackMarkerContainer_=this.root_.querySelector(o.strings.TRACK_MARKER_CONTAINER_SELECTOR)},e.prototype.getDefaultFoundation=function(){var t=this,e={hasClass:function(e){return t.root_.classList.contains(e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},getAttribute:function(e){return t.root_.getAttribute(e)},setAttribute:function(e,n){return t.root_.setAttribute(e,n)},removeAttribute:function(e){return t.root_.removeAttribute(e)},computeBoundingRect:function(){return t.root_.getBoundingClientRect()},getTabIndex:function(){return t.root_.tabIndex},registerInteractionHandler:function(e,n){return t.listen(e,n)},deregisterInteractionHandler:function(e,n){return t.unlisten(e,n)},registerThumbContainerInteractionHandler:function(e,n){t.thumbContainer_.addEventListener(e,n)},deregisterThumbContainerInteractionHandler:function(e,n){t.thumbContainer_.removeEventListener(e,n)},registerBodyInteractionHandler:function(t,e){return document.body.addEventListener(t,e)},deregisterBodyInteractionHandler:function(t,e){return document.body.removeEventListener(t,e)},registerResizeHandler:function(t){return window.addEventListener("resize",t)},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},notifyInput:function(){return t.emit(o.strings.INPUT_EVENT,t)},notifyChange:function(){return t.emit(o.strings.CHANGE_EVENT,t)},setThumbContainerStyleProperty:function(e,n){t.thumbContainer_.style.setProperty(e,n)},setTrackStyleProperty:function(e,n){return t.track_.style.setProperty(e,n)},setMarkerValue:function(e){return t.pinValueMarker_.innerText=e.toLocaleString()},appendTrackMarkers:function(e){for(var n=document.createDocumentFragment(),r=0;r<e;r++){var i=document.createElement("div");i.classList.add("mdc-slider__track-marker"),n.appendChild(i)}t.trackMarkerContainer_.appendChild(n)},removeTrackMarkers:function(){for(;t.trackMarkerContainer_.firstChild;)t.trackMarkerContainer_.removeChild(t.trackMarkerContainer_.firstChild)},setLastTrackMarkersStyleProperty:function(e,n){t.root_.querySelector(o.strings.LAST_TRACK_MARKER_SELECTOR).style.setProperty(e,n)},isRTL:function(){return"rtl"===getComputedStyle(t.root_).direction}};return new s.MDCSliderFoundation(e)},e.prototype.initialSyncWithDOM=function(){var t=this.parseFloat_(this.root_.getAttribute(o.strings.ARIA_VALUENOW),this.value),e=this.parseFloat_(this.root_.getAttribute(o.strings.ARIA_VALUEMIN),this.min),n=this.parseFloat_(this.root_.getAttribute(o.strings.ARIA_VALUEMAX),this.max);e>=this.max?(this.max=n,this.min=e):(this.min=e,this.max=n),this.step=this.parseFloat_(this.root_.getAttribute(o.strings.STEP_DATA_ATTR),this.step),this.value=t,this.disabled=this.root_.hasAttribute(o.strings.ARIA_DISABLED)&&"false"!==this.root_.getAttribute(o.strings.ARIA_DISABLED),this.foundation_.setupTrackMarker()},e.prototype.layout=function(){this.foundation_.layout()},e.prototype.stepUp=function(t){void 0===t&&(t=this.step||1),this.value+=t},e.prototype.stepDown=function(t){void 0===t&&(t=this.step||1),this.value-=t},e.prototype.parseFloat_=function(t,e){var n=parseFloat(t);return"number"==typeof n&&isFinite(n)?n:e},e}(i.MDCComponent);e.MDCSlider=a},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(57));e.util=o,r(n(135)),r(n(58))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(2),a=n(20),c=n(58),u=i(n(57)),l=a.strings.SURFACE_SELECTOR,d=a.strings.LABEL_SELECTOR,f=a.strings.ACTION_SELECTOR,p=a.strings.DISMISS_SELECTOR,_=a.strings.OPENING_EVENT,h=a.strings.OPENED_EVENT,y=a.strings.CLOSING_EVENT,C=a.strings.CLOSED_EVENT,v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){void 0===t&&(t=function(){return u.announce}),this.announce_=t()},e.prototype.initialSyncWithDOM=function(){var t=this;this.surfaceEl_=this.root_.querySelector(l),this.labelEl_=this.root_.querySelector(d),this.actionEl_=this.root_.querySelector(f),this.handleKeyDown_=function(e){return t.foundation_.handleKeyDown(e)},this.handleSurfaceClick_=function(e){var n=e.target;t.isActionButton_(n)?t.foundation_.handleActionButtonClick(e):t.isActionIcon_(n)&&t.foundation_.handleActionIconClick(e)},this.registerKeyDownHandler_(this.handleKeyDown_),this.registerSurfaceClickHandler_(this.handleSurfaceClick_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.deregisterKeyDownHandler_(this.handleKeyDown_),this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_)},e.prototype.open=function(){this.foundation_.open()},e.prototype.close=function(t){void 0===t&&(t=""),this.foundation_.close(t)},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},announce:function(){return t.announce_(t.labelEl_)},notifyClosed:function(e){return t.emit(C,e?{reason:e}:{})},notifyClosing:function(e){return t.emit(y,e?{reason:e}:{})},notifyOpened:function(){return t.emit(h,{})},notifyOpening:function(){return t.emit(_,{})},removeClass:function(e){return t.root_.classList.remove(e)}};return new c.MDCSnackbarFoundation(e)},Object.defineProperty(e.prototype,"timeoutMs",{get:function(){return this.foundation_.getTimeoutMs()},set:function(t){this.foundation_.setTimeoutMs(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"closeOnEscape",{get:function(){return this.foundation_.getCloseOnEscape()},set:function(t){this.foundation_.setCloseOnEscape(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isOpen",{get:function(){return this.foundation_.isOpen()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"labelText",{get:function(){return this.labelEl_.textContent},set:function(t){this.labelEl_.textContent=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionButtonText",{get:function(){return this.actionEl_.textContent},set:function(t){this.actionEl_.textContent=t},enumerable:!0,configurable:!0}),e.prototype.registerKeyDownHandler_=function(t){this.listen("keydown",t)},e.prototype.deregisterKeyDownHandler_=function(t){this.unlisten("keydown",t)},e.prototype.registerSurfaceClickHandler_=function(t){this.surfaceEl_.addEventListener("click",t)},e.prototype.deregisterSurfaceClickHandler_=function(t){this.surfaceEl_.removeEventListener("click",t)},e.prototype.isActionButton_=function(t){return Boolean(s.ponyfill.closest(t,f))},e.prototype.isActionIcon_=function(t){return Boolean(s.ponyfill.closest(t,p))},e}(o.MDCComponent);e.MDCSnackbar=v},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(137)),r(n(59))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)},o=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s},s=this&&this.__spread||function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(o(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),c=n(2),u=n(3),l=n(59),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ripple_=e.createRipple_(),e}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.ripple_.destroy(),this.nativeControl_.removeEventListener("change",this.changeHandler_)},e.prototype.initialSyncWithDOM=function(){var t=this;this.changeHandler_=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r;return(r=t.foundation_).handleChange.apply(r,s(e))},this.nativeControl_.addEventListener("change",this.changeHandler_),this.checked=this.checked},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},setNativeControlChecked:function(e){return t.nativeControl_.checked=e},setNativeControlDisabled:function(e){return t.nativeControl_.disabled=e}};return new l.MDCSwitchFoundation(e)},Object.defineProperty(e.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.foundation_.setChecked(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),e.prototype.createRipple_=function(){var t=this,e=l.MDCSwitchFoundation.strings.RIPPLE_SURFACE_SELECTOR,n=this.root_.querySelector(e),r=i({},u.MDCRipple.createAdapter(this),{addClass:function(t){return n.classList.add(t)},computeBoundingRect:function(){return n.getBoundingClientRect()},deregisterInteractionHandler:function(e,n){t.nativeControl_.removeEventListener(e,n)},isSurfaceActive:function(){return c.ponyfill.matches(t.nativeControl_,":active")},isUnbounded:function(){return!0},registerInteractionHandler:function(e,n){t.nativeControl_.addEventListener(e,n)},removeClass:function(t){return n.classList.remove(t)},updateCssVariable:function(t,e){n.style.setProperty(t,e)}});return new u.MDCRipple(this.root_,new u.MDCRippleFoundation(r))},Object.defineProperty(e.prototype,"nativeControl_",{get:function(){var t=l.MDCSwitchFoundation.strings.NATIVE_CONTROL_SELECTOR;return this.root_.querySelector(t)},enumerable:!0,configurable:!0}),e}(a.MDCComponent);e.MDCSwitch=d},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={CHECKED:"mdc-switch--checked",DISABLED:"mdc-switch--disabled"};e.cssClasses=r;var i={NATIVE_CONTROL_SELECTOR:".mdc-switch__native-control",RIPPLE_SURFACE_SELECTOR:".mdc-switch__thumb-underlay"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(140)),r(n(69))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(60),s=n(64),a=n(69),c=a.MDCTabBarFoundation.strings,u=0,l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.tabList_.forEach(function(e){return e.focusOnActivate=t})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useAutomaticActivation",{set:function(t){this.foundation_.setUseAutomaticActivation(t)},enumerable:!0,configurable:!0}),e.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new s.MDCTab(t)}),void 0===e&&(e=function(t){return new o.MDCTabScroller(t)}),this.tabList_=this.instantiateTabs_(t),this.tabScroller_=this.instantiateTabScroller_(e)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleTabInteraction_=function(e){return t.foundation_.handleTabInteraction(e)},this.handleKeyDown_=function(e){return t.foundation_.handleKeyDown(e)},this.listen(s.MDCTabFoundation.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.listen("keydown",this.handleKeyDown_);for(var e=0;e<this.tabList_.length;e++)if(this.tabList_[e].active){this.scrollIntoView(e);break}},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.unlisten(s.MDCTabFoundation.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.unlisten("keydown",this.handleKeyDown_),this.tabList_.forEach(function(t){return t.destroy()}),this.tabScroller_&&this.tabScroller_.destroy()},e.prototype.getDefaultFoundation=function(){var t=this,e={scrollTo:function(e){return t.tabScroller_.scrollTo(e)},incrementScroll:function(e){return t.tabScroller_.incrementScroll(e)},getScrollPosition:function(){return t.tabScroller_.getScrollPosition()},getScrollContentWidth:function(){return t.tabScroller_.getScrollContentWidth()},getOffsetWidth:function(){return t.root_.offsetWidth},isRTL:function(){return"rtl"===window.getComputedStyle(t.root_).getPropertyValue("direction")},setActiveTab:function(e){return t.foundation_.activateTab(e)},activateTabAtIndex:function(e,n){return t.tabList_[e].activate(n)},deactivateTabAtIndex:function(e){return t.tabList_[e].deactivate()},focusTabAtIndex:function(e){return t.tabList_[e].focus()},getTabIndicatorClientRectAtIndex:function(e){return t.tabList_[e].computeIndicatorClientRect()},getTabDimensionsAtIndex:function(e){return t.tabList_[e].computeDimensions()},getPreviousActiveTabIndex:function(){for(var e=0;e<t.tabList_.length;e++)if(t.tabList_[e].active)return e;return-1},getFocusedTabIndex:function(){var e=t.getTabElements_(),n=document.activeElement;return e.indexOf(n)},getIndexOfTabById:function(e){for(var n=0;n<t.tabList_.length;n++)if(t.tabList_[n].id===e)return n;return-1},getTabListLength:function(){return t.tabList_.length},notifyTabActivated:function(e){return t.emit(c.TAB_ACTIVATED_EVENT,{index:e},!0)}};return new a.MDCTabBarFoundation(e)},e.prototype.activateTab=function(t){this.foundation_.activateTab(t)},e.prototype.scrollIntoView=function(t){this.foundation_.scrollIntoView(t)},e.prototype.getTabElements_=function(){return[].slice.call(this.root_.querySelectorAll(c.TAB_SELECTOR))},e.prototype.instantiateTabs_=function(t){return this.getTabElements_().map(function(e){return e.id=e.id||"mdc-tab-"+ ++u,t(e)})},e.prototype.instantiateTabScroller_=function(t){var e=this.root_.querySelector(c.TAB_SCROLLER_SELECTOR);return e?t(e):null},e}(i.MDCComponent);e.MDCTabBar=l},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(2),a=n(63),c=i(n(61)),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(){this.area_=this.root_.querySelector(a.MDCTabScrollerFoundation.strings.AREA_SELECTOR),this.content_=this.root_.querySelector(a.MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleInteraction_=function(){return t.foundation_.handleInteraction()},this.handleTransitionEnd_=function(e){return t.foundation_.handleTransitionEnd(e)},this.area_.addEventListener("wheel",this.handleInteraction_),this.area_.addEventListener("touchstart",this.handleInteraction_),this.area_.addEventListener("pointerdown",this.handleInteraction_),this.area_.addEventListener("mousedown",this.handleInteraction_),this.area_.addEventListener("keydown",this.handleInteraction_),this.content_.addEventListener("transitionend",this.handleTransitionEnd_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.area_.removeEventListener("wheel",this.handleInteraction_),this.area_.removeEventListener("touchstart",this.handleInteraction_),this.area_.removeEventListener("pointerdown",this.handleInteraction_),this.area_.removeEventListener("mousedown",this.handleInteraction_),this.area_.removeEventListener("keydown",this.handleInteraction_),this.content_.removeEventListener("transitionend",this.handleTransitionEnd_)},e.prototype.getDefaultFoundation=function(){var t=this,e={eventTargetMatchesSelector:function(t,e){return s.ponyfill.matches(t,e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},addScrollAreaClass:function(e){return t.area_.classList.add(e)},setScrollAreaStyleProperty:function(e,n){return t.area_.style.setProperty(e,n)},setScrollContentStyleProperty:function(e,n){return t.content_.style.setProperty(e,n)},getScrollContentStyleValue:function(e){return window.getComputedStyle(t.content_).getPropertyValue(e)},setScrollAreaScrollLeft:function(e){return t.area_.scrollLeft=e},getScrollAreaScrollLeft:function(){return t.area_.scrollLeft},getScrollContentOffsetWidth:function(){return t.content_.offsetWidth},getScrollAreaOffsetWidth:function(){return t.area_.offsetWidth},computeScrollAreaClientRect:function(){return t.area_.getBoundingClientRect()},computeScrollContentClientRect:function(){return t.content_.getBoundingClientRect()},computeHorizontalScrollbarHeight:function(){return c.computeHorizontalScrollbarHeight(document)}};return new a.MDCTabScrollerFoundation(e)},e.prototype.getScrollPosition=function(){return this.foundation_.getScrollPosition()},e.prototype.getScrollContentWidth=function(){return this.content_.offsetWidth},e.prototype.incrementScroll=function(t){this.foundation_.incrementScroll(t)},e.prototype.scrollTo=function(t){this.foundation_.scrollTo(t)},e}(o.MDCComponent);e.MDCTabScroller=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(21),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getScrollPositionRTL=function(){var t=this.adapter_.getScrollAreaScrollLeft(),e=this.calculateScrollEdges_().right;return Math.round(e-t)},e.prototype.scrollToRTL=function(t){var e=this.calculateScrollEdges_(),n=this.adapter_.getScrollAreaScrollLeft(),r=this.clampScrollValue_(e.right-t);return{finalScrollPosition:r,scrollDelta:r-n}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.getAnimatingScrollPosition=function(t){return t},e.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth()}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},e}(i.MDCTabScrollerRTL);e.MDCTabScrollerRTLDefault=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(21),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(t-e)},e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},e.prototype.getAnimatingScrollPosition=function(t,e){return t-e},e.prototype.calculateScrollEdges_=function(){var t=this.adapter_.getScrollContentOffsetWidth();return{left:this.adapter_.getScrollAreaOffsetWidth()-t,right:0}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.max(Math.min(e.right,t),e.left)},e}(i.MDCTabScrollerRTL);e.MDCTabScrollerRTLNegative=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(21),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getScrollPositionRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft();return Math.round(e-t)},e.prototype.scrollToRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(t);return{finalScrollPosition:n,scrollDelta:e-n}},e.prototype.incrementScrollRTL=function(t){var e=this.adapter_.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e+t);return{finalScrollPosition:n,scrollDelta:e-n}},e.prototype.getAnimatingScrollPosition=function(t,e){return t+e},e.prototype.calculateScrollEdges_=function(){return{left:this.adapter_.getScrollContentOffsetWidth()-this.adapter_.getScrollAreaOffsetWidth(),right:0}},e.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.right,t),e.left)},e}(i.MDCTabScrollerRTL);e.MDCTabScrollerRTLReverse=o,e.default=o},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(3),a=n(65),c=n(68),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e){void 0===t&&(t=function(t,e){return new s.MDCRipple(t,e)}),void 0===e&&(e=function(t){return new a.MDCTabIndicator(t)}),this.id=this.root_.id;var n=this.root_.querySelector(c.MDCTabFoundation.strings.RIPPLE_SELECTOR),r=i({},s.MDCRipple.createAdapter(this),{addClass:function(t){return n.classList.add(t)},removeClass:function(t){return n.classList.remove(t)},updateCssVariable:function(t,e){return n.style.setProperty(t,e)}}),o=new s.MDCRippleFoundation(r);this.ripple_=t(this.root_,o);var u=this.root_.querySelector(c.MDCTabFoundation.strings.TAB_INDICATOR_SELECTOR);this.tabIndicator_=e(u),this.content_=this.root_.querySelector(c.MDCTabFoundation.strings.CONTENT_SELECTOR)},e.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick_=function(){return t.foundation_.handleClick()},this.listen("click",this.handleClick_)},e.prototype.destroy=function(){this.unlisten("click",this.handleClick_),this.ripple_.destroy(),t.prototype.destroy.call(this)},e.prototype.getDefaultFoundation=function(){var t=this,e={setAttr:function(e,n){return t.root_.setAttribute(e,n)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},activateIndicator:function(e){return t.tabIndicator_.activate(e)},deactivateIndicator:function(){return t.tabIndicator_.deactivate()},notifyInteracted:function(){return t.emit(c.MDCTabFoundation.strings.INTERACTED_EVENT,{tabId:t.id},!0)},getOffsetLeft:function(){return t.root_.offsetLeft},getOffsetWidth:function(){return t.root_.offsetWidth},getContentOffsetLeft:function(){return t.content_.offsetLeft},getContentOffsetWidth:function(){return t.content_.offsetWidth},focus:function(){return t.root_.focus()}};return new c.MDCTabFoundation(e)},Object.defineProperty(e.prototype,"active",{get:function(){return this.foundation_.isActive()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"focusOnActivate",{set:function(t){this.foundation_.setFocusOnActivate(t)},enumerable:!0,configurable:!0}),e.prototype.activate=function(t){this.foundation_.activate(t)},e.prototype.deactivate=function(){this.foundation_.deactivate()},e.prototype.computeIndicatorClientRect=function(){return this.tabIndicator_.computeContentClientRect()},e.prototype.computeDimensions=function(){return this.foundation_.computeDimensions()},e.prototype.focus=function(){this.root_.focus()},e}(o.MDCComponent);e.MDCTab=u},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(66),s=n(9),a=n(67),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(){this.content_=this.root_.querySelector(s.MDCTabIndicatorFoundation.strings.CONTENT_SELECTOR)},e.prototype.computeContentClientRect=function(){return this.foundation_.computeContentClientRect()},e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},computeContentClientRect:function(){return t.content_.getBoundingClientRect()},setContentStyleProperty:function(e,n){return t.content_.style.setProperty(e,n)}};return this.root_.classList.contains(s.MDCTabIndicatorFoundation.cssClasses.FADE)?new o.MDCFadingTabIndicatorFoundation(e):new a.MDCSlidingTabIndicatorFoundation(e)},e.prototype.activate=function(t){this.foundation_.activate(t)},e.prototype.deactivate=function(){this.foundation_.deactivate()},e}(i.MDCComponent);e.MDCTabIndicator=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"};e.cssClasses=r;var i={CONTENT_SELECTOR:".mdc-tab-indicator__content"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ACTIVE:"mdc-tab--active"};e.cssClasses=r;var i={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"};e.strings=r;var i={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32};e.numbers=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(151)),r(n(73)),r(n(70)),r(n(74)),r(n(76))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},i.apply(this,arguments)},o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=o(n(11)),c=n(15),u=n(17),l=n(19),d=n(4),f=n(13),p=n(70),_=n(72),h=n(73),y=n(74),C=n(76),v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t,e,n,r,i,o,s){void 0===t&&(t=function(t,e){return new d.MDCRipple(t,e)}),void 0===e&&(e=function(t){return new u.MDCLineRipple(t)}),void 0===n&&(n=function(t){return new y.MDCTextFieldHelperText(t)}),void 0===r&&(r=function(t){return new p.MDCTextFieldCharacterCounter(t)}),void 0===i&&(i=function(t){return new C.MDCTextFieldIcon(t)}),void 0===o&&(o=function(t){return new c.MDCFloatingLabel(t)}),void 0===s&&(s=function(t){return new l.MDCNotchedOutline(t)}),this.input_=this.root_.querySelector(_.strings.INPUT_SELECTOR);var a=this.root_.querySelector(_.strings.LABEL_SELECTOR);this.label_=a?o(a):null;var f=this.root_.querySelector(_.strings.LINE_RIPPLE_SELECTOR);this.lineRipple_=f?e(f):null;var h=this.root_.querySelector(_.strings.OUTLINE_SELECTOR);this.outline_=h?s(h):null;var v=y.MDCTextFieldHelperTextFoundation.strings,m=this.root_.nextElementSibling,g=m&&m.classList.contains(_.cssClasses.HELPER_LINE),E=g&&m&&m.querySelector(v.ROOT_SELECTOR);this.helperText_=E?n(E):null;var b=p.MDCTextFieldCharacterCounterFoundation.strings,O=this.root_.querySelector(b.ROOT_SELECTOR);!O&&g&&m&&(O=m.querySelector(b.ROOT_SELECTOR)),this.characterCounter_=O?r(O):null,this.leadingIcon_=null,this.trailingIcon_=null;var T=this.root_.querySelectorAll(_.strings.ICON_SELECTOR);T.length>0&&(T.length>1?(this.leadingIcon_=i(T[0]),this.trailingIcon_=i(T[1])):this.root_.classList.contains(_.cssClasses.WITH_LEADING_ICON)?this.leadingIcon_=i(T[0]):this.trailingIcon_=i(T[0])),this.ripple=this.createRipple_(t)},e.prototype.destroy=function(){this.ripple&&this.ripple.destroy(),this.lineRipple_&&this.lineRipple_.destroy(),this.helperText_&&this.helperText_.destroy(),this.characterCounter_&&this.characterCounter_.destroy(),this.leadingIcon_&&this.leadingIcon_.destroy(),this.trailingIcon_&&this.trailingIcon_.destroy(),this.label_&&this.label_.destroy(),this.outline_&&this.outline_.destroy(),t.prototype.destroy.call(this)},e.prototype.initialSyncWithDOM=function(){this.disabled=this.input_.disabled},Object.defineProperty(e.prototype,"value",{get:function(){return this.foundation_.getValue()},set:function(t){this.foundation_.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.foundation_.isDisabled()},set:function(t){this.foundation_.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valid",{get:function(){return this.foundation_.isValid()},set:function(t){this.foundation_.setValid(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"required",{get:function(){return this.input_.required},set:function(t){this.input_.required=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pattern",{get:function(){return this.input_.pattern},set:function(t){this.input_.pattern=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minLength",{get:function(){return this.input_.minLength},set:function(t){this.input_.minLength=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxLength",{get:function(){return this.input_.maxLength},set:function(t){t<0?this.input_.removeAttribute("maxLength"):this.input_.maxLength=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"min",{get:function(){return this.input_.min},set:function(t){this.input_.min=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"max",{get:function(){return this.input_.max},set:function(t){this.input_.max=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"step",{get:function(){return this.input_.step},set:function(t){this.input_.step=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"helperTextContent",{set:function(t){this.foundation_.setHelperTextContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"leadingIconAriaLabel",{set:function(t){this.foundation_.setLeadingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"leadingIconContent",{set:function(t){this.foundation_.setLeadingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"trailingIconAriaLabel",{set:function(t){this.foundation_.setTrailingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"trailingIconContent",{set:function(t){this.foundation_.setTrailingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useNativeValidation",{set:function(t){this.foundation_.setUseNativeValidation(t)},enumerable:!0,configurable:!0}),e.prototype.focus=function(){this.input_.focus()},e.prototype.layout=function(){var t=this.foundation_.shouldFloat;this.foundation_.notchOutline(t)},e.prototype.getDefaultFoundation=function(){var t=i({},this.getRootAdapterMethods_(),this.getInputAdapterMethods_(),this.getLabelAdapterMethods_(),this.getLineRippleAdapterMethods_(),this.getOutlineAdapterMethods_());return new h.MDCTextFieldFoundation(t,this.getFoundationMap_())},e.prototype.getRootAdapterMethods_=function(){var t=this;return{addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},registerTextFieldInteractionHandler:function(e,n){return t.listen(e,n)},deregisterTextFieldInteractionHandler:function(e,n){return t.unlisten(e,n)},registerValidationAttributeChangeHandler:function(e){var n=function(t){return t.map(function(t){return t.attributeName}).filter(function(t){return t})},r=new MutationObserver(function(t){return e(n(t))}),i={attributes:!0};return r.observe(t.input_,i),r},deregisterValidationAttributeChangeHandler:function(t){return t.disconnect()}}},e.prototype.getInputAdapterMethods_=function(){var t=this;return{getNativeInput:function(){return t.input_},isFocused:function(){return document.activeElement===t.input_},registerInputInteractionHandler:function(e,n){return t.input_.addEventListener(e,n)},deregisterInputInteractionHandler:function(e,n){return t.input_.removeEventListener(e,n)}}},e.prototype.getLabelAdapterMethods_=function(){var t=this;return{floatLabel:function(e){return t.label_&&t.label_.float(e)},getLabelWidth:function(){return t.label_?t.label_.getWidth():0},hasLabel:function(){return Boolean(t.label_)},shakeLabel:function(e){return t.label_&&t.label_.shake(e)}}},e.prototype.getLineRippleAdapterMethods_=function(){var t=this;return{activateLineRipple:function(){t.lineRipple_&&t.lineRipple_.activate()},deactivateLineRipple:function(){t.lineRipple_&&t.lineRipple_.deactivate()},setLineRippleTransformOrigin:function(e){t.lineRipple_&&t.lineRipple_.setRippleCenter(e)}}},e.prototype.getOutlineAdapterMethods_=function(){var t=this;return{closeOutline:function(){return t.outline_&&t.outline_.closeNotch()},hasOutline:function(){return Boolean(t.outline_)},notchOutline:function(e){return t.outline_&&t.outline_.notch(e)}}},e.prototype.getFoundationMap_=function(){return{characterCounter:this.characterCounter_?this.characterCounter_.foundation:void 0,helperText:this.helperText_?this.helperText_.foundation:void 0,leadingIcon:this.leadingIcon_?this.leadingIcon_.foundation:void 0,trailingIcon:this.trailingIcon_?this.trailingIcon_.foundation:void 0}},e.prototype.createRipple_=function(t){var e=this,n=this.root_.classList.contains(_.cssClasses.TEXTAREA),r=this.root_.classList.contains(_.cssClasses.OUTLINED);if(n||r)return null;var o=i({},d.MDCRipple.createAdapter(this),{isSurfaceActive:function(){return a.matches(e.input_,":active")},registerInteractionHandler:function(t,n){return e.input_.addEventListener(t,n)},deregisterInteractionHandler:function(t,n){return e.input_.removeEventListener(t,n)}});return t(this.root_,new f.MDCRippleFoundation(o))},e}(s.MDCComponent);e.MDCTextField=v},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(71),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"foundation",{get:function(){return this.foundation_},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={setContent:function(e){t.root_.textContent=e}};return new o.MDCTextFieldCharacterCounterFoundation(e)},e}(i.MDCComponent);e.MDCTextFieldCharacterCounter=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ROOT:"mdc-text-field-character-counter"};e.cssClasses=r;var i={ROOT_SELECTOR:"."+r.ROOT};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(75),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"foundation",{get:function(){return this.foundation_},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},hasClass:function(e){return t.root_.classList.contains(e)},setAttr:function(e,n){return t.root_.setAttribute(e,n)},removeAttr:function(e){return t.root_.removeAttribute(e)},setContent:function(e){t.root_.textContent=e}};return new o.MDCTextFieldHelperTextFoundation(e)},e}(i.MDCComponent);e.MDCTextFieldHelperText=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={HELPER_TEXT_PERSISTENT:"mdc-text-field-helper-text--persistent",HELPER_TEXT_VALIDATION_MSG:"mdc-text-field-helper-text--validation-msg",ROOT:"mdc-text-field-helper-text"};e.cssClasses=r;var i={ARIA_HIDDEN:"aria-hidden",ROLE:"role",ROOT_SELECTOR:"."+r.ROOT};e.strings=i},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(77),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},Object.defineProperty(e.prototype,"foundation",{get:function(){return this.foundation_},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={getAttr:function(e){return t.root_.getAttribute(e)},setAttr:function(e,n){return t.root_.setAttribute(e,n)},removeAttr:function(e){return t.root_.removeAttribute(e)},setContent:function(e){t.root_.textContent=e},registerInteractionHandler:function(e,n){return t.listen(e,n)},deregisterInteractionHandler:function(e,n){return t.unlisten(e,n)},notifyIconAction:function(){return t.emit(o.MDCTextFieldIconFoundation.strings.ICON_EVENT,{},!0)}};return new o.MDCTextFieldIconFoundation(e)},e}(i.MDCComponent);e.MDCTextFieldIcon=s},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0});var r={ICON_EVENT:"MDCTextField:icon",ICON_ROLE:"button"};e.strings=r},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(159)),r(n(78))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(4),s=n(78),a=s.MDCToolbarFoundation.strings,c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(){var t=this;this.ripples_=[],this.fixedAdjustElement_=null,this.titleElement_=this.root_.querySelector(a.TITLE_SELECTOR);var e=this.root_.querySelector(a.FIRST_ROW_SELECTOR);if(!e)throw new Error("MDCToolbar: Required sub-element '"+a.FIRST_ROW_SELECTOR+"' is missing");this.firstRowElement_=e,[].forEach.call(this.root_.querySelectorAll(a.ICON_SELECTOR),function(e){var n=o.MDCRipple.attachTo(e);n.unbounded=!0,t.ripples_.push(n)})},e.prototype.destroy=function(){this.ripples_.forEach(function(t){t.destroy()}),t.prototype.destroy.call(this)},Object.defineProperty(e.prototype,"fixedAdjustElement",{get:function(){return this.fixedAdjustElement_},set:function(t){this.fixedAdjustElement_=t,this.foundation_.updateAdjustElementStyles()},enumerable:!0,configurable:!0}),e.prototype.getDefaultFoundation=function(){var t=this,e={hasClass:function(e){return t.root_.classList.contains(e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},registerScrollHandler:function(t){return window.addEventListener("scroll",t)},deregisterScrollHandler:function(t){return window.removeEventListener("scroll",t)},registerResizeHandler:function(t){return window.addEventListener("resize",t)},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getViewportWidth:function(){return window.innerWidth},getViewportScrollY:function(){return window.pageYOffset},getOffsetHeight:function(){return t.root_.offsetHeight},getFirstRowElementOffsetHeight:function(){return t.firstRowElement_.offsetHeight},notifyChange:function(e){return t.emit(a.CHANGE_EVENT,e)},setStyle:function(e,n){return t.root_.style.setProperty(e,n)},setStyleForTitleElement:function(e,n){t.titleElement_&&t.titleElement_.style.setProperty(e,n)},setStyleForFlexibleRowElement:function(e,n){return t.firstRowElement_.style.setProperty(e,n)},setStyleForFixedAdjustElement:function(e,n){t.fixedAdjustElement&&t.fixedAdjustElement.style.setProperty(e,n)}};return new s.MDCToolbarFoundation(e)},e}(i.MDCComponent);e.MDCToolbar=c},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={FIXED:"mdc-toolbar--fixed",FIXED_AT_LAST_ROW:"mdc-toolbar--fixed-at-last-row",FIXED_LASTROW:"mdc-toolbar--fixed-lastrow-only",FLEXIBLE_DEFAULT_BEHAVIOR:"mdc-toolbar--flexible-default-behavior",FLEXIBLE_MAX:"mdc-toolbar--flexible-space-maximized",FLEXIBLE_MIN:"mdc-toolbar--flexible-space-minimized",TOOLBAR_ROW_FLEXIBLE:"mdc-toolbar--flexible"},e.strings={CHANGE_EVENT:"MDCToolbar:change",FIRST_ROW_SELECTOR:".mdc-toolbar__row:first-child",ICON_SELECTOR:".mdc-toolbar__icon",TITLE_SELECTOR:".mdc-toolbar__title"},e.numbers={MAX_TITLE_SIZE:2.125,MIN_TITLE_SIZE:1.25,TOOLBAR_MOBILE_BREAKPOINT:600,TOOLBAR_ROW_HEIGHT:64,TOOLBAR_ROW_MOBILE_HEIGHT:56}},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(162)),r(n(23)),r(n(79)),r(n(80)),r(n(22))},function(t,e,n){"use strict";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(4),s=n(6),a=n(79),c=n(80),u=n(22),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){void 0===t&&(t=function(t){return o.MDCRipple.attachTo(t)}),this.navIcon_=this.root_.querySelector(s.strings.NAVIGATION_ICON_SELECTOR);var e=[].slice.call(this.root_.querySelectorAll(s.strings.ACTION_ITEM_SELECTOR));this.navIcon_&&e.push(this.navIcon_),this.iconRipples_=e.map(function(e){var n=t(e);return n.unbounded=!0,n}),this.scrollTarget_=window},e.prototype.destroy=function(){this.iconRipples_.forEach(function(t){return t.destroy()}),t.prototype.destroy.call(this)},e.prototype.setScrollTarget=function(t){this.foundation_.destroyScrollHandler(),this.scrollTarget_=t,this.foundation_.initScrollHandler()},e.prototype.getDefaultFoundation=function(){var t=this,e={hasClass:function(e){return t.root_.classList.contains(e)},addClass:function(e){return t.root_.classList.add(e)},removeClass:function(e){return t.root_.classList.remove(e)},setStyle:function(e,n){return t.root_.style.setProperty(e,n)},getTopAppBarHeight:function(){return t.root_.clientHeight},registerNavigationIconInteractionHandler:function(e,n){t.navIcon_&&t.navIcon_.addEventListener(e,n)},deregisterNavigationIconInteractionHandler:function(e,n){t.navIcon_&&t.navIcon_.removeEventListener(e,n)},notifyNavigationIconClicked:function(){return t.emit(s.strings.NAVIGATION_EVENT,{})},registerScrollHandler:function(e){return t.scrollTarget_.addEventListener("scroll",e)},deregisterScrollHandler:function(e){return t.scrollTarget_.removeEventListener("scroll",e)},registerResizeHandler:function(t){return window.addEventListener("resize",t)},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getViewportScrollY:function(){var e=t.scrollTarget_,n=t.scrollTarget_;return void 0!==e.pageYOffset?e.pageYOffset:n.scrollTop},getTotalActionItems:function(){return t.root_.querySelectorAll(s.strings.ACTION_ITEM_SELECTOR).length}};return this.root_.classList.contains(s.cssClasses.SHORT_CLASS)?new c.MDCShortTopAppBarFoundation(e):this.root_.classList.contains(s.cssClasses.FIXED_CLASS)?new a.MDCFixedTopAppBarFoundation(e):new u.MDCTopAppBarFoundation(e)},e}(i.MDCComponent);e.MDCTopAppBar=l}])});
//# sourceMappingURL=material-components-web.min.js.map