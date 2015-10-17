YUI.add('rls', function(Y) {

/**
 * Implentation for building the remote loader service url.
 * @method _rls
 * @param {Array} what the requested modules.
 * @since 3.2.0
 * @return {string} the url for the remote loader service call.
 */
Y._rls = function(what) {

    var config = Y.config,

        // the configuration
        rls = config.rls || {
            m: 1, // required in the template
            v: Y.version,
            gv: config.gallery,
            env: 1, // required in the template
            lang: config.lang,
            '2in3v': config['2in3'],
            '2v': config.yui2,
            filt: config.filter,
            filts: config.filters,
            tests: 1 // required in the template
        },

        // The rls base path
        rls_base = config.rls_base || 'load?',

        // the template
        rls_tmpl = config.rls_tmpl || function() {
            var s = '', param;
            for (param in rls) {
                if (param in rls && rls[param]) {
                    s += param + '={' + param + '}&';
                }
            }
            // console.log('rls_tmpl: ' + s);
            return s;
        }(),

        url;

    // update the request
    rls.m = what.sort(); // cache proxy optimization
    rls.env = Y.Object.keys(YUI.Env.mods).sort();
    rls.tests = Y.Features.all('load', [Y]);

    url = Y.Lang.sub(rls_base + rls_tmpl, rls);

    config.rls = rls;
    config.rls_tmpl = rls_tmpl;

    // console.log(url);
    return url;
};



}, '@VERSION@' ,{requires:['get','features']});
