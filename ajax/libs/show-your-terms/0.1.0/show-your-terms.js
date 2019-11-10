(function() {
  var waitForIt;

  this.ShowYourTerms = (function() {
    function ShowYourTerms(container, content1) {
      this.container = container;
      this.content = content1;
      this.container = document.querySelector(this.container);
      this.outputIndex = 0;
      this.content = [];
    }

    ShowYourTerms.prototype.addCommand = function(content, options) {
      if (options == null) {
        options = {};
      }
      this.content.push(["command", content, options]);
      return self;
    };

    ShowYourTerms.prototype.addLine = function(content, options) {
      if (options == null) {
        options = {};
      }
      return this.content.push(["line", content, options]);
    };

    ShowYourTerms.prototype.start = function() {
      return this.outputGenerator(this.content[this.outputIndex]);
    };

    ShowYourTerms.prototype.callNextOutput = function(index, delay) {
      if (delay == null) {
        delay = 800;
      }
      this.outputIndex = this.outputIndex + 1;
      if (this.content[this.outputIndex]) {
        return waitForIt(delay, (function(_this) {
          return function() {
            return _this.outputGenerator(_this.content[_this.outputIndex]);
          };
        })(this));
      } else {
        return this.outputIndex = 0;
      }
    };

    ShowYourTerms.prototype.outputGenerator = function(output) {
      var characters, content, counter, currentLine, interval, options, text, type;
      type = output[0];
      content = output[1];
      options = output[2];
      currentLine = document.createElement("div");
      if (options.classnames) {
        currentLine.setAttribute("class", options.classnames);
      }
      switch (type) {
        case "command":
          characters = content.split('');
          counter = 0;
          return interval = setInterval(((function(_this) {
            return function() {
              var text;
              text = document.createTextNode(characters[counter]);
              currentLine.appendChild(text);
              _this.container.appendChild(currentLine);
              counter++;
              if (counter === characters.length) {
                _this.callNextOutput(_this.outputIndex, options.delay);
                return clearInterval(interval);
              }
            };
          })(this)), options.speed);
        case "line":
          text = document.createTextNode(content);
          currentLine.appendChild(text);
          this.container.appendChild(currentLine);
          return this.callNextOutput(this.outputIndex, options.delay);
      }
    };

    return ShowYourTerms;

  })();

  waitForIt = (function(_this) {
    return function(ms, func) {
      return setTimeout(func, ms);
    };
  })(this);

}).call(this);
