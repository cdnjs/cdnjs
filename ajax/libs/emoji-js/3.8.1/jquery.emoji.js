// A very simple jQuery wrapper for js-emoji
$.fn.emoji = function(){
	var emoji = new EmojiConvertor();
	return this.each(function(){
		$(this).html(function (i, oldHtml){
			return emoji.replace_colons(oldHtml);
		});
	});
};
