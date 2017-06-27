!function(){

  // This object gets globalalized/exported
  var promiz = {

    // promise factory
    defer: function(){
      return new defer()
    },

    // calls a function and resolved as a promise
    fcall: function() {
      var def = new defer()
      var args = Array.apply([], arguments)
      var fn = args.shift()
      try {
        var val = fn.apply(null, args)
        def.resolve(val)
      } catch(e) {
        def.reject(e)
      }

      return def
    },

    // calls a node-style function (eg. expects callback as function(err, callback))
    nfcall: function() {
      var def = new defer()
      var args = Array.apply([], arguments)
      var fn = args.shift()
      try {

        // Add our custom promise callback to the end of the arguments
        args.push(function(err, val){
          if(err) {
            return def.reject(err)
          }
          return def.resolve(val)
        })
        fn.apply(null, args)
      } catch (e) {
        def.reject(e)
      }

      return def
    }
  }

  // This is the promise object itself
  function defer(){

    // State transitions from pending to either resolved or rejected
    this.state = 'pending'

    // Our current value
    this.val = null

    // The current stack of deferred calls that need to be made
    this.stack = []

    // If there is an unhandled exception durring stack execution, should we throw it?
    this.failing = false

    // Resolved the promise to a value. Only affects the first time it is called
    this.resolve = function(val){
      if (this.state === 'pending'){
        this.state = 'resolved'
        this.fire(val)
      }
      return this
    }

    // Rejects the promise with a value. Only affects the first time it is called
    this.reject = function(val){
      if (this.state === 'pending'){
        this.state = 'rejected'
        this.fire(val)
      }
      return this
    }

    // The heart of the promise, adding a defered call to our call stack
    this.then = function(fn, er){
      this.stack.push([fn, er])
      if (this.state !== 'pending') {
        this.fire()
      }
      return this
    }

    // If there is an unhandled error, throw it
    // End the promise chain by returning null
    this.done = function(){
      this.failing = true
      return null
    }

    // Catch any errors up to this point
    this.fail = function (fn) {
      return this.then(null, fn)
    }

    // Allow for node-style callback returning
    this.nodeify = function (cb) {

      // Process asyncronously, so if the function fails the error gets thrown
      function tick(fn){
        if(typeof process !== 'undefined' && process.nextTick) {
          process.nextTick(fn)
        } else {
          setTimeout(fn, 0)
        }
      }

      if(cb) {
        this.then(function(val){
          tick(function(){
            cb(null, val)
          })

          return val
        }, function(err){
          tick(function(){
            cb(err)
          })
        })
      }

      // still returns a promise to allow `dual` functions (callback + promise)
      return this
    }

    // Apply a list value over the next function
    this.spread = function (fn, er) {
      return this.all().then(function(list){
        return fn ? fn.apply(null, list) :  null
      }, er)
    }

    // Resolves an array of promises before continuing
    this.all = function () {
      var self = this

      // Add a special function to the stack, which takes in the list of promise objects
      this.stack.push([function(list){
        list = list ? (list instanceof Array ? list : [list]) : []

        if (list.length === 0){
          return list
        }

        // pause stack execution until all promises resolve
        self.state = 'pending'

        // We count up resolved and match it to the length of the list of promises
        // This lets us know when we've finished
        var cnt = 0
        var len = list.length

        function checkDone(){
          if(cnt !== len) {
            return
          }
          self.resolve(list)
        }

        // iterate over the list, resolving each value
        var ind = len

        while(ind--) {

          // Create varaible scope
          (function(){
            var i = ind
            var val = list[i]

            if(val && val.then){
            val.then(function(res){
              list[i] = res
              cnt++
              checkDone()
            }, function(err){
              self.reject(err)
            })
          } else {
            list[i] = val
            cnt++
            checkDone()
          }
          })()
        }

        return list
      }, null])

      if (this.state !== 'pending') {
        this.fire()
      }

      return this
    }

    // This is our main execution thread
    // Here is where we consume the stack of promises
    this.fire = function (val) {
      var self = this
      val = this.val = typeof val !== 'undefined' ? val : this.val

      // Iterate through the stack
      while(this.stack.length && this.state !== 'pending') {
        // Get the next stack item
        var entry = this.stack.shift()
        var fn = this.state === 'rejected' ? entry[1] : entry[0]

        if(fn) {
          try {
            val = this.val = fn.call(null, val)

            // If the value returned is a promise, resolve it
            if(val && typeof val.then === 'function') {
              var prevState = this.state

              // Halt stack execution until the promise resolves
              this.state = 'pending'

              // resolving
              val.then(function(v){

                // success callback
                self.resolve(v)
              }, function(err){

                // error callback

                // re-run the stack item if it has an error callback
                // but only if we weren't already in a rejected state
                if(prevState !== 'rejected' && entry[1]) {
                  self.stack.unshift(entry)
                }

                self.reject(err)
              })

            }
          } catch (e) {

            // the function call failed, lets reject ourselves
            // and re-run the stack item in case it can handle an error case
            // but only if we didn't just do that (eg. the error function of on the stack threw)
            val = this.val = e
            if(this.state !== 'rejected' && entry[1]) {
              this.stack.unshift(entry)
            }

            this.state = 'rejected'
          }
        }
      }

    }

    // If the `failing` flag has been set, and we have exausted the stack, and we have an error
    // Throw the error
    if(this.failing && this.stack.length === 0 && this.state === 'rejected') {
      throw this.val
    }
  }

  // Export our library object, either for node.js or as a globally scoped variable
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = promiz
  } else {
    this.Promiz = promiz
  }
}()
