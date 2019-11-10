/**
 * A lightweight jquery particle plugin
 * Author: https://bruederlin.digital
 * Licensed under the MIT license
 */
if(typeof jQuery === 'undefined') {
    console.warn('Make sure jQuery is included before jquery.particles.js');
}

;(function($, window) {
  'use strict';
  
  var Plugin, Particle, canvas, ctx, options;
  
  /**
   * Plugin constructor
   */
  var Plugin = function(options, element) {
    this.options = options;
    canvas = element[0];
    ctx = canvas.getContext('2d');
    
    this.particles = [];
    
    this.defaults = {
      maxParticles: 100,
      size: 3,
      speed: 0.5,
      color: '#000000',
      minDist: 140,
      connectParticles: false
    };
    
    this._init();
  };

  Plugin.prototype = {
    _init: function(){      
      options = $.extend({}, this.defaults, this.options);
      
      if(this._isHex(options.color)) {
        options.color = this._hex2rgb(options.color);
      }
      
      window.addEventListener('resize', this._resize.bind(this), false);
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      for(var i = 0; i < options.maxParticles; i++) {
        this.particles.push(new Particle());
      }
      
      this._animate();
    },

    _draw: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for(var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle._draw();
      }
    
      this._update();
    },
    
    _distance: function(p1, p2) {
      var n, r = p1.x - p2.x,
          dy = p1.y - p2.y;
          
      n = Math.sqrt(r * r + dy * dy);
      
      if(n <= options.minDist) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(' + options.color.r + ', ' + options.color.g + ', ' + options.color.b + ', ' + (1.2 - n / options.minDist) + ')';
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath()
      }
    },
    
    _update: function() {
      for(var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if(particle.x + particle.radius > canvas.width) {
          particle.x = particle.radius;
        } else if(particle.x - particle.radius < 0) {
          particle.x = canvas.width - particle.radius
        }
          
        if(particle.y + particle.radius > canvas.height) {
          particle.y = particle.radius;
        } else if(particle.y - particle.radius < 0) {
          particle.y = canvas.height - particle.radius
        }
        
        if(options.connectParticles) {
          for (var j = i + 1; j < this.particles.length; j++) {
            var particle2 = this.particles[j];
          
            this._distance(particle, particle2);
          }
        }
      }
    },
  
    _animate: function() {
      this._draw();
      window.requestAnimationFrame(this._animate.bind(this));
    },
    
    _resize: function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      this._draw();
    },
    
    _isHex: function(hex) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)
    },
     
    _hex2rgb: function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  };
  
  /**
   * Particle constructor
   */
  var Particle = function() {    
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    this.vx = Math.random() * options.speed * 2 - options.speed;
    this.vy = Math.random() * options.speed * 2 - options.speed;
    
    this.radius = Math.random() * Math.random() * options.size;
    
    this._draw(ctx, options);
  };
  
  Particle.prototype = {
    _draw: function() {
      ctx.fillStyle = 'rgb(' + options.color.r + ', ' + options.color.g  + ', ' + options.color.b + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill()
    }
  };
  
  $.fn.particles = function(args) {
    return new Plugin(args, this);
  };
})(jQuery, window);