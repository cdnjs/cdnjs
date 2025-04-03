/**
 * По дизайну `ActionSheet` должен закрывать при клике на `ActionSheetItem`.
 * В режиме `selectable` в реализации используются нативный input type=radio
 * И при навигации стрелочками по элементам происходит событие `click` из-за чего `ActionSheet` закрывается.
 * Поэтому нужно как-то отличить реальное событие клика
 * @see https://github.com/facebook/react/issues/7407
 * @see https://github.com/VKCOM/VKUI/issues/6954
 */ export const isRealClickEvent = (event)=>{
    return event.type === 'click' && event.clientX !== 0 && event.clientY !== 0;
};

//# sourceMappingURL=helpers.js.map