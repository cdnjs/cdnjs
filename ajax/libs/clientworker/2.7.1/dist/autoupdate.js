;(async (updateSWDelay, updateConfigDelay) => {
    const LSDB = {
        read: (key) => {
            return localStorage.getItem(key);
        },
        write: (key, value) => {
            localStorage.setItem(key, value);
        }
    }
    async function updateSW() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then(async registrations => {
                for (let registration of registrations) {
                    await registration.unregister();
                }
                console.log(`Unregistered service workers`);
            }).then(() => {
                //register new service worker in /cw.js
                navigator.serviceWorker.register('/cw.js').then(async registration => {
                    console.log(`Registered service worker`);
                    await registration.update();
                    LSDB.write('cw_time_sw', new Date().getTime());
                })
            })
        }
    };
    async function updateConfig() {
        await fetch('/cw-cgi/api?type=config').then(res => res.text()).then(res => {
            if (res === 'ok') {
                console.log(`Config updated`);
                LSDB.write('cw_time_config', new Date().getTime());
            } else {
                console.log(`Config update failed`);
            }
        })
    }

    if (Number(LSDB.read('cw_time_sw')) < new Date().getTime() - updateSWDelay) {
        await updateSW();
        await updateConfig();
    }
    if (Number(LSDB.read('cw_time_config')) < new Date().getTime() - updateConfigDelay) {
        await updateConfig();
    }

    setInterval(async () => {
        await updateSW();
        await updateConfig();
    }, updateSWDelay);
    setInterval(async () => {
        await updateConfig()
    }, updateConfigDelay);
})(1000 * 60 * 60 * 12, 1000 * 60);