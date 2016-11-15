#!/bin/bash

set -e # halt script on error

echo "Creating website.zip from build directory"
zip -r website.zip build 

echo "Sending website.zip to Netlify site ${NETLIFY_SITE}"

curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_KEY" \
     --data-binary "@website.zip" \
     "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE}/deploys"

echo "Finished deploying to Netlify"
