/*
 *  @author Interactive agency «Central marketing» http://centralmarketing.ru
 *  @copyright Copyright (c) 2015, Interactive agency «Central marketing»	
 *  @license http://opensource.org/licenses/MIT The MIT License (MIT)
 *  @version 3.1.4 at 25/09/2015 (22:50)
 *  
 *  goodshare.js
 *  
 *  Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.
 *  Easy to install and configuring on any of your website!
 *  
 *  @category jQuery plugin
 */
;(function($, window, document, undefined) {
	$(document).ready(function() {
		goodshare = {
			init: function(_element, _options) {
				/*
				 *  Default options:
				 *  
				 *  type = vk
				 *  url = current browser adress stroke
				 *  title = current document <title>
				 *  text = current document <meta property="og:description" ... />
				 *  image = current document <meta property="og:image" ... />
				 */
				var self = goodshare, options = $.extend({
					type:	'vk',
					url:	location.href,
					title:	document.title,
					text:	$('meta[property="og:description"]').attr('content'),
					image:	$('meta[property="og:image"]').attr('content')
				}, $(_element).data(), _options);
				/*
				 *  Open popup
				 */
				if (self.popup(link = self[options.type](options)) !== null) return false;
			},
			/*
			 *  Share link > Vkontakte
			 *  @see http://vk.com
			 */
			vk: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:	'',
					image:	''
				}, _options);
				return 'http://vk.com/share.php?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&image='       + encodeURIComponent(options.image);
			},
			/*
			 *  Share link > Odnoklassniki
			 *  @see http://ok.ru
			 */
			ok: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
					+ '&st.comments=' + encodeURIComponent(options.title)
					+ '&st._surl='    + encodeURIComponent(options.url);
			},
			/*
			 *  Share link > Facebook
			 *  @see http://facebook.com
			 */
			fb: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://www.facebook.com/sharer.php?'
					+ 'u=' + encodeURIComponent(options.url);
			},
			/*
			 *  Share link > LiveJournal
			 *  @see http://livejournal.com
			 */
			lj: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				return 'http://livejournal.com/update.bml?'
					+ 'subject=' + encodeURIComponent(options.title)
					+ '&event='  + encodeURIComponent('<a href="' + options.url + '">' + options.title + '</a> ' + options.text);
			},
			/*
			 *  Share link > Twitter
			 *  @see http://twitter.com
			 */
			tw: function(_options) {
				var options = $.extend({
					url:	location.href,
					title:  document.title
				}, _options);
				return 'http://twitter.com/share?'
					+ 'url='   + encodeURIComponent(options.url)
					+ '&text=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Google Plus
			 *  @see http://plus.google.com
			 */
			gp: function(_options) {
				var options = $.extend({
					url:	location.href
				}, _options);
				return 'https://plus.google.com/share?'
					+ 'url=' + encodeURIComponent(options.url);
			},
			/*
			 *  Share link > My@Mail.Ru
			 *  @see http://my.mail.ru
			 */
			mr: function(_options) {
				var options = $.extend({
					url:	location.href,
					title:	document.title,
					image:	'',
					text:	''
				}, _options);
				return 'http://connect.mail.ru/share?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text)
					+ '&imageurl='    + encodeURIComponent(options.image);
			},
			/*
			 *  Share link > LinkedIn
			 *  @see http://linkedin.com
			 */
			li: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://www.linkedin.com/shareArticle?'
					+ 'url='        + encodeURIComponent(options.url)
					+ '&text='      + encodeURIComponent(options.title)
					+ '&mini=true';
			},
			/*
			 *  Share link > tumblr
			 *  @see http://tumblr.com
			 */
			tm: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				return 'http://www.tumblr.com/share/link?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&name='        + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text);
			},
			/*
			 *  Share link > Blogger
			 *  @see https://www.blogger.com
			 */
			bl: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'https://www.blogger.com/blog-this.g?'
					+ 'u='  + encodeURIComponent(options.url)
					+ '&n=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Pinterest
			 *  @see http://www.pinterest.com
			 */
			pt: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'https://www.pinterest.com/pin/create/button/?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&description=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Evernote
			 *  @see http://www.evernote.com
			 */
			en: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				return 'https://www.evernote.com/clip.action?'
					+ 'url='    + encodeURIComponent(options.url)
					+ '&title=' + encodeURIComponent(options.title)
					+ '&body='  + encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>');
			},
			/*
			 *  Share link > Digg
			 *  @see http://www.digg.com
			 */
			di: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://digg.com/submit?'
					+ 'url='    + encodeURIComponent(options.url)
					+ '&title=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Reddit
			 *  @see http://www.reddit.com
			 */
			rd: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://www.reddit.com/submit?'
					+ 'url='    + encodeURIComponent(options.url)
					+ '&title=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > StumbleUpon
			 *  @see http://www.stumbleupon.com
			 */
			su: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'http://www.stumbleupon.com/submit?'
					+ 'url='    + encodeURIComponent(options.url)
					+ '&title=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Pocket
			 *  @see https://getpocket.com
			 */
			po: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'https://getpocket.com/save?'
					+ 'url='    + encodeURIComponent(options.url)
					+ '&title=' + encodeURIComponent(options.title);
			},
			/*
			 *  Share link > Surfingbird
			 *  @see http://www.surfingbird.ru
			 */
			sb: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title,
					text:   ''
				}, _options);
				return 'http://surfingbird.ru/share?'
					+ 'url='          + encodeURIComponent(options.url)
					+ '&title='       + encodeURIComponent(options.title)
					+ '&description=' + encodeURIComponent(options.text);
			},
			/*
			 *  Share link > Buffer
			 *  @see http://buffer.com
			 */
			bf: function(_options) {
				var options = $.extend({
					url:    location.href,
					title:  document.title
				}, _options);
				return 'https://buffer.com/add?'
					+ 'url='   + encodeURIComponent(options.url)
					+ '&text=' + encodeURIComponent(options.title);
			},
			/*
			 *  Popup window
			 */		    
			popup: function(url) {
				return window.open(url, '', 'toolbar=0,status=0,scrollbars=0,width=630,height=440');
			}
		};
		/*
		 *  Function roundCount()
		 *  Return rounded and pretty value of share count.
		 *  
		 *  @example roundCount(response.shares) // Rounded value of Facebook counter.
		 */
		var roundCount = function(number) {
			if (number > 999 && number <= 999999) var result = number/1000 + 'k';
			else if (number > 999999) var result = '>1M';
			else var result = number;
			return result;
		};
		/*
		 *  Function existCount()
		 *  Check exist counter element.
		 *  
		 *  @example existCount('[data-counter="fb"]') // Checked exist Facebook counter element.
		 */
		var existCount = function(element) {
			return ($(element).length > 0);
		};
		/*
		 *  Share counter > Vkontakte
		 *  @see http://vk.com/dev
		 */
		if (existCount('[data-counter="vk"]')) {
			$.getJSON('https://vk.com/share.php?act=count&index=1&url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {});
			VK = {};
			VK.Share = {};
			VK.Share.count = function(index, count) {
				$('[data-counter="vk"]').text(roundCount(count));
			}
		};
		/*
		 *  Share counter > Facebook
		 *  @see https://developers.facebook.com
		 */
		if (existCount('[data-counter="fb"]')) {
			$.getJSON('http://graph.facebook.com/?id=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				if ($.type(response.shares) === 'undefined') $('[data-counter="fb"]').text('0');
				else $('[data-counter="fb"]').text(roundCount(response.shares));
			})
		};
		/*
		 *	Share counter > Odnoklassniki
		 *	@see https://apiok.ru
		 */
		if (existCount('[data-counter="ok"]')) {
			$.getJSON('https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=' + encodeURIComponent(location.href) + '&callback=?', function(response) {});
			ODKL = {};
			ODKL.updateCount = function(index, count) {
				$('[data-counter="ok"]').text(roundCount(count));
			}
		};
		/*
		 *  Share counter > Twitter
		 *  @see https://dev.twitter.com
		 */
		if (existCount('[data-counter="tw"]')) {
			$.getJSON('http://cdn.api.twitter.com/1/urls/count.json?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				$('[data-counter="tw"]').text(roundCount(response.count));
			})
		};
		/*
		 *  Share counter > Google Plus
		 *  @see https://developers.google.com/+/
		 */
		if (existCount('[data-counter="gp"]')) {
			$.ajax({
				type: 'POST',
				url: 'https://clients6.google.com/rpc',
				processData: true,
				contentType: 'application/json',
				data: JSON.stringify({
					'method': 'pos.plusones.get',
					'id': location.href,
					'params': {
						'nolog': true,
						'id': location.href,
						'source': 'widget',
						'userId': '@viewer',
						'groupId': '@self'
					},
					'jsonrpc': '2.0',
					'key': 'p',
					'apiVersion': 'v1'
				}),
				success: function(response) {
					$('[data-counter="gp"]').text(roundCount(response.result.metadata.globalCounts.count));
				}
			})
		};
		/*
		 *  Share counter > My@Mail.Ru
		 *  @see http://api.mail.ru
		 */
		if (existCount('[data-counter="mr"]')) {
			$.getJSON('http://connect.mail.ru/share_count?url_list=' + encodeURIComponent(location.href) + '&callback=1&func=?', function(response) {
				var url = encodeURIComponent(location.href);
				for (var url in response) {
					if (response.hasOwnProperty(url)) {
						var count = response[url].shares;
						break;
					}
				}
				if ($.isEmptyObject(response)) $('[data-counter="mr"]').text('0');
				else $('[data-counter="mr"]').text(roundCount(count));
			})
		};
		/*
		 *  Share counter > LinkedIn
		 *  @see https://developer.linkedin.com
		 */
		if (existCount('[data-counter="li"]')) {
			$.getJSON('http://www.linkedin.com/countserv/count/share?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				$('[data-counter="li"]').text(roundCount(response.count));
			})
		}
		/*
		 *  Share counter > tumblr
		 *  @see https://www.tumblr.com/developers
		 */
		if (existCount('[data-counter="tm"]')) {
			$.getJSON('http://api.tumblr.com/v2/share/stats?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				$('[data-counter="tm"]').text(roundCount(response.response.note_count));
			})
		};
		/*
		 *  Share counter > Pinterest
		 *  @see https://developers.pinterest.com
		 */
		if (existCount('[data-counter="pt"]')) {
			$.getJSON('http://api.pinterest.com/v1/urls/count.json?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				$('[data-counter="pt"]').text(roundCount(response.count));
			})
		};
		/*
		 *  Share counter > StumbleUpon
		 *  @see http://help.stumbleupon.com
		 */
		if (existCount('[data-counter="su"]')) {
			$.getJSON('http://query.yahooapis.com/v1/public/yql?q=' 
			+ encodeURIComponent('select * from html where url="http://www.stumbleupon.com/services/1.01/badge.getinfo?url=' + location.href + '" and xpath="*"') + '&format=json&callback=?', function(response) {
				var count = $.parseJSON(response.query.results.html.body);
				if (count.result.views === undefined) $('[data-counter="su"]').text('0');
				else $('[data-counter="su"]').text(roundCount(count.result.views));
			})
		};
		/*
		 *  Share counter > Pocket
		 *  @see https://widgets.getpocket.com/v1/button?count=horizontal&url=[URL_HERE]
		 */
		if (existCount('[data-counter="po"]')) {
			$.getJSON('http://query.yahooapis.com/v1/public/yql?q=' 
			+ encodeURIComponent('select * from html where url="https://widgets.getpocket.com/v1/button?count=horizontal&url=' + location.href + '" and xpath="*"') + '&format=json&callback=?', function(response) {
				$('[data-counter="po"]').text(roundCount(response.query.results.html.body.div.a.span.em.content));
			})
		};
		/*
		 *  Share counter > Buffer
		 *  @see https://buffer.com/developers
		 */
		if (existCount('[data-counter="bf"]')) {
			$.getJSON('https://api.bufferapp.com/1/links/shares.json?url=' + encodeURIComponent(location.href) + '&callback=?', function(response) {
				$('[data-counter="bf"]').text(roundCount(response.shares));
			})
		};
		/*
		 *  Init goodshare.js click
		 */
		$(document).on('click', '.goodshare', function(event) {
			event.preventDefault();
			goodshare.init(this);
		});
	});	
})(jQuery, window, document);
