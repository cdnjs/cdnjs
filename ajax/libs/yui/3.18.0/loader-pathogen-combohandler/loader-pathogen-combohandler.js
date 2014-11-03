YUI.add('loader-pathogen-combohandler', function (Y, NAME) {

/*jslint vars: true */
var GROUP_DELIM = ';',
    SUB_GROUP_DELIM = '+',
    MODULE_DELIM = ',',
    FILTER_RE = /-(min|debug).js/,
    EXTENSION_RE = /\.(?:js|css)$/,
    galleryVersion,
    GALLERY_RE = /^(?:yui:)?gallery-([^\/]+)/,
    TYPES = { js: true, css: true },
    customComboBase;

Y.mix(Y.Loader.prototype, {
    /**
     * Encodes combo urls based on modules  and appends them to an object hash of arrays from `loader.resolve`.
     *
     * @method _pathogenEncodeComboSources
     * @param {Object} resolved The object hash of arrays in which to attach the encoded combo sources.
     * @return Object
     * @private
     */
    _pathogenEncodeComboSources: function (resolved) {
        var combine = this.combine,
            resolvedUrls,
            maxURLLength,
            resolvedMods,
            comboUrls,
            urlKey,
            modKey,
            group,
            type;

        // Check to see if anything needs to be combined.
        if (!combine) {
            for (group in this.groups) {
                if (this.groups.hasOwnProperty(group)) {
                    if (!combine && group.combine) {
                        combine = group.combine;
                        break;
                    }
                }
            }
        }

        // Add the pathogen namespace to the combo base.
        if (Y.config.customComboBase) {
            customComboBase = Y.config.customComboBase;
        }

        if (customComboBase && combine) {
            maxURLLength = this.maxURLLength;

            for (type in TYPES) {
                /*jslint forin: false*/
                if (!TYPES.hasOwnProperty(type)) {
                /*jslint forin: true*/
                    continue;
                }

                urlKey  = type;
                modKey  = type + 'Mods';

                resolved[urlKey] = resolvedUrls = resolved[urlKey] || [];
                resolved[modKey] = resolvedMods = resolved[modKey] || [];

                // Generate custom combo urls.
                comboUrls = this._customResolve(resolvedMods, type);

                    
                resolved[type] = resolved[type].concat(comboUrls);
            }
        }

        return resolved;
    },

    /**
    Build each combo url from the bottom up. There's probably room for optimization
    here, but let's keep it simple for now.
    @method _customResolve
    @param {Array} modules A list of module meta.
    @param {String} type Either `js` or `css`.
    @return {String} Combo url.
    @private
    */
    _customResolve: function (modules, type) {
        var source = this._aggregateGroups(modules),
            groups = this._sortAggregatedGroups(source),
            comboUrls = [],
            comboTail,
            filter,
            match,
            url;

        // Determine the combo tail (e.g., '.debug.js'). Assumption: `filter` is
        // global to the resolve() and should match the filter on loader.
        if (!filter) {
            match = FILTER_RE.exec(Y.config.loaderPath);
            filter = match && match[1] || 'raw';
            filter = (type === 'css' && filter === 'debug') ? 'raw' : 'min';
            comboTail = filter === 'min' ? '' : '.' + filter;
            comboTail = comboTail + '.' + type;
        }

        url = this._buildCombo(groups, customComboBase, comboTail);
        while (url) {
            comboUrls.push(url);
            url = this._buildCombo(groups, customComboBase, comboTail);
        }

        return comboUrls;
    },

    /**
    Aggregate modules into groups with unique keys. The key is "$name+$version" for
    core and gallery groups, and just "$root" for all other groups.
    @method _aggregateGroups
    @param {Array} modules A list of module meta.
    @return {Object} Aggregated groups of module meta.
    @private
    */
    _aggregateGroups: function (modules) {
        var source = {},
            galleryMatch,
            meta,
            name,
            mod,
            key,
            len,
            i;

        // Segment the modules for efficient combo encoding.
        for (i = 0, len = modules.length; i < len; i += 1) {
            mod     = modules[i];
            name    = mod.name;

            // Skip modules that should be loaded singly. This is kind of confusing
            // because it mimics the behavior of the loader (also confusing):
            // https://github.com/ekashida/yui3/blob/632167a36d57da7a884aacf0f4488dd5b8619c7c/src/loader/js/loader.js#L2563
            meta = this.groups && this.groups[mod.group];
            if (meta) {
                if (!meta.combine || mod.fullpath) {
                    continue;
                }
            } else if (!this.combine) {
                continue;
            }
            if (!mod.combine && mod.ext) {
                continue;
            }

            // YUI core modules => core group
            if (!mod.group) {
                key = 'c' + SUB_GROUP_DELIM + YUI.version;
            }
            // YUI gallery modules => gallery group
            else if (mod.group === 'gallery') {
                if (!galleryVersion) {
                    galleryMatch   = GALLERY_RE.exec(this.groups.gallery.root);
                    galleryVersion = galleryMatch && galleryMatch[1];
                }
                name = name.split('gallery-').pop(); // remove prefix
                key  = 'g' + SUB_GROUP_DELIM + galleryVersion;
            }
            // If the module was built the YUI way, then we segment these modules
            // into the `root` group.
            else if (mod.path.indexOf(name + '/' + name) === 0) {
                key = meta.root;

                // Trim '/' from both ends.
                if (key.charAt(0) === '/') {
                    key = key.slice(1);
                }
                if (key.charAt(key.length - 1) === '/') {
                    key = key.slice(0, -1);
                }

                key = 'r' + SUB_GROUP_DELIM + key;
            }
            // If the path does not follow the YUI build convention, then we
            // add them to the prefix tree and subsequently segment these modules
            // into the `path` group.
            else {
                // remove file extension
                name = mod.path.split(EXTENSION_RE).shift();

                if (meta && meta.root) {
                    name = meta.root + name;
                }

                if (name.charAt(0) === '/') {
                    name = name.slice(1);
                }

                // Tag this module as `path` so that we know to include the
                // full path in the combo url later on
                key = 'path' + SUB_GROUP_DELIM + name;
            }

            source[key] = source[key] || [];
            source[key].push(name);
        }
        return source;
    },

    /**
    Build each combo url from the bottom up. There's probably room for optimization
    here, but let's keep it simple for now.
    @method _buildCombo
    @param {Array} groups Grouped module meta.
    @param {String} comboBase The base of the combo url.
    @param {String} comboTail The tail of the combo url (e.g. .debug.js).
    @return {String} A combo url.
    @private
    */
    _buildCombo: function (groups, comboBase, comboTail) {
        var comboUrl = comboBase,
            currLen  = comboBase.length + comboTail.length,
            currDelim,
            currKey,
            prepend,
            modules,
            token,
            group,
            len,
            i;

        for (i = 0, len = groups.length; i < len; i += 1) {
            group       = groups[i];
            currDelim   = comboUrl === comboBase ? '' : GROUP_DELIM;
            currKey     = group.key;
            modules     = group.modules;

            while (modules.length) {
                prepend = currDelim + currKey;
                prepend = prepend ? prepend + SUB_GROUP_DELIM : MODULE_DELIM;

                // Since modules with custom paths are treated as their own
                // segment, we override the prepend value so that it is only ever
                // set to the group delimiter. TODO: refactor this while loop into
                // one with multiple if-statements to make it easier to read.
                if (group.key.indexOf('path') === 0) {
                    prepend = currDelim;
                }

                token = prepend + modules[0];

                if (currLen + token.length < this.maxURLLength) {
                    comboUrl += token;
                    currLen  += token.length;
                    modules.shift();
                } else {
                    return comboUrl + comboTail;
                }

                currDelim = currKey = '';
            }
        }

        comboUrl += comboTail;

        // If no modules were encoded in the combo url.
        if (comboUrl.length === comboBase.length + comboTail.length) {
            comboUrl = null;
        }

        return comboUrl;
    },

    /**
    Sort the aggregated groups, and the modules within them. Minimizes cache misses
    in Yahoo's infrastructure by encoding predictable combo urls across browsers
    since iterating over an object does not guarantee order.
    @method _sortAggregatedGroups
    @param {Object} groups Aggregated groups.
    @return {Array} Sorted groups.
    @private
    **/
    _sortAggregatedGroups: function (groups) {
        var sorted = [],
            key,
            len,
            i;

        for (key in groups) {
            if (groups.hasOwnProperty(key)) {
                sorted.push({
                    key: key,
                    modules: groups[key]
                });
            }
        }

        // Sort the groups.
        sorted.sort(function (a, b) {
            if(a.key < b.key) {
                return -1;
            } else if (a.key > b.key) {
                return 1;
            } else {
                return 0;
            }
        });

        // Sort the modules.
        for (i = 0, len = sorted.length; i < len; i += 1) {
            sorted[i].modules.sort();
        }

        return sorted;
    }
}, true);


}, '@VERSION@');
