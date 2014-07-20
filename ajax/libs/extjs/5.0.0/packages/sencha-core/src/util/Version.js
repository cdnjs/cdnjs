/**
 * @class Ext.Version
 *
 * A utility class that wraps around a version number string and provides convenient methods
 * to perform comparisons. A version number is expressed in the following general format:
 *
 *     major[.minor[.patch[.build[release]]]]
 * 
 * The `Version` instance holds various readonly properties that contain the digested form
 * of the version string. The numeric componnets of `major`, `minor`, `patch` and `build`
 * as well as the textual suffix called `release`.
 * 
 * Not depicted in the above syntax are three possible prefixes used to control partial
 * matching. These are '^' (the default), '>' and '~'. These are discussed below.
 *
 * Examples:
 *
 *     var version = new Ext.Version('1.0.2beta'); // or maybe "1.0" or "1.2.3.4RC"
 *     console.log("Version is " + version); // Version is 1.0.2beta
 *
 *     console.log(version.getMajor()); // 1
 *     console.log(version.getMinor()); // 0
 *     console.log(version.getPatch()); // 2
 *     console.log(version.getBuild()); // 0
 *     console.log(version.getRelease()); // beta
 *
 * The understood values of `release` are assigned numberic equivalents for the sake of
 * comparsion. The order of these from smallest to largest is as follows:
 *
 *  * `"dev"`
 *  * `"alpha"` or `"a"`
 *  * `"beta"` or `"b"`
 *  * `"RC"` or `"rc"`
 *  * `"#"`
 *  * `"pl"` or `"p"`
 *
 * Any other (unrecognized) suffix is consider greater than any of these.
 * 
 * ## Comparisons
 * There are two forms of comparison that are commonly needed: full and partial. Full
 * comparison is simpler and is also the default.
 * 
 * Example:
 *
 *     var version = new Ext.Version('1.0.2beta');
 *
 *     console.log(version.isGreaterThan('1.0.1')); // True
 *     console.log(version.isGreaterThan('1.0.2alpha')); // True
 *     console.log(version.isGreaterThan('1.0.2RC')); // False
 *     console.log(version.isGreaterThan('1.0.2')); // False
 *     console.log(version.isLessThan('1.0.2')); // True
 *
 *     console.log(version.match(1.0)); // True (using a Number)
 *     console.log(version.match('1.0.2')); // True (using a String)
 * 
 * These comparisons are ultimately implemented by {@link Ext.Version#compareTo compareTo}
 * which returns -1, 0 or 1 depending on whether the `Version' instance is less than, equal
 * to, or greater than the given "other" version.
 * 
 * For example:
 * 
 *      var n = version.compareTo('1.0.1');  // == 1  (because 1.0.2beta > 1.0.1)
 *      
 *      n = version.compareTo('1.1');  // == -1
 *      n = version.compareTo(version); // == 0
 * 
 * ### Partial Comparisons
 * By default, unspecified version number fields are filled with 0. In other words, the
 * version number fields are 0-padded on the right or a "lower bound". This produces the
 * most commonly used forms of comparsion:
 * 
 *      var ver = new Version('4.2');
 *
 *      n = ver.compareTo('4.2.1'); // == -1  (4.2 promotes to 4.2.0 and is less than 4.2.1)
 * 
 * There are two other ways to interpret comparisons of versions of different length. The
 * first of these is to change the padding on the right to be a large number (scuh as
 * Infinity) instead of 0. This has the effect of making the version an upper bound. For
 * example:
 * 
 *      var ver = new Version('^4.2'); // NOTE: the '^' prefix used
 *
 *      n = ver.compreTo('4.3'); // == -1  (less than 4.3)
 *      
 *      n = ver.compareTo('4.2'); // == 1   (greater than all 4.2's)
 *      n = ver.compareTo('4.2.1'); // == 1
 *      n = ver.compareTo('4.2.9'); // == 1
 * 
 * The second way to interpret this comparison is to ignore the extra digits, making the
 * match a prefix match. For example:
 * 
 *      var ver = new Version('~4.2'); // NOTE: the '~' prefix used
 *
 *      n = ver.compreTo('4.3'); // == -1
 *      
 *      n = ver.compareTo('4.2'); // == 0
 *      n = ver.compareTo('4.2.1'); // == 0
 * 
 * This final form can be useful when version numbers contain more components than are
 * important for certain comparisons. For example, the full version of Ext JS 4.2.1 is
 * "4.2.1.883" where 883 is the `build` number.
 * 
 * This is how to create a "partial" `Version` and compare versions to it:
 * 
 *      var version421ish = new Version('~4.2.1');
 *      
 *      n = version421ish.compareTo('4.2.1.883'); // == 0
 *      n = version421ish.compareTo('4.2.1.2'); // == 0
 *      n = version421ish.compareTo('4.2.1'); // == 0
 *
 *      n = version421ish.compareTo('4.2'); // == 1
 *
 * In the above example, '4.2.1.2' compares as equal to '4.2.1' because digits beyond the
 * given "4.2.1" are ignored. However, '4.2' is less than the '4.2.1' prefix; its missing
 * digit is filled with 0.
 */
