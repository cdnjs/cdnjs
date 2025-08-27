// eslint-disable-next-line @typescript-eslint/ban-types
export function mapObject(object, map) {
    return Object.entries(object).reduce((acc, [key, value])=>Object.assign(acc, {
            [key]: map(value, key)
        }), // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/prefer-reduce-type-parameter
    {});
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function filterObject(object, filter) {
    return Object.entries(object).reduce((acc, [key, value])=>{
        if (filter(value, key)) {
            Object.assign(acc, {
                [key]: value
            });
        }
        return acc;
    }, // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/prefer-reduce-type-parameter
    {});
}

//# sourceMappingURL=object.js.map