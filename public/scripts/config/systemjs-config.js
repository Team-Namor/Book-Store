SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': 'systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'systemjs-plugin-babel/systemjs-babel-browser.js',
        'app': '../scripts/app.js',
        'data': '../scripts/data.js',
        'jquery': '../bower_components/jquery/dist/jquery.js',
        'tether': '../bower_components/tether/dist/js/tether.min.js',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min.js',
        'sammy': '../bower_components/sammy/lib/min/sammy-latest.min.js',
        'handlebars': '../bower_components/handlebars/handlebars.min.js',
        'template': '../scripts/data/handlebars-template.js',
        'requester': '../scripts/data/requester.js',
    },
    'meta': {
        'bootstrap': {
            globals: {
                Tether: 'tether'
            }
        }
    }
});