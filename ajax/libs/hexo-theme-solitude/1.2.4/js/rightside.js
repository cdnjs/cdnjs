let rm = {};

rm.stopdragimg = Array.from(document.getElementsByTagName('img'));
rm.stopdragimg.forEach(function (img) {
    img.addEventListener('dragstart', function () {
        return false;
    });
});

rm.showRightMenu = function (e, n = 0, t = 0) {
    let o = document.getElementById('rightMenu');
    o.style.top = n + 'px';
    o.style.left = t + 'px';

    if (e) {
        o.style.display = 'block';
        stopMaskScroll();
    } else {
        o.style.display = 'none';
    }
};

rm.hideRightMenu = function () {
    rm.showRightMenu(false);
    document.getElementById('rightmenu-mask').style.display = 'none';
};

document.querySelector("#rightMenu").style.display = "block"
rmWidth = document.querySelector("#rightMenu").offsetWidth;
rmHeight = document.querySelector("#rightMenu").offsetHeight;
document.querySelector("#rightMenu").style.display = 'none'

rm.reloadrmSize = function () {
    document.querySelector("#rightMenu").style.display = "block"
    rmWidth = document.querySelector("#rightMenu").offsetWidth;
    rmHeight = document.querySelector("#rightMenu").offsetHeight;
    document.querySelector("#rightMenu").style.display = 'none'
}

let domhref = "", domImgSrc = "", globalEvent = null;

function imageToBlob(e) {
    const n = new Image
        , t = document.createElement("canvas")
        , o = t.getContext("2d");
    return n.crossOrigin = "",
        n.src = e,
        new Promise((e => {
                n.onload = function () {
                    t.width = this.naturalWidth,
                        t.height = this.naturalHeight,
                        o.drawImage(this, 0, 0),
                        t.toBlob((n => {
                                e(n)
                            }
                        ), "image/png", .75)
                }
            }
        ))
}

async function copyImage(e) {
    try {
        const n = await imageToBlob(e);
        const t = new ClipboardItem({
            "image/png": n
        });
        await navigator.clipboard.write([t]);
    } catch (error) {
        console.error('Failed to copy image: ', error);
    }
}

function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        document.getElementById("rightmenu-mask").addEventListener("mousewheel", (function (e) {
                rm.hideRightMenu()
            }
        ), !1)
    }
    if (document.getElementById("rightMenu")) {
        document.getElementById("rightMenu").addEventListener("mousewheel", (function (e) {
                rm.hideRightMenu()
            }
        ), !1)
    }
}

