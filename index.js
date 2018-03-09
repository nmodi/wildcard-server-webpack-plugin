'use strict';

const write = require('write');
const path = require('path');

class WildcardServerWebpackPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const _this = this;

		compiler.plugin('done', function() {
			const filePath = path.join(
				'./dist',
				'server.js'
			);
			write.sync(filePath, 'helo world');
		});
	}
}

module.exports = WildcardServerWebpackPlugin;
