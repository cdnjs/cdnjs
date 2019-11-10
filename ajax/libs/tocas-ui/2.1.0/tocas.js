/* global ts */
var Tocas=function(){function k(a){return d.call(a,function(a){return null!=a})}var a,b=[],c=b.slice,d=b.filter,f={},g=Array.isArray||function(a){return a instanceof Array},h=function(a){return a instanceof Object};f.init=function(b,c){var d;if("string"==typeof b){if("<"==b[0])return f.fragment(b);if(b=b.trim(),"undefined"!=typeof c)return a(b).find(c);d=f.select(document,b)}else{if(f.isTocas(b))return b;g(b)?d=k(b):h(b)&&(d=[b],b=null)}return f.Tocas(d,b)},f.fragment=function(b){var c=/^<([^\/].*?)>$/,d=/(?:<)(.*?)( .*?)?(?:>)/,e=d.exec(b),f=e[0],g=e[1],h=e[2],i="undefined"!=typeof h,j=!f.match(c);if(j)var k=new RegExp(f+"(.*?)(?:</"+g+">)$"),l=k.exec(b),m=l[1];if(i)for(var n=h.split(/(?:\s)?(.*?)=(?:"|')(.*?)(?:"|')/).filter(Boolean),o={},p=0;p<n.length;p++)(p+2)%2==0&&(o[n[p]]=n[p+1]);var q=a(document.createElement(g));return i&&q.attr(o),j&&q.html(m),q},f.isTocas=function(a){return a instanceof f.Tocas},f.select=function(a,b){try{return c.call(a.querySelectorAll(b))}catch(a){console.log("TOCAS ERROR: Something wrong while selecting "+b+" element.")}},f.Tocas=function(b,c){return b=b||[],b.__proto__=a.fn,b.selector=c||"",b},a=function(a,b){return"function"!=typeof a?f.init(a,b):void document.addEventListener("DOMContentLoaded",a)},a.fn={each:function(a){return b.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},slice:function(){return a(c.apply(this,arguments))},eq:function(a){return this.slice(a,a+1)}},window.ts||(window.ts=a)}(Tocas);ts.fn.on=function(a,b,c,d){d=d||!1;var e=!0;return"string"!=typeof b&&(e=!1,c=b),"function"!=typeof c&&(d=c),this.each(function(){if("undefined"==typeof this.addEventListener)return console.log("TOCAS ERROR: Event listener is not worked with this element."),!1;"undefined"==typeof this.ts_eventHandler&&(this.ts_eventHandler={});var f=a.split(" ");for(var g in f){var h=f[g];"undefined"==typeof this.ts_eventHandler[h]&&(this.ts_eventHandler[h]={registered:!1,list:[]}),this.ts_eventHandler[h].registered===!1&&(this.addEventListener(h,function(a){if("undefined"!=typeof this.ts_eventHandler[h])for(var b in this.ts_eventHandler[h].list){if("undefined"!=typeof this.ts_eventHandler[h].list[b].selector){var c=!1;if(ts(this.ts_eventHandler[h].list[b].selector).each(function(b,d){a.target===d&&(c=!0)}),!c)return}this.ts_eventHandler[h].list[b].func.call(this,a),this.ts_eventHandler[h].list[b].once&&delete this.ts_eventHandler[h].list[b]}}),this.ts_eventHandler[h].registered=!0);var i=this.ts_eventHandler[h].list,j={func:c,once:d};e&&(j.selector=b),i.push(j),this.ts_eventHandler[h].list=i}})},ts.fn.one=function(a,b,c){return this.each(function(){ts(this).on(a,b,c,!0)})},ts.fn.off=function(a,b){return this.each(function(){if("undefined"!=typeof this.ts_eventHandler&&"undefined"!=typeof this.ts_eventHandler[a]){if(null==b)return void(this.ts_eventHandler[a].list=[]);for(var c in this.ts_eventHandler[a].list)b===this.ts_eventHandler[a].list[c].func&&delete this.ts_eventHandler[a].list[c]}})},ts.fn.css=function(a,b){var c="";if(null!=a&&null!=b)c=a+":"+b+";";else if("object"!=typeof a||Array.isArray(a)||null!=b){if(Array.isArray(a)&&null==b){var e={};return this.each(function(){for(var b in a)e[a[b]]=ts(this).getCss(a[b])}),e}if(null!=a&&null==b)return ts(this).getCss(a)}else for(var d in a)a.hasOwnProperty(d)&&(c+=d+":"+a[d]+";");return this.each(function(){"undefined"!=typeof this.style&&(this.style.cssText=this.style.cssText+c)})},ts.fn.hasClass=function(a){if(0 in this)return this[0].classList?this[0].classList.contains(a):new RegExp("(^| )"+a+"( |$)","gi").test(this[0].className)},ts.fn.classList=function(){var a=[];if(0 in this)if(this[0].classList)for(var b=0;b<this[0].classList.length;b++)a.push(this[0].classList[b]);else for(var b in this[0].className.split(" "))a.push(this[0].className.split(" ")[b]);return a},ts.fn.addClass=function(a){if(null!==a)return this.each(function(){var b=a.split(" ");for(var c in b)""!==b[c]&&(this.classList?this.classList.add(b[c]):this.className+=" "+b[c])})},ts.fn.removeClass=function(a){return this.each(function(){if(a){var b=a.split(" ");for(var c in b)""!=b[c]&&(this.classList?this.classList.remove(b[c]):"undefined"!=typeof this.className&&(this.className=this.className.replace(new RegExp("(^|\\b)"+a.split(" ").join("|")+"(\\b|$)","gi")," ")))}else this.className=""})},ts.fn.toggleClass=function(a){return this.each(function(){var b,c,d;b=a.split(" ");for(var e in b)this.classList?this.classList.toggle(b[e]):(d=this.className.split(" "),c=b.indexOf(b[e]),c>=0?d.splice(c,1):d.push(b[e]),this.className=b[e].join(" "))})},ts.fn.getCss=function(a){try{return 0 in this?document.defaultView.getComputedStyle(this[0],null).getPropertyValue(a):null}catch(a){return null}},ts.fn.remove=function(){return this.each(function(){this.parentNode.removeChild(this)})},ts.fn.children=function(){var a=[];return this.each(function(b,c){a.push.apply(a,c.children)}),ts(a)},ts.fn.find=function(a){if("string"!=typeof a)return null;var b=[];return this.each(function(c,d){b.push.apply(b,d.querySelectorAll(a))}),b.length?ts(b):null},ts.fn.parent=function(){return 0 in this?ts(this[0].parentNode):null},ts.fn.parents=function(a){var b=this,a=a||null,c=[];if(null!==a)var a=ts(a);for(;b&&(b=ts(b).parent()[0]);)(null==a||null!==a&&Array.prototype.indexOf.call(a,b)!==-1)&&c.push(b);return ts(c)},ts.fn.closest=function(a){for(var b=this,a=ts(a);;){if(b=ts(b).parent()[0],!b)return null;if(Array.prototype.indexOf.call(a,b)!==-1)return ts(b)}},ts.fn.contains=function(a){var b=ts(a),c=!1;return this.each(function(a,d){for(var e=d.childNodes,f=0;f<b.length;f++)Array.prototype.indexOf.call(e,b[f])!=-1&&(c=!0)}),c};

/**
 * Get the quadrant of the element.
 * 
 * @param  {HTMLElement} el   The element.
 * @return {Number}           The code of the quadrant.
 */
 
function quadrant(el)
{
    var position   = el.getBoundingClientRect()
    var width      = window.innerWidth
    var widthHalf  = width / 2
    var height     = window.innerHeight
    var heightHalf = height / 2
    
    if(position.left < widthHalf && position.top < heightHalf)
        return 2
    else if(position.left < widthHalf && position.top > heightHalf)
        return 3
    else if(position.left > widthHalf && position.top > heightHalf)
        return 4
    else if(position.left > widthHalf && position.top < heightHalf)
        return 1
}




/**
 * Expand the dropdown menu.
 * 
 * @param {HTMLElement} target   The dropdown to expand.
 */
 
function expandDropdown(target)
{
    ts(target).removeClass('hidden')
              .addClass('visible')
              .addClass('animating')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
    {
        ts(target).removeClass('animating')
    })
}




/**
 * Contract the dropdown menu.
 * 
 * @param {HTMLElement} target   The dropdown to contract.
 */
 
function contractDropdown(target)
{
    ts(target).removeClass('visible')
              .addClass('hidden')
              .addClass('animating')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
    {
        ts(target).removeClass('animating')
    })
}




/**
 * Expand or contract the dropdown.
 * 
 * @param {HTMLElement} target   The dropdown menu.
 * @param {MouseEvent}  event    The mouse click event.
 */
 
function detectDropdown(target, event)
{
    var isDropdown        = ts(target).hasClass('dropdown')
    var isDropdownText    = ts(event.target).hasClass('text')
    var hasDropdownParent = ts(event.target).hasClass('text')
    var parentIsItem      = ts(event.target).parent().hasClass('item')
    var targetIsDropdown  = ts(event.target).hasClass('dropdown')
    var isItem            = ts(event.target).hasClass('item')
    var isTsMenuItem      = ts(event.target).closest('.ts.menu')
    
    if((isTsMenuItem && isDropdown && parentIsItem && targetIsDropdown)  || 
       (isTsMenuItem && isDropdown && !parentIsItem && targetIsDropdown) ||
       (isTsMenuItem && isDropdown && hasDropdownParent && parentIsItem))
        expandDropdown(target)
    
    else if((isDropdown && isItem) || (isDropdown && parentIsItem))
        contractDropdown('.ts.dropdown.visible')
        
    else if(isDropdown && isTsMenuItem)
        expandDropdown(target)
        
    else if(isDropdown && targetIsDropdown)
        expandDropdown(target)

    else if(isDropdown && isDropdownText && hasDropdownParent)
        expandDropdown(target)
}




/**
 * Document click event listener.
 */

ts(document).on('click', function(event)
{ 
    if(ts(event.target).closest('.dropdown:not(.basic)') === null && !ts(event.target).hasClass('dropdown'))
    {
        contractDropdown('.ts.dropdown:not(.basic).visible')
    }
});




/**
 * Dropdown
 * 
 * @param {string} command   The extra options of the dropdown menu.
 */
 
ts.fn.dropdown = function(command)
{
    return this.each(function()
    {
        ts(this).on('click', function(e)
        {
            var pa = ts(this)[0]
        
            if(quadrant(pa) == 2)
                ts(this).removeClass('upward downward leftward rightward').addClass('downward rightward');
            if(quadrant(pa) == 3)
                ts(this).removeClass('upward downward leftward rightward').addClass('upward rightward');
            if(quadrant(pa) == 1)
                ts(this).removeClass('upward downward leftward rightward').addClass('downward leftward');
            if(quadrant(pa) == 4)
                ts(this).removeClass('upward downward leftward rightward').addClass('upward leftward');
        
            /** Close the visible dropdowns first */
            contractDropdown('.ts.dropdown.visible')
            
            detectDropdown(this, e)
        });
    })
}