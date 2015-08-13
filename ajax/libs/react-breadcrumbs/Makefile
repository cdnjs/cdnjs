BIN = ./node_modules/.bin
uglify = /usr/local/lib/node_modules/uglify-js/bin/uglifyjs

install link:
	@npm $@

lint:
	jsxhint -c .jshintrc ./index.js

patch: lint
	@$(call release,patch)

minor: lint 
	@$(call release,minor)

major: lint 
	@$(call release,major)

publish:
	@$(uglify) index.js > dist/react-breadcrumbs.min.js
	git commit -am "new release" --allow-empty
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
