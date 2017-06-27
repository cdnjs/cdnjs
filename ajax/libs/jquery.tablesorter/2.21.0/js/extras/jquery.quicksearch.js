/* jQuery Quicksearch plugin
 by riklomas https://github.com/riklomas/quicksearch
 Modified to include childRows (for tablesorter)

 See http://stackoverflow.com/q/20342203/145346 for
 more details
*/
(function($, window, document, undefined) {
	$.fn.quicksearch = function (target, opt) {

		var timeout, cache, rowcache, jq_results, val = '', e = this, options = $.extend({
			delay: 100,
			selector: null,
			stripeRows: null,
			loader: null,
			noResults: '',
			childRow: 'tablesorter-childRow', // include child row with search results
			matchedResultsCount: 0,
			bind: 'keyup',
			onBefore: function () {
				return;
			},
			onAfter: function () {
				return;
			},
			show: function () {
				this.style.display = "";
			},
			hide: function () {
				this.style.display = "none";
			},
			prepareQuery: function (val) {
				return val.toLowerCase().split(' ');
			},
			testQuery: function (query, txt) {
				for (var i = 0; i < query.length; i += 1) {
					if (txt.indexOf(query[i]) === -1) {
						return false;
					}
				}
				return true;
			}
		}, opt);

		this.go = function () {

			var len, i = 0,
			numMatchedRows = 0,
			noresults = true,
			query = options.prepareQuery(val),
			val_empty = (val.replace(' ', '').length === 0);

			for (i = 0, len = rowcache.length; i < len; i++) {
				if (val_empty || options.testQuery(query, cache[i], rowcache[i]) ||
					($(rowcache[i]).hasClass(options.childRow) && $(rowcache[i > 1 ? i - 1 : 0]).is(':visible'))) {
					options.show.apply(rowcache[i]);
					noresults = false;
					numMatchedRows++;
				} else {
					options.hide.apply(rowcache[i]);
				}
			}

			if (noresults) {
				this.results(false);
			} else {
				this.results(true);
				this.stripe();
			}

			this.matchedResultsCount = numMatchedRows;
			this.loader(false);
			options.onAfter();

			return this;
		};

		/*
		* External API so that users can perform search programatically.
		* */
		this.search = function (submittedVal) {
			val = submittedVal;
			e.trigger();
		};

		/*
		* External API to get the number of matched results as seen in
		* https://github.com/ruiz107/quicksearch/commit/f78dc440b42d95ce9caed1d087174dd4359982d6
		* */
		this.currentMatchedResults = function() {
			return this.matchedResultsCount;
		};

		this.stripe = function () {

			if (typeof options.stripeRows === "object" && options.stripeRows !== null)
			{
				var joined = options.stripeRows.join(' ');
				var stripeRows_length = options.stripeRows.length;

				jq_results.not(':hidden').each(function (i) {
					$(this).removeClass(joined).addClass(options.stripeRows[i % stripeRows_length]);
				});
			}

			return this;
		};

		this.strip_html = function (input) {
			var output = input.replace(new RegExp('<[^<]+\>', 'g'), "");
			output = $.trim(output.toLowerCase());
			return output;
		};

		this.results = function (bool) {
			if (typeof options.noResults === "string" && options.noResults !== "") {
				if (bool) {
					$(options.noResults).hide();
				} else {
					$(options.noResults).show();
				}
			}
			return this;
		};

		this.loader = function (bool) {
			if (typeof options.loader === "string" && options.loader !== "") {
				if (bool) {
					$(options.loader).show();
				} else {
					$(options.loader).hide();
				}
			}
			return this;
		};

		this.cache = function () {

			jq_results = $(target);

			if (typeof options.noResults === "string" && options.noResults !== "") {
				jq_results = jq_results.not(options.noResults);
			}

			var t = (typeof options.selector === "string") ?
				jq_results.find(options.selector) : $(target).not(options.noResults);
			cache = t.map(function () {
				return e.strip_html(this.innerHTML);
			});

			rowcache = jq_results.map(function () {
				return this;
			});

			/*
			* Modified fix for sync-ing "val".
			* Original fix https://github.com/michaellwest/quicksearch/commit/4ace4008d079298a01f97f885ba8fa956a9703d1
			* */
			val = val || this.val() || "";

			return this.go();
		};

		this.trigger = function () {
			this.loader(true);
			options.onBefore();

			window.clearTimeout(timeout);
			timeout = window.setTimeout(function () {
				e.go();
			}, options.delay);

			return this;
		};

		this.cache();
		this.results(true);
		this.stripe();
		this.loader(false);

		return this.each(function () {

			/*
			* Changed from .bind to .on.
			* */
			$(this).on(options.bind, function () {

				val = $(this).val();
				e.trigger();
			});
		});

	};

}(jQuery, this, document));
