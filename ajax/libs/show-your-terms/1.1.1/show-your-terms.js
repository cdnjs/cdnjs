(function() {
  this.ShowYourTerms = (function() {
    function ShowYourTerms(container, replay) {
      this.container = container;
      this.replay = replay != null ? replay : true;
      if (!this.container.nodeType) {
        this.container = document.querySelector(this.container);
      }
      this.content = [];
      if (this.container.innerText.length > 0) {
        this.declarativeBuilder();
      }
    }

    ShowYourTerms.prototype.declarativeBuilder = function() {
      var element, i, len, ref;
      ref = this.container.children;
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        this.content.push([
          element.getAttribute('data-action'), element.innerText, {
            styles: element.classList,
            delay: element.getAttribute('data-delay')
          }
        ]);
      }
      this.container.style.minHeight = window.getComputedStyle(this.container, null).getPropertyValue("height");
      return this.play();
    };

    ShowYourTerms.prototype.addCommand = function(content, options) {
      return this.content.push(["command", content, options]);
    };

    ShowYourTerms.prototype.addLine = function(content, options) {
      return this.content.push(["line", content, options]);
    };

    ShowYourTerms.prototype.play = function() {
      this.container.innerHTML = '';
      this.outputIndex = 0;
      return this.outputGenerator(this.content[this.outputIndex]);
    };

    ShowYourTerms.prototype.callNextOutput = function(delay) {
      this.outputIndex += 1;
      if (this.content[this.outputIndex]) {
        return setTimeout(((function(_this) {
          return function() {
            return _this.outputGenerator(_this.content[_this.outputIndex]);
          };
        })(this)), delay);
      } else if (this.replay) {
        return setTimeout(((function(_this) {
          return function() {
            return _this.play();
          };
        })(this)), delay);
      }
    };

    ShowYourTerms.prototype.outputGenerator = function(output) {
      var content, counter, currentLine, interval, options, speed, type;
      type = output[0], content = output[1], options = output[2];
      currentLine = document.createElement("div");
      if (options.styles) {
        currentLine.setAttribute("class", options.styles);
      }
      if (options.speed) {
        speed = options.speed;
      } else {
        speed = 100;
      }
      currentLine.classList.add('active');
      if (type === "command") {
        counter = 0;
        return interval = setInterval(((function(_this) {
          return function() {
            currentLine.appendChild(document.createTextNode(content[counter]));
            _this.container.appendChild(currentLine);
            counter++;
            if (counter === content.length) {
              currentLine.classList.remove('active');
              _this.callNextOutput(options.delay);
              return clearInterval(interval);
            }
          };
        })(this)), speed);
      } else {
        currentLine.appendChild(document.createTextNode(content));
        this.container.appendChild(currentLine);
        currentLine.classList.remove('active');
        return this.callNextOutput(options.delay);
      }
    };

    return ShowYourTerms;

  })();

}).call(this);
