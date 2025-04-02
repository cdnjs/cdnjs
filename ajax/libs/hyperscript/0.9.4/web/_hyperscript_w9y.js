
import _hyperscript from "../lib/core.js"

import web from "../lib/web.js"
import worker from "../lib/plugin/worker.js"
import socket from "../lib/plugin/socket.js"
import eventsource from "../lib/plugin/eventsource.js"
import template from "../lib/plugin/template.js"
import hdb from "../lib/plugin/hdb.js"

web(_hyperscript)
worker(_hyperscript)
socket(_hyperscript)
eventsource(_hyperscript)
template(_hyperscript)
hdb(_hyperscript)

export default _hyperscript