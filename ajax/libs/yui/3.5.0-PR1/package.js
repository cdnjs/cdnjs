exports.path = function() {
    return __dirname;
};

exports.YUI = require("./yui-nodejs/yui-nodejs").YUI;

var inst,
    getInstance = function() {
        if (!inst) {
            inst = exports.YUI({ useSync: true });
        }
        return inst;
    };

exports.getInstance = getInstance;
exports.use = exports.useSync = function() {
      var inst = getInstance();
      return inst.use.apply(inst, arguments);
};
