
/*! Merger v0.28.6 - Merge Your Qrcode Together. Even Quicker. - https://merger.huangxin.org */
/*! jquery-qrcode v0.18.0 - https://larsjung.de/jquery-qrcode/ */

// Homepage: https://merger.huangxin.org
// Released under GNU General Public License v3.0. Open source at https://github.com/qr-merger/merger.
// Author @hifocus (https://github.com/hifocus), and contributors(https://github.com/qr-merger/merger/graphs/contributors).


var client;
var selected;
var scale = window.devicePixelRatio; // Change scale to 1 on retina screens to see blurry canvas

$("#favicon").attr("href", profile_url); // Set page icon

var userLang = navigator.language || navigator.userLanguage;
if (multilingual !== false) {
  if (/zh-CN|zh-cn|zh-Hans|zh-hans|cn/i.test(userLang)) {
    if (typeof myname_hans === "string") {
      var myname = myname_hans;
    }
  }
  else if (/zh-TW|zh-HK|zh-tw|zh-hk|zh-Hant|zh-hant|tw|hk/i.test(userLang)) {
    if (typeof myname_hant === "string") {
      var myname = myname_hant;
    }
  }
  else {
    if (typeof myname_eng === "string") {
      var myname = myname_eng;
    }
  }
}
// To add spaces before and after the user's name
// if first or final character contains English or number
var firstchar = myname.charAt(0); // get first character
var lastchar = myname.charAt(myname.length - 1); // get last character
var english = /^[A-Za-z0-9]*$/; // "select" all English characters, numbers and punctuations
if (english.test(firstchar) || english.test(lastchar)) { // See if first or last character matches condition stated above
  var finalname = " " + myname + " "; // add spaces
  var finalsub = subtitle.replace(myname, finalname); // Replace name in subtitle
  var spacing = true;
}
else {
  var finalname = myname; // if condition stated above is not matched, do nothing
}
var finalname_eng = " " + myname; // Add spaces for name in english, regardless of conditions
if (typeof usage === "undefined" || usage === null || usage === "" || usage !== "payment" && usage !== "donate") { // If usage is not defined or illegal, default to payment
  var usage = "payment";
  console.log("%c The usage variable is not defined correctly", "color: red");
}
if (typeof branding === "undefined" || branding === null || branding === "" || branding !== true && branding !== "true") {
  var aftertitle = ""
}
else if (branding === true || branding === "true") {
  var aftertitle = " | Merger"
}
// Add multilingual suppport
if (multilingual === false) {
  var finaltitle = title;
  // var finalsub = subtitle;
  var wechatscan = "微信扫一扫 向" + finalname + "支付";
  var alipayscan = "支付宝扫一扫 向" + finalname + "支付";
  var payto = "";
  var presshold = "长按识别二维码 向" + finalname + "支付";
  var notavail = "🚫 目前没有可用的支付方式"
  var myname_hant = myname;
  var myname_hans = myname;
  var myname_eng = myname;
}
else {
  if (/zh-CN|zh-cn|zh-Hans|zh-hans|cn/i.test(userLang)) {
    // detect browser langauge, simplified chinese only
    document.write("<style>body { font-family: -apple-system,BlinkMacSystemFont,Open Sans,Roboto,Oxygen,Cantarell,Fira Sans,Liberation Sans,Droid Sans,PingFang SC,HarmonyOS Sans SC,MiSans,Hiragino Sans GB,WenQuanYi Micro Hei,Noto Sans CJK SC,Noto Sans SC,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;}</style>");
    if (usage === "payment") {
      var method = "付款";
    }
    if (usage === "donate") {
      var method = "捐赠";
    }
    document.title = '向' + finalname + method + aftertitle;
    var trans_wx = "微信"
    var trans_ali = "支付宝"
    var finaltitle = "向" + finalname + method;
    var finalsub = "从下方选择" + method + "方式";
    var trans_wx = "微信";
    var scan = "扫一扫";
    var presshold = "长按识别二维码";
    var payto = " 向" + finalname + method;
    var notavail = "🚫 目前没有可用的" + method + "方式"
    var wechatscan = trans_wx + scan;
    var alipayscan = trans_ali + scan;
  }
  else if (/zh-TW|zh-HK|zh-tw|zh-hk|zh-Hant|zh-hant|tw|hk/i.test(userLang)) {
    // detect browser langauge, traditional chinese only
    document.write("<style>body { font-family: -apple-system, BlinkMacSystemFont, 'PingFang TC', 'Hiragino Sans CNS', 'Microsoft JhengHei', 'Helvetica Neue', sans-serif; }</style>");
    if (usage === "payment") {
      var method = "付款";
    }
    if (usage === "donate") {
      var method = "捐贈";
    }
    document.title = '向' + finalname + method + aftertitle;
    var trans_wx = "WeChat "
    var trans_ali = "支付寶"
    var finaltitle = "向" + finalname + method;
    var finalsub = "從下方選擇" + method + "方式";
    var scan = "掃一掃";
    var notavail = "🚫 目前沒有可用的" + method + "方式";
    var wechatscan = trans_wx + scan;
    var alipayscan = trans_ali + scan;
    var presshold = "長按識別二維碼";
    var payto = " 向" + finalname + method;
  }
  else {
    // detect browser langauge, for non-Chinese users will display english
    if (usage === "payment") {
      var method = "Pay";
      var method_t = "Payment"
    }
    if (usage === "donate") {
      var method = "Donate";
      var method_t = "Donation"
    }
    var method_lc = method.charAt(0).toLowerCase();
    document.title = method + ' to' + finalname_eng + aftertitle;
    document.write("<style>body { font-family: sans-serif; }</style>"); // Oh I f**king love Segoe UI
    var trans_wx = "WeChat"
    var trans_ali = "AliPay"
    var finaltitle = method + " to" + finalname_eng;
    var finalsub = "Select a " + method_t.replace(method_t.charAt(0), method_t.charAt(0).toLowerCase()) + " method from below";
    var scanhint = "Scan the QR Code to " + method + finalname_eng;
    var presshold = method.replace(method.charAt(5), "") + method.charAt(5).replace("e", "") + "ing to" + finalname_eng + ":<br><span style='font-weight:400'>Press and hold to recognise the QR Code</span>";
    var scan = "Scan the QR Code with ";
    var payto = "";
    var notavail = "🚫 Currently no " + method_t.replace(method_t.charAt(0), method_t.charAt(0).toLowerCase()) + " method available";
    var wechatscan = scan + trans_wx;
    var alipayscan = scan + trans_ali;
  }
}

