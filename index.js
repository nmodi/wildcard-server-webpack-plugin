'use strict';

class WildcardServerWebpackPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const _this = this;

		const content = 'hello world';

		compiler.plugin('emit', function(compilation, callback) {
			compilation.assets['server.js'] = {
				source: function() {
					return content;
				},
				size: function() {
					return content.length;
				}
			};

			callback();
		});
	}
}

module.exports = WildcardServerWebpackPlugin;
