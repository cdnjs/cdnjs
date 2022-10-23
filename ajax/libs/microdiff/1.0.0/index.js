export default function diff(obj, newObj) {
    let diffs = [];
    for (const key in obj) {
        if (!(key in newObj)) {
            diffs.push({
                type: "REMOVE",
                path: [key],
            });
        }
        else if (obj[key] && typeof obj[key] === "object") {
            const nestedDiffs = diff(obj[key], newObj[key]);
            diffs.push(...nestedDiffs.map((difference) => {
                difference.path.unshift(key);
                return difference;
            }));
        }
        else if (obj[key] !== newObj[key]) {
            diffs.push({
                path: [key],
                type: "CHANGE",
                value: newObj[key],
            });
        }
    }
    for (const key in newObj) {
        if (!(key in obj)) {
            diffs.push({
                type: "CREATE",
                path: [key],
                value: newObj[key],
            });
        }
    }
    return diffs;
}
