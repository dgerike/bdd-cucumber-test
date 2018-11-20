#!/bin/bash      

RESPONSE=`curl \
    -X POST 'https://xray.cloud.xpand-it.com/api/v1/import/execution/cucumber' \
    -H "Authorization: Bearer $XRAY_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data @"../reports/report.json"`

TICKET_ID=`echo $RESPONSE | jq .key`

export JIRA_TEST_EXECUTION_ID=${TICKET_ID:1:-1}

echo "Test ececution results uploaded to https://doozer-de.atlassian.net/browse/$JIRA_TEST_EXECUTION_ID"
