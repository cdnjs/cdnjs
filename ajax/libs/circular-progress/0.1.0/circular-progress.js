(function () {
  var circ = Math.PI * 2,
  quart = Math.PI / 2;

  this.CircularProgress = function (options) {
    if (! options.width || ! options.height || ! options.radius) {
      return ;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.width = options.width;
    this.canvas.height = options.height;

    this.radius = options.radius;

    delete options.width;
    delete options.height;
    delete options.radius;

    this.ctx = this.canvas.getContext('2d');
    for (var i in options) {
      console.log(i);
      this.ctx[i] = options[i];
    }
  };

  this.CircularProgress.prototype.progress = function (value) {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.radius, -(quart), ((circ) * value) - quart, false);
    this.ctx.stroke();
  };

}).call(this);