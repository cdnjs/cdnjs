import * as React from 'react';
import { useDOM } from '../lib/dom';
import { useGlobalEventListener } from './useGlobalEventListener';
/**
 Проверяет, закрыла ли клавиатура часть экрана, 24% подошло к большинству устройств
 Работает на iOS и Android, где софт-клавиатура ресайзит viewport в браузерах
 */ export function getPreciseKeyboardState(window) {
    const { innerHeight, screen: { availHeight } } = window;
    const coveredViewportPercentage = Math.round((1 - innerHeight / availHeight) * 100);
    return coveredViewportPercentage > 24;
}
const eventOptions = {
    passive: true,
    capture: false
};
export function useKeyboard() {
    const { document } = useDOM();
    const [isOpened, setIsOpened] = React.useState(false);
    const onFocus = React.useCallback((event)=>{
        const isOpened = (event === true || event.type === 'focusin') && (document?.activeElement?.tagName === 'INPUT' || document?.activeElement?.tagName === 'TEXTAREA');
        setIsOpened(isOpened);
    }, [
        document?.activeElement?.tagName
    ]);
    /**
   У полей с autoFocus не отлавливаются события focus, для этого вызываем вручную,
   чтобы иметь хоть какое-то понимание происходящего.
   */ React.useEffect(()=>{
        onFocus(true);
    }, [
        onFocus
    ]);
    useGlobalEventListener(document, 'focusout', onFocus, eventOptions);
    useGlobalEventListener(document, 'focusin', onFocus, eventOptions);
    return {
        isOpened
    };
}

//# sourceMappingURL=useKeyboard.js.map