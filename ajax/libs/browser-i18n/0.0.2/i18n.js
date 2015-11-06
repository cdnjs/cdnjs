var I18n = function(options){
    for (var prop in options) {
        this[prop] = options[prop];
    };

    this.setLocale(this.locale);
};

I18n.localeCache = {};

I18n.prototype = {
    defaultLocale: "en",
    directory: "/locales",
    extension: ".min.json",

    getLocale: function(){
        return this.locale;
    },

    setLocale: function(locale){
        if(!locale)
            locale = $("html").attr("lang");

        if(!locale)
            locale = this.defaultLocale;

        this.locale = locale;

        if(locale in I18n.localeCache) return;
        else this.getLocaleFileFromServer();
    },

    getLocaleFileFromServer: function(){
        localeFile = null;

        $.ajax({
            url: this.directory + "/" + this.locale + this.extension,
            async: false,
            success: function(data){
                localeFile = data;
            }
        });

        I18n.localeCache[this.locale] = localeFile;
    },

    __: function(){
        var msg = I18n.localeCache[this.locale][arguments[0]];

        if (arguments.length > 1)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 1));

        return msg;
    },

    __n: function(singular, count){
        var msg = I18n.localeCache[this.locale][singular];

        count = parseInt(count, 10);
        if(count === 0)
            msg = msg.zero;
        else
            msg = count > 1 ? msg.other : msg.one;

        msg = vsprintf(msg, [count]);

        if (arguments.length > 2)
            msg = vsprintf(msg, Array.prototype.slice.call(arguments, 2));

        return msg;
    }
};
