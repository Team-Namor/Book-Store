SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '../../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './scripts/main.js',
        'data': './scripts/data.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'bootstrap-utils': './bower_components/bootstrap/js/dist/util.js',
        'bootstrap-tabs': './bower_components/bootstrap/js/dist/tab.js',
        'sammy': './bower_components/sammy/lib/min/sammy-latest.min.js',
        'handlebars': './bower_components/handlebars/handlebars.min.js',
        'template': './scripts/handlebars-template.js'
    }
});