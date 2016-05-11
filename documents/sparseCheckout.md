Currently, cdnjs's repo is too huge and some people have issues with using it when it is this big. To get around the issue or repo size you can use `sparse-checkout`. It lets you check out only the files you want, so that the whole directory in your computer won't need to be 11GB, but only about 1GB (you can make this even smaller with shallow pull too!)

Here are the steps:

1.Create/Initial a empty repo and enter it:

`$ git init cdnjs && cd cdnjs`

> Initialized empty Git repository in /home/peter/.git/

2.Enable sparseCheckout:

`$ git config core.sparseCheckout true`

3.Set what you want to checkout only, write to `.git/info/sparse-checkout`, one line for one rule, for example, the jquery lib:

`$ echo '/ajax/libs/jquery/*' >> .git/info/sparse-checkout`

Here is an example of `.git/info/sparse-checkout`:
```
/build
/test
/tools
/scratch
/MIT-LICENSE
/hooks
/*.yml
/*.md
/*.json
/*.sh
/*.js
/ajax/libs/jquery/*
#/ajax/libs/*/package.json // for tools/createSparseCheckoutConfig.js
```

You can update your `.git/info/sparse-checkout` and then do `git reset --hard` to update the working directory to be the same as you configured.

4.Set your remote, for example:

`$ git remote add origin git://github.com/cdnjs/cdnjs.git`

If you already cloned a cdnjs repo, this time, you can set a local path to speed up, for example:

`$ git remote add origin ///home/peter/cdnjs.old`

5.Pull things into your new repo with shallow pull, for example, set depth to 10:

`$ git pull origin master --depth 10`

It's all done, you will only have jquery lib now and other files won't be checked out. Let's take a look at the space it used:

`$ du -d 1 -h`
> 18M     ./ajax

> 587M    ./.git

> 605M    .


The database behind git is only 587MB, and the whole repo is only 605MB, awesome!

What's the origin one?

`$ du -d 1 -h`

> 682M    ./.git

> 43M     ./scratch

> 16M     ./node_modules

> 12G     ./ajax

> 24K     ./test

> 32K     ./build

> 13G     .

The crazy 13GB/682MB haha ...

This tip can also avoid sortable/Sortable issue([#3650](https://github.com/cdnjs/cdnjs/issues/3650)) in case-insensitive filesystem, especially Mac OS.

Hope you like it!
