export const config = {
    logError: (...args) => {
        console.error(...args);
    }
};
export function configure(options) {
    Object.assign(config, options);
    return config;
}
