#!/bin/bash

echo "Building backend docker image"
mkdir resources
cp -R ../../backend/. resources
docker build -t djotiham/wakanda_backend .
rm -R resources
# to remove old images
# docker rmi $(docker images -qa -f 'dangling=true')
