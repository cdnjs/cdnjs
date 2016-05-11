# API

You can search cdnjs via our API:

```
https://api.cdnjs.com/libraries
```

Without any query parameters it will return the name and main file URL of every library on cdnjs. To search, use:

```
https://api.cdnjs.com/libraries?search=jquery
```

API will reture minified result by default, if you wanna have a human readable result, try `output=human` like this:

```
https://api.cdnjs.com/libraries?output=human
https://api.cdnjs.com/libraries?search=jquery&output=human
```

If you would like more data, use the fields parameter which takes comma-separated values:

```
https://api.cdnjs.com/libraries?search=jquery&fields=version,description
```

To get a list of all files for that library, use the assets field:

```
https://api.cdnjs.com/libraries?search=jquery&fields=assets
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


