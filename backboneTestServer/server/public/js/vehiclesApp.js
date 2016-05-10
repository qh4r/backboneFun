requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../vehicles',
        jquery: 'jquery-min',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        fetchPolyfil: 'fetchPolyfil'
    }
});

requirejs(['app/main']);