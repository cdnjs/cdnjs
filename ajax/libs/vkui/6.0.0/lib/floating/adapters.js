import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { autoUpdate as autoUpdateLib } from '@vkontakte/vkui-floating-ui/react-dom';
import { isHTMLElement } from '../dom';
export { useFloating, offset as offsetMiddleware, flip as flipMiddleware, shift as shiftMiddleware, autoPlacement as autoPlacementMiddleware, arrow as arrowMiddleware, size as sizeMiddleware, hide as hideMiddleware, getOverflowAncestors } from '@vkontakte/vkui-floating-ui/react-dom';
const defaultOptions = {
    ancestorScroll: true,
    ancestorResize: true,
    // По умолчанию отключаем, т.к. навешивать `MutationObserver` может быть дорого.
    // В `autoUpdateLib` по умолчанию опция включена. Там используется ResizeObserver, но и он не менее дорогостоящий.
    // https://github.com/floating-ui/floating-ui/blob/0a34fe9cc2c7483976785a71bd0777cd7c3f2a6a/packages/dom/src/autoUpdate.ts#L6-L33
    elementResize: false,
    animationFrame: false
};
export function autoUpdateFloatingElement(reference, floating, update, options = defaultOptions) {
    const { elementResize = false } = options, restOptions = _object_without_properties(options, [
        "elementResize"
    ]);
    const autoUpdateLibDisposer = autoUpdateLib(reference, floating, update, _object_spread_props(_object_spread({}, restOptions), {
        // Отключаем в библиотеке, т.к. под капотом используется `ResizeObserver`, которое не покрывается нашим `browserlist`.
        // Вместо него мы используем `MutationObserver`.
        // https://caniuse.com/resizeobserver
        elementResize: false
    }));
    // В случае если `ResizeObserver` будет полифилиться или он будет покрываться нашим `browserlist`, то надо удалить
    // код с `MutationObserver`.
    let observer = null;
    if (elementResize) {
        let initialUpdate = true;
        observer = new MutationObserver(()=>{
            if (!initialUpdate) {
                update();
            }
            initialUpdate = false;
        });
        if (isHTMLElement(reference)) {
            observer.observe(reference, {
                childList: true,
                subtree: true
            });
        }
        observer.observe(floating, {
            childList: true,
            subtree: true
        });
    }
    return ()=>{
        if (observer !== null) {
            observer.disconnect();
            observer = null;
        }
        autoUpdateLibDisposer();
    };
}

//# sourceMappingURL=adapters.js.map