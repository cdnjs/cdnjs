export const config = {
    logError: /* istanbul ignore next */ (...args) => {
        console.error(...args);
    },
    compareValues: Object.is
};
export function configure(options) {
    return Object.assign(config, options);
}
