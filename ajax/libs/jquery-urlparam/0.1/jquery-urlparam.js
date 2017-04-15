// jquery-urlparam
// version 0.1
// https://github.com/huochunpeng/jquery-urlparam

(function($, document) {
	if (! $.urlparam) {
		$.urlparam = function(key) {
			var str = document.location.search;
			if (!str) {
				return;
			} else {
				str = str.slice(1);
				if (!str) { return;}
				
				var pairs = str.split(/&|;/);
				var params = {};
				for (var i = 0, cnt = pairs.length; i < cnt; i++) {
					var p = pairs[i].split('=');
					var pKey = decodeURIComponent(p[0]);
					var pValue = p[1]?decodeURIComponent(p[1]):'';
					if (params.hasOwnProperty(pKey)) {
						var ex = params[pKey];
						if ($.isArray(ex)) {
							ex.push(pValue);
						} else {
							params[pKey] = [ex, pValue];
						}
					} else {
						params[pKey] = pValue;
					}
				}
				if (key === undefined) {
					return params;
				} else {
					return params[key];
				}
			}
		};
	}
})(jQuery, document);
