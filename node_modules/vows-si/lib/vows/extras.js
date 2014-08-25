var events = require('events');
//
// Wrap a Node.js style async function into an EventEmmitter
//
this.prepare = function (obj, targets) {
    targets.forEach(function (target) {
        if (target in obj) {
            obj[target] = (function (fun) {
                return function () {
                    var args = Array.prototype.slice.call(arguments);
                    var ee = new(events.EventEmitter);

                    args.push(function (err /* [, data] */) {
                        var args = Array.prototype.slice.call(arguments, 1);

                        if (err) { ee.emit.apply(ee, ['error', err].concat(args)) }
                        else     { ee.emit.apply(ee, ['success'].concat(args)) }
                    });
                    fun.apply(obj, args);

                    return ee;
                };
            })(obj[target]);
        }
    });
    return obj;
};

