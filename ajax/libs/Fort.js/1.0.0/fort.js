function solid(){
function cback(e) {
    var t = [];
    for (var n = inputs.length; n--;) {
        if (!inputs[n].value.length) t.push(inputs[n]);
    }
    var r = t.length;
    var i = inputs.length;
    var s = document.querySelectorAll(".top");
    for (var o = s.length; o--;) {
        s[o].style.width = 100 - r / i * 100 + "%";
    }
}
var forms = document.querySelectorAll(".form"),
    inputs = [];
for (var i = forms.length; i--;) {
    var els = forms[i].querySelectorAll("input, textarea, select");
    for (var j = els.length; j--;) {
		classes = els[j].className.replace(/\s+/g, ' ').split(' ');
		ignore = false;
		for (var k = classes.length; k--;)
		{
			if (classes[k] == "ignore")
			{
				ignore = true;
				break;
			}
		}
        if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
            inputs.push(els[j]);
            els[j].addEventListener("input", cback, false);
        }
    }
}
}
function flash(){
function cback(e) {
var t = [];
for (var n = inputs.length; n--;) {
    if (!inputs[n].value.length) t.push(inputs[n]);
}
var r = t.length;
var i = inputs.length;
var s = document.querySelectorAll(".top");
for (var o = s.length; o--;) {
    s[o].style.width = 100 - r / i * 100 + "%";
    s[o].style.background = cols[i-r-1];
}
}
var forms = document.querySelectorAll(".form"),
inputs = [];
for (var i = forms.length; i--;) {
var els = forms[i].querySelectorAll("input, textarea, select");
for (var j = els.length; j--;) {
    if (els[j].type != "button" && els[j].type != "submit") {
        inputs.push(els[j]);
        els[j].addEventListener("input", cback, false);
    }
}
}
//Edit colors here
var cols = ["#1ABC9C","#EC7063","#3498DB"];
}

function gradient(){
function cback(e) {
var t = [];
for (var n = inputs.length; n--;) {
    if (!inputs[n].value.length) t.push(inputs[n]);
}
var r = t.length;
var i = inputs.length;
var s = document.querySelectorAll(".top");
for (var o = s.length; o--;) {
    s[o].style.width = 100 - r / i * 100 + "%";
}
}
var forms = document.querySelectorAll(".form"),
inputs = [];
for (var i = forms.length; i--;) {
var els = forms[i].querySelectorAll("input, textarea, select");
for (var j = els.length; j--;) {
    if (els[j].type != "button" && els[j].type != "submit") {
        inputs.push(els[j]);
        els[j].addEventListener("input", cback, false);
    }
}
}
}
function sections(){
function cback(e) {
var t = [];
for (var n = inputs.length; n--;) {
    if (!inputs[n].value.length) t.push(inputs[n]);
}
var r = t.length;
var i = inputs.length;
var s = document.querySelectorAll(".top");
for (var o = s.length; o--;) {
    s[o].style.width = 100 - r / i * 100 + "%";
}
}
var forms = document.querySelectorAll(".form"),
inputs = [];
for (var i = forms.length; i--;) {
var els = forms[i].querySelectorAll("input, textarea, select");
for (var j = els.length; j--;) {
    if (els[j].type != "button" && els[j].type != "submit") {
        inputs.push(els[j]);
        els[j].addEventListener("input", cback, false);
    }
}
}


function generateCSSGradient(colours) {
var l = colours.length, i;
for( i=0; i<l; i++) colours[i] = colours[i].join(" ");
return "linear-gradient( to right, "+colours.join(", ")+")";
}

//Edit your colors here. Enter the color twice.
var cols = [
["#1ABC9C","0%"],
["#1ABC9C","33.3%"],
["#EC7063","33.3%"],
["#EC7063","66.6%"],
["#3498DB","66.6%"],
["#3498DB","100%"]
];
document.getElementsByClassName('top').innerHTML = '<div class="colors"></div>';
document.querySelector(".colors").style.background = generateCSSGradient(cols);

var window_width = window.innerWidth + "px";
document.querySelector(".colors").style.width = window_width;




};
