/*
 * jquery.urlive.js v1.0.4, jQuery URLive
 *
 * Copyright 2014 Mark Serbol.   
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/MIT.
 *
 * jQuery URLive lets you easily create a live preview of any url base on its Open Graph properties 
 * and other details, similar to Facebook's post attachment.
 *
 * https://github.com/markserbol/urlive
 *
 */

;(function($){
	var defaults = {
		container: '.urlive-container',
		target: '_blank',
		imageSize: 'auto',
		render: true,
		disableClick: false,
		callbacks: {
			onStart: function() {},
			onSuccess: function() {},
			onFail: function() {},
			noData: function() {},
			onLoadEnd: function() {},
			imgError: function() {},
			onClick: function() {}
		}
	},
	
	xajax = (function(ajax){		
		var exRegex = RegExp(location.protocol + '//' + location.hostname),
			yql_base_uri = 'http'+(/^https/.test(location.protocol)?'s':'') + 
			               '://query.yahooapis.com/v1/public/yql?callback=?',
			yql_query = 'select * from html where url="{URL}" and xpath="*" and compat="html5"';
		
		return function(o) {		
			var url = o.url;		
			if (/get/i.test(o.type) && !/json/i.test(o.dataType) && !exRegex.test(url) && /:\/\//.test(url)){			
				o.url = yql_base_uri;
				o.dataType = 'json';			
				o.data = {
					q: yql_query.replace(
						'{URL}',
						url + (o.data ? (/\?/.test(url) ? '&' : '?') + $.param(o.data) : '')
					),
					format: 'xml'
				};

				if (!o.success && o.complete) {
					o.success = o.complete;
					delete o.complete;
				}
				
				o.success = (function(success){
					return function(data){						
						if(success){							
							success.call(this, {
								responseText: (data.results[0] || '').replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
							}, 'success');
						}
							
					};
				})(o.success);
					
			}		
			return ajax.apply(this, arguments);				
		};
		
	})($.ajax),	
	
	findUrlive = function(){
		var selector = $(this).data('urlive-container') || $(this);		
		return $(selector).find('.urlive-link');
	},
	
	methods = {
		init: function(options){
			var opts = $.extend(true, defaults, options);
			
			return this.each(function(){
				var el = $(this), url;
				
				el.data('urlive-container', opts.container);
								
				if(el.is('a')){
					url = el.attr('href');
					testUrl(url);
				}else{
					var text = el.val() || el.text();
					var regexp = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i;
					
					if(regexp.test(text)){
						url = regexp.exec(text)[0];	
						testUrl(url);											
					}
				}
				
				function testUrl(url){
					if(/\.(?:jpe?g|gif|png)/.test(url)){
						var ti = url.substr(url.lastIndexOf('/') + 1);
						draw({image:url, title:ti, url:url});
					}else{
						getData(url);
					}
				}
						
				function getData(url){
					xajax({
						url: url,
						type: 'GET',
						beforeSend: opts.callbacks.onStart				
					}).done(function(response) {					
						var data = response.results;
		
						if(!$.isEmptyObject(data)){
							data = data[0];
							
							html = $('<div/>',{html:data});
		
							get = function(prop){	
								return html.find('[property="' + prop + '"]').attr('content') 
												|| html.find('[name="' + prop + '"]').attr('content') 
												|| html.find(prop).html() || html.find(prop).attr('src');
							}
											
							set = {
								image: get('og:image') || get('img'), 
								title: get('og:title') || get('title'),
								url: get('og:url') || url, 
								description: get('og:description'),	
								type: get('og:type'),				
								sitename: get('og:site_name')
							}
							
							opts.callbacks.onSuccess(set);
							
							if(opts.render){
								draw(set);
							}
												
						}else{
							opts.callbacks.noData();
						}
								
					}).fail(function (jqXHR, textStatus, errorThrown) {
						$.error('YQL request error: ', textStatus, errorThrown);
						opts.callbacks.onFail();
					});			
				}
				
				function draw(set){
					
					anchor = $('<a/>',{ 'class':'urlive-link', href: set.url, target: opts.target});
					imgWrapper = $('<div/>',{ 'class':'urlive-img-wrapper'});
					textWrapper = $('<div/>',{'class':'urlive-text-wrapper'});
															
					$.each(set, function(key, val){			
						if(val){
							if(key == 'image'){
								img = $('<img/>', {src: val});
								
								img.error(opts.callbacks.imgError);		
														
								img.appendTo(imgWrapper);
								
								img.hide().load(function() {
									var imgW = $(this).width(), 
									anchor = $(this).closest('.urlive-link');							
								
									$(this).addClass('urlive-'+key).show();
									
									if(opts.imageSize == 'auto'){
										
										if(imgW >= anchor.width()){																	
											anchor.addClass('urlive-img-large');	 			
										}else{
											anchor.addClass('urlive-img-small'); 										
										}
									}else if(opts.imageSize == 'large'){
										anchor.addClass('urlive-img-large');
									}else if(opts.imageSize == 'small'){
										anchor.addClass('urlive-img-small');								
									}
									
									opts.callbacks.onLoadEnd();
								});
								
							}else{
								elem = $('<span/>', {'class':'urlive-'+key, text: val});								
								elem.appendTo(textWrapper);
							}	
						}
					});
								
					anchor.append(imgWrapper, textWrapper).appendTo(el.data('urlive-container'));

					anchor.on('click', opts.callbacks.onClick);
					
					if(opts.disableClick){
						anchor.on('click', function(e){
							e.preventDefault();
						});
					}
					
				}
				
			});
		},
		
		close: function(duration){
			var urlive = findUrlive.apply(this);
			
			urlive.fadeOut(duration);	
		},
		
		remove: function(duration){
			var urlive = findUrlive.apply(this);
			
			if(duration){
				urlive.fadeOut(duration, function(){
					urlive.remove();
				});	
			}else{
				urlive.remove();
			}
		},
				
		open: function(duration){
			var urlive = findUrlive.apply(this);
			
			urlive.fadeIn(duration);	
		},
		
		disable: function(){
			var urlive = findUrlive.apply(this);
			
			urlive.on('click',function(e) {
        e.preventDefault();
      });	
		},
		
		enable: function(){
			var urlive = findUrlive.apply(this);
			
			urlive.off('click');	
		}
		
	};
	
	$.fn.urlive = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method === 'object' || !method){
			return methods.init.apply(this, arguments);
		}else{
			$.error('Method "' + method + '" does not exist on jquery.urlive');
		}
	}
	
})(jQuery);