var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils/logger.ts
function logInfo(...args) {
  console.log("[ffxiv-overlay-api]", ...args);
}
function logError(...args) {
  console.error("[ffxiv-overlay-api]", ...args);
}

// src/utils/options.ts
var defaultOptions = {
  extendData: true,
  silentMode: false,
  seperateLB: false
};
var options_default = defaultOptions;

// src/utils/getter.ts
function getPctNum(str) {
  const exp = /([0-9]+)%/gi.exec(str);
  if (exp && exp[1]) {
    return Number.parseInt(exp[1]) || 0;
  }
  return 0;
}

// src/modules/extendData.ts
var toInt = Number.parseInt || window.parseInt || Math.floor;
function parseJob(jobName) {
  jobName = jobName.toLowerCase();
  const dps = [
    "acn",
    "arc",
    "lnc",
    "pgl",
    "rog",
    "thm",
    "drg",
    "mnk",
    "nin",
    "sam",
    "rpr",
    "smn",
    "blm",
    "rdm",
    "brd",
    "mch",
    "dnc",
    "blu"
  ];
  const healer = [
    "cnj",
    "whm",
    "sch",
    "ast",
    "sge"
  ];
  const tank = [
    "gla",
    "mrd",
    "pld",
    "war",
    "drk",
    "gnb"
  ];
  const hand = ["crp", "bsm", "arm", "gsm", "lwr", "wvr", "alc", "cul"];
  const land = ["bot", "fsh", "min"];
  if (dps.includes(jobName)) {
    return "dps";
  } else if (healer.includes(jobName)) {
    return "healer";
  } else if (tank.includes(jobName)) {
    return "tank";
  } else if (hand.includes(jobName)) {
    return "hand";
  } else if (land.includes(jobName)) {
    return "land";
  } else {
    return "unknown";
  }
}
function parsePlayer(data) {
  let [maxHit, maxHitDamage] = ["", 0];
  const maxHitData = data.maxhit.split("-");
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
    maxHitDamage = toInt(maxHitData[1]);
  }
  let [maxHeal, maxHealDamage] = ["", 0];
  const maxHealData = data.maxheal.split("-");
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
    maxHealDamage = toInt(maxHealData[1]);
  }
  return {
    name: data.name,
    job: data.Job.toLowerCase(),
    jobType: parseJob(data.Job),
    dps: toInt(data.encdps),
    last10DPS: toInt(data.Last10DPS),
    last30DPS: toInt(data.Last30DPS),
    last60DPS: toInt(data.Last60DPS),
    hps: toInt(data.enchps),
    swings: toInt(data.swings),
    hits: toInt(data.hits),
    deaths: toInt(data.deaths),
    directHits: toInt(data.DirectHitCount),
    directHitPct: data.DirectHitPct || "",
    critHits: toInt(data.crithits),
    critHitPct: data["crithit%"] || "",
    directCritHits: toInt(data.CritDirectHitCount),
    directCritHitPct: data.CritDirectHitPct || "",
    damage: toInt(data.damage),
    damageTaken: toInt(data.damagetaken),
    damagePct: data["damage%"] || "",
    healed: toInt(data.healed),
    healsTaken: toInt(data.healstaken),
    healsPct: data["healed%"] || "",
    overHeal: toInt(data.overHeal),
    overHealPct: data.OverHealPct || "",
    shield: toInt(data.damageShield),
    shieldPct: `${Math.round((toInt(data.damageShield) / toInt(data.healed) || 0) * getPctNum(data["healed%"] || "")) || 0}%`,
    maxHit,
    maxHitDamage,
    maxHeal,
    maxHealDamage
  };
}
function parseEncounter(data) {
  return {
    duration: data.duration || "",
    durationSeconds: toInt(data.DURATION),
    zoneName: data.CurrentZoneName || "",
    dps: toInt(data.encdps),
    last10DPS: toInt(data.Last10DPS),
    last30DPS: toInt(data.Last30DPS),
    last60DPS: toInt(data.Last60DPS),
    hps: toInt(data.enchps),
    damage: toInt(data.damage),
    healed: toInt(data.healed),
    shield: toInt(data.damageShield)
  };
}
function parseLimitBreak(data) {
  let maxHit = "";
  const maxHitData = data.maxhit.split("-");
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
  }
  let maxHeal = "";
  const maxHealData = data.maxheal.split("-");
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
  }
  return {
    name: "Limit Break",
    dps: toInt(data.encdps),
    hps: toInt(data.enchps),
    damage: toInt(data.damage),
    healed: toInt(data.healed),
    shield: toInt(data.damageShield),
    maxHit,
    maxHeal
  };
}
function extendData(data, seperateLB) {
  if (data.type === "CombatData") {
    const parsedData = {
      isActive: data.isActive === "true" || data.isActive === true,
      encounter: parseEncounter(data.Encounter),
      combatant: []
    };
    const combatantKeys = Object.keys(data.Combatant);
    const combatantValidKeys = combatantKeys.filter((key) => Object.prototype.hasOwnProperty.call(data.Combatant, key));
    combatantValidKeys.forEach((key) => {
      if (key === "Limit Break") {
        const cbt = parseLimitBreak(data.Combatant[key]);
        if (!Number.isNaN(cbt.dps) && !Number.isNaN(cbt.hps)) {
          seperateLB ? parsedData.limitBreak = cbt : parsedData.combatant.push(cbt);
        }
      } else {
        const cbt = parsePlayer(data.Combatant[key]);
        if (!Number.isNaN(cbt.dps) && !Number.isNaN(cbt.hps)) {
          parsedData.combatant.push(cbt);
        }
      }
    });
    data.extendData = parsedData;
  }
  return data;
}
var extendData_default = extendData;

