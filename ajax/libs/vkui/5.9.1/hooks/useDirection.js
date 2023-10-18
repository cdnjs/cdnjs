import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useDOM } from "../lib/dom";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
/**
 * Определяет направление текста элемента.
 *
 * ## Ограничения
 *
 * - Не следит за изменением направлением.
 * - Определяется только на второй рендер.
 *
 * ## Пример
 *
 * ```jsx
 * import { strict as assert } from 'node:assert';
 *
 * const Component = () => {
 *   const [ref, direction, writingMode] = useDirection();
 *
 *   React.useEffect(()=>{
 *     if (!direction || !writingMode) {
 *       return
 *     }
 *
 *     assert.equal(direction, 'ltr')
 *     assert.equal(writingMode, 'vertical-rl')
 *   }, [direction, writingMode])
 *
 *   return <div ref={ref} style={{writingMode: 'vertical-rl'}}>我家没有电脑。</div>
 * }
 * ```
 */ export function useDirection() {
    var ref = React.useRef(null);
    var _React_useState = _sliced_to_array(React.useState(undefined), 2), direction = _React_useState[0], setDirection = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(undefined), 2), writingMode = _React_useState1[0], setWritingMode = _React_useState1[1];
    var window = useDOM().window;
    var update = function() {
        if (!window || !ref.current) {
            return;
        }
        var styleDeclaration = window.getComputedStyle(ref.current);
        setDirection(styleDeclaration.direction);
        setWritingMode(styleDeclaration.writingMode);
    };
    useIsomorphicLayoutEffect(update, [
        window
    ]);
    return [
        ref,
        direction,
        writingMode
    ];
}

//# sourceMappingURL=useDirection.js.map