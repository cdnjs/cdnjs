(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OverlayAPI = {}));
})(this, (function (exports) { 'use strict';

    /**
     * console info logger
     */
    function logInfo(...args) {
        console.log('[ffxiv-overlay-api]', ...args);
    }
    /**
     * console error logger
     */
    function logError(...args) {
        console.error('[ffxiv-overlay-api]', ...args);
    }
    /**
     * console warn logger
     */
    function logWarn(...args) {
        console.warn('[ffxiv-overlay-api]', ...args);
    }

    function getInt(input) {
        const toInt = Number.parseInt || window.parseInt;
        return toInt(`${input}`) || 0;
    }
    /**
     * get number from pct string
     */
    function getPctNum(str) {
        const exp = /([0-9]+)%/gi.exec(str);
        if (exp && exp[1]) {
            return getInt(exp[1]) || 0;
        }
        return 0;
    }

    /**
     * parse job type
     */
    function parseJob(jobName) {
        jobName = jobName.toLowerCase();
        const dps = [
            // base
            'acn',
            'arc',
            'lnc',
            'pgl',
            'rog',
            'thm',
            // melee
            'drg',
            'mnk',
            'nin',
            'sam',
            'rpr',
            // magical ranged
            'smn',
            'blm',
            'rdm',
            // physical ranged
            'brd',
            'mch',
            'dnc',
            // special
            'blu',
        ];
        const healer = [
            // base
            'cnj',
            // add
            'whm',
            'sch',
            'ast',
            'sge',
        ];
        const tank = [
            // base
            'gla',
            'mrd',
            // add
            'pld',
            'war',
            'drk',
            'gnb',
        ];
        const hand = ['crp', 'bsm', 'arm', 'gsm', 'lwr', 'wvr', 'alc', 'cul'];
        const land = ['bot', 'fsh', 'min'];
        if (dps.includes(jobName)) {
            return { name: jobName, type: 'dps' };
        }
        else if (healer.includes(jobName)) {
            return { name: jobName, type: 'healer' };
        }
        else if (tank.includes(jobName)) {
            return { name: jobName, type: 'tank' };
        }
        else if (hand.includes(jobName)) {
            return { name: jobName, type: 'hand' };
        }
        else if (land.includes(jobName)) {
            return { name: jobName, type: 'land' };
        }
        else {
            return { name: jobName || 'unknown', type: 'unknown' };
        }
    }
    /**
     * parse single player
     */
    function parsePlayer(data) {
        let [maxHit, maxHitDamage] = ['', 0];
        const maxHitData = (data.maxhit || '').split('-');
        if (maxHitData.length > 1) {
            maxHit = maxHitData[0];
            maxHitDamage = getInt(maxHitData[1]);
        }
        let [maxHeal, maxHealDamage] = ['', 0];
        const maxHealData = (data.maxheal || '').split('-');
        if (maxHealData.length > 1) {
            maxHeal = maxHealData[0];
            maxHealDamage = getInt(maxHealData[1]);
        }
        const jobParsed = parseJob(data.Job || '');
        return {
            name: data.name,
            job: jobParsed.name,
            jobType: jobParsed.type,
            dps: getInt(data.encdps),
            last10DPS: getInt(data.Last10DPS),
            last30DPS: getInt(data.Last30DPS),
            last60DPS: getInt(data.Last60DPS),
            hps: getInt(data.enchps),
            swings: getInt(data.swings),
            hits: getInt(data.hits),
            deaths: getInt(data.deaths),
            directHits: getInt(data.DirectHitCount),
            directHitPct: data.DirectHitPct || '',
            critHits: getInt(data.crithits),
            critHitPct: data['crithit%'] || '',
            directCritHits: getInt(data.CritDirectHitCount),
            directCritHitPct: data.CritDirectHitPct || '',
            damage: getInt(data.damage),
            damageTaken: getInt(data.damagetaken),
            damagePct: data['damage%'] || '',
            healed: getInt(data.healed),
            healsTaken: getInt(data.healstaken),
            healsPct: data['healed%'] || '',
            overHeal: getInt(data.overHeal),
            overHealPct: data.OverHealPct || '',
            shield: getInt(data.damageShield),
            shieldPct: `${Math.round((getInt(data.damageShield) / getInt(data.healed) || 0) *
            getPctNum(data['healed%'] || '')) || 0}%`,
            maxHit,
            maxHitDamage,
            maxHeal,
            maxHealDamage,
        };
    }
    /**
     * parse encounter data
     */
    function parseEncounter(data) {
        return {
            duration: data.duration || '',
            durationSeconds: getInt(data.DURATION),
            zoneName: data.CurrentZoneName || '',
            dps: getInt(data.encdps),
            last10DPS: getInt(data.Last10DPS),
            last30DPS: getInt(data.Last30DPS),
            last60DPS: getInt(data.Last60DPS),
            hps: getInt(data.enchps),
            damage: getInt(data.damage),
            healed: getInt(data.healed),
            shield: getInt(data.damageShield),
        };
    }
    /**
     * parse LB data
     */
    function parseLimitBreak(data) {
        let maxHit = '';
        const maxHitData = (data.maxhit || '').split('-');
        if (maxHitData.length > 1) {
            maxHit = maxHitData[0];
        }
        let maxHeal = '';
        const maxHealData = (data.maxheal || '').split('-');
        if (maxHealData.length > 1) {
            maxHeal = maxHealData[0];
        }
        return {
            name: 'Limit Break',
            dps: getInt(data.encdps),
            hps: getInt(data.enchps),
            damage: getInt(data.damage),
            healed: getInt(data.healed),
            shield: getInt(data.damageShield),
            maxHit,
            maxHeal,
        };
    }
    /**
     * inject extended data
     */
    function injectExtendData(data) {
        if (data.type === 'CombatData') {
            // common data
            const parsedData = {
                active: data.isActive === 'true' || data.isActive === true,
                encounter: parseEncounter(data.Encounter),
                combatant: [],
            };
            // combatant
            const combatantKeys = Object.keys(data.Combatant);
            const combatantValidKeys = combatantKeys.filter((key) => Object.prototype.hasOwnProperty.call(data.Combatant, key));
            combatantValidKeys.forEach((key) => {
                if (key === 'Limit Break') {
                    parsedData.limitBreak = parseLimitBreak(data.Combatant[key]);
                }
                else {
                    parsedData.combatant.push(parsePlayer(data.Combatant[key]));
                }
            });
            data.extendData = parsedData;
        }
        return data;
    }

    function isCEFSharp() {
        return !!window.OverlayPluginApi;
    }

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
    /**
     * damagePct, healsPct, etc.
     */
    function addPct(...args) {
        if (!args.length) {
            return '0%';
        }
        let sum = 0;
        for (let i = 0; i < args.length; i++) {
            const num = getPctNum(args[i]);
            sum += num;
        }
        return `${sum}%`;
    }
    /**
     * directHitPct, critHitPct, etc.
     */
    function addHitPct(...args) {
        if (!args.length) {
            return { hits: 0, hitPct: '0%' };
        }
        let numerator = 0;
        let denominator = 0;
        for (let i = 0; i < args.length; i++) {
            numerator += args[i].hits || 0;
            denominator += args[i].totalHits || 0;
        }
        if (denominator === 0 || numerator === 0) {
            return { hits: 0, hitPct: '0%' };
        }
        return {
            hits: numerator,
            hitPct: `${Math.round((numerator / denominator) * 100)}%`,
        };
    }
    function addOverHealPct(...args) {
        if (!args.length) {
            return '0%';
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
            return '0%';
        }
        return `${Math.round(tsum / tnum)}%`;
    }
    /**
     * maxHit, maxHeal, etc.
     */
    function addMax(...args) {
        if (!args.length) {
            return { hit: '', hitDamage: 0 };
        }
        let max = { hit: '', hitDamage: 0 };
        for (let i = 0; i < args.length; i++) {
            if (args[i].hitDamage > max.hitDamage) {
                max = args[i];
            }
        }
        return max;
    }

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
            overHealPct: addOverHealPct(...overHealPct),
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

    class OverlayAPI {
        /**
         * init API
         */
        constructor() {
            // plugin init status
            this._status = false;
            // event subscribers
            this._eventCenter = {
                CombatData: { started: false, listeners: [] },
                LogLine: { started: false, listeners: [] },
                ImportedLogLines: { started: false, listeners: [] },
                ChangeZone: { started: false, listeners: [] },
                ChangePrimaryPlayer: { started: false, listeners: [] },
                OnlineStatusChanged: { started: false, listeners: [] },
                PartyChanged: { started: false, listeners: [] },
                BroadcastMessage: { started: false, listeners: [] },
            };
            // waiting queue before api init
            this._queue = [];
            // websocket mode related things
            this._wsURL = Array.from(/[?&]OVERLAY_WS=([^&]+)/.exec(window.location.href) ||
                /[?&]HOST_PORT=([^&]+)/.exec(window.location.href) ||
                [])[1] || '';
            this._ws = null;
            this._rseqCounter = 0;
            this._responsePromises = {};
            // singleton
            if (OverlayAPI._instance) {
                logWarn(`class OverlayAPI should only have one instance`);
                return OverlayAPI._instance;
            }
            // check mode
            if (this._wsURL) {
                logInfo('initializing api in websocket mode...');
                this._initWS();
            }
            else {
                logInfo('initializing api in callback mode...');
                this._initCB();
            }
            // `common.js` _L97 binding
            window.dispatchOverlayEvent = this._triggerEvents.bind(this);
            // singleton
            if (!OverlayAPI._instance) {
                OverlayAPI._instance = this;
            }
        }
        /**
         * `common.js` L90
         * event trigger function, need `this` binding
         */
        _triggerEvents(data) {
            // if this event type has subscribers
            if (this._eventCenter[data.type]) {
                // trigger all this event's callback
                for (const cb of this._eventCenter[data.type].listeners) {
                    cb(injectExtendData(data));
                }
            }
        }
        /**
         * `common.js` L12 & L65
         * send message in callback mode & websocket mode
         */
        _sendMessage(msg, cb) {
            if (this._wsURL) {
                if (this._status) {
                    try {
                        this._ws.send(JSON.stringify(msg));
                    }
                    catch (e) {
                        logError(e, msg);
                        return;
                    }
                }
                else {
                    this._queue.push({ msg });
                }
            }
            else {
                if (this._status) {
                    try {
                        window.OverlayPluginApi.callHandler(JSON.stringify(msg), cb);
                    }
                    catch (e) {
                        logError(e, msg);
                        return;
                    }
                }
                else {
                    this._queue.push({ msg, cb });
                }
            }
        }
        /**
         * `common.js` L19
         * init api in websocket mode
         */
        _initWS() {
            // legacy ws url support
            let url = this._wsURL;
            if (!url.includes('/ws')) {
                url += (url.endsWith('/') ? '' : '/') + 'ws';
            }
            // check & init or reinit websocket
            const _doInit = () => {
                this._ws = new WebSocket(url);
                // log error & retry after 1s
                this._ws.addEventListener('error', () => {
                    try {
                        this._ws && this._ws.close();
                        // eslint-disable-next-line no-empty
                    }
                    catch { }
                    setTimeout(() => {
                        _doInit();
                    }, 1000);
                });
                // successfully connected WebSocket
                this._ws.addEventListener('open', () => {
                    this._status = true;
                    // send all messages in queue to OverlayPlugin
                    for (const { msg } of this._queue) {
                        this._sendMessage(msg);
                    }
                    logInfo('websocket mode api ready');
                });
                // on message loaded from WebSocket
                this._ws.addEventListener('message', (msg) => {
                    let data;
                    try {
                        data = JSON.parse(msg.data);
                    }
                    catch (e) {
                        logError(e, msg);
                        return;
                    }
                    // `common.js` L44
                    if (data.rseq !== undefined && this._responsePromises[data.rseq]) {
                        this._responsePromises[data.rseq](data);
                        delete this._responsePromises[data.rseq];
                    }
                    else {
                        this._triggerEvents(data);
                    }
                });
            };
            _doInit();
        }
        /**
         * `common.js` L72
         * init api in callback mode
         */
        _initCB() {
            // if CEF environment not ready retry after 1s
            if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
                setTimeout(() => {
                    this._initCB();
                }, 1000);
                return;
            }
            // mark api loaded
            this._status = true;
            // bind `this` for callback function called by OverlayAPI
            // `common.js` L81 binding
            window.__OverlayCallback = this._triggerEvents.bind(this);
            // send all messages in queue to OverlayPlugin
            for (const { msg, cb } of this._queue) {
                this._sendMessage(msg, cb);
            }
            logInfo('callback mode api ready');
        }
        /**
         * add an event listener
         */
        addListener(event, cb) {
            if (this._eventCenter[event].started) {
                logWarn(`listener for \`${event}\` added after event transmission already started`);
                logWarn(`some events might have been missed`);
                logWarn(`please register your listeners before calling \`startEvent()\``);
            }
            // push events
            if (typeof cb === 'function') {
                this._eventCenter[event].listeners.push(cb);
                logInfo(`listener for \`${event}\` added`);
            }
        }
        /**
         * remove a listener
         */
        removeListener(event, cb) {
            if (typeof cb === 'function') {
                const cbPos = this._eventCenter[event].listeners.indexOf(cb);
                if (cbPos > -1) {
                    this._eventCenter[event].listeners.splice(cbPos, 1);
                    logInfo(`listener for \`${event}\` removed`);
                }
                else {
                    logWarn(`listener for \`${event}\` not found`);
                }
            }
        }
        /**
         * remove all listener of one event type
         */
        removeAllListener(event) {
            this._eventCenter[event].listeners = [];
            logInfo(`all listener for \`${event}\` removed`);
        }
        /**
         * get all listeners of a event
         */
        getAllListener(event) {
            return this._eventCenter[event].listeners;
        }
        /**
         * start listening event
         */
        startEvent() {
            const eventTypesWithListeners = Object.keys(this._eventCenter).filter((eventType) => {
                return this._eventCenter[eventType].listeners.length > 0;
            });
            this._sendMessage({
                call: 'subscribe',
                events: eventTypesWithListeners,
            });
            logInfo(`${eventTypesWithListeners.length} types of event transmission started`);
        }
        /**
         * ends current encounter and save it, not working in websocket mode
         */
        async endEncounter() {
            if (this._status && isCEFSharp()) {
                await window.OverlayPluginApi.endEncounter();
                logInfo('encounter ended');
            }
        }
        /**
         * `common.js` L122
         * this function allows you to call an overlay handler,
         * these handlers are declared by Event Sources,
         * either built into OverlayPlugin or loaded through addons like Cactbot
         */
        callHandler(msg) {
            let p;
            if (this._wsURL) {
                const rseq = this._rseqCounter++;
                msg.rseq = rseq;
                p = new Promise((resolve) => {
                    this._responsePromises[rseq] = resolve;
                });
                this._sendMessage(msg);
            }
            else {
                p = new Promise((resolve) => {
                    this._sendMessage(msg, (data) => {
                        resolve(data == null ? null : JSON.parse(data));
                    });
                });
            }
            return p;
        }
        /**
         * simulate triggering event once
         */
        simulateData(data) {
            this._triggerEvents(data);
        }
    }
    // singleton
    OverlayAPI._instance = null;
    // function for merging combatant like pets into first player arg
    OverlayAPI.mergeCombatant = mergeCombatant;
    // check if in overlay plugin emblemed cef
    OverlayAPI.isCEFSharp = isCEFSharp;

    const classJobMap = {
        // dps
        acn: 'smn',
        arc: 'brd',
        lnc: 'drg',
        pgl: 'mnk',
        rog: 'nin',
        thm: 'blm',
        // healer
        cnj: 'whm',
        // tank
        gla: 'pld',
        mrd: 'war',
    };
    const jobClassMap = {};
    Object.keys(classJobMap).forEach((key) => {
        jobClassMap[classJobMap[key]] = key;
    });
    function class2job(baseClass) {
        return classJobMap[baseClass] || baseClass;
    }
    function job2class(job) {
        return jobClassMap[job] || job;
    }

    /*! ffxiv-overlay-plugin | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        window.OverlayAPI = OverlayAPI;
    }

    exports.OverlayAPI = OverlayAPI;
    exports.class2job = class2job;
    exports.isCEFSharp = isCEFSharp;
    exports.job2class = job2class;
    exports.mergeCombatant = mergeCombatant;

}));
//# sourceMappingURL=index.js.map
