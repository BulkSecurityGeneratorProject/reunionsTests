(function() {
    'use strict';

    angular
        .module('reunionsApp', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'angularUtils.directives.dirPagination',
            'ui.calendar',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'ct.ui.router.extras',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar'
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
})();
