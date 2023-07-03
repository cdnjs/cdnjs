import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useDOM } from "../lib/dom";
import { useGlobalEventListener } from "./useGlobalEventListener";
/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большинству устройств
 Работает на iOS и Android, где софт-клавиатура ресайзит viewport в браузерах
 */ export function getPreciseKeyboardState(window) {
    var innerHeight = window.innerHeight, availHeight = window.screen.availHeight;
    var coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
    return coveredViewportPercentage > 24;
}
var eventOptions = {
    passive: true,
    capture: false
};
export function useKeyboard() {
    var _document_activeElement;
    var document = useDOM().document;
    var _React_useState = _sliced_to_array(React.useState(false), 2), isOpened = _React_useState[0], setIsOpened = _React_useState[1];
    var onFocus = React.useCallback(function(event) {
        var _document_activeElement, _document_activeElement1;
        var isOpened = (event === true || event.type === "focusin") && ((document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName) === "INPUT" || (document === null || document === void 0 ? void 0 : (_document_activeElement1 = document.activeElement) === null || _document_activeElement1 === void 0 ? void 0 : _document_activeElement1.tagName) === "TEXTAREA");
        setIsOpened(isOpened);
    }, [
        document === null || document === void 0 ? void 0 : (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.tagName
    ]);
    /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */ React.useEffect(function() {
        onFocus(true);
    }, [
        onFocus
    ]);
    useGlobalEventListener(document, "focusout", onFocus, eventOptions);
    useGlobalEventListener(document, "focusin", onFocus, eventOptions);
    return {
        isOpened: isOpened
    };
}

//# sourceMappingURL=useKeyboard.js.map