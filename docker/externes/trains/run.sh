#!/bin/bash

# Running the image as
#  - removing the container after exit,
#  - detached (-d),
#  - binding localhost:3000 to container:3000
docker run --name wakanda_externe_trains_service --rm -d -p 8000:8000 djotiham/wakanda_externe_trains_service

# to stop: docker stop ID
# to start a new shell in the container: docker exec -it ID bash
# to attach to the container: docker attach ID (^P ^Q to detach)
