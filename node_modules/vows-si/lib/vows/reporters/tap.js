var options = {
  tail: "\n"
};
var console = require("../console");
var stylize = console.stylize;
var puts    = console.puts(options);

//
// TAP Reporter
//

this.name = "tap";
this.setSTream = function setStream(s) {
  options.stream = s;
};

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var TapInterface = (function() {
  function TapInterface() {
    this.genOutput_ = __bind(this.genOutput_, this);
    this.testCount = __bind(this.testCount, this);
    this.bailOut = __bind(this.bailOut, this);
    this.skip = __bind(this.skip, this);
    this.notOk = __bind(this.notOk, this);
    this.ok = __bind(this.ok, this);
    this.count_ = 0;
  }

  TapInterface.prototype.ok = function(description) {
    return this.genOutput_("ok", ++this.count_, "- " + description);
  };

  TapInterface.prototype.notOk = function(description) {
    return this.genOutput_("not ok", ++this.count_, "- " + description);
  };

  TapInterface.prototype.skip = function(description) {
    return this.genOutput_("ok", ++this.count_, "# SKIP " + description);
  };

  TapInterface.prototype.bailOut = function(reason) {
    return "Bail out!" + (reason !== null ? " " + reason : "");
  };

  TapInterface.prototype.testCount = function() {
    return "1.." + this.count_;
  };

  TapInterface.prototype.genOutput_ = function(status, testNumber, description) {
    return "" + status + " " + testNumber + " " + description;
  };

  return TapInterface;
})();

var tap = new TapInterface();

this.report = function report(data) {
  var type  = data[0];
  var event = data[1];
  switch (type) {
    case "subject":
      puts("# " + stylize(event, "bold"));
      break;
    case "context":
      puts("# " + event);
      break;
    case "vow":
      switch (event.status) {
        case "honored":
          puts(tap.ok(event.title));
          break;
        case "pending":
          puts(tap.skip(event.title));
          break;
        case "broken":
          puts(tap.notOk(event.title + "\n# " + event.exception));
          break;
        case "errored":
          puts(tap.notOk(event.title));
          puts(tap.bailOut(event.exception));
          break;
      }
      break;
    case "end":
      puts("\n");
      break;
    case "finish":
      puts(tap.testCount());
      break;
    case "error":
      puts("#> Errored");
      puts("# " + JSON.stringify(data));
      break;
  }
};

this.print = function print(str) {
  require("util").print(str);
};
