/** Tests for detectmobilebrowser.js
 */
var assert = require('assert');
var jsdom  = require('jsdom').jsdom

global.window = jsdom().createWindow();
global.jQuery = require("jquery");
global.document = {
		cookie : ""
};

var mobilize = require("../js/mobilize.js").mobilize;

function testDetect(expect, name) {
	var detected;
	global.document.cookie = "";
	detected = mobilize.checkMobileBrowser({forceUserAgent : name});
	assert.equal(expect, detected, name);
}

var browserAgent = "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.13 (KHTML, like Gecko) Chrome/9.0.597.98 Safari/534.13";

testDetect(false, browserAgent);
testDetect(true, "symbian");
testDetect(true, "android");

// Test forcing
detected = mobilize.checkMobileBrowser({forceUserAgent : "symbian", forceMobilize : false});
assert.equal(false, detected);

detected = mobilize.checkMobileBrowser({forceUserAgent : browserAgent, forceMobilize : true});
assert.equal(true, detected);

browserAgent = "Mozilla/5.0 (X11; Linux i686 on x86_64; rv:2.0b11) Gecko/20100101 Firefox/4.0b11"
testDetect(false, browserAgent);

console.log("test_detectmobilebrowser.js passed");
