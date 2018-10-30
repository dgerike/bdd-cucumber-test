#!/bin/bash      

curl -X PUT "https://more-cars.atlassian.net/rest/api/3/issue/$JIRA_ISSUE_ID" -H "Authorization: Basic $JIRA_CREDENTIALS" -H "Content-Type: application/json" --data @"jira_fix_version_update.json"
