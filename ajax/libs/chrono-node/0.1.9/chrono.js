// chrono.js
// version : 0.0.5
// author : Wanasit T.
// license : MIT
(function () {
  
  var chrono = function(){
    for(var attr in chrono){
      this[attr] = chrono[attr]
    }

    this.parsers = {}
    for(var p in chrono.parsers) this.parsers[p] = chrono.parsers[p];

    this.refiners = {}
    for(var r in chrono.refiners) this.refiners[r] = chrono.refiners[r];

    this.timezoneMap = {}
    for(var r in chrono.timezoneMap) this.timezoneMap[r] = chrono.timezoneMap[r];
  }

  chrono.timezoneMap = {};
  chrono.parsers = {};
  chrono.refiners = {};
  
  chrono.parse = function(text, referrenceDate, option) {
    
    option = option || {}

    if(typeof(referrenceDate) === 'string'){
      var _ref = moment(referrenceDate).zone(referrenceDate);
      option.timezoneOffset = _ref.zone();
      referrenceDate        = _ref.toDate();
    }

    var results = this.integratedParse(text, referrenceDate, option);
    var results = this.integratedRefine(text, results, option);
    
    return results;
  }
  
  chrono.parseDate = function(text, referrenceDate, timezoneOffset) {
    
    var results = this.parse(text, referrenceDate);
    
    if(results.length >= 1) return results[0].start.date(timezoneOffset);
    else return null;
  }
  
  if(typeof exports == 'undefined'){
    //Browser Code
    moment = moment || window.moment;
    window.chrono = chrono;
  }
  else{
    //Node JS
    if(typeof moment == 'undefined') eval("var moment = require('./moment');");
    var fs = require('fs');
    
    function loadModuleDirs(dir){
      
      var module_dirs = fs.readdirSync(__dirname+'/'+dir);
      module_dirs = module_dirs.filter(function(name) { return !name.match(/\./ ) })
      for(var i in module_dirs){
        var dirname = module_dirs[i];
        if(typeof(dirname) == 'function') continue;
        var parser_files = fs.readdirSync( __dirname +'/'+dir + '/' + dirname);

        for(var j in parser_files){
          var filename = parser_files[j];
          if(typeof(filename) == 'function') continue;
          if(!filename.match(/\.js$/)) continue;
          eval(fs.readFileSync(__dirname + '/'+dir+'/'+dirname+'/'+filename)+'');
        }
      }
    }
    
    eval(fs.readFileSync(__dirname + '/timezone.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/ParseResult.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/Parser.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/IntegratedParsing.js')+'');
    loadModuleDirs('parsers');
    eval(fs.readFileSync(__dirname + '/refiners/IntegratedRefinement.js')+'');
    loadModuleDirs('refiners');
    
    module.exports = chrono;
  }
  
})();