window.oncontextmenu = function (e) {
    if (document.body.clientWidth > 768) {
        let n = e.clientX + 10;
        let t = e.clientY;
        let o = document.getElementsByClassName('rightMenuOther');
        let i = document.getElementsByClassName('rightMenuPlugin');
        let c = document.getElementById('menu-copytext');
        let r = document.getElementById('menu-pastetext');
        let m = document.getElementById('menu-commenttext');
        let a = document.getElementById('menu-newwindow');
        let u = document.getElementById('menu-copylink');
        let l = document.getElementById('menu-copyimg');
        let h = document.getElementById('menu-downloadimg');
        let d = document.getElementById('menu-search');
        let s = document.getElementById('menu-searchBaidu');
        let g = document.getElementById('menu-music-toggle');
        let w = document.getElementById('menu-music-back');
        let f = document.getElementById('menu-music-forward');
        let p = document.getElementById('menu-music-playlist');
        let k = document.getElementById('menu-music-copyMusicName');
        let y = e.target.href;
        let M = e.target.currentSrc;
        let b = false;

        for (let j = 0; j < o.length; j++) {
            o[j].style.display = 'block';
        }
        globalEvent = e;

        if (selectTextNow && window.getSelection()) {
            b = true;
            c.style.display = 'block';
            m.style.display = 'block';
            d.style.display = 'block';
            s.style.display = 'block';
        } else {
            c.style.display = 'none';
            m.style.display = 'none';
            s.style.display = 'none';
            d.style.display = 'none';
        }

        if (y) {
            b = true;
            a.style.display = 'block';
            u.style.display = 'block';
            domhref = y;
        } else {
            a.style.display = 'none';
            u.style.display = 'none';
        }

        if (M) {
            b = true;
            l.style.display = 'block';
            h.style.display = 'block';
            domImgSrc = M;
        } else {
            l.style.display = 'none';
            h.style.display = 'none';
        }

        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            b = true;
            r.style.display = 'block';
        } else {
            r.style.display = 'none';
        }

        if (e.target.nodeName === 'METING-JS') {
            b = true;
            g.style.display = 'block';
            w.style.display = 'block';
            f.style.display = 'block';
            p.style.display = 'block';
            k.style.display = 'block';
        } else {
            g.style.display = 'none';
            w.style.display = 'none';
            f.style.display = 'none';
            p.style.display = 'none';
            k.style.display = 'none';
        }

        if (b) {
            for (let j = 0; j < o.length; j++) {
                o[j].style.display = 'none';
            }
            for (let j = 0; j < i.length; j++) {
                i[j].style.display = 'block';
            }
        } else {
            for (let j = 0; j < i.length; j++) {
                i[j].style.display = 'none';
            }
        }

        rm.reloadrmSize();
        if (n + rmWidth > window.innerWidth) {
            n -= rmWidth + 10;
        }

        if (t + rmHeight > window.innerHeight) {
            t -= t + rmHeight - window.innerHeight;
        }
        rm.showRightMenu(true, t, n);
        document.getElementById('rightmenu-mask').style.display = 'flex';

        return false;
    }
};
rm.downloadimging = !1
rm.writeClipImg = function (e) {
    const n = "localhost" === window.location.hostname || "127.0.0.1" === window.location.hostname ? 0 : 1e4;
    rm.hideRightMenu();
    utils.snackbarShow("正在下载中，请稍后", !1, n);
    if (0 == rm.downloadimging) {
        rm.downloadimging = !0;
        setTimeout(async function() {
            await copyImage(e);
            utils.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = !1;
        }, 1000);
    }
}

rm.switchDarkMode = function () {
    sco.switchDarkMode()
    rm.hideRightMenu()
}

rm.copyUrl = function (e) {
    var n = e;
    var t = document.createElement('input');
    t.id = 'copyVal';
    document.body.appendChild(t);
    t.value = n;
    t.select();
    t.setSelectionRange(0, t.value.length);
    document.execCommand('copy');
    document.body.removeChild(t);
}

rm.rightmenuCopyText = function (e) {
    navigator.clipboard && navigator.clipboard.writeText(e),
        utils.snackbarShow("复制文本成功", !1, 2e3),
        rm.hideRightMenu()
}

rm.copyPageUrl = function () {
    var e = window.location.href;
    rm.copyUrl(e),
        utils.snackbarShow("复制本页链接地址成功", !1, 2e3),
        rm.hideRightMenu()
}

rm.sharePage = function () {
    window;
    rm.copyUrl(url),
        utils.snackbarShow("复制本页链接地址成功", !1, 2e3),
        rm.hideRightMenu()
}

var selectTextNow = "";

function selceText() {
    var e;
    e = document.selection ? document.selection.createRange().text : window.getSelection() + "",
        selectTextNow = e || ""
}

function replaceAll(e, n, t) {
    return e.split(n).join(t)
}

