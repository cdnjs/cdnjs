if (window.Mobilebone && Mobilebone.support) {
	(function(window, document, undefined) {
		var pages = document.querySelectorAll("." + Mobilebone.classPage),
			length_page = pages.length;
			index_page = 0, 
			hash = location.hash.replace("#&", "");
			
		if (hash != "" && hash != "#") [].slice.call(pages).forEach(function(page, index) {
			if (page.id == hash) {
				index_page = index;
			}
		});
		
		var prev = function() {
			if (index_page > 0) {
				index_page--;
				Mobilebone.transition(pages[index_page], pages[index_page + 1], true);
			}
		}, next = function() {
			if (index_page < length_page - 1) {
				index_page++;
				Mobilebone.transition(pages[index_page], pages[index_page - 1]);
			}	
		};
		
		document.addEventListener("click", function(event) {
			var target = event.target;
			if (target.tagName.toLowerCase() == "a" || target.getParentElementByTag("a")) return;
			next();
		});
		
		document.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch (event.keyCode) {
				case 38: case 37: {
					prev();
					break;	
				}
				case 39: case 40: {
					next();
					break;	
				}
			}
		});
		
		document.addEventListener("mousewheel", function(event) {
			if (event.wheelDelta > 0) {
				prev();
			} else {
				next();
			}
		});
		document.addEventListener("DOMMouseScroll", function(event) {
			if (event.detail > 0) {
				next();
			} else {
				prev();
			}
		});
	})(window, document);
}