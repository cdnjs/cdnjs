# Contributing to cdnjs Library

## 0. Overview

[cdnjs](http://github.com/cdnjs/cdnjs) is the GitHub repository mirroring all library assets on [cdnjs.cloudflare.com](http://cdnjs.cloudflare.com).

cdnjs relies on user-submitted pull requests and automatic updating to populate and update libraries. With hundreds of contributors and thousands of commits, it is very important that new libraries are added to cdnjs using the correct procedure.

Libraries that are actively-maintained on [npmjs](http://npmjs.org) can be configured to be _automatically_ updated. Other libraries that are not on npmjs should be updated _manually_.

## 1. Policy, rules and guidelines

cdnjs will host any production version of any JavaScript (JS) or Cascading Style Sheets (CSS) library, subject to appropriate licence permissions.

cdnjs will host JS, CSS, SWF and library image files. Note: cdnjs does not currently serve HTML or PHP files.

New libraries should have some indicator of popularity (e.g., GitHub stars or watchers) and purpose (e.g., a jQuery plugin to display images).

cdnjs maintainers and peer-reviewers need to know the origin of new libraries and updates (i.e., where you downloaded the files from).

## 2. Configure auto-update

### 2.1 Auto-update overview

Libraries that are actively-maintained on [npmjs](http://npmjs.org) can be configured to be automatically updated. A cdnjs auto-update script runs every 15 minutes to check for new library versions on npmjs.

Each cdnjs library has a `package.json` file. This file contains required and sometimes optional information about how the library works. Auto-update is configured in `package.json` alongside other library information.

### 2.3 Auto-update syntax

* `npmName` is the corresponding npmjs name
* `npmFileMap` is a list of files to copy from npmjs to cdnjs
* `basePath` is the path in the npmjs tarball; it will be ignored when files are copied to cdnjs
* `files` indicates the file(s) to copy and can be named (e.g., lodash.min.js) or wildcards (e.g., *.js).

### 2.3 Auto-update example

```
  "npmName": "lodash",
  "npmFileMap": [{
    "basePath": "/dist/",
    "files": [
      "*.js"
    ]
  }],
```

The example in 2.3. parses the `lodash` tarball, which has this structure:

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

The auto-update process will locate `dist` (specified in `basePath`) and copy *.js (specified in `files`) to cdnjs, removing the `dist` path. The resulting files in cdnjs will be: 

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

&hellip;where `x.y.z` is the library version number, extracted from the `package.json` on npmjs.

### 2.4 Updating `package.json` with auto-update information

When you locate a cdnjs library with a corresponding npmjs presence, the relevant `package.json` should be updated.

-Refer to 5.* below for instructions on forking, updating and committing changes to cdnjs.-

Coming soon - please refer to `README.md`.

## 3. Update existing library with new version

Coming soon - please refer to `README.md`.

## 4. Create a new library

Coming soon - please refer to `README.md`.

## 5. Adding and updating cdnjs

Changes to cdnjs happen with the following process:

* fork the cdnjs repository to your GitHub account
* make the required changes to the forked repository
* run the pre-flight `npm` check, resolve any errors
* raise a pull request with appropriate information
* remove your forked repository after the merge

If these steps are followed, and everything works out, the update process is usually efficient and your library update will go live soon afterwards.

### 5.1 Fork the cdnjs repository

Forking the cdnjs repository is easy. Be aware that it is one of the largest repositories on GitHub (>3GB), and this should be a consideration if you choose to clone it to your computer.

To fork the repository via your browser, visit this link:

[https://github.com/cdnjs/cdnjs/fork](https://github.com/cdnjs/cdnjs/fork)

Select your GitHub account for the destination and wait for the forking process to complete. Assuming you saw no errors, you should be able to access your fork of cdnjs from your own GitHub account:

https://github.com/your-github-username/cdnjs

&hellip;where your-github-username is, unsurprisingly, your GitHub username.

### 5.2 Make changes to your fork

Change are made to your fork of cdnjs. These changes contribute to a pull request, which may be merged after examination by the cdnjs maintainers.

Changes to your fork can be made at GitHub using your browser, or on your computer using a `git` command line or graphical user interface.

* If you intend to make a _single, simple contribution_ to cdnjs you will likely find the browser experience more straightforward.

* If you intend to make _numerous contributions_ to cdnjs, you may find a local clone of your forked repository a better route.

#### 5.2.1 Follow the existing library convention

Where possible, follow the existing file and directory structure for the library when adding a new version. Users should ideally be able to increment the version number reference in their projects to load a more recent version.

This is not always possible with major or minor version changes, especially with considerable changes, so please ask if you are not sure.

#### 5.2.2 Make changes using your browser

The GitHub website provides an easy-to-use interface to add and update simple libraries. A library containing a single or small number of text files is an ideal candidate for this route.

In your fork of cdnjs, navigate to `ajax/libs`:

https://github.com/your-github-username/cdnjs/tree/master/ajax/libs

&hellip;where, again, `your-github-username` is your GitHub username.

##### 5.2.2.1 Update a library using your browser

If you are updating an existing library, find it from the list. Click on the library name; you'll find a `package.json` file and one or more numbered directories. Each directory contains that version of the library, and that version _only_.

To add a new version of a library, create a new directory named after the new library version by clicking the `+` link near the top.

*[INCOMPLETE]*

#### 5.2.3 Make changes on a local repo clone

Coming soon - please refer to `README.md`.

### 5.3 Pre-flight checks

Coming soon - please refer to `README.md`.

### 5.4 Create a pull request

Coming soon - please refer to `README.md`.

### 5.5 Pull request follow-up

Coming soon - please refer to `README.md`.

## 6. Create an issue