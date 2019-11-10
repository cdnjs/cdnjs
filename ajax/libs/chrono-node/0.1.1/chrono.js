// chrono.js
// version : 0.0.5
// author : Wanasit T.
// license : MIT
(function () {
  
  var chrono = {}
  chrono.parsers = {};
  chrono.refiners = {};
  
  chrono.parse = function(text, referrenceDate, option) {
    
    var results = this.integratedParse(text, referrenceDate, option);
    var results = this.integratedRefine(text, results);
    
    return results;
  }
  
  chrono.parseDate = function(text, referrenceDate, option) {
    
    var results = this.parse(text, referrenceDate, option);
    
    if(results.length >= 1) return results[0].startDate;
    else return null;
  }
  
  if(typeof exports == 'undefined'){
    //Browser Code
    var moment = moment || window.moment;
    window.chrono = chrono;
  }
  else{
    //Node JS
    var fs = require('fs');
    var moment = require('./moment');
    
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
      
    eval(fs.readFileSync(__dirname + '/parsers/ParseResult.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/Parser.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/IntegratedParsing.js')+'');
    loadModuleDirs('parsers');
    eval(fs.readFileSync(__dirname + '/refiners/IntegratedRefinement.js')+'');
    loadModuleDirs('refiners');
    
    module.exports = chrono;
  }
  
})();