// src/utils/adder.ts
function addNumber(...args) {
  if (!args.length) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i] || 0;
  }
  return sum;
}
function addPct(...args) {
  if (!args.length) {
    return "0%";
  }
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    const num = getPctNum(args[i]);
    sum += num;
  }
  return `${sum}%`;
}
function addHitPct(...args) {
  if (!args.length) {
    return { hits: 0, hitPct: "0%" };
  }
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < args.length; i++) {
    numerator += args[i].hits || 0;
    denominator += args[i].totalHits || 0;
  }
  if (denominator === 0 || numerator === 0) {
    return { hits: 0, hitPct: "0%" };
  }
  return {
    hits: numerator,
    hitPct: `${Math.round(numerator / denominator * 100)}%`
  };
}
function addOverHealPct(...args) {
  if (!args.length) {
    return "0%";
  }
  let tsum = 0;
  let tnum = 0;
  for (let i = 0; i < args.length; i++) {
    const num = getPctNum(args[i]);
    if (num > 0) {
      tsum += num;
      tnum++;
    }
  }
  if (tnum === 0) {
    return "0%";
  }
  return `${Math.round(tsum / tnum)}%`;
}
function addMax(...args) {
  if (!args.length) {
    return { hit: "", hitDamage: 0 };
  }
  let max = { hit: "", hitDamage: 0 };
  for (let i = 0; i < args.length; i++) {
    if (args[i].hitDamage > max.hitDamage) {
      max = args[i];
    }
  }
  return max;
}

