'use strict';

const DEFAULT_OPTIONS = {
    serverFileName: 'server.js',
    portNumber: 3001,
    htmlFileName: 'index.html'
  };
  

class WildcardServerWebpackPlugin {
	constructor(options) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
          };
	}

	apply(compiler) {
        const {
            serverFileName,
            htmlFileName, 
            portNumber
        } = this.options; 

        const {outputPath} = compiler; 

		const content = `
var express = require('express');

var server = express();
server.use('/${outputPath}', express.static(__dirname + '/${outputPath}'));

server.get('/*', function(req, res) {
    res.sendFile(__dirname + '/${htmlFileName}');
});

var port = ${portNumber};
server.listen(port, function() {
    console.log('Server listening on port ' + ${portNumber});
});
        `;

		compiler.plugin('emit', function(compilation, callback) {
			compilation.assets[serverFileName] = {
				source: () => content,
				size: () => content.length
			};

			callback();
		});
	}
}

module.exports = WildcardServerWebpackPlugin;
