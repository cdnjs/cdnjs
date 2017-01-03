(function($) {
  var systemID = 0, data = {}, options = {}, methods = {
  init:function(settings) {
    return this.each(function() {
      options = jQuery.extend({
	    angle:0
		,arrivalThreshold:50
		,interval:15
		,item:false
		,items:false
		,loop:true
		,mass:1
		,maxForce:0.05
		,obj:this
		,pathThreshold:50
		,position:[0, 0]
		,rotate:true
		,speedLimit:2
		,waypoint:0
		,waypoints:false
	  }, settings);
      if(!options.items.length && options.item && $(options.item).length) {
        options.items = [[options.item, options.waypoints]]
      }
      if(options.items.length) {
        $.each(options.items, function(i, el) {
          var e = {};
          e.obj = $(options.obj).find(el[0]);
          e.waypoints = el[1] || options.waypoints;
          e.itemWidth = e.obj.width();
          e.itemHeight = e.obj.height();
          e.itemWidth05 = e.itemWidth / 2;
          e.itemHeight05 = e.itemHeight / 2;
          e.angle = el[10] || options.angle;
          e.arrivalThreshold = el[8] || options.arrivalThreshold;
          e.loop = el[2] || el[2] == false || el[2] == 0 ? el[2] : options.loop;
          e.mass = el[6] || options.mass;
          e.maxForce = el[4] || options.maxForce;
          e.speedLimit = el[3] || options.speedLimit;
          e.pathThreshold = el[7] || options.pathThreshold;
          e.position = el[9] || options.position;
          e.waypoint = el[5] || options.waypoint;
          e.steeringForce = [0, 0];
          e.velocity = [0, 0];
          options.items[i] = e
        });
        var processID = methods.getID();
        data[processID] = options;
        setInterval(function() {
          methods.process(processID)
        }, options.interval)
      }
    })
  }, process:function(processID) {
    return $.each(data[processID].items, function(i, e) {
      e = methods.follow(e);
      if(e) {
        e = methods.update(e);
        methods.render(e);
        data[processID].items[i] = e
      }
    })
  }, follow:function(e) {
    var wayPoint = e.waypoints[e.waypoint];
    if(wayPoint == null) {
      return false
    }
    if(methods.dist(e.position, wayPoint) < e.pathThreshold) {
      if(e.waypoint >= e.waypoints.length - 1) {
        if(e.loop) {
          e.waypoint = 0
        }
      }else {
        e.waypoint++
      }
    }
    if(e.waypoint >= e.waypoints.length - 1 && !e.loop) {
      e = methods.arrive(e, wayPoint)
    }else {
      e = methods.seek(e, wayPoint)
    }
    return e
  }, getRandom:function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }, getRandomFloat:function(min, max) {
    return Math.random() * (max - min) + min
  }, setAngle:function(obj, value) {
    var len = methods.getLength(obj);
    obj[0] = Math.cos(value) * len;
    obj[1] = Math.sin(value) * len;
    return obj
  }, getAngle:function(obj) {
    return Math.atan2(obj[1], obj[0])
  }, dist:function(obj, obj2) {
    return Math.sqrt(methods.distSQ(obj, obj2))
  }, distSQ:function(obj, obj2) {
    var dx = obj2[0] - obj[0];
    var dy = obj2[1] - obj[1];
    return dx * dx + dy * dy
  }, subtract:function(v1, v2) {
    return[v1[0] - v2[0], v1[1] - v2[1]]
  }, normalize:function(obj) {
    var len = methods.getLength(obj);
    if(len == 0) {
      obj[0] = 1;
      obj[1] = 1;
      return obj
    }
    obj[0] /= len;
    obj[1] /= len;
    return obj
  }, setLength:function(obj, value) {
    var a = methods.getAngle(obj);
    obj[0] = Math.cos(a) * value;
    obj[1] = Math.sin(a) * value;
    return obj
  }, getLength:function(obj) {
    return Math.sqrt(methods.getLengthSQ(obj))
  }, getLengthSQ:function(obj) {
    return obj[0] * obj[0] + obj[1] * obj[1]
  }, multiply:function(obj, value) {
    return[obj[0] * value, obj[1] * value]
  }, add:function(obj, v2) {
    return[obj[0] + v2[0], obj[1] + v2[1]]
  }, divide:function(obj, value) {
    return[obj[0] / value, obj[1] / value]
  }, truncate:function(obj, max) {
    var _length = Math.min(max, methods.getLength(obj));
    obj = methods.setLength(obj, _length);
    return obj
  }, seek:function(e, target) {
    var desiredVelocity = methods.subtract(target, e.position);
    desiredVelocity = methods.normalize(desiredVelocity);
    desiredVelocity = methods.multiply(desiredVelocity, e.speedLimit);
    var force = methods.subtract(desiredVelocity, e.velocity);
    e.steeringForce = methods.add(e.steeringForce, force);
    return e
  }, arrive:function(e, target) {
    var desiredVelocity = methods.subtract(target, e.position);
    desiredVelocity = methods.normalize(desiredVelocity);
    var _dist = methods.dist(e.position, target);
    if(_dist < 1) {
      e.steeringForce = 0;
      return false
    }
    if(_dist > e.arrivalThreshold) {
      desiredVelocity = methods.multiply(desiredVelocity, e.speedLimit)
    }else {
      desiredVelocity = methods.multiply(desiredVelocity, e.speedLimit * _dist / e.arrivalThreshold)
    }
    var force = methods.subtract(desiredVelocity, e.velocity);
    e.steeringForce = methods.add(e.steeringForce, force);
    return e
  }, update:function(e) {
    e.steeringForce = methods.truncate(e.steeringForce, e.maxForce);
    e.steeringForce = methods.divide(e.steeringForce, e.mass);
    e.velocity = methods.add(e.velocity, e.steeringForce);
    e.steeringForce = [0, 0];
    e.velocity = methods.truncate(e.velocity, e.speedLimit);
    e.position = methods.add(e.position, e.velocity);
    e.angle = methods.getAngle(e.velocity) * 180 / Math.PI;
    e.angle += 90;
    return e
  }, render:function(e) {
    if(options.rotate) {
      e["obj"].css({
	    marginLeft:e.position[0] - e.itemWidth05
	    ,marginTop:e.position[1] - e.itemHeight05
	    ,msTransform:"rotate(" + e.angle + "deg)"
	    ,"-moz-transform":"rotate(" + e.angle + "deg)"
	    ,"-o-transform":"rotate(" + e.angle + "deg)"
	    ,"-webkit-transform":"rotate(" + e.angle + "deg)"
	    ,"transform":"rotate(" + e.angle + "deg)"})
    }else {
      e["obj"].css({
	    marginLeft:e.position[0] - e.itemWidth05
	    ,marginTop:e.position[1] - e.itemHeight05
	  })
    }
  }, getID:function() {
    return++systemID
  }};
  $.fn.waypoints = function(method) {
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
    }else {
      if(typeof method === "object" || !method) {
        return methods.init.apply(this, arguments)
      }else {
        $.error("Method " + method + " does not exist on jQuery.waypoints")
      }
    }
  }
})(jQuery);
