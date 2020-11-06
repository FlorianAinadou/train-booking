#!/bin/bash

# Running the image as
#  - removing the container after exit,
#  - detached (-d),
#  - binding localhost:3000 to container:3000
docker run --name wakanda_backend --rm -d -p 9000:9000 djotiham/wakanda_backend

# to stop: docker stop ID
# to start a new shell in the container: docker exec -it ID bash
# to attach to the container: docker attach ID (^P ^Q to detach)
