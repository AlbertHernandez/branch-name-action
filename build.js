const esbuild = require('esbuild');
const esbuildPluginTsc = require('esbuild-plugin-tsc');

esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    minify: true,
    bundle: true,
    platform: 'node',
    plugins: [
        esbuildPluginTsc({
            force: true
        }),
    ],
});