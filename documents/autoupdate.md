# Enabling `npm`(recommended) or `git` auto update

cdnjs automatically updates libraries that are known to be hosted on `npm` or git repo, e.g., function-plot. npm auto-update relies on each release and git auto-update relies on the [tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) in git repo. This auto-update script runs every hour, but the update result **won't be committed until one of our maintainers audit the updates**, because many libs will change the naming or directory structure during different versions, and we may need to minify the lib without pre-minified dist files, so **it'll be reasonable to delay for at most 12 hours**, if you think there is a lib didn't been updated, please wait at least 12 hours for the process to audit it.

To add `git` auto-update config to a library, update the `package.json` with configuration details and submit your pull request. An example configuration:

```js
  "autoupdate": {
    "source": "git",
    "target": "git://github.com/jashkenas/underscore.git",
    "basePath": "",
    "files": [
      "underscore-min.js",
      "underscore-min.map",
      "underscore.js"
    ]
  }
 ```

To add an `npm` hook to a library, update the `package.json` with configuration details and submit your pull request. An example configuration:

```js
  "npmName": "function-plot",
  "npmFileMap": [
    {
      "basePath": "dist",
      "files": [
        "**/*"
      ]
    }
  ]
```

* Please __don't__ touch `version` number in this step, it'll be automatically updated
* `npmName` should map to the name of the library on `npm`
* `npmFileMap` is a list of files to take from the `npm` tarball and host on cdnjs
* `basePath` will be ignored when copying over to the CDN
* `files` is a pattern matcher allowing selection of multiple files


The above example looks in the tarball whose structure might look like this:

```
|__dist
| |__function-plot.js
|__bower.json
|__index.js
|__site.js
|__package.json
|__README.md
|__lib
| |__...
|__node_modules
| |__...
|__sandbox
| |__...
```

The auto-update process will look for `dist` inside the named tarball and copy all the JavaScript file to cdnjs, minus the `dist` path. The resulting files in cdnjs will be:

```
|__ajax
  |__libs
    |__function-plot
      |__x.y.z
        |__function-plot.js
```

...where `x.y.z` is the version number, extracted from the `package.json` on npm.


