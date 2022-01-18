/*! Monio: nothing.mjs
    v0.33.0 (c) 2022 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
import{isFunction}from"./lib/util.mjs";const BRAND={};export default Object.assign(Nothing,{of:Nothing,pure:Nothing,unit:Nothing,is:is,isEmpty:isEmpty});function Nothing(){var n={map:noop,chain:noop,flatMap:noop,bind:noop,ap:noop,concat:noop,_inspect:function _inspect(){return`${n[Symbol.toStringTag]}()`},_is:function _is(n){return n===BRAND},[Symbol.toStringTag]:"Nothing"};return n;function noop(){return n}}function is(n){return!!(n&&isFunction(n._is)&&n._is(BRAND))}function isEmpty(n){return null==n}