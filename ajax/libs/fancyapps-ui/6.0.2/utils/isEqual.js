/*! License details at fancyapps.com/license */
import{isPlainObject as t}from"./isPlainObject.js";function e(e){return t(e)||Array.isArray(e)}function n(t,r){const o=Object.keys(t),c=Object.keys(r);return o.length===c.length&&o.every((o=>{const c=t[o],i=r[o];return"function"==typeof c?`${c}`==`${i}`:e(c)&&e(i)?n(c,i):c===i}))}export{n as isEqual};
