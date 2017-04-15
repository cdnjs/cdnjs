(function(window) {
	var tictoc = window.tictoc = {};
	
	
	function createParams(msg, url, appid) {
		var params = [];
		
		if (!msg && !url) { return ""; }
				
		if (msg) {  params.push(["msg", encodeURIComponent(msg)].join("=")); 	}
		if (url) {  params.push(["url", encodeURIComponent(url)].join("=")); 	}
		if (appid) {  params.push(["appid", encodeURIComponent(appid)].join("=")); 	}

		return params.join("&");
		
	}
	
	function createTictocLink(msg, url, appid) {
		
		var params = createParams(msg, url, appid);
		
		if (params == "" || !params) {
			return "";
		}
		
		var tictoc_link = "tictoclink://sendurl?" + params;
		
		return tictoc_link;	
	}
	
	function createIntent(link) {
		
		return link.replace('tictoclink', 'intent') + "#Intent;scheme=tictoclink;package=kr.co.tictocplus;end";
	
	}
	
	tictoc.send = function(opt) {
		opt = opt || {};
		var startTime = +new Date;
		var dist = 2000;
		var ua = navigator.userAgent.toLowerCase();
		
		var isAndroid = /android/.test(ua);
		var isChrome = /chrome/.test(ua);
		
		var link = createTictocLink(opt.msg, opt.url, opt.appid);
		
		if (link == '') {
			alert('no send message');
			return false;
		}
		
		
		
		var iframe = document.createElement('iframe');
		iframe.style.visibility = 'hidden';
		
		document.body.appendChild(iframe);
		
		if (isAndroid && isChrome) {
			location.href = createIntent(link);
		} else {
			iframe.src = link;	
			
			setTimeout(function() {
				var lastTime = +new Date;
				if (lastTime - startTime < dist) {
					
					if (/iphone|ipad|ipod/.test(ua)) {
						location.href ="http://bridge.tictoc.net/?id=33";
					} else if (/android/.test(ua)){
						if (isChrome) {
							location.href ="http://bridge.tictoc.net/?id=39";	
						} else {
							location.href = "market://details?id=kr.co.tictocplus";	
						}
					} else {
						location.href = 'http://www.tictoc.net';
					}
				}
			}, 500);			
			
		}
		
		//alert(navigator.userAgent);
	};
	
})(window);
