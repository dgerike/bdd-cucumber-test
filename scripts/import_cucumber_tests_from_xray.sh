#!/bin/bash      

curl -X GET 'https://xray.cloud.xpand-it.com/api/v1/export/cucumber?keys=XT-27' --header "Authorization: Bearer $XRAY_BEARER_TOKEN" | busybox unzip -o - -d ../features
