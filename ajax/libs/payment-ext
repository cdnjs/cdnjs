$(document).ready(function(){
  $.getScript("http://192.168.1.120:8089/FhtPaymentD/js/swfobject-2.2.min.js",function(){
	  $.getScript("http://192.168.1.120:8089/FhtPaymentD/js/myjs.js",function(){
		  $.getScript("http://192.168.1.120:8089/FhtPaymentD/js/evercookie.js",function(){
			  var police1 = new EtcPolice();
			  var police2 = new EtcPolice('vas');
			  var police3 = new EtcPolice('vex');
			  var police4 = new EtcPolice('res');
			 
			  var ec = new evercookie({
				  history:false,
				  phpuri:'',
				  baseurl:'http://192.168.1.120:8089/FhtPaymentD',
				  pngPath:'/cachemanage/pngPath',
				  etagPath:'/cachemanage/etagPath',
				  cachePath:'/cachemanage/cachePath',
				  asseturi:'/assets'
			  });
			  ec.get("UID", function(best_candidate, all_candidates){
				  if("undefined" == best_candidate || undefined == best_candidate || ""==best_candidate){
					  var val = police1.get()+"|"+police2.get()+"|"+police3.get()+"|"+police4.get();
					  ec.set("UID",val);
					  best_candidate = val;
				  }
				  $("#cookies").val(best_candidate);
				  $.data(document.body, 'UID', best_candidate);
				  var values = "";
				  for (var item in all_candidates){
					  values += ("&"+item +"=" +all_candidates[item]);
				  }
				  $.ajax({
					   type: "POST",
					   url: "http://192.168.1.120:8089/FhtPaymentD/cachemanage/getUID",
					   dataType : "jsonp",
					   data: "uid="+best_candidate+'&referrer='+document.referrer+values+"&police1="+police1.get()+"&police2="+police2.get()+"&police3="+police3.get()+"&police4="+police4.get()+"&os="+getOSAndBrowser()+'&version=1.0',
					   jsonpCallback:'jsonpProcess',
					   success: function(msg){
						   if(msg.id != '' || msg.id != 0){
								ec.set("orderId",msg.id);
						   }
					   },
					   error:function(o){
						   
					   }
				  });
			  });
		  });
	  });
    });
});

function jsonpProcess(o){
	
}

function getUID(){
	return $.data(document.body, 'UID');
}

var getOSAndBrowser = function() {
	var os = navigator.platform;
	var userAgent = navigator.userAgent;
	var info = "";
	var tempArray = "";
	if (os.indexOf("Win") > -1) {
		if (userAgent.indexOf("Windows NT 5.0") > -1) {
			info += "Win2000";
		} else if (userAgent.indexOf("Windows NT 5.1") > -1) {
			info += "WinXP";
		} else if (userAgent.indexOf("Windows NT 5.2") > -1) {
			info += "Win2003";
		} else if (userAgent.indexOf("Windows NT 6.0") > -1) {
			info += "WindowsVista";
		} else if (userAgent.indexOf("Windows NT 6.1") > -1
				|| userAgent.indexOf("Windows 7") > -1) {
			info += "Win7";
		} else if (userAgent.indexOf("Windows 8") > -1) {
			info += "Win8";
		} else {
			info += "Other";
		}
	} else if (os.indexOf("Mac") > -1) {
		info += "Mac";
	} else if (os.indexOf("X11") > -1) {
		info += "Unix";
	} else if (os.indexOf("Linux") > -1) {
		info += "Linux";
	} else {
		info += "Other";
	}
	info += "/";
	if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
		tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
		info += tempArray[1] + tempArray[2];
	} else if (/MSIE \d+\.\d+/.test(userAgent)) {
		tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
		info += tempArray[1] + tempArray[2];
	} else if (/[Cc]hrome\/\d+/.test(userAgent)) {
		tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
		info += tempArray[1] + tempArray[2];
	} else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
		tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/
				.exec(userAgent);
		info += tempArray[3] + tempArray[1];
	} else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
		tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
		info += tempArray[1] + tempArray[2];
	} else {
		info += "unknown";
	}
	return info;
};

