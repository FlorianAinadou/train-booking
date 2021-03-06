#!/bin/bash

# Running the image as
#  - removing the container after exit,
#  - detached (-d),
#  - binding localhost:3000 to container:3000
docker run --name wakanda_externe_bank_service --rm -d -p 7000:7000 djotiham/wakanda_externe_bank_service

# to stop: docker stop ID
# to start a new shell in the container: docker exec -it ID bash
# to attach to the container: docker attach ID (^P ^Q to detach)
