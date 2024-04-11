var selectTextNow = "";
let selectText = () => selectTextNow = document.selection ? document.selection.createRange().text : window.getSelection() + "" || ""
document.onmouseup = document.ondbclick = selectText

const rm = {
    mask: document.getElementById("rightmenu-mask"),
    menu: document.getElementById("rightMenu"),
    width: document.querySelector("#rightMenu").offsetWidth,
    height: document.querySelector("#rightMenu").offsetHeight,
    domhref: "",
    domsrc: "",
    globalEvent: null,
    menuItems: {
        other: document.getElementsByClassName('rightMenuOther'),
        plugin: document.getElementsByClassName('rightMenuPlugin'),
        back: document.getElementById('menu-backward'),
        forward: document.getElementById('menu-forward'),
        refresh: document.getElementById('menu-refresh'),
        top: document.getElementById('menu-top'),
        copy: document.getElementById('menu-copytext'),
        paste: document.getElementById('menu-pastetext'),
        comment: document.getElementById('menu-commenttext'),
        new: document.getElementById('menu-newwindow'),
        copyLink: document.getElementById('menu-copylink'),
        copyImg: document.getElementById('menu-copyimg'),
        downloadImg: document.getElementById('menu-downloadimg'),
        search: document.getElementById('menu-search'),
        barrage: document.getElementById('menu-commentBarrage'),
        music: [
            toggle = document.getElementById('menu-music-toggle'),
            back = document.getElementById('menu-music-back'),
            forward = document.getElementById('menu-music-forward'),
            copyMusicName = document.getElementById('menu-music-copyMusicName'),
        ]
    },
    showRightMenu: (e, x = 0, y = 0) => {
        rm.menu.style.top = y + 'px';
        rm.menu.style.left = x + 'px';
        rm.menu.style.display = e ? 'block' : 'none';
        e ? stopMaskScroll() : rm.mask.style.display = 'none';
    },
    hideRightMenu: () => {
        rm.showRightMenu(false)
        rm.mask.style.display = 'none'
    },
    reLoadSize: () => {
        rm.menu.style.display = "block";
        rm.width = rm.menu.offsetWidth;
        rm.height = rm.menu.offsetHeight;
        rm.menu.style.display = 'none';
    },
    copyText: (e) => {
        navigator.clipboard && navigator.clipboard.writeText(e)
        utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 2000)
        rm.hideRightMenu()
    },
    pasteText: () => rm.readClipboard(),
    readClipboard: () => navigator.clipboard && navigator.clipboard.readText().then((e => rm.insertAtCaret(rm.globalEvent.target, e))),
    insertAtCaret: (e, n) => {
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
    },
    downloadImage: async function (imageUrl = rm.domsrc, filename = 'photo') {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || 'image.jpg';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            utils.snackbarShow(GLOBAL_CONFIG.right_menu.img_error, false, 2000)
        }
    },
    copyImage: async function (imgUrl = this.domsrc) {
        try {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const data = new ClipboardItem({
                'image/png': blob
            });
            await navigator.clipboard.write([data]);

            utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 3e3)
        } catch (error) {
            utils.snackbarShow(GLOBAL_CONFIG.right_menu.img_error, false, 2000)
        }
    },
    mode: (darkmode) => (darkmode ? document.querySelector('.menu-darkmode-text').textContent = GLOBAL_CONFIG.right_menu.mode.light : document.querySelector('.menu-darkmode-text').textContent = GLOBAL_CONFIG.right_menu.mode.dark) && rm.hideRightMenu(),
    barrage: (enable) => (enable ? document.querySelector(".menu-commentBarrage-text").textContent = GLOBAL_CONFIG.right_menu.barrage.open : document.querySelector(".menu-commentBarrage-text").textContent = GLOBAL_CONFIG.right_menu.barrage.close) && rm.hideRightMenu()
}

function stopMaskScroll() {
    utils.addEventListenerPjax(rm.menu, "mousewheel", rm.hideRightMenu)
    utils.addEventListenerPjax(rm.mask, "mousewheel", rm.hideRightMenu)
    utils.addEventListenerPjax(rm.mask, "click", rm.hideRightMenu)
}

