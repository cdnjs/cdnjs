
/**
 * mergeObjects combines the keys from obj2 into obj2, then returns obj1
 *
 * @param {object} obj1
 * @param {object} obj2
 * @returns object
 */
export function mergeObjects(obj1, obj2) {
	for (var key in obj2) {
		if (obj2.hasOwnProperty(key)) {
			obj1[key] = obj2[key];
		}
	}
	return obj1;
}

export function getOrInitObject(root, prop) {
	var value = root[prop];
	if (value) {
		return value;
	} else {
		var newObj = {};
		root[prop] = newObj;
		return newObj;
	}
}

/**
 * parseJSON parses a JSON string into a corresponding value.  If the
 * value passed in is not valid JSON, then it logs an error and returns `null`.
 *
 * @param {string} jString
 * @returns any
 */
export function parseJSON(jString) {
	try {
		return JSON.parse(jString);
	} catch (error) {
		logError(error);
		return null;
	}
}

/**
 * logError writes an error message to the Javascript console.  It can take any
 * value, but msg should commonly be a simple string.
 * @param {*} msg
 */
export function logError(msg) {
	if (console.error) {
		console.error(msg);
	} else if (console.log) {
		console.log("ERROR: ", msg);
	}
}

// TODO: JSDoc description of what's happening here
export function varargConstructor(Cls, args) {
	return new (Cls.bind.apply(Cls, [Cls].concat(args)))();
}
