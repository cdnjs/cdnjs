export const getRequiredValueByKey = (key, map)=>{
    if (!map.hasOwnProperty(key)) {
        throw new Error(`getRequiredValueByKey(${key})`);
    }
    return map[key];
};
export const getValueByKey = (key, map, defaultValue)=>{
    if (!map.hasOwnProperty(key)) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`getValueByKey(${String(key)})`);
    }
    return map[key];
};

//# sourceMappingURL=getValueByKey.js.map