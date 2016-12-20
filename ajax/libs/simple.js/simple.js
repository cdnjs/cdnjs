//predifined variables

var logdata = "Simple.js ~ $ ";
var date = Date();
var debug;

function Simple(){
    this.init = function(){
       
        log("Initizalized @ "+date);
        log("Initizalized Simple.js");   
        mode.debug();
        
    }
    
}
var Simple = new Simple();


function Mode(){
    this.debug = function(){
            try {
                try {
                    document.body.setAttribute('mode','debug');
                    debug = 1;
                }
                catch(err) {
                    document.body.setAttribute('mode','server');
                    debug = 0;
                } 
            }
            catch(err) {
                return 0;
            } 
    }
    
}
var mode = new Mode();
  
  

function log(text){
    console.log(logdata+text);   
}
function Log(text){
    console.log(logdata+text);   
}
function info(infomation){
    console.info(logdata+infomation);
}

function warn(warndata){
    console.warn(warndata);
}
    
   

function Clear(){
    console.clear();   
}

function clear(){
    console.clear();   
}

function error(errormessage){
    console.error(logdata+errormessage);   
}



function errors(){
    this.mysql = function(){
        log(logdata+"A mysql error has occured on the loading of this page, please refresh or try again.")
    }
}

var error = new errors();
function add(one,two){
    var answer = one + two;
    return answer;
}

function minus(one,two){
    var answer = one - two;
    return answer;
}

function times(one,two){
    var answer = one * two;
    return answer;
}
function divide(one,two){
    var answer = one / two;
    return answer;
}


function stor(){
    this.add = function(name, value){
        if (!name){
            name = "SimpleJs - LocalStorage"; 
        }
        localStorage.setItem(name, value);
    }
    this.remove = function(name){
        if (!name){
            name = "SimpleJS - LocalStorage"; 
        }
        localStorage.removeItem(name);   
    }
}



var stor = new stor();
