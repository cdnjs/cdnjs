import yaml from 'js-yaml'
import CacheDB from '@chenyfan/cache-db'
import FetchEngine from '../utils/engine.js'
import pkgjson from '../../package.json'
const router_cgi = async (request) => {
    const db = new CacheDB()
    const urlStr = request.url.toString()
    const urlObj = new URL(urlStr)
    const pathname = urlObj.pathname
    const q = (s) => { return urlObj.searchParams.get(s) }
    let config
    switch (pathname.split('/')[2]) {
        case 'hello':
            return new Response('Hello ClientWorker!')
        case 'info':
            return new Response(JSON.stringify({
                version: pkgjson.version
            }),{
                headers:{
                    'Content-Type':'application/json'
                }
            })
        case 'page':
            switch (q('type')) {
                case 'install':
                    return fetch('/404')
                default:
                    return new Response('Error, page type not found')
            }
        case 'api':

            switch (q('type')) {
                case 'config':
                    return fetch(q('url') || '/config.yaml')
                        .then(res => res.text())
                        .then(text => yaml.load(text))
                        .then(async config => {
                            await db.write('config', JSON.stringify(config), { type: "json" })
                            return new Response('ok')
                        })
                        .catch(async err => {
                            await db.write('config', '')
                            return new Response(err)
                        })
                case 'clear':
                    return caches.open('ClientWorker_ResponseCache').then(async cache => {
                        return cache.keys().then(async keys => {
                            await Promise.all(keys.map(key => {
                                cache.delete(key)
                            }))
                            return new Response('ok')
                        })
                    })
                case 'hotpatch':
                    config =JSON.parse(await db.read('config'))
                    if(typeof config.hotpatch !== 'object') return new Response('Error, config.hotpatch not found')
                    const hotpatch = config.hotpatch
                    await FetchEngine.parallel(hotpatch)
                    .then(t=>t.text())
                    .then(async script=>{
                        await db.write('hotpatch', script, { type: "text" })
                        eval(script)
                    })
                    return new Response('ok')
                case 'hotconfig':
                    config = JSON.parse(await db.read('config'))
                    if(typeof config.hotconfig !== 'object') return new Response('Error, config.hotconfig not found')
                    const hotconfig = config.hotconfig
                    const nConfig =  await FetchEngine.parallel(hotconfig).then(t=>t.text()).then(t=>yaml.load(t)).then(t=>JSON.stringify(t)).catch(t=>{return ''})
                    if(nConfig)await db.write('config',nConfig)
                    return new Response('ok')

                default:
                    return new Response('Error, api type not found')
            }
        default:
            return new Response('Not Found!, Client Worker!')
    }
}
export default router_cgi