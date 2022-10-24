const t = true;
const richTypes = { Date: t, RegExp: t, String: t, Number: t };
export default function diff(obj, newObj, stack = []) {
	let diffs = [];
	for (const key in obj) {
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [key],
			});
		} else if (
			obj[key] &&
			newObj[key] &&
			typeof obj[key] === "object" &&
			typeof newObj[key] === "object" &&
			!richTypes[Object.getPrototypeOf(obj[key]).constructor.name] &&
			!stack.includes(obj[key])
		) {
			const nestedDiffs = diff(obj[key], newObj[key], stack.concat(obj[key]));
			diffs.push(
				...nestedDiffs.map((difference) => {
					difference.path.unshift(key);
					return difference;
				})
			);
		} else if (
			obj[key] !== newObj[key] &&
			!(
				typeof obj[key] === "object" &&
				typeof newObj[key] === "object" &&
				(isNaN(obj[key])
					? obj[key] + "" === newObj[key] + ""
					: +obj[key] === +newObj[key])
			)
		) {
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
