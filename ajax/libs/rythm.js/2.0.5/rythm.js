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
    var percentage = actualValue / scale;
    return _this.startingScale + _this.pulseRatio * percentage;
  };

  this.startingScale = 0;
  this.pulseRatio = 1;
  this.maxValueHistory = 100;
  this.hzHistory = [];
};

var Analyser$1 = new Analyser();

var Player = function Player() {
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
      _this.audio.addEventListener("ended", _this.stop);
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

  this.browserAudioCtx = AudioContext || webkitAudioContext;
  this.audioCtx = new this.browserAudioCtx();
  this.connectedSources = [];
  Analyser$1.initialise(this.audioCtx.createAnalyser());
  this.gain = this.audioCtx.createGain();
  this.source = {};
  this.audio = {};
  this.hzHistory = [];
  this.inputTypeList = {
    "TRACK": 0,
    "STREAM": 1,
    "EXTERNAL": 2
  };
};

var player = new Player();

var pulse = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 1.25;
  var min = !isNaN(options.min) ? options.min : 0.75;
  var scale = (max - min) * value;
  elem.style.transform = "scale(" + (min + scale) + ")";
});

var shake = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 15;
  var min = !isNaN(options.min) ? options.min : -15;
  if (options.direction === 'left') {
    max = -max;
    min = -min;
  }
  var twist = (max - min) * value;
  elem.style.transform = 'translateX(' + (min + twist) + 'px)';
});

var jump = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 30;
  var min = !isNaN(options.min) ? options.min : 0;
  var jump = (max - min) * value;
  elem.style.transform = "translateY(" + -jump + "px)";
});

var twist = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var max = !isNaN(options.max) ? options.max : 20;
  var min = !isNaN(options.min) ? options.min : -20;
  if (options.direction === 'left') {
    max = -max;
    min = -min;
  }
  var twist = (max - min) * value;
  elem.style.transform = 'rotate(' + (min + twist) + 'deg)';
});

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

var color = (function (elem, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var from = options.from || [0, 0, 0];
  var to = options.to || [255, 255, 255];
  var scaleR = (to[0] - from[0]) * value;
  var scaleG = (to[1] - from[1]) * value;
  var scaleB = (to[2] - from[2]) * value;
  elem.style.backgroundColor = "rgb(" + Math.floor(to[0] - scaleR) + ", " + Math.floor(to[1] - scaleG) + ", " + Math.floor(to[2] - scaleB) + ")";
});

var Dancer = function () {
  function Dancer() {
    classCallCheck(this, Dancer);

    this.dances = {};
    this.registerDance('size', pulse);
    this.registerDance('pulse', pulse);
    this.registerDance('shake', shake);
    this.registerDance('jump', jump);
    this.registerDance('twist', twist);
    this.registerDance('vanish', vanish);
    this.registerDance('color', color);
  }

  createClass(Dancer, [{
    key: 'registerDance',
    value: function registerDance(type, value) {
      this.dances[type] = value;
    }
  }, {
    key: 'dance',
    value: function dance(type, className, ratio, options) {
      var dance = type;
      if (typeof type === 'string') {
        dance = this.dances[type] || this.dances['pulse'];
      }
      var elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(function (elem) {
        return dance(elem, ratio, options);
      });
    }
  }]);
  return Dancer;
}();

var dancer = new Dancer();

var Rythm$1 = function Rythm() {
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
    requestAnimationFrame(_this.renderRythm);
  };

  this.stop = function () {
    _this.stopped = true;
    _this.player.stop();
  };

  this.player = player;
  this.analyser = Analyser$1;
  this.maxValueHistory = Analyser$1.maxValueHistory;
  this.dancer = dancer;
  this.rythms = [];
  this.addRythm('rythm-bass', 'pulse', 0, 10);
  this.addRythm('rythm-medium', 'pulse', 150, 40);
  this.addRythm('rythm-high', 'pulse', 400, 200);
};

return Rythm$1;

})));