// src/modules/mergeCombatant.ts
function mergeCombatant(...args) {
  if (!args.length) {
    return null;
  }
  const dps = [];
  const last10DPS = [];
  const last30DPS = [];
  const last60DPS = [];
  const hps = [];
  const swings = [];
  const hits = [];
  const deaths = [];
  const direct = [];
  const crit = [];
  const directCrit = [];
  const damage = [];
  const damageTaken = [];
  const damagePct = [];
  const healed = [];
  const healsTaken = [];
  const healsPct = [];
  const overHeal = [];
  const overHealPct = [];
  const maxHit = [];
  const maxHeal = [];
  args.forEach((item) => {
    dps.push(item.dps);
    last10DPS.push(item.last10DPS);
    last30DPS.push(item.last30DPS);
    last60DPS.push(item.last60DPS);
    hps.push(item.hps);
    swings.push(item.swings);
    hits.push(item.hits);
    deaths.push(item.deaths);
    direct.push({ hits: item.directHits, totalHits: item.hits });
    crit.push({ hits: item.critHits, totalHits: item.hits });
    directCrit.push({ hits: item.directCritHits, totalHits: item.hits });
    damage.push(item.damage);
    damageTaken.push(item.damageTaken);
    damagePct.push(item.damagePct);
    healed.push(item.healed);
    healsTaken.push(item.healsTaken);
    healsPct.push(item.healsPct);
    overHeal.push(item.overHeal);
    overHealPct.push(item.overHealPct);
    maxHit.push({ hit: item.maxHit, hitDamage: item.maxHitDamage });
    maxHeal.push({ hit: item.maxHeal, hitDamage: item.maxHealDamage });
  });
  const ret = {
    name: args[0].name,
    job: args[0].job,
    jobType: args[0].jobType,
    dps: addNumber(...dps),
    last10DPS: addNumber(...last10DPS),
    last30DPS: addNumber(...last30DPS),
    last60DPS: addNumber(...last60DPS),
    hps: addNumber(...hps),
    swings: addNumber(...swings),
    hits: addNumber(...hits),
    deaths: addNumber(...deaths),
    damage: addNumber(...damage),
    damageTaken: addNumber(...damageTaken),
    damagePct: addPct(...damagePct),
    healed: addNumber(...healed),
    healsTaken: addNumber(...healsTaken),
    healsPct: addPct(...healsPct),
    overHeal: addNumber(...overHeal),
    overHealPct: addOverHealPct(...overHealPct)
  };
  let hitTemp = addHitPct(...direct);
  ret.directHits = hitTemp.hits;
  ret.directHitPct = hitTemp.hitPct;
  hitTemp = addHitPct(...crit);
  ret.critHits = hitTemp.hits;
  ret.critHitPct = hitTemp.hitPct;
  hitTemp = addHitPct(...directCrit);
  ret.directCritHits = hitTemp.hits;
  ret.directCritHitPct = hitTemp.hitPct;
  let maxHitTemp = addMax(...maxHit);
  ret.maxHit = maxHitTemp.hit;
  ret.maxHitDamage = maxHitTemp.hitDamage;
  maxHitTemp = addMax(...maxHeal);
  ret.maxHeal = maxHitTemp.hit;
  ret.maxHealDamage = maxHitTemp.hitDamage;
  return ret;
}
var mergeCombatant_default = mergeCombatant;

