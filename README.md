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
npm install
npm start
```

**Note**: Only run ```npm install``` the first time. On subsequent times, run ```npm start```

#### Running with Docker
To run with Docker, install [docker](https://docs.docker.com/get-docker/) and run:
```sh
docker compose up
```

#### The webpage
Navigate to http://localhost:3000 to view the webpage

## TODO
1. Use Selenium to test frontend 
2. Modularise frontend App.js
3. Make backend tests more robust
4. Replace deprecated/vulnerable packages
5. Use nginx as a proxy in the frontend container 
6. Add static dependencies