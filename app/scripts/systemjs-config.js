SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './app/scripts/main.js',
        'data': './app/scripts/data.js',
        'jquery': './node_modules/jquery/dist/jquery.js',
        'bootstrap-utils': './public/bower_components/bootstrap/js/dist/util.js',
        'bootstrap-tabs': './public/bower_components/bootstrap/js/dist/tab.js',
        'sammy': './public/bower_components/sammy/lib/min/sammy-latest.min.js',
        'handlebars': './public/bower_components/handlebars/handlebars.min.js',
        'template': './app/scripts/handlebars-template.js'
    }
});