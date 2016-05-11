# cdnjs Library Repository

﻿[![Circle CI](https://img.shields.io/circleci/project/cdnjs/cdnjs/master.svg)](https://circleci.com/gh/cdnjs/cdnjs)
﻿[![Dependency Status](https://david-dm.org/cdnjs/cdnjs.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs) [![devDependency Status](https://david-dm.org/cdnjs/cdnjs/dev-status.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs#info=devDependencies)
﻿[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/cdnjs/cdnjs/blob/master/MIT-LICENSE)
﻿[![Gitter chat](https://badges.gitter.im/cdnjs/cdnjs.svg)](https://gitter.im/cdnjs/cdnjs)
﻿[![Issue Stats](http://www.issuestats.com/github/cdnjs/cdnjs/badge/pr?style=flat)](http://www.issuestats.com/github/cdnjs/cdnjs) [![Issue Stats](http://www.issuestats.com/github/cdnjs/cdnjs/badge/issue?style=flat)](http://www.issuestats.com/github/cdnjs/cdnjs)
﻿[![tip for next commit](https://tip4commit.com/projects/919.svg)](https://tip4commit.com/github/cdnjs/cdnjs) [![Bountysource](https://www.bountysource.com/badge/team?team_id=11914&style=bounties_posted)](https://www.bountysource.com/teams/cdnjs/bounties?utm_source=cdnjs&utm_medium=shield&utm_campaign=bounties_posted)
[![GetBadges Game](https://cdnjs-cdnjs.getbadges.io/shield/company/cdnjs-cdnjs)](https://cdnjs-cdnjs.getbadges.io/?ref=shield-game)

[cdnjs](https://github.com/cdnjs/cdnjs) is the repository mirroring all library assets on [cdnjs.cloudflare.com](https://cdnjs.cloudflare.com).

[Thomas Davis](https://twitter.com/neutralthoughts) and [Ryan Kirkman](https://twitter.com/ryan_kirkman) created cdnjs, [Drew Freyling](http://decompile.it/blog/) and [Peter Dave Hello](https://github.com/PeterDaveHello) are maintainers. [Juan Gallardo](http://jgallardo.me/) is our community moderator.

cdnjs will host any production version of any JavaScript/CSS library, subject to license permissions.

  * Libraries must have notable popularity: 100 stars/watchers on GitHub, or more than 500 times download per month on npm stats are both good examples, but as long as reasonable popularity can be demonstrated the library will be added.
  * Beta, release candidate and alpha releases are not usually considered ready for full production status. Requests for pre-release versions of libraries _may_ be declined after peer review.
  * We'll accept beta, release candidate and alpha releases if you are using our npm/git auto-update mechanism, if you really want it, please setup auto-update for that lib.

Please raise a new pull request for new library additions and existing library updates, following the instructions below.

## IMPORTANT

 - All new libraries hosted on CDNJS should have an official public repository or npm package, and the officially pre-built distribution file(s) should also be there, so that we can apply the auto-update mechanishm on that lib.
 - Now CDNJS supports adding a library by a single package.json, you just need to add a valid CDNJS package.json with npm/git auto-update config, and remove its version field in package.json, then we'll handle the remaining works.
   - Notes that you should have a `filename` to point to the main file of a lib, if that file is not minified, please still use `filename.min.js` or `filename.min.css` structure naming, we'll do the minify job.

## Adding a new or updating an existing library

cdnjs relies on user-submitted pull requests and automatic updating via `npm` or `git` repository to populate and update libraries.

To add a new library, or update an existing library outside of `npm`/`git`, start by [forking the cdnjs repo](https://github.com/cdnjs/cdnjs/fork) to your own GitHub account.

If you're adding/modifying outside of the GitHub browser interface, for example on the command line or with the GitHub desktop application, you will need to additionally install `node`(`node.js`) locally, so that you can run the test  or utils under `tools` locally.

When you have forked the cdnjs repo, add your library to it. Libraries are stored in the `ajax/libs` directory. Each library has its own subdirectory of `ajax/libs` and each version of the library has its own subdirectory of the library directory name, for example:

```
/ajax/libs/jquery/2.0.0/
```

[**@IonicaBizau**](https://github.com/IonicaBizau) wrote a NodeJS command line tool for automating the adding process of a new library. This tool [is named *cdnjs-importer* and it's open source](https://github.com/cdnjs/cdnjs-importer)

For more information regarding this importer, please check out the [repository documentation](https://github.com/cdnjs/cdnjs-importer).

## Conventions

You should consider the following when adding to or updating the library, so that we can keep our project neat, clean and clear:

* Filenames should _not_ include a version number.
  * This is OK: `useful.min.js`, but this is not: `useful-2.0.1.min.js`.

* JavaScript & CSS files should be minified to reduce network traffic and browser overhead.
  * If the library doesn't already provide a minified version, cdnjs's preferred JavaScript minifier is [UglifyJS](http://marijnhaverbeke.nl/uglifyjs "UglifyJS")

* If you are updating a library, please try to maintain consistency with the existing file and directory structure.
  * There will be occasions, particularly with major version increments, where this is not practical.

* You should sync your local repository with our master branch as new as possible, try to make the commits' parent be new.
 * Please use `git pull --rebase` instead of `git pull`, use `git rebase upstream/master` instead of `git merge upstream/master`, so that we can avoid of meaningless merging.

* Only do one _meaningful_ thing in one commits, don't mix different things into the same commit, like add two libs in a commit.

* Every commits should be meaningful, don't cut one thing into multiple commits, like add a lib in 3 commits.

* Inspect your work by `git diff` & `git status` before commit your change.

* Inspect your commit by `git log --stat` & `git log -p` before sending a pull request.

## Create or update `package.json`

Each library has a corresponding `package.json`, written in `npm` format (see `test/schemata/npm-package.json` for details or use another `package.json` to crib from - it's pretty self-explanatory), and we use `filename` field in `package.json` to point to the mainfile of a lib, this field will be required. When an existing library is updated, the details in `package.json` should be updated where required.

For example, if a new version of the library is added, the version number may need changing. Likewise, if you're adding `npm` update information to a library, this is done in `package.json`.

## Run `npm test` to check all is well

If you're updating the library outside of `npm` or the GitHub browser, you should run `npm test` from the library directory to ensure everything is OK.

If you run `npm test` and see no errors, all is well; resolve any errors before you raise your pull request and re-run `npm test` to ensure everything works.

If you see an error then run `npm install` before running `npm test`:

```
vows: command not found
npm ERR! Test failed.  See above for more details.
npm ERR! not ok code 0
```

## Pull request pre-flight checks

* Have you complied with our conventions?
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

## Enabling auto-update
See [autoupdate.md](documents/autoupdate.md)

## API
See [api.md](documents/api.md)

## Extensions, Plugins, Resources

[Extensions, Plugins, Resources](https://github.com/cdnjs/cdnjs/wiki/Extensions%2C-Plugins%2C-Resources)
