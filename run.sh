#!/bin/bash
# Only for Docker usage

if ! [ "$EXPRESSION" ]
  then
    ENV="$ENV" BROWSER="$BROWSER" DEVICE="$DEVICE" npm run start
  else
    ENV="$ENV" BROWSER="$BROWSER" DEVICE="$DEVICE" npm run start -- --tags="$EXPRESSION"
fi
