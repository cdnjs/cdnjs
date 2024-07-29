import * as React from 'react';
import { shouldTriggerClickOnEnterOrSpace } from '../../lib/accessibility';
/*
 * [a11y]
 * Обрабатывает событие onkeydown
 * для кастомных доступных элементов:
 * - role="link" (активация по Enter)
 * - role="button" (активация по Space и Enter)
 */ export function useKeyboard() {
    function onKeyDown(e) {
        var // @ts-expect-error: TS2339 У элемента должен быть клик
        _e_target_click, _e_target;
        if (!shouldTriggerClickOnEnterOrSpace(e)) {
            return;
        }
        e.preventDefault();
        (_e_target_click = (_e_target = e.target).click) === null || _e_target_click === void 0 ? void 0 : _e_target_click.call(_e_target);
    }
    return {
        onKeyDown
    };
}

//# sourceMappingURL=useKeyboard.js.map