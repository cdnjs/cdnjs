'use strict';

var vue = require('vue');
var usedialog = require('primevue/usedialog');
var DynamicDialogEventBus = require('primevue/dynamicdialogeventbus');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var DynamicDialogEventBus__default = /*#__PURE__*/_interopDefaultLegacy(DynamicDialogEventBus);

var DialogService = {
    install: (app) => {
        const DialogService = {
            open: (content, options) => {
                const instance = {
                    content: content && vue.markRaw(content),
                    options: options || {},
                    data: options && options.data,
                    close: (params) => {
                        DynamicDialogEventBus__default["default"].emit('close', { instance, params });
                    }
                };

                DynamicDialogEventBus__default["default"].emit('open', { instance });

                return instance;
            }
        };

        app.config.unwrapInjectedRef = true; // Remove it after Vue 3.3. Details: https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
        app.config.globalProperties.$dialog = DialogService;
        app.provide(usedialog.PrimeVueDialogSymbol, DialogService);
    }
};

module.exports = DialogService;
