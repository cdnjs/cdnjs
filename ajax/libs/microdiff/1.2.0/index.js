const t = true;
const richTypes = { Date: t, RegExp: t, String: t, Number: t };
export default function diff(
	obj,
	newObj,
	options = { cyclesFix: true },
	_stack = []
) {
	let diffs = [];
	for (const key in obj) {
		const objKey = obj[key];
		const path = Array.isArray(obj) ? +key : key;
		if (!(key in newObj)) {
			diffs.push({
				type: "REMOVE",
				path: [path],
			});
			continue;
		}
		const newObjKey = newObj[key];
		const areObjects =
			typeof objKey === "object" && typeof newObjKey === "object";
		if (
			objKey &&
			newObjKey &&
			areObjects &&
			!richTypes[Object.getPrototypeOf(objKey).constructor.name] &&
			(options.cyclesFix ? !_stack.includes(objKey) : true)
		) {
			const nestedDiffs = diff(
				objKey,
				newObjKey,
				options,
				options.cyclesFix ? _stack.concat([objKey]) : []
			);
			diffs.push.apply(
				diffs,
				nestedDiffs.map((difference) => {
					difference.path.unshift(path);
					return difference;
				})
			);
		} else if (
			objKey !== newObjKey &&
			!(
				areObjects &&
				(isNaN(objKey)
					? objKey + "" === newObjKey + ""
					: +objKey === +newObjKey)
			)
		) {
			diffs.push({
				path: [path],
				type: "CHANGE",
				value: newObjKey,
			});
		}
	}
	for (const key in newObj) {
		if (!(key in obj)) {
			diffs.push({
				type: "CREATE",
				path: [Array.isArray(newObj) ? +key : key],
				value: newObj[key],
			});
		}
	}
	return diffs;
}
