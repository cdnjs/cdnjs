# CDNJS - the best front-end resource CDN for free!

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cdnjs/cdnjs/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3AHacktoberfest%20-label%3A%22in%20progress%22%20)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/cdnjs/cdnjs/blob/master/MIT-LICENSE)
[![Drone CI](https://ci.cdnjs.com/api/badges/cdnjs/cdnjs/status.svg?branch=master)](https://ci.cdnjs.com/cdnjs/cdnjs)
[![Dependency Status](https://img.shields.io/david/cdnjs/cdnjs.svg)](https://david-dm.org/cdnjs/cdnjs)
[![devDependency Status](https://img.shields.io/david/dev/cdnjs/cdnjs.svg)](https://david-dm.org/cdnjs/cdnjs#info=devDependencies)
[![Community](https://img.shields.io/discourse/https/cdnjs.discourse.group/status.svg?label=community%20Discourse&style=flat)](https://cdnjs.discourse.group/)

[![Open Collective](https://img.shields.io/badge/open%20collective-support%20us-3385FF.svg)](https://opencollective.com/cdnjs)
[![Bountysource](https://www.bountysource.com/badge/team?team_id=11914&style=bounties_posted)](https://www.bountysource.com/teams/cdnjs/bounties?utm_source=cdnjs&utm_medium=shield&utm_campaign=bounties_posted)
[![Patreon](https://img.shields.io/badge/patreon-become%20a%20patron-d9643a.svg)](https://www.patreon.com/cdnjs)
[![Liberapay](https://img.shields.io/badge/liberapay-donate-f6c915.svg)](https://liberapay.com/cdnjs/)
[![tip4commit](https://img.shields.io/badge/tip4commit-info-orange.svg)](https://tip4commit.com/github/cdnjs/cdnjs)

[![Throughput Graph](https://graphs.waffle.io/cdnjs/cdnjs/throughput.svg)](https://waffle.io/cdnjs/cdnjs/metrics/throughput)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

* [Introduction](#introduction)
  * [Support Us](#support-us)
* [latest version URL support](#latest-version-url-support)
* [Contributing](#contributing)
* [API usage](#api-usage)
* [Extensions, Plugins, Resources](#extensions-plugins-resources)
* [Contributors](#contributors)
* [Sponsors](#sponsors)
* [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

This is the main repository to maintain the libraries' assets on CDNJS. For our website and API, please refer to the [new-website](https://github.com/cdnjs/new-website) repository. You can find all repositories at [CDNJS](https://github.com/cdnjs/) on GitHub!

CDNJS is a free and open source project to organize and provide popular front-end web development resources to developers via a fast CDN infrastructure without usage limitations and fees. We want to help individual library/framework developers distribute their projects, and web developers supercharge their websites! With our great free CDN service, developers can focus on their projects and website development. Developers no longer have to spend time worrying about how to set-up a CDN for projects or website assets. We hope to make web development easier, as well as your websites and the WWW faster and safer.

Currently, CDNJS is rated No. 2 ([ref](https://w3techs.com/technologies/overview/content_delivery/all)) in web front-end CDN services and has great performance. We fully support [https](https://en.wikipedia.org/wiki/HTTPS), [SPDY](https://en.wikipedia.org/wiki/SPDY), [http/2.0](https://http2.github.io/), and [SRI](https://www.w3.org/TR/SRI/). These will **boost** and **secure** your website with zero configuration. *(Note: You'll still need to take care of server-side and application layer security issues. We make it better, but we can't help you too much if you implement a bad practice.)*

### Support Us!

If you love 💖 what we are doing and would like to help us make the project better, please consider the following options:

1. Become a contributor. Help us write [documentation](https://github.com/cdnjs/cdnjs/tree/master/documents), organize [issues](https://github.com/cdnjs/cdnjs/issues), add libraries, design our [website](https://github.com/cdnjs/new-website), propose features, review [issues](https://github.com/cdnjs/cdnjs/issues) and [pull requests](https://github.com/cdnjs/cdnjs/pulls), etc.

2. Donate and support us on [Open Collective](https://opencollective.com/cdnjs), [Bountysource](https://www.bountysource.com/teams/cdnjs), [Patreon](https://www.patreon.com/cdnjs), [Liberapay](https://liberapay.com/cdnjs/) or [Tip4Commit](https://tip4commit.com/github/cdnjs/cdnjs).

We really appreciate your help. 😊

## latest version URL support

Note that we don't support the feature to use `latest` in the URL because of the reasons below:

1. Your website might break if there are any compatibility issues or bugs coming from upstream. It's not a good idea to use it in the production environment. Both jQuery CDN and Google CDN don't provide this feature.
2. The `latest` URL feature also has cache and performance issues. This conflicts with what we are trying to do - make your website load as fast as possible.
3. Security issues have become more and more important nowadays. For example, Great Cannon attacked GitHub via malicious JavaScript ([ref1](https://citizenlab.org/2015/04/chinas-great-cannon/), [ref2](https://arstechnica.com/security/2015/04/meet-great-cannon-the-man-in-the-middle-weapon-china-used-on-github/)) during April 2015. One of the techniques to prevent this kind of attack is [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). We have been supporting this feature for a long time. The `latest` URL feature, however, totally conflicts with the SRI technique.

## Contributing

To contribute to CDNJS, please refer to [CONTRIBUTING.md](https://github.com/cdnjs/cdnjs/blob/master/CONTRIBUTING.md). It should contain most of the things you'll need to get your contribution started!

**Working on your first Pull Request?** Learn how from this *free* series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

Want to chat with other users of the CDNJS service and some of the team before making your contribution? You can join our [community Discourse forum](https://cdnjs.discourse.group/) where you can post questions and interact with everyone.

## API usage

See the [API page](https://cdnjs.com/api) on our website or read: [documents/api.md](https://github.com/cdnjs/cdnjs/blob/master/documents/api.md)

## Extensions, Plugins, Resources

[Extensions, Plugins, Resources](https://github.com/cdnjs/cdnjs/wiki/Extensions%2C-Plugins%2C-Resources)

## Contributors

See each repos' GitHub contributors graph, e.g.

* [main repo](https://github.com/cdnjs/cdnjs/graphs/contributors)
* [website and api](https://github.com/cdnjs/new-website/graphs/contributors)
* [autoupdate tool](https://github.com/cdnjs/autoupdate/graphs/contributors)
* [atom-extension](https://github.com/cdnjs/atom-extension/graphs/contributors)
* [tutorials](https://github.com/cdnjs/tutorials/graphs/contributors)
* [buildScript](https://github.com/cdnjs/buildScript/graphs/contributors)
* [cdnjs-importer](https://github.com/cdnjs/cdnjs-importer/graphs/contributors)

or [gitstats](https://github.com/cdnjs?utf8=✓&q=gitstats), [git_stats](https://github.com/cdnjs?utf8=✓&q=git_stats)

## Sponsors

CDNJS wouldn't be the success that it is today without our sponsors' kind support. These companies currently support CDNJS:

* [Cloudflare](https://www.cloudflare.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [DigitalOcean](https://www.digitalocean.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [Algolia](https://www.algolia.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
* [Heroku](https://www.heroku.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)

If you are interested in becoming a sponsor, please feel free to contact us!

## License

Each library is released under its own license. This CDNJS repository is published under [MIT license](LICENSE).
