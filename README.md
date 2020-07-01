<h1 align="center">
    <a href="https://cdnjs.com"><img src="https://raw.githubusercontent.com/cdnjs/brand/master/logo/standard/dark-512.png" width="175px" alt="< cdnjs >"></a>
</h1>

<h3 align="center">The #1 free and open source CDN built to make life easier for developers.</h3>

---

<p align="center">
 <a href="#contributing">
   <img src="https://img.shields.io/badge/Robots-only-red.svg?style=flat-square" alt="Robots only">
 </a>
 <a href="https://github.com/cdnjs/cdnjs/blob/master/LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square" alt="MIT License">
 </a>
 <a href="https://cdnjs.discourse.group/">
  <img src="https://img.shields.io/discourse/https/cdnjs.discourse.group/status.svg?label=Community%20Discourse&style=flat-square" alt="Community">
 </a>
</p>

<p align="center">
 <a href="https://github.com/cdnjs/packages/blob/master/README.md#donate-and-support-us">
  <img src="https://img.shields.io/badge/GitHub-Sponsors-EA4AAA.svg?style=flat-square" alt="GitHub Sponsors">
 </a>
 <a href="https://opencollective.com/cdnjs">
  <img src="https://img.shields.io/badge/Open%20Collective-Support%20Us-3385FF.svg?style=flat-square" alt="Open Collective">
 </a>
 <a href="https://www.patreon.com/cdnjs">
  <img src="https://img.shields.io/badge/Patreon-Become%20a%20Patron-E95420.svg?style=flat-square" alt="Patreon">
 </a>
</p>

---

## Table of Contents

* [Introduction](#introduction)
  * [Other Repositories](#other-repositories)
  * [Cloning tips](#cloning-tips)
* [Contributing](#contributing)
* [Sponsors](#sponsors)
* [License](#license)

## Introduction

This is the robot-only repository for cdnjs, where all the library assets that are hosted on cdnjs are stored. For the JSON files that control the libraries we host, please see the "human" [`cdnjs/packages`](https://github.com/cdnjs/packages) repository.

### Other Repositories

For the JSON files controlling the libraries we host on cdnjs, please take a look at the "human" [`cdnjs/packages`](https://github.com/cdnjs/packages) repository.

For our website, please refer to the [`cdnjs/new-website`](https://github.com/cdnjs/new-website) repository.

For the cdnjs API, please refer to the [`cdnjs/api-server`](https://github.com/cdnjs/api-server) repository.

For the full cdnjs branding and brand-related assets/guidelines, please see the [`cdnjs/brand`](https://github.com/cdnjs/brand) repository.

For our monthly CDN stats and usage reports, check out the [`cdnjs/cf-stats`](https://github.com/cdnjs/cf-stats) repository.

You can find all our repositories at [github.com/cdnjs](https://github.com/cdnjs)!

### Cloning tips

This repository is very big and contains many files, so cloning the full repository is slow. If you only need part of repository, combining [partial clone](https://git-scm.com/docs/partial-clone) and [sparse checkout](https://git-scm.com/docs/git-sparse-checkout) is much faster:
```
$ time git clone --filter=blob:none --sparse https://github.com/cdnjs/cdnjs.git
[...]
real 1m17,683s
$ cd cdnjs
$ ls
CONTRIBUTING.md  LICENSE  README.md
$ time git sparse-checkout add ajax/libs/font-awesome/4.7.0
real 0m19,090s
$ tree ajax/libs/font-awesome/4.7.0
ajax/libs/font-awesome/4.7.0
├── css
│   ├── font-awesome.css
│   ├── font-awesome.css.map
│   └── font-awesome.min.css
└── fonts
    ├── FontAwesome.otf
    ├── fontawesome-webfont.eot
    ├── fontawesome-webfont.svg
    ├── fontawesome-webfont.ttf
    ├── fontawesome-webfont.woff
    └── fontawesome-webfont.woff2

2 directories, 9 files
$ du -hs
1,1G .
```

## Contributing

As this repository is now considered robot-only, pull requests are no longer excepted for this repository. If you are looking to contribute to cdnjs, please take a look at the [`cdnjs/packages`](https://github.com/cdnjs/packages) repository or any of our other [open-source repositories on GitHub](https://github.com/cdnjs)!

## Sponsors

cdnjs wouldn't be the success that it is today without our sponsors' kind support. These companies currently support cdnjs:

* [Cloudflare](https://www.cloudflare.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [DigitalOcean](https://www.digitalocean.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [Algolia](https://www.algolia.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [Heroku](https://www.heroku.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)

If you are interested in becoming a sponsor, please feel free to contact us!

## License

Each library is released under its own license. This cdnjs repository is published under [MIT license](LICENSE).
