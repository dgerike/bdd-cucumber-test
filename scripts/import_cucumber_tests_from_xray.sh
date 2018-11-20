#!/bin/bash

echo "Importing xray tests for $JIRA_TEST_ID"
echo $XRAY_API_TOKEN

curl \
    -X GET "https://xray.cloud.xpand-it.com/api/v1/export/cucumber?keys=$JIRA_TEST_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $XRAY_API_TOKEN" \
    | busybox unzip -o - -d ../features
