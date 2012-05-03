
var assert = require("assert");
var jsdom  = require('jsdom').jsdom
global.window = jsdom().createWindow();
global.jQuery = require("jquery");
global.document = global.window.document;
global.document.cookie = "";

document = global.document;
document.createElement("html");
// To get through browser support check
document.defaultView.getComputedStyle = function(){
    return { position : "absolute" };
}

var mobilize = require("../js/mobilize").mobilize;

function test_getUrlVars() {
    var vars = mobilize.getUrlVars("http://test?t=2&a=3&b=5")
    assert.equal("2", vars.t);
    assert.equal("5", vars.b);
    
    var vars = mobilize.getUrlVars("http://test?t=2&a=3&b=5#page-href")
    assert.equal("2", vars.t);
    assert.equal("5", vars.b);
    
}

function test_reloadOnMobile() {
    mobilize.createCookie("mobilize-mobile", "");       
    var reloadcalled = false;
    window.location.reload = function(){
        reloadcalled = true;
    }
    mobilize.init({reloadOnMobile : true, forceUserAgent : "android"});
    assert.ok(reloadcalled);
    
    reloadcalled = false
    
    mobilize.init({reloadOnMobile : false, forceUserAgent : "android"});
    assert.ok(!reloadcalled);
}

function test_baseurl() {
	var url = "http://localhost:8080/test/template.html/?testing=123";
	var expect = "http://localhost:8080/test/";
	url = mobilize.baseurl(url);
	
	assert.equal(expect, url);
	
}

function test_addUrlVar()
{
    // Adding mobilize.js to url
    var url = "http://localhost:8080/test?test=asd"
    var newurl = mobilize.addUrlVar(url, "mobilize=true");
    assert.equal(newurl, "http://localhost:8080/test?test=asd&mobilize=true");
    
}


test_baseurl();
test_getUrlVars();
test_reloadOnMobile();
test_addUrlVar();

console.log("Common tests passed");
