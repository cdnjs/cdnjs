!function(t){function n(t){t=t||window.event,t.preventDefault&&t.preventDefault(),t.returnValue=!1}function i(t){if(r[t.keyCode])return n(t),!1}function e(){window.addEventListener&&window.addEventListener("DOMMouseScroll",n,!1),window.onwheel=n,window.onmousewheel=document.onmousewheel=n,window.ontouchmove=n,document.onkeydown=i}function o(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",n,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}var a=function(){var t=window.navigator.userAgent,n=t.indexOf("MSIE ")
if(n>0)return parseInt(t.substring(n+5,t.indexOf(".",n)),10)
var i=t.indexOf("Trident/")
if(i>0){var e=t.indexOf("rv:")
return parseInt(t.substring(e+3,t.indexOf(".",e)),10)}var o=t.indexOf("Edge/")
return o>0&&parseInt(t.substring(o+5,t.indexOf(".",o)),10)}()
t.fn.sliiide=function(n){function i(){u.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",O),c.body_slide?(u.children().css(y(b[c.place].deactivateAnimation)),a!==!1&&a<=11&&l.css(y(A[c.place].deactivateAnimation))):l.css(y(A[c.place].deactivateAnimation)),c.no_scroll&&o(),d=!1}var r,s,c=t.extend({toggle:"#sliiider-toggle",exit_selector:".slider-exit",animation_duration:"0.5s",place:"right",animation_curve:"cubic-bezier(0.54, 0.01, 0.57, 1.03)",body_slide:!0,no_scroll:!1,auto_close:!1},n),d=!1,l=t(this),f=t(c.toggle),m=t(c.exit_selector),u=t("body"),h={transform:"","overflow-x":"",transition:"",position:""},v={transform:"",transition:"",width:"",height:"",left:"",top:"",bottom:"",right:""},p={visibility:"hidden",transition:"transform "+c.animation_duration+" "+c.animation_curve,position:"fixed"},w={transition:"transform "+c.animation_duration+" "+c.animation_curve},g={"overflow-x":"hidden"},x={position:"relative","overflow-x":"hidden"},b={setleft:function(t){this.left.activateAnimation.transform="translateX("+t+"px)",this.left.deactivateAnimation.transform="translateX(0px)"},setright:function(t){this.right.activateAnimation.transform="translateX(-"+t+"px)",this.right.deactivateAnimation.transform="translateX(0px)"},setbottom:function(t){this.bottom.activateAnimation.transform="translateY(-"+t+"px)",this.bottom.deactivateAnimation.transform="translateY(0px)"},settop:function(t){this.top.activateAnimation.transform="translateY("+t+"px)",this.top.deactivateAnimation.transform="translateY(0px)"},left:{activateAnimation:{transform:""},deactivateAnimation:{transform:""}},right:{activateAnimation:{transform:""},deactivateAnimation:{transform:""}},top:{activateAnimation:{transform:""},deactivateAnimation:{transform:""}},bottom:{activateAnimation:{transform:""},deactivateAnimation:{transform:""}}},A={left:{properties:function(){var t="-"+l.width()+"px"
return{top:"0",left:t}},activateAnimation:{transform:"translateX(100%)"},deactivateAnimation:{transform:"translateX(0)"},size:function(t,n){return{height:t}}},right:{properties:function(){var t="-"+l.width()+"px"
return{top:"0",right:t}},activateAnimation:{transform:"translateX(-100%)"},deactivateAnimation:{transform:"translateX(0)"},size:function(t,n){return{height:t}}},top:{properties:function(){var t="-"+l.height()+"px"
return{left:"0",right:"0",top:t}},activateAnimation:{transform:"translateY(100%)"},deactivateAnimation:{transform:"translateY(0)"},size:function(t,n){return{width:n}}},bottom:{properties:function(){var t="-"+l.height()+"px"
return{left:0,right:0,bottom:t}},activateAnimation:{transform:"translateY(-100%)"},deactivateAnimation:{transform:"translateY(0)"},size:function(t,n){return{width:n}}}},y=function(n){return t.each(n,function(i,e){if("transition"===i){var o={},a=e.split(" ",1)[0],r=e.split(" ")
r.shift(),r=r.join(" "),o["-webkit-"+i]="-webkit-"+a+" "+r,o["-ms-"+i]="-ms-"+a+" "+r,t.extend(n,o)}else if("transform"===i){var s={}
s["-webkit-"+i]=e,s["-ms-"+i]=e}}),n},E=function(){var n={},i=T()
n.height=t(window).height(),n.width=t(window).width()+i,r=A[c.place].size(n.height,n.width),l.css(r),l.css(y(A[c.place].properties())),_()},_=function(){c.body_slide&&(s="right"===c.place||"left"===c.place?l.width():l.height(),b["set"+c.place](s))},k=function(){l.css(y(p)),l.css(y(A[c.place].properties())),_()},T=function(){var t=document.createElement("p")
t.style.width="100%",t.style.height="200px"
var n=document.createElement("div")
n.style.position="absolute",n.style.top="0px",n.style.left="0px",n.style.visibility="hidden",n.style.width="200px",n.style.height="150px",n.style.overflow="hidden",n.appendChild(t),document.body.appendChild(n)
var i=t.offsetWidth
n.style.overflow="scroll"
var e=t.offsetWidth
return i===e&&(e=n.clientWidth),document.body.removeChild(n),i-e},z=function(){if(E(),l.css("visibility","visible"),c.body_slide){u.css(y(x)),t("html").css(g),u.children().css(y(w)),u.children().css(y(b[c.place].activateAnimation)),a!==!1&&a<=11&&l.css(y(A[c.place].activateAnimation))
t(window).height(),t(window).scrollTop(),l.height(),l.offset().top}else l.css(y(A[c.place].activateAnimation))
c.no_scroll&&e(),d=!0},O=function(n){l.css("visibility","hidden"),u.css(h),t("html").css(h),u.unbind("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",O),k()}
E(),k(),t(window).resize(E),l.resize(E)
var X=function(){d?i():z()}
f.click(X),c.auto_close&&l.find("a").on("click",function(){i()}),m.on("click",function(){i()})
var Y=function(){u.css(h),l.css(v),t(window).off("resize",E),f.off("click",X)},M={reset:function(t){u.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",Y),i()},deactivate:function(){i()},activate:function(){z()}}
return M}
var r={37:1,38:1,39:1,40:1}}(jQuery)
