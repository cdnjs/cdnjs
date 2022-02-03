/* FeedEk jQuery RSS/ATOM Feed Plugin v3.2.0
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk 
* Author : Engin KIZIL */
(function ($) {
	$.fn.FeedEk = function (options) {
		var def = $.extend({
			MaxCount: 5,
			ShowDesc: true,
			ShowPubDate: true,
			DescCharacterLimit: 0,
			TitleLinkTarget: "_blank",
			DateFormat: "",
			DateFormatLang: "en",
			Offset: 0,
			ShowAuthor: false,
			AuthorLabel: "Author:",
			Success: function () { },
			Error: function () { }
		}, options);
		var divFeed = this;
		var init = function () {
			if (def.FeedUrl == undefined) return;
			if ($.isArray(def.FeedUrl)) {
				def.FeedUrl = def.FeedUrl.map(t => encodeURIComponent(t)).join(",,,");
			}
			else {
				def.FeedUrl = encodeURIComponent(def.FeedUrl);
			}
			getFeedData();
		}
		var getFeedData = function () {
			divFeed.empty();
			divFeed.append('<img src="loader.gif" />');
			$.ajax({
				url: "https://feed.jquery-plugins.net/load?url=" + def.FeedUrl + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat + "&offset=" + def.Offset,
				dataType: "json",
				success: function (result) {
					divFeed.empty();
					if (result.data == null) return;
					divFeed.append(generateHtml(result.data));
					def.Success(result.data);
				},
				error: function (error) {
					def.Error(error);
				}
			});
		}
		var generateHtml = function (data) {
			var s = "";
			$.each(data, function (e, itm) {
				s += '<li><div class="itemTitle"><a href="' + itm.link + '" target="' + def.TitleLinkTarget + '" >' + itm.title + '</a></div>';

				if (def.ShowPubDate) {
					s += '<div class="itemDate">';
					if ($.trim(def.DateFormat).length > 0) {
						s += itm.publishDateFormatted;
					}
					else {
						s += new Date(itm.publishDate).toLocaleDateString();
					}
					s += '</div>';
				}
				if (def.ShowDesc) {
					s += '<div class="itemContent">' + getDescription(itm.description) + '</div>';
				}
				if (def.ShowAuthor) {
					s += '<div class="itemAuthor">' + def.AuthorLabel + ' ' + itm.author + '</div>';
				}
				s += '</li>';
			});
			return '<ul class="feedEkList">' + s + '</ul>';
		}
		var getDescription = function (desc) {
			if (def.DescCharacterLimit > 0 && desc.length > def.DescCharacterLimit) {
				desc = desc.substring(0, def.DescCharacterLimit) + '...';
			}
			return desc;
		}
		init();
	}
})(jQuery);