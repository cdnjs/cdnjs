// Language: Arabic
// Translated By Khaled Attia < Khal3d.com >
(function() {
  function numpf(num, w, x, y, z) {
    if( num == 0 ) {
      return w;
    } else if( num == 2 ) {
      return x;
    } else if( num >= 3 && num <= 10) {
      return y; // 3:10
    } else {
      return z; // 11+
    }
  }
  jQuery.timeago.settings.strings = {
    prefixAgo: "منذ",
    prefixFromNow: "يتبقى",
    suffixAgo: null,
    suffixFromNow: null, // null OR "من الآن"
    seconds: function(value) { return numpf(value, "لحظات", "ثانيتين", "%d ثواني", "%d ثانيه"); },
    minute: "دقيقة",
    minutes: function(value) { return numpf(value, null, "دقيقتين", "%d دقائق", "%d دقيقة"); },
    hour: "ساعة",
    hours: function(value) { return numpf(value, null, "ساعتين", "%d ساعات", "%d ساعة"); },
    day: "يوم",
    days: function(value) { return numpf(value, null, "يومين", "%d أيام", "%d يوم"); },
    month: "شهر",
    months: function(value) { return numpf(value, null, "شهرين", "%d أشهر", "%d شهر"); },
    year: "سنه",
    years: function(value) { return numpf(value, null, "سنتين", "%d سنوات", "%d سنه"); }
  };
})();