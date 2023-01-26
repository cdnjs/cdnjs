import { ref, onMounted, watchEffect } from 'vue';
import autoAnimate, { vAutoAnimate } from '../index.mjs';

const autoAnimatePlugin = {
    install(app) {
        app.directive("auto-animate", vAutoAnimate);
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
        watchEffect(() => {
            if (element.value instanceof HTMLElement)
                controller = autoAnimate(element.value, options || {});
        });
    });
    return [element, setEnabled];
}

export { autoAnimatePlugin, useAutoAnimate };
