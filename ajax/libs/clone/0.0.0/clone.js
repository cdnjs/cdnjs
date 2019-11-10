var clone = function(param) {
	var result;
	// if function
	if (typeof param === "function") {
		var tmp = param;
		result = function() {
			return tmp.apply(param, arguments);
		};
	}
	// if date (not 100% safe)
	else if (typeof param.getTime === "function") {
		result = new Date(param.getTime());
	} else if (typeof param === "array")
		result = [];
	else if (typeof param === "object")
		result = {};
	// if nothing matched return the same value
	else
		return param;

	for (var i in param) {
		result[i] = clone(param[i]);
	}

	return result;
};

module.exports = clone;
