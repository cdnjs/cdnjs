import * as $array from "./Array";
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export function fromArray(array) {
    return function (push) {
        var length = array.length;
        for (var i = 0; i < length; ++i) {
            if (!push(array[i])) {
                break;
            }
        }
    };
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export function length(iter) {
    var sum = 0;
    iter(function (_) {
        ++sum;
        return true;
    });
    return sum;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export function toArray(iter) {
    var output = [];
    iter(function (value) {
        output.push(value);
        return true;
    });
    return output;
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function eachContinue(iter, fn) {
    iter(fn);
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function each(iter, fn) {
    iter(function (value) {
        fn(value);
        return true;
    });
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function sort(iter, fn) {
    return fromArray(toArray(iter).sort(fn));
}
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function map(iter, fn) {
    return function (push) { return iter(function (value) { return push(fn(value)); }); };
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function filter(iter, fn) {
    return function (push) { return iter(function (value) {
        if (fn(value)) {
            return push(value);
        }
        else {
            return true;
        }
    }); };
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (push) {
        var go = true;
        var push2 = function (value) { return (go = push(value)); };
        var length = args.length;
        for (var i = 0; i < length; ++i) {
            args[i](push2);
            if (!go) {
                break;
            }
        }
    };
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export function flatten(iter) {
    return function (push) {
        var go = true;
        var push2 = function (value) { return (go = push(value)); };
        iter(function (value) {
            value(push2);
            return go;
        });
    };
}
/**
 * [number description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function indexed(iter) {
    return function (push) {
        var index = 0;
        iter(function (value) { return push([index++, value]); });
    };
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function findIndex(iter, matches) {
    var found = false;
    var i = 0;
    iter(function (value) {
        if (matches(value)) {
            found = true;
            return false;
        }
        else {
            ++i;
            return true;
        }
    });
    return (found ? i : -1);
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function find(iter, matches) {
    var output;
    iter(function (value) {
        if (matches(value)) {
            output = value;
            return false;
        }
        else {
            return true;
        }
    });
    return output;
}
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function findMap(iter, matches) {
    var output;
    iter(function (value) {
        var v = matches(value);
        if (v !== null) {
            output = v;
            return false;
        }
        else {
            return true;
        }
    });
    return output;
}
/**
 * [iter description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function contains(iter, matches) {
    var output = false;
    iter(function (value) {
        if (matches(value)) {
            output = true;
            return false;
        }
        else {
            return true;
        }
    });
    return output;
}
/**
 * [A description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export function foldl(iter, init, fn) {
    iter(function (value) {
        init = fn(init, value);
        return true;
    });
    return init;
}
/**
 * [min2 description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param left [description]
 * @param right [description]
 * @return [description]
 */
function min2(left, right) {
    if (left == null || right < left) {
        return right;
    }
    else {
        return left;
    }
}
/**
 * [min description]
 *
 * @ignore Exclude from docs
 * @todo Verify that this works correctly
 * @todo Description
 * @param a [description]
 * @return [description]
 */
export function min(a) {
    return foldl(a, null, min2);
}
/**
 * [max2 description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param left [description]
 * @param right [description]
 * @return [description]
 */
function max2(left, right) {
    if (left == null || right > left) {
        return right;
    }
    else {
        return left;
    }
}
/**
 * [max description]
 *
 * @ignore Exclude from docs
 * @todo Verify that this works correctly
 * @todo Description
 * @param a [description]
 * @return [description]
 */
export function max(a) {
    return foldl(a, null, max2);
}
/**
 * [join description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param iter [description]
 * @param separator [description]
 * @return [description]
 */
export function join(iter, separator) {
    if (separator === void 0) { separator = ""; }
    var first = true;
    var init = "";
    iter(function (value) {
        if (first) {
            first = false;
        }
        else {
            init += separator;
        }
        init += value;
        return true;
    });
    return init;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
var ListIterator = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param list [description]
     * @param create [description]
     */
    function ListIterator(list, create) {
        // flag specifies if iterator should create new list item if it is reqested for a nextItem but there is no more left in the list
        this.createNewItems = false;
        this.list = list;
        this._create = create;
        this.reset();
    }
    ListIterator.prototype.reset = function () {
        this._listCopy = toArray(this.list.iterator());
    };
    ListIterator.prototype.clear = function () {
        this._listCopy.length = 0;
    };
    ListIterator.prototype.getFirst = function () {
        return this.returnItem(0);
    };
    ListIterator.prototype.getLast = function () {
        return this.returnItem(this._listCopy.length - 1);
    };
    ListIterator.prototype.find = function (fn) {
        var index = $array.findIndex(this._listCopy, fn);
        if (index !== -1) {
            var item = this._listCopy[index];
            // TODO use removeIndex instead ?
            $array.remove(this._listCopy, item);
            return item;
        }
        else {
            return this.getLast();
        }
    };
    ListIterator.prototype.removeItem = function (item) {
        return $array.remove(this._listCopy, item);
    };
    ListIterator.prototype.returnItem = function (index) {
        if (index >= 0 && index < this._listCopy.length) {
            var item = this._listCopy[index];
            // TODO use removeIndex instead ?
            $array.remove(this._listCopy, item);
            return item;
        }
        else if (this.createNewItems) {
            return this._create();
        }
    };
    ListIterator.prototype.iterator = function () {
        return fromArray(this._listCopy);
    };
    return ListIterator;
}());
export { ListIterator };
//# sourceMappingURL=Iterator.js.map