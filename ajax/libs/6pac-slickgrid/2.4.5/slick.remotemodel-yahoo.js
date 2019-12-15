(function ($) {
  /***
   * A sample AJAX data store implementation.
   * Right now, it's hooked up to load Hackernews stories, but can
   * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
   */
  function RemoteModel() {
    // private
    var PAGESIZE = 10;
    var data = {length: 0};
    var h_request = null;
    var req = null; // ajax request

    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();


    function init() {
    }


    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] == undefined || data[i] == null) {
          return false;
        }
      }

      return true;
    }


    function clear() {
      for (var key in data) {
        delete data[key];
      }
      data.length = 0;
    }

    function ensureData(from, to) {
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++) {
          data[i * PAGESIZE] = undefined;
        }
      }

      if (from < 0) {
        from = 0;
      }

      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }

      var fromPage = Math.floor(from / PAGESIZE);
      var toPage = Math.floor(to / PAGESIZE);

      while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
        fromPage++;

      while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
        toPage--;

      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
        // TODO:  look-ahead
        onDataLoaded.notify({from: from, to: to});
        return;
      }

      var recStart = (fromPage * PAGESIZE);
      var recCount = (((toPage - fromPage) * PAGESIZE) + PAGESIZE);

      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss"
        + "(" + recStart + "%2C" + recCount + ")"
        + "%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22"
        + "&format=json";

      if (h_request != null) {
        clearTimeout(h_request);
      }

      h_request = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++)
          data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'

        onDataLoading.notify({from: from, to: to});

        req = $.jsonp({
          url: url,
          callbackParameter: "callback",
          cache: true,
          success: function (json, textStatus, xOptions) {
            onSuccess(json, recStart)
          },
          error: function () {
            onError(fromPage, toPage)
          }
        });

        req.fromPage = fromPage;
        req.toPage = toPage;
      }, 50);
    }


    function onError(fromPage, toPage) {
      alert("error loading pages " + fromPage + " to " + toPage);
    }

// SAMPLE DATA
//    {
//      "query": {
//        "count": 40,
//        "created": "2015-03-03T00:34:00Z",
//        "lang": "en-US",
//        "results": {
//          "item": [
//            {
//              "title": "Netanyahu assails Iran deal, touts US-Israel ties",
//              "description": "<p><a href=\"http://news.yahoo.com/netanyahu-us-officials-face-off-iran-133539021--politics.html\"><img src=\"http://l2.yimg.com/bt/api/res/1.2/4eoBxbJStrbGAKbmBYOJfg--/YXBwaWQ9eW5ld3M7Zmk9ZmlsbDtoPTg2O3E9NzU7dz0xMzA-/http://media.zenfs.com/en_us/News/ap_webfeeds/2f3a20c2d46d9f096f0f6a706700d430.jpg\" width=\"130\" height=\"86\" alt=\"Israeli Prime Minister Benjamin Netanyahu addresses the 2015 American Israel Public Affairs Committee (AIPAC) Policy Conference in Washington, Monday, March 2, 2015. (AP Photo/Cliff Owen)\" align=\"left\" title=\"Israeli Prime Minister Benjamin Netanyahu addresses the 2015 American Israel Public Affairs Committee (AIPAC) Policy Conference in Washington, Monday, March 2, 2015. (AP Photo/Cliff Owen)\" border=\"0\" /></a>WASHINGTON (AP) — Seeking to lower tensions, Benjamin Netanyahu and U.S. officials cast their dispute over Iran as a family squabble on Monday, even as the Israeli leader claimed President Barack Obama did not — and could not — fully understand his nation&#039;s vital security concerns.</p><br clear=\"all\"/>",
//              "link": "http://news.yahoo.com/netanyahu-us-officials-face-off-iran-133539021--politics.html",
//              "pubDate": "Mon, 02 Mar 2015 19:17:36 -0500",
//              "source": {
//                "url": "http://www.ap.org/",
//                "content": "Associated Press"
//              },
//              "guid": {
//                "isPermaLink": "false",
//                "content": "netanyahu-us-officials-face-off-iran-133539021--politics"
//              },
//              "content": {
//                "height": "86",
//                "type": "image/jpeg",
//                "url": "http://l2.yimg.com/bt/api/res/1.2/4eoBxbJStrbGAKbmBYOJfg--/YXBwaWQ9eW5ld3M7Zmk9ZmlsbDtoPTg2O3E9NzU7dz0xMzA-/http://media.zenfs.com/en_us/News/ap_webfeeds/2f3a20c2d46d9f096f0f6a706700d430.jpg",
//                "width": "130"
//              },
//              "text": {
//                "type": "html",
//                "content": "<p><a href=\"http://news.yahoo.com/netanyahu-us-officials-face-off-iran-133539021--politics.html\"><img src=\"http://l2.yimg.com/bt/api/res/1.2/4eoBxbJStrbGAKbmBYOJfg--/YXBwaWQ9eW5ld3M7Zmk9ZmlsbDtoPTg2O3E9NzU7dz0xMzA-/http://media.zenfs.com/en_us/News/ap_webfeeds/2f3a20c2d46d9f096f0f6a706700d430.jpg\" width=\"130\" height=\"86\" alt=\"Israeli Prime Minister Benjamin Netanyahu addresses the 2015 American Israel Public Affairs Committee (AIPAC) Policy Conference in Washington, Monday, March 2, 2015. (AP Photo/Cliff Owen)\" align=\"left\" title=\"Israeli Prime Minister Benjamin Netanyahu addresses the 2015 American Israel Public Affairs Committee (AIPAC) Policy Conference in Washington, Monday, March 2, 2015. (AP Photo/Cliff Owen)\" border=\"0\" /></a>WASHINGTON (AP) — Seeking to lower tensions, Benjamin Netanyahu and U.S. officials cast their dispute over Iran as a family squabble on Monday, even as the Israeli leader claimed President Barack Obama did not — and could not — fully understand his nation&#039;s vital security concerns.</p><br clear=\"all\"/>"
//              },
//              "credit": {
//                "role": "publishing company"
//              }
//            },
//            {... },
//            {... },
//          ]
//        }
//      }
//    }

    function onSuccess(json, recStart) {
      var recEnd = recStart;
      if (json.query.count > 0) {
        var results = json.query.results.item;
        recEnd = recStart + results.length;
        data.length = 100;// Math.min(parseInt(results.length),1000); // limitation of the API

        for (var i = 0; i < results.length; i++) {
          var item = results[i];

          item.pubDate = new Date(item.pubDate);

          data[recStart + i] = { index: recStart + i };
          data[recStart + i].pubDate = item.pubDate;
          data[recStart + i].title = item.title;
          data[recStart + i].url = item.link;
          data[recStart + i].text = item.description;
        }
      }
      req = null;

      onDataLoaded.notify({from: recStart, to: recEnd});
    }


    function reloadData(from, to) {
      for (var i = from; i <= to; i++)
        delete data[i];

      ensureData(from, to);
    }

    init();

    return {
      // properties
      "data": data,

      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "ensureData": ensureData,
      "reloadData": reloadData,

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded
    };
  }

  // Slick.Data.RemoteModel
  $.extend(true, window, { Slick: { Data: { RemoteModel: RemoteModel }}});
})(jQuery);
