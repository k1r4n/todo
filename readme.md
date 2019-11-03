# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t todo .`

This will create a new docker image with the name **todo**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/data -it todo <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/data -it todo yarn install`

This will install the dev dependencies as well as the project dependencies.


## Running the files

`docker run --rm -v $(pwd):/data -it -p 7000:7000 todo yarn dev:start`

This will execute the project

## Non-Docker Installation

`npm install` or `yarn install`

This will install the dev dependencies as well as the project dependencies.

## Non-Docker Execution

`npm run dev:start` or `yarn dev:start`
