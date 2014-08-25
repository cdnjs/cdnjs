YUI.add('anim-shape-transform', function(Y) {

/**
 * Adds support for the <code>transform</code> attribute of <code>Graphic</code>
 * <code>Shape</code> instances.
 * @module anim
 * @submodule anim-shape-transform
 */
    var NUM = Number,
        TO,
        TOSTRING;

    Y.Anim.behaviors.transform = {
        set: function(anim, att, from, to, elapsed, duration, fn) {
            var node = anim._node,
                transform = "",
                transformTo,
                transformFrom,
                toArgs,
                fromArgs,
                i = 0,
                j,
                argLen,
                len;
            to = TO;
            len = TO.length;
            for(; i < len; ++i)
            {
                toArgs = to[i].concat();
                fromArgs = from[i].concat();
                transformTo = toArgs.shift();
                transformFrom = fromArgs.shift();
                argLen = toArgs.length;
                transform += transformTo + "(";
                for(j = 0; j < argLen; ++j)
                {
                    transform += fn(elapsed, NUM(fromArgs[j]), NUM(toArgs[j]) - NUM(fromArgs[j]), duration);
                    if(j < argLen - 1)
                    {
                        transform += ", ";
                    }
                }
                transform += ");";
            }
            if(transform)
            {
                node.set('transform', transform);
            }
            node._transform = TOSTRING;
        },
        
        get: function(anim) {
            var node = anim._node,
                fromMatrix = node.matrix,
                toAttr = anim.get("to") || {},
                toString = anim.get("to").transform,
                fromString = node.get("transform"),
                toArray = Y.MatrixUtil.getTransformArray(toString),
                fromArray = fromString ? Y.MatrixUtil.getTransformArray(fromString) : null,
                toMatrix,
                i,
                len,
                transformFunction,
                from;
            if(toArray)
            {
                if(!fromArray || fromArray.length < 1)
                {
                    fromArray = [];
                    len = toArray.length;
                    for(i = 0; i < len; ++i)
                    {
                        transformFunction = toArray[i][0];
                        fromArray[i] = Y.MatrixUtil.getTransformFunctionArray(transformFunction);
                    }
                    TO = toArray;
                    from = fromArray;
                }
                else if(Y.MatrixUtil.compareTransformSequence(toArray, fromArray))
                {
                    TO = toArray;
                    from = fromArray;
                }
                else
                {
                    toMatrix = new Y.Matrix();
                    len = toArray.length;
                    for(i = 0; i < len; ++i)
                    {
                        transformFunction = toArray[i].shift();
                        transformFunction = transformFunction == "matrix" ? "multiply" : transformFunction;
                        toMatrix[transformFunction].apply(toMatrix, toArray[i]); 
                    }

                    TO = toMatrix.decompose();
                    from = fromMatrix.decompose();
                }
            }
            TOSTRING = toString;
            return from;
        }
    };  



}, '@VERSION@' ,{requires:['anim-base','matrix']});
