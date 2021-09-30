export const config = {
    logError: (...args) => {
        console.error(...args);
    },
    confirmValues: Object.is
};
export function configure(options) {
    Object.assign(config, options);
    return config;
}
