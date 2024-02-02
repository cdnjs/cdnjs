import * as React from 'react';
/**
 * Примечание 1.
 *
 * В компоненте, SVG элемент `<path />` представляет собой стрелку с платформой в виде прямоугольника в 1px. Платформа
 * служит для исправления проблемы с белой полоской между контентом и стрелкой, которая зачастую проявляется при
 * изменении масштаба страницы.
 *
 * Чтобы исправление сработало нужно:
 * 1. Прибавить высоту платформы к `height` и `viewBox` SVG контейнера.
 * 2. Сместить положение SVG контейнера на высоту платформы – сделано в CSS через `translateY(1px)`.
 *
 * https://github.com/VKCOM/VKUI/issues/2123
 */ export const DEFAULT_ARROW_WIDTH = 20;
export const DEFAULT_ARROW_HEIGHT = 8;
export const DEFAULT_ARROW_PADDING = 10;
const PLATFORM_HEIGHT = 1;
const ARROW_HEIGHT_WITH_WHITE_SPACE = DEFAULT_ARROW_HEIGHT + PLATFORM_HEIGHT;
export const DefaultIcon = (props)=>{
    return /*#__PURE__*/ React.createElement("svg", {
        width: DEFAULT_ARROW_WIDTH,
        height: ARROW_HEIGHT_WITH_WHITE_SPACE,
        viewBox: `0 0 ${DEFAULT_ARROW_WIDTH} ${ARROW_HEIGHT_WITH_WHITE_SPACE}`,
        xmlns: "http://www.w3.org/2000/svg",
        ...props
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M10 0c3 0 6 8 10 8v1H0V8c3.975 0 7-8 10-8Z",
        fill: "currentColor"
    }));
};

//# sourceMappingURL=DefaultIcon.js.map