// chrono.js
// version : 0.0.1
// author : Wanasit T.
// license : MIT
(function () {
  
  var chrono = {}
  chrono.parsers = {};
  chrono.importantdays = {};

  chrono.parse = function(text, referrenceDate, option) {
    
    var parser = this.IntegratedParser(text, referrenceDate, option);
    parser.execAll();
    
    return parser.results();
  }
  
  chrono.parseDate = function(text, referrenceDate, option) {
    
    var results = this.parse(text, referrenceDate, option);
    
    if(results.length >= 1) return results[0].startDate;
    else return null;
  }
  
  if(typeof exports == 'undefined'){
    //Browser Code
    var moment = window.moment;
    window.chrono = chrono;
  }
  else{
    //Node JS
    var fs = require('fs');
    var moment = require('./moment');
    
    eval(fs.readFileSync(__dirname + '/parsers/ParseResult.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/Parser.js')+'');
    eval(fs.readFileSync(__dirname + '/parsers/IntegratedParser.js')+'');
    
    var parser_dirs = fs.readdirSync(__dirname+'/parsers');
    parser_dirs = parser_dirs.filter(function(name) { return !name.match(/\./ ) })
    for(var i in parser_dirs){
      var dirname = parser_dirs[i];
      var parser_files = fs.readdirSync( __dirname + '/parsers/'+dirname);
      
      for(var j in parser_files){
        var filename = parser_files[j];
        if(!filename.match(/\.js$/)) continue;
        eval(fs.readFileSync(__dirname + '/parsers/'+dirname+'/'+filename)+'');
      }
    }
    module.exports = chrono;
  }
  
})();