window.oncontextmenu = (ele) => {
    if (document.body.clientWidth <= 768) return;
    let x = ele.clientX + 10;
    let y = ele.clientY;
    Array.from(rm.menuItems.other).forEach(item => item.style.display = 'block');

    rm.globalEvent = ele

    let display = false
    let link = ele.target.href
    let src = ele.target.currentSrc

    if (selectTextNow && window.getSelection()) {
        display = true;
        rm.menuItems.copy.style.display = 'block';
        rm.menuItems.comment.style.display = 'block';
        rm.menuItems.search.style.display = 'block';
    } else {
        rm.menuItems.copy.style.display = 'none';
        rm.menuItems.comment.style.display = 'none';
        rm.menuItems.search.style.display = 'none';
    }

    if (link) {
        display = true;
        rm.menuItems.new.style.display = 'block';
        rm.menuItems.copyLink.style.display = 'block';
        rm.domhref = link;
    } else {
        rm.menuItems.new.style.display = 'none';
        rm.menuItems.copyLink.style.display = 'none';
    }

    if (src) {
        display = true
        rm.menuItems.copyImg.style.display = 'block'
        rm.menuItems.downloadImg.style.display = 'block'
        rm.domsrc = src
    } else {
        rm.menuItems.copyImg.style.display = 'none';
        rm.menuItems.downloadImg.style.display = 'none';
    }

    let tagName = ele.target.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        display = true;
        rm.menuItems.paste.style.display = 'block';
    } else {
        rm.menuItems.paste.style.display = 'none';
    }

    if (tagName === 'meting-js') {
        display = true;
        rm.menuItems.music.forEach(item => item.style.display = 'block');
    } else {
        rm.menuItems.music.forEach(item => item.style.display = 'none');
    }

    Array.from(display ? rm.menuItems.other : rm.menuItems.plugin).forEach(item => item.style.display = 'none');
    Array.from(display ? rm.menuItems.plugin : rm.menuItems.other).forEach(item => item.style.display = 'block');
    rm.reLoadSize()
    x + rm.width > window.innerWidth && (x -= rm.width + 10);
    y + rm.height > window.innerHeight && (y -= y + rm.height - window.innerHeight)
    rm.mask.style.display = 'flex';
    rm.showRightMenu(true, x, y);
    return false;
}

!function () {
    rm.menuItems.back.addEventListener('click', () => window.history.back() || rm.hideRightMenu());
    rm.menuItems.forward.addEventListener('click', () => window.history.forward() || rm.hideRightMenu());
    rm.menuItems.refresh.addEventListener('click', () => window.location.reload())
    rm.menuItems.top.addEventListener('click', () => sco.toTop() || rm.hideRightMenu());

    if (GLOBAL_CONFIG.right_menu.music) {
        rm.menuItems.music[0].addEventListener('click', () => {
            sco.musicToggle()
            rm.hideRightMenu()
        })
        rm.menuItems.music[1].addEventListener('click', () => {
            document.querySelector('meting-js').aplayer.skipBack()
            rm.hideRightMenu()
        })
        rm.menuItems.music[2].addEventListener('click', () => {
            document.querySelector('meting-js').aplayer.skipForward()
            rm.hideRightMenu()
        })
        rm.menuItems.music[3].addEventListener('click', () => {
            const title = Array.from(document.querySelectorAll('.aplayer-title')).map(e => e.innerText)[0];
            rm.copyText(title)
        })
    }

    rm.menuItems.copy.addEventListener('click', () => {
        if (GLOBAL_CONFIG.copyright) {
            const {limit, author, link, source, info} = GLOBAL_CONFIG.copyright
            if (selectTextNow.length > limit) {
                selectTextNow = `${selectTextNow}\n\n${author}\n${link}${window.location.href}\n${source}\n${info}`
            }
        }
        rm.copyText(selectTextNow)
        rm.hideRightMenu()
    })

    rm.menuItems.paste.addEventListener('click', () => rm.pasteText() && rm.hideRightMenu())
    rm.menuItems.comment.addEventListener('click', () => rm.hideRightMenu() || sco.toTalk(selectTextNow))
    rm.menuItems.new.addEventListener('click', () => window.open(rm.domhref) && rm.hideRightMenu())
    rm.menuItems.downloadImg.addEventListener('click', () => rm.downloadImage() && rm.hideRightMenu())
    rm.menuItems.copyImg.addEventListener('click', () => rm.copyImage() && rm.hideRightMenu())
}()

right_menu = true