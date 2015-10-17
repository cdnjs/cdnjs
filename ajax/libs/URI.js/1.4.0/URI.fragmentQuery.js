/*
 * Extending URL.js for fragment abuse
 */

// --------------------------------------------------------------------------------
// EXAMPLE: storing application/x-www-form-urlencoded data in the fragment
// possibly helpful for Google's hashbangs 
// see http://code.google.com/web/ajaxcrawling/
// --------------------------------------------------------------------------------

// USAGE:
// var uri = URI("http://example.org/#?foo=bar");
// uri.fragment(true) === {foo: "bar"};
// uri.fragment({bar: "foo"});
// uri.toString() === "http://example.org/#?bar=foo";
// uri.addFragment("name", "value");
// uri.toString() === "http://example.org/#?bar=foo&name=value";
// uri.removeFragment("name");
// uri.toString() === "http://example.org/#?bar=foo";

(function(URI, undefined){

var p = URI.prototype,
    // old fragment handler we need to wrap
    f = p.fragment,
    // NOTE: google want's #! (hashbang), others might want #? others might want plain #
    // choose the prefix you want to use here
    prefix = '?';

// add fragment(true) and fragment({key: value}) signatures
p.fragment = function(v, build) {
    if (v === true) {
        return URI.parseQuery(this._parts.fragment.substring(prefix.length));
    } else if (v !== undefined && typeof v !== "string") {
        this._parts.fragment = prefix + URI.buildQuery(v);
        this.build(!build);
        return this;
    } else {
        return f.call(this, v, build);
    }
};
p.addFragment = function(name, value, build) {
    var data = URI.parseQuery(this._parts.fragment.substring(prefix.length));
    URI.addQuery(data, name, value);
    this._parts.fragment = prefix + URI.buildQuery(data);
    if (typeof name !== "string") {
        build = value;
    }
    
    this.build(!build);
    return this;
};
p.removeFragment = function(name, value, build) {
    var data = URI.parseQuery(this._parts.fragment.substring(prefix.length));
    URI.removeQuery(data, name, value);
    this._parts.fragment = prefix + URI.buildQuery(data);
    if (typeof name !== "string") {
        build = value;
    }
    
    this.build(!build);
    return this;
};
p.addHash = p.addFragment;
p.removeHash = p.removeFragment;

})(window.URI);