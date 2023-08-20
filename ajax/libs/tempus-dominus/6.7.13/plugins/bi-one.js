/*!
  * Tempus Dominus v6.7.13 (https://getdatepicker.com/)
  * Copyright 2013-2023 Jonathan Peterson
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f((g.tempusDominus=g.tempusDominus||{},g.tempusDominus.plugins=g.tempusDominus.plugins||{},g.tempusDominus.plugins.bi_one={})));})(this,(function(exports){'use strict';// this obviously requires the Bootstrap Icons v1 libraries to be loaded
const biOneIcons = {
    type: 'icons',
    time: 'bi bi-clock',
    date: 'bi bi-calendar-week',
    up: 'bi bi-arrow-up',
    down: 'bi bi-arrow-down',
    previous: 'bi bi-chevron-left',
    next: 'bi bi-chevron-right',
    today: 'bi bi-calendar-check',
    clear: 'bi bi-trash',
    close: 'bi bi-x',
};
// noinspection JSUnusedGlobalSymbols
const load = (_, __, tdFactory) => {
    tdFactory.DefaultOptions.display.icons = biOneIcons;
};exports.biOneIcons=biOneIcons;exports.load=load;Object.defineProperty(exports,'__esModule',{value:true});}));