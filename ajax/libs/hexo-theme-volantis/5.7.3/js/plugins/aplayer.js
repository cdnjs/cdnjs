/**
 * 右键音乐
 * */
const RightMenuAplayer = (() => {
  let playStatus; // 播放器状态
  const APlayer = {}; // 右键音乐所控制的播放器
  const fn = {};

  fn.checkAPlayer = () => {
    if (playStatus === undefined || APlayer.player === undefined) {
      fn.setAPlayerObject();
    } else if (APlayer.observer === undefined) {
      fn.setAPlayerObserver();
    }
  }

  // 设置全局播放器所对应的 aplyer 对象
  fn.setAPlayerObject = () => {
    let meting = document.querySelectorAll('.footer meting-js');
    if (meting.length == 0) {
      meting = document.querySelectorAll('meting-js');
    }
    APlayer.player = undefined;
    meting.forEach((item, index) => {
      if (item.meta.id == volantis.GLOBAL_CONFIG.plugins.aplayer.id && item.aplayer && APlayer.player === undefined) {
        APlayer.player = item.aplayer;
        fn.setAPlayerObserver();
        fn.updateTitle();
      }
    });
  }

  // 事件监听
  fn.setAPlayerObserver = () => {
    try {
      APlayer.player.on('play', function (e) {
        fn.updateAPlayerControllerStatus(e);
        APlayer.status = 'play';
      });
      APlayer.player.on('pause', function (e) {
        fn.updateAPlayerControllerStatus(e);
        APlayer.status = 'pause';
      });
      APlayer.player.on('volumechange', function (e) {
        fn.onUpdateAPlayerVolume(e);
      });
      APlayer.player.on('loadstart', function (e) {
        fn.updateTitle(e);
      });

      // 监听音量手势
      APlayer.volumeBarWrap = document.getElementsByClassName('nav volume')[0].children[0];
      APlayer.volumeBar = APlayer.volumeBarWrap.children[0];

      const thumbMove = (e) => {
        fn.updateAPlayerVolume(e);
      };

      const thumbUp = (e) => {
        APlayer.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
        document.removeEventListener('mouseup', thumbUp);
        document.removeEventListener('mousemove', thumbMove);
        fn.updateAPlayerVolume(e);
      };

      APlayer.volumeBarWrap.addEventListener('mousedown', (event) => {
        event.stopPropagation();
        APlayer.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
        document.addEventListener('mousemove', thumbMove);
        document.addEventListener('mouseup', thumbUp);
      });

      APlayer.volumeBarWrap.addEventListener('click', (event) => {
        event.stopPropagation();
      });

      fn.updateAPlayerControllerStatus();
      fn.onUpdateAPlayerVolume();
      APlayer.observer = true;
    } catch (error) {
      console.log(error);
      APlayer.observer = undefined;
    }
  }

  fn.updateAPlayerVolume = (e) => {
    let percentage = ((e.clientX || e.changedTouches[0].clientX) -
      APlayer.volumeBar.getBoundingClientRect().left) / APlayer.volumeBar.clientWidth;
    percentage = Math.max(percentage, 0);
    percentage = Math.min(percentage, 1);
    APlayer.player.volume(percentage);
  }

  fn.onUpdateAPlayerVolume = () => {
    try {
      APlayer.volumeBar.children[0].style.width = APlayer.player.audio.volume * 100 + '%';
    } catch (error) {
      console.log(error);
    }
  }

  // 更新控制器状态
  fn.updateAPlayerControllerStatus = () => {
    try {
      if (APlayer.player.audio.paused) {
        playStatus = 'pause';
        document.getElementsByClassName('nav toggle')[0].children[0].classList.add('fa-play');
        document.getElementsByClassName('nav toggle')[0].children[0].classList.remove('fa-pause');
      } else {
        playStatus = 'play';
        document.getElementsByClassName('nav toggle')[0].children[0].classList.remove('fa-play');
        document.getElementsByClassName('nav toggle')[0].children[0].classList.add('fa-pause');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 播放/暂停
  fn.aplayerToggle = () => {
    fn.checkAPlayer();
    try {
      APlayer.player.toggle();
    } catch (error) {
      console.log(error);
    }
  }

  // 上一曲
  fn.aplayerBackward = () => {
    fn.checkAPlayer();
    try {
      APlayer.player.skipBack();
      APlayer.player.play();
    } catch (error) {
      console.log(error);
    }
  }

  // 下一曲
  fn.aplayerForward = () => {
    fn.checkAPlayer();
    try {
      APlayer.player.skipForward();
      APlayer.player.play();
    } catch (error) {
      console.log(error);
    }
  }

  // 调节音量
  fn.aplayerVolume = (percent) => {
    fn.checkAPlayer();
    try {
      APlayer.player.volume(percent);
    } catch (error) {
      console.log(error);
    }
  }

  // 更新音乐标题
  fn.updateTitle = () => {
    fn.checkAPlayer();
    try {
      const index = APlayer.player.list.index;
      const obj = APlayer.player.list.audios[index];
      document.getElementsByClassName('nav music-title')[0].innerHTML = obj.title;
    } catch (error) {
      //console.log(error);
    }
  }

  return {
    checkAPlayer: fn.checkAPlayer,
    aplayerBackward: fn.aplayerBackward,
    aplayerToggle: fn.aplayerToggle,
    aplayerForward: fn.aplayerForward,
    APlayer: APlayer
  }
})()

Object.freeze(RightMenuAplayer);

volantis.requestAnimationFrame(() => {
  RightMenuAplayer.checkAPlayer();
});
