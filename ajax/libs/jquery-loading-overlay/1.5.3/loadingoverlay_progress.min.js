/***************************************************************************************************
LoadingOverlay Extras - Progress
    Author          : Gaspare Sganga
    Version         : 1.5.3
    License         : MIT
    Documentation   : http://gasparesganga.com/labs/jquery-loading-overlay/
****************************************************************************************************/
var LoadingOverlayProgress=function(t){function e(){var t=$("<div>",{class:"loadingoverlay_progress_wrapper",css:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}});return s=$("<div>",{class:"loadingoverlay_progress_bar",css:$.extend(!0,{position:"absolute",left:"0"},a.bar)}).appendTo(t),r=$("<div>",{class:"loadingoverlay_progress_text",css:$.extend(!0,{position:"absolute",left:"0","text-align":"right","white-space":"nowrap"},a.text),text:"0 %"}).appendTo(t),o(0),t}function o(t){t<0&&(t=0),t>100&&(t=100);var e={right:100-t+"%"};s.css(e),r.css(e),r.text(t+"%")}var s,r,a=$.extend(!0,{},{bar:{bottom:"25px",height:"20px",background:"#9bbb59"},text:{bottom:"50px",font:"14pt/1.2 sans-serif",color:"#303030"}},t);return{Init:e,Update:o}};