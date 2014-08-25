function merge(source, add) {
    'use strict';

    var result = source || {};

    if (!add) {
        return result;
    }

    Object.keys(add).forEach(function (prop) {
        if (!result.hasOwnProperty(prop)) {
            result[prop] = add[prop];
        }
    });

    return result;
}
exports.merge = merge;

function preprocessScript(script) {
    'use strict';

    // Fix UTF8 with BOM
    if (script.charCodeAt(0) === 0xFEFF) {
        script = script.slice(1);
    }

    // remove shebang: replace it with empty line
    /*jslint regexp: true*/
    script = script.replace(/^\#\!.*/, "");
    /*jslint regexp: false*/

    return script;
}
exports.preprocessScript = preprocessScript;

exports.doLint = function (JSLINT, script, options) {
    'use strict';
    var ok,
        result;

    script = preprocessScript(script);

    ok = JSLINT(script, options);

    result = JSLINT.data();
    result.ok = ok;
    result.options = options;

    return result;
};
