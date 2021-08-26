'use strict';

// Polyfills for SSR
var isSSR = typeof window === 'undefined';
var HTMLElement = isSSR ? Object : window.HTMLElement;
var File = isSSR ? Object : window.File;

exports.File = File;
exports.HTMLElement = HTMLElement;
