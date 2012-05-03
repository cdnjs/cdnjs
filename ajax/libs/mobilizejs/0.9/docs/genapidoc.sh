#!/bin/sh


TOOLKIT=jsdoc_toolkit-2.4.0/jsdoc-toolkit  

# Install jsdoc locally
if [ ! -e $TOOLKIT ] ; then
        wget http://jsdoc-toolkit.googlecode.com/files/jsdoc_toolkit-2.4.0.zip
        unzip jsdoc_toolkit-2.4.0.zip
fi

if [ -e ../js/mobilize.core.min.js ] ; then
        echo "Could have problems generate API docs from locally deployed bundles"
fi        

java -jar $TOOLKIT/jsrun.jar $TOOLKIT/app/run.js ../../js  -x=js,jsx --directory=./apidocs --exclude="jquery" -E="min.js" -E="debug.js" --template=$TOOLKIT/templates/jsdoc


# for sphinx
#java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js ./js  -x=js,jsx --directory=./docs/source
# --template=jsdoc-for-sphinx
#cd docs
#make html
#cd ..

