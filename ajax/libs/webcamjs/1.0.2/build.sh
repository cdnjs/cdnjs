#!/bin/bash

# Build Script for WebcamJS
# Install uglifyjs first: sudo npm install uglify-js -g

uglifyjs webcam.js -o webcam.min.js --mangle --reserved "Webcam" --preamble "// WebcamJS v1.0.2 - http://github.com/jhuckaby/webcamjs - MIT Licensed"
