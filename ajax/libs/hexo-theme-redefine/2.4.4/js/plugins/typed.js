/*
author: @jiangwen5945 & EvanNotFound
*/
const usrTypeSpeed = Global.theme_config.home_banner.subtitle.typing_speed;
const usrBackSpeed = Global.theme_config.home_banner.subtitle.backing_speed;
const usrBackDelay = Global.theme_config.home_banner.subtitle.backing_delay;
const usrStartDelay = Global.theme_config.home_banner.subtitle.starting_delay;
const usrLoop = Global.theme_config.home_banner.subtitle.loop;
const usrSmartBackspace =
  Global.theme_config.home_banner.subtitle.smart_backspace;
const usrHitokotoAPI = Global.theme_config.home_banner.subtitle.hitokoto.api;


if (Global.theme_config.home_banner.subtitle.hitokoto.enable) {
  Global.initTyped = (id) => {
    function typing(dataList) {
      const st = new Typed("#" + id, {
        strings: [dataList],
        typeSpeed: usrTypeSpeed || 100, //打字的速度
        smartBackspace: usrSmartBackspace || false, // 开启智能退格 默认false
        backSpeed: usrBackSpeed || 80, //后退速度
        backDelay: usrBackDelay || 1500, //后退延迟
        loop: usrLoop || false, //是否循环
        startDelay: usrStartDelay || 500, //起始时间
        // cursorChar: '♡', // 光标
      });
    }

    fetch(usrHitokotoAPI)
      .then((response) => response.json())
      .then((data) => {
        typing(data.hitokoto);
      })
      .catch(console.error);
  };
} else {
  Global.initTyped = (id) => {
    const sentenceList = [...Global.theme_config.home_banner.subtitle.text];

    if (document.getElementById(id)) {
      const st = new Typed("#" + id, {
        strings: sentenceList,
        typeSpeed: usrTypeSpeed || 100, //打字的速度
        smartBackspace: usrSmartBackspace || false, // 开启智能退格 默认false
        backSpeed: usrBackSpeed || 80, //后退速度
        backDelay: usrBackDelay || 1500, //后退延迟
        loop: usrLoop || false, //是否循环
        startDelay: usrStartDelay || 500, //起始时间
        // cursorChar: '♡', // 光标
      });
    }
  };
}

