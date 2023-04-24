# Display Products
Fetches products using a Node.js backend and the Express.js API framework, and displays them using a React frontend

## Installation

### Prerequisites
- [node.js](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

**Note**: It is recommended to install node with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### This repo 
First, download and navigate to the root directory *display-products*

#### Running locally
To run both the *client* and *server*: 

```sh
$ npm install #installs dependencies, only run the first time
$ npm start
```

#### Running with Docker
To run with Docker, install [docker](https://docs.docker.com/get-docker/) and run:
```sh
$ docker compose up
```
## TODO
1. Use Selenium to test frontend 
2. Modularise frontend App.js
3. Make backend tests more robust