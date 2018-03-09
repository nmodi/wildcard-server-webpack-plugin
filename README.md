# wildcard-server-webpack-plugin
Generates an express server which serves index.html to all routes so you can focus on just your front end code. 

## Problem

When using client-side routing solutions for single page applications (e.g. react-router), users cannot refresh the page. It is necessary to provide a server.js file which redirects all requests back to /index.html. 

One solution is to put this server.js in your output folder; however, this means you to check in that folder into source control. 

Another solution is to put your server.js in your src/ folder and use a webpack plugin to move it to dist/ once your build is done; however, this means your project contains both front-end and back-end code. 

## Solution 

The purpose of this plugin is to generate a `server.js` file in the output folder of your webpack project when your project compiles. This means you don't need to check in your output folder to source control. You also don't need to muddy your client-side code with server-side code. 


## Usage 

Use this with your production webpack.config file. You can still use webpack-dev-server for local development. See the webpack docs for tips on how to have separate dev and prod webpack configs.  

```javascript
const WildcardServerPlugin = require('wildcard-server-webpack-plugin');

...

plugins: [
        ...
        new WildcardServerPlugin()
    ]

```

Run the server with `node dist/server.js`. You can set up a script in your package.json to do this - `"start": "node dist/server.js"

I recommend using this alongside [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin). With both of these plugins combined, you can stick to React.  