export function warnOnce(zone) {
    const didWarn = new Set();
    return (message, type = 'warn')=>{
        if (!didWarn.has(message)) {
            didWarn.add(message);
            const formattedMessage = `%c[VKUI/${zone}] ${message}`;
            const styles = type === 'log' ? 'color: steelblue; font-style: italic' : undefined;
            // eslint-disable-next-line no-console
            console[type](formattedMessage, styles);
        }
    };
}
function getA11yRuleUrl(ruleName) {
    // see jest-axe's axe-core dependency
    const AXE_CORE_MINOR_VERSION = '4.5';
    return `https://dequeuniversity.com/rules/axe/${AXE_CORE_MINOR_VERSION}/${ruleName}`;
}
export const COMMON_WARNINGS = {
    a11y: {
        'button-name': `a11y: Кнопка должна содержать текст, доступный для скринридеров. Чтобы исправить эту ошибку, передайте компоненту текст или свойство aria-label.
${getA11yRuleUrl('button-name')}`,
        'link-name': `a11y: Ссылка должна содержать текст, доступный для скринридеров. Чтобы исправить эту ошибку, передайте компоненту текст или свойство aria-label.
${getA11yRuleUrl('link-name')}`,
        'image-alt': `a11y: Изображение должно содержать альтернативный текст, который его описывает. Чтобы исправить эту ошибку, передайте компоненту свойство alt.
${getA11yRuleUrl('image-alt')}`
    }
};

//# sourceMappingURL=warnOnce.js.map