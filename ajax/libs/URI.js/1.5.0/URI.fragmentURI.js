/*
 * Extending URI.js for fragment abuse
 */

// --------------------------------------------------------------------------------
// EXAMPLE: storing a relative URL in the fragment ("FragmentURI")
// possibly helpful when working with backbone.js or sammy.js
// inspired by https://github.com/medialize/URI.js/pull/2
// --------------------------------------------------------------------------------

// USAGE:
// var uri = URI("http://example.org/#!/foo/bar/baz.html"),
//     furi = uri.fragment(true);
// furi.pathname() === '/foo/bar/baz.html';
// furi.pathname('/hello.html');
// uri.toString() === "http://example.org/#!/hello.html"

(function(URI, undefined){

var p = URI.prototype,
    // old handlers we need to wrap
    f = p.fragment,
    b = p.build,
    // NOTE: google want's #! (hashbang), others might want plain #
    // choose the prefix you want to use here
    prefix = '!';

// add fragment(true) and fragment(URI) signatures    
p.fragment = function(v, build) {
    if (v === true) {
        var furi = new URI(this._parts.fragment.substring(prefix.length));
        this._furi = furi;
        return furi;
    } else if (v !== undefined && typeof v !== "string") {
        this._furi = furi;
        this._parts.fragment = prefix + v.toString();
        this.build(!build);
        return this;
    } else if (typeof v === "string") {
        this._furi = undefined;
    }

    return f.call(this, v, build);
};

// make .build() of the actual URI aware of the FragmentURI
p.build = function(deferBuild) {
    if (this._furi) {
        this._parts.fragment = prefix + this._furi.toString();
    }

    return b.call(this, deferBuild);
};

})(window.URI);