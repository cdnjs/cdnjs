/*
 * DirecJS Version 2.0 (Always Updating Latest on Github ) - First and Last Version name
 *
 *Website :- direcjs.blogspot.com

 Functions to add...
 1.prepend, clone,
 */
//functions
//Add this Function to use $ instead of dj..... let $ = (a) => dj(a);


var sd = document;
let dj = (a) => { 
    s = sd.querySelectorAll(a);
    s.ready = (a) => {
        s.onload = a;
        return s
    };
    s.css = (a, b) => {
        if (b) {
            for(var i = 0; i < s.length ;i++){s[i].style[a] = b}
        } else {
            for (let key in a) {
                var i = 0;
            while( i < s.length ){ s[i].style[key] = a[key];i++ }
            
        }
        }
        return s
    }
    s.hide = (a) => {
        for(var i = 0; i <s.length ;i++){s[i].style.display = 'none'; }
        
        return s
    };

    s.alert = (b) => {
        if (!b) {
            b = 'innerHTML'
        }
        for(var i = 0; i <s.length ;i++){alert(s[i][b]); }
        
        return s
    };
    s.html = (a) => {
        if (a) {
            for(var i = 0; i <s.length ;i++){s[i].innerHTML = a; }
            
            return s
        }
        var tp = "";
        for(var i = 0; i <s.length ;i++){tp += s[i].innerHTML }
        return tp ;
    };
    s.text = (a) => {
        if (a) {
            for(var i = 0; i <s.length ;i++){s[i].innerText = a; }
            return s
        }
        var tp = "";
        for(var i = 0; i <s.length ;i++){tp += s[i].innerText }
        return tp ;
    };
    s.val = (a) => {
        if (a) {
            for(var i = 0; i <s.length ;i++){s[i].value = a; }
            return s
        }
        var tp = "";
        for(var i = 0; i <s.length ;i++){tp += s[i].innerText }
        return tp ;
    };

    s.append = (b, c) => {
        append(a, b, c);
        return s
    };
    s.prepend = (b, c) => {
        prepend(a, b, c);
        return s
    };
    s.appendTo = (b,c) => {
        
        for(var i = 0; i <s.length ;i++){d = s[i].innerHTML ; }
        append(b, d, c);
        return s
     };
    return s;
}
let $ = (a) => dj(a);
let get = {};
function get_(a, b, c) {
    var text;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            rpns = this.responseText;
            switch (b) {
                case 'json':
                    text = JSON.parse(rpns);
                    break;
                case 'dom':
                    text = DOMParser(rpns);
                    break;
                default:
                    text = rpns;
            }
            
        }
    };
    xhttp.open("GET", a, c);
    xhttp.send();
    return text;
}
get.dom = (a, c) => get_(a, 'dom', c);
get.json = (a, c) => get_(a, 'json', c);

//Basic Functions
let csl = (a) => console.log(a);
//Copy Function 
function copy_(a, b, c) {
    //Codes
}
//Append Functions
function append(a, b, c) {
    if (!c) c = 'Beforeend';
    for(var i = 0; i <dj(a).length ;i++){dj(a)[i].insertAdjacentHTML(c, b) }
}
let prepend = (a,b,c) =>{if (!c) c = 'afterBegin';append_(a,b,c)};
function hide(a) {
    switch (typeof (a)) {
        case 'object':
            a.style.display = 'none';
            break;
        default:
            dj(a).style.display = 'none';
            break;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
let search = (a,b) => getParameterByName(a,b);

//Maths Functions

function secondsToMinutes(time) {
    return Math.floor(time / 60) + ':' + Math.floor(time % 60);
}


//Add Module for Instant importing Things
function add(a) {
    switch (a) {
        case 'bootstrap':
            add.css('https://cdn.jsdelivr.net/gh/twbs/bootstrap/dist/css/bootstrap.min.css');
            break;
        case 'jquery':
            add.js("https://code.jquery.com/jquery-3.5.1.min.js");
            break;
        case 'prismjs':
            add.css('https://cdn.jsdelivr.net/gh/DirecJS/PrismJS@latest/prism.min.css');
            add.js("https://cdn.jsdelivr.net/gh/DirecJS/PrismJS@latest/prism.min.js");
            break;
    }
    
}
add.css = (a) => append('head', '<link rel="stylesheet" href="' + a + '" />');
add.js = (a) => append('body', '<script src="' + a + '"></script>');
