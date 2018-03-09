'use strict';

class WildcardServerWebpackPlugin {
	apply(compiler) {
		const content = `const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app  = express()

app.use(express.static(__dirname))

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
console.log("Server started on port " + port)`;

		compiler.plugin('emit', function(compilation, callback) {
			compilation.assets['server.js'] = {
				source: () => content,
				size: () => content.length
			};

			callback();
		});
	}
}

module.exports = WildcardServerWebpackPlugin;
