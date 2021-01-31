/*
 * by zhangxinxu(.com) 2014-10-29
 * https://github.com/zhangxinxu/mobilebone
 * plugin for slide show
*/
if (window.Mobilebone && Mobilebone.support) {
	(function(window, document, undefined) {
		var pages = document.querySelectorAll("." + Mobilebone.classPage),
			length_page = pages.length;
			index_page = 0, 
			hash = location.hash.replace("#&", "");
		
		// add pageid if don't exist
		// and get the index of those pages	
		[].slice.call(pages).forEach(function(page, index) {
			if (!page.id) page.id = "page" + (index+1);
			
			if (hash != "" && hash != "#" && page.id == hash) {
				index_page = index;
			}
		});
		
		// get prev slide-page
		var prev = function() {
			var pageout = pages[index_page] || null, pagein = pages[index_page-1] || null;
			if (index_page > 0 && Mobilebone.transition(pagein, pageout, true) !== false) {
				// if there are no preventDefault, add page index
				index_page--;
			} else if (index_page == 0) {
				// first page, can't trigger inner animation by 'Mobilebone.preventdefault'
				// so we need excute code as below
				var eleins = pageout.querySelectorAll(".in");
				if (elein = eleins[eleins.length - 1]) {
					elein.style.display = elein.getAttribute("data-display") || "block";
					elein.classList.remove("in");
					elein.classList.add("out");
				}
			}
		}
		// get next slide-page
		, next = function() {
			var pageout = pages[index_page] || null, pagein = pages[index_page+1] || null;
			if (index_page < length_page - 1 && Mobilebone.transition(pagein, pageout) !== false) {
				index_page++;
			} else if (index_page == length_page - 1) {
				// last page, can't trigger inner animation by 'Mobilebone.preventdefault'
				// so we need excute code as below
				var eleout = pageout.querySelector(".out");
				if (eleout) {
					eleout.classList.remove("out");
					eleout.classList.add("in");
				}
			}
		};
		
		/*document.addEventListener("click", function(event) {
			var target = event.target;
			if (target.tagName.toLowerCase() == "a" || target.getParentElementByTag("a")) return;
			next();
		});*/
		
		document.addEventListener("keyup", function(event) {
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
		
		
		Mobilebone.preventdefault = function(pagein, pageout) {
			if (pageout == null) return;
			
			var isBack = Mobilebone.isBack(pagein, pageout);
			
			if (isBack == true) {
				var eleins = pageout.querySelectorAll(".in");
				if (elein = eleins[eleins.length - 1]) {
					elein.style.display = elein.getAttribute("data-display") || "block";
					elein.classList.remove("in");
					elein.classList.add("out");
					return true;
				}
			} else {
				var eleout = pageout.querySelector(".out");
				
				if (eleout) {
					eleout.classList.remove("out");
					eleout.classList.add("in");
					return true;
				}
			}
		};
		
		var eleContent = document.querySelector(".content");
		// 确定缩放比例
		var funGetScale = function() {
			var width = window.innerWidth, height = window.innerHeight;
			var sizeX = 1024; sizeY = 768, styleContent = {};
			if (eleContent) {
				styleContent = window.getComputedStyle(eleContent);
				sizeX = parseInt(styleContent.width);
				sizeY = parseInt(styleContent.height);
			}
			var scaleWidth = width / sizeX,
				scaleHeight = height / sizeY;
			return Math.min(scaleWidth, scaleHeight).toFixed(2);
		};
	
		var scale = funGetScale();
		
		var style = document.createElement("style");
		style.innerHTML = '.content{-webkit-transform:scale('+ scale +');transform:scale('+ scale +');}';
		document.querySelector("head").appendChild(style);
		
		window.addEventListener("resize", function() {
			scale = funGetScale();
			style.innerHTML = '.content{-webkit-transform:scale('+ scale +');transform:scale('+ scale +');}';	
		});
		
	})(window, document);
}