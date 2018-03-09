'use strict';

class WildcardServerWebpackPlugin {
	constructor(options) {
		this.portNumber = options.portNumber ? options.portNumber : 3000;
	}

	apply(compiler) {
		const portNumber = this.portNumber;
		const { outputPath } = compiler;

		const content = `var express = require('express');

var server = express();
server.use('/${outputPath}', express.static(__dirname + '/${outputPath}'));

server.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = ${portNumber};
server.listen(port, function() {
    console.log('Server listening on port ' + ${portNumber});
});`;

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
