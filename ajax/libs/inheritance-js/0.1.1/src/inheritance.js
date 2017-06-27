/*!
 * Inheritance.js (0.1.1)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

function mix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}


function deepMix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        if (typeof mixin[attrName] === 'object') {
          deepMix(newObj[attrName], mixin[attrName]);
          continue;
        }
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}


function mixWithObjectDef(objDef, mixins) {
  objDef = (objDef || {});

  var objDefPrototype = objDef.prototype;

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        objDefPrototype[attrName] = mixin[attrName];
      }
    }
  }

  return objDef;
}

function extendObjectDef(parentDef, childDefAttrs) {
  var attrName;

  parentDef = (parentDef || Object);
  childDefAttrs = (childDefAttrs || {});

  var childDef = (childDefAttrs.ctor || function() { return this.super.apply(this, arguments); });


  for (attrName in parentDef) {
    if (attrName === 'extend') {
      continue;
    }
    childDef[attrName] = parentDef[attrName];
  }

  childDef.__super__ = parentDef.prototype;
  childDef.extend = function(childDefAttrs) {
    return extendObjectDef(childDef, childDefAttrs);
  };


  var mixins = childDefAttrs.mixins;
  if (mixins !== null && mixins instanceof Array) {
    deepMix(childDefAttrs, mixins);
  }


  var staticAttrs = childDefAttrs.static;
  if (typeof staticAttrs !== 'undefined' && staticAttrs !== null) {
    for (attrName in staticAttrs) {
      childDef[attrName] = staticAttrs[attrName];
    }
  }


  childDef.prototype = Object.create(parentDef.prototype);
  childDef.prototype.objDef = childDef;

  childDef.prototype.constructor = function() {
    if (!(this instanceof childDef)) {
      return new childDef(arguments);
    }

    for (var funcName in this._super) {
      if (funcName !== '_super') {
        this._super[funcName] = this._super[funcName].bind(this);
      }
    }

    childDef(arguments);
  };


  childDef.prototype.super = function() {
    this.objDef.__super__.constructor.apply(this, arguments);
  };

  childDef.prototype._super = {};

  for (attrName in parentDef.prototype) {
    childDef.prototype._super[attrName] = function() {
      return this.objDef.__super__[attrName].apply(this, arguments);
    };
  }

  for (attrName in childDefAttrs) {
    if (attrName === 'constructor'
        || attrName === 'ctor'
        || attrName === 'objDef'
        || attrName === 'mixins'
        || attrName === 'static'
        || attrName === 'super'
        || attrName === '_super') {
      continue;
    }
    childDef.prototype[attrName] = childDefAttrs[attrName];
  }


  return childDef;
}

ArrayBuffer.extend = function(childDefAttrs) {
  return extendObjectDef(ArrayBuffer, childDefAttrs);
};

Array.extend = function(childDefAttrs) {
  return extendObjectDef(Array, childDefAttrs);
};

DataView.extend = function(childDefAttrs) {
  return extendObjectDef(DataView, childDefAttrs);
};

Date.extend = function(childDefAttrs) {
  return extendObjectDef(Date, childDefAttrs);
};

Error.extend = function(childDefAttrs) {
  return extendObjectDef(Error, childDefAttrs);
};

EvalError.extend = function(childDefAttrs) {
  return extendObjectDef(EvalError, childDefAttrs);
};

Float32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Float32Array, childDefAttrs);
};

Float64Array.extend = function(childDefAttrs) {
  return extendObjectDef(Float64Array, childDefAttrs);
};

Function.extend = function(childDefAttrs) {
  return extendObjectDef(Function, childDefAttrs);
};

if (typeof Int16Array !== 'undefined' && Int16Array !== null) {
  Int16Array.extend = function(childDefAttrs) {
    return extendObjectDef(Int16Array, childDefAttrs);
  };
}

Int32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Int32Array, childDefAttrs);
};

Int8Array.extend = function(childDefAttrs) {
  return extendObjectDef(Int8Array, childDefAttrs);
};

Intl.Collator.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.Collator, childDefAttrs);
};

Intl.DateTimeFormat.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.DateTimeFormat, childDefAttrs);
};

Intl.NumberFormat.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.NumberFormat, childDefAttrs);
};

if (typeof Map !== 'undefined' && Map !== null) {
  Map.extend = function(childDefAttrs) {
    return extendObjectDef(Map, childDefAttrs);
  };
}

Number.extend = function(childDefAttrs) {
  return extendObjectDef(Number, childDefAttrs);
};

// ------------------ //
// Static Functions   //
// ------------------ //

Object.extend = function(childDefAttrs) {
  return extendObjectDef(Object, childDefAttrs);
};



// ------------------ //
// Instance Functions //
// ------------------ //

Object.prototype.mix = function() {
  return mix(this, arguments);
};


Object.prototype.deepMix = function() {
  return deepMix(this, arguments);
};

if (typeof Promise !== 'undefined' && Promise !== null) {
  Promise.extend = function(childDefAttrs) {
    return extendObjectDef(Promise, childDefAttrs);
  };
}

if (typeof Proxy !== 'undefined' && Proxy !== null) {
  Proxy.extend = function(childDefAttrs) {
    return extendObjectDef(Proxy, childDefAttrs);
  };
}

RangeError.extend = function(childDefAttrs) {
  return extendObjectDef(RangeError, childDefAttrs);
};

ReferenceError.extend = function(childDefAttrs) {
  return extendObjectDef(ReferenceError, childDefAttrs);
};

if (typeof Reflect !== 'undefined' && Reflect !== null) {
  Reflect.extend = function(childDefAttrs) {
    return extendObjectDef(Reflect, childDefAttrs);
  };
}

RegExp.extend = function(childDefAttrs) {
  return extendObjectDef(RegExp, childDefAttrs);
};

if (typeof Set !== 'undefined' && Set !== null) {
  Set.extend = function(childDefAttrs) {
    return extendObjectDef(Set, childDefAttrs);
  };
}

String.extend = function(childDefAttrs) {
  return extendObjectDef(String, childDefAttrs);
};

if (typeof Promise !== 'undefined' && Promise !== null) {
  Symbol.extend = function(childDefAttrs) {
    return extendObjectDef(Symbol, childDefAttrs);
  };
}

SyntaxError.extend = function(childDefAttrs) {
  return extendObjectDef(SyntaxError, childDefAttrs);
};

TypeError.extend = function(childDefAttrs) {
  return extendObjectDef(TypeError, childDefAttrs);
};

Uint16Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint16Array, childDefAttrs);
};

Uint32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint32Array, childDefAttrs);
};

Uint8Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint8Array, childDefAttrs);
};

Uint8ClampedArray.extend = function(childDefAttrs) {
  return extendObjectDef(Uint8ClampedArray, childDefAttrs);
};

URIError.extend = function(childDefAttrs) {
  return extendObjectDef(URIError, childDefAttrs);
};

if (typeof WeakMap !== 'undefined' && WeakMap !== null) {
  WeakMap.extend = function(childDefAttrs) {
    return extendObjectDef(WeakMap, childDefAttrs);
  };
}

if (typeof WeakSet !== 'undefined' && WeakSet !== null) {
  WeakSet.extend = function(childAttrs) {
    return extendObjectDef(WeakSet, childAttrs);
  };
}

window.ObjectDefinition = {
  create: function(objDefAttrs) {
    return Object.extend(objDefAttrs);
  }
};