// src/overlay.ts
var _OverlayAPI = class {
  _options = {};
  _subscribers = {};
  _status = false;
  _queue = [];
  _wsURL = Array.from(/[?&]OVERLAY_WS=([^&]+)/.exec(window.location.href) || /[?&]HOST_PORT=([^&]+)/.exec(window.location.href) || [])[1] || "";
  _ws = null;
  _resCounter = 0;
  _resPromises = {};
  constructor(options = {}) {
    if (_OverlayAPI._instance) {
      return _OverlayAPI._instance;
    }
    this._options = Object.assign(this._options, options_default, options);
    if (this._wsURL) {
      !this._options.silentMode && logInfo("initializing api in websocket mode...");
      this._initWebSocketMode();
    } else {
      !this._options.silentMode && logInfo("initializing api in callback mode...");
      this._initCallbackMode();
    }
    window.dispatchOverlayEvent = this._triggerEvents.bind(this);
    if (!_OverlayAPI._instance) {
      _OverlayAPI._instance = this;
    }
  }
  _sendMessage(msg, cb) {
    if (this._ws) {
      if (this._status) {
        try {
          this._ws.send(JSON.stringify(msg));
        } catch (e) {
          logError(e, msg);
          return;
        }
      } else {
        this._queue.push({ msg });
      }
    } else {
      if (this._status) {
        try {
          window.OverlayPluginApi.callHandler(JSON.stringify(msg), cb);
        } catch (e) {
          logError(e, msg);
          return;
        }
      } else {
        this._queue.push({ msg, cb });
      }
    }
  }
  _triggerEvents(msg) {
    if (this._subscribers[msg.type]) {
      for (const cb of this._subscribers[msg.type]) {
        if (this._options.extendData) {
          cb(extendData_default(msg, !!this._options.seperateLB));
        } else {
          cb(msg);
        }
      }
    }
  }
  _initWebSocketMode() {
    let url = this._wsURL;
    if (!url.includes("/ws")) {
      url += (url.endsWith("/") ? "" : "/") + "ws";
    }
    this._ws = new WebSocket(url);
    this._ws.addEventListener("error", (e) => {
      logError(e);
    });
    this._ws.addEventListener("open", () => {
      !this._options.silentMode && logInfo("websocket connected");
      this._status = true;
      while (this._queue.length > 0) {
        const { msg } = this._queue.shift();
        this._sendMessage(msg);
      }
      !this._options.silentMode && logInfo("api ready");
    });
    this._ws.addEventListener("message", (msg) => {
      let data;
      try {
        data = JSON.parse(msg.data);
      } catch (e) {
        logError(e, msg);
        return;
      }
      this._triggerEvents(data);
    });
    this._ws.addEventListener("close", () => {
      this._status = false;
      !this._options.silentMode && logInfo("websocket trying to reconnect...");
      setTimeout(() => {
        this._initWebSocketMode();
      }, 5e3);
    });
  }
  _initCallbackMode() {
    if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
      !this._options.silentMode && logInfo("api not ready, trying to reconnect...");
      setTimeout(() => {
        this._initCallbackMode();
      }, 5e3);
      return;
    }
    this._status = true;
    window.__OverlayCallback = this._triggerEvents.bind(this);
    while (this._queue.length > 0) {
      const { msg, cb } = this._queue.shift();
      this._sendMessage(msg, cb);
    }
    !this._options.silentMode && logInfo("api ready");
  }
  addListener(event, cb) {
    if (!this._subscribers[event]) {
      this._subscribers[event] = [];
    }
    if (typeof cb === "function") {
      this._subscribers[event].push(cb);
      !this._options.silentMode && logInfo("listener", cb, "of event", event, "added");
    } else {
      logError("wrong params", cb);
    }
  }
  removeListener(event, cb) {
    if (this._subscribers[event]) {
      if (typeof cb === "function") {
        const cbPos = this._subscribers[event].indexOf(cb);
        if (cbPos > -1) {
          this._subscribers[event].splice(cbPos, 1);
          !this._options.silentMode && logInfo("listener", cb, "of event", event, "removed");
        }
      } else {
        logError("wrong params", cb);
      }
    }
  }
  removeAllListener(event) {
    if (this._subscribers[event] && this._subscribers[event].length > 0) {
      this._subscribers[event] = [];
      !this._options.silentMode && logInfo("all listener of event", event, "removed");
    }
  }
  getAllListener(event) {
    return this._subscribers[event] ? this._subscribers[event] : [];
  }
  startEvent() {
    this._sendMessage({
      call: "subscribe",
      events: Object.keys(this._subscribers)
    });
    !this._options.silentMode && logInfo("events", Object.keys(this._subscribers), "started");
  }
  endEncounter() {
    if (this._status) {
      return window.OverlayPluginApi.endEncounter();
    }
    !this._options.silentMode && logInfo("encounter ended");
  }
  callHandler(msg) {
    let p;
    if (this._ws) {
      this._sendMessage(msg);
    } else {
      p = new Promise((resolve, reject) => {
        this._sendMessage(msg, (data) => {
          let rd;
          try {
            rd = data == null ? null : JSON.parse(data);
          } catch (e) {
            logError(e, data);
            return reject(e);
          }
          return resolve(rd);
        });
      });
    }
    return p;
  }
  simulateData(msg) {
    this._triggerEvents(msg);
  }
};
var OverlayAPI = _OverlayAPI;
__publicField(OverlayAPI, "_instance", null);
__publicField(OverlayAPI, "mergeCombatant", mergeCombatant_default);
var overlay_default = OverlayAPI;

// src/index.ts
window.OverlayAPI = overlay_default;
var src_default = overlay_default;
export {
  overlay_default as OverlayAPI,
  src_default as default
};
/*! ffxiv-overlay-plugin | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
//# sourceMappingURL=index.js.map
