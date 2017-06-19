function has(type) {
	var self = {};
	if (type == "numbers" || type == "digits" || type == "num") return '(?=.*[0-9])';
	if (type == "letters" || type == "char") return '(?=.*[a-zA-Z])';
	return self;
}
function hasString(string) {
	return '(?=.*\\b' + string + '\\b.*)';
}
function notString(string) {
	return '(?=^(?!.*' + string + ').*$)';
}
function not(type) {
	var self = {};
	// this would work better for not('numbers') ===> \D
	if (type == "numbers" || type == "digits" || type == "num") return '(?=.*^([^0-9]*)$)';
	if (type == "letters" || type == "char") return '(?=.*^([^a-zA-Z]*)$)';
	return self;
}
function or() {
	return '|';
}
function atLeastOne(type) {
	var r = new RegExp('(?=.*' + type + '+)', 'g');
	return r;
}
function wordSize(size) {
	var r = new RegExp('(?=[a-zA-Z]{' + size + '})', 'gi');
	return r;
}
/*function beginsWith(type) {
	eval("var r = new RegExp('\b'" + type + ", 'g');");
	return r;
}
function endsWith(type) {
	var r = new RegExp(eval("'\B'" + type + ", 'g')");
	return r;
}*/
function showRegex(type) { 
	return eval(type);
}
/* 
	to do list:
		- create aliases that actually work
*/