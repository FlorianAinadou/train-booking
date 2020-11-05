#!/bin/bash

echo "Building externe bank service docker image"
mkdir resources
cp -R ../../../externes/bank/. resources
docker build -t djotiham/wakanda_externe_bank_service .
rm -R resources
# to remove old images
# docker rmi $(docker images -qa -f 'dangling=true')
