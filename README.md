[![Circle CI](https://circleci.com/gh/cdnjs/cdnjs.png?style=badge)](https://circleci.com/gh/cdnjs/cdnjs) [![Dependency Status](https://david-dm.org/cdnjs/cdnjs.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs) [![devDependency Status](https://david-dm.org/cdnjs/cdnjs/dev-status.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs#info=devDependencies) [![license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/cdnjs/cdnjs/blob/master/MIT-LICENSE) [![Gitter chat](https://badges.gitter.im/cdnjs/cdnjs.svg)](https://gitter.im/cdnjs/cdnjs) [![tip for next commit](https://tip4commit.com/projects/919.svg)](https://tip4commit.com/github/cdnjs/cdnjs)

# cdnjs Library Repository

[cdnjs](http://github.com/cdnjs/cdnjs) is the repository mirroring all library assets on [cdnjs.cloudflare.com](http://cdnjs.cloudflare.com).

[Thomas Davis](https://twitter.com/neutralthoughts) and [Ryan Kirkman](https://twitter.com/ryan_kirkman) created cdnjs, [Drew Freyling](http://decompile.it/blog/) and [Peter Dave Hello](https://github.com/PeterDaveHello) are maintainers. [Juan Gallardo](http://www.jgallardo.me/) is our community moderator.

cdnjs will host any production version of any JavaScript/CSS library, subject to licence permissions.

  * Beta, release candidate and alpha releases are not usually considered ready for full production status. Requests for pre-release versions of libraries _may_ be declined after peer review.
  * We'll accept beta, release candidate and alpha releases if you are using our npm/git auto-update mechanism, if you really want it, please setup auto-update for that lib.

Please raise a new pull request for new library additions and existing library updates, following the instructions below.

## IMPORTANT - No more manual submissions

[Discussion](https://github.com/cdnjs/cdnjs/issues/3638)

It's time for us to move away from manual submissions and focus solely on getting libraries updating from official sources. Everything is still flakey and we hope you can bear with us in this transition. 

*All pull request should just add auto update configs to the package.json*





## Adding a new or updating an existing library

cdnjs relies on user-submitted pull requests and automatic updating via `npm` to populate and update libraries.

To add a new library, or update an existing library outside of `npm`, start by [forking the cdnjs repo](https://github.com/cdnjs/cdnjs/fork) to your own GitHub account.

If you're adding/modifying outside of the GitHub browser interface, for example on the command line or with the GitHub desktop application, you will need to additionally install `node` locally. For more information on installing `node`, please refer to [nodejs.org](http://nodejs.org).

When you have forked the cdnjs repo, add your library to it. Libraries are stored in the `ajax/libs` directory. Each library has its own subdirectory of `ajax/libs` and each version of the library has its own subdirectory of the library directory name, for example:

```
/ajax/libs/jquery/2.0.0/
```

## Conventions

You should consider the following when adding to or updating the library, so that we can keep our project neat, clean and clear:

* Filenames should _not_ include a version number and be _lowercase_.
  * This is OK: `useful.min.js`, but this is not: `useful-2.0.1.min.js`.

* JavaScript & CSS files should be minified to reduce network traffic and browser overhead.
  * If the library doesn't already provide a minified version, cdnjs's preferred JavaScript minifier is [UglifyJS](http://marijnhaverbeke.nl/uglifyjs "UglifyJS")

* If you are updating a library, please try to maintain consistency with the existing file and directory structure.
  * There will be occasions, particularly with major version increments, where this is not practical.

* You should sync your local repository with our master branch as new as possible, try to make the commits' parent be new.
 * Please use `git pull --rebase` instead of `git pull`, use `git rebase upstream/master` instead of `git merge upstream/master`, so that we can avoid of meaningless merging.

* Only do one thing in one commits, don't mix different things into the same commit.

* Every commits should be meaningful, don't cut one thing into multiple commits.

* Inspect your work by `git diff` & `git status` before commit your change.

* Inspect your commit by `git log --stat` & `git log -p` before sending a pull request.

## Create or update `package.json`

Each library has a corresponding `package.json`, written in `npm` format (see `test/schemata/npm-package.json` for details or use another `package.json` to crib from - it's pretty self-explanatory). When an existing library is updated, the details in `package.json` should be updated where required.

For example, if a new version of the library is added, the version number may need changing. Likewise, if you're adding `npm` update information to a library, this is done in `package.json`.

## Install `npm test` dependencies

If you don't have `vows` installed do so by running:

```
npm install -g vows
```

## Run `npm test` to check all is well

If you're updating the library outside of `npm` or the GitHub browser, you should run `npm test` from the library directory to ensure everything is OK.

If you run `npm test` and see no errors, all is well; resolve any errors before you raise your pull request and re-run `npm test` to ensure everything works.

If you see an error then run `npm install` before running `npm test:

```
vows: command not found
npm ERR! Test failed.  See above for more details.
npm ERR! not ok code 0
```

## Pull request pre-flight checks

* Have you comply with our conventions?
* Have you followed the library directory structure?
* Does a valid and accurate `package.json` exist for the library?
* Have you minified JavaScript and CSS?
* Did `npm test` check out OK?

...if so, great! You're ready to raise a pull request.

## Raising a pull request

Please restrict your pull request to one library. You can include >1 version/release of a library in a single pull request.

From a maintenance standpoint, it's much more straightforward to process pull requests where there is one commit for one library.

In your pull request title, tell us what you're doing.

 - If you are the author of the library, please add `[author]` to the pull request title.

 - If you are adding a new lib, please add `[new]` to the pull request title.

__Please include the following in your pull request:__

* The origin of your new files
  * e.g., where you downloaded the version from

A URL is ideal. Providing the origin of your files is very helpful as the cdnjs project is peer-reviewed. Practically speaking, it also helps us process your pull request more efficiently, which means your files go live sooner. Help us and we'll help you back.

## Enabling `npm` auto update

cdnjs automatically updates libraries that are known to be hosted on `npm` e.g., Lodash. This auto-update script runs every 15 minutes.

To add an `npm` hook to a library, update the `package.json` with configuration details and submit your pull request. An example configuration:

```
  "npmName": "lodash",
  "npmFileMap": [{
    "basePath": "/dist/",
    "files": [
      "*.js"
    ]
  }],
```

* Please __don't__ touch `version` number in this step, it'll be automatically updated
* `npmName` should map to the name of the library on `npm`
* `npmFileMap` is a list of files to take from the `npm` tarball and host on cdnjs
* `basePath` will be ignored when copying over to the CDN
* `files` is a pattern matcher allowing selection of multiple files


The above example looks in the tarball whose structure might look like this:

```
|__dist
| |__lodash.compat.js
| |__lodash.compat.min.js
| |__lodash.js
| |__lodash.min.js
| |__lodash.underscore.js
| |__lodash.underscore.min.js
|__LICENSE.txt
|__lodash.js
|__package.json
|__README.md
```

The auto-update process will look for `dist` inside the named tarball and copy all the JavaScript file to cdnjs, minus the `dist` path. The resulting files in cdnjs will be: 

```
|__ajax
  |__libs
    |__lodash.js
      |__x.y.z
        |__lodash.compat.js
        |__lodash.compat.min.js
        |__lodash.js
        |__lodash.min.js
        |__lodash.underscore.js
        |__lodash.underscore.min.js
```

...where `x.y.z` is the version number, extracted from the `package.json` on npm.

## API

You can search cdnjs via our API:

```
http://api.cdnjs.com/libraries
```

Without any query parameters it will return the name and main file URL of every library on cdnjs. To search, use:

```
http://api.cdnjs.com/libraries?search=jquery
```

If you would like more data, use the fields parameter which takes comma-separated values:

```
http://api.cdnjs.com/libraries?search=jquery&fields=version,description
```

To get a list of all files for that library, use the assets field:

```
http://api.cdnjs.com/libraries?search=jquery&fields=assets
```

Other fields available are:

```
version
description
homepage
keywords
maintainers
assets
```

The API is served over Cloudflare with a six-hour expiry for requests.

## Extensions, Plugins, Resources

[Extensions, Plugins, Resources](https://github.com/cdnjs/cdnjs/wiki/Extensions%2C-Plugins%2C-Resources)

### Bot
The bot account is called `the-cdnjs-curator`
