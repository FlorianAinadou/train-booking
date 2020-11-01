#!/bin/bash

echo "Building externe trains services docker image"
mkdir resources
cp -R ../../../externes/trains/. resources
docker build -t djotiham/wakanda_externe_trains_service .
rm -R resources
# to remove old images
# docker rmi $(docker images -qa -f 'dangling=true')
