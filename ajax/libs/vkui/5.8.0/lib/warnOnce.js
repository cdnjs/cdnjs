export function warnOnce(zone) {
    var didWarn = new Set();
    return function(message) {
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "warn";
        if (!didWarn.has(message)) {
            didWarn.add(message);
            var formattedMessage = "%c[VKUI/".concat(zone, "] ").concat(message);
            var styles = type === "log" ? "color: steelblue; font-style: italic" : undefined;
            console[type](formattedMessage, styles);
        }
    };
}
function getA11yRuleUrl(ruleName) {
    // see jest-axe's axe-core dependency
    var AXE_CORE_MINOR_VERSION = "4.5";
    return "https://dequeuniversity.com/rules/axe/".concat(AXE_CORE_MINOR_VERSION, "/").concat(ruleName);
}
export var COMMON_WARNINGS = {
    a11y: {
        "button-name": "a11y: Кнопка должна содержать текст, доступный для скринридеров. Чтобы исправить эту ошибку, передайте компоненту текст или свойство aria-label.\n".concat(getA11yRuleUrl("button-name")),
        "link-name": "a11y: Ссылка должна содержать текст, доступный для скринридеров. Чтобы исправить эту ошибку, передайте компоненту текст или свойство aria-label.\n".concat(getA11yRuleUrl("link-name")),
        "image-alt": "a11y: Изображение должно содержать альтернативный текст, который его описывает. Чтобы исправить эту ошибку, передайте компоненту свойство alt.\n".concat(getA11yRuleUrl("image-alt"))
    }
};

//# sourceMappingURL=warnOnce.js.map