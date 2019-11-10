(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Rythm = factory());
}(this, (function () { 'use strict';

function Rythm(){

  var that = this;

  that._browserAudioCtx = AudioContext || webkitAudioContext;

  that._audioCtx = new that._browserAudioCtx();

  that._init = function(){
    that._analyser = that._audioCtx.createAnalyser();
    that._gain = that._audioCtx.createGain();
    that._source = {};
    that._audio = {};
    that._hzHistory = [];
    that._analyser.fftSize = 2048;
  };

  that._init();

  that.stopped = false;
  that._rythmInputTypeList = {
    "TRACK" : 0,
    "STREAM" : 1,
    "EXTERNAL" : 2,
  };

  //Public
  that.startingScale = 0.75;
  that.pulseRatio = 0.50;
  that.maxValueHistory = 100;
  that.rythmMapping = [];

  that.addRythm = function addRythm(elementClass, type, startValue, nbValue){
    that.rythmMapping.push({
      elementClass: elementClass,
      type:type,
      startValue: startValue,
      nbValue: nbValue
    });
  };

  that.addRythm('rythm-bass','size',0,10);
  that.addRythm('rythm-medium','size',150,40);
  that.addRythm('rythm-high','size',400,200);

  that._createSourceFromAudioElement = function connectExternalAudioSource(audioElement) {
    return that._audioCtx.createMediaElementSource(that._audio);
  };

  that.connectExternalAudioElement = function connectExternalAudioElement(audioElement) {
    that._audio = audioElement;
    that._rythmInputType = that._rythmInputTypeList['EXTERNAL'];
    that._source = that._createSourceFromAudioElement(that._audio);
    that._connectSource(that._source);
  };

  that._connectSource = function _connectSource(source){
    source.connect(that._gain);
    that._gain.connect(that._analyser);
    if(that._rythmInputType !== that._rythmInputTypeList['STREAM']){
      that._analyser.connect(that._audioCtx.destination);
      that._audio.addEventListener("ended", that.stop);
    }
  };

  that.setMusic = function setMusic(trackUrl){
    that._audio = new Audio(trackUrl);
    that._rythmInputType = that._rythmInputTypeList['TRACK'];
    that._source = that._createSourceFromAudioElement(that._audio);
    that._connectSource(that._source);
  };

  that.plugMicrophone = function plugMicrophone(){
    return that._getMicrophoneStream().then(function(stream){
      that._audio = stream;
      that._rythmInputType = that._rythmInputTypeList['STREAM'];
      that._source = that._audioCtx.createMediaStreamSource(stream);
      that._connectSource(that._source);
    })
  };

  that._getMicrophoneStream = function _getMicrophoneStream(){
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);
    return new Promise(function(resolve, reject){
      navigator.getUserMedia({audio:true},
        function(medias){
          resolve(medias);
        },function(error){
          reject(error);
        });
    });
  };

  that.setGain = function setGain(value){
    that._gain.gain.value = value;
  };

  that.start = function start(){
    that._hzHistory = [];
    that._frequences = new Uint8Array(that._analyser.frequencyBinCount);
    if(that._rythmInputType === that._rythmInputTypeList['TRACK']){
      that._audio.play();
    }
    that.stopped = false;
    renderRythm();
  };

  that.stop = function stop(){
    if(that._rythmInputType === that._rythmInputTypeList['TRACK']){
      that._audio.pause();
    }else if(that._rythmInputType === that._rythmInputTypeList['STREAM']){
      that._audio.getAudioTracks()[0].enabled = false;
    }
    that.rythmMapping.forEach(function(mappingItem){
      var elements = document.getElementsByClassName(mappingItem.elementClass);
      for(var i = 0; i < elements.length; i++){
        elements[i].style.transform = 'initial';
      }
    });
    that.stopped = true;
  };


  function renderRythm() {
    if(that.stopped){
      return;
    }
    that._analyser.getByteFrequencyData(that._frequences);
    for(var i=0; i<that._frequences.length; i++){
      if(!that._hzHistory[i]){
        that._hzHistory[i] = [];
      }
      if(that._hzHistory[i].length > that.maxValueHistory){
        that._hzHistory[i].shift();
      }
      that._hzHistory[i].push(that._frequences[i]);
      var value = that._frequences[i];
    }
    that.rythmMapping.forEach(function(mappingItem){
      switch (mappingItem.type) {
        default:
          pulseSize(mappingItem.elementClass, getAverageRatio(mappingItem.startValue, mappingItem.nbValue));
      }
    });
    requestAnimationFrame(renderRythm);
  }

  function getAverageRatio(startingValue, nbValue){
    var total = 0;
    for(var i=startingValue; i<nbValue+startingValue; i++){
      total += getRatio(i);
    }
    return total/nbValue;
  }

  function getRatio(index){
    var min = 255;
    var max = 0;
    for(var i = 0; i < that._hzHistory[index].length; i++){
      if(that._hzHistory[index][i] < min){
        min = that._hzHistory[index][i];
      }
      if(that._hzHistory[index][i] > max){
        max = that._hzHistory[index][i];
      }
    }
    var scale = max - min;
    var actualValue = that._frequences[index] -min;
    var percentage = (actualValue/scale);
    return that.startingScale + (that.pulseRatio * percentage);
  }

  function pulseSize(name, value){
    var elements = document.getElementsByClassName(name);
    for(var i = 0; i < elements.length; i++){
      elements[i].style.transform = 'scale('+value+')';
    }
  }

}

return Rythm;

})));
