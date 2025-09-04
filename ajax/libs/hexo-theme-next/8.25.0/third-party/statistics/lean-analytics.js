/* global CONFIG */
/* eslint-disable no-console */

class LeanCloudCounter {
  constructor(appId, appKey, apiServer) {
    this.appId = appId;
    this.appKey = appKey;
    this.apiServer = apiServer;
  }

  leancloudSelector(url) {
    url = encodeURI(url);
    return document.getElementById(url).querySelector('.leancloud-visitors-count');
  }

  async request(method, url, data) {
    return fetch(`${this.apiServer}/1.1${url}`, {
      method,
      headers: {
        'X-LC-Id'     : this.appId,
        'X-LC-Key'    : this.appKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async addCount() {
    const visitors = document.querySelector('.leancloud_visitors');
    const url = decodeURI(visitors.id);
    const title = visitors.dataset.flagTitle;

    try {
      const response = await this.request('get', `/classes/Counter?where=${encodeURIComponent(JSON.stringify({ url }))}`);
      const { results } = await response.json();
      if (results.length > 0) {
        const counter = results[0];
        this.leancloudSelector(url).innerText = counter.time + 1;
        try {
          await this.request('put', '/classes/Counter/' + counter.objectId, {
            time: {
              '__op'  : 'Increment',
              'amount': 1
            }
          });
        } catch (error) {
          console.error('Failed to save visitor count', error);
        }
      } else if (CONFIG.leancloud_visitors.security) {
        this.leancloudSelector(url).innerText = 'Counter not initialized! More info at console err msg.';
        console.error('ATTENTION! LeanCloud counter has security bug, see how to solve it here: https://github.com/theme-next/hexo-leancloud-counter-security. \n However, you can still use LeanCloud without security, by setting `security` option to `false`.');
      } else {
        try {
          const response = await this.request('post', '/classes/Counter', { title, url, time: 1 });
          await response.json();
          this.leancloudSelector(url).innerText = 1;
        } catch (error) {
          console.error('Failed to create', error);
        }
      }
    } catch (error) {
      console.error('LeanCloud Counter Error', error);
    }
  }

  async showTime() {
    const visitors = document.querySelectorAll('.leancloud_visitors');
    const entries = [...visitors].map(element => {
      return decodeURI(element.id);
    });

    try {
      const response = await this.request('get', `/classes/Counter?where=${encodeURIComponent(JSON.stringify({ url: { '$in': entries } }))}`);
      const { results } = await response.json();
      for (const url of entries) {
        const target = results.find(item => item.url === url);
        this.leancloudSelector(url).innerText = target ? target.time : 0;
      }
    } catch (error) {
      console.error('LeanCloud Counter Error', error);
    }
  }
}

(function() {
  const { app_id, app_key, server_url } = CONFIG.leancloud_visitors;
  const fetchData = api_server => {
    const counter = new LeanCloudCounter(app_id, app_key, api_server);
    if (CONFIG.page.isPost) {
      if (CONFIG.hostname !== location.hostname) return;
      counter.addCount();
    } else if (document.querySelectorAll('.post-title-link').length >= 1) {
      counter.showTime();
    }
  };

  let api_server;
  if (server_url) {
    api_server = server_url;
  } else if (app_id.slice(-9) === '-MdYXbMMI') {
    api_server = `https://${app_id.slice(0, 8).toLowerCase()}.api.lncldglobal.com`;
  }

  document.addEventListener('page:loaded', async () => {
    if (api_server) {
      fetchData(api_server);
    } else {
      try {
        const response = await fetch(`https://app-router.leancloud.cn/2/route?appId=${app_id}`);
        const { api_server } = await response.json();
        fetchData(`https://${api_server}`);
      } catch (error) {
        console.error('Failed to fetch API server', error);
      }
    }
  });
})();
