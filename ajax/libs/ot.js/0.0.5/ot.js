if (typeof ot === 'undefined') {
  // Export for browsers
  var ot = {};
}

ot.Operation = (function () {

  // Constructor for new operations. Expects an revision number (non-negative
  // integer) and an optional ID (string). If no ID is given, a random ID will
  // be generated.
  function Operation (revision, id, meta) {
    assert(
      typeof revision === 'number' && revision >= 0,
      "the first parameter to the the parent revision number of the document"
    );
    this.revision = revision;
    this.id = id || randomID();
    assert(this.id && typeof this.id === 'string', "not a valid id: " + this.id);

    // Place to store arbitrary data. This could be a timestamp of the edit, the
    // name of the author, etc...
    this.meta = meta || {};

    // When an operation is applied to an input string, you can think of this as
    // if an imaginary cursor runs over the entire string and skips over some
    // parts, deletes some parts and inserts characters at some positions. These
    // actions (skip/delete/insert) are stored as an array in the "ops" property.
    this.ops = [];
    // An operation's baseLength is the length of every string the operation
    // can be applied to.
    this.baseLength = 0;
    // The targetLength is the length of every string that results from applying
    // the operation on a valid input string.
    this.targetLength = 0;
  }

  // After an operation is constructed, the user of the library can specify the
  // actions of an operation (skip/insert/delete) with these three builder
  // methods. They all return the operation for convenient chaining.

  // Skip over a given number of characters.
  Operation.prototype.retain = function (n) {
    assert(typeof n === 'number' && n >= 0);
    if (n === 0) { return this; }
    this.baseLength += n;
    this.targetLength += n;
    var lastOp = this.ops[this.ops.length-1];
    if (lastOp && lastOp.retain) {
      // The last op is a retain op => we can merge them into one op.
      lastOp.retain += n;
    } else {
      // Create a new op.
      this.ops.push({ retain: n });
    }
    return this;
  };

  // Insert a string at the current position.
  Operation.prototype.insert = function (str) {
    assert(typeof str === 'string');
    if (str === '') { return this; }
    this.targetLength += str.length;
    var lastOp = this.ops[this.ops.length-1];
    if (lastOp && lastOp.insert) {
      // Merge insert op.
      lastOp.insert += str;
    } else {
      this.ops.push({ insert: str });
    }
    return this;
  };

  // Delete a string at the current position.
  Operation.prototype.delete = function (str) {
    assert(typeof str === 'string');
    if (str === '') { return this; }
    this.baseLength += str.length;
    var lastOp = this.ops[this.ops.length-1];
    if (lastOp && lastOp.delete) {
      lastOp.delete += str;
    } else {
      this.ops.push({ delete: str });
    }
    return this;
  };

  // Pretty printing.
  Operation.prototype.toString = function () {
    // map: build a new array by applying a function to every element in an old
    // array.
    var map = Array.prototype.map || function (fn) {
      var arr = this;
      var newArr = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        newArr[i] = fn(arr[i]);
      }
      return newArr;
    };
    return map.call(this.ops, function (op) {
      return op.retain
             ? "retain " + op.retain
             : (op.insert
                ? "insert '" + op.insert + "'"
                : "delete '" + op.delete + "'")
    }).join(', ');
  };

  // Converts a plain JS object into an operation and validates it.
  Operation.fromJSON = function (obj) {
    assert(obj.id);
    var o = new Operation(obj.revision, obj.id, obj.meta);
    assert(typeof o.meta === 'object');
    var ops = obj.ops;
    for (var i = 0, l = ops.length; i < l; i++) {
      var op = ops[i];
      if (op.retain) {
        o.retain(op.retain);
      } else if (op.insert) {
        o.insert(op.insert);
      } else if (op.delete) {
        o.delete(op.delete);
      } else {
        throw new Error("unknown operation: " + JSON.stringify(op));
      }
    }
    assert(o.baseLength === obj.baseLength, "baseLengths don't match");
    assert(o.targetLength === obj.targetLength, "targetLengths don't match");
    return o;
  };

  // Apply an operation to a string, returning a new string. Throws an error if
  // there's a mismatch between the input string and the operation.
  Operation.prototype.apply = function (str) {
    var operation = this;
    if (str.length !== operation.baseLength) {
      throw new Error("The operation's base length must be equal to the string's length.");
    }
    var newStr = [], j = 0;
    var strIndex = 0;
    var ops = this.ops;
    for (var i = 0, l = ops.length; i < l; i++) {
      var op = ops[i];
      if (op.retain) {
        if (strIndex + op.retain > str.length) {
          throw new Error("Operation can't retain more characters than are left in the string.");
        }
        // Copy skipped part of the old string.
        newStr[j++] = str.slice(strIndex, strIndex + op.retain);
        strIndex += op.retain;
      } else if (op.insert) {
        // Insert string.
        newStr[j++] = op.insert;
      } else { // delete op
        // Make sure that the deleted string matches the next characters in the
        // input string.
        if (op.delete !== str.slice(strIndex, strIndex + op.delete.length)) {
          throw new Error("The deleted string and the next characters in the string don't match.");
        }
        strIndex += op.delete.length;
      }
    }
    if (strIndex !== str.length) {
      throw new Error("The operation didn't operate on the whole string.");
    }
    return newStr.join('');
  };

  // Computes the inverse of an operation. The inverse of an operation is the
  // operation that reverts the effects of the operation, e.g. when you have an
  // operation 'insert("hello "); skip(6);' then the inverse is 'delete("hello ");
  // skip(6);'. The inverse should be used for implementing undo.
  Operation.prototype.invert = function () {
    var inverse = new Operation(this.revision + 1);
    var ops = this.ops;
    for (var i = 0, l = ops.length; i < l; i++) {
      var op = ops[i];
      if (op.retain) {
        inverse.retain(op.retain);
      } else if (op.insert) {
        inverse.delete(op.insert);
      } else { // delete op
        inverse.insert(op.delete);
      }
    }
    return inverse;
  };

  // Compose merges to consecutive operations (they must have consecutive
  // revision numbers) into one operation, that preserves the changes of both.
  // Or, in other words, for each input string S and a pair of consecutive
  // operations A and B, apply(apply(S, A), B) = apply(S, compose(A, B)) must
  // hold.
  Operation.prototype.compose = function (operation2) {
    var operation1 = this;
    if (operation1.targetLength !== operation2.baseLength) {
      throw new Error("The base length of the second operation has to be the target length of the first operation");
    }
    if (operation1.revision + 1 !== operation2.revision) {
      throw new Error("The second operations revision must be one more than the first operations revision");
    }
    var operation = new Operation(operation1.revision, undefined, operation1.meta); // the combined operation
    var ops1 = operation1.ops, ops2 = operation2.ops; // for fast access
    var i1 = 0, i2 = 0; // current index into ops1 respectively ops2
    var op1 = ops1[i1++], op2 = ops2[i2++]; // current ops
    while (true) {
      // save length of current ops
      var op1l = op1 && (op1.retain || (op1.insert || op1.delete).length);
      var op2l = op2 && (op2.retain || (op2.insert || op2.delete).length);
      var minl = Math.min(op1l, op2l);
      // Dispatch on the type of op1 and op2
      if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
        // end condition: both ops1 and ops2 have been processed
        break;
      } else if (typeof op1 === 'undefined') {
        if (!op2.insert) {
          throw new Error("Successive operations can only insert new characters at the end of the string.");
        }
        operation.insert(op2.insert);
        op2 = ops2[i2++];
      } else if (typeof op2 === 'undefined') {
        if (!op1.delete) {
          throw new Error("The first operation can only delete at the end of operation 2.");
        }
        operation.delete(op1.delete);
        op1 = ops1[i1++];
      } else if (op1.retain && op2.retain) {
        operation.retain(minl);
        if (op1l > op2l) {
          op1 = { retain: op1l - op2l };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { retain: op2l - op1l };
        }
      } else if (op1.insert && op2.delete) {
        if (op1.insert.slice(0, minl) !== op2.delete.slice(0, minl)) {
          throw new Error("Successive operations must delete what has been inserted before.");
        }
        if (op1l > op2l) {
          op1 = { insert: op1.insert.slice(op2l) };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { delete: op2.delete.slice(op1l) };
        }
      } else if (op1.insert && op2.retain) {
        if (op1l > op2l) {
          operation.insert(op1.insert.slice(0, op2l));
          op1 = { insert: op1.insert.slice(op2l) };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          operation.insert(op1.insert);
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          operation.insert(op1.insert);
          op1 =ops1[i1++];
          op2 = { retain: op2l - op1l };
        }
      } else if (op1.retain && op2.delete) {
        if (op1l > op2l) {
          operation.delete(op2.delete);
          op1 = { retain: op1l - op2l };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          operation.delete(op2.delete);
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          operation.delete(op2.delete.slice(0, op1l));
          op1 = ops1[i1++];
          op2 = { delete: op2.delete.slice(op1l) };
        }
      } else if (op1.delete) {
        operation.delete(op1.delete);
        op1 = ops1[i1++];
      } else if (op2.insert) {
        operation.insert(op2.insert);
        op2 = ops2[i2++];
      } else {
        throw new Error(
          "This shouldn't happen: op1: " +
          JSON.stringify(op1) + ", op2: " +
          JSON.stringify(op2)
        );
      }
    }
    return operation;
  };

  // Transform takes two operations A and B that happened concurrently and
  // produces two operations A' and B' (in an arry) such that
  // apply(apply(S, A), B') = apply(apply(S, B), A'). This function is the heart
  // of OT.
  Operation.transform = function (operation1, operation2) {
    if (operation1.baseLength !== operation2.baseLength) {
      throw new Error("Both operations have to have the same base length");
    }
    if (operation1.revision !== operation2.revision) {
      throw new Error("Both operations have to have the same revision");
    }

    // Use the IDs of the two input operations. This enables clients to
    // recognize their own operations when they receive operations from the
    // server.
    var operation1prime = new Operation(operation2.revision + 1, operation1.id, operation1.meta);
    var operation2prime = new Operation(operation1.revision + 1, operation2.id, operation2.meta);
    var ops1 = operation1.ops, ops2 = operation2.ops;
    var i1 = 0, i2 = 0;
    var op1 = ops1[i1++], op2 = ops2[i2++];
    while (true) {
      // At every iteration of the loop, the imaginary cursor that both
      // operation1 and operation2 have that operates on the input string must
      // have the same position in the input string.
      var op1l = op1 && (op1.retain || (op1.insert || op1.delete).length);
      var op2l = op2 && (op2.retain || (op2.insert || op2.delete).length);
      var minl = Math.min(op1l, op2l);
      if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
        // end condition: both ops1 and ops2 have been processed
        break;
      // next two cases: one or both ops are insert ops
      // => insert the string in the corresponding prime operation, skip it in
      // the other one
      // If both op1 and op2 are insert ops, prefer op1.
      } else if (op1 && op1.insert) {
        operation1prime.insert(op1.insert);
        operation2prime.retain(op1.insert.length);
        op1 = ops1[i1++];
      } else if (op2 && op2.insert) {
        operation1prime.retain(op2.insert.length);
        operation2prime.insert(op2.insert);
        op2 = ops2[i2++];
      } else if (op1.retain && op2.retain) {
        // Simple case: retain/retain
        operation1prime.retain(minl);
        operation2prime.retain(minl);
        if (op1l > op2l) {
          op1 = { retain: op1l - op2l };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { retain: op2l - op1l };
        }
      } else if (op1.delete && op2.delete) {
        if (op1.delete.slice(0, minl) !== op2.delete.slice(0, minl)) {
          throw new Error("When two concurrent operations delete text at the same position, they must delete the same text");
        }
        // Both operations delete the same string at the same position. We don't
        // need to produce any operations, we just skip over the delete ops and
        // handle the case that one operation deletes more than the other.
        if (op1l > op2l) {
          op1 = { delete: op1.delete.slice(op2l) };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { delete: op2.delete.slice(op1l) };
        }
      // next two cases: delete/retain and retain/delete
      } else if (op1.delete && op2.retain) {
        operation1prime.delete(op1.delete.slice(0, minl));
        if (op1l > op2l) {
          op1 = { delete: op1.delete.slice(op2l) };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { retain: op2.retain - op1l };
        }
      } else if (op1.retain && op2.delete) {
        operation2prime.delete(op2.delete.slice(0, minl));
        if (op1l > op2l) {
          op1 = { retain: op1.retain - op2l };
          op2 = ops2[i2++];
        } else if (op1l === op2l) {
          op1 = ops1[i1++];
          op2 = ops2[i2++];
        } else {
          op1 = ops1[i1++];
          op2 = { delete: op2.delete.slice(op1l) };
        }
      } else {
        throw new Error("The two operations aren't compatible");
      }
    }
    return [operation1prime, operation2prime];
  };

  // Expects the first argument to be truthy. Raises an error otherwise.
  function assert (b, msg) {
    if (!b) {
      throw new Error(msg || "assertion error");
    }
  }

  // Pick a random integer uniformally from the interval [0;n[
  function randomInt (n) {
    return Math.floor(Math.random() * n);
  }

  // Generate a random ID consisting of 16 hex digits.
  function randomID () {
    var id = '';
    var n = 16;
    while (n--) {
      id += randomInt(16).toString(16);
    }
    return id;
  }

  return Operation;

})();

