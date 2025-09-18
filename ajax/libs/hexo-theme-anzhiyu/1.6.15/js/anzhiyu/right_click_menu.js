// 初始化函数
rm = {};

//禁止图片与超链接拖拽
let aElements = document.getElementsByTagName("a");
for (let i = 0; i < aElements.length; i++) {
  aElements[i].setAttribute("draggable", "false");
  let imgElements = aElements[i].getElementsByTagName("img");
  for (let j = 0; j < imgElements.length; j++) {
    imgElements[j].setAttribute("draggable", "false");
  }
}

// 显示菜单
rm.showRightMenu = function (isTrue, x = 0, y = 0) {
  console.info(x, y);
  let rightMenu = document.getElementById("rightMenu");
  rightMenu.style.top = x + "px";
  rightMenu.style.left = y + "px";
  if (isTrue) {
    rightMenu.style.display = "block";
    stopMaskScroll();
  } else {
    rightMenu.style.display = "none";
  }
};

// 隐藏菜单
rm.hideRightMenu = function () {
  rm.showRightMenu(false);
  let rightMenuMask = document.querySelector("#rightmenu-mask");
  rightMenuMask.style.display = "none";
};

// 尺寸
let rmWidth = document.getElementById("rightMenu").offsetWidth;
let rmHeight = document.getElementById("rightMenu").offsetHeight;

// 重新定义尺寸
rm.reloadrmSize = function () {
  rightMenu.style.visibility = "hidden";
  rightMenu.style.display = "block";
  // 获取宽度和高度
  rmWidth = document.getElementById("rightMenu").offsetWidth;
  rmHeight = document.getElementById("rightMenu").offsetHeight;
  rightMenu.style.visibility = "visible";
};

// 获取点击的href
let domhref = "";
let domImgSrc = "";
let globalEvent = null;

var oncontextmenuFunction = function (event) {
  if (document.body.clientWidth > 768) {
    let pageX = event.clientX + 10; //加10是为了防止显示时鼠标遮在菜单上
    let pageY = event.clientY;

    //其他额外菜单
    const $rightMenuOther = document.querySelector(".rightMenuOther");
    const $rightMenuPlugin = document.querySelector(".rightMenuPlugin");
    const $rightMenuCopyText = document.querySelector("#menu-copytext");
    const $rightMenuPasteText = document.querySelector("#menu-pastetext");
    const $rightMenuCommentText = document.querySelector("#menu-commenttext");
    const $rightMenuNewWindow = document.querySelector("#menu-newwindow");
    const $rightMenuNewWindowImg = document.querySelector("#menu-newwindowimg");
    const $rightMenuCopyLink = document.querySelector("#menu-copylink");
    const $rightMenuCopyImg = document.querySelector("#menu-copyimg");
    const $rightMenuDownloadImg = document.querySelector("#menu-downloadimg");
    const $rightMenuSearch = document.querySelector("#menu-search");
    const $rightMenuSearchBaidu = document.querySelector("#menu-searchBaidu");
    const $rightMenuMusicToggle = document.querySelector("#menu-music-toggle");
    const $rightMenuMusicBack = document.querySelector("#menu-music-back");
    const $rightMenuMusicForward = document.querySelector("#menu-music-forward");
    const $rightMenuMusicPlaylist = document.querySelector("#menu-music-playlist");
    const $rightMenuMusicCopyMusicName = document.querySelector("#menu-music-copyMusicName");

    let href = event.target.href;
    let imgsrc = event.target.currentSrc;

    // 判断模式 扩展模式为有事件
    let pluginMode = false;
    $rightMenuOther.style.display = "block";
    globalEvent = event;

    // 检查是否需要复制 是否有选中文本
    if (selectTextNow && window.getSelection()) {
      pluginMode = true;
      $rightMenuCopyText.style.display = "block";
      $rightMenuCommentText.style.display = "block";
      $rightMenuSearch.style.display = "block";
      $rightMenuSearchBaidu.style.display = "block";
    } else {
      $rightMenuCopyText.style.display = "none";
      $rightMenuCommentText.style.display = "none";
      $rightMenuSearchBaidu.style.display = "none";
      $rightMenuSearch.style.display = "none";
    }

    //检查是否右键点击了链接a标签
    if (href) {
      pluginMode = true;
      $rightMenuNewWindow.style.display = "block";
      $rightMenuCopyLink.style.display = "block";
      domhref = href;
    } else {
      $rightMenuNewWindow.style.display = "none";
      $rightMenuCopyLink.style.display = "none";
    }

    //检查是否需要复制图片
    if (imgsrc) {
      pluginMode = true;
      $rightMenuCopyImg.style.display = "block";
      $rightMenuDownloadImg.style.display = "block";
      $rightMenuNewWindowImg.style.display = "block";
      document.getElementById("rightMenu").style.width = "12rem";
      domImgSrc = imgsrc;
    } else {
      $rightMenuCopyImg.style.display = "none";
      $rightMenuDownloadImg.style.display = "none";
      $rightMenuNewWindowImg.style.display = "none";
    }

    // 判断是否为输入框
    if (event.target.tagName.toLowerCase() === "input" || event.target.tagName.toLowerCase() === "textarea") {
      pluginMode = true;
      $rightMenuPasteText.style.display = "block";
    } else {
      $rightMenuPasteText.style.display = "none";
    }
    const navMusicEl = document.querySelector("#nav-music");
    //判断是否是音乐
    if (navMusicEl && navMusicEl.contains(event.target)) {
      pluginMode = true;
      $rightMenuMusicToggle.style.display = "block";
      $rightMenuMusicBack.style.display = "block";
      $rightMenuMusicForward.style.display = "block";
      $rightMenuMusicPlaylist.style.display = "block";
      $rightMenuMusicCopyMusicName.style.display = "block";
    } else {
      $rightMenuMusicToggle.style.display = "none";
      $rightMenuMusicBack.style.display = "none";
      $rightMenuMusicForward.style.display = "none";
      $rightMenuMusicPlaylist.style.display = "none";
      $rightMenuMusicCopyMusicName.style.display = "none";
    }

    // 如果不是扩展模式则隐藏扩展模块
    if (pluginMode) {
      $rightMenuOther.style.display = "none";
      $rightMenuPlugin.style.display = "block";
    } else {
      $rightMenuPlugin.style.display = "none";
    }

    rm.reloadrmSize();

    // 鼠标默认显示在鼠标右下方，当鼠标靠右或靠下时，将菜单显示在鼠标左方\上方
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }

    rm.showRightMenu(true, pageY, pageX);
    document.getElementById("rightmenu-mask").style.display = "flex";
    return false;
  }
};

