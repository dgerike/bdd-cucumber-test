#!/bin/bash      

RESPONSE=`curl -X POST 'https://xray.cloud.xpand-it.com/api/v1/import/execution/cucumber' -H "Authorization: Bearer $XRAY_BEARER_TOKEN" -H "Content-Type: application/json" --data @"../reports/report.json"`

JIRA_ISSUE_ID=`echo $RESPONSE | jq .key`

echo ${JIRA_ISSUE_ID:1:-1}
