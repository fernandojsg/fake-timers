import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  plugins: [resolve({
    customResolveOptions: 'node_modules'
  })],
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'FAKETIMERS',
			file: 'dist/fake-timers.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'dist/fake-timers.module.js',
			indent: '\t'
    },
		{
			format: 'cjs',
			file: 'dist/fake-timers.cjs.js',
			indent: '\t'
		}    
	]
};