(function() {
// @define Ext.Version
// @require Ext.String
    var // used by checkVersion to avoid temp arrays:
        checkVerTemp = [''],
        endOfVersionRe = /([^\d\.])/,
        notDigitsRe = /[^\d]/g,
        plusMinusRe = /[\-+]/g,
        stripRe = /\s/g,
        underscoreRe = /_/g,
        Version;

    Ext.Version = Version = function(version, defaultMode) {
            var me = this,
                padModes = me.padModes,
                ch, i, pad, parts, release, releaseStartIndex, ver;

            if (version.isVersion) {
                version = version.version;
            }

            me.version = ver = String(version).toLowerCase().
                                    replace(underscoreRe, '.').replace(plusMinusRe, '');

            ch = ver.charAt(0);
            if (ch in padModes) {
                ver = ver.substring(1);
                pad = padModes[ch];
            } else {
                pad = defaultMode ? padModes[defaultMode] : 0; // careful - NaN is falsey!
            }
            me.pad = pad;

            releaseStartIndex = ver.search(endOfVersionRe);
            me.shortVersion = ver;

            if (releaseStartIndex !== -1) {
                me.release = release = ver.substr(releaseStartIndex, version.length);
                me.shortVersion = ver.substr(0, releaseStartIndex);
                release = Version.releaseValueMap[release] || release;
            }

            me.releaseValue = release || pad;
            me.shortVersion = me.shortVersion.replace(notDigitsRe, '');

            /**
             * @property {Number[]} parts
             * The split array of version number components found in the version string.
             * For example, for "1.2.3", this would be `[1, 2, 3]`.
             * @readonly
             * @private
             */
            me.parts = parts = ver.split('.');
            for (i = parts.length; i--; ) {
                parts[i] = parseInt(parts[i], 10);
            }
            if (pad === Infinity) {
                // have to add this to the end to create an upper bound:
                parts.push(pad);
            }

            /**
             * @property {Number} major
             * The first numeric part of the version number string.
             * @readonly
             */
            me.major = parts[0] || pad;

            /**
             * @property {Number} [minor]
             * The second numeric part of the version number string.
             * @readonly
             */
            me.minor = parts[1] || pad;

            /**
             * @property {Number} [patch]
             * The third numeric part of the version number string.
             * @readonly
             */
            me.patch = parts[2] || pad;

            /**
             * @property {Number} [build]
             * The fourth numeric part of the version number string.
             * @readonly
             */
            me.build = parts[3] || pad;

            return me;
    };

    Version.prototype = {
        isVersion: true,

        padModes: {
            '~': NaN,
            '^': Infinity
        },

        /**
         * @property {String} [release=""]
         * The release level. The following values are understood:
         * 
         *  * `"dev"`
         *  * `"alpha"` or `"a"`
         *  * `"beta"` or `"b"`
         *  * `"RC"` or `"rc"`
         *  * `"#"`
         *  * `"pl"` or `"p"`
         * @readonly
         */
        release: '',

        /**
         * Compares this version instance to the specified `other` version.
         *
         * @param {String/Number/Ext.Version} other The other version to which to compare.
         * @return {Number} -1 if this version is less than the target version, 1 if this
         * version is greater, and 0 if they are equal.
         */
        compareTo: function (other) {
             // "lhs" == "left-hand-side"
             // "rhs" == "right-hand-side"
            var me = this,
                lhsPad = me.pad,
                lhsParts = me.parts,
                lhsLength = lhsParts.length,
                rhsVersion = other.isVersion ? other : new Version(other),
                rhsPad = rhsVersion.pad,
                rhsParts = rhsVersion.parts,
                rhsLength = rhsParts.length,
                length = Math.max(lhsLength, rhsLength),
                i, lhs, rhs;

            for (i = 0; i < length; i++) {
                lhs = (i < lhsLength) ? lhsParts[i] : lhsPad;
                rhs = (i < rhsLength) ? rhsParts[i] : rhsPad;

                // When one or both of the values are NaN these tests produce false
                // and we end up treating NaN as equal to anything.
                if (lhs < rhs) {
                    return -1;
                }
                if (lhs > rhs) {
                    return 1;
                }
            }

            // same comments about NaN apply here...
            lhs = me.releaseValue;
            rhs = rhsVersion.releaseValue;
            if (lhs < rhs) {
                return -1;
            }
            if (lhs > rhs) {
                return 1;
            }

            return 0;
        },
               
        /**
         * Override the native `toString` method
         * @private
         * @return {String} version
         */
        toString: function() {
            return this.version;
        },

        /**
         * Override the native `valueOf` method
         * @private
         * @return {String} version
         */
        valueOf: function() {
            return this.version;
        },

        /**
         * Returns the major component value.
         * @return {Number}
         */
        getMajor: function() {
            return this.major;
        },

        /**
         * Returns the minor component value.
         * @return {Number}
         */
        getMinor: function() {
            return this.minor;
        },

        /**
         * Returns the patch component value.
         * @return {Number}
         */
        getPatch: function() {
            return this.patch;
        },

        /**
         * Returns the build component value.
         * @return {Number}
         */
        getBuild: function() {
            return this.build;
        },

        /**
         * Returns the release component text (e.g., "beta").
         * @return {String}
         */
        getRelease: function() {
            return this.release;
        },

        /**
         * Returns the release component value for comparison purposes.
         * @return {Number/String}
         */
        getReleaseValue: function() {
            return this.releaseValue;
        },

        /**
         * Returns whether this version if greater than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version if greater than the target, `false` otherwise
         */
        isGreaterThan: function(target) {
            return this.compareTo(target) > 0;
        },

        /**
         * Returns whether this version if greater than or equal to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version if greater than or equal to the target, `false` otherwise
         */
        isGreaterThanOrEqual: function(target) {
            return this.compareTo(target) >= 0;
        },

        /**
         * Returns whether this version if smaller than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version if smaller than the target, `false` otherwise
         */
        isLessThan: function(target) {
            return this.compareTo(target) < 0;
        },

        /**
         * Returns whether this version if less than or equal to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version if less than or equal to the target, `false` otherwise
         */
        isLessThanOrEqual: function(target) {
            return this.compareTo(target) <= 0;
        },

        /**
         * Returns whether this version equals to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version equals to the target, `false` otherwise
         */
        equals: function(target) {
            return this.compareTo(target) === 0;
        },

        /**
         * Returns whether this version matches the supplied argument. Example:
         *
         *     var version = new Ext.Version('1.0.2beta');
         *     console.log(version.match(1)); // true
         *     console.log(version.match(1.0)); // true
         *     console.log(version.match('1.0.2')); // true
         *     console.log(version.match('1.0.2RC')); // false
         *
         * @param {String/Number} target The version to compare with
         * @return {Boolean} `true` if this version matches the target, `false` otherwise
         */
        match: function(target) {
            target = String(target);
            return this.version.substr(0, target.length) === target;
        },

        /**
         * Returns this format: [major, minor, patch, build, release]. Useful for comparison.
         * @return {Number[]}
         */
        toArray: function() {
            var me = this;
            return [me.getMajor(), me.getMinor(), me.getPatch(), me.getBuild(), me.getRelease()];
        },

        /**
         * Returns shortVersion version without dots and release
         * @return {String}
         */
        getShortVersion: function() {
            return this.shortVersion;
        },

        /**
         * Convenient alias to {@link Ext.Version#isGreaterThan isGreaterThan}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        gt: function (target) {
            return this.compareTo(target) > 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isLessThan isLessThan}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        lt: function (target) {
            return this.compareTo(target) < 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isGreaterThanOrEqual isGreaterThanOrEqual}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        gtEq: function (target) {
            return this.compareTo(target) >= 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isLessThanOrEqual isLessThanOrEqual}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        ltEq: function (target) {
            return this.compareTo(target) <= 0;
        }
    };

    Ext.apply(Version, {
        aliases: {
            from: {
                extjs: 'ext',
                core: 'sencha-core'
            },
            to: {
                ext: ['extjs'],
                'sencha-core': ['core']
            }
        },

        // @private
        releaseValueMap: {
            dev:   -6,
            alpha: -5,
            a:     -5,
            beta:  -4,
            b:     -4,
            rc:    -3,
            '#':   -2,
            p:     -1,
            pl:    -1
        },

        /**
         * Converts a version component to a comparable value
         *
         * @static
         * @param {Object} value The value to convert
         * @return {Object}
         */
        getComponentValue: function(value) {
            return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
        },

        /**
         * Compare 2 specified versions by ensuring the first parameter is a `Version`
         * instance and then calling the `compareTo` method.
         *
         * @static
         * @param {String} current The current version to compare to
         * @param {String} target The target version to compare to
         * @return {Number} Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent
         */
        compare: function (current, target) {
            var ver = current.isVersion ? current : new Version(current);
            return ver.compareTo(target);
        },

        set: function (collection, packageName, version) {
            var aliases = Version.aliases.to[packageName],
                ver = version.isVersion ? version : new Version(version),
                i;

            collection[packageName] = ver;
            if (aliases) {
                for (i = aliases.length; i-- > 0; ) {
                    collection[aliases[i]] = ver;
                }
            }

            return ver;
        }
    });

    /**
     * @class Ext
     */
    Ext.apply(Ext, {
        /**
         * @private
         */
        compatVersions: {},

        /**
         * @private
         */
        versions: {},

        /**
         * @private
         */
        lastRegisteredVersion: null,

        /**
         * Get the compatibility level (a version number) for the given package name. If
         * none has been registered with `Ext.setCompatVersion` then `Ext.getVersion` is
         * used to get the current version.
         *
         * @param {String} packageName The package name, e.g. 'core', 'touch', 'ext'.
         * @since 5.0.0
         * @private
         */
        getCompatVersion: function (packageName) {
            var versions = Ext.compatVersions,
                compat;

            if (!packageName) {
                compat = versions.ext || versions.touch || versions.core;
            } else {
                compat = versions[Version.aliases.from[packageName] || packageName];
            }

            return compat || Ext.getVersion(packageName);
        },

        /**
         * Set the compatibility level (a version number) for the given package name.
         *
         * @param {String} packageName The package name, e.g. 'core', 'touch', 'ext'.
         * @param {String/Ext.Version} version The version, e.g. '4.2'.
         * @since 5.0.0
         * @private
         */
        setCompatVersion: function (packageName, version) {
            Version.set(Ext.compatVersions, packageName, version);
        },

        /**
         * Set version number for the given package name.
         *
         * @param {String} packageName The package name, e.g. 'core', 'touch', 'ext'.
         * @param {String/Ext.Version} version The version, e.g. '1.2.3alpha', '2.4.0-dev'.
         * @return {Ext}
         */
        setVersion: function (packageName, version) {
            Ext.lastRegisteredVersion = Version.set(Ext.versions, packageName, version);
            return this;
        },

        /**
         * Get the version number of the supplied package name; will return the version of
         * the framework.
         *
         * @param {String} [packageName] The package name, e.g., 'core', 'touch', 'ext'.
         * @return {Ext.Version} The version.
         */
        getVersion: function (packageName) {
            var versions = Ext.versions;

            if (!packageName) {
                return versions.ext || versions.touch || versions.core;
            }

            return versions[Version.aliases.from[packageName] || packageName];
        },

        /**
         * This method checks the registered package versions against the provided version
         * `specs`. A `spec` is either a string or an object indicating a boolean operator.
         * This method accepts either form or an array of these as the first argument. The
         * second argument applies only when the first is an array and indicates whether
         * all `specs` must match or just one.
         * 
         * ## Package Version Specifications
         * The string form of a `spec` is used to indicate a version or range of versions
         * for a particular package. This form of `spec` consists of three (3) parts:
         * 
         *  * Package name followed by "@". If not provided, the framework is assumed.
         *  * Minimum version.
         *  * Maximum version.
         * 
         * At least one version number must be provided. If both minimum and maximum are
         * provided, these must be separated by a "-".
         * 
         * Some examples of package version specifications:
         * 
         *      4.2.2           (exactly version 4.2.2 of the framework)
         *      4.2.2+          (version 4.2.2 or higher of the framework)
         *      4.2.2-          (version 4.2.2 or higher of the framework)
         *      4.2.1 - 4.2.3   (versions from 4.2.1 up to 4.2.3 of the framework)
         *      - 4.2.2         (any version up to version 4.2.1 of the framework)
         *      
         *      foo@1.0         (exactly version 1.0 of package "foo")
         *      foo@1.0-1.3     (versions 1.0 up to 1.3 of package "foo")
         * 
         * **NOTE:** This syntax is the same as that used in Sencha Cmd's package
         * requirements declarations.
         * 
         * ## Boolean Operator Specifications
         * Instead of a string, an object can be used to describe a boolean operation to
         * perform on one or more `specs`. The operator is either **`and`** or **`or`**
         * and can contain an optional **`not`**.
         * 
         * For example:
         * 
         *      {
         *          not: true,  // negates boolean result
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ]
         *      }
         * 
         * Each element of the array can in turn be a string or object spec. In other
         * words, the value is passed to this method (recursively) as the first argument
         * so these two calls are equivalent:
         * 
         *      Ext.checkVersion({
         *          not: true,  // negates boolean result
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ]
         *      });
         *
         *      !Ext.checkVersion([
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ], true);
         * 
         * ## Examples
         * 
         *      // A specific framework version
         *      Ext.checkVersion('4.2.2');
         * 
         *      // A range of framework versions:
         *      Ext.checkVersion('4.2.1-4.2.3');
         * 
         *      // A specific version of a package:
         *      Ext.checkVersion('foo@1.0.1');
         * 
         *      // A single spec that requires both a framework version and package
         *      // version range to match:
         *      Ext.checkVersion({
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1-1.0.2'
         *          ]
         *      });
         * 
         *      // These checks can be nested:
         *      Ext.checkVersion({
         *          and: [
         *              '4.2.2',  // exactly version 4.2.2 of the framework *AND*
         *              {
         *                  // either (or both) of these package specs:
         *                  or: [
         *                      'foo@1.0.1-1.0.2',
         *                      'bar@3.0+'
         *                  ]
         *              }
         *          ]
         *      });
         * 
         * ## Version Comparisons
         * Version comparsions are assumed to be "prefix" based. That is to say, `"foo@1.2"`
         * matches any version of "foo" that has a major version 1 and a minor version of 2.
         * 
         * This also applies to ranges. For example `"foo@1.2-2.2"` matches all versions
         * of "foo" from 1.2 up to 2.2 regardless of the specific patch and build.
         * 
         * ## Use in Overrides
         * This methods primary use is in support of conditional overrides on an
         * `Ext.define` declaration.
         * 
         * @param {String/Array/Object} specs A version specification string, an object
         * containing `or` or `and` with a value that is equivalent to `specs` or an array
         * of either of these.
         * @param {Boolean} [matchAll=false] Pass `true` to require all specs to match.
         * @return {Boolean} True if `specs` matches the registered package versions.
         */
        checkVersion: function (specs, matchAll) {
            var isArray = Ext.isArray(specs),
                aliases = Version.aliases.from,
                compat = isArray ? specs : checkVerTemp,
                length = compat.length,
                versions = Ext.versions,
                frameworkVer = versions.ext || versions.touch,
                i, index, matches, minVer, maxVer, packageName, spec, range, ver;

            if (!isArray) {
                checkVerTemp[0] = specs;
            }

            for (i = 0; i < length; ++i) {
                if (!Ext.isString(spec = compat[i])) {
                    matches = Ext.checkVersion(spec.and || spec.or, !spec.or);
                    if (spec.not) {
                        matches = !matches;
                    }
                } else {
                    if (spec.indexOf(' ') >= 0) {
                        spec = spec.replace(stripRe, '');
                    }

                    // For "name@..." syntax, we need to find the package by the given name
                    // as a registered package.
                    index = spec.indexOf('@');
                    if (index < 0) {
                        range = spec;
                        ver = frameworkVer;
                    } else {
                        packageName = spec.substring(0, index);
                        if (!(ver = versions[aliases[packageName] || packageName])) {
                            // The package is not registered, so if we must matchAll then
                            // we are done - FAIL:
                            if (matchAll) {
                                return false;
                            }
                            // Otherwise this spec is not a match so we can move on to the
                            // next...
                            continue;
                        }
                        range = spec.substring(index+1);
                    }

                    // Now look for a version, version range or partial range:
                    index = range.indexOf('-');
                    if (index < 0) {
                        // just a version or "1.0+"
                        if (range.charAt(index = range.length - 1) === '+') {
                            minVer = range.substring(0, index);
                            maxVer = null;
                        } else {
                            minVer = maxVer = range;
                        }
                    } else if (index > 0) {
                        // a range like "1.0-1.5" or "1.0-"
                        minVer = range.substring(0, index);
                        maxVer = range.substring(index+1); // may be empty
                    } else {
                        // an upper limit like "-1.5"
                        minVer = null;
                        maxVer = range.substring(index+1);
                    }

                    matches = true;
                    if (minVer) {
                        minVer = new Version(minVer, '~'); // prefix matching
                        matches = minVer.ltEq(ver);
                    }
                    if (matches && maxVer) {
                        maxVer = new Version(maxVer, '~'); // prefix matching
                        matches = maxVer.gtEq(ver);
                    }
                } // string spec

                if (matches) {
                    // spec matched and we are looking for any match, so we are GO!
                    if (!matchAll) {
                        return true;
                    }
                } else if (matchAll) {
                    // spec does not match the registered package version
                    return false;
                }
            }

            // In the loop above, for matchAll we return FALSE on mismatch, so getting
            // here with matchAll means we had no mismatches. On the other hand, if we
            // are !matchAll, we return TRUE on match and so we get here only if we found
            // no matches.
            return !!matchAll;
        },

        /**
         * Create a closure for deprecated code.
         *
         *     // This means Ext.oldMethod is only supported in 4.0.0beta and older.
         *     // If Ext.getVersion('extjs') returns a version that is later than '4.0.0beta', for example '4.0.0RC',
         *     // the closure will not be invoked
         *     Ext.deprecate('extjs', '4.0.0beta', function() {
         *         Ext.oldMethod = Ext.newMethod;
         *
         *         ...
         *     });
         *
         * @param {String} packageName The package name
         * @param {String} since The last version before it's deprecated
         * @param {Function} closure The callback function to be executed with the specified version is less than the current version
         * @param {Object} scope The execution scope (`this`) if the closure
         * @private
         */
        deprecate: function(packageName, since, closure, scope) {
            if (Version.compare(Ext.getVersion(packageName), since) < 1) {
                closure.call(scope);
            }
        }
    }); // End Versioning
}());

// load the cmd-5 style app manifest metadata now, if available...
(function (manifest){
    var packages = (manifest && manifest.packages) || {},
        compat = manifest && manifest.compatibility,
        name, pkg;
    
    for (name in packages) {
        pkg = packages[name];
        Ext.setVersion(name, pkg.version);
    }

    if (compat) {
        if (Ext.isString(compat)) {
            Ext.setCompatVersion('core', compat);
        } else {
            for (name in compat) {
                Ext.setCompatVersion(name, compat[name]);
            }
        }
    }

    if (!packages.ext && !packages.touch) {
        Ext.setVersion('ext', '5');
    }
})(Ext.manifest);