// Export for CommonJS
if (typeof module === 'object') {
  module.exports = ot.Operation;
}// translation of https://github.com/djspiewak/cccp/blob/master/agent/src/main/scala/com/codecommit/cccp/agent/state.scala

if (typeof ot === 'undefined') {
  var ot = {};
}

ot.Client = (function (global) {

  var Operation = global.ot ? global.ot.Operation : require('./operation');

  // Object that can be mixed into a constructor's prototype object. Requires a
  // 'states' property that is an object containing the possible states of the
  // object with the associated method definitions and a 'state' property
  // containing the name of the current state as a string.
  var StateMachine = {
    callMethodForState: function (method) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.states[this.state][method].apply(this, args);
    },

    // Transitions to a new state given by the first argument. Calls the exit
    // method of the old state first and calls the enter method of the new state
    // with the rest of the arguments.
    transitionTo: function (name) {
      var args = Array.prototype.slice.call(arguments, 1);
      this.states[this.state].exit.apply(this, []);
      this.states[this.state = name].enter.apply(this, args);
    }
  };

  // Client constructor
  function Client (revision) {
    assert(typeof revision === 'number' && revision >= 0);
    this.serverRevision = revision; // the next expected revision number
    this.state = 'synchronized'; // start in 'synchronized' state
  }

  extend(Client.prototype, StateMachine);

  // Creates a new Operation that has the right revision number
  Client.prototype.createOperation = function () {
    return new Operation(this.callMethodForState('newRevision'));
  };

  // Call this method when the user changes the document.
  Client.prototype.applyClient = function (operation) {
    return this.callMethodForState('applyClient', operation);
  };

  // Call this method with a new operation from the server
  Client.prototype.applyServer = function (operation) {
    assert(operation.revision === this.serverRevision);
    this.callMethodForState('applyServer', operation);
    this.serverRevision++;
  };

  // Override this method.
  Client.prototype.sendOperation = function (operation) {
    throw new Error("sendOperation must be defined in child class");
  };

  // Override this method.
  Client.prototype.applyOperation = function (operation) {
    throw new Error("applyOperation must be defined in child class");
  };

  Client.prototype.states = {
    // In the 'synchronized' state, there is no pending operation that the client
    // has sent to the server.
    synchronized: {
      enter: function () {},
      exit: function () {},
      // When the user makes an edit, send the operation to the server and
      // switch to the 'awaitingConfirm' state
      applyClient: function (operation) {
        this.sendOperation(operation);
        this.transitionTo('awaitingConfirm', operation);
      },
      // When we receive a new operation from the server, the operation can be
      // simply applied to the current document
      applyServer: function (operation) {
        this.applyOperation(operation);
      },
      newRevision: function () {
        return this.serverRevision;
      }
    },

    // In the 'awaitingConfirm' state, there's one operation the client has sent
    // to the server and is still waiting for an acknoledgement.
    awaitingConfirm: {
      enter: function (outstanding) {
        // Save the pending operation
        this.outstanding = outstanding;
      },
      exit: function () {
        delete this.outstanding;
      },
      // When the user makes an edit, don't send the operation immediately,
      // instead switch to 'awaitingWithBuffer' state
      applyClient: function (operation) {
        assert(operation.revision === this.serverRevision + 1);
        this.transitionTo('awaitingWithBuffer', this.outstanding, operation);
      },
      applyServer: function (operation) {
        if (operation.id === this.outstanding.id) {
          // The client's operation has been acknowledged
          // => switch to synchronized state
          this.transitionTo('synchronized');
        } else {
          // This is another client's operation. Visualization:
          //
          //                   /\
          // this.outstanding /  \ operation
          //                 /    \
          //                 \    /
          //  pair[1]         \  / pair[0] (new this.outstanding)
          //  (can be applied  \/
          //  to the client's
          //  current document)
          var pair = Operation.transform(this.outstanding, operation);
          this.outstanding = pair[0];
          this.applyOperation(pair[1]);
        }
      },
      newRevision: function () {
        return this.serverRevision + 1;
      }
    },

    // In the 'awaitingWithBuffer' state, the client is waiting for an operation
    // to be acknoledged by the server while buffering the edits the user makes
    awaitingWithBuffer: {
      enter: function (outstanding, buffer) {
        // Save the pending operation and the user's edits since then
        this.outstanding = outstanding;
        this.buffer = buffer;
      },
      exit: function () {
        delete this.outstanding;
        delete this.buffer;
      },
      applyClient: function (operation) {
        // Compose the user's changes into the buffer
        assert(operation.revision === this.serverRevision + 2);
        this.buffer = this.buffer.compose(operation);
      },
      applyServer: function (operation) {
        if (operation.id === this.outstanding.id) {
          // The pending operation has been acknowledged
          // => send buffer
          this.sendOperation(this.buffer);
          this.transitionTo('awaitingConfirm', this.buffer);
        } else {
          // Operation comes from another client
          //
          //                       /\
          //     this.outstanding /  \ operation
          //                     /    \
          //                    /\    /
          //       this.buffer /  \* / pair1[0] (new this.outstanding)
          //                  /    \/
          //                  \    /
          //          pair2[1] \  / pair2[0] (new this.buffer)
          // the transformed    \/
          // operation -- can
          // be applied to the
          // client's current
          // document
          //
          // * pair1[1]
          var pair1 = Operation.transform(this.outstanding, operation);
          this.outstanding = pair1[0];
          var operationPrime = pair1[1];
          var pair2 = Operation.transform(this.buffer, operationPrime);
          this.buffer = pair2[0];
          this.applyOperation(pair2[1]);
        }
      },
      newRevision: function () {
        return this.serverRevision + 2;
      }
    }
  };

  // Copies all non-inherited key-value pairs of source to target.
  function extend (target, source) {
    for (var name in source) {
      if (source.hasOwnProperty(name)) {
        target[name] = source[name];
      }
    }
  }

  // Throws an error if the first argument is falsy. Useful for debugging.
  function assert (b, msg) {
    if (!b) {
      throw new Error(msg || "assertion error");
    }
  }

  return Client;

})(this);

