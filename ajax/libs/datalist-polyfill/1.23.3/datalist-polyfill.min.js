/*
 * Datalist polyfill - https://github.com/mfranzke/datalist-polyfill
 * @license Copyright(c) 2017 by Maximilian Franzke
 * Supported by Christian, Johannes, @mitchhentges, @mertenhanisch, @ailintom, @Kravimir, @mischah, @hryamzik, @ottoville, @IceCreamYou, @wlekin, @eddr, @beebee1987, @mricherzhagen, @acespace90, @damien-git and @nexces - many thanks for that !
 */
/*
 * A minimal and dependency-free vanilla JavaScript datalist polyfill.
 * Supports all standard's functionality as well as mimics other browsers behavior.
 * Tests for native support of an inputs elements datalist functionality.
 * Elsewhere the functionality gets emulated by a select element.
 */
!function(){"use strict";
// Performance: Set local variables
var u=window.document,e=window.navigator.userAgent,
// Feature detection
t="list"in u.createElement("input")&&Boolean(u.createElement("datalist")&&window.HTMLDataListElement),
// IE & EDGE browser detection via UserAgent
// TODO: obviously ugly. But sadly necessary until Microsoft enhances the UX within EDGE (compare to https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9573654/)
// adapted out of https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d :
s=Boolean(e.match(/Trident\/[6-7]\./)),d=Boolean(-1!==e.indexOf("Edge/"));
// Let's break here, if it's even already supported ... and not IE10+ or EDGE
if(t&&!s&&!d)return;
// .matches polyfill
// TODO: probably needs enhancement on the expected to be supported browsers
Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector);
// Define some global settings and configurations
var p=!1,
// Speaking variables for the different keycodes
c=13,v=27,y=38,f=40,
// Defining the text / value seperator for displaying the value and text values ...
g=" / ",
// ... and defining the different input types that are supported by this polyfill
l=["text","email","number","search","tel","url"],
// Classes for elements
o="polyfilled",m="polyfilling",
// Defining a most likely unique polyfill string
n="###[P0LYFlLLed]###";
// Differentiate for touch interactions, adapted by https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
window.addEventListener("touchstart",function e(){p=!0,window.removeEventListener("touchstart",e)});
// For observing any changes to the option elements within the datalist elements, define MutationObserver initially
var i=window.MutationObserver||window.WebKitMutationObserver,a;
// Define a new observer
void 0!==i&&(a=new i(function(e){var i=!1;
// Look through all mutations that just occured
if(e.forEach(function(e){
// Look through all added nodes of this mutation
for(var t=0;t<e.addedNodes.length;++t)"datalist"===e.target.tagName.toLowerCase()&&(i=e.target)}),i){var t=u.querySelector('input[list="'+i.id+'"]');""!==A(t)&&
// Prepare the options and toggle the visiblity afterwards
O(k(i,t).length,i.getElementsByClassName(m)[0])}}));
// Function regarding the inputs interactions on keyup event
var r=function(e){var t=e.target,i=t.list,a=e.keyCode===y||e.keyCode===f;
// Check for whether the events target was an input and still check for an existing instance of the datalist and polyfilling select
if("input"===t.tagName.toLowerCase()&&null!==i)
// Handling IE10+ & EDGE
if(s||d)
// On keypress check for value
""===A(t)||a||e.keyCode===c||e.keyCode===v||
// As only EDGE doesn't trigger the input event after selecting an item via mouse, we need to differentiate here
!s&&"text"!==t.type||(b(t,i),
// TODO: Check whether this update is necessary depending on the options values
t.focus());else{var n=!1,
// Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
r=i.getElementsByClassName(m)[0]||x(t,i);
// On an ESC or ENTER key press within the input, let's break here and afterwards hide the datalist select, but if the input contains a value or one of the opening keys have been pressed ...
if(e.keyCode!==v&&e.keyCode!==c&&(""!==A(t)||a)&&void 0!==r){
// ... prepare the options
0<k(i,t).length&&(n=!0);var o=0,l=r.options.length-1;
// ... preselect best fitting index
p?r.selectedIndex=0:a&&"number"!==t.getAttribute("type")&&(r.selectedIndex=e.keyCode===y?l:0,
// ... and on arrow up or down keys, focus the select
r.focus())}
// Toggle the visibility of the datalist select according to previous checks
O(n,r)}},b=function(e,t){var a=A(e);
// Loop through the options
Array.prototype.slice.call(t.options,0).forEach(function(e){
// We're using .getAttribute instead of .dataset here for IE10
var t=e.getAttribute("data-originalvalue"),i=t||e.value;
// In case of that the original value hasn't been saved as data so far, do that now
t||
// We're using .setAttribute instead of .dataset here for IE10
e.setAttribute("data-originalvalue",i),
// As we'd manipulate the value in the next step, we'd like to put in that value as either a label or text if none of those exist
e.label||e.text||(e.label=i)
/*
			Check for whether the current option is a valid suggestion and replace its value by
				- the current input string, as IE10+ and EDGE don't do substring, but only prefix matching
				- followed by a unique string that should prevent any interferance
				- and the original string, that is still necessary e.g. for sorting within the suggestions list
			As the value is being inserted on users selection, we'll replace that one within the upfollowing inputInputListIE function
			*/,e.value=w(e,a)?a+n+i.toLowerCase():i})},h=function(e){var t=e.target,i=t.list;if(t.matches("input[list]")&&t.matches("."+o)&&i){
// Query for related option - and escaping the value as doublequotes wouldn't work
var a=i.querySelector('option[value="'+A(t).replace(/\\([\s\S])|(")/g,"\\$1$2")+'"]');
// We're using .getAttribute instead of .dataset here for IE10
a&&a.getAttribute("data-originalvalue")&&L(t,a.getAttribute("data-originalvalue"))}},w=function(e,t){var i=e.value.toLowerCase(),a=t.toLowerCase(),n=e.getAttribute("label"),r=e.text.toLowerCase();
/*
		"Each option element that is a descendant of the datalist element, that is not disabled, and whose value is a string that isn't the empty string, represents a suggestion. Each suggestion has a value and a label."
		"If appropriate, the user agent should use the suggestion's label and value to identify the suggestion to the user."
		*/return Boolean(!1===e.disabled&&(""!==i&&-1!==i.indexOf(a)||n&&-1!==n.toLowerCase().indexOf(a)||""!==r&&-1!==r.indexOf(a)))},E=function(e){
// Check for correct element on this event delegation
if(e.target.matches("input[list]")){var t=e.target,i=t.list;
// Check for whether the events target was an input and still check for an existing instance of the datalist
if("input"===t.tagName.toLowerCase()&&null!==i){
// #GH-49: Microsoft EDGE / datalist popups get "emptied" when receiving focus via tabbing
if(
// Test for whether this input has already been enhanced by the polyfill
t.matches("."+o)||C(t,e.type),d&&"focusin"===e.type){
// Set the value of the first option to it's value - this actually triggers a redraw of the complete list
var a=t.list.options[0];a.value=a.value}
// Break here for IE10+ & EDGE
if(!s&&!d){var// Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
n=i.getElementsByClassName(m)[0]||x(t,i),
// Either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur - and check for general existance of any option as suggestions
r=n&&n.querySelector("option:not(:disabled)")&&("focusin"===e.type&&""!==A(t)||e.relatedTarget&&e.relatedTarget===n);
// Toggle the visibility of the datalist select according to previous checks
O(r,n)}}}},C=function(e,t){
// We'd like to prevent autocomplete on the input datalist field
e.setAttribute("autocomplete","off"),
// WAI ARIA attributes
e.setAttribute("role","textbox"),e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-autocomplete","list"),e.setAttribute("aria-owns",e.getAttribute("list")),
// Bind the keyup event on the related datalists input
"focusin"===t?(e.addEventListener("keyup",r),e.addEventListener("focusout",E,!0),
// As only EDGE doesn't trigger the input event after selecting an item via mouse, we need to differentiate here
(s||d&&"text"===e.type)&&e.addEventListener("input",h)):"blur"===t&&(e.removeEventListener("keyup",r),e.removeEventListener("focusout",E,!0),
// As only EDGE doesn't trigger the input event after selecting an item via mouse, we need to differentiate here
(s||d&&"text"===e.type)&&e.removeEventListener("input",h)),
// Add class for identifying that this input is even already being polyfilled
e.className+=" "+o},A=function(e){
// In case of type=email and multiple attribute, we would need to grab the last piece
// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
return"email"===e.getAttribute("type")&&null!==e.getAttribute("multiple")?e.value.substring(e.value.lastIndexOf(",")+1):e.value},L=function(e,t){var i;
// In case of type=email and multiple attribute, we need to set up the resulting inputs value differently
e.value=
// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
"email"===e.getAttribute("type")&&null!==e.getAttribute("multiple")&&-1<(i=e.value.lastIndexOf(","))?e.value.slice(0,i)+","+t:t};
// On keypress check all options for that as a substring, save the original value as a data-attribute and preset that inputs value (for sorting) for all option values (probably as well enhanced by a token)
// Break here for IE10+ & EDGE
if(
// Binding the focus event - matching the input[list]s happens in the function afterwards
u.addEventListener("focusin",E,!0),!s&&!d){
// Function for preparing and sorting the options/suggestions
var k=function(e,n){void 0!==a&&a.disconnect();var// Creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
t=e.getElementsByClassName(m)[0]||x(n,e),o=A(n),l=u.createDocumentFragment(),s=u.createDocumentFragment();
// Create an array out of the options list
Array.prototype.slice.call(e.querySelectorAll("option:not(:disabled)")).sort(function(e,t){var i=e.value,a=t.value;
// Using the knowledge that the values are URLs to allow the user to omit the scheme part and perform intelligent matching on the domain name
return"url"===n.getAttribute("type")&&(i=i.replace(/(^\w+:|^)\/\//,""),a=a.replace(/(^\w+:|^)\/\//,"")),i.localeCompare(a)}).forEach(function(e){var t=e.value,i=e.getAttribute("label"),a=e.text;
// Put this option into the fragment that is meant to get inserted into the select. Additionally according to the specs ...
// TODO: This might get slightly changed/optimized in a future release
if(w(e,o)){var n=a.substr(0,t.length+g.length),r;
// The innertext should be 'value seperator text' in case they are different
a&&!i&&a!==t&&n!==t+g?e.innerText=t+g+a:e.text||(
// Manipulating the option inner text, that would get displayed
e.innerText=i||t),l.appendChild(e)}else
// ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
s.appendChild(e)}),
// Input the options fragment into the datalists select
t.appendChild(l);var i=t.options.length;return t.size=10<i?10:i,t.multiple=!p&&i<2,
// Input the unused options as siblings next to the select - and differentiate in between the regular, and the IE9 fix syntax upfront
(e.getElementsByClassName("ie9_fix")[0]||e).appendChild(s),void 0!==a&&a.observe(e,{childList:!0}),t.options},x=function(e,t){
// Check for whether it's of one of the supported input types defined at the beginning
// Using .getAttribute here for IE9 purpose - elsewhere it wouldn't return the newer HTML5 values correctly
// and still check for an existing instance
if(!(e.getAttribute("type")&&-1===l.indexOf(e.getAttribute("type"))||null===t)){var i=e.getClientRects(),
// Measurements
a=window.getComputedStyle(e),n=u.createElement("select");
// Setting a class for easier identifying that select afterwards
// The select should get positioned underneath the input field ...
if(n.setAttribute("class",m),
// Set general styling related definitions
n.style.position="absolute",
// Initially hiding the datalist select
O(!1,n),
// The select itself shouldn't be a possible target for tabbing
n.setAttribute("tabindex","-1"),
// WAI ARIA attributes
n.setAttribute("aria-live","polite"),n.setAttribute("role","listbox"),p||n.setAttribute("aria-multiselectable","false"),"block"===a.getPropertyValue("display"))n.style.marginTop="-"+a.getPropertyValue("margin-bottom");else{var r="rtl"===a.getPropertyValue("direction")?"right":"left";n.style.setProperty("margin-"+r,"-"+(i[0].width+parseFloat(a.getPropertyValue("margin-"+r)))+"px"),n.style.marginTop=parseInt(i[0].height+(e.offsetTop-t.offsetTop),10)+"px"}
// Set the polyfilling selects border-radius equally to the one by the polyfilled input
if(n.style.borderRadius=a.getPropertyValue("border-radius"),n.style.minWidth=i[0].width+"px",p){var o=u.createElement("option");
// ... and it's first entry should contain the localized message to select an entry
o.innerText=t.title,
// ... and disable this option, as it shouldn't get selected by the user
o.disabled=!0,
// ... and assign a dividable class to it
o.setAttribute("class","message"),
// ... and finally insert it into the select
n.appendChild(o)}
// Add select to datalist element ...
return t.appendChild(n),
// ... and our upfollowing functions to the related event
p?n.addEventListener("change",N):n.addEventListener("click",N),n.addEventListener("blur",N),n.addEventListener("keydown",N),n.addEventListener("keypress",T),n}},T=function(e){var t=e.target,i=t.parentNode,a=u.querySelector('input[list="'+i.id+'"]');
// Check for whether the events target was a select or whether the input doesn't exist
"select"===t.tagName.toLowerCase()&&null!==a&&(
// Determine a relevant key - either printable characters (that would have a length of 1) or controlling like Backspace
!e.key||"Backspace"!==e.key&&1!==e.key.length||(a.focus(),"Backspace"===e.key?(a.value=a.value.substr(0,a.value.length-1),
// Dispatch the input event on the related input[list]
B(a)):a.value+=e.key,k(i,a)))},N=function(e){var t=e.currentTarget,i=t.parentNode,a=u.querySelector('input[list="'+i.id+'"]');
// Check for whether the events target was a select or whether the input doesn't exist
if("select"===t.tagName.toLowerCase()&&null!==a){var n=e.type,
// ENTER and ESC
r="keydown"===n&&e.keyCode!==c&&e.keyCode!==v;
// On change, click or after pressing ENTER or TAB key, input the selects value into the input on a change within the list
("change"===n||"click"===n||"keydown"===n&&(e.keyCode===c||"Tab"===e.key))&&0<t.value.length&&t.value!==i.title?(L(a,t.value),
// Dispatch the input event on the related input[list]
B(a),
// Finally focusing the input, as other browser do this as well
"Tab"!==e.key&&a.focus(),
// #GH-51 / Prevent the form to be submitted on selecting a value via ENTER key within the select
e.keyCode===c&&e.preventDefault(),
// Set the visibility to false afterwards, as we're done here
r=!1):"keydown"===n&&e.keyCode===v&&
// In case of the ESC key being pressed, we still want to focus the input[list]
a.focus(),
// Toggle the visibility of the datalist select according to previous checks
O(r,t)}},B=function(e){var t;"function"==typeof Event?t=new Event("input",{bubbles:!0}):(t=u.createEvent("Event")).initEvent("input",!0,!1),e.dispatchEvent(t)},O=function(e,t){e?t.removeAttribute("hidden"):t.setAttributeNode(u.createAttribute("hidden")),t.setAttribute("aria-hidden",(!e).toString())},S,P;
// Define function for setting up the polyfilling select
(
// Emulate the two properties regarding the datalist and input elements
// list property / https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
S=window.HTMLInputElement)&&S.prototype&&void 0===S.prototype.list&&Object.defineProperty(S.prototype,"list",{get:function(){
/*
					According to the specs ...
					"The list IDL attribute must return the current suggestions source element, if any, or null otherwise."
					"If there is no list attribute, or if there is no element with that ID, or if the first element with that ID is not a datalist element, then there is no suggestions source element."
					*/
var e=u.getElementById(this.getAttribute("list"));return"object"==typeof this&&this instanceof S&&e&&e.matches("datalist")?e:null}}),(
// Options property / https://developer.mozilla.org/en/docs/Web/API/HTMLDataListElement
P=window.HTMLElement)&&P.prototype&&void 0===P.prototype.options&&Object.defineProperty(P.prototype,"options",{get:function(){return"object"==typeof this&&this instanceof P?this.getElementsByTagName("option"):null}})}}();