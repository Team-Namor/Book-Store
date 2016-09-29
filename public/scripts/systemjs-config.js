SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './scripts/main.js',
        'data': './scripts/data.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.min.js',
        'sammy': './bower_components/sammy/lib/min/sammy-latest.min.js',
        'handlebars': './bower_components/handlebars/handlebars.min.js',
        'template': './scripts/handlebars-template.js',
        'requester': './scripts/utils/jqueryJSONRequester.js',
    }
});