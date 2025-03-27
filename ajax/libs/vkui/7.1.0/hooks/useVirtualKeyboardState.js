import { useEffect, useRef, useState } from "react";
import { debounce, throttle } from "@vkontakte/vkjs";
import { getVisualViewport, isHTMLContentEditableElement, useDOM } from "../lib/dom.js";
/**
 * > см. [Неудобно работать с клавиатурой в ModalPage на iOS #3792](https://github.com/VKCOM/VKUI/discussions/3792)
 *
 * Для реализации модальных окон для тач-устройств, мы вынуждены отслеживать открытие виртуальной
 * клавиатуры. По состоянию `opened` компоненты должны временно блокировать дальнейшее взаимодействие
 * с ними. Например, отключить закрытие по свайпу, чтобы не мешать пользователю работать с полями
 * ввода.
 *
 * Помимо этого в **Safari** и в **Chrome Android** нам нужно отслеживать прокрутку области видимости
 * пользователем, т.к. в упомянутых браузерах, виртуальная клавиатура поднимает контент вверх
 * не изменяя её высоту. Из-за этого появляется возможность прокручивать `window`, что визуально
 * выглядит плохо. В хуке мы ловим фокус на поле ввода и далее, если это тач-устройство, то
 * отлавливаем события прокрутки на `window`, чтобы сохранять текущую её позицию через `scrollTo(x, y)`.
 *
 * **Troubleshooting**
 *
 * - в **Safari** и в **Chrome Android** шапка будет выдвигаться вверх – хаки с выставлением `offsetTop`
 *   из `VisualViewport` порождают reflow/repaint и прыгания контента;
 * - в **Safari** изменение высоты виртуальной клавиатуры, например, на выбор эмодзи, не поднимет
 *   `VisualViewport` из-за чего клавиатура может частично перекрыть элементы интерфейса.
 *
 * **Полезные ссылки**
 *
 * - [The Eccentric Ways of iOS Safari with the Keyboard](https://web.archive.org/web/20240920081850/https://blog.opendigerati.com/the-eccentric-ways-of-ios-safari-with-the-keyboard-b5aa3f34228d?gi=5411141a13e0)
 * - [Dealing with the visual viewport](https://web.archive.org/web/20240920082109/https://rdavis.io/articles/dealing-with-the-visual-viewport)
 * - [How to get the document height in iOS Safari when the on-screen keyboard is open](https://web.archive.org/web/20240920082743/https://martijnhols.nl/gists/how-to-get-document-height-ios-safari-osk)
 */ export function useVirtualKeyboardState(enabled = true) {
    const { window, document } = useDOM();
    const [focusedEl, setFocusedEl] = useState(null);
    const [keyboardOpened, setKeyboardOpened] = useState(false);
    const prevVisualViewportRef = useRef(null);
    useEffect(function handleFocusedEl() {
        if (!enabled || !window || !document) {
            return;
        }
        const handleFocus = (event)=>{
            const activeElement = event === true ? document.activeElement : event.target;
            if (isHTMLContentEditableElement(activeElement)) {
                const patchedEvent = event === true ? {
                    type: 'focusin'
                } : event;
                switch(patchedEvent.type){
                    case 'focusin':
                        prevVisualViewportRef.current = getVisualViewport(window);
                        setFocusedEl(activeElement);
                        break;
                    case 'focusout':
                        prevVisualViewportRef.current = null;
                        setKeyboardOpened(false);
                        setFocusedEl(null);
                        break;
                }
            }
        };
        /**
       * У полей с autoFocus не отлавливаются события `focus`, для этого вызываем обработчик
       * вручную, чтобы иметь хоть какое-то понимание происходящего.
       */ handleFocus(true);
        const eventOptions = {
            passive: true,
            capture: false
        };
        document.addEventListener('focusin', handleFocus, eventOptions);
        document.addEventListener('focusout', handleFocus, eventOptions);
        return ()=>{
            prevVisualViewportRef.current = null;
            document.removeEventListener('focusin', handleFocus, eventOptions);
            document.removeEventListener('focusout', handleFocus, eventOptions);
        };
    }, [
        enabled,
        window,
        document
    ]);
    useEffect(function handleVirtualKeyboardOpened() {
        if (!focusedEl || !window) {
            return;
        }
        const handleResize = debounce(()=>{
            /* istanbul ignore if: нереалистичный кейс, проверяем в угоду TypeScript */ if (prevVisualViewportRef.current === null) {
                return;
            }
            const nextVisualViewport = getVisualViewport(window);
            const { offsetTop: prevOffsetTop, height: prevHeight } = prevVisualViewportRef.current;
            const { offsetTop: nextOffsetTop, height: nextHeight } = nextVisualViewport;
            if (prevOffsetTop !== nextOffsetTop || prevHeight !== nextHeight) {
                setKeyboardOpened(true);
                prevVisualViewportRef.current = nextVisualViewport;
            }
        }, 100);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        } else {
            window.addEventListener('resize', handleResize);
        }
        return function dispose() {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            } else {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [
        focusedEl,
        window
    ]);
    useEffect(function preventWindowScrollIfKeyboardOpened() {
        if (!keyboardOpened || !window) {
            return;
        }
        const prevent = throttle(()=>{
            if (prevVisualViewportRef.current) {
                window.scrollTo(0, prevVisualViewportRef.current.offsetTop);
            }
        }, 100);
        window.addEventListener('scroll', prevent, {
            passive: true
        });
        return function dispose() {
            window.removeEventListener('scroll', prevent);
        };
    }, [
        keyboardOpened,
        window
    ]);
    return {
        opened: keyboardOpened
    };
}

//# sourceMappingURL=useVirtualKeyboardState.js.map