function Rythm(){

  var that = this;

  that._audioCtx = new AudioContext();
  that._analyser = that._audioCtx.createAnalyser();
  that._gain = that._audioCtx.createGain();
  that._source = {};
  that._audio = {};
  that._hzHistory = [];
  that._analyser.fftSize = 2048;
  that._stopped = false;
  //Public
  that.startingScale = 0.75;
  that.pulseRatio = 0.50;
  that.maxValueHistory = 100;

  that.setMusic = function setMusic(audioSource){
    that._audio = audioSource;
    that._source = that._audioCtx.createMediaElementSource(that._audio);
    that._source.connect(that._gain);
    that._gain.connect(that._analyser);
    that._analyser.connect(that._audioCtx.destination);
  }

  that.setGain = function setGain(value){
    that._gain.gain.value = value;
  }

  that.start = function start(){
    that._hzHistory = []
    that._frequences = new Uint8Array(that._analyser.frequencyBinCount);
    that._audio.play();
    that._stopped = false;
    renderRythm();
  }

  that.stop = function stop(){
    that._audio.pause();
    that._stopped = true;
  }

  function renderRythm() {
    if(that._stopped){
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
    pulse("rythm-bass", getAverageRatio(0, 10));
    pulse("rythm-medium", getAverageRatio(150, 40));
    pulse("rythm-high", getAverageRatio(500,100));
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

  function pulse(name, value){
    var elements = document.getElementsByClassName(name);
    for(var i = 0; i < elements.length; i++){
      elements[i].style.transform = 'scale('+value+')'
    }
  }

}
