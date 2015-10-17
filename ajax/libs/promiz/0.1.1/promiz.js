(function(){

  function nextTick(fn){
    if(typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(fn)
    } else {
      setTimeout(fn, 0)
    }
  }

  var promiz = (function(){
    function defer(){

      this.state = 'pending'
      this.value
      this.stack = []
      this.throwing = false

      this.resolve = function(val){
        if (this.state === 'pending'){
          this.state = 'resolved'
          this.fire(val)
        }
        return this
      }

      this.reject = function(val){
        if (this.state === 'pending'){
          this.state = 'rejected'
          this.fire(val)
        }
        return this
      }

      this.then = function(fn, er){
        this.stack.push([fn || function(){}, er])
        if (this.state !== 'pending') {
          this.fire()
        }
        return this
      }

      this.done = function(){
        this.throwing = true
        if (this.state !== 'pending') {
          this.fire()
        }
        return void 0
      }

      this.throws = function(){
        this.throwing = true
        return this
      }

      this.catch = function (fn) {
        this.stack.push([null, fn || function(){}])
        if (this.state !== 'pending') {
          this.fire()
        }
        return this
      }

      this.fail = function (fn) {
        return this.catch(fn)
      }

      this.nodeify = function (cb) {
        if(cb) {
          this.then(function(val){
            nextTick(function(){
              cb(null, val)
            })
            return val
          }, function(err){
            nextTick(function(){
              cb(err)
            })
          })
        }
        return this
      }

      this.spread = function (fn, er) {
        return this.all().then(function(list){
          return fn ? fn.apply(void 0, list) :  null
        }, er)
      }

      this.all = function () {
        var self = this

        this.stack.push([function(list){

          list = list instanceof Array ? list : []

          if (list.length === 0){
            return list
          }

          self.state = 'pending'
          var cnt = 0
          var errored = false

          function checkDone(){
            if(cnt !== list.length) {
              return
            }
            self.resolve(list)
          }

          list.forEach(function(val, i){
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

          })

          return list
        }, null])

        if (this.state !== 'pending') {
          this.fire()
        }

        return this
      }

      this.fire = function(val){
        val = this.value = typeof val !== 'undefined' ? val : this.value

        while(this.stack.length && this.state !== 'pending') {
          var entry = this.stack.shift()
          var fn = this.state === 'rejected' ? entry[1] : entry[0]

          if(fn) {
            try {

              val = this.value = fn.call(void 0, val)
              if(val && val.then) {
                var previousState = this.state
                this.state = 'pending'
                var promise = val.then(function(v){

                  val = this.value = v

                  this.resolve(v)
                }.bind(this), function(err){
                  val = this.value = err
                  if(previousState !== 'rejected') this.stack.unshift(entry)
                  this.reject(err)
                }.bind(this))

              } else if (this.state === 'rejected') {
                this.state = 'resolved'
              }
                } catch (e) {
                  val = this.value = e
                  if(this.state !== 'rejected') this.stack.unshift(entry)
                  this.state = 'rejected'
                }
          }
        }

        if(this.throwing && this.stack.length === 0 && this.state === 'rejected') {
          throw this.value
        }
      }

    }

    return {
      defer: function(){
        return new defer()
      },

      fcall: function() {
        var deferred = new defer()
        var args = Array.apply([], arguments)
        var fn = args.shift()
        try {
          var val = fn.apply(void 0, args)
          deferred.resolve(val)
        } catch(e) {
          deferred.reject(e)
        }

        return deferred
      },

      nfcall: function() {
        var deferred = new defer()
        var args = Array.apply([], arguments)
        var fn = args.shift()
        try {
          args.push(function(err, val){
            if(err) {
              return deferred.reject(err)
            }
            return deferred.resolve(val)
          })
          fn.apply(void 0, args)
        } catch(e){
          deferred.reject(e)
        }

        return deferred
      },
    }

  })()

  if(typeof module !== 'undefined' && module.exports) {
    module.exports = promiz
  } else {
    this.promiz = promiz
  }
})()
