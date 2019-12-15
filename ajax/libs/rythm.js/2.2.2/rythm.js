(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Rythm = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Analyser = function Analyser() {
  var _this = this;

  classCallCheck(this, Analyser);

  this.initialise = function (analyser) {
    _this.analyser = analyser;
    _this.analyser.fftSize = 2048;
  };

  this.reset = function () {
    _this.hzHistory = [];
    _this.frequences = new Uint8Array(_this.analyser.frequencyBinCount);
  };

  this.analyse = function () {
    _this.analyser.getByteFrequencyData(_this.frequences);
    for (var i = 0; i < _this.frequences.length; i++) {
      if (!_this.hzHistory[i]) {
        _this.hzHistory[i] = [];
      }
      if (_this.hzHistory[i].length > _this.maxValueHistory) {
        _this.hzHistory[i].shift();
      }
      _this.hzHistory[i].push(_this.frequences[i]);
    }
  };

  this.getRangeAverageRatio = function (startingValue, nbValue) {
    var total = 0;
    for (var i = startingValue; i < nbValue + startingValue; i++) {
      total += _this.getFrequenceRatio(i);
    }
    return total / nbValue;
  };

  this.getFrequenceRatio = function (index) {
    var min = 255;
    var max = 0;
    _this.hzHistory[index].forEach(function (value) {
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    });
    var scale = max - min;
    var actualValue = _this.frequences[index] - min;
    var percentage = scale === 0 ? 0 : actualValue / scale;
    return _this.startingScale + _this.pulseRatio * percentage;
  };

  this.startingScale = 0;
  this.pulseRatio = 1;
  this.maxValueHistory = 100;
  this.hzHistory = [];
};

var Analyser$1 = new Analyser();

var Player = function Player(forceAudioContext) {
  var _this = this;

  classCallCheck(this, Player);

  this.createSourceFromAudioElement = function (audioElement) {
    audioElement.setAttribute('rythm-connected', _this.connectedSources.length);
    var source = _this.audioCtx.createMediaElementSource(audioElement);
    _this.connectedSources.push(source);
    return source;
  };

  this.connectExternalAudioElement = function (audioElement) {
    _this.audio = audioElement;
    _this.currentInputType = _this.inputTypeList['EXTERNAL'];
    var connectedIndex = audioElement.getAttribute('rythm-connected');
    if (!connectedIndex) {
      _this.source = _this.createSourceFromAudioElement(_this.audio);
    } else {
      _this.source = _this.connectedSources[connectedIndex];
    }
    _this.connectSource(_this.source);
  };

  this.connectSource = function (source) {
    source.connect(_this.gain);
    _this.gain.connect(Analyser$1.analyser);
    if (_this.currentInputType !== _this.inputTypeList['STREAM']) {
      Analyser$1.analyser.connect(_this.audioCtx.destination);
      _this.audio.addEventListener('ended', _this.stop);
    } else {
      Analyser$1.analyser.disconnect();
    }
  };

  this.setMusic = function (trackUrl) {
    _this.audio = new Audio(trackUrl);
    _this.currentInputType = _this.inputTypeList['TRACK'];
    _this.source = _this.createSourceFromAudioElement(_this.audio);
    _this.connectSource(_this.source);
  };

  this.setGain = function (value) {
    _this.gain.gain.value = value;
  };

  this.plugMicrophone = function () {
    return _this.getMicrophoneStream().then(function (stream) {
      _this.audio = stream;
      _this.currentInputType = _this.inputTypeList['STREAM'];
      _this.source = _this.audioCtx.createMediaStreamSource(stream);
      _this.connectSource(_this.source);
    });
  };

  this.getMicrophoneStream = function () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return new Promise(function (resolve, reject) {
      navigator.getUserMedia({ audio: true }, function (medias) {
        return resolve(medias);
      }, function (error) {
        return reject(error);
      });
    });
  };

  this.start = function () {
    if (_this.currentInputType === _this.inputTypeList['TRACK']) {
      _this.audio.play();
    }
  };

  this.stop = function () {
    if (_this.currentInputType === _this.inputTypeList['TRACK']) {
      _this.audio.pause();
    } else if (_this.currentInputType === _this.inputTypeList['STREAM']) {
      _this.audio.getAudioTracks()[0].enabled = false;
    }
  };

  this.browserAudioCtx = window.AudioContext || window.webkitAudioContext;
  this.audioCtx = forceAudioContext || new this.browserAudioCtx();
  this.connectedSources = [];
  Analyser$1.initialise(this.audioCtx.createAnalyser());
  this.gain = this.audioCtx.createGain();
  this.source = {};
  this.audio = {};
  this.hzHistory = [];
  this.inputTypeList = {
    TRACK: 0,
    STREAM: 1,
    EXTERNAL: 2
  };
};

