var path = require('path');

var bind = function(appMethod, url, middleware, instanceMethod) {
	if(instanceMethod) {
		if(middleware) {
			return appMethod(url, middleware, instanceMethod);
		} else {
			return appMethod(url, instanceMethod);
		}
	}
};

module.exports = function(app, root, name, middleware) {
	var r = require(path.join(path.dirname(module.parent.filename), name));
	var uri = root + '/' + name;
	var iduri = uri + '/:id';

	bind(app.get, iduri, middleware, r.get);
	bind(app.post, iduri, middleware, r.save);
	bind(app.get, uri, middleware, r.query);
	bind(app['delete'], iduri, middleware, r.remove);
};