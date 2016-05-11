var NgnLayout = document.registerElement('ngn-layout', {
  prototype: Object.create(HTMLElement.prototype, {
    initTpl: {
      enumerable: false,
      value: function () {
	var content = '<template> <style> @charset "UTF-8";  /* Main viewport */ :host([type="viewport"]) { position: absolute; top: 0; left: 0; bottom: 0; right: 0; display: flex; flex: 1 1 auto; overflow: hidden; align-items: stretch; align-content: stretch; align-self: stretch; flex-direction: column; } [type="viewport"] { position: absolute; top: 0; left: 0; bottom: 0; right: 0; display: flex; flex: 1 1 auto; overflow: hidden; align-items: stretch; align-content: stretch; align-self: stretch; flex-direction: column; }  /* Main Layout */ #host { position: relative; display: flex; flex: 1 1 auto; align-self: stretch; align-items: stretch; align-content: stretch; }  /* Non-viewport containers (Chrome + Others) */ :host(:not([type="viewport"])) { display: flex; flex: 1 1 auto; } #host > * { display: flex; flex: 1 1 auto; }  /* Columns */ :host([type="vertical"]) > #host { flex-direction: column; } [type="vertical"] > #host { flex-direction: column; }  /* Rows */ :host([type="horizontal"]) > #host { flex-direction: row; } [type="horizontal"] > #host { flex-direction: row; } </style> <section id="host"> <content></content> </section> </template> '.replace(/<(\/?)template(.*?)>/gi,'')
	var shadow = this.createShadowRoot()
	var ph = document.createElement('p')
	ph.insertAdjacentHTML('afterbegin', content)
	Array.prototype.slice.call(ph.children).forEach(function (el) {
		shadow.appendChild(document.importNode(el, true))
	})
	delete ph
}

    },

    createdCallback: {
      value: function () {
        this.initTpl()
        var me = this
      }
    }
  })
})
