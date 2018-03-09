'use strict';

class WildcardServerWebpackPlugin {
	constructor(options) {
		const { fileName, portNumber, distFolder } = options;
		this.fileName = fileName || 'server.js';
        this.portNumber = portNumber || '3001';
        this.distFolder = distFolder || 'dist'; 
	}

	apply(compiler) {
		const content = `
            var express = require('express');
            
            var server = express();
            server.use('/${this.distFolder}', express.static(__dirname + '/${this.distFolder}'));
            
            server.get('/*', function(req, res) {
                res.sendFile(__dirname + '/index.html');
            });
            
            var port = ${this.portNumber};
            server.listen(port, function() {
                console.log('Server listening on port ' + ${this.portNumber});
            });
        `;

		compiler.plugin('emit', function(compilation, callback) {
			compilation.assets[this.options.fileName] = {
				source: () => content,
				size: () => content.length
			};

			callback();
		});
	}
}

module.exports = WildcardServerWebpackPlugin;
