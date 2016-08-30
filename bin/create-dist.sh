#!/bin/sh

BASEDIR=$(dirname "$0")

ABS_BASEDIR="$(cd "$(dirname "$BASEDIR")"; pwd)/$(basename "$1")" 


mkdir -p dist
mkdir -p dist/js
node node_modules/.bin/webpack

cp -rf assets/* dist

cp build/main.bundle.js dist/js/main.bundle.js


