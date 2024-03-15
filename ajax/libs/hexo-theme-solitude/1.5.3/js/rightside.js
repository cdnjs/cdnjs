let rm = {};
const addEvent = (element, event, callback) => element.addEventListener(event, callback);
rm.stopdragimg = Array.from(document.getElementsByTagName('img'));
rm.stopdragimg.forEach(img => addEvent(img, 'dragstart', () => false));
rm.showRightMenu = function (e, n = 0, t = 0) {
    let o = document.getElementById('rightMenu');
    o.style.top = n + 'px';
    o.style.left = t + 'px';
    o.style.display = e ? 'block' : 'none';
    e ? stopMaskScroll() : document.getElementById('rightmenu-mask').style.display = 'none';
};
rm.reloadrmSize = function () {
    let menu = document.querySelector("#rightMenu");
    menu.style.display = "block";
    rmWidth = menu.offsetWidth;
    rmHeight = menu.offsetHeight;
    menu.style.display = 'none';
}
async function imageToBlob(e) {
    const n = new Image();
    const t = document.createElement("canvas");
    const o = t.getContext("2d");
    n.crossOrigin = "";
    n.src = e;
    return new Promise((resolve => {
        n.onload = function () {
            t.width = this.naturalWidth;
            t.height = this.naturalHeight;
            o.drawImage(this, 0, 0);
            t.toBlob((blob => resolve(blob)), "image/png", .75);
        };
    }));
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
    addEvent(document.getElementById("rightmenu-mask"), "mousewheel", rm.hideRightMenu);
    addEvent(document.getElementById("rightMenu"), "mousewheel", rm.hideRightMenu);
}
rm.downloadimging = false;
rm.writeClipImg = async function (e) {
    if (!rm.downloadimging) {
        rm.downloadimging = true;
        utils.snackbarShow("正在下载中，请稍后", false, 10000);
        rm.hideRightMenu();
        setTimeout(async function () {
            await copyImage(e);
            utils.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = false;
        }, 1000);
    }
};
rm.copyUrl = function (e) {
    const t = document.createElement('input');
    t.value = e;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
};
rm.insertAtCaret = function (e, n) {
    const t = e.selectionStart
        , o = e.selectionEnd;
    if (document.selection)
        e.focus(),
            document.selection.createRange().text = n,
            e.focus();
    else if (t || "0" === t) {
        let i = e.scrollTop;
        e.value = e.value.substring(0, t) + n + e.value.substring(o, e.value.length),
            e.focus(),
            e.selectionStart = t + n.length,
            e.selectionEnd = t + n.length,
            e.scrollTop = i
    } else
        e.value += n,
            e.focus()
}
rm.rightMenuCommentText = function (e) {
    rm.hideRightMenu();
    let n = document.getElementsByClassName("el-textarea__inner")[0];
    let t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0);
    let o = replaceAll(e, "\n", "\n> ");
    n.value = "> " + o + "\n\n",
        n.dispatchEvent(t);
    const i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
        n.focus(),
        n.setSelectionRange(-1, -1),
    document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show")
}
rm.hideRightMenu = () => rm.showRightMenu(false) || (document.getElementById('rightmenu-mask').style.display = 'none')
document.querySelector("#rightMenu").style.display = "block"
rmWidth = document.querySelector("#rightMenu").offsetWidth;
rmHeight = document.querySelector("#rightMenu").offsetHeight;
document.querySelector("#rightMenu").style.display = 'none'
let domhref = "", domImgSrc = "", globalEvent = null;
rm.switchDarkMode = () => sco.switchDarkMode() || rm.hideRightMenu()
rm.rightmenuCopyText = (e) => navigator.clipboard && navigator.clipboard.writeText(e) || utils.snackbarShow("复制文本成功", !1, 2e3) || rm.hideRightMenu()
rm.copyPageUrl = () => rm.copyUrl(window.location.href) || utils.snackbarShow("复制本页链接地址成功", !1, 2e3) || rm.hideRightMenu()
rm.sharePage = () => rm.copyUrl(url) || utils.snackbarShow("复制本页链接地址成功", !1, 2e3) || rm.hideRightMenu()
var selectTextNow = "";
let selceText = () => selectTextNow = document.selection ? document.selection.createRange().text : window.getSelection() + "" || ""
let replaceAll = (e, n, t) => e.split(n).join(t);
document.onmouseup = document.ondbclick = selceText
rm.readClipboard = () => navigator.clipboard && navigator.clipboard.readText().then((e => rm.insertAtCaret(globalEvent.target, e)))
rm.pasteText = () => rm.readClipboard() || rm.hideRightMenu()
rm.copyLink = () => rm.rightmenuCopyText(domhref) || utils.snackbarShow("已复制链接地址")
window.oncontextmenu = function (e) {
    if (document.body.clientWidth <= 768) return;
    let n = e.clientX + 10;
    let t = e.clientY;
    let menuItems = {
        other: document.getElementsByClassName('rightMenuOther'),
        plugin: document.getElementsByClassName('rightMenuPlugin'),
        copytext: document.getElementById('menu-copytext'),
        pastetext: document.getElementById('menu-pastetext'),
        commenttext: document.getElementById('menu-commenttext'),
        newwindow: document.getElementById('menu-newwindow'),
        copylink: document.getElementById('menu-copylink'),
        copyimg: document.getElementById('menu-copyimg'),
        downloadimg: document.getElementById('menu-downloadimg'),
        search: document.getElementById('menu-search'),
        music: {
            toggle: document.getElementById('menu-music-toggle'),
            back: document.getElementById('menu-music-back'),
            forward: document.getElementById('menu-music-forward'),
            playlist: document.getElementById('menu-music-playlist'),
            copyMusicName: document.getElementById('menu-music-copyMusicName'),
        }
    };
    let y = e.target.href;
    let M = e.target.currentSrc;
    let b = false;
    Array.from(menuItems.other).forEach(item => item.style.display = 'block');
    globalEvent = e;
    if (selectTextNow && window.getSelection()) {
        b = true;
        menuItems.copytext.style.display = 'block';
        menuItems.commenttext.style.display = 'block';
        menuItems.search.style.display = 'block';
    } else {
        menuItems.copytext.style.display = 'none';
        menuItems.commenttext.style.display = 'none';
        menuItems.search.style.display = 'none';
    }
    if (y) {
        b = true;
        menuItems.newwindow.style.display = 'block';
        menuItems.copylink.style.display = 'block';
        domhref = y;
    } else {
        menuItems.newwindow.style.display = 'none';
        menuItems.copylink.style.display = 'none';
    }
    if (M) {
        b = true;
        menuItems.copyimg.style.display = 'block';
        menuItems.downloadimg.style.display = 'block';
        domImgSrc = M;
    } else {
        menuItems.copyimg.style.display = 'none';
        menuItems.downloadimg.style.display = 'none';
    }
    let tagName = e.target.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        b = true;
        menuItems.pastetext.style.display = 'block';
    } else {
        menuItems.pastetext.style.display = 'none';
    }
    if (e.target.nodeName === 'METING-JS') {
        b = true;
        Object.values(menuItems.music).forEach(item => item.style.display = 'block');
    } else {
        Object.values(menuItems.music).forEach(item => item.style.display = 'none');
    }
    Array.from(b ? menuItems.other : menuItems.plugin).forEach(item => item.style.display = 'none');
    Array.from(b ? menuItems.plugin : menuItems.other).forEach(item => item.style.display = 'block');
    rm.reloadrmSize();
    n + rmWidth > window.innerWidth && (n -= rmWidth + 10);
    t + rmHeight > window.innerHeight && (t -= t + rmHeight - window.innerHeight)
    rm.showRightMenu(true, t, n);
    document.getElementById('rightmenu-mask').style.display = 'flex';
    return false;
};
function addRightMenuClickEvent() {
    const addEvent = (id, event, callback) => document.getElementById(id)?.addEventListener(event, callback)
    addEvent('menu-backward', 'click', () => window.history.back() || rm.hideRightMenu())
    addEvent('menu-forward', 'click', () => window.history.forward() || rm.hideRightMenu())
    addEvent('menu-refresh', 'click', () => window.location.reload());
    addEvent('menu-top', 'click', () => utils.scrollToDest(0, 500) || rm.hideRightMenu())
    Array.from(document.getElementsByClassName('menu-link')).forEach(element => element.addEventListener('click', rm.hideRightMenu))
    addEvent('menu-darkmode', 'click', rm.switchDarkMode);
    addEvent('menu-randomPost', 'click', () => toRandomPost() || rm.hideRightMenu());
    GLOBAL_CONFIG.comment.commentBarrage && addEvent('menu-commentBarrage', 'click', sco.switchCommentBarrage);
    addEvent('rightmenu-mask', 'click', rm.hideRightMenu);
    addEvent('rightmenu-mask', 'contextmenu', () => rm.hideRightMenu() || false)
    addEvent('menu-copy', 'click', rm.copyPageUrl);
    addEvent('menu-pastetext', 'click', rm.pasteText);
    addEvent('menu-copytext', 'click', () => rm.rightmenuCopyText(selectTextNow) || utils.snackbarShow("复制成功，复制和转载请标注本文地址") || rm.hideRightMenu())
    GLOBAL_CONFIG.comment.enable && addEvent('menu-commenttext', 'click', () => rm.rightMenuCommentText(selectTextNow))
    addEvent('menu-newwindow', 'click', () => window.open(domhref) || rm.hideRightMenu());
    addEvent('menu-copylink', 'click', rm.copyLink);
    addEvent('menu-downloadimg', 'click', () => sco.downloadImage(domImgSrc));
    addEvent('menu-copyimg', 'click', () => rm.writeClipImg(domImgSrc));
    addEvent('menu-music-toggle', 'click', sco.musicToggle);
    addEvent('menu-music-back', 'click', sco.musicSkipBack);
    addEvent('menu-music-forward', 'click', sco.musicSkipForward);
    addEvent('menu-music-copyMusicName', 'click', () => rm.rightmenuCopyText(sco.musicGetName()) || utils.snackbarShow("复制歌曲名称成功", false, 3000))
}