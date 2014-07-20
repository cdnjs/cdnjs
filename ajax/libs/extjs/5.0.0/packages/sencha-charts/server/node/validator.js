var helpers = require('./helpers.js');

function verifyConfig(config, rules) {
    if (!helpers.isObject(config)) {
        return null;
    }
    var result = {};
    for (var name in config) {
        var rule = rules[name];
        if (rule && (
            ( typeof rule === 'function' && rule(config[name]) ) ||
            ( rule instanceof RegExp && typeof config[name] === 'string' && config[name].match(rule) ) ||
            ( typeof config[name] === rule )
        )) {
            result[name] = config[name];
        }
    }
    return result;
}


module.exports = {
    verifyConfig: verifyConfig
};


