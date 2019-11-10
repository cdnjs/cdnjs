
module.exports = function (obj, fn, ctx) {
    if (obj == null) return;
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i);
        }
    } else {
        for (var k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj,k)){
                fn.call(ctx, obj[k], k);
            }
        }
    }
};
