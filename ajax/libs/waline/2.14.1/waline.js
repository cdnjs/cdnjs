(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Waline", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Waline = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.version = _exports.pageviewCount = _exports.init = _exports.defaultLocales = _exports.commentCount = _exports.UserList = _exports.RecentComments = void 0;
  const e = ["nick", "mail", "link"],
    t = t => t.filter(t => e.includes(t)),
    n = e => new Promise((t, n) => {
      if (e.size > 128e3) return n(new Error("File too large! File size limit 128KB"));
      const r = new FileReader();
      r.readAsDataURL(e), r.onload = () => {
        var _r$result;
        return t(((_r$result = r.result) === null || _r$result === void 0 ? void 0 : _r$result.toString()) || "");
      }, r.onerror = n;
    }),
    r = e => !0 === e ? '<p class="wl-tex">Tex is not available in preview</p>' : '<span class="wl-tex">Tex is not available in preview</span>',
    i = e => {
      const t = async function (t) {
        let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return fetch(`https://api.giphy.com/v1/gifs/${t}?${new URLSearchParams({
          lang: e,
          limit: "20",
          rating: "g",
          api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp",
          ...n
        }).toString()}`).then(e => e.json()).then(_ref => {
          let {
            data: e
          } = _ref;
          return e.map(e => ({
            title: e.title,
            src: e.images.downsized_medium.url
          }));
        });
      };
      return {
        search: e => t("search", {
          q: e,
          offset: "0"
        }),
        default: () => t("trending", {}),
        more: function (e) {
          let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return t("search", {
            q: e,
            offset: n.toString()
          });
        }
      };
    },
    l = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"],
    o = new RegExp(`(${/[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/.source}|${/</.source})|((?:${/(?:^|\s)\/\/(.+?)$/gm.source})|(?:${/\/\*([\S\s]*?)\*\//gm.source}))`, "gmi"),
    s = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"],
    a = {},
    c = e => {
      let t = 0;
      return e.replace(o, (e, n, r) => {
        if (r) return `<span style="color: slategray">${r}</span>`;
        if ("<" === n) return "&lt;";
        let i;
        a[n] ? i = a[n] : (i = s[t], a[n] = i);
        const l = `<span style="color: #${i}">${n}</span>`;
        return t = ++t % s.length, l;
      });
    },
    u = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"],
    p = e => Object.fromEntries(e.map((e, t) => [u[t], e]));
  var d = p(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", "Please input comments between $0 and $1 words!\n Current word number: $2", "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]),
    h = p(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", "コメントは $0 から $1 ワードの間でなければなりません!\n 現在の単語番号: $2", "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]),
    f = p(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", "评论字数应在 $0 到 $1 字之间！\n当前字数：$2", "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]),
    g = p(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎評論", "來發評論吧~", "提交", "喜歡", "取消喜歡", "回覆", "取消回覆", "評論", "刷新", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登錄", "退出", "博主", "置頂", "字", "評論字數應在 $0 到 $1 字之間！\n當前字數：$2", "匿名", "潛水", "冒泡", "吐槽", "活躍", "話癆", "傳說", "表情包", "搜索表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "按倒序", "按正序", "按熱度", "你認為這篇文章怎麼樣？"]),
    m = p(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", "Favor enviar comentário com $0 a $1 palavras!\n Número de palavras atuais: $2", "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]),
    v = p(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", "Пожалуйста, введите комментарии от $0 до $1 слов!\nНомер текущего слова: $2", "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
  const y = {
      zh: f,
      "zh-cn": f,
      "zh-CN": f,
      "zh-tw": g,
      "zh-TW": g,
      en: d,
      "en-US": d,
      "en-us": d,
      jp: h,
      "jp-jp": h,
      "jp-JP": h,
      "pt-br": m,
      "pt-BR": m,
      ru: v,
      "ru-ru": v,
      "ru-RU": v
    },
    w = {
      "Content-Type": "application/json"
    },
    b = function (e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if ("object" == typeof e && e.errno) throw new TypeError(`${t} failed with ${e.errno}: ${e.errmsg}`);
      return e;
    },
    k = _ref2 => {
      let {
        serverURL: e,
        lang: t,
        paths: n,
        type: r,
        signal: i
      } = _ref2;
      return fetch(`${e}/article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`, {
        signal: i
      }).then(e => e.json());
    },
    x = _ref3 => {
      let {
        serverURL: e,
        lang: t,
        path: n,
        type: r,
        action: i
      } = _ref3;
      return fetch(`${e}/article?lang=${t}`, {
        method: "POST",
        headers: w,
        body: JSON.stringify({
          path: n,
          type: r,
          action: i
        })
      }).then(e => e.json());
    },
    _ = _ref4 => {
      let {
        serverURL: e,
        lang: t,
        token: n,
        objectId: r,
        ...i
      } = _ref4;
      return fetch(`${e}/comment/${r}?lang=${t}`, {
        method: "PUT",
        headers: {
          ...w,
          Authorization: `Bearer ${n}`
        },
        body: JSON.stringify(i)
      }).then(e => e.json()).then(e => b(e, "Update comment"));
    },
    C = e => {
      try {
        e = decodeURI(e);
      } catch (e) {}
      return e;
    },
    S = function () {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return e.replace(/\/$/u, "");
    },
    $ = e => /^(https?:)?\/\//.test(e),
    I = e => {
      const t = S(e);
      return $(t) ? t : `https://${t}`;
    },
    E = e => Array.isArray(e) ? e : !!e && [0, e],
    R = (e, t) => "function" == typeof e ? e : !1 !== e && t,
    L = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-bgcolor-hover: #444;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}",
    A = (e, t) => {
      let n = e.toString();
      for (; n.length < t;) n = "0" + n;
      return n;
    },
    z = (e, t, n) => {
      if (!e) return "";
      const r = "string" == typeof e ? new Date(-1 !== e.indexOf(" ") ? e.replace(/-/g, "/") : e) : e,
        i = t.getTime() - r.getTime(),
        l = Math.floor(i / 864e5);
      if (0 === l) {
        const e = i % 864e5,
          t = Math.floor(e / 36e5);
        if (0 === t) {
          const t = e % 36e5,
            r = Math.floor(t / 6e4);
          if (0 === r) {
            const e = t % 6e4;
            return `${Math.round(e / 1e3)} ${n.seconds}`;
          }
          return `${r} ${n.minutes}`;
        }
        return `${t} ${n.hours}`;
      }
      return l < 0 ? n.now : l < 8 ? `${l} ${n.days}` : (e => {
        const t = A(e.getDate(), 2),
          n = A(e.getMonth() + 1, 2);
        return `${A(e.getFullYear(), 2)}-${n}-${t}`;
      })(r);
    };
  _exports.defaultLocales = y;
  function O(e, t) {
    const n = Object.create(null),
      r = e.split(",");
    for (let e = 0; e < r.length; e++) n[r[e]] = !0;
    return t ? e => !!n[e.toLowerCase()] : e => !!n[e];
  }
  function j(e) {
    if (re(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          i = ae(r) ? M(r) : j(r);
        if (i) for (const e in i) t[e] = i[e];
      }
      return t;
    }
    return ae(e) || ue(e) ? e : void 0;
  }
  const T = /;(?![^(]*\))/g,
    P = /:([^]+)/,
    U = /\/\*.*?\*\//gs;
  function M(e) {
    const t = {};
    return e.replace(U, "").split(T).forEach(e => {
      if (e) {
        const n = e.split(P);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }), t;
  }
  function N(e) {
    let t = "";
    if (ae(e)) t = e;else if (re(e)) for (let n = 0; n < e.length; n++) {
      const r = N(e[n]);
      r && (t += r + " ");
    } else if (ue(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  const F = O("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
  function D(e) {
    return !!e || "" === e;
  }
  function V(e, t) {
    if (e === t) return !0;
    let n = oe(e),
      r = oe(t);
    if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
    if (n = ce(e), r = ce(t), n || r) return e === t;
    if (n = re(e), r = re(t), n || r) return !(!n || !r) && function (e, t) {
      if (e.length !== t.length) return !1;
      let n = !0;
      for (let r = 0; n && r < e.length; r++) n = V(e[r], t[r]);
      return n;
    }(e, t);
    if (n = ue(e), r = ue(t), n || r) {
      if (!n || !r) return !1;
      if (Object.keys(e).length !== Object.keys(t).length) return !1;
      for (const n in e) {
        const r = e.hasOwnProperty(n),
          i = t.hasOwnProperty(n);
        if (r && !i || !r && i || !V(e[n], t[n])) return !1;
      }
    }
    return String(e) === String(t);
  }
  function B(e, t) {
    return e.findIndex(e => V(e, t));
  }
  const H = e => ae(e) ? e : null == e ? "" : re(e) || ue(e) && (e.toString === de || !se(e.toString)) ? JSON.stringify(e, W, 2) : String(e),
    W = (e, t) => t && t.__v_isRef ? W(e, t.value) : ie(t) ? {
      [`Map(${t.size})`]: [...t.entries()].reduce((e, _ref5) => {
        let [t, n] = _ref5;
        return e[`${t} =>`] = n, e;
      }, {})
    } : le(t) ? {
      [`Set(${t.size})`]: [...t.values()]
    } : !ue(t) || re(t) || fe(t) ? t : String(t),
    q = {},
    Z = [],
    G = () => {},
    K = () => !1,
    Q = /^on[^a-z]/,
    J = e => Q.test(e),
    Y = e => e.startsWith("onUpdate:"),
    X = Object.assign,
    ee = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    te = Object.prototype.hasOwnProperty,
    ne = (e, t) => te.call(e, t),
    re = Array.isArray,
    ie = e => "[object Map]" === he(e),
    le = e => "[object Set]" === he(e),
    oe = e => "[object Date]" === he(e),
    se = e => "function" == typeof e,
    ae = e => "string" == typeof e,
    ce = e => "symbol" == typeof e,
    ue = e => null !== e && "object" == typeof e,
    pe = e => ue(e) && se(e.then) && se(e.catch),
    de = Object.prototype.toString,
    he = e => de.call(e),
    fe = e => "[object Object]" === he(e),
    ge = e => ae(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
    me = O(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    ve = e => {
      const t = Object.create(null);
      return n => t[n] || (t[n] = e(n));
    },
    ye = /-(\w)/g,
    we = ve(e => e.replace(ye, (e, t) => t ? t.toUpperCase() : "")),
    be = /\B([A-Z])/g,
    ke = ve(e => e.replace(be, "-$1").toLowerCase()),
    xe = ve(e => e.charAt(0).toUpperCase() + e.slice(1)),
    _e = ve(e => e ? `on${xe(e)}` : ""),
    Ce = (e, t) => !Object.is(e, t),
    Se = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t);
    },
    $e = (e, t, n) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
      });
    },
    Ie = e => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    };
  let Ee;
  let Re;
  class Le {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      this.detached = e, this.active = !0, this.effects = [], this.cleanups = [], this.parent = Re, !e && Re && (this.index = (Re.scopes || (Re.scopes = [])).push(this) - 1);
    }
    run(e) {
      if (this.active) {
        const t = Re;
        try {
          return Re = this, e();
        } finally {
          Re = t;
        }
      }
    }
    on() {
      Re = this;
    }
    off() {
      Re = this.parent;
    }
    stop(e) {
      if (this.active) {
        let t, n;
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
        for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
        if (!this.detached && this.parent && !e) {
          const e = this.parent.scopes.pop();
          e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
        }
        this.parent = void 0, this.active = !1;
      }
    }
  }
  const Ae = e => {
      const t = new Set(e);
      return t.w = 0, t.n = 0, t;
    },
    ze = e => (e.w & Pe) > 0,
    Oe = e => (e.n & Pe) > 0,
    je = new WeakMap();
  let Te = 0,
    Pe = 1;
  let Ue;
  const Me = Symbol(""),
    Ne = Symbol("");
  class Fe {
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      let n = arguments.length > 2 ? arguments[2] : undefined;
      this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0, function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Re;
        t && t.active && t.effects.push(e);
      }(this, n);
    }
    run() {
      if (!this.active) return this.fn();
      let e = Ue,
        t = Ve;
      for (; e;) {
        if (e === this) return;
        e = e.parent;
      }
      try {
        return this.parent = Ue, Ue = this, Ve = !0, Pe = 1 << ++Te, Te <= 30 ? (_ref6 => {
          let {
            deps: e
          } = _ref6;
          if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Pe;
        })(this) : De(this), this.fn();
      } finally {
        Te <= 30 && (e => {
          const {
            deps: t
          } = e;
          if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              ze(i) && !Oe(i) ? i.delete(e) : t[n++] = i, i.w &= ~Pe, i.n &= ~Pe;
            }
            t.length = n;
          }
        })(this), Pe = 1 << --Te, Ue = this.parent, Ve = t, this.parent = void 0, this.deferStop && this.stop();
      }
    }
    stop() {
      Ue === this ? this.deferStop = !0 : this.active && (De(this), this.onStop && this.onStop(), this.active = !1);
    }
  }
  function De(e) {
    const {
      deps: t
    } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  let Ve = !0;
  const Be = [];
  function He() {
    Be.push(Ve), Ve = !1;
  }
  function We() {
    const e = Be.pop();
    Ve = void 0 === e || e;
  }
  function qe(e, t, n) {
    if (Ve && Ue) {
      let t = je.get(e);
      t || je.set(e, t = new Map());
      let r = t.get(n);
      r || t.set(n, r = Ae()), Ze(r);
    }
  }
  function Ze(e, t) {
    let n = !1;
    Te <= 30 ? Oe(e) || (e.n |= Pe, n = !ze(e)) : n = !e.has(Ue), n && (e.add(Ue), Ue.deps.push(e));
  }
  function Ge(e, t, n, r, i, l) {
    const o = je.get(e);
    if (!o) return;
    let s = [];
    if ("clear" === t) s = [...o.values()];else if ("length" === n && re(e)) {
      const e = Ie(r);
      o.forEach((t, n) => {
        ("length" === n || n >= e) && s.push(t);
      });
    } else switch (void 0 !== n && s.push(o.get(n)), t) {
      case "add":
        re(e) ? ge(n) && s.push(o.get("length")) : (s.push(o.get(Me)), ie(e) && s.push(o.get(Ne)));
        break;
      case "delete":
        re(e) || (s.push(o.get(Me)), ie(e) && s.push(o.get(Ne)));
        break;
      case "set":
        ie(e) && s.push(o.get(Me));
    }
    if (1 === s.length) s[0] && Ke(s[0]);else {
      const e = [];
      for (const t of s) t && e.push(...t);
      Ke(Ae(e));
    }
  }
  function Ke(e, t) {
    const n = re(e) ? e : [...e];
    for (const e of n) e.computed && Qe(e);
    for (const e of n) e.computed || Qe(e);
  }
  function Qe(e, t) {
    (e !== Ue || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
  }
  const Je = O("__proto__,__v_isRef,__isVue"),
    Ye = new Set(Object.getOwnPropertyNames(Symbol).filter(e => "arguments" !== e && "caller" !== e).map(e => Symbol[e]).filter(ce)),
    Xe = it(),
    et = it(!1, !0),
    tt = it(!0),
    nt = rt();
  function rt() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
      e[t] = function () {
        const n = Vt(this);
        for (let e = 0, t = this.length; e < t; e++) qe(n, 0, e + "");
        for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
          e[_key] = arguments[_key];
        }
        const r = n[t](...e);
        return -1 === r || !1 === r ? n[t](...e.map(Vt)) : r;
      };
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
      e[t] = function () {
        He();
        for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          e[_key2] = arguments[_key2];
        }
        const n = Vt(this)[t].apply(this, e);
        return We(), n;
      };
    }), e;
  }
  function it() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    return function (n, r, i) {
      if ("__v_isReactive" === r) return !e;
      if ("__v_isReadonly" === r) return e;
      if ("__v_isShallow" === r) return t;
      if ("__v_raw" === r && i === (e ? t ? Ot : zt : t ? At : Lt).get(n)) return n;
      const l = re(n);
      if (!e && l && ne(nt, r)) return Reflect.get(nt, r, i);
      const o = Reflect.get(n, r, i);
      return (ce(r) ? Ye.has(r) : Je(r)) ? o : (e || qe(n, 0, r), t ? o : Gt(o) ? l && ge(r) ? o : o.value : ue(o) ? e ? Pt(o) : Tt(o) : o);
    };
  }
  function lt() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    return function (t, n, r, i) {
      let l = t[n];
      if (Nt(l) && Gt(l) && !Gt(r)) return !1;
      if (!e && (Ft(r) || Nt(r) || (l = Vt(l), r = Vt(r)), !re(t) && Gt(l) && !Gt(r))) return l.value = r, !0;
      const o = re(t) && ge(n) ? Number(n) < t.length : ne(t, n),
        s = Reflect.set(t, n, r, i);
      return t === Vt(i) && (o ? Ce(r, l) && Ge(t, "set", n, r) : Ge(t, "add", n, r)), s;
    };
  }
  const ot = {
      get: Xe,
      set: lt(),
      deleteProperty: function (e, t) {
        const n = ne(e, t),
          r = Reflect.deleteProperty(e, t);
        return r && n && Ge(e, "delete", t, void 0), r;
      },
      has: function (e, t) {
        const n = Reflect.has(e, t);
        return ce(t) && Ye.has(t) || qe(e, 0, t), n;
      },
      ownKeys: function (e) {
        return qe(e, 0, re(e) ? "length" : Me), Reflect.ownKeys(e);
      }
    },
    st = {
      get: tt,
      set: (e, t) => !0,
      deleteProperty: (e, t) => !0
    },
    at = X({}, ot, {
      get: et,
      set: lt(!0)
    }),
    ct = e => e,
    ut = e => Reflect.getPrototypeOf(e);
  function pt(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    const i = Vt(e = e.__v_raw),
      l = Vt(t);
    n || (t !== l && qe(i, 0, t), qe(i, 0, l));
    const {
        has: o
      } = ut(i),
      s = r ? ct : n ? Wt : Ht;
    return o.call(i, t) ? s(e.get(t)) : o.call(i, l) ? s(e.get(l)) : void (e !== i && e.get(t));
  }
  function dt(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    const n = this.__v_raw,
      r = Vt(n),
      i = Vt(e);
    return t || (e !== i && qe(r, 0, e), qe(r, 0, i)), e === i ? n.has(e) : n.has(e) || n.has(i);
  }
  function ht(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    return e = e.__v_raw, !t && qe(Vt(e), 0, Me), Reflect.get(e, "size", e);
  }
  function ft(e) {
    e = Vt(e);
    const t = Vt(this);
    return ut(t).has.call(t, e) || (t.add(e), Ge(t, "add", e, e)), this;
  }
  function gt(e, t) {
    t = Vt(t);
    const n = Vt(this),
      {
        has: r,
        get: i
      } = ut(n);
    let l = r.call(n, e);
    l || (e = Vt(e), l = r.call(n, e));
    const o = i.call(n, e);
    return n.set(e, t), l ? Ce(t, o) && Ge(n, "set", e, t) : Ge(n, "add", e, t), this;
  }
  function mt(e) {
    const t = Vt(this),
      {
        has: n,
        get: r
      } = ut(t);
    let i = n.call(t, e);
    i || (e = Vt(e), i = n.call(t, e)), r && r.call(t, e);
    const l = t.delete(e);
    return i && Ge(t, "delete", e, void 0), l;
  }
  function vt() {
    const e = Vt(this),
      t = 0 !== e.size,
      n = e.clear();
    return t && Ge(e, "clear", void 0, void 0), n;
  }
  function yt(e, t) {
    return function (n, r) {
      const i = this,
        l = i.__v_raw,
        o = Vt(l),
        s = t ? ct : e ? Wt : Ht;
      return !e && qe(o, 0, Me), l.forEach((e, t) => n.call(r, s(e), s(t), i));
    };
  }
  function wt(e, t, n) {
    return function () {
      const i = this.__v_raw,
        l = Vt(i),
        o = ie(l),
        s = "entries" === e || e === Symbol.iterator && o,
        a = "keys" === e && o,
        c = i[e](...arguments),
        u = n ? ct : t ? Wt : Ht;
      return !t && qe(l, 0, a ? Ne : Me), {
        next() {
          const {
            value: e,
            done: t
          } = c.next();
          return t ? {
            value: e,
            done: t
          } : {
            value: s ? [u(e[0]), u(e[1])] : u(e),
            done: t
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function bt(e) {
    return function () {
      return "delete" !== e && this;
    };
  }
  function kt() {
    const e = {
        get(e) {
          return pt(this, e);
        },
        get size() {
          return ht(this);
        },
        has: dt,
        add: ft,
        set: gt,
        delete: mt,
        clear: vt,
        forEach: yt(!1, !1)
      },
      t = {
        get(e) {
          return pt(this, e, !1, !0);
        },
        get size() {
          return ht(this);
        },
        has: dt,
        add: ft,
        set: gt,
        delete: mt,
        clear: vt,
        forEach: yt(!1, !0)
      },
      n = {
        get(e) {
          return pt(this, e, !0);
        },
        get size() {
          return ht(this, !0);
        },
        has(e) {
          return dt.call(this, e, !0);
        },
        add: bt("add"),
        set: bt("set"),
        delete: bt("delete"),
        clear: bt("clear"),
        forEach: yt(!0, !1)
      },
      r = {
        get(e) {
          return pt(this, e, !0, !0);
        },
        get size() {
          return ht(this, !0);
        },
        has(e) {
          return dt.call(this, e, !0);
        },
        add: bt("add"),
        set: bt("set"),
        delete: bt("delete"),
        clear: bt("clear"),
        forEach: yt(!0, !0)
      };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
      e[i] = wt(i, !1, !1), n[i] = wt(i, !0, !1), t[i] = wt(i, !1, !0), r[i] = wt(i, !0, !0);
    }), [e, n, t, r];
  }
  const [xt, _t, Ct, St] = kt();
  function $t(e, t) {
    const n = t ? e ? St : Ct : e ? _t : xt;
    return (t, r, i) => "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(ne(n, r) && r in t ? n : t, r, i);
  }
  const It = {
      get: $t(!1, !1)
    },
    Et = {
      get: $t(!1, !0)
    },
    Rt = {
      get: $t(!0, !1)
    },
    Lt = new WeakMap(),
    At = new WeakMap(),
    zt = new WeakMap(),
    Ot = new WeakMap();
  function jt(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : function (e) {
      switch (e) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }((e => he(e).slice(8, -1))(e));
  }
  function Tt(e) {
    return Nt(e) ? e : Ut(e, !1, ot, It, Lt);
  }
  function Pt(e) {
    return Ut(e, !0, st, Rt, zt);
  }
  function Ut(e, t, n, r, i) {
    if (!ue(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const l = i.get(e);
    if (l) return l;
    const o = jt(e);
    if (0 === o) return e;
    const s = new Proxy(e, 2 === o ? r : n);
    return i.set(e, s), s;
  }
  function Mt(e) {
    return Nt(e) ? Mt(e.__v_raw) : !(!e || !e.__v_isReactive);
  }
  function Nt(e) {
    return !(!e || !e.__v_isReadonly);
  }
  function Ft(e) {
    return !(!e || !e.__v_isShallow);
  }
  function Dt(e) {
    return Mt(e) || Nt(e);
  }
  function Vt(e) {
    const t = e && e.__v_raw;
    return t ? Vt(t) : e;
  }
  function Bt(e) {
    return $e(e, "__v_skip", !0), e;
  }
  const Ht = e => ue(e) ? Tt(e) : e,
    Wt = e => ue(e) ? Pt(e) : e;
  function qt(e) {
    Ve && Ue && Ze((e = Vt(e)).dep || (e.dep = Ae()));
  }
  function Zt(e, t) {
    (e = Vt(e)).dep && Ke(e.dep);
  }
  function Gt(e) {
    return !(!e || !0 !== e.__v_isRef);
  }
  function Kt(e) {
    return Jt(e, !1);
  }
  function Qt(e) {
    return Jt(e, !0);
  }
  function Jt(e, t) {
    return Gt(e) ? e : new Yt(e, t);
  }
  class Yt {
    constructor(e, t) {
      this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Vt(e), this._value = t ? e : Ht(e);
    }
    get value() {
      return qt(this), this._value;
    }
    set value(e) {
      const t = this.__v_isShallow || Ft(e) || Nt(e);
      e = t ? e : Vt(e), Ce(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : Ht(e), Zt(this));
    }
  }
  function Xt(e) {
    return Gt(e) ? e.value : e;
  }
  const en = {
    get: (e, t, n) => Xt(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
      const i = e[t];
      return Gt(i) && !Gt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
    }
  };
  function tn(e) {
    return Mt(e) ? e : new Proxy(e, en);
  }
  var nn;
  class rn {
    constructor(e, t, n, r) {
      this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[nn] = !1, this._dirty = !0, this.effect = new Fe(e, () => {
        this._dirty || (this._dirty = !0, Zt(this));
      }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n;
    }
    get value() {
      const e = Vt(this);
      return qt(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value;
    }
    set value(e) {
      this._setter(e);
    }
  }
  function ln(e, t, n, r) {
    let i;
    try {
      i = r ? e(...r) : e();
    } catch (e) {
      sn(e, t, n);
    }
    return i;
  }
  function on(e, t, n, r) {
    if (se(e)) {
      const i = ln(e, t, n, r);
      return i && pe(i) && i.catch(e => {
        sn(e, t, n);
      }), i;
    }
    const i = [];
    for (let l = 0; l < e.length; l++) i.push(on(e[l], t, n, r));
    return i;
  }
  function sn(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    t && t.vnode;
    if (t) {
      let r = t.parent;
      const i = t.proxy,
        l = n;
      for (; r;) {
        const t = r.ec;
        if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, i, l)) return;
        r = r.parent;
      }
      const o = t.appContext.config.errorHandler;
      if (o) return void ln(o, null, 10, [e, i, l]);
    }
    !function (e, t, n) {
      let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
      console.error(e);
    }(e, 0, 0, r);
  }
  nn = "__v_isReadonly";
  let an = !1,
    cn = !1;
  const un = [];
  let pn = 0;
  const dn = [];
  let hn = null,
    fn = 0;
  const gn = Promise.resolve();
  let mn = null;
  function vn(e) {
    const t = mn || gn;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function yn(e) {
    un.length && un.includes(e, an && e.allowRecurse ? pn + 1 : pn) || (null == e.id ? un.push(e) : un.splice(function (e) {
      let t = pn + 1,
        n = un.length;
      for (; t < n;) {
        const r = t + n >>> 1;
        xn(un[r]) < e ? t = r + 1 : n = r;
      }
      return t;
    }(e.id), 0, e), wn());
  }
  function wn() {
    an || cn || (cn = !0, mn = gn.then(Cn));
  }
  function bn(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : an ? pn + 1 : 0;
    for (; t < un.length; t++) {
      const e = un[t];
      e && e.pre && (un.splice(t, 1), t--, e());
    }
  }
  function kn(e) {
    if (dn.length) {
      const e = [...new Set(dn)];
      if (dn.length = 0, hn) return void hn.push(...e);
      for (hn = e, hn.sort((e, t) => xn(e) - xn(t)), fn = 0; fn < hn.length; fn++) hn[fn]();
      hn = null, fn = 0;
    }
  }
  const xn = e => null == e.id ? 1 / 0 : e.id,
    _n = (e, t) => {
      const n = xn(e) - xn(t);
      if (0 === n) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1;
      }
      return n;
    };
  function Cn(e) {
    cn = !1, an = !0, un.sort(_n);
    try {
      for (pn = 0; pn < un.length; pn++) {
        const e = un[pn];
        e && !1 !== e.active && ln(e, null, 14);
      }
    } finally {
      pn = 0, un.length = 0, kn(), an = !1, mn = null, (un.length || dn.length) && Cn();
    }
  }
  function Sn(e, t) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || q;
    for (var _len3 = arguments.length, n = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      n[_key3 - 2] = arguments[_key3];
    }
    let i = n;
    const l = t.startsWith("update:"),
      o = l && t.slice(7);
    if (o && o in r) {
      const e = `${"modelValue" === o ? "model" : o}Modifiers`,
        {
          number: t,
          trim: l
        } = r[e] || q;
      l && (i = n.map(e => ae(e) ? e.trim() : e)), t && (i = n.map(Ie));
    }
    let s,
      a = r[s = _e(t)] || r[s = _e(we(t))];
    !a && l && (a = r[s = _e(ke(t))]), a && on(a, e, 6, i);
    const c = r[s + "Once"];
    if (c) {
      if (e.emitted) {
        if (e.emitted[s]) return;
      } else e.emitted = {};
      e.emitted[s] = !0, on(c, e, 6, i);
    }
  }
  function $n(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    const r = t.emitsCache,
      i = r.get(e);
    if (void 0 !== i) return i;
    const l = e.emits;
    let o = {};
    return l ? (re(l) ? l.forEach(e => o[e] = null) : X(o, l), ue(e) && r.set(e, o), o) : (ue(e) && r.set(e, null), null);
  }
  function In(e, t) {
    return !(!e || !J(t)) && (t = t.slice(2).replace(/Once$/, ""), ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, ke(t)) || ne(e, t));
  }
  let En = null,
    Rn = null;
  function Ln(e) {
    const t = En;
    return En = e, Rn = e && e.type.__scopeId || null, t;
  }
  function An(e) {
    const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: i,
      props: l,
      propsOptions: [o],
      slots: s,
      attrs: a,
      emit: c,
      render: u,
      renderCache: p,
      data: d,
      setupState: h,
      ctx: f,
      inheritAttrs: g
    } = e;
    let m, v;
    const y = Ln(e);
    try {
      if (4 & n.shapeFlag) {
        const e = i || r;
        m = qr(u.call(e, e, p, l, h, d, f)), v = a;
      } else {
        const e = t;
        m = qr(e.length > 1 ? e(l, {
          attrs: a,
          slots: s,
          emit: c
        }) : e(l, null)), v = t.props ? a : zn(a);
      }
    } catch (t) {
      Er.length = 0, sn(t, e, 1), m = Vr($r);
    }
    let w = m;
    if (v && !1 !== g) {
      const e = Object.keys(v),
        {
          shapeFlag: t
        } = w;
      e.length && 7 & t && (o && e.some(Y) && (v = On(v, o)), w = Br(w, v));
    }
    return n.dirs && (w = Br(w), w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs), n.transition && (w.transition = n.transition), m = w, Ln(y), m;
  }
  const zn = e => {
      let t;
      for (const n in e) ("class" === n || "style" === n || J(n)) && ((t || (t = {}))[n] = e[n]);
      return t;
    },
    On = (e, t) => {
      const n = {};
      for (const r in e) Y(r) && r.slice(9) in t || (n[r] = e[r]);
      return n;
    };
  function jn(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      if (t[l] !== e[l] && !In(n, l)) return !0;
    }
    return !1;
  }
  function Tn(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    const r = Yr || En;
    if (r) {
      const i = null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
      if (i && e in i) return i[e];
      if (arguments.length > 1) return n && se(t) ? t.call(r.proxy) : t;
    }
  }
  function Pn(e, t) {
    return Nn(e, null, t);
  }
  const Un = {};
  function Mn(e, t, n) {
    return Nn(e, t, n);
  }
  function Nn(e, t) {
    let {
      immediate: n,
      deep: r,
      flush: i,
      onTrack: l,
      onTrigger: o
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : q;
    const s = Yr;
    let a,
      c,
      u = !1,
      p = !1;
    if (Gt(e) ? (a = () => e.value, u = Ft(e)) : Mt(e) ? (a = () => e, r = !0) : re(e) ? (p = !0, u = e.some(e => Mt(e) || Ft(e)), a = () => e.map(e => Gt(e) ? e.value : Mt(e) ? Fn(e) : se(e) ? ln(e, s, 2) : void 0)) : a = se(e) ? t ? () => ln(e, s, 2) : () => {
      if (!s || !s.isUnmounted) return c && c(), on(e, s, 3, [h]);
    } : G, t && r) {
      const e = a;
      a = () => Fn(e());
    }
    let d,
      h = e => {
        c = v.onStop = () => {
          ln(e, s, 4);
        };
      };
    if (ni) {
      if (h = G, t ? n && on(t, s, 3, [a(), p ? [] : void 0, h]) : a(), "sync" !== i) return G;
      {
        const e = ci();
        d = e.__watcherHandles || (e.__watcherHandles = []);
      }
    }
    let f = p ? new Array(e.length).fill(Un) : Un;
    const g = () => {
      if (v.active) if (t) {
        const e = v.run();
        (r || u || (p ? e.some((e, t) => Ce(e, f[t])) : Ce(e, f))) && (c && c(), on(t, s, 3, [e, f === Un ? void 0 : p && f[0] === Un ? [] : f, h]), f = e);
      } else v.run();
    };
    let m;
    g.allowRecurse = !!t, "sync" === i ? m = g : "post" === i ? m = () => br(g, s && s.suspense) : (g.pre = !0, s && (g.id = s.uid), m = () => yn(g));
    const v = new Fe(a, m);
    t ? n ? g() : f = v.run() : "post" === i ? br(v.run.bind(v), s && s.suspense) : v.run();
    const y = () => {
      v.stop(), s && s.scope && ee(s.scope.effects, v);
    };
    return d && d.push(y), y;
  }
  function Fn(e, t) {
    if (!ue(e) || e.__v_skip) return e;
    if ((t = t || new Set()).has(e)) return e;
    if (t.add(e), Gt(e)) Fn(e.value, t);else if (re(e)) for (let n = 0; n < e.length; n++) Fn(e[n], t);else if (le(e) || ie(e)) e.forEach(e => {
      Fn(e, t);
    });else if (fe(e)) for (const n in e) Fn(e[n], t);
    return e;
  }
  function Dn(e) {
    return se(e) ? {
      setup: e,
      name: e.name
    } : e;
  }
  const Vn = e => !!e.type.__asyncLoader;
  const Bn = e => function (t) {
      let n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Yr;
      return (!ni || "sp" === e) && function (e, t) {
        let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Yr;
        let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        if (n) {
          const i = n[e] || (n[e] = []),
            l = t.__weh || (t.__weh = function () {
              if (n.isUnmounted) return;
              He(), Xr(n);
              for (var _len4 = arguments.length, r = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                r[_key4] = arguments[_key4];
              }
              const i = on(t, n, e, r);
              return ei(), We(), i;
            });
          return r ? i.unshift(l) : i.push(l), l;
        }
      }(e, function () {
        return t(...arguments);
      }, n);
    },
    Hn = Bn("m"),
    Wn = Bn("bum"),
    qn = Bn("um");
  function Zn(e, t) {
    const n = En;
    if (null === n) return e;
    const r = li(n) || n.proxy,
      i = e.dirs || (e.dirs = []);
    for (let e = 0; e < t.length; e++) {
      let [n, l, o, s = q] = t[e];
      n && (se(n) && (n = {
        mounted: n,
        updated: n
      }), n.deep && Fn(l), i.push({
        dir: n,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: o,
        modifiers: s
      }));
    }
    return e;
  }
  function Gn(e, t, n, r) {
    const i = e.dirs,
      l = t && t.dirs;
    for (let o = 0; o < i.length; o++) {
      const s = i[o];
      l && (s.oldValue = l[o].value);
      let a = s.dir[r];
      a && (He(), on(a, n, 8, [e.el, s, e, t]), We());
    }
  }
  function Kn(e, t) {
    return function (e, t) {
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      const i = En || Yr;
      if (i) {
        const n = i.type;
        if ("components" === e) {
          const e = function (e) {
            let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
            return se(e) ? e.displayName || e.name : e.name || t && e.__name;
          }(n, !1);
          if (e && (e === t || e === we(t) || e === xe(we(t)))) return n;
        }
        const l = Jn(i[e] || n[e], t) || Jn(i.appContext[e], t);
        return !l && r ? n : l;
      }
    }("components", e, !0, t) || e;
  }
  const Qn = Symbol();
  function Jn(e, t) {
    return e && (e[t] || e[we(t)] || e[xe(we(t))]);
  }
  function Yn(e, t, n, r) {
    let i;
    const l = n && n[r];
    if (re(e) || ae(e)) {
      i = new Array(e.length);
      for (let n = 0, r = e.length; n < r; n++) i[n] = t(e[n], n, void 0, l && l[n]);
    } else if ("number" == typeof e) {
      i = new Array(e);
      for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, l && l[n]);
    } else if (ue(e)) {
      if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, l && l[n]));else {
        const n = Object.keys(e);
        i = new Array(n.length);
        for (let r = 0, o = n.length; r < o; r++) {
          const o = n[r];
          i[r] = t(e[o], o, r, l && l[r]);
        }
      }
    } else i = [];
    return n && (n[r] = i), i;
  }
  const Xn = e => e ? ti(e) ? li(e) || e.proxy : Xn(e.parent) : null,
    er = X(Object.create(null), {
      $: e => e,
      $el: e => e.vnode.el,
      $data: e => e.data,
      $props: e => e.props,
      $attrs: e => e.attrs,
      $slots: e => e.slots,
      $refs: e => e.refs,
      $parent: e => Xn(e.parent),
      $root: e => Xn(e.root),
      $emit: e => e.emit,
      $options: e => e.type,
      $forceUpdate: e => e.f || (e.f = () => yn(e.update)),
      $nextTick: e => e.n || (e.n = vn.bind(e.proxy)),
      $watch: e => G
    }),
    tr = (e, t) => e !== q && !e.__isScriptSetup && ne(e, t),
    nr = {
      get(_ref7, t) {
        let {
          _: e
        } = _ref7;
        const {
          ctx: n,
          setupState: r,
          data: i,
          props: l,
          accessCache: o,
          type: s,
          appContext: a
        } = e;
        let c;
        if ("$" !== t[0]) {
          const s = o[t];
          if (void 0 !== s) switch (s) {
            case 1:
              return r[t];
            case 2:
              return i[t];
            case 4:
              return n[t];
            case 3:
              return l[t];
          } else {
            if (tr(r, t)) return o[t] = 1, r[t];
            if (i !== q && ne(i, t)) return o[t] = 2, i[t];
            if ((c = e.propsOptions[0]) && ne(c, t)) return o[t] = 3, l[t];
            if (n !== q && ne(n, t)) return o[t] = 4, n[t];
            o[t] = 0;
          }
        }
        const u = er[t];
        let p, d;
        return u ? ("$attrs" === t && qe(e, 0, t), u(e)) : (p = s.__cssModules) && (p = p[t]) ? p : n !== q && ne(n, t) ? (o[t] = 4, n[t]) : (d = a.config.globalProperties, ne(d, t) ? d[t] : void 0);
      },
      set(_ref8, t, n) {
        let {
          _: e
        } = _ref8;
        const {
          data: r,
          setupState: i,
          ctx: l
        } = e;
        return tr(i, t) ? (i[t] = n, !0) : r !== q && ne(r, t) ? (r[t] = n, !0) : !ne(e.props, t) && ("$" !== t[0] || !(t.slice(1) in e)) && (l[t] = n, !0);
      },
      has(_ref9, o) {
        let {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: r,
            appContext: i,
            propsOptions: l
          }
        } = _ref9;
        let s;
        return !!n[o] || e !== q && ne(e, o) || tr(t, o) || (s = l[0]) && ne(s, o) || ne(r, o) || ne(er, o) || ne(i.config.globalProperties, o);
      },
      defineProperty(e, t, n) {
        return null != n.get ? e._.accessCache[t] = 0 : ne(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
      }
    };
  function rr(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    const i = {},
      l = {};
    $e(l, Mr, 1), e.propsDefaults = Object.create(null), ir(e, t, i, l);
    for (const t in e.propsOptions[0]) t in i || (i[t] = void 0);
    n ? e.props = r ? i : Ut(i, !1, at, Et, At) : e.type.props ? e.props = i : e.props = l, e.attrs = l;
  }
  function ir(e, t, n, r) {
    const [i, l] = e.propsOptions;
    let o,
      s = !1;
    if (t) for (let a in t) {
      if (me(a)) continue;
      const c = t[a];
      let u;
      i && ne(i, u = we(a)) ? l && l.includes(u) ? (o || (o = {}))[u] = c : n[u] = c : In(e.emitsOptions, a) || a in r && c === r[a] || (r[a] = c, s = !0);
    }
    if (l) {
      const t = Vt(n),
        r = o || q;
      for (let o = 0; o < l.length; o++) {
        const s = l[o];
        n[s] = lr(i, t, s, r[s], e, !ne(r, s));
      }
    }
    return s;
  }
  function lr(e, t, n, r, i, l) {
    const o = e[n];
    if (null != o) {
      const e = ne(o, "default");
      if (e && void 0 === r) {
        const e = o.default;
        if (o.type !== Function && se(e)) {
          const {
            propsDefaults: l
          } = i;
          n in l ? r = l[n] : (Xr(i), r = l[n] = e.call(null, t), ei());
        } else r = e;
      }
      o[0] && (l && !e ? r = !1 : !o[1] || "" !== r && r !== ke(n) || (r = !0));
    }
    return r;
  }
  function or(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    const r = t.propsCache,
      i = r.get(e);
    if (i) return i;
    const l = e.props,
      o = {},
      s = [];
    if (!l) return ue(e) && r.set(e, Z), Z;
    if (re(l)) for (let e = 0; e < l.length; e++) {
      const t = we(l[e]);
      sr(t) && (o[t] = q);
    } else if (l) for (const e in l) {
      const t = we(e);
      if (sr(t)) {
        const n = l[e],
          r = o[t] = re(n) || se(n) ? {
            type: n
          } : Object.assign({}, n);
        if (r) {
          const e = ur(Boolean, r.type),
            n = ur(String, r.type);
          r[0] = e > -1, r[1] = n < 0 || e < n, (e > -1 || ne(r, "default")) && s.push(t);
        }
      }
    }
    const a = [o, s];
    return ue(e) && r.set(e, a), a;
  }
  function sr(e) {
    return "$" !== e[0];
  }
  function ar(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : null === e ? "null" : "";
  }
  function cr(e, t) {
    return ar(e) === ar(t);
  }
  function ur(e, t) {
    return re(t) ? t.findIndex(t => cr(t, e)) : se(t) && cr(t, e) ? 0 : -1;
  }
  const pr = e => "_" === e[0] || "$stable" === e,
    dr = e => re(e) ? e.map(qr) : [qr(e)],
    hr = (e, t, n) => {
      if (t._n) return t;
      const r = function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : En;
        let n = arguments.length > 2 ? arguments[2] : undefined;
        if (!t) return e;
        if (e._n) return e;
        const r = function () {
          r._d && zr(-1);
          const i = Ln(t);
          let l;
          try {
            l = e(...arguments);
          } finally {
            Ln(i), r._d && zr(1);
          }
          return l;
        };
        return r._n = !0, r._c = !0, r._d = !0, r;
      }(function () {
        return dr(t(...arguments));
      }, n);
      return r._c = !1, r;
    },
    fr = (e, t, n) => {
      const r = e._ctx;
      for (const n in e) {
        if (pr(n)) continue;
        const i = e[n];
        if (se(i)) t[n] = hr(0, i, r);else if (null != i) {
          const e = dr(i);
          t[n] = () => e;
        }
      }
    },
    gr = (e, t) => {
      const n = dr(t);
      e.slots.default = () => n;
    };
  function mr() {
    return {
      app: null,
      config: {
        isNativeTag: K,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap()
    };
  }
  let vr = 0;
  function yr(e, t) {
    return function (n) {
      let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      se(n) || (n = Object.assign({}, n)), null == r || ue(r) || (r = null);
      const i = mr(),
        l = new Set();
      let o = !1;
      const s = i.app = {
        _uid: vr++,
        _component: n,
        _props: r,
        _container: null,
        _context: i,
        _instance: null,
        version: ui,
        get config() {
          return i.config;
        },
        set config(e) {},
        use: function (e) {
          for (var _len5 = arguments.length, t = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            t[_key5 - 1] = arguments[_key5];
          }
          return l.has(e) || (e && se(e.install) ? (l.add(e), e.install(s, ...t)) : se(e) && (l.add(e), e(s, ...t))), s;
        },
        mixin: e => s,
        component: (e, t) => t ? (i.components[e] = t, s) : i.components[e],
        directive: (e, t) => t ? (i.directives[e] = t, s) : i.directives[e],
        mount(l, a, c) {
          if (!o) {
            const u = Vr(n, r);
            return u.appContext = i, a && t ? t(u, l) : e(u, l, c), o = !0, s._container = l, l.__vue_app__ = s, li(u.component) || u.component.proxy;
          }
        },
        unmount() {
          o && (e(null, s._container), delete s._container.__vue_app__);
        },
        provide: (e, t) => (i.provides[e] = t, s)
      };
      return s;
    };
  }
  function wr(e, t, n, r) {
    let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    if (re(e)) return void e.forEach((e, l) => wr(e, t && (re(t) ? t[l] : t), n, r, i));
    if (Vn(r) && !i) return;
    const l = 4 & r.shapeFlag ? li(r.component) || r.component.proxy : r.el,
      o = i ? null : l,
      {
        i: s,
        r: a
      } = e,
      c = t && t.r,
      u = s.refs === q ? s.refs = {} : s.refs,
      p = s.setupState;
    if (null != c && c !== a && (ae(c) ? (u[c] = null, ne(p, c) && (p[c] = null)) : Gt(c) && (c.value = null)), se(a)) ln(a, s, 12, [o, u]);else {
      const t = ae(a),
        r = Gt(a);
      if (t || r) {
        const s = () => {
          if (e.f) {
            const n = t ? ne(p, a) ? p[a] : u[a] : a.value;
            i ? re(n) && ee(n, l) : re(n) ? n.includes(l) || n.push(l) : t ? (u[a] = [l], ne(p, a) && (p[a] = u[a])) : (a.value = [l], e.k && (u[e.k] = a.value));
          } else t ? (u[a] = o, ne(p, a) && (p[a] = o)) : r && (a.value = o, e.k && (u[e.k] = o));
        };
        o ? (s.id = -1, br(s, n)) : s();
      }
    }
  }
  const br = function (e, t) {
    var n;
    t && t.pendingBranch ? re(e) ? t.effects.push(...e) : t.effects.push(e) : (re(n = e) ? dn.push(...n) : hn && hn.includes(n, n.allowRecurse ? fn + 1 : fn) || dn.push(n), wn());
  };
  function kr(e) {
    return function (e, t) {
      (Ee || (Ee = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
      const {
          insert: n,
          remove: r,
          patchProp: i,
          createElement: l,
          createText: o,
          createComment: s,
          setText: a,
          setElementText: c,
          parentNode: u,
          nextSibling: p,
          setScopeId: d = G,
          insertStaticContent: h
        } = e,
        f = function (e, t, n) {
          let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
          let l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
          let o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : !1;
          let s = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
          let a = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : !!t.dynamicChildren;
          if (e === t) return;
          e && !Ur(e, t) && (r = V(e), U(e, i, l, !0), e = null), -2 === t.patchFlag && (a = !1, t.dynamicChildren = null);
          const {
            type: c,
            ref: u,
            shapeFlag: p
          } = t;
          switch (c) {
            case Sr:
              g(e, t, n, r);
              break;
            case $r:
              m(e, t, n, r);
              break;
            case Ir:
              null == e && v(t, n, r, o);
              break;
            case Cr:
              I(e, t, n, r, i, l, o, s, a);
              break;
            default:
              1 & p ? b(e, t, n, r, i, l, o, s, a) : 6 & p ? E(e, t, n, r, i, l, o, s, a) : (64 & p || 128 & p) && c.process(e, t, n, r, i, l, o, s, a, H);
          }
          null != u && i && wr(u, e && e.ref, l, t || e, !t);
        },
        g = (e, t, r, i) => {
          if (null == e) n(t.el = o(t.children), r, i);else {
            const n = t.el = e.el;
            t.children !== e.children && a(n, t.children);
          }
        },
        m = (e, t, r, i) => {
          null == e ? n(t.el = s(t.children || ""), r, i) : t.el = e.el;
        },
        v = (e, t, n, r) => {
          [e.el, e.anchor] = h(e.children, t, n, r, e.el, e.anchor);
        },
        y = (_ref10, r, i) => {
          let {
            el: e,
            anchor: t
          } = _ref10;
          let l;
          for (; e && e !== t;) l = p(e), n(e, r, i), e = l;
          n(t, r, i);
        },
        w = _ref11 => {
          let {
            el: e,
            anchor: t
          } = _ref11;
          let n;
          for (; e && e !== t;) n = p(e), r(e), e = n;
          r(t);
        },
        b = (e, t, n, r, i, l, o, s, a) => {
          o = o || "svg" === t.type, null == e ? k(t, n, r, i, l, o, s, a) : C(e, t, i, l, o, s, a);
        },
        k = (e, t, r, o, s, a, u, p) => {
          let d, h;
          const {
            type: f,
            props: g,
            shapeFlag: m,
            transition: v,
            dirs: y
          } = e;
          if (d = e.el = l(e.type, a, g && g.is, g), 8 & m ? c(d, e.children) : 16 & m && _(e.children, d, null, o, s, a && "foreignObject" !== f, u, p), y && Gn(e, null, o, "created"), g) {
            for (const t in g) "value" === t || me(t) || i(d, t, null, g[t], a, e.children, o, s, D);
            "value" in g && i(d, "value", null, g.value), (h = g.onVnodeBeforeMount) && Kr(h, o, e);
          }
          x(d, e, e.scopeId, u, o), y && Gn(e, null, o, "beforeMount");
          const w = (!s || s && !s.pendingBranch) && v && !v.persisted;
          w && v.beforeEnter(d), n(d, t, r), ((h = g && g.onVnodeMounted) || w || y) && br(() => {
            h && Kr(h, o, e), w && v.enter(d), y && Gn(e, null, o, "mounted");
          }, s);
        },
        x = (e, t, n, r, i) => {
          if (n && d(e, n), r) for (let t = 0; t < r.length; t++) d(e, r[t]);
          if (i) {
            if (t === i.subTree) {
              const t = i.vnode;
              x(e, t, t.scopeId, t.slotScopeIds, i.parent);
            }
          }
        },
        _ = function (e, t, n, r, i, l, o, s) {
          let a = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
          for (let c = a; c < e.length; c++) {
            const a = e[c] = s ? Zr(e[c]) : qr(e[c]);
            f(null, a, t, n, r, i, l, o, s);
          }
        },
        C = (e, t, n, r, l, o, s) => {
          const a = t.el = e.el;
          let {
            patchFlag: u,
            dynamicChildren: p,
            dirs: d
          } = t;
          u |= 16 & e.patchFlag;
          const h = e.props || q,
            f = t.props || q;
          let g;
          n && xr(n, !1), (g = f.onVnodeBeforeUpdate) && Kr(g, n, t, e), d && Gn(t, e, n, "beforeUpdate"), n && xr(n, !0);
          const m = l && "foreignObject" !== t.type;
          if (p ? S(e.dynamicChildren, p, a, n, r, m, o) : s || O(e, t, a, null, n, r, m, o, !1), u > 0) {
            if (16 & u) $(a, t, h, f, n, r, l);else if (2 & u && h.class !== f.class && i(a, "class", null, f.class, l), 4 & u && i(a, "style", h.style, f.style, l), 8 & u) {
              const o = t.dynamicProps;
              for (let t = 0; t < o.length; t++) {
                const s = o[t],
                  c = h[s],
                  u = f[s];
                u === c && "value" !== s || i(a, s, c, u, l, e.children, n, r, D);
              }
            }
            1 & u && e.children !== t.children && c(a, t.children);
          } else s || null != p || $(a, t, h, f, n, r, l);
          ((g = f.onVnodeUpdated) || d) && br(() => {
            g && Kr(g, n, t, e), d && Gn(t, e, n, "updated");
          }, r);
        },
        S = (e, t, n, r, i, l, o) => {
          for (let s = 0; s < t.length; s++) {
            const a = e[s],
              c = t[s],
              p = a.el && (a.type === Cr || !Ur(a, c) || 70 & a.shapeFlag) ? u(a.el) : n;
            f(a, c, p, null, r, i, l, o, !0);
          }
        },
        $ = (e, t, n, r, l, o, s) => {
          if (n !== r) {
            if (n !== q) for (const a in n) me(a) || a in r || i(e, a, n[a], null, s, t.children, l, o, D);
            for (const a in r) {
              if (me(a)) continue;
              const c = r[a],
                u = n[a];
              c !== u && "value" !== a && i(e, a, u, c, s, t.children, l, o, D);
            }
            "value" in r && i(e, "value", n.value, r.value);
          }
        },
        I = (e, t, r, i, l, s, a, c, u) => {
          const p = t.el = e ? e.el : o(""),
            d = t.anchor = e ? e.anchor : o("");
          let {
            patchFlag: h,
            dynamicChildren: f,
            slotScopeIds: g
          } = t;
          g && (c = c ? c.concat(g) : g), null == e ? (n(p, r, i), n(d, r, i), _(t.children, r, d, l, s, a, c, u)) : h > 0 && 64 & h && f && e.dynamicChildren ? (S(e.dynamicChildren, f, r, l, s, a, c), (null != t.key || l && t === l.subTree) && _r(e, t, !0)) : O(e, t, r, d, l, s, a, c, u);
        },
        E = (e, t, n, r, i, l, o, s, a) => {
          t.slotScopeIds = s, null == e ? 512 & t.shapeFlag ? i.ctx.activate(t, n, r, o, a) : R(t, n, r, i, l, o, a) : L(e, t, a);
        },
        R = (e, t, n, r, i, l, o) => {
          const s = e.component = function (e, t, n) {
            const r = e.type,
              i = (t ? t.appContext : e.appContext) || Qr,
              l = {
                uid: Jr++,
                vnode: e,
                type: r,
                parent: t,
                appContext: i,
                root: null,
                next: null,
                subTree: null,
                effect: null,
                update: null,
                scope: new Le(!0),
                render: null,
                proxy: null,
                exposed: null,
                exposeProxy: null,
                withProxy: null,
                provides: t ? t.provides : Object.create(i.provides),
                accessCache: null,
                renderCache: [],
                components: null,
                directives: null,
                propsOptions: or(r, i),
                emitsOptions: $n(r, i),
                emit: null,
                emitted: null,
                propsDefaults: q,
                inheritAttrs: r.inheritAttrs,
                ctx: q,
                data: q,
                props: q,
                attrs: q,
                slots: q,
                refs: q,
                setupState: q,
                setupContext: null,
                suspense: n,
                suspenseId: n ? n.pendingId : 0,
                asyncDep: null,
                asyncResolved: !1,
                isMounted: !1,
                isUnmounted: !1,
                isDeactivated: !1,
                bc: null,
                c: null,
                bm: null,
                m: null,
                bu: null,
                u: null,
                um: null,
                bum: null,
                da: null,
                a: null,
                rtg: null,
                rtc: null,
                ec: null,
                sp: null
              };
            l.ctx = {
              _: l
            }, l.root = t ? t.root : l, l.emit = Sn.bind(null, l), e.ce && e.ce(l);
            return l;
          }(e, r, i);
          if (e.type.__isKeepAlive && (s.ctx.renderer = H), function (e) {
            let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
            ni = t;
            const {
                props: n,
                children: r
              } = e.vnode,
              i = ti(e);
            rr(e, n, i, t), ((e, t) => {
              if (32 & e.vnode.shapeFlag) {
                const n = t._;
                n ? (e.slots = Vt(t), $e(t, "_", n)) : fr(t, e.slots = {});
              } else e.slots = {}, t && gr(e, t);
              $e(e.slots, Mr, 1);
            })(e, r);
            const l = i ? function (e, t) {
              const n = e.type;
              e.accessCache = Object.create(null), e.proxy = Bt(new Proxy(e.ctx, nr));
              const {
                setup: r
              } = n;
              if (r) {
                const n = e.setupContext = r.length > 1 ? function (e) {
                  const t = t => {
                    e.exposed = t || {};
                  };
                  let n;
                  return {
                    get attrs() {
                      return n || (n = function (e) {
                        return new Proxy(e.attrs, {
                          get: (t, n) => (qe(e, 0, "$attrs"), t[n])
                        });
                      }(e));
                    },
                    slots: e.slots,
                    emit: e.emit,
                    expose: t
                  };
                }(e) : null;
                Xr(e), He();
                const i = ln(r, e, 0, [e.props, n]);
                if (We(), ei(), pe(i)) {
                  if (i.then(ei, ei), t) return i.then(n => {
                    ri(e, n, t);
                  }).catch(t => {
                    sn(t, e, 0);
                  });
                  e.asyncDep = i;
                } else ri(e, i, t);
              } else ii(e, t);
            }(e, t) : void 0;
            ni = !1;
          }(s), s.asyncDep) {
            if (i && i.registerDep(s, A), !e.el) {
              const e = s.subTree = Vr($r);
              m(null, e, t, n);
            }
          } else A(s, e, t, n, i, l, o);
        },
        L = (e, t, n) => {
          const r = t.component = e.component;
          if (function (e, t, n) {
            const {
                props: r,
                children: i,
                component: l
              } = e,
              {
                props: o,
                children: s,
                patchFlag: a
              } = t,
              c = l.emitsOptions;
            if (t.dirs || t.transition) return !0;
            if (!(n && a >= 0)) return !(!i && !s || s && s.$stable) || r !== o && (r ? !o || jn(r, o, c) : !!o);
            if (1024 & a) return !0;
            if (16 & a) return r ? jn(r, o, c) : !!o;
            if (8 & a) {
              const e = t.dynamicProps;
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (o[n] !== r[n] && !In(c, n)) return !0;
              }
            }
            return !1;
          }(e, t, n)) {
            if (r.asyncDep && !r.asyncResolved) return void z(r, t, n);
            r.next = t, function (e) {
              const t = un.indexOf(e);
              t > pn && un.splice(t, 1);
            }(r.update), r.update();
          } else t.el = e.el, r.vnode = t;
        },
        A = (e, t, n, r, i, l, o) => {
          const s = () => {
              if (e.isMounted) {
                let t,
                  {
                    next: n,
                    bu: r,
                    u: s,
                    parent: a,
                    vnode: c
                  } = e,
                  p = n;
                xr(e, !1), n ? (n.el = c.el, z(e, n, o)) : n = c, r && Se(r), (t = n.props && n.props.onVnodeBeforeUpdate) && Kr(t, a, n, c), xr(e, !0);
                const d = An(e),
                  h = e.subTree;
                e.subTree = d, f(h, d, u(h.el), V(h), e, i, l), n.el = d.el, null === p && function (_ref12, n) {
                  let {
                    vnode: e,
                    parent: t
                  } = _ref12;
                  for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent;
                }(e, d.el), s && br(s, i), (t = n.props && n.props.onVnodeUpdated) && br(() => Kr(t, a, n, c), i);
              } else {
                let o;
                const {
                    el: s,
                    props: a
                  } = t,
                  {
                    bm: c,
                    m: u,
                    parent: p
                  } = e,
                  d = Vn(t);
                if (xr(e, !1), c && Se(c), !d && (o = a && a.onVnodeBeforeMount) && Kr(o, p, t), xr(e, !0), s && K) {
                  const n = () => {
                    e.subTree = An(e), K(s, e.subTree, e, i, null);
                  };
                  d ? t.type.__asyncLoader().then(() => !e.isUnmounted && n()) : n();
                } else {
                  const o = e.subTree = An(e);
                  f(null, o, n, r, e, i, l), t.el = o.el;
                }
                if (u && br(u, i), !d && (o = a && a.onVnodeMounted)) {
                  const e = t;
                  br(() => Kr(o, p, e), i);
                }
                (256 & t.shapeFlag || p && Vn(p.vnode) && 256 & p.vnode.shapeFlag) && e.a && br(e.a, i), e.isMounted = !0, t = n = r = null;
              }
            },
            a = e.effect = new Fe(s, () => yn(c), e.scope),
            c = e.update = () => a.run();
          c.id = e.uid, xr(e, !0), c();
        },
        z = (e, t, n) => {
          t.component = e;
          const r = e.vnode.props;
          e.vnode = t, e.next = null, function (e, t, n, r) {
            const {
                props: i,
                attrs: l,
                vnode: {
                  patchFlag: o
                }
              } = e,
              s = Vt(i),
              [a] = e.propsOptions;
            let c = !1;
            if (!(r || o > 0) || 16 & o) {
              let r;
              ir(e, t, i, l) && (c = !0);
              for (const l in s) t && (ne(t, l) || (r = ke(l)) !== l && ne(t, r)) || (a ? !n || void 0 === n[l] && void 0 === n[r] || (i[l] = lr(a, s, l, void 0, e, !0)) : delete i[l]);
              if (l !== s) for (const e in l) t && ne(t, e) || (delete l[e], c = !0);
            } else if (8 & o) {
              const n = e.vnode.dynamicProps;
              for (let r = 0; r < n.length; r++) {
                let o = n[r];
                if (In(e.emitsOptions, o)) continue;
                const u = t[o];
                if (a) {
                  if (ne(l, o)) u !== l[o] && (l[o] = u, c = !0);else {
                    const t = we(o);
                    i[t] = lr(a, s, t, u, e, !1);
                  }
                } else u !== l[o] && (l[o] = u, c = !0);
              }
            }
            c && Ge(e, "set", "$attrs");
          }(e, t.props, r, n), ((e, t, n) => {
            const {
              vnode: r,
              slots: i
            } = e;
            let l = !0,
              o = q;
            if (32 & r.shapeFlag) {
              const e = t._;
              e ? n && 1 === e ? l = !1 : (X(i, t), n || 1 !== e || delete i._) : (l = !t.$stable, fr(t, i)), o = t;
            } else t && (gr(e, t), o = {
              default: 1
            });
            if (l) for (const e in i) pr(e) || e in o || delete i[e];
          })(e, t.children, n), He(), bn(), We();
        },
        O = function (e, t, n, r, i, l, o, s) {
          let a = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : !1;
          const u = e && e.children,
            p = e ? e.shapeFlag : 0,
            d = t.children,
            {
              patchFlag: h,
              shapeFlag: f
            } = t;
          if (h > 0) {
            if (128 & h) return void T(u, d, n, r, i, l, o, s, a);
            if (256 & h) return void j(u, d, n, r, i, l, o, s, a);
          }
          8 & f ? (16 & p && D(u, i, l), d !== u && c(n, d)) : 16 & p ? 16 & f ? T(u, d, n, r, i, l, o, s, a) : D(u, i, l, !0) : (8 & p && c(n, ""), 16 & f && _(d, n, r, i, l, o, s, a));
        },
        j = (e, t, n, r, i, l, o, s, a) => {
          t = t || Z;
          const c = (e = e || Z).length,
            u = t.length,
            p = Math.min(c, u);
          let d;
          for (d = 0; d < p; d++) {
            const r = t[d] = a ? Zr(t[d]) : qr(t[d]);
            f(e[d], r, n, null, i, l, o, s, a);
          }
          c > u ? D(e, i, l, !0, !1, p) : _(t, n, r, i, l, o, s, a, p);
        },
        T = (e, t, n, r, i, l, o, s, a) => {
          let c = 0;
          const u = t.length;
          let p = e.length - 1,
            d = u - 1;
          for (; c <= p && c <= d;) {
            const r = e[c],
              u = t[c] = a ? Zr(t[c]) : qr(t[c]);
            if (!Ur(r, u)) break;
            f(r, u, n, null, i, l, o, s, a), c++;
          }
          for (; c <= p && c <= d;) {
            const r = e[p],
              c = t[d] = a ? Zr(t[d]) : qr(t[d]);
            if (!Ur(r, c)) break;
            f(r, c, n, null, i, l, o, s, a), p--, d--;
          }
          if (c > p) {
            if (c <= d) {
              const e = d + 1,
                p = e < u ? t[e].el : r;
              for (; c <= d;) f(null, t[c] = a ? Zr(t[c]) : qr(t[c]), n, p, i, l, o, s, a), c++;
            }
          } else if (c > d) for (; c <= p;) U(e[c], i, l, !0), c++;else {
            const h = c,
              g = c,
              m = new Map();
            for (c = g; c <= d; c++) {
              const e = t[c] = a ? Zr(t[c]) : qr(t[c]);
              null != e.key && m.set(e.key, c);
            }
            let v,
              y = 0;
            const w = d - g + 1;
            let b = !1,
              k = 0;
            const x = new Array(w);
            for (c = 0; c < w; c++) x[c] = 0;
            for (c = h; c <= p; c++) {
              const r = e[c];
              if (y >= w) {
                U(r, i, l, !0);
                continue;
              }
              let u;
              if (null != r.key) u = m.get(r.key);else for (v = g; v <= d; v++) if (0 === x[v - g] && Ur(r, t[v])) {
                u = v;
                break;
              }
              void 0 === u ? U(r, i, l, !0) : (x[u - g] = c + 1, u >= k ? k = u : b = !0, f(r, t[u], n, null, i, l, o, s, a), y++);
            }
            const _ = b ? function (e) {
              const t = e.slice(),
                n = [0];
              let r, i, l, o, s;
              const a = e.length;
              for (r = 0; r < a; r++) {
                const a = e[r];
                if (0 !== a) {
                  if (i = n[n.length - 1], e[i] < a) {
                    t[r] = i, n.push(r);
                    continue;
                  }
                  for (l = 0, o = n.length - 1; l < o;) s = l + o >> 1, e[n[s]] < a ? l = s + 1 : o = s;
                  a < e[n[l]] && (l > 0 && (t[r] = n[l - 1]), n[l] = r);
                }
              }
              l = n.length, o = n[l - 1];
              for (; l-- > 0;) n[l] = o, o = t[o];
              return n;
            }(x) : Z;
            for (v = _.length - 1, c = w - 1; c >= 0; c--) {
              const e = g + c,
                p = t[e],
                d = e + 1 < u ? t[e + 1].el : r;
              0 === x[c] ? f(null, p, n, d, i, l, o, s, a) : b && (v < 0 || c !== _[v] ? P(p, n, d, 2) : v--);
            }
          }
        },
        P = function (e, t, r, i) {
          let l = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
          const {
            el: o,
            type: s,
            transition: a,
            children: c,
            shapeFlag: u
          } = e;
          if (6 & u) return void P(e.component.subTree, t, r, i);
          if (128 & u) return void e.suspense.move(t, r, i);
          if (64 & u) return void s.move(e, t, r, H);
          if (s === Cr) {
            n(o, t, r);
            for (let e = 0; e < c.length; e++) P(c[e], t, r, i);
            return void n(e.anchor, t, r);
          }
          if (s === Ir) return void y(e, t, r);
          if (2 !== i && 1 & u && a) {
            if (0 === i) a.beforeEnter(o), n(o, t, r), br(() => a.enter(o), l);else {
              const {
                  leave: e,
                  delayLeave: i,
                  afterLeave: l
                } = a,
                s = () => n(o, t, r),
                c = () => {
                  e(o, () => {
                    s(), l && l();
                  });
                };
              i ? i(o, s, c) : c();
            }
          } else n(o, t, r);
        },
        U = function (e, t, n) {
          let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
          let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
          const {
            type: l,
            props: o,
            ref: s,
            children: a,
            dynamicChildren: c,
            shapeFlag: u,
            patchFlag: p,
            dirs: d
          } = e;
          if (null != s && wr(s, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
          const h = 1 & u && d,
            f = !Vn(e);
          let g;
          if (f && (g = o && o.onVnodeBeforeUnmount) && Kr(g, t, e), 6 & u) F(e.component, n, r);else {
            if (128 & u) return void e.suspense.unmount(n, r);
            h && Gn(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, i, H, r) : c && (l !== Cr || p > 0 && 64 & p) ? D(c, t, n, !1, !0) : (l === Cr && 384 & p || !i && 16 & u) && D(a, t, n), r && M(e);
          }
          (f && (g = o && o.onVnodeUnmounted) || h) && br(() => {
            g && Kr(g, t, e), h && Gn(e, null, t, "unmounted");
          }, n);
        },
        M = e => {
          const {
            type: t,
            el: n,
            anchor: i,
            transition: l
          } = e;
          if (t === Cr) return void N(n, i);
          if (t === Ir) return void w(e);
          const o = () => {
            r(n), l && !l.persisted && l.afterLeave && l.afterLeave();
          };
          if (1 & e.shapeFlag && l && !l.persisted) {
            const {
                leave: t,
                delayLeave: r
              } = l,
              i = () => t(n, o);
            r ? r(e.el, o, i) : i();
          } else o();
        },
        N = (e, t) => {
          let n;
          for (; e !== t;) n = p(e), r(e), e = n;
          r(t);
        },
        F = (e, t, n) => {
          const {
            bum: r,
            scope: i,
            update: l,
            subTree: o,
            um: s
          } = e;
          r && Se(r), i.stop(), l && (l.active = !1, U(o, e, t, n)), s && br(s, t), br(() => {
            e.isUnmounted = !0;
          }, t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve());
        },
        D = function (e, t, n) {
          let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
          let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
          let l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
          for (let o = l; o < e.length; o++) U(e[o], t, n, r, i);
        },
        V = e => 6 & e.shapeFlag ? V(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el),
        B = (e, t, n) => {
          null == e ? t._vnode && U(t._vnode, null, null, !0) : f(t._vnode || null, e, t, null, null, null, n), bn(), kn(), t._vnode = e;
        },
        H = {
          p: f,
          um: U,
          m: P,
          r: M,
          mt: R,
          mc: _,
          pc: O,
          pbc: S,
          n: V,
          o: e
        };
      let W, K;
      t && ([W, K] = t(H));
      return {
        render: B,
        hydrate: W,
        createApp: yr(B, W)
      };
    }(e);
  }
  function xr(_ref13, n) {
    let {
      effect: e,
      update: t
    } = _ref13;
    e.allowRecurse = t.allowRecurse = n;
  }
  function _r(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    const r = e.children,
      i = t.children;
    if (re(r) && re(i)) for (let e = 0; e < r.length; e++) {
      const t = r[e];
      let l = i[e];
      1 & l.shapeFlag && !l.dynamicChildren && ((l.patchFlag <= 0 || 32 === l.patchFlag) && (l = i[e] = Zr(i[e]), l.el = t.el), n || _r(t, l)), l.type === Sr && (l.el = t.el);
    }
  }
  const Cr = Symbol(void 0),
    Sr = Symbol(void 0),
    $r = Symbol(void 0),
    Ir = Symbol(void 0),
    Er = [];
  let Rr = null;
  function Lr() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
    Er.push(Rr = e ? null : []);
  }
  let Ar = 1;
  function zr(e) {
    Ar += e;
  }
  function Or(e) {
    return e.dynamicChildren = Ar > 0 ? Rr || Z : null, Er.pop(), Rr = Er[Er.length - 1] || null, Ar > 0 && Rr && Rr.push(e), e;
  }
  function jr(e, t, n, r, i, l) {
    return Or(Dr(e, t, n, r, i, l, !0));
  }
  function Tr(e, t, n, r, i) {
    return Or(Vr(e, t, n, r, i, !0));
  }
  function Pr(e) {
    return !!e && !0 === e.__v_isVNode;
  }
  function Ur(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const Mr = "__vInternal",
    Nr = _ref14 => {
      let {
        key: e
      } = _ref14;
      return null != e ? e : null;
    },
    Fr = _ref15 => {
      let {
        ref: e,
        ref_key: t,
        ref_for: n
      } = _ref15;
      return null != e ? ae(e) || Gt(e) || se(e) ? {
        i: En,
        r: e,
        k: t,
        f: !!n
      } : e : null;
    };
  function Dr(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    let l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : e === Cr ? 0 : 1;
    let o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : !1;
    let s = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : !1;
    const a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && Nr(t),
      ref: t && Fr(t),
      scopeId: Rn,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: l,
      patchFlag: r,
      dynamicProps: i,
      dynamicChildren: null,
      appContext: null,
      ctx: En
    };
    return s ? (Gr(a, n), 128 & l && e.normalize(a)) : n && (a.shapeFlag |= ae(n) ? 8 : 16), Ar > 0 && !o && Rr && (a.patchFlag > 0 || 6 & l) && 32 !== a.patchFlag && Rr.push(a), a;
  }
  const Vr = function (e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    let l = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
    e && e !== Qn || (e = $r);
    if (Pr(e)) {
      const r = Br(e, t, !0);
      return n && Gr(r, n), Ar > 0 && !l && Rr && (6 & r.shapeFlag ? Rr[Rr.indexOf(e)] = r : Rr.push(r)), r.patchFlag |= -2, r;
    }
    o = e, se(o) && "__vccOpts" in o && (e = e.__vccOpts);
    var o;
    if (t) {
      t = function (e) {
        return e ? Dt(e) || Mr in e ? X({}, e) : e : null;
      }(t);
      let {
        class: e,
        style: n
      } = t;
      e && !ae(e) && (t.class = N(e)), ue(n) && (Dt(n) && !re(n) && (n = X({}, n)), t.style = j(n));
    }
    const s = ae(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : ue(e) ? 4 : se(e) ? 2 : 0;
    return Dr(e, t, n, r, i, s, l, !0);
  };
  function Br(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    const {
        props: r,
        ref: i,
        patchFlag: l,
        children: o
      } = e,
      s = t ? function () {
        const t = {};
        for (let n = 0; n < arguments.length; n++) {
          const r = n < 0 || arguments.length <= n ? undefined : arguments[n];
          for (const e in r) if ("class" === e) t.class !== r.class && (t.class = N([t.class, r.class]));else if ("style" === e) t.style = j([t.style, r.style]);else if (J(e)) {
            const n = t[e],
              i = r[e];
            !i || n === i || re(n) && n.includes(i) || (t[e] = n ? [].concat(n, i) : i);
          } else "" !== e && (t[e] = r[e]);
        }
        return t;
      }(r || {}, t) : r;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: s,
      key: s && Nr(s),
      ref: t && t.ref ? n && i ? re(i) ? i.concat(Fr(t)) : [i, Fr(t)] : Fr(t) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: o,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Cr ? -1 === l ? 16 : 16 | l : l,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Br(e.ssContent),
      ssFallback: e.ssFallback && Br(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx
    };
  }
  function Hr() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : " ";
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Vr(Sr, null, e, t);
  }
  function Wr() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    return t ? (Lr(), Tr($r, null, e)) : Vr($r, null, e);
  }
  function qr(e) {
    return null == e || "boolean" == typeof e ? Vr($r) : re(e) ? Vr(Cr, null, e.slice()) : "object" == typeof e ? Zr(e) : Vr(Sr, null, String(e));
  }
  function Zr(e) {
    return null === e.el && -1 !== e.patchFlag || e.memo ? e : Br(e);
  }
  function Gr(e, t) {
    let n = 0;
    const {
      shapeFlag: r
    } = e;
    if (null == t) t = null;else if (re(t)) n = 16;else if ("object" == typeof t) {
      if (65 & r) {
        const n = t.default;
        return void (n && (n._c && (n._d = !1), Gr(e, n()), n._c && (n._d = !0)));
      }
      {
        n = 32;
        const r = t._;
        r || Mr in t ? 3 === r && En && (1 === En.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = En;
      }
    } else se(t) ? (t = {
      default: t,
      _ctx: En
    }, n = 32) : (t = String(t), 64 & r ? (n = 16, t = [Hr(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n;
  }
  function Kr(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    on(e, t, 7, [n, r]);
  }
  const Qr = mr();
  let Jr = 0;
  let Yr = null;
  const Xr = e => {
      Yr = e, e.scope.on();
    },
    ei = () => {
      Yr && Yr.scope.off(), Yr = null;
    };
  function ti(e) {
    return 4 & e.vnode.shapeFlag;
  }
  let ni = !1;
  function ri(e, t, n) {
    se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = tn(t)), ii(e, n);
  }
  function ii(e, t, n) {
    const r = e.type;
    e.render || (e.render = r.render || G);
  }
  function li(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(tn(Bt(e.exposed)), {
      get: (t, n) => n in t ? t[n] : n in er ? er[n](e) : void 0,
      has: (e, t) => t in e || t in er
    }));
  }
  const oi = (e, t) => function (e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    let r, i;
    const l = se(e);
    return l ? (r = e, i = G) : (r = e.get, i = e.set), new rn(r, i, l || !i, n);
  }(e, 0, ni);
  function si(e, t, n) {
    const r = arguments.length;
    return 2 === r ? ue(t) && !re(t) ? Pr(t) ? Vr(e, null, [t]) : Vr(e, t) : Vr(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === r && Pr(n) && (n = [n]), Vr(e, t, n));
  }
  const ai = Symbol(""),
    ci = () => Tn(ai),
    ui = "3.2.45",
    pi = "undefined" != typeof document ? document : null,
    di = pi && pi.createElement("template"),
    hi = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, r) => {
        const i = t ? pi.createElementNS("http://www.w3.org/2000/svg", e) : pi.createElement(e, n ? {
          is: n
        } : void 0);
        return "select" === e && r && null != r.multiple && i.setAttribute("multiple", r.multiple), i;
      },
      createText: e => pi.createTextNode(e),
      createComment: e => pi.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: e => e.parentNode,
      nextSibling: e => e.nextSibling,
      querySelector: e => pi.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, r, i, l) {
        const o = n ? n.previousSibling : t.lastChild;
        if (i && (i === l || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== l && (i = i.nextSibling););else {
          di.innerHTML = r ? `<svg>${e}</svg>` : e;
          const i = di.content;
          if (r) {
            const e = i.firstChild;
            for (; e.firstChild;) i.appendChild(e.firstChild);
            i.removeChild(e);
          }
          t.insertBefore(i, n);
        }
        return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
      }
    };
  const fi = /\s*!important$/;
  function gi(e, t, n) {
    if (re(n)) n.forEach(n => gi(e, t, n));else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n);else {
      const r = function (e, t) {
        const n = vi[t];
        if (n) return n;
        let r = we(t);
        if ("filter" !== r && r in e) return vi[t] = r;
        r = xe(r);
        for (let n = 0; n < mi.length; n++) {
          const i = mi[n] + r;
          if (i in e) return vi[t] = i;
        }
        return t;
      }(e, t);
      fi.test(n) ? e.setProperty(ke(r), n.replace(fi, ""), "important") : e[r] = n;
    }
  }
  const mi = ["Webkit", "Moz", "ms"],
    vi = {};
  const yi = "http://www.w3.org/1999/xlink";
  function wi(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function bi(e, t, n, r) {
    let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    const l = e._vei || (e._vei = {}),
      o = l[t];
    if (r && o) o.value = r;else {
      const [n, s] = function (e) {
        let t;
        if (ki.test(e)) {
          let n;
          for (t = {}; n = e.match(ki);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
        }
        return [":" === e[2] ? e.slice(3) : ke(e.slice(2)), t];
      }(t);
      if (r) {
        const o = l[t] = function (e, t) {
          const n = e => {
            if (e._vts) {
              if (e._vts <= n.attached) return;
            } else e._vts = Date.now();
            on(function (e, t) {
              if (re(t)) {
                const n = e.stopImmediatePropagation;
                return e.stopImmediatePropagation = () => {
                  n.call(e), e._stopped = !0;
                }, t.map(e => t => !t._stopped && e && e(t));
              }
              return t;
            }(e, n.value), t, 5, [e]);
          };
          return n.value = e, n.attached = (() => xi || (_i.then(() => xi = 0), xi = Date.now()))(), n;
        }(r, i);
        wi(e, n, o, s);
      } else o && (!function (e, t, n, r) {
        e.removeEventListener(t, n, r);
      }(e, n, o, s), l[t] = void 0);
    }
  }
  const ki = /(?:Once|Passive|Capture)$/;
  let xi = 0;
  const _i = Promise.resolve();
  const Ci = /^on[a-z]/;
  const Si = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return re(t) ? e => Se(t, e) : t;
  };
  function $i(e) {
    e.target.composing = !0;
  }
  function Ii(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
  }
  const Ei = {
      created(e, _ref16, i) {
        let {
          modifiers: {
            lazy: t,
            trim: n,
            number: r
          }
        } = _ref16;
        e._assign = Si(i);
        const l = r || i.props && "number" === i.props.type;
        wi(e, t ? "change" : "input", t => {
          if (t.target.composing) return;
          let r = e.value;
          n && (r = r.trim()), l && (r = Ie(r)), e._assign(r);
        }), n && wi(e, "change", () => {
          e.value = e.value.trim();
        }), t || (wi(e, "compositionstart", $i), wi(e, "compositionend", Ii), wi(e, "change", Ii));
      },
      mounted(e, _ref17) {
        let {
          value: t
        } = _ref17;
        e.value = null == t ? "" : t;
      },
      beforeUpdate(e, _ref18, l) {
        let {
          value: t,
          modifiers: {
            lazy: n,
            trim: r,
            number: i
          }
        } = _ref18;
        if (e._assign = Si(l), e.composing) return;
        if (document.activeElement === e && "range" !== e.type) {
          if (n) return;
          if (r && e.value.trim() === t) return;
          if ((i || "number" === e.type) && Ie(e.value) === t) return;
        }
        const o = null == t ? "" : t;
        e.value !== o && (e.value = o);
      }
    },
    Ri = {
      deep: !0,
      created(e, t, n) {
        e._assign = Si(n), wi(e, "change", () => {
          const t = e._modelValue,
            n = ji(e),
            r = e.checked,
            i = e._assign;
          if (re(t)) {
            const e = B(t, n),
              l = -1 !== e;
            if (r && !l) i(t.concat(n));else if (!r && l) {
              const n = [...t];
              n.splice(e, 1), i(n);
            }
          } else if (le(t)) {
            const e = new Set(t);
            r ? e.add(n) : e.delete(n), i(e);
          } else i(Ti(e, r));
        });
      },
      mounted: Li,
      beforeUpdate(e, t, n) {
        e._assign = Si(n), Li(e, t, n);
      }
    };
  function Li(e, _ref19, r) {
    let {
      value: t,
      oldValue: n
    } = _ref19;
    e._modelValue = t, re(t) ? e.checked = B(t, r.props.value) > -1 : le(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = V(t, Ti(e, !0)));
  }
  const Ai = {
      created(e, _ref20, n) {
        let {
          value: t
        } = _ref20;
        e.checked = V(t, n.props.value), e._assign = Si(n), wi(e, "change", () => {
          e._assign(ji(e));
        });
      },
      beforeUpdate(e, _ref21, r) {
        let {
          value: t,
          oldValue: n
        } = _ref21;
        e._assign = Si(r), t !== n && (e.checked = V(t, r.props.value));
      }
    },
    zi = {
      deep: !0,
      created(e, _ref22, r) {
        let {
          value: t,
          modifiers: {
            number: n
          }
        } = _ref22;
        const i = le(t);
        wi(e, "change", () => {
          const t = Array.prototype.filter.call(e.options, e => e.selected).map(e => n ? Ie(ji(e)) : ji(e));
          e._assign(e.multiple ? i ? new Set(t) : t : t[0]);
        }), e._assign = Si(r);
      },
      mounted(e, _ref23) {
        let {
          value: t
        } = _ref23;
        Oi(e, t);
      },
      beforeUpdate(e, t, n) {
        e._assign = Si(n);
      },
      updated(e, _ref24) {
        let {
          value: t
        } = _ref24;
        Oi(e, t);
      }
    };
  function Oi(e, t) {
    const n = e.multiple;
    if (!n || re(t) || le(t)) {
      for (let r = 0, i = e.options.length; r < i; r++) {
        const i = e.options[r],
          l = ji(i);
        if (n) re(t) ? i.selected = B(t, l) > -1 : i.selected = t.has(l);else if (V(ji(i), t)) return void (e.selectedIndex !== r && (e.selectedIndex = r));
      }
      n || -1 === e.selectedIndex || (e.selectedIndex = -1);
    }
  }
  function ji(e) {
    return "_value" in e ? e._value : e.value;
  }
  function Ti(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
  }
  const Pi = {
    created(e, t, n) {
      Ui(e, t, n, null, "created");
    },
    mounted(e, t, n) {
      Ui(e, t, n, null, "mounted");
    },
    beforeUpdate(e, t, n, r) {
      Ui(e, t, n, r, "beforeUpdate");
    },
    updated(e, t, n, r) {
      Ui(e, t, n, r, "updated");
    }
  };
  function Ui(e, t, n, r, i) {
    const l = function (e, t) {
      switch (e) {
        case "SELECT":
          return zi;
        case "TEXTAREA":
          return Ei;
        default:
          switch (t) {
            case "checkbox":
              return Ri;
            case "radio":
              return Ai;
            default:
              return Ei;
          }
      }
    }(e.tagName, n.props && n.props.type)[i];
    l && l(e, t, n, r);
  }
  const Mi = {
    beforeMount(e, _ref25, _ref26) {
      let {
        value: t
      } = _ref25;
      let {
        transition: n
      } = _ref26;
      e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ni(e, t);
    },
    mounted(e, _ref27, _ref28) {
      let {
        value: t
      } = _ref27;
      let {
        transition: n
      } = _ref28;
      n && t && n.enter(e);
    },
    updated(e, _ref29, _ref30) {
      let {
        value: t,
        oldValue: n
      } = _ref29;
      let {
        transition: r
      } = _ref30;
      !t != !n && (r ? t ? (r.beforeEnter(e), Ni(e, !0), r.enter(e)) : r.leave(e, () => {
        Ni(e, !1);
      }) : Ni(e, t));
    },
    beforeUnmount(e, _ref31) {
      let {
        value: t
      } = _ref31;
      Ni(e, t);
    }
  };
  function Ni(e, t) {
    e.style.display = t ? e._vod : "none";
  }
  const Fi = X({
    patchProp: function (e, t, n, r) {
      let i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      let l = arguments.length > 5 ? arguments[5] : undefined;
      let o = arguments.length > 6 ? arguments[6] : undefined;
      let s = arguments.length > 7 ? arguments[7] : undefined;
      let a = arguments.length > 8 ? arguments[8] : undefined;
      "class" === t ? function (e, t, n) {
        const r = e._vtc;
        r && (t = (t ? [t, ...r] : [...r]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
      }(e, r, i) : "style" === t ? function (e, t, n) {
        const r = e.style,
          i = ae(n);
        if (n && !i) {
          for (const e in n) gi(r, e, n[e]);
          if (t && !ae(t)) for (const e in t) null == n[e] && gi(r, e, "");
        } else {
          const l = r.display;
          i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = l);
        }
      }(e, n, r) : J(t) ? Y(t) || bi(e, t, 0, r, o) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function (e, t, n, r) {
        if (r) return "innerHTML" === t || "textContent" === t || !!(t in e && Ci.test(t) && se(n));
        if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
        if ("form" === t) return !1;
        if ("list" === t && "INPUT" === e.tagName) return !1;
        if ("type" === t && "TEXTAREA" === e.tagName) return !1;
        if (Ci.test(t) && ae(n)) return !1;
        return t in e;
      }(e, t, r, i)) ? function (e, t, n, r, i, l, o) {
        if ("innerHTML" === t || "textContent" === t) return r && o(r, i, l), void (e[t] = null == n ? "" : n);
        if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
          e._value = n;
          const r = null == n ? "" : n;
          return e.value === r && "OPTION" !== e.tagName || (e.value = r), void (null == n && e.removeAttribute(t));
        }
        let s = !1;
        if ("" === n || null == n) {
          const r = typeof e[t];
          "boolean" === r ? n = D(n) : null == n && "string" === r ? (n = "", s = !0) : "number" === r && (n = 0, s = !0);
        }
        try {
          e[t] = n;
        } catch (e) {}
        s && e.removeAttribute(t);
      }(e, t, r, l, o, s, a) : ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r), function (e, t, n, r, i) {
        if (r && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(yi, t.slice(6, t.length)) : e.setAttributeNS(yi, t, n);else {
          const r = F(t);
          null == n || r && !D(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
        }
      }(e, t, r, i));
    }
  }, hi);
  let Di;
  const Vi = function () {
    const t = (Di || (Di = kr(Fi))).createApp(...arguments),
      {
        mount: n
      } = t;
    return t.mount = e => {
      const r = function (e) {
        if (ae(e)) {
          return document.querySelector(e);
        }
        return e;
      }(e);
      if (!r) return;
      const i = t._component;
      se(i) || i.render || i.template || (i.template = r.innerHTML), r.innerHTML = "";
      const l = n(r, !1, r instanceof SVGElement);
      return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), l;
    }, t;
  };
  var Bi;
  const Hi = "undefined" != typeof window,
    Wi = () => {};
  function qi(e) {
    return "function" == typeof e ? e() : Xt(e);
  }
  function Zi(e, t) {
    return function () {
      for (var _len6 = arguments.length, n = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        n[_key6] = arguments[_key6];
      }
      e(() => t.apply(this, n), {
        fn: t,
        thisArg: this,
        args: n
      });
    };
  }
  Hi && (null == (Bi = null == window ? void 0 : window.navigator) ? void 0 : Bi.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  const Gi = e => e();
  function Ki(e) {
    return !!Re && (function (e) {
      Re && Re.cleanups.push(e);
    }(e), !0);
  }
  function Qi(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return Zi(function (e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let n, r;
      return i => {
        const l = qi(e),
          o = qi(t.maxWait);
        if (n && clearTimeout(n), l <= 0 || void 0 !== o && o <= 0) return r && (clearTimeout(r), r = null), i();
        o && !r && (r = setTimeout(() => {
          n && clearTimeout(n), r = null, i();
        }, o)), n = setTimeout(() => {
          r && clearTimeout(r), r = null, i();
        }, l);
      };
    }(t, n), e);
  }
  function Ji(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    Yr || En ? Hn(e) : t ? e() : vn(e);
  }
  var Yi = Object.getOwnPropertySymbols,
    Xi = Object.prototype.hasOwnProperty,
    el = Object.prototype.propertyIsEnumerable;
  function tl(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const r = n,
      {
        eventFilter: i = Gi
      } = r,
      l = ((e, t) => {
        var n = {};
        for (var r in e) Xi.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && Yi) for (var r of Yi(e)) t.indexOf(r) < 0 && el.call(e, r) && (n[r] = e[r]);
        return n;
      })(r, ["eventFilter"]);
    return Mn(e, Zi(i, t), l);
  }
  var nl = Object.defineProperty,
    rl = Object.defineProperties,
    il = Object.getOwnPropertyDescriptors,
    ll = Object.getOwnPropertySymbols,
    ol = Object.prototype.hasOwnProperty,
    sl = Object.prototype.propertyIsEnumerable,
    al = (e, t, n) => t in e ? nl(e, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }) : e[t] = n;
  function cl(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const r = n,
      {
        eventFilter: i
      } = r,
      l = ((e, t) => {
        var n = {};
        for (var r in e) ol.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && ll) for (var r of ll(e)) t.indexOf(r) < 0 && sl.call(e, r) && (n[r] = e[r]);
        return n;
      })(r, ["eventFilter"]),
      {
        eventFilter: o,
        pause: s,
        resume: a,
        isActive: c
      } = function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Gi;
        const t = Kt(!0);
        return {
          isActive: t,
          pause: function () {
            t.value = !1;
          },
          resume: function () {
            t.value = !0;
          },
          eventFilter: function () {
            t.value && e(...arguments);
          }
        };
      }(i),
      u = tl(e, t, (p = ((e, t) => {
        for (var n in t || (t = {})) ol.call(t, n) && al(e, n, t[n]);
        if (ll) for (var n of ll(t)) sl.call(t, n) && al(e, n, t[n]);
        return e;
      })({}, l), rl(p, il({
        eventFilter: o
      }))));
    var p;
    return {
      stop: u,
      pause: s,
      resume: a,
      isActive: c
    };
  }
  const ul = Hi ? window : void 0,
    pl = Hi ? window.document : void 0;
  function dl() {
    let t, n, r, i;
    for (var _len7 = arguments.length, e = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      e[_key7] = arguments[_key7];
    }
    if ("string" == typeof e[0] || Array.isArray(e[0]) ? ([n, r, i] = e, t = ul) : [t, n, r, i] = e, !t) return Wi;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const l = [],
      o = () => {
        l.forEach(e => e()), l.length = 0;
      },
      s = Mn(() => function (e) {
        var t;
        const n = qi(e);
        return null != (t = null == n ? void 0 : n.$el) ? t : n;
      }(t), e => {
        o(), e && l.push(...n.flatMap(t => r.map(n => ((e, t, n) => (e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i)))(e, t, n))));
      }, {
        immediate: !0,
        flush: "post"
      }),
      a = () => {
        s(), o();
      };
    return Ki(a), a;
  }
  Hi && window.navigator, Hi && window.location;
  const hl = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
    fl = "__vueuse_ssr_handlers__";
  hl[fl] = hl[fl] || {};
  const gl = hl[fl];
  var ml = Object.defineProperty,
    vl = Object.getOwnPropertySymbols,
    yl = Object.prototype.hasOwnProperty,
    wl = Object.prototype.propertyIsEnumerable,
    bl = (e, t, n) => t in e ? ml(e, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }) : e[t] = n,
    kl = (e, t) => {
      for (var n in t || (t = {})) yl.call(t, n) && bl(e, n, t[n]);
      if (vl) for (var n of vl(t)) wl.call(t, n) && bl(e, n, t[n]);
      return e;
    };
  const xl = {
    boolean: {
      read: e => "true" === e,
      write: e => String(e)
    },
    object: {
      read: e => JSON.parse(e),
      write: e => JSON.stringify(e)
    },
    number: {
      read: e => Number.parseFloat(e),
      write: e => String(e)
    },
    any: {
      read: e => e,
      write: e => String(e)
    },
    string: {
      read: e => e,
      write: e => String(e)
    },
    map: {
      read: e => new Map(JSON.parse(e)),
      write: e => JSON.stringify(Array.from(e.entries()))
    },
    set: {
      read: e => new Set(JSON.parse(e)),
      write: e => JSON.stringify(Array.from(e))
    },
    date: {
      read: e => new Date(e),
      write: e => e.toISOString()
    }
  };
  function _l(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var i;
    const {
        flush: l = "pre",
        deep: o = !0,
        listenToStorageChanges: s = !0,
        writeDefaults: a = !0,
        mergeDefaults: c = !1,
        shallow: u,
        window: p = ul,
        eventFilter: d,
        onError: h = e => {
          console.error(e);
        }
      } = r,
      f = (u ? Qt : Kt)(t);
    if (!n) try {
      n = function (e, t) {
        return gl[e] || t;
      }("getDefaultStorage", () => {
        var e;
        return null == (e = ul) ? void 0 : e.localStorage;
      })();
    } catch (e) {
      h(e);
    }
    if (!n) return f;
    const g = qi(t),
      m = function (e) {
        return null == e ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : "boolean" == typeof e ? "boolean" : "string" == typeof e ? "string" : "object" == typeof e ? "object" : Number.isNaN(e) ? "any" : "number";
      }(g),
      v = null != (i = r.serializer) ? i : xl[m],
      {
        pause: y,
        resume: w
      } = cl(f, () => function (t) {
        try {
          null == t ? n.removeItem(e) : n.setItem(e, v.write(t));
        } catch (e) {
          h(e);
        }
      }(f.value), {
        flush: l,
        deep: o,
        eventFilter: d
      });
    return p && s && dl(p, "storage", b), b(), f;
    function b(t) {
      t && t.storageArea !== n || (t && null === t.key ? f.value = g : t && t.key !== e || (f.value = function (t) {
        y();
        try {
          const r = t ? t.newValue : n.getItem(e);
          if (null == r) return a && null !== g && n.setItem(e, v.write(g)), g;
          if (!t && c) {
            const e = v.read(r);
            return "function" == typeof c ? c(e, g) : "object" !== m || Array.isArray(e) ? e : kl(kl({}, g), e);
          }
          return "string" != typeof r ? r : v.read(r);
        } catch (e) {
          h(e);
        } finally {
          w();
        }
      }(t)));
    }
  }
  var Cl,
    Sl,
    $l = Object.defineProperty,
    Il = Object.getOwnPropertySymbols,
    El = Object.prototype.hasOwnProperty,
    Rl = Object.prototype.propertyIsEnumerable,
    Ll = (e, t, n) => t in e ? $l(e, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }) : e[t] = n;
  function Al() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
        controls: t = !1,
        interval: n = "requestAnimationFrame"
      } = e,
      r = Kt(new Date()),
      i = () => r.value = new Date(),
      l = "requestAnimationFrame" === n ? function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const {
            immediate: n = !0,
            window: r = ul
          } = t,
          i = Kt(!1);
        let l = null;
        function o() {
          i.value && r && (e(), l = r.requestAnimationFrame(o));
        }
        function s() {
          !i.value && r && (i.value = !0, o());
        }
        function a() {
          i.value = !1, null != l && r && (r.cancelAnimationFrame(l), l = null);
        }
        return n && s(), Ki(a), {
          isActive: i,
          pause: a,
          resume: s
        };
      }(i, {
        immediate: !0
      }) : function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e3;
        let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        const {
          immediate: r = !0,
          immediateCallback: i = !1
        } = n;
        let l = null;
        const o = Kt(!1);
        function s() {
          l && (clearInterval(l), l = null);
        }
        function a() {
          o.value = !1, s();
        }
        function c() {
          Xt(t) <= 0 || (o.value = !0, i && e(), s(), l = setInterval(e, qi(t)));
        }
        r && Hi && c(), Gt(t) && Ki(Mn(t, () => {
          o.value && Hi && c();
        }));
        return Ki(a), {
          isActive: o,
          pause: a,
          resume: c
        };
      }(i, n, {
        immediate: !0
      });
    return t ? ((e, t) => {
      for (var n in t || (t = {})) El.call(t, n) && Ll(e, n, t[n]);
      if (Il) for (var n of Il(t)) Rl.call(t, n) && Ll(e, n, t[n]);
      return e;
    })({
      now: r
    }, l) : r;
  }
  (Sl = Cl || (Cl = {})).UP = "UP", Sl.RIGHT = "RIGHT", Sl.DOWN = "DOWN", Sl.LEFT = "LEFT", Sl.NONE = "NONE";
  let zl = 0;
  var Ol = Object.defineProperty,
    jl = Object.getOwnPropertySymbols,
    Tl = Object.prototype.hasOwnProperty,
    Pl = Object.prototype.propertyIsEnumerable,
    Ul = (e, t, n) => t in e ? Ol(e, t, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }) : e[t] = n;
  ((e, t) => {
    for (var n in t || (t = {})) Tl.call(t, n) && Ul(e, n, t[n]);
    if (jl) for (var n of jl(t)) Pl.call(t, n) && Ul(e, n, t[n]);
  })({
    linear: function (e) {
      return e;
    }
  }, {
    easeInSine: [.12, 0, .39, 0],
    easeOutSine: [.61, 1, .88, 1],
    easeInOutSine: [.37, 0, .63, 1],
    easeInQuad: [.11, 0, .5, 0],
    easeOutQuad: [.5, 1, .89, 1],
    easeInOutQuad: [.45, 0, .55, 1],
    easeInCubic: [.32, 0, .67, 0],
    easeOutCubic: [.33, 1, .68, 1],
    easeInOutCubic: [.65, 0, .35, 1],
    easeInQuart: [.5, 0, .75, 0],
    easeOutQuart: [.25, 1, .5, 1],
    easeInOutQuart: [.76, 0, .24, 1],
    easeInQuint: [.64, 0, .78, 0],
    easeOutQuint: [.22, 1, .36, 1],
    easeInOutQuint: [.83, 0, .17, 1],
    easeInExpo: [.7, 0, .84, 0],
    easeOutExpo: [.16, 1, .3, 1],
    easeInOutExpo: [.87, 0, .13, 1],
    easeInCirc: [.55, 0, 1, .45],
    easeOutCirc: [0, .55, .45, 1],
    easeInOutCirc: [.85, 0, .15, 1],
    easeInBack: [.36, 0, .66, -.56],
    easeOutBack: [.34, 1.56, .64, 1],
    easeInOutBack: [.68, -.6, .32, 1.6]
  });
  const Ml = e => {
      const t = _l("WALINE_EMOJI", {}),
        n = Boolean(/@[0-9]+\.[0-9]+\.[0-9]+/.test(e));
      if (n) {
        const n = t.value[e];
        if (n) return Promise.resolve(n);
      }
      return fetch(`${e}/info.json`).then(e => e.json()).then(r => {
        const i = {
          folder: e,
          ...r
        };
        return n && (t.value[e] = i), i;
      });
    },
    Nl = function (e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      return `${t ? `${t}/` : ""}${n}${e}${r ? `.${r}` : ""}`;
    },
    Fl = e => {
      "AbortError" !== e.name && console.error(e.message);
    },
    Dl = e => e instanceof HTMLElement ? e : "string" == typeof e ? document.querySelector(e) : null,
    Vl = e => e.type.includes("image"),
    Bl = e => {
      const t = Array.from(e).find(Vl);
      return t ? t.getAsFile() : null;
    };
  function Hl() {
    return {
      async: !1,
      baseUrl: null,
      breaks: !1,
      extensions: null,
      gfm: !0,
      headerIds: !0,
      headerPrefix: "",
      highlight: null,
      langPrefix: "language-",
      mangle: !0,
      pedantic: !1,
      renderer: null,
      sanitize: !1,
      sanitizer: null,
      silent: !1,
      smartypants: !1,
      tokenizer: null,
      walkTokens: null,
      xhtml: !1
    };
  }
  let Wl = {
    async: !1,
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !0,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1
  };
  const ql = /[&<>"']/,
    Zl = /[&<>"']/g,
    Gl = /[<>"']|&(?!#?\w+;)/,
    Kl = /[<>"']|&(?!#?\w+;)/g,
    Ql = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    },
    Jl = e => Ql[e];
  function Yl(e, t) {
    if (t) {
      if (ql.test(e)) return e.replace(Zl, Jl);
    } else if (Gl.test(e)) return e.replace(Kl, Jl);
    return e;
  }
  const Xl = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function eo(e) {
    return e.replace(Xl, (e, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "");
  }
  const to = /(^|[^\[])\^/g;
  function no(e, t) {
    e = "string" == typeof e ? e : e.source, t = t || "";
    const n = {
      replace: (t, r) => (r = (r = r.source || r).replace(to, "$1"), e = e.replace(t, r), n),
      getRegex: () => new RegExp(e, t)
    };
    return n;
  }
  const ro = /[^\w:]/g,
    io = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function lo(e, t, n) {
    if (e) {
      let e;
      try {
        e = decodeURIComponent(eo(n)).replace(ro, "").toLowerCase();
      } catch (e) {
        return null;
      }
      if (0 === e.indexOf("javascript:") || 0 === e.indexOf("vbscript:") || 0 === e.indexOf("data:")) return null;
    }
    t && !io.test(n) && (n = function (e, t) {
      oo[" " + e] || (so.test(e) ? oo[" " + e] = e + "/" : oo[" " + e] = fo(e, "/", !0));
      const n = -1 === (e = oo[" " + e]).indexOf(":");
      return "//" === t.substring(0, 2) ? n ? t : e.replace(ao, "$1") + t : "/" === t.charAt(0) ? n ? t : e.replace(co, "$1") + t : e + t;
    }(t, n));
    try {
      n = encodeURI(n).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return n;
  }
  const oo = {},
    so = /^[^:]+:\/*[^/]*$/,
    ao = /^([^:]+:)[\s\S]*$/,
    co = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  const uo = {
    exec: function () {}
  };
  function po(e) {
    let t,
      n,
      r = 1;
    for (; r < arguments.length; r++) for (n in t = arguments[r], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }
  function ho(e, t) {
    const n = e.replace(/\|/g, (e, t, n) => {
      let r = !1,
        i = t;
      for (; --i >= 0 && "\\" === n[i];) r = !r;
      return r ? "|" : " |";
    }).split(/ \|/);
    let r = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), n.length > t) n.splice(t);else for (; n.length < t;) n.push("");
    for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
    return n;
  }
  function fo(e, t, n) {
    const r = e.length;
    if (0 === r) return "";
    let i = 0;
    for (; i < r;) {
      const l = e.charAt(r - i - 1);
      if (l !== t || n) {
        if (l === t || !n) break;
        i++;
      } else i++;
    }
    return e.slice(0, r - i);
  }
  function go(e) {
    e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
  function mo(e, t) {
    if (t < 1) return "";
    let n = "";
    for (; t > 1;) 1 & t && (n += e), t >>= 1, e += e;
    return n + e;
  }
  function vo(e, t, n, r) {
    const i = t.href,
      l = t.title ? Yl(t.title) : null,
      o = e[1].replace(/\\([\[\]])/g, "$1");
    if ("!" !== e[0].charAt(0)) {
      r.state.inLink = !0;
      const e = {
        type: "link",
        raw: n,
        href: i,
        title: l,
        text: o,
        tokens: r.inlineTokens(o)
      };
      return r.state.inLink = !1, e;
    }
    return {
      type: "image",
      raw: n,
      href: i,
      title: l,
      text: Yl(o)
    };
  }
  class yo {
    constructor(e) {
      this.options = e || Wl;
    }
    space(e) {
      const t = this.rules.block.newline.exec(e);
      if (t && t[0].length > 0) return {
        type: "space",
        raw: t[0]
      };
    }
    code(e) {
      const t = this.rules.block.code.exec(e);
      if (t) {
        const e = t[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: t[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic ? e : fo(e, "\n")
        };
      }
    }
    fences(e) {
      const t = this.rules.block.fences.exec(e);
      if (t) {
        const e = t[0],
          n = function (e, t) {
            const n = e.match(/^(\s+)(?:```)/);
            if (null === n) return t;
            const r = n[1];
            return t.split("\n").map(e => {
              const t = e.match(/^\s+/);
              if (null === t) return e;
              const [n] = t;
              return n.length >= r.length ? e.slice(r.length) : e;
            }).join("\n");
          }(e, t[3] || "");
        return {
          type: "code",
          raw: e,
          lang: t[2] ? t[2].trim().replace(this.rules.inline._escapes, "$1") : t[2],
          text: n
        };
      }
    }
    heading(e) {
      const t = this.rules.block.heading.exec(e);
      if (t) {
        let e = t[2].trim();
        if (/#$/.test(e)) {
          const t = fo(e, "#");
          this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim());
        }
        return {
          type: "heading",
          raw: t[0],
          depth: t[1].length,
          text: e,
          tokens: this.lexer.inline(e)
        };
      }
    }
    hr(e) {
      const t = this.rules.block.hr.exec(e);
      if (t) return {
        type: "hr",
        raw: t[0]
      };
    }
    blockquote(e) {
      const t = this.rules.block.blockquote.exec(e);
      if (t) {
        const e = t[0].replace(/^ *>[ \t]?/gm, "");
        return {
          type: "blockquote",
          raw: t[0],
          tokens: this.lexer.blockTokens(e, []),
          text: e
        };
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e);
      if (t) {
        let n,
          r,
          i,
          l,
          o,
          s,
          a,
          c,
          u,
          p,
          d,
          h,
          f = t[1].trim();
        const g = f.length > 1,
          m = {
            type: "list",
            raw: "",
            ordered: g,
            start: g ? +f.slice(0, -1) : "",
            loose: !1,
            items: []
          };
        f = g ? `\\d{1,9}\\${f.slice(-1)}` : `\\${f}`, this.options.pedantic && (f = g ? f : "[*+-]");
        const v = new RegExp(`^( {0,3}${f})((?:[\t ][^\\n]*)?(?:\\n|$))`);
        for (; e && (h = !1, t = v.exec(e)) && !this.rules.block.hr.test(e);) {
          if (n = t[0], e = e.substring(n.length), c = t[2].split("\n", 1)[0], u = e.split("\n", 1)[0], this.options.pedantic ? (l = 2, d = c.trimLeft()) : (l = t[2].search(/[^ ]/), l = l > 4 ? 1 : l, d = c.slice(l), l += t[1].length), s = !1, !c && /^ *$/.test(u) && (n += u + "\n", e = e.substring(u.length + 1), h = !0), !h) {
            const t = new RegExp(`^ {0,${Math.min(3, l - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),
              r = new RegExp(`^ {0,${Math.min(3, l - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
              i = new RegExp(`^ {0,${Math.min(3, l - 1)}}(?:\`\`\`|~~~)`),
              o = new RegExp(`^ {0,${Math.min(3, l - 1)}}#`);
            for (; e && (p = e.split("\n", 1)[0], c = p, this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !i.test(c)) && !o.test(c) && !t.test(c) && !r.test(e);) {
              if (c.search(/[^ ]/) >= l || !c.trim()) d += "\n" + c.slice(l);else {
                if (s) break;
                d += "\n" + c;
              }
              s || c.trim() || (s = !0), n += p + "\n", e = e.substring(p.length + 1);
            }
          }
          m.loose || (a ? m.loose = !0 : /\n *\n *$/.test(n) && (a = !0)), this.options.gfm && (r = /^\[[ xX]\] /.exec(d), r && (i = "[ ] " !== r[0], d = d.replace(/^\[[ xX]\] +/, ""))), m.items.push({
            type: "list_item",
            raw: n,
            task: !!r,
            checked: i,
            loose: !1,
            text: d
          }), m.raw += n;
        }
        m.items[m.items.length - 1].raw = n.trimRight(), m.items[m.items.length - 1].text = d.trimRight(), m.raw = m.raw.trimRight();
        const y = m.items.length;
        for (o = 0; o < y; o++) {
          this.lexer.state.top = !1, m.items[o].tokens = this.lexer.blockTokens(m.items[o].text, []);
          const e = m.items[o].tokens.filter(e => "space" === e.type),
            t = e.every(e => {
              const t = e.raw.split("");
              let n = 0;
              for (const e of t) if ("\n" === e && (n += 1), n > 1) return !0;
              return !1;
            });
          !m.loose && e.length && t && (m.loose = !0, m.items[o].loose = !0);
        }
        return m;
      }
    }
    html(e) {
      const t = this.rules.block.html.exec(e);
      if (t) {
        const e = {
          type: "html",
          raw: t[0],
          pre: !this.options.sanitizer && ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
          text: t[0]
        };
        if (this.options.sanitize) {
          const n = this.options.sanitizer ? this.options.sanitizer(t[0]) : Yl(t[0]);
          e.type = "paragraph", e.text = n, e.tokens = this.lexer.inline(n);
        }
        return e;
      }
    }
    def(e) {
      const t = this.rules.block.def.exec(e);
      if (t) {
        t[3] && (t[3] = t[3].substring(1, t[3].length - 1));
        return {
          type: "def",
          tag: t[1].toLowerCase().replace(/\s+/g, " "),
          raw: t[0],
          href: t[2] ? t[2].replace(this.rules.inline._escapes, "$1") : t[2],
          title: t[3] ? t[3].replace(this.rules.inline._escapes, "$1") : t[3]
        };
      }
    }
    table(e) {
      const t = this.rules.block.table.exec(e);
      if (t) {
        const e = {
          type: "table",
          header: ho(t[1]).map(e => ({
            text: e
          })),
          align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : []
        };
        if (e.header.length === e.align.length) {
          e.raw = t[0];
          let n,
            r,
            i,
            l,
            o = e.align.length;
          for (n = 0; n < o; n++) /^ *-+: *$/.test(e.align[n]) ? e.align[n] = "right" : /^ *:-+: *$/.test(e.align[n]) ? e.align[n] = "center" : /^ *:-+ *$/.test(e.align[n]) ? e.align[n] = "left" : e.align[n] = null;
          for (o = e.rows.length, n = 0; n < o; n++) e.rows[n] = ho(e.rows[n], e.header.length).map(e => ({
            text: e
          }));
          for (o = e.header.length, r = 0; r < o; r++) e.header[r].tokens = this.lexer.inline(e.header[r].text);
          for (o = e.rows.length, r = 0; r < o; r++) for (l = e.rows[r], i = 0; i < l.length; i++) l[i].tokens = this.lexer.inline(l[i].text);
          return e;
        }
      }
    }
    lheading(e) {
      const t = this.rules.block.lheading.exec(e);
      if (t) return {
        type: "heading",
        raw: t[0],
        depth: "=" === t[2].charAt(0) ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
    }
    paragraph(e) {
      const t = this.rules.block.paragraph.exec(e);
      if (t) {
        const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
        return {
          type: "paragraph",
          raw: t[0],
          text: e,
          tokens: this.lexer.inline(e)
        };
      }
    }
    text(e) {
      const t = this.rules.block.text.exec(e);
      if (t) return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
    }
    escape(e) {
      const t = this.rules.inline.escape.exec(e);
      if (t) return {
        type: "escape",
        raw: t[0],
        text: Yl(t[1])
      };
    }
    tag(e) {
      const t = this.rules.inline.tag.exec(e);
      if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: this.options.sanitize ? "text" : "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : Yl(t[0]) : t[0]
      };
    }
    link(e) {
      const t = this.rules.inline.link.exec(e);
      if (t) {
        const e = t[2].trim();
        if (!this.options.pedantic && /^</.test(e)) {
          if (!/>$/.test(e)) return;
          const t = fo(e.slice(0, -1), "\\");
          if ((e.length - t.length) % 2 == 0) return;
        } else {
          const e = function (e, t) {
            if (-1 === e.indexOf(t[1])) return -1;
            const n = e.length;
            let r = 0,
              i = 0;
            for (; i < n; i++) if ("\\" === e[i]) i++;else if (e[i] === t[0]) r++;else if (e[i] === t[1] && (r--, r < 0)) return i;
            return -1;
          }(t[2], "()");
          if (e > -1) {
            const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
            t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
          }
        }
        let n = t[2],
          r = "";
        if (this.options.pedantic) {
          const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
          e && (n = e[1], r = e[3]);
        } else r = t[3] ? t[3].slice(1, -1) : "";
        return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), vo(t, {
          href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
          title: r ? r.replace(this.rules.inline._escapes, "$1") : r
        }, t[0], this.lexer);
      }
    }
    reflink(e, t) {
      let n;
      if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
        let e = (n[2] || n[1]).replace(/\s+/g, " ");
        if (e = t[e.toLowerCase()], !e || !e.href) {
          const e = n[0].charAt(0);
          return {
            type: "text",
            raw: e,
            text: e
          };
        }
        return vo(n, e, n[0], this.lexer);
      }
    }
    emStrong(e, t) {
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      let r = this.rules.inline.emStrong.lDelim.exec(e);
      if (!r) return;
      if (r[3] && n.match(/[\p{L}\p{N}]/u)) return;
      const i = r[1] || r[2] || "";
      if (!i || i && ("" === n || this.rules.inline.punctuation.exec(n))) {
        const n = r[0].length - 1;
        let i,
          l,
          o = n,
          s = 0;
        const a = "*" === r[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        for (a.lastIndex = 0, t = t.slice(-1 * e.length + n); null != (r = a.exec(t));) {
          if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
          if (l = i.length, r[3] || r[4]) {
            o += l;
            continue;
          }
          if ((r[5] || r[6]) && n % 3 && !((n + l) % 3)) {
            s += l;
            continue;
          }
          if (o -= l, o > 0) continue;
          l = Math.min(l, l + o + s);
          const t = e.slice(0, n + r.index + (r[0].length - i.length) + l);
          if (Math.min(n, l) % 2) {
            const e = t.slice(1, -1);
            return {
              type: "em",
              raw: t,
              text: e,
              tokens: this.lexer.inlineTokens(e)
            };
          }
          const a = t.slice(2, -2);
          return {
            type: "strong",
            raw: t,
            text: a,
            tokens: this.lexer.inlineTokens(a)
          };
        }
      }
    }
    codespan(e) {
      const t = this.rules.inline.code.exec(e);
      if (t) {
        let e = t[2].replace(/\n/g, " ");
        const n = /[^ ]/.test(e),
          r = /^ /.test(e) && / $/.test(e);
        return n && r && (e = e.substring(1, e.length - 1)), e = Yl(e, !0), {
          type: "codespan",
          raw: t[0],
          text: e
        };
      }
    }
    br(e) {
      const t = this.rules.inline.br.exec(e);
      if (t) return {
        type: "br",
        raw: t[0]
      };
    }
    del(e) {
      const t = this.rules.inline.del.exec(e);
      if (t) return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
    }
    autolink(e, t) {
      const n = this.rules.inline.autolink.exec(e);
      if (n) {
        let e, r;
        return "@" === n[2] ? (e = Yl(this.options.mangle ? t(n[1]) : n[1]), r = "mailto:" + e) : (e = Yl(n[1]), r = e), {
          type: "link",
          raw: n[0],
          text: e,
          href: r,
          tokens: [{
            type: "text",
            raw: e,
            text: e
          }]
        };
      }
    }
    url(e, t) {
      let n;
      if (n = this.rules.inline.url.exec(e)) {
        let e, r;
        if ("@" === n[2]) e = Yl(this.options.mangle ? t(n[0]) : n[0]), r = "mailto:" + e;else {
          let t;
          do {
            t = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])[0];
          } while (t !== n[0]);
          e = Yl(n[0]), r = "www." === n[1] ? "http://" + e : e;
        }
        return {
          type: "link",
          raw: n[0],
          text: e,
          href: r,
          tokens: [{
            type: "text",
            raw: e,
            text: e
          }]
        };
      }
    }
    inlineText(e, t) {
      const n = this.rules.inline.text.exec(e);
      if (n) {
        let e;
        return e = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(n[0]) : Yl(n[0]) : n[0] : Yl(this.options.smartypants ? t(n[0]) : n[0]), {
          type: "text",
          raw: n[0],
          text: e
        };
      }
    }
  }
  const wo = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: uo,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/,
    _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
  };
  wo.def = no(wo.def).replace("label", wo._label).replace("title", wo._title).getRegex(), wo.bullet = /(?:[*+-]|\d{1,9}[.)])/, wo.listItemStart = no(/^( *)(bull) */).replace("bull", wo.bullet).getRegex(), wo.list = no(wo.list).replace(/bull/g, wo.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + wo.def.source + ")").getRegex(), wo._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", wo._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, wo.html = no(wo.html, "i").replace("comment", wo._comment).replace("tag", wo._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), wo.paragraph = no(wo._paragraph).replace("hr", wo.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", wo._tag).getRegex(), wo.blockquote = no(wo.blockquote).replace("paragraph", wo.paragraph).getRegex(), wo.normal = po({}, wo), wo.gfm = po({}, wo.normal, {
    table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  }), wo.gfm.table = no(wo.gfm.table).replace("hr", wo.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", wo._tag).getRegex(), wo.gfm.paragraph = no(wo._paragraph).replace("hr", wo.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", wo.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", wo._tag).getRegex(), wo.pedantic = po({}, wo.normal, {
    html: no("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", wo._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: uo,
    paragraph: no(wo.normal._paragraph).replace("hr", wo.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", wo.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  });
  const bo = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: uo,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
      lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
      rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
      rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: uo,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/
  };
  function ko(e) {
    return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
  }
  function xo(e) {
    let t,
      n,
      r = "";
    const i = e.length;
    for (t = 0; t < i; t++) n = e.charCodeAt(t), Math.random() > .5 && (n = "x" + n.toString(16)), r += "&#" + n + ";";
    return r;
  }
  bo._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", bo.punctuation = no(bo.punctuation).replace(/punctuation/g, bo._punctuation).getRegex(), bo.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, bo.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g, bo._comment = no(wo._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), bo.emStrong.lDelim = no(bo.emStrong.lDelim).replace(/punct/g, bo._punctuation).getRegex(), bo.emStrong.rDelimAst = no(bo.emStrong.rDelimAst, "g").replace(/punct/g, bo._punctuation).getRegex(), bo.emStrong.rDelimUnd = no(bo.emStrong.rDelimUnd, "g").replace(/punct/g, bo._punctuation).getRegex(), bo._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, bo._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, bo._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, bo.autolink = no(bo.autolink).replace("scheme", bo._scheme).replace("email", bo._email).getRegex(), bo._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, bo.tag = no(bo.tag).replace("comment", bo._comment).replace("attribute", bo._attribute).getRegex(), bo._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, bo._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, bo._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, bo.link = no(bo.link).replace("label", bo._label).replace("href", bo._href).replace("title", bo._title).getRegex(), bo.reflink = no(bo.reflink).replace("label", bo._label).replace("ref", wo._label).getRegex(), bo.nolink = no(bo.nolink).replace("ref", wo._label).getRegex(), bo.reflinkSearch = no(bo.reflinkSearch, "g").replace("reflink", bo.reflink).replace("nolink", bo.nolink).getRegex(), bo.normal = po({}, bo), bo.pedantic = po({}, bo.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: no(/^!?\[(label)\]\((.*?)\)/).replace("label", bo._label).getRegex(),
    reflink: no(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", bo._label).getRegex()
  }), bo.gfm = po({}, bo.normal, {
    escape: no(bo.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  }), bo.gfm.url = no(bo.gfm.url, "i").replace("email", bo.gfm._extended_email).getRegex(), bo.breaks = po({}, bo.gfm, {
    br: no(bo.br).replace("{2,}", "*").getRegex(),
    text: no(bo.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  });
  class _o {
    constructor(e) {
      this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Wl, this.options.tokenizer = this.options.tokenizer || new yo(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
        inLink: !1,
        inRawBlock: !1,
        top: !0
      };
      const t = {
        block: wo.normal,
        inline: bo.normal
      };
      this.options.pedantic ? (t.block = wo.pedantic, t.inline = bo.pedantic) : this.options.gfm && (t.block = wo.gfm, this.options.breaks ? t.inline = bo.breaks : t.inline = bo.gfm), this.tokenizer.rules = t;
    }
    static get rules() {
      return {
        block: wo,
        inline: bo
      };
    }
    static lex(e, t) {
      return new _o(t).lex(e);
    }
    static lexInline(e, t) {
      return new _o(t).inlineTokens(e);
    }
    lex(e) {
      let t;
      for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
      return this.tokens;
    }
    blockTokens(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      let n, r, i, l;
      for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + "    ".repeat(n.length)); e;) if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(r => !!(n = r.call({
        lexer: this
      }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))) if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), 1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r.type ? t.push(n) : (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text);else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
        href: n.href,
        title: n.title
      }) : (r.raw += "\n" + n.raw, r.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text);else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);else {
        if (i = e, this.options.extensions && this.options.extensions.startBlock) {
          let t = 1 / 0;
          const n = e.slice(1);
          let r;
          this.options.extensions.startBlock.forEach(function (e) {
            r = e.call({
              lexer: this
            }, n), "number" == typeof r && r >= 0 && (t = Math.min(t, r));
          }), t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1));
        }
        if (this.state.top && (n = this.tokenizer.paragraph(i))) r = t[t.length - 1], l && "paragraph" === r.type ? (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n), l = i.length !== e.length, e = e.substring(n.raw.length);else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === r.type ? (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n);else if (e) {
          const t = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(t);
            break;
          }
          throw new Error(t);
        }
      }
      return this.state.top = !0, t;
    }
    inline(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.inlineQueue.push({
        src: e,
        tokens: t
      }), t;
    }
    inlineTokens(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      let n,
        r,
        i,
        l,
        o,
        s,
        a = e;
      if (this.tokens.links) {
        const e = Object.keys(this.tokens.links);
        if (e.length > 0) for (; null != (l = this.tokenizer.rules.inline.reflinkSearch.exec(a));) e.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, l.index) + "[" + mo("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; null != (l = this.tokenizer.rules.inline.blockSkip.exec(a));) a = a.slice(0, l.index) + "[" + mo("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      for (; null != (l = this.tokenizer.rules.inline.escapedEmSt.exec(a));) a = a.slice(0, l.index + l[0].length - 2) + "++" + a.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex), this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
      for (; e;) if (o || (s = ""), o = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(r => !!(n = r.call({
        lexer: this
      }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))) if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === n.type && "text" === r.type ? (r.raw += n.raw, r.text += n.text) : t.push(n);else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === n.type && "text" === r.type ? (r.raw += n.raw, r.text += n.text) : t.push(n);else if (n = this.tokenizer.emStrong(e, a, s)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.autolink(e, xo)) e = e.substring(n.raw.length), t.push(n);else if (this.state.inLink || !(n = this.tokenizer.url(e, xo))) {
        if (i = e, this.options.extensions && this.options.extensions.startInline) {
          let t = 1 / 0;
          const n = e.slice(1);
          let r;
          this.options.extensions.startInline.forEach(function (e) {
            r = e.call({
              lexer: this
            }, n), "number" == typeof r && r >= 0 && (t = Math.min(t, r));
          }), t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1));
        }
        if (n = this.tokenizer.inlineText(i, ko)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (s = n.raw.slice(-1)), o = !0, r = t[t.length - 1], r && "text" === r.type ? (r.raw += n.raw, r.text += n.text) : t.push(n);else if (e) {
          const t = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(t);
            break;
          }
          throw new Error(t);
        }
      } else e = e.substring(n.raw.length), t.push(n);
      return t;
    }
  }
  class Co {
    constructor(e) {
      this.options = e || Wl;
    }
    code(e, t, n) {
      const r = (t || "").match(/\S*/)[0];
      if (this.options.highlight) {
        const t = this.options.highlight(e, r);
        null != t && t !== e && (n = !0, e = t);
      }
      return e = e.replace(/\n$/, "") + "\n", r ? '<pre><code class="' + this.options.langPrefix + Yl(r, !0) + '">' + (n ? e : Yl(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : Yl(e, !0)) + "</code></pre>\n";
    }
    blockquote(e) {
      return `<blockquote>\n${e}</blockquote>\n`;
    }
    html(e) {
      return e;
    }
    heading(e, t, n, r) {
      if (this.options.headerIds) {
        return `<h${t} id="${this.options.headerPrefix + r.slug(n)}">${e}</h${t}>\n`;
      }
      return `<h${t}>${e}</h${t}>\n`;
    }
    hr() {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }
    list(e, t, n) {
      const r = t ? "ol" : "ul";
      return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n";
    }
    listitem(e) {
      return `<li>${e}</li>\n`;
    }
    checkbox(e) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
    }
    paragraph(e) {
      return `<p>${e}</p>\n`;
    }
    table(e, t) {
      return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n";
    }
    tablerow(e) {
      return `<tr>\n${e}</tr>\n`;
    }
    tablecell(e, t) {
      const n = t.header ? "th" : "td";
      return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`;
    }
    strong(e) {
      return `<strong>${e}</strong>`;
    }
    em(e) {
      return `<em>${e}</em>`;
    }
    codespan(e) {
      return `<code>${e}</code>`;
    }
    br() {
      return this.options.xhtml ? "<br/>" : "<br>";
    }
    del(e) {
      return `<del>${e}</del>`;
    }
    link(e, t, n) {
      if (null === (e = lo(this.options.sanitize, this.options.baseUrl, e))) return n;
      let r = '<a href="' + Yl(e) + '"';
      return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r;
    }
    image(e, t, n) {
      if (null === (e = lo(this.options.sanitize, this.options.baseUrl, e))) return n;
      let r = `<img src="${e}" alt="${n}"`;
      return t && (r += ` title="${t}"`), r += this.options.xhtml ? "/>" : ">", r;
    }
    text(e) {
      return e;
    }
  }
  class So {
    strong(e) {
      return e;
    }
    em(e) {
      return e;
    }
    codespan(e) {
      return e;
    }
    del(e) {
      return e;
    }
    html(e) {
      return e;
    }
    text(e) {
      return e;
    }
    link(e, t, n) {
      return "" + n;
    }
    image(e, t, n) {
      return "" + n;
    }
    br() {
      return "";
    }
  }
  class $o {
    constructor() {
      this.seen = {};
    }
    serialize(e) {
      return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
    }
    getNextSafeSlug(e, t) {
      let n = e,
        r = 0;
      if (this.seen.hasOwnProperty(n)) {
        r = this.seen[e];
        do {
          r++, n = e + "-" + r;
        } while (this.seen.hasOwnProperty(n));
      }
      return t || (this.seen[e] = r, this.seen[n] = 0), n;
    }
    slug(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const n = this.serialize(e);
      return this.getNextSafeSlug(n, t.dryrun);
    }
  }
  class Io {
    constructor(e) {
      this.options = e || Wl, this.options.renderer = this.options.renderer || new Co(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new So(), this.slugger = new $o();
    }
    static parse(e, t) {
      return new Io(t).parse(e);
    }
    static parseInline(e, t) {
      return new Io(t).parseInline(e);
    }
    parse(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      let n,
        r,
        i,
        l,
        o,
        s,
        a,
        c,
        u,
        p,
        d,
        h,
        f,
        g,
        m,
        v,
        y,
        w,
        b,
        k = "";
      const x = e.length;
      for (n = 0; n < x; n++) if (p = e[n], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[p.type] && (b = this.options.extensions.renderers[p.type].call({
        parser: this
      }, p), !1 !== b || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(p.type))) k += b || "";else switch (p.type) {
        case "space":
          continue;
        case "hr":
          k += this.renderer.hr();
          continue;
        case "heading":
          k += this.renderer.heading(this.parseInline(p.tokens), p.depth, eo(this.parseInline(p.tokens, this.textRenderer)), this.slugger);
          continue;
        case "code":
          k += this.renderer.code(p.text, p.lang, p.escaped);
          continue;
        case "table":
          for (c = "", a = "", l = p.header.length, r = 0; r < l; r++) a += this.renderer.tablecell(this.parseInline(p.header[r].tokens), {
            header: !0,
            align: p.align[r]
          });
          for (c += this.renderer.tablerow(a), u = "", l = p.rows.length, r = 0; r < l; r++) {
            for (s = p.rows[r], a = "", o = s.length, i = 0; i < o; i++) a += this.renderer.tablecell(this.parseInline(s[i].tokens), {
              header: !1,
              align: p.align[i]
            });
            u += this.renderer.tablerow(a);
          }
          k += this.renderer.table(c, u);
          continue;
        case "blockquote":
          u = this.parse(p.tokens), k += this.renderer.blockquote(u);
          continue;
        case "list":
          for (d = p.ordered, h = p.start, f = p.loose, l = p.items.length, u = "", r = 0; r < l; r++) m = p.items[r], v = m.checked, y = m.task, g = "", m.task && (w = this.renderer.checkbox(v), f ? m.tokens.length > 0 && "paragraph" === m.tokens[0].type ? (m.tokens[0].text = w + " " + m.tokens[0].text, m.tokens[0].tokens && m.tokens[0].tokens.length > 0 && "text" === m.tokens[0].tokens[0].type && (m.tokens[0].tokens[0].text = w + " " + m.tokens[0].tokens[0].text)) : m.tokens.unshift({
            type: "text",
            text: w
          }) : g += w), g += this.parse(m.tokens, f), u += this.renderer.listitem(g, y, v);
          k += this.renderer.list(u, d, h);
          continue;
        case "html":
          k += this.renderer.html(p.text);
          continue;
        case "paragraph":
          k += this.renderer.paragraph(this.parseInline(p.tokens));
          continue;
        case "text":
          for (u = p.tokens ? this.parseInline(p.tokens) : p.text; n + 1 < x && "text" === e[n + 1].type;) p = e[++n], u += "\n" + (p.tokens ? this.parseInline(p.tokens) : p.text);
          k += t ? this.renderer.paragraph(u) : u;
          continue;
        default:
          {
            const e = 'Token with "' + p.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
      }
      return k;
    }
    parseInline(e, t) {
      t = t || this.renderer;
      let n,
        r,
        i,
        l = "";
      const o = e.length;
      for (n = 0; n < o; n++) if (r = e[n], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type] && (i = this.options.extensions.renderers[r.type].call({
        parser: this
      }, r), !1 !== i || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type))) l += i || "";else switch (r.type) {
        case "escape":
        case "text":
          l += t.text(r.text);
          break;
        case "html":
          l += t.html(r.text);
          break;
        case "link":
          l += t.link(r.href, r.title, this.parseInline(r.tokens, t));
          break;
        case "image":
          l += t.image(r.href, r.title, r.text);
          break;
        case "strong":
          l += t.strong(this.parseInline(r.tokens, t));
          break;
        case "em":
          l += t.em(this.parseInline(r.tokens, t));
          break;
        case "codespan":
          l += t.codespan(r.text);
          break;
        case "br":
          l += t.br();
          break;
        case "del":
          l += t.del(this.parseInline(r.tokens, t));
          break;
        default:
          {
            const e = 'Token with "' + r.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
      }
      return l;
    }
  }
  function Eo(e, t, n) {
    if (null == e) throw new Error("marked(): input parameter is undefined or null");
    if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
    if ("function" == typeof t && (n = t, t = null), go(t = po({}, Eo.defaults, t || {})), n) {
      const r = t.highlight;
      let i;
      try {
        i = _o.lex(e, t);
      } catch (e) {
        return n(e);
      }
      const l = function (e) {
        let l;
        if (!e) try {
          t.walkTokens && Eo.walkTokens(i, t.walkTokens), l = Io.parse(i, t);
        } catch (t) {
          e = t;
        }
        return t.highlight = r, e ? n(e) : n(null, l);
      };
      if (!r || r.length < 3) return l();
      if (delete t.highlight, !i.length) return l();
      let o = 0;
      return Eo.walkTokens(i, function (e) {
        "code" === e.type && (o++, setTimeout(() => {
          r(e.text, e.lang, function (t, n) {
            if (t) return l(t);
            null != n && n !== e.text && (e.text = n, e.escaped = !0), o--, 0 === o && l();
          });
        }, 0));
      }), void (0 === o && l());
    }
    function r(e) {
      if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + Yl(e.message + "", !0) + "</pre>";
      throw e;
    }
    try {
      const n = _o.lex(e, t);
      if (t.walkTokens) {
        if (t.async) return Promise.all(Eo.walkTokens(n, t.walkTokens)).then(() => Io.parse(n, t)).catch(r);
        Eo.walkTokens(n, t.walkTokens);
      }
      return Io.parse(n, t);
    } catch (e) {
      r(e);
    }
  }
  Eo.options = Eo.setOptions = function (e) {
    var t;
    return po(Eo.defaults, e), t = Eo.defaults, Wl = t, Eo;
  }, Eo.getDefaults = Hl, Eo.defaults = Wl, Eo.use = function () {
    for (var _len8 = arguments.length, e = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      e[_key8] = arguments[_key8];
    }
    const t = po({}, ...e),
      n = Eo.defaults.extensions || {
        renderers: {},
        childTokens: {}
      };
    let r;
    e.forEach(e => {
      if (e.extensions && (r = !0, e.extensions.forEach(e => {
        if (!e.name) throw new Error("extension name required");
        if (e.renderer) {
          const t = n.renderers ? n.renderers[e.name] : null;
          n.renderers[e.name] = t ? function () {
            for (var _len9 = arguments.length, n = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              n[_key9] = arguments[_key9];
            }
            let r = e.renderer.apply(this, n);
            return !1 === r && (r = t.apply(this, n)), r;
          } : e.renderer;
        }
        if (e.tokenizer) {
          if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
          n[e.level] ? n[e.level].unshift(e.tokenizer) : n[e.level] = [e.tokenizer], e.start && ("block" === e.level ? n.startBlock ? n.startBlock.push(e.start) : n.startBlock = [e.start] : "inline" === e.level && (n.startInline ? n.startInline.push(e.start) : n.startInline = [e.start]));
        }
        e.childTokens && (n.childTokens[e.name] = e.childTokens);
      })), e.renderer) {
        const n = Eo.defaults.renderer || new Co();
        for (const t in e.renderer) {
          const r = n[t];
          n[t] = function () {
            for (var _len10 = arguments.length, i = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              i[_key10] = arguments[_key10];
            }
            let l = e.renderer[t].apply(n, i);
            return !1 === l && (l = r.apply(n, i)), l;
          };
        }
        t.renderer = n;
      }
      if (e.tokenizer) {
        const n = Eo.defaults.tokenizer || new yo();
        for (const t in e.tokenizer) {
          const r = n[t];
          n[t] = function () {
            for (var _len11 = arguments.length, i = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
              i[_key11] = arguments[_key11];
            }
            let l = e.tokenizer[t].apply(n, i);
            return !1 === l && (l = r.apply(n, i)), l;
          };
        }
        t.tokenizer = n;
      }
      if (e.walkTokens) {
        const n = Eo.defaults.walkTokens;
        t.walkTokens = function (t) {
          let r = [];
          return r.push(e.walkTokens.call(this, t)), n && (r = r.concat(n.call(this, t))), r;
        };
      }
      r && (t.extensions = n), Eo.setOptions(t);
    });
  }, Eo.walkTokens = function (e, t) {
    let n = [];
    for (const r of e) switch (n = n.concat(t.call(Eo, r)), r.type) {
      case "table":
        for (const e of r.header) n = n.concat(Eo.walkTokens(e.tokens, t));
        for (const e of r.rows) for (const r of e) n = n.concat(Eo.walkTokens(r.tokens, t));
        break;
      case "list":
        n = n.concat(Eo.walkTokens(r.items, t));
        break;
      default:
        Eo.defaults.extensions && Eo.defaults.extensions.childTokens && Eo.defaults.extensions.childTokens[r.type] ? Eo.defaults.extensions.childTokens[r.type].forEach(function (e) {
          n = n.concat(Eo.walkTokens(r[e], t));
        }) : r.tokens && (n = n.concat(Eo.walkTokens(r.tokens, t)));
    }
    return n;
  }, Eo.parseInline = function (e, t) {
    if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
    if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
    go(t = po({}, Eo.defaults, t || {}));
    try {
      const n = _o.lexInline(e, t);
      return t.walkTokens && Eo.walkTokens(n, t.walkTokens), Io.parseInline(n, t);
    } catch (e) {
      if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + Yl(e.message + "", !0) + "</pre>";
      throw e;
    }
  }, Eo.Parser = Io, Eo.parser = Io.parse, Eo.Renderer = Co, Eo.TextRenderer = So, Eo.Lexer = _o, Eo.lexer = _o.lex, Eo.Tokenizer = yo, Eo.Slugger = $o, Eo.parse = Eo;
  const Ro = /\$.*?\$/,
    Lo = /^\$(.*?)\$/,
    Ao = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/,
    zo = function () {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return e.replace(/:(.+?):/g, (e, n) => t[n] ? `<img class="wl-emoji" src="${t[n]}" alt="${n}">` : e);
    },
    Oo = (e, _ref32) => {
      let {
        emojiMap: t,
        highlighter: n,
        texRenderer: r
      } = _ref32;
      if (Eo.setOptions({
        highlight: n || void 0,
        breaks: !0,
        smartLists: !0,
        smartypants: !0
      }), r) {
        const e = (e => [{
          name: "blockMath",
          level: "block",
          tokenizer(t) {
            const n = Ao.exec(t);
            if (null !== n) return {
              type: "html",
              raw: n[0],
              text: e(!0, n[1])
            };
          }
        }, {
          name: "inlineMath",
          level: "inline",
          start(e) {
            const t = e.search(Ro);
            return -1 !== t ? t : e.length;
          },
          tokenizer(t) {
            const n = Lo.exec(t);
            if (null !== n) return {
              type: "html",
              raw: n[0],
              text: e(!1, n[1])
            };
          }
        }])(r);
        Eo.use({
          extensions: e
        });
      }
      return Eo.parse(zo(e, t));
    },
    jo = e => e.dataset.path || e.getAttribute("id"),
    To = _ref33 => {
      let {
        serverURL: e,
        path: t = window.location.pathname,
        selector: n = ".waline-comment-count",
        lang: r = "zh-CN"
      } = _ref33;
      const i = new AbortController(),
        l = document.querySelectorAll(n);
      return l.length && (_ref34 => {
        let {
          serverURL: e,
          lang: t,
          paths: n,
          signal: r
        } = _ref34;
        return fetch(`${e}/comment?type=count&url=${encodeURIComponent(n.join(","))}&lang=${t}`, {
          signal: r
        }).then(e => e.json()).then(e => Array.isArray(e) ? e : [e]);
      })({
        serverURL: I(e),
        paths: Array.from(l).map(e => C(e.dataset.path || e.getAttribute("id") || t)),
        lang: r,
        signal: i.signal
      }).then(e => {
        l.forEach((t, n) => {
          t.innerText = e[n].toString();
        });
      }).catch(Fl), i.abort.bind(i);
    };
  _exports.commentCount = To;
  let Po = null;
  const Uo = () => Po || (Po = _l("WALINE_LIKE", []));
  var Mo = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
    No = {},
    Fo = {},
    Do = {},
    Vo = Mo && Mo.__awaiter || function (e, t, n, r) {
      return new (n || (n = Promise))(function (i, l) {
        function o(e) {
          try {
            a(r.next(e));
          } catch (e) {
            l(e);
          }
        }
        function s(e) {
          try {
            a(r.throw(e));
          } catch (e) {
            l(e);
          }
        }
        function a(e) {
          var t;
          e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
            e(t);
          })).then(o, s);
        }
        a((r = r.apply(e, t || [])).next());
      });
    },
    Bo = Mo && Mo.__generator || function (e, t) {
      var n,
        r,
        i,
        l,
        o = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
      return l = {
        next: s(0),
        throw: s(1),
        return: s(2)
      }, "function" == typeof Symbol && (l[Symbol.iterator] = function () {
        return this;
      }), l;
      function s(l) {
        return function (s) {
          return function (l) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; o;) try {
              if (n = 1, r && (i = 2 & l[0] ? r.return : l[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, l[1])).done) return i;
              switch (r = 0, i && (l = [2 & l[0], i.value]), l[0]) {
                case 0:
                case 1:
                  i = l;
                  break;
                case 4:
                  return o.label++, {
                    value: l[1],
                    done: !1
                  };
                case 5:
                  o.label++, r = l[1], l = [0];
                  continue;
                case 7:
                  l = o.ops.pop(), o.trys.pop();
                  continue;
                default:
                  if (!(i = o.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                    o = 0;
                    continue;
                  }
                  if (3 === l[0] && (!i || l[1] > i[0] && l[1] < i[3])) {
                    o.label = l[1];
                    break;
                  }
                  if (6 === l[0] && o.label < i[1]) {
                    o.label = i[1], i = l;
                    break;
                  }
                  if (i && o.label < i[2]) {
                    o.label = i[2], o.ops.push(l);
                    break;
                  }
                  i[2] && o.ops.pop(), o.trys.pop();
                  continue;
              }
              l = t.call(e, o);
            } catch (e) {
              l = [6, e], r = 0;
            } finally {
              n = i = 0;
            }
            if (5 & l[0]) throw l[1];
            return {
              value: l[0] ? l[1] : void 0,
              done: !0
            };
          }([l, s]);
        };
      }
    };
  Object.defineProperty(Do, "__esModule", {
    value: !0
  }), Do.ReCaptchaInstance = void 0;
  var Ho = function () {
    function e(e, t, n) {
      this.siteKey = e, this.recaptchaID = t, this.recaptcha = n, this.styleContainer = null;
    }
    return e.prototype.execute = function (e) {
      return Vo(this, void 0, void 0, function () {
        return Bo(this, function (t) {
          return [2, this.recaptcha.enterprise ? this.recaptcha.enterprise.execute(this.recaptchaID, {
            action: e
          }) : this.recaptcha.execute(this.recaptchaID, {
            action: e
          })];
        });
      });
    }, e.prototype.getSiteKey = function () {
      return this.siteKey;
    }, e.prototype.hideBadge = function () {
      null === this.styleContainer && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer));
    }, e.prototype.showBadge = function () {
      null !== this.styleContainer && (document.head.removeChild(this.styleContainer), this.styleContainer = null);
    }, e;
  }();
  Do.ReCaptchaInstance = Ho, Object.defineProperty(Fo, "__esModule", {
    value: !0
  }), Fo.getInstance = Fo.load = void 0;
  var Wo,
    qo = Do;
  !function (e) {
    e[e.NOT_LOADED = 0] = "NOT_LOADED", e[e.LOADING = 1] = "LOADING", e[e.LOADED = 2] = "LOADED";
  }(Wo || (Wo = {}));
  var Zo = function () {
    function e() {}
    return e.load = function (t, n) {
      if (void 0 === n && (n = {}), "undefined" == typeof document) return Promise.reject(new Error("This is a library for the browser!"));
      if (e.getLoadingState() === Wo.LOADED) return e.instance.getSiteKey() === t ? Promise.resolve(e.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
      if (e.getLoadingState() === Wo.LOADING) return t !== e.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function (t, n) {
        e.successfulLoadingConsumers.push(function (e) {
          return t(e);
        }), e.errorLoadingRunnable.push(function (e) {
          return n(e);
        });
      });
      e.instanceSiteKey = t, e.setLoadingState(Wo.LOADING);
      var r = new e();
      return new Promise(function (i, l) {
        r.loadScript(t, n.useRecaptchaNet || !1, n.useEnterprise || !1, n.renderParameters ? n.renderParameters : {}, n.customUrl).then(function () {
          e.setLoadingState(Wo.LOADED);
          var l = r.doExplicitRender(grecaptcha, t, n.explicitRenderParameters ? n.explicitRenderParameters : {}, n.useEnterprise || !1),
            o = new qo.ReCaptchaInstance(t, l, grecaptcha);
          e.successfulLoadingConsumers.forEach(function (e) {
            return e(o);
          }), e.successfulLoadingConsumers = [], n.autoHideBadge && o.hideBadge(), e.instance = o, i(o);
        }).catch(function (t) {
          e.errorLoadingRunnable.forEach(function (e) {
            return e(t);
          }), e.errorLoadingRunnable = [], l(t);
        });
      });
    }, e.getInstance = function () {
      return e.instance;
    }, e.setLoadingState = function (t) {
      e.loadingState = t;
    }, e.getLoadingState = function () {
      return null === e.loadingState ? Wo.NOT_LOADED : e.loadingState;
    }, e.prototype.loadScript = function (t, n, r, i, l) {
      var o = this;
      void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === i && (i = {}), void 0 === l && (l = "");
      var s = document.createElement("script");
      s.setAttribute("recaptcha-v3-script", "");
      var a = "https://www.google.com/recaptcha/api.js";
      n && (a = r ? "https://recaptcha.net/recaptcha/enterprise.js" : "https://recaptcha.net/recaptcha/api.js"), r && (a = "https://www.google.com/recaptcha/enterprise.js"), l && (a = l), i.render && (i.render = void 0);
      var c = this.buildQueryString(i);
      return s.src = a + "?render=explicit" + c, new Promise(function (t, n) {
        s.addEventListener("load", o.waitForScriptToLoad(function () {
          t(s);
        }, r), !1), s.onerror = function (t) {
          e.setLoadingState(Wo.NOT_LOADED), n(t);
        }, document.head.appendChild(s);
      });
    }, e.prototype.buildQueryString = function (e) {
      return Object.keys(e).length < 1 ? "" : "&" + Object.keys(e).filter(function (t) {
        return !!e[t];
      }).map(function (t) {
        return t + "=" + e[t];
      }).join("&");
    }, e.prototype.waitForScriptToLoad = function (t, n) {
      var r = this;
      return function () {
        void 0 === window.grecaptcha ? setTimeout(function () {
          r.waitForScriptToLoad(t, n);
        }, e.SCRIPT_LOAD_DELAY) : n ? window.grecaptcha.enterprise.ready(function () {
          t();
        }) : window.grecaptcha.ready(function () {
          t();
        });
      };
    }, e.prototype.doExplicitRender = function (e, t, n, r) {
      var i = {
        sitekey: t,
        badge: n.badge,
        size: n.size,
        tabindex: n.tabindex
      };
      return n.container ? r ? e.enterprise.render(n.container, i) : e.render(n.container, i) : r ? e.enterprise.render(i) : e.render(i);
    }, e.loadingState = null, e.instance = null, e.instanceSiteKey = null, e.successfulLoadingConsumers = [], e.errorLoadingRunnable = [], e.SCRIPT_LOAD_DELAY = 25, e;
  }();
  Fo.load = Zo.load, Fo.getInstance = Zo.getInstance, function (e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.ReCaptchaInstance = e.getInstance = e.load = void 0;
    var t = Fo;
    Object.defineProperty(e, "load", {
      enumerable: !0,
      get: function () {
        return t.load;
      }
    }), Object.defineProperty(e, "getInstance", {
      enumerable: !0,
      get: function () {
        return t.getInstance;
      }
    });
    var n = Do;
    Object.defineProperty(e, "ReCaptchaInstance", {
      enumerable: !0,
      get: function () {
        return n.ReCaptchaInstance;
      }
    });
  }(No);
  const Go = {};
  let Ko = null;
  const Qo = () => Ko ?? (Ko = _l("WALINE_VOTE", []));
  let Jo = null;
  const Yo = () => Jo ?? (Jo = _l("WALINE_USER", {}));
  var Xo = Dn({
      setup() {
        const e = Kt([]),
          t = Qo(),
          n = Tn("config"),
          r = oi(() => n.value.locale),
          i = oi(() => {
            const {
              reaction: i,
              path: l
            } = n.value;
            return i.map((n, i) => ({
              icon: n,
              vote: e.value[i] || 0,
              desc: r.value[`reaction${i}`],
              active: Boolean(t.value.find(_ref35 => {
                let {
                  id: e,
                  i: t
                } = _ref35;
                return e === l && t === i;
              }))
            }));
          });
        let l;
        return Hn(() => {
          Mn(() => [n.value.serverURL, n.value.path], () => {
            (() => {
              const {
                serverURL: t,
                lang: r,
                path: i,
                reaction: o
              } = n.value;
              if (o.length) {
                const n = new AbortController();
                k({
                  serverURL: t,
                  lang: r,
                  paths: [i],
                  type: o.map((e, t) => `reaction${t}`),
                  signal: n.signal
                }).then(t => {
                  Array.isArray(t) || "number" == typeof t || (e.value = o.map((e, n) => t[`reaction${n}`]));
                }), l = n.abort.bind(n);
              }
            })();
          }, {
            immediate: !0
          });
        }), qn(() => {
          var _l2;
          return (_l2 = l) === null || _l2 === void 0 ? void 0 : _l2();
        }), {
          reaction: i,
          locale: r,
          vote: async r => {
            const {
                serverURL: i,
                lang: l,
                path: o
              } = n.value,
              s = t.value.find(_ref36 => {
                let {
                  id: e
                } = _ref36;
                return e === o;
              });
            s && s.i === r || (await x({
              serverURL: i,
              lang: l,
              path: o,
              type: `reaction${r}`
            }), e.value[r] = (e.value[r] || 0) + 1, s ? (e.value[s.i] = Math.max(e.value[s.i] - 1, 0), x({
              serverURL: i,
              lang: l,
              path: o,
              type: `reaction${s.i}`,
              action: "desc"
            }), s.i = r, t.value = Array.from(t.value)) : t.value = [...t.value, {
              id: o,
              i: r
            }], t.value.length > 50 && (t.value = t.value.slice(-50)));
          }
        };
      }
    }),
    es = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [e, r] of t) n[e] = r;
      return n;
    };
  const ts = {
      key: 0,
      class: "wl-reaction"
    },
    ns = ["textContent"],
    rs = ["onClick"],
    is = {
      class: "wl-reaction-img"
    },
    ls = ["src", "alt"],
    os = {
      class: "wl-reaction-votes"
    },
    ss = {
      class: "wl-reaction-text"
    };
  var as,
    cs,
    us = es(Xo, [["render", function (e, t, n, r, i, l) {
      return e.reaction.length ? (Lr(), jr("div", ts, [Dr("h4", {
        textContent: H(e.locale.reactionTitle)
      }, null, 8, ns), Dr("ul", null, [(Lr(!0), jr(Cr, null, Yn(e.reaction, (t, n) => (Lr(), jr("li", {
        key: n,
        class: N({
          active: t.active
        }),
        onClick: t => e.vote(n)
      }, [Dr("div", is, [Dr("img", {
        src: t.icon,
        alt: t.desc
      }, null, 8, ls), Dr("div", os, H(t.vote), 1)]), Dr("div", ss, H(t.desc), 1)], 10, rs))), 128))])])) : Wr("v-if", !0);
    }], ["__file", "ArticleReaction.vue"]]),
    ps = "function" == typeof Map ? new Map() : (as = [], cs = [], {
      has: function (e) {
        return as.indexOf(e) > -1;
      },
      get: function (e) {
        return cs[as.indexOf(e)];
      },
      set: function (e, t) {
        -1 === as.indexOf(e) && (as.push(e), cs.push(t));
      },
      delete: function (e) {
        var t = as.indexOf(e);
        t > -1 && (as.splice(t, 1), cs.splice(t, 1));
      }
    }),
    ds = function (e) {
      return new Event(e, {
        bubbles: !0
      });
    };
  try {
    new Event("test");
  } catch (as) {
    ds = function (e) {
      var t = document.createEvent("Event");
      return t.initEvent(e, !0, !1), t;
    };
  }
  function hs(e) {
    var t = ps.get(e);
    t && t.destroy();
  }
  function fs(e) {
    var t = ps.get(e);
    t && t.update();
  }
  var gs = null;
  "undefined" == typeof window || "function" != typeof window.getComputedStyle ? ((gs = function (e) {
    return e;
  }).destroy = function (e) {
    return e;
  }, gs.update = function (e) {
    return e;
  }) : ((gs = function (e, t) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], function (e) {
      return function (e) {
        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !ps.has(e)) {
          var t,
            n = null,
            r = null,
            i = null,
            l = function () {
              e.clientWidth !== r && c();
            },
            o = function (t) {
              window.removeEventListener("resize", l, !1), e.removeEventListener("input", c, !1), e.removeEventListener("keyup", c, !1), e.removeEventListener("autosize:destroy", o, !1), e.removeEventListener("autosize:update", c, !1), Object.keys(t).forEach(function (n) {
                e.style[n] = t[n];
              }), ps.delete(e);
            }.bind(e, {
              height: e.style.height,
              resize: e.style.resize,
              overflowY: e.style.overflowY,
              overflowX: e.style.overflowX,
              wordWrap: e.style.wordWrap
            });
          e.addEventListener("autosize:destroy", o, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", c, !1), window.addEventListener("resize", l, !1), e.addEventListener("input", c, !1), e.addEventListener("autosize:update", c, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", ps.set(e, {
            destroy: o,
            update: c
          }), "vertical" === (t = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), n = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(n) && (n = 0), c();
        }
        function s(t) {
          var n = e.style.width;
          e.style.width = "0px", e.style.width = n, e.style.overflowY = t;
        }
        function a() {
          if (0 !== e.scrollHeight) {
            var t = function (e) {
                for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                  node: e.parentNode,
                  scrollTop: e.parentNode.scrollTop
                }), e = e.parentNode;
                return t;
              }(e),
              i = document.documentElement && document.documentElement.scrollTop;
            e.style.height = "", e.style.height = e.scrollHeight + n + "px", r = e.clientWidth, t.forEach(function (e) {
              e.node.scrollTop = e.scrollTop;
            }), i && (document.documentElement.scrollTop = i);
          }
        }
        function c() {
          a();
          var t = Math.round(parseFloat(e.style.height)),
            n = window.getComputedStyle(e, null),
            r = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
          if (r < t ? "hidden" === n.overflowY && (s("scroll"), a(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (s("hidden"), a(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), i !== r) {
            i = r;
            var l = ds("autosize:resized");
            try {
              e.dispatchEvent(l);
            } catch (e) {}
          }
        }
      }(e);
    }), e;
  }).destroy = function (e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], hs), e;
  }, gs.update = function (e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], fs), e;
  });
  var ms = gs;
  const vs = _ref37 => {
    let {
      size: e
    } = _ref37;
    return si("svg", {
      width: e,
      height: e,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid"
    }, si("circle", {
      cx: 50,
      cy: 50,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "4",
      r: "40",
      "stroke-dasharray": "85 30"
    }, si("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      repeatCount: "indefinite",
      dur: "1s",
      values: "0 50 50;360 50 50",
      keyTimes: "0;1"
    })));
  };
  var ys = Dn({
    name: "ImageWall",
    components: {
      LoadingIcon: vs
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      columnWidth: {
        type: Number,
        default: 300
      },
      gap: {
        type: Number,
        default: 0
      }
    },
    emits: ["insert"],
    setup(e) {
      let t = null;
      const n = Kt(null),
        r = Kt({}),
        i = Kt([]),
        l = () => {
          const t = Math.floor((n.value.getBoundingClientRect().width + e.gap) / (e.columnWidth + e.gap));
          return t > 0 ? t : 1;
        },
        o = async t => {
          var _n$value;
          if (t >= e.items.length) return;
          await vn();
          const r = Array.from(((_n$value = n.value) === null || _n$value === void 0 ? void 0 : _n$value.children) || []).reduce((e, t) => t.getBoundingClientRect().height < e.getBoundingClientRect().height ? t : e);
          i.value[Number(r.dataset.index)].push(t), await o(t + 1);
        },
        s = async function () {
          let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
          if (i.value.length === l() && !e) return;
          var t;
          i.value = (t = l(), new Array(t).fill(null).map(() => []));
          const n = window.scrollY;
          await o(0), window.scrollTo({
            top: n
          });
        };
      return Hn(() => {
        s(!0), t = new ResizeObserver(() => s()), t.observe(n.value), Mn(() => [e.items], () => {
          r.value = {}, s(!0);
        }), Mn(() => [e.columnWidth, e.gap], () => s());
      }), Wn(() => t.unobserve(n.value)), {
        columns: i,
        state: r,
        wall: n,
        imageLoad: e => {
          r.value[e.target.src] = !0;
        }
      };
    }
  });
  const ws = ["data-index"],
    bs = ["src", "title", "onClick"];
  var ks = Dn({
    name: "CommentBox",
    components: {
      CloseIcon: _ref38 => {
        let {
          size: e
        } = _ref38;
        return si("svg", {
          class: "wl-close-icon",
          viewBox: "0 0 1024 1024",
          width: e,
          height: e
        }, [si("path", {
          d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z",
          fill: "currentColor"
        }), si("path", {
          d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z",
          fill: "#888"
        })]);
      },
      EmojiIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, si("path", {
        d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z",
        fill: "currentColor"
      })),
      ImageIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, [si("path", {
        d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z",
        fill: "currentColor"
      }), si("path", {
        d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z",
        fill: "currentColor"
      })]),
      ImageWall: es(ys, [["render", function (e, t, n, r, i, l) {
        const o = Kn("LoadingIcon");
        return Lr(), jr("div", {
          ref: "wall",
          class: "wl-gallery",
          style: j({
            gap: `${e.gap}px`
          })
        }, [(Lr(!0), jr(Cr, null, Yn(e.columns, (n, r) => (Lr(), jr("div", {
          key: r,
          class: "wl-gallery-column",
          "data-index": r,
          style: j({
            gap: `${e.gap}px`
          })
        }, [(Lr(!0), jr(Cr, null, Yn(n, n => (Lr(), jr(Cr, {
          key: n
        }, [e.state[e.items[n].src] ? Wr("v-if", !0) : (Lr(), Tr(o, {
          key: 0,
          size: 36,
          style: {
            margin: "20px auto"
          }
        })), Dr("img", {
          class: "wl-gallery-item",
          src: e.items[n].src,
          title: e.items[n].title,
          loading: "lazy",
          onLoad: t[0] || (t[0] = function () {
            return e.imageLoad && e.imageLoad(...arguments);
          }),
          onClick: t => e.$emit("insert", `![](${e.items[n].src})`)
        }, null, 40, bs)], 64))), 128))], 12, ws))), 128))], 4);
      }], ["__file", "ImageWall.vue"]]),
      MarkdownIcon: () => si("svg", {
        width: "16",
        height: "16",
        ariaHidden: "true"
      }, si("path", {
        d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z",
        fill: "currentColor"
      })),
      PreviewIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, [si("path", {
        d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0",
        fill: "currentColor"
      }), si("path", {
        d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0",
        fill: "currentColor"
      })]),
      LoadingIcon: vs,
      GifIcon: () => si("svg", {
        width: 24,
        height: 24,
        fill: "currentcolor",
        viewBox: "0 0 24 24"
      }, [si("path", {
        style: "transform: translateY(0.5px)",
        d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z"
      }), si("path", {
        d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z"
      })])
    },
    props: {
      rootId: {
        type: String,
        default: ""
      },
      replyId: {
        type: String,
        default: ""
      },
      replyUser: {
        type: String,
        default: ""
      },
      edit: {
        type: Object,
        default: null
      }
    },
    emits: ["submit", "cancel-reply", "cancel-edit"],
    setup(e, _ref39) {
      let {
        emit: t
      } = _ref39;
      const n = Tn("config"),
        r = _l("WALINE_COMMENT_BOX_EDITOR", ""),
        i = _l("WALINE_USER_META", {
          nick: "",
          mail: "",
          link: ""
        }),
        l = Yo(),
        o = Kt({}),
        s = Kt(null),
        a = Kt(null),
        c = Kt(null),
        u = Kt(null),
        p = Kt(null),
        d = Kt(null),
        h = Kt(null),
        f = Kt({
          tabs: [],
          map: {}
        }),
        g = Kt(0),
        m = Kt(!1),
        v = Kt(!1),
        y = Kt(!1),
        w = Kt(""),
        b = Kt(0),
        k = Tt({
          loading: !0,
          list: []
        }),
        x = Kt(0),
        C = Kt(!1),
        $ = Kt(""),
        I = Kt(!1),
        E = oi(() => n.value.locale),
        R = oi(() => {
          var _l$value;
          return Boolean((_l$value = l.value) === null || _l$value === void 0 ? void 0 : _l$value.token);
        }),
        L = oi(() => !1 !== n.value.imageUploader),
        A = e => {
          const t = s.value,
            n = t.selectionStart,
            i = t.selectionEnd || 0,
            l = t.scrollTop;
          r.value = t.value.substring(0, n) + e + t.value.substring(i, t.value.length), t.focus(), t.selectionStart = n + e.length, t.selectionEnd = n + e.length, t.scrollTop = l;
        },
        z = e => {
          const t = `![${n.value.locale.uploading} ${e.name}]()`;
          return A(t), Promise.resolve().then(() => n.value.imageUploader(e)).then(n => {
            r.value = r.value.replace(t, `\r\n![${e.name}](${n})`);
          }).catch(e => {
            alert(e.message), r.value = r.value.replace(t, "");
          });
        },
        O = async () => {
          var _l$value2, _l$value3;
          const {
            serverURL: a,
            lang: c,
            login: u,
            wordLimit: p,
            requiredMeta: d
          } = n.value;
          let h = "";
          n.value.recaptchaV3Key && (h = await (e => {
            const t = Go[e] ?? (Go[e] = No.load(e, {
              useRecaptchaNet: !0,
              autoHideBadge: !0
            }));
            return {
              execute: e => t.then(t => t.execute(e))
            };
          })(n.value.recaptchaV3Key).execute("social"));
          const g = {
            comment: $.value,
            nick: i.value.nick,
            mail: i.value.mail,
            link: i.value.link,
            ua: navigator.userAgent,
            url: n.value.path,
            recaptchaV3: h
          };
          if ((_l$value2 = l.value) !== null && _l$value2 !== void 0 && _l$value2.token) g.nick = l.value.display_name, g.mail = l.value.email, g.link = l.value.url;else {
            var _o$value$nick, _o$value$mail, _s$value;
            if ("force" === u) return;
            if (d.indexOf("nick") > -1 && !g.nick) return (_o$value$nick = o.value.nick) !== null && _o$value$nick !== void 0 && _o$value$nick.focus(), alert(E.value.nickError);
            if (d.indexOf("mail") > -1 && !g.mail || g.mail && !/^\w(?:[\w._-]*\w)?@(?:\w(?:[\w-]*\w)?\.)*\w+$/.exec(g.mail)) return (_o$value$mail = o.value.mail) !== null && _o$value$mail !== void 0 && _o$value$mail.focus(), alert(E.value.mailError);
            if (!g.comment) return void ((_s$value = s.value) === null || _s$value === void 0 ? void 0 : _s$value.focus());
            g.nick || (g.nick = E.value.anonymous);
          }
          if (!C.value) return alert(E.value.wordHint.replace("$0", p[0].toString()).replace("$1", p[1].toString()).replace("$2", b.value.toString()));
          g.comment = zo(g.comment, f.value.map), e.replyId && e.rootId && (g.pid = e.replyId, g.rid = e.rootId, g.at = e.replyUser), I.value = !0;
          const m = {
            serverURL: a,
            lang: c,
            token: (_l$value3 = l.value) === null || _l$value3 === void 0 ? void 0 : _l$value3.token,
            comment: g
          };
          (e.edit ? _({
            objectId: e.edit.objectId,
            ...m
          }) : (_ref40 => {
            let {
              serverURL: e,
              lang: t,
              token: n,
              comment: r
            } = _ref40;
            const i = {
              "Content-Type": "application/json"
            };
            return n && (i.Authorization = `Bearer ${n}`), fetch(`${e}/comment?lang=${t}`, {
              method: "POST",
              headers: i,
              body: JSON.stringify(r)
            }).then(e => e.json());
          })(m)).then(n => {
            var _e$edit;
            if (I.value = !1, n.errmsg) return alert(n.errmsg);
            t("submit", n.data), r.value = "", w.value = "", e.replyId && t("cancel-reply"), ((_e$edit = e.edit) === null || _e$edit === void 0 ? void 0 : _e$edit.objectId) && t("cancel-edit");
          }).catch(e => {
            I.value = !1, alert(e.message);
          });
        },
        j = e => {
          c.value.contains(e.target) || u.value.contains(e.target) || (m.value = !1), p.value.contains(e.target) || d.value.contains(e.target) || (v.value = !1);
        },
        T = async e => {
          var _h$value;
          const {
              scrollTop: t,
              clientHeight: r,
              scrollHeight: i
            } = e.target,
            l = (r + t) / i,
            o = n.value.search,
            s = ((_h$value = h.value) === null || _h$value === void 0 ? void 0 : _h$value.value) || "";
          l < .9 || k.loading || (k.loading = !0, k.list = [...k.list, ...(o.more && k.list.length ? await o.more(s, k.list.length) : await o.search(s))], k.loading = !1, setTimeout(() => {
            e.target.scrollTop = t;
          }, 50));
        },
        P = Qi(e => {
          k.list = [], T(e);
        }, 300);
      Mn([n, b], _ref41 => {
        let [e, t] = _ref41;
        const {
          wordLimit: n
        } = e;
        n ? t < n[0] && 0 !== n[0] ? (x.value = n[0], C.value = !1) : t > n[1] ? (x.value = n[1], C.value = !1) : (x.value = n[1], C.value = !0) : (x.value = 0, C.value = !0);
      }, {
        immediate: !0
      });
      const U = _ref42 => {
        let {
          data: e
        } = _ref42;
        e && "profile" === e.type && (l.value = {
          ...l.value,
          ...e.data
        }, [localStorage, sessionStorage].filter(e => e.getItem("WALINE_USER")).forEach(e => e.setItem("WALINE_USER", JSON.stringify(l))));
      };
      return Hn(() => {
        var _e$edit2;
        document.body.addEventListener("click", j), window.addEventListener("message", U), (_e$edit2 = e.edit) !== null && _e$edit2 !== void 0 && _e$edit2.objectId && (r.value = e.edit.orig), Mn(v, async e => {
          if (!e) return;
          const t = n.value.search;
          h.value && (h.value.value = ""), k.loading = !0, k.list = t.default ? await t.default() : await t.search(""), k.loading = !1;
        }), Mn(() => r.value, e => {
          const {
            highlighter: t,
            texRenderer: r
          } = n.value;
          $.value = e, w.value = Oo(e, {
            emojiMap: f.value.map,
            highlighter: t,
            texRenderer: r
          }), b.value = (e => (e => e.match(/[\w\d\s\u00C0-\u024F]+/giu) || [])(e).reduce((e, t) => e + ("" === t.trim() ? 0 : t.trim().split(/\s+/u).length), 0) + (e => e.match(/[\u4E00-\u9FA5]/gu) || [])(e).length)(e), e ? ms(s.value) : ms.destroy(s.value);
        }, {
          immediate: !0
        }), Mn(() => n.value.emoji, e => {
          return (t = Array.isArray(e) ? e : [], Promise.all(t.map(e => "string" == typeof e ? Ml(S(e)) : Promise.resolve(e))).then(e => {
            const t = {
              tabs: [],
              map: {}
            };
            return e.forEach(e => {
              const {
                name: n,
                folder: r,
                icon: i,
                prefix: l,
                type: o,
                items: s
              } = e;
              t.tabs.push({
                name: n,
                icon: Nl(i, r, l, o),
                items: s.map(e => {
                  const n = `${l || ""}${e}`;
                  return t.map[n] = Nl(e, r, l, o), n;
                })
              });
            }), t;
          })).then(e => {
            f.value = e;
          });
          var t;
        }, {
          immediate: !0
        });
      }), qn(() => {
        document.body.removeEventListener("click", j), window.removeEventListener("message", U);
      }), {
        config: n,
        locale: E,
        insert: A,
        onChange: () => {
          const e = a.value;
          e.files && L.value && z(e.files[0]).then(() => {
            e.value = "";
          });
        },
        onDrop: e => {
          var _e$dataTransfer;
          if ((_e$dataTransfer = e.dataTransfer) !== null && _e$dataTransfer !== void 0 && _e$dataTransfer.items) {
            const t = Bl(e.dataTransfer.items);
            t && L.value && (z(t), e.preventDefault());
          }
        },
        onKeyDown: e => {
          const t = e.key;
          (e.ctrlKey || e.metaKey) && "Enter" === t && O();
        },
        onPaste: e => {
          if (e.clipboardData) {
            const t = Bl(e.clipboardData.items);
            t && L.value && z(t);
          }
        },
        onLogin: e => {
          e.preventDefault();
          const {
            lang: t,
            serverURL: r
          } = n.value;
          (_ref43 => {
            let {
              lang: e,
              serverURL: t
            } = _ref43;
            const n = (window.innerWidth - 450) / 2,
              r = (window.innerHeight - 450) / 2,
              i = window.open(`${t}/ui/login?lng=${encodeURIComponent(e)}`, "_blank", `width=450,height=450,left=${n},top=${r},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
            return i !== null && i !== void 0 && i.postMessage({
              type: "TOKEN",
              data: null
            }, "*"), new Promise(e => {
              const t = _ref44 => {
                let {
                  data: n
                } = _ref44;
                n && "object" == typeof n && "userInfo" === n.type && n.data.token && (i !== null && i !== void 0 && i.close(), window.removeEventListener("message", t), e(n.data));
              };
              window.addEventListener("message", t);
            });
          })({
            serverURL: r,
            lang: t
          }).then(e => {
            l.value = e, (e.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(e));
          });
        },
        onLogout: () => {
          l.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null");
        },
        onProfile: e => {
          var _window$open;
          e.preventDefault();
          const {
              lang: t,
              serverURL: r
            } = n.value,
            i = (window.innerWidth - 800) / 2,
            o = (window.innerHeight - 800) / 2,
            s = new URLSearchParams({
              lng: t,
              token: l.value.token
            });
          (_window$open = window.open(`${r}/ui/profile?${s.toString()}`, "_blank", `width=800,height=800,left=${i},top=${o},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`)) === null || _window$open === void 0 ? void 0 : _window$open.postMessage({
            type: "TOKEN",
            data: l.value.token
          }, "*");
        },
        submitComment: O,
        onImageWallScroll: T,
        onGifSearch: P,
        isLogin: R,
        userInfo: l,
        isSubmitting: I,
        wordNumber: b,
        wordLimit: x,
        isWordNumberLegal: C,
        editor: r,
        userMeta: i,
        emoji: f,
        emojiTabIndex: g,
        showEmoji: m,
        gifData: k,
        showGif: v,
        canUploadImage: L,
        previewText: w,
        showPreview: y,
        inputRefs: o,
        editorRef: s,
        emojiButtonRef: c,
        emojiPopupRef: u,
        gifButtonRef: p,
        gifPopupRef: d,
        imageUploadRef: a,
        gifSearchInputRef: h
      };
    }
  });
  const xs = {
      class: "wl-comment"
    },
    _s = {
      key: 0,
      class: "wl-login-info"
    },
    Cs = {
      class: "wl-avatar"
    },
    Ss = ["title"],
    $s = ["title"],
    Is = ["src"],
    Es = ["title", "textContent"],
    Rs = {
      class: "wl-panel"
    },
    Ls = ["for", "textContent"],
    As = ["id", "onUpdate:modelValue", "name", "type"],
    zs = ["placeholder"],
    Os = {
      class: "wl-preview"
    },
    js = Dr("hr", null, null, -1),
    Ts = ["innerHTML"],
    Ps = {
      class: "wl-footer"
    },
    Us = {
      class: "wl-actions"
    },
    Ms = {
      href: "https://guides.github.com/features/mastering-markdown/",
      title: "Markdown Guide",
      "aria-label": "Markdown is supported",
      class: "wl-action",
      target: "_blank",
      rel: "noreferrer"
    },
    Ns = ["title"],
    Fs = ["title"],
    Ds = ["title"],
    Vs = ["title"],
    Bs = {
      class: "wl-info"
    },
    Hs = {
      class: "wl-text-number"
    },
    Ws = {
      key: 0
    },
    qs = ["textContent"],
    Zs = ["textContent"],
    Gs = ["disabled"],
    Ks = ["placeholder"],
    Qs = {
      key: 0,
      class: "wl-loading"
    },
    Js = {
      key: 0,
      class: "wl-tab-wrapper"
    },
    Ys = ["title", "onClick"],
    Xs = ["src", "alt"],
    ea = {
      key: 0,
      class: "wl-tabs"
    },
    ta = ["onClick"],
    na = ["src", "alt", "title"],
    ra = ["title"];
  var ia = es(ks, [["render", function (e, t, n, r, i, l) {
    var _e$edit3, _e$edit4;
    const o = Kn("CloseIcon"),
      s = Kn("MarkdownIcon"),
      a = Kn("EmojiIcon"),
      c = Kn("GifIcon"),
      u = Kn("ImageIcon"),
      p = Kn("PreviewIcon"),
      d = Kn("LoadingIcon"),
      h = Kn("ImageWall");
    return Lr(), jr("div", xs, ["disable" !== e.config.login && e.isLogin && !((_e$edit3 = e.edit) !== null && _e$edit3 !== void 0 && _e$edit3.objectId) ? (Lr(), jr("div", _s, [Dr("div", Cs, [Dr("button", {
      class: "wl-logout-btn",
      title: e.locale.logout,
      onClick: t[0] || (t[0] = function () {
        return e.onLogout && e.onLogout(...arguments);
      })
    }, [Vr(o, {
      size: 14
    })], 8, Ss), Dr("a", {
      href: "#",
      class: "wl-login-nick",
      "aria-label": "Profile",
      title: e.locale.profile,
      onClick: t[1] || (t[1] = function () {
        return e.onProfile && e.onProfile(...arguments);
      })
    }, [Dr("img", {
      src: e.userInfo.avatar,
      alt: "avatar"
    }, null, 8, Is)], 8, $s)]), Dr("a", {
      href: "#",
      class: "wl-login-nick",
      "aria-label": "Profile",
      title: e.locale.profile,
      onClick: t[2] || (t[2] = function () {
        return e.onProfile && e.onProfile(...arguments);
      }),
      textContent: H(e.userInfo.display_name)
    }, null, 8, Es)])) : Wr("v-if", !0), Dr("div", Rs, ["force" !== e.config.login && e.config.meta.length && !e.isLogin ? (Lr(), jr("div", {
      key: 0,
      class: N(["wl-header", `item${e.config.meta.length}`])
    }, [(Lr(!0), jr(Cr, null, Yn(e.config.meta, t => (Lr(), jr("div", {
      key: t,
      class: "wl-header-item"
    }, [Dr("label", {
      for: `wl-${t}`,
      textContent: H(e.locale[t] + (e.config.requiredMeta.includes(t) || !e.config.requiredMeta.length ? "" : `(${e.locale.optional})`))
    }, null, 8, Ls), Zn(Dr("input", {
      id: `wl-${t}`,
      ref_for: !0,
      ref: n => {
        n && (e.inputRefs[t] = n);
      },
      "onUpdate:modelValue": n => e.userMeta[t] = n,
      class: N(["wl-input", `wl-${t}`]),
      name: t,
      type: "mail" === t ? "email" : "text"
    }, null, 10, As), [[Pi, e.userMeta[t]]])]))), 128))], 2)) : Wr("v-if", !0), Zn(Dr("textarea", {
      id: "wl-edit",
      ref: "editorRef",
      "onUpdate:modelValue": t[3] || (t[3] = t => e.editor = t),
      class: "wl-editor",
      placeholder: e.replyUser ? `@${e.replyUser}` : e.locale.placeholder,
      onKeydown: t[4] || (t[4] = function () {
        return e.onKeyDown && e.onKeyDown(...arguments);
      }),
      onDrop: t[5] || (t[5] = function () {
        return e.onDrop && e.onDrop(...arguments);
      }),
      onPaste: t[6] || (t[6] = function () {
        return e.onPaste && e.onPaste(...arguments);
      })
    }, null, 40, zs), [[Ei, e.editor]]), Zn(Dr("div", Os, [js, Dr("h4", null, H(e.locale.preview) + ":", 1), Wr(" eslint-disable-next-line vue/no-v-html "), Dr("div", {
      class: "wl-content",
      innerHTML: e.previewText
    }, null, 8, Ts)], 512), [[Mi, e.showPreview]]), Dr("div", Ps, [Dr("div", Us, [Dr("a", Ms, [Vr(s)]), Zn(Dr("button", {
      ref: "emojiButtonRef",
      class: N(["wl-action", {
        active: e.showEmoji
      }]),
      title: e.locale.emoji,
      onClick: t[7] || (t[7] = t => e.showEmoji = !e.showEmoji)
    }, [Vr(a)], 10, Ns), [[Mi, e.emoji.tabs.length]]), e.config.search ? (Lr(), jr("button", {
      key: 0,
      ref: "gifButtonRef",
      class: N(["wl-action", {
        active: e.showGif
      }]),
      title: e.locale.gif,
      onClick: t[8] || (t[8] = t => e.showGif = !e.showGif)
    }, [Vr(c)], 10, Fs)) : Wr("v-if", !0), Dr("input", {
      id: "wl-image-upload",
      ref: "imageUploadRef",
      class: "upload",
      type: "file",
      accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif",
      onChange: t[9] || (t[9] = function () {
        return e.onChange && e.onChange(...arguments);
      })
    }, null, 544), e.canUploadImage ? (Lr(), jr("label", {
      key: 1,
      for: "wl-image-upload",
      class: "wl-action",
      title: e.locale.uploadImage
    }, [Vr(u)], 8, Ds)) : Wr("v-if", !0), Dr("button", {
      class: N(["wl-action", {
        active: e.showPreview
      }]),
      title: e.locale.preview,
      onClick: t[10] || (t[10] = t => e.showPreview = !e.showPreview)
    }, [Vr(p)], 10, Vs)]), Dr("div", Bs, [Dr("div", Hs, [Hr(H(e.wordNumber) + " ", 1), e.config.wordLimit ? (Lr(), jr("span", Ws, [Hr("  /  "), Dr("span", {
      class: N({
        illegal: !e.isWordNumberLegal
      }),
      textContent: H(e.wordLimit)
    }, null, 10, qs)])) : Wr("v-if", !0), Hr("  " + H(e.locale.word), 1)]), "disable" === e.config.login || e.isLogin ? Wr("v-if", !0) : (Lr(), jr("button", {
      key: 0,
      class: "wl-btn",
      onClick: t[11] || (t[11] = function () {
        return e.onLogin && e.onLogin(...arguments);
      }),
      textContent: H(e.locale.login)
    }, null, 8, Zs)), "force" !== e.config.login || e.isLogin ? (Lr(), jr("button", {
      key: 1,
      class: "wl-btn primary",
      title: "Cmd|Ctrl + Enter",
      disabled: e.isSubmitting,
      onClick: t[12] || (t[12] = function () {
        return e.submitComment && e.submitComment(...arguments);
      })
    }, [e.isSubmitting ? (Lr(), Tr(d, {
      key: 0,
      size: 16
    })) : (Lr(), jr(Cr, {
      key: 1
    }, [Hr(H(e.locale.submit), 1)], 64))], 8, Gs)) : Wr("v-if", !0)]), Dr("div", {
      ref: "gifPopupRef",
      class: N(["wl-gif-popup", {
        display: e.showGif
      }])
    }, [Dr("input", {
      ref: "gifSearchInputRef",
      type: "text",
      placeholder: e.locale.gifSearchPlaceholder,
      onInput: t[13] || (t[13] = function () {
        return e.onGifSearch && e.onGifSearch(...arguments);
      })
    }, null, 40, Ks), Vr(h, {
      items: e.gifData.list,
      "column-width": 200,
      gap: 6,
      onInsert: t[14] || (t[14] = t => e.insert(t)),
      onScroll: e.onImageWallScroll
    }, null, 8, ["items", "onScroll"]), e.gifData.loading ? (Lr(), jr("div", Qs, [Vr(d, {
      size: 30
    })])) : Wr("v-if", !0)], 2), Dr("div", {
      ref: "emojiPopupRef",
      class: N(["wl-emoji-popup", {
        display: e.showEmoji
      }])
    }, [(Lr(!0), jr(Cr, null, Yn(e.emoji.tabs, (t, n) => (Lr(), jr(Cr, {
      key: t.name
    }, [n === e.emojiTabIndex ? (Lr(), jr("div", Js, [(Lr(!0), jr(Cr, null, Yn(t.items, t => (Lr(), jr("button", {
      key: t,
      title: t,
      onClick: n => e.insert(`:${t}:`)
    }, [e.showEmoji ? (Lr(), jr("img", {
      key: 0,
      class: "wl-emoji",
      src: e.emoji.map[t],
      alt: t,
      loading: "lazy",
      referrerPolicy: "no-referrer"
    }, null, 8, Xs)) : Wr("v-if", !0)], 8, Ys))), 128))])) : Wr("v-if", !0)], 64))), 128)), e.emoji.tabs.length > 1 ? (Lr(), jr("div", ea, [(Lr(!0), jr(Cr, null, Yn(e.emoji.tabs, (t, n) => (Lr(), jr("button", {
      key: t.name,
      class: N(["wl-tab", {
        active: e.emojiTabIndex === n
      }]),
      onClick: t => e.emojiTabIndex = n
    }, [Dr("img", {
      class: "wl-emoji",
      src: t.icon,
      alt: t.name,
      title: t.name,
      loading: "lazy",
      referrerPolicy: "no-referrer"
    }, null, 8, na)], 10, ta))), 128))])) : Wr("v-if", !0)], 2)])]), e.replyId || (_e$edit4 = e.edit) !== null && _e$edit4 !== void 0 && _e$edit4.objectId ? (Lr(), jr("button", {
      key: 1,
      class: "wl-close",
      title: e.locale.cancelReply,
      onClick: t[15] || (t[15] = t => e.$emit(e.replyId ? "cancel-reply" : "cancel-edit"))
    }, [Vr(o, {
      size: 24
    })], 8, ra)) : Wr("v-if", !0)]);
  }], ["__file", "CommentBox.vue"]]);
  const la = ["approved", "waiting", "spam"];
  var oa = Dn({
    components: {
      CommentBox: ia,
      DeleteIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, si("path", {
        d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z",
        fill: "red"
      })),
      LikeIcon: _ref45 => {
        let {
          active: e = !1
        } = _ref45;
        return si("svg", {
          viewBox: "0 0 1024 1024",
          width: "24",
          height: "24"
        }, [si("path", {
          d: "M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z" + (e ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"),
          fill: e ? "red" : "currentColor"
        })]);
      },
      ReplyIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, si("path", {
        d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z",
        fill: "currentColor"
      })),
      EditIcon: () => si("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
      }, si("path", {
        d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z",
        fill: "currentColor"
      })),
      VerifiedIcon: () => si("svg", {
        class: "verified-icon",
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
      }, si("path", {
        d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z",
        fill: "#27ae60"
      }))
    },
    props: {
      comment: {
        type: Object,
        required: !0
      },
      rootId: {
        type: String,
        required: !0
      },
      reply: {
        type: Object,
        default: null
      },
      edit: {
        type: Object,
        default: null
      }
    },
    emits: ["submit", "reply", "like", "delete", "status", "sticky", "edit"],
    setup(e) {
      const t = Tn("config"),
        n = Uo(),
        r = Yo(),
        i = oi(() => t.value.locale),
        l = oi(() => {
          const {
            link: t
          } = e.comment;
          return t ? $(t) ? t : `https://${t}` : "";
        }),
        o = oi(() => n.value.includes(e.comment.objectId)),
        s = ((e, t) => {
          const n = Al();
          return oi(() => z(e, n.value, t));
        })(e.comment.insertedAt, i.value),
        a = oi(() => "administrator" === r.value.type),
        c = oi(() => e.comment.user_id && r.value.objectId === e.comment.user_id),
        u = oi(() => {
          var _e$reply;
          return e.comment.objectId === ((_e$reply = e.reply) === null || _e$reply === void 0 ? void 0 : _e$reply.objectId);
        }),
        p = oi(() => {
          var _e$edit5;
          return e.comment.objectId === ((_e$edit5 = e.edit) === null || _e$edit5 === void 0 ? void 0 : _e$edit5.objectId);
        });
      return {
        config: t,
        locale: i,
        isReplyingCurrent: u,
        isEditingCurrent: p,
        link: l,
        like: o,
        time: s,
        isAdmin: a,
        isOwner: c,
        commentStatus: la
      };
    }
  });
  const sa = ["id"],
    aa = {
      class: "wl-user",
      "aria-hidden": "true"
    },
    ca = ["src"],
    ua = {
      class: "wl-card"
    },
    pa = {
      class: "wl-head"
    },
    da = ["href"],
    ha = {
      key: 1,
      class: "wl-nick"
    },
    fa = ["textContent"],
    ga = ["textContent"],
    ma = ["textContent"],
    va = ["textContent"],
    ya = ["textContent"],
    wa = {
      class: "wl-comment-actions"
    },
    ba = ["title"],
    ka = ["textContent"],
    xa = ["title"],
    _a = {
      class: "wl-meta",
      "aria-hidden": "true"
    },
    Ca = ["data-value", "textContent"],
    Sa = ["data-value", "textContent"],
    $a = ["data-value", "textContent"],
    Ia = ["innerHTML"],
    Ea = {
      key: 1,
      class: "wl-admin-actions"
    },
    Ra = {
      class: "wl-comment-status"
    },
    La = ["disabled", "onClick", "textContent"],
    Aa = {
      key: 3,
      class: "wl-quote"
    };
  var za = es(oa, [["render", function (e, t, n, r, i, l) {
    var _e$reply2;
    const o = Kn("VerifiedIcon"),
      s = Kn("EditIcon"),
      a = Kn("DeleteIcon"),
      c = Kn("LikeIcon"),
      u = Kn("ReplyIcon"),
      p = Kn("CommentBox"),
      d = Kn("CommentCard", !0);
    return Lr(), jr("div", {
      id: e.comment.objectId,
      class: "wl-item"
    }, [Dr("div", aa, [e.comment.avatar ? (Lr(), jr("img", {
      key: 0,
      src: e.comment.avatar
    }, null, 8, ca)) : Wr("v-if", !0), e.comment.type ? (Lr(), Tr(o, {
      key: 1
    })) : Wr("v-if", !0)]), Dr("div", ua, [Dr("div", pa, [e.link ? (Lr(), jr("a", {
      key: 0,
      class: "wl-nick",
      href: e.link,
      target: "_blank",
      rel: "nofollow noreferrer"
    }, H(e.comment.nick), 9, da)) : (Lr(), jr("span", ha, H(e.comment.nick), 1)), "administrator" === e.comment.type ? (Lr(), jr("span", {
      key: 2,
      class: "wl-badge",
      textContent: H(e.locale.admin)
    }, null, 8, fa)) : Wr("v-if", !0), e.comment.label ? (Lr(), jr("span", {
      key: 3,
      class: "wl-badge",
      textContent: H(e.comment.label)
    }, null, 8, ga)) : Wr("v-if", !0), e.comment.sticky ? (Lr(), jr("span", {
      key: 4,
      class: "wl-badge",
      textContent: H(e.locale.sticky)
    }, null, 8, ma)) : Wr("v-if", !0), void 0 !== e.comment.level && e.comment.level >= 0 ? (Lr(), jr("span", {
      key: 5,
      class: N(`wl-badge level${e.comment.level}`),
      textContent: H(e.locale[`level${e.comment.level}`] || `Level ${e.comment.level}`)
    }, null, 10, va)) : Wr("v-if", !0), Dr("span", {
      class: "wl-time",
      textContent: H(e.time)
    }, null, 8, ya), Dr("div", wa, [e.isAdmin || e.isOwner ? (Lr(), jr("button", {
      key: 0,
      class: "wl-edit",
      onClick: t[0] || (t[0] = t => e.$emit("edit", e.comment))
    }, [Vr(s)])) : Wr("v-if", !0), e.isAdmin || e.isOwner ? (Lr(), jr("button", {
      key: 1,
      class: "wl-delete",
      onClick: t[1] || (t[1] = t => e.$emit("delete", e.comment))
    }, [Vr(a)])) : Wr("v-if", !0), Dr("button", {
      class: "wl-like",
      title: e.like ? e.locale.cancelLike : e.locale.like,
      onClick: t[2] || (t[2] = t => e.$emit("like", e.comment))
    }, [Vr(c, {
      active: e.like
    }, null, 8, ["active"]), "like" in e.comment ? (Lr(), jr("span", {
      key: 0,
      textContent: H(e.comment.like)
    }, null, 8, ka)) : Wr("v-if", !0)], 8, ba), Dr("button", {
      class: N(["wl-reply", {
        active: e.isReplyingCurrent
      }]),
      title: e.isReplyingCurrent ? e.locale.cancelReply : e.locale.reply,
      onClick: t[3] || (t[3] = t => e.$emit("reply", e.isReplyingCurrent ? null : e.comment))
    }, [Vr(u)], 10, xa)])]), Dr("div", _a, [e.comment.addr ? (Lr(), jr("span", {
      key: 0,
      class: "wl-addr",
      "data-value": e.comment.addr,
      textContent: H(e.comment.addr)
    }, null, 8, Ca)) : Wr("v-if", !0), e.comment.browser ? (Lr(), jr("span", {
      key: 1,
      class: "wl-browser",
      "data-value": e.comment.browser,
      textContent: H(e.comment.browser)
    }, null, 8, Sa)) : Wr("v-if", !0), e.comment.os ? (Lr(), jr("span", {
      key: 2,
      class: "wl-os",
      "data-value": e.comment.os,
      textContent: H(e.comment.os)
    }, null, 8, $a)) : Wr("v-if", !0)]), Wr(" eslint-disable vue/no-v-html "), e.isEditingCurrent ? Wr("v-if", !0) : (Lr(), jr("div", {
      key: 0,
      class: "wl-content",
      innerHTML: e.comment.comment
    }, null, 8, Ia)), Wr(" eslint-enable vue/no-v-html "), e.isAdmin && !e.isEditingCurrent ? (Lr(), jr("div", Ea, [Dr("span", Ra, [(Lr(!0), jr(Cr, null, Yn(e.commentStatus, t => (Lr(), jr("button", {
      key: t,
      class: N(`wl-btn wl-${t}`),
      disabled: e.comment.status === t,
      onClick: n => e.$emit("status", {
        status: t,
        comment: e.comment
      }),
      textContent: H(e.locale[t])
    }, null, 10, La))), 128))]), e.isAdmin && !e.comment.rid ? (Lr(), jr("button", {
      key: 0,
      class: "wl-btn wl-sticky",
      onClick: t[4] || (t[4] = t => e.$emit("sticky", e.comment))
    }, H(e.comment.sticky ? e.locale.unsticky : e.locale.sticky), 1)) : Wr("v-if", !0)])) : Wr("v-if", !0), e.isReplyingCurrent || e.isEditingCurrent ? (Lr(), jr("div", {
      key: 2,
      class: N({
        "wl-reply-wrapper": e.isReplyingCurrent,
        "wl-edit-wrapper": e.isEditingCurrent
      })
    }, [Vr(p, {
      edit: e.edit,
      "reply-id": (_e$reply2 = e.reply) === null || _e$reply2 === void 0 ? void 0 : _e$reply2.objectId,
      "reply-user": e.comment.nick,
      "root-id": e.rootId,
      onSubmit: t[5] || (t[5] = t => e.$emit("submit", t)),
      onCancelReply: t[6] || (t[6] = t => e.$emit("reply", null)),
      onCancelEdit: t[7] || (t[7] = t => e.$emit("edit", null))
    }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : Wr("v-if", !0), e.comment.children ? (Lr(), jr("div", Aa, [(Lr(!0), jr(Cr, null, Yn(e.comment.children, n => (Lr(), Tr(d, {
      key: n.objectId,
      comment: n,
      reply: e.reply,
      edit: e.edit,
      "root-id": e.rootId,
      onReply: t[8] || (t[8] = t => e.$emit("reply", t)),
      onSubmit: t[9] || (t[9] = t => e.$emit("submit", t)),
      onLike: t[10] || (t[10] = t => e.$emit("like", t)),
      onEdit: t[11] || (t[11] = t => e.$emit("edit", t)),
      onDelete: t[12] || (t[12] = t => e.$emit("delete", t)),
      onStatus: t[13] || (t[13] = t => e.$emit("status", t)),
      onSticky: t[14] || (t[14] = t => e.$emit("sticky", t))
    }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : Wr("v-if", !0)])], 8, sa);
  }], ["__file", "CommentCard.vue"]]);
  const Oa = {
      latest: "insertedAt_desc",
      oldest: "insertedAt_asc",
      hottest: "like_desc"
    },
    ja = Object.keys(Oa);
  var Ta = Dn({
    name: "WalineRoot",
    components: {
      Reaction: us,
      CommentBox: ia,
      CommentCard: za,
      LoadingIcon: vs
    },
    props: ["serverURL", "path", "meta", "requiredMeta", "dark", "commentSorting", "lang", "locale", "pageSize", "wordLimit", "emoji", "login", "highlighter", "texRenderer", "imageUploader", "search", "copyright", "recaptchaV3Key", "reaction"],
    setup(e) {
      const o = e,
        s = oi(() => (_ref46 => {
          let {
            serverURL: e,
            path: o = location.pathname,
            lang: s = "zh-CN",
            locale: a,
            emoji: u = ["//unpkg.com/@waline/emojis@1.1.0/weibo"],
            meta: p = ["nick", "mail", "link"],
            requiredMeta: d = [],
            dark: h = !1,
            pageSize: f = 10,
            wordLimit: g,
            imageUploader: m,
            highlighter: v,
            texRenderer: w,
            copyright: b = !0,
            login: k = "enable",
            search: x,
            reaction: _,
            recaptchaV3Key: S = "",
            commentSorting: $ = "latest",
            ...L
          } = _ref46;
          return {
            serverURL: I(e),
            path: C(o),
            locale: {
              ...(y[s] || y["zh-CN"]),
              ...("object" == typeof a ? a : {})
            },
            wordLimit: E(g),
            meta: t(p),
            requiredMeta: t(d),
            imageUploader: R(m, n),
            highlighter: R(v, c),
            texRenderer: R(w, r),
            lang: s,
            dark: h,
            emoji: u,
            pageSize: f,
            login: k,
            copyright: b,
            search: x ?? i(s),
            recaptchaV3Key: S,
            reaction: Array.isArray(_) ? _ : !0 === _ ? l : [],
            commentSorting: $,
            ...L
          };
        })(o)),
        a = Yo(),
        u = Uo(),
        p = Kt("loading"),
        d = Kt(0),
        h = Kt(1),
        f = Kt(0),
        g = Kt(s.value.commentSorting),
        m = Kt([]),
        v = Kt(null),
        w = Kt(null),
        k = oi(() => {
          return "string" == typeof (e = s.value.dark) ? "auto" === e ? `@media(prefers-color-scheme:dark){body${L}}` : `${e}${L}` : !0 === e ? `:root${L}` : "";
          var e;
        });
      let x;
      !function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const n = Kt(!1),
          {
            document: r = pl,
            immediate: i = !0,
            manual: l = !1,
            id: o = "vueuse_styletag_" + ++zl
          } = t,
          s = Kt(e);
        let a = () => {};
        const c = () => {
            if (!r) return;
            const e = r.getElementById(o) || r.createElement("style");
            e.type = "text/css", e.id = o, t.media && (e.media = t.media), r.head.appendChild(e), n.value || (a = Mn(s, t => {
              e.innerText = t;
            }, {
              immediate: !0
            }), n.value = !0);
          },
          u = () => {
            r && n.value && (a(), r.head.removeChild(r.getElementById(o)), n.value = !1);
          };
        i && !l && Ji(c), l || Ki(u), Pt(n);
      }(k);
      const S = e => {
          var _x, _a$value;
          const {
              serverURL: t,
              path: n,
              pageSize: r
            } = s.value,
            i = new AbortController();
          p.value = "loading", (_x = x) !== null && _x !== void 0 && _x(), (_ref47 => {
            let {
              serverURL: e,
              lang: t,
              path: n,
              page: r,
              pageSize: i,
              sortBy: l,
              signal: o,
              token: s
            } = _ref47;
            const a = {};
            return s && (a.Authorization = `Bearer ${s}`), fetch(`${e}/comment?path=${encodeURIComponent(n)}&pageSize=${i}&page=${r}&lang=${t}&sortBy=${l}`, {
              signal: o,
              headers: a
            }).then(e => e.json()).then(e => b(e, "Get comment data"));
          })({
            serverURL: t,
            lang: s.value.lang,
            path: n,
            pageSize: r,
            sortBy: Oa[g.value],
            page: e,
            signal: i.signal,
            token: (_a$value = a.value) === null || _a$value === void 0 ? void 0 : _a$value.token
          }).then(t => {
            p.value = "success", d.value = t.count, m.value.push(...t.data), h.value = e, f.value = t.totalPages;
          }).catch(e => {
            "AbortError" !== e.name && (console.error(e.message), p.value = "error");
          }), x = i.abort.bind(i);
        },
        $ = () => {
          d.value = 0, m.value = [], S(1);
        };
      return function (e, t) {
        if (Yr) {
          let n = Yr.provides;
          const r = Yr.parent && Yr.parent.provides;
          r === n && (n = Yr.provides = Object.create(r)), n[e] = t;
        }
      }("config", s), Hn(() => {
        Mn(() => [o.serverURL, o.path], () => $(), {
          immediate: !0
        });
      }), qn(() => {
        var _x2;
        return (_x2 = x) === null || _x2 === void 0 ? void 0 : _x2();
      }), {
        config: s,
        darkmodeStyle: k,
        i18n: oi(() => s.value.locale),
        status: p,
        count: d,
        page: h,
        totalPages: f,
        commentSorting: g,
        sortingMethods: ja,
        data: m,
        reply: v,
        edit: w,
        loadMore: () => S(h.value + 1),
        refresh: $,
        onSortByChange: e => {
          g.value !== e && (g.value = e, $());
        },
        onReply: e => {
          v.value = e;
        },
        onSubmit: e => {
          if (w.value) w.value.comment = e.comment, w.value.orig = e.orig;else if (e.rid) {
            const t = m.value.find(_ref48 => {
              let {
                objectId: t
              } = _ref48;
              return t === e.rid;
            });
            if (!t) return;
            Array.isArray(t.children) || (t.children = []), t.children.push(e);
          } else m.value.unshift(e);
        },
        onStatusChange: async _ref49 => {
          var _a$value2;
          let {
            comment: e,
            status: t
          } = _ref49;
          if (e.status === t) return;
          const {
            serverURL: n,
            lang: r
          } = s.value;
          await _({
            serverURL: n,
            lang: r,
            token: (_a$value2 = a.value) === null || _a$value2 === void 0 ? void 0 : _a$value2.token,
            objectId: e.objectId,
            status: t
          }), e.status = t;
        },
        onDelete: async _ref50 => {
          var _a$value3;
          let {
            objectId: e
          } = _ref50;
          if (!confirm("Are you sure you want to delete this comment?")) return;
          const {
            serverURL: t,
            lang: n
          } = s.value;
          await (_ref51 => {
            let {
              serverURL: e,
              lang: t,
              token: n,
              objectId: r
            } = _ref51;
            return fetch(`${e}/comment/${r}?lang=${t}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${n}`
              }
            }).then(e => e.json()).then(e => b(e, "Delete comment"));
          })({
            serverURL: t,
            lang: n,
            token: (_a$value3 = a.value) === null || _a$value3 === void 0 ? void 0 : _a$value3.token,
            objectId: e
          }), m.value.some((t, n) => t.objectId === e ? (m.value = m.value.filter((e, t) => t !== n), !0) : t.children.some((r, i) => r.objectId === e && (m.value[n].children = t.children.filter((e, t) => t !== i), !0)));
        },
        onSticky: async e => {
          var _a$value4;
          if (e.rid) return;
          const {
            serverURL: t,
            lang: n
          } = s.value;
          await _({
            serverURL: t,
            lang: n,
            token: (_a$value4 = a.value) === null || _a$value4 === void 0 ? void 0 : _a$value4.token,
            objectId: e.objectId,
            sticky: e.sticky ? 0 : 1
          }), e.sticky = !e.sticky;
        },
        onLike: async e => {
          var _a$value5;
          const {
              serverURL: t,
              lang: n
            } = s.value,
            {
              objectId: r
            } = e,
            i = u.value.includes(r);
          await _({
            serverURL: t,
            lang: n,
            objectId: r,
            token: (_a$value5 = a.value) === null || _a$value5 === void 0 ? void 0 : _a$value5.token,
            like: !i
          }), i ? u.value = u.value.filter(e => e !== r) : (u.value = [...u.value, r], u.value.length > 50 && (u.value = u.value.slice(-50))), e.like = (e.like || 0) + (i ? -1 : 1);
        },
        onEdit: e => {
          w.value = e;
        },
        version: "2.14.1"
      };
    }
  });
  const Pa = {
      "data-waline": ""
    },
    Ua = {
      class: "wl-meta-head"
    },
    Ma = {
      class: "wl-count"
    },
    Na = ["textContent"],
    Fa = {
      class: "wl-sort"
    },
    Da = ["onClick"],
    Va = {
      class: "wl-cards"
    },
    Ba = {
      key: 1,
      class: "wl-operation"
    },
    Ha = ["textContent"],
    Wa = {
      key: 0,
      class: "wl-loading"
    },
    qa = ["textContent"],
    Za = {
      class: "wl-operation"
    },
    Ga = ["textContent"],
    Ka = {
      key: 3,
      class: "wl-power"
    },
    Qa = Dr("a", {
      href: "https://github.com/walinejs/waline",
      target: "_blank",
      rel: "noreferrer"
    }, " Waline ", -1);
  var Ja = es(Ta, [["render", function (e, t, n, r, i, l) {
    const o = Kn("Reaction"),
      s = Kn("CommentBox"),
      a = Kn("CommentCard"),
      c = Kn("LoadingIcon");
    return Lr(), jr("div", Pa, [Vr(o), e.reply ? Wr("v-if", !0) : (Lr(), Tr(s, {
      key: 0,
      onSubmit: e.onSubmit
    }, null, 8, ["onSubmit"])), Dr("div", Ua, [Dr("div", Ma, [e.count ? (Lr(), jr("span", {
      key: 0,
      class: "wl-num",
      textContent: H(e.count)
    }, null, 8, Na)) : Wr("v-if", !0), Hr(" " + H(e.i18n.comment), 1)]), Dr("ul", Fa, [(Lr(!0), jr(Cr, null, Yn(e.sortingMethods, t => (Lr(), jr("li", {
      key: t,
      class: N([t === e.commentSorting ? "active" : ""]),
      onClick: n => e.onSortByChange(t)
    }, H(e.i18n[t]), 11, Da))), 128))])]), Dr("div", Va, [(Lr(!0), jr(Cr, null, Yn(e.data, t => (Lr(), Tr(a, {
      key: t.objectId,
      "root-id": t.objectId,
      comment: t,
      reply: e.reply,
      edit: e.edit,
      onReply: e.onReply,
      onEdit: e.onEdit,
      onSubmit: e.onSubmit,
      onStatus: e.onStatusChange,
      onDelete: e.onDelete,
      onSticky: e.onSticky,
      onLike: e.onLike
    }, null, 8, ["root-id", "comment", "reply", "edit", "onReply", "onEdit", "onSubmit", "onStatus", "onDelete", "onSticky", "onLike"]))), 128))]), "error" === e.status ? (Lr(), jr("div", Ba, [Dr("button", {
      type: "button",
      class: "wl-btn",
      onClick: t[0] || (t[0] = function () {
        return e.refresh && e.refresh(...arguments);
      }),
      textContent: H(e.i18n.refresh)
    }, null, 8, Ha)])) : (Lr(), jr(Cr, {
      key: 2
    }, ["loading" === e.status ? (Lr(), jr("div", Wa, [Vr(c, {
      size: 30
    })])) : e.data.length ? e.page < e.totalPages ? (Lr(), jr(Cr, {
      key: 2
    }, [Wr(" Load more button "), Dr("div", Za, [Dr("button", {
      type: "button",
      class: "wl-btn",
      onClick: t[1] || (t[1] = function () {
        return e.loadMore && e.loadMore(...arguments);
      }),
      textContent: H(e.i18n.more)
    }, null, 8, Ga)])], 2112)) : Wr("v-if", !0) : (Lr(), jr("div", {
      key: 1,
      class: "wl-empty",
      textContent: H(e.i18n.sofa)
    }, null, 8, qa))], 64)), Wr(" Copyright Information "), e.config.copyright ? (Lr(), jr("div", Ka, [Hr(" Powered by "), Qa, Hr(" v" + H(e.version), 1)])) : Wr("v-if", !0)]);
  }], ["__file", "Waline.vue"]]);
  const Ya = (e, t) => {
      t.forEach((t, n) => {
        t.innerText = e[n].toString();
      });
    },
    Xa = _ref52 => {
      let {
        serverURL: e,
        path: t = window.location.pathname,
        selector: n = ".waline-pageview-count",
        update: r = !0,
        lang: i = "zh-CN"
      } = _ref52;
      const l = new AbortController(),
        o = Array.from(document.querySelectorAll(n)),
        s = e => {
          const n = jo(e);
          return null !== n && t !== n;
        },
        a = n => (_ref53 => {
          let {
            serverURL: e,
            lang: t,
            paths: n,
            signal: r
          } = _ref53;
          return k({
            serverURL: e,
            lang: t,
            paths: n,
            type: ["time"],
            signal: r
          }).then(e => Array.isArray(e) ? e : [e]);
        })({
          serverURL: I(e),
          paths: n.map(e => jo(e) || t),
          lang: i,
          signal: l.signal
        }).then(e => Ya(e, n)).catch(Fl);
      if (r) {
        const n = o.filter(e => !s(e)),
          r = o.filter(s);
        (c = {
          serverURL: I(e),
          path: t,
          lang: i
        }, x({
          ...c,
          type: "time",
          action: "inc"
        })).then(e => Ya(new Array(n.length).fill(e), n)), r.length && a(r);
      } else a(o);
      var c;
      return l.abort.bind(l);
    },
    ec = _ref54 => {
      let {
        el: e = "#waline",
        path: t = window.location.pathname,
        comment: n = !1,
        pageview: r = !1,
        ...i
      } = _ref54;
      const l = e ? Dl(e) : null;
      if (e && !l) throw new Error("Option 'el' do not match any domElement!");
      if (!i.serverURL) throw new Error("Option 'serverURL' is missing!");
      const o = Tt({
          ...i
        }),
        s = Tt({
          comment: n,
          pageview: r,
          path: t
        }),
        a = l ? Vi(() => si(Ja, {
          path: s.path,
          ...o
        })) : null;
      a && a.mount(l);
      const c = Pn(() => {
          s.comment && To({
            serverURL: o.serverURL,
            path: s.path,
            selector: "string" == typeof s.comment ? s.comment : void 0
          });
        }),
        u = Pn(() => {
          s.pageview && Xa({
            serverURL: o.serverURL,
            path: s.path,
            selector: "string" == typeof s.pageview ? s.pageview : void 0
          });
        });
      return {
        el: l,
        update: function () {
          let {
            comment: e,
            pageview: t,
            path: n = window.location.pathname,
            ...r
          } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          Object.entries(r).forEach(_ref55 => {
            let [e, t] = _ref55;
            o[e] = t;
          }), s.path = n, void 0 !== e && (s.comment = e), void 0 !== t && (s.pageview = t);
        },
        destroy: () => {
          a !== null && a !== void 0 && a.unmount(), c(), u();
        }
      };
    },
    tc = "2.14.1",
    nc = _ref56 => {
      var _i$value;
      let {
        el: e,
        serverURL: t,
        count: n,
        lang: r = "zh-CN"
      } = _ref56;
      const i = Yo(),
        l = Dl(e),
        o = new AbortController();
      return (_ref57 => {
        let {
          serverURL: e,
          lang: t,
          count: n,
          signal: r,
          token: i
        } = _ref57;
        const l = {};
        return i && (l.Authorization = `Bearer ${i}`), fetch(`${e}/comment?type=recent&count=${n}&lang=${t}`, {
          signal: r,
          headers: l
        }).then(e => e.json());
      })({
        serverURL: t,
        count: n,
        lang: r,
        signal: o.signal,
        token: (_i$value = i.value) === null || _i$value === void 0 ? void 0 : _i$value.token
      }).then(e => l && e.length ? (l.innerHTML = `<ul class="wl-recent-list">${e.map(e => `<li class="wl-recent-item"><a href="${e.url}">${e.nick}</a>：${e.comment}</li>`).join("")}</ul>`, {
        comments: e,
        destroy: () => {
          o.abort(), l.innerHTML = "";
        }
      }) : {
        comments: e,
        destroy: () => o.abort()
      });
    },
    rc = _ref58 => {
      let {
        el: e,
        serverURL: t,
        count: n,
        locale: r,
        lang: i = "zh-CN",
        mode: l = "list"
      } = _ref58;
      const o = Dl(e),
        s = new AbortController();
      return (_ref59 => {
        let {
          serverURL: e,
          signal: t,
          pageSize: n,
          lang: r
        } = _ref59;
        return fetch(`${e}/user?pageSize=${n}&lang=${r}`, {
          signal: t
        }).then(e => e.json()).then(e => b(e, "user list")).then(e => e.data);
      })({
        serverURL: t,
        pageSize: n,
        lang: i,
        signal: s.signal
      }).then(e => o && e.length ? (r = {
        ...(y[i] || y["zh-CN"]),
        ...("object" == typeof r ? r : {})
      }, o.innerHTML = `<ul class="wl-user-${l}">${e.map((e, t) => [`<li class="wl-user-item" aria-label="${e.nick}">`, e.link && `<a href="${e.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${e.avatar}" alt="${e.nick}">`, `<span class="wl-user-badge">${t + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', e.nick, e.level && `<span class="wl-badge">${r ? r[`level${e.level}`] : `Level ${e.level}`}</span>`, e.label && `<span class="wl-badge">${e.label}</span>`, "</div>", e.link && e.link, "</div>", e.link && "</a>", "</li>"].filter(e => e).join("")).join("")}</ul>`, {
        users: e,
        destroy: () => {
          s.abort(), o.innerHTML = "";
        }
      }) : {
        users: e,
        destroy: () => s.abort()
      });
    };
  _exports.UserList = rc;
  _exports.RecentComments = nc;
  _exports.version = tc;
  _exports.init = ec;
  _exports.pageviewCount = Xa;
});
//# sourceMappingURL=waline.js.map
