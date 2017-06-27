# CDNJS - the best front-end resource CDN for free!

﻿[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cdnjs/cdnjs/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3ABEGINNER%20-label%3A%22in%20progress%22%20)
﻿[![Drone CI](https://ci.cdnjs.com/api/badges/cdnjs/cdnjs/status.svg?branch=master)](https://ci.cdnjs.com/cdnjs/cdnjs)
﻿[![Dependency Status](https://david-dm.org/cdnjs/cdnjs.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs) [![devDependency Status](https://david-dm.org/cdnjs/cdnjs/dev-status.svg?theme=shields.io)](https://david-dm.org/cdnjs/cdnjs#info=devDependencies)
﻿[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/cdnjs/cdnjs/blob/master/MIT-LICENSE)
﻿[![tip for next commit](https://tip4commit.com/projects/919.svg)](https://tip4commit.com/github/cdnjs/cdnjs) [![Bountysource](https://www.bountysource.com/badge/team?team_id=11914&style=bounties_posted)](https://www.bountysource.com/teams/cdnjs/bounties?utm_source=cdnjs&utm_medium=shield&utm_campaign=bounties_posted)
[![GetBadges Game](https://cdnjs-cdnjs.getbadges.io/shield/company/cdnjs-cdnjs)](https://cdnjs-cdnjs.getbadges.io/?ref=shield-game)

[![Throughput Graph](https://graphs.waffle.io/cdnjs/cdnjs/throughput.svg)](https://waffle.io/cdnjs/cdnjs/metrics/throughput)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [latest version url support](#latest-version-url-support)
- [Contributing](#contributing)
- [API usage](#api-usage)
- [Extensions, Plugins, Resources](#extensions-plugins-resources)
- [Contributors](#contributors)
- [Sponsors](#sponsors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

This is the main repository to maintain the libraries' assets on CDNJS. For website and API, please refer to [new-website](https://github.com/cdnjs/new-website) repository, all the repositories can be found at [CDNJS](https://github.com/cdnjs/) organization on GitHub!

CDNJS is a free and open source project to organize all the famous web front-end development resources and provide them to the developers with faster CDN infrastructure without usage limitation and fee. We want to help individual library/framework developers spread their projects, and help web developers to supercharge their websites! With the great and free CDN service, developers can focus on the project and website development, without spending time worrying about how to setup a CDN for the project or website assets. We hope to make web development easier, your websites and the WWW faster and safer.

If you love 💖 what we are doing and would like to help us make the project better, please consider to:

1. Become a contributor, help us write [document](https://github.com/cdnjs/cdnjs/tree/master/documents), organize [issues](https://github.com/cdnjs/cdnjs/issues), add libraries, design the [website](https://github.com/cdnjs/new-website), propose features, review [issues](https://github.com/cdnjs/cdnjs/issues) and [pull requests](https://github.com/cdnjs/cdnjs/pulls), etc.
2. Donate us on [Gratipay](https://gratipay.com/cdnjs/), [Bountysource](https://www.bountysource.com/teams/cdnjs) or [Tip4Commit](https://tip4commit.com/github/cdnjs/cdnjs).

We really appreciate your help 😊

Currently, CDNJS is the top 2([ref](https://w3techs.com/technologies/overview/content_delivery/all)) web front-end CDN service with great performance. We fully support [https](https://en.wikipedia.org/wiki/HTTPS), [SPDY](https://en.wikipedia.org/wiki/SPDY), [http/2.0](https://http2.github.io/) and [SRI](https://www.w3.org/TR/SRI/), which will **boost** and **secure** your website with zero configuration. *(note that you'll still need to take care of the server side and application layer of security issues. We make it better, but can't help too much if you implement a bad practice)*

## latest version url support

Note that we don't support the feature to use `latest` in the url, because of the reasons below:

 1. It brings potential risks to break the website if there is any compatible issue or bug coming from upstream. It's not a good idea to use it in the production environment, both jQuery CDN and Google CDN don't provide this feature.
 2. The `latest` url feature also has cache and performance issues, which has conflicts of what we are tring to do - make your website load as fast as possible.
 3. Security issues become more and more important nowadays, for example, GitHub had been attacked by the Great Cannon via malicious JavaScript([ref1](https://citizenlab.org/2015/04/chinas-great-cannon/), [ref2](https://arstechnica.com/security/2015/04/meet-great-cannon-the-man-in-the-middle-weapon-china-used-on-github/)) during April 2015, one of the techniques to prevent this kind of attack is [Subresource Integrity(SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). We have been supporting this feature for a long time, but the `latest` url feature totally conflicts with the SRI technique.

## Contributing

To contribute to CDNJS, please refer to the [CONTRIBUTING.md](https://github.com/cdnjs/cdnjs/blob/master/CONTRIBUTING.md), it should contain most of the things you'll need to get your contribution started!

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## API usage
See the [API page](https://cdnjs.com/api) on the website or [documents/api.md](documents/api.md);

## Extensions, Plugins, Resources

[Extensions, Plugins, Resources](https://github.com/cdnjs/cdnjs/wiki/Extensions%2C-Plugins%2C-Resources)

## Contributors

See each repos' GitHub contributors graph, e.g.
 - [main repo](https://github.com/cdnjs/cdnjs/graphs/contributors)
 - [website and api](https://github.com/cdnjs/new-website/graphs/contributors)
 - [autoupdate tool](https://github.com/cdnjs/autoupdate/graphs/contributors)
 - [atom-extension](https://github.com/cdnjs/atom-extension/graphs/contributors)
 - [tutorials](https://github.com/cdnjs/tutorials/graphs/contributors)
 - [buildScript](https://github.com/cdnjs/buildScript/graphs/contributors)
 - [cdnjs-importer](https://github.com/cdnjs/cdnjs-importer)

or [gitstats](https://github.com/cdnjs?utf8=✓&q=gitstats), [git_stats](https://github.com/cdnjs?utf8=✓&q=git_stats)

## Sponsors

CDNJS would never be successful without the kindness sponsoring from the sponsors, CDNJS is currently being sponsored by these companies:

 - [Cloudflare](https://www.cloudflare.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
 - [DigitalOcean](https://www.digitalocean.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
 - [Algolia](https://www.algolia.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)
 - [Heroku](https://www.heroku.com/?utm_source=cdnjs&utm_medium=link&utm_campaign=cdnjs)

If you are interested in becoming a sponsor, please feel free to contact us!

## License
Each library is released under its own license, this CDNJS main repository is under [MIT license](LICENSE)
