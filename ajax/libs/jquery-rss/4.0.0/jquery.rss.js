import RSS from "vanilla-rss";

(function($) {
  $.fn.rss = function(url, options = {}, callback) {
    const rss = new RSS(this, url, {
      ...options,
      fetchFeed: apiUrl => {
        return new Promise((resolve, reject) => {
          $.ajax({
            dataType: "json",
            url: apiUrl,
            success: resolve,
            error: reject
          });
        });
      }
    });

    rss.render().then(
      (...args) => {
        callback && callback(...args);
        options && options.success && options.success(...args);
      },
      (...args) => {
        options && options.error && options.error(...args);
      }
    );

    return this; // Implement chaining
  };
})(jQuery);
