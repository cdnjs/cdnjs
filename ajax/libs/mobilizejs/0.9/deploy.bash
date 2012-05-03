#!/bin/bash
# 
# Simple script to make App Engine releases (trunk, tagged)
# Packs JS, makes documentation, uploads to the cloud.
#
# Usage. ./deploy.bash ~/path/to/cdn/application [google account name] [version]
#

if [ "$1" == "" ] ; then
        echo "Need target folder"
        exit 1
fi

if [ "$2" != "" ] ; then
    ACCOUNT=$2
else
    ACCOUNT=""
fi

if [ "$3" != "" ] ; then
    VERSION=$3
else
    VERSION=""
fi

TARGET=$1

LOCAL_APPCFG=$HOME/google_appengine/appcfg.py

if [ -f $LOCAL_APPCFG ] ; then
        APPCFG=$LOCAL_APPCFG
else
        APPCFG=appcfg.py # Global appengine installation
fi

cd docs
sh genapidoc.sh
cd manual
make html
cd ../..
./release.py -d $TARGET/releases $VERSION

# Use stored App Engine credentials or ask password
if [ "$ACCOUNT" != "" ]; then
    $APPCFG -e $ACCOUNT update $TARGET
else
    $APPCFG update $TARGET
fi
