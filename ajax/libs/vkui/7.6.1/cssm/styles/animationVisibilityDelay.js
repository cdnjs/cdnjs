export function animationVisibilityDelayStyles(delay) {
    if (delay === undefined) {
        return undefined;
    }
    return {
        '--vkui_internal--animation_delay_visibility': `${delay}ms`
    };
}

//# sourceMappingURL=animationVisibilityDelay.js.map