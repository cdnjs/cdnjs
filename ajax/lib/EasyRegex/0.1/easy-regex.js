function has(type) {
	var self = {};
	if (type == "numbers" || type == "digits" || type == "nums") return '(?=.*[0-9])';
	if (type == "letters" || type == "chars") return '(?=.*[a-zA-Z])';
	/* telephone, email, address, website, */
	if (type == "telephone" || type == "phone") {
		//source : https://stackoverflow.com/questions/123559/a-comprehensive-regex-for-phone-number-validation
		return '/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm';
	}
	if (type == "email" || type == "e-mail") {
		//source: http://emailregex.com/
		return '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
	}
	if (type.match('.*\\bsite\\b.*')) {
		return 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
	}
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
	if (type == "numbers") return '(?=.*^([^0-9]*)$)';
	if (type == "letters") return '(?=.*^([^a-zA-Z]*)$)';
	return self;
}
/* alias */
function contains(type) {
	has(type);
	return type;
}
function includes(type) {
	has(type);
	return type;
}
function string(string) { 
	hasString(string);
	return string;
}
function no(type) {
	not(type);
	return type;
}
function noString(string) {
	notString(string);
	return string;
}
