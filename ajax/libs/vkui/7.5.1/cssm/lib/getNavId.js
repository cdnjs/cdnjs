export function getNavId(props, warn) {
    const id = props.nav || props.id;
    if (process.env.NODE_ENV === 'development' && !id && warn) {
        warn('Навигационный элемент должен иметь свойство "nav" или "id"', 'error');
    }
    return id;
}

//# sourceMappingURL=getNavId.js.map