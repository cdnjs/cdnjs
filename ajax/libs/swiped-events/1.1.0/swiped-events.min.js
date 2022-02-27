/*!
 * swiped-events.js - v1.1.0
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function(t,e){"use strict";"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var u=e.createEvent("CustomEvent");return u.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),u},t.CustomEvent.prototype=t.Event.prototype),e.addEventListener("touchstart",function(t){if("true"===t.target.getAttribute("data-swipe-ignore"))return;o=t.target,l=Date.now(),n=t.touches[0].clientX,u=t.touches[0].clientY,a=0,i=0},!1),e.addEventListener("touchmove",function(t){if(!n||!u)return;var e=t.touches[0].clientX,l=t.touches[0].clientY;a=n-e,i=u-l},!1),e.addEventListener("touchend",function(t){if(o!==t.target)return;var e=parseInt(o.getAttribute("data-swipe-threshold")||"20",10),s=parseInt(o.getAttribute("data-swipe-timeout")||"500",10),r=Date.now()-l,c="";Math.abs(a)>Math.abs(i)?Math.abs(a)>e&&r<s&&(c=a>0?"swiped-left":"swiped-right"):Math.abs(i)>e&&r<s&&(c=i>0?"swiped-up":"swiped-down");""!==c&&o.dispatchEvent(new CustomEvent(c,{bubbles:!0,cancelable:!0}));n=null,u=null,l=null},!1);var n=null,u=null,a=null,i=null,l=null,o=null}(window,document);