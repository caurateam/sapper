import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import svelte from 'rollup-plugin-svelte';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = require('../../../config/rollup.js');

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve()
		]
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev
			}),
			resolve({
				preferBuiltins: true
			})
		],
		external: ['helmet', 'sirv', 'polka']
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			})
		]
	}
};
