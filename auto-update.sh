#!/bin/sh
# Exit if any errors
set -e
cd /root/cdnjs
echo Getting latest libraries
ls
git pull

echo npm install for good measure
/usr/local/bin/npm install

echo Starting auto update script
/usr/local/bin/node auto-update.js run >> node.log

echo Pushing new versions
git add .
git commit -am "Updated packages via auto-update.js"
git push

