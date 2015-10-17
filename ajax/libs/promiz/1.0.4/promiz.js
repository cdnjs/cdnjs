(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (typeof module != 'undefined') {
    module['exports'] = Deferred
  } else {
    global['Promise'] = global['Promise'] || Deferred
  }
})()
