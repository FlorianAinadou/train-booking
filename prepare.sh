#!/bin/bash

cd docker 
cd backend

./build.sh

cd ..

docker-compose up -d