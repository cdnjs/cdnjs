/*! svg4everybody v1.0.0 | github.com/jonathantneal/svg4everybody */
(function (document, uses, requestAnimationFrame, CACHE, LTEIE8, IE9TO11) {
	function embed(svg, g) {
		if (g) {
			var
			viewBox = g.getAttribute('viewBox'),
			fragment = document.createDocumentFragment(),
			clone = g.cloneNode(true);

			if (viewBox) {
				svg.setAttribute('viewBox', viewBox);
			}

			while (clone.childNodes.length) {
				fragment.appendChild(clone.childNodes[0]);
			}

			svg.appendChild(fragment);
		}
	}

	function onload() {
		var xhr = this, x = document.createElement('x'), s = xhr.s;

		x.innerHTML = xhr.responseText;

		xhr.onload = function () {
			s.splice(0).map(function (array) {
				embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
			});
		};

		xhr.onload();
	}

	function onframe() {
		var use;

		while ((use = uses[0])) {
			if (LTEIE8) {
				var
				img = new Image();

				img.src = use.getAttribute('xlink:href').replace('#', '.').replace(/^\./, '') + '.png';

				use.parentNode.replaceChild(img, use);
			} else {
				var
				svg = use.parentNode,
				url = use.getAttribute('xlink:href').split('#'),
				url_root = url[0],
				url_hash = url[1];

				svg.removeChild(use);

				if (url_root.length) {
					var xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

					if (!xhr.s) {
						xhr.s = [];

						xhr.open('GET', url_root);

						xhr.onload = onload;

						xhr.send();
					}

					xhr.s.push([svg, url_hash]);

					if (xhr.readyState === 4) {
						xhr.onload();
					}

				} else {
					embed(svg, document.getElementById(url_hash));
				}
			}
		}

		requestAnimationFrame(onframe);
	}

	if (LTEIE8 || IE9TO11) {
		onframe();
	}
})(
	document,
	document.getElementsByTagName('use'),
	window.requestAnimationFrame || window.setTimeout,
	{},
	/MSIE\s[1-8]\b/.test(navigator.userAgent),
	/Trident\/[567]\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537,
	document.createElement('svg'),
	document.createElement('use')
);
