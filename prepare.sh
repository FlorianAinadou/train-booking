#!/bin/bash

cd docker 
cd backend

./build.sh

cd ..

cd externes
cd bank 
 
./build.sh

cd ..
cd trains

./build.sh

cd ../..

docker-compose up -d