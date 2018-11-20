#!/bin/bash      

TOKEN=`curl \
    -X POST 'https://xray.cloud.xpand-it.com/api/v1/authenticate' \
    -H "Content-Type: application/json" \
    --data @"xray_credentials.json"`

# strip quotation marks from the response
TOKEN=${TOKEN:1:-1}

# export token as an environment variable
export XRAY_API_TOKEN=$TOKEN