// 监听右键初始化
window.oncontextmenu = oncontextmenuFunction;

// 下载图片状态
rm.downloadimging = false;

// 复制图片到剪贴板
rm.writeClipImg = function (imgsrc) {
  console.log("按下复制");
  rm.hideRightMenu();
  anzhiyu.snackbarShow("正在下载中，请稍后", false, 10000);
  if (rm.downloadimging == false) {
    rm.downloadimging = true;
    setTimeout(function () {
      copyImage(imgsrc);
      anzhiyu.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议");
      rm.downloadimging = false;
    }, "10000");
  }
};

function imageToBlob(imageURL) {
  const img = new Image();
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  img.crossOrigin = "";
  img.src = imageURL;
  return new Promise(resolve => {
    img.onload = function () {
      c.width = this.naturalWidth;
      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);
      c.toBlob(
        blob => {
          // here the image is a blob
          resolve(blob);
        },
        "image/png",
        0.75
      );
    };
  });
}

async function copyImage(imageURL) {
  const blob = await imageToBlob(imageURL);
  const item = new ClipboardItem({ "image/png": blob });
  navigator.clipboard.write([item]);
}

rm.copyUrl = function (id) {
  const input = document.createElement("input"); // Create a new <input> element
  input.id = "copyVal"; // Set the id of the new element to "copyVal"
  document.body.appendChild(input); // Append the new element to the end of the <body> element

  const text = id;
  input.value = text;
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand("copy");

  input.remove(); // Remove the <input> element from the DOM
};

function stopMaskScroll() {
  if (document.getElementById("rightmenu-mask")) {
    let xscroll = document.getElementById("rightmenu-mask");
    xscroll.addEventListener(
      "mousewheel",
      function (e) {
        //阻止浏览器默认方法
        rm.hideRightMenu();
        // e.preventDefault();
      },
      { passive: true }
    );
  }
  if (document.getElementById("rightMenu")) {
    let xscroll = document.getElementById("rightMenu");
    xscroll.addEventListener(
      "mousewheel",
      function (e) {
        //阻止浏览器默认方法
        rm.hideRightMenu();
        // e.preventDefault();
      },
      { passive: true }
    );
  }
}

rm.rightmenuCopyText = function (txt) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt);
  }
  rm.hideRightMenu();
};

rm.copyPageUrl = function (url) {
  if (!url) {
    url = window.location.href;
  }
  rm.copyUrl(url);
  anzhiyu.snackbarShow("复制链接地址成功", false, 2000);
  rm.hideRightMenu();
};

// 复制当前选中文本
var selectTextNow = "";
document.onmouseup = document.ondblclick = selceText;

function selceText() {
  var txt;
  if (document.selection) {
    txt = document.selection.createRange().text;
  } else {
    txt = window.getSelection().toString();
  }
  selectTextNow = txt !== "" ? txt : "";
}

// 读取剪切板
rm.readClipboard = function () {
  if (navigator.clipboard) {
    navigator.clipboard.readText().then(clipText => rm.insertAtCaret(globalEvent.target, clipText));
  }
};

