#!/bin/bash

echo Pull
git pull
echo Checkout zopfli
git checkout zopfli
echo Merge with master
git merge master -m "merge with master"

node zopfli.js

cd ..
git add .
echo Git Commit
git commit -am "zopfli"
echo Git Push
git push
echo Checkout master
git checkout master
