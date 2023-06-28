const FriendsJS = {
  requestAPI: (url, callback, timeout) => {
    let retryTimes = 5;

    function request() {
      return new Promise((resolve, reject) => {
        let status = 0; // 0 等待 1 完成 2 超时
        let timer = setTimeout(() => {
          if (status === 0) {
            status = 2;
            timer = null;
            reject('请求超时');
            if (retryTimes == 0) {
              timeout();
            }
          }
        }, 5000);
        fetch(url).then(function (response) {
          if (status !== 2) {
            clearTimeout(timer);
            resolve(response);
            timer = null;
            status = 1;
          }
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function (data) {
          retryTimes = 0;
          callback(data);
        }).catch(function (error) {
          if (retryTimes > 0) {
            retryTimes -= 1;
            setTimeout(() => {
              request();
            }, 5000);
          } else {
            timeout();
          }
        });
      });
    }
    request();
  },
  layout: (cfg) => {
    const el = cfg.el;
    FriendsJS.requestAPI(cfg.api, function (data) {
      el.querySelector('.loading-wrap').remove();
      const arr = data.content;
      var cellALL = "";
      arr.forEach((item, i) => {
        var user = '<div class="user-card">';
        user += '<a class="card-link" target="_blank" rel="external noopener noreferrer"';
        user += ' href="' + item.url + '">';
        user += '<img alt="' + item.title + '" src="' + (item.avatar || cfg.avatar) + '" onerror="errorImgAvatar(this)">';
        user += '<div class="name"><span>' + item.title + '</span></div>';
        user += '</a>';
        user += '</div>';
        cellALL += user;
      });
      el.querySelector('.group-body').innerHTML = cellALL;
    }, function () {
      try {
        el.querySelector('.loading-wrap svg').remove();
        el.querySelector('.loading-wrap p').innerText('加载失败，请稍后重试。');
      } catch (e) { }
    });
  },
  start: () => {
    const els = document.getElementsByClassName('friendsjs-wrap');
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      const api = el.getAttribute('api');
      if (api == null) {
        continue;
      }
      var cfg = new Object();
      cfg.el = el;
      cfg.api = api;
      cfg.class = el.getAttribute('class');
      cfg.avatar = volantis.GLOBAL_CONFIG.default.avatar;
      FriendsJS.layout(cfg);
    }
  }
}



FriendsJS.start();
document.addEventListener('pjax:complete', function () {
  FriendsJS.start();
});