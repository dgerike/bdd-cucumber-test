#!/bin/bash      

curl -X GET "https://xray.cloud.xpand-it.com/api/v1/export/cucumber?keys=$JIRA_TEST_PLAN_ID" -H "Content-Type: application/json" -H "Authorization: Bearer $XRAY_BEARER_TOKEN" | busybox unzip -o - -d ../features
