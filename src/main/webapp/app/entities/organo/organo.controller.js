(function() {
    'use strict';

    angular
        .module('reunionsApp')
        .controller('OrganoController', OrganoController);

    OrganoController.$inject = ['$scope', '$state', '$location', '$anchorScroll', 'Organo', 'OrganoSearch', 'ParseLinks', 'AlertService'];

    function OrganoController ($scope, $state, $location, $anchorScroll, Organo, OrganoSearch, ParseLinks, AlertService) {
        var vm = this;

//        vm.loadPage = loadPage;
//        vm.predicate = pagingParams.predicate;
//        vm.reverse = pagingParams.ascending;
//        vm.transition = transition;
//        vm.itemsPerPage = paginationConstants.itemsPerPage;
//        vm.clear = clear;
//        vm.search = search;
        vm.goUp = function(id) {
                  var old = $location.hash();
                  $location.hash(id);
                  $anchorScroll();
                  //reset to old to keep any additional routing logic from kicking in
                  $location.hash(old);
                  };
        vm.organos = Organo.getAll();
        vm.qFn = function(actual, expected) {
            if (angular.isObject(actual)) return false;
            function removeAccents(value) {
              return value.toString().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n');
            }
            actual = removeAccents(angular.lowercase('' + actual));
            expected = removeAccents(angular.lowercase('' + expected));

            return actual.indexOf(expected) !== -1;
        }
        //vm.loadAll = loadAll;
//        vm.searchQuery = pagingParams.search;
//        vm.currentSearch = pagingParams.search;

        //loadAll();

//        function loadAll () {
//            if (pagingParams.search) {
//                OrganoSearch.query({
//                    query: pagingParams.search,
//                    page: pagingParams.page - 1,
//                    size: vm.itemsPerPage,
//                    sort: sort()
//                }, onSuccess, onError);
//            } else {
//                Organo.query({
//                    page: pagingParams.page - 1,
//                    size: vm.itemsPerPage,
//                    sort: sort()
//                }, onSuccess, onError);
//            }
//            function sort() {
//                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
//                if (vm.predicate !== 'id') {
//                    result.push('id');
//                }
//                return result;
//            }
//            function onSuccess(data, headers) {
//                vm.links = ParseLinks.parse(headers('link'));
//                vm.totalItems = headers('X-Total-Count');
//                vm.queryCount = vm.totalItems;
//                vm.organos = data;
//                vm.page = pagingParams.page;
//            }
//            function onError(error) {
//                AlertService.error(error.data.message);
//            }
//        }
//
//        function loadPage (page) {
//            vm.page = page;
//            vm.transition();
//        }
//
//        function transition () {
//            $state.transitionTo($state.$current, {
//                page: vm.page,
//                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
//                search: vm.currentSearch
//            });
//        }
//
//        function search (searchQuery) {
//            if (!searchQuery){
//                return vm.clear();
//            }
//            vm.links = null;
//            vm.page = 1;
//            vm.predicate = '_score';
//            vm.reverse = false;
//            vm.currentSearch = searchQuery;
//            vm.transition();
//        }
//
//        function clear () {
//            vm.links = null;
//            vm.page = 1;
//            vm.predicate = 'id';
//            vm.reverse = true;
//            vm.currentSearch = null;
//            vm.transition();
//        }
    }
})();
