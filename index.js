'use strict';

const DEFAULT_OPTIONS = {
	portNumber: 3001
};

class WildcardServerWebpackPlugin {
	constructor(options) {
		this.options = {
			...DEFAULT_OPTIONS,
			...options
		};
	}

	apply(compiler) {
		const { portNumber } = this.options;
		const { outputPath } = compiler;

		const content = `var express = require('express');

var server = express();
server.use('/${outputPath}', express.static(__dirname + '/${outputPath}'));

server.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html);
});

var port = ${portNumber};
server.listen(port, function() {
    console.log('Server listening on port ' + ${portNumber});
});
        `;

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