// 粘贴文本到焦点
rm.insertAtCaret = function (elemt, value) {
  const startPos = elemt.selectionStart,
    endPos = elemt.selectionEnd;
  if (document.selection) {
    elemt.focus();
    var sel = document.selection.createRange();
    sel.text = value;
    elemt.focus();
  } else {
    if (startPos || startPos == "0") {
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
};

//粘贴文本
rm.pasteText = function () {
  const result = rm.readClipboard() || "";
  rm.hideRightMenu();
};

//引用到评论
rm.rightMenuCommentText = function (txt) {
  rm.hideRightMenu();
  const postCommentDom = document.getElementById("post-comment");
  var domTop = postCommentDom.offsetTop;
  window.scrollTo(0, domTop - 80);
  if (txt == "undefined" || txt == "null") txt = "好棒！";
  function setText() {
    setTimeout(() => {
      var input = document.getElementsByClassName("el-textarea__inner")[0];
      if (!input) setText();
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("input", true, true);
      let inputValue = replaceAll(txt, "\n", "\n> ");
      input.value = "> " + inputValue + "\n\n";
      input.dispatchEvent(evt);
      input.focus();
      input.setSelectionRange(-1, -1);
      if (document.getElementById("comment-tips")) {
        document.getElementById("comment-tips").classList.add("show");
      }
    }, 100);
  }
  setText();
};

//替换所有内容
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

// 百度搜索
rm.searchBaidu = function () {
  anzhiyu.snackbarShow("即将跳转到百度搜索", false, 2000);
  setTimeout(function () {
    window.open("https://www.baidu.com/s?wd=" + selectTextNow);
  }, "2000");
  rm.hideRightMenu();
};

//分享链接
rm.copyLink = function () {
  rm.rightmenuCopyText(domhref);
  anzhiyu.snackbarShow("已复制链接地址");
};

function addRightMenuClickEvent() {
  // 添加点击事件
  document.getElementById("menu-backward").addEventListener("click", function () {
    window.history.back();
    rm.hideRightMenu();
  });

  document.getElementById("menu-forward").addEventListener("click", function () {
    window.history.forward();
    rm.hideRightMenu();
  });

  document.getElementById("menu-refresh").addEventListener("click", function () {
    window.location.reload();
  });

  document.getElementById("menu-top").addEventListener("click", function () {
    anzhiyu.scrollToDest(0, 500);
    rm.hideRightMenu();
  });

  document.getElementById("menu-translate").addEventListener("click", function () {
    window.translateFn.translatePage();
    rm.hideRightMenu();
  });

  const menuLinks = document.querySelectorAll(".menu-link");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", rm.hideRightMenu);
  });

  document.getElementById("menu-home") &&
    document.getElementById("menu-home").addEventListener("click", function () {
      window.location.href = window.location.origin;
    });

  document.getElementById("menu-randomPost").addEventListener("click", function () {
    toRandomPost();
  });

  document.getElementById("menu-commentBarrage").addEventListener("click", anzhiyu.switchCommentBarrage);

  document.getElementById("rightmenu-mask").addEventListener("click", rm.hideRightMenu);

  document.getElementById("rightmenu-mask").addEventListener("contextmenu", function (event) {
    rm.hideRightMenu();
    event.preventDefault(); // Prevent the default context menu from appearing
  });

  document.getElementById("menu-copy").addEventListener("click", () => {
    rm.copyPageUrl();
  });

  document.getElementById("menu-pastetext").addEventListener("click", rm.pasteText);

  document.getElementById("menu-copytext").addEventListener("click", function () {
    rm.rightmenuCopyText(selectTextNow);
    const copyright = GLOBAL_CONFIG.copyright;
    if (copyright.copy) {
      anzhiyu.snackbarShow(copyright.languages.copySuccess);
    }
  });

  document.getElementById("menu-commenttext").addEventListener("click", function () {
    rm.rightMenuCommentText(selectTextNow);
  });

  document.getElementById("menu-newwindow").addEventListener("click", function () {
    window.open(domhref, "_blank");
    rm.hideRightMenu();
  });

  document.getElementById("menu-copylink").addEventListener("click", rm.copyLink);

  document.getElementById("menu-downloadimg").addEventListener("click", function () {
    anzhiyu.downloadImage(domImgSrc, "anzhiyu");
  });

  document.getElementById("menu-newwindowimg").addEventListener("click", function () {
    window.open(domImgSrc, "_blank");
    rm.hideRightMenu();
  });

  document.getElementById("menu-copyimg").addEventListener("click", function () {
    rm.writeClipImg(domImgSrc);
  });

  document.getElementById("menu-searchBaidu").addEventListener("click", rm.searchBaidu);

  //音乐
  document.getElementById("menu-music-toggle").addEventListener("click", anzhiyu.musicToggle);

  document.getElementById("menu-music-back").addEventListener("click", anzhiyu.musicSkipBack);

  document.getElementById("menu-music-forward").addEventListener("click", anzhiyu.musicSkipForward);

  document.getElementById("menu-music-copyMusicName").addEventListener("click", function () {
    rm.rightmenuCopyText(anzhiyu.musicGetName());
    anzhiyu.snackbarShow("复制歌曲名称成功", false, 3000);
  });
}

addRightMenuClickEvent();
