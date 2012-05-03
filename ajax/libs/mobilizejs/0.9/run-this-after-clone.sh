#!/bin/sh
mv .git/hooks .git/_old_hooks
cd .git
ln -s ../githooks hooks
cd ..