// Remove payment methods if not set up
var error_num = 0;
if (typeof wechat === "undefined" || wechat === null || wechat === "") {
  document.getElementById("depends").removeChild(document.getElementById("toclick"));
  error_num += 1;
  var nowechat = true;
}
if (typeof alipay === "undefined" || alipay === null || alipay === "") {
  document.getElementById("depends").removeChild(document.getElementById("alipaybtn"));
  error_num += 1;
  var noalipay = true;
}
if (typeof paypal === "undefined" || paypal === null || paypal === "") {
  document.getElementById("depends").removeChild(document.getElementById("paypalbtn"));
  error_num += 1;
}
else {
  function openbox() {
    selected = "yes";
    function openpaypal(url, w, h) { // code from https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen?answertab=votes#tab-top
      var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var systemZoom = width / window.screen.availWidth;
      var left = (width - w) / 2 / systemZoom + dualScreenLeft
      var top = (height - h) / 2 / systemZoom + dualScreenTop
      var newWindow = window.open(url, "_blank", 'width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
      if (window.focus) newWindow.focus();
    }
    if (window.innerHeight < window.innerWidth) {
      openpaypal(paypal, window.innerWidth * 0.25, window.innerHeight * 0.9);
    }
    else {
      openpaypal(paypal, window.innerWidth * 0.5, window.innerHeight * 0.9);
    }
  }
}

// General UserAgent verify rules
if (navigator.userAgent.includes('Alipay')) {
  if (noalipay === true) {
    alert("AliPay is not set up by the admin \n 管理员没有设置支付宝");
    if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  }
  else {
    // Redirect directly
    window.location.href = alipay;
    var finaltitle = "";
    var finalsub = "";
    removal();
  }
}
else if (navigator.userAgent.includes('MicroMessenger')) {
  if (nowechat === true) {
    alert("WeChat Pay is not set up by the admin \n 管理员没有设置微信支付");
    if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  }
  else {
    client = wechat;
    // Click the button, import from js
    document.getElementById("toclick").click();
    document.getElementById("titleinfo").innerHTML = presshold + payto;

    var finaltitle = "";
    var finalsub = "";
    removal();
    console.log("%c WeChat Pay Detected ", "color: green");
  }
}
else {
  if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  document.getElementById('qrcodeclose').onclick = function () {
    document.getElementById('currentqrcode').innerHTML = "";
    if (document.getElementById('showqrcode').style.display == "flex") document.getElementById('showqrcode').style.display = "";
  }
}
// UserAgent Verify Part Ends

if (error_num === 3) { // Show not available message to user if all four methods are not set up
  var finalsub = notavail;
  console.log("%c No Payment Method Available to Users ", "color: red");
}

// Onclick Function Part Starts         
function openwechat() {
  selected = "yes";
  document.getElementById("titleinfo").innerHTML = wechatscan + payto;
  client = wechat;
  showqrcode();
}
function openalipay() {
  selected = "yes";
  document.getElementById("titleinfo").innerHTML = alipayscan + payto;
  client = alipay;
  showqrcode();
}
function removal() {
  document.getElementById("h").removeChild(document.getElementById("i")); // remove profile photo
  document.getElementById("pending").removeChild(document.getElementById("depends")); // remove buttons
  document.getElementById("btncontainer").removeChild(document.getElementById("qrcodeclose")); //remove exit buttons
}
function urlencode(String) { // Code from MKBlog - http://lab.mkblog.cn/oneqrcode/
  return encodeURIComponent(String).replace(/'/g, "%27").replace(/"/g, "%22");
}
// Onclick Function Part Ends

// Fill in tile and subtitle
document.getElementById("name").innerHTML = finaltitle;
document.getElementById("description").innerHTML = finalsub;

// Copyright console log copied from https://github.com/MoePlayer/APlayer/. Thank you.
console.log(`${'\n'} %c Merger 0.28.6 %c https://github.com/qr-merger/merger ${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

function showqrcode() {
  if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && selected == "yes") document.getElementById('showqrcode').style.display = "flex";
  if (document.getElementById("currentqrcode").innerHTML.includes("img")) {
    document.getElementById('currentqrcode').getElementsByTagName("img")[0].setAttribute("id", "todel");
    document.getElementById("currentqrcode").removeChild(document.getElementById("todel"));
    // console.log("removed");
  }
  $("#currentqrcode").qrcode({
    render: "image",
    size: 300 * scale,
    text: client
  });
}

if (typeof tracking !== 'undefined' && tracking === true) {
    (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "hkeg670rpp");
}