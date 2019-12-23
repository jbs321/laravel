const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .extract(['react'])
   // .sass('resources/sass/app.scss', 'public/css')
;

//uncomment for debugging
mix.sourceMaps();

mix.webpackConfig({
    resolve: {
        extensions: ['.js'],
        alias: {
            'src': __dirname + '/resources/js/src',
            'reducers': __dirname + '/resources/js/src/reducers',
            'actions': __dirname + '/resources/js/src/actions',
            'components': __dirname + '/resources/js/src/components',
        },
    },
});
