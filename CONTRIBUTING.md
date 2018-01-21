# CDNJS contributing document

 - Please read the instructions about sparseCheckout and shallow clone before any git clone operation to this huge repository: [documents/sparseCheckout.md](https://github.com/cdnjs/cdnjs/blob/master/documents/sparseCheckout.md), especially if you are using MacOS which uses case-insensitive filesystem by default, will bring you other issues.
 - Please make sure you are not going to submit a personal library, we have popularity requirement for the libraries, for the detail, see: [issue](#b-request-a-new-library)

## Table of Contents

* Are you opening an issue? Please take a look at [issue](#a-issue) chapter.

* Are you creating a pull request? Please take a look at [pull request](#b-pull-request) chapter.

 A. [issue](#a-issue)

 * a. [general conventions](#a-general-conventions)

 * b. [request a new library](#b-request-a-new-library)

 B. [pull request](#b-pull-request)

 * a. [sparse checkout and shallow clone](#a-sparse-checkout-and-shallow-clone)

 * b. [common conventions](#b-common-conventions)

 * c. [Updating an existing library](#c-updating-an-existing-library)

 * d. [adding a new library with its assets](#d-adding-a-new-library-with-its-assets)

 * e. [adding a new library by a single package.json](#e-adding-a-new-library-by-a-single-packagejson)

 * f. [pre-flight checks](#f-pre-flight-checks)

 * g. [P.S.](#g-miscs)

## A. issue

### a. general conventions

* Before opening a issue ticket, please check if there is/was already an issue on the same topic.

* If you are going to open a issue about your library (means you are the author/maintainer or one of the main authors/maintainers), please add `[author]` on the issue topic, we'll give it a higher priority to process.

* Please tag obviously related people or issues or commits on the issue as cc (carbon copy). For example, [@PeterDaveHello](https://github.com/PeterDaveHello) / [#3388](https://github.com/cdnjs/cdnjs/issues/3388) / [51e1bd713f](https://github.com/cdnjs/cdnjs/commit/51e1bd713fa31fec271bbbcf565131e77536bdf2)

### b. request a new library

* For the new library request issue, please make sure it's not a *personal* project, we have a basic requirement for the popularity, like **200** stars on GitHub or **800** downloads/month on npm registry.

* The new library must have at least one officially public accessible repository and open source license.

## B. pull request

### a. Sparse checkout and shallow clone
* [The short document of how to use sparse checkout and shallow clone is here](https://github.com/cdnjs/cdnjs/blob/master/documents/sparseCheckout.md)
* Sparse checkout and shallow clone can totally raise efficient of working with cdnjs repo and avoid the problem of case-insensitive filesystem, for detail reason, see it below.
* The minor reason that you should use sparse checkout and shallow clone:
  * There is no need to clone the whole history of cdnjs repo if you are not tracing issues or maintaining this project, and there is no need to checkout all the libs on cdnjs for the same reason(unless you want to access the libs without the Internet).
* And the major reason:
  * The size of the git repo behind cdnjs is about 2.7GB, but the extracted files will use about 70GB space on your filesystem. If you are using case-insensitive filesystem(usually on Windows and MacOS), you may have problem with [**S**ortable](https://github.com/cdnjs/cdnjs/tree/master/ajax/libs/Sortable) and [**s**ortable](https://github.com/cdnjs/cdnjs/tree/master/ajax/libs/sortable), we have an issue disscussion here: [#3650](https://github.com/cdnjs/cdnjs/issues/3650)



### b. common conventions

1. Before sending a pull request, please sync/update your own repository with our master HEAD.

2. If you are **not** the author or maintainer of the lib, please tell us where are those files from, like the url of its download page, or the url of releases page of the library.
 * If you are the author or maintainer of the lib, please just add `[author]` in the pull request's title.

3. If you are adding a **new** lib into cdnjs, please add `[new]` in the pull request's title.

4. If it doesn't have officially minified files, please minify all of the main css/js files, and give them a file name as `library.min.js`.
 * cdnjs's preferred JavaScript minifier is [UglifyJS](http://marijnhaverbeke.nl/uglifyjs "UglifyJS")
 * You can also use [web-minify-helper](https://github.com/PeterDaveHello/web-minify-helper "web-minify-helper") to help you do this automatically, it supports both css and js.

5. Filenames should **not** include a version number and be **lowercase**.
 * This is OK: `useful.min.js`, but this is not: `useful-2.0.1.min.js`.

6. Only do **one** thing or **strongly related** works in one commits, don't mix different things into the same commit.

7. Every commit should be meaningful, don't cut one thing into multiple commits, unless you are trying to fix an existing problem in the master branch.
 * Like adding a lib, but it has some problem, so come with many commits to fix, that will not be allowed.

8. Do **NOT** do things which are **NOT** related with your commit log.

9. We **ONLY** point the libraries to **production**/**stable** version.

 * Which means we don't add a new library which has only have alpha/beta/RC or other non-production versions, please feel free to explain in comments it's really popular and you think it should still be added before a production version.

10. If you are asked to modify the commits, please use `git commit --amend`/`git rebase` to update your commits, and use `--force` parameter with git push to update the pull request.

11. You **should** go back to the PR page after you sent the PR for 15~25 mins, and check if you passed the CI build, if not, please take a look at the error message and try to fix, we **won't** merge a PR with a failed build.
 * Feel free to ask for help if you have no idea.

12. Do NOT send pull request from a master branch
 * 'Creating and deleting branches within your repository' Reference:
   * https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/
 * Refer to the GitHub Flow for the reason why we need to create a new branch for every pull request:
   * https://guides.github.com/introduction/flow/index.html

### c. Updating an existing library

1. Please try to maintain consistency with the existing file and directory structure.
 * If you think the old structure is **wrong**, or the structure obviously changed in the new version, please add notes in the commit log or pull request comment.

2. Please don't forget to update the version info to the latest stable version in its `package.json`.

3. Make sure the main file, as known as the `filename` property in `package.json` is correct, different versions may use different filename.
 
4. For those libs can use auto-update, you should add [auto-update config](https://github.com/cdnjs/cdnjs/blob/master/documents/autoupdate.md) for it, but as the first pull request to add a lib, you should still add its real files, or you won't pass the test.

### d. adding a new library with its assets

1. Libraries are stored in the ajax/libs directory. Each library has its own subdirectory of ajax/libs and each version of the library has its own subdirectory of the library directory name, for example:
 > /ajax/libs/jquery/2.0.0/

2. We use [`package.json`](https://www.npmjs.org/doc/package.json.html) to store the meta data of a library in [npm format](https://www.npmjs.org/doc/package.json.html), please don't forget to add this file at the root of the lib.
 * If there is an official `package.json`, please try to follow the official version, the best way is just copy from the official and do a little modification of it.
 * If there is **not** an official `package.json`, please **create** it by yourself, you should refer to [doc of package.json](https://www.npmjs.org/doc/package.json.html) or other lib's `package.json`, and the data should be as close as official data as possible.
  * The indent of `package.json` **must** be `2 spaces`
  * Please use [JSONLint](http://jsonlint.com/) to validate your `package.json`.

3. We use the directory/folder name and `name` property in `package.json` to identify a library, so this two string should be **totally** equal.

4. You **must** do `npm test` under the root directory of this project to make sure everything is fine.
 * Please refer to [Install npm test dependencies](https://github.com/cdnjs/cdnjs/blob/master/README.md#install-npm-test-dependencies) & [Run npm test to check all is well](https://github.com/cdnjs/cdnjs/blob/master/README.md#run-npm-test-to-check-all-is-well).

5. For those libs can use auto-update, we should add [auto-update config](https://github.com/cdnjs/cdnjs/blob/master/documents/autoupdate.md) for it, so that we can pull the new versions automatically, as the first pull request to add a lib, you should still add its real files, unless you would like to try the method below to add a new library by a single package.json, or you won't pass the test.


### e. adding a new library by a single package.json

CDNJS now supports adding a new library by a single `package.json`: you just need to add a valid CDNJS package.json with npm/git auto-update config, and remove its `version` field in `package.json`, and we'll handle the remaining works.

* [Fork the cdnjs repo](https://github.com/cdnjs/cdnjs/fork) to your own GitHub account.
* Click the "Branch: master" dropdown, enter the name of the library being added, and choose "Create branch <LIBRARY_NAME> from master".
* Go to `ajax/libs` directory.
* Click "Create new file".
* Enter `<LIBRARY_NAME>/package.json`, compose a valid [`package.json`] for the library being added, enter commit message and click "Commit new file".
* Submit a pull request.

Note that you should have a `filename` to point to the main file of a lib, if that file is not minified, please still use `filename.min.js` or `filename.min.css` structure naming, we'll do the minify job.

### f. pre-flight checks

* Have you comply with our conventions?
* Have you followed the library directory structure?
* Does a valid and accurate `package.json` exist for the library?
* Have you minified JavaScript and CSS?
* Did `npm test` check out OK?

### g. Miscs

1. Because of the characteristic of git, it'll be better to do the work on Unix-like environment, like GNU/Linux or BSD distributions (not including Mac).

2. If you think this doc is too simple or casual, please refer to another detail version of [CONTRIBUTING-WIP.md](https://github.com/cdnjs/cdnjs/blob/master/CONTRIBUTING-WIP.md) doc (but which may be out-dated).
 * If there are some conflicts between these files, the priority should be like this: CONTRIBUTING.md > CONTRIBUTING-WIP.md, and you can help us to open an issue to report and fix it.

3. No matter you are updating or adding a lib, if the library's **official** repo contains the dist files in each tag, or, if the library has **official** npm package, please add [auto-update config](https://github.com/cdnjs/cdnjs/blob/master/documents/autoupdate.md) for it.

4. It'll always be better to compare the diff before committing and sending pull request.
 * You can use `git diff` before committing, and use `git log -p` or `git show sha1hash` to compare the difference.

5. Maintainers may force take the task away if there is no response on the pull request for 7 days.

6. Please update/sync your branch by rebase with the latest master branch after your PR was updated.

Finally, thank you so much for your contribution, hope we can make the best cdn service on the world :)
