/*!

Name: Instagram Lite
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: January 14, 2014
Licensed under the MIT license

*/

;(function($) {

	$.fn.instagramLite = function(options) {

		// return if no element was bound
		// so chained events can continue
		if(!this.length) {
			return this;
		}

		// define plugin
		const plugin = this;

		// define default parameters
		plugin.defaults = {
			accessToken: null,
			user_id: 'self',
			limit: null,
			list: true,
			videos: false,
			urls: false,
			captions: false,
			date: false,
			likes: false,
			comments_count: false,
			error: function() {},
			success: function() {}
		}

		// vars
		const s = $.extend({}, plugin.defaults, options);
		const el = $(this);

		const formatCaption = function(caption) {

			let words = caption.split(' ');
			let newCaption = '';

			for(let i = 0; i < words.length; i++) {

				let word;
				let a;

				if(words[i][0] == '@') {
					a = '<a href="http://instagram.com/'+words[i].replace('@', '').toLowerCase()+'" target="_blank">'+words[i]+'</a>';
					word = a;
				} else if(words[i][0] == '#') {
					a = '<a href="http://instagram.com/explore/tags/'+words[i].replace('#', '').toLowerCase()+'" target="_blank">'+words[i]+'</a>';
					word = a;
				} else {
					word = words[i]
				}

				newCaption += word + ' ';
			}

			return newCaption;
		};

		const constructMedia = function(data) {

			// for each piece of media returned
			for(let i = 0; i < data.length; i++) {

				// define media namespace
				const thisMedia = data[i];

				let item;

				// if media type is image or videos is set to false
				if(thisMedia.type === 'image' || thisMedia.type === 'carousel' || !s.videos) {

					// construct image
					item = `<img class="il-photo__img" src="${thisMedia.images.standard_resolution.url}" alt="Instagram Image" data-filter="${thisMedia.filte}" />`;

					// if url setting is true
					if(s.urls) {
						item = `<a href="${thisMedia.link}" target="_blank">${item}</a>`;
					}

					if(s.captions || s.date || s.likes || s.comments_count) {
						item += '<div class="il-photo__meta">';
					}

					// if caption setting is true
					if(s.captions && thisMedia.caption) {
						item += `<div class="il-photo__caption" data-caption-id="${thisMedia.caption.id}">${formatCaption(thisMedia.caption.text)}</div>`;
					}

					// if date setting is true
					if(s.date) {

						let date = new Date(thisMedia.created_time * 1000);

						const day = date.getDate();
						const month = date.getMonth() + 1;
						const year = date.getFullYear();
						const hours = date.getHours();
						const minutes = date.getMinutes();
						const seconds = date.getSeconds();

						date = `${month}/${day}/${year}`;

						item += `<div class="il-photo__date">${date}</div>`;
					}

					// if likes setting is true
					if(s.likes) {
						item += `<div class="il-photo__likes">${thisMedia.likes.count}</div>`;
					}

					// if caption setting is true
					if(s.comments_count && thisMedia.comments) {
						item += `<div class="il-photo__comments">${thisMedia.comments.count}</div>`;
					}

					if(s.captions || s.date || s.likes || s.comments_count) {
						item += '</div>';
					}
				}

				if(thisMedia.type === 'video' && s.videos) {

					if(thisMedia.videos) {

						let src;

						if(thisMedia.videos.standard_resolution) {
							src = thisMedia.videos.standard_resolution.url;
						} else if(thisMedia.videos.low_resolution) {
							src = thisMedia.videos.low_resolution.url;
						} else if(thisMedia.videos.low_bandwidth) {
							src = thisMedia.videos.low_bandwidth.url;
						}

						item = `<video poster="${thisMedia.images.standard_resolution.url}" controls>`;
						item += `<source src="${src}" type="video/mp4;"></source>`;
						item += `</video>`;
					}
				}

				// if list setting is true
				if(s.list && item) {

					// redefine item with wrapping list item
					item = `<li class="il-item" data-instagram-id="${thisMedia.id}>${item}</li>`;
				}

				// append image / video
				if(item !== '') {
					el.append(item);
				}
			}
		};

		const loadContent = function() {

			// if access token
			if(s.accessToken) {

				// construct API endpoint
				let url = `https://api.instagram.com/v1/users/${s.user_id}/media/recent/?access_token=${s.accessToken}&count=${s.limit}`;

				$.ajax({
					type: 'GET',
					url: url,
					dataType: 'jsonp',
					success: function(data) {

						// if success status
						if(data.meta.code === 200 && data.data.length) {

							// construct media
							constructMedia(data.data);

							// execute success callback
							s.success.call(this, data);

						} else {
							// execute error callback
							s.error.call(this, data);
						}
					},
					error: function(data) {
						// execute error callback
						s.error.call(this, data);
					}
				});
			}
		};

		// init
		loadContent();
	}
})(jQuery);
