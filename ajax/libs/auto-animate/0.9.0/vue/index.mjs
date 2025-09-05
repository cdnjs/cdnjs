import { ref, onMounted, watchEffect, onBeforeUnmount } from 'vue';
import autoAnimate, { vAutoAnimate as vAutoAnimate$1 } from '../index.mjs';

const vAutoAnimate = vAutoAnimate$1;
/**
 * Create a Vue directive instance that merges provided defaults with per-use binding.
 */
function createVAutoAnimate(defaults) {
    return {
        mounted(el, binding) {
            let resolved = {};
            const local = binding.value;
            if (typeof local === "function") {
                resolved = local;
            }
            else if (typeof defaults === "function") {
                resolved = defaults;
            }
            else {
                resolved = { ...(defaults || {}), ...(local || {}) };
            }
            const ctl = autoAnimate(el, resolved);
            Object.defineProperty(el, "__aa_ctl", { value: ctl, configurable: true });
        },
        unmounted(el) {
            var _a;
            const ctl = el["__aa_ctl"];
            (_a = ctl === null || ctl === void 0 ? void 0 : ctl.destroy) === null || _a === void 0 ? void 0 : _a.call(ctl);
            try {
                delete el["__aa_ctl"];
            }
            catch { }
        },
        getSSRProps: () => ({}),
    };
}
const autoAnimatePlugin = {
    install(app, defaults) {
        app.directive("auto-animate", createVAutoAnimate(defaults));
    },
};
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @param options - Auto animate options or a plugin
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 */
function useAutoAnimate(options) {
    const element = ref();
    let controller;
    function setEnabled(enabled) {
        if (controller) {
            enabled ? controller.enable() : controller.disable();
        }
    }
    onMounted(() => {
        watchEffect((onCleanup) => {
            let el;
            if (element.value instanceof HTMLElement) {
                el = element.value;
            }
            else if (element.value &&
                "$el" in element.value &&
                element.value.$el instanceof HTMLElement) {
                el = element.value.$el;
            }
            if (el) {
                controller = autoAnimate(el, options || {});
                onCleanup(() => {
                    var _a;
                    (_a = controller === null || controller === void 0 ? void 0 : controller.destroy) === null || _a === void 0 ? void 0 : _a.call(controller);
                    controller = undefined;
                });
            }
        });
    });
    onBeforeUnmount(() => {
        var _a;
        (_a = controller === null || controller === void 0 ? void 0 : controller.destroy) === null || _a === void 0 ? void 0 : _a.call(controller);
        controller = undefined;
    });
    return [element, setEnabled];
}

export { autoAnimatePlugin, createVAutoAnimate, useAutoAnimate, vAutoAnimate };
