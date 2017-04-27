/* init.js by @jzn99 */
var Init = function(urls, styles) {
	if (!urls === null||!urls === false) {
		for (var i = 0; i < urls.length; i++) {
			this.urls.push(urls[i]);
		}
	}
	if (!styles === null||!styles === false) {
		for (var i = 0; i < styles.length; i++) {
			this.styles.push(styles[i]);
		}
	}
	this.bootstrap();
	if (!styles === null||!styles === false) {
		this.css();
	}
	if (!urls === null||!urls === false) {
		this.js();
	}
};

Init.prototype = {
	urls : [],
	styles : [],
	use : null,
	klass : 'injct',
	bootstrap : function () {
		var script, orig = document.getElementsByTagName('script'), use;
		for (var i = 0; i < orig.length; i++) {
			var src = orig[i].getAttribute('src');
			var reg = new RegExp("(init\.js)$");
			if (reg.test(src)) {
				use = orig[i];
				orig[i].setAttribute('class', 'injctd pre');
				orig[i].setAttribute('id', 'injctd-pre');
			}
		}
		this.use = use;
	},
	css : function (add) {
		if (!add === null||!add === false) {
			for (var i = 0; i < add.length; i++) {
				this.styles.push(add[i]);
			}
		}
		var insrt;
		for (var i = 0; i < this.styles.length; i++) {
			insrt = document.createElement('link');
			insrt.setAttribute('type', 'text/css');
			insrt.setAttribute('rel', 'stylesheet');
			insrt.setAttribute('media', 'all');
			insrt.setAttribute('class', this.klass);
			insrt.setAttribute('href', this.styles[i]);
			this.use.parentNode.insertBefore(insrt, this.use);
		}
	},
	js : function (add) {
		if (!add === null||!add === false) {
			for (var i = 0; i < add.length; i++) {
				this.urls.push(add[i]);
			}
		}
		var script;
		for (var i = 0; i < this.urls.length; i++) {
			script = document.createElement('script');
			script.setAttribute('class', this.klass);
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', this.urls[i]);
			this.use.parentNode.insertBefore(script, this.use.nextSibling);
		}
	}
};