function addRightMenuClickEvent() {
    document.getElementById('menu-backward').addEventListener('click', function () {
        window.history.back();
        rm.hideRightMenu();
    });

    document.getElementById('menu-forward').addEventListener('click', function () {
        window.history.forward();
        rm.hideRightMenu();
    });

    document.getElementById('menu-refresh').addEventListener('click', function () {
        window.location.reload();
    });

    document.getElementById('menu-top').addEventListener('click', function () {
        utils.scrollToDest(0, 500);
        rm.hideRightMenu();
    });

    Array.from(document.getElementsByClassName('menu-link')).forEach(function (element) {
        element.addEventListener('click', rm.hideRightMenu);
    });

    var menuDarkmode = document.getElementById('menu-darkmode');
    menuDarkmode.onclick = null;
    menuDarkmode.addEventListener('click', rm.switchDarkMode);

    document.getElementById('menu-randomPost').addEventListener('click', function () {
        toRandomPost();
    });

    var menuCommentBarrage = document.getElementById('menu-commentBarrage');
    menuCommentBarrage.onclick = null;
    menuCommentBarrage.addEventListener('click', sco.switchCommentBarrage);

    var rightmenuMask = document.getElementById('rightmenu-mask');
    rightmenuMask.addEventListener('click', rm.hideRightMenu);
    rightmenuMask.addEventListener('contextmenu', function () {
        rm.hideRightMenu();
        return false;
    });

    document.getElementById('menu-copy').addEventListener('click', rm.copyPageUrl);
    document.getElementById('menu-pastetext').addEventListener('click', rm.pasteText);

    document.getElementById('menu-copytext').addEventListener('click', function () {
        rm.rightmenuCopyText(selectTextNow);
        utils.snackbarShow("复制成功，复制和转载请标注本文地址");
    });

    document.getElementById('menu-commenttext').addEventListener('click', function () {
        rm.rightMenuCommentText(selectTextNow);
    });

    document.getElementById('menu-newwindow').addEventListener('click', function () {
        window.open(domhref);
        rm.hideRightMenu();
    });

    document.getElementById('menu-copylink').addEventListener('click', rm.copyLink);

    document.getElementById('menu-downloadimg').addEventListener('click', function () {
        sco.downloadImage(domImgSrc, "sco");
    });

    document.getElementById('menu-copyimg').addEventListener('click', function () {
        rm.writeClipImg(domImgSrc);
    });

    document.getElementById('menu-searchBaidu').addEventListener('click', rm.searchBaidu);

    document.getElementById('menu-music-toggle').addEventListener('click', sco.musicToggle);
    document.getElementById('menu-music-back').addEventListener('click', sco.musicSkipBack);
    document.getElementById('menu-music-forward').addEventListener('click', sco.musicSkipForward);

    document.getElementById('menu-music-copyMusicName').addEventListener('click', function () {
        rm.rightmenuCopyText(sco.musicGetName());
        utils.snackbarShow("复制歌曲名称成功", false, 3000);
    });
}

document.onmouseup = document.ondbclick = selceText
rm.readClipboard = function () {
    navigator.clipboard && navigator.clipboard.readText().then((e => rm.insertAtCaret(globalEvent.target, e)))
}

rm.insertAtCaret = function (e, n) {
    const t = e.selectionStart
        , o = e.selectionEnd;
    if (document.selection)
        e.focus(),
            document.selection.createRange().text = n,
            e.focus();
    else if (t || "0" == t) {
        var i = e.scrollTop;
        e.value = e.value.substring(0, t) + n + e.value.substring(o, e.value.length),
            e.focus(),
            e.selectionStart = t + n.length,
            e.selectionEnd = t + n.length,
            e.scrollTop = i
    } else
        e.value += n,
            e.focus()
}

rm.pasteText = function () {
    rm.readClipboard();
    rm.hideRightMenu()
}

rm.rightMenuCommentText = function (e) {
    rm.hideRightMenu();
    var n = document.getElementsByClassName("el-textarea__inner")[0];
    let t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0);
    let o = replaceAll(e, "\n", "\n> ");
    n.value = "> " + o + "\n\n",
        n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
        n.focus(),
        n.setSelectionRange(-1, -1),
    document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show")
}

rm.searchBaidu = function () {
    utils.snackbarShow("即将跳转到百度搜索", !1, 2e3),
        setTimeout((function () {
                window.open("https://www.baidu.com/s?wd=" + selectTextNow)
            }
        ), "2000"),
        rm.hideRightMenu()
}

rm.copyLink = function () {
    rm.rightmenuCopyText(domhref),
        utils.snackbarShow("已复制链接地址")
}