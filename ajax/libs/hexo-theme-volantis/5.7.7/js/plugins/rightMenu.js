const RightMenu = (() => {
  const
    rightMenuConfig = volantis.GLOBAL_CONFIG.plugins.rightmenu,
    messageRightMenu = volantis.GLOBAL_CONFIG.plugins.message.enable && volantis.GLOBAL_CONFIG.plugins.message.rightmenu.enable;

  const
    fn = {},
    _rightMenuWrapper = document.getElementById('rightmenu-wrapper'),
    _rightMenuContent = document.getElementById('rightmenu-content'),
    _printHtml = document.getElementById('printHtml'),
    _menuMusic = document.getElementById('menuMusic'),
    _readingModel = document.getElementById('readingModel'),
    _readBkg = document.getElementById('read_bkg');

  const
    _menuLoad = document.querySelectorAll('.menuLoad-Content'),
    _menuOption = document.querySelector('.menu-Option'),
    _searchWord = document.querySelector('.menu-Option[data-fn-type="searchWord"]'),
    _copyText = document.querySelector('.menu-Option[data-fn-type="copyText"]'),
    _copyPaste = document.querySelector('.menu-Option[data-fn-type="copyPaste"]'),
    _copySelect = document.querySelector('.menu-Option[data-fn-type="copySelect"]'),
    _copyCut = document.querySelector('.menu-Option[data-fn-type="copyCut"]'),
    _copyHref = document.querySelector('.menu-Option[data-fn-type="copyHref"]'),
    _copySrc = document.querySelector('.menu-Option[data-fn-type="copySrc"]'),
    _copyImg = document.querySelector('.menu-Option[data-fn-type="copyImg"]'),
    _openTab = document.querySelector('.menu-Option[data-fn-type="openTab"]'),
    _backward = document.querySelector('#menuMusic .backward'),
    _toggle = document.querySelector('#menuMusic .toggle'),
    _forward = document.querySelector('#menuMusic .forward');

  const urlRegx = /^((https|http)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;

  fn.init = () => {
    DOMController.visible(_menuMusic, false);
    DOMController.visible(_menuOption, false);
    if (_readBkg) _readBkg.parentNode.removeChild(_readBkg);

    const readBkg = document.createElement("div");
    readBkg.className = "common_read_bkg common_read_hide";
    readBkg.id = "read_bkg";
    window.document.body.appendChild(readBkg);
  }

  fn.initEvent = () => {
    window.document.oncontextmenu = (event) => {
      if (event.ctrlKey || document.body.offsetWidth <= 500) {
        fn.hideMenu();
        return true;
      }
      return fn.popMenu(event);
    }

    _rightMenuWrapper.oncontextmenu = (event) => {
      event.stopPropagation();
      event.preventDefault();
      return false;
    }

    window.removeEventListener('blur', fn.hideMenu);
    window.addEventListener('blur', fn.hideMenu);
    document.body.removeEventListener('click', fn.hideMenu);
    document.body.addEventListener('click', fn.hideMenu);

    if (_forward && _toggle && _forward) {
      _backward.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        RightMenuAplayer.aplayerBackward();
      }
      _toggle.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        RightMenuAplayer.aplayerToggle();
      }
      _forward.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        RightMenuAplayer.aplayerForward();
      }
    }
  }

  // 菜单位置设定
  fn.popMenu = (event) => {
    let mouseClientX = event.clientX;
    let mouseClientY = event.clientY;
    let screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

    try {
      fn.setMenuItem(event);
      DOMController.visible(_rightMenuWrapper);
      _rightMenuWrapper.focus();
      _rightMenuWrapper.style.zIndex = '-2147483648';
      let menuWidth = _rightMenuContent.offsetWidth;
      let menuHeight = _rightMenuContent.offsetHeight;
      let showLeft = mouseClientX + menuWidth > screenWidth ? mouseClientX - menuWidth + 10 : mouseClientX;
      let showTop = mouseClientY + menuHeight > screenHeight ? mouseClientY - menuHeight + 10 : mouseClientY;
      showTop = mouseClientY + menuHeight > screenHeight && showTop < menuHeight && mouseClientY < menuHeight ?
        showTop + (screenHeight - menuHeight - showTop - 10) : showTop;
      _rightMenuWrapper.style.left = showLeft + "px";
      _rightMenuWrapper.style.top = showTop + "px";
      _rightMenuWrapper.style.zIndex = '2147483648';
      if (volantis.GLOBAL_CONFIG.plugins.message.rightmenu.notice) fn.showMessage();
    } catch (error) {
      _rightMenuWrapper.blur();
      console.error(error);
      return true;
    }

    return false;
  }

  // 消息提示
  fn.showMessage = () => {
    const NoticeRightMenu = localStorage.getItem('NoticeRightMenu') === 'true';
    if (messageRightMenu && !NoticeRightMenu)
      VolantisApp.message('右键菜单', '唤醒原系统菜单请使用：<kbd>Ctrl</kbd> + <kbd>右键</kbd>', {
        icon: rightMenuConfig.faicon + ' fa-exclamation-square red',
        time: 9000
      }, () => {
        localStorage.setItem('NoticeRightMenu', 'true')
      });
  }

  // 菜单项设置
  fn.setMenuItem = (event) => {
    let optionFlag = false;
    const eventTarget = event.target;
    const selectText = window.getSelection().toString();
    DOMController.visible(_openTab, false); // 隐藏新标签页打开

    // 判断是否是输入框
    if (eventTarget.tagName.toLowerCase() === 'input' || eventTarget.tagName.toLowerCase() === 'textarea') {
      const inputStr = eventTarget.value;

      // 全选
      if (inputStr.length > 0) {
        DOMController.visible(_copySelect);
        _copySelect.onclick = () => {
          event.preventDefault();
          eventTarget.select();
        }
      } else {
        DOMController.visible(_copySelect, false);
      }

      // 剪切
      if (selectText) {
        DOMController.visible(_copyCut);
        _copyCut.onclick = () => {
          const statrPos = eventTarget.selectionStart;
          const endPos = eventTarget.selectionEnd;
          fn.copyString(selectText);
          eventTarget.value = inputStr.substring(0, statrPos) + inputStr.substring(endPos, inputStr.length);
          eventTarget.selectionStart = statrPos;
          eventTarget.selectionEnd = statrPos;
          eventTarget.focus();
        }
      } else {
        DOMController.visible(_copyCut, false);
      }

      // 粘贴
      fn.readClipboard().then(text => {
        // 如果剪切板存在内容
        if (!!text) {
          DOMController.visible(_copyPaste);
          _copyPaste.onclick = () => {
            fn.insertAtCaret(eventTarget, text);
          }
        } else {
          DOMController.visible(_copyPaste, false);
        }
      }).catch((err) => {
        console.error(err);
        DOMController.visible(_copyPaste, false);
      });
    } else {
      DOMController.visible(_copySelect, false);
      DOMController.visible(_copyPaste, false);
      DOMController.visible(_copyCut, false);
    }

    // 新标签打开链接
    const eventHref = eventTarget.href;
    if (!!eventHref && urlRegx.test(eventHref)) {
      optionFlag = true;
      DOMController.visible(_copyHref);
      DOMController.visible(_openTab);
      if (_copyHref) _copyHref.onclick = () => {
        fn.copyString(eventHref);
      }
      _openTab.onclick = () => {
        window.open(eventHref);
      }
    } else {
      DOMController.visible(_copyHref, false);
    }

    // 新标签打开图片 & 复制图片链接
    const eventSrc = eventTarget.currentSrc;
    if (!!eventSrc && urlRegx.test(eventSrc)) {
      optionFlag = true;
      DOMController.visible(_copySrc);
      DOMController.visible(_openTab);

      _copySrc.onclick = () => {
        fn.copyString(eventSrc);
      }

      _openTab.onclick = () => {
        window.open(eventSrc);
      }
    } else {
      DOMController.visible(_copySrc, false);
    }

    // 复制图片
    if (!!eventSrc && urlRegx.test(eventSrc) && eventSrc.trimEnd().endsWith('.png')) {
      optionFlag = true;
      DOMController.visible(_copyImg);

      _copyImg.onclick = () => {
        fn.writeClipImg(event, flag => {
          if (flag && messageRightMenu) VolantisApp.message('系统提示', '图片复制成功！', {
            icon: rightMenuConfig.faicon + ' fa-images'
          });
        }, (error) => {
          if (messageRightMenu) VolantisApp.message('系统提示', '复制失败：' + error, {
            icon: rightMenuConfig.faicon + ' fa-exclamation-square red'
          });
        })
      }
    } else {
      DOMController.visible(_copyImg, false);
    }

    // 复制文本
    if (selectText) {
      optionFlag = true;
      DOMController.visible(_copyText);
      DOMController.visible(_searchWord);

      _copyText.onclick = () => {
        fn.copyString(selectText);
      }

      !!_searchWord && (_searchWord.onclick = () => {
        OpenSearch(selectText);
      })
    } else {
      DOMController.visible(_copyText, false);
      DOMController.visible(_searchWord, false);
    }

    // 打印
    const _printArticle = document.querySelector('#post.article') || null;
    const pathName = window.location.pathname;
    if (!!_printArticle) {
      DOMController.visible(_printHtml);
      DOMController.visible(_readingModel);

      if (_printHtml) {
        _printHtml.onclick = () => {
          if (window.location.pathname === pathName) {
            const message = '是否打印当前页面？<br><em style="font-size: 80%">建议打印时勾选背景图形</em><br>';
            if (messageRightMenu) VolantisApp.question('', message, {}, () => {
              fn.printHtml();
            })
          } else {
            fn.hideMenu();
          }
        }
      }

      if (_readingModel) {
        _readingModel.onclick = () => {
          if (window.location.pathname === pathName) {
            fn.readingModel();
          } else {
            fn.readingModel();
          }
        }
      }

    } else {
      DOMController.visible(_printHtml, false);
      DOMController.visible(_readingModel, false);
    }

    if (volantis.GLOBAL_CONFIG.plugins.aplayer.enable
      && typeof RightMenuAplayer !== 'undefined'
      && RightMenuAplayer.APlayer.player !== undefined) {
      if (rightMenuConfig.music_alwaysShow) {
        DOMController.visible(_menuMusic);
      } else if (RightMenuAplayer.APlayer.status === 'play' || RightMenuAplayer.APlayer.status === 'undefined') {
        optionFlag = true;
        DOMController.visible(_menuMusic);
      } else {
        DOMController.visible(_menuMusic, false);
      }
    } else {
      DOMController.visible(_menuMusic, false);
    }

    _menuLoad.forEach(ele => {
      DOMController.visible(ele, !optionFlag);
    })

    if (volantis.GLOBAL_CONFIG.plugins.aplayer.enable
      && rightMenuConfig.layout.includes('music')) {
      RightMenuAplayer.checkAPlayer();
    }
  }

  // 隐藏菜单
  fn.hideMenu = () => {
    DOMController.visible(_rightMenuWrapper, false);
  }

  // 复制字符串
  fn.copyString = (str) => {
    VolantisApp.utilWriteClipText(str)
      .then(() => {
        if (messageRightMenu) {
          VolantisApp.messageCopyright();
        }
      }).catch(e => {
        if (messageRightMenu) {
          VolantisApp.message('系统提示', e, {
            icon: rightMenuConfig.faicon + ' fa-exclamation-square red'
          });
        }
      })
  }

  // 写入文本到剪切板
  fn.writeClipText = (str) => {
    try {
      return navigator.clipboard
        .writeText(str)
        .then(() => {
          return Promise.resolve()
        })
        .catch(err => {
          return Promise.reject(err)
        })
    } catch (e) {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      document.body.appendChild(input);
      input.setAttribute('value', str);
      input.select();
      try {
        let result = document.execCommand('copy')
        document.body.removeChild(input);
        if (!result || result === 'unsuccessful') {
          return Promise.reject('复制文本失败!')
        } else {
          return Promise.resolve()
        }
      } catch (e) {
        document.body.removeChild(input);
        return Promise.reject(
          '当前浏览器不支持复制功能，请检查更新或更换其他浏览器操作!'
        )
      }
    }
  }

  // 写入图片到剪切板
  fn.writeClipImg = async function (event, success, error) {
    const eventSrc = rightMenuConfig.customPicUrl.enable ?
      event.target.currentSrc.replace(rightMenuConfig.customPicUrl.old, rightMenuConfig.customPicUrl.new) :
      event.target.currentSrc;
    const parentElement = event.target.parentElement;
    try {
      const data = await fetch(eventSrc);
      const blob = await data.blob();
      await navigator.clipboard
        .write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]).then(() => {
          success(true);
        }, (e) => {
          console.error('图片复制失败：', e);
          error(e);
        });
    } catch (e) {
      const dom = document;
      try {
        if (dom.body.createTextRange) {
          const textRange = document.body.createTextRange();
          textRange.moveToElementText(parentElement);
          textRange.select();
        } else if (window.getSelection) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(parentElement);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        success(false);
      } catch (e) {
        console.error(e);
        error('不支持复制当前图片！');
      }
    }
  }

  // 请求读取剪切板
  fn.readClipboard = async () => {
    const result = await navigator.permissions.query({
      name: 'clipboard-read'
    });
    if (result.state === 'granted' || result.state === 'prompt') {
      // 修改为 .read()  可以获取剪切板中的文字/图片
      // 返回的是 ClipboardItem
      return navigator.clipboard
        .readText()
        .then(text => text)
        .catch(err => Promise.reject(err));
    }
    return Promise.reject(result);
  }

  // 粘贴文本
  fn.insertAtCaret = (elemt, value) => {
    const startPos = elemt.selectionStart,
      endPos = elemt.selectionEnd;
    if (document.selection) {
      elemt.focus();
      var sel = document.selection.createRange();
      sel.text = value;
      elemt.focus();
    } else {
      if (startPos || startPos == '0') {
        var scrollTop = elemt.scrollTop;
        elemt.value = elemt.value.substring(0, startPos) + value + elemt.value.substring(endPos, elemt.value.length);
        elemt.focus();
        elemt.selectionStart = startPos + value.length;
        elemt.selectionEnd = startPos + value.length;
        elemt.scrollTop = scrollTop;
      } else {
        elemt.value += value;
        elemt.focus();
      }
    }
  }

  // 执行打印页面
  fn.printHtml = () => {
    if (volantis.isReadModel) fn.readingModel();
    DOMController.setAttribute('details', 'open', 'true');
    DOMController.remove('.cus-article-bkg');
    DOMController.remove('.iziToast-overlay');
    DOMController.remove('.iziToast-wrapper');
    DOMController.remove('.prev-next');
    DOMController.remove('footer');
    DOMController.remove('#l_header');
    DOMController.remove('#l_cover');
    DOMController.remove('#l_side');
    DOMController.remove('#comments');
    DOMController.remove('#s-top');
    DOMController.remove('#BKG');
    DOMController.remove('#rightmenu-wrapper');
    DOMController.remove('.nav-tabs');
    DOMController.remove('.parallax-mirror');
    DOMController.remove('.new-meta-item.share');
    DOMController.remove('div.footer');
    DOMController.setStyle('body', 'backgroundColor', 'unset');
    DOMController.setStyle('#l_main', 'width', '100%');
    DOMController.setStyle('#post', 'boxShadow', 'none');
    DOMController.setStyle('#post', 'background', 'none');
    DOMController.setStyle('#post', 'padding', '0');
    DOMController.setStyle('h1', 'textAlign', 'center');
    DOMController.setStyle('h1', 'fontWeight', '600');
    DOMController.setStyle('h1', 'fontSize', '2rem');
    DOMController.setStyle('h1', 'marginBottom', '20px');
    DOMController.setStyle('.tab-pane', 'display', 'block');
    DOMController.setStyle('.tab-content', 'borderTop', 'none');
    DOMController.setStyle('.highlight>table pre', 'whiteSpace', 'pre-wrap');
    DOMController.setStyle('.highlight>table pre', 'wordBreak', 'break-all');
    DOMController.setStyle('.fancybox img', 'height', 'auto');
    DOMController.setStyle('.fancybox img', 'weight', 'auto');

    setTimeout(() => {
      window.print();
      document.body.innerHTML = '';
      window.location.reload();
    }, 50);
  }

  // 阅读模式
  fn.readingModel = () => {
    if (typeof ScrollReveal === 'function') ScrollReveal().clean('#comments');
    DOMController.fadeToggle(document.querySelector('#l_header'))
    DOMController.fadeToggle(document.querySelector('footer'))
    DOMController.fadeToggle(document.querySelector('#s-top'))
    DOMController.fadeToggle(document.querySelector('.article-meta#bottom'))
    DOMController.fadeToggle(document.querySelector('.prev-next'))
    DOMController.fadeToggle(document.querySelector('#l_side'))
    DOMController.fadeToggle(document.querySelector('#comments'))

    DOMController.toggleClass(document.querySelector('#l_main'), 'common_read')
    DOMController.toggleClass(document.querySelector('#l_main'), 'common_read_main')
    DOMController.toggleClass(document.querySelector('#l_body'), 'common_read')
    DOMController.toggleClass(document.querySelector('#safearea'), 'common_read')
    DOMController.toggleClass(document.querySelector('#pjax-container'), 'common_read')
    DOMController.toggleClass(document.querySelector('#read_bkg'), 'common_read_hide')
    DOMController.toggleClass(document.querySelector('h1'), 'common_read_h1')
    DOMController.toggleClass(document.querySelector('#post'), 'post_read')
    DOMController.toggleClass(document.querySelector('#l_cover'), 'read_cover')
    DOMController.toggleClass(document.querySelector('.widget.toc-wrapper'), 'post_read')

    volantis.isReadModel = volantis.isReadModel === undefined ? true : !volantis.isReadModel;
    if (volantis.isReadModel) {
      const option = {
        backgroundColor: 'var(--color-read-post)',
        icon: rightMenuConfig.faicon + ' fa-book-reader',
        time: 5000
      }
      if (messageRightMenu) VolantisApp.message('系统提示', '阅读模式已开启，您可以点击屏幕空白处退出。', option);
      document.querySelector('#l_body').removeEventListener('click', fn.readingModel);
      document.querySelector('#l_body').addEventListener('click', (event) => {
        if (DOMController.hasClass(event.target, 'common_read')) {
          fn.readingModel();
        }
      });
    } else {
      document.querySelector('#l_body').removeEventListener('click', fn.readingModel);
      document.querySelector('#post').removeEventListener('click', fn.readingModel);
    }
  }

  return {
    init: (notice = false) => {
      fn.init();
      fn.initEvent();
      if (notice && messageRightMenu) VolantisApp.message('系统提示', '自定义右键注册成功。');
    },
    destroy: (notice = false) => {
      fn.hideMenu();
      window.document.oncontextmenu = () => {
        return true
      };
      if (notice && messageRightMenu) VolantisApp.message('系统提示', '自定义右键注销成功。');
    },
    hideMenu: fn.hideMenu,
    readingModel: fn.readingModel
  }
})()

Object.freeze(RightMenu);

volantis.requestAnimationFrame(() => {
  if (document.readyState !== 'loading') {
    RightMenu.init();

    volantis.pjax.send(() => {
      RightMenu.hideMenu();
    })
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      RightMenu.init();

      volantis.pjax.send(() => {
        RightMenu.hideMenu();
      })
    })
  }
});
