'use strict';

const isSSR = typeof window === "undefined";
const HTMLElement = isSSR ? Object : window.HTMLElement;
const File = isSSR ? Object : window.File;

exports.File = File;
exports.HTMLElement = HTMLElement;