if (typeof module === 'object') {
  module.exports = ot.Client;
}(function () {
  // Monkey patching, yay!

  // The oldValue is needed to find
  ot.Operation.prototype.fromCodeMirrorChange = function (change, oldValue) {
    var operation = this;
    // Holds the current value
    var lines = oldValue.split('\n');

    // Given a { line, ch } object, return the index into the string represented
    // by the current lines object.
    function indexFromPos (pos) {
      var line = pos.line, ch = pos.ch;
      var index = 0;
      for (var i = 0; i < pos.line; i++) {
        index += lines[i].length + 1;
      }
      index += ch;
      return index;
    }

    // The number of characters in the current lines array + number of newlines.
    function getLength () {
      var length = 0;
      for (var i = 0, l = lines.length; i < l; i++) {
        length += lines[i].length;
      }
      return length + lines.length - 1; // include '\n's
    }

    // Returns the substring of the current lines array in the range given by
    // 'from' and 'to' which must be { line, ch } objects
    function getRange (from, to) {
      // Precondition: to ">" from
      if (from.line === to.line) {
        return lines[from.line].slice(from.ch, to.ch);
      }
      var str = lines[from.line].slice(from.ch) + '\n';
      for (var i = from.line + 1; i < to.line; i++) {
        str += lines[i] + '\n';
      }
      str += lines[to.line].slice(0, to.ch);
      return str;
    }

    // Replace the range defined by 'from' and 'to' by 'text' (array of lines).
    // Alters the lines array.
    function replaceRange (text, from, to) {
      // Precondition: to ">" from
      var strLines = text.slice(0); // copy
      var pre = lines[from.line].slice(0, from.ch);
      var post = lines[to.line].slice(to.ch);
      strLines[0] = pre + strLines[0];
      strLines[strLines.length-1] += post;

      strLines.unshift(to.line - from.line + 1); // 2nd positional parameter
      strLines.unshift(from.line); // 1st positional parameter
      lines.splice.apply(lines, strLines);
    }

    // Convert a single CodeMirror change to an operation. Assumes that lines
    // represents the state of the document before the CodeMirror change took
    // place. Alters the lines array so that it represents the document's
    // content after the change.
    function generateOperation (operation, change) {
      var from   = indexFromPos(change.from);
      var to     = indexFromPos(change.to);
      var length = getLength();
      operation.retain(from);
      operation.delete(getRange(change.from, change.to));
      operation.insert(change.text.join('\n'));
      operation.retain(length - to);
      replaceRange(change.text, change.from, change.to);
    }

    // Convert the first element of the linked list of changes to an operation.
    generateOperation(operation, change);
    //oldValue = operation.apply(oldValue);
    //assert(oldValue === lines.join('\n'));

    // handle lists of operations by doing a left-fold over the linked list,
    // convert each change to an operation and composing it.
    while (true) {
      //assert(operation.targetLength === getLength());
      change = change.next;
      if (!change) { break; }
      var nextOperation = new ot.Operation(operation.revision + 1);
      generateOperation(nextOperation, change);
      //oldValue = nextOperation.apply(oldValue);
      //assert(oldValue === lines.join('\n'));
      operation = operation.compose(nextOperation);
    }

    return operation;
  };

  // Apply an operation to a CodeMirror instance.
  ot.Operation.prototype.applyToCodeMirror = function (cm) {
    var operation = this;
    cm.operation(function () {
      var ops = operation.ops;
      var index = 0; // holds the current index into CodeMirror's content
      for (var i = 0, l = ops.length; i < l; i++) {
        var op = ops[i];
        if (op.retain) {
          index += op.retain;
        } else if (op.insert) {
          cm.replaceRange(op.insert, cm.posFromIndex(index));
          index += op.insert.length;
        } else if (op.delete) {
          var from = cm.posFromIndex(index);
          var to   = cm.posFromIndex(index + op.delete.length);
          // Check if the deleted characters match CodeMirror's content
          assert(cm.getRange(from, to) === op.delete);
          cm.replaceRange('', from, to);
        }
      }
      // Check that the operation spans the whole content
      assert(index === cm.getValue().length);
    });
  };

  // Throws an error if the first argument is falsy. Useful for debugging.
  function assert (b, msg) {
    if (!b) {
      throw new Error(msg || "assertion error");
    }
  }

})();ot.CodeMirrorClient = (function () {
  var Client = ot.Client;
  var Operation = ot.Operation;

  function CodeMirrorClient (socket, cm) {
    this.socket = socket;
    this.cm = cm;
    this.fromServer = false;
    this.unredo = false;
    this.undoStack = [];
    this.redoStack = [];
    this.clients = {};
    this.initializeClientList();

    var self = this;
    socket.on('doc', function (obj) {
      Client.call(self, obj.revision);
      self.initializeCodeMirror(obj.str);
      self.initializeSocket();
      self.initializeClients(obj.clients);
    });
  }

  inherit(CodeMirrorClient, Client);

  CodeMirrorClient.prototype.applyClient = function (operation) {
    operation.meta.cursor = this.cursor;
    operation.meta.selectionEnd = this.selectionEnd;
    clearTimeout(this.sendCursorTimeout);
    Client.prototype.applyClient.call(this, operation);
  };

  CodeMirrorClient.prototype.applyServer = function (operation) {
    var isOutstandingOperation = this.outstanding && this.outstanding.id === operation.id;
    Client.prototype.applyServer.call(this, operation);

    if (!isOutstandingOperation) {
      var meta = operation.meta;
      this.updateClientCursor(meta.clientId, meta.cursor, meta.selectionEnd);
      this.transformUnredoStack(this.undoStack, operation);
      this.transformUnredoStack(this.redoStack, operation);
    }
  };

  CodeMirrorClient.prototype.initializeSocket = function () {
    var self = this;

    this.socket
      .on('client_left', function (obj) {
        self.onClientLeft(obj.clientId);
      })
      .on('set_name', function (obj) {
        self.onSetName(obj.clientId, obj.name);
      })
      .on('operation', function (operationObj) {
        var operation = Operation.fromJSON(operationObj);
        console.log("Operation from server by client " + operation.meta.clientId + ":", operation);
        self.applyServer(operation);
      })
      .on('cursor', function (update) {
        self.updateClientCursor(update.clientId, update.cursor, update.selectionEnd);
      });
  };

  CodeMirrorClient.prototype.getClientObject = function (clientId) {
    var client = this.clients[clientId];
    if (client) { return client; }
    client = this.clients[clientId] = { clientId: clientId };
    this.initializeClient(client);
    return client;
  };

  CodeMirrorClient.prototype.onClientLeft = function (clientId) {
    console.log("User disconnected: " + clientId);
    var client = this.clients[clientId];
    if (!client) { return; }
    if (client.li) { removeElement(client.li); }
    if (client.cursorEl) { removeElement(client.cursorEl); }
    if (client.mark) { client.mark.clear(); }
    delete this.clients[clientId];
  };

  CodeMirrorClient.prototype.onSetName = function (clientId, name) {
    var client = this.getClientObject(clientId);
    client.name = name;
    var oldLi = client.li;
    var newLi = client.li = this.createClientListItem(client);
    if (oldLi) {
      this.clientListEl.replaceChild(newLi, oldLi);
    } else {
      this.clientListEl.appendChild(newLi);
    }
  };

  CodeMirrorClient.prototype.initializeCodeMirror = function (str) {
    var cm = this.cm;
    var self = this;

    cm.setValue(str);
    this.oldValue = str;

    var oldOnChange = cm.getOption('onChange');
    cm.setOption('onChange', function (_, change) {
      self.onCodeMirrorChange(change);
      if (oldOnChange) { oldOnChange.call(this, cm, change); }
    });

    var oldOnCursorActivity = cm.getOption('onCursorActivity');
    cm.setOption('onCursorActivity', function (_) {
      self.onCodeMirrorCursorActivity();
      if (oldOnCursorActivity) { oldOnCursorActivity.call(this, cm); }
    });

    cm.undo = function () { self.undo(); };
    cm.redo = function () { self.redo(); };
  };

  CodeMirrorClient.prototype.initializeClients = function (clients) {
    for (var clientId in clients) {
      if (clients.hasOwnProperty(clientId)) {
        var client = clients[clientId];
        console.log(clientId, client);
        client.clientId = clientId;
        this.clients[clientId] = client;
        this.initializeClient(client);
      }
    }
  };

  CodeMirrorClient.prototype.initializeClientList = function () {
    this.clientListEl = document.createElement('ul');
  };

  function rgb2hex (r, g, b) {
    function digits (n) {
      var m = Math.round(255*n).toString(16);
      return m.length === 1 ? '0'+m : m;
    }
    return '#' + digits(r) + digits(g) + digits(b);
  }

  function hsl2hex (h, s, l) {
    if (s === 0) { return rgb2hex(l, l, l); }
    var var2 = l < 0.5 ? l * (1+s) : (l+s) - (s*l);
    var var1 = 2 * l - var2;
    var hue2rgb = function (hue) {
      if (hue < 0) { hue += 1; }
      if (hue > 1) { hue -= 1; }
      if (6*hue < 1) { return var1 + (var2-var1)*6*hue; }
      if (2*hue < 1) { return var2; }
      if (3*hue < 2) { return var1 + (var2-var1)*6*(2/3 - hue); }
      return var1;
    };
    return rgb2hex(hue2rgb(h+1/3), hue2rgb(h), hue2rgb(h-1/3));
  }

  CodeMirrorClient.prototype.initializeClient = function (client) {
    console.log("initializeClient");
    client.hue = Math.random();
    client.color = hsl2hex(client.hue, 0.75, 0.5);
    client.lightColor = hsl2hex(client.hue, 0.5, 0.9);

    if (client.name) {
      client.li = this.createClientListItem(client);
      this.clientListEl.appendChild(client.li);
    }

    this.createClientCursorEl(client);
    this.updateClientCursorElPosition(client);
    this.createClientSelectionStyleRule(client);
    this.updateClientMark(client);
  };

  CodeMirrorClient.prototype.createClientListItem = function (client) {
    var el = document.createElement('li');
    el.style.color = client.color;
    el.appendChild(document.createTextNode(client.name));
    return el;
  };

  function randomInt (n) {
    return Math.floor(Math.random() * n);
  }

  CodeMirrorClient.prototype.createClientSelectionStyleRule = function (client) {
    client.selectionClassName = 'client-selection-' + randomInt(1e6);
    var selector = '.' + client.selectionClassName;
    var styles = 'background:' + client.lightColor + ';';
    var rule = selector + '{' + styles + '}';
    try {
      var styleSheet = document.styleSheets.item(0);
      styleSheet.insertRule(rule, styleSheet.rules.length);
    } catch (exc) {
      console.error("Couldn't add style rule for client selections.", exc);
    }
  };

  function cleanNoops (stack) {
    function isNoop (operation) {
      var ops = operation.ops;
      return ops.length === 0 || (ops.length === 1 && !!ops[0].retain);
    }

    while (stack.length > 0) {
      var operation = stack[stack.length - 1];
      if (isNoop(operation)) {
        stack.pop();
      } else {
        break;
      }
    }
  }

  var UNDO_DEPTH = 20;

  function cursorIndexAfterOperation (operation) {
    // TODO
    var ops = operation.ops;
    if (ops[0].retain) {
      var index = ops[0].retain;
      if (ops[1].insert) {
        return index + ops[1].insert.length;
      } else {
        return index;
      }
    } else if (ops[0].insert) {
      return ops[0].insert.length;
    } else {
      return 0;
    }
  }

  CodeMirrorClient.prototype.unredoHelper = function (sourceStack, targetStack) {
    cleanNoops(sourceStack);
    if (sourceStack.length === 0) { return; }
    var operation = sourceStack.pop();
    operation.revision = this.createOperation().revision;
    targetStack.push(operation.invert());
    this.unredo = true;
    operation.applyToCodeMirror(this.cm);
    this.cursor = this.selectionEnd = cursorIndexAfterOperation(operation);
    this.cm.setCursor(this.cm.posFromIndex(this.cursor));
    this.applyClient(operation);
  };

  CodeMirrorClient.prototype.transformUnredoStack = function (stack, operation) {
    cleanNoops(stack);
    for (var i = stack.length - 1; i >= 0; i--) {
      stack[i].revision = operation.revision;
      var transformedPair = Operation.transform(stack[i], operation);
      stack[i]  = transformedPair[0];
      operation = transformedPair[1];
    }
  };

  CodeMirrorClient.prototype.addOperationToUndo = function (operation) {
    function isSimpleOperation (operation, fn) {
      var ops = operation.ops;
      switch (ops.length) {
        case 0: return true;
        case 1: return !!fn(ops[0]);
        case 2: return !!((ops[0].retain && fn(ops[1])) || (fn(ops[0]) && ops[1].retain));
        case 3: return !!(ops[0].retain && fn(ops[1]) && ops[2].retain);
        default: return false;
      }
    }

    function isSimpleInsert (operation) {
      return isSimpleOperation(operation, function (op) { return op.insert; });
    }

    function isSimpleDelete (operation) {
      return isSimpleOperation(operation, function (op) { return op.delete; });
    }

    function shouldBeComposed (a, b) {
      if (isSimpleInsert(a) && isSimpleInsert(b)) {
        return isSimpleInsert(a.compose(b));
      } else if (isSimpleDelete(a) && isSimpleDelete(b)) {
        var opA = a.ops[0], opsB = b.ops;
        if (!opA.retain) { return false; }
        if (opsB[0].delete) {
          return opA.retain === opsB[0].delete.length;
        } else {
          return opA.retain === opsB[0].retain + opsB[1].delete.length;
        }
      }
      return false;
    }

    if (this.undoStack.length === 0) {
      this.undoStack.push(operation);
    } else {
      var lastOperation = this.undoStack[this.undoStack.length - 1];
      lastOperation.revision = operation.revision + 1;
      if (shouldBeComposed(operation, lastOperation)) {
        var composed = operation.compose(lastOperation);
        this.undoStack[this.undoStack.length - 1] = composed;
      } else {
        this.undoStack.push(operation);
        if (this.undoStack.length > UNDO_DEPTH) {
          this.undoStack.shift();
        }
      }
    }
    if (this.redoStack.length > 0) { this.redoStack = []; }
  };

  CodeMirrorClient.prototype.undo = function () {
    this.unredoHelper(this.undoStack, this.redoStack);
  };

  CodeMirrorClient.prototype.redo = function () {
    this.unredoHelper(this.redoStack, this.undoStack);
  };
  
  CodeMirrorClient.prototype.createClientCursorEl = function (client) {
    var el = client.cursorEl = document.createElement('div');
    el.className = 'other-client';
    var pre = document.createElement('pre');
    pre.style.borderLeftColor = client.color;
    pre.innerHTML = '&nbsp;';
    el.appendChild(pre);
    //el.appendChild(document.createTextNode(client.name));
  };

  CodeMirrorClient.prototype.updateClientCursor = function (clientId, cursor, selectionEnd) {
    console.log(name + " moved his/her cursor: " + cursor);

    var client = this.getClientObject(clientId);
    client.cursor = cursor;
    client.selectionEnd = selectionEnd;

    this.updateClientCursorElPosition(client);
    this.updateClientMark(client);
  };

  CodeMirrorClient.prototype.updateClientCursorElPosition = function (client) {
    var pos = cm.posFromIndex(client.cursor);
    removeElement(client.cursorEl);
    this.cm.addWidget(pos, client.cursorEl, false);
  };

  CodeMirrorClient.prototype.updateClientMark = function (client) {
    if (client.mark) {
      client.mark.clear();
      delete client.mark;
    }
    if (client.selectionEnd !== client.cursor) {
      var from = Math.min(client.cursor, client.selectionEnd);
      var to   = Math.max(client.cursor, client.selectionEnd);
      var fromPos = cm.posFromIndex(from);
      var toPos   = cm.posFromIndex(to);
      client.mark = this.cm.markText(fromPos, toPos, client.selectionClassName);
    }
  };

  CodeMirrorClient.prototype.onCodeMirrorChange = function (change) {
    var cm = this.cm;
    try {
      if (!this.fromServer && !this.unredo) {
        var operation = this.createOperation()
          .fromCodeMirrorChange(change, this.oldValue);
        this.addOperationToUndo(operation.invert());
        this.applyClient(operation);
      }
    } finally {
      this.fromServer = false;
      this.unredo     = false;
      this.oldValue = cm.getValue();
    }
  };

  CodeMirrorClient.prototype.onCodeMirrorCursorActivity = function () {
    var cm = this.cm;
    function eqPos (a, b) {
      return a.line === b.line && a.ch === b.ch;
    }

    var cursorPos = cm.getCursor();
    var cursor = cm.indexFromPos(cursorPos);
    var selectionEnd;
    if (cm.somethingSelected()) {
      var startPos = cm.getCursor(true);
      var selectionEndPos = eqPos(cursorPos, startPos) ? cm.getCursor(false) : startPos;
      selectionEnd = cm.indexFromPos(selectionEndPos);
    } else {
      selectionEnd = cursor;
    }

    this.cursor = cursor;
    this.selectionEnd = selectionEnd;

    if (this.state === 'awaitingWithBuffer') {
      this.buffer.meta.cursor = cursor;
      this.buffer.meta.selectionEnd = selectionEnd;
    } else {
      var self = this;
      clearTimeout(this.sendCursorTimeout);
      this.sendCursorTimeout = setTimeout(function () {
        self.socket.emit('cursor', {
          cursor: cursor,
          selectionEnd: selectionEnd
        });
      }, 50);
    }
  };

  CodeMirrorClient.prototype.sendOperation = function (operation) {
    this.socket.emit('operation', operation);
  };

  CodeMirrorClient.prototype.applyOperation = function (operation) {
    this.fromServer = true;
    operation.applyToCodeMirror(this.cm);
  };

  // Set Const.prototype.__proto__ to Super.prototype
  function inherit (Const, Super) {
    function F () {}
    F.prototype = Super.prototype;
    Const.prototype = new F();
    Const.prototype.constructor = Const;
  }

  // Remove an element from the DOM.
  function removeElement (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  return CodeMirrorClient;
})();