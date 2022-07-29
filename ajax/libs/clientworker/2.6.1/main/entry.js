import { } from './handle/main.js'
import pkgjson from '../package.json'
import cons from './utils/cons.js'
import CacheDB from '@chenyfan/cache-db'

cons.s(`ClientWorker${pkgjson.version} Started!`)
const db = new CacheDB()
db.read('hotpatch').then(script => {
    if (!!script) {
        cons.s('Hotpatch Loaded!')
        eval(script)
    } else {
        cons.w('Hotpatch Not Found!')
    }
})
db.read('config').then(config => {
    config = JSON.parse(config) || {}
    setInterval(() => {
        cons.s(`ClientWorker@${pkgjson.version} Start to Clean Expired Cache!`)
        caches.open("ClientWorker_ResponseCache").then(cache => {
            cache.keys().then(keys => {
                keys.forEach(key => {
                    cache.match(key).then(res => {
                        if (Number(res.headers.get('ClientWorker_ExpireTime')) <= new Date().getTime()) {
                            cache.delete(key)
                        }
                    })
                })
            })
        })
    }, eval(config.cleaninterval) || 60*1000);
})
addEventListener('fetch', event => {
    event.respondWith(self.clientworkerhandle(event.request))
})
addEventListener('install', function () {
    cons.s(`ClientWorker@${pkgjson.version} Installed!`)
    self.skipWaiting();
});
addEventListener('activate', function () {
    cons.s(`ClientWorker@${pkgjson.version} Activated!`)
    self.clients.claim();
})