var pulse = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 1.25;
  var min = !isNaN(options.min) ? options.min : 0.75;
  var scale = (max - min) * value;
  elem.style.transform = 'scale(' + (min + scale) + ') translateZ(0)';
});

var reset = function reset(elem) {
  elem.style.transform = '';
};

var shake = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 15;
  var min = !isNaN(options.min) ? options.min : -15;
  if (options.direction === 'left') {
    max = -max;
    min = -min;
  }
  var twist = (max - min) * value;
  elem.style.transform = 'translate3d(' + (min + twist) + 'px, 0, 0)';
});

var reset$1 = function reset(elem) {
  elem.style.transform = '';
};

var jump = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 30;
  var min = !isNaN(options.min) ? options.min : 0;
  var jump = (max - min) * value;
  elem.style.transform = 'translate3d(0, ' + -jump + 'px, 0)';
});

var reset$2 = function reset(elem) {
  elem.style.transform = '';
};

var twist = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 20;
  var min = !isNaN(options.min) ? options.min : -20;
  if (options.direction === 'left') {
    max = -max;
    min = -min;
  }
  var twist = (max - min) * value;
  elem.style.transform = 'rotate(' + (min + twist) + 'deg) translateZ(0)';
});

var reset$3 = function reset(elem) {
  elem.style.transform = '';
};

var vanish = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 1;
  var min = !isNaN(options.max) ? options.max : 0;
  var vanish = (max - min) * value;
  if (options.reverse) {
    elem.style.opacity = max - vanish;
  } else {
    elem.style.opacity = min + vanish;
  }
});

var reset$4 = function reset(elem) {
  elem.style.opacity = '';
};

var borderColor = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var from = options.from || [0, 0, 0];
  var to = options.to || [255, 255, 255];
  var scaleR = (to[0] - from[0]) * value;
  var scaleG = (to[1] - from[1]) * value;
  var scaleB = (to[2] - from[2]) * value;
  elem.style.borderColor = 'rgb(' + Math.floor(to[0] - scaleR) + ', ' + Math.floor(to[1] - scaleG) + ', ' + Math.floor(to[2] - scaleB) + ')';
});

var reset$5 = function reset(elem) {
  elem.style.borderColor = '';
};

var color = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var from = options.from || [0, 0, 0];
  var to = options.to || [255, 255, 255];
  var scaleR = (to[0] - from[0]) * value;
  var scaleG = (to[1] - from[1]) * value;
  var scaleB = (to[2] - from[2]) * value;
  elem.style.backgroundColor = 'rgb(' + Math.floor(to[0] - scaleR) + ', ' + Math.floor(to[1] - scaleG) + ', ' + Math.floor(to[2] - scaleB) + ')';
});

var reset$6 = function reset(elem) {
  elem.style.backgroundColor = '';
};

var radius = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 25;
  var min = !isNaN(options.min) ? options.min : 0;
  var borderRadius = (max - min) * value;
  if (options.reverse) {
    borderRadius = max - borderRadius;
  } else {
    borderRadius = min + borderRadius;
  }
  elem.style.borderRadius = borderRadius + 'px';
});

var reset$7 = function reset(elem) {
  elem.style.borderRadius = '';
};

var blur = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 8;
  var min = !isNaN(options.min) ? options.min : 0;
  var blur = (max - min) * value;
  if (options.reverse) {
    blur = max - blur;
  } else {
    blur = min + blur;
  }
  elem.style.filter = 'blur(' + blur + 'px)';
});

var reset$8 = function reset(elem) {
  elem.style.filter = '';
};

var coefficientMap = {
  up: -1,
  down: 1,
  left: 1,
  right: -1
};

var swing = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var radius = !isNaN(options.radius) ? options.radius : 20;
  var direction = Object.keys(coefficientMap).includes(options.direction) ? options.direction : 'right';
  var curve = Object.keys(coefficientMap).includes(options.curve) ? options.curve : 'down';
  var _ref = [coefficientMap[direction], coefficientMap[curve]],
      xCoefficient = _ref[0],
      yCoefficient = _ref[1];

  elem.style.transform = 'translate3d(' + xCoefficient * radius * Math.cos(value * Math.PI) + 'px, ' + yCoefficient * radius * Math.sin(value * Math.PI) + 'px, 0)';
});

var reset$9 = function reset(elem) {
  elem.style.transform = '';
};

var neon = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var from = options.from || [0, 0, 0];
  var to = options.to || [255, 255, 255];
  var scaleR = (to[0] - from[0]) * value;
  var scaleG = (to[1] - from[1]) * value;
  var scaleB = (to[2] - from[2]) * value;
  elem.style.boxShadow = '0 0 1em rgb(' + Math.floor(to[0] - scaleR) + ', ' + Math.floor(to[1] - scaleG) + ', ' + Math.floor(to[2] - scaleB) + ')';
});

