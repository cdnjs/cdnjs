export function defineComponentDisplayNames(Component, name) {
    Component.displayName = name;
    Object.defineProperty(Component, 'name', {
        value: name
    });
}

//# sourceMappingURL=defineComponentDisplayNames.js.map