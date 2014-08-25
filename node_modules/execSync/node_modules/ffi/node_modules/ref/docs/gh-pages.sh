#!/bin/sh

DIR=`dirname $0`
TMP_DOC_DIR="/tmp/ref_docs"

npm run docs \
  && rm -rf $TMP_DOC_DIR \
  && mkdir -p $TMP_DOC_DIR \
  && cp -Lrf {"$DIR/index.html","$DIR/images","$DIR/scripts","$DIR/stylesheets"} $TMP_DOC_DIR \
  && git checkout gh-pages \
  && cp -Lrf $TMP_DOC_DIR/* . \
  && echo "done"