var reset$10 = function reset(elem) {
  elem.style.boxShadow = '';
};

var kern = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 25;
  var min = !isNaN(options.min) ? options.min : 0;
  var kern = (max - min) * value;
  if (options.reverse) {
    kern = max - kern;
  } else {
    kern = min + kern;
  }
  elem.style.letterSpacing = kern + 'px';
});

var reset$11 = function reset(elem) {
  elem.style.letterSpacing = '';
};

var Dancer = function () {
  function Dancer() {
    classCallCheck(this, Dancer);

    this.resets = {};
    this.dances = {};
    this.registerDance('size', pulse, reset);
    this.registerDance('pulse', pulse, reset);
    this.registerDance('shake', shake, reset$1);
    this.registerDance('jump', jump, reset$2);
    this.registerDance('twist', twist, reset$3);
    this.registerDance('vanish', vanish, reset$4);
    this.registerDance('color', color, reset$6);
    this.registerDance('borderColor', borderColor, reset$5);
    this.registerDance('radius', radius, reset$7);
    this.registerDance('blur', blur, reset$8);
    this.registerDance('swing', swing, reset$9);
    this.registerDance('neon', neon, reset$10);
    this.registerDance('kern', kern, reset$11);
  }

  createClass(Dancer, [{
    key: 'registerDance',
    value: function registerDance(type, dance) {
      var reset$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      this.dances[type] = dance;
      this.resets[type] = reset$$1;
    }
  }, {
    key: 'dance',
    value: function dance(type, className, ratio, options) {
      var dance = type;
      if (typeof type === 'string') {
        //In case of a built in dance
        dance = this.dances[type] || this.dances['pulse'];
      } else {
        //In case of a custom dance
        dance = type.dance;
      }
      var elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(function (elem) {
        return dance(elem, ratio, options);
      });
    }
  }, {
    key: 'reset',
    value: function reset$$1(type, className) {
      var reset$$1 = type;
      if (typeof type === 'string') {
        //In case of a built in dance
        reset$$1 = this.resets[type] || this.resets['pulse'];
      } else {
        //In case of a custom dance
        reset$$1 = type.reset;
      }
      var elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(function (elem) {
        return reset$$1(elem);
      });
    }
  }]);
  return Dancer;
}();

var dancer = new Dancer();

var Rythm$1 = function Rythm(forceAudioContext) {
  var _this = this;

  classCallCheck(this, Rythm);

  this.connectExternalAudioElement = function (audioElement) {
    return _this.player.connectExternalAudioElement(audioElement);
  };

  this.setMusic = function (url) {
    return _this.player.setMusic(url);
  };

  this.plugMicrophone = function () {
    return _this.player.plugMicrophone();
  };

  this.setGain = function (value) {
    return _this.player.setGain(value);
  };

  this.connectSource = function (source) {
    return _this.player.connectSource(source);
  };

  this.addRythm = function (elementClass, type, startValue, nbValue, options) {
    _this.rythms.push({
      elementClass: elementClass,
      type: type,
      startValue: startValue,
      nbValue: nbValue,
      options: options
    });
  };

  this.start = function () {
    _this.stopped = false;
    _this.player.start();
    _this.analyser.reset();
    _this.renderRythm();
  };

  this.renderRythm = function () {
    if (_this.stopped) return;
    _this.analyser.analyse();
    _this.rythms.forEach(function (mappingItem) {
      var type = mappingItem.type,
          elementClass = mappingItem.elementClass,
          nbValue = mappingItem.nbValue,
          startValue = mappingItem.startValue,
          options = mappingItem.options;

      _this.dancer.dance(type, elementClass, _this.analyser.getRangeAverageRatio(startValue, nbValue), options);
    });
    _this.animationFrameRequest = requestAnimationFrame(_this.renderRythm);
  };

  this.resetRythm = function () {
    _this.rythms.forEach(function (mappingItem) {
      var type = mappingItem.type,
          elementClass = mappingItem.elementClass,
          nbValue = mappingItem.nbValue,
          startValue = mappingItem.startValue,
          options = mappingItem.options;

      _this.dancer.reset(type, elementClass);
    });
  };

  this.stop = function (freeze) {
    _this.stopped = true;
    _this.player.stop();
    if (_this.animationFrameRequest) cancelAnimationFrame(_this.animationFrameRequest);
    if (!freeze) _this.resetRythm();
  };

  this.player = new Player(forceAudioContext);
  this.analyser = Analyser$1;
  this.maxValueHistory = Analyser$1.maxValueHistory;
  this.dancer = dancer;
  this.rythms = [];
  this.addRythm('rythm-bass', 'pulse', 0, 10);
  this.addRythm('rythm-medium', 'pulse', 150, 40);
  this.addRythm('rythm-high', 'pulse', 400, 200);
  this.animationFrameRequest = void 0;
};

return Rythm$1;

})));
