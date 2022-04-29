import lwc from '@lwc/rollup-plugin';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';


const production = (process.env.NODE_ENV === 'production');
const watching = Boolean(process.env.ROLLUP_WATCH);

export default [
    {
        input: 'src/index.js',
        output: {
            sourcemap: watching,
            dir: 'dist',
            format: 'esm',
        },
        watch: {
            clearScreen: false,
            include: 'src/**'
        },
        plugins: [
            lwc({sourcemap: watching}),
            copy({
                targets: [
                    { src: 'src/index.html', dest: 'dist' },
                    { src: 'src/assets', dest: 'dist' },
                ]
            }),
            replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
            production && terser(),
            watching && serve('dist'),
            watching && livereload({ watch: 'dist', delay: 400 })
        ].filter(Boolean)
    },
];

