/***************************************************************************************************
LoadingOverlay Extras - Progress
    Author          : Gaspare Sganga
    Version         : 1.4.0
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay/
****************************************************************************************************/
var LoadingOverlayProgress=function(a){function e(){var a=$("<div>",{"class":"loadingoverlay_progress_wrapper",css:{position:"relative",width:"100%",flex:"1 0 auto"}});return b=$("<div>",{"class":"loadingoverlay_progress_bar",css:$.extend(!0,{position:"absolute",left:"0"},d.bar)}).appendTo(a),c=$("<div>",{"class":"loadingoverlay_progress_text",css:$.extend(!0,{position:"absolute",left:"0","text-align":"right","white-space":"nowrap"},d.text),text:"0 %"}).appendTo(a),f(0),a}function f(a){0>a&&(a=0),a>100&&(a=100);var d={right:100-a+"%"};b.css(d),c.css(d),c.text(a+"%")}var b,c,d=$.extend(!0,{},{bar:{bottom:"25px",height:"20px",background:"#9bbb59"},text:{bottom:"50px",font:"14pt/1.2 sans-serif",color:"#303030"}},a);return{Init:e,Update:f}};