/**
 * Returns a simple string representation of the object or array.
 * Other types of objects will be returned unprocessed.  Arrays
 * are expected to be indexed.  Use object notation for
 * associative arrays.
 *
 * If included, the dump method is added to the YUI instance.
 *
 * @module dump
 */
YUI.add("dump", function(Y) {

    var L=Y.Lang, OBJ="{...}", FUN="f(){...}", COMMA=', ', ARROW=' => ',

    /**
     * The following methods are added to the YUI instance
     * @class YUI~dump
     */

    /**
     * Returns a simple string representation of the object or array.
     * Other types of objects will be returned unprocessed.  Arrays
     * are expected to be indexed.  Use object notation for
     * associative arrays.
     *
     * @TODO dumping a window is causing an unhandled exception in
     * FireFox.
     *
     * This method is in the 'dump' module, which is not bundled with
     * the core YUI object
     *
     * @method dump
     * @param o {object} The object to dump
     * @param d {int} How deep to recurse child objects, default 3
     * @return {string} the dump result
     */
    dump = function(o, d) {
        var i, len, s = [];


        // Cast non-objects to string
        // Skip dates because the std toString is what we want
        // Skip HTMLElement-like objects because trying to dump 
        // an element will cause an unhandled exception in FF 2.x
        if (!L.isObject(o)) {
            return o + "";
        } else if (o instanceof Date || ("nodeType" in o && "tagName" in o)) {
            return o;
        } else if  (L.isFunction(o)) {
            return FUN;
        }

        // dig into child objects the depth specifed. Default 3
        d = (L.isNumber(d)) ? d : 3;

        // arrays [1, 2, 3]
        if (L.isArray(o)) {
            s.push("[");
            for (i=0,len=o.length;i<len;i=i+1) {
                if (L.isObject(o[i])) {
                    s.push((d > 0) ? L.dump(o[i], d-1) : OBJ);
                } else {
                    s.push(o[i]);
                }
                s.push(COMMA);
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("]");
        // objects {k1 => v1, k2 => v2}
        } else {
            s.push("{");
            for (i in o) {
                if (Y.Object.owns(o, i)) {
                    s.push(i + ARROW);
                    if (L.isObject(o[i])) {
                        s.push((d > 0) ? L.dump(o[i], d-1) : OBJ);
                    } else {
                        s.push(o[i]);
                    }
                    s.push(COMMA);
                }
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("}");
        }

        return s.join("");
    };

    Y.dump = dump;
    L.dump = dump;

}, "@VERSION@");
