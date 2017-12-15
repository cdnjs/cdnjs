# Contributing to cdnjs Library

## Table of Contents
0. [Overview](#0-overview)  
1. [Policy, rules and guidelines](#1-policy-rules-and-guidelines)  
2. [Configure auto-update](#2-configure-auto-update)  
  2.1 [Auto-update overview](#21-auto-update-overview)  
  2.3 [Auto-update syntax](#23-auto-update-syntax)  
  2.3 [Auto-update example](#23-auto-update-example)  
  2.4 [Updating package.json with auto-update information](#24-updating-packagejson-with-auto-update-information)  
3. [Update existing library with new version](#3-update-existing-library-with-new-version)  
4. [Add a new library](#4-add-a-new-library)  
  4.1 [overview](#41-overview)  
  4.2 [Via a single package.json](#42-via-a-single-packagejson)  
  4.3 [With its assets](#43-with-its-assets)  
5. [Adding and updating cdnjs](#5-adding-and-updating-cdnjs)  
  5.1 [Fork the cdnjs repository](#51-fork-the-cdnjs-repository)  
  5.2 [Make changes to your fork](#52-make-changes-to-your-fork)  
  5.3 [Pre-flight checks](#53-pre-flight-checks)  
  5.4 [Create a pull request](#54-create-a-pull-request)  
  5.5 [Pull request follow-up](#55-pull-request-follow-up)  
6. [Create an issue](#6-create-an-issue)  

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

```js
  "npmName": "function-plot",
  "npmFileMap": [
    {
      "basePath": "dist",
      "files": [
        "**/*"
      ]
    }
  ],
```

The example in 2.3. parses the `function-plot` tarball, which has this structure:

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

The auto-update process will locate `dist` (specified in `basePath`) and copy **/* (specified in `files`) to cdnjs, removing the `dist` path. The resulting files in cdnjs will be: 

```
|__ajax
  |__libs
    |__function-plot
      |__x.y.z
        |__function-plot.js
```

&hellip;where `x.y.z` is the library version number, extracted from the `package.json` on npmjs.

### 2.4 Updating `package.json` with auto-update information

When you locate a cdnjs library with a corresponding npmjs presence, the relevant `package.json` should be updated.

-Refer to 5.* below for instructions on forking, updating and committing changes to cdnjs.-

Coming soon - please refer to `README.md`.

## 3. Update existing library with new version

Coming soon - please refer to `README.md`.

## 4. Add a new library
### 4.1 overview
1. Libraries are stored in the `ajax/libs` directory. Each library has its own subdirectory of `ajax/libs` and each version of the library has its own subdirectory of the library directory name, for example:
   > /ajax/libs/jquery/2.0.0/

2. We use [`package.json`](https://www.npmjs.org/doc/package.json.html) to store the meta data of a library in [npm format](https://www.npmjs.org/doc/package.json.html), please don't forget to add this file at the root of the lib.
   * If there is an official `package.json`, please try to follow the official version, the best way is just copy from the official and do a little modification of it.
   * If there is **not** an official `package.json`, please **create** it by yourself, you should refer to [doc of package.json](https://www.npmjs.org/doc/package.json.html) or other lib's `package.json`, and the data should be as close as official data as possible.
    * The indent of `package.json` **must** be `2 spaces`
    * Please use [JSONLint](http://jsonlint.com/) to validate your `package.json`.

3. The fields of package.json
```js
name
filename
version
description
keywords
repository
homepage
author
license
npm or git auto-update
```
- **name**: Basically, it is the same as the library name of upstream. The folder name must be the same as name field. (CDNJS's required field)
```js
  "name": "pwnjs",
```
- **filename**: This field will point to the minified mainfile of a library. (CDNJS's required field)
```js
  "filename": "pwn.min.js",
```
- **version**: should be latest stable release version. (CDNJS's required field with its assets)
```js
  "version": "1.0.0",
```
- **description**: It’s a string. This helps people discover your package. You can find it in description field, README.md, bower.json or package.json from upstream. (CDNJS's required field)
```js
  "description": "A Javascript library for browser exploitation",
```
- **keywords**: It’s an array of string. This helps people discover your package. You can find it in bower.json, package.json from the upstream. Sometimes you need to add it by yourself. (CDNJS's required field)
```js
  "keywords": [
    "pwn",
    "exploitation"
  ],
```
- **repository**: Specify the place where your code lives. This is helpful for people who want to contribute. As usual, this field is the same with upstream. (CDNJS's required field)
```js
  "repository": {
    "type": "git",
    "url": "https://github.com/theori-io/pwnjs"
  },
```
- **author**: Author field can be the author, contributors or the organization. As usual, this field is the same with upstream. (CDNJS's required field)
```js
  "author": "Brian Pak <brianairb@gmail.com>",
```
- **license**: Let people know how they are permitted to use it, and any restrictions the author is placing on it. As usual, this field is the same with upstream. But, if the license is not a shortcode, please refer to our [license-list.json](https://github.com/cdnjs/cdnjs/blob/master/tools/license-list.json). (CDNJS's required field)
```js
  "license": "MIT",
```
- **homepage**: The url to the library homepage.
```js
  "homepage": "https://theori-io.github.io/pwnjs/",
```
- **npm or git auto-update**: cdnjs automatically updates libraries that are known to be hosted on npm or git repo. You can refer to [autoupdate](https://github.com/cdnjs/cdnjs/blob/master/documents/autoupdate.md). (CDNJS's required field) 
    - **npm auto-update**
        - **npmName**: the corresponding npmjs name.
        - **npmFileMap**: a list of files to copy from npmjs to cdnjs
        - **basePath**: the path in the npmjs tarball; it will be ignored when files are copied to cdnjs
        - **files**: indicates the file(s) to copy and can be named (e.g., lodash.min.js) or wildcards (e.g., *.js).
    ```js
      "npmName": "pwnjs",
      "npmFileMap": [
        {
          "basePath": "dist",
          "files": [
            "**/*"
          ]
        }
      ]
    ```
    - **git auto-update**
        - **autoupdate**: An autoupdate field.
        - **source**: The type of source
        - **target**: The link can be download files by people or bot.
        - **fileMap**: a list of files to copy from upstream library to cdnjs
        - **basePath**: the path in the library tarball; it will be ignored when files are copied to cdnjs
        - **files**: indicates the file(s) to copy and can be named (e.g., lodash.min.js) or wildcards (e.g., *.js).
    ```js
      "autoupdate": {
        "source": "git",
        "target": "git://github.com/theori-io/pwnjs.git",
        "fileMap": [
          {
            "basePath": "dist",
            "files": [
              "**/*"
            ]
          }
        ]
      }
    ```
    - Memo: Two fields in fileMap or npmFileMap array
        - **basePath**: describe the place of files you want to add
        - **files**: a pattern matcher allowing selection of multiple files
        - Some general rules
```js
          {
            "basePath": "dist",
            "files": [
              "**/*"
            ]
          }
```
```js
          {
            "basePath": "build",
            "files": [
              "**/*"
            ]
          }
```
```js
          {
            "basePath": "release",
            "files": [
              "**/*"
            ]
          }
```
```js
          {
            "basePath": "src",
            "files": [
              "lib_name*"
            ]
          }
```
```js
          {
            "basePath": "",
            "files": [
              "lib_name*"
            ]
          }
```
4. We use the directory/folder name and `name` property in `package.json` to identify a library, so this two string should be **totally** equal.

5. Which source of auto-update can be choosed, npm or git?
    1. Please make sure the files can be directly used in front-end and remember the path of the library.
    2. Which source include the latest stable release version with front-end files? If both of them include the latest version, let's move on next step.
    3. Which source include the more stable release versions with front-end files? Then, let's choose the currect source.



### 4.2 Via a single package.json

1. Create a branch and a `<LIBRARY_NAME>` folder under `ajax/libs/`
2. Creating a `package.json` under `ajax/libs/<LIBRARY_NAME>`
3. Edit the `package.json`.
    - Required fields: `name`, `description`, `filename`, `license`, `repository`, `author`, `keywords`, auto-update config
    - Non-Required fields (If there is no field of the upstream): `homepage`
    - Please do not add **`version`** field
4. Save the file with the commit message as the followings. This will be useful to us to maintain the git log and trace the history.
    - If you use npm auto-update config, you can use the followings commit message. (Please replace `<LIBRARY_NAME>` to real library, `<THIS_ISSUE_NUMBER>` to real issue number, `<AUTHOR>` to real author of the library.)
    ```
    Add <LIBRARY_NAME> w/ npm auto-update via single package.json

    close #<THIS_ISSUE_NUMBER>, cc @<AUTHOR>
    ```
    - If you use git auto-update config, please use the followings commit message. (Please replace `<LIBRARY_NAME>` to real library, `<THIS_ISSUE_NUMBER>` to real issue number, `<AUTHOR>` to real author of the library.)
    ```
    Add <LIBRARY_NAME> w/ git auto-update via single package.json

    close #<THIS_ISSUE_NUMBER>, cc @<AUTHOR>
    ```

### 4.3 With its assets

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
