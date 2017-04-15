var rocket = {
	requestedResources : [],
	
	init : function () {
		while (rocket.requestedResources.length > 0) {
			var s = document.createElement("script"),
				x = document.getElementsByTagName("script")[0];
			
			s.type = "text/javascript";
			s.async = true;
			s.src = rocket.requestedResources.shift();
			
			x.parentNode.insertBefore(s, x);
		}
	},
	
	load : function (resource) {
		rocket.requestedResources.push(resource);
	}
};

if (window.addEventListener) {
	window.addEventListener("load", rocket.init, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", rocket.init);
}