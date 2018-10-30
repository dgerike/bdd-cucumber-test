#!/bin/bash      

curl -X POST "https://more-cars.atlassian.net/rest/api/3/issue/$JIRA_ISSUE_ID/transitions" -H "Authorization: Basic $JIRA_CREDENTIALS" -H "Content-Type: application/json" --data @"jira_transition_to_done.json"
